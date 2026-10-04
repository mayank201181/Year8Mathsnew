// Collecting & Representing Data — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "statistics-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "statistics-p3-q01",
        question:
          "Zara is investigating the durians sold at a stall in Geylang. For each durian she records:\n\n- its variety (for example, Mao Shan Wang)\n- its mass, in kg\n- the number of seeds inside it\n- the time it takes to open, in seconds\n- the length of its longest spike, in mm\n- the country where it was grown\n\nHow many of these six variables are **continuous** data?",
        answer: { type: "number", value: 3, display: "3 (mass, time and length)" },
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "The number of seeds is *counted* (you can't have 2.5 seeds), so it is discrete, not continuous." },
          { spec: { type: "number", value: 1 }, feedback: "Mass is continuous, but it isn't the only measured quantity. Time and length are measured too." },
        ],
        solution: [
          "Continuous data is **measured** and can take any value in a range. Discrete data is **counted**. Categorical data is words or labels.",
          "Variety and country → categorical.",
          "Number of seeds → counted, so discrete.",
          "Mass, time and length → measured, so continuous.",
          "That makes 3 continuous variables.",
        ],
        commonError: "Thinking all numerical data is continuous. Counts, like the number of seeds, are discrete.",
        difficulty: "warmup",
        guideRef: "data-and-sampling",
        hints: [
          "Ask of each one: is it a word, a count, or a measurement?",
          "Anything measured with scales, a stopwatch or a ruler is continuous.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "statistics-p3-q02",
        question:
          "The 40 pupils in 8E voted for the colour of their class T-shirt.\n\n| Colour | Votes |\n|---|---|\n| Blue | 14 |\n| Green | 9 |\n| Black | 11 |\n| Orange | 6 |\n\nThey show the result in a pie chart. What angle should the **blue** sector have? Give your answer in degrees.",
        answer: { type: "number", value: 126, display: "126°" },
        traps: [
          { spec: { type: "number", value: 35 }, feedback: "35% of the class chose blue. But a pie chart shares out 360°, not 100. Find 35% of 360°." },
          { spec: { type: "number", value: 14 }, feedback: "14 is the number of votes. Each vote is worth 360° ÷ 40 = 9°." },
        ],
        solution: [
          "The whole circle, 360°, stands for all 40 pupils.",
          "Each pupil gets 360° ÷ 40 = 9°.",
          "Blue: 14 × 9° = 126°.",
          "Check: green 81°, black 99°, orange 54°, and 126 + 81 + 99 + 54 = 360 ✓",
        ],
        difficulty: "warmup",
        guideRef: "charts",
        hints: ["How many degrees does one pupil's vote get?", "360° ÷ 40 = 9° per pupil."],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "statistics-p3-q03",
        question:
          "The stem-and-leaf diagram shows the 100 m times of the 15 girls who ran in the heats on Sports Day.\n\n| Stem | Leaf |\n|---|---|\n| 13 | 2 6 8 |\n| 14 | 0 1 4 5 7 9 |\n| 15 | 2 3 3 8 |\n| 16 | 0 4 |\n\nKey: 14 | 1 means 14.1 seconds\n\nA runner needs a time **under 14.5 seconds** to reach the final. How many runners reach the final?",
        answer: { type: "number", value: 6 },
        traps: [
          { spec: { type: "number", value: 7 }, feedback: "A time of 14.5 s is not *under* 14.5 s, so that runner just misses out." },
          { spec: { type: "number", value: 9 }, feedback: "9 runners were slower. In a race the *smaller* time is better, so count the times below 14.5 s." },
        ],
        solution: [
          "Use the key: 13 | 2 is 13.2 s, 14 | 4 is 14.4 s, and so on.",
          "Times under 14.5 s: 13.2, 13.6, 13.8 (stem 13) and 14.0, 14.1, 14.4 (stem 14).",
          "14.5 is not under 14.5, so stop there.",
          "6 runners reach the final.",
        ],
        difficulty: "warmup",
        guideRef: "stem-and-leaf",
        hints: ["Use the key to turn each leaf into a time.", "In the 14 row, which leaves give a time below 14.5?"],
        strategy: "Read the key first",
      },
      {
        kind: "short",
        id: "statistics-p3-q04",
        question:
          "After the June holidays, the 32 pupils in 8F were asked whether they had visited Sentosa and whether they had visited Jewel Changi Airport. The Venn diagram shows the results.\n\nHow many pupils visited **exactly one** of the two places?",
        diagram: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram with circles labelled Sentosa and Jewel. Sentosa only 11, both 7, Jewel only 9, outside both circles 5."><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><rect x="10" y="10" width="300" height="180" fill="none" stroke="#334155" stroke-width="1.5"/><text x="20" y="30" font-size="14" font-family="sans-serif" fill="#1f2937">ξ</text><circle cx="125" cy="108" r="70" fill="#c7d2fe" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><circle cx="195" cy="108" r="70" fill="#fde68a" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><text x="95" y="30" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Sentosa</text><text x="225" y="30" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Jewel</text><g font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="92" y="113">11</text><text x="160" y="113">7</text><text x="228" y="113">9</text><text x="290" y="178">5</text></g></svg>`,
        answer: { type: "number", value: 20 },
        traps: [
          { spec: { type: "number", value: 27 }, feedback: "27 counts everyone inside the circles, including the 7 in the overlap who visited *both* places." },
          { spec: { type: "number", value: 18 }, feedback: "18 is everyone who visited Sentosa (11 + 7). 'Exactly one' means Sentosa only or Jewel only." },
        ],
        solution: [
          "'Exactly one' means inside one circle but **not** in the overlap.",
          "Sentosa only: 11. Jewel only: 9.",
          "11 + 9 = 20 pupils.",
        ],
        difficulty: "warmup",
        guideRef: "venn-carroll",
        hints: ["Which regions mean 'one place but not the other'?", "Leave out the overlap and the region outside both circles."],
        strategy: "Read the regions",
      },
      {
        kind: "short",
        id: "statistics-p3-q05",
        question:
          "Siti stands at the school gate and records how many people are in each car that drops pupils off.\n\n| People in the car | Number of cars |\n|---|---|\n| 1 | 18 |\n| 2 | 11 |\n| 3 | 6 |\n| 4 | 4 |\n| 5 | 1 |\n\nHow many **people** were in these cars altogether?",
        answer: { type: "number", value: 79 },
        traps: [
          { spec: { type: "number", value: 40 }, feedback: "40 is the number of **cars** (the total frequency). The 11 cars in the second row each hold 2 people, so you need to multiply." },
          { spec: { type: "number", value: 15 }, feedback: "15 is 1 + 2 + 3 + 4 + 5. But there are 18 cars with 1 person, 11 cars with 2 people, and so on." },
        ],
        solution: [
          "Each row tells you how many cars hold that many people.",
          "1 × 18 = 18, 2 × 11 = 22, 3 × 6 = 18, 4 × 4 = 16, 5 × 1 = 5.",
          "Total people = 18 + 22 + 18 + 16 + 5 = 79.",
        ],
        commonError: "Adding up the frequency column. That counts cars, not people.",
        difficulty: "warmup",
        guideRef: "tables",
        hints: [
          "How many people are in the 11 cars in the second row altogether?",
          "Multiply each number of people by its number of cars, then add.",
        ],
        strategy: "Multiply, then add",
      },
      {
        kind: "short",
        id: "statistics-p3-q06",
        question:
          "A hawker stall sells sugar-cane juice. The scatter graph shows the midday temperature and the number of cups sold on 13 days, with a line of best fit.\n\nThe stall makes $1.20 profit on each cup. Use the line of best fit to estimate the profit on a day when the midday temperature is 30°C. Give your answer in dollars.",
        diagram: `<svg viewBox="0 0 440 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter graph of midday temperature from 24 to 34 degrees Celsius against cups sold from 0 to 250. The points show positive correlation. A line of best fit rises from 40 cups at 24.5 degrees to 220 cups at 33.5 degrees, passing through 150 cups at 30 degrees."><rect x="0" y="0" width="440" height="320" fill="#ffffff"/><path d="M86 20V270M122 20V270M158 20V270M194 20V270M230 20V270M266 20V270M302 20V270M338 20V270M374 20V270M410 20V270M50 245H410M50 220H410M50 195H410M50 170H410M50 145H410M50 120H410M50 95H410M50 70H410M50 45H410M50 20H410" stroke="#e5e7eb" stroke-width="1" fill="none"/><path d="M50 20V270H410" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="50" y="286">24</text><text x="86" y="286">25</text><text x="122" y="286">26</text><text x="158" y="286">27</text><text x="194" y="286">28</text><text x="230" y="286">29</text><text x="266" y="286">30</text><text x="302" y="286">31</text><text x="338" y="286">32</text><text x="374" y="286">33</text><text x="410" y="286">34</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="274">0</text><text x="44" y="224">50</text><text x="44" y="174">100</text><text x="44" y="124">150</text><text x="44" y="74">200</text><text x="44" y="24">250</text></g><text x="230" y="308" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Midday temperature (°C)</text><text x="14" y="145" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 145)">Cups sold</text><line x1="68" y1="230" x2="392" y2="50" stroke="#2563eb" stroke-width="2"/><g fill="#1f2937"><circle cx="86" cy="210" r="3.5"/><circle cx="122" cy="205" r="3.5"/><circle cx="140" cy="195" r="3.5"/><circle cx="158" cy="170" r="3.5"/><circle cx="194" cy="165" r="3.5"/><circle cx="212" cy="155" r="3.5"/><circle cx="230" cy="150" r="3.5"/><circle cx="248" cy="120" r="3.5"/><circle cx="284" cy="105" r="3.5"/><circle cx="302" cy="110" r="3.5"/><circle cx="338" cy="70" r="3.5"/><circle cx="356" cy="80" r="3.5"/><circle cx="374" cy="55" r="3.5"/></g></svg>`,
        answer: { type: "number", value: 180, tolerance: 6, display: "$180 (about 150 cups)" },
        traps: [{ spec: { type: "number", value: 150 }, feedback: "150 is the estimated number of cups. Multiply by the $1.20 profit on each cup." }],
        solution: [
          "Go up from 30°C on the horizontal axis to the line of best fit.",
          "Go across to the vertical axis: about 150 cups.",
          "Profit ≈ 150 × $1.20 = $180.",
        ],
        commonError: "Reading a nearby plotted point instead of the line. The line smooths out the day-to-day ups and downs.",
        difficulty: "core",
        guideRef: "scatter-graphs",
        hints: [
          "No day was exactly 30°C. What can you use instead of a plotted point?",
          "Go up from 30 to the line, then across to the cups axis.",
          "The line gives about 150 cups. Now find the profit.",
        ],
        strategy: "Read from the line",
      },
      {
        kind: "written",
        id: "statistics-p3-q07",
        question:
          "The school canteen is deciding whether to open a new vegetarian noodle stall. Mr Lim stands next to the **existing noodle stall** at lunchtime one Monday. He asks the first 20 pupils in its queue: \"You'd love another noodle stall, wouldn't you?\"\n\nGive **two** reasons why his results are likely to be biased. Then describe a better way to collect the data.",
        marks: 3,
        modelAnswer:
          "**Reason 1: who he asks.** Everyone he asks is already queuing for noodles, so they probably like noodles more than a typical pupil. Pupils who eat at other stalls, bring food from home, or are not there on Monday have no chance of being asked, so the sample does not represent the school.\n\n**Reason 2: the question.** \"You'd love another noodle stall, wouldn't you?\" is a **leading question**. It pushes people towards saying yes. (Also, 20 pupils on one day is a small sample.)\n\n**Better method.** Number every pupil on the school register and use a random number generator to choose a larger random sample, say 60 pupils from all year groups. Ask a neutral question such as \"Would you use a new vegetarian noodle stall? Yes / No / Not sure\".",
        markScheme: [
          {
            point: "Sample is not representative: only pupils already in the noodle queue, in one place, on one day",
            keywords: ["noodle", "queue", "already", "like noodles", "not representative", "one day", "monday", "same place"],
          },
          { point: "The question is leading (or: 20 pupils is a small sample)", keywords: ["leading", "wouldn't you", "pushes", "biased question", "small", "only 20"] },
          {
            point: "Better method: a random sample from the whole school (e.g. from the register), larger, with a neutral question",
            keywords: ["random", "whole school", "register", "list", "larger", "neutral", "every pupil"],
          },
        ],
        commonError: "Saying only 'the sample is too small'. Size matters, but the bigger problems are *who* is asked and *how* the question is worded.",
        difficulty: "core",
        guideRef: "data-and-sampling",
        hints: [
          "Which pupils can never be asked with his method?",
          "Read his question aloud. Does it push people towards one answer?",
          "How could every pupil get an equal chance of being chosen?",
        ],
        strategy: "Look for bias",
      },
      {
        kind: "short",
        id: "statistics-p3-q08",
        question:
          "The compound bar chart shows how the pupils in three Year 8 classes travel to school.\n\nWhat fraction of all the pupils who **walk** to school are in 8R? Give your answer as a fraction in its simplest form.",
        diagram: `<svg viewBox="0 0 420 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compound bar chart. 8P: MRT from 0 to 14, bus from 14 to 24, walk from 24 to 30. 8Q: MRT from 0 to 8, bus from 8 to 20, walk from 20 to 28. 8R: MRT from 0 to 12, bus from 12 to 20, walk from 20 to 32."><rect x="0" y="0" width="420" height="310" fill="#ffffff"/><path d="M60 258H380M60 246H380M60 234H380M60 222H380M60 210H380M60 198H380M60 186H380M60 174H380M60 162H380M60 150H380M60 138H380M60 126H380M60 114H380M60 102H380M60 90H380M60 78H380M60 66H380M60 54H380" stroke="#e5e7eb" stroke-width="1" fill="none"/><g stroke="#1f2937" stroke-width="1"><rect x="90" y="186" width="60" height="84" fill="#c7d2fe"/><rect x="90" y="126" width="60" height="60" fill="#fde68a"/><rect x="90" y="90" width="60" height="36" fill="#bbf7d0"/><rect x="190" y="222" width="60" height="48" fill="#c7d2fe"/><rect x="190" y="150" width="60" height="72" fill="#fde68a"/><rect x="190" y="102" width="60" height="48" fill="#bbf7d0"/><rect x="290" y="198" width="60" height="72" fill="#c7d2fe"/><rect x="290" y="150" width="60" height="48" fill="#fde68a"/><rect x="290" y="78" width="60" height="72" fill="#bbf7d0"/></g><path d="M60 54V270H380" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="54" y="274">0</text><text x="54" y="250">4</text><text x="54" y="226">8</text><text x="54" y="202">12</text><text x="54" y="178">16</text><text x="54" y="154">20</text><text x="54" y="130">24</text><text x="54" y="106">28</text><text x="54" y="82">32</text><text x="54" y="58">36</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="120" y="288">8P</text><text x="220" y="288">8Q</text><text x="320" y="288">8R</text><text x="220" y="305">Class</text></g><text x="20" y="162" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 20 162)">Number of pupils</text><g font-size="12" font-family="sans-serif" fill="#1f2937"><rect x="110" y="14" width="12" height="12" fill="#c7d2fe" stroke="#1f2937"/><text x="127" y="24">MRT</text><rect x="180" y="14" width="12" height="12" fill="#fde68a" stroke="#1f2937"/><text x="197" y="24">Bus</text><rect x="250" y="14" width="12" height="12" fill="#bbf7d0" stroke="#1f2937"/><text x="267" y="24">Walk</text></g></svg>`,
        answer: { type: "fraction", n: 6, d: 13, simplest: true, display: "{{6/13}}" },
        traps: [
          {
            spec: { type: "fraction", n: 16, d: 45 },
            feedback: "It looks like you used the tops of the bars. In a compound bar chart each section starts where the one below ends: 8R's walk section runs from 20 to 32, so it is 12 pupils.",
          },
          {
            spec: { type: "fraction", n: 2, d: 15 },
            feedback: "{{12/90}} compares 8R's walkers with *every* pupil. The question is about the pupils who walk: 6 + 8 + 12 = 26.",
          },
        ],
        solution: [
          "Read each walk section as top minus bottom.",
          "8P: 30 − 24 = 6. 8Q: 28 − 20 = 8. 8R: 32 − 20 = 12.",
          "Pupils who walk: 6 + 8 + 12 = 26.",
          "Fraction in 8R: {{12/26 = 6/13}}.",
        ],
        commonError: "Reading the top of a section as its size. A section's size is its top minus its bottom.",
        difficulty: "core",
        guideRef: "charts",
        hints: [
          "The walk section doesn't start at 0. Where does it start for each class?",
          "8R's walk section goes from 20 up to 32.",
          "Find how many pupils walk altogether, then put 8R's walkers over that total.",
        ],
        strategy: "Top minus bottom",
      },
      {
        kind: "short",
        id: "statistics-p3-q09",
        question:
          "In a fitness test, each of the 20 pupils in 8D did as many push-ups as they could in one minute.\n\n| Stem | Leaf |\n|---|---|\n| 1 | 2 5 8 9 |\n| 2 | 0 3 3 6 7 8 |\n| 3 | 1 1 4 5 9 |\n| 4 | 0 2 6 |\n| 5 | 3 5 |\n\nKey: 3 | 1 means 31 push-ups\n\nThe PE teacher gives a gold badge to the **top quarter** of the class. What is the smallest number of push-ups that earned a gold badge?",
        answer: { type: "number", value: 40 },
        traps: [
          { spec: { type: "number", value: 42 }, feedback: "55, 53, 46 and 42 are only the top 4. A quarter of 20 pupils is 5." },
          { spec: { type: "number", value: 39 }, feedback: "39 is the 6th best score. A quarter of 20 is 5 pupils, so count back only 5 scores." },
        ],
        solution: [
          "Count the leaves: 4 + 6 + 5 + 3 + 2 = 20 pupils.",
          "A quarter of 20 is 5, so the top 5 scores earn a badge.",
          "Read from the largest: 55, 53, 46, 42, 40.",
          "The smallest of these is 40 push-ups.",
        ],
        commonError: "Forgetting that the largest values are at the bottom right of a stem-and-leaf diagram.",
        difficulty: "core",
        guideRef: "stem-and-leaf",
        hints: [
          "How many pupils are in the class? How many is a quarter of them?",
          "The biggest values are in the bottom row. Count back from there.",
          "The top 5 scores are 55, 53, 46, 42 and …?",
        ],
        strategy: "Work backwards from the top",
      },
      {
        kind: "short",
        id: "statistics-p3-q10",
        question:
          "A bookshop in Bras Basah asked 80 customers what they bought. 47 bought a book, 38 bought stationery and 12 bought neither.\n\nHow many customers bought stationery **only**?",
        answer: { type: "number", value: 21 },
        traps: [
          { spec: { type: "number", value: 17 }, feedback: "17 customers bought **both**. 'Stationery only' leaves those out: 38 − 17." },
          { spec: { type: "number", value: 38 }, feedback: "38 includes the customers who bought a book *as well as* stationery." },
        ],
        solution: [
          "80 − 12 = 68 customers bought at least one thing.",
          "47 + 38 = 85, which is 17 more than 68, so 17 customers were counted twice: they bought both.",
          "Stationery only = 38 − 17 = 21.",
          "Check: book only 30, both 17, stationery only 21, neither 12, and 30 + 17 + 21 + 12 = 80 ✓",
        ],
        solutions: [
          {
            label: "Quicker: take away the book buyers",
            steps: ["68 customers bought something.", "47 of them bought a book (with or without stationery).", "Everyone else bought stationery only: 68 − 47 = 21."],
          },
        ],
        commonError: "Answering with the overlap (17) or with the whole stationery circle (38).",
        difficulty: "core",
        guideRef: "venn-carroll",
        hints: [
          "How many customers bought at least one thing?",
          "47 + 38 is more than that. Why?",
          "Of the 68 who bought something, 47 bought a book. Who is left?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "statistics-p3-q11",
        question:
          "A poster uses this bar chart to compare the average waiting times at two clinics. Its headline says: \"Patients at Clinic B wait **four times** as long as at Clinic A!\"\n\nExplain why the chart is misleading, and describe the real difference between the two waiting times.",
        diagram: `<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart titled Average waiting time. The vertical axis is labelled 18 to 23 minutes and starts at 18. Clinic A's bar reaches 19. Clinic B's bar reaches 22."><rect x="0" y="0" width="300" height="240" fill="#ffffff"/><text x="165" y="22" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Average waiting time</text><path d="M60 168H270M60 136H270M60 104H270M60 72H270M60 40H270" stroke="#e5e7eb" stroke-width="1" fill="none"/><rect x="90" y="168" width="60" height="32" fill="#bae6fd" stroke="#1f2937"/><rect x="180" y="72" width="60" height="128" fill="#fecaca" stroke="#1f2937"/><path d="M60 40V200H270" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="54" y="204">18</text><text x="54" y="172">19</text><text x="54" y="140">20</text><text x="54" y="108">21</text><text x="54" y="76">22</text><text x="54" y="44">23</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="120" y="218">Clinic A</text><text x="210" y="218">Clinic B</text></g><text x="20" y="120" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 20 120)">Minutes</text></svg>`,
        marks: 3,
        modelAnswer:
          "The vertical axis starts at 18 minutes instead of 0. Clinic A's bar only shows the part from 18 to 19 (1 minute) and Clinic B's shows 18 to 22 (4 minutes), so B's bar *looks* four times as tall.\n\nIn fact the average waits are 19 minutes and 22 minutes. Clinic B's wait is only 3 minutes longer. That is about {{22/19}} ≈ 1.16 times as long, or roughly 16% longer, nowhere near four times.",
        markScheme: [
          { point: "The vertical axis does not start at 0 (it starts at 18)", keywords: ["zero", "0", "starts at 18", "18", "truncated", "does not start"] },
          { point: "So the visible bar heights are 1 and 4, which makes B look four times as tall", keywords: ["1", "4", "looks", "four times", "height", "taller"] },
          { point: "Real values are 19 and 22 minutes: only 3 minutes (about 16%, or 1.16 times) longer", keywords: ["19", "22", "3 minutes", "1.16", "16%", "only 3"] },
        ],
        commonError: "Saying 'the axis is wrong' without explaining what it does to the bar heights, or without giving the real comparison.",
        difficulty: "core",
        guideRef: "choosing-and-misleading",
        hints: [
          "Look at the number where the vertical axis starts.",
          "Read the real waiting time for each clinic.",
          "How many times as big as 19 is 22, really?",
        ],
        strategy: "Check the axes",
      },
      {
        kind: "short",
        id: "statistics-p3-q12",
        question:
          "Ms Kaur surveyed 120 pupils about breakfast.\n\n- {{3/5}} of the pupils are girls.\n- {{3/4}} of the girls had breakfast that morning.\n- 80 pupils altogether had breakfast.\n\nWhat percentage of the pupils who **skipped** breakfast are boys?",
        answer: { type: "number", value: 55, display: "55%" },
        traps: [
          { spec: { type: "number", value: 22 }, feedback: "22 boys skipped breakfast. Now write that as a percentage of the 40 pupils who skipped." },
          { spec: { type: "number", value: 18.33, tolerance: 0.01 }, feedback: "You divided by all 120 pupils. Only the 40 pupils who skipped breakfast count here." },
        ],
        solution: [
          "Girls: {{3/5}} × 120 = 72, so boys: 120 − 72 = 48.",
          "Girls who had breakfast: {{3/4}} × 72 = 54, so 72 − 54 = 18 girls skipped it.",
          "Boys who had breakfast: 80 − 54 = 26, so 48 − 26 = 22 boys skipped it.",
          "| | Breakfast | Skipped | Total |\n|---|---|---|---|\n| Girls | 54 | 18 | 72 |\n| Boys | 26 | 22 | 48 |\n| Total | 80 | 40 | 120 |",
          "Boys as a percentage of those who skipped: {{22/40}} × 100 = 55%.",
        ],
        commonError: "Working out a percentage of *all* the pupils instead of the group the question names.",
        difficulty: "core",
        guideRef: "tables",
        hints: [
          "Draw a two-way table: girls and boys down the side, breakfast and skipped across the top.",
          "Fill in the girls' row first.",
          "Use the 80 who had breakfast to find the boys' numbers. Then compare the boys who skipped with everyone who skipped.",
        ],
        strategy: "Draw a two-way table",
      },
      {
        kind: "short",
        id: "statistics-p3-q13",
        question:
          "The line graph shows the electricity used by Siti's family in their HDB flat each month. Electricity costs $0.30 per kWh.\n\nHow much more did the family's electricity cost in May than in February? Give your answer in dollars.",
        diagram: `<svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph of electricity used each month from January to June, on a vertical scale from 0 to 440 kWh with gridlines every 20 kWh. January 320, February 300, March 340, April 380, May 420, June 400."><rect x="0" y="0" width="420" height="340" fill="#ffffff"/><path d="M50 288H400M50 276H400M50 264H400M50 252H400M50 240H400M50 228H400M50 216H400M50 204H400M50 192H400M50 180H400M50 168H400M50 156H400M50 144H400M50 132H400M50 120H400M50 108H400M50 96H400M50 84H400M50 72H400M50 60H400M50 48H400M50 36H400" stroke="#e5e7eb" stroke-width="1" fill="none"/><path d="M50 36V300H400" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="304">0</text><text x="44" y="280">40</text><text x="44" y="256">80</text><text x="44" y="232">120</text><text x="44" y="208">160</text><text x="44" y="184">200</text><text x="44" y="160">240</text><text x="44" y="136">280</text><text x="44" y="112">320</text><text x="44" y="88">360</text><text x="44" y="64">400</text><text x="44" y="40">440</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="80" y="318">Jan</text><text x="140" y="318">Feb</text><text x="200" y="318">Mar</text><text x="260" y="318">Apr</text><text x="320" y="318">May</text><text x="380" y="318">Jun</text><text x="225" y="335">Month</text></g><text x="14" y="168" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 168)">Electricity used (kWh)</text><polyline points="80,108 140,120 200,96 260,72 320,48 380,60" fill="none" stroke="#2563eb" stroke-width="2"/><g fill="#1f2937"><circle cx="80" cy="108" r="3.5"/><circle cx="140" cy="120" r="3.5"/><circle cx="200" cy="96" r="3.5"/><circle cx="260" cy="72" r="3.5"/><circle cx="320" cy="48" r="3.5"/><circle cx="380" cy="60" r="3.5"/></g></svg>`,
        answer: { type: "number", value: 36, display: "$36" },
        traps: [
          { spec: { type: "number", value: 120 }, feedback: "120 kWh is the extra electricity used. Multiply by $0.30 per kWh to get the extra cost." },
          { spec: { type: "number", value: 126 }, feedback: "$126 is the cost of all of May's electricity. The question asks how much **more** May cost than February." },
        ],
        solution: [
          "Read the graph: February = 300 kWh, May = 420 kWh.",
          "Extra electricity in May: 420 − 300 = 120 kWh.",
          "Extra cost: 120 × $0.30 = $36.",
        ],
        solutions: [
          {
            label: "Find each bill first",
            steps: ["February: 300 × $0.30 = $90.", "May: 420 × $0.30 = $126.", "Difference: $126 − $90 = $36. (Slower, because you multiply twice.)"],
          },
        ],
        difficulty: "core",
        guideRef: "charts",
        hints: [
          "Read February's and May's values carefully. Each gridline is 20 kWh.",
          "How many more kWh were used in May?",
          "Multiply the extra kWh by $0.30.",
        ],
        strategy: "Read, then calculate",
      },
      {
        kind: "short",
        id: "statistics-p3-q14",
        question:
          "The frequency polygon shows the masses, m kg, of the jackfruits delivered to a fruit stall. The masses were grouped into the classes {{4 < m <= 6}}, {{6 < m <= 8}}, {{8 < m <= 10}}, {{10 < m <= 12}} and {{12 < m <= 14}}.\n\nWhat fraction of the jackfruits had a mass of **more than 8 kg**? Give your answer as a fraction in its simplest form.",
        diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frequency polygon of jackfruit masses. Points plotted at mass 5 kg frequency 3, 7 kg frequency 8, 9 kg frequency 12, 11 kg frequency 5, and 13 kg frequency 2, joined by straight lines."><rect x="0" y="0" width="400" height="300" fill="#ffffff"/><path d="M82 50V260M114 50V260M146 50V260M178 50V260M210 50V260M242 50V260M274 50V260M306 50V260M338 50V260M370 50V260M50 245H370M50 230H370M50 215H370M50 200H370M50 185H370M50 170H370M50 155H370M50 140H370M50 125H370M50 110H370M50 95H370M50 80H370M50 65H370M50 50H370" stroke="#e5e7eb" stroke-width="1" fill="none"/><path d="M50 50V260H370" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="50" y="276">4</text><text x="114" y="276">6</text><text x="178" y="276">8</text><text x="242" y="276">10</text><text x="306" y="276">12</text><text x="370" y="276">14</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="264">0</text><text x="44" y="234">2</text><text x="44" y="204">4</text><text x="44" y="174">6</text><text x="44" y="144">8</text><text x="44" y="114">10</text><text x="44" y="84">12</text><text x="44" y="54">14</text></g><text x="210" y="294" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Mass, m (kg)</text><text x="16" y="155" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 16 155)">Frequency</text><polyline points="82,215 146,140 210,80 274,185 338,230" fill="none" stroke="#2563eb" stroke-width="2"/><g fill="#1f2937"><circle cx="82" cy="215" r="3.5"/><circle cx="146" cy="140" r="3.5"/><circle cx="210" cy="80" r="3.5"/><circle cx="274" cy="185" r="3.5"/><circle cx="338" cy="230" r="3.5"/></g></svg>`,
        answer: { type: "fraction", n: 19, d: 30, simplest: true, display: "{{19/30}}" },
        traps: [
          {
            spec: { type: "fraction", n: 9, d: 10 },
            feedback: "The point at 7 kg stands for the class {{6 < m <= 8}}. Those jackfruits are 8 kg or less, so leave them out.",
          },
          { spec: { type: "number", value: 19 }, feedback: "19 jackfruits is right. Now write it as a fraction of all the jackfruits." },
        ],
        solution: [
          "Each point is plotted at the **midpoint** of a class: 5, 7, 9, 11 and 13 kg.",
          "Frequencies: 3, 8, 12, 5, 2. Total = 3 + 8 + 12 + 5 + 2 = 30 jackfruits.",
          "More than 8 kg means the classes {{8 < m <= 10}}, {{10 < m <= 12}} and {{12 < m <= 14}}: the points at 9, 11 and 13.",
          "12 + 5 + 2 = 19 jackfruits.",
          "Fraction = {{19/30}}, which is already in its simplest form.",
        ],
        commonError: "Thinking the point at 9 kg means jackfruits of exactly 9 kg. It stands for the whole class from 8 to 10 kg.",
        difficulty: "core",
        guideRef: "continuous-data",
        hints: [
          "Each point sits above the middle of a class. Which class does the point at 9 kg stand for?",
          "Read all five frequencies and add them to get the total.",
          "Which classes are completely above 8 kg?",
        ],
        strategy: "Midpoints stand for classes",
      },
      {
        kind: "written",
        id: "statistics-p3-q15",
        question:
          "Hana records two things at an MRT station on 20 different days: the number of umbrellas sold at the station kiosk, and the total number of minutes that trains were delayed. Her scatter graph shows **strong positive correlation**.\n\nHana concludes: \"Selling umbrellas causes train delays, so the kiosk should stop selling them.\"\n\nIs Hana right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "No, Hana is not right. Correlation shows that the two variables tend to rise and fall together, but it does not prove that one **causes** the other.\n\nA third variable, **rain**, probably explains both. On rainy days more people buy umbrellas, and there are also more delays (crowded platforms, slower boarding, wet tracks).\n\nSo stopping umbrella sales would not reduce the delays. On a stormy day the trains would still be late, and the passengers would just get wet.",
        markScheme: [
          { point: "Says she is not right: correlation does not prove causation", keywords: ["not right", "no", "causation", "does not mean", "doesn't mean", "not cause", "correlation"] },
          { point: "Names a third variable, such as rain or wet weather, that affects both", keywords: ["rain", "weather", "wet", "storm", "third", "monsoon"] },
          { point: "Explains that stopping umbrella sales would not reduce the delays", keywords: ["still", "would not", "won't", "stop selling", "not reduce", "same delays"] },
        ],
        commonError: "Treating correlation as proof of cause and effect.",
        difficulty: "core",
        guideRef: "scatter-graphs",
        hints: [
          "Does 'they go up together' mean 'one makes the other go up'?",
          "On what kind of day do people buy umbrellas?",
          "Could that same thing also delay the trains?",
        ],
        strategy: "Look for a hidden third variable",
      },
      {
        kind: "short",
        id: "statistics-p3-q16",
        question:
          "A school lists its 480 Year 8 pupils in alphabetical order and numbers them 1 to 480. Mr Rahman wants a **systematic** sample of 30 pupils. He works out the sampling interval, then picks a random starting number between 1 and the interval. He gets 7.\n\nWhat number is the **fourth** pupil in his sample?",
        answer: { type: "number", value: 55 },
        traps: [
          { spec: { type: "number", value: 71 }, feedback: "71 is 4 jumps after pupil 7. The 1st pupil is number 7, so the 4th pupil is only 3 jumps later." },
          { spec: { type: "number", value: 64 }, feedback: "64 = 4 × 16, but the sample starts at pupil 7, not at 0." },
        ],
        solution: [
          "Sampling interval = 480 ÷ 30 = 16, so he takes every 16th pupil.",
          "1st: 7. 2nd: 7 + 16 = 23. 3rd: 23 + 16 = 39. 4th: 39 + 16 = 55.",
          "In one step: 7 + 3 × 16 = 55.",
        ],
        commonError: "An off-by-one slip: the 4th pupil is 3 intervals after the 1st, not 4.",
        difficulty: "core",
        guideRef: "data-and-sampling",
        hints: [
          "How far apart are the chosen pupils on the list?",
          "480 ÷ 30 = 16. Write out the sample starting from pupil 7.",
          "7, 23, 39, …",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "statistics-p3-q17",
        question:
          "The table shows the times, t seconds, of 30 swimmers in a 50 m freestyle trial.\n\n| Time, t (seconds) | Frequency |\n|---|---|\n| {{30 < t <= 35}} | 4 |\n| {{35 < t <= 40}} | 11 |\n| {{40 < t <= 45}} | 9 |\n| {{45 < t <= 50}} | 6 |\n\nSwimmers with a time **under 42 seconds** join the school squad. The coach only has this table, not the actual times.\n\nWhat are the **least** possible and the **greatest** possible numbers of swimmers who join the squad? Give the least first.",
        answer: { type: "list", values: [15, 24], ordered: true, display: "least 15, greatest 24" },
        traps: [
          {
            spec: { type: "list", values: [15, 15], ordered: true },
            feedback: "15 is right for the least. But could some of the 9 swimmers in {{40 < t <= 45}} have times like 40.5 s or 41.8 s?",
          },
          {
            spec: { type: "list", values: [24, 24], ordered: true },
            feedback: "24 is right for the greatest. But all 9 swimmers in {{40 < t <= 45}} could have times of 42 s or more.",
          },
        ],
        solution: [
          "Swimmers in {{30 < t <= 35}} and {{35 < t <= 40}} are definitely under 42 s: 4 + 11 = 15.",
          "Swimmers in {{45 < t <= 50}} are definitely not.",
          "The 9 swimmers in {{40 < t <= 45}} could have any times from just over 40 s up to 45 s.",
          "**Least:** none of those 9 is under 42 s, so 15 swimmers join.",
          "**Greatest:** all 9 are under 42 s (for example, 40.5 s), so 15 + 9 = 24 swimmers join.",
        ],
        commonError: "Giving one 'estimate'. Grouped data hides the actual values, so you can only give a range of possibilities.",
        difficulty: "challenge",
        guideRef: "tables",
        hints: [
          "Which classes are *definitely* under 42 seconds?",
          "The class {{40 < t <= 45}} is the uncertain one. What are the two extreme cases?",
          "Least: none of that class qualifies. Greatest: all of it does.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "statistics-p3-q18",
        question:
          "A bar chart compares the number of members in two CCAs. Robotics has 30 members and Drama has 45 members. The vertical axis does **not** start at zero, and because of this Drama's bar looks exactly **4 times** as tall as Robotics' bar.\n\nAt what number does the vertical axis start?",
        answer: { type: "number", value: 25 },
        traps: [
          { spec: { type: "number", value: 0 }, feedback: "If the axis started at 0, Drama's bar would be only 1.5 times as tall as Robotics' bar, not 4 times." },
          { spec: { type: "number", value: 5 }, feedback: "5 is how tall Robotics' bar *looks* (from the start of the axis up to 30). The question asks where the axis starts." },
        ],
        solution: [
          "Suppose the axis starts at k. Then each bar only shows the part above k.",
          "Robotics' bar looks 30 − k tall. Drama's bar looks 45 − k tall.",
          "45 − k = 4(30 − k) = 120 − 4k.",
          "3k = 75, so k = 25.",
          "Check: the bars look 5 and 20 tall, and 20 = 4 × 5 ✓",
        ],
        solutions: [
          {
            label: "Try values",
            steps: ["Start at 20: the bars look 10 and 25 tall, only 2.5 times.", "Start at 24: they look 6 and 21 tall, 3.5 times.", "Start at 25: they look 5 and 20 tall, exactly 4 times ✓"],
          },
        ],
        commonError: "Forgetting that cutting the axis removes the same amount from *both* bars.",
        difficulty: "challenge",
        guideRef: "choosing-and-misleading",
        hints: [
          "If the axis starts at some number k, how tall does each bar look?",
          "The bars look 30 − k and 45 − k tall.",
          "Solve 45 − k = 4(30 − k), or try values of k.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "statistics-p3-q19",
        question:
          "In a class of 30 pupils, 18 have been to Malaysia and 16 have been to Indonesia.\n\nEthan says: \"At least 4 pupils must have been to **both** countries.\"\n\n(a) Explain why Ethan is right.\n\n(b) What is the **greatest** possible number of pupils who have been to both countries? Explain how you know.",
        marks: 3,
        modelAnswer:
          "(a) 18 + 16 = 34, but there are only 30 pupils. If nobody had been to both countries, we would need 34 different pupils. So at least 34 − 30 = 4 pupils must be counted in both groups. (For example: 14 Malaysia only, 4 both, 12 Indonesia only, 0 neither.)\n\n(b) The greatest possible number is **16**. The overlap can't be bigger than the smaller group, and it is possible for all 16 pupils who went to Indonesia to have been to Malaysia as well. Then 16 went to both, 2 went to Malaysia only and 12 went to neither: 16 + 2 + 12 = 30 ✓",
        markScheme: [
          {
            point: "Explains that 18 + 16 = 34 is more than 30, so at least 34 − 30 = 4 must be in both",
            keywords: ["34", "more than 30", "34 − 30", "34 - 30", "counted twice", "overlap"],
          },
          { point: "The greatest possible number is 16", keywords: ["16"] },
          {
            point: "Justifies 16: the overlap can't be bigger than the smaller group; all 16 Indonesia visitors also went to Malaysia (2 Malaysia only, 12 neither)",
            keywords: ["smaller", "all 16", "cannot be more", "can't be more", "12 neither", "2 malaysia only", "neither"],
          },
        ],
        commonError: "Thinking the overlap must be exactly 4. It is *at least* 4: it could be any whole number from 4 to 16.",
        difficulty: "challenge",
        guideRef: "venn-carroll",
        hints: [
          "What happens when you add 18 and 16?",
          "Draw a Venn diagram with x in the overlap. Write the other regions in terms of x.",
          "For the greatest: how big can the overlap be if one circle only holds 16 pupils?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "statistics-p3-q20",
        question:
          "A pie chart shows the results of a survey in which each person chose exactly one option. Its four sectors have angles of 105°, 135°, 75° and 45°.\n\nWhat is the **smallest** possible number of people who took part in the survey?",
        answer: { type: "number", value: 24 },
        traps: [
          { spec: { type: "number", value: 15 }, feedback: "15° is the biggest angle that could stand for one person. The number of people is 360° ÷ 15°." },
          { spec: { type: "number", value: 360 }, feedback: "360 people would work, but it isn't the smallest. One person doesn't have to be worth 1°. What is the biggest angle that could stand for one person?" },
        ],
        solution: [
          "Each sector stands for a whole number of people, so the group sizes are in the ratio 105 : 135 : 75 : 45.",
          "Divide by the HCF, 15: the ratio simplifies to 7 : 9 : 5 : 3.",
          "7, 9, 5 and 3 have no common factor, so the smallest possible groups are 7, 9, 5 and 3 people.",
          "Smallest total = 7 + 9 + 5 + 3 = 24 people.",
          "Check: 360° ÷ 24 = 15° per person, and 7 × 15° = 105° ✓",
        ],
        commonError: "Assuming 1 person = 1°, which gives 360 people: possible, but far from the smallest.",
        difficulty: "challenge",
        guideRef: "charts",
        hints: [
          "Each sector stands for a whole number of people. What does that tell you about the angles?",
          "Write the four angles as a ratio and simplify it fully.",
          "105 : 135 : 75 : 45 = 7 : 9 : 5 : 3.",
        ],
        strategy: "Simplify the ratio",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "statistics-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "statistics-p4-q01",
        question:
          "Ravi's questionnaire asks: \"How much did you spend at the school canteen last week?\" The response boxes are:\n\n- $0 to $5\n- $5 to $10\n- $10 to $15\n- more than $15\n\nArjun spent exactly $10. How many of the boxes could he tick?",
        answer: { type: "number", value: 2 },
        traps: [{ spec: { type: "number", value: 1 }, feedback: "Check both '$5 to $10' and '$10 to $15'. $10 fits in each, because the boxes overlap." }],
        solution: [
          "$10 is in '$5 to $10' (it is the top of that box).",
          "$10 is also in '$10 to $15' (it is the bottom of that box).",
          "So Arjun could tick 2 boxes. The boxes **overlap**, which is a design fault.",
          "Better boxes: 'at least $0 but less than $5', 'at least $5 but less than $10', and so on, so every amount fits exactly one box.",
        ],
        commonError: "Not noticing overlapping response boxes. Every possible answer should fit exactly one box.",
        difficulty: "warmup",
        guideRef: "data-and-sampling",
        hints: ["Test $10 against each box in turn."],
        strategy: "Test each case",
      },
      {
        kind: "short",
        id: "statistics-p4-q02",
        question:
          "Fifty pupils at a CCA fair were asked whether they have a pet.\n\n| | Has a pet | No pet | Total |\n|---|---|---|---|\n| Year 7 | 9 | | 22 |\n| Year 8 | | | |\n| Total | 21 | | 50 |\n\nComplete the table. Then write down:\n\n(a) the number of Year 8 pupils with no pet\n\n(b) the total number of pupils with no pet.\n\nGive your answers in the order (a), (b).",
        answer: { type: "list", values: [16, 29], ordered: true, display: "(a) 16, (b) 29" },
        traps: [
          { spec: { type: "list", values: [13, 29], ordered: true }, feedback: "13 is the number of **Year 7** pupils with no pet. Find the Year 8 total first: 50 − 22 = 28." },
        ],
        solution: [
          "Year 7, no pet: 22 − 9 = 13.",
          "Year 8 total: 50 − 22 = 28.",
          "Year 8, has a pet: 21 − 9 = 12.",
          "(a) Year 8, no pet: 28 − 12 = 16.",
          "(b) Total with no pet: 50 − 21 = 29. Check: 13 + 16 = 29 ✓",
        ],
        difficulty: "warmup",
        guideRef: "tables",
        hints: ["Every row and every column must add up to its total.", "Find the Year 8 total first."],
        strategy: "Use the totals",
      },
      {
        kind: "short",
        id: "statistics-p4-q03",
        question: "The pie chart shows how 72 visitors travelled to the Singapore Zoo one morning. How many visitors came by bus?",
        diagram: `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pie chart of how 72 visitors travelled. Car 150 degrees, bus 90 degrees, MRT 80 degrees, taxi 40 degrees."><rect x="0" y="0" width="300" height="260" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><path d="M150,130 L150,30 A100,100 0 0 1 200,216.6 Z" fill="#c7d2fe"/><path d="M150,130 L200,216.6 A100,100 0 0 1 63.4,180 Z" fill="#fde68a"/><path d="M150,130 L63.4,180 A100,100 0 0 1 85.72,53.4 Z" fill="#bbf7d0"/><path d="M150,130 L85.72,53.4 A100,100 0 0 1 150,30 Z" fill="#fecaca"/></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="208" y="110">Car</text><text x="208" y="124">150°</text><text x="134" y="182">Bus</text><text x="134" y="196">90°</text><text x="92" y="116">MRT</text><text x="92" y="130">80°</text><text x="126" y="62">Taxi</text><text x="126" y="76">40°</text></g></svg>`,
        answer: { type: "number", value: 18 },
        traps: [
          { spec: { type: "number", value: 90 }, feedback: "90° is the angle of the bus sector, not the number of visitors." },
          { spec: { type: "number", value: 25 }, feedback: "90° is 25% of the circle. Now find 25% of the 72 visitors." },
        ],
        solution: ["The bus sector is 90°, which is {{90/360 = 1/4}} of the circle.", "{{1/4}} of 72 = 18 visitors."],
        difficulty: "warmup",
        guideRef: "charts",
        hints: ["What fraction of the full 360° is the bus sector?"],
        strategy: "Fraction of the whole",
      },
      {
        kind: "short",
        id: "statistics-p4-q04",
        question:
          "Here are the times, in seconds, that 12 members of a Rubik's cube club took to solve a cube:\n\n    38, 52, 41, 47, 35, 60, 44, 49, 53, 41, 39, 58\n\nWei Ling draws an ordered stem-and-leaf diagram with the key 4 | 7 means 47 seconds. Write down the leaves in the row for stem 4, in order.",
        answer: { type: "list", values: [1, 1, 4, 7, 9], ordered: true, display: "1 1 4 7 9" },
        traps: [
          {
            spec: { type: "list", values: [1, 7, 4, 9, 1], ordered: true },
            feedback: "Those are the right leaves, but in the order they appear in the list. An **ordered** diagram puts them smallest first.",
          },
        ],
        solution: [
          "Pick out the times in the forties: 41, 47, 44, 49, 41.",
          "Their leaves are the units digits: 1, 7, 4, 9, 1.",
          "In order: 1 1 4 7 9. Both 41s need their own leaf.",
        ],
        commonError: "Writing a repeated value only once. Every data value needs its own leaf.",
        difficulty: "warmup",
        guideRef: "stem-and-leaf",
        hints: ["Which times are in the forties? Their units digits are the leaves."],
        strategy: "Sort systematically",
      },
      {
        kind: "short",
        id: "statistics-p4-q05",
        question:
          "The scatter graph shows the age and the price of 10 second-hand bicycles sold online. One bicycle does not fit the pattern of the others.\n\nWrite down its age and its price, in that order.",
        diagram: `<svg viewBox="0 0 440 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter graph of bicycle age from 0 to 9 years against price from 0 to 600 dollars. Points: 1 year 540, 2 years 480, 2 years 440, 3 years 400, 4 years 360, 4 years 320, 5 years 280, 6 years 450, 7 years 160, 8 years 120."><rect x="0" y="0" width="440" height="310" fill="#ffffff"/><path d="M90 30V270M130 30V270M170 30V270M210 30V270M250 30V270M290 30V270M330 30V270M370 30V270M410 30V270M50 250H410M50 230H410M50 210H410M50 190H410M50 170H410M50 150H410M50 130H410M50 110H410M50 90H410M50 70H410M50 50H410M50 30H410" stroke="#e5e7eb" stroke-width="1" fill="none"/><path d="M50 30V270H410" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="50" y="286">0</text><text x="90" y="286">1</text><text x="130" y="286">2</text><text x="170" y="286">3</text><text x="210" y="286">4</text><text x="250" y="286">5</text><text x="290" y="286">6</text><text x="330" y="286">7</text><text x="370" y="286">8</text><text x="410" y="286">9</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="274">0</text><text x="44" y="234">100</text><text x="44" y="194">200</text><text x="44" y="154">300</text><text x="44" y="114">400</text><text x="44" y="74">500</text><text x="44" y="34">600</text></g><text x="230" y="304" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Age (years)</text><text x="14" y="150" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 150)">Price ($)</text><g fill="#1f2937"><circle cx="90" cy="54" r="3.5"/><circle cx="130" cy="78" r="3.5"/><circle cx="130" cy="94" r="3.5"/><circle cx="170" cy="110" r="3.5"/><circle cx="210" cy="126" r="3.5"/><circle cx="210" cy="142" r="3.5"/><circle cx="250" cy="158" r="3.5"/><circle cx="290" cy="90" r="3.5"/><circle cx="330" cy="206" r="3.5"/><circle cx="370" cy="222" r="3.5"/></g></svg>`,
        answer: { type: "list", values: [6, 450], ordered: true, display: "6 years, $450" },
        traps: [
          {
            spec: { type: "list", values: [8, 120], ordered: true },
            feedback: "The 8-year-old bicycle is the oldest and cheapest, but it fits the downward pattern. Look for the point far away from the trend.",
          },
        ],
        solution: [
          "The points fall from left to right: older bicycles tend to be cheaper (negative correlation).",
          "One point sits far above the trend: a 6-year-old bicycle priced at $450.",
          "The pattern suggests a 6-year-old bicycle should cost about $220, so this one does not fit.",
        ],
        difficulty: "warmup",
        guideRef: "scatter-graphs",
        hints: ["Look for the point that sits well away from the downward trend, then read across and up."],
        strategy: "Spot the outlier",
      },
      {
        kind: "short",
        id: "statistics-p4-q06",
        question:
          "Ethan sorts the whole numbers from 1 to 20 into this Carroll diagram.\n\n| | Square number | Not a square number |\n|---|---|---|\n| **Factor of 36** | | |\n| **Not a factor of 36** | | |\n\nHow many numbers go in the cell for 'factor of 36' and 'not a square number'?",
        answer: { type: "number", value: 5 },
        traps: [
          { spec: { type: "number", value: 8 }, feedback: "8 is all the factors of 36 up to 20. Leave out the ones that are square numbers: 1, 4 and 9." },
          { spec: { type: "number", value: 6 }, feedback: "1 = 1 × 1, so 1 is a square number. It belongs in the 'square number' column." },
        ],
        solution: [
          "Factors of 36 from 1 to 20: 1, 2, 3, 4, 6, 9, 12, 18.",
          "Square numbers from 1 to 20: 1, 4, 9, 16.",
          "Factors of 36 that are **not** square numbers: 2, 3, 6, 12, 18.",
          "That is 5 numbers.",
        ],
        commonError: "Forgetting that 1 is a square number.",
        difficulty: "core",
        guideRef: "venn-carroll",
        hints: ["List the factors of 36 that are 20 or less.", "Cross out any that are square numbers. Don't forget 1."],
        strategy: "List systematically",
      },
      {
        kind: "written",
        id: "statistics-p4-q07",
        question:
          "Two pupils investigate whether people in their neighbourhood want a new basketball court.\n\n- **Ravi** asks 200 people at the badminton hall in the community centre on a Saturday morning.\n- **Mei** picks 50 households at random from a list of every household in the neighbourhood, and asks one adult in each.\n\nRavi says: \"My sample is four times as big, so my results are more reliable.\"\n\nIs Ravi right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "No, Ravi is not right. A bigger sample is only more reliable if it is chosen fairly.\n\nRavi's sample is **biased**. Everyone he asked was at a badminton hall, so they are likely to be keen on sport and more likely to want a basketball court. People who were at work, at home or elsewhere on Saturday morning had no chance of being asked.\n\nMei's sample is **random**. Every household had an equal chance of being picked, so her 50 people are much more likely to represent the whole neighbourhood. Her sample is smaller, but it is fair. Ravi's 200 just repeat the same bias 200 times.",
        markScheme: [
          {
            point: "Says Ravi is not right: a bigger sample only helps if it is fair or representative",
            keywords: ["not right", "no", "only if", "representative", "fair", "bigger is not always"],
          },
          {
            point: "Ravi's sample is biased: people at a sports hall are likely to want a court (one place, one time)",
            keywords: ["biased", "sport", "badminton", "keen", "saturday", "one place", "want a court"],
          },
          {
            point: "Mei's sample is random, so every household has an equal chance and it represents the neighbourhood",
            keywords: ["random", "equal chance", "every household", "whole neighbourhood", "list"],
          },
        ],
        commonError: "Thinking a bigger sample always beats a smaller one, whatever the method.",
        difficulty: "core",
        guideRef: "data-and-sampling",
        hints: [
          "Who is likely to be at a badminton hall on a Saturday morning?",
          "Would those people be typical of the whole neighbourhood?",
          "What does choosing 'at random from a list of every household' give you?",
        ],
        strategy: "Look for bias",
      },
      {
        kind: "short",
        id: "statistics-p4-q08",
        question:
          "The dual bar chart shows the number of durian puffs and pandan cakes sold by a bakery on four days.\n\nFind:\n\n(a) the total number of pandan cakes sold over the four days\n\n(b) the largest difference between the two items on a single day.\n\nGive your answers in the order (a), (b).",
        diagram: `<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dual bar chart with gridlines every 2. Monday: durian puffs 18, pandan cakes 12. Tuesday: durian puffs 14, pandan cakes 16. Wednesday: durian puffs 22, pandan cakes 10. Thursday: durian puffs 16, pandan cakes 20."><rect x="0" y="0" width="420" height="300" fill="#ffffff"/><path d="M60 242H400M60 224H400M60 206H400M60 188H400M60 170H400M60 152H400M60 134H400M60 116H400M60 98H400M60 80H400M60 62H400M60 44H400" stroke="#e5e7eb" stroke-width="1" fill="none"/><g stroke="#1f2937" stroke-width="1"><rect x="82" y="98" width="26" height="162" fill="#fde68a"/><rect x="112" y="152" width="26" height="108" fill="#bbf7d0"/><rect x="162" y="134" width="26" height="126" fill="#fde68a"/><rect x="192" y="116" width="26" height="144" fill="#bbf7d0"/><rect x="242" y="62" width="26" height="198" fill="#fde68a"/><rect x="272" y="170" width="26" height="90" fill="#bbf7d0"/><rect x="322" y="116" width="26" height="144" fill="#fde68a"/><rect x="352" y="80" width="26" height="180" fill="#bbf7d0"/></g><path d="M60 44V260H400" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="54" y="264">0</text><text x="54" y="228">4</text><text x="54" y="192">8</text><text x="54" y="156">12</text><text x="54" y="120">16</text><text x="54" y="84">20</text><text x="54" y="48">24</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="110" y="278">Mon</text><text x="190" y="278">Tue</text><text x="270" y="278">Wed</text><text x="350" y="278">Thu</text></g><text x="18" y="152" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 18 152)">Number sold</text><g font-size="12" font-family="sans-serif" fill="#1f2937"><rect x="110" y="12" width="12" height="12" fill="#fde68a" stroke="#1f2937"/><text x="127" y="22">Durian puffs</text><rect x="230" y="12" width="12" height="12" fill="#bbf7d0" stroke="#1f2937"/><text x="247" y="22">Pandan cakes</text></g></svg>`,
        answer: { type: "list", values: [58, 12], ordered: true, display: "(a) 58, (b) 12" },
        traps: [
          { spec: { type: "list", values: [70, 12], ordered: true }, feedback: "70 is the total number of **durian puffs**. Use the key to check which bars are the pandan cakes." },
        ],
        solution: [
          "Pandan cakes: Mon 12, Tue 16, Wed 10, Thu 20.",
          "(a) Total = 12 + 16 + 10 + 20 = 58.",
          "Differences: Mon 18 − 12 = 6, Tue 16 − 14 = 2, Wed 22 − 10 = 12, Thu 20 − 16 = 4.",
          "(b) The largest difference is 12 (on Wednesday).",
        ],
        difficulty: "core",
        guideRef: "charts",
        hints: [
          "Use the key to check which bar is which.",
          "Each gridline is worth 2.",
          "For (b), work out the gap between the two bars on every day.",
        ],
        strategy: "Read carefully, then compare",
      },
      {
        kind: "short",
        id: "statistics-p4-q09",
        question:
          "The back-to-back stem-and-leaf diagram shows the scores (out of 50) of two classes in a spelling-bee practice.\n\n| 8S | Stem | 8T |\n|---|---|---|\n| 8 6 | 1 | 4 9 |\n| 9 7 5 1 | 2 | 0 3 6 |\n| 8 6 4 4 2 | 3 | 1 2 5 7 7 8 |\n| 3 0 | 4 | 2 4 5 |\n\nKey: 6 | 1 | 4 means 16 for 8S and 14 for 8T\n\nA score of **35 or more** earns a certificate. How many more pupils in 8T than in 8S earn a certificate?",
        answer: { type: "number", value: 3 },
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "A score of exactly 35 counts: '35 or more' includes 35." },
          { spec: { type: "number", value: 11 }, feedback: "11 is the total number of certificates. The question asks how many **more** 8T earned than 8S." },
        ],
        solution: [
          "8S's leaves are on the left. Read each one with its stem: '8 6 4 4 2 | 3' gives 32, 34, 34, 36, 38.",
          "8S scores of 35 or more: 36, 38, 40, 43, so 4 pupils.",
          "8T scores of 35 or more: 35, 37, 37, 38, 42, 44, 45, so 7 pupils.",
          "7 − 4 = 3 more pupils in 8T.",
        ],
        commonError: "Reading the left-hand leaves as if the leaf came first (61 instead of 16). The stem is always the tens digit.",
        difficulty: "core",
        guideRef: "stem-and-leaf",
        hints: [
          "Use the key: on the left, 6 | 1 means 16 for 8S.",
          "In each class, count the scores from 35 upwards, including 35.",
          "Subtract the two counts.",
        ],
        strategy: "Read the key first",
      },
      {
        kind: "short",
        id: "statistics-p4-q10",
        question:
          "Here are the masses, in kg, of 20 pupils' school bags:\n\n    3.2, 4.8, 5.0, 2.7, 6.1, 4.4, 3.9, 5.5, 7.0, 4.0,\n    2.5, 6.6, 3.0, 5.9, 4.7, 3.5, 6.0, 4.9, 5.2, 3.8\n\nAisha puts them in a grouped frequency table with the classes {{2 < m <= 3}}, {{3 < m <= 4}}, {{4 < m <= 5}}, {{5 < m <= 6}} and {{6 < m <= 7}}.\n\nWrite down the five frequencies, in order from the lightest class to the heaviest.",
        answer: { type: "list", values: [3, 5, 5, 4, 3], ordered: true, display: "3, 5, 5, 4, 3" },
        traps: [
          {
            spec: { type: "list", values: [2, 5, 5, 4, 4], ordered: true },
            feedback: "Check the boundary values 3.0, 4.0, 5.0 and 6.0. In {{2 < m <= 3}} the sign ≤ means 3.0 belongs in that class, not the next one.",
          },
        ],
        solution: [
          "Work through the list once, tallying each mass into its class.",
          "Watch the boundaries: {{2 < m <= 3}} includes 3.0, so 3.0, 4.0, 5.0, 6.0 and 7.0 each go in the class that **ends** at that value.",
          "{{2 < m <= 3}}: 2.7, 2.5, 3.0 → 3",
          "{{3 < m <= 4}}: 3.2, 3.9, 4.0, 3.5, 3.8 → 5",
          "{{4 < m <= 5}}: 4.8, 5.0, 4.4, 4.7, 4.9 → 5",
          "{{5 < m <= 6}}: 5.5, 5.9, 6.0, 5.2 → 4",
          "{{6 < m <= 7}}: 6.1, 7.0, 6.6 → 3",
          "Check: 3 + 5 + 5 + 4 + 3 = 20 ✓",
        ],
        commonError: "Putting a boundary value such as 4.0 into the class that *starts* at 4 instead of the one that *ends* at 4.",
        difficulty: "core",
        guideRef: "tables",
        hints: [
          "Read {{3 < m <= 4}} as 'more than 3, up to and including 4'.",
          "Which class does 4.0 go in? Which class does 3.0 go in?",
          "Tally as you go, then check that your frequencies add up to 20.",
        ],
        strategy: "Tally and check the total",
      },
      {
        kind: "written",
        id: "statistics-p4-q11",
        question:
          "Zara has collected three sets of data for a project:\n\n- **A:** the temperature at Changi every hour for one day\n- **B:** how the 36 pupils in her class travel to school (MRT, bus, car or walk)\n- **C:** the height and the arm span of each pupil in her class\n\nRavi says: \"She should draw a pie chart for all three.\"\n\nExplain why Ravi is wrong. Suggest a suitable chart for **A** and for **C**, with a reason for each.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong because a pie chart only works for data that splits **one whole into parts**, like B: the 36 pupils split into MRT, bus, car and walk.\n\n**A** is a measurement changing over **time**, so Zara should use a **line graph** (time series). It shows how the temperature rises and falls through the day. The 24 temperatures are not parts of a whole, so a pie chart makes no sense.\n\n**C** is a pair of numerical measurements for each pupil, so she should use a **scatter graph**. It shows whether there is a correlation between height and arm span.",
        markScheme: [
          {
            point: "A pie chart only suits parts of a whole (data set B); A and C are not parts of a whole",
            keywords: ["parts", "whole", "only b", "categories", "not a whole", "proportion"],
          },
          { point: "A: a line graph, because it shows change over time", keywords: ["line graph", "line", "time", "change", "trend", "time series"] },
          {
            point: "C: a scatter graph, because it shows the relationship (correlation) between two numerical variables",
            keywords: ["scatter", "correlation", "relationship", "two variables", "pairs"],
          },
        ],
        commonError: "Choosing a chart because it looks nice rather than because it fits the type of data and the question.",
        difficulty: "core",
        guideRef: "choosing-and-misleading",
        hints: [
          "What does a pie chart show? Which of A, B and C fits that?",
          "A is about change over time. Which graph shows that?",
          "C pairs two measurements for each pupil. Which graph plots pairs?",
        ],
        strategy: "Match the chart to the data",
      },
      {
        kind: "short",
        id: "statistics-p4-q12",
        question:
          "A school newsletter shows how its pupils travelled to school in 2015 and in 2025. Each bar shows percentages. The school had 500 pupils in 2015 and 840 pupils in 2025.\n\nThe walking section of the bar is smaller in 2025. How many **more** pupils walked to school in 2025 than in 2015?",
        diagram: `<svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two percentage bars. 2015, 500 pupils: walk 0 to 30 percent, bus 30 to 70, MRT 70 to 90, car 90 to 100. 2025, 840 pupils: walk 0 to 20 percent, bus 20 to 50, MRT 50 to 90, car 90 to 100."><rect x="0" y="0" width="360" height="300" fill="#ffffff"/><path d="M60 238H320M60 216H320M60 194H320M60 172H320M60 150H320M60 128H320M60 106H320M60 84H320M60 62H320M60 40H320" stroke="#e5e7eb" stroke-width="1" fill="none"/><g stroke="#1f2937" stroke-width="1"><rect x="100" y="194" width="70" height="66" fill="#bbf7d0"/><rect x="100" y="106" width="70" height="88" fill="#fde68a"/><rect x="100" y="62" width="70" height="44" fill="#c7d2fe"/><rect x="100" y="40" width="70" height="22" fill="#fecaca"/><rect x="210" y="216" width="70" height="44" fill="#bbf7d0"/><rect x="210" y="150" width="70" height="66" fill="#fde68a"/><rect x="210" y="62" width="70" height="88" fill="#c7d2fe"/><rect x="210" y="40" width="70" height="22" fill="#fecaca"/></g><path d="M60 40V260H320" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="135" y="231">Walk</text><text x="135" y="154">Bus</text><text x="135" y="88">MRT</text><text x="135" y="55">Car</text><text x="245" y="242">Walk</text><text x="245" y="187">Bus</text><text x="245" y="110">MRT</text><text x="245" y="55">Car</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="54" y="264">0%</text><text x="54" y="242">10%</text><text x="54" y="220">20%</text><text x="54" y="198">30%</text><text x="54" y="176">40%</text><text x="54" y="154">50%</text><text x="54" y="132">60%</text><text x="54" y="110">70%</text><text x="54" y="88">80%</text><text x="54" y="66">90%</text><text x="54" y="44">100%</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="135" y="276">2015</text><text x="135" y="291">500 pupils</text><text x="245" y="276">2025</text><text x="245" y="291">840 pupils</text></g><text x="14" y="150" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 150)">Percentage of pupils</text></svg>`,
        answer: { type: "number", value: 18 },
        traps: [
          { spec: { type: "number", value: 10 }, feedback: "10 is the fall in **percentage points** (30% to 20%). But the school grew, so work out the actual numbers of pupils." },
          { spec: { type: "number", value: 168 }, feedback: "168 pupils walked in 2025. Now compare that with the number who walked in 2015." },
        ],
        solution: [
          "Read the walking sections from the axis: 2015 = 30%, 2025 = 20%.",
          "2015: 30% of 500 = 150 pupils walked.",
          "2025: 20% of 840 = 168 pupils walked.",
          "168 − 150 = 18 more pupils walked in 2025, even though the percentage fell.",
        ],
        commonError: "Comparing percentages of different totals as if they were numbers of pupils.",
        difficulty: "core",
        guideRef: "charts",
        hints: [
          "A percentage bar shows proportions, not numbers of pupils.",
          "Read the walking percentage for each year from the axis.",
          "Find 30% of 500 and 20% of 840.",
        ],
        strategy: "Turn percentages into amounts",
      },
      {
        kind: "short",
        id: "statistics-p4-q13",
        question:
          "The scatter graph shows how many hours a week 12 pupils practise on a typing app, and their typing speed in words per minute (wpm). The line of best fit passes through (2, 30) and (10, 62).\n\nUse the line of best fit to estimate the typing speed of a pupil who practises for 7 hours a week. Give your answer in wpm.",
        diagram: `<svg viewBox="0 0 440 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter graph of practice hours per week from 0 to 12 against typing speed from 0 to 70 words per minute, showing positive correlation. A line of best fit runs from 22 wpm at 0 hours to 70 wpm at 12 hours, passing through 2 hours 30 wpm and 10 hours 62 wpm. One pupil practised 7 hours and types at 47 wpm."><rect x="0" y="0" width="440" height="310" fill="#ffffff"/><path d="M80 25V270M110 25V270M140 25V270M170 25V270M200 25V270M230 25V270M260 25V270M290 25V270M320 25V270M350 25V270M380 25V270M410 25V270M50 252.5H410M50 235H410M50 217.5H410M50 200H410M50 182.5H410M50 165H410M50 147.5H410M50 130H410M50 112.5H410M50 95H410M50 77.5H410M50 60H410M50 42.5H410M50 25H410" stroke="#e5e7eb" stroke-width="1" fill="none"/><path d="M50 25V270H410" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="50" y="286">0</text><text x="80" y="286">1</text><text x="110" y="286">2</text><text x="140" y="286">3</text><text x="170" y="286">4</text><text x="200" y="286">5</text><text x="230" y="286">6</text><text x="260" y="286">7</text><text x="290" y="286">8</text><text x="320" y="286">9</text><text x="350" y="286">10</text><text x="380" y="286">11</text><text x="410" y="286">12</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="274">0</text><text x="44" y="239">10</text><text x="44" y="204">20</text><text x="44" y="169">30</text><text x="44" y="134">40</text><text x="44" y="99">50</text><text x="44" y="64">60</text><text x="44" y="29">70</text></g><text x="230" y="304" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Practice per week (hours)</text><text x="14" y="148" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 148)">Typing speed (wpm)</text><line x1="50" y1="193" x2="410" y2="25" stroke="#2563eb" stroke-width="2"/><g fill="#1f2937"><circle cx="80" cy="172" r="3.5"/><circle cx="110" cy="154.5" r="3.5"/><circle cx="140" cy="161.5" r="3.5"/><circle cx="170" cy="130" r="3.5"/><circle cx="200" cy="130" r="3.5"/><circle cx="230" cy="102" r="3.5"/><circle cx="260" cy="105.5" r="3.5"/><circle cx="290" cy="74" r="3.5"/><circle cx="320" cy="74" r="3.5"/><circle cx="335" cy="63.5" r="3.5"/><circle cx="350" cy="46" r="3.5"/><circle cx="380" cy="46" r="3.5"/></g></svg>`,
        answer: { type: "number", value: 50, tolerance: 2, display: "about 50 wpm" },
        traps: [
          { spec: { type: "number", value: 47 }, feedback: "47 wpm is the actual result of the one pupil who practised 7 hours. The question asks for the estimate from the **line**." },
          { spec: { type: "number", value: 28 }, feedback: "28 = 7 × 4, but the line doesn't start at 0 wpm. It goes through (2, 30)." },
        ],
        solution: [
          "From 2 hours to 10 hours (8 more hours), the line rises from 30 to 62 wpm: a rise of 32 wpm.",
          "So the line rises 32 ÷ 8 = 4 wpm for each extra hour.",
          "From 2 hours to 7 hours is 5 more hours: 30 + 5 × 4 = 50 wpm.",
          "Reading the graph at 7 hours gives the same answer: about 50 wpm.",
        ],
        commonError: "Reading the nearest plotted point instead of the line of best fit.",
        difficulty: "core",
        guideRef: "scatter-graphs",
        hints: [
          "Go up from 7 hours to the line, then across.",
          "Or: how much does the line rise for each extra hour between (2, 30) and (10, 62)?",
          "It rises 4 wpm per hour. Start from (2, 30) and add 5 hours' worth.",
        ],
        strategy: "Read from the line",
      },
      {
        kind: "short",
        id: "statistics-p4-q14",
        question:
          "The frequency diagram shows the lengths, l cm, of the long beans picked at a community garden.\n\nWhat percentage of the beans are **longer than 30 cm**?",
        diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frequency diagram of long bean lengths with touching bars. 20 to 25 cm: 6. 25 to 30 cm: 14. 30 to 35 cm: 18. 35 to 40 cm: 10. 40 to 45 cm: 2."><rect x="0" y="0" width="400" height="300" fill="#ffffff"/><path d="M50 238H360M50 216H360M50 194H360M50 172H360M50 150H360M50 128H360M50 106H360M50 84H360M50 62H360M50 40H360" stroke="#e5e7eb" stroke-width="1" fill="none"/><g stroke="#1f2937" stroke-width="1" fill="#bae6fd"><rect x="50" y="194" width="60" height="66"/><rect x="110" y="106" width="60" height="154"/><rect x="170" y="62" width="60" height="198"/><rect x="230" y="150" width="60" height="110"/><rect x="290" y="238" width="60" height="22"/></g><path d="M50 40V260H360" stroke="#334155" stroke-width="1.5" fill="none"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="50" y="276">20</text><text x="110" y="276">25</text><text x="170" y="276">30</text><text x="230" y="276">35</text><text x="290" y="276">40</text><text x="350" y="276">45</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="44" y="264">0</text><text x="44" y="242">2</text><text x="44" y="220">4</text><text x="44" y="198">6</text><text x="44" y="176">8</text><text x="44" y="154">10</text><text x="44" y="132">12</text><text x="44" y="110">14</text><text x="44" y="88">16</text><text x="44" y="66">18</text><text x="44" y="44">20</text></g><text x="205" y="294" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Length, l (cm)</text><text x="16" y="150" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 16 150)">Frequency</text></svg>`,
        answer: { type: "number", value: 60, display: "60%" },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "30 beans are longer than 30 cm. Now write that as a percentage of all 50 beans." },
          { spec: { type: "number", value: 88 }, feedback: "That includes the {{25 < l <= 30}} bar. Beans in that class are 30 cm or shorter, so leave them out." },
        ],
        solution: [
          "Read the bars: {{20 < l <= 25}}: 6, {{25 < l <= 30}}: 14, {{30 < l <= 35}}: 18, {{35 < l <= 40}}: 10, {{40 < l <= 45}}: 2.",
          "Total = 6 + 14 + 18 + 10 + 2 = 50 beans.",
          "Longer than 30 cm: 18 + 10 + 2 = 30 beans.",
          "Percentage = {{30/50}} × 100 = 60%.",
        ],
        difficulty: "core",
        guideRef: "continuous-data",
        hints: [
          "Read the height of each bar. Each gridline is 2 beans.",
          "Which bars are completely above 30 cm?",
          "Find the total, then the percentage.",
        ],
        strategy: "Read, total, compare",
      },
      {
        kind: "written",
        id: "statistics-p4-q15",
        question:
          "Wei Ling measures the heights of 30 pupils to the nearest centimetre. The shortest is 138 cm and the tallest is 181 cm. She plans this grouped frequency table:\n\n| Height (cm) | Frequency |\n|---|---|\n| 140–150 | |\n| 150–160 | |\n| 160–170 | |\n| 170–180 | |\n\nDescribe **two** problems with her classes. Then write a better set of classes.",
        marks: 3,
        modelAnswer:
          "**Problem 1: the classes overlap.** A height of 150 cm fits in both 140–150 and 150–160 (the same happens at 160 and 170), so she won't know where to put it.\n\n**Problem 2: the classes don't cover all the data.** 138 cm is below 140 and 181 cm is above 180, so those two pupils have no class.\n\n**Better classes** (inequalities, no gaps or overlaps, covering 138 to 181):\n\n| Height, h cm |\n|---|\n| {{130 <= h < 140}} |\n| {{140 <= h < 150}} |\n| {{150 <= h < 160}} |\n| {{160 <= h < 170}} |\n| {{170 <= h < 180}} |\n| {{180 <= h < 190}} |",
        markScheme: [
          { point: "The classes overlap: a boundary value such as 150 cm fits in two classes", keywords: ["overlap", "two classes", "both", "150", "160", "170"] },
          {
            point: "The classes don't cover the data: 138 cm and 181 cm have no class",
            keywords: ["138", "181", "missing", "not covered", "no class", "below 140", "above 180", "don't fit"],
          },
          {
            point: "New classes written with inequalities, with no gaps or overlaps, from 130 (or 135) up to 190 (or 185)",
            keywords: ["<=", "≤", "<", "130", "190", "inequality", "inequalities", "135", "185"],
          },
        ],
        commonError: "Fixing the overlap but forgetting to extend the classes to cover the smallest and largest values.",
        difficulty: "core",
        guideRef: "tables",
        hints: [
          "Where would a pupil who is exactly 150 cm tall go?",
          "Does every pupil, including the shortest and the tallest, have a class?",
          "Use inequalities like {{140 <= h < 150}}.",
        ],
        strategy: "Test the boundaries",
      },
      {
        kind: "short",
        id: "statistics-p4-q16",
        question: "The Venn diagram shows how many of the 40 members of a youth club play chess (C) and how many play badminton (B). How many members play chess?",
        diagram: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram for 40 members with circles labelled Chess C and Badminton B. Chess only 2x, both x plus 3, badminton only 15, outside both circles 4."><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><rect x="10" y="10" width="300" height="180" fill="none" stroke="#334155" stroke-width="1.5"/><text x="20" y="30" font-size="14" font-family="sans-serif" fill="#1f2937">ξ</text><circle cx="125" cy="108" r="70" fill="#bbf7d0" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><circle cx="195" cy="108" r="70" fill="#bae6fd" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><text x="95" y="30" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Chess (C)</text><text x="232" y="30" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Badminton (B)</text><g font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="90" y="113">2x</text><text x="160" y="113">x + 3</text><text x="230" y="113">15</text><text x="290" y="178">4</text></g></svg>`,
        answer: { type: "number", value: 21 },
        traps: [
          { spec: { type: "number", value: 6 }, feedback: "x = 6, but that isn't the answer. Use it to find everyone in the chess circle: 2x + (x + 3)." },
          { spec: { type: "number", value: 12 }, feedback: "12 members play chess **only**. The chess circle also includes the overlap, x + 3 = 9." },
        ],
        solution: [
          "All four regions add to 40: 2x + (x + 3) + 15 + 4 = 40.",
          "3x + 22 = 40, so 3x = 18 and x = 6.",
          "Chess circle = 2x + (x + 3) = 12 + 9 = 21 members.",
        ],
        commonError: "Stopping at x = 6, or forgetting that the overlap is part of the chess circle.",
        difficulty: "core",
        guideRef: "venn-carroll",
        hints: [
          "All the numbers in the diagram, including the 4 outside, add up to 40.",
          "Write an equation and solve it for x.",
          "The chess circle includes the overlap.",
        ],
        strategy: "Form an equation",
      },
      {
        kind: "short",
        id: "statistics-p4-q17",
        question:
          "A pie chart shows the favourite CCAs of 60 pupils. The robotics sector has an angle of 72°.\n\nLater, some new pupils join the survey, and **all** of them choose robotics. The pie chart is redrawn for everybody, and now the robotics sector is exactly 90°.\n\nHow many new pupils joined?",
        answer: { type: "number", value: 4 },
        traps: [
          {
            spec: { type: "number", value: 3 },
            feedback: "3 more would make 15 robotics pupils, which is 90° of the *old* total of 60. But the total grows as well, so each pupil is worth less than 6°.",
          },
        ],
        solution: [
          "At first, robotics has {{72/360}} × 60 = 12 pupils.",
          "Let n new pupils join. Robotics then has 12 + n out of 60 + n pupils.",
          "90° is {{1/4}} of the circle, so {{(12 + n)/(60 + n) = 1/4}}.",
          "4(12 + n) = 60 + n, so 48 + 4n = 60 + n, so 3n = 12 and n = 4.",
          "Check: 16 out of 64 is {{1/4}}, which is 90° ✓",
        ],
        solutions: [
          {
            label: "Quicker: follow the pupils who don't change",
            steps: [
              "48 pupils chose other CCAs, and that number doesn't change.",
              "Afterwards they fill 360° − 90° = 270°, which is {{3/4}} of the chart.",
              "So {{3/4}} of the new total is 48, and the new total is 64.",
              "64 − 60 = 4 new pupils.",
            ],
          },
        ],
        commonError: "Treating each pupil as still worth 6°. Once new pupils join, the total changes, so every sector is redrawn.",
        difficulty: "challenge",
        guideRef: "charts",
        hints: [
          "How many pupils chose robotics at the start?",
          "The new pupils change the total as well as the robotics count. Which group stays the same?",
          "The 48 other pupils must now fill 270°, which is {{3/4}} of the chart.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "statistics-p4-q18",
        question:
          "An infographic shows a bakery's sales of durian mooncakes as cubes. In 2024 the bakery sold 500 boxes, shown by a cube with edges 2 cm long. In 2025 it sold 1000 boxes.\n\nTo be fair, the **volume** of the 2025 cube should be in proportion to the sales. How long should the edges of the 2025 cube be? Give your answer in cm, correct to 2 decimal places. You may use a calculator.",
        answer: { type: "number", value: 2.52, allowFraction: false, display: "2.52 cm" },
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "Doubling every edge makes the volume 2 × 2 × 2 = 8 times as big, so sales would look 8 times bigger." },
          { spec: { type: "number", value: 2.83 }, feedback: "That doubles the area of each face. For a cube it is the **volume** that must double." },
        ],
        solution: [
          "2024 cube volume = 2 × 2 × 2 = 8 cm³.",
          "Sales doubled, so the 2025 volume should be 2 × 8 = 16 cm³.",
          "Edge = {{cbrt(16)}} = 2.5198… ≈ 2.52 cm.",
          "The edges should grow by only about 26%. A designer who doubles the edges makes the growth look 8 times as big, which is a classic misleading infographic.",
        ],
        commonError: "Scaling the length when it is the volume (or area) that the eye judges.",
        difficulty: "challenge",
        guideRef: "choosing-and-misleading",
        hints: [
          "What is the volume of the 2024 cube?",
          "Sales doubled. What should the 2025 volume be?",
          "Find the number whose cube is 16.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "written",
        id: "statistics-p4-q19",
        question:
          "Two swimming coaches, Mei and Jun, each trained 100 swimmers for a survival-swimming test. The table shows how many passed.\n\n| | Mei: passed | Mei: swimmers | Jun: passed | Jun: swimmers |\n|---|---|---|---|---|\n| Advanced | 18 | 20 | 68 | 80 |\n| Beginners | 40 | 80 | 9 | 20 |\n| All | 58 | 100 | 77 | 100 |\n\nRavi says: \"Jun is the better coach, because 77% of his swimmers passed but only 58% of Mei's did.\"\n\nUse percentages to explain why Ravi's conclusion could be wrong.",
        marks: 4,
        modelAnswer:
          "Compare like with like.\n\n- **Advanced swimmers:** Mei {{18/20}} = 90%, Jun {{68/80}} = 85%.\n- **Beginners:** Mei {{40/80}} = 50%, Jun {{9/20}} = 45%.\n\nSo Mei has the **higher** pass rate in **both** groups.\n\nHer overall rate is lower only because 80 of her 100 swimmers were beginners, who are much less likely to pass, while 80 of Jun's 100 were already advanced. The overall figures compare very different mixes of swimmers, so they don't show that Jun is the better coach. If anything, Mei did better with each type of swimmer.",
        markScheme: [
          { point: "Advanced pass rates: Mei 90%, Jun 85%", keywords: ["90", "85"] },
          { point: "Beginner pass rates: Mei 50%, Jun 45%", keywords: ["50", "45"] },
          { point: "Mei has the higher pass rate in both groups", keywords: ["both", "each group", "higher", "better in"] },
          {
            point: "Explains that Mei's overall rate is lower because most of her swimmers were beginners (the groups have different mixes)",
            keywords: ["80", "most", "beginners", "mix", "more beginners", "different"],
          },
        ],
        commonError: "Comparing only the overall totals, which hide the fact that the two coaches had very different groups.",
        difficulty: "challenge",
        guideRef: "tables",
        hints: [
          "Work out each coach's pass rate for the advanced swimmers, then for the beginners.",
          "Who does better in each group?",
          "Look at what kind of swimmers each coach mostly had.",
        ],
        strategy: "Compare like with like",
      },
      {
        kind: "short",
        id: "statistics-p4-q20",
        question:
          "All 30 members of a board-games club play at least one of chess, go and xiangqi.\n\n- 17 play chess, 13 play go and 11 play xiangqi.\n- 5 play both chess and go, 4 play both chess and xiangqi, and 3 play both go and xiangqi. These numbers include anyone who plays all three.\n\nHow many members play all three games?",
        answer: { type: "number", value: 1 },
        traps: [
          { spec: { type: "number", value: 0 }, feedback: "If nobody played all three, the regions would add up to 29, not 30. Put t in the centre and try again." },
          {
            spec: { type: "number", value: 11 },
            feedback: "17 + 13 + 11 − 30 = 11 counts the 'extra' memberships, but the pair numbers already include the members who play all three. Fill in a Venn diagram region by region.",
          },
        ],
        solution: [
          "Let t members play all three. Put t in the centre of a three-circle Venn diagram.",
          "Chess and go only: 5 − t. Chess and xiangqi only: 4 − t. Go and xiangqi only: 3 − t.",
          "Chess only: 17 − (5 − t) − (4 − t) − t = 8 + t.",
          "Go only: 13 − (5 − t) − (3 − t) − t = 5 + t. Xiangqi only: 11 − (4 − t) − (3 − t) − t = 4 + t.",
          "Everyone plays at least one game, so the seven regions add to 30: (8 + t) + (5 + t) + (4 + t) + (5 − t) + (4 − t) + (3 − t) + t = 29 + t.",
          "29 + t = 30, so t = 1.",
          "Check: 9 + 6 + 5 + 4 + 3 + 2 + 1 = 30 ✓",
        ],
        commonError: "Treating '5 play both chess and go' as '5 play *only* chess and go'. The pair counts include the centre.",
        difficulty: "challenge",
        guideRef: "venn-carroll",
        hints: [
          "Draw three overlapping circles and call the centre region t.",
          "Work from the middle outwards: chess and go *only* is 5 − t.",
          "Write every region in terms of t. All seven regions must add up to 30.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },
];
