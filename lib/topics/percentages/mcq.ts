import type { Paper } from "../../types.ts";

// ---------------------------------------------------------------------------
// Percentages — four 20-question MCQ papers.
// Per paper: q01–q05 warmup, q06–q16 core, q17–q20 challenge.
// Every distractor is a named misconception; explanations name it by value.
// ---------------------------------------------------------------------------

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ PAPER 1
  // =========================================================================
  {
    id: "percentages-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "percentages-m1-q01",
        question: "Write 0.35 as a percentage.",
        options: ["3.5%", "0.35%", "35%", "350%"],
        answerIndex: 2,
        explanation:
          "Percent means 'out of 100', so multiply the decimal by 100: 0.35 × 100 = 35%. Writing 0.35% just sticks a % sign on without multiplying by 100, and 3.5% or 350% come from moving the digits the wrong number of places.",
        difficulty: "warmup",
        guideRef: "fdp-conversions",
        hints: ["Percent means 'out of 100'. What is 0.35 × 100?"],
        strategy: "Think 'out of 100'",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q02",
        question: "Find 10% of $84.",
        options: ["$8.40", "$0.84", "$74", "$75.60"],
        answerIndex: 0,
        explanation:
          "10% is {{1/10}}, so divide by 10: 84 ÷ 10 = $8.40. $0.84 is only 1% (dividing by 100), $74 treats 10% as $10, and $75.60 is the amount *left* after taking 10% off.",
        difficulty: "warmup",
        guideRef: "percentage-of-amount",
        hints: ["10% is one tenth. What do you divide by?"],
        strategy: "Build from 10%",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q03",
        question: "Aisha scores 18 out of 25 in a spelling test. What is her score as a percentage?",
        options: ["18%", "7%", "about 139%", "72%"],
        answerIndex: 3,
        explanation:
          "Multiply top and bottom by 4: {{18/25}} = {{72/100}} = 72%. 18% treats the mark itself as a percentage, 7% is the number of marks she *dropped* (25 − 18), and about 139% divides the wrong way round (25 ÷ 18).",
        difficulty: "warmup",
        guideRef: "one-as-percentage-of-another",
        hints: ["Write the score as a fraction out of 25, then make the denominator 100."],
        strategy: "Make the denominator 100",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q04",
        question: "Which single multiplier increases an amount by 6%?",
        options: ["× 1.6", "× 1.06", "× 0.06", "× 0.94"],
        answerIndex: 1,
        explanation:
          "After a 6% increase you have 100% + 6% = 106% of the amount, and 106% = 1.06. × 1.6 would be a 60% increase (6% is 0.06, not 0.6), × 0.06 only finds the 6% itself, and × 0.94 is a 6% *decrease*.",
        difficulty: "warmup",
        guideRef: "multipliers",
        hints: ["What percentage of the original do you have after the increase? Write it as a decimal."],
        strategy: "Write the new amount as a % of the old",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q05",
        question: "Which of these is equal to 125%?",
        options: ["{{5/4}}", "0.125", "12.5", "{{1/4}}"],
        answerIndex: 0,
        explanation:
          "125% = {{125/100}} = {{5/4}} (divide top and bottom by 25), which is 1.25 — more than one whole. 0.125 is only 12.5% (a place-value slip), 12.5 is 1250%, and {{1/4}} converts the 25% part but forgets the whole 100%.",
        difficulty: "warmup",
        guideRef: "fdp-conversions",
        hints: ["Write 125% as a fraction over 100 and simplify. Should the answer be more or less than 1?"],
        strategy: "Think 'out of 100'",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q06",
        question: "Hana works out 35% of 260 without a calculator. What should she get?",
        options: ["169", "78", "9.1", "91"],
        answerIndex: 3,
        explanation:
          "10% of 260 is 26, so 30% is 78, and 5% is half of 10%, which is 13. So 35% = 78 + 13 = 91. 78 forgets to add the 5%, 169 is the 65% that is *left*, and 9.1 is a place-value slip (10% of 260 is 26, not 2.6).",
        difficulty: "core",
        guideRef: "percentage-of-amount",
        hints: [
          "Split 35% into pieces you can find in your head.",
          "35% = 10% + 10% + 10% + 5%. What is 10% of 260?",
          "10% = 26 and 5% = 13. Add three lots of 26 and one lot of 13.",
        ],
        strategy: "Build from 10%",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q07",
        question: "What is 45 cm as a percentage of 3 m?",
        options: ["1500%", "15%", "0.15%", "about 6.7%"],
        answerIndex: 1,
        explanation:
          "Use the same units first: 3 m = 300 cm. Then {{45/300}} = 0.15 = 15%. 1500% comes from dividing 45 by 3 without changing metres into centimetres, 0.15% forgets to multiply by 100, and about 6.7% divides the wrong way round (3 ÷ 45).",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "Can you compare centimetres with metres directly?",
          "Change 3 m into centimetres.",
          "Work out {{45/300}} and multiply by 100.",
        ],
        strategy: "Same units first",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q08",
        question: "A $48 jacket is reduced by 15% in a sale. Which single calculation gives the sale price?",
        options: ["48 × 0.15", "48 × 1.15", "48 × 0.85", "48 − 15"],
        answerIndex: 2,
        explanation:
          "After taking 15% off, 100% − 15% = 85% of the price is left, so multiply by 0.85 (giving $40.80). 48 × 0.15 finds only the discount ($7.20), 48 × 1.15 is a 15% *increase*, and 48 − 15 takes off $15 instead of 15%.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "What percentage of the original price do you still pay?",
          "100% − 15% = ?",
          "85% as a decimal is 0.85.",
        ],
        strategy: "Use a single multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q09",
        question: "The price of a cup of bubble tea rises from $4.00 to $5.00. What is the percentage increase?",
        options: ["25%", "20%", "1%", "125%"],
        answerIndex: 0,
        explanation:
          "Percentage change = change ÷ original × 100 = {{1/4}} × 100 = 25%. 20% divides the $1 rise by the *new* price ($5) instead of the original, 1% treats the $1 rise as 1%, and 125% is the new price as a percentage of the old one — the increase is only the extra 25%.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "What is the change in price?",
          "Compare the change with the ORIGINAL price.",
          "Write {{1/4}} as a percentage.",
        ],
        strategy: "Compare with the original",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q10",
        question:
          "In a sale, everything is 20% off. Arjun pays $64 for a pair of shoes. The bar model shows the original price split into five equal parts. What was the original price?",
        diagram: `<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model. The original price is a bar of five equal parts, each 20 percent. Below it, the sale price of 64 dollars fills four of the parts and the fifth part is the 20 percent taken off."><rect x="0" y="0" width="400" height="150" fill="#ffffff"/><text x="200" y="20" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Original price (100%)</text><rect x="50" y="28" width="300" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><line x1="110" y1="28" x2="110" y2="62" stroke="#334155"/><line x1="170" y1="28" x2="170" y2="62" stroke="#334155"/><line x1="230" y1="28" x2="230" y2="62" stroke="#334155"/><line x1="290" y1="28" x2="290" y2="62" stroke="#334155"/><text x="80" y="50" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="140" y="50" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="200" y="50" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="260" y="50" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="320" y="50" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><rect x="50" y="80" width="240" height="34" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><line x1="110" y1="80" x2="110" y2="86" stroke="#334155"/><line x1="170" y1="80" x2="170" y2="86" stroke="#334155"/><line x1="230" y1="80" x2="230" y2="86" stroke="#334155"/><line x1="110" y1="108" x2="110" y2="114" stroke="#334155"/><line x1="170" y1="108" x2="170" y2="114" stroke="#334155"/><line x1="230" y1="108" x2="230" y2="114" stroke="#334155"/><text x="170" y="102" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Sale price $64 (80%)</text><rect x="290" y="80" width="60" height="34" fill="#fecaca" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 3"/><text x="320" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20% off</text><text x="200" y="140" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">Each part is 20% of the original price</text></svg>`,
        options: ["$76.80", "$51.20", "$80", "$84"],
        answerIndex: 2,
        explanation:
          "$64 is 80% of the original price — 4 of the 5 parts. One part (20%) is 64 ÷ 4 = $16, so the original is 5 × 16 = $80. Check: 20% of $80 is $16, and 80 − 16 = 64. $76.80 adds on 20% of $64, but the 20% was taken off the *original* price, not the sale price. $51.20 takes another 20% off, and $84 just adds 20.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "Is $64 the 100% or the 80%?",
          "$64 fills 4 of the 5 parts. What is one part worth?",
          "One part is 64 ÷ 4 = 16. The original price is 5 parts.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q11",
        question: "A pair of headphones costs $40 before GST. GST of 9% is added. What is the price including GST?",
        options: ["$49", "$43.60", "$3.60", "$36.40"],
        answerIndex: 1,
        explanation:
          "GST is 9% of $40 = $3.60, so the total is 40 + 3.60 = $43.60 (or in one step, 40 × 1.09). $49 adds $9 instead of 9%, $3.60 is only the GST itself, and $36.40 takes the GST off instead of adding it on.",
        difficulty: "core",
        guideRef: "money-percentages",
        hints: [
          "Find 10% and 1% of $40 first.",
          "9% = 10% − 1% = $4.00 − $0.40.",
          "Add the GST to the price — or multiply by 1.09.",
        ],
        strategy: "Build from 10%",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q12",
        question: "Which list is in order from smallest to largest?",
        options: [
          "{{2/3}}, {{5/8}}, 64%, 0.65",
          "0.65, {{5/8}}, 64%, {{2/3}}",
          "{{5/8}}, 0.65, {{2/3}}, 64%",
          "{{5/8}}, 64%, 0.65, {{2/3}}",
        ],
        answerIndex: 3,
        explanation:
          "Change everything to percentages: {{5/8}} = 62.5%, then 64%, then 0.65 = 65%, then {{2/3}} ≈ 66.7%. Putting 64% last treats it as the number 64 instead of 0.64. Starting with 0.65 treats it as 6.5% instead of 65%. Starting with {{2/3}} reads its digits as if it were 23%.",
        difficulty: "core",
        guideRef: "fdp-conversions",
        hints: [
          "Put all four numbers into the same form — percentages work well.",
          "{{5/8}} = 5 ÷ 8 and {{2/3}} = 2 ÷ 3. Turn each into a decimal, then × 100.",
          "{{5/8}} = 62.5% and {{2/3}} ≈ 66.7%.",
        ],
        strategy: "Convert to one form",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q13",
        question: "Which is the best estimate of 19% of $402?",
        options: ["about $80", "about $8", "about $40", "about $320"],
        answerIndex: 0,
        explanation:
          "Round to 20% of $400: 10% is $40, so 20% is about $80 (the exact answer is $76.38). About $40 is only 10%, about $8 is a place-value slip (that would be 2%), and about $320 is the 80% that is left over.",
        difficulty: "core",
        guideRef: "percentage-of-amount",
        hints: [
          "Round both numbers so the mental maths is easy.",
          "19% ≈ 20% and $402 ≈ $400.",
          "10% of 400 is 40. What is 20%?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q14",
        question:
          "Marcus scores 17 out of 20 in a Maths test and 43 out of 50 in a Science test. Which statement is true?",
        options: [
          "Maths was better: he dropped only 3 marks, but dropped 7 in Science.",
          "Maths was better: 85% against 43%.",
          "Science was better: 86% against 85%.",
          "You can't compare them, because the tests have different totals.",
        ],
        answerIndex: 2,
        explanation:
          "Turn both into percentages: {{17/20}} = {{85/100}} = 85% and {{43/50}} = {{86/100}} = 86%, so Science was (just) better. Counting dropped marks ignores that the Science test was much longer. '43%' treats a mark out of 50 as if it were out of 100. And percentages exist precisely so that tests with different totals *can* be compared.",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "The totals are different — how can you put both scores on the same scale?",
          "Turn each score into a percentage (out of 100).",
          "{{17/20}}: multiply top and bottom by 5. {{43/50}}: multiply by 2.",
        ],
        strategy: "Compare on the same scale",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q15",
        question:
          "A bus fare falls from $1.60 to $1.20. Ravi says the percentage decrease is {{33 1/3}}%. What was his mistake?",
        options: [
          "None — 40 cents out of $1.20 is {{33 1/3}}%, so he is right.",
          "He should use the change in cents: the decrease is 40%.",
          "He should divide $1.20 by $1.60: the decrease is 75%.",
          "He divided by the new fare instead of the original: the decrease is 25%.",
        ],
        answerIndex: 3,
        explanation:
          "Percentage change always compares with the *original* value: {{40/160}} = {{1/4}} = 25%. Ravi divided the 40 cents by $1.20, the new fare, which is why he got {{33 1/3}}%. 75% is the new fare as a percentage of the old one — what is *left*, not the decrease — and 40% mixes up 40 cents with 40%.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "Which value should the change be compared with — the old fare or the new one?",
          "The change is 40 cents. The original fare is $1.60 = 160 cents.",
          "Work out {{40/160}} as a percentage.",
        ],
        strategy: "Compare with the original",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q16",
        question:
          "Ravi increases $250 by 12% by typing 250 × 1.12 into his calculator. Why does this single multiplication give the right answer?",
        options: [
          "Because 1.12 is 12% written as a decimal.",
          "Because 250 × 1.12 = 250 × 1 + 250 × 0.12, which is the original amount plus 12% of it.",
          "It doesn't: 250 × 1.12 finds only the increase, which he still needs to add on.",
          "It only works because $250 is a round number.",
        ],
        answerIndex: 1,
        explanation:
          "Split the multiplier: 1.12 = 1 + 0.12, so 250 × 1.12 = 250 × 1 + 250 × 0.12 = 250 + 30 = $280 — the original amount plus the 12% increase, in one step. This is just the distributive law, so it works for any amount, not only round ones. 1.12 is 112%, not 12% (12% is 0.12), and the calculation that finds only the increase is 250 × 0.12 = $30.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "Can you write 1.12 as 1 + something?",
          "Split it: 250 × 1.12 = 250 × 1 + 250 × 0.12.",
          "What does 250 × 1 stand for? What does 250 × 0.12 stand for?",
        ],
        strategy: "Split the multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q17",
        question:
          "A TV costs $630 after 10% is taken off. Jun tries to find the original price by adding 10% of $630 back on, and gets $693. By how much is Jun's answer wrong?",
        options: ["$7", "$0 — Jun is right", "$63", "$70"],
        answerIndex: 0,
        explanation:
          "$630 is 90% of the original, so the original is 630 ÷ 0.9 = $700. Jun's $693 is $7 too low: the 10% was taken off $700 (that's $70), but he added back 10% of the smaller $630 (only $63). '$0' assumes that taking 10% off and adding 10% on cancel out — they don't, because they are percentages of different amounts. $63 and $70 are the two 10% amounts, not the error.",
        difficulty: "challenge",
        guideRef: "reverse-percentages",
        hints: [
          "Is $630 the 100% or the 90%?",
          "Find the true original price: $630 is 90% of it.",
          "Original = 630 ÷ 0.9. Now compare it with $693.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q18",
        question:
          "A fruit-stall owner buys mangoes at 3 for $2 and sells them at 2 for $3. What is her percentage profit?",
        options: ["50%", "225%", "about 56%", "125%"],
        answerIndex: 3,
        explanation:
          "Compare the same number of mangoes. 6 mangoes (enough for whole lots of 3 and of 2) cost 2 × $2 = $4 and sell for 3 × $3 = $9, so the profit is $5. Percentage profit compares the profit with the *cost*: {{5/4}} = 1.25 = 125%. (Check per mango: she pays about 67 cents and gets $1.50.) 50% compares $2 with $3, but those prices are for different numbers of mangoes; 225% is the takings as a percentage of the cost ($9 ÷ $4), when the profit is only the part above 100%; and about 56% divides the profit by the takings ($9) instead of the cost.",
        difficulty: "challenge",
        guideRef: "money-percentages",
        hints: [
          "The two prices are for different numbers of mangoes. How can you compare like with like?",
          "Imagine she buys and sells 6 mangoes. What do they cost, and what does she get for them?",
          "6 mangoes cost $4 and sell for $9. Percentage profit = profit ÷ cost × 100.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q19",
        question:
          "Always, sometimes or never true? *x% of y is equal to y% of x* (for any positive numbers x and y).",
        options: [
          "Sometimes — only when x = y",
          "Never — the percentage and the amount do different jobs",
          "Always",
          "Sometimes — only when x and y are both less than 100",
        ],
        answerIndex: 2,
        explanation:
          "Always: x% of y = {{x/100}} × y and y% of x = {{y/100}} × x, and both equal {{(xy)/100}}. For example, 8% of 25 = 2 and 25% of 8 = 2. Thinking it works only when x = y misses that you can multiply in any order. It's a handy trick: 4% of 75 looks hard, but 75% of 4 = 3 is easy.",
        difficulty: "challenge",
        guideRef: "percentage-of-amount",
        hints: [
          "Test a pair: work out 8% of 25 and 25% of 8.",
          "Write x% of y as a multiplication.",
          "x% of y = {{x/100}} × y. Can you change the order of the multiplication?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m1-q20",
        question:
          "In a survey, 40% of students supported a new CCA. A month later, 50% did. Zara says 'support went up by 10%'. Which statement is most accurate?",
        options: [
          "Zara is right: up 10%, which is the same as 10 percentage points.",
          "Support went up by 10 percentage points, which is a 25% increase.",
          "Support went up by 20%, because 10 out of 50 is 20%.",
          "Support went up by 25 percentage points.",
        ],
        answerIndex: 1,
        explanation:
          "The rate rose from 40% to 50%: that is 10 **percentage points**. As a percentage change it is {{10/40}} = 25%, because 10 is a quarter of the original 40. Saying '10%' mixes up the two ideas, 20% divides by the new value of 50, and '25 percentage points' attaches the relative change to the wrong unit.",
        difficulty: "challenge",
        guideRef: "percentage-change",
        hints: [
          "Find the difference between 40% and 50%. What unit is that difference in?",
          "Now find the percentage change: change ÷ original × 100.",
          "{{10/40}} = ?",
        ],
        strategy: "Compare with the original",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 2
  // =========================================================================
  {
    id: "percentages-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "percentages-m2-q01",
        question: "The rectangle is made of equal squares. What percentage of the rectangle is shaded?",
        diagram: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle made of 20 equal squares in 4 rows of 5. The whole top row and the first 2 squares of the second row are shaded, 7 squares in all."><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><rect x="60" y="20" width="200" height="40" fill="#fde68a"/><rect x="60" y="60" width="80" height="40" fill="#fde68a"/><rect x="60" y="20" width="200" height="160" fill="none" stroke="#334155" stroke-width="2"/><line x1="100" y1="20" x2="100" y2="180" stroke="#334155"/><line x1="140" y1="20" x2="140" y2="180" stroke="#334155"/><line x1="180" y1="20" x2="180" y2="180" stroke="#334155"/><line x1="220" y1="20" x2="220" y2="180" stroke="#334155"/><line x1="60" y1="60" x2="260" y2="60" stroke="#334155"/><line x1="60" y1="100" x2="260" y2="100" stroke="#334155"/><line x1="60" y1="140" x2="260" y2="140" stroke="#334155"/></svg>`,
        options: ["7%", "35%", "65%", "13%"],
        answerIndex: 1,
        explanation:
          "7 of the 20 equal squares are shaded: {{7/20}} = {{35/100}} = 35%. 7% counts squares as if there were 100 of them, 65% is the *unshaded* part, and 13% is the number of unshaded squares.",
        difficulty: "warmup",
        guideRef: "fdp-conversions",
        hints: ["Count all the squares. Write the shaded part as a fraction, then make it out of 100."],
        strategy: "Make the denominator 100",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q02",
        question: "Find 25% of 64.",
        options: ["48", "39", "256", "16"],
        answerIndex: 3,
        explanation:
          "25% is {{1/4}}, so divide by 4: 64 ÷ 4 = 16. 48 is the 75% that is left, 39 subtracts 25 from 64, and 256 multiplies by 4 instead of dividing.",
        difficulty: "warmup",
        guideRef: "percentage-of-amount",
        hints: ["25% is the same as which simple fraction?"],
        strategy: "Use a fraction equivalent",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q03",
        question: "Multiplying an amount by 1.4 increases it by…",
        options: ["40%", "4%", "140%", "14%"],
        answerIndex: 0,
        explanation:
          "× 1.4 gives 140% of the amount: the original 100% plus 40% more. 140% is the new total, not the increase; 4% would be × 1.04; and 14% would be × 1.14.",
        difficulty: "warmup",
        guideRef: "multipliers",
        hints: ["1.4 = 140%. How much more than 100% is that?"],
        strategy: "Read the multiplier as a percentage",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q04",
        question: "In a class of 25 students, 8 walk to school. What percentage of the class walk?",
        options: ["8%", "17%", "32%", "68%"],
        answerIndex: 2,
        explanation:
          "Multiply top and bottom by 4: {{8/25}} = {{32/100}} = 32%. 8% treats the count as a percentage, 17% is the number of students who *don't* walk, and 68% is the percentage who don't walk.",
        difficulty: "warmup",
        guideRef: "one-as-percentage-of-another",
        hints: ["Write 8 out of 25 as a fraction, then scale the denominator up to 100."],
        strategy: "Make the denominator 100",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q05",
        question: "A $60 bag is sold with 30% off. How much do you save?",
        options: ["$42", "$30", "$18", "$2"],
        answerIndex: 2,
        explanation:
          "You save 30% of $60: 10% is $6, so 30% is $18. $42 is the sale price you *pay*, not the saving; $30 confuses 30% with $30; and $2 comes from 60 ÷ 30.",
        difficulty: "warmup",
        guideRef: "money-percentages",
        hints: ["Find 10% of $60 first."],
        strategy: "Build from 10%",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q06",
        question: "Write {{3/8}} as a percentage.",
        options: ["37.5%", "38%", "0.375%", "3.75%"],
        answerIndex: 0,
        explanation:
          "3 ÷ 8 = 0.375, and 0.375 × 100 = 37.5%. (Or: {{1/8}} = 12.5%, so {{3/8}} = 3 × 12.5% = 37.5%.) 38% just reads the digits 3 and 8, 0.375% forgets to multiply by 100, and 3.75% multiplies by 10 instead of 100.",
        difficulty: "core",
        guideRef: "fdp-conversions",
        hints: [
          "Turn the fraction into a decimal first.",
          "Use the fact {{1/8}} = 0.125 = 12.5%.",
          "{{3/8}} is three lots of {{1/8}}.",
        ],
        strategy: "Use a known fact",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q07",
        question: "Work out 17.5% of $240 without a calculator.",
        options: ["$36", "$198", "$4.20", "$42"],
        answerIndex: 3,
        explanation:
          "Build it up: 10% = $24, 5% = $12 and 2.5% = $6, so 17.5% = 24 + 12 + 6 = $42. $36 stops at 15% and forgets the 2.5%, $198 is the 82.5% that is left, and $4.20 is a place-value slip.",
        difficulty: "core",
        guideRef: "percentage-of-amount",
        hints: [
          "Split 17.5% into pieces you can find by halving.",
          "17.5% = 10% + 5% + 2.5%.",
          "Each piece is half of the one before: 24, 12, 6.",
        ],
        strategy: "Build from 10%",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q08",
        question: "An HDB flat valued at $480 000 increases in value by 5%. What is its new value?",
        options: ["$24 000", "$504 000", "$456 000", "$720 000"],
        answerIndex: 1,
        explanation:
          "Multiply by 1.05: 480 000 × 1.05 = $504 000 (5% is $24 000, added on). $24 000 is only the increase, $456 000 is a 5% *decrease*, and $720 000 uses × 1.5, which is a 50% increase.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "What is the multiplier for a 5% increase?",
          "100% + 5% = 105% = 1.05.",
          "Or find 5% (half of 10%) and add it on.",
        ],
        strategy: "Use a single multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q09",
        question:
          "Two hawker stalls raise their prices.\n\n| Dish | Old price | New price |\n|---|---|---|\n| Vegetable bee hoon | $4.00 | $4.50 |\n| Kaya toast set | $2.00 | $2.40 |\n\nWhich statement is true?",
        options: [
          "The bee hoon had the bigger rise, both in dollars and as a percentage.",
          "The bee hoon had the bigger rise in dollars, but the kaya toast had the bigger percentage rise.",
          "The bee hoon rose by 50% and the kaya toast by 40%.",
          "The kaya toast had the bigger rise, both in dollars and as a percentage.",
        ],
        answerIndex: 1,
        explanation:
          "Bee hoon: up $0.50, and {{0.50/4.00}} = 12.5%. Kaya toast: up only $0.40, but {{0.40/2.00}} = 20%. A smaller rise on a cheaper item can be a bigger *percentage* rise. 'The bee hoon rose by 50%' turns 50 cents into 50%, and judging the percentage by the dollar rise alone ignores the starting prices.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "Find each change in dollars first.",
          "Now divide each change by its own ORIGINAL price.",
          "Compare {{0.50/4}} with {{0.40/2}}.",
        ],
        strategy: "Compare absolute and relative change",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q10",
        question:
          "After a 25% increase, a school's robotics CCA has 150 members. How many members did it have before the increase?",
        options: ["120", "112.5", "125", "187.5"],
        answerIndex: 0,
        explanation:
          "150 is 125% of the old number, so divide by 1.25: 150 ÷ 1.25 = 120. Check: 25% of 120 is 30, and 120 + 30 = 150. 112.5 takes 25% off 150 — but the 25% was of the *old* number, not of 150 (and you can't have half a member!). 125 subtracts 25 members instead of 25%, and 187.5 increases again.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "Is 150 the 100% or the 125%?",
          "Old number × 1.25 = 150. How do you undo a multiplication?",
          "150 ÷ 1.25 — or: 125% = 150, so 25% = 30.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q11",
        question:
          "Priya puts $800 into a savings account that pays 3% simple interest per year. How much interest does she earn in 4 years?",
        options: ["$24", "$896", "$96", "$100.41"],
        answerIndex: 2,
        explanation:
          "Simple interest is the same every year: 3% of $800 = $24 per year, so 4 years give 4 × 24 = $96. $24 is just one year, $896 is the total in the account (the question asks only for the interest), and $100.41 is what *compound* interest would give.",
        difficulty: "core",
        guideRef: "money-percentages",
        hints: [
          "With simple interest, is the interest the same every year?",
          "Find 3% of $800 first.",
          "Multiply one year's interest by 4.",
        ],
        strategy: "Find one year first",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q12",
        question:
          "The pie chart shows the favourite CCAs of a group of students. The Robotics sector has an angle of 72°. What percentage of the students chose Robotics?",
        diagram: `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pie chart with four sectors: Robotics with an angle of 72 degrees, Choir, Football and Drama."><rect x="0" y="0" width="340" height="220" fill="#ffffff"/><path d="M150,110 L150,30 A80,80 0 0,1 226.08,85.28 Z" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M150,110 L226.08,85.28 A80,80 0 0,1 150,190 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><path d="M150,110 L150,190 A80,80 0 0,1 70,110 Z" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><path d="M150,110 L70,110 A80,80 0 0,1 150,30 Z" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><text x="172" y="82" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">72°</text><line x1="197" y1="45" x2="228" y2="28" stroke="#334155"/><text x="232" y="27" font-size="13" font-family="sans-serif" fill="#1f2937">Robotics</text><text x="190" y="143" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Choir</text><text x="115" y="150" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Football</text><text x="115" y="80" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Drama</text></svg>`,
        options: ["72%", "7.2%", "28%", "20%"],
        answerIndex: 3,
        explanation:
          "The whole circle is 360°, so Robotics is {{72/360}} = {{1/5}} = 20% of the students. 72% reads the angle as if it were a percentage, 7.2% is a place-value guess, and 28% is 100 − 72.",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "What does the whole circle stand for, in degrees?",
          "Write the Robotics angle as a fraction of 360°.",
          "Simplify {{72/360}} — 72 goes into 360 exactly.",
        ],
        strategy: "Part over whole",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q13",
        question: "The population of a town falls from 25 000 to 22 000. What is the percentage decrease?",
        options: ["about 13.6%", "88%", "12%", "3%"],
        answerIndex: 2,
        explanation:
          "The decrease is 3000, and {{3000/25000}} = {{12/100}} = 12%. About 13.6% divides by the new population (22 000) instead of the original, 88% is the population that is *left*, as a percentage, and 3% treats 3 thousand as 3%.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "Find the actual decrease first.",
          "Divide the decrease by the ORIGINAL population.",
          "In {{3000/25000}}, cancel the zeros first.",
        ],
        strategy: "Compare with the original",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q14",
        question: "Which of these is NOT equal to 20% of 150?",
        options: ["40% of 300", "10% of 300", "40% of 75", "150% of 20"],
        answerIndex: 0,
        explanation:
          "20% of 150 = 30. Halving one number and doubling the other keeps the answer the same: 10% of 300 = 30 and 40% of 75 = 30. Swapping them works too: 150% of 20 = 30. But 40% of 300 doubles *both* numbers, so it is 4 times as big: 120.",
        difficulty: "core",
        guideRef: "percentage-of-amount",
        hints: [
          "Work out 20% of 150 first.",
          "What happens to the answer if you double one number and halve the other?",
          "In 40% of 300, both the percentage and the amount have been doubled.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q15",
        question: "Ethan wants to increase $70 by 8%. He types 70 × 1.8 into his calculator. Which statement is correct?",
        options: [
          "He is right: 1.8 means 100% + 8%.",
          "1.8 gives an 80% increase; he should type 70 × 1.08.",
          "He should type 70 × 0.08, because 8% = 0.08.",
          "He should type 70 × 0.92.",
        ],
        answerIndex: 1,
        explanation:
          "8% = 0.08, so the multiplier is 1 + 0.08 = 1.08, giving 70 × 1.08 = $75.60. Ethan's 1.8 is 180%, an 80% increase. 70 × 0.08 finds only the increase ($5.60), and 70 × 0.92 is an 8% *decrease*.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "Write 8% as a decimal carefully.",
          "8% = 0.08, not 0.8.",
          "The multiplier is 1 + 0.08.",
        ],
        strategy: "Check the multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q16",
        question: "A laptop costs $1199 including 9% GST. What was its price before GST?",
        options: ["$1091.09", "$1190", "$1306.91", "$1100"],
        answerIndex: 3,
        explanation:
          "$1199 is 109% of the price before GST, so divide by 1.09: 1199 ÷ 1.09 = $1100. Check: 9% of $1100 is $99, and 1100 + 99 = 1199. $1091.09 takes 9% of $1199 off — but the GST was 9% of the *smaller* price. $1190 subtracts $9, and $1306.91 adds the GST a second time.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "Is $1199 the 100% or the 109%?",
          "Price before GST × 1.09 = 1199.",
          "Divide 1199 by 1.09.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q17",
        question:
          "A durian stall raises all its prices by 10% in June, then lowers them by 10% in July. Compared with May, the July prices are…",
        options: ["the same", "1% lower", "1% higher", "10% lower"],
        answerIndex: 1,
        explanation:
          "Use multipliers: × 1.1 then × 0.9 is × 0.99 overall, which is 1% lower. On a $10 durian: $10 → $11 → $9.90. The changes don't cancel because the 10% cut is taken from the *bigger*, raised price. 'The same' assumes +10% and −10% cancel, and '10% lower' ignores the rise altogether.",
        difficulty: "challenge",
        guideRef: "repeated-change",
        hints: [
          "Try it with a price of $100.",
          "Write each change as a multiplier.",
          "1.1 × 0.9 = ?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q18",
        question:
          "Always, sometimes or never true? *If A is 20% more than B, then B is 20% less than A.* (A and B are positive numbers.)",
        options: [
          "Always",
          "Sometimes — when A and B are whole numbers",
          "Sometimes — when A is more than 100",
          "Never",
        ],
        answerIndex: 3,
        explanation:
          "Try B = 100: then A = 120. B is 20 less than A, but 20 out of 120 is only {{16 2/3}}%. In general A = 1.2B, so B = {{5/6}} of A, which is always {{16 2/3}}% less — never 20%. 'Always' forgets that the two percentages are measured from different starting values, and the choice of numbers makes no difference.",
        difficulty: "challenge",
        guideRef: "percentage-change",
        hints: [
          "Test it: let B = 100. What is A?",
          "B is 20 less than A. What percentage of A is 20?",
          "Would a different starting value of B change that percentage?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q19",
        question:
          "Shop X takes 20% off, then a further 10% off the reduced price. Shop Y simply takes 30% off. The original prices are the same. Which statement is true?",
        options: [
          "Shop Y is cheaper: Shop X's two discounts only make 28% off.",
          "They are the same: 20% + 10% = 30%.",
          "Shop X is cheaper: its two discounts make 32% off.",
          "Shop Y is cheaper: Shop X's two discounts make only 2% off.",
        ],
        answerIndex: 0,
        explanation:
          "Shop X: × 0.8 then × 0.9 = × 0.72, so you pay 72% — that's 28% off. Shop Y: × 0.7, so you pay 70%. Shop Y is cheaper. '20% + 10% = 30%' ignores that the second discount is taken from an already-reduced price, and '2% off' multiplies 20% by 10% instead of multiplying the multipliers.",
        difficulty: "challenge",
        guideRef: "money-percentages",
        hints: [
          "Try an item that costs $100 in both shops.",
          "Shop X: 20% off $100, then 10% off what's left.",
          "$100 → $80 → $72. Compare that with $70.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m2-q20",
        question:
          "A price is increased by 20%, and then the new price is decreased by 20%. It is now $96. What was the original price?",
        options: ["$96", "$92.16", "$100", "$99.84"],
        answerIndex: 2,
        explanation:
          "Overall multiplier: 1.2 × 0.8 = 0.96, so original × 0.96 = 96 and original = 96 ÷ 0.96 = $100. Check: $100 → $120 → $96. $96 assumes the changes cancel, $92.16 applies the changes forwards to $96 instead of undoing them, and $99.84 adds 4% of $96 — but the 4% drop was 4% of the original, not of $96.",
        difficulty: "challenge",
        guideRef: "repeated-change",
        hints: [
          "Combine the two changes into one multiplier.",
          "1.2 × 0.8 = 0.96, so original × 0.96 = 96.",
          "Undo the multiplication by dividing.",
        ],
        strategy: "Work backwards",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 3
  // =========================================================================
  {
    id: "percentages-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "percentages-m3-q01",
        question: "Write 7% as a decimal.",
        options: ["0.7", "7.0", "0.007", "0.07"],
        answerIndex: 3,
        explanation:
          "7% = {{7/100}} = 0.07. 0.7 is 70%, 7.0 is 700%, and 0.007 is 0.7% — the digits moved one place too far.",
        difficulty: "warmup",
        guideRef: "fdp-conversions",
        hints: ["7% means 7 out of 100. Divide 7 by 100."],
        strategy: "Think 'out of 100'",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q02",
        question: "Find 1% of 3500.",
        options: ["350", "35", "3.5", "3499"],
        answerIndex: 1,
        explanation:
          "1% is {{1/100}}, so divide by 100: 3500 ÷ 100 = 35. 350 is 10%, 3.5 is 0.1%, and 3499 subtracts 1 instead of finding 1%.",
        difficulty: "warmup",
        guideRef: "percentage-of-amount",
        hints: ["1% means one hundredth. What do you divide by?"],
        strategy: "Build from 1%",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q03",
        question: "A seedling grows from 20 cm to 23 cm tall. What is the percentage increase in its height?",
        options: ["3%", "about 13%", "15%", "115%"],
        answerIndex: 2,
        explanation:
          "It grew 3 cm, and {{3/20}} = {{15/100}} = 15%. 3% treats 3 cm as 3%, about 13% divides by the new height (23 cm), and 115% is the new height as a percentage of the old — the *increase* is only the extra 15%.",
        difficulty: "warmup",
        guideRef: "percentage-change",
        hints: ["Find the increase, then compare it with the original height of 20 cm."],
        strategy: "Compare with the original",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q04",
        question: "Hana saves $500 in an account paying 2% simple interest per year. How much interest does she earn in one year?",
        options: ["$10", "$510", "$100", "$250"],
        answerIndex: 0,
        explanation:
          "1% of $500 is $5, so 2% is $10. $510 is the total in the account, not the interest; $100 uses 20% instead of 2%; and $250 halves the money instead of finding 2%.",
        difficulty: "warmup",
        guideRef: "money-percentages",
        hints: ["Find 1% of $500 first, then double it."],
        strategy: "Build from 1%",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q05",
        question: "Multiplying a price by 0.75 has the same effect as…",
        options: ["a 75% discount", "a 25% discount", "a 25% increase", "a 7.5% discount"],
        answerIndex: 1,
        explanation:
          "× 0.75 leaves 75% of the price, so 25% has been taken off. 'A 75% discount' mixes up what is *left* with what is taken off, a 25% increase would be × 1.25, and a 7.5% discount would be × 0.925.",
        difficulty: "warmup",
        guideRef: "multipliers",
        hints: ["0.75 = 75%. If you pay 75% of the price, how much was taken off?"],
        strategy: "Read the multiplier as a percentage",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q06",
        question:
          "A company's profit this year is 2.5 times last year's profit. As a percentage of last year's profit, this year's profit is…",
        options: ["25%", "2.5%", "250%", "150%"],
        answerIndex: 2,
        explanation:
          "1 times = 100%, so 2.5 times = 2.5 × 100% = 250%. Percentages over 100% simply mean 'more than the whole'. 150% is the *increase* (250% − 100%), not this year's profit as a percentage of last year's; 25% and 2.5% move the digits the wrong number of places.",
        difficulty: "core",
        guideRef: "fdp-conversions",
        hints: [
          "What is 1 times last year's profit, as a percentage?",
          "1 = 100%. So what is 2.5?",
        ],
        strategy: "Think 'out of 100'",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q07",
        question: "Which calculator calculation finds 4.5% of 820?",
        options: ["820 × 0.045", "820 × 0.45", "820 × 4.5", "820 ÷ 4.5"],
        answerIndex: 0,
        explanation:
          "4.5% = 4.5 ÷ 100 = 0.045, so the calculation is 820 × 0.045 (= 36.9). 820 × 0.45 finds 45%, 820 × 4.5 finds 450%, and 820 ÷ 4.5 isn't a percentage calculation at all.",
        difficulty: "core",
        guideRef: "percentage-of-amount",
        hints: [
          "Change 4.5% into a decimal multiplier.",
          "Divide 4.5 by 100.",
        ],
        strategy: "Use a decimal multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q08",
        question:
          "The table shows how many students in four classes passed a test.\n\n| Class | Passed | Class size |\n|---|---|---|\n| 8A | 24 | 32 |\n| 8B | 22 | 28 |\n| 8C | 18 | 24 |\n| 8D | 20 | 26 |\n\nWhich class had the highest percentage of students passing?",
        options: ["8A", "8C", "8D", "8B"],
        answerIndex: 3,
        explanation:
          "Work out each pass rate: 8A {{24/32}} = 75%, 8B {{22/28}} ≈ 78.6%, 8C {{18/24}} = 75%, 8D {{20/26}} ≈ 76.9%. So 8B is highest. 8A had the most students passing, but it is also the biggest class — compare percentages, not counts. 8D is second, so it is easy to pick if you estimate too roughly.",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "Bigger classes will tend to have more passes, so counts alone won't do.",
          "Work out Passed ÷ Class size for each class.",
          "Two of the classes are exactly 75%. Compare the other two carefully.",
        ],
        strategy: "Compare on the same scale",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q09",
        question: "A school uses 12 500 litres of water a week. It cuts its usage by 8%. What is the new weekly usage?",
        options: ["12 492 litres", "1000 litres", "13 500 litres", "11 500 litres"],
        answerIndex: 3,
        explanation:
          "Multiply by 0.92 (100% − 8%): 12 500 × 0.92 = 11 500 litres. Or: 8% of 12 500 is 1000, and 12 500 − 1000 = 11 500. 12 492 subtracts 8 litres instead of 8%, 1000 litres is only the amount saved, and 13 500 adds the 8% instead of taking it off.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "What percentage of the water is still used?",
          "100% − 8% = 92%, so multiply by 0.92.",
          "Or find 1% (125 litres), multiply by 8 and subtract.",
        ],
        strategy: "Use a single multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q10",
        question: "Which price rise is the biggest *percentage* increase?",
        options: ["$100 → $135", "$2 → $3", "$10 → $14", "$50 → $60"],
        answerIndex: 1,
        explanation:
          "Divide each rise by its original price: $2 → $3 is {{1/2}} = 50%; $10 → $14 is 40%; $100 → $135 is 35%; $50 → $60 is 20%. $100 → $135 has the biggest rise in dollars ($35), but that rise is spread over a much bigger starting price.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "Biggest in dollars is not the same as biggest in percentage.",
          "For each one, work out rise ÷ original price.",
          "Compare {{1/2}}, {{4/10}}, {{35/100}} and {{10/50}}.",
        ],
        strategy: "Compare absolute and relative change",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q11",
        question:
          "On an MRT train carriage, 36% of the seats are empty. There are 18 empty seats. How many seats does the carriage have altogether?",
        options: ["50", "6.48", "32", "54"],
        answerIndex: 0,
        explanation:
          "18 seats are 36% of the total. So 1% is 18 ÷ 36 = 0.5 seats, and 100% is 50 seats. Check: 36% of 50 = 18. 6.48 finds 36% *of 18* (and isn't even a whole number of seats), 32 is the number of seats that are taken, and 54 just adds 18 and 36.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "Is 18 the 100% or the 36%?",
          "If 36% is 18 seats, what is 1%?",
          "1% = 18 ÷ 36 = 0.5. Now find 100%.",
        ],
        strategy: "Find 1% first",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q12",
        question: "Jun buys a second-hand bike for $250 and later sells it for $200. What is his percentage loss?",
        options: ["25%", "50%", "20%", "80%"],
        answerIndex: 2,
        explanation:
          "He loses $50. Percentage loss compares the loss with what he *paid*: {{50/250}} = {{20/100}} = 20%. 25% divides by the selling price instead, 50% treats the $50 loss as 50%, and 80% is the selling price as a percentage of the cost.",
        difficulty: "core",
        guideRef: "money-percentages",
        hints: [
          "Find the loss in dollars.",
          "Percentage loss = loss ÷ cost price × 100.",
          "Simplify {{50/250}}.",
        ],
        strategy: "Compare with the original",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q13",
        question: "Priya knows that 1% of 360 is 3.6. What is 23% of 360?",
        options: ["75.6", "82.8", "277.2", "8.28"],
        answerIndex: 1,
        explanation:
          "23% = 20% + 3%. 20% = 72 and 3% = 3 × 3.6 = 10.8, so 23% = 72 + 10.8 = 82.8 (or simply 23 × 3.6 = 82.8). 75.6 adds only *one* lot of 1% instead of three, 277.2 is the 77% that is left, and 8.28 is a place-value slip.",
        difficulty: "core",
        guideRef: "percentage-of-amount",
        hints: [
          "Split 23% into 20% and 3%.",
          "20% is 2 × 10% = 2 × 36.",
          "3% = 3 × 3.6. Add the two parts.",
        ],
        strategy: "Build from 1% and 10%",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q14",
        question:
          "A bag of 80 sweets has 28 red sweets and 20 green sweets. The rest are yellow. What percentage of the sweets are yellow?",
        options: ["32%", "60%", "48%", "40%"],
        answerIndex: 3,
        explanation:
          "Yellow = 80 − 28 − 20 = 32 sweets, and {{32/80}} = {{4/10}} = 40%. 32% treats the count as a percentage (there are 80 sweets, not 100), 60% is the percentage that are red or green, and 48% is the *number* of red and green sweets.",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "How many yellow sweets are there?",
          "Write the number of yellow sweets over the total.",
          "{{32/80}} simplifies nicely — divide top and bottom by 8.",
        ],
        strategy: "Part over whole",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q15",
        question: "After growing by 40%, a sunflower is 42 cm tall. How tall was it before?",
        options: ["30 cm", "25.2 cm", "58.8 cm", "2 cm"],
        answerIndex: 0,
        explanation:
          "42 cm is 140% of the old height, so divide by 1.4: 42 ÷ 1.4 = 30 cm. Check: 40% of 30 is 12, and 30 + 12 = 42. 25.2 cm takes 40% off 42 — but the 40% was of the *old* height. 58.8 cm grows it again, and 2 cm subtracts 40 cm instead of 40%.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "Is 42 cm the 100% or the 140%?",
          "Old height × 1.4 = 42.",
          "Divide 42 by 1.4 — or: 140% = 42, so 10% = 3.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q16",
        question: "A price of $x is decreased by 35%. Which expression gives the new price, in dollars?",
        options: ["{{0.35x}}", "{{x - 35}}", "{{0.65x}}", "{{1.35x}}"],
        answerIndex: 2,
        explanation:
          "After a 35% decrease, 65% of the price is left, so the new price is {{0.65x}}. {{0.35x}} is only the amount taken off, {{x - 35}} subtracts $35 instead of 35%, and {{1.35x}} is a 35% *increase*.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "What percentage of the price is left after the decrease?",
          "100% − 35% = 65%.",
          "Write 65% as a decimal and multiply it by x.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q17",
        question:
          "Mei has $5000 to save for 3 years. Account P pays 4% simple interest per year. Account Q pays 4% compound interest per year. Which statement is true?",
        options: [
          "Both give $600 of interest.",
          "P gives more, by $24.32.",
          "Q gives more, by $624.32.",
          "Q gives more, by $24.32.",
        ],
        answerIndex: 3,
        explanation:
          "P earns 4% of $5000 = $200 every year: $600 in total. Q earns interest on its interest: $5000 → $5200 → $5408 → $5624.32 (that's {{5000 × 1.04^3}}), so $624.32 of interest. Q gives $24.32 more. '$600 each' treats compound interest like simple interest, $624.32 is Q's whole interest rather than the difference, and P can never beat Q at the same rate, because Q's balance keeps growing.",
        difficulty: "challenge",
        guideRef: "repeated-change",
        hints: [
          "Simple interest: the same amount every year. Compound interest: each year's interest is added on and then earns interest too.",
          "P: 3 × (4% of 5000). Q: 5000 × 1.04 × 1.04 × 1.04.",
          "Q year by year: 5200, then 5408, then 5624.32.",
        ],
        strategy: "Compare two methods",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q18",
        question:
          "Always, sometimes or never true? *A fraction with denominator 40 (and a whole-number numerator) is equal to a whole-number percentage.*",
        options: [
          "Always",
          "Sometimes — exactly when the numerator is even",
          "Sometimes — exactly when the numerator is a multiple of 4",
          "Never",
        ],
        answerIndex: 1,
        explanation:
          "Each {{1/40}} is 2.5%, so a fraction with numerator n is (2.5 × n)%. That is a whole number exactly when n is even: {{2/40}} = 5% but {{1/40}} = 2.5%. 'A multiple of 4' is too strict — {{2/40}} = 5% and {{6/40}} = 15% work too. 'Always' is broken by {{1/40}}, and 'never' by {{2/40}}.",
        difficulty: "challenge",
        guideRef: "fdp-conversions",
        hints: [
          "Try a few: {{1/40}}, {{2/40}}, {{3/40}}, {{4/40}}.",
          "What percentage is {{1/40}}?",
          "{{1/40}} = 2.5%. When is a multiple of 2.5 a whole number?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q19",
        question:
          "A price goes up by 25%. By what percentage must the new price go down to get back to the original price?",
        options: ["20%", "25%", "75%", "80%"],
        answerIndex: 0,
        explanation:
          "Going up 25% is × 1.25 = × {{5/4}}. To undo it, multiply by {{4/5}} = 0.8, which is a 20% decrease. On $100: up to $125, and 20% of $125 is $25, so back to $100. 25% is the trap: 25% of $125 is $31.25, which is too much. 80% is the multiplier you need (what's *left*), not the decrease, and 75% comes from 100 − 25.",
        difficulty: "challenge",
        guideRef: "multipliers",
        hints: [
          "Try a starting price of $100.",
          "After the rise it is $125. You need to take $25 off $125.",
          "What percentage of 125 is 25?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m3-q20",
        question:
          "Siti invests $2000 at a simple interest rate of r% per year. After 3 years she has $2240 in total. What is r?",
        options: ["12", "112", "4", "about 3.6"],
        answerIndex: 2,
        explanation:
          "Interest = 2240 − 2000 = $240 over 3 years, so $80 per year. As a percentage of the $2000 invested: {{80/2000}} = 4%, so r = 4. 12 is the interest rate for all 3 years together, not per year; 112 compares the final total with the start; and about 3.6 divides each year's $80 by the final $2240 instead of the amount invested.",
        difficulty: "challenge",
        guideRef: "money-percentages",
        hints: [
          "How much interest did she earn in total?",
          "Simple interest is the same every year. How much per year?",
          "$80 per year — what percentage of $2000 is that?",
        ],
        strategy: "Work backwards",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 4
  // =========================================================================
  {
    id: "percentages-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "percentages-m4-q01",
        question: "Write {{9/20}} as a percentage.",
        options: ["45%", "9%", "4.5%", "29%"],
        answerIndex: 0,
        explanation:
          "Multiply top and bottom by 5: {{9/20}} = {{45/100}} = 45%. 9% reads the numerator as the percentage, 4.5% slips a place, and 29% adds 9 and 20.",
        difficulty: "warmup",
        guideRef: "fdp-conversions",
        hints: ["What do you multiply 20 by to get 100?"],
        strategy: "Make the denominator 100",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q02",
        question: "What percentage of 200 is 50?",
        options: ["50%", "400%", "25%", "0.25%"],
        answerIndex: 2,
        explanation:
          "{{50/200}} = {{1/4}} = 25%. 50% just copies the number, 400% divides the wrong way round (200 ÷ 50), and 0.25% forgets to multiply by 100.",
        difficulty: "warmup",
        guideRef: "one-as-percentage-of-another",
        hints: ["Write 50 as a fraction of 200 and simplify."],
        strategy: "Part over whole",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q03",
        question: "Find 50% of $7.40.",
        options: ["$14.80", "$3.70", "$3.50", "$0.74"],
        answerIndex: 1,
        explanation:
          "50% is a half. Half of $7 is $3.50 and half of 40 cents is 20 cents, so the answer is $3.70. $14.80 doubles instead of halving, $3.50 halves only the dollars, and $0.74 is 10%.",
        difficulty: "warmup",
        guideRef: "percentage-of-amount",
        hints: ["50% means a half. Halve the dollars and the cents."],
        strategy: "Use a fraction equivalent",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q04",
        question: "After a 50% increase, a number is 60. What was the number before?",
        options: ["30", "90", "10", "40"],
        answerIndex: 3,
        explanation:
          "The new number is 150% of the old one. 150% = 60, so 50% = 20 and 100% = 40. Check: 40 + 20 = 60. 30 takes 50% off 60 (but the 50% was of the old number), 90 increases again, and 10 subtracts 50.",
        difficulty: "warmup",
        guideRef: "reverse-percentages",
        hints: ["60 is 150% of the old number, which is three halves. What is one half (50%)?"],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q05",
        question: "The number of members in a chess club doubles. What is the percentage increase?",
        options: ["200%", "100%", "2%", "50%"],
        answerIndex: 1,
        explanation:
          "Doubling adds another 100% on top of the original 100%, so the increase is 100% (for example, 15 → 30 is an increase of 15, which is all of the original 15). 200% is the *new* size as a percentage of the old, and 50% compares the increase with the new size.",
        difficulty: "warmup",
        guideRef: "percentage-change",
        hints: ["Try a number: if the club grows from 10 to 20 members, what is the increase as a percentage of 10?"],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q06",
        question: "15% of a number is 27. What is the number?",
        options: ["4.05", "405", "1.8", "180"],
        answerIndex: 3,
        explanation:
          "If 15% is 27, then 5% is 9 and 100% is 20 × 9 = 180. Check: 10% of 180 is 18 and 5% is 9, which makes 27. 4.05 finds 15% *of 27*, 405 multiplies 27 by 15, and 1.8 divides 27 by 15 but forgets that this only gives 1%.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "27 is 15% of the number. What is 5% of it?",
          "5% = 27 ÷ 3 = 9.",
          "100% is 20 lots of 5%.",
        ],
        strategy: "Find a unit percentage first",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q07",
        question: "Which of these is equal to {{2/3}}?",
        options: ["{{66 2/3}}%", "66%", "{{2/3}}%", "23%"],
        answerIndex: 0,
        explanation:
          "{{1/3}} = {{33 1/3}}%, so {{2/3}} = {{66 2/3}}% (2 ÷ 3 = 0.666…, and × 100 gives 66.666…%). 66% chops off the recurring part, {{2/3}}% is less than 1% because it forgets to multiply by 100, and 23% just reads the digits.",
        difficulty: "core",
        guideRef: "fdp-conversions",
        hints: [
          "Start from {{1/3}} as a percentage.",
          "{{1/3}} = {{33 1/3}}%. Now double it.",
        ],
        strategy: "Use a known fact",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q08",
        question: "Which statement about multipliers is true?",
        options: [
          "× 1.5 is a 5% increase.",
          "× 0.05 is a 5% decrease.",
          "× 0.9 is a 10% decrease.",
          "× 1.01 is a 10% increase.",
        ],
        answerIndex: 2,
        explanation:
          "× 0.9 leaves 90%, so 10% has been taken off. × 1.5 is a 50% increase (a 5% increase is × 1.05), × 0.05 leaves only 5% — a 95% decrease — and × 1.01 is just a 1% increase.",
        difficulty: "core",
        guideRef: "multipliers",
        hints: [
          "Turn each multiplier into a percentage of the original.",
          "0.9 = 90%, 1.5 = 150%, 0.05 = 5%, 1.01 = 101%.",
          "Compare each one with 100%.",
        ],
        strategy: "Read the multiplier as a percentage",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q09",
        question:
          "The bar chart shows how the 40 students in a class travel to school. What percentage of the class travel by MRT?",
        diagram: `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of how 40 students travel to school: Walk 10, Bus 14, MRT 12, Car 4. The vertical axis shows number of students from 0 to 16."><rect x="0" y="0" width="360" height="240" fill="#ffffff"/><text x="195" y="18" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">How 40 students travel to school</text><line x1="50" y1="180" x2="340" y2="180" stroke="#e2e8f0"/><line x1="50" y1="160" x2="340" y2="160" stroke="#cbd5e1"/><line x1="50" y1="140" x2="340" y2="140" stroke="#e2e8f0"/><line x1="50" y1="120" x2="340" y2="120" stroke="#cbd5e1"/><line x1="50" y1="100" x2="340" y2="100" stroke="#e2e8f0"/><line x1="50" y1="80" x2="340" y2="80" stroke="#cbd5e1"/><line x1="50" y1="60" x2="340" y2="60" stroke="#e2e8f0"/><line x1="50" y1="40" x2="340" y2="40" stroke="#cbd5e1"/><rect x="70" y="100" width="44" height="100" fill="#bae6fd" stroke="#334155"/><rect x="140" y="60" width="44" height="140" fill="#bae6fd" stroke="#334155"/><rect x="210" y="80" width="44" height="120" fill="#bae6fd" stroke="#334155"/><rect x="280" y="160" width="44" height="40" fill="#bae6fd" stroke="#334155"/><line x1="50" y1="200" x2="340" y2="200" stroke="#1f2937" stroke-width="1.5"/><line x1="50" y1="200" x2="50" y2="34" stroke="#1f2937" stroke-width="1.5"/><text x="44" y="204" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">0</text><text x="44" y="164" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">4</text><text x="44" y="124" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">8</text><text x="44" y="84" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">12</text><text x="44" y="44" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">16</text><text x="92" y="216" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Walk</text><text x="162" y="216" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Bus</text><text x="232" y="216" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">MRT</text><text x="302" y="216" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Car</text><text x="16" y="120" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 16 120)">Number of students</text></svg>`,
        options: ["12%", "30%", "35%", "about 86%"],
        answerIndex: 1,
        explanation:
          "12 of the 40 students travel by MRT: {{12/40}} = {{3/10}} = 30%. 12% reads the bar height as a percentage, 35% is the Bus bar (14 students), and about 86% compares MRT with Bus (12 ÷ 14) instead of with the whole class.",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "Read the height of the MRT bar carefully.",
          "Write it as a fraction of all 40 students.",
          "Simplify {{12/40}}, then make it out of 100.",
        ],
        strategy: "Part over whole",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q10",
        question: "A $60 pair of trainers is on offer. Which deal is better: $15 off, or 20% off?",
        options: [
          "$15 off — it is the same as 25% off.",
          "20% off — because 20 is more than 15.",
          "They are the same.",
          "20% off — it saves $20.",
        ],
        answerIndex: 0,
        explanation:
          "20% of $60 is only $12, while $15 off is {{15/60}} = 25% off. So $15 off is better. Comparing 20 with 15 compares a percentage with a number of dollars, and '20% off saves $20' would only be true for a $100 item.",
        difficulty: "core",
        guideRef: "money-percentages",
        hints: [
          "Put both deals in the same form — dollars or percent.",
          "Find 20% of $60.",
          "Or find $15 as a percentage of $60.",
        ],
        strategy: "Compare on the same scale",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q11",
        question:
          "A shop buys T-shirts for $8 each and adds a 35% mark-up (a profit of 35% of the cost price). What is the selling price?",
        options: ["$8.35", "$2.80", "about $12.31", "$10.80"],
        answerIndex: 3,
        explanation:
          "35% of $8: 10% = 80 cents, so 30% = $2.40, and 5% = 40 cents, making $2.80. Selling price = 8 + 2.80 = $10.80 (or 8 × 1.35). $8.35 adds 35 cents instead of 35%, $2.80 is only the profit, and about $12.31 divides by 0.65 as if $8 were the price *after* a 35% cut.",
        difficulty: "core",
        guideRef: "money-percentages",
        hints: [
          "A mark-up means adding a percentage of the cost price.",
          "Find 35% of $8.",
          "Add it on — or multiply by 1.35.",
        ],
        strategy: "Use a single multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q12",
        question:
          "Wei Ling spends 40% of her savings on a bicycle helmet and has $72 left. How much did she have at first?",
        options: ["$180", "$100.80", "$120", "$43.20"],
        answerIndex: 2,
        explanation:
          "She has 60% left, so 60% = $72, 10% = $12 and 100% = $120. Check: 40% of $120 is $48, and 120 − 48 = 72. $180 treats the $72 as the 40% she spent, $100.80 adds 40% of $72 on, and $43.20 takes 60% of $72.",
        difficulty: "core",
        guideRef: "reverse-percentages",
        hints: [
          "What percentage of her savings is left?",
          "60% = $72. What is 10%?",
          "10% = 72 ÷ 6 = 12.",
        ],
        strategy: "Find 10% first",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q13",
        question:
          "Volunteers collect plastic bottles on two beaches.\n\n| Beach | Last year | This year |\n|---|---|---|\n| Beach A | 500 | 450 |\n| Beach B | 100 | 70 |\n\nA report says: 'Beach A improved more, because 50 fewer bottles is more than 30 fewer.' Which response is best?",
        options: [
          "In percentage terms Beach B improved more: a 30% fall against a 10% fall.",
          "The report is right: 50 is more than 30.",
          "Beach A improved more: a 50% fall against a 30% fall.",
          "Beach A improved more: it fell to 90%, but Beach B only fell to 70%.",
        ],
        answerIndex: 0,
        explanation:
          "Beach A fell by 50 out of 500 = 10%. Beach B fell by 30 out of 100 = 30%. Compared with where each started, Beach B improved far more. The report's counts ignore the very different starting sizes; '50% against 30%' turns counts into percentages; and 'fell to 90%' describes what is *left* — less left means a bigger fall, so 70% is the better result.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "The two beaches started with very different numbers of bottles.",
          "Work out each fall as a percentage of last year's count.",
          "Compare {{50/500}} with {{30/100}}.",
        ],
        strategy: "Compare absolute and relative change",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q14",
        question:
          "A 2 kg bag of bread mix contains 35 g of salt. Aisha says the salt is 17.5% of the mix. What went wrong?",
        options: [
          "Nothing — 35 ÷ 2 = 17.5, so she is right.",
          "She should divide 2 by 35, giving about 5.7%.",
          "She should not change the units, so it is 1750%.",
          "She used 2 kg = 200 g; it should be 2000 g, so the answer is 1.75%.",
        ],
        answerIndex: 3,
        explanation:
          "1 kg = 1000 g, so 2 kg = 2000 g and {{35/2000}} = 0.0175 = 1.75%. Aisha's 17.5% is exactly what {{35/200}} gives, so she turned 2 kg into 200 g. 1750% comes from 35 ÷ 2 with mixed units (the salt can't be more than the whole bag!), and about 5.7% divides the wrong way round.",
        difficulty: "core",
        guideRef: "one-as-percentage-of-another",
        hints: [
          "Are 35 g and 2 kg in the same units?",
          "How many grams are there in 2 kg?",
          "Work out {{35/2000}} × 100.",
        ],
        strategy: "Same units first",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q15",
        question:
          "Visitors to a science centre rose from 298 one weekend to 405 the next. Which is the best estimate of the percentage increase?",
        options: ["about 25%", "about 35%", "about 107%", "about 135%"],
        answerIndex: 1,
        explanation:
          "Round: the rise is about 405 − 300 ≈ 105, and 105 out of 300 is 35%. (The exact answer is about 35.9%.) About 25% divides by the new number, 405; about 107% turns the rise of 107 visitors into a percentage; and about 135% is the new number as a percentage of the old one.",
        difficulty: "core",
        guideRef: "percentage-change",
        hints: [
          "Round 298 to a friendly number.",
          "The rise is about 105. Compare it with the ORIGINAL number, about 300.",
          "105 out of 300 — what is that as a percentage?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q16",
        question:
          "At a Singapore restaurant, a 10% service charge is added to a $50 food bill, and then 9% GST is added to that new total. What is the final bill?",
        options: ["$59.50", "$54.50", "$59.95", "$55"],
        answerIndex: 2,
        explanation:
          "Service charge first: 50 × 1.1 = $55. Then GST on $55: 55 × 1.09 = $59.95. $59.50 adds 10% + 9% = 19% of $50, forgetting that GST is also charged on the service charge; $54.50 and $55 each leave out one of the two charges.",
        difficulty: "core",
        guideRef: "money-percentages",
        hints: [
          "Do the two charges one after the other.",
          "First add 10% of $50.",
          "Then add 9% of the NEW total: 55 × 1.09.",
        ],
        strategy: "Use a single multiplier",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q17",
        question:
          "In a sale, a jacket is 25% off. The sale price is $36 less than the original price. What is the sale price?",
        options: ["$144", "$108", "$27", "$45"],
        answerIndex: 1,
        explanation:
          "The $36 saved is 25% of the original price, so the original is 4 × 36 = $144, and the sale price is 144 − 36 = $108 (which is 75% of 144). $144 is the original price, not the sale price; $27 takes 75% of the $36 saving; and $45 adds 25% on to $36.",
        difficulty: "challenge",
        guideRef: "reverse-percentages",
        hints: [
          "Which percentage of the original is the $36?",
          "$36 is 25% of the original price. So what is 100%?",
          "Original = 4 × 36. Now take the $36 off.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q18",
        question:
          "Marcus's test mark went **up** by 20% to 54. Priya's mark went **down** by 10% to 54. Who had the higher mark before, and by how much?",
        options: ["Priya, by 15 marks", "They were equal: both had 54", "Marcus, by 15 marks", "Priya, by 16.2 marks"],
        answerIndex: 0,
        explanation:
          "Work backwards with multipliers. Marcus: 54 ÷ 1.2 = 45. Priya: 54 ÷ 0.9 = 60. So Priya was 15 marks higher. 16.2 comes from taking 20% off 54 and adding 10% on to 54 (giving 43.2 and 59.4) — but the percentages were of the *original* marks, not of 54. And the person who went *down* must have started higher, so it can't be Marcus.",
        difficulty: "challenge",
        guideRef: "reverse-percentages",
        hints: [
          "Who must have started higher — the one who went up, or the one who went down?",
          "Marcus: original × 1.2 = 54. Priya: original × 0.9 = 54.",
          "Divide 54 by each multiplier.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q19",
        question:
          "Two amounts start out equal. Path 1: increase by 50%, then decrease by 50%. Path 2: decrease by 50%, then increase by 50%. Which statement is true?",
        options: [
          "Path 1 ends higher.",
          "Path 2 ends higher.",
          "Both end back at the starting amount.",
          "Both end at 75% of the starting amount.",
        ],
        answerIndex: 3,
        explanation:
          "Path 1: × 1.5 × 0.5 = × 0.75. Path 2: × 0.5 × 1.5 = × 0.75. You can multiply in any order, so both end at 75% of the start (for example, $100 → $150 → $75, or $100 → $50 → $75). 'Back at the start' assumes +50% and −50% cancel — they don't, because each is a percentage of a different amount.",
        difficulty: "challenge",
        guideRef: "repeated-change",
        hints: [
          "Try both paths with $100.",
          "Write each step as a multiplier.",
          "Does the order of multiplying matter?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "percentages-m4-q20",
        question:
          "A car loses 20% of its value every year. After how many years is it first worth less than half of its original value?",
        options: ["After 3 years", "After 5 years", "After 4 years", "Never — it can't fall that low"],
        answerIndex: 2,
        explanation:
          "Multiply by 0.8 each year: 0.8, 0.64, 0.512, 0.4096. After 3 years it is still worth 51.2% — just over half — and after 4 years about 41%, so the answer is 4 years. 'After 3 years' comes from thinking 20% a year loses half in 2.5 years, but each year's 20% is taken from a smaller value. 'After 5 years' assumes 5 × 20% = 100%, so the car would be worthless.",
        difficulty: "challenge",
        guideRef: "repeated-change",
        hints: [
          "Each year the value is multiplied by the same number. What is it?",
          "Track the value as a decimal of the original: 1 → 0.8 → …",
          "Keep multiplying by 0.8 until you go below 0.5.",
        ],
        strategy: "Find a pattern",
      },
    ],
  },
];
