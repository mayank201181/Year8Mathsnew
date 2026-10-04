// MCQ papers for "rates-units" (Measures, Units & Rates).
// 4 papers × 20 questions. Options are shuffled at display time.
import type { Paper } from "../../types.ts";

// ------------------------------- diagrams ----------------------------------

const svgRinggit = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph from Singapore dollars to ringgit: a straight line from the origin to 100 Singapore dollars equals 350 ringgit" font-family="sans-serif"><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="114" y1="20" x2="114" y2="220"/><line x1="168" y1="20" x2="168" y2="220"/><line x1="222" y1="20" x2="222" y2="220"/><line x1="276" y1="20" x2="276" y2="220"/><line x1="330" y1="20" x2="330" y2="220"/><line x1="60" y1="180" x2="330" y2="180"/><line x1="60" y1="140" x2="330" y2="140"/><line x1="60" y1="100" x2="330" y2="100"/><line x1="60" y1="60" x2="330" y2="60"/><line x1="60" y1="20" x2="330" y2="20"/></g><line x1="60" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="20" x2="60" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="220" x2="330" y2="20" stroke="#1f2937" stroke-width="2.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="236">0</text><text x="114" y="236">20</text><text x="168" y="236">40</text><text x="222" y="236">60</text><text x="276" y="236">80</text><text x="330" y="236">100</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="224">0</text><text x="54" y="184">70</text><text x="54" y="144">140</text><text x="54" y="104">210</text><text x="54" y="64">280</text><text x="54" y="24">350</text></g><text x="195" y="260" font-size="12" fill="#1f2937" text-anchor="middle">Singapore dollars (S$)</text><text x="14" y="120" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 14 120)">Ringgit (RM)</text></svg>`;

const svgGallons = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph from gallons to litres: a straight line from the origin to 8 gallons equals 36 litres" font-family="sans-serif"><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="127.5" y1="20" x2="127.5" y2="220"/><line x1="195" y1="20" x2="195" y2="220"/><line x1="262.5" y1="20" x2="262.5" y2="220"/><line x1="330" y1="20" x2="330" y2="220"/><line x1="60" y1="170" x2="330" y2="170"/><line x1="60" y1="120" x2="330" y2="120"/><line x1="60" y1="70" x2="330" y2="70"/><line x1="60" y1="20" x2="330" y2="20"/></g><line x1="60" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="20" x2="60" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="220" x2="330" y2="20" stroke="#1f2937" stroke-width="2.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="236">0</text><text x="127.5" y="236">2</text><text x="195" y="236">4</text><text x="262.5" y="236">6</text><text x="330" y="236">8</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="224">0</text><text x="54" y="174">9</text><text x="54" y="124">18</text><text x="54" y="74">27</text><text x="54" y="24">36</text></g><text x="195" y="260" font-size="12" fill="#1f2937" text-anchor="middle">Gallons</text><text x="18" y="120" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 120)">Litres</text></svg>`;

const svgFishTank = `<svg viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cuboid fish tank 60 cm long, 30 cm wide and 40 cm high" font-family="sans-serif"><rect x="0" y="0" width="340" height="240" fill="#ffffff"/><polygon points="60,80 240,80 294,44 114,44" fill="#e0f2fe" stroke="#334155" stroke-width="2"/><polygon points="240,80 294,44 294,164 240,200" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="60" y="80" width="180" height="120" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="150" y="220" font-size="13" fill="#1f2937" text-anchor="middle">60 cm</text><text x="52" y="144" font-size="13" fill="#1f2937" text-anchor="end">40 cm</text><text x="274" y="200" font-size="13" fill="#1f2937" text-anchor="start">30 cm</text></svg>`;

const svgTaxi = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of taxi fare against distance: a straight line starting at 4 dollars for 0 km and rising to 10 dollars at 10 km" font-family="sans-serif"><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="114" y1="20" x2="114" y2="220"/><line x1="168" y1="20" x2="168" y2="220"/><line x1="222" y1="20" x2="222" y2="220"/><line x1="276" y1="20" x2="276" y2="220"/><line x1="330" y1="20" x2="330" y2="220"/><line x1="60" y1="186.7" x2="330" y2="186.7"/><line x1="60" y1="153.3" x2="330" y2="153.3"/><line x1="60" y1="120" x2="330" y2="120"/><line x1="60" y1="86.7" x2="330" y2="86.7"/><line x1="60" y1="53.3" x2="330" y2="53.3"/><line x1="60" y1="20" x2="330" y2="20"/></g><line x1="60" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="20" x2="60" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="153.3" x2="330" y2="53.3" stroke="#1f2937" stroke-width="2.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="236">0</text><text x="114" y="236">2</text><text x="168" y="236">4</text><text x="222" y="236">6</text><text x="276" y="236">8</text><text x="330" y="236">10</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="224">0</text><text x="54" y="190.7">2</text><text x="54" y="157.3">4</text><text x="54" y="124">6</text><text x="54" y="90.7">8</text><text x="54" y="57.3">10</text><text x="54" y="24">12</text></g><text x="195" y="260" font-size="12" fill="#1f2937" text-anchor="middle">Distance (km)</text><text x="18" y="120" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 120)">Fare ($)</text></svg>`;

const svgBrick = `<svg viewBox="0 0 330 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A brick measuring 20 cm by 10 cm by 5 cm" font-family="sans-serif"><rect x="0" y="0" width="330" height="200" fill="#ffffff"/><polygon points="40,110 240,110 290,75 90,75" fill="#fde68a" stroke="#334155" stroke-width="2"/><polygon points="240,110 290,75 290,125 240,160" fill="#fecaca" stroke="#334155" stroke-width="2"/><rect x="40" y="110" width="200" height="50" fill="#fecaca" stroke="#334155" stroke-width="2"/><text x="140" y="180" font-size="13" fill="#1f2937" text-anchor="middle">20 cm</text><text x="32" y="140" font-size="13" fill="#1f2937" text-anchor="end">5 cm</text><text x="272" y="158" font-size="13" fill="#1f2937" text-anchor="start">10 cm</text></svg>`;

const svgCyclists = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance-time graph. Line A goes from 0 km at 0 hours to 45 km at 3 hours. Dashed line B goes from 10 km at 0 hours to 40 km at 3 hours. They cross at 2 hours, 30 km." font-family="sans-serif"><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="150" y1="20" x2="150" y2="220"/><line x1="240" y1="20" x2="240" y2="220"/><line x1="330" y1="20" x2="330" y2="220"/><line x1="60" y1="180" x2="330" y2="180"/><line x1="60" y1="140" x2="330" y2="140"/><line x1="60" y1="100" x2="330" y2="100"/><line x1="60" y1="60" x2="330" y2="60"/><line x1="60" y1="20" x2="330" y2="20"/></g><line x1="60" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="20" x2="60" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="220" x2="330" y2="40" stroke="#1f2937" stroke-width="2.5"/><line x1="60" y1="180" x2="330" y2="60" stroke="#334155" stroke-width="2.5" stroke-dasharray="7 5"/><text x="336" y="44" font-size="13" font-weight="bold" fill="#1f2937">A</text><text x="336" y="64" font-size="13" font-weight="bold" fill="#334155">B</text><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="236">0</text><text x="150" y="236">1</text><text x="240" y="236">2</text><text x="330" y="236">3</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="224">0</text><text x="54" y="184">10</text><text x="54" y="144">20</text><text x="54" y="104">30</text><text x="54" y="64">40</text><text x="54" y="24">50</text></g><text x="195" y="260" font-size="12" fill="#1f2937" text-anchor="middle">Time (hours)</text><text x="16" y="120" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 120)">Distance from start (km)</text></svg>`;

const svgMiles = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph from miles to kilometres: a straight line from the origin to 50 miles equals 80 km" font-family="sans-serif"><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="87" y1="20" x2="87" y2="220"/><line x1="114" y1="20" x2="114" y2="220"/><line x1="141" y1="20" x2="141" y2="220"/><line x1="168" y1="20" x2="168" y2="220"/><line x1="195" y1="20" x2="195" y2="220"/><line x1="222" y1="20" x2="222" y2="220"/><line x1="249" y1="20" x2="249" y2="220"/><line x1="276" y1="20" x2="276" y2="220"/><line x1="303" y1="20" x2="303" y2="220"/><line x1="330" y1="20" x2="330" y2="220"/><line x1="60" y1="195" x2="330" y2="195"/><line x1="60" y1="170" x2="330" y2="170"/><line x1="60" y1="145" x2="330" y2="145"/><line x1="60" y1="120" x2="330" y2="120"/><line x1="60" y1="95" x2="330" y2="95"/><line x1="60" y1="70" x2="330" y2="70"/><line x1="60" y1="45" x2="330" y2="45"/><line x1="60" y1="20" x2="330" y2="20"/></g><line x1="60" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="20" x2="60" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="220" x2="330" y2="20" stroke="#1f2937" stroke-width="2.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="236">0</text><text x="114" y="236">10</text><text x="168" y="236">20</text><text x="222" y="236">30</text><text x="276" y="236">40</text><text x="330" y="236">50</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="224">0</text><text x="54" y="174">20</text><text x="54" y="124">40</text><text x="54" y="74">60</text><text x="54" y="24">80</text></g><text x="195" y="260" font-size="12" fill="#1f2937" text-anchor="middle">Miles</text><text x="18" y="120" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 120)">Kilometres</text></svg>`;

const svgPetrol = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of the cost of petrol: a straight line from the origin to 50 litres costing 150 dollars" font-family="sans-serif"><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="114" y1="20" x2="114" y2="220"/><line x1="168" y1="20" x2="168" y2="220"/><line x1="222" y1="20" x2="222" y2="220"/><line x1="276" y1="20" x2="276" y2="220"/><line x1="330" y1="20" x2="330" y2="220"/><line x1="60" y1="180" x2="330" y2="180"/><line x1="60" y1="140" x2="330" y2="140"/><line x1="60" y1="100" x2="330" y2="100"/><line x1="60" y1="60" x2="330" y2="60"/><line x1="60" y1="20" x2="330" y2="20"/></g><line x1="60" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="20" x2="60" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="220" x2="330" y2="20" stroke="#1f2937" stroke-width="2.5"/><g font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="236">0</text><text x="114" y="236">10</text><text x="168" y="236">20</text><text x="222" y="236">30</text><text x="276" y="236">40</text><text x="330" y="236">50</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="224">0</text><text x="54" y="184">30</text><text x="54" y="144">60</text><text x="54" y="104">90</text><text x="54" y="64">120</text><text x="54" y="24">150</text></g><text x="195" y="260" font-size="12" fill="#1f2937" text-anchor="middle">Petrol (litres)</text><text x="16" y="120" font-size="12" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 120)">Cost ($)</text></svg>`;

// -------------------------------- papers -----------------------------------

export const mcqPapers: Paper[] = [
  // ======================================================================
  // MCQ PAPER 1
  // ======================================================================
  {
    id: "rates-units-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "rates-units-m1-q01",
        question: "How many millimetres are there in 4.5 cm?",
        options: ["45 mm", "450 mm", "0.45 mm", "4500 mm"],
        answerIndex: 0,
        explanation:
          "1 cm = 10 mm, so 4.5 cm = 4.5 × 10 = 45 mm. 450 mm comes from multiplying by 100 — that is the factor for metres to centimetres, not centimetres to millimetres. Millimetres are smaller, so you need more of them, but only 10 times more.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["How many millimetres make 1 centimetre? Look at the marks on a ruler."],
        strategy: "Use the conversion factor",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q02",
        question: "Write 7:45 pm using the 24-hour clock.",
        options: ["07:45", "17:45", "19:45", "21:45"],
        answerIndex: 2,
        explanation:
          "For afternoon and evening times, add 12 to the hour: 7 + 12 = 19, so 7:45 pm is 19:45. 07:45 is 7:45 **am**, in the morning. 17:45 comes from thinking 'seven pm' sounds like 'seventeen' — but 17:45 is 5:45 pm.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["Midday is 12:00. How many hours after midday is 7 pm?"],
        strategy: "Count on from midday",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q03",
        question: "Use 5 miles ≈ 8 km. About how many kilometres is 20 miles?",
        options: ["12.5 km", "32 km", "23 km", "160 km"],
        answerIndex: 1,
        explanation:
          "20 miles is 4 lots of 5 miles, so it is about 4 lots of 8 km: 4 × 8 = 32 km. 23 km comes from *adding* 3 (because 5 + 3 = 8) — conversions multiply, they don't add. 12.5 km goes the wrong way: a kilometre is shorter than a mile, so you need *more* kilometres than miles.",
        difficulty: "warmup",
        guideRef: "imperial-units",
        hints: ["How many lots of 5 miles are in 20 miles?"],
        strategy: "Scale up from a known pair",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q04",
        question: "A cyclist rides 36 km in 3 hours at a steady speed. What is her speed?",
        options: ["108 km/h", "33 km/h", "0.083 km/h", "12 km/h"],
        answerIndex: 3,
        explanation:
          "Speed = distance ÷ time = 36 ÷ 3 = 12 km/h — she covers 12 km in each hour. 108 km/h multiplies distance by time instead of dividing. 0.083 km/h is 3 ÷ 36, the division done upside down (hours per km).",
        difficulty: "warmup",
        guideRef: "speed",
        hints: ["How far does she ride in **one** hour?"],
        strategy: "Find one unit first",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q05",
        question: "A 2 kg bag of rice costs $5.60. What is the price per kilogram?",
        options: ["$2.80", "$11.20", "$0.36", "$3.60"],
        answerIndex: 0,
        explanation:
          "Price per kg = cost ÷ mass = 5.60 ÷ 2 = $2.80. $11.20 multiplies instead of dividing — that would be the price of 4 kg. $0.36 is 2 ÷ 5.60, which is kilograms per dollar: the rate upside down.",
        difficulty: "warmup",
        guideRef: "density-and-rates",
        hints: ["'Per kilogram' means 'for one kilogram'. What should you divide by?"],
        strategy: "Find one unit first",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q06",
        question: "Which is the most sensible estimate for the amount of tea a drinking mug holds?",
        options: ["25 ml", "250 ml", "2.5 litres", "250 litres"],
        answerIndex: 1,
        explanation:
          "A mug holds roughly a quarter of a litre: {{1/4}} of 1000 ml = 250 ml. 250 litres has the right number but the wrong unit — that is about a whole bathtub full. 25 ml is under two tablespoons, and 2.5 litres is more than a big bottle of water.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Picture a 1-litre carton of milk. Would it fill one mug, or several?",
          "A 1-litre carton fills about 4 mugs. What is 1000 ml ÷ 4?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q07",
        question: "Put these masses in order, lightest first:\n\n0.6 kg · 450 g · 5000 mg · 0.05 kg",
        options: [
          "0.05 kg, 0.6 kg, 450 g, 5000 mg",
          "0.05 kg, 450 g, 5000 mg, 0.6 kg",
          "5000 mg, 450 g, 0.05 kg, 0.6 kg",
          "5000 mg, 0.05 kg, 450 g, 0.6 kg",
        ],
        answerIndex: 3,
        explanation:
          "Change everything to grams: 0.6 kg = 600 g, 5000 mg = 5 g (1 g = 1000 mg) and 0.05 kg = 50 g. So the order is 5 g, 50 g, 450 g, 600 g. The order 0.05 kg, 0.6 kg, 450 g, 5000 mg sorts the bare numbers and ignores the units. Placing 5000 mg just before 0.6 kg treats it as 500 g, using 1 g = 10 mg — but a milligram is a *thousandth* of a gram.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "You can't compare 0.6 with 450 until they are in the same unit.",
          "Change all four into grams: kg → g is × 1000, mg → g is ÷ 1000.",
          "You should get 600 g, 450 g, 5 g and 50 g.",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q08",
        question: "A square with sides of 1 m is completely covered with small squares of side 1 cm. How many small squares are needed?",
        options: ["10,000", "100", "400", "1000"],
        answerIndex: 0,
        explanation:
          "Each side is 100 cm, so there are 100 rows of 100 small squares: 100 × 100 = 10,000. That is why 1 m² = 10,000 cm². 100 is the classic slip: it converts the *length* (1 m = 100 cm) but forgets that area has two dimensions. 400 comes from 4 sides × 100 — that measures around the edge, not the space inside.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "How many 1 cm squares fit along one side?",
          "There are 100 along the bottom. How many rows like that are there?",
          "Number of rows × squares in each row.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q09",
        question: "A juice carton is a cuboid measuring 6 cm by 5 cm by 20 cm. How much juice can it hold, in millilitres?",
        options: ["0.6 ml", "6000 ml", "600 ml", "31 ml"],
        answerIndex: 2,
        explanation:
          "Volume = 6 × 5 × 20 = 600 cm³, and 1 cm³ = 1 ml, so the carton holds 600 ml. 0.6 ml divides by 1000 — that would change millilitres into *litres* (600 ml = 0.6 litres). 31 ml adds the three lengths instead of multiplying them.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Find the volume in cm³ first.",
          "Volume of a cuboid = length × width × height.",
          "How many millilitres fit in 1 cm³?",
        ],
        strategy: "Calculate, then convert",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q10",
        question: "Siti runs a 10 km race. Using 1 mile ≈ 1.6 km, about how many miles does she run?",
        options: ["16 miles", "6.25 miles", "8.4 miles", "0.16 miles"],
        answerIndex: 1,
        explanation:
          "A mile is longer than a kilometre, so the number of miles must be *smaller* than 10. Miles = 10 ÷ 1.6 = 6.25 miles. 16 miles multiplies by 1.6, which goes the wrong way. 8.4 miles subtracts 1.6 — conversions multiply or divide; they never add or subtract.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "Is a mile longer or shorter than a kilometre? So should the answer be more or less than 10?",
          "How many 1.6 km chunks fit into 10 km?",
          "Work out 10 ÷ 1.6.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q11",
        question: "A bus leaves at 10:47 and arrives at 13:15. How long is the journey?",
        options: ["2 h 68 min", "3 h 28 min", "3 h 32 min", "2 h 28 min"],
        answerIndex: 3,
        explanation:
          "Count on: 10:47 → 11:00 is 13 min, 11:00 → 13:00 is 2 h, 13:00 → 13:15 is 15 min. Total: 2 h 28 min. 2 h 68 min comes from 13.15 − 10.47 = 2.68, which treats minutes like hundredths — but an hour has 60 minutes, not 100. 3 h 28 min counts 10 → 13 as three whole hours and then adds the 13 and 15 minutes as well.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "Times don't subtract like decimals. Try counting on from 10:47 instead.",
          "How long is it from 10:47 to the next whole hour?",
          "10:47 → 11:00 → 13:00 → 13:15. Add up the three pieces.",
        ],
        strategy: "Count on using a time line",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q12",
        question: "Hana practises the piano for 1.2 hours. How long is that in hours and minutes?",
        options: ["1 h 20 min", "1 h 12 min", "1 h 2 min", "1 h 5 min"],
        answerIndex: 1,
        explanation:
          "0.2 of an hour = 0.2 × 60 = 12 minutes, so 1.2 h = 1 h 12 min. 1 h 20 min reads the decimal digits as minutes, but 0.2 h means two-tenths of 60 minutes. (1 h 20 min is actually {{1 1/3}} hours, about 1.33 h.)",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "What is 0.1 of an hour in minutes?",
          "0.1 h = 6 min. So what is 0.2 h?",
        ],
        strategy: "Convert the decimal part",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q13",
        question: "A train travels at a steady 90 km/h for 40 minutes. How far does it go?",
        options: ["3600 km", "36 km", "60 km", "2.25 km"],
        answerIndex: 2,
        explanation:
          "40 minutes = {{40/60}} = {{2/3}} of an hour. Distance = speed × time = 90 × {{2/3}} = 60 km. 36 km treats 40 minutes as 0.4 hours — but 0.4 h is only 24 minutes. 3600 km multiplies 90 by 40 without changing the minutes into hours.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "The speed is per **hour**, so the time must be in hours too.",
          "40 minutes is what fraction of an hour?",
          "Find {{2/3}} of 90 km.",
        ],
        strategy: "Make the units match",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q14",
        question: "Ravi converts 72 km/h into metres per second. He writes:\n\n    72 × 3.6 = 259.2 m/s\n\nWhat was his mistake?",
        options: [
          "He multiplied by 3.6 instead of dividing — it should be 20 m/s",
          "Nothing — 259.2 m/s is correct",
          "He should have divided by 60 — it should be 1.2 m/s",
          "He should have multiplied by 1000 — it should be 72,000 m/s",
        ],
        answerIndex: 0,
        explanation:
          "72 km/h means 72,000 m every 3600 s, so 72,000 ÷ 3600 = 20 m/s. To go from km/h to m/s you *divide* by 3.6. Sense check: 259.2 m/s is over 900 km/h — about the speed of a jet airliner. 1.2 is the speed in kilometres per *minute*: dividing by 60 changes the hours but leaves the kilometres unchanged.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Is a car at 72 km/h really doing hundreds of metres every second?",
          "Write 72 km/h as metres in one hour, then share by the seconds in one hour.",
          "72,000 m ÷ 3600 s.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q15",
        question: "Which muesli is better value?\n\n- Small pack: 400 g for $3.20\n- Large pack: 750 g for $5.70",
        options: [
          "The small pack — $3.20 is less than $5.70",
          "The small pack — it costs $0.80 per 100 g, which is more",
          "The large pack — it costs $0.76 per 100 g",
          "They are exactly the same value",
        ],
        answerIndex: 2,
        explanation:
          "Compare the price of the same amount. Small: 3.20 ÷ 4 = $0.80 per 100 g. Large: 5.70 ÷ 7.5 = $0.76 per 100 g. The large pack is cheaper per 100 g, so it is better value. 'The small pack because $3.20 is less' compares total prices and ignores that you get much less muesli. A *higher* price per 100 g means *worse* value, so $0.80 per 100 g is no reason to choose the small pack.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "The packs are different sizes, so compare the price of the same amount of muesli.",
          "Find the price of 100 g for each pack.",
          "Small: 3.20 ÷ 4. Large: 5.70 ÷ 7.5.",
        ],
        strategy: "Compare unit rates",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q16",
        question:
          "The graph converts Singapore dollars (S$) into Malaysian ringgit (RM). Mei changes S$250 into ringgit. Use the graph to find how many ringgit she gets.",
        diagram: svgRinggit,
        options: ["RM 350", "RM 500", "RM 71.43", "RM 875"],
        answerIndex: 3,
        explanation:
          "The graph is a straight line through the origin, so ringgit are proportional to dollars. From the graph, S$100 = RM 350, so S$250 = 2.5 × 350 = RM 875. RM 350 just reads the end of the graph and stops. RM 500 adds the extra S$150 straight on to RM 350 — but each extra dollar is worth RM 3.50, not RM 1. RM 71.43 divides 250 by 3.5, converting the wrong way.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "The graph stops at S$100. Can you use a reading you *can* see?",
          "Read off S$100. How many lots of S$100 make S$250?",
          "S$100 → RM 350, so S$250 → 2.5 × 350.",
        ],
        strategy: "Scale up from a known pair",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q17",
        question:
          "Marcus cycles 12 km to East Coast Park at 24 km/h. He cycles the same 12 km home at 12 km/h. What is his average speed for the whole trip?",
        options: ["18 km/h", "16 km/h", "8 km/h", "36 km/h"],
        answerIndex: 1,
        explanation:
          "Average speed = total distance ÷ total time. Out: 12 ÷ 24 = 0.5 h. Back: 12 ÷ 12 = 1 h. He rides 24 km in 1.5 h, so 24 ÷ 1.5 = 16 km/h. 18 km/h is the mean of the two speeds — but he spends twice as long at the slow speed, so the average is pulled towards 12. 8 km/h divides the one-way distance (12 km) by the total time.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Is the answer simply halfway between 24 and 12? Which speed does he ride at for longer?",
          "Find the time for each half of the trip.",
          "Total distance 24 km; total time 0.5 h + 1 h.",
        ],
        strategy: "Split into stages",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q18",
        question:
          "A rectangular patio is 4 m by 2.5 m. Priya will cover it with square tiles of side 50 cm. Tiles are sold in boxes of 12. How many boxes must she buy?",
        options: ["3 boxes", "2 boxes", "1 box", "4 boxes"],
        answerIndex: 3,
        explanation:
          "Two 50 cm tiles fit along each metre, so the patio is 8 tiles by 5 tiles = 40 tiles. 40 ÷ 12 = 3.33…, and 3 boxes hold only 36 tiles, so she needs 4 boxes. 3 boxes rounds down and leaves part of the patio bare. 2 boxes comes from 10 m² ÷ 0.5 m = 20 tiles — dividing an area by a length. (Check with areas: 10 m² = 100,000 cm², each tile is 2500 cm², and 100,000 ÷ 2500 = 40.)",
        difficulty: "challenge",
        guideRef: "area-volume-units",
        hints: [
          "Instead of converting areas, count how many tiles fit along each side.",
          "How many 50 cm tiles fit along 4 m? Along 2.5 m?",
          "8 × 5 = 40 tiles. Now think carefully about the boxes — can you buy part of a box?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q19",
        question:
          "A 'gold' crown has a mass of 1930 g and a volume of 150 cm³. Pure gold has a density of 19.3 g/cm³. Which statement is true?",
        options: [
          "It is not pure gold — its density is only about 12.9 g/cm³",
          "It is pure gold — its mass is exactly 100 × 19.3 g",
          "It is denser than gold — 150 cm³ of gold would be 2895 g, which is more than 1930 g",
          "You can't tell without knowing the crown's shape",
        ],
        answerIndex: 0,
        explanation:
          "Density = mass ÷ volume = 1930 ÷ 150 ≈ 12.9 g/cm³, well below 19.3 g/cm³, so a lighter metal has been mixed in. Another route: 1930 g of pure gold would fill only 1930 ÷ 19.3 = 100 cm³, not 150 cm³. 'Mass is 100 × 19.3' says nothing about the material — anything can have a mass of 1930 g. The 2895 g calculation is right, but it shows the crown is *lighter* than the same volume of gold, so it is less dense, not more. Shape doesn't matter: density depends only on the material. (Archimedes is said to have solved exactly this puzzle.)",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "Density tells you what something is made of. What is the crown's density?",
          "Divide the crown's mass by its volume.",
          "Compare 1930 ÷ 150 with 19.3.",
        ],
        strategy: "Compare unit rates",
      },
      {
        kind: "mcq",
        id: "rates-units-m1-q20",
        question:
          "A brick measuring 20 cm × 10 cm × 5 cm has a weight of 20 N. It can rest on any of its faces. What is the **greatest** pressure it can exert on the ground? (Pressure = force ÷ area.)",
        diagram: svgBrick,
        options: ["0.1 N/cm²", "2.5 N/cm²", "0.4 N/cm²", "0.2 N/cm²"],
        answerIndex: 2,
        explanation:
          "The force is always 20 N, so the pressure is greatest when the area is smallest. The faces are 20 × 10 = 200 cm², 20 × 5 = 100 cm² and 10 × 5 = 50 cm². On the smallest face: 20 ÷ 50 = 0.4 N/cm². 0.1 N/cm² uses the largest face — that is the *least* pressure. 2.5 N/cm² is 50 ÷ 20, the area divided by the force: upside down.",
        difficulty: "challenge",
        guideRef: "pressure",
        hints: [
          "The weight stays the same whichever face it sits on. What must change to make the pressure biggest?",
          "Work out the area of each of the three different faces.",
          "Divide 20 N by the smallest area.",
        ],
        strategy: "Consider extremes",
      },
    ],
  },
  // ======================================================================
  // MCQ PAPER 2
  // ======================================================================
  {
    id: "rates-units-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "rates-units-m2-q01",
        question: "Which of these cubes holds exactly 1 litre of water?",
        options: [
          "A cube with edges of 1 cm",
          "A cube with edges of 100 cm",
          "A cube with edges of 1000 cm",
          "A cube with edges of 10 cm",
        ],
        answerIndex: 3,
        explanation:
          "A 10 cm cube has volume 10 × 10 × 10 = 1000 cm³, and 1000 cm³ = 1 litre. A 1 cm cube holds just 1 cm³ = 1 ml. Edges of 1000 cm mix up the *volume* (1000 cm³) with the edge length — that cube would hold a million litres. A 100 cm cube is 1 m³ = 1000 litres.",
        difficulty: "warmup",
        guideRef: "area-volume-units",
        hints: ["Work out each volume: edge × edge × edge. Which one comes to 1000 cm³?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q02",
        question: "Convert 0.35 kg into grams.",
        options: ["35 g", "350 g", "3.5 g", "3500 g"],
        answerIndex: 1,
        explanation:
          "1 kg = 1000 g, so 0.35 kg = 0.35 × 1000 = 350 g. 35 g multiplies by 100, which is the factor for metres to centimetres, not kilograms to grams. 3500 g is 3.5 kg — ten times too much.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["How many grams are in 1 kg? 'Kilo' means…?"],
        strategy: "Use the conversion factor",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q03",
        question: "A film lasts 2 hours 15 minutes. How many minutes is that?",
        options: ["135 min", "215 min", "225 min", "75 min"],
        answerIndex: 0,
        explanation:
          "2 hours = 2 × 60 = 120 minutes, plus 15 minutes = 135 minutes. 215 min writes the 2 and the 15 side by side, as if an hour had 100 minutes. 225 min comes from 2.25 × 100 — also treating an hour as 100 minutes.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["How many minutes are in each hour? You have two whole hours, then 15 minutes more."],
        strategy: "Use the conversion factor",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q04",
        question: "Use the conversion graph to change 6 gallons into litres.",
        diagram: svgGallons,
        options: ["About 1.3 litres", "3 litres", "27 litres", "36 litres"],
        answerIndex: 2,
        explanation:
          "Find 6 on the gallons (horizontal) axis, go up to the line, then across to the litres axis: 27 litres. About 1.3 litres comes from finding 6 on the *litres* axis instead — that converts 6 litres into gallons. 3 litres counts grid squares instead of reading the scale.",
        difficulty: "warmup",
        guideRef: "conversion-graphs",
        hints: ["Start on the axis labelled 'Gallons', go up to the line, then across."],
        strategy: "Read the scale carefully",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q05",
        question: "Jun walks at a steady 5 km/h for 3 hours. How far does he walk?",
        options: ["8 km", "15 km", "1.67 km", "0.6 km"],
        answerIndex: 1,
        explanation:
          "5 km/h means 5 km in every hour, so in 3 hours he walks 5 × 3 = 15 km (distance = speed × time). 8 km adds the speed and the time. 1.67 km divides 5 by 3 instead of multiplying.",
        difficulty: "warmup",
        guideRef: "speed",
        hints: ["5 km in the first hour, 5 km in the second hour…"],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q06",
        question: "Which length is the odd one out?",
        options: ["25,000 mm", "2.5 km", "2500 m", "250,000 cm"],
        answerIndex: 0,
        explanation:
          "2.5 km = 2500 m (× 1000) = 250,000 cm (× 100), so those three are equal. 25,000 mm is only 25 m (÷ 1000); 2500 m would be 2,500,000 mm. If 250,000 cm looked like the odd one out, you may have changed metres to centimetres by multiplying by 1000 — it is × 100.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Change all four lengths into metres.",
          "km → m is × 1000; cm → m is ÷ 100; mm → m is ÷ 1000.",
          "Which one does not come to 2500 m?",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q07",
        question: "Using 1 mile ≈ 1.6 km, which of these distances is the longest?",
        options: ["3 miles", "4900 m", "5.2 km", "3.1 miles"],
        answerIndex: 2,
        explanation:
          "Put everything in kilometres: 3 miles ≈ 4.8 km, 3.1 miles ≈ 4.96 km, 4900 m = 4.9 km. So 5.2 km is the longest. 4900 m has the biggest number, but metres are small units. 3.1 miles is close, but at about 4.96 km it is still just short of 5.2 km.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "You can only compare once all four are in the same unit. Try kilometres.",
          "3 miles ≈ 3 × 1.6 km; 4900 m = ? km.",
          "Compare 4.8, 4.9, 4.96 and 5.2.",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q08",
        question:
          "Zara says: \"The noticeboard has an area of 2.5 m². That's 250 cm².\" What is the correct area in cm², and what went wrong?",
        options: [
          "250 cm² — she is right, because 1 m = 100 cm",
          "2500 cm² — she should have multiplied by 1000",
          "0.025 cm² — she should have divided by 100",
          "25,000 cm² — 1 m² is 10,000 cm², not 100 cm²",
        ],
        answerIndex: 3,
        explanation:
          "A square metre is 100 cm by 100 cm, so 1 m² = 100 × 100 = 10,000 cm². Then 2.5 m² = 2.5 × 10,000 = 25,000 cm². Zara used the *length* factor 100; area has two dimensions, so you multiply by 100 twice. 2500 cm² uses × 1000, which is also a length factor (km to m), not an area one.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Sketch 1 m² as a square. How long is each side in cm?",
          "What is 100 cm × 100 cm?",
          "Multiply 2.5 by that number.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q09",
        question: "A fish tank is a cuboid 60 cm long, 30 cm wide and 40 cm high. How many litres of water does it hold when full?",
        diagram: svgFishTank,
        options: ["720 litres", "72 litres", "7.2 litres", "72,000 litres"],
        answerIndex: 1,
        explanation:
          "Volume = 60 × 30 × 40 = 72,000 cm³. Since 1000 cm³ = 1 litre, the tank holds 72,000 ÷ 1000 = 72 litres. 72,000 litres forgets to convert — 72,000 is the number of cm³ (millilitres). 720 litres divides by 100 instead of 1000.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Find the volume in cm³ first.",
          "Length × width × height = ? cm³.",
          "How many cm³ make 1 litre?",
        ],
        strategy: "Calculate, then convert",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q10",
        question:
          "Ethan's overnight coach leaves Singapore at 22:50 and arrives in Kuala Lumpur at 04:35 the next morning. How long is the journey?",
        options: ["5 h 45 min", "18 h 15 min", "6 h 45 min", "4 h 45 min"],
        answerIndex: 0,
        explanation:
          "Count on: 22:50 → 23:00 is 10 min, 23:00 → 04:00 is 5 h (1 h to midnight, then 4 h more), 04:00 → 04:35 is 35 min. Total: 5 h 45 min. 18 h 15 min is the time from 04:35 to 22:50 — the subtraction done the wrong way round. 6 h 45 min counts 22:00 → 04:00 as six hours *and* adds the 10 minutes, so those 10 minutes are counted twice.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "When a journey crosses midnight, count on in chunks rather than subtracting.",
          "22:50 → 23:00 → midnight → 04:00 → 04:35.",
          "Add 10 min + 1 h + 4 h + 35 min.",
        ],
        strategy: "Count on using a time line",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q11",
        question: "A plane flies 2100 km in 2 hours 20 minutes. What is its average speed?",
        options: ["913 km/h", "1050 km/h", "4900 km/h", "900 km/h"],
        answerIndex: 3,
        explanation:
          "20 minutes is a third of an hour, so the time is {{2 1/3}} = {{7/3}} hours. Speed = 2100 ÷ {{7/3}} = 2100 × {{3/7}} = 900 km/h. (Or: 2100 km in 140 minutes is 15 km per minute, and 15 × 60 = 900 km/h.) 913 km/h comes from typing 2 h 20 min as 2.3 h, but 20 minutes is 0.333… h, not 0.3 h. 1050 km/h ignores the 20 minutes.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Speed = distance ÷ time — but first the time must be in hours.",
          "20 minutes is what fraction of an hour? (It is not 0.2 or 0.3.)",
          "Or find the distance per minute (2100 ÷ 140) and multiply by 60.",
        ],
        strategy: "Make the units match",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q12",
        question:
          "In his 100 m world record, Usain Bolt's average speed was about 10.4 m/s. What is that in km/h, to the nearest whole number?",
        options: ["3 km/h", "624 km/h", "37 km/h", "10 km/h"],
        answerIndex: 2,
        explanation:
          "In one hour (3600 s) he would cover 10.4 × 3600 = 37,440 m = 37.44 km, so about 37 km/h. Shortcut: m/s × 3.6 = km/h. 3 km/h divides by 3.6 instead — a slow walk, far too slow for a sprinter. 624 is 10.4 × 60, which is metres per *minute*, not kilometres per hour.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "How many metres would he run in one hour at this speed?",
          "There are 3600 seconds in an hour: 10.4 × 3600 metres.",
          "Now change those metres into kilometres.",
        ],
        strategy: "Convert one unit at a time",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q13",
        question: "Olive oil has a density of 0.92 g/cm³. What is the mass of 500 cm³ of olive oil?",
        options: ["460 g", "543 g", "500 g", "0.0018 g"],
        answerIndex: 0,
        explanation:
          "A density of 0.92 g/cm³ means each cm³ has a mass of 0.92 g, so 500 cm³ has a mass of 500 × 0.92 = 460 g. 543 g comes from 500 ÷ 0.92 — dividing by the density gives a volume, not a mass. 500 g assumes every cm³ weighs 1 g, which is only true for water; oil is less dense (that's why it floats on water).",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "What is the mass of **one** cm³ of oil?",
          "You have 500 of those cm³.",
          "Work out 500 × 0.92.",
        ],
        strategy: "Find one unit first",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q14",
        question:
          "A paddling pool holds 0.6 m³ of water. A hose fills it at 15 litres per minute. How long does it take to fill the pool?",
        options: ["4 min", "40 min", "0.04 min", "9 min"],
        answerIndex: 1,
        explanation:
          "1 m³ = 1000 litres, so 0.6 m³ = 600 litres. Time = 600 ÷ 15 = 40 minutes. 4 min uses 1 m³ = 100 litres, which forgets that volume has three dimensions (100 × 100 × 100 cm³). 0.04 min divides 0.6 by 15 without converting m³ into litres.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "The rate is in litres, but the pool is in m³. Make them match.",
          "1 m³ = 1000 litres (a 100 cm cube holds 1,000,000 cm³).",
          "How many lots of 15 litres are in 600 litres?",
        ],
        strategy: "Make the units match",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q15",
        question: "The graph shows the fare for a taxi ride. Which statement is true?",
        diagram: svgTaxi,
        options: [
          "The fare is proportional to the distance, because the graph is a straight line",
          "A 10 km ride costs twice as much as a 5 km ride",
          "Each extra kilometre costs $1",
          "The fare is not proportional to the distance, because the line does not pass through (0, 0)",
        ],
        answerIndex: 3,
        explanation:
          "For direct proportion the graph must be a straight line **and** pass through the origin. This line starts at $4 (a fixed flag-down charge), so the fare is not proportional. Check: 5 km costs $7 but 10 km costs $10, not $14. Being a straight line is not enough on its own. '$1 per km' divides $10 by 10 km, but $4 of that $10 is the fixed charge: the real rate is (10 − 4) ÷ 10 = $0.60 per km.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "What two things must a graph show for direct proportion?",
          "Where does the line meet the fare axis? What would a 0 km ride cost?",
          "Read the fares for 5 km and for 10 km. Is one double the other?",
        ],
        strategy: "Test a claim with numbers",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q16",
        question:
          "A box has a weight of 600 N. It rests on the floor on a face with an area of 2 m². What pressure does it exert on the floor?",
        options: ["1200 N/m²", "600 N/m²", "300 N/m²", "0.0033 N/m²"],
        answerIndex: 2,
        explanation:
          "Pressure = force ÷ area = 600 ÷ 2 = 300 N/m² — each square metre carries 300 N. 1200 N/m² multiplies by the area, but spreading a weight over *more* area should *lower* the pressure. 600 N/m² treats pressure as just the weight and ignores the area.",
        difficulty: "core",
        guideRef: "pressure",
        hints: [
          "Pressure is the force on each **one** square metre.",
          "Share 600 N equally between 2 square metres.",
        ],
        strategy: "Find one unit first",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q17",
        question:
          "A flight leaves Singapore at 23:30 Singapore time and lands in London at 06:15 London time the next morning. London is 7 hours behind Singapore. How long is the flight?",
        options: ["13 h 45 min", "6 h 45 min", "23 h 45 min", "13 h 15 min"],
        answerIndex: 0,
        explanation:
          "Put both times in the same time zone. When it is 23:30 in Singapore it is 16:30 in London (7 hours earlier). From 16:30 to 06:15 the next day is 7 h 30 min to midnight plus 6 h 15 min = 13 h 45 min. 6 h 45 min ignores the time difference. 23 h 45 min moves the departure time the wrong way — adding 7 hours instead of subtracting them.",
        difficulty: "challenge",
        guideRef: "time",
        hints: [
          "The two clock times are in different time zones, so you can't subtract them directly.",
          "What time is it in London when the plane leaves Singapore at 23:30?",
          "23:30 − 7 h = 16:30 London time. Now count on to 06:15.",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q18",
        question:
          "Ravi leaves home at 09:00, walking at 5 km/h. Priya leaves the same place at 09:30 and follows the same path, cycling at 15 km/h. At what time does Priya catch up with Ravi?",
        options: ["09:40", "09:45", "10:00", "She never catches him — he keeps moving ahead"],
        answerIndex: 1,
        explanation:
          "At 09:30 Ravi is already 0.5 × 5 = 2.5 km ahead. Priya gains 15 − 5 = 10 km on him every hour, so closing a 2.5 km gap takes 2.5 ÷ 10 = 0.25 h = 15 min. She catches him at 09:45, when both have gone 3.75 km. 09:40 comes from 2.5 ÷ 15 — as if Ravi stood still while she rode. She certainly does catch him: the gap shrinks by a steady 10 km every hour.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Where is Ravi when Priya sets off?",
          "Each hour, how much closer does Priya get to Ravi?",
          "The gap is 2.5 km and it closes at 10 km/h. How long does that take?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q19",
        question:
          "An old car manual says the car does 40 miles per gallon. Using 1 mile ≈ 1.6 km and 1 gallon ≈ 4.5 litres, about how many kilometres per litre is that?",
        options: ["About 288 km per litre", "About 5.6 km per litre", "About 113 km per litre", "About 14 km per litre"],
        answerIndex: 3,
        explanation:
          "40 miles ≈ 40 × 1.6 = 64 km, so the car does 64 km on 1 gallon, which is about 4.5 litres. On 1 litre it goes 64 ÷ 4.5 ≈ 14.2 km. 288 multiplies by 4.5 as well — but using *more* litres for the same 64 km means *fewer* km per litre, so you divide. 5.6 divides by 1.6 too — but a mile is longer than a kilometre, so the number of kilometres must go *up*.",
        difficulty: "challenge",
        guideRef: "imperial-units",
        hints: [
          "Change one unit at a time. Start by changing the miles into kilometres.",
          "40 miles ≈ 64 km on 1 gallon. And 1 gallon is about 4.5 litres.",
          "64 km on 4.5 litres — how far on 1 litre?",
        ],
        strategy: "Convert one unit at a time",
      },
      {
        kind: "mcq",
        id: "rates-units-m2-q20",
        question:
          "A 60-litre water tank can be filled by tap A alone in 6 minutes, or by tap B alone in 3 minutes. How long does it take with both taps running together?",
        options: ["4.5 min", "9 min", "2 min", "3 min"],
        answerIndex: 2,
        explanation:
          "Turn each tap into a rate. Tap A: 60 ÷ 6 = 10 litres per minute. Tap B: 60 ÷ 3 = 20 litres per minute. Together: 30 litres per minute, so 60 ÷ 30 = 2 minutes. 4.5 min averages the two times — but two taps together must be faster than either one alone. 9 min adds the times, which is how long it would take to fill *two* tanks, one tap after the other.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "Times don't add or average here — but rates do. How many litres per minute does each tap give?",
          "Tap A gives 10 litres per minute. What about tap B?",
          "Together they give 30 litres per minute. How long for 60 litres?",
        ],
        strategy: "Work with rates",
      },
    ],
  },
  // ======================================================================
  // MCQ PAPER 3
  // ======================================================================
  {
    id: "rates-units-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "rates-units-m3-q01",
        question: "Which unit is the most sensible for measuring the mass of a durian?",
        options: ["Milligrams", "Kilograms", "Litres", "Tonnes"],
        answerIndex: 1,
        explanation:
          "A durian has a mass of roughly 1 to 3 kg — about the same as one to three 1 kg bags of sugar — so kilograms fit best. Litres measure capacity (how much a container holds), not mass. Milligrams are for tiny amounts like medicine, and tonnes are for cars and lorries.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["Is a durian closer in mass to a grain of rice, a bag of sugar or a car? And do litres measure mass at all?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q02",
        question: "A bottle holds 1.5 litres. What is that in cm³?",
        options: ["150 cm³", "15,000 cm³", "1.5 cm³", "1500 cm³"],
        answerIndex: 3,
        explanation:
          "1 litre = 1000 cm³, so 1.5 litres = 1.5 × 1000 = 1500 cm³. 150 cm³ multiplies by 100 — but a litre fills a 10 cm cube, and 10 × 10 × 10 = 1000 cm³. 1.5 cm³ forgets to convert at all; 1 cm³ is only 1 ml.",
        difficulty: "warmup",
        guideRef: "area-volume-units",
        hints: ["How many cm³ (the same as millilitres) make 1 litre?"],
        strategy: "Use the conversion factor",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q03",
        question: "Use 1 inch ≈ 2.5 cm. A tablet screen measures 10 inches across. About how many centimetres is that?",
        options: ["25 cm", "4 cm", "12.5 cm", "0.25 cm"],
        answerIndex: 0,
        explanation:
          "Each inch is about 2.5 cm, so 10 inches ≈ 10 × 2.5 = 25 cm. 4 cm divides 10 by 2.5 — but an inch is longer than a centimetre, so there must be *more* centimetres than inches. 12.5 cm adds 2.5 instead of multiplying.",
        difficulty: "warmup",
        guideRef: "imperial-units",
        hints: ["Each inch is about 2.5 cm. What is 10 lots of 2.5 cm?"],
        strategy: "Scale up from a known pair",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q04",
        question: "Which of these is a **rate**?",
        options: ["60 km", "60 minutes", "60 km/h", "60 kg"],
        answerIndex: 2,
        explanation:
          "A rate compares two different quantities: 60 km/h means 60 kilometres *per* hour — a distance for each one unit of time. 60 km is just a distance, 60 minutes just a time and 60 kg just a mass. Each of those is a single measurement, not one quantity per unit of another.",
        difficulty: "warmup",
        guideRef: "density-and-rates",
        hints: ["A rate has the word 'per' hidden in it: an amount of one thing for each one of another."],
        strategy: "Look for 'per'",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q05",
        question: "Write 15:20 as a 12-hour clock time.",
        options: ["3:20 pm", "5:20 pm", "3:20 am", "1:20 pm"],
        answerIndex: 0,
        explanation:
          "For hours after 12, subtract 12: 15 − 12 = 3. It is in the afternoon, so 15:20 is 3:20 pm. 5:20 pm comes from dropping the 1 in '15' (subtracting 10 instead of 12). 3:20 am has the right digits but is in the middle of the night.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["24-hour times after 12:00 are in the afternoon or evening. What do you subtract from the hour?"],
        strategy: "Count on from midday",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q06",
        question: "A recipe for mango lassi needs 1.25 litres of milk. Milk is sold in 250 ml cartons. How many cartons are needed?",
        options: ["50", "0.005", "5", "1"],
        answerIndex: 2,
        explanation:
          "1.25 litres = 1.25 × 1000 = 1250 ml, and 1250 ÷ 250 = 5 cartons. 50 comes from writing 1.25 litres as 12,500 ml (multiplying by 10,000). 0.005 divides 1.25 by 250 without first changing litres into millilitres.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Get both amounts into millilitres.",
          "1 litre = 1000 ml, so 1.25 litres = ? ml",
          "How many 250s are in 1250?",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q07",
        question: "Which of these is equal to 1 m³?",
        options: ["100 litres", "1000 litres", "10 litres", "1 litre"],
        answerIndex: 1,
        explanation:
          "1 m³ is a cube 100 cm on each side: 100 × 100 × 100 = 1,000,000 cm³. Since 1000 cm³ = 1 litre, that is 1,000,000 ÷ 1000 = 1000 litres. Another way to see it: a litre fills a 10 cm cube, and 10 of those fit along each 1 m edge, so 10 × 10 × 10 = 1000 fit inside. 100 litres stops at 10 × 10 — just one layer of litre cubes on the bottom, forgetting there are 10 layers. 10 litres uses the *area* factor (100 × 100 = 10,000 cm³), which only counts two dimensions.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Picture a cube with edges of 1 m = 100 cm. How many cm³ is it?",
          "Work out 100 × 100 × 100.",
          "Then use 1000 cm³ = 1 litre.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q08",
        question:
          "A UK motorway has a speed limit of 70 mph (miles per hour). A Singapore expressway has a limit of 90 km/h. Using 1 mile ≈ 1.6 km, which limit is higher?",
        options: [
          "The Singapore limit — 90 is more than 70",
          "The Singapore limit — 70 mph is only about 44 km/h",
          "The Singapore limit — 90 km/h is about 144 mph",
          "The UK limit — 70 mph is about 112 km/h",
        ],
        answerIndex: 3,
        explanation:
          "Change 70 mph into km/h: 70 miles ≈ 70 × 1.6 = 112 km, so 70 mph ≈ 112 km/h, which is higher than 90 km/h. '90 is more than 70' compares numbers in different units. 44 km/h divides by 1.6, but each mile is *longer* than a kilometre, so the km/h number must be bigger. 144 mph multiplies 90 by 1.6, converting kilometres to miles the wrong way.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "You can't compare 70 and 90 until they are in the same units.",
          "Change 70 miles into kilometres.",
          "Work out 70 × 1.6.",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q09",
        question:
          "Here is part of a bus timetable.\n\n| Stop | Bus 1 | Bus 2 | Bus 3 |\n|---|---|---|---|\n| Jurong East | 08:05 | 08:35 | 09:05 |\n| Clementi | 08:17 | 08:47 | 09:17 |\n| Buona Vista | 08:31 | 09:01 | 09:31 |\n| Orchard | 08:58 | 09:28 | 09:58 |\n\nAisha arrives at the Clementi stop at 08:20. She must reach Orchard by 09:30. How long does she wait at Clementi for the bus she should catch?",
        options: ["27 min", "57 min", "3 min", "68 min"],
        answerIndex: 0,
        explanation:
          "Bus 1 left Clementi at 08:17, three minutes before she arrived. The next bus, Bus 2, leaves Clementi at 08:47 and reaches Orchard at 09:28 — in time. Her wait is 08:20 → 08:47 = 27 min. 68 min is the time from 08:20 until she *arrives* at Orchard, not the wait. 57 min waits for Bus 3, which only reaches Orchard at 09:58 — too late. 3 min is how long ago Bus 1 left.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "Which buses have not yet left Clementi at 08:20?",
          "Check when each of those buses reaches Orchard.",
          "Bus 2 leaves Clementi at 08:47. Count on from 08:20.",
        ],
        strategy: "Organise the information",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q10",
        question:
          "Mei's bike ride took 3 h 24 min. To work out her speed on a calculator, she needs the time in hours as a decimal. What should she type?",
        options: ["3.24", "3.25", "204", "3.4"],
        answerIndex: 3,
        explanation:
          "24 minutes is {{24/60}} = {{2/5}} of an hour = 0.4 h, so 3 h 24 min = 3.4 h. 3.24 treats minutes as hundredths of an hour, but an hour has 60 minutes, not 100. 204 is the time in minutes (3 × 60 + 24) — right amount, wrong unit. 3.25 h is 3 h 15 min.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "What fraction of an hour is 24 minutes?",
          "{{24/60}} simplifies to {{2/5}}. Write that as a decimal.",
        ],
        strategy: "Convert the decimal part",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q11",
        question: "A car travels at a steady 54 km/h. How far does it travel in 20 seconds? Give the distance in metres.",
        options: ["1080 m", "300 m", "0.3 m", "3888 m"],
        answerIndex: 1,
        explanation:
          "Change the speed into m/s: 54 km/h = 54,000 m in 3600 s = 15 m/s (or 54 ÷ 3.6). In 20 s the car goes 15 × 20 = 300 m. 0.3 m is the right number of *kilometres* (0.3 km) with the wrong unit. 1080 m multiplies 54 by 20 without converting hours into seconds.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "The speed is per hour but the time is in seconds. Change one so they match.",
          "54 km/h = ? m/s (divide by 3.6).",
          "15 m every second, for 20 seconds.",
        ],
        strategy: "Make the units match",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q12",
        question: "Wei Ling runs 3 km in 15 minutes. She says: \"My speed was 3 ÷ 15 = 0.2 km/h.\" What was her mistake?",
        options: [
          "She divided by minutes, not hours — her speed was 12 km/h",
          "She divided the wrong way round — her speed was 5 km/h",
          "She should have multiplied — her speed was 45 km/h",
          "Nothing — 0.2 km/h is correct",
        ],
        answerIndex: 0,
        explanation:
          "3 ÷ 15 = 0.2 is the distance per *minute*: 0.2 km/min. An hour has 60 minutes, so 0.2 × 60 = 12 km/h. (Or: 15 min = {{1/4}} h, and 3 ÷ {{1/4}} = 12.) 5 comes from 15 ÷ 3, which is minutes per kilometre — a pace, not a speed. Sense check: at 0.2 km/h it would take 5 hours to walk 1 km, far too slow for a runner.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "0.2 km/h means 0.2 km in a whole hour. Does that match running 3 km in a quarter of an hour?",
          "What does 3 ÷ 15 really give you: kilometres per what?",
          "Change 15 minutes into hours first, or multiply the per-minute rate by 60.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q13",
        question:
          "Jun drives 120 km in 1 h 30 min, stops for a 30-minute break, then drives 60 km in 1 hour. What is his average speed for the whole journey, including the break?",
        options: ["72 km/h", "70 km/h", "60 km/h", "90 km/h"],
        answerIndex: 2,
        explanation:
          "Total distance = 120 + 60 = 180 km. Total time = 1.5 + 0.5 + 1 = 3 h (the break counts, because the question says 'including the break'). Average speed = 180 ÷ 3 = 60 km/h. 72 km/h leaves out the break (180 ÷ 2.5). 70 km/h is the mean of the two driving speeds, 80 and 60 km/h — but a mean of speeds ignores how long each speed lasted.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "Average speed = total distance ÷ total time.",
          "Does the break count in the total time? Read the question again.",
          "180 km ÷ 3 h.",
        ],
        strategy: "Split into stages",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q14",
        question:
          "An object floats in water if its density is less than 1 g/cm³.\n\n| Object | Mass | Volume |\n|---|---|---|\n| Candle | 180 g | 200 cm³ |\n| Pebble | 260 g | 100 cm³ |\n| Plastic toy | 150 g | 120 cm³ |\n| Solid rubber ball | 90 g | 60 cm³ |\n\nWhich object floats?",
        options: ["The solid rubber ball", "The pebble", "The plastic toy", "The candle"],
        answerIndex: 3,
        explanation:
          "Density = mass ÷ volume. Candle: 180 ÷ 200 = 0.9 g/cm³. Pebble: 2.6 g/cm³. Plastic toy: 1.25 g/cm³. Rubber ball: 1.5 g/cm³. Only the candle is less dense than water, so only the candle floats. The rubber ball has the smallest *mass*, but floating depends on mass compared with volume, not on mass alone — a huge ship is very heavy and still floats.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "Floating depends on density, not on mass alone.",
          "Work out mass ÷ volume for each object.",
          "Which density is less than 1 g/cm³?",
        ],
        strategy: "Compare unit rates",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q15",
        question:
          "Arjun is drawing a conversion graph with kilograms on the horizontal axis and pounds (lb) on the vertical axis. He uses 1 kg ≈ 2.2 lb. Which three points should he plot?",
        options: [
          "(0, 0), (22, 10), (110, 50)",
          "(0, 0), (10, 22), (50, 110)",
          "(0, 2.2), (10, 22), (50, 110)",
          "(0, 0), (10, 12.2), (50, 52.2)",
        ],
        answerIndex: 1,
        explanation:
          "Each kilogram is about 2.2 lb, so 10 kg ≈ 22 lb and 50 kg ≈ 110 lb — and 0 kg is 0 lb. Coordinates are (across, up) = (kg, lb), giving (0, 0), (10, 22), (50, 110). (22, 10) puts pounds across, swapping the axes. (10, 12.2) adds 2.2 instead of multiplying by it. Starting at (0, 2.2) would mean nothing at all weighs 2.2 lb, which is impossible.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "A coordinate is (across, up). Which quantity goes across?",
          "How many pounds is 10 kg? And 50 kg?",
          "What is 0 kg in pounds?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q16",
        question: "Farm tractors often have very wide tyres. Why does this help to stop them sinking into soft mud?",
        options: [
          "The weight is spread over a bigger area, so the pressure on the mud is smaller",
          "Wide tyres make the tractor lighter, so the force on the mud is smaller",
          "A bigger area makes the pressure bigger, so the tyres push the mud away",
          "Pressure depends only on weight, so wide tyres just give a better grip",
        ],
        answerIndex: 0,
        explanation:
          "Pressure = force ÷ area. The tractor's weight (the force) is the same whatever tyres it has, but wide tyres spread it over a bigger area, so the force on each square metre — the pressure — is smaller. 'A bigger area makes the pressure bigger' has the relationship backwards: dividing by a bigger number gives a smaller answer. Wide tyres don't make the tractor any lighter.",
        difficulty: "core",
        guideRef: "pressure",
        hints: [
          "Does changing the tyres change how heavy the tractor is?",
          "Pressure = force ÷ area. What happens to the answer when you divide by a bigger area?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q17",
        question: "Always, sometimes or never true?\n\n> If you double every edge of a cuboid, its volume doubles too.",
        options: [
          "Always — every length doubles, so the volume doubles too",
          "Sometimes — only when the cuboid is a cube",
          "Never — the volume becomes 4 times as big",
          "Never — the volume becomes 8 times as big",
        ],
        answerIndex: 3,
        explanation:
          "Volume = length × width × height. Doubling each edge gives 2l × 2w × 2h = 8 × lwh, so the volume is always 8 times as big — never just double. Picture a 1 cm cube: doubling its edges makes a 2 cm cube, which holds 2 × 2 × 2 = 8 of the small cubes. 4 times is what happens to an *area* (two dimensions). It's the same reason 1 m³ is 100 × 100 × 100 cm³, not 100 cm³.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "Try a small case: a 1 × 1 × 1 cube. Double its edges. How many 1 cm cubes fit inside now?",
          "Write the new volume as (2l) × (2w) × (2h).",
          "How many 2s are multiplied together?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q18",
        question:
          "Zara drives 1 km up a hill at 30 km/h. How fast must she drive the 1 km back down so that her average speed for the whole 2 km trip is 60 km/h?",
        options: ["90 km/h", "120 km/h", "It's impossible — she has no time left", "60 km/h"],
        answerIndex: 2,
        explanation:
          "At an average of 60 km/h (1 km per minute), the 2 km trip must take 2 minutes in total. But at 30 km/h (half a km per minute), the uphill kilometre has already taken 2 minutes. There is no time left, so no speed — however fast — can do it. 90 km/h comes from 'the mean of 30 and 90 is 60', but averaging speeds only works when equal *times* are spent at each. At 90 km/h the trip would average 2 ÷ ({{1/30 + 1/90}}) = 45 km/h.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "How long should a 2 km trip take at an average of 60 km/h?",
          "How long did the first kilometre at 30 km/h take?",
          "Compare those two times. How much time is left for the way down?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q19",
        question:
          "A hawker stall sells sugarcane juice in two sizes:\n\n- Small: 300 ml for $1.80\n- Large: 500 ml for $2.70\n\nOn Fridays, small cups are 'buy 2, get 1 free'. On a Friday, which choice gives the lowest price per litre?",
        options: [
          "Small cups on the offer — $3.00 per litre",
          "Small cups on the offer — $4.00 per litre",
          "Large cups — $5.40 per litre",
          "One small cup — it's the cheapest at $1.80",
        ],
        answerIndex: 1,
        explanation:
          "With the offer you pay 2 × $1.80 = $3.60 and get 3 cups = 900 ml, so the price is 3.60 ÷ 0.9 = $4.00 per litre. Large: 2.70 ÷ 0.5 = $5.40 per litre. (Small without the offer: 1.80 ÷ 0.3 = $6.00 per litre.) So the offer wins. $3.00 per litre treats the offer as half price — but you pay for 2 cups out of 3, which is {{2/3}} of the price, not {{1/2}}. '$1.80 is the cheapest' compares cup prices, not the amount of juice you get.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "Compare the cost of the same amount — say, one litre.",
          "With the offer, how much do you pay and how much juice do you get?",
          "$3.60 for 900 ml. Price per litre = 3.60 ÷ 0.9.",
        ],
        strategy: "Compare unit rates",
      },
      {
        kind: "mcq",
        id: "rates-units-m3-q20",
        question:
          "The distance–time graph shows Aisha (line A) and Ben (dashed line B) cycling along the same road in the same direction. Which statement is true?",
        diagram: svgCyclists,
        options: [
          "Ben is faster — his line is higher at the start",
          "Aisha is faster, by 15 km/h",
          "Aisha is faster, by 5 km/h, and she draws level with Ben after 2 hours",
          "They are riding at the same speed where the lines cross",
        ],
        answerIndex: 2,
        explanation:
          "Speed is the gradient (steepness) of a distance–time graph. Aisha: 45 km in 3 h = 15 km/h. Ben: from 10 km to 40 km in 3 h = 30 ÷ 3 = 10 km/h. Aisha is 5 km/h faster, so she closes Ben's 10 km lead in 10 ÷ 5 = 2 hours — where the lines cross at (2, 30). 'Faster by 15 km/h' uses Aisha's speed instead of the difference. Where the lines cross the riders are at the same *place*, not going at the same speed. Ben's line starts higher only because he started 10 km further along.",
        difficulty: "challenge",
        guideRef: "conversion-graphs",
        hints: [
          "On a distance–time graph, what does the steepness of a line tell you?",
          "Work out each speed as distance gained ÷ time taken. Careful — Ben doesn't start at 0 km.",
          "Aisha 15 km/h, Ben 10 km/h. How long does it take to close a 10 km gap?",
        ],
        strategy: "Read the gradient",
      },
    ],
  },
  // ======================================================================
  // MCQ PAPER 4
  // ======================================================================
  {
    id: "rates-units-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "rates-units-m4-q01",
        question: "A bus travels 45 km at an average speed of 30 km/h. How long does the journey take?",
        options: ["1 h 50 min", "40 min", "1 h 30 min", "15 min"],
        answerIndex: 2,
        explanation:
          "Time = distance ÷ speed = 45 ÷ 30 = 1.5 hours = 1 h 30 min. 1 h 50 min reads 1.5 h as '1 hour 50 minutes', but 0.5 h is half an hour. 40 min comes from 30 ÷ 45, the division upside down.",
        difficulty: "warmup",
        guideRef: "speed",
        hints: ["How many 30 km chunks fit into 45 km? Then change the decimal part of the hours into minutes."],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q02",
        question: "Which length is the same as 3.2 m?",
        options: ["320 cm", "32 cm", "3200 cm", "0.032 cm"],
        answerIndex: 0,
        explanation:
          "1 m = 100 cm, so 3.2 m = 3.2 × 100 = 320 cm. 32 cm multiplies by 10, which is the centimetre-to-millimetre factor. 3200 cm multiplies by 1000 — 3.2 m is 3200 **mm**, not 3200 cm.",
        difficulty: "warmup",
        guideRef: "metric-units",
        hints: ["How many centimetres are in 1 metre?"],
        strategy: "Use the conversion factor",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q03",
        question: "A swimming lesson starts at 16:40 and lasts 50 minutes. When does it finish?",
        options: ["16:90", "17:10", "17:50", "17:30"],
        answerIndex: 3,
        explanation:
          "16:40 + 20 min = 17:00, then the other 30 minutes take it to 17:30. 16:90 adds 40 + 50 = 90 but forgets that 60 minutes make an hour. 17:10 takes 40 minutes off the 50 to reach 17:00 (because of the :40) — but 16:40 → 17:00 is only 20 minutes, so 30 minutes are left, not 10.",
        difficulty: "warmup",
        guideRef: "time",
        hints: ["How many minutes from 16:40 to 17:00? How many of the 50 minutes are left after that?"],
        strategy: "Count on using a time line",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q04",
        question: "A sugar cube is 1 cm long, 1 cm wide and 1 cm high. What is its volume in mm³?",
        options: ["10 mm³", "1000 mm³", "100 mm³", "30 mm³"],
        answerIndex: 1,
        explanation:
          "1 cm = 10 mm, so the cube is 10 mm × 10 mm × 10 mm = 1000 mm³. 10 mm³ converts only one length. 100 mm³ is the factor for *area* (1 cm² = 100 mm²), which uses two dimensions — volume has three.",
        difficulty: "warmup",
        guideRef: "area-volume-units",
        hints: ["Write each edge in millimetres, then multiply the three edges together."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q05",
        question: "Use the conversion graph to change 25 miles into kilometres.",
        diagram: svgMiles,
        options: ["About 16 km", "25 km", "80 km", "40 km"],
        answerIndex: 3,
        explanation:
          "Find 25 on the miles (horizontal) axis — halfway between 20 and 30 — go up to the line, then across: 40 km. About 16 km comes from finding 25 on the *kilometres* axis instead, which converts 25 km into miles. 80 km reads the end of the line rather than the value for 25 miles.",
        difficulty: "warmup",
        guideRef: "conversion-graphs",
        hints: ["Start on the axis labelled 'Miles'. Where is 25 — and what is each grid step worth?"],
        strategy: "Read the scale carefully",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q06",
        question: "Siti cuts three pieces of ribbon: 1.4 m, 65 cm and 800 mm long. What is their total length?",
        options: ["2.85 m", "866.4 cm", "10.05 m", "2.265 m"],
        answerIndex: 0,
        explanation:
          "Put everything in metres: 65 cm = 0.65 m and 800 mm = 0.8 m. Total = 1.4 + 0.65 + 0.8 = 2.85 m. 866.4 adds 1.4 + 65 + 800 with no regard for the units. 10.05 m turns 800 mm into 8 m by dividing by 100 — but there are 1000 mm in a metre. 2.265 m turns 65 cm into 0.065 m by dividing by 1000 — but there are 100 cm in a metre.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Choose one unit and convert all three lengths into it.",
          "65 cm = ? m and 800 mm = ? m",
          "Add 1.4 + 0.65 + 0.8.",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q07",
        question: "Use 1 kg ≈ 2.2 lb (pounds). Mei's suitcase weighs 44 lb. About how many kilograms is that?",
        options: ["96.8 kg", "41.8 kg", "20 kg", "46.2 kg"],
        answerIndex: 2,
        explanation:
          "A kilogram is about 2.2 lb, so there are fewer kilograms than pounds: 44 ÷ 2.2 = 20 kg. 96.8 kg multiplies by 2.2, converting the wrong way. 41.8 kg subtracts 2.2 — conversions multiply or divide; they never add or subtract.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "Is a kilogram heavier or lighter than a pound? So should the answer be more or less than 44?",
          "How many lots of 2.2 lb are in 44 lb?",
          "44 ÷ 2.2 is the same as 440 ÷ 22.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q08",
        question: "Hana is 5 feet 2 inches tall. Using 1 foot ≈ 30 cm and 1 inch ≈ 2.5 cm, roughly how tall is she?",
        options: ["About 130 cm", "About 155 cm", "About 72.5 cm", "About 15.5 cm"],
        answerIndex: 1,
        explanation:
          "5 feet ≈ 5 × 30 = 150 cm and 2 inches ≈ 2 × 2.5 = 5 cm, so she is about 155 cm tall. About 130 cm treats '5 feet 2 inches' as 52 inches (52 × 2.5) — but a foot is 12 inches, not 10. About 72.5 cm swaps the conversions: 5 × 2.5 + 2 × 30.",
        difficulty: "core",
        guideRef: "imperial-units",
        hints: [
          "Convert the feet and the inches separately.",
          "5 feet ≈ 5 × 30 cm and 2 inches ≈ 2 × 2.5 cm.",
          "Add the two parts.",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q09",
        question: "A poster is 84 cm wide and 60 cm tall. What is its area in m²?",
        options: ["50.4 m²", "5.04 m²", "1.44 m²", "0.504 m²"],
        answerIndex: 3,
        explanation:
          "Easiest way: convert the lengths first. 0.84 m × 0.6 m = 0.504 m². (Or: 84 × 60 = 5040 cm², and 5040 ÷ 10,000 = 0.504 m².) 50.4 m² divides by 100, the *length* factor — that's a poster the size of a classroom floor! 1.44 adds 0.84 and 0.6 instead of multiplying them.",
        difficulty: "core",
        guideRef: "area-volume-units",
        hints: [
          "One way: change both lengths into metres before multiplying.",
          "84 cm = 0.84 m and 60 cm = 0.6 m.",
          "Or find the area in cm² and divide by 10,000 (not 100).",
        ],
        strategy: "Convert first, then calculate",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q10",
        question: "A train journey takes 2.75 hours. The train leaves at 14:50. At what time does it arrive?",
        options: ["18:05", "16:95", "17:35", "17:05"],
        answerIndex: 2,
        explanation:
          "0.75 h = 0.75 × 60 = 45 min, so 2.75 h = 2 h 45 min. 14:50 + 2 h = 16:50; + 10 min = 17:00; + 35 min = 17:35. 18:05 treats 2.75 h as 2 h 75 min. 16:95 adds the minutes (50 + 45 = 95) without carrying 60 minutes into the next hour.",
        difficulty: "core",
        guideRef: "time",
        hints: [
          "First change 2.75 hours into hours and minutes.",
          "0.75 of an hour = ? minutes",
          "Add 2 h 45 min to 14:50 in steps, going through 17:00.",
        ],
        strategy: "Count on using a time line",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q11",
        question: "A snail crawls at 0.5 mm per second. How long does it take to cross a path 30 cm wide?",
        options: ["10 minutes", "1 minute", "100 minutes", "15 seconds"],
        answerIndex: 0,
        explanation:
          "Make the units match: 30 cm = 300 mm. Time = distance ÷ speed = 300 ÷ 0.5 = 600 s = 10 minutes. 1 minute forgets to change 30 cm into millimetres (30 ÷ 0.5 = 60 s). 15 seconds multiplies 30 × 0.5 instead of dividing. 100 minutes uses 1 cm = 100 mm.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "The speed is in mm per second but the path is in cm. Make them match.",
          "30 cm = 300 mm. How many 0.5 mm steps fit into 300 mm?",
          "300 ÷ 0.5 = ? seconds. Then change to minutes.",
        ],
        strategy: "Make the units match",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q12",
        question: "Which of these is the fastest?",
        options: [
          "A car at 100 km/h",
          "A cheetah at 30 m/s",
          "A train at 1.5 km per minute",
          "A scooter that covers 400 m in 20 s",
        ],
        answerIndex: 1,
        explanation:
          "Convert all four into km/h. Cheetah: 30 × 3.6 = 108 km/h. Train: 1.5 × 60 = 90 km/h. Scooter: 400 ÷ 20 = 20 m/s = 72 km/h. So the cheetah is the fastest. The car is tempting because 100 is the biggest number, but you can only compare speeds in the same units.",
        difficulty: "core",
        guideRef: "speed",
        hints: [
          "You can't compare until all four speeds are in the same unit.",
          "Change each into km/h: m/s × 3.6, and km per minute × 60.",
          "Compare 100, 108, 90 and 72.",
        ],
        strategy: "Convert to a common unit",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q13",
        question: "A block of wood has a density of 0.6 g/cm³ and a mass of 150 g. What is its volume?",
        options: ["90 cm³", "0.004 cm³", "25 cm³", "250 cm³"],
        answerIndex: 3,
        explanation:
          "Density = mass ÷ volume, so volume = mass ÷ density = 150 ÷ 0.6 = 250 cm³. 90 cm³ multiplies 150 by 0.6 instead of dividing. Sense check: wood is less dense than water, so 150 g of wood must take up *more* than 150 cm³ — and 250 cm³ does. 25 cm³ is a place-value slip (150 ÷ 6).",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "You know the mass and the density. Rearrange density = mass ÷ volume.",
          "Volume = mass ÷ density.",
          "150 ÷ 0.6 is the same as 1500 ÷ 6.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q14",
        question: "Mr Tan's car uses 6.5 litres of petrol for every 100 km. How much petrol does it use on a 340 km trip?",
        options: ["22.1 litres", "2210 litres", "52.3 litres", "221 litres"],
        answerIndex: 0,
        explanation:
          "340 km is 3.4 lots of 100 km, so the car uses 3.4 × 6.5 = 22.1 litres. 2210 litres multiplies 6.5 by 340 — but the rate is per *100* km, not per km. 52.3 litres comes from 340 ÷ 6.5, which mixes up which quantity is per which.",
        difficulty: "core",
        guideRef: "density-and-rates",
        hints: [
          "The rate is per 100 km. How many lots of 100 km are in 340 km?",
          "340 ÷ 100 = 3.4",
          "Work out 3.4 × 6.5.",
        ],
        strategy: "Scale up from a known pair",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q15",
        question: "The graph shows the cost of petrol. Use it to find the price of petrol per litre.",
        diagram: svgPetrol,
        options: ["$0.33", "$30", "$3.00", "$150"],
        answerIndex: 2,
        explanation:
          "The line goes through (0, 0) and (10, 30): 10 litres cost $30, so 1 litre costs 30 ÷ 10 = $3.00. This is the gradient of the line: rise ÷ run = 30 ÷ 10. $0.33 divides litres by dollars — that is how many litres $1 buys. $30 is the cost of 10 litres, not of 1 litre.",
        difficulty: "core",
        guideRef: "conversion-graphs",
        hints: [
          "Pick a point on the line where you can read both values exactly.",
          "How much do 10 litres cost?",
          "Cost of 1 litre = cost ÷ number of litres.",
        ],
        strategy: "Read the gradient",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q16",
        question:
          "An elephant weighing 40,000 N stands on 4 feet, each with an area of 1000 cm². A woman weighing 600 N stands on the 2 heels of her stiletto shoes, each with an area of 1 cm². Who exerts the greater pressure on the floor?",
        options: [
          "The elephant — it weighs over 60 times as much",
          "The woman — 300 N/cm² against the elephant's 10 N/cm²",
          "The woman — 300 N/cm² against the elephant's 40 N/cm²",
          "The elephant — 0.1 N/cm² against the woman's 0.0033 N/cm²",
        ],
        answerIndex: 1,
        explanation:
          "Pressure = force ÷ total area. Elephant: 40,000 ÷ (4 × 1000) = 10 N/cm². Woman: 600 ÷ (2 × 1) = 300 N/cm² — 30 times as much, which is why stiletto heels can dent wooden floors. The elephant is far heavier, but its weight is spread over a huge area. 40 N/cm² uses the area of only one foot, when all four share the weight. 0.1 and 0.0033 come from dividing area by force — upside down.",
        difficulty: "core",
        guideRef: "pressure",
        hints: [
          "Pressure depends on force *and* area. Work out each pressure.",
          "Use the total area: the elephant has 4 feet, the woman 2 heels.",
          "Elephant: 40,000 ÷ 4000. Woman: 600 ÷ 2.",
        ],
        strategy: "Compare unit rates",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q17",
        question: "A 2 kg bag of mung beans contains about 40,000 beans. Roughly what is the mass of one bean, in milligrams?",
        options: ["0.05 mg", "0.00005 mg", "50 mg", "5 mg"],
        answerIndex: 2,
        explanation:
          "2 kg = 2000 g = 2,000,000 mg. One bean ≈ 2,000,000 ÷ 40,000 = 50 mg. 0.05 is the right answer in *grams* (2000 ÷ 40,000) but labelled as milligrams. 0.00005 is the answer in *kilograms* (2 ÷ 40,000) — not converted at all. 5 mg uses 1 kg = 100,000 mg, one zero short: 1 kg = 1000 × 1000 = 1,000,000 mg.",
        difficulty: "core",
        guideRef: "metric-units",
        hints: [
          "Change 2 kg into milligrams first — it takes two steps: kg → g → mg.",
          "1 kg = 1000 g, and 1 g = 1000 mg.",
          "Share 2,000,000 mg between 40,000 beans.",
        ],
        strategy: "Convert first, then calculate",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q18",
        question:
          "During a monsoon storm, 30 mm of rain falls on a flat roof measuring 8 m by 5 m. All of it drains into a tank. How many litres of water is that?",
        options: ["1200 litres", "1.2 litres", "12,000 litres", "120 litres"],
        answerIndex: 0,
        explanation:
          "Think of the rain as a thin cuboid lying on the roof. Area = 8 × 5 = 40 m². Depth = 30 mm = 0.03 m. Volume = 40 × 0.03 = 1.2 m³, and 1 m³ = 1000 litres, so that is 1200 litres. 1.2 litres forgets that the 1.2 is in m³. 12,000 litres turns 30 mm into 0.3 m, but there are 1000 mm in a metre. (Neat fact: 1 mm of rain on 1 m² is exactly 1 litre, so 30 mm on 40 m² is 30 × 40 = 1200 litres.)",
        difficulty: "challenge",
        guideRef: "area-volume-units",
        hints: [
          "Picture the rain as a very thin cuboid lying on the roof. What are its three dimensions?",
          "Use metres for all three: 30 mm = ? m.",
          "Find the volume in m³, then multiply by 1000 to get litres.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q19",
        question:
          "Always, sometimes or never true?\n\n> For a journey in two parts, the average speed equals the mean of the two speeds.",
        options: [
          "Always — that is what 'average' means",
          "Never — you must always use total distance ÷ total time",
          "Sometimes — it works when both parts are the same distance",
          "Sometimes — it works when both parts take the same time",
        ],
        answerIndex: 3,
        explanation:
          "Average speed is always total distance ÷ total time — and that *sometimes* equals the mean of the speeds. If both parts last the same time t, at speeds a and b, the distance is at + bt in a time of 2t, so the average is {{(a + b)/2}}: exactly the mean. For example, 1 hour at 40 km/h then 1 hour at 60 km/h averages 50 km/h, so 'never' is wrong. Equal *distances* don't work: 10 km at 10 km/h then 10 km at 30 km/h takes {{1 1/3}} hours, so the average is 20 ÷ {{1 1/3}} = 15 km/h, not 20 km/h.",
        difficulty: "challenge",
        guideRef: "speed",
        hints: [
          "Test a case: 1 hour at 40 km/h, then 1 hour at 60 km/h. What is the average speed?",
          "Now test equal distances: 10 km at 10 km/h, then 10 km at 30 km/h.",
          "What was different about the two cases?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "rates-units-m4-q20",
        question:
          "Ethan mixes 300 cm³ of water (density 1 g/cm³) with 200 cm³ of honey (density 1.4 g/cm³). Assuming the volumes simply add, what is the density of the mixture?",
        options: ["1.2 g/cm³", "1.16 g/cm³", "2.4 g/cm³", "0.86 g/cm³"],
        answerIndex: 1,
        explanation:
          "Density of the mixture = total mass ÷ total volume. Water: 300 × 1 = 300 g. Honey: 200 × 1.4 = 280 g. Total: 580 g in 500 cm³, so 580 ÷ 500 = 1.16 g/cm³. 1.2 g/cm³ is the mean of the two densities, but there is more water than honey, so the mixture is closer to 1 — just as an average speed is pulled towards the speed you keep up for longer. 2.4 g/cm³ adds the densities, but a mixture can't be denser than both of its ingredients. 0.86 is 500 ÷ 580 — volume over mass, upside down.",
        difficulty: "challenge",
        guideRef: "density-and-rates",
        hints: [
          "Can you just average 1 and 1.4? Is there the same amount of each liquid?",
          "Find the mass of each liquid using mass = density × volume.",
          "Total mass ÷ total volume.",
        ],
        strategy: "Work with totals",
      },
    ],
  },
];
