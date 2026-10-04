import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "fractions",
  title: "Fractions",
  strand: "Number",
  icon: "🍕",
  summary: "Make the pieces the same size — then compare, add, multiply and divide anything.",
  intro:
    "A fraction is a single number with its own place on the number line: {{3/4}} is a point between 0 and 1, not just three slices of pizza. In this chapter you will compare and order fractions (negative ones too), master all four operations with fractions and mixed numbers, and use them to solve real problems. One idea runs through it all: make the pieces the same size, and fractions behave just like whole numbers.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "equivalence-ordering",
      heading: "Equivalent fractions, comparing & ordering",
      discovery: {
        problem:
          "Without a calculator, which is bigger: {{7/8}} or {{8/9}}? Both are exactly *one piece short* of a whole. Use that fact to decide, then check another way. Bonus: which is bigger, {{-7/8}} or {{-8/9}}?",
        idea:
          "{{7/8}} is {{1/8}} short of 1 and {{8/9}} is only {{1/9}} short of 1. Ninths are smaller pieces, so {{8/9}} is closer to 1: {{8/9 > 7/8}}. Check with a common denominator of 72: {{7/8 = 63/72}} and {{8/9 = 64/72}}. For the negatives everything flips: {{-8/9}} is further left of zero, so {{-8/9 < -7/8}}.",
      },
      body:
        "A **fraction** {{a/b}} has a **numerator** {{a}} (how many pieces you have) and a **denominator** {{b}} (how many equal pieces make one whole). It is a single number with one exact position on the number line.\n\n**Equivalent fractions** are different names for the same number. Multiply or divide the numerator and the denominator by the *same* non-zero number and the value doesn't change: {{3/4 = 6/8 = 15/20}}. To **simplify** (write in *simplest form*), divide top and bottom by their **HCF** (highest common factor): HCF(36, 48) = 12, so {{36/48 = 3/4}}. If you can't spot the HCF, cancel in stages (÷2, then ÷2, then ÷3) — slower, same answer. A fraction is fully simplified when the only common factor of top and bottom is 1.\n\n**Comparing.** Give the fractions a **common denominator** — a number that every denominator divides into. The smallest one is the LCM of the denominators. Then the bigger numerator wins.\n\n| Fraction | {{2/3}} | {{5/8}} | {{7/12}} |\n|---|---|---|---|\n| In 24ths | {{16/24}} | {{15/24}} | {{14/24}} |\n\nSo {{7/12 < 5/8 < 2/3}}. Two shortcuts:\n- **Same numerator:** a bigger denominator means smaller pieces, so {{3/7 < 3/5}}.\n- **Benchmarks:** compare with 0, {{1/2}} or 1. {{4/9}} is just under a half and {{5/9}} is just over.\n\n**Negative fractions.** {{-3/4}} sits {{3/4}} to the *left* of zero, and further left means smaller. So for negatives the order flips: {{3/4 > 2/3}} but {{-3/4 < -2/3}}. Every negative number is less than every positive number.\n\n| Symbol | Meaning | Example |\n|---|---|---|\n| {{=}} | is equal to | {{4/6 = 2/3}} |\n| {{!=}} | is not equal to | {{2/3 != 3/4}} |\n| {{<}} and {{>}} | is less than, is greater than | {{-1/2 < 1/3}} |\n| {{<=}} and {{>=}} | is less than or equal to, is greater than or equal to | {{x <= 1/2}} allows {{x = 1/2}} |",
      diagram: `<svg viewBox="0 0 480 195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from minus 1 to 1 in twelfths, marking minus three quarters, minus two thirds, two thirds and three quarters. Three quarters is right of two thirds, but minus three quarters is left of minus two thirds."><rect x="0" y="0" width="480" height="195" fill="#ffffff"/><line x1="28" y1="100" x2="452" y2="100" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="96" x2="40" y2="104" stroke="#334155" stroke-width="1"/><line x1="56.7" y1="96" x2="56.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="73.3" y1="96" x2="73.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="90" y1="96" x2="90" y2="104" stroke="#334155" stroke-width="1"/><line x1="106.7" y1="96" x2="106.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="123.3" y1="96" x2="123.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="140" y1="96" x2="140" y2="104" stroke="#334155" stroke-width="1"/><line x1="156.7" y1="96" x2="156.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="173.3" y1="96" x2="173.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="190" y1="96" x2="190" y2="104" stroke="#334155" stroke-width="1"/><line x1="206.7" y1="96" x2="206.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="223.3" y1="96" x2="223.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="240" y1="96" x2="240" y2="104" stroke="#334155" stroke-width="1"/><line x1="256.7" y1="96" x2="256.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="273.3" y1="96" x2="273.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="290" y1="96" x2="290" y2="104" stroke="#334155" stroke-width="1"/><line x1="306.7" y1="96" x2="306.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="323.3" y1="96" x2="323.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="340" y1="96" x2="340" y2="104" stroke="#334155" stroke-width="1"/><line x1="356.7" y1="96" x2="356.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="373.3" y1="96" x2="373.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="390" y1="96" x2="390" y2="104" stroke="#334155" stroke-width="1"/><line x1="406.7" y1="96" x2="406.7" y2="104" stroke="#334155" stroke-width="1"/><line x1="423.3" y1="96" x2="423.3" y2="104" stroke="#334155" stroke-width="1"/><line x1="440" y1="96" x2="440" y2="104" stroke="#334155" stroke-width="1"/><line x1="40" y1="91" x2="40" y2="109" stroke="#1f2937" stroke-width="1.8"/><line x1="140" y1="91" x2="140" y2="109" stroke="#1f2937" stroke-width="1.8"/><line x1="240" y1="91" x2="240" y2="109" stroke="#1f2937" stroke-width="1.8"/><line x1="340" y1="91" x2="340" y2="109" stroke="#1f2937" stroke-width="1.8"/><line x1="440" y1="91" x2="440" y2="109" stroke="#1f2937" stroke-width="1.8"/><text x="40" y="128" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−1</text><text x="240" y="128" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><text x="440" y="128" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><text x="128" y="126.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">−</text><text x="146.3" y="119" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="141.6" y1="122" x2="151" y2="122" stroke="#1f2937" stroke-width="1.2"/><text x="146.3" y="135" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><text x="340" y="119" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="335.3" y1="122" x2="344.7" y2="122" stroke="#1f2937" stroke-width="1.2"/><text x="340" y="135" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="70" y1="72" x2="90" y2="94" stroke="#4f46e5" stroke-width="1.2"/><circle cx="90" cy="100" r="5" fill="#4f46e5"/><text x="57.3" y="56.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#4f46e5">−</text><text x="76.7" y="49" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">3</text><line x1="71.7" y1="52" x2="81.7" y2="52" stroke="#4f46e5" stroke-width="1.2"/><text x="76.7" y="66" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">4</text><line x1="128.7" y1="72" x2="106.7" y2="94" stroke="#b45309" stroke-width="1.2"/><circle cx="106.7" cy="100" r="5" fill="#b45309"/><text x="115.9" y="56.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#b45309">−</text><text x="135.4" y="49" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#b45309">2</text><line x1="130.3" y1="52" x2="140.4" y2="52" stroke="#b45309" stroke-width="1.2"/><text x="135.4" y="66" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#b45309">3</text><line x1="355.3" y1="72" x2="373.3" y2="94" stroke="#b45309" stroke-width="1.2"/><circle cx="373.3" cy="100" r="5" fill="#b45309"/><text x="355.3" y="49" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#b45309">2</text><line x1="350.3" y1="52" x2="360.4" y2="52" stroke="#b45309" stroke-width="1.2"/><text x="355.3" y="66" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#b45309">3</text><line x1="408" y1="72" x2="390" y2="94" stroke="#4f46e5" stroke-width="1.2"/><circle cx="390" cy="100" r="5" fill="#4f46e5"/><text x="408" y="49" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">3</text><line x1="403" y1="52" x2="413" y2="52" stroke="#4f46e5" stroke-width="1.2"/><text x="408" y="66" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">4</text><line x1="390" y1="108" x2="390" y2="146" stroke="#4f46e5" stroke-width="1" stroke-dasharray="3 3"/><line x1="90" y1="108" x2="90" y2="146" stroke="#4f46e5" stroke-width="1" stroke-dasharray="3 3"/><path d="M 390 146 Q 240 186 90 146" fill="none" stroke="#4f46e5" stroke-width="1" stroke-dasharray="4 3"/><text x="240" y="184" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">reflect in zero: the order flips</text><text x="30" y="20" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">← smaller</text><text x="450" y="20" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">bigger →</text></svg>`,
      diagramCaption: "Reflect the number line in zero and the order flips: {{3/4 > 2/3}}, but {{-3/4 < -2/3}}.",
      workedExamples: [
        {
          title: "Simplifying with the HCF",
          problem: "Write {{42/56}} in its simplest form.",
          steps: [
            "Find the HCF of 42 and 56: 42 = 2 × 3 × 7 and 56 = 2 × 2 × 2 × 7, so HCF = 2 × 7 = 14.",
            "Divide top and bottom by 14: {{42/56 = (42 ÷ 14)/(56 ÷ 14) = 3/4}}.",
            "Check: 3 and 4 have no common factor except 1, so it is fully simplified.",
          ],
          answer: "{{3/4}}",
          yourTurn: {
            question: "Your turn: write {{36/84}} in its simplest form.",
            answer: { type: "fraction", n: 3, d: 7, simplest: true },
            solution: "HCF(36, 84) = 12, so {{36/84 = (36 ÷ 12)/(84 ÷ 12) = 3/7}}.",
          },
        },
        {
          title: "Ordering with a common denominator",
          problem: "Write these in order, smallest first: {{5/6}}, {{3/4}}, {{7/9}}, {{2/3}}.",
          steps: [
            "The denominators are 6, 4, 9 and 3. Their LCM is 36.",
            "{{5/6 = 30/36}}, {{3/4 = 27/36}}, {{7/9 = 28/36}}, {{2/3 = 24/36}}.",
            "Compare the numerators: 24 < 27 < 28 < 30.",
          ],
          answer: "{{2/3}}, {{3/4}}, {{7/9}}, {{5/6}}",
        },
        {
          title: "Negative fractions and inequality symbols",
          problem:
            "Write these in order, smallest first: {{-1/2}}, {{1/4}}, {{-3/5}}, 0, {{-2/5}}. Then decide whether the statement {{-1/2 >= -2/5}} is true or false.",
          steps: [
            "Every negative is less than 0, and 0 is less than every positive, so {{1/4}} is largest and 0 comes just before it.",
            "Compare the negatives in tenths: {{-1/2 = -5/10}}, {{-3/5 = -6/10}}, {{-2/5 = -4/10}}.",
            "The most negative is the smallest: −6 tenths < −5 tenths < −4 tenths.",
            "So the order is {{-3/5}}, {{-1/2}}, {{-2/5}}, 0, {{1/4}}.",
            "{{-1/2}} is to the *left* of {{-2/5}}, so {{-1/2 < -2/5}}. The statement {{-1/2 >= -2/5}} is false.",
          ],
          answer: "{{-3/5 < -1/2 < -2/5 < 0 < 1/4}}; the statement is false.",
        },
      ],
      keyPoints: [
        "Multiply or divide top and bottom by the same non-zero number to get an equivalent fraction — the value never changes.",
        "Simplest form: divide top and bottom by their HCF.",
        "To compare or order, use a common denominator (the LCM), then compare numerators.",
        "For negatives the order flips: {{3/4 > 2/3}} but {{-3/4 < -2/3}}.",
      ],
      whyItWorks:
        "Multiplying top and bottom by 3 cuts every piece into 3 smaller pieces *and* gives you 3 times as many of them: {{2/5 = (2 × 3)/(5 × 3) = 6/15}}. Same amount of cake, just cut more finely. This also explains the cross-multiplying shortcut for comparing two fractions: over the common denominator {{b d}}, {{a/b = (a d)/(b d)}} and {{c/d = (b c)/(b d)}}, so you only need to compare {{a d}} with {{b c}} (for positive denominators).",
      strategies: ["Find a common denominator", "Use benchmarks (0, a half, 1)", "Draw a number line"],
      thinkDeeper:
        "Find three different fractions between {{5/8}} and {{2/3}}. Then explain why there is *always* another fraction between any two different fractions — so there is no such thing as 'the next fraction' after {{5/8}}.",
    },
    // ------------------------------------------------------------------
    {
      id: "adding-subtracting",
      heading: "Adding & subtracting fractions and mixed numbers",
      discovery: {
        problem:
          "Ravi works out {{3 1/4 - 1 2/3}} like this: 'Wholes: 3 − 1 = 2. Fractions: I can't take {{2/3}} from {{1/4}}, so I'll do {{2/3 - 1/4 = 5/12}}. Answer: {{2 5/12}}.' Before calculating anything, estimate: should the answer be more or less than 2? Then find the correct answer.",
        idea:
          "{{3 1/4}} is just over 3 and {{1 2/3}} is nearly 2, so the answer is between 1 and 2 — Ravi's {{2 5/12}} can't be right. He subtracted the fractions the wrong way round. Because {{1/4 < 2/3}}, you must **borrow** a whole: {{3 1/4 = 3 3/12 = 2 15/12}}, and {{2 15/12 - 1 8/12 = 1 7/12}}.",
      },
      body:
        "You can only add or subtract pieces of the **same size**. So the method is:\n\n1. Rewrite the fractions over a **common denominator** (the LCM of the denominators keeps the numbers small).\n2. Add or subtract the **numerators**. The denominator stays the same — it names the size of the pieces.\n3. Simplify, and change an improper answer to a mixed number if asked.\n\n    {{5/6 + 3/8 = 20/24 + 9/24 = 29/24 = 1 5/24}}\n\n**Mixed numbers.** A **mixed number** such as {{2 3/5}} is a whole number plus a proper fraction. An **improper fraction** such as {{13/5}} has a numerator at least as big as its denominator. They convert both ways: {{2 3/5 = (2 × 5 + 3)/5 = 13/5}}, and 13 ÷ 5 = 2 remainder 3 gives {{13/5 = 2 3/5}}.\n\nThree good methods for {{5 1/6 - 2 3/4}}:\n- **Wholes and parts:** {{5 2/12 - 2 9/12}}. The first fraction part is smaller, so **borrow** 1 whole as {{12/12}}: {{4 14/12 - 2 9/12 = 2 5/12}}.\n- **Improper fractions:** {{31/6 - 11/4 = 62/12 - 33/12 = 29/12 = 2 5/12}}. Always works, but the numbers get bigger.\n- **Count up:** subtraction is the distance between two numbers. Hop from {{2 3/4}} to 3 ({{1/4}}), then to 5 (2), then to {{5 1/6}} ({{1/6}}): {{1/4 + 2 + 1/6 = 2 5/12}}. The diagram shows the same idea for the discovery problem.\n\n**Estimate first, simplify last.** Round each mixed number to the nearest whole: {{5 1/6 - 2 3/4}} is about 5 − 3 = 2, so {{2 5/12}} is believable and {{3 5/12}} is not. Give final answers in simplest form: {{2 3/6}} should be written {{2 1/2}}.",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 1 to 3.5. Hops from one and two thirds up to 2 (one third), from 2 to 3 (one), and from 3 to three and a quarter (one quarter), totalling one and seven twelfths."><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><line x1="30" y1="120" x2="450" y2="120" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="117" x2="40" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="53.3" y1="117" x2="53.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="66.7" y1="117" x2="66.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="80" y1="117" x2="80" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="93.3" y1="117" x2="93.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="106.7" y1="117" x2="106.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="120" y1="117" x2="120" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="133.3" y1="117" x2="133.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="146.7" y1="117" x2="146.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="160" y1="117" x2="160" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="173.3" y1="117" x2="173.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="186.7" y1="117" x2="186.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="200" y1="117" x2="200" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="213.3" y1="117" x2="213.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="226.7" y1="117" x2="226.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="240" y1="117" x2="240" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="253.3" y1="117" x2="253.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="266.7" y1="117" x2="266.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="280" y1="117" x2="280" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="293.3" y1="117" x2="293.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="306.7" y1="117" x2="306.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="320" y1="117" x2="320" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="333.3" y1="117" x2="333.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="346.7" y1="117" x2="346.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="360" y1="117" x2="360" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="373.3" y1="117" x2="373.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="386.7" y1="117" x2="386.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="400" y1="117" x2="400" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="413.3" y1="117" x2="413.3" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="426.7" y1="117" x2="426.7" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="440" y1="117" x2="440" y2="123" stroke="#334155" stroke-width="0.8"/><line x1="40" y1="111" x2="40" y2="129" stroke="#1f2937" stroke-width="1.8"/><text x="40" y="148" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="200" y1="111" x2="200" y2="129" stroke="#1f2937" stroke-width="1.8"/><text x="200" y="148" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="360" y1="111" x2="360" y2="129" stroke="#1f2937" stroke-width="1.8"/><text x="360" y="148" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><circle cx="146.7" cy="120" r="5" fill="#b45309"/><circle cx="400" cy="120" r="5" fill="#4f46e5"/><text x="135.5" y="148.8" font-size="13" font-family="sans-serif" text-anchor="start" fill="#b45309">1</text><text x="152.1" y="141" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#b45309">2</text><line x1="147.4" y1="144" x2="156.9" y2="144" stroke="#b45309" stroke-width="1.2"/><text x="152.1" y="157" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#b45309">3</text><text x="388.8" y="148.8" font-size="13" font-family="sans-serif" text-anchor="start" fill="#4f46e5">3</text><text x="405.5" y="141" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">1</text><line x1="400.7" y1="144" x2="410.2" y2="144" stroke="#4f46e5" stroke-width="1.2"/><text x="405.5" y="157" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#4f46e5">4</text><path d="M 146.7 114 Q 173.3 70 200 114" fill="none" stroke="#059669" stroke-width="2"/><polygon points="200,114 193,107 199,105" fill="#059669"/><text x="161.3" y="76.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#047857">+</text><text x="179.6" y="69" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#047857">1</text><line x1="174.9" y1="72" x2="184.4" y2="72" stroke="#047857" stroke-width="1.2"/><text x="179.6" y="85" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#047857">3</text><path d="M 200 114 Q 280 46 360 114" fill="none" stroke="#059669" stroke-width="2"/><polygon points="360,114 353,107 359,105" fill="#059669"/><text x="271.5" y="76.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#047857">+1</text><path d="M 360 114 Q 380 70 400 114" fill="none" stroke="#059669" stroke-width="2"/><polygon points="400,114 393,107 399,105" fill="#059669"/><text x="368" y="76.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#047857">+</text><text x="386.3" y="69" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#047857">1</text><line x1="381.6" y1="72" x2="391" y2="72" stroke="#047857" stroke-width="1.2"/><text x="386.3" y="85" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#047857">4</text><text x="132.4" y="28.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">distance</text><text x="193.3" y="28.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">=</text><text x="216.7" y="21" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="211.7" y1="24" x2="221.7" y2="24" stroke="#1f2937" stroke-width="1.2"/><text x="216.7" y="38" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="229.7" y="28.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">+</text><text x="247.1" y="28.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">1</text><text x="262" y="28.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">+</text><text x="285.5" y="21" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="280.4" y1="24" x2="290.5" y2="24" stroke="#1f2937" stroke-width="1.2"/><text x="285.5" y="38" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="298.5" y="28.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">=</text><text x="315.9" y="29.2" font-size="14" font-family="sans-serif" text-anchor="start" fill="#1f2937">1</text><text x="337.5" y="21" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">7</text><line x1="328.4" y1="24" x2="346.6" y2="24" stroke="#1f2937" stroke-width="1.2"/><text x="337.5" y="38" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12</text></svg>`,
      diagramCaption:
        "Counting up from {{1 2/3}} to {{3 1/4}}: hop to the next whole, take whole steps, then the last bit. The hops add to {{1 7/12}}.",
      workedExamples: [
        {
          title: "Unlike denominators",
          problem: "Work out {{2/3 + 3/5}}. Give your answer as a mixed number.",
          steps: [
            "Estimate: {{2/3}} is about 0.7 and {{3/5}} is 0.6, so expect about 1.3.",
            "The LCM of 3 and 5 is 15: {{2/3 = 10/15}} and {{3/5 = 9/15}}.",
            "Add the numerators: {{10/15 + 9/15 = 19/15}}.",
            "19 ÷ 15 = 1 remainder 4, so {{19/15 = 1 4/15}} — close to the estimate.",
          ],
          answer: "{{1 4/15}}",
          yourTurn: {
            question: "Your turn: work out {{3/4 + 2/7}}. Give your answer as a mixed number in its simplest form.",
            answer: { type: "fraction", n: 29, d: 28, simplest: true, form: "mixed" },
            solution: "The LCM of 4 and 7 is 28: {{21/28 + 8/28 = 29/28 = 1 1/28}}.",
          },
        },
        {
          title: "Subtracting mixed numbers with borrowing",
          problem: "Work out {{4 1/3 - 1 5/6}}. Give your answer as a mixed number in its simplest form.",
          steps: [
            "Estimate: 4 − 2 = 2. We rounded {{1 5/6}} up, so the answer should be a bit more than 2.",
            "Common denominator 6: {{4 1/3 = 4 2/6}}.",
            "{{2/6}} is smaller than {{5/6}}, so borrow 1 whole: {{4 2/6 = 3 + 6/6 + 2/6 = 3 8/6}}.",
            "Subtract wholes and parts: {{3 8/6 - 1 5/6 = 2 3/6}}.",
            "Simplify: {{2 3/6 = 2 1/2}}.",
          ],
          answer: "{{2 1/2}}",
        },
        {
          title: "A two-step problem",
          problem:
            "A plank is {{4 1/2}} m long. Hana cuts off one piece of {{1 2/3}} m and another of {{1 3/4}} m. How much of the plank is left?",
          steps: [
            "Estimate: 4.5 − 1.5 − 2 = 1, so expect about 1 m.",
            "Add the two cuts first: {{1 2/3 + 1 3/4 = 2 + 8/12 + 9/12 = 2 + 17/12 = 3 5/12}} m.",
            "Subtract from the plank: {{4 1/2 - 3 5/12 = 4 6/12 - 3 5/12 = 1 1/12}} m.",
            "Check by adding back: {{1 1/12 + 3 5/12 = 4 6/12 = 4 1/2}}, the length of the plank.",
          ],
          answer: "{{1 1/12}} m",
        },
      ],
      keyPoints: [
        "Same-size pieces first: rewrite over a common denominator.",
        "Add or subtract the numerators; the denominator stays the same — never add denominators.",
        "When subtracting mixed numbers, borrow 1 whole if the first fraction part is smaller.",
        "Estimate first; give answers as mixed numbers in simplest form.",
      ],
      whyItWorks:
        "A denominator names a *unit*, like cm or kg. {{2/7 + 3/7}} means 2 sevenths + 3 sevenths = 5 sevenths, exactly like 2 cm + 3 cm = 5 cm — the unit doesn't change, so neither does the denominator. You can't add 2 cm and 3 mm without converting, and you can't add thirds and quarters until both are written as twelfths. Borrowing works because {{1 = 12/12}}: swapping one whole for twelve twelfths doesn't change the value.",
      strategies: ["Estimate first", "Count up on a number line", "Use the inverse (check by adding back)"],
      thinkDeeper:
        "Ancient Egyptian scribes wrote fractions as sums of *different* unit fractions (numerator 1), such as {{3/4 = 1/2 + 1/4}}. Write {{1/2}} as the sum of two different unit fractions. How many ways are there? Now try {{1/6}}. How can you be sure you have found them all?",
    },
    // ------------------------------------------------------------------
    {
      id: "multiplying",
      heading: "Multiplying fractions",
      discovery: {
        problem:
          "A vegetable garden is {{3/4}} m wide and {{2/3}} m long. Sketch a 1 m by 1 m square, mark the garden inside it, and work out what fraction of the square metre the garden covers. Can you see a rule?",
        idea:
          "Cut the square into 4 columns and 3 rows: 12 equal pieces. The garden covers 3 columns × 2 rows = 6 of them, so its area is {{6/12 = 1/2}} m². That is {{3/4 × 2/3 = (3 × 2)/(4 × 3) = 6/12}}: the numerators multiply to count the garden's pieces, and the denominators multiply to count all the pieces.",
      },
      body:
        "To multiply fractions, **multiply the numerators and multiply the denominators**:\n\n    {{a/b × c/d = (a × c)/(b × d)}}\n\nThe **area model** shows why: in the diagram the 1 m square is cut into {{4 × 3 = 12}} equal pieces, and the garden covers {{3 × 2 = 6}} of them.\n\n**Cancel first.** Before multiplying, divide *any* numerator and *any* denominator by a common factor — even across the two fractions. The numbers stay small and the answer comes out already simplified. In {{8/15 × 9/16}}, 8 and 16 share a factor of 8, and 9 and 15 share a factor of 3:\n\n    {{8/15 × 9/16 = (1 × 3)/(5 × 2) = 3/10}}\n\n**'Of' means ×.** {{2/3}} of {{3/5}} is {{2/3 × 3/5 = 2/5}}. A fraction of a fraction is just a multiplication.\n\n**Integers and mixed numbers.** Write an integer over 1: {{4 × 2/7 = 4/1 × 2/7 = 8/7 = 1 1/7}}. For an integer × a mixed number the distributive law is quickest: {{3 × 2 3/4 = 3 × 2 + 3 × 3/4 = 6 + 2 1/4 = 8 1/4}}. When *both* numbers are mixed, convert to improper fractions first. Multiplying wholes and parts separately is wrong: {{1 1/2 × 1 1/2 = 3/2 × 3/2 = 9/4 = 2 1/4}}, not {{1 1/4}}.\n\n**Size check.** Multiplying a positive number by a proper fraction (between 0 and 1) makes it *smaller*: {{20 × 3/4 = 15}}. Multiplying by a number bigger than 1 makes it bigger.",
      diagram: `<svg viewBox="0 0 380 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 1 metre by 1 metre square cut into 4 columns and 3 rows, making 12 equal pieces. The garden, three quarters of a metre wide and two thirds of a metre long, covers 6 of the 12 pieces."><rect x="0" y="0" width="380" height="330" fill="#ffffff"/><rect x="90" y="60" width="240" height="240" fill="#ffffff" stroke="#334155" stroke-width="0"/><rect x="90" y="60" width="180" height="240" fill="#bae6fd"/><rect x="90" y="60" width="240" height="160" fill="#fde68a"/><rect x="90" y="60" width="180" height="160" fill="#86efac"/><line x1="150" y1="60" x2="150" y2="300" stroke="#334155" stroke-width="1"/><line x1="210" y1="60" x2="210" y2="300" stroke="#334155" stroke-width="1"/><line x1="270" y1="60" x2="270" y2="300" stroke="#334155" stroke-width="1"/><line x1="90" y1="140" x2="330" y2="140" stroke="#334155" stroke-width="1"/><line x1="90" y1="220" x2="330" y2="220" stroke="#334155" stroke-width="1"/><rect x="90" y="60" width="240" height="240" fill="none" stroke="#1f2937" stroke-width="2"/><text x="120" y="105" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">1</text><text x="180" y="105" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">2</text><text x="240" y="105" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">3</text><text x="120" y="185" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">4</text><text x="180" y="185" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">5</text><text x="240" y="185" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">6</text><line x1="90" y1="48" x2="270" y2="48" stroke="#0369a1" stroke-width="1.5"/><line x1="90" y1="43" x2="90" y2="53" stroke="#0369a1" stroke-width="1.5"/><line x1="270" y1="43" x2="270" y2="53" stroke="#0369a1" stroke-width="1.5"/><text x="172.8" y="23" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#0369a1">3</text><line x1="167.8" y1="26" x2="177.8" y2="26" stroke="#0369a1" stroke-width="1.2"/><text x="172.8" y="40" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#0369a1">4</text><text x="181.8" y="30.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#0369a1">m</text><line x1="78" y1="60" x2="78" y2="220" stroke="#a16207" stroke-width="1.5"/><line x1="73" y1="60" x2="83" y2="60" stroke="#a16207" stroke-width="1.5"/><line x1="73" y1="220" x2="83" y2="220" stroke="#a16207" stroke-width="1.5"/><text x="47.5" y="137" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#a16207">2</text><line x1="42.5" y1="140" x2="52.6" y2="140" stroke="#a16207" stroke-width="1.2"/><text x="47.5" y="154" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#a16207">3</text><text x="56.6" y="144.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#a16207">m</text><text x="210" y="322" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 m</text><text x="340" y="184" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">1 m</text></svg>`,
      diagramCaption:
        "{{3/4}} of the width and {{2/3}} of the length cover 6 of the 12 equal pieces, so {{3/4 × 2/3 = 6/12 = 1/2}} m².",
      workedExamples: [
        {
          title: "Cancel, then multiply",
          problem: "Work out {{5/6 × 9/10}}. Give your answer in its simplest form.",
          steps: [
            "Look for a numerator and a denominator with a common factor: 5 and 10 share 5; 9 and 6 share 3.",
            "Cancel: {{5/6 × 9/10 = (1 × 3)/(2 × 2)}}.",
            "Multiply: {{3/4}}. (Without cancelling you get {{45/60}}, which still simplifies to {{3/4}} — just with bigger numbers.)",
          ],
          answer: "{{3/4}}",
          yourTurn: {
            question: "Your turn: work out {{4/9 × 15/16}}. Give your answer in its simplest form.",
            answer: { type: "fraction", n: 5, d: 12, simplest: true },
            solution: "Cancel 4 with 16 (÷4) and 15 with 9 (÷3): {{(1 × 5)/(3 × 4) = 5/12}}.",
          },
        },
        {
          title: "Integer × mixed number",
          problem: "Work out {{6 × 2 5/8}}. Give your answer as a mixed number.",
          steps: [
            "Estimate: {{6 × 2 1/2 = 15}}, so expect a little over 15.",
            "Distributive law: {{6 × 2 5/8 = 6 × 2 + 6 × 5/8}}.",
            "{{6 × 2 = 12}} and {{6 × 5/8 = 30/8 = 15/4 = 3 3/4}}.",
            "Add: {{12 + 3 3/4 = 15 3/4}}.",
            "Check another way: {{6 × 21/8 = 126/8 = 63/4 = 15 3/4}}.",
          ],
          answer: "{{15 3/4}}",
        },
        {
          title: "Mixed × mixed",
          problem: "Work out {{2 2/5 × 1 7/8}}. Give your answer as a mixed number.",
          steps: [
            "Estimate: 2.4 × 2 = 4.8, and {{1 7/8}} is a little less than 2, so expect a little under 4.8.",
            "Convert to improper fractions: {{2 2/5 = 12/5}} and {{1 7/8 = 15/8}}.",
            "Cancel: 12 and 8 share 4 (giving 3 and 2); 15 and 5 share 5 (giving 3 and 1).",
            "{{12/5 × 15/8 = (3 × 3)/(1 × 2) = 9/2}}.",
            "{{9/2 = 4 1/2}} — a little under 4.8, as estimated.",
          ],
          answer: "{{4 1/2}}",
        },
      ],
      keyPoints: [
        "Multiply numerators, multiply denominators: {{a/b × c/d = (a c)/(b d)}}.",
        "Cancel common factors (any top with any bottom) before multiplying.",
        "'Of' means multiply; write an integer over 1.",
        "Mixed × mixed: convert to improper fractions first. Integer × mixed: the distributive law is quick.",
      ],
      whyItWorks:
        "To find {{2/3}} of {{3/4}}, first cut the whole into 4 columns and keep 3; then cut it into 3 rows and keep 2. The cuts make {{4 × 3 = 12}} equal pieces — the denominators multiply — and you keep {{3 × 2 = 6}} of them — the numerators multiply. Cancelling across two fractions is allowed because {{8/15 × 9/16 = (8 × 9)/(15 × 16)}} is one fraction, and dividing its top and bottom by the same number never changes its value.",
      strategies: ["Draw an area model", "Cancel before you multiply", "Estimate first"],
      thinkDeeper:
        "Work out {{(1 - 1/2) × (1 - 1/3) × (1 - 1/4) × … × (1 - 1/10)}} without a calculator. Write each bracket as a single fraction first — what happens? What would the answer be if the product carried on all the way to {{(1 - 1/100)}}?",
    },
    // ------------------------------------------------------------------
    {
      id: "dividing",
      heading: "Dividing fractions and reciprocals",
      discovery: {
        problem:
          "A ribbon is 2 m long. How many pieces of length {{2/3}} m can you cut from it? Now: how many pieces of length {{3/4}} m? Draw it — the second answer isn't a whole number.",
        idea:
          "Each metre holds {{1 1/2}} pieces of {{2/3}} m, so 2 metres hold 3: {{2 ÷ 2/3 = 3}}. For {{3/4}} m pieces you get 2 whole pieces using {{1 1/2}} m, and the {{1/2}} m left over is {{2/3}} of another piece, so {{2 ÷ 3/4 = 2 2/3}}. In both cases you could have multiplied by the *flipped* divisor: {{2 × 3/2 = 3}} and {{2 × 4/3 = 8/3 = 2 2/3}}.",
      },
      body:
        "Division asks **'how many of these fit into that?'** {{6 ÷ 2}} asks how many 2s fit into 6. In the same way {{3 ÷ 1/4}} asks how many quarters fit into 3 — and since each whole holds 4 quarters, the answer is {{3 × 4 = 12}}.\n\nThe **reciprocal** of a number is what you multiply it by to get 1. Flip a fraction to find its reciprocal:\n\n| Number | {{2/5}} | 7 | {{1/9}} | {{1 3/4}} |\n|---|---|---|---|---|\n| Reciprocal | {{5/2}} | {{1/7}} | 9 | {{4/7}} |\n\nFor a mixed number, change to an improper fraction first: {{1 3/4 = 7/4}}, so its reciprocal is {{4/7}}. Zero has no reciprocal — nothing times 0 makes 1.\n\n**Dividing by a fraction is the same as multiplying by its reciprocal:**\n\n    {{a/b ÷ c/d = a/b × d/c}}\n\nRemember it as **Keep, Change, Flip**: keep the first fraction, change ÷ to ×, flip the second. Only the *second* number (the divisor) flips.\n\n    {{4/5 ÷ 2/3 = 4/5 × 3/2 = 12/10 = 6/5 = 1 1/5}}\n\n- **Integer ÷ fraction:** {{6 ÷ 3/4 = 6 × 4/3 = 8}} — eight lots of {{3/4}} make 6.\n- **Fraction ÷ integer:** {{3/4 ÷ 6 = 3/4 × 1/6 = 1/8}} — share {{3/4}} into 6 equal parts.\n- **Mixed numbers:** convert to improper fractions *first*, then flip the divisor.\n\n**Size check.** Dividing a positive number by a proper fraction gives a *bigger* answer, because lots of small pieces fit in. Dividing by a number bigger than 1 gives a smaller answer.",
      diagram: `<svg viewBox="0 0 480 222" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two 2-metre bars. The first is cut into thirds and grouped in pairs: exactly 3 pieces of two thirds of a metre. The second is cut into quarters and grouped in threes: 2 whole pieces of three quarters of a metre plus half a metre, which is two thirds of a piece."><rect x="0" y="0" width="480" height="222" fill="#ffffff"/><text x="40" y="22.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">2</text><text x="53.9" y="22.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">÷</text><text x="76.4" y="15" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="71.3" y1="18" x2="81.4" y2="18" stroke="#1f2937" stroke-width="1.2"/><text x="76.4" y="32" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="88.4" y="22.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">=</text><text x="104.8" y="22.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">3</text><text x="440" y="23" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">three pieces fit exactly</text><rect x="40" y="38" width="133.3" height="36" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="106.7" y="61" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">piece 1</text><rect x="173.3" y="38" width="133.3" height="36" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><text x="240" y="61" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">piece 2</text><rect x="306.7" y="38" width="133.3" height="36" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="373.3" y="61" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">piece 3</text><line x1="106.7" y1="39" x2="106.7" y2="47" stroke="#334155" stroke-width="1.2"/><line x1="106.7" y1="65" x2="106.7" y2="73" stroke="#334155" stroke-width="1.2"/><line x1="173.3" y1="39" x2="173.3" y2="47" stroke="#334155" stroke-width="1.2"/><line x1="173.3" y1="65" x2="173.3" y2="73" stroke="#334155" stroke-width="1.2"/><line x1="240" y1="39" x2="240" y2="47" stroke="#334155" stroke-width="1.2"/><line x1="240" y1="65" x2="240" y2="73" stroke="#334155" stroke-width="1.2"/><line x1="306.7" y1="39" x2="306.7" y2="47" stroke="#334155" stroke-width="1.2"/><line x1="306.7" y1="65" x2="306.7" y2="73" stroke="#334155" stroke-width="1.2"/><line x1="373.3" y1="39" x2="373.3" y2="47" stroke="#334155" stroke-width="1.2"/><line x1="373.3" y1="65" x2="373.3" y2="73" stroke="#334155" stroke-width="1.2"/><line x1="40" y1="74" x2="40" y2="82" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="96" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><line x1="240" y1="74" x2="240" y2="82" stroke="#1f2937" stroke-width="1.5"/><text x="240" y="96" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 m</text><line x1="440" y1="74" x2="440" y2="82" stroke="#1f2937" stroke-width="1.5"/><text x="440" y="96" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2 m</text><text x="40" y="134.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">2</text><text x="53.9" y="134.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">÷</text><text x="76.4" y="127" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><line x1="71.3" y1="130" x2="81.4" y2="130" stroke="#1f2937" stroke-width="1.2"/><text x="76.4" y="144" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="88.4" y="134.6" font-size="13" font-family="sans-serif" text-anchor="start" fill="#1f2937">=</text><text x="104.8" y="135.2" font-size="14" font-family="sans-serif" text-anchor="start" fill="#1f2937">2</text><text x="122.4" y="127" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="117.3" y1="130" x2="127.4" y2="130" stroke="#1f2937" stroke-width="1.2"/><text x="122.4" y="144" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="440" y="135" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">two pieces, plus two thirds of a piece</text><rect x="40" y="150" width="150" height="36" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="115" y="173" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">piece 1</text><rect x="190" y="150" width="150" height="36" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><text x="265" y="173" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">piece 2</text><rect x="340" y="150" width="100" height="36" fill="#fecaca" stroke="#1f2937" stroke-width="2"/><text x="362.4" y="165" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="358" y1="168" x2="366.8" y2="168" stroke="#1f2937" stroke-width="1.2"/><text x="362.4" y="180" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="370.8" y="171.9" font-size="11" font-family="sans-serif" text-anchor="start" fill="#1f2937">of a piece</text><line x1="90" y1="151" x2="90" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="90" y1="177" x2="90" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="140" y1="151" x2="140" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="140" y1="177" x2="140" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="190" y1="151" x2="190" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="190" y1="177" x2="190" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="240" y1="151" x2="240" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="240" y1="177" x2="240" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="290" y1="151" x2="290" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="290" y1="177" x2="290" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="340" y1="151" x2="340" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="340" y1="177" x2="340" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="390" y1="151" x2="390" y2="159" stroke="#334155" stroke-width="1.2"/><line x1="390" y1="177" x2="390" y2="185" stroke="#334155" stroke-width="1.2"/><line x1="40" y1="186" x2="40" y2="194" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><line x1="240" y1="186" x2="240" y2="194" stroke="#1f2937" stroke-width="1.5"/><text x="240" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 m</text><line x1="440" y1="186" x2="440" y2="194" stroke="#1f2937" stroke-width="1.5"/><text x="440" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2 m</text></svg>`,
      diagramCaption: "Division as 'how many fit?': {{2 ÷ 2/3 = 3}} exactly, and {{2 ÷ 3/4 = 2 2/3}}.",
      workedExamples: [
        {
          title: "Integer ÷ fraction",
          problem: "Work out {{5 ÷ 2/3}}. Give your answer as a mixed number.",
          steps: [
            "Ask: how many {{2/3}}s fit into 5? Each whole holds {{1 1/2}} of them, so expect about 7 or 8.",
            "Keep 5, change ÷ to ×, flip {{2/3}} to {{3/2}}: {{5 × 3/2 = 15/2}}.",
            "{{15/2 = 7 1/2}}.",
            "Check by multiplying back: {{15/2 × 2/3 = 30/6 = 5}}.",
          ],
          answer: "{{7 1/2}}",
          yourTurn: {
            question: "Your turn: work out {{4 ÷ 3/5}}. Give your answer as a mixed number in its simplest form.",
            answer: { type: "fraction", n: 20, d: 3, simplest: true, form: "mixed" },
            solution: "Keep, change, flip: {{4 × 5/3 = 20/3 = 6 2/3}}.",
          },
        },
        {
          title: "Fraction ÷ fraction",
          problem: "Work out {{7/12 ÷ 14/15}}. Give your answer in its simplest form.",
          steps: [
            "Keep, change, flip: {{7/12 × 15/14}}.",
            "Cancel 7 with 14 (÷7) and 15 with 12 (÷3): {{(1 × 5)/(4 × 2)}}.",
            "Multiply: {{5/8}}.",
            "Size check: {{14/15}} is just under 1, so the answer should be just over {{7/12}}. {{7/12 = 14/24}} and {{5/8 = 15/24}} — just over.",
          ],
          answer: "{{5/8}}",
        },
        {
          title: "Mixed number ÷ fraction in context",
          problem: "How many {{3/8}}-litre cups can be filled from a jug holding {{2 1/4}} litres of lime juice?",
          steps: [
            "This is a 'how many fit?' question: {{2 1/4 ÷ 3/8}}.",
            "Estimate: {{3/8}} litre is a bit less than half a litre, and 2 litres hold 4 halves, so expect more than 4 cups.",
            "Convert: {{2 1/4 = 9/4}}.",
            "Flip and multiply: {{9/4 × 8/3}}. Cancel 9 with 3 and 8 with 4: {{(3 × 2)/(1 × 1) = 6}}.",
            "Check: {{6 × 3/8 = 18/8 = 2 1/4}} litres.",
          ],
          answer: "6 cups",
        },
      ],
      keyPoints: [
        "Division asks 'how many fit?', so dividing a positive number by a proper fraction makes it bigger.",
        "The reciprocal of {{a/b}} is {{b/a}}; a number × its reciprocal = 1.",
        "To divide, multiply by the reciprocal of the divisor: Keep, Change, Flip.",
        "Convert mixed numbers to improper fractions before flipping.",
      ],
      whyItWorks:
        "A division doesn't change if you multiply both numbers by the same thing (6 ÷ 2 = 60 ÷ 20). So multiply both parts of {{4/5 ÷ 2/3}} by {{3/2}}, the reciprocal of the divisor: {{(4/5 × 3/2) ÷ (2/3 × 3/2) = (4/5 × 3/2) ÷ 1}}. The divisor has become 1, and dividing by 1 changes nothing — so all that's left is {{4/5 × 3/2}}. That is 'multiply by the reciprocal'.",
      strategies: ["Ask 'how many fit?'", "Keep, Change, Flip", "Check by multiplying back"],
      thinkDeeper:
        "Without working any of them out, sort these four into two pairs with equal values: {{12 × 3/4}}, {{12 ÷ 3/4}}, {{12 × 4/3}}, {{12 ÷ 4/3}}. Explain using reciprocals, then say which pair is bigger and why.",
    },
    // ------------------------------------------------------------------
    {
      id: "fractions-of-amounts",
      heading: "Fractions of amounts",
      discovery: {
        problem:
          "At a hawker centre, Wei Ling spends {{3/8}} of her money on lunch and has $15 left. How much did she have to start with? Try drawing a bar split into 8 equal boxes before you calculate anything.",
        idea:
          "Lunch used 3 of the 8 boxes, so the other 5 boxes are worth $15. One box is 15 ÷ 5 = $3, so all 8 boxes are $24. Finding *one part* first unlocks almost every fraction-of-an-amount problem.",
      },
      body:
        "Three kinds of question, one idea — **find one part first**.\n\n**1. A fraction of an amount.** To find {{3/5}} of 240, divide by the denominator to get one fifth, then multiply by the numerator: 240 ÷ 5 = 48, and 48 × 3 = 144. That's the same as {{3/5 × 240}}, because 'of' means ×.\n\n**2. One quantity as a fraction of another.** Write the first quantity over the second — *in the same units* — and simplify. For 45 minutes as a fraction of 2 hours: 2 hours = 120 minutes, so the fraction is {{45/120 = 3/8}}. The answer can be bigger than 1: if Jun scores 18 goals this season and 12 last season, this season's total is {{18/12 = 3/2 = 1 1/2}} times last season's.\n\n**3. Finding the whole from a part.** If {{3/5}} of a number is 72, then {{1/5}} of it is 72 ÷ 3 = 24, so the whole ({{5/5}}) is 24 × 5 = 120. In one step: whole = {{72 ÷ 3/5 = 72 × 5/3 = 120}}.\n\nA **bar model** turns all three into the same picture: one bar for the whole, cut into as many equal boxes as the denominator. Label what you know, find one box, and the rest follows.",
      diagram: `<svg viewBox="0 0 480 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar split into 8 equal boxes. 3 boxes are spent on lunch; the 5 boxes left are worth 15 dollars, so each box is 3 dollars and the whole bar is 24 dollars."><rect x="0" y="0" width="480" height="190" fill="#ffffff"/><text x="240" y="18" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">Wei Ling's money: 8 equal boxes</text><rect x="40" y="74" width="50" height="40" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><rect x="90" y="74" width="50" height="40" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><rect x="140" y="74" width="50" height="40" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><rect x="190" y="74" width="50" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><rect x="240" y="74" width="50" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><rect x="290" y="74" width="50" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><rect x="340" y="74" width="50" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><rect x="390" y="74" width="50" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="115" y="99" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">lunch</text><text x="215" y="99" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$3</text><text x="265" y="99" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$3</text><text x="315" y="99" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$3</text><text x="365" y="99" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$3</text><text x="415" y="99" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$3</text><path d="M 42 70 L 42 62 L 188 62 L 188 70" fill="none" stroke="#334155" stroke-width="1.5"/><text x="91.6" y="48.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">spent</text><text x="132.7" y="41" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><line x1="128" y1="44" x2="137.4" y2="44" stroke="#1f2937" stroke-width="1.2"/><text x="132.7" y="57" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8</text><path d="M 192 70 L 192 62 L 438 62 L 438 70" fill="none" stroke="#334155" stroke-width="1.5"/><text x="298.1" y="48.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">left</text><text x="326.2" y="41" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><line x1="321.5" y1="44" x2="330.9" y2="44" stroke="#1f2937" stroke-width="1.2"/><text x="326.2" y="57" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8</text><path d="M 192 118 L 192 126 L 438 126 L 438 118" fill="none" stroke="#334155" stroke-width="1.5"/><text x="315" y="144" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">5 boxes = $15</text><text x="240" y="178" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 box = $15 ÷ 5 = $3,  so 8 boxes = 8 × $3 = $24</text></svg>`,
      diagramCaption: "Bar model for the discovery problem: 5 boxes are worth $15, so each box is $3 and the whole is $24.",
      workedExamples: [
        {
          title: "A fraction of an amount",
          problem: "Find {{5/7}} of 182 kg.",
          steps: ["Find one seventh: 182 ÷ 7 = 26 kg.", "Five sevenths is 5 times as much: 26 × 5 = 130 kg."],
          answer: "130 kg",
          yourTurn: {
            question: "Your turn: find {{4/9}} of 225 ml. Give your answer in ml.",
            answer: { type: "number", value: 100, display: "100 ml" },
            solution: "One ninth: 225 ÷ 9 = 25 ml. Four ninths: 25 × 4 = 100 ml.",
          },
        },
        {
          title: "One quantity as a fraction of another",
          problem: "(a) Write 75 cm as a fraction of 2 m. (b) Write 2 m as a fraction of 75 cm.",
          steps: [
            "Same units first: 2 m = 200 cm.",
            "(a) {{75/200}}. The HCF of 75 and 200 is 25, so {{75/200 = 3/8}}.",
            "(b) {{200/75 = 8/3 = 2 2/3}}. The first quantity is the bigger one this time, so the fraction is bigger than 1.",
            "Notice the two answers are reciprocals: {{3/8 × 8/3 = 1}}.",
          ],
          answer: "(a) {{3/8}}   (b) {{8/3 = 2 2/3}}",
        },
        {
          title: "Working backwards from what's left",
          problem:
            "After spending {{2/5}} of his savings on a CCA trip, Marcus has $57 left. How much did the trip cost?",
          steps: [
            "Draw a bar of 5 equal boxes: 2 boxes for the trip, 3 boxes left.",
            "3 boxes = $57, so 1 box = 57 ÷ 3 = $19.",
            "The trip is 2 boxes: 2 × 19 = $38.",
            "Check: his savings were 5 × 19 = $95, and $95 − $38 = $57.",
          ],
          answer: "$38",
        },
      ],
      keyPoints: [
        "Fraction of an amount: divide by the denominator, multiply by the numerator.",
        "A as a fraction of B is {{A/B}}, with both in the same units. It can be bigger than 1.",
        "Whole from a part: find one part, then multiply up (or divide by the fraction).",
        "Draw a bar model with as many equal boxes as the denominator.",
      ],
      whyItWorks:
        "{{3/5}} of 240 means 3 pieces when 240 is cut into 5 equal pieces. Cutting into 5 is ÷ 5, and taking 3 of them is × 3. Since {{3/5 × 240 = (3 × 240)/5}}, you could multiply first and divide second — but dividing first keeps the numbers small. Finding the whole reverses both steps (÷ 3, then × 5), which is exactly the same as dividing by {{3/5}}.",
      strategies: ["Use a bar model", "Find one part first", "Work backwards"],
      thinkDeeper:
        "A first number is {{2/3}} of a second number, and the second number is {{3/4}} of a third. The first number is 36. Find the third number — then explain why the first number is exactly half of the third, whatever the first number is.",
    },
    // ------------------------------------------------------------------
    {
      id: "calculating-with-fractions",
      heading: "Calculating with fractions",
      discovery: {
        problem:
          "Without a calculator, work out {{7/9 × 13 + 7/9 × 5}}. There's a slow way and a ten-second way. Find the quick one.",
        idea:
          "Both terms are '{{7/9}} times something', so use the distributive law: {{7/9 × (13 + 5) = 7/9 × 18 = 14}}. The laws of arithmetic work for fractions exactly as they do for whole numbers — and spotting them saves a lot of work.",
      },
      body:
        "Everything you know about calculating with whole numbers still holds for fractions.\n\n**Order of operations** (BIDMAS, also called BODMAS): Brackets, then Indices (powers and roots), then Division and Multiplication from left to right, then Addition and Subtraction from left to right.\n\n    {{1/2 + 1/3 × 3/4 = 1/2 + 1/4 = 3/4}}\n    {{(1/2 + 1/3) × 3/4 = 5/6 × 3/4 = 5/8}}\n\nThe first line multiplies before adding; in the second the brackets come first, so the answers differ.\n\n**Laws of arithmetic.**\n- **Commutative:** {{a × b = b × a}} and {{a + b = b + a}}. Reorder to pair up friendly numbers: {{3/7 × 15 × 7/3 = (3/7 × 7/3) × 15 = 15}}.\n- **Associative:** when only adding (or only multiplying), group however you like — and, with the commutative law, in any order: {{2/5 + 3/4 + 3/5 = (2/5 + 3/5) + 3/4 = 1 3/4}}.\n- **Distributive:** {{a × (b + c) = a × b + a × c}}, used either way round. Expand: {{12 × 2 3/4 = 12 × 2 + 12 × 3/4 = 24 + 9 = 33}}. Or factorise: {{5/6 × 7 - 5/6 × 1 = 5/6 × 6 = 5}}.\n\nSubtraction and division are **not** commutative: {{1/2 ÷ 1/4 = 2}} but {{1/4 ÷ 1/2 = 1/2}}.\n\n**Powers.** {{(2/3)^2 = 2/3 × 2/3 = 4/9}} — square the top *and* the bottom.\n\n**Estimate first.** Round to friendly numbers: {{2 7/8 × 3 9/10}} is about 3 × 4 = 12. Both numbers were rounded *up*, so the exact answer must be a little *less* than 12 (it is {{11 17/80}}).\n\n**Multi-step problems.** Read every word: '{{1/4}} of the *remainder*' is a fraction of what is left, not of the original amount. A bar model keeps track (see the diagram).",
      diagram: `<svg viewBox="0 0 480 212" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar split into 6 equal boxes. 2 boxes are the book (one third of all the money). The other 4 boxes are the remainder; 1 of them, a quarter of the remainder, is the tea. The last 3 boxes are 18 dollars left, so each box is 6 dollars and the total is 36 dollars."><rect x="0" y="0" width="480" height="212" fill="#ffffff"/><text x="240" y="18" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">Priya's money: 6 equal boxes</text><rect x="60" y="84" width="60" height="40" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><rect x="120" y="84" width="60" height="40" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><rect x="180" y="84" width="60" height="40" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><rect x="240" y="84" width="60" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><rect x="300" y="84" width="60" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><rect x="360" y="84" width="60" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="90" y="109" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">book</text><text x="150" y="109" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">book</text><text x="210" y="109" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">tea</text><text x="270" y="109" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$6</text><text x="330" y="109" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$6</text><text x="390" y="109" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$6</text><path d="M 62 80 L 62 72 L 178 72 L 178 80" fill="none" stroke="#334155" stroke-width="1.5"/><text x="104.1" y="51" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="99.4" y1="54" x2="108.8" y2="54" stroke="#1f2937" stroke-width="1.2"/><text x="104.1" y="67" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="112.8" y="58.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">of all</text><path d="M 182 80 L 182 72 L 418 72 L 418 80" fill="none" stroke="#334155" stroke-width="1.5"/><text x="221.3" y="58.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">remainder =</text><text x="306.1" y="51" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="301.3" y1="54" x2="310.8" y2="54" stroke="#1f2937" stroke-width="1.2"/><text x="306.1" y="67" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="319.8" y="58.2" font-size="12" font-family="sans-serif" text-anchor="start" fill="#1f2937">= 4 boxes</text><text x="203.2" y="143" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="198.8" y1="146" x2="207.6" y2="146" stroke="#1f2937" stroke-width="1.2"/><text x="203.2" y="158" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="211.6" y="149.9" font-size="11" font-family="sans-serif" text-anchor="start" fill="#1f2937">of</text><text x="210" y="170" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">remainder</text><path d="M 242 128 L 242 136 L 418 136 L 418 128" fill="none" stroke="#334155" stroke-width="1.5"/><text x="330" y="154" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-weight="bold">$18 left</text><text x="240" y="200" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3 boxes = $18, so 1 box = $6 and 6 boxes = $36</text></svg>`,
      diagramCaption:
        "'{{1/4}} of the remainder' is a quarter of the 4 remaining boxes — not a quarter of the whole bar.",
      workedExamples: [
        {
          title: "Order of operations",
          problem: "Work out {{2/3 + 1/2 ÷ 3/4}}. Give your answer as a mixed number.",
          steps: [
            "Division comes before addition.",
            "{{1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3}}.",
            "Then add: {{2/3 + 2/3 = 4/3 = 1 1/3}}.",
            "Common slip: working left to right gives {{(2/3 + 1/2) ÷ 3/4 = 7/6 × 4/3 = 14/9 = 1 5/9}}, which is wrong.",
          ],
          answer: "{{1 1/3}}",
          yourTurn: {
            question: "Your turn: work out {{3/4 - 1/2 × 1/3}}. Give your answer as a fraction in its simplest form.",
            answer: { type: "fraction", n: 7, d: 12, simplest: true },
            solution: "Multiply first: {{1/2 × 1/3 = 1/6}}. Then {{3/4 - 1/6 = 9/12 - 2/12 = 7/12}}.",
          },
        },
        {
          title: "Powers and mixed numbers",
          problem: "Work out {{(1 1/2)^2 - 3/4 × 2 2/3}}.",
          steps: [
            "Powers first: {{(1 1/2)^2 = (3/2)^2 = 9/4}}.",
            "Then multiply: {{3/4 × 2 2/3 = 3/4 × 8/3 = 2}} (cancel the 3s, then 8 with 4).",
            "Finally subtract: {{9/4 - 2 = 9/4 - 8/4 = 1/4}}.",
          ],
          answer: "{{1/4}}",
        },
        {
          title: "A fraction of the remainder",
          problem:
            "Priya spends {{1/3}} of her money on a book and then {{1/4}} of the remainder on bubble tea. She has $18 left. How much did she start with?",
          steps: [
            "After the book, {{2/3}} of her money remains.",
            "The tea is {{1/4}} of the remainder: {{1/4 × 2/3 = 1/6}} of her money.",
            "Spent altogether: {{1/3 + 1/6 = 2/6 + 1/6 = 1/2}}, so {{1/2}} of her money is left.",
            "{{1/2}} of her money is $18, so she started with $36.",
            "Bar-model check: 6 equal boxes — book 2 boxes, tea 1 box, and 3 boxes = $18. One box is $6, so 6 boxes are $36.",
          ],
          answer: "$36",
        },
      ],
      keyPoints: [
        "Order of operations: brackets, powers, × and ÷ (left to right), then + and − (left to right).",
        "The commutative, associative and distributive laws all work with fractions — look for them before calculating.",
        "Estimate first by rounding to whole numbers or halves.",
        "'Of the remainder' means a fraction of what is left, not of the whole.",
      ],
      whyItWorks:
        "The laws of arithmetic are facts about *numbers*, and fractions are numbers. The distributive law {{a × (b + c) = a × b + a × c}} is just the area of a rectangle split into two parts — it doesn't care whether the side lengths are whole numbers or fractions. So {{7/9 × 13 + 7/9 × 5}} is two rectangles of height {{7/9}} placed side by side, which make one rectangle {{7/9}} by 18.",
      strategies: ["Look for structure before calculating", "Estimate first", "Use a bar model"],
      thinkDeeper:
        "Use the digits 1, 2, 3 and 4, each exactly once, in place of a, b, c and d. Make {{a/b + c/d}} as large as possible. Then make {{a/b - c/d}} as small as possible while keeping it positive. Explain why your choices must be the best.",
    },
    // ------------------------------------------------------------------
    {
      id: "algebraic-fractions",
      heading: "Algebraic fractions",
      discovery: {
        problem:
          "Pick any number for {{x}} (not 0) and work out {{x/3 × 6/x}}. Try a different value of {{x}}. What do you notice — and why does it happen?",
        idea:
          "You always get 2. The {{x}} on the top and the {{x}} on the bottom cancel, just as a number would: {{x/3 × 6/x = (6x)/(3x) = 2}}. Letters in fractions obey exactly the same rules as numbers.",
      },
      body:
        "**Stretch:** An **algebraic fraction** is a fraction with letters in the numerator, the denominator or both, such as {{x/4}}, {{3/y}} or {{(2a)/(5b)}}. The letters stand for numbers, so every rule in this chapter carries over.\n\n**Multiplying:** multiply the tops and multiply the bottoms, cancelling common factors — numbers *and* letters — first. In {{(2a)/5 × 15/(4a)}}, cancel {{a}} with {{a}}, 2 with 4, and 15 with 5:\n\n    {{(2a)/5 × 15/(4a) = (1 × 3)/(1 × 2) = 3/2}}\n\n**Dividing:** multiply by the reciprocal of the divisor, then cancel.\n\n    {{x/6 ÷ x/9 = x/6 × 9/x = 9/6 = 3/2}}\n    {{(3m)/4 ÷ 6/m = (3m)/4 × m/6 = (3m^2)/24 = (m^2)/8}}\n\n**Only cancel factors.** A **factor** multiplies the *whole* top or the *whole* bottom. In {{(5x)/(7x)}} the {{x}} cancels, leaving {{5/7}}. In {{(x + 5)/(x + 7)}} nothing cancels: try {{x = 1}} and you get {{6/8}}, not {{5/7}}.\n\nA denominator can never be zero, so whenever we cancel a letter we assume it isn't 0.",
      workedExamples: [
        {
          title: "Letters that cancel completely",
          problem: "Simplify {{x/4 × 8/x}}.",
          steps: [
            "Multiply tops and bottoms: {{(8x)/(4x)}}.",
            "Cancel the common factor {{x}} (assuming {{x != 0}}), then 8 ÷ 4 = 2.",
          ],
          answer: "2",
          yourTurn: {
            question: "Your turn: simplify {{(3a)/10 × 5/a}}.",
            answer: { type: "fraction", n: 3, d: 2, simplest: true, allowDecimal: true },
            solution: "Cancel {{a}} with {{a}}, and 5 with 10 (÷5): {{3/2 × 1/1 = 3/2}}.",
          },
        },
        {
          title: "A letter left over",
          problem: "Simplify {{(x^2)/3 × 6/x}}.",
          steps: [
            "{{x^2}} means {{x × x}}.",
            "Cancel one {{x}} from the top with the {{x}} on the bottom: {{x/3 × 6/1}}.",
            "Cancel 6 with 3: {{x/1 × 2/1 = 2x}}.",
          ],
          answer: "{{2x}}",
        },
        {
          title: "Dividing algebraic fractions",
          problem: "Simplify {{(4p)/9 ÷ (2p)/3}}.",
          steps: [
            "Keep, change, flip: {{(4p)/9 × 3/(2p)}}.",
            "Cancel {{p}} with {{p}}, 4 with 2 (÷2), and 3 with 9 (÷3): {{2/3 × 1/1}}.",
            "Check with {{p = 3}}: {{12/9 ÷ 6/3 = 4/3 × 1/2 = 2/3}}.",
          ],
          answer: "{{2/3}}",
        },
      ],
      keyPoints: [
        "Algebraic fractions follow exactly the same rules as number fractions.",
        "Only cancel factors — things that multiply the whole top and the whole bottom — never terms joined by + or −.",
        "To divide, multiply by the reciprocal, then cancel.",
        "Check by substituting a number for the letter.",
      ],
      whyItWorks:
        "For any non-zero {{x}}, {{x/x = 1}}. So {{(6x)/(3x) = 6/3 × x/x = 2 × 1 = 2}}: cancelling is just spotting a hidden '× 1'. In {{(x + 5)/(x + 7)}} you can't split off an {{x/x}}, because the {{x}} is *added*, not multiplied — which is why nothing cancels.",
      strategies: ["Check by substituting", "Cancel before you multiply", "Make it simpler (try numbers first)"],
      thinkDeeper:
        "Hana says {{(x + 6)/(x + 3) = 2}} 'because 6 ÷ 3 = 2'. Find the one value of {{x}} for which she happens to be right, and explain why she is wrong for every other value.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What does the denominator tell you?", back: "How many equal pieces make one whole — so it fixes the size of each piece." },
      { front: "How do you simplify a fraction fully?", back: "Divide the numerator and denominator by their HCF." },
      { front: "Which is bigger: {{5/8}} or {{3/5}}?", back: "In 40ths: {{25/40 > 24/40}}, so {{5/8 > 3/5}}." },
      { front: "Which is smaller: {{-2/3}} or {{-3/4}}?", back: "{{-3/4}} — it is further left of zero ({{-9/12 < -8/12}})." },
      { front: "{{1/3 + 1/4}} = ?", back: "{{4/12 + 3/12 = 7/12}}. Never add the denominators." },
      { front: "Write {{3 2/5}} as an improper fraction.", back: "{{(3 × 5 + 2)/5 = 17/5}}" },
      { front: "{{4 1/4 - 1 3/4}} = ?", back: "Borrow a whole: {{3 5/4 - 1 3/4 = 2 2/4 = 2 1/2}}." },
      { front: "How do you multiply fractions?", back: "Multiply the tops, multiply the bottoms — cancel common factors first." },
      { front: "What does 'of' mean in '{{2/3}} of {{3/4}}'?", back: "Multiply: {{2/3 × 3/4 = 1/2}}." },
      { front: "Reciprocal of {{2 1/2}}?", back: "{{2 1/2 = 5/2}}, so the reciprocal is {{2/5}}." },
      { front: "How do you divide by a fraction?", back: "Multiply by its reciprocal: Keep, Change, Flip." },
      { front: "{{6 ÷ 2/3}} = ?", back: "{{6 × 3/2 = 9}} — nine lots of {{2/3}} make 6." },
      { front: "Find {{3/8}} of 64.", back: "64 ÷ 8 = 8, then 8 × 3 = 24." },
      { front: "{{2/5}} of a number is 30. What is the number?", back: "{{1/5}} is 15, so the whole is 15 × 5 = 75." },
      { front: "Write 40 cm as a fraction of 1.5 m.", back: "Same units: 1.5 m = 150 cm, so {{40/150 = 4/15}}." },
      { front: "Simplify {{x/2 × 10/x}}.", back: "5 — the {{x}}s cancel and 10 ÷ 2 = 5." },
    ],
    mustKnow: [
      "I can simplify a fraction fully using the HCF.",
      "I can compare and order fractions, including negative fractions, and use =, ≠, <, >, ≤ and ≥ correctly.",
      "I can add and subtract fractions with different denominators.",
      "I can subtract mixed numbers, borrowing a whole when needed, and give the answer as a mixed number in simplest form.",
      "I can multiply fractions, cancelling first, including an integer × a mixed number.",
      "I can find the reciprocal of a whole number, a fraction or a mixed number.",
      "I can divide an integer by a fraction, and a fraction by a fraction.",
      "I can multiply and divide mixed numbers by converting them to improper fractions.",
      "I can estimate the answer to a fraction calculation before working it out.",
      "I can use the order of operations and the laws of arithmetic with fractions.",
      "I can find a fraction of an amount, find the whole from a part, and write one quantity as a fraction of another (even when it is more than 1).",
      "Stretch: I can multiply and divide simple algebraic fractions such as {{x/3 × 6/x}}.",
    ],
    misconceptions: [
      {
        wrong: "{{2/5 + 1/3 = 3/8}} — add the tops and add the bottoms.",
        right: "The denominators name the size of the pieces, so make them equal first: {{6/15 + 5/15 = 11/15}}.",
      },
      {
        wrong: "Multiplying always makes a number bigger.",
        right: "Multiplying a positive number by a fraction less than 1 makes it smaller: {{20 × 3/4 = 15}}.",
      },
      {
        wrong: "Dividing always makes a number smaller.",
        right: "Dividing a positive number by a fraction between 0 and 1 makes it bigger: {{3 ÷ 1/2 = 6}}, because six halves fit into 3.",
      },
      {
        wrong: "{{-3/4}} is bigger than {{-2/3}} because {{3/4 > 2/3}}.",
        right: "For negatives the order flips: {{-3/4}} is further left of zero, so {{-3/4 < -2/3}}.",
      },
      {
        wrong: "To divide fractions, flip the first fraction (or both of them).",
        right: "Only the divisor — the second number — flips: {{2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6}}.",
      },
      {
        wrong: "{{2 1/2 × 3 1/3 = 6 1/6}} — multiply the wholes, then multiply the fractions.",
        right: "Convert to improper fractions first: {{5/2 × 10/3 = 50/6 = 8 1/3}}.",
      },
    ],
    examMistakes: [
      "Adding or subtracting the denominators instead of finding a common denominator.",
      "Subtracting the fraction parts of mixed numbers the wrong way round instead of borrowing a whole: {{3 1/4 - 1 2/3}} is {{1 7/12}}, not {{2 5/12}}.",
      "Flipping the wrong fraction when dividing — only the second one (the divisor) flips.",
      "Not simplifying fully, or leaving an improper fraction when the question asks for a mixed number.",
      "Working out a fraction of the original amount when the question says 'of the remainder'.",
      "Mixing units: 45 minutes as a fraction of 2 hours is {{45/120 = 3/8}}, not {{45/2}}.",
      "Ignoring the order of operations: {{1/2 + 1/3 × 3/4}} is {{3/4}}, not {{5/8}}.",
      "Cancelling terms instead of factors in algebraic fractions: {{(x + 6)/(x + 3)}} does not simplify to 2.",
    ],
    mnemonics: [
      {
        topic: "Dividing fractions",
        device: "Keep, Change, Flip",
        explanation: "Keep the first fraction, Change ÷ to ×, Flip the second fraction (the divisor). Only the second one flips.",
      },
      {
        topic: "Mixed number → improper fraction",
        device: "MAD: Multiply, Add, Denominator stays",
        explanation:
          "For {{3 2/5}}: Multiply the whole number by the denominator (3 × 5 = 15), Add the numerator (15 + 2 = 17), and keep the same Denominator: {{17/5}}.",
      },
      {
        topic: "Ordering negative fractions",
        device: "Mirror at zero",
        explanation:
          "Order the positive versions first, then reflect the list in zero: the biggest positive becomes the smallest negative. {{3/4 > 2/3}}, so {{-3/4 < -2/3}}.",
      },
      {
        topic: "Fractions of amounts",
        device: "'Of' means ×",
        explanation: "Whenever a fraction is followed by 'of', multiply: {{2/3}} of 12 is {{2/3 × 12 = 8}}, and {{1/2}} of {{3/5}} is {{1/2 × 3/5 = 3/10}}.",
      },
    ],
    realWorld: [
      {
        title: "Cooking and baking",
        detail:
          "Scaling a recipe for 4 people to serve 6 means multiplying every amount by {{1 1/2}}: {{2/3}} cup of rice becomes 1 cup, and {{3/4}} cup of coconut milk becomes {{1 1/8}} cups.",
        emoji: "🍳",
      },
      {
        title: "Music",
        detail:
          "Note lengths are fractions of a bar. A bar of {{4/4}} time can hold a minim ({{1/2}}), a crotchet ({{1/4}}) and two quavers ({{1/8}} each), because {{1/2 + 1/4 + 1/8 + 1/8 = 1}}.",
        emoji: "🎵",
      },
      {
        title: "Carpentry and DIY",
        detail: "How many {{3/4}} m shelves can be cut from a {{4 1/2}} m plank? {{4 1/2 ÷ 3/4 = 9/2 × 4/3 = 6}} shelves.",
        emoji: "🔨",
      },
      {
        title: "Sales and discounts",
        detail: "'{{1/3}} off' a $45 pair of shoes saves $15 — you pay {{2/3}} of the price, which is $30.",
        emoji: "🛍️",
      },
      {
        title: "Time",
        detail: "A 45-minute CCA session is {{3/4}} of an hour, so three sessions take {{3 × 3/4 = 2 1/4}} hours.",
        emoji: "⏱️",
      },
      {
        title: "Sport statistics",
        detail:
          "A striker who scores in 7 of her 20 matches has scored in {{7/20}} of them. Fractions with a common denominator let you compare players who have played different numbers of games.",
        emoji: "⚽",
      },
    ],
    videos: [
      {
        title: "Adding and subtracting fractions",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+adding+and+subtracting+fractions",
      },
      {
        title: "Multiplying and dividing fractions",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+multiplying+and+dividing+fractions",
      },
      {
        title: "Why dividing by a fraction means multiplying by its reciprocal",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+dividing+fractions+reciprocal+why",
      },
      {
        title: "Egyptian fractions",
        channel: "Numberphile",
        url: "https://www.youtube.com/results?search_query=numberphile+egyptian+fractions",
      },
    ],
    formulas: [
      { name: "Equivalent fractions", formula: "{{a/b = (a × k)/(b × k)}}", note: "For any k ≠ 0. Dividing top and bottom by their HCF gives the simplest form." },
      { name: "Adding fractions", formula: "{{a/b + c/d = (a d + b c)/(b d)}}", note: "Using the LCM of b and d as the common denominator keeps the numbers smaller." },
      { name: "Multiplying fractions", formula: "{{a/b × c/d = (a c)/(b d)}}", note: "Cancel common factors before multiplying." },
      { name: "Dividing fractions", formula: "{{a/b ÷ c/d = a/b × d/c}}", note: "Keep, Change, Flip — only the divisor flips." },
      { name: "Reciprocal", formula: "{{a/b × b/a = 1}}", note: "The reciprocal of {{a/b}} is {{b/a}}. Zero has no reciprocal." },
      { name: "Mixed number → improper fraction", formula: "{{3 2/5 = (3 × 5 + 2)/5 = 17/5}}", note: "Multiply the whole by the denominator, add the numerator." },
      { name: "Fraction of an amount", formula: "{{a/b}} of N = N ÷ b × a", note: "'Of' means ×." },
      { name: "Whole from a part", formula: "whole = part ÷ {{a/b}} = part × {{b/a}}", note: "Or: find one part (÷ a), then multiply by b." },
    ],
  },
};
