import type { TopicPractice } from "../../types.ts";

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK-CHECK QUIZ — 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "fractions-quiz-q01",
      question: "Which of these is {{36/60}} written in its simplest form?",
      options: ["{{3/5}}", "{{6/10}}", "{{9/15}}", "{{5/3}}"],
      answerIndex: 0,
      explanation:
        "The HCF of 36 and 60 is 12: 36 ÷ 12 = 3 and 60 ÷ 12 = 5, so {{36/60 = 3/5}}. {{6/10}} and {{9/15}} are equivalent but not fully simplified — 6 and 10 still share a factor of 2, and 9 and 15 share a factor of 3. {{5/3}} is upside down: it is bigger than 1, but 36 is less than 60.",
      difficulty: "warmup",
      guideRef: "equivalence-ordering",
      hints: ["Find the highest common factor (HCF) of 36 and 60.", "Both 36 and 60 are in the 12 times table."],
      strategy: "Use the HCF",
    },
    {
      kind: "short",
      id: "fractions-quiz-q02",
      question: "Work out {{2/3 + 1/4}}. Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 11, d: 12, simplest: true },
      solution: ["The LCM of 3 and 4 is 12.", "{{2/3 = 8/12}} and {{1/4 = 3/12}}.", "{{8/12 + 3/12 = 11/12}}."],
      traps: [
        {
          spec: { type: "fraction", n: 3, d: 7 },
          feedback:
            "{{3/7}} comes from adding the tops and the bottoms. It can't be right: {{3/7}} is less than {{2/3}}, yet you added something on. Make the pieces the same size first.",
        },
      ],
      commonError: "Adding the denominators as well as the numerators.",
      difficulty: "warmup",
      guideRef: "adding-subtracting",
      hints: ["Thirds and quarters are different-sized pieces. What size of piece fits both?", "Use twelfths: rewrite each fraction over 12."],
      strategy: "Find a common denominator",
    },
    {
      kind: "short",
      id: "fractions-quiz-q03",
      question: "A hawker stall buys 96 kg of rice for the month. It uses {{3/8}} of the rice in the first week. How many kg of rice is that?",
      answer: { type: "number", value: 36, display: "36 kg" },
      solution: ["One eighth: 96 ÷ 8 = 12 kg.", "Three eighths: 3 × 12 = 36 kg."],
      traps: [
        {
          spec: { type: "number", value: 256 },
          feedback:
            "You divided by 3 and multiplied by 8. Divide by the denominator (8) to find one part, then multiply by the numerator (3).",
        },
      ],
      difficulty: "warmup",
      guideRef: "fractions-of-amounts",
      hints: ["What is {{1/8}} of 96?", "You need 3 of those eighths."],
      strategy: "Find one part first",
    },
    {
      kind: "mcq",
      id: "fractions-quiz-q04",
      question: "Which list is in order from smallest to largest?",
      options: [
        "{{-2/3}}, {{-3/4}}, {{1/2}}, {{3/5}}",
        "{{-3/4}}, {{-2/3}}, {{1/2}}, {{3/5}}",
        "{{-3/4}}, {{-2/3}}, {{3/5}}, {{1/2}}",
        "{{1/2}}, {{3/5}}, {{-2/3}}, {{-3/4}}",
      ],
      answerIndex: 1,
      explanation:
        "In twelfths, {{-3/4 = -9/12}} and {{-2/3 = -8/12}}; −9 twelfths is further left of zero, so {{-3/4}} is the smallest. In tenths, {{1/2 = 5/10}} and {{3/5 = 6/10}}, so {{1/2 < 3/5}}. The list starting {{-2/3}}, {{-3/4}} orders the negatives as if they were positive — for negatives the order flips. The list ending {{3/5}}, {{1/2}} assumes a bigger denominator always means a smaller fraction, which is only true when the numerators match. The list starting {{1/2}} ignores the minus signs completely.",
      difficulty: "core",
      guideRef: "equivalence-ordering",
      hints: [
        "Negatives first: which of {{-2/3}} and {{-3/4}} is further left of zero?",
        "Write {{2/3}} and {{3/4}} in twelfths — then remember the order flips for negatives.",
        "For the positives, write {{1/2}} and {{3/5}} in tenths.",
      ],
      strategy: "Draw a number line",
    },
    {
      kind: "short",
      id: "fractions-quiz-q05",
      question: "Work out {{4 × 2 3/5}}. Give your answer as a mixed number in its simplest form.",
      answer: { type: "fraction", n: 52, d: 5, simplest: true, form: "mixed" },
      solution: [
        "Estimate: 4 × 2.5 = 10, and {{2 3/5}} is a bit more than {{2 1/2}}, so expect a bit more than 10.",
        "Use the distributive law: {{4 × 2 3/5 = 4 × 2 + 4 × 3/5}}.",
        "{{= 8 + 12/5 = 8 + 2 2/5}}.",
        "{{= 10 2/5}}.",
      ],
      solutions: [
        {
          label: "Improper fractions",
          steps: ["{{2 3/5 = 13/5}}.", "{{4 × 13/5 = 52/5}}.", "52 ÷ 5 = 10 remainder 2, so {{52/5 = 10 2/5}}. Same answer; the distributive law keeps the numbers smaller."],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 43, d: 5 },
          feedback: "You multiplied the whole-number part only. The 4 multiplies the {{3/5}} as well: {{4 × 3/5 = 12/5}}.",
        },
      ],
      commonError: "Multiplying only the whole-number part: {{4 × 2 3/5}} is not {{8 3/5}}.",
      difficulty: "core",
      guideRef: "multiplying",
      hints: [
        "{{2 3/5}} means {{2 + 3/5}}. What does the 4 multiply?",
        "Work out {{4 × 2}} and {{4 × 3/5}} separately, then add.",
        "{{4 × 3/5 = 12/5}}, which is {{2 2/5}}.",
      ],
      strategy: "Use the distributive law",
    },
    {
      kind: "mcq",
      id: "fractions-quiz-q06",
      question: "Work out {{6 ÷ 2/5}}.",
      options: ["{{2 2/5}}", "{{3/5}}", "15", "{{1/15}}"],
      answerIndex: 2,
      explanation:
        "Division asks how many {{2/5}}s fit into 6. Each whole holds {{2 1/2}} of them, so 6 wholes hold 15: {{6 × 5/2 = 30/2 = 15}}. {{2 2/5}} comes from multiplying by {{2/5}} instead of dividing — dividing a positive number by a fraction less than 1 should give a *bigger* answer. {{3/5}} comes from dividing 6 by the numerator 2 but keeping the 5 as a denominator, and {{1/15}} from flipping the 6 instead of the {{2/5}}.",
      difficulty: "core",
      guideRef: "dividing",
      hints: ["How many {{2/5}}s fit into 1 whole?", "Keep the 6, change ÷ to ×, flip {{2/5}}.", "Work out {{6 × 5/2}}."],
      strategy: "Ask 'how many fit?'",
    },
    {
      kind: "short",
      id: "fractions-quiz-q07",
      question: "Write 40 minutes as a fraction of {{1 1/2}} hours. Give your answer in its simplest form.",
      answer: { type: "fraction", n: 4, d: 9, simplest: true },
      solution: [
        "Same units first: {{1 1/2}} hours = 90 minutes.",
        "40 minutes as a fraction of 90 minutes is {{40/90}}.",
        "Divide top and bottom by 10: {{4/9}}.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 4, d: 15 },
          feedback: "{{1 1/2}} hours is 90 minutes, not 150 — there are 60 minutes in an hour, not 100.",
        },
        {
          spec: { type: "fraction", n: 80, d: 3 },
          feedback: "You divided 40 by {{1 1/2}} without changing the units. Change {{1 1/2}} hours into minutes first.",
        },
      ],
      commonError: "Treating {{1 1/2}} hours as 150 minutes, or not changing to the same units.",
      difficulty: "core",
      guideRef: "fractions-of-amounts",
      hints: ["Both quantities must be in the same units. How many minutes is {{1 1/2}} hours?", "Write 40 over that number of minutes, then simplify."],
      strategy: "Same units first",
    },
    {
      kind: "short",
      id: "fractions-quiz-q08",
      question: "Work out {{5/6 - 2/3 × 3/4}}. Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 1, d: 3, simplest: true },
      solution: [
        "Multiplication comes before subtraction.",
        "{{2/3 × 3/4 = 6/12 = 1/2}}.",
        "{{5/6 - 1/2 = 5/6 - 3/6 = 2/6 = 1/3}}.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 1, d: 8 },
          feedback: "You subtracted first. Order of operations: multiply before you subtract, so work out {{2/3 × 3/4}} first.",
        },
      ],
      commonError: "Working left to right instead of multiplying first.",
      difficulty: "core",
      guideRef: "calculating-with-fractions",
      hints: [
        "Which operation comes first: − or ×?",
        "Work out {{2/3 × 3/4}} first — cancel the 3s.",
        "Then subtract {{1/2}} from {{5/6}} using sixths.",
      ],
      strategy: "Order of operations",
    },
    {
      kind: "mcq",
      id: "fractions-quiz-q09",
      question: "Work out {{5 1/8 - 2 5/6}}.",
      options: ["{{3 17/24}}", "{{3 7/24}}", "{{2 17/24}}", "{{2 7/24}}"],
      answerIndex: 3,
      explanation:
        "Over 24: {{5 3/24 - 2 20/24}}. Since {{3/24}} is smaller than {{20/24}}, borrow a whole: {{4 27/24 - 2 20/24 = 2 7/24}}. Estimate check: about 5 − 3 = 2, and {{2 5/6}} was rounded up, so the answer is a bit more than 2. {{3 17/24}} comes from subtracting the fraction parts the wrong way round ({{20/24 - 3/24}}). {{3 7/24}} borrows the {{24/24}} but forgets to take 1 from the 5. {{2 17/24}} takes 1 from the 5 but then still subtracts the fraction parts the wrong way round ({{20/24 - 3/24}}).",
      difficulty: "core",
      guideRef: "adding-subtracting",
      hints: [
        "Estimate first: is the answer nearer 2 or 3?",
        "Write both fraction parts over 24.",
        "{{3/24}} is smaller than {{20/24}}, so borrow 1 whole from the 5.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "written",
      id: "fractions-quiz-q10",
      question:
        "Always, sometimes or never?\n\n> When you divide a positive number by a fraction, the answer is bigger than the number you started with.\n\nDecide, give examples to support your decision, and explain *when* the answer gets bigger.",
      marks: 4,
      modelAnswer:
        "**Sometimes.** For example, {{6 ÷ 1/2 = 12}}, which is bigger than 6, because two halves fit into every whole. But {{6 ÷ 3/2 = 6 × 2/3 = 4}}, which is smaller than 6. (And {{6 ÷ 4/4 = 6}} stays the same.)\n\nDivision asks 'how many of these fit?'. If the fraction is less than 1 (a proper fraction), more than one copy fits into each whole, so the answer is bigger. If the fraction is more than 1 (an improper fraction), less than one copy fits into each whole, so the answer is smaller. Another way to say it: dividing by {{a/b}} is multiplying by {{b/a}}, and {{b/a}} is bigger than 1 exactly when {{a/b}} is less than 1.",
      markScheme: [
        { point: "States 'sometimes'.", keywords: ["sometimes"] },
        { point: "An example where the answer is bigger, e.g. {{6 ÷ 1/2 = 12}}.", keywords: ["bigger", "larger", "12", "1/2", "half"] },
        { point: "A counter-example where it is smaller (or equal), e.g. {{6 ÷ 3/2 = 4}}.", keywords: ["smaller", "3/2", "improper", "counter", "= 4"] },
        {
          point: "Explains when: the answer is bigger exactly when the fraction is less than 1 (more than one copy fits in each whole, or its reciprocal is more than 1).",
          keywords: ["less than 1", "proper", "reciprocal", "more than 1", "fit"],
        },
      ],
      commonError: "Answering 'always' after testing only fractions less than 1, such as halves and quarters.",
      difficulty: "challenge",
      guideRef: "dividing",
      hints: [
        "Try {{6 ÷ 1/2}}. Then try {{6 ÷ 3/2}}.",
        "Think 'how many fit?': how many halves fit into 6? How many lots of {{1 1/2}}?",
        "What decides it is whether the fraction is less than 1 or more than 1.",
      ],
      strategy: "Look for a counter-example",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS — 16 short + 4 written each; ≈ 5 warmup, 11–12 core, 3–4 challenge
  // ===========================================================================
  papers: [
    {
      id: "fractions-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "fractions-p1-q01",
          question: "Write {{56/84}} in its simplest form.",
          answer: { type: "fraction", n: 2, d: 3, simplest: true },
          solution: [
            "56 = 2 × 2 × 2 × 7 and 84 = 2 × 2 × 3 × 7, so the HCF is 2 × 2 × 7 = 28.",
            "{{56/84 = (56 ÷ 28)/(84 ÷ 28) = 2/3}}.",
          ],
          solutions: [
            { label: "Cancel in stages", steps: ["÷ 2: {{28/42}}.", "÷ 2 again: {{14/21}}.", "÷ 7: {{2/3}}. Slower than using the HCF, but you get there."] },
          ],
          commonError: "Stopping too early, e.g. at {{14/21}}, which still has a common factor of 7.",
          difficulty: "warmup",
          guideRef: "equivalence-ordering",
          hints: ["Find the highest common factor of 56 and 84 — or cancel step by step.", "Both 56 and 84 are multiples of 28."],
          strategy: "Use the HCF",
        },
        {
          kind: "short",
          id: "fractions-p1-q02",
          question: "Work out {{3/5 + 1/4}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 17, d: 20, simplest: true },
          solution: ["The LCM of 5 and 4 is 20.", "{{3/5 = 12/20}} and {{1/4 = 5/20}}.", "{{12/20 + 5/20 = 17/20}}."],
          traps: [
            {
              spec: { type: "fraction", n: 4, d: 9 },
              feedback: "{{4/9}} comes from adding tops and bottoms — and it is less than {{3/5}}, which can't be right. Rewrite both fractions in twentieths first.",
            },
          ],
          difficulty: "warmup",
          guideRef: "adding-subtracting",
          hints: ["What denominator works for both fifths and quarters?", "Rewrite both fractions in twentieths."],
          strategy: "Find a common denominator",
        },
        {
          kind: "short",
          id: "fractions-p1-q03",
          question: "Work out {{4/7 × 14/15}}. Give your answer in its simplest form.",
          answer: { type: "fraction", n: 8, d: 15, simplest: true },
          solution: ["Cancel first: 14 and 7 share a factor of 7, so 14 becomes 2 and 7 becomes 1.", "{{4/1 × 2/15 = 8/15}}."],
          traps: [
            {
              spec: { type: "fraction", n: 30, d: 49 },
              feedback: "That's {{4/7 ÷ 14/15}}. To multiply, multiply top × top and bottom × bottom — no flipping.",
            },
          ],
          difficulty: "warmup",
          guideRef: "multiplying",
          hints: ["Multiply the numerators and multiply the denominators — but look for a factor to cancel first.", "7 goes into 14."],
          strategy: "Cancel before you multiply",
        },
        {
          kind: "short",
          id: "fractions-p1-q04",
          question: "Write down the reciprocal of {{2 3/4}}. Give your answer as a fraction.",
          answer: { type: "fraction", n: 4, d: 11 },
          solution: [
            "Change to an improper fraction: {{2 3/4 = (2 × 4 + 3)/4 = 11/4}}.",
            "Flip it: the reciprocal is {{4/11}}.",
            "Check: {{11/4 × 4/11 = 1}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 10, d: 3 },
              feedback: "Only the fraction part was flipped. Change {{2 3/4}} to an improper fraction first, then flip the whole thing.",
            },
            {
              spec: { type: "fraction", n: 11, d: 4 },
              feedback: "That's {{2 3/4}} written as an improper fraction. The reciprocal is that fraction flipped upside down.",
            },
          ],
          difficulty: "warmup",
          guideRef: "dividing",
          hints: ["A number multiplied by its reciprocal equals 1.", "Write {{2 3/4}} as an improper fraction before flipping."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "fractions-p1-q05",
          question: "Find {{7/12}} of 3 hours. Give your answer in minutes.",
          answer: { type: "number", value: 105, display: "105 minutes" },
          solution: ["3 hours = 180 minutes.", "One twelfth: 180 ÷ 12 = 15 minutes.", "Seven twelfths: 7 × 15 = 105 minutes."],
          traps: [
            {
              spec: { type: "number", value: 1.75 },
              feedback: "{{1 3/4}} hours is the right amount of time — but the question asks for minutes. Change it into minutes.",
            },
          ],
          difficulty: "warmup",
          guideRef: "fractions-of-amounts",
          hints: ["Change 3 hours into minutes first.", "Find {{1/12}} of that, then multiply by 7."],
          strategy: "Same units first",
        },
        {
          kind: "short",
          id: "fractions-p1-q06",
          question:
            "Write {{-5/6}}, {{-4/5}} and {{-7/8}} in order, **smallest first**. Type the three fractions separated by commas.",
          answer: { type: "list", values: [-7 / 8, -5 / 6, -4 / 5], ordered: true, display: "{{-7/8}}, {{-5/6}}, {{-4/5}}" },
          solution: [
            "First order the positive versions. The LCM of 6, 5 and 8 is 120.",
            "{{5/6 = 100/120}}, {{4/5 = 96/120}}, {{7/8 = 105/120}}, so {{4/5 < 5/6 < 7/8}}.",
            "For negatives the order flips: {{-7/8 < -5/6 < -4/5}}.",
          ],
          solutions: [
            {
              label: "Distance from −1",
              steps: [
                "{{-7/8}} is {{1/8}} away from −1, {{-5/6}} is {{1/6}} away and {{-4/5}} is {{1/5}} away.",
                "The one closest to −1 is the smallest, and {{1/8}} is the smallest gap.",
                "So {{-7/8 < -5/6 < -4/5}}. No big common denominator needed — this is quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "list", values: [-4 / 5, -5 / 6, -7 / 8], ordered: true },
              feedback:
                "That's the right order for the positive fractions {{4/5}}, {{5/6}}, {{7/8}}. For negatives the order flips: the fraction furthest from zero is the smallest.",
            },
          ],
          commonError: "Ordering the negatives as if they were positive.",
          difficulty: "core",
          guideRef: "equivalence-ordering",
          hints: [
            "First put {{4/5}}, {{5/6}} and {{7/8}} in order as positive numbers.",
            "Each one is one piece short of 1. Which has the smallest missing piece?",
            "Now remember: for negatives the order flips.",
          ],
          strategy: "Draw a number line",
        },
        {
          kind: "short",
          id: "fractions-p1-q07",
          question: "Work out {{6 1/4 - 2 5/6}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 41, d: 12, simplest: true, form: "mixed" },
          solution: [
            "Estimate: about 6 − 3 = 3, a bit more because {{2 5/6}} was rounded up.",
            "Common denominator 12: {{6 3/12 - 2 10/12}}.",
            "{{3/12}} is smaller than {{10/12}}, so borrow 1 whole: {{6 3/12 = 5 15/12}}.",
            "{{5 15/12 - 2 10/12 = 3 5/12}}.",
          ],
          solutions: [
            {
              label: "Count up",
              steps: [
                "From {{2 5/6}} up to 3 is {{1/6}}.",
                "From 3 up to 6 is 3.",
                "From 6 up to {{6 1/4}} is {{1/4}}.",
                "Total: {{3 + 1/6 + 1/4 = 3 + 2/12 + 3/12 = 3 5/12}}. No borrowing needed, so this is often quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 55, d: 12 },
              feedback: "You took {{3/12}} away from {{10/12}} — the wrong way round. Borrow 1 whole first: {{6 3/12 = 5 15/12}}.",
            },
            {
              spec: { type: "fraction", n: 53, d: 12 },
              feedback: "You borrowed {{12/12}} but didn't take 1 off the 6. After borrowing, {{6 3/12}} becomes {{5 15/12}}.",
            },
          ],
          difficulty: "core",
          guideRef: "adding-subtracting",
          hints: [
            "Estimate first: roughly 6 − 3.",
            "Write both fraction parts in twelfths.",
            "{{3/12}} is less than {{10/12}} — borrow a whole from the 6.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "fractions-p1-q08",
          question: "Work out {{2 1/3 × 1 4/5}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 21, d: 5, simplest: true, form: "mixed" },
          solution: [
            "Estimate: about 2 × 2 = 4.",
            "Improper fractions: {{2 1/3 = 7/3}} and {{1 4/5 = 9/5}}.",
            "Cancel the 3 into the 9: {{7/1 × 3/5 = 21/5}}.",
            "{{21/5 = 4 1/5}} — close to the estimate.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 34, d: 15 },
              feedback:
                "You multiplied the wholes (2 × 1) and the fraction parts ({{1/3 × 4/5}}) separately, which misses the cross terms. Change both numbers to improper fractions first.",
            },
          ],
          commonError: "Multiplying whole numbers and fraction parts separately.",
          difficulty: "core",
          guideRef: "multiplying",
          hints: [
            "Mixed × mixed: what should you do to both numbers first?",
            "{{2 1/3 = 7/3}} and {{1 4/5 = 9/5}}.",
            "Cancel 3 with 9 before multiplying.",
          ],
          strategy: "Convert to improper fractions",
        },
        {
          kind: "short",
          id: "fractions-p1-q09",
          question: "Work out {{3 3/4 ÷ 2 1/2}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 3, d: 2, simplest: true, form: "mixed" },
          solution: [
            "Estimate: about 4 ÷ 2.5, so a bit more than 1.",
            "Improper fractions: {{15/4 ÷ 5/2}}.",
            "Keep, change, flip: {{15/4 × 2/5}}.",
            "Cancel 15 with 5 and 2 with 4: {{3/2 × 1/1 = 3/2 = 1 1/2}}.",
          ],
          solutions: [
            {
              label: "Common denominator",
              steps: [
                "In quarters: {{15/4 ÷ 10/4}}.",
                "The pieces are the same size, so just divide the numerators: {{15 ÷ 10 = 1 1/2}}. Slick when one denominator is a multiple of the other.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 75, d: 8 },
              feedback: "You multiplied instead of dividing. Flip the divisor {{5/2}} before multiplying.",
            },
            {
              spec: { type: "fraction", n: 2, d: 3 },
              feedback: "You flipped the first number instead of the second. Keep the first, flip the divisor.",
            },
          ],
          difficulty: "core",
          guideRef: "dividing",
          hints: [
            "Change both mixed numbers into improper fractions.",
            "Keep the first, change ÷ to ×, and flip the second.",
            "{{15/4 × 2/5}} — cancel before you multiply.",
          ],
          strategy: "Keep, Change, Flip",
        },
        {
          kind: "short",
          id: "fractions-p1-q10",
          question:
            "A durian stall sold 240 durians last weekend and 400 durians this weekend. Write this weekend's sales as a fraction of last weekend's sales. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 5, d: 3, simplest: true, form: "mixed" },
          solution: [
            "This weekend as a fraction of last weekend: {{400/240}}.",
            "Divide top and bottom by 80: {{5/3}}.",
            "{{5/3 = 1 2/3}}: this weekend's sales were {{1 2/3}} times last weekend's.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 3, d: 5 },
              feedback: "That's last weekend as a fraction of this weekend. 'A as a fraction of B' is {{A/B}}, so this weekend's 400 goes on top.",
            },
          ],
          difficulty: "core",
          guideRef: "fractions-of-amounts",
          hints: [
            "Which number goes on top: the one you are describing, or the one you are comparing with?",
            "Write {{400/240}} and simplify — the HCF is 80.",
            "Sales went up, so the answer should be bigger than 1.",
          ],
          strategy: "Translate the words",
        },
        {
          kind: "written",
          id: "fractions-p1-q11",
          question:
            "Marcus writes: {{4 1/5 - 1 7/8 = 3 27/40}}.\n\n(a) Without working out the exact answer, explain how an estimate shows that Marcus must be wrong, and suggest what mistake he made.\n\n(b) Find the correct answer as a mixed number, showing your method.",
          marks: 4,
          modelAnswer:
            "(a) {{4 1/5}} is about 4 and {{1 7/8}} is about 2, so the answer should be about 4 − 2 = 2. Marcus's answer is nearly 4, which is far too big. His mistake: because {{1/5}} is smaller than {{7/8}}, he subtracted the fraction parts the wrong way round ({{35/40 - 8/40 = 27/40}}).\n\n(b) Over 40: {{4 8/40 - 1 35/40}}. Borrow 1 whole: {{4 8/40 = 3 48/40}}. Then {{3 48/40 - 1 35/40 = 2 13/40}}.",
          markScheme: [
            { point: "Estimates about 2 (e.g. 4 − 2), so {{3 27/40}} is too big.", keywords: ["estimate", "about 2", "4 - 2", "too big", "too large"] },
            { point: "Identifies the error: the fraction parts were subtracted the wrong way round (borrowing was needed).", keywords: ["wrong way", "borrow", "backwards", "smaller", "35/40 - 8/40"] },
            {
              point: "Writes both over 40 and borrows, {{3 48/40 - 1 35/40}} (or uses improper fractions {{168/40 - 75/40}}).",
              keywords: ["48/40", "168/40", "75/40", "40"],
            },
            { point: "Correct answer {{2 13/40}}.", keywords: ["2 13/40", "93/40", "2.325"] },
          ],
          commonError: "Always taking the smaller fraction part from the bigger one, whatever the order.",
          difficulty: "core",
          guideRef: "adding-subtracting",
          hints: [
            "Round each mixed number to the nearest whole number.",
            "Compare {{1/5}} and {{7/8}}. Which is bigger? What does that mean when you subtract?",
            "Use 40ths and borrow a whole from the 4.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "fractions-p1-q12",
          question: "In a school orchestra, {{4/7}} of the members are girls. There are 36 girls. How many boys are in the orchestra?",
          answer: { type: "number", value: 27 },
          solution: [
            "Draw a bar of 7 equal boxes: 4 boxes are girls, 3 boxes are boys.",
            "4 boxes = 36, so 1 box = 36 ÷ 4 = 9.",
            "Boys = 3 boxes = 3 × 9 = 27.",
          ],
          solutions: [
            {
              label: "Find the whole first",
              steps: ["Whole orchestra: {{36 ÷ 4/7 = 36 × 7/4 = 63}}.", "Boys: 63 − 36 = 27. One step longer than the bar model."],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 63 },
              feedback: "63 is the whole orchestra. The question asks for the boys — the other {{3/7}}.",
            },
          ],
          difficulty: "core",
          guideRef: "fractions-of-amounts",
          hints: [
            "Draw a bar split into 7 equal boxes. How many boxes are girls?",
            "4 boxes are worth 36. What is one box worth?",
            "The boys fill the other 3 boxes.",
          ],
          strategy: "Use a bar model",
        },
        {
          kind: "short",
          id: "fractions-p1-q13",
          question: "Work out {{(2/3)^2 + 5/6 ÷ 1 1/4}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 10, d: 9, simplest: true, form: "mixed" },
          solution: [
            "Powers first: {{(2/3)^2 = 4/9}}.",
            "Then the division: {{5/6 ÷ 1 1/4 = 5/6 ÷ 5/4 = 5/6 × 4/5 = 4/6 = 2/3}}.",
            "Finally add: {{4/9 + 2/3 = 4/9 + 6/9 = 10/9}}.",
            "{{10/9 = 1 1/9}}.",
          ],
          traps: [
            {
              spec: { type: "number", value: 2 },
              feedback: "{{(2/3)^2}} means {{2/3 × 2/3 = 4/9}} — square the bottom as well as the top.",
            },
            {
              spec: { type: "fraction", n: 46, d: 45 },
              feedback: "You added before dividing. Order of operations: powers, then ÷, then +.",
            },
          ],
          difficulty: "core",
          guideRef: "calculating-with-fractions",
          hints: [
            "Which comes first: the power, the division or the addition?",
            "{{(2/3)^2 = 2/3 × 2/3}}. For the division, write {{1 1/4}} as {{5/4}} and flip it.",
            "You should reach {{4/9 + 2/3}}. Use ninths.",
          ],
          strategy: "Order of operations",
        },
        {
          kind: "short",
          id: "fractions-p1-q14",
          question: "Use the distributive law to work out {{3/8 × 27 + 3/8 × 13}} without a calculator.",
          answer: { type: "number", value: 15 },
          solution: [
            "Both terms are {{3/8}} times something, so take it out as a common factor: {{3/8 × (27 + 13)}}.",
            "27 + 13 = 40.",
            "{{3/8 × 40 = 3 × 5 = 15}}.",
          ],
          solutions: [
            {
              label: "The long way",
              steps: [
                "{{3/8 × 27 = 81/8}} and {{3/8 × 13 = 39/8}}.",
                "{{81/8 + 39/8 = 120/8 = 15}}. Same answer, but messier — spotting the common factor is quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 30 },
              feedback: "You added the two {{3/8}}s as well. The distributive law gives {{3/8 × (27 + 13)}}, with just one {{3/8}}.",
            },
          ],
          difficulty: "core",
          guideRef: "calculating-with-fractions",
          hints: ["What do the two parts have in common?", "{{a × b + a × c = a × (b + c)}}.", "Work out {{3/8 × 40}}."],
          strategy: "Look for structure before calculating",
        },
        {
          kind: "written",
          id: "fractions-p1-q15",
          question:
            "Zara and Ethan both work out {{3/4 ÷ 3/8}}.\n\n- **Zara** writes both fractions in eighths: {{6/8 ÷ 3/8 = 6 ÷ 3 = 2}}.\n- **Ethan** uses Keep, Change, Flip.\n\nShow Ethan's method, and explain why Zara's method also works.",
          marks: 3,
          modelAnswer:
            "Ethan: {{3/4 ÷ 3/8 = 3/4 × 8/3 = 24/12 = 2}}.\n\nZara's method works because division asks 'how many {{3/8}}s fit into {{3/4}}?'. Once both fractions are written in eighths, the pieces are the same size, so the question becomes 'how many lots of 3 eighths fit into 6 eighths?' — and that is just 6 ÷ 3 = 2. Both methods give 2.",
          markScheme: [
            { point: "Ethan's method: {{3/4 × 8/3}} (only the divisor is flipped).", keywords: ["8/3", "flip", "reciprocal", "x 8/3", "× 8/3"] },
            { point: "Correct answer 2 from the multiplication, e.g. {{24/12 = 2}}.", keywords: ["24/12", "= 2", "2"] },
            {
              point: "Explains Zara's method: with the same denominator the pieces are the same size, so dividing the numerators counts how many 3 eighths fit into 6 eighths.",
              keywords: ["same size", "same denominator", "how many", "fit", "eighths", "6 ÷ 3"],
            },
          ],
          difficulty: "core",
          guideRef: "dividing",
          hints: [
            "For Ethan: keep {{3/4}}, change ÷ to ×, flip {{3/8}}.",
            "For Zara: think of division as 'how many fit?'. What does writing both in eighths do to the size of the pieces?",
          ],
          strategy: "Ask 'how many fit?'",
        },
        {
          kind: "short",
          id: "fractions-p1-q16",
          question: "Simplify {{(3x)/4 × 8/(9x)}}, where {{x != 0}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 2, d: 3, simplest: true },
          solution: [
            "The {{x}} on the top and the {{x}} on the bottom are common factors, so they cancel.",
            "Cancel 3 with 9 (÷ 3) and 8 with 4 (÷ 4): {{1/1 × 2/3}}.",
            "So the answer is {{2/3}}.",
            "Check with {{x = 1}}: {{3/4 × 8/9 = 24/36 = 2/3}} ✓.",
          ],
          commonError: "Leaving an {{x}} in the answer — the {{x}} on top and the {{x}} on the bottom cancel completely.",
          difficulty: "core",
          guideRef: "algebraic-fractions",
          hints: [
            "Letters cancel just like numbers when they are factors of the top and the bottom.",
            "Cancel the {{x}}s, then cancel 3 with 9 and 8 with 4.",
            "Check your answer by putting {{x = 1}}.",
          ],
          strategy: "Cancel before you multiply",
        },
        {
          kind: "short",
          id: "fractions-p1-q17",
          question: "Find the fraction exactly halfway between {{-2/3}} and {{1/4}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: -5, d: 24, simplest: true },
          solution: [
            "Halfway between two numbers is their mean: add them, then halve.",
            "In twelfths: {{-2/3 + 1/4 = -8/12 + 3/12 = -5/12}}.",
            "Halve: {{-5/12 ÷ 2 = -5/24}}.",
            "Check in 24ths: {{-2/3 = -16/24}} and {{1/4 = 6/24}}. From −16 to −5 is 11, and from −5 to 6 is 11 ✓.",
          ],
          solutions: [
            {
              label: "Halve the gap",
              steps: [
                "In 24ths the two points are at −16 and 6.",
                "The gap is 6 − (−16) = 22 twenty-fourths.",
                "Half the gap is 11, so the midpoint is −16 + 11 = −5, i.e. {{-5/24}}. Working in 24ths from the start avoids halving a fraction.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: -5, d: 12 },
              feedback: "That's the sum of the two fractions. Halfway means the mean: add them, then halve.",
            },
            {
              spec: { type: "fraction", n: 11, d: 24 },
              feedback: "That's halfway between {{2/3}} and {{1/4}}. Check the minus sign on {{-2/3}}.",
            },
          ],
          difficulty: "core",
          guideRef: "equivalence-ordering",
          hints: [
            "How do you find the number halfway between, say, 4 and 10?",
            "Add {{-2/3}} and {{1/4}} over a common denominator, then halve.",
            "To halve a fraction, double its denominator.",
          ],
          strategy: "Use the mean",
        },
        {
          kind: "written",
          id: "fractions-p1-q18",
          question: "A water tank is {{3/5}} full. After 24 litres are used, it is {{1/3}} full. Show that the tank holds 90 litres when it is full.",
          marks: 4,
          modelAnswer:
            "The 24 litres used is the difference between the two fractions of the tank: {{3/5 - 1/3 = 9/15 - 5/15 = 4/15}}. So {{4/15}} of the tank is 24 litres. Then {{1/15}} of the tank is 24 ÷ 4 = 6 litres, and the full tank ({{15/15}}) is 15 × 6 = 90 litres.\n\nCheck: {{3/5}} of 90 is 54 litres; 54 − 24 = 30 litres, which is {{1/3}} of 90 ✓.",
          markScheme: [
            { point: "Recognises that 24 litres is the difference {{3/5 - 1/3}} of the tank.", keywords: ["3/5 - 1/3", "difference", "subtract"] },
            { point: "Uses a common denominator: {{3/5 - 1/3 = 4/15}}.", keywords: ["4/15", "9/15", "5/15", "15"] },
            { point: "Finds {{1/15}} of the tank = 6 litres (24 ÷ 4).", keywords: ["6", "24 ÷ 4", "24/4", "1/15"] },
            { point: "Full tank = 15 × 6 = 90 litres (or a full check, e.g. 54 − 24 = 30).", keywords: ["90", "15 × 6", "15 x 6", "54", "30"] },
          ],
          solutions: [
            {
              label: "Introduce a variable",
              steps: [
                "Let the tank hold {{T}} litres.",
                "{{3/5 T - 24 = 1/3 T}}.",
                "{{3/5 T - 1/3 T = 24}}, so {{4/15 T = 24}}.",
                "{{T = 24 × 15/4 = 90}}. The bar-model reasoning is the same calculation without the letters.",
              ],
            },
          ],
          commonError: "Treating the 24 litres as {{3/5}} or as {{1/3}} of the tank, instead of the difference between them.",
          difficulty: "challenge",
          guideRef: "fractions-of-amounts",
          hints: [
            "What fraction of the tank do the 24 litres represent?",
            "Work out {{3/5 - 1/3}} using fifteenths.",
            "If {{4/15}} of the tank is 24 litres, what is {{1/15}}?",
          ],
          strategy: "Use a bar model",
        },
        {
          kind: "short",
          id: "fractions-p1-q19",
          question:
            "Jun spends {{1/4}} of his pocket money on MRT fares. He spends {{2/5}} of what is left on a book, and then {{1/3}} of what is left after that on snacks. He has $12 left. How much pocket money did he start with?",
          answer: { type: "number", value: 40, display: "$40" },
          solution: [
            "After the fares, {{3/4}} of his money is left.",
            "The book uses {{2/5}} of that, so {{3/5}} of it is left: {{3/5 × 3/4 = 9/20}} of his money.",
            "Snacks use {{1/3}} of that, leaving {{2/3}} of it: {{2/3 × 9/20 = 3/10}} of his money.",
            "{{3/10}} of his money is $12, so {{1/10}} is $4 and all of it is $40.",
            "Check: $40 → fares $10 → $30 left → book $12 → $18 left → snacks $6 → $12 left ✓.",
          ],
          solutions: [
            {
              label: "Work backwards",
              steps: [
                "$12 is the {{2/3}} left after snacks, so before snacks he had 12 ÷ 2 × 3 = $18.",
                "$18 is the {{3/5}} left after the book, so before the book he had 18 ÷ 3 × 5 = $30.",
                "$30 is the {{3/4}} left after the fares, so he started with 30 ÷ 3 × 4 = $40.",
                "Working backwards is slicker here: no fractions of fractions, just whole-number steps.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 720 },
              feedback:
                "Each fraction is a fraction of what is *left* at that point, not of the original amount — so you can't just add {{1/4 + 2/5 + 1/3}}.",
            },
          ],
          difficulty: "challenge",
          guideRef: "calculating-with-fractions",
          hints: [
            "Each fraction is a fraction of what is *left*. After the fares, what fraction remains?",
            "Try working backwards from the $12. The $12 is what fraction of the money he had just before buying snacks?",
            "$12 is {{2/3}} of the money he had before the snacks. Keep undoing, one step at a time.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "fractions-p1-q20",
          question:
            "Arjun works out {{1/2 ÷ 1/4 ÷ 1/2}} like this: 'First {{1/4 ÷ 1/2 = 1/2}}. Then {{1/2 ÷ 1/2 = 1}}. Answer: 1.'\n\nIs Arjun right? Find the correct value and explain his mistake. Then say whether the order you work in would matter if every ÷ were a × instead.",
          marks: 4,
          modelAnswer:
            "Arjun is wrong. Division and multiplication are worked **left to right**, so first {{1/2 ÷ 1/4 = 2}} (two quarters fit into a half), then {{2 ÷ 1/2 = 4}}. The correct value is 4.\n\nArjun worked out {{1/2 ÷ (1/4 ÷ 1/2)}} instead — he did the right-hand division first. That changes the answer because division is not associative: regrouping a division changes its value.\n\nFor multiplication the grouping doesn't matter: {{(1/2 × 1/4) × 1/2 = 1/2 × (1/4 × 1/2) = 1/16}}, because multiplication is associative.",
          markScheme: [
            { point: "Works left to right: {{1/2 ÷ 1/4 = 2}}.", keywords: ["left to right", "= 2", "first"] },
            { point: "Correct value 4 ({{2 ÷ 1/2 = 4}}).", keywords: ["= 4", "4"] },
            {
              point: "Explains that Arjun did the right-hand division first, i.e. {{1/2 ÷ (1/4 ÷ 1/2)}}, and that for division the grouping (the order) matters — it is not associative.",
              keywords: ["right", "brackets", "not associative", "order matters", "grouping"],
            },
            { point: "States that for multiplication the grouping doesn't matter (associative), e.g. both ways give {{1/16}}.", keywords: ["associative", "1/16", "doesn't matter", "does not matter", "same"] },
          ],
          difficulty: "challenge",
          guideRef: "calculating-with-fractions",
          hints: [
            "When a calculation has only × and ÷, which way do you work through it?",
            "Work out {{1/2 ÷ 1/4}} first — how many quarters fit into a half?",
            "Compare with Arjun's grouping, {{1/2 ÷ (1/4 ÷ 1/2)}}. Now try both groupings with × instead of ÷.",
          ],
          strategy: "Order of operations",
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      id: "fractions-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "fractions-p2-q01",
          question: "Which is greater, {{5/8}} or {{7/11}}? Type the greater fraction.",
          answer: { type: "fraction", n: 7, d: 11 },
          solution: ["The LCM of 8 and 11 is 88.", "{{5/8 = 55/88}} and {{7/11 = 56/88}}.", "56 > 55, so {{7/11}} is greater — but only just."],
          traps: [
            {
              spec: { type: "fraction", n: 5, d: 8 },
              feedback: "Close, but compare them over a common denominator of 88: {{5/8 = 55/88}} and {{7/11 = 56/88}}.",
            },
          ],
          difficulty: "warmup",
          guideRef: "equivalence-ordering",
          hints: ["Use a common denominator — the LCM of 8 and 11.", "Write both fractions in 88ths and compare the numerators."],
          strategy: "Find a common denominator",
        },
        {
          kind: "short",
          id: "fractions-p2-q02",
          question: "Work out {{7/8 - 1/6}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 17, d: 24, simplest: true },
          solution: ["The LCM of 8 and 6 is 24.", "{{7/8 = 21/24}} and {{1/6 = 4/24}}.", "{{21/24 - 4/24 = 17/24}}."],
          traps: [
            {
              spec: { type: "number", value: 3 },
              feedback:
                "Subtracting tops and bottoms gives {{6/2 = 3}} — bigger than {{7/8}}, which can't be right after taking something away. Use a common denominator.",
            },
          ],
          commonError: "Using 48 as the common denominator is fine, but then {{34/48}} must be simplified.",
          difficulty: "warmup",
          guideRef: "adding-subtracting",
          hints: ["Find the lowest common multiple of 8 and 6.", "Rewrite both fractions in 24ths."],
          strategy: "Find a common denominator",
        },
        {
          kind: "short",
          id: "fractions-p2-q03",
          question: "Find {{2/5}} of {{3/4}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 3, d: 10, simplest: true },
          solution: ["'Of' means ×: {{2/5 × 3/4}}.", "{{(2 × 3)/(5 × 4) = 6/20}}.", "Simplify: {{6/20 = 3/10}}."],
          traps: [
            { spec: { type: "fraction", n: 8, d: 15 }, feedback: "That's {{2/5 ÷ 3/4}}. 'Of' means multiply." },
            { spec: { type: "fraction", n: 23, d: 20 }, feedback: "That's {{2/5 + 3/4}}. 'Of' means multiply." },
          ],
          difficulty: "warmup",
          guideRef: "multiplying",
          hints: ["What operation does 'of' mean?", "Multiply the numerators and multiply the denominators, then simplify."],
          strategy: "'Of' means ×",
        },
        {
          kind: "short",
          id: "fractions-p2-q04",
          question: "Work out {{5 ÷ 1/4}}.",
          answer: { type: "number", value: 20 },
          solution: [
            "Ask: how many quarters fit into 5?",
            "There are 4 quarters in each whole, so 5 × 4 = 20.",
            "Keep, change, flip gives the same: {{5 × 4/1 = 20}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 5, d: 4 },
              feedback: "That's {{5 × 1/4}}. Dividing by {{1/4}} asks how many quarters fit into 5 — and there are 4 in every whole.",
            },
          ],
          difficulty: "warmup",
          guideRef: "dividing",
          hints: ["How many quarters are there in 1 whole?", "So how many are there in 5 wholes?"],
          strategy: "Ask 'how many fit?'",
        },
        {
          kind: "short",
          id: "fractions-p2-q05",
          question: "Write 350 g as a fraction of 2 kg. Give your answer in its simplest form.",
          answer: { type: "fraction", n: 7, d: 40, simplest: true },
          solution: ["Same units: 2 kg = 2000 g.", "{{350/2000}}.", "Divide top and bottom by 50: {{7/40}}."],
          traps: [
            { spec: { type: "number", value: 175 }, feedback: "Change to the same units first: 2 kg = 2000 g." },
          ],
          difficulty: "warmup",
          guideRef: "fractions-of-amounts",
          hints: ["Make the units match: how many grams are there in 2 kg?", "Write 350 over 2000 and simplify (try ÷ 50)."],
          strategy: "Same units first",
        },
        {
          kind: "short",
          id: "fractions-p2-q06",
          question: "Find the **smallest** integer {{n}} for which {{n/8 >= -3/5}}.",
          answer: { type: "number", value: -4 },
          solution: [
            "Multiply both sides by 8: {{n >= -24/5}}, which is {{n >= -4.8}}.",
            "The integers that are at least −4.8 are −4, −3, −2, …",
            "The smallest is −4.",
            "Check: {{-4/8 = -1/2 = -5/10}} and {{-3/5 = -6/10}}, so {{-4/8 >= -3/5}} ✓. But {{-5/8 = -25/40}} is less than {{-3/5 = -24/40}} ✗.",
          ],
          traps: [
            {
              spec: { type: "number", value: -5 },
              feedback:
                "−5 doesn't work: {{-5/8 = -25/40}}, which is *less* than {{-3/5 = -24/40}}. The integers allowed must be at least −4.8, and −5 is below that.",
            },
          ],
          commonError: "Choosing −5 because it is 'smaller' — but −5 is less than −4.8, so it doesn't satisfy the inequality.",
          difficulty: "core",
          guideRef: "equivalence-ordering",
          hints: [
            "Multiply both sides by 8. What is {{8 × (-3/5)}}?",
            "On a number line, which integers are greater than or equal to −4.8?",
            "Check your answer, and the integer just below it, by substituting.",
          ],
          strategy: "Draw a number line",
        },
        {
          kind: "short",
          id: "fractions-p2-q07",
          question: "Work out {{2 5/6 + 3 3/4}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 79, d: 12, simplest: true, form: "mixed" },
          solution: [
            "Estimate: about 3 + 4 = 7, and both numbers were rounded up, so a little under 7.",
            "Add the wholes: 2 + 3 = 5.",
            "Add the fractions in twelfths: {{10/12 + 9/12 = 19/12 = 1 7/12}}.",
            "Total: {{5 + 1 7/12 = 6 7/12}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 29, d: 5 },
              feedback: "You added the tops and the bottoms of the fraction parts — {{5/6 + 3/4}} is not {{8/10}}. Use twelfths.",
            },
          ],
          commonError: "Leaving the answer as {{5 19/12}} — the fraction part of a mixed number must be less than 1.",
          difficulty: "core",
          guideRef: "adding-subtracting",
          hints: [
            "Add the whole numbers and the fraction parts separately.",
            "Write {{5/6}} and {{3/4}} in twelfths.",
            "{{19/12}} is more than 1 — carry the extra whole into the whole-number part.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "fractions-p2-q08",
          question: "A bottle holds {{1 3/5}} litres of sugarcane juice. How many litres are there in 15 bottles?",
          answer: { type: "number", value: 24, display: "24 litres" },
          solution: [
            "Estimate: 15 × 1.5 = 22.5, so expect a little more than that.",
            "Distributive law: {{15 × 1 3/5 = 15 × 1 + 15 × 3/5}}.",
            "{{15 × 3/5 = 9}}, so the total is 15 + 9 = 24 litres.",
          ],
          solutions: [
            {
              label: "Improper fractions",
              steps: ["{{1 3/5 = 8/5}}.", "{{15 × 8/5}}: cancel 15 with 5 to get 3 × 8 = 24 litres. Equally quick here."],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 78, d: 5 },
              feedback: "The 15 multiplies the {{3/5}} too: {{15 × 3/5 = 9}}, so the total is 15 + 9.",
            },
          ],
          difficulty: "core",
          guideRef: "multiplying",
          hints: ["{{1 3/5}} is {{1 + 3/5}}. The 15 multiplies both parts.", "For {{15 × 3/5}}, find {{1/5}} of 15, then multiply by 3."],
          strategy: "Use the distributive law",
        },
        {
          kind: "short",
          id: "fractions-p2-q09",
          question: "Work out {{7/10 ÷ 14/25}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 5, d: 4, simplest: true, form: "mixed" },
          solution: [
            "Keep, change, flip: {{7/10 × 25/14}}.",
            "Cancel 7 with 14 (÷ 7) and 25 with 10 (÷ 5): {{1/2 × 5/2}}.",
            "{{= 5/4 = 1 1/4}}.",
            "Size check: {{14/25}} is less than 1, so the answer should be bigger than {{7/10}} ✓.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 49, d: 125 },
              feedback: "You multiplied instead of dividing. Flip the divisor {{14/25}} first.",
            },
          ],
          difficulty: "core",
          guideRef: "dividing",
          hints: [
            "Keep the first fraction, change ÷ to ×, flip the second.",
            "Look for factors to cancel: 7 and 14, 25 and 10.",
            "Change your improper answer into a mixed number.",
          ],
          strategy: "Keep, Change, Flip",
        },
        {
          kind: "short",
          id: "fractions-p2-q10",
          question:
            "In a sale, a pair of trainers costs {{5/6}} of its original price. The sale price is $65. What was the original price?",
          answer: { type: "number", value: 78, display: "$78" },
          solution: [
            "Bar model: the original price is 6 equal boxes, and the sale price is 5 of them.",
            "5 boxes = $65, so 1 box = 65 ÷ 5 = $13.",
            "Original price = 6 boxes = 6 × 13 = $78.",
            "Check: {{5/6}} of 78 = 78 ÷ 6 × 5 = 13 × 5 = 65 ✓.",
          ],
          solutions: [
            {
              label: "Divide by the fraction",
              steps: [
                "Original × {{5/6}} = 65, so original = {{65 ÷ 5/6 = 65 × 6/5 = 78}}.",
                "The same steps as the bar model (÷ 5, then × 6), written in one line.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 325 / 6, tolerance: 0.01 },
              feedback: "You found {{5/6}} of $65. But $65 is already {{5/6}} of the original price — work backwards.",
            },
            {
              spec: { type: "number", value: 455 / 6, tolerance: 0.01 },
              feedback: "Adding {{1/6}} of $65 doesn't work: the missing {{1/6}} is a sixth of the *original* price, not of the sale price.",
            },
          ],
          difficulty: "core",
          guideRef: "fractions-of-amounts",
          hints: [
            "Is $65 the whole amount, or a part of it?",
            "Draw 6 equal boxes for the original price. How many boxes is $65?",
            "5 boxes = $65. Find one box.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "fractions-p2-q11",
          question:
            "Without using a common denominator or a calculator, explain which is bigger: {{13/27}} or {{18/35}}.\n\nThen say which is bigger: {{-13/27}} or {{-18/35}}, and why.",
          marks: 4,
          modelAnswer:
            "Compare each fraction with the benchmark {{1/2}}. Half of 27 is 13.5, and 13 is less than 13.5, so {{13/27}} is less than {{1/2}}. Half of 35 is 17.5, and 18 is more than 17.5, so {{18/35}} is more than {{1/2}}. Therefore {{18/35 > 13/27}}.\n\nFor the negatives the order flips: {{-18/35}} is further left of zero than {{-13/27}}, so {{-13/27 > -18/35}}.",
          markScheme: [
            { point: "{{13/27}} is less than {{1/2}}, because 13 is less than 13.5 (half of 27).", keywords: ["13.5", "less than a half", "less than 1/2", "half of 27"] },
            { point: "{{18/35}} is more than {{1/2}}, because 18 is more than 17.5 (half of 35).", keywords: ["17.5", "more than a half", "more than 1/2", "half of 35"] },
            { point: "Concludes that {{18/35}} is bigger.", keywords: ["18/35 is bigger", "18/35 > 13/27", "18/35"] },
            { point: "For the negatives the order reverses, so {{-13/27}} is bigger (it is closer to zero).", keywords: ["flip", "reverse", "-13/27", "closer to zero", "further left"] },
          ],
          difficulty: "core",
          guideRef: "equivalence-ordering",
          hints: [
            "Is each fraction more or less than {{1/2}}?",
            "What is half of 27? What is half of 35?",
            "For the negatives, think about which one is further from zero.",
          ],
          strategy: "Use benchmarks (0, a half, 1)",
        },
        {
          kind: "written",
          id: "fractions-p2-q12",
          question:
            "Without working out the exact answer, explain why {{3 7/8 × 4 9/10}} must be more than 12 but less than 20. Then give a better estimate of its value.",
          marks: 3,
          modelAnswer:
            "{{3 7/8}} is between 3 and 4, and {{4 9/10}} is between 4 and 5. Rounding both *down* gives 3 × 4 = 12; both real numbers are bigger than that, so the real product is more than 12. Rounding both *up* gives 4 × 5 = 20; both real numbers are smaller than that, so the real product is less than 20.\n\nBoth numbers are only a little less than 4 and 5, so a better estimate is just under 20 — about 19. (The exact answer is {{18 79/80}}.)",
          markScheme: [
            { point: "Lower bound: rounds both down, 3 × 4 = 12, so the product is more than 12.", keywords: ["3 × 4", "3 x 4", "round down", "rounded down", "12"] },
            { point: "Upper bound: rounds both up, 4 × 5 = 20, so the product is less than 20.", keywords: ["4 × 5", "4 x 5", "round up", "rounded up", "20"] },
            { point: "Better estimate just under 20 (about 19), because both numbers are close to 4 and 5.", keywords: ["19", "just under 20", "close to 20", "a bit less than 20"] },
          ],
          difficulty: "core",
          guideRef: "calculating-with-fractions",
          hints: [
            "Between which two whole numbers does each mixed number lie?",
            "What happens to a product of positive numbers if you make both numbers bigger? Both smaller?",
            "Which whole numbers are the two mixed numbers *closest* to?",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "fractions-p2-q13",
          question: "Work out {{1 1/2 + 2/3 × (3/4 - 1/6)}}. Give your answer as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 17, d: 9, simplest: true, form: "mixed" },
          solution: [
            "Brackets first: {{3/4 - 1/6 = 9/12 - 2/12 = 7/12}}.",
            "Then multiply: {{2/3 × 7/12 = 14/36 = 7/18}}.",
            "Then add: {{1 1/2 + 7/18 = 1 9/18 + 7/18 = 1 16/18}}.",
            "Simplify: {{1 16/18 = 1 8/9}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 91, d: 72 },
              feedback: "You added {{1 1/2 + 2/3}} before multiplying. After the brackets, multiplication comes before addition.",
            },
          ],
          difficulty: "core",
          guideRef: "calculating-with-fractions",
          hints: [
            "What does BIDMAS say to do first?",
            "Work out the bracket in twelfths, then multiply by {{2/3}}.",
            "Add {{1 1/2}} last — eighteenths work.",
          ],
          strategy: "Order of operations",
        },
        {
          kind: "written",
          id: "fractions-p2-q14",
          question:
            "Ethan says: '{{2 1/2 × 2 1/2 = 4 1/4}}, because 2 × 2 = 4 and {{1/2 × 1/2 = 1/4}}.'\n\nExplain why Ethan is wrong (a sketch of a {{2 1/2}} by {{2 1/2}} square may help), and find the correct answer.",
          marks: 3,
          modelAnswer:
            "Split the {{2 1/2}} by {{2 1/2}} square into four parts: a 2 by 2 square (area 4), two strips that are each 2 by {{1/2}} (area 1 each), and a small {{1/2}} by {{1/2}} corner (area {{1/4}}). Ethan counted only the big square and the corner — he missed the two strips.\n\nThe total is {{4 + 1 + 1 + 1/4 = 6 1/4}}. Check with improper fractions: {{5/2 × 5/2 = 25/4 = 6 1/4}}.",
          markScheme: [
            {
              point: "Explains that Ethan misses the two 'cross' parts, each {{2 × 1/2 = 1}}.",
              keywords: ["strips", "2 × 1/2", "2 x 1/2", "missed", "missing", "two rectangles", "1 + 1"],
            },
            { point: "Correct method: improper fractions {{5/2 × 5/2}}, or the area model 4 + 1 + 1 + {{1/4}}.", keywords: ["5/2", "25/4", "4 + 1 + 1"] },
            { point: "Correct answer {{6 1/4}}.", keywords: ["6 1/4", "6.25", "25/4"] },
          ],
          commonError: "Multiplying wholes by wholes and fraction parts by fraction parts.",
          difficulty: "core",
          guideRef: "multiplying",
          hints: [
            "Estimate: {{2 1/2 × 2}} is already 5. Is {{4 1/4}} believable?",
            "Sketch the square and split each side into 2 and {{1/2}}. How many pieces do you get?",
            "Or write {{2 1/2}} as an improper fraction and multiply.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "fractions-p2-q15",
          question:
            "Mei travels to school by walking 900 m to the MRT station and then riding 4.5 km on the train. What fraction of her whole journey does she walk? Give your answer in its simplest form.",
          answer: { type: "fraction", n: 1, d: 6, simplest: true },
          solution: ["Same units: 4.5 km = 4500 m.", "Whole journey: 900 + 4500 = 5400 m.", "Walking fraction: {{900/5400 = 1/6}}."],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 5 },
              feedback:
                "{{900/4500}} compares the walk with the train ride. The question asks for a fraction of the *whole* journey, which is 900 + 4500 = 5400 m.",
            },
          ],
          difficulty: "core",
          guideRef: "fractions-of-amounts",
          hints: ["Put both distances in metres.", "How long is the *whole* journey?", "Walking distance over whole distance — then simplify."],
          strategy: "Same units first",
        },
        {
          kind: "short",
          id: "fractions-p2-q16",
          question: "Simplify {{(3x^2)/4 ÷ (9x)/8}}, where {{x != 0}}.",
          answer: { type: "expression", expr: "2x/3", display: "{{(2x)/3}}" },
          solution: [
            "Keep, change, flip: {{(3x^2)/4 × 8/(9x)}}.",
            "{{x^2 = x × x}}, so one {{x}} on top cancels with the {{x}} below: {{(3x)/4 × 8/9}}.",
            "Cancel 3 with 9 (÷ 3) and 8 with 4 (÷ 4): {{x/1 × 2/3}}.",
            "{{= (2x)/3}}. Check with {{x = 3}}: {{27/4 ÷ 27/8 = 27/4 × 8/27 = 2}}, and {{(2 × 3)/3 = 2}} ✓.",
          ],
          traps: [
            {
              spec: { type: "expression", expr: "27x^3/32" },
              feedback: "You multiplied without flipping the second fraction. To divide, multiply by the reciprocal: {{8/(9x)}}.",
            },
          ],
          difficulty: "core",
          guideRef: "algebraic-fractions",
          hints: [
            "Dividing works the same way with letters: keep, change, flip.",
            "{{x^2}} means {{x × x}}, so one {{x}} can cancel with the {{x}} on the bottom.",
            "Then cancel the numbers: 3 with 9, and 8 with 4.",
          ],
          strategy: "Check by substituting",
        },
        {
          kind: "short",
          id: "fractions-p2-q17",
          question:
            "{{x/y = 3/4}} and {{y/z = 2/5}}. Find the value of {{(x + y)/(y + z)}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 1, d: 2, simplest: true },
          solution: [
            "Choose a convenient value: let {{y = 4}} (it suits both fractions).",
            "{{x/4 = 3/4}} gives {{x = 3}}. {{4/z = 2/5}} gives {{z = 10}}.",
            "{{(x + y)/(y + z) = (3 + 4)/(4 + 10) = 7/14 = 1/2}}.",
            "Any other value of {{y}} scales {{x}}, {{y}} and {{z}} by the same factor, so the answer is always {{1/2}}.",
          ],
          solutions: [
            {
              label: "Algebra",
              steps: [
                "{{x = 3/4 y}} and {{z = 5/2 y}}.",
                "{{x + y = 7/4 y}} and {{y + z = 7/2 y}}.",
                "{{7/4 y ÷ 7/2 y = 7/4 × 2/7 = 1/2}}.",
                "Choosing numbers is slicker; the algebra proves the answer never depends on {{y}}.",
              ],
            },
          ],
          traps: [
            { spec: { type: "fraction", n: 3, d: 10 }, feedback: "{{3/10}} is {{x/z}}. The question asks for {{(x + y)/(y + z)}}." },
            {
              spec: { type: "fraction", n: 5, d: 9 },
              feedback: "Adding the tops and bottoms of the two given fractions doesn't find this. Try choosing actual numbers for {{x}}, {{y}} and {{z}}.",
            },
          ],
          difficulty: "challenge",
          guideRef: "algebraic-fractions",
          hints: [
            "The fractions only tell you how {{x}}, {{y}} and {{z}} compare in size. Could you pick numbers that fit?",
            "Choose a value of {{y}} that works nicely with both fractions.",
            "Try {{y = 4}}: then {{x = 3}}. What must {{z}} be?",
          ],
          strategy: "Make it simpler (try numbers first)",
        },
        {
          kind: "short",
          id: "fractions-p2-q18",
          question:
            "Three taps can each fill a paddling pool on their own: tap A takes 3 hours, tap B takes 4 hours and tap C takes 6 hours. With all three taps running together, how many **minutes** does it take to fill the pool?",
          answer: { type: "number", value: 80, display: "80 minutes" },
          solution: [
            "In one hour, A fills {{1/3}} of the pool, B fills {{1/4}} and C fills {{1/6}}.",
            "Together in one hour: {{1/3 + 1/4 + 1/6 = 4/12 + 3/12 + 2/12 = 9/12 = 3/4}} of the pool.",
            "Time for the whole pool: {{1 ÷ 3/4 = 4/3}} hours, which is {{1 1/3}} hours.",
            "{{1 1/3}} hours = 60 + 20 = 80 minutes.",
          ],
          solutions: [
            {
              label: "Imagine 12 hours",
              steps: [
                "In 12 hours, A would fill 4 pools, B 3 pools and C 2 pools: 9 pools altogether.",
                "So 9 pools take 12 hours, and one pool takes {{12/9 = 4/3}} hours = 80 minutes.",
                "Choosing 12 hours (the LCM of 3, 4 and 6) keeps everything whole until the last step — slicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 780 },
              feedback:
                "Adding the times (3 + 4 + 6 = 13 hours) would mean three taps are *slower* than one! Add the fractions of the pool each tap fills in one hour instead.",
            },
            {
              spec: { type: "number", value: 260 },
              feedback:
                "That's the average time. Taps working together must be faster than even the fastest tap alone (3 hours). Add the fractions of the pool filled per hour.",
            },
          ],
          difficulty: "challenge",
          guideRef: "calculating-with-fractions",
          hints: [
            "Together the taps must be quicker than the fastest tap alone. What fraction of the pool does each tap fill in one hour?",
            "Add the three fractions to find how much of the pool they fill together in one hour.",
            "If they fill {{3/4}} of the pool per hour, how long does the whole pool take?",
          ],
          strategy: "Work with rates",
        },
        {
          kind: "written",
          id: "fractions-p2-q19",
          question:
            "A ribbon is {{2 1/2}} m long. Siti cuts it into pieces that are each {{1/3}} m long.\n\nShe works out {{2 1/2 ÷ 1/3 = 7 1/2}} and says: 'So I get 7 pieces, and there is {{1/2}} m of ribbon left over.'\n\nExplain what is right and what is wrong with Siti's statement, and find the length of ribbon that is left over.",
          marks: 4,
          modelAnswer:
            "Her division is right: {{2 1/2 ÷ 1/3 = 5/2 × 3 = 15/2 = 7 1/2}}, so she can cut 7 full pieces.\n\nBut the answer to 'how many fit?' is counted in *pieces*, not metres. The {{1/2}} in {{7 1/2}} means half of a piece, and half of a {{1/3}} m piece is {{1/2 × 1/3 = 1/6}} m.\n\nCheck: 7 pieces use {{7 × 1/3 = 7/3 = 2 1/3}} m, and {{2 1/2 - 2 1/3 = 2 3/6 - 2 2/6 = 1/6}} m is left. So the leftover is {{1/6}} m, not {{1/2}} m.",
          markScheme: [
            { point: "Agrees she gets 7 full pieces ({{2 1/2 ÷ 1/3 = 15/2 = 7 1/2}}).", keywords: ["7 pieces", "7 full", "15/2", "7 1/2"] },
            { point: "Explains the {{1/2}} is half of a piece, not half a metre.", keywords: ["half of a piece", "half a piece", "pieces", "not metres", "not half a metre"] },
            { point: "Works out that 7 pieces use {{7/3 = 2 1/3}} m (or half a piece = {{1/2 × 1/3}} m).", keywords: ["7/3", "2 1/3", "1/2 × 1/3", "1/2 x 1/3"] },
            { point: "Leftover = {{1/6}} m.", keywords: ["1/6"] },
          ],
          commonError: "Reading the fraction part of a 'how many fit?' answer in the wrong units.",
          difficulty: "challenge",
          guideRef: "dividing",
          hints: [
            "What are the units of the answer to a 'how many fit?' division — metres or pieces?",
            "How much ribbon do 7 pieces use altogether?",
            "Subtract that from {{2 1/2}} m.",
          ],
          strategy: "Check by multiplying back",
        },
        {
          kind: "short",
          id: "fractions-p2-q20",
          question: "Find {{x}} if {{1/(1 + 1/(1 + 1/x)) = 5/8}}. Give your answer as a fraction.",
          answer: { type: "fraction", n: 3, d: 2 },
          solution: [
            "Work backwards, peeling off one layer at a time.",
            "If {{1/A = 5/8}}, then {{A = 8/5}}. So {{1 + 1/(1 + 1/x) = 8/5}}, which means {{1/(1 + 1/x) = 3/5}}.",
            "Flip again: {{1 + 1/x = 5/3}}, so {{1/x = 2/3}}.",
            "Flip once more: {{x = 3/2}}.",
            "Check: {{1/x = 2/3}}, {{1 + 2/3 = 5/3}}, flip to {{3/5}}, {{1 + 3/5 = 8/5}}, flip to {{5/8}} ✓.",
          ],
          traps: [
            { spec: { type: "fraction", n: 2, d: 3 }, feedback: "That's {{1/x}}. One more step: flip it to find {{x}}." },
          ],
          difficulty: "challenge",
          guideRef: "dividing",
          hints: [
            "Work backwards. If 1 divided by something is {{5/8}}, what is that something?",
            "Each time you see '1 ÷ (…)', flip both sides; each time you see '1 + …', subtract 1.",
            "After the first two steps you should have {{1 + 1/x = 5/3}}.",
          ],
          strategy: "Work backwards",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE SET — AoPS / UKMT Junior flavour; all difficulty "challenge"
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "fractions-ch-q01",
      question: "Work out {{(1 - 1/2)(1 - 1/3)(1 - 1/4) × … × (1 - 1/50)}}. Give your answer as a fraction.",
      answer: { type: "fraction", n: 1, d: 50 },
      solution: [
        "Simplify each bracket: {{1 - 1/2 = 1/2}}, {{1 - 1/3 = 2/3}}, {{1 - 1/4 = 3/4}}, …, {{1 - 1/50 = 49/50}}.",
        "So the product is {{1/2 × 2/3 × 3/4 × … × 49/50}}.",
        "Each numerator cancels with the denominator just before it: the 2s, the 3s, …, the 49s.",
        "Only the first numerator (1) and the last denominator (50) survive, so the answer is {{1/50}}.",
      ],
      solutions: [
        {
          label: "Try small cases",
          steps: [
            "One bracket: {{1/2}}. Two: {{1/2 × 2/3 = 1/3}}. Three: {{1/3 × 3/4 = 1/4}}.",
            "Pattern: once you reach the bracket {{(1 - 1/n)}}, the product is {{1/n}}.",
            "So up to {{(1 - 1/50)}} the product is {{1/50}}.",
            "The cancelling argument is slicker because it *explains* the pattern instead of guessing it.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 49, d: 50 },
          feedback: "That's only the last bracket. Write the first few brackets as fractions side by side — what cancels?",
        },
      ],
      difficulty: "challenge",
      guideRef: "calculating-with-fractions",
      hints: [
        "Work out what each bracket equals as a single fraction.",
        "Write the first four or five brackets as fractions next to each other. What do you notice about neighbouring numerators and denominators?",
        "Almost everything cancels. Which numbers are left at the very start and the very end?",
      ],
      strategy: "Try small cases, then find a pattern",
    },
    {
      kind: "short",
      id: "fractions-ch-q02",
      question:
        "Siti has some stickers. She gives Hana {{1/3}} of them plus 2 more. Then she gives Ravi {{1/4}} of the stickers she has left plus 3 more. She now has 21 stickers. How many stickers did she start with?",
      answer: { type: "number", value: 51 },
      solution: [
        "Work backwards from the 21 stickers.",
        "Undo Ravi's step: she kept {{3/4}} of her pile and then gave away 3 more, so 21 + 3 = 24 is {{3/4}} of the pile. That pile was 24 ÷ 3 × 4 = 32.",
        "Undo Hana's step: she kept {{2/3}} of her stickers and then gave away 2 more, so 32 + 2 = 34 is {{2/3}} of what she started with. That is 34 ÷ 2 × 3 = 51.",
        "Check: 51 → Hana gets 17 + 2 = 19 → 32 left → Ravi gets 8 + 3 = 11 → 21 left ✓.",
      ],
      solutions: [
        {
          label: "Algebra (forwards)",
          steps: [
            "Start with {{s}} stickers. After Hana: {{2/3 s - 2}}.",
            "After Ravi: {{3/4 (2/3 s - 2) - 3 = 1/2 s - 3/2 - 3 = 1/2 s - 4 1/2}}.",
            "{{1/2 s - 4 1/2 = 21}}, so {{1/2 s = 25 1/2}} and {{s = 51}}.",
            "Working backwards is slicker: every step uses whole numbers and there is no bracket to expand.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 42 },
          feedback: "You undid the fractions but forgot the extra stickers (the 'plus 2' and 'plus 3'). Undo those as well — in the right order.",
        },
      ],
      difficulty: "challenge",
      guideRef: "fractions-of-amounts",
      hints: [
        "Start at the end and undo each step in reverse order.",
        "After giving Ravi a quarter, Siti kept {{3/4}} of her pile — and then gave away 3 more. So 21 + 3 is {{3/4}} of the pile she had before Ravi.",
        "Now undo Hana's step in the same way: add back the 2, then that number is {{2/3}} of the starting pile.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "fractions-ch-q03",
      question:
        "At a school, {{3/4}} of the girls and {{2/3}} of the boys walk to school. The number of girls who walk is the same as the number of boys who walk. What fraction of all the pupils walk to school? Give your answer in its simplest form.",
      answer: { type: "fraction", n: 12, d: 17, simplest: true },
      solution: [
        "The answer can't depend on the size of the school, so choose convenient numbers: suppose 6 girls and 6 boys walk (6 works for both {{3/4}} and {{2/3}}).",
        "If 6 girls are {{3/4}} of the girls, there are 6 ÷ 3 × 4 = 8 girls.",
        "If 6 boys are {{2/3}} of the boys, there are 6 ÷ 2 × 3 = 9 boys.",
        "So 12 of the 8 + 9 = 17 pupils walk: {{12/17}}.",
        "Any other choice scales every number by the same factor, so the fraction is always {{12/17}}.",
      ],
      solutions: [
        {
          label: "Introduce a variable",
          steps: [
            "Let {{W}} girls and {{W}} boys walk.",
            "Number of girls: {{W ÷ 3/4 = 4/3 W}}. Number of boys: {{W ÷ 2/3 = 3/2 W}}.",
            "Total pupils: {{4/3 W + 3/2 W = 17/6 W}}. Walkers: {{2W}}.",
            "Fraction walking: {{2W ÷ 17/6 W = 2 × 6/17 = 12/17}}.",
            "Picking a number (6) is slicker; the algebra shows why it always works.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 17, d: 24 },
          feedback: "That's the average of {{3/4}} and {{2/3}}. Averaging only works if there are equal numbers of girls and boys — and there aren't.",
        },
        {
          spec: { type: "fraction", n: 5, d: 7 },
          feedback:
            "Adding tops and bottoms, {{(3 + 2)/(4 + 3)}}, assumes 4 girls and 3 boys — but then 3 girls and 2 boys would walk, which are not equal.",
        },
      ],
      difficulty: "challenge",
      guideRef: "fractions-of-amounts",
      hints: [
        "The answer doesn't depend on the size of the school. Could you pick a convenient number of walkers?",
        "Pick a number of walkers that works for both {{3/4}} and {{2/3}} — try 6 girls and 6 boys walking.",
        "If 6 girls are {{3/4}} of all the girls, how many girls are there? Do the same for the boys.",
      ],
      strategy: "Make it simpler (choose numbers)",
    },
    {
      kind: "short",
      id: "fractions-ch-q04",
      question:
        "Each of the digits 2, 3, 4 and 5 is used exactly once, in place of {{a}}, {{b}}, {{c}} and {{d}}, to make {{a/b ÷ c/d}}. What is the largest possible value? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 10, d: 3, simplest: true },
      solution: [
        "Rewrite the division: {{a/b ÷ c/d = a/b × d/c = (a × d)/(b × c)}}.",
        "To make this as large as possible, the two numbers on top ({{a}} and {{d}}) should be the biggest digits, 4 and 5, and the two on the bottom ({{b}} and {{c}}) the smallest, 2 and 3.",
        "Largest value: {{(4 × 5)/(2 × 3) = 20/6 = 10/3}}.",
        "One way to get it: {{5/2 ÷ 3/4 = 5/2 × 4/3 = 20/6 = 10/3}}.",
      ],
      solutions: [
        {
          label: "Think about each fraction separately",
          steps: [
            "A quotient is big when the first number is big and the divisor is small.",
            "Biggest first fraction: {{5/2}}. That leaves 3 and 4 for the divisor, and the smaller choice is {{3/4}}.",
            "{{5/2 ÷ 3/4 = 10/3}}. But to be sure, you would still have to check other splits (for example {{4/2 ÷ 3/5}} also gives {{10/3}}).",
            "Rewriting as {{(a × d)/(b × c)}} is slicker: it shows at once which digits belong on top and which on the bottom.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 15, d: 8 },
          feedback: "{{5/2 ÷ 4/3}} makes the first fraction big but divides by the *biggest* possible divisor. To make a quotient large, the divisor should be small.",
        },
      ],
      difficulty: "challenge",
      guideRef: "dividing",
      hints: [
        "Rewrite the division as a multiplication.",
        "{{a/b ÷ c/d}} equals one fraction, with two of the letters multiplied on top and two on the bottom. Which ones?",
        "Put the largest digits where they make the answer bigger, and the smallest where they divide it.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "fractions-ch-q05",
      question:
        "In a class, more than {{2/5}} of the pupils, but fewer than {{1/2}} of them, wear glasses. What is the smallest possible number of pupils in the class?",
      answer: { type: "number", value: 7 },
      solution: [
        "For a class of {{n}} pupils you need a whole number {{g}} of glasses-wearers with {{2/5 n < g < 1/2 n}}.",
        "n = 1 to 6: the gaps are 0.4 to 0.5, 0.8 to 1, 1.2 to 1.5, 1.6 to 2, 2 to 2.5 and 2.4 to 3. No whole number lies strictly inside any of them.",
        "n = 7: {{2/5 × 7 = 2.8}} and {{1/2 × 7 = 3.5}}, and g = 3 fits.",
        "Check: {{2/5 = 14/35 < 15/35 = 3/7}} and {{3/7 = 6/14 < 7/14 = 1/2}} ✓. The smallest class has 7 pupils.",
      ],
      solutions: [
        {
          label: "The 'add tops and bottoms' shortcut",
          steps: [
            "Adding the tops and the bottoms of {{2/5}} and {{1/2}} gives {{(2 + 1)/(5 + 2) = 3/7}}, which lies between them (another challenge in this set asks you to prove this always happens).",
            "That suggests a class of 7 — a fast way to find the candidate.",
            "But only the check of classes 1 to 6 proves that nothing smaller works, so you still need the case-by-case test.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 20 },
          feedback: "{{9/20}} does lie between {{8/20}} and {{10/20}}, but a smaller class works. Test the class sizes one at a time from the bottom.",
        },
      ],
      difficulty: "challenge",
      guideRef: "equivalence-ordering",
      hints: [
        "Try small classes: 1 pupil, 2 pupils, 3 pupils… For each, how many glasses-wearers would be allowed?",
        "For a class of {{n}}, you need a whole number strictly between {{2/5}} of {{n}} and {{1/2}} of {{n}}.",
        "The gap between {{2/5}} of {{n}} and {{1/2}} of {{n}} is only {{1/10}} of {{n}}, so {{n}} can't be tiny. Keep testing until a whole number fits.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "written",
      id: "fractions-ch-q06",
      question:
        "Ethan 'simplifies' fractions by crossing out a digit that appears on both the top and the bottom:\n\n    {{16/64}} → cross out the 6s → {{1/4}}\n    {{19/95}} → cross out the 9s → {{1/5}}\n    {{26/65}} → cross out the 6s → {{2/5}}\n\nAll three answers are correct! Is Ethan's method valid? Give a counter-example, and explain what is really allowed when you simplify a fraction.",
      marks: 3,
      modelAnswer:
        "No — the method is not valid; these three examples only work by coincidence. Counter-example: {{12/24}} → cross out the 2s → {{1/4}}, but really {{12/24 = 1/2}}.\n\nWhen you simplify, you may divide the **whole** numerator and the **whole** denominator by the same number (a common factor), because {{(k × a)/(k × b) = a/b}}. The digit 6 in 16 is not a factor of 16 — 16 means 10 + 6 — so crossing it out is not dividing by anything. The correct working is {{16/64 = (16 ÷ 16)/(64 ÷ 16) = 1/4}}.",
      markScheme: [
        { point: "States the method is not valid (the examples work by coincidence).", keywords: ["not valid", "coincidence", "doesn't work", "does not work", "no"] },
        { point: "Gives a correct counter-example, e.g. {{12/24}} would become {{1/4}} but equals {{1/2}}.", keywords: ["12/24", "13/39", "counter", "1/2"] },
        {
          point: "Explains that you may only divide top and bottom by a common factor; a digit is not a factor (16 = 10 + 6).",
          keywords: ["factor", "divide", "10 + 6", "same number", "whole numerator"],
        },
      ],
      solutions: [
        {
          label: "Going deeper: why do those three work?",
          steps: [
            "Write the fraction as {{(10a + b)/(10b + c)}}, where crossing out the {{b}}s leaves {{a/c}}.",
            "For these to be equal you need {{c(10a + b) = a(10b + c)}}, which simplifies to {{9ac + bc = 10ab}}.",
            "For {{16/64}}: a = 1, b = 6, c = 4 gives 36 + 24 = 60 = 10 × 1 × 6 ✓. Only a handful of digit triples satisfy this equation — which is exactly why the trick is a rare coincidence, not a rule.",
          ],
        },
      ],
      commonError: "Deciding the method works because it gave the right answer three times — examples can never prove a rule, but one counter-example disproves it.",
      difficulty: "challenge",
      guideRef: "equivalence-ordering",
      hints: [
        "Try Ethan's method on a fraction whose value you already know, such as {{12/24}} or {{13/39}}.",
        "What does the 6 in 16 actually stand for? Is 16 equal to something × 6?",
        "Simplifying means dividing the whole top and the whole bottom by the same number.",
      ],
      strategy: "Look for a counter-example",
    },
    {
      kind: "short",
      id: "fractions-ch-q07",
      question: "How many of the fractions {{1/60}}, {{2/60}}, {{3/60}}, …, {{59/60}} are already in their simplest form?",
      answer: { type: "number", value: 16 },
      solution: [
        "{{n/60}} is in simplest form exactly when {{n}} shares no factor with 60 except 1.",
        "60 = 2 × 2 × 3 × 5, so {{n}} must not be divisible by 2, 3 or 5.",
        "Of the numbers 1 to 60, half are odd: 30. A third of those odd numbers are multiples of 3, leaving {{2/3 × 30 = 20}}. A fifth of those are multiples of 5, leaving {{4/5 × 20 = 16}}.",
        "(60 itself is even, so it was never counted.) The fractions are {{n/60}} for n = 1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53 and 59: 16 of them.",
      ],
      solutions: [
        {
          label: "Use symmetry",
          steps: [
            "If {{n}} shares no factor with 60, neither does 60 − {{n}}, so the answers come in pairs: {{n}} and 60 − {{n}}.",
            "From 1 to 29, the numbers not divisible by 2, 3 or 5 are 1, 7, 11, 13, 17, 19, 23 and 29: that's 8.",
            "Their partners 59, 53, 49, 47, 43, 41, 37 and 31 give 8 more (30 itself shares factors with 60).",
            "Total 16. The fraction-of-a-fraction method is slicker: no listing at all.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 15 },
          feedback: "Don't forget numbers like 49 = 7 × 7: it isn't prime, but it shares no factor with 60, so {{49/60}} is already in simplest form.",
        },
      ],
      difficulty: "challenge",
      guideRef: "equivalence-ordering",
      hints: [
        "When is {{n/60}} already in simplest form? Think about the common factors of {{n}} and 60.",
        "Write 60 as a product of primes. Which numbers {{n}} must you rule out?",
        "Of the numbers 1 to 60, what fraction are not even? Of those, what fraction are not multiples of 3? Then not multiples of 5?",
      ],
      strategy: "Clever counting",
    },
    {
      kind: "short",
      id: "fractions-ch-q08",
      question:
        "In how many ways can {{1/8}} be written as {{1/a + 1/b}}, where {{a}} and {{b}} are positive whole numbers with {{a < b}}?",
      answer: { type: "number", value: 3 },
      solution: [
        "Since {{a < b}}, {{1/a}} is the bigger of the two parts, so it is more than half of {{1/8}}: {{1/a > 1/16}}, which means {{a < 16}}.",
        "Also {{1/a}} must be less than {{1/8}}, so {{a > 8}}. So {{a}} is one of 9, 10, …, 15.",
        "For each one, {{1/8 - 1/a = (a - 8)/(8a)}} must be a unit fraction.",
        "a = 9: {{1/72}} ✓. a = 10: {{2/80 = 1/40}} ✓. a = 11: {{3/88}} ✗. a = 12: {{4/96 = 1/24}} ✓. a = 13: {{5/104}} ✗. a = 14: {{6/112 = 3/56}} ✗. a = 15: {{7/120}} ✗.",
        "So there are 3 ways: {{1/9 + 1/72}}, {{1/10 + 1/40}} and {{1/12 + 1/24}}.",
      ],
      solutions: [
        {
          label: "Factor trick",
          steps: [
            "Multiply {{1/a + 1/b = 1/8}} by {{8ab}}: {{8b + 8a = ab}}.",
            "Rearrange: {{ab - 8a - 8b + 64 = 64}}, which factorises as {{(a - 8)(b - 8) = 64}}.",
            "Factor pairs of 64 with the first number smaller: 1 × 64, 2 × 32, 4 × 16 (8 × 8 would make {{a = b}}).",
            "So (a, b) = (9, 72), (10, 40) or (12, 24): 3 ways. This is slicker for bigger numbers — try {{1/12}}, which has 7 ways.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 4 },
          feedback: "{{1/16 + 1/16}} also makes {{1/8}}, but the question needs {{a < b}}, so the two unit fractions must be different.",
        },
      ],
      difficulty: "challenge",
      guideRef: "adding-subtracting",
      hints: [
        "Which is bigger, {{1/a}} or {{1/b}}? So how must {{1/a}} compare with half of {{1/8}}?",
        "Show that {{a}} has to be between 9 and 15.",
        "For each possible {{a}}, work out {{1/8 - 1/a}} and check whether it is a unit fraction.",
      ],
      strategy: "Consider extremes, then split into cases",
    },
    {
      kind: "short",
      id: "fractions-ch-q09",
      question:
        "The ten numbers 1, {{1/2}}, {{1/3}}, …, {{1/10}} are written on a board. A move is: rub out any two numbers {{a}} and {{b}}, and write the single number {{a + b + ab}} in their place. After nine moves only one number is left. What is it?",
      answer: { type: "number", value: 10 },
      solution: [
        "Notice that {{1 + (a + b + ab) = (1 + a)(1 + b)}}.",
        "So add 1 to every number on the board and multiply the results together. A move doesn't change this product: the two factors {{(1 + a)}} and {{(1 + b)}} are replaced by the single factor {{(1 + a)(1 + b)}}.",
        "At the start the product is {{(1 + 1)(1 + 1/2)(1 + 1/3) × … × (1 + 1/10) = 2/1 × 3/2 × 4/3 × … × 11/10 = 11}}.",
        "At the end there is one number {{N}}, and {{1 + N = 11}}. So {{N = 10}}, whatever order the moves are made in.",
      ],
      solutions: [
        {
          label: "Try small cases",
          steps: [
            "Board 1, {{1/2}}: {{1 + 1/2 + 1/2 = 2}}.",
            "Board 1, {{1/2}}, {{1/3}}: combine the 2 with {{1/3}}: {{2 + 1/3 + 2/3 = 3}}.",
            "Add {{1/4}}: {{3 + 1/4 + 3/4 = 4}}. Pattern: with 1 to {{1/n}} on the board you finish with {{n}}, so the answer is 10.",
            "The invariant is slicker: it *proves* that the order of the moves never matters, which small cases can only suggest.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 11 },
          feedback: "Nearly! 11 is the product of all the {{(1 + x)}} values — but that product is 1 *more* than the number left on the board.",
        },
      ],
      difficulty: "challenge",
      guideRef: "calculating-with-fractions",
      hints: [
        "Try a tiny version first: just 1 and {{1/2}} on the board. Then 1, {{1/2}} and {{1/3}}.",
        "Look for something that doesn't change when you make a move. Try adding 1 to {{a + b + ab}}.",
        "{{1 + a + b + ab}} factorises. What happens to the product of all the {{(1 + x)}} values during a move?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "written",
      id: "fractions-ch-q10",
      question:
        "Ravi 'adds' fractions by adding the tops and adding the bottoms. For example, he says {{1/3}} 'plus' {{1/2}} is {{2/5}}.\n\nThat is wrong as addition — but his answer seems to land *between* the two fractions he started with ({{1/3 < 2/5 < 1/2}}).\n\n**Always, sometimes or never?** For positive fractions with {{a/b < c/d}}, Ravi's fraction {{(a + c)/(b + d)}} lies between {{a/b}} and {{c/d}}. Test some examples, then explain why.",
      marks: 4,
      modelAnswer:
        "**Always.** Examples: {{1/3}} and {{1/2}} give {{2/5}}, and in 30ths {{10/30 < 12/30 < 15/30}}. {{1/4}} and {{3/4}} give {{4/8 = 1/2}}, which is between them. {{2/3}} and {{4/5}} give {{6/8 = 3/4}}, and {{2/3 < 3/4 < 4/5}}.\n\nWhy: think of two classes. In the first class, {{a}} out of {{b}} pupils like durian; in the second, {{c}} out of {{d}} do — a higher proportion. Put the classes together and {{a + c}} out of {{b + d}} pupils like durian. Mixing in a group with a *higher* proportion pulls the overall proportion up above {{a/b}}, and mixing in a group with a *lower* proportion pulls it down below {{c/d}}. So the combined fraction lies between the two.\n\nAlgebra (cross-multiplying): {{a/b < c/d}} means {{ad < bc}}. To compare {{a/b}} with {{(a + c)/(b + d)}}, compare {{a(b + d) = ab + ad}} with {{b(a + c) = ab + bc}}; since {{ad < bc}}, {{a/b}} is smaller. In the same way, {{c(b + d) = bc + cd}} is bigger than {{d(a + c) = ad + cd}}, so {{c/d}} is bigger than {{(a + c)/(b + d)}}.",
      markScheme: [
        { point: "States 'always'.", keywords: ["always"] },
        { point: "At least one example checked properly, e.g. {{1/3 < 2/5 < 1/2}} using a common denominator.", keywords: ["2/5", "30", "example", "between", "3/4"] },
        { point: "A valid reason, e.g. combining two groups (or a weighted-average idea) pulls the proportion between the two.", keywords: ["combine", "class", "group", "average", "pull", "together"] },
        {
          point: "Shows both inequalities, e.g. by cross-multiplying: {{ad < bc}} gives {{ab + ad < ab + bc}} and {{ad + cd < bc + cd}}.",
          keywords: ["ad < bc", "cross", "ab + ad", "ab + bc", "cross-multiply"],
        },
      ],
      solutions: [
        {
          label: "Number-line picture",
          steps: [
            "Check that {{b/(b + d) × a/b + d/(b + d) × c/d = a/(b + d) + c/(b + d) = (a + c)/(b + d)}}. So Ravi's fraction is a 'weighted average': {{a/b}} and {{c/d}} mixed in the proportions {{b/(b + d)}} and {{d/(b + d)}}.",
            "A weighted average of two numbers, with positive weights that add to 1, always lies between them.",
            "The two-classes story is the same idea in words — and it is the slicker way to explain it to someone else.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "adding-subtracting",
      hints: [
        "Test a few pairs, e.g. {{1/4}} and {{3/4}}, or {{2/3}} and {{4/5}}. Is the result between them every time?",
        "Imagine {{a/b}} and {{c/d}} as the success rates of two teams. What does {{(a + c)/(b + d)}} represent?",
        "To compare two fractions {{p/q}} and {{r/s}} (positive), compare {{p s}} with {{q r}}. Use the fact that {{ad < bc}}.",
      ],
      strategy: "Prove it",
    },
  ],
};
