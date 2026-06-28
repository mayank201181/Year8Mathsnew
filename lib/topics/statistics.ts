import type { Topic } from "../types";

export const statistics: Topic = {
  id: "statistics",
  title: "Statistics",
  subject: "Maths",
  icon: "📊",
  strand: "Statistics & Probability",
  intro:
    "Summarise data with averages and range, build the right chart, read pie charts and scatter graphs, and compare distributions to tell the story behind the numbers.",
  guide: [
    {
      heading: "Averages and range",
      discovery: {
        problem:
          "Seven friends scored 4, 6, 6, 7, 8, 9 and 45 in a quiz (one answered an extra bonus round). What is the mean? What is the median? Which better describes a 'typical' score — and why do they disagree?",
        idea:
          "Mean = (4+6+6+7+8+9+45) ÷ 7 = 85 ÷ 7 ≈ 12.1, but six of the seven scored 9 or less. The median (the middle value, 7) is far more typical. One extreme value (an outlier) drags the mean upward but barely moves the median.",
      },
      body:
        "An **average** is a single value that represents a whole set of data. There are three to know, plus a measure of spread:\n\n- **Mean** = total of all values ÷ number of values.\n- **Median** = the middle value when the data is put in order (if there are two middle values, take their mean).\n- **Mode** = the value that appears most often (there can be more than one, or none).\n- **Range** = largest − smallest. It measures *spread*, not average.\n\nAlways put data in order before finding the median.",
      keyPoints: [
        "Mean = sum of values ÷ number of values.",
        "Median = middle value once the data is in order.",
        "Mode = most frequent value; range = largest − smallest.",
        "The range describes spread, not a typical value.",
      ],
      strategies: ["Order the data first", "Mean, median, mode — pick the right tool"],
      whyItWorks:
        "The mean 'shares out' the total equally: if everyone got the mean, the total would be unchanged. That is why one very large value pulls the mean toward it, while the median only counts position, not size.",
    },
    {
      heading: "Mean from a frequency table; choosing the best average",
      discovery: {
        problem:
          "A class records the number of pets each pupil owns: 0 pets (5 pupils), 1 pet (8 pupils), 2 pets (4 pupils), 3 pets (3 pupils). Writing out all 20 values to add up is slow. Can you find the mean faster?",
        idea:
          "Multiply each value by its frequency, then add: (0×5)+(1×8)+(2×4)+(3×3) = 0+8+8+9 = 25 pets in total. There are 5+8+4+3 = 20 pupils, so the mean is 25 ÷ 20 = 1.25 pets. A frequency table lets you total many values without listing them.",
      },
      body:
        "A **frequency table** records how often each value occurs. To find the mean:\n\n1. Multiply each value by its frequency (value × frequency).\n2. Add these products to get the overall total.\n3. Divide by the total frequency (the number of items).\n\n**Choosing the best average:**\n\n- The **mean** uses every value, but is distorted by outliers.\n- The **median** ignores extremes, so it is best for skewed data (like house prices or salaries).\n- The **mode** is the only average that works for non-numerical data (like favourite colour).",
      keyPoints: [
        "Mean from a table = Σ(value × frequency) ÷ Σ(frequency).",
        "Use the median when there are extreme values (outliers).",
        "Use the mode for categories / non-numerical data.",
        "The mean is sensitive to outliers; the median is not.",
      ],
      strategies: ["Add a 'value × frequency' column", "Match the average to the data type"],
    },
    {
      heading: "Charts, pie charts and choosing a display",
      discovery: {
        problem:
          "In a survey of 60 people, 20 chose tea, 25 chose coffee and 15 chose juice. You want a pie chart. What angle should the 'coffee' slice be?",
        idea:
          "Each person's share of 360° is 360 ÷ 60 = 6° per person. Coffee has 25 people, so its angle is 25 × 6 = 150°. In general, slice angle = (frequency ÷ total) × 360°.",
      },
      body:
        "Different data needs different displays:\n\n- **Bar charts** compare separate categories; bars have gaps and equal width.\n- **Pictograms** use a symbol to stand for a number of items (state the key, e.g. 🙂 = 10 people).\n- **Line graphs** show how something changes over time (the points are joined).\n- **Pie charts** show how a whole is split into parts.\n\nFor a **pie chart**, each slice angle is its share of 360°:\n\n**angle = (frequency ÷ total) × 360°**\n\nThe slice angles must add up to 360°, so it is easy to check your work.",
      keyPoints: [
        "Pie-chart slice angle = (frequency ÷ total) × 360°.",
        "All slice angles add to 360° (a useful check).",
        "Bar charts compare categories; line graphs show change over time.",
        "A pictogram always needs a key saying what one symbol represents.",
      ],
      strategies: ["Find the angle for one item first", "Check the angles total 360°"],
      whyItWorks:
        "A full pie chart is one whole turn, 360°. Each category should take the same fraction of the circle as it takes of the data, so its angle is its fraction of the total multiplied by 360°.",
      diagrams: [
        '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pie chart split into a 150 degree coffee slice and the rest">\n  <circle cx="60" cy="60" r="50" fill="#eee" stroke="#333" />\n  <path d="M60 60 L110 60 A50 50 0 0 1 17 95 Z" fill="#c97" stroke="#333" />\n  <text x="78" y="78" font-size="9">coffee</text>\n  <text x="30" y="40" font-size="9">rest</text>\n</svg>',
      ],
    },
    {
      heading: "Data types, scatter graphs and correlation",
      discovery: {
        problem:
          "You plot ice-cream sales against the day's temperature for two weeks. The points rise from bottom-left to top-right. What does that pattern tell you — and could you predict sales on a hot day you have not yet recorded?",
        idea:
          "As temperature goes up, sales go up: the points slope upward, showing positive correlation. The trend lets you estimate sales for a temperature in between your data points. Correlation shows a relationship, though it does not prove one thing causes the other.",
      },
      body:
        "Data comes in two types:\n\n- **Discrete** data can only take separate, countable values (number of goals, shoe size).\n- **Continuous** data can take any value in a range, usually from measuring (height, time, temperature).\n\nA **scatter graph** plots pairs of values to look for a relationship between them:\n\n- **Positive correlation** — as one goes up, the other goes up (points slope up).\n- **Negative correlation** — as one goes up, the other goes down (points slope down).\n- **No correlation** — points are scattered with no clear pattern.\n\nA **line of best fit** follows the trend and can be used to estimate missing values. Remember: correlation does not prove causation.",
      keyPoints: [
        "Discrete = counted, separate values; continuous = measured, any value in a range.",
        "Scatter graphs reveal correlation between two variables.",
        "Up-slope = positive, down-slope = negative, no pattern = none.",
        "Correlation does not prove one thing causes the other.",
      ],
      thinkDeeper:
        "Ice-cream sales and drowning incidents both rise in summer, so they correlate — but neither causes the other. A hidden third factor (hot weather) drives both. Always ask what else might explain a correlation.",
      strategies: ["Decide discrete vs continuous from how data arises", "Describe correlation by the slope direction"],
    },
    {
      heading: "Grouped data, stem-and-leaf and two-way tables",
      discovery: {
        problem:
          "Twenty plants have these heights in cm: 12, 15, 15, 18, 21, 23, 23, 24, 27, 28, 31, 33, 34, 36, 39, 41, 42, 45, 48, 52. Which 10 cm group (10–19, 20–29, 30–39, 40–49, 50–59) contains the most plants? Could you find the exact mode?",
        idea:
          "Tally into classes: 10–19 has 4, 20–29 has 6, 30–39 has 5, 40–49 has 4, 50–59 has 1. The 20–29 class has the most, so it is the **modal class**. With grouped data you cannot name a single mode — you give the class with the highest frequency instead.",
      },
      body:
        "When data is spread over a wide range it is grouped into **classes** (like 10–19, 20–29). The **modal class** is simply the class with the highest frequency. You cannot give a single modal value, only the class, because individual values are hidden inside the groups.\n\nA **stem-and-leaf diagram** keeps the actual values while grouping them. The 'stem' is the tens digit and each 'leaf' is a units digit, written in order. It shows the shape of the data *and* lets you read the median and mode back out. Always include a **key**, e.g. 2 | 3 means 23.\n\nA **two-way table** records two things at once (for example boys/girls against walk/bus). Row and column totals must agree with the grand total, so a missing entry can always be found by subtraction.",
      keyPoints: [
        "Modal class = the group with the highest frequency (grouped data has no single mode).",
        "Stem-and-leaf: stem = tens, leaf = units, leaves in order, plus a key (3 | 1 = 31).",
        "A stem-and-leaf diagram keeps every value, so you can still read off median and mode.",
        "Two-way tables: every row and column adds to its total, and all totals meet at the grand total.",
      ],
      strategies: ["Tally into classes carefully", "Fill two-way tables using the totals"],
      diagrams: [
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A stem-and-leaf diagram with stems 1 to 5 and a key 2 bar 3 means 23"><rect x="0" y="0" width="200" height="120" fill="#ffffff"/><line x1="40" y1="10" x2="40" y2="100" stroke="#333"/><g font-family="monospace" font-size="12"><text x="28" y="24">1</text><text x="48" y="24">2 5 5 8</text><text x="28" y="44">2</text><text x="48" y="44">1 3 3 4 7 8</text><text x="28" y="64">3</text><text x="48" y="64">1 3 4 6 9</text><text x="28" y="84">4</text><text x="48" y="84">1 2 5 8</text><text x="28" y="104">5</text><text x="48" y="104">2</text></g><text x="40" y="118" font-size="10" font-family="sans-serif">Key: 2 | 3 means 23</text></svg>',
      ],
    },
    {
      heading: "Collecting data: sampling and questionnaires",
      discovery: {
        problem:
          "A school wants to know pupils' favourite sport. A teacher asks only the netball team. Why will the results be misleading, and what would be a fairer way to choose who to ask?",
        idea:
          "The netball team is biased toward netball, so the sample is not representative. A fairer method is a random sample across all year groups, so every pupil has an equal chance of being chosen.",
      },
      body:
        "It is usually impossible to ask everyone (the whole **population**), so we collect a **sample**. A good sample is *representative*: large enough and chosen fairly, so it reflects the whole population. A **random sample** gives everyone an equal chance of selection, which helps avoid **bias**.\n\nA good **questionnaire** asks clear, fair questions:\n\n- Keep questions short and unambiguous.\n- Avoid **leading** questions ('Don't you agree that…?').\n- Offer response boxes that do not overlap and cover every case (for time spent: 0–1 h, 1–2 h, … with a clear rule for the boundary).\n- Ask one thing at a time.",
      keyPoints: [
        "Population = everyone; sample = the part you actually ask.",
        "A good sample is representative: fairly chosen and big enough.",
        "Random sampling gives everyone an equal chance and reduces bias.",
        "Good questionnaire: clear, not leading, with non-overlapping response boxes that cover every case.",
      ],
      strategies: ["Ask: is the sample representative?", "Check response boxes don't overlap or leave gaps"],
    },
  ],
  learn: {
    cards: [
      { front: "How do you find the mean?", back: "Add all the values, then divide by how many values there are." },
      { front: "How do you find the median?", back: "Put the data in order; the median is the middle value (mean of the two middles if even)." },
      { front: "What is the mode?", back: "The value that occurs most often. There can be more than one mode, or none." },
      { front: "What is the range?", back: "Largest value − smallest value. It measures spread, not average." },
      { front: "Mean from a frequency table?", back: "Σ(value × frequency) ÷ Σ(frequency)." },
      { front: "Pie-chart slice angle?", back: "(frequency ÷ total) × 360°. All slices add to 360°." },
      { front: "Discrete vs continuous data?", back: "Discrete = counted separate values; continuous = measured, any value in a range." },
      { front: "What does positive correlation look like?", back: "On a scatter graph the points slope upward: as one variable rises, so does the other." },
      { front: "What is the modal class?", back: "For grouped data, the class (group) with the highest frequency. There is no single modal value." },
      { front: "How do you read a stem-and-leaf diagram?", back: "Stem = tens digit, leaf = units digit; join them using the key (3 | 1 = 31). Leaves are written in order." },
      { front: "How do you find a missing value in a two-way table?", back: "Use the row and column totals — every row and column adds to its total, all meeting at the grand total." },
      { front: "What makes a sample good?", back: "It is representative: chosen fairly (ideally at random) and large enough to reflect the whole population." },
      { front: "Name one fault in a questionnaire to avoid.", back: "Leading questions, or response boxes that overlap or leave gaps (e.g. 0–5 and 5–10)." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "stats-mcq-q01",
        question: "Find the median of 3, 7, 2, 9, 5.",
        options: ["2", "5", "7", "9"],
        answerIndex: 1,
        explanation: "In order: 2, 3, 5, 7, 9. The middle value is 5.",
        difficulty: "warmup",
        guideRef: "Averages and range",
        strategy: "Order the data first",
      },
      {
        id: "stats-mcq-q02",
        question: "The numbers 4, 8, 8, 10, 20 have which mode and range?",
        options: ["Mode 8, range 16", "Mode 10, range 16", "Mode 8, range 20", "Mode 8, range 12"],
        answerIndex: 0,
        explanation: "8 occurs most often (mode 8). Range = 20 − 4 = 16.",
        difficulty: "core",
        guideRef: "Averages and range",
        hints: ["The mode is the most frequent value.", "Range = largest − smallest = 20 − 4."],
        strategy: "Read off mode and range",
      },
      {
        id: "stats-mcq-q03",
        question:
          "In a pie chart of 40 people, 10 chose football. What angle is the football slice?",
        options: ["40°", "90°", "100°", "144°"],
        answerIndex: 1,
        explanation: "Angle = (10 ÷ 40) × 360° = 0.25 × 360° = 90°.",
        difficulty: "core",
        guideRef: "Charts, pie charts and choosing a display",
        hints: ["Find the fraction 10 out of 40 first.", "Multiply that fraction by 360°.", "(10 ÷ 40) × 360 = 90."],
        strategy: "Slice angle = (frequency ÷ total) × 360°",
      },
      {
        id: "stats-mcq-q04",
        question:
          "Five numbers have a mean of 12. Four of them are 8, 10, 14 and 16. What is the fifth number?",
        options: ["12", "10", "14", "60"],
        answerIndex: 0,
        explanation: "Total must be 5 × 12 = 60. The four given add to 48, so the fifth is 60 − 48 = 12.",
        difficulty: "challenge",
        guideRef: "Averages and range",
        hints: ["Mean × count gives the total.", "Total = 5 × 12 = 60.", "Subtract the four known values from 60."],
        strategy: "Work backwards from the mean to the total",
      },
      {
        id: "stats-mcq-q05",
        question:
          "A scatter graph of hours of revision against test score shows points sloping upward. This shows:",
        options: ["Negative correlation", "Positive correlation", "No correlation", "That revision causes high scores for everyone"],
        answerIndex: 1,
        explanation: "Points sloping upward show positive correlation: more revision tends to go with higher scores. (Correlation alone does not prove causation.)",
        difficulty: "core",
        guideRef: "Data types, scatter graphs and correlation",
        hints: ["Which way do the points slope?", "Up-slope means as one rises the other rises."],
        strategy: "Read correlation from the slope direction",
      },
      {
        id: "stats-mcq-q06",
        question: "Which of these is continuous data?",
        options: ["Number of pets owned", "Shoe size", "The time taken to run 100 m", "Number of goals scored"],
        answerIndex: 2,
        explanation: "Time is measured and can take any value in a range, so it is continuous. The others are counted whole numbers (discrete).",
        difficulty: "warmup",
        guideRef: "Data types, scatter graphs and correlation",
        strategy: "Ask: counted or measured?",
      },
      {
        id: "stats-add-mcq01",
        question:
          "Test scores are grouped: 0–9 (3 pupils), 10–19 (8 pupils), 20–29 (11 pupils), 30–39 (6 pupils). What is the modal class?",
        options: ["0–9", "10–19", "20–29", "30–39"],
        answerIndex: 2,
        explanation: "The modal class is the group with the highest frequency: 20–29 has 11 pupils, more than any other.",
        difficulty: "core",
        guideRef: "Grouped data, stem-and-leaf and two-way tables",
        hints: ["Look for the class with the largest frequency.", "11 is the biggest frequency."],
        strategy: "Pick the class with the highest frequency",
      },
      {
        id: "stats-add-mcq02",
        question: "On a stem-and-leaf diagram the stem is 4 and a leaf is 7, with key 4 | 7 = 47. What value does this represent?",
        options: ["4.7", "47", "74", "11"],
        answerIndex: 1,
        explanation: "The stem (tens) is 4 and the leaf (units) is 7, so the value is 47, as the key shows.",
        difficulty: "warmup",
        guideRef: "Grouped data, stem-and-leaf and two-way tables",
        strategy: "Combine stem and leaf using the key",
      },
      {
        id: "stats-add-mcq03",
        question:
          "In a two-way table, 30 pupils were asked. 12 are boys, and 7 of the 18 girls walk to school. If 20 pupils walk in total, how many boys walk?",
        options: ["7", "13", "8", "12"],
        answerIndex: 1,
        explanation: "Girls walking = 7, total walking = 20, so boys walking = 20 − 7 = 13.",
        difficulty: "core",
        guideRef: "Grouped data, stem-and-leaf and two-way tables",
        hints: ["The walk column must total 20.", "Subtract the girls who walk from 20."],
        strategy: "Use the totals to fill a two-way table",
      },
      {
        id: "stats-add-mcq04",
        question:
          "Which is the best (least biased) way to choose 30 pupils to survey about school lunches?",
        options: [
          "Ask the first 30 pupils in the lunch queue",
          "Ask 30 pupils chosen at random from the whole school register",
          "Ask the 30 members of the cookery club",
          "Ask your own 30 friends",
        ],
        answerIndex: 1,
        explanation: "A random sample from the whole school gives every pupil an equal chance, so it is the most representative and least biased.",
        difficulty: "core",
        guideRef: "Collecting data: sampling and questionnaires",
        hints: ["Which method gives every pupil an equal chance?", "Avoid groups with a special interest in the topic."],
        strategy: "Choose a representative, random sample",
      },
    ],
    qa: [
      {
        id: "stats-qa-q01",
        question:
          "The pupils in a group own this many books: 2, 5, 5, 6, 8, 10, 12. Find the mean, median, mode and range.",
        modelAnswer:
          "Mean = (2+5+5+6+8+10+12) ÷ 7 = 48 ÷ 7 ≈ 6.86. Ordered already; the middle (4th) value is the median = 6. Mode = 5 (occurs twice). Range = 12 − 2 = 10.",
        markScheme: [
          "Mean = 48 ÷ 7 ≈ 6.86 [1]",
          "Median = 6 (middle value) [1]",
          "Mode = 5 [1]",
          "Range = 12 − 2 = 10 [1]",
        ],
        commonError: "Forgetting to order the data before taking the median, or confusing range with mode.",
        difficulty: "core",
        guideRef: "Averages and range",
        hints: ["Add all seven values for the mean total.", "The median is the 4th value of 7.", "The mode appears most often."],
        strategy: "Work through each measure in turn",
      },
      {
        id: "stats-qa-q02",
        question:
          "A frequency table shows goals per match: 0 goals (4 matches), 1 goal (6 matches), 2 goals (7 matches), 3 goals (3 matches). Find the mean number of goals per match.",
        modelAnswer:
          "Total goals = (0×4)+(1×6)+(2×7)+(3×3) = 0+6+14+9 = 29. Total matches = 4+6+7+3 = 20. Mean = 29 ÷ 20 = 1.45 goals per match.",
        markScheme: [
          "Σ(value × frequency) = 29 [1]",
          "Σ(frequency) = 20 [1]",
          "Mean = 29 ÷ 20 = 1.45 [1]",
        ],
        commonError: "Dividing by the number of rows (4) instead of the total frequency (20).",
        difficulty: "core",
        guideRef: "Mean from a frequency table; choosing the best average",
        hints: ["Multiply each goal value by its frequency.", "Add those products for the total goals.", "Divide by the total number of matches (20)."],
        strategy: "Use Σ(value × frequency) ÷ Σ(frequency)",
        solutions: [
          { label: "Frequency-table method", steps: ["Products: 0, 6, 14, 9", "Sum of products = 29", "Total frequency = 20", "Mean = 29 ÷ 20 = 1.45"] },
          { label: "List every value", steps: ["Write out: 0,0,0,0, 1,1,1,1,1,1, 2,2,2,2,2,2,2, 3,3,3", "These 20 values add to 29", "Mean = 29 ÷ 20 = 1.45"] },
        ],
      },
      {
        id: "stats-qa-q03",
        question:
          "Challenge: Class A (10 pupils) has a mean test score of 64. Class B (15 pupils) has a mean of 74. Find the mean score of all 25 pupils combined.",
        modelAnswer:
          "Class A total = 10 × 64 = 640. Class B total = 15 × 74 = 1110. Combined total = 640 + 1110 = 1750 over 25 pupils, so the combined mean = 1750 ÷ 25 = 70.",
        markScheme: [
          "Class A total = 10 × 64 = 640 [1]",
          "Class B total = 15 × 74 = 1110 [1]",
          "Combined total 1750 ÷ 25 [1]",
          "= 70 [1]",
        ],
        commonError: "Averaging the two means (64 and 74) to get 69 — wrong, because the classes have different sizes.",
        difficulty: "challenge",
        guideRef: "Mean from a frequency table; choosing the best average",
        hints: [
          "You cannot just average 64 and 74 — the classes differ in size.",
          "Find each class's total score first (mean × number of pupils).",
          "Add the totals, then divide by 25.",
        ],
        strategy: "Combine totals, not means",
      },
      {
        id: "stats-add-qa01",
        question:
          "The ages (in years) of a club are shown in this stem-and-leaf diagram. Key: 2 | 3 means 23.\n1 | 4 7\n2 | 1 3 3 8\n3 | 0 5\nFind (a) the number of members, (b) the range, (c) the median age, and (d) the modal age.",
        modelAnswer:
          "Reading the leaves: 14, 17, 21, 23, 23, 28, 30, 35 — that is 8 members. (a) 8 members. (b) Range = 35 − 14 = 21. (c) With 8 values the median is the mean of the 4th and 5th: 23 and 23, so median = 23. (d) 23 appears twice (most often), so the modal age = 23.",
        markScheme: [
          "(a) 8 members [1]",
          "(b) Range = 35 − 14 = 21 [1]",
          "(c) Median = (23 + 23) ÷ 2 = 23 [1]",
          "(d) Mode = 23 [1]",
        ],
        commonError: "Misreading a leaf (e.g. treating 2 | 3 as 2.3), or forgetting to average the two middle values.",
        difficulty: "core",
        guideRef: "Grouped data, stem-and-leaf and two-way tables",
        hints: ["Use the key to turn each stem-leaf pair into a number.", "Count the leaves for the number of members.", "Median of 8 values = average of the 4th and 5th."],
        strategy: "Read every value from the diagram, then work as a list",
      },
      {
        id: "stats-add-qa02",
        question:
          "60 people were asked if they own a bike. 35 are adults; 12 adults do NOT own a bike. Of those who own a bike, 18 are children. Complete the reasoning to find how many children were asked and how many people own a bike in total.",
        modelAnswer:
          "Adults who own a bike = 35 − 12 = 23. Bike owners in total = 23 adults + 18 children = 41. Children asked = 60 − 35 adults = 25. (Check: children who do not own a bike = 25 − 18 = 7, and total non-owners = 12 + 7 = 19 = 60 − 41. ✓)",
        markScheme: [
          "Adults owning a bike = 35 − 12 = 23 [1]",
          "Children asked = 60 − 35 = 25 [1]",
          "Total bike owners = 23 + 18 = 41 [1]",
        ],
        commonError: "Mixing up rows and columns, or forgetting the totals must agree with the grand total of 60.",
        difficulty: "core",
        guideRef: "Grouped data, stem-and-leaf and two-way tables",
        hints: ["Build a two-way table: rows adults/children, columns owns/does not own.", "Adults owning = 35 − 12.", "Children = 60 − 35; bike owners = adults owning + 18."],
        strategy: "Set up a two-way table and use the totals",
      },
      {
        id: "stats-add-qa03",
        question:
          "A pupil writes this survey question: 'Don't you agree that our great school canteen serves the best food? Yes / No.' Give two reasons why this is a poor question, and write an improved version with suitable response boxes.",
        modelAnswer:
          "Reasons (any two): it is a leading question ('Don't you agree… great… best') that pushes people to say yes; it is vague ('best food' is an opinion with no scale); only two boxes do not capture a range of views. Improved: 'How would you rate the canteen food?' with boxes: Very good / Good / OK / Poor / Very poor (non-overlapping and covering every view).",
        markScheme: [
          "Identifies it as leading/biased [1]",
          "Gives a second valid fault (vague, too few options, etc.) [1]",
          "Writes a neutral question with sensible, non-overlapping options [1]",
        ],
        commonError: "Replacing it with another leading question, or giving overlapping response boxes.",
        difficulty: "challenge",
        guideRef: "Collecting data: sampling and questionnaires",
        hints: ["Look at the emotive words pushing a 'yes'.", "Is the question specific and neutral?", "Offer a clear rating scale that covers every opinion without overlap."],
        strategy: "Spot leading/vague wording and replace with neutral, well-bounded options",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "stats-mcq-paper-1",
        title: "Statistics — MCQ Set A",
        questions: [
          {
            id: "stats-mcq-b1-q01",
            question: "What is the mode of 3, 4, 4, 4, 7, 9?",
            options: ["3", "4", "7", "5"],
            answerIndex: 1,
            explanation: "4 appears three times — more than any other value.",
            difficulty: "warmup",
          },
          {
            id: "stats-mcq-b1-q02",
            question: "Find the range of 12, 5, 20, 9, 14.",
            options: ["8", "15", "20", "5"],
            answerIndex: 1,
            explanation: "Range = largest − smallest = 20 − 5 = 15.",
            difficulty: "warmup",
          },
          {
            id: "stats-mcq-b1-q03",
            question: "Find the mean of 6, 9, 12, 13.",
            options: ["9", "10", "10.5", "11"],
            answerIndex: 1,
            explanation: "(6 + 9 + 12 + 13) ÷ 4 = 40 ÷ 4 = 10.",
            difficulty: "core",
            hints: ["Add all four values, then divide by 4."],
            strategy: "Sum ÷ count",
          },
          {
            id: "stats-mcq-b1-q04",
            question: "Find the median of 11, 4, 9, 2, 7, 6.",
            options: ["6.5", "7", "6", "8"],
            answerIndex: 0,
            explanation: "Ordered: 2, 4, 6, 7, 9, 11. The two middle values are 6 and 7, so the median is (6 + 7) ÷ 2 = 6.5.",
            difficulty: "core",
            hints: ["Order the six values.", "With an even count, average the two middle values."],
            strategy: "Average the two middle values",
          },
          {
            id: "stats-mcq-b1-q05",
            question:
              "Which average is best for the most popular pizza topping in a survey?",
            options: ["Mean", "Median", "Mode", "Range"],
            answerIndex: 2,
            explanation: "Toppings are categories (non-numerical), so only the mode applies — the most frequently chosen topping.",
            difficulty: "core",
            strategy: "Match the average to the data type",
          },
          {
            id: "stats-mcq-b1-q06",
            question:
              "In a pie chart of 90 people, 30 walk to school. What angle is the 'walk' slice?",
            options: ["30°", "90°", "120°", "150°"],
            answerIndex: 2,
            explanation: "Angle = (30 ÷ 90) × 360° = (1/3) × 360° = 120°.",
            difficulty: "challenge",
            hints: ["What fraction is 30 of 90?", "Multiply that fraction by 360°."],
            strategy: "Slice angle = (frequency ÷ total) × 360°",
          },
        ],
      },
      {
        id: "stats-mcq-paper-2",
        title: "Statistics — MCQ Set B",
        questions: [
          {
            id: "stats-mcq-b2-q01",
            question: "Which chart is best for showing how a town's population changed each year from 2000 to 2020?",
            options: ["Pie chart", "Line graph", "Pictogram", "Bar chart with one bar"],
            answerIndex: 1,
            explanation: "A line graph shows change over time, with points joined to show the trend.",
            difficulty: "warmup",
          },
          {
            id: "stats-mcq-b2-q02",
            question:
              "On a pictogram, 🙂 = 8 people. How many people do 2 and a half faces represent?",
            options: ["16", "18", "20", "24"],
            answerIndex: 2,
            explanation: "2.5 × 8 = 20 people.",
            difficulty: "warmup",
          },
          {
            id: "stats-mcq-b2-q03",
            question: "A scatter graph of car age against value shows points sloping downward. This is:",
            options: ["Positive correlation", "Negative correlation", "No correlation", "A line graph"],
            answerIndex: 1,
            explanation: "As age increases, value decreases — points slope downward, so this is negative correlation.",
            difficulty: "core",
            hints: ["Older cars are worth less.", "Down-slope means negative correlation."],
            strategy: "Read correlation from the slope",
          },
          {
            id: "stats-mcq-b2-q04",
            question:
              "The mean of 4 numbers is 9. Three of them are 7, 8 and 10. What is the fourth?",
            options: ["9", "11", "12", "8"],
            answerIndex: 1,
            explanation: "Total = 4 × 9 = 36. The three given add to 25, so the fourth is 36 − 25 = 11.",
            difficulty: "core",
            hints: ["Total = mean × count = 36.", "Subtract 7 + 8 + 10 from 36."],
            strategy: "Work backwards from the total",
          },
          {
            id: "stats-mcq-b2-q05",
            question:
              "A pie chart slice has an angle of 72° and represents 12 people. How many people are in the whole survey?",
            options: ["48", "60", "72", "120"],
            answerIndex: 1,
            explanation: "72° is 72 ÷ 360 = 1/5 of the chart, and that fifth is 12 people, so the total is 12 × 5 = 60.",
            difficulty: "challenge",
            hints: ["What fraction of 360° is 72°?", "That fraction equals 12 people.", "Scale up to the full 360°."],
            strategy: "Work backwards from the slice angle",
          },
          {
            id: "stats-mcq-b2-q06",
            question:
              "A data set is 5, 6, 7, 8 and one unknown value. The mean is 7. What is the unknown value?",
            options: ["7", "8", "9", "11"],
            answerIndex: 2,
            explanation: "Total = 5 × 7 = 35. Known values add to 26, so the unknown is 35 − 26 = 9.",
            difficulty: "core",
            hints: ["Total = mean × number of values.", "5 × 7 = 35; subtract the known 26."],
            strategy: "Work backwards from the mean",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "stats-qa-paper-1",
        title: "Statistics — Written Set A",
        questions: [
          {
            id: "stats-qa-b1-q01",
            question: "Find the mean, median and range of 5, 8, 8, 11, 13.",
            modelAnswer:
              "Mean = (5+8+8+11+13) ÷ 5 = 45 ÷ 5 = 9. Median (middle of 5 ordered values) = 8. Range = 13 − 5 = 8.",
            markScheme: ["Mean = 45 ÷ 5 = 9 [1]", "Median = 8 [1]", "Range = 13 − 5 = 8 [1]"],
            difficulty: "warmup",
          },
          {
            id: "stats-qa-b1-q02",
            question:
              "A survey of 120 people asked their favourite season. Spring: 30, Summer: 50, Autumn: 24, Winter: 16. Find the pie-chart angle for each season.",
            modelAnswer:
              "Each person = 360 ÷ 120 = 3°. Spring = 30 × 3 = 90°. Summer = 50 × 3 = 150°. Autumn = 24 × 3 = 72°. Winter = 16 × 3 = 48°. Check: 90 + 150 + 72 + 48 = 360°. ✓",
            markScheme: [
              "Angle per person = 360 ÷ 120 = 3° [1]",
              "Spring 90° and Summer 150° [1]",
              "Autumn 72° and Winter 48° [1]",
              "Angles total 360° (check) [1]",
            ],
            commonError: "Using the frequency directly as the angle instead of multiplying by 3° per person.",
            difficulty: "core",
            hints: ["Find the angle for one person first (360 ÷ 120).", "Multiply each frequency by that angle.", "Check your four angles add to 360°."],
            strategy: "angle = (frequency ÷ total) × 360°",
          },
          {
            id: "stats-qa-b1-q03",
            question:
              "Two teams play darts. Team X scores: 20, 22, 24, 26, 28 (mean 24). Team Y scores: 4, 14, 24, 34, 44 (mean 24). Both have the same mean. Compare the two teams using an appropriate measure of spread and comment.",
            modelAnswer:
              "Both means are 24, so on average the teams are equal. Range of Team X = 28 − 20 = 8; range of Team Y = 44 − 4 = 40. Team Y's scores are far more spread out (much larger range), so Team X is the more consistent team.",
            markScheme: [
              "Both means equal 24 [1]",
              "Range X = 8 [1]",
              "Range Y = 40 [1]",
              "Concludes Team X is more consistent / Y more spread out [1]",
            ],
            commonError: "Stopping at the means and saying the teams are identical, ignoring spread.",
            difficulty: "core",
            hints: ["The means are equal, so look at spread.", "Compare the two ranges.", "A smaller range means more consistent."],
            strategy: "Compare distributions using an average AND a spread",
          },
          {
            id: "stats-qa-b1-q04",
            question:
              "Challenge: A pie chart shows how 240 visitors travelled to a museum. The 'car' slice has an angle of 135°, and twice as many came by bus as by train. The car and 'other' slices together are exactly half the chart. How many visitors came by bus?",
            modelAnswer:
              "Half the chart is 180°, so 'other' = 180 − 135 = 45°. The remaining bus + train slices fill 360 − 180 = 180°. If train = t and bus = 2t (twice as many), their angles are in ratio 1 : 2, so train = 60° and bus = 120°. Each degree is 240 ÷ 360 = 2/3 of a visitor, so bus = 120 × (2/3) = 80 visitors.",
            markScheme: [
              "Other slice = 180 − 135 = 45° [1]",
              "Bus + train = 360 − 180 = 180°, split 2 : 1 → bus 120°, train 60° [1]",
              "Visitors per degree = 240 ÷ 360 = 2/3 [1]",
              "Bus = 120 × 2/3 = 80 visitors [1]",
            ],
            commonError: "Forgetting that 'twice as many by bus' makes the bus angle twice the train angle, not the totals equal.",
            difficulty: "challenge",
            hints: [
              "Half the chart is 180°; use that to find the 'other' angle.",
              "Bus and train share the remaining 180° in the ratio 2 : 1.",
              "Convert the bus angle to visitors using 240 ÷ 360 per degree.",
            ],
            strategy: "Work backwards from angles, then scale to people",
          },
        ],
      },
    ],
  },
};
