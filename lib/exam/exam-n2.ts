import type { ExamPaper } from "../types.ts";

// Big Exam — Non-calculator Paper 2.
// 30 questions, easier → harder: 8 warmup (q01–q08), 16 core (q09–q24), 6 challenge (q25–q30).
// Kinds: 6 MCQ, 20 short (auto-marked), 4 written. All 20 topics covered, none more than twice.
// Harder than Paper 1: more forming-and-solving, multi-step chains with reasons, and four
// UKMT/AoPS-flavoured finishers (q27–q30).

export const paper: ExamPaper = {
  id: "exam-n2",
  title: "Non-calculator Paper 2",
  calculator: false,
  minutes: 60,
  questions: [
    // ======================= WARM-UP (q01–q08) =======================
    {
      kind: "short",
      id: "exam-n2-q01",
      topicId: "integers-powers",
      guideRef: "squares-cubes-roots",
      difficulty: "warmup",
      question: "Work out {{cbrt(-125) - (-4)^2 ÷ 8}}.",
      answer: { type: "number", value: -7 },
      hints: [
        "Can a cube root be negative? Which number, multiplied by itself three times, makes −125?",
        "Square the (−4), then divide by 8 — both before you subtract.",
      ],
      solution: [
        "{{cbrt(-125) = -5}}, because (−5) × (−5) × (−5) = 25 × (−5) = −125.",
        "{{(-4)^2 = (-4) * (-4) = 16}}.",
        "Division comes before subtraction: 16 ÷ 8 = 2.",
        "So the answer is −5 − 2 = −7.",
      ],
      traps: [
        { spec: { type: "number", value: -3 }, feedback: "{{(-4)^2}} is +16, not −16: a negative times a negative is positive." },
        { spec: { type: "number", value: 3 }, feedback: "The cube root of −125 is −5, not 5. Cube roots of negative numbers are negative, because (−5)³ = −125." },
        { spec: { type: "number", value: -2.625 }, feedback: "You subtracted first and then divided the whole thing by 8. Division comes before subtraction." },
      ],
      commonError: "Thinking a negative number has no cube root. That is only true for square roots — (−5)³ = −125.",
      strategy: "Use the inverse",
    },
    {
      kind: "mcq",
      id: "exam-n2-q02",
      topicId: "standard-form",
      guideRef: "small-numbers",
      difficulty: "warmup",
      question:
        "Graphene is a sheet of carbon only one atom thick. One layer of graphene is about 0.000 000 000 34 m thick.\n\nWhich of these is 0.000 000 000 34 written in standard form?",
      options: ["{{3.4 * 10^(-9)}}", "{{3.4 * 10^(-10)}}", "{{3.4 * 10^(-11)}}", "{{34 * 10^(-11)}}"],
      answerIndex: 1,
      explanation:
        "The decimal point has to move 10 places to the right to turn 0.000 000 000 34 into 3.4, so the number is {{3.4 * 10^(-10)}}. {{3.4 * 10^(-9)}} comes from counting the nine zeros after the point instead of the places the point moves. {{3.4 * 10^(-11)}} counts all eleven decimal places. {{34 * 10^(-11)}} has the right value but is not standard form, because 34 is not between 1 and 10.",
      hints: [
        "Standard form starts with a number that is at least 1 and less than 10. What is that number here?",
        "Count how many places the decimal point jumps to get from 0.000 000 000 34 to 3.4.",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "exam-n2-q03",
      topicId: "decimals-rounding",
      guideRef: "dividing-decimals",
      difficulty: "warmup",
      question:
        "Siti is making badges for her CCA. She cuts pieces of ribbon, each 0.35 m long, from a roll that is 9.1 m long. Without a calculator, work out how many pieces she can cut.",
      answer: { type: "number", value: 26, display: "26 pieces" },
      hints: [
        "Dividing by a decimal is awkward. Multiply both numbers by the same power of 10 so that you divide by a whole number.",
        "9.1 ÷ 0.35 has the same answer as 910 ÷ 35.",
      ],
      solution: [
        "Multiply both numbers by 100 (this does not change the answer): 9.1 ÷ 0.35 = 910 ÷ 35.",
        "35 × 20 = 700, which leaves 910 − 700 = 210, and 35 × 6 = 210.",
        "So 910 ÷ 35 = 20 + 6 = 26 pieces.",
        "Check: 26 × 0.35 = 20 × 0.35 + 6 × 0.35 = 7 + 2.1 = 9.1 ✓",
      ],
      solutions: [
        {
          label: "Pair up the pieces",
          steps: [
            "Two pieces use 0.7 m of ribbon.",
            "9.1 ÷ 0.7 = 91 ÷ 7 = 13 pairs.",
            "13 pairs = 26 pieces. This is quicker here because 7 divides 91 exactly.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 2.6 }, feedback: "Multiply *both* numbers by the same power of 10: 9.1 ÷ 0.35 = 910 ÷ 35, not 91 ÷ 35." },
        { spec: { type: "number", value: 260 }, feedback: "Check the size: 260 pieces of 0.35 m would need 91 m of ribbon. Multiply both numbers by 100 to get 910 ÷ 35." },
      ],
      commonError: "Moving the decimal point a different number of places in the two numbers.",
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-n2-q04",
      topicId: "percentages",
      guideRef: "one-as-percentage-of-another",
      difficulty: "warmup",
      question:
        "Mei's school recycling club collected 40 kg of waste last week. 34 kg of it was paper. What percentage of the waste was paper?",
      answer: { type: "number", value: 85, display: "85%" },
      hints: [
        "Write the paper as a fraction of the total: {{34/40}}.",
        "Simplify {{34/40}} first, then make the denominator 100.",
      ],
      solution: [
        "Paper as a fraction of the total: {{34/40}}.",
        "Simplify: {{34/40 = 17/20}}.",
        "Multiply the top and bottom by 5: {{17/20 = 85/100}} = 85%.",
      ],
      traps: [
        { spec: { type: "number", value: 15 }, feedback: "15% is the part that was *not* paper. The question asks about the paper." },
        { spec: { type: "number", value: 34 }, feedback: "34 is the mass of paper in kg. Now write it as a percentage of the 40 kg total." },
        { spec: { type: "number", value: 0.85 }, feedback: "{{34/40}} = 0.85 is the paper as a fraction (or decimal) of the total. Multiply by 100 to write it as a percentage." },
      ],
      commonError: "Writing the 34 kg itself as the percentage.",
    },
    {
      kind: "short",
      id: "exam-n2-q05",
      topicId: "ratio-proportion",
      guideRef: "ratio-basics",
      difficulty: "warmup",
      question:
        "A recipe for a tray of pineapple tarts uses 1.2 kg of flour and 450 g of butter.\n\nWrite the ratio of flour to butter in its simplest form.",
      answer: { type: "ratio", parts: [8, 3], simplest: true, display: "8 : 3" },
      hints: [
        "The units must match first. How many grams are in 1.2 kg?",
        "Then divide both parts by common factors until you can't any more.",
      ],
      solution: [
        "1.2 kg = 1200 g, so the ratio is 1200 : 450.",
        "Divide both parts by 10: 120 : 45.",
        "Divide both parts by 15: 8 : 3.",
      ],
      traps: [
        { spec: { type: "ratio", parts: [1, 375] }, feedback: "Change to the same units first: 1.2 kg = 1200 g. Then compare 1200 with 450." },
        { spec: { type: "ratio", parts: [4, 15] }, feedback: "450 g is 0.45 kg, not 4.5 kg. It is safer to change 1.2 kg into 1200 g." },
      ],
      commonError: "Comparing 1.2 with 450 without changing kilograms into grams.",
    },
    {
      kind: "mcq",
      id: "exam-n2-q06",
      topicId: "expressions",
      guideRef: "language-of-algebra",
      difficulty: "warmup",
      question: "An **identity** is true for *every* value of x. Which one of these is an identity?",
      options: [
        "{{4(x + 2) = 4x + 2}}",
        "{{5 - (x + 2) = 3 + x}}",
        "{{x/2 + x/3 = (2x)/5}}",
        "{{2(x - 3) - x = x - 6}}",
      ],
      answerIndex: 3,
      explanation:
        "Expanding gives {{2(x - 3) - x = 2x - 6 - x = x - 6}} for every x, so it is an identity. In {{5 - (x + 2)}} the minus sign applies to both terms in the bracket: 5 − x − 2 = 3 − x, not 3 + x. {{x/2 + x/3 = (3x)/6 + (2x)/6 = (5x)/6}}; {{(2x)/5}} comes from adding the tops and the bottoms. 4(x + 2) = 4x + 8, because the 4 multiplies *both* terms.",
      hints: [
        "Expand and simplify each left-hand side. Does it match the right-hand side exactly?",
        "Quick test: put x = 1 into each one. If a statement fails for even one value, it is not an identity.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "exam-n2-q07",
      topicId: "sequences-graphs",
      guideRef: "functions",
      difficulty: "warmup",
      question: "Here is a function machine.\n\n**input** → × 3 → − 4 → **output**\n\nWhat input gives an output of −13?",
      answer: { type: "number", value: -3 },
      hints: [
        "Run the machine backwards: start with −13 and undo each step, last step first.",
        "The inverse of − 4 is + 4, and the inverse of × 3 is ÷ 3.",
      ],
      solution: [
        "Undo the − 4: −13 + 4 = −9.",
        "Undo the × 3: −9 ÷ 3 = −3.",
        "Check: −3 × 3 = −9, and −9 − 4 = −13 ✓",
      ],
      traps: [
        { spec: { type: "number", value: -43 }, feedback: "You put −13 *into* the machine. To find the input, run the machine backwards using inverse operations." },
        { spec: { type: "fraction", n: -17, d: 3 }, feedback: "To undo − 4 you add 4: −13 + 4 = −9. Then divide by 3." },
      ],
      commonError: "Undoing the steps in the original order instead of the reverse order.",
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-n2-q08",
      topicId: "linear-graphs",
      guideRef: "coordinates-midpoints",
      difficulty: "warmup",
      question:
        "M is the midpoint of the line segment AB. A is the point (−3, 7) and M is the point (1, 2).\n\nFind the coordinates of B.",
      answer: { type: "list", values: [5, -3], ordered: true, display: "(5, −3)" },
      hints: [
        "How do you get from A to M — how far across, and how far up or down?",
        "B is the same step again, starting from M.",
      ],
      solution: [
        "From A(−3, 7) to M(1, 2) is 4 to the right and 5 down.",
        "M is halfway, so take the same step again from M: (1 + 4, 2 − 5) = (5, −3).",
        "Check: {{(-3 + 5)/2 = 1}} and {{(7 + (-3))/2 = 2}}, so the midpoint of A and B is (1, 2) ✓",
      ],
      solutions: [
        {
          label: "Use the midpoint rule backwards",
          steps: [
            "Let B = (p, q). Then {{(-3 + p)/2 = 1}}, so −3 + p = 2 and p = 5.",
            "Also {{(7 + q)/2 = 2}}, so 7 + q = 4 and q = −3.",
          ],
        },
      ],
      traps: [
        { spec: { type: "list", values: [-1, 4.5], ordered: true }, feedback: "That is the midpoint of A and M. M is halfway along AB, so B is as far past M as A is before it." },
        { spec: { type: "list", values: [4, -5], ordered: true }, feedback: "(4, −5) is the *step* from A to M. Add that step on to M to reach B." },
      ],
      commonError: "Finding the midpoint of A and M instead of extending the line beyond M.",
      strategy: "Draw a diagram",
    },

    // ========================= CORE (q09–q24) =========================
    {
      kind: "mcq",
      id: "exam-n2-q09",
      topicId: "integers-powers",
      guideRef: "index-laws",
      difficulty: "core",
      question: "Simplify {{((2a^3)^2 * a^4)/a^5}}.",
      options: ["{{4a^5}}", "{{2a^5}}", "{{4a^4}}", "{{4a^19}}"],
      answerIndex: 0,
      explanation:
        "{{(2a^3)^2 = 2^2 * (a^3)^2 = 4a^6}}: square the 2 as well, and multiply the indices for a power of a power. Then {{4a^6 * a^4 = 4a^10}} (add the indices) and {{4a^10 ÷ a^5 = 4a^5}} (subtract them). {{2a^5}} forgets to square the 2. {{4a^4}} adds the indices in {{(a^3)^2}} to get {{a^5}}. {{4a^19}} multiplies the indices in {{a^6 * a^4}} instead of adding them.",
      hints: [
        "Deal with the bracket first: *everything* inside is squared, the 2 as well as the {{a^3}}.",
        "Power of a power: multiply the indices. Multiplying powers: add them. Dividing: subtract them.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-n2-q10",
      topicId: "fractions",
      guideRef: "calculating-with-fractions",
      difficulty: "core",
      question: "Work out {{2 1/4 ÷ 1 1/2 - 1/3}}.\n\nGive your answer as a mixed number in its simplest form.",
      answer: { type: "fraction", n: 7, d: 6, simplest: true, form: "mixed", display: "{{1 1/6}}" },
      hints: [
        "Which comes first, the ÷ or the −?",
        "Write the mixed numbers as improper fractions. Dividing by {{3/2}} is the same as multiplying by {{2/3}}.",
        "{{9/4 * 2/3 = 3/2}}. Now subtract {{1/3}}.",
      ],
      solution: [
        "Estimate first: 2.25 ÷ 1.5 = 1.5, and 1.5 − 0.33 is about 1.2.",
        "Division first: {{2 1/4 = 9/4}} and {{1 1/2 = 3/2}}.",
        "{{9/4 ÷ 3/2 = 9/4 * 2/3 = 18/12 = 3/2}}.",
        "Then subtract: {{3/2 - 1/3 = 9/6 - 2/6 = 7/6}}.",
        "{{7/6 = 1 1/6}}, which matches the estimate.",
      ],
      traps: [
        { spec: { type: "fraction", n: 27, d: 14 }, feedback: "You did the subtraction first. Division comes before subtraction, so work out {{2 1/4 ÷ 1 1/2}} first." },
        { spec: { type: "fraction", n: 73, d: 24 }, feedback: "You multiplied by {{3/2}} instead of dividing. Dividing by {{3/2}} means multiplying by its reciprocal, {{2/3}}." },
      ],
      commonError: "Working out {{1 1/2 - 1/3}} before the division.",
      strategy: "Estimate first",
    },
    {
      kind: "mcq",
      id: "exam-n2-q11",
      topicId: "decimals-rounding",
      guideRef: "recurring-decimals",
      difficulty: "core",
      question:
        "Without doing any division, decide which one of these fractions can be written as a **terminating** decimal.",
      options: ["{{7/12}}", "{{5/6}}", "{{3/40}}", "{{4/15}}"],
      answerIndex: 2,
      explanation:
        "A fraction in its simplest form terminates exactly when its denominator has no prime factors other than 2 and 5. 40 = {{2^3 * 5}}, so {{3/40}} terminates: {{3/40 = 75/1000}} = 0.075. The others all have a factor of 3 in the denominator: 12 = {{2^2 * 3}}, 6 = 2 × 3 and 15 = 3 × 5. {{4/15}} is tempting because 15 ends in 5, but {{4/15}} = 0.2666…, which recurs. {{7/12}} and {{5/6}} are tempting because their denominators are even, but an even denominator is not enough.",
      hints: [
        "Write each denominator as a product of prime factors.",
        "Powers of 10 are made only of 2s and 5s. Which denominator can be scaled up to 10, 100 or 1000?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "mcq",
      id: "exam-n2-q12",
      topicId: "percentages",
      guideRef: "percentage-change",
      difficulty: "core",
      question:
        "On 1 January 2024, Singapore's GST rate went up from 8% to 9%. A headline said: “GST goes up by 1%.”\n\nBy what percentage did the GST *rate* actually increase?",
      options: ["1%", "about 11.1%", "12.5%", "112.5%"],
      answerIndex: 2,
      explanation:
        "The rate rose by 1 percentage point, from 8 to 9. As a percentage of the *original* rate, that is {{1/8}} = 12.5%. “About 11.1%” divides by the new rate (9) instead of the original rate (8). 1% mixes up percentage points with percent. 112.5% is the new rate as a percentage of the old one, not the increase.",
      hints: [
        "Percentage change = change ÷ original × 100. What is the change, and what is the original?",
        "The change is 1 and the original is 8. What is {{1/8}} as a percentage?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "exam-n2-q13",
      topicId: "rates-units",
      guideRef: "speed",
      difficulty: "core",
      question:
        "An MRT train travels between two stations that are 1.5 km apart. Assume it travels at a steady 72 km/h for the whole journey.\n\nHow many seconds does the journey take?",
      answer: { type: "number", value: 75, display: "75 seconds" },
      hints: [
        "Time = distance ÷ speed — but get the units to match first.",
        "How many metres does the train travel in one second? 72 km/h means 72 000 m in 3600 s.",
        "72 000 ÷ 3600 = 20, so the train covers 20 m every second.",
      ],
      solution: [
        "72 km/h = 72 000 m in 3600 s, so the speed is 72 000 ÷ 3600 = 20 m/s.",
        "1.5 km = 1500 m.",
        "Time = 1500 ÷ 20 = 75 seconds.",
      ],
      solutions: [
        {
          label: "Work in hours, then convert",
          steps: [
            "Time = {{1.5/72}} hours = {{1/48}} of an hour.",
            "1 hour = 3600 s, so {{1/48}} of an hour = 3600 ÷ 48 = 75 s.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 48 }, feedback: "72 ÷ 1.5 is speed ÷ distance. Time = distance ÷ speed." },
        { spec: { type: "number", value: 85 }, feedback: "1.25 minutes is 1 minute and 15 seconds (0.25 of 60 s is 15 s), not 1 minute 25 seconds." },
      ],
      commonError: "Turning 1.25 minutes into 1 minute 25 seconds.",
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-n2-q14",
      topicId: "circles",
      guideRef: "area-of-a-circle",
      difficulty: "core",
      question:
        "The top of a circular stool has an area of 49π cm². Work out the circumference of the stool top in cm. Give your answer in terms of π. (Type it like 5π or 5pi, with no units.)",
      answer: { type: "expression", expr: "14pi", display: "{{14pi}} cm" },
      hints: [
        "Area = {{pi r^2}}. Which value of r makes {{pi r^2 = 49pi}}?",
        "{{r^2 = 49}}, so r = 7 cm. Now use C = 2πr.",
      ],
      solution: [
        "{{pi r^2 = 49pi}}, so {{r^2 = 49}} and r = 7 cm.",
        "C = 2πr = 2 × π × 7 = 14π cm.",
      ],
      traps: [
        { spec: { type: "expression", expr: "7pi" }, feedback: "With r = 7, C = 2πr = 14π. 7π is only πr — you need the diameter, 14 cm, times π." },
        { spec: { type: "expression", expr: "28pi" }, feedback: "14 cm is the diameter, not the radius. C = πd = 14π." },
        { spec: { type: "number", value: 44, tolerance: 0.1 }, feedback: "That's the right size, but the question asks for an exact answer in terms of π. Leave π as a symbol instead of using 3.14 or {{22/7}}." },
      ],
      commonError: "Mixing up the radius and the diameter once r = 7 has been found.",
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-n2-q15",
      topicId: "probability",
      guideRef: "two-way-tables-venn",
      difficulty: "core",
      question:
        "In a class of 30 students, 18 study Art, 14 study Music and 5 study neither subject. A student from the class is chosen at random.\n\nWhat is the probability that the student studies both Art and Music? Give your answer as a fraction in its simplest form.",
      diagram: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram for a class of 30 students with two overlapping circles, Art and Music. The three regions inside the circles are marked with question marks, and 5 students are outside both circles"><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="none" stroke="#1f2937" stroke-width="2"/><text x="20" y="30" font-size="13" font-family="sans-serif" fill="#1f2937">Class: 30 students</text><circle cx="145" cy="122" r="72" fill="#c7d2fe" fill-opacity="0.7" stroke="#334155" stroke-width="2"/><circle cx="225" cy="122" r="72" fill="#fde68a" fill-opacity="0.7" stroke="#334155" stroke-width="2"/><text x="106" y="86" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Art</text><text x="262" y="86" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Music</text><text x="108" y="132" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="185" y="132" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="262" y="132" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="322" y="196" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">5</text></svg>`,
      answer: { type: "fraction", n: 7, d: 30, simplest: true, display: "{{7/30}}" },
      hints: [
        "How many students study at least one of the two subjects?",
        "30 − 5 = 25 students study Art or Music or both, but 18 + 14 = 32. Why is 32 more than 25?",
        "The students who study both have been counted twice. How many is that?",
      ],
      solution: [
        "Students who study at least one subject: 30 − 5 = 25.",
        "18 + 14 = 32 counts everyone who studies both subjects twice.",
        "So 32 − 25 = 7 students study both.",
        "Check with the Venn diagram: Art only 18 − 7 = 11, Music only 14 − 7 = 7, both 7, neither 5. Total 11 + 7 + 7 + 5 = 30 ✓",
        "P(both) = {{7/30}}.",
      ],
      traps: [
        { spec: { type: "fraction", n: 7, d: 25 }, feedback: "The student is chosen from the whole class of 30, not just from the 25 who study at least one subject." },
        { spec: { type: "fraction", n: 1, d: 6 }, feedback: "{{5/30 = 1/6}} is the probability that the student studies *neither* subject." },
      ],
      commonError: "Dividing by 25 instead of 30 at the end.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n2-q16",
      topicId: "equations",
      guideRef: "forming-equations",
      difficulty: "core",
      question:
        "The diagram shows a rectangle and an equilateral triangle. All lengths are in centimetres.\n\nThe perimeter of the rectangle is 10 cm more than the perimeter of the triangle. Form and solve an equation to find x.",
      diagram: `<svg viewBox="0 0 440 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle with sides labelled 2x + 3 and x − 1, and an equilateral triangle with a side labelled x + 4 and equal-length marks on all three sides"><rect x="0" y="0" width="440" height="170" fill="#ffffff"/><rect x="30" y="60" width="150" height="50" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><text x="105" y="50" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">2x + 3</text><text x="188" y="90" font-size="14" font-family="sans-serif" fill="#1f2937">x − 1</text><polygon points="290,140 390,140 340,53.4" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="309.8" y1="93.7" x2="320.2" y2="99.7" stroke="#1f2937" stroke-width="1.5"/><line x1="359.8" y1="99.7" x2="370.2" y2="93.7" stroke="#1f2937" stroke-width="1.5"/><line x1="340" y1="134" x2="340" y2="146" stroke="#1f2937" stroke-width="1.5"/><text x="302" y="92" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="end">x + 4</text></svg>`,
      answer: { type: "number", value: 6, display: "x = 6" },
      hints: [
        "Write an expression for each perimeter.",
        "Rectangle: two of each side. Triangle: three equal sides.",
        "The rectangle's perimeter = the triangle's perimeter + 10. Solve that equation.",
      ],
      solution: [
        "Rectangle: 2(2x + 3) + 2(x − 1) = 4x + 6 + 2x − 2 = 6x + 4.",
        "Triangle: 3(x + 4) = 3x + 12.",
        "Rectangle = triangle + 10: 6x + 4 = 3x + 22.",
        "Subtract 3x: 3x + 4 = 22. Subtract 4: 3x = 18. So x = 6.",
        "Check: the rectangle is 15 cm by 5 cm (perimeter 40 cm) and the triangle has 10 cm sides (perimeter 30 cm). 40 = 30 + 10 ✓",
      ],
      traps: [
        { spec: { type: "fraction", n: -2, d: 3 }, feedback: "You added the 10 to the rectangle. The rectangle has the *bigger* perimeter, so the 10 goes with the triangle: 6x + 4 = 3x + 12 + 10." },
        { spec: { type: "number", value: 2 }, feedback: "An equilateral triangle has three equal sides, so its perimeter is 3(x + 4), not x + 4." },
      ],
      commonError: "Adding each side of the rectangle only once, giving 3x + 2 for its perimeter.",
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-n2-q17",
      topicId: "equations",
      guideRef: "unknowns-both-sides",
      difficulty: "core",
      question:
        "At a school eco-garden there are two water tanks.\n\n| Tank | Water at the start | What happens |\n|---|---|---|\n| A | 340 litres | pumped out to water the plants at 15 litres per minute |\n| B | 60 litres | filled from a tap at 20 litres per minute |\n\nBoth start at the same time. Form and solve an equation to find after how many minutes the two tanks hold the same amount of water.",
      answer: { type: "number", value: 8, display: "8 minutes" },
      hints: [
        "Let t be the number of minutes. Write an expression for the water in each tank after t minutes.",
        "Tank A: 340 − 15t. Tank B: 60 + 20t. Set them equal.",
        "Add 15t to both sides so that all the t terms are on one side.",
      ],
      solution: [
        "After t minutes, tank A holds 340 − 15t litres and tank B holds 60 + 20t litres.",
        "They are equal when 340 − 15t = 60 + 20t.",
        "Add 15t to both sides: 340 = 60 + 35t.",
        "Subtract 60: 280 = 35t, so t = 280 ÷ 35 = 8.",
        "Check: tank A holds 340 − 120 = 220 litres and tank B holds 60 + 160 = 220 litres ✓",
      ],
      solutions: [
        {
          label: "Close the gap",
          steps: [
            "At the start, tank A has 340 − 60 = 280 litres more than tank B.",
            "Every minute A loses 15 litres and B gains 20 litres, so the gap shrinks by 35 litres.",
            "280 ÷ 35 = 8 minutes. This is quicker — and it is exactly what the equation is doing.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 56 }, feedback: "Tank A is *losing* water while tank B gains it, so the gap closes by 15 + 20 = 35 litres every minute, not 20 − 15 = 5." },
        { spec: { type: "number", value: 220 }, feedback: "220 litres is how much each tank holds at that moment. The question asks *when* — the number of minutes." },
      ],
      commonError: "Writing 340 + 15t for tank A, as if it were filling up too.",
      strategy: "Introduce a variable",
    },
    {
      kind: "mcq",
      id: "exam-n2-q18",
      topicId: "perimeter-area-volume",
      guideRef: "nets-and-euler",
      difficulty: "core",
      question: "A prism has 30 edges. How many faces does it have?",
      options: ["10", "12", "15", "20"],
      answerIndex: 1,
      explanation:
        "A prism whose end faces are n-sided polygons has n edges round each end plus n edges joining the two ends: 3n edges. So 3n = 30 and n = 10. It has 10 rectangular side faces plus 2 end faces: 12 faces. Check with Euler's formula: there are 20 vertices, and V + F − E = 20 + 12 − 30 = 2 ✓. 10 forgets the two end faces. 20 is the number of vertices. 15 comes from scaling up a cube (12 edges, 6 faces) as if a prism always had half as many faces as edges — a triangular prism has 9 edges but 5 faces, so that rule fails.",
      hints: [
        "Try small cases: how many edges and faces does a triangular prism have? A cube?",
        "A prism with n-sided ends has 3n edges. What is n here?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "exam-n2-q19",
      topicId: "transformations-pythagoras",
      guideRef: "rotation",
      difficulty: "core",
      question:
        "On the grid, P is the point (2, 5) and C is the point (4, 1).\n\nP is rotated 90° clockwise about C. Find the coordinates of the image of P.",
      diagram: `<svg viewBox="0 0 290 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from x = −1 to 9 and y = −2 to 7 showing the point P at (2, 5) and the point C at (4, 1)"><rect x="0" y="0" width="290" height="260" fill="#ffffff"/><path d="M26 28V244M74 28V244M98 28V244M122 28V244M146 28V244M170 28V244M194 28V244M218 28V244M242 28V244M266 28V244M26 28H266M26 52H266M26 76H266M26 100H266M26 124H266M26 148H266M26 172H266M26 220H266M26 244H266" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="26" y1="196" x2="274" y2="196" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="250" x2="50" y2="22" stroke="#1f2937" stroke-width="1.5"/><text x="280" y="200" font-size="13" font-family="sans-serif" fill="#1f2937">x</text><text x="56" y="20" font-size="13" font-family="sans-serif" fill="#1f2937">y</text><text x="44" y="210" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">O</text><text x="98" y="210" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="146" y="210" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="194" y="210" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="242" y="210" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="44" y="152" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="44" y="104" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="44" y="56" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="44" y="248" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><circle cx="98" cy="76" r="4" fill="#4338ca"/><text x="106" y="70" font-size="14" font-family="sans-serif" fill="#1f2937" font-weight="bold">P</text><circle cx="146" cy="172" r="4" fill="#b45309"/><text x="154" y="166" font-size="14" font-family="sans-serif" fill="#1f2937" font-weight="bold">C</text></svg>`,
      answer: { type: "list", values: [8, 3], ordered: true, display: "(8, 3)" },
      hints: [
        "Describe the step from C to P: how far across, and how far up?",
        "Imagine that step turning a quarter turn clockwise, with C fixed — “up” turns into “right”. Tracing paper helps.",
        "The step from C to P is 2 left and 4 up. After a 90° clockwise turn it becomes 4 right and 2 up.",
      ],
      solution: [
        "From C(4, 1) to P(2, 5) is 2 left and 4 up.",
        "Turn this step 90° clockwise: “up” becomes “right” and “left” becomes “up”. So 4 up → 4 right, and 2 left → 2 up.",
        "The image is 4 right and 2 up from C: (4 + 4, 1 + 2) = (8, 3).",
        "Check: the step (2 left, 4 up) and the step (4 right, 2 up) are the same length and at right angles to each other.",
      ],
      traps: [
        { spec: { type: "list", values: [0, -1], ordered: true }, feedback: "That is a 90° *anticlockwise* rotation. Clockwise is the way the hands of a clock move." },
        { spec: { type: "list", values: [5, -2], ordered: true }, feedback: "You rotated about the origin (0, 0). The centre of rotation here is C(4, 1)." },
        { spec: { type: "list", values: [6, -3], ordered: true }, feedback: "That is a half turn (180°). A quarter turn is 90°." },
      ],
      commonError: "Rotating about the origin instead of about the given centre.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n2-q20",
      topicId: "ratio-proportion",
      guideRef: "sharing-in-a-ratio",
      difficulty: "core",
      question:
        "Priya, Marcus and Wei Ling share the profit from their CCA bake sale.\n\n- Priya's share : Marcus's share = 2 : 3\n- Marcus's share : Wei Ling's share = 4 : 5\n\nWei Ling gets $21 more than Priya. How much profit do they share altogether?",
      answer: { type: "number", value: 105, display: "$105" },
      hints: [
        "Marcus is in both ratios — but he is 3 parts in one and 4 parts in the other. Can you make them match?",
        "Multiply 2 : 3 by 4 and 4 : 5 by 3, so that Marcus is 12 parts in both.",
        "Priya : Marcus : Wei Ling = 8 : 12 : 15. How many parts is the $21 difference?",
      ],
      solution: [
        "Make Marcus's parts match: 2 : 3 = 8 : 12 and 4 : 5 = 12 : 15.",
        "So Priya : Marcus : Wei Ling = 8 : 12 : 15.",
        "Wei Ling gets 15 − 8 = 7 parts more than Priya. That is $21, so 1 part = $3.",
        "Total = 8 + 12 + 15 = 35 parts = 35 × $3 = $105.",
        "Check: the shares are $24, $36 and $45. 24 : 36 = 2 : 3 ✓, 36 : 45 = 4 : 5 ✓ and 45 − 24 = 21 ✓",
      ],
      solutions: [
        {
          label: "Bar model",
          steps: [
            "Draw Priya's share as 8 equal boxes, Marcus's as 12 and Wei Ling's as 15.",
            "Wei Ling's bar is 7 boxes longer than Priya's, and that overhang is worth $21, so each box is $3.",
            "There are 35 boxes altogether: 35 × $3 = $105.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 70 }, feedback: "Marcus is 3 parts in the first ratio but 4 parts in the second, so you can't just join them as 2 : 3 : 5. Make Marcus's parts match first." },
        { spec: { type: "number", value: 45 }, feedback: "$45 is Wei Ling's share. The question asks for the total profit." },
      ],
      commonError: "Joining the ratios as 2 : 3 : 5 without making Marcus's parts equal.",
      strategy: "Use a bar model",
    },
    {
      kind: "written",
      id: "exam-n2-q21",
      topicId: "angles-polygons",
      guideRef: "parallel-lines",
      difficulty: "core",
      question:
        "In the diagram, AB is parallel to CD. P lies on AB, and Q and R lie on CD. PQ = PR and angle APQ = 64°.\n\nFind the sizes of the angles marked x and y. Give a reason for each step of your working.",
      diagram: `<svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines AB and CD. P is on AB, and Q and R are on CD. Triangle PQR has PQ equal to PR. Angle APQ is 64 degrees, angle QPR is marked x, and the angle between PR and RD is marked y"><rect x="0" y="0" width="460" height="260" fill="#ffffff"/><line x1="30" y1="60" x2="430" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="220" x2="430" y2="220" stroke="#1f2937" stroke-width="2"/><path d="M 92 54 L 100 60 L 92 66" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M 92 214 L 100 220 L 92 226" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="60" x2="162" y2="220" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="60" x2="318" y2="220" stroke="#1f2937" stroke-width="2"/><line x1="194.7" y1="136.9" x2="207.3" y2="143.1" stroke="#1f2937" stroke-width="1.5"/><line x1="272.7" y1="143.1" x2="285.3" y2="136.9" stroke="#1f2937" stroke-width="1.5"/><path d="M 212 60 A 28 28 0 0 0 227.7 85.2" fill="none" stroke="#4338ca" stroke-width="2"/><path d="M 229.5 81.6 A 24 24 0 0 0 250.5 81.6" fill="none" stroke="#b45309" stroke-width="2"/><path d="M 340 220 A 22 22 0 0 0 308.4 200.2" fill="none" stroke="#b45309" stroke-width="2"/><text x="198" y="90" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">64°</text><text x="240" y="106" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text><text x="340" y="192" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><text x="34" y="50" font-size="13" font-family="sans-serif" fill="#1f2937">A</text><text x="420" y="50" font-size="13" font-family="sans-serif" fill="#1f2937">B</text><text x="34" y="242" font-size="13" font-family="sans-serif" fill="#1f2937">C</text><text x="420" y="242" font-size="13" font-family="sans-serif" fill="#1f2937">D</text><text x="240" y="48" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">P</text><text x="158" y="240" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Q</text><text x="322" y="240" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">R</text></svg>`,
      marks: 4,
      modelAnswer:
        "Angle PQR = 64°, because it is alternate to angle APQ and AB is parallel to CD (alternate angles are equal).\n\nTriangle PQR is isosceles with PQ = PR, so its base angles are equal: angle PRQ = 64°.\n\nAngles in a triangle add up to 180°, so x = 180° − 64° − 64° = 52°.\n\nAngles on a straight line add up to 180°, so y = 180° − 64° = 116°.",
      markScheme: [
        { point: "Angle PQR = 64° with the reason: alternate angles (AB parallel to CD)", keywords: ["alternate", "z angle", "parallel"] },
        { point: "Angle PRQ = 64° with the reason: base angles of an isosceles triangle are equal", keywords: ["isosceles", "base angles", "pq = pr", "equal sides"] },
        { point: "x = 52° with the reason: angles in a triangle add up to 180°", keywords: ["52", "triangle", "180"] },
        { point: "y = 116° with the reason: angles on a straight line add up to 180° (or exterior angle = 52° + 64°)", keywords: ["116", "straight line", "exterior angle"] },
      ],
      hints: [
        "Look for a Z-shape between the parallel lines that contains the 64° angle.",
        "PQ = PR tells you that two angles of triangle PQR are equal. Which two?",
        "For y, use the straight line CD at R.",
      ],
      solutions: [
        {
          label: "Finding y with the exterior angle fact",
          steps: [
            "y is an exterior angle of triangle PQR.",
            "An exterior angle equals the sum of the two interior opposite angles: y = x + angle PQR = 52° + 64° = 116°.",
          ],
        },
      ],
      commonError: "Writing “Z angles” or “they look equal” instead of naming the fact: alternate angles are equal.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n2-q22",
      topicId: "constructions-bearings",
      guideRef: "bearings",
      difficulty: "core",
      question:
        "Three buoys, A, B and C, mark out a kayak course off East Coast Park.\n\n- The bearing of B from A is 070°.\n- The bearing of C from B is 160°.\n- AB = BC.\n\nWork out the bearing of A from C.",
      diagram: `<svg viewBox="0 0 340 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sketch of buoys A, B and C with a North line at each. The bearing of B from A is 070 degrees, the bearing of C from B is 160 degrees, and AB equals BC"><rect x="0" y="0" width="340" height="290" fill="#ffffff"/><line x1="70" y1="180" x2="70" y2="110" stroke="#334155" stroke-width="1.5"/><text x="70" y="104" font-size="12" font-family="sans-serif" fill="#334155" text-anchor="middle">N</text><line x1="201.6" y1="132.1" x2="201.6" y2="62" stroke="#334155" stroke-width="1.5"/><text x="201.6" y="56" font-size="12" font-family="sans-serif" fill="#334155" text-anchor="middle">N</text><line x1="249.4" y1="263.7" x2="249.4" y2="195" stroke="#334155" stroke-width="1.5"/><text x="249.4" y="189" font-size="12" font-family="sans-serif" fill="#334155" text-anchor="middle">N</text><line x1="70" y1="180" x2="201.6" y2="132.1" stroke="#1f2937" stroke-width="2"/><line x1="201.6" y1="132.1" x2="249.4" y2="263.7" stroke="#1f2937" stroke-width="2"/><line x1="133.4" y1="149.5" x2="138.2" y2="162.6" stroke="#1f2937" stroke-width="1.5"/><line x1="218.9" y1="200.3" x2="232.1" y2="195.5" stroke="#1f2937" stroke-width="1.5"/><path d="M 70 154 A 26 26 0 0 1 94.4 171.1" fill="none" stroke="#4338ca" stroke-width="2"/><path d="M 201.6 110.1 A 22 22 0 0 1 209.1 152.8" fill="none" stroke="#b45309" stroke-width="2"/><text x="96" y="146" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">070°</text><text x="246" y="128" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">160°</text><circle cx="70" cy="180" r="3.5" fill="#1f2937"/><circle cx="201.6" cy="132.1" r="3.5" fill="#1f2937"/><circle cx="249.4" cy="263.7" r="3.5" fill="#1f2937"/><text x="58" y="198" font-size="14" font-family="sans-serif" fill="#1f2937" font-weight="bold">A</text><text x="186" y="124" font-size="14" font-family="sans-serif" fill="#1f2937" font-weight="bold">B</text><text x="260" y="280" font-size="14" font-family="sans-serif" fill="#1f2937" font-weight="bold">C</text></svg>`,
      answer: { type: "number", value: 295, display: "295°" },
      hints: [
        "Start with the North line at B. What is the bearing of A from B?",
        "Use the bearing of A from B and the bearing of C from B to find angle ABC.",
        "Triangle ABC is isosceles (AB = BC). Find angle BCA, then turn from the direction of B to the direction of A.",
      ],
      solution: [
        "Bearing of A from B = 070° + 180° = 250° (the back bearing).",
        "Angle ABC = 250° − 160° = 90°.",
        "AB = BC, so triangle ABC is isosceles: angle BCA = angle BAC = (180° − 90°) ÷ 2 = 45°.",
        "Bearing of B from C = 160° + 180° = 340°.",
        "Seen from C, A is 45° anticlockwise from B, so the bearing of A from C = 340° − 45° = 295°.",
      ],
      solutions: [
        {
          label: "Go via the bearing of C from A",
          steps: [
            "Angle BAC = 45°, and seen from A, C is clockwise from B.",
            "Bearing of C from A = 070° + 45° = 115°.",
            "Reverse it: bearing of A from C = 115° + 180° = 295°.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 115 }, feedback: "115° is the bearing of C from A. You need the bearing of A from C — the opposite direction, so add 180°." },
        { spec: { type: "number", value: 340 }, feedback: "340° is the bearing of B from C. You still need to turn through angle BCA to face A." },
      ],
      commonError: "Answering with the bearing of C from A instead of A from C.",
      strategy: "Draw a diagram",
    },
    {
      kind: "written",
      id: "exam-n2-q23",
      topicId: "statistics",
      guideRef: "choosing-and-misleading",
      difficulty: "core",
      question:
        "A drinks stall changed its recipe for teh halia (ginger tea). It put this chart on its noticeboard with the headline: “New recipe — sales have TRIPLED!”\n\n(a) Explain why the chart is misleading.\n\n(b) Work out the actual percentage increase in weekly sales.",
      diagram: `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of cups of teh halia sold per week. The vertical axis starts at 380 and goes up to 450. The old recipe bar reaches 400 and the new recipe bar reaches 440, so the new bar looks three times as tall"><rect x="0" y="0" width="360" height="250" fill="#ffffff"/><text x="195" y="18" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Cups of teh halia sold per week</text><line x1="60" y1="30" x2="60" y2="210" stroke="#1f2937" stroke-width="1.5"/><line x1="60" y1="210" x2="330" y2="210" stroke="#1f2937" stroke-width="1.5"/><line x1="55" y1="210" x2="60" y2="210" stroke="#1f2937"/><line x1="55" y1="184.3" x2="60" y2="184.3" stroke="#1f2937"/><line x1="55" y1="158.6" x2="60" y2="158.6" stroke="#1f2937"/><line x1="55" y1="132.9" x2="60" y2="132.9" stroke="#1f2937"/><line x1="55" y1="107.1" x2="60" y2="107.1" stroke="#1f2937"/><line x1="55" y1="81.4" x2="60" y2="81.4" stroke="#1f2937"/><line x1="55" y1="55.7" x2="60" y2="55.7" stroke="#1f2937"/><line x1="55" y1="30" x2="60" y2="30" stroke="#1f2937"/><text x="50" y="214" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">380</text><text x="50" y="188.3" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">390</text><text x="50" y="162.6" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">400</text><text x="50" y="136.9" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">410</text><text x="50" y="111.1" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">420</text><text x="50" y="85.4" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">430</text><text x="50" y="59.7" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">440</text><text x="50" y="34" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">450</text><rect x="100" y="158.6" width="70" height="51.4" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="220" y="55.7" width="70" height="154.3" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><text x="135" y="228" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Old recipe</text><text x="255" y="228" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">New recipe</text><text x="16" y="124" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 124)">Cups sold</text></svg>`,
      marks: 3,
      modelAnswer:
        "(a) The vertical axis starts at 380 instead of 0, so the bars only show the part of the sales above 380. The old bar shows 20 cups' worth of height and the new bar shows 60, so the new bar looks three times as tall. In fact sales went from 400 to 440 cups a week. Tripling would mean 3 × 400 = 1200 cups.\n\n(b) The increase is 440 − 400 = 40 cups. As a percentage of the original: {{40/400}} = {{1/10}} = 10%.",
      markScheme: [
        { point: "The vertical axis does not start at zero (it starts at 380)", keywords: ["zero", "380", "axis", "start", "truncated", "cut off"] },
        { point: "So bar heights are not in proportion: the new bar looks 3 times as tall, but 440 is nowhere near 3 × 400 = 1200", keywords: ["three times", "3 times", "1200", "taller", "height", "proportion", "not triple"] },
        { point: "Actual increase: 40 cups out of 400, which is 10%", keywords: ["10%", "10 percent", "40/400", "1/10"] },
      ],
      hints: [
        "Look at the number at the bottom of the vertical axis.",
        "Read off the actual sales for each recipe. Is 440 three times 400?",
        "Percentage increase = increase ÷ original × 100.",
      ],
      commonError: "Saying “the bars are different colours” or “there is no key” — the real problem is the axis that doesn't start at zero.",
      strategy: "Estimate first",
    },
    {
      kind: "written",
      id: "exam-n2-q24",
      topicId: "probability",
      guideRef: "sample-spaces",
      difficulty: "core",
      question:
        "Arjun and Mei play a game with two ordinary fair six-sided dice. They roll both dice and work out the difference between the two scores (the bigger score minus the smaller one, or 0 if the scores are equal).\n\n- Arjun wins if the difference is 0 or 1.\n- Mei wins if the difference is 2 or more.\n\nArjun says: “The possible differences are 0, 1, 2, 3, 4 and 5. Mei wins with four of the six, so the probability that Mei wins is {{4/6}}.”\n\n(a) Use a sample space diagram to find the correct probability that Mei wins.\n\n(b) Explain what is wrong with Arjun's reasoning, and say whether the game is fair.",
      marks: 4,
      modelAnswer:
        "(a) A 6 × 6 sample space shows all 36 equally likely outcomes. Each cell is the difference between the scores:\n\n| Dice | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| **1** | 0 | 1 | 2 | 3 | 4 | 5 |\n| **2** | 1 | 0 | 1 | 2 | 3 | 4 |\n| **3** | 2 | 1 | 0 | 1 | 2 | 3 |\n| **4** | 3 | 2 | 1 | 0 | 1 | 2 |\n| **5** | 4 | 3 | 2 | 1 | 0 | 1 |\n| **6** | 5 | 4 | 3 | 2 | 1 | 0 |\n\nA difference of 0 appears 6 times and a difference of 1 appears 10 times, so Arjun wins in 16 outcomes and Mei wins in 36 − 16 = 20 outcomes. P(Mei wins) = {{20/36 = 5/9}}.\n\n(b) The six differences are not equally likely (a difference of 1 happens 10 times but a difference of 5 only twice), so Arjun can't just count the differences. The game is not fair: Mei is more likely to win, because {{5/9}} is more than Arjun's {{4/9}}.",
      markScheme: [
        { point: "Uses a sample space of 36 equally likely outcomes (a 6 × 6 grid of differences)", keywords: ["36", "grid", "table", "sample space"] },
        { point: "Counts correctly: 16 outcomes with a difference of 0 or 1 (or 20 with a difference of 2 or more)", keywords: ["16", "20"] },
        { point: "P(Mei wins) = 20/36 = 5/9", keywords: ["20/36", "5/9"] },
        { point: "Explains the differences are not equally likely, and concludes the game is not fair (it favours Mei)", keywords: ["not equally likely", "equally likely", "not fair", "unfair", "4/9", "favours mei"] },
      ],
      hints: [
        "Draw a 6 × 6 grid: one die across the top, the other down the side. Fill in the difference in each cell.",
        "Are the six differences equally likely? Count how many cells show 1, and how many show 5.",
        "Count the cells where Mei wins and divide by 36.",
      ],
      commonError: "Treating the six possible differences as equally likely outcomes.",
      strategy: "Draw a diagram",
    },

    // ======================= CHALLENGE (q25–q30) ======================
    {
      kind: "short",
      id: "exam-n2-q25",
      topicId: "averages-spread",
      guideRef: "mean-median-mode-range",
      difficulty: "challenge",
      question:
        "Five whole numbers have:\n\n- a mean of 6\n- a median of 5\n- a mode of 3\n- a range of 8.\n\nFind the five numbers. Write them in order, smallest first.",
      answer: { type: "list", values: [3, 3, 5, 8, 11], ordered: true, display: "3, 3, 5, 8, 11" },
      hints: [
        "The mean is 6. What must the five numbers add up to?",
        "Put the numbers in order. Which position holds the median? Where must the 3s go?",
        "The range tells you the biggest number once you know the smallest. The total then gives the last one.",
      ],
      solution: [
        "Total = 5 × 6 = 30.",
        "In order, the middle (3rd) number is the median: 5.",
        "The mode is 3, so 3 appears more than once. Three 3s would make the median 3, so there are exactly two — and as 3 is less than 5, they are the 1st and 2nd numbers.",
        "Range 8: the largest number is 3 + 8 = 11.",
        "4th number = 30 − (3 + 3 + 5 + 11) = 8.",
        "Check: 3, 3, 5, 8, 11 has total 30 (mean 6), median 5, mode 3 and range 11 − 3 = 8 ✓",
      ],
      traps: [
        { spec: { type: "list", values: [11, 8, 5, 3, 3], ordered: true }, feedback: "Right numbers — now write them in order, smallest first." },
      ],
      commonError: "Forgetting that the numbers must be in order, so the two 3s have to come before the median.",
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-n2-q26",
      topicId: "linear-graphs",
      guideRef: "gradient-intercept",
      difficulty: "challenge",
      question:
        "The diagram shows the lines y = 2x + 1 and y = 7 − x. They cross at the point P. The two lines and the y-axis enclose the shaded triangle.\n\nWork out the area of the shaded triangle.",
      diagram: `<svg viewBox="0 0 270 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Axes with the lines y = 2x + 1 and y = 7 − x crossing at P. The triangle between the two lines and the y-axis is shaded"><rect x="0" y="0" width="270" height="300" fill="#ffffff"/><polygon points="50,240 50,60 110,120" fill="#fde68a" stroke="none"/><line x1="20" y1="270" x2="252" y2="270" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="295" x2="50" y2="20" stroke="#1f2937" stroke-width="1.5"/><text x="258" y="274" font-size="13" font-family="sans-serif" fill="#1f2937">x</text><text x="56" y="18" font-size="13" font-family="sans-serif" fill="#1f2937">y</text><text x="42" y="286" font-size="12" font-family="sans-serif" fill="#334155" text-anchor="end">O</text><line x1="35" y1="270" x2="155" y2="30" stroke="#4338ca" stroke-width="2"/><line x1="35" y1="45" x2="230" y2="240" stroke="#b45309" stroke-width="2"/><circle cx="110" cy="120" r="3.5" fill="#1f2937"/><text x="118" y="114" font-size="14" font-family="sans-serif" fill="#1f2937" font-weight="bold">P</text><text x="162" y="40" font-size="13" font-family="sans-serif" fill="#4338ca">y = 2x + 1</text><text x="182" y="246" font-size="13" font-family="sans-serif" fill="#b45309" text-anchor="end">y = 7 − x</text></svg>`,
      answer: { type: "number", value: 6, display: "6 square units" },
      hints: [
        "Where does each line cross the y-axis? That gives you one side of the triangle.",
        "At P the two lines have the same y-value, so solve 2x + 1 = 7 − x.",
        "Use the side on the y-axis as the base. The height is how far P is from the y-axis.",
      ],
      solution: [
        "y = 2x + 1 crosses the y-axis at (0, 1); y = 7 − x crosses it at (0, 7).",
        "So the side of the triangle on the y-axis has length 7 − 1 = 6.",
        "At P: 2x + 1 = 7 − x, so 3x = 6 and x = 2. Then y = 2 × 2 + 1 = 5, so P is (2, 5). (Check with the other line: 7 − 2 = 5 ✓)",
        "Taking the side on the y-axis as the base, the perpendicular height is the distance from P to the y-axis, which is 2.",
        "Area = {{1/2}} × 6 × 2 = 6 square units.",
      ],
      traps: [
        { spec: { type: "number", value: 12 }, feedback: "Area of a triangle = {{1/2}} × base × height. You forgot the half." },
        { spec: { type: "number", value: 15 }, feedback: "The height must be at right angles to the base. The base is on the y-axis, so the height is P's x-coordinate (2), not its y-coordinate." },
      ],
      commonError: "Using the y-coordinate of P as the height of the triangle.",
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-n2-q27",
      topicId: "angles-polygons",
      guideRef: "polygon-angles",
      difficulty: "challenge",
      question:
        "ABCDE is a regular pentagon. ABF is an equilateral triangle drawn inside the pentagon, and F is joined to C, as shown.\n\nWork out the size of angle FCD.",
      diagram: `<svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regular pentagon ABCDE with an equilateral triangle ABF drawn inside it on side AB. F is joined to C, and angle FCD is marked with a question mark"><rect x="0" y="0" width="340" height="300" fill="#ffffff"/><polygon points="100,270 240,270 283.3,136.9 170,54.6 56.7,136.9" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><polygon points="100,270 240,270 170,148.8" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="170" y1="148.8" x2="283.3" y2="136.9" stroke="#1f2937" stroke-width="2"/><path d="M 253.4 140 A 30 30 0 0 1 259 119.2" fill="none" stroke="#b45309" stroke-width="2"/><text x="239" y="130" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">?</text><text x="92" y="288" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="248" y="288" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="296" y="141" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="170" y="44" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text><text x="44" y="141" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">E</text><text x="160" y="142" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">F</text></svg>`,
      answer: { type: "number", value: 42, display: "42°" },
      hints: [
        "What is each interior angle of a regular pentagon?",
        "Angle FBC = angle ABC − angle ABF. Also BF = BA = BC — so what kind of triangle is FBC?",
        "Find angle BCF in the isosceles triangle FBC, then subtract it from angle BCD.",
      ],
      solution: [
        "Each interior angle of a regular pentagon is (5 − 2) × 180° ÷ 5 = 108°.",
        "Angle ABF = 60° (equilateral triangle), so angle FBC = 108° − 60° = 48°.",
        "BF = AB (equilateral triangle) and AB = BC (regular pentagon), so BF = BC: triangle FBC is isosceles.",
        "Its base angles are equal: angle BCF = (180° − 48°) ÷ 2 = 66°.",
        "Angle FCD = angle BCD − angle BCF = 108° − 66° = 42°.",
      ],
      traps: [
        { spec: { type: "number", value: 48 }, feedback: "48° is angle FBC. Keep going: BF = BC, so triangle FBC is isosceles." },
        { spec: { type: "number", value: 66 }, feedback: "66° is angle BCF. Angle FCD is what is left of the pentagon's 108° angle at C." },
      ],
      commonError: "Not noticing that BF = BC, so triangle FBC is isosceles.",
      strategy: "Spot the isosceles triangle",
    },
    {
      kind: "short",
      id: "exam-n2-q28",
      topicId: "factors-multiples",
      guideRef: "hcf-lcm-problems",
      difficulty: "challenge",
      question:
        "Wei Ling is counting the ang ku kueh on her family's stall. When she counts them in 2s, 3s, 4s, 5s or 6s, there is always exactly 1 left over. When she counts them in 7s, there are none left over.\n\nWhat is the smallest number of ang ku kueh she could have?",
      answer: { type: "number", value: 301 },
      hints: [
        "If there is 1 left over every time, what can you say about the number take away 1?",
        "The number take away 1 is a common multiple of 2, 3, 4, 5 and 6. What is their lowest common multiple?",
        "So the number is one of 61, 121, 181, 241, … Which is the first one that is a multiple of 7?",
      ],
      solution: [
        "Taking away the 1 left over gives a number that 2, 3, 4, 5 and 6 all divide exactly.",
        "LCM(2, 3, 4, 5, 6) = {{2^2 * 3 * 5}} = 60. So the number is 1 more than a multiple of 60: 61, 121, 181, 241, 301, …",
        "Test each one for 7: 61 = 7 × 8 + 5, 121 = 7 × 17 + 2, 181 = 7 × 25 + 6, 241 = 7 × 34 + 3, 301 = 7 × 43 ✓",
        "The smallest possible number is 301.",
      ],
      solutions: [
        {
          label: "Track the remainders",
          steps: [
            "60 = 7 × 8 + 4, so each extra 60 adds 4 to the remainder when you divide by 7.",
            "The remainders of 61, 121, 181, 241, 301 on dividing by 7 go 5, then 5 + 4 = 9 → 2, then 6, then 10 → 3, then 7 → 0.",
            "So 1 + 5 × 60 = 301 is the first that 7 divides exactly.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 61 }, feedback: "61 does leave 1 when divided by 2, 3, 4, 5 and 6 — but 61 ÷ 7 = 8 remainder 5. Keep going up in 60s." },
        { spec: { type: "number", value: 721 }, feedback: "721 works (2 × 3 × 4 × 5 × 6 + 1 = 721 = 7 × 103), but it isn't the smallest. The numbers that leave 1 come every LCM(2, 3, 4, 5, 6) = 60, not every 720." },
      ],
      commonError: "Using the product 2 × 3 × 4 × 5 × 6 = 720 instead of the LCM, 60.",
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-n2-q29",
      topicId: "sequences-graphs",
      guideRef: "is-it-a-term",
      difficulty: "challenge",
      question:
        "Two sequences continue in the same way for ever:\n\n- Sequence P: 3, 7, 11, 15, 19, …\n- Sequence Q: 2, 9, 16, 23, 30, …\n\nSome numbers appear in both sequences. How many numbers less than 500 appear in both?",
      answer: { type: "number", value: 18 },
      hints: [
        "Write out a few more terms of each sequence. What is the first number that appears in both?",
        "After the first shared number, how far is it to the next one? The jump must be a multiple of 4 *and* a multiple of 7.",
        "The shared numbers go 23, 51, 79, … — up in 28s. How many of these are less than 500? Don't forget the first one.",
      ],
      solution: [
        "P goes up in 4s (nth term 4n − 1) and Q goes up in 7s (nth term 7n − 5).",
        "Listing terms: P is 3, 7, 11, 15, 19, 23, … and Q is 2, 9, 16, 23, … The first shared number is 23.",
        "To stay in both sequences you must jump a multiple of 4 and a multiple of 7, so the shared numbers go up in LCM(4, 7) = 28s: 23, 51, 79, …",
        "The shared numbers are 23 + 28k. The largest below 500 is 23 + 28 × 17 = 499 (and 499 = 4 × 125 − 1 = 7 × 72 − 5 ✓).",
        "k can be 0, 1, 2, …, 17, which is 18 values. So 18 numbers less than 500 appear in both.",
      ],
      traps: [
        { spec: { type: "number", value: 17 }, feedback: "Fencepost slip: 23 + 28k for k = 0, 1, …, 17 gives 18 numbers, not 17. Don't forget the first one, 23." },
        { spec: { type: "number", value: 499 }, feedback: "499 is the largest number below 500 in both sequences. The question asks *how many* such numbers there are." },
      ],
      commonError: "Counting 17 instead of 18 by leaving out k = 0 (the number 23 itself).",
      strategy: "Find a pattern",
    },
    {
      kind: "written",
      id: "exam-n2-q30",
      topicId: "factors-multiples",
      guideRef: "factors-multiples-primes",
      difficulty: "challenge",
      question:
        "Ravi multiplies three consecutive whole numbers. For example, 4 × 5 × 6 = 120 = 6 × 20.\n\n(a) Explain why the product of **any** three consecutive whole numbers is a multiple of 6.\n\n(b) Ravi then says: “The product is always a multiple of 12 as well.” Show that Ravi is wrong.",
      marks: 4,
      modelAnswer:
        "(a) Even numbers come every second number, so at least one of any three consecutive whole numbers is even. That makes the product a multiple of 2.\n\nMultiples of 3 come every third number, so exactly one of any three consecutive whole numbers is a multiple of 3. That makes the product a multiple of 3 too.\n\n2 and 3 are different primes, so a number with both 2 and 3 as factors has 2 × 3 = 6 as a factor. So the product is always a multiple of 6.\n\n(b) 1 × 2 × 3 = 6, which is not a multiple of 12. (Another counterexample: 5 × 6 × 7 = 210, and 210 ÷ 12 = 17.5.) One counterexample is enough to show that Ravi is wrong.",
      markScheme: [
        { point: "At least one of the three numbers is even, so the product is a multiple of 2", keywords: ["even", "multiple of 2", "every second", "every other", "divisible by 2"] },
        { point: "Exactly one of any three consecutive numbers is a multiple of 3, so the product is a multiple of 3", keywords: ["multiple of 3", "every third", "divisible by 3", "one of them"] },
        { point: "Since 6 = 2 × 3 (and 2 and 3 are different primes), the product is a multiple of 6", keywords: ["2 × 3", "2 x 3", "2*3", "prime", "both"] },
        { point: "Gives a counterexample to Ravi, e.g. 1 × 2 × 3 = 6 or 5 × 6 × 7 = 210, which is not a multiple of 12", keywords: ["1 × 2 × 3", "1x2x3", "1 x 2 x 3", "210", "counterexample", "not a multiple of 12"] },
      ],
      hints: [
        "Among any three whole numbers in a row, how many must be even?",
        "Among any three whole numbers in a row, how many must be multiples of 3?",
        "For part (b), try the very smallest examples. To show that an “always” claim is wrong, one counterexample is enough.",
      ],
      solutions: [
        {
          label: "Think about remainders",
          steps: [
            "Divide n, n + 1 and n + 2 by 3: their remainders are 0, 1 and 2 in some order, so exactly one of them is a multiple of 3.",
            "Divide them by 2: the remainders alternate 0, 1, 0 or 1, 0, 1, so at least one is a multiple of 2.",
          ],
        },
      ],
      commonError: "Checking a few examples and saying “it works, so it's always true”. Examples can't prove “always” — you need a reason that works for every case.",
      strategy: "Split into cases",
    },
  ],
};
