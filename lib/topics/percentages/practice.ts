import type { TopicPractice } from "../../types.ts";

export const practice: TopicPractice = {
  // ===========================================================================
  // QUIZ — a quick check of the whole topic (4 mcq, 5 short, 1 written)
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "percentages-quiz-q01",
      question: "Which of these is equal to 1.6?",
      options: ["16%", "1.6%", "160%", "106%"],
      answerIndex: 2,
      explanation:
        "To turn a decimal into a percentage, multiply by 100: 1.6 × 100 = 160%. It is more than 100% because 1.6 is more than one whole. 16% only multiplies by 10, 1.6% forgets to multiply at all, and 106% wrongly reads 1.6 as '1 and 6 hundredths'.",
      difficulty: "warmup",
      guideRef: "fdp-conversions",
      hints: ["1 = 100%. Is 1.6 more or less than 1?", "Multiply the decimal by 100."],
      strategy: "Multiply by 100",
    },
    {
      kind: "short",
      id: "percentages-quiz-q02",
      question: "Without a calculator, find 15% of $240.",
      answer: { type: "number", value: 36, display: "$36" },
      solution: ["10% of 240 = 240 ÷ 10 = 24.", "5% is half of 10%: 24 ÷ 2 = 12.", "15% = 10% + 5% = 24 + 12 = $36."],
      traps: [
        {
          spec: { type: "number", value: 16 },
          feedback: "You worked out 240 ÷ 15. But 15% means 15 hundredths, not one fifteenth. Build it from 10% and 5% instead.",
        },
      ],
      commonError: "Dividing by 15 instead of finding 15 hundredths.",
      difficulty: "warmup",
      guideRef: "percentage-of-amount",
      hints: ["Start with 10% — that's dividing by 10.", "5% is half of 10%."],
      strategy: "Build from 10% and 5%",
    },
    {
      kind: "short",
      id: "percentages-quiz-q03",
      question: "Wei Ling scored 42 out of 60 in a science test. What was her score as a percentage?",
      answer: { type: "number", value: 70, display: "70%" },
      solution: ["Write the score as a fraction: {{42/60}}.", "Simplify: {{42/60 = 7/10}} = 0.7.", "0.7 × 100 = 70%."],
      traps: [
        { spec: { type: "number", value: 0.7 }, feedback: "0.7 is the decimal. Multiply by 100 to turn it into a percentage." },
      ],
      difficulty: "warmup",
      guideRef: "one-as-percentage-of-another",
      hints: ["Write the score as a fraction: part over whole.", "Simplify {{42/60}}, then turn it into a percentage."],
      strategy: "Part over whole, then × 100",
    },
    {
      kind: "mcq",
      id: "percentages-quiz-q04",
      question: "Which single multiplier decreases an amount by 4%?",
      options: ["× 0.6", "× 0.96", "× 1.04", "× 0.04"],
      answerIndex: 1,
      explanation:
        "After a 4% decrease you keep 100% − 4% = 96% of the amount, so you multiply by 0.96. × 0.04 only finds the 4% being taken away, × 1.04 is a 4% *increase*, and × 0.6 treats 4% as if it were 40%.",
      difficulty: "core",
      guideRef: "multipliers",
      hints: ["After a 4% decrease, what percentage of the original is left?", "100% − 4% = 96%. Write 96% as a decimal."],
      strategy: "Write the change as a multiplier",
    },
    {
      kind: "short",
      id: "percentages-quiz-q05",
      question: "The number of members in the school chess CCA rose from 25 to 32. Find the percentage increase.",
      answer: { type: "number", value: 28, display: "28%" },
      solution: [
        "Change = 32 − 25 = 7 members.",
        "Percentage increase = change ÷ original × 100 = {{7/25}} × 100.",
        "{{7/25 = 28/100}}, so the increase is 28%.",
      ],
      traps: [
        { spec: { type: "number", value: 7 }, feedback: "7 is the absolute increase (7 members). Divide it by the original 25 and multiply by 100." },
        {
          spec: { type: "number", value: 21.875, tolerance: 0.13 },
          feedback: "You divided by the new number, 32. A percentage change always compares the change with the original, 25.",
        },
      ],
      commonError: "Dividing by the new value (32) instead of the original (25).",
      difficulty: "core",
      guideRef: "percentage-change",
      hints: ["What is the actual change in members?", "Compare the change with the ORIGINAL number of members.", "Write {{7/25}} as a percentage."],
      strategy: "Compare with the original",
    },
    {
      kind: "mcq",
      id: "percentages-quiz-q06",
      question: "After a 35% discount, a backpack costs $52. What was its original price?",
      options: ["$70.20", "$33.80", "$87", "$80"],
      answerIndex: 3,
      explanation:
        "$52 is what is left after 35% off, so it is 65% of the original: original = 52 ÷ 0.65 = $80. Check: 35% of $80 is $28, and 80 − 28 = 52. $70.20 adds 35% of $52 back on — but the 35% was of the original, which is bigger than $52. $33.80 takes another 35% off, and $87 just adds 35 dollars.",
      difficulty: "core",
      guideRef: "reverse-percentages",
      hints: [
        "Is $52 the price before or after the discount?",
        "$52 is 100% − 35% = 65% of the original price.",
        "Original × 0.65 = 52, so divide 52 by 0.65.",
      ],
      strategy: "Use the inverse",
    },
    {
      kind: "short",
      id: "percentages-quiz-q07",
      question: "A pair of running shoes costs $120 before GST. GST in Singapore is 9%. What do the shoes cost including GST?",
      answer: { type: "number", value: 130.8, display: "$130.80" },
      solution: [
        "GST = 9% of $120 = 0.09 × 120 = $10.80.",
        "Price including GST = 120 + 10.80 = $130.80.",
        "Or in one step with a multiplier: 120 × 1.09 = $130.80.",
      ],
      traps: [
        { spec: { type: "number", value: 10.8 }, feedback: "$10.80 is the GST on its own. Add it to the $120 price." },
        { spec: { type: "number", value: 129 }, feedback: "9% of $120 isn't $9 — 9% means 9 hundredths of 120. Work out 0.09 × 120." },
      ],
      difficulty: "core",
      guideRef: "money-percentages",
      hints: ["What is 1% of $120?", "1% is $1.20, so 9% is 9 × $1.20.", "Add the GST on — or multiply 120 by 1.09 in one go."],
      strategy: "Use a multiplier",
    },
    {
      kind: "mcq",
      id: "percentages-quiz-q08",
      question:
        "Jun puts $2000 into a savings account that pays 5% compound interest per year. Which calculation gives the amount in the account after 3 years?",
      options: ["2000 × {{1.05^3}}", "2000 × 1.15", "2000 × {{0.05^3}}", "2000 × 1.05 × 3"],
      answerIndex: 0,
      explanation:
        "Each year the amount is multiplied by 1.05, so after 3 years it is 2000 × 1.05 × 1.05 × 1.05 = 2000 × {{1.05^3}}. 2000 × 1.15 adds 5% three times to the original — that is *simple* interest. 2000 × {{0.05^3}} forgets the 100% you keep, and 2000 × 1.05 × 3 triples the money.",
      difficulty: "core",
      guideRef: "repeated-change",
      hints: [
        "What single number do you multiply by for one year at 5%?",
        "In year 2, the 5% is worked out on the new, bigger amount.",
        "Three years means multiplying by 1.05 three times.",
      ],
      strategy: "Repeat the multiplier",
    },
    {
      kind: "written",
      id: "percentages-quiz-q09",
      question:
        "Two sports shops cut their prices. Shop A cuts a football from $25 to $20. Shop B cuts a basketball from $40 to $33.\n\nMarcus says, 'Shop B gave the bigger price cut, so it gave the bigger percentage reduction.'\n\nIs Marcus right? Show your working.",
      marks: 3,
      modelAnswer:
        "No, Marcus is wrong.\n\nShop A cut $5 from $25: {{5/25}} × 100 = 20%.\n\nShop B cut $7 from $40: {{7/40}} × 100 = 17.5%.\n\nShop B's cut is bigger in dollars (the absolute change), but Shop A's cut is bigger as a percentage. A percentage reduction compares the cut with the original price, and Shop A's original price was smaller.",
      markScheme: [
        { point: "Shop A: $5 off $25 is a 20% reduction", keywords: ["20%", "20", "5/25", "0.2"] },
        { point: "Shop B: $7 off $40 is a 17.5% reduction", keywords: ["17.5", "17.5%", "7/40", "0.175"] },
        {
          point: "Concludes Marcus is wrong: B's cut is bigger in dollars (absolute) but A's is bigger as a percentage of the original price",
          keywords: ["wrong", "not right", "absolute", "original", "shop a", "dollars"],
        },
      ],
      commonError: "Comparing the dollar cuts ($5 and $7) instead of the percentage cuts.",
      difficulty: "core",
      guideRef: "percentage-change",
      hints: [
        "Find each cut in dollars first.",
        "Write each cut as a percentage of that shop's ORIGINAL price.",
        "Compare {{5/25}} × 100 with {{7/40}} × 100.",
      ],
      strategy: "Compare with the original",
    },
    {
      kind: "short",
      id: "percentages-quiz-q10",
      question:
        "A packet of biscuits used to contain 500 g. The maker shrinks it to 450 g but keeps the price the same. By what percentage has the price per gram increased? Give your answer to 1 decimal place.",
      answer: { type: "number", value: 11.1, display: "11.1%" },
      solution: [
        "Pick a price to make it concrete: say the packet costs $4.50 = 450 cents.",
        "Before: 450 ÷ 500 = 0.9 cents per gram. After: 450 ÷ 450 = 1 cent per gram.",
        "Increase = 0.1 cents per gram, compared with the original 0.9.",
        "{{0.1/0.9}} × 100 = 11.11…% ≈ 11.1%.",
      ],
      solutions: [
        {
          label: "Multipliers",
          steps: [
            "The same money now buys {{450/500}} = 0.9 times as much biscuit.",
            "So the price per gram is multiplied by {{1/0.9}} = 1.111…",
            "× 1.111… is an increase of 11.1%. This works for any price, so it is the slicker method.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 10 },
          feedback: "The mass fell by 10%, but that's not the same as the rise in price per gram. Try a price, say $4.50, and work out the cost of 1 g before and after.",
        },
      ],
      commonError: "Assuming a 10% cut in mass means a 10% rise in price per gram.",
      difficulty: "challenge",
      guideRef: "percentage-change",
      hints: [
        "Choose an easy price for the packet, such as $4.50.",
        "Work out the cost of 1 g before and after the change.",
        "Find the percentage increase from the old cost per gram to the new one.",
      ],
      strategy: "Try a convenient number",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS — 16 short + 4 written each, easy → hard
  // ===========================================================================
  papers: [
    {
      id: "percentages-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "percentages-p1-q01",
          question: "Write 0.045 as a percentage.",
          answer: { type: "number", value: 4.5, display: "4.5%" },
          solution: ["To change a decimal to a percentage, multiply by 100.", "0.045 × 100 = 4.5, so 0.045 = 4.5%."],
          traps: [
            { spec: { type: "number", value: 45 }, feedback: "Check the decimal places: 0.045 × 100 = 4.5, not 45. 45% would be 0.45." },
          ],
          difficulty: "warmup",
          guideRef: "fdp-conversions",
          hints: ["Multiplying by 100 moves every digit two places to the left."],
          strategy: "Multiply by 100",
        },
        {
          kind: "short",
          id: "percentages-p1-q02",
          question: "Write 64% as a fraction in its simplest form.",
          answer: { type: "fraction", n: 16, d: 25, simplest: true },
          solution: ["64% = {{64/100}}.", "The HCF of 64 and 100 is 4, so divide top and bottom by 4: {{64/100 = 16/25}}."],
          commonError: "Stopping at {{32/50}} — keep dividing until the top and bottom have no common factor.",
          difficulty: "warmup",
          guideRef: "fdp-conversions",
          hints: ["Per cent means 'out of 100' — write it over 100.", "The HCF of 64 and 100 is 4."],
          strategy: "Write over 100, then simplify",
        },
        {
          kind: "short",
          id: "percentages-p1-q03",
          question: "Without a calculator, find 45% of 340 m. Give your answer in metres.",
          answer: { type: "number", value: 153, display: "153 m" },
          solution: ["10% of 340 = 34.", "40% = 4 × 34 = 136.", "5% = half of 10% = 17.", "45% = 136 + 17 = 153 m."],
          solutions: [
            { label: "Subtract from 50%", steps: ["50% of 340 = 170.", "5% of 340 = 17.", "45% = 50% − 5% = 170 − 17 = 153 m. Quicker: only two easy steps."] },
          ],
          difficulty: "warmup",
          guideRef: "percentage-of-amount",
          hints: ["Split 45% into easy pieces: 10%s and 5%.", "10% of 340 is 34."],
          strategy: "Build from 10% and 5%",
        },
        {
          kind: "short",
          id: "percentages-p1-q04",
          question: "A 750 ml bottle of fruit punch contains 120 ml of mango juice. What percentage of the drink is mango juice?",
          answer: { type: "number", value: 16, display: "16%" },
          solution: [
            "Mango as a fraction of the drink: {{120/750}}.",
            "Divide top and bottom by 30: {{120/750 = 4/25}}.",
            "{{4/25 = 16/100}} = 16%.",
          ],
          traps: [{ spec: { type: "number", value: 0.16 }, feedback: "0.16 is the decimal — multiply by 100 to get the percentage." }],
          difficulty: "warmup",
          guideRef: "one-as-percentage-of-another",
          hints: ["Write part over whole: mango juice over the whole drink.", "Simplify {{120/750}} (or work out 120 ÷ 750), then × 100."],
          strategy: "Part over whole, then × 100",
        },
        {
          kind: "short",
          id: "percentages-p1-q05",
          question: "Write down the single decimal multiplier that increases an amount by 7%.",
          answer: { type: "number", value: 1.07, allowFraction: false, display: "1.07" },
          solution: ["After a 7% increase you have 100% + 7% = 107% of the amount.", "107% = 1.07, so the multiplier is × 1.07."],
          traps: [
            { spec: { type: "number", value: 0.07 }, feedback: "× 0.07 finds only the 7% increase. You also keep the original 100%: 100% + 7% = 107%." },
            { spec: { type: "number", value: 1.7 }, feedback: "× 1.7 would be a 70% increase. 7% as a decimal is 0.07, so the multiplier is 1 + 0.07." },
          ],
          difficulty: "warmup",
          guideRef: "multipliers",
          hints: ["After the increase, what percentage of the original do you have?"],
          strategy: "Write the change as a multiplier",
        },
        {
          kind: "short",
          id: "percentages-p1-q06",
          question:
            "Convert each of these to a percentage: {{7/20}}, 0.36, 35.5%, {{3/8}}.\n\nThen type the four percentages in order, smallest first, separated by commas.",
          answer: { type: "list", values: [35, 35.5, 36, 37.5], ordered: true, display: "35%, 35.5%, 36%, 37.5%" },
          solution: [
            "{{7/20 = 35/100}} = 35%.",
            "0.36 = 36%.",
            "35.5% stays as it is.",
            "{{3/8}} = 3 ÷ 8 = 0.375 = 37.5%.",
            "Smallest first: 35%, 35.5%, 36%, 37.5%.",
          ],
          traps: [
            {
              spec: { type: "list", values: [35, 36, 35.5, 37.5], ordered: true },
              feedback: "35.5% is smaller than 36% — compare the whole-number parts first (35 < 36).",
            },
          ],
          commonError: "Thinking 0.36 is bigger than {{3/8}} because 36 is bigger than 3 and 8.",
          difficulty: "core",
          guideRef: "fdp-conversions",
          hints: [
            "Turn every number into a percentage so you are comparing like with like.",
            "{{7/20}}: multiply top and bottom by 5. {{3/8}}: work out 3 ÷ 8.",
            "Now put the four percentages in order.",
          ],
          strategy: "Convert to the same form",
        },
        {
          kind: "short",
          id: "percentages-p1-q07",
          question: "Use a calculator and a decimal multiplier to find 23.5% of 68 kg. Give your answer in kg.",
          answer: { type: "number", value: 15.98, display: "15.98 kg" },
          solution: ["23.5% = 23.5 ÷ 100 = 0.235.", "0.235 × 68 = 15.98.", "So 23.5% of 68 kg is 15.98 kg."],
          traps: [{ spec: { type: "number", value: 1598 }, feedback: "Your multiplier is 100 times too big: 23.5% is 0.235, not 23.5." }],
          difficulty: "core",
          guideRef: "percentage-of-amount",
          hints: ["Write 23.5% as a decimal.", "Divide 23.5 by 100 to get 0.235, then multiply by 68."],
          strategy: "Use a multiplier",
        },
        {
          kind: "written",
          id: "percentages-p1-q08",
          question: "Without a calculator, find 13% of $430. Show your method clearly, building 13% from 10% and 1%.",
          marks: 3,
          modelAnswer:
            "10% of $430 = 430 ÷ 10 = $43.\n\n1% of $430 = 430 ÷ 100 = $4.30, so 3% = 3 × 4.30 = $12.90.\n\n13% = 10% + 3% = 43 + 12.90 = $55.90.",
          markScheme: [
            { point: "Finds 10% of 430 = 43", keywords: ["43", "10%"] },
            { point: "Finds 1% = 4.30 and so 3% = 12.90", keywords: ["4.3", "4.30", "12.9", "12.90", "1%"] },
            { point: "Adds to get 13% = $55.90", keywords: ["55.9", "55.90"] },
          ],
          commonError: "Writing 1% of 430 as 43 — that's 10%. 1% means dividing by 100.",
          difficulty: "core",
          guideRef: "percentage-of-amount",
          hints: ["Which easy percentages add up to 13%?", "13% = 10% + 1% + 1% + 1%.", "Find 1% by dividing by 100."],
          strategy: "Build from 10% and 1%",
        },
        {
          kind: "short",
          id: "percentages-p1-q09",
          question: "Ravi's MRT journey to school takes 48 minutes. Express 48 minutes as a percentage of 2 hours.",
          answer: { type: "number", value: 40, display: "40%" },
          solution: ["Same units first: 2 hours = 120 minutes.", "{{48/120 = 2/5}} = 0.4.", "0.4 × 100 = 40%."],
          traps: [{ spec: { type: "number", value: 2400 }, feedback: "The units don't match. Change 2 hours into 120 minutes before dividing." }],
          commonError: "Dividing 48 by 2 without changing hours into minutes.",
          difficulty: "core",
          guideRef: "one-as-percentage-of-another",
          hints: ["Are the two times in the same units?", "2 hours = 120 minutes. Now write 48 over 120."],
          strategy: "Same units first",
        },
        {
          kind: "short",
          id: "percentages-p1-q10",
          question:
            "During a bumper harvest, the price of durians at a stall falls by 35% from $24 per kg. Use a single multiplier to find the new price per kg.",
          answer: { type: "number", value: 15.6, display: "$15.60" },
          solution: ["A 35% decrease leaves 100% − 35% = 65% of the old price.", "Multiplier = 0.65.", "24 × 0.65 = $15.60 per kg."],
          traps: [
            { spec: { type: "number", value: 8.4 }, feedback: "$8.40 is how much the price falls. Take it off $24 — or use × 0.65 straight away." },
            { spec: { type: "number", value: 32.4 }, feedback: "That's a 35% increase. A fall needs a multiplier less than 1." },
          ],
          difficulty: "core",
          guideRef: "multipliers",
          hints: ["After a 35% fall, what percentage of the old price is left?", "65% as a decimal is 0.65. Multiply."],
          strategy: "Use a multiplier",
        },
        {
          kind: "short",
          id: "percentages-p1-q11",
          question:
            "A school's electricity use fell from 12 400 kWh in March to 11 800 kWh in April. Find the percentage decrease, correct to 1 decimal place.",
          answer: { type: "number", value: 4.8, display: "4.8%" },
          solution: [
            "Decrease = 12 400 − 11 800 = 600 kWh.",
            "Percentage decrease = {{600/12400}} × 100 = 4.838…%.",
            "To 1 decimal place: 4.8%.",
          ],
          traps: [
            {
              spec: { type: "number", value: 5.1, tolerance: 0.05 },
              feedback: "You divided by the April value, 11 800. A percentage change compares the change with the original, 12 400.",
            },
            { spec: { type: "number", value: 600 }, feedback: "600 kWh is the absolute decrease. Now write it as a percentage of the original 12 400 kWh." },
          ],
          commonError: "Dividing by the new value instead of the original.",
          difficulty: "core",
          guideRef: "percentage-change",
          hints: ["Find the actual decrease first.", "Divide the decrease by the ORIGINAL (March) value.", "Multiply by 100, then round to 1 decimal place."],
          strategy: "Compare with the original",
        },
        {
          kind: "written",
          id: "percentages-p1-q12",
          question:
            "In one year, visitors to a small museum rose from 400 to 1000. Over the same year, visitors to a large gallery rose from 50 000 to 55 000.\n\nA newspaper says the museum is 'growing far faster'. The gallery's manager says, 'We gained far more visitors.'\n\n(a) Work out the absolute increase and the percentage increase for each place.\n(b) Explain how both statements can be true.",
          marks: 4,
          modelAnswer:
            "(a) Museum: 1000 − 400 = 600 more visitors; {{600/400}} × 100 = 150% increase.\n\nGallery: 55 000 − 50 000 = 5000 more visitors; {{5000/50000}} × 100 = 10% increase.\n\n(b) The newspaper is talking about the **percentage (relative) change**: compared with its own starting size, the museum grew far more (150% against 10%). The manager is talking about the **absolute change**: the gallery gained 5000 visitors, more than eight times the museum's 600. Both are true, because a percentage compares a change with its own original amount, and the two starting numbers are very different.",
          markScheme: [
            { point: "Museum: increase of 600, which is 150%", keywords: ["600", "150%", "150"] },
            { point: "Gallery: increase of 5000, which is 10%", keywords: ["5000", "5 000", "10%"] },
            { point: "The museum has the bigger percentage (relative) increase", keywords: ["percentage", "relative", "museum", "faster"] },
            {
              point: "The gallery has the bigger absolute increase; each percentage compares with a very different starting number",
              keywords: ["absolute", "more visitors", "original", "starting", "gallery"],
            },
          ],
          commonError: "Thinking only one of the two measures can be 'right'.",
          difficulty: "core",
          guideRef: "percentage-change",
          hints: [
            "Absolute increase = new − original.",
            "Percentage increase = increase ÷ original × 100.",
            "Which kind of change is each person talking about?",
          ],
          strategy: "Compare with the original",
        },
        {
          kind: "short",
          id: "percentages-p1-q13",
          question: "After a 15% pay rise, Siti earns $3680 a month. How much did she earn each month before the rise?",
          answer: { type: "number", value: 3200, display: "$3200" },
          solution: [
            "After a 15% rise she earns 115% of her old pay.",
            "Old pay × 1.15 = 3680.",
            "Old pay = 3680 ÷ 1.15 = $3200.",
            "Check: 15% of 3200 = 480, and 3200 + 480 = 3680. ✓",
          ],
          solutions: [
            { label: "Unitary method (find 1%)", steps: ["$3680 is 115%.", "1% = 3680 ÷ 115 = $32.", "100% = 32 × 100 = $3200. Same answer; dividing by 1.15 is one step instead of two."] },
          ],
          traps: [
            {
              spec: { type: "number", value: 3128 },
              feedback: "You took 15% of $3680 off. But the 15% was of her OLD pay, which is smaller. $3680 is 115% of the old pay — divide by 1.15.",
            },
          ],
          commonError: "Taking 15% of the new amount off instead of dividing by the multiplier.",
          difficulty: "core",
          guideRef: "reverse-percentages",
          hints: ["Is $3680 her pay before or after the rise?", "$3680 is 115% of her old pay.", "Divide by the multiplier 1.15."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "percentages-p1-q14",
          question:
            "Aisha puts $1500 into a savings account that pays 2.4% simple interest per year. How much interest has she earned after 5 years?",
          answer: { type: "number", value: 180, display: "$180" },
          solution: [
            "Interest for one year = 2.4% of 1500 = 0.024 × 1500 = $36.",
            "Simple interest is the same every year, so 5 years earn 5 × 36 = $180.",
            "(Or use {{I = (PRT)/100 = (1500 * 2.4 * 5)/100}} = 180.)",
          ],
          traps: [
            { spec: { type: "number", value: 1680 }, feedback: "$1680 is the total in the account. The question asks only for the interest." },
            { spec: { type: "number", value: 36 }, feedback: "$36 is one year's interest. She leaves the money in for 5 years." },
          ],
          difficulty: "core",
          guideRef: "money-percentages",
          hints: ["Find the interest for one year first.", "Simple interest is the same amount every year — how many years are there?"],
          strategy: "Find one year, then scale",
        },
        {
          kind: "short",
          id: "percentages-p1-q15",
          question:
            "A bookshop buys 50 copies of a novel at $8 each. It sells 30 copies at $12 each and, in a clearance sale, the other 20 copies at $5 each. Find the bookshop's percentage profit.",
          answer: { type: "number", value: 15, display: "15%" },
          solution: [
            "Cost price: 50 × 8 = $400.",
            "Takings: 30 × 12 + 20 × 5 = 360 + 100 = $460.",
            "Profit = 460 − 400 = $60.",
            "Percentage profit = {{60/400}} × 100 = 15% (profit is always a percentage of the cost price).",
          ],
          traps: [
            {
              spec: { type: "number", value: 13.04, tolerance: 0.05 },
              feedback: "You divided by the takings ($460). Percentage profit compares the profit with the COST price, $400.",
            },
            { spec: { type: "number", value: 60 }, feedback: "$60 is the profit in dollars. Write it as a percentage of the cost price." },
          ],
          commonError: "Dividing the profit by the selling price instead of the cost price.",
          difficulty: "core",
          guideRef: "money-percentages",
          hints: ["Find the total cost and the total takings.", "Profit = takings − cost.", "Write the profit as a percentage of the COST."],
          strategy: "Compare with the original",
        },
        {
          kind: "written",
          id: "percentages-p1-q16",
          question:
            "Priya buys a phone for $436, which includes 9% GST. She works out the price before GST like this:\n\n    9% of 436 = 39.24\n    436 − 39.24 = 396.76\n\nExplain what Priya has done wrong, and find the correct price before GST.",
          marks: 3,
          modelAnswer:
            "GST is 9% of the price **before** GST, not 9% of $436. So $436 is 100% + 9% = 109% of the price before GST, and taking 9% of the bigger amount ($436) takes off too much.\n\nPrice before GST × 1.09 = 436, so the price before GST = 436 ÷ 1.09 = $400.\n\nCheck: 9% of $400 = $36, and 400 + 36 = $436. ✓",
          markScheme: [
            {
              point: "Explains the 9% is of the price before GST, not of $436",
              keywords: ["before gst", "original", "not of 436", "price before", "smaller", "bigger amount"],
            },
            { point: "Recognises $436 is 109% of the price before GST (multiplier 1.09)", keywords: ["109%", "1.09", "109"] },
            { point: "Correct price before GST: 436 ÷ 1.09 = $400", keywords: ["400"] },
          ],
          commonError: "Subtracting a percentage of the final amount to undo a percentage change.",
          difficulty: "core",
          guideRef: "reverse-percentages",
          hints: ["GST is 9% of which price — before or after GST is added?", "$436 is what percentage of the price before GST?", "Divide by the multiplier 1.09."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "percentages-p1-q17",
          question:
            "The number of cells in a yeast culture grows by 20% every hour. After 2 hours there are 7200 cells. How many cells were there at the start?",
          answer: { type: "number", value: 5000 },
          solution: [
            "Each hour multiplies the number of cells by 1.2.",
            "After 2 hours: start × 1.2 × 1.2 = start × 1.44.",
            "start × 1.44 = 7200, so start = 7200 ÷ 1.44 = 5000 cells.",
            "Check: 5000 → 6000 → 7200. ✓",
          ],
          solutions: [
            { label: "Work backwards one hour at a time", steps: ["7200 is 120% of the number after 1 hour: 7200 ÷ 1.2 = 6000.", "6000 is 120% of the start: 6000 ÷ 1.2 = 5000.", "Same answer; dividing by 1.44 once is slicker when there are many hours."] },
          ],
          traps: [
            {
              spec: { type: "number", value: 5142.86, tolerance: 0.01 },
              feedback: "You divided by 1.4, treating two rises of 20% as one rise of 40%. The second 20% is of a bigger number, so the multiplier is 1.2 × 1.2 = 1.44.",
            },
            { spec: { type: "number", value: 4608 }, feedback: "Taking 20% off twice doesn't undo two 20% rises. Divide by the multiplier instead." },
          ],
          commonError: "Adding the percentages (20% + 20% = 40%) instead of multiplying the multipliers.",
          difficulty: "challenge",
          guideRef: "repeated-change",
          hints: [
            "What do you multiply by for one hour of growth?",
            "Two hours means multiplying by 1.2 twice. What single multiplier is that?",
            "start × 1.44 = 7200. Use the inverse.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "percentages-p1-q18",
          question:
            "The length of a rectangle is increased by 20% and its width is decreased by 25%. By what percentage does its area decrease?",
          answer: { type: "number", value: 10, display: "10%" },
          solution: [
            "Area = length × width.",
            "The new length is 1.2 × the old length; the new width is 0.75 × the old width.",
            "New area = 1.2 × 0.75 × old area = 0.9 × old area.",
            "× 0.9 is a 10% decrease.",
          ],
          solutions: [
            { label: "Try a convenient rectangle", steps: ["Take a 10 cm by 10 cm square: area 100 cm².", "New length 12 cm, new width 7.5 cm: area 12 × 7.5 = 90 cm².", "From 100 to 90 is a 10% decrease. Concrete and quick — but the multiplier method shows it works for every rectangle."] },
          ],
          traps: [
            { spec: { type: "number", value: 5 }, feedback: "You added −25% and +20%. Percentage changes to length and width multiply, they don't add: 1.2 × 0.75." },
          ],
          commonError: "Adding the two percentage changes instead of multiplying the multipliers.",
          difficulty: "challenge",
          guideRef: "multipliers",
          hints: [
            "Write each change as a multiplier.",
            "Area is length × width, so what happens to the area's multiplier?",
            "Work out 1.2 × 0.75.",
          ],
          strategy: "Try a convenient number",
        },
        {
          kind: "short",
          id: "percentages-p1-q19",
          question:
            "Hana scored 48 out of 80 in her first maths test and 63 out of 90 in her second. Work out each score as a percentage. Then find the percentage increase from her first percentage score to her second, correct to 1 decimal place.",
          answer: { type: "number", value: 16.7, display: "16.7%" },
          solution: [
            "Test 1: {{48/80}} = 0.6 = 60%.",
            "Test 2: {{63/90}} = 0.7 = 70%.",
            "Her percentage score rose by 10 percentage points, from 60 to 70.",
            "Percentage increase = {{10/60}} × 100 = 16.66…% ≈ 16.7%.",
          ],
          traps: [
            {
              spec: { type: "number", value: 10 },
              feedback: "60% to 70% is a rise of 10 percentage points. The question asks for the percentage increase, so compare the 10 with the original 60.",
            },
            {
              spec: { type: "number", value: 31.25, tolerance: 0.06 },
              feedback: "You compared the raw marks 48 and 63, but the tests had different totals. Turn each score into a percentage first.",
            },
          ],
          commonError: "Treating a rise of 10 percentage points as a 10% increase.",
          difficulty: "challenge",
          guideRef: "percentage-change",
          hints: [
            "Why can't you compare 48 and 63 directly?",
            "Her percentage scores are 60% and 70%.",
            "Percentage increase = change ÷ original × 100, with the original being 60.",
          ],
          strategy: "Compare with the original",
        },
        {
          kind: "written",
          id: "percentages-p1-q20",
          question:
            "A stationery shop sells notebooks at $4 each. You can use one of two deals:\n\n- **Deal A:** buy 2, get a 3rd free.\n- **Deal B:** 30% off everything.\n\nZara says, 'Deal A is always better, because getting 1 free out of 3 is 33% off.'\n\nCompare the two deals for 3 notebooks and for 4 notebooks. Is Zara right? Explain.",
          marks: 4,
          modelAnswer:
            "**3 notebooks:** Deal A — pay for 2: 2 × $4 = $8. Deal B — 70% of $12 = 0.7 × 12 = $8.40. Deal A is cheaper.\n\n**4 notebooks:** Deal A — one is free, pay for 3: 3 × $4 = $12. Deal B — 70% of $16 = 0.7 × 16 = $11.20. Deal B is cheaper.\n\nSo Zara is wrong: Deal A is only about 33% off when you buy a multiple of 3 notebooks. With 4 notebooks you get 1 free out of 4, which is only 25% off — worse than 30% off.",
          markScheme: [
            { point: "3 notebooks: Deal A costs $8", keywords: ["8", "$8", "2 × 4", "pay for 2"] },
            { point: "3 notebooks: Deal B costs $8.40, so A is cheaper", keywords: ["8.40", "8.4"] },
            { point: "4 notebooks: Deal A costs $12 but Deal B costs $11.20, so B is cheaper", keywords: ["12", "11.20", "11.2"] },
            {
              point: "Zara is wrong: A is only 33% off for multiples of 3; with 4 notebooks it is just 25% off",
              keywords: ["wrong", "not always", "sometimes", "25%", "multiple of 3"],
            },
          ],
          commonError: "Checking only one quantity and assuming the result holds for every quantity.",
          difficulty: "challenge",
          guideRef: "money-percentages",
          hints: [
            "Work out the actual cost of 3 notebooks with each deal.",
            "With Deal A and 4 notebooks, how many are free?",
            "1 free out of 4 is what percentage off?",
          ],
          strategy: "Split into cases",
        },
      ],
    },
    {
      id: "percentages-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "percentages-p2-q01",
          question: "Write {{7/4}} as a percentage.",
          answer: { type: "number", value: 175, display: "175%" },
          solution: ["{{7/4}} = 7 ÷ 4 = 1.75.", "1.75 × 100 = 175%.", "It is more than 100% because {{7/4}} is more than one whole."],
          traps: [
            { spec: { type: "number", value: 1.75 }, feedback: "1.75 is the decimal. Multiply by 100 to make it a percentage." },
            { spec: { type: "number", value: 57.14, tolerance: 0.05 }, feedback: "You worked out 4 ÷ 7. The fraction is seven quarters, so divide 7 by 4." },
          ],
          difficulty: "warmup",
          guideRef: "fdp-conversions",
          hints: ["Is {{7/4}} more or less than 1? So should the percentage be more or less than 100%?"],
          strategy: "Convert to a decimal first",
        },
        {
          kind: "short",
          id: "percentages-p2-q02",
          question: "Write 0.8% as a decimal.",
          answer: { type: "number", value: 0.008, allowFraction: false, display: "0.008" },
          solution: ["To change a percentage to a decimal, divide by 100.", "0.8 ÷ 100 = 0.008."],
          traps: [
            { spec: { type: "number", value: 0.08 }, feedback: "0.08 is 8%. Dividing 0.8 by 100 moves every digit two places to the right: 0.008." },
            { spec: { type: "number", value: 80 }, feedback: "You multiplied by 100. To go from a percentage to a decimal, divide by 100." },
          ],
          commonError: "Thinking 0.8% = 0.8 (it is less than 1%, so it must be less than 0.01).",
          difficulty: "warmup",
          guideRef: "fdp-conversions",
          hints: ["Percentage → decimal: divide by 100. Is 0.8% more or less than 1% = 0.01?"],
          strategy: "Divide by 100",
        },
        {
          kind: "short",
          id: "percentages-p2-q03",
          question: "Without a calculator, find 2.5% of $360.",
          answer: { type: "number", value: 9, display: "$9" },
          solution: ["10% of 360 = 36.", "5% = half of 10% = 18.", "2.5% = half of 5% = $9."],
          traps: [{ spec: { type: "number", value: 144 }, feedback: "You worked out 360 ÷ 2.5. Find 10%, then keep halving." }],
          difficulty: "warmup",
          guideRef: "percentage-of-amount",
          hints: ["Start with 10%, then keep halving."],
          strategy: "Build from 10% and halve",
        },
        {
          kind: "short",
          id: "percentages-p2-q04",
          question: "In a class of 32 students, 12 take the MRT to school. What percentage of the class takes the MRT?",
          answer: { type: "number", value: 37.5, display: "37.5%" },
          solution: ["{{12/32 = 3/8}}.", "{{3/8}} = 3 ÷ 8 = 0.375.", "0.375 × 100 = 37.5%."],
          traps: [{ spec: { type: "number", value: 0.375 }, feedback: "0.375 is the decimal — multiply by 100 to get the percentage." }],
          difficulty: "warmup",
          guideRef: "one-as-percentage-of-another",
          hints: ["Write it as a fraction of the class, simplify, then turn it into a percentage."],
          strategy: "Part over whole, then × 100",
        },
        {
          kind: "short",
          id: "percentages-p2-q05",
          question: "A haircut costs $28 before GST. How much GST, at 9%, is added?",
          answer: { type: "number", value: 2.52, display: "$2.52" },
          solution: [
            "GST = 9% of 28 = 0.09 × 28 = $2.52.",
            "Mentally: 10% is $2.80 and 1% is $0.28, so 9% = 2.80 − 0.28 = $2.52.",
          ],
          traps: [{ spec: { type: "number", value: 30.52 }, feedback: "$30.52 is the total price. The question asks only for the GST." }],
          difficulty: "warmup",
          guideRef: "money-percentages",
          hints: ["GST is 9% of the price. 9% = 10% − 1%."],
          strategy: "Build from 10% and 1%",
        },
        {
          kind: "short",
          id: "percentages-p2-q06",
          question:
            "A community garden had 640 plants last year. This year the number of plants has increased by 12.5%. Use a multiplier to find how many plants there are now.",
          answer: { type: "number", value: 720 },
          solution: ["A 12.5% increase gives 100% + 12.5% = 112.5% of the old number.", "Multiplier = 1.125.", "640 × 1.125 = 720 plants."],
          traps: [
            { spec: { type: "number", value: 80 }, feedback: "80 is the increase. Add it to 640, or use × 1.125 in one step." },
            { spec: { type: "number", value: 560 }, feedback: "That's a 12.5% decrease. An increase needs a multiplier bigger than 1." },
          ],
          difficulty: "core",
          guideRef: "multipliers",
          hints: ["After the increase, what percentage of last year's number is there?", "112.5% as a decimal is 1.125."],
          strategy: "Use a multiplier",
        },
        {
          kind: "short",
          id: "percentages-p2-q07",
          question: "A bamboo plant was 80 cm tall in May. By August it was 235% of its May height. How tall was it in August? Give your answer in cm.",
          answer: { type: "number", value: 188, display: "188 cm" },
          solution: ["235% = 2.35.", "2.35 × 80 = 188 cm.", "Check: 200% of 80 is 160 and 35% of 80 is 28; 160 + 28 = 188. ✓"],
          traps: [
            {
              spec: { type: "number", value: 268 },
              feedback: "That is an *increase* of 235% (× 3.35). '235% of' its height means × 2.35.",
            },
          ],
          commonError: "Confusing '235% of' with 'an increase of 235%'.",
          difficulty: "core",
          guideRef: "percentage-of-amount",
          hints: ["Is 235% more or less than the whole? Should the answer be more or less than 80 cm?", "Write 235% as a decimal multiplier."],
          strategy: "Use a multiplier",
        },
        {
          kind: "written",
          id: "percentages-p2-q08",
          question:
            "In Arjun's class, 12 out of 30 students have a pet. In his cousin's class, 15 out of 40 students have a pet.\n\nArjun says, 'Having a pet is more common in my cousin's class, because 15 is more than 12.'\n\nIs Arjun right? Show your working.",
          marks: 3,
          modelAnswer:
            "Arjun's class: {{12/30}} = 0.4 = 40% have a pet.\n\nCousin's class: {{15/40}} = 0.375 = 37.5% have a pet.\n\nArjun is wrong. The classes are different sizes, so you can't compare the raw numbers; as a percentage of each class, having a pet is more common in Arjun's own class (40% against 37.5%).",
          markScheme: [
            { point: "Arjun's class: 12 out of 30 = 40%", keywords: ["40%", "40", "0.4", "12/30"] },
            { point: "Cousin's class: 15 out of 40 = 37.5%", keywords: ["37.5", "37.5%", "0.375", "15/40"] },
            {
              point: "Concludes Arjun is wrong: the classes are different sizes, so compare percentages, not raw numbers",
              keywords: ["wrong", "different sizes", "out of", "percentage", "arjun's class"],
            },
          ],
          commonError: "Comparing raw counts from groups of different sizes.",
          difficulty: "core",
          guideRef: "one-as-percentage-of-another",
          hints: ["Why might comparing 15 and 12 be unfair?", "Write each as a percentage of its own class.", "Which percentage is bigger?"],
          strategy: "Convert to the same form",
        },
        {
          kind: "short",
          id: "percentages-p2-q09",
          question:
            "In a survey of 250 students, 85 chose durian as their favourite fruit. What percentage of the students did NOT choose durian?",
          answer: { type: "number", value: 66, display: "66%" },
          solution: ["Students who did not choose durian: 250 − 85 = 165.", "{{165/250}} = 0.66.", "0.66 × 100 = 66%."],
          solutions: [
            { label: "Find the durian percentage first", steps: ["{{85/250}} = 0.34 = 34% chose durian.", "So 100% − 34% = 66% did not. Equally quick."] },
          ],
          traps: [{ spec: { type: "number", value: 34 }, feedback: "34% is the percentage who DID choose durian. Read the question again." }],
          difficulty: "core",
          guideRef: "one-as-percentage-of-another",
          hints: ["How many students did NOT choose durian?", "Write that number as a percentage of 250."],
          strategy: "Part over whole, then × 100",
        },
        {
          kind: "short",
          id: "percentages-p2-q10",
          question: "A number is multiplied by 0.72. What percentage decrease is this?",
          answer: { type: "number", value: 28, display: "28%" },
          solution: ["× 0.72 keeps 72% of the number.", "The decrease is 100% − 72% = 28%."],
          traps: [
            { spec: { type: "number", value: 72 }, feedback: "× 0.72 means you KEEP 72%. The decrease is what has been taken away." },
            { spec: { type: "number", value: 0.28 }, feedback: "0.28 is the decrease as a decimal. Write it as a percentage." },
          ],
          difficulty: "core",
          guideRef: "multipliers",
          hints: ["× 0.72 keeps what percentage of the number?", "What percentage has been taken away?"],
          strategy: "Read the multiplier",
        },
        {
          kind: "short",
          id: "percentages-p2-q11",
          question: "The price of a bowl of tau huay (soya beancurd) rose from $1.60 to $1.80. Find the percentage increase.",
          answer: { type: "number", value: 12.5, display: "12.5%" },
          solution: ["Increase = 1.80 − 1.60 = $0.20.", "Percentage increase = {{0.20/1.60}} × 100 = 0.125 × 100 = 12.5%."],
          traps: [
            {
              spec: { type: "number", value: 11.1, tolerance: 0.05 },
              feedback: "You divided by the new price, $1.80. A percentage change compares with the original price, $1.60.",
            },
            { spec: { type: "number", value: 20 }, feedback: "20 cents is the absolute increase. Write it as a percentage of the original $1.60." },
          ],
          commonError: "Dividing the change by the new price.",
          difficulty: "core",
          guideRef: "percentage-change",
          hints: ["Find the increase in dollars first.", "Divide the increase by the ORIGINAL price, then × 100."],
          strategy: "Compare with the original",
        },
        {
          kind: "written",
          id: "percentages-p2-q12",
          question:
            "A bank raises its savings interest rate from 2% to 3%.\n\nHana says, 'The interest rate went up by 1%.' Her brother Jun says, 'No — it went up by 50%.'\n\nWho is right? Explain carefully.",
          marks: 3,
          modelAnswer:
            "They are describing the same change in two different ways.\n\nThe rate went from 2% to 3%, a rise of 3 − 2 = 1 **percentage point**. That is an absolute change in the percentage. Hana means this, but she should say 'percentage point' rather than '1%'.\n\nAs a percentage change, the increase is {{1/2}} × 100 = 50% of the old rate — a relative change. Jun is right in this sense: the new rate is one and a half times the old one.\n\nSo Jun is correct about the percentage increase, and Hana is correct only if she means 1 percentage point.",
          markScheme: [
            { point: "The rate rose by 1 percentage point (3 − 2)", keywords: ["percentage point", "1 point", "points", "3 - 2", "3 − 2"] },
            { point: "As a percentage of the old rate, the increase is {{1/2}} × 100 = 50%", keywords: ["50%", "50", "1/2", "half"] },
            {
              point: "Both describe the change correctly in different ways (absolute vs relative); Hana should say percentage point",
              keywords: ["both", "relative", "absolute", "percentage point"],
            },
          ],
          commonError: "Mixing up percentage points (a difference of percentages) with percentage change.",
          difficulty: "core",
          guideRef: "percentage-change",
          hints: [
            "What is the difference between 3% and 2%?",
            "Now write that difference as a percentage of the ORIGINAL rate, 2%.",
            "Is each person measuring an absolute change or a relative one?",
          ],
          strategy: "Compare with the original",
        },
        {
          kind: "short",
          id: "percentages-p2-q13",
          question: "A laptop has lost 30% of its value since it was new. It is now worth $840. What was it worth when new?",
          answer: { type: "number", value: 1200, display: "$1200" },
          solution: [
            "After losing 30% it is worth 70% of its new value.",
            "New value × 0.7 = 840.",
            "New value = 840 ÷ 0.7 = $1200.",
            "Check: 30% of 1200 = 360, and 1200 − 360 = 840. ✓",
          ],
          traps: [
            {
              spec: { type: "number", value: 1092 },
              feedback: "You added 30% of $840 back on. But the 30% was of the ORIGINAL value, which is bigger. $840 is 70% of it — divide by 0.7.",
            },
            { spec: { type: "number", value: 588 }, feedback: "You took another 30% off. $840 is the value AFTER the loss; work backwards by dividing by 0.7." },
          ],
          commonError: "Adding the percentage back on to the reduced amount.",
          difficulty: "core",
          guideRef: "reverse-percentages",
          hints: ["$840 is what percentage of the value when new?", "100% − 30% = 70%, so new value × 0.7 = 840.", "Use the inverse: divide by 0.7."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "percentages-p2-q14",
          question: "A shop bought a rice cooker for $85. It had to sell it in a clearance sale for $68. Find the percentage loss.",
          answer: { type: "number", value: 20, display: "20%" },
          solution: ["Loss = 85 − 68 = $17.", "Percentage loss = {{17/85}} × 100 = 20% (a percentage of the cost price)."],
          traps: [
            { spec: { type: "number", value: 25 }, feedback: "You divided by the selling price ($68). Profit and loss are percentages of the COST price, $85." },
            { spec: { type: "number", value: 17 }, feedback: "$17 is the loss in dollars. Write it as a percentage of the cost price." },
          ],
          commonError: "Dividing the loss by the selling price instead of the cost price.",
          difficulty: "core",
          guideRef: "money-percentages",
          hints: ["Find the loss in dollars.", "Write the loss as a percentage of what the shop PAID."],
          strategy: "Compare with the original",
        },
        {
          kind: "short",
          id: "percentages-p2-q15",
          question:
            "Marcus invests $1200 in an account paying 3.5% simple interest per year. How many years will it take him to earn $210 in interest?",
          answer: { type: "number", value: 5, display: "5 years" },
          solution: ["Interest per year = 3.5% of 1200 = 0.035 × 1200 = $42.", "Number of years = 210 ÷ 42 = 5 years."],
          traps: [
            { spec: { type: "number", value: 17.5 }, feedback: "17.5% is the total interest as a percentage of $1200. Divide by the yearly rate, 3.5%, to find the number of years." },
          ],
          difficulty: "core",
          guideRef: "money-percentages",
          hints: ["How much interest does he earn in ONE year?", "Simple interest is the same each year. How many lots of $42 make $210?"],
          strategy: "Find one year, then scale",
        },
        {
          kind: "short",
          id: "percentages-p2-q16",
          question: "After a 15% increase, the number of members in the school choir is 46. How many members were there before the increase?",
          answer: { type: "number", value: 40 },
          solution: ["After a 15% increase there are 115% of the old number.", "Old number × 1.15 = 46.", "Old number = 46 ÷ 1.15 = 40 members."],
          traps: [
            {
              spec: { type: "number", value: 39.1 },
              feedback: "39.1 members isn't even possible! You took 15% of 46 off, but the 15% was of the smaller, old number. Divide by 1.15.",
            },
          ],
          commonError: "Taking 15% of the new amount off.",
          difficulty: "core",
          guideRef: "reverse-percentages",
          hints: ["Is 46 the number before or after the increase?", "46 is 115% of the old number.", "Divide by 1.15."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "percentages-p2-q17",
          question:
            "A shopkeeper prices blenders 60% above what she paid for them. In a sale, she takes 25% off that price. What percentage profit does she make on what she paid?",
          answer: { type: "number", value: 20, display: "20%" },
          solution: [
            "Marking up by 60% multiplies the cost by 1.6.",
            "Taking 25% off multiplies by 0.75.",
            "Overall: cost × 1.6 × 0.75 = cost × 1.2.",
            "× 1.2 means a 20% profit on the cost price.",
          ],
          solutions: [
            { label: "Try a cost of $100", steps: ["Cost $100 → marked price $160.", "25% off $160 is $40 off, so she sells it for $120.", "Profit $20 on a cost of $100 = 20%. Easy to follow; the multiplier method is quicker to write."] },
          ],
          traps: [
            { spec: { type: "number", value: 35 }, feedback: "60% − 25% = 35% doesn't work: the 25% is taken off the BIGGER marked price. Multiply the multipliers: 1.6 × 0.75." },
          ],
          commonError: "Subtracting the percentages instead of multiplying the multipliers.",
          difficulty: "challenge",
          guideRef: "money-percentages",
          hints: [
            "Try a cost price of $100.",
            "Write each step as a multiplier.",
            "Work out 1.6 × 0.75 and read it as a percentage change.",
          ],
          strategy: "Try a convenient number",
        },
        {
          kind: "written",
          id: "percentages-p2-q18",
          question:
            "The population of a new town grows by 10% every year. Ravi says, 'After 3 years the population will have grown by 30%.'\n\nExplain why Ravi is wrong, and find the actual percentage increase after 3 years.",
          marks: 3,
          modelAnswer:
            "Each year's 10% is worked out on the population at that time, which is bigger every year — not on the original population. So the yearly increases get bigger, and the total is more than 30%.\n\nEach year multiplies the population by 1.1, so after 3 years it is multiplied by 1.1 × 1.1 × 1.1 = {{1.1^3}} = 1.331.\n\nFor example, 1000 → 1100 → 1210 → 1331.\n\n× 1.331 is an increase of 33.1%, not 30%.",
          markScheme: [
            {
              point: "Explains that each 10% is of the current (bigger) population, not the original",
              keywords: ["current", "bigger", "each year", "not the original", "new population", "larger"],
            },
            { point: "Uses the multiplier 1.1 three times ({{1.1^3}} = 1.331, or 1000 → 1100 → 1210 → 1331)", keywords: ["1.1", "1.331", "1210", "1331", "1.1^3"] },
            { point: "Actual increase is 33.1%", keywords: ["33.1", "33.1%"] },
          ],
          commonError: "Adding repeated percentage changes as if they were simple interest.",
          difficulty: "challenge",
          guideRef: "repeated-change",
          hints: [
            "Try a population of 1000. What is it after 1 year? After 2 years?",
            "In year 2, 10% of 1100 is 110, not 100.",
            "Multiply by 1.1 three times.",
          ],
          strategy: "Try a convenient number",
        },
        {
          kind: "short",
          id: "percentages-p2-q19",
          question: "What percentage of the whole numbers from 1 to 200 (inclusive) are multiples of 3 or multiples of 5 (or both)?",
          answer: { type: "number", value: 46.5, display: "46.5%" },
          solution: [
            "Multiples of 3 up to 200: 200 ÷ 3 = 66.6…, so there are 66.",
            "Multiples of 5 up to 200: 200 ÷ 5 = 40.",
            "Multiples of 15 (both 3 and 5) have been counted twice: 200 ÷ 15 = 13.3…, so there are 13.",
            "Multiples of 3 or 5: 66 + 40 − 13 = 93.",
            "{{93/200}} = 0.465 = 46.5%.",
          ],
          traps: [
            {
              spec: { type: "number", value: 53 },
              feedback: "66 + 40 = 106 counts numbers like 15, 30 and 45 twice. Subtract the multiples of 15 once.",
            },
          ],
          commonError: "Forgetting that multiples of 15 are both multiples of 3 and of 5, so they get double-counted.",
          difficulty: "challenge",
          guideRef: "one-as-percentage-of-another",
          hints: [
            "Count the multiples of 3 and the multiples of 5 separately.",
            "Which numbers have you counted twice?",
            "Multiples of 15 are in both lists. Subtract them once, then write the total out of 200 as a percentage.",
          ],
          strategy: "Clever counting",
        },
        {
          kind: "written",
          id: "percentages-p2-q20",
          question:
            "Jug A holds 300 ml of a drink that is 20% orange juice. Jug B holds 200 ml of a drink that is 45% orange juice. Ethan pours both into one big jug and says, 'The mixture is {{(20 + 45)/2}} = 32.5% orange juice.'\n\n(a) Find the correct percentage of orange juice in the mixture.\n(b) Explain why Ethan's method is wrong, and say when his method would give the right answer.",
          marks: 4,
          modelAnswer:
            "(a) Orange juice in jug A: 20% of 300 ml = 60 ml. Orange juice in jug B: 45% of 200 ml = 90 ml.\n\nTotal orange juice = 60 + 90 = 150 ml in 300 + 200 = 500 ml of drink.\n\n{{150/500}} × 100 = 30% orange juice.\n\n(b) Ethan has averaged the two percentages as if the jugs held the same amount. But there is more of the weaker drink (300 ml against 200 ml), so the mixture is closer to 20% than to 45%. His method only works when the two volumes are equal.",
          markScheme: [
            { point: "Finds the orange juice in each jug: 60 ml and 90 ml", keywords: ["60", "90"] },
            { point: "Total orange juice 150 ml out of 500 ml", keywords: ["150", "500"] },
            { point: "Correct percentage: 30%", keywords: ["30%", "30"] },
            {
              point: "Explains averaging ignores the different amounts (more of the weaker drink); it only works when the volumes are equal",
              keywords: ["equal", "same amount", "more of", "different amounts", "weaker", "300"],
            },
          ],
          commonError: "Averaging percentages of different-sized amounts.",
          difficulty: "challenge",
          guideRef: "one-as-percentage-of-another",
          hints: [
            "How many ml of orange juice are in each jug?",
            "What is the total amount of orange juice, and the total amount of drink?",
            "Write the total orange juice as a percentage of the total drink.",
          ],
          strategy: "Part over whole, then × 100",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE — AoPS / UKMT-style problems needing insight
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "percentages-ch-q01",
      question:
        "Mei spends 20% of her money on a book. She then spends 25% of what is left on lunch at a hawker centre, and then a third of what is left after that on a gift. She has $24 left. How much money did she start with?",
      answer: { type: "number", value: 60, display: "$60" },
      solution: [
        "Use multipliers for the fraction she KEEPS each time.",
        "After the book she keeps 80%: × 0.8.",
        "After lunch she keeps 75% of that: × 0.75.",
        "After the gift she keeps {{2/3}} of that: × {{2/3}}.",
        "Overall she keeps 0.8 × 0.75 × {{2/3}} = 0.4 of her money, which is 40%.",
        "So start × 0.4 = 24, and start = 24 ÷ 0.4 = $60.",
      ],
      solutions: [
        {
          label: "Work backwards one step at a time",
          steps: [
            "$24 is {{2/3}} of what she had before the gift: 24 ÷ {{2/3}} = $36.",
            "$36 is 75% of what she had before lunch: 36 ÷ 0.75 = $48.",
            "$48 is 80% of her starting money: 48 ÷ 0.8 = $60.",
            "Check forwards: 60 → 48 → 36 → 24. ✓",
            "Both work. The single multiplier (× 0.4) is slicker once you see that the three 'keep' fractions simply multiply.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 48 },
          feedback: "You added a third, then 25%, then 20% back on. But each of those was a fraction of a BIGGER amount than the one you added it to. Divide by the fraction she kept instead.",
        },
      ],
      commonError: "Undoing each step by adding the percentage back on to the smaller amount.",
      difficulty: "challenge",
      guideRef: "reverse-percentages",
      hints: [
        "Start from the $24 at the end and work backwards.",
        "Before the gift, $24 was what fraction of her money?",
        "$24 is {{2/3}} of what she had before the gift, so divide by {{2/3}}.",
        "Or find the fraction she keeps overall: 0.8 × 0.75 × {{2/3}}.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "percentages-ch-q02",
      question:
        "In a chess club, exactly 6.25% of the members play the violin and exactly 35% have a brother or sister at the same school. What is the smallest possible number of members in the club?",
      answer: { type: "number", value: 80 },
      solution: [
        "6.25% = {{6.25/100 = 1/16}}. For {{1/16}} of the members to be a whole number, the number of members must be a multiple of 16.",
        "35% = {{35/100 = 7/20}}. Since 7 and 20 have no common factor, the number of members must be a multiple of 20.",
        "The smallest number that is a multiple of both 16 and 20 is LCM(16, 20) = 80.",
        "Check: 6.25% of 80 = 5 and 35% of 80 = 28 — both whole numbers. ✓",
      ],
      solutions: [
        {
          label: "Search the multiples",
          steps: [
            "For 6.25% to be a whole number of people, the club could have 16, 32, 48, 64, 80, … members.",
            "35% of each: 5.6, 11.2, 16.8, 22.4, 28 — the first whole number comes at 80.",
            "This works, but the fraction method is slicker: it turns the search into a single LCM.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 100 }, feedback: "100 works, but it isn't the smallest. A percentage doesn't need 100 people — write each percentage as a fraction in its simplest form." },
        { spec: { type: "number", value: 16 }, feedback: "With 16 members, 35% would be 5.6 people. The number must also make 35% a whole number." },
      ],
      commonError: "Assuming a percentage of people needs a group of 100.",
      difficulty: "challenge",
      guideRef: "fdp-conversions",
      hints: [
        "Write each percentage as a fraction in its simplest form.",
        "6.25% = {{1/16}}. What does that tell you about the number of members?",
        "35% = {{7/20}}. So the number of members must be a multiple of 16 AND a multiple of 20.",
        "Find the lowest common multiple of 16 and 20.",
      ],
      strategy: "Convert to fractions",
    },
    {
      kind: "short",
      id: "percentages-ch-q03",
      question:
        "At a school, 60% of the students are girls. 30% of the girls and 20% of the boys play in the school band. Altogether, 104 students play in the band. How many students are there in the school?",
      answer: { type: "number", value: 400 },
      solution: [
        "Girls in the band: 30% of 60% = 0.3 × 0.6 = 0.18, so 18% of the whole school.",
        "Boys are 40% of the school. Boys in the band: 20% of 40% = 0.2 × 0.4 = 0.08, so 8% of the school.",
        "Band members are 18% + 8% = 26% of the school.",
        "26% of the school is 104 students, so 1% is 104 ÷ 26 = 4 students and 100% is 400 students.",
        "Check: 240 girls and 160 boys; 30% of 240 = 72, 20% of 160 = 32, and 72 + 32 = 104. ✓",
      ],
      solutions: [
        {
          label: "Imagine a school of 100 students",
          steps: [
            "Suppose the school had exactly 100 students: 60 girls and 40 boys.",
            "Band: 30% of 60 = 18 girls and 20% of 40 = 8 boys, so 26 students.",
            "The real band has 104 = 4 × 26 students, so the real school is 4 × 100 = 400 students.",
            "This is slicker: choosing 100 turns every percentage into a plain number.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 416 },
          feedback: "You used 25%, the average of 30% and 20%. But there are more girls than boys, so the girls' 30% counts for more. Work out each group's share of the whole school.",
        },
      ],
      commonError: "Averaging the two percentages even though the groups are different sizes.",
      difficulty: "challenge",
      guideRef: "percentage-of-amount",
      hints: [
        "The 30% is a percentage of the GIRLS, not of the whole school.",
        "Try imagining a school of exactly 100 students. How many play in the band?",
        "Band members make up 26% of the school.",
        "If 26% is 104 students, what is 1%?",
      ],
      strategy: "Try a convenient number",
    },
    {
      kind: "short",
      id: "percentages-ch-q04",
      question:
        "A farmer has 100 kg of watermelons that are 99% water by mass. After a few hot days in the sun, some of the water evaporates and the watermelons are now 98% water. By what percentage has the total mass of the watermelons decreased?",
      answer: { type: "number", value: 50, display: "50%" },
      solution: [
        "Look for what does NOT change: the part that isn't water (the 'dry matter').",
        "At the start, 1% of 100 kg is dry matter: 1 kg.",
        "Afterwards the watermelons are 98% water, so that same 1 kg is now 2% of the total mass.",
        "If 2% is 1 kg, then 100% is 50 kg.",
        "The mass fell from 100 kg to 50 kg: a 50% decrease.",
      ],
      solutions: [
        {
          label: "Introduce a variable",
          steps: [
            "Let the new mass be M kg. The dry matter is still 1 kg.",
            "Dry matter is 2% of M: 0.02 × M = 1.",
            "M = 1 ÷ 0.02 = 50 kg, so the decrease is {{50/100}} × 100 = 50%.",
            "Both methods rest on the same invariant; spotting that 1 kg = 2% is quicker in your head.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 1 },
          feedback: "The water content fell by 1 percentage point, but that isn't the change in mass. What stays the same as the water evaporates?",
        },
      ],
      commonError: "Thinking a 1 percentage point drop in water content means a 1% drop in mass.",
      difficulty: "challenge",
      guideRef: "percentage-change",
      hints: [
        "Something about the watermelons does not change as the water evaporates. What?",
        "How many kilograms of non-water ('dry matter') are there at the start?",
        "After drying, the same dry matter is 2% of the new mass.",
        "If 1 kg is 2% of the new mass, what is the new mass?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "percentages-ch-q05",
      question:
        "In a Year 8 survey, 70% of students like maths, 80% like science and 90% like art. What is the smallest possible percentage of students who like all three subjects?",
      answer: { type: "number", value: 40, display: "40%" },
      solution: [
        "Think about the students who do NOT like each subject: 30% don't like maths, 20% don't like science and 10% don't like art.",
        "Anyone who doesn't like all three must be in at least one of these 'dislike' groups.",
        "Together those groups cover at most 30% + 20% + 10% = 60% of students (exactly 60% when nobody is in two of them).",
        "So at least 100% − 60% = 40% like all three.",
        "40% really can happen: with 100 students, let students 1–30 dislike maths, 31–50 dislike science and 51–60 dislike art. Students 61–100 like everything.",
      ],
      solutions: [
        {
          label: "Two subjects at a time",
          steps: [
            "Maths and science: 70% + 80% = 150%, so at least 150% − 100% = 50% like both.",
            "Now combine that 50% with the 90% who like art: 50% + 90% − 100% = 40% at least like all three.",
            "This works too, but counting the 'dislikers' is slicker because it handles all three subjects at once.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 70 }, feedback: "70% is the LARGEST possible overlap (if every maths fan also likes science and art). The question asks for the smallest." },
        {
          spec: { type: "number", value: 50.4, tolerance: 0.6 },
          feedback: "Multiplying 0.7 × 0.8 × 0.9 assumes the likes are independent of each other — nothing says that. Think about the extreme case where the 'dislike' groups don't overlap.",
        },
      ],
      commonError: "Finding the largest overlap instead of the smallest.",
      difficulty: "challenge",
      guideRef: "one-as-percentage-of-another",
      hints: [
        "Turn it round: what percentage does NOT like each subject?",
        "To make the 'all three' group as small as possible, the 'dislike' groups should overlap as little as possible.",
        "If nobody dislikes two subjects, what percentage dislikes at least one?",
        "30% + 20% + 10% = 60% dislike at least one subject.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "percentages-ch-q06",
      question:
        "In netball practice, Siti has scored 12 of her first 20 shots, a success rate of 60%. If she scores every shot from now on, how many more shots must she take to raise her success rate to exactly 75%?",
      answer: { type: "number", value: 12 },
      solution: [
        "Look for what stays the same: she has missed 8 shots, and if she scores every shot from now on she will still have missed exactly 8.",
        "At a 75% success rate, misses make up 25% of all her shots.",
        "If 8 misses are 25% of her shots, she has taken 8 × 4 = 32 shots in total.",
        "She has taken 20 so far, so she needs 32 − 20 = 12 more (all scored).",
        "Check: 12 + 12 = 24 scored out of 32, and {{24/32 = 3/4}} = 75%. ✓",
      ],
      solutions: [
        {
          label: "Form an equation",
          steps: [
            "After n more successful shots she has scored 12 + n out of 20 + n.",
            "{{(12 + n)/(20 + n) = 3/4}}",
            "4(12 + n) = 3(20 + n), so 48 + 4n = 60 + 3n, giving n = 12.",
            "The 'misses stay the same' method is slicker — no algebra needed.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 3 },
          feedback: "15 out of 20 would be 75% — but every extra shot also adds 1 to the total. With 3 more shots she has 15 out of 23, which is not 75%.",
        },
      ],
      commonError: "Forgetting that each new shot increases the total as well as the number scored.",
      difficulty: "challenge",
      guideRef: "one-as-percentage-of-another",
      hints: [
        "What stays the same while she scores every shot?",
        "She has missed 8 shots, and that number won't change.",
        "At a 75% success rate, what percentage of her shots are misses?",
        "8 misses make up 25% of all her shots. How many shots is that altogether?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "written",
      id: "percentages-ch-q07",
      question:
        "A 500 g box of granola usually costs $6. A supermarket has two offers:\n\n- **Offer A:** '20% extra free' — 600 g for $6.\n- **Offer B:** '20% off' — 500 g for $4.80.\n\n(a) Which offer is better value? Show working that would convince a friend.\n(b) What percentage 'extra free' would be exactly as good value as 20% off? Explain.",
      marks: 4,
      modelAnswer:
        "(a) Compare the cost of the same mass, 100 g.\n\nOffer A: $6 for 600 g, so 100 g costs 6 ÷ 6 = $1.00.\n\nOffer B: $4.80 for 500 g, so 100 g costs 4.80 ÷ 5 = $0.96.\n\nOffer B is better value (cheaper per 100 g).\n\n(b) At Offer B's price, $6 would buy 6 ÷ 0.96 × 100 = 625 g. That is 125 g more than 500 g, and {{125/500}} × 100 = 25%. So '25% extra free' is exactly as good as 20% off.\n\nThe reason: 20% off means paying × 0.8, and getting the same deal with extra free food means getting × {{1/0.8}} = × 1.25 as much — 25% extra.",
      markScheme: [
        { point: "Offer A costs $1.00 per 100 g (or equivalent unit price)", keywords: ["1.00", "$1", "600", "per 100"] },
        { point: "Offer B costs $0.96 per 100 g (or equivalent unit price)", keywords: ["0.96", "96", "4.80"] },
        { point: "Concludes Offer B is better value", keywords: ["offer b", "b is better", "20% off", "cheaper"] },
        { point: "25% extra free matches 20% off (625 g for $6, or {{1/0.8}} = 1.25)", keywords: ["25%", "25", "625", "1.25"] },
      ],
      solutions: [
        {
          label: "Using multipliers (works for any price)",
          steps: [
            "Offer A: you pay the same for 1.2 times as much, so the price per gram is multiplied by {{1/1.2}} ≈ 0.833 — about 16.7% off.",
            "Offer B: the price per gram is multiplied by 0.8 — 20% off.",
            "0.8 is less than 0.833, so Offer B is better.",
            "To match × 0.8 you need {{1/0.8}} = 1.25 times as much granola: 25% extra free.",
            "This is slicker than unit prices because it doesn't depend on the $6 price at all.",
          ],
        },
      ],
      commonError: "Thinking '20% extra free' and '20% off' are the same deal.",
      difficulty: "challenge",
      guideRef: "multipliers",
      hints: [
        "Compare like with like: find the cost of the same mass (say 100 g) in each offer.",
        "Offer A: $6 for 600 g. Offer B: $4.80 for 500 g.",
        "For (b): at Offer B's price, how many grams would $6 buy?",
        "$6 buys 625 g at Offer B's price. Compare 625 g with the usual 500 g.",
      ],
      strategy: "Compare unit prices",
    },
    {
      kind: "short",
      id: "percentages-ch-q08",
      question:
        "A music shop sells two second-hand guitars for $600 each. On one it makes a 20% profit and on the other it makes a 20% loss (each percentage is of what the shop paid for that guitar). Overall, what percentage loss does the shop make on the two guitars together?",
      answer: { type: "number", value: 4, display: "4% loss" },
      solution: [
        "Work backwards to each cost price.",
        "Profit guitar: cost × 1.2 = 600, so cost = 600 ÷ 1.2 = $500.",
        "Loss guitar: cost × 0.8 = 600, so cost = 600 ÷ 0.8 = $750.",
        "Total cost = 500 + 750 = $1250. Total takings = 600 + 600 = $1200.",
        "Loss = $50, and {{50/1250}} × 100 = 4%.",
      ],
      solutions: [
        {
          label: "Compare the dollar amounts",
          steps: [
            "The profit is 20% of $500 = $100. The loss is 20% of $750 = $150.",
            "The two 20%s are of different cost prices, so they can't cancel: the loss on the dearer guitar is $50 bigger.",
            "As a percentage of the total cost, $1250, that is 4%.",
            "The arithmetic is the same, but this view explains WHY the answer isn't 0%.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 0 },
          feedback: "The 20% profit and the 20% loss are percentages of DIFFERENT cost prices, so they don't cancel. Find each cost price first.",
        },
      ],
      commonError: "Assuming equal percentage profit and loss cancel out.",
      difficulty: "challenge",
      guideRef: "money-percentages",
      hints: [
        "Are the two 20%s percentages of the same amount?",
        "Work backwards to find what the shop paid for each guitar.",
        "Profit guitar: cost × 1.2 = 600. Loss guitar: cost × 0.8 = 600.",
        "Compare the total cost with the total takings of $1200.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "written",
      id: "percentages-ch-q09",
      question:
        "Choose any positive amount. Increase it by x%, then decrease the new amount by x%, where x is between 0 and 100.\n\n**Always, sometimes or never:** you end up with less than you started with?\n\nProve your answer, and find the overall percentage change when x = 30.",
      marks: 4,
      modelAnswer:
        "**Always.**\n\nExample: with x = 30, $100 → $130 → 130 − 39 = $91, which is less than $100.\n\nReason: the increase is x% of the original amount, but the decrease is x% of the new, *bigger* amount, so more is taken off than was added on.\n\nWith multipliers: × (1 + {{x/100}}) then × (1 − {{x/100}}) gives {{(1 + x/100)(1 - x/100) = 1 - (x/100)^2}}. Because x is not 0, {{(x/100)^2}} is positive, so the overall multiplier is always less than 1. (Doing the decrease first gives the same multiplier, so the order doesn't matter.)\n\nFor x = 30: 1.3 × 0.7 = 0.91, so the overall change is a 9% decrease. In general you lose {{(x^2)/100}} per cent.",
      markScheme: [
        { point: "States 'always'", keywords: ["always"] },
        { point: "Gives a correct numerical example (e.g. 100 → 130 → 91)", keywords: ["91", "130", "99", "110"] },
        {
          point: "General reason: the decrease is x% of a bigger amount, or the multiplier {{1 - (x/100)^2}} is less than 1",
          keywords: ["bigger amount", "larger", "less than 1", "squared", "(x/100)^2", "x^2"],
        },
        { point: "For x = 30: 1.3 × 0.7 = 0.91, a 9% decrease", keywords: ["9%", "0.91", "9"] },
      ],
      solutions: [
        {
          label: "Try small cases, then generalise",
          steps: [
            "x = 10: 1.1 × 0.9 = 0.99 — lose 1%.",
            "x = 20: 1.2 × 0.8 = 0.96 — lose 4%.",
            "x = 30: 1.3 × 0.7 = 0.91 — lose 9%.",
            "The losses are 1, 4, 9 — square numbers! Lose {{(x/10)^2}}% each time, which is never zero for x between 0 and 100.",
            "The pattern spots the rule quickly; the multiplier algebra proves it.",
          ],
        },
      ],
      commonError: "Assuming a rise and a fall of the same percentage cancel out.",
      difficulty: "challenge",
      guideRef: "repeated-change",
      hints: [
        "Try some values: x = 10, 20, 50. What happens each time?",
        "Compare the amount added with the amount taken off — each is a percentage of which amount?",
        "Write both changes as multipliers and multiply them.",
        "(1 + a)(1 − a) = 1 − a². What does that tell you when a is not 0?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "percentages-ch-q10",
      question:
        "A shop's sign says: '50% off — then a further 30% off at the till. That's 80% off!'\n\nZara pays $28 for a jumper in this sale. The shopkeeper says the jumper was originally $140, because $28 is 20% of $140.\n\nSpot the flaw, and find the jumper's true original price.",
      answer: { type: "number", value: 80, display: "$80" },
      solution: [
        "The flaw: the 30% comes off the already-halved price, not the original price, so the discounts don't add.",
        "Multipliers: × 0.5 then × 0.7 = × 0.35 overall. That is 65% off, not 80% off.",
        "Original × 0.35 = 28, so original = 28 ÷ 0.35 = $80.",
        "Check: half of $80 is $40; 30% off $40 is $12 off, leaving $28. ✓",
      ],
      solutions: [
        {
          label: "Work backwards",
          steps: [
            "$28 is 70% of the half price: 28 ÷ 0.7 = $40.",
            "$40 is 50% of the original price: 40 × 2 = $80.",
            "Equally quick here; the single multiplier × 0.35 is slicker when there are more steps.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 140 }, feedback: "That's the shopkeeper's flawed figure. The 30% is taken off the half price, so the total discount is not 80%. Combine the multipliers." },
        { spec: { type: "number", value: 56 }, feedback: "You've undone the 50% but not the 30%. $28 is the price after BOTH discounts." },
        { spec: { type: "number", value: 72.8 }, feedback: "Adding 30% of $28 back doesn't undo a 30% discount — the 30% was of a bigger price. Divide by 0.7 instead." },
      ],
      commonError: "Adding successive percentage discounts.",
      difficulty: "challenge",
      guideRef: "reverse-percentages",
      hints: [
        "Is '50% off, then 30% off' really 80% off? Try it on a $100 jumper.",
        "Write each discount as a multiplier and combine them.",
        "× 0.5 × 0.7 = × 0.35, so $28 is 35% of the original price.",
      ],
      strategy: "Spot the flaw",
    },
  ],
};
