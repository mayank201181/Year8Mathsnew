import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "statistics",
  title: "Collecting & Representing Data",
  strand: "Statistics & Probability",
  icon: "📊",
  summary: "Ask a sharp question, collect fair data, then draw the picture that tells the truth.",
  intro:
    "Statistics is how we answer questions with evidence instead of guesses. In this chapter you'll plan an enquiry, collect data fairly, organise it into tables, and choose the chart that shows its story honestly. You'll also learn to catch the graphs that are quietly trying to fool you.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "data-and-sampling",
      heading: "Data, enquiries & sampling",
      discovery: {
        problem:
          "In 1936 an American magazine, the *Literary Digest*, tried to predict the US presidential election. It posted about 10 million voting forms, using lists of telephone owners, car owners and its own readers, and got about 2.4 million replies. Its prediction: Alf Landon would beat Franklin Roosevelt easily.\n\nA young pollster, George Gallup, asked only about 50 000 people and said Roosevelt would win.\n\nWho was right? How could 2.4 million answers be *less* trustworthy than 50 000? (Think: in 1936, in the middle of the Great Depression, who owned a telephone *and* a car?)",
        idea:
          "Roosevelt won by a landslide: about 61% of the vote and 46 of the 48 states. The *Digest*'s sample was enormous but **biased**. Phone and car owners in 1936 were richer than average, and richer voters leaned towards Landon. On top of that, only about a quarter of people replied, and people who bother to reply are not typical either.\n\nA big biased sample is still wrong. It's just *confidently* wrong. **How** you choose a sample matters more than how big it is.",
      },
      body:
        "A **statistical enquiry** is an investigation that answers a question using data. Statisticians work round a four-stage cycle (see the diagram):\n\n1. **Plan**: pose a clear question and a prediction (a *hypothesis*), and decide what data you need.\n2. **Collect**: gather the data by survey, experiment, observation, or from existing records.\n3. **Process and represent**: organise it into tables, calculate, and draw charts.\n4. **Interpret and discuss**: answer the question, say how reliable the answer is, and decide what to investigate next.\n\n**Types of data**\n\n| Type | What it is | Examples |\n|---|---|---|\n| **Categorical** | Words or labels, not numbers you can calculate with | favourite CCA, eye colour, MRT line |\n| **Discrete** | Numerical and *counted*: only separate values are possible | number of siblings, goals scored, shoe size |\n| **Continuous** | Numerical and *measured*: any value in a range is possible | height, time, mass, temperature |\n\nA quick test: if you *count* it, it's discrete; if you *measure* it, it's continuous. Age is continuous (you are getting older every second), even though we usually round it down to whole years. **Primary data** is data you collect yourself; **secondary data** was collected by someone else, such as a government website.\n\n**Populations and samples**\n\nThe **population** is everyone (or everything) you want to know about. Asking them all is a **census**. That is usually too slow or expensive, so you ask a **sample**, a smaller group, and hope it is **representative** (it behaves like the population). A sample is **biased** if the way it was chosen makes some answers more likely than they should be.\n\n| Method | How it works | Strength | Weakness |\n|---|---|---|---|\n| **Simple random** | Number everyone; pick with a random number generator | The chooser can't favour anyone | Needs a full list; can be lopsided by chance |\n| **Systematic** | Take every *k*th name on a list from a random start | Quick and evenly spread | Biased if the list has a repeating pattern |\n| **Stratified** | Split into groups (e.g. year levels) and sample each in proportion | Every group is fairly represented | Needs the group sizes; more work |\n| **Convenience** | Ask whoever is easiest to reach | Fast and cheap | Very likely to be biased |\n\nA bigger sample is usually more reliable, *but only if it is chosen fairly*.\n\n**Designing a good questionnaire**\n\n- Ask one clear thing per question, with a time frame (\"in the last 7 days\").\n- Never ask **leading** questions (\"Don't you agree that…?\").\n- Response boxes must **not overlap** and must **cover every possible answer**.\n- Avoid personal or embarrassing questions, and keep answers anonymous where you can.",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The statistical enquiry cycle: 1 plan, 2 collect, 3 process and represent, 4 interpret, with arrows going round in a loop back to plan"><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><g fill="none" stroke="#334155" stroke-width="2"><path d="M315 40 Q390 40 390 97"/><path d="M390 155 Q390 220 343 220"/><path d="M145 220 Q90 220 90 163"/><path d="M90 105 Q90 40 157 40"/></g><g fill="#334155"><polygon points="384,95 396,95 390,105"/><polygon points="345,214 345,226 335,220"/><polygon points="84,165 96,165 90,155"/><polygon points="155,34 155,46 165,40"/></g><rect x="165" y="15" width="150" height="50" rx="10" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="305" y="105" width="170" height="50" rx="10" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><rect x="145" y="195" width="190" height="50" rx="10" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="5" y="105" width="170" height="50" rx="10" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="240" y="36" font-size="13" font-weight="bold">1. Plan</text><text x="240" y="54" font-size="11">question and hypothesis</text><text x="390" y="126" font-size="13" font-weight="bold">2. Collect</text><text x="390" y="144" font-size="11">survey · experiment · records</text><text x="240" y="216" font-size="12" font-weight="bold">3. Process and represent</text><text x="240" y="234" font-size="11">tables · charts · calculations</text><text x="90" y="126" font-size="13" font-weight="bold">4. Interpret</text><text x="90" y="144" font-size="11">conclude · discuss · refine</text><text x="240" y="124" font-size="12" font-style="italic">the statistical</text><text x="240" y="140" font-size="12" font-style="italic">enquiry cycle</text></g></svg>`,
      diagramCaption:
        "The enquiry cycle. The answer at stage 4 usually raises a better question, so the cycle starts again.",
      workedExamples: [
        {
          title: "Classifying data",
          problem:
            "Classify each as categorical, discrete or continuous.\n\n(a) The number of people living in each flat on an HDB floor.\n(b) The time taken to walk to the MRT station.\n(c) Favourite hawker-centre drink.\n(d) Shoe size.",
          steps: [
            "(a) You *count* people, so only 1, 2, 3, … are possible. **Discrete.**",
            "(b) Time is *measured* and could be 7 min 12.4 s or any value in between. **Continuous.**",
            "(c) The answers are names such as teh tarik or sugarcane juice, not numbers. **Categorical.**",
            "(d) Shoe sizes go 5, 5.5, 6, … and nothing in between is sold, even though feet can be any length. **Discrete.**",
          ],
          answer: "(a) discrete, (b) continuous, (c) categorical, (d) discrete",
          yourTurn: {
            question:
              "Your turn: is *the mass of a durian, in kilograms* categorical, discrete or continuous? Type one word.",
            answer: { type: "text", accept: ["continuous", "continuous data"], display: "continuous" },
            solution:
              "Mass is *measured*, so it can take any value in a range (2.37 kg, 2.371 kg, …). It is **continuous**.",
          },
        },
        {
          title: "Systematic sampling",
          problem:
            "A school has 600 pupils on an alphabetical list. Priya wants a systematic sample of 30. She chooses a random starting number from 1 to 20 and gets 7. Which pupils are in her sample, and what is the number of the last pupil chosen?",
          steps: [
            "The gap between choices is {{600/30 = 20}}, so she takes every 20th pupil.",
            "Start at 7: pupils 7, 27, 47, 67, … Each is 20 more than the one before.",
            "The 30th pupil chosen is 7 + 29 × 20 = 7 + 580 = 587.",
            "Check: 587 ≤ 600, and the next one would be 607, which is off the list. ✓",
          ],
          answer: "Pupils 7, 27, 47, …, 587. The last pupil chosen is number 587.",
        },
        {
          title: "Fixing a bad survey question",
          problem:
            "Marcus writes this survey question:\n\n> How much do you spend at the canteen?  ☐ $0–$2  ☐ $2–$4  ☐ $5 or more\n\nFind three things wrong with it and write a better version.",
          steps: [
            "**No time frame.** Per day? Per week? Different people will be answering different questions.",
            "**Overlapping boxes.** Someone who spends exactly $2 could tick two boxes.",
            "**A gap.** Someone who spends $4.50 has no box to tick.",
            "**Better:** *In the last 5 school days, how much did you spend at the canteen altogether?*  ☐ under $5  ☐ $5 to $9.99  ☐ $10 to $14.99  ☐ $15 or more",
          ],
          answer:
            "No time frame, overlapping boxes at $2, and a gap between $4 and $5. Fix it with a time frame and boxes that don't overlap and cover every amount.",
        },
      ],
      keyPoints: [
        "Count it → discrete; measure it → continuous; words or labels → categorical.",
        "A sample must be **representative**. Bias comes from *how* it was chosen, and a bigger sample doesn't cure it.",
        "Random, systematic and stratified sampling reduce bias; convenience sampling invites it.",
        "Good response boxes don't overlap, leave no gaps, and come with a time frame.",
      ],
      whyItWorks:
        "Random sampling works because chance has no opinions. If every member of the population is equally likely to be picked, each group turns up in the sample in roughly the same proportion as in the population: about half girls if the school is half girls, and so on. The person choosing can't favour their friends or the people nearest the canteen, even by accident. Chance still wobbles, so a small sample can be lopsided, but the wobble shrinks as the sample grows. That's why size helps only *after* the method is fair.",
      strategies: ["Ask who is missing from the sample", "Count it or measure it?", "Consider extremes"],
      thinkDeeper:
        "A website asks its visitors, \"Do you enjoy using the internet?\" and 98% say yes. Explain why this tells you almost nothing about how much the *whole* population enjoys the internet. Then design a sampling method that would do better.",
    },
    // ------------------------------------------------------------------
    {
      id: "tables",
      heading: "Frequency, grouped & two-way tables",
      discovery: {
        problem:
          "At a CCA fair, 80 Year 8 pupils each signed up for exactly one of **Robotics** or **Choir**. 45 of the pupils are girls. 38 pupils chose Robotics, and 17 of those are girls.\n\nHow many boys chose Choir? Find it without guessing, then find every other missing number too.",
        idea:
          "Organise the facts in a **two-way table**: one property across the top, the other down the side, totals on the edges.\n\n| | Robotics | Choir | Total |\n|---|---|---|---|\n| Girls | 17 | 28 | 45 |\n| Boys | 21 | **14** | 35 |\n| Total | 38 | 42 | 80 |\n\nBoys = 80 − 45 = 35. Boys in Robotics = 38 − 17 = 21. So boys in Choir = 35 − 21 = **14**. Every row and every column must add up, so whenever a line has just one gap you can fill it by subtraction.",
      },
      body:
        "A **frequency table** records how many times each value or category occurs; that count is its **frequency**. When you collect data by hand, keep a **tally**: one stroke per item, with every fifth stroke drawn across the four before it, so you can count in fives.\n\n**Grouped frequency tables**\n\nWhen data has lots of different values, like the heights of 40 seedlings, a table listing every value is long and useless. Instead, group the data into **classes**, usually of equal width. For continuous data, write the classes with inequalities so that every value has exactly one home:\n\n| Height, {{h}} cm | Frequency |\n|---|---|\n| {{0 <= h < 10}} | 4 |\n| {{10 <= h < 20}} | 9 |\n| {{20 <= h < 30}} | 15 |\n| {{30 <= h < 40}} | 8 |\n| {{40 <= h < 50}} | 4 |\n\nRead {{10 <= h < 20}} as \"*h* is at least 10 but less than 20\". A seedling of exactly 20 cm goes in the *next* class, {{20 <= h < 30}}. The **class width** here is 10 cm, and the class with the highest frequency is the **modal class**: {{20 <= h < 30}}.\n\nGrouping has a price: once the data is grouped, you no longer know the exact values, only which class each one is in. For **discrete** data you can write classes such as 0–4, 5–9, 10–14, because no value can fall between 4 and 5.\n\n**Two-way tables**\n\nA **two-way table** shows two categorical variables at once: one along the top, one down the side, with totals in the last row and column. The bottom-right corner is the **grand total**. To complete one, find any row or column with only one gap, subtract, and repeat. Finish by checking that the totals agree.",
      diagram: `<svg viewBox="0 0 480 172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 50 cm split into five classes of width 10. Each class has a filled dot at its lower boundary, which is included, and an open dot at its upper boundary, which is not, so a value of exactly 20 belongs to the class from 20 up to 30"><rect x="0" y="0" width="480" height="172" fill="#ffffff"/><line x1="200" y1="40" x2="200" y2="115" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="4 4"/><g stroke-width="4"><line x1="40" y1="80" x2="120" y2="80" stroke="#4338ca"/><line x1="200" y1="80" x2="280" y2="80" stroke="#4338ca"/><line x1="360" y1="80" x2="440" y2="80" stroke="#4338ca"/><line x1="120" y1="50" x2="200" y2="50" stroke="#b45309"/><line x1="280" y1="50" x2="360" y2="50" stroke="#b45309"/></g><g fill="#4338ca"><circle cx="40" cy="80" r="5"/><circle cx="200" cy="80" r="5"/><circle cx="360" cy="80" r="5"/></g><g fill="#ffffff" stroke="#4338ca" stroke-width="2"><circle cx="120" cy="80" r="5"/><circle cx="280" cy="80" r="5"/><circle cx="440" cy="80" r="5"/></g><g fill="#b45309"><circle cx="120" cy="50" r="5"/><circle cx="280" cy="50" r="5"/></g><g fill="#ffffff" stroke="#b45309" stroke-width="2"><circle cx="200" cy="50" r="5"/><circle cx="360" cy="50" r="5"/></g><line x1="30" y1="115" x2="450" y2="115" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="1.5"><line x1="40" y1="110" x2="40" y2="120"/><line x1="120" y1="110" x2="120" y2="120"/><line x1="200" y1="110" x2="200" y2="120"/><line x1="280" y1="110" x2="280" y2="120"/><line x1="360" y1="110" x2="360" y2="120"/><line x1="440" y1="110" x2="440" y2="120"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="80" y="68">0 ≤ h &lt; 10</text><text x="160" y="38">10 ≤ h &lt; 20</text><text x="240" y="68">20 ≤ h &lt; 30</text><text x="320" y="38">30 ≤ h &lt; 40</text><text x="400" y="68">40 ≤ h &lt; 50</text><text x="40" y="133">0</text><text x="120" y="133">10</text><text x="200" y="133">20</text><text x="280" y="133">30</text><text x="360" y="133">40</text><text x="440" y="133">50</text><text x="455" y="119" text-anchor="start">cm</text><text x="166" y="151" text-anchor="start">included</text><text x="276" y="151" text-anchor="start">not included</text><text x="240" y="168" fill="#b91c1c">A height of exactly 20 cm belongs to 20 ≤ h &lt; 30</text></g><circle cx="156" cy="147" r="5" fill="#1f2937"/><circle cx="266" cy="147" r="5" fill="#ffffff" stroke="#1f2937" stroke-width="2"/></svg>`,
      diagramCaption:
        "Inequality classes leave no gaps and no overlaps: every height lands in exactly one class.",
      workedExamples: [
        {
          title: "Making a grouped frequency table",
          problem:
            "Here are the times, in seconds, for 16 pupils to solve a puzzle:\n\n    34, 47, 52, 28, 41, 39, 60, 45, 33, 50, 38, 44, 29, 55, 40, 48\n\nMake a grouped frequency table with classes {{20 <= t < 30}}, {{30 <= t < 40}}, {{40 <= t < 50}}, {{50 <= t < 60}} and {{60 <= t < 70}}.",
          steps: [
            "Work through the list **once**, in order, putting a tally mark in the right class for each time. (Going class by class through the list is slower and easier to get wrong.)",
            "Take care with boundary values: 40 goes in {{40 <= t < 50}}, 50 goes in {{50 <= t < 60}}, and 60 goes in {{60 <= t < 70}}.",
            "Count the tallies: 2, 4, 6, 3, 1.",
            "Check: 2 + 4 + 6 + 3 + 1 = 16 ✓. The frequencies must add up to the number of data values.",
          ],
          answer:
            "Frequencies 2, 4, 6, 3, 1. The modal class is {{40 <= t < 50}}.",
          yourTurn: {
            question:
              "Your turn: using the same 16 times, how many are in the class {{35 <= t < 45}}?",
            answer: { type: "number", value: 5 },
            solution:
              "The times from 35 up to (but not including) 45 are 41, 39, 38, 44 and 40. That's **5**. The time 45 is *not* included, because the class says {{t < 45}}.",
          },
        },
        {
          title: "Completing a two-way table",
          problem:
            "120 pupils were asked how they get to school. Complete the two-way table.\n\n| | MRT | Bus | Walk | Total |\n|---|---|---|---|---|\n| Year 7 | 23 | | 9 | 55 |\n| Year 8 | | 21 | | |\n| Total | 48 | | 28 | 120 |",
          steps: [
            "Year 7 row has one gap: Bus = 55 − 23 − 9 = 23.",
            "MRT column: Year 8 MRT = 48 − 23 = 25.",
            "Walk column: Year 8 Walk = 28 − 9 = 19.",
            "Total column: Year 8 total = 120 − 55 = 65. Check along the row: 25 + 21 + 19 = 65 ✓.",
            "Bus column: total = 23 + 21 = 44. Check along the bottom: 48 + 44 + 28 = 120 ✓.",
          ],
          answer: "Year 7 Bus 23; Year 8 MRT 25, Walk 19, Total 65; Bus total 44.",
        },
        {
          title: "A two-way table from words",
          problem:
            "90 people visited the Science Centre. {{2/5}} of them were children and the rest were adults. {{3/4}} of the children used the free audio guide, and 30 people altogether did *not* use it. How many adults used the audio guide?",
          steps: [
            "Draw a table: rows Children / Adults, columns Used guide / Did not, with totals. Fill in what you know.",
            "Children = {{2/5}} of 90 = 36, so adults = 90 − 36 = 54.",
            "Children who used the guide = {{3/4}} of 36 = 27, so 36 − 27 = 9 children did not.",
            "Adults who did not = 30 − 9 = 21, so adults who did = 54 − 21 = **33**.",
            "Check: everyone who used it = 27 + 33 = 60 = 90 − 30 ✓.",
          ],
          answer: "33 adults",
        },
      ],
      keyPoints: [
        "Frequencies must add up to the number of data values. Always check.",
        "Continuous classes use inequalities like {{10 <= h < 20}}: the lower end is in, the upper end is out.",
        "The modal class is the class with the highest frequency.",
        "In a two-way table every row and column adds to its total. Find a line with one gap and subtract.",
      ],
      whyItWorks:
        "A two-way table counts the same people twice, in two different ways. Adding along a row splits the Year 7s by transport; adding down a column splits the bus users by year group. Both routes must reach the same grand total, because it's the same 120 pupils. That double counting gives you enough facts to fill every gap, and a built-in check at the end.",
      strategies: ["Organise the information in a table", "Find a line with only one gap", "Check the totals"],
      thinkDeeper:
        "A two-way table has 2 rows and 3 columns of data cells, plus a total row, a total column and a grand total. What is the *smallest* number of entries you could be given and still fill in the whole table? Does it matter *which* entries you are given?",
    },
    // ------------------------------------------------------------------
    {
      id: "charts",
      heading: "Bar charts, pie charts & line graphs",
      discovery: {
        problem:
          "A pie chart shows how 40 pupils travel to school. The MRT slice is exactly a right angle. How many pupils take the MRT?\n\nThe Walk slice measures 63°. How many pupils walk? And what angle would a group of 14 pupils get?",
        idea:
          "The whole circle, 360°, is shared between 40 pupils, so each pupil gets {{360/40 = 9°}}. Then everything follows:\n\n- MRT: 90 ÷ 9 = 10 pupils.\n- Walk: 63 ÷ 9 = 7 pupils.\n- 14 pupils: 14 × 9 = 126°.\n\n**Find the angle for one item first**, and pie charts work in both directions.",
      },
      body:
        "**Bar charts** compare the frequencies of categories. The bars have equal widths and equal gaps, and each bar's height shows its frequency. The frequency axis must start at 0.\n\nTo compare **two groups**, use one of these:\n\n- A **dual bar chart** puts the groups' bars side by side for each category. It's best for comparing the groups category by category.\n- A **compound (stacked) bar chart** stacks the parts on top of each other, so each bar's total height shows the total. It's best when the totals matter too.\n\nThe diagram shows the same data both ways, plus a pie chart of the combined totals.\n\n**Pie charts** show how a whole is split into parts. The full circle (360°) stands for the total frequency, so\n\n    angle = {{\"frequency\"/\"total\" * 360°}}\n    frequency = {{\"angle\"/360 * \"total\"}}\n\nThe angles must add up to 360°, which gives you a free check. A pie chart shows **proportions**, not amounts. A bigger slice in one pie does *not* mean more people than a smaller slice in another pie, unless the two totals are equal.\n\n**Line graphs** show how something changes, usually over time; a line graph with time along the horizontal axis is a **time-series graph**. Plot the points and join them with straight lines. Then look for:\n\n- the **trend**, the general direction over a long period (rising, falling or steady);\n- a **seasonal** pattern that repeats. Singapore's rainfall, for example, rises towards the end of every year, and November and December are usually the wettest months;\n- sudden jumps or drops that need an explanation.\n\nThe lines between points only show the direction of change. In-between values may not mean anything: a graph of monthly totals has no reading for \"halfway through March\".",
      diagram: `<svg viewBox="0 0 480 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="How classes 8A and 8B travel to school, shown three ways: a dual bar chart, a compound bar chart, and a pie chart of all 40 pupils with angles MRT 90, bus 126, walk 63 and car 81 degrees"><rect x="0" y="0" width="480" height="262" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="40" y1="160" x2="172" y2="160"/><line x1="40" y1="120" x2="172" y2="120"/><line x1="40" y1="80" x2="172" y2="80"/><line x1="40" y1="40" x2="172" y2="40"/><line x1="200" y1="160" x2="316" y2="160"/><line x1="200" y1="120" x2="316" y2="120"/><line x1="200" y1="80" x2="316" y2="80"/><line x1="200" y1="40" x2="316" y2="40"/></g><g stroke="#334155" stroke-width="1"><g fill="#c7d2fe"><rect x="47" y="80" width="12" height="120"/><rect x="79" y="40" width="12" height="160"/><rect x="111" y="160" width="12" height="40"/><rect x="143" y="120" width="12" height="80"/><rect x="208" y="140" width="18" height="60"/><rect x="236" y="120" width="18" height="80"/><rect x="264" y="180" width="18" height="20"/><rect x="292" y="160" width="18" height="40"/></g><g fill="#fde68a"><rect x="59" y="120" width="12" height="80"/><rect x="91" y="80" width="12" height="120"/><rect x="123" y="100" width="12" height="100"/><rect x="155" y="100" width="12" height="100"/><rect x="208" y="100" width="18" height="40"/><rect x="236" y="60" width="18" height="60"/><rect x="264" y="130" width="18" height="50"/><rect x="292" y="110" width="18" height="50"/></g></g><g stroke="#334155" stroke-width="1.5"><line x1="40" y1="40" x2="40" y2="200"/><line x1="40" y1="200" x2="172" y2="200"/><line x1="200" y1="40" x2="200" y2="200"/><line x1="200" y1="200" x2="316" y2="200"/></g><g stroke="#334155" stroke-width="1.5"><path d="M405 122 L405 52 A70 70 0 0 1 475 122 Z" fill="#bae6fd"/><path d="M405 122 L475 122 A70 70 0 0 1 363.86 178.63 Z" fill="#bbf7d0"/><path d="M405 122 L363.86 178.63 A70 70 0 0 1 335.86 111.05 Z" fill="#fecaca"/><path d="M405 122 L335.86 111.05 A70 70 0 0 1 405 52 Z" fill="#e9d5ff"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="105" y="16" font-size="12" font-weight="bold">Dual bar chart</text><text x="258" y="16" font-size="12" font-weight="bold">Compound bar chart</text><text x="405" y="16" font-size="12" font-weight="bold">Pie chart (all 40)</text><text x="40" y="33">pupils</text><text x="200" y="33">pupils</text><text x="35" y="204" text-anchor="end">0</text><text x="35" y="164" text-anchor="end">2</text><text x="35" y="124" text-anchor="end">4</text><text x="35" y="84" text-anchor="end">6</text><text x="35" y="44" text-anchor="end">8</text><text x="195" y="204" text-anchor="end">0</text><text x="195" y="164" text-anchor="end">4</text><text x="195" y="124" text-anchor="end">8</text><text x="195" y="84" text-anchor="end">12</text><text x="195" y="44" text-anchor="end">16</text><text x="59" y="215">MRT</text><text x="91" y="215">Bus</text><text x="123" y="215">Walk</text><text x="155" y="215">Car</text><text x="217" y="215">MRT</text><text x="245" y="215">Bus</text><text x="273" y="215">Walk</text><text x="301" y="215">Car</text><text x="217" y="95">10</text><text x="245" y="55">14</text><text x="273" y="125">7</text><text x="301" y="105">9</text><text x="435" y="90">MRT</text><text x="435" y="104">90°</text><text x="424" y="156">Bus</text><text x="424" y="170">126°</text><text x="367" y="134">Walk</text><text x="367" y="148">63°</text><text x="379" y="86">Car</text><text x="379" y="100">81°</text><text x="405" y="213">9° per pupil</text><text x="78" y="243" text-anchor="start">Class 8A</text><text x="168" y="243" text-anchor="start">Class 8B</text></g><rect x="60" y="233" width="12" height="12" fill="#c7d2fe" stroke="#334155"/><rect x="150" y="233" width="12" height="12" fill="#fde68a" stroke="#334155"/></svg>`,
      diagramCaption:
        "8A: MRT 6, Bus 8, Walk 2, Car 4. 8B: MRT 4, Bus 6, Walk 5, Car 5. The dual chart compares the classes; the compound chart and the pie show the totals (10, 14, 7, 9).",
      workedExamples: [
        {
          title: "Drawing a pie chart",
          problem:
            "72 pupils voted for their favourite hawker-centre drink: teh tarik 26, sugarcane juice 18, bandung 10, lime juice 18. Calculate the angle of each slice.",
          steps: [
            "Total = 26 + 18 + 10 + 18 = 72 pupils.",
            "One pupil gets {{360/72 = 5°}}.",
            "Teh tarik: 26 × 5 = 130°. Sugarcane juice: 18 × 5 = 90°. Bandung: 10 × 5 = 50°. Lime juice: 18 × 5 = 90°.",
            "Check: 130 + 90 + 50 + 90 = 360° ✓. Then draw the angles one after another round the centre with a protractor, and label each slice.",
          ],
          answer: "130°, 90°, 50°, 90°",
          yourTurn: {
            question:
              "Your turn: 60 pupils chose a CCA. 22 chose a sport, 15 a uniformed group, 14 a performing art and the rest a club. What angle is the **performing arts** slice of a pie chart? Give your answer in degrees.",
            answer: { type: "number", value: 84, display: "84°" },
            solution: "{{360/60 = 6°}} per pupil, so the performing arts slice is 14 × 6 = **84°**.",
          },
        },
        {
          title: "Reading a pie chart backwards",
          problem:
            "A pie chart shows how 180 visitors travelled to Sentosa. The cable car slice measures 64°. How many visitors came by cable car?",
          steps: [
            "360° stands for 180 visitors, so 1° stands for {{180/360 = 1/2}} a visitor.",
            "64° stands for {{64 * 1/2 = 32}} visitors.",
            "Same thing as one calculation: {{64/360 * 180 = 32}}.",
          ],
          answer: "32 visitors",
        },
        {
          title: "Reading a time-series graph",
          problem:
            "The table shows the number of visitors (in thousands) to a nature reserve each quarter for two years.\n\n| | Jan–Mar | Apr–Jun | Jul–Sep | Oct–Dec |\n|---|---|---|---|---|\n| Year 1 | 42 | 35 | 58 | 47 |\n| Year 2 | 46 | 39 | 63 | 52 |\n\nDescribe what a time-series graph of this data would show.",
          steps: [
            "Put the 8 quarters in time order along the horizontal axis and visitors up the vertical axis. Plot the points and join them with straight lines.",
            "**Seasonal pattern:** every year, visitors dip in Apr–Jun and peak in Jul–Sep, so the graph zig-zags the same way each year.",
            "**Trend:** compare the *same* quarter in each year. Year 2 is 4 or 5 thousand higher every time (46 − 42 = 4, 39 − 35 = 4, 63 − 58 = 5, 52 − 47 = 5), so the overall trend is upwards.",
            "Don't compare Jul–Sep with the next Oct–Dec to judge the trend: that mixes up the seasonal dip with real growth.",
          ],
          answer:
            "A repeating seasonal pattern (low in Apr–Jun, peak in Jul–Sep) on top of a rising trend: each quarter is 4–5 thousand visitors higher than the same quarter a year before.",
        },
      ],
      keyPoints: [
        "Dual bar charts compare groups side by side; compound bar charts stack the parts so the totals show.",
        "Pie chart angle = {{\"frequency\"/\"total\" * 360°}}. Find the angle for one item first; the angles total 360°.",
        "Pie charts compare proportions, not amounts. You need the totals to compare two pies.",
        "Time-series graphs: time goes along the horizontal axis. Describe the trend and any seasonal pattern.",
      ],
      whyItWorks:
        "A pie chart is fair sharing. If teh tarik gets 26 of the 72 votes, it deserves {{26/72}} of the circle, and {{26/72}} of 360° is 130°. Measuring an angle is measuring a fraction of a full turn, so a slice twice as big always means twice the share. It's also why two pies can't be compared slice by slice: each circle stands for its *own* total.",
      strategies: ["Find the value of one item first", "Check the angles total 360°", "Compare like with like"],
      thinkDeeper:
        "In a pie chart of 90 people, each slice is a whole number of degrees and stands for a whole number of people. Which angles are possible? Now try a total of 7 people. What goes wrong, and what would you do about it?",
    },
    // ------------------------------------------------------------------
    {
      id: "stem-and-leaf",
      heading: "Stem-and-leaf diagrams",
      discovery: {
        problem:
          "Fifteen pupils scored these marks in a 50-mark quiz:\n\n    34, 27, 45, 31, 38, 22, 41, 36, 29, 33, 48, 35, 26, 39, 31\n\nWhat is the middle mark? Find a way to organise the numbers so that the middle, and the overall shape of the data, jump out at you.",
        idea:
          "Split each mark into its tens digit (the **stem**) and its units digit (the **leaf**), and write the leaves in order beside each stem:\n\n    2 | 2 6 7 9\n    3 | 1 1 3 4 5 6 8 9\n    4 | 1 5 8\n\nKey: 3 | 4 means 34 marks.\n\nNow count to the 8th value: 22, 26, 27, 29, 31, 31, 33, **34**. The middle mark is 34. The diagram is a sorted list and a sideways bar chart at the same time.",
      },
      body:
        "A **stem-and-leaf diagram** organises numerical data by splitting each value into a **stem** (the leading digit or digits) and a **leaf** (the final digit).\n\n- Each leaf is a *single* digit. Leaves are written in order, smallest next to the stem, and evenly spaced, so the length of each row acts like a bar.\n- List every stem in the range, even one with no leaves. An empty row is information too.\n- Always give a **key**, such as \"3 | 4 means 34 marks\". The key tells the reader the place value: the same picture could mean 34, 3.4 or 340.\n\nNo values are lost, so you can read the **median** (middle value), **mode** (most common value) and **range** (largest − smallest) straight off the diagram. Count the leaves to find *n*, the number of values; the median is the {{(n+1)/2}}th value.\n\n**Choosing stems.** For times like 4.7 s, 5.2 s and 6.0 s, use stems 4, 5, 6 with the key \"4 | 7 means 4.7 s\". For heights like 147 cm and 152 cm, use stems 14 and 15 with the key \"15 | 2 means 152 cm\".\n\n**Back-to-back stem-and-leaf diagrams** compare two data sets that share the same stems. One set's leaves go to the right of the stem. The other set's go to the left, written *outwards from the stem*, so they read right to left:\n\n| 8A leaves | Stem | 8B leaves |\n|---|---|---|\n| 9 8 5 | 2 | 4 7 |\n| 7 6 4 2 1 | 3 | 0 3 5 8 8 9 |\n| 3 0 | 4 | 1 2 6 |\n\nKey: 5 | 2 | 4 means 25 marks for 8A and 24 marks for 8B.\n\nMore of 8B's marks are in the high 30s and the 40s, and its median (38) beats 8A's (33), so 8B generally scored higher.",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ordered stem-and-leaf diagram of 15 quiz marks: stem 2 has leaves 2 6 7 9, stem 3 has leaves 1 1 3 4 5 6 8 9, stem 4 has leaves 1 5 8. The 8th value, 34, is circled as the median"><rect x="0" y="0" width="480" height="200" fill="#ffffff"/><rect x="140" y="51" width="88" height="22" rx="4" fill="#c7d2fe"/><rect x="140" y="86" width="176" height="22" rx="4" fill="#c7d2fe"/><rect x="140" y="121" width="66" height="22" rx="4" fill="#c7d2fe"/><line x1="130" y1="46" x2="130" y2="148" stroke="#334155" stroke-width="2"/><g font-family="sans-serif" fill="#1f2937"><text x="112" y="24" font-size="11" text-anchor="middle">stem</text><text x="112" y="37" font-size="11" text-anchor="middle">(tens)</text><text x="146" y="30" font-size="11">leaves (units), smallest first</text><g font-size="14" text-anchor="middle"><text x="112" y="67">2</text><text x="112" y="102">3</text><text x="112" y="137">4</text><text x="150" y="67">2</text><text x="172" y="67">6</text><text x="194" y="67">7</text><text x="216" y="67">9</text><text x="150" y="102">1</text><text x="172" y="102">1</text><text x="194" y="102">3</text><text x="216" y="102">4</text><text x="238" y="102">5</text><text x="260" y="102">6</text><text x="282" y="102">8</text><text x="304" y="102">9</text><text x="150" y="137">1</text><text x="172" y="137">5</text><text x="194" y="137">8</text></g><text x="330" y="128" font-size="11">Row lengths act like bars:</text><text x="330" y="143" font-size="11">most marks are in the 30s</text><text x="16" y="194" font-size="12">Key: 3 | 4 means 34 marks</text><text x="216" y="176" font-size="12" text-anchor="middle" fill="#b91c1c">median: 8th of 15 values = 34</text></g><circle cx="216" cy="97" r="11" fill="none" stroke="#b91c1c" stroke-width="2"/><line x1="216" y1="108" x2="216" y2="162" stroke="#b91c1c" stroke-width="1.5"/></svg>`,
      diagramCaption:
        "The 15 quiz marks. Median 34 (the 8th leaf), mode 31 (the only repeated value), range 48 − 22 = 26.",
      workedExamples: [
        {
          title: "Reading a stem-and-leaf diagram",
          problem:
            "The diagram shows the times, in seconds, for 11 pupils to run 50 m.\n\n    7 | 4 8 9\n    8 | 0 2 2 2 7\n    9 | 1 3 6\n\nKey: 8 | 2 means 8.2 seconds.\n\nFind the median, the mode and the range.",
          steps: [
            "Count the leaves: 3 + 5 + 3 = 11 times.",
            "The median is the {{(11+1)/2 = 6}}th value. Counting along: 7.4, 7.8, 7.9, 8.0, 8.2, **8.2**. So the median is 8.2 s.",
            "Mode: the leaf 2 appears three times on stem 8, so the mode is 8.2 s.",
            "Range = largest − smallest = 9.6 − 7.4 = 2.2 s.",
          ],
          answer: "Median 8.2 s, mode 8.2 s, range 2.2 s",
          yourTurn: {
            question:
              "Your turn: the diagram shows the masses of 9 durians.\n\n    1 | 6 8\n    2 | 0 3 3 5\n    3 | 1 4 9\n\nKey: 2 | 3 means 2.3 kg.\n\nWhat is the range of the masses, in kg?",
            answer: { type: "number", value: 2.3, display: "2.3 kg" },
            solution:
              "Largest 3.9 kg, smallest 1.6 kg, so the range is 3.9 − 1.6 = **2.3 kg**. (Not 39 − 16 = 23: the key says the values are in kilograms with one decimal place.)",
          },
        },
        {
          title: "Drawing an ordered stem-and-leaf diagram",
          problem:
            "The heights, in cm, of 12 Year 8 pupils are:\n\n    152, 147, 160, 155, 149, 163, 151, 158, 144, 155, 166, 150\n\nDraw an ordered stem-and-leaf diagram.",
          steps: [
            "The heights run from 144 to 166, so use stems 14, 15 and 16 (tens of centimetres), with the units digit as the leaf.",
            "First pass: copy each leaf in the order it appears. 14 | 7 9 4, then 15 | 2 5 1 8 5 0, then 16 | 0 3 6.",
            "Second pass: put each row in order. 14 | 4 7 9, then 15 | 0 1 2 5 5 8, then 16 | 0 3 6.",
            "Add a key: 15 | 2 means 152 cm. Check the leaf count: 3 + 6 + 3 = 12 ✓.",
          ],
          answer: "14 | 4 7 9 · 15 | 0 1 2 5 5 8 · 16 | 0 3 6, with key 15 | 2 means 152 cm",
        },
        {
          title: "Comparing with a back-to-back diagram",
          problem:
            "Use the back-to-back diagram of quiz marks for 8A and 8B above. Find each class's median and range, and compare the two classes.",
          steps: [
            "8A, read outwards from the stem: 25, 28, 29, 31, 32, 34, 36, 37, 40, 43. That's 10 values, so the median is halfway between the 5th and 6th: {{(32 + 34)/2 = 33}}. Range = 43 − 25 = 18.",
            "8B: 24, 27, 30, 33, 35, 38, 38, 39, 41, 42, 46. That's 11 values, so the median is the 6th: 38. Range = 46 − 24 = 22.",
            "Compare the averages: 8B's median is higher (38 against 33), so 8B generally scored higher.",
            "Compare the spread: 8B's range is larger (22 against 18), so 8B's marks were more spread out, less consistent.",
          ],
          answer:
            "8A: median 33, range 18. 8B: median 38, range 22. 8B scored higher on average but was less consistent.",
        },
      ],
      keyPoints: [
        "Stem = leading digit(s), leaf = last digit. Leaves go in order, and there must always be a key.",
        "No data is lost, so the median, mode and range can be read straight off.",
        "Median = the {{(n+1)/2}}th value. Count the leaves from the smallest.",
        "Back-to-back: the left-hand leaves read outwards from the stem, right to left.",
      ],
      whyItWorks:
        "A stem-and-leaf diagram is place value at work. Every value is (stem × 10) + leaf, so all values on one row lie in the same interval of 10. It's really a grouped frequency table that also keeps the exact units digit. Writing the leaves at equal spacing turns each row's length into its frequency, which is why the diagram looks like a bar chart lying on its side.",
      strategies: ["Organise the data", "Find the median position, then count", "Check the leaf count"],
      thinkDeeper:
        "Suppose the largest value in a stem-and-leaf diagram is made even larger. Which of the median, mode and range can change, and which can't? Explain why the median is called *resistant* to extreme values.",
    },
    // ------------------------------------------------------------------
    {
      id: "venn-carroll",
      heading: "Venn & Carroll diagrams",
      discovery: {
        problem:
          "Take the whole numbers from 1 to 20. Sort them using two questions: *Is it a multiple of 3?* and *Is it even?*\n\nHow many numbers are both? How many are neither? Can you draw a picture where every number has exactly one home, and the answers to both questions can be read at a glance?",
        idea:
          "Two overlapping circles do it. This is a **Venn diagram**. 6, 12 and 18 are both, so they go in the overlap. 1, 5, 7, 11, 13, 17 and 19 are neither, so they sit inside the rectangle but outside both circles.\n\nA **Carroll diagram** does the same job with a grid, giving each yes/no combination its own box. Both show the same four groups: 3 + 3 + 7 + 7 = 20.",
      },
      body:
        "A **Venn diagram** sorts things using overlapping circles inside a rectangle.\n\n- The **rectangle** holds everything being sorted, the *universal set* (sometimes labelled ξ).\n- Each **circle** holds the items with one property; this collection is called a *set*.\n- The **overlap** (the *intersection*) holds the items with **both** properties.\n- The region **outside every circle** holds the items with **neither**.\n\nWhen a Venn diagram shows **counts** instead of items, each number tells you how many items are in that region, and the numbers in all the regions add up to the total.\n\n| Phrase | Which regions? |\n|---|---|\n| A **and** B | the overlap only |\n| A **or** B | everything inside the circles (including the overlap) |\n| A **only** | circle A, not counting the overlap |\n| **neither** | outside both circles |\n| **not** A | everything outside circle A |\n\nA **Carroll diagram** sorts by properties in a grid. It's named after Lewis Carroll, the mathematician who wrote *Alice in Wonderland*. Each property splits the grid into *has it* and *doesn't have it*:\n\n| | Even | Not even |\n|---|---|---|\n| **Multiple of 3** | 6, 12, 18 | 3, 9, 15 |\n| **Not a multiple of 3** | 2, 4, 8, 10, 14, 16, 20 | 1, 5, 7, 11, 13, 17, 19 |\n\nThe four cells of a 2 × 2 Carroll diagram match the four regions of a two-circle Venn diagram exactly. Add totals to a Carroll diagram and it becomes a two-way table.\n\n**The overlap trap.** If 18 pupils play badminton and 12 swim, that does *not* mean 30 pupils do sport: anyone who does both has been counted twice. Always fill in the overlap first, then work outwards.",
      diagram: `<svg viewBox="0 0 480 232" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram sorting the numbers 1 to 20 into multiples of 3 and even numbers, with 6, 12 and 18 in the overlap, and a Carroll diagram showing the same counts: 3 both, 3 multiple of 3 only, 7 even only, 7 neither"><rect x="0" y="0" width="480" height="232" fill="#ffffff"/><rect x="10" y="20" width="250" height="205" fill="none" stroke="#334155" stroke-width="1.5"/><circle cx="100" cy="120" r="68" fill="#c7d2fe" fill-opacity="0.65" stroke="#334155" stroke-width="1.5"/><circle cx="170" cy="120" r="68" fill="#fde68a" fill-opacity="0.65" stroke="#334155" stroke-width="1.5"/><rect x="280" y="24" width="190" height="170" fill="none" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="1"><line x1="350" y1="24" x2="350" y2="194"/><line x1="410" y1="24" x2="410" y2="194"/><line x1="280" y1="54" x2="470" y2="54"/><line x1="280" y1="109" x2="470" y2="109"/><line x1="280" y1="164" x2="470" y2="164"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="135" y="14" font-size="11">Venn diagram: ξ = whole numbers 1 to 20</text><text x="375" y="14" font-size="11">Carroll diagram (counts)</text><text x="78" y="44" font-size="12" font-weight="bold">Multiple of 3</text><text x="192" y="44" font-size="12" font-weight="bold">Even</text><g font-size="13"><text x="62" y="114">3</text><text x="62" y="134">9</text><text x="62" y="154">15</text><text x="135" y="104">6</text><text x="135" y="129">12</text><text x="135" y="154">18</text><text x="192" y="99">2</text><text x="217" y="99">4</text><text x="192" y="122">8</text><text x="217" y="122">10</text><text x="192" y="145">14</text><text x="217" y="145">16</text><text x="205" y="167">20</text><text x="40" y="214">1</text><text x="70" y="214">5</text><text x="100" y="214">7</text><text x="130" y="214">11</text><text x="160" y="214">13</text><text x="190" y="214">17</text><text x="220" y="214">19</text></g><g font-size="11"><text x="380" y="44" font-weight="bold">Even</text><text x="440" y="44" font-weight="bold">Not even</text><text x="315" y="80">Multiple</text><text x="315" y="94">of 3</text><text x="315" y="126">Not a</text><text x="315" y="139">multiple</text><text x="315" y="152">of 3</text><text x="315" y="184" font-weight="bold">Total</text><text x="375" y="216">3 + 3 + 7 + 7 = 20</text></g><g font-size="14" font-weight="bold"><text x="380" y="87">3</text><text x="440" y="87">3</text><text x="380" y="142">7</text><text x="440" y="142">7</text><text x="380" y="184">10</text><text x="440" y="184">10</text></g></g></svg>`,
      diagramCaption:
        "The same sort, two ways. The overlap of the Venn diagram is the top-left cell of the Carroll diagram; the numbers outside both circles are the bottom-right cell.",
      workedExamples: [
        {
          title: "Counting with a Venn diagram",
          problem:
            "In a class of 30 pupils, 18 play badminton, 12 swim and 5 do both. How many pupils do neither?",
          steps: [
            "Start in the overlap: 5 pupils do both.",
            "Badminton only = 18 − 5 = 13. Swim only = 12 − 5 = 7.",
            "Inside the circles: 13 + 5 + 7 = 25 pupils.",
            "Neither = 30 − 25 = 5.",
          ],
          answer: "5 pupils",
          yourTurn: {
            question:
              "Your turn: 40 pupils were asked about two local fruits. 22 like durian, 15 like mangosteen and 6 like both. How many like **neither**?",
            answer: { type: "number", value: 9 },
            solution:
              "Durian only = 22 − 6 = 16. Mangosteen only = 15 − 6 = 9. Inside the circles: 16 + 6 + 9 = 31. Neither = 40 − 31 = **9**.",
          },
        },
        {
          title: "Working backwards to the overlap",
          problem:
            "In a class of 32 pupils, 20 study French, 15 study Mandarin and 4 study neither. How many study both?",
          steps: [
            "Pupils studying at least one language: 32 − 4 = 28.",
            "Adding the two circles gives 20 + 15 = 35, which counts the 'both' pupils twice.",
            "The extra 35 − 28 = 7 is the double count, so **7** pupils study both.",
            "Check: French only 13, Mandarin only 8, both 7, neither 4. 13 + 8 + 7 + 4 = 32 ✓.",
          ],
          answer: "7 pupils",
        },
        {
          title: "Completing a Carroll diagram",
          problem:
            "50 vehicles in a car park are sorted in a Carroll diagram by *electric / not electric* and *white / not white*. 14 vehicles are electric, and 9 of these are not white. 21 vehicles are white altogether. How many vehicles are neither electric nor white?",
          steps: [
            "Set up the grid: rows electric / not electric, columns white / not white, with totals and a grand total of 50.",
            "Electric and white = 14 − 9 = 5.",
            "White but not electric = 21 − 5 = 16.",
            "Not electric = 50 − 14 = 36, so not electric and not white = 36 − 16 = **20**.",
            "Check the 'not white' column: 9 + 20 = 29, and 50 − 21 = 29 ✓.",
          ],
          answer: "20 vehicles",
        },
      ],
      keyPoints: [
        "Venn: overlap = both; outside the circles = neither; all the regions add up to the total.",
        "Fill in the overlap first, then subtract it from each circle's total to get the 'only' regions.",
        "Adding two circle totals counts the overlap twice: in A or B = in A + in B − in both.",
        "A Carroll diagram is a has / hasn't grid. Add totals and it becomes a two-way table.",
      ],
      whyItWorks:
        "When you add the badminton players to the swimmers, every pupil in the overlap is counted once as a badminton player and again as a swimmer. So the sum overshoots by exactly the size of the overlap:\n\n    in at least one = in A + in B − in both\n\nThis is called the *inclusion–exclusion principle*. It's why 'both' is the key number in any Venn problem: once you know it, everything else follows by subtraction.",
      strategies: ["Draw a diagram", "Start in the middle (the overlap)", "Work backwards"],
      thinkDeeper:
        "In a group of 40 people, 28 have been to Sentosa and 25 have been to the Night Safari. What is the *smallest* possible number who have been to both? What is the largest? (Consider the extremes.)",
    },
    // ------------------------------------------------------------------
    {
      id: "scatter-graphs",
      heading: "Scatter graphs & correlation",
      discovery: {
        problem:
          "A hawker stall records each day's maximum temperature and how many bowls of ice kachang it sells.\n\n| Max temp (°C) | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 34 |\n|---|---|---|---|---|---|---|---|---|\n| Bowls sold | 7 | 30 | 33 | 52 | 54 | 77 | 80 | 111 |\n\nTomorrow's forecast is 33 °C. How many bowls should the stall prepare? Would you trust a prediction for a 45 °C day?",
        idea:
          "Plot each day as a point (temperature, bowls). The points drift upwards from left to right: hotter days, more bowls. This is **positive correlation**. A straight **line of best fit** through the middle of the points gives about 96 bowls at 33 °C.\n\nBut 45 °C is far outside the data, and Singapore has never come close to it, so there's no reason to think the pattern carries on. That prediction is unreliable.",
      },
      body:
        "A **scatter graph** plots pairs of numerical data as points (x, y). The two **variables** are measured on the same people, days or objects. The graph shows whether the two are related.\n\n| Pattern | Name | Meaning |\n|---|---|---|\n| Points rise from left to right | **positive correlation** | as one increases, the other tends to increase |\n| Points fall from left to right | **negative correlation** | as one increases, the other tends to decrease |\n| No clear pattern | **no correlation** | no straight-line relationship |\n\nCorrelation can also be **strong** (points close to a straight line) or **weak** (a rough trend with lots of scatter).\n\n**Line of best fit.** If there is correlation, draw *one* straight line by eye that follows the trend:\n\n- roughly equal numbers of points on each side, spread along the line;\n- it does **not** have to pass through the origin, or through any particular points;\n- never join the dots, and ignore any **outlier**, a point that clearly doesn't fit the pattern.\n\nA good line of best fit also passes through the **mean point**: (mean of the x values, mean of the y values).\n\n**Making predictions.** Go up from the x value to the line, then across to read off y.\n\n- **Interpolation** means predicting *inside* the range of the data. It's fairly reliable, especially when the correlation is strong.\n- **Extrapolation** means predicting *outside* the range. It's risky, because the pattern may change.\n\n**Correlation is not causation.** Ice-cream sales and drownings both rise in hot weather, so they are correlated, but ice cream doesn't cause drowning. A hidden **third variable**, the heat, sends people to the beach *and* to the ice-cream van. A correlation shows that two things move together. On its own, it never proves that one causes the other.",
      diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter graph of maximum temperature from 25 to 35 degrees against bowls of ice kachang sold, showing positive correlation, a straight line of best fit, and a dashed reading of about 96 bowls at 33 degrees"><rect x="0" y="0" width="480" height="320" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="60" y1="230" x2="460" y2="230"/><line x1="60" y1="190" x2="460" y2="190"/><line x1="60" y1="150" x2="460" y2="150"/><line x1="60" y1="110" x2="460" y2="110"/><line x1="60" y1="70" x2="460" y2="70"/><line x1="60" y1="30" x2="460" y2="30"/><line x1="100" y1="30" x2="100" y2="270"/><line x1="140" y1="30" x2="140" y2="270"/><line x1="180" y1="30" x2="180" y2="270"/><line x1="220" y1="30" x2="220" y2="270"/><line x1="260" y1="30" x2="260" y2="270"/><line x1="300" y1="30" x2="300" y2="270"/><line x1="340" y1="30" x2="340" y2="270"/><line x1="380" y1="30" x2="380" y2="270"/><line x1="420" y1="30" x2="420" y2="270"/><line x1="460" y1="30" x2="460" y2="270"/></g><g stroke="#334155" stroke-width="1.5"><line x1="60" y1="270" x2="460" y2="270"/><line x1="60" y1="270" x2="60" y2="30"/></g><g stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="5 4"><line x1="380" y1="270" x2="380" y2="78"/><line x1="380" y1="78" x2="60" y2="78"/></g><line x1="80" y1="258" x2="460" y2="30" stroke="#334155" stroke-width="2"/><line x1="70" y1="40" x2="88" y2="40" stroke="#334155" stroke-width="2"/><g fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"><circle cx="100" cy="256" r="4.5"/><circle cx="140" cy="210" r="4.5"/><circle cx="180" cy="204" r="4.5"/><circle cx="220" cy="166" r="4.5"/><circle cx="260" cy="162" r="4.5"/><circle cx="300" cy="116" r="4.5"/><circle cx="340" cy="110" r="4.5"/><circle cx="420" cy="48" r="4.5"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="286">25</text><text x="100" y="286">26</text><text x="140" y="286">27</text><text x="180" y="286">28</text><text x="220" y="286">29</text><text x="260" y="286">30</text><text x="300" y="286">31</text><text x="340" y="286">32</text><text x="380" y="286">33</text><text x="420" y="286">34</text><text x="460" y="286">35</text><text x="52" y="274" text-anchor="end">0</text><text x="52" y="234" text-anchor="end">20</text><text x="52" y="194" text-anchor="end">40</text><text x="52" y="154" text-anchor="end">60</text><text x="52" y="114" text-anchor="end">80</text><text x="52" y="74" text-anchor="end">100</text><text x="52" y="34" text-anchor="end">120</text><text x="260" y="308" font-size="12">Maximum temperature (°C)</text><text x="16" y="150" font-size="12" transform="rotate(-90 16 150)">Bowls sold</text><text x="66" y="72" text-anchor="start" fill="#b91c1c">≈ 96 bowls</text><text x="94" y="44" text-anchor="start">line of best fit</text></g></svg>`,
      diagramCaption:
        "Strong positive correlation. Reading up from 33 °C to the line and across gives about 96 bowls.",
      workedExamples: [
        {
          title: "Predicting from a line of best fit",
          problem:
            "A line of best fit for the ice kachang data passes through (26, 12) and (34, 108). Use it to estimate the number of bowls sold on a 33 °C day.",
          steps: [
            "From 26 °C to 34 °C is 8 degrees, and the line rises from 12 to 108, which is 96 bowls.",
            "So the line rises {{96/8 = 12}} bowls per degree.",
            "33 °C is 7 degrees above 26 °C: 12 + 7 × 12 = 12 + 84 = 96 bowls.",
            "33 °C is inside the data range (26 to 34 °C), so this is interpolation and fairly reliable.",
          ],
          answer: "About 96 bowls",
          yourTurn: {
            question:
              "Your turn: using the same line of best fit, estimate the number of bowls sold on a 30 °C day.",
            answer: { type: "number", value: 60 },
            solution:
              "30 °C is 4 degrees above 26 °C, and the line rises 12 bowls per degree: 12 + 4 × 12 = **60** bowls.",
          },
        },
        {
          title: "Describing correlation in context",
          problem:
            "What type of correlation would you expect between each pair? Describe it in context.\n\n(a) The age of a second-hand car and its price.\n(b) The height and the arm span of Year 8 pupils.\n(c) Shoe size and score in a maths test, for Year 8 pupils.",
          steps: [
            "(a) Older cars tend to be worth less: **negative correlation**. As a car's age increases, its price tends to decrease.",
            "(b) Taller pupils tend to have longer arms: **positive correlation**. As height increases, arm span tends to increase.",
            "(c) There's no reason for foot size to affect maths: **no correlation** is expected.",
            "Always describe correlation in context. \"As age increases, price tends to decrease\" is worth more than the single word \"negative\".",
          ],
          answer: "(a) negative, (b) positive, (c) none",
        },
        {
          title: "Is the prediction reliable?",
          problem:
            "Data for pupils aged 11 to 14 shows strong positive correlation between age and height. The line of best fit rises about 6 cm per year and gives 150 cm at age 12. Wei Ling uses it to predict the height of (i) a 13-year-old and (ii) a 40-year-old. Comment on each prediction.",
          steps: [
            "(i) 13 is inside the data range (11 to 14), so this is **interpolation**: 150 + 6 = 156 cm is a sensible estimate.",
            "(ii) 40 is far outside the range, so this is **extrapolation**. The line would give 150 + 28 × 6 = 318 cm.",
            "Over 3 metres is absurd: people stop growing in their late teens, so the straight-line pattern doesn't continue.",
          ],
          answer:
            "(i) Reliable: interpolation inside the data. (ii) Unreliable: extrapolation, and the line predicts an impossible 318 cm.",
        },
      ],
      keyPoints: [
        "Positive: both increase together. Negative: one increases as the other decreases. None: no pattern.",
        "Line of best fit: one straight line drawn by eye, following the trend with points balanced on both sides. Never dot-to-dot, never forced through (0, 0).",
        "Interpolation (inside the data) is fairly reliable; extrapolation (outside it) is risky.",
        "Correlation does not prove causation. Look for a third variable.",
      ],
      whyItWorks:
        "A line of best fit replaces a cloud of points with one simple rule: \"about 12 more bowls for each extra degree\". Points above the line and points below it roughly cancel out, so the line runs through the *middle* of the data, which is why it passes through the mean point. Inside the cloud, the rule is supported by real data on both sides of your prediction. Outside it, you're assuming the rule carries on for ever with nothing to check it against, and real patterns rarely do.",
      strategies: ["Draw a diagram", "Estimate first", "Consider extremes: is the answer sensible?"],
      thinkDeeper:
        "Across many countries there is a strong positive correlation between the number of TVs per household and life expectancy. Does buying more TVs make people live longer? Suggest a third variable that could explain the pattern.",
    },
    // ------------------------------------------------------------------
    {
      id: "choosing-and-misleading",
      heading: "Choosing representations & misleading graphs",
      discovery: {
        problem:
          "On Saturday, Shop A sold 102 cups of bubble tea and Shop B sold 98. Shop A's advert shows a bar chart in which its bar is **more than twice as tall** as Shop B's.\n\nHow is that possible without changing the numbers? Is the chart lying?",
        idea:
          "The vertical axis starts at 95, not 0. Shop A's bar is then drawn 102 − 95 = 7 units tall and Shop B's 98 − 95 = 3 units, so A's bar is {{7/3}} ≈ 2.3 times as tall, even though A sold only about 4% more.\n\nNothing on the chart is *false*, but it is **misleading**. Your eye compares the lengths of bars, so bars must start from zero.",
      },
      body:
        "**Choosing a representation**\n\n| Your data | Good choices | Why |\n|---|---|---|\n| Categories (favourite CCA) | bar chart, pie chart, pictogram | compares counts or shares |\n| Two groups, by category | dual or compound bar chart | side-by-side or stacked comparison |\n| Parts of one whole | pie chart, compound bar chart | shows proportions |\n| Change over time | line graph (time series) | shows the trend and seasons |\n| A small numerical data set | stem-and-leaf diagram | keeps every value and shows the shape |\n| Continuous grouped data | frequency diagram or polygon | bars touch because the scale is continuous |\n| Two numerical variables | scatter graph | shows correlation |\n| Sorting by properties | Venn or Carroll diagram | shows overlaps |\n\nWhen asked to *justify* a choice, say what the reader needs to see: \"A line graph, because it shows how the rainfall changes from month to month.\"\n\n**How graphs mislead**\n\nA graph can contain only true numbers and still give a false impression. Watch for:\n\n- **Truncated axis**: the vertical axis doesn't start at 0, which exaggerates small differences. On a bar chart this is always misleading, because we judge bars by their length. (On a line graph a non-zero start can be fine if it's clearly shown with a zig-zag break.)\n- **Uneven scale**: equal gaps on an axis that stand for different amounts, such as 0, 10, 20, 50, 100.\n- **3D effects and tilted pies**: slices at the front look bigger than equal slices at the back.\n- **Picture scaling**: an icon drawn twice as tall *and* twice as wide has 4 times the area, so it looks like 4 times as much.\n- **Missing information**: no title, no units, no scale, no source.\n- **Cherry-picking**: showing only the time period that supports the claim.\n- **Infographic traps**: percentages that don't add up to 100%, or a tiny sample hidden in the small print (\"8 out of 10 owners agreed…\", but out of how many?).",
      diagram: `<svg viewBox="0 0 480 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two bar charts of the same sales, 102 and 98 cups. Left: the axis starts at 95, so Shop A's bar looks more than twice as tall as Shop B's. Right: the axis starts at 0, so the bars look almost equal"><rect x="0" y="0" width="480" height="262" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="60" y1="170" x2="220" y2="170"/><line x1="60" y1="130" x2="220" y2="130"/><line x1="60" y1="90" x2="220" y2="90"/><line x1="60" y1="50" x2="220" y2="50"/><line x1="300" y1="156.7" x2="460" y2="156.7"/><line x1="300" y1="103.3" x2="460" y2="103.3"/><line x1="300" y1="50" x2="460" y2="50"/></g><g stroke="#334155" stroke-width="1"><rect x="85" y="70" width="50" height="140" fill="#fde68a"/><rect x="155" y="150" width="50" height="60" fill="#c7d2fe"/><rect x="325" y="74" width="50" height="136" fill="#fde68a"/><rect x="395" y="79.3" width="50" height="130.7" fill="#c7d2fe"/></g><g stroke="#334155" stroke-width="1.5"><line x1="60" y1="50" x2="60" y2="210"/><line x1="60" y1="210" x2="220" y2="210"/><line x1="300" y1="50" x2="300" y2="210"/><line x1="300" y1="210" x2="460" y2="210"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="130" y="16" font-size="12" font-weight="bold">Advert: axis starts at 95</text><text x="370" y="16" font-size="12" font-weight="bold">Honest: axis starts at 0</text><text x="60" y="40">cups</text><text x="300" y="40">cups</text><text x="54" y="214" text-anchor="end">95</text><text x="54" y="174" text-anchor="end">97</text><text x="54" y="134" text-anchor="end">99</text><text x="54" y="94" text-anchor="end">101</text><text x="54" y="54" text-anchor="end">103</text><text x="294" y="214" text-anchor="end">0</text><text x="294" y="160.7" text-anchor="end">40</text><text x="294" y="107.3" text-anchor="end">80</text><text x="294" y="54" text-anchor="end">120</text><text x="110" y="64">102</text><text x="180" y="144">98</text><text x="350" y="68">102</text><text x="420" y="73">98</text><text x="110" y="226">Shop A</text><text x="180" y="226">Shop B</text><text x="350" y="226">Shop A</text><text x="420" y="226">Shop B</text><text x="140" y="250" fill="#b91c1c">A's bar looks 2.3 times as tall</text><text x="380" y="250" fill="#15803d">A really sold about 4% more</text></g></svg>`,
      diagramCaption:
        "Same numbers, different stories. Cutting the axis at 95 removes the same amount from both bars, so the small difference looks huge.",
      workedExamples: [
        {
          title: "Measuring the exaggeration",
          problem:
            "A bar chart shows two values, 50 and 45, but its vertical axis starts at 40. How many times as tall as the bar for 45 does the bar for 50 look? How many times as big as 45 is 50, really?",
          steps: [
            "The bars are drawn from 40, so their heights are 50 − 40 = 10 and 45 − 40 = 5.",
            "The bar for 50 looks {{10/5 = 2}} times as tall.",
            "Really, {{50/45 = 10/9}} ≈ 1.11, so 50 is only about 11% bigger than 45.",
          ],
          answer: "It looks 2 times as tall, but 50 is really only about 1.11 times 45.",
          yourTurn: {
            question:
              "Your turn: a chart shows sales of 84 and 81, with the vertical axis starting at 80. How many times as tall as the bar for 81 does the bar for 84 look?",
            answer: { type: "number", value: 4 },
            solution:
              "The drawn heights are 84 − 80 = 4 and 81 − 80 = 1, so the bar looks **4 times** as tall, even though 84 is less than 4% more than 81.",
          },
        },
        {
          title: "Pictures that grow too fast",
          problem:
            "An infographic shows a small tree for 2020 and a tree twice as tall *and* twice as wide for 2025, to show that the number of trees planted doubled. What impression does the picture give, and how could it be fixed?",
          steps: [
            "The big tree's width × height is 2 × 2 = 4 times the small tree's.",
            "Our eyes judge the amount of picture (its area), so it looks as if 4 times as many trees were planted.",
            "Fix it with a pictogram: one small tree = a fixed number of trees, with twice as many icons for 2025. Or keep the width the same and double only the height, like a bar.",
          ],
          answer: "It suggests 4 times as many trees, not twice as many.",
        },
        {
          title: "Choosing and justifying a chart",
          problem:
            "Zara has three sets of data. Choose a suitable chart for each and justify your choice.\n\n(a) The rainfall in Singapore each month for a year.\n(b) The favourite subject of each pupil in her class.\n(c) The height and the arm span of 25 pupils.",
          steps: [
            "(a) A **line graph** (time series), because it shows how rainfall changes from month to month and makes the wet season at the end of the year easy to see.",
            "(b) A **bar chart** or a **pie chart**, because subjects are categories. A bar chart compares the counts; a pie chart shows each subject's share of the class.",
            "(c) A **scatter graph**, because there are two numerical variables for each pupil and the question is whether they are correlated.",
          ],
          answer: "(a) line graph, (b) bar chart or pie chart, (c) scatter graph",
        },
      ],
      keyPoints: [
        "Match the chart to the data: categories → bar or pie; time → line graph; two variables → scatter graph; continuous groups → frequency diagram.",
        "Bars must start at 0. A truncated axis exaggerates differences.",
        "Doubling an icon's height and width multiplies its area by 4.",
        "Always check the title, labels, units, scale, source and sample size.",
      ],
      whyItWorks:
        "Our eyes compare **lengths and areas**, not numbers. A bar chart is honest only when every bar's length is proportional to its value, and that needs the axis to start at 0: then a value twice as big gets a bar twice as long. Cut the axis and you take the same amount off every bar, which changes the ratios between their lengths, so small differences balloon. In the same way, scaling a picture by 2 in both directions multiplies its area by {{2^2 = 4}}.",
      strategies: ["Check the axes first", "Measure, then compare", "Ask who made it, and why"],
      thinkDeeper:
        "A news chart shows a company's share price over 5 days on an axis from $9.80 to $10.20, and it looks like a dramatic crash. Over the last 5 years the same price has doubled. Is either graph 'wrong'? Write a fair, one-sentence caption for each.",
    },
    // ------------------------------------------------------------------
    {
      id: "continuous-data",
      heading: "Frequency diagrams & polygons",
      discovery: {
        problem:
          "Forty sunflower seedlings were measured after three weeks.\n\n| Height, {{h}} cm | Frequency |\n|---|---|\n| {{0 <= h < 10}} | 4 |\n| {{10 <= h < 20}} | 9 |\n| {{20 <= h < 30}} | 15 |\n| {{30 <= h < 40}} | 8 |\n| {{40 <= h < 50}} | 4 |\n\nYou want to draw a bar chart. Should there be gaps between the bars? And if you had to represent the whole class {{10 <= h < 20}} by a *single* point, where would you put it?",
        idea:
          "No gaps. A seedling can be 19.99 cm or 20 cm, so the classes run straight into each other and the bars must touch. The fairest single point for {{10 <= h < 20}} is the middle of the class, its **midpoint**: {{(10 + 20)/2 = 15}} cm. Plot the midpoints and join them up, and you have a **frequency polygon**.",
      },
      body:
        "**Stretch:** For **continuous** grouped data, the bar chart becomes a **frequency diagram**:\n\n- the horizontal axis is a continuous number line, not a list of categories, labelled with the class boundaries 0, 10, 20, …;\n- the bars **touch**, because there are no gaps between the classes;\n- when the classes have equal widths, each bar's height is its frequency.\n\nA **frequency polygon** shows the same information with points and lines:\n\n1. Find the **midpoint** of each class: {{(\"lower bound\" + \"upper bound\")/2}}.\n2. Plot the point (midpoint, frequency) for each class.\n3. Join neighbouring points with straight lines.\n\n| Class | Midpoint | Frequency | Point to plot |\n|---|---|---|---|\n| {{0 <= h < 10}} | 5 | 4 | (5, 4) |\n| {{10 <= h < 20}} | 15 | 9 | (15, 9) |\n| {{20 <= h < 30}} | 25 | 15 | (25, 15) |\n| {{30 <= h < 40}} | 35 | 8 | (35, 8) |\n| {{40 <= h < 50}} | 45 | 4 | (45, 4) |\n\nDon't join the last point back to the first, and don't extend the line down to the axis unless you're asked to.\n\nThe real strength of frequency polygons is **comparison**. You can draw two of them on the same axes without one set of bars hiding the other, for example seedlings grown in sunlight and in shade. A polygon that sits further to the right has generally larger values; a taller, narrower one means the values are more bunched together.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frequency diagram of 40 seedling heights in classes of width 10 cm from 0 to 50, with touching bars of heights 4, 9, 15, 8 and 4, and a frequency polygon joining the points at midpoints 5, 15, 25, 35 and 45"><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="60" y1="230" x2="450" y2="230"/><line x1="60" y1="200" x2="450" y2="200"/><line x1="60" y1="170" x2="450" y2="170"/><line x1="60" y1="140" x2="450" y2="140"/><line x1="60" y1="110" x2="450" y2="110"/><line x1="60" y1="80" x2="450" y2="80"/><line x1="60" y1="50" x2="450" y2="50"/><line x1="60" y1="20" x2="450" y2="20"/></g><g fill="#bae6fd" stroke="#334155" stroke-width="1"><rect x="60" y="200" width="76" height="60"/><rect x="136" y="125" width="76" height="135"/><rect x="212" y="35" width="76" height="225"/><rect x="288" y="140" width="76" height="120"/><rect x="364" y="200" width="76" height="60"/></g><g stroke="#334155" stroke-width="1.5"><line x1="60" y1="260" x2="450" y2="260"/><line x1="60" y1="260" x2="60" y2="15"/></g><polyline points="98,200 174,125 250,35 326,140 402,200" fill="none" stroke="#b91c1c" stroke-width="2.5"/><g fill="#b91c1c"><circle cx="98" cy="200" r="4"/><circle cx="174" cy="125" r="4"/><circle cx="250" cy="35" r="4"/><circle cx="326" cy="140" r="4"/><circle cx="402" cy="200" r="4"/></g><rect x="330" y="24" width="14" height="10" fill="#bae6fd" stroke="#334155"/><line x1="330" y1="50" x2="344" y2="50" stroke="#b91c1c" stroke-width="2.5"/><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="60" y="276">0</text><text x="136" y="276">10</text><text x="212" y="276">20</text><text x="288" y="276">30</text><text x="364" y="276">40</text><text x="440" y="276">50</text><text x="52" y="264" text-anchor="end">0</text><text x="52" y="234" text-anchor="end">2</text><text x="52" y="204" text-anchor="end">4</text><text x="52" y="174" text-anchor="end">6</text><text x="52" y="144" text-anchor="end">8</text><text x="52" y="114" text-anchor="end">10</text><text x="52" y="84" text-anchor="end">12</text><text x="52" y="54" text-anchor="end">14</text><text x="52" y="24" text-anchor="end">16</text><text x="250" y="294" font-size="12">Height, h (cm)</text><text x="18" y="140" font-size="12" transform="rotate(-90 18 140)">Frequency</text><text x="350" y="33" text-anchor="start">frequency diagram</text><text x="350" y="54" text-anchor="start">frequency polygon</text></g></svg>`,
      diagramCaption:
        "The bars touch because height is continuous. The polygon joins the points (5, 4), (15, 9), (25, 15), (35, 8) and (45, 4), plotted at the class midpoints.",
      workedExamples: [
        {
          title: "Midpoints and points to plot",
          problem:
            "The times, {{t}} minutes, that 30 pupils spent on homework are grouped as follows: {{0 <= t < 20}}: 3 pupils, {{20 <= t < 40}}: 11 pupils, {{40 <= t < 60}}: 10 pupils, {{60 <= t < 80}}: 6 pupils. Which points would you plot for a frequency polygon?",
          steps: [
            "Midpoint of the first class: {{(0 + 20)/2 = 10}}. The others are 30, 50 and 70.",
            "Pair each midpoint with its frequency: (10, 3), (30, 11), (50, 10), (70, 6).",
            "Plot the points and join neighbours with straight lines.",
          ],
          answer: "(10, 3), (30, 11), (50, 10), (70, 6)",
          yourTurn: {
            question:
              "Your turn: masses, {{m}} kg, are grouped in classes of width 0.5 kg. What is the midpoint of the class {{1.5 <= m < 2.0}}? Give your answer as a decimal.",
            answer: { type: "number", value: 1.75, allowFraction: false, display: "1.75 kg" },
            solution: "{{(1.5 + 2.0)/2 = 3.5/2 = 1.75}} kg.",
          },
        },
        {
          title: "Comparing two frequency polygons",
          problem:
            "Seedlings were grown in sunlight and in shade. The points plotted for each frequency polygon are:\n\n| Midpoint (cm) | 5 | 15 | 25 | 35 | 45 |\n|---|---|---|---|---|---|\n| Sunlight | 4 | 9 | 15 | 8 | 4 |\n| Shade | 10 | 17 | 9 | 3 | 1 |\n\nCompare the heights of the two groups.",
          steps: [
            "Totals: sunlight 4 + 9 + 15 + 8 + 4 = 40, shade 10 + 17 + 9 + 3 + 1 = 40. The groups are the same size, so the frequencies can be compared directly.",
            "The sunlight polygon peaks at 25 cm (modal class {{20 <= h < 30}}); the shade polygon peaks at 15 cm (modal class {{10 <= h < 20}}).",
            "In the shade, 10 + 17 = 27 of the 40 seedlings are under 20 cm; in sunlight only 4 + 9 = 13 are.",
            "Conclusion in context: the seedlings grown in sunlight were generally taller.",
          ],
          answer:
            "The sunlight seedlings were generally taller: their modal class is {{20 <= h < 30}}, against {{10 <= h < 20}} in the shade.",
        },
      ],
      keyPoints: [
        "Continuous data: the bars touch and the horizontal axis is a number line.",
        "Frequency polygon: plot (midpoint, frequency) and join the points with straight lines.",
        "Midpoint = {{(\"lower\" + \"upper\")/2}}.",
        "Polygons are the best way to compare two distributions on one set of axes.",
      ],
      whyItWorks:
        "Once data is grouped, the exact values are lost: a seedling in {{10 <= h < 20}} could be anywhere from 10 cm up to 20 cm. If the values are spread fairly evenly through the class, they balance around its centre, so the midpoint is the best single stand-in for the whole class. Joining the midpoints of the bar tops traces the shape of the frequency diagram without the bars, which is why two polygons can share one set of axes.",
      strategies: ["Make it simpler: one point per class", "Draw a diagram", "Compare like with like"],
      thinkDeeper:
        "How would the frequency polygon for the 40 seedlings change if you used classes of width 5 cm instead of 10 cm? What would happen with classes of width 1 cm? Is there a 'best' class width?",
    },
  ],
  learn: {
    flashcards: [
      { front: "Categorical vs discrete vs continuous data?", back: "Categorical = words or labels. Discrete = counted, separate values. Continuous = measured, any value in a range." },
      { front: "Population vs sample?", back: "The population is everyone you want to know about. The sample is the smaller group you actually collect data from." },
      { front: "When is a sample biased?", back: "When the way it's chosen makes some answers more likely than they should be, such as asking only your friends." },
      { front: "How does systematic sampling work?", back: "Take every kth item on a list, from a random start. 600 pupils and a sample of 30 → every 20th pupil." },
      { front: "Two faults to avoid in response boxes?", back: "Overlaps ($0–$2 and $2–$4) and gaps (no box for $4.50). Add a time frame too." },
      { front: "What does {{20 <= h < 30}} mean?", back: "h is at least 20 but less than 30. A value of exactly 30 goes in the next class." },
      { front: "How do you fill a gap in a two-way table?", back: "Find a row or column with only one gap, and subtract the known entries from its total." },
      { front: "Pie chart angle?", back: "{{\"frequency\"/\"total\" * 360°}}. Or find the angle for one item first, then multiply." },
      { front: "Dual vs compound bar chart?", back: "Dual: the groups' bars side by side. Compound: the parts stacked, so each bar shows the total." },
      { front: "Why does a stem-and-leaf diagram need a key?", back: "To show the place value: 3 | 4 could mean 34, 3.4 or 340." },
      { front: "Venn diagram: the overlap? Outside the circles?", back: "Overlap = both properties. Outside the circles (but inside the rectangle) = neither." },
      { front: "Three types of correlation?", back: "Positive (both rise together), negative (one rises as the other falls), none (no pattern)." },
      { front: "Interpolation vs extrapolation?", back: "Interpolation predicts inside the range of the data, which is fairly reliable. Extrapolation goes outside it, which is risky." },
      { front: "Does correlation prove causation?", back: "No. A third variable may drive both, e.g. hot weather → more ice cream sold and more drownings." },
      { front: "Name a common trick in misleading bar charts.", back: "A truncated axis that doesn't start at 0, which makes small differences look huge." },
      { front: "Midpoint of a class?", back: "{{(\"lower\" + \"upper\")/2}}. For example, {{10 <= h < 20}} has midpoint 15." },
    ],
    mustKnow: [
      "I can classify data as categorical, discrete or continuous.",
      "I can describe the four stages of the statistical enquiry cycle.",
      "I can compare sampling methods and explain how a sample could be biased.",
      "I can write a fair survey question with response boxes that don't overlap or leave gaps.",
      "I can make a grouped frequency table using inequality classes.",
      "I can complete a two-way table from partial information.",
      "I can draw and interpret dual bar charts, compound bar charts and time-series graphs.",
      "I can calculate pie chart angles, and work back from an angle to a frequency.",
      "I can draw an ordered stem-and-leaf diagram with a key and read the median, mode and range from it.",
      "I can sort data with Venn and Carroll diagrams and find missing counts.",
      "I can describe correlation, draw a line of best fit and judge how reliable a prediction is.",
      "I can choose and justify a chart, and spot the misleading features of a graph.",
    ],
    misconceptions: [
      {
        wrong: "A bigger sample is always more reliable.",
        right: "Only if it's chosen fairly. The 1936 *Literary Digest* poll had 2.4 million replies and was still badly wrong. How you choose matters more than how many.",
      },
      {
        wrong: "Shoe size is continuous, because feet can be any length.",
        right: "Shoe size is discrete: only set sizes such as 5, 5.5 and 6 exist. Foot *length* is continuous.",
      },
      {
        wrong: "A bigger slice in one pie chart means more people than a smaller slice in another pie chart.",
        right: "Pie charts show proportions. To compare amounts you need each chart's total: 90° of 600 pupils (150) is more than 120° of 300 pupils (100).",
      },
      {
        wrong: "A line of best fit must go through (0, 0), or join the first and last points.",
        right: "It's one straight line that follows the trend, with points balanced on both sides. It can cross the axes anywhere and needn't pass through any data point.",
      },
      {
        wrong: "Strong correlation proves that one thing causes the other.",
        right: "Correlation only shows that the variables change together. A third variable, or coincidence, may explain it.",
      },
      {
        wrong: "If 18 pupils play badminton and 12 swim, then 30 pupils play a sport.",
        right: "Anyone who does both has been counted twice. If 5 do both, then 18 + 12 − 5 = 25 pupils play at least one.",
      },
    ],
    examMistakes: [
      "Forgetting the key on a stem-and-leaf diagram, or leaving the leaves out of order.",
      "Writing two-digit leaves such as 3 | 12. Each leaf must be a single digit.",
      "Putting a boundary value in the wrong class: 20 belongs in {{20 <= h < 30}}, not {{10 <= h < 20}}.",
      "Not checking that pie chart angles add up to 360°, or that frequencies add up to the total.",
      "Describing correlation without context. Write \"as temperature increases, sales tend to increase\".",
      "Drawing the line of best fit dot-to-dot, or forcing it through the origin.",
      "Leaving gaps between the bars of a frequency diagram for continuous data.",
      "Calling a sample 'biased' without saying *who* is over- or under-represented, and why.",
    ],
    mnemonics: [
      {
        topic: "Types of data",
        device: "Count it, Measure it, Name it",
        explanation: "Ask how the value was produced. Counting gives discrete data, measuring gives continuous data, and naming gives categorical data.",
      },
      {
        topic: "Pie charts",
        device: "One first, then multiply",
        explanation: "Work out the angle for ONE item (360° ÷ total), then multiply by each frequency. Going backwards, divide the angle by the angle for one item.",
      },
      {
        topic: "Correlation",
        device: "Uphill is positive, downhill is negative",
        explanation: "Read the graph from left to right, like a book. Points walking uphill show positive correlation, points walking downhill show negative, and a crowd milling about shows none.",
      },
      {
        topic: "Venn diagrams",
        device: "Middle first, then outwards",
        explanation: "Fill the overlap (both) first, subtract it from each circle's total to get the 'only' regions, then find 'neither' from the grand total.",
      },
    ],
    realWorld: [
      {
        title: "Election polls",
        detail: "Pollsters ask a carefully chosen sample of one or two thousand people to estimate how millions will vote. The way the sample is chosen matters more than its size.",
        emoji: "🗳️",
      },
      {
        title: "Singapore's census",
        detail: "Singapore carries out a Census of Population every 10 years (most recently in 2020), combining official records with a large sample survey, and runs a General Household Survey in between.",
        emoji: "🏙️",
      },
      {
        title: "Weather and climate",
        detail: "Time-series graphs of rainfall and temperature reveal the wet season at the end of each year and long-term warming trends.",
        emoji: "🌧️",
      },
      {
        title: "Running a stall",
        detail: "Plotting sales against temperature helps a hawker stall predict demand, prepare the right amount and cut waste.",
        emoji: "🍧",
      },
      {
        title: "Medical research",
        detail: "Scatter graphs and fair sampling help doctors spot links, such as between smoking and lung disease. Then carefully designed studies test whether one actually causes the other.",
        emoji: "🩺",
      },
      {
        title: "News and adverts",
        detail: "Checking the axes, the scale and the sample size protects you from charts and infographics designed to impress rather than inform.",
        emoji: "📰",
      },
    ],
    videos: [
      { title: "Sampling and bias", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+sampling" },
      { title: "Drawing and reading pie charts", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+pie+charts" },
      { title: "Stem and leaf diagrams", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+stem+and+leaf+diagrams" },
      { title: "Scatter plots and correlation", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+scatter+plots+correlation" },
    ],
    formulas: [
      { name: "Pie chart angle", formula: "{{\"angle\" = \"frequency\"/\"total\" * 360°}}", note: "The angles always add up to 360°." },
      { name: "Frequency from a pie chart", formula: "{{\"frequency\" = \"angle\"/360 * \"total\"}}" },
      { name: "Systematic sampling interval", formula: "{{\"interval\" = \"population size\"/\"sample size\"}}", note: "600 pupils, sample of 30 → take every 20th pupil." },
      { name: "Median position", formula: "{{(n + 1)/2}}th value", note: "For n values in order, e.g. counted along a stem-and-leaf diagram." },
      { name: "Class inequality", formula: "{{a <= x < b}}", note: "Includes a, excludes b, so every value has exactly one class." },
      { name: "Two-set Venn diagram", formula: "{{\"in A or B\" = \"in A\" + \"in B\" - \"in both\"}}", note: "Adding the circles counts the overlap twice." },
      { name: "Class midpoint", formula: "{{\"midpoint\" = (\"lower\" + \"upper\")/2}}", note: "Used to plot frequency polygons." },
    ],
  },
};
