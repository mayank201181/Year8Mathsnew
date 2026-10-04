// Powers of 10 & Standard Form — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, tables/diagrams and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "standard-form-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "standard-form-p3-q01",
        question:
          "A single grain of rice has a mass of about 0.02 g. For a science experiment, Wei Ling counts out 1000 grains. About what is their total mass? Give your answer in grams.",
        answer: { type: "number", value: 20, display: "20 g" },
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "That's 0.02 × 100. Multiplying by 1000 moves every digit **three** places to the left: 0.02 → 0.2 → 2 → 20." },
          { spec: { type: "number", value: 0.00002 }, feedback: "You divided by 1000. A thousand grains must weigh *more* than one grain, so multiply." },
        ],
        solution: [
          "1000 grains weigh 1000 times as much as one grain, so work out 0.02 × 1000.",
          "Multiplying by 1000 moves each digit 3 places to the left.",
          "0.02 × 1000 = 20, so the grains have a mass of about 20 g.",
        ],
        difficulty: "warmup",
        guideRef: "multiplying-dividing-by-powers-of-ten",
        hints: ["Should the total be bigger or smaller than 0.02 g? How many places do the digits move when you multiply by 1000?"],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q02",
        question: "A leaking tap drips 0.01 litres of water every second. How many seconds does it take to fill a 3.5-litre jug?",
        answer: { type: "number", value: 350, display: "350 seconds" },
        traps: [
          { spec: { type: "number", value: 0.035 }, feedback: "You multiplied by 0.01. Filling a jug drip by drip takes *many* seconds — dividing by 0.01 makes the number bigger." },
          { spec: { type: "number", value: 35 }, feedback: "Dividing by 0.01 is the same as multiplying by 100, not by 10. Check: 35 seconds × 0.01 litres is only 0.35 litres." },
        ],
        solution: [
          "You need 3.5 ÷ 0.01: how many hundredths of a litre fit into 3.5 litres?",
          "There are 100 hundredths in every 1, so dividing by 0.01 is the same as multiplying by 100.",
          "3.5 × 100 = 350 seconds.",
        ],
        commonError: "Thinking that dividing always makes a number smaller. Dividing by a number between 0 and 1 makes a positive number bigger.",
        difficulty: "warmup",
        guideRef: "multiplying-dividing-by-powers-of-ten",
        hints: ["Each second adds 0.01 litres. How many lots of 0.01 make 3.5?"],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "standard-form-p3-q03",
        question:
          "Scientists use prefixes to stand for powers of 10.\n\n| Prefix | Symbol | Means |\n|---|---|---|\n| kilo | k | {{10^3}} |\n| mega | M | {{10^6}} |\n| giga | G | {{10^9}} |\n\nA floating solar farm on a Singapore reservoir can produce up to 60 MW (60 megawatts). How many watts is that? Give your answer as an ordinary number.",
        answer: { type: "number", value: 60000000, display: "60 000 000 W" },
        traps: [
          { spec: { type: "number", value: 60000 }, feedback: "That would be 60 kilowatts. Mega means {{10^6}} — a million — so 60 MW = 60 × 1 000 000 W." },
          { spec: { type: "number", value: 360 }, feedback: "{{10^6}} does not mean 6. It means 1 followed by six zeros: 1 000 000." },
        ],
        solution: [
          "Mega means {{10^6}} = 1 000 000.",
          "60 MW = 60 × 1 000 000 W = 60 000 000 W.",
          "(In standard form that is {{6 * 10^7}} W.)",
        ],
        difficulty: "warmup",
        guideRef: "powers-of-ten",
        hints: ["Look up what mega means in the table, then write {{10^6}} as an ordinary number."],
        strategy: "Use place value",
      },
      {
        kind: "short",
        id: "standard-form-p3-q04",
        question: "In 2023, Changi Airport handled about 59 million passengers. Write 59 million in standard form.",
        answer: { type: "number", value: 59000000, standardForm: true, display: "{{5.9 * 10^7}}" },
        traps: [
          { spec: { type: "number", value: 5900000 }, feedback: "A million is {{10^6}}, but 59 million is 59 × {{10^6}}. Rewriting 59 as 5.9 × 10 adds one more power of 10: {{5.9 * 10^7}}." },
          { spec: { type: "number", value: 590000000 }, feedback: "Count again: the point moves 7 places to get from 59 000 000 to 5.9, so the power is 7." },
        ],
        solution: [
          "59 million = 59 000 000.",
          "Put the decimal point after the first digit: A = 5.9.",
          "From 59 000 000 to 5.9 the point moves 7 places, so the power is 7.",
          "59 million = {{5.9 * 10^7}}.",
        ],
        solutions: [
          { label: "Using powers of 10", steps: ["59 million = 59 × {{10^6}}.", "59 = 5.9 × 10, so this is 5.9 × 10 × {{10^6}} = {{5.9 * 10^7}}."] },
        ],
        commonError: "Writing {{59 * 10^6}}. It has the right value, but A must be at least 1 and less than 10.",
        difficulty: "warmup",
        guideRef: "large-numbers",
        hints: ["Write 59 million out in full first. Then move the point so that only one non-zero digit is in front of it."],
        strategy: "Use place value",
      },
      {
        kind: "written",
        id: "standard-form-p3-q05",
        question:
          "A lab technician measures a cell as 0.000 08 m wide. In her notes she writes the width as {{8 * 10^5}} m.\n\nWithout converting her answer back, explain how you can tell it must be wrong. Then write the width correctly in standard form.",
        marks: 2,
        modelAnswer:
          "The cell is less than 1 m wide (0.000 08 < 1), so in standard form its power of 10 must be negative. {{8 * 10^5}} has a positive power, so it is bigger than 1 — in fact it is 800 000 m, which is far too big for a cell. The 8 is in the hundred-thousandths column, so the width is {{8 * 10^(-5)}} m.",
        markScheme: [
          {
            point: "Explains that a number less than 1 needs a negative power (or that 8 × 10^5 = 800 000 is far too big)",
            keywords: ["negative", "less than 1", "smaller than 1", "800 000", "800000", "too big"],
          },
          { point: "Correct width: 8 × 10^-5 m", keywords: ["10^-5", "10^(-5)", "-5", "−5"] },
        ],
        commonError: "Getting the number of places right but forgetting that a number less than 1 has a negative power.",
        difficulty: "warmup",
        guideRef: "small-numbers",
        hints: ["Is 0.000 08 m bigger or smaller than 1 m? What does that tell you about the sign of the power?"],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q06",
        question:
          "A grain of pollen is about 25 micrometres across. One micrometre is {{10^(-6)}} m. Write the width of the pollen grain in metres, in standard form.",
        answer: { type: "number", value: 0.000025, standardForm: true, display: "{{2.5 * 10^(-5)}} m" },
        traps: [
          {
            spec: { type: "number", value: 0.0000025 },
            feedback: "That's {{2.5 * 10^(-6)}}: you changed 25 to 2.5 but kept the power −6. Making A ten times smaller means the power must go **up** by one: {{25 * 10^(-6) = 2.5 * 10^(-5)}}.",
          },
          {
            spec: { type: "number", value: 2.5e-7, standardForm: true },
            feedback: "The power should go *up* by one (from −6 to −5), not down. A got 10 times smaller, so the power of 10 must make up for it.",
          },
        ],
        solution: [
          "25 micrometres = {{25 * 10^(-6)}} m.",
          "This is not standard form, because 25 is not between 1 and 10.",
          "25 = {{2.5 * 10^1}}, so {{25 * 10^(-6) = 2.5 * 10^1 * 10^(-6) = 2.5 * 10^(-5)}} m.",
        ],
        solutions: [
          {
            label: "Via an ordinary number",
            steps: ["{{10^(-6)}} m = 0.000 001 m, so 25 micrometres = 0.000 025 m.", "Move the point 5 places right to get 2.5: 0.000 025 = {{2.5 * 10^(-5)}} m."],
          },
        ],
        commonError: "Changing 25 to 2.5 but leaving the power as −6, or moving it the wrong way to −7.",
        difficulty: "core",
        guideRef: "small-numbers",
        hints: [
          "Write the width as 25 × (one micrometre) first.",
          "Is {{25 * 10^(-6)}} in standard form? What must be true about A?",
          "25 = 2.5 × 10. Combine that extra 10 with {{10^(-6)}}.",
        ],
        strategy: "Convert units first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q07",
        question:
          "The table shows the approximate masses of some animals.\n\n| Animal | Mass (kg) |\n|---|---|\n| Blue whale | {{1.5 * 10^5}} |\n| Honeybee | {{1 * 10^(-4)}} |\n| Elephant | {{6 * 10^3}} |\n| House mouse | {{2 * 10^(-2)}} |\n| Hummingbird | {{3 * 10^(-3)}} |\n| Ostrich | {{1.2 * 10^2}} |\n\nWhich animal is the **second lightest**? Write its mass in kilograms as an ordinary number.",
        answer: { type: "number", value: 0.003, display: "0.003 kg (the hummingbird)" },
        traps: [
          {
            spec: { type: "number", value: 0.02 },
            feedback: "That's the mouse. Compare the powers: −2 is *greater* than −3, so {{2 * 10^(-2)}} is bigger than {{3 * 10^(-3)}}. The mouse is heavier than the hummingbird.",
          },
          { spec: { type: "number", value: 0.0001 }, feedback: "That's the honeybee — the lightest of all. The question asks for the second lightest." },
        ],
        solution: [
          "Sort by the power of 10 first. The powers are 5, −4, 3, −2, −3 and 2.",
          "In order: −4 (honeybee), −3 (hummingbird), −2 (mouse), 2 (ostrich), 3 (elephant), 5 (blue whale).",
          "The second lightest is the hummingbird: {{3 * 10^(-3)}} kg = 0.003 kg.",
        ],
        commonError: "Thinking {{10^(-2)}} is smaller than {{10^(-3)}} because 2 is less than 3.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "All the numbers are in standard form, so compare the powers of 10 first.",
          "Which is smaller: −2 or −3? The most negative power gives the smallest number.",
          "The lightest has power −4. Which animal has the next power up?",
        ],
        strategy: "Compare powers first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q08",
        question:
          "Ethan uses his calculator to work out how long light takes to cross the 1.8 km Benjamin Sheares Bridge. The display shows:\n\n`6E-06`\n\nThe answer is in seconds. His friend Jun says the display means 6 to the power −6. Write the time correctly as an ordinary number of seconds.",
        answer: { type: "number", value: 0.000006, allowFraction: false, display: "0.000006 seconds" },
        traps: [
          { spec: { type: "number", value: 0.00006 }, feedback: "One place short. In {{6 * 10^(-6)}} the 6 is in the millionths column — the 6th place after the point: 0.000 006." },
          {
            spec: { type: "number", value: 0.0000214, tolerance: 0.0000001 },
            feedback: "That's {{6^(-6)}} — Jun's mistake. On a calculator, E means 'times ten to the power', so `6E-06` means {{6 * 10^(-6)}}.",
          },
        ],
        solution: [
          "E means 'times 10 to the power', so `6E-06` = {{6 * 10^(-6)}}.",
          "{{10^(-6)}} = 0.000 001 (one millionth).",
          "6 × 0.000 001 = 0.000 006 seconds.",
        ],
        commonError: "Reading the E as a power of the first number, or copying `6E-06` down as the final answer.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "What does the E stand for on a calculator display?",
          "`6E-06` means {{6 * 10^(-6)}}. Which place-value column is {{10^(-6)}}?",
          "The 6 must end up in the 6th place after the decimal point.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q09",
        question:
          "A recipe for 100 vegetarian curry puffs uses 2.4 kg of potato. Arjun only wants to make 10 curry puffs, so he multiplies every amount by 0.1. How much potato does he need? Give your answer in grams.",
        answer: { type: "number", value: 240, display: "240 g" },
        traps: [
          { spec: { type: "number", value: 24 }, feedback: "Check both steps. Multiplying by 0.1 is the same as dividing by 10 (not 100), so 2.4 × 0.1 = 0.24 kg. Then 1 kg = 1000 g, so multiply by 1000 (not 100) to get grams." },
          { spec: { type: "number", value: 0.24 }, feedback: "0.24 is the amount in kilograms. 1 kg = 1000 g, so multiply by 1000 to get grams." },
        ],
        solution: [
          "Multiplying by 0.1 is the same as dividing by 10.",
          "2.4 × 0.1 = 0.24 kg.",
          "1 kg = 1000 g, so 0.24 kg = 0.24 × 1000 = 240 g.",
        ],
        solutions: [{ label: "Grams first", steps: ["2.4 kg = 2400 g.", "2400 × 0.1 = 2400 ÷ 10 = 240 g."] }],
        difficulty: "core",
        guideRef: "multiplying-dividing-by-powers-of-ten",
        hints: [
          "What is multiplying by 0.1 the same as?",
          "Find the amount in kilograms first, then convert to grams.",
          "1 kg = 1000 g.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "standard-form-p3-q10",
        question:
          "A grain of sand is about {{10^(-3)}} m across. A virus particle is about {{10^(-7)}} m across. How many times wider is the grain of sand than the virus particle? Give your answer as an ordinary number.",
        answer: { type: "number", value: 10000, display: "10 000 times" },
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "4 is the difference between the powers. The sand grain is {{10^4}} times wider — write {{10^4}} as an ordinary number." },
          { spec: { type: "number", value: 0.0001 }, feedback: "That's upside down. The sand grain is the bigger one, so the answer must be more than 1." },
        ],
        solution: [
          "{{10^(-3)}} = 0.001 and {{10^(-7)}} = 0.000 000 1.",
          "Each step from one power of 10 to the next is a factor of 10. From −7 up to −3 is 4 steps.",
          "So the sand grain is {{10^4}} = 10 000 times wider.",
        ],
        solutions: [{ label: "Index law", steps: ["{{10^(-3) / 10^(-7) = 10^(-3 - (-7)) = 10^4}}.", "{{10^4}} = 10 000."] }],
        commonError: "Giving the difference between the powers (4) as the answer, or dividing the wrong way round.",
        difficulty: "core",
        guideRef: "powers-of-ten",
        hints: [
          "Which is bigger, {{10^(-3)}} or {{10^(-7)}}?",
          "How many ×10 steps take you from {{10^(-7)}} up to {{10^(-3)}}?",
          "4 steps of ×10 is × {{10^4}}.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "written",
        id: "standard-form-p3-q11",
        question:
          "Singapore has a land area of about {{7.4 * 10^2}} km². Russia has a land area of about {{1.7 * 10^7}} km².\n\nMarcus says: \"The powers are 2 and 7, and 7 − 2 = 5, so Russia is about 5 times bigger than Singapore.\"\n\nExplain what is wrong with Marcus's reasoning, and estimate how many times bigger Russia is.",
        marks: 3,
        modelAnswer:
          "Each extra power of 10 is another × 10, so a difference of 5 in the powers means a factor of {{10^5}} = 100 000, not 5. Marcus has also ignored the A parts: Russia's A (1.7) is smaller than Singapore's (7.4), so the factor is less than 100 000. Estimate: (1.7 ÷ 7.4) × 100 000 ≈ 0.23 × 100 000 ≈ 23 000. So Russia is roughly 23 000 times bigger than Singapore, not 5 times.",
        markScheme: [
          {
            point: "A difference of 5 in the powers means × 10^5 (100 000), not × 5",
            keywords: ["100 000", "100000", "10^5", "times 10", "× 10", "x 10"],
          },
          { point: "Takes account of the A values 1.7 and 7.4 (e.g. 1.7 ÷ 7.4 ≈ 0.23)", keywords: ["1.7", "7.4", "0.23", "0.2"] },
          {
            point: "Estimate of about 20 000 to 25 000 times",
            keywords: ["23 000", "23000", "20 000", "20000", "2.3 x 10^4", "2 x 10^4", "22 973", "22973"],
          },
        ],
        commonError: "Treating the difference between the powers as the number of times bigger.",
        difficulty: "core",
        guideRef: "large-numbers",
        hints: [
          "What does each extra power of 10 do to the size of a number?",
          "Write both areas as ordinary numbers and compare them.",
          "Estimate 17 000 000 ÷ 740 — or work out (1.7 ÷ 7.4) × {{10^5}}.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q12",
        question: "A mosquito beats its wings about 500 times every second. How long does one wingbeat take? Give your answer in seconds, in standard form.",
        answer: { type: "number", value: 0.002, standardForm: true, display: "{{2 * 10^(-3)}} s" },
        traps: [
          { spec: { type: "number", value: 500 }, feedback: "500 is the number of beats in one second. One beat takes 1 ÷ 500 of a second — a tiny time." },
          { spec: { type: "number", value: 0.02 }, feedback: "1 ÷ 500 = 0.002, not 0.02. Check: 500 × 0.02 = 10, not 1." },
        ],
        solution: [
          "500 beats take 1 second, so one beat takes 1 ÷ 500 seconds.",
          "1 ÷ 500 = (1 ÷ 5) ÷ 100 = 0.2 ÷ 100 = 0.002 s.",
          "0.002 = {{2 * 10^(-3)}} s.",
        ],
        difficulty: "core",
        guideRef: "small-numbers",
        hints: [
          "If 500 beats take 1 second, what calculation gives the time for one beat?",
          "Work out 1 ÷ 500 as 1 ÷ 5 first, then ÷ 100.",
          "In 0.002 the 2 is in the thousandths column.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "standard-form-p3-q13",
        question:
          "Four friends estimate the thickness of a sheet of kitchen foil, in metres.\n\n| Name | Estimate (m) |\n|---|---|\n| Aisha | 0.00002 |\n| Jun | {{1.8 * 10^(-5)}} |\n| Priya | `2.1E-05` (copied from a calculator) |\n| Marcus | {{19 * 10^(-6)}} |\n\nWhose estimate is the smallest? Write that estimate in standard form.",
        answer: { type: "number", value: 0.000018, standardForm: true, display: "{{1.8 * 10^(-5)}} m (Jun)" },
        traps: [
          {
            spec: { type: "number", value: 0.000019 },
            feedback: "Marcus's {{19 * 10^(-6)}} looks smallest because of the −6, but it isn't in standard form. It equals {{1.9 * 10^(-5)}}, which is bigger than Jun's {{1.8 * 10^(-5)}}.",
          },
          {
            spec: { type: "number", value: 0.0000019 },
            feedback: "19 = 1.9 × 10, so {{19 * 10^(-6)}} = {{1.9 * 10^(-5)}}, not {{1.9 * 10^(-6)}}. Once it is written correctly, it is not the smallest.",
          },
        ],
        solution: [
          "Write every estimate in standard form so they can be compared fairly.",
          "Aisha: 0.00002 = {{2 * 10^(-5)}}. Jun: {{1.8 * 10^(-5)}}. Priya: `2.1E-05` = {{2.1 * 10^(-5)}}.",
          "Marcus: {{19 * 10^(-6)}} = {{1.9 * 10^(-5)}}, because 19 = 1.9 × 10 raises the power by one.",
          "Now all four have power −5, so compare A: 1.8 < 1.9 < 2 < 2.1. Jun's estimate, {{1.8 * 10^(-5)}} m, is the smallest.",
        ],
        commonError: "Choosing {{19 * 10^(-6)}} as smallest just because −6 is the most negative power. Comparing powers only works once every number is in standard form.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "You can't compare them fairly until they are all in the same form.",
          "Rewrite Marcus's estimate so that A is between 1 and 10. What do you notice about the powers now?",
          "All four have power −5. Compare their A values.",
        ],
        strategy: "Convert to the same form",
      },
      {
        kind: "short",
        id: "standard-form-p3-q14",
        question:
          "There are about {{1.1 * 10^6}} HDB flats in Singapore. Suppose each one uses about {{4 * 10^2}} kWh of electricity in a month. Estimate the total electricity used by all the flats in one month. Give your answer in kWh, in standard form.",
        answer: { type: "number", value: 440000000, standardForm: true, display: "{{4.4 * 10^8}} kWh" },
        traps: [
          { spec: { type: "number", value: 4.4e12 }, feedback: "You multiplied the indices (6 × 2). When you multiply powers of 10 you **add** the indices: {{10^6 * 10^2 = 10^8}}." },
          { spec: { type: "number", value: 510000000 }, feedback: "You added the A parts. Multiply them: 1.1 × 4 = 4.4." },
        ],
        solution: [
          "Total = {{(1.1 * 10^6) * (4 * 10^2)}}.",
          "Multiply the A parts: 1.1 × 4 = 4.4.",
          "Multiply the powers of 10 by adding the indices: {{10^6 * 10^2 = 10^8}}.",
          "Total ≈ {{4.4 * 10^8}} kWh. 4.4 is between 1 and 10, so no re-normalising is needed.",
        ],
        solutions: [{ label: "Ordinary numbers", steps: ["1 100 000 × 400 = 440 000 000.", "440 000 000 = {{4.4 * 10^8}} kWh."] }],
        commonError: "Multiplying the indices instead of adding them.",
        difficulty: "core",
        guideRef: "calculating-standard-form",
        hints: [
          "Which operation combines 'each flat uses …' with 'the number of flats'?",
          "Multiply the A parts and the powers of 10 separately.",
          "{{10^6 * 10^2}}: add the indices.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "standard-form-p3-q15",
        question:
          "Siti says: \"If I divide a number by 0.1 and then multiply the answer by 0.01, I always get back to the number I started with.\"\n\nIs Siti right? Explain your answer, using an example.",
        marks: 3,
        modelAnswer:
          "No. Dividing by 0.1 is the same as multiplying by 10 (there are 10 tenths in every 1). Multiplying by 0.01 is the same as dividing by 100. So overall the number is multiplied by 10 and then divided by 100, which is the same as dividing by 10. For example, 50 ÷ 0.1 = 500, and 500 × 0.01 = 5, not 50. To get back to the start she would need to multiply by 0.1 instead.",
        markScheme: [
          {
            point: "Dividing by 0.1 is the same as multiplying by 10",
            keywords: ["× 10", "x 10", "times 10", "multiply by 10", "multiplying by 10", "10 times bigger", "10 tenths"],
          },
          {
            point: "Multiplying by 0.01 is the same as dividing by 100",
            keywords: ["÷ 100", "divide by 100", "dividing by 100", "100 times smaller", "hundredth"],
          },
          {
            point: "Concludes Siti is wrong: overall the number is divided by 10, supported by a correct example",
            keywords: ["no", "wrong", "not right", "divided by 10", "÷ 10", "10 times smaller", "50", "5"],
          },
        ],
        commonError: "Assuming ÷ 0.1 and × 0.01 'cancel out' because both involve small decimals.",
        difficulty: "core",
        guideRef: "multiplying-dividing-by-powers-of-ten",
        hints: [
          "Try it with a number, such as 50.",
          "What single calculation is ÷ 0.1 the same as? And × 0.01?",
          "Combine them: × 10 and then ÷ 100. What is the overall effect?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "standard-form-p3-q16",
        question:
          "Hana's phone has {{1.28 * 10^11}} bytes of storage. She has used {{9.6 * 10^10}} bytes. How many bytes are still free? Give your answer in standard form.",
        answer: { type: "number", value: 32000000000, standardForm: true, display: "{{3.2 * 10^10}} bytes" },
        traps: [
          {
            spec: { type: "number", value: 83200000000 },
            feedback: "You subtracted 1.28 from 9.6 and kept {{10^10}}. The powers are different, so line the numbers up first: {{1.28 * 10^11 = 12.8 * 10^10}}.",
          },
          {
            spec: { type: "number", value: 320000000000 },
            feedback: "{{0.32 * 10^11}} is right — but changing 0.32 to 3.2 makes A ten times bigger, so the power must go **down** by one: {{3.2 * 10^10}}.",
          },
        ],
        solution: [
          "Write both numbers with the same power of 10: {{1.28 * 10^11 = 12.8 * 10^10}}.",
          "Subtract the A parts: 12.8 − 9.6 = 3.2.",
          "Free space = {{3.2 * 10^10}} bytes.",
        ],
        solutions: [
          { label: "Ordinary numbers", steps: ["128 000 000 000 − 96 000 000 000 = 32 000 000 000.", "32 000 000 000 = {{3.2 * 10^10}} bytes."] },
        ],
        commonError: "Subtracting the A parts when the powers of 10 are different.",
        difficulty: "core",
        guideRef: "calculating-standard-form",
        hints: [
          "Can you subtract the A parts straight away when the powers are different?",
          "Rewrite {{1.28 * 10^11}} with power 10 — or write both numbers out in full.",
          "{{1.28 * 10^11 = 12.8 * 10^10}}. Now subtract.",
        ],
        strategy: "Convert to the same form",
      },
      {
        kind: "short",
        id: "standard-form-p3-q17",
        question:
          "A sheet of paper is {{1 * 10^(-4)}} m thick. Each time you fold it in half, the thickness of the pile doubles. Imagine you could keep folding. After how many folds would the pile **first** be thicker than 1 metre?",
        answer: { type: "number", value: 14, display: "14 folds" },
        traps: [
          { spec: { type: "number", value: 13 }, feedback: "After 13 folds the pile is 8192 × {{10^(-4)}} m = 0.8192 m — just under 1 m. One more fold is needed." },
          { spec: { type: "number", value: 4 }, feedback: "Doubling is not the same as multiplying by 10. The pile needs to grow 10 000 times, which takes far more than 4 doublings." },
        ],
        solution: [
          "After k folds the pile is {{2^k * 10^(-4)}} m thick.",
          "1 m = 10 000 × {{10^(-4)}} m, so you need {{2^k}} to be more than 10 000.",
          "{{2^10}} = 1024, so {{2^13}} = 8192 (not enough) and {{2^14}} = 16 384 (enough).",
          "The pile first passes 1 m after 14 folds (it is then about 1.64 m thick).",
        ],
        commonError: "Stopping at 13 folds, when 8192 × {{10^(-4)}} m is still less than 1 m.",
        difficulty: "challenge",
        guideRef: "powers-of-ten",
        hints: [
          "How thick is the pile after 1, 2 and 3 folds? Write each as (a number) × {{10^(-4)}} m.",
          "1 m is how many lots of {{10^(-4)}} m? So how big must the doubling number get?",
          "Find the first power of 2 bigger than 10 000. A useful fact: {{2^10}} = 1024.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "standard-form-p3-q18",
        question:
          "A scientist starts with a dye solution whose concentration is {{2.5 * 10^(-2)}} g per ml. In each dilution step she multiplies the concentration by 0.1. After how many steps is the concentration **first** less than {{1 * 10^(-6)}} g per ml?",
        answer: { type: "number", value: 5, display: "5 steps" },
        traps: [
          {
            spec: { type: "number", value: 4 },
            feedback: "After 4 steps the concentration is {{2.5 * 10^(-6)}}. That has the same power as {{1 * 10^(-6)}}, so compare A: 2.5 > 1, so it is still too strong.",
          },
        ],
        solution: [
          "Multiplying by 0.1 divides by 10, so each step lowers the power of 10 by one and leaves A = 2.5.",
          "After k steps the concentration is {{2.5 * 10^(-2-k)}}.",
          "After 4 steps: {{2.5 * 10^(-6)}}. Same power as the target, and 2.5 > 1, so it is not yet below {{1 * 10^(-6)}}.",
          "After 5 steps: {{2.5 * 10^(-7)}} = 0.000 000 25, which is less than 0.000 001. Answer: 5 steps.",
        ],
        commonError: "Stopping as soon as the power reaches −6, without comparing the A values.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "What happens to the power of 10 each time you multiply by 0.1? What happens to A?",
          "Make a table: after 1 step, 2 steps, 3 steps … with the concentration in standard form.",
          "When the powers are equal, compare the A values.",
        ],
        strategy: "Make a table",
      },
      {
        kind: "written",
        id: "standard-form-p3-q19",
        question:
          "Jun is 13 years old. He claims he has been alive for about {{4 * 10^8}} seconds.\n\nWithout a calculator, show whether his claim is reasonable. Show your estimates clearly.",
        marks: 3,
        modelAnswer:
          "One day has 24 × 60 × 60 = 86 400 seconds. One year has about 86 400 × 365 seconds. Estimate this as 90 000 × 350 = 31 500 000 ≈ {{3.2 * 10^7}} seconds (rounding one number up and the other down keeps the estimate close; the exact value is 31 536 000). In 13 years: 13 × 31 500 000 = 409 500 000 ≈ {{4.1 * 10^8}} seconds. That is very close to {{4 * 10^8}}, so Jun's claim is reasonable.",
        markScheme: [
          {
            point: "Seconds in a day: 24 × 60 × 60 = 86 400 (or about 90 000)",
            keywords: ["86 400", "86400", "3600", "90 000", "90000", "24 x 60 x 60", "24 × 60 × 60"],
          },
          {
            point: "Seconds in a year: about 3 × 10^7 (e.g. 31 500 000 or 31 536 000)",
            keywords: ["31 536 000", "31536000", "31 500 000", "31500000", "3.2 x 10^7", "3 x 10^7", "10^7", "30 000 000"],
          },
          {
            point: "13 years ≈ 4 × 10^8 seconds, so the claim is reasonable",
            keywords: ["4.1 x 10^8", "4.2 x 10^8", "4 x 10^8", "409 500 000", "410 000 000", "400 000 000", "reasonable", "yes", "10^8"],
          },
        ],
        commonError: "Leaving out one of the conversions (often the 60 for minutes or the 24 for hours), which makes the estimate far too small.",
        difficulty: "challenge",
        guideRef: "large-numbers",
        hints: [
          "Break it down: seconds in a minute, minutes in an hour, hours in a day, days in a year.",
          "Round to make the multiplying easy: a day has 86 400 s ≈ 90 000 s, and 365 days ≈ 350 days.",
          "Multiply your seconds-per-year estimate by 13 and compare with {{4 * 10^8}}.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "standard-form-p3-q20",
        question:
          "The Earth's oceans hold about {{1.3 * 10^9}} km³ of water. One cubic kilometre holds {{10^12}} litres. The world population is about {{8 * 10^9}} people.\n\nIf all the ocean water were shared out equally, how many litres would each person get? Give your answer in standard form, correct to 2 significant figures.",
        answer: { type: "number", value: 160000000000, standardForm: true, display: "{{1.6 * 10^11}} litres" },
        traps: [
          { spec: { type: "number", value: 162500000000 }, feedback: "That's the exact value. Now round to 2 significant figures: {{1.625 * 10^11}} ≈ {{1.6 * 10^11}}." },
          {
            spec: { type: "number", value: 1600000000000 },
            feedback: "1.3 ÷ 8 = 0.1625, so you have {{0.1625 * 10^12}}. Changing 0.1625 to 1.625 makes A ten times bigger, so the power must go **down** by one: {{10^11}}.",
          },
        ],
        solution: [
          "Total water in litres: {{1.3 * 10^9 * 10^12 = 1.3 * 10^21}} litres.",
          "Share it between {{8 * 10^9}} people: {{(1.3 * 10^21) / (8 * 10^9)}}.",
          "Divide the A parts: 1.3 ÷ 8 = 0.1625. Subtract the indices: 21 − 9 = 12. That gives {{0.1625 * 10^12}} litres.",
          "Re-normalise: {{0.1625 * 10^12 = 1.625 * 10^11}}.",
          "To 2 significant figures: {{1.6 * 10^11}} litres each.",
        ],
        commonError: "Forgetting to re-normalise {{0.1625 * 10^12}}, or rounding before re-normalising.",
        difficulty: "challenge",
        guideRef: "calculating-standard-form",
        hints: [
          "First turn the ocean's volume into litres. What happens to the powers when you multiply?",
          "Now divide by the number of people: divide the A parts, subtract the indices.",
          "1.3 ÷ 8 = 0.1625 — that isn't between 1 and 10, so re-normalise before you round.",
        ],
        strategy: "Break into steps",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "standard-form-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "standard-form-p4-q01",
        question:
          "Work out:\n\n- (a) 3.6 × 100\n- (b) 3.6 ÷ 0.1\n- (c) 3.6 × 0.01\n\nGive your three answers in order, separated by commas.",
        answer: { type: "list", values: [360, 36, 0.036], ordered: true, display: "360, 36, 0.036" },
        traps: [
          {
            spec: { type: "list", values: [360, 0.36, 0.036], ordered: true },
            feedback: "Check (b): dividing by 0.1 is the same as multiplying by 10, so 3.6 ÷ 0.1 = 36 — the answer gets bigger.",
          },
          {
            spec: { type: "list", values: [360, 36, 0.36], ordered: true },
            feedback: "Check (c): multiplying by 0.01 is the same as dividing by **100**, so 3.6 × 0.01 = 0.036.",
          },
        ],
        solution: [
          "(a) × 100 moves the digits 2 places to the left: 3.6 × 100 = 360.",
          "(b) ÷ 0.1 is the same as × 10: 3.6 ÷ 0.1 = 36.",
          "(c) × 0.01 is the same as ÷ 100: 3.6 × 0.01 = 0.036.",
        ],
        difficulty: "warmup",
        guideRef: "multiplying-dividing-by-powers-of-ten",
        hints: ["For (b) and (c), first rewrite each one as × or ÷ by 10 or 100."],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "standard-form-p4-q02",
        question:
          "Here is part of a table of powers of 10.\n\n| Power of 10 | {{10^3}} | {{10^1}} | {{10^0}} | {{10^(-1)}} | {{10^(-3)}} |\n|---|---|---|---|---|---|\n| Ordinary number | 1000 | **P** | 1 | **Q** | **R** |\n\nFind the values of P, Q and R. Give them in that order, separated by commas.",
        answer: { type: "list", values: [10, 0.1, 0.001], ordered: true, display: "P = 10, Q = 0.1, R = 0.001" },
        traps: [
          {
            spec: { type: "list", values: [10, -10, -1000], ordered: true },
            feedback: "A negative power does not make a negative number. {{10^(-1)}} = {{1/10}} = 0.1 and {{10^(-3)}} = {{1/1000}} = 0.001.",
          },
          {
            spec: { type: "list", values: [10, 0.1, 0.0001], ordered: true },
            feedback: "Check R: {{10^(-3)}} = {{1/1000}} = 0.001, with the 1 in the thousandths column (the 3rd place after the point).",
          },
        ],
        solution: [
          "Each time the power goes down by 1, the number is divided by 10. (Careful: this table skips {{10^2}} and {{10^(-2)}}, so not every step between columns is ÷ 10.)",
          "P: {{10^1}} = 10.",
          "Q: {{10^(-1)}} = 1 ÷ 10 = 0.1.",
          "R: {{10^(-3)}} = 1 ÷ 1000 = 0.001.",
        ],
        difficulty: "warmup",
        guideRef: "powers-of-ten",
        hints: ["Each time the power goes down by 1, divide by 10. Start from {{10^0}} = 1 and keep dividing — and look closely at the powers, because the table skips some."],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "standard-form-p4-q03",
        question: "The National Stadium in Singapore can seat {{5.5 * 10^4}} people. Write this number as an ordinary number.",
        answer: { type: "number", value: 55000, display: "55 000" },
        traps: [
          { spec: { type: "number", value: 550000 }, feedback: "Writing 55 and then four zeros gives 550 000 — ten times too big. {{10^4}} moves the decimal point 4 places: 5.5 → 55 000." },
          { spec: { type: "number", value: 5500 }, feedback: "That's only 3 places. {{10^4}} = 10 000, and 5.5 × 10 000 = 55 000." },
        ],
        solution: ["{{10^4}} = 10 000.", "5.5 × 10 000: move the point 4 places to the right.", "5.5 → 55 → 550 → 5500 → 55 000."],
        difficulty: "warmup",
        guideRef: "large-numbers",
        hints: ["Multiplying by {{10^4}} moves the point 4 places. 5.5 already has one digit after the point — count carefully."],
        strategy: "Use place value",
      },
      {
        kind: "short",
        id: "standard-form-p4-q04",
        question: "A large raindrop has a mass of about 0.000 034 kg. Write this mass in standard form.",
        answer: { type: "number", value: 0.000034, standardForm: true, display: "{{3.4 * 10^(-5)}} kg" },
        traps: [
          {
            spec: { type: "number", value: 0.0000034 },
            feedback: "Count how many places the point moves to turn 0.000 034 into 3.4: it is 5 places, so the power is −5.",
          },
          { spec: { type: "number", value: 340000 }, feedback: "The mass is less than 1 kg, so the power must be negative: {{3.4 * 10^(-5)}}, not {{3.4 * 10^5}}." },
        ],
        solution: [
          "A must be between 1 and 10, so A = 3.4.",
          "The point moves 5 places to the right to go from 0.000 034 to 3.4.",
          "The number is less than 1, so the power is negative: {{3.4 * 10^(-5)}} kg.",
        ],
        commonError: "Writing {{3.4 * 10^5}} — a positive power would make the raindrop 340 000 kg.",
        difficulty: "warmup",
        guideRef: "small-numbers",
        hints: ["Where must the point go so that A is between 1 and 10? How many places does it move, and is the number bigger or smaller than 1?"],
        strategy: "Use place value",
      },
      {
        kind: "written",
        id: "standard-form-p4-q05",
        question: "Ravi says: \"{{9 * 10^(-4)}} is bigger than {{4.1 * 10^(-3)}}, because 9 is bigger than 4.1.\"\n\nIs Ravi right? Explain your answer.",
        marks: 2,
        modelAnswer:
          "No. To compare numbers in standard form you compare the powers of 10 first, and only compare A when the powers are equal. −3 is greater than −4, so {{4.1 * 10^(-3)}} is the bigger number. As ordinary numbers, {{4.1 * 10^(-3)}} = 0.0041 and {{9 * 10^(-4)}} = 0.0009, and 0.0041 > 0.0009.",
        markScheme: [
          {
            point: "Says Ravi is wrong because the powers must be compared first (−3 is greater than −4)",
            keywords: ["no", "wrong", "power", "-3", "−3", "compare the powers"],
          },
          { point: "Supports this with ordinary numbers: 0.0041 > 0.0009", keywords: ["0.0041", "0.0009"] },
        ],
        commonError: "Comparing only the A values when the powers of 10 are different.",
        difficulty: "warmup",
        guideRef: "comparing-standard-form",
        hints: ["Write both numbers as ordinary numbers and compare them."],
        strategy: "Convert to the same form",
      },
      {
        kind: "short",
        id: "standard-form-p4-q06",
        question:
          "Find the missing numbers.\n\n- (a) 7.2 × ☐ = 0.072\n- (b) 7.2 ÷ ☐ = 72\n- (c) ☐ × 0.1 = 7.2\n\nGive your three answers in order, separated by commas.",
        answer: { type: "list", values: [0.01, 0.1, 72], ordered: true, display: "0.01, 0.1, 72" },
        traps: [
          {
            spec: { type: "list", values: [100, 10, 0.72], ordered: true },
            feedback: "Check each one by putting it back in: 7.2 × 100 = 720, not 0.072. To make a number smaller by *multiplying*, you multiply by a number less than 1.",
          },
        ],
        solution: [
          "(a) 7.2 → 0.072 is 100 times smaller, i.e. ÷ 100, which is the same as × 0.01. So ☐ = 0.01.",
          "(b) 7.2 → 72 is 10 times bigger, i.e. × 10, which is the same as ÷ 0.1. So ☐ = 0.1.",
          "(c) × 0.1 is the same as ÷ 10, so the missing number is 10 times bigger than 7.2: ☐ = 72. Check: 72 × 0.1 = 7.2.",
        ],
        difficulty: "core",
        guideRef: "multiplying-dividing-by-powers-of-ten",
        hints: [
          "In each line, did the number get bigger or smaller, and by what factor?",
          "In (a) the number got 100 times smaller using ×. Which number less than 1 does that?",
          "For (c), work backwards: undo × 0.1 by dividing by 0.1 (which is × 10).",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "standard-form-p4-q07",
        question:
          "Hana is asked to write {{4.07 * 10^(-4)}} as an ordinary number. She writes 0.000 047, but that is wrong.\n\nWrite {{4.07 * 10^(-4)}} correctly as an ordinary number.",
        answer: { type: "number", value: 0.000407, allowFraction: false, display: "0.000407" },
        traps: [
          { spec: { type: "number", value: 0.000047 }, feedback: "That's Hana's answer — she lost the 0 in the middle of 4.07. A zero between other digits is a real digit and must stay." },
          { spec: { type: "number", value: 0.0000407 }, feedback: "One place too far. In {{4.07 * 10^(-4)}} the 4 lands in the ten-thousandths column (4th place after the point): 0.000 407." },
        ],
        solution: [
          "{{10^(-4)}} means divide by 10 four times, so move the point 4 places to the left.",
          "4.07 → 0.407 → 0.0407 → 0.004 07 → 0.000 407.",
          "Hana dropped the zero between the 4 and the 7. The correct answer is 0.000 407.",
        ],
        commonError: "Losing a zero that sits between non-zero digits, or moving the point one place too many.",
        difficulty: "core",
        guideRef: "small-numbers",
        hints: [
          "Which way, and how many places, does × {{10^(-4)}} move the decimal point?",
          "Write 4.07 and move the point one place at a time — keep every digit, including the 0.",
          "The 4 should end up in the 4th place after the point.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "standard-form-p4-q08",
        question:
          "Write these numbers in order of size, starting with the smallest.\n\n{{2.1 * 10^(-2)}}   ·   0.0209   ·   {{2.09 * 10^(-1)}}   ·   0.02\n\nGive your answer as ordinary numbers, separated by commas.",
        answer: { type: "list", values: [0.02, 0.0209, 0.021, 0.209], ordered: true, display: "0.02, 0.0209, 0.021, 0.209" },
        traps: [
          {
            spec: { type: "list", values: [0.209, 0.021, 0.0209, 0.02], ordered: true },
            feedback: "Those are in order from largest to smallest. The question asks for the smallest first.",
          },
          {
            spec: { type: "list", values: [0.02, 0.021, 0.0209, 0.209], ordered: true },
            feedback: "Compare 0.0209 and 0.021 digit by digit: 0.0209 vs 0.0210. In the thousandths column 0 < 1, so 0.0209 is smaller — more digits doesn't mean bigger.",
          },
        ],
        solution: [
          "Convert to ordinary numbers: {{2.1 * 10^(-2)}} = 0.021 and {{2.09 * 10^(-1)}} = 0.209.",
          "Give them all 4 decimal places: 0.0210, 0.0209, 0.2090, 0.0200.",
          "Smallest first: 0.02, 0.0209, 0.021, 0.209.",
        ],
        solutions: [
          {
            label: "Standard form throughout",
            steps: [
              "0.0209 = {{2.09 * 10^(-2)}} and 0.02 = {{2 * 10^(-2)}}.",
              "Three numbers have power −2; order them by A: 2 < 2.09 < 2.1.",
              "{{2.09 * 10^(-1)}} has the biggest power, so it is the largest.",
            ],
          },
        ],
        commonError: "Thinking 0.0209 is bigger than 0.021 because it has more digits.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "Get them all into the same form first.",
          "Write each one as an ordinary number with 4 decimal places, e.g. 0.0200.",
          "Now compare 0.0209 and 0.0210 digit by digit.",
        ],
        strategy: "Convert to the same form",
      },
      {
        kind: "short",
        id: "standard-form-p4-q09",
        question:
          "The bar chart shows how much storage four apps use on Zara's phone. Look carefully at the label on the vertical axis.\n\nWhat is the total storage used by the four apps? Give your answer in bytes, in standard form.",
        diagram: `<svg viewBox="0 0 420 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of storage used by four apps, in units of ten to the power eight bytes: Photos 7, Music 4, Games 9, Messages 3"><rect x="0" y="0" width="420" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="70" y1="200" x2="400" y2="200"/><line x1="70" y1="180" x2="400" y2="180"/><line x1="70" y1="160" x2="400" y2="160"/><line x1="70" y1="140" x2="400" y2="140"/><line x1="70" y1="120" x2="400" y2="120"/><line x1="70" y1="100" x2="400" y2="100"/><line x1="70" y1="80" x2="400" y2="80"/><line x1="70" y1="60" x2="400" y2="60"/><line x1="70" y1="40" x2="400" y2="40"/><line x1="70" y1="20" x2="400" y2="20"/></g><rect x="95" y="80" width="50" height="140" fill="#c7d2fe" stroke="#334155"/><rect x="170" y="140" width="50" height="80" fill="#bbf7d0" stroke="#334155"/><rect x="245" y="40" width="50" height="180" fill="#fde68a" stroke="#334155"/><rect x="320" y="160" width="50" height="60" fill="#fecaca" stroke="#334155"/><line x1="70" y1="20" x2="70" y2="220" stroke="#1f2937" stroke-width="1.5"/><line x1="70" y1="220" x2="400" y2="220" stroke="#1f2937" stroke-width="1.5"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="63" y="224">0</text><text x="63" y="204">1</text><text x="63" y="184">2</text><text x="63" y="164">3</text><text x="63" y="144">4</text><text x="63" y="124">5</text><text x="63" y="104">6</text><text x="63" y="84">7</text><text x="63" y="64">8</text><text x="63" y="44">9</text><text x="63" y="24">10</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="120" y="238">Photos</text><text x="195" y="238">Music</text><text x="270" y="238">Games</text><text x="345" y="238">Messages</text><text x="235" y="260">App</text><text x="22" y="120" transform="rotate(-90 22 120)">Storage (× 10⁸ bytes)</text></g></svg>`,
        answer: { type: "number", value: 2300000000, standardForm: true, display: "{{2.3 * 10^9}} bytes" },
        traps: [
          { spec: { type: "number", value: 23 }, feedback: "23 is the total in units of {{10^8}} bytes. Multiply by {{10^8}}, then write the answer in standard form." },
          {
            spec: { type: "number", value: 230000000 },
            feedback: "{{23 * 10^8}} is right, but changing 23 to 2.3 makes A ten times smaller, so the power must go **up** by one: {{2.3 * 10^9}}.",
          },
        ],
        solution: [
          "Read the bars: Photos 7, Music 4, Games 9, Messages 3 — each in units of {{10^8}} bytes.",
          "Total = 7 + 4 + 9 + 3 = 23, so the apps use {{23 * 10^8}} bytes.",
          "23 = {{2.3 * 10^1}}, so {{23 * 10^8 = 2.3 * 10^9}} bytes.",
        ],
        commonError: "Ignoring the {{10^8}} in the axis label, or changing 23 to 2.3 without adjusting the power.",
        difficulty: "core",
        guideRef: "large-numbers",
        hints: [
          "Read each bar carefully. What does the label on the vertical axis tell you about the units?",
          "Add the four readings, then multiply by {{10^8}}.",
          "{{23 * 10^8}} is not in standard form. Rewrite 23 as 2.3 × 10.",
        ],
        strategy: "Read the scale",
      },
      {
        kind: "written",
        id: "standard-form-p4-q10",
        question:
          "Arjun says: \"To write a whole number in standard form, count its digits — that is the power of 10. So 52 000 = {{5.2 * 10^5}}, because 52 000 has 5 digits.\"\n\nIs Arjun right? Explain, and write 52 000 correctly in standard form.",
        marks: 3,
        modelAnswer:
          "No. {{5.2 * 10^5}} = 520 000, which is ten times too big. The power is the number of places the decimal point moves to turn 52 000 into 5.2, and that is 4 places. So 52 000 = {{5.2 * 10^4}} (check: 5.2 × 10 000 = 52 000). For a whole number, the power is one less than the number of digits.",
        markScheme: [
          { point: "Says Arjun is wrong, e.g. 5.2 × 10^5 = 520 000, which is ten times too big", keywords: ["no", "wrong", "520 000", "520000", "ten times", "10 times"] },
          { point: "Correct answer: 5.2 × 10^4", keywords: ["10^4", "5.2 x 10^4", "10 000", "10000"] },
          {
            point: "Correct rule: the power is the number of places the point moves (one less than the number of digits)",
            keywords: ["one less", "1 less", "minus 1", "places", "moves", "4 places"],
          },
        ],
        commonError: "Using the number of digits (or of zeros) as the power instead of the number of places the point moves.",
        difficulty: "core",
        guideRef: "large-numbers",
        hints: ["Check Arjun's answer: what is {{5.2 * 10^5}} as an ordinary number?", "How many places does the decimal point move to turn 52 000 into 5.2?"],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "standard-form-p4-q11",
        question:
          "Find the value of n in each equation.\n\n- (a) {{10^n = 0.001}}\n- (b) {{10^n = 1}}\n- (c) {{10^n}} = 100 000 ÷ 0.01\n\nGive your three values of n in order, separated by commas.",
        answer: { type: "list", values: [-3, 0, 7], ordered: true, display: "−3, 0, 7" },
        traps: [
          { spec: { type: "list", values: [3, 0, 7], ordered: true }, feedback: "Check (a): 0.001 is less than 1, so the power is negative. {{10^(-3)}} = 0.001." },
          {
            spec: { type: "list", values: [-3, 0, 3], ordered: true },
            feedback: "Check (c): dividing by 0.01 is the same as multiplying by 100, so 100 000 ÷ 0.01 = 10 000 000 = {{10^7}}.",
          },
        ],
        solution: [
          "(a) 0.001 = {{1/1000}} = {{10^(-3)}}, so n = −3.",
          "(b) {{10^0}} = 1, so n = 0.",
          "(c) ÷ 0.01 is the same as × 100: 100 000 ÷ 0.01 = 10 000 000 = {{10^7}}, so n = 7.",
        ],
        difficulty: "core",
        guideRef: "powers-of-ten",
        hints: [
          "Write each right-hand side as an ordinary number first.",
          "Numbers between 0 and 1 have negative powers of 10. What power of 10 is exactly 1?",
          "For (c), how many hundredths fit into 100 000?",
        ],
        strategy: "Use place value",
      },
      {
        kind: "short",
        id: "standard-form-p4-q12",
        question:
          "The picture shows a plant cell seen through a microscope, with a scale bar. On the picture, the cell is 9 cm long and the scale bar is 3 cm long. The scale bar stands for a real length of {{5 * 10^(-5)}} m.\n\nWhat is the real length of the cell? Give your answer in metres, in standard form.",
        diagram: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A plant cell 9 centimetres long on the picture, and a scale bar 3 centimetres long that stands for 5 times ten to the power minus 5 metres"><rect x="0" y="0" width="400" height="230" fill="#ffffff"/><rect x="60" y="30" width="270" height="90" rx="22" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><rect x="135" y="45" width="170" height="60" rx="18" fill="#bae6fd" stroke="#334155"/><circle cx="98" cy="75" r="17" fill="#c7d2fe" stroke="#334155"/><line x1="60" y1="145" x2="330" y2="145" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="137" x2="60" y2="153" stroke="#334155"/><line x1="330" y1="137" x2="330" y2="153" stroke="#334155"/><polygon points="60,145 70,140 70,150" fill="#334155"/><polygon points="330,145 320,140 320,150" fill="#334155"/><text x="195" y="166" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">9 cm on the picture</text><rect x="60" y="188" width="90" height="8" fill="#1f2937"/><text x="60" y="216" font-family="sans-serif" font-size="12" fill="#1f2937">scale bar: 3 cm = 5 × 10⁻⁵ m (real)</text></svg>`,
        answer: { type: "number", value: 0.00015, standardForm: true, display: "{{1.5 * 10^(-4)}} m" },
        traps: [
          {
            spec: { type: "number", value: 0.000015 },
            feedback: "{{15 * 10^(-5)}} is right, but changing 15 to 1.5 makes A ten times smaller, so the power goes **up** by one, from −5 to −4.",
          },
          { spec: { type: "number", value: 0.00005 }, feedback: "That's the real length of the scale bar. The cell is 9 ÷ 3 = 3 times as long as the scale bar." },
        ],
        solution: [
          "On the picture the cell is 9 ÷ 3 = 3 times as long as the scale bar.",
          "Real length = 3 × {{5 * 10^(-5)}} = {{15 * 10^(-5)}} m.",
          "15 = {{1.5 * 10^1}}, so {{15 * 10^(-5) = 1.5 * 10^(-4)}} m.",
        ],
        solutions: [
          {
            label: "Ordinary numbers",
            steps: ["{{5 * 10^(-5)}} m = 0.000 05 m.", "3 × 0.000 05 = 0.000 15 m.", "0.000 15 = {{1.5 * 10^(-4)}} m."],
          },
        ],
        commonError: "Changing {{15 * 10^(-5)}} to 1.5 but then leaving the power as −5, or moving it the wrong way to −6.",
        difficulty: "core",
        guideRef: "small-numbers",
        hints: [
          "How many scale bars long is the cell on the picture?",
          "Multiply the real length of the scale bar by that number.",
          "Is {{15 * 10^(-5)}} in standard form? Rewrite 15 as 1.5 × 10.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "standard-form-p4-q13",
        question:
          "Mei uses her calculator to work out the number of seconds in two years (of 365 days each). The display shows:\n\n`6.3072E07`\n\nWrite this number as an ordinary number, correct to 2 significant figures.",
        answer: { type: "number", value: 63000000, display: "63 000 000" },
        traps: [
          { spec: { type: "number", value: 6300000 }, feedback: "`E07` means × {{10^7}}, so the point moves 7 places: 63 072 000. Then round to 2 significant figures." },
          { spec: { type: "number", value: 63072000 }, feedback: "That's the exact value. Now round it to 2 significant figures: keep the 6 and the 3, and replace the other digits with zeros." },
        ],
        solution: [
          "`6.3072E07` means {{6.3072 * 10^7}}.",
          "Move the point 7 places to the right: 63 072 000 seconds.",
          "To 2 significant figures: 63 000 000 seconds (the third figure is 0, so round down).",
        ],
        commonError: "Treating the E as part of the number, or rounding to 2 decimal places instead of 2 significant figures.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "What does the E07 part of the display mean?",
          "Write {{6.3072 * 10^7}} as an ordinary number first.",
          "The first two significant figures are 6 and 3. Look at the next digit to decide whether to round up.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "written",
        id: "standard-form-p4-q14",
        question:
          "Two positive numbers are written in standard form as {{A * 10^6}} and {{B * 10^7}}. You are not told the values of A and B.\n\nMei says: \"I don't need to know A or B. {{A * 10^6}} must be the smaller number.\"\n\nExplain why Mei is right.",
        marks: 3,
        modelAnswer:
          "In standard form {{1 <= A < 10}}. So the biggest {{A * 10^6}} can be is *just under* 10 × {{10^6}} = {{10^7}} = 10 000 000 (for example, {{9.99 * 10^6}} = 9 990 000). B is at least 1, so the smallest {{B * 10^7}} can be is {{1 * 10^7}} = 10 000 000. That means {{A * 10^6}} is always less than 10 000 000, and {{B * 10^7}} is always at least 10 000 000, so {{A * 10^6}} is always the smaller number. This is why, in standard form, you can compare the powers first.",
        markScheme: [
          {
            point: "A is less than 10, so A × 10^6 is less than 10 × 10^6 = 10^7 (10 000 000)",
            keywords: ["less than 10", "under 10", "10 x 10^6", "10 × 10^6", "10^7", "10 000 000", "10000000", "9.99"],
          },
          {
            point: "B is at least 1, so B × 10^7 is at least 1 × 10^7 (10 000 000)",
            keywords: ["at least 1", "≥ 1", ">= 1", "1 x 10^7", "1 × 10^7", "smallest"],
          },
          {
            point: "Concludes the number with power 6 is always smaller, whatever A and B are",
            keywords: ["always", "whatever", "any", "every", "always smaller", "always less"],
          },
        ],
        commonError: "Checking one example (such as {{2 * 10^6}} and {{3 * 10^7}}) and calling it an explanation. The reason has to work for every possible A and B.",
        difficulty: "core",
        guideRef: "comparing-standard-form",
        hints: [
          "In standard form, what are the smallest and largest values A can take?",
          "Try the extreme case: the biggest possible number with power 6 against the smallest possible number with power 7.",
          "Compare both of those extreme numbers with 10 000 000.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "standard-form-p4-q15",
        question:
          "A sheet of gold leaf is about {{1.2 * 10^(-7)}} m thick. A craftsperson stacks {{5 * 10^4}} sheets on top of each other. How thick is the stack? Give your answer in **millimetres**.",
        answer: { type: "number", value: 6, display: "6 mm" },
        traps: [
          { spec: { type: "number", value: 0.006 }, feedback: "0.006 is the thickness in metres. 1 m = 1000 mm, so multiply by 1000." },
          {
            spec: { type: "number", value: 6e-11, standardForm: true },
            feedback: "When you multiply powers of 10, add the indices: {{10^(-7) * 10^4 = 10^(-7+4) = 10^(-3)}}, not {{10^(-11)}}. Then change the metres into millimetres.",
          },
        ],
        solution: [
          "Thickness = {{(1.2 * 10^(-7)) * (5 * 10^4)}} m.",
          "A parts: 1.2 × 5 = 6. Powers: {{10^(-7) * 10^4 = 10^(-3)}}.",
          "So the stack is {{6 * 10^(-3)}} m = 0.006 m.",
          "In millimetres: 0.006 × 1000 = 6 mm.",
        ],
        commonError: "Subtracting the indices when multiplying, or forgetting to change metres into millimetres.",
        difficulty: "core",
        guideRef: "calculating-standard-form",
        hints: [
          "Multiply the thickness of one sheet by the number of sheets.",
          "Multiply the A parts, and add the indices: −7 + 4.",
          "Then change metres to millimetres (× 1000).",
        ],
        strategy: "Break into steps",
      },
      {
        kind: "short",
        id: "standard-form-p4-q16",
        question:
          "A streaming company stores its films on 3 servers. Each server holds 150 terabytes. One terabyte is {{10^12}} bytes. How many bytes can the three servers hold altogether? Give your answer in standard form.",
        answer: { type: "number", value: 450000000000000, standardForm: true, display: "{{4.5 * 10^14}} bytes" },
        traps: [
          {
            spec: { type: "number", value: 4500000000000 },
            feedback: "450 is not 4.5. In {{450 * 10^12}}, 450 = {{4.5 * 10^2}}, so add 2 to the power: {{4.5 * 10^14}}.",
          },
          { spec: { type: "number", value: 150000000000000 }, feedback: "That's just one server. There are 3 servers, so find 3 × 150 terabytes first." },
        ],
        solution: [
          "Total = 3 × 150 = 450 terabytes.",
          "450 terabytes = {{450 * 10^12}} bytes.",
          "450 = {{4.5 * 10^2}}, so this is {{4.5 * 10^2 * 10^12 = 4.5 * 10^14}} bytes.",
        ],
        commonError: "Writing {{4.5 * 10^12}} — changing 450 to 4.5 without adding 2 to the power.",
        difficulty: "core",
        guideRef: "large-numbers",
        hints: [
          "How many terabytes are there altogether?",
          "Write the total as (a number) × {{10^12}} bytes.",
          "Rewrite 450 in standard form and combine the powers of 10.",
        ],
        strategy: "Break into steps",
      },
      {
        kind: "short",
        id: "standard-form-p4-q17",
        question: "When {{10^25 - 25}} is written out in full, what is the sum of its digits?",
        answer: { type: "number", value: 219 },
        traps: [
          { spec: { type: "number", value: 225 }, feedback: "225 is the digit sum of {{10^25 - 1}} (twenty-five 9s). Subtracting 25 changes the last two digits too." },
          { spec: { type: "number", value: 228 }, feedback: "Check a small case: {{10^4 - 25}} = 9975 has only *two* 9s before the 75. So {{10^25 - 25}} has 23 nines, not 24." },
        ],
        solution: [
          "Try small cases: {{10^3 - 25}} = 975, {{10^4 - 25}} = 9975, {{10^5 - 25}} = 99 975.",
          "Pattern: {{10^n - 25}} is (n − 2) nines followed by 75.",
          "So {{10^25 - 25}} is 23 nines followed by 7 and 5.",
          "Digit sum = 23 × 9 + 7 + 5 = 207 + 12 = 219.",
        ],
        commonError: "Counting 24 or 25 nines — the 75 at the end uses up two of the digit places.",
        difficulty: "challenge",
        guideRef: "powers-of-ten",
        hints: [
          "Too big to write out? Try smaller powers first: {{10^3 - 25}}, {{10^4 - 25}}, {{10^5 - 25}}.",
          "How many 9s appear in {{10^n - 25}}? What are the last two digits?",
          "{{10^25}} has 26 digits; {{10^25 - 25}} has 25 digits, ending in 75.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "standard-form-p4-q18",
        question: "How many digits does {{2^10 * 5^13}} have when it is written out in full?",
        answer: { type: "number", value: 13, display: "13 digits" },
        traps: [
          {
            spec: { type: "number", value: 12 },
            feedback: "Close: {{2^10 * 5^13 = 1.25 * 10^12}}. But a number A × {{10^12}} has 13 digits — the digit before the point plus 12 more.",
          },
          { spec: { type: "number", value: 23 }, feedback: "You can't add the indices when the bases are different (2 and 5). Pair each 2 with a 5 to make a 10." },
        ],
        solution: [
          "Pair up 2s and 5s, because 2 × 5 = 10: {{2^10 * 5^13 = (2^10 * 5^10) * 5^3}}.",
          "{{2^10 * 5^10 = (2 * 5)^10 = 10^10}}.",
          "So the number is {{5^3 * 10^10}} = 125 × {{10^10}} = {{1.25 * 10^12}}.",
          "Written out, that is 125 followed by ten zeros: 3 + 10 = 13 digits.",
        ],
        commonError: "Trying to multiply it all out, or adding the indices (10 + 13).",
        difficulty: "challenge",
        guideRef: "large-numbers",
        hints: [
          "2 × 5 = 10. How many (2 × 5) pairs can you make?",
          "Write the number as (something) × {{10^10}}.",
          "{{5^3}} = 125, so the number is 125 followed by some zeros.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "standard-form-p4-q19",
        question:
          "Computer memory is often measured in powers of 2. A gibibyte is {{2^30}} bytes, while a gigabyte is {{10^9}} bytes.\n\nPriya says: \"2 is much smaller than 10, so {{2^30}} must be smaller than {{10^9}}.\"\n\nWithout a calculator, show that Priya is wrong. Then write {{2^30}} in standard form, correct to 2 significant figures.",
        marks: 3,
        modelAnswer:
          "{{2^10}} = 1024, which is bigger than 1000 = {{10^3}}. Now {{2^30 = 2^10 * 2^10 * 2^10}} = 1024 × 1024 × 1024, and {{10^9 = 10^3 * 10^3 * 10^3}} = 1000 × 1000 × 1000. Each factor 1024 is bigger than 1000, so {{2^30}} > {{10^9}} and Priya is wrong — the bigger power more than makes up for the smaller base. In fact {{2^30 = (1.024 * 10^3)^3}}, and 1.024 × 1.024 × 1.024 ≈ 1.07, so {{2^30}} ≈ {{1.07 * 10^9}} ≈ {{1.1 * 10^9}} to 2 significant figures (exactly 1 073 741 824).",
        markScheme: [
          { point: "Uses 2^10 = 1024, which is more than 1000 = 10^3", keywords: ["1024", "2^10", "1000", "10^3"] },
          {
            point: "Cubes both: 2^30 = 1024 × 1024 × 1024 > 1000 × 1000 × 1000 = 10^9, so Priya is wrong",
            keywords: ["1024 x 1024 x 1024", "1024 × 1024 × 1024", "1024^3", "(2^10)^3", "cube", "cubed", "wrong", "bigger", "greater"],
          },
          { point: "2^30 ≈ 1.1 × 10^9 (2 s.f.)", keywords: ["1.1 x 10^9", "1.1 × 10^9", "1.07", "1 073 741 824", "1073741824"] },
        ],
        commonError: "Comparing only the bases (2 and 10) and ignoring how many times each is multiplied.",
        difficulty: "challenge",
        guideRef: "comparing-standard-form",
        hints: [
          "Start with something you can work out: what is {{2^10}}?",
          "Compare {{2^10}} with {{10^3}}. How can {{2^30}} and {{10^9}} be built from these?",
          "{{2^30 = 2^10 * 2^10 * 2^10}} and {{10^9 = 10^3 * 10^3 * 10^3}}.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "standard-form-p4-q20",
        question: "What is the smallest positive whole number k for which k × {{3.6 * 10^(-4)}} is a whole number?",
        answer: { type: "number", value: 25000, display: "25 000" },
        traps: [
          { spec: { type: "number", value: 10000 }, feedback: "10 000 × {{3.6 * 10^(-4)}} = 3.6 — not a whole number yet." },
          { spec: { type: "number", value: 100000 }, feedback: "That works (it gives 36), but it isn't the smallest. Simplify the fraction {{36/100000}} fully first." },
        ],
        solution: [
          "{{3.6 * 10^(-4)}} = 0.000 36 = {{36/100000}}.",
          "Simplify: 36 = {{2^2 * 3^2}} and 100 000 = {{2^5 * 5^5}}, so divide top and bottom by 4: {{36/100000 = 9/25000}}.",
          "9 and 25 000 have no common factor, so k × {{9/25000}} is a whole number only when k is a multiple of 25 000.",
          "The smallest k is 25 000. Check: 25 000 × 0.000 36 = 9.",
        ],
        commonError: "Multiplying by a power of 10 such as 100 000 — that clears the decimal, but it isn't the smallest k.",
        difficulty: "challenge",
        guideRef: "small-numbers",
        hints: [
          "Write {{3.6 * 10^(-4)}} as a fraction with a power of 10 on the bottom.",
          "Simplify that fraction fully.",
          "For k × {{9/25000}} to be a whole number, what must k be a multiple of?",
        ],
        strategy: "Work backwards",
      },
    ],
  },
];
