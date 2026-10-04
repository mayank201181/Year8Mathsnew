import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "percentages",
  title: "Percentages",
  strand: "Number",
  icon: "💯",
  summary: "Per cent means 'out of 100' — and one multiplier does the rest.",
  intro:
    "A percentage is a fraction with a denominator of 100, which makes very different quantities easy to compare. In this chapter you will convert between fractions, decimals and percentages, find percentages of amounts in your head and on a calculator, and use a single **multiplier** to increase, decrease and even undo a percentage change. Then you will put it all to work on GST, discounts, interest, profit and loss — and find out why +10% followed by −10% does not take you back to where you started.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "fdp-conversions",
      heading: "Fractions, decimals & percentages",
      discovery: {
        problem:
          "Which is biggest: {{5/8}}, 0.6 or 62%? Decide without a calculator.\n\nNow a harder one: a bakery says this year's sales are '125% of last year's'. Can a percentage be bigger than 100? What would {{5/4}} be as a percentage?",
        idea:
          "Put everything into the same form. {{5/8}} = 0.625 = 62.5% and 0.6 = 60%, so the order is 0.6 < 62% < {{5/8}}.\n\nPer cent just means 'per hundred', so 125% means 125 hundredths: {{125/100 = 5/4}} = 1.25. That is more than one whole — and that is perfectly allowed. The bakery sold a quarter more than last year.",
      },
      body:
        "**Per cent** means *per hundred* (from the Latin *per centum*). So 37% means 37 out of every 100, which is {{37/100}} or 0.37. Fractions, decimals and percentages are three ways of writing the **same number**.\n\n| From → to | Method | Example |\n|---|---|---|\n| Percentage → decimal | ÷ 100 | 35% = 0.35 |\n| Decimal → percentage | × 100 | 0.075 = 7.5% |\n| Percentage → fraction | write over 100, then simplify | 35% = {{35/100}} = {{7/20}} |\n| Fraction → percentage | make the denominator 100, or divide then × 100 | {{3/8}} = 0.375 = 37.5% |\n\n**Fraction → decimal.** Divide the numerator by the denominator: {{3/8}} = 3 ÷ 8 = 0.375. If the denominator is a factor of 100 (2, 4, 5, 10, 20, 25, 50) it is quicker to scale up: {{7/20 = 35/100}} = 35%. Some fractions give recurring decimals: {{1/3}} = 0.333… = {{33 1/3}}%.\n\n**Percentages over 100%.** 100% is one whole, so 150% = 1.5 = {{1 1/2}} and 230% = 2.3. You meet these whenever something grows: a population that is 120% of what it was has grown by a fifth.\n\n**Percentages under 1%.** 0.5% = 0.005 = {{1/200}}. Careful: 0.5% is *half of one per cent*, not a half.\n\n**Ordering mixed forms.** Convert everything to one form (decimals or percentages are usually easiest), line them up, then write the answer using the *original* forms.",
      diagram: `<svg viewBox="0 0 480 195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Double number line from 0 to 1.5 showing matching fractions, decimals and percentages, with the part beyond 100 percent shaded"><rect x="0" y="0" width="480" height="195" fill="#ffffff"/><rect x="340" y="28" width="120" height="136" fill="#fde68a" opacity="0.5"/><text x="400" y="20" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">more than one whole</text><text x="10" y="56" font-size="12" font-family="sans-serif" fill="#334155">Fraction</text><text x="10" y="92" font-size="12" font-family="sans-serif" fill="#334155">Decimal</text><text x="10" y="152" font-size="12" font-family="sans-serif" fill="#334155">Percentage</text><line x1="100" y1="70" x2="460" y2="70" stroke="#1f2937" stroke-width="2"/><line x1="100" y1="130" x2="460" y2="130" stroke="#1f2937" stroke-width="2"/><g stroke="#1f2937" stroke-width="1.5"><line x1="100" y1="64" x2="100" y2="76"/><line x1="160" y1="64" x2="160" y2="76"/><line x1="220" y1="64" x2="220" y2="76"/><line x1="280" y1="64" x2="280" y2="76"/><line x1="340" y1="64" x2="340" y2="76"/><line x1="400" y1="64" x2="400" y2="76"/><line x1="460" y1="64" x2="460" y2="76"/><line x1="100" y1="124" x2="100" y2="136"/><line x1="160" y1="124" x2="160" y2="136"/><line x1="220" y1="124" x2="220" y2="136"/><line x1="280" y1="124" x2="280" y2="136"/><line x1="340" y1="124" x2="340" y2="136"/><line x1="400" y1="124" x2="400" y2="136"/><line x1="460" y1="124" x2="460" y2="136"/></g><g stroke="#94a3b8" stroke-dasharray="3 3"><line x1="100" y1="98" x2="100" y2="122"/><line x1="160" y1="98" x2="160" y2="122"/><line x1="220" y1="98" x2="220" y2="122"/><line x1="280" y1="98" x2="280" y2="122"/><line x1="340" y1="98" x2="340" y2="122"/><line x1="400" y1="98" x2="400" y2="122"/><line x1="460" y1="98" x2="460" y2="122"/></g><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="100" y="56">0</text><text x="160" y="56">¼</text><text x="220" y="56">½</text><text x="280" y="56">¾</text><text x="340" y="56">1</text><text x="400" y="56">1¼</text><text x="460" y="56">1½</text></g><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="100" y="92">0</text><text x="160" y="92">0.25</text><text x="220" y="92">0.5</text><text x="280" y="92">0.75</text><text x="340" y="92">1</text><text x="400" y="92">1.25</text><text x="460" y="92">1.5</text><text x="100" y="152">0%</text><text x="160" y="152">25%</text><text x="220" y="152">50%</text><text x="280" y="152">75%</text><text x="340" y="152">100%</text><text x="400" y="152">125%</text><text x="460" y="152">150%</text></g><path d="M100 168 v6 h240 v-6" fill="none" stroke="#334155" stroke-width="1.5"/><text x="220" y="189" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">one whole = 1 = 100%</text></svg>`,
      diagramCaption:
        "A double number line: each fraction, decimal and percentage in the same column names the same point. Past 100% you have more than one whole.",
      workedExamples: [
        {
          title: "Scale the denominator to 100",
          problem: "Write {{7/25}} as a decimal and as a percentage.",
          steps: [
            "25 × 4 = 100, so multiply the top and bottom by 4: {{7/25 = 28/100}}.",
            "28 hundredths is 0.28.",
            "28 hundredths is also 28%.",
          ],
          answer: "0.28 and 28%",
          yourTurn: {
            question: "Your turn: write {{9/20}} as a percentage.",
            answer: { type: "number", value: 45, display: "45%" },
            solution: "20 × 5 = 100, so {{9/20 = 45/100}} = 45%.",
          },
        },
        {
          title: "A percentage over 100%",
          problem: "Write 165% as a decimal, and as a mixed number in its simplest form.",
          steps: [
            "Divide by 100: 165% = 1.65.",
            "As a fraction: 165% = {{165/100}}.",
            "Divide the top and bottom by 5: {{165/100 = 33/20}}.",
            "20 goes into 33 once with 13 left over: {{33/20 = 1 13/20}}.",
          ],
          answer: "1.65 and {{1 13/20}}",
        },
        {
          title: "Ordering mixed forms",
          problem: "Write in order, smallest first: {{2/3}}, 0.67, 66%, {{17/25}}.",
          steps: [
            "Convert everything to decimals.",
            "{{2/3}} = 0.666… (recurring), 0.67 stays as it is, 66% = 0.66 and {{17/25 = 68/100}} = 0.68.",
            "Order the decimals: 0.66 < 0.666… < 0.67 < 0.68.",
            "Write them back in their original forms.",
          ],
          answer: "66%, {{2/3}}, 0.67, {{17/25}}",
        },
      ],
      keyPoints: [
        "Per cent means 'out of 100': x% = {{x/100}}.",
        "Percentage → decimal: ÷ 100. Decimal → percentage: × 100.",
        "100% is one whole, so percentages over 100% are numbers bigger than 1 (140% = 1.4).",
        "To order a mix of forms, convert them all to decimals (or all to percentages) first.",
      ],
      whyItWorks:
        "A percentage *is* a fraction — one whose denominator is always 100. So 35% is literally {{35/100}}, and dividing 35 by 100 gives 0.35. Going the other way, multiplying by 100 asks 'how many hundredths is this?': 0.375 is 37.5 hundredths, which is 37.5%. Nothing special happens at 100: 125 hundredths is simply 1.25 — a whole and a quarter.",
      strategies: ["Convert to one form", "Use benchmark fractions", "Draw a diagram"],
      thinkDeeper:
        "Which of the unit fractions {{1/2}}, {{1/3}}, {{1/4}}, … , {{1/12}} give a whole-number percentage? What do their denominators have in common — and can you explain why?",
    },
    // ------------------------------------------------------------------
    {
      id: "percentage-of-amount",
      heading: "Percentages of amounts",
      discovery: {
        problem:
          "Without a calculator, find 35% of $80. Then find 80% of $35. What do you notice — and can you explain why it happens?",
        idea:
          "35% = 10% + 10% + 10% + 5%. 10% of 80 is 8 and 5% is half of that, 4. So 35% of $80 = 8 + 8 + 8 + 4 = $28.\n\n80% of $35 is also $28! Both are 35 × 80 ÷ 100, just multiplied in a different order. So **x% of y always equals y% of x**. Use it: 4% of 25 looks awkward, but 25% of 4 is obviously 1.",
      },
      body:
        "To find a percentage **of** an amount, remember that 'of' means multiply: 35% of 80 = {{35/100}} × 80.\n\n**Without a calculator: build from easy chunks.**\n- 50% → halve\n- 25% → halve, then halve again\n- 10% → ÷ 10\n- 5% → half of 10%\n- 1% → ÷ 100\n\nThen add or subtract chunks: 35% = 10% + 10% + 10% + 5%; 95% = 100% − 5%; 17.5% = 10% + 5% + 2.5%.\n\n**With a calculator: use a decimal multiplier.** Change the percentage to a decimal and multiply once: 37% of $260 = 0.37 × 260 = $96.20. This is the method for awkward percentages such as 12.7% or 3.25%.\n\n**Check it is sensible.** 37% is a bit more than a third, and a third of 260 is about 87, so $96.20 is believable. Always write money with 2 decimal places: $96.20, not $96.2.",
      diagram: `<svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar worth 80 dollars split into ten 10 percent blocks of 8 dollars each; three and a half blocks are shaded to show that 35 percent is 28 dollars"><rect x="0" y="0" width="480" height="160" fill="#ffffff"/><rect x="40" y="40" width="120" height="40" fill="#c7d2fe"/><rect x="160" y="40" width="20" height="40" fill="#fde68a"/><rect x="40" y="40" width="400" height="40" fill="none" stroke="#1f2937" stroke-width="2"/><g stroke="#334155"><line x1="80" y1="40" x2="80" y2="80"/><line x1="120" y1="40" x2="120" y2="80"/><line x1="160" y1="40" x2="160" y2="80"/><line x1="200" y1="40" x2="200" y2="80"/><line x1="240" y1="40" x2="240" y2="80"/><line x1="280" y1="40" x2="280" y2="80"/><line x1="320" y1="40" x2="320" y2="80"/><line x1="360" y1="40" x2="360" y2="80"/><line x1="400" y1="40" x2="400" y2="80"/></g><line x1="180" y1="40" x2="180" y2="80" stroke="#334155" stroke-dasharray="3 3"/><g font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155"><text x="60" y="32">10%</text><text x="100" y="32">10%</text><text x="140" y="32">10%</text><text x="180" y="32">10%</text><text x="220" y="32">10%</text><text x="260" y="32">10%</text><text x="300" y="32">10%</text><text x="340" y="32">10%</text><text x="380" y="32">10%</text><text x="420" y="32">10%</text></g><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="60" y="65">$8</text><text x="100" y="65">$8</text><text x="140" y="65">$8</text><text x="220" y="65">$8</text><text x="260" y="65">$8</text><text x="300" y="65">$8</text><text x="340" y="65">$8</text><text x="380" y="65">$8</text><text x="420" y="65">$8</text></g><g font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="170" y="65">$4</text><text x="190" y="65">$4</text></g><path d="M40 88 v6 h140 v-6" fill="none" stroke="#334155" stroke-width="1.5"/><text x="110" y="110" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">35% = 8 + 8 + 8 + 4 = $28</text><path d="M40 122 v6 h400 v-6" fill="none" stroke="#334155" stroke-width="1.5"/><text x="240" y="147" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">100% = $80</text></svg>`,
      diagramCaption:
        "$80 cut into ten 10% blocks of $8. Three blocks and a half block make 35%, which is $28.",
      workedExamples: [
        {
          title: "Build it from 10% and 5%",
          problem: "Find 15% of $64 without a calculator.",
          steps: [
            "10% of 64 = 64 ÷ 10 = 6.40.",
            "5% is half of 10%: 6.40 ÷ 2 = 3.20.",
            "15% = 10% + 5% = 6.40 + 3.20 = 9.60.",
          ],
          answer: "$9.60",
          yourTurn: {
            question: "Your turn: find 15% of $48 without a calculator. Give your answer in dollars.",
            answer: { type: "number", value: 7.2, display: "$7.20" },
            solution: "10% = $4.80 and 5% = $2.40, so 15% = 4.80 + 2.40 = $7.20.",
          },
        },
        {
          title: "Halving further",
          problem: "Find 17.5% of 360 kg without a calculator.",
          steps: [
            "10% of 360 = 36.",
            "5% = half of 10% = 18.",
            "2.5% = half of 5% = 9.",
            "17.5% = 10% + 5% + 2.5% = 36 + 18 + 9 = 63.",
          ],
          answer: "63 kg",
        },
        {
          title: "Calculator multiplier",
          problem: "A school has 1250 students and 38% of them take the MRT to school. How many students is that?",
          steps: [
            "Estimate first: 40% of 1250 = 500, so expect a bit less than 500.",
            "38% = 0.38.",
            "0.38 × 1250 = 475.",
            "475 is a little under 500, as expected.",
          ],
          answer: "475 students",
        },
      ],
      keyPoints: [
        "'Of' means multiply: 35% of 80 = 0.35 × 80.",
        "Mental chunks: 10% = ÷ 10, 5% = half of 10%, 1% = ÷ 100, 50% = halve.",
        "x% of y = y% of x — swap them when one way round is easier.",
        "Estimate first, and give money to 2 decimal places.",
      ],
      whyItWorks:
        "10% is {{10/100 = 1/10}}, so finding 10% means splitting the amount into 10 equal parts and taking one — that is ÷ 10. Every other percentage is a combination of tenths and hundredths, and because multiplication spreads over addition, 35% of 80 = (10% + 10% + 10% + 5%) of 80 = 8 + 8 + 8 + 4.\n\nThe swap trick works because multiplication can be done in any order: {{x/100 * y = (xy)/100 = y/100 * x}}.",
      strategies: ["Build from 10%, 5% and 1%", "Use a decimal multiplier", "Estimate first"],
      thinkDeeper:
        "Using only halving and dividing by 10, find 12.5%, 2.5% and 37.5% of $240. Then spot a quicker route to 37.5% using a fraction. (Hint: 12.5% = {{1/8}}.)",
    },
    // ------------------------------------------------------------------
    {
      id: "one-as-percentage-of-another",
      heading: "One quantity as a percentage of another",
      discovery: {
        problem:
          "Wei Ling scored 18 out of 24 in a science test. Arjun scored 21 out of 30 in a different test. Arjun got more marks — but who actually did better?",
        idea:
          "Raw marks are not a fair comparison when the totals differ. Rescale both to 'out of 100': {{18/24}} = 0.75 = 75% and {{21/30}} = 0.7 = 70%. Wei Ling did better. A percentage puts different-sized wholes on the same scale.",
      },
      body:
        "To write one quantity as a percentage of another:\n\n1. Write a fraction {{part/whole}} — the *whole* is the quantity you are comparing **against** (it usually follows 'of' or 'out of').\n2. Convert the fraction to a percentage by multiplying by 100.\n\n    {{percentage = part/whole * 100}}\n\n**Same units first.** 45 cents as a percentage of $2 is *not* {{45/2}} × 100! Convert to cents: {{45/200}} × 100 = 22.5%. Likewise 30 minutes as a percentage of 2 hours is {{30/120}} × 100 = 25%.\n\n**Comparing by percentage.** Percentages let you compare groups of different sizes. In class 8A, 14 of 25 students are in the school band; in 8B, 15 of 30 are. 8A: {{14/25}} = 56%; 8B: {{15/30}} = 50%. A larger *proportion* of 8A plays, even though 8B has more players.\n\n**The answer can exceed 100%.** If the part is bigger than the quantity you compare against, the percentage is over 100%: $36 as a percentage of $24 is {{36/24}} × 100 = 150%.",
      diagram: `<svg viewBox="0 0 480 185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top: raw marks drawn to scale, 18 of 24 and 21 of 30 on bars of different lengths. Bottom: both rescaled to equal-length 100 percent bars, showing 75 percent and 70 percent"><rect x="0" y="0" width="480" height="185" fill="#ffffff"/><text x="10" y="16" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1f2937">Raw marks (different totals)</text><rect x="150" y="24" width="180" height="22" fill="#c7d2fe"/><rect x="150" y="24" width="240" height="22" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="10" y="40" font-size="12" font-family="sans-serif" fill="#334155">Wei Ling: 18 of 24</text><text x="240" y="40" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">18</text><text x="360" y="40" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#64748b">out of 24</text><rect x="150" y="58" width="210" height="22" fill="#fde68a"/><rect x="150" y="58" width="300" height="22" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="10" y="74" font-size="12" font-family="sans-serif" fill="#334155">Arjun: 21 of 30</text><text x="255" y="74" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">21</text><text x="405" y="74" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#64748b">out of 30</text><text x="10" y="106" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1f2937">Rescaled: out of 100 (same length)</text><rect x="150" y="116" width="225" height="22" fill="#c7d2fe"/><rect x="150" y="116" width="300" height="22" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="10" y="132" font-size="12" font-family="sans-serif" fill="#334155">Wei Ling</text><text x="262" y="132" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">75%</text><rect x="150" y="150" width="210" height="22" fill="#fde68a"/><rect x="150" y="150" width="300" height="22" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="10" y="166" font-size="12" font-family="sans-serif" fill="#334155">Arjun</text><text x="255" y="166" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">70%</text></svg>`,
      diagramCaption:
        "Raw marks sit on bars of different lengths. Rescale both bars to the same length (100%) and Wei Ling's 75% clearly beats Arjun's 70%.",
      workedExamples: [
        {
          title: "A test score",
          problem: "Siti scores 27 out of 40 in a maths quiz. What is her score as a percentage?",
          steps: [
            "Part over whole: {{27/40}}.",
            "27 ÷ 40 = 0.675.",
            "0.675 × 100 = 67.5%.",
          ],
          answer: "67.5%",
          yourTurn: {
            question: "Your turn: Ravi scores 33 out of 60. What is his score as a percentage?",
            answer: { type: "number", value: 55, display: "55%" },
            solution: "{{33/60 = 11/20 = 55/100}}, so 55%.",
          },
        },
        {
          title: "Mixed units",
          problem: "Express 45 cm as a percentage of 1.5 m.",
          steps: [
            "Same units first: 1.5 m = 150 cm.",
            "{{45/150}} = 0.3.",
            "0.3 × 100 = 30%.",
          ],
          answer: "30%",
        },
        {
          title: "Comparing two groups",
          problem: "In Mei's class, 12 of the 32 students walk to school. In Jun's class, 10 of the 25 students walk. Which class has the greater percentage of walkers?",
          steps: [
            "Mei's class: {{12/32}} = 0.375 = 37.5%.",
            "Jun's class: {{10/25}} = 0.4 = 40%.",
            "40% > 37.5%, even though Mei's class has more walkers.",
          ],
          answer: "Jun's class (40% compared with 37.5%)",
        },
      ],
      keyPoints: [
        "Percentage = {{part/whole}} × 100.",
        "The whole comes after 'of' or 'out of' — it goes on the bottom.",
        "Put both quantities in the same units before dividing.",
        "To compare groups of different sizes, compare percentages, not raw counts.",
      ],
      whyItWorks:
        "The fraction {{part/whole}} tells you what share of the whole you have, whatever size the whole is. Multiplying by 100 just rewrites that share as 'so many hundredths'. Once two shares are written over the same denominator, 100, you can compare them directly — that is the whole point of per cent.",
      strategies: ["Write part over whole", "Convert to the same units", "Compare like with like"],
      thinkDeeper:
        "Priya's teacher found 6 marks that had been missed off her test, and her result went up from 60% to 75%. How many marks was the test out of? (What percentage of the test are those 6 marks worth?)",
    },
    // ------------------------------------------------------------------
    {
      id: "multipliers",
      heading: "Percentage increase & decrease with multipliers",
      discovery: {
        problem:
          "A $40 T-shirt goes up in price by 15%. Aisha finds 15% of 40 and adds it on. Marcus types one calculation: 40 × 1.15. Do they get the same answer? Where does Marcus's 1.15 come from?",
        idea:
          "Aisha: 15% of 40 = 6, so 40 + 6 = $46. Marcus: 40 × 1.15 = $46. The new price is the original 100% *plus* 15%, which is 115% = 1.15. One multiplication does 'find it and add it' in a single step.",
      },
      body:
        "A **multiplier** is the single number you multiply by to make a percentage change. Think of the original amount as 100%.\n\n- **Increase by r%:** you keep 100% and gain r%, so you multiply by {{(100 + r)/100}}. A 15% rise → × 1.15.\n- **Decrease by r%:** you keep 100% and lose r%, so you multiply by {{(100 - r)/100}}. A 20% fall → × 0.8.\n\n| Change | New amount is | Multiplier |\n|---|---|---|\n| +15% | 115% | × 1.15 |\n| +5% | 105% | × 1.05 |\n| +100% | 200% | × 2 |\n| −20% | 80% | × 0.8 |\n| −3% | 97% | × 0.97 |\n| −12.5% | 87.5% | × 0.875 |\n\n**Reading a multiplier backwards.** A multiplier above 1 is an increase; below 1 it is a decrease. × 1.07 is a 7% increase, × 0.93 is a 7% decrease, and × 1.5 is a 50% increase. Watch out: × 1.5 is +50%, not +5% (that is × 1.05).\n\n**Why bother?** Multipliers are one-step on a calculator, they make reverse percentages easy (you divide by the multiplier) and they chain together for repeated changes (you multiply the multipliers).",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three bars: the original 40 dollars as 100 percent, a 15 percent increase to 115 percent which is 46 dollars, and a 20 percent decrease to 80 percent which is 32 dollars"><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><line x1="410" y1="16" x2="410" y2="162" stroke="#94a3b8" stroke-dasharray="4 3"/><text x="410" y="12" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#64748b">100%</text><rect x="110" y="20" width="300" height="30" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><text x="260" y="40" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">100% = $40</text><text x="10" y="40" font-size="12" font-family="sans-serif" fill="#334155">Original</text><rect x="110" y="70" width="300" height="30" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="410" y="70" width="45" height="30" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="260" y="90" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">115% = $46</text><text x="432.5" y="89" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">+15%</text><text x="10" y="90" font-size="12" font-family="sans-serif" fill="#334155">× 1.15 (+15%)</text><rect x="110" y="120" width="240" height="30" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="350" y="120" width="60" height="30" fill="#fecaca" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="4 3"/><text x="230" y="140" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">80% = $32</text><text x="380" y="139" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#b91c1c">−20%</text><text x="10" y="140" font-size="12" font-family="sans-serif" fill="#334155">× 0.8 (−20%)</text></svg>`,
      diagramCaption:
        "Start from 100%. A 15% increase leaves you with 115% (× 1.15); a 20% decrease leaves 80% (× 0.8).",
      workedExamples: [
        {
          title: "Increase with a multiplier",
          problem: "Increase $240 by 35% using a multiplier.",
          steps: [
            "100% + 35% = 135%, so the multiplier is 1.35.",
            "240 × 1.35 = 324.",
            "Check: 35% of 240 = 84, and 240 + 84 = 324.",
          ],
          answer: "$324",
          yourTurn: {
            question: "Your turn: increase $180 by 15% using a multiplier. Give your answer in dollars.",
            answer: { type: "number", value: 207, display: "$207" },
            solution: "The multiplier is 1.15, and 180 × 1.15 = $207.",
          },
        },
        {
          title: "Decrease with a multiplier",
          problem: "A laptop costing $1350 is reduced by 8%. Find the new price.",
          steps: [
            "100% − 8% = 92%, so the multiplier is 0.92.",
            "1350 × 0.92 = 1242.",
            "Check: 8% of 1350 = 108, and 1350 − 108 = 1242.",
          ],
          answer: "$1242",
        },
        {
          title: "Writing multipliers",
          problem: "Write the multiplier for (a) a 2.5% increase, (b) a 0.5% decrease, (c) doubling.",
          steps: [
            "(a) 100% + 2.5% = 102.5% → × 1.025.",
            "(b) 100% − 0.5% = 99.5% → × 0.995.",
            "(c) Doubling means 200% of the original, a 100% increase → × 2.",
          ],
          answer: "× 1.025, × 0.995, × 2",
        },
      ],
      keyPoints: [
        "Increase by r%: multiply by 1 + {{r/100}}. Decrease by r%: multiply by 1 − {{r/100}}.",
        "A multiplier above 1 means an increase; below 1 means a decrease.",
        "+5% is × 1.05, not × 1.5 (that is +50%).",
        "One multiplication replaces 'find the percentage, then add or subtract it'.",
      ],
      whyItWorks:
        "Increasing 40 by 15% means 40 + 0.15 × 40. Take out the common factor of 40: 40 × (1 + 0.15) = 40 × 1.15. Decreasing by 20% is 40 − 0.2 × 40 = 40 × (1 − 0.2) = 40 × 0.8. The multiplier is the distributive law in disguise — it bundles 'the original' and 'the change' into one number.",
      strategies: ["Think of the original as 100%", "Write the change as a multiplier", "Estimate first"],
      thinkDeeper:
        "A multiplier of 2 is a 100% increase. What percentage increase is a multiplier of 3? Of 1.001? Which multiplier is a 100% decrease — and why can a price never fall by more than 100%?",
    },
    // ------------------------------------------------------------------
    {
      id: "percentage-change",
      heading: "Percentage change vs absolute change",
      discovery: {
        problem:
          "Two prices both rise by $1. A kaya toast set goes from $4 to $5. A bicycle goes from $250 to $251. Both went up by the same amount — so is it fair to say both rose 'by the same'? Which rise would you notice more?",
        idea:
          "Both have an **absolute change** of $1. But for the toast that $1 is {{1/4}} = 25% of the old price, while for the bike it is {{1/250}} = 0.4%. The **percentage change** compares the change with where you started — which is why it tells the real story.",
      },
      body:
        "**Absolute change** is the actual amount something goes up or down: new value − original value. It has units ($, kg, people).\n\n**Percentage change** (also called *relative change*) measures the change as a fraction of the **original**:\n\n    {{\"percentage change\" = change/original * 100}}\n\n- An increase gives a percentage increase; a decrease gives a percentage decrease.\n- Always divide by the **original** value, never by the new one.\n\n**Using a multiplier instead.** Divide the new value by the original. 64 → 80 gives {{80/64}} = 1.25, a 25% increase. 80 → 64 gives {{64/80}} = 0.8, a 20% decrease. Going up and coming back down are *different* percentages, because the starting points differ.\n\n**Spotting misleading claims.**\n- 'Sales up 200%!' means sales are now 300% of before — three times as big, not double.\n- A big percentage can be a tiny absolute change: a club growing from 2 members to 4 is a 100% increase.\n- A 50% fall followed by a 50% rise does not get you back: 100 → 50 → 75.\n\n**Going further — percentage points.** If an interest rate goes from 2% to 3%, it has risen by 1 **percentage point** (the difference between two percentages), but by 50% in relative terms, since {{1/2}} × 100 = 50. News reports often blur these two.",
      diagram: `<svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two bars of equal length each standing for 100 percent of an original price. The toast bar gains a 25 percent extension for its 1 dollar rise; the bicycle bar gains only a thin 0.4 percent sliver for the same 1 dollar"><rect x="0" y="0" width="480" height="160" fill="#ffffff"/><text x="10" y="16" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1f2937">Each original price drawn as the same 100% bar</text><line x1="390" y1="30" x2="390" y2="136" stroke="#94a3b8" stroke-dasharray="4 3"/><text x="390" y="151" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#64748b">100%</text><rect x="150" y="38" width="240" height="30" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="390" y="38" width="60" height="30" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="270" y="58" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$4 = 100%</text><text x="420" y="58" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">+25%</text><text x="10" y="50" font-size="12" font-family="sans-serif" fill="#334155">Kaya toast</text><text x="10" y="65" font-size="12" font-family="sans-serif" fill="#334155">$4 → $5</text><text x="420" y="33" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">+$1</text><rect x="150" y="98" width="240" height="30" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="390" y="98" width="1" height="30" fill="#bbf7d0" stroke="#1f2937" stroke-width="1"/><text x="270" y="118" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$250 = 100%</text><text x="398" y="118" font-size="11" font-family="sans-serif" fill="#1f2937">+$1 = +0.4%</text><text x="10" y="110" font-size="12" font-family="sans-serif" fill="#334155">Bicycle</text><text x="10" y="125" font-size="12" font-family="sans-serif" fill="#334155">$250 → $251</text></svg>`,
      diagramCaption:
        "The same $1 rise, very different percentage changes: it is 25% of the toast's price but only 0.4% of the bicycle's.",
      workedExamples: [
        {
          title: "Percentage increase",
          problem: "The number of students in the coding club rises from 40 to 52. Find the percentage increase.",
          steps: [
            "Change = 52 − 40 = 12.",
            "Compare with the original: {{12/40}} = 0.3.",
            "0.3 × 100 = 30%.",
          ],
          answer: "A 30% increase",
          yourTurn: {
            question: "Your turn: a plant grows from 25 cm to 32 cm tall. Find the percentage increase.",
            answer: { type: "number", value: 28, display: "28%" },
            solution: "Change = 32 − 25 = 7 cm, and {{7/25}} × 100 = 28%.",
          },
        },
        {
          title: "Percentage decrease",
          problem: "A phone's price falls from $750 to $630. Find the percentage decrease.",
          steps: [
            "Change = 750 − 630 = $120.",
            "{{120/750}} = 0.16, and 0.16 × 100 = 16%.",
            "Check with a multiplier: {{630/750}} = 0.84 = 84%, so 16% has been taken off.",
          ],
          answer: "A 16% decrease",
        },
        {
          title: "Reading a headline",
          problem: "A news site says 'Otter sightings in the park up 300%!' Last year there were 5 sightings. How many were there this year, and what is the absolute change?",
          steps: [
            "Up 300% means 100% + 300% = 400% of last year — a multiplier of 4.",
            "This year: 5 × 4 = 20 sightings.",
            "Absolute change = 20 − 5 = 15 more sightings.",
            "The huge percentage comes from a small starting number.",
          ],
          answer: "20 sightings; an absolute increase of 15",
        },
      ],
      keyPoints: [
        "Absolute change = new − original (it has units).",
        "Percentage change = {{change/original}} × 100 — divide by the ORIGINAL.",
        "Or divide new by original: 1.3 means +30%, 0.85 means −15%.",
        "A large percentage can hide a small absolute change, and vice versa — check both.",
      ],
      whyItWorks:
        "A percentage change answers 'how big is the change *compared with what we had*?' That comparison is the fraction {{change/original}}, and × 100 writes it in hundredths.\n\nThe new ÷ original route gives the same answer because {{(\"new\")/original = (original + change)/original = 1 + change/original}}. The part after the 1 is the percentage change written as a decimal.",
      strategies: ["Compare with the original", "Check with a multiplier", "Consider extremes"],
      thinkDeeper:
        "A price rises by 25%. By what percentage must it now fall to return to the original price? Try it with $100 first, then explain why the answer is smaller than 25%.",
    },
    // ------------------------------------------------------------------
    {
      id: "reverse-percentages",
      heading: "Reverse percentages",
      discovery: {
        problem:
          "In a sale, a jacket costs $48 after 20% off. Zara says, 'Easy — the original price was $48 plus 20%, which is $57.60.' Test her answer by taking 20% off $57.60. What went wrong, and what was the real original price?",
        idea:
          "20% off $57.60 is 57.60 × 0.8 = $46.08, not $48 — so Zara is wrong. The 20% was taken off the *original* price, not the sale price. $48 is 80% of the original, so 10% is 48 ÷ 8 = $6 and 100% is $60. In one step: 48 ÷ 0.8 = $60.",
      },
      body:
        "A **reverse percentage** question gives you the amount *after* a percentage change and asks for the **original** amount.\n\n**Method 1 — the unitary method (find 1%).**\n1. Work out what percentage of the original you have (after 20% off you have 80%; after adding 9% you have 109%).\n2. Divide to find 1%.\n3. Multiply by 100 to find 100%.\n\n**Method 2 — divide by the multiplier.** Because original × multiplier = new amount, it follows that\n\n    {{original = \"new amount\" ÷ multiplier}}\n\nSo $48 after a 20% discount → 48 ÷ 0.8 = $60. This is the quickest method on a calculator.\n\n**The classic error.** Never just add (or subtract) the percentage to the new amount. The percentage was a percentage *of the original*, so it is a different number of dollars from the same percentage of the new amount.\n\n**Spot the question.** Reverse questions usually say 'after', 'was reduced to', 'including GST' or 'the sale price is…', and ask for the price 'before' or 'originally'.",
      diagram: `<svg viewBox="0 0 480 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model: the 48 dollar sale price is 8 of 10 equal blocks, so each 10 percent block is 6 dollars and the original 10 blocks are 60 dollars"><rect x="0" y="0" width="480" height="130" fill="#ffffff"/><path d="M40 36 v-6 h320 v6" fill="none" stroke="#334155" stroke-width="1.5"/><text x="200" y="22" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">80% = $48 (sale price)</text><text x="400" y="22" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#b91c1c">20% off</text><rect x="40" y="40" width="320" height="40" fill="#bbf7d0"/><rect x="360" y="40" width="80" height="40" fill="#fecaca"/><rect x="40" y="40" width="400" height="40" fill="none" stroke="#1f2937" stroke-width="2"/><g stroke="#334155"><line x1="80" y1="40" x2="80" y2="80"/><line x1="120" y1="40" x2="120" y2="80"/><line x1="160" y1="40" x2="160" y2="80"/><line x1="200" y1="40" x2="200" y2="80"/><line x1="240" y1="40" x2="240" y2="80"/><line x1="280" y1="40" x2="280" y2="80"/><line x1="320" y1="40" x2="320" y2="80"/><line x1="360" y1="40" x2="360" y2="80"/><line x1="400" y1="40" x2="400" y2="80"/></g><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="60" y="65">$6</text><text x="100" y="65">$6</text><text x="140" y="65">$6</text><text x="180" y="65">$6</text><text x="220" y="65">$6</text><text x="260" y="65">$6</text><text x="300" y="65">$6</text><text x="340" y="65">$6</text><text x="380" y="65">$6</text><text x="420" y="65">$6</text></g><path d="M40 88 v6 h400 v-6" fill="none" stroke="#334155" stroke-width="1.5"/><text x="240" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">100% = 10 × $6 = $60 (original price)</text></svg>`,
      diagramCaption:
        "$48 fills 8 of the 10 blocks, so each 10% block is $6 and the original 10 blocks are worth $60.",
      workedExamples: [
        {
          title: "After a discount",
          problem: "After a 25% discount, a pair of trainers costs $72. Find the original price.",
          steps: [
            "After 25% off you pay 75%, so the multiplier is 0.75.",
            "Original × 0.75 = 72, so original = 72 ÷ 0.75 = 96.",
            "Check: 25% of 96 = 24, and 96 − 24 = 72.",
          ],
          answer: "$96",
          yourTurn: {
            question: "Your turn: after a 30% discount, a bag costs $56. Find the original price in dollars.",
            answer: { type: "number", value: 80, display: "$80" },
            solution: "$56 is 70% of the original, so original = 56 ÷ 0.7 = $80. (Check: 30% of 80 = 24, and 80 − 24 = 56.)",
          },
        },
        {
          title: "After an increase",
          problem: "The number of Year 8 students at a school has grown by 12% to 336. How many were there before?",
          steps: [
            "After a 12% rise there are 112% of the original — multiplier 1.12.",
            "Unitary method: 1% = 336 ÷ 112 = 3, so 100% = 300.",
            "Multiplier method: 336 ÷ 1.12 = 300. Same answer.",
          ],
          answer: "300 students",
        },
        {
          title: "Removing GST",
          problem: "A bill of $43.60 includes 9% GST. Find the price before GST.",
          steps: [
            "Price with GST = price × 1.09, so price = 43.60 ÷ 1.09.",
            "43.60 ÷ 1.09 = 40.",
            "Check: 40 × 1.09 = 43.60.",
            "The tempting wrong method — 43.60 minus 9% of 43.60 — gives about $39.68, because it takes 9% of the wrong amount.",
          ],
          answer: "$40.00",
        },
      ],
      keyPoints: [
        "Original × multiplier = new amount, so original = new amount ÷ multiplier.",
        "First decide what percentage the new amount is: 80% after 20% off, 109% after adding 9% GST.",
        "Never just add the percentage back on to the new amount.",
        "Check by applying the change to your answer.",
      ],
      whyItWorks:
        "A percentage change is a multiplication, and division undoes multiplication. If original × 0.8 = 48, divide both sides by 0.8 to get original = 60.\n\nAdding 20% of 48 fails because 20% of 48 is $9.60, but the discount was 20% of 60, which is $12. The two percentages are of different wholes.",
      strategies: ["Work backwards", "Use a bar model", "Check by substituting"],
      thinkDeeper:
        "After a 10% pay rise, Siti earns $3300 a month. Her friend says, 'So before the rise she earned 3300 − 10% = $2970.' Without finding the true answer, explain how you can tell that $2970 must be too small.",
    },
    // ------------------------------------------------------------------
    {
      id: "money-percentages",
      heading: "Interest, GST, discounts, profit & loss",
      discovery: {
        problem:
          "A pair of headphones marked $80 is on sale at 25% off, and then 9% GST is added at the till. Hana thinks, '25% off and 9% on — that's 16% off overall.' Is she right? Find the price you actually pay.",
        idea:
          "80 × 0.75 = $60, then 60 × 1.09 = $65.40. That is {{65.40/80}} = 0.8175 of the marked price — a saving of 18.25%, not 16%. The two percentages are taken of different amounts, so you cannot simply add or subtract them. Chain the multipliers instead: 80 × 0.75 × 1.09.",
      },
      body:
        "Money is where percentages earn their keep. Every context below uses the same tools — percentage of an amount, multipliers and percentage change — with its own vocabulary. The key question is always: **what is the original amount?**\n\n**GST (Goods and Services Tax).** In Singapore GST is 9% of the price, added on: price with GST = price × 1.09. (In the UK the equivalent tax is VAT at 20%, so × 1.2.)\n\n**Discounts.** '30% off' means you pay 70%: sale price = marked price × 0.7. The **discount** is the amount you save.\n\n**Profit and loss.** The **cost price** is what the seller paid; the **selling price** is what they sold it for. Profit or loss is always a percentage of the cost price:\n\n    {{\"profit %\" = profit/\"cost price\" * 100}}\n\n**Simple interest.** Money in a savings account (the **principal**, P) earns interest at a rate of R% per year. With **simple interest**, the interest is the same every year because it is always worked out on the original principal. After T years:\n\n    {{I = (PRT)/100}}\n\n$500 at 3% for 4 years earns {{(500 * 3 * 4)/100}} = $60, so the account then holds $560.\n\n| Context | The original is… | Multiplier |\n|---|---|---|\n| Adding 9% GST | the price before GST | × 1.09 |\n| 30% discount | the marked price | × 0.7 |\n| 25% profit | the cost price | × 1.25 |\n| 3% simple interest for 4 years | the principal | × 1.12 (4 × 3% = 12%) |",
      diagram: `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flow diagram: 80 dollars times 0.75 for 25 percent off gives 60 dollars, then times 1.09 for 9 percent GST gives 65.40 dollars; a curved arrow underneath shows the single multiplier 0.8175"><rect x="0" y="0" width="480" height="150" fill="#ffffff"/><rect x="10" y="40" width="100" height="46" rx="8" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><text x="60" y="61" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$80</text><text x="60" y="78" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">marked price</text><line x1="110" y1="63" x2="179" y2="63" stroke="#1f2937" stroke-width="1.5"/><polygon points="185,63 177,59 177,67" fill="#1f2937"/><text x="147" y="54" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">× 0.75</text><text x="147" y="80" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">25% off</text><rect x="185" y="40" width="100" height="46" rx="8" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><text x="235" y="61" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$60</text><text x="235" y="78" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">sale price</text><line x1="285" y1="63" x2="354" y2="63" stroke="#1f2937" stroke-width="1.5"/><polygon points="360,63 352,59 352,67" fill="#1f2937"/><text x="322" y="54" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">× 1.09</text><text x="322" y="80" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">+9% GST</text><rect x="360" y="40" width="110" height="46" rx="8" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="415" y="61" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$65.40</text><text x="415" y="78" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">you pay</text><path d="M60 86 Q 237 150 409 88" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 3"/><polygon points="415,86 408.9,92.5 406.1,84.9" fill="#334155"/><text x="237" y="138" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">one step: × 0.75 × 1.09 = × 0.8175</text></svg>`,
      diagramCaption:
        "Chain the multipliers: 25% off then 9% GST is × 0.75 × 1.09 = × 0.8175 — and because multiplication can be done in any order, adding GST first gives the same final price.",
      workedExamples: [
        {
          title: "Percentage profit",
          problem: "Ethan buys a second-hand bike for $150 and sells it for $186. Find his percentage profit.",
          steps: [
            "Profit = 186 − 150 = $36.",
            "Compare with the cost price: {{36/150}} = 0.24.",
            "0.24 × 100 = 24%.",
          ],
          answer: "24% profit",
          yourTurn: {
            question: "Your turn: Mei buys a guitar for $240 and sells it for $204. Find her percentage loss.",
            answer: { type: "number", value: 15, display: "15% loss" },
            solution: "Loss = 240 − 204 = $36, and {{36/240}} × 100 = 15%.",
          },
        },
        {
          title: "Simple interest",
          problem: "Arjun puts $2400 into an account paying 2.5% simple interest per year. How much is in the account after 3 years?",
          steps: [
            "Interest each year = 2.5% of 2400 = 0.025 × 2400 = $60.",
            "Over 3 years: 3 × 60 = $180. (Formula: {{(2400 * 2.5 * 3)/100}} = 180.)",
            "Total = 2400 + 180 = $2580.",
          ],
          answer: "$2580",
        },
        {
          title: "Working backwards with interest",
          problem: "Priya invests $800 at 4% simple interest per year. How many years will it take to earn $160 in interest?",
          steps: [
            "Interest each year = 4% of 800 = $32.",
            "Number of years = 160 ÷ 32 = 5.",
            "Check: 5 × 32 = 160.",
          ],
          answer: "5 years",
        },
      ],
      keyPoints: [
        "GST in Singapore is 9%: price with GST = price × 1.09.",
        "Profit or loss % = profit (or loss) ÷ cost price × 100 — always over the cost price.",
        "Simple interest: {{I = (PRT)/100}}; the same interest is earned every year.",
        "For two changes in a row, multiply the multipliers — never add the percentages.",
      ],
      whyItWorks:
        "Each money word is a percentage of a particular *original*: GST is a percentage of the pre-tax price, a discount of the marked price, profit of the cost price and interest of the principal. Name the original and the question becomes an ordinary percentage of an amount or percentage change.\n\nSimple interest adds the same amount, {{(PR)/100}}, every year, so after T years you have T lots of it: {{I = (PRT)/100}}.",
      strategies: ["Identify the original", "Chain the multipliers", "Work backwards"],
      thinkDeeper:
        "Shop A offers '20% off, then a further 10% off the sale price'. Shop B offers '30% off'. Which is the better deal, and by how much on a $100 item? Could changing the order of Shop A's two discounts ever make it equal to 30% off?",
    },
    // ------------------------------------------------------------------
    {
      id: "repeated-change",
      heading: "Compound interest & repeated change",
      discovery: {
        problem:
          "You invest $1000. Bank S pays 10% simple interest per year. Bank C pays 10% compound interest: each year's interest is added to the account, and next year's 10% is worked out on the new total. After 2 years, how much more does Bank C give you? Now guess: after 10 years, is the gap small or large?",
        idea:
          "Bank S adds $100 a year, giving $1200 after 2 years. Bank C: 1000 × 1.1 = $1100, then 1100 × 1.1 = $1210 — $10 more, because in year 2 you also earn interest on the first year's $100.\n\nAfter 10 years Bank S gives $2000, but Bank C gives 1000 × {{1.1^10}} ≈ $2593.74. The gap grows faster and faster — that is compound growth.",
      },
      body:
        "**Stretch:** this section looks ahead to Year 9, but it uses nothing you haven't met.\n\nWhen a percentage change happens again and again, each change acts on the **new** amount. So you multiply by the multiplier once for every change. If the multiplier is m and there are n changes:\n\n    {{final = original * m^n}}\n\n**Compound interest.** The interest is added to the account and then earns interest itself. $1000 at 10% for 3 years: 1000 × {{1.1^3}} = $1331.\n\n**Depreciation.** Things that lose value by a fixed percentage each year shrink the same way. A car losing 15% of its value a year is worth {{0.85^n}} of its price after n years.\n\n**Different changes in a row.** Multiply all the multipliers: +10% then −10% is × 1.1 × 0.9 = × 0.99 — a 1% loss overall, not 0%. The fall is 10% of a *bigger* number, so it removes more than the rise added.\n\n| Year | Simple 10% on $1000 | Compound 10% on $1000 |\n|---|---|---|\n| 0 | $1000 | $1000 |\n| 1 | $1100 | $1100 |\n| 2 | $1200 | $1210 |\n| 3 | $1300 | $1331 |\n| 4 | $1400 | $1464.10 |\n| 5 | $1500 | $1610.51 |\n\nSimple interest grows by the same **amount** each year (a straight line). Compound interest grows by the same **percentage** each year (a curve that keeps getting steeper).",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of the value of 1000 dollars over 5 years: simple interest at 10 percent is a straight line reaching 1500 dollars, compound interest at 10 percent curves upward to 1610.51 dollars. The vertical axis starts at 1000 dollars with a break mark"><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="60" y1="211.4" x2="450" y2="211.4"/><line x1="60" y1="182.9" x2="450" y2="182.9"/><line x1="60" y1="154.3" x2="450" y2="154.3"/><line x1="60" y1="125.7" x2="450" y2="125.7"/><line x1="60" y1="97.1" x2="450" y2="97.1"/><line x1="60" y1="68.6" x2="450" y2="68.6"/><line x1="60" y1="40" x2="450" y2="40"/></g><line x1="60" y1="30" x2="60" y2="244" stroke="#1f2937" stroke-width="1.5"/><path d="M60 244 L66 247 L54 251 L60 254 L60 260" fill="none" stroke="#1f2937" stroke-width="1.5"/><line x1="60" y1="260" x2="450" y2="260" stroke="#1f2937" stroke-width="1.5"/><g font-size="11" font-family="sans-serif" text-anchor="end" fill="#334155"><text x="54" y="244">$1000</text><text x="54" y="215.4">$1100</text><text x="54" y="186.9">$1200</text><text x="54" y="158.3">$1300</text><text x="54" y="129.7">$1400</text><text x="54" y="101.1">$1500</text><text x="54" y="72.6">$1600</text><text x="54" y="44">$1700</text></g><g stroke="#1f2937"><line x1="136" y1="260" x2="136" y2="265"/><line x1="212" y1="260" x2="212" y2="265"/><line x1="288" y1="260" x2="288" y2="265"/><line x1="364" y1="260" x2="364" y2="265"/><line x1="440" y1="260" x2="440" y2="265"/></g><g font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155"><text x="60" y="277">0</text><text x="136" y="277">1</text><text x="212" y="277">2</text><text x="288" y="277">3</text><text x="364" y="277">4</text><text x="440" y="277">5</text></g><text x="250" y="295" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Years</text><text x="10" y="20" font-size="12" font-family="sans-serif" fill="#1f2937">Value ($)</text><polyline points="60,240 136,211.4 212,182.9 288,154.3 364,125.7 440,97.1" fill="none" stroke="#1d4ed8" stroke-width="2"/><polyline points="60,240 136,211.4 212,180 288,145.4 364,107.4 440,65.6" fill="none" stroke="#b45309" stroke-width="2.5"/><g fill="#1d4ed8"><circle cx="60" cy="240" r="3.5"/><circle cx="136" cy="211.4" r="3.5"/><circle cx="212" cy="182.9" r="3.5"/><circle cx="288" cy="154.3" r="3.5"/><circle cx="364" cy="125.7" r="3.5"/><circle cx="440" cy="97.1" r="3.5"/></g><g fill="#b45309"><circle cx="212" cy="180" r="3.5"/><circle cx="288" cy="145.4" r="3.5"/><circle cx="364" cy="107.4" r="3.5"/><circle cx="440" cy="65.6" r="3.5"/></g><text x="432" y="56" font-size="11" font-family="sans-serif" text-anchor="end" fill="#b45309">$1610.51</text><text x="444" y="112" font-size="11" font-family="sans-serif" fill="#1d4ed8">$1500</text><line x1="80" y1="52" x2="104" y2="52" stroke="#b45309" stroke-width="2.5"/><text x="110" y="56" font-size="12" font-family="sans-serif" fill="#1f2937">Compound 10%</text><line x1="80" y1="72" x2="104" y2="72" stroke="#1d4ed8" stroke-width="2"/><text x="110" y="76" font-size="12" font-family="sans-serif" fill="#1f2937">Simple 10%</text></svg>`,
      diagramCaption:
        "Simple interest adds the same $100 each year, so it is a straight line. Compound interest adds 10% of a growing total, so the line bends upwards. The vertical axis starts at $1000 — note the break mark.",
      workedExamples: [
        {
          title: "Compound interest",
          problem: "$5000 is invested at 3% compound interest per year. Find its value after 2 years.",
          steps: [
            "The multiplier for +3% is 1.03.",
            "After 1 year: 5000 × 1.03 = $5150.",
            "After 2 years: 5150 × 1.03 = $5304.50.",
            "In one go: 5000 × {{1.03^2}} = 5000 × 1.0609 = $5304.50.",
          ],
          answer: "$5304.50",
          yourTurn: {
            question: "Your turn: $2000 is invested at 5% compound interest per year. Find its value after 2 years, in dollars.",
            answer: { type: "number", value: 2205, display: "$2205" },
            solution: "2000 × 1.05 = $2100, then 2100 × 1.05 = $2205. (Or 2000 × {{1.05^2}} = 2000 × 1.1025.)",
          },
        },
        {
          title: "Depreciation",
          problem: "A car bought for $90 000 loses 15% of its value each year. Find its value after 3 years.",
          steps: [
            "Losing 15% leaves 85%, so the multiplier is 0.85.",
            "90 000 × {{0.85^3}} = 90 000 × 0.614125.",
            "= $55 271.25.",
            "Year by year: 76 500 → 65 025 → 55 271.25.",
          ],
          answer: "$55 271.25",
        },
        {
          title: "Reverse compound change",
          problem: "After 2 years of 4% compound interest, an account holds $540.80. How much was invested at the start?",
          steps: [
            "Two years at 4% means original × {{1.04^2}} = 540.80.",
            "{{1.04^2}} = 1.0816.",
            "Original = 540.80 ÷ 1.0816 = 500.",
            "Check: 500 × 1.04 = 520, and 520 × 1.04 = 540.80.",
          ],
          answer: "$500",
        },
      ],
      keyPoints: [
        "n repeated changes with multiplier m: final = original × {{m^n}}.",
        "Simple interest grows by the same amount each year; compound interest by the same percentage.",
        "+r% followed by −r% always ends in an overall decrease.",
        "For different changes in a row, multiply all the multipliers together.",
      ],
      whyItWorks:
        "After one year the amount is P × 1.1. The second year's interest is 10% of *that*, so the amount becomes (P × 1.1) × 1.1 = P × {{1.1^2}}. Each year adds another factor of 1.1, giving P × {{1.1^n}} after n years.\n\nFor +r% then −r%, write x = {{r/100}}. Then {{(1 + x)(1 - x) = 1 - x^2}}, which is always less than 1. So you lose {{x^2}} of the original: up 10% then down 10% loses {{0.1^2}} = 0.01 = 1%.",
      strategies: ["Chain the multipliers", "Try small cases", "Find a pattern"],
      thinkDeeper:
        "Roughly how many years does it take money to double at 10% compound interest? Use a calculator to try {{1.1^5}}, {{1.1^7}} and {{1.1^8}}. Then try 5% per year. Can you discover the 'Rule of 72' — and why might it only be approximately right?",
    },
  ],
  learn: {
    flashcards: [
      { front: "What does 'per cent' mean?", back: "Per hundred. 35% = {{35/100}} = 0.35." },
      { front: "{{3/8}} as a percentage", back: "3 ÷ 8 = 0.375 = 37.5%." },
      { front: "140% as a decimal and a fraction", back: "1.4 = {{1 2/5}}. Over 100% means more than one whole." },
      { front: "35% of 80 is the same as 80% of what?", back: "35 — x% of y always equals y% of x. Both are 28." },
      { front: "Express A as a percentage of B", back: "{{A/B}} × 100 — convert to the same units first." },
      { front: "Multiplier for a 15% increase", back: "× 1.15 (100% + 15% = 115%)." },
      { front: "Multiplier for a 20% decrease", back: "× 0.8 (100% − 20% = 80%)." },
      { front: "What change is × 1.05? And × 1.5?", back: "× 1.05 is +5%. × 1.5 is +50%." },
      { front: "Percentage change formula", back: "{{change/original}} × 100 — divide by the ORIGINAL." },
      { front: "Absolute change vs percentage change", back: "Absolute: the actual amount, e.g. +$5. Percentage: that amount as a % of the original." },
      { front: "A rate goes from 2% to 3%. What is the change?", back: "+1 percentage point — but a 50% increase in relative terms." },
      { front: "$48 after 20% off. Original price?", back: "48 ÷ 0.8 = $60 (not 48 + 20%)." },
      { front: "$54.50 includes 9% GST. Price before GST?", back: "54.50 ÷ 1.09 = $50." },
      { front: "Profit % is a percentage of…?", back: "The cost price (what the seller paid)." },
      { front: "Simple interest formula", back: "{{I = (PRT)/100}} — the same interest every year." },
      { front: "+10% then −10% overall?", back: "× 1.1 × 0.9 = × 0.99: a 1% decrease, not zero." },
    ],
    mustKnow: [
      "I can convert between fractions, decimals and percentages, including percentages over 100% and under 1%.",
      "I can order a mix of fractions, decimals and percentages.",
      "I can find a percentage of an amount mentally using 10%, 5% and 1%, and with a calculator using a decimal multiplier.",
      "I can write one quantity as a percentage of another, converting to the same units first.",
      "I can compare two groups or scores by converting them to percentages.",
      "I can write the multiplier for any percentage increase or decrease, and say what change a multiplier represents.",
      "I can calculate a percentage change (change ÷ original × 100) and explain the difference between absolute and percentage change.",
      "I can find the original amount in a reverse percentage problem by dividing by the multiplier.",
      "I can solve problems involving GST, discounts, profit and loss, and simple interest.",
      "I can explain why a percentage increase followed by the same percentage decrease does not return to the start.",
      "I can calculate compound interest and other repeated percentage changes using powers of the multiplier (stretch).",
      "I can tell the difference between a change in percentage points and a percentage change (stretch).",
    ],
    misconceptions: [
      {
        wrong: "To undo a 20% discount, add 20% back on to the sale price.",
        right: "Divide by the multiplier: original = sale price ÷ 0.8. The 20% was 20% of the original, not of the sale price.",
      },
      {
        wrong: "A 10% rise followed by a 10% fall leaves the price unchanged.",
        right: "× 1.1 × 0.9 = × 0.99, so it ends 1% lower. The fall is 10% of a bigger amount.",
      },
      {
        wrong: "Percentage change = change ÷ new value × 100.",
        right: "Divide by the original: 40 → 50 is {{10/40}} = 25%, not {{10/50}} = 20%.",
      },
      {
        wrong: "The multiplier for a 5% increase is 1.5.",
        right: "5% = 0.05, so the multiplier is 1 + 0.05 = 1.05. A multiplier of 1.5 is a 50% increase.",
      },
      {
        wrong: "A percentage can never be more than 100%.",
        right: "150% = 1.5 is fine. A price that triples has risen by 200%. It is only a *decrease* in something like a price that can't go past 100% — that would leave less than nothing.",
      },
      {
        wrong: "An interest rate rising from 2% to 3% is a 1% increase.",
        right: "It rises by 1 percentage point, which is a 50% increase relative to 2%.",
      },
    ],
    examMistakes: [
      "Dividing by the new value instead of the original when finding a percentage change.",
      "Adding the percentage back on to a sale price instead of dividing by the multiplier.",
      "Writing 7% as 0.7 (it is 0.07) or 0.5% as 0.5 (it is 0.005).",
      "Forgetting to convert to the same units (cents and dollars, minutes and hours) before writing one quantity as a percentage of another.",
      "Giving the discount or the interest when the question asks for the final price or the total in the account — reread the last line.",
      "Writing money with one decimal place, e.g. $9.6 instead of $9.60.",
      "Adding or subtracting successive percentages (25% off then 9% GST is not 16% off) instead of multiplying the multipliers.",
      "Using simple interest when the question says compound (or the other way round).",
    ],
    mnemonics: [
      {
        topic: "Percentage change",
        device: "New minus Old, over Old",
        explanation: "Percentage change = (new − old) ÷ old × 100. The OLD (original) value always goes on the bottom.",
      },
      {
        topic: "Multipliers",
        device: "Start at 100%",
        explanation: "Write down what's left after the change, then ÷ 100: up 15% → 115% → × 1.15; down 20% → 80% → × 0.8.",
      },
      {
        topic: "Reverse percentages",
        device: "Going back? Divide, don't subtract.",
        explanation: "To find the original after a change, divide by the multiplier. Adding or subtracting the percentage uses the wrong whole.",
      },
      {
        topic: "Mental percentages",
        device: "10 – 5 – 1",
        explanation: "Find 10% (÷ 10), halve it for 5%, and ÷ 100 for 1%. Build any percentage from these blocks.",
      },
    ],
    realWorld: [
      {
        title: "GST at the till",
        detail: "Singapore's 9% GST means a $50 item costs $54.50 at the till. Shops showing 'prices inclusive of GST' have already multiplied by 1.09.",
        emoji: "🧾",
      },
      {
        title: "Sales and discounts",
        detail: "'30% off' means you pay 70% of the marked price — and '20% off plus an extra 10% off' is only 28% off in total.",
        emoji: "🏷️",
      },
      {
        title: "Savings and loans",
        detail: "Banks quote interest as a percentage per year. Compound interest makes savings grow faster over time — and makes unpaid debts grow faster too.",
        emoji: "🏦",
      },
      {
        title: "Comparing test scores",
        detail: "Turning '27 out of 40' into 67.5% lets you compare tests with different totals fairly.",
        emoji: "📝",
      },
      {
        title: "Food labels",
        detail: "Nutrition labels list '% of daily intake' — a snack giving 15% of your daily salt uses a fair chunk of the day's allowance in one packet.",
        emoji: "🥣",
      },
      {
        title: "Reading the news",
        detail: "Headlines like 'cases up 300%' or 'rates up 0.5 percentage points' only make sense once you know the original value and the difference between per cent and percentage points.",
        emoji: "📰",
      },
    ],
    videos: [
      {
        title: "Percentages of amounts",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+percentages+of+amounts",
      },
      {
        title: "Percentage change",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+percentage+change",
      },
      {
        title: "Reverse percentages",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+reverse+percentages",
      },
      {
        title: "Compound interest",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+compound+interest",
      },
    ],
    formulas: [
      { name: "Percentage to decimal", formula: "{{x% = x/100}}", note: "e.g. 7% = 0.07 and 125% = 1.25" },
      { name: "One quantity as a percentage of another", formula: "{{percentage = part/whole * 100}}", note: "Same units first." },
      { name: "Multiplier for an increase of r%", formula: "{{1 + r/100}}", note: "e.g. +15% → × 1.15" },
      { name: "Multiplier for a decrease of r%", formula: "{{1 - r/100}}", note: "e.g. −20% → × 0.8" },
      { name: "Percentage change", formula: "{{change/original * 100}}", note: "Divide by the original value." },
      { name: "Reverse percentage", formula: "{{original = \"new amount\" ÷ multiplier}}" },
      { name: "Simple interest", formula: "{{I = (PRT)/100}}", note: "P = principal, R = rate (% per year), T = time in years." },
      { name: "Compound interest (stretch)", formula: "{{A = P(1 + r/100)^n}}", note: "A = final amount after n years at r% per year." },
    ],
  },
};
