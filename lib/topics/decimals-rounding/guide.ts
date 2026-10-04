import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "decimals-rounding",
  title: "Decimals, Rounding & Estimation",
  strand: "Number",
  icon: "🎯",
  summary: "Know where the point goes, round with purpose, and estimate before you trust any answer.",
  intro:
    "Decimals are place value carried on past the units column: tenths, hundredths, thousandths. In this chapter you'll multiply and divide decimals with confidence, round to exactly the accuracy a problem needs, and estimate fast enough to catch a calculator slip. Along the way you'll find out why {{1/8}} stops after three digits but {{1/7}} goes on for ever.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "multiplying-decimals",
      heading: "Multiplying decimals",
      discovery: {
        problem:
          "Ravi's calculator has a faulty decimal-point key. For 4.6 × 3.2 the screen shows the digits 1472 with no point at all. Is the answer 1.472, 14.72 or 147.2? Find two *different* ways to decide.",
        idea:
          "**Estimate:** 4.6 × 3.2 ≈ 5 × 3 = 15, so it must be 14.72. **Count decimal places:** 46 × 32 = 1472, and the question has 1 + 1 = 2 decimal places, so the answer is 14.72. The two methods agree, and each one checks the other.",
      },
      body:
        "A **decimal place** is a digit after the decimal point: 4.6 has one decimal place (1 d.p.) and 0.08 has two. The most reliable way to multiply decimals is the **integer method**:\n\n" +
        "1. Ignore the decimal points and multiply the whole numbers.\n2. Count the decimal places in the question altogether.\n3. Give the answer that many decimal places.\n4. Check it against an estimate.\n\n" +
        "    0.3 × 0.2  →  3 × 2 = 6  →  1 + 1 = 2 d.p.  →  0.06\n    2.4 × 0.03  →  24 × 3 = 72  →  1 + 2 = 3 d.p.  →  0.072\n    1.25 × 0.8  →  125 × 8 = 1000  →  2 + 1 = 3 d.p.  →  1.000 = 1\n\n" +
        "Look closely at the last one. Place the point *first* (1.000) and only then drop the end zeros. If you tidy the zeros too early, the point lands in the wrong place.\n\n" +
        "**Decimal × whole number** works the same way: 3.45 × 6 → 345 × 6 = 2070 → 2 d.p. → 20.70 = 20.7.\n\n" +
        "The area model in the diagram shows *why* such small pieces appear. 2.3 × 1.4 splits into 2 × 1, 2 × 0.4, 0.3 × 1 and 0.3 × 0.4. The corner piece is tenths times tenths: 12 tiny squares, each worth one hundredth, so it is 0.12, not 1.2.\n\n" +
        "> Multiplying by a number between 0 and 1 makes the answer **smaller**: 8 × 0.4 = 3.2, which is less than 8. Use that as a quick check on every answer.",
      diagram: `<svg viewBox="0 0 420 275" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Area model: a 2.3 by 1.4 rectangle split into 2 by 1, 2 by 0.4, 0.3 by 1 and 0.3 by 0.4 parts on a grid of hundredth squares, giving 2 + 0.8 + 0.3 + 0.12 = 3.22"><rect x="0" y="0" width="420" height="275" fill="#ffffff"/><text x="210" y="22" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">2.3 × 1.4 as an area</text><rect x="70" y="55" width="240" height="120" fill="#c7d2fe"/><rect x="310" y="55" width="36" height="120" fill="#fde68a"/><rect x="70" y="175" width="240" height="48" fill="#bbf7d0"/><rect x="310" y="175" width="36" height="48" fill="#fecaca"/><line x1="82" y1="55" x2="82" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="94" y1="55" x2="94" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="106" y1="55" x2="106" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="118" y1="55" x2="118" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="130" y1="55" x2="130" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="142" y1="55" x2="142" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="154" y1="55" x2="154" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="166" y1="55" x2="166" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="178" y1="55" x2="178" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="190" y1="55" x2="190" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="202" y1="55" x2="202" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="214" y1="55" x2="214" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="226" y1="55" x2="226" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="238" y1="55" x2="238" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="250" y1="55" x2="250" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="262" y1="55" x2="262" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="274" y1="55" x2="274" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="286" y1="55" x2="286" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="298" y1="55" x2="298" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="322" y1="55" x2="322" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="334" y1="55" x2="334" y2="223" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="67" x2="346" y2="67" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="79" x2="346" y2="79" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="91" x2="346" y2="91" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="103" x2="346" y2="103" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="115" x2="346" y2="115" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="127" x2="346" y2="127" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="139" x2="346" y2="139" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="151" x2="346" y2="151" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="163" x2="346" y2="163" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="187" x2="346" y2="187" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="199" x2="346" y2="199" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><line x1="70" y1="211" x2="346" y2="211" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/><rect x="70" y="55" width="276" height="168" fill="none" stroke="#1f2937" stroke-width="1.5"/><line x1="310" y1="55" x2="310" y2="223" stroke="#1f2937" stroke-width="1.5"/><line x1="70" y1="175" x2="346" y2="175" stroke="#1f2937" stroke-width="1.5"/><text x="190" y="46" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">2</text><text x="328" y="46" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">0.3</text><text x="60" y="120" font-family="sans-serif" font-size="14" text-anchor="end" fill="#1f2937" font-weight="bold">1</text><text x="62" y="204" font-family="sans-serif" font-size="13" text-anchor="end" fill="#1f2937" font-weight="bold">0.4</text><text x="190" y="120" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">2 × 1 = 2</text><text x="328" y="119" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.3</text><text x="190" y="204" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">2 × 0.4 = 0.8</text><text x="328" y="203" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937" font-weight="bold">0.12</text><text x="210" y="248" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">2.3 × 1.4 = 2 + 0.8 + 0.3 + 0.12 = 3.22</text><text x="210" y="266" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">Each small square is 0.1 × 0.1 = 0.01</text></svg>`,
      diagramCaption:
        "Area model for 2.3 × 1.4. Each small square is 0.1 × 0.1 = 0.01, so the corner piece 0.3 × 0.4 holds 12 hundredths = 0.12.",
      workedExamples: [
        {
          title: "Decimal × decimal",
          problem: "Work out 0.7 × 0.08.",
          steps: [
            "Estimate: 0.7 is a bit less than 1, so the answer is a bit less than 0.08.",
            "Ignore the points: 7 × 8 = 56.",
            "Count decimal places: 0.7 has 1 and 0.08 has 2, so the answer has 1 + 2 = 3.",
            "56 with 3 decimal places is 0.056, just under 0.08, as the estimate said.",
          ],
          answer: "0.056",
          yourTurn: {
            question: "Your turn: work out 0.6 × 0.09. Give your answer as a decimal.",
            answer: { type: "number", value: 0.054, allowFraction: false },
            solution: "6 × 9 = 54, and there are 1 + 2 = 3 decimal places, so 0.6 × 0.09 = 0.054.",
          },
        },
        {
          title: "Larger numbers",
          problem: "Work out 3.6 × 2.15.",
          steps: [
            "Estimate: 4 × 2 = 8.",
            "Ignore the points: 36 × 215 = 7200 + 540 = 7740.",
            "Decimal places: 1 + 2 = 3, so the answer is 7.740.",
            "Tidy the end zero: 7.74. That is close to the estimate of 8.",
          ],
          answer: "7.74",
        },
        {
          title: "In context",
          problem:
            "Durian costs $13.50 per kg at a stall in Geylang. Hana buys a durian weighing 2.4 kg. How much does she pay?",
          steps: [
            "Estimate: 2.4 × 13.5 ≈ 2.5 × 13 = 32.5, so expect about $32.",
            "Use 13.5 (the end zero of $13.50 doesn't change the value): 24 × 135 = 3240.",
            "Decimal places: 1 + 1 = 2, so 32.40.",
            "Money is written to 2 decimal places, so she pays $32.40.",
          ],
          answer: "$32.40",
        },
      ],
      keyPoints: [
        "Multiply as whole numbers, then give the answer as many decimal places as the question has in total.",
        "Estimate first: it tells you where the point belongs and catches slips.",
        "Place the point before you tidy end zeros: 0.5 × 0.4 → 20 → 0.20 = 0.2.",
        "Multiplying by a number between 0 and 1 makes the answer smaller.",
      ],
      whyItWorks:
        "Write each decimal as a fraction: 4.6 = {{46/10}} and 3.2 = {{32/10}}. Then\n\n    {{4.6 * 3.2 = 46/10 * 32/10 = (46 * 32)/100 = 1472/100 = 14.72}}\n\nEach decimal place is one division by 10. Two numbers with one place each give a division by 10 × 10 = 100, which is two places. The decimal places add because the 10s multiply.",
      strategies: ["Estimate first", "Make it simpler (multiply whole numbers)", "Draw a diagram (area model)"],
      thinkDeeper:
        "Without calculating, decide which is bigger: 0.9 × 0.9 or 0.9? What about 1.1 × 1.1 or 1.1? Find a rule for which positive numbers get *smaller* when you square them, and explain it using the area model.",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "dividing-decimals",
      heading: "Dividing decimals",
      discovery: {
        problem:
          "Siti has 6 m of ribbon for a CCA craft project and cuts it into pieces 0.4 m long. How many pieces does she get? Now work out 60 ÷ 4 and 600 ÷ 40. What do you notice, and why is the answer to 6 ÷ 0.4 *bigger* than 6?",
        idea:
          "All three answers are 15. Division asks *how many 0.4s fit into 6*, and multiplying both numbers by the same amount doesn't change how many times one fits into the other. Small pieces mean lots of pieces, so dividing by a number less than 1 makes the answer bigger.",
      },
      body:
        "Dividing by a decimal is awkward; dividing by a whole number is easy. So **scale** the division: multiply *both* numbers by 10 (or 100, or 1000) until the **divisor** (the number you are dividing by) is a whole number. The answer doesn't change.\n\n" +
        "| Division | Multiply both by | Becomes | Answer |\n|---|---|---|---|\n| 6 ÷ 0.4 | 10 | 60 ÷ 4 | 15 |\n| 2.73 ÷ 0.3 | 10 | 27.3 ÷ 3 | 9.1 |\n| 0.84 ÷ 0.07 | 100 | 84 ÷ 7 | 12 |\n| 4.5 ÷ 0.15 | 100 | 450 ÷ 15 | 30 |\n\n" +
        "Then use **short division** (the bus-stop method). Keep the decimal point in the answer directly above the point in the number being divided, and carry remainders into the next column as usual:\n\n" +
        "    7.36 ÷ 4:\n    7 ÷ 4 = 1 remainder 3  →  write 1, carry 3 to make 33 tenths\n    33 ÷ 4 = 8 remainder 1  →  write 8, carry 1 to make 16 hundredths\n    16 ÷ 4 = 4  →  write 4\n    So 7.36 ÷ 4 = 1.84\n\n" +
        "If the division doesn't finish, write extra zeros after the last decimal digit. They don't change the value: 5.3 ÷ 4 = 5.300 ÷ 4 = 1.325.\n\n" +
        "> Check by multiplying back: 4 × 1.84 = 7.36. Remember that dividing by a number between 0 and 1 gives an answer **bigger** than the number you started with.",
      diagram: `<svg viewBox="0 0 440 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 6 metre ribbon divided into 15 equal pieces of 0.4 metres, with metre marks from 0 to 6"><rect x="0" y="0" width="440" height="150" fill="#ffffff"/><text x="230" y="22" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">6 m of ribbon cut into 0.4 m pieces</text><rect x="40" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="52" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">1</text><rect x="64" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="76" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">2</text><rect x="88" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="100" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">3</text><rect x="112" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="124" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">4</text><rect x="136" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="148" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">5</text><rect x="160" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="172" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">6</text><rect x="184" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="196" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">7</text><rect x="208" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="220" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">8</text><rect x="232" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="244" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">9</text><rect x="256" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="268" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">10</text><rect x="280" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="292" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">11</text><rect x="304" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="316" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">12</text><rect x="328" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="340" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">13</text><rect x="352" y="50" width="24" height="34" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="364" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">14</text><rect x="376" y="50" width="24" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="388" y="71" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">15</text><path d="M40 45 V39 H64 V45" fill="none" stroke="#1f2937" stroke-width="1"/><text x="52" y="34" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.4 m</text><line x1="40" y1="84" x2="40" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0 m</text><line x1="100" y1="84" x2="100" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="100" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">1 m</text><line x1="160" y1="84" x2="160" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="160" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">2 m</text><line x1="220" y1="84" x2="220" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="220" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">3 m</text><line x1="280" y1="84" x2="280" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="280" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">4 m</text><line x1="340" y1="84" x2="340" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="340" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">5 m</text><line x1="400" y1="84" x2="400" y2="93" stroke="#1f2937" stroke-width="1.5"/><text x="400" y="107" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">6 m</text><text x="220" y="134" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">6 ÷ 0.4 = 15 pieces — the same as 60 ÷ 4 = 15</text></svg>`,
      diagramCaption: "6 m of ribbon cut into 0.4 m pieces: exactly 15 pieces fit, so 6 ÷ 0.4 = 15.",
      workedExamples: [
        {
          title: "Make the divisor whole",
          problem: "Work out 2.73 ÷ 0.3.",
          steps: [
            "The divisor 0.3 has one decimal place, so multiply both numbers by 10: 2.73 ÷ 0.3 = 27.3 ÷ 3.",
            "Short division: 27 ÷ 3 = 9, then 3 tenths ÷ 3 = 1 tenth.",
            "So 27.3 ÷ 3 = 9.1.",
            "Check: 0.3 × 9.1 = 2.73.",
          ],
          answer: "9.1",
          yourTurn: {
            question: "Your turn: work out 4.62 ÷ 0.6. Give your answer as a decimal.",
            answer: { type: "number", value: 7.7, allowFraction: false },
            solution:
              "Multiply both by 10: 46.2 ÷ 6. Short division: 46 ÷ 6 = 7 remainder 4, then 42 tenths ÷ 6 = 7 tenths. So the answer is 7.7. Check: 0.6 × 7.7 = 4.62.",
          },
        },
        {
          title: "Two decimal places in the divisor",
          problem: "Work out 0.912 ÷ 0.08.",
          steps: [
            "0.08 has two decimal places, so multiply both numbers by 100: 0.912 ÷ 0.08 = 91.2 ÷ 8.",
            "Short division: 9 ÷ 8 = 1 remainder 1; 11 ÷ 8 = 1 remainder 3; 32 tenths ÷ 8 = 4 tenths.",
            "So 91.2 ÷ 8 = 11.4.",
            "Check: 0.08 × 11.4 = 0.912.",
          ],
          answer: "11.4",
        },
        {
          title: "Price per kilogram",
          problem: "Mei pays $9.45 for a 4.5 kg bag of rice. What is the price per kilogram?",
          steps: [
            "Price per kg = total cost ÷ mass = 9.45 ÷ 4.5.",
            "Multiply both by 10 so the divisor is whole: 94.5 ÷ 45.",
            "45 goes into 94 twice (90) with 4 left over. Carry it to make 45 tenths, and 45 tenths ÷ 45 = 1 tenth.",
            "So 94.5 ÷ 45 = 2.1, which is $2.10 per kg.",
            "Check: 4.5 × 2.1 = 9.45.",
          ],
          answer: "$2.10 per kg",
        },
      ],
      keyPoints: [
        "Multiply both numbers by the same power of 10 to make the divisor whole; the answer doesn't change.",
        "In short division, the point in the answer sits directly above the point in the number being divided.",
        "Add zeros after the last decimal digit if you need to keep dividing: 5.3 = 5.300.",
        "Dividing by a number between 0 and 1 makes the answer bigger.",
      ],
      whyItWorks:
        "A division can be written as a fraction, and multiplying the top and bottom of a fraction by the same number gives an equivalent fraction:\n\n    {{6/0.4 = (6 * 10)/(0.4 * 10) = 60/4 = 15}}\n\nThe ribbon says the same thing in centimetres: 600 cm ÷ 40 cm is still 15 pieces. Changing the unit changes both numbers but not the answer.",
      strategies: ["Make it simpler (scale to a whole-number divisor)", "Check by multiplying back", "Estimate first"],
      thinkDeeper:
        "Without a calculator, put these in order of size: 12 ÷ 0.5, 12 × 0.5, 12 ÷ 0.05, 12 × 2. Two of them are equal. Explain why dividing by 0.5 always gives the same result as multiplying by 2, then find a division that always matches multiplying by 5.",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "decimal-places",
      heading: "Rounding to decimal places",
      discovery: {
        problem:
          "Marcus's stopwatch app records a lap of 10.4973 seconds, but his spreadsheet shows only 2 decimal places. Is 10.4973 closer to 10.49 or to 10.50? Sketch both on a number line. Then round 2.996 to 2 decimal places: is it 2.99, 3.00 or 3?",
        idea:
          "10.4973 lies between 10.49 and 10.50. The halfway point is 10.495, and 10.4973 is past it, so it is nearer **10.50**. You don't need a number line every time: the digit straight after the second decimal place (here 7) tells you which side of halfway you are. For 2.996 that digit is 6, so 2.99 rounds up to **3.00**, and you keep both zeros to show the answer is accurate to 2 d.p.",
      },
      body:
        "To **round** a number is to replace it with the nearest value that has fewer digits. **Rounding to 2 decimal places** (2 d.p.) means finding the nearest hundredth.\n\n" +
        "1. Count the decimal places you need and draw a cut line after them.\n2. Look at the **decider**: the single digit just after the cut.\n3. If the decider is 5, 6, 7, 8 or 9, round **up** by adding 1 to the last digit you keep. If it is 0, 1, 2, 3 or 4, leave the last digit as it is.\n4. Remove every digit after the cut.\n\n" +
        "    7.0649 to the nearest whole number:  7 | 0649, decider 0  →  7\n    7.0649 to 1 d.p.:  7.0 | 649, decider 6  →  7.1\n    7.0649 to 2 d.p.:  7.06 | 49, decider 4  →  7.06\n    7.0649 to 3 d.p.:  7.064 | 9, decider 9  →  7.065\n\n" +
        "**When 9s roll over.** If the digit you round up is a 9, it becomes 0 and you carry 1 into the next column, just like 199 + 1 = 200:\n\n" +
        "    2.996 to 2 d.p.:  2.99 | 6  →  2.99 + 0.01 = 3.00\n    0.0995 to 3 d.p.:  0.099 | 5  →  0.099 + 0.001 = 0.100\n\n" +
        "Keep those zeros. 3.00 says *accurate to the nearest hundredth*; writing 3 throws that information away, and an exam answer of 3 for 2 d.p. loses the mark.\n\n" +
        "**Look at one digit only.** 1.2349 to 2 d.p. is 1.23, because the decider is 4. Rounding in stages (1.2349 → 1.235 → 1.24) is called **double rounding**, and it gives the wrong answer.\n\n" +
        "> Money is normally rounded to 2 d.p., which is the nearest cent.",
      diagram: `<svg viewBox="0 0 440 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 10.49 to 10.50 in steps of 0.001 with the halfway point 10.495 marked; 10.4973 lies past halfway, in the part that rounds up to 10.50"><rect x="0" y="0" width="440" height="150" fill="#ffffff"/><rect x="40" y="72" width="180" height="16" fill="#c7d2fe"/><rect x="220" y="72" width="180" height="16" fill="#bbf7d0"/><line x1="28" y1="80" x2="412" y2="80" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="66" x2="40" y2="94" stroke="#1f2937" stroke-width="1.5"/><line x1="76" y1="74" x2="76" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="112" y1="74" x2="112" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="148" y1="74" x2="148" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="184" y1="74" x2="184" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="256" y1="74" x2="256" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="292" y1="74" x2="292" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="328" y1="74" x2="328" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="364" y1="74" x2="364" y2="86" stroke="#1f2937" stroke-width="1"/><line x1="400" y1="66" x2="400" y2="94" stroke="#1f2937" stroke-width="1.5"/><line x1="220" y1="40" x2="220" y2="96" stroke="#1f2937" stroke-width="1.5" stroke-dasharray="4 3"/><text x="220" y="34" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">halfway</text><text x="40" y="112" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">10.49</text><text x="220" y="112" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">10.495</text><text x="400" y="112" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">10.50</text><line x1="302.8" y1="62" x2="302.8" y2="74" stroke="#1f2937" stroke-width="1"/><circle cx="302.8" cy="80" r="5.5" fill="#1f2937"/><text x="302.8" y="57" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">10.4973</text><text x="130" y="138" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">rounds down to 10.49</text><text x="310" y="138" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">rounds up to 10.50</text></svg>`,
      diagramCaption: "Between 10.49 and 10.50 the halfway point is 10.495. 10.4973 is past halfway, so it rounds to 10.50.",
      workedExamples: [
        {
          title: "Standard rounding",
          problem: "Round 18.4372 to 2 decimal places.",
          steps: [
            "Keep two digits after the point: 18.43 | 72.",
            "The decider is 7, which is 5 or more, so round up.",
            "The last kept digit, 3, becomes 4.",
          ],
          answer: "18.44",
          yourTurn: {
            question: "Your turn: round 6.2851 to 2 decimal places.",
            answer: { type: "number", value: 6.29, allowFraction: false },
            solution: "6.28 | 51: the decider is 5, so round up. 6.28 becomes 6.29.",
          },
        },
        {
          title: "Rolling over 9s",
          problem: "Round 4.9963 to 2 decimal places.",
          steps: [
            "Cut after two decimal places: 4.99 | 63.",
            "The decider is 6, so round up: 4.99 + 0.01.",
            "The 9s roll over: 4.99 + 0.01 = 5.00.",
            "Write both zeros, because the question asked for 2 d.p.",
          ],
          answer: "5.00",
        },
        {
          title: "Sharing a bill",
          problem:
            "Three friends share a $20 bill at a hawker centre equally. How much should each pay, to the nearest cent? Why can't they each pay exactly that?",
          steps: [
            "20 ÷ 3 = 6.6666…, with the 6s going on for ever.",
            "To the nearest cent means 2 d.p.: 6.66 | 66…, decider 6, so round up to 6.67.",
            "But 3 × $6.67 = $20.01, one cent too much. Rounding has created a small error.",
            "In practice two friends pay $6.67 and one pays $6.66: 6.67 + 6.67 + 6.66 = 20.00.",
          ],
          answer: "$6.67 each, to the nearest cent",
        },
      ],
      keyPoints: [
        "d.p. counts the digits after the decimal point.",
        "Look at ONE digit, the decider just after the cut: 5 or more rounds up, 4 or less leaves it.",
        "A 9 that rounds up becomes 0 and carries: 2.996 → 3.00.",
        "Keep the zeros the question asks for: 3.00 to 2 d.p., not 3.",
      ],
      whyItWorks:
        "Rounding to 2 d.p. asks: *which hundredth is nearest?* A number between 10.49 and 10.50 is nearer 10.50 exactly when it is at or past the halfway point 10.495, and that happens exactly when the third decimal digit is 5 or more. So the decider is a shortcut for 'which side of halfway am I?'. A number exactly on halfway, like 10.495, is rounded up by convention.",
      strategies: ["Draw a number line", "Mark the cut, then look at the decider"],
      thinkDeeper:
        "Ethan rounds 1.2349 to 3 d.p. and gets 1.235, then rounds *that* to 2 d.p. and gets 1.24. Rounding 1.2349 straight to 2 d.p. gives 1.23. Which is right? Find another number where rounding in two stages gives a different answer from rounding once. What must its digits look like?",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "significant-figures",
      heading: "Rounding to significant figures",
      discovery: {
        problem:
          "The crowd at the National Stadium was 54 718. A headline says *Crowd of 55 000*. Wei Ling says, '54 718 to 2 significant figures is 55.' Something is wrong with her answer. What? Then try this: what is 0.00456 rounded to 2 significant figures? (Rounding to 2 decimal places gives 0.00, which tells you nothing.)",
        idea:
          "**Significant figures** (s.f.) are counted from the first non-zero digit, the digit that shows how big the number is. 54 718 to 2 s.f. keeps the 5 and the 4, and the next digit, 7, rounds the 4 up: **55 000**. The three zeros are placeholders; without them, 55 would describe a crowd of fifty-five people! For 0.00456 the first significant figure is the 4 in the thousandths column, so 2 s.f. gives **0.0046**.",
      },
      body:
        "The **first significant figure** is the first non-zero digit, reading from the left. It has the biggest place value, so it tells you roughly how big the number is. Count significant figures from there:\n\n" +
        "- 3.07 has **3** s.f.: a zero between non-zero digits counts.\n- 0.0052 has **2** s.f.: the leading zeros only show the size.\n- 3.00, given as a rounded answer, has **3** s.f.: the end zeros show its accuracy.\n- In a rounded whole number like 55 000, the end zeros are usually just placeholders.\n\n" +
        "To round to significant figures:\n\n" +
        "1. Find the first significant figure.\n2. Count along to the number of s.f. you need, and cut.\n3. Use the decider digit exactly as you do for decimal places.\n4. **Keep the size**: in a whole number, fill the places up to the decimal point with zeros.\n\n" +
        "| Number | 1 s.f. | 2 s.f. | 3 s.f. |\n|---|---|---|---|\n| 54 718 | 50 000 | 55 000 | 54 700 |\n| 0.00456 | 0.005 | 0.0046 | 0.00456 |\n| 3.0472 | 3 | 3.0 | 3.05 |\n| 0.070349 | 0.07 | 0.070 | 0.0703 |\n\n" +
        "Look at 3.0 and 0.070 in the 2 s.f. column: the final zero is a significant figure, so it must be written.\n\n" +
        "> Decimal places are counted from the decimal point; significant figures are counted from where the number *starts*. That's why s.f. work for any size of number, from a grain of sand to the population of a country.",
      diagram: `<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Place-value chart. 54 718: the 5 and 4 are the first two significant figures and 7 is the decider. 0.00456: the zeros are not significant, 4 and 5 are the first two significant figures and 6 is the decider"><rect x="0" y="0" width="460" height="230" fill="#ffffff"/><rect x="15" y="20" width="412" height="22" fill="#bae6fd"/><text x="38" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">10 000</text><text x="80" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">1000</text><text x="117" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">100</text><text x="152" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">10</text><text x="186" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">1</text><text x="234" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.1</text><text x="269" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.01</text><text x="307" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.001</text><text x="350" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.0001</text><text x="400" y="36" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0.00001</text><rect x="15" y="46" width="46" height="38" fill="#bbf7d0"/><rect x="61" y="46" width="38" height="38" fill="#bbf7d0"/><rect x="99" y="46" width="36" height="38" fill="#fde68a"/><rect x="15" y="46" width="412" height="38" fill="none" stroke="#334155" stroke-width="1"/><text x="38" y="72" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">5</text><text x="80" y="72" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">4</text><text x="117" y="72" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">7</text><text x="152" y="72" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">1</text><text x="186" y="72" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">8</text><text x="38" y="100" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">1st</text><text x="80" y="100" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">2nd</text><text x="117" y="100" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">decider</text><rect x="287" y="112" width="40" height="38" fill="#bbf7d0"/><rect x="327" y="112" width="46" height="38" fill="#bbf7d0"/><rect x="373" y="112" width="54" height="38" fill="#fde68a"/><rect x="15" y="112" width="412" height="38" fill="none" stroke="#334155" stroke-width="1"/><text x="186" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#94a3b8" font-weight="bold">0</text><text x="210" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">.</text><text x="234" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#94a3b8" font-weight="bold">0</text><text x="269" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#94a3b8" font-weight="bold">0</text><text x="307" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">4</text><text x="350" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">5</text><text x="400" y="138" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937" font-weight="bold">6</text><text x="307" y="166" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">1st</text><text x="350" y="166" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">2nd</text><text x="400" y="166" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">decider</text><line x1="61" y1="20" x2="61" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="61" y1="112" x2="61" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="99" y1="20" x2="99" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="99" y1="112" x2="99" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="135" y1="20" x2="135" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="135" y1="112" x2="135" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="169" y1="20" x2="169" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="169" y1="112" x2="169" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="203" y1="20" x2="203" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="203" y1="112" x2="203" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="217" y1="20" x2="217" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="217" y1="112" x2="217" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="251" y1="20" x2="251" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="251" y1="112" x2="251" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="287" y1="20" x2="287" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="287" y1="112" x2="287" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="327" y1="20" x2="327" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="327" y1="112" x2="327" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="373" y1="20" x2="373" y2="84" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><line x1="373" y1="112" x2="373" y2="150" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/><text x="120" y="194" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">54 718 → 55 000 (2 s.f.)</text><text x="335" y="194" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">0.00456 → 0.0046 (2 s.f.)</text><text x="230" y="218" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">Grey zeros only show the size of the number: they are not significant.</text></svg>`,
      diagramCaption:
        "Significant figures start at the first non-zero digit, wherever it sits. Green: the 2 significant figures kept. Yellow: the decider.",
      workedExamples: [
        {
          title: "A small decimal",
          problem: "Round 0.007382 to 2 significant figures.",
          steps: [
            "The first non-zero digit is 7, in the thousandths column. That's the 1st s.f.",
            "The 2nd s.f. is 3. Cut after it: 0.0073 | 82.",
            "The decider is 8, so round up: the 3 becomes 4.",
            "The leading zeros stay, to keep the size.",
          ],
          answer: "0.0074",
          yourTurn: {
            question: "Your turn: round 0.006271 to 2 significant figures.",
            answer: { type: "number", value: 0.0063, allowFraction: false },
            solution: "The 1st s.f. is 6 and the 2nd is 2: 0.0062 | 71. The decider 7 rounds up, giving 0.0063.",
          },
        },
        {
          title: "A large number: keep the size",
          problem: "Round 48 650 to 2 significant figures.",
          steps: [
            "The 1st s.f. is 4 (ten-thousands) and the 2nd is 8 (thousands). Cut: 48 | 650.",
            "The decider is 6, so round up: 48 becomes 49.",
            "Fill the hundreds, tens and units with zeros so the number stays the same size.",
          ],
          answer: "49 000 (not 49)",
        },
        {
          title: "When 9s roll over",
          problem: "Round 0.0996 to 2 significant figures.",
          steps: [
            "The 1st s.f. is 9 (hundredths) and the 2nd is 9 (thousandths): 0.099 | 6.",
            "The decider is 6, so round up: 0.099 + 0.001 = 0.100.",
            "The number has grown into the next column: its first significant figure is now the 1 in the tenths column.",
            "Two significant figures means the 1 and the 0 after it: 0.10.",
          ],
          answer: "0.10",
        },
      ],
      keyPoints: [
        "The first significant figure is the first non-zero digit from the left.",
        "Leading zeros are not significant, but they must stay: 0.0046, not 46.",
        "Zeros between non-zero digits are significant: 3.07 has 3 s.f.",
        "Big numbers keep their size: 54 718 → 55 000 to 2 s.f., never 55.",
      ],
      whyItWorks:
        "Decimal places use a fixed step (say, the nearest 0.01) whatever the size of the number. That is far too coarse for 0.00456, which becomes 0.00, and far too fussy for 54 718.36. Significant figures start counting where the number actually starts, so 2 s.f. always keeps the two most important digits. The rounding error is at most half a unit of the 2nd figure, while the number itself is at least 10 of those units, so a 2 s.f. answer is never more than 5% out, for any size of number.",
      strategies: ["Underline the first non-zero digit", "Sense-check the size", "Compare with decimal places"],
      thinkDeeper:
        "A length rounds to 0.30 m when rounded to 2 significant figures. What is the smallest it could be? How close to the top end could it get? Why does writing 0.3 m instead of 0.30 m lose information?",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "estimation",
      heading: "Estimation",
      discovery: {
        problem:
          "Arjun types {{(48.7 * 3.1)/0.52}} into his calculator and gets 29.03. In under 30 seconds, and without a calculator, decide whether he is right.",
        idea:
          "Round each number to 1 significant figure: {{(50 * 3)/0.5 = 150/0.5 = 300}}. The answer should be about 300, so 29.03 is roughly 10 times too small. He probably typed 5.2 instead of 0.52. (The true value is 290.3 to 1 d.p.) An estimate won't give you the exact answer, but it catches a slipped decimal point instantly.",
      },
      body:
        "An **estimate** is a quick, approximate answer worked out in your head. The standard method is to **round every number to 1 significant figure**, then calculate. Write ≈ (*is approximately equal to*), not =.\n\n" +
        "    {{(6.12 * 39.6)/0.208 ~= (6 * 40)/0.2 = 240/0.2 = 1200}}\n\n" +
        "Dividing by a decimal comes up a lot when estimating, so think about what it *means*. 240 ÷ 0.2 asks how many fifths fit into 240. There are 5 fifths in every 1, so 240 ÷ 0.2 = 240 × 5 = 1200.\n\n" +
        "| Dividing by… | is the same as… |\n|---|---|\n| 0.5 | × 2 |\n| 0.2 | × 5 |\n| 0.1 | × 10 |\n| 0.01 | × 100 |\n\n" +
        "**Over or under?** If you round numbers *up* in a product, the estimate is too big: an **overestimate**. Rounding *down* gives an **underestimate**. Division is trickier, because rounding the divisor up makes the estimate *smaller*.\n\n" +
        "| You round… | in a × b | in a ÷ b |\n|---|---|---|\n| a up | overestimate | overestimate |\n| b up | overestimate | underestimate |\n| a down | underestimate | underestimate |\n| b down | underestimate | overestimate |\n\n" +
        "If one number goes up and another goes down, you can't tell without more work.\n\n" +
        "**Checking a calculator answer.** Estimate first, then compare. If the calculator answer is about 10, 100 or 1000 times your estimate, a decimal point has slipped or a bracket is missing. Sometimes friendlier numbers beat strict 1 s.f. rounding: for 58.3 ÷ 7.2, use 56 ÷ 7 = 8 rather than 60 ÷ 7.",
      diagram: `<svg viewBox="0 0 440 152" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 400 showing Arjun's answer 29.03 near the left, and the estimate 300 right next to the true value 290.3"><rect x="0" y="0" width="440" height="152" fill="#ffffff"/><text x="220" y="20" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">(48.7 × 3.1) ÷ 0.52 on a number line</text><line x1="25" y1="90" x2="415" y2="90" stroke="#1f2937" stroke-width="1.5"/><line x1="30" y1="83" x2="30" y2="97" stroke="#1f2937" stroke-width="1.5"/><text x="30" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">0</text><line x1="77.5" y1="86" x2="77.5" y2="94" stroke="#1f2937" stroke-width="1"/><line x1="125" y1="83" x2="125" y2="97" stroke="#1f2937" stroke-width="1.5"/><text x="125" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">100</text><line x1="172.5" y1="86" x2="172.5" y2="94" stroke="#1f2937" stroke-width="1"/><line x1="220" y1="83" x2="220" y2="97" stroke="#1f2937" stroke-width="1.5"/><text x="220" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">200</text><line x1="267.5" y1="86" x2="267.5" y2="94" stroke="#1f2937" stroke-width="1"/><line x1="315" y1="83" x2="315" y2="97" stroke="#1f2937" stroke-width="1.5"/><text x="315" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">300</text><line x1="362.5" y1="86" x2="362.5" y2="94" stroke="#1f2937" stroke-width="1"/><line x1="410" y1="83" x2="410" y2="97" stroke="#1f2937" stroke-width="1.5"/><text x="410" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">400</text><path d="M52.6 85 L62.6 95 M52.6 95 L62.6 85" stroke="#b91c1c" stroke-width="2.5"/><line x1="57.6" y1="72" x2="57.6" y2="82" stroke="#1f2937" stroke-width="1"/><text x="57.6" y="66" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#b91c1c" font-weight="bold">Arjun: 29.03</text><line x1="315" y1="50" x2="315" y2="82" stroke="#1f2937" stroke-width="1"/><polygon points="315,82 322,90 315,98 308,90" fill="#fde68a" stroke="#1f2937"/><text x="319" y="46" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937" font-weight="bold">estimate ≈ 300</text><line x1="301.8" y1="70" x2="305.8" y2="84" stroke="#1f2937" stroke-width="1"/><circle cx="305.8" cy="90" r="5" fill="#bbf7d0" stroke="#1f2937"/><text x="297.8" y="68" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">true value 290.3</text><text x="220" y="140" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Arjun's answer is about 10 times too small.</text></svg>`,
      diagramCaption:
        "Arjun's answer, the estimate and the true value on one number line. The estimate lands right next to the true value, while 29.03 is about 10 times too small.",
      workedExamples: [
        {
          title: "Estimate with 1 s.f.",
          problem: "Estimate the value of {{(6.12 * 39.6)/0.208}}.",
          steps: [
            "Round each number to 1 s.f.: 6.12 → 6, 39.6 → 40, 0.208 → 0.2.",
            "Top: 6 × 40 = 240.",
            "Divide: 240 ÷ 0.2 = 240 × 5 = 1200.",
          ],
          answer: "≈ 1200 (the exact value is 1165.2 to 1 d.p.)",
          yourTurn: {
            question: "Your turn: estimate {{(3.87 * 51.2)/0.48}} by rounding each number to 1 significant figure. Give your estimate as a single number.",
            answer: { type: "number", value: 400 },
            solution: "4 × 50 = 200, and 200 ÷ 0.5 = 200 × 2 = 400. (The exact value is 412.8.)",
          },
        },
        {
          title: "Over or under?",
          problem:
            "Wei Ling buys 6 notebooks at $3.85 each and 4 pens at $1.79 each. Estimate the total cost. Will $32 definitely be enough?",
          steps: [
            "Round the prices to 1 s.f.: $3.85 → $4 and $1.79 → $2. The quantities 6 and 4 are exact.",
            "Estimate: 6 × 4 + 4 × 2 = 24 + 8 = $32.",
            "Both prices were rounded *up*, so every item has been over-counted: $32 is an **overestimate**.",
            "So the true total is less than $32, and $32 is enough. (Exact: $23.10 + $7.16 = $30.26.)",
          ],
          answer: "≈ $32, an overestimate, so $32 is enough",
        },
        {
          title: "Catch the calculator slip",
          problem:
            "Zara works out 0.38 × 61.5 on her calculator and writes 233.7. Use an estimate to show she is wrong, then find the correct answer.",
          steps: [
            "Estimate: 0.4 × 60 = 24.",
            "233.7 is about 10 times bigger than 24, so a decimal point has probably slipped.",
            "She most likely typed 3.8 instead of 0.38: 3.8 × 61.5 = 233.7.",
            "Correct answer: 0.38 × 61.5 = 23.37, which is close to the estimate.",
          ],
          answer: "23.37",
        },
      ],
      keyPoints: [
        "Estimate by rounding every number to 1 s.f., and use ≈.",
        "Dividing by 0.5 doubles; dividing by 0.2 multiplies by 5.",
        "Rounding up in a product gives an overestimate; rounding the divisor up gives an underestimate.",
        "If a calculator answer is about 10 times too big or too small, look for a slipped decimal point.",
      ],
      whyItWorks:
        "Rounding to 1 s.f. keeps the **size** of every number (39.6 stays 'about forty', not 'about four') while making the arithmetic easy enough to do in your head. Each rounded number is fairly close to the original, so the estimate lands in the right region. It may be a little out, but it won't be 10 times out, and a factor of 10 is exactly the kind of error a misplaced decimal point causes.",
      strategies: ["Estimate first", "Consider extremes (over or under?)", "Use the inverse to check"],
      thinkDeeper:
        "Estimate 4.8 × 3.2 as 5 × 3 = 15. One number was rounded up and the other down, so is 15 an over- or an underestimate? Sketch a 4.8 by 3.2 rectangle on top of a 5 by 3 rectangle to decide, then check with the exact answer.",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "recurring-decimals",
      heading: "Fractions, decimals & recurring decimals",
      discovery: {
        problem:
          "Use short division to write {{1/8}}, {{1/6}} and {{1/7}} as decimals. One stops, one gets stuck repeating a single digit, and one cycles through six digits. Before dividing, could you have predicted which one would stop?",
        idea:
          "{{1/8}} = 0.125 stops. {{1/6}} = 0.1666… repeats the 6. {{1/7}} = 0.142857142857… cycles through 142857. The test: a fraction in its simplest form gives a decimal that stops exactly when its denominator has no prime factors except 2 and 5. 8 = 2 × 2 × 2 passes; 6 contains a 3 and 7 is itself prime, so those two repeat for ever.",
      },
      body:
        "Dividing the numerator by the denominator always gives one of two kinds of decimal:\n\n" +
        "- A **terminating decimal** stops: {{3/8}} = 0.375.\n- A **recurring decimal** has a digit, or block of digits, that repeats for ever: {{5/6}} = 0.8333…\n\n" +
        "**Dot notation.** A dot above a digit means it recurs. For a repeating block, put a dot above the *first and last* digits of the block. (Some books draw a bar over the whole block instead.)\n\n" +
        "| Decimal | Dot notation | Fraction |\n|---|---|---|\n| 0.333… | 0.3̇ | {{1/3}} |\n| 0.1666… | 0.16̇ | {{1/6}} |\n| 0.272727… | 0.2̇7̇ | {{3/11}} |\n| 0.142857142857… | 0.1̇42857̇ | {{1/7}} |\n\n" +
        "**Which fractions terminate?** Write the fraction in its simplest form, then find the prime factors of the denominator. Only 2s and 5s: it terminates. Any other prime: it recurs.\n\n" +
        "| Fraction | Prime factors of the denominator | Decimal |\n|---|---|---|\n| {{7/20}} | 2 × 2 × 5 | 0.35, terminates |\n| {{5/6}} | 2 × 3 | 0.83̇, recurs |\n| {{4/11}} | 11 | 0.3̇6̇, recurs |\n| {{9/12}} = {{3/4}} | 2 × 2 (after simplifying) | 0.75, terminates |\n\n" +
        "Watch the last row: 12 contains a 3, but {{9/12}} simplifies to {{3/4}}, which terminates. Always simplify first.\n\n" +
        "**Terminating decimal → fraction.** Write the digits over the place value of the last digit, then simplify:\n\n" +
        "    0.45 = {{45/100 = 9/20}}\n    0.375 = {{375/1000 = 3/8}}\n    2.04 = {{2 4/100 = 2 1/25}}\n\n" +
        "**Fraction → decimal.** Divide the numerator by the denominator, or scale to a denominator of 10, 100 or 1000: {{7/25 = 28/100}} = 0.28.",
      diagram: `<svg viewBox="0 0 460 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cycle diagram for 1 divided by 7: remainders 1, 3, 2, 6, 4, 5 sit on a circle and lead back to 1, producing the digits 1, 4, 2, 8, 5, 7 which then repeat; written 0.142857 with dots over the 1 and the 7"><rect x="0" y="0" width="460" height="268" fill="#ffffff"/><circle cx="130" cy="135" r="80" fill="none" stroke="#334155" stroke-width="1.5"/><polygon points="-6,-5 6,0 -6,5" fill="#1f2937" transform="translate(170 65.7) rotate(30)"/><rect x="173" y="32.2" width="20" height="20" fill="#fde68a" stroke="#1f2937" stroke-width="1"/><text x="183" y="47.2" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">1</text><polygon points="-6,-5 6,0 -6,5" fill="#1f2937" transform="translate(210 135) rotate(90)"/><rect x="226" y="124" width="20" height="20" fill="#fde68a" stroke="#1f2937" stroke-width="1"/><text x="236" y="139" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">4</text><polygon points="-6,-5 6,0 -6,5" fill="#1f2937" transform="translate(170 204.3) rotate(150)"/><rect x="173" y="215.8" width="20" height="20" fill="#fde68a" stroke="#1f2937" stroke-width="1"/><text x="183" y="230.8" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">2</text><polygon points="-6,-5 6,0 -6,5" fill="#1f2937" transform="translate(90 204.3) rotate(210)"/><rect x="67" y="215.8" width="20" height="20" fill="#fde68a" stroke="#1f2937" stroke-width="1"/><text x="77" y="230.8" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">8</text><polygon points="-6,-5 6,0 -6,5" fill="#1f2937" transform="translate(50 135) rotate(270)"/><rect x="14" y="124" width="20" height="20" fill="#fde68a" stroke="#1f2937" stroke-width="1"/><text x="24" y="139" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">5</text><polygon points="-6,-5 6,0 -6,5" fill="#1f2937" transform="translate(90 65.7) rotate(330)"/><rect x="67" y="32.2" width="20" height="20" fill="#fde68a" stroke="#1f2937" stroke-width="1"/><text x="77" y="47.2" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">7</text><circle cx="130" cy="55" r="16" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><text x="130" y="60" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">1</text><circle cx="199.3" cy="95" r="16" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><text x="199.3" y="100" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">3</text><circle cx="199.3" cy="175" r="16" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><text x="199.3" y="180" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">2</text><circle cx="130" cy="215" r="16" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><text x="130" y="220" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">6</text><circle cx="60.7" cy="175" r="16" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><text x="60.7" y="180" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">4</text><circle cx="60.7" cy="95" r="16" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><text x="60.7" y="100" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">5</text><text x="130" y="131" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">remainders</text><text x="130" y="147" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">(circles)</text><text x="272" y="34" font-family="sans-serif" font-size="13" text-anchor="start" fill="#1f2937" font-weight="bold">1 ÷ 7 by short division</text><text x="272" y="58" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937">10 ÷ 7 = 1 r 3</text><text x="272" y="76" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937">30 ÷ 7 = 4 r 2</text><text x="272" y="94" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937">20 ÷ 7 = 2 r 6</text><text x="272" y="112" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937">60 ÷ 7 = 8 r 4</text><text x="272" y="130" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937">40 ÷ 7 = 5 r 5</text><text x="272" y="148" font-family="sans-serif" font-size="12" text-anchor="start" fill="#1f2937">50 ÷ 7 = 7 r 1  ← back to 1</text><text x="272" y="180" font-family="sans-serif" font-size="11" text-anchor="start" fill="#1f2937">Digits: 142857142857…</text><text x="272" y="222" font-family="sans-serif" font-size="16" text-anchor="start" fill="#1f2937">1 ÷ 7 =</text><text x="350" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">0</text><text x="359" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">.</text><text x="369" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">1</text><text x="381" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">4</text><text x="393" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">2</text><text x="405" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">8</text><text x="417" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">5</text><text x="429" y="222" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#1f2937">7</text><circle cx="369" cy="202" r="2.2" fill="#1f2937"/><circle cx="429" cy="202" r="2.2" fill="#1f2937"/><text x="272" y="244" font-family="sans-serif" font-size="11" text-anchor="start" fill="#1f2937">dots mark the first and last</text><text x="272" y="258" font-family="sans-serif" font-size="11" text-anchor="start" fill="#1f2937">digits of the repeating block</text></svg>`,
      diagramCaption:
        "Dividing 1 by 7: the remainders (blue circles) cycle 1 → 3 → 2 → 6 → 4 → 5 → 1, producing the digits 1, 4, 2, 8, 5, 7 on the way round. Once a remainder repeats, the digits must repeat too.",
      workedExamples: [
        {
          title: "Terminating decimal to fraction",
          problem: "Write 0.65 as a fraction in its simplest form.",
          steps: [
            "The last digit, 5, is in the hundredths column, so 0.65 = {{65/100}}.",
            "The HCF of 65 and 100 is 5.",
            "{{65/100 = 13/20}}.",
          ],
          answer: "{{13/20}}",
          yourTurn: {
            question: "Your turn: write 0.85 as a fraction in its simplest form.",
            answer: { type: "fraction", n: 17, d: 20, simplest: true },
            solution: "0.85 = {{85/100}}. Divide the top and bottom by 5 to get {{17/20}}.",
          },
        },
        {
          title: "Fraction to recurring decimal",
          problem: "Write {{5/12}} as a decimal, using dot notation.",
          steps: [
            "12 doesn't go into 5, so write 0 and a decimal point, and work with 50 tenths.",
            "50 ÷ 12 = 4 remainder 2, so the first digit is 4.",
            "20 ÷ 12 = 1 remainder 8, so the next digit is 1.",
            "80 ÷ 12 = 6 remainder 8, so the next digit is 6. The remainder 8 has come back, so the 6 repeats for ever.",
            "{{5/12}} = 0.41666… = 0.416̇.",
          ],
          answer: "0.416̇",
        },
        {
          title: "Stretch: recurring decimal to fraction",
          problem: "Write 0.2̇7̇ as a fraction in its simplest form.",
          steps: [
            "Let x = 0.272727…",
            "The repeating block has 2 digits, so multiply by 100: 100x = 27.272727…",
            "Subtract to cancel the endless tail: 100x − x = 27.2727… − 0.2727… = 27.",
            "So 99x = 27 and x = {{27/99}}.",
            "Simplify by dividing by the HCF, 9: x = {{3/11}}.",
          ],
          answer: "{{3/11}}",
        },
      ],
      keyPoints: [
        "Terminating means it stops; recurring means it repeats for ever. Every fraction is one or the other.",
        "Dots mark the first and last digits of the repeating block: 0.1̇42857̇.",
        "In simplest form, a fraction terminates exactly when its denominator's only prime factors are 2 and 5.",
        "Terminating decimal → fraction: write it over 10, 100, 1000 … then simplify.",
      ],
      whyItWorks:
        "A terminating decimal is a fraction over 10, 100, 1000 …, and 10 = 2 × 5. You can turn a denominator into a power of 10 only if it is built from 2s and 5s: {{3/8 = (3 * 125)/(8 * 125) = 375/1000}} = 0.375. A factor of 3 or 7 can never be part of a power of 10, so those divisions never finish. And they *must* repeat: dividing by 7 can only leave a remainder of 1, 2, 3, 4, 5 or 6. With only six options, a remainder must come back within six steps, and from then on the digits cycle.",
      strategies: ["Factorise the denominator", "Find a pattern (watch the remainders)", "Simplify first"],
      thinkDeeper:
        "{{1/7}} = 0.1̇42857̇. Without dividing, write {{2/7}} and {{3/7}} as decimals. (Look at the diagram: where on the circle do the remainders 2 and 3 appear?) Why do all the sevenths use the same six digits in the same order?",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "ordering-and-shortcuts",
      heading: "Ordering decimals & clever calculation",
      discovery: {
        problem:
          "**Puzzle 1:** Put these in order, smallest first: −0.35, 0.305, −0.4, −0.355, 0.3\n\n**Puzzle 2:** Work out 4.7 × 9.9 in your head in under 15 seconds.",
        idea:
          "**Puzzle 1:** On a number line, further left means smaller. −0.4 is further from zero than −0.355, which is further than −0.35, so the order is −0.4, −0.355, −0.35, 0.3, 0.305. **Puzzle 2:** 9.9 is 10 − 0.1, so 4.7 × 9.9 = 4.7 × 10 − 4.7 × 0.1 = 47 − 0.47 = 46.53. Rewriting a number to make it friendly is the heart of clever calculation.",
      },
      body:
        "**Ordering positive decimals.** Line the numbers up by their decimal points and pad with zeros so they all have the same number of decimal places. Then compare column by column from the left, exactly as you would with whole numbers.\n\n" +
        "| Number | Padded | Order |\n|---|---|---|\n| 0.7 | 0.700 | largest |\n| 0.68 | 0.680 | middle |\n| 0.609 | 0.609 | smallest |\n\n" +
        "A longer decimal is **not** automatically bigger: 0.609 has more digits but fewer tenths.\n\n" +
        "**Ordering negative decimals.** On a number line, numbers get smaller as you go left. A negative number with a *bigger size* is further left, so it is *smaller*: −0.4 < −0.355 < −0.35. Compare the sizes, then reverse the order for the negatives.\n\n" +
        "**The laws of arithmetic** let you rearrange a calculation into an easier one with the same answer:\n\n" +
        "| Law | In symbols | Example |\n|---|---|---|\n| Commutative (order can swap) | {{a * b = b * a}} | 0.25 × 7.3 × 4 = 0.25 × 4 × 7.3 |\n| Associative (grouping can change) | {{(a * b) * c = a * (b * c)}} | (0.25 × 4) × 7.3 = 1 × 7.3 = 7.3 |\n| Distributive (multiply each part) | {{a(b - c) = ab - ac}} | 4.7 × 9.9 = 47 − 0.47 = 46.53 |\n| Distributive in reverse | {{ab + ac = a(b + c)}} | 3.6 × 7.2 + 3.6 × 2.8 = 3.6 × 10 = 36 |\n\n" +
        "For adding, **round and compensate**: 6.98 + 3.47 = 7 + 3.47 − 0.02 = 10.45.\n\n" +
        "> Friendly pairs to look for: 0.25 × 4 = 1, 0.5 × 2 = 1, 0.2 × 5 = 1, 0.125 × 8 = 1.",
      diagram: `<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 4.7 by 10 rectangle with a thin 4.7 by 0.1 strip at the right edge marked to be removed, leaving 4.7 by 9.9: 47 minus 0.47 equals 46.53"><rect x="0" y="0" width="460" height="230" fill="#ffffff"/><line x1="50" y1="32" x2="350" y2="32" stroke="#1f2937" stroke-width="1"/><line x1="50" y1="27" x2="50" y2="37" stroke="#1f2937" stroke-width="1"/><line x1="350" y1="27" x2="350" y2="37" stroke="#1f2937" stroke-width="1"/><text x="200" y="24" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">10</text><rect x="50" y="45" width="297" height="141" fill="#c7d2fe"/><rect x="347" y="45" width="3" height="141" fill="#ef4444"/><rect x="50" y="45" width="300" height="141" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="42" y="120" font-family="sans-serif" font-size="13" text-anchor="end" fill="#1f2937" font-weight="bold">4.7</text><text x="198" y="108" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">4.7 × 10 = 47</text><text x="198" y="132" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">minus the strip: 47 − 0.47 = 46.53</text><line x1="50" y1="200" x2="347" y2="200" stroke="#1f2937" stroke-width="1"/><line x1="50" y1="195" x2="50" y2="205" stroke="#1f2937" stroke-width="1"/><line x1="347" y1="195" x2="347" y2="205" stroke="#1f2937" stroke-width="1"/><text x="198" y="218" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">9.9</text><line x1="352" y1="116" x2="372" y2="116" stroke="#b91c1c" stroke-width="1.5"/><text x="376" y="100" font-family="sans-serif" font-size="11" text-anchor="start" fill="#b91c1c">strip 0.1 wide:</text><text x="376" y="120" font-family="sans-serif" font-size="12" text-anchor="start" fill="#b91c1c">4.7 × 0.1</text><text x="376" y="138" font-family="sans-serif" font-size="12" text-anchor="start" fill="#b91c1c">= 0.47</text></svg>`,
      diagramCaption:
        "A 4.7 by 9.9 rectangle is a 4.7 by 10 rectangle with a thin 4.7 by 0.1 strip cut off: 47 − 0.47 = 46.53.",
      workedExamples: [
        {
          title: "Multiply by 9.9",
          problem: "Work out 6.3 × 9.9 without a calculator.",
          steps: [
            "Write 9.9 as 10 − 0.1, so 6.3 × 9.9 = 6.3 × 10 − 6.3 × 0.1.",
            "6.3 × 10 = 63 and 6.3 × 0.1 = 0.63.",
            "63 − 0.63 = 62.37.",
          ],
          answer: "62.37",
          yourTurn: {
            question: "Your turn: work out 5.8 × 9.9 without a calculator.",
            answer: { type: "number", value: 57.42, allowFraction: false },
            solution: "5.8 × 10 − 5.8 × 0.1 = 58 − 0.58 = 57.42.",
          },
        },
        {
          title: "Ordering with negatives",
          problem: "Write in order, smallest first: −1.2, −1.25, −1.205, 0.12, −0.125",
          steps: [
            "The only positive number is 0.12, so it is the largest.",
            "Pad the sizes of the negatives to 3 d.p.: 1.200, 1.250, 1.205, 0.125.",
            "In order of size, biggest first: 1.250, 1.205, 1.200, 0.125.",
            "For negatives, the biggest size is the smallest number, so −1.25 comes first.",
          ],
          answer: "−1.25, −1.205, −1.2, −0.125, 0.12",
        },
        {
          title: "Combine the laws",
          problem: "Work out 1.7 × 4.6 + 1.7 × 5.4 − 0.25 × 6.8 × 4 without a calculator.",
          steps: [
            "The first two terms share a factor of 1.7: 1.7 × (4.6 + 5.4) = 1.7 × 10 = 17.",
            "Regroup the last term: 0.25 × 4 = 1, so 0.25 × 6.8 × 4 = 6.8.",
            "17 − 6.8 = 10.2.",
          ],
          answer: "10.2",
        },
      ],
      keyPoints: [
        "Order decimals by place value, not by length: pad with zeros and compare from the left.",
        "For negatives, the bigger the size, the smaller the number: −0.4 < −0.35.",
        "The distributive law {{a(b - c) = ab - ac}} turns × 9.9 into × 10 minus × 0.1.",
        "Regroup to make friendly pairs: 0.25 × 4 = 1, 0.5 × 2 = 1, 0.2 × 5 = 1.",
      ],
      whyItWorks:
        "The distributive law is really about area. In the diagram, a 4.7 by 9.9 rectangle is a 4.7 by 10 rectangle with a thin 4.7 by 0.1 strip removed, so two easy areas (47 and 0.47) replace one hard one. Ordering by columns works because each column is worth ten times the one to its right: the first column where two decimals differ decides which is bigger, and nothing further right can catch up.",
      strategies: ["Draw a number line", "Use the laws of arithmetic", "Round and compensate"],
      thinkDeeper:
        "Find 0.99 × 0.99 by writing it as 0.99 × (1 − 0.01). Then, without calculating, predict 0.999 × 0.999. What pattern do you see, and can you explain it?",
    },
    // ------------------------------------------------------------------ 8 (stretch)
    {
      id: "error-intervals",
      heading: "Error intervals",
      discovery: {
        problem:
          "Jun's height is recorded as 1.6 m, rounded to 1 decimal place. Could he really be 1.64 m? 1.65 m? 1.55 m? 1.549 m? Find the full range of heights that would be recorded as 1.6 m.",
        idea:
          "1.64 and 1.55 both round to 1.6, but 1.65 rounds to 1.7 and 1.549 rounds to 1.5. The cut-offs are halfway to the neighbouring values 1.5 and 1.7, so the range is {{1.55 <= h < 1.65}}: 1.55 is included, 1.65 is not.",
      },
      body:
        "**Stretch:** Once a measurement has been rounded, its exact value is lost, but we can say exactly which values it *could* have been. That range is called the **error interval**, and it is written with inequalities:\n\n" +
        "    lower bound ≤ x < upper bound\n\n" +
        "- The **lower bound** is the smallest value that rounds to the given value. It *is* included, so use ≤.\n- The **upper bound** is where values start rounding to the next value up. It is *not* included, so use <.\n- Both bounds are **half a unit** away from the rounded value, where the unit is what you rounded to: 0.1 for 1 d.p., 10 for the nearest 10, and so on.\n\n" +
        "| Measurement | Rounded to | Half a unit | Error interval |\n|---|---|---|---|\n| h = 1.6 m | 1 d.p. | 0.05 | {{1.55 <= h < 1.65}} |\n| m = 340 g | nearest 10 g | 5 | {{335 <= m < 345}} |\n| t = 7.25 s | 2 d.p. | 0.005 | {{7.245 <= t < 7.255}} |\n| d = 0.040 km | 2 s.f. (nearest 0.001) | 0.0005 | {{0.0395 <= d < 0.0405}} |\n\n" +
        "**Truncation** means chopping off digits without rounding; some calculators and computer programs do this. If x truncated to 1 d.p. is 4.7, then x could be anything from 4.7 up to, but not including, 4.8: {{4.7 <= x < 4.8}}. A truncation interval is a whole unit wide and starts at the value shown.",
      diagram: `<svg viewBox="0 0 440 165" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 1.5 to 1.7 in steps of 0.01. The interval from 1.55 (filled circle, included) to 1.65 (open circle, not included) is shaded: every value in it rounds to 1.6"><rect x="0" y="0" width="440" height="165" fill="#ffffff"/><text x="220" y="24" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">Heights recorded as 1.6 m (to 1 decimal place)</text><rect x="130" y="74" width="180" height="12" fill="#c7d2fe"/><line x1="25" y1="80" x2="415" y2="80" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="68" x2="40" y2="92" stroke="#1f2937" stroke-width="1.5"/><line x1="58" y1="75" x2="58" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="76" y1="75" x2="76" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="94" y1="75" x2="94" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="112" y1="75" x2="112" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="130" y1="71" x2="130" y2="89" stroke="#1f2937" stroke-width="1"/><line x1="148" y1="75" x2="148" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="166" y1="75" x2="166" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="184" y1="75" x2="184" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="202" y1="75" x2="202" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="220" y1="68" x2="220" y2="92" stroke="#1f2937" stroke-width="1.5"/><line x1="238" y1="75" x2="238" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="256" y1="75" x2="256" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="274" y1="75" x2="274" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="292" y1="75" x2="292" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="310" y1="71" x2="310" y2="89" stroke="#1f2937" stroke-width="1"/><line x1="328" y1="75" x2="328" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="346" y1="75" x2="346" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="364" y1="75" x2="364" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="382" y1="75" x2="382" y2="85" stroke="#1f2937" stroke-width="1" stroke-opacity="0.7"/><line x1="400" y1="68" x2="400" y2="92" stroke="#1f2937" stroke-width="1.5"/><circle cx="130.00000000000009" cy="80" r="6" fill="#1f2937"/><circle cx="309.99999999999983" cy="80" r="6" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><text x="130" y="58" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">1.55 (included)</text><text x="310" y="58" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">1.65 (not included)</text><text x="40" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">1.5</text><text x="220" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">1.6</text><text x="400" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">1.7</text><text x="85" y="130" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">rounds to 1.5</text><text x="220" y="130" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">rounds to 1.6</text><text x="355" y="130" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">rounds to 1.7</text><text x="220" y="154" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">1.55 ≤ h &lt; 1.65</text></svg>`,
      diagramCaption:
        "Every height from 1.55 m up to (but not including) 1.65 m rounds to 1.6 m. Filled circle: included. Open circle: not included.",
      workedExamples: [
        {
          title: "Rounded to 1 d.p.",
          problem: "A bag of rice has a mass of 5.2 kg, correct to 1 decimal place. Write down the error interval for its mass, m kg.",
          steps: [
            "Correct to 1 d.p. means to the nearest 0.1 kg. Half of 0.1 is 0.05.",
            "Lower bound: 5.2 − 0.05 = 5.15.",
            "Upper bound: 5.2 + 0.05 = 5.25. It is not included, because 5.25 would round to 5.3.",
          ],
          answer: "{{5.15 <= m < 5.25}}",
          yourTurn: {
            question:
              "Your turn: a pencil is 14.3 cm long, correct to 1 decimal place. Give the lower bound and then the upper bound of its length, in cm.",
            answer: { type: "list", values: [14.25, 14.35], ordered: true, display: "14.25 cm and 14.35 cm" },
            solution:
              "Half of 0.1 is 0.05, so the bounds are 14.3 − 0.05 = 14.25 and 14.3 + 0.05 = 14.35. For a length of x cm, the error interval is {{14.25 <= x < 14.35}}.",
          },
        },
        {
          title: "Truncation",
          problem: "A calculator truncates answers to 2 decimal places and shows 3.14. Write the error interval for the full answer, x.",
          steps: [
            "Truncating chops digits off, so the full answer started 3.14…",
            "The smallest possibility is 3.14 itself, and anything up to 3.1499… also shows as 3.14.",
            "3.15 would show as 3.15, so it is not included.",
          ],
          answer: "{{3.14 <= x < 3.15}}",
        },
        {
          title: "Bounds in a calculation",
          problem: "A square tile has sides of 8 cm, measured to the nearest centimetre. Find the error interval for its perimeter, P cm.",
          steps: [
            "Side s: half of 1 cm is 0.5 cm, so {{7.5 <= s < 8.5}}.",
            "Perimeter = 4 × side. Smallest possible: 4 × 7.5 = 30.",
            "The perimeter gets as close as you like to 4 × 8.5 = 34, but never reaches it.",
          ],
          answer: "{{30 <= P < 34}}",
        },
      ],
      keyPoints: [
        "An error interval is written lower bound ≤ x < upper bound.",
        "For a rounded value, the bounds are half a unit either side of it.",
        "The lower bound is included (≤); the upper bound is not (<), because it rounds up to the next value.",
        "For a truncated value, the interval runs from the value shown up to one whole unit above it.",
      ],
      whyItWorks:
        "Rounding to the nearest 0.1 sends every number to its closest tenth. The cut-off points between 1.5, 1.6 and 1.7 are the halfway points 1.55 and 1.65. Halfway rounds up, so 1.55 joins 1.6 (included) but 1.65 joins 1.7 (not included). There is no 'largest number below 1.65' (1.649, 1.6499, 1.64999 … keep getting closer), which is why the upper end is written with < rather than a last value.",
      strategies: ["Draw a number line", "Find the halfway points", "Consider extremes"],
      thinkDeeper:
        "A number rounds to 7 to the nearest whole number, but truncates to 6. Find its error interval. Draw both intervals on one number line to see where they overlap.",
    },
  ],
  learn: {
    flashcards: [
      { front: "0.3 × 0.2 = ?", back: "0.06. 3 × 2 = 6, then 1 + 1 = 2 decimal places." },
      { front: "6 ÷ 0.4 = ?", back: "15. Multiply both by 10: 60 ÷ 4 = 15." },
      { front: "Why does dividing by 0.5 double a number?", back: "There are two halves in every 1, so n ÷ 0.5 = 2n." },
      { front: "What is the decider digit?", back: "The digit just after the last one you keep. 5 or more rounds up; 4 or less leaves it." },
      { front: "Round 2.996 to 2 d.p.", back: "3.00. The 9s roll over, and both zeros must be written." },
      { front: "What is the first significant figure?", back: "The first non-zero digit, reading from the left." },
      { front: "Round 0.00456 to 2 s.f.", back: "0.0046" },
      { front: "Round 54 718 to 2 s.f.", back: "55 000. Placeholder zeros keep the size." },
      { front: "How many significant figures does 3.07 have?", back: "3. A zero between non-zero digits counts." },
      { front: "Estimate {{(48.7 * 3.1)/0.52}}", back: "{{(50 * 3)/0.5 = 300}}" },
      { front: "Which fractions give terminating decimals?", back: "In simplest form, those whose denominator has no prime factors except 2 and 5." },
      { front: "{{1/6}} in dot notation", back: "0.16̇ (only the 6 repeats)" },
      { front: "0.375 as a fraction", back: "{{375/1000 = 3/8}}" },
      { front: "Which is smaller: −0.4 or −0.35?", back: "−0.4. It is further left on the number line." },
      { front: "4.7 × 9.9 quickly", back: "4.7 × 10 − 4.7 × 0.1 = 47 − 0.47 = 46.53" },
      { front: "Error interval for h = 1.6 m (1 d.p.)", back: "{{1.55 <= h < 1.65}}" },
    ],
    mustKnow: [
      "I can multiply decimals by whole numbers and by decimals, estimating first.",
      "I can divide by a decimal by scaling to a whole-number divisor.",
      "I can round to any number of decimal places, including when 9s roll over.",
      "I can round to significant figures, keeping placeholder zeros.",
      "I can estimate a calculation by rounding to 1 s.f. and say whether it's an over- or underestimate.",
      "I can use an estimate to spot a wrong calculator answer.",
      "I can convert between fractions and terminating decimals.",
      "I can write recurring decimals in dot notation and predict which fractions recur.",
      "I can order positive and negative decimals.",
      "I can use the laws of arithmetic to simplify calculations such as 4.7 × 9.9.",
      "I can write an error interval for a rounded or truncated value (stretch).",
    ],
    misconceptions: [
      {
        wrong: "0.3 × 0.2 = 0.6",
        right: "Each number has 1 d.p., so the answer has 2: 3 × 2 = 6 → 0.06. (Tenths of tenths are hundredths.)",
      },
      {
        wrong: "Multiplying always makes a number bigger, and dividing always makes it smaller.",
        right: "Multiplying by a number between 0 and 1 makes it smaller (8 × 0.5 = 4); dividing by one makes it bigger (8 ÷ 0.5 = 16).",
      },
      {
        wrong: "0.609 is bigger than 0.7 because it has more digits.",
        right: "Compare place by place: 0.700 > 0.609, because 7 tenths beats 6 tenths. Length doesn't tell you size.",
      },
      {
        wrong: "54 718 to 2 s.f. is 55.",
        right: "It is 55 000. Placeholder zeros keep the number the right size.",
      },
      {
        wrong: "Zeros are never significant.",
        right: "Leading zeros (0.00…) aren't, but zeros between non-zero digits (3.07) and end zeros in a rounded decimal (3.00) are.",
      },
      {
        wrong: "−0.4 is bigger than −0.35 because 0.4 is bigger than 0.35.",
        right: "−0.4 is further left on the number line, so −0.4 < −0.35.",
      },
    ],
    examMistakes: [
      "Writing 3 instead of 3.00 when the question asks for 2 decimal places.",
      "Losing the size when rounding a large number: 48 650 to 2 s.f. is 49 000, not 49.",
      "Counting the leading zeros of 0.00456 as significant figures.",
      "Scaling only one number when dividing: 6 ÷ 0.4 is 60 ÷ 4, not 6 ÷ 4.",
      "Rounding in stages (double rounding) instead of rounding the original number once.",
      "Deciding a fraction recurs before simplifying it: {{9/12 = 3/4}}, which terminates.",
      "Placing the decimal point without an estimate check and ending up 10 times too big or too small.",
      "Using ≤ at both ends of an error interval; the upper bound needs <.",
    ],
    mnemonics: [
      {
        topic: "Rounding up or down",
        device: "Five or more? Raise the score. Four or less? Let it rest.",
        explanation: "Look only at the decider digit. 5 to 9 means add 1 to the last kept digit; 0 to 4 means leave it alone.",
      },
      {
        topic: "Multiplying decimals",
        device: "Places in = places out",
        explanation: "Count the decimal places in the question altogether; the answer has the same number. Place the point before you tidy any end zeros.",
      },
      {
        topic: "Dividing by a decimal",
        device: "Shift both, then divide",
        explanation: "Move the decimal point the same number of places in BOTH numbers until the divisor is whole: 2.73 ÷ 0.3 → 27.3 ÷ 3.",
      },
      {
        topic: "Terminating decimals",
        device: "Only 2s and 5s make it stop",
        explanation: "In simplest form, a denominator built only from 2s and 5s gives a terminating decimal; any other prime factor makes it recur.",
      },
    ],
    realWorld: [
      {
        title: "Shopping estimates",
        detail: "Rounding each price up to 1 s.f. gives an overestimate of your bill, a safe way to check you have enough money before you reach the checkout.",
        emoji: "🛒",
      },
      {
        title: "GST to the cent",
        detail: "GST in Singapore is 9%, so a $12.99 item costs 12.99 × 1.09 = $14.1591 with GST. Shops round that to the nearest cent: $14.16.",
        emoji: "🧾",
      },
      {
        title: "Race timing",
        detail: "Sprint times are measured to thousandths of a second but published to hundredths, and athletics rules round *up* to the next hundredth: 10.491 s is posted as 10.50 s.",
        emoji: "🏃",
      },
      {
        title: "Medicine doses",
        detail: "Nurses and pharmacists double-check decimal points, because 0.5 ml written as 5 ml would be ten times the dose. A quick estimate is a real safety check.",
        emoji: "💊",
      },
      {
        title: "Monsoon rainfall",
        detail: "Rain gauges report rainfall to 1 d.p. in millimetres. A reading of 42.6 mm means the true amount lies between 42.55 mm and 42.65 mm.",
        emoji: "🌧️",
      },
      {
        title: "Science measurements",
        detail: "Scientists give results to a sensible number of significant figures. Writing 30.0 g instead of 30 g claims the scales are accurate to the nearest 0.1 g.",
        emoji: "🔬",
      },
    ],
    videos: [
      { title: "Multiplying decimals", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+multiplying+decimals" },
      { title: "Rounding to significant figures", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+significant+figures" },
      { title: "Estimation", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+estimation" },
      { title: "142857: the cyclic number", channel: "Numberphile", url: "https://www.youtube.com/results?search_query=numberphile+142857" },
    ],
    formulas: [
      { name: "Multiplying decimals", formula: "{{0.3 * 0.2 = (3 * 2)/100 = 0.06}}", note: "Decimal places in the answer = total decimal places in the question." },
      { name: "Dividing by a decimal", formula: "{{6/0.4 = 60/4 = 15}}", note: "Multiply both numbers by the same power of 10 until the divisor is whole." },
      { name: "Rounding rule", formula: "Decider 0–4: leave it · Decider 5–9: round up", note: "The decider is the digit just after the last one you keep." },
      { name: "Estimating", formula: "{{(48.7 * 3.1)/0.52 ~= (50 * 3)/0.5 = 300}}", note: "Round every number to 1 significant figure first." },
      { name: "Terminating test", formula: "{{a/b}} terminates exactly when {{b = 2^m * 5^n}}", note: "With {{a/b}} in simplest form; m and n are whole numbers (0 allowed)." },
      { name: "The × 9.9 shortcut", formula: "{{a * 9.9 = 10a - 0.1a}}", note: "For example 4.7 × 9.9 = 47 − 0.47 = 46.53." },
      { name: "Error interval (stretch)", formula: "{{r - h <= x < r + h}}", note: "r is the rounded value and h is half the rounding unit. For truncation: r ≤ x < r + one unit." },
      { name: "Recurring decimal → fraction (stretch)", formula: "{{100x - x = 99x}}", note: "For a 2-digit repeating block, multiply by 100 and subtract to cancel the endless tail." },
    ],
  },
};
