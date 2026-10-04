import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "sequences-graphs",
  title: "Sequences & Functions",
  strand: "Algebra",
  icon: "🪜",
  summary: "Spot the rule, leap to any term, and run machines backwards.",
  intro:
    "A sequence is a pattern you can predict: once you find its rule, you can leap to the 100th or the 1000th term without listing a thing. In this chapter you will find and use nth-term rules, tell arithmetic, geometric and Fibonacci-type sequences apart, and work function machines forwards and backwards. Along the way you will see the straight line hiding inside every linear sequence.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "term-to-term",
      heading: "Term-to-term rules & pattern sequences",
      discovery: {
        problem:
          "Matchsticks are laid out to make a row of squares: 1 square uses 4 matches, 2 squares use 7, 3 squares use 10. Before you read on: how many matches make a row of **10** squares? Can you explain the jump from one pattern to the next *using the picture*, not just the numbers?",
        idea:
          "Each new square shares a side with the one before it, so it needs only **3** new matches. That is why the counts go 4, 7, 10, … (rule: **add 3**). Pattern 10 is 9 steps after pattern 1, so it needs 4 + 9 × 3 = **31** matches. Counting what is *new* in each picture is the key to every pattern sequence.",
      },
      body:
        "A **sequence** is an ordered list of numbers that follows a rule. Each number is a **term**, and its **position** says where it sits: 1st, 2nd, 3rd, …\n\nA **term-to-term rule** tells you how to get from one term to the next, for example 'add 3', 'subtract 0.25' or 'multiply by {{1/2}}'. To describe a sequence completely you need **two** things: the **first term** and the **rule**.\n\n| Sequence | Term-to-term rule | Next term |\n|---|---|---|\n| 7, 4, 1, −2, … | subtract 3 | −5 |\n| 0.4, 0.75, 1.1, 1.45, … | add 0.35 | 1.8 |\n| {{1/2}}, {{3/4}}, 1, {{1 1/4}}, … | add {{1/4}} | {{1 1/2}} |\n| 80, 20, 5, {{5/4}}, … | divide by 4 (multiply by {{1/4}}) | {{5/16}} |\n| 1, 3, 7, 15, … | multiply by 2, then add 1 | 31 |\n\nAlways check the rule works for **every** gap, not just the first one. To go **backwards** through a sequence, use the inverse operation: in 80, 20, 5, … the term before 80 is 80 × 4 = 320.\n\n**Pattern sequences.** When a sequence comes from pictures (matchsticks, dots, tiles), look at what stays the same and what is added each time. If the same amount d is added at every step, then\n\n    pattern n = first pattern + (n − 1) × d\n\nbecause getting from pattern 1 to pattern n takes n − 1 steps.",
      diagram: `<svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Matchstick squares: pattern 1 uses 4 matches, pattern 2 uses 7 and pattern 3 uses 10. In each new pattern the 3 added matches are orange."><rect x="0" y="0" width="420" height="170" fill="#ffffff"/><g stroke-linecap="round" stroke-width="4"><line x1="33" y1="40" x2="63" y2="40" stroke="#334155"/><line x1="33" y1="76" x2="63" y2="76" stroke="#334155"/><line x1="30" y1="43" x2="30" y2="73" stroke="#334155"/><line x1="66" y1="43" x2="66" y2="73" stroke="#334155"/><line x1="133" y1="40" x2="163" y2="40" stroke="#334155"/><line x1="133" y1="76" x2="163" y2="76" stroke="#334155"/><line x1="130" y1="43" x2="130" y2="73" stroke="#334155"/><line x1="166" y1="43" x2="166" y2="73" stroke="#334155"/><line x1="169" y1="40" x2="199" y2="40" stroke="#ea580c"/><line x1="169" y1="76" x2="199" y2="76" stroke="#ea580c"/><line x1="202" y1="43" x2="202" y2="73" stroke="#ea580c"/><line x1="263" y1="40" x2="293" y2="40" stroke="#334155"/><line x1="299" y1="40" x2="329" y2="40" stroke="#334155"/><line x1="263" y1="76" x2="293" y2="76" stroke="#334155"/><line x1="299" y1="76" x2="329" y2="76" stroke="#334155"/><line x1="260" y1="43" x2="260" y2="73" stroke="#334155"/><line x1="296" y1="43" x2="296" y2="73" stroke="#334155"/><line x1="332" y1="43" x2="332" y2="73" stroke="#334155"/><line x1="335" y1="40" x2="365" y2="40" stroke="#ea580c"/><line x1="335" y1="76" x2="365" y2="76" stroke="#ea580c"/><line x1="368" y1="43" x2="368" y2="73" stroke="#ea580c"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="98" y="63" font-size="14" font-weight="bold" fill="#ea580c">+3</text><text x="231" y="63" font-size="14" font-weight="bold" fill="#ea580c">+3</text><text x="48" y="102" font-size="12">Pattern 1</text><text x="48" y="120" font-size="13" font-weight="bold">4 matches</text><text x="166" y="102" font-size="12">Pattern 2</text><text x="166" y="120" font-size="13" font-weight="bold">7 matches</text><text x="314" y="102" font-size="12">Pattern 3</text><text x="314" y="120" font-size="13" font-weight="bold">10 matches</text></g><line x1="110" y1="150" x2="140" y2="150" stroke="#ea580c" stroke-width="4" stroke-linecap="round"/><text x="150" y="154" font-size="12" font-family="sans-serif" fill="#1f2937">= new matches: always 3 per step</text></svg>`,
      diagramCaption:
        "Each new square reuses one side of the square before it, so exactly 3 matches (orange) are added each time: 4, 7, 10, …",
      workedExamples: [
        {
          title: "Decimal steps",
          problem: "Find the term-to-term rule and the next two terms of 2.3, 2.75, 3.2, 3.65, …",
          steps: [
            "Find the gaps: 2.75 − 2.3 = 0.45, 3.2 − 2.75 = 0.45 and 3.65 − 3.2 = 0.45.",
            "Every gap is the same, so the rule is **add 0.45**.",
            "3.65 + 0.45 = 4.1, then 4.1 + 0.45 = 4.55.",
          ],
          answer: "Rule: add 0.45. The next two terms are 4.1 and 4.55.",
          yourTurn: {
            question: "Your turn: find the next term of 1.6, 2.25, 2.9, 3.55, …",
            answer: { type: "number", value: 4.2 },
            solution: "Each gap is 0.65 (for example 2.25 − 1.6 = 0.65), so the next term is 3.55 + 0.65 = 4.2.",
          },
        },
        {
          title: "A fraction rule, forwards and backwards",
          problem:
            "The 3rd term of a sequence is 36 and the term-to-term rule is 'multiply by {{3/4}}'. Find the 1st term and the 5th term.",
          steps: [
            "Forwards: 36 × {{3/4}} = 27 (4th term), then 27 × {{3/4}} = {{81/4}} = {{20 1/4}} (5th term).",
            "Backwards: undo 'multiply by {{3/4}}' by dividing by {{3/4}}, which is the same as multiplying by {{4/3}}.",
            "36 × {{4/3}} = 48 (2nd term), then 48 × {{4/3}} = 64 (1st term).",
            "Check: 64 × {{3/4}} = 48 and 48 × {{3/4}} = 36 ✓.",
          ],
          answer: "1st term 64; 5th term {{20 1/4}} (= 20.25).",
        },
        {
          title: "Hexagon chains",
          problem:
            "A chain of hexagons is made from matchsticks: 1 hexagon uses 6 matches, 2 hexagons use 11 and 3 hexagons use 16. (a) How many matches does a chain of 20 hexagons need? (b) Arjun has 100 matches. What is the longest chain he can make?",
          steps: [
            "Each new hexagon shares one side with the previous one, so it adds 5 matches: the rule is 'add 5'.",
            "(a) Chain 20 is 19 steps after chain 1: 6 + 19 × 5 = 6 + 95 = 101 matches.",
            "(b) A chain of k hexagons uses 6 + (k − 1) × 5 = 5k + 1 matches. We need 5k + 1 ≤ 100, so 5k ≤ 99 and k ≤ 19.8.",
            "k must be a whole number, so the longest chain has 19 hexagons (5 × 19 + 1 = 96 matches; 20 hexagons would need 101).",
          ],
          answer: "(a) 101 matches  (b) 19 hexagons",
        },
      ],
      keyPoints: [
        "A sequence is fixed by its **first term** and its **rule**: you need both.",
        "Check the rule on every gap. Rules can add, subtract, multiply or divide, with fractions and decimals too.",
        "Go backwards with the inverse operation (undo × {{3/4}} with × {{4/3}}).",
        "In a picture pattern, count what is **new** each time: pattern n = first + (n − 1) × step.",
      ],
      whyItWorks:
        "Think of a fence: 10 posts have only 9 gaps between them. In the same way, from pattern 1 to pattern n there are n − 1 steps. If each step adds d, the total added is (n − 1) × d, so pattern n = first + (n − 1)d. For the squares that gives 4 + (n − 1) × 3 = 3n + 1, and you can *see* it in the picture: one match on the far left, then 3 more (top, bottom, right) for every square.",
      strategies: ["Find a pattern", "Draw a diagram", "Look at what changes and what stays the same"],
      thinkDeeper:
        "A sequence begins 1, 2, 4, … Find **two different** rules that both fit these three terms, and the 4th term each one gives. What does this tell you about 'continue the sequence' questions that only show three terms?",
    },
    // ------------------------------------------------------------------
    {
      id: "using-nth-term",
      heading: "Using an nth-term rule",
      discovery: {
        problem:
          "Mei claims the 50th term of 1, 4, 7, 10, … is 148, and she didn't write out a single extra term. Her secret is the rule **3n − 2**, where n is the position. Put n = 1, 2, 3 and 4 into 3n − 2: do you get the sequence? Now find the 50th term yourself. How long would it take using 'add 3'?",
        idea:
          "n = 1 gives 3 − 2 = 1, n = 2 gives 6 − 2 = 4, n = 3 gives 7 and n = 4 gives 10 ✓. So the 50th term is 3 × 50 − 2 = **148**: one calculation instead of 49 additions. A **position-to-term** rule lets you jump straight to any term.",
      },
      body:
        "An **nth-term rule** (also called a **position-to-term rule**) gives each term from its position number n. To find a term, **substitute** its position for n.\n\n| Position n | 1 | 2 | 3 | 4 | 5 | 10 |\n|---|---|---|---|---|---|---|\n| 3n − 2 | 1 | 4 | 7 | 10 | 13 | 28 |\n| {{n/2 + 1}} | {{1 1/2}} | 2 | {{2 1/2}} | 3 | {{3 1/2}} | 6 |\n| 20 − 4n | 16 | 12 | 8 | 4 | 0 | −20 |\n\nNotice three things:\n\n- The number multiplying n (the **coefficient** of n) is the gap between terms: 3n − 2 goes up in 3s, {{n/2 + 1}} goes up in halves, and 20 − 4n goes **down** in 4s because the coefficient of n is −4.\n- **Multiply before you add or subtract.** In 20 − 4n with n = 3, work out 4 × 3 = 12 first, then 20 − 12 = 8. It is not (20 − 4) × 3.\n- n is always a **positive whole number**: there is a 1st term and a 2nd term, but no 2.5th term. The *terms* can still be fractions or negative.",
      diagram: `<svg viewBox="0 0 440 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapping from positions 1 to 5 down to the terms 1, 4, 7, 10, 13 using the rule multiply by 3 then subtract 2"><rect x="0" y="0" width="440" height="170" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937"><text x="16" y="50" font-size="12" font-weight="bold">Position n</text><text x="16" y="86" font-size="12" fill="#475569">× 3, then − 2</text><text x="16" y="125" font-size="12" font-weight="bold">Term 3n − 2</text></g><g stroke="#334155" stroke-width="1.5"><circle cx="150" cy="45" r="15" fill="#c7d2fe"/><circle cx="205" cy="45" r="15" fill="#c7d2fe"/><circle cx="260" cy="45" r="15" fill="#c7d2fe"/><circle cx="315" cy="45" r="15" fill="#c7d2fe"/><circle cx="370" cy="45" r="15" fill="#c7d2fe"/><rect x="132" y="105" width="36" height="30" rx="6" fill="#fde68a"/><rect x="187" y="105" width="36" height="30" rx="6" fill="#fde68a"/><rect x="242" y="105" width="36" height="30" rx="6" fill="#fde68a"/><rect x="297" y="105" width="36" height="30" rx="6" fill="#fde68a"/><rect x="352" y="105" width="36" height="30" rx="6" fill="#fde68a"/><line x1="150" y1="62" x2="150" y2="96"/><line x1="205" y1="62" x2="205" y2="96"/><line x1="260" y1="62" x2="260" y2="96"/><line x1="315" y1="62" x2="315" y2="96"/><line x1="370" y1="62" x2="370" y2="96"/></g><g fill="#334155"><polygon points="150,104 146,96 154,96"/><polygon points="205,104 201,96 209,96"/><polygon points="260,104 256,96 264,96"/><polygon points="315,104 311,96 319,96"/><polygon points="370,104 366,96 374,96"/></g><g font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><text x="150" y="50">1</text><text x="205" y="50">2</text><text x="260" y="50">3</text><text x="315" y="50">4</text><text x="370" y="50">5</text><text x="150" y="125" font-weight="bold">1</text><text x="205" y="125" font-weight="bold">4</text><text x="260" y="125" font-weight="bold">7</text><text x="315" y="125" font-weight="bold">10</text><text x="370" y="125" font-weight="bold">13</text></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#ea580c" font-weight="bold"><text x="177.5" y="156">+3</text><text x="232.5" y="156">+3</text><text x="287.5" y="156">+3</text><text x="342.5" y="156">+3</text></g></svg>`,
      diagramCaption:
        "Each position n goes through 'multiply by 3, then subtract 2'. The terms rise by 3 each time because the coefficient of n is 3.",
      workedExamples: [
        {
          title: "Substituting",
          problem: "The nth term of a sequence is 5n + 3. Write down the first three terms and find the 20th term.",
          steps: [
            "n = 1: 5 × 1 + 3 = 8.",
            "n = 2: 5 × 2 + 3 = 13; n = 3: 5 × 3 + 3 = 18.",
            "n = 20: 5 × 20 + 3 = 100 + 3 = 103.",
          ],
          answer: "8, 13, 18, …; the 20th term is 103.",
          yourTurn: {
            question: "Your turn: the nth term of a sequence is 4n − 7. Find the 25th term.",
            answer: { type: "number", value: 93 },
            solution: "Substitute n = 25: 4 × 25 − 7 = 100 − 7 = 93.",
          },
        },
        {
          title: "A decreasing rule",
          problem: "Write down the first five terms of the sequence with nth term 20 − 4n. Which term is the first negative one?",
          steps: [
            "n = 1: 20 − 4 = 16; n = 2: 20 − 8 = 12; n = 3: 20 − 12 = 8; n = 4: 20 − 16 = 4; n = 5: 20 − 20 = 0.",
            "The coefficient of n is −4, so the terms fall by 4 each time.",
            "n = 6: 20 − 24 = −4, the first negative term.",
          ],
          answer: "16, 12, 8, 4, 0. The first negative term is the 6th term, −4.",
        },
        {
          title: "A fractional rule",
          problem: "The nth term of a sequence is {{n/2 + 1}}. Find the 1st, 2nd and 15th terms, and the term-to-term rule.",
          steps: [
            "n = 1: {{1/2 + 1 = 1 1/2}}.",
            "n = 2: {{2/2 + 1 = 2}}.",
            "n = 15: {{15/2 + 1 = 7 1/2 + 1 = 8 1/2}}.",
            "{{n/2}} is the same as {{1/2}} × n, so the coefficient of n is {{1/2}} and the rule is 'add {{1/2}}'.",
          ],
          answer: "{{1 1/2}}, 2 and {{8 1/2}}; the term-to-term rule is 'add {{1/2}}'.",
        },
      ],
      keyPoints: [
        "n is the **position**: substitute it to get the term.",
        "The coefficient of n is the common difference; a negative coefficient means a decreasing sequence.",
        "Multiply before adding or subtracting: 20 − 4n at n = 3 is 20 − 12 = 8.",
        "Positions are positive whole numbers; terms can be any number.",
      ],
      whyItWorks:
        "Moving from position n to position n + 1 adds 1 to n, so 3n grows by exactly 3 while the −2 never changes. Every step therefore adds 3: the term-to-term rule is hiding inside the coefficient. The same argument shows 20 − 4n falls by 4 each step and {{n/2 + 1}} rises by {{1/2}}.",
      strategies: ["Make a table", "Check by substituting", "Look at the coefficient"],
      thinkDeeper:
        "Two sequences have nth terms 3n + 4 and 5n − 6. Is there a position where they have the **same** term? After that position, which sequence is bigger, and how can you tell without working out any more terms?",
    },
    // ------------------------------------------------------------------
    {
      id: "finding-nth-term",
      heading: "Finding the nth term",
      discovery: {
        problem:
          "The sequence 7, 11, 15, 19, … goes up by 4. Imagine walking one step *backwards* from the first term to a pretend '**zeroth term**'. What is it? Now use the zeroth term and the step of 4 to write down the 100th term without listing anything.",
        idea:
          "One step back from 7 is 7 − 4 = **3**. Starting from 3, you reach position n after n steps of 4, so the nth term is **4n + 3**. Check: n = 1 gives 7 ✓ and n = 2 gives 11 ✓. The 100th term is 4 × 100 + 3 = **403**.",
      },
      body:
        "A sequence with a constant difference is called **linear** (or **arithmetic**). Its nth term always has the form\n\n    nth term = dn + c\n\nwhere **d** is the common difference and **c** is the **zero term**: the value one step *before* the first term.\n\n**The zero-term method**\n\n1. Find the common difference d. This is the coefficient of n.\n2. Find the zero term: first term − d.\n3. Write nth term = dn + (zero term).\n4. Check with the 2nd or 3rd term.\n\n| Sequence | d | Zero term | nth term |\n|---|---|---|---|\n| 7, 11, 15, 19, … | 4 | 7 − 4 = 3 | 4n + 3 |\n| −1, 2, 5, 8, … | 3 | −1 − 3 = −4 | 3n − 4 |\n| 23, 18, 13, 8, … | −5 | 23 + 5 = 28 | 28 − 5n |\n| 2, 2.5, 3, 3.5, … | 0.5 | 1.5 | 0.5n + 1.5 |\n| {{1/3}}, 1, {{5/3}}, {{7/3}}, … | {{2/3}} | {{-1/3}} | {{2/3 n - 1/3}} |\n\n**Negative d:** take extra care. For 23, 18, 13, … the difference is −5, so the zero term is 23 − (−5) = 28 and the rule is −5n + 28, usually written 28 − 5n.\n\n**Fractional d:** the method is identical. You can tidy {{2/3 n - 1/3}} into one fraction, {{(2n - 1)/3}}, and 0.5n + 1.5 into {{(n + 3)/2}}.\n\n**Another way: compare with the multiples.** Write the multiples of d under the sequence and see what you must add. For 7, 11, 15, … the multiples of 4 are 4, 8, 12, …, and every term is 3 more, so the nth term is 4n + 3.",
      diagram: `<svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of term against position for 4n + 3. Points at positions 1 to 5 with terms 7, 11, 15, 19, 23 lie on a straight dashed line that meets the vertical axis at the zero term 3."><rect x="0" y="0" width="360" height="300" fill="#ffffff"/><g stroke="#e2e8f0" stroke-width="1"><line x1="100" y1="35" x2="100" y2="260"/><line x1="150" y1="35" x2="150" y2="260"/><line x1="200" y1="35" x2="200" y2="260"/><line x1="250" y1="35" x2="250" y2="260"/><line x1="300" y1="35" x2="300" y2="260"/><line x1="50" y1="215" x2="300" y2="215"/><line x1="50" y1="170" x2="300" y2="170"/><line x1="50" y1="125" x2="300" y2="125"/><line x1="50" y1="80" x2="300" y2="80"/><line x1="50" y1="35" x2="300" y2="35"/></g><g stroke="#334155" stroke-width="1.5"><line x1="50" y1="260" x2="320" y2="260"/><line x1="50" y1="260" x2="50" y2="25"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="50" y="276">0</text><text x="100" y="276">1</text><text x="150" y="276">2</text><text x="200" y="276">3</text><text x="250" y="276">4</text><text x="300" y="276">5</text><text x="320" y="294" text-anchor="end">position n</text><text x="50" y="18">term</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end"><text x="44" y="219">5</text><text x="44" y="174">10</text><text x="44" y="129">15</text><text x="44" y="84">20</text><text x="44" y="39">25</text></g><line x1="50" y1="233" x2="300" y2="53" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5 4"/><polyline points="100,197 150,197 150,161" fill="none" stroke="#ea580c" stroke-width="2"/><g font-family="sans-serif" font-size="12" font-weight="bold" fill="#ea580c"><text x="125" y="212" text-anchor="middle">+1</text><text x="157" y="183">+4</text></g><circle cx="50" cy="233" r="5" fill="#ffffff" stroke="#4f46e5" stroke-width="2"/><g fill="#4f46e5"><circle cx="100" cy="197" r="5"/><circle cx="150" cy="161" r="5"/><circle cx="200" cy="125" r="5"/><circle cx="250" cy="89" r="5"/><circle cx="300" cy="53" r="5"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end"><text x="92" y="189">7</text><text x="142" y="153">11</text><text x="192" y="117">15</text><text x="242" y="81">19</text><text x="292" y="45">23</text></g><text x="58" y="250" font-family="sans-serif" font-size="11" fill="#475569">zero term = 3</text><text x="70" y="60" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4f46e5">term = 4n + 3</text></svg>`,
      diagramCaption:
        "The terms of 4n + 3 plotted against their positions lie on a straight line. Each step right (+1 in n) goes up 4, the coefficient, and the line meets the vertical axis at the zero term, 3.",
      workedExamples: [
        {
          title: "An increasing sequence",
          problem: "Find the nth term of 5, 8, 11, 14, …",
          steps: [
            "Difference: 8 − 5 = 3, so the rule starts 3n.",
            "Zero term: 5 − 3 = 2.",
            "nth term = 3n + 2.",
            "Check: n = 3 gives 3 × 3 + 2 = 11 ✓.",
          ],
          answer: "3n + 2",
          yourTurn: {
            question: "Your turn: find the nth term of 9, 15, 21, 27, …",
            answer: { type: "expression", expr: "6n+3", display: "6n + 3" },
            solution: "The difference is 6 and the zero term is 9 − 6 = 3, so the nth term is 6n + 3. Check: n = 2 gives 15 ✓.",
          },
        },
        {
          title: "A decreasing sequence",
          problem: "Find the nth term of 14, 11, 8, 5, … and use it to find the 30th term.",
          steps: [
            "Difference: 11 − 14 = −3, so the rule starts −3n.",
            "Zero term: 14 − (−3) = 17.",
            "nth term = −3n + 17, usually written 17 − 3n. Check: n = 2 gives 17 − 6 = 11 ✓.",
            "30th term: 17 − 3 × 30 = 17 − 90 = −73.",
          ],
          answer: "17 − 3n; the 30th term is −73.",
        },
        {
          title: "A fractional difference",
          problem: "Find the nth term of 2.5, 3.25, 4, 4.75, … Give your answer as a single fraction.",
          steps: [
            "Difference: 3.25 − 2.5 = 0.75 = {{3/4}}.",
            "Zero term: 2.5 − 0.75 = 1.75 = {{7/4}}.",
            "nth term = {{3/4 n + 7/4 = (3n + 7)/4}}.",
            "Check: n = 2 gives {{(6 + 7)/4 = 13/4}} = 3.25 ✓.",
          ],
          answer: "{{(3n + 7)/4}}",
        },
      ],
      keyPoints: [
        "Linear nth term = dn + c: d is the common difference, c is the zero term.",
        "Zero term = first term − d. When d is negative, subtracting it means adding.",
        "Fractions and decimals work in exactly the same way.",
        "Always check your rule on a term you did not use to find it.",
      ],
      whyItWorks:
        "Start at the zero term c. Each step along the sequence adds d, and the nth term is n steps from the start, so nth term = c + n × d = dn + c. On a graph of term against position the points lie on a straight line: d is how steep it is and c is where it meets the vertical axis. These are exactly the m and c of a straight-line graph y = mx + c.",
      strategies: ["Work backwards", "Check by substituting", "Compare with a known sequence"],
      thinkDeeper:
        "A linear sequence has 5th term 23 and 9th term 39. Find its nth term *without* finding the first term. (How many steps of d are there from the 5th term to the 9th?)",
    },
    // ------------------------------------------------------------------
    {
      id: "is-it-a-term",
      heading: "Is it in the sequence?",
      discovery: {
        problem:
          "The sequence 4, 7, 10, 13, … goes on forever. Jun says: 'Both 100 and 200 must be in it somewhere, because it never stops!' Is Jun right? Decide for each number, and find a way to be *sure* without listing terms.",
        idea:
          "The nth term is 3n + 1. Solving 3n + 1 = 100 gives 3n = 99, so n = 33: a whole number, so 100 is the **33rd term**. Solving 3n + 1 = 200 gives 3n = 199, so n = 66.33…: not a whole number, so 200 is **not** a term. The 66th term is 199 and the 67th is 202, so 200 is skipped. Going on forever does not mean hitting every number.",
      },
      body:
        "To decide whether a number k is in a sequence:\n\n1. Find the nth term (if you are not given it).\n2. Set the nth term equal to k and solve for n.\n3. If n is a **positive whole number**, k is the nth term. If n is a fraction, a decimal, zero or negative, k is **not** in the sequence.\n\n    4n + 1 = 77  →  4n = 76  →  n = 19  ✓ (77 is the 19th term)\n    4n + 1 = 80  →  4n = 79  →  n = 19.75  ✗ (80 is not a term)\n\n**A remainder shortcut.** Every term of 3n + 1 is *one more than a multiple of 3*. Since 200 = 3 × 66 + 2 leaves remainder 2, it cannot be a term. This works whenever the terms are whole numbers going up in equal steps: every term of 4n + 1 leaves remainder 1 when divided by 4, so 80 (remainder 0) is not one of them.\n\n**First term above (or below) a value.** Solve as if it were an equation, then decide which whole number to pick:\n\n- First term of 3n + 1 greater than 500: 3n + 1 > 500 gives n > 166.33…, so n = 167 and the term is 502.\n- First negative term of 150 − 7n: 150 − 7n < 0 gives 7n > 150, so n > 21.4… Then n = 22 and the term is 150 − 154 = −4.\n\nAlways check the terms on each side: for 3n + 1, the 166th term is 499 (not above 500) and the 167th is 502.",
      diagram: `<svg viewBox="0 0 460 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 188 to 207 showing the terms of 3n + 1: 190, 193, 196, 199, 202 and 205 as the 63rd to 68th terms. 200 is marked with a red cross between the 66th and 67th terms."><rect x="0" y="0" width="460" height="130" fill="#ffffff"/><line x1="10" y1="70" x2="450" y2="70" stroke="#334155" stroke-width="2"/><g stroke="#334155" stroke-width="1"><line x1="20" y1="66" x2="20" y2="74"/><line x1="42" y1="66" x2="42" y2="74"/><line x1="64" y1="66" x2="64" y2="74"/><line x1="86" y1="66" x2="86" y2="74"/><line x1="108" y1="66" x2="108" y2="74"/><line x1="130" y1="66" x2="130" y2="74"/><line x1="152" y1="66" x2="152" y2="74"/><line x1="174" y1="66" x2="174" y2="74"/><line x1="196" y1="66" x2="196" y2="74"/><line x1="218" y1="66" x2="218" y2="74"/><line x1="240" y1="66" x2="240" y2="74"/><line x1="262" y1="66" x2="262" y2="74"/><line x1="284" y1="66" x2="284" y2="74"/><line x1="306" y1="66" x2="306" y2="74"/><line x1="328" y1="66" x2="328" y2="74"/><line x1="350" y1="66" x2="350" y2="74"/><line x1="372" y1="66" x2="372" y2="74"/><line x1="394" y1="66" x2="394" y2="74"/><line x1="416" y1="66" x2="416" y2="74"/><line x1="438" y1="66" x2="438" y2="74"/></g><g fill="#4f46e5"><circle cx="64" cy="70" r="6"/><circle cx="130" cy="70" r="6"/><circle cx="196" cy="70" r="6"/><circle cx="262" cy="70" r="6"/><circle cx="328" cy="70" r="6"/><circle cx="394" cy="70" r="6"/></g><g stroke="#dc2626" stroke-width="2.5"><line x1="278" y1="64" x2="290" y2="76"/><line x1="278" y1="76" x2="290" y2="64"/></g><g font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle"><text x="64" y="50">n = 63</text><text x="130" y="50">n = 64</text><text x="196" y="50">n = 65</text><text x="262" y="50">n = 66</text><text x="328" y="50">n = 67</text><text x="394" y="50">n = 68</text><text x="64" y="90">190</text><text x="130" y="90">193</text><text x="196" y="90">196</text><text x="262" y="90">199</text><text x="328" y="90">202</text><text x="394" y="90">205</text></g><text x="284" y="112" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">200 is not a term</text><text x="16" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937">Terms of 3n + 1</text></svg>`,
      diagramCaption:
        "Terms of 3n + 1 near 200. The sequence jumps from 199 (the 66th term) to 202 (the 67th term), so 200 is never reached.",
      workedExamples: [
        {
          title: "Which term?",
          problem: "Is 145 a term of the sequence with nth term 6n − 5? If so, which term is it?",
          steps: [
            "Set 6n − 5 = 145.",
            "Add 5 to both sides: 6n = 150.",
            "Divide by 6: n = 25, a positive whole number.",
            "Check: 6 × 25 − 5 = 150 − 5 = 145 ✓.",
          ],
          answer: "Yes: 145 is the 25th term.",
          yourTurn: {
            question: "Your turn: which term of the sequence with nth term 7n + 4 is equal to 249?",
            answer: { type: "number", value: 35 },
            solution: "7n + 4 = 249, so 7n = 245 and n = 35. It is the 35th term.",
          },
        },
        {
          title: "Not a term",
          problem: "Is 80 a term of the sequence 5, 9, 13, 17, …? Explain.",
          steps: [
            "The difference is 4 and the zero term is 1, so the nth term is 4n + 1.",
            "Set 4n + 1 = 80, so 4n = 79 and n = 19.75.",
            "19.75 is not a whole number, so no position has the value 80.",
            "Neighbours: the 19th term is 77 and the 20th is 81, so 80 is skipped.",
          ],
          answer: "No: solving 4n + 1 = 80 gives n = 19.75, which is not a whole number.",
        },
        {
          title: "First term above a value",
          problem: "Find the first term of the sequence with nth term 8n − 3 that is greater than 500.",
          steps: [
            "Solve 8n − 3 = 500: 8n = 503, so n = 62.875.",
            "Positions are whole numbers, and the terms are increasing, so round **up**: n = 63.",
            "63rd term: 8 × 63 − 3 = 504 − 3 = 501.",
            "Check the term before: 8 × 62 − 3 = 493, which is not above 500 ✓.",
          ],
          answer: "501 (the 63rd term)",
        },
      ],
      keyPoints: [
        "Set nth term = the number, and solve for n.",
        "Positive whole n → it is a term (the nth one). Anything else → it is not.",
        "For 'first term above/below', solve, take the next whole number, and check its neighbour.",
        "Shortcut: every term of 3n + 1 is 1 more than a multiple of 3.",
      ],
      whyItWorks:
        "The nth-term rule is a function machine from positions to terms. Asking 'is k a term?' means running the machine **backwards**: undo each operation, last one first, to find which position would produce k. Positions only come as whole numbers (1st, 2nd, 3rd, …), so if the backwards answer is not a positive whole number, no position produces k.",
      strategies: ["Use the inverse", "Check by substituting", "Estimate first"],
      thinkDeeper:
        "Which numbers appear in **both** 3n + 1 (4, 7, 10, …) and 5n + 2 (7, 12, 17, …)? List the first three common terms. They form a sequence of their own: find its nth term, and explain why its difference must be 15.",
    },
    // ------------------------------------------------------------------
    {
      id: "special-sequences",
      heading: "Arithmetic, geometric & special sequences",
      discovery: {
        problem:
          "You are offered a 30-day holiday job with two pay plans. **Plan A:** $100 every day. **Plan B:** 1 cent on day 1, 2 cents on day 2, 4 cents on day 3, doubling every day. Which plan pays more *on day 30*? Guess first, then estimate.",
        idea:
          "Plan A pays $100 on day 30. Plan B pays {{2^29}} cents = 536,870,912 cents, about **$5.4 million**, on day 30! Plan A **adds** the same amount each day (arithmetic); Plan B **multiplies** by the same number each day (geometric). Repeated multiplying always overtakes repeated adding in the end.",
      },
      body:
        "Sequences come in families. Recognising the family is the first step to continuing it or finding its rule.\n\n- An **arithmetic** sequence adds (or subtracts) the same number each time, called the **common difference**. Example: 5, 15, 25, 35, … (difference 10). These are the linear sequences.\n- A **geometric** sequence multiplies by the same number each time, called the **common ratio**. Find it by dividing a term by the one before. Examples: 3, 6, 12, 24, … (ratio 2); 81, 27, 9, 3, … (ratio {{1/3}}); 2, −6, 18, −54, … (ratio −3, so the signs alternate).\n- A **Fibonacci-type** sequence makes each term by **adding the two terms before it**. The famous one is 1, 1, 2, 3, 5, 8, 13, 21, …, but any starting pair works: 2, 5, 7, 12, 19, 31, …\n\nSome special sequences are worth knowing by heart:\n\n| n | 1 | 2 | 3 | 4 | 5 | 6 | nth term |\n|---|---|---|---|---|---|---|---|\n| Square numbers | 1 | 4 | 9 | 16 | 25 | 36 | {{n^2}} |\n| Cube numbers | 1 | 8 | 27 | 64 | 125 | 216 | {{n^3}} |\n| Triangular numbers | 1 | 3 | 6 | 10 | 15 | 21 | {{(n(n + 1))/2}} |\n| Powers of 2 | 2 | 4 | 8 | 16 | 32 | 64 | {{2^n}} |\n\n**How to identify a sequence:**\n\n1. Work out the differences. All the same → arithmetic.\n2. Work out the ratios (each term ÷ the one before). All the same → geometric.\n3. Is each term the sum of the two before it? → Fibonacci-type.\n4. Do you recognise squares, cubes or triangular numbers, perhaps with something added?",
      diagram: `<svg viewBox="0 0 460 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangular numbers 1, 3, 6 and 10 drawn as staircases of dots, and two staircases of 10 dots fitting together into a 4 by 5 rectangle of 20 dots"><rect x="0" y="0" width="460" height="175" fill="#ffffff"/><text x="16" y="28" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937">Triangular numbers</text><g fill="#a5b4fc" stroke="#334155" stroke-width="1"><circle cx="30" cy="130" r="6"/><circle cx="75" cy="114" r="6"/><circle cx="75" cy="130" r="6"/><circle cx="91" cy="130" r="6"/><circle cx="135" cy="98" r="6"/><circle cx="135" cy="114" r="6"/><circle cx="151" cy="114" r="6"/><circle cx="135" cy="130" r="6"/><circle cx="151" cy="130" r="6"/><circle cx="167" cy="130" r="6"/><circle cx="210" cy="82" r="6"/><circle cx="210" cy="98" r="6"/><circle cx="226" cy="98" r="6"/><circle cx="210" cy="114" r="6"/><circle cx="226" cy="114" r="6"/><circle cx="242" cy="114" r="6"/><circle cx="210" cy="130" r="6"/><circle cx="226" cy="130" r="6"/><circle cx="242" cy="130" r="6"/><circle cx="258" cy="130" r="6"/><circle cx="320" cy="82" r="6"/><circle cx="320" cy="98" r="6"/><circle cx="336" cy="98" r="6"/><circle cx="320" cy="114" r="6"/><circle cx="336" cy="114" r="6"/><circle cx="352" cy="114" r="6"/><circle cx="320" cy="130" r="6"/><circle cx="336" cy="130" r="6"/><circle cx="352" cy="130" r="6"/><circle cx="368" cy="130" r="6"/></g><g fill="#fde68a" stroke="#334155" stroke-width="1"><circle cx="336" cy="82" r="6"/><circle cx="352" cy="82" r="6"/><circle cx="368" cy="82" r="6"/><circle cx="384" cy="82" r="6"/><circle cx="352" cy="98" r="6"/><circle cx="368" cy="98" r="6"/><circle cx="384" cy="98" r="6"/><circle cx="368" cy="114" r="6"/><circle cx="384" cy="114" r="6"/><circle cx="384" cy="130" r="6"/></g><line x1="290" y1="60" x2="290" y2="145" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="30" y="160" font-size="13" font-weight="bold">1</text><text x="83" y="160" font-size="13" font-weight="bold">3</text><text x="151" y="160" font-size="13" font-weight="bold">6</text><text x="234" y="160" font-size="13" font-weight="bold">10</text><text x="352" y="62" font-size="12">two copies of 10</text><text x="352" y="160" font-size="12">4 × 5 = 20 = 2 × 10</text></g></svg>`,
      diagramCaption:
        "Triangular numbers 1, 3, 6, 10 as staircases of dots. Two copies of the 4th one fit together into a 4 × 5 rectangle, so it holds {{(4 * 5)/2}} = 10 dots.",
      workedExamples: [
        {
          title: "Name the family",
          problem:
            "Decide whether each sequence is arithmetic, geometric or Fibonacci-type, and give the next term.\n\n(a) 5, 15, 45, 135, …   (b) 5, 15, 25, 35, …   (c) 5, 15, 20, 35, …",
          steps: [
            "(a) Differences 10, 30, 90 are not constant. Ratios: 15 ÷ 5 = 3, 45 ÷ 15 = 3, 135 ÷ 45 = 3. Geometric with ratio 3, so the next term is 135 × 3 = 405.",
            "(b) The differences are all 10. Arithmetic, so the next term is 35 + 10 = 45.",
            "(c) Differences 10, 5, 15 are not constant, and the ratios are not constant either. But 5 + 15 = 20 and 15 + 20 = 35, so it is Fibonacci-type: the next term is 20 + 35 = 55.",
          ],
          answer: "(a) geometric, 405  (b) arithmetic, 45  (c) Fibonacci-type, 55",
          yourTurn: {
            question:
              "Your turn: the Fibonacci-type sequence 3, 4, 7, 11, … continues by adding the two previous terms. Find the 8th term.",
            answer: { type: "number", value: 76 },
            solution: "3, 4, 7, 11, 18, 29, 47, 76: the 8th term is 76.",
          },
        },
        {
          title: "A shrinking geometric sequence",
          problem: "Find the common ratio and the 7th term of 96, 48, 24, 12, …",
          steps: [
            "Ratio: 48 ÷ 96 = {{1/2}} (check: 24 ÷ 48 = {{1/2}}).",
            "Keep multiplying by {{1/2}}: 12 (4th) → 6 (5th) → 3 (6th) → 1.5 (7th).",
          ],
          answer: "Ratio {{1/2}}; 7th term 1.5",
        },
        {
          title: "Fibonacci with a gap",
          problem: "A Fibonacci-type sequence has 1st term 4 and 4th term 22. Find the 2nd and 3rd terms.",
          steps: [
            "Call the 2nd term x. Then the 3rd term is 4 + x.",
            "The 4th term is (2nd) + (3rd) = x + (4 + x) = 2x + 4.",
            "So 2x + 4 = 22, giving 2x = 18 and x = 9.",
            "The sequence is 4, 9, 13, 22. Check: 9 + 13 = 22 ✓.",
          ],
          answer: "2nd term 9, 3rd term 13",
        },
      ],
      keyPoints: [
        "Arithmetic: the same **difference** each time (add). Geometric: the same **ratio** each time (multiply).",
        "Fibonacci-type: each term = the sum of the previous two.",
        "Know the square, cube and triangular numbers up to at least the 10th.",
        "Test differences first, then ratios, then 'add the previous two'.",
      ],
      whyItWorks:
        "Why is the nth triangular number {{(n(n + 1))/2}}? Draw it as a staircase of dots with rows of 1, 2, 3, …, n. Two identical staircases, one turned upside down, fit together into a rectangle n rows tall and n + 1 dots wide. The rectangle holds n(n + 1) dots, so one staircase holds half of that. Check: n = 4 gives {{(4 * 5)/2}} = 10 ✓.",
      strategies: ["Draw a diagram", "Introduce a variable", "Find a pattern"],
      thinkDeeper:
        "Add pairs of neighbouring triangular numbers: 1 + 3, 3 + 6, 6 + 10, 10 + 15. What do you always get? Use a dot picture to explain why it must happen every time.",
    },
    // ------------------------------------------------------------------
    {
      id: "functions",
      heading: "Functions & function machines",
      discovery: {
        problem:
          "A machine multiplies any number by 4, then subtracts 3. Priya feeds in a secret number and **2** comes out. What did she put in? What would you have to put in to get **0** out?",
        idea:
          "Run the machine backwards, undoing the *last* step first. Add 3 (2 + 3 = 5), then divide by 4: the input was {{5/4}} = 1.25. For an output of 0: 0 + 3 = 3 and 3 ÷ 4 = {{3/4}}. Check: {{3/4}} × 4 − 3 = 0 ✓. Inputs don't have to be whole numbers, and reversing the steps finds them.",
      },
      body:
        "A **function** is a rule that turns each **input** into exactly **one output**. A **function machine** shows the rule as a chain of operations, done in order:\n\n    x  →  [× 4]  →  [− 3]  →  4x − 3\n\nThe same function can be written as a **mapping**, x → 4x − 3, or as a table of inputs and outputs:\n\n| Input x | −1 | 0 | {{1/2}} | 2 | 5 |\n|---|---|---|---|---|---|\n| Output 4x − 3 | −7 | −3 | −1 | 5 | 17 |\n\n**Order matters.** '× 4, then − 3' gives 4x − 3, but '− 3, then × 4' gives 4(x − 3) = 4x − 12. Different machines!\n\n**Finding the input.** To work backwards, undo each step with its **inverse operation**, starting with the **last** step:\n\n| Operation | Inverse |\n|---|---|\n| + 5 | − 5 |\n| × 4 | ÷ 4 |\n| ÷ 2 | × 2 |\n| × {{2/3}} | ÷ {{2/3}}, which is × {{3/2}} |\n\n**One input, one output.** 'Square the input' is a function: −3 and 3 both give 9, and that is allowed (two inputs may share an output). But 'give a number whose square is the input' is **not** a function, because the input 9 would have two outputs, 3 and −3.\n\n**Function notation (stretch).** We often name a function f and write f(x) = 4x − 3. Then f(5) means 'the output when the input is 5': f(5) = 4 × 5 − 3 = 17. The **inverse function**, written {{f^(-1)}}, undoes f: here {{f^(-1)(x) = (x + 3)/4}}, so {{f^(-1)(17) = 5}}.",
      diagram: `<svg viewBox="0 0 460 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Function machine. Forwards: 5 goes into times 4 to give 20, then minus 3 to give 17. Backwards: 17 goes into plus 3 to give 20, then divide by 4 to give 5."><rect x="0" y="0" width="460" height="175" fill="#ffffff"/><g font-family="sans-serif" fill="#475569" font-size="11" text-anchor="middle"><text x="40" y="28">input</text><text x="375" y="28">output</text></g><g stroke="#334155" stroke-width="1.5"><rect x="108" y="37" width="72" height="36" rx="6" fill="#c7d2fe"/><rect x="230" y="37" width="72" height="36" rx="6" fill="#c7d2fe"/><rect x="108" y="107" width="72" height="36" rx="6" fill="#fde68a"/><rect x="230" y="107" width="72" height="36" rx="6" fill="#fde68a"/><line x1="55" y1="55" x2="100" y2="55"/><line x1="180" y1="55" x2="222" y2="55"/><line x1="302" y1="55" x2="344" y2="55"/><line x1="63" y1="125" x2="108" y2="125"/><line x1="188" y1="125" x2="230" y2="125"/><line x1="310" y1="125" x2="352" y2="125"/></g><g fill="#334155"><polygon points="108,55 100,51 100,59"/><polygon points="230,55 222,51 222,59"/><polygon points="352,55 344,51 344,59"/><polygon points="55,125 63,121 63,129"/><polygon points="180,125 188,121 188,129"/><polygon points="302,125 310,121 310,129"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="40" y="61" font-size="16" font-weight="bold">5</text><text x="144" y="61" font-size="15">× 4</text><text x="205" y="46" font-size="13">20</text><text x="266" y="61" font-size="15">− 3</text><text x="375" y="61" font-size="16" font-weight="bold">17</text><text x="40" y="131" font-size="16" font-weight="bold">5</text><text x="144" y="131" font-size="15">÷ 4</text><text x="205" y="116" font-size="13">20</text><text x="266" y="131" font-size="15">+ 3</text><text x="375" y="131" font-size="16" font-weight="bold">17</text></g><g font-family="sans-serif" font-size="11" fill="#475569" text-anchor="end"><text x="455" y="60">forwards</text><text x="455" y="130">backwards</text></g><text x="230" y="166" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">Backwards: undo the last step first</text></svg>`,
      diagramCaption:
        "Forwards: 5 → × 4 → 20 → − 3 → 17. Backwards, undo the last step first: 17 → + 3 → 20 → ÷ 4 → 5.",
      workedExamples: [
        {
          title: "Output and input",
          problem:
            "A function machine does '× 3, then + 5'. (a) Find the output when the input is −2. (b) Find the input when the output is 26.",
          steps: [
            "(a) −2 × 3 = −6, then −6 + 5 = −1.",
            "(b) Undo the last step first: 26 − 5 = 21.",
            "Then undo × 3: 21 ÷ 3 = 7.",
            "Check: 7 × 3 + 5 = 26 ✓.",
          ],
          answer: "(a) −1  (b) 7",
          yourTurn: {
            question: "Your turn: a function machine does '× 5, then − 8'. The output is 27. What was the input?",
            answer: { type: "number", value: 7 },
            solution: "Undo − 8: 27 + 8 = 35. Undo × 5: 35 ÷ 5 = 7. Check: 7 × 5 − 8 = 27 ✓.",
          },
        },
        {
          title: "Fractions in the machine",
          problem: "A machine does '× {{2/3}}, then + 4'. The output is 10. Find the input.",
          steps: [
            "Undo + 4: 10 − 4 = 6.",
            "Undo × {{2/3}} by dividing by {{2/3}}: 6 ÷ {{2/3}} = 6 × {{3/2}} = 9.",
            "Check: 9 × {{2/3}} = 6, and 6 + 4 = 10 ✓.",
          ],
          answer: "9",
        },
        {
          title: "Function notation",
          problem: "f(x) = 3x − 7. (a) Find f(4) and f(−2). (b) Solve f(x) = 11. (c) Write down {{f^(-1)(x)}}.",
          steps: [
            "(a) f(4) = 3 × 4 − 7 = 5 and f(−2) = 3 × (−2) − 7 = −13.",
            "(b) 3x − 7 = 11, so 3x = 18 and x = 6.",
            "(c) f does '× 3, then − 7', so {{f^(-1)}} does '+ 7, then ÷ 3': {{f^(-1)(x) = (x + 7)/3}}.",
            "Check: {{f^(-1)(11) = 18/3 = 6}}, matching part (b) ✓.",
          ],
          answer: "(a) f(4) = 5, f(−2) = −13  (b) x = 6  (c) {{f^(-1)(x) = (x + 7)/3}}",
        },
      ],
      keyPoints: [
        "A function gives each input exactly one output.",
        "Reverse a machine with inverse operations, undoing the last step first.",
        "To undo × {{a/b}}, multiply by {{b/a}}.",
        "f(5) means 'put 5 into f'; {{f^(-1)}} is the machine run backwards.",
      ],
      whyItWorks:
        "Think of putting on socks and then shoes. To undo it you take the shoes off **first**, then the socks: the last thing done is the first thing undone. A function machine is the same. The input was multiplied by 4 and *then* had 3 taken off, so to recover it you add the 3 back first and then divide by 4. Doing it in the wrong order undoes the wrong thing.",
      strategies: ["Use the inverse", "Work backwards", "Check by substituting"],
      thinkDeeper:
        "Machine A does '+ 2, then × 3'. Machine B does '× 3, then + 2'. Can they ever give the same output for the same input? Write each machine as an expression in x and use it to explain your answer.",
    },
    // ------------------------------------------------------------------
    {
      id: "quadratic-sequences",
      heading: "Quadratic sequences",
      discovery: {
        problem:
          "Look at 2, 5, 10, 17, 26, … The gaps are not equal, so it is not linear. Work out the gaps, then the gaps *between the gaps*. What do you notice? Now compare each term with the square numbers 1, 4, 9, 16, 25.",
        idea:
          "The first differences are 3, 5, 7, 9 and the **second differences** are all 2. Each term is exactly one more than a square number, so the nth term is **{{n^2 + 1}}**. A constant second difference is the fingerprint of a sequence with an {{n^2}} term.",
      },
      body:
        "**Stretch:** this section looks ahead to Year 9.\n\nIn a linear sequence the **first differences** (the gaps between terms) are constant. In a **quadratic sequence** they are not, but the **second differences** (the gaps between the gaps) are.\n\nThe nth term of a quadratic sequence has {{n^2}} as its highest power. The simplest ones are close relatives of the square numbers:\n\n| Sequence | 1st differences | 2nd difference | nth term |\n|---|---|---|---|\n| 1, 4, 9, 16, 25 | 3, 5, 7, 9 | 2 | {{n^2}} |\n| 2, 5, 10, 17, 26 | 3, 5, 7, 9 | 2 | {{n^2 + 1}} |\n| 0, 3, 8, 15, 24 | 3, 5, 7, 9 | 2 | {{n^2 - 1}} |\n| 2, 8, 18, 32, 50 | 6, 10, 14, 18 | 4 | {{2n^2}} |\n| 2, 6, 12, 20, 30 | 4, 6, 8, 10 | 2 | {{n^2 + n}} |\n\n**Method for sequences like {{n^2 + k}}:**\n\n1. Find the second difference. The coefficient of {{n^2}} is **half** of it: 2 means {{n^2}}, 4 means {{2n^2}}.\n2. Subtract that {{n^2}} part from each term.\n3. If what is left is constant, add it on. (If what is left is a linear sequence, find its nth term and add that on.)",
      diagram: `<svg viewBox="0 0 470 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Difference table for 2, 5, 10, 17, 26: first differences 3, 5, 7, 9 and second differences 2, 2, 2"><rect x="0" y="0" width="470" height="170" fill="#ffffff"/><g font-family="sans-serif" font-size="11" fill="#475569"><text x="10" y="49">terms</text><text x="10" y="99">1st differences</text><text x="10" y="149">2nd differences</text></g><text x="462" y="20" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4f46e5" text-anchor="end">nth term: n² + 1</text><rect x="182" y="126" width="176" height="28" rx="8" fill="#bbf7d0"/><g stroke="#94a3b8" stroke-width="1.5"><line x1="136" y1="52" x2="161" y2="80"/><line x1="194" y1="52" x2="169" y2="80"/><line x1="206" y1="52" x2="231" y2="80"/><line x1="264" y1="52" x2="239" y2="80"/><line x1="276" y1="52" x2="301" y2="80"/><line x1="334" y1="52" x2="309" y2="80"/><line x1="346" y1="52" x2="371" y2="80"/><line x1="404" y1="52" x2="379" y2="80"/><line x1="171" y1="102" x2="196" y2="128"/><line x1="229" y1="102" x2="204" y2="128"/><line x1="241" y1="102" x2="266" y2="128"/><line x1="299" y1="102" x2="274" y2="128"/><line x1="311" y1="102" x2="336" y2="128"/><line x1="369" y1="102" x2="344" y2="128"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="130" y="47" font-size="15" font-weight="bold">2</text><text x="200" y="47" font-size="15" font-weight="bold">5</text><text x="270" y="47" font-size="15" font-weight="bold">10</text><text x="340" y="47" font-size="15" font-weight="bold">17</text><text x="410" y="47" font-size="15" font-weight="bold">26</text><text x="165" y="97" font-size="14">3</text><text x="235" y="97" font-size="14">5</text><text x="305" y="97" font-size="14">7</text><text x="375" y="97" font-size="14">9</text><text x="200" y="146" font-size="14" font-weight="bold">2</text><text x="270" y="146" font-size="14" font-weight="bold">2</text><text x="340" y="146" font-size="14" font-weight="bold">2</text></g></svg>`,
      diagramCaption:
        "For 2, 5, 10, 17, 26 the first differences grow by 2 each time, so the second differences are constant: the sequence is quadratic, with nth term {{n^2 + 1}}.",
      workedExamples: [
        {
          title: "Square numbers plus a constant",
          problem: "Find the nth term of 4, 7, 12, 19, 28, …",
          steps: [
            "First differences: 3, 5, 7, 9. Second differences: 2, 2, 2, so the sequence is quadratic and contains {{n^2}}.",
            "Subtract {{n^2}} (1, 4, 9, 16, 25) from the terms: 3, 3, 3, 3, 3.",
            "So the nth term is {{n^2 + 3}}. Check: n = 5 gives 25 + 3 = 28 ✓.",
          ],
          answer: "{{n^2 + 3}}",
          yourTurn: {
            question: "Your turn: find the nth term of 0, 3, 8, 15, 24, …",
            answer: { type: "expression", expr: "n^2-1", display: "{{n^2 - 1}}" },
            solution: "The second differences are all 2, so compare with {{n^2}}: each term is 1 less than a square number. The nth term is {{n^2 - 1}}.",
          },
        },
        {
          title: "Using a quadratic rule",
          problem: "A sequence has nth term {{n^2 - 5}}. Find the 20th term, and decide whether 220 is in the sequence.",
          steps: [
            "20th term: {{20^2 - 5 = 400 - 5 = 395}}.",
            "Set {{n^2 - 5 = 220}}, so {{n^2 = 225}} and n = 15 (positions are positive).",
            "15 is a whole number, so 220 is the 15th term. Check: {{15^2 - 5 = 220}} ✓.",
          ],
          answer: "The 20th term is 395; yes, 220 is the 15th term.",
        },
        {
          title: "A bigger second difference",
          problem: "Find the nth term of 3, 12, 27, 48, 75, …",
          steps: [
            "First differences: 9, 15, 21, 27. Second differences: 6, 6, 6.",
            "Half of 6 is 3, so try {{3n^2}}: 3, 12, 27, 48, 75.",
            "That matches every term exactly, so nothing else needs adding.",
          ],
          answer: "{{3n^2}}",
        },
      ],
      keyPoints: [
        "Constant 1st differences → linear; constant 2nd differences → quadratic.",
        "The coefficient of {{n^2}} is **half** the second difference.",
        "Subtract the {{n^2}} part, then deal with what is left.",
      ],
      whyItWorks:
        "Going from {{n^2}} to {{(n + 1)^2}} adds an L-shaped border to an n × n square: n squares along one side, n along the other, plus one corner, which is 2n + 1 squares. So the first differences of the square numbers are 3, 5, 7, 9, … and they rise by 2 each time. That is why the second difference of {{n^2}} is 2. Doubling every term ({{2n^2}}) doubles all the differences, giving a second difference of 4.",
      strategies: ["Find a pattern", "Compare with a known sequence", "Draw a diagram"],
      thinkDeeper:
        "Without a calculator, decide whether 1,000,001 and 1,000,000 are terms of the sequence {{n^2 + 1}}. Explain your reasoning for each.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is a term-to-term rule?", back: "How to get from one term to the next, e.g. 'add 3' or 'multiply by {{1/2}}'." },
      { front: "What is an nth-term (position-to-term) rule?", back: "A formula in n that gives the term at position n directly, e.g. 3n − 2." },
      { front: "In a linear nth term dn + c, what is d?", back: "The common difference: the coefficient of n." },
      { front: "What is the zero term?", back: "The value one step before the 1st term (first term − d). It is the c in dn + c." },
      { front: "nth term of 7, 11, 15, 19, …", back: "4n + 3" },
      { front: "nth term of 23, 18, 13, 8, …", back: "28 − 5n (d = −5, zero term 28)" },
      { front: "How do you test whether k is a term?", back: "Solve nth term = k. If n is a positive whole number, k is the nth term." },
      { front: "Arithmetic vs geometric", back: "Arithmetic adds a common difference; geometric multiplies by a common ratio." },
      { front: "First six triangular numbers", back: "1, 3, 6, 10, 15, 21; nth term {{(n(n + 1))/2}}." },
      { front: "First five cube numbers", back: "1, 8, 27, 64, 125; nth term {{n^3}}." },
      { front: "Fibonacci-type rule", back: "Each term is the sum of the two before it: 1, 1, 2, 3, 5, 8, …" },
      { front: "Reverse of '× 4, then − 3'", back: "'+ 3, then ÷ 4': undo the last step first." },
      { front: "When is a rule a function?", back: "When every input gives exactly one output." },
      { front: "If f(x) = 2x + 1, what is f(5)?", back: "f(5) = 2 × 5 + 1 = 11" },
      { front: "How do you undo × {{2/3}}?", back: "Divide by {{2/3}}, which is the same as multiplying by {{3/2}}." },
      { front: "A constant second difference tells you…", back: "The sequence is quadratic; the coefficient of {{n^2}} is half the second difference." },
    ],
    mustKnow: [
      "I can continue a sequence and describe its term-to-term rule, including rules with fractions and decimals.",
      "I can find the number of matchsticks or dots in any pattern by spotting what is added each time.",
      "I can generate terms from an nth-term rule such as 3n − 2, {{n/2 + 1}} or 20 − 4n.",
      "I can find the nth term of a linear sequence, including ones with negative or fractional differences.",
      "I can decide whether a number is a term of a sequence and say which term it is.",
      "I can find the first term above or below a given value.",
      "I can tell arithmetic, geometric and Fibonacci-type sequences apart and continue each one.",
      "I can recall the square, cube and triangular numbers.",
      "I can find the output and the input of a function machine, including machines with fractions.",
      "I can explain what makes a rule a function and use notation like f(3).",
      "I can find the nth term of simple quadratic sequences such as {{n^2 + 3}} (stretch).",
    ],
    misconceptions: [
      {
        wrong: "The nth term of 5, 8, 11, 14, … is n + 3, because you add 3 each time.",
        right: "'Add 3' means the coefficient of n is 3. Start with 3n (3, 6, 9, …) and adjust: the nth term is 3n + 2.",
      },
      {
        wrong: "If the nth term is 4n + 1, the 2nd term is 42 + 1 = 43.",
        right: "4n means 4 × n, so the 2nd term is 4 × 2 + 1 = 9.",
      },
      {
        wrong: "The nth term of 20, 16, 12, 8, … is 4n + 16.",
        right: "The terms go *down* by 4, so d = −4. The zero term is 20 + 4 = 24, giving 24 − 4n.",
      },
      {
        wrong: "A sequence that goes on forever must contain every large number.",
        right: "4, 7, 10, … skips 200: solving 3n + 1 = 200 gives n = 66.33…, which is not a whole number.",
      },
      {
        wrong: "To reverse '× 2, then + 3', you do '÷ 2, then − 3'.",
        right: "Undo the last step first: '− 3, then ÷ 2'. For output 13: 13 − 3 = 10 and 10 ÷ 2 = 5.",
      },
      {
        wrong: "Geometric sequences always get bigger.",
        right: "A ratio between 0 and 1 makes them shrink (96, 48, 24, …), and a negative ratio makes the signs alternate (2, −6, 18, …).",
      },
    ],
    examMistakes: [
      "Giving the term-to-term rule ('add 3') when the question asks for the nth term.",
      "Getting the sign of d wrong for a decreasing sequence.",
      "Not checking the nth-term rule on a second term.",
      "Saying a number is a term when solving gives a decimal such as n = 19.75.",
      "Rounding the wrong way in 'first term greater than …' questions: round n up, then check the term before.",
      "Undoing a function machine in the forward order instead of reversing it.",
      "Giving the position n when the question asks for the value of the term (or the other way round).",
      "Counting shared matchsticks twice when working out a pattern sequence.",
    ],
    mnemonics: [
      {
        topic: "Finding a linear nth term",
        device: "Step back, then build",
        explanation:
          "Step back one gap from the first term to get the zero term, then build the rule: nth term = (difference)n + (zero term). For 7, 11, 15, … step back to 3, so the nth term is 4n + 3.",
      },
      {
        topic: "Reversing function machines",
        device: "Shoes off before socks",
        explanation:
          "Socks go on before shoes, so shoes come off first. In a machine, the last operation is the first one you undo, using its inverse.",
      },
      {
        topic: "Naming sequence families",
        device: "Arithmetic Adds, Geometric Gets multiplied",
        explanation:
          "Same gap each time → arithmetic. Same multiplier each time → geometric. Check the differences first, then the ratios.",
      },
      {
        topic: "Quadratic sequences",
        device: "Halve the second",
        explanation:
          "The number in front of {{n^2}} is half the second difference: a second difference of 6 means {{3n^2}}.",
      },
    ],
    realWorld: [
      {
        title: "Taxi fares",
        emoji: "🚕",
        detail:
          "A fare of $4 to start plus $0.60 for each kilometre gives $4.60, $5.20, $5.80, … after 1, 2, 3 km: a linear sequence with nth term 0.6n + 4.",
      },
      {
        title: "Saving up",
        emoji: "💰",
        detail:
          "Hana starts with $20 and adds $5 every week, so after n weeks she has 5n + 20 dollars. She first has more than $150 after 27 weeks, when she has $155.",
      },
      {
        title: "Doubling bacteria",
        emoji: "🦠",
        detail:
          "Bacteria that double every 20 minutes form a geometric sequence: 1 cell becomes 8 after an hour and 4,096 after 4 hours.",
      },
      {
        title: "Sunflower spirals",
        emoji: "🌻",
        detail:
          "The seeds in a sunflower head form spirals that usually come in neighbouring Fibonacci numbers, such as 34 one way and 55 the other.",
      },
      {
        title: "Stacked displays",
        emoji: "🥫",
        detail:
          "A triangular stack of tins with 10 on the bottom row holds the 10th triangular number: {{(10 * 11)/2}} = 55 tins.",
      },
    ],
    videos: [
      { title: "The nth term of linear sequences", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+nth+term" },
      { title: "Arithmetic, geometric and Fibonacci sequences", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+sequences" },
      { title: "Function notation and inverse functions", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+function+notation" },
      { title: "Triangular numbers", channel: "Numberphile", url: "https://www.youtube.com/results?search_query=numberphile+triangular+numbers" },
    ],
    formulas: [
      { name: "Linear nth term", formula: "{{dn + c}}", note: "d = common difference; c = zero term = first term − d." },
      { name: "Term after n − 1 steps", formula: "{{a + (n - 1)d}}", note: "a = first term, d = common difference. It simplifies to the same dn + c." },
      { name: "Geometric nth term", formula: "{{a r^(n - 1)}}", note: "a = first term, r = common ratio." },
      { name: "Triangular numbers", formula: "{{(n(n + 1))/2}}", note: "1, 3, 6, 10, 15, …" },
      { name: "Square and cube numbers", formula: "{{n^2}} and {{n^3}}", note: "1, 4, 9, 16, … and 1, 8, 27, 64, …" },
      { name: "Fibonacci-type rule", formula: "{{T_(n + 2) = T_(n + 1) + T_n}}", note: "Each term is the sum of the two before it." },
      { name: "Is k a term?", formula: "{{dn + c = k}}", note: "Solve for n; k is a term only if n is a positive whole number." },
      { name: "Quadratic sequences (stretch)", formula: "coefficient of {{n^2}} = {{1/2}} × second difference", note: "Second difference 2 → {{n^2}}; 4 → {{2n^2}}." },
    ],
  },
};
