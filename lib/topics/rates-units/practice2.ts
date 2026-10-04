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
          "A drinks stall at a hawker centre makes bandung in a dispenser that holds 12 litres. Each cup holds 300 ml. How many cups can be filled from one full dispenser?",
        answer: { type: "number", value: 40, display: "40 cups" },
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "Check the conversion: 1 litre = 1000 ml, not 100 ml." },
          { spec: { type: "number", value: 0.04 }, feedback: "You divided 12 by 300 without converting. Change 12 litres into millilitres first." },
        ],
        solution: [
          "The units don't match, so convert first: 12 litres = 12 × 1000 = 12 000 ml.",
          "Number of cups = 12 000 ÷ 300 = 40.",
        ],
        commonError: "Using 1 litre = 100 ml, which gives only 4 cups — far too few for a 12-litre dispenser.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["Make the units match first: how many millilitres are in 12 litres?"],
        strategy: "Convert to the same unit",
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
          "Zara walks to school at a steady 4 km/h. Her school is 1.2 km from home. How many minutes does her walk take?",
        answer: { type: "number", value: 18, display: "18 minutes" },
        traps: [
          { spec: { type: "number", value: 0.3 }, feedback: "0.3 is the time in **hours**. The question asks for minutes, so multiply by 60." },
          { spec: { type: "number", value: 30 }, feedback: "0.3 hours is not 30 minutes. An hour has 60 minutes: 0.3 × 60 = 18." },
        ],
        solution: ["Time = distance ÷ speed = 1.2 ÷ 4 = 0.3 hours.", "0.3 h = 0.3 × 60 = 18 minutes."],
        commonError: "Reading 0.3 h as 30 minutes.",
        difficulty: "warmup",
        guideRef: "speed",
        hints: ["Which version of the speed formula gives the time?", "Your first answer will be in hours. How do you change hours into minutes?"],
        strategy: "Use the inverse",
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
          "Arjun needs exactly 10 kg of basmati rice for a community kitchen. The shop sells 5 kg bags for $13.50 and 2 kg bags for $5.80. He will buy bags of one size only. How much does he save by choosing the better-value size instead of the other one?",
        answer: { type: "number", value: 2, display: "$2.00" },
        traps: [
          { spec: { type: "number", value: 0.2 }, feedback: "$0.20 is the saving on **one** kilogram. Arjun buys 10 kg." },
          { spec: { type: "number", value: 7.7 }, feedback: "You compared one bag of each, but the bags hold different amounts. Compare the cost of the same 10 kg." },
        ],
        solution: [
          "Price per kg: 5 kg bag → 13.50 ÷ 5 = $2.70 per kg. 2 kg bag → 5.80 ÷ 2 = $2.90 per kg. The 5 kg bag is better value.",
          "10 kg in 5 kg bags: 2 × $13.50 = $27.00.",
          "10 kg in 2 kg bags: 5 × $5.80 = $29.00.",
          "Saving = $29.00 − $27.00 = $2.00.",
        ],
        solutions: [
          {
            label: "Per-kilogram shortcut",
            steps: ["The 5 kg bags save 2.90 − 2.70 = $0.20 on every kilogram.", "Over 10 kg: 10 × $0.20 = $2.00."],
          },
        ],
        commonError: "Comparing the bag prices directly, even though the bags hold different amounts of rice.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "To compare fairly, compare the cost of the same amount of rice.",
          "What does 1 kg cost in each size of bag?",
          "Work out the total cost of 10 kg with each size, then subtract.",
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
          "Hana's family is filling a new garden pond. It is a cuboid 2 m long, 1.5 m wide and 0.6 m deep. The hose delivers water at 12 litres per minute.\n\nHana says: \"It will be full in under 2 hours.\"\n\nIs she right? Show your working.",
        marks: 4,
        modelAnswer:
          "Volume = 2 × 1.5 × 0.6 = 1.8 m³.\n\n1 m³ = 1000 litres, so the pond holds 1.8 × 1000 = 1800 litres.\n\nTime = 1800 ÷ 12 = 150 minutes = 2 h 30 min.\n\nHana is wrong: filling the pond takes two and a half hours, which is more than 2 hours.",
        markScheme: [
          { point: "Volume 1.8 m³", keywords: ["1.8", "1 800 000", "1800000"] },
          { point: "Converts to 1800 litres", keywords: ["1800", "1 800"] },
          { point: "Time 150 minutes (2.5 hours)", keywords: ["150", "2.5", "2 h 30"] },
          { point: "Conclusion: Hana is wrong, it takes longer than 2 hours", keywords: ["no", "wrong", "not right", "longer", "more than 2"] },
        ],
        commonError: "Using 1 m³ = 100 litres. A 1 m cube holds 1000 litres (ten layers of 10 cm × 10 cm × 10 cm litre-cubes, 100 in each layer).",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "How much water does the pond hold? Find the volume in m³ first.",
          "Change m³ into litres: 1 m³ = 1000 litres.",
          "Divide the litres by the flow rate to get the time in minutes.",
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
          "A jeweller tests a ring that is sold as pure gold. The ring has a mass of 38.6 g. When it is dropped into a measuring cylinder of water, the water level rises by 2.5 ml. Pure gold has a density of 19.3 g/cm³.\n\nIs the ring pure gold? Explain your answer with calculations.",
        marks: 3,
        modelAnswer:
          "The ring pushes aside its own volume of water, so its volume is 2.5 ml = 2.5 cm³.\n\nDensity = mass ÷ volume = 38.6 ÷ 2.5 = 15.44 g/cm³.\n\nThis is less than 19.3 g/cm³, so the ring is not pure gold: it must contain some less dense metal. (Check: pure gold with volume 2.5 cm³ would have a mass of 19.3 × 2.5 = 48.25 g, not 38.6 g.)",
        markScheme: [
          { point: "Uses volume 2.5 cm³ (1 ml = 1 cm³) with density = mass ÷ volume", keywords: ["2.5", "mass ÷ volume", "mass/volume", "1 ml = 1 cm³", "divide"] },
          { point: "Density 15.44 g/cm³ (or mass of a pure-gold ring 48.25 g)", keywords: ["15.44", "15.4", "48.25"] },
          { point: "Conclusion: not pure gold, because its density is less than 19.3", keywords: ["not pure", "not gold", "less than 19.3", "less dense", "no"] },
        ],
        commonError: "Dividing the wrong way (2.5 ÷ 38.6) or multiplying. Density is grams per cm³, so the mass is divided by the volume.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "What does the rise in the water level tell you about the ring?",
          "1 ml = 1 cm³. Now use density = mass ÷ volume.",
          "Compare your density with 19.3 g/cm³.",
        ],
        strategy: "Compare with a known value",
      },
      // ------------------------------------------------------------- q17
      {
        kind: "short",
        id: "rates-units-p3-q17",
        question:
          "Mei and Ravi live 26 km apart along a straight road. At 09:00 Mei sets off cycling towards Ravi's home at 15 km/h. At 09:20 Ravi sets off walking towards Mei's home at 6 km/h. How far from Mei's home, in km, do they meet?",
        answer: { type: "number", value: 20, display: "20 km" },
        traps: [
          { spec: { type: "number", value: 18.57, tolerance: 0.02 }, feedback: "Ravi starts 20 minutes later. Work out how far Mei gets on her own first." },
          { spec: { type: "number", value: 6 }, feedback: "6 km is how far Ravi walks, measured from **his** home. The question asks for the distance from Mei's home." },
        ],
        solution: [
          "By 09:20 Mei has cycled for 20 min = {{1/3}} h, covering 15 × {{1/3}} = 5 km.",
          "The gap between them is now 26 − 5 = 21 km.",
          "From 09:20 they move towards each other, closing the gap at 15 + 6 = 21 km/h. So they meet 21 ÷ 21 = 1 hour later, at 10:20.",
          "Mei has then cycled for 1 h 20 min = {{4/3}} h: 15 × {{4/3}} = 20 km from her home.",
          "Check: Ravi walked 6 × 1 = 6 km, and 20 + 6 = 26 km.",
        ],
        commonError: "Starting both people at 09:00 and ignoring Ravi's 20-minute late start.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Draw the road. What happens before Ravi sets off?",
          "Once both are moving towards each other, how quickly does the gap between them shrink?",
          "The gap shrinks by 15 + 6 = 21 km every hour. How long until it is zero?",
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
        kind: "written",
        id: "rates-units-p3-q19",
        question:
          "A school has a flat roof measuring 30 m by 20 m. All the rain that falls on it drains into an empty tank, a cuboid 4 m long, 3 m wide and 1.5 m high. During a monsoon storm, 25 mm of rain falls.\n\n(a) Does the tank overflow? Show your working.\n\n(b) What depth of rain, in mm, would exactly fill the empty tank?",
        marks: 4,
        modelAnswer:
          "Roof area = 30 × 20 = 600 m². Rain depth = 25 mm = 0.025 m.\n\nVolume of rain = 600 × 0.025 = 15 m³ (15 000 litres).\n\nTank volume = 4 × 3 × 1.5 = 18 m³ (18 000 litres).\n\n(a) 15 m³ is less than 18 m³, so the tank does **not** overflow. There is 3 m³ (3000 litres) of space left.\n\n(b) Depth = volume ÷ area = 18 ÷ 600 = 0.03 m = 30 mm of rain.",
        markScheme: [
          { point: "Converts 25 mm to 0.025 m (or uses consistent units throughout)", keywords: ["0.025", "2.5 cm", "2000 cm", "3000 cm"] },
          { point: "Volume of rain 15 m³ (15 000 litres)", keywords: ["15 m³", "15 000", "15000", "= 15"] },
          { point: "Tank volume 18 m³ and conclusion: it does not overflow", keywords: ["18", "18 000", "does not overflow", "not overflow", "no"] },
          { point: "Depth needed to fill the tank 30 mm", keywords: ["30 mm", "0.03", "30"] },
        ],
        commonError: "Multiplying 600 by 25 (mixing m² with mm) to get 15 000 'm³' — almost a thousand times too big. Put the depth in metres first.",
        difficulty: "challenge",
        guideRef: "area-volume-units",
        hints: [
          "The rain on the roof forms a very thin cuboid of water. What are its length, width and depth?",
          "Put everything in metres: 25 mm = 0.025 m.",
          "For (b), work backwards: what depth spread over 600 m² gives the tank's volume?",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q20
      {
        kind: "short",
        id: "rates-units-p3-q20",
        question:
          "Marcus runs up a hill path at 6 km/h and straight back down the same path at 12 km/h. The length of the path is not given. What is his average speed for the whole run, in km/h?",
        answer: { type: "number", value: 8, display: "8 km/h" },
        traps: [
          { spec: { type: "number", value: 9 }, feedback: "9 is the mean of 6 and 12. But Marcus spends twice as long going up as coming down, so the slow speed counts for more." },
        ],
        solution: [
          "The length isn't given, so choose a convenient one: 12 km (a multiple of both 6 and 12).",
          "Up: 12 ÷ 6 = 2 h. Down: 12 ÷ 12 = 1 h.",
          "Total: 24 km in 3 h, so average speed = 24 ÷ 3 = 8 km/h.",
          "Any length gives the same answer. Try 6 km: 1 h up, 0.5 h down, so 12 km in 1.5 h = 8 km/h.",
        ],
        solutions: [
          {
            label: "Using a letter",
            steps: [
              "Let the path be d km. Time up = {{d/6}} h and time down = {{d/12}} h.",
              "Total time = {{d/6 + d/12 = 3d/12 = d/4}} h.",
              "Average speed = 2d ÷ {{d/4}} = 8 km/h. The d cancels, which is why the length didn't matter.",
            ],
          },
        ],
        commonError: "Taking the mean of the two speeds, 9 km/h.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "The answer can't depend on the length, so pick a length that makes the arithmetic easy.",
          "Try a path 12 km long. How long does each half of the run take?",
          "Average speed = total distance ÷ total time.",
        ],
        strategy: "Try a convenient number",
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
          "Jun's fitness app records time as a decimal number of hours. His hike up Bukit Timah Hill and back took 1 h 48 min. What number should the app show? Give your answer as a decimal.",
        answer: { type: "number", value: 1.8, allowFraction: false, display: "1.8 hours" },
        traps: [
          { spec: { type: "number", value: 1.48 }, feedback: "An hour has 60 minutes, not 100. 48 minutes is {{48/60}} = 0.8 of an hour." },
        ],
        solution: ["48 minutes = {{48/60}} of an hour = 0.8 h.", "So 1 h 48 min = 1.8 hours."],
        commonError: "Writing 1 h 48 min as 1.48 h.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["What fraction of an hour is 48 minutes?", "Divide 48 by 60."],
        strategy: "Use the inverse",
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
          "Supermarket shelf labels show a **unit price** for each 100 ml. A 1.5-litre bottle of soya milk costs $3.30. What unit price should its label show?",
        answer: { type: "number", value: 0.22, display: "$0.22 per 100 ml" },
        traps: [
          { spec: { type: "number", value: 2.2 }, feedback: "$2.20 is the price per **litre**. The label needs the price per 100 ml." },
        ],
        solution: ["1.5 litres = 1500 ml, which is 15 lots of 100 ml.", "Unit price = 3.30 ÷ 15 = $0.22 per 100 ml."],
        commonError: "Dividing by 1.5 and giving the price per litre.",
        difficulty: "warmup",
        guideRef: "density-and-rates",
        hints: ["How many lots of 100 ml are in 1.5 litres?", "Share the price equally between them."],
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
        diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance-time graph. Time in minutes from 0 to 120 across, grid every 10 minutes. Distance from home in km from 0 to 14 up, grid every 2 km. The line rises from 0 km at 0 minutes to 12 km at 40 minutes, stays flat at 12 km until 60 minutes, then falls back to 0 km at 120 minutes."><rect width="480" height="310" fill="#ffffff"/><path d="M90 40V250M120 40V250M150 40V250M180 40V250M210 40V250M240 40V250M270 40V250M300 40V250M330 40V250M360 40V250M390 40V250M420 40V250M60 220H420M60 190H420M60 160H420M60 130H420M60 100H420M60 70H420M60 40H420" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="60" y1="250" x2="430" y2="250" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="250" x2="60" y2="32" stroke="#334155" stroke-width="1.5"/><polyline points="60,250 180,70 240,70 420,250" fill="none" stroke="#1d4ed8" stroke-width="2.5"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="266">0</text><text x="120" y="266">20</text><text x="180" y="266">40</text><text x="240" y="266">60</text><text x="300" y="266">80</text><text x="360" y="266">100</text><text x="420" y="266">120</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="52" y="254">0</text><text x="52" y="224">2</text><text x="52" y="194">4</text><text x="52" y="164">6</text><text x="52" y="134">8</text><text x="52" y="104">10</text><text x="52" y="74">12</text><text x="52" y="44">14</text></g><text x="240" y="292" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Time (minutes)</text><text x="18" y="145" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 145)">Distance from home (km)</text></svg>`,
        answer: { type: "list", values: [18, 12], ordered: true, display: "(a) 18 km/h, (b) 12 km/h" },
        traps: [
          {
            spec: { type: "list", values: [18, 15], ordered: true },
            feedback: "15 km/h is the mean of the two riding speeds, 18 and 12. Average speed = total distance ÷ total time.",
          },
          {
            spec: { type: "list", values: [18, 14.4], ordered: true },
            feedback: "Include the 20-minute stop in the total time: the whole trip took 2 hours.",
          },
        ],
        solution: [
          "(a) She rides 12 km in the first 40 min. 40 min = {{2/3}} h, so speed = 12 ÷ {{2/3}} = 18 km/h. (Or: 12 km in 40 min is 3 km every 10 min, which is 18 km in 60 min.)",
          "(b) Total distance = 12 km out + 12 km back = 24 km.",
          "Total time = 120 min = 2 h (the flat part, her stop, counts).",
          "Average speed = 24 ÷ 2 = 12 km/h.",
        ],
        commonError: "Using only 12 km as the total distance for (b), forgetting the ride home.",
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
          "Ravi works out how much water his family's tank holds. The tank's volume is 0.5 m³. Here is his working:\n\n    1 m = 100 cm, so 1 m³ = 100 × 100 × 100 = 1 000 000 cm³\n    0.5 m³ = 0.5 × 1 000 000 = 500 000 cm³\n    So the tank holds 500 000 litres.\n\nIs Ravi right? Explain his mistake and give the correct capacity in litres.",
        marks: 3,
        modelAnswer:
          "Ravi's first two lines are correct: cubing 100 gives 1 m³ = 1 000 000 cm³, so 0.5 m³ = 500 000 cm³.\n\nHis mistake is the last line: a cm³ is not a litre. 1 cm³ = 1 ml, and 1000 cm³ = 1 litre.\n\nSo the tank holds 500 000 ÷ 1000 = 500 litres. (500 000 litres would fill a small swimming pool — far too much for a home tank.)",
        markScheme: [
          { point: "Agrees that 0.5 m³ = 500 000 cm³ (cubing 100 is correct)", keywords: ["500 000 cm", "500000 cm", "1 000 000", "1000000", "correct"] },
          { point: "Identifies the error: cm³ are not litres, since 1000 cm³ = 1 litre (or 1 cm³ = 1 ml)", keywords: ["1000 cm³", "1 ml", "ml", "not litres", "divide by 1000", "÷ 1000"] },
          { point: "Correct capacity: 500 litres", keywords: ["500 litres", "500 l", "500"] },
        ],
        commonError: "Thinking 1 cm³ = 1 litre. A litre is a 10 cm cube, which holds 1000 cm³.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Check each line separately. Which is the first line that goes wrong?",
          "How many cm³ make 1 litre?",
          "Divide the number of cm³ by 1000.",
        ],
        strategy: "Spot the error",
      },
      // ------------------------------------------------------------- q09
      {
        kind: "short",
        id: "rates-units-p4-q09",
        question:
          "Wei Ling compares three bottles of laundry liquid.\n\n| Size | Volume | Price |\n|---|---|---|\n| Small | 800 ml | $5.60 |\n| Medium | 1.5 litres | $9.90 |\n| Large | 2.5 litres | $17.00 |\n\nFind the price per 100 ml of the **best-value** bottle. Give your answer in dollars.",
        answer: { type: "number", value: 0.66, display: "$0.66 per 100 ml (the medium bottle)" },
        traps: [
          { spec: { type: "number", value: 0.68 }, feedback: "That's the large bottle. Compare all three unit prices — bigger isn't always cheaper." },
          { spec: { type: "number", value: 0.7 }, feedback: "That's the small bottle, the most expensive per 100 ml. Best value means the lowest unit price." },
        ],
        solution: [
          "Small: 800 ml = 8 lots of 100 ml → 5.60 ÷ 8 = $0.70 per 100 ml.",
          "Medium: 1.5 litres = 1500 ml = 15 lots → 9.90 ÷ 15 = $0.66 per 100 ml.",
          "Large: 2.5 litres = 2500 ml = 25 lots → 17.00 ÷ 25 = $0.68 per 100 ml.",
          "The lowest price per 100 ml is the medium bottle, at $0.66.",
        ],
        commonError: "Assuming the largest bottle must be the best value without checking.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "To compare fairly, find the price of the same amount from each bottle.",
          "Change every volume into ml, then count the lots of 100 ml in each bottle.",
          "The best value has the lowest price per 100 ml.",
        ],
        strategy: "Use the unitary method",
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
          "The graph converts temperatures from degrees Celsius (°C) to degrees Fahrenheit (°F).\n\nZara says: \"This is a conversion graph, so °F is directly proportional to °C. That means 20 °C must be double 10 °C when you change them into °F.\"\n\nIs Zara right? Use the graph to explain.",
        diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph. Horizontal axis: temperature in degrees Celsius from 0 to 100, grid every 10. Vertical axis: temperature in degrees Fahrenheit from 0 to 220, grid every 10. A straight line starts at 32 degrees Fahrenheit on the vertical axis, marked with a dot, and rises to 212 degrees Fahrenheit at 100 degrees Celsius."><rect width="480" height="310" fill="#ffffff"/><path d="M96 50V270M132 50V270M168 50V270M204 50V270M240 50V270M276 50V270M312 50V270M348 50V270M384 50V270M420 50V270M60 260H420M60 250H420M60 240H420M60 230H420M60 220H420M60 210H420M60 200H420M60 190H420M60 180H420M60 170H420M60 160H420M60 150H420M60 140H420M60 130H420M60 120H420M60 110H420M60 100H420M60 90H420M60 80H420M60 70H420M60 60H420M60 50H420" stroke="#e2e8f0" stroke-width="1" fill="none"/><path d="M60 230H420M60 190H420M60 150H420M60 110H420M60 70H420M132 50V270M204 50V270M276 50V270M348 50V270M420 50V270" stroke="#cbd5e1" stroke-width="1" fill="none"/><line x1="60" y1="270" x2="430" y2="270" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="270" x2="60" y2="42" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="238" x2="420" y2="58" stroke="#1d4ed8" stroke-width="2.5"/><circle cx="60" cy="238" r="4" fill="#1d4ed8"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="286">0</text><text x="132" y="286">20</text><text x="204" y="286">40</text><text x="276" y="286">60</text><text x="348" y="286">80</text><text x="420" y="286">100</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="52" y="274">0</text><text x="52" y="234">40</text><text x="52" y="194">80</text><text x="52" y="154">120</text><text x="52" y="114">160</text><text x="52" y="74">200</text></g><text x="240" y="304" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Temperature (°C)</text><text x="18" y="160" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 160)">Temperature (°F)</text></svg>`,
        marks: 3,
        modelAnswer:
          "No, Zara is wrong.\n\nThe graph is a straight line, but it does **not** pass through the origin: 0 °C is 32 °F, not 0 °F. Only a straight line through the origin shows direct proportion.\n\nFrom the graph, 10 °C ≈ 50 °F and 20 °C ≈ 68 °F. Double 50 is 100, not 68, so doubling the °C does not double the °F.",
        markScheme: [
          { point: "States the line does not pass through the origin (0 °C = 32 °F)", keywords: ["origin", "32", "through 0", "(0, 0)", "0,0"] },
          { point: "Uses values from the graph to show doubling fails, e.g. 10 °C ≈ 50 °F but 20 °C ≈ 68 °F, not 100 °F", keywords: ["50", "68", "100", "not double"] },
          { point: "Conclusion: °F is not directly proportional to °C, so Zara is wrong", keywords: ["no", "wrong", "not right", "not proportional", "not directly proportional"] },
        ],
        commonError: "Saying 'it's a straight line, so it's proportional'. A proportional graph must be straight **and** pass through the origin.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "What two things must be true of a graph that shows direct proportion?",
          "Where does this line meet the °F axis?",
          "Read off 10 °C and 20 °C in °F. Is the second answer double the first?",
        ],
        strategy: "Find a counterexample",
      },
      // ------------------------------------------------------------- q12
      {
        kind: "short",
        id: "rates-units-p4-q12",
        question:
          "**Stretch.** A box with a weight of 240 N is a cuboid measuring 40 cm by 30 cm by 20 cm. It can rest on the floor on any of its faces. Using pressure = force ÷ area, find the **greatest** pressure the box can exert on the floor. Give your answer in N/m².",
        diagram: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cuboid box drawn in 3D: 40 cm wide, 20 cm high and 30 cm deep. A downward arrow on the front face is labelled 240 N."><rect width="480" height="290" fill="#ffffff"/><polygon points="120,150 320,150 373,97 173,97" fill="#e0e7ff" stroke="#334155" stroke-width="1.5"/><polygon points="320,150 373,97 373,197 320,250" fill="#a5b4fc" stroke="#334155" stroke-width="1.5"/><rect x="120" y="150" width="200" height="100" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><line x1="220" y1="168" x2="220" y2="222" stroke="#1f2937" stroke-width="2"/><polygon points="213,220 227,220 220,234" fill="#1f2937"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="230" y="200">240 N</text><text x="220" y="270" text-anchor="middle">40 cm</text><text x="112" y="205" text-anchor="end">20 cm</text><text x="356" y="238">30 cm</text></g></svg>`,
        answer: { type: "number", value: 4000, display: "4000 N/m²" },
        traps: [
          { spec: { type: "number", value: 2000 }, feedback: "That's the pressure on the **largest** face. The same force on a smaller area gives a bigger pressure." },
          { spec: { type: "number", value: 0.4 }, feedback: "0.4 is in N/cm² (240 ÷ 600 cm²). Change the area into m² first: 600 cm² = 0.06 m²." },
        ],
        solution: [
          "The force is the same on every face, so the **smallest** face gives the greatest pressure.",
          "Smallest face: 30 cm × 20 cm = 0.3 m × 0.2 m = 0.06 m².",
          "Pressure = 240 ÷ 0.06 = 4000 N/m².",
          "Check the others: the 40 × 30 face is 0.12 m² → 2000 N/m², and the 40 × 20 face is 0.08 m² → 3000 N/m².",
        ],
        commonError: "Leaving the area in cm², which gives an answer in N/cm² instead of N/m².",
        difficulty: "core",
        guideRef: "pressure",
        hints: [
          "The force is the same whichever face is down. Which face makes the pressure greatest — the biggest or the smallest?",
          "Find the area of the smallest face in m². Change the lengths into metres first.",
          "Pressure = 240 ÷ area.",
        ],
        strategy: "Consider extremes",
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
          { spec: { type: "number", value: -36 }, feedback: "72 × 0.75 mixes km/h with seconds. Change 72 km/h into m/s first." },
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
          "In an athletics time trial, Aisha ran 5 miles in 40 minutes. Jun ran 10 km in 50 minutes.\n\nAisha says: \"I was faster, because I finished in less time.\"\n\nUsing 5 miles ≈ 8 km, decide whether Aisha is right. Show your working.",
        marks: 4,
        modelAnswer:
          "5 miles ≈ 8 km.\n\nAisha: 8 km in 40 min = {{2/3}} h, so her speed = 8 ÷ {{2/3}} = 12 km/h (0.2 km per minute).\n\nJun: 10 km in 50 min = {{5/6}} h, so his speed = 10 ÷ {{5/6}} = 12 km/h (0.2 km per minute).\n\nThey ran at the same speed, so Aisha is not right. Taking less time doesn't mean running faster when the distances are different: you have to compare the distance covered in each unit of time.",
        markScheme: [
          { point: "Converts 5 miles to 8 km", keywords: ["8 km", "8"] },
          { point: "Aisha's speed: 12 km/h (or 0.2 km per minute)", keywords: ["12", "0.2"] },
          { point: "Jun's speed: 12 km/h (or 0.2 km per minute)", keywords: ["12", "0.2"] },
          { point: "Conclusion: same speed, so Aisha is wrong; the distances are different, so time alone can't decide", keywords: ["same", "equal", "wrong", "not right", "no", "different distances"] },
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
          "A train 200 m long travels at a steady 54 km/h towards a tunnel 1.3 km long. How many seconds pass from the moment the front of the train enters the tunnel until the back of the train comes out?",
        answer: { type: "number", value: 100, display: "100 seconds" },
        traps: [
          { spec: { type: "number", value: 86.667, tolerance: 0.07 }, feedback: "That's only until the front reaches the far end. The back of the train is still 200 m inside the tunnel." },
          { spec: { type: "number", value: 27.78, tolerance: 0.05 }, feedback: "1500 ÷ 54 mixes metres with km/h. Change 54 km/h into m/s first." },
        ],
        solution: [
          "Draw it. For the back of the train to come out, the front must travel the whole tunnel (1300 m) **plus** the train's own length (200 m): 1500 m.",
          "Speed: 54 ÷ 3.6 = 15 m/s.",
          "Time = 1500 ÷ 15 = 100 seconds.",
        ],
        commonError: "Using only the tunnel's length and forgetting the length of the train.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Sketch the train at the start and at the end. How far does the **front** of the train move?",
          "Distance = tunnel length + train length, in metres.",
          "Change 54 km/h into m/s by dividing by 3.6.",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q18
      {
        kind: "short",
        id: "rates-units-p4-q18",
        question:
          "A cheap watch gains 12 minutes every hour: after 1 real hour, it shows that 1 h 12 min have passed. Ravi sets it to the correct time at 08:00. Later the same day, the watch shows 14:00. What is the real time? Give your answer using the 24-hour clock.",
        answer: {
          type: "text",
          accept: ["13:00", "1300", "13.00", "13", "13h00", "1:00pm", "1pm", "1.00pm", "1:00p.m", "1p.m"],
          display: "13:00",
        },
        traps: [
          {
            spec: { type: "text", accept: ["12:48", "1248", "12.48", "12:48pm", "12.48pm"] },
            feedback: "The watch gains 12 minutes per **real** hour, and fewer than 6 real hours have passed. In each real hour the watch moves on 72 minutes.",
          },
          {
            spec: { type: "text", accept: ["15:12", "1512", "15.12", "3:12pm", "3.12pm"] },
            feedback: "The watch is fast, so the real time must be **earlier** than 14:00, not later.",
          },
        ],
        solution: [
          "In 1 real hour, the watch moves on 60 + 12 = 72 minutes.",
          "The watch shows that 14:00 − 08:00 = 6 h = 360 minutes have passed.",
          "Real time passed = 360 ÷ 72 = 5 hours.",
          "Real time = 08:00 + 5 h = 13:00. Check: in 5 real hours the watch moves 5 × 72 = 360 min = 6 h, so it shows 14:00.",
        ],
        commonError: "Taking 12 minutes off for each of the 6 hours the watch shows. The watch gains per real hour, and only 5 real hours have passed.",
        difficulty: "challenge",
        guideRef: "time",
        hints: [
          "The watch runs at a different **rate** from real time. In one real hour, how many minutes does the watch show?",
          "How many watch-minutes have passed between 08:00 and 14:00?",
          "Divide by the watch's rate of 72 minutes per real hour.",
        ],
        strategy: "Use the rate",
      },
      // ------------------------------------------------------------- q19
      {
        kind: "written",
        id: "rates-units-p4-q19",
        question:
          "Aisha makes a drink by mixing 300 cm³ of rose syrup with 700 cm³ of water. The syrup has a density of 1.4 g/cm³ and water has a density of 1 g/cm³. (Assume the volumes simply add together.)\n\nSiti says: \"The density of the drink is 1.2 g/cm³, halfway between 1.4 and 1.\"\n\nExplain why Siti is wrong, and find the correct density of the drink.",
        marks: 4,
        modelAnswer:
          "Mass of syrup = density × volume = 1.4 × 300 = 420 g. Mass of water = 1 × 700 = 700 g.\n\nTotal mass = 420 + 700 = 1120 g. Total volume = 300 + 700 = 1000 cm³.\n\nDensity of the drink = 1120 ÷ 1000 = 1.12 g/cm³.\n\nSiti's 1.2 g/cm³ would only be right if the drink had equal volumes of syrup and water. There is much more water than syrup, so the density is closer to 1 than to 1.4. You can't simply average densities: use total mass ÷ total volume.",
        markScheme: [
          { point: "Masses: syrup 420 g and water 700 g (mass = density × volume)", keywords: ["420", "700"] },
          { point: "Total mass 1120 g and total volume 1000 cm³", keywords: ["1120", "1000"] },
          { point: "Correct density 1.12 g/cm³", keywords: ["1.12"] },
          { point: "Explains the error: there is more water than syrup, so the densities can't just be averaged; use total mass ÷ total volume", keywords: ["more water", "equal volumes", "total mass", "can't average", "cannot average", "closer to 1", "weighted"] },
        ],
        commonError: "Averaging the two densities, which ignores how much of each liquid there is — just like averaging two speeds ignores how long each one lasts.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "Density = mass ÷ volume for the whole drink. What two totals do you need?",
          "Find the mass of each liquid using mass = density × volume.",
          "Divide the total mass by the total volume, then compare with Siti's answer.",
        ],
        strategy: "Work from the definition",
      },
      // ------------------------------------------------------------- q20
      {
        kind: "short",
        id: "rates-units-p4-q20",
        question:
          "A water tank for the school garden has two taps and a drain.\n\n- Tap A on its own fills the empty tank in 12 minutes.\n- Tap B on its own fills the empty tank in 6 minutes.\n- The drain on its own empties a full tank in 8 minutes.\n\nThe tank is empty. Both taps are turned on, and the drain is left open by mistake. How many minutes does the tank take to fill?",
        answer: { type: "number", value: 8, display: "8 minutes" },
        traps: [
          { spec: { type: "number", value: 10 }, feedback: "Times don't add and subtract like this, but rates do. Find how much each tap fills (or the drain empties) in one minute." },
          { spec: { type: "number", value: 4 }, feedback: "4 minutes is the time with both taps and **no** drain. The open drain slows things down." },
        ],
        solution: [
          "Pick a convenient tank size that 12, 6 and 8 all divide into: 24 litres.",
          "Tap A: 24 ÷ 12 = 2 litres per minute. Tap B: 24 ÷ 6 = 4 litres per minute. Drain: 24 ÷ 8 = 3 litres per minute out.",
          "Net rate = 2 + 4 − 3 = 3 litres per minute.",
          "Time = 24 ÷ 3 = 8 minutes.",
        ],
        solutions: [
          {
            label: "Fractions of a tank per minute",
            steps: [
              "Each minute, A fills {{1/12}} of the tank, B fills {{1/6}}, and the drain empties {{1/8}}.",
              "Net: {{1/12 + 1/6 - 1/8 = 2/24 + 4/24 - 3/24 = 3/24 = 1/8}} of the tank per minute.",
              "So the tank fills in 8 minutes. The litres method avoids fractions; this one shows the tank size really doesn't matter.",
            ],
          },
        ],
        commonError: "Combining the times (12 + 6 − 8) instead of combining the rates.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "Times can't be combined directly, but rates can. How much does each tap fill in one minute?",
          "Choose a tank size that 12, 6 and 8 all divide into.",
          "With a 24-litre tank: A gives 2 litres per minute, B gives 4, and the drain takes away 3.",
        ],
        strategy: "Try a convenient number",
      },
    ],
  },
];
