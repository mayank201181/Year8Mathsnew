import type { Topic } from "../types";

export const percentages: Topic = {
  id: "percentages",
  title: "Percentages",
  subject: "Maths",
  icon: "%",
  strand: "Number",
  intro:
    "Find percentages of amounts, increase and decrease with multipliers, work backwards with reverse percentages, measure percentage change and simple interest — the maths behind sales, tips, tax and savings.",
  guide: [
    {
      heading: "Percentage of an amount: mental methods and multipliers",
      discovery: {
        problem:
          "A £80 coat has 35% off. Find the saving in your head — without a calculator. What simple chunks could you add to make 35%?",
        idea:
          "35% = 10% + 10% + 10% + 5%. 10% of 80 = 8, so 30% = 24, and 5% = 4. Saving = 24 + 4 = £28. Splitting a percentage into 10%, 5% and 1% chunks makes any percentage mental.",
      },
      body:
        "'Per cent' means 'per hundred', so 35% = 35/100 = 0.35.\n\nTo find a percentage **mentally**, build it from easy chunks: 10% (divide by 10), 1% (divide by 100), and 5% (half of 10%).\n\nThe fastest exact method is a **multiplier**: change the percentage to a decimal and multiply. 35% of 80 = 0.35 × 80 = 28. Multipliers shine when you need to combine several steps.",
      keyPoints: [
        "x% means x/100, e.g. 35% = 0.35.",
        "10% = ÷ 10, 1% = ÷ 100, 5% = half of 10%.",
        "Multiplier method: percentage ÷ 100, then × the amount.",
        "Build awkward percentages from 10%, 5% and 1% chunks.",
      ],
      strategies: ["Break into 10%, 5%, 1% chunks", "Convert to a decimal multiplier"],
      whyItWorks:
        "0.35 × 80 works because 0.35 is exactly 35 hundredths. Multiplying 80 by 35/100 takes 35 of the 100 equal parts of 80 — which is precisely what '35 per cent of 80' means.",
    },
    {
      heading: "Increase and decrease with multipliers",
      discovery: {
        problem:
          "Two shops both charge £200 for a bike. Shop A adds 20% then takes 20% off; Shop B takes 20% off then adds 20%. Which is cheaper — and is either back at £200?",
        idea:
          "Both do ×1.2 × 0.8 = ×0.96, so both end at £192, not £200. A percentage rise and the same percentage fall do NOT cancel, because they act on different amounts.",
      },
      body:
        "To **increase** by x%, multiply by (1 + x/100). To **decrease** by x%, multiply by (1 − x/100).\n\nSo a 20% rise is × 1.2, and a 20% fall is × 0.8. A 15% rise is × 1.15; a 15% fall is × 0.85.\n\nMultipliers chain neatly: applying one after another just multiplies the multipliers together. That is why a +20% then −20% gives × 1.2 × 0.8 = × 0.96 — a 4% overall loss.",
      keyPoints: [
        "Increase by x%: × (1 + x/100).",
        "Decrease by x%: × (1 − x/100).",
        "+20% → × 1.2; −20% → × 0.8; +5% → × 1.05.",
        "Successive changes multiply the multipliers; they rarely cancel.",
      ],
      strategies: ["Write each change as a multiplier", "Multiply multipliers for successive changes"],
      whyItWorks:
        "Increasing by 20% means keeping the whole (100%) and adding 20% more: 100% + 20% = 120% = × 1.2. Decreasing keeps 100% − 20% = 80% = × 0.8.",
    },
    {
      heading: "Reverse percentages and percentage change",
      discovery: {
        problem:
          "After a 20% off sale, a jacket costs £48. A friend says the original was £48 + 20% = £57.60. They are wrong — what is the real original price?",
        idea:
          "The £48 represents 80% of the original (after × 0.8). So original = 48 ÷ 0.8 = £60. To reverse a percentage change you divide by the multiplier, never add the percentage back.",
      },
      body:
        "**Reverse percentage**: when you know the amount *after* a change, divide by the multiplier to recover the original. If £48 is the price after 20% off, then 48 = original × 0.8, so original = 48 ÷ 0.8 = £60.\n\n**Percentage change** measures how much something changed relative to where it started:\n\npercentage change = (change ÷ original) × 100.\n\nA rise from 40 to 50 is (10 ÷ 40) × 100 = 25% increase. Always divide by the **original**, not the new value.",
      keyPoints: [
        "Reverse: original = final ÷ multiplier (e.g. ÷ 0.8 after −20%).",
        "Never just add the percentage back to undo a change.",
        "Percentage change = (change ÷ original) × 100.",
        "Profit/loss % uses the cost price as the original.",
      ],
      strategies: ["Find the multiplier, then divide to reverse", "Always compare the change to the original"],
      whyItWorks:
        "If final = original × 0.8, then dividing both sides by 0.8 gives original = final ÷ 0.8. Adding 20% back fails because that 20% would be taken of the smaller £48, not the larger original.",
    },
    {
      heading: "Simple interest and FDP conversions",
      discovery: {
        problem:
          "You save £500 at 3% simple interest per year. How much interest after 4 years — and why is the answer NOT just 3% once?",
        idea:
          "Simple interest pays 3% of the original every year: 3% of 500 = £15 per year, so 4 years = 4 × £15 = £60. The rate applies anew each year to the same starting amount.",
      },
      body:
        "**Simple interest** is the same amount each period, based on the original sum: interest = principal × rate × time. For £500 at 3% for 4 years: 500 × 0.03 × 4 = £60.\n\n**Fraction–Decimal–Percentage (FDP)** are three ways to write the same proportion. To convert: a fraction → decimal by dividing; decimal → percentage by × 100; percentage → fraction by writing over 100 and simplifying.\n\nExamples: 1/4 = 0.25 = 25%; 3/5 = 0.6 = 60%; 0.07 = 7%.",
      keyPoints: [
        "Simple interest = principal × rate × time (per period, on the original).",
        "Decimal → percentage: × 100; percentage → decimal: ÷ 100.",
        "Fraction → decimal: divide top by bottom.",
        "Percentage → fraction: write over 100 and simplify (e.g. 25% = 1/4).",
      ],
      strategies: ["Use interest = P × r × t", "Switch freely between F, D and P"],
      whyItWorks:
        "Simple interest stays linear because each year's interest is calculated on the fixed principal, never on the interest already earned. (That growing version is compound interest, met later.)",
    },
  ],
  learn: {
    cards: [
      { front: "35% of 80", back: "0.35 × 80 = 28. (Or 30% + 5% = 24 + 4.)" },
      { front: "Multiplier for +20%", back: "× 1.2 (that is 100% + 20%)." },
      { front: "Multiplier for −15%", back: "× 0.85 (that is 100% − 15%)." },
      { front: "+20% then −20% overall", back: "× 1.2 × 0.8 = × 0.96, a 4% loss — they don't cancel." },
      { front: "Reverse −20%: £48 after sale", back: "original = 48 ÷ 0.8 = £60." },
      { front: "Percentage change formula", back: "(change ÷ original) × 100." },
      { front: "Simple interest formula", back: "principal × rate × time." },
      { front: "3/5 as a percentage", back: "0.6 = 60%." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "percent-mcq-q01",
        question: "What is 10% of 250?",
        options: ["2.5", "25", "250", "2500"],
        answerIndex: 1,
        explanation: "10% is dividing by 10: 250 ÷ 10 = 25.",
        difficulty: "warmup",
        guideRef: "Percentage of an amount: mental methods and multipliers",
        strategy: "Break into 10% chunks",
      },
      {
        id: "percent-mcq-q02",
        question: "Which multiplier increases an amount by 30%?",
        options: ["× 0.30", "× 0.70", "× 1.30", "× 3.0"],
        answerIndex: 2,
        explanation: "Increase by 30% means 100% + 30% = 130% = × 1.30.",
        difficulty: "warmup",
        guideRef: "Increase and decrease with multipliers",
        strategy: "Write the change as a multiplier",
      },
      {
        id: "percent-mcq-q03",
        question: "A £40 game is reduced by 15%. What is the new price?",
        options: ["£25", "£34", "£36", "£6"],
        answerIndex: 1,
        explanation: "× 0.85: 40 × 0.85 = £34. (15% of 40 is £6 off.)",
        difficulty: "core",
        guideRef: "Increase and decrease with multipliers",
        hints: [
          "A 15% decrease uses which multiplier?",
          "100% − 15% = 85%, so × 0.85.",
          "40 × 0.85 = 34.",
        ],
        strategy: "Decrease by × (1 − x/100)",
      },
      {
        id: "percent-mcq-q04",
        question: "A price rises from 80p to 100p. What is the percentage increase?",
        options: ["20%", "25%", "80%", "125%"],
        answerIndex: 1,
        explanation: "Change = 20p; (20 ÷ 80) × 100 = 25%. Divide by the original 80p, not 100p.",
        difficulty: "core",
        guideRef: "Reverse percentages and percentage change",
        hints: [
          "Percentage change compares the change to the original.",
          "Change is 20p; original is 80p.",
          "(20 ÷ 80) × 100 = 25%.",
        ],
        strategy: "Compare the change to the original",
      },
      {
        id: "percent-mcq-q05",
        question:
          "After a 25% discount, a coat costs £60. What was the original price?",
        options: ["£75", "£80", "£85", "£45"],
        answerIndex: 1,
        explanation: "£60 is 75% of the original: original = 60 ÷ 0.75 = £80.",
        difficulty: "challenge",
        guideRef: "Reverse percentages and percentage change",
        hints: [
          "£60 is the price after the discount — what percentage of the original is it?",
          "100% − 25% = 75%, so 60 = original × 0.75.",
          "Divide: 60 ÷ 0.75 = 80.",
        ],
        strategy: "Find the multiplier, then divide to reverse",
      },
      {
        id: "percent-mcq-q06",
        question:
          "A share price rises 10% one day, then falls 10% the next. Overall it has…",
        options: [
          "stayed the same",
          "fallen by 1%",
          "risen by 1%",
          "fallen by 10%",
        ],
        answerIndex: 1,
        explanation:
          "× 1.1 × 0.9 = × 0.99, a 1% overall fall — the rise and fall act on different amounts, so they don't cancel.",
        difficulty: "challenge",
        guideRef: "Increase and decrease with multipliers",
        hints: [
          "Write each day as a multiplier.",
          "Multiply: 1.1 × 0.9.",
          "1.1 × 0.9 = 0.99, which is a 1% decrease.",
        ],
        strategy: "Multiply the multipliers for successive changes",
      },
    ],
    qa: [
      {
        id: "percent-qa-q01",
        question: "Find 45% of 60. Show a mental method and a multiplier method.",
        modelAnswer:
          "Mental: 10% = 6, so 40% = 24; 5% = 3; total 24 + 3 = 27. Multiplier: 0.45 × 60 = 27.",
        markScheme: [
          "A valid method shown (chunks or multiplier) [1]",
          "Correct intermediate values [1]",
          "Answer 27 [1]",
        ],
        commonError: "Forgetting the 5% part and giving 40% = 24 as the final answer.",
        difficulty: "core",
        guideRef: "Percentage of an amount: mental methods and multipliers",
        hints: ["Build 45% from 40% + 5%, or use 0.45 × 60."],
        strategy: "Break into chunks, or use a multiplier",
        solutions: [
          {
            label: "Mental chunks",
            steps: ["10% of 60 = 6", "40% = 4 × 6 = 24", "5% = half of 6 = 3", "45% = 24 + 3 = 27"],
          },
          {
            label: "Decimal multiplier",
            steps: ["45% = 0.45", "0.45 × 60 = 27"],
          },
        ],
      },
      {
        id: "percent-qa-q02",
        question:
          "£600 is invested at 4% simple interest per year. How much interest is earned after 3 years, and what is the total balance?",
        modelAnswer:
          "Interest = 600 × 0.04 × 3 = £72. Total balance = 600 + 72 = £672.",
        markScheme: [
          "4% of 600 = £24 per year (or 600 × 0.04 × 3) [1]",
          "Interest = £72 [1]",
          "Total = £672 [1]",
        ],
        commonError: "Charging interest on the growing balance (that is compound, not simple, interest).",
        difficulty: "core",
        guideRef: "Simple interest and FDP conversions",
        hints: [
          "Simple interest uses principal × rate × time.",
          "Find one year's interest first, then multiply by 3.",
        ],
        strategy: "Use interest = P × r × t",
      },
      {
        id: "percent-qa-q03",
        question:
          "Challenge: A phone costs £x. Its price is increased by 20% for a launch, then reduced by 25% in a sale. Write the overall multiplier, and state the single percentage change from the original price.",
        modelAnswer:
          "Overall multiplier = 1.2 × 0.75 = 0.9. So the final price is 0.9x, a 10% decrease from the original.",
        markScheme: [
          "+20% → × 1.2 and −25% → × 0.75 [1]",
          "1.2 × 0.75 = 0.9 [1]",
          "0.9 means a 10% overall decrease [1]",
        ],
        commonError: "Combining as −5% (just doing 20 − 25) instead of multiplying the multipliers.",
        difficulty: "challenge",
        guideRef: "Increase and decrease with multipliers",
        hints: [
          "Turn each change into a multiplier.",
          "Multiply 1.2 by 0.75.",
          "0.9 is 90% of the original — what change is that?",
        ],
        strategy: "Multiply the multipliers, then read off the single change",
      },
      {
        id: "percent-qa-q04",
        question:
          "Challenge: A shop sells a toy for £36, having added 50% to the price it paid. How much did the shop pay, and what was the percentage profit on what it paid?",
        modelAnswer:
          "£36 = cost × 1.5, so cost = 36 ÷ 1.5 = £24. Profit = £36 − £24 = £12, which is (12 ÷ 24) × 100 = 50% of the cost price.",
        markScheme: [
          "Set up 36 = cost × 1.5 [1]",
          "Cost = 36 ÷ 1.5 = £24 [1]",
          "Profit £12 → 50% of cost [1]",
        ],
        commonError: "Finding 50% of £36 = £18 instead of reversing the increase (÷ 1.5).",
        difficulty: "challenge",
        guideRef: "Reverse percentages and percentage change",
        hints: [
          "The £36 already includes the 50% mark-up.",
          "£36 is 150% of the cost — divide by 1.5.",
          "Profit ÷ cost × 100 gives the percentage profit.",
        ],
        strategy: "Find the multiplier, then divide to reverse",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "percent-mcq-paper-1",
        title: "Percentages — MCQ Set A",
        questions: [
          {
            id: "percent-mcq-b1-q01",
            question: "What is 50% of 90?",
            options: ["18", "40", "45", "180"],
            answerIndex: 2,
            explanation: "50% is a half: 90 ÷ 2 = 45.",
            difficulty: "warmup",
          },
          {
            id: "percent-mcq-b1-q02",
            question: "Write 0.07 as a percentage.",
            options: ["0.7%", "7%", "70%", "700%"],
            answerIndex: 1,
            explanation: "Decimal → percentage is × 100: 0.07 × 100 = 7%.",
            difficulty: "warmup",
          },
          {
            id: "percent-mcq-b1-q03",
            question: "Find 15% of 200.",
            options: ["15", "30", "35", "300"],
            answerIndex: 1,
            explanation: "10% = 20, 5% = 10, so 15% = 30. (Or 0.15 × 200 = 30.)",
            difficulty: "core",
            hints: ["Build 15% from 10% + 5%."],
            strategy: "Break into 10%, 5% chunks",
          },
          {
            id: "percent-mcq-b1-q04",
            question: "A £500 TV is increased by 8%. What is the new price?",
            options: ["£508", "£540", "£560", "£580"],
            answerIndex: 1,
            explanation: "× 1.08: 500 × 1.08 = £540. (8% of 500 = £40.)",
            difficulty: "core",
            strategy: "Increase by × (1 + x/100)",
          },
          {
            id: "percent-mcq-b1-q05",
            question: "A number falls from 250 to 200. What is the percentage decrease?",
            options: ["20%", "25%", "50%", "80%"],
            answerIndex: 0,
            explanation: "Change = 50; (50 ÷ 250) × 100 = 20%. Divide by the original 250.",
            difficulty: "core",
            hints: ["Change is 50; compare it to the original 250."],
            strategy: "Compare the change to the original",
          },
          {
            id: "percent-mcq-b1-q06",
            question:
              "After a 60% off clearance, a lamp costs £20. What was its original price?",
            options: ["£32", "£50", "£80", "£12"],
            answerIndex: 1,
            explanation: "£20 is 40% of the original: 20 ÷ 0.4 = £50.",
            difficulty: "challenge",
            hints: [
              "£20 is the price after 60% off — what percentage is left?",
              "100% − 60% = 40%, so 20 = original × 0.4.",
            ],
            strategy: "Find the multiplier, then divide to reverse",
          },
        ],
      },
      {
        id: "percent-mcq-paper-2",
        title: "Percentages — MCQ Set B",
        questions: [
          {
            id: "percent-mcq-b2-q01",
            question: "Write 3/4 as a percentage.",
            options: ["34%", "43%", "75%", "0.75%"],
            answerIndex: 2,
            explanation: "3 ÷ 4 = 0.75 = 75%.",
            difficulty: "warmup",
          },
          {
            id: "percent-mcq-b2-q02",
            question: "Which multiplier decreases an amount by 5%?",
            options: ["× 0.5", "× 0.95", "× 1.05", "× 0.05"],
            answerIndex: 1,
            explanation: "100% − 5% = 95% = × 0.95.",
            difficulty: "warmup",
          },
          {
            id: "percent-mcq-b2-q03",
            question: "Find 12.5% of 64.",
            options: ["6", "8", "12.5", "16"],
            answerIndex: 1,
            explanation: "12.5% = 1/8, and 64 ÷ 8 = 8. (Or 0.125 × 64 = 8.)",
            difficulty: "core",
            hints: ["12.5% is one eighth."],
            strategy: "Recognise 12.5% = 1/8",
          },
          {
            id: "percent-mcq-b2-q04",
            question:
              "£800 earns simple interest at 5% per year. How much interest after 2 years?",
            options: ["£40", "£80", "£82", "£880"],
            answerIndex: 1,
            explanation: "800 × 0.05 × 2 = £80. (5% of 800 = £40 each year.)",
            difficulty: "core",
            strategy: "Use interest = P × r × t",
          },
          {
            id: "percent-mcq-b2-q05",
            question:
              "A coat is increased by 25% then decreased by 25%. Compared with the start, the final price is…",
            options: [
              "the same",
              "6.25% lower",
              "6.25% higher",
              "25% lower",
            ],
            answerIndex: 1,
            explanation:
              "× 1.25 × 0.75 = × 0.9375, which is a 6.25% decrease overall.",
            difficulty: "challenge",
            hints: [
              "Write each change as a multiplier.",
              "Multiply 1.25 × 0.75.",
              "0.9375 means 93.75% of the start, i.e. 6.25% down.",
            ],
            strategy: "Multiply the multipliers for successive changes",
          },
          {
            id: "percent-mcq-b2-q06",
            question:
              "A salary of £30000 is 120% of last year's salary. What was last year's salary?",
            options: ["£25000", "£24000", "£36000", "£26000"],
            answerIndex: 0,
            explanation: "30000 ÷ 1.2 = £25000. (Adding 20% back to a wrong base would not reverse it.)",
            difficulty: "challenge",
            hints: [
              "£30000 is 120% of last year's figure.",
              "Divide by the multiplier 1.2.",
            ],
            strategy: "Find the multiplier, then divide to reverse",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "percent-qa-paper-1",
        title: "Percentages — Written Set A",
        questions: [
          {
            id: "percent-qa-b1-q01",
            question: "A class has 30 students and 40% wear glasses. How many wear glasses?",
            modelAnswer: "40% of 30 = 0.4 × 30 = 12 students.",
            markScheme: ["0.4 × 30 (or 10% = 3) [1]", "= 12 [1]"],
            difficulty: "warmup",
          },
          {
            id: "percent-qa-b1-q02",
            question:
              "A restaurant bill is £45 before a 10% service charge is added. What is the total bill?",
            modelAnswer:
              "Service charge = 10% of 45 = £4.50. Total = 45 + 4.50 = £49.50. (Or 45 × 1.1 = £49.50.)",
            markScheme: [
              "10% of 45 = £4.50 (or × 1.1) [1]",
              "Total = £49.50 [1]",
            ],
            commonError: "Adding 10 to the bill instead of 10% of it.",
            difficulty: "core",
            hints: ["Find 10% of £45, then add it on — or multiply by 1.1."],
            strategy: "Increase by × (1 + x/100)",
          },
          {
            id: "percent-qa-b1-q03",
            question:
              "Challenge: A jacket is reduced by 30% to £49. Find the original price, and find the actual saving in pounds.",
            modelAnswer:
              "£49 is 70% of the original: original = 49 ÷ 0.7 = £70. Saving = £70 − £49 = £21 (which is 30% of £70).",
            markScheme: [
              "£49 = original × 0.7 [1]",
              "Original = 49 ÷ 0.7 = £70 [1]",
              "Saving = £21 [1]",
            ],
            commonError: "Taking 30% of £49 (= £14.70) as the saving instead of reversing first.",
            difficulty: "challenge",
            hints: [
              "£49 is the reduced price — what percentage of the original is that?",
              "100% − 30% = 70%, so divide by 0.7.",
              "Saving is original minus reduced price.",
            ],
            strategy: "Find the multiplier, then divide to reverse",
          },
          {
            id: "percent-qa-b1-q04",
            question:
              "Challenge: Town A's population rises 10% then a further 10% over two years. Town B's rises 21% in one jump. If both started at 5000, compare their final populations.",
            modelAnswer:
              "Town A: 5000 × 1.1 × 1.1 = 5000 × 1.21 = 6050. Town B: 5000 × 1.21 = 6050. They are equal — two 10% rises multiply to × 1.21, exactly a 21% rise.",
            markScheme: [
              "Town A: × 1.1 × 1.1 = × 1.21 → 6050 [1]",
              "Town B: × 1.21 → 6050 [1]",
              "Conclude they are equal [1]",
            ],
            commonError: "Saying two 10% rises give 20%, getting 6000 for Town A.",
            difficulty: "challenge",
            hints: [
              "Write each rise as a multiplier and multiply them.",
              "1.1 × 1.1 = 1.21.",
              "Compare with Town B's single × 1.21.",
            ],
            strategy: "Multiply the multipliers for successive changes",
          },
        ],
      },
    ],
  },
};
