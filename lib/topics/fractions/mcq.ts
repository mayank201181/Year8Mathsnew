import type { Paper } from "../../types.ts";

// Fractions — four 20-question MCQ papers (5 warm-up, 11–12 core, 3–4 challenge each).
// Every distractor is a specific misconception; explanations name it by value.

export const mcqPapers: Paper[] = [
  // ===========================================================================
  // MCQ Paper 1
  // ===========================================================================
  {
    id: "fractions-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "fractions-m1-q01",
        question: "Write {{24/36}} in its simplest form.",
        options: ["{{12/18}}", "{{4/6}}", "{{2/3}}", "{{6/9}}"],
        answerIndex: 2,
        explanation:
          "The HCF of 24 and 36 is 12, so divide the top and the bottom by 12: {{24/36 = 2/3}}. {{12/18}}, {{4/6}} and {{6/9}} all have the same value, but each comes from dividing by a common factor that isn't the *highest* one (2, 6 or 4), so they can still be simplified.",
        difficulty: "warmup",
        guideRef: "equivalence-ordering",
        hints: ["Find the highest common factor (HCF) of 24 and 36 — the biggest number that divides into both."],
        strategy: "Use the HCF",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q02",
        question: "Work out {{3/8 + 1/4}}.",
        options: ["{{4/12}}", "{{5/8}}", "{{4/8}}", "{{3/32}}"],
        answerIndex: 1,
        explanation:
          "Eighths work for both: {{1/4 = 2/8}}, so {{3/8 + 2/8 = 5/8}}. {{4/12}} comes from adding tops and bottoms — but {{4/12 = 1/3}}, which is *less* than {{3/8}}, and adding can't make it smaller. {{4/8}} adds the numerators without first rewriting {{1/4}} as eighths, and {{3/32}} multiplies instead of adding.",
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["Make the pieces the same size: write {{1/4}} in eighths."],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q03",
        question: "Work out {{2/3 × 4/5}}.",
        options: ["{{6/8}}", "{{10/12}}", "{{22/15}}", "{{8/15}}"],
        answerIndex: 3,
        explanation:
          "Multiply the numerators and multiply the denominators: {{(2 × 4)/(3 × 5) = 8/15}}. Multiplying needs no common denominator. {{10/12}} cross-multiplies (a step that belongs to dividing), {{22/15}} is {{2/3 + 4/5}} — an addition, not a product — and {{6/8}} adds tops and bottoms.",
        difficulty: "warmup",
        guideRef: "multiplying",
        hints: ["For multiplying it's tops × tops and bottoms × bottoms."],
        strategy: "Multiply straight across",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q04",
        question: "What is the reciprocal of {{2 1/2}}?",
        options: ["{{2/5}}", "{{5/2}}", "4", "{{-2 1/2}}"],
        answerIndex: 0,
        explanation:
          "First write {{2 1/2}} as an improper fraction, {{5/2}}, then flip it: {{2/5}}. Check: {{5/2 × 2/5 = 1}}. {{5/2}} is the improper fraction before flipping. 4 comes from flipping only the fraction part ({{1/2}} becomes 2) and keeping the whole 2. {{-2 1/2}} is the *negative* of the number, not its reciprocal.",
        difficulty: "warmup",
        guideRef: "dividing",
        hints: ["A number times its reciprocal is 1. Change {{2 1/2}} into an improper fraction first."],
        strategy: "Convert to improper fractions",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q05",
        question: "Find {{3/5}} of $40.",
        options: ["$8", "$24", "$16", "$120"],
        answerIndex: 1,
        explanation:
          "{{1/5}} of $40 is 40 ÷ 5 = $8, so {{3/5}} is 3 × $8 = $24. $8 is only one fifth. $16 is the *other* {{2/5}} — the part that is left over. $120 multiplies by 3 but forgets to divide by 5.",
        difficulty: "warmup",
        guideRef: "fractions-of-amounts",
        hints: ["Find {{1/5}} of $40 first, then scale up."],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q06",
        question: "Which list is in order from **smallest to largest**?",
        options: [
          "{{-2/3}}, {{-3/4}}, {{1/2}}, {{3/5}}",
          "{{-3/4}}, {{-2/3}}, {{3/5}}, {{1/2}}",
          "{{1/2}}, {{3/5}}, {{-2/3}}, {{-3/4}}",
          "{{-3/4}}, {{-2/3}}, {{1/2}}, {{3/5}}",
        ],
        answerIndex: 3,
        explanation:
          "Negatives come before positives. In twelfths, {{3/4 = 9/12}} is bigger than {{2/3 = 8/12}}, so {{-3/4}} is *further below* zero and comes first. Then {{1/2}} = 0.5 is less than {{3/5}} = 0.6. Starting with {{-2/3}} treats the negatives as if they were positive. Putting {{3/5}} before {{1/2}} comes from thinking a bigger denominator always means a smaller fraction.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Which numbers are below zero? They come first.",
          "Compare {{3/4}} and {{2/3}} in twelfths. When the numbers are negative, the bigger size is *further* below zero.",
          "Sketch a number line: is {{-3/4}} to the left or the right of {{-2/3}}?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q07",
        question: "Which statement is true?",
        options: ["{{-5/6 > -4/5}}", "{{7/9 < 8/11}}", "{{-2/3 <= -8/12}}", "{{5/8 != 15/24}}"],
        answerIndex: 2,
        explanation:
          "{{-8/12}} simplifies to {{-2/3}}, so the two sides are equal — and ≤ means 'less than **or equal to**', so the statement is true. {{5/8 != 15/24}} is false because {{15/24 = 5/8}} (divide by 3). {{-5/6 > -4/5}} is false: {{5/6}} is the bigger size, so {{-5/6}} is further below zero. {{7/9 < 8/11}} is false: bigger numbers don't make a bigger fraction — {{7/9}} ≈ 0.78 but {{8/11}} ≈ 0.73.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Test each statement separately. Can either fraction in a pair be simplified?",
          "Remember that ≤ is true when the two sides are equal.",
          "For the negative pair, compare {{5/6}} and {{4/5}} in thirtieths, then ask which is further below zero.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q08",
        question: "Work out {{4 1/5 - 1 2/3}}. Give your answer as a mixed number in its simplest form.",
        options: ["{{2 8/15}}", "{{3 7/15}}", "{{3 8/15}}", "{{2 7/15}}"],
        answerIndex: 0,
        explanation:
          "In fifteenths: {{4 3/15 - 1 10/15}}. You can't take {{10/15}} from {{3/15}}, so borrow 1 whole: {{3 18/15 - 1 10/15 = 2 8/15}}. (Check: 4.2 − 1.67 ≈ 2.53.) {{3 7/15}} works out {{10/15 - 3/15}} instead — subtracting the fractions the wrong way round. {{3 8/15}} borrows the {{15/15}} but forgets to reduce 4 to 3.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Rewrite both fraction parts as fifteenths.",
          "Can you take {{10/15}} away from {{3/15}}? If not, borrow 1 whole.",
          "{{4 3/15 = 3 18/15}}. Now subtract.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q09",
        question:
          "Siti estimates {{3 7/8 + 2 8/9 - 1 1/6}} by rounding each mixed number to the nearest whole number. What estimate does she get?",
        options: ["4", "6", "8", "5"],
        answerIndex: 1,
        explanation:
          "{{3 7/8}} rounds to 4, {{2 8/9}} rounds to 3 and {{1 1/6}} rounds to 1, so the estimate is 4 + 3 − 1 = 6. (The exact answer is about 5.6, so 6 is a good estimate.) 4 uses only the whole-number parts (3 + 2 − 1), ignoring that {{7/8}} and {{8/9}} are nearly whole ones. 8 adds the last number instead of subtracting it, and 5 rounds {{1 1/6}} up to 2.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Is {{7/8}} closer to 0 or to 1? What about {{8/9}} and {{1/6}}?",
          "Round each one: {{3 7/8}} → 4, {{2 8/9}} → 3, {{1 1/6}} → 1.",
          "Keep the minus sign: 4 + 3 − 1.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q10",
        question: "A recipe for one pandan chiffon cake uses {{2 3/4}} cups of flour. How many cups of flour are needed for 6 cakes?",
        options: ["{{12 3/4}}", "15", "{{66/24}}", "{{16 1/2}}"],
        answerIndex: 3,
        explanation:
          "Multiply each part: 6 × 2 = 12 and {{6 × 3/4 = 18/4 = 4 1/2}}, so the total is {{12 + 4 1/2 = 16 1/2}} cups. Or: {{6 × 11/4 = 66/4 = 16 1/2}}. {{12 3/4}} multiplies the whole number but forgets the {{3/4}}. 15 comes from writing {{2 3/4}} wrongly as {{10/4}}. {{66/24}} multiplies the denominator by 6 as well — that's still just {{2 3/4}}, one cake's worth.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Six cakes means 6 lots of 2 cups and 6 lots of {{3/4}} cup.",
          "{{6 × 3/4 = 18/4}}. Write that as a mixed number.",
          "Add 12 and {{4 1/2}}.",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q11",
        question:
          "This rectangle is split into 3 equal columns and 4 equal rows. The left two columns are shaded blue and the top three rows are shaded yellow; where they overlap is shown green. What fraction of the whole rectangle is shaded **both** blue and yellow?",
        diagram: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle split into 3 columns and 4 rows. The left two columns are blue, the top three rows are yellow, and the 6 cells where they overlap are green. One cell, bottom right, is white."><rect x="0" y="0" width="300" height="220" fill="#ffffff"/><rect x="30" y="15" width="160" height="120" fill="#bbf7d0"/><rect x="30" y="135" width="160" height="40" fill="#bae6fd"/><rect x="190" y="15" width="80" height="120" fill="#fde68a"/><g stroke="#334155" stroke-width="1"><line x1="110" y1="15" x2="110" y2="175"/><line x1="190" y1="15" x2="190" y2="175"/><line x1="30" y1="55" x2="270" y2="55"/><line x1="30" y1="95" x2="270" y2="95"/><line x1="30" y1="135" x2="270" y2="135"/></g><rect x="30" y="15" width="240" height="160" fill="none" stroke="#1f2937" stroke-width="2"/><rect x="20" y="192" width="14" height="14" fill="#bae6fd" stroke="#334155"/><text x="40" y="204" font-size="12" font-family="sans-serif" fill="#1f2937">blue only</text><rect x="110" y="192" width="14" height="14" fill="#fde68a" stroke="#334155"/><text x="130" y="204" font-size="12" font-family="sans-serif" fill="#1f2937">yellow only</text><rect x="215" y="192" width="14" height="14" fill="#bbf7d0" stroke="#334155"/><text x="235" y="204" font-size="12" font-family="sans-serif" fill="#1f2937">both</text></svg>`,
        options: ["{{1/2}}", "{{11/12}}", "{{5/7}}", "{{17/12}}"],
        answerIndex: 0,
        explanation:
          "The overlap is 2 columns × 3 rows = 6 of the 12 small cells, so it is {{6/12 = 1/2}}. That is exactly {{2/3 × 3/4 = 6/12}}: {{2/3}} *of* {{3/4}} means multiply. {{11/12}} counts every cell shaded at least once, not just the overlap. {{5/7}} adds tops and bottoms, and {{17/12}} is {{2/3 + 3/4}} — more than the whole rectangle!",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "How many small cells are there altogether?",
          "Count the green cells — the ones that are both blue and yellow.",
          "Compare your count with {{2/3 × 3/4}}.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q12",
        question: "Work out {{5 ÷ 2/3}}.",
        options: ["{{3 1/3}}", "{{2/15}}", "{{7 1/2}}", "15"],
        answerIndex: 2,
        explanation:
          "Dividing by {{2/3}} is the same as multiplying by its reciprocal, {{3/2}}: {{5 × 3/2 = 15/2 = 7 1/2}}. Sense check: {{2/3}} is less than 1, so more than 5 of them fit into 5. {{3 1/3}} is {{5 × 2/3}} — multiplying without flipping — and it's *smaller* than 5, which can't be right. 15 multiplies by 3 but forgets to divide by 2, and {{2/15}} flips the 5 instead of the {{2/3}}.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "How many thirds are there in 5? So how many *two*-thirds?",
          "Multiply by the reciprocal of {{2/3}}.",
          "Work out {{5 × 3/2}}.",
        ],
        strategy: "Use the reciprocal",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q13",
        question:
          "Wei Ling ran for 35 minutes on Monday and for 20 minutes on Tuesday. Write Monday's time as a fraction of Tuesday's time, in its simplest form.",
        options: ["{{4/7}}", "{{7/4}}", "{{7/11}}", "{{3/4}}"],
        answerIndex: 1,
        explanation:
          "'Monday as a fraction of Tuesday' puts Monday on top: {{35/20 = 7/4}}. It is more than 1 because she ran *longer* on Monday — fractions bigger than 1 are fine here. {{4/7}} is the wrong way round (Tuesday as a fraction of Monday). {{7/11}} compares Monday with the 55-minute total, and {{3/4}} uses the 15-minute difference.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "Which time goes on top: the one before 'as a fraction of', or the one after?",
          "Monday ÷ Tuesday = {{35/20}}.",
          "Simplify by dividing the top and the bottom by 5.",
        ],
        strategy: "Check the size makes sense",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q14",
        question: "Work out {{1/2 + 1/2 × 2/3}}.",
        options: ["{{2/3}}", "{{2/5}}", "{{1/3}}", "{{5/6}}"],
        answerIndex: 3,
        explanation:
          "Multiplication comes before addition: {{1/2 × 2/3 = 1/3}}, then {{1/2 + 1/3 = 3/6 + 2/6 = 5/6}}. {{2/3}} comes from working left to right — adding first to get 1, then multiplying. {{2/5}} does the multiplication first but then adds tops and bottoms.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "Which operation comes first: + or ×?",
          "Work out {{1/2 × 2/3}} on its own.",
          "Now add {{1/2}} — sixths work.",
        ],
        strategy: "Follow the order of operations",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q15",
        question:
          "Ravi writes:\n\n    {{2/3 + 1/4 ÷ 1/2 = 11/12 ÷ 1/2 = 11/6}}\n\nWhat was his mistake, and what is the correct answer?",
        options: [
          "He made no mistake — the answer is {{11/6}}",
          "He should have halved {{11/12}}, so the answer is {{11/24}}",
          "He added before dividing, but division comes first — the answer is {{7/6}}",
          "He flipped the wrong fraction — the answer is {{2 2/3}}",
        ],
        answerIndex: 2,
        explanation:
          "Division comes before addition: {{1/4 ÷ 1/2 = 1/4 × 2 = 1/2}}, then {{2/3 + 1/2 = 4/6 + 3/6 = 7/6}}. Ravi's dividing was fine — his error was doing the addition first. {{11/24}} treats '÷ {{1/2}}' as 'halve it', but dividing by a half *doubles*. {{2 2/3}} flips {{1/4}} instead of {{1/2}}.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "In {{2/3 + 1/4 ÷ 1/2}}, which operation should be done first?",
          "Work out {{1/4 ÷ 1/2}} on its own. How many halves fit into a quarter?",
          "Then add the result to {{2/3}}.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q16",
        question: "Simplify {{x/3 × 6/x}} (where x ≠ 0).",
        options: ["2", "{{x^2/18}}", "{{2x}}", "{{(x + 6)/(3 + x)}}"],
        answerIndex: 0,
        explanation:
          "Multiply tops and bottoms: {{(6x)/(3x)}}. The x on top cancels with the x underneath and {{6/3 = 2}}, leaving 2. Try x = 5: {{5/3 × 6/5 = 30/15 = 2}}. {{x^2/18}} cross-multiplies as if dividing. {{2x}} forgets that one x is in the denominator, so it cancels. {{(x + 6)/(3 + x)}} adds instead of multiplying.",
        difficulty: "core",
        guideRef: "algebraic-fractions",
        hints: [
          "Write it as one fraction: tops × tops, bottoms × bottoms.",
          "You get {{(6x)/(3x)}}. What cancels?",
          "Check by substituting a number, such as x = 5.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q17",
        question:
          "Always, sometimes or never true?\n\n*Dividing a positive number by a positive fraction gives an answer bigger than the number you started with.*",
        options: [
          "Always — dividing by a fraction always gives a bigger answer",
          "Sometimes — only when the fraction is less than 1",
          "Never — dividing always makes a number smaller",
          "Sometimes — only when the fraction has an even denominator",
        ],
        answerIndex: 1,
        explanation:
          "Dividing by a fraction less than 1 makes the answer bigger: {{6 ÷ 2/3 = 9}}. But fractions can be 1 or more: {{6 ÷ 3/2 = 4}} is smaller, and dividing by {{5/5}} leaves 6 unchanged. So it is only sometimes true. 'Always' assumes every fraction is less than 1 — improper fractions such as {{3/2}} break that. The even denominator idea fails too: {{6 ÷ 1/3 = 18}} is bigger, and 3 is odd.",
        difficulty: "challenge",
        guideRef: "dividing",
        hints: [
          "Try {{6 ÷ 1/2}}. Then try {{6 ÷ 3/2}}.",
          "Is {{3/2}} a fraction? What happens when you divide by it?",
          "What decides whether dividing makes the answer bigger or smaller?",
        ],
        strategy: "Look for a counterexample",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q18",
        question: "Which number is exactly halfway between {{-1/3}} and {{1/2}} on a number line?",
        options: ["{{1/12}}", "{{1/6}}", "{{5/12}}", "{{-1/12}}"],
        answerIndex: 0,
        explanation:
          "Use twelfths: {{-1/3 = -4/12}} and {{1/2 = 6/12}}. The gap is 10 twelfths, so halfway is 5 twelfths up from {{-4/12}}: {{-4/12 + 5/12 = 1/12}}. Or average them: {{(-1/3 + 1/2) ÷ 2 = 1/6 ÷ 2 = 1/12}}. {{5/12}} is half the gap, but it must be added to the starting point. {{1/6}} is the sum before halving. {{-1/12}} has the right size but the wrong sign: the midpoint is above zero, because {{1/2}} is further from 0 than {{-1/3}} is.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Write both numbers in twelfths.",
          "How many twelfths apart are they? Take half of that.",
          "Count that many twelfths up from {{-4/12}}.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q19",
        question:
          "Priya spent {{1/3}} of her money on a book. She then spent {{1/4}} of the money **left** on lunch at a hawker centre. She now has $27. How much did she have at the start?",
        options: ["$64.80", "$36", "$40.50", "$54"],
        answerIndex: 3,
        explanation:
          "Work backwards. Lunch took a quarter of what was left, so $27 is {{3/4}} of the money before lunch: 27 ÷ {{3/4}} = $36. The book took a third, so $36 is {{2/3}} of the start: 36 ÷ {{2/3}} = $54. Check: {{1/3}} of 54 is 18, leaving 36; {{1/4}} of 36 is 9, leaving 27. $64.80 adds {{1/3 + 1/4 = 7/12}} as if both were fractions of the *starting* amount — but the quarter is a quarter of what was left. $36 only undoes the lunch.",
        difficulty: "challenge",
        guideRef: "fractions-of-amounts",
        hints: [
          "The {{1/4}} is a quarter of what was *left*, not of the start. Try working backwards from $27.",
          "$27 is {{3/4}} of the money she had just before lunch.",
          "That amount is {{2/3}} of what she started with.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "fractions-m1-q20",
        question: "Work out {{1/2 + 1/6 + 1/12 + 1/20 + 1/30 + 1/42}}.",
        options: ["{{7/8}}", "{{6/112}}", "{{6/7}}", "{{1/7}}"],
        answerIndex: 2,
        explanation:
          "Build it up: {{1/2}}, then {{2/3}}, {{3/4}}, {{4/5}}, {{5/6}}, {{6/7}} — each new term moves the total to the next fraction in the pattern, because {{1/(n(n+1)) = 1/n - 1/(n+1)}}. Six terms reach {{6/7}}. {{6/112}} adds all the tops and all the bottoms — far too small, since the first term alone is {{1/2}}. {{7/8}} goes one step too far, and {{1/7}} is the amount still missing from 1.",
        difficulty: "challenge",
        guideRef: "adding-subtracting",
        hints: [
          "Add just the first two terms. Then the first three. What do you notice?",
          "The running totals go {{1/2}}, {{2/3}}, {{3/4}}, … How many terms are there?",
          "Each denominator is n × (n + 1): 1 × 2, 2 × 3, 3 × 4, …",
        ],
        strategy: "Find a pattern",
      },
    ],
  },

  // ===========================================================================
  // MCQ Paper 2
  // ===========================================================================
  {
    id: "fractions-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "fractions-m2-q01",
        question: "Which fraction is equivalent to {{3/5}}?",
        options: ["{{5/7}}", "{{15/20}}", "{{12/20}}", "{{6/5}}"],
        answerIndex: 2,
        explanation:
          "Multiply the top **and** the bottom by the same number: {{(3 × 4)/(5 × 4) = 12/20}}. {{5/7}} adds 2 to the top and bottom — adding changes the value ({{5/7}} ≈ 0.71 but {{3/5}} = 0.6). {{15/20}} multiplies the top by 5 but the bottom by 4. {{6/5}} doubles only the top.",
        difficulty: "warmup",
        guideRef: "equivalence-ordering",
        hints: ["What can you do to the top and the bottom that keeps the value the same?"],
        strategy: "Multiply top and bottom by the same number",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q02",
        question: "Without working it out exactly, which is the best estimate of {{12/13 + 7/8}}?",
        options: ["1", "2", "19", "21"],
        answerIndex: 1,
        explanation:
          "{{12/13}} and {{7/8}} are each just under 1, so their sum is just under 2. 19 comes from adding the numerators and 21 from adding the denominators — neither can be right when both fractions are less than 1. An estimate of 1 would mean one of the fractions is about 0.",
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["Is each fraction close to 0, close to {{1/2}} or close to 1?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q03",
        question: "Work out {{3/7 × 14}}.",
        options: ["6", "2", "{{3/98}}", "{{42/98}}"],
        answerIndex: 0,
        explanation:
          "{{1/7}} of 14 is 2, so {{3/7}} of 14 is 3 × 2 = 6. Or: {{(3 × 14)/7 = 42/7 = 6}}. 2 is only {{1/7}} of 14. {{3/98}} multiplies the denominator by 14 instead of the numerator, and {{42/98}} multiplies both — which leaves the value at {{3/7}}.",
        difficulty: "warmup",
        guideRef: "multiplying",
        hints: ["Find {{1/7}} of 14 first."],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q04",
        question: "How many quarters are there in 3? (That is, work out {{3 ÷ 1/4}}.)",
        options: ["{{3/4}}", "{{1/12}}", "{{4/3}}", "12"],
        answerIndex: 3,
        explanation:
          "Each whole holds 4 quarters, so 3 wholes hold 3 × 4 = 12. Dividing by {{1/4}} is the same as multiplying by 4. {{3/4}} is {{3 × 1/4}} — multiplying instead of dividing. {{1/12}} flips the 3 instead of the {{1/4}}, and {{4/3}} is 4 ÷ 3, a division the wrong way round.",
        difficulty: "warmup",
        guideRef: "dividing",
        hints: ["How many quarters are there in 1 whole?"],
        strategy: "Ask how many fit",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q05",
        question: "Work out {{(2/3)^2}}.",
        options: ["{{4/6}}", "{{4/9}}", "{{2/9}}", "{{4/3}}"],
        answerIndex: 1,
        explanation:
          "Squaring means multiplying by itself: {{2/3 × 2/3 = 4/9}}. Both the top and the bottom get squared. {{4/6}} squares only the top, {{2/9}} squares only the bottom, and {{4/3}} doubles instead of squaring.",
        difficulty: "warmup",
        guideRef: "calculating-with-fractions",
        hints: ["{{(2/3)^2}} means {{2/3 × 2/3}}."],
        strategy: "Rewrite the power as a product",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q06",
        question: "Which is greater, {{5/8}} or {{7/12}}, and by how much?",
        options: ["{{7/12}}, by {{1/24}}", "{{7/12}}, by {{1/2}}", "{{5/8}}, by {{1/20}}", "{{5/8}}, by {{1/24}}"],
        answerIndex: 3,
        explanation:
          "The LCM of 8 and 12 is 24: {{5/8 = 15/24}} and {{7/12 = 14/24}}. So {{5/8}} is greater, by {{1/24}}. Choosing {{7/12}} assumes bigger numbers make a bigger fraction — but twelfths are smaller pieces than eighths. {{1/2}} comes from subtracting tops and bottoms, {{(7-5)/(12-8)}}. {{1/20}} gets the right numerator (15 − 14 = 1) but then uses 8 + 12 = 20 as the denominator — adding denominators never gives a common denominator.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Find a common denominator: the LCM of 8 and 12.",
          "Write both fractions in twenty-fourths.",
          "Compare the numerators, then subtract.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q07",
        question: "Work out {{2 3/4 + 1 5/6}}. Give your answer as a mixed number in its simplest form.",
        options: ["{{4 7/12}}", "{{3 8/10}}", "{{3 7/12}}", "{{3 1/3}}"],
        answerIndex: 0,
        explanation:
          "Add the wholes: 2 + 1 = 3. Add the fractions in twelfths: {{9/12 + 10/12 = 19/12 = 1 7/12}}. Total: {{3 + 1 7/12 = 4 7/12}}. {{3 7/12}} forgets to carry the extra whole from {{19/12}}. {{3 8/10}} adds tops and bottoms. {{3 1/3}} changes both denominators to 24 without changing the numerators ({{3/24 + 5/24}}).",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Add the whole numbers and the fractions separately.",
          "Write {{3/4}} and {{5/6}} in twelfths.",
          "{{19/12}} is more than 1 — carry the whole.",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q08",
        question:
          "Jun works out {{5 1/4 - 2 3/4}} like this:\n\n    5 − 2 = 3 and {{3/4 - 1/4 = 2/4}}, so the answer is {{3 1/2}}.\n\nWhat is the correct answer?",
        options: ["{{3 1/2}}", "{{2 1/4}}", "{{2 1/2}}", "{{1/4}}"],
        answerIndex: 2,
        explanation:
          "The question needs {{1/4 - 3/4}}, which you can't do without borrowing; Jun quietly turned it round to {{3/4 - 1/4}}, which gave {{3 1/2}}. Borrow 1 whole: {{5 1/4 = 4 5/4}}, so {{4 5/4 - 2 3/4 = 2 2/4 = 2 1/2}}. Check with improper fractions: {{21/4 - 11/4 = 10/4 = 2 1/2}}. {{2 1/4}} borrows the whole as {{4/4}} but forgets the {{1/4}} already there. {{1/4}} converts the mixed numbers wrongly, as {{6/4}} and {{5/4}}.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "In {{5 1/4 - 2 3/4}}, which fraction is being taken away from which?",
          "Can you take {{3/4}} from {{1/4}}? Borrow 1 whole from the 5.",
          "{{5 1/4 = 4 5/4}}. Now subtract.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q09",
        question: "Work out {{14/15 × 25/28}}, cancelling first. Give your answer in its simplest form.",
        options: ["{{39/43}}", "{{5/6}}", "{{5/3}}", "{{35/42}}"],
        answerIndex: 1,
        explanation:
          "Cancel before multiplying: 14 and 28 share a factor of 14 (leaving 1 and 2); 25 and 15 share a factor of 5 (leaving 5 and 3). Then {{(1 × 5)/(3 × 2) = 5/6}}. {{5/3}} forgets the 2 left over from the 28. {{35/42}} has the right value but isn't fully simplified (the HCF is 7). {{39/43}} adds tops and bottoms.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Look for a number on top and a number underneath that share a factor.",
          "14 goes into 28; 5 goes into both 25 and 15.",
          "After cancelling you have {{1/3 × 5/2}}.",
        ],
        strategy: "Cancel first",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q10",
        question:
          "{{3/5}} of a school garden is lawn. {{2/3}} of the lawn has been mowed. What fraction of the **whole garden** has been mowed?",
        options: ["{{19/15}}", "{{9/10}}", "{{1/15}}", "{{2/5}}"],
        answerIndex: 3,
        explanation:
          "{{2/3}} *of* {{3/5}} means {{2/3 × 3/5 = 6/15 = 2/5}}. Sense check: the mowed part must be smaller than the lawn, {{3/5}}. {{19/15}} adds the fractions — more than the whole garden! {{9/10}} divides instead of multiplying, and {{1/15}} subtracts.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "'{{2/3}} of the lawn' — which operation does 'of' mean?",
          "Work out {{2/3 × 3/5}}.",
          "Should the answer be bigger or smaller than {{3/5}}?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q11",
        question: "Work out {{3/5 ÷ 9/10}}. Give your answer in its simplest form.",
        options: ["{{2/3}}", "{{27/50}}", "{{3/2}}", "{{1 23/27}}"],
        answerIndex: 0,
        explanation:
          "Keep {{3/5}}, change ÷ to ×, flip {{9/10}}: {{3/5 × 10/9 = 30/45 = 2/3}}. Check: {{2/3 × 9/10 = 18/30 = 3/5}}. {{27/50}} multiplies without flipping. {{3/2}} flips the *first* fraction instead of the second, and {{1 23/27}} flips both.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "Dividing by a fraction is multiplying by its reciprocal. Which fraction gets flipped?",
          "Work out {{3/5 × 10/9}} — cancel before multiplying.",
          "Check: does your answer × {{9/10}} give {{3/5}}?",
        ],
        strategy: "Keep, change, flip",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q12",
        question: "A ribbon is {{4 1/2}} m long. How many pieces, each {{3/4}} m long, can be cut from it?",
        options: ["{{3 3/8}}", "{{5 1/3}}", "6", "{{1/6}}"],
        answerIndex: 2,
        explanation:
          "Count in quarters: {{4 1/2}} m is 18 quarter-metres and each piece uses 3 of them, so 18 ÷ 3 = 6 pieces. Or: {{9/2 ÷ 3/4 = 9/2 × 4/3 = 6}}. {{3 3/8}} multiplies instead of dividing. {{5 1/3}} divides only the 4 m and forgets the extra half metre. {{1/6}} flips the first fraction instead of the second.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "How many quarter-metres are there in {{4 1/2}} m?",
          "Each piece uses 3 of those quarters.",
          "Or change {{4 1/2}} to {{9/2}} and divide by {{3/4}}.",
        ],
        strategy: "Ask how many fit",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q13",
        question:
          "Wei Ling pours {{2/3}} litre of water into an empty jug. She pours out {{1/4}} litre, then adds another {{3/8}} litre. How much water is in the jug now?",
        options: ["{{1/24}} litre", "{{19/24}} litre", "{{1 7/24}} litres", "{{4/15}} litre"],
        answerIndex: 1,
        explanation:
          "Use twenty-fourths: {{2/3 = 16/24}}, {{1/4 = 6/24}} and {{3/8 = 9/24}}. Then {{16/24 - 6/24 + 9/24 = 19/24}} litre. {{1/24}} subtracts *both* amounts — but the {{3/8}} litre was added. {{1 7/24}} adds all three, ignoring the water poured out. {{4/15}} combines the tops (2 − 1 + 3 = 4) and adds the bottoms (3 + 4 + 8 = 15) — fractions can't be combined like that.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Which amounts are added, and which is taken away?",
          "Find a denominator that 3, 4 and 8 all divide into.",
          "Work out {{16/24 - 6/24 + 9/24}}.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q14",
        question: "A school bag costing $80 is reduced by {{3/8}} in a sale. What is the sale price?",
        options: ["$30", "$70", "$128", "$50"],
        answerIndex: 3,
        explanation:
          "{{1/8}} of $80 is $10, so the reduction is {{3/8}} = $30 and the sale price is 80 − 30 = $50. Quicker: you now pay {{5/8}} of the price, and {{5/8 × 80 = 50}}. $30 is the *reduction*, not the new price. $70 takes off only {{1/8}}. $128 divides by {{5/8}} instead of multiplying.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "Find {{1/8}} of $80.",
          "The reduction is 3 of those eighths. Take it off the price.",
          "Or: what fraction of the price is left to pay?",
        ],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q15",
        question: "Use the laws of arithmetic to work out {{3/4 × 17 + 3/4 × 3}} in your head.",
        options: ["15", "{{40 1/2}}", "{{15 3/4}}", "30"],
        answerIndex: 0,
        explanation:
          "Both products share the factor {{3/4}}, so {{3/4 × 17 + 3/4 × 3 = 3/4 × (17 + 3) = 3/4 × 20 = 15}}. {{40 1/2}} works from left to right, ignoring that × comes before +. {{15 3/4}} forgets to multiply the 3 by {{3/4}}. 30 adds the two {{3/4}}s as well as the 17 and 3 — the common factor is used only once.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "What do the two products have in common?",
          "Take it out as a factor: {{3/4 × (17 + 3)}}.",
          "What is {{3/4}} of 20?",
        ],
        strategy: "Use the distributive law",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q16",
        question: "Simplify {{(2a)/5 ÷ a/10}} (where a ≠ 0).",
        options: ["{{a^2/25}}", "{{1/4}}", "4", "{{4a}}"],
        answerIndex: 2,
        explanation:
          "Flip the second fraction and multiply: {{(2a)/5 × 10/a = (20a)/(5a) = 4}}. The a's cancel, so the answer doesn't depend on a. Check with a = 5: {{10/5 ÷ 5/10 = 2 ÷ 1/2 = 4}}. {{a^2/25}} multiplies without flipping. {{1/4}} flips the first fraction instead of the second. {{4a}} forgets to cancel the a's.",
        difficulty: "core",
        guideRef: "algebraic-fractions",
        hints: [
          "Keep, change, flip — which fraction do you flip?",
          "You get {{(2a)/5 × 10/a}}. What cancels?",
          "Check by putting a = 5.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q17",
        question:
          "In a class, {{3/5}} of the students are girls. {{1/3}} of the girls and {{1/2}} of the boys walk to school. What fraction of the **whole class** walks to school?",
        options: ["{{5/6}}", "{{5/12}}", "{{1/6}}", "{{2/5}}"],
        answerIndex: 3,
        explanation:
          "Girls who walk: {{1/3 × 3/5 = 1/5}} of the class. Boys are {{2/5}} of the class and half of them walk: {{1/2 × 2/5 = 1/5}}. Total: {{1/5 + 1/5 = 2/5}}. Check with a class of 30: 18 girls (6 walk) and 12 boys (6 walk), so 12 out of 30 = {{2/5}}. {{5/6}} adds {{1/3}} and {{1/2}}, but they are fractions of *different* groups. {{5/12}} averages them, which only works if there are equal numbers of girls and boys. {{1/6}} multiplies {{1/3}} by {{1/2}}.",
        difficulty: "challenge",
        guideRef: "fractions-of-amounts",
        hints: [
          "Pick a class size that works nicely — say 30 — and count.",
          "What fraction of the class are boys?",
          "Find the walkers among the girls and among the boys as fractions of the whole class, then add.",
        ],
        strategy: "Try a convenient number",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q18",
        question: "Which fraction is closest to {{1/2}}?",
        options: ["{{4/7}}", "{{7/15}}", "{{5/9}}", "{{6/13}}"],
        answerIndex: 1,
        explanation:
          "Compare each with a half: {{4/7}} is {{1/14}} away ({{8/14}} vs {{7/14}}), {{5/9}} is {{1/18}} away, {{6/13}} is {{1/26}} away and {{7/15}} is {{1/30}} away. Each numerator is exactly half a piece from half the denominator, so the fraction with the **smallest pieces** (biggest denominator) is closest: {{7/15}}. Picking {{4/7}} because it has the smallest numbers, or {{5/9}} because it is 'just over half', ignores how big each piece is.",
        difficulty: "challenge",
        guideRef: "equivalence-ordering",
        hints: [
          "For each fraction, what would the numerator need to be to make exactly {{1/2}}?",
          "For example, {{7/15}} compared with {{7.5/15}}: each numerator is half a piece away from 'half'.",
          "Half a piece is smallest when the pieces are smallest — which fraction has the smallest pieces?",
        ],
        strategy: "Compare with a benchmark",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q19",
        question: "Work out {{(1 - 1/2)(1 - 1/3)(1 - 1/4) … (1 - 1/10)}}.",
        options: ["{{1/10}}", "{{9/10}}", "{{1/512}}", "{{1/9}}"],
        answerIndex: 0,
        explanation:
          "Each bracket simplifies: {{1/2 × 2/3 × 3/4 × … × 9/10}}. Every numerator cancels with the denominator just before it, leaving {{1/10}}. Small cases show it: {{1/2 × 2/3 = 1/3}}, then times {{3/4}} gives {{1/4}}. {{1/512}} treats every bracket as {{1/2}}. {{9/10}} is just the last bracket. {{1/9}} counts the nine brackets instead of looking at the last denominator.",
        difficulty: "challenge",
        guideRef: "multiplying",
        hints: [
          "Work out each bracket: {{1 - 1/2 = 1/2}}, {{1 - 1/3 = 2/3}}, …",
          "Multiply the first two brackets, then the first three. What pattern do you see?",
          "Look for cancelling between neighbouring fractions.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "fractions-m2-q20",
        question: "Work out {{1/(1 + 1/(1 + 1/2))}}.",
        options: ["{{5/3}}", "{{2/3}}", "{{3/5}}", "{{2/5}}"],
        answerIndex: 2,
        explanation:
          "Work from the inside out: {{1 + 1/2 = 3/2}}; {{1 ÷ 3/2 = 2/3}}; {{1 + 2/3 = 5/3}}; {{1 ÷ 5/3 = 3/5}}. {{5/3}} forgets the final '1 ÷'. {{2/3}} stops one layer too early. {{2/5}} ignores the middle fraction bar and works out {{1 ÷ (1 + 1 + 1/2)}}.",
        difficulty: "challenge",
        guideRef: "calculating-with-fractions",
        hints: [
          "Start with the innermost part: {{1 + 1/2}}.",
          "1 divided by a fraction is just its reciprocal.",
          "Keep working outwards, one layer at a time.",
        ],
        strategy: "Work from the inside out",
      },
    ],
  },

  // ===========================================================================
  // MCQ Paper 3
  // ===========================================================================
  {
    id: "fractions-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "fractions-m3-q01",
        question: "Work out {{5/6 - 1/3}}. Give your answer in its simplest form.",
        options: ["{{4/3}}", "{{1/2}}", "{{4/6}}", "{{5/18}}"],
        answerIndex: 1,
        explanation:
          "{{1/3 = 2/6}}, so {{5/6 - 2/6 = 3/6 = 1/2}}. {{4/3}} subtracts tops and bottoms — and it's bigger than {{5/6}}, which can't happen when you take something away. {{4/6}} subtracts the numerators without first changing {{1/3}} into sixths. {{5/18}} multiplies instead of subtracting.",
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["Write {{1/3}} in sixths first."],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q02",
        question: "What is the **lowest** common denominator you could use to work out {{5/12 + 7/18}}?",
        options: ["216", "6", "30", "36"],
        answerIndex: 3,
        explanation:
          "The lowest common denominator is the LCM of 12 and 18. The multiples of 18 are 18, 36, … and 12 divides into 36, so it's 36. Then {{15/36 + 14/36 = 29/36}}. 216 = 12 × 18 also works, but it isn't the lowest, so the numbers get big. 6 is the HCF — 12 doesn't divide into 6. 30 adds the denominators.",
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["List the multiples of 18 and stop at the first one that 12 divides into."],
        strategy: "Use the LCM",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q03",
        question: "What number is the arrow pointing to on this number line?",
        diagram: `<svg viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from −1 to 1 with eight equal steps. An arrow points to the first tick mark to the right of −1."><rect x="0" y="0" width="360" height="90" fill="#ffffff"/><line x1="15" y1="50" x2="345" y2="50" stroke="#1f2937" stroke-width="2"/><g stroke="#1f2937" stroke-width="2"><line x1="30" y1="41" x2="30" y2="59"/><line x1="180" y1="41" x2="180" y2="59"/><line x1="330" y1="41" x2="330" y2="59"/></g><g stroke="#334155" stroke-width="1.5"><line x1="67.5" y1="44" x2="67.5" y2="56"/><line x1="105" y1="44" x2="105" y2="56"/><line x1="142.5" y1="44" x2="142.5" y2="56"/><line x1="217.5" y1="44" x2="217.5" y2="56"/><line x1="255" y1="44" x2="255" y2="56"/><line x1="292.5" y1="44" x2="292.5" y2="56"/></g><g font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="30" y="78">−1</text><text x="180" y="78">0</text><text x="330" y="78">1</text></g><line x1="67.5" y1="8" x2="67.5" y2="32" stroke="#1f2937" stroke-width="2"/><polygon points="61.5,31 73.5,31 67.5,41" fill="#1f2937"/></svg>`,
        options: ["{{-3/4}}", "{{-1/4}}", "{{-3/8}}", "{{3/4}}"],
        answerIndex: 0,
        explanation:
          "There are 4 equal steps between −1 and 0, so each step is {{1/4}}. The arrow is 3 steps to the left of 0, at {{-3/4}}. {{-1/4}} counts the 1 step from −1 instead of the steps from 0. {{-3/8}} treats the whole line (8 steps) as one whole. {{3/4}} forgets that numbers to the left of 0 are negative.",
        difficulty: "warmup",
        guideRef: "equivalence-ordering",
        hints: ["How many equal steps are there between −1 and 0? What is each step worth?"],
        strategy: "Read the scale",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q04",
        question: "{{1/4}} of a number is 9. What is {{3/4}} of the same number?",
        options: ["36", "{{6 3/4}}", "27", "12"],
        answerIndex: 2,
        explanation:
          "{{3/4}} is three lots of {{1/4}}, so it is 3 × 9 = 27. (The whole number is 36.) 36 is the whole number, not {{3/4}} of it. {{6 3/4}} works out {{3/4}} of 9 instead of {{3/4}} of the number. 12 treats the 9 as {{3/4}} of the number and finds the whole.",
        difficulty: "warmup",
        guideRef: "fractions-of-amounts",
        hints: ["How many quarters make {{3/4}}?"],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q05",
        question: "Work out {{2/3 ÷ 4}}.",
        options: ["{{8/3}}", "6", "{{3/8}}", "{{1/6}}"],
        answerIndex: 3,
        explanation:
          "Dividing by 4 is the same as multiplying by {{1/4}}: {{2/3 × 1/4 = 2/12 = 1/6}}. Sharing {{2/3}} into 4 equal parts must give something smaller than {{2/3}}. {{8/3}} multiplies by 4 instead. 6 flips the {{2/3}} rather than the 4, and {{3/8}} flips the {{2/3}} *and* divides.",
        difficulty: "warmup",
        guideRef: "dividing",
        hints: ["Sharing {{2/3}} into 4 equal parts — will each part be bigger or smaller than {{2/3}}?"],
        strategy: "Use the reciprocal",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q06",
        question: "Which fraction lies **strictly between** {{2/5}} and {{1/2}}?",
        options: ["{{9/20}}", "{{1/3}}", "{{3/5}}", "{{2/4}}"],
        answerIndex: 0,
        explanation:
          "In twentieths, {{2/5 = 8/20}} and {{1/2 = 10/20}}, so {{9/20}} sits exactly between them. {{2/4}} *equals* {{1/2}}, so it isn't strictly between. {{1/3}} has a denominator between 2 and 5, but its value (about 0.33) is less than {{2/5}}. {{3/5}} adds 1 to the numerator of {{2/5}}, which overshoots to 0.6.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Rewrite {{2/5}} and {{1/2}} with the same denominator.",
          "Twentieths work: {{8/20}} and {{10/20}}. What lies between them?",
          "'Strictly between' means not equal to either end.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q07",
        question: "What must be added to {{2 5/8}} to make 5?",
        options: ["{{3 3/8}}", "{{2 3/8}}", "{{3 5/8}}", "{{7 5/8}}"],
        answerIndex: 1,
        explanation:
          "Count on: from {{2 5/8}}, add {{3/8}} to reach 3, then 2 more to reach 5. Altogether that's {{2 3/8}}. Check: {{2 5/8 + 2 3/8 = 4 8/8 = 5}}. {{3 3/8}} does 5 − 2 = 3 and then *also* adds the {{3/8}}, counting one whole twice. {{3 5/8}} keeps the {{5/8}} instead of finding what's missing. {{7 5/8}} adds instead of finding the difference.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Use the inverse: this is {{5 - 2 5/8}}. Or count on.",
          "How much do you need to get from {{2 5/8}} up to 3?",
          "Then how much more from 3 up to 5?",
        ],
        strategy: "Count on",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q08",
        question:
          "Ethan's homework session is split up like this:\n\n| Subject | Fraction of the time |\n|---|---|\n| Maths | {{1/3}} |\n| Science | {{1/4}} |\n| English | {{1/6}} |\n| Reading | ? |\n\nWhat fraction of the time is spent reading?",
        options: ["{{3/4}}", "{{10/13}}", "{{1/4}}", "{{5/12}}"],
        answerIndex: 2,
        explanation:
          "The four fractions must add up to 1 whole session. In twelfths: {{4/12 + 3/12 + 2/12 = 9/12 = 3/4}}, so reading is {{1 - 3/4 = 1/4}}. {{3/4}} is the time on the three subjects — you still need to take it away from 1. {{10/13}} comes from adding tops and bottoms to get {{3/13}}. {{5/12}} leaves out English.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "All four fractions together make the whole session, which is 1.",
          "Add the three known fractions using twelfths.",
          "Subtract that total from 1.",
        ],
        strategy: "Use the whole",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q09",
        question: "What fraction of 2 hours is 45 minutes? Give your answer in its simplest form.",
        options: ["{{45/2}}", "{{3/4}}", "{{8/3}}", "{{3/8}}"],
        answerIndex: 3,
        explanation:
          "Use the same units: 2 hours = 120 minutes, so the fraction is {{45/120 = 3/8}} (divide by 15). {{45/2}} mixes minutes with hours. {{3/4}} is 45 minutes as a fraction of **1** hour. {{8/3}} is upside down — it would mean 45 minutes is longer than 2 hours.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "Put both times in the same unit.",
          "2 hours = 120 minutes.",
          "Simplify {{45/120}} using the HCF, 15.",
        ],
        strategy: "Use the same units",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q10",
        question:
          "A durian has a mass of 1.8 kg and a pineapple has a mass of 750 g. Write the durian's mass as a fraction of the pineapple's mass, in its simplest form.",
        options: ["{{5/12}}", "{{12/5}}", "{{3/1250}}", "{{12/17}}"],
        answerIndex: 1,
        explanation:
          "Same units first: 1.8 kg = 1800 g. The durian as a fraction of the pineapple is {{1800/750 = 12/5}} (divide by 150). It's bigger than 1 because the durian is heavier — that's fine. {{5/12}} is the wrong way round. {{3/1250}} comes from {{1.8/750}}, mixing kilograms with grams. {{12/17}} compares the durian with the total mass of both fruits.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "Convert so that both masses are in grams.",
          "'Durian as a fraction of pineapple' — which goes on top?",
          "Simplify {{1800/750}}: divide by 50, then by 3.",
        ],
        strategy: "Use the same units",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q11",
        question:
          "Arjun says {{2 1/2 × 3 1/3 = 6 1/6}}, because 2 × 3 = 6 and {{1/2 × 1/3 = 1/6}}. What is the correct answer?",
        options: ["{{6 1/6}}", "{{5 5/6}}", "{{8 1/3}}", "{{6 5/6}}"],
        answerIndex: 2,
        explanation:
          "Use improper fractions: {{5/2 × 10/3 = 50/6 = 8 1/3}}. Arjun's method misses two pieces. Picture a rectangle {{2 1/2}} by {{3 1/3}}: as well as 2 × 3 and {{1/2 × 1/3}}, there are the strips {{2 × 1/3 = 2/3}} and {{1/2 × 3 = 1 1/2}}. All four together: {{6 + 1/6 + 2/3 + 1 1/2 = 8 1/3}}. {{5 5/6}} adds the mixed numbers instead of multiplying, and {{6 5/6}} adds the fraction parts.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Estimate: {{2 1/2 × 3}} is already {{7 1/2}}. Is {{6 1/6}} believable?",
          "Convert both mixed numbers to improper fractions.",
          "Work out {{5/2 × 10/3}}, cancelling the 2 and the 10 first.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q12",
        question: "Which is the best estimate of {{4 7/8 × 3 1/9}}?",
        options: ["About 15", "About 12", "About 8", "About 20"],
        answerIndex: 0,
        explanation:
          "Round each to the nearest whole number: {{4 7/8}} ≈ 5 and {{3 1/9}} ≈ 3, so the product is about 5 × 3 = 15 (exactly, it's about 15.2). About 12 uses only the whole-number parts, 4 × 3, ignoring that {{7/8}} is nearly a whole one. About 8 adds instead of multiplying. About 20 rounds both numbers up.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Round each mixed number to the nearest whole number.",
          "Is {{7/8}} closer to 0 or to 1? Is {{1/9}}?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q13",
        question: "Which calculation gives the same answer as {{4 ÷ 2/5}}?",
        options: ["{{4 × 2/5}}", "{{1/4 × 2/5}}", "{{4 ÷ 5 × 2}}", "{{4 × 5/2}}"],
        answerIndex: 3,
        explanation:
          "Dividing by {{2/5}} is the same as multiplying by its reciprocal, {{5/2}}: {{4 × 5/2 = 10}}. (There are 10 lots of {{2/5}} in 4.) {{4 × 2/5}} forgets to flip. {{1/4 × 2/5}} flips the 4 instead. {{4 ÷ 5 × 2}} swaps the roles of the 2 and the 5 and gives 1.6.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "Estimate first: about how many {{2/5}}s fit into 4?",
          "What is the reciprocal of {{2/5}}?",
          "Work out each calculation and compare with your estimate.",
        ],
        strategy: "Use the reciprocal",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q14",
        question:
          "A 2-litre jug of sugarcane juice is poured into cups that each hold {{3/8}} litre. How many cups can be filled **completely**?",
        options: ["6", "5", "16", "{{3/4}}"],
        answerIndex: 1,
        explanation:
          "{{2 ÷ 3/8 = 2 × 8/3 = 16/3 = 5 1/3}}. Only 5 cups are full; the {{1/3}} is a third of a sixth cup. 6 rounds {{5 1/3}} up, but there isn't enough juice to fill a sixth cup. 16 multiplies by 8 but forgets to divide by 3. {{3/4}} multiplies instead of dividing.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "How many eighths of a litre are there in 2 litres?",
          "Each cup uses 3 of those eighths.",
          "Is the answer a whole number? What does the remainder mean here?",
        ],
        strategy: "Interpret the remainder",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q15",
        question: "Which is the best estimate of {{19 7/8 ÷ 4 1/12}}?",
        options: ["About 5", "About 80", "About {{1/5}}", "About 24"],
        answerIndex: 0,
        explanation:
          "Round to friendly numbers: {{19 7/8}} ≈ 20 and {{4 1/12}} ≈ 4, so the answer is about 20 ÷ 4 = 5 (exactly, it's about 4.9). About 80 multiplies instead of dividing. About {{1/5}} divides the wrong way round (4 ÷ 20), and about 24 adds.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: ["Round each number to the nearest whole number.", "Then work out 20 ÷ 4."],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q16",
        question: "Simplify {{3/y × y^2/6}} (where y ≠ 0).",
        options: ["{{2/y}}", "{{y^2/2}}", "{{y/2}}", "{{1/2}}"],
        answerIndex: 2,
        explanation:
          "Multiply to get {{(3y^2)/(6y)}}. Cancel 3 into 6 to leave {{1/2}}, and cancel one y from {{y^2}} with the y underneath, leaving {{y/2}}. Check with y = 4: {{3/4 × 16/6 = 48/24 = 2}}, and {{4/2 = 2}}. {{y^2/2}} forgets to cancel a y. {{1/2}} cancels both y's from {{y^2}} — but there's only one y underneath. {{2/y}} is upside down.",
        difficulty: "core",
        guideRef: "algebraic-fractions",
        hints: [
          "Write it as one fraction: tops × tops, bottoms × bottoms.",
          "{{y^2}} means y × y. How many y's can cancel?",
          "Check by substituting y = 4.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q17",
        question:
          "A ball is dropped from a height of 2.7 m. After each bounce it rises to {{2/3}} of the height it last fell from. How high does it rise after the **third** bounce?",
        options: ["1.2 m", "0 m", "0.8 m", "1.8 m"],
        answerIndex: 2,
        explanation:
          "Each bounce multiplies the height by {{2/3}}: 2.7 m → 1.8 m → 1.2 m → 0.8 m. In one go: {{2.7 × (2/3)^3 = 2.7 × 8/27 = 0.8}}. 1.8 m is after one bounce and 1.2 m after two. 0 m takes {{1/3}} of the *original* 2.7 m (0.9 m) off each time, but each bounce loses {{1/3}} of the *latest* height.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "After the first bounce it reaches {{2/3}} of 2.7 m.",
          "The second bounce is {{2/3}} of *that* height, not of 2.7 m.",
          "Multiply by {{2/3}} three times.",
        ],
        strategy: "Make a table",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q18",
        question: "How far short of 1 is {{1/2 + 1/4 + 1/8 + 1/16 + 1/32 + 1/64}}?",
        options: ["{{1/64}}", "{{1/128}}", "{{1/32}}", "0 — the total is exactly 1"],
        answerIndex: 0,
        explanation:
          "Picture a square: shade half, then half of what's left, and so on. Each time, the unshaded gap is the same size as the piece just added: after {{1/2}} the gap is {{1/2}}, after {{1/4}} it is {{1/4}}, … after {{1/64}} it is {{1/64}}. So the total is {{63/64}}, short by {{1/64}}. 0 assumes the total reaches 1, but the gap only halves — it never closes. {{1/128}} is the next term you *would* add, and {{1/32}} is the gap one step earlier.",
        difficulty: "challenge",
        guideRef: "adding-subtracting",
        hints: [
          "Try smaller cases: {{1/2}}, then {{1/2 + 1/4}}, then {{1/2 + 1/4 + 1/8}}. How far short of 1 is each?",
          "Picture a square: shade half, then half of what's left, and so on.",
          "The gap left over is always the same size as the last piece added.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q19",
        question:
          "Ethan was meant to **multiply** a number by {{3/4}}. By mistake he **divided** it by {{3/4}} and got 32. What should his answer have been?",
        options: ["24", "18", "{{42 2/3}}", "{{56 8/9}}"],
        answerIndex: 1,
        explanation:
          "Work backwards. Dividing by {{3/4}} gave 32, so the number was {{32 × 3/4 = 24}}. The correct answer is {{24 × 3/4 = 18}}. 24 is the starting number, not the answer. {{42 2/3}} divides 32 by {{3/4}} again instead of undoing the division. {{56 8/9}} divides by {{3/4}} twice.",
        difficulty: "challenge",
        guideRef: "dividing",
        hints: [
          "What is the inverse of dividing by {{3/4}}?",
          "Undo his mistake to find the original number.",
          "Now do what he should have done: multiply that number by {{3/4}}.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "fractions-m3-q20",
        question: "Adding {{3/2}} to a number gives the same result as multiplying the number by {{3/2}}. What is the number?",
        options: ["{{3/2}}", "2", "0", "3"],
        answerIndex: 3,
        explanation:
          "Call the number n: {{n + 3/2 = 3/2 n}}. Multiplying by {{3/2}} adds on half of n, so half of n must be {{3/2}}, giving n = 3. Check: {{3 + 3/2 = 4 1/2}} and {{3 × 3/2 = 9/2 = 4 1/2}}. 2 solves a different puzzle — 'add 2' and 'multiply by 2' agree at 2. Testing {{3/2}}: {{3/2 + 3/2 = 3}} but {{3/2 × 3/2 = 9/4}}. 0 fails because {{0 + 3/2}} is not 0.",
        difficulty: "challenge",
        guideRef: "calculating-with-fractions",
        hints: [
          "Try a few numbers — 1, 2, 3 … — and compare 'add {{3/2}}' with 'multiply by {{3/2}}'.",
          "Multiplying by {{3/2}} adds on half of the number. When is half the number equal to {{3/2}}?",
          "Write {{n + 3/2 = 3/2 n}} and solve.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },

  // ===========================================================================
  // MCQ Paper 4
  // ===========================================================================
  {
    id: "fractions-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "fractions-m4-q01",
        question: "Write {{17/5}} as a mixed number.",
        options: ["{{3 2/17}}", "{{2 3/5}}", "{{1 7/10}}", "{{3 2/5}}"],
        answerIndex: 3,
        explanation:
          "17 ÷ 5 = 3 remainder 2: three wholes (15 fifths) with 2 fifths left over, so {{17/5 = 3 2/5}}. The remainder is still counted in fifths — {{3 2/17}} puts it over 17. {{1 7/10}} reads {{17/5}} like the decimal 1.7, but 1.7 is {{17/10}}. {{2 3/5}} is only 13 fifths.",
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["How many whole lots of 5 fit into 17, and how many are left over?"],
        strategy: "Convert between forms",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q02",
        question: "Which calculation does **not** give {{3/4}} of 60?",
        options: ["{{60 ÷ 3 × 4}}", "{{60 ÷ 4 × 3}}", "{{60 × 3 ÷ 4}}", "{{3/4 × 60}}"],
        answerIndex: 0,
        explanation:
          "{{3/4}} of 60 is 45: divide by the denominator, 4, and multiply by the numerator, 3, in either order. {{60 ÷ 4 × 3}}, {{60 × 3 ÷ 4}} and {{3/4 × 60}} all give 45. {{60 ÷ 3 × 4}} swaps the jobs of the 3 and the 4 and gives 80 — more than 60, which is impossible for a fraction less than 1.",
        difficulty: "warmup",
        guideRef: "fractions-of-amounts",
        hints: ["Work out each calculation. Which one isn't 45?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q03",
        question: "Which symbol makes this statement true?\n\n{{-7/10}} … {{-2/3}}",
        options: [">", "<", "=", "≥"],
        answerIndex: 1,
        explanation:
          "In thirtieths, {{7/10 = 21/30}} and {{2/3 = 20/30}}, so {{7/10}} is the bigger size. For negatives, the bigger size is further below zero, so {{-7/10 < -2/3}}. Choosing > or ≥ comes from comparing the sizes and forgetting that both numbers are negative. They can't be equal, since {{21/30 != 20/30}}.",
        difficulty: "warmup",
        guideRef: "equivalence-ordering",
        hints: ["Compare {{7/10}} and {{2/3}} first, then think about which negative is further to the left of 0 on a number line."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q04",
        question: "Without working it out exactly, which statement about {{8/9 × 23}} is true?",
        options: [
          "It is more than 23, because multiplying makes numbers bigger",
          "It is less than 1, because {{8/9}} is less than 1",
          "It is between 20 and 23",
          "It is about 2.5, because 23 ÷ 9 is about 2.5",
        ],
        answerIndex: 2,
        explanation:
          "{{8/9}} is a bit less than 1, so {{8/9}} of 23 is a bit less than 23 — exactly {{184/9}}, about 20.4. Multiplying a positive number by a fraction less than 1 makes it *smaller*, so 'more than 23' is wrong. 'Less than 1' mixes up the fraction with the answer. About 2.5 is only {{1/9}} of 23 — it forgets to multiply by 8.",
        difficulty: "warmup",
        guideRef: "calculating-with-fractions",
        hints: ["Is {{8/9}} more or less than 1? What does multiplying by it do to 23?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q05",
        question: "Which statement about {{5/6 × 3/4}} is true?",
        options: [
          "The answer is smaller than both {{5/6}} and {{3/4}}",
          "The answer is bigger than both, because multiplying makes things bigger",
          "The answer is between {{3/4}} and {{5/6}}",
          "The answer is {{8/10}}, found by adding the tops and the bottoms",
        ],
        answerIndex: 0,
        explanation:
          "{{5/6 × 3/4 = 15/24 = 5/8}}, which is 0.625 — smaller than both. Taking {{5/6}} *of* {{3/4}} gives part of {{3/4}}, so it must be less than {{3/4}}. 'Multiplying makes bigger' is only true when you multiply by a number greater than 1. {{8/10}} adds tops and bottoms, which isn't how fractions multiply.",
        difficulty: "warmup",
        guideRef: "multiplying",
        hints: ["{{5/6 × 3/4}} means {{5/6}} *of* {{3/4}}. Is that more or less than {{3/4}}?"],
        strategy: "Reason about size",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q06",
        question:
          "Four friends each had their own margherita pizza, all the same size. The table shows what fraction of their own pizza each friend ate.\n\n| Name | Fraction eaten |\n|---|---|\n| Aisha | {{5/8}} |\n| Jun | {{2/3}} |\n| Mei | {{7/12}} |\n| Arjun | {{3/5}} |\n\nWho ate the most?",
        options: ["Mei", "Aisha", "Jun", "Arjun"],
        answerIndex: 2,
        explanation:
          "Use 120ths (the LCM of 8, 3, 12 and 5): Aisha {{75/120}}, Jun {{80/120}}, Mei {{70/120}} and Arjun {{72/120}}. Jun ate the most. Mei's {{7/12}} has the biggest numbers but the *smallest* value — twelfths are small pieces. Aisha's {{5/8}} (0.625) is close, but still less than {{2/3}} (about 0.667).",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Bigger numbers don't mean a bigger fraction. How can you compare fairly?",
          "Convert each one to a decimal, or use a common denominator.",
          "The LCM of 8, 3, 12 and 5 is 120.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q07",
        question: "Work out {{7/10 + 8/15}}. Give your answer as a mixed number.",
        options: ["{{3/5}}", "{{29/30}}", "{{37/60}}", "{{1 7/30}}"],
        answerIndex: 3,
        explanation:
          "The LCM of 10 and 15 is 30: {{7/10 = 21/30}} and {{8/15 = 16/30}}. So {{21/30 + 16/30 = 37/30 = 1 7/30}}. {{29/30}} changes {{8/15}} into thirtieths without doubling its numerator. {{37/60}} adds the two denominators at the end. {{3/5}} adds tops and bottoms ({{15/25}}).",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Find the LCM of 10 and 15.",
          "Convert each fraction — whatever you do to the bottom, do to the top.",
          "{{37/30}} is top-heavy: write it as a mixed number.",
        ],
        strategy: "Use the LCM",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q08",
        question:
          "Arjun has saved some money. The bar model shows that {{3/8}} of his savings is $45. How much has he saved altogether?",
        diagram: `<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar split into 8 equal parts. The first 3 parts are shaded and labelled 45 dollars. The whole bar is labelled with a question mark."><rect x="0" y="0" width="340" height="120" fill="#ffffff"/><rect x="20" y="40" width="112.5" height="36" fill="#c7d2fe"/><g stroke="#334155" stroke-width="1"><line x1="57.5" y1="40" x2="57.5" y2="76"/><line x1="95" y1="40" x2="95" y2="76"/><line x1="132.5" y1="40" x2="132.5" y2="76"/><line x1="170" y1="40" x2="170" y2="76"/><line x1="207.5" y1="40" x2="207.5" y2="76"/><line x1="245" y1="40" x2="245" y2="76"/><line x1="282.5" y1="40" x2="282.5" y2="76"/></g><rect x="20" y="40" width="300" height="36" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M20 34 V26 H132.5 V34" fill="none" stroke="#334155" stroke-width="1.5"/><text x="76.25" y="20" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">$45</text><path d="M20 82 V90 H320 V82" fill="none" stroke="#334155" stroke-width="1.5"/><text x="170" y="110" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">total = ?</text></svg>`,
        options: ["$15", "$120", "$75", "$16.88"],
        answerIndex: 1,
        explanation:
          "3 parts are worth $45, so 1 part is 45 ÷ 3 = $15 and all 8 parts are 8 × 15 = $120. $15 is just one part. $75 is the 5 unshaded parts — what's left, not the total. $16.88 works out {{3/8}} *of* $45, but $45 is already the {{3/8}}.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "How many parts make $45?",
          "Find the value of one part.",
          "How many parts make the whole bar?",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q09",
        question: "Which is larger: {{2/3}} of 48, or {{3/4}} of 44? By how much?",
        options: ["{{3/4}} of 44, by 1", "{{2/3}} of 48, by 1", "They are equal", "{{3/4}} of 44, by {{1/12}}"],
        answerIndex: 0,
        explanation:
          "{{2/3}} of 48 is 48 ÷ 3 × 2 = 32. {{3/4}} of 44 is 44 ÷ 4 × 3 = 33. So {{3/4}} of 44 is larger, by 1. {{1/12}} is the difference between the fractions {{3/4}} and {{2/3}} — but they are fractions of *different* amounts, so you have to work out each one.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: ["Work out each amount separately.", "Divide by the denominator, then multiply by the numerator."],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q10",
        question: "Work out {{(2/3 - 1/6) × 4/5}}.",
        options: ["{{8/15}}", "{{4/15}}", "{{2/5}}", "{{5/8}}"],
        answerIndex: 2,
        explanation:
          "Brackets first: {{2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2}}. Then {{1/2 × 4/5 = 4/10 = 2/5}}. {{8/15}} ignores the brackets and multiplies first. {{4/15}} subtracts tops and bottoms inside the bracket (getting {{1/3}}) and then multiplies. {{5/8}} divides by {{4/5}} instead of multiplying.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "What do the brackets tell you to do first?",
          "Use sixths: {{2/3 = 4/6}}.",
          "Then multiply your answer by {{4/5}}.",
        ],
        strategy: "Follow the order of operations",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q11",
        question: "Which of these has the **largest** value?",
        options: ["{{1/2 + 1/3}}", "{{1/2 × 1/3}}", "{{1/2 - 1/3}}", "{{1/2 ÷ 1/3}}"],
        answerIndex: 3,
        explanation:
          "{{1/2 ÷ 1/3 = 1/2 × 3 = 3/2}} — one and a half thirds fit into a half. The others are smaller: {{1/2 + 1/3 = 5/6}}, {{1/2 × 1/3 = 1/6}} and {{1/2 - 1/3 = 1/6}}. Adding *feels* as if it should give the most, but dividing by a number less than 1 makes things bigger — here even bigger than adding.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "Estimate each one: which of them give less than {{1/2}}?",
          "How many thirds fit into a half — more than 1 or less than 1?",
          "Work out each value and compare.",
        ],
        strategy: "Reason about size",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q12",
        question: "A rectangular garden bed is {{3 1/2}} m long and {{2 2/7}} m wide. What is its area?",
        diagram: `<svg viewBox="0 0 330 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle labelled 3 and a half metres long and 2 and two sevenths metres wide."><rect x="0" y="0" width="330" height="200" fill="#ffffff"/><rect x="40" y="20" width="210" height="137" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><text x="145" y="182" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">3 1/2 m</text><text x="260" y="93" font-size="14" font-family="sans-serif" fill="#1f2937">2 2/7 m</text></svg>`,
        options: ["{{6 1/7}} m²", "8 m²", "{{11 4/7}} m²", "{{5 11/14}} m²"],
        answerIndex: 1,
        explanation:
          "Area = length × width = {{3 1/2 × 2 2/7 = 7/2 × 16/7}}. Cancel the 7s, and 2 into 16: {{1/1 × 8/1 = 8}}, so the area is 8 m². {{6 1/7}} multiplies the whole numbers (3 × 2) and the fractions ({{1/2 × 2/7}}) separately and misses the two cross pieces. {{11 4/7}} is the perimeter, and {{5 11/14}} just adds the two sides.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Change both mixed numbers to improper fractions.",
          "{{7/2 × 16/7}} — what cancels?",
          "Estimate to check: about 3.5 × 2.3.",
        ],
        strategy: "Cancel first",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q13",
        question:
          "The diagram shows {{1 1/2}} split into equal pieces of size {{3/8}}. Which calculation, with its answer, does it show?",
        diagram: `<svg viewBox="0 0 352 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar of 12 equal small cells. The first 8 cells are labelled 1 and the last 4 cells are labelled one half. The cells are coloured in 4 groups of 3, and each group is labelled 3/8."><rect x="0" y="0" width="352" height="110" fill="#ffffff"/><rect x="20" y="38" width="78" height="34" fill="#c7d2fe"/><rect x="98" y="38" width="78" height="34" fill="#fde68a"/><rect x="176" y="38" width="78" height="34" fill="#c7d2fe"/><rect x="254" y="38" width="78" height="34" fill="#fde68a"/><g stroke="#334155" stroke-width="1"><line x1="46" y1="38" x2="46" y2="72"/><line x1="72" y1="38" x2="72" y2="72"/><line x1="124" y1="38" x2="124" y2="72"/><line x1="150" y1="38" x2="150" y2="72"/><line x1="202" y1="38" x2="202" y2="72"/><line x1="228" y1="38" x2="228" y2="72"/><line x1="280" y1="38" x2="280" y2="72"/><line x1="306" y1="38" x2="306" y2="72"/></g><g stroke="#1f2937" stroke-width="2.5"><line x1="98" y1="38" x2="98" y2="72"/><line x1="176" y1="38" x2="176" y2="72"/><line x1="254" y1="38" x2="254" y2="72"/></g><rect x="20" y="38" width="312" height="34" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M20 32 V25 H226 V32" fill="none" stroke="#334155" stroke-width="1.5"/><path d="M230 32 V25 H332 V32" fill="none" stroke="#334155" stroke-width="1.5"/><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="123" y="19">1</text><text x="281" y="19">1/2</text><text x="59" y="92">3/8</text><text x="137" y="92">3/8</text><text x="215" y="92">3/8</text><text x="293" y="92">3/8</text></g></svg>`,
        options: [
          "{{1 1/2 ÷ 3/8 = 4}}",
          "{{1 1/2 × 3/8 = 9/16}}",
          "{{3/8 ÷ 1 1/2 = 1/4}}",
          "{{1 1/2 ÷ 3/8 = 12}}",
        ],
        answerIndex: 0,
        explanation:
          "The diagram answers 'how many {{3/8}}s fit into {{1 1/2}}?', which is the division {{1 1/2 ÷ 3/8}}. {{1 1/2}} is 12 eighths and each piece is 3 eighths, so there are 12 ÷ 3 = 4 pieces. Check: {{3/2 × 8/3 = 4}}. 12 counts the small eighths, not the groups of three. {{3/8 ÷ 1 1/2}} asks the reverse question — how much of {{1 1/2}} fits into {{3/8}}. {{9/16}} multiplies instead of dividing.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "Count the small cells. What is each one worth?",
          "How many small cells are in each coloured piece?",
          "How many coloured pieces are there?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q14",
        question: "Work out {{3 1/3 ÷ 1 1/4}}. Give your answer as a mixed number.",
        options: ["{{4 1/3}}", "{{4 1/6}}", "{{3/8}}", "{{2 2/3}}"],
        answerIndex: 3,
        explanation:
          "Change to improper fractions: {{10/3 ÷ 5/4 = 10/3 × 4/5 = 40/15 = 8/3 = 2 2/3}}. Estimate: about 3.3 ÷ 1.25, which is a bit less than 3. {{4 1/3}} divides the wholes (3 ÷ 1) and the fractions ({{1/3 ÷ 1/4}}) separately — that doesn't work for division. {{4 1/6}} multiplies instead of dividing, and {{3/8}} flips the first fraction instead of the second.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "Convert both mixed numbers to improper fractions first.",
          "Then keep, change, flip.",
          "Estimate: roughly 3 ÷ 1. Is your answer sensible?",
        ],
        strategy: "Convert to improper fractions",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q15",
        question:
          "Siti has {{3 1/2}} m of fabric. She uses {{1 2/3}} m for a bag and {{3/4}} m for a pencil case. How much fabric is left?",
        options: ["{{2 11/12}} m", "{{5 11/12}} m", "{{1 1/12}} m", "{{1 5/6}} m"],
        answerIndex: 2,
        explanation:
          "Fabric used: {{1 2/3 + 3/4 = 1 8/12 + 9/12 = 2 5/12}} m. Left over: {{3 6/12 - 2 5/12 = 1 1/12}} m. {{2 11/12}} does 3 − 1 = 2 for the wholes, then writes the fraction part as {{11/12}} when it is really {{-11/12}}. {{1 5/6}} forgets the pencil case, and {{5 11/12}} adds everything.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Find the total amount of fabric used first.",
          "Twelfths work for halves, thirds and quarters.",
          "Subtract the total used from {{3 1/2}}.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q16",
        question: "A recipe for 4 people uses {{3/4}} cup of coconut milk. How much coconut milk is needed for 10 people?",
        options: ["{{7 1/2}} cups", "{{1 7/8}} cups", "{{6 3/4}} cups", "{{3/10}} cup"],
        answerIndex: 1,
        explanation:
          "For 1 person: {{3/4 ÷ 4 = 3/16}} cup. For 10 people: {{10 × 3/16 = 30/16 = 1 7/8}} cups. Or scale by {{10/4 = 5/2}}: {{3/4 × 5/2 = 15/8 = 1 7/8}}. {{7 1/2}} multiplies by 10 but forgets that the recipe was for 4 people. {{6 3/4}} *adds* 6 because there are 6 more people — recipes scale by multiplying. {{3/10}} uses the scale factor upside down.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "How much is needed for 1 person?",
          "Divide {{3/4}} by 4, then multiply by 10.",
          "Or: what do you multiply 4 by to get 10?",
        ],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q17",
        question:
          "Always, sometimes or never true?\n\n*If {{a/b}} is greater than {{c/d}}, and both are positive, then {{-a/b}} is greater than {{-c/d}}.*",
        options: [
          "Never true",
          "Always true",
          "Sometimes true — only when the denominators are equal",
          "Sometimes true — only when both fractions are less than 1",
        ],
        answerIndex: 0,
        explanation:
          "Putting a minus sign on both numbers reflects them in 0 on the number line, so the one that was further right ends up further left: the order flips. Example: {{3/4 > 1/2}}, but {{-3/4 < -1/2}}. This happens for every pair, whatever the denominators and whether or not the fractions are less than 1, so it is never true. 'Always' is what you get by comparing negative fractions by their size alone.",
        difficulty: "challenge",
        guideRef: "equivalence-ordering",
        hints: [
          "Test it: {{3/4 > 1/2}}. Is {{-3/4 > -1/2}}?",
          "Picture both pairs on a number line. What does putting a minus sign in front do to a point?",
          "Could any choice of positive fractions make it work?",
        ],
        strategy: "Look for a counterexample",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q18",
        question: "Work out {{1/2 ÷ 1/3 ÷ 1/4}}.",
        options: ["{{3/8}}", "24", "6", "{{1/24}}"],
        answerIndex: 2,
        explanation:
          "Divisions are done from left to right: {{1/2 ÷ 1/3 = 1/2 × 3 = 3/2}}, then {{3/2 ÷ 1/4 = 3/2 × 4 = 6}}. Only the fractions you divide *by* get flipped: {{1/2 × 3 × 4 = 6}}. {{3/8}} works from right to left. 24 flips the first fraction as well, and {{1/24}} multiplies everything.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "When a calculation has only ÷ signs, which direction do you work in?",
          "Do {{1/2 ÷ 1/3}} first.",
          "Which fractions get flipped — all of them, or only the ones after a ÷ sign?",
        ],
        strategy: "Follow the order of operations",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q19",
        question: "A water tank is {{1/4}} full. After 6 litres are added, it is {{5/8}} full. What is the capacity of the tank?",
        options: ["24 litres", "9.6 litres", "{{2 1/4}} litres", "16 litres"],
        answerIndex: 3,
        explanation:
          "The 6 litres filled the gap from {{1/4}} to {{5/8}}: {{5/8 - 2/8 = 3/8}} of the tank. So {{3/8}} is 6 litres, {{1/8}} is 2 litres, and the whole tank is 8 × 2 = 16 litres. 9.6 litres treats the 6 litres as {{5/8}} of the tank — but the tank wasn't empty to start with. 24 litres treats the 6 litres as {{1/4}}. {{2 1/4}} litres finds {{3/8}} *of* 6 instead of using 6 as the {{3/8}}.",
        difficulty: "challenge",
        guideRef: "fractions-of-amounts",
        hints: [
          "What fraction of the tank did the 6 litres fill?",
          "Work out {{5/8 - 1/4}} using eighths.",
          "If {{3/8}} of the tank is 6 litres, what is {{1/8}}?",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "fractions-m4-q20",
        question: "Hana says: '{{x/4 ÷ x/12}} gives a different answer for every value of x.' Is she right? (Assume x ≠ 0.)",
        options: ["Yes — it equals {{x^2/48}}", "No — it always equals 3", "No — it always equals {{1/3}}", "Yes — it equals {{3x}}"],
        answerIndex: 1,
        explanation:
          "{{x/4 ÷ x/12 = x/4 × 12/x = (12x)/(4x) = 3}}. The x's cancel, so the answer is 3 whatever x is (as long as x ≠ 0). Check with x = 8: {{2 ÷ 2/3 = 3}}. {{x^2/48}} multiplies without flipping. {{1/3}} flips the first fraction instead of the second. {{3x}} cancels the numbers but forgets to cancel the x's.",
        difficulty: "challenge",
        guideRef: "algebraic-fractions",
        hints: [
          "Try a value: x = 4. Then try x = 12.",
          "Keep, change, flip — then look for something that cancels.",
          "In {{x/4 × 12/x}}, what happens to the x's?",
        ],
        strategy: "Check by substituting",
      },
    ],
  },
];
