// ---------------------------------------------------------------------------
// Big Exam — Calculator Paper 1 (cross-topic, 30 questions, 60 minutes).
// Ordered easier → harder: q01–q08 warm-up, q09–q24 core, q25–q30 challenge.
// ---------------------------------------------------------------------------
import type { ExamPaper } from "../types.ts";

const KAYAK_GRAPH = `<svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Straight-line graph of kayak hire cost C dollars against time t hours. The line starts at the point (0, 12) on the cost axis and passes through the point (4, 50)." font-family="sans-serif"><rect x="0" y="0" width="360" height="260" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="106" y1="40" x2="106" y2="220"/><line x1="162" y1="40" x2="162" y2="220"/><line x1="218" y1="40" x2="218" y2="220"/><line x1="274" y1="40" x2="274" y2="220"/><line x1="330" y1="40" x2="330" y2="220"/><line x1="50" y1="190" x2="330" y2="190"/><line x1="50" y1="160" x2="330" y2="160"/><line x1="50" y1="130" x2="330" y2="130"/><line x1="50" y1="100" x2="330" y2="100"/><line x1="50" y1="70" x2="330" y2="70"/><line x1="50" y1="40" x2="330" y2="40"/></g><line x1="50" y1="220" x2="340" y2="220" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="220" x2="50" y2="30" stroke="#1f2937" stroke-width="1.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="50" y="236">0</text><text x="106" y="236">1</text><text x="162" y="236">2</text><text x="218" y="236">3</text><text x="274" y="236">4</text><text x="330" y="236">5</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="224">0</text><text x="44" y="194">10</text><text x="44" y="164">20</text><text x="44" y="134">30</text><text x="44" y="104">40</text><text x="44" y="74">50</text><text x="44" y="44">60</text></g><text x="190" y="254" font-size="12" fill="#1f2937" text-anchor="middle">Time, t (hours)</text><text x="14" y="130" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 14 130)">Cost, C ($)</text><line x1="50" y1="184" x2="330" y2="41.5" stroke="#334155" stroke-width="2.5"/><circle cx="50" cy="184" r="4" fill="#1f2937"/><circle cx="274" cy="70" r="4" fill="#1f2937"/><text x="58" y="202" font-size="12" fill="#1f2937">(0, 12)</text><text x="266" y="60" font-size="12" fill="#1f2937" text-anchor="end">(4, 50)</text></svg>`;

const PLANTER_PRISM = `<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A prism-shaped planter box. Its front face is a trapezium with parallel sides 42.5 cm at the top and 31 cm at the bottom and perpendicular height 27.5 cm. The box is 1.85 m long." font-family="sans-serif"><rect x="0" y="0" width="440" height="240" fill="#ffffff"/><polygon points="40,120 270,40 397.5,40 167.5,120" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><polygon points="167.5,120 397.5,40 380.25,122.5 150.25,202.5" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><g stroke="#334155" stroke-width="1" stroke-dasharray="4 3" fill="none"><line x1="57.25" y1="202.5" x2="287.25" y2="122.5"/><line x1="287.25" y1="122.5" x2="380.25" y2="122.5"/><line x1="270" y1="40" x2="287.25" y2="122.5"/></g><polygon points="40,120 167.5,120 150.25,202.5 57.25,202.5" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="57.25" y1="120" x2="57.25" y2="202.5" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/><path d="M57.25 196.5 L63.25 196.5 L63.25 202.5" fill="none" stroke="#334155" stroke-width="1"/><g font-size="12" fill="#1f2937"><text x="104" y="137" text-anchor="middle">42.5 cm</text><text x="104" y="220" text-anchor="middle">31 cm</text><text x="66" y="168">27.5 cm</text><text x="290" y="182">1.85 m</text></g></svg>`;

const KAYAK_BEARING = `<svg viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sketch, not to scale. North lines are drawn at P and at U. The line from P to U makes an angle of 58 degrees clockwise from North at P. PU is 9.2 cm on the map." font-family="sans-serif"><rect x="0" y="0" width="320" height="250" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><line x1="80" y1="210" x2="80" y2="72"/><line x1="249.61" y1="104.02" x2="249.61" y2="36"/></g><polygon points="80,62 75,74 85,74" fill="#334155"/><polygon points="249.61,26 244.61,38 254.61,38" fill="#334155"/><line x1="80" y1="210" x2="249.61" y2="104.02" stroke="#1f2937" stroke-width="2"/><path d="M80 174 A36 36 0 0 1 110.53 190.92" fill="none" stroke="#334155" stroke-width="1.5"/><circle cx="80" cy="210" r="3.5" fill="#1f2937"/><circle cx="249.61" cy="104.02" r="3.5" fill="#1f2937"/><g font-size="12" fill="#1f2937"><text x="80" y="56" text-anchor="middle">N</text><text x="249.61" y="20" text-anchor="middle">N</text><text x="96" y="162">058°</text><text x="66" y="226" font-size="13">P</text><text x="258" y="110" font-size="13">U</text><text x="172" y="168" text-anchor="middle" transform="rotate(-32 172 168)">9.2 cm on the map</text><text x="312" y="242" text-anchor="end" font-size="11">Not to scale</text></g></svg>`;

const RAIN_SCATTER = `<svg viewBox="0 0 380 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter graph of daily rainfall in millimetres (0 to 50) against visitors in hundreds (0 to 60) for 16 days. The points go down from about 52 hundred visitors at 1 mm of rain to about 15 hundred visitors at 48 mm of rain." font-family="sans-serif"><rect x="0" y="0" width="380" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="110" y1="38" x2="110" y2="230"/><line x1="170" y1="38" x2="170" y2="230"/><line x1="230" y1="38" x2="230" y2="230"/><line x1="290" y1="38" x2="290" y2="230"/><line x1="350" y1="38" x2="350" y2="230"/><line x1="50" y1="198" x2="350" y2="198"/><line x1="50" y1="166" x2="350" y2="166"/><line x1="50" y1="134" x2="350" y2="134"/><line x1="50" y1="102" x2="350" y2="102"/><line x1="50" y1="70" x2="350" y2="70"/><line x1="50" y1="38" x2="350" y2="38"/></g><line x1="50" y1="230" x2="358" y2="230" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="230" x2="50" y2="30" stroke="#1f2937" stroke-width="1.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="50" y="246">0</text><text x="110" y="246">10</text><text x="170" y="246">20</text><text x="230" y="246">30</text><text x="290" y="246">40</text><text x="350" y="246">50</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="234">0</text><text x="44" y="202">10</text><text x="44" y="170">20</text><text x="44" y="138">30</text><text x="44" y="106">40</text><text x="44" y="74">50</text><text x="44" y="42">60</text></g><text x="200" y="264" font-size="12" fill="#1f2937" text-anchor="middle">Daily rainfall (mm)</text><text x="14" y="134" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 14 134)">Visitors (hundreds)</text><g fill="#1f2937"><circle cx="56" cy="63.6" r="3.5"/><circle cx="62" cy="76.4" r="3.5"/><circle cx="74" cy="70" r="3.5"/><circle cx="92" cy="86" r="3.5"/><circle cx="110" cy="92.4" r="3.5"/><circle cx="128" cy="102" r="3.5"/><circle cx="146" cy="108.4" r="3.5"/><circle cx="164" cy="118" r="3.5"/><circle cx="182" cy="114.8" r="3.5"/><circle cx="200" cy="130.8" r="3.5"/><circle cx="224" cy="137.2" r="3.5"/><circle cx="248" cy="146.8" r="3.5"/><circle cx="272" cy="159.6" r="3.5"/><circle cx="296" cy="162.8" r="3.5"/><circle cx="320" cy="175.6" r="3.5"/><circle cx="338" cy="182" r="3.5"/></g></svg>`;

const COURTYARD = `<svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular courtyard 14 m by 9 m, shaded yellow. In the middle is a circular fountain of diameter 4.2 m. In the bottom-left corner is a quarter-circle flowerbed of radius 3.5 m." font-family="sans-serif"><rect x="0" y="0" width="360" height="260" fill="#ffffff"/><rect x="40" y="40" width="280" height="180" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><circle cx="180" cy="130" r="42" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><line x1="138" y1="130" x2="222" y2="130" stroke="#1f2937" stroke-width="1" stroke-dasharray="4 3"/><path d="M40 220 L40 150 A70 70 0 0 1 110 220 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><g stroke="#334155" stroke-width="1"><line x1="40" y1="229" x2="110" y2="229"/><line x1="40" y1="224" x2="40" y2="234"/><line x1="110" y1="224" x2="110" y2="234"/></g><g font-size="12" fill="#1f2937"><text x="180" y="32" text-anchor="middle">14 m</text><text x="330" y="134">9 m</text><text x="180" y="124" text-anchor="middle">4.2 m</text><text x="180" y="150" text-anchor="middle" font-size="11">fountain</text><text x="46" y="206" font-size="11">flowerbed</text><text x="75" y="248" text-anchor="middle">3.5 m</text><text x="262" y="82" text-anchor="middle">paved</text></g></svg>`;

const RUNNING_TRACK = `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sketch of a running track, not to scale: two straights of 84.39 m joined by two semicircular bends. The inside edge of lane 1 is a solid line with bend radius 36.5 m. The inside edge of lane 2 is a dashed line 1.22 m further out." font-family="sans-serif"><rect x="0" y="0" width="400" height="230" fill="#ffffff"/><path d="M120 31 L280 31 A84 84 0 0 1 280 199 L120 199 A84 84 0 0 1 120 31 Z" fill="#fecaca" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><path d="M120 46 L280 46 A69 69 0 0 1 280 184 L120 184 A69 69 0 0 1 120 46 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="280" y1="115" x2="349" y2="115" stroke="#1f2937" stroke-width="1"/><circle cx="280" cy="115" r="2.5" fill="#1f2937"/><line x1="200" y1="184" x2="200" y2="199" stroke="#1f2937" stroke-width="1.5"/><g font-size="12" fill="#1f2937" text-anchor="middle"><text x="200" y="70">84.39 m</text><text x="314" y="108">36.5 m</text><text x="200" y="120" font-size="11">solid: inside edge of lane 1</text><text x="200" y="138" font-size="11">dashed: inside edge of lane 2</text><text x="200" y="218">1.22 m</text></g><text x="396" y="226" font-size="11" fill="#1f2937" text-anchor="end">Not to scale</text></svg>`;

export const paper: ExamPaper = {
  id: "exam-c1",
  title: "Calculator Paper 1",
  calculator: true,
  minutes: 60,
  questions: [
    // ============================ WARM-UP ==================================
    {
      kind: "short",
      id: "exam-c1-q01",
      topicId: "decimals-rounding",
      guideRef: "significant-figures",
      difficulty: "warmup",
      question:
        "Wei Ling weighs 1000 grains of basmati rice on a kitchen scale. Together they have a mass of 21.85 g.\n\nUse your calculator to find the mean mass of one grain, in grams. Give your answer to 2 significant figures.",
      answer: { type: "number", value: 0.022, allowFraction: false, display: "0.022 g" },
      traps: [
        { spec: { type: "number", value: 0.02 }, feedback: "That's only 1 significant figure. The zeros at the front are place holders — start counting at the first non-zero digit, the 2." },
        { spec: { type: "number", value: 0.021 }, feedback: "Look at the digit after the second significant figure: 0.021**8**5. It is 8, so the 1 rounds up to 2." },
      ],
      solution: [
        "Mean mass = 21.85 ÷ 1000 = 0.021 85 g.",
        "The first significant figure is the 2 (the zeros in front only hold places). The second is the 1.",
        "The next digit is 8, which is 5 or more, so round the 1 up: **0.022 g**.",
      ],
      commonError: "Counting the leading zeros as significant figures and writing 0.02.",
      hints: [
        "Dividing by 1000 moves every digit three places to the right.",
        "Significant figures start at the first non-zero digit — in 0.021 85 that is the 2.",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q02",
      topicId: "integers-powers",
      guideRef: "order-of-operations",
      difficulty: "warmup",
      question:
        "Use your calculator to work out\n\n{{((-2.4)^2 + 18.6) / (sqrt(31.36) - 9.1)}}\n\nGive the exact answer.",
      answer: { type: "number", value: -6.96 },
      traps: [
        { spec: { type: "number", value: -3.67, tolerance: 0.005 }, feedback: "Your calculator squared 2.4 and *then* made it negative. Type (−2.4)² with brackets: a negative number squared is positive, +5.76." },
        { spec: { type: "number", value: -4.75, tolerance: 0.001 }, feedback: "The fraction bar groups the whole bottom line. Put brackets round (√31.36 − 9.1), or work out the top and the bottom separately first." },
      ],
      solution: [
        "Top: (−2.4)² = 5.76 (a negative number squared is positive), so 5.76 + 18.6 = 24.36.",
        "Bottom: √31.36 = 5.6, so 5.6 − 9.1 = −3.5.",
        "Divide: 24.36 ÷ (−3.5) = **−6.96**.",
      ],
      commonError: "Typing −2.4² without brackets, which the calculator reads as −(2.4²) = −5.76.",
      hints: [
        "Work out the top and the bottom separately, then divide.",
        "(−2.4)² means (−2.4) × (−2.4). Is that positive or negative?",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-c1-q03",
      topicId: "standard-form",
      guideRef: "large-numbers",
      difficulty: "warmup",
      question: "In 2024, Changi Airport handled about 67 700 000 passengers.\n\nWrite 67 700 000 in standard form.",
      answer: { type: "number", value: 67700000, standardForm: true, display: "{{6.77 * 10^7}}" },
      traps: [
        { spec: { type: "number", value: 6770000, standardForm: true }, feedback: "Count the places again: 6.77 has to move 7 places to become 67 700 000, so the power is 7." },
        { spec: { type: "number", value: 677000000, standardForm: true }, feedback: "That's ten times too big — {{6.77 * 10^8}} is 677 000 000. Count how many places the digits move." },
      ],
      solution: [
        "In standard form the first number must be at least 1 and less than 10, so it is 6.77.",
        "To get from 6.77 to 67 700 000 the digits move 7 places to the left (× 10 seven times).",
        "67 700 000 = **{{6.77 * 10^7}}**.",
      ],
      commonError: "Counting the zeros (5 of them) instead of the places the digits move.",
      hints: [
        "Standard form is {{A * 10^n}} where {{1 <= A < 10}}.",
        "Put the decimal point after the first digit: 6.77. How many places must the digits move to get back to 67 700 000?",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q04",
      topicId: "statistics",
      guideRef: "charts",
      difficulty: "warmup",
      question:
        "In an online poll, 1440 Year 8 students in Singapore named their favourite hawker breakfast. 517 of them chose roti prata.\n\nRaj is drawing a pie chart of the results. Work out the angle of the roti prata sector. Give your answer to the nearest degree.",
      answer: { type: "number", value: 129, display: "129°" },
      traps: [
        { spec: { type: "number", value: 36, tolerance: 0.5 }, feedback: "That's the *percentage* who chose roti prata. A pie chart shares out 360°, not 100." },
      ],
      solution: [
        "Fraction who chose roti prata = {{517/1440}}.",
        "Angle = {{517/1440}} × 360° = 129.25°.",
        "To the nearest degree: **129°**.",
      ],
      solutions: [
        { label: "Degrees per student", steps: ["Each student gets 360 ÷ 1440 = 0.25° of the pie.", "517 students: 517 × 0.25 = 129.25°, so 129°."] },
      ],
      commonError: "Working out the percentage (35.9%) and using that as the angle.",
      hints: [
        "What fraction of the 1440 students chose roti prata?",
        "The whole pie is 360°. Find that fraction of 360°.",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q05",
      topicId: "circles",
      guideRef: "circumference",
      difficulty: "warmup",
      question:
        "Siti's bicycle wheel has a diameter of 66 cm. On a ride along the Punggol Park Connector, the wheel turns exactly 1250 times.\n\nHow far does Siti travel? Give your answer in metres, to 1 decimal place.",
      answer: { type: "number", value: 2591.8, display: "2591.8 m" },
      traps: [
        { spec: { type: "number", value: 5183.6, tolerance: 0.06 }, feedback: "You used 2 × π × 66. The formula C = 2πr needs the *radius* (33 cm); with the diameter, use C = πd." },
        { spec: { type: "number", value: 259181.4, tolerance: 0.06 }, feedback: "That distance is in centimetres. Divide by 100 to get metres." },
      ],
      solution: [
        "One turn moves the bike forward one circumference: C = π × 0.66 = 2.0734… m.",
        "1250 turns: 2.0734… × 1250 = 2591.81… m.",
        "To 1 d.p.: **2591.8 m** (about 2.6 km).",
      ],
      commonError: "Using 2 × π × diameter, which doubles the distance.",
      hints: [
        "One turn of the wheel moves the bike forward by one circumference.",
        "Circumference = π × diameter. Change 66 cm into metres first, or convert at the end.",
      ],
    },
    {
      kind: "mcq",
      id: "exam-c1-q06",
      topicId: "ratio-proportion",
      guideRef: "direct-proportion",
      difficulty: "warmup",
      question: "A supermarket sells the same oat milk in four different packs. Which pack is the best value for money?",
      options: [
        "1 litre carton for $3.95",
        "1.5 litre carton for $5.79",
        "Pack of 6 × 200 ml cartons for $4.49",
        "2 litre bottle for $7.69",
      ],
      answerIndex: 2,
      explanation:
        "Compare the cost of 1 litre: $3.95; 5.79 ÷ 1.5 = $3.86; 4.49 ÷ 1.2 = $3.74 (6 × 200 ml = 1.2 litres); 7.69 ÷ 2 = $3.845. The six-pack is cheapest per litre. The 2-litre bottle is tempting because 'bigger is cheaper', but here it costs about $3.85 per litre. The 1-litre carton has the lowest price tag but the highest cost per litre.",
      hints: [
        "Compare like with like: find the cost of 1 litre for each pack.",
        "6 × 200 ml = 1200 ml = 1.2 litres.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "mcq",
      id: "exam-c1-q07",
      topicId: "probability",
      guideRef: "complementary-events",
      difficulty: "warmup",
      question:
        "A game at a school carnival uses a biased spinner that lands on red, blue, green or yellow. The table shows some of the probabilities.\n\n| Colour | Red | Blue | Green | Yellow |\n|---|---|---|---|---|\n| Probability | 0.215 | 0.38 | 0.17 | ? |\n\nWhat is the probability that the spinner lands on yellow?",
      options: ["0.235", "0.765", "0.25", "0.575"],
      answerIndex: 0,
      explanation:
        "The four colours cover every possible outcome, so their probabilities add up to 1: 1 − (0.215 + 0.38 + 0.17) = 1 − 0.765 = 0.235. 0.765 is the total of the three given probabilities — it still has to be subtracted from 1. 0.25 assumes the four colours are equally likely, but the spinner is biased. 0.575 comes from typing 1 − 0.215 − 0.38 + 0.17: every given probability must be subtracted.",
      hints: [
        "The spinner must land on exactly one of the four colours. What must all four probabilities add up to?",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q08",
      topicId: "percentages",
      guideRef: "percentage-change",
      difficulty: "warmup",
      question:
        "Last season, Mao Shan Wang durians at a stall in Geylang cost $24.80 per kilogram. This season they cost $31.50 per kilogram.\n\nWork out the percentage increase in the price. Give your answer to 1 decimal place.",
      answer: { type: "number", value: 27.0, display: "27.0%" },
      traps: [
        { spec: { type: "number", value: 21.3, tolerance: 0.05 }, feedback: "You divided by the new price. Percentage change always compares with the *original* price: 6.70 ÷ 24.80." },
        { spec: { type: "number", value: 127.0, tolerance: 0.05 }, feedback: "127% is the new price as a percentage of the old one. The *increase* is 127% − 100%." },
      ],
      solution: [
        "Increase = 31.50 − 24.80 = $6.70.",
        "Percentage increase = {{6.70/24.80}} × 100 = 27.016…%.",
        "To 1 d.p.: **27.0%**.",
      ],
      solutions: [
        { label: "Multiplier", steps: ["31.50 ÷ 24.80 = 1.270 16…", "A multiplier of 1.270 16… means an increase of 27.0%."] },
      ],
      commonError: "Dividing the increase by the new price instead of the original price.",
      hints: [
        "First find the actual increase in dollars.",
        "Percentage increase = increase ÷ original price × 100.",
      ],
    },

    // ============================== CORE ===================================
    {
      kind: "mcq",
      id: "exam-c1-q09",
      topicId: "standard-form",
      guideRef: "comparing-standard-form",
      difficulty: "core",
      question:
        "Siti uses her calculator to work out 0.000 48 ÷ 1250. The display shows\n\n`3.84E-07`\n\nWhich of these is the answer written as an ordinary number?",
      options: ["0.000 000 038 4", "38 400 000", "−26.88", "0.000 000 384"],
      answerIndex: 3,
      explanation:
        "E−07 means × {{10^(-7)}}, so the answer is {{3.84 * 10^(-7)}}. Move the decimal point 7 places to the left: 0.000 000 384 (six zeros after the point, then 384). Sense check: 0.0005 ÷ 1000 = 0.000 000 5, which is the same size. 0.000 000 038 4 has seven zeros after the point — that moves the point 8 places. 38 400 000 ignores the minus sign in the power, and −26.88 treats E as 'multiply by −7'.",
      hints: [
        "On a calculator, E−07 is short for × {{10^(-7)}}.",
        "Multiplying by {{10^(-7)}} moves the decimal point 7 places to the left. Count the places carefully.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "mcq",
      id: "exam-c1-q10",
      topicId: "decimals-rounding",
      guideRef: "estimation",
      difficulty: "core",
      question:
        "Ethan works out {{(48.7 * 0.213) / 9.87}} on his calculator and writes down 10.51.\n\nHis teacher asks him to check by estimating, rounding each number to 1 significant figure. Which is the correct estimate?",
      options: ["{{(50 * 2)/10 = 10}}", "{{(50 * 0.2)/10 = 1}}", "{{(50 * 0)/10 = 0}}", "{{(40 * 0.2)/10 = 0.8}}"],
      answerIndex: 1,
      explanation:
        "To 1 significant figure, 48.7 → 50, 0.213 → 0.2 and 9.87 → 10, so the estimate is {{(50 * 0.2)/10 = 1}}. Ethan's 10.51 is about ten times too big: the correct answer is 1.05 (he probably typed 2.13 instead of 0.213). Rounding 0.213 to 2 is a place-value slip that wrongly makes Ethan look right. Rounding it to 0 rounds to the nearest whole number, not to 1 s.f. And 48.7 rounds *up* to 50, not down to 40.",
      hints: [
        "Round each number to its first significant figure: 48.7 → ?, 0.213 → ?, 9.87 → ?",
        "The first significant figure of 0.213 is the 2, in the tenths column.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "mcq",
      id: "exam-c1-q11",
      topicId: "linear-graphs",
      guideRef: "equations-of-lines",
      difficulty: "core",
      question:
        "The graph shows the total cost, C dollars, of hiring a kayak at East Coast Park for t hours.\n\nWhich equation describes the line?",
      diagram: KAYAK_GRAPH,
      options: ["{{C = 9.5t + 12}}", "{{C = 12t + 9.5}}", "{{C = 12.5t}}", "{{C = 38t + 12}}"],
      answerIndex: 0,
      explanation:
        "The line crosses the C-axis at 12, so the y-intercept is 12 (a fixed fee of $12). Gradient = rise ÷ run = (50 − 12) ÷ (4 − 0) = 9.5 dollars per hour. So {{C = 9.5t + 12}}. {{C = 12t + 9.5}} swaps the gradient and the intercept. {{C = 12.5t}} uses 50 ÷ 4 and forgets that the line does not pass through the origin. {{C = 38t + 12}} uses the rise (38) without dividing by the run (4).",
      hints: [
        "Where does the line cross the vertical axis? That is c in y = mx + c.",
        "Gradient = rise ÷ run between the two marked points.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-c1-q12",
      topicId: "percentages",
      guideRef: "reverse-percentages",
      difficulty: "core",
      question: "A laptop costs $1199, including GST at 9%.\n\nHow much of the price is GST?",
      answer: { type: "number", value: 99, display: "$99" },
      traps: [
        { spec: { type: "number", value: 107.91 }, feedback: "You found 9% of $1199 — but $1199 already includes the GST. GST is 9% of the price *before* GST, so find that price first: 1199 ÷ 1.09." },
        { spec: { type: "number", value: 1100 }, feedback: "$1100 is the price before GST. The question asks how much of the $1199 is GST." },
      ],
      solution: [
        "$1199 is 109% of the price before GST, so price before GST × 1.09 = 1199.",
        "Price before GST = 1199 ÷ 1.09 = $1100.",
        "GST = 1199 − 1100 = **$99**. Check: 9% of $1100 = $99 ✓",
      ],
      solutions: [
        { label: "Parts of the final price", steps: ["For every $100 before GST, the customer pays $109, of which $9 is GST.", "So GST is {{9/109}} of the final price: {{9/109}} × 1199 = $99."] },
      ],
      commonError: "Taking 9% of the price that already includes GST (giving $107.91).",
      hints: [
        "Which amount is 100% here — the price before GST or the price after?",
        "The price with GST is 109% of the price before GST.",
        "Price before GST = 1199 ÷ 1.09.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-c1-q13",
      topicId: "ratio-proportion",
      guideRef: "recipes-and-currency",
      difficulty: "core",
      question:
        "Hana changes $250 into Malaysian ringgit (MYR) for a day trip to Johor Bahru. The rate is $1 = MYR 3.47.\n\nShe spends MYR 612.50. Back in Singapore, she changes the ringgit she has left into Singapore dollars at a rate of $1 = MYR 3.52.\n\nHow many Singapore dollars does she get back? Give your answer to the nearest cent.",
      answer: { type: "number", value: 72.44, display: "$72.44" },
      traps: [
        { spec: { type: "number", value: 897.6 }, feedback: "Changing ringgit back into dollars should make the number *smaller* — each dollar costs more than 3 ringgit. Divide by 3.52 instead of multiplying." },
        { spec: { type: "number", value: 73.49 }, feedback: "You used the outgoing rate of 3.47. On the way back the rate is $1 = MYR 3.52." },
      ],
      solution: [
        "$250 → 250 × 3.47 = MYR 867.50.",
        "Left after spending: 867.50 − 612.50 = MYR 255.",
        "Back to dollars: 255 ÷ 3.52 = 72.443…",
        "To the nearest cent: **$72.44**.",
      ],
      commonError: "Multiplying by the exchange rate in both directions.",
      hints: [
        "How many ringgit does Hana get for $250?",
        "How many ringgit are left after she spends MYR 612.50?",
        "Each Singapore dollar costs MYR 3.52, so how many dollars can she buy with the ringgit left?",
      ],
      strategy: "Use the inverse",
    },
    {
      kind: "short",
      id: "exam-c1-q14",
      topicId: "expressions",
      guideRef: "substitution",
      difficulty: "core",
      question:
        "A ball is thrown straight upwards from the edge of a high platform. After t seconds, its height above the platform is s metres, where\n\n{{s = ut + 1/2 a t^2}}\n\nWork out s when u = 12.5, t = 3.2 and a = −9.8. Give your answer to 2 decimal places.",
      answer: { type: "number", value: -10.18 },
      traps: [
        { spec: { type: "number", value: 24.32 }, feedback: "Only t is squared — but it *is* squared: {{1/2 * (-9.8) * 3.2^2}}, not {{1/2 * (-9.8) * 3.2}}." },
        { spec: { type: "number", value: 90.18, tolerance: 0.005 }, feedback: "a = −9.8 is negative, so {{1/2 a t^2}} is negative. Put the negative value in brackets when you substitute." },
      ],
      solution: [
        "ut = 12.5 × 3.2 = 40.",
        "{{1/2 a t^2 = 0.5 * (-9.8) * 3.2^2 = 0.5 * (-9.8) * 10.24 = -50.176}}.",
        "s = 40 + (−50.176) = −10.176.",
        "To 2 d.p.: **s = −10.18**. The negative sign means the ball is 10.18 m *below* the platform — it has dropped past the edge.",
      ],
      commonError: "Forgetting to square t, or losing the negative sign of a.",
      hints: [
        "Substitute each value in brackets, especially the negative one: a = (−9.8).",
        "Work out ut and {{1/2 a t^2}} separately. Only t is squared: {{3.2^2 = 10.24}}.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "mcq",
      id: "exam-c1-q15",
      topicId: "rates-units",
      guideRef: "area-volume-units",
      difficulty: "core",
      question:
        "During a monsoon storm, 2.4 cm of rain falls on a flat rectangular courtyard that measures 15 m by 8.5 m. All of the rain drains into a tank.\n\nHow much water goes into the tank?",
      options: ["306 litres", "3060 litres", "3.06 litres", "3 060 000 litres"],
      answerIndex: 1,
      explanation:
        "Work in metres: 2.4 cm = 0.024 m. Volume = 15 × 8.5 × 0.024 = 3.06 m³, and 1 m³ = 1000 litres, so the tank gets 3060 litres. 3.06 is the volume in m³ with the conversion to litres missing. 306 comes from multiplying 2.4 (in cm) by 127.5 (in m²) — mixed units. 3 060 000 uses 1 m³ = 1 000 000 litres; a million is the number of cm³ in 1 m³, and it takes 1000 cm³ to make 1 litre.",
      hints: [
        "Make the units match first: write 2.4 cm in metres.",
        "Volume of water = area of the courtyard × depth of rain.",
        "1 m³ = 1000 litres.",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q16",
      topicId: "equations",
      guideRef: "forming-equations",
      difficulty: "core",
      question:
        "Two mobile phone plans charge like this:\n\n| Plan | Monthly fee | Cost per minute of calls |\n|---|---|---|\n| TalkMore | $18.50 | 12 cents |\n| ChatLite | $9.90 | 32 cents |\n\nBy forming and solving an equation, find the number of minutes of calls in a month for which the two plans cost exactly the same.",
      answer: { type: "number", value: 43, display: "43 minutes" },
      traps: [
        { spec: { type: "number", value: 19.55, tolerance: 0.06 }, feedback: "Check your collecting: subtracting 0.12m from both sides leaves 0.20m on the right, not 0.44m." },
        { spec: { type: "number", value: 0.43 }, feedback: "Use the same units throughout: 12 cents = $0.12 and 32 cents = $0.32." },
      ],
      solution: [
        "Let m = number of minutes. Cost in dollars: TalkMore 18.50 + 0.12m, ChatLite 9.90 + 0.32m.",
        "Same cost: 18.50 + 0.12m = 9.90 + 0.32m.",
        "Subtract 0.12m from both sides: 18.50 = 9.90 + 0.20m.",
        "Subtract 9.90: 8.60 = 0.20m, so m = 8.60 ÷ 0.20 = **43 minutes**.",
        "Check: TalkMore 18.50 + 5.16 = $23.66 and ChatLite 9.90 + 13.76 = $23.66 ✓",
      ],
      solutions: [
        { label: "Close the gap", steps: ["ChatLite starts $8.60 cheaper.", "Each minute, ChatLite costs 20 cents more, so the gap shrinks by $0.20 a minute.", "The gap closes after 8.60 ÷ 0.20 = 43 minutes."] },
      ],
      commonError: "Mixing cents and dollars, or adding the per-minute costs instead of subtracting.",
      hints: [
        "Let m be the number of minutes. Write the monthly cost of each plan in dollars.",
        "TalkMore costs 18.50 + 0.12m. Write ChatLite's cost the same way and set the two equal.",
        "Collect the m terms on the side with the larger coefficient.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-c1-q17",
      topicId: "perimeter-area-volume",
      guideRef: "volume",
      difficulty: "core",
      question:
        "A planter box at an HDB void deck is a prism. Its cross-section is a trapezium with parallel sides 42.5 cm and 31 cm and perpendicular height 27.5 cm. The box is 1.85 m long.\n\nHow many litres of soil are needed to fill the box completely? Give your answer to the nearest litre.",
      diagram: PLANTER_PRISM,
      answer: { type: "number", value: 187, display: "187 litres" },
      traps: [
        { spec: { type: "number", value: 374 }, feedback: "The area of a trapezium is *half* of (a + b) × h — you've doubled it." },
        { spec: { type: "number", value: 1.87, tolerance: 0.005 }, feedback: "Units: change the length 1.85 m to 185 cm before multiplying by an area in cm²." },
      ],
      solution: [
        "Area of cross-section = {{1/2 * (42.5 + 31) * 27.5 = 1010.625}} cm².",
        "Length = 1.85 m = 185 cm.",
        "Volume = 1010.625 × 185 = 186 965.6… cm³.",
        "1000 cm³ = 1 litre, so the volume is 186.97 litres = **187 litres** to the nearest litre.",
      ],
      commonError: "Multiplying a cm² area by a length in metres.",
      hints: [
        "Volume of a prism = area of cross-section × length.",
        "Trapezium area = {{1/2 (a + b) h}}. Keep every length in cm.",
        "1000 cm³ = 1 litre.",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q18",
      topicId: "constructions-bearings",
      guideRef: "scale-drawings",
      difficulty: "core",
      question:
        "On a map with scale 1 : 25 000, a kayak route goes in a straight line from the jetty at Pasir Ris, P, to a jetty on Pulau Ubin, U.\n\nOn the map, PU = 9.2 cm and the bearing of U from P is 058°.\n\nFind (a) the real distance PU in kilometres, and (b) the bearing of P from U. Give the distance first, then the bearing.",
      diagram: KAYAK_BEARING,
      answer: { type: "list", values: [2.3, 238], ordered: true, display: "2.3 km, 238°" },
      traps: [
        { spec: { type: "list", values: [23, 238], ordered: true }, feedback: "Check the distance: 9.2 × 25 000 = 230 000 cm, and there are 100 000 cm in 1 km." },
        { spec: { type: "list", values: [2.3, 122], ordered: true }, feedback: "180° − 58° isn't the back bearing. Facing back the other way is a half-turn: 58° + 180° = 238°." },
      ],
      solution: [
        "Real distance = 9.2 × 25 000 = 230 000 cm.",
        "230 000 cm = 2300 m = **2.3 km**.",
        "The North lines at P and U are parallel. Turning to face back along UP is a half-turn from facing along PU, so the bearing of P from U is 58° + 180° = **238°**.",
      ],
      commonError: "Subtracting the bearing from 180° instead of adding 180°.",
      hints: [
        "1 cm on the map is 25 000 cm in real life. How many cm are there in 1 km?",
        "Draw the North line at U. The direction from U back to P is exactly opposite to the direction from P to U.",
        "A back bearing is the bearing ± 180°.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "written",
      id: "exam-c1-q19",
      topicId: "statistics",
      guideRef: "scatter-graphs",
      difficulty: "core",
      question:
        "The scatter graph shows the daily rainfall and the number of visitors to the Singapore Botanic Gardens on 16 days.\n\n(a) Describe the correlation, and explain what it tells you in context.\n\n(b) Kai draws a line of best fit and extends it to predict the number of visitors on a day with 90 mm of rain. Give **two** reasons why his prediction is not reliable.",
      diagram: RAIN_SCATTER,
      marks: 4,
      modelAnswer:
        "(a) Negative correlation: on days with more rain, there tend to be fewer visitors to the Gardens.\n\n(b) First, the data only goes up to about 48 mm of rain. 90 mm is far outside this range, so there is no evidence that the pattern carries on (predicting outside the data is called extrapolation). Second, if the line of best fit is extended to 90 mm it drops below zero, so it predicts a negative number of visitors, which is impossible. In reality the number of visitors would level off, because some people visit even in heavy rain.",
      markScheme: [
        { point: "Negative correlation", keywords: ["negative"] },
        { point: "In context: the more rain, the fewer visitors (tend to be)", keywords: ["more rain", "fewer visitors", "less visitors", "fewer people", "rainier", "wetter"] },
        { point: "90 mm is outside the range of the data (0 to about 48 mm) — extrapolation", keywords: ["outside", "beyond", "range", "48", "50", "extrapolat", "no data"] },
        { point: "The extended line gives a negative / impossible number of visitors (visitors would level off, not go below zero)", keywords: ["below zero", "less than zero", "minus", "impossible", "level off", "can't be negative", "cannot be negative"] },
      ],
      commonError: "Writing 'it's only an estimate' without saying *why*: 90 mm is outside the data, and the line would go below zero.",
      hints: [
        "As the rainfall increases, what happens to the number of visitors?",
        "What is the largest rainfall in the data? Is 90 mm inside the range?",
        "Imagine extending a line of best fit to 90 mm. What number of visitors would it predict?",
      ],
    },
    {
      kind: "short",
      id: "exam-c1-q20",
      topicId: "circles",
      guideRef: "compound-circle-shapes",
      difficulty: "core",
      question:
        "A rectangular courtyard measures 14 m by 9 m. It contains a circular fountain of diameter 4.2 m and, in one corner, a quarter-circle flowerbed of radius 3.5 m. The rest of the courtyard (shaded yellow) is to be paved.\n\nWork out the area to be paved. Give your answer in m² to 3 significant figures.",
      diagram: COURTYARD,
      answer: { type: "number", value: 103, display: "103 m²" },
      traps: [
        { spec: { type: "number", value: 61.0, tolerance: 0.05 }, feedback: "4.2 m is the *diameter* of the fountain. Use the radius, 2.1 m, in πr²." },
        { spec: { type: "number", value: 73.7, tolerance: 0.05 }, feedback: "The flowerbed is only a *quarter* of a circle, so divide π × 3.5² by 4." },
      ],
      solution: [
        "Rectangle: 14 × 9 = 126 m².",
        "Fountain: π × 2.1² = 13.854… m².",
        "Flowerbed: {{1/4}} × π × 3.5² = 9.621… m².",
        "Paved area = 126 − 13.854… − 9.621… = 102.52… m².",
        "To 3 s.f.: **103 m²**.",
      ],
      commonError: "Using the diameter in πr², or rounding each part early.",
      hints: [
        "Paved area = rectangle − fountain − flowerbed.",
        "The fountain's radius is 4.2 ÷ 2. The flowerbed is {{1/4}} of a circle of radius 3.5 m.",
        "Keep full calculator values and round only at the end.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-c1-q21",
      topicId: "sequences-graphs",
      guideRef: "is-it-a-term",
      difficulty: "core",
      question:
        "The first four terms of an arithmetic sequence are\n\n7.4, 9.65, 11.9, 14.15, …\n\nFind the first term of the sequence that is greater than 200. Give its position in the sequence first, then its value.",
      answer: { type: "list", values: [87, 200.9], ordered: true, display: "the 87th term, which is 200.9" },
      traps: [
        { spec: { type: "list", values: [86, 198.65], ordered: true }, feedback: "The 86th term is 198.65 — still below 200. You need n > 86.6, so the first whole number that works is 87." },
      ],
      solution: [
        "Common difference = 9.65 − 7.4 = 2.25.",
        "Zero term = 7.4 − 2.25 = 5.15, so the nth term is 2.25n + 5.15.",
        "2.25n + 5.15 > 200, so 2.25n > 194.85 and n > 86.6.",
        "n must be a whole number, so n = 87.",
        "87th term = 2.25 × 87 + 5.15 = **200.9**. (Check: the 86th term is 198.65, which is below 200.)",
      ],
      commonError: "Rounding n = 86.6 down to 86, which gives a term below 200.",
      hints: [
        "What is the common difference?",
        "The nth term is 2.25n + something. Step back one term from 7.4 to find the 'zero term'.",
        "Solve 2.25n + 5.15 > 200, then choose the next whole number.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "exam-c1-q22",
      topicId: "fractions",
      guideRef: "fractions-of-amounts",
      difficulty: "core",
      question:
        "Aisha spends {{1/6}} of her monthly allowance on MRT and bus fares. She spends {{3/8}} of what is left on food at the school canteen. She saves the rest, which is $112.50.\n\nHow much is Aisha's monthly allowance?",
      answer: { type: "number", value: 216, display: "$216" },
      traps: [
        { spec: { type: "number", value: 245.45, tolerance: 0.01 }, feedback: "The {{3/8}} is a fraction of what is *left* after fares, not of the whole allowance. Find {{3/8}} of {{5/6}} first." },
      ],
      solution: [
        "After fares, {{5/6}} of the allowance is left.",
        "Food: {{3/8 * 5/6 = 15/48 = 5/16}} of the allowance.",
        "Saved: {{5/6 - 5/16 = 40/48 - 15/48 = 25/48}} of the allowance.",
        "{{25/48}} of the allowance is $112.50, so {{1/48}} is 112.50 ÷ 25 = $4.50.",
        "Allowance = 48 × 4.50 = **$216**.",
      ],
      solutions: [
        { label: "Work backwards with a bar model (quicker)", steps: ["Her savings are {{5/8}} of what was left after fares, so 112.50 ÷ 5 × 8 = $180 was left after fares.", "$180 is {{5/6}} of the allowance, so the allowance is 180 ÷ 5 × 6 = $216."] },
      ],
      commonError: "Taking {{3/8}} of the whole allowance instead of {{3/8}} of what is left.",
      hints: [
        "After paying fares, what fraction of the allowance is left?",
        "If she spends {{3/8}} of what's left on food, what fraction of what's left does she save?",
        "$112.50 is {{5/8}} of the money left after fares. Work backwards from there.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-c1-q23",
      topicId: "factors-multiples",
      guideRef: "squares-cubes-from-primes",
      difficulty: "core",
      question:
        "Jun wants to multiply 3528 by the smallest possible whole number so that the answer is a cube number.\n\nFind the number he should multiply by, and the cube root of the answer. Give the multiplier first.",
      answer: { type: "list", values: [21, 42], ordered: true, display: "multiply by 21; the cube root is 42" },
      traps: [
        { spec: { type: "list", values: [2, 84], ordered: true }, feedback: "Multiplying by 2 makes a *square* number (84²). For a cube, every power in the prime factorisation must be a multiple of 3." },
      ],
      solution: [
        "3528 = 2 × 1764 = 2 × 2 × 882 = 2 × 2 × 2 × 441, and 441 = 21² = 3² × 7².",
        "So 3528 = {{2^3 * 3^2 * 7^2}}.",
        "In a cube number every power is a multiple of 3. {{2^3}} is fine, but {{3^2}} and {{7^2}} each need one more factor.",
        "Multiply by 3 × 7 = **21**: 3528 × 21 = 74 088 = {{2^3 * 3^3 * 7^3}}.",
        "Cube root = 2 × 3 × 7 = **42**. Calculator check: {{42^3 = 74088}} ✓",
      ],
      commonError: "Making a square number instead of a cube, or multiplying by every prime factor.",
      hints: [
        "Start by writing 3528 as a product of prime factors.",
        "3528 = {{2^3 * 3^2 * 7^2}}. In a cube number, what must be true about every power?",
        "Which primes need one more factor each to reach a power of 3?",
      ],
      strategy: "Use prime factors",
    },
    {
      kind: "written",
      id: "exam-c1-q24",
      topicId: "averages-spread",
      guideRef: "comparing-distributions",
      difficulty: "core",
      question:
        "Priya times how long 10 customers wait for their food at each of two vegetarian hawker stalls.\n\n| Stall | Waiting times (minutes) |\n|---|---|\n| Green Leaf | 2.5, 3.5, 4.0, 4.5, 5.5, 6.0, 6.5, 8.0, 11.5, 13.0 |\n| Lotus Bowl | 6.5, 7.0, 7.0, 7.5, 7.5, 8.0, 8.0, 8.5, 9.0, 9.0 |\n\n(a) Work out the mean and the range of the waiting times for each stall.\n\n(b) Compare the waiting times at the two stalls.\n\n(c) Priya has exactly 10 minutes to get her food before her CCA starts. Which stall should she choose? Give a reason based on the data.",
      marks: 4,
      modelAnswer:
        "(a) Green Leaf: total 65, so mean = 65 ÷ 10 = 6.5 minutes; range = 13.0 − 2.5 = 10.5 minutes. Lotus Bowl: total 78, so mean = 7.8 minutes; range = 9.0 − 6.5 = 2.5 minutes.\n\n(b) On average, customers wait less time at Green Leaf (mean 6.5 minutes compared with 7.8 minutes). But the waiting times at Lotus Bowl are much more consistent (range 2.5 minutes compared with 10.5 minutes), so the wait at Green Leaf is much less predictable.\n\n(c) Lotus Bowl. Every customer there waited 9 minutes or less, so she is very likely to get her food within 10 minutes. At Green Leaf, 2 of the 10 customers waited more than 10 minutes (11.5 and 13 minutes), even though its mean is lower.",
      markScheme: [
        { point: "Means: Green Leaf 6.5 min, Lotus Bowl 7.8 min", keywords: ["6.5", "7.8"] },
        { point: "Ranges: Green Leaf 10.5 min, Lotus Bowl 2.5 min", keywords: ["10.5", "2.5"] },
        { point: "Comparison in context: Green Leaf is quicker on average, but Lotus Bowl's waits are more consistent (smaller range)", keywords: ["on average", "quicker", "shorter", "consistent", "less spread", "more spread", "varied", "predictable"] },
        { point: "Chooses Lotus Bowl because all its waits were under 10 minutes (Green Leaf had waits of 11.5 and 13 minutes)", keywords: ["lotus", "under 10", "less than 10", "9 minutes", "11.5", "13", "reliable"] },
      ],
      commonError: "Choosing the stall with the lower mean without looking at the spread, or quoting numbers without saying what they mean for customers.",
      hints: [
        "Mean = total ÷ 10. Range = largest − smallest.",
        "A good comparison uses one average AND the range, and says what each means for customers.",
        "For (c), look at the longest waits at each stall.",
      ],
    },

    // =========================== CHALLENGE =================================
    {
      kind: "short",
      id: "exam-c1-q25",
      topicId: "perimeter-area-volume",
      guideRef: "cylinders",
      difficulty: "challenge",
      question:
        "Mei pours bandung (a rose-syrup milk drink) into a cylindrical glass with internal diameter 7 cm. The drink is 12 cm deep.\n\nShe then pours all of it into a wider cylindrical glass with internal diameter 10.5 cm.\n\nHow deep is the drink in the wider glass? Give your answer in cm to 3 significant figures.",
      answer: { type: "number", value: 5.33, display: "5.33 cm" },
      traps: [
        { spec: { type: "number", value: 8 }, feedback: "The diameter is 1.5 times as big, but the *area* of the base is 1.5² = 2.25 times as big. Divide the depth by 2.25, not 1.5." },
      ],
      solution: [
        "Volume of drink = π × 3.5² × 12 = 147π = 461.81… cm³.",
        "Base area of the wider glass = π × 5.25² = 86.590… cm².",
        "Depth = 461.81… ÷ 86.590… = 5.333… cm.",
        "To 3 s.f.: **5.33 cm**.",
      ],
      solutions: [
        { label: "Scale factor (quicker — no π needed)", steps: ["10.5 ÷ 7 = 1.5, so the base area is 1.5² = 2.25 times as big.", "The same volume spread over 2.25 times the area is 2.25 times shallower.", "12 ÷ 2.25 = 5.333…, so 5.33 cm (3 s.f.)."] },
      ],
      commonError: "Dividing the depth by 1.5 — the area of the base scales by the square of the diameter.",
      hints: [
        "The volume of drink stays the same. Volume of a cylinder = πr²h.",
        "Work out the volume in the first glass, then divide by the base area of the second glass.",
        "Shortcut: the diameter is multiplied by 1.5. What happens to the area of the base?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "exam-c1-q26",
      topicId: "averages-spread",
      guideRef: "frequency-tables",
      difficulty: "challenge",
      question:
        "The table shows the shoe sizes of the members of a school's netball CCA. One frequency is missing.\n\n| Shoe size | 4 | 5 | 6 | 7 |\n|---|---|---|---|---|\n| Frequency | 6 | 11 | x | 4 |\n\nThe mean shoe size is exactly 5.24. Find x.",
      answer: { type: "number", value: 4 },
      traps: [
        { spec: { type: "number", value: 0.51, tolerance: 0.01 }, feedback: "The number of members is 21 + x, not 21 — the missing frequency changes the total *and* the count." },
      ],
      solution: [
        "Total of all the shoe sizes: 4 × 6 + 5 × 11 + 6x + 7 × 4 = 107 + 6x.",
        "Number of members: 6 + 11 + x + 4 = 21 + x.",
        "Mean: {{(107 + 6x)/(21 + x) = 5.24}}.",
        "Multiply both sides by (21 + x): 107 + 6x = 110.04 + 5.24x.",
        "0.76x = 3.04, so **x = 4**. Check: {{131/25 = 5.24}} ✓",
      ],
      solutions: [
        { label: "Balance around the mean", steps: ["Measure each size from the mean 5.24: size 4 is 1.24 below, size 5 is 0.24 below, size 6 is 0.76 above, size 7 is 1.76 above.", "For the mean to be the balance point, the total 'below' must equal the total 'above'.", "Below: 6 × 1.24 + 11 × 0.24 = 7.44 + 2.64 = 10.08. Above: 0.76x + 4 × 1.76 = 0.76x + 7.04.", "0.76x + 7.04 = 10.08, so 0.76x = 3.04 and x = 4."] },
      ],
      commonError: "Dividing by 21 instead of 21 + x.",
      hints: [
        "Write the total of all the shoe sizes in terms of x. Then write the number of members in terms of x.",
        "Total = 107 + 6x and number of members = 21 + x. Mean = total ÷ number of members.",
        "Multiply both sides of {{(107 + 6x)/(21 + x) = 5.24}} by (21 + x), then collect the x terms.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-c1-q27",
      topicId: "percentages",
      guideRef: "repeated-change",
      difficulty: "challenge",
      question:
        "Ravi has $5000 to save. He compares two banks:\n\n- **Bank A** pays 4% *simple* interest per year.\n- **Bank B** pays 3.6% *compound* interest per year.\n\nBank A gives more at first. After how many whole years will Ravi's money in Bank B first be worth more than it would be in Bank A?",
      answer: { type: "number", value: 7, display: "7 years" },
      traps: [
        { spec: { type: "number", value: 8 }, feedback: "Check year 7 carefully: Bank A has $6400 and Bank B has $6404.55 — B is already ahead." },
        { spec: { type: "number", value: 6 }, feedback: "After 6 years Bank A has $6200 but Bank B has only $6181.99. B is not ahead yet." },
      ],
      solution: [
        "Bank A adds 4% of $5000 = $200 every year: after n years it has 5000 + 200n.",
        "Bank B multiplies by 1.036 every year: after n years it has {{5000 * 1.036^n}}.",
        "After 6 years: A = $6200, B = {{5000 * 1.036^6}} = $6181.99. A is still ahead.",
        "After 7 years: A = $6400, B = {{5000 * 1.036^7}} = $6404.55. B is ahead.",
        "So Bank B is first worth more after **7 years** (by just $4.55).",
      ],
      solutions: [
        { label: "Ignore the $5000", steps: ["The starting amount doesn't change *when* B overtakes, so compare the multipliers 1 + 0.04n and {{1.036^n}}.", "n = 6: 1.24 against 1.2364 (A ahead). n = 7: 1.28 against 1.2809 (B ahead).", "So the answer is 7 years for any starting amount."] },
      ],
      commonError: "Rounding the yearly amounts too early — the two banks are only a few dollars apart near the crossover.",
      hints: [
        "Make a table of the amount in each bank after 1, 2, 3, … years.",
        "Bank A adds the same $200 each year. Bank B is multiplied by 1.036 each year.",
        "The gap is tiny near the crossover — compare years 6, 7 and 8 to the nearest cent.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "written",
      id: "exam-c1-q28",
      topicId: "angles-polygons",
      guideRef: "polygon-angles",
      difficulty: "challenge",
      question:
        "Each interior angle of a regular polygon is 7.5 times the size of each exterior angle.\n\n(a) How many sides does the polygon have?\n\n(b) Zara says: \"If each interior angle is k times each exterior angle, then the polygon has 2(k + 1) sides.\" Show that Zara is right.\n\n(c) Explain why no regular polygon has interior angles exactly 3.2 times its exterior angles.",
      marks: 4,
      modelAnswer:
        "(a) An interior angle and its exterior angle lie on a straight line, so they add up to 180°. If the exterior angle is e, then 7.5e + e = 180, so 8.5e = 180 and e = 21.176…°. The exterior angles of any polygon add up to 360°, so n = 360 ÷ 21.176… = 17 sides.\n\n(b) If the interior angle is ke, then ke + e = 180, so e(k + 1) = 180 and e = {{180/(k + 1)}}. The number of sides is n = 360 ÷ e = {{(360(k + 1))/180}} = 2(k + 1).\n\n(c) If k = 3.2, then n = 2 × 4.2 = 8.4. A polygon must have a whole number of sides, so this is impossible.",
      markScheme: [
        { point: "Uses interior + exterior = 180°: 8.5e = 180, so e = 180 ÷ 8.5 ≈ 21.18°", keywords: ["180", "8.5", "21.2", "21.18"] },
        { point: "n = 360 ÷ e = 17 sides", keywords: ["17", "360"] },
        { point: "General case: e = 180 ÷ (k + 1), so n = 360 ÷ e = 2(k + 1)", keywords: ["k + 1", "k+1", "2(k + 1)", "2(k+1)", "2k + 2", "2k+2"] },
        { point: "k = 3.2 gives n = 8.4, which is not a whole number, so it is impossible", keywords: ["8.4", "whole number", "not an integer", "integer"] },
      ],
      commonError: "Rounding e to 21.2° and getting 16.98 sides. Keep the full calculator value (in fact e = {{360/17}}°).",
      hints: [
        "An interior angle and its exterior angle sit on a straight line. What do they add up to?",
        "Call the exterior angle e. Then the interior angle is 7.5e.",
        "The exterior angles of any polygon add up to 360°, so n = 360 ÷ e. Don't round e before dividing.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-c1-q29",
      topicId: "transformations-pythagoras",
      guideRef: "pythagoras",
      difficulty: "challenge",
      question:
        "A TV is sold as a '55-inch TV'. This means the *diagonal* of its rectangular screen is 55 inches long.\n\nThe width and height of the screen are in the ratio 16 : 9, and 1 inch = 2.54 cm.\n\nWork out the width of the screen in centimetres. Give your answer to 1 decimal place.",
      answer: { type: "number", value: 121.8, display: "121.8 cm" },
      traps: [
        { spec: { type: "number", value: 89.4, tolerance: 0.05 }, feedback: "The diagonal is not width + height, so you can't share 139.7 cm in the ratio 16 : 9. Width, height and diagonal form a right-angled triangle — use Pythagoras." },
        { spec: { type: "number", value: 47.9, tolerance: 0.05 }, feedback: "That's the width in inches. Multiply by 2.54 (or change the diagonal into cm first)." },
      ],
      solution: [
        "Diagonal = 55 × 2.54 = 139.7 cm.",
        "Let the width be 16k and the height be 9k.",
        "Pythagoras: {{(16k)^2 + (9k)^2 = 256k^2 + 81k^2 = 337k^2}}, so the diagonal is {{sqrt(337) * k}} = 18.357…k.",
        "18.357…k = 139.7, so k = 7.6099…",
        "Width = 16 × 7.6099… = 121.759… cm = **121.8 cm** (1 d.p.).",
      ],
      solutions: [
        { label: "Scale up a model screen", steps: ["A screen 16 units wide and 9 units high has diagonal {{sqrt(16^2 + 9^2) = sqrt(337)}} = 18.357… units.", "The real diagonal is 139.7 cm, so each unit is 139.7 ÷ 18.357… = 7.6099… cm.", "Width = 16 × 7.6099… = 121.8 cm."] },
      ],
      commonError: "Sharing the diagonal in the ratio 16 : 9, as if the diagonal were the width plus the height.",
      hints: [
        "Let the width be 16k and the height 9k. How long is the diagonal in terms of k?",
        "Pythagoras: {{(16k)^2 + (9k)^2 = 337k^2}}, so the diagonal is {{sqrt(337)}} × k.",
        "The diagonal is 55 × 2.54 = 139.7 cm. Find k, then the width 16k.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "exam-c1-q30",
      topicId: "circles",
      guideRef: "semicircles-quarter-circles",
      difficulty: "challenge",
      question:
        "A standard running track has two straights, each 84.39 m long, joined by two semicircular bends. Along the inside edge of lane 1, each bend has radius 36.5 m. Each lane is 1.22 m wide.\n\n(a) Work out how much further it is to run one lap along the inside edge of lane 2 than along the inside edge of lane 1. Give your answer to 2 decimal places.\n\n(b) Explain why your answer to (a) would be exactly the same on a track with longer straights or bigger bends.",
      diagram: RUNNING_TRACK,
      marks: 4,
      modelAnswer:
        "(a) The straights are the same length in both lanes, so the difference comes only from the bends. The two semicircles together make one full circle. Lane 1: 2π × 36.5 = 229.336… m. Lane 2: the radius is 36.5 + 1.22 = 37.72 m, so 2π × 37.72 = 237.001… m. Difference = 237.001… − 229.336… = 7.665… = 7.67 m (2 d.p.). (The full laps are 398.12 m and 405.78 m.)\n\n(b) For any bend radius r, the extra distance is 2π(r + 1.22) − 2πr = 2πr + 2π × 1.22 − 2πr = 2π × 1.22. The r cancels, and the straights are equal in both lanes, so the difference is always 2π × 1.22 ≈ 7.67 m. It depends only on the lane width. This is why one-lap races use staggered starts: each lane further out starts further round the track, so that everyone runs the same distance.",
      markScheme: [
        { point: "Straights are the same in both lanes, so only the bends matter (two semicircles make a full circle)", keywords: ["straight", "same", "full circle", "two semicircles", "bends"] },
        { point: "Lane 2 bend radius 36.5 + 1.22 = 37.72 m (or lap lengths 398.12 m and 405.78 m)", keywords: ["37.72", "398.1", "405.7", "405.8"] },
        { point: "Difference = 2π × 1.22 = 7.67 m", keywords: ["7.67", "2π", "2 x π", "2pi", "1.22"] },
        { point: "The radius cancels: 2π(r + 1.22) − 2πr = 2π × 1.22, so the answer depends only on the lane width", keywords: ["cancel", "doesn't depend", "does not depend", "r + 1.22", "only on the width", "lane width"] },
      ],
      commonError: "Rounding the two circumferences before subtracting (which gives 7.66 m), or adding the lane width to the diameter instead of the radius.",
      hints: [
        "Which parts of the lap are the same length in both lanes?",
        "The two semicircular bends together make one full circle. What is its radius in lane 2?",
        "Write the extra distance as 2π(r + 1.22) − 2πr and simplify. What happens to r?",
      ],
      strategy: "Look for an invariant",
    },
  ],
};
