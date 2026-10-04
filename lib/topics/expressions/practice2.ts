// Expressions & Formulae — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "expressions-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "expressions-p3-q01",
        question:
          "Ethan's EZ-Link card has $20 on it. Each MRT ride he takes costs $1.50. Write an expression for the amount of money, in dollars, left on his card after r rides.",
        answer: { type: "expression", expr: "20-1.5r", display: "{{20 - 1.5r}}" },
        traps: [
          {
            spec: { type: "expression", expr: "1.5r-20" },
            feedback: "That's the wrong way round. He *starts* with $20, and the cost of the rides is taken away from it.",
          },
        ],
        solution: [
          "One ride costs $1.50, two rides cost $3.00, so r rides cost 1.5 × r = 1.5r dollars.",
          "Start with $20 and take the cost of the rides away: {{20 - 1.5r}}.",
          "Check with r = 4: 20 − 6 = $14 left, which makes sense.",
        ],
        commonError: "Writing {{1.5r - 20}}, which takes the $20 away from the cost of the rides.",
        difficulty: "warmup",
        guideRef: "writing-expressions",
        hints: ["How much do 2 rides cost? 10 rides? So what do r rides cost — and what happens to that amount?"],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "expressions-p3-q02",
        question:
          "A hawker stall's profit for one day, P dollars, is given by the formula {{P = 6n - 180}}, where n is the number of plates of vegetarian mee goreng sold. Find P when n = 25. (A negative answer means the stall made a loss.)",
        answer: { type: "number", value: -30, display: "−30 (a loss of $30)" },
        traps: [
          {
            spec: { type: "number", value: 30 },
            feedback: "Check the sign: 150 − 180 is below zero. The stall *lost* $30, so P = −30.",
          },
          {
            spec: { type: "number", value: 445 },
            feedback: "6n means 6 × n. With n = 25 that is 6 × 25 = 150, not the digits 6 and 25 written side by side (625).",
          },
        ],
        solution: [
          "Replace n with 25: {{P = 6 * 25 - 180}}.",
          "6 × 25 = 150, so P = 150 − 180 = −30.",
          "The stall made a **loss of $30** that day. It has to sell more than 30 plates (6 × 30 = 180) before it makes any profit.",
        ],
        commonError: "Reading 6n as the two-digit-style number 625 instead of 6 × 25.",
        difficulty: "warmup",
        guideRef: "substitution",
        hints: ["Swap n for 25 — remember 6n means 6 × n. Is 6 × 25 bigger or smaller than 180?"],
      },
      {
        kind: "short",
        id: "expressions-p3-q03",
        question:
          "A taxi charges a $3.50 flag-down fare plus $0.60 per km. Ethan writes four lines about it in his notebook, where d is the distance in km and C is the fare in dollars:\n\n- Line 1: {{3.5 + 0.6d = 9.5}}\n- Line 2: {{0.6(d + 5) ≡ 0.6d + 3}}\n- Line 3: {{C = 3.5 + 0.6d}}\n- Line 4: {{3.5 + 0.6d}}\n\nWhich line is the expression, which is the equation, which is the formula and which is the identity? Give the four line numbers in that order: expression, equation, formula, identity.",
        answer: { type: "list", values: [4, 1, 3, 2], ordered: true, display: "4, 1, 3, 2" },
        traps: [
          {
            spec: { type: "list", values: [4, 3, 1, 2], ordered: true },
            feedback:
              "Lines 1 and 3 are swapped. An equation is true for just one value of the letter (here d = 10). A formula links two different quantities by a rule (here C and d).",
          },
        ],
        solution: [
          "Line 4 has no equals sign — it is an **expression** for the fare.",
          "Line 1 is true for only one value of d (0.6d = 6, so d = 10) — an **equation** you can solve.",
          "Line 3 links two different quantities, C and d, by a rule — a **formula**.",
          "Line 2 is true for *every* value of d (expand the left: 0.6d + 3) — an **identity**, shown by ≡.",
          "So the order is 4, 1, 3, 2.",
        ],
        difficulty: "warmup",
        guideRef: "language-of-algebra",
        hints: [
          "Which line has no equals sign at all? Then ask of the others: is it true for one value of d, for every value, or does it connect two different letters?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "expressions-p3-q04",
        question:
          "A triangular flower bed in a community garden has sides of length {{(3x + 2)}} m, {{(2x - 1)}} m and {{(x + 5)}} m. Write a simplified expression for its perimeter, in metres.",
        answer: { type: "expression", expr: "6x+6", form: "simplified", display: "{{6x + 6}}" },
        traps: [
          {
            spec: { type: "expression", expr: "6x+8" },
            feedback: "Check the number terms: +2, −1 and +5 make 6, not 8. The minus sign belongs to the 1.",
          },
          {
            spec: { type: "expression", expr: "12x" },
            feedback: "6x and 6 are not like terms — one has an x and one doesn't — so they cannot be combined.",
          },
        ],
        solution: [
          "Perimeter = {{(3x + 2) + (2x - 1) + (x + 5)}}.",
          "x terms: 3x + 2x + x = 6x.",
          "Number terms: 2 − 1 + 5 = 6.",
          "Perimeter = {{6x + 6}} m.",
        ],
        difficulty: "warmup",
        guideRef: "simplifying",
        hints: ["Add all three sides, then collect the x terms and the number terms separately."],
      },
      {
        kind: "short",
        id: "expressions-p3-q05",
        question:
          "Arjun buys 5 packs of stickers. Each pack contains {{(3p + 2)}} stickers. Write an expression, without brackets, for the total number of stickers.",
        answer: { type: "expression", expr: "15p+10", form: "expanded", display: "{{15p + 10}}" },
        traps: [
          {
            spec: { type: "expression", expr: "15p+2" },
            feedback: "Multiply the 5 by **both** terms in the bracket: 5 × 2 = 10 as well as 5 × 3p = 15p.",
          },
        ],
        solution: ["Total = {{5(3p + 2)}}.", "5 × 3p = 15p and 5 × 2 = 10.", "Total = {{15p + 10}} stickers."],
        commonError: "Multiplying only the first term in the bracket.",
        difficulty: "warmup",
        guideRef: "expanding",
        hints: ["5 packs of {{(3p + 2)}} is {{5(3p + 2)}}. Multiply the 5 by each term inside."],
      },
      {
        kind: "short",
        id: "expressions-p3-q06",
        question:
          "A ball is thrown straight up. Its height, h metres, after t seconds is {{h = 20t - 5t^2}}. Find the height after 3 seconds and the height after 4 seconds. Give the two heights in that order.",
        answer: { type: "list", values: [15, 0], ordered: true, display: "15 m, 0 m" },
        traps: [
          {
            spec: { type: "list", values: [-165, -320], ordered: true },
            feedback: "{{5t^2}} means 5 × t², not (5t)². Square t first, then multiply by 5.",
          },
        ],
        solution: [
          "t = 3: {{20 * 3 - 5 * 3^2 = 60 - 5 * 9 = 60 - 45 = 15}} m.",
          "t = 4: {{20 * 4 - 5 * 4^2 = 80 - 5 * 16 = 80 - 80 = 0}} m.",
          "A height of 0 means that after 4 seconds the ball is back at the level it was thrown from.",
        ],
        commonError: "Working out {{5t^2}} as {{(5t)^2}}. The power belongs only to the t.",
        difficulty: "core",
        guideRef: "substitution",
        hints: [
          "Put t = 3 into every t. In {{5t^2}}, which part gets squared?",
          "Indices come before multiplication: {{3^2 = 9}}, then 5 × 9 = 45.",
          "After 3 s: 60 − 45. Now repeat with t = 4.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "written",
        id: "expressions-p3-q07",
        question:
          "Mei's drinks stall charges $5 per drink plus a $2 delivery fee. She writes three lines, where n is a number of drinks:\n\n- Line 1: {{5n + 2}}\n- Line 2: {{5n + 2 = 17}}\n- Line 3: {{T = 5n + 2}}\n\nArjun says, \"n means exactly the same thing in all three lines.\" Explain how the letter n is used differently in each line.",
        marks: 3,
        modelAnswer:
          "Line 1 is an **expression**. Here n stands for *any* number of drinks: {{5n + 2}} is the cost in dollars of n drinks, whatever n is.\n\nLine 2 is an **equation**. Here n is one particular unknown number that we can find: 5n = 15, so n = 3. Only n = 3 makes it true.\n\nLine 3 is a **formula**. Here n is a variable that can change, and the total cost T depends on it: when n changes, T changes. You substitute a value of n to find T.\n\nSo Arjun is not right: in Line 2, n is one fixed (unknown) value, while in Lines 1 and 3 it can take many values.",
        markScheme: [
          {
            point: "Line 1 (expression): n can be any number — it stands for a general number of drinks",
            keywords: ["any number", "any value", "general", "expression", "anything"],
          },
          {
            point: "Line 2 (equation): n is one particular unknown value that can be found, n = 3",
            keywords: ["equation", "n = 3", "n=3", "one value", "particular", "specific", "solve"],
          },
          {
            point: "Line 3 (formula): n is a variable — T depends on n and changes when n changes",
            keywords: ["formula", "variable", "changes", "depends", "substitute", "links", "relationship"],
          },
        ],
        commonError: "Just naming the lines (expression, equation, formula) without explaining what n stands for in each one.",
        difficulty: "core",
        guideRef: "language-of-algebra",
        hints: [
          "In which line can you work out exactly what n is? Do it.",
          "In Line 1, could n be 4? Could it be 10? Is anything forcing one particular value?",
          "In Line 3, what happens to T when n goes up by 1?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "expressions-p3-q08",
        question:
          "After a monsoon storm, a community garden's rainwater tank holds V litres. On Monday, {{1/3}} of the water is used. On Tuesday, half of the water that is **left** is used. Write a simplified expression for the amount of water, in litres, still in the tank.",
        answer: { type: "expression", expr: "V/3", display: "{{1/3 V}} (or {{V/3}})" },
        traps: [
          {
            spec: { type: "expression", expr: "V/6" },
            feedback:
              "On Tuesday they use half of what is **left** ({{2/3 V}}), not half of the full tank. Half of {{2/3 V}} is {{1/3 V}}.",
          },
          {
            spec: { type: "expression", expr: "2V/3" },
            feedback: "That's what is left after Monday. Half of that is then used on Tuesday.",
          },
        ],
        solution: [
          "After Monday: {{V - 1/3 V = 2/3 V}} litres are left.",
          "On Tuesday half of {{2/3 V}} is used, so half of it stays: {{1/2 * 2/3 V = 1/3 V}}.",
          "So {{1/3 V}} litres (also written {{V/3}}) are still in the tank.",
          "Check with V = 600: Monday uses 200, leaving 400; Tuesday uses 200, leaving 200, and {{1/3 * 600 = 200}} ✓",
        ],
        commonError: "Taking half of the *original* amount on Tuesday instead of half of what was left.",
        difficulty: "core",
        guideRef: "writing-expressions",
        hints: [
          "How much water is left after Monday?",
          "After Monday {{2/3 V}} is left. On Tuesday half of *that* is used — so how much of it stays?",
          "What is half of {{2/3 V}}?",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "expressions-p3-q09",
        question:
          "A rectangular vegetable plot has width x m and perimeter {{(6x + 14)}} m. Find an expression for its area, in m². Give your answer without brackets.",
        answer: { type: "expression", expr: "2x^2+7x", form: "expanded", display: "{{2x^2 + 7x}}" },
        traps: [
          {
            spec: { type: "expression", expr: "3x^2+7x" },
            feedback: "Half the perimeter, {{3x + 7}}, is length **plus** width. Take away the width x to get the length.",
          },
          {
            spec: { type: "expression", expr: "2x^2+7" },
            feedback: "Multiply x by both terms of {{(2x + 7)}}: x × 7 = 7x.",
          },
        ],
        solution: [
          "Length + width = half the perimeter = {{(6x + 14) ÷ 2 = 3x + 7}}.",
          "Length = {{3x + 7 - x = 2x + 7}}.",
          "Area = width × length = {{x(2x + 7) = 2x^2 + 7x}} m².",
          "Check with x = 3: the plot is 3 m by 13 m, perimeter 32 = 6 × 3 + 14 ✓, area 39 = 18 + 21 ✓",
        ],
        commonError: "Using half the perimeter as the length — half the perimeter is length plus width.",
        difficulty: "core",
        guideRef: "expanding",
        hints: [
          "Perimeter = 2 × (length + width). So what is length + width?",
          "Length + width = {{3x + 7}}. Take away the width to find the length.",
          "Length = {{2x + 7}}. Now area = {{x(2x + 7)}} — expand it.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "expressions-p3-q10",
        question:
          "A rectangular mural has area {{(12x^2 + 8x)}} m² and height 4x m. Find an expression for its width, in m.",
        answer: { type: "expression", expr: "3x+2", display: "{{3x + 2}}" },
        traps: [
          {
            spec: { type: "expression", expr: "3x^2+2x" },
            feedback: "You divided the numbers by 4 but not by the x. The height is 4x, so divide each term by 4x.",
          },
          {
            spec: { type: "expression", expr: "3x+8" },
            feedback: "Divide **every** term by 4x: {{8x ÷ 4x = 2}}.",
          },
        ],
        solution: [
          "Width = area ÷ height.",
          "Factorise the area by taking out the common factor 4x: {{12x^2 + 8x = 4x(3x + 2)}}.",
          "So area = height × {{(3x + 2)}}, and the width is {{3x + 2}} m.",
          "Check by expanding: {{4x(3x + 2) = 12x^2 + 8x}} ✓",
        ],
        difficulty: "core",
        guideRef: "factorising",
        hints: [
          "Width = area ÷ height. Which factor do both terms of the area share?",
          "Factorise {{12x^2 + 8x}} by taking out 4x.",
          "{{12x^2 ÷ 4x = 3x}}. What is {{8x ÷ 4x}}?",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "expressions-p3-q11",
        question:
          "Jun plays a number game. He takes a number x, multiplies it by 3, subtracts 7, then halves the result. His final answer is y, so {{y = (3x - 7)/2}}.\n\nWrite a formula for x in terms of y, so that he can work out the starting number from the final answer.",
        answer: { type: "expression", expr: "(2y+7)/3", display: "{{x = (2y + 7)/3}}" },
        traps: [
          {
            spec: { type: "expression", expr: "2(y/3+7)" },
            feedback: "You undid each step but kept the original order. Work backwards: undo the **last** step (halving) first.",
          },
          {
            spec: { type: "expression", expr: "(2y-7)/3" },
            feedback: "The inverse of 'subtract 7' is 'add 7'.",
          },
        ],
        solution: [
          "Forwards: x → × 3 → − 7 → ÷ 2 → y.",
          "Backwards, in reverse order with inverse operations: y → × 2 → + 7 → ÷ 3 → x.",
          "So {{x = (2y + 7)/3}}.",
          "Check: x = 5 gives y = (15 − 7) ÷ 2 = 4; then (2 × 4 + 7) ÷ 3 = 15 ÷ 3 = 5 ✓",
        ],
        solutions: [
          {
            label: "Balance method",
            steps: [
              "{{y = (3x - 7)/2}}",
              "Multiply both sides by 2: {{2y = 3x - 7}}.",
              "Add 7 to both sides: {{2y + 7 = 3x}}.",
              "Divide both sides by 3: {{x = (2y + 7)/3}}.",
            ],
          },
        ],
        commonError: "Undoing the operations in the same order they were done, instead of in reverse order.",
        difficulty: "core",
        guideRef: "changing-the-subject",
        hints: [
          "Draw the function machine: x → × 3 → − 7 → ÷ 2 → y. How do you go backwards?",
          "Reverse the order and use inverses: y → × 2 → + 7 → ÷ 3.",
          "Start with y: double it to get 2y, add 7, then divide all of that by 3.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "written",
        id: "expressions-p3-q12",
        question:
          "Wei Ling works out {{37 * 23 + 37 * 77}} in her head in two seconds and gets 3700.\n\n(a) Use factorising to explain why her shortcut works.\n(b) Use the same idea to work out {{58 * 4.6 + 58 * 5.4}} without a calculator. Show your method.",
        marks: 3,
        modelAnswer:
          "(a) Both products share the factor 37, so it can be taken out as a common factor, just like ab + ac = a(b + c):\n\n    {{37 * 23 + 37 * 77 = 37(23 + 77) = 37 * 100 = 3700}}\n\n(b) The common factor is 58:\n\n    {{58 * 4.6 + 58 * 5.4 = 58(4.6 + 5.4) = 58 * 10 = 580}}",
        markScheme: [
          {
            point: "Takes out the common factor 37 to get 37(23 + 77)",
            keywords: ["37(23 + 77)", "37(23+77)", "common factor", "take out", "factor"],
          },
          {
            point: "Uses 23 + 77 = 100 (links to ab + ac = a(b + c)) to get 3700",
            keywords: ["100", "37 × 100", "37 x 100", "a(b + c)", "a(b+c)", "ab + ac"],
          },
          {
            point: "Works out 58(4.6 + 5.4) = 58 × 10 = 580",
            keywords: ["580", "58(4.6 + 5.4)", "58(4.6+5.4)", "58 × 10", "58 x 10"],
          },
        ],
        commonError: "Working out each product separately — correct, but it misses the factorising idea the question asks for.",
        difficulty: "core",
        guideRef: "factorising",
        hints: [
          "Which number appears in both products?",
          "Think of 37 as a letter a: {{a * 23 + a * 77}}. How would you factorise that?",
          "{{37(23 + 77)}} — what is the bracket worth?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "expressions-p3-q13",
        question:
          "Two bike-rental shops at East Coast Park charge C dollars for h hours:\n\n- Shop A: {{C = 8 + 3h}}\n- Shop B: {{C = 5h}}\n\nAisha rents a bike for 3 hours and Wei Ling rents one for 5 hours. Each girl uses whichever shop is cheaper for her own rental. How much do they pay altogether, in dollars?",
        answer: { type: "number", value: 38, display: "$38" },
        traps: [
          {
            spec: { type: "number", value: 40 },
            feedback:
              "Did they both use the same shop? Shop B is cheaper for 3 hours ($15 against $17), but Shop A is cheaper for 5 hours ($23 against $25).",
          },
          {
            spec: { type: "number", value: 42 },
            feedback: "That's the more expensive shop each time. Each girl picks the **cheaper** shop for her own rental.",
          },
        ],
        solution: [
          "Aisha, h = 3: Shop A = 8 + 3 × 3 = $17, Shop B = 5 × 3 = $15. She uses Shop B and pays $15.",
          "Wei Ling, h = 5: Shop A = 8 + 3 × 5 = $23, Shop B = 5 × 5 = $25. She uses Shop A and pays $23.",
          "Altogether: 15 + 23 = $38.",
          "Notice: Shop B is cheaper for short rentals and Shop A for long ones. They cost the same ($20) at h = 4.",
        ],
        difficulty: "core",
        guideRef: "substitution",
        hints: [
          "Work out both shops' prices for 3 hours.",
          "Now work out both shops' prices for 5 hours. Which shop is cheaper each time?",
          "Aisha pays $15 at Shop B. What does Wei Ling pay?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "expressions-p3-q14",
        question:
          "A large storage cube has edges of length 6x cm. It is packed completely with small cubes of edge 2x cm. How many small cubes fit inside?",
        answer: { type: "number", value: 27 },
        traps: [
          {
            spec: { type: "number", value: 3 },
            feedback: "3 is how many small cubes fit along **one** edge. The big cube is 3 small cubes long, 3 wide and 3 high.",
          },
          {
            spec: { type: "number", value: 9 },
            feedback: "9 small cubes make just one layer on the bottom. How many layers are there?",
          },
        ],
        solution: [
          "Big cube: {{(6x)^3 = 6x * 6x * 6x = 216x^3}} cm³.",
          "Small cube: {{(2x)^3 = 2x * 2x * 2x = 8x^3}} cm³.",
          "Number of small cubes = {{216x^3 ÷ 8x^3 = 27}} — the {{x^3}} cancels.",
        ],
        solutions: [
          {
            label: "Count along the edges (quicker)",
            steps: ["Along each edge: {{6x ÷ 2x = 3}} small cubes.", "3 along × 3 across × 3 up = 27 small cubes."],
          },
        ],
        commonError: "Writing {{(6x)^3}} as {{6x^3}} — the power applies to the 6 as well as the x.",
        difficulty: "core",
        guideRef: "simplifying",
        hints: [
          "Find the volume of each cube. Careful: {{(6x)^3}} is not {{6x^3}}.",
          "{{(6x)^3 = 216x^3}}. What is {{(2x)^3}}?",
          "Divide the big volume by the small volume.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "expressions-p3-q15",
        question:
          "At a dance CCA competition, a team's final mark M is the mean of the three judges' scores a, b and c, so {{M = (a + b + c)/3}}. Make c the subject of the formula.",
        answer: { type: "expression", expr: "3M-a-b", display: "{{c = 3M - a - b}}" },
        traps: [
          {
            spec: { type: "expression", expr: "3(M-a-b)" },
            feedback:
              "Only the M gets multiplied by 3. Undo the ÷ 3 first (giving {{3M = a + b + c}}), *then* subtract a and b.",
          },
          {
            spec: { type: "expression", expr: "M/3-a-b" },
            feedback: "The inverse of dividing by 3 is multiplying by 3.",
          },
        ],
        solution: [
          "{{M = (a + b + c)/3}}",
          "Multiply both sides by 3: {{3M = a + b + c}}.",
          "Subtract a and b from both sides: {{c = 3M - a - b}}.",
          "Using it: a team wants a final mark of 8.5 and two judges gave 8 and 9.2. The third judge must give c = 25.5 − 8 − 9.2 = 8.3.",
        ],
        commonError: "Writing {{c = 3(M - a - b)}}, which multiplies a and b by 3 as well.",
        difficulty: "core",
        guideRef: "changing-the-subject",
        hints: [
          "What is the last thing done to {{(a + b + c)}}? Undo that first.",
          "Multiply both sides by 3: {{3M = a + b + c}}.",
          "Now get c on its own by subtracting a and b from both sides.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "expressions-p3-q16",
        question:
          "A gym charges members C dollars a month, where {{C = 30 + 8v}} and v is the number of visits that month.\n\n(a) What do the numbers 30 and 8 mean in this formula?\n(b) Hana says, \"If I visit twice as many times, my bill will double.\" Is she right? Explain, using numbers.",
        marks: 4,
        modelAnswer:
          "(a) $30 is a fixed monthly fee that you pay even if you make no visits. $8 is the extra cost of each visit.\n\n(b) No. For 5 visits, C = 30 + 8 × 5 = $70. For 10 visits, C = 30 + 8 × 10 = $110. Double $70 would be $140, so the bill has not doubled. Doubling v only doubles the 8v part; the fixed $30 stays the same.",
        markScheme: [
          {
            point: "30 is a fixed monthly fee, paid even with no visits",
            keywords: ["fixed", "monthly fee", "membership", "no visits", "every month", "joining"],
          },
          {
            point: "8 is the cost of each visit",
            keywords: ["per visit", "each visit", "every visit", "a visit"],
          },
          {
            point: "Hana is wrong, shown with a numerical example (e.g. 5 visits $70, 10 visits $110, not $140)",
            keywords: ["not double", "wrong", "no", "70", "110", "140"],
          },
          {
            point: "Explains why: only the 8v part doubles; the fixed 30 does not",
            keywords: ["30 stays", "only the 8v", "8v doubles", "does not double", "doesn't double", "stays the same"],
          },
        ],
        commonError: "Agreeing with Hana because v is multiplied by 8 — the fixed $30 does not double.",
        difficulty: "core",
        guideRef: "writing-expressions",
        hints: [
          "What is the bill for 0 visits? For 1 visit? For 2 visits?",
          "Pick a number of visits, say 5, then double it to 10. Work out both bills.",
          "Is $110 double $70? Which part of the formula did not double?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "expressions-p3-q17",
        question:
          "In this addition pyramid, each brick is the sum of the two bricks directly below it. The bottom row is {{2x + 1}}, M and {{x - 4}}, and the top brick is {{7x + 5}}. Find an expression for M.",
        diagram: `<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Addition pyramid. Bottom row: 2x + 1, M, x − 4. Middle row: two empty bricks. Top brick: 7x + 5."><rect x="0" y="0" width="440" height="240" fill="#ffffff"/><rect x="40" y="166" width="120" height="44" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="160" y="166" width="120" height="44" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><rect x="280" y="166" width="120" height="44" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="100" y="122" width="120" height="44" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="220" y="122" width="120" height="44" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="160" y="78" width="120" height="44" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="15" fill="#1f2937" text-anchor="middle"><text x="100" y="193">2x + 1</text><text x="220" y="193" font-weight="bold">M</text><text x="340" y="193">x − 4</text><text x="160" y="149">?</text><text x="280" y="149">?</text><text x="220" y="105">7x + 5</text></g></svg>`,
        answer: { type: "expression", expr: "2x+4", display: "{{2x + 4}}" },
        traps: [
          {
            spec: { type: "expression", expr: "4x+8" },
            feedback: "That's 2M. M is in **both** middle bricks, so it is counted twice in the top brick — halve your answer.",
          },
        ],
        solution: [
          "Middle left = {{2x + 1 + M}}; middle right = {{M + x - 4}}.",
          "Top = {{(2x + 1 + M) + (M + x - 4) = 3x - 3 + 2M}}.",
          "This must equal {{7x + 5}}, so {{2M = 7x + 5 - (3x - 3) = 4x + 8}}.",
          "So {{M = 2x + 4}}.",
          "Check with x = 1: bottom row 3, 6, −3; middle row 9, 3; top 12. And 7 × 1 + 5 = 12 ✓",
        ],
        commonError: "Forgetting that the middle brick of the bottom row feeds into both middle bricks, so it counts twice.",
        difficulty: "challenge",
        guideRef: "simplifying",
        hints: [
          "Write the two middle bricks in terms of x and M.",
          "Middle bricks: {{2x + 1 + M}} and {{M + x - 4}}. Add them to get the top brick.",
          "Top = {{3x - 3 + 2M}}. Set this equal to {{7x + 5}}. What is 2M? So what is M?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "expressions-p3-q18",
        question:
          "A rectangular photo is x cm wide and {{(x + 4)}} cm long. It is put in a frame that adds a border 2 cm wide all the way round. The area of the border alone is 64 cm². Find x. (The diagram is not to scale.)",
        diagram: `<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular photo, x wide and x + 4 long, inside a frame with a border 2 cm wide all round"><rect x="0" y="0" width="320" height="210" fill="#ffffff"/><rect x="48" y="24" width="224" height="160" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><rect x="80" y="56" width="160" height="96" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="160" y="50">x + 4</text><text x="66" y="109" font-style="italic">x</text><text x="160" y="109">photo</text><text x="214" y="174">2</text></g><line x1="200" y1="152" x2="200" y2="184" stroke="#334155" stroke-width="1.5"/><line x1="194" y1="152" x2="206" y2="152" stroke="#334155" stroke-width="1.5"/><line x1="194" y1="184" x2="206" y2="184" stroke="#334155" stroke-width="1.5"/></svg>`,
        answer: { type: "number", value: 4, display: "x = 4 (a 4 cm by 8 cm photo)" },
        traps: [
          {
            spec: { type: "number", value: 13 },
            feedback: "A 2 cm border on **both** sides adds 4 cm to each dimension, not 2 cm. The frame is {{(x + 4)}} by {{(x + 8)}}.",
          },
        ],
        solution: [
          "A 2 cm border on every side adds 2 + 2 = 4 cm to each dimension, so the frame is {{(x + 4)}} by {{(x + 8)}}.",
          "Frame area: {{(x + 4)(x + 8) = x^2 + 8x + 4x + 32 = x^2 + 12x + 32}}.",
          "Photo area: {{x(x + 4) = x^2 + 4x}}.",
          "Border area = {{(x^2 + 12x + 32) - (x^2 + 4x) = 8x + 32}}.",
          "So 8x + 32 = 64, which gives 8x = 32 and x = 4.",
          "Check: photo 4 × 8 = 32 cm², frame 8 × 12 = 96 cm², border 96 − 32 = 64 cm² ✓",
        ],
        solutions: [
          {
            label: "Split the border into strips (no double brackets)",
            steps: [
              "The top and bottom strips run the full length of the frame, {{x + 8}}: area {{2 * 2(x + 8) = 4x + 32}}.",
              "The two side strips fit between them, next to the photo's width x: area {{2 * 2x = 4x}}.",
              "Border = {{4x + 32 + 4x = 8x + 32}}, the same as before. Then 8x + 32 = 64 gives x = 4.",
            ],
          },
        ],
        commonError: "Adding only 2 cm to each dimension — the border is on both sides.",
        difficulty: "challenge",
        guideRef: "double-brackets",
        hints: [
          "What are the length and width of the whole frame? Remember the border is on *both* sides.",
          "The frame is {{(x + 4)}} by {{(x + 8)}}. Border area = frame area − photo area.",
          "Expand both areas and subtract: the {{x^2}} terms cancel, leaving {{8x + 32}}. Set that equal to 64.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "expressions-p3-q19",
        question:
          "Hana draws a 3 × 3 box around nine dates on a calendar:\n\n| Mon | Tue | Wed |\n|---|---|---|\n| 3 | 4 | 5 |\n| 10 | 11 | 12 |\n| 17 | 18 | 19 |\n\nThe nine dates add up to 99, which is 9 × 11 — nine times the middle date. Hana says this works for **any** 3 × 3 box on a calendar. Prove that she is right.",
        marks: 4,
        modelAnswer:
          "Call the middle date n. Dates in a row go up by 1, and the date directly below is a week (7 days) later, so the box is:\n\n    {{n - 8}}, {{n - 7}}, {{n - 6}}\n    {{n - 1}}, {{n}}, {{n + 1}}\n    {{n + 6}}, {{n + 7}}, {{n + 8}}\n\nAdding: there are nine n's, which give 9n. The numbers −8 − 7 − 6 − 1 + 1 + 6 + 7 + 8 add to 0, because they cancel in pairs (−8 with +8, −7 with +7, −6 with +6, −1 with +1). So the total is 9n — nine times the middle date — for any 3 × 3 box.",
        markScheme: [
          {
            point: "Uses n for the middle date and n − 7, n + 7 for the dates a week before and after",
            keywords: ["n - 7", "n-7", "n + 7", "n+7", "week", "7"],
          },
          {
            point: "Writes all nine dates in terms of n (n − 8, n − 6, n − 1, n + 1, n + 6, n + 8)",
            keywords: ["n - 8", "n-8", "n + 8", "n+8", "n - 1", "n + 1", "n + 6"],
          },
          {
            point: "Adds to get 9n, with the number parts cancelling in pairs to 0",
            keywords: ["9n", "cancel", "pairs", "0"],
          },
          {
            point: "Concludes the total is 9 times the middle date for any box",
            keywords: ["any", "every", "always", "9 times", "nine times"],
          },
        ],
        commonError: "Checking two or three boxes. Examples suggest it is true, but only algebra proves it for every box.",
        difficulty: "challenge",
        guideRef: "simplifying",
        hints: [
          "Call the middle date n. What is the date directly above it? Directly below it?",
          "Above is {{n - 7}} (a week earlier). Write all nine dates in terms of n.",
          "Add them up. How many n's are there? What do the number parts add up to?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "expressions-p3-q20",
        question:
          "Ravi buys n identical pens that cost $p each, where p is a whole number. The shop also charges $1 per pen to engrave his name. Altogether he pays $21, so {{np + n = 21}}.\n\nFind every possible value of n. (Each pen costs at least $1.)",
        answer: { type: "list", values: [1, 3, 7], display: "1, 3, 7" },
        traps: [
          {
            spec: { type: "list", values: [1, 3, 7, 21] },
            feedback: "Check n = 21: then p + 1 = 1, so p = 0 and the pens would be free. Each pen costs at least $1.",
          },
        ],
        solution: [
          "Both terms on the left contain n, so factorise: {{np + n = n(p + 1)}}.",
          "So {{n(p + 1) = 21}}: n and p + 1 are whole numbers that multiply to 21.",
          "Factor pairs of 21: 1 × 21, 3 × 7, 7 × 3, 21 × 1.",
          "n = 1, p = 20 ✓; n = 3, p = 6 ✓; n = 7, p = 2 ✓; n = 21, p = 0 ✗ (the pens can't be free).",
          "So n = 1, 3 or 7.",
        ],
        commonError: "Including n = 21, which would make each pen cost $0.",
        difficulty: "challenge",
        guideRef: "factorising",
        hints: [
          "Both terms on the left contain n. Factorise.",
          "{{n(p + 1) = 21}}. So n and {{p + 1}} are two whole numbers that multiply to 21.",
          "List the factor pairs of 21. Which of them give p ≥ 1?",
        ],
        strategy: "Split into cases",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "expressions-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "expressions-p4-q01",
        question:
          "Look at the expression {{5y^2 - y + 8 - 3xy}}. Write down, in this order:\n\n- the coefficient of y\n- the coefficient of xy\n- the constant term",
        answer: { type: "list", values: [-1, -3, 8], ordered: true, display: "−1, −3, 8" },
        traps: [
          {
            spec: { type: "list", values: [1, -3, 8], ordered: true },
            feedback: "−y means −1 × y, so the coefficient of y is −1, not 1. The sign belongs to the term.",
          },
          {
            spec: { type: "list", values: [5, -3, 8], ordered: true },
            feedback: "5 is the coefficient of {{y^2}}, which is a different term from y. Like terms need the same power.",
          },
        ],
        solution: [
          "The terms are {{5y^2}}, {{-y}}, 8 and {{-3xy}}.",
          "−y = −1 × y, so the coefficient of y is −1 (the 5 belongs to {{y^2}}, a different term).",
          "The coefficient of xy is −3 — the sign in front belongs to the term.",
          "The constant term (no letters) is 8.",
        ],
        difficulty: "warmup",
        guideRef: "language-of-algebra",
        hints: ["A coefficient is the number multiplying the letters — and it includes the sign in front."],
      },
      {
        kind: "short",
        id: "expressions-p4-q02",
        question: "Simplify {{5a * 2b - 3b * a}}.",
        answer: { type: "expression", expr: "7ab", form: "simplified", display: "{{7ab}}" },
        traps: [
          {
            spec: { type: "expression", expr: "4ab" },
            feedback: "{{5a * 2b}} means multiply the numbers: 5 × 2 = 10, so it is 10ab, not 7ab.",
          },
          {
            spec: { type: "expression", expr: "13ab" },
            feedback: "Check the middle sign — it is a minus: {{10ab - 3ab}}.",
          },
        ],
        solution: [
          "{{5a * 2b = 10ab}} (5 × 2 = 10 and a × b = ab).",
          "{{3b * a = 3ab}} (ba is the same as ab).",
          "{{10ab - 3ab = 7ab}}.",
        ],
        difficulty: "warmup",
        guideRef: "simplifying",
        hints: ["Do the multiplications first. Is 3ba the same as 3ab?"],
      },
      {
        kind: "short",
        id: "expressions-p4-q03",
        question:
          "When x = −4, find the value of (a) {{3x^2}} and (b) {{(3x)^2}}. Give both answers, in that order.",
        answer: { type: "list", values: [48, 144], ordered: true, display: "(a) 48, (b) 144" },
        traps: [
          {
            spec: { type: "list", values: [-48, 144], ordered: true },
            feedback: "In (a), {{(-4)^2 = 16}}, which is positive. Then 3 × 16 = 48.",
          },
          {
            spec: { type: "list", values: [144, 144], ordered: true },
            feedback: "In {{3x^2}} only the x is squared: square first, then multiply by 3.",
          },
        ],
        solution: [
          "(a) {{3x^2 = 3 * (-4)^2 = 3 * 16 = 48}}.",
          "(b) {{(3x)^2 = (3 * (-4))^2 = (-12)^2 = 144}}.",
          "The bracket changes what gets squared: in (b) the 3 is squared too, so (b) is 3 times (a).",
        ],
        difficulty: "warmup",
        guideRef: "substitution",
        hints: ["Put a bracket round −4 when you substitute. In {{3x^2}}, is the 3 squared?"],
      },
      {
        kind: "short",
        id: "expressions-p4-q04",
        question:
          "A pencil costs p cents. An eraser costs 15 cents more than a pencil. Write an expression for the cost, in cents, of 4 erasers.",
        answer: { type: "expression", expr: "4(p+15)", display: "{{4(p + 15)}} or {{4p + 60}}" },
        traps: [
          {
            spec: { type: "expression", expr: "4p+15" },
            feedback: "Each of the 4 erasers costs 15 cents more, so the extra is 4 × 15 = 60 cents. Use a bracket: {{4(p + 15)}}.",
          },
        ],
        solution: ["One eraser costs {{p + 15}} cents.", "Four erasers cost {{4(p + 15) = 4p + 60}} cents."],
        difficulty: "warmup",
        guideRef: "writing-expressions",
        hints: ["Write the cost of one eraser first, then multiply all of it by 4."],
      },
      {
        kind: "short",
        id: "expressions-p4-q05",
        question:
          "A rectangular floor tile is 3y cm wide and {{(2y + 5)}} cm long. Write an expression, without brackets, for its area in cm².",
        answer: { type: "expression", expr: "6y^2+15y", form: "expanded", display: "{{6y^2 + 15y}}" },
        traps: [
          {
            spec: { type: "expression", expr: "6y^2+5" },
            feedback: "Multiply 3y by **both** terms: 3y × 5 = 15y.",
          },
          {
            spec: { type: "expression", expr: "6y+15y" },
            feedback: "{{3y * 2y = 6y^2}}, because y × y = y², not y.",
          },
        ],
        solution: [
          "Area = {{3y(2y + 5)}}.",
          "{{3y * 2y = 6y^2}} (numbers: 3 × 2 = 6; letters: y × y = y²).",
          "{{3y * 5 = 15y}}.",
          "Area = {{6y^2 + 15y}} cm².",
        ],
        difficulty: "warmup",
        guideRef: "expanding",
        hints: ["Area = width × length = {{3y(2y + 5)}}. Multiply 3y by each term in the bracket."],
      },
      {
        kind: "short",
        id: "expressions-p4-q06",
        question:
          "Wei Ling is completing a table of values for {{y = x^2 - 3x}}.\n\n| x | −2 | −1 | 0 | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|---|---|---|\n| y | A | 4 | B | −2 | −2 | 0 | 4 | C |\n\nFind A, B and C. Give them in that order.",
        answer: { type: "list", values: [10, 0, 10], ordered: true, display: "A = 10, B = 0, C = 10" },
        traps: [
          {
            spec: { type: "list", values: [2, 0, 10], ordered: true },
            feedback: "For x = −2: {{(-2)^2 = +4}}, not −4. Then {{-3 * (-2) = +6}}, so A = 4 + 6 = 10.",
          },
          {
            spec: { type: "list", values: [-2, 0, 10], ordered: true },
            feedback: "For x = −2: {{-3x = -3 * (-2) = +6}}, so A = 4 + 6 = 10.",
          },
        ],
        solution: [
          "A (x = −2): {{(-2)^2 - 3 * (-2) = 4 + 6 = 10}}.",
          "B (x = 0): {{0^2 - 3 * 0 = 0}}.",
          "C (x = 5): {{5^2 - 3 * 5 = 25 - 15 = 10}}.",
          "Notice the symmetry: y = 10 at x = −2 and x = 5, y = 4 at x = −1 and x = 4, y = 0 at x = 0 and x = 3. That's a good check.",
        ],
        commonError: "Typing −2² into a calculator gives −4. You need {{(-2)^2 = 4}}.",
        difficulty: "core",
        guideRef: "substitution",
        hints: [
          "Substitute each x-value, putting a bracket round the negative one.",
          "For x = −2: work out {{(-2)^2}} and {{-3 * (-2)}} separately.",
          "{{(-2)^2 = 4}} and {{-3 * (-2) = +6}}. Now do B and C the same way.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "expressions-p4-q07",
        question:
          "Ravi is asked to find the value of {{2a^2}} when a = 3. He writes:\n\n    {{2 * 3 = 6}} and {{6^2 = 36}}, so {{2a^2 = 36}}\n\nIs Ravi right? Explain any mistake and give the correct value.",
        marks: 3,
        modelAnswer:
          "No, Ravi is wrong. In {{2a^2}} the power applies only to a, not to the 2. Indices come before multiplication, so square first: {{a^2 = 3^2 = 9}}, then multiply by 2: {{2a^2 = 2 * 9 = 18}}. Ravi has actually worked out {{(2a)^2 = 6^2 = 36}}, which is a different expression.",
        markScheme: [
          {
            point: "States that Ravi is wrong",
            keywords: ["wrong", "not right", "incorrect", "no", "isn't right", "is not right"],
          },
          {
            point: "Explains that only a is squared / indices come before multiplication (he found (2a)²)",
            keywords: ["only", "indices", "bidmas", "bodmas", "square first", "(2a)^2", "(2a)²", "power", "order"],
          },
          {
            point: "Gives the correct value 18 (= 2 × 9)",
            keywords: ["18", "2 × 9", "2 x 9"],
          },
        ],
        commonError: "Squaring the 2 as well — that is {{(2a)^2}}, not {{2a^2}}.",
        difficulty: "core",
        guideRef: "substitution",
        hints: [
          "In {{2a^2}}, what exactly is being squared — 2a, or just a?",
          "In the order of operations, indices come before multiplication.",
          "Square 3 first, then multiply by 2.",
        ],
      },
      {
        kind: "short",
        id: "expressions-p4-q08",
        question:
          "Factorise {{16x^2 y - 40xy^2}} fully. Your answer will be in the form {{axy(bx - cy)}}, where a, b and c are positive whole numbers. Give a, b and c, in that order.",
        answer: { type: "list", values: [8, 2, 5], ordered: true, display: "a = 8, b = 2, c = 5, so {{8xy(2x - 5y)}}" },
        traps: [
          {
            spec: { type: "list", values: [4, 4, 10], ordered: true },
            feedback: "That is factorised, but not **fully**: 4 and 10 still share a factor of 2. The HCF of 16 and 40 is 8.",
          },
          {
            spec: { type: "list", values: [2, 8, 20], ordered: true },
            feedback: "Not fully factorised: 8 and 20 still share a factor of 4. The HCF of 16 and 40 is 8.",
          },
        ],
        solution: [
          "HCF of 16 and 40 is 8.",
          "Both terms contain at least one x and at least one y, so the HCF of the terms is 8xy.",
          "{{16x^2 y ÷ 8xy = 2x}} and {{40xy^2 ÷ 8xy = 5y}}.",
          "So {{16x^2 y - 40xy^2 = 8xy(2x - 5y)}}: a = 8, b = 2, c = 5.",
          "Check by expanding: {{8xy * 2x = 16x^2 y}} ✓ and {{8xy * 5y = 40xy^2}} ✓",
        ],
        commonError: "Taking out a common factor that isn't the *highest* one, such as 2xy or 4xy.",
        difficulty: "core",
        guideRef: "factorising",
        hints: [
          "Find the HCF of 16 and 40 first.",
          "Which letters appear in **both** terms, and what is the lowest power of each?",
          "The HCF is 8xy. Divide each term by 8xy to find what goes in the bracket.",
        ],
        strategy: "Check by expanding",
      },
      {
        kind: "short",
        id: "expressions-p4-q09",
        question:
          "The shape is made from a square of side x cm sitting on top of a rectangle that is 4 cm high and {{(x + 7)}} cm long. Their left edges line up and all the corners are right angles. Write a simplified expression for the perimeter of the whole shape, in cm.",
        diagram: `<svg viewBox="0 0 340 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side x sitting on top of a rectangle 4 high and x + 7 long, with their left edges lined up"><rect x="0" y="0" width="340" height="290" fill="#ffffff"/><rect x="50" y="178" width="234" height="72" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><rect x="50" y="70" width="108" height="108" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle"><text x="104" y="60" font-style="italic">x</text><text x="34" y="129" font-style="italic">x</text><text x="34" y="219">4</text><text x="167" y="272">x + 7</text></g></svg>`,
        answer: { type: "expression", expr: "4x+22", form: "simplified", display: "{{4x + 22}}" },
        traps: [
          {
            spec: { type: "expression", expr: "6x+22" },
            feedback:
              "You've added the full perimeters of the square and the rectangle. The edge where they join is inside the shape, so it isn't part of the perimeter.",
          },
          {
            spec: { type: "expression", expr: "4x+15" },
            feedback: "Don't forget the short horizontal edge where the rectangle sticks out to the right of the square. It is 7 cm long.",
          },
        ],
        solution: [
          "Walk round the outside, starting at the bottom-left corner.",
          "Left side: {{x + 4}}. Top of the square: x. Right side of the square: x.",
          "Step along the top of the rectangle: {{(x + 7) - x = 7}}. Right side of the rectangle: 4. Bottom: {{x + 7}}.",
          "Total: {{(x + 4) + x + x + 7 + 4 + (x + 7) = 4x + 22}} cm.",
        ],
        commonError: "Adding the perimeters of the two pieces, which counts the hidden joining edge twice.",
        difficulty: "core",
        guideRef: "writing-expressions",
        hints: [
          "Start at one corner and walk all the way round the outside, writing down each edge.",
          "There are six edges. The step to the right of the square is {{(x + 7) - x = 7}} cm long.",
          "The edges are {{x + 4}}, x, x, 7, 4 and {{x + 7}}. Add them.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "expressions-p4-q10",
        question: "Expand and simplify {{4(3 - 2x) - x(5 - x)}}.",
        answer: { type: "expression", expr: "x^2-13x+12", form: "simplified", display: "{{x^2 - 13x + 12}}" },
        traps: [
          {
            spec: { type: "expression", expr: "12-13x-x^2" },
            feedback: "Careful with {{-x * (-x)}}: negative × negative is positive, so it gives {{+x^2}}.",
          },
          {
            spec: { type: "expression", expr: "12-3x+x^2" },
            feedback: "{{-x * 5 = -5x}}, so the x terms are {{-8x - 5x = -13x}}.",
          },
        ],
        solution: [
          "{{4(3 - 2x) = 12 - 8x}}.",
          "{{-x(5 - x) = -5x + x^2}} (because −x × −x = +x²).",
          "Collect like terms: {{x^2 - 8x - 5x + 12 = x^2 - 13x + 12}}.",
          "Check with x = 1: {{4 * 1 - 1 * 4 = 0}} and {{1 - 13 + 12 = 0}} ✓",
        ],
        commonError: "Getting {{-x^2}}: the minus in front of the x outside multiplies the −x inside too.",
        difficulty: "core",
        guideRef: "expanding",
        hints: [
          "Expand each bracket separately, keeping the sign in front of each one.",
          "{{4(3 - 2x) = 12 - 8x}}. For the second bracket, multiply −x by 5 and by −x.",
          "{{-x(5 - x) = -5x + x^2}}. Now collect like terms.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "written",
        id: "expressions-p4-q11",
        question:
          "Zara says, \"{{3(x + 2)}} is always bigger than {{3x + 2}}, whatever number x is — even if x is negative.\"\n\nIs she right? Explain how you know.",
        marks: 3,
        modelAnswer:
          "Yes, she is right. Expanding gives {{3(x + 2) = 3x + 6}}. Both expressions have the same 3x part, but 6 > 2, so {{3(x + 2)}} is always exactly 4 more than {{3x + 2}}: {{(3x + 6) - (3x + 2) = 4}}. The x's cancel, so this is true for every value of x, including negatives. For example, x = −5 gives 3 × (−3) = −9 and 3 × (−5) + 2 = −13, and −9 is 4 more than −13.",
        markScheme: [
          {
            point: "Expands 3(x + 2) to 3x + 6",
            keywords: ["3x + 6", "3x+6"],
          },
          {
            point: "Compares the two: the difference is always 4 (6 > 2, same 3x part)",
            keywords: ["4 more", "difference", "4 bigger", "always 4", "6 > 2", "6 is bigger than 2", "= 4"],
          },
          {
            point: "Concludes she is right for all values of x, including negatives",
            keywords: ["always", "all values", "every value", "any value", "negative", "yes", "right"],
          },
        ],
        commonError: "Testing one or two positive numbers only. To be sure for *every* x, compare the expanded forms.",
        difficulty: "core",
        guideRef: "expanding",
        hints: [
          "Expand {{3(x + 2)}}.",
          "Compare {{3x + 6}} with {{3x + 2}}. What is the same and what is different?",
          "Subtract one from the other. Does the answer depend on x?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "expressions-p4-q12",
        question:
          "A candle is 20 cm tall when it is lit. After t hours, its height is h cm, where {{h = 20 - t/4}}. Make t the subject of the formula.",
        answer: { type: "expression", expr: "80-4h", display: "{{t = 80 - 4h}} (or {{t = 4(20 - h)}})" },
        traps: [
          {
            spec: { type: "expression", expr: "(20-h)/4" },
            feedback: "To undo '÷ 4' you **multiply** by 4: {{t = 4(20 - h)}}.",
          },
          {
            spec: { type: "expression", expr: "4(h-20)" },
            feedback: "Check the sign: {{t/4 = 20 - h}}, so {{t = 4(20 - h)}}. Your formula would give a negative time for any height below 20 cm.",
          },
        ],
        solution: [
          "{{h = 20 - t/4}}",
          "Add {{t/4}} to both sides: {{h + t/4 = 20}}.",
          "Subtract h from both sides: {{t/4 = 20 - h}}.",
          "Multiply both sides by 4: {{t = 4(20 - h) = 80 - 4h}}.",
          "Check: after t = 8 hours, h = 20 − 2 = 18; and 80 − 4 × 18 = 8 ✓. The candle burns out (h = 0) after 80 hours.",
        ],
        commonError: "Getting the sign wrong. The t term is subtracted, so add {{t/4}} to both sides first to make it positive.",
        difficulty: "core",
        guideRef: "changing-the-subject",
        hints: [
          "The t term is being subtracted. Try adding {{t/4}} to both sides first so that it is positive.",
          "{{h + t/4 = 20}}. Now get {{t/4}} on its own.",
          "{{t/4 = 20 - h}}. What is the inverse of dividing by 4?",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "expressions-p4-q13",
        question:
          "Q is an expression in x such that {{4(2x - 3) - Q ≡ 5x - 7}}. The ≡ sign means this is true for **every** value of x. Find Q.",
        answer: { type: "expression", expr: "3x-5", form: "simplified", display: "{{Q = 3x - 5}}" },
        traps: [
          {
            spec: { type: "expression", expr: "3x-19" },
            feedback: "Check the numbers: {{-12 - (-7) = -12 + 7 = -5}}.",
          },
          {
            spec: { type: "expression", expr: "5-3x" },
            feedback: "That's −Q. Q is *subtracted* from {{8x - 12}}, so {{Q = (8x - 12) - (5x - 7)}}.",
          },
        ],
        solution: [
          "Expand: {{4(2x - 3) = 8x - 12}}.",
          "So {{8x - 12 - Q ≡ 5x - 7}}: Q is what you take away from {{8x - 12}} to leave {{5x - 7}}.",
          "{{Q = (8x - 12) - (5x - 7) = 8x - 12 - 5x + 7 = 3x - 5}}.",
          "Check with x = 2: left side {{4 * 1 - 1 = 3}}, right side 10 − 7 = 3 ✓",
        ],
        commonError: "Forgetting to change both signs when subtracting the bracket {{(5x - 7)}}.",
        difficulty: "core",
        guideRef: "language-of-algebra",
        hints: [
          "Expand {{4(2x - 3)}} first.",
          "{{8x - 12 - Q}} must be identical to {{5x - 7}}. What do you take away from {{8x - 12}} to get {{5x - 7}}?",
          "{{Q = (8x - 12) - (5x - 7)}}. Careful with the signs in the second bracket.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "expressions-p4-q14",
        question: "A square tile has area {{36a^8}} cm². Find an expression for its perimeter, in cm.",
        answer: { type: "expression", expr: "24a^4", form: "simplified", display: "{{24a^4}}" },
        traps: [
          {
            spec: { type: "expression", expr: "6a^4" },
            feedback: "That's the side length. The perimeter is all 4 sides.",
          },
          {
            spec: { type: "expression", expr: "72a^4" },
            feedback: "The side is the square root of the area: {{sqrt(36) = 6}}, not 36 ÷ 2 = 18.",
          },
        ],
        solution: [
          "Side × side = {{36a^8}}, so the side is the term that squares to give {{36a^8}}.",
          "{{(6a^4)^2 = 36a^8}}, because {{6^2 = 36}} and {{(a^4)^2 = a^(4 * 2) = a^8}}. So the side is {{6a^4}} cm.",
          "Perimeter = 4 × {{6a^4}} = {{24a^4}} cm.",
        ],
        commonError: "Halving the number as well as the index: the side is {{6a^4}}, not {{18a^4}}.",
        difficulty: "core",
        guideRef: "simplifying",
        hints: [
          "What term, multiplied by itself, gives {{36a^8}}?",
          "Do the number and the letter separately: what squares to 36? What power of a squares to {{a^8}}?",
          "The side is {{6a^4}}. A square has 4 equal sides.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "expressions-p4-q15",
        question:
          "The cost, C dollars, of printing n CCA T-shirts is {{C = 40 + 7n}}. Marcus wants a formula for n. He writes:\n\n    {{n = C - 40 - 7}}\n\n(a) Explain what Marcus has done wrong.\n(b) Write the correct formula for n.\n(c) Use your formula to find n when C = 180.",
        marks: 3,
        modelAnswer:
          "(a) In {{C = 40 + 7n}}, n is **multiplied** by 7. The inverse of multiplying by 7 is dividing by 7, not subtracting 7. Marcus treated the 7 as if it had been added.\n\n(b) Subtract 40 from both sides: {{C - 40 = 7n}}. Divide both sides by 7: {{n = (C - 40)/7}}.\n\n(c) {{n = (180 - 40)/7 = 140/7 = 20}}. Check: 40 + 7 × 20 = 180 ✓ (Marcus's formula would give 180 − 47 = 133 T-shirts, which is clearly wrong.)",
        markScheme: [
          {
            point: "Explains that 7n means 7 × n, so the inverse is dividing by 7, not subtracting 7",
            keywords: ["divide", "multiplied", "multiply", "times", "inverse", "not subtract", "÷ 7"],
          },
          {
            point: "Correct formula n = (C − 40)/7",
            keywords: ["(c - 40)/7", "(c-40)/7", "c - 40", "c-40", "/7"],
          },
          {
            point: "Finds n = 20 when C = 180",
            keywords: ["20", "140"],
          },
        ],
        commonError: "Treating the number in front of a letter as if it were added — 7n means 7 × n.",
        difficulty: "core",
        guideRef: "changing-the-subject",
        hints: [
          "In {{40 + 7n}}, what operation joins the 7 to the n?",
          "Undo the + 40 first, then undo the × 7.",
          "{{C - 40 = 7n}}. What do you do to both sides to get n on its own?",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "expressions-p4-q16",
        question:
          "Four friends share a meal at a restaurant. The meal costs $m before GST. GST of 9% is added to the bill, and they split the total equally. Write an expression for the amount, in dollars, that each friend pays.",
        answer: { type: "expression", expr: "1.09m/4", display: "{{(1.09m)/4}} (or {{0.2725m}})" },
        traps: [
          {
            spec: { type: "expression", expr: "(m+9)/4" },
            feedback: "9% of m is {{0.09m}}, not $9. The total with GST is {{m + 0.09m = 1.09m}}.",
          },
          {
            spec: { type: "expression", expr: "1.09m" },
            feedback: "That's the whole bill including GST. Now share it equally between the 4 friends.",
          },
        ],
        solution: [
          "GST is 9% of m, which is {{0.09m}}.",
          "Total bill = {{m + 0.09m = 1.09m}} dollars.",
          "Each friend pays {{(1.09m)/4 = 0.2725m}} dollars.",
          "Check with m = 100: the bill is $109, and each pays $27.25 = 0.2725 × 100 ✓",
        ],
        commonError: "Adding $9 instead of 9% of m.",
        difficulty: "core",
        guideRef: "writing-expressions",
        hints: [
          "Write 9% of m as a decimal times m.",
          "Total with GST = {{m + 0.09m}}. Simplify this to a single term.",
          "Total = {{1.09m}}. Share it equally between 4.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "expressions-p4-q17",
        question:
          "The kinetic energy, E joules, of a trolley of mass m kg moving at v m/s is {{E = 1/2 m v^2}}.\n\n(a) Make v the subject of the formula.\n(b) Hence find the speed of a trolley of mass 8 kg that has 400 J of kinetic energy.\n\nGive your answer to (b) in m/s.",
        answer: { type: "number", value: 10, display: "10 m/s" },
        traps: [
          {
            spec: { type: "number", value: 100 },
            feedback: "100 is {{v^2}}. Take the square root to find v.",
          },
          {
            spec: { type: "number", value: 5 },
            feedback: "To undo '× {{1/2}}' you **multiply** by 2, not divide: {{v^2 = (2E)/m}}.",
          },
        ],
        solution: [
          "{{E = 1/2 m v^2}}",
          "Multiply both sides by 2: {{2E = m v^2}}.",
          "Divide both sides by m: {{v^2 = (2E)/m}}.",
          "Square root both sides: {{v = sqrt((2E)/m)}}.",
          "(b) {{v = sqrt((2 * 400)/8) = sqrt(100) = 10}} m/s.",
          "Check: {{1/2 * 8 * 10^2 = 4 * 100 = 400}} J ✓",
        ],
        commonError: "Stopping at {{v^2 = 100}} and forgetting the square root.",
        difficulty: "challenge",
        guideRef: "changing-the-subject",
        hints: [
          "List what has been done to v: it is squared, multiplied by m, and halved. Undo these in reverse order.",
          "Multiply both sides by 2, then divide by m: {{v^2 = (2E)/m}}.",
          "Take the square root: {{v = sqrt((2E)/m)}}. Now substitute E = 400 and m = 8.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "expressions-p4-q18",
        question:
          "A square garden has sides of x m, where x is a whole number. It is redesigned as a rectangle: one pair of sides is made 5 m longer and the other pair is made 2 m shorter.\n\nWei Ling says, \"The new garden will always have a bigger area than the old one.\" Find every whole-number value of x for which she is wrong. (The new garden must still have a positive width.)",
        answer: { type: "list", values: [3], display: "x = 3" },
        traps: [
          {
            spec: { type: "list", values: [1, 2, 3] },
            feedback: "If x = 1 or x = 2, the new width x − 2 is zero or negative — there would be no garden. Only x = 3 is left.",
          },
          {
            spec: { type: "list", values: [2, 3] },
            feedback: "When x = 2 the new width is 0 m, so there is no garden at all. The width must be positive.",
          },
        ],
        solution: [
          "New area: {{(x + 5)(x - 2) = x^2 - 2x + 5x - 10 = x^2 + 3x - 10}}.",
          "Old area: {{x^2}}. New − old = {{3x - 10}}.",
          "Wei Ling is wrong when {{3x - 10}} is zero or negative: 3x ≤ 10, so (for whole numbers) x ≤ 3.",
          "The new width {{x - 2}} must be positive, so x ≥ 3.",
          "So she is wrong only when x = 3: the old garden is 3 × 3 = 9 m², the new one is 8 × 1 = 8 m².",
          "Check x = 4: old 16 m², new 9 × 2 = 18 m², which is bigger. From x = 4 onwards she is right.",
        ],
        solutions: [
          {
            label: "Try small cases",
            steps: [
              "x = 3: old 9 m², new 8 × 1 = 8 m² — smaller.",
              "x = 4: old 16 m², new 9 × 2 = 18 m² — bigger.",
              "x = 5: old 25 m², new 10 × 3 = 30 m² — bigger. The gap {{3x - 10}} keeps growing, so only x = 3 fails.",
            ],
          },
        ],
        commonError: "Forgetting that the garden needs a positive width, and including x = 1 or x = 2.",
        difficulty: "challenge",
        guideRef: "double-brackets",
        hints: [
          "Expand {{(x + 5)(x - 2)}} and compare it with {{x^2}}.",
          "New − old = {{3x - 10}}. For which whole numbers is this zero or negative?",
          "Don't forget: the new width {{x - 2}} must be more than 0.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "written",
        id: "expressions-p4-q19",
        question:
          "Arjun draws rectangles whose sides are whole numbers of centimetres. In every rectangle, the length is 3 cm more than the width. The perimeters he gets are 10 cm, 14 cm, 18 cm, …\n\nProve that the perimeter of such a rectangle can **never** be a multiple of 4.",
        marks: 4,
        modelAnswer:
          "Let the width be w cm, where w is a whole number. Then the length is {{w + 3}} cm and the perimeter is\n\n    {{2(w + w + 3) = 2(2w + 3) = 4w + 6}}\n\nWrite {{4w + 6 = 4w + 4 + 2 = 4(w + 1) + 2}}. Since {{4(w + 1)}} is a multiple of 4, the perimeter is always 2 more than a multiple of 4 — it leaves a remainder of 2 when divided by 4. So it can never be a multiple of 4.\n\n(Another way: the perimeter is {{2(2w + 3)}}, and 2w + 3 is odd, so the perimeter is 2 × an odd number, which is never a multiple of 4.)",
        markScheme: [
          {
            point: "Uses w for the width and w + 3 for the length",
            keywords: ["w + 3", "w+3", "let", "width"],
          },
          {
            point: "Perimeter = 2(2w + 3) = 4w + 6",
            keywords: ["4w + 6", "4w+6", "2(2w + 3)", "2(2w+3)"],
          },
          {
            point: "Rewrites it as 4(w + 1) + 2, or explains that 2w + 3 is odd",
            keywords: ["4(w + 1) + 2", "4(w+1)+2", "4w + 4", "odd"],
          },
          {
            point: "Concludes there is always a remainder of 2, so the perimeter is never a multiple of 4",
            keywords: ["remainder", "2 more", "never", "not a multiple"],
          },
        ],
        commonError: "Listing more examples. They suggest the pattern, but only algebra proves it for every rectangle.",
        difficulty: "challenge",
        guideRef: "factorising",
        hints: [
          "Call the width w. What is the length? Write the perimeter in terms of w and simplify.",
          "The perimeter is {{4w + 6}}. Which multiple of 4 is just below it?",
          "Try writing {{4w + 6}} in the form {{4(…) + …}}.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "expressions-p4-q20",
        question:
          "In a magic square, every row, every column and both diagonals add up to the same total. The diagram shows part of an algebraic magic square. Find an expression for P.",
        diagram: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 3 by 3 magic square. Top-left 2x − 3, top-right x − 1, bottom-left 3x + 1, bottom-right P. The other five cells are blank."><rect x="0" y="0" width="300" height="200" fill="#ffffff"/><rect x="15" y="10" width="90" height="60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="105" y="10" width="90" height="60" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="195" y="10" width="90" height="60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="15" y="70" width="90" height="60" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="105" y="70" width="90" height="60" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="195" y="70" width="90" height="60" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="15" y="130" width="90" height="60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="105" y="130" width="90" height="60" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="195" y="130" width="90" height="60" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="15" fill="#1f2937" text-anchor="middle"><text x="60" y="45">2x − 3</text><text x="240" y="45">x − 1</text><text x="60" y="165">3x + 1</text><text x="240" y="165" font-weight="bold">P</text></g></svg>`,
        answer: { type: "expression", expr: "2x+3", display: "{{2x + 3}}" },
        traps: [
          {
            spec: { type: "expression", expr: "2x-3" },
            feedback: "Check the sign: subtracting {{(2x - 3)}} means −2x **+ 3**.",
          },
        ],
        solution: [
          "Call the centre C and the magic total T.",
          "Add the middle row, the middle column and both diagonals: that's 4T. These four lines use every cell once, except the centre, which is used 4 times.",
          "So 4T = (all nine cells) + 3C = 3T + 3C, which gives T = 3C. The magic total is always 3 × the centre.",
          "Diagonal through {{x - 1}}, C and {{3x + 1}}: {{(x - 1) + C + (3x + 1) = 3C}}, so {{4x + C = 3C}} and C = 2x.",
          "Magic total T = 3 × 2x = 6x.",
          "Other diagonal: {{(2x - 3) + 2x + P = 6x}}, so {{P = 6x - 4x + 3 = 2x + 3}}.",
          "Check with x = 4: corners 5, 3, 13, centre 8 and P = 11. Diagonals: 5 + 8 + 11 = 24 and 3 + 8 + 13 = 24 = 6 × 4 ✓",
        ],
        commonError: "Trying to find the total from the top row, which still has a missing cell.",
        difficulty: "challenge",
        guideRef: "simplifying",
        hints: [
          "You need the magic total, but no line is complete. Try adding the middle row, the middle column and both diagonals. How many times is each cell counted?",
          "Those four lines count the centre C four times and every other cell once. So 4T = 3T + 3C. What does that tell you about T?",
          "T = 3C. Use the diagonal {{x - 1}}, C, {{3x + 1}} to find C, then use the other diagonal to find P.",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },
];
