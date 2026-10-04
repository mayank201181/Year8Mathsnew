// ---------------------------------------------------------------------------
// Averages, Range & Comparing Data — Practice Papers 3 and 4.
//   Paper 3: problem solving in context and multi-step questions.
//   Paper 4: exam style — linked parts, diagrams/tables, reasoning.
// ---------------------------------------------------------------------------
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "averages-spread-p3",
    title: "Practice Paper 3",
    questions: [
      // ---------------------------------------------------------------- q01
      {
        kind: "short",
        id: "averages-spread-p3-q01",
        question:
          "During one week of the monsoon season, the daily rainfall at Changi was recorded, in mm:\n\n12, 0, 35, 8, 0, 21, 15\n\nFind the median daily rainfall. Give your answer in mm.",
        answer: { type: "number", value: 12, display: "12 mm" },
        solution: [
          "Put the values in order, keeping both dry days: 0, 0, 8, 12, 15, 21, 35.",
          "There are 7 values, so the median is the {{(7+1)/2 = 4}}th value.",
          "The 4th value is 12, so the median daily rainfall is 12 mm.",
          "For comparison, the mean is 91 ÷ 7 = 13 mm and the mode is 0 mm. A forecaster who said 'a typical day had no rain' would be quoting the mode.",
        ],
        commonError: "Taking the middle of the list as it is written (8) without putting the values in order first.",
        traps: [
          { spec: { type: "number", value: 8 }, feedback: "8 is the middle of the list as it is written. Put the values in order first, then find the middle one." },
          { spec: { type: "number", value: 15 }, feedback: "Did you leave out the two dry days? A rainfall of 0 mm is still a data value, so there are 7 values, not 5." },
        ],
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["How many values are there, and which position is the middle one?", "Write all seven values in order, including both 0s."],
        strategy: "Sort first",
      },
      // ---------------------------------------------------------------- q02
      {
        kind: "short",
        id: "averages-spread-p3-q02",
        question:
          "Hana tracked how much her savings changed each week for 7 weeks. A negative number means her savings went down that week.\n\n| Week | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n|---|---|---|---|---|---|---|---|\n| Change ($) | −3 | +5 | +8 | +7 | −3 | +2 | −3 |\n\nFind the median weekly change, in dollars.",
        answer: { type: "number", value: 2, display: "+$2" },
        solution: [
          "Order the changes from smallest to largest. Negative numbers come first: −3, −3, −3, 2, 5, 7, 8.",
          "There are 7 values, so the median is the 4th value.",
          "The median weekly change is +$2.",
          "Notice that the mode (−3) makes Hana's saving look bad, while the median shows that in a typical week her savings went up a little.",
        ],
        commonError: "Taking the 4th value in the table (+7) without ordering, or forgetting that −3 is smaller than 2.",
        traps: [
          { spec: { type: "number", value: 7 }, feedback: "+7 is the 4th value in the table, but the table isn't in order. Sort the changes first: the negative numbers come first." },
          { spec: { type: "number", value: -3 }, feedback: "−3 is the mode (it appears three times). The median is the middle value once the changes are in order." },
        ],
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Which values are smallest: the negative ones or the positive ones?", "Write the seven changes in order, then pick the middle one."],
        strategy: "Sort first",
      },
      // ---------------------------------------------------------------- q03
      {
        kind: "short",
        id: "averages-spread-p3-q03",
        question:
          "A bicycle-rental kiosk at East Coast Park recorded how many hours each of its last 10 bikes was rented for:\n\n2, 1, 3, 1, 6, 2, 1, 4, 1, 2\n\nThe owner wants to offer a special price for the most common rental length. Use the most suitable average to decide which rental length, in hours, should get the special price.",
        answer: { type: "number", value: 1, display: "1 hour (the mode)" },
        solution: [
          "The owner wants the *most common* rental length, so the right average is the mode.",
          "Count each value: 1 hour appears 4 times, 2 hours 3 times, and 3, 4 and 6 hours once each.",
          "The mode is 1 hour, so 1-hour rentals should get the special price.",
          "The mean (23 ÷ 10 = 2.3 hours) is not a length anyone actually chose, and the median (2 hours) is not the most popular choice.",
        ],
        commonError: "Calculating the mean because it is the 'usual' average. For the most popular value, use the mode.",
        traps: [
          { spec: { type: "number", value: 2.3 }, feedback: "2.3 hours is the mean, but nobody rented a bike for 2.3 hours. The owner wants the most common length: the mode." },
          { spec: { type: "number", value: 2 }, feedback: "2 hours is the median. The most common rental length is the mode: which value appears most often?" },
        ],
        difficulty: "warmup",
        guideRef: "choosing-an-average",
        hints: ["Which average tells you the most popular value?", "Count how many times each rental length appears."],
        strategy: "Choose the right average",
      },
      // ---------------------------------------------------------------- q04
      {
        kind: "short",
        id: "averages-spread-p3-q04",
        question:
          "Arjun bought three meals at a hawker centre. The mean cost of the three meals was $4.50. Two of the meals cost $3.80 and $4.90. How much did the third meal cost?",
        answer: { type: "number", value: 4.8, display: "$4.80" },
        solution: [
          "Total cost of the three meals = mean × number of meals = 3 × $4.50 = $13.50.",
          "The two known meals cost $3.80 + $4.90 = $8.70.",
          "Third meal = $13.50 − $8.70 = $4.80.",
          "Check: (3.80 + 4.90 + 4.80) ÷ 3 = 13.50 ÷ 3 = 4.50 ✓",
        ],
        commonError: "Trying to work with the mean directly. Turn the mean into a total first.",
        traps: [
          { spec: { type: "number", value: 4.5 }, feedback: "$4.50 is the mean, not the third meal. Start by finding the total cost: 3 × $4.50." },
          { spec: { type: "number", value: 13.5 }, feedback: "$13.50 is the total cost of all three meals. Now take away the two meals you already know." },
        ],
        difficulty: "warmup",
        guideRef: "working-backwards",
        hints: ["If you know the mean and how many meals there were, what else can you work out?", "Total = mean × number of meals."],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q05
      {
        kind: "short",
        id: "averages-spread-p3-q05",
        question:
          "For a science experiment, Aisha planted 3 seeds in each of 20 pots. After a week she counted how many seeds had germinated in each pot.\n\n| Seeds germinated | Number of pots |\n|---|---|\n| 0 | 2 |\n| 1 | 5 |\n| 2 | 8 |\n| 3 | 5 |\n\nHow many seeds germinated altogether?",
        answer: { type: "number", value: 36 },
        solution: [
          "Each row tells you how many pots had that many seeds germinate. Multiply across each row:",
          "0 × 2 = 0, 1 × 5 = 5, 2 × 8 = 16, 3 × 5 = 15.",
          "Total = 0 + 5 + 16 + 15 = 36 seeds.",
          "This 'value × frequency' total is exactly what a mean needs: 36 seeds ÷ 20 pots = 1.8 seeds per pot.",
        ],
        commonError: "Adding the 'Number of pots' column (20). That counts pots, not seeds.",
        traps: [
          { spec: { type: "number", value: 20 }, feedback: "20 is the number of pots. The 8 pots with 2 seeds each give 16 seeds, so multiply each row before adding." },
          { spec: { type: "number", value: 6 }, feedback: "You added 0 + 1 + 2 + 3. Multiply each number of seeds by the number of pots it happened in." },
        ],
        difficulty: "warmup",
        guideRef: "frequency-tables",
        hints: ["How many seeds germinated in the 8 pots that each had 2?", "Make an extra column: seeds × number of pots. Then add that column."],
        strategy: "Add an fx column",
      },
      // ---------------------------------------------------------------- q06
      {
        kind: "short",
        id: "averages-spread-p3-q06",
        question:
          "A sugarcane-juice stall recorded how many cups each customer bought one lunchtime.\n\n| Cups bought | Number of customers |\n|---|---|\n| 1 | 13 |\n| 2 | 9 |\n| 3 | 6 |\n| 4 | 2 |\n\nFind the mean number of cups bought per customer.",
        answer: { type: "number", value: 1.9 },
        solution: [
          "Number of customers = 13 + 9 + 6 + 2 = 30.",
          "Total cups (the fx column): 1 × 13 + 2 × 9 + 3 × 6 + 4 × 2 = 13 + 18 + 18 + 8 = 57.",
          "Mean = total cups ÷ number of customers = 57 ÷ 30 = 1.9 cups.",
          "Sense check: most customers bought 1 or 2 cups, so a mean just under 2 is sensible.",
        ],
        commonError: "Dividing the total cups by 4 (the number of rows) instead of by 30 (the number of customers).",
        traps: [
          { spec: { type: "number", value: 14.25 }, feedback: "57 cups is right, but you divided by 4, the number of rows. Divide by the number of customers, 30." },
          { spec: { type: "number", value: 7.5 }, feedback: "That is 30 ÷ 4, the mean of the frequency column. You need the total number of cups ÷ the number of customers." },
        ],
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "Any mean needs two totals. Which two?",
          "Total cups: multiply each number of cups by how many customers bought that many, then add.",
          "Total cups = 57. How many customers were there altogether?",
        ],
        strategy: "Add an fx column",
      },
      // ---------------------------------------------------------------- q07
      {
        kind: "short",
        id: "averages-spread-p3-q07",
        question:
          "Eight swimmers raced 50 m freestyle at a school swimming gala. Their times, in seconds, were:\n\n34.2, 31.8, 36.5, 33.0, 32.4, 35.1, 33.9, 31.8\n\nEvery swimmer whose time is faster than the median time will be picked for the relay team. Find the median time, in seconds.",
        answer: { type: "number", value: 33.45, display: "33.45 s" },
        solution: [
          "Order the times: 31.8, 31.8, 32.4, 33.0, 33.9, 34.2, 35.1, 36.5.",
          "There are 8 times, so there are two middle values: the 4th (33.0) and the 5th (33.9).",
          "Median = {{(33.0 + 33.9)/2 = 66.9/2 = 33.45}} seconds.",
          "The four swimmers faster than 33.45 s (31.8, 31.8, 32.4 and 33.0) make the relay team.",
        ],
        commonError: "Using the 4th and 5th values of the unsorted list, or taking just one of the two middle values.",
        traps: [
          { spec: { type: "number", value: 32.7 }, feedback: "You used the 4th and 5th values of the list as written (33.0 and 32.4). Put the times in order first." },
          { spec: { type: "number", value: 33 }, feedback: "33.0 is only the 4th value. With an even number of values, the median is halfway between the two middle ones." },
        ],
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "With 8 values, is there one middle value or two?",
          "Put the times in order. The middle two are the 4th and 5th.",
          "Find the number exactly halfway between the 4th and 5th times.",
        ],
        strategy: "Sort first",
      },
      // ---------------------------------------------------------------- q08
      {
        kind: "short",
        id: "averages-spread-p3-q08",
        question:
          "The 5 players on a basketball team have a mean height of 172 cm. One player, who is 165 cm tall, is injured and replaced by a new player. The mean height of the team is now 175 cm.\n\nHow tall is the new player? Give your answer in cm.",
        answer: { type: "number", value: 180, display: "180 cm" },
        solution: [
          "Total height before = 5 × 172 = 860 cm.",
          "Total height after = 5 × 175 = 875 cm.",
          "The total went up by 875 − 860 = 15 cm, so the new player is 15 cm taller than the injured one.",
          "New player = 165 + 15 = 180 cm.",
        ],
        solutions: [
          {
            label: "Fair shares",
            steps: [
              "The mean rose by 3 cm for each of the 5 players, so the total rose by 5 × 3 = 15 cm.",
              "Only one person changed, so the new player is 15 cm taller than 165 cm: 180 cm.",
              "This is quicker once you see it: a change in the mean × the number of values = the change in the total.",
            ],
          },
        ],
        commonError: "Adding the 3 cm rise in the mean straight onto 165 cm. The mean rose by 3 cm *per player*, so the total rose by 15 cm.",
        traps: [
          { spec: { type: "number", value: 168 }, feedback: "The mean went up by 3 cm, but that is 3 cm for each of the 5 players. The total went up by 15 cm." },
          { spec: { type: "number", value: 175 }, feedback: "175 cm is the new mean, not the new player's height. Compare the total heights before and after." },
        ],
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "Means are awkward to change directly. What could you work out instead?",
          "Find the total height of the team before and after the swap.",
          "Total before = 5 × 172 = 860 cm; total after = 5 × 175 = 875 cm.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q09
      {
        kind: "written",
        id: "averages-spread-p3-q09",
        question:
          "Zara asked 8 classmates how many minutes they spent on their phones last Saturday:\n\n45, 60, 50, 55, 40, 65, 50, 395\n\nZara says, 'The mean is the best average to describe a typical pupil here, because it uses all of the data.'\n\nWork out the mean and the median, then explain whether Zara is right.",
        marks: 3,
        modelAnswer:
          "Mean = (45 + 60 + 50 + 55 + 40 + 65 + 50 + 395) ÷ 8 = 760 ÷ 8 = 95 minutes.\n\nIn order: 40, 45, 50, 50, 55, 60, 65, 395. The median is halfway between the 4th and 5th values: {{(50 + 55)/2 = 52.5}} minutes.\n\nZara is not right. 395 minutes is an outlier, far above everyone else. It drags the mean up to 95 minutes, which is more than 7 of the 8 pupils actually spent, so the mean is not typical. The median, 52.5 minutes, depends only on the middle values and is not affected by how big the outlier is, so it describes a typical pupil much better.",
        markScheme: [
          { point: "Mean = 760 ÷ 8 = 95 minutes", keywords: ["95", "760"] },
          { point: "Median = 52.5 minutes, found from the ordered data", keywords: ["52.5"] },
          {
            point: "Zara is wrong: the outlier 395 drags the mean above almost every value, so the median is more typical",
            keywords: ["outlier", "395", "median", "not typical", "drags", "pulled", "higher than"],
          },
        ],
        commonError: "Saying 'the mean uses all the data, so it is always best'. Using every value is exactly why one extreme value can distort it.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Work out both averages first. Which one sits among most of the data?",
          "For the median of 8 values, order them and go halfway between the 4th and 5th.",
          "How many of the 8 pupils actually spent 95 minutes or more on their phones?",
        ],
        strategy: "Consider extremes",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "averages-spread-p3-q10",
        question:
          "The town council planted 15 young trees along a park connector. The stem-and-leaf diagram shows their heights. Key: 4 | 7 means 4.7 m.\n\n| Stem | Leaves |\n|---|---|\n| 3 | 2 5 8 |\n| 4 | 0 1 4 4 4 9 |\n| 5 | 0 3 6 7 |\n| 6 | 1 2 |\n\nFind the median and the range of the heights, in metres. Give the median first.",
        answer: { type: "list", values: [4.4, 3], ordered: true, display: "Median 4.4 m, range 3.0 m" },
        solution: [
          "The key shows the leaves are tenths: 3 | 2 means 3.2 m.",
          "Count the leaves: 3 + 6 + 4 + 2 = 15, so the median is the {{(15+1)/2 = 8}}th value.",
          "Stem 3 holds the 1st to 3rd values. Counting along stem 4: 4.0 (4th), 4.1 (5th), 4.4 (6th), 4.4 (7th), 4.4 (8th). The median is 4.4 m.",
          "Range = largest − smallest = 6.2 − 3.2 = 3.0 m.",
        ],
        commonError: "Ignoring the key and reading 4 | 4 as 44 instead of 4.4.",
        traps: [
          { spec: { type: "list", values: [44, 30], ordered: true }, feedback: "Read the key: 4 | 7 means 4.7 m, so each leaf is a tenth of a metre." },
          { spec: { type: "list", values: [3, 4.4], ordered: true }, feedback: "Right numbers, wrong order: the question asks for the median first, then the range." },
        ],
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "Read the key first: what does one leaf stand for?",
          "Count the leaves. With 15 values, which position is the median?",
          "Stem 3 holds the first 3 values. Count on along stem 4 to reach the 8th.",
        ],
        strategy: "Read the key first",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "written",
        id: "averages-spread-p3-q11",
        question:
          "Siti's mum drives her to school. She can take Route A, along the expressway, or Route B, through the town centre. Siti timed each route on 7 mornings.\n\n| Route | Journey times (minutes) |\n|---|---|\n| A | 22, 25, 23, 24, 26, 23, 25 |\n| B | 15, 30, 18, 35, 17, 16, 37 |\n\nThey leave home 28 minutes before school starts. Compare the journey times for the two routes using an average and the range. Then recommend a route, giving a reason linked to the context.",
        marks: 4,
        modelAnswer:
          "Route A in order: 22, 23, 23, 24, 25, 25, 26. Median 24 minutes, range 26 − 22 = 4 minutes.\n\nRoute B in order: 15, 16, 17, 18, 30, 35, 37. Median 18 minutes, range 37 − 15 = 22 minutes.\n\nOn a typical morning Route B is quicker (median 18 minutes compared with 24 minutes). But Route A is far more consistent (range 4 minutes compared with 22 minutes). Interestingly, both means are 24 minutes: Route B's three very slow journeys pull its mean up.\n\nThey have 28 minutes. Route A got Siti there in time on all 7 mornings, but Route B took longer than 28 minutes on 3 of the 7 mornings. I recommend Route A: she needs a route she can rely on, not one that is usually quick but sometimes makes her late.",
        markScheme: [
          { point: "Compares an average for both routes in context, e.g. medians 24 and 18 (Route B usually quicker), or both means 24", keywords: ["24", "18", "median", "mean", "quicker", "faster"] },
          { point: "Compares ranges 4 and 22: Route A more consistent / Route B more variable", keywords: ["4", "22", "range", "consistent", "reliable", "variable", "spread"] },
          { point: "Uses the 28-minute limit: Route B would make her late on 3 of the 7 mornings, Route A never", keywords: ["late", "28", "3", "three", "never", "on time"] },
          { point: "Recommends Route A, with a reason based on reliability or consistency", keywords: ["route a", "recommend", "reliable", "consistent", "on time"] },
        ],
        commonError: "Choosing Route B just because its median is lower, without using the range or the 28-minute limit.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Find an average and the range for each route.",
          "Route B has some very long journeys. Which average describes it better?",
          "Now use the context: on how many mornings did each route take more than 28 minutes?",
        ],
        strategy: "Compare centre, then spread",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "written",
        id: "averages-spread-p3-q12",
        question:
          "The school newsletter claims: 'On average, our Year 8 pupils spend at least 3 hours a week on CCAs.' Wei Ling surveyed 41 Year 8 pupils.\n\n| Hours of CCA per week | Number of pupils |\n|---|---|\n| 0 | 3 |\n| 1 | 7 |\n| 2 | 12 |\n| 3 | 10 |\n| 4 | 6 |\n| 5 | 3 |\n\nFind the median, and use it to decide whether Wei Ling's data support the newsletter's claim. Explain your answer.",
        marks: 3,
        modelAnswer:
          "There are 41 pupils, so the median is the {{(41+1)/2 = 21}}st value. The running totals are 3, 10, 22, … so pupils 11 to 22 all do 2 hours. The 21st pupil does 2 hours, so the median is 2 hours.\n\nOnly 10 + 6 + 3 = 19 of the 41 pupils do 3 or more hours, which is less than half. (The mean, 100 ÷ 41 ≈ 2.4 hours, is also below 3.) So the data do **not** support the claim: a typical Year 8 pupil in this survey does about 2 hours of CCA a week.",
        markScheme: [
          { point: "Finds the median position (21st) using running totals", keywords: ["21st", "21", "running total", "cumulative", "22"] },
          { point: "Median = 2 hours", keywords: ["2 hours", "median is 2", "median = 2", "2"] },
          { point: "Concludes the claim is not supported, e.g. only 19 of 41 do 3 or more hours, or the median (or mean ≈ 2.4) is below 3", keywords: ["not", "19", "less than half", "below 3", "2.4", "false", "wrong"] },
        ],
        commonError: "Taking the middle of the hours column (2.5), or the median of the frequencies, instead of finding the 21st pupil.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "How many pupils are there? Which position is the middle one?",
          "Add a running-total column to see which row contains that position.",
          "Compare your median with the claim of 3 hours. How many pupils actually do 3 hours or more?",
        ],
        strategy: "Use running totals",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "short",
        id: "averages-spread-p3-q13",
        question:
          "The stem-and-leaf diagram shows the scores of 14 pupils in a science quiz marked out of 60. Key: 2 | 6 means 26 marks.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 5 8 |\n| 2 | 0 4 6 6 9 |\n| 3 | 1 3 7 |\n| 4 | 0 2 8 |\n| 5 | 4 |\n\nTwo pupils who were absent sit the quiz later and score 12 and 45. Find the median and the range of all 16 scores. Give the median first.",
        answer: { type: "list", values: [30, 42], ordered: true, display: "Median 30, range 42" },
        solution: [
          "Slot the new scores in: 12 goes before 15, and 45 goes between 42 and 48.",
          "All 16 scores in order: 12, 15, 18, 20, 24, 26, 26, 29, 31, 33, 37, 40, 42, 45, 48, 54.",
          "With 16 values the median is halfway between the 8th and 9th: {{(29 + 31)/2 = 30}}.",
          "Range = 54 − 12 = 42 marks.",
          "Notice the median didn't change (it was 30 before too): one new score went below it and one above it. The range grew, because 12 is a new smallest value.",
        ],
        commonError: "Forgetting that the new score 12 becomes the smallest value, so the range must be recalculated.",
        traps: [
          { spec: { type: "list", values: [30, 39], ordered: true }, feedback: "39 is the old range (54 − 15). The new score 12 is now the smallest value." },
          { spec: { type: "list", values: [29, 42], ordered: true }, feedback: "29 is only the 8th value. With 16 values, the median is halfway between the 8th and 9th values." },
        ],
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "Where do 12 and 45 fit into the ordered list?",
          "How many scores are there now? Which two positions give the median?",
          "Use the row totals to find the 8th and 9th scores, then check the new smallest and largest values.",
        ],
        strategy: "Use row totals to skip ahead",
      },
      // ---------------------------------------------------------------- q14
      {
        kind: "short",
        id: "averages-spread-p3-q14",
        question:
          "A cricketer's mean score over her first 9 innings was 32 runs. After her 10th innings, her mean rose to 35 runs. After her 11th innings, her mean fell to 33 runs.\n\nHow many runs did she score in her 10th innings and in her 11th innings? Give the 10th innings first.",
        answer: { type: "list", values: [62, 13], ordered: true, display: "62 runs, then 13 runs" },
        solution: [
          "Turn each mean into a total.",
          "After 9 innings: 9 × 32 = 288 runs. After 10 innings: 10 × 35 = 350 runs. After 11 innings: 11 × 33 = 363 runs.",
          "10th innings = 350 − 288 = 62 runs.",
          "11th innings = 363 − 350 = 13 runs.",
          "Sense check: a big score (62) pulls the mean up; a small score (13) pulls it down.",
        ],
        commonError: "Treating the change in the mean as the score, e.g. thinking the 10th innings was 35 + 3. The change in the mean is shared over all the innings.",
        traps: [
          { spec: { type: "list", values: [38, 31], ordered: true }, feedback: "A change in the mean is shared out over all the innings. Work with totals: the total after 10 innings is 10 × 35." },
          { spec: { type: "list", values: [35, 33], ordered: true }, feedback: "Those are her means after each innings, not the runs she scored. Turn each mean into a total." },
        ],
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "Change each mean into a total number of runs.",
          "Total after 9 innings = 9 × 32. Total after 10 innings = 10 × 35.",
          "Each innings' score is the difference between two totals that are next to each other.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "averages-spread-p3-q15",
        question:
          "A museum on Sentosa recorded how long 50 visitors spent at one exhibit.\n\n| Time, t (minutes) | Number of visitors |\n|---|---|\n| {{0 <= t < 10}} | 8 |\n| {{10 <= t < 20}} | 17 |\n| {{20 <= t < 30}} | 15 |\n| {{30 <= t < 40}} | 10 |\n\nWork out an estimate of the mean time spent at the exhibit, in minutes.",
        answer: { type: "number", value: 20.4, display: "20.4 minutes" },
        solution: [
          "Use the midpoint of each class to stand for every visitor in it: 5, 15, 25 and 35 minutes.",
          "Midpoint × frequency: 5 × 8 = 40, 15 × 17 = 255, 25 × 15 = 375, 35 × 10 = 350.",
          "Total = 40 + 255 + 375 + 350 = 1020.",
          "Estimated mean = 1020 ÷ 50 = 20.4 minutes.",
          "It is only an estimate, because we don't know the exact time of any visitor.",
        ],
        commonError: "Finding the mean of the four midpoints (20), which ignores how many visitors are in each class.",
        traps: [
          { spec: { type: "number", value: 20 }, feedback: "20 is the mean of the four midpoints. That treats every class as if it held the same number of visitors. Multiply each midpoint by its frequency." },
          { spec: { type: "number", value: 25.4 }, feedback: "You used the top of each class (10, 20, 30, 40). Use the midpoints (5, 15, 25, 35) instead." },
        ],
        difficulty: "core",
        guideRef: "grouped-data",
        hints: [
          "You don't know any exact times. What single value could stand for everyone in the {{10 <= t < 20}} class?",
          "Use the midpoints 5, 15, 25 and 35 as the values.",
          "Find the total of midpoint × frequency, then divide by the number of visitors.",
        ],
        strategy: "Add a midpoint column",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "short",
        id: "averages-spread-p3-q16",
        question:
          "Nine flats in an HDB block were sold this year. The prices, in thousands of dollars, were:\n\n480, 510, 495, 520, 505, 490, 515, 500, 1250\n\n(The $1.25 million flat is a large maisonette on the top floors.)\n\nAn estate agent wants prices in the block to sound as high as possible. A buyer wants a fair idea of what a typical flat sold for. Each of them quotes an average. Work out the value each of them would quote, in thousands of dollars. Give the agent's value first.",
        answer: { type: "list", values: [585, 505], ordered: true, display: "Agent: mean $585 000; buyer: median $505 000" },
        solution: [
          "Mean = (480 + 510 + 495 + 520 + 505 + 490 + 515 + 500 + 1250) ÷ 9 = 5265 ÷ 9 = 585.",
          "In order: 480, 490, 495, 500, 505, 510, 515, 520, 1250. The median is the 5th value: 505.",
          "There is no mode: every price is different.",
          "The agent quotes the mean, $585 000, because the outlier (the maisonette) drags it up. Eight of the nine flats sold for less than that!",
          "The buyer should use the median, $505 000, which the outlier hardly affects.",
        ],
        commonError: "Thinking the mean is always the 'fair' average. With an outlier, the median describes a typical value better.",
        traps: [
          { spec: { type: "list", values: [505, 585], ordered: true }, feedback: "Right numbers, wrong way round. The agent wants the higher figure: the mean, pulled up by the 1250 outlier." },
        ],
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Work out the mean and the median. Is there a mode?",
          "Which value is an outlier, and which average does it pull up?",
          "The agent wants the bigger average; the buyer wants the one that isn't fooled by the outlier.",
        ],
        strategy: "Consider extremes",
      },
      // ---------------------------------------------------------------- q17
      {
        kind: "short",
        id: "averages-spread-p3-q17",
        question:
          "The mean age of the four people in Marcus's family is 21 years.\n\nFive years ago, Marcus's youngest sister had not yet been born, and the mean age of the other three family members was 22 years.\n\nHow old is Marcus's youngest sister now?",
        answer: { type: "number", value: 3, display: "3 years old" },
        solution: [
          "Total of the four ages now = 4 × 21 = 84 years.",
          "Five years ago, the three older members' ages totalled 3 × 22 = 66 years.",
          "Each of those three people is now 5 years older, so their total now is 66 + 3 × 5 = 81 years.",
          "Youngest sister = 84 − 81 = 3 years old.",
          "Check: she is younger than 5, so she really hadn't been born five years ago ✓. It also explains the surprise that the mean *went down* over time: a new baby joined the family.",
        ],
        commonError: "Forgetting that the three older family members have each aged 5 years since then.",
        traps: [
          { spec: { type: "number", value: 18 }, feedback: "84 − 66 forgets that five years have passed. Each of the three older members is 5 years older now: add 3 × 5 = 15 to their old total." },
          { spec: { type: "number", value: -2 }, feedback: "An age can't be negative! Only three people were alive five years ago, so only three people have aged 5 years, not four." },
        ],
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "Turn both means into totals. What is the total age of the family now?",
          "Five years ago only three people were alive. What was their total age then?",
          "How much has the total age of those three people grown in five years?",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q18
      {
        kind: "short",
        id: "averages-spread-p3-q18",
        question:
          "A school floorball team has played 24 matches this season.\n\n| Goals scored | Number of matches |\n|---|---|\n| 0 | 5 |\n| 1 | 9 |\n| 2 | 6 |\n| 3 | 3 |\n| 4 | 1 |\n\nAt the moment the median is 1 goal. Suppose the team scores exactly 4 goals in every one of its next matches.\n\n(a) What is the smallest number of extra matches needed to make the median 2 goals?\n\n(b) After how many extra matches would the mean be exactly 2 goals?\n\nGive your answers in order: (a), then (b).",
        answer: { type: "list", values: [5, 7], ordered: true, display: "(a) 5 matches, (b) 7 matches" },
        solution: [
          "(a) 5 + 9 = 14 matches had 0 or 1 goals, and positions 15 to 20 are the 2-goal matches. The median is exactly 2 once the median position {{(n+1)/2}} reaches 15, so that no 1-goal value is used.",
          "With 4 extra matches there are 28 values: the median is halfway between the 14th (1) and 15th (2), which is 1.5. Not enough.",
          "With 5 extra matches there are 29 values: the median is the {{(29+1)/2 = 15}}th value, which is 2. So 5 extra matches.",
          "(b) Total goals so far = 0 × 5 + 1 × 9 + 2 × 6 + 3 × 3 + 4 × 1 = 34. For a mean of 2 after k extra matches: (34 + 4k) ÷ (24 + k) = 2.",
          "So 34 + 4k = 48 + 2k, which gives 2k = 14 and k = 7. Check: (34 + 28) ÷ 31 = 62 ÷ 31 = 2 ✓",
          "The median, which only cares about position, moves sooner than the mean, which has to be pulled up by the size of the new values.",
        ],
        solutions: [
          {
            label: "Balance method for (b)",
            steps: [
              "For a mean of 2 over the first 24 matches, the team would need 24 × 2 = 48 goals. It has 34, so it is 14 goals short.",
              "Each new 4-goal match is 2 goals above the target mean, so it makes up 2 of the shortfall.",
              "14 ÷ 2 = 7 extra matches. No algebra needed!",
            ],
          },
        ],
        commonError: "In (b), dividing by 24 instead of 24 + k: the number of matches grows as well as the number of goals.",
        traps: [
          { spec: { type: "list", values: [6, 7], ordered: true }, feedback: "Check (a) again. With 5 extra matches there are 29 values, an odd number, so the median is just the 15th value. What is it?" },
          { spec: { type: "list", values: [5, 3.5], ordered: true }, feedback: "In (b) the number of matches goes up too: divide the total goals by 24 + k, not by 24." },
        ],
        difficulty: "challenge",
        guideRef: "frequency-tables",
        hints: [
          "How many matches so far had 0 or 1 goals? Those are the values at the bottom of the ordered list.",
          "With n matches, the median is the {{(n+1)/2}}th value. It is exactly 2 only when that position is at least 15. Be careful with odd and even n: a position of 14.5 means halfway between the 14th and 15th.",
          "For (b): after k extra matches the total goals are 34 + 4k and the number of matches is 24 + k.",
          "Or think 'balance': the team is 14 goals short of a mean of 2, and each 4-goal match makes up 2 of those goals.",
        ],
        strategy: "Try small cases",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "written",
        id: "averages-spread-p3-q19",
        question:
          "Hana notices that the list 3, 4, 5, 6, 7 has a mean of 5 and a median of 5.\n\n(a) Is it always true that a list of consecutive whole numbers has its mean equal to its median? Explain why, making sure your argument works for lists of any length, odd or even.\n\n(b) Does the same thing happen for every list that goes up in equal steps, such as 5, 8, 11, 14? What about the list 1, 2, 4, 8, 16?",
        marks: 4,
        modelAnswer:
          "(a) Yes, it is always true. Pair the smallest number with the largest, the second smallest with the second largest, and so on. Because the numbers go up in equal steps, every pair has the same total: first + last. (In 3, 4, 5, 6, 7: 3 + 7 = 4 + 6 = 10, and the middle 5 is half of 10.) So the mean is the mean of one pair: (first + last) ÷ 2.\n\nThe median sits in the middle of the list. By the same symmetry, the middle number (odd length) or the halfway point between the two middle numbers (even length) is also (first + last) ÷ 2. For example, 3, 4, 5, 6 has mean 18 ÷ 4 = 4.5 and median {{(4 + 5)/2 = 4.5}}.\n\n(b) Yes for 5, 8, 11, 14: equal steps give exactly the same symmetry. Mean = 38 ÷ 4 = 9.5 and median = {{(8 + 11)/2 = 9.5}}. No for 1, 2, 4, 8, 16: the gaps grow, so the list is not symmetric. The median is 4 but the mean is 31 ÷ 5 = 6.2, because the large value 16 pulls the mean up.",
        markScheme: [
          { point: "States it is always true for consecutive whole numbers", keywords: ["always", "yes"] },
          { point: "Pairing or symmetry argument: pairs from the ends have equal totals, so the mean is (first + last) ÷ 2", keywords: ["pair", "symmetric", "symmetry", "first + last", "same total", "balance"] },
          { point: "Shows the median is also (first + last) ÷ 2, including for an even-length list (e.g. 3, 4, 5, 6: both 4.5)", keywords: ["middle", "even", "4.5", "halfway", "two middle"] },
          { point: "Part (b): equal steps also work (both 9.5); 1, 2, 4, 8, 16 does not (mean 6.2, median 4)", keywords: ["9.5", "6.2", "not symmetric", "does not", "doesn't"] },
        ],
        commonError: "Checking one or two examples and calling that a proof. Examples can disprove a claim, but proving 'always' needs a reason that works for every list.",
        difficulty: "challenge",
        guideRef: "mean-median-mode-range",
        hints: [
          "Try a few lists of consecutive numbers: some with an odd number of terms and some with an even number.",
          "In 3, 4, 5, 6, 7, add the first and last numbers, then the second and second-last. What do you notice?",
          "If every pair from the ends has the same total, what must the mean be? And where does the middle of the list sit?",
        ],
        strategy: "Use symmetry",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "averages-spread-p3-q20",
        question:
          "Siti and Jun each recorded how many kilometres they cycled on five Saturdays.\n\n| Cyclist | Sat 1 | Sat 2 | Sat 3 | Sat 4 | Sat 5 |\n|---|---|---|---|---|---|\n| Siti | 6 | 9 | 7 | 10 | 8 |\n| Jun | 9 | 5 | 10 | ? | ? |\n\nJun forgot to write down his last two distances. He remembers that his mean distance was the same as Siti's, but his range was exactly twice Siti's range.\n\nFind Jun's two missing distances, in km.",
        answer: { type: "list", values: [4, 12], display: "4 km and 12 km" },
        solution: [
          "Siti: total 40 km, so her mean is 8 km. Her range is 10 − 6 = 4 km.",
          "Jun's mean is 8, so his five distances total 40 km. The two missing distances add to 40 − 24 = 16 km.",
          "Jun's range must be 2 × 4 = 8 km.",
          "If both missing values were between 5 and 10, his range would be 10 − 5 = 5. Too small, so at least one missing value lies outside 5 to 10.",
          "They add to 16, so if one is below 5 the other is above 11, and the range is (larger − smaller) = 8. Two numbers that add to 16 and differ by 8: 4 and 12.",
          "Check the other cases: one value above 10 with the other at least 5 would need (big − 5) = 8, so big = 13 and the other = 3, which is below 5. Contradiction. So the only answer is 4 km and 12 km.",
          "In context: the same average distance, but Jun's rides were much less consistent.",
        ],
        commonError: "Choosing two values that give the right mean (such as 8 and 8) without checking the range.",
        traps: [
          { spec: { type: "list", values: [8, 8] }, feedback: "8 and 8 give the right mean, but then Jun's range is 10 − 5 = 5, not 8." },
          { spec: { type: "list", values: [3, 13] }, feedback: "These add to 16, but then Jun's smallest value is 3 and his largest is 13: a range of 10, not 8." },
        ],
        difficulty: "challenge",
        guideRef: "comparing-distributions",
        hints: [
          "What is Siti's mean and range? So what must Jun's total be?",
          "Jun's two missing values must add to 16. Try putting both between 5 and 10: what range do you get?",
          "So one value must be below 5 or above 10. Split into cases: which values are Jun's smallest and largest?",
        ],
        strategy: "Split into cases",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "averages-spread-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      // ---------------------------------------------------------------- q01
      {
        kind: "short",
        id: "averages-spread-p4-q01",
        question:
          "A fruit stall in Geylang recorded how many durians it sold each day for 8 days:\n\n14, 9, 12, 9, 17, 11, 9, 15\n\nWrite down the mode and the range. Give the mode first.",
        answer: { type: "list", values: [9, 8], ordered: true, display: "Mode 9, range 8" },
        solution: [
          "9 appears three times, more than any other value, so the mode is 9 durians.",
          "Largest = 17 and smallest = 9, so the range = 17 − 9 = 8 durians.",
        ],
        commonError: "Giving the mode as 3 (how many times 9 appears) instead of the value 9 itself.",
        traps: [
          { spec: { type: "list", values: [8, 9], ordered: true }, feedback: "Right numbers, wrong order: the mode (9) comes first, then the range (8)." },
          { spec: { type: "list", values: [3, 8], ordered: true }, feedback: "3 is how many times the mode appears. The mode is the value itself: 9 durians." },
        ],
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Which number of durians appears most often?", "Range = largest − smallest."],
      },
      // ---------------------------------------------------------------- q02
      {
        kind: "short",
        id: "averages-spread-p4-q02",
        question:
          "At athletics training, Priya ran 400 m five times, with a rest after each run. Her times, in seconds, were:\n\n62.4, 61.8, 63.0, 62.1, 61.7\n\nWork out her mean time for the 400 m, in seconds.",
        answer: { type: "number", value: 62.2, display: "62.2 s" },
        solution: [
          "Total = 62.4 + 61.8 + 63.0 + 62.1 + 61.7 = 311.0 seconds.",
          "Mean = 311.0 ÷ 5 = 62.2 seconds.",
        ],
        solutions: [
          {
            label: "Make it simpler",
            steps: [
              "Every time is 60-something, so just look at the amounts over 60: 2.4, 1.8, 3.0, 2.1, 1.7.",
              "These add to 11.0, and 11.0 ÷ 5 = 2.2.",
              "Add the 60 back: mean = 62.2 seconds. Smaller numbers mean fewer slips.",
            ],
          },
        ],
        commonError: "Dividing by 4 instead of 5, or slipping on a decimal when adding.",
        traps: [
          { spec: { type: "number", value: 77.75 }, feedback: "That is 311 ÷ 4. Priya ran 5 times, so divide by 5." },
        ],
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Add the five times, then divide by the number of runs.", "Shortcut: find the mean of the amounts over 60 seconds, then add 60 back."],
        strategy: "Make it simpler",
      },
      // ---------------------------------------------------------------- q03
      {
        kind: "short",
        id: "averages-spread-p4-q03",
        question:
          "The stem-and-leaf diagram shows the scores of 11 pupils in a general-knowledge quiz. Key: 2 | 3 means 23 points.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 4 8 8 |\n| 2 | 0 3 5 7 |\n| 3 | 1 5 9 |\n| 4 | 2 |\n\nFind the median score.",
        answer: { type: "number", value: 25 },
        solution: [
          "Count the leaves: 3 + 4 + 3 + 1 = 11 scores.",
          "The median is the {{(11+1)/2 = 6}}th score.",
          "Stem 1 holds the 1st to 3rd scores. On stem 2: 20 (4th), 23 (5th), 25 (6th).",
          "The median score is 25 points.",
        ],
        commonError: "Writing the leaf (5) instead of the full value (25).",
        traps: [
          { spec: { type: "number", value: 18 }, feedback: "18 is the mode (it appears twice). The median is the middle score: the 6th of 11." },
          { spec: { type: "number", value: 5 }, feedback: "5 is just the leaf. Put it with its stem: 2 | 5 means 25 points." },
        ],
        difficulty: "warmup",
        guideRef: "stem-and-leaf-averages",
        hints: ["How many leaves are there? Which position is the middle one?", "The diagram is already in order. Count along from the smallest score."],
        strategy: "Count, don't copy",
      },
      // ---------------------------------------------------------------- q04
      {
        kind: "short",
        id: "averages-spread-p4-q04",
        question:
          "Marcus did seven practice tests, each marked out of 30. His scores were:\n\n14, 12, 26, 13, 19, 12, 16\n\nHe wants to tell his parents the average that makes his scores look as good as possible. Which average should he choose? Give its value.",
        answer: { type: "number", value: 16, display: "16 (the mean)" },
        solution: [
          "In order: 12, 12, 13, 14, 16, 19, 26.",
          "Mode = 12. Median = 4th value = 14. Mean = 112 ÷ 7 = 16.",
          "The highest is the mean, 16, so that is the one Marcus would choose.",
          "But is it fair? The single high score of 26 pulls the mean up: 4 of his 7 scores are below 16 and only 2 are above it. The median, 14, is a more honest 'typical' score.",
        ],
        commonError: "Assuming 'average' always means the mean. There are three averages, and they can give quite different values.",
        traps: [
          { spec: { type: "number", value: 14 }, feedback: "14 is the median. Work out all three averages: is any of them higher?" },
          { spec: { type: "number", value: 12 }, feedback: "12 is the mode, the lowest of the three averages here. Marcus wants the highest." },
        ],
        difficulty: "warmup",
        guideRef: "choosing-an-average",
        hints: ["Work out the mean, the median and the mode, then compare them."],
        strategy: "Choose the right average",
      },
      // ---------------------------------------------------------------- q05
      {
        kind: "short",
        id: "averages-spread-p4-q05",
        question:
          "Mei practised the piano on six days last week. Her mean practice time was 35 minutes a day. On five of the days she practised for 30, 45, 20, 40 and 35 minutes.\n\nHow long did she practise on the sixth day? Give your answer in minutes.",
        answer: { type: "number", value: 40, display: "40 minutes" },
        solution: [
          "Total for all six days = 6 × 35 = 210 minutes.",
          "Total for the five known days = 30 + 45 + 20 + 40 + 35 = 170 minutes.",
          "Sixth day = 210 − 170 = 40 minutes.",
        ],
        commonError: "Giving the mean (35) as the missing value.",
        traps: [
          { spec: { type: "number", value: 35 }, feedback: "35 minutes is the mean, not the sixth day. Find the total for all six days first: 6 × 35." },
          { spec: { type: "number", value: 210 }, feedback: "210 minutes is the total for all six days. Now subtract the five days you know." },
        ],
        difficulty: "warmup",
        guideRef: "working-backwards",
        hints: ["What must the six practice times add up to?", "Total = 6 × 35. Then subtract the five times you know."],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q06
      {
        kind: "short",
        id: "averages-spread-p4-q06",
        question:
          "The bar chart shows how many days each of the 30 pupils in a class was absent last term.\n\nFind the median and the mean number of days absent. Give the median first.",
        diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the number of days absent last term for 30 pupils. 0 days: 6 pupils. 1 day: 11 pupils. 2 days: 7 pupils. 3 days: 4 pupils. 4 days: 2 pupils."><rect width="400" height="260" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="70" y1="190" x2="370" y2="190"/><line x1="70" y1="175" x2="370" y2="175"/><line x1="70" y1="160" x2="370" y2="160"/><line x1="70" y1="145" x2="370" y2="145"/><line x1="70" y1="130" x2="370" y2="130"/><line x1="70" y1="115" x2="370" y2="115"/><line x1="70" y1="100" x2="370" y2="100"/><line x1="70" y1="85" x2="370" y2="85"/><line x1="70" y1="70" x2="370" y2="70"/><line x1="70" y1="55" x2="370" y2="55"/><line x1="70" y1="40" x2="370" y2="40"/><line x1="70" y1="25" x2="370" y2="25"/></g><g fill="#c7d2fe" stroke="#334155" stroke-width="1.2"><rect x="85" y="115" width="40" height="90"/><rect x="140" y="40" width="40" height="165"/><rect x="195" y="100" width="40" height="105"/><rect x="250" y="145" width="40" height="60"/><rect x="305" y="175" width="40" height="30"/></g><g stroke="#1f2937" stroke-width="1.5"><line x1="70" y1="20" x2="70" y2="205"/><line x1="70" y1="205" x2="370" y2="205"/></g><g stroke="#1f2937"><line x1="65" y1="205" x2="70" y2="205"/><line x1="65" y1="175" x2="70" y2="175"/><line x1="65" y1="145" x2="70" y2="145"/><line x1="65" y1="115" x2="70" y2="115"/><line x1="65" y1="85" x2="70" y2="85"/><line x1="65" y1="55" x2="70" y2="55"/><line x1="65" y1="25" x2="70" y2="25"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end"><text x="61" y="209">0</text><text x="61" y="179">2</text><text x="61" y="149">4</text><text x="61" y="119">6</text><text x="61" y="89">8</text><text x="61" y="59">10</text><text x="61" y="29">12</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="105" y="222">0</text><text x="160" y="222">1</text><text x="215" y="222">2</text><text x="270" y="222">3</text><text x="325" y="222">4</text><text x="220" y="246" font-size="13">Number of days absent</text></g><text x="22" y="112" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" transform="rotate(-90 22 112)">Number of pupils</text></svg>`,
        answer: { type: "list", values: [1, 1.5], ordered: true, display: "Median 1 day, mean 1.5 days" },
        solution: [
          "Read the bars: 0 days: 6 pupils, 1 day: 11, 2 days: 7, 3 days: 4, 4 days: 2. Check: 6 + 11 + 7 + 4 + 2 = 30 ✓",
          "Median: with 30 pupils it is halfway between the 15th and 16th. Running totals: 6, then 17, so pupils 7 to 17 were absent for 1 day. Median = 1 day.",
          "Total days absent = 0 × 6 + 1 × 11 + 2 × 7 + 3 × 4 + 4 × 2 = 0 + 11 + 14 + 12 + 8 = 45.",
          "Mean = 45 ÷ 30 = 1.5 days.",
        ],
        commonError: "Taking the median as the middle of the axis (2 days) instead of the middle pupil.",
        traps: [
          { spec: { type: "list", values: [2, 1.5], ordered: true }, feedback: "2 is the middle of the 'days absent' axis. The median is the middle *pupil*: halfway between the 15th and 16th of the 30." },
          { spec: { type: "list", values: [1, 9], ordered: true }, feedback: "45 ÷ 5 divides by the number of bars. Divide the 45 days by the 30 pupils." },
        ],
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "Turn the bar chart into a frequency table first. Do the frequencies add up to 30?",
          "Median: which pupils are the 15th and 16th? Use running totals.",
          "Mean: total days absent (days × pupils for each bar, added up) ÷ 30.",
        ],
        strategy: "Make a frequency table",
      },
      // ---------------------------------------------------------------- q07
      {
        kind: "short",
        id: "averages-spread-p4-q07",
        question:
          "Here are five numbers:\n\n4, 9, 7, 12, n\n\nThe range of the five numbers is 10, and n is the largest of them.\n\n(a) Find n.\n\n(b) Work out the mean of the five numbers.\n\nGive your answers in order: n, then the mean.",
        answer: { type: "list", values: [14, 9.2], ordered: true, display: "n = 14, mean = 9.2" },
        solution: [
          "(a) The smallest number is 4 and the largest is n. Range = n − 4 = 10, so n = 14.",
          "(b) Total = 4 + 9 + 7 + 12 + 14 = 46.",
          "Mean = 46 ÷ 5 = 9.2.",
        ],
        commonError: "Adding the range to the largest known number (12 + 10 = 22). The range is measured from the smallest value.",
        traps: [
          { spec: { type: "list", values: [22, 10.8], ordered: true }, feedback: "The range is largest − smallest. The smallest number is 4, so n − 4 = 10." },
          { spec: { type: "list", values: [14, 8], ordered: true }, feedback: "n = 14 is right, but 8 is the mean of only the four given numbers. Include n: there are five numbers." },
        ],
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Which of the five numbers is the smallest?",
          "If n is the largest, the range is n − 4. What must n be?",
          "Now add all five numbers and divide by 5.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q08
      {
        kind: "written",
        id: "averages-spread-p4-q08",
        question:
          "Ravi surveyed 5 families in his HDB block. They have 2, 3, 1, 4 and 2 children. He works out that the mean is 2.4 children per family, then says:\n\n> 'That can't be right. No family can have 0.4 of a child, so I must have made a mistake.'\n\nIs Ravi right? Explain your answer.",
        marks: 2,
        modelAnswer:
          "No, Ravi is not right: his calculation is correct. The total is 2 + 3 + 1 + 4 + 2 = 12 children, and 12 ÷ 5 = 2.4.\n\nThe mean is the number each family would have if the 12 children were shared out equally among the 5 families. It is a summary of the whole data set, not a description of one family, so it does not have to be a value that actually occurs, and it can be a decimal even when every data value is a whole number. If Ravi wants a typical whole number of children, he could quote the median or the mode (both 2).",
        markScheme: [
          { point: "States that Ravi is wrong: the mean of 2.4 is correct (12 ÷ 5)", keywords: ["not right", "wrong", "correct", "12", "2.4", "no"] },
          {
            point: "Explains that the mean is a fair-share value, so it need not be one of the data values and can be a decimal",
            keywords: ["shared", "equally", "fair share", "decimal", "does not have to", "doesn't have to", "need not", "not a data value"],
          },
        ],
        commonError: "Agreeing with Ravi and rounding the mean to 2 because children come in whole numbers.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Check his calculation first: total number of children ÷ number of families.",
          "What does the mean represent? Think about sharing the children out equally.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q09
      {
        kind: "short",
        id: "averages-spread-p4-q09",
        question:
          "The stem-and-leaf diagram shows the times, in minutes, that 16 pupils took to complete a cross-country course. Key: 2 | 3 means 23 minutes.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 8 9 |\n| 2 | 1 3 3 3 6 8 |\n| 3 | 0 2 4 7 |\n| 4 | 1 5 6 |\n| 5 | 2 |\n\nFind (a) the median, (b) the mode and (c) the range of the times. Give your answers in the order (a), (b), (c).",
        answer: { type: "list", values: [29, 23, 34], ordered: true, display: "Median 29, mode 23, range 34 (minutes)" },
        solution: [
          "Count the leaves: 2 + 6 + 4 + 3 + 1 = 16 pupils.",
          "(a) The median is halfway between the 8th and 9th values. Stem 1 holds 2 values, and stem 2 holds the 3rd to 8th, so the 8th is the last leaf on stem 2: 28. The 9th is the first leaf on stem 3: 30. Median = {{(28 + 30)/2 = 29}} minutes.",
          "(b) The leaf 3 appears three times on stem 2, so the mode is 23 minutes.",
          "(c) Range = 52 − 18 = 34 minutes.",
        ],
        commonError: "Taking only the 8th value as the median. With an even number of values, use the two middle values.",
        traps: [
          { spec: { type: "list", values: [28, 23, 34], ordered: true }, feedback: "With 16 values, the median is halfway between the 8th and 9th values (28 and 30), not just the 8th." },
          { spec: { type: "list", values: [29, 3, 34], ordered: true }, feedback: "The mode is a value, not a leaf. Three leaves of 3 on stem 2 mean 23 minutes, three times." },
        ],
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "Count the leaves first. How many pupils are there?",
          "With 16 values, the median is halfway between the 8th and 9th. Use the row totals to find them.",
          "Mode: the leaf repeated most on the same stem. Range: last value − first value.",
        ],
        strategy: "Use row totals to skip ahead",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "averages-spread-p4-q10",
        question:
          "Seven friends picked rambutans at a farm. The mean number they picked was 12. One friend left early and took her rambutans with her. The mean number for the 6 friends who stayed was 11.\n\nHow many rambutans did the friend who left early pick?",
        answer: { type: "number", value: 18 },
        solution: [
          "Total for all 7 friends = 7 × 12 = 84 rambutans.",
          "Total for the 6 who stayed = 6 × 11 = 66 rambutans.",
          "The friend who left picked 84 − 66 = 18 rambutans.",
        ],
        solutions: [
          {
            label: "Balance",
            steps: [
              "When she left, each of the other 6 friends' 'fair share' fell by 1 rambutan: 6 rambutans in all.",
              "So she must have picked 6 more than the old mean: 12 + 6 = 18.",
            ],
          },
        ],
        commonError: "Answering 1, the drop in the mean. The drop in the mean is not the number she picked.",
        traps: [
          { spec: { type: "number", value: 1 }, feedback: "The mean dropped by 1, but that isn't how many she picked. Compare the totals: 7 × 12 and 6 × 11." },
          { spec: { type: "number", value: 66 }, feedback: "66 is the total picked by the 6 friends who stayed. Subtract it from the total for all 7." },
        ],
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "Work with totals rather than means.",
          "Total for 7 friends = 7 × 12. Total for the 6 who stayed = 6 × 11.",
          "The difference between the two totals is what she took away.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "written",
        id: "averages-spread-p4-q11",
        question:
          "Two Year 8 classes did the 2.4 km run in their fitness test. The table summarises their times.\n\n| Class | Number of pupils | Median time (minutes) | Range (minutes) |\n|---|---|---|---|\n| 8R | 30 | 14.2 | 7.5 |\n| 8T | 32 | 12.9 | 3.6 |\n\nHana is in 8R. She says, 'Our class is fitter, because the fastest runner in the whole year group is in 8R.'\n\n(a) Compare the times of the two classes.\n\n(b) Is Hana's argument convincing? Explain your answer.",
        marks: 4,
        modelAnswer:
          "(a) On average, 8T ran faster: their median time was 12.9 minutes compared with 14.2 minutes for 8R. (In a race a lower time is better.) 8T's times were also more consistent: their range was 3.6 minutes compared with 7.5 minutes for 8R, so 8R's times were much more spread out.\n\n(b) No. The fastest runner tells you about just one pupil, not the whole class. 8R's large range shows its times were very spread out: its slowest runner took 7.5 minutes longer than its fastest. A typical pupil in 8T ran faster (lower median), so the data suggest that 8T is fitter overall.",
        markScheme: [
          { point: "Compares medians in context: 8T faster on average (12.9 vs 14.2 minutes; a lower time is better)", keywords: ["12.9", "14.2", "median", "faster", "quicker", "lower", "on average"] },
          { point: "Compares ranges in context: 8T more consistent (3.6 vs 7.5 minutes) / 8R more spread out", keywords: ["3.6", "7.5", "range", "consistent", "spread", "varied", "variable"] },
          { point: "Hana is not convincing: the fastest runner describes one pupil, not the class", keywords: ["one pupil", "one person", "one runner", "only one", "not convincing", "single", "no"] },
          { point: "Uses the median and/or range to support the conclusion (8R's large range means slow runners too; a typical 8T pupil is faster)", keywords: ["typical", "whole class", "slow", "large range", "overall", "most"] },
        ],
        commonError: "Saying 8R did better 'because its median is higher'. In a race, a higher time is slower.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Make two comparisons: one about an average and one about the spread.",
          "Careful: in a race, is a lower time better or worse?",
          "Hana's evidence is about one runner. Does it tell you about a typical pupil in her class?",
        ],
        strategy: "Compare centre, then spread",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "short",
        id: "averages-spread-p4-q12",
        question:
          "The table shows on how many days last week each of 30 pupils bought lunch from the school canteen.\n\n| Number of days | Number of pupils |\n|---|---|\n| 0 | 2 |\n| 1 | 3 |\n| 2 | 6 |\n| 3 | 8 |\n| 4 | 7 |\n| 5 | 4 |\n\nFind the mode, the median and the mean number of days. Give your answers in that order.",
        answer: { type: "list", values: [3, 3, 2.9], ordered: true, display: "Mode 3, median 3, mean 2.9 (days)" },
        solution: [
          "Mode: the highest frequency is 8, for 3 days. Mode = 3 days.",
          "Median: halfway between the 15th and 16th pupils. Running totals: 2, 5, 11, 19, … so pupils 12 to 19 bought lunch on 3 days. Median = 3 days.",
          "Total days = 0 × 2 + 1 × 3 + 2 × 6 + 3 × 8 + 4 × 7 + 5 × 4 = 0 + 3 + 12 + 24 + 28 + 20 = 87.",
          "Mean = 87 ÷ 30 = 2.9 days.",
        ],
        commonError: "Giving the highest frequency (8) as the mode instead of its value (3 days).",
        traps: [
          { spec: { type: "list", values: [8, 3, 2.9], ordered: true }, feedback: "8 is the *frequency* of the most common value. The mode is the value itself: 3 days." },
          { spec: { type: "list", values: [3, 3, 14.5], ordered: true }, feedback: "87 ÷ 6 divides by the number of rows. Divide the 87 days by the 30 pupils." },
        ],
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "The mode is the value with the highest frequency.",
          "For the median, use running totals to find the 15th and 16th pupils.",
          "For the mean, add a 'days × pupils' column, total it, and divide by 30.",
        ],
        strategy: "Add an fx column",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "short",
        id: "averages-spread-p4-q13",
        question:
          "A hawker stall sells potato curry puffs. The table shows how many it sold each day last week.\n\n| Day | Mon | Tue | Wed | Thu | Fri | Sat | Sun |\n|---|---|---|---|---|---|---|---|\n| Curry puffs sold | 45 | 52 | 0 | 48 | 50 | 47 | 0 |\n\nThe stall was closed on Wednesday and Sunday. The owner wants to plan how many curry puffs to make on a day when the stall is open. Work out the mean number sold per open day.",
        answer: { type: "number", value: 48.4 },
        solution: [
          "The two 0s are not 'bad sales days': the stall was closed. They describe a different situation, so leave them out.",
          "Open days: 45 + 52 + 48 + 50 + 47 = 242 curry puffs over 5 days.",
          "Mean per open day = 242 ÷ 5 = 48.4 curry puffs.",
          "Including the closed days would give 242 ÷ 7 ≈ 34.6, far below every open day's sales. The owner would make too few!",
        ],
        commonError: "Including the closed days, which drags the mean far below a normal open day.",
        traps: [
          { spec: { type: "number", value: 34.571428571, tolerance: 0.05 }, feedback: "You included the two days the stall was closed. Those 0s aren't sales on an open day, so leave them out and divide by 5." },
        ],
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Do the two 0s describe a day when the stall was open?",
          "Use only the five open days.",
          "Add the five open-day sales and divide by 5.",
        ],
        strategy: "Ask why the value is there",
      },
      // ---------------------------------------------------------------- q14
      {
        kind: "written",
        id: "averages-spread-p4-q14",
        question:
          "Aisha asked 25 pupils how many hours they spent on a hobby last Sunday.\n\n| Hours | Number of pupils |\n|---|---|\n| 0 | 3 |\n| 1 | 4 |\n| 2 | 9 |\n| 3 | 6 |\n| 4 | 3 |\n\nAisha wrote:\n\n> Median = 2, because 2 is in the middle of the Hours column. Mean = (0 + 1 + 2 + 3 + 4) ÷ 5 = 2.\n\n(a) Aisha's median is correct, but her reason is wrong. Give a correct reason.\n\n(b) Explain the mistake in her mean, and work out the correct mean.",
        marks: 3,
        modelAnswer:
          "(a) The median is the middle *pupil*, not the middle of the hours column. With 25 pupils the median is the {{(25+1)/2 = 13}}th value. The running totals are 3, 7, 16, … so pupils 8 to 16 all spent 2 hours. The 13th pupil spent 2 hours, so the median is 2 hours.\n\n(b) Aisha has found the mean of the five different values 0 to 4 and ignored the frequencies, as if there were one pupil in each row. Each value must be multiplied by its frequency: total hours = 0 × 3 + 1 × 4 + 2 × 9 + 3 × 6 + 4 × 3 = 0 + 4 + 18 + 18 + 12 = 52. Mean = 52 ÷ 25 = 2.08 hours.",
        markScheme: [
          { point: "Correct reason for the median: the 13th of the 25 pupils, found with running totals, is in the 2-hour row", keywords: ["13th", "13", "running total", "cumulative", "middle pupil", "16"] },
          { point: "Identifies the mistake in the mean: she ignored the frequencies / divided by the number of rows instead of 25 pupils", keywords: ["frequencies", "frequency", "ignored", "rows", "25 pupils", "multiply"] },
          { point: "Correct mean: 52 ÷ 25 = 2.08 hours", keywords: ["2.08", "52"] },
        ],
        commonError: "Agreeing with Aisha because her answers look sensible. A right answer from a wrong method is luck, not maths.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "The median is the middle *person*. How many people are there?",
          "Use running totals of the frequencies to find which row the 13th pupil is in.",
          "For the mean: how many hours did the 9 pupils in the 2-hour row spend altogether?",
        ],
        strategy: "Spot the error",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "averages-spread-p4-q15",
        question:
          "The dot plots show the scores of 9 pupils from class 8P and 9 pupils from class 8Q in a mental-maths quiz marked out of 10.\n\nFind the median and the range for each class. Give your answers in this order: 8P median, 8Q median, 8P range, 8Q range.",
        diagram: `<svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two dot plots of quiz scores on a scale from 0 to 10. Class 8P: one dot at 7, two dots at 8, four dots at 9 and two dots at 10. Class 8Q: one dot at 4, one at 5, two at 6, two at 7, two at 8 and one at 10."><rect width="420" height="280" fill="#ffffff"/><g font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937"><text x="20" y="24">Class 8P</text><text x="20" y="160">Class 8Q</text></g><g stroke="#1f2937" stroke-width="1.5"><line x1="40" y1="120" x2="380" y2="120"/><line x1="40" y1="235" x2="380" y2="235"/></g><g stroke="#1f2937"><line x1="40" y1="120" x2="40" y2="125"/><line x1="74" y1="120" x2="74" y2="125"/><line x1="108" y1="120" x2="108" y2="125"/><line x1="142" y1="120" x2="142" y2="125"/><line x1="176" y1="120" x2="176" y2="125"/><line x1="210" y1="120" x2="210" y2="125"/><line x1="244" y1="120" x2="244" y2="125"/><line x1="278" y1="120" x2="278" y2="125"/><line x1="312" y1="120" x2="312" y2="125"/><line x1="346" y1="120" x2="346" y2="125"/><line x1="380" y1="120" x2="380" y2="125"/><line x1="40" y1="235" x2="40" y2="240"/><line x1="74" y1="235" x2="74" y2="240"/><line x1="108" y1="235" x2="108" y2="240"/><line x1="142" y1="235" x2="142" y2="240"/><line x1="176" y1="235" x2="176" y2="240"/><line x1="210" y1="235" x2="210" y2="240"/><line x1="244" y1="235" x2="244" y2="240"/><line x1="278" y1="235" x2="278" y2="240"/><line x1="312" y1="235" x2="312" y2="240"/><line x1="346" y1="235" x2="346" y2="240"/><line x1="380" y1="235" x2="380" y2="240"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="40" y="139">0</text><text x="74" y="139">1</text><text x="108" y="139">2</text><text x="142" y="139">3</text><text x="176" y="139">4</text><text x="210" y="139">5</text><text x="244" y="139">6</text><text x="278" y="139">7</text><text x="312" y="139">8</text><text x="346" y="139">9</text><text x="380" y="139">10</text><text x="40" y="254">0</text><text x="74" y="254">1</text><text x="108" y="254">2</text><text x="142" y="254">3</text><text x="176" y="254">4</text><text x="210" y="254">5</text><text x="244" y="254">6</text><text x="278" y="254">7</text><text x="312" y="254">8</text><text x="346" y="254">9</text><text x="380" y="254">10</text><text x="210" y="274" font-size="12">Score (out of 10)</text></g><g fill="#c7d2fe" stroke="#334155"><circle cx="278" cy="110" r="7"/><circle cx="312" cy="110" r="7"/><circle cx="312" cy="94" r="7"/><circle cx="346" cy="110" r="7"/><circle cx="346" cy="94" r="7"/><circle cx="346" cy="78" r="7"/><circle cx="346" cy="62" r="7"/><circle cx="380" cy="110" r="7"/><circle cx="380" cy="94" r="7"/></g><g fill="#fde68a" stroke="#334155"><circle cx="176" cy="225" r="7"/><circle cx="210" cy="225" r="7"/><circle cx="244" cy="225" r="7"/><circle cx="244" cy="209" r="7"/><circle cx="278" cy="225" r="7"/><circle cx="278" cy="209" r="7"/><circle cx="312" cy="225" r="7"/><circle cx="312" cy="209" r="7"/><circle cx="380" cy="225" r="7"/></g></svg>`,
        answer: { type: "list", values: [9, 7, 3, 6], ordered: true, display: "8P median 9, 8Q median 7, 8P range 3, 8Q range 6" },
        solution: [
          "Each dot is one pupil. 8P in order: 7, 8, 8, 9, 9, 9, 9, 10, 10. 8Q in order: 4, 5, 6, 6, 7, 7, 8, 8, 10.",
          "Each class has 9 pupils, so the median is the 5th value. 8P: 9. 8Q: 7.",
          "Ranges: 8P: 10 − 7 = 3. 8Q: 10 − 4 = 6.",
          "In context: on average 8P scored higher (median 9 compared with 7), and 8P's scores were more consistent (range 3 compared with 6).",
        ],
        commonError: "Counting the columns of dots instead of the dots themselves. Every dot is one pupil.",
        traps: [
          { spec: { type: "list", values: [8.5, 6.5, 3, 6], ordered: true }, feedback: "You found the middle of the *columns*. Each dot is one pupil, so list every dot (9 per class) and take the 5th." },
        ],
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Write each class's scores as an ordered list: one number for every dot.",
          "With 9 pupils, the median is the 5th score.",
          "Range = highest score − lowest score for each class.",
        ],
        strategy: "Read the diagram carefully",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "short",
        id: "averages-spread-p4-q16",
        question:
          "Six number cards show 3, 7, 7, 8, 10 and 13. Zara removes one card. For the five cards left, the median is 8 and the range is 6.\n\nWhich number was on the card Zara removed?",
        answer: { type: "number", value: 3 },
        solution: [
          "Try each possible card. The five cards left are in order, and their median is the 3rd one.",
          "Remove 3: 7, 7, 8, 10, 13. Median 8 ✓, range 13 − 7 = 6 ✓.",
          "Remove a 7: 3, 7, 8, 10, 13. Median 8 ✓, but range 13 − 3 = 10 ✗.",
          "Remove 8, 10 or 13: the median becomes 7 ✗.",
          "So Zara removed the card showing 3.",
        ],
        commonError: "Stopping after checking only the median: removing a 7 also leaves a median of 8.",
        traps: [
          { spec: { type: "number", value: 7 }, feedback: "Removing a 7 does leave a median of 8, but then the range is 13 − 3 = 10, not 6." },
        ],
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "There are only five different cards she could remove. Try each one.",
          "With five cards left, the median is the 3rd card in order.",
          "Two cards give a median of 8. Use the range to decide between them.",
        ],
        strategy: "Eliminate options",
      },
      // ---------------------------------------------------------------- q17
      {
        kind: "short",
        id: "averages-spread-p4-q17",
        question:
          "Wei Ling writes a list of numbers: one 1, two 2s, three 3s, four 4s, and so on, finishing with ten 10s.\n\n1, 2, 2, 3, 3, 3, 4, 4, 4, 4, …, 10\n\nFind the mean, the median and the mode of her list. Give your answers in that order.",
        answer: { type: "list", values: [7, 7, 10], ordered: true, display: "Mean 7, median 7, mode 10" },
        solution: [
          "Think of it as a frequency table: the value k has frequency k.",
          "Number of values = 1 + 2 + 3 + … + 10 = 55.",
          "Total = 1 × 1 + 2 × 2 + … + 10 × 10 = 1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 + 81 + 100 = 385.",
          "Mean = 385 ÷ 55 = 7.",
          "Median = the {{(55+1)/2 = 28}}th value. The running totals are 1, 3, 6, 10, 15, 21, 28, … (the triangular numbers), so the 22nd to 28th values are all 7. Median = 7.",
          "Mode = 10, because it appears ten times, more than any other value.",
        ],
        commonError: "Finding the mean of 1 to 10 (5.5) and forgetting that the larger numbers appear more often.",
        traps: [
          { spec: { type: "list", values: [5.5, 7, 10], ordered: true }, feedback: "5.5 is the mean of the ten different values, but the larger values appear more often. Use total ÷ 55." },
          { spec: { type: "list", values: [7, 5.5, 10], ordered: true }, feedback: "The median is the middle of all 55 values, not the middle of 1 to 10. Which value is the 28th?" },
        ],
        difficulty: "challenge",
        guideRef: "frequency-tables",
        hints: [
          "Turn the list into a frequency table: the value k has frequency k.",
          "How many values are there altogether? The running totals are the triangular numbers 1, 3, 6, 10, …",
          "The total is 1 × 1 + 2 × 2 + … + 10 × 10. The median is the 28th value: which running total reaches 28?",
        ],
        strategy: "Find a pattern",
      },
      // ---------------------------------------------------------------- q18
      {
        kind: "short",
        id: "averages-spread-p4-q18",
        question:
          "Mei thinks of five numbers with a mean of 10.\n\n- If she doubles her largest number, the mean of the five numbers becomes 13.\n- If instead she halves her smallest number, the mean becomes 9.8.\n\nFind her smallest number and her largest number. Give the smallest first.",
        answer: { type: "list", values: [2, 15], ordered: true, display: "Smallest 2, largest 15" },
        solution: [
          "Total of the five numbers = 5 × 10 = 50.",
          "Doubling the largest number L adds exactly L to the total. New total = 5 × 13 = 65, so L = 65 − 50 = 15.",
          "Halving the smallest number S takes away {{1/2 S}} from the total. New total = 5 × 9.8 = 49, so {{1/2 S}} = 1 and S = 2.",
          "Check that such a set exists: for example 2, 8, 11, 14, 15 has total 50 ✓",
        ],
        commonError: "Using the change in the mean as the change in the number. A change in the mean must be multiplied by 5 to give the change in the total.",
        traps: [
          { spec: { type: "list", values: [0.4, 3], ordered: true }, feedback: "You used the changes in the mean (3 and 0.2). Each change in the mean must be multiplied by 5 to get the change in the total." },
          { spec: { type: "list", values: [1, 15], ordered: true }, feedback: "Halving the smallest number takes away *half* of it, so if the total drops by 1, the number itself is 2." },
        ],
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "Work with the total, not the mean. What do the five numbers add up to?",
          "Doubling the largest number L adds exactly L to the total. What is the new total?",
          "Halving the smallest number S takes away {{1/2 S}} from the total.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "written",
        id: "averages-spread-p4-q19",
        question:
          "A company advertises: 'Our sports drink makes you run faster!' As evidence, 6 pupils each ran 100 m. Three of them had the sports drink first and the other three had water. Their times, in seconds, were:\n\n| Group | Times (seconds) |\n|---|---|\n| Sports drink | 12.4, 13.0, 13.9 |\n| Water | 12.3, 13.5, 14.4 |\n\n(a) Work out the mean time for each group.\n\n(b) Give two reasons why this evidence does not convince you that the drink makes people run faster.\n\n(c) Describe a fairer way to test the company's claim.",
        marks: 4,
        modelAnswer:
          "(a) Sports drink: (12.4 + 13.0 + 13.9) ÷ 3 = 39.3 ÷ 3 = 13.1 s. Water: (12.3 + 13.5 + 14.4) ÷ 3 = 40.2 ÷ 3 = 13.4 s. So the drink group was 0.3 s faster on average.\n\n(b) First, the samples are tiny: only 3 runners in each group, so one unusually fast or slow runner changes the mean a lot. Second, the difference of 0.3 s is small compared with the variation within each group (ranges 1.5 s and 2.1 s), and the fastest runner of all (12.3 s) drank water. The two groups were different people, so the difference could just be because the drink group happened to contain faster runners, or chance.\n\n(c) Test many more runners, and have each runner run twice under the same conditions, once after the drink and once after water (on different days, in a random order). Then compare each runner's two times.",
        markScheme: [
          { point: "Correct means: sports drink 13.1 s, water 13.4 s", keywords: ["13.1", "13.4"] },
          { point: "Sample size: only 3 pupils in each group is far too few to be reliable", keywords: ["sample", "small", "only 3", "three", "too few", "more people"] },
          {
            point: "Variation: the 0.3 s difference is small compared with the spread of times (ranges 1.5 s and 2.1 s), the fastest runner drank water, and different runners have different abilities, so it could be chance",
            keywords: ["0.3", "range", "1.5", "2.1", "variation", "chance", "fastest", "12.3", "different people", "ability"],
          },
          { point: "A fairer test: many more runners, the same runners trying both drinks (or random groups), same conditions", keywords: ["more runners", "same runners", "same people", "both", "random", "same conditions", "larger sample"] },
        ],
        commonError: "Accepting the claim because the drink group's mean is lower, without asking whether the difference is bigger than the natural variation.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Start with the numbers: find both means and both ranges.",
          "How many runners are in each group? Would you trust a survey of 3 people?",
          "Compare the 0.3 s difference with how much the times vary inside each group. Who was the fastest runner of all?",
        ],
        strategy: "Ask: is the sample big enough?",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "averages-spread-p4-q20",
        question:
          "The mean of 20 numbers is 15. Ethan subtracts 1 from the 1st number, 2 from the 2nd number, 3 from the 3rd number, and so on, until he subtracts 20 from the 20th number.\n\nWhat is the mean of the 20 new numbers?",
        answer: { type: "number", value: 4.5 },
        solution: [
          "You don't know the numbers, but you know their total: 20 × 15 = 300.",
          "The total amount subtracted is 1 + 2 + 3 + … + 20.",
          "Pair the terms: 1 + 20 = 21, 2 + 19 = 21, …, 10 + 11 = 21. That is 10 pairs, so 1 + 2 + … + 20 = 10 × 21 = 210.",
          "New total = 300 − 210 = 90.",
          "New mean = 90 ÷ 20 = 4.5.",
        ],
        solutions: [
          {
            label: "Think about the mean amount subtracted",
            steps: [
              "The amounts subtracted, 1 to 20, go up in equal steps, so their mean is {{(1 + 20)/2 = 10.5}}.",
              "Subtracting from each number lowers the mean by the mean of the amounts subtracted.",
              "New mean = 15 − 10.5 = 4.5. Quicker, once you trust the idea!",
            ],
          },
        ],
        commonError: "Taking 10 as the 'middle' amount subtracted. The mean of 1 to 20 is 10.5, not 10.",
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "Close in spirit! The mean amount subtracted is the mean of 1, 2, …, 20, which is 10.5, not 10." },
          { spec: { type: "number", value: -195 }, feedback: "210 is the *total* subtracted from all 20 numbers. Subtract it from the total (300), not from the mean." },
        ],
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "You don't know the numbers, but you do know their total. What is it?",
          "How much is subtracted altogether? You need 1 + 2 + 3 + … + 20.",
          "Pair the numbers: 1 + 20, 2 + 19, 3 + 18, … How many pairs are there, and what does each add up to?",
        ],
        strategy: "Find a pattern",
      },
    ],
  },
];
