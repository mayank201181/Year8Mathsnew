import type { Paper } from "../../types.ts";

// ---------------------------------------------------------------------------
// Diagrams (inline SVG)
// ---------------------------------------------------------------------------

const vennBadminton = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 30 students: Badminton only 9, both badminton and swimming 5, Swimming only 7, neither 9"><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="140" cy="118" r="72" fill="#c7d2fe" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="118" r="72" fill="#fde68a" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><text x="98" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Badminton</text><text x="262" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Swimming</text><text x="105" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9</text><text x="180" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><text x="255" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">7</text><text x="36" y="196" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9</text></svg>`;

const vennChoirRobotics = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 32 students: Choir only 11, both choir and robotics 4, Robotics only 9, neither 8"><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="140" cy="118" r="72" fill="#bbf7d0" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="118" r="72" fill="#bae6fd" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><text x="98" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Choir</text><text x="262" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Robotics</text><text x="105" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">11</text><text x="180" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="255" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9</text><text x="36" y="196" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8</text></svg>`;

const vennSentosa = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 40 students: Universal Studios only 12, both 8, S.E.A. Aquarium only 11, neither 9"><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="140" cy="118" r="72" fill="#fecaca" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="118" r="72" fill="#bae6fd" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><text x="98" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Universal Studios</text><text x="266" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">S.E.A. Aquarium</text><text x="105" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12</text><text x="180" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8</text><text x="255" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">11</text><text x="36" y="196" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9</text></svg>`;

const vennChoirBand = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 40 students: Choir only x, both choir and band 5, Band only 2x, neither 11"><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="140" cy="118" r="72" fill="#c7d2fe" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="118" r="72" fill="#bbf7d0" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><text x="98" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Choir</text><text x="262" y="36" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Band</text><text x="105" y="123" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">x</text><text x="180" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><text x="255" y="123" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2<tspan font-style="italic">x</tspan></text><text x="36" y="196" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">11</text></svg>`;

const vennNumbers = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of the numbers 1 to 20. Even only: 2, 4, 8, 10, 14, 16, 20. Both even and multiple of 3: 6, 12, 18. Multiple of 3 only: 3, 9, 15. Neither: 1, 5, 7, 11, 13, 17, 19"><rect x="0" y="0" width="400" height="240" fill="#ffffff"/><rect x="10" y="10" width="380" height="220" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="150" cy="125" r="85" fill="#c7d2fe" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="250" cy="125" r="85" fill="#fde68a" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="95" y="36">Even</text><text x="305" y="36">Multiple of 3</text><text x="100" y="99">2</text><text x="135" y="99">4</text><text x="90" y="129">8</text><text x="125" y="129">10</text><text x="100" y="159">14</text><text x="135" y="159">16</text><text x="115" y="189">20</text><text x="200" y="104">6</text><text x="200" y="132">12</text><text x="200" y="160">18</text><text x="275" y="104">3</text><text x="300" y="132">9</text><text x="275" y="160">15</text><text x="30" y="52">1</text><text x="30" y="132">19</text><text x="30" y="216">5</text><text x="200" y="34">17</text><text x="200" y="222">13</text><text x="370" y="52">7</text><text x="370" y="216">11</text></g></svg>`;

const barSpinner = `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of 50 spins: red 14, blue 22, yellow 9, green 5"><rect x="0" y="0" width="360" height="250" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="55" y1="175" x2="345" y2="175"/><line x1="55" y1="140" x2="345" y2="140"/><line x1="55" y1="105" x2="345" y2="105"/><line x1="55" y1="70" x2="345" y2="70"/><line x1="55" y1="35" x2="345" y2="35"/></g><rect x="75" y="112" width="46" height="98" fill="#fecaca" stroke="#334155"/><rect x="145" y="56" width="46" height="154" fill="#bae6fd" stroke="#334155"/><rect x="215" y="147" width="46" height="63" fill="#fde68a" stroke="#334155"/><rect x="285" y="175" width="46" height="35" fill="#bbf7d0" stroke="#334155"/><line x1="55" y1="210" x2="345" y2="210" stroke="#1f2937" stroke-width="1.5"/><line x1="55" y1="30" x2="55" y2="210" stroke="#1f2937" stroke-width="1.5"/><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="49" y="214">0</text><text x="49" y="179">5</text><text x="49" y="144">10</text><text x="49" y="109">15</text><text x="49" y="74">20</text><text x="49" y="39">25</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="98" y="106">14</text><text x="168" y="50">22</text><text x="238" y="141">9</text><text x="308" y="169">5</text><text x="98" y="228">Red</text><text x="168" y="228">Blue</text><text x="238" y="228">Yellow</text><text x="308" y="228">Green</text><text x="200" y="246">Colour</text><text x="18" y="122" transform="rotate(-90 18 122)">Frequency</text></g></svg>`;

const treeBiasedCoin = `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tree diagram for two flips of a biased coin. Each flip: heads 0.6, tails 0.4. Outcomes HH, HT, TH, TT"><rect x="0" y="0" width="380" height="240" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><line x1="30" y1="120" x2="130" y2="65"/><line x1="30" y1="120" x2="130" y2="175"/><line x1="152" y1="65" x2="262" y2="35"/><line x1="152" y1="65" x2="262" y2="95"/><line x1="152" y1="175" x2="262" y2="145"/><line x1="152" y1="175" x2="262" y2="205"/></g><circle cx="30" cy="120" r="3" fill="#1f2937"/><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="141" y="18">1st flip</text><text x="273" y="18">2nd flip</text><text x="335" y="18">Outcome</text><text x="141" y="70">H</text><text x="141" y="180">T</text><text x="273" y="40">H</text><text x="273" y="100">T</text><text x="273" y="150">H</text><text x="273" y="210">T</text><text x="335" y="40">HH</text><text x="335" y="100">HT</text><text x="335" y="150">TH</text><text x="335" y="210">TT</text></g><g font-size="12" font-family="sans-serif" fill="#1e40af" text-anchor="middle"><text x="72" y="84">0.6</text><text x="72" y="166">0.4</text><text x="200" y="42">0.6</text><text x="200" y="98">0.4</text><text x="200" y="152">0.6</text><text x="200" y="208">0.4</text></g></svg>`;

const twoSpinners = `<svg viewBox="0 0 380 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spinner X has three equal sections labelled 1, 1 and 2. Spinner Y has two equal halves labelled 1 and 2"><rect x="0" y="0" width="380" height="210" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><path d="M100,100 L100,30 A70,70 0 0,1 160.62,135 Z" fill="#c7d2fe"/><path d="M100,100 L160.62,135 A70,70 0 0,1 39.38,135 Z" fill="#c7d2fe"/><path d="M100,100 L39.38,135 A70,70 0 0,1 100,30 Z" fill="#fde68a"/><path d="M280,100 L280,30 A70,70 0 0,1 280,170 Z" fill="#c7d2fe"/><path d="M280,100 L280,170 A70,70 0 0,1 280,30 Z" fill="#fde68a"/></g><g font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="135" y="85">1</text><text x="100" y="146">1</text><text x="65" y="85">2</text><text x="315" y="105">1</text><text x="245" y="105">2</text></g><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="100" y="195">Spinner X</text><text x="280" y="195">Spinner Y</text></g></svg>`;

const rfGraph = `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph of the relative frequency of red against number of spins. After 10 spins 0.6, 20 spins 0.45, 30 spins about 0.37, 40 spins 0.35, 50 spins 0.28, 60 spins about 0.32, 70 spins about 0.31, 80 spins about 0.29, 90 spins 0.3, 100 spins 0.3"><rect x="0" y="0" width="380" height="260" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="50" y1="185" x2="350" y2="185"/><line x1="50" y1="160" x2="350" y2="160"/><line x1="50" y1="135" x2="350" y2="135"/><line x1="50" y1="110" x2="350" y2="110"/><line x1="50" y1="85" x2="350" y2="85"/><line x1="50" y1="60" x2="350" y2="60"/><line x1="50" y1="35" x2="350" y2="35"/><line x1="110" y1="35" x2="110" y2="210"/><line x1="170" y1="35" x2="170" y2="210"/><line x1="230" y1="35" x2="230" y2="210"/><line x1="290" y1="35" x2="290" y2="210"/><line x1="350" y1="35" x2="350" y2="210"/></g><line x1="50" y1="210" x2="355" y2="210" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="30" x2="50" y2="210" stroke="#1f2937" stroke-width="1.5"/><polyline points="80,60 110,97.5 140,118.3 170,122.5 200,140 230,130.8 260,131.4 290,138.1 320,135 350,135" fill="none" stroke="#1e40af" stroke-width="2"/><g fill="#1e40af"><circle cx="80" cy="60" r="3"/><circle cx="110" cy="97.5" r="3"/><circle cx="140" cy="118.3" r="3"/><circle cx="170" cy="122.5" r="3"/><circle cx="200" cy="140" r="3"/><circle cx="230" cy="130.8" r="3"/><circle cx="260" cy="131.4" r="3"/><circle cx="290" cy="138.1" r="3"/><circle cx="320" cy="135" r="3"/><circle cx="350" cy="135" r="3"/></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="214">0</text><text x="44" y="189">0.1</text><text x="44" y="164">0.2</text><text x="44" y="139">0.3</text><text x="44" y="114">0.4</text><text x="44" y="89">0.5</text><text x="44" y="64">0.6</text><text x="44" y="39">0.7</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="50" y="226">0</text><text x="110" y="226">20</text><text x="170" y="226">40</text><text x="230" y="226">60</text><text x="290" y="226">80</text><text x="350" y="226">100</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="200" y="250">Number of spins</text><text x="14" y="122" transform="rotate(-90 14 122)">Relative frequency of red</text></g></svg>`;

// ---------------------------------------------------------------------------
// MCQ papers
// ---------------------------------------------------------------------------

export const mcqPapers: Paper[] = [
  // ======================================================================
  // MCQ Paper 1
  // ======================================================================
  {
    id: "probability-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "probability-m1-q01",
        question:
          "A fair six-sided dice is rolled. Where on the probability scale does the event \"the score is less than 7\" belong?",
        options: ["0", "{{1/6}}", "1", "{{6/7}}"],
        answerIndex: 2,
        explanation:
          "Every face of the dice (1 to 6) is less than 7, so the event is **certain**: probability 1. {{6/7}} comes from imagining 7 possible scores, but a dice has only 6 faces — and all 6 succeed. {{1/6}} is the chance of one particular face, and 0 would mean impossible.",
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["List the scores a dice can show. How many of them are less than 7?"],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "probability-m1-q02",
        question:
          "A bag holds 3 red, 5 blue and 4 green counters. One counter is taken at random. What is P(blue)?",
        options: ["{{5/12}}", "{{1/3}}", "{{5/7}}", "{{7/12}}"],
        answerIndex: 0,
        explanation:
          "There are 3 + 5 + 4 = 12 counters and 5 are blue, so P(blue) = {{5/12}}. {{1/3}} treats the three *colours* as equally likely, but there are more blue counters than red. {{5/7}} compares blue with not-blue (5 to 7) — that's a ratio, not a probability. {{7/12}} is P(not blue).",
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["How many counters are there altogether, and how many of them are blue?"],
        strategy: "Count equally likely outcomes",
      },
      {
        kind: "mcq",
        id: "probability-m1-q03",
        question:
          "The probability that it rains in Woodlands on a particular afternoon in November is 0.65. What is the probability that it does **not** rain that afternoon?",
        options: ["0.45", "0.5", "1.65", "0.35"],
        answerIndex: 3,
        explanation:
          "Raining and not raining are complementary, so P(not rain) = 1 − 0.65 = 0.35. 0.45 is a subtraction slip — check: 0.65 + 0.45 = 1.1, not 1. 0.5 assumes the two outcomes are equally likely, and 1.65 adds instead of subtracting; no probability can be bigger than 1.",
        difficulty: "warmup",
        guideRef: "complementary-events",
        hints: ["Rain and no rain together cover every possibility. What must their probabilities add up to?"],
        strategy: "Use the complement",
      },
      {
        kind: "mcq",
        id: "probability-m1-q04",
        question:
          "Arjun flips a coin and spins a fair spinner numbered 1, 2 and 3. How many different outcomes are possible (for example, heads and 2)?",
        options: ["5", "6", "3", "8"],
        answerIndex: 1,
        explanation:
          "Each of the 2 coin results pairs with each of the 3 spinner results: 2 × 3 = 6 outcomes (H1, H2, H3, T1, T2, T3). 5 comes from adding 2 + 3 instead of multiplying. 3 forgets the coin, and 8 = {{2^3}} would be the count for three coins, not a coin and a spinner.",
        difficulty: "warmup",
        guideRef: "sample-spaces",
        hints: ["List them: start with heads and go through the spinner, then do the same for tails."],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m1-q05",
        question:
          "Siti drops a drawing pin 50 times. It lands point up 18 times. What is the relative frequency of \"point up\"?",
        options: ["0.36", "0.18", "0.64", "0.5"],
        answerIndex: 0,
        explanation:
          "Relative frequency = number of successes ÷ number of trials = 18 ÷ 50 = 0.36. 0.18 divides by 100 instead of 50. 0.64 is the relative frequency of point *down*. 0.5 assumes the two ways of landing are equally likely — a drawing pin isn't symmetrical, which is exactly why we experiment.",
        difficulty: "warmup",
        guideRef: "relative-frequency",
        hints: ["Relative frequency = how many times it happened ÷ how many times you tried."],
        strategy: "Use relative frequency",
      },
      {
        kind: "mcq",
        id: "probability-m1-q06",
        question:
          "A spinner can only land on red, blue or yellow. P(red) = 0.3 and P(blue) = 0.45. What is P(yellow)?",
        options: ["0.55", "0.7", "0.25", "{{1/3}}"],
        answerIndex: 2,
        explanation:
          "The three outcomes are mutually exclusive and cover everything, so their probabilities add to 1: P(yellow) = 1 − 0.3 − 0.45 = 0.25. 0.55 subtracts only P(blue), and 0.7 subtracts only P(red). {{1/3}} assumes the three colours are equally likely, but the given probabilities show they are not.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "What must the probabilities of all the possible outcomes add up to?",
          "Add the two probabilities you know first.",
          "P(yellow) = 1 − (0.3 + 0.45).",
        ],
        strategy: "Use the fact that probabilities sum to 1",
      },
      {
        kind: "mcq",
        id: "probability-m1-q07",
        question:
          "A fair six-sided dice is rolled 150 times. About how many times would you expect a score **greater than 4**?",
        options: ["25", "50", "75", "100"],
        answerIndex: 1,
        explanation:
          "Greater than 4 means 5 or 6: 2 faces out of 6, so the probability is {{2/6}} = {{1/3}}. Expected number = {{1/3}} × 150 = 50. 25 uses {{1/6}}, counting only one face instead of both 5 and 6. 100 is the expected number of scores of 4 or less, and 75 assumes \"greater than 4\" covers half the faces.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "Which scores are greater than 4?",
          "Find the probability of getting one of those scores on a single roll.",
          "Expected number = probability × number of rolls.",
        ],
        strategy: "Find the probability, then multiply",
      },
      {
        kind: "mcq",
        id: "probability-m1-q08",
        question:
          "Spinner X is numbered 1, 2, 3, 4 and spinner Y is numbered 1, 2, 3. Both are spun and the two scores are added. How many of the outcomes give a total of 5?",
        options: ["2", "4", "12", "3"],
        answerIndex: 3,
        explanation:
          "List the pairs (X, Y): (2, 3), (3, 2) and (4, 1) — that's 3 outcomes. 4 includes (1, 4), but spinner Y has no 4. 2 treats (2, 3) and (3, 2) as the same outcome, but \"X shows 2, Y shows 3\" and \"X shows 3, Y shows 2\" are different results. 12 is the size of the whole sample space, not the number giving 5.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "Draw a 4 by 3 grid of totals, or list the pairs systematically.",
          "For each score on spinner X, what would spinner Y need to show to make 5?",
          "Check that each score you need is actually on spinner Y.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m1-q09",
        question:
          "Two fair six-sided dice are rolled. What is the probability of rolling a double (both dice show the same number)?",
        options: ["{{1/6}}", "{{1/36}}", "{{2/7}}", "{{1/3}}"],
        answerIndex: 0,
        explanation:
          "There are 6 × 6 = 36 equally likely outcomes and 6 of them are doubles (1-1 up to 6-6), so P(double) = {{6/36}} = {{1/6}}. {{1/36}} counts only one double, such as double six. {{2/7}} comes from listing just 21 \"unordered\" pairs (treating 2-5 and 5-2 as one result) — those 21 are not equally likely. {{1/3}} adds {{1/6 + 1/6}}.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "How many outcomes are in the sample space for two dice?",
          "How many of those outcomes are doubles?",
          "Divide the number of doubles by 36.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m1-q10",
        question:
          "The two-way table shows how 40 Year 8 students travel to school.\n\n| | MRT | Bus | Walk | Total |\n|---|---|---|---|---|\n| Boys | 8 | 6 | 4 | 18 |\n| Girls | 10 | 5 | 7 | 22 |\n| Total | 18 | 11 | 11 | 40 |\n\nA student is chosen at random from all 40. What is the probability that the student is a girl who takes the bus?",
        options: ["{{5/22}}", "{{11/40}}", "{{1/8}}", "{{5/11}}"],
        answerIndex: 2,
        explanation:
          "5 students are girls who take the bus, out of all 40: {{5/40}} = {{1/8}}. {{5/22}} divides by the number of girls only — that would be right if the student were chosen from the girls. {{5/11}} divides by the bus users only. {{11/40}} is P(takes the bus), boys included.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Which single cell is \"girl AND bus\"?",
          "Who is the student chosen from — the girls, the bus users, or everyone?",
          "Divide by the grand total, 40.",
        ],
        strategy: "Read the table carefully",
      },
      {
        kind: "mcq",
        id: "probability-m1-q11",
        question:
          "A school raffle sells 200 tickets and there is one prize. Mei buys 4 tickets. She says: \"I either win or I don't, so my chance of winning is {{1/2}}.\" What is Mei's actual probability of winning?",
        options: ["{{1/2}}", "{{1/200}}", "{{1/49}}", "{{1/50}}"],
        answerIndex: 3,
        explanation:
          "Each of the 200 tickets is equally likely to win and 4 are Mei's, so P(win) = {{4/200}} = {{1/50}}. Mei's {{1/2}} is wrong because \"win\" and \"don't win\" are not equally likely outcomes. {{1/200}} ignores that she has 4 tickets, and {{1/49}} compares her 4 tickets with the other 196 — a ratio, not a probability.",
        difficulty: "core",
        guideRef: "probability-scale",
        hints: [
          "Are \"win\" and \"don't win\" equally likely here?",
          "Think of the 200 tickets as the equally likely outcomes.",
          "How many of the 200 tickets are Mei's?",
        ],
        strategy: "Count equally likely outcomes",
      },
      {
        kind: "mcq",
        id: "probability-m1-q12",
        question:
          "Ethan says: \"The probability that I pass my swimming test is 0.7 and the probability that I fail it is 0.4.\" What is wrong with Ethan's statement?",
        options: [
          "Nothing — both probabilities are between 0 and 1",
          "Pass and fail are complementary, so their probabilities must add to 1, but 0.7 + 0.4 = 1.1",
          "Probabilities must be written as fractions, not decimals",
          "Pass and fail are the only two outcomes, so each must be 0.5",
        ],
        answerIndex: 1,
        explanation:
          "Ethan either passes or fails — exactly one of them happens — so P(pass) + P(fail) must equal 1. His numbers add to 1.1. If P(pass) = 0.7, then P(fail) = 0.3. Checking that each value is between 0 and 1 is not enough on its own. Two outcomes don't have to be equally likely, so 0.5 each is wrong too, and decimals are a perfectly good way to write probabilities.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "Can Ethan both pass and fail? Can he do neither?",
          "So what should P(pass) + P(fail) be?",
          "Add 0.7 and 0.4 and compare.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "probability-m1-q13",
        question:
          "Four friends each flip the same bent coin to estimate P(heads).\n\n| Name | Flips | Heads |\n|---|---|---|\n| Priya | 10 | 7 |\n| Jun | 50 | 31 |\n| Hana | 200 | 118 |\n| Zara | 20 | 10 |\n\nWhose single experiment gives the most reliable estimate of P(heads)?",
        options: [
          "Hana's estimate of 0.59, because she flipped the most times",
          "Zara's estimate of 0.5, because a coin should land heads half the time",
          "Priya's estimate of 0.7, because she got the highest proportion of heads",
          "They are all equally reliable, because each one is a relative frequency",
        ],
        answerIndex: 0,
        explanation:
          "More trials give a more reliable relative frequency, so Hana's 118 ÷ 200 = 0.59 is the best single estimate. Zara's 0.5 only *looks* right — the coin is bent, so there's no reason to expect {{1/2}}, and 20 flips is a small sample. A relative frequency from just 10 flips, like Priya's 0.7, can easily be far from the true value, so the four are not equally reliable. (Even better: pool all 280 flips.)",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "What makes an experiment's estimate more trustworthy?",
          "Compare the number of flips each person did.",
        ],
        strategy: "More trials, better estimate",
      },
      {
        kind: "mcq",
        id: "probability-m1-q14",
        question:
          "The probability that a particular hawker-centre stall sells out of chendol on any given day is 0.15. On how many of the next 60 days would you expect it to sell out?",
        options: ["15", "4", "9", "51"],
        answerIndex: 2,
        explanation:
          "Expected number = probability × number of trials = 0.15 × 60 = 9 days. 15 treats 0.15 as \"15 days\" rather than 15 out of every 100. 4 is 60 ÷ 15, and 51 is the expected number of days it does *not* sell out (0.85 × 60).",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "What is the rule for an expected number?",
          "Multiply the probability by the number of days.",
          "0.1 × 60 = 6 and 0.05 × 60 = 3.",
        ],
        strategy: "Expected = probability × trials",
      },
      {
        kind: "mcq",
        id: "probability-m1-q15",
        question:
          "The Venn diagram shows whether each of 30 students plays badminton and whether they swim. One student is chosen at random. What is the probability that the student plays badminton?",
        diagram: vennBadminton,
        options: ["{{3/10}}", "{{7/15}}", "{{1/6}}", "{{7/10}}"],
        answerIndex: 1,
        explanation:
          "Everyone inside the Badminton circle plays badminton: 9 + 5 = 14 students, so P = {{14/30}} = {{7/15}}. {{3/10}} (that is, {{9/30}}) forgets the 5 in the overlap, who play badminton too. {{1/6}} is just the overlap (both sports), and {{7/10}} counts everyone in either circle (9 + 5 + 7 = 21).",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Which regions are inside the Badminton circle?",
          "Don't forget the overlap — those students play badminton as well.",
          "Add those regions and divide by 30.",
        ],
        strategy: "Read the diagram",
      },
      {
        kind: "mcq",
        id: "probability-m1-q16",
        question:
          "Spinner 1 has two equal sections, red and blue. Spinner 2 has three equal sections, red, blue and green. Both are spun. What is the probability that they land on the same colour?",
        options: ["{{1/2}}", "{{2/5}}", "{{1/6}}", "{{1/3}}"],
        answerIndex: 3,
        explanation:
          "There are 2 × 3 = 6 equally likely outcomes: RR, RB, RG, BR, BB, BG. Two of them (RR and BB) match, so P = {{2/6}} = {{1/3}}. {{2/5}} comes from treating RB and BR as the same outcome, leaving 5 results that are not equally likely. {{1/6}} counts only RR, and {{1/2}} assumes \"same\" and \"different\" are equally likely.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "List every outcome as (spinner 1, spinner 2).",
          "How many outcomes are there? Are they equally likely?",
          "Count the outcomes where the colours match.",
        ],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m1-q17",
        question:
          "A locker code is made of 3 **different** digits chosen from 1, 2, 3, 4 and 5, in order (so 123 and 321 are different codes). How many codes are possible?",
        options: ["125", "10", "60", "15"],
        answerIndex: 2,
        explanation:
          "Product rule: 5 choices for the first digit, then 4 left for the second, then 3 for the third: 5 × 4 × 3 = 60. 125 = 5 × 5 × 5 allows repeated digits, which the question rules out. 10 counts *sets* of three digits and ignores order — but 123 and 321 are different codes. 15 adds 5 + 4 + 3 instead of multiplying.",
        difficulty: "challenge",
        guideRef: "sample-spaces",
        hints: [
          "How many choices are there for the first digit?",
          "Once the first digit is used, how many are left for the second? And for the third?",
          "Multiply the numbers of choices at each stage.",
        ],
        strategy: "Use the product rule",
      },
      {
        kind: "mcq",
        id: "probability-m1-q18",
        question:
          "Two fair six-sided dice are rolled and the scores are added. Which is more likely: a total of exactly 7, or a total of 10 or more?",
        options: [
          "They are equally likely",
          "A total of exactly 7",
          "A total of 10 or more, because it covers three different totals",
          "You cannot tell without rolling the dice many times",
        ],
        answerIndex: 0,
        explanation:
          "Count in the 36-outcome grid. A total of 7: (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1) — 6 outcomes. 10 or more: 10 has 3 ways, 11 has 2 and 12 has 1 — also 6 outcomes. Both are {{6/36}} = {{1/6}}. Seven *is* the single most likely total, but three less likely totals together catch up exactly — so neither \"exactly 7\" nor \"10 or more\" wins. Theory settles it; no experiment is needed.",
        difficulty: "challenge",
        guideRef: "combined-events",
        hints: [
          "Use a 6 by 6 sample space of totals.",
          "Count the cells showing 7.",
          "Now count the cells showing 10, 11 or 12.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m1-q19",
        question:
          "In a class of 30 students, 18 like durian, 15 like mangosteen and 4 like neither. A student is chosen at random. What is the probability that the student likes **both** fruits?",
        options: ["{{1/10}}", "{{2/15}}", "{{11/30}}", "{{7/30}}"],
        answerIndex: 3,
        explanation:
          "30 − 4 = 26 students like at least one fruit. But 18 + 15 = 33 counts the \"both\" students twice, so both = 33 − 26 = 7 and P = {{7/30}}. {{1/10}} (that is, {{3/30}}) forgets the 4 who like neither and works out 33 − 30. {{2/15}} (that is, {{4/30}}) uses the \"neither\" number, and {{11/30}} is the number who like durian only (18 − 7).",
        difficulty: "challenge",
        guideRef: "two-way-tables-venn",
        hints: [
          "Draw a Venn diagram with two overlapping circles and put the 4 outside.",
          "How many students are inside the circles altogether?",
          "18 + 15 counts the overlap twice. By how much does it overshoot?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "probability-m1-q20",
        question:
          "On any day in December, the probability of rain in Siti's town is 0.3, independently of other days. What is the probability that at least one of the next two days is dry?",
        options: ["0.49", "0.91", "0.42", "1.4"],
        answerIndex: 1,
        explanation:
          "The only way to *fail* is rain on both days: 0.3 × 0.3 = 0.09. So P(at least one dry day) = 1 − 0.09 = 0.91. 0.49 = 0.7 × 0.7 is P(both days dry) — just one of the ways to get a dry day. 0.42 is P(exactly one dry day) (0.7 × 0.3 + 0.3 × 0.7). 1.4 adds 0.7 + 0.7, which is more than 1, so it's impossible.",
        difficulty: "challenge",
        guideRef: "tree-diagrams",
        hints: [
          "\"At least one dry day\" has a much simpler opposite. What is it?",
          "The opposite is \"rain on both days\". Multiply along that path of a tree diagram.",
          "Subtract that probability from 1.",
        ],
        strategy: "Use the complement",
      },
    ],
  },

  // ======================================================================
  // MCQ Paper 2
  // ======================================================================
  {
    id: "probability-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "probability-m2-q01",
        question: "Which of these could **not** be the probability of an event?",
        options: ["0", "{{7/6}}", "1", "0.007"],
        answerIndex: 1,
        explanation:
          "Probabilities run from 0 (impossible) to 1 (certain). {{7/6}} is bigger than 1 — it would mean 7 successes out of only 6 equally likely outcomes. 0 and 1 are allowed: they are the ends of the scale, for impossible and certain events. 0.007 is tiny, but it is still between 0 and 1.",
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["What are the smallest and largest values on the probability scale?"],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "probability-m2-q02",
        question: "A bag contains only red and green counters. P(red) = {{3/8}}. What is P(green)?",
        options: ["{{3/8}}", "{{1/2}}", "{{5/3}}", "{{5/8}}"],
        answerIndex: 3,
        explanation:
          "Every counter is red or green, so P(green) = 1 − {{3/8}} = {{5/8}}. {{3/8}} just repeats P(red) — together the two would only make {{6/8}}, not 1. {{1/2}} assumes the two colours are equally likely, which {{3/8}} shows they are not. {{5/3}} compares green with red (5 to 3) — it's bigger than 1, so it cannot be a probability.",
        difficulty: "warmup",
        guideRef: "complementary-events",
        hints: ["Red and green cover every counter. What must P(red) + P(green) be?"],
        strategy: "Use the complement",
      },
      {
        kind: "mcq",
        id: "probability-m2-q03",
        question: "Two fair coins are flipped. How many equally likely outcomes are there?",
        options: ["4", "3", "2", "8"],
        answerIndex: 0,
        explanation:
          "List them coin by coin: HH, HT, TH, TT — 4 outcomes (2 × 2). 3 comes from treating HT and TH as the same, but \"first coin heads, second tails\" and \"first tails, second heads\" are different — imagine one is a 10-cent coin and the other a 20-cent coin. 2 only describes one coin, and 8 would be the count for three coins.",
        difficulty: "warmup",
        guideRef: "sample-spaces",
        hints: ["Pretend the coins are different colours. List what each one can show."],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m2-q04",
        question:
          "Jun wants to find the probability that a slice of buttered toast lands butter-side down when it slides off a plate. What is the best way to estimate it?",
        options: [
          "It must be {{1/2}}, because toast has two sides",
          "Drop it once and see which way it lands",
          "Drop it many times and find the fraction of drops that land butter-side down",
          "Ask some friends what they think the chance is",
        ],
        answerIndex: 2,
        explanation:
          "When outcomes may not be equally likely (the butter could change how toast falls), you estimate with an experiment: relative frequency = butter-side-down landings ÷ number of drops, using lots of drops. Saying {{1/2}} assumes the two sides are equally likely without any evidence. One drop tells you almost nothing, and opinions aren't data.",
        difficulty: "warmup",
        guideRef: "relative-frequency",
        hints: ["Is there a good reason to believe both sides are equally likely?"],
        strategy: "Run an experiment",
      },
      {
        kind: "mcq",
        id: "probability-m2-q05",
        question:
          "A fair spinner has 5 equal sections and one of them is gold. It is spun 40 times. How many times would you expect it to land on gold?",
        options: ["5", "8", "0.2", "32"],
        answerIndex: 1,
        explanation:
          "P(gold) = {{1/5}}, so the expected number is {{1/5}} × 40 = 8. 5 is the number of sections, not a number of spins. 0.2 is the probability itself — the question asks how many *times*. 32 is the expected number of spins that are *not* gold.",
        difficulty: "warmup",
        guideRef: "expected-outcomes",
        hints: ["First find P(gold), then multiply by the number of spins."],
        strategy: "Expected = probability × trials",
      },
      {
        kind: "mcq",
        id: "probability-m2-q06",
        question:
          "A jar contains 12 sweets. When one is picked at random, P(lemon flavour) = {{1/4}}. How many lemon sweets are in the jar?",
        options: ["3", "4", "48", "9"],
        answerIndex: 0,
        explanation:
          "P(lemon) = number of lemon sweets ÷ 12 = {{1/4}}, so there are {{1/4}} × 12 = 3 lemon sweets. 4 reads the denominator of {{1/4}} as the count. 48 multiplies 12 by 4 instead of dividing, and 9 is the number of sweets that are *not* lemon.",
        difficulty: "core",
        guideRef: "probability-scale",
        hints: [
          "P(lemon) = number of lemon sweets ÷ total number of sweets.",
          "What fraction of the 12 sweets are lemon?",
          "Find {{1/4}} of 12.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "probability-m2-q07",
        question:
          "Each student in a canteen queue buys exactly one drink. The table shows the probability of each choice.\n\n| Drink | Water | Milo | Soya milk | Lime juice |\n|---|---|---|---|---|\n| Probability | 0.35 | 0.25 | {{x}} | {{x}} |\n\nSoya milk and lime juice are equally likely. What is the value of {{x}}?",
        options: ["0.4", "0.25", "0.2", "0.6"],
        answerIndex: 2,
        explanation:
          "The four drinks cover every choice, so the probabilities add to 1: {{0.35 + 0.25 + 2x = 1}}, giving {{2x = 0.4}} and {{x = 0.2}}. 0.4 forgets to share what's left between the two drinks. 0.25 assumes all four drinks are equally likely, and 0.6 is just 0.35 + 0.25.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "What must all four probabilities add up to?",
          "0.35 + 0.25 = 0.6. How much probability is left for the other two drinks?",
          "Share what's left equally between soya milk and lime juice.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "probability-m2-q08",
        question:
          "Two fair spinners are each numbered 1, 2, 3, 4. Both are spun and the two scores are **multiplied**. How many of the 16 outcomes give an even product?",
        options: ["4", "6", "8", "12"],
        answerIndex: 3,
        explanation:
          "A product is odd only when both scores are odd: 1 or 3 on each spinner, so 2 × 2 = 4 odd outcomes. That leaves 16 − 4 = 12 even outcomes. 4 counts only \"even × even\", and 8 counts only the outcomes where exactly one score is even — each misses part of the answer. 6 counts the different even *products* (2, 4, 6, 8, 12, 16) instead of the outcomes.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "Draw the 4 by 4 grid of products, or think about when a product is odd.",
          "When is the product of two whole numbers odd?",
          "Count the odd outcomes and subtract from 16.",
        ],
        strategy: "Use the complement",
      },
      {
        kind: "mcq",
        id: "probability-m2-q09",
        question:
          "A fair coin is flipped and a fair six-sided dice is rolled. What is the probability of getting heads **and** an even number?",
        options: ["1", "{{1/4}}", "{{1/8}}", "{{3/8}}"],
        answerIndex: 1,
        explanation:
          "There are 2 × 6 = 12 equally likely outcomes. Heads with 2, 4 or 6 is 3 of them, so P = {{3/12}} = {{1/4}}. 1 comes from adding {{1/2 + 1/2}}, but needing *both* things can't be more likely than either one on its own. {{1/8}} and {{3/8}} both use 2 + 6 = 8 outcomes — to count combined outcomes you multiply, not add.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "List the outcomes: H1, H2, …, T6. How many are there?",
          "Which of them are heads with an even number?",
          "Divide the number of successful outcomes by the total.",
        ],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m2-q10",
        question:
          "60 people at a hawker centre each bought one drink, hot or cold. Some of the two-way table is missing.\n\n| | Hot | Cold | Total |\n|---|---|---|---|\n| Adults | 18 | ? | 32 |\n| Children | ? | ? | ? |\n| Total | 25 | ? | 60 |\n\nOne of the 60 people is chosen at random. What is the probability that they are a child who bought a cold drink?",
        options: ["{{3/4}}", "{{7/30}}", "{{7/12}}", "{{7/20}}"],
        answerIndex: 3,
        explanation:
          "Fill the gaps: children = 60 − 32 = 28; children hot = 25 − 18 = 7; children cold = 28 − 7 = 21. So P = {{21/60}} = {{7/20}}. {{3/4}} (that is, {{21/28}}) divides by the number of children only, but the person is chosen from all 60. {{7/30}} (that is, {{14/60}}) is adults who chose cold, and {{7/12}} (that is, {{35/60}}) is everyone who chose cold.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Fill in the easiest missing cells first — every row and column must add up.",
          "How many children are there? How many children chose hot?",
          "Children cold = 28 − 7. Then divide by the grand total.",
        ],
        strategy: "Fill in a two-way table",
      },
      {
        kind: "mcq",
        id: "probability-m2-q11",
        question:
          "A fair six-sided dice is rolled once. Which pair of events are **mutually exclusive** (they cannot both happen)?",
        options: [
          "Rolling a 2 and rolling an odd number",
          "Rolling an even number and rolling a number greater than 3",
          "Rolling a prime number and rolling an even number",
          "Rolling a 6 and rolling a multiple of 3",
        ],
        answerIndex: 0,
        explanation:
          "2 is not odd, so \"rolling a 2\" and \"rolling an odd number\" can never happen together — they are mutually exclusive. The other pairs share an outcome: 4 and 6 are even *and* greater than 3; 2 is prime *and* even; 6 is a 6 *and* a multiple of 3. Note that mutually exclusive does not mean complementary — rolling a 2 and rolling an odd number don't cover 4 or 6.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "For each pair, look for a single score that belongs to both events.",
          "If you can find such a score, the events are not mutually exclusive.",
        ],
        strategy: "Look for a counterexample",
      },
      {
        kind: "mcq",
        id: "probability-m2-q12",
        question: "Which of these events has a probability closest to an even chance ({{1/2}})?",
        options: [
          "A month picked at random has 31 days",
          "A letter picked at random from the word PROBABILITY is a vowel",
          "A fair six-sided dice shows a prime number",
          "A day of the week picked at random is Saturday or Sunday",
        ],
        answerIndex: 2,
        explanation:
          "The primes on a dice are 2, 3 and 5, so P(prime) = {{3/6}} = {{1/2}} exactly. A 31-day month has probability {{7/12}} (Jan, Mar, May, Jul, Aug, Oct, Dec) — close, but more than half. PROBABILITY has 11 letters and 4 vowels (O, A, I, I), giving {{4/11}}. A weekend day is {{2/7}}.",
        difficulty: "core",
        guideRef: "probability-scale",
        hints: [
          "Work out each probability as a fraction.",
          "Which scores on a dice are prime? Remember that 1 is not prime.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "probability-m2-q13",
        question:
          "Marcus rolls a six-sided dice 300 times and gets a 1 on 95 of the rolls. Which conclusion is the most sensible?",
        options: [
          "The dice is fair, because every number can still come up",
          "The dice is definitely biased, because 95 is not exactly 50",
          "The next roll is unlikely to be a 1, because 1 has come up so often",
          "The dice may well be biased towards 1, because a fair dice would give about 50 ones",
        ],
        answerIndex: 3,
        explanation:
          "For a fair dice you'd expect about {{1/6}} × 300 = 50 ones. 95 is nearly double that over a lot of rolls, which is strong evidence of bias towards 1. \"Definitely\" goes too far — experiments give evidence, not certainty, and a fair dice is never expected to hit exactly 50. A dice has no memory, so past 1s don't make the next 1 less likely; if anything, this dice seems to favour 1.",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "How many 1s would a fair dice be expected to give in 300 rolls?",
          "Is 95 a small or a large difference from that, given 300 rolls?",
        ],
        strategy: "Compare with what you'd expect",
      },
      {
        kind: "mcq",
        id: "probability-m2-q14",
        question:
          "Hana rolls a fair six-sided dice again and again. About how many rolls should she expect to make to get 25 sixes?",
        options: ["150", "4", "31", "125"],
        answerIndex: 0,
        explanation:
          "Expected sixes = {{1/6}} × number of rolls. For 25 sixes: {{1/6 n = 25}}, so n = 25 × 6 = 150. 4 comes from 25 × {{1/6}} ≈ 4.2 — multiplying instead of working backwards. 31 adds 25 + 6, and 125 is 25 × 5, which counts only the rolls that are not sixes.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "On average, how many rolls does it take to get one six?",
          "Write {{1/6 n = 25}}.",
          "Undo the {{1/6}} by multiplying by 6.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "probability-m2-q15",
        question:
          "The Venn diagram shows how many of the 32 students in a class are in the choir and how many are in the robotics club. A student is chosen at random. What is the probability that they are in **exactly one** of the two CCAs?",
        diagram: vennChoirRobotics,
        options: ["{{3/4}}", "{{5/8}}", "{{1/8}}", "{{11/32}}"],
        answerIndex: 1,
        explanation:
          "Exactly one means choir only or robotics only: 11 + 9 = 20, so P = {{20/32}} = {{5/8}}. {{3/4}} (that is, {{24/32}}) also includes the 4 students who do both — they are in two CCAs, not one. {{1/8}} is just the overlap, and {{11/32}} is choir only.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Which regions mean \"in one CCA but not the other\"?",
          "Leave out the overlap and the outside.",
          "Add 11 and 9, then divide by 32.",
        ],
        strategy: "Read the diagram",
      },
      {
        kind: "mcq",
        id: "probability-m2-q16",
        question:
          "Of 80 MRT trains that Arjun timed at Bishan station, 12 arrived more than 2 minutes late. Using his data, estimate how many of the next 500 trains will arrive more than 2 minutes late.",
        options: ["60", "425", "75", "15"],
        answerIndex: 2,
        explanation:
          "The relative frequency is {{12/80}} = 0.15, so the estimate is 0.15 × 500 = 75 trains. 60 scales 12 by 5, as if 80 trains became 400. 425 estimates the trains that are *not* late, and 15 is 0.15 written as a percentage, not a number of trains.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "First estimate the probability of a late train from Arjun's data.",
          "Relative frequency = 12 ÷ 80.",
          "Multiply that by 500.",
        ],
        strategy: "Estimate the probability, then multiply",
      },
      {
        kind: "mcq",
        id: "probability-m2-q17",
        question:
          "Wei Ling spins a spinner 50 times and gets red 20 times. She then spins it 50 more times. Her relative frequency of red for all 100 spins is 0.32. How many reds did she get in the second set of 50 spins?",
        options: ["12", "32", "16", "8"],
        answerIndex: 0,
        explanation:
          "After 100 spins, 0.32 × 100 = 32 reds altogether. She had 20 in the first 50, so the second 50 gave 32 − 20 = 12. 32 is the total for all 100 spins. 16 is 0.32 × 50, but 0.32 describes all 100 spins, not just the second set. 8 multiplies the drop in relative frequency (0.40 − 0.32 = 0.08) by 100.",
        difficulty: "challenge",
        guideRef: "relative-frequency",
        hints: [
          "A relative frequency of 0.32 over 100 spins — how many reds is that in total?",
          "How many of those reds came in the first 50 spins?",
          "Subtract to find the reds in the second 50.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "probability-m2-q18",
        question:
          "Two fair six-sided dice are rolled. Priya says: \"P(at least one 6) = {{1/6 + 1/6 = 1/3}}.\" What is the correct probability?",
        options: ["{{1/3}}", "{{1/36}}", "{{5/18}}", "{{11/36}}"],
        answerIndex: 3,
        explanation:
          "In the 36-outcome grid, a 6 on the first dice gives 6 cells and a 6 on the second gives 6 cells, but they share (6, 6). So there are 6 + 6 − 1 = 11 outcomes and P = {{11/36}}. Priya's {{1/3}} = {{12/36}} counts double six twice. {{1/36}} is P(double six) only, and {{5/18}} = {{10/36}} leaves double six out — that's \"exactly one 6\". Quick check: P(no 6) = {{25/36}}, and 1 − {{25/36}} = {{11/36}}.",
        difficulty: "challenge",
        guideRef: "combined-events",
        hints: [
          "Draw the 6 by 6 grid and shade every outcome with at least one 6.",
          "Is any cell in both the \"first dice is 6\" row and the \"second dice is 6\" column?",
          "Count: 6 + 6 − 1.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m2-q19",
        question:
          "How many 3-digit numbers can be made using only the digits 2, 5 and 7 if digits **may** be repeated and the number must be **odd**?",
        options: ["27", "18", "4", "6"],
        answerIndex: 1,
        explanation:
          "Odd means the last digit is 5 or 7 (2 choices). The first and second digits can each be any of the 3 digits. Product rule: 3 × 3 × 2 = 18. 27 = 3 × 3 × 3 ignores the \"odd\" condition. 4 is the count when digits may *not* repeat (257, 527, 275, 725). 6 counts the arrangements of 2, 5 and 7 using each once, ignoring \"odd\".",
        difficulty: "challenge",
        guideRef: "sample-spaces",
        hints: [
          "Start with the most restricted position. Which digit decides whether a number is odd?",
          "How many choices are there for the last digit? For each of the other two?",
          "Multiply the choices.",
        ],
        strategy: "Deal with the restriction first",
      },
      {
        kind: "mcq",
        id: "probability-m2-q20",
        question:
          "A bag holds 3 red and 2 blue counters. Zara takes one counter at random, does **not** put it back, then takes a second. What is the probability that both counters are red?",
        options: ["{{9/25}}", "{{6/5}}", "{{3/10}}", "{{6/25}}"],
        answerIndex: 2,
        explanation:
          "First red: {{3/5}}. Now 4 counters are left and 2 are red, so second red: {{2/4}}. Multiply along the branch: {{3/5 * 2/4 = 6/20 = 3/10}}. {{9/25}} = {{3/5 * 3/5}} would be right only if the counter were put back. {{6/25}} changes the top for the second pick but not the bottom — only 4 counters are left. {{6/5}} adds instead of multiplying, and it's bigger than 1.",
        difficulty: "challenge",
        guideRef: "tree-diagrams",
        hints: [
          "After one red is taken out, how many counters are left, and how many of them are red?",
          "Draw a tree: the second-pick probabilities depend on the first pick.",
          "Multiply {{3/5}} by the new probability of red.",
        ],
        strategy: "Draw a tree diagram",
      },
    ],
  },

  // ======================================================================
  // MCQ Paper 3
  // ======================================================================
  {
    id: "probability-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "probability-m3-q01",
        question: "Which of these events has a probability of exactly {{3/4}}?",
        options: [
          "A red counter is picked at random from a bag of 3 red and 4 blue counters",
          "A day picked at random from a week is a weekday (Monday to Friday)",
          "A fair coin lands heads in 3 out of 4 flips",
          "A fair spinner with 4 equal sections, 3 of them blue, lands on blue",
        ],
        answerIndex: 3,
        explanation:
          "The spinner has 4 equally likely sections and 3 are blue, so P(blue) = {{3/4}}. The bag gives {{3/7}}, not {{3/4}} — \"3 red to 4 blue\" is a ratio, and the total is 7. A weekday is {{5/7}}, close to {{3/4}} but not equal. \"3 heads in 4 flips\" describes one possible result, not a probability — a fair coin has P(heads) = {{1/2}}.",
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["For each event, work out (favourable outcomes) ÷ (total equally likely outcomes)."],
        strategy: "Count equally likely outcomes",
      },
      {
        kind: "mcq",
        id: "probability-m3-q02",
        question:
          "A fair spinner numbered 1, 2, 3 is spun and a fair coin is flipped. What is the probability of getting a 3 **and** heads?",
        options: ["{{1/5}}", "{{1/6}}", "{{5/6}}", "{{1/3}}"],
        answerIndex: 1,
        explanation:
          "There are 3 × 2 = 6 equally likely outcomes (1H, 1T, 2H, 2T, 3H, 3T) and only 3H works, so P = {{1/6}}. {{1/5}} adds 3 + 2 outcomes instead of multiplying. {{5/6}} adds {{1/3 + 1/2}} — needing both can't be more likely than each part on its own. {{1/3}} is just P(3), ignoring the coin.",
        difficulty: "warmup",
        guideRef: "combined-events",
        hints: ["List all the outcomes, like 1H, 1T, … — how many are there?"],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m3-q03",
        question:
          "Ravi has 4 T-shirts and 3 pairs of shorts. An outfit is one T-shirt with one pair of shorts. How many different outfits can he make?",
        options: ["7", "4", "12", "24"],
        answerIndex: 2,
        explanation:
          "Each of the 4 T-shirts can go with each of the 3 pairs of shorts: 4 × 3 = 12 outfits. 7 adds instead of multiplying. 4 only counts the T-shirts. 24 counts every outfit twice, as if \"T-shirt then shorts\" and \"shorts then T-shirt\" were different outfits.",
        difficulty: "warmup",
        guideRef: "sample-spaces",
        hints: ["For one T-shirt, how many outfits are there? Now repeat for every T-shirt."],
        strategy: "Use the product rule",
      },
      {
        kind: "mcq",
        id: "probability-m3-q04",
        question:
          "Aisha spins a four-colour spinner 50 times. The bar chart shows her results. What is the relative frequency of blue?",
        diagram: barSpinner,
        options: ["0.44", "0.22", "0.25", "0.56"],
        answerIndex: 0,
        explanation:
          "Blue came up 22 times out of 50 spins: 22 ÷ 50 = 0.44. 0.22 divides by 100 instead of 50. 0.25 assumes the four colours are equally likely — the experiment suggests they aren't. 0.56 is the relative frequency of *not* blue.",
        difficulty: "warmup",
        guideRef: "relative-frequency",
        hints: ["Read the height of the blue bar, then divide by the total number of spins."],
        strategy: "Read the diagram",
      },
      {
        kind: "mcq",
        id: "probability-m3-q05",
        question:
          "A fair coin has landed heads on each of the last 5 flips. What is the probability that it lands heads on the next flip?",
        options: [
          "{{1/64}}",
          "Less than {{1/2}}, because tails is due",
          "More than {{1/2}}, because heads is on a streak",
          "{{1/2}}",
        ],
        answerIndex: 3,
        explanation:
          "Each flip is independent — the coin has no memory — so P(heads) is still {{1/2}}. Believing tails is \"due\" is called the gambler's fallacy, and believing in a heads \"streak\" is the same mistake the other way round. {{1/64}} = {{(1/2)^6}} is the chance of six heads in a row *before any flips are made*; the first five have already happened.",
        difficulty: "warmup",
        guideRef: "tree-diagrams",
        hints: ["Does the coin know what happened on the last 5 flips?"],
        strategy: "Think about independence",
      },
      {
        kind: "mcq",
        id: "probability-m3-q06",
        question:
          "In a football match, the probability that Marcus's team wins is 0.45 and the probability of a draw is 0.2. What is the probability that his team does **not** win?",
        options: ["0.35", "0.55", "0.65", "0.8"],
        answerIndex: 1,
        explanation:
          "\"Not win\" is the complement of \"win\", so P(not win) = 1 − 0.45 = 0.55 — this includes both drawing and losing. 0.35 is P(lose) only (1 − 0.45 − 0.2), which forgets that a draw is also not a win. 0.65 is P(win or draw), and 0.8 is P(not a draw).",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "What are the three possible results of a match?",
          "Which of those results count as \"not win\"?",
          "Use P(not win) = 1 − P(win).",
        ],
        strategy: "Use the complement",
      },
      {
        kind: "mcq",
        id: "probability-m3-q07",
        question:
          "A bag contains some red counters and 9 blue counters, and nothing else. P(blue) = {{3/7}}. How many red counters are in the bag?",
        options: ["12", "21", "4", "30"],
        answerIndex: 0,
        explanation:
          "{{3/7}} of the counters are blue and that's 9, so {{1/7}} of the bag is 3 counters and the whole bag is 7 × 3 = 21. Red = 21 − 9 = 12. 21 is the total, not the number of red. 4 reads the fraction as counts (7 − 3), and 30 adds 9 and 21.",
        difficulty: "core",
        guideRef: "probability-scale",
        hints: [
          "{{3/7}} of the bag is 9 counters. What is {{1/7}} of the bag?",
          "How many counters are there altogether?",
          "Subtract the blue ones.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "probability-m3-q08",
        question:
          "Aisha, Ravi, Zara and Jun stand in a row for a photo. How many different orders are possible?",
        options: ["4", "16", "24", "10"],
        answerIndex: 2,
        explanation:
          "Any of the 4 people could stand first, then 3 are left for second place, 2 for third and 1 for last: 4 × 3 × 2 × 1 = 24. 16 = 4 × 4 lets the same person stand in two places at once. 10 adds 4 + 3 + 2 + 1 instead of multiplying, and 4 only counts who stands first.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "How many choices are there for the first position?",
          "After that person is placed, how many choices for the second?",
          "Multiply the choices for every position.",
        ],
        strategy: "Use the product rule",
      },
      {
        kind: "mcq",
        id: "probability-m3-q09",
        question:
          "Spinner 1 is numbered 1, 2, 3 and spinner 2 is numbered 2, 4, 6. Both are fair. They are spun and the scores are added. What is P(total greater than 6)?",
        options: ["{{3/7}}", "{{5/9}}", "{{2/3}}", "{{4/9}}"],
        answerIndex: 3,
        explanation:
          "The 3 × 3 grid has 9 equally likely totals: 3, 5, 7 / 4, 6, 8 / 5, 7, 9. Four are greater than 6 (7, 8, 7, 9), so P = {{4/9}}. {{5/9}} also counts the 6, but 6 is not *greater than* 6. {{3/7}} lists the 7 different totals (3 to 9) as if they were equally likely, but some totals happen in more ways. {{2/3}} divides by 3 + 3 = 6 outcomes instead of 3 × 3 = 9.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "Draw a 3 by 3 sample space grid of totals.",
          "How many cells are there? Are they equally likely?",
          "Count the cells showing more than 6.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m3-q10",
        question:
          "Year 8 students chose their favourite fruit.\n\n| | Mango | Durian | Rambutan | Total |\n|---|---|---|---|---|\n| 8A | 9 | 7 | 4 | 20 |\n| 8B | 6 | 10 | 8 | 24 |\n| Total | 15 | 17 | 12 | 44 |\n\nOne of the students who chose **durian** is picked at random. What is the probability that this student is in 8B?",
        options: ["{{5/22}}", "{{10/17}}", "{{5/12}}", "{{17/44}}"],
        answerIndex: 1,
        explanation:
          "You're choosing only from the 17 durian fans, and 10 of them are in 8B, so P = {{10/17}}. {{5/22}} (that is, {{10/44}}) divides by everyone, but the student is picked from the durian column only. {{5/12}} (that is, {{10/24}}) divides by the 8B total instead. {{17/44}} is P(a random student chose durian).",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Who is being chosen from — the whole year, 8B, or the durian fans?",
          "Find the total for that group.",
          "How many of that group are in 8B?",
        ],
        strategy: "Read the table carefully",
      },
      {
        kind: "mcq",
        id: "probability-m3-q11",
        question:
          "Two fair six-sided dice are rolled. What is the probability that the **difference** between the two scores is 2?",
        options: ["{{1/9}}", "{{1/6}}", "{{2/9}}", "{{4/21}}"],
        answerIndex: 2,
        explanation:
          "Pairs with a difference of 2 are (1, 3), (2, 4), (3, 5), (4, 6) and the reverse of each: 8 of the 36 outcomes, so P = {{8/36}} = {{2/9}}. {{1/9}} (that is, {{4/36}}) forgets the reversed pairs such as (3, 1). {{1/6}} assumes the six differences 0 to 5 are equally likely — they aren't. {{4/21}} counts 4 out of 21 \"unordered\" pairs, which are not equally likely.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "Draw a 6 by 6 grid of differences (bigger score minus smaller score).",
          "Count the cells showing 2 — on both sides of the diagonal.",
          "Divide by 36.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m3-q12",
        question:
          "Ravi rolls a dice 6 times and never gets a 6. He says: \"A fair dice should give one 6 in every 6 rolls, so this dice must be biased.\" What is his mistake?",
        options: [
          "6 rolls is far too few — in short runs, results often differ a lot from what theory predicts",
          "There's no mistake — 0 sixes is not the 1 six he expected",
          "He should have counted 1s instead, because 6 is the hardest number to roll",
          "There's no mistake — and the next roll is now very likely to be a 6",
        ],
        answerIndex: 0,
        explanation:
          "Expected numbers describe the long run. With a fair dice, P(no 6 in 6 rolls) = {{(5/6)^6}}, which is about 0.33 — it happens roughly one time in three, so it's no evidence of bias. To test fairness, Ravi needs hundreds of rolls. Expecting exactly 1 six treats an expected number as a guarantee. On a fair dice every face, 6 included, is equally likely, and the dice has no memory, so a 6 isn't \"due\" either.",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "Is it unusual for a fair dice to miss a 6 in 6 rolls?",
          "Does \"expect 1\" mean \"always get exactly 1\"?",
          "How many rolls would give convincing evidence?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "probability-m3-q13",
        question:
          "At a school fair, a spinner lands on \"Free drink\" with probability 0.08. It is spun 250 times during the day. How many free drinks should the organisers expect to give away?",
        options: ["8", "20", "200", "230"],
        answerIndex: 1,
        explanation:
          "Expected number = 0.08 × 250 = 20 (0.08 × 100 = 8, and 250 is 2.5 lots of 100). 8 is the number per 100 spins, not per 250. 200 treats 0.08 as 0.8. 230 is the expected number of spins that do *not* give a free drink.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "Expected number = probability × number of spins.",
          "What is 0.08 × 100?",
          "Scale up from 100 spins to 250 spins.",
        ],
        strategy: "Expected = probability × trials",
      },
      {
        kind: "mcq",
        id: "probability-m3-q14",
        question:
          "On a Sentosa trip, 40 students recorded whether they visited Universal Studios and whether they visited the S.E.A. Aquarium. The Venn diagram shows the results. A student is chosen at random. What is the probability that they visited the Aquarium but **not** Universal Studios?",
        diagram: vennSentosa,
        options: ["{{19/40}}", "{{1/5}}", "{{11/19}}", "{{11/40}}"],
        answerIndex: 3,
        explanation:
          "\"Aquarium but not Universal Studios\" is the part of the Aquarium circle outside the overlap: 11 students out of 40, so P = {{11/40}}. {{19/40}} counts the whole Aquarium circle, including the 8 who visited both. {{1/5}} (that is, {{8/40}}) is the overlap, and {{11/19}} divides by the Aquarium visitors instead of all 40 students.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Shade the region \"Aquarium AND NOT Universal Studios\".",
          "Which number is in that region?",
          "Divide by the total number of students.",
        ],
        strategy: "Read the diagram",
      },
      {
        kind: "mcq",
        id: "probability-m3-q15",
        question:
          "Two fair spinners are each numbered 1, 2, 3, 4. Both are spun and the scores are added. Which total is the most likely?",
        options: ["5", "8", "4", "All totals are equally likely"],
        answerIndex: 0,
        explanation:
          "In the 4 by 4 grid, a total of 5 comes from (1, 4), (2, 3), (3, 2) and (4, 1): 4 ways out of 16. Totals of 4 and 6 have 3 ways each, while 8 has only 1 way, (4, 4). So the totals 2 to 8 are not equally likely — the middle total can be made in the most ways, just like 7 with two dice.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "Draw the 4 by 4 grid of totals.",
          "Which total appears in the most cells?",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m3-q16",
        question:
          "A fair six-sided dice is rolled 120 times. How many **more** even numbers than sixes would you expect?",
        options: ["60", "20", "40", "80"],
        answerIndex: 2,
        explanation:
          "Expected even numbers: {{1/2}} × 120 = 60. Expected sixes: {{1/6}} × 120 = 20. Difference: 60 − 20 = 40. 60 and 20 are each only one half of the comparison. 80 = {{2/3}} × 120 comes from adding {{1/2 + 1/6}} instead of subtracting.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "Work out the expected number of even scores.",
          "Work out the expected number of sixes.",
          "Subtract.",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "mcq",
        id: "probability-m3-q17",
        question:
          "E and F are two events for the same spin of a spinner, with P(E) = 0.6 and P(F) = 0.5. Is this statement always, sometimes or never true?\n\n> E and F are mutually exclusive.",
        options: [
          "Always true — E and F are different events",
          "Sometimes true — it depends on what E and F are",
          "Sometimes true — only if the spinner is fair",
          "Never true — the probabilities would add to more than 1",
        ],
        answerIndex: 3,
        explanation:
          "If E and F could never happen together, P(E or F) would be 0.6 + 0.5 = 1.1 — impossible, since no probability is more than 1. So they must overlap: at least 0.1 of the probability is \"both\". That's true whatever E and F are, so the statement is never true. \"Different events\" isn't enough — \"even\" and \"greater than 3\" are different events on a dice but share 4 and 6. Fairness has nothing to do with it.",
        difficulty: "challenge",
        guideRef: "complementary-events",
        hints: [
          "If E and F were mutually exclusive, what would P(E or F) be?",
          "Add 0.6 and 0.5. Is that possible for a probability?",
          "What does that tell you about the overlap?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "probability-m3-q18",
        question:
          "A group of 50 students includes 28 girls. 30 of the students own a bicycle, and 12 of the bicycle owners are boys. One student is chosen at random. What is the probability that they are a girl who does **not** own a bicycle?",
        options: ["{{5/14}}", "{{1/5}}", "{{2/5}}", "{{8/25}}"],
        answerIndex: 1,
        explanation:
          "Build a two-way table. Girls with a bicycle = 30 − 12 = 18, so girls without = 28 − 18 = 10, giving P = {{10/50}} = {{1/5}}. {{5/14}} (that is, {{10/28}}) divides by the girls only, not all 50. {{2/5}} (that is, {{20/50}}) is everyone without a bicycle, boys included. {{8/25}} (that is, {{16/50}}) comes from 28 − 12, subtracting the *boys'* bicycles from the girls.",
        difficulty: "challenge",
        guideRef: "two-way-tables-venn",
        hints: [
          "Draw a two-way table: girl/boy against bicycle/no bicycle.",
          "How many girls own a bicycle?",
          "Girls without a bicycle = girls − girls with a bicycle.",
        ],
        strategy: "Fill in a two-way table",
      },
      {
        kind: "mcq",
        id: "probability-m3-q19",
        question:
          "A bag contains red and blue counters only, and P(red) = {{2/5}}. Jun adds 6 more red counters, and now P(red) = {{1/2}}. How many counters were in the bag **before** Jun added any?",
        options: ["30", "12", "36", "60"],
        answerIndex: 0,
        explanation:
          "Write the counts as 2n red and 3n blue (5n in total). Adding 6 red gives 2n + 6 red, and P(red) = {{1/2}} means red = blue: 2n + 6 = 3n, so n = 6. Before: 30 counters (12 red, 18 blue). Check: 18 red out of 36 is {{1/2}}. 12 is the original number of red counters, and 36 is the total *after* adding. 60 comes from saying the probability rose by {{1/10}}, so 6 counters must be {{1/10}} of the bag — but adding counters changes the total too.",
        difficulty: "challenge",
        guideRef: "probability-scale",
        hints: [
          "The blue counters don't change. Since P(blue) = {{3/5}} at the start, try writing the counts as 2n red and 3n blue.",
          "After adding 6 red, P(red) = {{1/2}}. What does that tell you about the numbers of red and blue?",
          "Solve 2n + 6 = 3n.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "probability-m3-q20",
        question:
          "A biased coin has P(heads) = 0.6. It is flipped twice, and the tree diagram shows the probabilities. What is the probability of getting **exactly one** head?",
        diagram: treeBiasedCoin,
        options: ["0.24", "0.36", "0.48", "0.16"],
        answerIndex: 2,
        explanation:
          "Exactly one head can happen two ways: HT (0.6 × 0.4 = 0.24) or TH (0.4 × 0.6 = 0.24). Add the two paths: 0.24 + 0.24 = 0.48. 0.24 counts only one of the two orders. 0.36 is P(HH), and 0.16 is P(TT).",
        difficulty: "challenge",
        guideRef: "tree-diagrams",
        hints: [
          "Which paths through the tree give exactly one head?",
          "Multiply along each of those paths.",
          "Add the results for the paths you need.",
        ],
        strategy: "Draw a tree diagram",
      },
    ],
  },

  // ======================================================================
  // MCQ Paper 4
  // ======================================================================
  {
    id: "probability-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "probability-m4-q01",
        question:
          "Wei Ling picks one letter at random from the word SINGAPORE. What is the probability that it is a vowel?",
        options: ["{{4/9}}", "{{5/9}}", "{{2/13}}", "{{4/5}}"],
        answerIndex: 0,
        explanation:
          "SINGAPORE has 9 letters and 4 vowels (I, A, O, E), so P(vowel) = {{4/9}}. {{5/9}} is P(consonant). {{2/13}} (that is, {{4/26}}) divides by the 26 letters of the alphabet, but she only picks from the 9 letters in the word. {{4/5}} compares vowels with consonants (4 to 5) — a ratio, not a probability.",
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["Count the letters in the word, then count the vowels."],
        strategy: "Count equally likely outcomes",
      },
      {
        kind: "mcq",
        id: "probability-m4-q02",
        question:
          "A fair six-sided dice is rolled once. Which pair of events are **complementary** (exactly one of them must happen)?",
        options: [
          "Rolling a 1 and rolling a 6",
          "Rolling less than 3 and rolling more than 3",
          "Rolling an odd number and rolling an even number",
          "Rolling a prime number and rolling an even number",
        ],
        answerIndex: 2,
        explanation:
          "Every score is either odd (1, 3, 5) or even (2, 4, 6), never both, so exactly one of these happens: P(odd) + P(even) = {{1/2 + 1/2}} = 1. \"Less than 3\" and \"more than 3\" both miss a roll of 3. A 1 and a 6 don't cover 2 to 5. Prime and even overlap at 2, and neither includes 1.",
        difficulty: "warmup",
        guideRef: "complementary-events",
        hints: ["Complementary events can't overlap AND must cover every possible score."],
        strategy: "Check every outcome",
      },
      {
        kind: "mcq",
        id: "probability-m4-q03",
        question:
          "Jun has three number cards: 3, 5 and 8. He makes two-digit numbers using two different cards, such as 35. How many different two-digit numbers can he make?",
        options: ["3", "6", "9", "5"],
        answerIndex: 1,
        explanation:
          "List systematically by first digit: 35, 38, 53, 58, 83, 85 — that's 6 (3 choices for the tens digit × 2 left for the units). 3 counts pairs of cards but ignores order, yet 35 and 53 are different numbers. 9 allows the same card twice (33, 55, 88). 5 usually means one was missed — that's why a systematic list matters.",
        difficulty: "warmup",
        guideRef: "sample-spaces",
        hints: ["List all the numbers starting with 3, then all starting with 5, then all starting with 8."],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m4-q04",
        question:
          "The probability that a randomly chosen student at Zara's school wears glasses is {{2/7}}. What is the probability that a randomly chosen student does **not** wear glasses?",
        options: ["{{7/2}}", "{{-2/7}}", "{{1/2}}", "{{5/7}}"],
        answerIndex: 3,
        explanation:
          "P(no glasses) = 1 − {{2/7}} = {{7/7 - 2/7}} = {{5/7}}. {{7/2}} flips the fraction, and {{-2/7}} just puts a minus sign in front — neither is between 0 and 1, so neither can be a probability. {{1/2}} assumes \"glasses\" and \"no glasses\" are equally likely.",
        difficulty: "warmup",
        guideRef: "complementary-events",
        hints: ["P(not happening) = 1 − P(happening). How many sevenths make 1?"],
        strategy: "Use the complement",
      },
      {
        kind: "mcq",
        id: "probability-m4-q05",
        question:
          "Zara has no coin, so she wants to use a fair six-sided dice to simulate flipping a fair coin. Which method works?",
        options: [
          "1 means heads; 2, 3, 4, 5 or 6 means tails",
          "1, 2, 3 or 4 means heads; 5 or 6 means tails",
          "1, 2 or 3 means heads; 4, 5 or 6 means tails",
          "1, 2 or 3 means heads; 3, 4, 5 or 6 means tails",
        ],
        answerIndex: 2,
        explanation:
          "A fair coin needs P(heads) = P(tails) = {{1/2}}. Using 1 to 3 for heads and 4 to 6 for tails gives {{3/6}} = {{1/2}} each. \"1 means heads\" gives P(heads) of only {{1/6}}, and \"1 to 4 means heads\" gives {{4/6}} = {{2/3}}. The method where 3 appears on both lists gives a roll of 3 two results at once — each roll must give exactly one result.",
        difficulty: "warmup",
        guideRef: "relative-frequency",
        hints: ["What probability must heads have? How many dice faces is that?"],
        strategy: "Use equally likely outcomes",
      },
      {
        kind: "mcq",
        id: "probability-m4-q06",
        question:
          "The two-way table shows the CCA choices of 60 Year 8 students.\n\n| | Sport | Arts | Uniformed | Total |\n|---|---|---|---|---|\n| Boys | 14 | 6 | 10 | 30 |\n| Girls | 11 | 12 | 7 | 30 |\n| Total | 25 | 18 | 17 | 60 |\n\nOne of the 60 students is chosen at random. Which statement is true?",
        options: [
          "P(the student does Sport) = {{14/25}}",
          "The student is more likely to be a girl in Arts than a boy in a Uniformed group",
          "P(the student is a boy in Arts) = {{6/30}}",
          "A randomly chosen girl is more likely to do Sport than a randomly chosen boy",
        ],
        answerIndex: 1,
        explanation:
          "Girl in Arts: {{12/60}}; boy in a Uniformed group: {{10/60}}. Since 12 > 10, that statement is true. P(Sport) is {{25/60}}, not {{14/25}} — that fraction is the share of Sport students who are boys. P(boy in Arts) = {{6/60}}; {{6/30}} wrongly divides by the boys' total. A girl does Sport with probability {{11/30}} and a boy with {{14/30}}, so boys are more likely, not girls.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "For each statement, decide which group you're choosing from.",
          "When choosing from all 60 students, divide by 60.",
          "Check each statement against the actual numbers.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "probability-m4-q07",
        question:
          "A six-sided dice is biased. The table shows the probability of each score.\n\n| Score | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Probability | 0.1 | 0.15 | 0.2 | 0.15 | {{x}} | 0.25 |\n\nWhat is the probability of scoring 5 or more?",
        options: ["0.15", "0.25", "{{1/3}}", "0.4"],
        answerIndex: 3,
        explanation:
          "The scores are mutually exclusive and cover everything, so 0.1 + 0.15 + 0.2 + 0.15 + {{x}} + 0.25 = 1, giving {{0.85 + x = 1}} and {{x = 0.15}}. Then P(5 or 6) = 0.15 + 0.25 = 0.4. 0.15 stops after finding {{x}}, and 0.25 is P(6) alone. {{1/3}} would be right for a *fair* dice, but this one is biased.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "First find {{x}}: what must all six probabilities add up to?",
          "\"5 or more\" means scoring 5 or 6.",
          "Add P(5) and P(6).",
        ],
        strategy: "Use the fact that probabilities sum to 1",
      },
      {
        kind: "mcq",
        id: "probability-m4-q08",
        question:
          "A school makes passwords from two letters followed by one digit, such as AB7 or CC0. The letters must be A, B or C (they may repeat) and the digit can be any of 0 to 9. How many different passwords are possible?",
        options: ["90", "16", "60", "30"],
        answerIndex: 0,
        explanation:
          "Product rule: 3 choices for the first letter × 3 for the second × 10 for the digit = 90. 16 adds 3 + 3 + 10 instead of multiplying. 60 = 3 × 2 × 10 wrongly stops the letters repeating, and 30 forgets the second letter.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "How many choices are there for each of the three positions?",
          "Letters may repeat, so the second letter has as many choices as the first.",
          "Multiply the numbers of choices.",
        ],
        strategy: "Use the product rule",
      },
      {
        kind: "mcq",
        id: "probability-m4-q09",
        question:
          "Hana spins two fair spinners, each numbered 1, 2, 3, and records the **larger** of the two scores (if they are equal, she records that number). How many of the 9 outcomes give a recorded score of 3?",
        options: ["3", "4", "5", "6"],
        answerIndex: 2,
        explanation:
          "The outcomes with a 3 on at least one spinner are (1, 3), (2, 3), (3, 3), (3, 1) and (3, 2) — 5 of the 9. 4 forgets (3, 3). 3 only lists the pairs where the first spinner shows 3. 6 counts (3, 3) twice — once for each spinner.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "Draw a 3 by 3 grid and write the larger score in each cell.",
          "Count the cells showing 3 — check the corner where both spinners show 3.",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "mcq",
        id: "probability-m4-q10",
        question:
          "Spinner X has three equal sections numbered 1, 1 and 2. Spinner Y has two equal sections numbered 1 and 2. Both are spun and the scores are added. What is the probability that the total is 2?",
        diagram: twoSpinners,
        options: ["{{1/3}}", "{{1/4}}", "{{1/6}}", "{{7/6}}"],
        answerIndex: 0,
        explanation:
          "Treat X's three sections as different: they combine with Y's two sections to give 3 × 2 = 6 equally likely outcomes. A total of 2 needs 1 + 1, which happens in 2 of them (either \"1\" section on X with 1 on Y), so P = {{2/6}} = {{1/3}}. {{1/4}} lists X as just \"1 or 2\", but X lands on 1 twice as often as on 2. {{1/6}} counts only one of the two \"1\" sections. {{7/6}} adds {{2/3 + 1/2}} instead of multiplying.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "Is spinner X equally likely to show 1 or 2?",
          "Label X's sections 1a, 1b and 2, then list all 6 outcomes with spinner Y.",
          "Count the outcomes where the total is 2.",
        ],
        strategy: "Make a systematic list",
      },
      {
        kind: "mcq",
        id: "probability-m4-q11",
        question:
          "Priya spins a spinner with four colours (it may not be fair). After every 10 spins she works out the relative frequency of red so far, and plots it on the graph. What is the best estimate of P(red)?",
        diagram: rfGraph,
        options: ["0.6", "0.3", "0.25", "0.36"],
        answerIndex: 1,
        explanation:
          "As the number of spins grows, the relative frequency settles down at about 0.3, and the last point uses all 100 spins, so 0.3 is the best estimate. 0.6 is the value after only 10 spins — the least reliable point. 0.25 assumes the four colours are equally likely, which the data doesn't support. 0.36 is the mean of the plotted points, which gives the early, unreliable points too much weight.",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "Which point on the graph is based on the most spins?",
          "What value does the line seem to settle towards?",
        ],
        strategy: "Read the diagram",
      },
      {
        kind: "mcq",
        id: "probability-m4-q12",
        question:
          "A fair spinner with five equal sections, numbered 1 to 5, is spun 200 times.\n\n| Score | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Frequency | 37 | 46 | 41 | 29 | 47 |\n\nHow does the frequency of score 4 compare with the number you would expect?",
        options: ["21 fewer than expected", "18 fewer than expected", "171 fewer than expected", "11 fewer than expected"],
        answerIndex: 3,
        explanation:
          "With 5 equally likely scores, the expected frequency is {{1/5}} × 200 = 40. Score 4 came up 29 times: 40 − 29 = 11 fewer. \"21 fewer\" uses an expected 50, dividing 200 by 4 instead of 5. \"18 fewer\" compares with the highest frequency (47), not the expected one, and \"171 fewer\" compares with all 200 spins. On its own, a gap like 11 in 200 spins doesn't prove the spinner is unfair.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "What is the probability of scoring 4 on a fair five-section spinner?",
          "Expected frequency = probability × 200.",
          "Compare 29 with that expected frequency.",
        ],
        strategy: "Compare with what you'd expect",
      },
      {
        kind: "mcq",
        id: "probability-m4-q13",
        question:
          "A bag contains 20 counters, each red or white. Zara takes a counter at random, notes its colour and puts it back. She does this 50 times and gets red 31 times. What is the best estimate of the number of red counters in the bag?",
        options: ["31", "8", "12", "10"],
        answerIndex: 2,
        explanation:
          "The relative frequency of red is {{31/50}} = 0.62, so about 0.62 × 20 = 12.4, roughly 12, of the 20 counters are red. 31 is the number of red *draws*, not counters — it's more than the 20 counters in the bag! 8 is the estimate for white counters, and 10 assumes the colours are equally likely, ignoring the evidence.",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "Estimate P(red) from the experiment.",
          "If P(red) is about 0.62, roughly what fraction of the 20 counters are red?",
          "Multiply 0.62 by 20 and round.",
        ],
        strategy: "Estimate the probability, then multiply",
      },
      {
        kind: "mcq",
        id: "probability-m4-q14",
        question:
          "Ravi says: \"There are 11 possible totals when you roll two dice (2 to 12), so the probability of a total of 12 is {{1/11}}.\" What is the correct probability of a total of 12?",
        options: ["{{1/36}}", "{{1/11}}", "{{1/12}}", "{{1/3}}"],
        answerIndex: 0,
        explanation:
          "The 36 outcomes of two dice are equally likely, but the 11 totals are not: 12 happens only as (6, 6), while 7 happens 6 ways. So P(12) = {{1/36}}. Ravi's {{1/11}} treats the totals as equally likely. {{1/12}} uses 12 \"totals\" from 1 to 12, but a total of 1 is impossible. {{1/3}} adds {{1/6 + 1/6}}.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "Are the totals 2, 3, …, 12 equally likely? Compare the ways to make 2 with the ways to make 7.",
          "Use the 36 equally likely outcomes instead.",
          "How many of those outcomes give 12?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "probability-m4-q15",
        question:
          "The Venn diagram sorts the whole numbers from 1 to 20 into \"Even\" and \"Multiple of 3\". One of these numbers is chosen at random. What is the probability that it is even **or** a multiple of 3 (or both)?",
        diagram: vennNumbers,
        options: ["{{4/5}}", "{{3/20}}", "{{7/20}}", "{{13/20}}"],
        answerIndex: 3,
        explanation:
          "Count every number inside either circle: 7 even-only + 3 in both + 3 multiple-of-3-only = 13, so P = {{13/20}}. {{4/5}} (that is, {{16/20}}) adds the 10 even numbers and the 6 multiples of 3, counting 6, 12 and 18 twice. {{3/20}} is \"even **and** a multiple of 3\" — only the overlap. {{7/20}} is the numbers outside both circles.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "\"Or\" means inside at least one of the circles.",
          "Add the three regions inside the circles — don't count the overlap twice.",
          "Divide by 20.",
        ],
        strategy: "Read the diagram",
      },
      {
        kind: "mcq",
        id: "probability-m4-q16",
        question:
          "The probability that Mei's MRT train is on time is 0.9 each day, independently of other days. What is the probability that it is on time on **both** Monday and Tuesday?",
        options: ["1.8", "0.81", "0.9", "0.09"],
        answerIndex: 1,
        explanation:
          "For independent events, multiply along the branches: 0.9 × 0.9 = 0.81. 1.8 adds the probabilities — it's more than 1, so it can't be a probability. 0.9 forgets that Tuesday's train must also be on time. 0.09 = 0.9 × 0.1 is the probability of on time on Monday and late on Tuesday.",
        difficulty: "core",
        guideRef: "tree-diagrams",
        hints: [
          "Draw a tree diagram: Monday first, then Tuesday.",
          "Follow the \"on time\" branch twice.",
          "Multiply the probabilities along that path.",
        ],
        strategy: "Draw a tree diagram",
      },
      {
        kind: "mcq",
        id: "probability-m4-q17",
        question:
          "Aisha and Jun test the same fair spinner, which has 10 equal sections, 3 of them red. Aisha spins it 10 times and Jun spins it 100 times. Is this statement always, sometimes or never true?\n\n> Jun's relative frequency of red will be closer to 0.3 than Aisha's.",
        options: [
          "Always true — more trials always give a closer result",
          "Never true — every experiment is equally reliable",
          "Sometimes true — it is usually true, but by chance Aisha could get closer",
          "Never true — a small experiment is more accurate because there is less chance of mistakes",
        ],
        answerIndex: 2,
        explanation:
          "More trials make a close result more *likely*, not certain. Aisha might, by luck, get exactly 3 reds in 10 spins — a relative frequency of exactly 0.3 — while Jun gets 27 reds in 100, which is 0.27. Over many repeats, though, 100 spins land near 0.3 far more often, so the statement is sometimes (usually) true. \"Always\" confuses \"more reliable\" with \"guaranteed\". Both \"never\" statements get the trend backwards.",
        difficulty: "challenge",
        guideRef: "relative-frequency",
        hints: [
          "Does \"more trials\" guarantee a better estimate, or just make one more likely?",
          "Could Aisha, by luck, get exactly 3 reds in her 10 spins?",
          "Compare that with Jun getting, say, 27 reds in 100 spins.",
        ],
        strategy: "Try a specific example",
      },
      {
        kind: "mcq",
        id: "probability-m4-q18",
        question:
          "At a school fair game, each go costs $1. You roll a fair six-sided dice and, if you roll a 6, you get a prize of $5. Siti plays 60 times. What is her expected overall result?",
        options: ["She loses $10", "She breaks even ($0)", "She wins $50", "She loses $50"],
        answerIndex: 0,
        explanation:
          "Expected wins = {{1/6}} × 60 = 10, so the expected prize money is 10 × $5 = $50. She pays 60 × $1 = $60 to play, so overall she expects to lose $60 − $50 = $10. \"Breaks even\" only charges her for the 50 losing goes, but every go costs $1, win or lose. \"Wins $50\" forgets the cost of playing, and \"loses $50\" counts the 50 losing goes but ignores the prizes.",
        difficulty: "challenge",
        guideRef: "expected-outcomes",
        hints: [
          "How many 6s would Siti expect in 60 goes?",
          "How much prize money is that? How much does she pay to play 60 times?",
          "Compare the money in with the money out.",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "mcq",
        id: "probability-m4-q19",
        question:
          "The Venn diagram shows the 40 students in a year group who are in the choir, the band, both or neither. One student is chosen at random. What is the probability that they are in the band?",
        diagram: vennChoirBand,
        options: ["{{2/5}}", "{{1/5}}", "{{29/40}}", "{{21/40}}"],
        answerIndex: 3,
        explanation:
          "All 40 students are in the diagram, so {{x + 5 + 2x + 11 = 40}}, which gives {{3x + 16 = 40}} and {{x = 8}}. The band circle holds {{2x + 5}} = 16 + 5 = 21 students, so P = {{21/40}}. {{2/5}} (that is, {{16/40}}) forgets the 5 who are in both. {{1/5}} (that is, {{8/40}}) uses the value of {{x}} itself, and {{29/40}} counts everyone in either circle (8 + 5 + 16).",
        difficulty: "challenge",
        guideRef: "two-way-tables-venn",
        hints: [
          "All the regions together must make 40. Write an equation.",
          "Solve {{3x + 16 = 40}}.",
          "Which regions are inside the band circle?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "probability-m4-q20",
        question:
          "A bag contains only red and blue counters, with 6 more blue counters than red. A counter is taken at random and replaced, 200 times. The expected number of reds is 75. How many counters are in the bag?",
        options: ["8", "24", "200", "15"],
        answerIndex: 1,
        explanation:
          "Expected reds = P(red) × 200 = 75, so P(red) = {{75/200}} = {{3/8}}. So red : blue = 3 : 5, and the difference of 2 parts is 6 counters, making 1 part = 3. Red = 9, blue = 15, total 24. Check: {{9/24 = 3/8}}, and {{3/8}} × 200 = 75. 8 is just the denominator of {{3/8}} — but then there'd be only 2 more blue than red. 200 is the number of draws, not counters, and 15 is the number of blue counters only.",
        difficulty: "challenge",
        guideRef: "expected-outcomes",
        hints: [
          "Work backwards: what must P(red) be if 75 reds are expected in 200 draws?",
          "Simplify {{75/200}}. What does it tell you about red : blue?",
          "The difference between the red and blue parts is 6 counters.",
        ],
        strategy: "Work backwards",
      },
    ],
  },
];
