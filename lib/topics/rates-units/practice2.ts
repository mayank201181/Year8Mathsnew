import type { Paper } from "../../types.ts";

// Practice Papers 3 and 4 for "Measures, Units & Rates".
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, graphs/tables, reasoning.

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "rates-units-p3",
    title: "Practice Paper 3",
    questions: [
      // ------------------------------------------------------------- q01
      {
        kind: "short",
        id: "rates-units-p3-q01",
        question:
          "A 1.5 km charity walk along East Coast Park has a marker flag every 50 m, including one flag at the start and one at the finish. How many flags are there altogether?",
        answer: { type: "number", value: 31, display: "31 flags" },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "30 is the number of 50 m **gaps**. There is a flag at both ends, so count again." },
          { spec: { type: "number", value: 0.03 }, feedback: "You divided 1.5 by 50 without converting. Change 1.5 km into metres first." },
        ],
        solution: [
          "Convert first: 1.5 km = 1.5 × 1000 = 1500 m.",
          "Number of 50 m gaps = 1500 ÷ 50 = 30.",
          "There is a flag at the start of every gap, plus one more at the finish: 30 + 1 = 31 flags.",
        ],
        commonError: "Answering 30 — that counts the gaps, not the flags. Check with a small case: a 100 m route has 2 gaps but 3 flags.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["Change 1.5 km into metres.", "Try a small case: on a 100 m route with a flag every 50 m, how many flags are there?"],
        strategy: "Try small cases",
      },
      // ------------------------------------------------------------- q02
      {
        kind: "short",
        id: "rates-units-p3-q02",
        question:
          "A recipe says: *Bake the banana bread for 1.25 hours.* Mei puts it in the oven at 16:50. At what time should she take it out? Give your answer using the 24-hour clock, for example 09:40.",
        answer: {
          type: "text",
          accept: ["18:05", "1805", "18.05", "18h05", "6:05pm", "6.05pm", "6:05p.m"],
          display: "18:05",
        },
        traps: [
          {
            spec: { type: "text", accept: ["18:15", "1815", "18.15", "6:15pm", "6.15pm"] },
            feedback: "1.25 hours is not 1 h 25 min. The 0.25 is a quarter of an hour: 0.25 × 60 = 15 minutes.",
          },
        ],
        solution: [
          "Change the decimal part into minutes: 0.25 h = 0.25 × 60 = 15 min, so 1.25 h = 1 h 15 min.",
          "16:50 + 1 h = 17:50.",
          "17:50 + 10 min = 18:00, then 5 more minutes gives 18:05.",
        ],
        commonError: "Reading 1.25 h as 1 h 25 min.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["What is 0.25 of an hour in minutes?", "Add the whole hour first, then the minutes, jumping through 18:00."],
        strategy: "Count on in friendly jumps",
      },
      // ------------------------------------------------------------- q03
      {
        kind: "short",
        id: "rates-units-p3-q03",
        question:
          "Priya is following a British recipe for kheer (rice pudding) that needs 2 pints of milk. Her supermarket sells milk only in 1-litre cartons. Using 1 pint ≈ 0.57 litres, how many cartons must she buy?",
        answer: { type: "number", value: 2, display: "2 cartons" },
        traps: [
          { spec: { type: "number", value: 1 }, feedback: "One carton holds only 1 litre, but she needs about 1.14 litres. When you must have enough, round **up**." },
          { spec: { type: "number", value: 1.14 }, feedback: "That's how many litres of milk she needs. How many 1-litre cartons must she buy to get that much?" },
        ],
        solution: ["2 pints ≈ 2 × 0.57 = 1.14 litres.", "One 1-litre carton is not quite enough, so she must buy 2 cartons."],
        commonError: "Rounding 1.14 down to 1 — you can't buy part of a carton, and 1 litre is not enough.",
        difficulty: "warmup",
        guideRef: "imperial-units",
        hints: ["Change 2 pints into litres first.", "Is one carton enough?"],
        strategy: "Check the answer makes sense in context",
      },
      // ------------------------------------------------------------- q04
      {
        kind: "short",
        id: "rates-units-p3-q04",
        question:
          "During a monsoon storm, rain falls at a steady 12 mm per hour from 14:00 until 16:30. How many millimetres of rain fall altogether?",
        answer: { type: "number", value: 30, display: "30 mm" },
        traps: [
          { spec: { type: "number", value: 27.6 }, feedback: "2 h 30 min is 2.5 hours, not 2.3 hours — there are 60 minutes in an hour, not 100." },
          { spec: { type: "number", value: 24 }, feedback: "The storm lasts longer than 2 hours. Don't forget the extra 30 minutes." },
        ],
        solution: ["From 14:00 to 16:30 is 2 h 30 min = 2.5 hours.", "Rain = rate × time = 12 × 2.5 = 30 mm."],
        commonError: "Writing 2 h 30 min as 2.3 hours.",
        difficulty: "warmup",
        guideRef: "density-and-rates",
        hints: ["How long does the storm last, in hours?", "Write 30 minutes as a decimal of an hour, then use amount = rate × time."],
        strategy: "Use the rate",
      },
      // ------------------------------------------------------------- q05
      {
        kind: "short",
        id: "rates-units-p3-q05",
        question:
          "During a thunderstorm, Hana sees a flash of lightning and hears the thunder 6 seconds later. The light reaches her almost instantly, but sound travels more slowly. Using 340 m/s for the speed of sound, how far away was the lightning? Give your answer in km.",
        answer: { type: "number", value: 2.04, display: "2.04 km" },
        traps: [
          { spec: { type: "number", value: 2040 }, feedback: "2040 is the distance in **metres**. The question asks for kilometres." },
          { spec: { type: "number", value: 56.67, tolerance: 0.05 }, feedback: "Distance = speed × time, not speed ÷ time." },
        ],
        solution: ["Distance = speed × time = 340 × 6 = 2040 m.", "2040 m = 2040 ÷ 1000 = 2.04 km."],
        commonError: "Leaving the answer in metres when km is asked for.",
        difficulty: "warmup",
        guideRef: "speed",
        hints: ["Which version of the speed formula gives the distance?", "Your first answer will be in metres. How do you change metres into km?"],
        strategy: "Use the formula, then convert",
      },
      // ------------------------------------------------------------- q06
      {
        kind: "short",
        id: "rates-units-p3-q06",
        question:
          "Siti is tiling the wall behind a kitchen sink. The wall is a rectangle 2.4 m wide and 1.6 m high. Each tile is a square of side 20 cm. How many tiles does she need to cover the wall exactly?",
        answer: { type: "number", value: 96, display: "96 tiles" },
        traps: [
          { spec: { type: "number", value: 0.96 }, feedback: "1 m² is 10 000 cm², not 100 cm²: a 1 m square holds 100 rows of 100 little squares." },
          { spec: { type: "number", value: 9.6 }, feedback: "1 m² is 10 000 cm², not 1000 cm². Safer still: change the lengths into cm before you do anything else." },
        ],
        solution: [
          "Convert the lengths first: 2.4 m = 240 cm and 1.6 m = 160 cm.",
          "Tiles along the width: 240 ÷ 20 = 12. Rows up the height: 160 ÷ 20 = 8.",
          "Number of tiles = 12 × 8 = 96.",
        ],
        solutions: [
          {
            label: "Using areas",
            steps: [
              "Wall area = 2.4 × 1.6 = 3.84 m² = 3.84 × 10 000 = 38 400 cm².",
              "Tile area = 20 × 20 = 400 cm².",
              "38 400 ÷ 400 = 96 tiles. The lengths method is quicker and avoids the 10 000 factor altogether.",
            ],
          },
        ],
        commonError: "Changing 3.84 m² into cm² by multiplying by 100 instead of 10 000.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Will you work in metres or centimetres? Make the units match first.",
          "How many tiles fit along the 2.4 m width? How many rows fit up the 1.6 m height?",
          "240 ÷ 20 tiles across, and 160 ÷ 20 rows.",
        ],
        strategy: "Convert lengths first",
      },
      // ------------------------------------------------------------- q07
      {
        kind: "short",
        id: "rates-units-p3-q07",
        question:
          "Arjun's family is deciding how to buy printer ink. A new cartridge costs $36 and prints 450 pages. A refill kit costs $15 and prints 150 pages. The family prints about 900 pages a year. How much do they save in a year by choosing the option that is cheaper per page?",
        answer: { type: "number", value: 18, display: "$18" },
        traps: [
          { spec: { type: "number", value: 0.02 }, feedback: "$0.02 is the saving on **one** page. The family prints 900 pages a year." },
          { spec: { type: "number", value: 21 }, feedback: "You compared one cartridge with one refill kit, but they print different numbers of pages. Compare the cost of the same 900 pages." },
        ],
        solution: [
          "Cost per page: cartridge → 36 ÷ 450 = $0.08 (8 cents). Refill kit → 15 ÷ 150 = $0.10 (10 cents). The cartridge is cheaper per page.",
          "900 pages with cartridges: 900 ÷ 450 = 2 cartridges, costing 2 × $36 = $72.",
          "900 pages with refill kits: 900 ÷ 150 = 6 kits, costing 6 × $15 = $90.",
          "Saving = $90 − $72 = $18 a year.",
        ],
        solutions: [
          {
            label: "Per-page shortcut",
            steps: ["The cartridge saves 10 − 8 = 2 cents on every page.", "Over 900 pages: 900 × 2 = 1800 cents = $18."],
          },
        ],
        commonError: "Comparing the prices $36 and $15 directly, even though they print different numbers of pages.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "To compare fairly, compare the cost of the same number of pages.",
          "What does one page cost with each option?",
          "Work out the cost of 900 pages each way, then subtract.",
        ],
        strategy: "Use the unitary method",
      },
      // ------------------------------------------------------------- q08
      {
        kind: "written",
        id: "rates-units-p3-q08",
        question:
          "Ms Lim must reach Changi Airport by 18:30 to meet her sister. She leaves home at 17:40. Her route is 24 km on the expressway, where she averages 80 km/h, then 12 km through town, where she averages 30 km/h.\n\nWill she arrive by 18:30? Show your working.",
        marks: 4,
        modelAnswer:
          "Expressway: time = 24 ÷ 80 = 0.3 h = 0.3 × 60 = 18 min.\n\nTown: time = 12 ÷ 30 = 0.4 h = 0.4 × 60 = 24 min.\n\nTotal time = 18 + 24 = 42 min, so she arrives at 17:40 + 42 min = 18:22.\n\nYes, she arrives in time, with 8 minutes to spare.",
        markScheme: [
          { point: "Expressway time 18 minutes (0.3 h)", keywords: ["18", "0.3"] },
          { point: "Town time 24 minutes (0.4 h)", keywords: ["24", "0.4"] },
          { point: "Total time 42 minutes, or arrival time 18:22", keywords: ["42", "18:22", "0.7"] },
          { point: "Correct conclusion: yes, she is on time (8 minutes early)", keywords: ["yes", "on time", "in time", "8 min", "early"] },
        ],
        commonError:
          "Taking the mean of 80 and 30 (55 km/h) as the speed for the whole 36 km. The two speeds last for different lengths of time, so this is not the average speed.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Find the time for each part of the journey separately.",
          "Time = distance ÷ speed. Change each answer from hours into minutes.",
          "Add the two times on to 17:40 and compare with 18:30.",
        ],
        strategy: "Split into parts",
      },
      // ------------------------------------------------------------- q09
      {
        kind: "short",
        id: "rates-units-p3-q09",
        question:
          "For Sports Day, the PTA will make 260 cups of lemongrass drink. Each cup holds 180 ml. The drink is made by mixing 1 part concentrate with 4 parts water. Concentrate is sold in 1.5-litre bottles. How many bottles of concentrate must they buy?",
        answer: { type: "number", value: 7, display: "7 bottles" },
        traps: [
          { spec: { type: "number", value: 6 }, feedback: "6 bottles hold only 9 litres, but they need 9.36 litres of concentrate. Round **up**." },
          { spec: { type: "number", value: 32 }, feedback: "That would be enough concentrate for the whole 46.8 litres — but only {{1/5}} of the drink is concentrate." },
        ],
        solution: [
          "Total drink = 260 × 180 = 46 800 ml = 46.8 litres.",
          "1 part concentrate + 4 parts water = 5 parts, so the concentrate is {{1/5}} of the drink: 46.8 ÷ 5 = 9.36 litres.",
          "Bottles: 9.36 ÷ 1.5 = 6.24.",
          "6 bottles are not quite enough, so they must buy 7.",
        ],
        commonError: "Rounding 6.24 down to 6 — in a 'how many must you buy' question, always round up.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Start with the total volume of drink, in litres.",
          "How many parts are there altogether? What fraction of the drink is concentrate?",
          "Divide the litres of concentrate by 1.5, then decide whether to round up or down.",
        ],
        strategy: "Work step by step, then check the context",
      },
      // ------------------------------------------------------------- q10
      {
        kind: "short",
        id: "rates-units-p3-q10",
        question:
          "A hire car in the UK is advertised as doing 45 miles per gallon of fuel. Using 1 mile ≈ 1.6 km and 1 gallon ≈ 4.5 litres, convert this to kilometres per litre.",
        answer: { type: "number", value: 16, display: "16 km per litre" },
        traps: [
          { spec: { type: "number", value: 72 }, feedback: "72 km is the distance on one **gallon**. Share it between the 4.5 litres in a gallon." },
          { spec: { type: "number", value: 324 }, feedback: "Per litre means divide by the number of litres: 72 ÷ 4.5, not 72 × 4.5." },
        ],
        solution: [
          "45 miles per gallon means the car goes 45 miles on 1 gallon.",
          "45 miles ≈ 45 × 1.6 = 72 km, so the car goes 72 km on 4.5 litres.",
          "On 1 litre: 72 ÷ 4.5 = 16 km. So 45 miles per gallon ≈ 16 km per litre.",
        ],
        commonError: "Multiplying by 4.5 instead of dividing. A gallon is more than a litre, so the car goes less far on a litre than on a gallon.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "Change one unit at a time. First: how many km is 45 miles?",
          "One gallon is 4.5 litres. If the car does 72 km on 4.5 litres, how far does it go on 1 litre?",
        ],
        strategy: "Change one unit at a time",
      },
      // ------------------------------------------------------------- q11
      {
        kind: "short",
        id: "rates-units-p3-q11",
        question:
          "The graph converts Singapore dollars ($) into Japanese yen (¥). Hana is visiting Japan. A theme-park ticket costs ¥8800, which is off the edge of the graph. Use the graph to find the cost of the ticket in Singapore dollars.",
        diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph. Horizontal axis: Singapore dollars from 0 to 50, grid lines every 5. Vertical axis: Japanese yen from 0 to 6000, grid lines every 500. A straight line runs from the origin to the point 50 dollars, 5500 yen, which is marked with a dot."><rect width="480" height="320" fill="#ffffff"/><path d="M105 30V270M140 30V270M175 30V270M210 30V270M245 30V270M280 30V270M315 30V270M350 30V270M385 30V270M420 30V270M70 250H420M70 230H420M70 210H420M70 190H420M70 170H420M70 150H420M70 130H420M70 110H420M70 90H420M70 70H420M70 50H420M70 30H420" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="70" y1="270" x2="430" y2="270" stroke="#334155" stroke-width="1.5"/><line x1="70" y1="270" x2="70" y2="22" stroke="#334155" stroke-width="1.5"/><line x1="70" y1="270" x2="420" y2="50" stroke="#1d4ed8" stroke-width="2.5"/><circle cx="420" cy="50" r="4" fill="#1d4ed8"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="70" y="286">0</text><text x="140" y="286">10</text><text x="210" y="286">20</text><text x="280" y="286">30</text><text x="350" y="286">40</text><text x="420" y="286">50</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="64" y="274">0</text><text x="64" y="234">1000</text><text x="64" y="194">2000</text><text x="64" y="154">3000</text><text x="64" y="114">4000</text><text x="64" y="74">5000</text><text x="64" y="34">6000</text></g><text x="245" y="310" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Singapore dollars ($)</text><text x="16" y="150" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 150)">Japanese yen (¥)</text></svg>`,
        answer: { type: "number", value: 80, display: "$80" },
        traps: [
          { spec: { type: "number", value: 968000 }, feedback: "You multiplied by 110. Going from yen to dollars should give a much **smaller** number, because $1 buys ¥110." },
        ],
        solution: [
          "Find a point where the line meets grid lines exactly: it ends at ($50, ¥5500).",
          "So $1 = 5500 ÷ 50 = ¥110.",
          "¥8800 ÷ 110 = $80.",
        ],
        solutions: [
          {
            label: "Build it from readable values",
            steps: [
              "$50 = ¥5500, so $10 = ¥1100 and $30 = ¥3300.",
              "¥5500 + ¥3300 = ¥8800, so the ticket costs $50 + $30 = $80.",
            ],
          },
        ],
        commonError: "Reading a point between grid lines and getting a rough rate. Use the exact point ($50, ¥5500).",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "Find a point where the line passes exactly through grid lines.",
          "How many yen is $1 worth?",
          "Divide the yen by the number of yen in one dollar.",
        ],
        strategy: "Read a smaller value, then scale up",
      },
      // ------------------------------------------------------------- q12
      {
        kind: "written",
        id: "rates-units-p3-q12",
        question:
          "The swimming pool at Hana's condo is being refilled after cleaning. It is a cuboid 25 m long, 10 m wide and 1.2 m deep. The pump delivers water at 500 litres per minute.\n\nHana says: \"The pool will be full in under 8 hours.\"\n\nIs she right? Show your working.",
        marks: 4,
        modelAnswer:
          "Volume = 25 × 10 × 1.2 = 300 m³.\n\n1 m³ = 1000 litres, so the pool holds 300 × 1000 = 300 000 litres.\n\nTime = 300 000 ÷ 500 = 600 minutes = 600 ÷ 60 = 10 hours.\n\nHana is wrong: filling the pool takes 10 hours, which is more than 8 hours.",
        markScheme: [
          { point: "Volume 300 m³", keywords: ["300 m³", "300m³", "= 300"] },
          { point: "Converts to 300 000 litres", keywords: ["300 000", "300000"] },
          { point: "Time 600 minutes (10 hours)", keywords: ["600", "10 hours", "10 h"] },
          { point: "Conclusion: Hana is wrong, it takes longer than 8 hours", keywords: ["no", "wrong", "not right", "longer", "more than 8"] },
        ],
        commonError: "Using 1 m³ = 100 litres. A 1 m cube holds 1000 litres (ten layers of 10 cm × 10 cm × 10 cm litre-cubes, 100 in each layer).",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "How much water does the pool hold? Find the volume in m³ first.",
          "Change m³ into litres: 1 m³ = 1000 litres.",
          "Divide the litres by the pump's rate to get the time in minutes, then change to hours.",
        ],
        strategy: "Work step by step",
      },
      // ------------------------------------------------------------- q13
      {
        kind: "short",
        id: "rates-units-p3-q13",
        question:
          "Wei Ling must reach Pasir Ris by 08:15 for a CCA meet. It takes her 9 minutes to walk from home to Bedok Interchange. Here is part of the bus timetable.\n\n| Stop | Bus 1 | Bus 2 | Bus 3 |\n|---|---|---|---|\n| Bedok Interchange | 07:12 | 07:34 | 07:56 |\n| Tampines | 07:31 | 07:53 | 08:15 |\n| Pasir Ris | 07:45 | 08:07 | 08:29 |\n\nWhat is the **latest** time she can leave home? Give your answer using the 24-hour clock.",
        answer: {
          type: "text",
          accept: ["07:25", "7:25", "0725", "725", "07.25", "7.25", "7:25am", "07:25am", "7.25am", "07.25am", "7:25a.m"],
          display: "07:25",
        },
        traps: [
          {
            spec: { type: "text", accept: ["07:47", "7:47", "0747", "747", "07.47", "7.47"] },
            feedback: "Bus 3 leaves Bedok at 07:56 but reaches Pasir Ris at 08:29 — too late. Check the arrival row first.",
          },
          {
            spec: { type: "text", accept: ["07:03", "7:03", "0703", "703", "07.03", "7.03"] },
            feedback: "Bus 1 would get her there in time, but it isn't the **latest** bus she could catch.",
          },
        ],
        solution: [
          "Work backwards from the arrival time. The Pasir Ris row shows Bus 1 arrives at 07:45, Bus 2 at 08:07 and Bus 3 at 08:29.",
          "Bus 3 arrives too late, so the latest bus she can take is Bus 2.",
          "Bus 2 leaves Bedok Interchange at 07:34.",
          "She needs 9 minutes to walk there: 07:34 − 9 min = 07:25.",
        ],
        commonError: "Reading the Bedok row first and choosing the last bus, without checking when it arrives.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "Start at the end: which buses reach Pasir Ris by 08:15?",
          "Of those buses, which one leaves Bedok Interchange the latest?",
          "Take her 9-minute walk away from that departure time.",
        ],
        strategy: "Work backwards",
      },
      // ------------------------------------------------------------- q14
      {
        kind: "short",
        id: "rates-units-p3-q14",
        question:
          "A delivery drone flies at a steady 15 m/s. Its battery gives 20 minutes of flying. On one battery it must fly from its base to a drop-off point and straight back. What is the greatest possible distance, in km, from the base to the drop-off point?",
        answer: { type: "number", value: 9, display: "9 km" },
        traps: [
          { spec: { type: "number", value: 18 }, feedback: "18 km is the total distance the drone can fly. It has to come back too." },
          { spec: { type: "number", value: 0.15 }, feedback: "Check the time units: the speed is per **second**, so change 20 minutes into seconds." },
        ],
        solution: [
          "Change the time into seconds: 20 min = 20 × 60 = 1200 s.",
          "Total distance = speed × time = 15 × 1200 = 18 000 m = 18 km.",
          "The drone flies there **and back**, so the drop-off point can be at most 18 ÷ 2 = 9 km away.",
        ],
        solutions: [
          {
            label: "Convert the speed first",
            steps: ["15 m/s × 3.6 = 54 km/h.", "20 min = {{1/3}} h, so the total distance = 54 × {{1/3}} = 18 km.", "Half of 18 km is 9 km."],
          },
        ],
        commonError: "Forgetting the return trip and answering 18 km.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Make the units match: the speed is in metres per **second**.",
          "How far can the drone fly in total on one battery?",
          "The trip is there and back. What part of the total is the outward flight?",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q15
      {
        kind: "short",
        id: "rates-units-p3-q15",
        question:
          "**Stretch.** An elephant of mass 4000 kg stands on four feet, each with an area of 0.1 m². A woman of mass 50 kg puts all her weight on one stiletto heel of area 1 cm². Use: a mass of 1 kg has a weight of 10 N, and pressure = force ÷ area.\n\nHow many times greater is the pressure under the heel than the pressure under the elephant's feet?",
        answer: { type: "number", value: 50, display: "50 times" },
        traps: [
          { spec: { type: "number", value: 0.02 }, feedback: "That compares them the wrong way round. Which pressure is bigger?" },
          { spec: { type: "number", value: 0.5 }, feedback: "Check the area conversion: 1 cm² = 0.0001 m², because 1 m² = 10 000 cm² (not 100)." },
        ],
        solution: [
          "Elephant: weight = 4000 × 10 = 40 000 N, spread over 4 × 0.1 = 0.4 m². Pressure = 40 000 ÷ 0.4 = 100 000 N/m².",
          "Heel: weight = 50 × 10 = 500 N. Area = 1 cm² = 0.0001 m² (because 1 m² = 10 000 cm²).",
          "Pressure = 500 ÷ 0.0001 = 5 000 000 N/m².",
          "5 000 000 ÷ 100 000 = 50, so the pressure under the heel is 50 times greater.",
        ],
        solutions: [
          {
            label: "Work in N/cm² instead",
            steps: [
              "Elephant: 0.4 m² = 0.4 × 10 000 = 4000 cm², so pressure = 40 000 ÷ 4000 = 10 N/cm².",
              "Heel: 500 ÷ 1 = 500 N/cm².",
              "500 ÷ 10 = 50. Same answer, with smaller numbers.",
            ],
          },
        ],
        commonError: "Using 1 m² = 100 cm² when changing the heel's area.",
        difficulty: "core",
        guideRef: "pressure",
        hints: [
          "Find each pressure in the **same** units before comparing.",
          "The elephant's weight is shared between all four feet. What is the total area?",
          "Change 1 cm² into m² (or change the elephant's 0.4 m² into cm²).",
        ],
        strategy: "Convert to the same unit",
      },
      // ------------------------------------------------------------- q16
      {
        kind: "written",
        id: "rates-units-p3-q16",
        question:
          "Mei fills a 500 cm³ plastic tub right to the brim with water, presses the lid on and puts it in the freezer. Water has a density of 1 g/cm³ and ice has a density of 0.92 g/cm³.\n\nMei says: \"The ice will still fit in the tub, because it's the same amount of water.\"\n\nIs she right? Explain your answer with calculations.",
        marks: 3,
        modelAnswer:
          "Mass of water = density × volume = 1 × 500 = 500 g. Freezing doesn't change the mass, so there is 500 g of ice.\n\nVolume of ice = mass ÷ density = 500 ÷ 0.92 ≈ 543 cm³.\n\n543 cm³ is more than the 500 cm³ the tub holds, so Mei is wrong: the ice needs about 43 cm³ more space, so it will push the lid off or crack the tub. The *mass* stays the same, but the *volume* grows because ice is less dense than water.",
        markScheme: [
          { point: "Mass of water 500 g, and the mass stays the same when it freezes", keywords: ["500 g", "same mass", "mass stays", "mass doesn't change", "mass does not change"] },
          { point: "Volume of ice = 500 ÷ 0.92 ≈ 543 cm³", keywords: ["543", "543.5", "543.48"] },
          { point: "Conclusion: no, the ice is bigger than 500 cm³ (by about 43 cm³), so it won't fit", keywords: ["no", "won't fit", "will not fit", "more than 500", "bigger", "43", "wrong"] },
        ],
        commonError: "Working out 500 × 0.92 = 460 cm³ and saying the ice shrinks. Volume = mass ÷ density, so a smaller density means a **bigger** volume.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "What stays the same when water freezes: the mass or the volume?",
          "Find the mass of the water, using mass = density × volume.",
          "Now find the volume of that mass of ice: volume = mass ÷ density.",
        ],
        strategy: "Look for an invariant",
      },
      // ------------------------------------------------------------- q17
      {
        kind: "short",
        id: "rates-units-p3-q17",
        question:
          "Ravi leaves school at 15:00 and walks home at a steady 5 km/h. His sister Mei leaves the same school at 15:12 and cycles home along the same route at a steady 15 km/h. Their home is 3 km from school. How far from school, in km, does Mei catch up with Ravi?",
        answer: { type: "number", value: 1.5, display: "1.5 km" },
        traps: [
          { spec: { type: "number", value: 0.75 }, feedback: "They are moving in the **same** direction, so the gap closes at 15 − 5 = 10 km/h, not 15 + 5." },
          { spec: { type: "number", value: 1 }, feedback: "1 km is Ravi's head start at 15:12. Mei still has to close that gap while Ravi keeps walking." },
        ],
        solution: [
          "By 15:12 Ravi has walked for 12 min = 0.2 h, covering 5 × 0.2 = 1 km. That is his head start.",
          "Both move the same way, so Mei closes the gap at 15 − 5 = 10 km/h.",
          "Time to close 1 km: 1 ÷ 10 = 0.1 h = 6 min, so she catches him at 15:18.",
          "Mei has cycled 15 × 0.1 = 1.5 km from school. Check: Ravi has walked 1 + 5 × 0.1 = 1.5 km too. This is less than 3 km, so it happens before they get home.",
        ],
        commonError: "Adding the speeds. Speeds add when people move towards each other; when one chases the other, the gap closes at the difference of the speeds.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Draw the route. Where is Ravi when Mei sets off?",
          "Each hour, how much closer does Mei get to Ravi?",
          "The gap is 1 km and it shrinks by 15 − 5 = 10 km every hour.",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q18
      {
        kind: "short",
        id: "rates-units-p3-q18",
        question:
          "Two money changers in a mall change Singapore dollars into Malaysian ringgit (RM).\n\n- **Changer A:** $1 = RM 3.30, but it first keeps a $5 fee from the money you hand over.\n- **Changer B:** $1 = RM 3.20, with no fee.\n\nIf you drew a conversion graph for each changer, the two lines would cross. For what amount of Singapore dollars handed over do both changers give exactly the same number of ringgit?",
        answer: { type: "number", value: 165, display: "$165" },
        traps: [
          { spec: { type: "number", value: 50 }, feedback: "The fee is $5, which costs you 5 × RM 3.30 = RM 16.50 at Changer A — not RM 5." },
        ],
        solution: [
          "Suppose you hand over $x. Changer A converts only x − 5 dollars, giving 3.30(x − 5) = 3.30x − 16.50 ringgit. Changer B gives 3.20x ringgit.",
          "Set them equal: 3.30x − 16.50 = 3.20x.",
          "So 0.10x = 16.50, giving x = 165.",
          "Check: A gives 3.30 × 160 = RM 528, and B gives 3.20 × 165 = RM 528.",
        ],
        solutions: [
          {
            label: "Catch-up reasoning (no algebra)",
            steps: [
              "A's fee puts it RM 16.50 behind at the start (the $5 it keeps is worth 5 × 3.30 ringgit).",
              "For every dollar you hand over, A's better rate wins back RM 0.10.",
              "A catches up after 16.50 ÷ 0.10 = 165 dollars. For more than $165, A is the better deal; for less, B is.",
            ],
          },
        ],
        commonError: "Treating the fee as RM 5 instead of $5.",
        difficulty: "challenge",
        guideRef: "conversion-graphs",
        hints: [
          "Try an amount. With $100, which changer gives more? Now try $200.",
          "Let the amount be $x. Write an expression for the ringgit each changer gives.",
          "Set the two expressions equal. Or think: A starts RM 16.50 behind but gains RM 0.10 on every dollar.",
        ],
        strategy: "Introduce a variable",
      },
      // ------------------------------------------------------------- q19
      {
        kind: "short",
        id: "rates-units-p3-q19",
        question:
          "A map has a scale of 1 : 50 000. On the map, a nature reserve covers an area of 6 cm². What is the real area of the nature reserve, in km²?",
        answer: { type: "number", value: 1.5, display: "1.5 km²" },
        traps: [
          { spec: { type: "number", value: 3 }, feedback: "You scaled the area like a length. A 1 cm by 1 cm square on the map stands for a real square 0.5 km by 0.5 km, which is 0.25 km², not 0.5 km²." },
          { spec: { type: "number", value: 300000 }, feedback: "6 × 50 000 scales a length, not an area — and the units need changing to km too. Find what 1 cm on the map stands for in km first." },
        ],
        solution: [
          "Lengths first: 1 cm on the map stands for 50 000 cm = 500 m = 0.5 km in real life.",
          "So a 1 cm by 1 cm square on the map stands for a real square 0.5 km by 0.5 km, with area 0.5 × 0.5 = 0.25 km².",
          "Each cm² on the map is 0.25 km², so 6 cm² stands for 6 × 0.25 = 1.5 km².",
        ],
        solutions: [
          {
            label: "Picture a rectangle",
            steps: [
              "Imagine the reserve as a 3 cm by 2 cm rectangle on the map (area 6 cm²).",
              "Real lengths: 3 × 0.5 = 1.5 km and 2 × 0.5 = 1 km.",
              "Real area = 1.5 × 1 = 1.5 km². Any shape with area 6 cm² scales the same way.",
            ],
          },
        ],
        commonError: "Multiplying the map area by the length scale only once. Areas scale by the length factor **squared**.",
        difficulty: "challenge",
        guideRef: "area-volume-units",
        hints: [
          "What real length, in km, does 1 cm on the map stand for?",
          "A 1 cm by 1 cm square on the map stands for a real square. How big is that square, and what is its area?",
          "Each cm² on the map stands for 0.5 × 0.5 km². Now scale up to 6 cm².",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q20
      {
        kind: "written",
        id: "rates-units-p3-q20",
        question:
          "Zara cycles a 30 km route. She says: \"Speeding up from 10 km/h to 20 km/h saves me the same amount of time as speeding up from 20 km/h to 30 km/h, because both are increases of 10 km/h.\"\n\n(a) Test Zara's claim for her 30 km route.\n\n(b) Show that, whatever the length of the route, the first saving is always 3 times the second.",
        marks: 4,
        modelAnswer:
          "(a) Time = distance ÷ speed. At 10 km/h: 30 ÷ 10 = 3 h. At 20 km/h: 30 ÷ 20 = 1.5 h. At 30 km/h: 30 ÷ 30 = 1 h.\n\nGoing from 10 to 20 km/h saves 3 − 1.5 = 1.5 h (90 min). Going from 20 to 30 km/h saves only 1.5 − 1 = 0.5 h (30 min). The savings are not the same, so Zara is wrong.\n\n(b) For a route of d km, the times are {{d/10}}, {{d/20}} and {{d/30}} hours.\n\nFirst saving: {{d/10 - d/20 = 2d/20 - d/20 = d/20}}. Second saving: {{d/20 - d/30 = 3d/60 - 2d/60 = d/60}}.\n\n{{d/20 = 3d/60}}, which is 3 times {{d/60}}, whatever d is. Time is distance ÷ speed, so each extra 10 km/h saves less time than the one before.",
        markScheme: [
          { point: "Times for 30 km: 3 h, 1.5 h and 1 h", keywords: ["3 h", "3 hours", "1.5", "1 h", "1 hour"] },
          { point: "Savings 1.5 h (90 min) and 0.5 h (30 min), so Zara is wrong", keywords: ["90", "0.5", "30 min", "wrong", "not the same", "no"] },
          { point: "General times {{d/10}}, {{d/20}} and {{d/30}} for a route of d km", keywords: ["d/10", "d/20", "d/30", "d ÷ 10", "d ÷ 20"] },
          { point: "Savings {{d/20}} and {{d/60}}, and {{d/20 = 3 * d/60}}", keywords: ["d/60", "3d/60", "3 times", "three times"] },
        ],
        commonError: "Assuming time goes down by equal steps when speed goes up by equal steps. Time = distance ÷ speed, so dividing by bigger and bigger speeds changes the time by less and less.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Work out how long the 30 km route takes at each of the three speeds.",
          "Compare the two savings. Are they equal?",
          "For (b), call the length d km and write each time as a fraction with d on top.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "rates-units-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      // ------------------------------------------------------------- q01
      {
        kind: "short",
        id: "rates-units-p4-q01",
        question:
          "Ethan is rewriting his grandmother's chickpea curry recipe so that every amount is in grams (g) or millilitres (ml).\n\n| Ingredient | Recipe says | Rewrite as |\n|---|---|---|\n| Potatoes | 0.75 kg | ? g |\n| Coconut milk | 0.4 litres | ? ml |\n| Turmeric | 0.006 kg | ? g |\n\nGive the three new amounts in the order of the table, separated by commas.",
        answer: { type: "list", values: [750, 400, 6], ordered: true, display: "750 g, 400 ml, 6 g" },
        traps: [
          {
            spec: { type: "list", values: [75, 40, 0.6], ordered: true },
            feedback: "kilo- means 1000, and 1 litre = 1000 ml. Multiply by 1000, not 100.",
          },
        ],
        solution: [
          "kg → g and litres → ml both go to a smaller unit, so multiply by 1000.",
          "Potatoes: 0.75 × 1000 = 750 g.",
          "Coconut milk: 0.4 × 1000 = 400 ml.",
          "Turmeric: 0.006 × 1000 = 6 g.",
        ],
        commonError: "Multiplying by 100 instead of 1000.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["Going to a smaller unit: multiply or divide? By how much?"],
        strategy: "Convert to the same unit",
      },
      // ------------------------------------------------------------- q02
      {
        kind: "short",
        id: "rates-units-p4-q02",
        question:
          "A car park charges 2 cents for every minute. Jun's dad parks there from 10:35 to 12:10. How much does he pay? Give your answer in dollars.",
        answer: { type: "number", value: 1.9, display: "$1.90" },
        traps: [
          { spec: { type: "number", value: 2.7 }, feedback: "You treated the times as decimals: 12.10 − 10.35 = 1.75, read as 1 h 75 min (135 min). Clock times aren't decimals — there are 60 minutes in an hour. Count on 10:35 → 11:00 → 12:00 → 12:10." },
          { spec: { type: "number", value: 190 }, feedback: "190 is the cost in **cents**. Give your answer in dollars." },
        ],
        solution: [
          "Count on: 10:35 → 11:00 is 25 min, 11:00 → 12:00 is 60 min, 12:00 → 12:10 is 10 min.",
          "Total time = 25 + 60 + 10 = 95 minutes.",
          "Cost = 95 × 2 = 190 cents = $1.90.",
        ],
        commonError: "Subtracting 10.35 from 12.10 as if they were decimals.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["How many minutes is it from 10:35 to 12:10? Count on through 11:00 and 12:00.", "Multiply the minutes by 2 cents, then change cents into dollars."],
        strategy: "Count on in friendly jumps",
      },
      // ------------------------------------------------------------- q03
      {
        kind: "short",
        id: "rates-units-p4-q03",
        question:
          "Mei's running app is set to miles. After her run it shows 3.5 miles. Her target was 5 km. Using 1 mile ≈ 1.6 km, by how many kilometres did she beat her target?",
        answer: { type: "number", value: 0.6, display: "0.6 km" },
        traps: [
          { spec: { type: "number", value: 1.5 }, feedback: "You can't subtract miles from kilometres. Change 3.5 miles into km first." },
          { spec: { type: "number", value: 0.375 }, feedback: "That difference is in miles. The question asks for kilometres." },
        ],
        solution: ["3.5 miles ≈ 3.5 × 1.6 = 5.6 km.", "5.6 − 5 = 0.6 km more than her target."],
        commonError: "Subtracting 3.5 from 5 without converting.",
        difficulty: "warmup",
        guideRef: "imperial-units",
        hints: ["Put both distances in the same unit first.", "Miles → km: multiply by 1.6."],
        strategy: "Convert to the same unit",
      },
      // ------------------------------------------------------------- q04
      {
        kind: "short",
        id: "rates-units-p4-q04",
        question:
          "Supermarket shelf labels show a **unit price** for each 100 g. A 750 g tub of Greek yogurt costs $4.50. What unit price should its label show? Give your answer in dollars.",
        answer: { type: "number", value: 0.6, display: "$0.60 per 100 g" },
        traps: [
          { spec: { type: "number", value: 6 }, feedback: "$6.00 is the price per **kilogram**. The label needs the price per 100 g." },
          { spec: { type: "number", value: 0.06 }, feedback: "750 g is 7.5 lots of 100 g, not 75 lots." },
        ],
        solution: ["750 g is 750 ÷ 100 = 7.5 lots of 100 g.", "Unit price = 4.50 ÷ 7.5 = $0.60 per 100 g."],
        solutions: [
          { label: "Find 250 g first", steps: ["750 g costs $4.50, so 250 g costs $1.50 (divide by 3).", "100 g is {{2/5}} of 250 g: {{2/5}} × 1.50 = $0.60."] },
        ],
        commonError: "Dividing by 75 instead of 7.5.",
        difficulty: "warmup",
        guideRef: "density-and-rates",
        hints: ["How many lots of 100 g are in 750 g?", "Share the price equally between them."],
        strategy: "Use the unitary method",
      },
      // ------------------------------------------------------------- q05
      {
        kind: "short",
        id: "rates-units-p4-q05",
        question: "On the Circle Line, a train travels 1.2 km between two stations in 2 minutes. What is its average speed in km/h?",
        answer: { type: "number", value: 36, display: "36 km/h" },
        traps: [
          { spec: { type: "number", value: 0.6 }, feedback: "0.6 km is the distance per **minute**. There are 60 minutes in an hour." },
          { spec: { type: "number", value: 2.4 }, feedback: "Speed = distance ÷ time, not distance × time." },
        ],
        solution: ["In 2 minutes the train travels 1.2 km, so in 1 minute it travels 0.6 km.", "In 60 minutes: 0.6 × 60 = 36 km. So the speed is 36 km/h."],
        commonError: "Giving the speed in km per minute (0.6) when km/h is asked for.",
        difficulty: "warmup",
        guideRef: "speed",
        hints: ["How far does the train go in 1 minute?", "How many minutes are there in an hour?"],
        strategy: "Use the unitary method",
      },
      // ------------------------------------------------------------- q06
      {
        kind: "short",
        id: "rates-units-p4-q06",
        question:
          "The distance–time graph shows Hana's bike ride from home to East Coast Park and back.\n\n(a) Find her speed on the way **to** the park, in km/h.\n\n(b) Find her average speed for the whole trip, including the stop, in km/h.\n\nType your two answers in order as numbers, separated by a comma.",
        diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance-time graph. Time in minutes from 0 to 120 across, grid every 10 minutes. Distance from home in km from 0 to 12 up, grid every 2 km. The line rises from 0 km at 0 minutes to 10 km at 40 minutes, stays flat at 10 km until 70 minutes, then falls back to 0 km at 120 minutes."><rect width="480" height="310" fill="#ffffff"/><path d="M90 70V250M120 70V250M150 70V250M180 70V250M210 70V250M240 70V250M270 70V250M300 70V250M330 70V250M360 70V250M390 70V250M420 70V250M60 220H420M60 190H420M60 160H420M60 130H420M60 100H420M60 70H420" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="60" y1="250" x2="430" y2="250" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="250" x2="60" y2="60" stroke="#334155" stroke-width="1.5"/><polyline points="60,250 180,100 270,100 420,250" fill="none" stroke="#1d4ed8" stroke-width="2.5"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="266">0</text><text x="120" y="266">20</text><text x="180" y="266">40</text><text x="240" y="266">60</text><text x="300" y="266">80</text><text x="360" y="266">100</text><text x="420" y="266">120</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="52" y="254">0</text><text x="52" y="224">2</text><text x="52" y="194">4</text><text x="52" y="164">6</text><text x="52" y="134">8</text><text x="52" y="104">10</text><text x="52" y="74">12</text></g><text x="240" y="292" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Time (minutes)</text><text x="18" y="160" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 160)">Distance from home (km)</text></svg>`,
        answer: { type: "list", values: [15, 10], ordered: true, display: "(a) 15 km/h, (b) 10 km/h" },
        traps: [
          {
            spec: { type: "list", values: [15, 13.5], ordered: true },
            feedback: "13.5 km/h is the mean of the two riding speeds, 15 and 12. Average speed = total distance ÷ total time.",
          },
          {
            spec: { type: "list", values: [15, 13.33], ordered: true, tolerance: 0.05 },
            feedback: "Include the 30-minute stop in the total time: the whole trip took 2 hours.",
          },
        ],
        solution: [
          "(a) She rides 10 km in the first 40 min. 40 min = {{2/3}} h, so speed = 10 ÷ {{2/3}} = 15 km/h. (Or: 10 km in 40 min is 2.5 km every 10 min, which is 15 km in 60 min.)",
          "(b) Total distance = 10 km out + 10 km back = 20 km.",
          "Total time = 120 min = 2 h (the flat part, her 30-minute stop, counts).",
          "Average speed = 20 ÷ 2 = 10 km/h.",
        ],
        commonError: "Using only 10 km as the total distance for (b), forgetting the ride home.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Read the graph: how far is the park from home, and how long does each part of the trip take?",
          "For (a), change 40 minutes into hours, or find the distance covered in 10 minutes.",
          "For (b), the total distance is there **and** back, and the total time includes the flat part of the graph.",
        ],
        strategy: "Read the graph carefully",
      },
      // ------------------------------------------------------------- q07
      {
        kind: "short",
        id: "rates-units-p4-q07",
        question:
          "Here are the times of an overnight flight. Both times are **local** times.\n\n| | Local time |\n|---|---|\n| Departs Singapore | 21:50 |\n| Arrives Sydney (next day) | 08:05 |\n\nIn June, Sydney time is 2 hours **ahead** of Singapore time. How long is the flight? Give your answer in hours and minutes, for example 7 h 5 min.",
        answer: { type: "list", values: [8, 15], ordered: true, display: "8 h 15 min" },
        traps: [
          {
            spec: { type: "list", values: [10, 15], ordered: true },
            feedback: "That ignores the time difference. Put both times in the same time zone first.",
          },
          {
            spec: { type: "list", values: [12, 15], ordered: true },
            feedback: "Sydney is **ahead**, so subtract 2 hours from the Sydney time to get the Singapore time.",
          },
        ],
        solution: [
          "Change the arrival time into Singapore time. Sydney is 2 hours ahead, so 08:05 in Sydney is 06:05 in Singapore.",
          "Count on from 21:50 to 06:05 (both Singapore time): 21:50 → 22:00 is 10 min, 22:00 → 06:00 is 8 h, 06:00 → 06:05 is 5 min.",
          "Total: 8 h 15 min.",
        ],
        commonError: "Working out the time between 21:50 and 08:05 without allowing for the time difference.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "The two times are in different time zones. Put them both in Singapore time.",
          "Sydney is ahead: when it is 08:05 in Sydney, what time is it in Singapore?",
          "Count on from 21:50, using midnight as a stepping stone.",
        ],
        strategy: "Count on in friendly jumps",
      },
      // ------------------------------------------------------------- q08
      {
        kind: "written",
        id: "rates-units-p4-q08",
        question:
          "Ravi designs a juice carton. It is a cuboid with a square base 7 cm by 7 cm and a height of 20 cm. He says: \"My carton will hold 1 litre of juice.\"\n\n(a) Is Ravi right? Explain.\n\n(b) Keeping the same base, what is the least whole number of centimetres the height could be, so that the carton holds at least 1 litre?",
        marks: 3,
        modelAnswer:
          "(a) Volume = 7 × 7 × 20 = 980 cm³. 1 litre = 1000 cm³, so the carton holds only 980 ml, which is 20 ml short. Ravi is not right.\n\n(b) The base area is 7 × 7 = 49 cm², so the height must be at least 1000 ÷ 49 ≈ 20.4 cm. A height of 20 cm is too small, so the least whole number of centimetres is **21 cm** (21 × 49 = 1029 cm³).",
        markScheme: [
          { point: "Volume 980 cm³", keywords: ["980"] },
          { point: "Compares with 1 litre = 1000 cm³: not enough (20 ml short), so Ravi is wrong", keywords: ["1000", "20 ml", "short", "no", "not right", "wrong"] },
          { point: "Least whole-number height 21 cm (from 1000 ÷ 49 ≈ 20.4)", keywords: ["21", "20.4", "1029"] },
        ],
        commonError: "Rounding 20.4 down to 20 cm. That brings you back to 980 cm³ — not enough — so round **up**.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "How many cm³ make 1 litre?",
          "Find the volume of Ravi's carton and compare.",
          "For (b), work backwards: height = volume ÷ base area. Then decide whether to round up or down.",
        ],
        strategy: "Work backwards",
      },
      // ------------------------------------------------------------- q09
      {
        kind: "short",
        id: "rates-units-p4-q09",
        question:
          "Wei Ling needs **at least 3 litres** of laundry liquid. The shop sells these bottles, and she can buy any mix of them.\n\n| Size | Volume | Price |\n|---|---|---|\n| Small | 800 ml | $5.60 |\n| Medium | 1.5 litres | $9.90 |\n| Large | 2.5 litres | $17.00 |\n\nWhat is the least she can pay? Give your answer in dollars.",
        answer: { type: "number", value: 19.8, display: "$19.80 (two medium bottles)" },
        traps: [
          { spec: { type: "number", value: 17 }, feedback: "One large bottle holds only 2.5 litres — that's not enough." },
          { spec: { type: "number", value: 21.1 }, feedback: "One medium and two small bottles do give at least 3 litres, but there is a cheaper way." },
        ],
        solution: [
          "Unit prices per 100 ml: small 5.60 ÷ 8 = $0.70, medium 9.90 ÷ 15 = $0.66, large 17.00 ÷ 25 = $0.68. Medium is the best value.",
          "Two medium bottles make exactly 3 litres for 2 × $9.90 = $19.80.",
          "Check the other ways of getting at least 3 litres: large + small (3.3 litres) = $22.60; one medium + two small (3.1 litres) = $21.10; four small (3.2 litres) = $22.40. Anything with a large and a medium, or two large, costs even more.",
          "The least she can pay is $19.80.",
        ],
        commonError: "Assuming the largest bottle must be the best value, or buying more liquid than needed without comparing costs.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "Which bottle is the best value per 100 ml?",
          "Can you make at least 3 litres using only the best-value bottles?",
          "List the other combinations that give at least 3 litres and compare their total costs.",
        ],
        strategy: "Split into cases",
      },
      // ------------------------------------------------------------- q10
      {
        kind: "short",
        id: "rates-units-p4-q10",
        question:
          "The graph converts kilograms (kg) into pounds (lb). Ethan is flying with an American airline whose baggage limit is 50 lb. His suitcase has a mass of 25 kg. Use the graph to find by how many pounds his suitcase is over the limit.",
        diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph. Horizontal axis: mass in kilograms from 0 to 10, grid every 1 kg. Vertical axis: mass in pounds from 0 to 24, grid every 2 lb. A straight line runs from the origin to the point 10 kg, 22 lb, which is marked with a dot."><rect width="480" height="310" fill="#ffffff"/><path d="M96 44V260M132 44V260M168 44V260M204 44V260M240 44V260M276 44V260M312 44V260M348 44V260M384 44V260M420 44V260M60 242H420M60 224H420M60 206H420M60 188H420M60 170H420M60 152H420M60 134H420M60 116H420M60 98H420M60 80H420M60 62H420M60 44H420" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="60" y1="260" x2="430" y2="260" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="260" x2="60" y2="36" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="260" x2="420" y2="62" stroke="#1d4ed8" stroke-width="2.5"/><circle cx="420" cy="62" r="4" fill="#1d4ed8"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="276">0</text><text x="96" y="276">1</text><text x="132" y="276">2</text><text x="168" y="276">3</text><text x="204" y="276">4</text><text x="240" y="276">5</text><text x="276" y="276">6</text><text x="312" y="276">7</text><text x="348" y="276">8</text><text x="384" y="276">9</text><text x="420" y="276">10</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="52" y="264">0</text><text x="52" y="228">4</text><text x="52" y="192">8</text><text x="52" y="156">12</text><text x="52" y="120">16</text><text x="52" y="84">20</text><text x="52" y="48">24</text></g><text x="240" y="298" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Mass (kg)</text><text x="18" y="152" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 152)">Mass (lb)</text></svg>`,
        answer: { type: "number", value: 5, display: "5 lb over" },
        traps: [
          { spec: { type: "number", value: 25 }, feedback: "You subtracted kilograms from pounds. Change 25 kg into pounds first." },
          { spec: { type: "number", value: 2.3, tolerance: 0.05 }, feedback: "That difference is in kilograms (50 lb ≈ 22.7 kg). The question asks for pounds." },
        ],
        solution: [
          "Read an exact point from the graph: 10 kg = 22 lb (or 5 kg = 11 lb).",
          "25 kg = 2.5 × 10 kg, so 25 kg = 2.5 × 22 = 55 lb. (Or 5 × 11 = 55 lb.)",
          "55 − 50 = 5 lb over the limit.",
        ],
        commonError: "Comparing 25 with 50 directly, as if they were in the same unit.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "25 kg is off the graph. Read an easy value from the graph first.",
          "What is 10 kg (or 5 kg) in pounds? Scale it up to 25 kg.",
          "Compare your answer in pounds with the 50 lb limit.",
        ],
        strategy: "Read a smaller value, then scale up",
      },
      // ------------------------------------------------------------- q11
      {
        kind: "written",
        id: "rates-units-p4-q11",
        question:
          "The graph converts temperatures from degrees Celsius (°C) to degrees Fahrenheit (°F).\n\nMarcus says: \"To change °C into °F, just double the temperature and add 30.\"\n\nUse the graph to test Marcus's rule at 0 °C and at 100 °C. Is his rule exact? When is it a good estimate?",
        diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph. Horizontal axis: temperature in degrees Celsius from 0 to 100, grid every 10. Vertical axis: temperature in degrees Fahrenheit from 0 to 220, grid every 10. A straight line starts at 32 degrees Fahrenheit on the vertical axis and rises to 212 degrees Fahrenheit at 100 degrees Celsius; both ends are marked with dots."><rect width="480" height="310" fill="#ffffff"/><path d="M96 50V270M132 50V270M168 50V270M204 50V270M240 50V270M276 50V270M312 50V270M348 50V270M384 50V270M420 50V270M60 260H420M60 250H420M60 240H420M60 230H420M60 220H420M60 210H420M60 200H420M60 190H420M60 180H420M60 170H420M60 160H420M60 150H420M60 140H420M60 130H420M60 120H420M60 110H420M60 100H420M60 90H420M60 80H420M60 70H420M60 60H420M60 50H420" stroke="#e2e8f0" stroke-width="1" fill="none"/><path d="M60 230H420M60 190H420M60 150H420M60 110H420M60 70H420M132 50V270M204 50V270M276 50V270M348 50V270M420 50V270" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="60" y1="270" x2="430" y2="270" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="270" x2="60" y2="42" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="238" x2="420" y2="58" stroke="#1d4ed8" stroke-width="2.5"/><circle cx="60" cy="238" r="4" fill="#1d4ed8"/><circle cx="420" cy="58" r="4" fill="#1d4ed8"/><text x="68" y="254" font-family="sans-serif" font-size="11" fill="#1f2937">(0, 32)</text><text x="410" y="46" font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end">(100, 212)</text><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="286">0</text><text x="132" y="286">20</text><text x="204" y="286">40</text><text x="276" y="286">60</text><text x="348" y="286">80</text><text x="420" y="286">100</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="52" y="274">0</text><text x="52" y="234">40</text><text x="52" y="194">80</text><text x="52" y="154">120</text><text x="52" y="114">160</text><text x="52" y="74">200</text></g><text x="240" y="304" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Temperature (°C)</text><text x="18" y="160" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 160)">Temperature (°F)</text></svg>`,
        marks: 3,
        modelAnswer:
          "At 0 °C: Marcus's rule gives 0 × 2 + 30 = 30 °F, but the graph gives about 32 °F. That's close.\n\nAt 100 °C: the rule gives 100 × 2 + 30 = 230 °F, but the graph gives about 212 °F. That's about 18 °F too high.\n\nSo the rule is **not** exact. On the graph, °F goes up by 180 for every 100 °C, which is 1.8 °F per °C, not 2. Because Marcus multiplies by 2, his error grows as the temperature rises. The rule is a good estimate for everyday temperatures (roughly 0 °C to 30 °C, e.g. 10 °C gives 50 °F both ways) but poor for hot things like boiling water.",
        markScheme: [
          { point: "At 0 °C: rule gives 30 °F, graph gives 32 °F", keywords: ["30", "32"] },
          { point: "At 100 °C: rule gives 230 °F, graph gives about 212 °F", keywords: ["230", "212", "210"] },
          { point: "Conclusion: not exact (graph rises 1.8 °F per °C, not 2); a good estimate for everyday or low temperatures, worse as the temperature rises", keywords: ["not exact", "1.8", "everyday", "low", "small", "worse", "further", "grows"] },
        ],
        commonError: "Testing the rule at only one temperature. A rule that works at one point can still go badly wrong elsewhere.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "Use Marcus's rule on 0 °C and on 100 °C first.",
          "Now read the graph at 0 °C and at 100 °C. How far apart are the answers?",
          "On the graph, how much does °F go up for each 1 °C? Compare with Marcus's 'double it'.",
        ],
        strategy: "Check by substituting",
      },
      // ------------------------------------------------------------- q12
      {
        kind: "short",
        id: "rates-units-p4-q12",
        question:
          "**Stretch.** A car has a mass of 1200 kg, so its weight is about 12 000 N. It rests on four tyres. Each tyre touches the road over a rectangle 15 cm by 10 cm, as shown. Using pressure = force ÷ area, find the pressure of the tyres on the road. Give your answer in N/m².",
        diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle 15 cm long and 10 cm wide showing where one tyre touches the road. The car has four tyres like this."><rect width="480" height="200" fill="#ffffff"/><rect x="165" y="30" width="150" height="100" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="240" y="150" text-anchor="middle">15 cm</text><text x="157" y="85" text-anchor="end">10 cm</text><text x="240" y="85" text-anchor="middle">one tyre</text><text x="240" y="182" text-anchor="middle" font-size="12">The car has 4 tyres, each touching the road like this.</text></g></svg>`,
        answer: { type: "number", value: 200000, display: "200 000 N/m²" },
        traps: [
          { spec: { type: "number", value: 20 }, feedback: "20 is in N/cm² (12 000 ÷ 600 cm²). Change the area into m² first: 600 cm² = 0.06 m²." },
          { spec: { type: "number", value: 800000 }, feedback: "The weight is shared between **four** tyres, so use the total area of all four." },
        ],
        solution: [
          "Area of one tyre's patch: 15 cm × 10 cm = 0.15 m × 0.10 m = 0.015 m².",
          "Total area of four tyres: 4 × 0.015 = 0.06 m².",
          "Pressure = force ÷ area = 12 000 ÷ 0.06 = 200 000 N/m².",
        ],
        solutions: [
          {
            label: "One tyre at a time",
            steps: ["Each tyre carries a quarter of the weight: 12 000 ÷ 4 = 3000 N.", "Pressure under one tyre = 3000 ÷ 0.015 = 200 000 N/m². Same answer, because the force and the area were both divided by 4."],
          },
        ],
        commonError: "Leaving the area in cm², which gives an answer in N/cm² instead of N/m².",
        difficulty: "core",
        guideRef: "pressure",
        hints: [
          "Which area does the car's weight press on: one tyre's patch, or all four?",
          "Change 15 cm and 10 cm into metres before finding the area.",
          "Pressure = 12 000 ÷ total area in m².",
        ],
        strategy: "Convert lengths first",
      },
      // ------------------------------------------------------------- q13
      {
        kind: "short",
        id: "rates-units-p4-q13",
        question:
          "Mr Tan is driving at 72 km/h when a ball rolls onto the road 40 m ahead. His reaction time is 0.75 seconds, and during this time the car keeps going at 72 km/h. The brakes then stop the car in a further 22 m.\n\nWhen the car stops, how many metres is it from the ball?",
        answer: { type: "number", value: 3, display: "3 m (it stops in time)" },
        traps: [
          { spec: { type: "number", value: 18 }, feedback: "Don't forget the car keeps moving during Mr Tan's 0.75 s reaction time." },
          { spec: { type: "number", value: 36 }, feedback: "72 × 0.75 mixes km/h with seconds, which makes the car seem to overshoot the ball. Change 72 km/h into m/s first." },
        ],
        solution: [
          "Change the speed into m/s: 72 ÷ 3.6 = 20 m/s.",
          "Distance during the reaction time = 20 × 0.75 = 15 m.",
          "Total stopping distance = 15 + 22 = 37 m.",
          "37 m is less than 40 m, so the car stops 40 − 37 = 3 m before the ball.",
        ],
        commonError: "Multiplying 72 by 0.75 without changing km/h into m/s.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "The car moves before the brakes even start. Make the units match: change 72 km/h into m/s.",
          "How far does the car go in 0.75 s at that speed?",
          "Add the braking distance, then compare with 40 m.",
        ],
        strategy: "Split into parts",
      },
      // ------------------------------------------------------------- q14
      {
        kind: "short",
        id: "rates-units-p4-q14",
        question:
          "A rectangular rice field in Malaysia measures 400 m by 80 m. The farmer expects a harvest of 6 tonnes of rice per hectare (1 hectare = 10 000 m²). The rice is packed into 5 kg bags. How many bags will she fill?",
        answer: { type: "number", value: 3840, display: "3840 bags" },
        traps: [
          { spec: { type: "number", value: 3.84 }, feedback: "You divided tonnes by 5 kg. Change 19.2 tonnes into kilograms first (1 tonne = 1000 kg)." },
          { spec: { type: "number", value: 384000 }, feedback: "1 hectare = 10 000 m², so the field is 3.2 hectares, not 320." },
        ],
        solution: [
          "Area = 400 × 80 = 32 000 m².",
          "In hectares: 32 000 ÷ 10 000 = 3.2 ha.",
          "Harvest = 3.2 × 6 = 19.2 tonnes = 19.2 × 1000 = 19 200 kg.",
          "Bags = 19 200 ÷ 5 = 3840.",
        ],
        commonError: "Forgetting to change tonnes into kilograms before sharing into 5 kg bags.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Find the area first, then change it into hectares.",
          "How many tonnes of rice is that? Change tonnes into kg.",
          "1 tonne = 1000 kg. Then share the rice into 5 kg bags.",
        ],
        strategy: "Work step by step",
      },
      // ------------------------------------------------------------- q15
      {
        kind: "written",
        id: "rates-units-p4-q15",
        question:
          "In an athletics time trial, Aisha ran 5 miles in 40 minutes. Jun ran 10 km in 50 minutes.\n\nAisha says: \"I was faster, because I finished in less time.\"\n\nUsing 5 miles ≈ 8 km, compare their speeds. Is Aisha's reason correct? Show your working.",
        marks: 4,
        modelAnswer:
          "5 miles ≈ 8 km.\n\nAisha: 8 km in 40 min = {{2/3}} h, so her speed = 8 ÷ {{2/3}} = 12 km/h (0.2 km per minute).\n\nJun: 10 km in 50 min = {{5/6}} h, so his speed = 10 ÷ {{5/6}} = 12 km/h (0.2 km per minute).\n\nTo this accuracy they ran at the same speed, so Aisha's reason is not correct. Taking less time doesn't mean running faster when the distances are different: you have to compare the distance covered in each unit of time. (5 miles is really a little more than 8 km, so Aisha was very slightly faster — but not *because* she took less time.)",
        markScheme: [
          { point: "Converts 5 miles to 8 km", keywords: ["8 km", "8"] },
          { point: "Aisha's speed: 12 km/h (or 0.2 km per minute)", keywords: ["12", "0.2"] },
          { point: "Jun's speed: 12 km/h (or 0.2 km per minute)", keywords: ["12", "0.2"] },
          { point: "Conclusion: (about) the same speed, so Aisha's reason is wrong; the distances are different, so time alone can't decide", keywords: ["same", "equal", "wrong", "not right", "no", "different distances"] },
        ],
        commonError: "Comparing the times only. A shorter time means faster only when the distances are the same.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "Can you compare the times fairly when the distances are different?",
          "Put both distances in km, then find each runner's speed.",
          "Compare km per minute (or km per hour) for each runner.",
        ],
        strategy: "Convert to the same unit",
      },
      // ------------------------------------------------------------- q16
      {
        kind: "short",
        id: "rates-units-p4-q16",
        question:
          "Priya has a 25 m roll of ribbon. She cuts it into lanyards for her CCA, each 35 cm long. How many complete lanyards can she cut, and how many centimetres of ribbon are left over? Type the number of lanyards first, then the length left over, separated by a comma.",
        answer: { type: "list", values: [71, 15], ordered: true, display: "71 lanyards, 15 cm left over" },
        traps: [
          {
            spec: { type: "list", values: [71, 0.15], ordered: true },
            feedback: "The left-over length should be in centimetres: 0.15 m = 15 cm.",
          },
          {
            spec: { type: "list", values: [71, 43], ordered: true },
            feedback: "The .43 in 71.43 is a fraction of a lanyard, not 43 cm. Work out 2500 − 71 × 35.",
          },
        ],
        solution: [
          "Convert: 25 m = 25 × 100 = 2500 cm.",
          "2500 ÷ 35 = 71.4…, so she can cut 71 complete lanyards.",
          "71 × 35 = 2485 cm used.",
          "Left over: 2500 − 2485 = 15 cm.",
        ],
        commonError: "Reading the remainder from the decimal part of the calculator answer (71.43 → 43 cm).",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Make the units match first: write 25 m in cm.",
          "How many whole 35 cm pieces fit into 2500 cm?",
          "Multiply back to find the length used, then subtract it from 2500 cm.",
        ],
        strategy: "Convert to the same unit",
      },
      // ------------------------------------------------------------- q17
      {
        kind: "short",
        id: "rates-units-p4-q17",
        question:
          "At an MRT station, Jun stands still on a moving escalator and reaches the top in 60 seconds. When the escalator is switched off, he walks up it in 40 seconds. How many seconds does it take him to walk up at his usual pace while the escalator is moving?",
        answer: { type: "number", value: 24, display: "24 seconds" },
        traps: [
          { spec: { type: "number", value: 50 }, feedback: "50 is the mean of 60 and 40. With the escalator helping him, he should be **faster** than either on its own." },
          { spec: { type: "number", value: 100 }, feedback: "Adding the times would make him slower. Times don't add here, but speeds do." },
        ],
        solution: [
          "Times can't be combined directly, but speeds can. Choose a convenient length for the escalator: 120 steps (60 and 40 both divide into 120).",
          "Escalator alone: 120 ÷ 60 = 2 steps per second. Walking alone: 120 ÷ 40 = 3 steps per second.",
          "Walking on the moving escalator, the speeds add: 2 + 3 = 5 steps per second.",
          "Time = 120 ÷ 5 = 24 seconds.",
        ],
        solutions: [
          {
            label: "Fractions of the escalator per second",
            steps: [
              "Each second the escalator carries him {{1/60}} of the way and his walking adds {{1/40}} of the way.",
              "Together: {{1/60 + 1/40 = 2/120 + 3/120 = 5/120 = 1/24}} of the way each second.",
              "So the whole escalator takes 24 seconds.",
            ],
          },
        ],
        commonError: "Averaging or adding the two times. The answer must be less than 40 s, because the escalator helps him.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Estimate first: should the answer be more or less than 40 seconds?",
          "Speeds add, but times don't. Pick a length for the escalator that 60 and 40 both divide into.",
          "With 120 steps: the escalator moves 2 steps per second and Jun walks 3 steps per second.",
        ],
        strategy: "Try a convenient number",
      },
      // ------------------------------------------------------------- q18
      {
        kind: "short",
        id: "rates-units-p4-q18",
        question:
          "A plane leaves London at 22:00 (London time) and lands in Singapore at 18:00 (Singapore time) the next day. On the way back, it leaves Singapore at 09:00 (Singapore time) and lands in London at 16:00 (London time) the same day.\n\nBecause of the winds, the two flights take different lengths of time. You are **not** told the time difference between London and Singapore. Find the mean of the two flight times, in hours.",
        answer: { type: "number", value: 13.5, display: "13.5 hours (13 h 30 min)" },
        traps: [
          { spec: { type: "number", value: 27 }, feedback: "27 hours is the **total** of the two flight times. The question asks for the mean." },
          { spec: { type: "number", value: 6.5 }, feedback: "6.5 is half of 20 − 7. Subtracting the clock times would only give the time *difference* (and only if both flights took equally long) — not a flight time. Add the two clock times instead: the unknown time difference cancels out." },
        ],
        solution: [
          "Let the time difference be d hours (Singapore ahead of London).",
          "Outbound: the clocks show 22:00 to 18:00 the next day, which is 20 hours. Singapore clocks are ahead, so this is the flight time **plus** d: outbound time + d = 20.",
          "Homebound: the clocks show 09:00 to 16:00, which is 7 hours. London clocks are behind, so this is the flight time **minus** d: homebound time − d = 7.",
          "Add the two equations: outbound time + homebound time = 27 hours. The unknown d cancels out!",
          "Mean flight time = 27 ÷ 2 = 13.5 hours.",
          "Check with the real summer time difference of 7 hours: outbound = 20 − 7 = 13 h and homebound = 7 + 7 = 14 h. The mean is 13.5 h.",
        ],
        commonError: "Treating 20 hours or 7 hours as real flight times. Each one is mixed up with the time difference.",
        difficulty: "challenge",
        guideRef: "time",
        hints: [
          "How many hours pass on the clocks for each flight? Why can't these be the real flight times?",
          "Call the time difference d. Write each real flight time using d.",
          "Add the two real flight times together. What happens to d?",
        ],
        strategy: "Look for an invariant",
      },
      // ------------------------------------------------------------- q19
      {
        kind: "written",
        id: "rates-units-p4-q19",
        question:
          "A cube with edges of 10 cm looks like solid aluminium, but its mass is only 1.62 kg. Aluminium has a density of 2.7 g/cm³.\n\n(a) Show that the cube cannot be solid aluminium.\n\n(b) The cube is aluminium with a hollow space inside. Find the volume of the hollow space.",
        marks: 4,
        modelAnswer:
          "Volume of the cube = 10 × 10 × 10 = 1000 cm³. Mass = 1.62 kg = 1620 g.\n\n(a) A solid aluminium cube would have mass = density × volume = 2.7 × 1000 = 2700 g = 2.7 kg. The cube is only 1.62 kg, so it cannot be solid. (Or: its average density is 1620 ÷ 1000 = 1.62 g/cm³, less than 2.7 g/cm³.)\n\n(b) Volume of aluminium = mass ÷ density = 1620 ÷ 2.7 = 600 cm³.\n\nHollow space = 1000 − 600 = 400 cm³.",
        markScheme: [
          { point: "Cube volume 1000 cm³ and mass 1620 g", keywords: ["1000", "1620"] },
          { point: "Solid mass would be 2700 g (or average density 1.62 g/cm³ < 2.7), so not solid", keywords: ["2700", "2.7 kg", "1.62 g", "not solid", "less than 2.7"] },
          { point: "Volume of aluminium 600 cm³", keywords: ["600"] },
          { point: "Hollow volume 400 cm³", keywords: ["400"] },
        ],
        commonError: "Dividing 1.62 by 2.7 without changing kg into g, which gives 0.6 cm³ of metal — far too little.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "What would a solid aluminium cube of this size weigh?",
          "Change 1.62 kg into grams. What volume of aluminium has that mass?",
          "The hollow space is the rest of the 1000 cm³.",
        ],
        strategy: "Work backwards",
      },
      // ------------------------------------------------------------- q20
      {
        kind: "short",
        id: "rates-units-p4-q20",
        question:
          "Gold can be beaten into extremely thin gold leaf. A goldsmith beats 1 g of gold (density 19.3 g/cm³) into a square sheet 0.0001 mm thick. How long is each side of the square? Give your answer to the nearest centimetre.",
        answer: { type: "number", value: 72, display: "72 cm" },
        traps: [
          { spec: { type: "number", value: 5181, tolerance: 1 }, feedback: "That's the **area** of the sheet in cm². The question asks for the length of each side." },
          { spec: { type: "number", value: 23, tolerance: 0.3 }, feedback: "Check the thickness: 0.0001 mm must be changed into cm before you divide. 10 mm = 1 cm, so 0.0001 mm = 0.00001 cm." },
        ],
        solution: [
          "The volume of gold doesn't change when it is beaten flat. Volume = mass ÷ density = 1 ÷ 19.3 ≈ 0.0518 cm³.",
          "Thickness in cm: 0.0001 mm = 0.0001 ÷ 10 = 0.00001 cm.",
          "The sheet is a very flat cuboid, so volume = area × thickness. Area = 0.0518 ÷ 0.00001 ≈ 5181 cm².",
          "The sheet is a square, so side = {{sqrt(5181)}} ≈ 71.98 cm, which is 72 cm to the nearest centimetre.",
        ],
        commonError: "Forgetting to change the thickness from mm into cm, so the units of volume and length don't match.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "The volume of gold stays the same when it is beaten flat. Find that volume first.",
          "A thin sheet is a very flat cuboid: volume = area × thickness. Put the thickness in cm.",
          "Area = volume ÷ thickness. The side of a square is the square root of its area.",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },
];
