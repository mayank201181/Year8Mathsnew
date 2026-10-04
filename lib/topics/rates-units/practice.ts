import type { TopicPractice } from "../../types.ts";

// ---------------------------------------------------------------------------
// Diagrams
// ---------------------------------------------------------------------------

const milesKmGraph = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph with miles from 0 to 50 across, gridlines every 5 miles, and kilometres from 0 to 80 up, gridlines every 10 km. A straight line runs from the origin to 50 miles at 80 km."><rect width="400" height="300" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1" fill="none"><path d="M90 50V250M120 50V250M150 50V250M180 50V250M210 50V250M240 50V250M270 50V250M300 50V250M330 50V250M360 50V250"/><path d="M60 225H360M60 200H360M60 175H360M60 150H360M60 125H360M60 100H360M60 75H360M60 50H360"/></g><g stroke="#334155" stroke-width="1.5"><line x1="60" y1="250" x2="370" y2="250"/><line x1="60" y1="250" x2="60" y2="42"/></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937"><text x="60" y="266">0</text><text x="120" y="266">10</text><text x="180" y="266">20</text><text x="240" y="266">30</text><text x="300" y="266">40</text><text x="360" y="266">50</text></g><g font-family="sans-serif" font-size="11" text-anchor="end" fill="#1f2937"><text x="54" y="254">0</text><text x="54" y="229">10</text><text x="54" y="204">20</text><text x="54" y="179">30</text><text x="54" y="154">40</text><text x="54" y="129">50</text><text x="54" y="104">60</text><text x="54" y="79">70</text><text x="54" y="54">80</text></g><text x="210" y="290" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Miles</text><text x="18" y="150" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" transform="rotate(-90 18 150)">Kilometres (km)</text><line x1="60" y1="250" x2="360" y2="50" stroke="#1f2937" stroke-width="2.5"/></svg>`;

const tapsGraph = `<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of water delivered in litres against time in minutes for two taps. Gridlines every minute across and every 4 litres up. Tap A's straight line goes from the origin to 60 litres at 5 minutes. Tap B's straight line goes from the origin to 56 litres at 8 minutes."><rect width="420" height="300" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1" fill="none"><path d="M100 70V250M140 70V250M180 70V250M220 70V250M260 70V250M300 70V250M340 70V250M380 70V250"/><path d="M60 238H380M60 226H380M60 214H380M60 202H380M60 190H380M60 178H380M60 166H380M60 154H380M60 142H380M60 130H380M60 118H380M60 106H380M60 94H380M60 82H380M60 70H380"/></g><g stroke="#334155" stroke-width="1.5"><line x1="60" y1="250" x2="390" y2="250"/><line x1="60" y1="250" x2="60" y2="62"/></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937"><text x="60" y="266">0</text><text x="100" y="266">1</text><text x="140" y="266">2</text><text x="180" y="266">3</text><text x="220" y="266">4</text><text x="260" y="266">5</text><text x="300" y="266">6</text><text x="340" y="266">7</text><text x="380" y="266">8</text></g><g font-family="sans-serif" font-size="11" text-anchor="end" fill="#1f2937"><text x="54" y="254">0</text><text x="54" y="218">12</text><text x="54" y="182">24</text><text x="54" y="146">36</text><text x="54" y="110">48</text><text x="54" y="74">60</text></g><text x="220" y="292" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Time (minutes)</text><text x="18" y="160" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" transform="rotate(-90 18 160)">Water (litres)</text><line x1="60" y1="250" x2="260" y2="70" stroke="#1f2937" stroke-width="2.5"/><line x1="60" y1="250" x2="380" y2="82" stroke="#b45309" stroke-width="2.5"/><circle cx="260" cy="70" r="4" fill="#1f2937"/><circle cx="380" cy="82" r="4" fill="#b45309"/><text x="268" y="76" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937">Tap A</text><text x="376" y="122" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end" fill="#b45309">Tap B</text></svg>`;

// ---------------------------------------------------------------------------
// Practice
// ---------------------------------------------------------------------------

export const practice: TopicPractice = {
  // =========================== QUICK-CHECK QUIZ ============================
  quiz: [
    {
      kind: "mcq",
      id: "rates-units-quiz-q01",
      question: "Which capacity is the same as 2.5 litres?",
      options: ["2500 ml", "250 ml", "25 000 ml", "0.0025 ml"],
      answerIndex: 0,
      explanation:
        "A millilitre is smaller than a litre, so you need more of them: multiply by 1000. 2.5 × 1000 = 2500 ml. 250 ml comes from multiplying by 100 (that's the litre → cl factor), 25 000 ml multiplies by 10 000, and 0.0025 ml comes from dividing when you should multiply.",
      difficulty: "warmup",
      guideRef: "metric-units",
      hints: [
        "Is a millilitre bigger or smaller than a litre? So should the number get bigger or smaller?",
        "1 litre = 1000 ml.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "short",
      id: "rates-units-quiz-q02",
      question: "Write 12:25 am (25 minutes after midnight) using the 24-hour clock.",
      answer: {
        type: "text",
        accept: ["00:25", "0025", "00.25", "0:25", "00:25hrs", "0025hrs", "00h25"],
        display: "00:25",
      },
      solution: [
        "The 24-hour clock starts a new day at 00:00 (midnight).",
        "25 minutes after midnight is 00:25. The hour is 00, not 12 and not 24.",
      ],
      traps: [
        {
          spec: { type: "text", accept: ["12:25", "1225", "12.25"] },
          feedback: "12:25 on the 24-hour clock is 25 minutes after *midday*. Between midnight and 1 am, the hour is 00.",
        },
        {
          spec: { type: "text", accept: ["24:25", "2425", "24.25"] },
          feedback: "The 24-hour clock runs from 00:00 to 23:59, so there is no 24:25. Just after midnight, the hour is 00.",
        },
      ],
      commonError: "Writing the hour after midnight as 12 or 24 instead of 00.",
      difficulty: "warmup",
      guideRef: "time",
      hints: ["The 24-hour clock starts each day at 00:00. What is the hour just after midnight?"],
      strategy: "Use a known fact",
    },
    {
      kind: "mcq",
      id: "rates-units-quiz-q03",
      question: "How many square millimetres (mm²) are there in 1 square centimetre (cm²)?",
      options: ["10", "1000", "100", "0.01"],
      answerIndex: 2,
      explanation:
        "Picture 1 cm² as a square 10 mm by 10 mm. It holds 10 rows of 10 little 1 mm squares: 10 × 10 = 100 mm². The answer 10 uses the *length* factor only once, but area uses it twice. 1000 is the factor for *volume* (10 × 10 × 10 mm³ in 1 cm³), and 0.01 divides when the number of tiny squares should be bigger.",
      difficulty: "warmup",
      guideRef: "area-volume-units",
      hints: [
        "Draw 1 cm² as a square with sides of 10 mm.",
        "How many rows of 1 mm squares are there, and how many squares in each row?",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "rates-units-quiz-q04",
      question: "A cyclist rides at a steady 18 km/h for 50 minutes. How far does she travel? Give your answer in km.",
      answer: { type: "number", value: 15, display: "15 km" },
      solution: [
        "The speed is per **hour**, so write the time in hours: 50 min = {{50/60}} h = {{5/6}} h.",
        "Distance = speed × time = 18 × {{5/6}}.",
        "18 ÷ 6 = 3, and 3 × 5 = 15 km.",
      ],
      solutions: [
        {
          label: "Scale the hour down (quicker here)",
          steps: ["18 km in 60 minutes.", "Divide by 6: 3 km in 10 minutes.", "Multiply by 5: 15 km in 50 minutes."],
        },
      ],
      commonError: "Multiplying 18 by 50 (the minutes) or by 0.5. An hour has 60 minutes, not 100.",
      traps: [
        {
          spec: { type: "number", value: 900 },
          feedback: "You multiplied by 50 minutes, but the speed is in km per *hour*. Change 50 min into hours first.",
        },
        {
          spec: { type: "number", value: 9 },
          feedback: "50 minutes is not 0.5 hours (that would be 30 minutes): an hour has 60 minutes, not 100. 50 min = {{5/6}} h.",
        },
      ],
      difficulty: "core",
      guideRef: "speed",
      hints: [
        "The speed is in km per **hour**. What fraction of an hour is 50 minutes?",
        "50 min = {{50/60}} = {{5/6}} of an hour.",
        "Distance = speed × time = 18 × {{5/6}}.",
      ],
      strategy: "Convert units before substituting",
    },
    {
      kind: "mcq",
      id: "rates-units-quiz-q05",
      question: "Oat milk is sold in four sizes. Which is the best value for money?",
      options: ["500 ml for $1.70", "1.5 litres for $4.50", "1 litre for $3.20", "2 litres for $6.30"],
      answerIndex: 1,
      explanation:
        "Compare the price of one litre. 500 ml: 1.70 × 2 = $3.40 per litre. 1.5 litres: 4.50 ÷ 1.5 = $3.00 per litre. 1 litre: $3.20. 2 litres: 6.30 ÷ 2 = $3.15 per litre. So 1.5 litres for $4.50 is cheapest per litre. The 500 ml carton for $1.70 has the lowest price tag but the highest price per litre, and 2 litres for $6.30 shows that the biggest pack isn't automatically the best buy.",
      difficulty: "core",
      guideRef: "density-and-rates",
      hints: [
        "Compare like with like: find the price of 1 litre for each size.",
        "500 ml is half a litre, so double its price. For 1.5 litres, divide the price by 1.5.",
      ],
      strategy: "Use the unitary method",
    },
    {
      kind: "short",
      id: "rates-units-quiz-q06",
      question:
        "A cuboid storage box holds exactly 24 litres when full. Its base measures 40 cm by 30 cm. How deep is the box, in cm?",
      answer: { type: "number", value: 20, display: "20 cm" },
      solution: [
        "Change the capacity into cm³: 24 litres = 24 × 1000 = 24 000 cm³.",
        "Base area = 40 × 30 = 1200 cm².",
        "Volume = base area × depth, so depth = 24 000 ÷ 1200 = 20 cm.",
      ],
      solutions: [
        {
          label: "Count litre-cubes (slicker)",
          steps: [
            "A litre is a cube 10 cm on each side. Measure the base in 10 cm units: 4 by 3, so one layer holds 12 litre-cubes.",
            "24 litres is 24 ÷ 12 = 2 layers, and each layer is 10 cm deep: 2 × 10 = 20 cm.",
          ],
        },
      ],
      commonError: "Dividing 24 by the base area without first changing litres into cm³.",
      traps: [
        { spec: { type: "number", value: 0.02 }, feedback: "Change 24 litres into cm³ before dividing by an area in cm². 1 litre = 1000 cm³." },
        { spec: { type: "number", value: 2 }, feedback: "1 litre = 1000 cm³, not 100 cm³, so 24 litres = 24 000 cm³." },
      ],
      difficulty: "core",
      guideRef: "area-volume-units",
      hints: [
        "The base is in cm, so change 24 litres into cm³.",
        "24 litres = 24 000 cm³, and the base area is 40 × 30 cm².",
        "Volume = base area × depth. Divide to find the depth.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "mcq",
      id: "rates-units-quiz-q07",
      question: "Using 5 miles ≈ 8 km, about how many miles is 120 km?",
      options: ["192 miles", "117 miles", "15 miles", "75 miles"],
      answerIndex: 3,
      explanation:
        "120 km is 120 ÷ 8 = 15 lots of 8 km, and each 8 km is about 5 miles: 15 × 5 = 75 miles. A mile is longer than a kilometre, so the miles number must be smaller. 192 miles comes from multiplying by 1.6, which is the miles → km direction. 117 miles treats the conversion as 'subtract 3', but it is a ratio, so you multiply or divide. 15 miles stops halfway: it only counts the lots of 8 km.",
      difficulty: "core",
      guideRef: "imperial-units",
      hints: [
        "Will the number of miles be bigger or smaller than 120?",
        "How many lots of 8 km are in 120 km? Each lot is about 5 miles.",
      ],
      strategy: "Use a ratio table",
    },
    {
      kind: "short",
      id: "rates-units-quiz-q08",
      question:
        "A school concert starts at 13:50 and lasts 2 hours 25 minutes. At what time does it end? Give your answer using the 24-hour clock.",
      answer: {
        type: "text",
        accept: ["16:15", "1615", "16.15", "16:15hrs", "1615hrs", "16h15"],
        display: "16:15",
      },
      solution: [
        "Add the whole hours first: 13:50 + 2 h = 15:50.",
        "Add the 25 minutes in two jumps: 15:50 + 10 min = 16:00, then + 15 min = 16:15.",
      ],
      commonError: "Adding the times like decimals and writing 15:75. Minutes stop at 59.",
      traps: [
        {
          spec: { type: "text", accept: ["15:75", "1575", "15.75"] },
          feedback: "Minutes only go up to 59. 50 + 25 = 75 minutes is 1 h 15 min, so carry an hour.",
        },
        {
          spec: { type: "text", accept: ["4:15", "04:15", "0415", "415", "4.15", "4:15pm", "4.15pm", "415pm"] },
          feedback: "Right time, wrong clock: use the 24-hour clock. 4:15 pm is 16:15.",
        },
      ],
      difficulty: "core",
      guideRef: "time",
      hints: [
        "Add the 2 hours first.",
        "Now add 25 minutes to 15:50. How many minutes take you to the next whole hour?",
        "10 minutes gets you to 16:00, with 15 minutes left over.",
      ],
      strategy: "Use a stepping stone (the next hour)",
    },
    {
      kind: "written",
      id: "rates-units-quiz-q09",
      question:
        "Marcus plans a conversion graph for changing Singapore dollars ($) into Malaysian ringgit (RM). He works out four points to plot: $0 → RM 0, $10 → RM 32, $20 → RM 64 and $25 → RM 85. When he plots them, they do not all lie on a straight line. Explain how you can tell which point is wrong, and correct it.",
      marks: 3,
      modelAnswer:
        "Every dollar should buy the same number of ringgit, so the points of a conversion graph must lie on one straight line through the origin, and RM ÷ $ must be the same for every point. Check each point: 32 ÷ 10 = 3.2 and 64 ÷ 20 = 3.2, but 85 ÷ 25 = 3.4. The origin and the $10 and $20 points all fit RM 3.20 per dollar, so ($25, RM 85) is the odd one out. The correct value is 25 × 3.2 = **RM 80**. (Check: $25 is 2.5 times $10, so it should be 2.5 × 32 = RM 80.)",
      markScheme: [
        {
          point: "States that the points must lie on one straight line through the origin, i.e. the rate (RM per $) must be the same for every point",
          keywords: ["straight line", "origin", "same rate", "proportion", "per dollar", "constant"],
        },
        {
          point: "Compares the rates: 32 ÷ 10 = 64 ÷ 20 = 3.2 but 85 ÷ 25 = 3.4, so ($25, RM 85) is the wrong point",
          keywords: ["3.2", "3.4", "64 ÷ 20", "85 ÷ 25", "rm 85"],
        },
        {
          point: "Correct value: $25 = 25 × 3.2 = RM 80",
          keywords: ["80", "rm 80", "2.5 × 32"],
        },
      ],
      commonError: "Just saying 'one point is wrong' without checking the rate, or 'fixing' it by drawing a curve through all three points.",
      difficulty: "core",
      guideRef: "conversion-graphs",
      hints: [
        "On a conversion graph, every dollar buys the same amount. What does that mean for RM ÷ $ at each point?",
        "Work out RM ÷ $ for the $10, $20 and $25 points. Which one doesn't match?",
        "Two points agree on RM 3.20 per dollar. Use that rate to fix the odd one out.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "rates-units-quiz-q10",
      question:
        "Jun walks to school at 4 km/h and runs home along the same route at 12 km/h. What is his average speed for the whole round trip, in km/h?",
      answer: { type: "number", value: 6, display: "6 km/h" },
      solution: [
        "The distance isn't given, so choose a handy one that 4 and 12 both divide: say the route is 12 km.",
        "Time there = 12 ÷ 4 = 3 h. Time back = 12 ÷ 12 = 1 h.",
        "Total distance = 24 km, total time = 4 h.",
        "Average speed = 24 ÷ 4 = 6 km/h.",
      ],
      solutions: [
        {
          label: "Algebra (proves the length doesn't matter)",
          steps: [
            "Let the route be d km. Time there = {{d/4}} h, time back = {{d/12}} h.",
            "Total time = {{d/4 + d/12 = 3d/12 + d/12 = 4d/12 = d/3}} h.",
            "Average speed = 2d ÷ {{d/3}} = 6 km/h, whatever d is. Choosing d = 12 is quicker; the algebra proves it always works.",
          ],
        },
      ],
      commonError:
        "Taking the mean of 4 and 12 to get 8 km/h. He spends three times as long walking as running, so the slow speed counts for more.",
      traps: [
        {
          spec: { type: "number", value: 8 },
          feedback: "8 is the mean of 4 and 12, but he spends much longer walking than running. Use total distance ÷ total time.",
        },
      ],
      difficulty: "challenge",
      guideRef: "speed",
      hints: [
        "The length of the route isn't given. Could you choose one to make it concrete?",
        "Try a route of 12 km: 4 and 12 both divide into it.",
        "Find the time each way, then use total distance ÷ total time.",
      ],
      strategy: "Make it simpler",
    },
  ],

  // ============================ PRACTICE PAPERS ============================
  papers: [
    {
      id: "rates-units-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "rates-units-p1-q01",
          question: "Write 2.75 kg in grams.",
          answer: { type: "number", value: 2750, display: "2750 g" },
          solution: ["Grams are smaller than kilograms, so multiply.", "1 kg = 1000 g, so 2.75 × 1000 = 2750 g."],
          traps: [
            { spec: { type: "number", value: 275 }, feedback: "1 kg = 1000 g, not 100 g." },
            {
              spec: { type: "number", value: 0.00275 },
              feedback: "Grams are the smaller unit, so the number should get bigger: multiply by 1000, don't divide.",
            },
          ],
          difficulty: "warmup",
          guideRef: "metric-units",
          hints: ["How many grams are in 1 kg? Should the number get bigger or smaller?"],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "rates-units-p1-q02",
          question: "How many minutes are there in 2.4 hours?",
          answer: { type: "number", value: 144, display: "144 minutes" },
          solution: [
            "1 hour = 60 minutes, so multiply by 60.",
            "2.4 × 60 = 144 minutes.",
            "Check: 2 h = 120 min and 0.4 h = 0.4 × 60 = 24 min. 120 + 24 = 144.",
          ],
          commonError: "Reading 2.4 h as 2 h 40 min.",
          traps: [
            {
              spec: { type: "number", value: 160 },
              feedback: "2.4 hours is not 2 h 40 min. The .4 means 0.4 of an hour, which is 0.4 × 60 = 24 minutes.",
            },
            { spec: { type: "number", value: 240 }, feedback: "An hour has 60 minutes, not 100: multiply by 60." },
          ],
          difficulty: "warmup",
          guideRef: "time",
          hints: ["How many minutes are in one hour? Multiply by that."],
          strategy: "Use a known fact",
        },
        {
          kind: "short",
          id: "rates-units-p1-q03",
          question: "Aisha runs 400 m in 80 seconds. Find her average speed in m/s.",
          answer: { type: "number", value: 5, display: "5 m/s" },
          solution: ["Speed = distance ÷ time.", "400 ÷ 80 = 5 m/s."],
          traps: [
            { spec: { type: "number", value: 0.2 }, feedback: "You divided the time by the distance. Speed = distance ÷ time." },
          ],
          difficulty: "warmup",
          guideRef: "speed",
          hints: ["Speed = distance ÷ time."],
          strategy: "Use the formula",
        },
        {
          kind: "short",
          id: "rates-units-p1-q04",
          question: "Using 5 miles ≈ 8 km, convert 35 miles to kilometres.",
          answer: { type: "number", value: 56, display: "56 km" },
          solution: [
            "35 miles is 35 ÷ 5 = 7 lots of 5 miles.",
            "Each lot is about 8 km, so 7 × 8 = 56 km.",
            "Check with 1 mile ≈ 1.6 km: 35 × 1.6 = 56.",
          ],
          traps: [
            {
              spec: { type: "number", value: 21.875 },
              feedback: "A kilometre is shorter than a mile, so the km number should be *bigger* than 35. Multiply by 1.6 instead of dividing.",
            },
          ],
          difficulty: "warmup",
          guideRef: "imperial-units",
          hints: ["How many lots of 5 miles are there in 35 miles?"],
          strategy: "Use a ratio table",
        },
        {
          kind: "short",
          id: "rates-units-p1-q05",
          question: "A water bottle has a capacity of 750 cm³. Write this in litres.",
          answer: { type: "number", value: 0.75, display: "0.75 litres" },
          solution: [
            "1 litre = 1000 cm³ (a 10 cm × 10 cm × 10 cm cube).",
            "Litres are the bigger unit, so divide: 750 ÷ 1000 = 0.75 litres.",
          ],
          traps: [
            { spec: { type: "number", value: 7.5 }, feedback: "1 litre = 1000 cm³, not 100 cm³." },
            {
              spec: { type: "number", value: 750000 },
              feedback: "A litre is much bigger than a cm³, so the number should get smaller: divide by 1000.",
            },
          ],
          difficulty: "warmup",
          guideRef: "area-volume-units",
          hints: ["1 cm³ = 1 ml. How many ml are in a litre?"],
          strategy: "Use a known fact",
        },
        {
          kind: "written",
          id: "rates-units-p1-q06",
          question: "Ethan writes: '3 m 5 cm = 3.5 m'. Explain his mistake, and write 3 m 5 cm correctly in metres.",
          marks: 3,
          modelAnswer:
            "There are 100 cm in a metre, so 5 cm is {{5/100}} of a metre, which is 0.05 m, not 0.5 m. So 3 m 5 cm = **3.05 m**. Ethan's 3.5 m is really 3 m 50 cm, which is 45 cm too long.",
          markScheme: [
            {
              point: "5 cm is {{5/100}} = 0.05 m, because 100 cm = 1 m",
              keywords: ["0.05", "5/100", "hundredth", "100 cm"],
            },
            { point: "Correct answer: 3.05 m", keywords: ["3.05"] },
            {
              point: "Explains that 3.5 m means 3 m 50 cm, so his answer is 45 cm too long",
              keywords: ["50 cm", "3 m 50", "350", "45 cm", "0.5 m"],
            },
          ],
          commonError: "Treating centimetres as tenths of a metre instead of hundredths.",
          difficulty: "core",
          guideRef: "metric-units",
          hints: [
            "How many centimetres make 1 metre?",
            "So what fraction of a metre is 5 cm? Write it as a decimal.",
            "What does 3.5 m mean in metres and centimetres?",
          ],
          strategy: "Use place value",
        },
        {
          kind: "short",
          id: "rates-units-p1-q07",
          question: "A rug measures 2.5 m by 1.6 m. What is its area in cm²? (Type the number without spaces.)",
          answer: { type: "number", value: 40000, display: "40 000 cm²" },
          solution: [
            "Area in m²: 2.5 × 1.6 = 4 m².",
            "1 m² = 100 cm × 100 cm = 10 000 cm².",
            "4 × 10 000 = 40 000 cm².",
          ],
          solutions: [
            {
              label: "Convert the lengths first (safest)",
              steps: ["2.5 m = 250 cm and 1.6 m = 160 cm.", "250 × 160 = 40 000 cm². Same answer, with no area factor to remember."],
            },
          ],
          commonError: "Multiplying the area in m² by 100, the length factor, instead of 10 000.",
          traps: [
            {
              spec: { type: "number", value: 400 },
              feedback: "That multiplies 4 m² by 100. For area the factor is squared: 1 m² = 100 × 100 = 10 000 cm².",
            },
            { spec: { type: "number", value: 4 }, feedback: "4 is the area in m². Now change it into cm²." },
          ],
          difficulty: "core",
          guideRef: "area-volume-units",
          hints: [
            "You could find the area in m² first, or change both lengths into cm first.",
            "In cm the rug is 250 cm by 160 cm.",
            "Multiply 250 × 160 (or 4 m² × 10 000).",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "rates-units-p1-q08",
          question:
            "A night train leaves at 21:40 and arrives at 06:15 the next morning. How long is the journey? Give your answer in minutes.",
          answer: { type: "number", value: 515, display: "515 minutes (8 h 35 min)" },
          solution: [
            "Count on, using midnight as a stepping stone.",
            "21:40 → 22:00 is 20 min.",
            "22:00 → 00:00 is 2 h.",
            "00:00 → 06:00 is 6 h.",
            "06:00 → 06:15 is 15 min.",
            "Total: 8 h 35 min = 8 × 60 + 35 = 515 minutes.",
          ],
          commonError: "Subtracting the clock times as if they were ordinary numbers.",
          traps: [
            {
              spec: { type: "number", value: 925 },
              feedback: "That's 21:40 − 06:15 = 15 h 25 min, which goes the wrong way round the clock. Count on from 21:40, through midnight, to 06:15.",
            },
            {
              spec: { type: "number", value: 8.35 },
              feedback: "That looks like 8 h 35 min written as a decimal, but the answer is wanted in minutes.",
            },
          ],
          difficulty: "core",
          guideRef: "time",
          hints: [
            "The journey crosses midnight. Can you count on in friendly jumps?",
            "Jumps: 21:40 → 22:00 → 00:00 → 06:00 → 06:15.",
            "20 min + 2 h + 6 h + 15 min. Now change it all into minutes.",
          ],
          strategy: "Draw a number line",
        },
        {
          kind: "short",
          id: "rates-units-p1-q09",
          question: "A bus travels 52 km in 1 hour 20 minutes. Find its average speed in km/h.",
          answer: { type: "number", value: 39, display: "39 km/h" },
          solution: [
            "The speed is wanted in km/h, so write the time in hours: 20 min = {{20/60}} = {{1/3}} h, so 1 h 20 min = {{1 1/3}} = {{4/3}} h.",
            "Speed = distance ÷ time = 52 ÷ {{4/3}} = 52 × {{3/4}}.",
            "52 ÷ 4 = 13, and 13 × 3 = 39 km/h.",
          ],
          solutions: [
            {
              label: "Scale to one hour (quicker)",
              steps: [
                "1 h 20 min = 80 minutes, which is 4 lots of 20 minutes.",
                "In each 20 minutes the bus covers 52 ÷ 4 = 13 km.",
                "An hour is 3 lots of 20 minutes: 3 × 13 = 39 km/h.",
              ],
            },
          ],
          commonError: "Writing 1 h 20 min as 1.2 h.",
          traps: [
            {
              spec: { type: "number", value: 43.33, tolerance: 0.05 },
              feedback: "1 h 20 min is not 1.2 h. 20 minutes is {{1/3}} of an hour, so the time is {{4/3}} h.",
            },
            {
              spec: { type: "number", value: 0.65 },
              feedback: "52 ÷ 80 = 0.65 is the distance per *minute*. Multiply by 60 to get km per hour.",
            },
          ],
          difficulty: "core",
          guideRef: "speed",
          hints: [
            "A speed in km/h needs the time in hours. What fraction of an hour is 20 minutes?",
            "1 h 20 min = {{4/3}} h. Or think: how far does the bus go in each 20 minutes?",
            "52 km in 4 lots of 20 minutes means 13 km per 20 minutes.",
          ],
          strategy: "Use the unitary method",
        },
        {
          kind: "short",
          id: "rates-units-p1-q10",
          question:
            "A block of iron has a volume of 20 cm³ and a mass of 158 g. Find the density of iron in g/cm³. (Type just the number.)",
          answer: { type: "number", value: 7.9, display: "7.9 g/cm³" },
          solution: [
            "Density = mass ÷ volume.",
            "158 ÷ 20 = 7.9 g/cm³.",
            "Sense check: iron sinks in water, and 7.9 is much more than water's 1 g/cm³.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.1266, tolerance: 0.001 },
              feedback: "You divided the volume by the mass. Density = mass ÷ volume.",
            },
            { spec: { type: "number", value: 3160 }, feedback: "Density is mass ÷ volume, not mass × volume." },
          ],
          difficulty: "core",
          guideRef: "density-and-rates",
          hints: [
            "Density is the mass of 1 cm³.",
            "Share the 158 g equally between the 20 cm³.",
            "Work out 158 ÷ 20.",
          ],
          strategy: "Use the unitary method",
        },
        {
          kind: "short",
          id: "rates-units-p1-q11",
          question:
            "Wei Ling needs exactly 10 kg of rice. A 2 kg bag costs $5.80 and a 5 kg bag costs $14.00. How much cheaper is it to buy the 10 kg as 5 kg bags rather than as 2 kg bags? Give your answer in dollars.",
          answer: { type: "number", value: 1, display: "$1" },
          solution: [
            "Using 2 kg bags: she needs 10 ÷ 2 = 5 bags, costing 5 × 5.80 = $29.00.",
            "Using 5 kg bags: she needs 10 ÷ 5 = 2 bags, costing 2 × 14.00 = $28.00.",
            "Saving: 29.00 − 28.00 = $1.00.",
          ],
          solutions: [
            {
              label: "Price per kg",
              steps: [
                "2 kg bag: 5.80 ÷ 2 = $2.90 per kg. 5 kg bag: 14.00 ÷ 5 = $2.80 per kg.",
                "The 5 kg bags save $0.10 on every kilogram.",
                "On 10 kg that is 10 × 0.10 = $1.00. Both ways are quick; the price per kg also tells you which bag is better value for *any* amount.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 0.1 }, feedback: "$0.10 is the saving on *one* kilogram. She buys 10 kg." },
            {
              spec: { type: "number", value: 8.2 },
              feedback: "That compares one bag of each size, but the bags hold different amounts of rice. Compare the cost of the same 10 kg.",
            },
          ],
          difficulty: "core",
          guideRef: "density-and-rates",
          hints: [
            "Work out the cost of 10 kg each way.",
            "How many 2 kg bags make 10 kg? How many 5 kg bags?",
            "Compare $29.00 with $28.00.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "rates-units-p1-q12",
          question: "The conversion graph changes between miles and kilometres. Use it to convert 200 km into miles.",
          diagram: milesKmGraph,
          answer: { type: "number", value: 125, display: "125 miles" },
          solution: [
            "200 km is off the top of the graph, so read a smaller value and scale up.",
            "From 40 km on the vertical axis, go across to the line, then down: 25 miles.",
            "200 km = 5 × 40 km, so 200 km ≈ 5 × 25 = 125 miles.",
            "Check with 5 miles ≈ 8 km: 200 ÷ 8 = 25 lots of 8 km, and 25 × 5 = 125 miles.",
          ],
          solutions: [
            {
              label: "Use the end of the line",
              steps: [
                "The line ends at 50 miles and 80 km, so 80 km ≈ 50 miles.",
                "200 km = 2.5 × 80 km, so 200 km ≈ 2.5 × 50 = 125 miles.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 320 },
              feedback: "Going from km to miles the number should get *smaller*, because a mile is longer than a kilometre. You multiplied by 1.6.",
            },
            { spec: { type: "number", value: 25 }, feedback: "25 miles matches 40 km. 200 km is 5 times as far, so scale up." },
          ],
          difficulty: "core",
          guideRef: "conversion-graphs",
          hints: [
            "200 km isn't on the graph. Can you read a value that divides exactly into 200?",
            "Read across from 40 km to the line, then down to the miles axis.",
            "40 km ≈ 25 miles, and 200 = 5 × 40.",
          ],
          strategy: "Scale up from a reading",
        },
        {
          kind: "short",
          id: "rates-units-p1-q13",
          question:
            "A rectangular garden pond is 2.5 m long, 1.2 m wide and 60 cm deep. How many litres of water does it hold when full?",
          answer: { type: "number", value: 1800, display: "1800 litres" },
          solution: [
            "Match the units first: 60 cm = 0.6 m.",
            "Volume = 2.5 × 1.2 × 0.6 = 1.8 m³.",
            "1 m³ = 1000 litres, so 1.8 × 1000 = 1800 litres.",
          ],
          solutions: [
            {
              label: "Work in centimetres",
              steps: [
                "250 cm × 120 cm × 60 cm = 1 800 000 cm³.",
                "1000 cm³ = 1 litre, so 1 800 000 ÷ 1000 = 1800 litres.",
                "Same answer; working in metres keeps the numbers smaller.",
              ],
            },
          ],
          commonError: "Multiplying lengths in different units (metres and centimetres) together.",
          traps: [
            {
              spec: { type: "number", value: 180 },
              feedback: "You multiplied 2.5 × 1.2 × 60, mixing metres with centimetres. Change 60 cm to 0.6 m first.",
            },
            { spec: { type: "number", value: 1800000 }, feedback: "That's the volume in cm³. Divide by 1000 to get litres." },
          ],
          difficulty: "core",
          guideRef: "area-volume-units",
          hints: [
            "Are all three lengths in the same unit?",
            "60 cm = 0.6 m. Now find the volume in m³.",
            "How many litres are in 1 m³?",
          ],
          strategy: "Convert units first",
        },
        {
          kind: "written",
          id: "rates-units-p1-q14",
          question:
            "A diving peregrine falcon can reach 90 m/s. Arjun says a bullet train travelling at 320 km/h is faster than the falcon, because 320 is bigger than 90. Is Arjun right? Show working to support your answer.",
          marks: 3,
          modelAnswer:
            "No. You can't compare 320 and 90 directly because they are in different units. Convert the falcon's speed to km/h: 90 m every second is 90 × 3600 = 324 000 m = 324 km every hour, so 90 m/s = 324 km/h (the shortcut is × 3.6). 324 km/h is more than 320 km/h, so the falcon is (just) faster. (Or: 320 km/h ÷ 3.6 ≈ 88.9 m/s, which is less than 90 m/s.)",
          markScheme: [
            {
              point: "Recognises the speeds are in different units and must be converted to the same unit",
              keywords: ["different units", "same unit", "convert", "units"],
            },
            {
              point: "Correct conversion: 90 m/s = 324 km/h, or 320 km/h ≈ 88.9 m/s",
              keywords: ["324", "88.9", "88.8", "3.6", "3600"],
            },
            {
              point: "Correct conclusion: Arjun is wrong, the falcon is faster",
              keywords: ["falcon is faster", "wrong", "not right", "falcon", "faster"],
            },
          ],
          commonError: "Comparing the numbers without converting, or converting the wrong way (90 ÷ 3.6).",
          difficulty: "core",
          guideRef: "speed",
          hints: [
            "Can you compare 90 and 320 when one is in m/s and the other is in km/h?",
            "To change m/s into km/h, multiply by 3.6. Where does 3.6 come from?",
            "90 × 3.6 = ? km/h. Compare it with 320.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "rates-units-p1-q15",
          question:
            "A train leaves at 09:47. It travels 34 km at an average speed of 85 km/h. At what time does it arrive? Give your answer using the 24-hour clock.",
          answer: {
            type: "text",
            accept: ["10:11", "1011", "10.11", "10:11hrs", "1011hrs", "10h11"],
            display: "10:11",
          },
          solution: [
            "Time = distance ÷ speed = 34 ÷ 85 = 0.4 h.",
            "0.4 h = 0.4 × 60 = 24 minutes.",
            "09:47 + 13 min = 10:00, then + 11 min = 10:11.",
          ],
          commonError: "Turning 0.4 h into 40 minutes.",
          traps: [
            {
              spec: { type: "text", accept: ["10:27", "1027", "10.27"] },
              feedback: "0.4 h is not 40 minutes. 0.4 × 60 = 24 minutes.",
            },
          ],
          difficulty: "core",
          guideRef: "time",
          hints: [
            "How long does the journey take, in hours?",
            "34 ÷ 85 = 0.4 h. How many minutes is that?",
            "Add 24 minutes to 09:47, using 10:00 as a stepping stone.",
          ],
          strategy: "Use a stepping stone (the next hour)",
        },
        {
          kind: "short",
          id: "rates-units-p1-q16",
          question:
            "A box weighing 60 N rests on a shelf. Its base measures 20 cm by 15 cm. Find the pressure on the shelf in N/m². (Type just the number.)",
          answer: { type: "number", value: 2000, display: "2000 N/m²" },
          solution: [
            "The answer is wanted in N/m², so change the lengths to metres: 20 cm = 0.2 m and 15 cm = 0.15 m.",
            "Area = 0.2 × 0.15 = 0.03 m².",
            "Pressure = force ÷ area = 60 ÷ 0.03 = 2000 N/m².",
          ],
          solutions: [
            {
              label: "Work in cm², then convert",
              steps: [
                "Area = 20 × 15 = 300 cm², so pressure = 60 ÷ 300 = 0.2 N/cm².",
                "1 m² = 10 000 cm², so each m² carries 10 000 times as much force: 0.2 × 10 000 = 2000 N/m².",
              ],
            },
          ],
          commonError: "Dividing by the area in cm² and calling the answer N/m².",
          traps: [
            {
              spec: { type: "number", value: 0.2 },
              feedback: "0.2 is the pressure in N/cm². Each m² is 10 000 cm², so the pressure in N/m² is 10 000 times bigger.",
            },
            { spec: { type: "number", value: 1.8 }, feedback: "Pressure = force ÷ area, not force × area." },
          ],
          difficulty: "core",
          guideRef: "pressure",
          hints: [
            "Which units does the answer need? Change the base measurements to match.",
            "Area = 0.2 m × 0.15 m.",
            "Pressure = force ÷ area = 60 ÷ 0.03.",
          ],
          strategy: "Convert units first",
        },
        {
          kind: "written",
          id: "rates-units-p1-q17",
          question:
            "A jeweller is given a crown with a mass of 965 g that is said to be pure gold. She lowers it into a jug filled to the brim with water, and 60 cm³ of water spills out. Gold has a density of 19.3 g/cm³. Is the crown pure gold? Explain your reasoning with calculations.",
          marks: 3,
          modelAnswer:
            "The crown pushes out its own volume of water, so its volume is 60 cm³. Its density is 965 ÷ 60 ≈ 16.1 g/cm³. Pure gold has a density of 19.3 g/cm³, so the crown is **not** pure gold: it must be mixed with a less dense metal (such as silver). Another way: 965 g of pure gold would have a volume of 965 ÷ 19.3 = 50 cm³, but the crown takes up 60 cm³, which is too much.",
          markScheme: [
            {
              point: "Uses the spilled water: the crown's volume is 60 cm³",
              keywords: ["60", "spilled", "displaced", "same volume", "volume of the crown"],
            },
            {
              point: "Correct calculation: density ≈ 16.1 g/cm³, or pure gold of that mass would take up only 50 cm³",
              keywords: ["16.1", "16.08", "16", "50 cm³", "50"],
            },
            {
              point: "Conclusion: not pure gold, because its density is less than 19.3 g/cm³ (mixed with a less dense metal)",
              keywords: ["not pure", "less dense", "not gold", "mixed", "lower"],
            },
          ],
          solutions: [
            {
              label: "Method 1: find the crown's density",
              steps: ["Volume = 60 cm³ (the spilled water).", "Density = 965 ÷ 60 ≈ 16.1 g/cm³, which is less than 19.3, so not pure gold."],
            },
            {
              label: "Method 2: find the volume pure gold would need (slicker: no awkward decimal)",
              steps: ["965 ÷ 19.3 = 50 cm³.", "The crown takes up 60 cm³, which is too big for pure gold."],
            },
          ],
          commonError: "Not realising that the spilled water tells you the crown's volume.",
          difficulty: "challenge",
          guideRef: "density-and-rates",
          hints: [
            "What does the spilled water tell you about the crown?",
            "The crown's volume is 60 cm³. Find its density.",
            "Compare with 19.3 g/cm³. Or work out what volume 965 g of pure gold would take up.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "rates-units-p1-q18",
          question:
            "Siti and Marcus are 45 km apart. They set off at the same time and cycle towards each other along the same road, Siti at 14 km/h and Marcus at 16 km/h. After how many minutes do they meet?",
          answer: { type: "number", value: 90, display: "90 minutes" },
          solution: [
            "Each hour, Siti closes the gap by 14 km and Marcus by 16 km.",
            "So the gap shrinks at 14 + 16 = 30 km/h (their **closing speed**).",
            "Time = 45 ÷ 30 = 1.5 h = 90 minutes.",
          ],
          solutions: [
            {
              label: "Hour by hour (no formula)",
              steps: [
                "After 1 hour they have covered 14 + 16 = 30 km between them, so 15 km of the gap is left.",
                "15 km is half of 30 km, so that takes another half hour.",
                "1 h 30 min = 90 minutes.",
              ],
            },
          ],
          commonError: "Subtracting the speeds. That is for one rider chasing another in the same direction.",
          traps: [
            { spec: { type: "number", value: 1.5 }, feedback: "1.5 is the time in hours. The question asks for minutes." },
            {
              spec: { type: "number", value: 1350 },
              feedback: "Subtracting the speeds (16 − 14) is for chasing in the same direction. Riding towards each other, the gap closes at 14 + 16 km/h.",
            },
          ],
          difficulty: "challenge",
          guideRef: "speed",
          hints: [
            "Forget the road for a moment: how fast is the gap between them shrinking?",
            "In one hour, Siti rides 14 km and Marcus rides 16 km towards her.",
            "The gap closes at 30 km/h. Time = 45 ÷ 30 hours.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "rates-units-p1-q19",
          question:
            "During a monsoon storm, 2 cm of rain falls on a flat school roof measuring 15 m by 8 m. All the water drains into a tank. How many litres of water is that?",
          answer: { type: "number", value: 2400, display: "2400 litres" },
          solution: [
            "The rain forms a thin layer on the roof: a cuboid 15 m by 8 m by 2 cm.",
            "Match the units: 2 cm = 0.02 m.",
            "Volume = 15 × 8 × 0.02 = 120 × 0.02 = 2.4 m³.",
            "1 m³ = 1000 litres, so 2.4 × 1000 = 2400 litres.",
          ],
          solutions: [
            {
              label: "Work in centimetres",
              steps: ["1500 cm × 800 cm × 2 cm = 2 400 000 cm³.", "Divide by 1000: 2400 litres."],
            },
            {
              label: "The rain-gauge fact (slickest)",
              steps: [
                "1 mm of rain on 1 m² is a layer 100 cm × 100 cm × 0.1 cm = 1000 cm³, which is exactly 1 litre.",
                "2 cm = 20 mm and the roof is 15 × 8 = 120 m², so the rain is 20 × 120 = 2400 litres.",
              ],
            },
          ],
          commonError: "Multiplying an area in m² by a depth in cm.",
          traps: [
            {
              spec: { type: "number", value: 240 },
              feedback: "You multiplied 120 m² by 2 cm without matching the units. 2 cm = 0.02 m.",
            },
            { spec: { type: "number", value: 2400000 }, feedback: "That's the volume in cm³. Divide by 1000 to get litres." },
          ],
          difficulty: "core",
          guideRef: "area-volume-units",
          hints: [
            "The rain on the roof forms a very flat cuboid. What are its three dimensions?",
            "Put all three in metres: 2 cm = 0.02 m.",
            "Find the volume in m³, then use 1 m³ = 1000 litres.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "rates-units-p1-q20",
          question:
            "Tap A fills a sink in 6 minutes. Tap B fills the same sink in 3 minutes. Siti says: 'With both taps on, it will take the average of 6 and 3, which is 4.5 minutes.' Explain why Siti must be wrong, then work out how long it really takes.",
          marks: 3,
          modelAnswer:
            "Siti must be wrong: tap B on its own fills the sink in 3 minutes, and turning on a second tap can only make it faster, so the answer must be **less than 3 minutes**. Work with rates: tap A fills {{1/6}} of the sink each minute and tap B fills {{1/3}}. Together they fill {{1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2}} of the sink each minute, so the sink is full in **2 minutes**. (Check with a 6-litre sink: A gives 1 litre per minute, B gives 2 litres per minute, together 3 litres per minute, and 6 ÷ 3 = 2 minutes.)",
          markScheme: [
            {
              point: "Sense check: both taps together must be quicker than tap B alone, so less than 3 minutes",
              keywords: ["less than 3", "quicker", "faster", "under 3", "shorter"],
            },
            {
              point: "Adds the rates: {{1/6}} + {{1/3}} = {{1/2}} of the sink per minute (or uses a sink size, e.g. 1 + 2 = 3 litres per minute)",
              keywords: ["1/6", "1/3", "1/2", "per minute", "add", "litres per minute"],
            },
            { point: "Correct time: 2 minutes", keywords: ["2 minutes", "2 min", "two minutes"] },
          ],
          solutions: [
            {
              label: "Choose a sink size (slicker)",
              steps: [
                "Say the sink holds 6 litres (6 and 3 both divide into it).",
                "Tap A: 6 ÷ 6 = 1 litre per minute. Tap B: 6 ÷ 3 = 2 litres per minute.",
                "Together: 3 litres per minute, so 6 ÷ 3 = 2 minutes.",
              ],
            },
          ],
          commonError: "Averaging the times. You add the *rates* (sink per minute), not the times.",
          difficulty: "challenge",
          guideRef: "density-and-rates",
          hints: [
            "Should two taps be faster or slower than tap B on its own?",
            "Think rates: what fraction of the sink does each tap fill in one minute?",
            "Or imagine the sink holds 6 litres. How many litres per minute does each tap deliver?",
          ],
          strategy: "Make it simpler",
        },
      ],
    },
    {
      id: "rates-units-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "rates-units-p2-q01",
          question: "Write 2350 m in kilometres.",
          answer: { type: "number", value: 2.35, display: "2.35 km" },
          solution: ["A kilometre is the bigger unit, so divide.", "1 km = 1000 m, so 2350 ÷ 1000 = 2.35 km."],
          traps: [
            { spec: { type: "number", value: 23.5 }, feedback: "1 km = 1000 m, not 100 m: divide by 1000." },
            {
              spec: { type: "number", value: 2350000 },
              feedback: "Kilometres are bigger than metres, so the number should get smaller: divide by 1000, don't multiply.",
            },
          ],
          difficulty: "warmup",
          guideRef: "metric-units",
          hints: ["Is a kilometre bigger or smaller than a metre? So should the number get bigger or smaller?"],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "rates-units-p2-q02",
          question: "Write 1 hour 48 minutes in hours, as a decimal.",
          answer: { type: "number", value: 1.8, allowFraction: false, display: "1.8 h" },
          solution: ["48 minutes is {{48/60}} of an hour.", "{{48/60 = 8/10}} = 0.8.", "So 1 h 48 min = 1.8 h."],
          traps: [
            {
              spec: { type: "number", value: 1.48 },
              feedback: "The minutes aren't the decimal part. 48 minutes is {{48/60}} of an hour, which is 0.8 h.",
            },
          ],
          difficulty: "warmup",
          guideRef: "time",
          hints: ["What fraction of an hour is 48 minutes? Divide by 60."],
          strategy: "Convert to one unit",
        },
        {
          kind: "short",
          id: "rates-units-p2-q03",
          question: "A coach travels at a steady 72 km/h for 2.5 hours. How far does it travel, in km?",
          answer: { type: "number", value: 180, display: "180 km" },
          solution: ["Distance = speed × time.", "72 × 2.5 = 144 + 36 = 180 km (2 hours, then half an hour)."],
          traps: [
            {
              spec: { type: "number", value: 28.8 },
              feedback: "You divided. 72 km/h means 72 km in *each* hour, so in 2.5 hours it is 72 × 2.5.",
            },
          ],
          difficulty: "warmup",
          guideRef: "speed",
          hints: ["72 km/h means 72 km in every hour. How far in 2 hours, and in another half hour?"],
          strategy: "Use the formula",
        },
        {
          kind: "short",
          id: "rates-units-p2-q04",
          question: "A tap fills a 54-litre tub in 6 minutes. What is its flow rate, in litres per minute?",
          answer: { type: "number", value: 9, display: "9 litres per minute" },
          solution: ["Litres per minute = litres ÷ minutes.", "54 ÷ 6 = 9 litres per minute."],
          traps: [
            {
              spec: { type: "number", value: 0.111, tolerance: 0.005 },
              feedback: "That's minutes per litre (6 ÷ 54). 'Litres per minute' means litres ÷ minutes.",
            },
          ],
          difficulty: "warmup",
          guideRef: "density-and-rates",
          hints: ["'Per' means divide: litres ÷ minutes."],
          strategy: "Use the unitary method",
        },
        {
          kind: "short",
          id: "rates-units-p2-q05",
          question: "A large bottle of milk in the UK holds 4 pints. Using 1 pint ≈ 0.57 litres, about how many litres is that?",
          answer: { type: "number", value: 2.28, tolerance: 0.025, display: "2.28 litres" },
          solution: ["Each pint is about 0.57 litres, so multiply.", "4 × 0.57 = 2.28 litres."],
          traps: [
            {
              spec: { type: "number", value: 7.02, tolerance: 0.05 },
              feedback: "A pint is less than a litre, so the number of litres should be *smaller* than 4. Multiply by 0.57 instead of dividing.",
            },
          ],
          difficulty: "warmup",
          guideRef: "imperial-units",
          hints: ["1 pint is less than 1 litre. Should the answer be more or less than 4?"],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "rates-units-p2-q06",
          question:
            "Mei makes a drink by mixing 1.25 litres of water, 650 ml of lime juice and 45 cl of syrup. How many millilitres of drink does she make?",
          answer: { type: "number", value: 2350, display: "2350 ml" },
          solution: [
            "Change everything to ml.",
            "1.25 litres = 1.25 × 1000 = 1250 ml.",
            "1 cl = 10 ml, so 45 cl = 450 ml.",
            "Total: 1250 + 650 + 450 = 2350 ml.",
          ],
          commonError: "Adding numbers in different units, or treating cl as if it were ml.",
          traps: [
            { spec: { type: "number", value: 1945 }, feedback: "45 cl is not 45 ml. 1 cl = 10 ml, so 45 cl = 450 ml." },
            {
              spec: { type: "number", value: 1101.25 },
              feedback: "Change the 1.25 litres into ml too: 1.25 litres = 1250 ml.",
            },
          ],
          difficulty: "core",
          guideRef: "metric-units",
          hints: [
            "The three amounts are in three different units. Which unit does the answer need?",
            "1 litre = 1000 ml and 1 cl = 10 ml.",
            "Add 1250 + 650 + 450.",
          ],
          strategy: "Convert to the same unit",
        },
        {
          kind: "written",
          id: "rates-units-p2-q07",
          question:
            "Hana converts 2.5 m³ into cm³. She writes: '1 m = 100 cm, so 2.5 m³ = 2.5 × 100 = 250 cm³.' Explain her mistake and give the correct answer.",
          marks: 3,
          modelAnswer:
            "Hana has used the length factor, 100, only once. But volume is length × width × height, so the factor must be used three times. A 1 m cube is 100 cm by 100 cm by 100 cm, so it holds 100 × 100 × 100 = 1 000 000 little 1 cm cubes: 1 m³ = 1 000 000 cm³. So 2.5 m³ = 2.5 × 1 000 000 = **2 500 000 cm³**.",
          markScheme: [
            {
              point: "Explains that volume uses three lengths, so the length factor must be cubed (100 × 100 × 100), not used once",
              keywords: ["cubed", "three", "100 x 100 x 100", "100 × 100 × 100", "100³", "layers", "length, width and height"],
            },
            { point: "1 m³ = 1 000 000 cm³", keywords: ["1 000 000", "1000000", "million"] },
            { point: "Correct answer: 2 500 000 cm³", keywords: ["2 500 000", "2500000", "2.5 million"] },
          ],
          commonError: "Using the length factor (100) for volume, or squaring it (10 000) as if it were area.",
          difficulty: "core",
          guideRef: "area-volume-units",
          hints: [
            "How many lengths are multiplied together to make a volume?",
            "Picture a 1 m cube cut into 1 cm cubes. How many cubes fit along each edge?",
            "Work out 100 × 100 × 100.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "rates-units-p2-q08",
          question:
            "A ferry leaves at 09:40 and arrives at 11:05. Ravi works out 11.05 − 9.40 = 1.65 and says the journey takes 1 hour 65 minutes. Explain his mistake and find the correct journey time.",
          marks: 3,
          modelAnswer:
            "Ravi has subtracted the times as if they were decimals, where each whole splits into 100 parts. But an hour has **60** minutes, not 100, so ordinary subtraction doesn't work for clock times. (Also, 65 minutes is more than an hour, so '1 hour 65 minutes' can't be a sensible answer.) Count on instead: 09:40 → 10:00 is 20 min, 10:00 → 11:00 is 1 h, and 11:00 → 11:05 is 5 min. The journey takes **1 hour 25 minutes** (85 minutes).",
          markScheme: [
            {
              point: "Explains the error: an hour has 60 minutes, not 100, so clock times can't be subtracted like decimals",
              keywords: ["60", "100", "not a decimal", "not decimals", "hour has 60"],
            },
            {
              point: "Uses a correct method, e.g. counting on via 10:00 and 11:00",
              keywords: ["count on", "10:00", "11:00", "20 min", "5 min"],
            },
            { point: "Correct answer: 1 hour 25 minutes (85 minutes)", keywords: ["1 hour 25", "1 h 25", "85", "1:25"] },
          ],
          commonError: "Subtracting clock times like decimals.",
          difficulty: "core",
          guideRef: "time",
          hints: [
            "How many minutes are in an hour? How many 'minutes' does decimal subtraction assume?",
            "Count on from 09:40 to the next whole hour.",
            "Jumps: 09:40 → 10:00 → 11:00 → 11:05.",
          ],
          strategy: "Draw a number line",
        },
        {
          kind: "short",
          id: "rates-units-p2-q09",
          question: "A train travels at 126 km/h. What is this speed in m/s?",
          answer: { type: "number", value: 35, display: "35 m/s" },
          solution: [
            "126 km/h means 126 000 m in 3600 seconds.",
            "126 000 ÷ 3600 = 35 m/s.",
            "Shortcut: km/h ÷ 3.6 = m/s, and 126 ÷ 3.6 = 35.",
          ],
          traps: [
            {
              spec: { type: "number", value: 453.6 },
              feedback: "The m/s number is smaller than the km/h number (a metre is tiny compared with a kilometre). Divide by 3.6, don't multiply.",
            },
            {
              spec: { type: "number", value: 2.1 },
              feedback: "126 ÷ 60 = 2.1 is km per *minute*. You need metres per *second*: × 1000 ÷ 3600, which is ÷ 3.6.",
            },
          ],
          difficulty: "core",
          guideRef: "speed",
          hints: [
            "How many metres are in 126 km? How many seconds are in an hour?",
            "That's 126 000 m in 3600 s.",
            "Divide: 126 000 ÷ 3600, or 126 ÷ 3.6.",
          ],
          strategy: "Convert units first",
        },
        {
          kind: "short",
          id: "rates-units-p2-q10",
          question: "Zara walks 2.8 km to the MRT station at a steady 4.8 km/h. How many minutes does the walk take?",
          answer: { type: "number", value: 35, display: "35 minutes" },
          solution: [
            "Time = distance ÷ speed = 2.8 ÷ 4.8 hours.",
            "2.8 ÷ 4.8 = {{28/48}} = {{7/12}} of an hour.",
            "{{7/12}} × 60 = 35 minutes.",
          ],
          solutions: [
            {
              label: "Distance per minute (quicker)",
              steps: [
                "4.8 km/h means 4.8 km in 60 minutes, so 0.08 km = 80 m every minute.",
                "2.8 km = 2800 m, and 2800 ÷ 80 = 35 minutes.",
              ],
            },
          ],
          commonError: "Reading 0.58 h as 58 minutes.",
          traps: [
            {
              spec: { type: "number", value: 0.5833, tolerance: 0.01 },
              feedback: "That's the time in hours. Multiply by 60 to get minutes.",
            },
            {
              spec: { type: "number", value: 58.33, tolerance: 0.5 },
              feedback: "0.583 hours is not 58 minutes. Multiply the fraction of an hour by 60.",
            },
          ],
          difficulty: "core",
          guideRef: "speed",
          hints: [
            "Time = distance ÷ speed. Which unit of time will that give you?",
            "2.8 ÷ 4.8 gives the time in hours: {{7/12}} h.",
            "Change hours into minutes: multiply by 60.",
          ],
          strategy: "Convert units first",
        },
        {
          kind: "short",
          id: "rates-units-p2-q11",
          question:
            "Cashew nuts are sold in a 250 g bag for $4.50 or a 600 g bag for $10.20. Find the price per 100 g of the better-value bag. Give your answer in dollars.",
          answer: { type: "number", value: 1.7, display: "$1.70" },
          solution: [
            "250 g bag: 250 g is 2.5 lots of 100 g, so 4.50 ÷ 2.5 = $1.80 per 100 g.",
            "600 g bag: 600 g is 6 lots of 100 g, so 10.20 ÷ 6 = $1.70 per 100 g.",
            "$1.70 is less than $1.80, so the 600 g bag is better value, at $1.70 per 100 g.",
          ],
          traps: [
            {
              spec: { type: "number", value: 1.8 },
              feedback: "$1.80 is the price per 100 g of the 250 g bag. Check the other bag: it works out cheaper per 100 g.",
            },
          ],
          difficulty: "core",
          guideRef: "density-and-rates",
          hints: [
            "How many lots of 100 g are in each bag?",
            "Divide each price by its number of 100 g lots.",
            "For 4.50 ÷ 2.5, double both: 9 ÷ 5.",
          ],
          strategy: "Use the unitary method",
        },
        {
          kind: "short",
          id: "rates-units-p2-q12",
          question:
            "An aluminium bar measures 10 cm by 4 cm by 2.5 cm. Aluminium has a density of 2.7 g/cm³. Find the mass of the bar in grams.",
          answer: { type: "number", value: 270, display: "270 g" },
          solution: ["Volume = 10 × 4 × 2.5 = 100 cm³.", "Mass = density × volume = 2.7 × 100 = 270 g."],
          traps: [
            {
              spec: { type: "number", value: 37.04, tolerance: 0.05 },
              feedback: "Mass = density × volume. Dividing the volume by the density doesn't give a mass.",
            },
          ],
          difficulty: "core",
          guideRef: "density-and-rates",
          hints: [
            "Find the volume first.",
            "Each cm³ has a mass of 2.7 g. How many cm³ are there?",
            "Mass = density × volume.",
          ],
          strategy: "Rearrange the formula",
        },
        {
          kind: "short",
          id: "rates-units-p2-q13",
          question:
            "The graph shows the amount of water delivered by two taps, A and B, each flowing at a steady rate. How many more litres per minute does tap A deliver than tap B?",
          diagram: tapsGraph,
          answer: { type: "number", value: 5, display: "5 litres per minute" },
          solution: [
            "Tap A: its line passes through (5, 60), so it delivers 60 ÷ 5 = 12 litres per minute.",
            "Tap B: its line passes through (8, 56), so it delivers 56 ÷ 8 = 7 litres per minute.",
            "Difference: 12 − 7 = 5 litres per minute.",
            "The steeper line (tap A) has the bigger rate, as expected.",
          ],
          traps: [
            {
              spec: { type: "number", value: 4 },
              feedback: "60 − 56 compares the taps at *different* times (5 minutes and 8 minutes). Find each tap's rate first.",
            },
          ],
          difficulty: "core",
          guideRef: "conversion-graphs",
          hints: [
            "The steepness of each line is a rate. Find a point on each line where you can read both values exactly.",
            "Tap A reaches 60 litres at 5 minutes. Tap B reaches 56 litres at 8 minutes.",
            "Rate = litres ÷ minutes, for each tap.",
          ],
          strategy: "Read the gradient as a rate",
        },
        {
          kind: "short",
          id: "rates-units-p2-q14",
          question:
            "A cyclist in London rides 15 miles in 1 hour 15 minutes. Using 5 miles ≈ 8 km, find her average speed in km/h.",
          answer: { type: "number", value: 19.2, display: "19.2 km/h" },
          solution: [
            "Convert the distance: 15 miles = 3 lots of 5 miles ≈ 3 × 8 = 24 km.",
            "Convert the time: 1 h 15 min = 1.25 h.",
            "Speed = 24 ÷ 1.25 = 19.2 km/h.",
          ],
          solutions: [
            {
              label: "Speed in miles per hour first",
              steps: ["15 ÷ 1.25 = 12 miles per hour.", "12 miles ≈ 12 × 1.6 = 19.2 km, so 12 mph ≈ 19.2 km/h."],
            },
          ],
          traps: [
            { spec: { type: "number", value: 12 }, feedback: "12 is her speed in miles per hour. Convert the miles to km." },
            {
              spec: { type: "number", value: 20.87, tolerance: 0.05 },
              feedback: "1 h 15 min is 1.25 h, not 1.15 h.",
            },
          ],
          difficulty: "core",
          guideRef: "imperial-units",
          hints: [
            "Two conversions are needed: miles to km, and minutes to hours.",
            "15 miles ≈ 24 km and 1 h 15 min = 1.25 h.",
            "Work out 24 ÷ 1.25.",
          ],
          strategy: "Convert units first",
        },
        {
          kind: "short",
          id: "rates-units-p2-q15",
          question:
            "A flight leaves Singapore at 08:55 Singapore time and takes 2 h 20 min to reach Bangkok. Bangkok time is 1 hour behind Singapore time. What is the local time in Bangkok when the plane lands? Use the 24-hour clock.",
          answer: {
            type: "text",
            accept: ["10:15", "1015", "10.15", "10:15hrs", "1015hrs", "10h15"],
            display: "10:15",
          },
          solution: [
            "Add the flight time in Singapore time: 08:55 + 2 h = 10:55.",
            "10:55 + 20 min: 5 min to 11:00, then 15 more, so 11:15 Singapore time.",
            "Bangkok is 1 hour behind, so subtract 1 hour: 11:15 − 1 h = 10:15.",
          ],
          traps: [
            {
              spec: { type: "text", accept: ["12:15", "1215", "12.15"] },
              feedback: "Bangkok is *behind* Singapore, so take the hour away, don't add it.",
            },
            {
              spec: { type: "text", accept: ["11:15", "1115", "11.15"] },
              feedback: "11:15 is the landing time in Singapore. Now adjust for the time difference.",
            },
          ],
          difficulty: "core",
          guideRef: "time",
          hints: [
            "Work out the landing time in Singapore time first, then change time zone.",
            "08:55 + 2 h 20 min = 11:15 Singapore time.",
            "'1 hour behind' means Bangkok clocks show an hour earlier.",
          ],
          strategy: "Split into steps",
        },
        {
          kind: "written",
          id: "rates-units-p2-q16",
          question:
            "A block weighing 24 N measures 8 cm by 5 cm by 3 cm. Mei says: 'The block presses on the table with the same pressure whichever face it rests on, because its weight doesn't change.' Is Mei right? Find the greatest and the least pressure the block can exert, in N/cm².",
          marks: 3,
          modelAnswer:
            "No, Mei is wrong. The force stays 24 N, but pressure = force ÷ area, and the faces have different areas: 8 × 5 = 40 cm², 8 × 3 = 24 cm² and 5 × 3 = 15 cm². Least pressure (largest face): 24 ÷ 40 = **0.6 N/cm²**. Greatest pressure (smallest face): 24 ÷ 15 = **1.6 N/cm²**. The smaller the area, the bigger the pressure.",
          markScheme: [
            {
              point: "Mei is wrong: pressure depends on the area as well as the force (same force, smaller area, bigger pressure)",
              keywords: ["area", "wrong", "no", "smaller area", "depends"],
            },
            { point: "Least pressure: 24 ÷ 40 = 0.6 N/cm²", keywords: ["0.6", "40"] },
            { point: "Greatest pressure: 24 ÷ 15 = 1.6 N/cm²", keywords: ["1.6", "15"] },
          ],
          commonError: "Dividing by the volume (120 cm³) instead of the area of the face it rests on.",
          difficulty: "core",
          guideRef: "pressure",
          hints: [
            "Pressure = force ÷ area. Which of these changes when the block is turned over?",
            "Work out the areas of the three different faces.",
            "The greatest pressure uses the smallest face; the least pressure uses the largest face.",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "rates-units-p2-q17",
          question:
            "Priya must cycle 30 km in exactly 2 hours. She rides the first 18 km at 12 km/h. What average speed does she need for the rest of the ride, in km/h?",
          answer: { type: "number", value: 24, display: "24 km/h" },
          solution: [
            "Time for the first part: 18 ÷ 12 = 1.5 h.",
            "Time left: 2 − 1.5 = 0.5 h.",
            "Distance left: 30 − 18 = 12 km.",
            "Speed needed = 12 ÷ 0.5 = 24 km/h.",
          ],
          commonError: "Treating average speed as the mean of the two speeds and answering 18 km/h.",
          traps: [
            {
              spec: { type: "number", value: 18 },
              feedback: "18 km/h makes the *mean* of the two speeds 15, but she spends far longer at 12 km/h. Work with times: how much time is left?",
            },
            {
              spec: { type: "number", value: 15 },
              feedback: "15 km/h is the average she needs for the whole ride. Her slow start means she must go faster for the rest.",
            },
          ],
          difficulty: "core",
          guideRef: "speed",
          hints: [
            "Work backwards from the deadline. How much of the 2 hours has she used so far?",
            "18 km at 12 km/h takes 1.5 h. How much time and how much distance are left?",
            "12 km in half an hour: what speed is that?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "rates-units-p2-q18",
          question:
            "A train 200 m long travels at a steady 72 km/h. It passes through a tunnel 1.3 km long. How many seconds pass from the moment the front of the train enters the tunnel to the moment the back of the train leaves it?",
          answer: { type: "number", value: 75, display: "75 seconds" },
          solution: [
            "Change the speed to m/s: 72 ÷ 3.6 = 20 m/s.",
            "From 'front enters' to 'back leaves', the front of the train travels the length of the tunnel **plus** the length of the train: 1300 + 200 = 1500 m.",
            "Time = 1500 ÷ 20 = 75 seconds.",
          ],
          solutions: [
            {
              label: "Follow the back of the train",
              steps: [
                "When the front enters, the back is still 200 m before the tunnel entrance.",
                "The back must travel 200 m to reach the tunnel, then 1300 m through it: 1500 m.",
                "1500 ÷ 20 = 75 s. Either way, the key is to track one point on the train.",
              ],
            },
          ],
          commonError: "Forgetting the length of the train itself.",
          traps: [
            {
              spec: { type: "number", value: 65 },
              feedback: "65 s is when the *front* reaches the far end. The back of the train is still 200 m inside the tunnel.",
            },
            {
              spec: { type: "number", value: 20.83, tolerance: 0.05 },
              feedback: "Match the units before dividing: 72 km/h = 20 m/s, and the distance is 1500 m.",
            },
          ],
          difficulty: "challenge",
          guideRef: "speed",
          hints: [
            "Sketch the train at the start and at the end. Pick one point on the train and follow it.",
            "The front of the train travels through the whole tunnel and then a further 200 m.",
            "Speed in m/s: 72 ÷ 3.6 = 20.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "rates-units-p2-q19",
          question:
            "Arjun mixes 300 cm³ of syrup (density 1.3 g/cm³) with 200 cm³ of water (density 1 g/cm³). He says the density of the mixture is 1.15 g/cm³, the mean of 1.3 and 1. Assuming the volumes simply add, find the true density of the mixture, and explain why Arjun's method doesn't work.",
          marks: 3,
          modelAnswer:
            "Mass of syrup = 1.3 × 300 = 390 g. Mass of water = 1 × 200 = 200 g. Total mass = 590 g, in a total volume of 300 + 200 = 500 cm³. Density = 590 ÷ 500 = **1.18 g/cm³**. Arjun's mean treats the two liquids as if there were equal amounts of each, but there is more syrup than water, so the syrup's density counts for more and pulls the answer above 1.15. A plain mean would only work for equal volumes.",
          markScheme: [
            {
              point: "Finds the masses: 390 g of syrup and 200 g of water (590 g in total)",
              keywords: ["390", "590", "200 g"],
            },
            { point: "Density of the mixture = 590 ÷ 500 = 1.18 g/cm³", keywords: ["1.18", "500"] },
            {
              point: "Explains that the volumes are not equal (more syrup), so the syrup counts for more; a simple mean only works for equal volumes",
              keywords: ["more syrup", "not equal", "equal volumes", "counts more", "weighted", "more of"],
            },
          ],
          commonError: "Averaging the densities, just like averaging speeds instead of using total distance ÷ total time.",
          difficulty: "challenge",
          guideRef: "density-and-rates",
          hints: [
            "Density = total mass ÷ total volume. What is the total mass?",
            "Mass of each liquid = density × volume.",
            "The mixture is 590 g in 500 cm³. Why is the answer above 1.15?",
          ],
          strategy: "Find totals first",
        },
        {
          kind: "short",
          id: "rates-units-p2-q20",
          question:
            "Four identical pumps can empty a flooded car park in 6 hours. They all start together, but after 2 hours one pump breaks down and the other three carry on. How long does it take to empty the car park altogether? Give your answer in minutes.",
          answer: { type: "number", value: 440, display: "440 minutes (7 h 20 min)" },
          solution: [
            "Measure the job in **pump-hours**: 4 pumps × 6 hours = 24 pump-hours of work.",
            "In the first 2 hours, 4 pumps do 4 × 2 = 8 pump-hours. That leaves 24 − 8 = 16 pump-hours.",
            "3 pumps do 3 pump-hours each hour, so the rest takes 16 ÷ 3 = {{5 1/3}} hours = 5 h 20 min.",
            "Total: 2 h + 5 h 20 min = 7 h 20 min = 440 minutes.",
          ],
          solutions: [
            {
              label: "Fractions of the job",
              steps: [
                "After 2 hours, {{2/6 = 1/3}} of the job is done, so {{2/3}} is left.",
                "With all 4 pumps that would take 4 more hours. With only 3 pumps it takes {{4/3}} as long: 4 × {{4/3}} = {{16/3}} h = 5 h 20 min.",
                "Total: 7 h 20 min = 440 minutes.",
              ],
            },
          ],
          commonError: "Turning {{5 1/3}} hours into 5 h 33 min, or forgetting that all four pumps worked for the first 2 hours.",
          traps: [
            {
              spec: { type: "number", value: 480 },
              feedback: "480 minutes (8 hours) is how long 3 pumps would take for the *whole* job. For the first 2 hours, all 4 were working.",
            },
            {
              spec: { type: "number", value: 453 },
              feedback: "{{5 1/3}} hours is 5 h 20 min, not 5 h 33 min: a third of an hour is 20 minutes.",
            },
          ],
          difficulty: "challenge",
          guideRef: "density-and-rates",
          hints: [
            "Measure the whole job in 'pump-hours'. How many does it need?",
            "4 pumps × 6 h = 24 pump-hours. How many are done in the first 2 hours?",
            "16 pump-hours are left for 3 pumps.",
          ],
          strategy: "Introduce a unit of work",
        },
      ],
    },
  ],

  // ========================== CHALLENGE PROBLEMS ===========================
  challenge: [
    {
      kind: "short",
      id: "rates-units-ch-q01",
      question:
        "A digital clock shows the time in 24-hour format, from 00:00 to 23:59. A time such as 21:12 is a **palindrome**: its four digits read the same forwards and backwards. How many palindromic times are there in one day?",
      answer: { type: "number", value: 16, display: "16" },
      solution: [
        "Once the hour 'ab' is chosen, the palindrome is fixed: the minutes must be 'ba'. So there is at most one palindrome per hour: 24 candidates.",
        "The minutes 'ba' are only allowed if they are 59 or less, so b (the second digit of the hour) must be 0, 1, 2, 3, 4 or 5.",
        "Hours 00–09: b can be 0–5, giving 6 times (00:00, 01:10, 02:20, 03:30, 04:40, 05:50).",
        "Hours 10–19: again 6 times (10:01, 11:11, 12:21, 13:31, 14:41, 15:51).",
        "Hours 20–23: b is 0–3, all allowed, giving 4 times (20:02, 21:12, 22:22, 23:32).",
        "Total: 6 + 6 + 4 = 16.",
      ],
      solutions: [
        {
          label: "Count the failures (slicker)",
          steps: [
            "Each of the 24 hours gives exactly one candidate.",
            "A candidate fails only when the hour ends in 6, 7, 8 or 9, because then the minutes would be 60 or more: 06, 07, 08, 09, 16, 17, 18, 19. That is 8 hours.",
            "24 − 8 = 16 palindromes.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 24 },
          feedback: "Each hour gives one candidate, but some aren't real times: 06:60 doesn't exist. Which hours give minutes of 60 or more?",
        },
      ],
      difficulty: "challenge",
      guideRef: "time",
      hints: [
        "If the hour is 21, what must the minutes be? Is there any choice?",
        "So each hour gives at most one palindrome. When does that candidate fail to be a real time?",
        "The minutes 'ba' must be at most 59. Which hours end in a digit that is too big?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "rates-units-ch-q02",
      question:
        "Two trains are 100 km apart on the same straight track, heading towards each other at 40 km/h and 60 km/h. A fly starts at the front of one train and flies at 90 km/h to the other train, turns round instantly, flies back to the first train, and keeps zig-zagging like this until the trains meet. How many kilometres does the fly fly altogether?",
      answer: { type: "number", value: 90, display: "90 km" },
      solution: [
        "Don't follow the fly's zig-zags. Follow the clock instead.",
        "The trains close the gap at 40 + 60 = 100 km/h, so they meet after 100 ÷ 100 = 1 hour.",
        "The fly flies non-stop for that whole hour at 90 km/h.",
        "Distance = 90 × 1 = 90 km.",
      ],
      solutions: [
        {
          label: "The hard way: add up the legs",
          steps: [
            "Leg 1 (say the fly starts on the 40 km/h train): the fly and the oncoming 60 km/h train close at 90 + 60 = 150 km/h, so the leg takes {{100/150 = 2/3}} h and the fly covers 60 km.",
            "Meanwhile the trains have closed 100 × {{2/3}} ≈ 66.7 km of the gap, leaving about 33.3 km.",
            "Leg 2: closing at 90 + 40 = 130 km/h, the fly covers about 23.1 km … and so on, with infinitely many ever-shorter legs.",
            "The legs do add up to 90 km, but summing them is hard work. Following the clock is far slicker. (Legend says the mathematician John von Neumann summed the series in his head anyway.)",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 100 },
          feedback: "100 km is the starting gap between the trains. How long is the fly in the air, and how fast does it fly?",
        },
      ],
      difficulty: "challenge",
      guideRef: "speed",
      hints: [
        "Tracking every zig-zag is a nightmare. Is there a simpler question you could answer instead?",
        "How long is the fly in the air?",
        "The trains close the gap at 40 + 60 km/h. How long until they meet?",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "rates-units-ch-q03",
      question:
        "A cuboid tank has a base 2 m by 1.5 m and contains water to a depth of 80 cm. A solid metal block measuring 50 cm by 40 cm by 30 cm is lowered into the tank until it is completely under water. By how many millimetres does the water level rise?",
      answer: { type: "number", value: 20, display: "20 mm" },
      solution: [
        "The block pushes up its own volume of water, which spreads over the whole base of the tank.",
        "Block volume = 50 × 40 × 30 = 60 000 cm³.",
        "Tank base = 200 cm × 150 cm = 30 000 cm².",
        "Rise = 60 000 ÷ 30 000 = 2 cm = 20 mm.",
        "The 80 cm depth is a red herring: it only matters that the block ends up fully under water (even standing on end, the block is only 50 cm tall, well below the new 82 cm water level).",
      ],
      solutions: [
        {
          label: "Work in metres",
          steps: [
            "Block = 0.5 × 0.4 × 0.3 = 0.06 m³. Base = 2 × 1.5 = 3 m².",
            "Rise = 0.06 ÷ 3 = 0.02 m = 2 cm = 20 mm.",
            "Same answer; working in cm avoids tiny decimals, so it is a little slicker here.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 2 }, feedback: "That's the rise in centimetres. The question asks for millimetres." },
        { spec: { type: "number", value: 0.02 }, feedback: "That's the rise in metres. Convert to millimetres: 1 m = 1000 mm." },
      ],
      difficulty: "challenge",
      guideRef: "area-volume-units",
      hints: [
        "Where does the water go when the block goes in?",
        "The water rises by a layer whose volume equals the block's volume, spread over the base of the tank.",
        "In cm: the block is 60 000 cm³ and the base is 200 × 150 cm².",
        "Rise = block volume ÷ base area. Then convert to mm.",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "rates-units-ch-q04",
      question:
        "Mei's watch runs slow: for every real hour that passes, it moves on only 55 minutes. She sets it to the correct time at 12:00. Later that day her watch shows 17:30. What is the real time? Use the 24-hour clock.",
      answer: {
        type: "text",
        accept: ["18:00", "1800", "18.00", "18:00hrs", "1800hrs", "18h00"],
        display: "18:00",
      },
      solution: [
        "Since 12:00 the watch has moved on 5 h 30 min = 330 minutes.",
        "Every 55 watch-minutes is 60 real minutes.",
        "330 ÷ 55 = 6 lots, so the real time that has passed is 6 × 60 = 360 minutes = 6 hours.",
        "Real time: 12:00 + 6 h = 18:00.",
      ],
      solutions: [
        {
          label: "Use the ratio (slicker)",
          steps: [
            "Real time : watch time = 60 : 55 = 12 : 11.",
            "Real minutes = 330 × {{12/11}} = 30 × 12 = 360 minutes.",
            "12:00 + 6 hours = 18:00.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "text", accept: ["17:57", "1757", "17.57", "17:58", "1758", "17.58", "17:57:30"] },
          feedback: "Adding 5 minutes for each hour shown on the watch undercounts: the watch loses 5 minutes per *real* hour, and more than 5.5 real hours have passed. How many real minutes match 330 watch-minutes?",
        },
        {
          spec: { type: "text", accept: ["6pm", "6:00pm", "6.00pm", "6 pm", "6:00 pm"] },
          feedback: "Right time! Now write it using the 24-hour clock.",
        },
      ],
      difficulty: "challenge",
      guideRef: "time",
      hints: [
        "How much time has the watch counted since 12:00, in minutes?",
        "Each 55 minutes on the watch is really 60 minutes.",
        "How many lots of 55 are there in 330?",
      ],
      strategy: "Use a ratio",
    },
    {
      kind: "short",
      id: "rates-units-ch-q05",
      question:
        "Two candles are the same length. The thin one burns down completely in 4 hours and the thick one in 6 hours, each at a steady rate. Both are lit at the same moment. After how many hours is one candle exactly twice as long as the other?",
      answer: { type: "number", value: 3, display: "3 hours" },
      solution: [
        "Choose a handy length that 4 and 6 both divide: say 12 cm.",
        "The thin candle burns 12 ÷ 4 = 3 cm per hour; the thick one burns 12 ÷ 6 = 2 cm per hour.",
        "After t hours: thin = 12 − 3t and thick = 12 − 2t. The thick one is always the longer one.",
        "Set thick = 2 × thin: 12 − 2t = 2(12 − 3t) = 24 − 6t.",
        "So 4t = 12 and t = 3 hours. Check: thin = 3 cm, thick = 6 cm, and 6 is twice 3.",
      ],
      solutions: [
        {
          label: "Fractions of the length",
          steps: [
            "After t hours the thin candle has {{1 - t/4}} of its length left and the thick one has {{1 - t/6}}.",
            "{{1 - t/6 = 2(1 - t/4)}} gives {{1 - t/6 = 2 - t/2}}, so {{t/2 - t/6 = 1}}, so {{t/3 = 1}}.",
            "t = 3 hours. Choosing a length of 12 cm avoids these fractions, so that way is slicker.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 12 },
          feedback: "At 12 hours both candles have long burnt out! Which candle is the longer one? Make the *thick* one twice the thin one.",
        },
      ],
      difficulty: "challenge",
      guideRef: "density-and-rates",
      hints: [
        "The length isn't given. Would choosing one help?",
        "Try 12 cm. How many cm per hour does each candle burn?",
        "Which candle is longer at any moment? Make that one twice the other.",
        "Solve 12 − 2t = 2(12 − 3t).",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "rates-units-ch-q06",
      question:
        "In a 100 m race, Hana beats Zara by exactly 10 m: when Hana crosses the finish line, Zara has run 90 m. They race again, but this time Hana starts 10 m behind the start line, so she must run 110 m. Both run at the same steady speeds as before. Is it a dead heat? If not, by how many metres does the winner win? (Type 0 for a dead heat.)",
      answer: { type: "number", value: 1, display: "1 m (Hana wins)" },
      solution: [
        "Their speeds are in the ratio 100 : 90 = 10 : 9, so Hana runs 10 m for every 9 m Zara runs.",
        "In the second race, while Hana runs her 110 m, Zara runs {{9/10}} × 110 = 99 m.",
        "So when Hana finishes, Zara is still 1 m short. Hana wins by 1 m.",
      ],
      solutions: [
        {
          label: "Freeze the race at the 90 m mark (slicker)",
          steps: [
            "Hana's first 100 m takes her from 10 m behind the start to the 90 m mark. In that time Zara also runs 90 m, exactly as in the first race.",
            "So they are level at the 90 m mark with 10 m to go, and Hana is the faster runner.",
            "While Hana runs the last 10 m, Zara runs only 9 m: Hana wins by 1 m.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 0 },
          feedback: "It isn't a dead heat. Where are the runners when Hana has run 100 m? Who is faster over the distance that's left?",
        },
      ],
      difficulty: "challenge",
      guideRef: "speed",
      hints: [
        "How far does Zara run while Hana runs 10 m?",
        "Where are the two runners when Hana has run 100 m in the second race?",
        "They are level with 10 m to go. Who is faster, and by how much over 10 m?",
      ],
      strategy: "Use a ratio",
    },
    {
      kind: "written",
      id: "rates-units-ch-q07",
      question:
        "Ethan cycles up a hill path 6 km long at 12 km/h. He then rides straight back down the same path. He wants his average speed for the whole 12 km trip to be 24 km/h. How fast must he ride down? Explain your answer fully.",
      marks: 3,
      modelAnswer:
        "Going up takes 6 ÷ 12 = 0.5 hours. To average 24 km/h over the whole 12 km, the total time must be 12 ÷ 24 = 0.5 hours. But he has already used the whole 0.5 hours on the way up, so there is **no time left** for the way down. He would have to come down in zero time, which is impossible: **no speed is fast enough**. However fast he rides down, his average stays below 24 km/h (for example, at 36 km/h down, the trip takes {{1/2 + 1/6 = 2/3}} h, an average of only 18 km/h).",
      markScheme: [
        { point: "Time for the climb: 6 ÷ 12 = 0.5 h", keywords: ["0.5", "half an hour", "30 min", "6 ÷ 12"] },
        {
          point: "Total time needed for an average of 24 km/h: 12 ÷ 24 = 0.5 h",
          keywords: ["12 ÷ 24", "total time", "0.5 hours", "0.5 h"],
        },
        {
          point: "Conclusion: no time is left for the descent, so it is impossible (no speed is fast enough)",
          keywords: ["impossible", "no time", "cannot", "can't", "zero", "no speed"],
        },
      ],
      solutions: [
        {
          label: "Try some speeds (consider extremes)",
          steps: [
            "Down at 36 km/h: {{1/6}} h, so the total is {{2/3}} h and the average is 12 ÷ {{2/3}} = 18 km/h.",
            "Down at 120 km/h: 0.05 h, so the total is 0.55 h and the average is about 21.8 km/h.",
            "Faster and faster gets closer to 24 km/h but never reaches it, because the climb alone uses up the whole time budget. Spotting the time budget directly is the slicker argument.",
          ],
        },
      ],
      commonError:
        "Answering 36 km/h because the mean of 12 and 36 is 24. Average speed is total distance ÷ total time, not the mean of the speeds.",
      difficulty: "challenge",
      guideRef: "speed",
      hints: [
        "Average speed = total distance ÷ total time. What total time would give 24 km/h?",
        "How long does the climb take?",
        "Compare the time budget with the time already used. What is left for the way down?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "rates-units-ch-q08",
      question:
        "Jun wants to write the density of gold, 19.3 g/cm³, in kg/m³. He writes: 'g → kg is ÷ 1000, and cm³ → m³ is ÷ 1 000 000, so the density is 19.3 ÷ 1000 ÷ 1 000 000 = 0.0000000193 kg/m³.' Explain the flaw in Jun's reasoning and find the correct density in kg/m³.",
      marks: 3,
      modelAnswer:
        "Jun's answer can't be right: a cubic metre of gold is a huge block, so its mass must be enormous, not a tiny fraction of a kilogram. The flaw is that the volume unit is on the **bottom** of the rate (grams **per** cm³). A cubic metre is 1 000 000 times bigger than a cubic centimetre, so it holds 1 000 000 times as much gold: for the volume you must **multiply** by 1 000 000, not divide. So 1 m³ of gold has a mass of 19.3 × 1 000 000 = 19 300 000 g = 19 300 kg, and the density is **19 300 kg/m³**. (Overall: ÷ 1000 for the mass and × 1 000 000 for the volume, which is × 1000.)",
      markScheme: [
        {
          point: "Identifies the flaw: cm³ is on the bottom of the rate (per cm³), so a bigger volume unit holds more mass: multiply by 1 000 000, don't divide",
          keywords: ["per", "bottom", "denominator", "multiply", "more mass", "bigger volume", "1 000 000 times"],
        },
        {
          point: "Mass of 1 m³ of gold = 19.3 × 1 000 000 = 19 300 000 g",
          keywords: ["19 300 000", "19300000", "19.3 million", "1 000 000 cm"],
        },
        { point: "Correct density: 19 300 kg/m³", keywords: ["19 300", "19300"] },
      ],
      solutions: [
        {
          label: "Sense check with water (slicker)",
          steps: [
            "Water is 1 g/cm³. A 1 m³ tank holds 1000 litres of water, which has a mass of 1000 kg, so water is 1000 kg/m³.",
            "So any density in g/cm³ becomes 1000 times bigger in kg/m³: 19.3 × 1000 = 19 300 kg/m³.",
          ],
        },
      ],
      commonError: "Converting each unit separately without noticing whether it is on the top or the bottom of the rate.",
      difficulty: "challenge",
      guideRef: "density-and-rates",
      hints: [
        "Think about a real cubic metre of gold. Should its mass be tiny or huge?",
        "Density is mass **per** cm³. How many cm³ fit into 1 m³?",
        "Find the mass of 1 m³ of gold in grams, then change it to kg.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "short",
      id: "rates-units-ch-q09",
      question:
        "At 3:00 the minute hand of a clock points to 12 and the hour hand points to 3. At what time between 3:00 and 4:00 are the two hands exactly on top of each other? Give your answer as the number of minutes after 3:00, as a mixed number.",
      answer: { type: "fraction", n: 180, d: 11, form: "mixed", simplest: true, display: "{{16 4/11}} minutes after 3:00" },
      solution: [
        "Speeds: the minute hand turns 360° in 60 min, which is 6° per minute. The hour hand turns 30° in 60 min, which is 0.5° per minute.",
        "At 3:00 the hour hand is 90° ahead of the minute hand.",
        "The minute hand catches up at 6 − 0.5 = 5.5° per minute (a closing speed, just like a chase).",
        "Time to catch up = 90 ÷ 5.5 = {{180/11}} = {{16 4/11}} minutes after 3:00.",
      ],
      solutions: [
        {
          label: "Count the meetings (slicker)",
          steps: [
            "In 12 hours the minute hand laps the hour hand exactly 11 times, and the meetings are equally spaced.",
            "So the hands meet every {{12/11}} hours = {{720/11}} minutes, starting at 12:00.",
            "The meetings after 12:00 come at {{720/11}}, {{1440/11}}, {{2160/11}} minutes, … and the third one is between 3:00 and 4:00.",
            "{{2160/11}} = {{196 4/11}} minutes = 3 h {{16 4/11}} min, so {{16 4/11}} minutes after 3:00.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 15 },
          feedback: "At 3:15 the minute hand points at 3, but by then the hour hand has crept a quarter of the way towards 4. The minute hand needs a little longer.",
        },
        {
          spec: { type: "number", value: 16.36, tolerance: 0.01 },
          feedback: "Very close in value, but that decimal goes on for ever. Give the exact answer as a mixed number.",
        },
      ],
      difficulty: "challenge",
      guideRef: "time",
      hints: [
        "How many degrees per minute does each hand turn?",
        "Minute hand: 6° per minute. Hour hand: 0.5° per minute. How far apart are they at 3:00?",
        "The minute hand gains 5.5° every minute. How long does it take to gain 90°?",
        "90 ÷ 5.5 is the same as 180 ÷ 11.",
      ],
      strategy: "Use relative speed",
    },
    {
      kind: "written",
      id: "rates-units-ch-q10",
      question:
        "Always, sometimes or never? 'When you convert a temperature from °C to °F, the °F number is bigger than the °C number.' Use the formula F = 1.8C + 32 to decide, and justify your answer.",
      marks: 3,
      modelAnswer:
        "**Sometimes.** It is true for everyday temperatures: for example 20 °C = 1.8 × 20 + 32 = 68 °F, and 68 is bigger than 20. But it is false for very cold temperatures: −50 °C = 1.8 × (−50) + 32 = −90 + 32 = −58 °F, and −58 is *less* than −50. The changeover is where the two numbers are equal: 1.8C + 32 = C gives 0.8C = −32, so C = −40. At −40 °C the reading is −40 °F. Above −40 the °F number is bigger; below −40 it is smaller. On a graph, the conversion line crosses the line F = C at (−40, −40).",
      markScheme: [
        {
          point: "Answers 'sometimes', with an example where it is true, e.g. 20 °C = 68 °F",
          keywords: ["sometimes", "68", "20", "true"],
        },
        {
          point: "Gives a counterexample below −40, e.g. −50 °C = −58 °F",
          keywords: ["-50", "−50", "-58", "−58", "-60", "−60", "-76", "−76", "counterexample", "smaller", "less"],
        },
        {
          point: "Finds the boundary −40 (where the °C and °F numbers are equal) and states the rule: bigger only above −40",
          keywords: ["-40", "−40", "equal", "same", "0.8c"],
        },
      ],
      solutions: [
        {
          label: "Think about the graph",
          steps: [
            "Draw the conversion line F = 1.8C + 32 and the line F = C on the same axes.",
            "The conversion line is steeper (gradient 1.8, compared with 1), so it crosses F = C exactly once, at (−40, −40).",
            "To the right of the crossing the conversion line is above F = C (°F number bigger); to the left it is below. The graph shows the whole answer at a glance.",
          ],
        },
      ],
      commonError: "Testing only one or two everyday temperatures and concluding 'always'.",
      difficulty: "challenge",
      guideRef: "conversion-graphs",
      hints: [
        "Test a few temperatures, including some very cold ones.",
        "Try −50 °C. Which number is bigger?",
        "Where does the answer switch over? Solve 1.8C + 32 = C.",
      ],
      strategy: "Consider extremes",
    },
  ],
};
