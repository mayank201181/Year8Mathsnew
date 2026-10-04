import type { TopicPractice } from "../../types.ts";

// ---------------------------------------------------------------------------
// Diagrams
// ---------------------------------------------------------------------------

const ccaCompoundSvg = `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compound bar chart of boys and girls at three CCA sessions, with boys at the bottom of each bar and girls stacked on top. Vertical axis: number of pupils, 0 to 24 in steps of 2. Robotics: boys section up to 14, whole bar up to 20. Choir: boys section up to 4, whole bar up to 18. Badminton: boys section up to 10, whole bar up to 22."><rect x="0" y="0" width="360" height="270" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="50" y1="195" x2="310" y2="195"/><line x1="50" y1="180" x2="310" y2="180"/><line x1="50" y1="165" x2="310" y2="165"/><line x1="50" y1="150" x2="310" y2="150"/><line x1="50" y1="135" x2="310" y2="135"/><line x1="50" y1="120" x2="310" y2="120"/><line x1="50" y1="105" x2="310" y2="105"/><line x1="50" y1="90" x2="310" y2="90"/><line x1="50" y1="75" x2="310" y2="75"/><line x1="50" y1="60" x2="310" y2="60"/><line x1="50" y1="45" x2="310" y2="45"/><line x1="50" y1="30" x2="310" y2="30"/></g><g stroke="#334155" stroke-width="1"><rect x="75" y="105" width="50" height="105" fill="#c7d2fe"/><rect x="75" y="60" width="50" height="45" fill="#fde68a"/><rect x="155" y="180" width="50" height="30" fill="#c7d2fe"/><rect x="155" y="75" width="50" height="105" fill="#fde68a"/><rect x="235" y="135" width="50" height="75" fill="#c7d2fe"/><rect x="235" y="45" width="50" height="90" fill="#fde68a"/></g><g stroke="#334155" stroke-width="1.5"><line x1="50" y1="30" x2="50" y2="210"/><line x1="50" y1="210" x2="310" y2="210"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="214">0</text><text x="44" y="199">2</text><text x="44" y="184">4</text><text x="44" y="169">6</text><text x="44" y="154">8</text><text x="44" y="139">10</text><text x="44" y="124">12</text><text x="44" y="109">14</text><text x="44" y="94">16</text><text x="44" y="79">18</text><text x="44" y="64">20</text><text x="44" y="49">22</text><text x="44" y="34">24</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="50" y="20">Pupils</text><text x="100" y="228">Robotics</text><text x="180" y="228">Choir</text><text x="260" y="228">Badminton</text></g><rect x="110" y="241" width="12" height="12" fill="#c7d2fe" stroke="#334155"/><rect x="200" y="241" width="12" height="12" fill="#fde68a" stroke="#334155"/><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="128" y="252">Boys</text><text x="218" y="252">Girls</text></g></svg>`;

const kopiAdvertSvg = `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Advert bar chart titled We sell more. The vertical axis has no label or units and is marked 40, 45, 50, 60 and 80 at equal spacing. The Kopi Corner bar reaches the 80 mark and the Bean Bar bar reaches the 50 mark, so the Kopi Corner bar looks twice as tall."><rect x="0" y="0" width="320" height="240" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="60" y1="160" x2="300" y2="160"/><line x1="60" y1="120" x2="300" y2="120"/><line x1="60" y1="80" x2="300" y2="80"/><line x1="60" y1="40" x2="300" y2="40"/></g><g stroke="#334155" stroke-width="1"><rect x="95" y="40" width="70" height="160" fill="#fecaca"/><rect x="200" y="120" width="70" height="80" fill="#bae6fd"/></g><g stroke="#334155" stroke-width="1.5"><line x1="60" y1="30" x2="60" y2="200"/><line x1="60" y1="200" x2="300" y2="200"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end"><text x="54" y="204">40</text><text x="54" y="164">45</text><text x="54" y="124">50</text><text x="54" y="84">60</text><text x="54" y="44">80</text></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="180" y="20" font-size="14" font-weight="bold">WE SELL MORE!</text><text x="130" y="218" font-size="12">Kopi Corner</text><text x="235" y="218" font-size="12">Bean Bar</text></g></svg>`;

const rainfallLineSvg = `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph of monthly rainfall in millimetres from July to December. The points are labelled: July 150, August 170, September 165, October 190, November 255, December 290. The vertical axis goes from 0 to 300 in steps of 50."><rect x="0" y="0" width="380" height="260" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="55" y1="180" x2="365" y2="180"/><line x1="55" y1="150" x2="365" y2="150"/><line x1="55" y1="120" x2="365" y2="120"/><line x1="55" y1="90" x2="365" y2="90"/><line x1="55" y1="60" x2="365" y2="60"/><line x1="55" y1="30" x2="365" y2="30"/></g><g stroke="#334155" stroke-width="1.5"><line x1="55" y1="30" x2="55" y2="210"/><line x1="55" y1="210" x2="365" y2="210"/></g><polyline points="80,120 135,108 190,111 245,96 300,57 355,36" fill="none" stroke="#4338ca" stroke-width="2"/><g fill="#4338ca"><circle cx="80" cy="120" r="4"/><circle cx="135" cy="108" r="4"/><circle cx="190" cy="111" r="4"/><circle cx="245" cy="96" r="4"/><circle cx="300" cy="57" r="4"/><circle cx="355" cy="36" r="4"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="49" y="214">0</text><text x="49" y="184">50</text><text x="49" y="154">100</text><text x="49" y="124">150</text><text x="49" y="94">200</text><text x="49" y="64">250</text><text x="49" y="34">300</text><text x="240" y="90">190</text><text x="294" y="52">255</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="80" y="110">150</text><text x="135" y="98">170</text><text x="190" y="128">165</text><text x="355" y="26">290</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="80" y="228">Jul</text><text x="135" y="228">Aug</text><text x="190" y="228">Sep</text><text x="245" y="228">Oct</text><text x="300" y="228">Nov</text><text x="355" y="228">Dec</text><text x="210" y="250">Month</text></g><text x="58" y="20" font-family="sans-serif" font-size="12" fill="#1f2937">Rainfall (mm)</text></svg>`;

const musicArtVennSvg = `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram with two overlapping circles, Music and Art, inside a rectangle. Music only: 12. Both: 5. Art only: 9. Outside both circles: 4."><rect x="10" y="10" width="300" height="180" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="125" cy="105" r="68" fill="#c7d2fe" fill-opacity="0.6" stroke="#334155" stroke-width="1.5"/><circle cx="195" cy="105" r="68" fill="#fde68a" fill-opacity="0.6" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="24" y="30" font-size="13">ξ</text><text x="95" y="30" font-size="13" font-weight="bold">Music</text><text x="225" y="30" font-size="13" font-weight="bold">Art</text><text x="95" y="110" font-size="14">12</text><text x="160" y="110" font-size="14">5</text><text x="225" y="110" font-size="14">9</text><text x="285" y="178" font-size="14">4</text></g></svg>`;

const typingScatterSvg = `<svg viewBox="0 0 380 275" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter graph of hours of typing practice per week, 0 to 10, against typing speed in words per minute, 0 to 60. Points: (1, 22), (2, 28), (3, 30), (4, 36), (5, 38), (6, 45), (7, 20), (8, 52), (9, 55). A dashed line of best fit rises from about (0.5, 21) to (9.5, 57), passing through (1, 23) and (9, 55)."><rect x="0" y="0" width="380" height="275" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="80" y1="20" x2="80" y2="230"/><line x1="110" y1="20" x2="110" y2="230"/><line x1="140" y1="20" x2="140" y2="230"/><line x1="170" y1="20" x2="170" y2="230"/><line x1="200" y1="20" x2="200" y2="230"/><line x1="230" y1="20" x2="230" y2="230"/><line x1="260" y1="20" x2="260" y2="230"/><line x1="290" y1="20" x2="290" y2="230"/><line x1="320" y1="20" x2="320" y2="230"/><line x1="350" y1="20" x2="350" y2="230"/><line x1="50" y1="195" x2="350" y2="195"/><line x1="50" y1="160" x2="350" y2="160"/><line x1="50" y1="125" x2="350" y2="125"/><line x1="50" y1="90" x2="350" y2="90"/><line x1="50" y1="55" x2="350" y2="55"/><line x1="50" y1="20" x2="350" y2="20"/></g><g stroke="#334155" stroke-width="1.5"><line x1="50" y1="20" x2="50" y2="230"/><line x1="50" y1="230" x2="350" y2="230"/></g><line x1="65" y1="156.5" x2="335" y2="30.5" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="6 4"/><g fill="#1f2937"><circle cx="80" cy="153" r="4"/><circle cx="110" cy="132" r="4"/><circle cx="140" cy="125" r="4"/><circle cx="170" cy="104" r="4"/><circle cx="200" cy="97" r="4"/><circle cx="230" cy="72.5" r="4"/><circle cx="260" cy="160" r="4"/><circle cx="290" cy="48" r="4"/><circle cx="320" cy="37.5" r="4"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="50" y="245">0</text><text x="80" y="245">1</text><text x="110" y="245">2</text><text x="140" y="245">3</text><text x="170" y="245">4</text><text x="200" y="245">5</text><text x="230" y="245">6</text><text x="260" y="245">7</text><text x="290" y="245">8</text><text x="320" y="245">9</text><text x="350" y="245">10</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="234">0</text><text x="44" y="199">10</text><text x="44" y="164">20</text><text x="44" y="129">30</text><text x="44" y="94">40</text><text x="44" y="59">50</text><text x="44" y="24">60</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="200" y="266">Hours of practice per week</text><text x="14" y="125" transform="rotate(-90 14 125)">Typing speed (wpm)</text></g></svg>`;

const travelTimeSvg = `<svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frequency diagram of the times, t minutes, that 40 pupils took to travel to school. The bars touch. Class 0 to 10 minutes: height 6. Class 10 to 20: height 13. Class 20 to 30: height 11. Class 30 to 40: height 7. Class 40 to 50: height 3. The frequency axis goes from 0 to 14 with a gridline at every 1."><rect x="0" y="0" width="360" height="260" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="50" y1="198" x2="330" y2="198"/><line x1="50" y1="186" x2="330" y2="186"/><line x1="50" y1="174" x2="330" y2="174"/><line x1="50" y1="162" x2="330" y2="162"/><line x1="50" y1="150" x2="330" y2="150"/><line x1="50" y1="138" x2="330" y2="138"/><line x1="50" y1="126" x2="330" y2="126"/><line x1="50" y1="114" x2="330" y2="114"/><line x1="50" y1="102" x2="330" y2="102"/><line x1="50" y1="90" x2="330" y2="90"/><line x1="50" y1="78" x2="330" y2="78"/><line x1="50" y1="66" x2="330" y2="66"/><line x1="50" y1="54" x2="330" y2="54"/><line x1="50" y1="42" x2="330" y2="42"/></g><g fill="#bbf7d0" fill-opacity="0.85" stroke="#334155" stroke-width="1"><rect x="50" y="138" width="56" height="72"/><rect x="106" y="54" width="56" height="156"/><rect x="162" y="78" width="56" height="132"/><rect x="218" y="126" width="56" height="84"/><rect x="274" y="174" width="56" height="36"/></g><g stroke="#334155" stroke-width="1.5"><line x1="50" y1="36" x2="50" y2="210"/><line x1="50" y1="210" x2="335" y2="210"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="214">0</text><text x="44" y="190">2</text><text x="44" y="166">4</text><text x="44" y="142">6</text><text x="44" y="118">8</text><text x="44" y="94">10</text><text x="44" y="70">12</text><text x="44" y="46">14</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="50" y="226">0</text><text x="106" y="226">10</text><text x="162" y="226">20</text><text x="218" y="226">30</text><text x="274" y="226">40</text><text x="330" y="226">50</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="50" y="26">Frequency</text><text x="190" y="250">Time, t (minutes)</text></g></svg>`;

// ---------------------------------------------------------------------------
// Practice content
// ---------------------------------------------------------------------------

export const practice: TopicPractice = {
  // =========================================================================
  // QUICK-CHECK QUIZ
  // =========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "statistics-quiz-q01",
      question: "Which of these is **continuous** data?",
      options: [
        "The number of pupils in each class",
        "Shoe size",
        "The time taken to run 100 m",
        "Favourite MRT line",
      ],
      answerIndex: 2,
      explanation:
        "Time is *measured*, so it can take any value in a range (14.2 s, 14.27 s, …): continuous. The number of pupils is *counted*, so it is discrete. Shoe size is the classic trap: feet can be any length, but shoe sizes only come in set steps such as 5, 5.5 and 6, so shoe size is discrete. Favourite MRT line is a label, so it is categorical.",
      difficulty: "warmup",
      guideRef: "data-and-sampling",
      hints: ["Ask of each one: is it counted, measured or a name?"],
      strategy: "Count it or measure it?",
    },
    {
      kind: "short",
      id: "statistics-quiz-q02",
      question:
        "In a survey, 45 pupils named their favourite CCA. 13 of them chose badminton. What angle should the badminton slice of a pie chart be? Give your answer in degrees.",
      answer: { type: "number", value: 104, display: "104°" },
      traps: [
        { spec: { type: "number", value: 8 }, feedback: "8° is the angle for *one* pupil. Multiply it by the 13 badminton players." },
        { spec: { type: "number", value: 13 }, feedback: "That gives each pupil 1°, which only works if there are 360 pupils. Here 360° is shared between 45 pupils." },
      ],
      solution: [
        "The whole circle, 360°, stands for all 45 pupils.",
        "One pupil gets {{360/45 = 8°}}.",
        "Badminton: 13 × 8 = **104°**.",
      ],
      commonError: "Dividing 360 by 13 (the badminton players) instead of by 45 (everyone in the survey).",
      difficulty: "warmup",
      guideRef: "charts",
      hints: ["How many degrees does one pupil get?"],
      strategy: "Find the angle for one item first",
    },
    {
      kind: "short",
      id: "statistics-quiz-q03",
      question:
        "The stem-and-leaf diagram shows the time, in minutes, that 11 pupils spent on their maths homework.\n\n    1 | 4 7 9\n    2 | 0 3 3 8\n    3 | 2 5 6\n    4 | 1\n\nKey: 2 | 3 means 23 minutes.\n\nWhat is the range of the times? Give your answer in minutes.",
      answer: { type: "number", value: 27, display: "27 minutes" },
      traps: [
        { spec: { type: "number", value: 41 }, feedback: "41 minutes is the longest time. The range is longest − shortest." },
        { spec: { type: "number", value: 3 }, feedback: "You subtracted the stems (4 − 1). Use the key to turn the first and last entries into real times: 14 and 41." },
      ],
      solution: [
        "Smallest value: the first leaf on the first stem, 14 minutes.",
        "Largest value: the last leaf on the last stem, 41 minutes.",
        "Range = 41 − 14 = **27 minutes**.",
      ],
      difficulty: "warmup",
      guideRef: "stem-and-leaf",
      hints: ["Where in an ordered stem-and-leaf diagram are the smallest and largest values?"],
      strategy: "Read the key first",
    },
    {
      kind: "mcq",
      id: "statistics-quiz-q04",
      question:
        "In a class of 36 pupils, 20 play a musical instrument, 14 sing in the choir and 5 do both. How many pupils do **neither**?",
      options: ["7", "2", "12", "29"],
      answerIndex: 0,
      explanation:
        "Start in the overlap: 5 do both, so instrument only = 20 − 5 = 15 and choir only = 14 − 5 = 9. Inside the circles: 15 + 5 + 9 = 29, so neither = 36 − 29 = 7. The answer 2 comes from 36 − 20 − 14, which counts the 5 'both' pupils twice. 12 comes from 36 − 15 − 9, which forgets the 5 pupils in the overlap. 29 is the number who do at least one activity, not neither.",
      difficulty: "core",
      guideRef: "venn-carroll",
      hints: [
        "Draw a Venn diagram and fill in the overlap first.",
        "Instrument only = 20 − 5; choir only = 14 − 5.",
        "Add the three regions inside the circles, then subtract from 36.",
      ],
      strategy: "Start in the middle (the overlap)",
    },
    {
      kind: "short",
      id: "statistics-quiz-q05",
      question:
        "60 pupils each chose exactly one of Art or Music. 32 of the pupils are girls. 25 pupils chose Art, and 11 of those are boys. How many **girls** chose Music?",
      answer: { type: "number", value: 18 },
      traps: [
        { spec: { type: "number", value: 21 }, feedback: "32 − 11 subtracts the *boys* who chose Art from the number of girls. First find how many *girls* chose Art." },
        { spec: { type: "number", value: 17 }, feedback: "17 is the number of *boys* who chose Music. The question asks about the girls." },
      ],
      solution: [
        "Put the facts in a two-way table: rows Girls and Boys, columns Art, Music and Total.",
        "Girls who chose Art = 25 − 11 = 14.",
        "Girls who chose Music = 32 − 14 = **18**.",
        "Check: boys = 60 − 32 = 28, boys who chose Music = 28 − 11 = 17, and 18 + 17 = 35 = 60 − 25 ✓.",
      ],
      difficulty: "core",
      guideRef: "tables",
      hints: [
        "Draw a two-way table and fill in everything you know.",
        "Look for a row or column with only one gap.",
        "In the Art column you know the total and the boys. Find the girls who chose Art first.",
      ],
      strategy: "Organise the information in a table",
    },
    {
      kind: "mcq",
      id: "statistics-quiz-q06",
      question:
        "A scatter graph shows a strong positive correlation between daily ice-cream sales and the number of people treated for sunburn at a beach. Which conclusion is the most sensible?",
      options: [
        "Eating ice cream causes sunburn.",
        "There is negative correlation, because sunburn is bad for you.",
        "There is no relationship, because ice cream and sunburn have nothing to do with each other.",
        "Both probably rise because of a third variable, such as hot, sunny weather.",
      ],
      answerIndex: 3,
      explanation:
        "Hot, sunny days send more people to the beach, where they buy ice cream *and* get sunburnt. That third variable explains the pattern. 'Eating ice cream causes sunburn' mixes up correlation with causation. The points rise together, so the correlation is positive: 'negative' judges whether the outcome is good or bad, not the direction of the points. And the graph shows a clear relationship, so 'no relationship' ignores the evidence.",
      difficulty: "core",
      guideRef: "scatter-graphs",
      hints: [
        "Does a correlation, on its own, ever prove that one thing causes the other?",
        "What would make people buy ice cream *and* get sunburnt on the same days?",
      ],
      strategy: "Look for a third variable",
    },
    {
      kind: "short",
      id: "statistics-quiz-q07",
      question:
        "A bar chart compares two values, 62 and 56, but its vertical axis starts at 50 instead of 0. How many times as tall as the bar for 56 does the bar for 62 look?",
      answer: { type: "number", value: 2 },
      traps: [
        {
          spec: { type: "number", value: 1.107, tolerance: 0.01 },
          feedback: "{{62/56}} ≈ 1.1 is how many times bigger 62 *really* is. The question asks how the bars *look*: measure them from where the axis starts.",
        },
      ],
      solution: [
        "The bars are drawn up from 50, not from 0.",
        "Drawn heights: 62 − 50 = 12 and 56 − 50 = 6.",
        "{{12/6 = 2}}, so the bar for 62 looks **2** times as tall.",
        "Really, {{62/56}} ≈ 1.11, so 62 is only about 11% bigger than 56. That's the trick a truncated axis plays.",
      ],
      difficulty: "core",
      guideRef: "choosing-and-misleading",
      hints: [
        "Where do the bars start?",
        "Work out how tall each bar is drawn, measured up from 50.",
        "Divide one drawn height by the other.",
      ],
      strategy: "Check the axes first",
    },
    {
      kind: "short",
      id: "statistics-quiz-q08",
      question:
        "A sports club has 840 members on a numbered list. The secretary takes a systematic sample of 35 members. She works out the sampling interval, picks a random start and gets member number 11. What is the number of the **10th** member in her sample?",
      answer: { type: "number", value: 227 },
      traps: [
        { spec: { type: "number", value: 251 }, feedback: "The 10th member is only 9 steps after the 1st: 11 + 9 × 24, not 11 + 10 × 24." },
        { spec: { type: "number", value: 240 }, feedback: "10 × 24 ignores the random start. The sample begins at member 11, not member 24." },
      ],
      solution: [
        "Interval = {{840/35 = 24}}, so she takes every 24th member.",
        "The sample is 11, 35, 59, … Each member is 24 after the one before.",
        "The 10th member is 9 steps after the 1st: 11 + 9 × 24 = 11 + 216 = **227**.",
      ],
      commonError: "Taking 10 steps instead of 9. The first member is chosen before any steps are taken.",
      difficulty: "core",
      guideRef: "data-and-sampling",
      hints: [
        "What is the gap between chosen members?",
        "Write out the 1st, 2nd and 3rd members chosen. How many steps of 24 did each take?",
        "How many steps are there between the 1st and the 10th member?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "mcq",
      id: "statistics-quiz-q09",
      question:
        "The table shows the times, {{t}} minutes, that 40 pupils spent on a science task.\n\n| Time, {{t}} min | {{0 <= t < 10}} | {{10 <= t < 20}} | {{20 <= t < 30}} | {{30 <= t < 40}} |\n|---|---|---|---|---|\n| Frequency | 6 | 14 | 12 | 8 |\n\nA frequency polygon is drawn from this table. Which of these points lies **on** the frequency polygon?",
      options: ["(20, 14)", "(20, 13)", "(10, 14)", "(20, 12)"],
      answerIndex: 1,
      explanation:
        "The polygon joins points plotted at the class midpoints: (5, 6), (15, 14), (25, 12) and (35, 8). Halfway along the straight line from (15, 14) to (25, 12) is (20, 13), so that point is on the polygon. (20, 14) and (20, 12) are the tops of the frequency-diagram bars on either side of 20, not points on the polygon. (10, 14) plots a frequency at a class boundary instead of at the midpoint; at {{t = 10}} the polygon is actually at height 10, halfway between 6 and 14.",
      difficulty: "challenge",
      guideRef: "continuous-data",
      hints: [
        "Where, inside each class, is a frequency-polygon point plotted?",
        "List the four plotted points as (midpoint, frequency).",
        "{{t = 20}} is halfway between two plotted points. What height is a straight line at halfway along?",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "written",
      id: "statistics-quiz-q10",
      question:
        "Two schools drew pie charts of how their pupils travel to school.\n\n- School A has 720 pupils. Its *walk* slice is 60°.\n- School B has 270 pupils. Its *walk* slice is 100°.\n\nJun says, \"More pupils walk to School B, because its walk slice is bigger.\" Is Jun right? Show your working and explain.",
      marks: 3,
      modelAnswer:
        "Jun is wrong. A pie chart shows what *fraction* of each school walks, not how many pupils, so you need each school's total.\n\nSchool A: {{60/360 * 720 = 120}} pupils walk.\n\nSchool B: {{100/360 * 270 = 75}} pupils walk.\n\nSo more pupils walk to School A (120 against 75). School A's slice is smaller, but it is a slice of a much bigger school.",
      markScheme: [
        {
          point: "Explains that a pie chart shows proportions, so the two totals matter",
          keywords: ["proportion", "fraction", "total", "share", "out of", "different totals", "size of the school"],
        },
        { point: "School A: 120 pupils walk", keywords: ["120"] },
        { point: "School B: 75 pupils walk, so Jun is wrong: more walk to School A", keywords: ["75", "wrong", "school a", "not right", "incorrect"] },
      ],
      commonError: "Comparing the angles directly. Slices of two pie charts can only be compared like this when the two totals are equal.",
      difficulty: "core",
      guideRef: "charts",
      hints: [
        "Does a pie chart show *how many* or *what fraction*?",
        "Work out how many pupils each walk slice stands for.",
        "School A: {{60/360}} of 720.",
      ],
      strategy: "Compare like with like",
    },
  ],

  // =========================================================================
  // PRACTICE PAPERS
  // =========================================================================
  papers: [
    {
      id: "statistics-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "statistics-p1-q01",
          question:
            "Is *the number of goals scored in a football match* categorical, discrete or continuous data? Type one word.",
          answer: { type: "text", accept: ["discrete", "discrete data"], display: "discrete" },
          traps: [
            {
              spec: { type: "text", accept: ["continuous"] },
              feedback: "Goals are *counted*: 0, 1, 2, 3 … Nobody scores 2.5 goals, so the data is discrete, not continuous.",
            },
            {
              spec: { type: "text", accept: ["categorical"] },
              feedback: "The answers are numbers you can calculate with, not labels, so it isn't categorical. Goals are counted, so the data is discrete.",
            },
          ],
          solution: ["Goals are counted, not measured.", "Only whole numbers 0, 1, 2, … are possible, so the data is **discrete**."],
          difficulty: "warmup",
          guideRef: "data-and-sampling",
          hints: ["Do you count goals or measure them?"],
          strategy: "Count it or measure it?",
        },
        {
          kind: "short",
          id: "statistics-p1-q02",
          question:
            "The masses, in kg, of 12 school bags are:\n\n    3.2, 4.5, 5.0, 2.8, 6.1, 4.9, 3.7, 5.5, 4.0, 7.2, 3.9, 5.0\n\nThey are put into a grouped frequency table. How many bags belong in the class {{4 <= m < 5}}?",
          answer: { type: "number", value: 3 },
          traps: [
            {
              spec: { type: "number", value: 5 },
              feedback: "The two bags of exactly 5.0 kg don't belong here. {{m < 5}} means *less than* 5, so 5.0 kg goes in the next class, {{5 <= m < 6}}.",
            },
            { spec: { type: "number", value: 2 }, feedback: "4.0 kg *does* belong: {{4 <= m}} means 4 itself is included." },
          ],
          solution: [
            "{{4 <= m < 5}} means at least 4 kg but less than 5 kg.",
            "Go through the list once: 4.5 ✓, 4.9 ✓, 4.0 ✓ (4 is included).",
            "The two 5.0 kg bags are *not* less than 5, so they go in the next class.",
            "Frequency = **3**.",
          ],
          difficulty: "warmup",
          guideRef: "tables",
          hints: ["Read {{4 <= m < 5}} aloud. Which end is included, and which isn't?"],
          strategy: "Check the boundary values",
        },
        {
          kind: "short",
          id: "statistics-p1-q03",
          question:
            "A pie chart shows the favourite hawker-centre drink of 60 pupils. The slice for bandung has an angle of 138°. How many pupils chose bandung?",
          answer: { type: "number", value: 23 },
          traps: [
            { spec: { type: "number", value: 138 }, feedback: "138 is the angle, not the number of pupils. Each pupil gets {{360/60 = 6°}}, so divide 138 by 6." },
          ],
          solution: ["Each pupil gets {{360/60 = 6°}}.", "Bandung: 138 ÷ 6 = **23** pupils.", "Or in one step: {{138/360 * 60 = 23}}."],
          difficulty: "warmup",
          guideRef: "charts",
          hints: ["How many degrees does one pupil get? How many of those fit into 138°?"],
          strategy: "Find the angle for one item first",
        },
        {
          kind: "short",
          id: "statistics-p1-q04",
          question:
            "The stem-and-leaf diagram shows the number of minutes 14 pupils spent reading one evening.\n\n    3 | 2 5 8\n    4 | 0 1 1 6 9\n    5 | 3 3 3 7\n    6 | 0 4\n\nKey: 4 | 1 means 41 minutes.\n\nWhat is the mode? Give your answer in minutes.",
          answer: { type: "number", value: 53, display: "53 minutes" },
          traps: [
            { spec: { type: "number", value: 3 }, feedback: "3 is the leaf that repeats. Join it to its stem using the key: stem 5, leaf 3 means 53 minutes." },
            { spec: { type: "number", value: 41 }, feedback: "41 appears twice, but 53 appears three times." },
          ],
          solution: [
            "Look for the leaf that repeats most often on the same stem.",
            "Stem 5 has the leaf 3 three times; 41 appears only twice.",
            "Key: 5 | 3 means 53, so the mode is **53 minutes**.",
          ],
          difficulty: "warmup",
          guideRef: "stem-and-leaf",
          hints: ["Look for repeated leaves on the same stem, then use the key."],
          strategy: "Read the key first",
        },
        {
          kind: "short",
          id: "statistics-p1-q05",
          question:
            "The whole numbers from 1 to 20 are sorted into a Carroll diagram.\n\n| | Prime | Not prime |\n|---|---|---|\n| **Odd** | | |\n| **Not odd** | | |\n\nHow many numbers belong in the cell for *odd and not prime*?",
          answer: { type: "number", value: 3 },
          traps: [
            { spec: { type: "number", value: 2 }, feedback: "Don't forget 1. It is odd, but it is **not** prime: a prime has exactly two factors, and 1 has only one." },
            { spec: { type: "number", value: 7 }, feedback: "7 is the number of odd *primes*. The cell asks for odd numbers that are **not** prime." },
          ],
          solution: [
            "The odd numbers from 1 to 20 are 1, 3, 5, 7, 9, 11, 13, 15, 17, 19.",
            "Of these, 3, 5, 7, 11, 13, 17 and 19 are prime.",
            "That leaves 1, 9 and 15: **3** numbers.",
            "Remember 1 is not prime: a prime has exactly two factors, and 1 has only one.",
          ],
          difficulty: "warmup",
          guideRef: "venn-carroll",
          hints: ["List the odd numbers first, then cross out the primes."],
          strategy: "Make a systematic list",
        },
        {
          kind: "short",
          id: "statistics-p1-q06",
          question:
            "A school has 1200 pupils: 300 in Year 7, 420 in Year 8 and 480 in Year 9. Ravi takes a **stratified** sample of 80 pupils, so that each year group is represented in proportion to its size. How many Year 8 pupils should be in his sample?",
          answer: { type: "number", value: 28 },
          traps: [
            {
              spec: { type: "number", value: 26.67, tolerance: 0.4 },
              feedback: "Splitting 80 equally between the three year groups ignores their sizes. Year 8 is {{420/1200}} of the school, so it gets {{420/1200}} of the sample.",
            },
          ],
          solution: [
            "Year 8 is {{420/1200 = 7/20}} of the school.",
            "So Year 8 gets {{7/20}} of the sample: {{7/20 * 80 = 28}}.",
            "Check: Year 7 gets {{300/1200 * 80 = 20}} and Year 9 gets {{480/1200 * 80 = 32}}; 20 + 28 + 32 = 80 ✓.",
          ],
          solutions: [
            {
              label: "Scale down the whole school",
              steps: ["The sample is {{80/1200 = 1/15}} of the school.", "Take {{1/15}} of each year group: Year 8 gets 420 ÷ 15 = 28."],
            },
          ],
          commonError: "Sharing the sample equally between the year groups (about 27 each).",
          difficulty: "core",
          guideRef: "data-and-sampling",
          hints: [
            "What fraction of the school is in Year 8?",
            "In a stratified sample, Year 8 should make up the same fraction of the sample.",
            "Work out {{420/1200}} of 80.",
          ],
          strategy: "Use proportion",
        },
        {
          kind: "short",
          id: "statistics-p1-q07",
          question:
            "The two-way table shows the lunch choices of some pupils.\n\n| | Noodles | Rice | Salad | Total |\n|---|---|---|---|---|\n| Year 7 | 18 | | 12 | 50 |\n| Year 8 | | 26 | | 60 |\n| Total | 39 | | 25 | |\n\nHow many pupils chose rice altogether?",
          answer: { type: "number", value: 46 },
          traps: [
            { spec: { type: "number", value: 26 }, feedback: "26 is only the Year 8 pupils who chose rice. Find the Year 7 rice pupils too, then add." },
            { spec: { type: "number", value: 20 }, feedback: "20 is only the Year 7 pupils who chose rice. Add the 26 from Year 8." },
          ],
          solution: [
            "The Year 7 row has only one gap: rice = 50 − 18 − 12 = 20.",
            "Rice total = 20 + 26 = **46**.",
            "Check with the grand total: 50 + 60 = 110, and 39 + 46 + 25 = 110 ✓.",
          ],
          solutions: [
            {
              label: "Use the grand total (quicker)",
              steps: ["Grand total = 50 + 60 = 110 pupils.", "Rice = 110 − 39 − 25 = 46. This skips the Year 7 row entirely."],
            },
          ],
          difficulty: "core",
          guideRef: "tables",
          hints: ["Which row or column has only one gap?", "The Year 7 row has just one gap.", "Then add down the rice column."],
          strategy: "Find a line with only one gap",
        },
        {
          kind: "written",
          id: "statistics-p1-q08",
          question:
            "Marcus writes this question for a survey about phone use:\n\n> Don't you agree that teenagers spend far too long on their phones? How many hours a day do you use your phone?\n> ☐ 0–1   ☐ 1–3   ☐ 3–5\n\nGive **three** different criticisms of his question.",
          marks: 3,
          modelAnswer:
            "1. The first sentence is a **leading** question. It pushes people to agree, so the answers will be biased.\n2. The response boxes **overlap**: someone who uses their phone for exactly 1 hour, or exactly 3 hours, could tick two boxes.\n3. The boxes **don't cover every answer**: there is no box for more than 5 hours. (There's also no time frame: a school day and a weekend day are very different.)\n\nA better version: *On a typical school day, how many hours do you use your phone?* ☐ less than 1 ☐ at least 1 but less than 3 ☐ at least 3 but less than 5 ☐ 5 or more.",
          markScheme: [
            { point: "Leading (biased) question that pushes people to agree", keywords: ["leading", "biased", "bias", "agree", "pushes", "opinion"] },
            { point: "Overlapping boxes: 1 and 3 each appear in two boxes", keywords: ["overlap", "two boxes", "both boxes", "1 hour", "3 hours", "twice"] },
            {
              point: "Boxes don't cover every answer (no box above 5 hours), or no time frame",
              keywords: ["more than 5", "over 5", "no box", "missing", "gap", "every answer", "time frame", "weekend", "school day"],
            },
          ],
          commonError: "Saying the question is 'bad' or 'unclear' without saying exactly what is wrong and why.",
          difficulty: "core",
          guideRef: "data-and-sampling",
          hints: [
            "Read the first sentence. Does it push the reader towards one answer?",
            "Which box would someone tick if they use their phone for exactly 3 hours?",
            "Which box would someone tick if they use their phone for 6 hours?",
          ],
          strategy: "Test it with extreme answers",
        },
        {
          kind: "short",
          id: "statistics-p1-q09",
          question:
            "The compound bar chart shows how many boys and girls attended three CCA sessions. How many **girls** attended Badminton?",
          diagram: ccaCompoundSvg,
          answer: { type: "number", value: 12 },
          traps: [
            { spec: { type: "number", value: 22 }, feedback: "22 is the top of the whole bar: boys *and* girls. The girls' section starts at 10, so it shows 22 − 10." },
            { spec: { type: "number", value: 10 }, feedback: "10 is the boys' section at the bottom of the bar. The girls' section is stacked on top of it." },
          ],
          solution: [
            "In a compound bar chart the parts are stacked: here boys at the bottom, girls on top.",
            "The Badminton bar's boys section runs from 0 to 10, and the whole bar reaches 22.",
            "Girls = 22 − 10 = **12**.",
          ],
          commonError: "Reading the top of a stacked section as its value. Only the bottom section starts at 0.",
          difficulty: "core",
          guideRef: "charts",
          hints: [
            "Where does the girls' section of the Badminton bar start, and where does it end?",
            "Read the top of the boys' section and the top of the whole bar.",
          ],
          strategy: "Read the scale carefully",
        },
        {
          kind: "short",
          id: "statistics-p1-q10",
          question:
            "The stem-and-leaf diagram shows the number of sit-ups 16 pupils did in one minute.\n\n    2 | 4 7 8\n    3 | 0 2 5 5 9\n    4 | 1 3 3 6 8\n    5 | 0 2 7\n\nKey: 3 | 2 means 32 sit-ups.\n\nFind the median number of sit-ups.",
          answer: { type: "number", value: 40 },
          traps: [
            { spec: { type: "number", value: 39 }, feedback: "39 is the 8th value. With 16 values there are two middle values, the 8th and 9th, so the median is halfway between 39 and 41." },
            { spec: { type: "number", value: 41 }, feedback: "41 is the 9th value. With 16 values the median is halfway between the 8th and 9th values: 39 and 41." },
          ],
          solution: [
            "Count the leaves: 3 + 5 + 5 + 3 = 16 values.",
            "The median is the {{(16+1)/2 = 8.5}}th value: halfway between the 8th and 9th.",
            "Counting along: 24, 27, 28, 30, 32, 35, 35, **39**, **41**, …",
            "Median = {{(39 + 41)/2 = 40}} sit-ups. (The median doesn't have to be one of the data values.)",
          ],
          commonError: "Taking just the 8th value, or the middle stem, as the median.",
          difficulty: "core",
          guideRef: "stem-and-leaf",
          hints: [
            "How many values are there altogether?",
            "With an even number of values, which two are in the middle?",
            "Count along the leaves to the 8th and 9th values.",
          ],
          strategy: "Find the median position, then count",
        },
        {
          kind: "short",
          id: "statistics-p1-q11",
          question:
            "In a group of 50 people, 31 have visited Sentosa, 24 have visited the Night Safari and 8 have visited neither. How many have visited **both**?",
          answer: { type: "number", value: 13 },
          traps: [
            {
              spec: { type: "number", value: 5 },
              feedback: "31 + 24 − 50 forgets the 8 people who visited neither. Only 50 − 8 = 42 people are inside the circles.",
            },
          ],
          solution: [
            "People who visited at least one place: 50 − 8 = 42.",
            "Adding the circles gives 31 + 24 = 55, which counts the 'both' people twice.",
            "The double count is 55 − 42 = **13**, so 13 people visited both.",
            "Check: Sentosa only 18, Night Safari only 11, both 13, neither 8: 18 + 11 + 13 + 8 = 50 ✓.",
          ],
          solutions: [
            {
              label: "Use a letter for the overlap",
              steps: [
                "Let {{x}} people have visited both. Then Sentosa only = 31 − {{x}} and Night Safari only = 24 − {{x}}.",
                "All four regions add up to 50: {{(31 - x) + x + (24 - x) + 8 = 50}}.",
                "{{63 - x = 50}}, so {{x = 13}}. The double-counting argument gets there faster, but the letter method works on harder problems too.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "venn-carroll",
          hints: [
            "How many people are inside at least one circle?",
            "If you add 31 and 24, who gets counted twice?",
            "Compare 31 + 24 with the number of people inside the circles.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "statistics-p1-q12",
          question:
            "The table shows how many hours 9 pupils revised and their score in a test marked out of 100.\n\n| Hours revised | 1 | 2 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n|---|---|---|---|---|---|---|---|---|---|\n| Score | 38 | 45 | 41 | 52 | 55 | 63 | 64 | 72 | 76 |\n\n(a) Describe the correlation, in context.\n\n(b) Ethan draws a line of best fit that rises about 5 marks for every extra hour and is at about 75 marks at 8 hours. He uses it to predict the score of a pupil who revises for 20 hours. Comment on his prediction.",
          marks: 4,
          modelAnswer:
            "(a) Strong **positive** correlation: pupils who revised for longer tended to get higher scores.\n\n(b) 20 hours is far outside the data, which only goes from 1 to 8 hours. This is **extrapolation**, so the prediction is unreliable: we have no evidence that the pattern carries on. In fact the line would predict about 75 + 12 × 5 = 135 marks, which is impossible on a test out of 100. Scores must level off before they reach 100.",
          markScheme: [
            { point: "Positive correlation (strong)", keywords: ["positive"] },
            {
              point: "In context: more revision tends to go with higher scores",
              keywords: ["more revision", "higher score", "longer", "increase", "tend", "more hours"],
            },
            {
              point: "20 hours is outside the range of the data, so this is extrapolation and unreliable",
              keywords: ["outside", "extrapolation", "unreliable", "beyond", "range", "not reliable"],
            },
            {
              point: "The prediction would be over 100 marks, which is impossible, so the pattern can't continue",
              keywords: ["100", "over 100", "more than 100", "impossible", "135", "level off"],
            },
          ],
          commonError: "Writing just 'positive' without context, or trusting a prediction far outside the data.",
          difficulty: "core",
          guideRef: "scatter-graphs",
          hints: [
            "As the hours increase, what happens to the scores?",
            "What range of hours does the data actually cover?",
            "Roughly what would the line predict at 20 hours? Is that possible on this test?",
          ],
          strategy: "Consider extremes: is the answer sensible?",
        },
        {
          kind: "short",
          id: "statistics-p1-q13",
          question:
            "An advert uses a picture of a rice bag to show that a shop's rice sales have trebled. The new picture is 3 times as tall **and** 3 times as wide as the old one. How many times as big does the new picture *look*, judging by its area?",
          answer: { type: "number", value: 9 },
          traps: [
            {
              spec: { type: "number", value: 3 },
              feedback: "Sales trebled, but the picture grew 3 times in *both* directions. Its area grew {{3 * 3 = 9}} times, so it looks 9 times as big.",
            },
            { spec: { type: "number", value: 6 }, feedback: "The scale factors multiply, they don't add: area grows by 3 × 3, not 3 + 3." },
          ],
          solution: [
            "Our eyes judge a picture by its area, which depends on width × height.",
            "Both are multiplied by 3, so the area is multiplied by 3 × 3 = 9.",
            "The picture looks **9** times as big, though sales only trebled. That's why it's misleading.",
          ],
          difficulty: "core",
          guideRef: "choosing-and-misleading",
          hints: [
            "Try a simple case: a 1 cm by 1 cm square becomes a 3 cm by 3 cm square.",
            "What happens to the area of a rectangle when its width and its height are both multiplied by 3?",
          ],
          strategy: "Try a simple case",
        },
        {
          kind: "short",
          id: "statistics-p1-q14",
          question:
            "In a pie chart, the slice for pupils who cycle to school has an angle of 48° and represents 20 pupils. How many pupils are represented by the whole pie chart?",
          answer: { type: "number", value: 150 },
          traps: [
            {
              spec: { type: "number", value: 7.5 },
              feedback: "360 ÷ 48 = 7.5 tells you the whole pie is 7.5 times the cycle slice. Multiply by the 20 pupils in that slice.",
            },
            { spec: { type: "number", value: 2.4 }, feedback: "2.4° is the angle for one pupil. How many pupils share the full 360°?" },
          ],
          solution: [
            "48° stands for 20 pupils.",
            "So each pupil gets {{48/20 = 2.4°}}.",
            "The whole pie: {{360/2.4 = 150}} pupils.",
          ],
          solutions: [
            {
              label: "Scale up the slice (quicker)",
              steps: ["The whole circle is {{360/48 = 7.5}} times the cycle slice.", "So the total is 7.5 × 20 = **150** pupils, with no awkward decimal angle."],
            },
          ],
          difficulty: "core",
          guideRef: "charts",
          hints: [
            "How many degrees does one pupil get?",
            "48° is shared between 20 pupils.",
            "How many lots of 2.4° make 360°?",
          ],
          strategy: "Find one part first",
        },
        {
          kind: "short",
          id: "statistics-p1-q15",
          question:
            "The table shows the times, {{t}} minutes, that 30 pupils took to finish a charity fun run.\n\n| Time, {{t}} min | Frequency |\n|---|---|\n| {{0 <= t < 15}} | 7 |\n| {{15 <= t < 30}} | 12 |\n| {{30 <= t < 45}} | 9 |\n| {{45 <= t < 60}} | 2 |\n\nA frequency polygon is drawn. Write down the coordinates of its **highest** point, as (time, frequency).",
          answer: { type: "list", values: [22.5, 12], ordered: true, display: "(22.5, 12)" },
          traps: [
            {
              spec: { type: "list", values: [15, 12], ordered: true },
              feedback: "15 is the lower boundary of the class. Frequency polygons are plotted at the class **midpoint**: {{(15 + 30)/2 = 22.5}}.",
            },
            {
              spec: { type: "list", values: [30, 12], ordered: true },
              feedback: "30 is the upper boundary of the class. Plot at the midpoint: {{(15 + 30)/2 = 22.5}}.",
            },
          ],
          solution: [
            "The highest frequency is 12, in the class {{15 <= t < 30}}.",
            "Frequency polygons are plotted at class midpoints: {{(15 + 30)/2 = 22.5}}.",
            "Highest point: **(22.5, 12)**.",
          ],
          difficulty: "core",
          guideRef: "continuous-data",
          hints: [
            "Which class has the highest frequency?",
            "Where, inside a class, is a frequency-polygon point plotted?",
          ],
          strategy: "Make it simpler: one point per class",
        },
        {
          kind: "written",
          id: "statistics-p1-q16",
          question: "This bar chart appeared in an advert for Kopi Corner. Give **three** different reasons why the chart is misleading.",
          diagram: kopiAdvertSvg,
          marks: 3,
          modelAnswer:
            "1. The vertical axis starts at 40, not 0, so the difference is exaggerated. Kopi Corner's bar looks twice as tall as Bean Bar's, but 80 is only 1.6 times 50.\n2. The scale is uneven: equal gaps stand for 5, then 5, then 10, then 20.\n3. The vertical axis has no label or units, and there is no time period or source, so we can't tell what is being compared (cups? dollars? per day? per year?).",
          markScheme: [
            {
              point: "The axis doesn't start at 0 (it is truncated at 40), which exaggerates the difference",
              keywords: ["zero", "start", "40", "truncated", "exaggerate", "doesn't start", "does not start"],
            },
            { point: "Uneven scale: equal gaps stand for different amounts", keywords: ["uneven", "scale", "not equal", "gaps", "different amounts", "irregular"] },
            {
              point: "Missing axis label, units, time period or source",
              keywords: ["label", "units", "no label", "time period", "source", "what is being", "per day"],
            },
          ],
          commonError: "Saying 'the bars are different sizes' without explaining which feature of the chart creates the false impression.",
          difficulty: "core",
          guideRef: "choosing-and-misleading",
          hints: [
            "Look at where the vertical axis starts.",
            "Look at the numbers up the vertical axis. Do equal gaps stand for equal amounts?",
            "What exactly is being measured, and over what time? Can you tell?",
          ],
          strategy: "Check the axes first",
        },
        {
          kind: "short",
          id: "statistics-p1-q17",
          question:
            "Every visitor to a science centre chose exactly one of the planetarium show or the robot workshop. There were twice as many children as adults. 20 children chose the robot workshop, which was {{2/5}} of the children. {{3/5}} of the adults chose the planetarium show. How many visitors chose the planetarium show altogether?",
          answer: { type: "number", value: 45 },
          traps: [
            { spec: { type: "number", value: 30 }, feedback: "30 is just the children who chose the planetarium. Add the adults who chose it as well." },
            {
              spec: { type: "number", value: 36 },
              feedback: "There were twice as many *children* as adults, so there were 25 adults, not 100. Then {{3/5}} of 25 adults chose the planetarium.",
            },
          ],
          solution: [
            "20 children is {{2/5}} of the children, so {{1/5}} of the children is 10 and there are 50 children.",
            "There were twice as many children as adults, so there were 25 adults.",
            "Children who chose the planetarium: 50 − 20 = 30.",
            "Adults who chose the planetarium: {{3/5 * 25 = 15}}.",
            "Planetarium altogether: 30 + 15 = **45**.",
            "Check with a two-way table: children 30 planetarium + 20 workshop = 50; adults 15 + 10 = 25; total 75 ✓.",
          ],
          difficulty: "challenge",
          guideRef: "tables",
          hints: [
            "Start with the fact that pins down a whole row: 20 children is {{2/5}} of the children.",
            "How many children are there? Then how many adults?",
            "Fill in a two-way table: children and adults against planetarium and workshop.",
          ],
          strategy: "Organise the information in a table",
        },
        {
          kind: "short",
          id: "statistics-p1-q18",
          question:
            "In a class of 36 pupils, 23 have visited Gardens by the Bay and 20 have visited the Botanic Gardens. Some pupils may have visited both, and some may have visited neither. What are the **smallest** and **largest** possible numbers of pupils who have visited both? Give the smallest first.",
          answer: { type: "list", values: [7, 20], ordered: true, display: "smallest 7, largest 20" },
          traps: [
            {
              spec: { type: "list", values: [0, 20], ordered: true },
              feedback: "The overlap can't be 0: 23 + 20 = 43 is more than 36 pupils, so at least 43 − 36 = 7 pupils must be counted twice.",
            },
            {
              spec: { type: "list", values: [7, 23], ordered: true },
              feedback: "The overlap can't be bigger than the smaller group. Only 20 pupils visited the Botanic Gardens, so at most 20 visited both.",
            },
          ],
          solution: [
            "**Smallest:** make the overlap as small as possible by having nobody visit neither. Then the 36 pupils must account for 23 + 20 = 43 visits, so at least 43 − 36 = 7 pupils are counted twice.",
            "Check 7 works: Gardens by the Bay only 16, Botanic Gardens only 13, both 7, neither 0: 16 + 13 + 7 = 36 ✓.",
            "**Largest:** the overlap can't be bigger than the smaller group, so at most 20 visited both. That happens if every Botanic Gardens visitor has also been to Gardens by the Bay.",
            "Check 20 works: Gardens by the Bay only 3, both 20, Botanic Gardens only 0, neither 13: 3 + 20 + 13 = 36 ✓.",
            "Answer: smallest 7, largest 20.",
          ],
          difficulty: "challenge",
          guideRef: "venn-carroll",
          hints: [
            "Try the extreme cases. What if nobody has visited neither? What if every Botanic Gardens visitor has also been to Gardens by the Bay?",
            "23 + 20 = 43, but there are only 36 pupils. What does that tell you about the overlap?",
            "Can the overlap ever be bigger than the smaller of the two groups?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "written",
          id: "statistics-p1-q19",
          question:
            "The back-to-back stem-and-leaf diagram shows the quiz marks of two classes.\n\n| 8C leaves | Stem | 8D leaves |\n|---|---|---|\n| 9 7 4 | 1 | 8 |\n| 8 6 5 3 1 | 2 | 2 4 5 9 |\n| 7 5 2 0 | 3 | 0 3 4 6 6 8 |\n| 8 | 4 | 1 3 |\n\nKey: 8 | 4 | 1 means 48 marks for 8C and 41 marks for 8D.\n\nSiti says, \"8C did better, because the highest mark was in 8C.\" Use the median and the range of each class to decide whether Siti is right.",
          marks: 4,
          modelAnswer:
            "8C has 13 marks: 14, 17, 19, 21, 23, 25, **26**, 28, 30, 32, 35, 37, 48. The median is the 7th value, 26. Range = 48 − 14 = 34.\n\n8D has 13 marks: 18, 22, 24, 25, 29, 30, **33**, 34, 36, 36, 38, 41, 43. Median = 33. Range = 43 − 18 = 25.\n\nSiti is wrong. 8D's median is higher (33 against 26), so 8D generally did better; the top mark belongs to just one pupil. 8D's range is also smaller (25 against 34), so its marks were more consistent.",
          markScheme: [
            { point: "8C: median 26 and range 34", keywords: ["26", "34"] },
            { point: "8D: median 33 and range 25", keywords: ["33", "25"] },
            {
              point: "8D has the higher median, so it did better on average; Siti is wrong (the top mark is just one pupil)",
              keywords: ["higher median", "8d", "wrong", "on average", "one pupil", "generally"],
            },
            { point: "8D has the smaller range, so its marks were more consistent", keywords: ["consistent", "smaller range", "less spread", "spread"] },
          ],
          commonError: "Reading 8C's leaves the wrong way round (they read outwards from the stem, right to left), or judging a whole class by one extreme mark.",
          difficulty: "challenge",
          guideRef: "stem-and-leaf",
          hints: [
            "Read 8C's leaves outwards from the stem: the row 9 7 4 | 1 means 14, 17 and 19.",
            "How many marks does each class have? Which position is the middle one?",
            "Compare a typical mark (the median) and the spread (the range), not just one pupil's mark.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "statistics-p1-q20",
          question:
            "A pie chart shows how 90 pupils travel to school: by bus, walking, by car or by MRT. 26 pupils take the MRT. The bus angle is 3 times the walk angle, and the car angle is 16° more than the walk angle. How many pupils walk?",
          answer: { type: "number", value: 12 },
          traps: [
            { spec: { type: "number", value: 48 }, feedback: "48° is the walk *angle*. Each pupil gets {{360/90 = 4°}}, so divide by 4." },
          ],
          solution: [
            "Each pupil gets {{360/90 = 4°}}, so the MRT angle is 26 × 4 = 104°.",
            "The other three angles share 360 − 104 = 256°.",
            "Let the walk angle be {{w}}. Then bus = {{3w}} and car = {{w + 16}}, so {{w + 3w + w + 16 = 256}}.",
            "{{5w = 240}}, so {{w = 48}}: the walk angle is 48°.",
            "Walkers: 48 ÷ 4 = **12** pupils.",
            "Check: bus 144° = 36 pupils, car 64° = 16 pupils; 12 + 36 + 16 + 26 = 90 ✓.",
          ],
          solutions: [
            {
              label: "Work in pupils, not degrees (slicker)",
              steps: [
                "The other three groups have 90 − 26 = 64 pupils.",
                "16° is 16 ÷ 4 = 4 pupils, so car = walk + 4, and bus = 3 × walk.",
                "walk + 3 × walk + walk + 4 = 64, so 5 × walk = 60 and walk = 12. No converting back at the end.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "charts",
          hints: [
            "How many degrees does one pupil get? What angle is the MRT slice?",
            "Call the walk angle {{w}}. Write the bus and car angles in terms of {{w}}.",
            "The three angles add up to 360° minus the MRT angle.",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
    {
      id: "statistics-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "statistics-p2-q01",
          question:
            "Hana is investigating whether Year 8 pupils who sleep more get better test scores. She has collected her data and has just drawn a scatter graph of it. Which stage of the statistical enquiry cycle is she at? Choose from: *plan*, *collect*, *process and represent*, *interpret*.",
          answer: {
            type: "text",
            accept: [
              "process and represent",
              "process & represent",
              "processing and representing",
              "process and represent data",
              "process and represent the data",
              "process",
              "represent",
              "processing",
              "representing",
            ],
            display: "process and represent",
          },
          traps: [
            {
              spec: { type: "text", accept: ["interpret", "interpreting", "interpret and discuss"] },
              feedback: "Not yet. Drawing the graph is *representing* the data. Interpreting comes next, when she uses the graph to answer her question.",
            },
            {
              spec: { type: "text", accept: ["collect", "collecting"] },
              feedback: "She has already collected her data. Drawing a graph of it is the next stage: process and represent.",
            },
          ],
          solution: [
            "The cycle goes: plan → collect → process and represent → interpret (and back to plan).",
            "She has collected the data and is now drawing a chart of it, so she is at **process and represent**.",
            "Next she will interpret the graph to answer her question.",
          ],
          difficulty: "warmup",
          guideRef: "data-and-sampling",
          hints: ["Is drawing a graph collecting the data, representing it, or using it to answer the question?"],
          strategy: "Name the stage",
        },
        {
          kind: "short",
          id: "statistics-p2-q02",
          question:
            "Ethan asked 30 pupils how many siblings they have.\n\n| Number of siblings | 0 | 1 | 2 | 3 | 4 or more |\n|---|---|---|---|---|---|\n| Frequency | 4 | 11 | | 5 | 2 |\n\nHow many pupils have exactly 2 siblings?",
          answer: { type: "number", value: 8 },
          traps: [
            { spec: { type: "number", value: 22 }, feedback: "22 is the total of the frequencies you were given. The missing frequency is 30 − 22." },
          ],
          solution: [
            "The frequencies must add up to the 30 pupils asked.",
            "Known frequencies: 4 + 11 + 5 + 2 = 22.",
            "Missing frequency: 30 − 22 = **8**.",
          ],
          difficulty: "warmup",
          guideRef: "tables",
          hints: ["What must all the frequencies add up to?"],
          strategy: "Check the totals",
        },
        {
          kind: "short",
          id: "statistics-p2-q03",
          question:
            "The line graph shows the rainfall in Singapore each month from July to December one year. What was the **largest increase** in rainfall from one month to the next? Give your answer in mm.",
          diagram: rainfallLineSvg,
          answer: { type: "number", value: 65, display: "65 mm" },
          traps: [
            { spec: { type: "number", value: 140 }, feedback: "140 mm is the change from July all the way to December. The question asks about one month to the next." },
            { spec: { type: "number", value: 35 }, feedback: "35 mm is the rise from November to December. Check October to November: 255 − 190." },
          ],
          solution: [
            "Work out each month-to-month change: Jul→Aug +20, Aug→Sep −5, Sep→Oct +25, Oct→Nov +65, Nov→Dec +35.",
            "The steepest rise on the graph is from October to November.",
            "Largest increase: 255 − 190 = **65 mm**.",
          ],
          difficulty: "warmup",
          guideRef: "charts",
          hints: ["Find the steepest upward section of the line, then subtract the two values at its ends."],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "statistics-p2-q04",
          question:
            "The stem-and-leaf diagram shows the times, in seconds, for 8 pupils to sprint 30 m.\n\n    4 | 3 8 9\n    5 | 0 2 6\n    6 | 1 5\n\nKey: 5 | 2 means 5.2 seconds.\n\nHow many pupils took **less than** 5.5 seconds?",
          answer: { type: "number", value: 5 },
          traps: [
            { spec: { type: "number", value: 3 }, feedback: "Stem 4 gives 3 pupils, but 5.0 s and 5.2 s are also less than 5.5 s." },
            { spec: { type: "number", value: 6 }, feedback: "5.6 s is *more* than 5.5 s, so that pupil doesn't count." },
          ],
          solution: [
            "Use the key to read the times: 4.3, 4.8, 4.9, 5.0, 5.2, 5.6, 6.1, 6.5 seconds.",
            "Less than 5.5: 4.3, 4.8, 4.9, 5.0 and 5.2.",
            "That's **5** pupils.",
          ],
          difficulty: "warmup",
          guideRef: "stem-and-leaf",
          hints: ["Use the key to turn each leaf into a time, then compare it with 5.5."],
          strategy: "Read the key first",
        },
        {
          kind: "short",
          id: "statistics-p2-q05",
          question: "The Venn diagram shows how many pupils in a class take Music and how many take Art. How many pupils do **not** take Music?",
          diagram: musicArtVennSvg,
          answer: { type: "number", value: 13 },
          traps: [
            { spec: { type: "number", value: 9 }, feedback: "9 is Art only. The 4 pupils outside both circles don't take Music either." },
            { spec: { type: "number", value: 18 }, feedback: "12 is Music *only*. The 5 pupils in the overlap take Music too, so take 12 + 5 = 17 away from the class of 30." },
          ],
          solution: [
            "Not Music means everywhere outside the Music circle.",
            "That is Art only (9) and neither (4).",
            "9 + 4 = **13**.",
            "Check: the class has 12 + 5 + 9 + 4 = 30 pupils, and 30 − (12 + 5) = 13 ✓.",
          ],
          difficulty: "warmup",
          guideRef: "venn-carroll",
          hints: ["Which regions are outside the Music circle? Don't forget the region outside both circles."],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "statistics-p2-q06",
          question:
            "At a hawker centre, Wei Ling surveys every 15th customer who walks in, starting with customer number 4. She stops after surveying customer number 199. How many customers did she survey?",
          answer: { type: "number", value: 14 },
          traps: [
            {
              spec: { type: "number", value: 13 },
              feedback: "(199 − 4) ÷ 15 = 13 counts the *gaps* between surveyed customers. There is one more customer than gaps, because customer 4 counts too.",
            },
          ],
          solution: [
            "She surveys customers 4, 19, 34, 49, …, 199. Each is 15 more than the one before.",
            "From 4 to 199 is 199 − 4 = 195, which is {{195/15 = 13}} gaps of 15.",
            "13 gaps means 13 + 1 = **14** customers, just as 13 gaps in a fence need 14 posts.",
          ],
          solutions: [
            {
              label: "Make it simpler",
              steps: [
                "Subtract 4 from every customer number: 0, 15, 30, …, 195.",
                "Divide by 15: 0, 1, 2, …, 13.",
                "The whole numbers from 0 to 13 are 14 numbers, so she surveyed 14 customers.",
              ],
            },
          ],
          commonError: "Forgetting to count the first customer: the classic fence-post error.",
          difficulty: "core",
          guideRef: "data-and-sampling",
          hints: [
            "Write down the first few customer numbers she surveys.",
            "How many steps of 15 take you from 4 to 199?",
            "Is the number of customers the same as the number of steps?",
          ],
          strategy: "Try small cases",
        },
        {
          kind: "short",
          id: "statistics-p2-q07",
          question:
            "The heights of 40 seedlings are recorded in a grouped frequency table.\n\n| Height, {{h}} cm | Frequency |\n|---|---|\n| {{0 <= h < 5}} | 5 |\n| {{5 <= h < 10}} | {{x}} |\n| {{10 <= h < 15}} | {{2x}} |\n| {{15 <= h < 20}} | 11 |\n\nWhat is the frequency of the **modal class**?",
          answer: { type: "number", value: 16 },
          traps: [
            { spec: { type: "number", value: 8 }, feedback: "8 is the value of {{x}}. The modal class is the class with the *highest* frequency: {{2x = 16}}." },
            { spec: { type: "number", value: 11 }, feedback: "Work out {{x}} first. Once you know {{x = 8}}, the class {{10 <= h < 15}} has 16 seedlings, which beats 11." },
          ],
          solution: [
            "The frequencies add up to 40: {{5 + x + 2x + 11 = 40}}.",
            "{{3x + 16 = 40}}, so {{3x = 24}} and {{x = 8}}.",
            "The frequencies are 5, 8, 16 and 11.",
            "The modal class is {{10 <= h < 15}}, with frequency **16**.",
          ],
          difficulty: "core",
          guideRef: "tables",
          hints: [
            "What must the four frequencies add up to?",
            "Write an equation in {{x}} and solve it.",
            "Now which class has the highest frequency?",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "statistics-p2-q08",
          question:
            "In a survey, 35% of people said durian was their favourite fruit. What angle should the durian slice of a pie chart be? Give your answer in degrees.",
          answer: { type: "number", value: 126, display: "126°" },
          traps: [
            { spec: { type: "number", value: 35 }, feedback: "35 is the percentage. The whole pie is 360°, so you need 35% of 360°." },
          ],
          solution: [
            "The whole pie, 360°, stands for 100%.",
            "35% of 360° = 0.35 × 360 = **126°**.",
            "Or: 1% is 3.6°, so 35% is 35 × 3.6 = 126°.",
          ],
          difficulty: "core",
          guideRef: "charts",
          hints: ["What angle stands for 100%?", "Find 35% of 360°: try 10%, then 5%, then build up to 35%."],
          strategy: "Find one part first",
        },
        {
          kind: "written",
          id: "statistics-p2-q09",
          question:
            "The table shows how many bowls of ice kachang (in thousands) a dessert stall sold each quarter for two years.\n\n| | Jan–Mar | Apr–Jun | Jul–Sep | Oct–Dec |\n|---|---|---|---|---|\n| 2024 | 12 | 18 | 16 | 10 |\n| 2025 | 14 | 21 | 19 | 12 |\n\nThe data is plotted as a time-series graph. Describe (a) the **seasonal pattern** and (b) the **trend**. Use numbers from the table.",
          marks: 3,
          modelAnswer:
            "(a) Seasonal pattern: in both years sales rise to a peak in Apr–Jun (18 thousand, then 21 thousand), stay fairly high in Jul–Sep, and are lowest in Oct–Dec (10 thousand, then 12 thousand), the cooler, wetter monsoon months. The graph zig-zags the same way each year.\n\n(b) Trend: every quarter of 2025 is higher than the same quarter of 2024, by 2 or 3 thousand bowls (12 → 14, 18 → 21, 16 → 19, 10 → 12). So the overall trend is upwards.",
          markScheme: [
            { point: "Peak in Apr–Jun, the highest quarter in both years", keywords: ["apr", "jun", "peak", "highest", "21", "18"] },
            {
              point: "Lowest in Oct–Dec, and the same pattern repeats each year",
              keywords: ["oct", "dec", "lowest", "repeat", "each year", "same pattern", "every year"],
            },
            {
              point: "Upward trend: each quarter in 2025 is higher than the same quarter in 2024 (by 2 to 3 thousand)",
              keywords: ["increase", "upward", "higher", "rising", "same quarter", "2025", "goes up"],
            },
          ],
          commonError: "Calling the drop from Jul–Sep to Oct–Dec a 'downward trend'. That's the season; to see the trend, compare the same quarter in each year.",
          difficulty: "core",
          guideRef: "charts",
          hints: [
            "Within one year, when are sales highest and when are they lowest?",
            "To see the trend, compare the *same* quarter in different years.",
            "Work out 2025 − 2024 for each quarter.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "statistics-p2-q10",
          question:
            "The scatter graph shows how many hours a week 9 pupils practise typing, and their typing speed in words per minute (wpm). One pupil's result does not fit the pattern. Write down the coordinates of this point, as (hours, speed).",
          diagram: typingScatterSvg,
          answer: { type: "list", values: [7, 20], ordered: true, display: "(7, 20)" },
          traps: [
            {
              spec: { type: "list", values: [1, 22], ordered: true },
              feedback: "(1, 22) has a low speed, but it only practised for 1 hour, so it fits the pattern. Look for a point far away from the others' upward trend.",
            },
          ],
          solution: [
            "The points rise from left to right: more practice tends to go with faster typing.",
            "One point sits far below the others: 7 hours of practice but only 20 words per minute.",
            "The outlier is **(7, 20)**. It should be ignored when drawing the line of best fit.",
          ],
          commonError: "Writing the coordinates the wrong way round. Read across first (hours), then up (speed).",
          difficulty: "core",
          guideRef: "scatter-graphs",
          hints: [
            "Follow the general direction of the points. Which one is far away from that pattern?",
            "Read across first (hours), then up (speed).",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "statistics-p2-q11",
          question:
            "The dashed line on the scatter graph is a line of best fit for the typing data (ignoring the outlier). It passes through (1, 23) and (9, 55). Use it to estimate the typing speed of a pupil who practises for 6.5 hours a week. Give your answer in words per minute.",
          diagram: typingScatterSvg,
          answer: { type: "number", value: 45, display: "45 wpm" },
          traps: [
            {
              spec: { type: "number", value: 49 },
              feedback: "You added 6.5 lots of 4 to the speed at **1** hour. But 6.5 hours is only 5.5 hours after 1 hour: 23 + 5.5 × 4.",
            },
            { spec: { type: "number", value: 26 }, feedback: "6.5 × 4 = 26 forgets where the line starts. At 1 hour the line is already at 23 wpm." },
          ],
          solution: [
            "From 1 hour to 9 hours the line rises from 23 to 55: that's 32 wpm over 8 hours.",
            "So the line rises {{32/8 = 4}} wpm per hour.",
            "6.5 hours is 5.5 hours after 1 hour: 23 + 5.5 × 4 = 23 + 22 = **45 wpm**.",
            "6.5 hours is inside the data (1 to 9 hours), so this is interpolation and fairly reliable.",
          ],
          solutions: [
            {
              label: "Find the rule for the line",
              steps: [
                "The line rises 4 wpm per hour. At 0 hours it would be at 23 − 4 = 19 wpm, so speed = 4 × hours + 19.",
                "At 6.5 hours: 4 × 6.5 + 19 = 26 + 19 = 45 wpm. Once you have the rule, any prediction is one line.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "scatter-graphs",
          hints: [
            "How much does the line rise for each extra hour?",
            "It rises from 23 to 55 between 1 hour and 9 hours.",
            "How many hours after 1 hour is 6.5 hours?",
          ],
          strategy: "Find the rate of change",
        },
        {
          kind: "short",
          id: "statistics-p2-q12",
          question:
            "On a bar chart, the vertical axis starts at 50 instead of 0. The bar for Shop A shows 80 sales, and it is drawn **3 times** as tall as the bar for Shop B. How many sales did Shop B make?",
          answer: { type: "number", value: 60 },
          traps: [
            {
              spec: { type: "number", value: 26.67, tolerance: 0.1 },
              feedback: "80 ÷ 3 would be right if the axis started at 0. Here the bars start at 50, so Shop A's bar is only 80 − 50 = 30 units tall.",
            },
            { spec: { type: "number", value: 10 }, feedback: "10 is how tall Shop B's bar is *drawn*, measured from 50. Add the 50 that was cut off." },
          ],
          solution: [
            "The bars are drawn up from 50, so Shop A's bar is 80 − 50 = 30 units tall.",
            "Shop B's bar is a third of that: 30 ÷ 3 = 10 units tall.",
            "Shop B's sales: 50 + 10 = **60**.",
            "So Shop A really sold only {{80/60 = 4/3}} times as much, but the chart makes it look like 3 times.",
          ],
          difficulty: "core",
          guideRef: "choosing-and-misleading",
          hints: [
            "Measured from the bottom of the axis, how tall is Shop A's bar?",
            "Shop B's bar is a third of that height.",
            "Don't forget to add back the 50 that was cut off.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "statistics-p2-q13",
          question:
            "Arjun has the number of boys and the number of girls in each of four CCAs.\n\n(a) He wants a chart that shows clearly which CCA has the most members **in total**.\n\n(b) He wants a chart that makes it easy to compare **boys with girls** in each CCA.\n\nWhich type of bar chart should he use for each, and why? Hana suggests a single pie chart instead. Explain why that is a poor choice.",
          marks: 3,
          modelAnswer:
            "(a) A **compound (stacked) bar chart**. The boys and girls are stacked in one bar, so the height of the whole bar is the CCA's total membership, and the tallest bar is the biggest CCA.\n\n(b) A **dual bar chart**. The boys' and girls' bars stand side by side for each CCA, both starting from 0, so you can compare their heights directly.\n\nA single pie chart only shows how *one* whole is split into parts. It can't show boys and girls for each CCA at the same time, and it shows proportions rather than the actual numbers.",
          markScheme: [
            { point: "(a) Compound (stacked) bar chart, because the height of each bar shows the total", keywords: ["compound", "stacked", "total", "height"] },
            { point: "(b) Dual bar chart, because the bars side by side make boys and girls easy to compare", keywords: ["dual", "side by side", "side-by-side", "next to"] },
            {
              point: "A pie chart shows only one whole split into parts (proportions), not two groups or actual numbers",
              keywords: ["one whole", "proportion", "parts", "two groups", "only one", "actual numbers", "fraction"],
            },
          ],
          commonError: "Naming a chart without saying what the reader would see in it that answers the question.",
          difficulty: "core",
          guideRef: "choosing-and-misleading",
          hints: [
            "In which kind of bar chart does the height of the whole bar show a total?",
            "In which kind do the two groups' bars stand next to each other?",
            "What does one pie chart show? Can it show boys *and* girls for each CCA?",
          ],
          strategy: "Ask what the reader needs to see",
        },
        {
          kind: "short",
          id: "statistics-p2-q14",
          question:
            "In a class of 35 pupils, 8 study both French and Spanish, 15 study French but not Spanish, and 5 study neither. How many pupils study Spanish?",
          answer: { type: "number", value: 15 },
          traps: [
            { spec: { type: "number", value: 7 }, feedback: "7 is the number who study Spanish *only*. The 8 who study both also study Spanish." },
          ],
          solution: [
            "Fill in the regions you know: French only 15, both 8, neither 5.",
            "Spanish only = 35 − 15 − 8 − 5 = 7.",
            "Spanish altogether = Spanish only + both = 7 + 8 = **15**.",
          ],
          difficulty: "core",
          guideRef: "venn-carroll",
          hints: [
            "Draw the Venn diagram and fill in the three regions you know.",
            "The four regions add up to 35.",
            "Does 'study Spanish' include the pupils who study both languages?",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "statistics-p2-q15",
          question: "The frequency diagram shows the times, {{t}} minutes, that 40 pupils took to travel to school. How many pupils took **at least 20 minutes**?",
          diagram: travelTimeSvg,
          answer: { type: "number", value: 21 },
          traps: [
            {
              spec: { type: "number", value: 11 },
              feedback: "11 is only the class {{20 <= t < 30}}. 'At least 20 minutes' also includes the classes {{30 <= t < 40}} and {{40 <= t < 50}}.",
            },
            { spec: { type: "number", value: 34 }, feedback: "The class {{10 <= t < 20}} is *less* than 20 minutes, so don't include its 13 pupils." },
          ],
          solution: [
            "Read each bar: {{0 <= t < 10}}: 6, {{10 <= t < 20}}: 13, {{20 <= t < 30}}: 11, {{30 <= t < 40}}: 7, {{40 <= t < 50}}: 3.",
            "Check: 6 + 13 + 11 + 7 + 3 = 40 ✓.",
            "At least 20 minutes means the last three bars: 11 + 7 + 3 = **21**.",
          ],
          solutions: [
            {
              label: "Subtract from the total",
              steps: ["Fewer than 20 minutes: 6 + 13 = 19 pupils.", "At least 20 minutes: 40 − 19 = 21 pupils. Only two bars to read."],
            },
          ],
          difficulty: "core",
          guideRef: "continuous-data",
          hints: ["Which bars cover times of 20 minutes or more?", "Read the height of each of those bars, then add."],
          strategy: "Read the scale carefully",
        },
        {
          kind: "written",
          id: "statistics-p2-q16",
          question:
            "A survey of children aged 5 to 11 found a strong positive correlation between shoe size and reading score. Ravi says, \"Having bigger feet makes you a better reader.\"\n\nExplain why Ravi's conclusion is wrong, and suggest what is really going on.",
          marks: 3,
          modelAnswer:
            "Correlation does not prove causation. Shoe size and reading score increase together, but that doesn't mean one causes the other.\n\nA third variable, **age**, explains it. Older children have bigger feet, and older children have also had more years of reading practice, so they score higher. Both shoe size and reading score increase with age.\n\nTo check, compare children of the *same* age: you would expect no correlation between shoe size and reading score.",
          markScheme: [
            {
              point: "Correlation does not prove causation",
              keywords: ["causation", "cause", "doesn't mean", "does not mean", "does not prove", "not prove"],
            },
            { point: "Identifies age as a third (hidden) variable", keywords: ["age", "older", "third variable", "hidden"] },
            {
              point: "Explains that older children have bigger feet and also read better",
              keywords: ["bigger feet", "read better", "more practice", "grow", "older children"],
            },
          ],
          commonError: "Saying 'it's just a coincidence'. The correlation is real; it's the explanation that's wrong.",
          difficulty: "core",
          guideRef: "scatter-graphs",
          hints: [
            "Does correlation, on its own, prove that one thing causes the other?",
            "What else changes between a 5-year-old and an 11-year-old?",
            "How could that one thing affect both shoe size and reading?",
          ],
          strategy: "Look for a third variable",
        },
        {
          kind: "short",
          id: "statistics-p2-q17",
          question:
            "In a school, 60% of the pupils are girls. 25% of the girls and 40% of the boys walk to school. What percentage of **all** the pupils walk to school?",
          answer: { type: "number", value: 31, display: "31%" },
          traps: [
            {
              spec: { type: "number", value: 32.5 },
              feedback: "32.5% is the mean of 25% and 40%. That would only be right if there were as many girls as boys. There are more girls, so the answer is pulled towards their 25%.",
            },
            { spec: { type: "number", value: 65 }, feedback: "You added 25% and 40%. Percentages of different groups can't simply be added." },
          ],
          solution: [
            "Imagine 100 pupils: 60 girls and 40 boys.",
            "Girls who walk: 25% of 60 = 15.",
            "Boys who walk: 40% of 40 = 16.",
            "Walkers: 15 + 16 = 31 out of 100, so **31%**.",
          ],
          solutions: [
            {
              label: "Weighted average (quicker once you see it)",
              steps: ["The overall percentage is a weighted average: 0.6 × 25% + 0.4 × 40%.", "= 15% + 16% = 31%."],
            },
          ],
          difficulty: "challenge",
          guideRef: "tables",
          hints: [
            "Pick a convenient number of pupils, such as 100.",
            "How many girls and how many boys would there be?",
            "Find the number of walkers in each group, then add.",
          ],
          strategy: "Make it simpler: imagine 100 pupils",
        },
        {
          kind: "short",
          id: "statistics-p2-q18",
          question:
            "Two leaves in this ordered stem-and-leaf diagram have been smudged. They are shown as **a** and **b**.\n\n    2 | 3 5 8\n    3 | 1 a 6 9\n    4 | 0 2 b\n\nKey: 3 | 1 means 31.\n\nThe median of the 10 values is 34.5 and the range is 24. Find the digits a and b. Give a first.",
          answer: { type: "list", values: [3, 7], ordered: true, display: "a = 3, b = 7" },
          traps: [
            {
              spec: { type: "list", values: [3, 1], ordered: true },
              feedback: "a = 3 is right. For b, use the range: largest − smallest = 24, and the smallest value is 23, so the largest is 47.",
            },
          ],
          solution: [
            "Count the leaves: 3 + 4 + 3 = 10 values, so the median is halfway between the 5th and 6th values.",
            "In order: 23, 25, 28, 31, 3a, 36, … so the 5th value is 3a and the 6th is 36.",
            "Halfway between them is 34.5, so 3a + 36 = 69, giving 3a = 33 and a = **3**. (It fits the order: 1 ≤ 3 ≤ 6.)",
            "The largest value is 4b and the smallest is 23, so 4b = 23 + 24 = 47 and b = **7**.",
            "Answer: a = 3, b = 7.",
          ],
          commonError: "Taking the 5th value alone as the median. With 10 values, the median is halfway between the 5th and 6th.",
          difficulty: "challenge",
          guideRef: "stem-and-leaf",
          hints: [
            "How many values are there? Which positions give the median?",
            "Which value is 5th in order? Which is 6th?",
            "The 5th and 6th values must average 34.5. And range = largest − smallest.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "statistics-p2-q19",
          question:
            "Jun wants to know how adults in Singapore travel to work. At 8 am on a Monday he stands at an exit of Raffles Place MRT station and asks 500 people how they got there. 90% say MRT. Jun says, \"My sample is big, so I'm confident that 90% of Singapore's workers travel by MRT.\"\n\nGive **two** reasons why his conclusion is unreliable, explain why the size of his sample doesn't fix the problem, and describe a better way to choose his sample.",
          marks: 4,
          modelAnswer:
            "1. **Place bias:** everyone he asks is at an MRT station, so MRT users are hugely over-represented. People who drive, cycle, take the bus or walk to work never pass that exit.\n2. **Time bias:** he only asks people at 8 am on one weekday in the city centre, so he misses shift workers, people who work from home, people who start at other times and people who work in other parts of Singapore.\n3. A bigger sample chosen the same way is just as biased: 500 people leaving an MRT station still only tell you about people leaving an MRT station. Size helps only once the method is fair.\n4. **Better:** give every worker in Singapore a chance of being chosen, for example by randomly selecting households from a list of addresses across every area (or a stratified sample by region), and asking each worker how they usually travel to work.",
          markScheme: [
            {
              point: "Place bias: he only asks people at an MRT station, so MRT users are over-represented",
              keywords: ["station", "location", "place", "over-represented", "only mrt", "mrt users"],
            },
            {
              point: "Time or area bias: one time, one day, one city-centre place misses many workers",
              keywords: ["8 am", "time", "monday", "one day", "shift", "city", "raffles place", "other times"],
            },
            {
              point: "A large sample does not remove bias; how it is chosen matters",
              keywords: ["still biased", "size", "big", "large", "doesn't fix", "does not fix", "method"],
            },
            {
              point: "Better: a random (or stratified) sample of workers across all of Singapore",
              keywords: ["random", "stratified", "across singapore", "whole population", "different places", "different times", "list"],
            },
          ],
          commonError: "Saying 'the sample is too small'. 500 is plenty; the problem is who is in it.",
          difficulty: "challenge",
          guideRef: "data-and-sampling",
          hints: [
            "Who is likely to be walking out of an MRT station exit?",
            "Who would he never meet at that place and time?",
            "Does asking more people of the same kind remove the bias?",
            "How could every worker in Singapore get a fair chance of being asked?",
          ],
          strategy: "Ask who is missing from the sample",
        },
        {
          kind: "short",
          id: "statistics-p2-q20",
          question:
            "Class 8A has 30 pupils and class 8B has 20 pupils. In 8A's pie chart of how pupils travel to school, the walk slice is 84°. In 8B's pie chart, the walk slice is 126°. A single pie chart is drawn for both classes together. What angle is its walk slice? Give your answer in degrees.",
          answer: { type: "number", value: 100.8, display: "100.8°" },
          traps: [
            {
              spec: { type: "number", value: 105 },
              feedback: "105° is the mean of the two angles. That ignores the class sizes: 8A has more pupils, so the combined angle is pulled towards 8A's 84°.",
            },
            { spec: { type: "number", value: 210 }, feedback: "Adding the angles doesn't work. Turn each slice into a number of pupils first." },
          ],
          solution: [
            "8A: one pupil gets {{360/30 = 12°}}, so 84° is 84 ÷ 12 = 7 pupils.",
            "8B: one pupil gets {{360/20 = 18°}}, so 126° is 126 ÷ 18 = 7 pupils.",
            "Together: 7 + 7 = 14 walkers out of 50 pupils.",
            "Combined angle: {{14/50 * 360 = 100.8°}}.",
          ],
          solutions: [
            {
              label: "Weighted average of the angles (slicker)",
              steps: [
                "8A makes up {{30/50 = 3/5}} of the pupils and 8B makes up {{2/5}}.",
                "Combined angle = {{3/5 * 84 + 2/5 * 126 = 50.4 + 50.4 = 100.8°}}.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "charts",
          hints: [
            "Can you simply average the two angles? What about the different class sizes?",
            "Turn each walk slice into a number of pupils.",
            "How many walkers are there, out of how many pupils altogether?",
          ],
          strategy: "Compare like with like",
        },
      ],
    },
  ],

  // =========================================================================
  // CHALLENGE PROBLEMS
  // =========================================================================
  challenge: [
    {
      kind: "short",
      id: "statistics-ch-q01",
      question:
        "A list has 1000 names, numbered 1 to 1000. Siti takes a systematic sample of every 7th name: she picks a random starting number from 1 to 7, then takes every 7th name after it until she reaches the end of the list. For some starting numbers she gets 143 names; for others she gets only 142. For how many of the 7 possible starting numbers does she get **143** names?",
      answer: { type: "number", value: 6 },
      traps: [
        { spec: { type: "number", value: 7 }, feedback: "Try a start of 7: the 143rd name would be 7 + 142 × 7 = 1001, which isn't on the list." },
        { spec: { type: "number", value: 1 }, feedback: "Check a start of 2: its 143rd name would be 2 + 142 × 7 = 996, which *is* on the list. Several starts work." },
      ],
      solution: [
        "1000 = 7 × 142 + 6. So the first 994 names split into 142 complete blocks of 7: names 1–7, 8–14, …, 988–994.",
        "Whatever her start, Siti takes exactly one name from each complete block: that's 142 names.",
        "The leftover names are 995, 996, 997, 998, 999 and 1000: positions 1 to 6 of a 143rd block.",
        "She gets a 143rd name only if her starting number is 1, 2, 3, 4, 5 or 6. A start of 7 would need name 1001, which doesn't exist.",
        "So **6** of the 7 starting numbers give 143 names.",
      ],
      solutions: [
        {
          label: "Find the 143rd name (slicker)",
          steps: [
            "With start {{s}}, her names are {{s}}, {{s + 7}}, {{s + 14}}, … so her 143rd name would be {{s + 142 * 7 = s + 994}}.",
            "She gets 143 names exactly when {{s + 994 <= 1000}}, that is, when {{s <= 6}}.",
            "That's starts 1 to 6: 6 of them. One inequality instead of thinking about blocks.",
          ],
        },
      ],
      commonError: "Assuming every start gives the same number of names. 1000 isn't a multiple of 7, so the leftover piece matters.",
      difficulty: "challenge",
      guideRef: "data-and-sampling",
      hints: [
        "Try a small case first: a list of 10 names, every 3rd name. How many names do you get from each start?",
        "Split the 1000 names into blocks of 7. How many complete blocks are there, and what's left over?",
        "She takes one name from every complete block. When does she also get a name from the leftover piece?",
        "With start {{s}}, the 143rd name would be {{s + 142 * 7}}. When is that still on the list?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "statistics-ch-q02",
      question:
        "Twenty pupils scored whole-number marks in a quiz. The marks are shown in a grouped frequency table.\n\n| Mark | 0–9 | 10–19 | 20–29 | 30–39 |\n|---|---|---|---|---|\n| Frequency | 3 | 9 | 6 | 2 |\n\nThe exact marks have been lost. What are the **smallest** and **largest** possible values of the range of the marks? Give the smallest first.",
      answer: { type: "list", values: [21, 39], ordered: true, display: "smallest 21, largest 39" },
      traps: [
        {
          spec: { type: "list", values: [20, 40], ordered: true },
          feedback: "The marks are whole numbers, so the classes really end at 9, 19, 29 and 39. The lowest mark is at most 9 and the highest is at most 39.",
        },
        {
          spec: { type: "list", values: [0, 39], ordered: true },
          feedback: "The range can't be 0: the lowest mark is in 0–9 and the highest is in 30–39, so they are at least 30 − 9 apart.",
        },
      ],
      solution: [
        "The range is highest mark − lowest mark. Someone scored in 0–9, so the lowest mark is somewhere in 0–9. Someone scored in 30–39, so the highest mark is somewhere in 30–39.",
        "**Largest range:** push the extremes apart. Lowest 0, highest 39: 39 − 0 = 39.",
        "**Smallest range:** squeeze them together. The lowest mark is at most 9 and the highest is at least 30, so the range is at least 30 − 9 = 21.",
        "Can 21 really happen? Yes: the 3 pupils in 0–9 all score 9, the 2 pupils in 30–39 both score 30, and everyone else scores anything in their own class. Range = 30 − 9 = 21.",
        "Answer: smallest **21**, largest **39**.",
      ],
      commonError: "Using the class boundaries 10, 20, 30, 40 as if they were possible marks, or forgetting that the smallest range must still be possible with whole-number marks.",
      difficulty: "challenge",
      guideRef: "tables",
      hints: [
        "Which classes must the lowest and the highest marks be in?",
        "To make the range big, push the extremes apart. To make it small, push them together.",
        "What is the highest possible mark in the class 0–9? The lowest possible mark in the class 30–39?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "statistics-ch-q03",
      question:
        "A pie chart has four slices with angles 84°, 132°, 60° and 84°. Each slice stands for a whole number of people. What is the **smallest** possible number of people in the survey?",
      answer: { type: "number", value: 30 },
      traps: [
        { spec: { type: "number", value: 360 }, feedback: "360 people works (1° each), but it isn't the smallest. Could each person get a bigger angle than 1°?" },
        { spec: { type: "number", value: 12 }, feedback: "12° is the largest possible angle for *one* person. How many people share the 360°?" },
      ],
      solution: [
        "If there are {{N}} people, a slice of angle {{a}} stands for {{a/360 * N}} people, and this must be a whole number for every slice.",
        "The 84° slice stands for {{84/360 * N = 7N/30}} people. 7 and 30 have no common factor, so {{N}} must be a multiple of 30.",
        "Try {{N = 30}}: each person gets {{360/30 = 12°}}, and the slices are 84 ÷ 12 = 7, 132 ÷ 12 = 11, 60 ÷ 12 = 5 and 7 people. All whole numbers ✓.",
        "Smallest possible number: **30**.",
      ],
      solutions: [
        {
          label: "Biggest angle per person (slicker)",
          steps: [
            "Every person gets the same angle, and each slice must be a whole number of those angles.",
            "Fewest people means the biggest angle per person. The biggest angle that goes exactly into 84, 132 and 60 is their HCF: 12°.",
            "Number of people = {{360/12 = 30}}.",
          ],
        },
      ],
      commonError: "Thinking each person must get a whole number of degrees, or stopping at a number of people that works without checking whether a smaller one does.",
      difficulty: "challenge",
      guideRef: "charts",
      hints: [
        "Every person gets the same angle. How must each slice's angle compare with that?",
        "Each slice must be a whole number of 'one-person angles'.",
        "To use as few people as possible, make each person's angle as large as you can. What is the largest angle that divides 84, 132 and 60 exactly?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "statistics-ch-q04",
      question:
        "Two classes each draw a pie chart of their favourite sport. Then the two classes' data is combined into one pie chart.\n\n*Always, sometimes or never true?* \"The combined pie chart's football slice is somewhere between the two classes' football slices (or equal to them, if they are the same).\"\n\nDecide, and prove your answer.",
      marks: 3,
      modelAnswer:
        "**Always true.**\n\nSuppose class 1 has {{m}} pupils and a fraction {{p}} of them chose football, and class 2 has {{n}} pupils and a fraction {{q}} chose football. Label the classes so that {{p <= q}}.\n\nCombined, {{pm + qn}} of the {{m + n}} pupils chose football, so the combined fraction is {{(pm + qn)/(m + n)}}.\n\nBecause {{p <= q}}: {{pm + qn >= pm + pn = p(m + n)}}, so the combined fraction is at least {{p}}. Also {{pm + qn <= qm + qn = q(m + n)}}, so it is at most {{q}}.\n\nA slice's angle is 360° × its fraction, so the combined angle lies between the two classes' angles. (It is a *weighted* average, pulled towards the bigger class.) Example: 7 out of 30 is 84° and 7 out of 20 is 126°; combined, 14 out of 50 is 100.8°, which is between them.",
      markScheme: [
        { point: "States that it is always true", keywords: ["always"] },
        {
          point: "Writes the combined fraction as total football fans ÷ total pupils (a weighted average of the two fractions)",
          keywords: ["weighted", "combined", "total", "m + n", "pm + qn", "average"],
        },
        {
          point: "Shows the combined fraction is at least the smaller and at most the larger fraction, so the angle is between them",
          keywords: ["at least", "at most", "between", "bigger than", "smaller than", "inequality"],
        },
      ],
      solutions: [
        {
          label: "Algebra (a proof for every case)",
          steps: [
            "Combined fraction = {{(pm + qn)/(m + n)}}.",
            "Replace {{q}} by the smaller {{p}}: the top can only shrink, to {{p(m + n)}}, so the fraction is at least {{p}}.",
            "Replace {{p}} by the bigger {{q}}: the top can only grow, to {{q(m + n)}}, so the fraction is at most {{q}}.",
          ],
        },
        {
          label: "Mixing (the intuition, quicker to see)",
          steps: [
            "Think of each class as a jug of juice, with football fans as the juice and everyone else as water.",
            "Pouring a weaker jug into a stronger one gives a mixture weaker than the strong jug but stronger than the weak one.",
            "So the combined football fraction, and its angle, must lie in between. The algebra turns this picture into a proof.",
          ],
        },
      ],
      commonError: "Answering 'always' because one example worked. An example shows something *can* happen; 'always' needs an argument that covers every case.",
      difficulty: "challenge",
      guideRef: "charts",
      hints: [
        "Try an example: 3 out of 10 pupils in one class, 12 out of 20 in the other. Where does the combined fraction land?",
        "Write the combined fraction as total football fans ÷ total pupils.",
        "Call the class sizes {{m}} and {{n}}, and the football fractions {{p}} and {{q}} with {{p <= q}}.",
        "Compare {{pm + qn}} with {{p(m + n)}} and with {{q(m + n)}}.",
      ],
      strategy: "Try small cases, then prove it",
    },
    {
      kind: "short",
      id: "statistics-ch-q05",
      question:
        "60 pupils were asked which clubs they belong to: Maths (M), Science (S) and Art (A).\n\n- 30 are in M, 25 are in S and 20 are in A.\n- 12 are in both M and S, 9 are in both M and A, and 8 are in both S and A.\n- 5 are in all three clubs.\n\nHow many pupils are in **none** of the three clubs?",
      answer: { type: "number", value: 9 },
      traps: [
        {
          spec: { type: "number", value: 14 },
          feedback: "You subtracted the pairs but didn't add back the 5 in all three. Those 5 were counted 3 times in the circles and then taken away 3 times in the pairs, so they vanished completely.",
        },
      ],
      solution: [
        "Fill in a three-circle Venn diagram from the middle outwards.",
        "All three: 5.",
        "M and S but not A: 12 − 5 = 7. M and A but not S: 9 − 5 = 4. S and A but not M: 8 − 5 = 3.",
        "M only: 30 − 7 − 4 − 5 = 14. S only: 25 − 7 − 3 − 5 = 10. A only: 20 − 4 − 3 − 5 = 8.",
        "In at least one club: 5 + 7 + 4 + 3 + 14 + 10 + 8 = 51.",
        "None: 60 − 51 = **9**.",
      ],
      solutions: [
        {
          label: "Inclusion–exclusion (slicker)",
          steps: [
            "Add the circles: 30 + 25 + 20 = 75. Pupils in exactly two clubs are counted twice, and the 5 in all three are counted 3 times.",
            "Subtract the pairs: 75 − 12 − 9 − 8 = 46. Now pupils in exactly two clubs are counted once, but the 5 in all three have been subtracted 3 times, so they are counted 0 times.",
            "Add them back: 46 + 5 = 51 pupils in at least one club.",
            "None: 60 − 51 = 9. No diagram needed, but the diagram method shows *why* it works.",
          ],
        },
      ],
      commonError: "Treating '12 are in both M and S' as 'exactly M and S'. It includes the 5 who are in all three.",
      difficulty: "challenge",
      guideRef: "venn-carroll",
      hints: [
        "Draw three overlapping circles. Which region should you fill in first?",
        "Does '12 are in both M and S' include the 5 who are in all three clubs?",
        "Work outwards: the 'exactly two clubs' regions next, then the 'one club only' regions.",
        "Add all seven regions inside the circles and compare with 60.",
      ],
      strategy: "Start in the middle (the overlap)",
    },
    {
      kind: "short",
      id: "statistics-ch-q06",
      question:
        "In a class of 30 pupils, 24 like maths, 22 like art and 20 like music. What is the **smallest** possible number of pupils who like all three?",
      answer: { type: "number", value: 6 },
      traps: [
        { spec: { type: "number", value: 0 }, feedback: "With so many pupils liking each subject, the groups can't avoid each other. Count how many pupils *dislike* each subject." },
        { spec: { type: "number", value: 20 }, feedback: "20 is the *largest* possible number (if every music fan likes the other two as well). The question asks for the smallest." },
      ],
      solution: [
        "Count the pupils who *don't* like each subject: 30 − 24 = 6 don't like maths, 30 − 22 = 8 don't like art, 30 − 20 = 10 don't like music.",
        "A pupil who doesn't like all three must dislike at least one subject. At most 6 + 8 + 10 = 24 pupils dislike at least one subject (fewer if someone dislikes two).",
        "So at least 30 − 24 = 6 pupils like all three.",
        "6 really can happen: make the three 'dislike' groups completely separate (6 pupils dislike only maths, 8 only art, 10 only music) and let the other 6 like everything. Check: maths fans = 30 − 6 = 24 ✓, art fans = 30 − 8 = 22 ✓, music fans = 30 − 10 = 20 ✓.",
        "Smallest possible number: **6**.",
      ],
      solutions: [
        {
          label: "Two overlaps at a time (the 'dislikes' method above is slicker)",
          steps: [
            "Maths and art: 24 + 22 = 46 > 30, so at least 46 − 30 = 16 pupils like both.",
            "Now combine 'maths and art' (at least 16) with music (20): 16 + 20 = 36 > 30, so at least 36 − 30 = 6 like all three.",
            "The example in the main solution shows that 6 is actually possible.",
          ],
        },
      ],
      commonError: "Finding the bound 6 but not checking that a class with exactly 6 really exists. A 'smallest possible' answer needs both halves.",
      difficulty: "challenge",
      guideRef: "venn-carroll",
      hints: [
        "Instead of who likes each subject, think about who *doesn't*.",
        "How many pupils dislike maths? Art? Music?",
        "What is the greatest number of pupils who could dislike at least one subject?",
        "Everyone else must like all three. Can you build a class where this smallest number really happens?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "statistics-ch-q07",
      question:
        "Mei writes 13 **different** whole numbers in an ordered stem-and-leaf diagram with stems 2, 3 and 4 (key: 3 | 5 means 35). Every stem has at least one leaf. What is the **largest** possible median?",
      answer: { type: "number", value: 43 },
      traps: [
        { spec: { type: "number", value: 49 }, feedback: "49 is the largest possible *value*. The median is the middle value, and 6 different values must fit above it." },
        {
          spec: { type: "number", value: 44 },
          feedback: "Count again: with 13 values the median has 6 values above it, not 5. Six different whole numbers above 44 would need 45 to 50, and 50 isn't allowed.",
        },
      ],
      solution: [
        "With 13 values in order, the median is the 7th value, so 6 values lie above it.",
        "Those 6 values are different whole numbers, each bigger than the median and at most 49. So from (median + 1) up to 49 there must be room for 6 different numbers: median + 6 ≤ 49, so the median ≤ 43.",
        "Check that 43 is possible: 20 | 30 31 32 33 34 | 43 44 45 46 47 48 49. That's 1 + 5 + 7 = 13 different numbers, every stem has a leaf, and the 7th value is 43.",
        "Largest possible median: **43**.",
      ],
      solutions: [
        {
          label: "Try the cases stem by stem (slower)",
          steps: [
            "To push the median up, put lots of values on stem 4. Stem 4 can hold at most 10 values: 40 to 49.",
            "If stem 4 has 7 or more values, the 7th value overall is on stem 4. With 7 values on stem 4, the best is 43 to 49, so the 7th value is at most 43. Using more stem-4 values only pushes smaller numbers like 40, 41, 42 into the middle.",
            "If stem 4 has 6 or fewer values, the 7th value is on stem 3 or lower: at most 39.",
            "So 43 is the best. The 'six values above' argument gets there in one line.",
          ],
        },
      ],
      commonError: "Forgetting that the values must be different, or miscounting the number of values above the median.",
      difficulty: "challenge",
      guideRef: "stem-and-leaf",
      hints: [
        "With 13 values, which position is the median? How many values lie above it?",
        "What is the largest any value can be?",
        "If the median is {{M}}, the 6 values above it are different whole numbers from {{M + 1}} up to 49. How many numbers is that?",
        "Check your answer by writing down an actual set of 13 numbers.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "statistics-ch-q08",
      question:
        "A newspaper infographic shows rice imports as two cubes. The 2015 cube has edges 2 cm long and stands for 16 thousand tonnes. The 2025 cube has edges 3 cm long. The newspaper says the **volumes** of the cubes are in proportion to the imports. How many thousand tonnes does the 2025 cube stand for?",
      answer: { type: "number", value: 54, display: "54 thousand tonnes" },
      traps: [
        {
          spec: { type: "number", value: 24 },
          feedback: "That's what you'd get by comparing edge lengths (× 1.5). The newspaper uses volume: 2 × 2 × 2 = 8 cm³ against 3 × 3 × 3 = 27 cm³.",
        },
        {
          spec: { type: "number", value: 36 },
          feedback: "That compares the areas of the faces (4 cm² and 9 cm²). Cubes are solid, so compare volumes: 8 cm³ and 27 cm³.",
        },
      ],
      solution: [
        "Volumes: the 2015 cube is {{2^3 = 8}} cm³ and the 2025 cube is {{3^3 = 27}} cm³.",
        "8 cm³ stands for 16 thousand tonnes, so 1 cm³ stands for 16 ÷ 8 = 2 thousand tonnes.",
        "27 cm³ stands for 27 × 2 = **54 thousand tonnes**.",
        "See how misleading the picture is: the 2025 cube looks only 1.5 times as tall, but stands for 3.375 times as much. A reader judging by height would guess 24 thousand tonnes.",
      ],
      solutions: [
        {
          label: "Scale factor (slicker)",
          steps: [
            "The edges are enlarged by a scale factor of {{3/2 = 1.5}}.",
            "Volume scales by the cube of the scale factor: {{1.5^3 = 3.375}}.",
            "16 × 3.375 = 54 thousand tonnes.",
          ],
        },
      ],
      commonError: "Scaling by the edge length (or by the area) instead of by the volume.",
      difficulty: "challenge",
      guideRef: "choosing-and-misleading",
      hints: [
        "The newspaper compares volumes. What is the volume of each cube?",
        "How many thousand tonnes does 1 cm³ stand for?",
        "Or: by what scale factor did the edges grow? What does that do to a volume?",
      ],
      strategy: "Find one part first",
    },
    {
      kind: "written",
      id: "statistics-ch-q09",
      question:
        "*Always, sometimes or never true?* \"If two separate groups of data each show negative correlation, then the two groups plotted together on one scatter graph must also show negative correlation.\"\n\nDecide, and justify your answer with an example set of points (you could sketch them).",
      marks: 4,
      modelAnswer:
        "**Sometimes** true, so the statement is false as a rule.\n\nCounter-example: Group A is (1, 10), (2, 9), (3, 8). Group B is (11, 30), (12, 29), (13, 28). Within each group, as {{x}} increases {{y}} decreases: negative correlation. But together the points form a low cluster on the left and a high cluster on the right, so overall {{y}} tends to *increase* with {{x}}: **positive** correlation.\n\nIt can also stay negative: if Group B were (11, 0), (12, −1), (13, −2), the combined data would still slope downwards.\n\nSo the *positions* of the groups matter, not just their slopes. In context: in each of two hawker centres, stalls with higher prices might sell fewer bowls, but a busy city-centre hawker centre can have higher prices *and* more customers than a quiet suburban one, so the combined data slopes upwards. A hidden variable (which hawker centre) reverses the pattern.",
      markScheme: [
        { point: "States 'sometimes' (it is not always true)", keywords: ["sometimes", "not always", "false"] },
        {
          point: "Gives a valid example in which each group on its own shows negative correlation",
          keywords: ["example", "group a", "group b", "each group", "negative", "points"],
        },
        {
          point: "Shows that combined, the points show positive (or no) correlation because the groups sit in different positions",
          keywords: ["positive", "combined", "together", "cluster", "position", "overall"],
        },
        {
          point: "Notes that it can also stay negative, or explains the hidden variable (which group a point is in)",
          keywords: ["can also", "still negative", "hidden", "third variable", "which group"],
        },
      ],
      solutions: [
        {
          label: "Build a counter-example by sliding",
          steps: [
            "Draw a small group of points sloping downwards.",
            "Copy the group and slide the copy far up and to the right.",
            "Each group still slopes down, but the eye now reads one big upward trend from the lower-left group to the upper-right group.",
          ],
        },
      ],
      commonError: "Answering 'always' because correlation 'should add up'. Correlation within groups says nothing about where the groups sit relative to each other.",
      difficulty: "challenge",
      guideRef: "scatter-graphs",
      hints: [
        "To show a statement isn't *always* true, one counter-example is enough.",
        "Draw a small group of points sloping downwards. Now draw a copy of it somewhere else.",
        "Where could you put the copy so that the two groups together seem to slope *upwards*?",
        "Could the combined data still be negative with a different arrangement? Then the answer isn't 'never' either.",
      ],
      strategy: "Find a counter-example",
    },
    {
      kind: "written",
      id: "statistics-ch-q10",
      question:
        "An infographic says: \"80% of car accidents happen within 8 km of home. So it's safer to drive long distances!\"\n\nSpot the flaw in this argument. Explain what extra information you would need to decide whether driving near home really is more dangerous.",
      marks: 3,
      modelAnswer:
        "The flaw: most driving happens close to home. Almost every journey starts or ends near home, so most of the kilometres driven are within 8 km of home. You would expect most accidents to happen there even if those roads were no more dangerous at all.\n\nThe 80% counts accidents, but ignores how much driving happens in each zone. To compare fairly you need a **rate**: for example, the number of accidents per million kilometres driven (or per journey) near home and far from home.\n\nExample: if 90% of all driving is within 8 km of home but only 80% of accidents are, then driving near home is actually *safer* per kilometre than driving far away.",
      markScheme: [
        {
          point: "Most driving (or most journeys) happens near home, so most accidents would happen there anyway",
          keywords: ["most driving", "most journeys", "near home", "more driving", "most of the time", "start", "drive near home"],
        },
        {
          point: "Need a rate: accidents compared with the amount of driving (per km, per journey or per hour)",
          keywords: ["rate", "per km", "per kilometre", "per journey", "per hour", "amount of driving", "how much driving", "proportion"],
        },
        {
          point: "Shows with an example or reasoning that the claim doesn't follow (e.g. 90% of driving but 80% of accidents)",
          keywords: ["90%", "compare", "doesn't follow", "does not mean", "safer", "more dangerous", "example"],
        },
      ],
      solutions: [
        {
          label: "Put numbers on it",
          steps: [
            "Suppose people drive 1000 million km a year: 900 million km within 8 km of home and 100 million km further away, with 1000 accidents in total.",
            "800 accidents near home: {{800/900}} ≈ 0.89 accidents per million km.",
            "200 accidents further away: {{200/100}} = 2 accidents per million km.",
            "In this example, driving far from home is more than twice as dangerous per kilometre, even though only 20% of accidents happen there.",
          ],
        },
      ],
      commonError: "Agreeing with the claim, or just saying 'it's made up'. The figure may be true; the conclusion is what's wrong.",
      difficulty: "challenge",
      guideRef: "choosing-and-misleading",
      hints: [
        "Where do most car journeys start and end?",
        "If 99% of all driving happened near home, what percentage of accidents would you expect there, even if every road were equally safe?",
        "What would you need to divide the accident numbers by to make a fair comparison?",
      ],
      strategy: "Ask what's missing: the denominator",
    },
  ],
};
