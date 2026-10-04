import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "ratio-proportion",
  title: "Ratio & Proportion",
  strand: "Ratio & Proportion",
  icon: "⚖️",
  summary: "Compare, share and scale — the maths of recipes, maps and money.",
  intro:
    "A ratio compares quantities; proportion is what happens when you scale them up or down while keeping that comparison fixed. One idea runs through this whole chapter: find the value of one part (or one unit), then multiply. Master it and you can split a bill fairly, spot the best buy, change dollars into ringgit and read any map.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "ratio-basics",
      heading: "Ratio notation & simplifying",
      discovery: {
        problem:
          "Priya mixes 12 ml of blue paint with 18 ml of yellow to make a green. Marcus mixes 10 ml of blue with 15 ml of yellow. Ethan mixes 14 ml of blue with 20 ml of yellow. Exactly two of them get the same shade. Which two — and how can you be sure without mixing any paint?",
        idea:
          "The shade depends only on the *comparison* blue : yellow, not on the amounts. Divide each pair by its highest common factor: 12 : 18 = 2 : 3 and 10 : 15 = 2 : 3, but 14 : 20 = 7 : 10. Priya and Marcus both use 2 parts blue for every 3 parts yellow, so their greens match. Writing a ratio in its **simplest form** is how you spot equal ratios.",
      },
      body:
        "A **ratio** compares two or more quantities of the same kind. The ratio of blue paint to yellow paint is written **blue : yellow** and read 'blue to yellow'. **Order matters**: 2 : 3 is not the same as 3 : 2.\n\nTwo ratios are **equivalent** if you can multiply (or divide) every part of one by the same number to get the other — exactly like equivalent fractions. So 2 : 3, 4 : 6, 10 : 15 and 12 : 18 all describe the same mix. A ratio is in **simplest form** when its parts are whole numbers with no common factor except 1. To simplify, divide every part by the **highest common factor (HCF)**:\n\n    12 : 18   (÷ 6)   →   2 : 3\n    24 : 36 : 60   (÷ 12)   →   2 : 3 : 5\n\n**Three tidy-up rules before you simplify:**\n- **Same units.** 50 cm : 2 m is *not* 50 : 2. Convert first: 50 cm : 200 cm = 1 : 4. Once the units match, drop them — a simplified ratio has no units.\n- **No decimals.** Multiply every part by 10 (or 100): 1.5 : 2.5 = 15 : 25 = 3 : 5.\n- **No fractions.** Multiply every part by the LCM of the denominators: {{1/2}} : {{2/3}} — multiply by 6 — gives 3 : 4.\n\n**The form 1 : n.** Sometimes you want the first part to be exactly 1, so the ratio reads 'for every 1 of this, there are n of that'. Divide *both* parts by the first part: 4 : 18 = 1 : 4.5. Here n can be a decimal — that is expected, not an error. (For the form n : 1, divide both parts by the second part.) Writing ratios as 1 : n is the fairest way to compare them.\n\n**Stretch — combining ratios.** If a : b = 2 : 3 and b : c = 4 : 5, make the shared quantity b match. The LCM of 3 and 4 is 12, so a : b = 8 : 12 and b : c = 12 : 15, giving a : b : c = 8 : 12 : 15.",
      diagram: `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twelve blue and eighteen yellow counters arranged as six identical groups, each holding 2 blue and 3 yellow counters"><rect x="0" y="0" width="420" height="220" fill="#ffffff"/><text x="210" y="22" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 blue : 18 yellow counters</text><rect x="15" y="35" width="120" height="50" rx="8" fill="none" stroke="#334155" stroke-dasharray="4 3"/><rect x="150" y="35" width="120" height="50" rx="8" fill="none" stroke="#334155" stroke-dasharray="4 3"/><rect x="285" y="35" width="120" height="50" rx="8" fill="none" stroke="#334155" stroke-dasharray="4 3"/><rect x="15" y="100" width="120" height="50" rx="8" fill="none" stroke="#334155" stroke-dasharray="4 3"/><rect x="150" y="100" width="120" height="50" rx="8" fill="none" stroke="#334155" stroke-dasharray="4 3"/><rect x="285" y="100" width="120" height="50" rx="8" fill="none" stroke="#334155" stroke-dasharray="4 3"/><g stroke="#334155" stroke-width="1.2"><circle cx="31" cy="60" r="9" fill="#bae6fd"/><circle cx="53" cy="60" r="9" fill="#bae6fd"/><circle cx="75" cy="60" r="9" fill="#fde68a"/><circle cx="97" cy="60" r="9" fill="#fde68a"/><circle cx="119" cy="60" r="9" fill="#fde68a"/><circle cx="166" cy="60" r="9" fill="#bae6fd"/><circle cx="188" cy="60" r="9" fill="#bae6fd"/><circle cx="210" cy="60" r="9" fill="#fde68a"/><circle cx="232" cy="60" r="9" fill="#fde68a"/><circle cx="254" cy="60" r="9" fill="#fde68a"/><circle cx="301" cy="60" r="9" fill="#bae6fd"/><circle cx="323" cy="60" r="9" fill="#bae6fd"/><circle cx="345" cy="60" r="9" fill="#fde68a"/><circle cx="367" cy="60" r="9" fill="#fde68a"/><circle cx="389" cy="60" r="9" fill="#fde68a"/><circle cx="31" cy="125" r="9" fill="#bae6fd"/><circle cx="53" cy="125" r="9" fill="#bae6fd"/><circle cx="75" cy="125" r="9" fill="#fde68a"/><circle cx="97" cy="125" r="9" fill="#fde68a"/><circle cx="119" cy="125" r="9" fill="#fde68a"/><circle cx="166" cy="125" r="9" fill="#bae6fd"/><circle cx="188" cy="125" r="9" fill="#bae6fd"/><circle cx="210" cy="125" r="9" fill="#fde68a"/><circle cx="232" cy="125" r="9" fill="#fde68a"/><circle cx="254" cy="125" r="9" fill="#fde68a"/><circle cx="301" cy="125" r="9" fill="#bae6fd"/><circle cx="323" cy="125" r="9" fill="#bae6fd"/><circle cx="345" cy="125" r="9" fill="#fde68a"/><circle cx="367" cy="125" r="9" fill="#fde68a"/><circle cx="389" cy="125" r="9" fill="#fde68a"/></g><text x="210" y="180" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 equal groups, each with 2 blue and 3 yellow</text><text x="210" y="204" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">12 : 18 = 2 : 3 (divide both parts by 6)</text></svg>`,
      diagramCaption:
        "Twelve blue and eighteen yellow counters fall into 6 identical groups of 2 blue and 3 yellow — so 12 : 18 = 2 : 3.",
      workedExamples: [
        {
          title: "Mixed units",
          problem: "Write 45 cm : 1.2 m as a ratio in its simplest form.",
          steps: [
            "Make the units the same: 1.2 m = 120 cm.",
            "The ratio is 45 : 120 — the units match, so drop them.",
            "The HCF of 45 and 120 is 15.",
            "45 ÷ 15 = 3 and 120 ÷ 15 = 8.",
          ],
          answer: "3 : 8",
          yourTurn: {
            question: "Your turn: write 40 cm : 1.5 m as a ratio in its simplest form.",
            answer: { type: "ratio", parts: [4, 15], simplest: true },
            solution: "1.5 m = 150 cm, so the ratio is 40 : 150. Divide both parts by the HCF, 10, to get 4 : 15.",
          },
        },
        {
          title: "Decimals and fractions",
          problem: "Simplify (a) 0.6 : 1.5 (b) {{3/4}} : {{5/6}}.",
          steps: [
            "(a) Multiply both parts by 10 to clear the decimals: 6 : 15.",
            "Divide both parts by 3: 2 : 5.",
            "(b) The LCM of 4 and 6 is 12, so multiply both parts by 12.",
            "{{3/4 * 12 = 9}} and {{5/6 * 12 = 10}}, giving 9 : 10.",
          ],
          answer: "(a) 2 : 5 (b) 9 : 10",
        },
        {
          title: "Use 1 : n to compare",
          problem:
            "Cordial A is mixed with water in the ratio 3 : 20. Cordial B is mixed in the ratio 5 : 32. Which drink is stronger (less water for each part of cordial)?",
          steps: [
            "Write both in the form 1 : n by dividing both parts by the first part.",
            "A: 3 : 20 = 1 : 6.67 (to 2 d.p.).",
            "B: 5 : 32 = 1 : 6.4.",
            "B has less water for every 1 part of cordial, so B is stronger.",
          ],
          answer: "Cordial B is stronger (1 : 6.4 compared with about 1 : 6.67).",
        },
      ],
      keyPoints: [
        "Order matters: boys : girls = 3 : 4 means 3 boys for every 4 girls, not the other way round.",
        "Simplify by dividing every part by the HCF; the parts must stay whole numbers.",
        "Same units first, then drop them; clear decimals (× 10) and fractions (× the LCM of the denominators).",
        "For the form 1 : n, divide both parts by the first part — n may be a decimal.",
      ],
      whyItWorks:
        "A ratio describes a recipe of identical groups. Twelve blue and eighteen yellow counters can be arranged into 6 groups of 2 blue + 3 yellow (see the diagram). Dividing both parts by 6 simply describes one group, so nothing about the mix changes. Multiplying or dividing every part by the same number never changes the comparison — but *adding* the same number does: add 1 to both parts of 1 : 2 and you get 2 : 3, a different mix.",
      strategies: ["Divide by the HCF", "Convert to the same units first", "Use the form 1 : n to compare"],
      thinkDeeper:
        "Simplifying 12 : 18 gives 2 : 3. Is a : b ever equivalent to (a + 1) : (b + 1)? Try lots of pairs. Find exactly when adding the same number to both parts keeps the ratio the same, and explain why.",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "sharing-in-a-ratio",
      heading: "Sharing in a ratio",
      discovery: {
        problem:
          "Siti and Jun run a stall at the school carnival. They agree to split the $72 profit in the ratio 5 : 3, because Siti worked more hours. Jun says, 'Easy — Siti gets $5 and I get $3.' Siti says, 'No — work out 72 ÷ 5 and 72 ÷ 3.' Both are wrong. How much should each of them really get?",
        idea:
          "Think of the money as **equal parts**. The ratio 5 : 3 means 5 parts for Siti and 3 for Jun — 8 equal parts in total. One part is $72 ÷ 8 = $9, so Siti gets 5 × $9 = $45 and Jun gets 3 × $9 = $27. Check: $45 + $27 = $72. The key move is always the same: **find the value of one part**.",
      },
      body:
        "Sharing in a ratio is a three-step routine. Draw a **bar model** — a bar split into equal boxes, one box for each part — and the steps almost do themselves.\n\n1. **Count the parts.** For 5 : 3 there are 5 + 3 = 8 parts.\n2. **Find one part.** Divide the total by the number of parts.\n3. **Build each share.** Multiply one part by each number in the ratio.\n\nAlways check that the shares add back up to the total.\n\n**Three-part ratios** work in exactly the same way. Share 180 g in the ratio 2 : 3 : 4: there are 9 parts, one part is 180 ÷ 9 = 20 g, so the shares are 40 g, 60 g and 80 g.\n\n**Not given the total?** Many questions give you a different clue. Match the clue to the right number of boxes in the bar model:\n\n| You are told… | It equals… | Example with ratio 5 : 3 |\n|---|---|---|\n| the total | all the parts (5 + 3 = 8) | total $72, so 8 parts = $72 |\n| one person's share | that person's parts | Jun gets $27, so 3 parts = $27 |\n| the difference | the difference in parts (5 − 3 = 2) | Siti gets $18 more, so 2 parts = $18 |\n\nWhichever clue you get, divide to find one part — $9 every time here — then build whatever the question asks for.",
      diagram: `<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model: Siti has 5 boxes and Jun has 3 boxes, each box worth 9 dollars; the 8 boxes total 72 dollars and the difference is 2 boxes"><rect x="0" y="0" width="460" height="200" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937"><text x="60" y="53" font-size="13" text-anchor="end">Siti</text><text x="60" y="113" font-size="13" text-anchor="end">Jun</text></g><g stroke="#334155" stroke-width="1.2"><rect x="70" y="30" width="50" height="36" fill="#c7d2fe"/><rect x="120" y="30" width="50" height="36" fill="#c7d2fe"/><rect x="170" y="30" width="50" height="36" fill="#c7d2fe"/><rect x="220" y="30" width="50" height="36" fill="#c7d2fe"/><rect x="270" y="30" width="50" height="36" fill="#c7d2fe"/><rect x="70" y="90" width="50" height="36" fill="#fde68a"/><rect x="120" y="90" width="50" height="36" fill="#fde68a"/><rect x="170" y="90" width="50" height="36" fill="#fde68a"/></g><rect x="220" y="90" width="100" height="36" fill="none" stroke="#334155" stroke-dasharray="4 3"/><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937"><text x="95" y="53">$9</text><text x="145" y="53">$9</text><text x="195" y="53">$9</text><text x="245" y="53">$9</text><text x="295" y="53">$9</text><text x="95" y="113">$9</text><text x="145" y="113">$9</text><text x="195" y="113">$9</text><text x="270" y="105" font-size="11">difference</text><text x="270" y="119" font-size="11">= 2 parts</text></g><path d="M330 30 L338 30 L338 126 L330 126 M338 78 L344 78" fill="none" stroke="#334155" stroke-width="1.5"/><text x="348" y="82" font-size="13" font-family="sans-serif" fill="#1f2937">8 parts = $72</text><text x="230" y="160" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 part = $72 ÷ 8 = $9</text><text x="135" y="185" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Siti: 5 × $9 = $45</text><text x="325" y="185" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Jun: 3 × $9 = $27</text></svg>`,
      diagramCaption:
        "Bar model for sharing $72 in the ratio 5 : 3. Eight equal boxes make $72, so each box is $9. The dashed gap shows the difference between the shares: 2 boxes, or $18.",
      workedExamples: [
        {
          title: "A three-part ratio",
          problem: "Aisha, Ravi and Mei share 84 stickers in the ratio 2 : 5 : 7. How many stickers does each person get?",
          steps: [
            "Total parts: 2 + 5 + 7 = 14.",
            "One part: 84 ÷ 14 = 6 stickers.",
            "Aisha: 2 × 6 = 12. Ravi: 5 × 6 = 30. Mei: 7 × 6 = 42.",
            "Check: 12 + 30 + 42 = 84 ✓",
          ],
          answer: "Aisha 12, Ravi 30, Mei 42",
          yourTurn: {
            question:
              "Your turn: share $120 between Hana, Arjun and Zara in the ratio 3 : 4 : 5. Give the three amounts in the order Hana, Arjun, Zara.",
            answer: { type: "list", values: [30, 40, 50], ordered: true, display: "$30, $40, $50" },
            solution: "3 + 4 + 5 = 12 parts. One part = $120 ÷ 12 = $10. Hana 3 × $10 = $30, Arjun $40, Zara $50.",
          },
        },
        {
          title: "Given one share",
          problem: "Red and green beads are in the ratio 4 : 7. There are 28 red beads. How many beads are there altogether?",
          steps: [
            "Red is 4 parts, so 4 parts = 28.",
            "One part = 28 ÷ 4 = 7 beads.",
            "Altogether there are 4 + 7 = 11 parts = 11 × 7 = 77 beads.",
          ],
          answer: "77 beads",
        },
        {
          title: "Given the difference",
          problem:
            "Wei Ling and Marcus collect cans for recycling in the ratio 7 : 4. Wei Ling collects 45 more cans than Marcus. How many cans do they collect in total?",
          steps: [
            "The difference is 7 − 4 = 3 parts.",
            "3 parts = 45 cans, so one part = 15 cans.",
            "Total = 7 + 4 = 11 parts = 11 × 15 = 165 cans.",
            "Check: Wei Ling 105, Marcus 60, and 105 − 60 = 45 ✓",
          ],
          answer: "165 cans",
        },
      ],
      keyPoints: [
        "One part = the amount you know ÷ the number of parts it stands for.",
        "Total → add the parts. One share → that share's parts. Difference → subtract the parts.",
        "Multiply one part by each number in the ratio to build the shares.",
        "Check that the shares add back to the total and are in the right order.",
      ],
      whyItWorks:
        "The ratio 5 : 3 says the money is cut into equal-sized pieces: 5 for one person and 3 for the other. Every share is a whole number of these identical pieces, so once you know the size of one piece, every share — and the total, and the difference — is just a multiple of it. That is why the bar model works for *any* clue: each clue is simply some number of boxes.",
      strategies: ["Use a bar model", "Find one part first", "Check by adding the shares"],
      thinkDeeper:
        "Two friends share some money in the ratio 3 : 5. Then each of them is given an extra $10, and the ratio of their money becomes 2 : 3. How much money did they share at the start? (Try calling one part x, or try small cases.)",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "ratios-and-fractions",
      heading: "Ratios and fractions",
      discovery: {
        problem:
          "In a Year 8 class the ratio of boys to girls is 2 : 3. Zara says, '{{2/3}} of the class are boys.' Hana says, 'No — {{2/5}} of the class are boys.' Test it with a class of 30 students. Who is right, and what does {{2/3}} actually describe?",
        idea:
          "Hana is right. A class of 30 is 5 parts of 6, so there are 12 boys and 18 girls. Boys are 12 out of 30 = {{2/5}} of the class. Zara's {{2/3}} compares boys with *girls*: there are {{2/3}} as many boys as girls (12 is {{2/3}} of 18). A ratio compares **part with part**; a fraction of the total compares **part with whole**.",
      },
      body:
        "A ratio a : b splits a whole into a + b equal parts. That gives two different kinds of fraction, and mixing them up is the most common ratio mistake.\n\n| For boys : girls = 2 : 3 | Fraction |\n|---|---|\n| Boys as a fraction of the class (part of whole) | {{2/(2+3) = 2/5}} |\n| Girls as a fraction of the class | {{3/5}} |\n| Boys compared with girls (part to part) | {{2/3}} — there are {{2/3}} as many boys as girls |\n| Girls compared with boys | {{3/2}} — there are {{1 1/2}} times as many girls as boys |\n\nIn general, if A : B = a : b, then:\n- A is {{a/(a+b)}} of the total and B is {{b/(a+b)}} of the total;\n- A is {{a/b}} of B, and B is {{b/a}} times A.\n\n**Fraction → ratio.** To go the other way, find *the rest*. If {{3/8}} of the drinks sold at a hawker stall are kopi, then {{5/8}} are not, so kopi : other drinks = 3 : 5. If 'A is {{3/4}} of B', then for every 4 of B there are 3 of A, so A : B = 3 : 4.\n\nThe part-of-whole fractions always add up to 1: {{2/5 + 3/5 = 1}}. That makes a quick check.",
      diagram: `<svg viewBox="0 0 440 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar of 5 equal parts: 2 parts are boys and 3 parts are girls, so boys are two fifths and girls are three fifths of the class"><rect x="0" y="0" width="440" height="205" fill="#ffffff"/><text x="220" y="26" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">whole class = 5 equal parts</text><path d="M45 50 L45 42 L395 42 L395 50 M220 42 L220 34" fill="none" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="1.2"><rect x="45" y="58" width="70" height="44" fill="#c7d2fe"/><rect x="115" y="58" width="70" height="44" fill="#c7d2fe"/><rect x="185" y="58" width="70" height="44" fill="#fde68a"/><rect x="255" y="58" width="70" height="44" fill="#fde68a"/><rect x="325" y="58" width="70" height="44" fill="#fde68a"/></g><g font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937"><text x="80" y="85">boy</text><text x="150" y="85">boy</text><text x="220" y="85">girl</text><text x="290" y="85">girl</text><text x="360" y="85">girl</text></g><path d="M47 110 L47 118 L183 118 L183 110 M115 118 L115 124 M187 110 L187 118 L393 118 L393 110 M290 118 L290 124" fill="none" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937"><text x="115" y="142">boys</text><text x="115" y="162">2</text><text x="115" y="185">5</text><text x="290" y="142">girls</text><text x="290" y="162">3</text><text x="290" y="185">5</text></g><path d="M106 168 L124 168 M281 168 L299 168" stroke="#1f2937" stroke-width="1.5"/><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="132" y="172">of the class</text><text x="307" y="172">of the class</text></g></svg>`,
      diagramCaption:
        "Boys : girls = 2 : 3. The whole class is 5 equal parts, so boys are {{2/5}} of the class and girls are {{3/5}} — not {{2/3}}.",
      workedExamples: [
        {
          title: "Ratio to fraction",
          problem: "Mangoes and durians in a fruit box are in the ratio 7 : 2. What fraction of the fruit are durians?",
          steps: ["Total parts: 7 + 2 = 9.", "Durians are 2 of those 9 equal parts.", "So the fraction is {{2/9}}."],
          answer: "{{2/9}}",
          yourTurn: {
            question:
              "Your turn: red and blue pens in a box are in the ratio 5 : 3. What fraction of the pens are red? Give your answer in its simplest form.",
            answer: { type: "fraction", n: 5, d: 8, simplest: true },
            solution: "5 + 3 = 8 parts and red is 5 of them, so red pens are {{5/8}} of the box.",
          },
        },
        {
          title: "Fraction to ratio",
          problem:
            "{{3/8}} of the students in a CCA are in Year 8 and the rest are in Year 7. Write the ratio Year 8 : Year 7. If the CCA has 40 students, how many are in Year 7?",
          steps: [
            "The rest is {{1 - 3/8 = 5/8}}.",
            "So Year 8 : Year 7 = 3 : 5.",
            "Year 7 students: {{5/8}} of 40 = 40 ÷ 8 × 5 = 25.",
          ],
          answer: "3 : 5, and 25 Year 7 students",
        },
        {
          title: "'A is a fraction of B'",
          problem: "Ethan's height is {{4/5}} of his father's height. Their heights add up to 324 cm. How tall is Ethan?",
          steps: [
            "'{{4/5}} of his father's height' means Ethan : father = 4 : 5.",
            "Total: 4 + 5 = 9 parts = 324 cm, so one part = 36 cm.",
            "Ethan = 4 × 36 = 144 cm (and his father is 5 × 36 = 180 cm).",
            "Check: {{4/5}} of 180 = 144 ✓",
          ],
          answer: "144 cm",
        },
      ],
      keyPoints: [
        "If A : B = a : b, then A is {{a/(a+b)}} of the total — add the parts to get the denominator.",
        "Part-to-part ({{a/b}}) and part-of-whole ({{a/(a+b)}}) are different fractions; read the question carefully.",
        "'A is {{3/4}} of B' means A : B = 3 : 4.",
        "The part-of-whole fractions always add up to 1.",
      ],
      whyItWorks:
        "A ratio a : b cuts the whole into a + b equal parts, and A owns a of them. 'a out of a + b equal parts' is exactly what the fraction {{a/(a+b)}} means. Comparing A with B directly ignores the whole, which is why it gives {{a/b}} instead.",
      strategies: ["Draw a bar model", "Test with a convenient total", "Find the rest (1 minus the fraction)"],
      thinkDeeper:
        "In a jar, the ratio of red sweets to blue sweets is 3 : 5. Mei adds 6 more red sweets, and now exactly half of the sweets are red. How many sweets were in the jar at the start? Explain how you know.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "direct-proportion",
      heading: "Direct proportion & best buys",
      discovery: {
        problem:
          "3 cups of bubble tea cost $10.50. How much do 7 cups cost? Find TWO different ways. Then decide which is better value: 3 cups for $10.50, or a party pack of 8 cups for $27.20?",
        idea:
          "Find the cost of **one** cup first: $10.50 ÷ 3 = $3.50, so 7 cups cost 7 × $3.50 = $24.50. That is the **unitary method**. (Another way: 6 cups cost 2 × $10.50 = $21, and one more cup makes $24.50.) For value, compare like with like: the party pack costs $27.20 ÷ 8 = $3.40 per cup, which beats $3.50 — so the party pack is better value, as long as you really want 8 cups.",
      },
      body:
        "Two quantities are in **direct proportion** if they change by the same multiplier: double one and the other doubles; divide one by 3 and the other is divided by 3. Cups of bubble tea and their cost, litres of petrol and the price, a recipe's ingredients and the number of people it serves are all directly proportional.\n\n**The unitary method** ('unit' means one) works for every direct proportion problem:\n\n    3 cups  →  $10.50\n    1 cup   →  $10.50 ÷ 3 = $3.50\n    7 cups  →  7 × $3.50 = $24.50\n\nWhen the numbers are friendly, **scaling** can be quicker: 3 cups cost $10.50, so 6 cups cost $21 and 9 cups cost $31.50.\n\n**Spotting direct proportion.** In a table, y ÷ x is the same every time. This constant is the **multiplier** (or rate), usually called k. On a graph, the points lie on a **straight line through the origin**, because 0 cups cost $0.\n\n| Cups (x) | 1 | 2 | 3 | 7 |\n|---|---|---|---|---|\n| Cost in $ (y) | 3.50 | 7.00 | 10.50 | 24.50 |\n| y ÷ x | 3.50 | 3.50 | 3.50 | 3.50 |\n\nSo {{y = 3.5x}}. Add a fixed $4 delivery fee and the cost is *no longer* directly proportional: 0 cups would still cost $4, so the line misses the origin, and 2 cups ($11) do not cost twice as much as 1 cup ($7.50).\n\n**Best buys.** To compare packs of different sizes, work out a **unit price** — the cost of one item, 1 kg or 100 g — and choose the lowest. Or work out how much you get **per dollar** and choose the highest. Either way, compare like with like.",
      diagram: `<svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of cost against number of cups. Cost equals 3.5 times cups is a straight line through the origin. A dashed line with a 4 dollar delivery fee starts at 4 dollars and is not proportional."><rect x="0" y="0" width="460" height="320" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="50" y1="230" x2="410" y2="230"/><line x1="50" y1="190" x2="410" y2="190"/><line x1="50" y1="150" x2="410" y2="150"/><line x1="50" y1="110" x2="410" y2="110"/><line x1="50" y1="70" x2="410" y2="70"/><line x1="50" y1="30" x2="410" y2="30"/></g><g stroke="#1f2937" stroke-width="1.5"><line x1="50" y1="270" x2="415" y2="270"/><line x1="50" y1="270" x2="50" y2="25"/></g><g stroke="#1f2937" stroke-width="1"><line x1="95" y1="270" x2="95" y2="275"/><line x1="140" y1="270" x2="140" y2="275"/><line x1="185" y1="270" x2="185" y2="275"/><line x1="230" y1="270" x2="230" y2="275"/><line x1="275" y1="270" x2="275" y2="275"/><line x1="320" y1="270" x2="320" y2="275"/><line x1="365" y1="270" x2="365" y2="275"/><line x1="410" y1="270" x2="410" y2="275"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="50" y="287">0</text><text x="95" y="287">1</text><text x="140" y="287">2</text><text x="185" y="287">3</text><text x="230" y="287">4</text><text x="275" y="287">5</text><text x="320" y="287">6</text><text x="365" y="287">7</text><text x="410" y="287">8</text><text x="230" y="308" font-size="12">number of cups (x)</text><text x="50" y="16" font-size="12">cost in $ (y)</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="274">0</text><text x="44" y="234">5</text><text x="44" y="194">10</text><text x="44" y="154">15</text><text x="44" y="114">20</text><text x="44" y="74">25</text><text x="44" y="34">30</text></g><line x1="50" y1="270" x2="410" y2="46" stroke="#334155" stroke-width="2.5"/><line x1="50" y1="238" x2="365" y2="42" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6 4"/><g fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"><circle cx="95" cy="242" r="4"/><circle cx="140" cy="214" r="4"/><circle cx="185" cy="186" r="4"/><circle cx="230" cy="158" r="4"/><circle cx="275" cy="130" r="4"/><circle cx="320" cy="102" r="4"/><circle cx="365" cy="74" r="4"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937"><text x="192" y="200">(3, 10.50)</text><text x="375" y="88">(7, 24.50)</text></g><line x1="235" y1="215" x2="260" y2="215" stroke="#334155" stroke-width="2.5"/><line x1="235" y1="238" x2="260" y2="238" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6 4"/><g font-family="sans-serif" font-size="11" fill="#1f2937"><text x="266" y="219">proportional: y = 3.5x</text><text x="266" y="242">$4 delivery: not proportional</text></g></svg>`,
      diagramCaption:
        "Cost of bubble tea: the points lie on a straight line through the origin, so cost is directly proportional to the number of cups. Adding a fixed $4 delivery fee lifts the line off the origin — no longer proportional.",
      workedExamples: [
        {
          title: "Unitary method",
          problem: "5 kg of rice costs $8.50. How much do 3 kg of the same rice cost?",
          steps: ["Find one unit: 1 kg costs $8.50 ÷ 5 = $1.70.", "Scale up: 3 kg cost 3 × $1.70 = $5.10."],
          answer: "$5.10",
          yourTurn: {
            question: "Your turn: 4 notebooks cost $7.80. How much do 9 of the same notebooks cost? Give your answer in dollars.",
            answer: { type: "number", value: 17.55, display: "$17.55" },
            solution: "One notebook costs $7.80 ÷ 4 = $1.95, so 9 notebooks cost 9 × $1.95 = $17.55.",
          },
        },
        {
          title: "Best buy",
          problem:
            "The same yoghurt is sold in three sizes. Small: 150 g for $1.20. Medium: 500 g for $3.75. Large: 1 kg for $7.90. Which is the best buy?",
          steps: [
            "Compare the price per 100 g.",
            "Small: 150 g is 1.5 lots of 100 g, so $1.20 ÷ 1.5 = $0.80 per 100 g.",
            "Medium: 500 g is 5 lots of 100 g, so $3.75 ÷ 5 = $0.75 per 100 g.",
            "Large: 1 kg = 1000 g is 10 lots of 100 g, so $7.90 ÷ 10 = $0.79 per 100 g.",
            "The lowest unit price is $0.75 per 100 g.",
          ],
          answer: "The medium 500 g pot ($0.75 per 100 g) — the biggest pack is not always the best buy.",
        },
        {
          title: "Is it proportional?",
          problem:
            "A plumber charges $60 for 1 hour, $100 for 2 hours and $140 for 3 hours. Is the charge directly proportional to the time?",
          steps: [
            "Test charge ÷ hours: 60 ÷ 1 = 60, 100 ÷ 2 = 50, 140 ÷ 3 ≈ 46.67.",
            "The ratio is not constant, so this is not direct proportion.",
            "Another check: doubling the time from 1 hour to 2 hours does not double the charge ($100, not $120).",
            "In fact the charge is $20 + $40 per hour: a fixed $20 call-out fee, so the graph would not pass through the origin.",
          ],
          answer: "No — the charge per hour is not constant, because of a fixed $20 call-out fee.",
        },
      ],
      keyPoints: [
        "Direct proportion: y ÷ x is constant, so {{y = kx}} and the graph is a straight line through the origin.",
        "Unitary method: find the value of ONE, then multiply.",
        "Best buy: compare the price per unit (lowest wins) or the amount per dollar (highest wins).",
        "A fixed charge (delivery, call-out, booking fee) breaks direct proportion.",
      ],
      whyItWorks:
        "'Directly proportional' means every unit is worth the same amount — each cup costs exactly $3.50. So the cost of any number of cups is (number of cups) × (cost of one cup), which is {{y = kx}}. Because each extra cup adds the same $3.50, the graph climbs in equal steps (a straight line), and because 0 cups cost $0, the line starts at the origin.",
      strategies: ["Find one unit first (unitary method)", "Scale by a friendly factor", "Compare like with like"],
      thinkDeeper:
        "A 2 kg bag of flour costs $3.90 and a 5 kg bag costs $9.40. Show that the 5 kg bag is better value. Then: what price would make the 5 kg bag exactly the same value as the 2 kg bag? And describe a situation where buying the better-value bag is still the worse choice.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "recipes-and-currency",
      heading: "Recipes & currency conversion",
      discovery: {
        problem:
          "A mango lassi recipe for 4 people uses 2 mangoes, 500 ml of yoghurt, 200 ml of milk and 40 g of sugar. Mei is making lassi for 6 people. Jun says, '6 is 2 more than 4, so just add 2 to every amount.' What would Jun's lassi be like — and what should Mei use instead?",
        idea:
          "Jun's lassi would have **twice** as much mango (4 instead of 2) but almost the same yoghurt (502 ml) — a completely different drink. Recipes are in direct proportion, so you **multiply**, never add. The multiplier is {{6/4 = 1.5}}: 3 mangoes, 750 ml of yoghurt, 300 ml of milk and 60 g of sugar. Every ingredient is scaled by the same factor, so the taste stays the same.",
      },
      body:
        "**Scaling a recipe.** Find the **multiplier** (scale factor) = new number of people ÷ old number of people. Then multiply *every* ingredient by it.\n\n| Mango lassi | Serves 4 | × 1.5 → serves 6 | ÷ 4 → serves 1 |\n|---|---|---|---|\n| Mangoes | 2 | 3 | {{1/2}} |\n| Yoghurt | 500 ml | 750 ml | 125 ml |\n| Milk | 200 ml | 300 ml | 50 ml |\n| Sugar | 40 g | 60 g | 10 g |\n\nIf the multiplier is awkward (for example 3 people → 7 people), use the unitary method: find the amounts for **1 person** first, then multiply by 7.\n\n**How many can I make?** If you are limited by what is in the cupboard, work out how many batches each ingredient allows. The ingredient that runs out first — the **limiting ingredient** — decides the answer.\n\n**Currency conversion.** An **exchange rate** tells you how much of one currency you get for 1 unit of another. Rates change every day, so a question always tells you which rate to use. Suppose $1 (one Singapore dollar) = RM 3.40 (Malaysian ringgit).\n- **Dollars → ringgit: multiply** by 3.40. $50 → 50 × 3.40 = RM 170.\n- **Ringgit → dollars: divide** by 3.40. RM 85 → 85 ÷ 3.40 = $25.\n\n> Sense check: each Singapore dollar buys more than 3 ringgit, so the ringgit amount should always be the bigger number. If it is not, you multiplied when you should have divided (or the other way round).",
      diagram: `<svg viewBox="0 0 460 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Double number line for 1 Singapore dollar equals 3.40 ringgit: 0, 10, 25, 40 and 50 dollars line up with 0, 34, 85, 136 and 170 ringgit"><rect x="0" y="0" width="460" height="190" fill="#ffffff"/><g font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937"><text x="12" y="64">SGD</text><text x="12" y="134">RM</text></g><g stroke="#1f2937" stroke-width="2"><line x1="80" y1="60" x2="430" y2="60"/><line x1="80" y1="130" x2="430" y2="130"/></g><g stroke="#1f2937" stroke-width="1.5"><line x1="80" y1="54" x2="80" y2="66"/><line x1="150" y1="54" x2="150" y2="66"/><line x1="255" y1="54" x2="255" y2="66"/><line x1="360" y1="54" x2="360" y2="66"/><line x1="430" y1="54" x2="430" y2="66"/><line x1="80" y1="124" x2="80" y2="136"/><line x1="150" y1="124" x2="150" y2="136"/><line x1="255" y1="124" x2="255" y2="136"/><line x1="360" y1="124" x2="360" y2="136"/><line x1="430" y1="124" x2="430" y2="136"/></g><g stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"><line x1="80" y1="68" x2="80" y2="122"/><line x1="150" y1="68" x2="150" y2="122"/><line x1="430" y1="68" x2="430" y2="122"/></g><g stroke="#334155" stroke-width="1.5"><line x1="255" y1="68" x2="255" y2="116"/><line x1="360" y1="76" x2="360" y2="122"/></g><polygon points="250,114 260,114 255,122" fill="#334155"/><polygon points="355,76 365,76 360,68" fill="#334155"/><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="80" y="46">$0</text><text x="150" y="46">$10</text><text x="255" y="46">$25</text><text x="360" y="46">$40</text><text x="430" y="46">$50</text><text x="80" y="153">RM 0</text><text x="150" y="153">RM 34</text><text x="255" y="153">RM 85</text><text x="360" y="153">RM 136</text><text x="430" y="153">RM 170</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="262" y="98">× 3.40</text><text x="367" y="98">÷ 3.40</text></g><text x="230" y="180" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Rate: $1 = RM 3.40. Going down, multiply; going up, divide.</text></svg>`,
      diagramCaption:
        "A double number line for $1 = RM 3.40. Each pair lines up because the two amounts are in direct proportion: multiply by 3.40 to go from dollars to ringgit, divide by 3.40 to come back.",
      workedExamples: [
        {
          title: "Scaling a recipe",
          problem:
            "Vegetable fried rice for 4 people needs 300 g of rice, 120 g of peas and 2 tablespoons of soy sauce. How much of each is needed for 10 people?",
          steps: [
            "Multiplier = {{10/4 = 2.5}}.",
            "Rice: 300 × 2.5 = 750 g.",
            "Peas: 120 × 2.5 = 300 g.",
            "Soy sauce: 2 × 2.5 = 5 tablespoons.",
          ],
          answer: "750 g of rice, 300 g of peas and 5 tablespoons of soy sauce",
          yourTurn: {
            question: "Your turn: a recipe for 6 chapatis uses 180 g of flour. How many grams of flour are needed for 15 chapatis?",
            answer: { type: "number", value: 450, display: "450 g" },
            solution: "One chapati needs 180 ÷ 6 = 30 g, so 15 chapatis need 15 × 30 = 450 g. (Or multiply by {{15/6 = 2.5}}.)",
          },
        },
        {
          title: "Currency both ways",
          problem:
            "Aisha is going to Japan. The exchange rate is $1 = ¥112. (a) How many yen does she get for $250? (b) A souvenir costs ¥2800. What is that in Singapore dollars?",
          steps: [
            "(a) Dollars → yen: multiply. 250 × 112 = ¥28 000.",
            "(b) Yen → dollars: divide. 2800 ÷ 112 = $25.",
            "Sense check: yen amounts are roughly 100 times dollar amounts, and ¥2800 ÷ 100 = 28, which is close to $25 ✓",
          ],
          answer: "(a) ¥28 000 (b) $25",
        },
        {
          title: "The limiting ingredient",
          problem:
            "A recipe for 8 banana pancakes uses 200 g of flour, 300 ml of milk and 2 bananas. Hana has 500 g of flour, 900 ml of milk and 4 bananas. What is the greatest number of pancakes she can make?",
          steps: [
            "Work out how many batches each ingredient allows.",
            "Flour: 500 ÷ 200 = 2.5 batches. Milk: 900 ÷ 300 = 3 batches. Bananas: 4 ÷ 2 = 2 batches.",
            "Bananas run out first, so she can make only 2 batches.",
            "2 × 8 = 16 pancakes.",
          ],
          answer: "16 pancakes (bananas are the limiting ingredient)",
        },
      ],
      keyPoints: [
        "Scale a recipe by multiplying every ingredient by the same multiplier — never by adding.",
        "Multiplier = new amount ÷ old amount; or go via 1 person (unitary method).",
        "Currency: if $1 = r of the other currency, multiply by r to go from dollars; divide by r to come back.",
        "Always sense-check which currency amount should be the bigger number.",
      ],
      whyItWorks:
        "A recipe is a ratio — 2 mangoes : 500 ml yoghurt : 200 ml milk : 40 g sugar. Multiplying every part by the same number gives an equivalent ratio, so the taste is unchanged; adding the same amount to every part changes the ratio. An exchange rate is a ratio too ($1 : RM 3.40), so converting is direct proportion: multiply one way, and undo it by dividing on the way back.",
      strategies: ["Find the multiplier", "Go via one (unitary method)", "Sense-check the size of the answer"],
      thinkDeeper:
        "Ravi changes $100 into ringgit at $1 = RM 3.40, then changes his mind and immediately changes all the ringgit back. This time the money changer charges RM 3.50 for every $1. How many dollars does Ravi end up with? Why do money changers always use two different rates?",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "scale-and-maps",
      heading: "Scale factors, scale drawings & maps",
      discovery: {
        problem:
          "A map of Sentosa has the scale 1 : 25 000. On the map, the beach path from Siloso Beach to Tanjong Beach is 12 cm long. Zara estimates that the real walk is about 300 m. Is she right? (Careful: there are 100 cm in a metre.)",
        idea:
          "Scale 1 : 25 000 means **every** 1 cm on the map stands for 25 000 cm in real life. So 12 cm on the map is 12 × 25 000 = 300 000 cm. Now convert: ÷ 100 gives 3000 m, and ÷ 1000 gives **3 km** — ten times Zara's estimate. Map questions are a simple multiplication followed by careful unit conversion.",
      },
      body:
        "**Scale factor.** Two shapes are **similar** if one is an exact enlargement of the other: the angles are the same, and every length is multiplied by the same number, called the **scale factor** k.\n\n    scale factor k = new length ÷ original length\n    new length = original length × k\n\nIf {{k > 1}} the shape gets bigger; if {{0 < k < 1}} it gets smaller. To find a missing side, find k from a pair of **corresponding sides** (sides in matching positions), then multiply. To go back to the original, divide by k.\n\n**Scale drawings and maps.** A map scale such as **1 : 25 000** is a ratio with no units: 1 cm on the map stands for 25 000 cm on the ground (or 1 mm for 25 000 mm — the units are the same on both sides).\n- **Map → real:** multiply by 25 000, then convert to sensible units.\n- **Real → map:** convert to cm first, then divide by 25 000.\n\nThe conversions you need most often:\n\n    1 m = 100 cm        1 km = 1000 m = 100 000 cm\n\nA scale may be given in words, such as '1 cm represents 2 km'. To write it as 1 : n, put both sides in the same unit: 2 km = 200 000 cm, so the scale is 1 : 200 000.\n\nScales can also enlarge. A 2 mm ant drawn 6 cm (60 mm) long in a science book is drawn to the scale 60 : 2 = 30 : 1.",
      diagram: `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bottom: a right-angled triangle with sides 3, 4 and 5 cm and its enlargement by scale factor 2 with sides 6, 8 and 10 cm. Top right: a map scale bar for 1 to 25000 where 4 cm represents 1 km."><rect x="0" y="0" width="460" height="300" fill="#ffffff"/><text x="350" y="24" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Map scale 1 : 25 000</text><g stroke="#334155" stroke-width="1"><rect x="250" y="50" width="50" height="10" fill="#334155"/><rect x="300" y="50" width="50" height="10" fill="#ffffff"/><rect x="350" y="50" width="50" height="10" fill="#334155"/><rect x="400" y="50" width="50" height="10" fill="#ffffff"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="250" y="44">0</text><text x="300" y="44">1 cm</text><text x="350" y="44">2 cm</text><text x="450" y="44" text-anchor="end">4 cm</text><text x="250" y="76">0</text><text x="300" y="76">250 m</text><text x="350" y="76">500 m</text><text x="450" y="76" text-anchor="end">1 km</text></g><text x="40" y="135" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1f2937">Similar triangles: scale factor 2</text><polygon points="40,270 120,270 40,210" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><polygon points="220,270 380,270 220,150" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><path d="M40 260 L50 260 L50 270 M220 258 L232 258 L232 270" fill="none" stroke="#1f2937" stroke-width="1.2"/><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="80" y="288" text-anchor="middle">4 cm</text><text x="34" y="244" text-anchor="end">3 cm</text><text x="88" y="232">5 cm</text><text x="300" y="288" text-anchor="middle">8 cm</text><text x="212" y="214" text-anchor="end">6 cm</text><text x="308" y="202">10 cm</text></g><line x1="135" y1="235" x2="190" y2="235" stroke="#334155" stroke-width="2"/><polygon points="190,230 198,235 190,240" fill="#334155"/><text x="165" y="226" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">× 2</text></svg>`,
      diagramCaption:
        "Bottom: the large triangle is an enlargement of the small one with scale factor 2 — every length doubles and the angles stay the same. Top right: on a 1 : 25 000 map, every 1 cm stands for 250 m, so 4 cm stands for 1 km.",
      workedExamples: [
        {
          title: "Map → real",
          problem: "A map has the scale 1 : 50 000. Two MRT stations are 7 cm apart on the map. How far apart are they in real life, in km?",
          steps: [
            "Map → real: multiply by 50 000. 7 × 50 000 = 350 000 cm.",
            "Convert to metres: 350 000 ÷ 100 = 3500 m.",
            "Convert to kilometres: 3500 ÷ 1000 = 3.5 km.",
          ],
          answer: "3.5 km",
          yourTurn: {
            question:
              "Your turn: on a map with scale 1 : 20 000, a park connector path is 9 cm long. How long is the real path? Give your answer in km.",
            answer: { type: "number", value: 1.8, display: "1.8 km" },
            solution: "9 × 20 000 = 180 000 cm = 1800 m = 1.8 km.",
          },
        },
        {
          title: "Real → map",
          problem: "A cycling route is 6 km long. How long is it on a map with scale 1 : 40 000?",
          steps: [
            "Convert the real distance to cm: 6 km = 6000 m = 600 000 cm.",
            "Real → map: divide by 40 000.",
            "600 000 ÷ 40 000 = 15 cm.",
          ],
          answer: "15 cm",
        },
        {
          title: "Similar shapes",
          problem:
            "Two rectangles are similar. The small one measures 4 cm by 6 cm. The long side of the large one is 15 cm. How long is its short side?",
          steps: [
            "Match corresponding sides: the long sides are 6 cm and 15 cm.",
            "Scale factor k = 15 ÷ 6 = 2.5.",
            "Short side = 4 × 2.5 = 10 cm.",
            "Check: 4 : 6 = 2 : 3 and 10 : 15 = 2 : 3 ✓",
          ],
          answer: "10 cm",
        },
      ],
      keyPoints: [
        "Similar shapes have equal angles, and every length is multiplied by the same scale factor k.",
        "k = new length ÷ original length, using a pair of corresponding sides.",
        "Map scale 1 : n — map → real: × n; real → map: ÷ n (same units on both sides).",
        "1 km = 100 000 cm — the conversion that trips everyone up.",
      ],
      whyItWorks:
        "A scale drawing applies one multiplier to *every* length at once. Because every length is multiplied by the same k, the ratio of any two sides stays the same — and so do the angles — so the shape keeps its proportions. A map scale 1 : 25 000 is the same idea with a multiplier of 25 000. It works in any unit because both sides of the ratio use the same unit: 1 cm to 25 000 cm, or 1 mm to 25 000 mm.",
      strategies: ["Find the scale factor from corresponding sides", "Keep the same units on both sides", "Estimate first"],
      thinkDeeper:
        "A square photo is enlarged with scale factor 3. Its sides become 3 times as long — but how many copies of the original photo would fit exactly on the enlargement? Draw it. What do you think happens to the area when every length is multiplied by k?",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "inverse-proportion",
      heading: "Inverse proportion",
      discovery: {
        problem:
          "4 volunteers can pack the donation boxes for a food bank in 6 hours. How long would 8 volunteers take, working at the same rate? What about 3 volunteers? Before you calculate, decide: should each answer be more or less than 6 hours?",
        idea:
          "More volunteers means **less** time. The job is worth 4 × 6 = **24 volunteer-hours** of work, whoever does it. With 8 volunteers it takes 24 ÷ 8 = 3 hours; with 3 volunteers it takes 24 ÷ 3 = 8 hours. When two quantities are inversely proportional, their **product** stays the same.",
      },
      body:
        "**Stretch:** Two quantities are in **inverse proportion** when multiplying one of them by a number *divides* the other by the same number: double the volunteers, halve the time. Their **product is constant**:\n\n    volunteers × hours = 4 × 6 = 8 × 3 = 3 × 8 = 24\n\nIf x is the number of volunteers and y is the number of hours, then {{xy = 24}}, so {{y = 24/x}}. In general, inverse proportion means {{y = k/x}} for some constant k.\n\n| | Direct proportion | Inverse proportion |\n|---|---|---|\n| As x increases… | y increases | y decreases |\n| What stays constant? | the ratio y ÷ x | the product x × y |\n| Equation | {{y = kx}} | {{y = k/x}} |\n| Example | cups and cost | workers and time; speed and time for a fixed journey |\n\n**Method.** Find the constant product from the information you are given, then divide it by the new value. For a 120 km journey: at 60 km/h it takes 2 hours, and at 40 km/h it takes 3 hours — speed × time = 120 every time.\n\n**Is it really inverse?** Ask whether 'more' of one really means proportionally 'less' of the other. Doubling the number of singers in a choir does *not* halve the time it takes to sing a song — some relationships are not proportional at all.",
      diagram: `<svg viewBox="0 0 460 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of y equals 24 divided by x. Two rectangles from the origin, 4 by 6 and 8 by 3, have the same area of 24."><rect x="0" y="0" width="460" height="310" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="50" y1="230" x2="295" y2="230"/><line x1="50" y1="190" x2="295" y2="190"/><line x1="50" y1="150" x2="295" y2="150"/><line x1="50" y1="110" x2="295" y2="110"/><line x1="50" y1="70" x2="295" y2="70"/><line x1="50" y1="30" x2="295" y2="30"/><line x1="90" y1="25" x2="90" y2="270"/><line x1="130" y1="25" x2="130" y2="270"/><line x1="170" y1="25" x2="170" y2="270"/><line x1="210" y1="25" x2="210" y2="270"/><line x1="250" y1="25" x2="250" y2="270"/><line x1="290" y1="25" x2="290" y2="270"/></g><rect x="50" y="150" width="80" height="120" fill="#c7d2fe" fill-opacity="0.75" stroke="#334155" stroke-width="1.2"/><rect x="50" y="210" width="160" height="60" fill="#fde68a" fill-opacity="0.75" stroke="#334155" stroke-width="1.2"/><g stroke="#1f2937" stroke-width="1.5"><line x1="50" y1="270" x2="300" y2="270"/><line x1="50" y1="270" x2="50" y2="22"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="50" y="285">0</text><text x="90" y="285">2</text><text x="130" y="285">4</text><text x="170" y="285">6</text><text x="210" y="285">8</text><text x="250" y="285">10</text><text x="290" y="285">12</text><text x="175" y="303" font-size="12">volunteers (x)</text><text x="50" y="14" font-size="12">hours (y)</text></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="end"><text x="44" y="234">2</text><text x="44" y="194">4</text><text x="44" y="154">6</text><text x="44" y="114">8</text><text x="44" y="74">10</text><text x="44" y="34">12</text></g><polyline points="90.0,30.0 95.0,56.7 100.0,78.0 105.0,95.5 110.0,110.0 115.0,122.3 120.0,132.9 125.0,142.0 130.0,150.0 135.0,157.1 140.0,163.3 145.0,168.9 150.0,174.0 155.0,178.6 160.0,182.7 165.0,186.5 170.0,190.0 175.0,193.2 180.0,196.2 185.0,198.9 190.0,201.4 195.0,203.8 200.0,206.0 205.0,208.1 210.0,210.0 215.0,211.8 220.0,213.5 225.0,215.1 230.0,216.7 235.0,218.1 240.0,219.5 245.0,220.8 250.0,222.0 255.0,223.2 260.0,224.3 265.0,225.3 270.0,226.4 275.0,227.3 280.0,228.3 285.0,229.1 290.0,230.0" fill="none" stroke="#b91c1c" stroke-width="2.5"/><g fill="#ffffff" stroke="#1f2937" stroke-width="1.5"><circle cx="90" cy="30" r="3.5"/><circle cx="110" cy="110" r="3.5"/><circle cx="130" cy="150" r="3.5"/><circle cx="170" cy="190" r="3.5"/><circle cx="210" cy="210" r="3.5"/><circle cx="290" cy="230" r="3.5"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937"><text x="136" y="145">(4, 6)</text><text x="215" y="203">(8, 3)</text></g><g font-family="sans-serif" fill="#1f2937"><text x="318" y="60" font-size="14" font-weight="bold">y = 24 ÷ x</text><rect x="318" y="80" width="12" height="12" fill="#c7d2fe" stroke="#334155"/><text x="336" y="90" font-size="12">4 × 6 = 24</text><rect x="318" y="102" width="12" height="12" fill="#fde68a" stroke="#334155"/><text x="336" y="112" font-size="12">8 × 3 = 24</text><text x="318" y="145" font-size="12">Same area, so the</text><text x="318" y="163" font-size="12">product x × y stays</text><text x="318" y="181" font-size="12">constant.</text></g></svg>`,
      diagramCaption:
        "The curve {{y = 24/x}}. Every point on it makes a rectangle with the axes of area 24: 4 volunteers × 6 hours and 8 volunteers × 3 hours do the same amount of work.",
      workedExamples: [
        {
          title: "Workers and time",
          problem: "6 workers take 10 days to build a garden. How long would 4 workers take, working at the same rate?",
          steps: [
            "Fewer workers → more days, so expect an answer bigger than 10.",
            "Total work = 6 × 10 = 60 worker-days.",
            "With 4 workers: 60 ÷ 4 = 15 days.",
          ],
          answer: "15 days",
          yourTurn: {
            question: "Your turn: 5 identical taps fill a tank in 12 minutes. How many minutes would 3 of these taps take?",
            answer: { type: "number", value: 20, display: "20 minutes" },
            solution: "Total work = 5 × 12 = 60 tap-minutes. With 3 taps: 60 ÷ 3 = 20 minutes.",
          },
        },
        {
          title: "Speed and time",
          problem:
            "A coach takes 3 hours to travel from Singapore to Melaka at an average speed of 80 km/h. How long would the journey take at an average speed of 60 km/h?",
          steps: [
            "Slower → longer, so expect more than 3 hours.",
            "speed × time = 80 × 3 = 240 (this is the distance in km).",
            "At 60 km/h: 240 ÷ 60 = 4 hours.",
          ],
          answer: "4 hours",
        },
      ],
      keyPoints: [
        "Inverse proportion: as one quantity goes up, the other goes down so that x × y stays constant.",
        "Find the constant product first, then divide it by the new value.",
        "{{y = k/x}}: the graph is a curve that gets closer and closer to the axes but never touches them.",
        "Check the direction before calculating: more workers → less time.",
      ],
      whyItWorks:
        "The job is a fixed amount of work: 24 volunteer-hours. Share it between twice as many people and each person works for half as long. On the graph, each point (x, y) on {{y = 24/x}} makes a rectangle with the axes whose area is x × y = 24 — so all these rectangles have the same area, even though they get wider and flatter.",
      strategies: ["Check the direction first", "Find the constant product", "Estimate first"],
      thinkDeeper:
        "3 people paint a fence in 4 hours. The model says 12 people would take 1 hour and 240 people would take 3 minutes. At what point does the model stop being realistic, and why? What assumption is the model making?",
    },
  ],
  learn: {
    flashcards: [
      { front: "Simplify 12 : 18", back: "2 : 3 — divide both parts by the HCF, 6." },
      { front: "Write 50 cm : 2 m in its simplest form.", back: "Same units first: 50 : 200 = 1 : 4." },
      { front: "How do you write a ratio in the form 1 : n?", back: "Divide both parts by the first part. 4 : 18 = 1 : 4.5." },
      { front: "Simplify 1.5 : 2.5", back: "× 10 gives 15 : 25, then ÷ 5 gives 3 : 5." },
      { front: "Share $72 in the ratio 5 : 3.", back: "8 parts, so 1 part = $9. The shares are $45 and $27." },
      { front: "Ratio 5 : 3 and the difference between the shares is $18. What is one part?", back: "5 − 3 = 2 parts = $18, so one part = $9." },
      { front: "Boys : girls = 2 : 3. What fraction of the class are boys?", back: "{{2/5}} — add the parts to get the denominator." },
      { front: "A is {{3/4}} of B. Write the ratio A : B.", back: "3 : 4" },
      { front: "What is the unitary method?", back: "Find the value of ONE unit, then multiply up to the amount you need." },
      { front: "How do you find the best buy?", back: "Compare unit prices (per item, per 100 g, per litre). The lowest unit price wins." },
      { front: "What does direct proportion look like on a graph?", back: "A straight line through the origin: {{y = kx}}." },
      { front: "A recipe serves 4. What is the multiplier for 6 people?", back: "{{6/4 = 1.5}} — multiply every ingredient by 1.5." },
      { front: "$1 = RM 3.40. Convert RM 85 to dollars.", back: "Divide: 85 ÷ 3.40 = $25." },
      { front: "Map scale 1 : 50 000. What real distance is 7 cm on the map?", back: "7 × 50 000 = 350 000 cm = 3.5 km." },
      { front: "How do you find the scale factor between similar shapes?", back: "New length ÷ original length, using a pair of corresponding sides." },
      { front: "Stretch: in inverse proportion, what stays constant?", back: "The product: x × y = k (for example, workers × days)." },
    ],
    mustKnow: [
      "I can simplify a ratio, including ratios with different units, decimals or fractions.",
      "I can write a ratio in the form 1 : n and use it to compare ratios.",
      "I can share an amount in a ratio with two or three parts.",
      "I can solve ratio problems when I am given one share or the difference between shares.",
      "I can convert between a ratio and the fraction of the total that each part represents.",
      "I can use the unitary method to solve direct proportion problems.",
      "I can decide which pack is the best buy by comparing unit prices.",
      "I can recognise direct proportion from a table (constant ratio) or a graph (straight line through the origin).",
      "I can scale a recipe up or down and find the limiting ingredient.",
      "I can convert between currencies in both directions using an exchange rate.",
      "I can use a scale factor to find missing lengths in similar shapes.",
      "I can convert between map distances and real distances using a scale of 1 : n.",
    ],
    misconceptions: [
      {
        wrong: "The ratio 2 : 3 means the first part is {{2/3}} of the total.",
        right: "There are 2 + 3 = 5 parts, so the first part is {{2/5}} of the total. {{2/3}} compares the first part with the second part.",
      },
      {
        wrong: "50 cm : 2 m simplifies to 25 : 1.",
        right: "The units must match first: 50 cm : 200 cm = 1 : 4.",
      },
      {
        wrong: "To share $72 in the ratio 5 : 3, work out 72 ÷ 5 and 72 ÷ 3.",
        right: "Divide by the total number of parts: 72 ÷ 8 = $9 per part, so the shares are $45 and $27.",
      },
      {
        wrong: "To scale a recipe from 4 people to 6 people, add 2 to every quantity.",
        right: "Multiply every quantity by {{6/4 = 1.5}}. Adding the same amount changes the ratio, so the recipe changes.",
      },
      {
        wrong: "The biggest pack is always the best buy.",
        right: "Not always — compare unit prices. 500 g for $3.75 ($0.75 per 100 g) beats 1 kg for $7.90 ($0.79 per 100 g).",
      },
      {
        wrong: "Adding the same number to both parts keeps a ratio the same, so 1 : 2 = 2 : 3.",
        right: "Only multiplying or dividing every part by the same number keeps a ratio equivalent: 1 : 2 = 2 : 4, but 2 : 3 is a different ratio.",
      },
    ],
    examMistakes: [
      "Writing the ratio the wrong way round — keep the order the question uses (boys : girls is not girls : boys).",
      "Simplifying before converting to the same units (50 cm : 2 m is not 25 : 1).",
      "Dividing the amount by one number in the ratio instead of by the total number of parts.",
      "When the difference is given, using the total number of parts instead of the difference in parts.",
      "Giving only one share when the question asks for both shares, or for the total.",
      "Not simplifying fully — divide by the HCF, not just any common factor.",
      "Map scales: forgetting that 1 km = 100 000 cm, so the answer is 10 or 100 times too big or too small.",
      "Currency: multiplying when you should divide — always sense-check which amount should be the larger number.",
    ],
    mnemonics: [
      {
        topic: "Sharing in a ratio",
        device: "Add, Divide, Multiply",
        explanation: "Add the parts, divide the amount by that total to get one part, then multiply one part by each number in the ratio.",
      },
      {
        topic: "Direct proportion",
        device: "Find ONE, then find ANY",
        explanation: "Divide to get the value of one unit, then multiply to get any amount you need. It works for prices, recipes and exchange rates.",
      },
      {
        topic: "Map scales",
        device: "Real world is huge: Multiply; Map is tiny: Divide",
        explanation: "Going from the map to the real world the distance must get bigger, so multiply by n. Going from real life to the map it must get smaller, so divide by n.",
      },
    ],
    realWorld: [
      {
        title: "Hawker drinks and recipes",
        detail: "A drinks stall mixes syrup and water in a fixed ratio such as 1 : 4, so a single cup and a whole jug taste exactly the same.",
        emoji: "🍹",
      },
      {
        title: "Supermarket best buys",
        detail: "Shelf labels often show a unit price (per 100 g or per litre) so shoppers can compare packs of different sizes fairly.",
        emoji: "🛒",
      },
      {
        title: "Money changers",
        detail: "Money changers at Changi Airport display a 'we buy' and a 'we sell' rate — two different exchange rates, which is how they make a profit.",
        emoji: "💱",
      },
      {
        title: "Maps and floor plans",
        detail: "Street maps, hiking maps and architects' plans of HDB flats are all scale drawings, with scales such as 1 : 100 or 1 : 25 000.",
        emoji: "🗺️",
      },
      {
        title: "Mixing concrete and paint",
        detail: "Builders mix cement : sand : gravel in ratios like 1 : 2 : 3, and paint shops mix tints in exact ratios to match a colour.",
        emoji: "🎨",
      },
      {
        title: "Bicycle gears",
        detail: "With 48 teeth at the front and 16 at the back (48 : 16 = 3 : 1), the back wheel turns 3 times for every turn of the pedals.",
        emoji: "🚲",
      },
    ],
    videos: [
      { title: "Simplifying ratios", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+simplifying+ratios" },
      { title: "Sharing in a ratio", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+sharing+in+a+ratio" },
      { title: "Proportional relationships", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+proportional+relationships" },
      { title: "Map scales and scale drawings", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+map+scales" },
    ],
    formulas: [
      { name: "Ratio as a fraction", formula: "If A : B = a : b, then A is {{a/(a+b)}} of the total.", note: "Part-to-part {{a/b}} is a different fraction." },
      { name: "Sharing in a ratio", formula: "one part = total ÷ (sum of the ratio numbers)", note: "Then multiply one part by each number in the ratio." },
      { name: "The form 1 : n", formula: "a : b = 1 : {{b/a}}", note: "Divide both parts by the first part." },
      { name: "Direct proportion", formula: "{{y = kx}}, where k = y ÷ x is constant", note: "Graph: a straight line through the origin." },
      { name: "Unit price", formula: "unit price = cost ÷ quantity", note: "Lowest unit price = best buy." },
      { name: "Scale factor", formula: "k = new length ÷ original length", note: "Use corresponding sides of similar shapes." },
      { name: "Map scale 1 : n", formula: "real distance = map distance × n;  map distance = real distance ÷ n", note: "Same units on both sides. 1 km = 100 000 cm." },
      { name: "Inverse proportion (stretch)", formula: "{{y = k/x}}, so {{xy = k}}", note: "The product stays constant." },
    ],
  },
};
