// ---------------------------------------------------------------------------
// Big Exam — Calculator Paper 2 (cross-topic, 30 questions, 60 minutes).
// Harder than Calculator Paper 1: multi-step contexts rolled into a single
// answer, data interpretation, reverse percentages, speed and density,
// circles, a Pythagoras stretch finale.
// Ordered easier → harder: q01–q08 warm-up, q09–q24 core, q25–q30 challenge.
// ---------------------------------------------------------------------------
import type { ExamPaper } from "../types.ts";

const DRONE_BEARINGS = `<svg viewBox="0 0 360 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sketch of a drone's route. North lines are drawn at P and at Q. The drone flies from P to Q on a bearing of 064 degrees, then from Q to R on a bearing of 155 degrees. Angle PQR is marked with a question mark." font-family="sans-serif"><rect x="0" y="0" width="360" height="290" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><line x1="70" y1="215" x2="70" y2="118"/><line x1="231.78" y1="136.09" x2="231.78" y2="40"/></g><polygon points="70,106 65,119 75,119" fill="#334155"/><polygon points="231.78,28 226.78,41 236.78,41" fill="#334155"/><line x1="70" y1="215" x2="231.78" y2="136.09" stroke="#1f2937" stroke-width="2.5"/><line x1="231.78" y1="136.09" x2="286.72" y2="253.91" stroke="#1f2937" stroke-width="2.5"/><path d="M70 185 A30 30 0 0 1 96.96 201.85" fill="none" stroke="#334155" stroke-width="1.5"/><path d="M231.78 110.09 A26 26 0 0 1 242.77 159.66" fill="none" stroke="#334155" stroke-width="1.5"/><path d="M231.78 136.09 L239.39 152.41 A18 18 0 0 1 215.6 143.98 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.2"/><circle cx="70" cy="215" r="3.5" fill="#1f2937"/><circle cx="231.78" cy="136.09" r="3.5" fill="#1f2937"/><circle cx="286.72" cy="253.91" r="3.5" fill="#1f2937"/><g font-size="13" fill="#1f2937"><text x="70" y="100" text-anchor="middle">N</text><text x="231.78" y="22" text-anchor="middle">N</text><text x="56" y="232" font-weight="bold">P</text><text x="212" y="128" font-weight="bold">Q</text><text x="294" y="270" font-weight="bold">R</text></g><g font-size="12" fill="#1f2937"><text x="96" y="178" text-anchor="middle">064°</text><text x="276" y="130" text-anchor="middle">155°</text><text x="219" y="172" text-anchor="middle" font-weight="bold">?</text></g><text x="352" y="284" font-size="11" fill="#334155" text-anchor="end">Not to scale</text></svg>`;

const A_FRAME = `<svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Isosceles triangle ABC with apex A at the top and base BC horizontal. AB and AC are marked equal. A horizontal crossbar DE joins D on AB to E on AC and is marked parallel to BC. Angle BAC is labelled 2x degrees. Angle BDE, between DB and DE below the crossbar, is labelled 5x minus 14 degrees." font-family="sans-serif"><rect x="0" y="0" width="360" height="300" fill="#ffffff"/><polygon points="180,23.96 60,270 300,270" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="113.65" y1="160" x2="246.35" y2="160" stroke="#1f2937" stroke-width="2"/><g stroke="#1f2937" stroke-width="1.5" fill="none"><line x1="138.61" y1="95.14" x2="149.39" y2="100.4"/><line x1="210.61" y1="100.4" x2="221.39" y2="95.14"/><path d="M176 155 L183 160 L176 165"/><path d="M176 265 L183 270 L176 275"/></g><path d="M170.36 43.74 A22 22 0 0 0 189.64 43.74" fill="none" stroke="#334155" stroke-width="1.5"/><path d="M131.65 160 A18 18 0 0 1 105.76 176.18" fill="none" stroke="#334155" stroke-width="1.5"/><g font-size="13" fill="#1f2937" font-weight="bold"><text x="180" y="16" text-anchor="middle">A</text><text x="48" y="286">B</text><text x="304" y="286">C</text><text x="98" y="158" text-anchor="end">D</text><text x="262" y="158">E</text></g><g font-size="12" fill="#1f2937"><text x="180" y="66" text-anchor="middle">2x°</text><text x="126" y="196">(5x − 14)°</text></g></svg>`;

const RIDE_GRAPH = `<svg viewBox="0 0 380 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance-time graph from 09:00 to 10:00. Distance from Marcus's home is 0 to 6 km. Marcus, solid line: from 0 km at 09:00 to 4 km at 09:15, flat at 4 km until 09:25, then to 6 km at 09:35. Hana, dashed line: a straight line from 6 km at 09:00 down to 0 km at 10:00. The lines cross at 09:20 at 4 km." font-family="sans-serif"><rect x="0" y="0" width="380" height="290" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="75" y1="50" x2="75" y2="230"/><line x1="100" y1="50" x2="100" y2="230"/><line x1="125" y1="50" x2="125" y2="230"/><line x1="150" y1="50" x2="150" y2="230"/><line x1="175" y1="50" x2="175" y2="230"/><line x1="200" y1="50" x2="200" y2="230"/><line x1="225" y1="50" x2="225" y2="230"/><line x1="250" y1="50" x2="250" y2="230"/><line x1="275" y1="50" x2="275" y2="230"/><line x1="300" y1="50" x2="300" y2="230"/><line x1="325" y1="50" x2="325" y2="230"/><line x1="350" y1="50" x2="350" y2="230"/><line x1="50" y1="200" x2="350" y2="200"/><line x1="50" y1="170" x2="350" y2="170"/><line x1="50" y1="140" x2="350" y2="140"/><line x1="50" y1="110" x2="350" y2="110"/><line x1="50" y1="80" x2="350" y2="80"/><line x1="50" y1="50" x2="350" y2="50"/></g><line x1="50" y1="230" x2="358" y2="230" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="230" x2="50" y2="40" stroke="#1f2937" stroke-width="1.5"/><g font-size="10" fill="#1f2937" text-anchor="middle"><text x="50" y="246">09:00</text><text x="100" y="246">09:10</text><text x="150" y="246">09:20</text><text x="200" y="246">09:30</text><text x="250" y="246">09:40</text><text x="300" y="246">09:50</text><text x="350" y="246">10:00</text></g><g font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="234">0</text><text x="44" y="204">1</text><text x="44" y="174">2</text><text x="44" y="144">3</text><text x="44" y="114">4</text><text x="44" y="84">5</text><text x="44" y="54">6</text></g><text x="200" y="266" font-size="12" fill="#1f2937" text-anchor="middle">Time</text><text x="16" y="140" font-size="11" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 140)">Distance from Marcus's home (km)</text><polyline points="50,230 125,110 175,110 225,50" fill="none" stroke="#1f2937" stroke-width="2.5"/><line x1="50" y1="50" x2="350" y2="230" stroke="#334155" stroke-width="2.5" stroke-dasharray="8 5"/><rect x="248" y="58" width="118" height="44" fill="#ffffff" stroke="#cbd5e1"/><line x1="256" y1="72" x2="284" y2="72" stroke="#1f2937" stroke-width="2.5"/><text x="290" y="76" font-size="11" fill="#1f2937">Marcus</text><line x1="256" y1="90" x2="284" y2="90" stroke="#334155" stroke-width="2.5" stroke-dasharray="8 5"/><text x="290" y="94" font-size="11" fill="#1f2937">Hana</text></svg>`;

const TENT = `<svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A tent shaped like a triangular prism. The front triangle has base 1.6 m, sloping sides 1.7 m and perpendicular height 1.5 m. The tent is 2.4 m long. Hidden edges are dashed." font-family="sans-serif"><rect x="0" y="0" width="400" height="290" fill="#ffffff"/><polygon points="120,110 270,40 350,190 200,260" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="40,260 200,260 120,110" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><g stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4" fill="none"><line x1="40" y1="260" x2="190" y2="190"/><line x1="190" y1="190" x2="350" y2="190"/><line x1="190" y1="190" x2="270" y2="40"/></g><line x1="120" y1="110" x2="120" y2="260" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M120 250 L130 250 L130 260" fill="none" stroke="#334155" stroke-width="1.2"/><g font-size="12" fill="#1f2937"><text x="120" y="278" text-anchor="middle">1.6 m</text><text x="70" y="180" text-anchor="end">1.7 m</text><text x="125" y="238">1.5 m</text><text x="290" y="244">2.4 m</text></g></svg>`;

const SMOOTHIE_CHART = `<svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart titled Mango smoothies sold. The vertical axis starts at 400 and goes up to 480 in steps of 20, with minor gridlines every 10. January is 420, February is 440 and March is 470." font-family="sans-serif"><rect x="0" y="0" width="360" height="280" fill="#ffffff"/><text x="200" y="26" font-size="14" font-weight="bold" fill="#1f2937" text-anchor="middle">Mango smoothies sold</text><g stroke="#f1f5f9" stroke-width="1"><line x1="60" y1="207.5" x2="340" y2="207.5"/><line x1="60" y1="162.5" x2="340" y2="162.5"/><line x1="60" y1="117.5" x2="340" y2="117.5"/><line x1="60" y1="72.5" x2="340" y2="72.5"/></g><g stroke="#cbd5e1" stroke-width="1"><line x1="60" y1="185" x2="340" y2="185"/><line x1="60" y1="140" x2="340" y2="140"/><line x1="60" y1="95" x2="340" y2="95"/><line x1="60" y1="50" x2="340" y2="50"/></g><g fill="#fbbf24" stroke="#1f2937" stroke-width="1"><rect x="85" y="185" width="60" height="45"/><rect x="175" y="140" width="60" height="90"/><rect x="265" y="72.5" width="60" height="157.5"/></g><line x1="60" y1="230" x2="340" y2="230" stroke="#1f2937" stroke-width="1.5"/><line x1="60" y1="230" x2="60" y2="45" stroke="#1f2937" stroke-width="1.5"/><g font-size="11" fill="#1f2937" text-anchor="end"><text x="54" y="234">400</text><text x="54" y="189">420</text><text x="54" y="144">440</text><text x="54" y="99">460</text><text x="54" y="54">480</text></g><g font-size="12" fill="#1f2937" text-anchor="middle"><text x="115" y="248">Jan</text><text x="205" y="248">Feb</text><text x="295" y="248">Mar</text></g><text x="16" y="140" font-size="11" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 140)">Number sold</text></svg>`;

const COASTERS = `<svg viewBox="0 0 300 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three circles of radius 5 cm, each touching the other two. Dashed lines join their centres to form an equilateral triangle. The small curved gap enclosed between the three circles is shaded yellow." font-family="sans-serif"><rect x="0" y="0" width="300" height="270" fill="#ffffff"/><polygon points="90,190 210,190 150,86.08" fill="#fde68a"/><g fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"><circle cx="90" cy="190" r="60"/><circle cx="210" cy="190" r="60"/><circle cx="150" cy="86.08" r="60"/></g><polygon points="90,190 210,190 150,86.08" fill="none" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"/><g fill="#1f2937"><circle cx="90" cy="190" r="3"/><circle cx="210" cy="190" r="3"/><circle cx="150" cy="86.08" r="3"/></g><line x1="90" y1="190" x2="30" y2="190" stroke="#1f2937" stroke-width="1.5"/><text x="60" y="184" font-size="12" fill="#1f2937" text-anchor="middle">5 cm</text><line x1="156" y1="152" x2="252" y2="96" stroke="#334155" stroke-width="1"/><text x="256" y="94" font-size="12" fill="#1f2937">gap</text></svg>`;

const PILLAR = `<svg viewBox="110 0 210 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sketch, not to scale, of a cylindrical pillar of diameter 35 cm and height 3.5 m. A string of lights winds around it 4 times from the bottom to the top. Parts of the string at the back are dashed." font-family="sans-serif"><rect x="0" y="0" width="320" height="300" fill="#ffffff"/><rect x="160" y="40" width="70" height="230" fill="#e2e8f0"/><ellipse cx="195" cy="40" rx="35" ry="9" fill="#f1f5f9" stroke="#1f2937" stroke-width="1.5"/><path d="M160 270 A35 9 0 0 0 230 270" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M160 270 A35 9 0 0 1 230 270" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/><line x1="160" y1="40" x2="160" y2="270" stroke="#1f2937" stroke-width="1.5"/><line x1="230" y1="40" x2="230" y2="270" stroke="#1f2937" stroke-width="1.5"/><g stroke="#b45309" stroke-width="2.5"><line x1="160" y1="270" x2="230" y2="241.25"/><line x1="160" y1="212.5" x2="230" y2="183.75"/><line x1="160" y1="155" x2="230" y2="126.25"/><line x1="160" y1="97.5" x2="230" y2="68.75"/></g><g stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 3"><line x1="230" y1="241.25" x2="160" y2="212.5"/><line x1="230" y1="183.75" x2="160" y2="155"/><line x1="230" y1="126.25" x2="160" y2="97.5"/><line x1="230" y1="68.75" x2="160" y2="40"/></g><g stroke="#334155" stroke-width="1"><line x1="160" y1="20" x2="230" y2="20"/><line x1="160" y1="15" x2="160" y2="25"/><line x1="230" y1="15" x2="230" y2="25"/><line x1="255" y1="40" x2="255" y2="270"/><line x1="250" y1="40" x2="260" y2="40"/><line x1="250" y1="270" x2="260" y2="270"/></g><g font-size="12" fill="#1f2937"><text x="195" y="13" text-anchor="middle">35 cm</text><text x="262" y="159">3.5 m</text></g><text x="312" y="294" font-size="11" fill="#334155" text-anchor="end">Not to scale</text></svg>`;

export const paper: ExamPaper = {
  id: "exam-c2",
  title: "Calculator Paper 2",
  calculator: true,
  minutes: 60,
  questions: [
    // ============================ WARM-UP ==================================
    {
      kind: "short",
      id: "exam-c2-q01",
      topicId: "integers-powers",
      guideRef: "squares-cubes-roots",
      difficulty: "warmup",
      question:
        "A block of firm tofu is a perfect cube. Its volume is 91.125 cm³.\n\nUse your calculator to work out the **total surface area** of the block. Give your answer in cm².",
      answer: { type: "number", value: 121.5, display: "121.5 cm²" },
      traps: [
        { spec: { type: "number", value: 20.25 }, feedback: "That's the area of just one face. A cube has 6 identical square faces." },
        { spec: { type: "number", value: 4.5 }, feedback: "4.5 cm is the length of one edge. The question asks for the total area of all the faces." },
      ],
      solution: [
        "Volume = edge³, so edge = {{cbrt(91.125)}} = 4.5 cm. (Check: 4.5 × 4.5 × 4.5 = 91.125.)",
        "Area of one square face = 4.5² = 20.25 cm².",
        "A cube has 6 faces: 6 × 20.25 = **121.5 cm²**.",
      ],
      commonError: "Pressing the square-root key instead of the cube-root key: {{sqrt(91.125)}} ≈ 9.55 is not the edge length.",
      hints: [
        "Volume of a cube = edge × edge × edge. Which root undoes cubing?",
        "Find the edge with the cube-root key, then think about how many faces a cube has.",
      ],
      strategy: "Use the inverse",
    },
    {
      kind: "short",
      id: "exam-c2-q02",
      topicId: "standard-form",
      guideRef: "small-numbers",
      difficulty: "warmup",
      question:
        "A pack of 1800 sheets of tissue paper is pressed flat into a stack 6.3 mm tall.\n\nWork out the thickness of one sheet **in metres**. Give your answer in standard form.",
      answer: { type: "number", value: 0.0000035, standardForm: true, display: "{{3.5 * 10^(-6)}} m" },
      traps: [
        {
          spec: { type: "number", value: 0.0035 },
          feedback: "0.0035 is the thickness in millimetres. There are 1000 mm in 1 m, so divide by 1000 again to get metres.",
        },
        {
          spec: { type: "number", value: 285.714, tolerance: 0.5 },
          feedback: "1800 ÷ 6.3 tells you how many sheets fit in 1 mm. You want the thickness of one sheet: 6.3 ÷ 1800.",
        },
      ],
      solution: [
        "Thickness of one sheet = 6.3 ÷ 1800 = 0.0035 mm.",
        "Change to metres (÷ 1000): 0.0035 mm = 0.000 003 5 m.",
        "Move the decimal point 6 places to the right to get 3.5, so the answer is **{{3.5 * 10^(-6)}} m**.",
      ],
      commonError: "Forgetting to change millimetres to metres, giving {{3.5 * 10^(-3)}}.",
      hints: [
        "Find the thickness of one sheet in millimetres first.",
        "1 m = 1000 mm, so divide by 1000 to change mm into m.",
        "Write 0.000 003 5 as a number between 1 and 10 multiplied by a power of 10.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "mcq",
      id: "exam-c2-q03",
      topicId: "rates-units",
      guideRef: "time",
      difficulty: "warmup",
      question: "Ethan cycles 32.9 km along a park connector at an average speed of 14 km/h.\n\nHow long does his ride take?",
      options: ["2.21 hours", "2 hours 21 minutes", "2 hours 35 minutes", "26 minutes"],
      answerIndex: 1,
      explanation:
        "Time = distance ÷ speed = 32.9 ÷ 14 = 2.35 hours. The 0.35 is a fraction of an **hour**, not a number of minutes: 0.35 × 60 = 21 minutes. So the ride takes 2 hours 21 minutes.\n\n2 hours 35 minutes reads the decimal part as minutes. 2.21 hours mixes the two systems up — it is not the same as 2 h 21 min. 26 minutes comes from dividing the wrong way round (14 ÷ 32.9).",
      hints: ["Time = distance ÷ speed.", "How many minutes are in 0.35 of an hour?"],
    },
    {
      kind: "short",
      id: "exam-c2-q04",
      topicId: "averages-spread",
      guideRef: "mean-median-mode-range",
      difficulty: "warmup",
      question:
        "Siti records the rainfall at her school each day for one week in December.\n\n| Day | Mon | Tue | Wed | Thu | Fri | Sat | Sun |\n|---|---|---|---|---|---|---|---|\n| Rainfall (mm) | 12.4 | 0 | 3.8 | 27.5 | 0 | 9.1 | 15.6 |\n\nWork out the mean daily rainfall for the week. Give your answer in mm to 1 decimal place.",
      answer: { type: "number", value: 9.8, allowFraction: false, display: "9.8 mm" },
      traps: [
        { spec: { type: "number", value: 13.7, tolerance: 0.02 }, feedback: "You divided by 5. Days with 0 mm of rain still count — there are 7 days, so divide by 7." },
        { spec: { type: "number", value: 9.1 }, feedback: "9.1 is the median (the middle value when the data are in order). The mean is the total ÷ the number of days." },
      ],
      solution: [
        "Total = 12.4 + 0 + 3.8 + 27.5 + 0 + 9.1 + 15.6 = 68.4 mm.",
        "Mean = 68.4 ÷ 7 = 9.771 4… mm.",
        "To 1 decimal place: **9.8 mm**.",
      ],
      commonError: "Leaving out the 0 mm days when dividing.",
      hints: ["Add up all seven values — including the zeros.", "Divide the total by the number of days."],
    },
    {
      kind: "short",
      id: "exam-c2-q05",
      topicId: "decimals-rounding",
      guideRef: "decimal-places",
      difficulty: "warmup",
      question:
        "A community garden plot beside an HDB block is a square. Its area is 99.9 m².\n\nWork out the length of one side of the plot. Give your answer in metres to 1 decimal place.",
      answer: { type: "number", value: 10, allowFraction: false, display: "10.0 m" },
      traps: [
        {
          spec: { type: "number", value: 25, tolerance: 0.03 },
          feedback: "Dividing by 4 finds a side from the perimeter. For a square's area, side × side = 99.9, so use the square root.",
        },
        { spec: { type: "number", value: 9.1 }, feedback: "Careful with the carry: 9.9 rounded up becomes 10.0, not 9.10. Ten tenths make one whole." },
      ],
      solution: [
        "Side × side = 99.9, so side = {{sqrt(99.9)}} = 9.994 99… m.",
        "To 1 decimal place, look at the second decimal digit: in 9.99… it is 9, so round the first decimal place up.",
        "9.9 rounded up becomes 10.0 (ten tenths carry into the units). Answer: **10.0 m**.",
        "Keep the zero: writing 10.0 shows the answer is accurate to 1 decimal place.",
      ],
      commonError: "Cutting off the digits (9.9) instead of rounding, or writing 9.10 when the 9 rounds up.",
      hints: [
        "Side × side = 99.9. Which key undoes squaring?",
        "{{sqrt(99.9)}} = 9.994 99… Which digit decides how you round to 1 decimal place?",
      ],
      strategy: "Use the inverse",
    },
    {
      kind: "short",
      id: "exam-c2-q06",
      topicId: "ratio-proportion",
      guideRef: "sharing-in-a-ratio",
      difficulty: "warmup",
      question:
        "Arjun makes 2.4 kg of trail mix. It contains nuts, raisins and oats in the ratio 5 : 3 : 4 by mass.\n\nWhat mass of raisins does he use? Give your answer in grams.",
      answer: { type: "number", value: 600, display: "600 g" },
      traps: [
        { spec: { type: "number", value: 0.6 }, feedback: "0.6 is the mass in kilograms. The question asks for grams: 0.6 kg = 600 g." },
        { spec: { type: "number", value: 800 }, feedback: "800 g is the oats (4 parts). Raisins are the middle number in the ratio — 3 parts." },
        { spec: { type: "number", value: 1000 }, feedback: "1000 g is the nuts (5 parts). Raisins are 3 parts." },
      ],
      solution: [
        "Total parts = 5 + 3 + 4 = 12.",
        "2.4 kg = 2400 g, so one part = 2400 ÷ 12 = 200 g.",
        "Raisins = 3 parts = 3 × 200 = **600 g**.",
      ],
      commonError: "Dividing 2.4 kg by 3 (the raisins' number) instead of by the total number of parts.",
      hints: ["How many parts are there altogether?", "Change 2.4 kg to grams, then find the mass of one part."],
      strategy: "Use a bar model",
    },
    {
      kind: "mcq",
      id: "exam-c2-q07",
      topicId: "probability",
      guideRef: "expected-outcomes",
      difficulty: "warmup",
      question:
        "A packet of chilli seeds says that the probability that a seed germinates (starts to grow) is 0.86.\n\nPriya plants 350 of these seeds. How many would you expect **not** to germinate?",
      options: ["301", "336", "0.14", "49"],
      answerIndex: 3,
      explanation:
        "P(does not germinate) = 1 − 0.86 = 0.14. Expected number = 0.14 × 350 = 49.\n\n301 is the number expected to germinate (0.86 × 350) — the opposite event. 336 comes from taking 14 away from 350, treating a probability as a count. 0.14 is the probability, not the number of seeds.",
      hints: ["First find the probability that a seed does **not** germinate.", "Expected number = probability × number of trials."],
    },
    {
      kind: "short",
      id: "exam-c2-q08",
      topicId: "fractions",
      guideRef: "dividing",
      difficulty: "warmup",
      question:
        "Mei's recipe for vegetable curry uses {{1 3/4}} cups of coconut milk for each batch. She has {{8 1/2}} cups of coconut milk.\n\nShe makes as many **full** batches as she can. How much coconut milk is left over? Give your answer in cups.",
      answer: { type: "fraction", n: 3, d: 2, allowDecimal: true, display: "{{1 1/2}} cups" },
      traps: [
        { spec: { type: "number", value: 4 }, feedback: "4 is the number of full batches. The question asks how much coconut milk is left over." },
        { spec: { type: "fraction", n: 6, d: 7 }, feedback: "That's the leftover part of a batch, not a number of cups. Multiply it by the 1.75 cups each batch uses." },
      ],
      solution: [
        "Number of batches: {{8 1/2}} ÷ {{1 3/4}} = {{17/2 * 4/7 = 34/7 = 4 6/7}}, so she can make 4 full batches.",
        "4 batches use 4 × {{1 3/4}} = 7 cups.",
        "Left over: {{8 1/2 - 7 = 1 1/2}} cups. Answer: **{{1 1/2}} cups**.",
      ],
      solutions: [
        {
          label: "Repeated subtraction",
          steps: [
            "Keep taking away {{1 3/4}} cups: {{8 1/2}}, then {{6 3/4}}, then 5, then {{3 1/4}}, then {{1 1/2}}.",
            "That is 4 batches, and {{1 1/2}} is less than {{1 3/4}}, so stop: {{1 1/2}} cups are left.",
          ],
        },
      ],
      commonError: "Giving the number of batches, or the leftover part of a batch ({{6/7}}), instead of the leftover cups.",
      hints: [
        "How many times does {{1 3/4}} fit into {{8 1/2}}? Only whole batches count.",
        "Work out how much the full batches use, then subtract from {{8 1/2}}.",
      ],
    },

    // ============================== CORE ===================================
    {
      kind: "mcq",
      id: "exam-c2-q09",
      topicId: "standard-form",
      guideRef: "comparing-standard-form",
      difficulty: "core",
      question:
        "The table shows the approximate masses of four objects.\n\n| Object | Mass (kg) |\n|---|---|\n| Grain of rice | {{2.2 * 10^(-5)}} |\n| Mosquito | {{2.5 * 10^(-6)}} |\n| Sesame seed | {{3.6 * 10^(-6)}} |\n| $1 coin | {{7.6 * 10^(-3)}} |\n\nWhich list puts them in order from **lightest** to **heaviest**?",
      options: [
        "Mosquito, sesame seed, grain of rice, $1 coin",
        "Grain of rice, mosquito, sesame seed, $1 coin",
        "$1 coin, grain of rice, mosquito, sesame seed",
        "$1 coin, grain of rice, sesame seed, mosquito",
      ],
      answerIndex: 0,
      explanation:
        "Compare the powers of 10 first: {{10^(-6)}} < {{10^(-5)}} < {{10^(-3)}}. So the mosquito and the sesame seed are lightest, and since 2.5 < 3.6 the mosquito comes first. Order: mosquito, sesame seed, grain of rice, $1 coin.\n\nPutting the grain of rice first comes from comparing only the numbers in front (2.2 is the smallest). Starting with the $1 coin comes from thinking {{10^(-6)}} is bigger than {{10^(-3)}} — but the more negative the power, the *smaller* the number. The list ending in the mosquito is in order from heaviest to lightest.",
      hints: [
        "Compare the powers of 10 before you look at the numbers in front.",
        "Which is smaller: {{10^(-6)}} = 0.000 001 or {{10^(-3)}} = 0.001?",
        "When two powers are the same, compare the numbers in front.",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "written",
      id: "exam-c2-q10",
      topicId: "decimals-rounding",
      guideRef: "estimation",
      difficulty: "core",
      question:
        "Jun uses his calculator to work out\n\n{{(39.6 * 0.48)/0.192}}\n\nHe writes down the answer 9.9.\n\n(a) Estimate the value of the calculation by rounding each number to 1 significant figure. Show your working.\n\n(b) Use your estimate to explain why Jun's answer cannot be right. Suggest what mistake he might have made.",
      marks: 3,
      modelAnswer:
        "(a) 39.6 ≈ 40, 0.48 ≈ 0.5 and 0.192 ≈ 0.2, so the estimate is\n\n    {{(40 * 0.5)/0.2 = 20/0.2 = 100}}\n\n(b) The answer should be about 100, but 9.9 is about 10 times too small, so it cannot be right. Jun probably typed 1.92 instead of 0.192 — a decimal point in the wrong place — because {{(39.6 * 0.48)/1.92}} = 9.9 exactly. The correct answer is 99, which is close to the estimate.",
      markScheme: [
        { point: "Rounds each number to 1 s.f.: 40, 0.5 and 0.2", keywords: ["40", "0.5", "0.2"] },
        { point: "Estimate of 100 (20 ÷ 0.2)", keywords: ["100", "20"] },
        {
          point: "Says 9.9 is about 10 times too small, with a likely slip (decimal point / typed 1.92) or the correct value 99",
          keywords: ["10 times", "too small", "1.92", "99", "decimal point", "not sensible"],
        },
      ],
      commonError: "Rounding 0.192 to 0 or 0.48 to 0. One significant figure means the first non-zero digit, so 0.192 → 0.2.",
      hints: [
        "Round 39.6, 0.48 and 0.192 to 1 significant figure each.",
        "Dividing by 0.2 is the same as multiplying by 5.",
        "How many times bigger is your estimate than 9.9? Which calculator slip makes an answer 10 times too small?",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "short",
      id: "exam-c2-q11",
      topicId: "equations",
      guideRef: "forming-equations",
      difficulty: "core",
      question:
        "Ravi's family buys tickets for the school's CCA concert. An adult ticket costs $6.50 more than a student ticket.\n\nThey buy 2 adult tickets and 3 student tickets. They pay $88.50 altogether.\n\nForm and solve an equation to find the price of one **student** ticket. Give your answer in dollars.",
      answer: { type: "number", value: 15.1, display: "$15.10" },
      traps: [
        { spec: { type: "number", value: 17.7 }, feedback: "$17.70 is $88.50 ÷ 5, which pretends all five tickets cost the same. Each adult ticket costs $6.50 more." },
        { spec: { type: "number", value: 21.6 }, feedback: "$21.60 is the price of an adult ticket. The question asks for the student price." },
        { spec: { type: "number", value: 16.4 }, feedback: "You added the extra $6.50 only once — but there are 2 adult tickets, so the extra is 2 × $6.50 = $13." },
      ],
      solution: [
        "Let a student ticket cost $s. Then an adult ticket costs $(s + 6.50).",
        "Total cost: 2(s + 6.5) + 3s = 88.5",
        "Expand and collect: 2s + 13 + 3s = 88.5, so 5s + 13 = 88.5.",
        "Subtract 13: 5s = 75.5. Divide by 5: s = 15.1.",
        "A student ticket costs **$15.10**. Check: 2 × $21.60 + 3 × $15.10 = $43.20 + $45.30 = $88.50 ✓",
      ],
      solutions: [
        {
          label: "Bar model",
          steps: [
            "Draw 5 equal bars, one for each ticket's 'student price'. The 2 adult bars each have an extra $6.50 piece.",
            "Remove the extras: $88.50 − $13 = $75.50 is exactly 5 student prices.",
            "$75.50 ÷ 5 = $15.10.",
          ],
        },
      ],
      commonError: "Writing 2s + 6.5 instead of 2(s + 6.5), so the $6.50 is only counted once.",
      hints: [
        "Let the student price be s dollars. Write the adult price in terms of s.",
        "Write an expression for the cost of 2 adult and 3 student tickets, and set it equal to 88.5.",
        "Expanding gives 5s + 13 = 88.5.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-c2-q12",
      topicId: "expressions",
      guideRef: "substitution",
      difficulty: "core",
      question:
        "The time, T seconds, for a swing to go forwards and back once is given by the formula\n\n{{T = 2 pi sqrt(L/9.8)}}\n\nwhere L is the length of the swing's chains, in metres.\n\nThe chains of a playground swing are 2.5 m long. Work out the value of T. Give your answer to 2 decimal places.",
      answer: { type: "number", value: 3.17, allowFraction: false, display: "3.17 seconds" },
      traps: [
        {
          spec: { type: "number", value: 1.01, tolerance: 0.005 },
          feedback: "It looks as if you square-rooted only the 2.5. The square root covers the whole fraction: work out 2.5 ÷ 9.8 first, then take the square root.",
        },
        {
          spec: { type: "number", value: 1.6, tolerance: 0.005 },
          feedback: "You left out the square root. Work out the square root of (2.5 ÷ 9.8) before multiplying by 2π.",
        },
      ],
      solution: [
        "Substitute L = 2.5: {{T = 2 pi sqrt(2.5/9.8)}}.",
        "Inside the root first: 2.5 ÷ 9.8 = 0.255 10…",
        "Square root: {{sqrt(0.25510)}} = 0.505 07…",
        "Multiply by 2π: T = 2 × π × 0.505 07… = 3.173 48…",
        "To 2 decimal places: **T = 3.17 seconds**.",
      ],
      commonError: "Typing √2.5 ÷ 9.8 on the calculator, which square-roots only the 2.5.",
      hints: [
        "Replace L with 2.5 in the formula.",
        "Work from the inside out: the fraction first, then the square root, then multiply by 2π.",
        "On the calculator, put the whole fraction inside the square root: √(2.5 ÷ 9.8).",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-c2-q13",
      topicId: "averages-spread",
      guideRef: "working-backwards",
      difficulty: "core",
      question:
        "Two Year 8 classes recorded how many hours per week their students spend on CCA activities.\n\n| Class | Number of students | Mean time (hours) |\n|---|---|---|\n| 8A | 12 | 4.5 |\n| 8B | 18 | 6.2 |\n\nWork out the mean time for all 30 students together. Give your answer in hours.",
      answer: { type: "number", value: 5.52, display: "5.52 hours" },
      traps: [
        {
          spec: { type: "number", value: 5.35 },
          feedback: "5.35 is the mean of the two means. That only works when the classes are the same size — 8B has more students, so its mean counts for more.",
        },
        {
          spec: { type: "number", value: 5.18 },
          feedback: "You've matched the means to the wrong class sizes. 8A has 12 students with mean 4.5; 8B has 18 students with mean 6.2.",
        },
      ],
      solution: [
        "Total for 8A = 12 × 4.5 = 54 hours.",
        "Total for 8B = 18 × 6.2 = 111.6 hours.",
        "Total for all 30 students = 54 + 111.6 = 165.6 hours.",
        "Mean = 165.6 ÷ 30 = **5.52 hours**.",
      ],
      commonError: "Averaging the two means: (4.5 + 6.2) ÷ 2 = 5.35.",
      hints: [
        "A mean hides a total: total = mean × number of values.",
        "Find the total number of hours for each class.",
        "Add the two totals and divide by the number of students (30), not by 2.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "mcq",
      id: "exam-c2-q14",
      topicId: "rates-units",
      guideRef: "density-and-rates",
      difficulty: "core",
      question:
        "Mei makes a drink by mixing 600 cm³ of gula melaka syrup with 400 cm³ of water.\n\n- The syrup has a density of 1.3 g/cm³.\n- The water has a density of 1.0 g/cm³.\n\nAssume the drink has a volume of exactly 1000 cm³. What is the density of the drink?",
      options: ["1.15 g/cm³", "1.12 g/cm³", "1.18 g/cm³", "2.3 g/cm³"],
      answerIndex: 2,
      explanation:
        "Find each mass: syrup 600 × 1.3 = 780 g, water 400 × 1.0 = 400 g. Total mass = 1180 g in 1000 cm³, so density = 1180 ÷ 1000 = 1.18 g/cm³.\n\n1.15 g/cm³ is the mean of the two densities — it ignores the fact that there is more syrup than water. 1.12 g/cm³ pairs the 1.3 with the 400 cm³ by mistake. 2.3 g/cm³ adds the densities, but a mixture can never be denser than its densest ingredient.",
      hints: [
        "Density = mass ÷ volume. Find the **mass** of the syrup and of the water.",
        "Mass = density × volume: 600 × 1.3 and 400 × 1.0.",
        "Divide the total mass by the total volume.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "mcq",
      id: "exam-c2-q15",
      topicId: "constructions-bearings",
      guideRef: "back-bearings",
      difficulty: "core",
      question:
        "A drone flies from P to Q on a bearing of 064°. It then flies from Q to R on a bearing of 155°.\n\nWork out the size of angle PQR.",
      diagram: DRONE_BEARINGS,
      options: ["91°", "116°", "25°", "89°"],
      answerIndex: 3,
      explanation:
        "The bearing of P **from Q** is the back bearing: 064° + 180° = 244°. Angle PQR is the angle between the directions 155° and 244° measured at Q: 244° − 155° = 89°.\n\nAnother way: the North lines at P and Q are parallel, so the angle between South at Q and QP is 64° (alternate angles). The angle between South and QR is 180° − 155° = 25°. So angle PQR = 64° + 25° = 89°.\n\n91° is 155° − 64°: that is how far the drone *turns*, not the angle inside the triangle. 116° is 180° − 64°, and 25° is only one of the two parts.",
      hints: [
        "Draw a North line at Q. What is the bearing of P **from Q**?",
        "The back bearing is 064° + 180°.",
        "Angle PQR is the gap between the bearings of P and of R, both measured from Q.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-c2-q16",
      topicId: "angles-polygons",
      guideRef: "parallel-lines",
      difficulty: "core",
      question:
        "The diagram shows the front of a bamboo A-frame for a vegetable garden.\n\nTriangle ABC is isosceles with AB = AC. The crossbar DE is parallel to BC, with D on AB and E on AC.\n\nAngle BAC = 2x° and angle BDE = (5x − 14)°.\n\nWork out the value of x.",
      diagram: A_FRAME,
      answer: { type: "number", value: 26 },
      traps: [
        { spec: { type: "number", value: 52 }, feedback: "52° is the size of angle BAC, which is 2x. The question asks for x." },
        { spec: { type: "number", value: 116 }, feedback: "116° is the size of angle BDE. Now use it to find x." },
      ],
      solution: [
        "The base angles of an isosceles triangle are equal: angle ABC = {{(180 - 2x)/2}} = 90 − x.",
        "DE is parallel to BC, so angle BDE and angle DBC are co-interior angles: they add up to 180°.",
        "So (5x − 14) + (90 − x) = 180, which gives 4x + 76 = 180.",
        "4x = 104, so **x = 26**.",
        "Check: angle BAC = 52°, each base angle = 64°, angle BDE = 5 × 26 − 14 = 116°, and 116° + 64° = 180° ✓",
      ],
      commonError: "Setting angle BDE equal to angle ABC. The corresponding angles are ADE and ABC; BDE and ABC are co-interior, so they add to 180°.",
      hints: [
        "Write the base angle ABC in terms of x.",
        "DE ∥ BC. Which pair of angles at D and B add up to 180°?",
        "Angle BDE + angle DBC = 180°. Form an equation and solve it.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "exam-c2-q17",
      topicId: "sequences-graphs",
      guideRef: "special-sequences",
      difficulty: "core",
      question:
        "Zara drops a rubber ball from a height of 2.5 m. After each bounce, the ball rises to 80% of the height it has just fallen from.\n\nAfter which bounce does the ball **first** rise to a height of less than 30 cm? Give the number of the bounce.",
      answer: { type: "number", value: 10, display: "the 10th bounce" },
      traps: [
        {
          spec: { type: "number", value: 9 },
          feedback: "After bounce 9 the ball rises to 2.5 × 0.8⁹ ≈ 0.336 m = 33.6 cm — still not below 30 cm.",
        },
        {
          spec: { type: "number", value: 5 },
          feedback: "The ball doesn't lose the same 0.5 m each time — it loses 20% of a smaller height each bounce. Multiply by 0.8 each time (a geometric sequence).",
        },
      ],
      solution: [
        "The heights form a geometric sequence: multiply by 0.8 after each bounce.",
        "Heights after bounces 1 to 10, in metres: 2, 1.6, 1.28, 1.024, 0.819, 0.655, 0.524, 0.419, 0.336, 0.268.",
        "30 cm = 0.3 m. After bounce 9 the height is 0.336 m (still above 0.3 m); after bounce 10 it is 0.268 m.",
        "So the ball first rises less than 30 cm after **bounce 10**.",
      ],
      commonError: "Subtracting 0.5 m every bounce (20% of the *first* height) instead of multiplying by 0.8 each time.",
      hints: [
        "Write the first few heights: 2.5 m, then 2.5 × 0.8, then …",
        "Each height is the one before × 0.8. On a calculator, type 2.5 then keep pressing × 0.8 =.",
        "Change 30 cm into metres, and keep going until the height first drops below it.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "exam-c2-q18",
      topicId: "percentages",
      guideRef: "reverse-percentages",
      difficulty: "core",
      question:
        "A bookshop gives members 15% off the marked price of every book. GST at 9% is then added to the discounted price.\n\nSiti is a member. She pays $74.12 for a box set of books. What was the marked price of the box set? Give your answer in dollars.",
      answer: { type: "number", value: 80, display: "$80" },
      traps: [
        {
          spec: { type: "number", value: 78.85, tolerance: 0.01 },
          feedback: "You treated '15% off, then 9% on' as a single 6% decrease. The two percentages are of different amounts, so use multipliers: × 0.85, then × 1.09.",
        },
        {
          spec: { type: "number", value: 77.57, tolerance: 0.01 },
          feedback: "Undoing a percentage change is not the opposite percentage of the new amount. To undo × 1.09, divide by 1.09; to undo × 0.85, divide by 0.85.",
        },
      ],
      solution: [
        "15% off means × 0.85. Adding 9% GST means × 1.09.",
        "Marked price × 0.85 × 1.09 = 74.12",
        "Undo in reverse order: 74.12 ÷ 1.09 = 68 (the price after the discount), then 68 ÷ 0.85 = 80.",
        "The marked price was **$80**. Check: 80 × 0.85 = 68 and 68 × 1.09 = 74.12 ✓",
      ],
      solutions: [
        {
          label: "One combined multiplier",
          steps: [
            "0.85 × 1.09 = 0.9265, so the price paid is 92.65% of the marked price.",
            "Marked price = 74.12 ÷ 0.9265 = $80.",
          ],
        },
      ],
      commonError: "Adding 15% to $74.12 and taking 9% off, instead of dividing by the multipliers.",
      hints: [
        "Write each change as a multiplier.",
        "Marked price × 0.85 × 1.09 = $74.12.",
        "Undo the multipliers in reverse order: divide by 1.09, then by 0.85.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "exam-c2-q19",
      topicId: "rates-units",
      guideRef: "speed",
      difficulty: "core",
      question:
        "Jun runs 2.4 km at 12 km/h. He then walks a further 1.8 km at 5.4 km/h.\n\nWork out his average speed for the whole 4.2 km, in **metres per second**. Give your answer to 2 decimal places.",
      answer: { type: "number", value: 2.19, allowFraction: false, display: "2.19 m/s" },
      traps: [
        {
          spec: { type: "number", value: 7.875, tolerance: 0.03 },
          feedback: "That's his average speed in km/h. Change it to m/s: multiply by 1000 and divide by 3600 (or just divide by 3.6).",
        },
        {
          spec: { type: "number", value: 2.42, tolerance: 0.005 },
          feedback: "2.42 m/s comes from averaging the two speeds. Jun spends much longer walking than running, so the slow part counts for more. Use total distance ÷ total time.",
        },
      ],
      solution: [
        "Time running = 2.4 ÷ 12 = 0.2 h. Time walking = 1.8 ÷ 5.4 = {{1/3}} h.",
        "Total time = {{0.2 + 1/3 = 8/15}} h (32 minutes).",
        "Average speed = 4.2 ÷ {{8/15}} = 7.875 km/h.",
        "In m/s: 7.875 × 1000 ÷ 3600 = 2.1875 m/s.",
        "To 2 decimal places: **2.19 m/s**.",
      ],
      solutions: [
        {
          label: "Metres and seconds from the start",
          steps: [
            "12 km/h = 12 000 m ÷ 3600 s = {{10/3}} m/s, so running 2400 m takes 2400 ÷ {{10/3}} = 720 s.",
            "5.4 km/h = 5400 m ÷ 3600 s = 1.5 m/s, so walking 1800 m takes 1800 ÷ 1.5 = 1200 s.",
            "Average speed = 4200 m ÷ 1920 s = 2.1875 ≈ 2.19 m/s.",
          ],
        },
      ],
      commonError: "Taking the mean of 12 km/h and 5.4 km/h instead of dividing total distance by total time.",
      hints: [
        "Average speed = total distance ÷ total time — not the mean of the two speeds.",
        "Find each time: 2.4 ÷ 12 hours and 1.8 ÷ 5.4 hours.",
        "Find the average speed in km/h, then divide by 3.6 to change km/h into m/s.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-c2-q20",
      topicId: "circles",
      guideRef: "area-of-a-circle",
      difficulty: "core",
      question:
        "A circular lotus pond in Bishan Park has a circumference of 47.1 m.\n\nWork out the area of the pond. Give your answer in m² to 3 significant figures.",
      answer: { type: "number", value: 177, display: "177 m²" },
      traps: [
        {
          spec: { type: "number", value: 706 },
          feedback: "It looks as if you used the diameter (about 15 m) as the radius. C = πd gives the diameter, so halve it before using A = πr².",
        },
        {
          spec: { type: "number", value: 353 },
          feedback: "You used 2πr². The area of a circle is πr² (2πr is the circumference).",
        },
      ],
      solution: [
        "C = 2πr, so r = 47.1 ÷ (2π) = 7.496 2… m.",
        "A = πr² = π × 7.496 2…² = 176.53… m².",
        "To 3 significant figures: **177 m²**.",
      ],
      solutions: [
        {
          label: "Using A = ½ × C × r",
          steps: [
            "Cut a circle into thin sectors and rearrange them: they make a shape close to a rectangle, ½C long and r tall.",
            "A = ½ × 47.1 × 7.496 2… = 176.53… ≈ 177 m².",
          ],
        },
      ],
      commonError: "Mixing up radius and diameter, or rounding the radius too early.",
      hints: [
        "You can't find the area until you know the radius.",
        "C = 2πr. Rearrange to find r.",
        "Keep the unrounded radius in your calculator, then use A = πr².",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "mcq",
      id: "exam-c2-q21",
      topicId: "linear-graphs",
      guideRef: "real-life-graphs",
      difficulty: "core",
      question:
        "The distance–time graph shows two journeys between Marcus's home and the library, which are 6 km apart.\n\n- Marcus cycles from his home to the library, stopping once on the way.\n- Hana walks from the library towards Marcus's home.\n\nWhich statement is true?",
      diagram: RIDE_GRAPH,
      options: [
        "Marcus cycles faster before his stop than after it.",
        "Marcus and Hana pass each other while Marcus is still cycling.",
        "Hana walks at a speed of 10 km/h.",
        "Marcus's average speed for his whole journey is 14 km/h.",
      ],
      answerIndex: 0,
      explanation:
        "Before his stop Marcus covers 4 km in 15 minutes = 16 km/h. After it he covers 2 km in 10 minutes = 12 km/h. So he is faster before the stop — that part of the graph is steeper.\n\nThe lines cross at 09:20, where Marcus's line is flat: he is stopped, not cycling. Hana covers 6 km in 60 minutes, which is 6 km/h (10 km/h misreads '1 km every 10 minutes'). 14 km/h is the mean of 16 and 12, but average speed = total distance ÷ total time = 6 km ÷ 35 minutes ≈ 10.3 km/h.",
      hints: [
        "A steeper line means a faster speed. Compare the two sloping parts of Marcus's line.",
        "Speed = distance ÷ time. Read off how far and how long for each section.",
        "Where do the two lines cross? What is Marcus doing at that moment?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "exam-c2-q22",
      topicId: "perimeter-area-volume",
      guideRef: "surface-area",
      difficulty: "core",
      question:
        "A tent is a triangular prism, as shown.\n\n- Each triangular end has a base of 1.6 m, sloping sides of 1.7 m and a height of 1.5 m.\n- The tent is 2.4 m long.\n\nThe two ends and the two sloping sides are made of canvas. The floor is not. Canvas costs $12.50 per m².\n\nWork out the cost of the canvas for the tent. Give your answer in dollars.",
      diagram: TENT,
      answer: { type: "number", value: 132, display: "$132" },
      traps: [
        { spec: { type: "number", value: 180 }, feedback: "$180 includes the floor (1.6 m × 2.4 m). The floor is not made of canvas." },
        { spec: { type: "number", value: 162 }, feedback: "The area of a triangle is half of base × height. Each end is ½ × 1.6 × 1.5 = 1.2 m²." },
        { spec: { type: "number", value: 120 }, feedback: "The sloping rectangles are 1.7 m wide (the slant edge), not 1.5 m (the height of the tent)." },
        { spec: { type: "number", value: 10.56 }, feedback: "10.56 m² is the area of canvas. Now multiply by $12.50 per m²." },
      ],
      solution: [
        "Each triangular end: ½ × 1.6 × 1.5 = 1.2 m². Two ends: 2.4 m².",
        "Each sloping side is a rectangle 1.7 m by 2.4 m: 1.7 × 2.4 = 4.08 m². Two sides: 8.16 m².",
        "Total canvas = 2.4 + 8.16 = 10.56 m².",
        "Cost = 10.56 × $12.50 = **$132**.",
      ],
      commonError: "Using the height (1.5 m) as the width of the sloping sides, or including the floor.",
      hints: [
        "Picture the net of the tent. Which faces are canvas?",
        "There are 2 triangles and 2 rectangles. Is the width of each sloping rectangle 1.5 m or 1.7 m?",
        "Find the total area of canvas, then multiply by $12.50.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "exam-c2-q23",
      topicId: "probability",
      guideRef: "two-way-tables-venn",
      difficulty: "core",
      question:
        "240 students in Years 7 and 8 were asked how they travel to school. The two-way table shows some of the results.\n\n|  | MRT | Bus | Walk | Total |\n|---|---|---|---|---|\n| Year 7 | 46 |  | 17 | 120 |\n| Year 8 |  |  |  |  |\n| Total | 98 | 81 |  | 240 |\n\nOne of the students who travels by **bus** is chosen at random. What is the probability that this student is in Year 8? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 8, d: 27, simplest: true },
      traps: [
        {
          spec: { type: "fraction", n: 1, d: 10 },
          feedback: "Dividing 24 by 240 picks from all 240 students. You know the student takes the bus, so choose from the 81 bus users only.",
        },
        {
          spec: { type: "fraction", n: 1, d: 5 },
          feedback: "24 out of 120 is the proportion of Year 8 students who take the bus. Here the student is picked from the bus users, so divide by 81.",
        },
        { spec: { type: "fraction", n: 19, d: 27 }, feedback: "57 out of 81 is the probability that the bus user is in Year 7." },
      ],
      solution: [
        "Year 7 bus = 120 − 46 − 17 = 57.",
        "Year 8 bus = 81 − 57 = 24.",
        "The student is chosen from the 81 bus users, so P(Year 8) = {{24/81}}.",
        "Divide top and bottom by 3: **{{8/27}}**.",
      ],
      commonError: "Dividing by 240 (all the students) instead of 81 (only the bus users).",
      hints: [
        "Fill in the Year 7 bus cell first — the Year 7 row must add up to 120.",
        "Year 8 bus = total bus − Year 7 bus.",
        "You are choosing only from the students who take the bus. How many is that?",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "written",
      id: "exam-c2-q24",
      topicId: "statistics",
      guideRef: "choosing-and-misleading",
      difficulty: "core",
      question:
        "A smoothie stall at a hawker centre puts up this chart with the headline:\n\n> Sales of our mango smoothies have more than TRIPLED since January!\n\n(a) Explain why the chart is misleading.\n\n(b) Work out the actual percentage increase in sales from January to March. Give your answer to the nearest whole number.",
      diagram: SMOOTHIE_CHART,
      marks: 3,
      modelAnswer:
        "(a) The vertical axis starts at 400, not at 0. This makes the bar heights out of proportion: the March bar is about 3.5 times as tall as the January bar, but sales only went up from 420 to 470.\n\n(b) Increase = 470 − 420 = 50.\n\n    Percentage increase = {{50/420}} × 100 = 11.9…% ≈ 12%\n\nSales rose by about 12% — nowhere near tripling.",
      markScheme: [
        { point: "The vertical axis does not start at 0 (it starts at 400) — a truncated axis", keywords: ["400", "zero", "start", "truncated", "axis"] },
        {
          point: "So the bar heights are not in proportion: March looks about 3.5 times January, but 470 is not 3 × 420",
          keywords: ["height", "proportion", "taller", "420", "470", "times"],
        },
        { point: "Percentage increase = 50 ÷ 420 × 100 ≈ 12%", keywords: ["12", "11.9", "50"] },
      ],
      commonError: "Describing the colours or the title instead of the scale. Also, dividing the increase by the *new* value (50 ÷ 470) instead of the original.",
      hints: [
        "Look at the numbers on the vertical axis. Where does the scale start?",
        "Read off the January and March sales. Is 470 really three times 420?",
        "Percentage increase = increase ÷ original value × 100.",
      ],
    },

    // ============================ CHALLENGE ================================
    {
      kind: "short",
      id: "exam-c2-q25",
      topicId: "ratio-proportion",
      guideRef: "scale-and-maps",
      difficulty: "challenge",
      question:
        "On a map with scale 1 : 25 000, a nature reserve covers an area of 12 cm².\n\nWork out the real area of the nature reserve, in km².",
      answer: { type: "number", value: 0.75, display: "0.75 km²" },
      traps: [
        {
          spec: { type: "number", value: 3 },
          feedback: "You multiplied the area by 25 000 — but the scale is for lengths. Area is length × length, so areas are scaled by 25 000².",
        },
        {
          spec: { type: "number", value: 0.00003 },
          feedback: "You scaled the area by 25 000 instead of by 25 000². A 1 cm by 1 cm square on the map is a real square 250 m by 250 m.",
        },
      ],
      solution: [
        "1 cm on the map = 25 000 cm in real life = 250 m = 0.25 km.",
        "So 1 cm² on the map is a real square 0.25 km by 0.25 km, with area 0.0625 km².",
        "Real area = 12 × 0.0625 = **0.75 km²**.",
      ],
      solutions: [
        {
          label: "Area scale factor",
          steps: [
            "Lengths are multiplied by 25 000, so areas are multiplied by 25 000² = 625 000 000.",
            "Real area = 12 × 625 000 000 = 7 500 000 000 cm².",
            "1 km² = 100 000 cm × 100 000 cm = 10 000 000 000 cm², so the area is 7 500 000 000 ÷ 10 000 000 000 = 0.75 km².",
          ],
        },
      ],
      commonError: "Multiplying the map area by the length scale (25 000) instead of by 25 000².",
      hints: [
        "What real distance does 1 cm on the map stand for? Give it in km.",
        "Think about one 1 cm × 1 cm square on the map. How big is it in real life?",
        "Each map square centimetre is 0.25 km × 0.25 km in real life. How many of them are there?",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "exam-c2-q26",
      topicId: "factors-multiples",
      guideRef: "hcf-lcm",
      difficulty: "challenge",
      question:
        "Two whole numbers have a highest common factor (HCF) of 18 and a lowest common multiple (LCM) of 540.\n\nThe sum of the two numbers is as small as possible. Find the two numbers.",
      answer: { type: "list", values: [90, 108], display: "90 and 108" },
      traps: [
        {
          spec: { type: "list", values: [18, 540] },
          feedback: "18 and 540 do have HCF 18 and LCM 540 — but their sum, 558, is the largest possible. There are other pairs to check.",
        },
        {
          spec: { type: "list", values: [54, 180] },
          feedback: "54 and 180 work, but another pair has an even smaller sum. Check every possibility.",
        },
        {
          spec: { type: "list", values: [36, 270] },
          feedback: "36 and 270 work, but another pair has a smaller sum. Check every possibility.",
        },
      ],
      solution: [
        "Both numbers are multiples of 18, so write them as 18m and 18n.",
        "m and n can share no common factor — otherwise the HCF would be bigger than 18.",
        "HCF × LCM = product of the two numbers: 18 × 540 = 18m × 18n, so mn = 30.",
        "Pairs (m, n) with mn = 30 and no common factor: (1, 30), (2, 15), (3, 10), (5, 6).",
        "These give 18 and 540 (sum 558), 36 and 270 (sum 306), 54 and 180 (sum 234), 90 and 108 (sum 198).",
        "Smallest sum: **90 and 108**. Check: 90 = 2 × 3² × 5 and 108 = 2² × 3³, so HCF = 2 × 3² = 18 and LCM = 2² × 3³ × 5 = 540 ✓",
      ],
      commonError: "Stopping at the first pair found (18 and 540) without checking the others.",
      hints: [
        "Both numbers must be multiples of 18. Write them as 18 × something.",
        "For two numbers, HCF × LCM = the product of the numbers. What must the two 'somethings' multiply to?",
        "The two 'somethings' multiply to 30 and must have no common factor. List every pair — for a fixed product, which pair has the smallest sum?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "written",
      id: "exam-c2-q27",
      topicId: "expressions",
      guideRef: "factorising",
      difficulty: "challenge",
      question:
        "Hana adds five consecutive odd numbers:\n\n    1 + 3 + 5 + 7 + 9 = 25\n    21 + 23 + 25 + 27 + 29 = 125\n    41 + 43 + 45 + 47 + 49 = 225\n\nShe says: *\"The sum of any five consecutive odd numbers is always an odd multiple of 5.\"*\n\n(a) Use algebra to prove that Hana is right.\n\n(b) Ethan looks at the same examples and says: *\"The sum is always a multiple of 25.\"* Show that Ethan is wrong.",
      marks: 4,
      modelAnswer:
        "(a) Let the smallest number be 2n + 1, where n is a whole number. The five numbers are 2n + 1, 2n + 3, 2n + 5, 2n + 7 and 2n + 9.\n\n    Sum = 10n + 25 = 5(2n + 5)\n\nSo the sum is 5 × (2n + 5), which is a multiple of 5. Also 2n is even, so 2n + 5 is odd, and 5 × an odd number is odd. So the sum is always an odd multiple of 5.\n\n(b) 3 + 5 + 7 + 9 + 11 = 35, which is not a multiple of 25. One counterexample is enough to show that Ethan's claim is not always true.",
      markScheme: [
        { point: "Writes five consecutive odd numbers algebraically, e.g. 2n + 1, 2n + 3, …, 2n + 9 (or m − 4, m − 2, m, m + 2, m + 4)", keywords: ["2n+1", "2n + 1", "2n+3", "2n + 3", "m-4", "m+4"] },
        { point: "Adds them to get 10n + 25 (or 5m)", keywords: ["10n+25", "10n + 25", "5m"] },
        { point: "Factorises to 5(2n + 5) and explains 2n + 5 is odd, so the sum is an odd multiple of 5", keywords: ["5(2n+5)", "5(2n + 5)", "odd", "multiple of 5", "even"] },
        { point: "Gives a counterexample for Ethan, e.g. 3 + 5 + 7 + 9 + 11 = 35", keywords: ["35", "counterexample", "not a multiple of 25", "45", "55", "65"] },
      ],
      solutions: [
        {
          label: "Use symmetry: start from the middle",
          steps: [
            "Call the middle number m (m is odd). The five numbers are m − 4, m − 2, m, m + 2, m + 4.",
            "The −4 and +4 cancel, and so do the −2 and +2: the sum is 5m.",
            "m is odd, so 5m is an odd multiple of 5. It is a multiple of 25 only when m is a multiple of 5 — for example, m = 7 gives 35, which is not.",
          ],
        },
      ],
      commonError: "Checking more examples instead of proving — examples can never show something is *always* true. Or writing n, n + 1, n + 2, … which are consecutive whole numbers, not consecutive odd numbers.",
      hints: [
        "2n + 1 is always odd. What is the next odd number after 2n + 1?",
        "Add your five expressions and collect like terms.",
        "Factorise the sum. Why must the number in the bracket be odd?",
        "For (b), one example that fails is enough. Look for a middle number that is not a multiple of 5.",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "written",
      id: "exam-c2-q28",
      topicId: "percentages",
      guideRef: "percentage-change",
      difficulty: "challenge",
      question:
        "The table shows information about the students at a school.\n\n| Year | Students at the school | Students who cycle to school |\n|---|---|---|\n| 2023 | 1250 | 150 |\n| 2025 | 1000 | 140 |\n\nThe school newsletter says: *\"Fewer students cycle to school now, so cycling has become less popular.\"*\n\nEthan says: *\"No — cycling has become more popular. The percentage of students who cycle has gone up by 2%.\"*\n\n(a) Work out the percentage of students who cycled to school in 2023 and in 2025.\n\n(b) Comment on both statements. Use a percentage change in your answer.",
      marks: 4,
      modelAnswer:
        "(a) 2023: {{150/1250}} × 100 = 12%. 2025: {{140/1000}} × 100 = 14%.\n\n(b) The newsletter compares the *numbers* of cyclists, but the school also got smaller. A greater proportion of students cycle now (14% instead of 12%), so cycling has become **more** popular — the newsletter is wrong.\n\nEthan is right that cycling is more popular, but the rise from 12% to 14% is 2 **percentage points**, not 2%. As a percentage change, the proportion who cycle went up by\n\n    {{2/12}} × 100 = 16.7% (to 1 d.p.)",
      markScheme: [
        { point: "12% in 2023 and 14% in 2025", keywords: ["12%", "14%", "12", "14"] },
        {
          point: "Newsletter compares raw numbers; the school is smaller, so a bigger proportion cycle and cycling is more popular",
          keywords: ["proportion", "smaller", "fewer students", "more popular", "number"],
        },
        { point: "Ethan's rise is 2 percentage points, not 2%", keywords: ["percentage points", "points", "not 2%"] },
        { point: "Percentage increase = 2 ÷ 12 × 100 ≈ 16.7%", keywords: ["16.7", "16.6", "17", "2/12"] },
      ],
      commonError: "Calling a change from 12% to 14% 'an increase of 2%'. It is 2 percentage points — a relative increase of about 16.7%.",
      hints: [
        "Percentage who cycle = cyclists ÷ students × 100, for each year.",
        "Did the number of students at the school stay the same? What does that mean for comparing raw numbers?",
        "From 12% to 14% is a change of 2 percentage points. What is that change as a percentage of the original 12%?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "exam-c2-q29",
      topicId: "circles",
      guideRef: "compound-circle-shapes",
      difficulty: "challenge",
      question:
        "Three circular coasters, each with radius 5 cm, lie flat on a table. Each coaster touches the other two, leaving a small gap between them (shaded in the diagram).\n\nThe centres of the coasters form an equilateral triangle with sides of 10 cm and a height of 8.66 cm.\n\nWork out the area of the gap. Use the π key on your calculator and give your answer in cm² to 3 significant figures.",
      diagram: COASTERS,
      answer: { type: "number", value: 4.03, allowFraction: false, display: "4.03 cm²" },
      traps: [
        { spec: { type: "number", value: 43.3 }, feedback: "43.3 cm² is the whole triangle. Take away the parts of the coasters that lie inside it." },
        { spec: { type: "number", value: 47.3, tolerance: 0.05 }, feedback: "Check the triangle: its area is half of base × height, ½ × 10 × 8.66 = 43.3 cm²." },
        {
          spec: { type: "number", value: -15.6, tolerance: 0.05 },
          feedback: "An area can't be negative! Each angle of an equilateral triangle is 60°, not 90°, so each piece of coaster is one sixth of a circle, not a quarter.",
        },
      ],
      solution: [
        "Area of the triangle = ½ × 10 × 8.66 = 43.3 cm².",
        "Inside the triangle, each coaster covers a sector. Each angle of an equilateral triangle is 60°, so each sector is {{60/360 = 1/6}} of a circle.",
        "Three sectors make {{3 * 1/6 = 1/2}} a circle: ½ × π × 5² = 39.269… cm².",
        "Gap = 43.3 − 39.269… = 4.030… ≈ **4.03 cm²**.",
      ],
      commonError: "Using quarter circles (90°) at each corner instead of sixths (60°).",
      hints: [
        "Gap = the triangle minus the parts of the coasters inside the triangle.",
        "What is each angle of an equilateral triangle? So what fraction of a coaster lies inside the triangle at each corner?",
        "Put the three sectors together. What fraction of a whole circle do they make?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "exam-c2-q30",
      topicId: "transformations-pythagoras",
      guideRef: "pythagoras",
      difficulty: "challenge",
      question:
        "A cylindrical pillar at an HDB void deck has a diameter of 35 cm and a height of 3.5 m.\n\nFor Deepavali, Ravi winds a string of lights around the pillar. The string starts at the bottom, goes round the pillar exactly 4 times while rising steadily, and finishes at the top, directly above where it started.\n\nWork out the length of the string of lights. Give your answer in metres to 3 significant figures.",
      diagram: PILLAR,
      answer: { type: "number", value: 5.62, allowFraction: false, display: "5.62 m" },
      traps: [
        {
          spec: { type: "number", value: 7.9, tolerance: 0.006 },
          feedback: "You added the distance around (4 × the circumference) to the height. The string goes round and up at the same time, so it makes a slanted line — use Pythagoras.",
        },
        {
          spec: { type: "number", value: 9.47, tolerance: 0.006 },
          feedback: "35 cm is the diameter, so one circumference is π × 0.35 m. It looks as if you used 35 cm as the radius.",
        },
        {
          spec: { type: "number", value: 4.4, tolerance: 0.006 },
          feedback: "4.40 m is just 4 times round the pillar. The string also climbs 3.5 m while it goes round.",
        },
      ],
      solution: [
        "Imagine cutting the curved surface of the pillar straight down and unrolling it flat. It becomes a rectangle 3.5 m tall.",
        "One time round is one circumference: π × 0.35 = 1.099 5… m. Four times round is 4 × π × 0.35 = 4.398… m, the width of the rectangle.",
        "On the unrolled rectangle the string is a straight line — the diagonal.",
        "Length² = 4.398…² + 3.5² = 19.344… + 12.25 = 31.594…",
        "Length = {{sqrt(31.594)}} = 5.620… m ≈ **5.62 m**.",
      ],
      solutions: [
        {
          label: "One turn at a time",
          steps: [
            "Unroll just one turn: a rectangle π × 0.35 = 1.099 5… m wide and 3.5 ÷ 4 = 0.875 m tall.",
            "One turn = {{sqrt(1.0996^2 + 0.875^2)}} = 1.405… m.",
            "Four turns = 4 × 1.405… = 5.62 m. It's the same answer, because the four slanted pieces line up into one straight line when unrolled.",
          ],
        },
      ],
      commonError: "Forgetting to change 35 cm into 0.35 m, or using 35 cm as the radius.",
      hints: [
        "Imagine the pillar's curved surface is a label you can peel off and lay flat. What shape is it?",
        "On the flat rectangle, what does the string look like? How wide is the rectangle for 4 turns, and how tall?",
        "Width = 4 × π × 0.35 m and height = 3.5 m. Use Pythagoras to find the diagonal.",
      ],
      strategy: "Draw a diagram",
    },
  ],
};
