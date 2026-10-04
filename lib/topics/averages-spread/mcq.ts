// MCQ papers for "Averages, Range & Comparing Data" (averages-spread).
// 4 papers × 20 questions. Options are shuffled at display time, so
// explanations name distractors by value, never by position.
import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ PAPER 1
  // =========================================================================
  {
    id: "averages-spread-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "averages-spread-m1-q01",
        question: "Find the mean of 5, 7, 10, 14, 4.",
        options: ["8", "7", "10", "40"],
        answerIndex: 0,
        explanation:
          "Add them: 5 + 7 + 10 + 14 + 4 = 40. Share the total equally between the 5 values: 40 ÷ 5 = 8. 40 is the total before dividing; 7 is the median (the middle value once sorted); 10 is the middle of the list as written, which isn't in order (it also happens to be the range).",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Add all the values, then share the total equally between them."],
        strategy: "Share the total equally",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q02",
        question: "Find the median of 12, 4, 9, 2, 7, 6.",
        options: ["5.5", "13", "6.5", "6"],
        answerIndex: 2,
        explanation:
          "Sort first: 2, 4, 6, 7, 9, 12. With six values there are two middle ones, 6 and 7, so the median is halfway between them: (6 + 7) ÷ 2 = 6.5. 5.5 comes from the middle of the *unsorted* list (9 and 2); 13 is 6 + 7 without halving; 6 is only one of the two middle values.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Put the numbers in order first. With an even number of values, how many middle values are there?"],
        strategy: "Sort first",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q03",
        question:
          "The overnight temperatures (°C) in a mountain town over one week were −4, 2, −1, −6, 3, 0, 1. What is the range of the temperatures, in °C?",
        options: ["−9", "9", "3", "7"],
        answerIndex: 1,
        explanation:
          "Range = highest − lowest = 3 − (−6) = 3 + 6 = 9 °C. On a number line, −6 to 3 is 9 steps. A range is a distance, so it is never negative: −9 comes from subtracting the wrong way round. 3 comes from ignoring the minus sign (6 − 3), and 7 uses the first value, −4, instead of the lowest, −6.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Find the highest and the lowest temperature. How far apart are they on a number line?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q04",
        question: "The shoe sizes of nine pupils are 5, 6, 6, 7, 4, 6, 5, 8, 5. What is the mode?",
        options: ["6 only", "3", "There is no mode because two sizes tie", "5 and 6"],
        answerIndex: 3,
        explanation:
          "Tally them: size 5 appears 3 times and size 6 appears 3 times; nothing else appears more than once. A data set can have two modes, so the modes are 5 and 6. '6 only' misses the three 5s; a tie doesn't mean there is no mode; and 3 is *how often* they appear (the frequency), not a shoe size.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Tally how many times each size appears. Is there a tie?"],
        strategy: "Make a tally",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q05",
        question: "Mei asks everyone in her class, 'What is your favourite fruit?' Which average can she use to summarise the answers?",
        options: ["The mean", "The mode", "The median", "The range"],
        answerIndex: 1,
        explanation:
          "Fruit names aren't numbers, so you can't add them (no mean) or put them in numerical order (no median). The mode — the most popular fruit — works for any kind of data. The range isn't an average at all: it measures spread, and it also needs numbers.",
        difficulty: "warmup",
        guideRef: "choosing-an-average",
        hints: ["Can you add 'mango' and 'durian'? Can you put fruits in numerical order?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q06",
        question: "Find the mean of 2.4, 3.1, 1.8, 2.7.",
        options: ["2.5", "2.55", "1.3", "10"],
        answerIndex: 0,
        explanation:
          "Total = 2.4 + 3.1 + 1.8 + 2.7 = 10.0, and 10.0 ÷ 4 = 2.5. Sense check: the mean must lie between the smallest (1.8) and largest (3.1) values. 2.55 is the median (halfway between 2.4 and 2.7), 1.3 is the range (3.1 − 1.8), and 10 is the total before dividing by 4.",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Add the four decimals carefully — line up the decimal points.",
          "The total is 10.0. How many values are you sharing it between?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q07",
        question:
          "Five friends get this much pocket money per week: $8, $9, $11, $12, $60. Which average best describes a typical amount?",
        options: [
          "The mean, $20, because it uses every value",
          "The mode, because it shows the most common amount",
          "The range, $52, because it includes everyone",
          "The median, $11, because the $60 outlier drags the mean up",
        ],
        answerIndex: 3,
        explanation:
          "Four of the five friends get between $8 and $12. The $60 is an outlier: it pulls the mean up to $100 ÷ 5 = $20, which is more than four of the friends actually get. The median, $11, isn't affected by how extreme the $60 is, so it is the better 'typical' value. There is no mode here (every amount appears once), and the range of $52 measures spread, not a typical amount.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Is a mean of $20 close to what most of the friends actually get?",
          "Which value is very different from the others? Which average isn't pulled about by it?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q08",
        question: "The mean of five numbers is 8. Four of the numbers are 6, 9, 11 and 10. What is the fifth number?",
        options: ["8", "9", "4", "40"],
        answerIndex: 2,
        explanation:
          "Total = mean × count, so the five numbers add up to 8 × 5 = 40. The four known numbers add up to 6 + 9 + 11 + 10 = 36, so the fifth is 40 − 36 = 4. Check: (36 + 4) ÷ 5 = 8. 8 assumes the missing number equals the mean; 9 is the mean of the four known numbers; 40 is the total of all five.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "If the mean of five numbers is 8, what must the five numbers add up to?",
          "The total is 8 × 5 = 40. What do the four known numbers add up to?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q09",
        question:
          "The table shows the number of pets owned by 20 pupils. Work out the mean number of pets per pupil.\n\n| Number of pets | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|\n| Frequency | 5 | 8 | 4 | 3 |",
        options: ["1.5", "1.25", "5", "6.25"],
        answerIndex: 1,
        explanation:
          "Multiply each number of pets by its frequency: 0 × 5 + 1 × 8 + 2 × 4 + 3 × 3 = 0 + 8 + 8 + 9 = 25 pets altogether. Divide by the 20 pupils: 25 ÷ 20 = 1.25. 1.5 is the mean of 0, 1, 2 and 3, which ignores how many pupils gave each answer; 6.25 divides the 25 pets by the 4 columns instead of the 20 pupils; 5 is 20 pupils ÷ 4 columns.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "How many pets are there altogether? (5 pupils have 0 pets, 8 pupils have 1 pet, …)",
          "Make an fx row: number of pets × frequency.",
          "Total pets ÷ total pupils.",
        ],
        strategy: "Add an fx column",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q10",
        question:
          "The table shows the goals a football team scored in 18 matches. What is the median number of goals?\n\n| Goals | 0 | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|---|\n| Matches | 6 | 4 | 5 | 2 | 1 |",
        options: ["1", "0", "9.5", "2"],
        answerIndex: 0,
        explanation:
          "With 18 matches, the median is halfway between the 9th and 10th values. Count along the frequencies: matches 1–6 had 0 goals and matches 7–10 had 1 goal. So the 9th and 10th values are both 1, and the median is 1 goal. 9.5 is the *position* of the median, not its value; 2 is just the middle of the Goals row; 0 is the mode.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "With 18 values, which two positions are in the middle?",
          "Keep a running total of the frequencies: how many matches had 0 goals? 0 or 1 goals?",
          "The 9th and 10th values both fall in the same column.",
        ],
        strategy: "Keep a running total",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q11",
        question:
          "The stem-and-leaf diagram shows the times, in minutes, that 14 pupils took to finish a crossword. Key: 3 | 4 means 34 minutes.\n\n| Stem | Leaves |\n|---|---|\n| 2 | 3 5 8 |\n| 3 | 0 1 1 1 6 9 |\n| 4 | 2 4 7 |\n| 5 | 0 5 |\n\nWhat is the median time?",
        options: ["31", "32", "33.5", "36"],
        answerIndex: 2,
        explanation:
          "There are 3 + 6 + 3 + 2 = 14 leaves, so the median is halfway between the 7th and 8th values. The diagram is already in order, so count from the top: 23, 25, 28, 30, 31, 31, **31**, **36**, … The median is (31 + 36) ÷ 2 = 33.5 minutes. 31 is the mode (and only the 7th value); 32 is the range (55 − 23); 36 is only the 8th value.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "Count the leaves: how many values are there?",
          "For 14 values the median is between the 7th and 8th. The diagram is already in order — count from the top row.",
          "The 7th value is 31 and the 8th is 36.",
        ],
        strategy: "Use the order in the diagram",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q12",
        question:
          "Two classes sat the same maths test. Class 8A had a mean of 62 marks and a range of 15 marks. Class 8B had a mean of 68 marks and a range of 40 marks. Which is the best comparison?",
        options: [
          "8B did better in every way, because both of its numbers are bigger",
          "8A did better on average, because its range is smaller",
          "8A's marks were more spread out, because its mean is lower",
          "On average 8B scored higher, but 8A's marks were more consistent",
        ],
        answerIndex: 3,
        explanation:
          "Make two separate comparisons. Averages: 68 > 62, so 8B did better on average. Spread: 8A's range of 15 is much smaller than 40, so 8A's marks were closer together — more consistent. A bigger range is not 'better'; it means the marks were more varied. And the range says nothing about which class scored higher on average, nor does the mean tell you about spread.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Make two comparisons: one using the means and one using the ranges.",
          "Does a bigger range mean better marks, or more varied marks?",
        ],
        strategy: "Compare an average AND the spread",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q13",
        question: "Always, sometimes or never true? 'The median of a set of numbers is one of the numbers in the set.'",
        options: ["Always true", "Sometimes true", "Never true", "True only when the numbers are whole numbers"],
        answerIndex: 1,
        explanation:
          "Sometimes. For 1, 2, 3 the median is 2, which is in the set. For 1, 2, 3, 4 the median is 2.5, which isn't. With an odd number of values the median is always one of them; with an even number it's halfway between the two middle values, so it's only in the set when those two are equal (e.g. 1, 5, 5, 8). Whole numbers don't guarantee it — 1, 2, 3, 4 are all whole numbers.",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Try a small set with an odd number of values, then one with an even number.",
          "Try 1, 2, 3, 4. Is its median one of the numbers?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q14",
        question:
          "The mean of six test scores is 15. The teacher then notices that one score was recorded as 9 when it should have been 21. What is the correct mean?",
        options: ["17", "27", "18", "15"],
        answerIndex: 0,
        explanation:
          "Old total = 15 × 6 = 90. Fixing the score adds 21 − 9 = 12, so the new total is 102 and the mean is 102 ÷ 6 = 17. Put another way, the extra 12 is shared among 6 scores, adding 2 to the mean. 27 adds the whole 12 to the mean without sharing it; 18 averages the old mean with the new score, which has no meaning; 15 forgets that changing a value changes the total.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "What was the total of the six scores?",
          "By how much does the total go up when 9 becomes 21?",
          "Share that increase among all six scores.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q15",
        question:
          "A set of 20 values has a mean of 30 and a median of 28. One extra value, 500, is added. What is most likely to happen?",
        options: [
          "The mean and the median both rise by the same amount",
          "The median rises a lot, but the mean hardly changes",
          "Neither changes, because one value can't affect an average",
          "The mean rises a lot, but the median changes only a little, if at all",
        ],
        answerIndex: 3,
        explanation:
          "The mean uses the size of every value: the total jumps from 20 × 30 = 600 to 1100, so the mean becomes 1100 ÷ 21 ≈ 52.4. The median depends only on which value is in the middle, and adding one value at the top shifts the middle position by just half a place — so it stays at or near 28. That's why the median is called *resistant* to outliers and the mean is not. 'Median rises a lot' has the two averages the wrong way round.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Work out the new mean: the old total is 20 × 30.",
          "The median depends only on the middle position. How far does the middle move when one value is added at the top?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q16",
        question:
          "The heights of 12 tomato plants are shown. Key: 5 | 2 means 52 cm.\n\n| Stem | Leaves |\n|---|---|\n| 5 | 2 6 7 |\n| 6 | 0 3 3 8 |\n| 7 | 1 4 5 9 |\n| 8 | 3 |\n\nRavi says: 'The biggest leaf is 9 and the smallest is 0, so the range is 9 cm.' What is the correct range?",
        options: ["9 cm", "3 cm", "31 cm", "30 cm"],
        answerIndex: 2,
        explanation:
          "Each value is a stem and a leaf together. The smallest value is the first leaf in the top row, 52 cm, and the largest is the last leaf in the bottom row, 83 cm. Range = 83 − 52 = 31 cm. Ravi's 9 cm uses the leaves on their own; 3 cm uses only the stems (8 − 5); 30 cm uses 80 − 50 and ignores the leaves.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "What does a single leaf stand for on its own? Put it back with its stem.",
          "The smallest value is the first leaf in the top row; the largest is the last leaf in the bottom row.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q17",
        question:
          "The mean of nine numbers is 50. A tenth number is added and the mean rises to 53. What is the tenth number?",
        options: ["80", "53", "56", "30"],
        answerIndex: 0,
        explanation:
          "Totals: before, 9 × 50 = 450; after, 10 × 53 = 530. The tenth number is 530 − 450 = 80. A neat second way: the new number has to be 53 itself *and* lift each of the 9 old numbers' share by 3, so it is 53 + 9 × 3 = 80. 53 forgets about lifting the old numbers; 56 lifts by 3 only once; 30 comes from using 10 × 50 = 500 as the old total, but there were only nine numbers then.",
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "Work with totals, not means. What was the total of the nine numbers?",
          "What must the total of all ten numbers be now?",
          "Or think 'balance': the new number must raise each of the other nine by 3.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q18",
        question:
          "Two hawker stalls are rated out of 5 on a food app. Stall P has a mean rating of 4.9 from 7 reviews. Stall Q has a mean rating of 4.6 from 850 reviews. Which conclusion is most sensible?",
        options: [
          "Stall P is definitely better, because 4.9 is more than 4.6",
          "Stall Q's mean is more reliable: it is based on far more reviews, while P's 4.9 could change a lot with a few more",
          "Stall Q must be worse, because more people had a chance to complain",
          "The stalls can't be compared at all, because their means are different",
        ],
        answerIndex: 1,
        explanation:
          "A mean from 7 reviews can swing a lot: P's total is 7 × 4.9 = 34.3, and just three more reviews of 3 would drop its mean to (34.3 + 9) ÷ 10 ≈ 4.3. A mean from 850 reviews hardly moves. 4.9 > 4.6 is true, but with such a small sample you can't be confident P is 'definitely' better. Comparing means is fine — you just need to say how reliable each one is.",
        difficulty: "challenge",
        guideRef: "comparing-distributions",
        hints: [
          "How much could P's mean change if three more people gave it a 3?",
          "Which mean is based on more data, and why does that matter?",
        ],
        strategy: "Consider the sample size",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q19",
        question:
          "Five positive whole numbers have a mode of 4, a median of 5 and a mean of 6. What is the largest possible value of the biggest number?",
        options: ["12", "17", "21", "11"],
        answerIndex: 3,
        explanation:
          "Order them a ≤ b ≤ c ≤ d ≤ e. The median gives c = 5. The only mode is 4, so 4 appears at least twice — it must be a and b. The mean is 6, so the total is 30 and d + e = 30 − 4 − 4 − 5 = 17. To make e big, make d small — but d can't be 5, or 5 would appear twice and tie with 4 as a mode. So d = 6 and e = 11: the set is 4, 4, 5, 6, 11. 12 comes from 4, 4, 5, 5, 12, which has two modes; 17 forgets that d also takes part of the total; 21 also forgets one of the 4s.",
        difficulty: "challenge",
        guideRef: "mean-median-mode-range",
        hints: [
          "Write the numbers in order as a, b, c, d, e. Which ones can you fill in straight away?",
          "The median gives c and the mode forces two of the numbers. What must d + e be?",
          "To make e as large as possible, make d as small as possible — but check that 4 is still the only mode.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m1-q20",
        question:
          "The table shows how long 20 pupils spent on homework one evening. Estimate the mean time.\n\n| Time, t (minutes) | Frequency |\n|---|---|\n| 0 < t ≤ 10 | 4 |\n| 10 < t ≤ 20 | 7 |\n| 20 < t ≤ 30 | 6 |\n| 30 < t ≤ 40 | 3 |",
        options: ["24 minutes", "20 minutes", "19 minutes", "95 minutes"],
        answerIndex: 2,
        explanation:
          "We don't know the exact times, so use each class midpoint: 5 × 4 + 15 × 7 + 25 × 6 + 35 × 3 = 20 + 105 + 150 + 105 = 380. Estimated mean = 380 ÷ 20 = 19 minutes. 24 minutes uses the top of each class, which overestimates; 20 minutes is the mean of the four midpoints, ignoring the frequencies; 95 minutes divides by the 4 classes instead of the 20 pupils.",
        difficulty: "challenge",
        guideRef: "grouped-data",
        hints: [
          "You don't know the exact times. What single value best represents each class?",
          "Use the midpoints 5, 15, 25 and 35.",
          "Multiply each midpoint by its frequency, add, then divide by the total frequency.",
        ],
        strategy: "Use midpoints",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 2
  // =========================================================================
  {
    id: "averages-spread-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "averages-spread-m2-q01",
        question: "The heights of five pupils, in cm, are 152, 147, 160, 139, 155. What is the range?",
        options: ["3 cm", "21 cm", "13 cm", "8 cm"],
        answerIndex: 1,
        explanation:
          "Range = largest − smallest = 160 − 139 = 21 cm. 3 cm is the last value minus the first (155 − 152) — but the list isn't in order, so its ends aren't the extremes. 13 cm uses 147 as the smallest and misses 139; 8 cm is 160 − 152.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Find the tallest and the shortest first — the list isn't in order."],
        strategy: "Sort first",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q02",
        question: "Find the median of 15, 3, 9, 22, 6, 12, 4.",
        options: ["22", "4", "12.5", "9"],
        answerIndex: 3,
        explanation:
          "Sorted: 3, 4, 6, **9**, 12, 15, 22. With 7 values the middle one is the 4th, which is 9. 22 is the 4th value of the *unsorted* list; 4 is the median's position rather than its value; 12.5 is halfway between the smallest and largest values.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Put the numbers in order first, then find the middle one."],
        strategy: "Sort first",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q03",
        question: "The mean of four numbers is 7. What do the four numbers add up to?",
        options: ["28", "11", "1.75", "7"],
        answerIndex: 0,
        explanation:
          "Mean = total ÷ count, so total = mean × count = 7 × 4 = 28. 11 adds the mean and the count; 1.75 divides them; 7 mixes up the mean with the total.",
        difficulty: "warmup",
        guideRef: "working-backwards",
        hints: ["Mean = total ÷ 4. Undo the division."],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q04",
        question:
          "Zara rolls a dice 35 times and records her scores. What is the modal score?\n\n| Score | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Frequency | 4 | 7 | 5 | 9 | 6 | 4 |",
        options: ["9", "3.5", "4", "6"],
        answerIndex: 2,
        explanation:
          "The mode is the score that came up most often. Score 4 has the highest frequency (9 times), so the modal score is 4. 9 is how many times it happened, not the score itself; 3.5 is the middle of 1 to 6; 6 is just the highest score.",
        difficulty: "warmup",
        guideRef: "frequency-tables",
        hints: ["Find the biggest number in the Frequency row, then read the score above it."],
        strategy: "Read the table carefully",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q05",
        question:
          "The stem-and-leaf diagram shows how many push-ups 9 pupils did in a minute. Key: 1 | 5 means 15.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 2 5 8 |\n| 2 | 0 4 4 9 |\n| 3 | 1 6 |\n\nWhat is the mode?",
        options: ["24", "4", "2", "9"],
        answerIndex: 0,
        explanation:
          "The leaf 4 appears twice on stem 2, so the value 24 appears twice — more than any other value. The mode is 24 push-ups. 4 is only the leaf (it must be read with its stem); 2 is the stem with the most leaves; 9 is how many pupils there are.",
        difficulty: "warmup",
        guideRef: "stem-and-leaf-averages",
        hints: ["Look for a leaf that repeats on the same stem, then join it to its stem."],
        strategy: "Read the key",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q06",
        question: "Find the mean of −3, 6, −8, 2, 4.",
        options: ["4.6", "0.2", "2", "1"],
        answerIndex: 1,
        explanation:
          "Total = −3 + 6 − 8 + 2 + 4 = 1, so the mean is 1 ÷ 5 = 0.2. 4.6 comes from ignoring the minus signs (23 ÷ 5); 2 is the median (sorted: −8, −3, 2, 4, 6); 1 is the total before dividing by 5.",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Add the positives and the negatives separately: 6 + 2 + 4 and −3 − 8.",
          "12 − 11 = 1. Now share that total between the 5 values.",
        ],
        strategy: "Group positives and negatives",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q07",
        question:
          "A shoe shop sold trainers in these sizes on Saturday: 4, 5, 5, 5, 6, 7, 9. The manager wants to know which size to re-order most of. Which average should she use?",
        options: [
          "The mean, about 5.9, because it uses every sale",
          "The range, 5, because it covers all the sizes sold",
          "The mode, 5, because it is the size sold most often",
          "The mean rounded to 6, because 6 is a real shoe size",
        ],
        answerIndex: 2,
        explanation:
          "The manager wants the size customers buy most often — that's the mode, size 5 (sold 3 times). The mean, 41 ÷ 7 ≈ 5.9, isn't a size anyone bought, and rounding it to 6 gives a size that sold only once. The range (9 − 4 = 5) describes how spread out the sizes are, not which is most popular.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: ["What question is the manager really asking?", "Which average tells you the most popular value?"],
        strategy: "Think about the purpose",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q08",
        question:
          "Aisha's mean mark in 5 tests is 70. She says: 'If I get 100 in my next test, my mean will go up to 85.' What will her mean actually be?",
        options: ["85", "90", "70", "75"],
        answerIndex: 3,
        explanation:
          "Her 5 tests total 5 × 70 = 350 marks. Adding 100 gives 450 marks over 6 tests: 450 ÷ 6 = 75. Aisha's 85 averages 70 and 100 as if they counted equally — but the 70 stands for five tests and the 100 for just one. 90 divides by 5, forgetting there are now 6 tests; 70 forgets the new test changes the total.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "What is the total of her first five marks?",
          "Add the new mark. How many tests is the new total shared between?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q09",
        question:
          "A survey counted the people in each of 25 cars passing a school.\n\n| People in car | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Number of cars | 11 | 8 | 3 | 2 | 1 |\n\nWhich calculation gives the mean number of people per car?",
        options: [
          "{{(1*11 + 2*8 + 3*3 + 4*2 + 5*1)/25}}",
          "{{(1 + 2 + 3 + 4 + 5)/5}}",
          "{{(11 + 8 + 3 + 2 + 1)/5}}",
          "{{(1*11 + 2*8 + 3*3 + 4*2 + 5*1)/5}}",
        ],
        answerIndex: 0,
        explanation:
          "Mean = total people ÷ number of cars. Total people = 1 × 11 + 2 × 8 + 3 × 3 + 4 × 2 + 5 × 1 = 49, and there are 11 + 8 + 3 + 2 + 1 = 25 cars, so the mean is 49 ÷ 25 = 1.96. Dividing the same 49 by 5 uses the number of columns instead of the number of cars; {{(1 + 2 + 3 + 4 + 5)/5}} ignores the frequencies; {{(11 + 8 + 3 + 2 + 1)/5}} is just the mean of the frequencies.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "The mean is total people ÷ number of cars. Which calculation finds the total number of people?",
          "How many cars are there altogether?",
        ],
        strategy: "Add an fx column",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q10",
        question:
          "Wei Ling is finding the mean from this table.\n\n| Score | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|\n| Frequency | 1 | 4 | 7 | 8 |\n\nShe writes: (2 + 3 + 4 + 5) ÷ 4 = 3.5. What went wrong, and what is the correct mean?",
        options: [
          "Nothing — the mean is 3.5",
          "She should have divided by 20 — the mean is 0.7",
          "She found the wrong average — the median is 4",
          "She ignored the frequencies — the mean is 4.1",
        ],
        answerIndex: 3,
        explanation:
          "Each score must be counted as many times as it happened. Total = 2 × 1 + 3 × 4 + 4 × 7 + 5 × 8 = 2 + 12 + 28 + 40 = 82 from 20 results, so the mean is 82 ÷ 20 = 4.1. Wei Ling's 3.5 treats every score as if it happened once. 0.7 divides 2 + 3 + 4 + 5 = 14 by 20, which still ignores the frequencies. The median is 4, but the question asks for the mean. Sense check: most results are 4s and 5s, so the mean should be above 4.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "How many results are there altogether?",
          "Is the score of 5 really counted only once?",
          "Make an fx row, then divide its total by 20.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q11",
        question:
          "The stem-and-leaf diagram shows the number of lengths swum by 8 members of a swimming CCA in one training session. Key: 2 | 5 means 25 lengths.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 3 7 |\n| 2 | 0 2 5 8 |\n| 3 | 1 4 |\n\nWhat is the mean number of lengths?",
        options: ["23.5", "23.75", "21", "3.75"],
        answerIndex: 1,
        explanation:
          "The values are 13, 17, 20, 22, 25, 28, 31, 34. Their total is 190, so the mean is 190 ÷ 8 = 23.75 lengths. 23.5 is the median (halfway between 22 and 25); 21 is the range (34 − 13); 3.75 averages only the leaves, forgetting the tens in the stems.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: ["Write out the eight values in full first.", "Add them up — the total is 190. How many members are there?"],
        strategy: "Read the key",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q12",
        question:
          "Two relay squads ran 100 m trials. Squad X: mean time 14.2 s, range 1.1 s. Squad Y: mean time 13.8 s, range 3.5 s. Which statement is correct?",
        options: [
          "Squad X was faster on average, because 14.2 is bigger than 13.8",
          "Squad Y was more consistent, because its range is bigger",
          "Squad Y was faster on average, but Squad X's times were more consistent",
          "Squad X was both faster on average and more consistent",
        ],
        answerIndex: 2,
        explanation:
          "For race times, *smaller* means faster, so Squad Y (mean 13.8 s) was faster on average. Squad X's range of 1.1 s is smaller, so its times were closer together — more consistent. Saying X was faster because 14.2 is bigger forgets that a bigger time is slower; a bigger range means *less* consistent, not more.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: ["In a race, is a bigger time better or worse?", "Which squad's times are closer together?"],
        strategy: "Interpret in context",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q13",
        question: "Which set of five numbers has a mean of 6, a median of 5 and a mode of 4?",
        options: ["4, 4, 5, 7, 10", "4, 4, 6, 7, 9", "4, 5, 5, 6, 10", "3, 4, 4, 5, 9"],
        answerIndex: 0,
        explanation:
          "Check each set. 4, 4, 5, 7, 10: total 30, so mean 30 ÷ 5 = 6; middle value 5; 4 appears twice, so mode 4 — all three match. 4, 4, 6, 7, 9 has median 6. 4, 5, 5, 6, 10 has mode 5. 3, 4, 4, 5, 9 adds up to only 25, so its mean is 5 (and its median is 4).",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Check the quickest property first: which sets have 5 in the middle?",
          "Then check the mode, then the total — it must be 6 × 5 = 30.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q14",
        question:
          "Five sunflower seedlings have a mean height of 12 cm. The tallest, which is 20 cm, is moved to another pot. What is the mean height of the other four?",
        options: ["8 cm", "12 cm", "15 cm", "10 cm"],
        answerIndex: 3,
        explanation:
          "Total height = 5 × 12 = 60 cm. Take away 20 cm: 40 cm is left for 4 seedlings, so the mean is 40 ÷ 4 = 10 cm. 8 cm divides by 5 even though only 4 seedlings are left; 15 cm is 60 ÷ 4, forgetting to take away the 20; 12 cm assumes the mean can't change — but removing the tallest must lower it.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "What is the total height of all five seedlings?",
          "Remove the tallest. How many seedlings share what is left?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q15",
        question:
          "The ages of the people at a birthday party are 12, 13, 13, 14, 14, 15 and 79 (Grandma). Grandma goes home early. Which statement is true?",
        options: [
          "The median drops a lot, but the mean hardly changes",
          "The mean drops from about 22.9 to 13.5, but the median only changes from 14 to 13.5",
          "Nothing changes, because only one person left",
          "The mean drops from about 22.9 to 13.5, and the range stays the same",
        ],
        answerIndex: 1,
        explanation:
          "With Grandma: total 160, mean 160 ÷ 7 ≈ 22.9, median 14 (the 4th of 7). Without her: total 81, mean 81 ÷ 6 = 13.5, median (13 + 14) ÷ 2 = 13.5. The outlier was dragging the mean up; the median barely moves. The range collapses from 79 − 12 = 67 to 15 − 12 = 3, so it certainly doesn't stay the same.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Work out the mean and the median with Grandma, then without her.",
          "Which average was being pulled up by the 79?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q16",
        question:
          "The 60 m sprint times of 11 pupils are shown. Key: 9 | 4 means 9.4 seconds.\n\n| Stem | Leaves |\n|---|---|\n| 8 | 7 9 |\n| 9 | 0 2 4 5 8 |\n| 10 | 1 3 6 |\n| 11 | 2 |\n\nWhat is the median time?",
        options: ["95 s", "9.4 s", "9.5 s", "6 s"],
        answerIndex: 2,
        explanation:
          "There are 2 + 5 + 3 + 1 = 11 times, so the median is the 6th. Counting from the top: 8.7, 8.9, 9.0, 9.2, 9.4, **9.5**. Using the key, that's 9.5 seconds. 95 s ignores the key's decimal point (nobody takes 95 s to run 60 m); 9.4 s is the 5th value, one short; 6 is the median's position, not a time.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "Read the key carefully: what does 9 | 4 stand for?",
          "Count the leaves to find the median's position, then count along from the top row.",
        ],
        strategy: "Read the key",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q17",
        question:
          "The dot plots show how many books the members of two CCAs read during the holidays. Each dot is one pupil. Which statement correctly compares the two clubs?",
        diagram: `<svg viewBox="0 0 440 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two dot plots of books read. Chess Club: 1, 2, 2, 3, 3, 3, 4, 5, 8. Library Club: 3, 4, 4, 5, 5, 5, 6, 6, 7."><rect x="0" y="0" width="440" height="256" fill="#ffffff"/><text x="20" y="22" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">Chess Club</text><line x1="25" y1="100" x2="415" y2="100" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="100" x2="40" y2="105" stroke="#334155" stroke-width="1.5"/><text x="40" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">0</text><line x1="80" y1="100" x2="80" y2="105" stroke="#334155" stroke-width="1.5"/><text x="80" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><line x1="120" y1="100" x2="120" y2="105" stroke="#334155" stroke-width="1.5"/><text x="120" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><line x1="160" y1="100" x2="160" y2="105" stroke="#334155" stroke-width="1.5"/><text x="160" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><line x1="200" y1="100" x2="200" y2="105" stroke="#334155" stroke-width="1.5"/><text x="200" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><line x1="240" y1="100" x2="240" y2="105" stroke="#334155" stroke-width="1.5"/><text x="240" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><line x1="280" y1="100" x2="280" y2="105" stroke="#334155" stroke-width="1.5"/><text x="280" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><line x1="320" y1="100" x2="320" y2="105" stroke="#334155" stroke-width="1.5"/><text x="320" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><line x1="360" y1="100" x2="360" y2="105" stroke="#334155" stroke-width="1.5"/><text x="360" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><line x1="400" y1="100" x2="400" y2="105" stroke="#334155" stroke-width="1.5"/><text x="400" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">9</text><circle cx="80" cy="88" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="120" cy="88" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="120" cy="72" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="160" cy="88" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="160" cy="72" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="160" cy="56" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="200" cy="88" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="240" cy="88" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><circle cx="360" cy="88" r="7" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="20" y="132" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">Library Club</text><line x1="25" y1="210" x2="415" y2="210" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="210" x2="40" y2="215" stroke="#334155" stroke-width="1.5"/><text x="40" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">0</text><line x1="80" y1="210" x2="80" y2="215" stroke="#334155" stroke-width="1.5"/><text x="80" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><line x1="120" y1="210" x2="120" y2="215" stroke="#334155" stroke-width="1.5"/><text x="120" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><line x1="160" y1="210" x2="160" y2="215" stroke="#334155" stroke-width="1.5"/><text x="160" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><line x1="200" y1="210" x2="200" y2="215" stroke="#334155" stroke-width="1.5"/><text x="200" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><line x1="240" y1="210" x2="240" y2="215" stroke="#334155" stroke-width="1.5"/><text x="240" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><line x1="280" y1="210" x2="280" y2="215" stroke="#334155" stroke-width="1.5"/><text x="280" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><line x1="320" y1="210" x2="320" y2="215" stroke="#334155" stroke-width="1.5"/><text x="320" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><line x1="360" y1="210" x2="360" y2="215" stroke="#334155" stroke-width="1.5"/><text x="360" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><line x1="400" y1="210" x2="400" y2="215" stroke="#334155" stroke-width="1.5"/><text x="400" y="228" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">9</text><circle cx="160" cy="198" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="200" cy="198" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="200" cy="182" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="240" cy="198" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="240" cy="182" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="240" cy="166" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="280" cy="198" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="280" cy="182" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="320" cy="198" r="7" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="415" y="250" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">Number of books read</text></svg>`,
        options: [
          "Chess Club read more, because one of its members read 8 books",
          "Library Club read more on average, but Chess Club's numbers were more consistent",
          "The clubs can't be compared, because their ranges are different",
          "Library Club read more on average (median 5 vs 3), and their numbers were more consistent (range 4 vs 7)",
        ],
        answerIndex: 3,
        explanation:
          "Chess Club's 9 values are 1, 2, 2, 3, 3, 3, 4, 5, 8: median 3 (the 5th value), range 8 − 1 = 7. Library Club's are 3, 4, 4, 5, 5, 5, 6, 6, 7: median 5, range 7 − 3 = 4. So Library Club read more on a typical basis *and* were more consistent. One member reading 8 books doesn't make the whole club better, and a bigger range means *less* consistent. Different ranges don't stop you comparing — the range is part of the comparison.",
        difficulty: "challenge",
        guideRef: "comparing-distributions",
        hints: [
          "Read off each club's values from its dot plot.",
          "Find each club's median (the 5th of 9 values) and range.",
          "A smaller range means more consistent.",
        ],
        strategy: "Compare an average AND the spread",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q18",
        question:
          "Always, sometimes or never true? 'If Group A has a higher mean than Group B, then Group A also has a higher median.'",
        options: ["Sometimes true", "Always true", "Never true", "True only if the groups are the same size"],
        answerIndex: 0,
        explanation:
          "Sometimes. Often a higher mean does come with a higher median (A = 10, 10, 10 and B = 1, 1, 1). But an outlier can break it: A = 1, 1, 1, 1, 100 has mean 104 ÷ 5 = 20.8 but median 1, while B = 5, 5, 5, 5, 5 has mean 5 and median 5. A's mean is higher, yet its median is lower — and both groups have 5 values, so equal sizes don't rescue the statement. Always say which average you are comparing.",
        difficulty: "challenge",
        guideRef: "comparing-distributions",
        hints: [
          "Try to build a counter-example: can one huge value raise a mean without moving the median?",
          "Try Group A = 1, 1, 1, 1 and one very big number.",
        ],
        strategy: "Look for a counter-example",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q19",
        question:
          "Always, sometimes or never true? 'Adding a new value that is bigger than the current mean makes the mean go up.'",
        options: [
          "Sometimes true — only if the new value is also bigger than the median",
          "Never true — the mean only changes when a value is removed",
          "Always true",
          "Sometimes true — it depends on how many values there are",
        ],
        answerIndex: 2,
        explanation:
          "Always true. Say n values have mean m, so their total is nm. Add a value v bigger than m: the new total nm + v is bigger than nm + m = (n + 1)m, so the new mean {{(nm + v)/(n + 1)}} is bigger than m. Think of the mean as a water level: pouring in a value above the level raises it. The median plays no part, and the number of values only changes *how much* the mean rises, not whether it rises.",
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "Try it: the mean of 2, 4, 6 is 4. Add 5. Add 100.",
          "Use totals: if n values have mean m, what is their total? What is the new total after adding v?",
          "Compare the new total with (n + 1) × m.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "averages-spread-m2-q20",
        question:
          "The heights of 30 pupils are shown in the table. Which statement is correct?\n\n| Height, h (cm) | Frequency |\n|---|---|\n| 140 ≤ h < 150 | 5 |\n| 150 ≤ h < 160 | 11 |\n| 160 ≤ h < 170 | 8 |\n| 170 ≤ h < 180 | 6 |",
        options: [
          "The modal class is 150 ≤ h < 160, and the estimated mean is 155 cm",
          "The modal class is 150 ≤ h < 160, and the estimated mean is 160 cm",
          "The modal class is 150 ≤ h < 160, and the mean is exactly 160 cm",
          "The modal class is 11, and the estimated mean is 160 cm",
        ],
        answerIndex: 1,
        explanation:
          "The modal class has the highest frequency: 150 ≤ h < 160 (11 pupils). Using midpoints: 145 × 5 + 155 × 11 + 165 × 8 + 175 × 6 = 725 + 1705 + 1320 + 1050 = 4800, and 4800 ÷ 30 = 160 cm. It is only an *estimate* — we don't know the exact heights — so 'exactly 160 cm' claims too much. 155 cm comes from using the bottom of each class instead of the midpoint; 11 is the frequency, not the class.",
        difficulty: "challenge",
        guideRef: "grouped-data",
        hints: [
          "Which class has the highest frequency?",
          "For the mean, use each class's midpoint: 145, 155, 165, 175.",
          "Can a mean worked out from midpoints ever be exact?",
        ],
        strategy: "Use midpoints",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 3
  // =========================================================================
  {
    id: "averages-spread-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "averages-spread-m3-q01",
        question: "Without a calculator, which is the best estimate of the mean of 48.7, 51.2, 49.9, 50.4, 52.1?",
        options: ["About 250", "About 3.4", "About 50", "About 52"],
        answerIndex: 2,
        explanation:
          "Every value is close to 50, so the mean must be close to 50 — the mean always lies between the smallest and largest values. (Exactly: 252.3 ÷ 5 = 50.46.) About 250 is the total before dividing; 3.4 is the range (52.1 − 48.7); 52 is just the largest value.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["The mean must lie between the smallest and largest values. What number are all of these values close to?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q02",
        question: "A fruit stall sold this many durians on five days: 4, 8, 8, 10, 20. What are the mode and the range?",
        options: ["Mode 8, range 16", "Mode 2, range 16", "Mode 8, range 20", "Mode 10, range 16"],
        answerIndex: 0,
        explanation:
          "8 appears twice, more than any other value, so the mode is 8. Range = 20 − 4 = 16. 'Mode 2' gives how often 8 appears instead of the value; 'range 20' is just the largest value; 10 is the mean (50 ÷ 5), not the mode.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Mode: which value appears most often? Range: largest minus smallest."],
        strategy: "Recall the definitions",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q03",
        question:
          "Mr Lim records the heights of six pupils in cm: 148, 152, 155, 15.5, 157, 160. Which value is an outlier, and what should he do about it?",
        options: [
          "160 — it is the largest, so delete it",
          "148 — it is the smallest, so delete it",
          "15.5 — it is far from the rest, so it must be kept exactly as it is",
          "15.5 — no pupil is 15.5 cm tall, so it is probably a slip (for 155) and should be checked",
        ],
        answerIndex: 3,
        explanation:
          "An outlier is a value far from the rest — here 15.5 cm. No Year 8 pupil is 15.5 cm tall, so it's almost certainly a recording slip (probably 155 cm): check it, then correct or remove it. The largest and smallest values aren't automatically outliers — 148 cm and 160 cm are perfectly normal heights. Genuine outliers should be kept, but impossible ones shouldn't be used as they are.",
        difficulty: "warmup",
        guideRef: "choosing-an-average",
        hints: ["Which value is very different from the others? Is it even possible for a pupil?"],
        strategy: "Sense-check the data",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q04",
        question: "The bar chart shows the number of siblings of each pupil in a class. What is the modal number of siblings?",
        diagram: `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of number of siblings: 0 siblings frequency 3, 1 sibling frequency 8, 2 siblings frequency 6, 3 siblings frequency 3"><rect x="0" y="0" width="360" height="250" fill="#ffffff"/><line x1="50" y1="182" x2="340" y2="182" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="164" x2="340" y2="164" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="146" x2="340" y2="146" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="128" x2="340" y2="128" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="110" x2="340" y2="110" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="92" x2="340" y2="92" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="74" x2="340" y2="74" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="56" x2="340" y2="56" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="38" x2="340" y2="38" stroke="#e5e7eb" stroke-width="1"/><text x="42" y="204" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><text x="42" y="186" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="42" y="168" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="42" y="150" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="42" y="132" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="42" y="114" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="42" y="96" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="42" y="78" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">7</text><text x="42" y="60" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">8</text><text x="42" y="42" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">9</text><rect x="63.75" y="146" width="45" height="54" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="86.25" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">0</text><rect x="136.25" y="56" width="45" height="144" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="158.75" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">1</text><rect x="208.75" y="92" width="45" height="108" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="231.25" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">2</text><rect x="281.25" y="146" width="45" height="54" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="303.75" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">3</text><line x1="50" y1="200" x2="340" y2="200" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="30" x2="50" y2="200" stroke="#1f2937" stroke-width="1.5"/><text x="195" y="240" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Number of siblings</text><text x="16" y="119" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 119)">Frequency</text></svg>`,
        options: ["8", "1", "1.45", "3"],
        answerIndex: 1,
        explanation:
          "The tallest bar is above '1 sibling', so the mode is 1. 8 is the height of that bar — the number of pupils (the frequency), not the number of siblings. 1.45 is the mean (29 siblings ÷ 20 pupils), a different average; 3 is the largest number of siblings.",
        difficulty: "warmup",
        guideRef: "frequency-tables",
        hints: ["Find the tallest bar, then read the label underneath it — not its height."],
        strategy: "Read the diagram carefully",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q05",
        question:
          "The masses of nine Year 8 pupils are shown. Key: 4 | 2 means 42 kg.\n\n| Stem | Leaves |\n|---|---|\n| 3 | 8 9 |\n| 4 | 0 2 5 7 |\n| 5 | 1 3 6 |\n\nWhat is the median mass?",
        options: ["5 kg", "42 kg", "4 kg", "45 kg"],
        answerIndex: 3,
        explanation:
          "There are 2 + 4 + 3 = 9 values, so the median is the (9 + 1) ÷ 2 = 5th value. Counting from the top: 38, 39, 40, 42, **45**. The median is 45 kg. 5 is the median's *position*, not its value; 42 kg is the 4th value; 4 is the middle stem on its own.",
        difficulty: "warmup",
        guideRef: "stem-and-leaf-averages",
        hints: ["Count the leaves, then find the middle position. The diagram is already in order."],
        strategy: "Use the order in the diagram",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q06",
        question:
          "Priya counted the messages she received in each of six hours: 3, 7, 7, 8, 10, 13. Which statement about her data is true?",
        options: [
          "The median is greater than the mean",
          "The mode is the greatest of the three averages",
          "The mean is greater than the median, and the median is greater than the mode",
          "The mean and the median are equal",
        ],
        answerIndex: 2,
        explanation:
          "Mean = (3 + 7 + 7 + 8 + 10 + 13) ÷ 6 = 48 ÷ 6 = 8. Median: the middle two values are 7 and 8, so it's 7.5. Mode: 7 (it appears twice). So mean 8 > median 7.5 > mode 7. If you take the median as just 7 (one of the middle pair), you'd wrongly think the median and mode are equal; the large value 13 pulls the mean above the median.",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Work out all three: the mean, the median and the mode.",
          "With six values, the median is halfway between the 3rd and 4th.",
        ],
        strategy: "Work systematically",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q07",
        question: "Which data set is best summarised by its median rather than its mean?",
        options: [
          "Monthly pay at a small firm: $3000, $3200, $3400, $3500 and $25 000",
          "Heights of pupils in a class, spread evenly with no extreme values",
          "The favourite MRT line of 30 commuters",
          "Quiz scores of 5, 6, 6, 7 and 8",
        ],
        answerIndex: 0,
        explanation:
          "The pay data has an outlier, $25 000, which drags the mean up to $38 100 ÷ 5 = $7620 — far more than four of the five staff earn. The median, $3400, is much more typical. For evenly spread data with no extreme values (the heights, the quiz scores) the mean works well and uses every value. Favourite MRT lines aren't numbers, so only the mode makes sense there.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: ["Which data set has a value very far from the rest?", "Which data set isn't numerical at all?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q08",
        question:
          "Six numbers have a mean of 10. Four of them are 7, 9, 12 and 14. The other two numbers are equal. What is each of the two equal numbers?",
        options: ["18", "9", "10", "10.5"],
        answerIndex: 1,
        explanation:
          "Total of all six = 6 × 10 = 60. The four known numbers add up to 7 + 9 + 12 + 14 = 42, which leaves 60 − 42 = 18 for the two equal numbers: 9 each. 18 is their combined total, not each number; 10 assumes they equal the mean; 10.5 is the mean of the four known numbers.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "What must all six numbers add up to?",
          "How much is left over for the two missing numbers together?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q09",
        question:
          "Each pupil in a class counted the books in their school bag.\n\n| Books | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|\n| Pupils | 2 | 6 | 10 | 8 | 4 |\n\nWhich statement is true?",
        options: [
          "Mean 4, median 4, mode 10",
          "Mean 25.2, median 4, mode 4",
          "Mean 4.2, median 15.5, mode 4",
          "Mean 4.2, median 4, mode 4",
        ],
        answerIndex: 3,
        explanation:
          "Mode: 4 books has the highest frequency (10 pupils). Median: there are 30 pupils, so it's halfway between the 15th and 16th; the running total is 2, 8, 18, so both are 4 books. Mean: 2 × 2 + 3 × 6 + 4 × 10 + 5 × 8 + 6 × 4 = 126 books, and 126 ÷ 30 = 4.2. 'Mode 10' gives the frequency instead of the value; 'median 15.5' gives the position; 25.2 divides by the 5 columns instead of the 30 pupils.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "Find the total number of pupils first.",
          "For the median, keep a running total of the frequencies until you pass the middle position.",
          "For the mean, multiply each number of books by its frequency.",
        ],
        strategy: "Keep a running total",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q10",
        question:
          "Households on one floor of an HDB block were asked how many people live in their flat.\n\n| People | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|\n| Households | 3 | 12 | 8 | 5 | 2 |\n\nMarcus says: 'The median is 4, because 4 is in the middle of the People row.' What is the median?",
        options: ["4 — Marcus is right", "15.5", "3.5", "8"],
        answerIndex: 2,
        explanation:
          "There are 30 households, so the median is halfway between the 15th and 16th values. Running total: 3 households have 2 people, the next 12 (up to the 15th) have 3, and the 16th to 23rd have 4. So the 15th value is 3 and the 16th is 4: the median is 3.5 people. Marcus's 4 is just the middle column heading — it ignores how many households are in each column. 15.5 is the median's position, and 8 is the middle number of the Households row.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "How many households are there? Which two positions are in the middle?",
          "Keep a running total along the Households row: 3, 15, 23, …",
          "The 15th value is the last one in a column. What is the 16th?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q11",
        question:
          "The daily rainfall during 15 days of the monsoon is shown. Key: 2 | 3 means 23 mm.\n\n| Stem | Leaves |\n|---|---|\n| 0 | 4 7 9 |\n| 1 | 2 2 5 8 |\n| 2 | 0 3 3 3 6 |\n| 3 | 1 5 |\n| 4 | 8 |\n\nWhich statement is true?",
        options: [
          "The mode is 23 mm and the range is 44 mm",
          "The mode is 3 mm and the range is 9 mm",
          "The mode is 23 mm and the range is 4 mm",
          "The mode is 20 mm and the range is 48 mm",
        ],
        answerIndex: 0,
        explanation:
          "The leaf 3 appears three times on stem 2, so 23 mm is the mode. Range = largest − smallest = 48 − 4 = 44 mm (the top row's 0 | 4 means 4 mm). A mode of 3 mm and a range of 9 mm come from reading the leaves on their own; a range of 4 mm uses only the stems; 48 mm is just the largest value, and 20 mm is the median (the 8th value), not the mode.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "For the mode, look for a leaf repeated on the same stem.",
          "For the range, find the first value in the top row and the last value in the bottom row.",
        ],
        strategy: "Read the key",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q12",
        question:
          "Siti and Jun recorded their scores (out of 20) in five spelling quizzes.\n\n| | Quiz 1 | Quiz 2 | Quiz 3 | Quiz 4 | Quiz 5 |\n|---|---|---|---|---|---|\n| Siti | 14 | 15 | 15 | 16 | 15 |\n| Jun | 9 | 20 | 19 | 11 | 16 |\n\nWhich statement is the best comparison?",
        options: [
          "Jun did better, because he got the highest score, 20",
          "They did equally well on average, but Siti was more consistent",
          "Siti did better on average, because her range is smaller",
          "Their results are identical, because their means are equal",
        ],
        answerIndex: 1,
        explanation:
          "Both totals are 75, so both means are 75 ÷ 5 = 15 — equal on average. Siti's range is 16 − 14 = 2 and Jun's is 20 − 9 = 11, so Siti's scores were much more consistent. One high score of 20 doesn't make Jun better overall; a smaller range says nothing about who is higher on average; and equal means don't make the results identical — the spreads are very different.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: ["Work out each person's mean and range.", "If the averages are equal, what else can you compare?"],
        strategy: "Compare an average AND the spread",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q13",
        question:
          "Always, sometimes or never true? 'The mean of a set of numbers is never smaller than the smallest value and never bigger than the largest value.'",
        options: ["Never true", "Sometimes true", "True only when there are no negative numbers", "Always true"],
        answerIndex: 3,
        explanation:
          "Always true. The mean levels all the values out to the same height. Levelling only moves amounts from bigger values to smaller ones, so the level must end up somewhere from the smallest to the largest value. Negative numbers don't change this: the mean of −5, 1 and 1 is −3 ÷ 3 = −1, still between −5 and 1. It makes a great check — a mean outside the data's range must be wrong.",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Try a few small sets, including one with negative numbers.",
          "Think of the mean as levelling out. Can levelling ever make the level lower than the lowest value?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q14",
        question: "The mean of x, x + 2, x + 4, x + 6 and x + 8 is 20. What is x?",
        options: ["16", "20", "12", "18"],
        answerIndex: 0,
        explanation:
          "The total is 5 × 20 = 100, and x + (x + 2) + (x + 4) + (x + 6) + (x + 8) = 5x + 20. So 5x + 20 = 100, 5x = 80 and x = 16. Quicker: the values are evenly spaced, so the mean is the middle value: x + 4 = 20. 12 sets the *largest* value, x + 8, equal to the mean; 18 uses x + 2 as the middle; 20 forgets that x is the smallest value, not the mean.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "What is the total of the five values?",
          "Write the total in terms of x and make an equation.",
          "Or: for evenly spaced values, which value equals the mean?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q15",
        question:
          "A teacher timed eight pupils running 1 km (in minutes): 5.5, 6.0, 6.2, 6.4, 6.5, 6.8, 7.0, 15.0. The 15.0 belongs to a pupil who stopped to help a friend. If the 15.0 is removed, which of these changes by the most?",
        options: ["The mean", "The median", "The range", "They all change by the same amount"],
        answerIndex: 2,
        explanation:
          "Range: 15.0 − 5.5 = 9.5 drops to 7.0 − 5.5 = 1.5, a change of 8 minutes. Mean: 59.4 ÷ 8 ≈ 7.43 drops to 44.4 ÷ 7 ≈ 6.34, a change of about 1.1 minutes. Median: 6.45 drops to 6.4, a change of only 0.05. The range is built directly from the most extreme value, so one outlier can change it hugely. The mean is affected too, but the change is shared out over all the values.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Work out each measure with and without the 15.0.",
          "Which measure is built directly from the most extreme value?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q16",
        question:
          "The minutes that 11 pupils spent on a gaming app one evening are shown. Key: 2 | 4 means 24 minutes.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 5 8 |\n| 2 | 0 2 4 4 7 |\n| 3 | 1 3 5 |\n| 4 | |\n| 5 | |\n| 6 | |\n| 7 | |\n| 8 | |\n| 9 | 6 |\n\nWhich statement is best?",
        options: [
          "The median is 24 min, but the mean (about 31.4 min) is more typical because it uses every value",
          "The median is 24 min, and it is more typical than the mean, which the 96 drags up to about 31.4 min",
          "The median is 55.5 min, halfway between the smallest and largest values",
          "The mean is 24 min and the median is about 31.4 min",
        ],
        answerIndex: 1,
        explanation:
          "11 values, so the median is the 6th: 15, 18, 20, 22, 24, **24** — that's 24 minutes. The total is 345, so the mean is 345 ÷ 11 ≈ 31.4 minutes — higher than 8 of the 11 values, because the 96 pulls it up. So the median is the better 'typical' value here, even though the mean uses every value. 55.5 is halfway between 15 and 96, which isn't the median. The empty stems are a visual clue that 96 is an outlier.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "Count the leaves to find the median's position.",
          "Is there a value far away from the rest? What does it do to the mean?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q17",
        question:
          "Ten numbers have a mean of 20. Two of them, whose mean is 32, are removed. What is the mean of the remaining eight numbers?",
        options: ["21", "13.6", "17", "8"],
        answerIndex: 2,
        explanation:
          "Total of all ten = 10 × 20 = 200. The two removed numbers total 2 × 32 = 64. That leaves 136 for 8 numbers: 136 ÷ 8 = 17. 21 subtracts 32 only once (168 ÷ 8); 13.6 still divides by 10; 8 pretends 20 is halfway between 32 and the answer, which would only work if the two groups were the same size.",
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "Work with totals, not means.",
          "What is the total of all ten? What is the total of the two removed?",
          "Share what's left among the eight that remain.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q18",
        question:
          "Two buses were late every day for a week. The minutes late were:\n\n| Bus | Minutes late on 7 days |\n|---|---|\n| Bus 12 | 1, 10, 10, 10, 10, 10, 19 |\n| Bus 36 | 1, 4, 7, 10, 13, 16, 19 |\n\nWhich statement is true?",
        options: [
          "The buses are the same in every way that matters, because their means, medians and ranges are equal",
          "Bus 12 is more spread out, because it has more 10s",
          "Bus 36 has a bigger range, because all its values are different",
          "Their means, medians and ranges are equal, but Bus 12's values are bunched at 10 while Bus 36's are spread out",
        ],
        answerIndex: 3,
        explanation:
          "Both buses total 70 minutes over 7 days, so both means are 10; both medians are 10; both ranges are 19 − 1 = 18. But Bus 12 was exactly 10 minutes late on five of the seven days, while Bus 36's lateness was spread evenly from 1 to 19. The range only looks at the two extremes, so it can hide how bunched up the rest of the data is. Having more 10s makes Bus 12 *less* spread out, not more; and different values don't mean a bigger range.",
        difficulty: "challenge",
        guideRef: "comparing-distributions",
        hints: [
          "Work out the mean, median and range for both buses. What do you notice?",
          "If those are all equal, look at the actual values. Which bus is more predictable?",
        ],
        strategy: "Look beyond one number",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q19",
        question:
          "Four positive whole numbers have a mean, median, mode and range that are all equal to 4. What is the largest of the four numbers?",
        options: ["6", "8", "4", "5"],
        answerIndex: 0,
        explanation:
          "Total = 4 × 4 = 16. Write the numbers in order: a ≤ b ≤ c ≤ d. The median is (b + c) ÷ 2 = 4 and the mode is 4, so 4 appears at least twice. If b and c were different, one would be below 4 and one above, leaving no room for two 4s — so b = c = 4. Then a + d = 8 and d − a = 4, giving d = 6 and a = 2: the set is 2, 4, 4, 6. 4 can't be the largest — 4, 4, 4, 4 has range 0. 5 would need a = 1, but then the total is only 14. 8 adds the range to the mean.",
        difficulty: "challenge",
        guideRef: "mean-median-mode-range",
        hints: [
          "What do the four numbers add up to?",
          "The median and the mode are both 4. Where must the 4s go when the numbers are in order?",
          "Now you know the sum and the difference of the smallest and largest numbers.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "averages-spread-m3-q20",
        question:
          "Hana uses midpoints to estimate the mean distance that 25 pupils travel to school, and gets 3.08 km.\n\n| Distance, d (km) | Pupils |\n|---|---|\n| 0 < d ≤ 2 | 8 |\n| 2 < d ≤ 4 | 10 |\n| 4 < d ≤ 6 | 5 |\n| 6 < d ≤ 8 | 2 |\n\nWhich statement about the TRUE mean distance is correct?",
        options: [
          "It must be exactly 3.08 km",
          "It must be between 2.08 km and 4.08 km",
          "It could be anything from 0 km to 8 km",
          "It must be less than 3.08 km, because midpoints always overestimate",
        ],
        answerIndex: 1,
        explanation:
          "We don't know where each distance lies inside its class. If every pupil were at the bottom of their class, the mean would be (0 × 8 + 2 × 10 + 4 × 5 + 6 × 2) ÷ 25 = 52 ÷ 25 = 2.08 km. If every pupil were at the top, it would be (2 × 8 + 4 × 10 + 6 × 5 + 8 × 2) ÷ 25 = 102 ÷ 25 = 4.08 km. So the true mean is between 2.08 km and 4.08 km, and Hana's midpoint estimate, 77 ÷ 25 = 3.08 km, sits in the middle. It isn't exact, and midpoints don't always over- or underestimate. '0 km to 8 km' ignores the frequencies — not every pupil can be at 0 km.",
        difficulty: "challenge",
        guideRef: "grouped-data",
        hints: [
          "What is the smallest possible distance in each class? The largest?",
          "Work out the mean if every pupil were at the bottom of their class.",
          "Now do the same for the top of each class.",
        ],
        strategy: "Consider extremes",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 4
  // =========================================================================
  {
    id: "averages-spread-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "averages-spread-m4-q01",
        question: "Siti records how many emails she gets each day for six days: 0, 3, 1, 0, 2, 0. What is the mean number of emails per day?",
        options: ["2", "0", "6", "1"],
        answerIndex: 3,
        explanation:
          "Total = 0 + 3 + 1 + 0 + 2 + 0 = 6 emails over 6 days, so the mean is 6 ÷ 6 = 1. The days with 0 emails still count as days: 2 comes from dividing by only the 3 non-zero days. 0 is the mode and 6 is the total.",
        difficulty: "warmup",
        guideRef: "mean-median-mode-range",
        hints: ["Do the days with 0 emails count towards the number of values?"],
        strategy: "Count every value",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q02",
        question: "The range of the heights of the pupils in class 8C is 32 cm. What does this tell you?",
        options: [
          "The mean height is 32 cm",
          "The tallest pupil is 32 cm taller than the shortest",
          "The tallest pupil is 32 cm tall",
          "Half of the pupils are taller than 32 cm",
        ],
        answerIndex: 1,
        explanation:
          "Range = tallest − shortest, so it measures the gap between the two extremes: the tallest pupil is 32 cm taller than the shortest. It isn't an average, it isn't anyone's actual height, and it says nothing about how many pupils are above any value.",
        difficulty: "warmup",
        guideRef: "choosing-an-average",
        hints: ["How is the range calculated?"],
        strategy: "Recall the definitions",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q03",
        question: "You add 2 to every number in a list. What happens to the mean?",
        options: ["It stays the same", "It doubles", "It goes up by 2", "It goes up by 2 × (how many numbers there are)"],
        answerIndex: 2,
        explanation:
          "Try it: 1, 2, 3 has mean 2, and 3, 4, 5 has mean 4 — up by 2. In general, if there are n numbers, the total goes up by 2 × n, and dividing by n again makes the mean go up by exactly 2. '2 × how many numbers' is the change in the *total*, not in the mean.",
        difficulty: "warmup",
        guideRef: "working-backwards",
        hints: ["Try it with a small list: what is the mean of 1, 2, 3? Of 3, 4, 5?"],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q04",
        question:
          "The table shows how many bubble teas 20 pupils bought last week.\n\n| Bubble teas | 0 | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|---|\n| Pupils | 6 | 7 | 4 | 3 | 0 |\n\nWhat is the range of the number of bubble teas bought?",
        options: ["3", "4", "7", "5"],
        answerIndex: 0,
        explanation:
          "Nobody bought 4 (its frequency is 0), so the largest value actually in the data is 3 and the smallest is 0. Range = 3 − 0 = 3. 4 includes a column that no pupil is in; 7 is the range of the frequencies (7 − 0), not of the data; 5 is the number of columns.",
        difficulty: "warmup",
        guideRef: "frequency-tables",
        hints: ["Which values did at least one pupil actually give? Watch the column with frequency 0."],
        strategy: "Read the table carefully",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q05",
        question:
          "The long-jump distances of 10 pupils are shown. Key: 1 | 6 means 1.6 m.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 6 8 9 |\n| 2 | 1 3 3 3 7 |\n| 3 | 0 2 |\n\nWhat are the mode and the range?",
        options: ["Mode 23 m, range 16 m", "Mode 3 m, range 1.6 m", "Mode 2.3 m, range 1.6 m", "Mode 2.3 m, range 2 m"],
        answerIndex: 2,
        explanation:
          "Using the key, the leaf 3 on stem 2 appears three times, so the mode is 2.3 m. The shortest jump is 1.6 m and the longest is 3.2 m, so the range is 3.2 − 1.6 = 1.6 m. 23 m and 16 m forget the key's decimal point; 3 m is a leaf on its own; 2 m uses only the stems (3 − 1).",
        difficulty: "warmup",
        guideRef: "stem-and-leaf-averages",
        hints: ["Use the key: 1 | 6 means 1.6 m. Which leaf repeats on the same stem? Which values are at the two ends?"],
        strategy: "Read the key",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q06",
        question: "The 6 a.m. temperatures (°C) at the top of a mountain on six days were −3, 4, −7, 0, −1, 6. What is the median temperature?",
        options: ["0.5 °C", "−1 °C", "−3.5 °C", "−0.5 °C"],
        answerIndex: 3,
        explanation:
          "Order them from smallest to largest, using a number line: −7, −3, −1, 0, 4, 6. The two middle values are −1 and 0, so the median is (−1 + 0) ÷ 2 = −0.5 °C. −3.5 °C uses the middle of the unsorted list (−7 and 0); 0.5 °C comes from ordering by size while ignoring the signs, which puts −3 and 4 in the middle; −1 °C is only one of the two middle values.",
        difficulty: "core",
        guideRef: "mean-median-mode-range",
        hints: [
          "Place the numbers on a number line to order them — −7 is the smallest.",
          "With six values, the median is halfway between the 3rd and 4th.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q07",
        question: "A survey finds that the mean number of children per family is 2.4. Which statement is correct?",
        options: [
          "This must be a mistake, because no family can have 2.4 children",
          "A mean doesn't have to be a possible value: 2.4 could mean 24 children shared among 10 families",
          "It means most families have 2 or 3 children",
          "It should be rounded to 2, because averages must be whole numbers",
        ],
        answerIndex: 1,
        explanation:
          "The mean is total ÷ number of families, so it can be a decimal even when every value is a whole number: for example, 24 children across 10 families gives 2.4. It doesn't have to match any real family. It also doesn't tell you what *most* families look like — that's closer to what the mode tells you. Rounding it to 2 throws information away.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "Which two numbers are divided to get the mean?",
          "If 10 families have 24 children altogether, what is the mean?",
        ],
        strategy: "Interpret in context",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q08",
        question: "How many 10s must be added to the list 2, 4, 6 so that the mean of the new list is 8?",
        options: ["6", "3", "1", "12"],
        answerIndex: 0,
        explanation:
          "Think of balancing around 8. The values 2, 4 and 6 are 6, 4 and 2 below 8 — a total shortfall of 12. Each 10 is 2 above 8, so you need 12 ÷ 2 = 6 tens. Check: (2 + 4 + 6 + 6 × 10) ÷ 9 = 72 ÷ 9 = 8. 12 is the shortfall itself, not the number of tens; 3 just matches how many values are already there; one 10 only lifts the mean to 22 ÷ 4 = 5.5.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "How far below 8 are 2, 4 and 6 altogether?",
          "How far above 8 is each 10?",
          "Or use totals: with k tens, (12 + 10k) ÷ (3 + k) = 8.",
        ],
        strategy: "Use a balance",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q09",
        question: "The bar chart shows how many CCA sessions 20 pupils attended last week. What is the mean number of sessions per pupil?",
        diagram: `<svg viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of CCA sessions attended: 0 sessions frequency 4, 1 session 7, 2 sessions 5, 3 sessions 3, 4 sessions 1"><rect x="0" y="0" width="380" height="250" fill="#ffffff"/><line x1="50" y1="180" x2="360" y2="180" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="160" x2="360" y2="160" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="140" x2="360" y2="140" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="120" x2="360" y2="120" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="100" x2="360" y2="100" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="80" x2="360" y2="80" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="60" x2="360" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="40" x2="360" y2="40" stroke="#e5e7eb" stroke-width="1"/><text x="42" y="204" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><text x="42" y="184" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="42" y="164" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="42" y="144" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="42" y="124" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="42" y="104" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="42" y="84" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="42" y="64" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">7</text><text x="42" y="44" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">8</text><rect x="62" y="120" width="38" height="80" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="81" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">0</text><rect x="124" y="60" width="38" height="140" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="143" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">1</text><rect x="186" y="100" width="38" height="100" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="205" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">2</text><rect x="248" y="140" width="38" height="60" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="267" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">3</text><rect x="310" y="180" width="38" height="20" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="329" y="216" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">4</text><line x1="50" y1="200" x2="360" y2="200" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="32" x2="50" y2="200" stroke="#1f2937" stroke-width="1.5"/><text x="205" y="240" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Number of CCA sessions attended</text><text x="16" y="120" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" transform="rotate(-90 16 120)">Frequency</text></svg>`,
        options: ["2", "4", "1.5", "6"],
        answerIndex: 2,
        explanation:
          "Read the bar heights: 4, 7, 5, 3 and 1 pupils (20 in total). Total sessions = 0 × 4 + 1 × 7 + 2 × 5 + 3 × 3 + 4 × 1 = 0 + 7 + 10 + 9 + 4 = 30. Mean = 30 ÷ 20 = 1.5. 2 is the middle of 0 to 4, ignoring the bar heights; 6 divides the 30 sessions by the 5 bars instead of the 20 pupils; 4 is 20 pupils ÷ 5 bars.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "Each bar's height is the number of pupils who attended that many sessions.",
          "Total sessions = add up (sessions × pupils) for each bar.",
          "Divide by the total number of pupils, not the number of bars.",
        ],
        strategy: "Add an fx column",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q10",
        question:
          "The stem-and-leaf diagram shows 10 values. Key: 3 | 5 means 35.\n\n| Stem | Leaves |\n|---|---|\n| 2 | 4 6 9 |\n| 3 | 1 3 5 8 |\n| 4 | 0 2 6 |\n\nOne more value, 47, is added. What is the new median?",
        options: ["34", "35", "33", "40.5"],
        answerIndex: 1,
        explanation:
          "Before: 10 values, so the median was halfway between the 5th and 6th, 33 and 35, which is 34. After adding 47 there are 11 values, so the median is the 6th: 24, 26, 29, 31, 33, **35**. The new median is 35. Adding one value above the median nudges it up by half a position, not by a lot. 34 assumes the median can't change; 33 stops at the 5th value; 40.5 averages the old median with the new value, which isn't how medians work.",
        difficulty: "core",
        guideRef: "stem-and-leaf-averages",
        hints: [
          "How many values are there after 47 is added?",
          "Which position is the middle of 11 values?",
          "47 goes at the end of the bottom row, so the first values don't move.",
        ],
        strategy: "Use the order in the diagram",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q11",
        question:
          "Daily rainfall in Singapore was recorded for one December and the following July.\n\n| Month | Median daily rainfall | Range |\n|---|---|---|\n| December | 6 mm | 58 mm |\n| July | 2 mm | 31 mm |\n\nWhich comparison is correct?",
        options: [
          "July was wetter on a typical day, because its range is smaller",
          "December was wetter on a typical day, and its daily rainfall was more consistent",
          "December's rainfall was more varied, so on a typical day it rained less",
          "On a typical day December was wetter (median 6 mm vs 2 mm), and its daily rainfall varied more (range 58 mm vs 31 mm)",
        ],
        answerIndex: 3,
        explanation:
          "Compare the medians: 6 mm > 2 mm, so a typical December day was wetter. Compare the ranges: 58 mm > 31 mm, so December's daily rainfall varied more — it was *less* consistent. A smaller range doesn't mean more rain; it means the amounts were closer together. And being more varied doesn't make the typical day drier.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Use the medians to decide which month was wetter on a typical day.",
          "Use the ranges to decide which month's rainfall was more variable. Does a big range mean consistent or varied?",
        ],
        strategy: "Compare an average AND the spread",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q12",
        question:
          "Two teams did as many push-ups as they could. Team Red: 12, 14, 15, 15, 16, 70. Team Blue: 18, 19, 20, 21, 22, 23. Red's captain says Red did better because Red's mean is higher. Which response is most sensible?",
        options: [
          "Blue did better on a typical basis: Blue's median (20.5) beats Red's (15), and Red's mean is inflated by one outlier, 70",
          "Red did better, because Red's mean (about 23.7) is higher than Blue's (20.5)",
          "Red did better, because Red has the highest single score",
          "The teams did equally well, because both have 6 members",
        ],
        answerIndex: 0,
        explanation:
          "Red's mean is (12 + 14 + 15 + 15 + 16 + 70) ÷ 6 = 142 ÷ 6 ≈ 23.7, but five of Red's six members did 16 or fewer — the 70 drags the mean up. The medians tell the typical story: Red (15 + 15) ÷ 2 = 15, Blue (20 + 21) ÷ 2 = 20.5. Every Blue member beat five of the six Red members. When one group has an outlier, compare medians. One high score doesn't make a whole team better, and equal team sizes say nothing about performance.",
        difficulty: "core",
        guideRef: "comparing-distributions",
        hints: [
          "Work out both means and both medians.",
          "Is one value in Team Red very different from the rest? Which average does it distort?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q13",
        question: "Five quiz scores, each out of 10, have a mean of 9. What is the lowest score that could be one of them?",
        options: ["0", "8", "5", "9"],
        answerIndex: 2,
        explanation:
          "The five scores total 5 × 9 = 45. To make one score as low as possible, make the other four as high as possible: 4 × 10 = 40. That leaves 45 − 40 = 5, so the lowest possible score is 5 (from 10, 10, 10, 10, 5). 0 is impossible — the other four would need 45 between them, more than the maximum of 40. 8 and 9 are just guesses near the mean.",
        difficulty: "core",
        guideRef: "working-backwards",
        hints: [
          "What must the five scores add up to?",
          "To push one score down as far as possible, what should the other four scores be?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q14",
        question:
          "40 pupils did a 5-question quiz.\n\n| Correct answers | Pupils |\n|---|---|\n| 1 | 2 |\n| 2 | 5 |\n| 3 | 9 |\n| 4 | 14 |\n| 5 | 10 |\n\nWhich statement is true?",
        options: [
          "The mean is 4 and the median is 3.625",
          "The median (4) is bigger than the mean (3.625)",
          "The mean and the median are both 3, the middle of 1 to 5",
          "The median is 20.5, because there are 40 pupils",
        ],
        answerIndex: 1,
        explanation:
          "Median: 40 pupils, so it's halfway between the 20th and 21st values; the running total is 2, 7, 16, 30, so both are 4 → median 4. Mean: 1 × 2 + 2 × 5 + 3 × 9 + 4 × 14 + 5 × 10 = 2 + 10 + 27 + 56 + 50 = 145, and 145 ÷ 40 = 3.625. So the median is bigger. Swapping the two values mixes up the averages; 20.5 is the median's position, not its value; 3 ignores the frequencies.",
        difficulty: "core",
        guideRef: "frequency-tables",
        hints: [
          "How many pupils are there? Which positions are in the middle?",
          "Use a running total for the median and an fx column for the mean.",
          "Compare the two values you get.",
        ],
        strategy: "Keep a running total",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q15",
        question:
          "The ages of seven children at a playground are 2, 3, 3, 8, 9, 11, 13. Hana says the mode, 3, is a good summary of their ages. Why is she wrong?",
        options: [
          "Only two children are 3; most are much older, so the median (8) or the mean (7) is more typical",
          "The mode should be 13, the biggest value",
          "There is no mode, because only two values match",
          "She isn't wrong — the mode is always the best average for numbers",
        ],
        answerIndex: 0,
        explanation:
          "The mode is the most common value, but here 3 appears only twice and four of the seven children are 8 or older. The median (the 4th value, 8) and the mean (49 ÷ 7 = 7) describe the group much better. There *is* a mode — 3 — it just isn't typical. The mode works best for non-numerical data or when one value clearly dominates; it isn't always the best average.",
        difficulty: "core",
        guideRef: "choosing-an-average",
        hints: [
          "How many of the children are actually aged 3?",
          "Work out the median and the mean. Which average is furthest from the middle of the data?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q16",
        question:
          "The masses of 30 school bags are shown.\n\n| Mass, m (kg) | Bags |\n|---|---|\n| 2 < m ≤ 4 | 10 |\n| 4 < m ≤ 6 | 9 |\n| 6 < m ≤ 8 | 8 |\n| 8 < m ≤ 10 | 3 |\n\nWhich statement is correct?",
        options: [
          "The modal class is 2 < m ≤ 4, and the median is in 2 < m ≤ 4 too",
          "The modal class is 10, and the median is 15.5 kg",
          "The modal class is 8 < m ≤ 10, and the median is in 4 < m ≤ 6",
          "The modal class is 2 < m ≤ 4, and the median is in 4 < m ≤ 6",
        ],
        answerIndex: 3,
        explanation:
          "The modal class has the highest frequency: 2 < m ≤ 4 (10 bags). For the median, 30 bags means halfway between the 15th and 16th. The running total is 10 after the first class and 19 after the second, so the 15th and 16th bags are both in 4 < m ≤ 6. The median doesn't have to be in the modal class; 10 is a frequency, not a class; 15.5 is a position, not a mass; and 8 < m ≤ 10 holds the heaviest bags, not the most bags.",
        difficulty: "core",
        guideRef: "grouped-data",
        hints: [
          "Which class has the highest frequency?",
          "For the median, find the middle position, then keep a running total of the frequencies.",
        ],
        strategy: "Keep a running total",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q17",
        question:
          "In this frequency table the mean score is exactly 2.\n\n| Score | 1 | 2 | 3 |\n|---|---|---|---|\n| Frequency | 5 | k | 5 |\n\nWhat can you say about the missing frequency k?",
        options: ["k must be 5", "k can be any whole number (0, 1, 2, …)", "k must be 2", "k must be 0"],
        answerIndex: 1,
        explanation:
          "The 1s and 3s balance each other: five scores are 1 below 2 and five are 1 above 2. Check with totals: 1 × 5 + 2k + 3 × 5 = 20 + 2k = 2(10 + k), and there are 10 + k scores, so the mean is exactly 2 whatever k is. Adding more 2s can't move a mean that is already 2. 'k must be 5' assumes all the frequencies match; 'k must be 2' mixes up the frequency with the score; k = 0 works, but so does every other value.",
        difficulty: "challenge",
        guideRef: "frequency-tables",
        hints: [
          "Try k = 0, then k = 10. What is the mean each time?",
          "How far are the 1s and 3s from 2? Do they balance?",
          "Write the total as an expression in k and divide by the number of scores.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q18",
        question:
          "Waiting times at two hawker stalls were recorded over many lunchtimes.\n\n| Stall | Median wait | Range of waits |\n|---|---|---|\n| A | 8 min | 4 min |\n| B | 6 min | 25 min |\n\nYou can wait at most 12 minutes. Based on these results, which stall is the safer choice?",
        options: [
          "Stall B, because its median wait is shorter",
          "Either — the medians differ by only 2 minutes",
          "Stall A: no recorded wait was over 12 minutes, but Stall B had at least one wait of 25 minutes or more",
          "Stall B, because its bigger range means it is sometimes very quick",
        ],
        answerIndex: 2,
        explanation:
          "At Stall A the shortest wait was at most 8 minutes (it can't be above the median), and the longest was only 4 minutes more than the shortest, so no recorded wait was longer than 8 + 4 = 12 minutes. At Stall B the longest wait was 25 minutes more than the shortest, and the shortest is at least 0, so some wait was at least 25 minutes. B's lower median makes it quicker on a typical day, but with a fixed limit it's a gamble. A big range means *unpredictable*, not quick.",
        difficulty: "challenge",
        guideRef: "comparing-distributions",
        hints: [
          "At Stall A, what is the largest the shortest wait could be? (Think about the median.)",
          "Now add the range. What is the longest possible wait at Stall A?",
          "At Stall B, the longest wait is the shortest plus 25. What does that tell you?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q19",
        question:
          "Always, sometimes or never true? 'Moving one person from Group A to Group B can make the mean of BOTH groups go up.'",
        options: [
          "Sometimes true",
          "Always true",
          "Never true — if one group's mean goes up, the other's must go down",
          "Never true — the combined total doesn't change, so both means can't rise",
        ],
        answerIndex: 0,
        explanation:
          "Sometimes true — and it surprises most people. It happens when the person's value is below A's mean (so A loses a 'low' value) but above B's mean (so B gains a 'high' value). Example: A = 10, 20, 30 (mean 20) and B = 1, 2, 3 (mean 2). Move the 10: A becomes 20, 30 (mean 25) and B becomes 1, 2, 3, 10 (mean 4). Both rise! The combined total doesn't change, but the group sizes do, so both means can still go up. It isn't always true: move the 30 instead and A's mean falls to 15.",
        difficulty: "challenge",
        guideRef: "working-backwards",
        hints: [
          "Try it with small groups: make up a Group A and a Group B.",
          "What kind of value, if removed, makes A's mean go up? What kind, if added, makes B's mean go up?",
          "Can one value be both of those at once?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "averages-spread-m4-q20",
        question:
          "Jun uses midpoints to estimate the mean journey time of 30 pupils from this table, and gets 27 minutes.\n\n| Time, t (minutes) | Pupils |\n|---|---|\n| 0 < t ≤ 15 | 6 |\n| 15 < t ≤ 30 | 12 |\n| 30 < t ≤ 45 | 9 |\n| 45 < t ≤ 60 | 3 |\n\nHe then finds out that every pupil's time was at the very top of their class (exactly 15, 30, 45 or 60 minutes). What is the true mean?",
        options: ["27 minutes", "42 minutes", "60 minutes", "34.5 minutes"],
        answerIndex: 3,
        explanation:
          "Each midpoint (7.5, 22.5, 37.5, 52.5) is 7.5 minutes below the top of its class. If every time is really 7.5 minutes more than Jun assumed, the mean is 7.5 more too: 27 + 7.5 = 34.5 minutes. Check: (15 × 6 + 30 × 12 + 45 × 9 + 60 × 3) ÷ 30 = 1035 ÷ 30 = 34.5. 42 minutes adds a whole class width (15) instead of half of one; 27 minutes ignores the new information; 60 minutes is just the top of the last class.",
        difficulty: "challenge",
        guideRef: "grouped-data",
        hints: [
          "How far is each midpoint from the top of its class?",
          "If every value goes up by the same amount, what happens to the mean?",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },
];
