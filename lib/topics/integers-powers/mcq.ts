import type { Paper } from "../../types.ts";

// ---------------------------------------------------------------------------
// Integers, Powers & Roots — four 20-question MCQ papers.
// Each paper: ~5 warmup, 11 core, 4 challenge, roughly easy → hard.
// Every distractor is a specific misconception, named by value in the explanation.
// ---------------------------------------------------------------------------

const numberLinePQ = `<svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from −8 to 6 with point P at −7 and point Q at 5"><rect width="460" height="90" fill="#ffffff"/><line x1="16" y1="45" x2="444" y2="45" stroke="#1f2937" stroke-width="2"/><polygon points="444,45 436,40 436,50" fill="#1f2937"/><polygon points="16,45 24,40 24,50" fill="#1f2937"/><line x1="30" y1="39" x2="30" y2="51" stroke="#1f2937"/><text x="30" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−8</text><line x1="58" y1="39" x2="58" y2="51" stroke="#1f2937"/><text x="58" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−7</text><line x1="86" y1="39" x2="86" y2="51" stroke="#1f2937"/><text x="86" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−6</text><line x1="114" y1="39" x2="114" y2="51" stroke="#1f2937"/><text x="114" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−5</text><line x1="142" y1="39" x2="142" y2="51" stroke="#1f2937"/><text x="142" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−4</text><line x1="170" y1="39" x2="170" y2="51" stroke="#1f2937"/><text x="170" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−3</text><line x1="198" y1="39" x2="198" y2="51" stroke="#1f2937"/><text x="198" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−2</text><line x1="226" y1="39" x2="226" y2="51" stroke="#1f2937"/><text x="226" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−1</text><line x1="254" y1="39" x2="254" y2="51" stroke="#1f2937"/><text x="254" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><line x1="282" y1="39" x2="282" y2="51" stroke="#1f2937"/><text x="282" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="310" y1="39" x2="310" y2="51" stroke="#1f2937"/><text x="310" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="338" y1="39" x2="338" y2="51" stroke="#1f2937"/><text x="338" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><line x1="366" y1="39" x2="366" y2="51" stroke="#1f2937"/><text x="366" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><line x1="394" y1="39" x2="394" y2="51" stroke="#1f2937"/><text x="394" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><line x1="422" y1="39" x2="422" y2="51" stroke="#1f2937"/><text x="422" y="68" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6</text><circle cx="58" cy="45" r="6" fill="#6366f1" stroke="#1f2937"/><text x="58" y="28" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">P</text><circle cx="394" cy="45" r="6" fill="#6366f1" stroke="#1f2937"/><text x="394" y="28" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Q</text></svg>`;

const squareTile = `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square tile labelled Area = 196 square centimetres, with its side length marked by a question mark"><rect width="240" height="200" fill="#ffffff"/><rect x="50" y="20" width="140" height="140" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="120" y="95" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Area = 196 cm²</text><line x1="50" y1="172" x2="190" y2="172" stroke="#334155"/><line x1="50" y1="167" x2="50" y2="177" stroke="#334155"/><line x1="190" y1="167" x2="190" y2="177" stroke="#334155"/><text x="120" y="192" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">?</text></svg>`;

const nestedSets = `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three nested boxes: Natural numbers inside Integers, and Integers inside Rational numbers"><rect width="360" height="240" fill="#ffffff"/><rect x="10" y="10" width="340" height="220" rx="14" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="24" y="32" font-size="14" font-family="sans-serif" fill="#1f2937">Rational numbers</text><rect x="40" y="48" width="280" height="164" rx="12" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><text x="54" y="70" font-size="14" font-family="sans-serif" fill="#1f2937">Integers</text><rect x="80" y="92" width="200" height="98" rx="10" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="180" y="146" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Natural numbers</text></svg>`;

const thermometer = `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thermometer with a scale from −10 to 10 degrees Celsius, marked every degree; the liquid reaches −4"><rect width="200" height="300" fill="#ffffff"/><text x="80" y="20" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">°C</text><rect x="70" y="28" width="20" height="240" rx="10" fill="#ffffff" stroke="#334155" stroke-width="2"/><circle cx="80" cy="276" r="16" fill="#fca5a5" stroke="#334155" stroke-width="2"/><rect x="75" y="194" width="10" height="82" fill="#fca5a5"/><line x1="90" y1="260" x2="102" y2="260" stroke="#334155"/><text x="108" y="264" font-size="11" font-family="sans-serif" fill="#1f2937">−10</text><line x1="90" y1="249" x2="97" y2="249" stroke="#334155"/><line x1="90" y1="238" x2="102" y2="238" stroke="#334155"/><text x="108" y="242" font-size="11" font-family="sans-serif" fill="#1f2937">−8</text><line x1="90" y1="227" x2="97" y2="227" stroke="#334155"/><line x1="90" y1="216" x2="102" y2="216" stroke="#334155"/><text x="108" y="220" font-size="11" font-family="sans-serif" fill="#1f2937">−6</text><line x1="90" y1="205" x2="97" y2="205" stroke="#334155"/><line x1="90" y1="194" x2="102" y2="194" stroke="#334155"/><text x="108" y="198" font-size="11" font-family="sans-serif" fill="#1f2937">−4</text><line x1="90" y1="183" x2="97" y2="183" stroke="#334155"/><line x1="90" y1="172" x2="102" y2="172" stroke="#334155"/><text x="108" y="176" font-size="11" font-family="sans-serif" fill="#1f2937">−2</text><line x1="90" y1="161" x2="97" y2="161" stroke="#334155"/><line x1="90" y1="150" x2="102" y2="150" stroke="#334155"/><text x="108" y="154" font-size="11" font-family="sans-serif" fill="#1f2937">0</text><line x1="90" y1="139" x2="97" y2="139" stroke="#334155"/><line x1="90" y1="128" x2="102" y2="128" stroke="#334155"/><text x="108" y="132" font-size="11" font-family="sans-serif" fill="#1f2937">2</text><line x1="90" y1="117" x2="97" y2="117" stroke="#334155"/><line x1="90" y1="106" x2="102" y2="106" stroke="#334155"/><text x="108" y="110" font-size="11" font-family="sans-serif" fill="#1f2937">4</text><line x1="90" y1="95" x2="97" y2="95" stroke="#334155"/><line x1="90" y1="84" x2="102" y2="84" stroke="#334155"/><text x="108" y="88" font-size="11" font-family="sans-serif" fill="#1f2937">6</text><line x1="90" y1="73" x2="97" y2="73" stroke="#334155"/><line x1="90" y1="62" x2="102" y2="62" stroke="#334155"/><text x="108" y="66" font-size="11" font-family="sans-serif" fill="#1f2937">8</text><line x1="90" y1="51" x2="97" y2="51" stroke="#334155"/><line x1="90" y1="40" x2="102" y2="40" stroke="#334155"/><text x="108" y="44" font-size="11" font-family="sans-serif" fill="#1f2937">10</text></svg>`;

const everestDeadSea = `<svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scale drawing: a mountain rising 8849 metres above sea level and a lake shore 430 metres below sea level"><rect width="380" height="300" fill="#ffffff"/><polygon points="40,258.9 120,30 200,258.9" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><polygon points="240,258.9 280,270 320,270 350,258.9" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><line x1="20" y1="258.9" x2="370" y2="258.9" stroke="#334155" stroke-dasharray="6 4"/><text x="24" y="274.9" font-size="12" font-family="sans-serif" fill="#1f2937">sea level (0 m)</text><circle cx="120" cy="30" r="4" fill="#1f2937"/><text x="130" y="34" font-size="12" font-family="sans-serif" fill="#1f2937">Everest summit: 8849 m above</text><circle cx="300" cy="270" r="4" fill="#1f2937"/><text x="345" y="292" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">Dead Sea shore: 430 m below</text></svg>`;

const oddLayers = `<svg viewBox="0 0 330 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 4 by 4 square of tiles built from L-shaped layers of 1, 3, 5 and 7 tiles"><rect width="330" height="160" fill="#ffffff"/><rect x="20" y="20" width="30" height="30" fill="#c7d2fe" stroke="#334155"/><rect x="50" y="20" width="30" height="30" fill="#fde68a" stroke="#334155"/><rect x="80" y="20" width="30" height="30" fill="#bbf7d0" stroke="#334155"/><rect x="110" y="20" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="20" y="50" width="30" height="30" fill="#fde68a" stroke="#334155"/><rect x="50" y="50" width="30" height="30" fill="#fde68a" stroke="#334155"/><rect x="80" y="50" width="30" height="30" fill="#bbf7d0" stroke="#334155"/><rect x="110" y="50" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="20" y="80" width="30" height="30" fill="#bbf7d0" stroke="#334155"/><rect x="50" y="80" width="30" height="30" fill="#bbf7d0" stroke="#334155"/><rect x="80" y="80" width="30" height="30" fill="#bbf7d0" stroke="#334155"/><rect x="110" y="80" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="20" y="110" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="50" y="110" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="80" y="110" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="110" y="110" width="30" height="30" fill="#fecaca" stroke="#334155"/><rect x="156" y="27" width="14" height="14" fill="#c7d2fe" stroke="#334155"/><text x="178" y="39" font-size="13" font-family="sans-serif" fill="#1f2937">1 = 1</text><rect x="156" y="57" width="14" height="14" fill="#fde68a" stroke="#334155"/><text x="178" y="69" font-size="13" font-family="sans-serif" fill="#1f2937">1 + 3 = 4</text><rect x="156" y="87" width="14" height="14" fill="#bbf7d0" stroke="#334155"/><text x="178" y="99" font-size="13" font-family="sans-serif" fill="#1f2937">1 + 3 + 5 = 9</text><rect x="156" y="117" width="14" height="14" fill="#fecaca" stroke="#334155"/><text x="178" y="129" font-size="13" font-family="sans-serif" fill="#1f2937">1 + 3 + 5 + 7 = 16</text></svg>`;

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ PAPER 1
  // =========================================================================
  {
    id: "integers-powers-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "integers-powers-m1-q01",
        question: "Work out −8 + 3.",
        options: ["−5", "−11", "5", "11"],
        answerIndex: 0,
        explanation:
          "Start at −8 on the number line and move 3 to the right: you land on −5. −11 comes from moving left instead of right — adding a positive number always moves you up the number line.",
        difficulty: "warmup",
        guideRef: "adding-subtracting-negatives",
        hints: ["Picture a number line. Start at −8: which way does + 3 move you, and how far?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q02",
        question: "Work out −36 ÷ (−9).",
        options: ["−4", "{{1/4}}", "4", "−27"],
        answerIndex: 2,
        explanation:
          "Same signs divide to give a positive, and 36 ÷ 9 = 4, so the answer is 4. Check: −9 × 4 = −36. −4 uses the wrong sign rule, and {{1/4}} comes from dividing the wrong way round (9 ÷ 36).",
        difficulty: "warmup",
        guideRef: "multiplying-dividing-negatives",
        hints: ["Work out 36 ÷ 9 first, then decide the sign: are the signs the same or different?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q03",
        question: "Work out {{(-6)^2}}.",
        options: ["−36", "36", "−12", "12"],
        answerIndex: 1,
        explanation:
          "{{(-6)^2}} means (−6) × (−6). Two negatives multiply to a positive, so the answer is 36. −36 comes from squaring 6 and then sticking the minus sign back on; −12 comes from doubling instead of squaring.",
        difficulty: "warmup",
        guideRef: "squares-cubes-roots",
        hints: ["Write {{(-6)^2}} out as a multiplication of two numbers."],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q04",
        question: "Work out {{2^5}}.",
        options: ["10", "25", "7", "32"],
        answerIndex: 3,
        explanation:
          "{{2^5 = 2 * 2 * 2 * 2 * 2 = 32}}. 10 comes from multiplying the base by the index (2 × 5), and 25 comes from swapping them round to {{5^2}}.",
        difficulty: "warmup",
        guideRef: "index-laws",
        hints: ["The index tells you how many 2s are multiplied together. Keep doubling: 2, 4, 8, …"],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q05",
        question: "Which of these numbers is an integer but **not** a natural number?",
        options: ["7", "−4.5", "−4", "{{1/2}}"],
        answerIndex: 2,
        explanation:
          "Integers are the whole numbers …, −2, −1, 0, 1, 2, …; natural numbers are the counting numbers 1, 2, 3, …. So −4 is an integer that is not natural. 7 is natural (and an integer too). −4.5 is negative, but it is not whole, so it is not an integer at all.",
        difficulty: "warmup",
        guideRef: "types-of-number",
        hints: ["Natural numbers are the counting numbers. Which option is whole, but not something you could count objects with?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q06",
        question:
          "The temperature inside a freezer is −18 °C. The temperature in Priya's kitchen in Singapore is 31 °C. How many degrees warmer is the kitchen than the freezer?",
        options: ["49 °C", "13 °C", "−49 °C", "−13 °C"],
        answerIndex: 0,
        explanation:
          "Warmer by 31 − (−18) = 31 + 18 = 49 degrees: it is 18 degrees up from −18 to zero, then 31 more. 13 comes from working out 31 − 18, which ignores the fact that the freezer is below zero. A 'how much warmer' gap is a distance, so it is positive — not −49.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Draw a thermometer (a vertical number line) with 0 marked.",
          "How far is it from −18 up to 0? And from 0 up to 31?",
          "The difference is 31 − (−18).",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q07",
        question:
          "Look at the pattern.\n\n| Calculation | Answer |\n|---|---|\n| 3 × (−4) | −12 |\n| 2 × (−4) | −8 |\n| 1 × (−4) | −4 |\n| 0 × (−4) | 0 |\n| −1 × (−4) | ? |\n\nWhat should −1 × (−4) be, and why?",
        options: [
          "−4, because the answers keep going down",
          "−4, because a negative times a negative is negative",
          "0, because the pattern stops at zero",
          "4, because each answer is 4 more than the one above",
        ],
        answerIndex: 3,
        explanation:
          "Reading down the table, the first number falls by 1 each time and the answer rises by 4 (−12, −8, −4, 0). To keep the pattern going, the next answer is 0 + 4 = 4. This is *why* a negative times a negative is positive. The claim that 'the answers keep going down' misreads the table: going from −12 to −8 is an increase.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Look at the answer column. Are the answers getting bigger or smaller?",
          "By how much does the answer change from one row to the next?",
          "Each row the answer goes up by 4. What is 0 + 4?",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q08",
        question: "Work out {{sqrt(4) + 16 * 2}}.",
        options: ["36", "34", "6", "40"],
        answerIndex: 1,
        explanation:
          "Roots count as powers, so do them first: {{sqrt(4) = 2}}. Then multiply: 16 × 2 = 32. Finally add: 2 + 32 = 34. 36 comes from working left to right, (2 + 16) × 2; 6 comes from taking the square root of the whole calculation.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "Which comes first: roots, multiplication or addition?",
          "Roots are like powers, so they come before × and +.",
          "{{sqrt(4) = 2}}. Now do 16 × 2 before you add.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q09",
        question: "Which statement about the square roots of 64 is correct?",
        options: [
          "The only square root of 64 is 8, because a square root can't be negative",
          "The square roots of 64 are 32 and −32",
          "64 has two square roots, 8 and −8; the symbol {{sqrt(64)}} means the positive one, 8",
          "−8 is not a square root of 64, because (−8) × (−8) = −64",
        ],
        answerIndex: 2,
        explanation:
          "8 × 8 = 64 and (−8) × (−8) = 64, so 64 has two square roots, 8 and −8. By agreement, the symbol {{sqrt(64)}} means just the positive root, 8. The claim that (−8) × (−8) = −64 is the sign slip: a negative times a negative is positive. 32 and −32 come from halving instead of square rooting.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Work out 8 × 8 and (−8) × (−8).",
          "How many different numbers square to give 64?",
          "The √ symbol is defined to give only the positive root.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q10",
        question: "Simplify {{a^5 * a^3}}.",
        options: ["{{a^8}}", "{{a^15}}", "{{2a^8}}", "{{a^2}}"],
        answerIndex: 0,
        explanation:
          "{{a^5 * a^3}} is five a's multiplied by three more a's: eight a's in total, so {{a^8}}. {{a^15}} comes from multiplying the indices — that rule is for a power of a power, like {{(a^5)^3}}. {{2a^8}} wrongly treats a × a as 2a.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Write {{a^5}} and {{a^3}} as strings of a's multiplied together.",
          "How many a's are being multiplied altogether?",
          "Same base, multiplying: add the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q11",
        question: "On the number line, P is at −7 and Q is at 5. What number is exactly halfway between P and Q?",
        diagram: numberLinePQ,
        options: ["6", "1", "−6", "−1"],
        answerIndex: 3,
        explanation:
          "The distance from P to Q is 5 − (−7) = 12, so halfway is 6 steps from P: −7 + 6 = −1. (Or find the mean: (−7 + 5) ÷ 2 = −2 ÷ 2 = −1.) 6 is the size of the half-step, not the position. −6 comes from working out the gap as −7 − 5 = −12 and halving it.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "How far apart are P and Q? Count across zero.",
          "The gap is 5 − (−7). Halfway means half that distance from P.",
          "Start at −7 and move half the gap to the right.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q12",
        question: "Which of these products is **positive**?",
        options: [
          "(−2) × (−3) × (−5)",
          "(−1) × (−1) × (−1) × (−1) × 7",
          "(−4) × 0 × (−6)",
          "(−3) × 5 × (−2) × (−1)",
        ],
        answerIndex: 1,
        explanation:
          "Count the negative factors: an even number of negatives gives a positive product. (−1) × (−1) × (−1) × (−1) × 7 has four negatives, so it equals +7. (−2) × (−3) × (−5) = −30 and (−3) × 5 × (−2) × (−1) = −30 each have three negatives. (−4) × 0 × (−6) is tempting because it has two negatives, but anything times 0 is 0, which is neither positive nor negative.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Each pair of negatives multiplies to a positive.",
          "Count how many negative factors each product has: odd or even?",
          "Watch out for a factor that makes the whole product 0.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q13",
        question: "Ravi works out 20 − 4 × 3 like this:\n\n    20 − 4 = 16\n    16 × 3 = 48\n\nWhat was his mistake?",
        options: [
          "He subtracted before multiplying. Multiply first: 20 − 12 = 8",
          "Nothing — he worked from left to right, which is always the rule",
          "He should have multiplied 20 by 4 first, giving 80 − 3 = 77",
          "He should have done 4 × 3 first, giving 12 − 20 = −8",
        ],
        answerIndex: 0,
        explanation:
          "Multiplication comes before subtraction, so 4 × 3 = 12 is done first, then 20 − 12 = 8. 'Left to right' only decides between operations of equal priority (× with ÷, or + with −). −8 comes from flipping the subtraction round: 20 − 12 is not the same as 12 − 20.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "In the order of operations, which comes first: × or −?",
          "Which two numbers does the × sign join?",
          "Work out 4 × 3 first, then take the result away from 20.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q14",
        question: "Between which two consecutive whole numbers does {{sqrt(50)}} lie?",
        options: ["25 and 26", "6 and 7", "7 and 8", "49 and 64"],
        answerIndex: 2,
        explanation:
          "49 < 50 < 64, and {{sqrt(49) = 7}}, {{sqrt(64) = 8}}, so {{sqrt(50)}} lies between 7 and 8 (it is about 7.07, just above 7). 25 and 26 come from halving 50 instead of square rooting it; 49 and 64 are the square numbers either side, not their roots.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Which square numbers are just below and just above 50?",
          "49 and 64 are the nearest squares. What are their square roots?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q15",
        question: "Simplify {{5^9 ÷ 5^3}}.",
        options: ["{{5^3}}", "{{1^6}}", "{{5^12}}", "{{5^6}}"],
        answerIndex: 3,
        explanation:
          "Dividing cancels three 5s from the nine on top, leaving six: {{5^9 ÷ 5^3 = 5^(9-3) = 5^6}}. {{5^3}} comes from dividing the indices (9 ÷ 3) instead of subtracting them; {{1^6}} comes from dividing the bases as well.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Write it as a fraction with nine 5s on top and three 5s underneath.",
          "How many 5s are left after cancelling?",
          "Same base, dividing: subtract the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q16",
        question: "Which statement is true?",
        options: [
          "Every rational number is an integer",
          "Every integer is a rational number",
          "−5 is a natural number",
          "{{1/3}} is not rational because its decimal 0.333… never ends",
        ],
        answerIndex: 1,
        explanation:
          "Any integer n can be written as the fraction {{n/1}}, so every integer is rational: the sets nest, natural ⊂ integers ⊂ rational. The reverse fails — {{1/2}} is rational but not an integer. {{1/3}} *is* rational: it is a fraction of two integers, and a decimal that repeats is fine.",
        difficulty: "core",
        guideRef: "types-of-number",
        hints: [
          "A rational number is one you can write as a fraction of two integers.",
          "Can you write 7 or −5 as a fraction?",
          "For each 'every …' statement, try to find a counterexample.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q17",
        question:
          "How many **different** values can you make by putting exactly one pair of brackets into this calculation? (The brackets must go round at least two of the numbers.)\n\n    8 − 4 − 2 − 1",
        options: ["6", "3", "4", "2"],
        answerIndex: 2,
        explanation:
          "There are 6 places for the brackets: (8 − 4), (4 − 2), (2 − 1), (8 − 4 − 2), (4 − 2 − 1) and round everything. They give 1, 5, 3, 1, 7 and 1 — only 4 different values: 1, 3, 5 and 7. 6 counts the placements, not the values: brackets that start at the 8 never change anything. 3 misses 8 − (4 − 2 − 1) = 8 − 1 = 7.",
        difficulty: "challenge",
        guideRef: "order-of-operations",
        hints: [
          "List every place a pair of brackets could go. Be systematic: start with brackets round two numbers, then three.",
          "Brackets that start at the 8 never change the answer. Why not?",
          "A bracket after a minus sign changes the signs inside: 8 − (4 − 2 − 1) = 8 − 4 + 2 + 1.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q18",
        question:
          "a, b and c are integers. You know that {{a * b}} is negative and {{b * c}} is negative. What must be true about {{a * c}}?",
        options: ["It is positive", "It is negative", "It is zero", "It could be positive or negative"],
        answerIndex: 0,
        explanation:
          "{{a * b}} < 0 means a and b have opposite signs; {{b * c}} < 0 means b and c have opposite signs. So a and c both have the sign opposite to b — the same sign as each other — and {{a * c}} is positive. (None of them can be 0, or the products would be 0.) 'Negative' comes from thinking two negative facts must give a negative result.",
        difficulty: "challenge",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Try an example: pick b = 2. What signs must a and c have?",
          "Now try b = −2. What signs must a and c have now?",
          "In both cases, compare the sign of a with the sign of c.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q19",
        question: "How many whole numbers n make {{sqrt(n)}} lie strictly between 5 and 6?",
        options: ["11", "10", "9", "1"],
        answerIndex: 1,
        explanation:
          "{{sqrt(n)}} is between 5 and 6 exactly when n is between {{5^2 = 25}} and {{6^2 = 36}}. The whole numbers strictly between are 26, 27, …, 35: that's 35 − 26 + 1 = 10 numbers. 9 comes from 35 − 26, forgetting to count both ends; 11 includes 25 or 36, but {{sqrt(25)}} is exactly 5, which is not strictly between.",
        difficulty: "challenge",
        guideRef: "squares-cubes-roots",
        hints: [
          "Square everything: if 5 < {{sqrt(n)}} < 6, what range must n be in?",
          "n must be bigger than 25 and smaller than 36.",
          "Count 26 to 35 carefully — include both ends.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "integers-powers-m1-q20",
        question: "Which is larger, {{2^30}} or {{3^20}}?",
        options: [
          "{{2^30}}, because 30 is bigger than 20",
          "They are equal, because 2 × 30 = 3 × 20",
          "You can't tell without a calculator",
          "{{3^20}}, because {{2^30 = 8^10}} and {{3^20 = 9^10}}",
        ],
        answerIndex: 3,
        explanation:
          "Rewrite both with the same index using the power-of-a-power law: {{2^30 = (2^3)^10 = 8^10}} and {{3^20 = (3^2)^10 = 9^10}}. Ten 9s multiplied together beat ten 8s, so {{3^20}} is larger. 'They are equal' comes from comparing 2 × 30 with 3 × 20 — but a power is repeated multiplication, not base × index.",
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "Both indices are multiples of 10. Can you write each number as something to the power 10?",
          "{{2^30 = (2^3)^10}}. What is {{2^3}}?",
          "Compare {{8^10}} with {{9^10}}.",
        ],
        strategy: "Make it simpler",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 2
  // =========================================================================
  {
    id: "integers-powers-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "integers-powers-m2-q01",
        question: "Work out 4 − (−6).",
        options: ["−2", "10", "−10", "2"],
        answerIndex: 1,
        explanation:
          "Subtracting a negative is the same as adding a positive: 4 − (−6) = 4 + 6 = 10. −2 comes from treating it as 4 − 6 and ignoring the second minus sign.",
        difficulty: "warmup",
        guideRef: "adding-subtracting-negatives",
        hints: ["Taking away a debt of $6 is like being given $6. Rewrite the calculation as an addition."],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q02",
        question: "Work out −7 × 8.",
        options: ["56", "−15", "1", "−56"],
        answerIndex: 3,
        explanation:
          "7 × 8 = 56, and a negative times a positive is negative, so −7 × 8 = −56. 56 forgets the sign; −15 and 1 come from subtracting or adding instead of multiplying.",
        difficulty: "warmup",
        guideRef: "multiplying-dividing-negatives",
        hints: ["Work out 7 × 8, then decide the sign: how many negative factors are there?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q03",
        question: "What is the value of {{9^0}}?",
        options: ["1", "0", "9", "90"],
        answerIndex: 0,
        explanation:
          "Any non-zero number to the power 0 is 1. One way to see it: {{9^2 ÷ 9^2 = 9^(2-2) = 9^0}} by the index law, but anything divided by itself is 1. 0 comes from thinking of 'zero lots of 9', which is 9 × 0, not {{9^0}}.",
        difficulty: "warmup",
        guideRef: "index-laws",
        hints: ["Work out {{9^2 ÷ 9^2}} two ways: with the index law, and as an ordinary division."],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q04",
        question: "Work out {{cbrt(-27)}}.",
        options: ["9", "−9", "−3", "There is no answer: you can't find the cube root of a negative number"],
        answerIndex: 2,
        explanation:
          "(−3) × (−3) × (−3) = 9 × (−3) = −27, so {{cbrt(-27) = -3}}. Unlike square roots, cube roots of negative numbers exist, because three negatives multiply to a negative. −9 comes from dividing −27 by 3 instead of finding the cube root.",
        difficulty: "warmup",
        guideRef: "squares-cubes-roots",
        hints: ["Which number multiplied by itself three times gives −27? Try a negative number."],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q05",
        question: "Work out 12 − 4 + 3.",
        options: ["5", "11", "19", "13"],
        answerIndex: 1,
        explanation:
          "Addition and subtraction have equal priority, so work from left to right: 12 − 4 = 8, then 8 + 3 = 11. 5 comes from adding first because A comes before S in 'BIDMAS' — but the letters don't set an order between + and −.",
        difficulty: "warmup",
        guideRef: "order-of-operations",
        hints: ["When + and − are next to each other, which direction do you work in?"],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q06",
        question:
          "Marcus records his savings. A negative balance means he owes his older sister money.\n\n| Week | Change |\n|---|---|\n| Start | $12 |\n| Week 1 (buys a book) | −$20 |\n| Week 2 (pocket money) | +$15 |\n| Week 3 (a present for a friend) | −$11 |\n\nWhat is his balance after week 3?",
        options: ["$4", "−$16", "−$4", "$58"],
        answerIndex: 2,
        explanation:
          "Go row by row: 12 − 20 = −8; −8 + 15 = 7; 7 − 11 = −4. So he owes $4: the balance is −$4. −$16 comes from forgetting the starting $12; $4 is the right size but on the wrong side of zero.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Work through the table one row at a time.",
          "After week 1: 12 − 20. Is that above or below zero?",
          "Keep going: −8 + 15, then subtract 11.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q07",
        question: "Which is the best estimate for −49 × 21?",
        options: ["−1000", "1000", "−100", "−10 000"],
        answerIndex: 0,
        explanation:
          "Round each number to something easy: −50 × 20 = −1000 (the exact answer is −1029). The answer is negative because exactly one factor is negative, so 1000 has the wrong sign. −100 and −10 000 come from losing track of the zeros: 5 × 2 = 10, and the two zeros from 50 and 20 make 1000.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Round each number to something easy to multiply.",
          "−49 is about −50 and 21 is about 20.",
          "Work out the size first, then decide the sign.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q08",
        question: "Work out {{(-2)^3 * 3 - 4}}.",
        options: ["20", "−20", "−22", "−28"],
        answerIndex: 3,
        explanation:
          "Powers first: {{(-2)^3 = (-2) * (-2) * (-2) = -8}}. Then −8 × 3 = −24, and −24 − 4 = −28. 20 comes from thinking {{(-2)^3}} is positive (an odd power of a negative stays negative); −22 comes from treating {{(-2)^3}} as −2 × 3.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "What is the first thing to work out?",
          "Three negatives multiplied together: positive or negative?",
          "{{(-2)^3 = -8}}. Now multiply by 3, then subtract 4.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q09",
        question: "A square floor tile has an area of 196 cm². How long is each side?",
        diagram: squareTile,
        options: ["49 cm", "14 cm", "98 cm", "13 cm"],
        answerIndex: 1,
        explanation:
          "Area of a square = side × side, so the side is {{sqrt(196)}} = 14 cm (check: 14 × 14 = 196). 49 cm comes from dividing by 4, as if 196 were the perimeter; 13 cm comes from mixing up 196 with {{13^2 = 169}}.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Area of a square = side × side. Which operation undoes squaring?",
          "Estimate: {{10^2 = 100}} and {{15^2 = 225}}, so the side is between 10 and 15.",
          "Try 14 × 14.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q10",
        question: "Simplify {{6x^3 * 2x^4}}.",
        options: ["{{8x^7}}", "{{12x^12}}", "{{12x^7}}", "{{8x^12}}"],
        answerIndex: 2,
        explanation:
          "Multiply the numbers and add the indices of x: 6 × 2 = 12 and {{x^3 * x^4 = x^7}}, giving {{12x^7}}. {{8x^7}} adds the numbers 6 and 2 instead of multiplying them; {{12x^12}} multiplies the indices instead of adding them.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Split it into numbers and letters: (6 × 2) × ({{x^3 * x^4}}).",
          "The numbers multiply as normal.",
          "Same base, multiplying: add the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q11",
        question: "The diagram shows how three sets of numbers fit inside each other. Where does the number −6 belong?",
        diagram: nestedSets,
        options: [
          "Inside Integers but outside Natural numbers",
          "Inside Natural numbers",
          "Inside Rational numbers but outside Integers",
          "Outside all three sets",
        ],
        answerIndex: 0,
        explanation:
          "−6 is a whole number, so it is an integer; it isn't a counting number, so it is not natural. It is also rational, because −6 = {{-6/1}} — that's why the Integers box sits inside the Rational box. 'Outside all three sets' comes from thinking negative numbers don't belong to any of these sets.",
        difficulty: "core",
        guideRef: "types-of-number",
        hints: [
          "Is −6 a whole number?",
          "Could you count objects with −6?",
          "The boxes are nested: anything in an inner box is in the outer boxes too.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q12",
        question:
          "Always, sometimes or never true?\n\n*When you subtract a negative number from any number, the answer is bigger than the number you started with.*",
        options: [
          "Never — subtracting always makes a number smaller",
          "Sometimes — only when the starting number is positive",
          "Sometimes — only when the starting number is negative",
          "Always — subtracting a negative is the same as adding a positive",
        ],
        answerIndex: 3,
        explanation:
          "n − (−k) = n + k, and k is positive, so the answer is always k bigger than n, whatever n is. For example, −10 − (−3) = −7, and −7 is bigger than −10. 'Never' comes from the old idea that subtracting always makes things smaller — that is only true when you subtract a positive number.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Try a positive starting number, e.g. 5 − (−2).",
          "Now try a negative starting number: −10 − (−3). Is −7 bigger or smaller than −10?",
          "Rewrite n − (−k) as an addition.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q13",
        question: "Work out {{(24 - 4^2)/(-2)}}.",
        options: ["32", "4", "−4", "−200"],
        answerIndex: 2,
        explanation:
          "A fraction bar groups the top and the bottom like brackets. Top: {{24 - 4^2 = 24 - 16 = 8}}. Then 8 ÷ (−2) = −4. 32 comes from dividing only the 16 by −2; −200 comes from doing 24 − 4 before the power; 4 has the wrong sign — a positive divided by a negative is negative.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "Work out the whole top before dividing.",
          "On the top, which comes first: the power or the subtraction?",
          "The top is 8. Now work out 8 ÷ (−2).",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q14",
        question: "Hana writes {{3^2 * 3^4 = 9^6}}. What was her mistake?",
        options: [
          "She added the indices; she should have multiplied them to get {{9^8}}",
          "She multiplied the bases; the base should stay 3, giving {{3^6}}",
          "Nothing — {{3^2 * 3^4}} really is {{9^6}}",
          "She should have multiplied the indices to get {{3^8}}",
        ],
        answerIndex: 1,
        explanation:
          "{{3^2 * 3^4}} is six 3s multiplied together, which is {{3^6}} = 729. Her {{9^6}} = 531 441 is far too big: when you multiply powers of the same base, the base stays the same and only the indices add. {{3^8}} comes from multiplying the indices, which is the rule for a power of a power.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Write {{3^2 * 3^4}} out in full as 3 × 3 × … How many 3s are there?",
          "Does that string of 3s contain any 9s?",
          "Same base, multiplying: keep the base, add the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q15",
        question:
          "At 8 p.m. the temperature on a mountain is 2 °C. It falls by 3 °C every hour. What is the temperature at 1 a.m.?",
        options: ["−13 °C", "−15 °C", "13 °C", "−10 °C"],
        answerIndex: 0,
        explanation:
          "From 8 p.m. to 1 a.m. is 5 hours, so the change is 5 × (−3) = −15 °C. Then 2 + (−15) = −13 °C. −15 °C is the change, not the final temperature; −10 °C comes from counting only 4 hours.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "How many hours are there from 8 p.m. to 1 a.m.?",
          "Total change = number of hours × (−3).",
          "Add the change to the starting 2 °C.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q16",
        question:
          "Look at the pattern. Each step to the right divides by 3.\n\n| {{3^3}} | {{3^2}} | {{3^1}} | {{3^0}} | {{3^(-1)}} |\n|---|---|---|---|---|\n| 27 | 9 | 3 | 1 | ? |\n\nWhat is the value of {{3^(-1)}}?",
        options: ["−3", "0", "−1", "{{1/3}}"],
        answerIndex: 3,
        explanation:
          "Moving right divides by 3 each time, so after 1 comes 1 ÷ 3 = {{1/3}}. A negative index means 'one over', not 'negative': {{3^(-1)}} is a small positive number. −3 comes from treating the index as a multiplier (3 × −1).",
        difficulty: "core",
        guideRef: "negative-indices",
        hints: [
          "What do you do to get from each value to the next one?",
          "Continue the pattern one more step: 1 ÷ 3.",
          "A negative index gives a reciprocal, not a negative number.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q17",
        question: "Find the sum of all the integers from −10 to 12:\n\n    −10 + (−9) + (−8) + … + 11 + 12",
        options: ["0", "23", "12", "−23"],
        answerIndex: 1,
        explanation:
          "Pair each negative number with its opposite: −10 + 10 = 0, −9 + 9 = 0, …, −1 + 1 = 0. These pairs and the 0 all cancel, leaving only 11 + 12 = 23. 12 forgets that 11 has no partner either; 0 assumes everything cancels, but the list goes further up than it goes down.",
        difficulty: "challenge",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Adding 23 numbers one by one is slow. Can any of them cancel each other out?",
          "Pair −10 with 10, −9 with 9, … Which numbers are left without a partner?",
          "Only the unpaired numbers affect the total.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q18",
        question: "Without a calculator, decide which is larger: {{cbrt(30)}} or {{sqrt(10)}}?",
        options: [
          "{{cbrt(30)}}, because 30 is bigger than 10",
          "They are equal, because 30 = 3 × 10",
          "You can't tell without a calculator",
          "{{sqrt(10)}}, because {{3.15^2}} is less than 10 but {{3.15^3}} is more than 30",
        ],
        answerIndex: 3,
        explanation:
          "Both numbers lie between 3 and 4. Test 3.15: {{3.15^2 = 9.9225}}, which is less than 10, so {{sqrt(10)}} is more than 3.15; {{3.15^3}} is about 31.3, which is more than 30, so {{cbrt(30)}} is less than 3.15. A slicker way: raise both to the power 6, giving {{(sqrt(10))^6 = 10^3 = 1000}} and {{(cbrt(30))^6 = 30^2 = 900}}. Either way {{sqrt(10)}} is larger. 'Because 30 is bigger than 10' ignores that a cube root shrinks a number much more than a square root does.",
        difficulty: "challenge",
        guideRef: "squares-cubes-roots",
        hints: [
          "Both numbers are between 3 and 4. Which square and cube numbers tell you that?",
          "Try a number in between, such as 3.15: square it and cube it.",
          "Or: what happens if you raise both numbers to the power 6?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q19",
        question: "Which of these is equal to {{2^10 + 2^10}}?",
        options: ["{{2^11}}", "{{2^20}}", "{{4^10}}", "{{4^20}}"],
        answerIndex: 0,
        explanation:
          "Two lots of {{2^10}} is {{2 * 2^10 = 2^1 * 2^10 = 2^11}} (check: 1024 + 1024 = 2048 = {{2^11}}). {{2^20}} comes from adding the indices, but that law is for *multiplying* powers, not adding them; {{4^10}} comes from adding the bases.",
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "Adding two equal things is the same as doubling.",
          "Write the 2 you are doubling by as {{2^1}}.",
          "{{2^1 * 2^10}}: now use the multiplication law.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m2-q20",
        question: "Work out {{(-1)^1 + (-1)^2 + (-1)^3 + ... + (-1)^99}}.",
        options: ["0", "−99", "−1", "1"],
        answerIndex: 2,
        explanation:
          "Odd powers of −1 equal −1 and even powers equal +1. Pair them up: (−1 + 1) + (−1 + 1) + … covers the powers 1 to 98 and adds to 0. The 99th term, {{(-1)^99}}, is left over and equals −1. 0 assumes everything pairs up, but there is an odd number of terms; −99 treats every term as −1.",
        difficulty: "challenge",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Work out {{(-1)^1}}, {{(-1)^2}}, {{(-1)^3}} and {{(-1)^4}}. See a pattern?",
          "Group the terms in pairs. What does each pair add up to?",
          "99 terms: how many complete pairs, and what is left over?",
        ],
        strategy: "Find a pattern",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 3
  // =========================================================================
  {
    id: "integers-powers-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "integers-powers-m3-q01",
        question:
          "The thermometer shows the temperature in a Sapporo street at 7 a.m. By noon it is 6 °C warmer. What is the temperature at noon?",
        diagram: thermometer,
        options: ["−10 °C", "10 °C", "−2 °C", "2 °C"],
        answerIndex: 3,
        explanation:
          "The thermometer reads −4 °C. Going up 6 degrees: 4 degrees up to 0, then 2 more, so 2 °C. −10 °C comes from moving down instead of up; 10 °C comes from ignoring the minus sign on −4.",
        difficulty: "warmup",
        guideRef: "adding-subtracting-negatives",
        hints: ["Read the thermometer, then count up 6 marks, passing through 0."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q02",
        question: "Which is the best estimate for −612 ÷ 19?",
        options: ["−30", "30", "−3", "−300"],
        answerIndex: 0,
        explanation:
          "Round to −600 ÷ 20 = −30 (the exact answer is about −32.2). A negative divided by a positive is negative, so 30 has the wrong sign. −3 and −300 come from losing or gaining a zero when dividing 600 by 20.",
        difficulty: "warmup",
        guideRef: "multiplying-dividing-negatives",
        hints: ["Round −612 and 19 to numbers that divide easily, then decide the sign."],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q03",
        question: "Which of these is a cube number?",
        options: ["9", "36", "125", "12"],
        answerIndex: 2,
        explanation:
          "125 = 5 × 5 × 5 = {{5^3}}, so it is a cube number. 9 is {{3^2}}, a square — it comes from thinking '3 cubed' is 3 × 3. 12 comes from thinking {{4^3}} means 4 × 3.",
        difficulty: "warmup",
        guideRef: "squares-cubes-roots",
        hints: ["Cube numbers are 1 × 1 × 1, 2 × 2 × 2, 3 × 3 × 3, … List the first five."],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q04",
        question: "Which of these numbers is **irrational**?",
        options: ["{{22/7}}", "{{sqrt(2)}}", "0.333…", "{{sqrt(9)}}"],
        answerIndex: 1,
        explanation:
          "{{sqrt(2)}} can't be written as a fraction of two integers — its decimal 1.41421… goes on for ever without repeating. {{22/7}} is tempting because it is close to π, but it is a fraction, so it is rational. 0.333… repeats and equals {{1/3}}; {{sqrt(9)}} = 3.",
        difficulty: "warmup",
        guideRef: "types-of-number",
        hints: ["Rational means 'can be written as a fraction of two integers'. Which one can't be?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q05",
        question: "Write {{7 * 7 * 7 * 7}} in index form.",
        options: ["{{7^4}}", "{{4^7}}", "7 × 4", "{{7^3}}"],
        answerIndex: 0,
        explanation:
          "Four 7s are multiplied, so the base is 7 and the index is 4: {{7^4}}. {{4^7}} swaps the base and the index; {{7^3}} counts the × signs (three) instead of the 7s (four).",
        difficulty: "warmup",
        guideRef: "index-laws",
        hints: ["The base is the number being multiplied; the index counts how many of them there are."],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q06",
        question:
          "The table shows the temperatures at noon in five cities on one day in January.\n\n| City | Temperature |\n|---|---|\n| Singapore | 30 °C |\n| London | 4 °C |\n| Seoul | −6 °C |\n| Toronto | −12 °C |\n| Moscow | −14 °C |\n\nWhich two cities have temperatures exactly 18 degrees apart?",
        options: ["Seoul and Toronto", "London and Moscow", "Singapore and Toronto", "London and Toronto"],
        answerIndex: 1,
        explanation:
          "London is at 4 °C and Moscow is at −14 °C: from −14 up to 0 is 14 degrees, then 4 more, so 4 − (−14) = 18. Seoul and Toronto is tempting because 6 + 12 = 18, but both are below zero, so they are only 12 − 6 = 6 degrees apart. Singapore and Toronto only looks right if you ignore the minus sign (30 − 12); really they are 42 degrees apart.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Picture the five temperatures on a vertical number line.",
          "If both temperatures are below zero, do you add or subtract their sizes to find the gap?",
          "Gap = higher − lower, e.g. 4 − (−14).",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q07",
        question:
          "Always, sometimes or never true?\n\n*When you divide a negative number by a negative number, the answer is smaller than the number you started with.*",
        options: [
          "Always — dividing makes numbers smaller",
          "Sometimes — it depends on the numbers",
          "Sometimes — only when you divide by a number bigger than the starting number",
          "Never — the answer is positive, so it is bigger than the negative starting number",
        ],
        answerIndex: 3,
        explanation:
          "A negative ÷ a negative is positive, and every positive number is bigger than every negative number. So the answer is always bigger than the starting number, and the statement is never true. For example, −12 ÷ (−3) = 4, and 4 > −12. 'Always — dividing makes numbers smaller' is a rule that only works for positive numbers divided by numbers bigger than 1.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Try −12 ÷ (−3). Is the answer bigger or smaller than −12?",
          "What sign does a negative ÷ a negative have?",
          "Compare any positive number with any negative number.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q08",
        question: "Work out −12 ÷ 4 − 2 × (−3).",
        options: ["−9", "15", "3", "−15"],
        answerIndex: 2,
        explanation:
          "Do ÷ and × before −: −12 ÷ 4 = −3 and 2 × (−3) = −6. Then −3 − (−6) = −3 + 6 = 3. −9 comes from −3 − 6, losing the second negative sign; 15 comes from working left to right: −3 − 2 = −5, then −5 × (−3) = 15.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "Find the ÷ part and the × part first.",
          "Write the two results with their signs: −3 and −6.",
          "Now work out −3 − (−6). Subtracting a negative…",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q09",
        question: "Solve {{x^2 = 81}}.",
        options: ["x = 9 or x = −9", "x = 9 only", "x = 40.5 or x = −40.5", "x = 3 or x = −3"],
        answerIndex: 0,
        explanation:
          "Both 9 × 9 and (−9) × (−9) equal 81, so the equation has two solutions, x = 9 and x = −9 (often written x = ±9). 'x = 9 only' misses the negative root — the √ key shows only the positive one, but the equation asks for every number that squares to 81. 40.5 comes from halving 81; 3 is the square root of 9, not of 81.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Which number times itself gives 81?",
          "Is there a negative number that also works?",
          "Check (−9) × (−9).",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q10",
        question: "Find the value of n: {{2^n * 2^4 = 2^11}}.",
        options: ["15", "2.75", "3", "7"],
        answerIndex: 3,
        explanation:
          "Multiplying powers of 2 adds the indices, so n + 4 = 11, giving n = 7. Check: {{2^7 * 2^4 = 2^(7+4) = 2^11}}. 15 comes from adding 4 instead of undoing it; 2.75 comes from thinking the indices multiply (n × 4 = 11).",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "When you multiply powers of the same base, what happens to the indices?",
          "So n + 4 = 11.",
          "Undo the + 4.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q11",
        question:
          "Zara wants to work out {{sqrt(16 + 9)}}. She types √ 16 + 9 = on her calculator and gets 13. What has gone wrong?",
        options: [
          "Nothing — the answer really is 13",
          "The calculator found {{sqrt(16)}} + 9; she needed brackets, and the answer is 5",
          "She should have rooted each number: {{sqrt(16) + sqrt(9)}} = 7",
          "She should have typed 16 + 9 first, so the answer is 25",
        ],
        answerIndex: 1,
        explanation:
          "Her calculator applied the √ only to the 16 straight after it, so she got {{sqrt(16) + 9 = 4 + 9 = 13}}. The root sign covers the whole of 16 + 9, so she needs brackets: {{sqrt(16 + 9) = sqrt(25) = 5}}. 7 comes from rooting each part separately — but {{sqrt(16 + 9)}} is not the same as {{sqrt(16) + sqrt(9)}}. 25 forgets the root altogether.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "Which part of the calculation did the calculator take the square root of?",
          "4 + 9 = 13. Where did the 4 come from?",
          "The long bar of a root sign acts like brackets.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q12",
        question: "How many of these numbers are integers?\n\n−7,   0.5,   12,   {{sqrt(16)}},   {{-18/3}},   π",
        options: ["2", "3", "4", "5"],
        answerIndex: 2,
        explanation:
          "−7 and 12 are integers, and so are {{sqrt(16) = 4}} and {{-18/3 = -6}} — a number is classified by its *value*, not by how it is written. 0.5 and π are not whole numbers. 2 comes from only counting the numbers that already look whole.",
        difficulty: "core",
        guideRef: "types-of-number",
        hints: [
          "Work out the value of each number first.",
          "What are the values of {{sqrt(16)}} and {{-18/3}}? Are they whole?",
          "Remember that integers can be negative.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q13",
        question: "What number goes in the box?\n\n    −72 ÷ ▢ = 8",
        options: ["−9", "9", "−576", "−64"],
        answerIndex: 0,
        explanation:
          "Work backwards: the box is −72 ÷ 8 = −9. Check: −72 ÷ (−9) = 8, because both numbers are negative. 9 would give −72 ÷ 9 = −8, the wrong sign; −576 comes from multiplying −72 by 8 instead of dividing.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "8 times the box number must give −72.",
          "So the box = −72 ÷ 8.",
          "Check your sign: a negative ÷ a negative is positive.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q14",
        question: "Which is the best estimate of {{sqrt(60)}}?",
        options: ["30", "7.5", "8.5", "7.7"],
        answerIndex: 3,
        explanation:
          "49 < 60 < 64, so {{sqrt(60)}} is between 7 and 8, and nearer 8 because 60 is close to 64. Test: {{7.7^2 = 59.29}} and {{7.8^2 = 60.84}}, so {{sqrt(60)}} is between 7.7 and 7.8 (about 7.75). 7.5 assumes 60 is halfway between 49 and 64, but {{7.5^2 = 56.25}} is too small. 30 comes from halving.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Which two square numbers is 60 between?",
          "60 is much nearer 64 than 49, so the root is nearer 8 than 7.",
          "Square 7.5 and 7.7 to check.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q15",
        question: "Simplify {{12y^8 ÷ 4y^2}}.",
        options: ["{{8y^6}}", "{{3y^6}}", "{{3y^4}}", "{{3y^10}}"],
        answerIndex: 1,
        explanation:
          "Divide the numbers and subtract the indices: 12 ÷ 4 = 3 and {{y^8 ÷ y^2 = y^6}}, giving {{3y^6}}. {{3y^4}} comes from dividing the indices (8 ÷ 2); {{8y^6}} subtracts the numbers (12 − 4) instead of dividing them.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Deal with the numbers and the letters separately.",
          "12 ÷ 4 = ? and {{y^8 ÷ y^2}} = ?",
          "Same base, dividing: subtract the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q16",
        question: "What is the value of {{2^(-3)}}?",
        options: ["−8", "−6", "{{1/8}}", "{{1/6}}"],
        answerIndex: 2,
        explanation:
          "A negative index means 'one over the positive power': {{2^(-3) = 1/2^3 = 1/8}}. −8 comes from thinking a negative index makes the answer negative; {{1/6}} comes from working out 2 × 3 instead of {{2^3}}.",
        difficulty: "core",
        guideRef: "negative-indices",
        hints: [
          "Follow the pattern: {{2^2 = 4}}, {{2^1 = 2}}, {{2^0 = 1}}. Each step down halves.",
          "So {{2^(-1) = 1/2}} and {{2^(-2) = 1/4}}. One more step?",
          "{{2^(-3) = 1/2^3}}.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q17",
        question: "Six consecutive integers add up to −9. What is the largest of them?",
        options: ["1", "−4", "−1", "−1.5"],
        answerIndex: 0,
        explanation:
          "The mean is −9 ÷ 6 = −1.5, so the six integers sit symmetrically around −1.5: −4, −3, −2, −1, 0, 1. Check: −4 − 3 − 2 − 1 + 0 + 1 = −9. The largest is 1. −4 is the smallest, not the largest; −1.5 is the middle value, which isn't even an integer.",
        difficulty: "challenge",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "If six numbers add up to −9, what is their mean?",
          "Six consecutive integers are balanced around their mean: three below it and three above.",
          "The mean −1.5 sits between −2 and −1. Count up three integers from there.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q18",
        question: "What is the last digit of {{3^50}}?",
        options: ["3", "1", "9", "7"],
        answerIndex: 2,
        explanation:
          "The last digits of powers of 3 go 3, 9, 7, 1 and then repeat every 4 powers. 50 = 4 × 12 + 2, so {{3^50}} is 2 steps into a cycle: its last digit is 9. 1 comes from thinking 50 is a multiple of 4; 3 comes from assuming every power of 3 ends in 3.",
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "Work out the last digits of {{3^1}}, {{3^2}}, {{3^3}}, {{3^4}} and {{3^5}}.",
          "The pattern repeats every 4 powers. Where does the 50th power sit in the cycle?",
          "50 ÷ 4 = 12 remainder 2.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q19",
        question: "When a = −2, which of these expressions has the greatest value?",
        options: ["{{a^2}}", "{{-a^2}}", "{{a^3}}", "{{(-a)^3}}"],
        answerIndex: 3,
        explanation:
          "With a = −2: {{a^2 = (-2)^2 = 4}}; {{-a^2 = -(a^2) = -4}}, because the power is done before the minus sign; {{a^3 = (-2)^3 = -8}}; and −a = 2, so {{(-a)^3 = 2^3 = 8}}. The greatest is {{(-a)^3}}, which equals 8. {{a^3}} is tempting if you forget that the cube of a negative number is negative; {{a^2}} is the trap of assuming a square must be biggest.",
        difficulty: "challenge",
        guideRef: "order-of-operations",
        hints: [
          "Substitute a = −2 into each expression, using brackets: {{(-2)^2}} and so on.",
          "In {{-a^2}}, which happens first: the squaring or the minus sign?",
          "What is −a when a = −2?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m3-q20",
        question:
          "Always, sometimes or never true?\n\n*Between any two different rational numbers there is another rational number.*",
        options: [
          "Sometimes — there is no rational number between two consecutive integers such as 3 and 4",
          "Always — the mean of the two numbers is rational and lies between them",
          "Sometimes — only when the two fractions have the same denominator",
          "Never — every rational number has a 'next' one, with nothing in between",
        ],
        answerIndex: 1,
        explanation:
          "Take any two rational numbers. Their mean (the halfway point) is again a fraction of two integers, so it is rational, and it sits between them. For example, halfway between {{1/3}} and {{1/2}} is {{5/12}}. You can repeat this for ever, so there are infinitely many rationals between any two. The claim about 3 and 4 forgets numbers that aren't integers: 3.5 is rational and lies between them.",
        difficulty: "challenge",
        guideRef: "types-of-number",
        hints: [
          "Pick two rational numbers close together, such as {{1/3}} and {{1/2}}. Can you find one between them?",
          "Which number is exactly halfway between two numbers?",
          "Is the mean of two fractions still a fraction?",
        ],
        strategy: "Try small cases",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 4
  // =========================================================================
  {
    id: "integers-powers-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "integers-powers-m4-q01",
        question:
          "Siti parks on level −3 (B3) of a basement car park. She takes the lift up 8 levels to a shop. Which level is the shop on?",
        options: ["11", "−11", "5", "−5"],
        answerIndex: 2,
        explanation:
          "Up 8 from −3: 3 levels up to level 0, then 5 more, so level 5. 11 comes from ignoring the minus sign (3 + 8); −11 comes from going down instead of up.",
        difficulty: "warmup",
        guideRef: "adding-subtracting-negatives",
        hints: ["Count up from −3: how many levels to reach 0, and how many of the 8 are left after that?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q02",
        question: "Work out (−2) × (−3) × (−5).",
        options: ["30", "−30", "−10", "10"],
        answerIndex: 1,
        explanation:
          "(−2) × (−3) = 6, then 6 × (−5) = −30. Three negative factors give a negative answer, because an odd number of negatives can't all pair up. 30 comes from thinking 'negatives multiply to a positive' without counting them; −10 comes from adding instead of multiplying.",
        difficulty: "warmup",
        guideRef: "multiplying-dividing-negatives",
        hints: ["Multiply two numbers at a time and keep track of the sign after each step."],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q03",
        question: "Work out {{15^2}}.",
        options: ["30", "125", "150", "225"],
        answerIndex: 3,
        explanation:
          "{{15^2 = 15 * 15}} = 15 × 10 + 15 × 5 = 150 + 75 = 225. 30 comes from doubling instead of squaring; 125 comes from squaring each digit separately ({{1^2}} and {{5^2}}), which doesn't work; 150 is only 15 × 10.",
        difficulty: "warmup",
        guideRef: "squares-cubes-roots",
        hints: ["Split it up: 15 × 15 = 15 × 10 + 15 × 5."],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q04",
        question: "Simplify {{p^4 * p * p^3}}.",
        options: ["{{p^8}}", "{{p^7}}", "{{p^12}}", "{{3p^8}}"],
        answerIndex: 0,
        explanation:
          "A p on its own is {{p^1}}, so the indices add to 4 + 1 + 3 = 8, giving {{p^8}}. {{p^7}} forgets that the lone p counts as {{p^1}}; {{p^12}} multiplies the indices instead of adding them.",
        difficulty: "warmup",
        guideRef: "index-laws",
        hints: ["How many p's are multiplied altogether? A p on its own is {{p^1}}."],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q05",
        question: "Which of these is a rational number that is **not** an integer?",
        options: ["−9", "{{sqrt(25)}}", "π", "−2.75"],
        answerIndex: 3,
        explanation:
          "−2.75 = {{-11/4}}, a fraction of two integers, so it is rational — but it is not whole. −9 and {{sqrt(25) = 5}} are integers. π is not rational at all: its decimal never ends and never repeats.",
        difficulty: "warmup",
        guideRef: "types-of-number",
        hints: ["Rational means 'can be written as a fraction of two integers'. Which option is a fraction but not a whole number?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q06",
        question: "What number goes in the box?\n\n    ▢ − (−4) = −9",
        options: ["−5", "−13", "13", "5"],
        answerIndex: 1,
        explanation:
          "▢ − (−4) is the same as ▢ + 4. So ▢ + 4 = −9, and working backwards ▢ = −9 − 4 = −13. Check: −13 − (−4) = −13 + 4 = −9. −5 comes from undoing a subtraction of 4 by adding 4 — but the box actually had 4 *added* to it.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Rewrite ▢ − (−4) as an addition.",
          "▢ + 4 = −9. What undoes + 4?",
          "Work out −9 − 4.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q07",
        question: "Two integers have a product of −12 and a sum of 1. What are they?",
        options: ["−4 and 3", "6 and −2", "4 and −3", "12 and −1"],
        answerIndex: 2,
        explanation:
          "4 × (−3) = −12 and 4 + (−3) = 1. −4 and 3 has the right product, but its sum is −1: for the sum to be positive, the number with the bigger size must be the positive one. 6 and −2 adds to 4, and 12 and −1 adds to 11.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "A negative product means one number is positive and the other is negative.",
          "List the factor pairs of 12: 1 and 12, 2 and 6, 3 and 4. Which pair differs by 1?",
          "Which of 3 and 4 must be negative to make the sum +1?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q08",
        question:
          "Wei Ling types {{-3^2}} into her calculator and gets −9. Jun types {{(-3)^2}} and gets 9. Which statement is correct?",
        options: [
          "Both are right: in {{-3^2}} the power is done before the minus sign, so it means {{-(3^2)}} = −9",
          "Wei Ling's calculator is broken: a negative number squared is always positive",
          "Both should be −9, because squaring keeps the sign",
          "Both should be 9, because the brackets make no difference",
        ],
        answerIndex: 0,
        explanation:
          "Powers come before everything except brackets. In {{-3^2}} the index belongs to the 3 only, so it means −(3 × 3) = −9. In {{(-3)^2}} the brackets make −3 the base: (−3) × (−3) = 9. 'A negative number squared is always positive' is true, but in {{-3^2}} the number being squared is 3, not −3.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "In {{-3^2}}, what is the base of the power: 3 or −3?",
          "Powers are done before the minus sign unless brackets say otherwise.",
          "Compare −(3 × 3) with (−3) × (−3).",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q09",
        question: "Which of these does **not** have a value on the number line?",
        options: ["{{cbrt(-8)}}", "{{sqrt(0)}}", "{{sqrt(0.25)}}", "{{sqrt(-16)}}"],
        answerIndex: 3,
        explanation:
          "Any number squared is positive or zero: 4 × 4 = 16 and (−4) × (−4) = 16 too. So nothing squares to −16, and {{sqrt(-16)}} has no value on the number line. {{cbrt(-8)}} is tempting, but it is fine: (−2) × (−2) × (−2) = −8, because three negatives multiply to a negative. {{sqrt(0)}} = 0 and {{sqrt(0.25)}} = 0.5.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Can a number multiplied by itself ever give a negative answer?",
          "Check (−2) × (−2) × (−2).",
          "Square roots and cube roots behave differently with negative numbers.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q10",
        question: "Which of these is equal to {{4^3}}?",
        options: ["{{2^5}}", "{{2^6}}", "{{3^4}}", "12"],
        answerIndex: 1,
        explanation:
          "{{4^3 = 4 * 4 * 4}}, and each 4 is {{2^2}}, so {{4^3 = (2^2)^3 = 2^6}} = 64. {{2^5}} comes from adding the indices 2 + 3 instead of multiplying them; {{3^4}} = 81 swaps the base and the index; 12 is 4 × 3.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Write each 4 as 2 × 2.",
          "How many 2s are multiplied in 4 × 4 × 4?",
          "{{(2^2)^3}}: a power of a power multiplies the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q11",
        question:
          "The summit of Mount Everest is about 8849 m above sea level. The shore of the Dead Sea is about 430 m below sea level. What is the difference in height between them?",
        diagram: everestDeadSea,
        options: ["8419 m", "−9279 m", "9279 m", "8849 m"],
        answerIndex: 2,
        explanation:
          "Difference = 8849 − (−430) = 8849 + 430 = 9279 m: it is 430 m up to sea level, then 8849 m more. 8419 m comes from subtracting 430, as if the Dead Sea shore were above sea level. A difference in height is a distance, so it is positive — not −9279 m.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Think of sea level as 0. Write both heights as integers.",
          "How far is it from −430 up to 0? And from 0 up to 8849?",
          "Difference = 8849 − (−430).",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q12",
        question: "Which calculation gives the greatest answer?",
        options: ["{{(2 + 3 * 4)^2}}", "{{2 + (3 * 4)^2}}", "{{(2 + 3) * 4^2}}", "{{2 + 3 * 4^2}}"],
        answerIndex: 0,
        explanation:
          "Brackets first, then powers, then × and +: {{(2 + 3 * 4)^2 = 14^2 = 196}}; {{2 + (3 * 4)^2 = 2 + 144 = 146}}; {{(2 + 3) * 4^2 = 5 * 16 = 80}}; {{2 + 3 * 4^2 = 2 + 48 = 50}}. The greatest is 196. {{(2 + 3) * 4^2}} looks biggest if you square the 20 from (2 + 3) × 4 to get 400 — but the index belongs only to the 4.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "Work out each one carefully: brackets, then powers, then × and +.",
          "In {{(2 + 3) * 4^2}}, which number is being squared?",
          "Inside {{(2 + 3 * 4)}}, do the × before the +.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q13",
        question:
          "The table shows the lowest temperature in a town on four days.\n\n| Mon | Tue | Wed | Thu |\n|---|---|---|---|\n| −4 °C | −1 °C | 3 °C | −6 °C |\n\nWhat is the mean of these four temperatures?",
        options: ["−3.5 °C", "3.5 °C", "2 °C", "−2 °C"],
        answerIndex: 3,
        explanation:
          "Total = −4 + (−1) + 3 + (−6) = −8. Mean = −8 ÷ 4 = −2 °C. −3.5 °C comes from treating the 3 °C as −3; 3.5 °C comes from ignoring all the minus signs.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Add the four temperatures, keeping their signs.",
          "−4 − 1 + 3 − 6 = ?",
          "Divide the total by 4: a negative ÷ a positive is negative.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q14",
        question: "Solve {{x^3 = -64}}.",
        options: ["x = −4", "x = 4 or x = −4", "x = −8", "There is no solution"],
        answerIndex: 0,
        explanation:
          "(−4) × (−4) × (−4) = 16 × (−4) = −64, so x = −4. There is only one answer, because {{4^3}} is +64, not −64. 'x = 4 or x = −4' copies the ± rule for squares, which doesn't apply to cubes; −8 comes from thinking of {{8^2 = 64}}, a square rather than a cube.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Which number cubed gives 64?",
          "Does 4 work? Does −4 work?",
          "The cube of a negative number is negative; the cube of a positive number is positive.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q15",
        question:
          "Aisha says {{5^0 = 0}}, because 'zero lots of 5 is nothing'. Which argument shows that she is wrong?",
        options: [
          "{{5^0 = 5}}, because an index of 0 leaves the base unchanged",
          "{{5^0}} has no value, because you can't multiply 5 by itself zero times",
          "{{5^3 ÷ 5^3 = 5^0}} by the index law, but any number divided by itself is 1, so {{5^0 = 1}}",
          "{{5^0 = 0}} is right for 5 but wrong for other numbers",
        ],
        answerIndex: 2,
        explanation:
          "By the law for dividing powers, {{5^3 ÷ 5^3 = 5^(3-3) = 5^0}}. But {{5^3 ÷ 5^3}} = 125 ÷ 125 = 1. So {{5^0}} must be 1 for the index laws to work. 'Zero lots of 5' describes 5 × 0, not {{5^0}}. The idea that {{5^0 = 5}} would break the pattern 125, 25, 5, …, where each step down divides by 5.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "What is {{5^3 ÷ 5^3}} as an ordinary number?",
          "Now use the index law on {{5^3 ÷ 5^3}}.",
          "Both answers must be equal.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q16",
        question:
          "Marcus says: *0.121212… (repeating for ever) is irrational, because its decimal never ends.* Is he right?",
        options: [
          "Yes — any decimal that never ends is irrational",
          "No — it repeats, so it equals a fraction ({{4/33}}) and is rational",
          "Yes — it can't be written exactly on a calculator",
          "It depends on how many decimal places you write down",
        ],
        answerIndex: 1,
        explanation:
          "A decimal that repeats for ever is always rational. Here 0.121212… = {{12/99 = 4/33}} (check: 4 ÷ 33 = 0.1212…). Irrational numbers like {{sqrt(2)}} and π have decimals that never end **and** never repeat. 'Any decimal that never ends is irrational' forgets recurring decimals such as {{1/3}} = 0.333….",
        difficulty: "core",
        guideRef: "types-of-number",
        hints: [
          "Think of {{1/3}}. What does its decimal look like?",
          "Irrational decimals never end AND never repeat.",
          "Try dividing 4 by 33.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q17",
        question:
          "A frog starts at 0 on a number line. It jumps +5, then −3, then +5, then −3, and so on. After how many jumps does it **first** land on 20?",
        options: ["10", "17", "4", "20"],
        answerIndex: 3,
        explanation:
          "Each pair of jumps (+5 then −3) moves the frog +2, so after 2k jumps it is at 2k, and one jump later it is at 2k + 5, an odd number. 20 is even, so it can only be reached after an even number of jumps: 2k = 20 gives k = 10 pairs, which is 20 jumps. 10 counts pairs of jumps, not jumps; 17 is when the frog first gets *past* 20 (it jumps from 16 to 21); 4 ignores the −3 jumps.",
        difficulty: "challenge",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Write down where the frog is after each of the first 6 jumps.",
          "Where is it after 2 jumps? After 4? After 6?",
          "After an even number of jumps it is on an even number; after an odd number of jumps it is on an odd number. Which kind is 20?",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q18",
        question: "Find x if {{4^x = 8^6}}.",
        options: ["12", "9", "6", "18"],
        answerIndex: 1,
        explanation:
          "Write both sides as powers of 2: {{4^x = (2^2)^x = 2^(2x)}} and {{8^6 = (2^3)^6 = 2^18}}. So 2x = 18 and x = 9. 18 comes from rewriting 8 as {{2^3}} but forgetting that 4 is {{2^2}}; 12 comes from thinking that because 8 is twice 4, the index must double.",
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "4 and 8 are both powers of the same number. Which number?",
          "Write {{8^6}} as a power of 2, and {{4^x}} as a power of 2.",
          "{{2^(2x) = 2^18}}, so 2x = ?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q19",
        question: "The diagram shows that the first four odd numbers add up to a square number. Work out\n\n    1 + 3 + 5 + 7 + … + 99",
        diagram: oddLayers,
        options: ["5000", "9801", "2500", "2450"],
        answerIndex: 2,
        explanation:
          "Each new odd number wraps an L-shape round the square, so the first n odd numbers add up to {{n^2}}. From 1 to 99 there are 50 odd numbers (99 = 2 × 50 − 1), so the sum is {{50^2 = 2500}}. Check by pairing: 1 + 99 = 3 + 97 = … = 100, and 50 numbers make 25 pairs, so 25 × 100 = 2500. 5000 comes from thinking there are 50 pairs; 9801 = {{99^2}} squares the last number instead of counting the terms.",
        difficulty: "challenge",
        guideRef: "squares-cubes-roots",
        hints: [
          "Try small cases: 1, 1 + 3, 1 + 3 + 5, 1 + 3 + 5 + 7. What do you notice?",
          "The sum of the first n odd numbers is {{n^2}}. So how many odd numbers are there from 1 to 99?",
          "99 is the 50th odd number.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "integers-powers-m4-q20",
        question: "Put these in order, from smallest to largest:\n\n{{2^(-3)}},   {{(-2)^2}},   {{-2^2}},   {{2^0}}",
        options: [
          "{{-2^2}}, {{2^(-3)}}, {{2^0}}, {{(-2)^2}}",
          "{{2^(-3)}}, {{-2^2}}, {{2^0}}, {{(-2)^2}}",
          "{{-2^2}}, {{2^0}}, {{2^(-3)}}, {{(-2)^2}}",
          "{{2^(-3)}}, {{2^0}}, {{-2^2}}, {{(-2)^2}}",
        ],
        answerIndex: 0,
        explanation:
          "Work out each value: {{-2^2 = -(2^2) = -4}}; {{2^(-3) = 1/2^3 = 1/8}}; {{2^0 = 1}}; {{(-2)^2 = 4}}. So the order is −4, {{1/8}}, 1, 4. Putting {{2^(-3)}} first comes from thinking a negative index makes a number negative (it is {{1/8}}: small, but positive). Putting {{2^0}} before {{2^(-3)}} comes from thinking {{2^0 = 0}}.",
        difficulty: "challenge",
        guideRef: "negative-indices",
        hints: [
          "Work out the value of each one before you try to order them.",
          "A negative index means 'one over': {{2^(-3) = 1/2^3}}.",
          "In {{-2^2}}, only the 2 is squared; in {{(-2)^2}}, the whole −2 is.",
        ],
        strategy: "Work in stages",
      },
    ],
  },
];
