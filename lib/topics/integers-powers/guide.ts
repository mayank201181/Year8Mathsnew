import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "integers-powers",
  title: "Integers, Powers & Roots",
  strand: "Number",
  icon: "🌡️",
  summary: "Signs, powers and roots — the rules every calculation obeys, and why they work.",
  intro:
    "Integers are the whole numbers — positive, negative and zero — and powers are shorthand for multiplying a number by itself again and again. In this chapter you will *derive* the sign rules and the index laws from patterns rather than just memorising them, learn the order of operations that every calculator obeys, and meet numbers that can never be written as fractions. Almost every other topic in maths quietly relies on these tools.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "adding-subtracting-negatives",
      heading: "Adding & subtracting negative numbers",
      discovery: {
        problem:
          "Continue this pattern for two more lines:\n\n5 − 3 = 2\n5 − 2 = 3\n5 − 1 = 4\n5 − 0 = 5\n5 − (−1) = ?\n5 − (−2) = ?\n\nWhat do you notice? What does it suggest about subtracting a negative number?",
        idea:
          "Each time the number being subtracted goes down by 1, the answer goes **up** by 1. So 5 − (−1) = 6 and 5 − (−2) = 7. Subtracting a negative number has exactly the same effect as adding the positive number: 5 − (−2) = 5 + 2.",
      },
      body:
        "An **integer** is a whole number that is positive, negative or zero: …, −3, −2, −1, 0, 1, 2, 3, … Numbers with a sign attached are also called **directed numbers**, because the sign gives a direction: above or below zero, in credit or in debt, up or down.\n\nOn a **number line**, treat every calculation as a journey. Start at the first number. **Adding** a positive number moves you right; **adding a negative** number moves you left. So −2 + 5 = 3 and 4 + (−7) = −3.\n\nSubtraction undoes addition, so it flips the direction. Subtracting a positive moves you left; **subtracting a negative moves you right**. Another way to see it: {{a - b}} tells you *how far it is from b to a*. A temperature that rises from −4 °C to 3 °C has gone up by 3 − (−4) = 7 degrees.\n\n| Calculation | Same as | On the number line |\n|---|---|---|\n| 6 + (−2) | 6 − 2 = 4 | start at 6, move 2 left |\n| 6 − (−2) | 6 + 2 = 8 | start at 6, move 2 right |\n| −6 + 2 | −4 | start at −6, move 2 right |\n| −6 − 2 | −8 | start at −6, move 2 left |\n| −6 − (−2) | −6 + 2 = −4 | start at −6, move 2 right |\n\n**Generalisations** — these are true for *any* numbers a and b:\n\n- {{a + (-b) = a - b}}: adding a negative is the same as subtracting.\n- {{a - (-b) = a + b}}: subtracting a negative is the same as adding.\n- If a is bigger than b, then {{a - b}} is positive; if a is smaller than b, then {{a - b}} is negative.\n- {{b - a = -(a - b)}}: swapping the order flips the sign, so 8 − 3 = 5 but 3 − 8 = −5.\n\n**In context.** A bank balance of −$20 means you owe the bank $20 (you are *overdrawn*); paying in $35 gives −20 + 35 = $15. The **difference** between two temperatures is *higher − lower*: Singapore at 31 °C and Harbin on a January morning at −19 °C differ by 31 − (−19) = 50 degrees.",
      diagram: `<svg viewBox="0 0 480 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number lines from minus 6 to 6. Top: an arrow starts at minus 1 and moves 4 to the left, ending at minus 5. Bottom: an arrow starts at minus 4 and moves 7 to the right, ending at 3."><defs><marker id="ipAS1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f2937"/></marker></defs><rect x="0" y="0" width="480" height="210" fill="#ffffff"/><text x="20" y="20" font-family="sans-serif" fill="#1f2937" font-size="13" font-weight="bold">−1 + (−4) = −5 : adding a negative moves left</text><line x1="20" y1="75" x2="460" y2="75" stroke="#334155" stroke-width="2"/><line x1="30" y1="69" x2="30" y2="81" stroke="#334155"/><text x="30" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−6</text><line x1="65" y1="69" x2="65" y2="81" stroke="#334155"/><text x="65" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−5</text><line x1="100" y1="69" x2="100" y2="81" stroke="#334155"/><text x="100" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−4</text><line x1="135" y1="69" x2="135" y2="81" stroke="#334155"/><text x="135" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−3</text><line x1="170" y1="69" x2="170" y2="81" stroke="#334155"/><text x="170" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−2</text><line x1="205" y1="69" x2="205" y2="81" stroke="#334155"/><text x="205" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−1</text><line x1="240" y1="69" x2="240" y2="81" stroke="#334155"/><text x="240" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">0</text><line x1="275" y1="69" x2="275" y2="81" stroke="#334155"/><text x="275" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">1</text><line x1="310" y1="69" x2="310" y2="81" stroke="#334155"/><text x="310" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">2</text><line x1="345" y1="69" x2="345" y2="81" stroke="#334155"/><text x="345" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">3</text><line x1="380" y1="69" x2="380" y2="81" stroke="#334155"/><text x="380" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">4</text><line x1="415" y1="69" x2="415" y2="81" stroke="#334155"/><text x="415" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">5</text><line x1="450" y1="69" x2="450" y2="81" stroke="#334155"/><text x="450" y="96" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">6</text><path d="M205,68 Q135,28 65,68" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipAS1)"/><text x="135" y="42" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" font-weight="bold">−4</text><circle cx="205" cy="75" r="4.5" fill="#334155"/><circle cx="65" cy="75" r="5" fill="#dc2626"/><text x="20" y="118" font-family="sans-serif" fill="#1f2937" font-size="13" font-weight="bold">3 − (−4) = 7 : how far is it from −4 up to 3?</text><line x1="20" y1="175" x2="460" y2="175" stroke="#334155" stroke-width="2"/><line x1="30" y1="169" x2="30" y2="181" stroke="#334155"/><text x="30" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−6</text><line x1="65" y1="169" x2="65" y2="181" stroke="#334155"/><text x="65" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−5</text><line x1="100" y1="169" x2="100" y2="181" stroke="#334155"/><text x="100" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−4</text><line x1="135" y1="169" x2="135" y2="181" stroke="#334155"/><text x="135" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−3</text><line x1="170" y1="169" x2="170" y2="181" stroke="#334155"/><text x="170" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−2</text><line x1="205" y1="169" x2="205" y2="181" stroke="#334155"/><text x="205" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−1</text><line x1="240" y1="169" x2="240" y2="181" stroke="#334155"/><text x="240" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">0</text><line x1="275" y1="169" x2="275" y2="181" stroke="#334155"/><text x="275" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">1</text><line x1="310" y1="169" x2="310" y2="181" stroke="#334155"/><text x="310" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">2</text><line x1="345" y1="169" x2="345" y2="181" stroke="#334155"/><text x="345" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">3</text><line x1="380" y1="169" x2="380" y2="181" stroke="#334155"/><text x="380" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">4</text><line x1="415" y1="169" x2="415" y2="181" stroke="#334155"/><text x="415" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">5</text><line x1="450" y1="169" x2="450" y2="181" stroke="#334155"/><text x="450" y="196" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">6</text><path d="M100,168 Q222.5,124 345,168" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipAS1)"/><text x="222.5" y="141" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" font-weight="bold">+7</text><circle cx="100" cy="175" r="4.5" fill="#334155"/><circle cx="345" cy="175" r="5" fill="#dc2626"/></svg>`,
      diagramCaption:
        "Top: adding −4 is a move of 4 to the left. Bottom: 3 − (−4) asks how far it is from −4 to 3 — the answer is 7 steps to the right.",
      workedExamples: [
        {
          title: "A chain of moves",
          problem: "Work out −7 + 4 − (−5).",
          steps: [
            "Work from left to right. Start at −7 and add 4: move 4 right to −3.",
            "Now you need −3 − (−5). Subtracting a negative is adding, so this is −3 + 5.",
            "From −3, move 5 right to 2.",
          ],
          answer: "2",
          yourTurn: {
            question: "Your turn: work out −6 + 2 − (−9).",
            answer: { type: "number", value: 5 },
            solution: "−6 + 2 = −4. Then −4 − (−9) = −4 + 9 = 5.",
          },
        },
        {
          title: "How much warmer?",
          problem:
            "At 6 a.m. the temperature in Ulaanbaatar is −26 °C. By 2 p.m. it is −14 °C. By how many degrees has the temperature risen?",
          steps: [
            "Change = final temperature − starting temperature = −14 − (−26).",
            "Subtracting a negative is adding: −14 + 26.",
            "−14 + 26 = 12. Check on a number line: from −26 up to −14 is 12 steps.",
          ],
          answer: "The temperature has risen by 12 °C.",
        },
        {
          title: "An overdrawn account",
          problem:
            "Priya's bank balance is −$38. She pays in $50, then a $27 phone bill is taken out. If the balance ends up below zero, the bank charges a $5 fee. What is her final balance?",
          steps: [
            "Pay in $50: −38 + 50 = 12, so the balance is $12.",
            "Bill of $27: 12 − 27 = −15, so the balance is −$15.",
            "That is below zero, so the $5 fee is taken: −15 − 5 = −20.",
          ],
          answer: "Her final balance is −$20 (she owes the bank $20).",
        },
      ],
      keyPoints: [
        "Adding a negative is subtracting: {{a + (-b) = a - b}}.",
        "Subtracting a negative is adding: {{a - (-b) = a + b}}.",
        "When two signs sit side by side, as in 4 − (−3) or 4 + (−3): same signs make +, different signs make −.",
        "A change is *final − start* (it can be negative); a difference is *higher − lower* (never negative).",
      ],
      whyItWorks:
        "Think of a negative number as a debt. If someone **takes away** a $5 debt you owed, you are $5 better off — exactly as if they had given you $5. So subtracting −5 has the same effect as adding 5. The discovery pattern shows the same thing: every time you subtract one less, the answer goes up by one, and the pattern carries straight on past zero.",
      strategies: ["Use a number line", "Find a pattern", "Use a model (money or temperature)"],
      thinkDeeper:
        "Always, sometimes or never true: *a − b is smaller than a*. Test positive, negative and zero values of b. What exactly decides whether it is true?",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "multiplying-dividing-negatives",
      heading: "Multiplying & dividing negative numbers",
      discovery: {
        problem:
          "Complete the pattern, then keep it going:\n\n3 × (−4) = −12\n2 × (−4) = −8\n1 × (−4) = −4\n0 × (−4) = 0\n−1 × (−4) = ?\n−2 × (−4) = ?\n\nWhat must a negative times a negative be if the pattern is to continue?",
        idea:
          "Each answer is 4 **more** than the one above it. To keep the pattern going, −1 × (−4) = 4 and −2 × (−4) = 8. A negative times a negative is positive — not because someone decided so, but because any other answer would break the pattern.",
      },
      body:
        "Multiplication is repeated addition, so 3 × (−4) = (−4) + (−4) + (−4) = −12. The order of a multiplication doesn't matter, so (−4) × 3 = −12 as well. A positive times a negative is **negative**.\n\nThe discovery pattern shows that a negative times a negative is **positive**. Division is the inverse of multiplication, so it obeys exactly the same sign rules: −12 ÷ 3 = −4 because 3 × (−4) = −12, and −12 ÷ (−3) = 4 because (−3) × 4 = −12.\n\n| × or ÷ | **+** | **−** |\n|---|---|---|\n| **+** | + | − |\n| **−** | − | + |\n\n**Same signs give a positive answer; different signs give a negative answer.** Work out the size of the answer as normal, then decide the sign separately.\n\n**Several negatives.** Each pair of negatives multiplies to a positive, so you only need to count the negative signs:\n\n- an **even** number of negatives gives a positive answer: (−2) × (−3) × (−1) × (−5) = 30\n- an **odd** number of negatives gives a negative answer: (−2) × (−3) × (−5) = −30\n- if any factor is 0, the product is 0, whatever the signs.\n\n**Estimate first.** Before a longer calculation, round each number to 1 significant figure and fix the sign. For −38 × 21: −40 × 20 = −800, so the exact answer must be negative and close to −800. (It is −798.) An estimate catches sign slips *and* place-value slips.",
      diagram: `<svg viewBox="0 0 480 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number lines from minus 12 to 12. Top: three jumps of minus 4 from 0 land on minus 12, showing 3 times minus 4 equals minus 12. Bottom: the same three jumps reflected in 0 land on 12, showing minus 3 times minus 4 equals 12."><defs><marker id="ipMD1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f2937"/></marker></defs><rect x="0" y="0" width="480" height="205" fill="#ffffff"/><line x1="240" y1="28" x2="240" y2="186" stroke="#94a3b8" stroke-dasharray="4 4"/><text x="240" y="20" font-family="sans-serif" fill="#1f2937" font-size="11" text-anchor="middle" fill-opacity="0.8">mirror at 0</text><line x1="22" y1="80" x2="458" y2="80" stroke="#334155" stroke-width="2"/><line x1="30" y1="72" x2="30" y2="88" stroke="#334155"/><text x="30" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−12</text><line x1="47.5" y1="76" x2="47.5" y2="84" stroke="#334155"/><line x1="65" y1="76" x2="65" y2="84" stroke="#334155"/><line x1="82.5" y1="76" x2="82.5" y2="84" stroke="#334155"/><line x1="100" y1="72" x2="100" y2="88" stroke="#334155"/><text x="100" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−8</text><line x1="117.5" y1="76" x2="117.5" y2="84" stroke="#334155"/><line x1="135" y1="76" x2="135" y2="84" stroke="#334155"/><line x1="152.5" y1="76" x2="152.5" y2="84" stroke="#334155"/><line x1="170" y1="72" x2="170" y2="88" stroke="#334155"/><text x="170" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−4</text><line x1="187.5" y1="76" x2="187.5" y2="84" stroke="#334155"/><line x1="205" y1="76" x2="205" y2="84" stroke="#334155"/><line x1="222.5" y1="76" x2="222.5" y2="84" stroke="#334155"/><line x1="240" y1="72" x2="240" y2="88" stroke="#334155"/><text x="240" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">0</text><line x1="257.5" y1="76" x2="257.5" y2="84" stroke="#334155"/><line x1="275" y1="76" x2="275" y2="84" stroke="#334155"/><line x1="292.5" y1="76" x2="292.5" y2="84" stroke="#334155"/><line x1="310" y1="72" x2="310" y2="88" stroke="#334155"/><text x="310" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">4</text><line x1="327.5" y1="76" x2="327.5" y2="84" stroke="#334155"/><line x1="345" y1="76" x2="345" y2="84" stroke="#334155"/><line x1="362.5" y1="76" x2="362.5" y2="84" stroke="#334155"/><line x1="380" y1="72" x2="380" y2="88" stroke="#334155"/><text x="380" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">8</text><line x1="397.5" y1="76" x2="397.5" y2="84" stroke="#334155"/><line x1="415" y1="76" x2="415" y2="84" stroke="#334155"/><line x1="432.5" y1="76" x2="432.5" y2="84" stroke="#334155"/><line x1="450" y1="72" x2="450" y2="88" stroke="#334155"/><text x="450" y="102" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">12</text><path d="M240,72 Q205,40 170,72" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipMD1)"/><text x="205" y="50" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">−4</text><path d="M170,72 Q135,40 100,72" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipMD1)"/><text x="135" y="50" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">−4</text><path d="M100,72 Q65,40 30,72" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipMD1)"/><text x="65" y="50" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">−4</text><text x="262" y="46" font-family="sans-serif" fill="#1f2937" font-size="13" font-weight="bold">3 × (−4) = −12</text><text x="262" y="63" font-family="sans-serif" fill="#1f2937" font-size="12">three jumps of −4 from 0</text><circle cx="240" cy="80" r="4" fill="#334155"/><circle cx="30" cy="80" r="5" fill="#dc2626"/><line x1="22" y1="170" x2="458" y2="170" stroke="#334155" stroke-width="2"/><line x1="30" y1="162" x2="30" y2="178" stroke="#334155"/><text x="30" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−12</text><line x1="47.5" y1="166" x2="47.5" y2="174" stroke="#334155"/><line x1="65" y1="166" x2="65" y2="174" stroke="#334155"/><line x1="82.5" y1="166" x2="82.5" y2="174" stroke="#334155"/><line x1="100" y1="162" x2="100" y2="178" stroke="#334155"/><text x="100" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−8</text><line x1="117.5" y1="166" x2="117.5" y2="174" stroke="#334155"/><line x1="135" y1="166" x2="135" y2="174" stroke="#334155"/><line x1="152.5" y1="166" x2="152.5" y2="174" stroke="#334155"/><line x1="170" y1="162" x2="170" y2="178" stroke="#334155"/><text x="170" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">−4</text><line x1="187.5" y1="166" x2="187.5" y2="174" stroke="#334155"/><line x1="205" y1="166" x2="205" y2="174" stroke="#334155"/><line x1="222.5" y1="166" x2="222.5" y2="174" stroke="#334155"/><line x1="240" y1="162" x2="240" y2="178" stroke="#334155"/><text x="240" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">0</text><line x1="257.5" y1="166" x2="257.5" y2="174" stroke="#334155"/><line x1="275" y1="166" x2="275" y2="174" stroke="#334155"/><line x1="292.5" y1="166" x2="292.5" y2="174" stroke="#334155"/><line x1="310" y1="162" x2="310" y2="178" stroke="#334155"/><text x="310" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">4</text><line x1="327.5" y1="166" x2="327.5" y2="174" stroke="#334155"/><line x1="345" y1="166" x2="345" y2="174" stroke="#334155"/><line x1="362.5" y1="166" x2="362.5" y2="174" stroke="#334155"/><line x1="380" y1="162" x2="380" y2="178" stroke="#334155"/><text x="380" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">8</text><line x1="397.5" y1="166" x2="397.5" y2="174" stroke="#334155"/><line x1="415" y1="166" x2="415" y2="174" stroke="#334155"/><line x1="432.5" y1="166" x2="432.5" y2="174" stroke="#334155"/><line x1="450" y1="162" x2="450" y2="178" stroke="#334155"/><text x="450" y="192" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">12</text><path d="M240,162 Q275,130 310,162" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipMD1)"/><text x="275" y="140" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">+4</text><path d="M310,162 Q345,130 380,162" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipMD1)"/><text x="345" y="140" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">+4</text><path d="M380,162 Q415,130 450,162" fill="none" stroke="#1f2937" stroke-width="2" marker-end="url(#ipMD1)"/><text x="415" y="140" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">+4</text><text x="20" y="128" font-family="sans-serif" fill="#1f2937" font-size="13" font-weight="bold">(−3) × (−4) = 12</text><text x="20" y="145" font-family="sans-serif" fill="#1f2937" font-size="12">the same jumps, reflected in 0</text><circle cx="240" cy="170" r="4" fill="#334155"/><circle cx="450" cy="170" r="5" fill="#dc2626"/></svg>`,
      diagramCaption:
        "Multiplying −4 by 3 makes three jumps of −4 from 0. Multiplying by −3 makes the same jumps reflected in 0, so (−3) × (−4) lands on +12.",
      workedExamples: [
        {
          title: "Left to right",
          problem: "Work out (−48) ÷ (−6) × (−3).",
          steps: [
            "× and ÷ have equal priority, so work from left to right.",
            "(−48) ÷ (−6): same signs, so the answer is positive. 48 ÷ 6 = 8.",
            "8 × (−3): different signs, so the answer is negative. 8 × 3 = 24, giving −24.",
          ],
          answer: "−24",
          yourTurn: {
            question: "Your turn: work out (−36) ÷ 4 × (−5).",
            answer: { type: "number", value: 45 },
            solution: "(−36) ÷ 4 = −9 (different signs). Then −9 × (−5) = 45 (same signs).",
          },
        },
        {
          title: "Count the negatives",
          problem: "Work out (−1) × (−2) × (−3) × (−4) × (−5).",
          steps: [
            "Size first: 1 × 2 × 3 × 4 × 5 = 120.",
            "Count the negative signs: there are 5, which is odd.",
            "An odd number of negatives gives a negative answer.",
          ],
          answer: "−120",
        },
        {
          title: "Estimate, then check",
          problem:
            "Estimate (−412) × 29 ÷ (−58). Use your estimate to decide whether a calculator answer of 206 is sensible.",
          steps: [
            "Round each number to 1 significant figure: −412 ≈ −400, 29 ≈ 30 and −58 ≈ −60.",
            "Signs: two negatives, so the answer is positive.",
            "Size: 400 × 30 = 12 000, and 12 000 ÷ 60 = 200.",
            "The estimate is +200, so 206 is sensible. A negative answer, or one near 2000 or 20, would signal a slip.",
          ],
          answer: "Estimate: 200. The answer 206 is sensible.",
        },
      ],
      keyPoints: [
        "Same signs → positive; different signs → negative. This works for × and ÷.",
        "With several factors, count the negatives: even → positive, odd → negative.",
        "Find the size and the sign separately, then put them together.",
        "Estimate first by rounding to 1 significant figure — it catches sign and size slips.",
      ],
      whyItWorks:
        "Use the fact that any number times zero is zero. Since 4 + (−4) = 0, we know (−3) × (4 + (−4)) = (−3) × 0 = 0. Multiplying out the bracket gives (−3) × 4 + (−3) × (−4) = 0, which is −12 + (−3) × (−4) = 0. The only number you can add to −12 to get 0 is 12, so (−3) × (−4) = 12. If a negative times a negative were anything else, the ordinary rules of arithmetic would break.",
      strategies: ["Find a pattern", "Count the negatives", "Estimate first"],
      thinkDeeper:
        "{{(-2)^101}} means 101 copies of −2 multiplied together. Without working anything out, decide which is bigger: {{(-2)^101}} or {{(-3)^100}}. Then explain how to tell the sign of {{(-7)^n}} for any whole number n.",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "order-of-operations",
      heading: "Order of operations",
      discovery: {
        problem:
          "Three calculators were asked to work out {{sqrt(4) + 16 * 2}}. One says 34, one says 36 and one says 6. Only one of them can be right. Which one — and what did each of the other two do?",
        idea:
          "Roots and powers come before ×, and × comes before +: {{sqrt(4) = 2}}, then 16 × 2 = 32, then 2 + 32 = **34**. The calculator showing 36 worked strictly left to right (2 + 16 = 18, then 18 × 2 = 36). The one showing 6 put everything under the root sign: {{sqrt(4 + 16 * 2) = sqrt(36) = 6}}. Maths needs one agreed order so that everyone gets the same answer.",
      },
      body:
        "When a calculation has several operations, we need an agreed **order of operations** — otherwise the same calculation could have several different answers. The order is often remembered as **BIDMAS**:\n\n| Priority | Stands for | Includes |\n|---|---|---|\n| 1st | **B**rackets | ( ), plus anything grouped by a fraction bar or a root sign |\n| 2nd | **I**ndices | powers such as {{3^2}} and roots such as {{sqrt(25)}} |\n| 3rd | **D**ivision and **M**ultiplication | equal rank — work left to right |\n| 4th | **A**ddition and **S**ubtraction | equal rank — work left to right |\n\nThe trap is in the last two rows. Division does *not* come before multiplication, and addition does *not* come before subtraction — they are equal partners, done from left to right. So 12 ÷ 3 × 2 = 4 × 2 = 8 (not 2), and 10 − 4 + 3 = 6 + 3 = 9 (not 3).\n\n**Hidden brackets.** A fraction bar groups everything above it and everything below it, and a root sign groups everything underneath it:\n\n    {{(8 + 4)/(2 * 3) = 12/6 = 2}}\n    {{sqrt(9 + 16) = sqrt(25) = 5}}, but {{sqrt(9) + sqrt(16) = 3 + 4 = 7}}\n\n**Powers and negatives.** A power applies only to what it is attached to. In {{(-3)^2}} the whole bracket is squared, giving 9. In {{-3^2}} only the 3 is squared, and then the result is made negative: −9.\n\n**Calculator slips.** A calculator follows BIDMAS exactly, so it does what you *type*, not what you *mean*. Typing 8 + 4 ÷ 2 × 3 for {{(8 + 4)/(2 * 3)}} gives 14 instead of 2. On many calculators, keying in −3² gives −9. Use brackets generously, and always ask whether the answer is roughly what you expected.",
      diagram: `<svg viewBox="0 0 480 245" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An expression tree for root 4 plus 16 times 2. The leaves are 4, 16 and 2. The square root of 4 gives 2, 16 times 2 gives 32, and the plus at the top gives 34."><defs><marker id="ipOO1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f2937"/></marker></defs><rect x="0" y="0" width="480" height="245" fill="#ffffff"/><line x1="240" y1="60" x2="130" y2="105" stroke="#334155" stroke-width="2"/><line x1="240" y1="60" x2="350" y2="105" stroke="#334155" stroke-width="2"/><line x1="130" y1="145" x2="130" y2="190" stroke="#334155" stroke-width="2"/><line x1="350" y1="145" x2="290" y2="190" stroke="#334155" stroke-width="2"/><line x1="350" y1="145" x2="410" y2="190" stroke="#334155" stroke-width="2"/><rect x="200" y="20" width="80" height="40" rx="10" fill="#c7d2fe" stroke="#334155"/><text x="240" y="47" font-family="sans-serif" fill="#1f2937" font-size="20" text-anchor="middle" font-weight="bold">+</text><text x="290" y="46" font-family="sans-serif" fill="#166534" font-size="15" font-weight="bold">= 34</text><rect x="90" y="105" width="80" height="40" rx="10" fill="#c7d2fe" stroke="#334155"/><text x="130" y="132" font-family="sans-serif" fill="#1f2937" font-size="20" text-anchor="middle" font-weight="bold">√</text><text x="180" y="131" font-family="sans-serif" fill="#166534" font-size="15" font-weight="bold">= 2</text><rect x="310" y="105" width="80" height="40" rx="10" fill="#c7d2fe" stroke="#334155"/><text x="350" y="132" font-family="sans-serif" fill="#1f2937" font-size="20" text-anchor="middle" font-weight="bold">×</text><text x="400" y="131" font-family="sans-serif" fill="#166534" font-size="15" font-weight="bold">= 32</text><rect x="105" y="190" width="50" height="36" rx="8" fill="#fde68a" stroke="#334155"/><text x="130" y="214" font-family="sans-serif" fill="#1f2937" font-size="16" text-anchor="middle">4</text><rect x="265" y="190" width="50" height="36" rx="8" fill="#fde68a" stroke="#334155"/><text x="290" y="214" font-family="sans-serif" fill="#1f2937" font-size="16" text-anchor="middle">16</text><rect x="385" y="190" width="50" height="36" rx="8" fill="#fde68a" stroke="#334155"/><text x="410" y="214" font-family="sans-serif" fill="#1f2937" font-size="16" text-anchor="middle">2</text><line x1="38" y1="222" x2="38" y2="34" stroke="#1f2937" stroke-width="2" marker-end="url(#ipOO1)"/><text x="26" y="128" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" transform="rotate(-90 26 128)">work upwards</text><text x="468" y="26" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="end" font-weight="bold">√4 + 16 × 2</text></svg>`,
      diagramCaption:
        "An expression tree for {{sqrt(4) + 16 * 2}}. Work from the bottom up: the root and the multiplication must be finished before the addition at the top can happen.",
      workedExamples: [
        {
          title: "Brackets, then indices",
          problem: "Work out {{20 - 3 * (5 - 7)^2}}.",
          steps: [
            "Brackets: 5 − 7 = −2.",
            "Indices: {{(-2)^2 = 4}}. The whole bracket is squared, so the result is positive.",
            "Multiplication: 3 × 4 = 12.",
            "Subtraction: 20 − 12 = 8.",
          ],
          answer: "8",
          yourTurn: {
            question: "Your turn: work out {{15 - 2 * (1 - 4)^2}}.",
            answer: { type: "number", value: -3 },
            solution: "Bracket: 1 − 4 = −3. Index: {{(-3)^2 = 9}}. Multiply: 2 × 9 = 18. Subtract: 15 − 18 = −3.",
          },
        },
        {
          title: "A fraction bar is a bracket",
          problem: "Work out {{(sqrt(81) + 3 * (-5))/(2^3 - 11)}}.",
          steps: [
            "Top first: {{sqrt(81) = 9}} and 3 × (−5) = −15, so the top is 9 + (−15) = −6.",
            "Bottom: {{2^3 = 8}}, so the bottom is 8 − 11 = −3.",
            "Divide: −6 ÷ (−3) = 2 (same signs, so positive).",
          ],
          answer: "2",
        },
        {
          title: "Where should the brackets go?",
          problem:
            "Without brackets, 5 + 3 × 6 − 2 = 21. Place one pair of brackets to make the answer as large as possible.",
          steps: [
            "Brackets only change the answer if they force a lower-priority operation to happen sooner.",
            "The multiplication is the powerful step, so make it multiply something bigger: (5 + 3) × 6 − 2 = 8 × 6 − 2 = 46.",
            "Compare: 5 + 3 × (6 − 2) = 5 + 12 = 17, which is smaller because the bracket shrinks what gets multiplied.",
            "Every other placement still gives 21, so 46 is the largest.",
          ],
          answer: "(5 + 3) × 6 − 2 = 46",
        },
      ],
      keyPoints: [
        "BIDMAS: Brackets, Indices (powers and roots), then × and ÷ left to right, then + and − left to right.",
        "× and ÷ are equal partners, and so are + and −: work left to right.",
        "Fraction bars and root signs act as invisible brackets.",
        "{{(-3)^2 = 9}} but {{-3^2 = -9}}: a power only touches what it is attached to.",
      ],
      whyItWorks:
        "Each level of BIDMAS is shorthand for the level below it. Multiplication is repeated addition: in 2 + 3 × 4, the 3 × 4 stands for 4 + 4 + 4, a single block worth 12, so it has to be worked out before it can be added to 2. A power is repeated multiplication — {{5^2}} is shorthand for 5 × 5 — so it is worked out before it can be multiplied by anything else. Brackets let you override the order whenever you need to.",
      strategies: ["Work in stages (one operation per line)", "Estimate first", "Consider extremes"],
      thinkDeeper:
        "The *four fours* puzzle: using exactly four 4s, any of +, −, × and ÷, and as many brackets as you like, make every whole number from 0 to 10. (Joining digits is allowed, so 44 ÷ 44 = 1 counts.) Which number was hardest, and why?",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "squares-cubes-roots",
      heading: "Squares, cubes and roots",
      discovery: {
        problem:
          "Find **every** number that squares to give 49. Then find every number that cubes to give −64. Why does one question have two answers but the other only one? Is there any number at all whose square is −49?",
        idea:
          "Both 7 and −7 square to 49, because (−7) × (−7) = 49. But only −4 cubes to −64: (−4) × (−4) × (−4) = 16 × (−4) = −64, while {{4^3 = 64}}. And no number squares to −49 — the square of a positive or a negative number is always positive (and {{0^2 = 0}}).",
      },
      body:
        "The **square** of a number is the number multiplied by itself: {{7^2 = 7 * 7 = 49}}. Whole-number results such as 1, 4, 9, 16, … are called **square numbers**. The **cube** of a number uses three equal factors: {{4^3 = 4 * 4 * 4 = 64}}.\n\n| n | 1 | 2 | 3 | 4 | 5 | 10 |\n|---|---|---|---|---|---|---|\n| {{n^2}} | 1 | 4 | 9 | 16 | 25 | 100 |\n| {{n^3}} | 1 | 8 | 27 | 64 | 125 | 1000 |\n\nKnow these cubes by heart, and the squares all the way to {{15^2}}: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.\n\n**Square roots.** A **square root** undoes squaring. Every positive number has **two** square roots, one positive and one negative: the square roots of 49 are 7 and −7, written ±7 (say \"plus or minus 7\"). The symbol √ on its own means the **positive** root, so {{sqrt(49) = 7}}. When you solve {{x^2 = 49}}, give both answers: {{x = +-7}}. A negative number has no square root among the numbers you know, because no square is negative.\n\n**Cubes and cube roots.** Cubing keeps the sign: {{(-4)^3 = -64}}, because three negatives multiply to a negative. So every number — positive or negative — has exactly **one** cube root: {{cbrt(64) = 4}} and {{cbrt(-64) = -4}}.\n\n**Watch the brackets.** {{(-5)^2 = 25}}, but {{-5^2 = -25}} because only the 5 is squared.\n\n**Estimating roots.** Most roots are not whole numbers. To estimate one, trap the number between the two nearest square numbers. Since 49 < 50 < 64, we know {{7 < sqrt(50) < 8}}. And 50 is much nearer 49 than 64, so {{sqrt(50)}} is only just over 7. Check: {{7.1^2 = 50.41}}, a little too big, so {{sqrt(50) ~= 7.07}}.",
      diagram: `<svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from 6 to 9 with the squares 36, 49, 64 and 81 written underneath. Small ticks mark tenths between 7 and 8. A red dot just to the right of 7 marks the square root of 50, about 7.07."><rect x="0" y="0" width="480" height="160" fill="#ffffff"/><line x1="58" y1="85" x2="462" y2="85" stroke="#334155" stroke-width="2"/><line x1="209.33" y1="81" x2="209.33" y2="89" stroke="#64748b"/><line x1="222" y1="81" x2="222" y2="89" stroke="#64748b"/><line x1="234.67" y1="81" x2="234.67" y2="89" stroke="#64748b"/><line x1="247.33" y1="81" x2="247.33" y2="89" stroke="#64748b"/><line x1="260" y1="81" x2="260" y2="89" stroke="#64748b"/><line x1="272.67" y1="81" x2="272.67" y2="89" stroke="#64748b"/><line x1="285.33" y1="81" x2="285.33" y2="89" stroke="#64748b"/><line x1="298" y1="81" x2="298" y2="89" stroke="#64748b"/><line x1="310.67" y1="81" x2="310.67" y2="89" stroke="#64748b"/><line x1="70" y1="76" x2="70" y2="94" stroke="#334155" stroke-width="2"/><text x="70" y="70" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle" font-weight="bold">6</text><text x="70" y="112" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" fill-opacity="0.85">36</text><line x1="196.67" y1="76" x2="196.67" y2="94" stroke="#334155" stroke-width="2"/><text x="196.67" y="70" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle" font-weight="bold">7</text><text x="196.67" y="112" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" fill-opacity="0.85">49</text><line x1="323.33" y1="76" x2="323.33" y2="94" stroke="#334155" stroke-width="2"/><text x="323.33" y="70" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle" font-weight="bold">8</text><text x="323.33" y="112" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" fill-opacity="0.85">64</text><line x1="450" y1="76" x2="450" y2="94" stroke="#334155" stroke-width="2"/><text x="450" y="70" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle" font-weight="bold">9</text><text x="450" y="112" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" fill-opacity="0.85">81</text><text x="16" y="70" font-family="sans-serif" fill="#1f2937" font-size="14" font-style="italic">x</text><text x="16" y="112" font-family="sans-serif" fill="#1f2937" font-size="14" font-style="italic">x²</text><line x1="205.67" y1="80" x2="227.67" y2="44" stroke="#dc2626" stroke-width="1.5"/><circle cx="205.67" cy="85" r="5" fill="#dc2626"/><text x="231.67" y="40" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c">√50 ≈ 7.07</text><text x="240" y="145" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">49 &lt; 50 &lt; 64, so 7 &lt; √50 &lt; 8</text></svg>`,
      diagramCaption:
        "Roots above the line, their squares below; the small ticks are tenths. 50 is just past 49, so {{sqrt(50)}} sits just past 7 — at about 7.07.",
      workedExamples: [
        {
          title: "Two square roots",
          problem: "Solve {{x^2 = 81}}.",
          steps: [
            "Ask: which numbers multiply by themselves to give 81?",
            "{{9^2 = 81}} and {{(-9)^2 = 81}}.",
            "So x = 9 or x = −9, written {{x = +-9}}.",
          ],
          answer: "{{x = +-9}}",
          yourTurn: {
            question: "Your turn: solve {{x^2 = 144}}. Give both solutions.",
            answer: { type: "list", values: [12, -12], display: "{{x = +-12}}" },
            solution: "{{12^2 = 144}} and {{(-12)^2 = 144}}, so x = 12 or x = −12.",
          },
        },
        {
          title: "Mixing roots and powers",
          problem: "Work out {{cbrt(-125) + (-2)^4 - sqrt(36)}}.",
          steps: [
            "{{cbrt(-125) = -5}}, because {{(-5)^3 = -125}}.",
            "{{(-2)^4 = 16}}: four negatives make a positive.",
            "{{sqrt(36) = 6}} (the √ sign means the positive root).",
            "So the calculation is −5 + 16 − 6 = 5.",
          ],
          answer: "5",
        },
        {
          title: "Estimating a root",
          problem: "Without a calculator, estimate {{sqrt(90)}} to 1 decimal place.",
          steps: [
            "Trap it: 81 < 90 < 100, so {{9 < sqrt(90) < 10}}.",
            "90 is 9 above 81 and 10 below 100 — roughly halfway — so try 9.5.",
            "Check: {{9.5^2 = 90.25}} is just above 90, and {{9.4^2 = 88.36}} is below 90. So the root lies between 9.4 and 9.5.",
            "Test the halfway value to decide the rounding: {{9.45^2 = 89.3025}}, which is below 90, so {{sqrt(90)}} is more than 9.45.",
          ],
          answer: "{{sqrt(90) ~= 9.5}} (to 1 d.p.)",
        },
      ],
      keyPoints: [
        "Every positive number has two square roots (±); the √ sign means the positive one.",
        "No number squares to give a negative, but negative numbers do have cube roots: {{cbrt(-27) = -3}}.",
        "{{(-5)^2 = 25}} but {{-5^2 = -25}}.",
        "Estimate a root by trapping it between consecutive square numbers, then check by squaring.",
      ],
      whyItWorks:
        "A square is a number times itself, so both factors have the **same** sign — and same signs always multiply to a positive. That is why squares are never negative, and why 7 and −7 both square to 49. A cube has **three** equal factors; for a negative number that is an odd number of negatives, so the cube stays negative. That is why negative numbers have cube roots. Estimating works because bigger positive numbers have bigger square roots: if 49 < 50 < 64, then {{sqrt(49) < sqrt(50) < sqrt(64)}}.",
      strategies: ["Trap between known values", "Use the inverse", "Check by substituting"],
      thinkDeeper:
        "How many whole numbers have a square root strictly between 5 and 6? Between 10 and 11? Between k and k + 1? Use {{(k+1)^2 - k^2}} to explain the pattern you find.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "index-laws",
      heading: "Powers and the index laws",
      discovery: {
        problem:
          "Write {{2^3 * 2^4}} as one long multiplication of 2s. How many 2s are there? Then write {{5^6 ÷ 5^2}} as a fraction and cancel. Now predict {{7^10 * 7^15}} and {{3^20 ÷ 3^8}} *without* writing anything out.",
        idea:
          "{{2^3 * 2^4 = (2 * 2 * 2) * (2 * 2 * 2 * 2)}}, which is seven 2s, so it equals {{2^7}}. In {{5^6 ÷ 5^2}}, the two 5s on the bottom cancel two of the 5s on top, leaving {{5^4}}. Multiplying powers of the same base adds the indices; dividing subtracts them: {{7^10 * 7^15 = 7^25}} and {{3^20 ÷ 3^8 = 3^12}}.",
      },
      body:
        "**Index notation** is shorthand for repeated multiplication. In {{3^4}}, the **base** is 3 and the **index** (also called the **power** or **exponent**) is 4: {{3^4 = 3 * 3 * 3 * 3 = 81}}. Careful: {{3^4}} is *not* 3 × 4 = 12. Letters work the same way: {{x^5 = x * x * x * x * x}}.\n\nAn index simply **counts factors**, so combining powers of the **same base** is a matter of counting:\n\n| Law | In symbols | Example |\n|---|---|---|\n| Multiplying: add the indices | {{a^m * a^n = a^(m+n)}} | {{x^3 * x^5 = x^8}} |\n| Dividing: subtract the indices | {{a^m ÷ a^n = a^(m-n)}} | {{y^9 ÷ y^4 = y^5}} |\n| Power of a power: multiply the indices | {{(a^m)^n = a^(mn)}} | {{(2^3)^4 = 2^12}} |\n| Zero index | {{a^0 = 1}} (a ≠ 0) | {{17^0 = 1}} |\n\n**The zero index.** {{5^3 ÷ 5^3 = 1}}, because anything divided by itself is 1. But the division law says {{5^3 ÷ 5^3 = 5^(3-3) = 5^0}}. Both must be true, so {{5^0 = 1}}. The same argument works for every base except 0. Also {{a^1 = a}}: just one factor of a.\n\n**Numbers in front (coefficients).** Deal with the numbers and the letters separately: multiply or divide the numbers as usual, and use the index laws on the letters.\n\n    {{3x^2 * 4x^5 = 12x^7}}\n    {{20y^7 ÷ 5y^3 = 4y^4}}\n    {{(2x^3)^2 = 2x^3 * 2x^3 = 4x^6}}\n\n**Same base only.** The laws only combine powers with the same base. {{2^3 * 3^2}} cannot be written as a single power — just work it out: 8 × 9 = 72. And {{2^3 * 2^2}} is {{2^5}}, *not* {{4^5}}: the base never changes.",
      diagram: `<svg viewBox="0 0 480 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top: three boxes each containing 2, times four boxes each containing 2, make seven 2s, so 2 cubed times 2 to the 4 equals 2 to the 7. Bottom: six 5s over two 5s; two 5s on the bottom cancel two on top, leaving 5 to the 4."><rect x="0" y="0" width="480" height="210" fill="#ffffff"/><text x="70" y="27" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle" font-weight="bold">2³</text><text x="226" y="27" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle" font-weight="bold">2⁴</text><rect x="20" y="35" width="32" height="30" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="36" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><rect x="56" y="35" width="32" height="30" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="72" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><rect x="92" y="35" width="32" height="30" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="108" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><text x="140" y="56" font-family="sans-serif" fill="#1f2937" font-size="18" text-anchor="middle">×</text><rect x="156" y="35" width="32" height="30" rx="4" fill="#fde68a" stroke="#334155"/><text x="172" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><rect x="192" y="35" width="32" height="30" rx="4" fill="#fde68a" stroke="#334155"/><text x="208" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><rect x="228" y="35" width="32" height="30" rx="4" fill="#fde68a" stroke="#334155"/><text x="244" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><rect x="264" y="35" width="32" height="30" rx="4" fill="#fde68a" stroke="#334155"/><text x="280" y="56" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><text x="318" y="57" font-family="sans-serif" fill="#1f2937" font-size="18" text-anchor="middle">=</text><text x="352" y="59" font-family="sans-serif" fill="#1f2937" font-size="22" text-anchor="middle" font-weight="bold">2⁷</text><path d="M20,70 L20,76 L296,76 L296,70" fill="none" stroke="#334155"/><text x="158" y="93" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">3 + 4 = 7 twos</text><text x="20" y="112" font-family="sans-serif" fill="#1f2937" font-size="14" font-weight="bold">5⁶ ÷ 5²</text><rect x="20" y="120" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="36" y="141" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><rect x="56" y="120" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="72" y="141" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><rect x="92" y="120" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="108" y="141" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><rect x="128" y="120" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="144" y="141" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><rect x="164" y="120" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="180" y="141" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><rect x="200" y="120" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="216" y="141" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><line x1="14" y1="158" x2="238" y2="158" stroke="#1f2937" stroke-width="2"/><rect x="20" y="166" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="36" y="187" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><rect x="56" y="166" width="32" height="30" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="72" y="187" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">5</text><line x1="23" y1="147" x2="49" y2="123" stroke="#dc2626" stroke-width="2.5"/><line x1="59" y1="147" x2="85" y2="123" stroke="#dc2626" stroke-width="2.5"/><line x1="23" y1="193" x2="49" y2="169" stroke="#dc2626" stroke-width="2.5"/><line x1="59" y1="193" x2="85" y2="169" stroke="#dc2626" stroke-width="2.5"/><text x="262" y="164" font-family="sans-serif" fill="#1f2937" font-size="18" text-anchor="middle">=</text><text x="296" y="166" font-family="sans-serif" fill="#1f2937" font-size="22" text-anchor="middle" font-weight="bold">5⁴</text><text x="326" y="163" font-family="sans-serif" fill="#1f2937" font-size="12">6 − 2 = 4 fives left</text></svg>`,
      diagramCaption:
        "Top: three 2s and four more 2s make seven 2s, so {{2^3 * 2^4 = 2^7}}. Bottom: in {{5^6 ÷ 5^2}}, the two 5s on the bottom cancel two on top, leaving {{5^4}}.",
      workedExamples: [
        {
          title: "Numbers in index form",
          problem: "Simplify {{4^5 * 4^3 ÷ 4^6}}, then evaluate it.",
          steps: [
            "Work left to right. Multiply: {{4^5 * 4^3 = 4^(5+3) = 4^8}}.",
            "Divide: {{4^8 ÷ 4^6 = 4^(8-6) = 4^2}}.",
            "Evaluate: {{4^2 = 16}}.",
          ],
          answer: "{{4^2 = 16}}",
          yourTurn: {
            question: "Your turn: simplify {{3^7 * 3^2 ÷ 3^5}}, then give its value as a whole number.",
            answer: { type: "number", value: 81 },
            solution: "{{3^(7+2-5) = 3^4 = 3 * 3 * 3 * 3 = 81}}.",
          },
        },
        {
          title: "Letters with coefficients",
          problem: "Simplify {{3a^4 * 5a^2}}.",
          steps: [
            "Multiply the numbers: 3 × 5 = 15.",
            "Multiply the letters by adding the indices: {{a^4 * a^2 = a^6}}.",
            "Put them back together.",
          ],
          answer: "{{15a^6}}",
        },
        {
          title: "Power of a power, then divide",
          problem: "Simplify {{(2x^3)^4 ÷ 8x^5}}.",
          steps: [
            "Everything inside the bracket is raised to the power 4: {{2^4 = 16}} and {{(x^3)^4 = x^12}}, so {{(2x^3)^4 = 16x^12}}.",
            "Divide the numbers: 16 ÷ 8 = 2.",
            "Divide the letters: {{x^12 ÷ x^5 = x^7}}.",
            "Check with x = 2: {{(2 * 8)^4 ÷ (8 * 32) = 65536 ÷ 256 = 256}}, and {{2 * 2^7 = 256}} too.",
          ],
          answer: "{{2x^7}}",
        },
      ],
      keyPoints: [
        "Multiply → add the indices; divide → subtract the indices; power of a power → multiply the indices.",
        "{{a^0 = 1}} for any non-zero a, and {{a^1 = a}}.",
        "The laws only work for the **same base**, and the base never changes.",
        "With coefficients, handle the numbers and the letters separately: {{3x^2 * 4x^5 = 12x^7}}.",
      ],
      whyItWorks:
        "An index counts how many times the base appears as a factor. {{a^m * a^n}} is m factors of a followed by n more, so m + n altogether. In {{a^m ÷ a^n}} (with m bigger than n), the n factors on the bottom cancel n of the m factors on top, leaving m − n. And {{(a^m)^n}} is n blocks of {{a^m}}, each holding m factors, so m × n factors in all.",
      strategies: ["Write it out in full", "Find a pattern", "Check by substituting"],
      thinkDeeper:
        "Which is bigger, {{2^30}} or {{3^20}}? Neither is easy to work out — but try writing each one as (something) to the power 10, using the power-of-a-power law in reverse.",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "types-of-number",
      heading: "Types of number",
      discovery: {
        problem:
          "Sort these numbers into groups in any way you like: 7, −3, 0, {{2/5}}, 0.75, −4.2, {{sqrt(16)}}, {{sqrt(2)}}, π, 0.333… Which of them can be written as a fraction with whole numbers on the top and bottom? Do any seem to *refuse*?",
        idea:
          "7 and {{sqrt(16) = 4}} are counting numbers. Add −3 and 0 and you have integers. All of these — and also {{2/5}}, {{0.75 = 3/4}}, {{-4.2 = -21/5}} and {{0.333… = 1/3}} — can be written as a fraction of integers. But {{sqrt(2)}} and π cannot: their decimals go on forever without repeating. The number families fit inside one another like nesting dolls.",
      },
      body:
        "Numbers come in families, each one sitting inside the next.\n\n- **Natural numbers** are the counting numbers 1, 2, 3, 4, … (Some books also include 0 — check which convention your course uses.)\n- **Integers** are the whole numbers, positive, negative and zero: …, −2, −1, 0, 1, 2, …\n- **Rational numbers** are all the numbers that can be written as a fraction {{a/b}}, where a and b are integers and b ≠ 0. They include every terminating decimal, like {{0.75 = 3/4}}, and every recurring decimal, like {{0.333… = 1/3}}.\n\nEvery natural number is an integer, and every integer is rational, because any integer n can be written as {{n/1}} — for example {{-6 = (-6)/1}}. Mathematicians show this with the **subset** symbol ⊂, meaning \"is contained in\":\n\n> natural numbers ⊂ integers ⊂ rational numbers\n\n**Simplify before you classify.** Numbers can be in disguise. {{sqrt(16) = 4}} is a natural number, {{-sqrt(9) = -3}} is an integer, and {{12/4 = 3}} is a natural number even though it is written as a fraction. Simplify first, then ask which is the *smallest* family it belongs to.\n\n**Numbers that are not rational.** Some numbers can never be written as a fraction of integers: they are **irrational**. Their decimals go on forever *without* repeating. Examples are {{sqrt(2) = 1.41421356…}}, {{sqrt(5)}} and π = 3.14159265… In fact, the square root of any whole number that is not a square number is irrational. Rational and irrational numbers together make up the **real numbers**.\n\n| Number | Natural? | Integer? | Rational? |\n|---|---|---|---|\n| 5 | ✓ | ✓ | ✓ |\n| −8 | ✗ | ✓ | ✓ |\n| {{3/8}} | ✗ | ✗ | ✓ |\n| 0.444… | ✗ | ✗ | ✓ |\n| π | ✗ | ✗ | ✗ |",
      diagram: `<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nested sets. Inside a rectangle of real numbers is an oval of rational numbers; inside it an oval of integers; inside that an oval of natural numbers. 1, 7 and root 16 are natural; minus 3 and 0 are integers but not natural; two fifths, 0.75, minus 4.2 and one third are rational but not integers; root 2, pi and root 5 lie outside the rationals."><rect x="0" y="0" width="480" height="280" fill="#ffffff"/><rect x="8" y="8" width="464" height="264" rx="14" fill="#ffffff" stroke="#334155" stroke-width="2"/><text x="20" y="30" font-family="sans-serif" fill="#1f2937" font-size="13" font-weight="bold">Real numbers</text><ellipse cx="190" cy="155" rx="170" ry="110" fill="#bae6fd" stroke="#334155"/><ellipse cx="160" cy="170" rx="115" ry="78" fill="#bbf7d0" stroke="#334155"/><ellipse cx="140" cy="185" rx="60" ry="42" fill="#fde68a" stroke="#334155"/><text x="190" y="66" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" font-weight="bold">Rational ℚ</text><text x="160" y="112" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle" font-weight="bold">Integers ℤ</text><text x="140" y="166" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">Natural ℕ</text><text x="140" y="190" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">1   7   √16</text><text x="140" y="210" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">250</text><text x="236" y="172" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">−3</text><text x="226" y="214" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">0</text><text x="300" y="118" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">2/5</text><text x="306" y="168" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">0.75</text><text x="300" y="218" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">0.333…</text><text x="88" y="96" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">−4.2</text><rect x="378" y="44" width="80" height="196" rx="10" fill="#fecaca" stroke="#334155" stroke-dasharray="4 3"/><text x="418" y="64" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle" font-weight="bold">Irrational</text><text x="418" y="110" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle">√2</text><text x="418" y="155" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">π</text><text x="418" y="200" font-family="sans-serif" fill="#1f2937" font-size="14" text-anchor="middle">√5</text></svg>`,
      diagramCaption:
        "Each family sits inside the next: natural ⊂ integers ⊂ rational. Irrational numbers such as {{sqrt(2)}} and π lie outside the rationals, but they are still real numbers.",
      workedExamples: [
        {
          title: "Spot the integers",
          problem: "Which of these are integers? −5, 2.5, {{sqrt(36)}}, 0, {{12/4}}, {{-sqrt(2)}}",
          steps: [
            "Simplify the numbers in disguise: {{sqrt(36) = 6}} and {{12/4 = 3}}.",
            "Integers are whole numbers (positive, negative or zero): −5, 6, 0 and 3 all qualify.",
            "2.5 is not whole. {{-sqrt(2)}} is not even rational — it is irrational.",
          ],
          answer: "−5, {{sqrt(36)}}, 0 and {{12/4}} — four of them.",
          yourTurn: {
            question:
              "Your turn: how many of these numbers are rational? {{sqrt(25)}}, −1.6, π, {{7/9}}, {{sqrt(10)}}, 0.121212…",
            answer: { type: "number", value: 4 },
            solution:
              "Rational: {{sqrt(25) = 5}}, {{-1.6 = -8/5}}, {{7/9}} and {{0.1212… = 4/33}} — four numbers. π and {{sqrt(10)}} are irrational.",
          },
        },
        {
          title: "A recurring decimal is rational",
          problem:
            "Show that 0.272727… (with 27 repeating forever) is rational by writing it as a fraction in its simplest form.",
          steps: [
            "Let x = 0.272727…",
            "The repeating block has 2 digits, so multiply by 100: 100x = 27.272727…",
            "Subtract: 100x − x = 27.2727… − 0.2727…, so 99x = 27. The endless tails cancel exactly.",
            "So {{x = 27/99 = 3/11}}.",
          ],
          answer: "{{0.2727… = 3/11}}",
        },
        {
          title: "Always, sometimes or never?",
          problem: "Is this always, sometimes or never true? *The sum of two irrational numbers is irrational.*",
          steps: [
            "Try an example: {{sqrt(2) + sqrt(2) = 2sqrt(2)}}, which is irrational. So it *can* be true.",
            "Hunt for a counterexample: {{sqrt(2)}} and {{3 - sqrt(2)}} are both irrational, but {{sqrt(2) + (3 - sqrt(2)) = 3}}, which is rational.",
            "One example where it is true and one where it is false means the answer is *sometimes*.",
          ],
          answer: "Sometimes true.",
        },
      ],
      keyPoints: [
        "Natural numbers ⊂ integers ⊂ rational numbers: each family sits inside the next.",
        "Rational means it can be written as {{a/b}} with integers a and b (b ≠ 0) — this includes every terminating and recurring decimal.",
        "Simplify before classifying: {{sqrt(49) = 7}} is a natural number.",
        "{{sqrt(2)}}, {{sqrt(3)}} and π are irrational: their decimals never end and never repeat.",
      ],
      whyItWorks:
        "Every integer n equals {{n/1}}, so it passes the test for being rational — that is why the integers sit *inside* the rationals. A recurring decimal is rational because multiplying by a power of 10 shifts the repeating block along; subtracting the original number makes the endless tail cancel completely, leaving an equation with whole numbers, as in the 0.2727… example.",
      strategies: ["Draw a diagram", "Simplify first", "Look for a counterexample"],
      thinkDeeper:
        "Suppose {{sqrt(2) = a/b}}, a fraction in its lowest terms. Squaring gives {{a^2 = 2b^2}}. Square numbers can only end in the digits 0, 1, 4, 5, 6 or 9. Which digits can {{2b^2}} end in? What does that force the last digits of a and b to be — and why does that contradict 'lowest terms'?",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "negative-indices",
      heading: "Negative indices",
      discovery: {
        problem:
          "Each line is the line above divided by 2:\n\n{{2^4 = 16}}\n{{2^3 = 8}}\n{{2^2 = 4}}\n{{2^1 = 2}}\n{{2^0 = 1}}\n\nKeep the pattern going for three more lines. What must {{2^(-1)}}, {{2^(-2)}} and {{2^(-3)}} be?",
        idea:
          "Every step down, the index falls by 1 and the value halves. So {{2^(-1) = 1/2}}, {{2^(-2) = 1/4}} and {{2^(-3) = 1/8}}. A negative index doesn't make the number negative — it means 'one over': {{2^(-3) = 1/2^3}}.",
      },
      body:
        "**Stretch:** this section looks ahead to Year 9.\n\nThe discovery pattern shows that going down the indices one step at a time divides by the base each time. Carry on below zero and you get fractions:\n\n    {{a^(-n) = 1/a^n}}   (for any a ≠ 0)\n\nSo {{5^(-2) = 1/5^2 = 1/25}} and {{10^(-3) = 1/10^3 = 1/1000 = 0.001}}. The number {{1/a^n}} is the **reciprocal** of {{a^n}} — that is, 1 divided by it. A negative index means *reciprocal*, never *negative*: {{2^(-3)}} is {{1/8}}, not −8. The same idea flips a fraction: {{(2/3)^(-2) = (3/2)^2 = 9/4}}.\n\n**Powers of 10.** Negative powers of 10 give the place-value columns to the right of the decimal point:\n\n| {{10^3}} | {{10^2}} | {{10^1}} | {{10^0}} | {{10^(-1)}} | {{10^(-2)}} | {{10^(-3)}} |\n|---|---|---|---|---|---|---|\n| 1000 | 100 | 10 | 1 | 0.1 | 0.01 | 0.001 |\n\n**The index laws still work.** {{2^3 * 2^(-5) = 2^(3 + (-5)) = 2^(-2) = 1/4}}, and {{7^2 ÷ 7^6 = 7^(-4)}}. That is the real reason for defining negative indices this way: it keeps every law true.",
      diagram: `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seven boxes in a row: 2 cubed is 8, 2 squared is 4, 2 to the 1 is 2, 2 to the 0 is 1, 2 to the minus 1 is a half, 2 to the minus 2 is a quarter, 2 to the minus 3 is an eighth. Each arrow between neighbouring boxes is labelled divide by 2."><defs><marker id="ipNI1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f2937"/></marker></defs><rect x="0" y="0" width="480" height="150" fill="#ffffff"/><rect x="12" y="55" width="56" height="60" rx="8" fill="#c7d2fe" stroke="#334155"/><line x1="18" y1="86" x2="62" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="40" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2³</text><text x="40" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">8</text><path d="M44,52 Q73,26 102,52" fill="none" stroke="#1f2937" stroke-width="1.5" marker-end="url(#ipNI1)"/><text x="73" y="30" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">÷2</text><rect x="78" y="55" width="56" height="60" rx="8" fill="#c7d2fe" stroke="#334155"/><line x1="84" y1="86" x2="128" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="106" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2²</text><text x="106" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">4</text><path d="M110,52 Q139,26 168,52" fill="none" stroke="#1f2937" stroke-width="1.5" marker-end="url(#ipNI1)"/><text x="139" y="30" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">÷2</text><rect x="144" y="55" width="56" height="60" rx="8" fill="#c7d2fe" stroke="#334155"/><line x1="150" y1="86" x2="194" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="172" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2¹</text><text x="172" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">2</text><path d="M176,52 Q205,26 234,52" fill="none" stroke="#1f2937" stroke-width="1.5" marker-end="url(#ipNI1)"/><text x="205" y="30" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">÷2</text><rect x="210" y="55" width="56" height="60" rx="8" fill="#bbf7d0" stroke="#334155"/><line x1="216" y1="86" x2="260" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="238" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2⁰</text><text x="238" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">1</text><path d="M242,52 Q271,26 300,52" fill="none" stroke="#1f2937" stroke-width="1.5" marker-end="url(#ipNI1)"/><text x="271" y="30" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">÷2</text><rect x="276" y="55" width="56" height="60" rx="8" fill="#fde68a" stroke="#334155"/><line x1="282" y1="86" x2="326" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="304" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2⁻¹</text><text x="304" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">1/2</text><path d="M308,52 Q337,26 366,52" fill="none" stroke="#1f2937" stroke-width="1.5" marker-end="url(#ipNI1)"/><text x="337" y="30" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">÷2</text><rect x="342" y="55" width="56" height="60" rx="8" fill="#fde68a" stroke="#334155"/><line x1="348" y1="86" x2="392" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="370" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2⁻²</text><text x="370" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">1/4</text><path d="M374,52 Q403,26 432,52" fill="none" stroke="#1f2937" stroke-width="1.5" marker-end="url(#ipNI1)"/><text x="403" y="30" font-family="sans-serif" fill="#1f2937" font-size="12" text-anchor="middle">÷2</text><rect x="408" y="55" width="56" height="60" rx="8" fill="#fde68a" stroke="#334155"/><line x1="414" y1="86" x2="458" y2="86" stroke="#334155" stroke-opacity="0.5"/><text x="436" y="78" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle" font-weight="bold">2⁻³</text><text x="436" y="106" font-family="sans-serif" fill="#1f2937" font-size="15" text-anchor="middle">1/8</text><text x="240" y="140" font-family="sans-serif" fill="#1f2937" font-size="13" text-anchor="middle">negative index → reciprocal:  2⁻³ = 1/2³ = 1/8</text></svg>`,
      diagramCaption:
        "Each step to the right divides by 2. The pattern runs straight past {{2^0 = 1}} into fractions: {{2^(-1) = 1/2}}, {{2^(-2) = 1/4}}, {{2^(-3) = 1/8}}.",
      workedExamples: [
        {
          title: "Evaluating a negative power",
          problem: "Write {{4^(-2)}} as a fraction.",
          steps: [
            "A negative index means 'one over': {{4^(-2) = 1/4^2}}.",
            "{{4^2 = 16}}, so {{4^(-2) = 1/16}}.",
          ],
          answer: "{{1/16}}",
          yourTurn: {
            question: "Your turn: write {{3^(-2)}} as a fraction.",
            answer: { type: "fraction", n: 1, d: 9 },
            solution: "{{3^(-2) = 1/3^2 = 1/9}}.",
          },
        },
        {
          title: "Using the index laws",
          problem: "Simplify {{7^3 * 7^(-5)}}, giving your answer as a fraction.",
          steps: [
            "Add the indices: 3 + (−5) = −2, so the product is {{7^(-2)}}.",
            "{{7^(-2) = 1/7^2 = 1/49}}.",
          ],
          answer: "{{1/49}}",
        },
        {
          title: "Working backwards",
          problem: "Find x if {{2^x = 1/32}}.",
          steps: [
            "32 is a power of 2: {{2^5 = 32}}.",
            "So {{1/32 = 1/2^5 = 2^(-5)}}.",
            "Matching the indices gives x = −5.",
          ],
          answer: "x = −5",
        },
      ],
      keyPoints: [
        "{{a^(-n) = 1/a^n}}: a negative index means reciprocal, not negative.",
        "{{10^(-1) = 0.1}}, {{10^(-2) = 0.01}} and {{10^(-3) = 0.001}}.",
        "All the index laws still work with negative indices.",
      ],
      whyItWorks:
        "Work out {{a^2 ÷ a^5}} in two ways. Cancelling: {{(a * a)/(a * a * a * a * a) = 1/(a * a * a) = 1/a^3}}. Using the division law: {{a^(2-5) = a^(-3)}}. Both methods are correct, so {{a^(-3)}} must equal {{1/a^3}}.",
      strategies: ["Find a pattern", "Work backwards", "Use the inverse"],
      thinkDeeper:
        "Which is bigger, {{2^(-10)}} or {{10^(-3)}}? Use {{2^10 = 1024}}, and explain why a bigger number has a smaller reciprocal.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is an integer?", back: "A whole number that is positive, negative or zero: …, −2, −1, 0, 1, 2, …" },
      { front: "5 − (−3) = ?", back: "8. Subtracting a negative is the same as adding: 5 + 3." },
      { front: "−4 + (−6) = ?", back: "−10. Adding a negative moves you further left on the number line." },
      { front: "Sign rule for × and ÷", back: "Same signs → positive. Different signs → negative." },
      { front: "(−1) × (−2) × (−3) = ?", back: "−6. Three negatives is an odd number, so the answer is negative." },
      { front: "What does BIDMAS stand for?", back: "Brackets, Indices, Division & Multiplication (left to right), Addition & Subtraction (left to right)." },
      { front: "{{(-3)^2}} or {{-3^2}}?", back: "{{(-3)^2 = 9}}, but {{-3^2 = -9}} because only the 3 is squared." },
      { front: "The square roots of 64", back: "8 and −8, written ±8. The symbol {{sqrt(64)}} means just the positive one, 8." },
      { front: "{{cbrt(-27)}}", back: "−3, because {{(-3)^3 = -27}}." },
      { front: "{{a^m * a^n}}", back: "{{a^(m+n)}}: add the indices (same base only)." },
      { front: "{{a^m ÷ a^n}}", back: "{{a^(m-n)}}: subtract the indices." },
      { front: "{{(a^m)^n}}", back: "{{a^(mn)}}: multiply the indices." },
      { front: "{{a^0}} (for a ≠ 0)", back: "1. For example, {{9^0 = 1}}." },
      { front: "What is a rational number?", back: "Any number that can be written as {{a/b}} with integers a and b, b ≠ 0 — including terminating and recurring decimals." },
      { front: "Name two irrational numbers.", back: "{{sqrt(2)}} and π (also {{sqrt(3)}}, {{sqrt(5)}}, …). Their decimals never end and never repeat." },
      { front: "{{a^(-n)}} (stretch)", back: "{{1/a^n}}. For example, {{2^(-3) = 1/8}}." },
    ],
    mustKnow: [
      "I can add and subtract negative numbers using a number line or the sign rules.",
      "I can explain why subtracting a negative number is the same as adding.",
      "I can multiply and divide negative numbers, including products of several negatives.",
      "I can estimate an integer calculation by rounding to 1 significant figure before I calculate.",
      "I can use the order of operations with brackets, powers, roots and negative numbers.",
      "I can find both square roots of a positive number and solve equations like {{x^2 = 49}}.",
      "I can find cubes and cube roots of positive and negative numbers.",
      "I can estimate a square root such as {{sqrt(50)}} by trapping it between two whole numbers.",
      "I can use the index laws to multiply, divide and raise powers, with numbers and with letters.",
      "I can explain why {{a^0 = 1}}.",
      "I can classify numbers as natural, integer, rational or irrational.",
      "I can work out negative powers such as {{2^(-3) = 1/8}} (stretch).",
    ],
    misconceptions: [
      { wrong: "5 − (−3) = 2", right: "Subtracting a negative is adding: 5 − (−3) = 5 + 3 = 8." },
      {
        wrong: "Two negatives make a positive, so −4 + (−6) = 10.",
        right: "That rule is for × and ÷ only. Adding a negative moves further left: −4 + (−6) = −10.",
      },
      { wrong: "{{-4^2 = 16}}", right: "The power touches only the 4, so {{-4^2 = -(4^2) = -16}}. It is {{(-4)^2}} that equals 16." },
      { wrong: "If {{x^2 = 49}}, then x = 7.", right: "There are two solutions: x = 7 or x = −7, because {{(-7)^2 = 49}} too." },
      { wrong: "{{2^3 * 2^4 = 4^7}}", right: "The base stays the same; only the indices are added: {{2^3 * 2^4 = 2^7}}." },
      {
        wrong: "{{5^0 = 0}}",
        right: "{{5^0 = 1}}. We know {{5^3 ÷ 5^3 = 1}}, and the division law gives {{5^(3-3) = 5^0}}, so they must be equal.",
      },
    ],
    examMistakes: [
      "Doing division before multiplication instead of working left to right: 12 ÷ 3 × 2 is 8, not 2.",
      "Working out {{3^4}} as 3 × 4 = 12 instead of 3 × 3 × 3 × 3 = 81.",
      "Giving only the positive answer when solving {{x^2 = 25}}: the solutions are x = 5 and x = −5.",
      "Typing −3² into a calculator and expecting 9 — it gives −9. Type (−3)² instead.",
      "Forgetting that a fraction bar acts as a bracket: work out the whole top and the whole bottom before dividing.",
      "Combining powers with different bases: {{2^3 * 5^2}} is 8 × 25 = 200, not a single power.",
      "Getting a temperature change wrong: from −7 °C to 5 °C is a rise of 5 − (−7) = 12 degrees, not 2.",
      "Writing {{2^(-3) = -8}}: a negative index means reciprocal, so {{2^(-3) = 1/8}}.",
    ],
    mnemonics: [
      {
        topic: "Order of operations",
        device: "BIDMAS — and the last four letters come in pairs: B, I, (DM), (AS)",
        explanation:
          "Brackets, then Indices, then Division and Multiplication as equal partners (left to right), then Addition and Subtraction as equal partners (left to right).",
      },
      {
        topic: "Sign rules for × and ÷",
        device: "A friend of a friend is a friend; an enemy of an enemy is a friend",
        explanation:
          "Friend = +, enemy = −. Friend × friend = +, enemy × enemy = +, friend × enemy = −. It works for multiplying and dividing — not for adding.",
      },
      {
        topic: "Index laws",
        device: "MAD-SPM: Multiply → Add, Divide → Subtract, Power → Multiply",
        explanation:
          "When you multiply powers of the same base, add the indices; when you divide, subtract them; when you raise a power to a power, multiply them.",
      },
      {
        topic: "Negative indices",
        device: "A negative index means flip, not minus",
        explanation: "{{a^(-n)}} flips {{a^n}} over to make {{1/a^n}}: {{10^(-2) = 1/100}}. The answer is never negative just because the index is.",
      },
    ],
    realWorld: [
      {
        title: "Freezers and heatwaves",
        detail:
          "A home freezer runs at about −18 °C while a Singapore afternoon can reach 33 °C — a difference of 33 − (−18) = 51 degrees.",
        emoji: "🌡️",
      },
      {
        title: "Lift buttons",
        detail:
          "Basement levels B1, B2, B3 in malls and MRT stations behave like floors −1, −2, −3. But watch out: most Singapore buildings have no level 0, so going from level 1 to B1 is just one floor.",
        emoji: "🛗",
      },
      {
        title: "Bank balances",
        detail: "An overdrawn account has a negative balance. If you are at −$30 and pay in $50, you are back to $20.",
        emoji: "💳",
      },
      {
        title: "Computer memory",
        detail:
          "Computers count in powers of 2: {{2^10 = 1024}} bytes make a kibibyte, and a 256 GB phone has {{2^8}} gigabytes of storage.",
        emoji: "💾",
      },
      {
        title: "Doubling bacteria",
        detail:
          "A bacterium that splits in two every 20 minutes becomes {{2^3 = 8}} cells after an hour — and {{2^30}}, over a billion, after 10 hours. Powers grow astonishingly fast.",
        emoji: "🦠",
      },
      {
        title: "Diving below sea level",
        detail: "Heights are measured from sea level, so a diver at −30 m who rises 12 m is at −30 + 12 = −18 m.",
        emoji: "🤿",
      },
    ],
    videos: [
      {
        title: "Adding and subtracting negative numbers",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+adding+and+subtracting+negative+numbers",
      },
      {
        title: "Why a negative times a negative is positive",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+why+negative+times+negative+is+positive",
      },
      {
        title: "Laws of indices",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+laws+of+indices",
      },
      {
        title: "The square root of 2 is irrational",
        channel: "Numberphile",
        url: "https://www.youtube.com/results?search_query=numberphile+square+root+of+2+irrational",
      },
    ],
    formulas: [
      { name: "Subtracting a negative", formula: "{{a - (-b) = a + b}}", note: "And adding a negative: {{a + (-b) = a - b}}." },
      { name: "Sign rules for × and ÷", formula: "{{(-a) * (-b) = ab}} and {{(-a) * b = -ab}}", note: "Same signs → positive; different signs → negative." },
      { name: "Multiplying powers", formula: "{{a^m * a^n = a^(m+n)}}", note: "Same base only." },
      { name: "Dividing powers", formula: "{{a^m ÷ a^n = a^(m-n)}}", note: "Same base only." },
      { name: "Power of a power", formula: "{{(a^m)^n = a^(mn)}}" },
      { name: "Zero index", formula: "{{a^0 = 1}}", note: "For any a ≠ 0." },
      { name: "Square roots", formula: "{{x^2 = k}} gives {{x = +-sqrt(k)}}", note: "For k > 0. The √ sign on its own means the positive root." },
      { name: "Negative index (stretch)", formula: "{{a^(-n) = 1/a^n}}", note: "A negative index means reciprocal." },
    ],
  },
};
