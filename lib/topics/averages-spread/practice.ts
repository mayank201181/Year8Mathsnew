import type { TopicPractice } from "../../types.ts";

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK-CHECK QUIZ — 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "averages-spread-quiz-q01",
      question: "Find the median of 8, 3, 11, 5, 9.",
      options: ["8", "11", "7.2", "3"],
      answerIndex: 0,
      explanation:
        "In order the values are 3, 5, 8, 9, 11, and the middle (3rd) value is **8**. 11 is the middle of the list *as written*: you must order the data first. 7.2 is the mean (36 ÷ 5), not the median, and 3 is the *position* of the median, not its value.",
      difficulty: "warmup",
      guideRef: "mean-median-mode-range",
      hints: ["What must you do to the list before you look for the middle?"],
      strategy: "Order the data first",
    },
    {
      kind: "mcq",
      id: "averages-spread-quiz-q02",
      question:
        "A shoe shop records the size of every pair of school shoes it sells. It wants to know which size to order the most of. Which measure should it use?",
      options: ["The mean", "The mode", "The median", "The range"],
      answerIndex: 1,
      explanation:
        "The shop needs the size that sells **most often**, which is the mode. The mean could come out as something like 5.7, a size that doesn't exist, and the median is just the middle size, not necessarily the most popular one. The range isn't an average at all: it measures how spread out the sizes are.",
      difficulty: "warmup",
      guideRef: "choosing-an-average",
      hints: ["Which average tells you what is most popular?"],
    },
    {
      kind: "short",
      id: "averages-spread-quiz-q03",
      question:
        "The lowest temperatures on five winter nights in Beijing were −4 °C, 3 °C, −7 °C, 5 °C and 0 °C. Find the range of the temperatures, in °C.",
      answer: { type: "number", value: 12, display: "12 °C" },
      solution: [
        "Largest value = 5 °C. Smallest value = −7 °C (the coldest night).",
        "Range = 5 − (−7) = 5 + 7 = 12 °C.",
      ],
      commonError: "Writing 5 − 7 = −2. Subtracting −7 means adding 7, and a range can never be negative.",
      traps: [
        { spec: { type: "number", value: -2 }, feedback: "You worked out 5 − 7. The smallest value is −7, so the range is 5 − (−7) = 5 + 7." },
        { spec: { type: "number", value: 9 }, feedback: "You used −4 as the smallest value, but −7 °C is colder, so it is smaller." },
      ],
      difficulty: "warmup",
      guideRef: "mean-median-mode-range",
      hints: ["Which temperature is the smallest? Careful: it's the most negative one.", "Range = largest − smallest. Subtracting a negative number means adding."],
    },
    {
      kind: "short",
      id: "averages-spread-quiz-q04",
      question: "The mean of four numbers is 7. Three of the numbers are 5, 9 and 4. Find the fourth number.",
      answer: { type: "number", value: 10 },
      solution: [
        "Total of all four numbers = mean × count = 7 × 4 = 28.",
        "The three known numbers add up to 5 + 9 + 4 = 18.",
        "Fourth number = 28 − 18 = 10.",
        "Check: (5 + 9 + 4 + 10) ÷ 4 = 28 ÷ 4 = 7 ✓",
      ],
      commonError: "Multiplying the mean by 3 instead of 4. The total must include all four numbers.",
      traps: [
        { spec: { type: "number", value: 3 }, feedback: "You used 3 × 7 = 21 as the total, but there are four numbers, so the total is 4 × 7 = 28." },
        { spec: { type: "number", value: 6 }, feedback: "6 is the mean of the three numbers you were given. The fourth number has to bring the total up to 4 × 7 = 28." },
      ],
      difficulty: "core",
      guideRef: "working-backwards",
      hints: [
        "If you knew the total of all four numbers, could you find the missing one?",
        "Total = mean × number of values.",
        "The total is 28. What do the three numbers you know add up to?",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "mcq",
      id: "averages-spread-quiz-q05",
      question:
        "The table shows how many siblings each pupil in a class has.\n\n| Number of siblings | Frequency |\n|---|---|\n| 0 | 4 |\n| 1 | 9 |\n| 2 | 5 |\n| 3 | 2 |\n\nWhat is the mean number of siblings?",
      options: ["1.5", "6.25", "1.25", "5"],
      answerIndex: 2,
      explanation:
        "Multiply each value by its frequency: 0 × 4 + 1 × 9 + 2 × 5 + 3 × 2 = 25 siblings altogether, shared between 4 + 9 + 5 + 2 = 20 pupils. 25 ÷ 20 = **1.25**. 6.25 comes from dividing 25 by 4 (the number of rows) instead of by 20 pupils; 1.5 is the mean of 0, 1, 2 and 3, which ignores the frequencies; 5 is the mean of the frequencies.",
      difficulty: "core",
      guideRef: "frequency-tables",
      hints: [
        "How many siblings are there altogether? How many pupils are there?",
        "Add an fx column: value × frequency.",
        "Mean = total of fx ÷ total frequency.",
      ],
      strategy: "Add an fx column",
    },
    {
      kind: "short",
      id: "averages-spread-quiz-q06",
      question:
        "The stem-and-leaf diagram shows the times, in seconds, that 12 pupils took to solve a puzzle. Key: 2 | 5 means 25 seconds.\n\n| Stem | Leaves |\n|---|---|\n| 2 | 5 7 9 |\n| 3 | 0 2 2 6 8 |\n| 4 | 1 3 7 |\n| 5 | 4 |\n\nFind the median time in seconds.",
      answer: { type: "number", value: 34, display: "34 seconds" },
      solution: [
        "Count the leaves: 3 + 5 + 3 + 1 = 12 times.",
        "The median is the {{(12+1)/2 = 6.5}}th value, halfway between the 6th and 7th values.",
        "Stem 2 holds the 1st to 3rd values. Counting along stem 3: 4th = 30, 5th = 32, 6th = 32, 7th = 36.",
        "Median = {{(32 + 36)/2 = 34}} seconds.",
      ],
      commonError: "Taking just the 6th value. With an even number of values the median is halfway between the two middle ones.",
      traps: [
        { spec: { type: "number", value: 32 }, feedback: "32 is the 6th value. With 12 values the median is halfway between the 6th and 7th values." },
        { spec: { type: "number", value: 36 }, feedback: "36 is the 7th value. With 12 values the median is halfway between the 6th and 7th values." },
      ],
      difficulty: "core",
      guideRef: "stem-and-leaf-averages",
      hints: [
        "How many leaves are there?",
        "With an even number of values, the median is halfway between two values. Which two positions?",
        "Skip stem 2 (3 values), then count along stem 3 to the 6th and 7th values.",
      ],
      strategy: "Use row totals to skip ahead",
    },
    {
      kind: "mcq",
      id: "averages-spread-quiz-q07",
      question:
        "Two Year 8 classes sat the same science test.\n\n| Class | Mean mark | Range |\n|---|---|---|\n| 8A | 62 | 15 |\n| 8B | 58 | 40 |\n\nWhich statement is a correct comparison?",
      options: [
        "On average 8B did better, because its range is bigger.",
        "8A's marks were more spread out, because its mean is higher.",
        "Every pupil in 8A scored more than every pupil in 8B.",
        "On average 8A did better (mean 62 compared with 58), and 8A's marks were more consistent (range 15 compared with 40).",
      ],
      answerIndex: 3,
      explanation:
        "The mean compares the typical mark: 62 > 58, so 8A did better on average. The range compares the spread: 15 < 40, so 8A's marks were more consistent. Saying 8B did better 'because its range is bigger' mixes up spread with average. A higher mean also does not mean *every* 8A pupil beat every 8B pupil: with a range of 40, some 8B pupils probably scored very highly.",
      difficulty: "core",
      guideRef: "comparing-distributions",
      hints: [
        "Which number describes a typical mark, and which describes how spread out the marks are?",
        "A smaller range means more consistent marks.",
      ],
      strategy: "Compare centre, then spread",
    },
    {
      kind: "short",
      id: "averages-spread-quiz-q08",
      question:
        "Six pupils timed their walk to school, in minutes: 13, 16, 12, 56, 15, 14. The 56 was a pupil who stopped for breakfast at a hawker centre. If the 56 is removed, by how many minutes does the mean go down?",
      answer: { type: "number", value: 7, display: "7 minutes" },
      solution: [
        "With the 56: total = 13 + 16 + 12 + 56 + 15 + 14 = 126, so the mean = 126 ÷ 6 = 21 minutes.",
        "Without it: total = 126 − 56 = 70, and there are now 5 times, so the mean = 70 ÷ 5 = 14 minutes.",
        "The mean goes down by 21 − 14 = 7 minutes.",
        "Compare the median: it only moves from 14.5 to 14 minutes. One outlier dragged the mean up by 7 minutes, which is why the median is often the better average when there is an outlier.",
      ],
      commonError: "Dividing by 6 again after removing a value. Only 5 times are left.",
      traps: [
        { spec: { type: "number", value: 21 }, feedback: "21 minutes is the mean of all six times. The question asks how much the mean *goes down*." },
        { spec: { type: "number", value: 14 }, feedback: "14 minutes is the new mean. Subtract it from the old mean to find how much it went down." },
      ],
      difficulty: "core",
      guideRef: "choosing-an-average",
      hints: [
        "Find the mean of all six times first.",
        "Now take 56 off the total, and remember that only 5 times are left.",
        "Old mean 21, new mean …?",
      ],
    },
    {
      kind: "short",
      id: "averages-spread-quiz-q09",
      question:
        "The table shows how long 20 pupils spent reading last night.\n\n| Time, t (minutes) | Frequency |\n|---|---|\n| {{0 <= t < 10}} | 3 |\n| {{10 <= t < 20}} | 8 |\n| {{20 <= t < 30}} | 7 |\n| {{30 <= t < 40}} | 2 |\n\nEstimate the mean time, in minutes.",
      answer: { type: "number", value: 19, display: "19 minutes" },
      solution: [
        "Use the midpoint of each class: 5, 15, 25 and 35 minutes.",
        "Midpoint × frequency: 5 × 3 = 15, 15 × 8 = 120, 25 × 7 = 175, 35 × 2 = 70.",
        "Total = 15 + 120 + 175 + 70 = 380.",
        "Estimated mean = 380 ÷ 20 = 19 minutes.",
      ],
      commonError: "Using the top of each class (10, 20, 30, 40) instead of the midpoint.",
      traps: [
        { spec: { type: "number", value: 24 }, feedback: "You used the upper end of each class (10, 20, 30, 40). Use the midpoints (5, 15, 25, 35) to stand for each class." },
        { spec: { type: "number", value: 95 }, feedback: "You divided by 4, the number of classes. Divide by the number of pupils, 20." },
      ],
      difficulty: "core",
      guideRef: "grouped-data",
      hints: [
        "You don't know the exact times. What single value could stand for every time in {{10 <= t < 20}}?",
        "Use the midpoints 5, 15, 25 and 35.",
        "Total of (midpoint × frequency) ÷ 20.",
      ],
      strategy: "Add a midpoint column",
    },
    {
      kind: "written",
      id: "averages-spread-quiz-q10",
      question:
        "Always, sometimes or never true?\n\n> 'If you add a new value that is bigger than the mean of a data set, the mean goes up.'\n\nDecide, and explain why. An example on its own is not enough.",
      marks: 3,
      modelAnswer:
        "**Always true.** Suppose there are n values with mean m, so their total is n × m. Add a new value m + d, where d is positive because the new value is bigger than the mean. The new total is nm + m + d = (n + 1)m + d, shared between n + 1 values, so the new mean is {{m + d/(n+1)}}. Since d is positive, this is bigger than m.\n\nIn 'level-out' terms: the new value sticks up d above the mean, and sharing that extra d between all n + 1 values lifts the level by {{d/(n+1)}}. For example, 2, 4, 6 has mean 4; adding 8 gives a total of 20 shared between 4 values, a mean of 5.",
      markScheme: [
        { point: "States that it is always true", keywords: ["always"] },
        {
          point: "Uses totals: the new total is the old total plus the new value, now shared between one more value (or the 'extra above the mean gets shared out' idea)",
          keywords: ["total", "n + 1", "n+1", "shared", "share", "extra", "above the mean"],
        },
        {
          point: "Concludes with a general reason that the new mean is the old mean plus a positive amount (such as {{m + d/(n+1)}}), so it goes up",
          keywords: ["d/(n+1)", "bigger", "increases", "goes up", "greater", "positive"],
        },
      ],
      commonError: "Checking one example and writing 'always'. An example shows it *can* happen; an argument shows it *must*.",
      difficulty: "challenge",
      guideRef: "working-backwards",
      hints: [
        "Try a small case: 2, 4, 6 has mean 4. Add 8. Then try adding 100 instead. What happens each time?",
        "Think of the mean as a level-out height. The new value sticks up above that level. What happens to its extra when you share it out?",
        "Let the n values have total nm. Add the value m + d (with d > 0) and write down the new mean.",
      ],
      strategy: "Introduce a variable",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS — 16 short + 4 written each; ≈5 warmup, 11 core, 4 challenge
  // ===========================================================================
  papers: [
    {
      id: "averages-spread-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "averages-spread-p1-q01",
          question: "A school football team scored 2, 9, 4, 11 and 4 goals in five matches. Find the mean number of goals per match.",
          answer: { type: "number", value: 6 },
          solution: ["Total = 2 + 9 + 4 + 11 + 4 = 30 goals.", "There are 5 matches, so the mean = 30 ÷ 5 = 6 goals per match."],
          traps: [
            { spec: { type: "number", value: 7.5 }, feedback: "You divided 30 by 4. Count the matches again: there are 5 values." },
            { spec: { type: "number", value: 4 }, feedback: "4 is the mode (and the median). The mean is the total shared equally between the matches." },
          ],
          difficulty: "warmup",
          guideRef: "mean-median-mode-range",
          hints: ["Add up all the goals, then share them equally between the matches."],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q02",
          question: "Siti measured six leaves. Their lengths, in cm, were 4.2, 3.6, 5.1, 3.9, 4.8 and 3.3. Find the median length in cm.",
          answer: { type: "number", value: 4.05, display: "4.05 cm" },
          solution: [
            "In order: 3.3, 3.6, 3.9, 4.2, 4.8, 5.1.",
            "Six values, so the median is halfway between the 3rd and 4th values: 3.9 and 4.2.",
            "Median = {{(3.9 + 4.2)/2 = 8.1/2 = 4.05}} cm.",
          ],
          commonError: "Finding the middle of the list without putting it in order first.",
          traps: [
            { spec: { type: "number", value: 4.5 }, feedback: "You took the middle two values of the list as written (5.1 and 3.9). Put the lengths in order first." },
          ],
          difficulty: "warmup",
          guideRef: "mean-median-mode-range",
          hints: ["Order the lengths first. With six values, which two are in the middle?"],
          strategy: "Order the data first",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q03",
          question: "Find the range of −3.5, 2, −1, 4.5 and 0.",
          answer: { type: "number", value: 8 },
          solution: ["Largest = 4.5. Smallest = −3.5.", "Range = 4.5 − (−3.5) = 4.5 + 3.5 = 8."],
          commonError: "Working out 4.5 − 3.5 = 1 and losing the minus sign.",
          traps: [
            { spec: { type: "number", value: 1 }, feedback: "You worked out 4.5 − 3.5. The smallest value is −3.5, so the range is 4.5 − (−3.5) = 4.5 + 3.5." },
          ],
          difficulty: "warmup",
          guideRef: "mean-median-mode-range",
          hints: ["Range = largest − smallest. Subtracting a negative is the same as adding."],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q04",
          question:
            "The table shows the number of pets owned by each pupil in class 8C.\n\n| Number of pets | Frequency |\n|---|---|\n| 0 | 3 |\n| 1 | 7 |\n| 2 | 5 |\n| 3 | 4 |\n| 4 | 1 |\n\nWhat is the modal number of pets?",
          answer: { type: "number", value: 1 },
          solution: ["The highest frequency is 7.", "That frequency belongs to the value 1, so the mode is 1 pet."],
          commonError: "Giving the highest frequency (7) instead of the value that has it.",
          traps: [
            { spec: { type: "number", value: 7 }, feedback: "7 is the frequency: how many pupils. The mode is the *number of pets* that occurs most often." },
          ],
          difficulty: "warmup",
          guideRef: "frequency-tables",
          hints: ["Find the biggest frequency, then read across to see which number of pets it belongs to."],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q05",
          question:
            "The heights of 10 sunflower plants are shown. Key: 6 | 3 means 63 cm.\n\n| Stem | Leaves |\n|---|---|\n| 5 | 2 8 |\n| 6 | 0 3 3 7 |\n| 7 | 1 5 9 |\n| 8 | 4 |\n\nFind the range of the heights, in cm.",
          answer: { type: "number", value: 32, display: "32 cm" },
          solution: [
            "The smallest value is the first leaf on the top row: 52 cm.",
            "The largest value is the last leaf on the bottom row: 84 cm.",
            "Range = 84 − 52 = 32 cm.",
          ],
          commonError: "Subtracting leaves (9 − 0) without their stems.",
          traps: [
            { spec: { type: "number", value: 9 }, feedback: "You subtracted the largest leaf from the smallest leaf. A leaf needs its stem: the values are 84 and 52." },
          ],
          difficulty: "warmup",
          guideRef: "stem-and-leaf-averages",
          hints: ["The smallest value is at the top-left and the largest is at the bottom-right. Rebuild them using the key."],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q06",
          question: "The mean of six numbers is 15. A seventh number is added, and the mean of all seven numbers becomes 16. What is the seventh number?",
          answer: { type: "number", value: 22 },
          solution: [
            "Total of the first six = 6 × 15 = 90.",
            "Total of all seven = 7 × 16 = 112.",
            "Seventh number = 112 − 90 = 22.",
          ],
          solutions: [
            {
              label: "Share out the extra (quicker)",
              steps: [
                "The new number lifts the mean of all 7 values by 1, so it must supply 1 extra for each of the 7 values.",
                "So it is 7 above the old mean: 15 + 7 = 22.",
                "This avoids the big totals, but the totals method is safer if you're unsure.",
              ],
            },
          ],
          commonError: "Thinking the new number is just 1, or 16, because the mean went up by 1 to 16.",
          traps: [
            { spec: { type: "number", value: 1 }, feedback: "1 is how much the mean went up. Compare the totals: 6 × 15 before and 7 × 16 after." },
            { spec: { type: "number", value: 16 }, feedback: "Adding 16 would make the mean less than 16. The new number has to pull the mean up, so it must be well above 16." },
          ],
          difficulty: "core",
          guideRef: "working-backwards",
          hints: [
            "Work out the total before and the total after.",
            "Total = mean × number of values. Careful: 6 values before, 7 after.",
            "The seventh number is the difference between the two totals.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q07",
          question:
            "Ravi timed himself solving a puzzle cube six times. His times, in seconds, were 23, 25, 24, 22, 26 and 90. (In the 90-second attempt he dropped the cube.)\n\nFind the mean and the median of all six times. Give the mean first, then the median.",
          answer: { type: "list", values: [35, 24.5], ordered: true, display: "mean 35 s, median 24.5 s" },
          solution: [
            "Total = 23 + 25 + 24 + 22 + 26 + 90 = 210, so the mean = 210 ÷ 6 = 35 seconds.",
            "In order: 22, 23, 24, 25, 26, 90. The median is halfway between the 3rd and 4th values: {{(24 + 25)/2 = 24.5}} seconds.",
            "The mean (35 s) is bigger than five of the six times, because the outlier 90 drags it up. The median (24.5 s) is far more typical of Ravi's solves.",
          ],
          commonError: "Finding the median from the unordered list.",
          traps: [
            { spec: { type: "list", values: [35, 23], ordered: true }, feedback: "Your mean is right, but you took the middle two values of the unordered list (24 and 22). Order the times first." },
          ],
          difficulty: "core",
          guideRef: "choosing-an-average",
          hints: [
            "For the mean, add all six times and share between 6.",
            "For the median, order the six times first. Which two are in the middle?",
            "Compare the two answers. Which one is pulled by the 90?",
          ],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q08",
          question:
            "The table shows how many books 25 pupils read during the June holidays.\n\n| Number of books | Frequency |\n|---|---|\n| 0 | 2 |\n| 1 | 5 |\n| 2 | 8 |\n| 3 | 6 |\n| 4 | 4 |\n\nWork out the mean number of books per pupil.",
          answer: { type: "number", value: 2.2 },
          solution: [
            "Add an fx column: 0 × 2 = 0, 1 × 5 = 5, 2 × 8 = 16, 3 × 6 = 18, 4 × 4 = 16.",
            "Total books = 0 + 5 + 16 + 18 + 16 = 55.",
            "Total pupils = 2 + 5 + 8 + 6 + 4 = 25.",
            "Mean = 55 ÷ 25 = 2.2 books.",
          ],
          commonError: "Dividing by the number of rows (5) instead of the number of pupils (25).",
          traps: [
            { spec: { type: "number", value: 11 }, feedback: "You divided 55 by 5, the number of rows. Divide by the total frequency: 25 pupils." },
            { spec: { type: "number", value: 2 }, feedback: "2 is the mode (and the median). For the mean, divide the total number of books by the number of pupils." },
          ],
          difficulty: "core",
          guideRef: "frequency-tables",
          hints: [
            "How many books were read altogether? Each row tells you a number of books and how many pupils read that many.",
            "Multiply each number of books by its frequency, then add.",
            "Divide the total number of books by the total number of pupils.",
          ],
          strategy: "Add an fx column",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q09",
          question:
            "Mei counted the number of people in each of 30 cars arriving at school.\n\n| People in car | Frequency |\n|---|---|\n| 1 | 14 |\n| 2 | 9 |\n| 3 | 5 |\n| 4 | 2 |\n\nFind the median number of people per car.",
          answer: { type: "number", value: 2 },
          solution: [
            "There are 30 cars, so the median is halfway between the 15th and 16th values.",
            "Running totals: 14 cars have 1 person; 14 + 9 = 23 cars have 1 or 2 people.",
            "So the 15th to 23rd cars all have 2 people. The 15th and 16th are both 2.",
            "Median = 2 people.",
          ],
          commonError: "Finding the middle of the 'People in car' column (2.5) or of the frequencies, instead of counting through the cars.",
          traps: [
            { spec: { type: "number", value: 2.5 }, feedback: "That's the middle of the values 1, 2, 3, 4, which ignores the frequencies. Count through the 30 cars to the 15th and 16th." },
            { spec: { type: "number", value: 7 }, feedback: "You found the median of the frequencies. The median is a number of people: count through the cars to the 15th and 16th." },
          ],
          difficulty: "core",
          guideRef: "frequency-tables",
          hints: [
            "With 30 values, which positions are in the middle?",
            "Keep a running total of the frequencies.",
            "The first 14 cars have 1 person. Where do the 15th and 16th cars fall?",
          ],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q10",
          question:
            "The long-jump distances of 13 pupils are shown. Key: 3 | 7 means 3.7 m.\n\n| Stem | Leaves |\n|---|---|\n| 2 | 8 9 |\n| 3 | 1 3 3 6 8 |\n| 4 | 0 2 2 2 7 |\n| 5 | 1 |\n\nFind the median distance, in metres.",
          answer: { type: "number", value: 3.8, display: "3.8 m" },
          solution: [
            "Count the leaves: 2 + 5 + 5 + 1 = 13 distances.",
            "The median is the {{(13+1)/2 = 7}}th value.",
            "Stem 2 holds the 1st and 2nd values. On stem 3 the 3rd to 7th values are 3.1, 3.3, 3.3, 3.6, 3.8.",
            "The 7th value is 3.8 m (the key says the leaves are tenths of a metre).",
          ],
          commonError: "Ignoring the key and writing 38.",
          traps: [
            { spec: { type: "number", value: 38 }, feedback: "Read the key: 3 | 8 means 3.8 m, not 38 m." },
            { spec: { type: "number", value: 3.6 }, feedback: "3.6 is the 6th value. With 13 values the median is the 7th." },
          ],
          difficulty: "core",
          guideRef: "stem-and-leaf-averages",
          hints: [
            "How many values are there? Which position is the middle?",
            "Skip whole rows using their leaf counts.",
            "Check the key before you write your answer.",
          ],
          strategy: "Read the key first",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q11",
          question:
            "The number of laps swum by 8 pupils is shown. Key: 1 | 2 means 12 laps.\n\n| Stem | Leaves |\n|---|---|\n| 0 | 7 9 |\n| 1 | 2 4 4 8 |\n| 2 | 0 6 |\n\nWork out the mean number of laps.",
          answer: { type: "number", value: 15 },
          solution: [
            "Rebuild the values: 7, 9, 12, 14, 14, 18, 20, 26.",
            "Total = 7 + 9 + 12 + 14 + 14 + 18 + 20 + 26 = 120.",
            "Mean = 120 ÷ 8 = 15 laps.",
          ],
          commonError: "Adding only the leaves, which forgets the tens in the stems.",
          traps: [
            { spec: { type: "number", value: 5 }, feedback: "You found the mean of the leaves only. Each leaf needs its stem: 1 | 2 is 12, not 2." },
            { spec: { type: "number", value: 14 }, feedback: "14 is the median (and the mode). For the mean, add all eight values and divide by 8." },
          ],
          difficulty: "core",
          guideRef: "stem-and-leaf-averages",
          hints: [
            "Write out each value in full using the key.",
            "Add all 8 values.",
            "Divide the total by 8.",
          ],
        },
        {
          kind: "short",
          id: "averages-spread-p1-q12",
          question:
            "Wei Ling and Arjun recorded how many minutes late their school buses were on six days.\n\n| Pupil | Minutes late |\n|---|---|\n| Wei Ling | 3, 5, 2, 8, 4, 2 |\n| Arjun | 1, 9, 0, 6, 12, 2 |\n\nFind each person's median and range. Give four numbers in this order: Wei Ling's median, Arjun's median, Wei Ling's range, Arjun's range.",
          answer: { type: "list", values: [3.5, 4, 6, 12], ordered: true, display: "3.5, 4, 6, 12" },
          solution: [
            "Wei Ling in order: 2, 2, 3, 4, 5, 8. Median = {{(3 + 4)/2 = 3.5}} minutes. Range = 8 − 2 = 6 minutes.",
            "Arjun in order: 0, 1, 2, 6, 9, 12. Median = {{(2 + 6)/2 = 4}} minutes. Range = 12 − 0 = 12 minutes.",
            "In context: on average Wei Ling's bus was slightly less late (median 3.5 minutes compared with 4), and it was much more consistent (range 6 minutes compared with 12).",
          ],
          commonError: "Finding the medians without ordering each list first.",
          traps: [
            { spec: { type: "list", values: [5, 3, 6, 12], ordered: true }, feedback: "Your ranges are right, but the medians came from the unordered lists. Order each person's times first." },
          ],
          difficulty: "core",
          guideRef: "comparing-distributions",
          hints: [
            "Order each person's six times separately.",
            "With six values, the median is halfway between the 3rd and 4th.",
            "Range = largest − smallest for each person.",
          ],
          strategy: "Compare centre, then spread",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q13",
          question:
            "Hana measured the lengths of 25 runner beans.\n\n| Length, l (cm) | Frequency |\n|---|---|\n| {{10 <= l < 15}} | 3 |\n| {{15 <= l < 20}} | 8 |\n| {{20 <= l < 25}} | 10 |\n| {{25 <= l < 30}} | 4 |\n\nEstimate the mean length, in cm.",
          answer: { type: "number", value: 20.5, display: "20.5 cm" },
          solution: [
            "Midpoints: 12.5, 17.5, 22.5 and 27.5 cm.",
            "Midpoint × frequency: 12.5 × 3 = 37.5, 17.5 × 8 = 140, 22.5 × 10 = 225, 27.5 × 4 = 110.",
            "Total = 37.5 + 140 + 225 + 110 = 512.5.",
            "Estimated mean = 512.5 ÷ 25 = 20.5 cm.",
          ],
          commonError: "Using the lower or upper end of each class instead of the midpoint.",
          traps: [
            { spec: { type: "number", value: 23 }, feedback: "You used the upper end of each class. Use the midpoints: 12.5, 17.5, 22.5, 27.5." },
            { spec: { type: "number", value: 18 }, feedback: "You used the lower end of each class. Use the midpoints: 12.5, 17.5, 22.5, 27.5." },
          ],
          difficulty: "core",
          guideRef: "grouped-data",
          hints: [
            "What single length could stand for every bean in {{10 <= l < 15}}?",
            "Use the midpoint of each class, then make an fx column.",
            "Total of fx ÷ 25.",
          ],
          strategy: "Add a midpoint column",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q14",
          question:
            "The mean of 8 test scores is 65. Then the teacher notices that one score was recorded as 49 when it should have been 73. What is the correct mean?",
          answer: { type: "number", value: 68 },
          solution: [
            "Wrong total = 8 × 65 = 520.",
            "Correct total = 520 − 49 + 73 = 544.",
            "Correct mean = 544 ÷ 8 = 68.",
          ],
          solutions: [
            {
              label: "Share out the change (quicker)",
              steps: [
                "The score went up by 73 − 49 = 24.",
                "Shared between 8 scores, that raises the mean by 24 ÷ 8 = 3.",
                "Correct mean = 65 + 3 = 68. Quicker, because you never need the total.",
              ],
            },
          ],
          commonError: "Adding the whole change (24) to the mean instead of sharing it between 8 scores.",
          traps: [
            { spec: { type: "number", value: 89 }, feedback: "You added the full 24 to the mean. The extra 24 marks are shared between 8 scores." },
            { spec: { type: "number", value: 62 }, feedback: "The score went *up* from 49 to 73, so the mean must go up, not down." },
          ],
          difficulty: "core",
          guideRef: "working-backwards",
          hints: [
            "What was the total of the 8 scores?",
            "How does the total change when 49 is replaced by 73?",
            "Divide the new total by 8.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "averages-spread-p1-q15",
          question:
            "Seven friends spent these amounts at a book fair:\n\n$20, $25, $22, $18, $25, $24, $150\n\nWhich average best represents what a typical friend spent: the mean, the median or the mode? Explain your choice, using the numbers.",
          marks: 3,
          modelAnswer:
            "The **median** is best. In order the amounts are $18, $20, $22, $24, $25, $25, $150, so the median is $24.\n\nThe $150 is an outlier. It drags the mean up to 284 ÷ 7 ≈ $40.57, which is more than six of the seven friends spent, so the mean is not typical.\n\nThe mode, $25, only comes from two friends and sits at the top end of the normal amounts, so it is less representative than the median.",
          markScheme: [
            { point: "Chooses the median, $24", keywords: ["median", "24"] },
            {
              point: "Explains that $150 is an outlier that drags the mean up (to about $40.57, more than six of the seven spent)",
              keywords: ["outlier", "150", "40.57", "40.6", "drags", "pulls", "higher than", "more than"],
            },
            { point: "Comments on the mode ($25 comes from only two friends, at the top of the typical values)", keywords: ["mode", "25", "only two", "twice"] },
          ],
          commonError: "Choosing the mean 'because it uses all the values'. Here, using every value is exactly the problem.",
          difficulty: "core",
          guideRef: "choosing-an-average",
          hints: [
            "Work out all three averages first.",
            "Is there a value that is very different from the others? Which averages does it affect?",
            "Compare each average with what most of the friends actually spent.",
          ],
        },
        {
          kind: "written",
          id: "averages-spread-p1-q16",
          question:
            "Mei and Jun each did five spelling tests, marked out of 20.\n\n| Pupil | Scores |\n|---|---|\n| Mei | 14, 17, 15, 16, 18 |\n| Jun | 9, 20, 19, 11, 16 |\n\nCompare their scores using the mean and the range. Who would you choose to represent the class in a spelling bee? Give a reason.",
          marks: 4,
          modelAnswer:
            "Mei: total 80, so mean = 80 ÷ 5 = 16; range = 18 − 14 = 4.\nJun: total 75, so mean = 75 ÷ 5 = 15; range = 20 − 9 = 11.\n\nOn average, Mei scored higher than Jun (mean 16 compared with 15). Mei's scores were also more consistent (range 4 compared with 11): Jun is more variable, scoring as high as 20 but as low as 9.\n\nI would choose Mei, because she scores higher on average and is more reliable. (Choosing Jun can earn credit if justified, e.g. he is the only one to have scored 20, so he has a better chance of a top score.)",
          markScheme: [
            { point: "Correct means: Mei 16, Jun 15", keywords: ["16", "15", "mean"] },
            { point: "Correct ranges: Mei 4, Jun 11", keywords: ["4", "11", "range"] },
            { point: "Compares the averages in context: Mei scored higher on average", keywords: ["on average", "higher", "better", "mei"] },
            {
              point: "Compares the spread in context (Mei more consistent, Jun more variable) and makes a justified choice",
              keywords: ["consistent", "variable", "spread", "reliable", "choose"],
            },
          ],
          commonError: "Just quoting the numbers ('Mei's mean is 16, Jun's is 15') without saying what they mean for the spelling bee.",
          difficulty: "core",
          guideRef: "comparing-distributions",
          hints: [
            "Work out the mean and range for each pupil.",
            "Write one sentence comparing the averages and one comparing the ranges, each in context.",
            "What matters more in a spelling bee: a higher average, or being reliable? Use both.",
          ],
          strategy: "Compare centre, then spread",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q17",
          question:
            "A list of 11 numbers has a mean of 20. The mean of the first six numbers is 18, and the mean of the last six numbers is 23. What is the sixth number in the list?",
          answer: { type: "number", value: 26 },
          solution: [
            "Total of all 11 numbers = 11 × 20 = 220.",
            "Total of the first six = 6 × 18 = 108. Total of the last six = 6 × 23 = 138.",
            "The first six and the last six together use 12 numbers, but there are only 11: the 6th number is counted twice.",
            "108 + 138 = 246, which is 220 plus the 6th number again.",
            "Sixth number = 246 − 220 = 26.",
          ],
          commonError: "Averaging the two means (20.5). That doesn't find any single number in the list.",
          traps: [
            { spec: { type: "number", value: 20.5 }, feedback: "You averaged 18 and 23. Turn every mean into a total first, then look for the number that is counted twice." },
          ],
          difficulty: "challenge",
          guideRef: "working-backwards",
          hints: [
            "Turn each mean into a total.",
            "The 'first six' and the 'last six' make 12 numbers. But there are only 11. What's going on?",
            "One number is in both groups. Compare 108 + 138 with 220.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "averages-spread-p1-q18",
          question:
            "Class 8A has 30 pupils and their mean test score was 70. Class 8B has 10 pupils and their mean test score was 80.\n\nSiti says: 'So the mean score of both classes together is {{(70 + 80)/2 = 75}}.'\n\nFind the true mean of all 40 pupils, and explain the flaw in Siti's reasoning. When would her method give the right answer?",
          marks: 3,
          modelAnswer:
            "Total for 8A = 30 × 70 = 2100. Total for 8B = 10 × 80 = 800. Total for all 40 pupils = 2900, so the true mean is 2900 ÷ 40 = **72.5**.\n\nSiti averaged the two averages, which treats the classes as if they were the same size. 8A has three times as many pupils, so its mean of 70 should count three times as much, pulling the combined mean towards 70.\n\nHer method only works when the two classes have the same number of pupils.",
          markScheme: [
            { point: "Finds the class totals 2100 and 800 (combined total 2900)", keywords: ["2100", "800", "2900"] },
            { point: "Correct combined mean 72.5", keywords: ["72.5"] },
            {
              point: "Explains the flaw: the classes are different sizes, so you can't just average the averages; it works only when the classes are the same size",
              keywords: ["different sizes", "same size", "same number", "equal", "more pupils", "weighted", "30", "10"],
            },
          ],
          commonError: "Agreeing with Siti because 75 is 'in the middle'. The bigger class pulls the combined mean towards its own mean.",
          solutions: [
            {
              label: "Balance (quick check)",
              steps: [
                "Think of the 40 pupils on a see-saw. 8A is 30 pupils at 70; 8B is 10 pupils at 80.",
                "The balance point divides the 10-mark gap in the ratio 10 : 30 = 1 : 3, measured from 70.",
                "So the mean is {{70 + 1/4 * 10 = 72.5}}, a quarter of the way from 70 to 80.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "working-backwards",
          hints: [
            "Turn each class's mean into a total.",
            "Add the totals and divide by the total number of pupils.",
            "Why is the answer closer to 70 than to 80? When would it be exactly 75?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "averages-spread-p1-q19",
          question:
            "The table shows how many times the pupils in a CCA group were late this term. One frequency is missing.\n\n| Times late | Frequency |\n|---|---|\n| 0 | 5 |\n| 1 | x |\n| 2 | 6 |\n| 3 | 4 |\n\nThe mean number of times late is exactly 1.5. Find x.",
          answer: { type: "number", value: 3 },
          solution: [
            "Total frequency = 5 + x + 6 + 4 = 15 + x.",
            "Total of fx = 0 × 5 + 1 × x + 2 × 6 + 3 × 4 = x + 24.",
            "Mean = 1.5, so x + 24 = 1.5(15 + x) = 22.5 + 1.5x.",
            "24 − 22.5 = 1.5x − x, so 1.5 = 0.5x and x = 3.",
            "Check: total fx = 27, total frequency = 18, and 27 ÷ 18 = 1.5 ✓",
          ],
          solutions: [
            {
              label: "Balance around the mean (slicker)",
              steps: [
                "Values above and below the mean must balance. Distances from 1.5: 0 is −1.5, 1 is −0.5, 2 is +0.5, 3 is +1.5.",
                "Below: 5 × 1.5 + x × 0.5 = 7.5 + 0.5x. Above: 6 × 0.5 + 4 × 1.5 = 9.",
                "7.5 + 0.5x = 9, so 0.5x = 1.5 and x = 3. Smaller numbers, and no fractions of pupils to worry about.",
              ],
            },
          ],
          commonError: "Forgetting that x also changes the total frequency: it's 15 + x, not 15.",
          traps: [
            { spec: { type: "number", value: 1 }, feedback: "Did you leave the x pupils out of the fx total? Each of them was late once, so they add 1 × x to the total." },
          ],
          difficulty: "challenge",
          guideRef: "frequency-tables",
          hints: [
            "Write the total frequency and the total of fx, both in terms of x.",
            "Mean = total of fx ÷ total frequency. Set this equal to 1.5.",
            "Solve x + 24 = 1.5(15 + x). Or try x = 1, 2, 3, … and check.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "averages-spread-p1-q20",
          question:
            "Hana has a data set with mean 12, median 10 and range 8. She adds 5 to every value, and then doubles every result.\n\nFind the new mean, the new median and the new range. Explain why the range changes in a different way from the two averages.",
          marks: 4,
          modelAnswer:
            "Adding 5 to every value moves every value up by 5, so the mean becomes 17 and the median becomes 15. The range stays 8, because the largest and smallest values both move up by 5 and the gap between them is unchanged.\n\nDoubling every value doubles everything, including the gaps: the mean becomes 2 × 17 = **34**, the median becomes 2 × 15 = **30**, and the range becomes 2 × 8 = **16**.\n\nThe averages describe *where* the data sit, so they follow both the shift and the stretch. The range measures the *gap* between two values, so adding the same amount to both values cancels out, and only the doubling affects it.",
          markScheme: [
            { point: "New mean 34", keywords: ["34"] },
            { point: "New median 30", keywords: ["30"] },
            { point: "New range 16", keywords: ["16"] },
            {
              point: "Explains that adding 5 shifts every value by the same amount so the gap (range) is unchanged, while doubling doubles the gap",
              keywords: ["shift", "same amount", "gap", "difference", "cancels", "doubles", "stretch", "unchanged"],
            },
          ],
          commonError: "Adding 5 to the range as well (giving 2 × 13 = 26).",
          difficulty: "challenge",
          guideRef: "mean-median-mode-range",
          hints: [
            "Try a tiny data set that fits: 9, 10, 17 has mean 12, median 10 and range 8. Add 5 to each value, double, and recalculate.",
            "Step 1: adding 5 to every value. What happens to the mean? The median? The gap between the largest and smallest?",
            "Step 2: doubling every value. Every value, and every gap, doubles.",
          ],
          strategy: "Try small cases",
        },
      ],
    },
    {
      id: "averages-spread-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "averages-spread-p2-q01",
          question: "Find the median of 15, 9, 22, 9, 18, 11, 25.",
          answer: { type: "number", value: 15 },
          solution: ["In order: 9, 9, 11, 15, 18, 22, 25.", "There are 7 values, so the median is the {{(7+1)/2 = 4}}th value: 15."],
          commonError: "Taking the middle of the list as written.",
          traps: [
            { spec: { type: "number", value: 9 }, feedback: "9 is the 4th number as written (and the mode). Put the numbers in order first, then find the middle." },
          ],
          difficulty: "warmup",
          guideRef: "mean-median-mode-range",
          hints: ["Order the numbers first. With 7 values, which position is the middle?"],
          strategy: "Order the data first",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q02",
          question:
            "The midday temperatures at a ski resort over six days were −3 °C, 5 °C, −6 °C, 4 °C, −4 °C and 1 °C. Find the mean temperature, in °C.",
          answer: { type: "number", value: -0.5, display: "−0.5 °C" },
          solution: [
            "Add the positives: 5 + 4 + 1 = 10.",
            "Add the negatives: −3 − 6 − 4 = −13.",
            "Total = 10 + (−13) = −3.",
            "Mean = −3 ÷ 6 = −0.5 °C.",
          ],
          commonError: "Dropping the minus sign, or dividing by the wrong count.",
          traps: [
            { spec: { type: "number", value: -0.6 }, feedback: "You divided by 5. Count the temperatures again: there are 6." },
          ],
          difficulty: "warmup",
          guideRef: "mean-median-mode-range",
          hints: ["Add the positive and negative temperatures separately, then combine.", "Divide the total by 6."],
          strategy: "Add positives and negatives separately",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q03",
          question:
            "Siti asks 30 classmates for their favourite hawker dessert: chendol, ice kacang, tau huay or pulut hitam. Which average (mean, median or mode) is the only one she can find for this data? Type its name.",
          answer: { type: "text", accept: ["mode", "the mode"], display: "the mode" },
          solution: [
            "The data are names of desserts, not numbers.",
            "You can't add names (so no mean) and they have no natural order (so no median).",
            "You *can* find the dessert chosen most often: the mode.",
          ],
          traps: [
            { spec: { type: "text", accept: ["mean", "the mean"] }, feedback: "To find a mean you add the values and divide. You can't add 'chendol' to 'tau huay'." },
            { spec: { type: "text", accept: ["median", "the median"] }, feedback: "A median needs the data in order. Desserts have no natural order, so there's no middle one." },
          ],
          difficulty: "warmup",
          guideRef: "choosing-an-average",
          hints: ["Can you add up dessert names? Can you put them in order from smallest to largest?"],
        },
        {
          kind: "short",
          id: "averages-spread-p2-q04",
          question:
            "The table shows how many times pupils in a class visited Sentosa last year.\n\n| Number of visits | Frequency |\n|---|---|\n| 0 | 6 |\n| 1 | 11 |\n| 2 | 7 |\n| 3 | 3 |\n| 4 | 0 |\n| 5 | 1 |\n\nFind the range of the number of visits.",
          answer: { type: "number", value: 5 },
          solution: [
            "The smallest number of visits anyone made is 0 (6 pupils).",
            "The largest number of visits anyone made is 5 (1 pupil). Nobody made 4 visits, but that doesn't matter.",
            "Range = 5 − 0 = 5 visits.",
          ],
          commonError: "Finding the range of the frequency column instead of the values.",
          traps: [
            { spec: { type: "number", value: 11 }, feedback: "That's the range of the frequencies. The range is about the number of visits: largest − smallest." },
          ],
          difficulty: "warmup",
          guideRef: "frequency-tables",
          hints: ["The range uses the values (number of visits), not the frequencies. What's the largest number of visits that someone actually made?"],
        },
        {
          kind: "short",
          id: "averages-spread-p2-q05",
          question:
            "The ages of 13 members of a badminton club are shown. Key: 2 | 3 means 23 years.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 4 6 8 |\n| 2 | 1 1 5 7 7 7 9 |\n| 3 | 0 2 6 |\n\nWhat is the modal age, in years?",
          answer: { type: "number", value: 27, display: "27 years" },
          solution: ["On stem 2 the leaf 7 appears three times, more than any other leaf on the same stem.", "So the mode is 27 years."],
          traps: [
            { spec: { type: "number", value: 7 }, feedback: "7 is the leaf. Join it to its stem: 2 | 7 means 27." },
            { spec: { type: "number", value: 21 }, feedback: "21 appears twice, but 27 appears three times." },
          ],
          difficulty: "warmup",
          guideRef: "stem-and-leaf-averages",
          hints: ["Look for the leaf that repeats most often on the same stem, then use the key."],
        },
        {
          kind: "short",
          id: "averages-spread-p2-q06",
          question: "Marcus's mean score in four tests is 72. What must he score in the fifth test to raise his mean to exactly 75?",
          answer: { type: "number", value: 87 },
          solution: [
            "Total so far = 4 × 72 = 288.",
            "Total needed after five tests = 5 × 75 = 375.",
            "Fifth score = 375 − 288 = 87.",
          ],
          solutions: [
            {
              label: "Make up the shortfall (quicker)",
              steps: [
                "Each of the first four tests is 3 below the target of 75, so he is 4 × 3 = 12 short.",
                "The fifth test must hit the target and make up the shortfall: 75 + 12 = 87.",
              ],
            },
          ],
          commonError: "Thinking he only needs 75, or 75 + 3 = 78.",
          traps: [
            { spec: { type: "number", value: 75 }, feedback: "Scoring 75 would leave his mean below 75, because the first four tests averaged only 72. He has to make up the shortfall." },
            { spec: { type: "number", value: 78 }, feedback: "The mean must rise by 3 across all five tests, so the fifth score has to supply 3 for each of the first four tests as well." },
          ],
          difficulty: "core",
          guideRef: "working-backwards",
          hints: [
            "What is his total so far?",
            "What total does he need after five tests for a mean of 75?",
            "The fifth score is the difference.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q07",
          question:
            "Six pupils watched 4, 6, 7, 7, 8 and 10 hours of TV last week. A seventh pupil watched 49 hours.\n\nWhen the seventh pupil is included, by how much does the mean increase, and by how much does the median increase? Give the increase in the mean first.",
          answer: { type: "list", values: [6, 0], ordered: true, display: "mean +6 hours, median +0 hours" },
          solution: [
            "Before: total = 42, so the mean = 42 ÷ 6 = 7. The median is halfway between 7 and 7, so it is 7.",
            "After: total = 42 + 49 = 91, so the mean = 91 ÷ 7 = 13. In order: 4, 6, 7, 7, 8, 10, 49, and the median (the 4th value) is 7.",
            "The mean increases by 13 − 7 = 6 hours. The median increases by 7 − 7 = 0 hours.",
            "One outlier moved the mean a lot but didn't move the median at all.",
          ],
          traps: [
            { spec: { type: "list", values: [13, 7], ordered: true }, feedback: "Those are the new mean and the new median. Subtract the old values (7 and 7) to find the increases." },
            { spec: { type: "list", values: [6, 0.5], ordered: true }, feedback: "With 7 values the median is the 4th value, which is still 7. It doesn't move to between 7 and 8." },
          ],
          difficulty: "core",
          guideRef: "choosing-an-average",
          hints: [
            "Find the mean and median of the six values first.",
            "Now include 49. There are 7 values, so the median is the 4th.",
            "Subtract to find each increase.",
          ],
        },
        {
          kind: "short",
          id: "averages-spread-p2-q08",
          question:
            "The table shows the number of people living in each of 40 HDB flats on one floor of a block.\n\n| People in flat | Frequency |\n|---|---|\n| 1 | 4 |\n| 2 | 9 |\n| 3 | 11 |\n| 4 | 10 |\n| 5 | 6 |\n\nWork out the mean number of people per flat. Give your answer to 1 decimal place.",
          answer: { type: "number", value: 3.1, allowFraction: false },
          solution: [
            "fx column: 1 × 4 = 4, 2 × 9 = 18, 3 × 11 = 33, 4 × 10 = 40, 5 × 6 = 30.",
            "Total people = 4 + 18 + 33 + 40 + 30 = 125.",
            "Mean = 125 ÷ 40 = 3.125.",
            "To 1 decimal place: 3.1 people per flat.",
          ],
          commonError: "Dividing by 5 (the number of rows) instead of 40 (the number of flats).",
          traps: [
            { spec: { type: "number", value: 25 }, feedback: "You divided 125 by 5, the number of rows. Divide by the number of flats, 40." },
            { spec: { type: "number", value: 3 }, feedback: "3 is the median and the mode here. Work out the total number of people and divide by 40, then round to 1 decimal place." },
          ],
          difficulty: "core",
          guideRef: "frequency-tables",
          hints: [
            "How many people live on this floor altogether?",
            "Multiply each value by its frequency and add.",
            "Divide by 40, then round to 1 decimal place.",
          ],
          strategy: "Add an fx column",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q09",
          question:
            "The table shows the UK shoe sizes of 20 pupils.\n\n| Shoe size | Frequency |\n|---|---|\n| 4 | 3 |\n| 5 | 7 |\n| 6 | 5 |\n| 7 | 3 |\n| 8 | 2 |\n\nFind the median shoe size.",
          answer: { type: "number", value: 5.5 },
          solution: [
            "With 20 pupils, the median is halfway between the 10th and 11th values.",
            "Running totals: 3 pupils are size 4; 3 + 7 = 10 pupils are size 4 or 5; 10 + 5 = 15 pupils are size 6 or smaller.",
            "So the 10th pupil is size 5 and the 11th pupil is size 6.",
            "Median = {{(5 + 6)/2 = 5.5}}.",
          ],
          commonError: "Stopping at the 10th value, which here is different from the 11th.",
          traps: [
            { spec: { type: "number", value: 5 }, feedback: "The 10th pupil is size 5, but the 11th is size 6. The median is halfway between them." },
            { spec: { type: "number", value: 6 }, feedback: "The 11th pupil is size 6, but the 10th is size 5. The median is halfway between them." },
          ],
          difficulty: "core",
          guideRef: "frequency-tables",
          hints: [
            "Which two positions are in the middle of 20 values?",
            "Keep a running total of the frequencies.",
            "The running total reaches exactly 10 at size 5. What size is the 11th pupil?",
          ],
        },
        {
          kind: "short",
          id: "averages-spread-p2-q10",
          question:
            "The stem-and-leaf diagram shows how many minutes 16 pupils spent in the school library one week. Key: 4 | 1 means 41 minutes.\n\n| Stem | Leaves |\n|---|---|\n| 3 | 5 8 9 |\n| 4 | 0 2 2 4 7 8 |\n| 5 | 1 3 3 3 6 |\n| 6 | 2 4 |\n\nFind the median time, in minutes.",
          answer: { type: "number", value: 47.5, display: "47.5 minutes" },
          solution: [
            "Count the leaves: 3 + 6 + 5 + 2 = 16 values.",
            "The median is halfway between the 8th and 9th values.",
            "Stem 3 holds the 1st to 3rd values. Stem 4 holds the 4th to 9th: 40, 42, 42, 44, 47, 48.",
            "8th = 47 and 9th = 48, so the median = {{(47 + 48)/2 = 47.5}} minutes.",
          ],
          traps: [
            { spec: { type: "number", value: 47 }, feedback: "47 is the 8th value. With 16 values the median is halfway between the 8th and 9th." },
          ],
          difficulty: "core",
          guideRef: "stem-and-leaf-averages",
          hints: [
            "How many leaves are there? Which two positions are in the middle?",
            "Skip stem 3 (3 values), then count along stem 4.",
          ],
          strategy: "Use row totals to skip ahead",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q11",
          question:
            "The stem-and-leaf diagram shows how many minutes 14 pupils spent on a maths puzzle, but the largest value has been hidden by a star. Key: 1 | 2 means 12 minutes.\n\n| Stem | Leaves |\n|---|---|\n| 0 | 6 9 |\n| 1 | 2 4 4 7 |\n| 2 | 0 3 5 5 8 |\n| 3 | 1 6 |\n| 4 | ★ |\n\nThe range of the times is 38 minutes. What is the hidden time, in minutes?",
          answer: { type: "number", value: 44, display: "44 minutes" },
          solution: [
            "The smallest time is the first leaf on the top row: 6 minutes.",
            "Range = largest − smallest, so largest = smallest + range = 6 + 38 = 44.",
            "44 is on stem 4 with leaf 4, which fits the diagram.",
          ],
          commonError: "Subtracting 38 − 6 instead of adding.",
          traps: [
            { spec: { type: "number", value: 4 }, feedback: "4 is the hidden leaf. With its stem, the hidden time is 44 minutes." },
            { spec: { type: "number", value: 32 }, feedback: "Range = largest − smallest, so the largest is the smallest *plus* the range: 6 + 38." },
          ],
          difficulty: "core",
          guideRef: "stem-and-leaf-averages",
          hints: [
            "What is the smallest time?",
            "Range = largest − smallest. Rearrange it to find the largest.",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q12",
          question:
            "Two netball teams scored these numbers of goals in five games.\n\n| Team | Goals |\n|---|---|\n| A | 12, 15, 9, 18, 16 |\n| B | 14, 13, 15, 14, 14 |\n\nBoth teams have a mean of 14 goals per game. Find the range for each team. Give Team A's range first.",
          answer: { type: "list", values: [9, 2], ordered: true, display: "A: 9 goals, B: 2 goals" },
          solution: [
            "Team A: largest 18, smallest 9, so the range = 18 − 9 = 9 goals.",
            "Team B: largest 15, smallest 13, so the range = 15 − 13 = 2 goals.",
            "The means are equal, so the average alone can't separate the teams. The ranges show that Team B is far more consistent, while Team A is more variable.",
          ],
          commonError: "Subtracting the first value from the last value as written, instead of smallest from largest.",
          traps: [
            { spec: { type: "list", values: [4, 0], ordered: true }, feedback: "You subtracted the first value from the last value as written. Range = largest − smallest." },
          ],
          difficulty: "core",
          guideRef: "comparing-distributions",
          hints: [
            "Find the largest and smallest score for each team.",
            "Range = largest − smallest. What does a smaller range tell the coach?",
          ],
          strategy: "Compare centre, then spread",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q13",
          question:
            "The table shows how much 50 customers spent at a hawker centre.\n\n| Amount spent, a ($) | Frequency |\n|---|---|\n| {{0 <= a < 5}} | 12 |\n| {{5 <= a < 10}} | 20 |\n| {{10 <= a < 15}} | 13 |\n| {{15 <= a < 20}} | 5 |\n\nEstimate the mean amount spent per customer, in dollars.",
          answer: { type: "number", value: 8.6, display: "$8.60" },
          solution: [
            "Midpoints: $2.50, $7.50, $12.50 and $17.50.",
            "Midpoint × frequency: 2.5 × 12 = 30, 7.5 × 20 = 150, 12.5 × 13 = 162.5, 17.5 × 5 = 87.5.",
            "Total = 30 + 150 + 162.5 + 87.5 = $430.",
            "Estimated mean = 430 ÷ 50 = $8.60.",
          ],
          commonError: "Using the top of each class, which assumes every customer spent the most possible.",
          traps: [
            { spec: { type: "number", value: 11.1 }, feedback: "You used the upper end of each class. Use the midpoints: 2.5, 7.5, 12.5, 17.5." },
            { spec: { type: "number", value: 6.1 }, feedback: "You used the lower end of each class. Use the midpoints: 2.5, 7.5, 12.5, 17.5." },
          ],
          difficulty: "core",
          guideRef: "grouped-data",
          hints: [
            "What amount could stand for everyone in {{5 <= a < 10}}?",
            "Use midpoints, then make an fx column.",
            "Total of fx ÷ 50.",
          ],
          strategy: "Add a midpoint column",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q14",
          question:
            "The mean age of the 9 pupils in a robotics CCA is 13 years. Their teacher, who is 43, joins them for a photo. What is the mean age of the 10 people in the photo?",
          answer: { type: "number", value: 16, display: "16 years" },
          solution: [
            "Total age of the pupils = 9 × 13 = 117 years.",
            "Add the teacher: 117 + 43 = 160 years.",
            "Mean = 160 ÷ 10 = 16 years.",
          ],
          solutions: [
            {
              label: "Share out the extra (quicker)",
              steps: [
                "The teacher is 43 − 13 = 30 years above the pupils' mean.",
                "Shared between all 10 people, that raises the mean by 30 ÷ 10 = 3 years.",
                "New mean = 13 + 3 = 16 years.",
              ],
            },
          ],
          commonError: "Averaging 13 and 43 to get 28, as though the teacher counted as much as all nine pupils together.",
          traps: [
            { spec: { type: "number", value: 28 }, feedback: "You averaged 13 and 43. But 13 is the mean of 9 people, so it must count 9 times. Use totals." },
          ],
          difficulty: "core",
          guideRef: "working-backwards",
          hints: [
            "Find the total age of the 9 pupils.",
            "Add the teacher's age. How many people are there now?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "averages-spread-p2-q15",
          question:
            "For each situation, say which average (mean, median or mode) is most suitable, and give a reason.\n\n1. A clothes shop deciding which T-shirt size (S, M, L or XL) to order the most of.\n2. Describing a typical house price in a street where most houses cost about $1 million but one mansion costs $25 million.\n3. Finding a typical score for a test where the scores were 64, 70, 68, 73, 66 and 71.",
          marks: 3,
          modelAnswer:
            "1. **Mode.** Sizes are categories, not numbers you can add, and the shop wants the most popular size.\n2. **Median.** The $25 million mansion is an outlier that would drag the mean far above what a typical house costs; the median is not affected by it.\n3. **Mean.** The scores are close together with no outliers, so the mean is reliable and it uses every value.",
          markScheme: [
            { point: "1: mode, because sizes are categories / it gives the most popular size", keywords: ["mode", "most common", "most popular", "categories"] },
            { point: "2: median, because the mansion is an outlier that would distort the mean", keywords: ["median", "outlier", "mansion", "distort", "pull", "drag"] },
            { point: "3: mean, because there are no outliers and it uses all the values", keywords: ["mean", "all the values", "every value", "no outliers"] },
          ],
          commonError: "Choosing the mean every time 'because it's the most accurate'. It is only reliable when there are no outliers.",
          difficulty: "core",
          guideRef: "choosing-an-average",
          hints: [
            "For each one ask: are the data numbers? Is there an outlier?",
            "The mode works for categories; the median resists outliers; the mean uses every value.",
          ],
          strategy: "Eliminate options",
        },
        {
          kind: "written",
          id: "averages-spread-p2-q16",
          question:
            "Aisha surveyed pupils about how many hours they sleep on a school night.\n\n| Group | Number asked | Mean (hours) | Range (hours) |\n|---|---|---|---|\n| Year 7 | 6 | 9.1 | 1.2 |\n| Year 8 | 50 | 8.4 | 3.5 |\n\nAisha concludes: 'Year 7 pupils always get more sleep than Year 8 pupils.'\n\n(a) Make two comparisons of the sleep data, in context.\n(b) Give two reasons why Aisha's conclusion is not justified.",
          marks: 4,
          modelAnswer:
            "(a) On average, the Year 7 pupils slept longer (mean 9.1 hours compared with 8.4 hours). The Year 7 pupils' sleep was more consistent (range 1.2 hours compared with 3.5 hours), while Year 8 sleep times varied much more.\n\n(b) First, only 6 Year 7 pupils were asked, which is far too small a sample to represent the whole year group (compared with 50 in Year 8). Second, 'always' is too strong: a mean describes a typical pupil, not every pupil. With a range of 3.5 hours, some Year 8 pupils probably sleep more than some Year 7 pupils, so the two sets of data overlap.",
          markScheme: [
            { point: "Compares the averages in context: Year 7 slept longer on average (9.1 vs 8.4 hours)", keywords: ["on average", "9.1", "8.4", "longer", "more sleep", "mean"] },
            { point: "Compares the spread in context: Year 7 more consistent (range 1.2 vs 3.5 hours)", keywords: ["consistent", "1.2", "3.5", "range", "spread", "varied", "variable"] },
            { point: "Sample size: only 6 Year 7 pupils is too small to be representative", keywords: ["6", "six", "small", "sample", "not representative"] },
            { point: "'Always' is too strong: averages describe typical values; individual pupils' data overlap", keywords: ["always", "some", "overlap", "every", "not all", "individual"] },
          ],
          commonError: "Only quoting the numbers, or only criticising the conclusion without making the comparisons first.",
          difficulty: "core",
          guideRef: "comparing-distributions",
          hints: [
            "For (a): one sentence about the means and one about the ranges, each in context.",
            "For (b): look at the 'Number asked' column.",
            "Does a higher mean tell you about *every* pupil? What does the Year 8 range suggest?",
          ],
          strategy: "Ask: is the sample big enough?",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q17",
          question:
            "Four positive whole numbers have a median of 10, a mean of 11 and a mode of 9. What is their range?",
          answer: { type: "number", value: 6 },
          solution: [
            "Write the numbers in order: a ≤ b ≤ c ≤ d. The total is 4 × 11 = 44.",
            "The median is the mean of the middle two, so b + c = 20.",
            "The mode is 9, so 9 appears at least twice. If c were 9, then b = 11 > c, which is impossible. So the two 9s are a and b.",
            "Then c = 20 − 9 = 11, and d = 44 − 9 − 9 − 11 = 15.",
            "The numbers are 9, 9, 11, 15. Range = 15 − 9 = 6.",
          ],
          commonError: "Giving the largest number (15) instead of the range.",
          traps: [
            { spec: { type: "number", value: 15 }, feedback: "15 is the largest number. The range is largest − smallest: 15 − 9." },
          ],
          difficulty: "challenge",
          guideRef: "working-backwards",
          hints: [
            "Write the numbers in order as a, b, c, d. What do the mean and median each tell you?",
            "The total is 44 and b + c = 20. Where can the two 9s go?",
            "They can't include c (then b would be 11, bigger than c). So a = b = 9.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "averages-spread-p2-q18",
          question:
            "In a class test, the boys' mean score was 60 and the girls' mean score was 75. The mean score for the whole class was 69. What fraction of the class are girls? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 3, d: 5, simplest: true },
          solution: [
            "Let there be b boys and g girls. Total score = 60b + 75g, and it is also 69(b + g).",
            "60b + 75g = 69b + 69g, so 6g = 9b, which gives 2g = 3b.",
            "So boys : girls = 2 : 3.",
            "Girls make up {{3/(2+3) = 3/5}} of the class.",
          ],
          solutions: [
            {
              label: "See-saw balance (slicker)",
              steps: [
                "The class mean 69 is the balance point. The boys sit 9 below it (at 60) and the girls sit 6 above it (at 75).",
                "To balance: number of boys × 9 = number of girls × 6, so boys : girls = 6 : 9 = 2 : 3.",
                "Girls = {{3/5}} of the class. Same answer, no algebra needed.",
              ],
            },
          ],
          commonError: "Giving the boys' fraction. The girls must be the larger group, because 69 is closer to 75.",
          traps: [
            { spec: { type: "fraction", n: 2, d: 5 }, feedback: "That's the fraction who are boys. The class mean 69 is closer to the girls' mean of 75, so there must be more girls." },
            { spec: { type: "fraction", n: 1, d: 2 }, feedback: "If half were girls, the class mean would be exactly halfway: 67.5. It's 69, so there are more girls than boys." },
          ],
          difficulty: "challenge",
          guideRef: "working-backwards",
          hints: [
            "Is 69 closer to 60 or to 75? What does that tell you about which group is bigger?",
            "Let there be b boys and g girls. Write the class total in two different ways.",
            "60b + 75g = 69(b + g). Simplify to find the ratio b : g.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "averages-spread-p2-q19",
          question:
            "Always, sometimes or never true?\n\n> 'The mean of a data set is bigger than its median.'\n\nJustify your answer with examples, and explain what makes the difference.",
          marks: 3,
          modelAnswer:
            "**Sometimes true.**\n\nTrue example: 1, 2, 9 has median 2 and mean 12 ÷ 3 = 4, so the mean is bigger.\n\nFalse examples: 1, 8, 9 has median 8 and mean 18 ÷ 3 = 6, so the mean is smaller; 2, 4, 6 has mean and median both 4, so they are equal.\n\nThe difference is where the extreme values are. A value far above the rest pulls the mean up but not the median, so the mean ends up bigger; a value far below the rest pulls the mean down below the median.",
          markScheme: [
            { point: "States 'sometimes'", keywords: ["sometimes"] },
            { point: "A correct example where the mean is bigger than the median", keywords: ["bigger", "greater", "higher", "larger", "mean is more"] },
            {
              point: "A correct example where the mean is smaller than or equal to the median, ideally with the reason (high or low extreme values pull the mean)",
              keywords: ["smaller", "less", "lower", "equal", "same", "pulls", "outlier"],
            },
          ],
          commonError: "Giving only one example. 'Sometimes' needs an example of each.",
          difficulty: "challenge",
          guideRef: "mean-median-mode-range",
          hints: [
            "Try a few sets of three numbers. Keep the median fixed and change the biggest number.",
            "What does a very large value do to the mean? To the median?",
            "To show 'sometimes' you need one example where it's true and one where it's false.",
          ],
          strategy: "Try small cases",
        },
        {
          kind: "written",
          id: "averages-spread-p2-q20",
          question:
            "Find two sets of five whole numbers (0 is allowed) that both have a mean of 10, a median of 10 and a mode of 10, where one set has a range of 4 and the other has a range of 20. Show that your sets work.\n\nThen explain why comparing two data sets using only their averages can be misleading.",
          marks: 3,
          modelAnswer:
            "Range 4: 8, 10, 10, 10, 12. Total 50, so the mean is 10; the middle value is 10; 10 appears most often; range = 12 − 8 = 4.\n\nRange 20: 0, 10, 10, 10, 20. Total 50, so the mean is 10; the middle value is 10; 10 is the mode; range = 20 − 0 = 20. (Another one that works: 1, 8, 10, 10, 21.)\n\nThe two sets have identical averages, yet the second is far more spread out: its values are much less consistent. An average only describes the centre of the data, so you also need a measure of spread, such as the range, to compare data sets fairly.",
          markScheme: [
            { point: "A valid set with mean, median and mode 10 and range 4, checked", keywords: ["8, 10, 10, 10, 12", "range 4", "50"] },
            { point: "A valid set with mean, median and mode 10 and range 20, checked", keywords: ["0, 10, 10, 10, 20", "range 20", "1, 8, 10, 10, 21"] },
            { point: "Explains that the same averages can hide very different spread, so a measure of spread is also needed", keywords: ["spread", "consistent", "range", "variation", "different"] },
          ],
          commonError: "Making a set with range 20 but forgetting to check that the total is still 50.",
          difficulty: "challenge",
          guideRef: "comparing-distributions",
          hints: [
            "What must the five numbers add up to?",
            "Start with 10, 10, 10 in the middle. Then choose the smallest and largest so that they balance around 10.",
            "For range 20 with the three 10s, the other two must add to 20 and be 20 apart.",
          ],
          strategy: "Use symmetry",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE SET — AoPS / UKMT-style, all difficulty "challenge"
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "averages-spread-ch-q01",
      question:
        "Ethan writes down every whole number from 1 up to n. The mean of his numbers is 25. He then crosses out one of the numbers, and the mean of the numbers that are left is 24.75. Which number did he cross out?",
      answer: { type: "number", value: 37 },
      solution: [
        "The numbers 1, 2, …, n pair up: first + last = second + second-last = … = n + 1. So their mean is the middle value, {{(n+1)/2}}.",
        "{{(n+1)/2 = 25}}, so n = 49.",
        "Total of all 49 numbers = 49 × 25 = 1225.",
        "After crossing one out, 48 numbers remain with mean 24.75, so their total is 48 × 24.75 = 1188.",
        "Crossed-out number = 1225 − 1188 = 37.",
      ],
      solutions: [
        {
          label: "Balance around the mean (slicker)",
          steps: [
            "Removing a number x from 49 numbers with mean 25 leaves 48 numbers with mean {{25 + (25 - x)/48}}.",
            "The mean fell by 0.25, so {{(25 - x)/48 = -0.25}}, giving 25 − x = −12.",
            "So x = 37. No large totals needed, and it shows why the mean fell: the number removed was 12 above the mean.",
          ],
        },
      ],
      commonError: "Assuming n = 50 because the mean is 25. The mean of 1 to n is {{(n+1)/2}}, so n = 49.",
      traps: [
        { spec: { type: "number", value: 12 }, feedback: "12 is how far the crossed-out number is *above* the old mean of 25." },
      ],
      difficulty: "challenge",
      guideRef: "working-backwards",
      hints: [
        "Start with the first fact. What is the mean of 1, 2, 3, …, n? Try n = 5 and n = 6 and look for a pattern.",
        "Pair the first number with the last, the second with the second-last… The mean is the middle value, {{(n+1)/2}}. So what is n?",
        "n = 49. Find the total before and the total after crossing out.",
        "Before: 49 × 25. After: 48 × 24.75.",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q02",
      question:
        "Seven different positive whole numbers have a mean of 12 and a median of 9. What is the largest possible value of the biggest number?",
      answer: { type: "number", value: 48 },
      solution: [
        "The total is 7 × 12 = 84. In order the numbers are a < b < c < 9 < e < f < g.",
        "To make g as large as possible, make every other number as small as possible.",
        "The three below 9 are at least 1, 2, 3 (total 6). The two above 9, other than g, are at least 10 and 11 (total 21).",
        "So g = 84 − 6 − 9 − 21 = 48.",
        "Check: 1, 2, 3, 9, 10, 11, 48 are all different, the median is 9 and the total is 84 ✓",
      ],
      solutions: [
        {
          label: "Pour the spare into one number",
          steps: [
            "The smallest possible list that fits is 1, 2, 3, 9, 10, 11, 12, with total 48.",
            "That leaves 84 − 48 = 36 to share out. Putting it all on the biggest number keeps the median at 9 and the numbers different.",
            "Biggest = 12 + 36 = 48. Both methods are quick; this one makes it obvious why piling everything onto one value is best.",
          ],
        },
      ],
      commonError: "Forgetting the median: 1, 2, 3, 4, 5, 6 and 63 has median 4, not 9.",
      traps: [
        { spec: { type: "number", value: 63 }, feedback: "1, 2, 3, 4, 5, 6, 63 has a median of 4, not 9. The middle number must be 9, and the two numbers just above it must be bigger than 9." },
      ],
      difficulty: "challenge",
      guideRef: "mean-median-mode-range",
      hints: [
        "The total is fixed. What is it?",
        "To make one number as big as possible, what should you do to all the others?",
        "Three numbers sit below 9 and three above. The two smaller ones above 9 can't be less than 10 and 11.",
        "Smallest choices: 1, 2, 3, 9, 10, 11. Their total is 36.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q03",
      question:
        "The five numbers 3, 5, 8, 11 and x have a mean that is equal to their median. Find all the possible values of x. Write non-whole answers as decimals and separate your answers with commas.",
      answer: { type: "list", values: [-2, 6.75, 13], display: "−2, 6.75, 13" },
      solution: [
        "The total is 27 + x, so the mean is {{(27 + x)/5}}. The median depends on where x sits in the ordered list, so split into cases.",
        "Case 1: x ≤ 5. The median is 5. {{(27 + x)/5 = 5}} gives x = −2, and −2 ≤ 5 ✓",
        "Case 2: 5 ≤ x ≤ 8. The median is x. {{(27 + x)/5 = x}} gives 27 = 4x, so x = 6.75, which is between 5 and 8 ✓",
        "Case 3: x ≥ 8. The median is 8. {{(27 + x)/5 = 8}} gives x = 13, and 13 ≥ 8 ✓",
        "So x = −2, 6.75 or 13.",
      ],
      solutions: [
        {
          label: "Picture it (explains why there are exactly three)",
          steps: [
            "As x increases, the mean {{(27 + x)/5}} rises slowly and steadily, like a gentle straight line.",
            "The median stays at 5 until x reaches 5, then equals x (rising steeply) until x reaches 8, then stays at 8.",
            "A gentle line can cross this 'flat, steep, flat' path once on each piece: three crossings, at −2, 6.75 and 13.",
          ],
        },
      ],
      commonError: "Stopping after one case (usually x = 13). Each position of x gives a different equation.",
      difficulty: "challenge",
      guideRef: "mean-median-mode-range",
      hints: [
        "Where x sits in the ordered list changes the median. What are the possible cases?",
        "Case 1: x ≤ 5 (median 5). Case 2: 5 ≤ x ≤ 8 (median x). Case 3: x ≥ 8 (median 8).",
        "The mean is {{(27 + x)/5}}. Set it equal to the median in each case.",
        "Check that each solution really lies in the range for its case.",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q04",
      question:
        "The table shows the number of siblings of the pupils in a year group. One frequency is unknown.\n\n| Number of siblings | Frequency |\n|---|---|\n| 0 | 5 |\n| 1 | 9 |\n| 2 | k |\n| 3 | 4 |\n\nThe median number of siblings is 2. What is the smallest possible value of k?",
      answer: { type: "number", value: 11 },
      solution: [
        "5 + 9 = 14 pupils have 0 or 1 sibling, so the median must be further along than the 14th pupil.",
        "There are 18 + k pupils altogether.",
        "If the number of pupils is odd, the median is the {{(n+1)/2}}th pupil. You need {{(n+1)/2 >= 15}}, so n ≥ 29 and k ≥ 11.",
        "If the number of pupils is even, both middle pupils must have 2 siblings, so n ÷ 2 ≥ 15, so n ≥ 30 and k ≥ 12.",
        "k = 10 fails: 28 pupils, and the median is halfway between the 14th (1 sibling) and 15th (2 siblings), which is 1.5.",
        "k = 11 works: 29 pupils, and the median is the 15th pupil, who has 2 siblings. Smallest k = 11.",
      ],
      solutions: [
        {
          label: "Try small cases",
          steps: [
            "k = 9: 27 pupils, median = 14th pupil = 1 sibling ✗",
            "k = 10: 28 pupils, median = halfway between the 14th (1) and 15th (2) = 1.5 ✗",
            "k = 11: 29 pupils, median = 15th pupil = 2 siblings ✓",
            "Quick here, but the general argument explains why k = 10 just misses: with an even count, the middle pair straddles the 1s and the 2s.",
          ],
        },
      ],
      commonError: "Choosing k = 10, which gives a median of 1.5, not 2.",
      traps: [
        { spec: { type: "number", value: 10 }, feedback: "With k = 10 there are 28 pupils. The median is halfway between the 14th (1 sibling) and 15th (2 siblings): 1.5, not 2." },
        { spec: { type: "number", value: 12 }, feedback: "12 works, but there's a smaller value. Try an odd number of pupils, so that there is a single middle pupil." },
      ],
      difficulty: "challenge",
      guideRef: "frequency-tables",
      hints: [
        "How many pupils have fewer than 2 siblings?",
        "14 pupils have 0 or 1. The middle of the data must lie beyond the 14th pupil.",
        "Try k = 10: how many pupils, and which positions are in the middle? Then try k = 11.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q05",
      question:
        "Nine quiz scores are shown, but three leaves have been smudged and replaced by the letters a, b and c. The leaves on each row are still in order. Key: 2 | 4 means 24.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 3 7 a |\n| 2 | 2 b 6 |\n| 3 | 0 c 9 |\n\nThe median is 25, the mean is 25 and the mode is 17. Find the three hidden scores.",
      answer: { type: "list", values: [17, 25, 36], display: "17, 25, 36" },
      solution: [
        "Median: with 9 values the median is the 5th, which is the middle leaf of stem 2. So 2 | b = 25 and b = 5 (which fits between 2 and 6 ✓).",
        "Mode: 17 must appear at least twice. The only smudged leaf that could make another 17 is a, so a = 7 (allowed, since a ≥ 7).",
        "Mean: the total must be 9 × 25 = 225.",
        "Known values: 13 + 17 + 17 + 22 + 25 + 26 + 30 + 39 = 189. So the hidden score on stem 3 is 225 − 189 = 36, and c = 6.",
        "Hidden scores: 17, 25 and 36. Check: 13, 17, 17, 22, 25, 26, 30, 36, 39 has median 25, mean 25 and mode 17 ✓",
      ],
      solutions: [
        {
          label: "Balance around the mean for c (slicker)",
          steps: [
            "Distances from 25 must add up to 0. Known values: 13 (−12), 17 (−8), 17 (−8), 22 (−3), 25 (0), 26 (+1), 30 (+5), 39 (+14).",
            "These add to −31 + 20 = −11.",
            "So the missing value must be 11 above 25: 36. Smaller numbers than adding everything to 225.",
          ],
        },
      ],
      commonError: "Trying to use the mean first. Use the clue that pins down one letter at a time: the median, then the mode, then the mean.",
      difficulty: "challenge",
      guideRef: "stem-and-leaf-averages",
      hints: [
        "Which clue pins down one letter straight away? With 9 values the median is the 5th.",
        "The 5th value is 2 | b, so b = 5. Now use the mode.",
        "For 17 to be the mode it must appear twice, so a = 7. Use the mean to find c.",
        "The total must be 9 × 25 = 225.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q06",
      question:
        "Five positive whole numbers (repeats allowed) have a mean of 6, a median of 6 and a range of 6. How many different sets of five numbers are possible? (The order you write them in doesn't matter.)",
      answer: { type: "number", value: 6 },
      solution: [
        "Write the numbers in order: a ≤ b ≤ 6 ≤ d ≤ e. The total is 30 and e = a + 6.",
        "So a + b + d + (a + 6) = 24, giving b + d = 18 − 2a, with a ≤ b ≤ 6 ≤ d ≤ a + 6.",
        "a = 1: e = 7, b + d = 16, but b ≤ 6 and d ≤ 7, so b + d ≤ 13 ✗",
        "a = 2: e = 8, b + d = 14 with b ≤ 6 and d ≤ 8, so b = 6, d = 8: {2, 6, 6, 8, 8}. (1 set)",
        "a = 3: e = 9, b + d = 12 with 3 ≤ b ≤ 6 ≤ d ≤ 9: (3, 9), (4, 8), (5, 7), (6, 6). (4 sets)",
        "a = 4: e = 10, b + d = 10 with b ≥ 4 and d ≥ 6, so b = 4, d = 6: {4, 4, 6, 6, 10}. (1 set)",
        "a = 5 or more: b + d ≤ 8 but b ≥ 5 and d ≥ 6, so b + d ≥ 11 ✗",
        "Total: 1 + 4 + 1 = 6 sets.",
      ],
      solutions: [
        {
          label: "Work with distances from 6",
          steps: [
            "Write each number as 6 + (distance). The distances must add up to 0, the middle one is 0, and the biggest minus the smallest is 6.",
            "If the smallest distance is −p, the largest is 6 − p, so the other two distances add to 2p − 6.",
            "p = 2: the other two must add to −2, so they are −2 and 0. p = 3: they add to 0: (−3, 3), (−2, 2), (−1, 1), (0, 0). p = 4: they add to 2: 0 and 2. Other values of p are impossible.",
            "1 + 4 + 1 = 6. The same count, with smaller numbers and a pleasing symmetry around p = 3.",
          ],
        },
      ],
      commonError: "Only finding the symmetric sets with smallest number 3 (giving 4). The smallest number can also be 2 or 4.",
      traps: [
        { spec: { type: "number", value: 4 }, feedback: "You've found the sets that start with 3. Can the smallest number be 2 or 4? Check each case." },
      ],
      difficulty: "challenge",
      guideRef: "mean-median-mode-range",
      hints: [
        "Write the numbers in order as a ≤ b ≤ 6 ≤ d ≤ e. What do the mean and the range tell you?",
        "The total is 30 and e = a + 6. Show that b + d = 18 − 2a.",
        "Split into cases by the smallest number a, remembering b ≤ 6 ≤ d ≤ e.",
        "Only a = 2, 3 and 4 work. Count the options in each case.",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q07",
      question:
        "Set A is 2, 4, 9, which has mean 5. Set B is 6, 8, 13, 17, which has mean 11. Wei Ling moves one number from Set B into Set A. Which numbers could she move so that the means of *both* sets go up? Give every possible number.",
      answer: { type: "list", values: [6, 8], display: "6 and 8" },
      solution: [
        "Adding a number to a set raises its mean exactly when the number is bigger than that mean. So for A's mean to rise, the number must be more than 5.",
        "Removing a number from a set raises its mean exactly when the number is smaller than that mean. So for B's mean to rise, the number must be less than 11.",
        "From Set B, the numbers between 5 and 11 are 6 and 8.",
        "Check 6: A becomes 2, 4, 9, 6 (mean 5.25) and B becomes 8, 13, 17 (mean 12.67). Check 8: A has mean 5.75 and B has mean 12. Both rise in each case ✓",
        "This surprising effect is called the Will Rogers phenomenon: moving one value can raise the averages of both groups.",
      ],
      solutions: [
        {
          label: "Totals and inequalities",
          steps: [
            "A's total is 15. After adding x, A's mean is {{(15 + x)/4}}, which is more than 5 when 15 + x > 20, so x > 5.",
            "B's total is 44. After removing x, B's mean is {{(44 - x)/3}}, which is more than 11 when 44 − x > 33, so x < 11.",
            "So 5 < x < 11, giving x = 6 or 8. Same answer, but comparing with the mean gets there faster.",
          ],
        },
      ],
      commonError: "Thinking it's impossible for both means to go up, because 'one set must lose'. The total is fixed, but the means are not.",
      difficulty: "challenge",
      guideRef: "comparing-distributions",
      hints: [
        "Try moving 6. Work out both new means.",
        "Adding a number to a set raises its mean exactly when the number is ___ the mean. Removing a number raises the mean exactly when it is ___ the mean.",
        "You need a number bigger than 5 (A's mean) but smaller than 11 (B's mean).",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "averages-spread-ch-q08",
      question:
        "The marks (whole numbers) of 25 pupils are grouped in this table.\n\n| Mark | Frequency |\n|---|---|\n| 1 to 10 | 6 |\n| 11 to 20 | 9 |\n| 21 to 30 | 10 |\n\nWei Ling estimates the mean mark using the midpoints 5.5, 15.5 and 25.5. What is the largest possible difference between her estimate and the true mean? Give your answer as a decimal.",
      answer: { type: "number", value: 4.5 },
      solution: [
        "Estimate = (6 × 5.5 + 9 × 15.5 + 10 × 25.5) ÷ 25 = (33 + 139.5 + 255) ÷ 25 = 427.5 ÷ 25 = 17.1.",
        "Every whole-number mark is at most 4.5 away from the midpoint standing in for it (for example, 10 and 1 are each 4.5 from 5.5).",
        "So the true total is at most 25 × 4.5 = 112.5 away from 427.5, and the true mean is at most 4.5 away from 17.1.",
        "This happens when every pupil scores the top mark of their class (10, 20 or 30): true mean = (60 + 180 + 300) ÷ 25 = 21.6, and 21.6 − 17.1 = 4.5.",
        "Largest possible difference = 4.5.",
      ],
      solutions: [
        {
          label: "Extremes directly",
          steps: [
            "Largest possible true mean: everyone at the top of their class: (6 × 10 + 9 × 20 + 10 × 30) ÷ 25 = 540 ÷ 25 = 21.6.",
            "Smallest possible true mean: everyone at the bottom: (6 × 1 + 9 × 11 + 10 × 21) ÷ 25 = 315 ÷ 25 = 12.6.",
            "The estimate, 17.1, sits exactly halfway, 4.5 from each end.",
            "The 'each value is at most 4.5 off' argument is slicker: it needs no totals and shows that the answer doesn't depend on the frequencies at all.",
          ],
        },
      ],
      commonError: "Answering 5 (half the class width). Whole-number marks from 1 to 10 are at most 4.5 from 5.5.",
      traps: [
        { spec: { type: "number", value: 21.6 }, feedback: "21.6 is the largest possible true mean. The question asks for the difference from the estimate." },
        { spec: { type: "number", value: 5 }, feedback: "Close! The marks are whole numbers from 1 to 10, so the furthest any mark can be from 5.5 is 4.5." },
      ],
      difficulty: "challenge",
      guideRef: "grouped-data",
      hints: [
        "How far can a single mark be from the midpoint of its class?",
        "In 1 to 10, the mark 10 is 4.5 above the midpoint 5.5, and the mark 1 is 4.5 below. The same is true in every class.",
        "If every mark is off by at most 4.5, how far off can their mean be? When does that happen?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "averages-spread-ch-q09",
      question:
        "A headteacher writes in the school newsletter: 'It is mathematically impossible for most pupils to score above the mean.'\n\n(a) Show that she is wrong by giving 10 test scores in which 9 pupils score above the mean.\n(b) Prove that it is impossible for *all* 10 pupils to score above the mean.",
      marks: 3,
      modelAnswer:
        "(a) Nine pupils score 10 and one pupil scores 0. The total is 90, so the mean is 90 ÷ 10 = 9. The nine pupils who scored 10 are all above the mean of 9. One very low score drags the mean below everyone else.\n\n(b) Let the mean be m. By the definition of the mean, the total of the 10 scores is exactly 10 × m. If every score were bigger than m, the total would be bigger than 10 × m. That contradicts the total being exactly 10 × m, so at least one pupil must score at or below the mean.",
      markScheme: [
        { point: "A valid example with 9 of the 10 scores above the mean, with the mean worked out", keywords: ["example", "mean", "nine", "9", "above the mean"] },
        { point: "Uses the fact that the total of the scores is exactly 10 × the mean", keywords: ["total", "10 × mean", "10m", "mean × 10", "sum"] },
        { point: "Concludes by contradiction: if all were above the mean, the total would be more than 10 × the mean, which is impossible", keywords: ["contradiction", "impossible", "more than", "cannot", "can't"] },
      ],
      solutions: [
        {
          label: "Balance (slicker for part b)",
          steps: [
            "The mean is the balance point: the amounts above the mean exactly cancel the amounts below it.",
            "If every score were above the mean, there would be amounts above but nothing below to cancel them.",
            "So at least one score must be at or below the mean. This is the same argument as the totals proof, in picture form.",
          ],
        },
      ],
      commonError: "In (b), giving examples instead of a proof. You must show that *no* set of 10 scores can work.",
      difficulty: "challenge",
      guideRef: "choosing-an-average",
      hints: [
        "For (a): what kind of single score drags a mean down a lot?",
        "Try nine equal high scores and one very low score.",
        "For (b): if the mean is m, what is the total of the 10 scores?",
        "If every score were more than m, what would that say about the total?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "averages-spread-ch-q10",
      question:
        "Take any list of at least three numbers, and remove the largest value and the smallest value (one copy of each).\n\n(a) Explain why the median never changes.\n(b) Show, with examples, that the mean can go up, go down or stay the same.",
      marks: 4,
      modelAnswer:
        "(a) In the ordered list, the median sits in the middle: there are the same number of values on each side of it. Removing the smallest value takes one value off the bottom end, and removing the largest takes one value off the top end. Each side loses exactly one value, so the middle value (or the middle pair, for an even count) is still in the middle, and the median does not change.\n\n(b) Down: 1, 4, 5, 10 has mean 5; removing 1 and 10 leaves 4, 5 with mean 4.5.\nUp: 0, 5, 6, 9 has mean 5; removing 0 and 9 leaves 5, 6 with mean 5.5.\nSame: 1, 5, 9 has mean 5; removing 1 and 9 leaves 5, with mean 5.\n\nThe mean goes down if the two removed values have a mean above the overall mean, up if it is below, and stays the same if it is equal.",
      markScheme: [
        { point: "The median has the same number of values on each side of it", keywords: ["middle", "each side", "either side", "same number", "halfway"] },
        { point: "Removing one value from each end keeps the middle value (or pair) in the middle, so the median is unchanged", keywords: ["each end", "both ends", "one from each", "still in the middle", "unchanged", "doesn't change"] },
        { point: "Correct examples where the mean goes up and where it goes down", keywords: ["up", "down", "increase", "decrease"] },
        { point: "Correct example where the mean stays the same (or explains using the mean of the removed pair)", keywords: ["same", "stays", "equal", "pair", "above", "below"] },
      ],
      solutions: [
        {
          label: "Why the mean moves (the deeper reason)",
          steps: [
            "Removing two values whose mean is p is like removing two values both equal to p.",
            "If p is above the overall mean, you are removing 'heavy' values, so the mean goes down; if p is below, the mean goes up; if p equals the mean, it stays the same.",
            "Check: in 1, 4, 5, 10 the removed pair has mean 5.5 > 5, so the mean goes down; in 0, 5, 6, 9 it has mean 4.5 < 5, so the mean goes up.",
          ],
        },
      ],
      commonError: "Showing that the median stays the same in one example and calling that an explanation. Part (a) needs a reason that works for every list.",
      difficulty: "challenge",
      guideRef: "mean-median-mode-range",
      hints: [
        "Experiment: try 1, 4, 5, 10 and 1, 5, 9. What happens to the median? To the mean?",
        "Picture the ordered list. How many values are on each side of the median?",
        "Removing the smallest and largest takes one value from each side.",
        "For the mean: compare the mean of the two removed numbers with the overall mean.",
      ],
      strategy: "Try small cases",
    },
  ],
};
