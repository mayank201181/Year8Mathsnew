import type { TopicGuide } from "../../types.ts";

// ---------------------------------------------------------------------------
// Powers of 10 & Standard Form — guide (textbook chapter + learn-smart).
// ---------------------------------------------------------------------------

export const guide: TopicGuide = {
  id: "standard-form",
  title: "Powers of 10 & Standard Form",
  strand: "Number",
  icon: "🔭",
  summary: "From atoms to galaxies: write any number as A × 10ⁿ and compare it at a glance.",
  intro:
    "Some numbers are too big to say and some are too small to see: the distance to Neptune, the width of a red blood cell, the number of bytes on your phone. This chapter starts with the place-value moves behind multiplying and dividing by 10, 100, 0.1 and 0.01, stretches them into positive and negative powers of 10, and then builds standard form — one tidy way to write any number as {{A * 10^n}} so you can read its size instantly, compare it and (as a stretch) calculate with it.",
  guide: [
    // -----------------------------------------------------------------------
    {
      id: "multiplying-dividing-by-powers-of-ten",
      heading: "Multiplying & dividing by 10, 100, 0.1 and 0.01",
      discovery: {
        problem:
          "Marcus says: *multiplying always makes a number bigger, and dividing always makes it smaller.* Test him. Work out 40 × 0.1, then 40 ÷ 0.1. (For the second one, ask yourself: how many tenths fit into 40?) Is Marcus right?",
        idea:
          "Marcus is wrong. 0.1 is one tenth, so 40 × 0.1 means *one tenth of 40*, which is 4 — exactly the same as 40 ÷ 10. And 40 ÷ 0.1 asks how many tenths fit into 40. There are 10 tenths in every 1, so the answer is 400 — the same as 40 × 10. Multiplying by a number between 0 and 1 shrinks a positive number; dividing by one makes it grow.",
      },
      body:
        "Our number system is built on **place value**: every column is worth 10 times the column on its right. So multiplying or dividing by 10 or 100 simply slides every digit along the columns. The decimal point stays where it is; the **digits move**.\n\n- **× 10**: every digit moves **1 place left** (each digit becomes worth 10 times more). 3.47 × 10 = 34.7\n- **× 100**: every digit moves **2 places left**. 3.47 × 100 = 347\n- **÷ 10**: every digit moves **1 place right**. 3.47 ÷ 10 = 0.347\n- **÷ 100**: every digit moves **2 places right**. 3.47 ÷ 100 = 0.0347\n\nWhen the digits move away from the decimal point, fill any empty columns between them and the point with **place-holder zeros**: 6.2 × 100 = 620 and 6.2 ÷ 100 = 0.062.\n\n**0.1 and 0.01 are fractions in disguise.** 0.1 = {{1/10}} and 0.01 = {{1/100}}. Taking {{1/10}} of something is the same as dividing it by 10, and counting how many tenths fit into something gives 10 times as many. That gives four swaps worth knowing by heart:\n\n| This … | … is the same as | Digits move |\n|---|---|---|\n| × 0.1 | ÷ 10 | 1 place right |\n| × 0.01 | ÷ 100 | 2 places right |\n| ÷ 0.1 | × 10 | 1 place left |\n| ÷ 0.01 | × 100 | 2 places left |\n\n> **Why not just \"add a zero\"?** It seems to work for 25 × 10 = 250, but try 2.5 × 10: adding a zero gives 2.50, which is still 2.5. The real rule is that the digits move. Think in columns, not in zeros.\n\n**Estimate first.** Before you move anything, decide whether the answer should be bigger or smaller than the number you started with. For a positive number, × 0.01 must make it smaller and ÷ 0.01 must make it bigger.",
      diagram: `<svg viewBox="0 0 480 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Place-value grid. The middle row shows 3.47. The top row shows 34.7, the result of multiplying by 10, with arrows moving each digit one column left. The bottom row shows 0.347, the result of multiplying by 0.1, with arrows moving each digit one column right. A dashed line marks the decimal point, which does not move."><defs><marker id="sf-pv-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs><rect x="0" y="0" width="480" height="252" fill="#ffffff"/><text x="12" y="41" font-size="11" font-family="sans-serif" fill="#334155">column value</text><rect x="120" y="22" width="168" height="28" fill="#c7d2fe" stroke="#334155"/><rect x="288" y="22" width="168" height="28" fill="#bbf7d0" stroke="#334155"/><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold"><text x="148" y="41">100</text><text x="204" y="41">10</text><text x="260" y="41">1</text><text x="316" y="41">0.1</text><text x="372" y="41">0.01</text><text x="428" y="41">0.001</text></g><g fill="#ffffff" stroke="#94a3b8"><rect x="120" y="62" width="56" height="38"/><rect x="176" y="62" width="56" height="38"/><rect x="232" y="62" width="56" height="38"/><rect x="288" y="62" width="56" height="38"/><rect x="344" y="62" width="56" height="38"/><rect x="400" y="62" width="56" height="38"/><rect x="120" y="128" width="56" height="38"/><rect x="176" y="128" width="56" height="38"/><rect x="232" y="128" width="56" height="38"/><rect x="288" y="128" width="56" height="38"/><rect x="344" y="128" width="56" height="38"/><rect x="400" y="128" width="56" height="38"/><rect x="120" y="194" width="56" height="38"/><rect x="176" y="194" width="56" height="38"/><rect x="232" y="194" width="56" height="38"/><rect x="288" y="194" width="56" height="38"/><rect x="344" y="194" width="56" height="38"/><rect x="400" y="194" width="56" height="38"/></g><g font-size="13" font-family="sans-serif" fill="#1f2937"><text x="12" y="86">× 10 = 34.7</text><text x="12" y="152" font-weight="bold">Start: 3.47</text><text x="12" y="218">× 0.1 = 0.347</text></g><g font-size="20" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="204" y="88">3</text><text x="260" y="88">4</text><text x="316" y="88">7</text><text x="260" y="154" font-weight="bold">3</text><text x="316" y="154" font-weight="bold">4</text><text x="372" y="154" font-weight="bold">7</text><text x="260" y="220" fill="#64748b">0</text><text x="316" y="220">3</text><text x="372" y="220">4</text><text x="428" y="220">7</text></g><line x1="288" y1="18" x2="288" y2="236" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/><g fill="#dc2626"><circle cx="288" cy="88" r="3.5"/><circle cx="288" cy="154" r="3.5"/><circle cx="288" cy="220" r="3.5"/></g><g stroke="#334155" stroke-width="1.6" fill="none" marker-end="url(#sf-pv-arrow)"><line x1="254" y1="127" x2="212" y2="103"/><line x1="310" y1="127" x2="268" y2="103"/><line x1="366" y1="127" x2="324" y2="103"/><line x1="266" y1="167" x2="308" y2="191"/><line x1="322" y1="167" x2="364" y2="191"/><line x1="378" y1="167" x2="420" y2="191"/></g><text x="288" y="248" font-size="11" font-family="sans-serif" fill="#dc2626" text-anchor="middle">the decimal point stays put — the digits move</text></svg>`,
      diagramCaption:
        "Start in the middle row with 3.47. Multiplying by 10 slides every digit one column left (34.7). Multiplying by 0.1 — the same as dividing by 10 — slides every digit one column right (0.347), with a place-holder 0 in the ones column.",
      workedExamples: [
        {
          title: "Multiplying by 100",
          problem: "Work out 0.56 × 100.",
          steps: [
            "Estimate: × 100 makes a positive number much bigger, so expect an answer of about 50.",
            "× 100 moves every digit 2 places left: the 5 tenths become 5 tens, and the 6 hundredths become 6 ones.",
            "0.56 × 100 = 56.",
          ],
          answer: "56",
          yourTurn: {
            question: "Your turn: work out 2.08 × 100.",
            answer: { type: "number", value: 208 },
            solution:
              "× 100 moves every digit 2 places left: 2.08 → 208. The 0 that was in the tenths column ends up in the tens column, so it must stay as a place holder.",
          },
        },
        {
          title: "Multiplying by 0.01",
          problem: "Work out 45 × 0.01.",
          steps: [
            "0.01 = {{1/100}}, so × 0.01 is the same as ÷ 100.",
            "÷ 100 moves every digit 2 places right: 45 → 0.45.",
            "Check: {{1/100}} of $45 is 45 cents, which is $0.45. ✓",
          ],
          answer: "0.45",
        },
        {
          title: "Dividing by 0.01 in context",
          problem:
            "A 3.6 m length of ribbon is cut into pieces that are each 0.01 m (1 cm) long. How many pieces are there? Work out 3.6 ÷ 0.01.",
          steps: [
            "Estimate: the pieces are tiny, so there will be lots of them — the answer must be much bigger than 3.6.",
            "Ask how many hundredths fit into 3.6. Every 1 contains 100 hundredths, so ÷ 0.01 is the same as × 100.",
            "× 100 moves the digits 2 places left: 3.6 × 100 = 360.",
            "Check: 3.6 m = 360 cm, and each piece is 1 cm long. ✓",
          ],
          answer: "360 pieces",
        },
      ],
      keyPoints: [
        "× 0.1 is the same as ÷ 10, and × 0.01 is the same as ÷ 100.",
        "÷ 0.1 is the same as × 10, and ÷ 0.01 is the same as × 100.",
        "The digits move and the decimal point stays still; fill gaps with place-holder zeros.",
        "Multiplying a positive number by something between 0 and 1 makes it smaller; dividing by it makes it bigger.",
      ],
      whyItWorks:
        "0.1 = {{1/10}}. Multiplying by {{1/10}} means taking one tenth, which is dividing by 10. Dividing by {{1/10}} asks how many tenths fit in — and there are 10 tenths in every whole, so it multiplies by 10:\n\n    {{40 ÷ 0.1 = 40 ÷ 1/10 = 40 * 10 = 400}}\n\nThe same reasoning with 0.01 = {{1/100}} shows that × 0.01 = ÷ 100 and ÷ 0.01 = × 100.",
      strategies: ["Estimate first", "Rewrite the operation (× 0.1 becomes ÷ 10)", "Draw a place-value grid"],
      thinkDeeper:
        "Ethan meant to divide a number by 0.1, but he multiplied it by 0.1 by mistake and got 0.35. What number did he start with, and what should his answer have been? How many times bigger is the correct answer than his — and could you have known that without finding the starting number?",
    },
    // -----------------------------------------------------------------------
    {
      id: "powers-of-ten",
      heading: "Positive and negative powers of 10",
      discovery: {
        problem:
          "Here is a pattern: {{10^3}} = 1000, {{10^2}} = 100, {{10^1}} = 10. Each time the index goes down by 1, the value is divided by 10. Keep the pattern going: what should {{10^0}}, {{10^(-1)}} and {{10^(-2)}} be? What would {{10^(-6)}} be?",
        idea:
          "Dividing by 10 each time: {{10^0 = 1}}, {{10^(-1) = 0.1 = 1/10}} and {{10^(-2) = 0.01 = 1/100}}. Following on, {{10^(-6)}} = 0.000 001. A negative index does **not** make a negative number — it makes a **small** positive number. It tells you how many times to *divide* 1 by 10.",
      },
      body:
        "In {{10^4}}, 10 is the **base** and 4 is the **index** (also called the **power** or **exponent**). It means four tens multiplied together: 10 × 10 × 10 × 10 = 10 000.\n\n- **Positive powers:** {{10^n}} is 1 followed by n zeros. {{10^6}} = 1 000 000 (one million).\n- **Zero power:** {{10^0 = 1}}.\n- **Negative powers:** {{10^(-n) = 1/10^n}}. As a decimal, the 1 sits in the n-th decimal place: {{10^(-3)}} = 0.001.\n\n**Place-value columns are powers of 10.** Each column is 10 times the one on its right:\n\n| thousands | hundreds | tens | ones | tenths | hundredths | thousandths |\n|---|---|---|---|---|---|---|\n| {{10^3}} | {{10^2}} | {{10^1}} | {{10^0}} | {{10^(-1)}} | {{10^(-2)}} | {{10^(-3)}} |\n\nSo multiplying by {{10^n}} moves every digit n places left, and multiplying by {{10^(-n)}} moves every digit n places right. For example, {{7.3 * 10^(-2) = 7.3 * 0.01}} = 0.073.\n\n**Index laws for powers of 10.** A power of 10 is just a count of tens multiplied together, so when you multiply you add the counts, and when you divide you subtract them:\n\n    {{10^a * 10^b = 10^(a+b)}}\n    {{10^a ÷ 10^b = 10^(a-b)}}\n\nThese laws work for negative indices too: {{10^5 * 10^(-2) = 10^3}}, because multiplying by {{10^(-2)}} is dividing by 100.",
      diagram: `<svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seven boxes in a row: 10 cubed equals 1000, 10 squared equals 100, 10 to the 1 equals 10, 10 to the 0 equals 1, 10 to the minus 1 equals 0.1, 10 to the minus 2 equals 0.01, 10 to the minus 3 equals 0.001. Curved arrows labelled divide by 10 join each box to the next, and the place-value names thousands to thousandths are written underneath."><defs><marker id="sf-ladder-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs><rect x="0" y="0" width="480" height="180" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><rect x="6" y="46" width="60" height="66" rx="6" fill="#c7d2fe"/><rect x="74" y="46" width="60" height="66" rx="6" fill="#c7d2fe"/><rect x="142" y="46" width="60" height="66" rx="6" fill="#c7d2fe"/><rect x="210" y="46" width="60" height="66" rx="6" fill="#fde68a"/><rect x="278" y="46" width="60" height="66" rx="6" fill="#bbf7d0"/><rect x="346" y="46" width="60" height="66" rx="6" fill="#bbf7d0"/><rect x="414" y="46" width="60" height="66" rx="6" fill="#bbf7d0"/></g><g font-size="17" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold"><text x="36" y="74">10³</text><text x="104" y="74">10²</text><text x="172" y="74">10¹</text><text x="240" y="74">10⁰</text><text x="308" y="74">10⁻¹</text><text x="376" y="74">10⁻²</text><text x="444" y="74">10⁻³</text></g><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="36" y="100">1000</text><text x="104" y="100">100</text><text x="172" y="100">10</text><text x="240" y="100">1</text><text x="308" y="100">0.1</text><text x="376" y="100">0.01</text><text x="444" y="100">0.001</text></g><g stroke="#334155" stroke-width="1.4" fill="none" marker-end="url(#sf-ladder-arrow)"><path d="M46,44 Q70,20 94,44"/><path d="M114,44 Q138,20 162,44"/><path d="M182,44 Q206,20 230,44"/><path d="M250,44 Q274,20 298,44"/><path d="M318,44 Q342,20 366,44"/><path d="M386,44 Q410,20 434,44"/></g><g font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="70" y="24">÷10</text><text x="138" y="24">÷10</text><text x="206" y="24">÷10</text><text x="274" y="24">÷10</text><text x="342" y="24">÷10</text><text x="410" y="24">÷10</text></g><g font-size="10" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="36" y="130">thousands</text><text x="104" y="130">hundreds</text><text x="172" y="130">tens</text><text x="240" y="130">ones</text><text x="308" y="130">tenths</text><text x="376" y="130">hundredths</text><text x="444" y="130">thousandths</text></g><text x="240" y="162" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Step right: ÷ 10 (index down 1).   Step left: × 10 (index up 1).</text></svg>`,
      diagramCaption:
        "Each step to the right divides by 10 and lowers the index by 1. The pattern runs smoothly through {{10^0 = 1}} into the negative powers — the tenths, hundredths and thousandths columns.",
      workedExamples: [
        {
          title: "A negative power as a fraction and a decimal",
          problem: "Write {{10^(-3)}} as a fraction and as a decimal.",
          steps: [
            "A negative index means divide: {{10^(-3) = 1/10^3}}.",
            "{{10^3}} = 10 × 10 × 10 = 1000, so {{10^(-3) = 1/1000}}.",
            "One thousandth as a decimal is 0.001 — the 1 is in the third decimal place.",
          ],
          answer: "{{1/1000}} = 0.001",
          yourTurn: {
            question: "Your turn: write {{10^(-4)}} as a decimal.",
            answer: { type: "number", value: 0.0001, allowFraction: false },
            solution: "{{10^(-4) = 1/10^4 = 1/10000}} = 0.0001 — the 1 sits in the fourth decimal place.",
          },
        },
        {
          title: "Writing numbers as powers of 10",
          problem: "Write (a) 1 000 000 and (b) 0.01 as powers of 10.",
          steps: [
            "(a) 1 000 000 is 1 followed by 6 zeros, so it is {{10^6}}.",
            "(b) 0.01 is one hundredth: {{0.01 = 1/100 = 1/10^2}}.",
            "Dividing by {{10^2}} is the same as multiplying by {{10^(-2)}}, so 0.01 = {{10^(-2)}}.",
          ],
          answer: "(a) {{10^6}}   (b) {{10^(-2)}}",
        },
        {
          title: "Using the index laws",
          problem: "Work out {{10^5 * 10^(-2) ÷ 10^4}}. Give your answer as a power of 10 and as a decimal.",
          steps: [
            "Multiplying: add the indices. 5 + (−2) = 3, so {{10^5 * 10^(-2) = 10^3}}.",
            "Dividing: subtract the indices. 3 − 4 = −1, so {{10^3 ÷ 10^4 = 10^(-1)}}.",
            "{{10^(-1) = 1/10}} = 0.1.",
            "Check with ordinary numbers: 100 000 × 0.01 = 1000, and 1000 ÷ 10 000 = 0.1. ✓",
          ],
          answer: "{{10^(-1)}} = 0.1",
        },
      ],
      keyPoints: [
        "{{10^n}} is 1 followed by n zeros, and {{10^0 = 1}}.",
        "{{10^(-n) = 1/10^n}}: a negative power is a small positive number, not a negative one.",
        "Place-value columns are powers of 10: tenths are {{10^(-1)}}, hundredths are {{10^(-2)}}.",
        "{{10^a * 10^b = 10^(a+b)}} and {{10^a ÷ 10^b = 10^(a-b)}}.",
      ],
      whyItWorks:
        "Two ways to see that {{10^0 = 1}} and {{10^(-2) = 1/100}}:\n\n- **Pattern:** 1000, 100, 10, … each term is the one before ÷ 10, so the next terms must be 1, 0.1, 0.01.\n- **Index law:** {{10^3 ÷ 10^3}} is obviously 1, but the law says it is {{10^(3-3) = 10^0}}, so {{10^0}} has to be 1. Likewise {{10^2 ÷ 10^4 = 100/10000 = 1/100}}, and the law says it is {{10^(2-4) = 10^(-2)}}.\n\nNegative and zero powers are not a new rule to memorise — they are the only definitions that keep the old rules working.",
      strategies: ["Find a pattern", "Use the index laws", "Check by converting to ordinary numbers"],
      thinkDeeper:
        "Is {{10^(-2)}} a negative number? Explain without a calculator. Then decide: how many times bigger is {{10^3}} than {{10^(-3)}}? (Careful — it is not 6 times, and it is not 1000 times.)",
    },
    // -----------------------------------------------------------------------
    {
      id: "large-numbers",
      heading: "Standard form for large numbers",
      discovery: {
        problem:
          "The Earth is about 150 000 000 km from the Sun. Neptune is about 4 500 000 000 km from the Sun. Quickly — without counting zeros on your fingers — roughly how many times further from the Sun is Neptune? Then try writing each distance as *a number between 1 and 10* multiplied by *a power of 10*.",
        idea:
          "Counting zeros is slow and easy to get wrong. Instead write 150 000 000 = 1.5 × 100 000 000 = {{1.5 * 10^8}} and 4 500 000 000 = {{4.5 * 10^9}}. Now the size is visible at a glance: {{10^9}} is 10 times {{10^8}}, and 4.5 is 3 times 1.5, so Neptune is about 10 × 3 = 30 times further away.",
      },
      body:
        "A number is in **standard form** (also called *standard index form* or *scientific notation*) when it is written as\n\n    {{A * 10^n}}   where   {{1 <= A < 10}}   and n is an integer.\n\nA holds the digits; the power of 10 holds the size. For numbers of 10 or more, n is positive.\n\n**Converting a large number to standard form**\n\n1. Write A: put the decimal point just after the first digit and drop the zeros on the end. For 72 000 000, A = 7.2.\n2. Find n: count how many places the point is from where it really belongs — that is, how many digits come after the first digit in the whole-number part. 72 000 000 has 8 digits, so 7 come after the 7: n = 7.\n3. Write {{7.2 * 10^7}}, then check: 7.2 × 10 000 000 = 72 000 000. ✓\n\n**Converting back** is the reverse. {{3.06 * 10^5}} means 3.06 × 100 000, so move the digits of 3.06 five places left and fill with zeros: 306 000.\n\n| Ordinary number | Standard form |\n|---|---|\n| 5000 | {{5 * 10^3}} |\n| 64 000 | {{6.4 * 10^4}} |\n| 8 200 000 000 (people on Earth) | {{8.2 * 10^9}} |\n| 1 000 000 000 000 (bytes in a terabyte) | {{1 * 10^12}} |\n\n**Not in standard form:** {{34 * 10^2}} (A is too big) and {{0.34 * 10^4}} (A is too small). Both equal 3400 = {{3.4 * 10^3}}. To repair one, move a factor of 10 between A and the power:\n\n    {{34 * 10^2 = 3.4 * 10 * 10^2 = 3.4 * 10^3}}\n\nIf A is too big, divide it by 10 and add 1 to the power. If A is too small, multiply it by 10 and subtract 1 from the power.",
      diagram: `<svg viewBox="0 0 480 214" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The digits 4 5 0 0 0 0 0 in boxes. The decimal point starts at the right-hand end and hops left six places, numbered 1 to 6, until it sits after the 4. Underneath: 4 500 000 equals 4.5 times 10 to the 6."><defs><marker id="sf-hop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#4338ca"/></marker></defs><rect x="0" y="0" width="480" height="214" fill="#ffffff"/><text x="240" y="24" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Where must the point go so that 1 ≤ A &lt; 10?</text><g stroke="#334155" stroke-width="1.5"><rect x="86" y="80" width="44" height="44" fill="#fde68a"/><rect x="130" y="80" width="44" height="44" fill="#c7d2fe"/><rect x="174" y="80" width="44" height="44" fill="#ffffff"/><rect x="218" y="80" width="44" height="44" fill="#ffffff"/><rect x="262" y="80" width="44" height="44" fill="#ffffff"/><rect x="306" y="80" width="44" height="44" fill="#ffffff"/><rect x="350" y="80" width="44" height="44" fill="#ffffff"/></g><g font-size="22" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="108" y="110">4</text><text x="152" y="110">5</text><text x="196" y="110">0</text><text x="240" y="110">0</text><text x="284" y="110">0</text><text x="328" y="110">0</text><text x="372" y="110">0</text></g><g stroke="#4338ca" stroke-width="1.6" fill="none" marker-end="url(#sf-hop-arrow)"><path d="M392,78 Q372,50 352,78"/><path d="M348,78 Q328,50 308,78"/><path d="M304,78 Q284,50 264,78"/><path d="M260,78 Q240,50 220,78"/><path d="M216,78 Q196,50 176,78"/><path d="M172,78 Q152,50 132,78"/></g><g font-size="12" font-family="sans-serif" fill="#4338ca" text-anchor="middle" font-weight="bold"><text x="372" y="56">1</text><text x="328" y="56">2</text><text x="284" y="56">3</text><text x="240" y="56">4</text><text x="196" y="56">5</text><text x="152" y="56">6</text></g><circle cx="394" cy="124" r="4.5" fill="#ffffff" stroke="#64748b" stroke-width="2"/><circle cx="130" cy="124" r="4.5" fill="#dc2626"/><g font-size="11" font-family="sans-serif" text-anchor="middle"><text x="394" y="144" fill="#64748b">point starts here</text><text x="130" y="144" fill="#dc2626">new point: A = 4.5</text></g><text x="240" y="178" font-size="18" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">4 500 000 = 4.5 × 10⁶</text><text x="240" y="202" font-size="12" font-family="sans-serif" fill="#334155" text-anchor="middle">6 places, so the power is 6</text></svg>`,
      diagramCaption:
        "To write 4 500 000 in standard form, put the point after the first digit to get A = 4.5. The point is 6 places away from where it really belongs, so 4 500 000 = {{4.5 * 10^6}}.",
      workedExamples: [
        {
          title: "Large number to standard form",
          problem: "Write 45 000 000 in standard form.",
          steps: [
            "A must be between 1 and 10, so put the point after the first digit: A = 4.5.",
            "45 000 000 has 8 digits, so 7 digits come after the 4. That means n = 7.",
            "45 000 000 = {{4.5 * 10^7}}.",
            "Check: {{4.5 * 10^7}} = 4.5 × 10 000 000 = 45 000 000. ✓",
          ],
          answer: "{{4.5 * 10^7}}",
          yourTurn: {
            question: "Your turn: write 360 000 in standard form.",
            answer: { type: "number", value: 360000, standardForm: true, display: "{{3.6 * 10^5}}" },
            solution: "A = 3.6. 360 000 has 6 digits, so 5 come after the 3: 360 000 = {{3.6 * 10^5}}.",
          },
        },
        {
          title: "Standard form to an ordinary number",
          problem: "The Moon is about {{3.84 * 10^5}} km from the Earth. Write this distance as an ordinary number.",
          steps: [
            "{{10^5}} = 100 000, so work out 3.84 × 100 000.",
            "Move the digits of 3.84 five places left: 38.4, 384, 3840, 38 400, 384 000.",
            "The Moon is about 384 000 km away.",
          ],
          answer: "384 000 km",
        },
        {
          title: "Repairing a number that is not in standard form",
          problem:
            "A phone has 256 GB of storage. One gigabyte is {{10^9}} bytes, so the phone holds {{256 * 10^9}} bytes. Write this number in standard form.",
          steps: [
            "256 is not between 1 and 10, so write 256 itself in standard form: 256 = {{2.56 * 10^2}}.",
            "So {{256 * 10^9 = 2.56 * 10^2 * 10^9}}.",
            "Add the indices: {{10^2 * 10^9 = 10^11}}.",
            "The phone holds {{2.56 * 10^11}} bytes.",
          ],
          answer: "{{2.56 * 10^11}} bytes",
        },
      ],
      keyPoints: [
        "Standard form is {{A * 10^n}} with {{1 <= A < 10}} and n an integer.",
        "For a number of 10 or more, n = (number of digits in the whole-number part) − 1.",
        "If A is 10 or more, divide A by 10 and add 1 to the power.",
        "Always check by converting back to an ordinary number.",
      ],
      whyItWorks:
        "Standard form simply splits a number into *digits × size*: 45 000 000 = 4.5 × 10 000 000, and 10 000 000 = {{10^7}}. Insisting on {{1 <= A < 10}} means every number has exactly **one** standard-form name, so the power alone tells you the size. Any number {{A * 10^7}} is at least 10 000 000 and less than 100 000 000 — it has 8 digits before the decimal point.",
      strategies: ["Count the places", "Check by converting back", "Estimate first (how many digits?)"],
      thinkDeeper:
        "A whole number written in standard form has power 6. What is the smallest it could be? What is the largest whole number it could be? Explain how the power tells you exactly how many digits the number has.",
    },
    // -----------------------------------------------------------------------
    {
      id: "small-numbers",
      heading: "Standard form for small numbers",
      discovery: {
        problem:
          "A red blood cell is about 0.000 008 m across. Write 0.000 008 as 8 divided by a power of 10. Then use what you know about negative powers to write it as 8 × {{10^?}}.",
        idea:
          "0.000 008 is 8 millionths, so 0.000 008 = 8 ÷ 1 000 000 = 8 ÷ {{10^6}}. Dividing by {{10^6}} is the same as multiplying by {{10^(-6)}}, so the cell is {{8 * 10^(-6)}} m across. Numbers between 0 and 1 use **negative** powers.",
      },
      body:
        "Standard form works for tiny numbers too. The rule is the same — {{A * 10^n}} with {{1 <= A < 10}} — but for numbers between 0 and 1 the power n is **negative**.\n\n**Converting a small number to standard form**\n\n1. Find the first non-zero digit and put the decimal point just after it to get A. For 0.000 52, A = 5.2.\n2. Count how many places the point moved to the right. From 0.000 52 to 5.2 it moves 4 places, so n = −4.\n3. Write {{5.2 * 10^(-4)}}, then check: 5.2 ÷ 10 000 = 0.000 52. ✓\n\nA quick way to find n: count the zeros in front of the first non-zero digit, **including** the zero before the decimal point. 0.000 52 has four of them, so n = −4.\n\n**Converting back:** {{2.6 * 10^(-3)}} means 2.6 ÷ 1000. Move the digits of 2.6 three places right: 0.0026.\n\n| Thing | Size in metres | Standard form |\n|---|---|---|\n| Ladybird | 0.005 | {{5 * 10^(-3)}} |\n| Width of a human hair | 0.000 08 | {{8 * 10^(-5)}} |\n| Red blood cell | 0.000 008 | {{8 * 10^(-6)}} |\n| Typical virus | 0.000 000 1 | {{1 * 10^(-7)}} |\n| Atom | 0.000 000 000 1 | {{1 * 10^(-10)}} |\n\n> The sign of the **power** tells you big or small. The sign of **A** tells you positive or negative. {{3 * 10^(-2)}} = 0.03 is small but positive; −0.03 = {{-3 * 10^(-2)}}.\n\nTiny times work the same way: a camera flash lasts about {{1 * 10^(-3)}} s (a millisecond), and light crosses a 30 cm ruler in about {{1 * 10^(-9)}} s (a nanosecond).",
      diagram: `<svg viewBox="0 0 480 172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A zoom scale in metres marked with powers of ten from 10 to the 0 down to 10 to the minus 10, each step ten times smaller. Marked on it: ladybird 5 times 10 to the minus 3 metres, hair width 8 times 10 to the minus 5, red blood cell 8 times 10 to the minus 6, virus 1 times 10 to the minus 7, atom 1 times 10 to the minus 10."><rect x="0" y="0" width="480" height="172" fill="#ffffff"/><line x1="24" y1="110" x2="432" y2="110" stroke="#1f2937" stroke-width="2"/><g stroke="#1f2937" stroke-width="1.5"><line x1="24" y1="104" x2="24" y2="116"/><line x1="64" y1="104" x2="64" y2="116"/><line x1="104" y1="104" x2="104" y2="116"/><line x1="144" y1="104" x2="144" y2="116"/><line x1="184" y1="104" x2="184" y2="116"/><line x1="224" y1="104" x2="224" y2="116"/><line x1="264" y1="104" x2="264" y2="116"/><line x1="304" y1="104" x2="304" y2="116"/><line x1="344" y1="104" x2="344" y2="116"/><line x1="384" y1="104" x2="384" y2="116"/><line x1="424" y1="104" x2="424" y2="116"/></g><g font-size="10" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="24" y="130">10⁰</text><text x="64" y="130">10⁻¹</text><text x="104" y="130">10⁻²</text><text x="144" y="130">10⁻³</text><text x="184" y="130">10⁻⁴</text><text x="224" y="130">10⁻⁵</text><text x="264" y="130">10⁻⁶</text><text x="304" y="130">10⁻⁷</text><text x="344" y="130">10⁻⁸</text><text x="384" y="130">10⁻⁹</text><text x="424" y="130">10⁻¹⁰</text></g><text x="440" y="114" font-size="11" font-family="sans-serif" fill="#334155">m</text><g stroke="#64748b" stroke-width="1" stroke-dasharray="3 2"><line x1="116" y1="46" x2="116" y2="105"/><line x1="188" y1="82" x2="188" y2="105"/><line x1="228" y1="46" x2="228" y2="105"/><line x1="304" y1="82" x2="304" y2="105"/><line x1="424" y1="46" x2="424" y2="105"/></g><g stroke="#1f2937" stroke-width="1.2"><circle cx="116" cy="110" r="4.5" fill="#fecaca"/><circle cx="188" cy="110" r="4.5" fill="#fde68a"/><circle cx="228" cy="110" r="4.5" fill="#fecaca"/><circle cx="304" cy="110" r="4.5" fill="#bbf7d0"/><circle cx="424" cy="110" r="4.5" fill="#bae6fd"/></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="116" y="26" font-weight="bold">ladybird</text><text x="116" y="40">5 × 10⁻³ m</text><text x="228" y="26" font-weight="bold">red blood cell</text><text x="228" y="40">8 × 10⁻⁶ m</text><text x="424" y="26" font-weight="bold">atom</text><text x="424" y="40">1 × 10⁻¹⁰ m</text><text x="188" y="62" font-weight="bold">hair width</text><text x="188" y="76">8 × 10⁻⁵ m</text><text x="304" y="62" font-weight="bold">virus</text><text x="304" y="76">1 × 10⁻⁷ m</text></g><text x="228" y="158" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Each step to the right is 10 times smaller (a powers-of-10 scale).</text></svg>`,
      diagramCaption:
        "A zoom scale: each mark is 10 times smaller than the one before, so every equal step along the line means *dividing by 10* again, not taking away the same length. Standard form lets a ladybird and an atom share the same page.",
      workedExamples: [
        {
          title: "Small number to standard form",
          problem: "Write 0.000 52 in standard form.",
          steps: [
            "The first non-zero digit is 5, so A = 5.2.",
            "From 0.000 52 to 5.2 the point moves 4 places to the right, so n = −4.",
            "0.000 52 = {{5.2 * 10^(-4)}}.",
            "Check: {{5.2 * 10^(-4)}} = 5.2 ÷ 10 000 = 0.000 52. ✓",
          ],
          answer: "{{5.2 * 10^(-4)}}",
          yourTurn: {
            question: "Your turn: write 0.0067 in standard form.",
            answer: { type: "number", value: 0.0067, standardForm: true, display: "{{6.7 * 10^(-3)}}" },
            solution: "A = 6.7. From 0.0067 to 6.7 the point moves 3 places right, so n = −3: 0.0067 = {{6.7 * 10^(-3)}}.",
          },
        },
        {
          title: "Standard form to an ordinary number",
          problem: "A grain of pollen is {{3.08 * 10^(-5)}} m across. Write this as an ordinary number.",
          steps: [
            "{{10^(-5)}} means divide by 100 000, so the digits of 3.08 move 5 places right.",
            "One place at a time: 0.308, 0.0308, 0.003 08, 0.000 308, 0.000 030 8.",
            "The pollen grain is 0.000 030 8 m across. Notice the place-holder zero after the 3 is kept.",
          ],
          answer: "0.000 030 8 m",
        },
        {
          title: "A is too small",
          problem: "Write {{0.45 * 10^(-3)}} in standard form.",
          steps: [
            "0.45 is not between 1 and 10, so write it in standard form first: 0.45 = {{4.5 * 10^(-1)}}.",
            "So {{0.45 * 10^(-3) = 4.5 * 10^(-1) * 10^(-3)}}.",
            "Add the indices: −1 + (−3) = −4.",
            "{{0.45 * 10^(-3) = 4.5 * 10^(-4)}}. Check: 0.45 ÷ 1000 = 0.000 45 = {{4.5 * 10^(-4)}}. ✓",
          ],
          answer: "{{4.5 * 10^(-4)}}",
        },
      ],
      keyPoints: [
        "Numbers between 0 and 1 have a negative power in standard form.",
        "n is minus the number of places the point moves right to make A.",
        "A negative power means small, not negative: {{4 * 10^(-3)}} = 0.004.",
        "When converting back, keep the place-holder zeros: {{3.08 * 10^(-5)}} = 0.000 030 8.",
      ],
      whyItWorks:
        "A negative power means divide: {{10^(-4) = 1/10^4}}. So\n\n    {{5.2 * 10^(-4) = 5.2 ÷ 10^4 = 5.2 ÷ 10000 = 0.00052}}\n\nDividing by 10 000 slides the digits 4 places to the right — exactly undoing the 4 places the point moved when you made A.",
      strategies: ["Count the places", "Check by converting back", "Make it simpler (fix A first, then the power)"],
      thinkDeeper:
        "Siti says, \"A negative power makes the number negative.\" Write {{3 * 10^(-2)}} and {{-3 * 10^(-2)}} as ordinary numbers. What does the sign of A control, and what does the sign of the power control? Is there a number in standard form where both are negative?",
    },
    // -----------------------------------------------------------------------
    {
      id: "comparing-standard-form",
      heading: "Comparing and ordering in standard form",
      discovery: {
        problem:
          "Jun says {{9.9 * 10^4}} is bigger than {{1.1 * 10^5}} because 9.9 is bigger than 1.1. Write both as ordinary numbers. Is Jun right? Can you find a rule that works *without* converting?",
        idea:
          "{{9.9 * 10^4}} = 99 000 but {{1.1 * 10^5}} = 110 000, so Jun is wrong. Every number written {{A * 10^5}} is at least 100 000, while every number written {{A * 10^4}} is less than 100 000. So for positive numbers in standard form, **the bigger power wins**. Only when the powers are equal do you compare A.",
      },
      body:
        "To compare positive numbers in standard form:\n\n1. **Compare the powers first.** The larger power gives the larger number.\n2. **If the powers are equal, compare A.** For example, {{6.1 * 10^7}} > {{5.8 * 10^7}}.\n\nTake care with negative powers: −3 is greater than −5, so {{10^(-3)}} > {{10^(-5)}}. That means {{2 * 10^(-3)}} = 0.002 is bigger than {{9 * 10^(-5)}} = 0.000 09.\n\n> Both numbers must really be in standard form before you use the rule. {{25 * 10^3}} is not in standard form; rewrite it as {{2.5 * 10^4}} first.\n\n**Ordering a list:** sort by power first, then sort each group with the same power by A.\n\n**Reading a calculator display.** When an answer is too long for the screen, a calculator switches to standard form, but it may not show the × 10 part in full:\n\n| Display | Meaning | Ordinary number |\n|---|---|---|\n| `3.2E4` or `3.2E+04` | {{3.2 * 10^4}} | 32 000 |\n| `2.5E-07` | {{2.5 * 10^(-7)}} | 0.000 000 25 |\n| `4.7×10⁹` | {{4.7 * 10^9}} | 4 700 000 000 |\n\nThe E stands for *exponent* (the power of 10). It does **not** mean {{3.2^4}}. In a written answer, always write standard form properly — {{3.2 * 10^4}}, never 3.2E4.",
      diagram: `<svg viewBox="0 0 480 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 120000 in steps of 20000. Points mark 2.5 times 10 to the 4 at 25000, 9.9 times 10 to the 4 at 99000 and 1.1 times 10 to the 5 at 110000. A blue band underneath runs from 10000 to 100000 for numbers with power 4, and a yellow band starts at 100000 for numbers with power 5."><defs><marker id="sf-nl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1f2937"/></marker></defs><rect x="0" y="0" width="480" height="190" fill="#ffffff"/><line x1="30" y1="110" x2="466" y2="110" stroke="#1f2937" stroke-width="2" marker-end="url(#sf-nl-arrow)"/><g stroke="#1f2937" stroke-width="1.5"><line x1="30" y1="104" x2="30" y2="116"/><line x1="100" y1="104" x2="100" y2="116"/><line x1="170" y1="104" x2="170" y2="116"/><line x1="240" y1="104" x2="240" y2="116"/><line x1="310" y1="104" x2="310" y2="116"/><line x1="380" y1="104" x2="380" y2="116"/><line x1="450" y1="104" x2="450" y2="116"/></g><g font-size="10" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="30" y="130">0</text><text x="100" y="130">20 000</text><text x="170" y="130">40 000</text><text x="240" y="130">60 000</text><text x="310" y="130">80 000</text><text x="380" y="130">100 000</text><text x="450" y="130">120 000</text></g><rect x="65" y="140" width="315" height="14" fill="#bae6fd" stroke="#334155" stroke-width="1"/><rect x="380" y="140" width="86" height="14" fill="#fde68a" stroke="#334155" stroke-width="1"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="222" y="172">every A × 10⁴ lives here: 10 000 up to 100 000</text><text x="423" y="172">A × 10⁵ →</text></g><g stroke="#64748b" stroke-width="1" stroke-dasharray="3 2"><line x1="117.5" y1="66" x2="117.5" y2="104"/><line x1="345" y1="66" x2="376.5" y2="104"/><line x1="440" y1="66" x2="415" y2="104"/></g><g stroke="#1f2937" stroke-width="1.2"><circle cx="117.5" cy="110" r="5" fill="#fde68a"/><circle cx="376.5" cy="110" r="5" fill="#fecaca"/><circle cx="415" cy="110" r="5" fill="#bbf7d0"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="117.5" y="46" font-size="12" font-weight="bold">2.5 × 10⁴</text><text x="117.5" y="60" font-size="11">= 25 000</text><text x="345" y="46" font-size="12" font-weight="bold">9.9 × 10⁴</text><text x="345" y="60" font-size="11">= 99 000</text><text x="440" y="46" font-size="12" font-weight="bold">1.1 × 10⁵</text><text x="440" y="60" font-size="11">= 110 000</text></g></svg>`,
      diagramCaption:
        "{{9.9 * 10^4}} (99 000) sits just short of 100 000, where the {{10^5}} band begins — so {{1.1 * 10^5}} (110 000) is bigger, even though 1.1 < 9.9.",
      workedExamples: [
        {
          title: "Ordering large numbers",
          problem:
            "Write these numbers in order, smallest first: {{4.2 * 10^5}}, {{3.9 * 10^6}}, {{8.1 * 10^5}}, {{2.7 * 10^4}}.",
          steps: [
            "Sort by power: {{10^4}} is the smallest power, then the two numbers with {{10^5}}, then {{10^6}}.",
            "The two {{10^5}} numbers: compare A. 4.2 < 8.1, so {{4.2 * 10^5}} < {{8.1 * 10^5}}.",
            "Order: {{2.7 * 10^4}}, {{4.2 * 10^5}}, {{8.1 * 10^5}}, {{3.9 * 10^6}}.",
            "Check with ordinary numbers: 27 000 < 420 000 < 810 000 < 3 900 000. ✓",
          ],
          answer: "{{2.7 * 10^4}}, {{4.2 * 10^5}}, {{8.1 * 10^5}}, {{3.9 * 10^6}}",
          yourTurn: {
            question:
              "Your turn: which is the largest of {{5.2 * 10^7}}, {{9.8 * 10^6}}, {{1.4 * 10^7}} and {{5.9 * 10^6}}? Give your answer in standard form.",
            answer: { type: "number", value: 52000000, standardForm: true, display: "{{5.2 * 10^7}}" },
            solution:
              "The highest power is {{10^7}}, shared by {{5.2 * 10^7}} and {{1.4 * 10^7}}. Compare A: 5.2 > 1.4, so the largest is {{5.2 * 10^7}}. (Don't be fooled by the 9.8 — it only has power 6.)",
          },
        },
        {
          title: "Ordering small numbers",
          problem:
            "Four measurements from a microscope, in metres, are {{3.5 * 10^(-4)}}, {{6 * 10^(-5)}}, {{1.2 * 10^(-4)}} and {{2 * 10^(-3)}}. Put them in order, smallest first.",
          steps: [
            "Order the powers: −5 < −4 < −3.",
            "So {{6 * 10^(-5)}} is the smallest and {{2 * 10^(-3)}} is the largest.",
            "The two {{10^(-4)}} numbers: compare A. 1.2 < 3.5.",
            "Order: {{6 * 10^(-5)}}, {{1.2 * 10^(-4)}}, {{3.5 * 10^(-4)}}, {{2 * 10^(-3)}}.",
            "Check: 0.000 06 < 0.000 12 < 0.000 35 < 0.002. ✓",
          ],
          answer: "{{6 * 10^(-5)}}, {{1.2 * 10^(-4)}}, {{3.5 * 10^(-4)}}, {{2 * 10^(-3)}}",
        },
        {
          title: "Reading a calculator display",
          problem:
            "Priya works out 0.0006 × 0.000 04 on her calculator. The screen shows `2.4E-08`. Write the answer in standard form and as an ordinary number.",
          steps: [
            "E-08 means × {{10^(-8)}}, so the answer is {{2.4 * 10^(-8)}}.",
            "As an ordinary number, move the digits of 2.4 eight places right: 0.000 000 024.",
            "Sense check: {{6 * 10^(-4) * 4 * 10^(-5) = 24 * 10^(-9)}}, which is {{2.4 * 10^(-8)}}. ✓",
          ],
          answer: "{{2.4 * 10^(-8)}} = 0.000 000 024",
        },
      ],
      keyPoints: [
        "Compare the powers first: for positive numbers, the bigger power means the bigger number.",
        "With negative powers, the one closer to zero is bigger: {{10^(-3)}} > {{10^(-6)}}.",
        "Same power? Then compare A.",
        "A calculator display like 6.2E5 means {{6.2 * 10^5}} — write it that way in your answer.",
      ],
      whyItWorks:
        "Because {{1 <= A < 10}}, every positive number with power n is trapped in a band:\n\n    {{10^n <= A * 10^n < 10^(n+1)}}\n\nThe band for power n ends exactly where the band for power n + 1 begins, so a number with a bigger power is always bigger, whatever its A. This is the real reason standard form insists on 1 ≤ A < 10 — without it, a number like {{25 * 10^3}} would sit in the wrong band and fool the rule.",
      strategies: ["Compare powers first", "Consider extremes (the biggest A with the smaller power)", "Check by converting back"],
      thinkDeeper:
        "The rule \"bigger power means bigger number\" is for positive numbers. Test it on {{-2 * 10^5}} and {{-3 * 10^4}}. Which is bigger? Write a rule for comparing negative numbers in standard form, and explain why it is the opposite way round.",
    },
    // -----------------------------------------------------------------------
    {
      id: "calculating-standard-form",
      heading: "Calculating in standard form",
      discovery: {
        problem:
          "Light travels at {{3 * 10^8}} metres per second, and sunlight takes about 500 seconds ({{5 * 10^2}} s) to reach the Earth. Without a calculator, how far away is the Sun in metres? Try to keep your working in standard form.",
        idea:
          "Distance = speed × time = {{(3 * 10^8) * (5 * 10^2)}}. Multiplication can be done in any order, so group the numbers and the powers: (3 × 5) × ({{10^8 * 10^2}}) = {{15 * 10^10}}. But 15 is not between 1 and 10, so re-normalise: 15 = {{1.5 * 10^1}}, giving {{1.5 * 10^11}} m. That is 150 000 000 km — the same distance you met in the large-numbers section.",
      },
      body:
        "**Stretch:** this is Year 9 content, but if you are confident with the index laws it is very satisfying — big calculations collapse into a few small steps.\n\n**Multiplying:** multiply the A parts and add the powers.\n\n    {{(a * 10^m) * (b * 10^n) = (a * b) * 10^(m+n)}}\n\n**Dividing:** divide the A parts and subtract the powers.\n\n    {{(a * 10^m) ÷ (b * 10^n) = (a ÷ b) * 10^(m-n)}}\n\n**Then re-normalise.** The new A may not be between 1 and 10, so move a factor of 10 into the power:\n\n- A too big: {{24 * 10^8 = 2.4 * 10^9}} (divide A by 10, add 1 to the power).\n- A too small: {{0.3 * 10^5 = 3 * 10^4}} (multiply A by 10, subtract 1 from the power).\n\n**Adding and subtracting:** you **cannot** simply add the powers. {{2 * 10^3 + 3 * 10^3}} is 2000 + 3000 = 5000 = {{5 * 10^3}}, not {{5 * 10^6}}. The safest method is to convert to ordinary numbers (or to the same power of 10), add or subtract, then convert back:\n\n    {{6.2 * 10^5 + 4.5 * 10^4}} = 620 000 + 45 000 = 665 000 = {{6.65 * 10^5}}\n\nOn a calculator, type standard form with the ×10ˣ key (called EXP or EE on some calculators), then read the display as in the previous section.",
      diagram: `<svg viewBox="0 0 480 228" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flow diagram. (3 times 10 to the 8) times (5 times 10 to the 2) splits into a numbers box, 3 times 5 equals 15, and a powers box, 10 to the 8 times 10 to the 2 equals 10 to the 10. These combine to 15 times 10 to the 10, which is re-normalised to 1.5 times 10 to the 11."><defs><marker id="sf-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs><rect x="0" y="0" width="480" height="228" fill="#ffffff"/><text x="240" y="28" font-size="16" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">(3 × 10⁸) × (5 × 10²)</text><g stroke="#334155" stroke-width="1.5" fill="none" marker-end="url(#sf-flow-arrow)"><line x1="200" y1="38" x2="140" y2="62"/><line x1="280" y1="38" x2="340" y2="62"/><line x1="125" y1="122" x2="138" y2="146"/><line x1="355" y1="122" x2="190" y2="148"/><line x1="200" y1="166" x2="292" y2="166"/></g><rect x="40" y="64" width="170" height="56" rx="8" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="270" y="64" width="170" height="56" rx="8" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="125" y="83" font-size="11">multiply the numbers</text><text x="125" y="108" font-size="16" font-weight="bold">3 × 5 = 15</text><text x="355" y="83" font-size="11">add the powers: 8 + 2</text><text x="355" y="108" font-size="16" font-weight="bold">10⁸ × 10² = 10¹⁰</text><text x="140" y="172" font-size="18" font-weight="bold">15 × 10¹⁰</text><text x="246" y="158" font-size="11" fill="#334155">re-normalise</text></g><rect x="300" y="146" width="150" height="36" rx="8" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><text x="375" y="171" font-size="18" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">1.5 × 10¹¹</text><text x="240" y="212" font-size="12" font-family="sans-serif" fill="#334155" text-anchor="middle">15 is too big for A: 15 = 1.5 × 10¹, so the power goes up by 1.</text></svg>`,
      diagramCaption:
        "Group the numbers and the powers separately, then re-normalise so that A is between 1 and 10.",
      workedExamples: [
        {
          title: "Multiplying",
          problem: "Work out {{(4 * 10^3) * (6 * 10^5)}}. Give your answer in standard form.",
          steps: [
            "Multiply the numbers: 4 × 6 = 24.",
            "Add the powers: {{10^3 * 10^5 = 10^8}}.",
            "So the product is {{24 * 10^8}}.",
            "Re-normalise: 24 = {{2.4 * 10^1}}, so the answer is {{2.4 * 10^9}}.",
          ],
          answer: "{{2.4 * 10^9}}",
          yourTurn: {
            question: "Your turn: work out {{(3 * 10^4) * (7 * 10^2)}}. Give your answer in standard form.",
            answer: { type: "number", value: 21000000, standardForm: true, display: "{{2.1 * 10^7}}" },
            solution: "3 × 7 = 21 and {{10^4 * 10^2 = 10^6}}, giving {{21 * 10^6}}. Re-normalise: {{2.1 * 10^7}}.",
          },
        },
        {
          title: "Dividing, with a negative power",
          problem: "Work out {{(1.2 * 10^3) ÷ (4 * 10^(-2))}}. Give your answer in standard form.",
          steps: [
            "Divide the numbers: 1.2 ÷ 4 = 0.3.",
            "Subtract the powers: 3 − (−2) = 5, so {{10^3 ÷ 10^(-2) = 10^5}}.",
            "That gives {{0.3 * 10^5}}.",
            "Re-normalise: 0.3 = {{3 * 10^(-1)}}, so the answer is {{3 * 10^4}}.",
            "Check with ordinary numbers: 1200 ÷ 0.04 = 30 000. ✓",
          ],
          answer: "{{3 * 10^4}}",
        },
        {
          title: "Adding",
          problem:
            "A city has a population of {{6.2 * 10^5}}. Over the next five years another {{4.5 * 10^4}} people move in. Find the new population in standard form.",
          steps: [
            "The powers are different, so you cannot just add the A parts.",
            "Convert: {{6.2 * 10^5}} = 620 000 and {{4.5 * 10^4}} = 45 000.",
            "Add: 620 000 + 45 000 = 665 000.",
            "Convert back: 665 000 = {{6.65 * 10^5}}.",
            "Another way: write {{4.5 * 10^4 = 0.45 * 10^5}}. Now the powers match, so 6.2 + 0.45 = 6.65, giving {{6.65 * 10^5}}.",
          ],
          answer: "{{6.65 * 10^5}} people",
        },
      ],
      keyPoints: [
        "Multiply: multiply the A parts and add the powers.",
        "Divide: divide the A parts and subtract the powers.",
        "Always re-normalise at the end so that {{1 <= A < 10}}.",
        "Add or subtract by converting to ordinary numbers (or to the same power) first — never add the powers.",
      ],
      whyItWorks:
        "Multiplication can be done in any order (it is *commutative* and *associative*), so you are allowed to regroup:\n\n    {{(4 * 10^3) * (6 * 10^5) = (4 * 6) * (10^3 * 10^5)}}\n\nand {{10^3 * 10^5}} is three tens times five tens, which is eight tens multiplied together: {{10^8}}. Addition has no such trick: {{10^2 + 10^3}} = 100 + 1000 = 1100, which is nowhere near {{10^5}}.",
      strategies: ["Group the numbers and the powers", "Estimate first", "Check by converting back"],
      thinkDeeper:
        "{{4 * 10^5}} is multiplied by another number in standard form, and the answer (in standard form) has power 9. What could the other number's power be? Is there more than one possibility? (Think about when 4 × A needs re-normalising.)",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is standard form?", back: "{{A * 10^n}}, where {{1 <= A < 10}} and n is an integer." },
      { front: "{{10^0}} = ?", back: "1" },
      { front: "{{10^(-3)}} as a fraction and as a decimal", back: "{{1/1000}} = 0.001" },
      { front: "× 0.1 is the same as …", back: "÷ 10 (every digit moves 1 place right)" },
      { front: "÷ 0.01 is the same as …", back: "× 100 (every digit moves 2 places left)" },
      { front: "Write 4 500 000 in standard form.", back: "{{4.5 * 10^6}}" },
      { front: "Write 0.000 72 in standard form.", back: "{{7.2 * 10^(-4)}}" },
      { front: "Write {{3.1 * 10^(-2)}} as an ordinary number.", back: "0.031" },
      { front: "Write {{6.05 * 10^4}} as an ordinary number.", back: "60 500" },
      { front: "A calculator shows 6.2E5. What does it mean?", back: "{{6.2 * 10^5}} = 620 000" },
      { front: "Which is bigger: {{2 * 10^(-3)}} or {{9 * 10^(-4)}}?", back: "{{2 * 10^(-3)}}, because −3 > −4 (0.002 > 0.0009)." },
      { front: "Is {{23 * 10^4}} in standard form?", back: "No — A must be less than 10. It is {{2.3 * 10^5}}." },
      { front: "Is {{10^(-2)}} a negative number?", back: "No. {{10^(-2) = 1/100}} = 0.01: small, but positive." },
      { front: "{{10^a * 10^b}} = ?   and   {{10^a ÷ 10^b}} = ?", back: "{{10^(a+b)}} and {{10^(a-b)}}" },
      { front: "Stretch: {{(2 * 10^3) * (4 * 10^5)}}", back: "{{8 * 10^8}}" },
      { front: "Stretch: {{(9 * 10^7) ÷ (3 * 10^2)}}", back: "{{3 * 10^5}}" },
    ],
    mustKnow: [
      "I can multiply and divide by 10, 100, 0.1 and 0.01 by moving digits across the place-value columns.",
      "I can explain why × 0.1 is the same as ÷ 10, and ÷ 0.01 is the same as × 100.",
      "I can write positive and negative powers of 10 as ordinary numbers and fractions, including {{10^0 = 1}}.",
      "I can label place-value columns as powers of 10, from thousands to thousandths.",
      "I can write a large number in standard form and convert it back.",
      "I can write a number between 0 and 1 in standard form and convert it back.",
      "I can spot a number that is not in standard form, such as {{34 * 10^2}}, and repair it.",
      "I can compare and order numbers in standard form by looking at the power first, then A.",
      "I can read a calculator display such as 3.2E-05 and write it properly as {{3.2 * 10^(-5)}}.",
      "I can use standard form for real quantities like planet distances, cell sizes and data storage.",
      "Stretch: I can multiply and divide in standard form without a calculator, then re-normalise.",
      "Stretch: I can add and subtract numbers in standard form by converting them first.",
    ],
    misconceptions: [
      {
        wrong: "To multiply by 10, add a zero: 3.5 × 10 = 3.50.",
        right: "The digits move one place left: 3.5 × 10 = 35. Putting a zero on the end of a decimal changes nothing — 3.50 is still 3.5.",
      },
      {
        wrong: "Multiplying always makes a number bigger, so 60 × 0.1 must be more than 60.",
        right: "Multiplying a positive number by something between 0 and 1 makes it smaller: 60 × 0.1 = 6, the same as 60 ÷ 10.",
      },
      {
        wrong: "{{10^(-2)}} is a negative number, like −100.",
        right: "{{10^(-2) = 1/100}} = 0.01. A negative power means divide by that power of 10 — the result is small but still positive.",
      },
      {
        wrong: "{{10^0 = 0}}, because there are no tens.",
        right: "{{10^0 = 1}}. Follow the pattern 1000, 100, 10, … — dividing by 10 each time, the next value is 1.",
      },
      {
        wrong: "{{34 * 10^5}} is in standard form.",
        right: "A must satisfy {{1 <= A < 10}}, and 34 is too big. {{34 * 10^5 = 3.4 * 10^6}}.",
      },
      {
        wrong: "{{9 * 10^4}} is bigger than {{1 * 10^5}} because 9 is bigger than 1.",
        right: "Compare the powers first: {{1 * 10^5}} = 100 000, which is bigger than {{9 * 10^4}} = 90 000.",
      },
    ],
    examMistakes: [
      "Counting zeros instead of places for large numbers: 45 000 has three zeros but is {{4.5 * 10^4}}, not {{4.5 * 10^3}}.",
      "Leaving A outside 1 to 10 after a calculation, e.g. giving {{24 * 10^8}} instead of {{2.4 * 10^9}}.",
      "Using a positive power for a small number: 0.003 is {{3 * 10^(-3)}}, not {{3 * 10^3}}.",
      "Copying a calculator display such as 2.4E-08 as the final answer, or writing it as {{2.4^(-8)}}. Write {{2.4 * 10^(-8)}}.",
      "Comparing the A values before the powers when ordering numbers in standard form.",
      "Adding the powers when adding numbers: {{2 * 10^3 + 3 * 10^3}} is {{5 * 10^3}}, not {{5 * 10^6}}.",
      "Re-normalising the wrong way: {{0.3 * 10^5}} is {{3 * 10^4}}, not {{3 * 10^6}}.",
      "Dropping place-holder zeros when converting back: {{3.08 * 10^(-5)}} is 0.000 030 8, not 0.000 308.",
    ],
    mnemonics: [
      {
        topic: "Which sign for the power?",
        device: "Big → plus, tiny → minus",
        explanation:
          "Numbers of 10 or more get a positive power; numbers between 0 and 1 get a negative power; numbers from 1 up to (but not including) 10 get power 0, e.g. {{7 * 10^0}}.",
      },
      {
        topic: "Writing A",
        device: "One digit, then the point",
        explanation: "A always has exactly one non-zero digit in front of the decimal point: 4.5, 7.08, 1.2 — never 45 or 0.45.",
      },
      {
        topic: "Comparing numbers in standard form",
        device: "Floor first, then the flat (the HDB rule)",
        explanation:
          "In an HDB address like #12-05, the floor number (12) tells you how high up you are; the unit number (05) only matters between flats on the same floor. The power is the floor and A is the unit number: compare powers first, and A only if the powers match.",
      },
      {
        topic: "Index laws (stretch)",
        device: "MADS: Multiply → Add, Divide → Subtract",
        explanation: "Multiplying powers of 10 adds the indices and dividing subtracts them: {{10^3 * 10^5 = 10^8}} and {{10^7 ÷ 10^2 = 10^5}}.",
      },
    ],
    realWorld: [
      {
        title: "Space distances",
        detail: "The Sun is about {{1.5 * 10^8}} km from the Earth, and Neptune is about {{4.5 * 10^9}} km from the Sun. Astronomers would be lost without standard form.",
        emoji: "🪐",
      },
      {
        title: "Cells and microscopes",
        detail: "A red blood cell is about {{8 * 10^(-6)}} m across, yet an adult has roughly {{2.5 * 10^13}} of them — a tiny size and an enormous count in one fact.",
        emoji: "🔬",
      },
      {
        title: "Data storage",
        detail: "1 gigabyte is {{10^9}} bytes and 1 terabyte is {{10^12}} bytes, so a 256 GB phone holds about {{2.56 * 10^11}} bytes.",
        emoji: "💾",
      },
      {
        title: "Populations",
        detail: "About {{8.2 * 10^9}} people live on Earth; about {{6 * 10^6}} of them live in Singapore.",
        emoji: "🌏",
      },
      {
        title: "Computer speed",
        detail: "A 3 GHz processor ticks {{3 * 10^9}} times every second, so each tick lasts only about {{3.3 * 10^(-10)}} s.",
        emoji: "⚡",
      },
      {
        title: "Monsoon rain",
        detail: "Singapore's land area is about 735 km², roughly {{7.35 * 10^8}} m². A 50 mm downpour over the whole island adds up to about {{3.7 * 10^7}} m³ of water.",
        emoji: "🌧️",
      },
    ],
    videos: [
      { title: "Standard form", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+standard+form" },
      {
        title: "Multiplying and dividing by 0.1 and 0.01",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+multiplying+and+dividing+by+0.1+and+0.01",
      },
      { title: "Scientific notation", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+scientific+notation" },
      { title: "Powers of Ten (the classic 1977 film)", channel: "Eames Office", url: "https://www.youtube.com/results?search_query=powers+of+ten+eames+1977" },
    ],
    formulas: [
      {
        name: "Standard form",
        formula: "{{A * 10^n}}, where {{1 <= A < 10}} and n is an integer",
        note: "n is positive for numbers of 10 or more and negative for numbers between 0 and 1.",
      },
      { name: "Zero power", formula: "{{10^0 = 1}}" },
      { name: "Negative powers", formula: "{{10^(-n) = 1/10^n}}", note: "For example, {{10^(-2) = 1/100}} = 0.01." },
      { name: "Multiplying and dividing by 0.1 and 0.01", formula: "× 0.1 = ÷ 10,   × 0.01 = ÷ 100,   ÷ 0.1 = × 10,   ÷ 0.01 = × 100" },
      { name: "Index laws for powers of 10", formula: "{{10^a * 10^b = 10^(a+b)}},   {{10^a ÷ 10^b = 10^(a-b)}}" },
      {
        name: "Multiplying in standard form (stretch)",
        formula: "{{(a * 10^m) * (b * 10^n) = ab * 10^(m+n)}}",
        note: "Re-normalise if ab is 10 or more.",
      },
      {
        name: "Dividing in standard form (stretch)",
        formula: "{{(a * 10^m) ÷ (b * 10^n) = (a/b) * 10^(m-n)}}",
        note: "Re-normalise if {{a/b < 1}}.",
      },
    ],
  },
};
