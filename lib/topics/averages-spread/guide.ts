import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "averages-spread",
  title: "Averages, Range & Comparing Data",
  strand: "Statistics & Probability",
  icon: "🧮",
  summary: "Find the typical value, measure the spread, and make data tell the truth.",
  intro:
    "An average squeezes a whole data set into one typical number, and the range tells you how much the values vary. In this chapter you will find both from lists, frequency tables and stem-and-leaf diagrams, work backwards from a mean, and learn which average to trust when an outlier tries to fool you. Then you will put it all together to compare two data sets like a statistician: with numbers, in context, in full sentences.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "mean-median-mode-range",
      heading: "Mean, median, mode & range",
      discovery: {
        problem:
          "Five friends build towers of linking cubes that are 2, 7, 3, 5 and 8 cubes tall. They decide to share the cubes out fairly, so that every tower ends up the same height. How tall is each tower? Try to do it by *moving* cubes in your head before you add anything up.",
        idea:
          "Take cubes off the tall towers and drop them into the gaps. The towers of 7 and 8 have 2 + 3 = 5 cubes sticking up above height 5, and the towers of 2 and 3 need exactly 3 + 2 = 5 cubes to reach height 5. So every tower ends at **5 cubes**. That level-out height is the **mean**: 25 cubes shared between 5 towers is 25 ÷ 5 = 5.",
      },
      body:
        "A set of **data** is a collection of values, such as test scores or temperatures. An **average** is a single number that describes what is *typical* of the data. There are three averages, plus one measure of **spread** (how spread out the values are):\n\n| Measure | What it tells you | How to find it |\n|---|---|---|\n| **Mean** | The fair-share value | Add all the values, then divide by how many there are |\n| **Median** | The middle value | Put the values in order and take the middle one |\n| **Mode** | The most common value | Find the value that appears most often |\n| **Range** | How spread out the data are | Largest value − smallest value |\n\n**Mean.** {{\"mean\" = \"total of the values\"/\"number of values\"}}. The mean does not have to be one of the data values, and it can be a decimal even when every value is a whole number.\n\n**Median.** First write the values in order, smallest to largest. With *n* values, the median is the {{(n+1)/2}}th value. If *n* is odd there is one middle value. If *n* is even, {{(n+1)/2}} ends in .5, so the median is halfway between the two middle values: add them and halve.\n\n**Mode.** The value that occurs most often. Data can have one mode, two modes (**bimodal**), or no mode at all if every value occurs equally often. The mode is the only average that works for non-numerical data, such as favourite colours.\n\n**Range.** {{\"range\" = \"largest\" - \"smallest\"}}. It is one number, never negative, and it measures spread, not a typical value. With negative numbers, take care: the range of −5, 0 and 4 is 4 − (−5) = 4 + 5 = 9.",
      diagram: `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five towers of cubes with heights 2, 7, 3, 5 and 8. A dashed line at height 5 marks the mean. The 5 cubes above the line on the towers of 7 and 8 exactly fill the 5 gaps below the line on the towers of 2 and 3."><rect width="360" height="250" fill="#ffffff"/><g stroke="#334155" stroke-width="1"><rect x="50" y="180" width="36" height="20" fill="#c7d2fe"/><rect x="50" y="160" width="36" height="20" fill="#c7d2fe"/><rect x="50" y="140" width="36" height="20" fill="#bbf7d0" stroke-dasharray="4 3"/><rect x="50" y="120" width="36" height="20" fill="#bbf7d0" stroke-dasharray="4 3"/><rect x="50" y="100" width="36" height="20" fill="#bbf7d0" stroke-dasharray="4 3"/><rect x="110" y="180" width="36" height="20" fill="#c7d2fe"/><rect x="110" y="160" width="36" height="20" fill="#c7d2fe"/><rect x="110" y="140" width="36" height="20" fill="#c7d2fe"/><rect x="110" y="120" width="36" height="20" fill="#c7d2fe"/><rect x="110" y="100" width="36" height="20" fill="#c7d2fe"/><rect x="110" y="80" width="36" height="20" fill="#fecaca"/><rect x="110" y="60" width="36" height="20" fill="#fecaca"/><rect x="170" y="180" width="36" height="20" fill="#c7d2fe"/><rect x="170" y="160" width="36" height="20" fill="#c7d2fe"/><rect x="170" y="140" width="36" height="20" fill="#c7d2fe"/><rect x="170" y="120" width="36" height="20" fill="#bbf7d0" stroke-dasharray="4 3"/><rect x="170" y="100" width="36" height="20" fill="#bbf7d0" stroke-dasharray="4 3"/><rect x="230" y="180" width="36" height="20" fill="#c7d2fe"/><rect x="230" y="160" width="36" height="20" fill="#c7d2fe"/><rect x="230" y="140" width="36" height="20" fill="#c7d2fe"/><rect x="230" y="120" width="36" height="20" fill="#c7d2fe"/><rect x="230" y="100" width="36" height="20" fill="#c7d2fe"/><rect x="290" y="180" width="36" height="20" fill="#c7d2fe"/><rect x="290" y="160" width="36" height="20" fill="#c7d2fe"/><rect x="290" y="140" width="36" height="20" fill="#c7d2fe"/><rect x="290" y="120" width="36" height="20" fill="#c7d2fe"/><rect x="290" y="100" width="36" height="20" fill="#c7d2fe"/><rect x="290" y="80" width="36" height="20" fill="#fecaca"/><rect x="290" y="60" width="36" height="20" fill="#fecaca"/><rect x="290" y="40" width="36" height="20" fill="#fecaca"/></g><line x1="30" y1="200" x2="340" y2="200" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="100" x2="340" y2="100" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6 4"/><text x="34" y="94" font-size="12" font-family="sans-serif" fill="#b91c1c">mean = 5</text><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="68" y="216">2</text><text x="128" y="216">7</text><text x="188" y="216">3</text><text x="248" y="216">5</text><text x="308" y="216">8</text></g><rect x="40" y="228" width="12" height="12" fill="#fecaca" stroke="#334155"/><text x="58" y="238" font-size="11" font-family="sans-serif" fill="#1f2937">cubes above the mean</text><rect x="200" y="228" width="12" height="12" fill="#bbf7d0" stroke="#334155" stroke-dasharray="3 2"/><text x="218" y="238" font-size="11" font-family="sans-serif" fill="#1f2937">gaps below the mean</text></svg>`,
      diagramCaption:
        "The 5 red cubes above the dashed line exactly fill the 5 green gaps below it, so every tower levels out at 5: the mean.",
      workedExamples: [
        {
          title: "All four measures, even number of values",
          problem: "Find the mean, median, mode and range of 7, 3, 9, 4, 3, 10.",
          steps: [
            "Mean: total = 7 + 3 + 9 + 4 + 3 + 10 = 36. There are 6 values, so the mean is 36 ÷ 6 = 6.",
            "Median: in order the values are 3, 3, 4, 7, 9, 10. With 6 values the median is the {{(6+1)/2 = 3.5}}th value, halfway between the 3rd (4) and the 4th (7).",
            "Median = {{(4+7)/2 = 5.5}}.",
            "Mode: 3 appears twice and every other value once, so the mode is 3.",
            "Range: 10 − 3 = 7.",
          ],
          answer: "Mean 6, median 5.5, mode 3, range 7.",
          yourTurn: {
            question: "Your turn: find the median of 12, 5, 8, 15, 5, 9.",
            answer: { type: "number", value: 8.5 },
            solution:
              "In order: 5, 5, 8, 9, 12, 15. Six values, so the median is halfway between the 3rd and 4th values: {{(8+9)/2 = 8.5}}.",
          },
        },
        {
          title: "Negative numbers",
          problem:
            "The overnight lows in Seoul one week in early March were −3, 2, −5, 0, −3, 4 and −2 °C. Find the mean, median, mode and range.",
          steps: [
            "Add the positives and the negatives separately: 2 + 4 = 6 and −3 − 5 − 3 − 2 = −13.",
            "Total = 6 + (−13) = −7, so the mean = −7 ÷ 7 = −1 °C.",
            "In order: −5, −3, −3, −2, 0, 2, 4. The 4th of the 7 values is in the middle, so the median is −2 °C.",
            "−3 appears twice, so the mode is −3 °C.",
            "Range = 4 − (−5) = 4 + 5 = 9 °C.",
          ],
          answer: "Mean −1 °C, median −2 °C, mode −3 °C, range 9 °C.",
        },
        {
          title: "Decimals, and which average flatters",
          problem:
            "Ethan's times for the 100 m in five races were 13.2, 12.8, 14.1, 12.8 and 13.6 seconds. Find all four measures. Which average makes Ethan look fastest?",
          steps: [
            "Total = 13.2 + 12.8 + 14.1 + 12.8 + 13.6 = 66.5, so the mean = 66.5 ÷ 5 = 13.3 s.",
            "In order: 12.8, 12.8, 13.2, 13.6, 14.1. The median is the 3rd value: 13.2 s.",
            "Mode = 12.8 s. Range = 14.1 − 12.8 = 1.3 s.",
            "For race times, smaller is better. The mode, 12.8 s, is also his fastest time, so quoting it flatters him.",
          ],
          answer: "Mean 13.3 s, median 13.2 s, mode 12.8 s, range 1.3 s. The mode makes him look fastest.",
        },
      ],
      keyPoints: [
        "Always put the data in order before finding the median.",
        "The median is the {{(n+1)/2}}th value; with an even number of values, take the mean of the two middle values.",
        "Mean = total ÷ number of values. It does not have to be one of the data values.",
        "Range = largest − smallest: a single number, never negative, that measures spread.",
      ],
      whyItWorks:
        "The mean is the level-out value. If every value were replaced by the mean, the total would not change, because mean × number of values = total. So the amounts above the mean exactly balance the amounts below it: in the cube picture, 2 + 3 cubes above the line fill 3 + 2 gaps below. The median works differently. It only cares about *position*: half the values are at or below it and half are at or above it, which is why the data must be in order first.",
      strategies: ["Order the data first", "Add positives and negatives separately", "Estimate first"],
      thinkDeeper:
        "Find five whole numbers with mean 6, median 5, mode 4 and range 7. Then prove that there is only one possible answer.",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "choosing-an-average",
      heading: "Choosing an average & outliers",
      discovery: {
        problem:
          "A bubble-tea shop advertises for staff: 'Mean monthly pay here: $4000!' The six workers earn $2400, $2500, $2500, $2600, $2800 and $3000, and the owner pays herself $12 200. Check the advert. Is it true? Is it fair? What average would a new worker actually expect?",
        idea:
          "The advert is true: the total is $28 000 and 28 000 ÷ 7 = $4000. But it is misleading, because all six workers earn $3000 or less. The owner's pay is an **outlier** that drags the mean upwards. The median ($2600) and the mode ($2500) describe a typical worker far better.",
      },
      body:
        "An **outlier** is a value that is much larger or much smaller than the rest of the data. Outliers can be genuine (a professional athlete in a school race) or mistakes (a height typed as 1500 cm instead of 150 cm).\n\n| Measure | Effect of one very large outlier |\n|---|---|\n| Mean | Pulled strongly towards it, because the mean uses the size of every value |\n| Median | Hardly moves, because it depends only on position |\n| Mode | Usually unchanged |\n| Range | Increased a lot, because it uses the extreme values |\n\n**Choosing the best average**\n\n- Use the **mean** when there are no outliers. It uses every value, so it gives the fullest picture.\n- Use the **median** when there are outliers or the data are lopsided (**skewed**), such as salaries, house prices or reaction times.\n- Use the **mode** for non-numerical (**categorical**) data, such as favourite subjects, or when you need the most popular item, such as the shoe size a shop should stock most of.\n\n**What the range tells you.** The range measures **consistency**. A small range means the values are close together; a large range means they vary a lot. Because it uses only the two extreme values, one outlier can make the range look far bigger than the spread of the rest of the data.\n\n> Don't simply delete an outlier. Ask *why* it is there. If it is a mistake, correct or remove it. If it is real, keep it and choose an average that isn't fooled by it.",
      diagram: `<svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the monthly pay of seven people. Six workers earn between 2400 and 3000 dollars; the owner earns 12 200 dollars. A dashed mean line at 4000 dollars sits above all six workers' bars, while a median line at 2600 dollars runs through the cluster of workers' bars."><rect width="460" height="260" fill="#ffffff"/><g stroke="#1f2937"><line x1="55" y1="30" x2="55" y2="220"/><line x1="55" y1="220" x2="360" y2="220"/><line x1="51" y1="220" x2="55" y2="220"/><line x1="51" y1="160" x2="55" y2="160"/><line x1="51" y1="100" x2="55" y2="100"/><line x1="51" y1="40" x2="55" y2="40"/></g><g font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937"><text x="48" y="224">$0</text><text x="48" y="164">$4000</text><text x="48" y="104">$8000</text><text x="48" y="44">$12 000</text></g><g stroke="#334155" fill="#c7d2fe"><rect x="65" y="184" width="30" height="36"/><rect x="107" y="182.5" width="30" height="37.5"/><rect x="149" y="182.5" width="30" height="37.5"/><rect x="191" y="181" width="30" height="39"/><rect x="233" y="178" width="30" height="42"/><rect x="275" y="175" width="30" height="45"/><rect x="317" y="37" width="30" height="183" fill="#fde68a"/></g><g font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="80" y="234">1</text><text x="122" y="234">2</text><text x="164" y="234">3</text><text x="206" y="234">4</text><text x="248" y="234">5</text><text x="290" y="234">6</text><text x="332" y="234">Owner</text><text x="200" y="254">monthly pay of the six workers and the owner</text></g><line x1="55" y1="160" x2="352" y2="160" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6 4"/><text x="356" y="164" font-size="11" font-family="sans-serif" fill="#b91c1c">mean $4000</text><line x1="55" y1="181" x2="352" y2="181" stroke="#15803d" stroke-width="2" stroke-dasharray="2 3"/><text x="356" y="192" font-size="11" font-family="sans-serif" fill="#15803d">median $2600</text></svg>`,
      diagramCaption:
        "One huge bar drags the mean line up to $4000, above every worker's pay. The median line stays with the crowd at $2600.",
      workedExamples: [
        {
          title: "The effect of an outlier",
          problem:
            "In a spelling test out of 20, seven pupils scored 14, 15, 15, 16, 17, 18 and 3 (Jun felt ill and left early). (a) Find the mean and the median. (b) Which better represents the group? (c) What happens to each if Jun's score is left out?",
          steps: [
            "Total = 14 + 15 + 15 + 16 + 17 + 18 + 3 = 98, so the mean = 98 ÷ 7 = 14.",
            "In order: 3, 14, 15, 15, 16, 17, 18. The median is the 4th value: 15.",
            "Six of the seven scores are 14 or more, so the outlier 3 has dragged the mean down. The median, 15, is more typical.",
            "Without Jun: mean = 95 ÷ 6 ≈ 15.8, and the median is halfway between 15 and 16, which is 15.5.",
            "Removing one value moved the mean by about 1.8 but the median by only 0.5.",
          ],
          answer: "(a) Mean 14, median 15. (b) The median. (c) The mean rises to about 15.8; the median rises only to 15.5.",
          yourTurn: {
            question:
              "Your turn: a piano class has five pupils aged 11, 12, 12, 13 and 14, plus their teacher, aged 58. Find the mean age of all six people in years.",
            answer: { type: "number", value: 20 },
            solution:
              "Total = 11 + 12 + 12 + 13 + 14 + 58 = 120, so the mean = 120 ÷ 6 = 20 years: older than every pupil! The median, {{(12+13)/2 = 12.5}} years, is far more typical.",
          },
        },
        {
          title: "Pick the right average",
          problem:
            "Which average should each person use? (a) A shoe shop deciding which size to order most of. (b) A property website describing a typical HDB resale price in a town where a few flats sold for over $1.5 million. (c) A teacher summarising marks in a test with no unusual scores.",
          steps: [
            "(a) **Mode**: the shop wants the most popular size. A mean shoe size such as 5.37 doesn't even exist.",
            "(b) **Median**: the few very expensive flats are outliers that would pull the mean above what most flats sell for.",
            "(c) **Mean**: there are no outliers, so the mean uses every mark and represents the class well.",
          ],
          answer: "(a) Mode, (b) median, (c) mean.",
        },
      ],
      keyPoints: [
        "An outlier is a value far from the rest: investigate it before removing it.",
        "Outliers drag the mean and stretch the range; the median and mode barely change.",
        "Mean: no outliers. Median: outliers or skewed data. Mode: categories or 'most popular'.",
        "A small range means consistent data; a large range means variable data.",
      ],
      whyItWorks:
        "The mean uses the *size* of every value. If the owner's pay went up by $7000, the total would go up by $7000, and with 7 people the mean would rise by 7000 ÷ 7 = $1000. The median uses only *position*: making the largest value even larger doesn't move anything past the middle, so the median doesn't change at all.",
      strategies: ["Consider extremes", "Ask: is this value typical?", "Match the average to the data"],
      thinkDeeper:
        "The owner gives herself a pay rise of $7000. How do the mean, the median and the range change? Now suppose instead that the lowest-paid worker gets a $200 rise. Which measures change this time, and is there anything surprising about the mode?",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "working-backwards",
      heading: "Working backwards with the mean",
      discovery: {
        problem:
          "Priya's mean score on four maths tests is 15 out of 20. What must she score on the fifth test to raise her mean to 16? Before you calculate, guess: 16, 17, or more?",
        idea:
          "Work with **totals**, not means. Four tests with mean 15 means 4 × 15 = 60 marks so far. Five tests with mean 16 needs 5 × 16 = 80 marks. So she needs 80 − 60 = **20**: full marks, and nothing less will do. Another way to see it: the fifth test must reach the new mean, 16, *and* supply the extra 1 mark that each of the other four tests is short of, so 16 + 4 = 20.",
      },
      body:
        "Every mean hides a **total**. Rearranging {{\"mean\" = \"total\"/\"number of values\"}} gives the key fact of this section:\n\n    {{\"total\" = \"mean\" * \"number of values\"}}\n\nOnce you have totals, most mean puzzles become simple addition and subtraction.\n\n**Finding a missing value**\n\n1. Find the total the data *should* have: mean × number of values.\n2. Add up the values you already know.\n3. Missing value = required total − known total.\n\n**Adding or removing a value.** Work out the old total and the new total. The difference between them is the value that was added or removed.\n\n**Changing every value**\n\n- Add the same number *k* to every value: the mean, median and mode all go up by *k*, but the range stays the same, because everything slides along together.\n- Multiply every value by a positive number *k*: the mean, median, mode *and* range are all multiplied by *k*.\n\n**Combining two groups.** The combined mean is the combined total ÷ the combined number of values. It is *not* the mean of the two means, unless the two groups are the same size.",
      diagram: `<svg viewBox="0 0 440 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model. The top bar has five equal parts of 16, a total of 80. The bottom bar has four parts of 15, a total of 60, followed by a missing part marked with a question mark that must be 20 for the two bars to be the same length."><rect width="440" height="175" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937"><text x="20" y="18" font-size="12">Target: 5 tests with mean 16, total 5 × 16 = 80</text><text x="20" y="84" font-size="12">So far: 4 tests with mean 15, total 4 × 15 = 60</text></g><g stroke="#334155" fill="#c7d2fe"><rect x="20" y="26" width="80" height="34"/><rect x="100" y="26" width="80" height="34"/><rect x="180" y="26" width="80" height="34"/><rect x="260" y="26" width="80" height="34"/><rect x="340" y="26" width="80" height="34"/></g><g stroke="#334155" fill="#bbf7d0"><rect x="20" y="92" width="75" height="34"/><rect x="95" y="92" width="75" height="34"/><rect x="170" y="92" width="75" height="34"/><rect x="245" y="92" width="75" height="34"/></g><rect x="320" y="92" width="100" height="34" fill="#fde68a" stroke="#334155"/><g font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937"><text x="60" y="48">16</text><text x="140" y="48">16</text><text x="220" y="48">16</text><text x="300" y="48">16</text><text x="380" y="48">16</text><text x="57.5" y="114">15</text><text x="132.5" y="114">15</text><text x="207.5" y="114">15</text><text x="282.5" y="114">15</text><text x="370" y="115" font-size="15" font-weight="bold">?</text></g><g stroke="#1f2937"><line x1="20" y1="140" x2="318" y2="140"/><line x1="20" y1="135" x2="20" y2="145"/><line x1="318" y1="135" x2="318" y2="145"/><line x1="322" y1="140" x2="420" y2="140"/><line x1="322" y1="135" x2="322" y2="145"/><line x1="420" y1="135" x2="420" y2="145"/></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937"><text x="170" y="158">60</text><text x="370" y="158">80 − 60 = 20</text></g></svg>`,
      diagramCaption:
        "Priya's problem as a bar model: five 16s make 80, her four tests make 60, so the missing piece is 20.",
      workedExamples: [
        {
          title: "A missing value",
          problem: "The mean of five numbers is 8. Four of them are 3, 7, 9 and 12. Find the fifth number.",
          steps: [
            "Required total = 5 × 8 = 40.",
            "Known total = 3 + 7 + 9 + 12 = 31.",
            "Fifth number = 40 − 31 = 9.",
            "Check: (3 + 7 + 9 + 12 + 9) ÷ 5 = 40 ÷ 5 = 8 ✓",
          ],
          answer: "9",
          yourTurn: {
            question:
              "Your turn: the mean of six numbers is 7. Five of them are 4, 9, 2, 10 and 6. Find the sixth number.",
            answer: { type: "number", value: 11 },
            solution: "Required total = 6 × 7 = 42. Known total = 4 + 9 + 2 + 10 + 6 = 31. Sixth number = 42 − 31 = 11.",
          },
        },
        {
          title: "Someone joins the group",
          problem:
            "The mean age of the 5 members of a CCA committee is 13. A new member joins, and the mean age becomes 13.5. How old is the new member?",
          steps: [
            "Old total = 5 × 13 = 65 years.",
            "New total = 6 × 13.5 = 81 years.",
            "New member = 81 − 65 = 16 years old.",
            "Sense check: the mean went *up*, so the new member must be older than 13 ✓",
          ],
          answer: "16 years old",
        },
        {
          title: "Combining two classes",
          problem:
            "Class 8A has 20 pupils with a mean test score of 62. Class 8B has 30 pupils with a mean score of 72. Find the mean score of all 50 pupils.",
          steps: [
            "8A total = 20 × 62 = 1240.",
            "8B total = 30 × 72 = 2160.",
            "Combined mean = (1240 + 2160) ÷ 50 = 3400 ÷ 50 = 68.",
            "It is not {{(62+72)/2 = 67}}: 8B has more pupils, so it pulls the combined mean towards its own mean, 72.",
          ],
          answer: "68",
        },
      ],
      keyPoints: [
        "{{\"total\" = \"mean\" * \"number of values\"}}: turn means into totals first.",
        "Missing value = required total − known total.",
        "Adding *k* to every value adds *k* to each average and leaves the range unchanged.",
        "Combined mean = combined total ÷ combined number of values, not the mean of the means.",
      ],
      whyItWorks:
        "Since {{\"mean\" = \"total\"/\"number of values\"}}, multiplying both sides by the number of values gives total = mean × number of values. It is the same move you use to solve {{x/5 = 8}}. Totals can be added and subtracted, but means usually can't. So the trick is always: means → totals, do the arithmetic, then totals → mean.",
      strategies: ["Work backwards", "Use a bar model", "Check by substituting"],
      thinkDeeper:
        "Ten numbers have a mean of 10. One of them is changed, and the mean becomes 11. Exactly how did that number change? Could the median have changed too? Could it have stayed the same? Give an example of each.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "frequency-tables",
      heading: "Averages from frequency tables",
      discovery: {
        problem:
          "A survey counts how many people live in each of the 20 flats on one floor of an HDB block. 1 person: 3 flats. 2 people: 6 flats. 3 people: 5 flats. 4 people: 4 flats. 5 people: 2 flats.\n\nAisha adds 1 + 2 + 3 + 4 + 5 and divides by 5 to get a mean of 3. Marcus adds the numbers of flats, 3 + 6 + 5 + 4 + 2 = 20, and divides by 5 to get 4. Both are wrong. What is the real mean number of people per flat, and what did each of them actually work out?",
        idea:
          "The table is shorthand for a list of 20 numbers: three 1s, six 2s, five 3s, four 4s and two 5s. The total number of people is 1 × 3 + 2 × 6 + 3 × 5 + 4 × 4 + 5 × 2 = 3 + 12 + 15 + 16 + 10 = 56, so the mean is 56 ÷ 20 = **2.8 people per flat**. Aisha averaged the labels 1 to 5 and ignored how many flats had each. Marcus found the mean number of flats in each category. Neither of them found people per flat.",
      },
      body:
        "A **frequency table** shows how many times each value occurs. The value is usually called *x* and the number of times it occurs is its **frequency**, *f*. It is a compact way to write a long list.\n\n**Mean.** Add an **fx** column (value × frequency). Each entry is the total for one row, so the column adds up to the total of the whole list.\n\n| People in flat, x | Flats, f | fx |\n|---|---|---|\n| 1 | 3 | 3 |\n| 2 | 6 | 12 |\n| 3 | 5 | 15 |\n| 4 | 4 | 16 |\n| 5 | 2 | 10 |\n| **Total** | **20** | **56** |\n\n    {{\"mean\" = \"total of fx\"/\"total of f\" = 56/20 = 2.8}}\n\nStatisticians write this as {{(Σfx)/(Σf)}}, where Σ (the Greek capital letter sigma) means 'add them all up'.\n\n**Median.** With *n* = total frequency, the median is the {{(n+1)/2}}th value. Here {{(20+1)/2 = 10.5}}, so it is halfway between the 10th and 11th values. Use **running totals** (cumulative frequency): the 1s are values 1 to 3, the 2s are values 4 to 9, the 3s are values 10 to 14. Both the 10th and the 11th values are 3, so the median is **3 people**.\n\n**Mode.** The value with the highest frequency: **2 people** (6 flats). The mode is the value 2, *not* the frequency 6.\n\n**Range.** Largest value − smallest value = 5 − 1 = **4 people**. Use the values *x*, not the frequencies.",
      diagram: `<svg viewBox="0 0 400 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the number of people in 20 flats: 1 person 3 flats, 2 people 6 flats, 3 people 5 flats, 4 people 4 flats, 5 people 2 flats. The tallest bar, at 2 people, is labelled mode. A red dashed line and a triangle under the axis at 2.8 mark the mean as the balance point."><rect width="400" height="262" fill="#ffffff"/><g stroke="#e5e7eb"><line x1="50" y1="180" x2="380" y2="180"/><line x1="50" y1="160" x2="380" y2="160"/><line x1="50" y1="140" x2="380" y2="140"/><line x1="50" y1="120" x2="380" y2="120"/><line x1="50" y1="100" x2="380" y2="100"/><line x1="50" y1="80" x2="380" y2="80"/></g><g stroke="#334155" fill="#c7d2fe"><rect x="62" y="140" width="16" height="60"/><rect x="132" y="80" width="16" height="120" fill="#fde68a"/><rect x="202" y="100" width="16" height="100"/><rect x="272" y="120" width="16" height="80"/><rect x="342" y="160" width="16" height="40"/></g><g stroke="#1f2937"><line x1="50" y1="50" x2="50" y2="200"/><line x1="50" y1="200" x2="380" y2="200"/></g><g font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937"><text x="44" y="204">0</text><text x="44" y="184">1</text><text x="44" y="164">2</text><text x="44" y="144">3</text><text x="44" y="124">4</text><text x="44" y="104">5</text><text x="44" y="84">6</text></g><line x1="196" y1="56" x2="196" y2="200" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="5 4"/><polygon points="196,200 189,213 203,213" fill="#b91c1c"/><text x="200" y="52" font-size="11" font-family="sans-serif" fill="#b91c1c">mean = 2.8 (balance point)</text><text x="140" y="74" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">mode</text><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="70" y="230">1</text><text x="140" y="230">2</text><text x="210" y="230">3</text><text x="280" y="230">4</text><text x="350" y="230">5</text></g><text x="215" y="252" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">number of people in the flat (x)</text><text x="12" y="40" font-size="11" font-family="sans-serif" fill="#1f2937">number of flats (f)</text></svg>`,
      diagramCaption:
        "Think of each bar as a pile of flats on a see-saw. It balances at the mean, 2.8. The tallest bar is the mode, 2.",
      workedExamples: [
        {
          title: "All four measures from a table",
          problem:
            "The goals scored by a school football team in 25 matches are shown below.\n\n| Goals | 0 | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|---|\n| Matches | 4 | 7 | 6 | 5 | 3 |\n\nFind the mean, median, mode and range.",
          steps: [
            "fx for each column: 0 × 4 = 0, 1 × 7 = 7, 2 × 6 = 12, 3 × 5 = 15, 4 × 3 = 12.",
            "Total goals = 0 + 7 + 12 + 15 + 12 = 46. Total matches = 4 + 7 + 6 + 5 + 3 = 25.",
            "Mean = 46 ÷ 25 = 1.84 goals per match.",
            "Median: the {{(25+1)/2 = 13}}th value. Running totals: 0 goals covers matches 1 to 4, 1 goal covers 5 to 11, 2 goals covers 12 to 17. So the 13th value is 2.",
            "Mode = 1 goal (highest frequency, 7). Range = 4 − 0 = 4 goals.",
          ],
          answer: "Mean 1.84, median 2, mode 1, range 4 goals.",
          yourTurn: {
            question:
              "Your turn: 20 pupils were asked how many siblings they have.\n\n| Siblings | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|\n| Pupils | 3 | 8 | 6 | 3 |\n\nFind the mean number of siblings.",
            answer: { type: "number", value: 1.45 },
            solution:
              "fx: 0 × 3 = 0, 1 × 8 = 8, 2 × 6 = 12, 3 × 3 = 9, so the total number of siblings is 29. There are 20 pupils, so the mean = 29 ÷ 20 = 1.45.",
          },
        },
        {
          title: "A median that falls between two values",
          problem:
            "The shoe sizes of 30 pupils are shown below.\n\n| Shoe size | 3 | 4 | 5 | 6 | 7 | 8 |\n|---|---|---|---|---|---|---|\n| Pupils | 2 | 6 | 7 | 9 | 4 | 2 |\n\nFind the median and the mode.",
          steps: [
            "n = 2 + 6 + 7 + 9 + 4 + 2 = 30, so the median is the {{(30+1)/2 = 15.5}}th value: halfway between the 15th and the 16th.",
            "Running totals: up to size 3 is 2 pupils, up to size 4 is 8, up to size 5 is 15, up to size 6 is 24.",
            "So the 15th pupil is the last one in size 5, and the 16th is the first in size 6.",
            "Median = {{(5+6)/2 = 5.5}}. Mode = size 6 (9 pupils).",
          ],
          answer: "Median 5.5, mode 6.",
        },
        {
          title: "A missing frequency",
          problem:
            "The table shows the number of pets owned by some pupils. The mean number of pets is 1.5. Find *k*.\n\n| Pets, x | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|\n| Frequency, f | 6 | 9 | k | 5 |",
          steps: [
            "Total frequency = 6 + 9 + k + 5 = 20 + k.",
            "Total pets = 0 × 6 + 1 × 9 + 2k + 3 × 5 = 24 + 2k.",
            "Mean = total pets ÷ total frequency, so {{(24 + 2k)/(20 + k) = 1.5}}.",
            "Multiply both sides by (20 + k): 24 + 2k = 30 + 1.5k.",
            "Subtract 1.5k and 24 from both sides: 0.5k = 6, so k = 12.",
            "Check: 24 + 24 = 48 pets and 20 + 12 = 32 pupils; 48 ÷ 32 = 1.5 ✓",
          ],
          answer: "k = 12",
        },
      ],
      keyPoints: [
        "Mean = {{\"total of fx\"/\"total of f\"}}: divide by the total frequency, not by the number of different values.",
        "Median: the {{(n+1)/2}}th value, where n is the total frequency. Find it with running totals.",
        "The mode is the value with the highest frequency, not the frequency itself.",
        "Range = largest value − smallest value, using x, not f.",
      ],
      whyItWorks:
        "Each row of the table stands for a repeated addition: five 3s add up to 3 × 5 = 15. So the fx entries are the totals of each group of equal values, and adding them gives the total of the whole list, exactly what you would get by writing out all 20 values and adding them one by one. Dividing by the number of values, which is the total frequency, then gives the ordinary mean.",
      strategies: ["Add an fx column", "Use running totals", "Introduce a variable"],
      thinkDeeper:
        "Without calculating, decide whether the mean of the HDB data would go up, go down or stay the same if one more flat with 3 people were added. What if the new flat had 2 people instead? Explain using the balance-point picture.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "stem-and-leaf-averages",
      heading: "Averages from stem-and-leaf diagrams",
      discovery: {
        problem:
          "The stem-and-leaf diagram shows how many minutes 15 pupils take to travel to school. Key: 1 | 5 means 15 minutes.\n\n| Stem | Leaves |\n|---|---|\n| 0 | 8 9 |\n| 1 | 2 5 5 5 7 |\n| 2 | 0 3 6 8 8 |\n| 3 | 1 4 |\n| 4 | 5 |\n\nWithout writing the 15 times out as a list, find the median, the mode and the range. Where in the diagram is the middle value hiding?",
        idea:
          "A stem-and-leaf diagram is already in order, so you can simply **count leaves**. With 15 values the median is the {{(15+1)/2 = 8}}th. Stem 0 has 2 leaves and stem 1 has 5 more (7 so far), so the 8th value is the first leaf on stem 2: **20 minutes**. The mode is **15** (three 5s on the same stem). The range is the last value minus the first: 45 − 8 = **37 minutes**.",
      },
      body:
        "A **stem-and-leaf diagram** sorts data while keeping every value. Each value is split into a **stem** (the leading digit or digits) and a **leaf** (the final digit). The leaves on each row are written in order, so the whole diagram reads like an ordered list, row by row.\n\nAlways read the **key** first. It tells you the place value of the leaves: with key 3 | 2 = 32 the leaves are units, but with key 3 | 2 = 3.2 they are tenths. Same picture, very different numbers.\n\nReading the measures straight off the diagram:\n\n- **How many values?** Count the leaves. That gives *n*.\n- **Median**: find the {{(n+1)/2}}th leaf, counting from the top-left (the smallest value). Use the number of leaves in each row to skip whole rows at a time.\n- **Mode**: the leaf that repeats most often *on the same stem*. A 5 on stem 1 and a 5 on stem 2 are different values: 15 and 25.\n- **Range**: the last leaf on the bottom row (the largest value) minus the first leaf on the top row (the smallest).\n- **Mean**: every value is still there, so you *can* find the mean. Rebuild each value from its stem and leaf, add them all, and divide by *n*.\n\nThe diagram also shows the **shape** of the data: the longest rows show where the values cluster.",
      diagram: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stem-and-leaf diagram of 15 travel times with stems 0 to 4. Leaves: stem 0: 8, 9; stem 1: 2, 5, 5, 5, 7; stem 2: 0, 3, 6, 8, 8; stem 3: 1, 4; stem 4: 5. Running totals 2, 7, 12, 14 and 15 are shown beside the rows. The first leaf on stem 2 is circled as the 8th value, the median 20. The three 5s on stem 1 are shaded as the mode, 15."><rect width="400" height="200" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937"><text x="40" y="22" font-size="12" font-weight="bold" text-anchor="middle">Stem</text><text x="68" y="22" font-size="12" font-weight="bold">Leaves</text><text x="200" y="22" font-size="11" text-anchor="middle" fill="#475569">running total</text></g><line x1="58" y1="30" x2="58" y2="154" stroke="#1f2937" stroke-width="1.5"/><rect x="88" y="57" width="64" height="21" rx="4" fill="#bbf7d0"/><circle cx="76" cy="91" r="11" fill="#fde68a" stroke="#b45309" stroke-width="1.5"/><g font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><text x="40" y="48">0</text><text x="40" y="72">1</text><text x="40" y="96">2</text><text x="40" y="120">3</text><text x="40" y="144">4</text><text x="76" y="48">8</text><text x="98" y="48">9</text><text x="76" y="72">2</text><text x="98" y="72">5</text><text x="120" y="72">5</text><text x="142" y="72">5</text><text x="164" y="72">7</text><text x="76" y="96">0</text><text x="98" y="96">3</text><text x="120" y="96">6</text><text x="142" y="96">8</text><text x="164" y="96">8</text><text x="76" y="120">1</text><text x="98" y="120">4</text><text x="76" y="144">5</text></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#475569"><text x="200" y="48">2</text><text x="200" y="72">7</text><text x="200" y="96">12</text><text x="200" y="120">14</text><text x="200" y="144">15</text></g><g font-family="sans-serif" font-size="12"><text x="240" y="48" fill="#1f2937">n = 15 values</text><text x="240" y="72" fill="#15803d">mode = 15</text><text x="240" y="96" fill="#b45309">8th value: median 20</text><text x="240" y="144" fill="#1f2937">range = 45 − 8 = 37</text><text x="20" y="182" fill="#1f2937">Key: 1 | 5 means 15 minutes</text></g></svg>`,
      diagramCaption:
        "Count leaves using the running totals: 7 values come before stem 2, so its first leaf is the 8th value, the median, 20 minutes.",
      workedExamples: [
        {
          title: "Reading off median, mode and range",
          problem:
            "The stem-and-leaf diagram shows the number of push-ups 11 pupils managed in one minute. Key: 2 | 4 means 24 push-ups.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 7 9 |\n| 2 | 2 4 4 8 |\n| 3 | 0 3 5 6 |\n| 4 | 2 |\n\nFind the median, mode and range.",
          steps: [
            "Count the leaves: 2 + 4 + 4 + 1 = 11 values.",
            "The median is the {{(11+1)/2 = 6}}th value. Stem 1 holds values 1 and 2, and stem 2 holds values 3 to 6, so the 6th is the last leaf on stem 2: 28.",
            "The leaf 4 appears twice on stem 2, so the mode is 24.",
            "Range = last value − first value = 42 − 17 = 25.",
          ],
          answer: "Median 28, mode 24, range 25 push-ups.",
          yourTurn: {
            question:
              "Your turn: the diagram shows the quiz scores of 12 pupils. Key: 2 | 3 means 23.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 5 8 |\n| 2 | 1 3 3 6 9 |\n| 3 | 2 4 7 |\n| 4 | 0 4 |\n\nFind the median score.",
            answer: { type: "number", value: 27.5 },
            solution:
              "There are 12 leaves, so the median is halfway between the 6th and 7th values. Stem 1 holds 2 values, so the 6th and 7th are the 4th and 5th leaves on stem 2: 26 and 29. Median = {{(26+29)/2 = 27.5}}.",
          },
        },
        {
          title: "Decimals: read the key!",
          problem:
            "The masses of 12 durians at a fruit stall are shown. Key: 2 | 5 means 2.5 kg.\n\n| Stem | Leaves |\n|---|---|\n| 1 | 4 6 6 6 |\n| 2 | 0 2 5 9 |\n| 3 | 1 3 6 8 |\n\nFind the median, mode and range.",
          steps: [
            "The key says the leaves are tenths, so 1 | 4 means 1.4 kg.",
            "There are 12 leaves, so the median is halfway between the 6th and 7th values. Stem 1 holds 4 values, so these are the 2nd and 3rd leaves on stem 2: 2.2 and 2.5.",
            "Median = {{(2.2 + 2.5)/2 = 2.35}} kg.",
            "Mode = 1.6 kg (three 6s on stem 1). Range = 3.8 − 1.4 = 2.4 kg.",
          ],
          answer: "Median 2.35 kg, mode 1.6 kg, range 2.4 kg.",
        },
      ],
      keyPoints: [
        "Read the key first: it fixes the place value of the leaves.",
        "The diagram is already in order, so count leaves to reach the {{(n+1)/2}}th value.",
        "Mode = the most repeated leaf on the *same* stem.",
        "Range = last value − first value.",
      ],
      whyItWorks:
        "The stems go up in order, and the leaves on each stem are written in order. So reading left to right, top to bottom, visits the values from smallest to largest. That is exactly the ordered list the median needs: the diagram has already done the sorting for you.",
      strategies: ["Count, don't copy", "Use row totals to skip ahead", "Read the key first"],
      thinkDeeper:
        "A 16th pupil joins the travel-time survey and takes 50 minutes. Which of the median, mode and range change, and what are their new values? Would your answers be different if the new pupil took 3 minutes instead?",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "comparing-distributions",
      heading: "Comparing distributions",
      discovery: {
        problem:
          "Arjun and Mei are trying out for the school basketball team. In each of five practice sessions they took 10 free throws. Here are the numbers they scored:\n\n| Session | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Arjun | 6 | 6 | 7 | 6 | 5 |\n| Mei | 10 | 2 | 9 | 3 | 6 |\n\nWork out each player's mean. The coach can pick only one of them. Who should it be, and does it depend on the match?",
        idea:
          "Both means are 6 (30 ÷ 5), so the average alone can't separate them. The **range** can: Arjun's is 7 − 5 = 2 but Mei's is 10 − 2 = 8. Arjun is **consistent**; Mei is **variable**, brilliant one day and poor the next. A coach who needs a reliable player might choose Arjun; a team that needs a big score to have any chance might gamble on Mei. To compare data sets you need an average **and** a measure of spread.",
      },
      body:
        "A **distribution** is the whole pattern of a data set: where its values sit and how spread out they are. To compare two distributions, always make **two** comparisons and write each one in context:\n\n1. **Compare an average** (the mean or the median). Which group is higher *on average*, and what does that mean in real life?\n2. **Compare the spread** (the range). Which group is more **consistent** (smaller range) and which is more **variable** (larger range)?\n\nA strong comparison quotes the numbers *and* says what they mean:\n\n| Weak | Strong |\n|---|---|\n| B's median is lower. | On average, customers at Stall B waited less time (median 3 minutes compared with 6 minutes). |\n| A has a smaller range. | Waiting times at Stall A were more consistent (range 5 minutes compared with 11 minutes). |\n\n> **Sentence frame:** On average, ___ because the ___ is ___ compared with ___. ___ is more consistent because its range is smaller (___ compared with ___).\n\n**Be careful with conclusions**\n\n- **Sample size**: a conclusion based on 4 people is far less reliable than one based on 40. A small sample can be fooled by one unusual value.\n- **Variation**: data naturally vary. If two averages are very close, the difference could just be chance, so say the data *suggest*, not *prove*.\n- **Outliers**: one extreme value can make a range misleading. Mention it if you spot one, and prefer the median.\n- **Fairness**: compare like with like: the same test, the same conditions, the same units.",
      diagram: `<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two dot plots on the same scale from 0 to 10. Arjun's scores 5, 6, 6, 6 and 7 are bunched together with range 2. Mei's scores 2, 3, 6, 9 and 10 are spread out with range 8. A dashed line at 6 shows that both means are 6."><rect width="420" height="240" fill="#ffffff"/><line x1="254" y1="36" x2="254" y2="215" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="5 4"/><g font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937"><text x="10" y="20">Arjun: mean 6, range 2</text><text x="10" y="140">Mei: mean 6, range 8</text></g><text x="260" y="136" font-size="11" font-family="sans-serif" fill="#b91c1c">mean 6</text><g stroke="#1f2937"><line x1="50" y1="100" x2="390" y2="100"/><line x1="50" y1="100" x2="50" y2="105"/><line x1="84" y1="100" x2="84" y2="105"/><line x1="118" y1="100" x2="118" y2="105"/><line x1="152" y1="100" x2="152" y2="105"/><line x1="186" y1="100" x2="186" y2="105"/><line x1="220" y1="100" x2="220" y2="105"/><line x1="254" y1="100" x2="254" y2="105"/><line x1="288" y1="100" x2="288" y2="105"/><line x1="322" y1="100" x2="322" y2="105"/><line x1="356" y1="100" x2="356" y2="105"/><line x1="390" y1="100" x2="390" y2="105"/><line x1="50" y1="215" x2="390" y2="215"/><line x1="50" y1="215" x2="50" y2="220"/><line x1="84" y1="215" x2="84" y2="220"/><line x1="118" y1="215" x2="118" y2="220"/><line x1="152" y1="215" x2="152" y2="220"/><line x1="186" y1="215" x2="186" y2="220"/><line x1="220" y1="215" x2="220" y2="220"/><line x1="254" y1="215" x2="254" y2="220"/><line x1="288" y1="215" x2="288" y2="220"/><line x1="322" y1="215" x2="322" y2="220"/><line x1="356" y1="215" x2="356" y2="220"/><line x1="390" y1="215" x2="390" y2="220"/></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937"><text x="50" y="117">0</text><text x="84" y="117">1</text><text x="118" y="117">2</text><text x="152" y="117">3</text><text x="186" y="117">4</text><text x="220" y="117">5</text><text x="254" y="117">6</text><text x="288" y="117">7</text><text x="322" y="117">8</text><text x="356" y="117">9</text><text x="390" y="117">10</text><text x="50" y="232">0</text><text x="84" y="232">1</text><text x="118" y="232">2</text><text x="152" y="232">3</text><text x="186" y="232">4</text><text x="220" y="232">5</text><text x="254" y="232">6</text><text x="288" y="232">7</text><text x="322" y="232">8</text><text x="356" y="232">9</text><text x="390" y="232">10</text></g><g stroke="#334155" fill="#c7d2fe"><circle cx="220" cy="92" r="6"/><circle cx="254" cy="92" r="6"/><circle cx="254" cy="79" r="6"/><circle cx="254" cy="66" r="6"/><circle cx="288" cy="92" r="6"/></g><g stroke="#334155" fill="#fde68a"><circle cx="118" cy="207" r="6"/><circle cx="152" cy="207" r="6"/><circle cx="254" cy="207" r="6"/><circle cx="356" cy="207" r="6"/><circle cx="390" cy="207" r="6"/></g><g stroke="#1f2937" fill="none"><path d="M220 44 V52 M220 48 H288 M288 44 V52"/><path d="M118 168 V176 M118 172 H390 M390 168 V176"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937"><text x="294" y="52">range 2</text><text x="170" y="166" text-anchor="middle">range 8</text></g></svg>`,
      diagramCaption:
        "Same mean, very different spread: Arjun's scores huddle around 6, while Mei's are scattered from 2 to 10.",
      workedExamples: [
        {
          title: "Average plus spread, in context",
          problem:
            "Waiting times, in minutes, for 7 customers at each of two hawker stalls:\n\n| Stall | Waiting times (minutes) |\n|---|---|\n| A | 4, 6, 5, 7, 5, 6, 9 |\n| B | 2, 3, 12, 4, 3, 10, 1 |\n\nCompare the waiting times at the two stalls.",
          steps: [
            "Order the data. A: 4, 5, 5, 6, 6, 7, 9. B: 1, 2, 3, 3, 4, 10, 12.",
            "Stall B has two long waits (10 and 12 minutes) that would pull its mean up, so compare medians. The medians are the 4th values: A = 6 minutes, B = 3 minutes.",
            "Ranges: A = 9 − 4 = 5 minutes; B = 12 − 1 = 11 minutes.",
            "Average, in context: on average, customers at Stall B wait less time (median 3 minutes compared with 6 minutes).",
            "Spread, in context: waiting times at Stall A are more consistent (range 5 minutes compared with 11 minutes). B is quicker on average but less predictable.",
          ],
          answer:
            "Stall B is quicker on average (median 3 minutes vs 6 minutes); Stall A is more consistent (range 5 minutes vs 11 minutes).",
          yourTurn: {
            question:
              "Your turn: Hana's MRT journey times over 6 days were 22, 25, 24, 23, 26 and 24 minutes. Jun's were 18, 30, 21, 35, 19 and 27 minutes. Both have a median of 24 minutes. How many minutes larger is Jun's range than Hana's?",
            answer: { type: "number", value: 13 },
            solution:
              "Hana's range = 26 − 22 = 4 minutes. Jun's range = 35 − 18 = 17 minutes. 17 − 4 = 13 minutes. Their typical journeys are the same, but Hana's are far more consistent.",
          },
        },
        {
          title: "Is the conclusion justified?",
          problem:
            "Ravi claims: 'Class 8R is better at mental maths than Class 8Z. Our mean score was 18 out of 25 and theirs was only 16.' All 30 pupils in 8R sat the test, but only 4 pupils in 8Z sat it (the rest were on a museum trip). The ranges were 9 for 8R and 15 for 8Z. Is Ravi's claim justified?",
          steps: [
            "Average: 8R's mean (18) is higher than 8Z's (16), which *suggests* that 8R did better.",
            "Sample size: 8Z's result comes from only 4 pupils. With so few, one weak or strong score changes the mean a lot, so 8Z's mean is unreliable.",
            "Spread: 8Z's range (15) is large, so its four scores varied a lot, and those four pupils may not be typical of their class.",
            "Conclusion: the data suggest 8R did better, but Ravi can't be confident. A fair comparison needs most of 8Z to sit the same test.",
          ],
          answer:
            "Not fully justified: the 8Z sample (4 pupils) is too small and too variable to represent the whole class.",
        },
      ],
      keyPoints: [
        "Compare an average AND the range: two separate sentences.",
        "Always write in context: 'on average the girls jumped further', not just 'the mean is bigger'.",
        "Smaller range = more consistent; larger range = more variable.",
        "Small samples and large variation make conclusions less reliable: say 'suggests', not 'proves'.",
      ],
      whyItWorks:
        "Two data sets can share the same average and still behave completely differently: 6, 6, 6 and 2, 6, 10 both have a mean of 6. An average describes the centre and the range describes the spread. You need both to describe a distribution, just as you need both the length and the width to describe a rectangle.",
      strategies: ["Compare centre, then spread", "Write it in context", "Ask: is the sample big enough?"],
      thinkDeeper:
        "Invent two sets of five whole numbers with the same median but different ranges, then two sets with the same range but different medians. Harder: can two *different* data sets have the same mean, median, mode AND range? Find an example or explain why not.",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "grouped-data",
      heading: "Estimated mean from grouped data",
      discovery: {
        problem:
          "40 runners finished a 5 km fun run at East Coast Park. Their times were recorded only in groups:\n\n| Time, t (minutes) | Number of runners |\n|---|---|\n| {{20 <= t < 30}} | 6 |\n| {{30 <= t < 40}} | 15 |\n| {{40 <= t < 50}} | 11 |\n| {{50 <= t < 60}} | 8 |\n\nYou don't know a single exact time. Can you still give a sensible estimate of the mean time? What one number would you use to stand for the 6 runners in the first group?",
        idea:
          "Use the **midpoint** of each group to stand for everyone in it: treat the 6 runners in {{20 <= t < 30}} as if they each took 25 minutes. Then it is just a frequency table: (25 × 6 + 35 × 15 + 45 × 11 + 55 × 8) ÷ 40 = 1610 ÷ 40 = **40.25 minutes**. It is only an **estimate**, because the real times inside each group are unknown.",
      },
      body:
        "**Stretch:** When data take many different values, they are often **grouped** into **classes**, such as {{30 <= t < 40}}, which means at least 30 minutes but less than 40. Grouping makes a large data set easier to read, but you lose the exact values.\n\n- The **class width** is the upper bound − the lower bound (here 10 minutes).\n- The **midpoint** of a class is halfway between its bounds: {{(\"lower\" + \"upper\")/2}}. For {{30 <= t < 40}} it is {{(30 + 40)/2 = 35}}.\n- The **modal class** is the class with the highest frequency (when the classes are equal widths). Here it is {{30 <= t < 40}}.\n\n**Estimating the mean.** Add a midpoint column, then treat the midpoints as the values *x*:\n\n| Time, t (minutes) | Frequency, f | Midpoint, x | fx |\n|---|---|---|---|\n| {{20 <= t < 30}} | 6 | 25 | 150 |\n| {{30 <= t < 40}} | 15 | 35 | 525 |\n| {{40 <= t < 50}} | 11 | 45 | 495 |\n| {{50 <= t < 60}} | 8 | 55 | 440 |\n| **Total** | **40** | | **1610** |\n\n    {{\"estimated mean\" = \"total of fx\"/\"total of f\" = 1610/40 = 40.25}} minutes\n\n**Why only an estimate?** We have assumed that every runner in a class finished exactly at its midpoint. Really, some were faster and some slower. These errors usually partly cancel out, so the estimate is close, but we can't be sure.\n\n**Median and range.** You can find the class that *contains* the median. With 40 runners the median is halfway between the 20th and 21st; the running totals are 6, then 21, so both are in {{30 <= t < 40}}. You can't find the exact range, only that it is less than 60 − 20 = 40 minutes.",
      diagram: `<svg viewBox="0 0 420 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Histogram of 40 fun-run times in four equal classes from 20 to 60 minutes with frequencies 6, 15, 11 and 8. Dashed lines mark the class midpoints 25, 35, 45 and 55. The tallest bar, 30 to 40 minutes, is the modal class. A red dashed line at 40.25 minutes marks the estimated mean."><rect width="420" height="270" fill="#ffffff"/><g stroke="#334155"><rect x="60" y="160" width="80" height="60" fill="#bae6fd"/><rect x="140" y="70" width="80" height="150" fill="#fde68a"/><rect x="220" y="110" width="80" height="110" fill="#bae6fd"/><rect x="300" y="140" width="80" height="80" fill="#bae6fd"/></g><g stroke="#334155" stroke-dasharray="3 3"><line x1="100" y1="160" x2="100" y2="220"/><line x1="180" y1="70" x2="180" y2="220"/><line x1="260" y1="110" x2="260" y2="220"/><line x1="340" y1="140" x2="340" y2="220"/></g><g stroke="#1f2937"><line x1="60" y1="50" x2="60" y2="220"/><line x1="60" y1="220" x2="395" y2="220"/><line x1="56" y1="220" x2="60" y2="220"/><line x1="56" y1="170" x2="60" y2="170"/><line x1="56" y1="120" x2="60" y2="120"/><line x1="56" y1="70" x2="60" y2="70"/></g><g font-family="sans-serif" font-size="11" text-anchor="end" fill="#1f2937"><text x="54" y="224">0</text><text x="54" y="174">5</text><text x="54" y="124">10</text><text x="54" y="74">15</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937"><text x="104" y="212">mid 25</text><text x="184" y="212">mid 35</text><text x="264" y="212">mid 45</text><text x="344" y="212">mid 55</text></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937"><text x="100" y="154">6</text><text x="180" y="64">15</text><text x="260" y="104">11</text><text x="340" y="134">8</text><text x="180" y="40" font-size="11">modal class</text><text x="60" y="236">20</text><text x="140" y="236">30</text><text x="220" y="236">40</text><text x="300" y="236">50</text><text x="380" y="236">60</text><text x="220" y="258" font-size="11">time, t (minutes)</text></g><text x="10" y="40" font-size="11" font-family="sans-serif" fill="#1f2937">frequency</text><line x1="222" y1="48" x2="222" y2="220" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="6 4"/><text x="226" y="44" font-size="11" font-family="sans-serif" fill="#b91c1c">estimated mean ≈ 40.25</text></svg>`,
      diagramCaption:
        "Each bar's runners are treated as if they all sat on its midpoint (dashed lines). The estimated mean, 40.25 minutes, is where the whole histogram would balance.",
      workedExamples: [
        {
          title: "Estimated mean and modal class",
          problem:
            "The masses of 25 apples are recorded in the table.\n\n| Mass, m (grams) | Frequency |\n|---|---|\n| {{100 <= m < 120}} | 3 |\n| {{120 <= m < 140}} | 8 |\n| {{140 <= m < 160}} | 10 |\n| {{160 <= m < 180}} | 4 |\n\n(a) Estimate the mean mass. (b) Write down the modal class.",
          steps: [
            "Midpoints: 110, 130, 150 and 170 grams.",
            "fx: 110 × 3 = 330, 130 × 8 = 1040, 150 × 10 = 1500, 170 × 4 = 680.",
            "Total fx = 330 + 1040 + 1500 + 680 = 3550. Total frequency = 25.",
            "Estimated mean = 3550 ÷ 25 = 142 g.",
            "Modal class: {{140 <= m < 160}}, which has the highest frequency (10).",
          ],
          answer: "(a) About 142 g. (b) {{140 <= m < 160}}.",
          yourTurn: {
            question:
              "Your turn: 20 pupils recorded how long they spent on homework last night.\n\n| Time, t (minutes) | Frequency |\n|---|---|\n| {{0 <= t < 20}} | 3 |\n| {{20 <= t < 40}} | 7 |\n| {{40 <= t < 60}} | 6 |\n| {{60 <= t < 80}} | 4 |\n\nEstimate the mean time in minutes.",
            answer: { type: "number", value: 41 },
            solution:
              "Midpoints 10, 30, 50, 70. fx: 30 + 210 + 300 + 280 = 820. Estimated mean = 820 ÷ 20 = 41 minutes.",
          },
        },
        {
          title: "Spot the error, then find the median class",
          problem:
            "For the apple data, Siti writes: 'Estimated mean = (110 + 130 + 150 + 170) ÷ 4 = 140 g.' Explain her mistake, then find the class that contains the median.",
          steps: [
            "Siti has found the mean of the four midpoints. That treats every class as if it held the same number of apples.",
            "The frequencies are different (3, 8, 10, 4), so each midpoint must be weighted by its frequency. The correct estimate is 142 g.",
            "With 25 apples, the median is the {{(25+1)/2 = 13}}th. Running totals: 3, then 11, then 21, so apples 12 to 21 are in {{140 <= m < 160}}.",
            "So the median lies in the class {{140 <= m < 160}}.",
          ],
          answer: "Siti ignored the frequencies. The median is in the class {{140 <= m < 160}}.",
        },
      ],
      keyPoints: [
        "Midpoint = {{(\"lower\" + \"upper\")/2}}: it stands in for every value in its class.",
        "Estimated mean = total of (midpoint × frequency) ÷ total frequency.",
        "It is only an estimate, because the exact values inside each class are unknown.",
        "The modal class is the class with the highest frequency.",
      ],
      whyItWorks:
        "Grouping throws away the exact values, so you replace each one with the best single guess: the middle of its class. Some real values lie above the midpoint and some below, and these errors tend to cancel out, which is why the estimate is usually close. But if most of the values in each class were bunched near the top, the estimate would come out too low.",
      strategies: ["Make it simpler", "Add a midpoint column", "Consider extremes"],
      thinkDeeper:
        "For the fun-run data, what is the smallest the true mean could possibly be? What is the largest? (Imagine every runner at the very bottom of their class, then at the very top.) How far from 40.25 can the truth be?",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is the mean?", back: "The total of the values ÷ the number of values: the fair-share value." },
      { front: "How do you find the median?", back: "Put the values in order and take the middle one: the {{(n+1)/2}}th value." },
      { front: "The median of an even number of values?", back: "Halfway between the two middle values: add them and divide by 2." },
      { front: "What is the mode?", back: "The most common value. There can be one mode, several, or none." },
      { front: "What is the range?", back: "Largest value − smallest value. It measures spread (consistency), not a typical value." },
      { front: "What is an outlier?", back: "A value much bigger or smaller than the rest. It drags the mean and stretches the range; the median barely moves." },
      { front: "Best average when there are outliers?", back: "The median, because it depends only on position, not size." },
      { front: "Best average for non-numerical data?", back: "The mode, e.g. the most popular colour or the shoe size to stock most of." },
      { front: "How do you get a total from a mean?", back: "Total = mean × number of values." },
      { front: "Mean from a frequency table?", back: "Add an fx column. Mean = {{\"total of fx\"/\"total of f\"}}." },
      { front: "Mode from a frequency table?", back: "The value with the highest frequency, not the frequency itself." },
      { front: "What does the key on a stem-and-leaf diagram tell you?", back: "The place value of the leaves, e.g. 3 | 2 means 32, or 3.2 with a different key." },
      { front: "How do you compare two distributions?", back: "Compare an average AND the range, each in a full sentence in context." },
      { front: "A smaller range means…?", back: "The data are more consistent (less spread out)." },
      { front: "Combined mean of two groups?", back: "Combined total ÷ combined number of values, not the mean of the two means (unless the groups are the same size)." },
      { front: "Estimated mean from grouped data?", back: "Use each class midpoint as x: total of (midpoint × f) ÷ total of f." },
    ],
    mustKnow: [
      "I can find the mean, median, mode and range of a list, including negative numbers and decimals.",
      "I can find the median of an even number of values.",
      "I can explain how an outlier affects the mean, median, mode and range.",
      "I can choose the most appropriate average for a situation and justify my choice.",
      "I can use total = mean × number of values to find a missing value.",
      "I can work out how the mean changes when a value is added, removed or changed, or when two groups are combined.",
      "I can find the mean, median, mode and range from a frequency table.",
      "I can read the median, mode and range from a stem-and-leaf diagram, using the key.",
      "I can compare two data sets using an average and the range, in full sentences and in context.",
      "I can comment on whether a sample is large enough, and varied enough, to support a conclusion.",
      "I can estimate the mean from grouped data and find the modal class (stretch).",
    ],
    misconceptions: [
      {
        wrong: "The median of 7, 2, 9, 4, 5 is 9, because 9 is in the middle of the list.",
        right: "Order the values first: 2, 4, 5, 7, 9. The median is 5.",
      },
      {
        wrong: "In a frequency table, the mode is the biggest frequency.",
        right: "The mode is the *value* with the biggest frequency. If 9 pupils wear size 6, the mode is size 6, not 9.",
      },
      {
        wrong: "Mean from a frequency table = total frequency ÷ number of different values.",
        right: "Mean = total of fx ÷ total of f. Dividing the frequencies by the number of different values ignores what the values actually are.",
      },
      {
        wrong: "The range of −5, 0 and 4 is 4 − 5 = −1.",
        right: "Range = 4 − (−5) = 4 + 5 = 9. A range can never be negative.",
      },
      {
        wrong: "If one class's mean is 62 and another's is 72, the combined mean must be 67.",
        right: "Only if the classes are the same size. Use combined total ÷ combined number of pupils: with 20 and 30 pupils it is 3400 ÷ 50 = 68.",
      },
      {
        wrong: "The mean is always the best average because it uses all the data.",
        right: "One outlier can drag the mean far from a typical value, and then the median is better. For categories, only the mode works.",
      },
    ],
    examMistakes: [
      "Forgetting to put the data in order before finding the median.",
      "Giving the position of the median (such as '5.5th') instead of its value.",
      "Dividing by the number of different values in a frequency table instead of by the total frequency.",
      "Giving the frequency instead of the value as the mode.",
      "Writing the range as two numbers ('2 to 10') instead of one number (8).",
      "Comparing distributions with numbers only and no context, or comparing an average but not the spread.",
      "Ignoring the key on a stem-and-leaf diagram, e.g. reading 3 | 2 as 32 when the key says it means 3.2.",
      "Using the class bounds or the class width instead of the midpoints when estimating a grouped mean.",
    ],
    mnemonics: [
      {
        topic: "The four measures",
        device: "Hey diddle diddle, the median's the middle; you add and divide for the mean. The mode is the one that appears the most, and the range is the difference between.",
        explanation: "Each line of the rhyme is one measure: the middle value, add-and-divide, most common, and largest minus smallest.",
      },
      {
        topic: "Median and mode",
        device: "MEDian = MEDium; MOde = MOst",
        explanation: "Medium is the middle size, so the median is the middle value. The mode is the value you see most often.",
      },
      {
        topic: "Comparing distributions",
        device: "Centre, Spread, Story",
        explanation: "Compare the centre (an average), compare the spread (the range), and tell the story: say what each comparison means in context.",
      },
      {
        topic: "Working backwards",
        device: "Means can't be added; totals can.",
        explanation: "Turn every mean into a total (mean × number of values) before you add, subtract or combine anything.",
      },
    ],
    realWorld: [
      {
        title: "Household income",
        detail:
          "Singapore's Department of Statistics headlines the *median* monthly household income, because a small number of very high incomes would pull the mean well above what a typical household earns.",
        emoji: "🏠",
      },
      {
        title: "Stocking a shoe shop",
        detail: "A shoe shop orders most of the modal size. The mean shoe size might not even be a size that exists.",
        emoji: "👟",
      },
      {
        title: "Picking a team",
        detail:
          "A cricketer's batting average is runs scored ÷ number of times out. Coaches look at both the average and the consistency (range) of a player's scores when choosing a team.",
        emoji: "🏏",
      },
      {
        title: "Weather and climate",
        detail:
          "Singapore's temperature usually stays between about 24 °C and 32 °C, a small daily range, while some desert cities can swing by more than 15 °C between night and day. The range measures how variable the weather is.",
        emoji: "🌦️",
      },
      {
        title: "Quality control",
        detail:
          "A factory filling 500 ml drink bottles checks both the mean (is it about 500 ml?) and the range (is every bottle close to it?). A growing range warns that the machine needs fixing.",
        emoji: "🏭",
      },
    ],
    videos: [
      {
        title: "Mean, median, mode and range",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+mean+median+mode+range",
      },
      {
        title: "Mean from a frequency table",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+mean+from+a+frequency+table",
      },
      {
        title: "Stem and leaf diagrams",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+stem+and+leaf+diagrams",
      },
      {
        title: "Comparing data distributions",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+comparing+data+distributions",
      },
    ],
    formulas: [
      { name: "Mean", formula: "{{\"mean\" = \"total of the values\"/\"number of values\"}}" },
      { name: "Median position", formula: "{{(n+1)/2}}th value, with the data in order", note: "With an even number of values, take the mean of the two middle values." },
      { name: "Range", formula: "range = largest value − smallest value", note: "One number, never negative. It measures spread." },
      { name: "Total from the mean", formula: "{{\"total\" = \"mean\" * \"number of values\"}}", note: "The key to every missing-value problem." },
      { name: "Mean from a frequency table", formula: "{{\"mean\" = (Σfx)/(Σf)}}", note: "Σ means 'add them all up': total of fx ÷ total frequency." },
      {
        name: "Combined mean",
        formula: "{{\"combined mean\" = \"total of group 1 + total of group 2\"/\"size of group 1 + size of group 2\"}}",
        note: "Not the mean of the two means, unless the groups are the same size.",
      },
      { name: "Class midpoint", formula: "{{\"midpoint\" = (\"lower bound\" + \"upper bound\")/2}}" },
      {
        name: "Estimated mean (grouped data)",
        formula: "{{\"estimated mean\" = (Σ\"midpoint\" * f)/(Σf)}}",
        note: "An estimate, because each value is assumed to sit at its class midpoint.",
      },
    ],
  },
};
