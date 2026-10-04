import type { ExamPaper } from "../types.ts";

// Big Exam — Non-calculator Paper 1.
// 30 questions, easier → harder: 8 warmup, 16 core, 6 challenge.
// Kinds: 6 MCQ, 20 short (auto-marked), 4 written. All 20 topics covered.

export const paper: ExamPaper = {
  id: "exam-n1",
  title: "Non-calculator Paper 1",
  calculator: false,
  minutes: 60,
  questions: [
    // ======================= WARM-UP (q01–q08) =======================
    {
      kind: "short",
      id: "exam-n1-q01",
      topicId: "integers-powers",
      guideRef: "order-of-operations",
      difficulty: "warmup",
      question: "Work out {{7 - 2 * (-3)^2}}.",
      answer: { type: "number", value: -11 },
      hints: [
        "Which comes first here: the power, the multiplication or the subtraction?",
        "{{(-3)^2}} means (−3) × (−3). Is that positive or negative?",
      ],
      solution: [
        "Powers first: {{(-3)^2 = (-3) * (-3) = 9}}.",
        "Then multiply: 2 × 9 = 18.",
        "Subtract last: 7 − 18 = −11.",
      ],
      traps: [
        { spec: { type: "number", value: 45 }, feedback: "You worked from left to right: (7 − 2) × 9. The power comes first, then the multiplication, and the subtraction comes last." },
        { spec: { type: "number", value: 25 }, feedback: "{{(-3)^2}} is +9, not −9: a negative times a negative is positive." },
        { spec: { type: "number", value: -29 }, feedback: "The square belongs only to the (−3). You squared 2 × (−3) = −6 instead." },
      ],
      commonError: "Working left to right and getting (7 − 2) × 9 = 45.",
    },
    {
      kind: "mcq",
      id: "exam-n1-q02",
      topicId: "standard-form",
      guideRef: "large-numbers",
      difficulty: "warmup",
      question: "In 2024 the population of Singapore was about 6 040 000. Which of these is 6 040 000 written in standard form?",
      options: ["{{6.04 * 10^5}}", "{{60.4 * 10^5}}", "{{6.04 * 10^6}}", "{{6.04 * 10^7}}"],
      answerIndex: 2,
      explanation:
        "6 040 000 = 6.04 × 1 000 000, and 1 000 000 = {{10^6}}, so the answer is {{6.04 * 10^6}}: the decimal point moves 6 places. {{60.4 * 10^5}} has the right value but is not standard form, because the first number must be at least 1 and less than 10. {{6.04 * 10^7}} comes from counting all seven digits instead of the places the point moves, and {{6.04 * 10^5}} is ten times too small.",
      hints: [
        "Standard form is A × {{10^n}} with A at least 1 and less than 10. What is A here?",
        "How many places must the point move to turn 6.04 into 6 040 000?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "exam-n1-q03",
      topicId: "fractions",
      guideRef: "adding-subtracting",
      difficulty: "warmup",
      question:
        "A nature-park trail is {{3 1/4}} km long. Aisha has walked {{1 2/3}} km of it. How far does she still have to walk? Give your answer in km as a mixed number in its simplest form.",
      answer: { type: "fraction", n: 19, d: 12, simplest: true, form: "mixed", display: "{{1 7/12}} km" },
      hints: [
        "Estimate first: about how much is 3.25 − 1.67?",
        "Use a common denominator. What is the LCM of 4 and 3?",
      ],
      solution: [
        "Estimate: 3.25 − 1.67 is about 1.6 km.",
        "Improper fractions: {{3 1/4 = 13/4}} and {{1 2/3 = 5/3}}.",
        "Twelfths: {{13/4 = 39/12}} and {{5/3 = 20/12}}.",
        "{{39/12 - 20/12 = 19/12 = 1 7/12}} km, which matches the estimate.",
      ],
      solutions: [
        {
          label: "Whole numbers first (with borrowing)",
          steps: [
            "{{3 1/4 - 1 = 2 1/4}}.",
            "Now take away {{2/3}}. In twelfths, {{2 1/4 = 2 3/12}}, but {{8/12}} is more than {{3/12}}, so borrow 1: {{2 3/12 = 1 15/12}}.",
            "{{1 15/12 - 8/12 = 1 7/12}}.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 29, d: 12 },
          feedback: "You worked out {{2/3 - 1/4}} instead of {{1/4 - 2/3}}. Since {{1/4}} is smaller than {{2/3}}, you need to borrow 1 from the whole number.",
        },
      ],
      commonError: "Subtracting the fractions the wrong way round to avoid a negative, giving {{2 5/12}}.",
      strategy: "Estimate first",
    },
    {
      kind: "short",
      id: "exam-n1-q04",
      topicId: "expressions",
      guideRef: "substitution",
      difficulty: "warmup",
      question: "Find the value of {{4p - q^2}} when p = 5 and q = −3.",
      answer: { type: "number", value: 11 },
      hints: [
        "Replace each letter by its value, keeping brackets round the negative: {{4 * 5 - (-3)^2}}.",
        "What is {{(-3)^2}}?",
      ],
      solution: ["{{4p = 4 * 5 = 20}}.", "{{q^2 = (-3)^2 = 9}}.", "20 − 9 = 11."],
      traps: [
        { spec: { type: "number", value: 29 }, feedback: "{{(-3)^2}} is +9, so you subtract 9. You treated it as −9." },
        { spec: { type: "number", value: 36 }, feedback: "4p means 4 × p = 20, not the two-digit number 45." },
      ],
      commonError: "Writing {{q^2}} as −9 when q = −3, which gives 20 − (−9) = 29.",
    },
    {
      kind: "short",
      id: "exam-n1-q05",
      topicId: "angles-polygons",
      guideRef: "angle-facts",
      difficulty: "warmup",
      question: "The diagram shows four angles around a point. Two of the angles are marked y. Work out the value of y.",
      diagram: `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four angles around a point: a right angle, an angle of 118 degrees and two equal angles marked y"><rect x="0" y="0" width="400" height="270" fill="#ffffff"/><line x1="200" y1="140" x2="310" y2="140" stroke="#1f2937" stroke-width="2.5"/><line x1="200" y1="140" x2="200" y2="30" stroke="#1f2937" stroke-width="2.5"/><line x1="200" y1="140" x2="102.9" y2="191.6" stroke="#1f2937" stroke-width="2.5"/><line x1="200" y1="140" x2="226.6" y2="246.7" stroke="#1f2937" stroke-width="2.5"/><path d="M 216 140 L 216 124 L 200 124" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M 200 114 A 26 26 0 0 0 177 152.2" fill="none" stroke="#4338ca" stroke-width="2"/><path d="M 173.5 154.1 A 30 30 0 0 0 207.3 169.1" fill="none" stroke="#b45309" stroke-width="2"/><path d="M 207.3 169.1 A 30 30 0 0 0 230 140" fill="none" stroke="#b45309" stroke-width="2"/><text x="157.1" y="119.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">118°</text><text x="178.8" y="192.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><tspan font-style="italic">y</tspan></text><text x="241" y="177" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><tspan font-style="italic">y</tspan></text><circle cx="200" cy="140" r="3" fill="#1f2937"/></svg>`,
      answer: { type: "number", value: 76, display: "y = 76" },
      hints: [
        "What do angles around a point add up to?",
        "The square corner shows a right angle. So 118 + 90 + 2y = ?",
      ],
      solution: [
        "Angles around a point add up to 360°.",
        "The square mark shows a right angle, 90°.",
        "118 + 90 + y + y = 360, so 2y = 360 − 208 = 152.",
        "y = 152 ÷ 2 = 76.",
      ],
      traps: [
        { spec: { type: "number", value: 152 }, feedback: "152° is both y angles together. Halve it." },
        { spec: { type: "number", value: 121 }, feedback: "Don't forget the right angle: the square corner is 90°." },
      ],
      commonError: "Ignoring the right-angle mark.",
    },
    {
      kind: "mcq",
      id: "exam-n1-q06",
      topicId: "statistics",
      guideRef: "data-and-sampling",
      difficulty: "warmup",
      question:
        "Ravi wants to find out how Year 8 students at his school usually travel to school. He will ask 30 of them. Which way of choosing the 30 students is most likely to give a fair (representative) sample?",
      options: [
        "Ask the first 30 Year 8 students who come out of the MRT station nearest the school",
        "Choose 30 names at random from the full Year 8 register",
        "Ask 30 Year 8 students waiting in the school bus queue",
        "Ask the 30 Year 8 students who live nearest to the school",
      ],
      answerIndex: 1,
      explanation:
        "Choosing names at random from the whole register gives every Year 8 student the same chance of being picked, however they travel. Each other plan shuts people out: the MRT exit only reaches MRT users, the bus queue only reaches bus users, and the students who live nearest are much more likely to walk or cycle. Each of those samples would over-represent one way of travelling.",
      hints: ["For each plan, which students could never be picked?", "A fair sample gives everyone in Year 8 the same chance of being chosen."],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "exam-n1-q07",
      topicId: "probability",
      guideRef: "complementary-events",
      difficulty: "warmup",
      question:
        "A weather app gives these probabilities for tomorrow afternoon in Singapore. Exactly one type of weather will be recorded.\n\n| Weather | Thunderstorm | Light rain | Cloudy but dry | Sunny |\n|---|---|---|---|---|\n| Probability | 0.45 | 0.2 | ? | 0.1 |\n\nWhat is the probability that tomorrow afternoon is cloudy but dry?",
      answer: { type: "number", value: 0.25 },
      hints: [
        "Exactly one of these outcomes will happen. What must the four probabilities add up to?",
        "Add the three probabilities you know, then subtract from 1.",
      ],
      solution: [
        "Exactly one outcome happens, so the four probabilities add up to 1.",
        "0.45 + 0.2 + 0.1 = 0.75.",
        "1 − 0.75 = 0.25.",
      ],
      traps: [
        { spec: { type: "number", value: 0.75 }, feedback: "0.75 is the total of the other three. The missing probability is what is left over from 1." },
        { spec: { type: "number", value: 25 }, feedback: "A probability is between 0 and 1. Write 25% as 0.25 or {{1/4}}." },
      ],
      commonError: "Giving the total of the known probabilities (0.75) instead of what is left over.",
    },
    {
      kind: "short",
      id: "exam-n1-q08",
      topicId: "percentages",
      guideRef: "percentage-of-amount",
      difficulty: "warmup",
      question:
        "The school orchestra's concert trip costs $260 per student. The school pays 35% of the cost. How much does the school pay for each student?",
      answer: { type: "number", value: 91, display: "$91" },
      hints: [
        "Find 10% first. How can you build 35% out of 10% and 5%?",
        "10% of $260 is $26. What are 30% and 5%?",
      ],
      solution: ["10% of $260 = $26.", "30% = 3 × $26 = $78.", "5% = half of 10% = $13.", "35% = $78 + $13 = $91."],
      solutions: [{ label: "Using 1%", steps: ["1% of $260 = $2.60.", "35% = 35 × $2.60 = $91."] }],
      traps: [
        { spec: { type: "number", value: 169 }, feedback: "$169 is the 65% that the student pays. The question asks for the school's 35%." },
        { spec: { type: "number", value: 225 }, feedback: "35% is not the same as $35. Find 35 hundredths of $260." },
      ],
      commonError: "Subtracting $35 instead of finding 35%.",
      strategy: "Make it simpler",
    },

    // ========================= CORE (q09–q24) ========================
    {
      kind: "short",
      id: "exam-n1-q09",
      topicId: "factors-multiples",
      guideRef: "hcf-lcm",
      difficulty: "core",
      question:
        "Two numbers are written as products of their prime factors:\n\nA = {{2^3 * 3^2 * 5}} and B = {{2^2 * 3^3 * 7}}.\n\nFind the highest common factor (HCF) and the lowest common multiple (LCM) of A and B. Write them as ordinary numbers separated by a comma: the HCF first, then the LCM.",
      answer: { type: "list", values: [36, 7560], ordered: true, display: "HCF = 36, LCM = 7560" },
      hints: [
        "For the HCF, which primes appear in both A and B?",
        "HCF: take the lower power of each shared prime. LCM: take the higher power of every prime that appears in either number.",
        "HCF = {{2^2 * 3^2}} and LCM = {{2^3 * 3^3 * 5 * 7}}.",
      ],
      solution: [
        "HCF: the shared primes are 2 and 3. Take the lower powers: {{2^2 * 3^2 = 4 * 9 = 36}}.",
        "LCM: take the higher power of every prime: {{2^3 * 3^3 * 5 * 7}}.",
        "{{2^3 * 3^3 = 8 * 27 = 216}}, and 216 × 35 = 7560.",
        "Check: A = 360 and B = 756, and HCF × LCM = 36 × 7560 = 272 160 = 360 × 756 ✓.",
      ],
      solutions: [
        {
          label: "Venn diagram of prime factors",
          steps: [
            "Overlap (shared): 2, 2, 3, 3. A only: 2, 5. B only: 3, 7.",
            "HCF = product of the overlap = 2 × 2 × 3 × 3 = 36.",
            "LCM = product of everything in the diagram = 36 × 2 × 5 × 3 × 7 = 7560.",
          ],
        },
      ],
      traps: [
        { spec: { type: "list", values: [7560, 36], ordered: true }, feedback: "Right numbers, wrong order: give the HCF (the smaller one) first, then the LCM." },
        { spec: { type: "list", values: [36, 272160], ordered: true }, feedback: "A × B counts the shared factors twice. The LCM uses the highest power of each prime once: {{2^3 * 3^3 * 5 * 7}}." },
      ],
      commonError: "Swapping the rules: using the highest powers for the HCF and the lowest for the LCM.",
      strategy: "Draw a diagram",
    },
    {
      kind: "mcq",
      id: "exam-n1-q10",
      topicId: "decimals-rounding",
      guideRef: "estimation",
      difficulty: "core",
      question: "By rounding each number to 1 significant figure, estimate the value of {{(48.7 * 0.21)/0.496}}.",
      options: ["5", "2", "200", "20"],
      answerIndex: 3,
      explanation:
        "Rounded, the calculation is {{(50 * 0.2)/0.5}}. 50 × 0.2 = 10, and 10 ÷ 0.5 = 20, because there are 20 halves in 10. 5 comes from halving 10, but dividing by 0.5 *doubles* a number. 2 comes from dividing by 5 instead of 0.5, and 200 comes from rounding 0.21 to 2 instead of 0.2.",
      hints: [
        "Round each number to 1 s.f.: 48.7 → ?, 0.21 → ?, 0.496 → ?",
        "Work out the top first. Then ask: how many halves are there in that number?",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "short",
      id: "exam-n1-q11",
      topicId: "fractions",
      guideRef: "dividing",
      difficulty: "core",
      question:
        "A jug holds {{4 1/2}} litres of sugarcane juice. The juice is poured into cups that each hold {{3/8}} of a litre. How many cups can be filled?",
      answer: { type: "number", value: 12, display: "12 cups" },
      hints: [
        "Make it simpler: how many half-litre cups would {{4 1/2}} litres fill? Which operation did you use?",
        "Write {{4 1/2}} as an improper fraction, then divide by {{3/8}}.",
        "Dividing by {{3/8}} is the same as multiplying by {{8/3}}.",
      ],
      solution: [
        "'How many cups fit?' is a division: {{4 1/2}} ÷ {{3/8}}.",
        "{{4 1/2 = 9/2}}.",
        "{{9/2}} ÷ {{3/8}} = {{9/2 * 8/3 = 72/6 = 12}}.",
        "12 cups.",
      ],
      solutions: [
        {
          label: "Common denominators",
          steps: ["{{4 1/2 = 36/8}} litres.", "How many lots of 3 eighths fit into 36 eighths? 36 ÷ 3 = 12."],
        },
      ],
      traps: [
        { spec: { type: "number", value: 1.6875 }, feedback: "You multiplied by {{3/8}}. 'How many cups can be filled?' means divide by {{3/8}}." },
      ],
      commonError: "Multiplying by {{3/8}} instead of dividing, or flipping the first fraction instead of the second.",
      strategy: "Make it simpler",
    },
    {
      kind: "mcq",
      id: "exam-n1-q12",
      topicId: "rates-units",
      guideRef: "area-volume-units",
      difficulty: "core",
      question: "A rectangular banner for Sports Day measures 250 cm by 140 cm. What is its area in square metres?",
      options: ["3.5 m²", "350 m²", "7.8 m²", "35 000 m²"],
      answerIndex: 0,
      explanation:
        "Convert first: 2.5 m × 1.4 m = 3.5 m². (Or 250 × 140 = 35 000 cm², and 1 m² = 100 cm × 100 cm = 10 000 cm², so 35 000 ÷ 10 000 = 3.5.) 350 m² comes from dividing by 100, as if 1 m² were only 100 cm². 7.8 m² is the perimeter in metres (2.5 + 1.4 + 2.5 + 1.4), not the area, and 35 000 m² forgets to convert at all.",
      hints: [
        "Change each length to metres before you multiply.",
        "How many cm² are in 1 m²? Picture a square 100 cm by 100 cm.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n1-q13",
      topicId: "ratio-proportion",
      guideRef: "scale-and-maps",
      difficulty: "core",
      question:
        "A map of Singapore has a scale of 1 : 25 000. On the map, the straight-line distance between two MRT stations is 8 cm. What is the real straight-line distance between the stations? Give your answer in kilometres.",
      answer: { type: "number", value: 2, display: "2 km" },
      hints: [
        "1 cm on the map stands for how many cm in real life?",
        "Find the real distance in cm first, then convert: 100 cm = 1 m and 1000 m = 1 km.",
        "8 × 25 000 = 200 000 cm.",
      ],
      solution: ["Real distance = 8 × 25 000 = 200 000 cm.", "200 000 cm ÷ 100 = 2000 m.", "2000 m ÷ 1000 = 2 km."],
      traps: [
        { spec: { type: "number", value: 20 }, feedback: "Check your conversion: 1 km = 1000 m = 100 000 cm, so 200 000 cm = 2 km." },
        { spec: { type: "number", value: 2000 }, feedback: "2000 is the distance in metres. The question asks for kilometres." },
        { spec: { type: "number", value: 200 }, feedback: "There are 100 000 cm in a kilometre, not 1000. Go cm → m → km." },
      ],
      commonError: "Dividing by 1000 to change cm to km. There are 100 000 cm in 1 km.",
    },
    {
      kind: "short",
      id: "exam-n1-q14",
      topicId: "equations",
      guideRef: "fractional-equations",
      difficulty: "core",
      question: "Solve {{(3x + 1)/4 = x - 2}}.",
      answer: { type: "number", value: 9, display: "x = 9" },
      hints: [
        "How can you get rid of the fraction?",
        "Multiply **both whole sides** by 4.",
        "3x + 1 = 4x − 8. Now collect the x terms on the side with more x.",
      ],
      solution: [
        "Multiply both sides by 4: 3x + 1 = 4(x − 2) = 4x − 8.",
        "Subtract 3x from both sides: 1 = x − 8.",
        "Add 8 to both sides: x = 9.",
        "Check: {{(27 + 1)/4 = 7}} and 9 − 2 = 7 ✓.",
      ],
      traps: [
        { spec: { type: "number", value: -4.5 }, feedback: "You didn't multiply the right-hand side by 4. Both sides must be multiplied: 4(x − 2) = 4x − 8." },
        { spec: { type: "number", value: 3 }, feedback: "4(x − 2) is 4x − 8, not 4x − 2. Multiply every term in the bracket." },
      ],
      commonError: "Multiplying only part of the right-hand side by 4.",
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "exam-n1-q15",
      topicId: "linear-graphs",
      guideRef: "gradient-intercept",
      difficulty: "core",
      question: "The diagram shows a straight line on a coordinate grid. Find the equation of the line. Give it in the form y = mx + c.",
      diagram: `<svg viewBox="0 0 258 334" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A coordinate grid with a straight line sloping down from left to right, crossing the y-axis at 5 and passing through the point (4, negative 3)"><rect x="0" y="0" width="258" height="334" fill="#ffffff"/><line x1="50" y1="314" x2="50" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="78" y1="314" x2="78" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="106" y1="314" x2="106" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="134" y1="314" x2="134" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="162" y1="314" x2="162" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="190" y1="314" x2="190" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="218" y1="314" x2="218" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="314" x2="218" y2="314" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="286" x2="218" y2="286" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="258" x2="218" y2="258" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="230" x2="218" y2="230" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="202" x2="218" y2="202" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="174" x2="218" y2="174" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="146" x2="218" y2="146" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="118" x2="218" y2="118" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="90" x2="218" y2="90" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="62" x2="218" y2="62" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="34" x2="218" y2="34" stroke="#cbd5e1" stroke-width="1"/><line x1="50" y1="202" x2="230" y2="202" stroke="#334155" stroke-width="1.5"/><line x1="78" y1="314" x2="78" y2="24" stroke="#334155" stroke-width="1.5"/><text x="238" y="207" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><tspan font-style="italic">x</tspan></text><text x="78" y="22" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><tspan font-style="italic">y</tspan></text><text x="50" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="106" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="134" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="162" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="190" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="218" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="72" y="318" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="72" y="290" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="72" y="262" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="72" y="234" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="72" y="178" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="72" y="150" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="72" y="122" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="72" y="94" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="72" y="66" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="72" y="38" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="72" y="217" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><line x1="64" y1="34" x2="204" y2="314" stroke="#4338ca" stroke-width="2.5"/></svg>`,
      answer: { type: "expression", expr: "-2x+5", display: "{{y = -2x + 5}}" },
      hints: [
        "Where does the line cross the y-axis? That gives c.",
        "Move 1 square to the right along the line. How far up or down do you go?",
        "Down 2 for every 1 across means the gradient is −2.",
      ],
      solution: [
        "The line crosses the y-axis at (0, 5), so c = 5.",
        "From (0, 5) to (4, −3): 4 across and 8 down.",
        "Gradient m = {{-8/4 = -2}}. It is negative because the line slopes down from left to right.",
        "So y = −2x + 5.",
      ],
      traps: [
        { spec: { type: "expression", expr: "2x+5" }, feedback: "Check the sign of the gradient: the line goes **down** from left to right, so m is negative." },
        { spec: { type: "expression", expr: "-0.5x+5" }, feedback: "Gradient = change in y ÷ change in x (up or down ÷ across). You divided the other way round." },
        { spec: { type: "expression", expr: "5x-2" }, feedback: "You swapped m and c. The number on its own is where the line crosses the y-axis; the number in front of x is the gradient." },
      ],
      commonError: "Getting the sign of the gradient wrong for a line that slopes downwards.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n1-q16",
      topicId: "sequences-graphs",
      guideRef: "is-it-a-term",
      difficulty: "core",
      question:
        "Ethan makes rows of hexagons from matchsticks. Neighbouring hexagons share a side.\n\n| Hexagons in the row | 1 | 2 | 3 |\n|---|---|---|---|\n| Matchsticks | 6 | 11 | 16 |\n\nHe has a box of 200 matchsticks. What is the greatest number of hexagons he can make in one row?",
      diagram: `<svg viewBox="0 0 320 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rows of 1, 2 and 3 hexagons made from matchsticks, where neighbouring hexagons share a side"><rect x="0" y="0" width="320" height="84" fill="#ffffff"/><line x1="45.6" y1="16" x2="61.2" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="61.2" y1="25" x2="61.2" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="61.2" y1="43" x2="45.6" y2="52" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="45.6" y1="52" x2="30" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="30" y1="43" x2="30" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="30" y1="25" x2="45.6" y2="16" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><text x="45.6" y="74" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">1 hexagon</text><line x1="115.6" y1="16" x2="131.2" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="131.2" y1="25" x2="131.2" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="131.2" y1="43" x2="115.6" y2="52" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="115.6" y1="52" x2="100" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="43" x2="100" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="25" x2="115.6" y2="16" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="146.8" y1="16" x2="162.4" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="162.4" y1="25" x2="162.4" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="162.4" y1="43" x2="146.8" y2="52" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="146.8" y1="52" x2="131.2" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="131.2" y1="25" x2="146.8" y2="16" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><text x="131.2" y="74" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">2 hexagons</text><line x1="220.6" y1="16" x2="236.2" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="236.2" y1="25" x2="236.2" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="236.2" y1="43" x2="220.6" y2="52" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="220.6" y1="52" x2="205" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="205" y1="43" x2="205" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="205" y1="25" x2="220.6" y2="16" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="251.8" y1="16" x2="267.4" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="267.4" y1="25" x2="267.4" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="267.4" y1="43" x2="251.8" y2="52" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="251.8" y1="52" x2="236.2" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="236.2" y1="25" x2="251.8" y2="16" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="282.9" y1="16" x2="298.5" y2="25" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="298.5" y1="25" x2="298.5" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="298.5" y1="43" x2="282.9" y2="52" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="282.9" y1="52" x2="267.4" y2="43" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><line x1="267.4" y1="25" x2="282.9" y2="16" stroke="#92400e" stroke-width="3" stroke-linecap="round"/><text x="251.8" y="74" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">3 hexagons</text></svg>`,
      answer: { type: "number", value: 39, display: "39 hexagons" },
      hints: [
        "How many extra matchsticks does each new hexagon need?",
        "Write a rule for the number of matchsticks in a row of n hexagons.",
        "Solve 5n + 1 ≤ 200. What is the biggest whole number n that works?",
      ],
      solution: [
        "Each new hexagon needs 5 more matchsticks (one side is shared), so 6, 11, 16, … goes up in 5s.",
        "nth term: 5n + 1. Check: n = 1 gives 6 ✓.",
        "We need 5n + 1 ≤ 200, so 5n ≤ 199 and n ≤ 39.8.",
        "n must be a whole number, so n = 39. That uses 5 × 39 + 1 = 196 matchsticks, leaving 4 — not enough for another hexagon.",
      ],
      traps: [
        { spec: { type: "number", value: 40 }, feedback: "40 hexagons need 5 × 40 + 1 = 201 matchsticks — one more than Ethan has." },
        { spec: { type: "number", value: 33 }, feedback: "200 ÷ 6 assumes every hexagon needs 6 new matchsticks, but neighbouring hexagons share a side." },
      ],
      commonError: "Rounding 39.8 up to 40.",
      strategy: "Find a pattern",
    },
    {
      kind: "written",
      id: "exam-n1-q17",
      topicId: "angles-polygons",
      guideRef: "polygon-angles",
      difficulty: "core",
      question: "Hana says: \"I can draw a regular polygon with every interior angle equal to 100°.\"\n\nIs Hana right? Explain how you know.",
      marks: 3,
      modelAnswer:
        "Hana is not right. If each interior angle were 100°, each exterior angle would be 180° − 100° = 80°. The exterior angles of any polygon add up to 360°, so the polygon would need 360 ÷ 80 = 4.5 sides. A polygon cannot have 4.5 sides, so no regular polygon has interior angles of 100°.",
      markScheme: [
        { point: "Finds the exterior angle: 180° − 100° = 80°", keywords: ["80", "exterior"] },
        { point: "Uses the exterior angle sum: 360 ÷ 80 = 4.5 sides", keywords: ["4.5", "360", "4 1/2", "four and a half"] },
        { point: "Concludes: the number of sides is not a whole number, so Hana is wrong", keywords: ["whole number", "integer", "impossible", "not possible", "wrong", "cannot", "can't"] },
      ],
      hints: [
        "What would each exterior angle be?",
        "The exterior angles of any polygon add up to the same total. What is it?",
        "Divide that total by one exterior angle. What kind of number must the answer be?",
      ],
      solutions: [
        {
          label: "Squeeze between known shapes",
          steps: [
            "A square has interior angles of 90°; a regular pentagon has 108°.",
            "Each interior angle gets bigger as the number of sides goes up, so 100° would need somewhere between 4 and 5 sides — impossible.",
          ],
        },
      ],
      commonError: "Dividing 360 by the interior angle (100°) instead of by the exterior angle.",
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-n1-q18",
      topicId: "percentages",
      guideRef: "reverse-percentages",
      difficulty: "core",
      question:
        "In the Great Singapore Sale, the price of a pair of running shoes is reduced by 30%. The sale price is $77. What was the original price?",
      answer: { type: "number", value: 110, display: "$110" },
      hints: [
        "After a 30% reduction, what percentage of the original price is left?",
        "So 70% of the original price is $77. What is 10%?",
        "10% is $77 ÷ 7 = $11.",
      ],
      solution: [
        "The sale price is 100% − 30% = 70% of the original price.",
        "70% is $77, so 10% is $77 ÷ 7 = $11.",
        "100% is 10 × $11 = $110.",
        "Check: 30% of $110 is $33, and $110 − $33 = $77 ✓.",
      ],
      solutions: [{ label: "Multiplier", steps: ["Original × 0.7 = 77.", "Original = 77 ÷ 0.7 = 770 ÷ 7 = $110."] }],
      traps: [
        { spec: { type: "number", value: 100.1 }, feedback: "You added 30% of the *sale* price. The 30% was taken off the original price, so $77 is 70% of the original." },
        { spec: { type: "number", value: 107 }, feedback: "Adding $30 is not the same as adding 30%. $77 is 70% of the original price." },
      ],
      commonError: "Increasing $77 by 30% instead of treating $77 as 70% of the original.",
      strategy: "Work backwards",
    },
    {
      kind: "mcq",
      id: "exam-n1-q19",
      topicId: "expressions",
      guideRef: "factorising",
      difficulty: "core",
      question: "Which of these is {{12x^2 - 18xy}} factorised **fully**?",
      options: ["{{3x(4x - 6y)}}", "{{6(2x^2 - 3xy)}}", "{{6x(2x - 3y)}}", "{{6x(2x - 3xy)}}"],
      answerIndex: 2,
      explanation:
        "The HCF of {{12x^2}} and 18xy is 6x: 6 is the HCF of 12 and 18, and both terms contain x. Then 12x² ÷ 6x = 2x and 18xy ÷ 6x = 3y, giving {{6x(2x - 3y)}}. {{3x(4x - 6y)}} and {{6(2x^2 - 3xy)}} are equal to the expression but not *fully* factorised: 4x − 6y still has a common factor of 2, and {{2x^2 - 3xy}} still has a common factor of x. {{6x(2x - 3xy)}} expands to 12x² − 18x²y, so it is wrong.",
      hints: [
        "What is the biggest number that divides both 12 and 18?",
        "Which letter appears in **both** terms?",
        "For each option, is there anything inside the bracket that could still be taken out?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "mcq",
      id: "exam-n1-q20",
      topicId: "constructions-bearings",
      guideRef: "back-bearings",
      difficulty: "core",
      question:
        "The bearing of Pulau Ubin jetty from Changi Point Ferry Terminal is 301°. What is the bearing of Changi Point Ferry Terminal from Pulau Ubin jetty?",
      options: ["059°", "121°", "211°", "481°"],
      answerIndex: 1,
      explanation:
        "Draw a North line at each place. The North lines are parallel, so the return journey points in exactly the opposite direction: the bearing changes by 180°. Since 301° is more than 180°, subtract: 301° − 180° = 121°. 059° is 360° − 301°, which measures anticlockwise — bearings are always measured clockwise from North. 211° comes from subtracting 90° instead of 180°, and 481° is 301° + 180°, which is more than a full turn (481° − 360° = 121°).",
      hints: [
        "Sketch it: Pulau Ubin jetty is roughly north-west of Changi Point. So Changi Point is roughly which direction from Pulau Ubin?",
        "Turning to face the opposite way changes a bearing by 180°.",
        "Should you add or subtract 180° to stay between 000° and 360°?",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n1-q21",
      topicId: "transformations-pythagoras",
      guideRef: "enlargement",
      difficulty: "core",
      question: "On the grid, triangle B is an enlargement of triangle A with scale factor 2. Find the coordinates of the centre of enlargement.",
      diagram: `<svg viewBox="0 0 330 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid with triangle A at (3, 2), (5, 2), (3, 3) and a larger triangle B at (4, 3), (8, 3), (4, 5)"><rect x="0" y="0" width="330" height="240" fill="#ffffff"/><line x1="30" y1="215" x2="30" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="60" y1="215" x2="60" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="90" y1="215" x2="90" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="120" y1="215" x2="120" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="150" y1="215" x2="150" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="180" y1="215" x2="180" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="210" y1="215" x2="210" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="240" y1="215" x2="240" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="270" y1="215" x2="270" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="300" y1="215" x2="300" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="215" x2="300" y2="215" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="185" x2="300" y2="185" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="155" x2="300" y2="155" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="125" x2="300" y2="125" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="95" x2="300" y2="95" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="65" x2="300" y2="65" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="35" x2="300" y2="35" stroke="#cbd5e1" stroke-width="1"/><line x1="30" y1="215" x2="310" y2="215" stroke="#334155" stroke-width="1.5"/><line x1="30" y1="215" x2="30" y2="25" stroke="#334155" stroke-width="1.5"/><text x="30" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">0</text><text x="60" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="90" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="120" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="150" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="180" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="210" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="240" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="270" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="300" y="230" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">9</text><text x="24" y="189" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="24" y="159" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="24" y="129" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="24" y="99" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="24" y="69" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="24" y="39" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="318" y="220" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><tspan font-style="italic">x</tspan></text><text x="30" y="23" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><tspan font-style="italic">y</tspan></text><polygon points="120,155 180,155 120,125" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="150,125 270,125 150,65" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><text x="136.5" y="151.5" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="183" y="111" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
      answer: { type: "list", values: [2, 1], ordered: true, display: "(2, 1)" },
      hints: [
        "Match each corner of A with the corresponding corner of B.",
        "Draw a straight line through each matching pair of corners and extend it beyond A.",
        "Where do the lines meet? Check: B's corners should be twice as far from the centre as A's.",
      ],
      solution: [
        "Corresponding corners: (3, 2) → (4, 3), (5, 2) → (8, 3) and (3, 3) → (4, 5).",
        "Lines through each pair, extended back past A, all meet at (2, 1).",
        "Check: from (2, 1) to (3, 2) is 1 right and 1 up; doubled, that is 2 right and 2 up, which lands on (4, 3) ✓. From (2, 1) to (5, 2) is 3 right and 1 up; doubled gives (8, 3) ✓.",
      ],
      traps: [
        { spec: { type: "list", values: [0, 0], ordered: true }, feedback: "The origin is the centre only if the lines through matching corners meet there. Draw the lines and see where they cross." },
      ],
      commonError: "Assuming the centre is the origin, or giving the coordinates the wrong way round.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n1-q22",
      topicId: "perimeter-area-volume",
      guideRef: "surface-area",
      difficulty: "core",
      question:
        "A wooden doorstop is a triangular prism. Its cross-section is a right-angled triangle with sides 6 cm, 8 cm and 10 cm, and the prism is 15 cm long. Work out the total surface area of the doorstop. Give your answer in cm².",
      diagram: `<svg viewBox="0 0 310 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A triangular prism. The triangular end has a right angle between sides of 6 cm and 8 cm, and a sloping side of 10 cm. The prism is 15 cm long"><rect x="0" y="0" width="310" height="200" fill="#ffffff"/><polygon points="50,88 162,172 252.9,119.5 140.9,35.5" fill="#fde68a"/><polygon points="50,172 162,172 50,88" fill="#c7d2fe"/><line x1="50" y1="172" x2="162" y2="172" stroke="#1f2937" stroke-width="2"/><line x1="162" y1="172" x2="50" y2="88" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="88" x2="50" y2="172" stroke="#1f2937" stroke-width="2"/><line x1="162" y1="172" x2="252.9" y2="119.5" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="88" x2="140.9" y2="35.5" stroke="#1f2937" stroke-width="2"/><line x1="140.9" y1="35.5" x2="252.9" y2="119.5" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="172" x2="140.9" y2="119.5" stroke="#1f2937" stroke-width="2" stroke-dasharray="5 4"/><line x1="140.9" y1="119.5" x2="252.9" y2="119.5" stroke="#1f2937" stroke-width="2" stroke-dasharray="5 4"/><line x1="140.9" y1="119.5" x2="140.9" y2="35.5" stroke="#1f2937" stroke-width="2" stroke-dasharray="5 4"/><path d="M 62 172 L 62 160 L 50 160" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="106" y="190" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">8 cm</text><text x="28" y="134" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">6 cm</text><text x="92" y="102" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" transform="rotate(36.87 92 102)">10 cm</text><text x="237.5" y="157.8" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">15 cm</text></svg>`,
      answer: { type: "number", value: 408, display: "408 cm²" },
      hints: [
        "How many faces does a triangular prism have, and what shape is each one?",
        "The two triangles are identical. The right angle is between the 6 cm and 8 cm sides.",
        "The three rectangles are 6 × 15, 8 × 15 and 10 × 15.",
      ],
      solution: [
        "Two triangles: each is {{1/2}} × 6 × 8 = 24 cm², so 48 cm² together.",
        "Three rectangles: 6 × 15 = 90, 8 × 15 = 120 and 10 × 15 = 150, which is 360 cm² in total.",
        "Total surface area = 48 + 360 = 408 cm².",
      ],
      solutions: [
        {
          label: "Perimeter shortcut for the rectangles",
          steps: [
            "Unfold the three rectangles: together they make one long rectangle 15 cm wide and as long as the triangle's perimeter, 6 + 8 + 10 = 24 cm.",
            "24 × 15 = 360 cm². Add the two triangles: 360 + 48 = 408 cm².",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 456 }, feedback: "Each triangle is half of a 6 by 8 rectangle: {{1/2}} × 6 × 8 = 24 cm², not 48 cm²." },
        { spec: { type: "number", value: 384 }, feedback: "You counted only one triangle. A prism has two identical ends." },
        { spec: { type: "number", value: 360 }, feedback: "360 cm² is just the three rectangles (and, by coincidence, the volume in cm³). Add the two triangular ends." },
      ],
      commonError: "Forgetting one triangular end, or not halving when finding the triangle's area.",
      strategy: "Draw a diagram",
    },
    {
      kind: "written",
      id: "exam-n1-q23",
      topicId: "averages-spread",
      guideRef: "comparing-distributions",
      difficulty: "core",
      question:
        "Marcus timed how long customers waited for their food at two hawker stalls one lunchtime.\n\n| Statistic | Stall P (chapati) | Stall Q (vegetarian bee hoon) |\n|---|---|---|\n| Median waiting time | 6 minutes | 4 minutes |\n| Range of waiting times | 3 minutes | 11 minutes |\n\nMarcus has only **10 minutes** to collect his lunch. Which stall should he choose? Use the median **and** the range in your answer.",
      marks: 3,
      modelAnswer:
        "Stall Q has the lower median (4 minutes against 6 minutes), so a typical customer waits less at Q. But Q has a much bigger range (11 minutes against 3 minutes), so its waiting times are far less consistent. At Stall P the shortest wait was at most 6 minutes (it can't be more than the median), so the longest wait was at most 6 + 3 = 9 minutes — every customer was served within 10 minutes. At Stall Q the longest wait was at least 11 minutes, because the range is 11 and no wait can be less than 0. So Marcus should choose Stall P: it is slower on average, but reliably within his 10 minutes.",
      markScheme: [
        { point: "Compares the medians in context: a typical wait is shorter at Q (4 < 6 minutes)", keywords: ["median", "4", "shorter", "quicker", "faster", "on average", "typical"] },
        { point: "Compares the ranges in context: P's waits are more consistent; Q's vary much more (3 vs 11 minutes)", keywords: ["range", "consistent", "reliable", "vary", "varied", "spread", "11"] },
        { point: "Justified choice of P: its longest wait is at most 9 minutes, while Q had a wait of 11 minutes or more", keywords: ["stall p", "choose p", "9", "at most", "longest", "10 minutes", "risk"] },
      ],
      hints: [
        "Which stall is quicker for a typical customer?",
        "Which stall's waiting times are more consistent?",
        "At Stall P the shortest wait is at most 6 minutes. So what is the longest wait at most? What can you say about the longest wait at Stall Q?",
      ],
      commonError: "Choosing Q just because its median is lower, without thinking about how much its waiting times vary.",
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "exam-n1-q24",
      topicId: "circles",
      guideRef: "compound-circle-shapes",
      difficulty: "core",
      question:
        "A flower bed at Gardens by the Bay is made from a rectangle 10 m long and 6 m wide, with a semicircle on each 6 m end, as shown. Work out the area of the flower bed. Give your answer in terms of π.",
      diagram: `<svg viewBox="0 0 380 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A flower bed made of a rectangle 10 m long and 6 m wide with a semicircle on each 6 m end"><rect x="0" y="0" width="380" height="190" fill="#ffffff"/><path d="M 90 40 L 290 40 A 60 60 0 0 1 290 160 L 90 160 A 60 60 0 0 1 90 40 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="90" y1="40" x2="90" y2="160" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="290" y1="40" x2="290" y2="160" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="190" y="30" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">10 m</text><text x="266" y="105" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">6 m</text></svg>`,
      answer: { type: "expression", expr: "60+9pi", display: "{{60 + 9pi}} m²" },
      hints: [
        "Split the shape into a rectangle and two semicircles.",
        "The 6 m end is the diameter of each semicircle. What is the radius?",
        "Two equal semicircles make one whole circle.",
      ],
      solution: [
        "Rectangle: 10 × 6 = 60 m².",
        "Each semicircle has diameter 6 m, so radius 3 m.",
        "The two semicircles make one whole circle: {{pi * 3^2 = 9pi}} m².",
        "Total area = {{60 + 9pi}} m².",
      ],
      traps: [
        { spec: { type: "expression", expr: "60+18pi" }, feedback: "Two *semi*circles make one whole circle, so their area is {{pi * 3^2 = 9pi}}, not {{18pi}}." },
        { spec: { type: "expression", expr: "60+36pi" }, feedback: "The radius is 3 m (half of the 6 m diameter), not 6 m." },
        { spec: { type: "expression", expr: "60+6pi" }, feedback: "{{6pi}} is the length of the curved edges (πd). Area uses {{pi r^2}}." },
        { spec: { type: "number", value: 88.27, tolerance: 0.1 }, feedback: "That's the right size, but the question asks for an exact answer in terms of π. Leave π as a symbol." },
      ],
      commonError: "Using 6 m as the radius, or counting each semicircle as a whole circle.",
      strategy: "Split into parts",
    },

    // ======================= CHALLENGE (q25–q30) =====================
    {
      kind: "short",
      id: "exam-n1-q25",
      topicId: "rates-units",
      guideRef: "speed",
      difficulty: "challenge",
      question:
        "Arjun cycles 30 km along a park connector. He rides the first 15 km at 20 km/h and the last 15 km at 30 km/h. Work out his average speed for the whole ride, in km/h.",
      answer: { type: "number", value: 24, display: "24 km/h" },
      hints: [
        "Is the average speed just the mean of 20 and 30? Which half of the ride takes longer?",
        "Average speed = total distance ÷ total time. How long does each 15 km take?",
        "45 minutes + 30 minutes = 75 minutes = 1.25 hours.",
      ],
      solution: [
        "First 15 km: time = 15 ÷ 20 = {{3/4}} hour = 45 minutes.",
        "Last 15 km: time = 15 ÷ 30 = {{1/2}} hour = 30 minutes.",
        "Total: 30 km in 75 minutes = 1.25 hours.",
        "Average speed = 30 ÷ 1.25 = 24 km/h.",
      ],
      solutions: [
        {
          label: "Scale the time",
          steps: ["He covers 30 km in 75 minutes.", "So he covers 6 km every 15 minutes.", "In 60 minutes: 4 × 6 = 24 km, so 24 km/h."],
        },
      ],
      traps: [
        { spec: { type: "number", value: 25 }, feedback: "25 is the mean of the two speeds, but Arjun spends *longer* at the slower speed (45 minutes against 30), so his average is pulled below 25." },
      ],
      commonError: "Averaging the two speeds instead of using total distance ÷ total time.",
      strategy: "Split into parts",
    },
    {
      kind: "short",
      id: "exam-n1-q26",
      topicId: "ratio-proportion",
      guideRef: "sharing-in-a-ratio",
      difficulty: "challenge",
      question:
        "In a school dance CCA, the ratio of boys to girls is 3 : 5. Six more boys join and nobody leaves. The ratio of boys to girls is now 3 : 4. How many girls are in the CCA?",
      answer: { type: "number", value: 40, display: "40 girls" },
      hints: [
        "Which group stays the same size?",
        "Rewrite both ratios so the girls have the same number of parts. What is the LCM of 5 and 4?",
        "3 : 5 = 12 : 20 and 3 : 4 = 15 : 20. The boys went from 12 parts to 15 parts — and that change is the 6 new boys.",
      ],
      solution: [
        "The number of girls does not change, so give the girls the same number of parts in both ratios.",
        "3 : 5 = 12 : 20 and 3 : 4 = 15 : 20.",
        "The boys went up by 15 − 12 = 3 parts, which is 6 boys, so 1 part = 2.",
        "Girls = 20 parts = 40.",
        "Check: 24 boys before and 30 after. 24 : 40 = 3 : 5 ✓ and 30 : 40 = 3 : 4 ✓.",
      ],
      solutions: [
        {
          label: "Algebra",
          steps: [
            "Let the boys be 3k and the girls 5k.",
            "{{(3k + 6)/(5k) = 3/4}}, so 4(3k + 6) = 15k.",
            "12k + 24 = 15k, so 3k = 24 and k = 8.",
            "Girls = 5 × 8 = 40.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 30 }, feedback: "30 is the number of boys *after* the new boys join. The question asks for the number of girls." },
        { spec: { type: "number", value: 24 }, feedback: "24 is the number of boys at the start. How many girls are there?" },
      ],
      commonError: "Treating the '3' in both ratios as the same number of boys, even though the number of boys changed.",
      strategy: "Use a bar model",
    },
    {
      kind: "written",
      id: "exam-n1-q27",
      topicId: "percentages",
      guideRef: "multipliers",
      difficulty: "challenge",
      question:
        "Zara says: \"If I make each side of a square 10% longer, the area of the square also goes up by 10%.\"\n\nIs Zara correct? Show working to support your answer, and find the actual percentage increase in the area.",
      marks: 3,
      modelAnswer:
        "Zara is not correct. Increasing a length by 10% multiplies it by 1.1. Both the length and the width of the square are multiplied by 1.1, so the area is multiplied by 1.1 × 1.1 = 1.21. That is an increase of 21%, not 10%. For example, a 10 cm square has area 100 cm²; with sides of 11 cm the area is 121 cm², which is 21% more.",
      markScheme: [
        { point: "Uses the multiplier 1.1 for a side (or a numerical example such as 10 cm → 11 cm)", keywords: ["1.1", "11", "110%"] },
        { point: "Finds the new area is 1.1 × 1.1 = 1.21 times the old area (or 100 → 121)", keywords: ["1.21", "121"] },
        { point: "Concludes the area increases by 21%, so Zara is wrong", keywords: ["21%", "21", "wrong", "not correct", "incorrect"] },
      ],
      hints: [
        "Try it with a real square — say, sides of 10 cm.",
        "What happens to the side? What happens to the area?",
        "Both the length and the width are 10% bigger. What single multiplier does the area get?",
      ],
      solutions: [
        {
          label: "Picture it",
          steps: [
            "Stretch a 10 by 10 square to 11 by 11.",
            "The extra area is two strips of 10 × 1 = 10 cm² each, plus a little 1 × 1 corner square.",
            "Extra = 10 + 10 + 1 = 21 cm² on top of the original 100 cm², which is 21%.",
          ],
        },
      ],
      commonError: "Forgetting that area depends on two lengths, so the 10% increase is applied twice.",
      strategy: "Try small cases",
    },
    {
      kind: "written",
      id: "exam-n1-q28",
      topicId: "expressions",
      guideRef: "writing-expressions",
      difficulty: "challenge",
      question:
        "Here is part of a calendar. Wei Ling picks a 3 × 3 block of dates, like the one in bold, and adds up all nine dates.\n\n| Mon | Tue | Wed | Thu | Fri | Sat | Sun |\n|---|---|---|---|---|---|---|\n| 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n| 8 | **9** | **10** | **11** | 12 | 13 | 14 |\n| 15 | **16** | **17** | **18** | 19 | 20 | 21 |\n| 22 | **23** | **24** | **25** | 26 | 27 | 28 |\n\nFor the bold block, 9 + 10 + 11 + 16 + 17 + 18 + 23 + 24 + 25 = 153 = 9 × 17, and 17 is the middle date.\n\nUse algebra to prove that for **any** 3 × 3 block of dates, the total of the nine dates is 9 times the middle date.",
      marks: 4,
      modelAnswer:
        "Let the middle date be n. Dates next to each other in a row differ by 1, and the date directly above is 7 less (one week earlier). So the block is:\n\n| n − 8 | n − 7 | n − 6 |\n|---|---|---|\n| n − 1 | n | n + 1 |\n| n + 6 | n + 7 | n + 8 |\n\nAdding all nine gives 9n + (−8 − 7 − 6 − 1 + 1 + 6 + 7 + 8) = 9n, because the numbers cancel in pairs. So the total is always 9 times the middle date.",
      markScheme: [
        { point: "Lets the middle date be a letter, e.g. n", keywords: ["n", "let", "middle", "x"] },
        { point: "Writes the dates above, below, left and right as n − 7, n + 7, n − 1, n + 1", keywords: ["n-7", "n+7", "n-1", "n+1", "n − 7", "n + 7"] },
        { point: "Writes the corner dates as n − 8, n − 6, n + 6, n + 8", keywords: ["n-8", "n+8", "n-6", "n+6", "n − 8", "n + 8"] },
        { point: "Adds to get 9n (the numbers cancel), so the total is 9 × the middle date", keywords: ["9n", "cancel", "9x", "9 times"] },
      ],
      hints: [
        "Test another block first, so you believe it.",
        "Call the middle date n. What is the date directly above it? Directly to its left?",
        "Write all nine dates in terms of n, then add them. What happens to the numbers?",
      ],
      solutions: [
        {
          label: "Pairing argument",
          steps: [
            "Every date in the block has a partner on the opposite side of the middle, e.g. top-left with bottom-right.",
            "Partners are the same distance below and above n, so each pair adds up to 2n.",
            "Four pairs plus the middle date: 4 × 2n + n = 9n.",
          ],
        },
      ],
      commonError: "Checking a few examples only. Examples can convince you, but they don't prove it works for every block.",
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-n1-q29",
      topicId: "probability",
      guideRef: "combined-events",
      difficulty: "challenge",
      question:
        "Jun rolls two ordinary fair six-sided dice and multiplies the two scores together. What is the probability that the product is a multiple of 6? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 5, d: 12, simplest: true },
      hints: [
        "Draw a 6 × 6 sample space grid of products, or list the outcomes systematically.",
        "A product can be a multiple of 6 without a 6 on either dice — think about 2 × 3 or 3 × 4.",
        "Go through the first dice's score from 1 to 6 and count how many second scores work each time.",
      ],
      solution: [
        "There are 6 × 6 = 36 equally likely outcomes.",
        "First dice 1: only 6 works (1 outcome). First dice 2: 3 or 6 (2). First dice 3: 2, 4 or 6 (3). First dice 4: 3 or 6 (2). First dice 5: only 6 (1). First dice 6: any score (6).",
        "Total = 1 + 2 + 3 + 2 + 1 + 6 = 15 outcomes.",
        "P(multiple of 6) = {{15/36 = 5/12}}.",
      ],
      solutions: [
        {
          label: "Count what fails",
          steps: [
            "A multiple of 6 needs a factor 2 and a factor 3.",
            "No factor 2: both scores odd, 3 × 3 = 9 outcomes. No factor 3: neither score is 3 or 6, 4 × 4 = 16 outcomes.",
            "Both 1 or 5 (no 2 and no 3) is counted in both lists: 2 × 2 = 4 outcomes.",
            "Fails = 9 + 16 − 4 = 21, so successes = 36 − 21 = 15 and P = {{15/36 = 5/12}}.",
          ],
        },
      ],
      traps: [
        { spec: { type: "fraction", n: 11, d: 36 }, feedback: "{{11/36}} is the probability of getting at least one 6. But products such as 2 × 3 = 6 and 3 × 4 = 12 are multiples of 6 too." },
      ],
      commonError: "Only counting outcomes that include a 6.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n1-q30",
      topicId: "factors-multiples",
      guideRef: "squares-cubes-from-primes",
      difficulty: "challenge",
      question:
        "Find the smallest positive whole number n such that {{n/2}} is a square number **and** {{n/3}} is a cube number.",
      answer: { type: "number", value: 648 },
      hints: [
        "n must be divisible by 2 and by 3. Think of n as {{2^a * 3^b}} and deal with each prime separately.",
        "For {{n/2}} to be a square, the power of 2 in it, a − 1, must be even. For {{n/3}} to be a cube, a must be a multiple of 3. What is the smallest a that does both?",
        "a = 3 works. Now the power of 3: b must be even, and b − 1 must be a multiple of 3.",
      ],
      solution: [
        "Any other prime factor would need a power that is both even and a multiple of 3, so leave other primes out: n = {{2^a * 3^b}}.",
        "{{n/2 = 2^(a-1) * 3^b}} is a square, so a − 1 and b are both even.",
        "{{n/3 = 2^a * 3^(b-1)}} is a cube, so a and b − 1 are both multiples of 3.",
        "Power of 2: a is odd and a multiple of 3, so the smallest is a = 3.",
        "Power of 3: b is even and b − 1 is a multiple of 3. b = 1 is odd, so the smallest is b = 4.",
        "n = {{2^3 * 3^4 = 8 * 81 = 648}}.",
        "Check: 648 ÷ 2 = 324 = {{18^2}} ✓ and 648 ÷ 3 = 216 = {{6^3}} ✓.",
      ],
      traps: [
        { spec: { type: "number", value: 18 }, feedback: "18 ÷ 2 = 9 is a square, but 18 ÷ 3 = 6 is not a cube. Both conditions must hold." },
        { spec: { type: "number", value: 24 }, feedback: "24 ÷ 3 = 8 is a cube, but 24 ÷ 2 = 12 is not a square. Both conditions must hold." },
      ],
      commonError: "Satisfying only one of the two conditions.",
      strategy: "Make it simpler",
    },
  ],
};
