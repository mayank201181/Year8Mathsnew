import type { Topic } from "../types";

export const ratioProportion: Topic = {
  id: "ratio-proportion",
  title: "Ratio & Proportion",
  subject: "Maths",
  icon: "⚖️",
  strand: "Ratio & Proportion",
  intro:
    "Ratio compares quantities; proportion scales them up and down while keeping the comparison fixed. Master sharing, best buys, speed and scale drawings — the everyday maths of recipes, maps and money.",
  guide: [
    {
      heading: "Simplifying ratios and ratio as a fraction",
      discovery: {
        problem:
          "A paint mix uses 12 ml of blue to 18 ml of yellow. Tomorrow you only have a tiny dropper. What is the simplest whole-number ratio of blue to yellow that still gives the same colour?",
        idea: "Divide both parts by their highest common factor. 12 : 18 both divide by 6, giving 2 : 3. The colour depends only on the ratio, not the actual amounts, so 2 : 3 is the same shade as 12 : 18.",
      },
      body:
        "A ratio like 12 : 18 compares two quantities. To **simplify** a ratio, divide every part by the same number — ideally the highest common factor (HCF) — until no common factor is left.\n\nA ratio also tells you what fraction each part is of the whole. In 2 : 3 there are 2 + 3 = 5 parts, so the first quantity is 2/5 of the total and the second is 3/5.\n\nUnits must match before simplifying: 50 cm : 2 m becomes 50 cm : 200 cm = 1 : 4.",
      keyPoints: [
        "Divide every part by the same number to simplify (use the HCF to finish in one step).",
        "Make units the same before simplifying.",
        "Ratio a : b means the total has a + b parts; the parts are a/(a+b) and b/(a+b) of the whole.",
        "A ratio in the form 1 : n (or n : 1) is called a unit ratio.",
      ],
      strategies: ["Divide by the HCF", "Convert to common units first", "Turn a ratio into fractions of the whole"],
      whyItWorks:
        "Dividing both parts by the same number is the reverse of scaling a recipe up: it keeps the proportion identical because each part shrinks by the same factor. The relationship between the quantities never changes.",
    },
    {
      heading: "Sharing in a ratio (and the 'difference' trick)",
      discovery: {
        problem:
          "£60 is shared between Amy and Ben in the ratio 3 : 2. Instead of guessing, find the value of ONE part. How does that single number unlock both shares — and what if the question instead said 'Amy gets £12 more than Ben'?",
        idea: "Add the parts: 3 + 2 = 5 parts share £60, so 1 part = £60 ÷ 5 = £12. Then Amy = 3 × £12 = £36, Ben = 2 × £12 = £24. If only the DIFFERENCE is given (£12 more), that difference is 3 − 2 = 1 part, so again 1 part = £12.",
      },
      body:
        "To **share a quantity in a ratio**, find the value of one part, then multiply.\n\n*Step 1:* Add the ratio parts to get the total number of parts.\n*Step 2:* Divide the amount by the total parts to get the value of one part.\n*Step 3:* Multiply each ratio number by the value of one part.\n\nSometimes you are not given the total but a **difference** ('A has 15 more than B') or **one part** ('B receives 24'). Match the given amount to the right number of parts, find one part, then build the rest.",
      keyPoints: [
        "One part = amount ÷ (sum of the ratio parts).",
        "Each share = its ratio number × the value of one part.",
        "Check: the shares should add back to the original total.",
        "If a difference is given, it equals (difference of the ratio numbers) parts.",
      ],
      strategies: ["Find the value of one part first", "Match the given clue to the right number of parts", "Check by adding the shares"],
      whyItWorks:
        "Every share is a whole number of equal parts, so once you know the size of one part, all shares follow by multiplication. The total amount is just the sum of all those equal parts.",
    },
    {
      heading: "Direct proportion, rates and best buys",
      discovery: {
        problem:
          "5 identical pens cost £3.50. Without a calculator's memory, how would you find the cost of 8 pens in just two steps? And which is better value: 5 pens for £3.50 or 8 pens for £5.20?",
        idea: "Find the cost of ONE pen first (the unitary method): £3.50 ÷ 5 = £0.70 each. Then 8 × £0.70 = £5.60. For best buy, compare unit prices: £0.70 vs £5.20 ÷ 8 = £0.65 each — so 8 for £5.20 is better value.",
      },
      body:
        "Two quantities are in **direct proportion** when doubling one doubles the other — their ratio stays constant. Cost and number of items, distance and time at constant speed, and recipe quantities are all directly proportional.\n\nThe **unitary method** solves these in two steps: find the value of *one* unit, then scale up to the number you want.\n\nFor **best buys**, work out the price per single item (or per 100 g) for each option and compare — the smallest unit price wins. **Rates** like speed (km/h), density (g/cm³) and £/litre are all 'one quantity per one of another'.",
      keyPoints: [
        "Direct proportion: y = kx — the ratio y : x is constant.",
        "Unitary method: find the value of ONE, then multiply.",
        "Best buy: compare price per single unit (or per 100 g) — smallest wins.",
        "A rate is an amount of one quantity per one unit of another (e.g. £/kg, km/h).",
      ],
      strategies: ["Use the unitary method (find one, then scale)", "Compare like-for-like unit prices", "Set up an equivalent-fractions equation"],
      whyItWorks:
        "In direct proportion the ratio between the quantities is fixed, so dividing by the number of units always gives the same 'per-one' value. Multiplying that value back up reaches any amount you need.",
    },
    {
      heading: "Speed, distance, time and scale drawings",
      discovery: {
        problem:
          "A map has a scale of 1 : 50 000. Two towns are 6 cm apart on the map. A car drives the real distance at 60 km/h. Roughly how long does the journey take? Which two formulas do you need, and in what order?",
        idea: "First convert map distance to real distance: 6 cm × 50 000 = 300 000 cm = 3 km. Then time = distance ÷ speed = 3 ÷ 60 h = 0.05 h = 3 minutes. Scale links drawing to reality; speed = distance ÷ time links the journey.",
      },
      body:
        "**Speed = distance ÷ time.** Rearranging gives distance = speed × time and time = distance ÷ speed. Keep units consistent (km with hours, or m with seconds) and convert if needed.\n\nA **scale** such as 1 : 50 000 means 1 unit on the drawing represents 50 000 of the same units in real life. To go from map to real, multiply by the scale; from real to map, divide. Map ratios have no units (both sides are the same unit), so convert the final answer to sensible units like km.",
      keyPoints: [
        "Speed = distance ÷ time; distance = speed × time; time = distance ÷ speed.",
        "Keep units consistent; 1 hour = 60 minutes, 1 km = 1000 m.",
        "Scale 1 : n means multiply map distance by n to get real distance.",
        "Average speed = total distance ÷ total time (not the average of the speeds).",
      ],
      strategies: ["Draw the speed–distance–time triangle", "Convert units before substituting", "Multiply by the scale to go map → real"],
      whyItWorks:
        "Speed is a rate — distance per unit of time — so dividing total distance by total time recovers it. Scale is a fixed ratio, so multiplying every map length by the same factor reproduces the real layout exactly in proportion.",
    },
  ],
  learn: {
    cards: [
      { front: "Simplify 12 : 18", back: "2 : 3 — divide both by the HCF, 6." },
      { front: "Share £60 in the ratio 3 : 2", back: "5 parts → 1 part = £12, so £36 : £24." },
      { front: "Ratio 3 : 2 — what fraction is the first part?", back: "3/5 of the whole (3 out of 3 + 2 = 5 parts)." },
      { front: "Unitary method", back: "Find the value of ONE unit, then multiply up to the number you need." },
      { front: "Best buy — how to compare?", back: "Work out the price per single item (or per 100 g); smallest unit price wins." },
      { front: "Speed formula", back: "Speed = distance ÷ time. Rearranged: distance = speed × time, time = distance ÷ speed." },
      { front: "Scale 1 : 50 000 — 4 cm on map = ?", back: "4 × 50 000 = 200 000 cm = 2 km in real life." },
      { front: "Average speed for a whole journey", back: "Total distance ÷ total time — never the mean of the separate speeds." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "ratio-mcq-q01",
        question: "Simplify the ratio 20 : 35 to its lowest terms.",
        options: ["4 : 7", "5 : 7", "4 : 5", "2 : 3"],
        answerIndex: 0,
        explanation: "The HCF of 20 and 35 is 5: 20 ÷ 5 = 4 and 35 ÷ 5 = 7, giving 4 : 7.",
        difficulty: "warmup",
        guideRef: "Simplifying ratios and ratio as a fraction",
        strategy: "Divide by the HCF",
      },
      {
        id: "ratio-mcq-q02",
        question: "£48 is shared between two people in the ratio 5 : 3. How much does the person with the larger share receive?",
        options: ["£18", "£30", "£24", "£40"],
        answerIndex: 1,
        explanation: "5 + 3 = 8 parts; one part = £48 ÷ 8 = £6. Larger share = 5 × £6 = £30.",
        difficulty: "core",
        guideRef: "Sharing in a ratio (and the 'difference' trick)",
        hints: [
          "Add the ratio parts to find how many parts share the £48.",
          "Divide £48 by the total number of parts to find one part.",
          "Multiply the larger ratio number (5) by the value of one part.",
        ],
        strategy: "Find the value of one part first",
      },
      {
        id: "ratio-mcq-q03",
        question: "7 identical exercise books cost £8.40. How much do 12 of the same books cost?",
        options: ["£13.20", "£14.40", "£12.60", "£15.00"],
        answerIndex: 1,
        explanation: "One book costs £8.40 ÷ 7 = £1.20, so 12 books cost 12 × £1.20 = £14.40.",
        difficulty: "core",
        guideRef: "Direct proportion, rates and best buys",
        hints: [
          "First find the cost of just one book.",
          "£8.40 ÷ 7 gives the price per book.",
          "Multiply the per-book price by 12.",
        ],
        strategy: "Use the unitary method",
      },
      {
        id: "ratio-mcq-q04",
        question: "A car travels 150 km in 2 hours 30 minutes. What is its average speed?",
        options: ["75 km/h", "60 km/h", "50 km/h", "62.5 km/h"],
        answerIndex: 1,
        explanation: "2 h 30 min = 2.5 h. Speed = distance ÷ time = 150 ÷ 2.5 = 60 km/h.",
        difficulty: "core",
        guideRef: "Speed, distance, time and scale drawings",
        hints: [
          "Convert 2 hours 30 minutes into hours as a decimal.",
          "30 minutes = 0.5 hours, so the time is 2.5 h.",
          "Speed = distance ÷ time = 150 ÷ 2.5.",
        ],
        strategy: "Convert units before substituting",
      },
      {
        id: "ratio-mcq-q05",
        question: "Shop A sells 6 apples for £1.50. Shop B sells 10 of the same apples for £2.40. Which is the better value, and by how much per apple?",
        options: [
          "Shop A, by 1p per apple",
          "Shop B, by 1p per apple",
          "Shop B, by 4p per apple",
          "They are the same value",
        ],
        answerIndex: 1,
        explanation: "Shop A: £1.50 ÷ 6 = 25p each. Shop B: £2.40 ÷ 10 = 24p each. Shop B is cheaper by 1p per apple.",
        difficulty: "challenge",
        guideRef: "Direct proportion, rates and best buys",
        hints: [
          "Find the price of one apple in each shop.",
          "Divide each total by the number of apples.",
          "Compare 25p and 24p.",
        ],
        strategy: "Compare like-for-like unit prices",
      },
      {
        id: "ratio-mcq-q06",
        question: "In a class the ratio of girls to boys is 4 : 5. There are 6 more boys than girls. How many students are in the class altogether?",
        options: ["45", "54", "27", "63"],
        answerIndex: 1,
        explanation: "The difference is 5 − 4 = 1 part, and that equals 6, so one part = 6 students. Total parts = 4 + 5 = 9, so the class has 9 × 6 = 54.",
        difficulty: "challenge",
        guideRef: "Sharing in a ratio (and the 'difference' trick)",
        hints: [
          "The 6 extra boys correspond to the DIFFERENCE in the ratio numbers.",
          "5 − 4 = 1 part, and that one part equals 6 students.",
          "Total = (4 + 5) parts × value of one part.",
        ],
        strategy: "Match the given clue to the right number of parts",
      },
    ],
    qa: [
      {
        id: "ratio-qa-q01",
        question: "A recipe for 4 people needs 600 g of flour and 250 ml of milk. Rewrite the quantities needed for 10 people. Show your working.",
        modelAnswer:
          "Find the amount for 1 person, then scale to 10. Flour: 600 ÷ 4 = 150 g per person, so 10 × 150 = 1500 g. Milk: 250 ÷ 4 = 62.5 ml per person, so 10 × 62.5 = 625 ml. For 10 people: 1500 g flour and 625 ml milk.",
        markScheme: [
          "Flour per person 600 ÷ 4 = 150 g [1]",
          "Flour for 10: 1500 g [1]",
          "Milk per person 250 ÷ 4 = 62.5 ml and milk for 10: 625 ml [1]",
        ],
        commonError: "Multiplying by 10/4 incorrectly or only scaling one ingredient.",
        difficulty: "core",
        guideRef: "Direct proportion, rates and best buys",
        hints: ["Find each amount for one person first.", "Then multiply both by 10."],
        strategy: "Use the unitary method",
      },
      {
        id: "ratio-qa-q02",
        question:
          "A 1 : 25 000 map shows a footpath 14 cm long. Calculate the real length of the footpath in kilometres. Show each step.",
        modelAnswer:
          "Real distance = 14 cm × 25 000 = 350 000 cm. Convert: 350 000 ÷ 100 = 3500 m = 3.5 km. The footpath is 3.5 km long.",
        markScheme: [
          "14 × 25 000 = 350 000 cm [1]",
          "Convert to metres: 350 000 ÷ 100 = 3500 m [1]",
          "Convert to km: 3.5 km [1]",
        ],
        commonError: "Forgetting to convert cm → m → km, or dividing instead of multiplying by the scale.",
        difficulty: "core",
        guideRef: "Speed, distance, time and scale drawings",
        hints: ["Multiply the map distance by the scale to get real cm.", "100 cm = 1 m and 1000 m = 1 km."],
        strategy: "Multiply by the scale to go map → real",
      },
      {
        id: "ratio-qa-q03",
        question:
          "Challenge: Three friends share a prize in the ratio 2 : 3 : 5. The friend with the largest share receives £120 more than the friend with the smallest share. Work out the total prize and each share.",
        modelAnswer:
          "Largest − smallest = 5 − 2 = 3 parts, and this equals £120, so one part = £120 ÷ 3 = £40. Total parts = 2 + 3 + 5 = 10, so the total prize = 10 × £40 = £400. Shares: 2 × £40 = £80, 3 × £40 = £120, 5 × £40 = £200. Check: 80 + 120 + 200 = £400.",
        markScheme: [
          "Difference is 5 − 2 = 3 parts = £120 [1]",
          "One part = £40 [1]",
          "Total = 10 × £40 = £400 [1]",
          "Shares £80, £120, £200 (check they sum to £400) [1]",
        ],
        commonError: "Treating £120 as the total or as one part rather than the 3-part difference.",
        difficulty: "challenge",
        guideRef: "Sharing in a ratio (and the 'difference' trick)",
        hints: [
          "The £120 is a difference — which difference of the ratio numbers does it match?",
          "5 − 2 = 3 parts equal £120.",
          "Find one part, then the total and each share.",
        ],
        strategy: "Match the given clue to the right number of parts",
        solutions: [
          {
            label: "Difference method",
            steps: [
              "Largest − smallest = 5 − 2 = 3 parts.",
              "3 parts = £120, so 1 part = £40.",
              "Total = (2 + 3 + 5) × £40 = £400.",
              "Shares: £80, £120, £200.",
            ],
          },
          {
            label: "Algebra (let one part = x)",
            steps: [
              "Parts are 2x, 3x, 5x.",
              "Largest − smallest: 5x − 2x = 3x = 120, so x = 40.",
              "Total = 10x = £400.",
              "Shares: 2x = £80, 3x = £120, 5x = £200.",
            ],
          },
        ],
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "ratio-mcq-paper-1",
        title: "Ratio & Proportion — MCQ Set A",
        questions: [
          {
            id: "ratio-mcq-b1-q01",
            question: "Simplify the ratio 9 : 12.",
            options: ["3 : 4", "3 : 5", "2 : 3", "9 : 12"],
            answerIndex: 0,
            explanation: "Divide both by the HCF, 3: 9 ÷ 3 = 3 and 12 ÷ 3 = 4.",
            difficulty: "warmup",
          },
          {
            id: "ratio-mcq-b1-q02",
            question: "Write 40 cm : 1 m as a ratio in its simplest form.",
            options: ["40 : 1", "2 : 5", "5 : 2", "4 : 10"],
            answerIndex: 1,
            explanation: "1 m = 100 cm, so 40 : 100 = 2 : 5 after dividing both by 20.",
            difficulty: "core",
            hints: ["Convert both to the same unit first.", "1 m = 100 cm."],
            strategy: "Convert to common units first",
          },
          {
            id: "ratio-mcq-b1-q03",
            question: "Share 35 sweets in the ratio 3 : 4. How many sweets are in the smaller share?",
            options: ["15", "20", "12", "21"],
            answerIndex: 0,
            explanation: "3 + 4 = 7 parts; one part = 35 ÷ 7 = 5. Smaller share = 3 × 5 = 15.",
            difficulty: "core",
            hints: ["Add the parts, divide 35 by the total.", "Multiply the smaller ratio number by one part."],
            strategy: "Find the value of one part first",
          },
          {
            id: "ratio-mcq-b1-q04",
            question: "4 kg of potatoes cost £3.60. What is the cost of 7 kg at the same rate?",
            options: ["£6.30", "£5.40", "£6.00", "£7.20"],
            answerIndex: 0,
            explanation: "One kg costs £3.60 ÷ 4 = £0.90, so 7 kg cost 7 × £0.90 = £6.30.",
            difficulty: "core",
            hints: ["Find the price of 1 kg.", "Then multiply by 7."],
            strategy: "Use the unitary method",
          },
          {
            id: "ratio-mcq-b1-q05",
            question: "A runner covers 400 m in 50 seconds. What is the speed in metres per second?",
            options: ["8 m/s", "0.125 m/s", "20 m/s", "10 m/s"],
            answerIndex: 0,
            explanation: "Speed = distance ÷ time = 400 ÷ 50 = 8 m/s.",
            difficulty: "core",
            strategy: "Speed = distance ÷ time",
          },
          {
            id: "ratio-mcq-b1-q06",
            question: "The ratio of red to blue counters is 2 : 7. There are 63 blue counters. How many red counters are there?",
            options: ["18", "14", "9", "126"],
            answerIndex: 0,
            explanation: "7 parts = 63, so one part = 9. Red = 2 × 9 = 18.",
            difficulty: "challenge",
            hints: ["The 63 blue counters correspond to 7 parts.", "Find one part: 63 ÷ 7.", "Red = 2 × one part."],
            strategy: "Match the given clue to the right number of parts",
          },
        ],
      },
      {
        id: "ratio-mcq-paper-2",
        title: "Ratio & Proportion — MCQ Set B",
        questions: [
          {
            id: "ratio-mcq-b2-q01",
            question: "Which ratio is equivalent to 3 : 5?",
            options: ["6 : 10", "5 : 3", "9 : 10", "8 : 10"],
            answerIndex: 0,
            explanation: "Multiplying both parts of 3 : 5 by 2 gives 6 : 10.",
            difficulty: "warmup",
          },
          {
            id: "ratio-mcq-b2-q02",
            question: "In the ratio 5 : 4, what fraction of the whole is the first part?",
            options: ["5/9", "4/9", "5/4", "1/5"],
            answerIndex: 0,
            explanation: "Total parts = 5 + 4 = 9, so the first part is 5/9 of the whole.",
            difficulty: "core",
            hints: ["Add the parts to get the denominator.", "First part is 5 out of 9."],
            strategy: "Turn a ratio into fractions of the whole",
          },
          {
            id: "ratio-mcq-b2-q03",
            question: "A 1 : 200 scale model of a building is 9 cm tall. How tall is the real building?",
            options: ["18 m", "1.8 m", "180 m", "0.18 m"],
            answerIndex: 0,
            explanation: "9 × 200 = 1800 cm = 18 m.",
            difficulty: "core",
            hints: ["Multiply the model height by 200.", "Convert cm to m at the end (÷100)."],
            strategy: "Multiply by the scale to go model → real",
          },
          {
            id: "ratio-mcq-b2-q04",
            question: "A cyclist rides at a steady 24 km/h. How far does she travel in 45 minutes?",
            options: ["18 km", "16 km", "10.8 km", "32 km"],
            answerIndex: 0,
            explanation: "45 min = 0.75 h. Distance = speed × time = 24 × 0.75 = 18 km.",
            difficulty: "core",
            hints: ["Change 45 minutes into hours.", "45 ÷ 60 = 0.75 h, then distance = speed × time."],
            strategy: "Convert units before substituting",
          },
          {
            id: "ratio-mcq-b2-q05",
            question: "Orange squash is mixed with water in the ratio 1 : 6. How much squash is needed to make 1400 ml of drink?",
            options: ["200 ml", "233 ml", "175 ml", "1200 ml"],
            answerIndex: 0,
            explanation: "Total parts = 1 + 6 = 7; one part = 1400 ÷ 7 = 200 ml. Squash = 1 part = 200 ml.",
            difficulty: "challenge",
            hints: ["The drink is made of 1 + 6 = 7 parts.", "One part = 1400 ÷ 7.", "Squash is just 1 part."],
            strategy: "Find the value of one part first",
          },
          {
            id: "ratio-mcq-b2-q06",
            question: "8 workers build a wall in 6 days. Working at the same rate, how long would 3 workers take? (inverse proportion)",
            options: ["16 days", "2.25 days", "12 days", "9 days"],
            answerIndex: 0,
            explanation: "Total work = 8 × 6 = 48 worker-days. With 3 workers: 48 ÷ 3 = 16 days. Fewer workers take longer.",
            difficulty: "challenge",
            hints: [
              "Is this direct proportion? Fewer workers should take LONGER.",
              "Find the total amount of work in worker-days: 8 × 6.",
              "Divide the 48 worker-days by 3 workers.",
            ],
            strategy: "Use total work (worker-days) for inverse proportion",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "ratio-qa-paper-1",
        title: "Ratio & Proportion — Written Set A",
        questions: [
          {
            id: "ratio-qa-b1-q01",
            question: "Simplify the ratio 24 : 36 : 60 to its lowest terms.",
            modelAnswer: "The HCF of 24, 36 and 60 is 12. Dividing each by 12 gives 2 : 3 : 5.",
            markScheme: ["Identify a common factor (e.g. 12) [1]", "2 : 3 : 5 [1]"],
            difficulty: "warmup",
          },
          {
            id: "ratio-qa-b1-q02",
            question: "£72 is shared between Priya and Sam in the ratio 7 : 2. Work out how much each person receives.",
            modelAnswer: "7 + 2 = 9 parts; one part = £72 ÷ 9 = £8. Priya = 7 × £8 = £56, Sam = 2 × £8 = £16. Check: 56 + 16 = £72.",
            markScheme: ["9 parts, one part = £8 [1]", "Priya £56 [1]", "Sam £16 [1]"],
            commonError: "Forgetting to add the parts before dividing.",
            difficulty: "core",
            hints: ["Add the parts, then divide £72 by the total.", "Multiply each ratio number by one part."],
            strategy: "Find the value of one part first",
          },
          {
            id: "ratio-qa-b1-q03",
            question:
              "Challenge: A train travels 90 km at 60 km/h, then 90 km at 90 km/h. Find the average speed for the whole journey. (Hint: it is NOT 75 km/h.)",
            modelAnswer:
              "First leg time = 90 ÷ 60 = 1.5 h. Second leg time = 90 ÷ 90 = 1 h. Total distance = 180 km, total time = 2.5 h. Average speed = 180 ÷ 2.5 = 72 km/h.",
            markScheme: [
              "Time for first leg = 1.5 h [1]",
              "Time for second leg = 1 h [1]",
              "Total distance 180 km ÷ total time 2.5 h [1]",
              "Average speed = 72 km/h [1]",
            ],
            commonError: "Averaging the two speeds (60 and 90) to get 75 km/h, which ignores that more time is spent at the slower speed.",
            difficulty: "challenge",
            hints: [
              "Average speed = total distance ÷ total time, not the mean of the speeds.",
              "Work out the time taken for each leg separately.",
              "Add the distances and the times, then divide.",
            ],
            strategy: "Average speed = total distance ÷ total time",
            solutions: [
              {
                label: "Total distance ÷ total time",
                steps: [
                  "Leg 1 time: 90 ÷ 60 = 1.5 h.",
                  "Leg 2 time: 90 ÷ 90 = 1 h.",
                  "Total: 180 km in 2.5 h.",
                  "Average speed = 180 ÷ 2.5 = 72 km/h.",
                ],
              },
              {
                label: "Why not 75?",
                steps: [
                  "The train spends more time on the slower 60 km/h leg (1.5 h vs 1 h).",
                  "So the average is pulled below the midpoint 75.",
                  "Weighting by time gives 72 km/h.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
