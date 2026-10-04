// Sequences & Functions — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, tables/diagrams and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "sequences-graphs-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "sequences-graphs-p3-q01",
        question:
          "During a monsoon week, a school's rain gauge collects 12.5 mm of rain on day 1. On each day after that it collects 3.5 mm more than on the day before. How much rain does it collect on day 5? Give your answer in mm.",
        answer: { type: "number", value: 26.5, display: "26.5 mm" },
        traps: [
          {
            spec: { type: "number", value: 30 },
            feedback: "That adds 3.5 mm five times. Day 5 is only 4 steps after day 1, so add 4 × 3.5 = 14 mm to 12.5 mm.",
          },
        ],
        solution: [
          "The term-to-term rule is 'add 3.5'.",
          "Day 2: 16 mm, day 3: 19.5 mm, day 4: 23 mm, day 5: 26.5 mm.",
          "Or in one go: day 5 is 4 steps after day 1, so 12.5 + 4 × 3.5 = 12.5 + 14 = 26.5 mm.",
        ],
        commonError: "Adding the step 5 times for day 5. From day 1 to day 5 there are only 4 steps, like 5 fence posts with 4 gaps.",
        difficulty: "warmup",
        guideRef: "term-to-term",
        hints: ["How many 'add 3.5' steps take you from day 1 to day 5?"],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q02",
        question: "Row n of a concert hall has 2n + 18 seats. How many more seats does row 15 have than row 10?",
        answer: { type: "number", value: 10, display: "10 more seats" },
        traps: [
          { spec: { type: "number", value: 48 }, feedback: "48 is the number of seats in row 15 on its own. Now subtract the number of seats in row 10." },
          { spec: { type: "number", value: 5 }, feedback: "Row 15 is 5 rows after row 10, but each row has 2 more seats than the row before it." },
        ],
        solution: [
          "Row 15: 2 × 15 + 18 = 30 + 18 = 48 seats.",
          "Row 10: 2 × 10 + 18 = 20 + 18 = 38 seats.",
          "48 − 38 = 10 more seats.",
          "Shortcut: the coefficient of n is 2, so each row has 2 more seats than the one before. Five rows later means 5 × 2 = 10 more.",
        ],
        difficulty: "warmup",
        guideRef: "using-nth-term",
        hints: ["Substitute n = 15 and then n = 10 into 2n + 18.", "Subtract to compare the two rows."],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q03",
        question:
          "On day 1, Wei Ling sends a message to 3 friends. On day 2, each of those friends sends it to 3 new people. This carries on: everyone who receives the message sends it to 3 new people the next day.\n\nHow many people receive the message on day 5?",
        answer: { type: "number", value: 243, display: "243 people" },
        traps: [
          { spec: { type: "number", value: 15 }, feedback: "That adds 3 people each day. But every person passes it on to 3 more, so the number is **multiplied** by 3 each day." },
          { spec: { type: "number", value: 81 }, feedback: "81 people receive it on day 4. One more day: 81 × 3." },
        ],
        solution: [
          "Day 1: 3 people. Each day the number is multiplied by 3, so this is a geometric sequence with common ratio 3.",
          "Day 2: 9, day 3: 27, day 4: 81, day 5: 243.",
          "In one go: {{3^5}} = 243.",
        ],
        difficulty: "warmup",
        guideRef: "special-sequences",
        hints: ["Is the number of people going up by adding or by multiplying?", "Day 2 is 3 × 3 = 9 people. Keep going."],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q04",
        question:
          "A taxi fare in dollars is worked out with this function machine:\n\n    distance in km  →  [× 0.7]  →  [+ 3.9]  →  fare in $\n\nWhat is the fare for a 12 km ride?",
        answer: { type: "number", value: 12.3, display: "$12.30" },
        traps: [
          {
            spec: { type: "number", value: 11.13, tolerance: 0.001 },
            feedback: "You added 3.9 before multiplying. A function machine works in order: × 0.7 first, then + 3.9.",
          },
        ],
        solution: ["Multiply first: 12 × 0.7 = 8.4.", "Then add: 8.4 + 3.9 = 12.3.", "The fare is $12.30."],
        difficulty: "warmup",
        guideRef: "functions",
        hints: ["Do the operations in the order the arrows show."],
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q05",
        question:
          "Rectangular tables are pushed together end to end for a class party. Each table seats 2 people along each long side and 1 person at each end.\n\n| Number of tables | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| Number of seats | 6 | 10 | 14 | 18 |\n\nWrite an expression for the number of seats when n tables are pushed together.",
        answer: { type: "expression", expr: "4n+2", form: "simplified", display: "4n + 2" },
        traps: [
          {
            spec: { type: "expression", expr: "6n" },
            feedback: "6n would be right if the tables stayed apart. Pushing them together loses the end seats where tables meet: 2 tables seat 10, not 12.",
          },
          {
            spec: { type: "expression", expr: "4n+6" },
            feedback: "Check n = 1: 4 + 6 = 10, but 1 table seats 6. The number to add on is the zero term: 6 − 4 = 2.",
          },
        ],
        solution: [
          "The seats go up by 4 for each extra table, so the expression starts with 4n.",
          "Zero term: go back one step from 6, so 6 − 4 = 2.",
          "Seats = 4n + 2. Check: n = 3 gives 12 + 2 = 14 ✓.",
          "You can see it in the tables: each table has 4 seats along its long sides, plus 2 end seats for the whole row.",
        ],
        commonError: "Using the first term (6) as the number added on, giving 4n + 6.",
        difficulty: "warmup",
        guideRef: "finding-nth-term",
        hints: ["How many seats does each extra table add?", "What would '0 tables' give if you go back one step from 6?"],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q06",
        question:
          "Ethan has $250 in his savings account. He takes out $12 every week and puts nothing in. After how many weeks will he first have less than $50 left?",
        answer: { type: "number", value: 17, display: "17 weeks" },
        traps: [
          { spec: { type: "number", value: 16 }, feedback: "After 16 weeks he has 250 − 192 = $58 left, which is still more than $50." },
        ],
        solution: [
          "After n weeks Ethan has 250 − 12n dollars.",
          "Solve 250 − 12n < 50: 12n > 200, so n > 16.66…",
          "n must be a whole number of weeks, so round **up** to 17.",
          "Check: after 16 weeks he has $58; after 17 weeks he has 250 − 204 = $46 ✓.",
        ],
        commonError: "Rounding 16.66… down to 16. After 16 weeks he still has more than $50.",
        difficulty: "core",
        guideRef: "is-it-a-term",
        hints: [
          "Write an expression for the amount left after n weeks.",
          "To get below $50 he must take out more than $200 altogether.",
          "200 ÷ 12 = 16.66… Which whole number of weeks takes him past that?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q07",
        question:
          "A fence is built from sections. Each section has 3 rails between two posts, and neighbouring sections share a post, as in the diagram.\n\nHow many posts and how many rails are needed for a fence of 25 sections? Give the number of posts first, then the number of rails.",
        diagram: `<svg viewBox="0 0 350 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fences of 1, 2 and 3 sections. Each section has 3 horizontal rails between two upright posts, and neighbouring sections share a post."><rect x="0" y="0" width="350" height="110" fill="#ffffff"/><g stroke="#92400e" stroke-width="3"><line x1="20" y1="30" x2="60" y2="30"/><line x1="20" y1="45" x2="60" y2="45"/><line x1="20" y1="60" x2="60" y2="60"/><line x1="100" y1="30" x2="140" y2="30"/><line x1="100" y1="45" x2="140" y2="45"/><line x1="100" y1="60" x2="140" y2="60"/><line x1="140" y1="30" x2="180" y2="30"/><line x1="140" y1="45" x2="180" y2="45"/><line x1="140" y1="60" x2="180" y2="60"/><line x1="210" y1="30" x2="250" y2="30"/><line x1="210" y1="45" x2="250" y2="45"/><line x1="210" y1="60" x2="250" y2="60"/><line x1="250" y1="30" x2="290" y2="30"/><line x1="250" y1="45" x2="290" y2="45"/><line x1="250" y1="60" x2="290" y2="60"/><line x1="290" y1="30" x2="330" y2="30"/><line x1="290" y1="45" x2="330" y2="45"/><line x1="290" y1="60" x2="330" y2="60"/></g><g fill="#334155"><rect x="17" y="20" width="6" height="50"/><rect x="57" y="20" width="6" height="50"/><rect x="97" y="20" width="6" height="50"/><rect x="137" y="20" width="6" height="50"/><rect x="177" y="20" width="6" height="50"/><rect x="207" y="20" width="6" height="50"/><rect x="247" y="20" width="6" height="50"/><rect x="287" y="20" width="6" height="50"/><rect x="327" y="20" width="6" height="50"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="40" y="92">1 section</text><text x="140" y="92">2 sections</text><text x="270" y="92">3 sections</text></g></svg>`,
        answer: { type: "list", values: [26, 75], ordered: true, display: "26 posts, 75 rails" },
        traps: [
          {
            spec: { type: "list", values: [25, 75], ordered: true },
            feedback: "Look at 1 section: it has 2 posts. There is always one more post than there are sections, because of the post at the very start.",
          },
          {
            spec: { type: "list", values: [50, 75], ordered: true },
            feedback: "Neighbouring sections share a post, so you can't give every section its own 2 posts.",
          },
        ],
        solution: [
          "Rails: every section has its own 3 rails, so 25 × 3 = 75 rails.",
          "Posts: 1 section has 2 posts, and each extra section adds just 1 post (its other post is shared). So the posts go 2, 3, 4, …, always one more than the number of sections.",
          "25 sections need 25 + 1 = 26 posts.",
          "Check the total: the pieces of wood go 5, 9, 13, … (add 4), so 25 sections use 4 × 25 + 1 = 101 pieces, and 26 + 75 = 101 ✓.",
        ],
        commonError: "Forgetting the extra post at the start: 25 sections need 26 posts, not 25.",
        difficulty: "core",
        guideRef: "term-to-term",
        hints: [
          "Count the posts and the rails separately. Do they follow the same pattern?",
          "Does each new section need two new posts, or just one?",
          "Posts: 2, 3, 4, … for 1, 2, 3 sections.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "sequences-graphs-p3-q08",
        question:
          "At a CCA open day, Priya hands out raffle tickets in order. The 1st visitor gets ticket number 3, the 2nd gets 7, the 3rd gets 11, and so on.\n\nHana shows Priya a ticket numbered 2026. Priya says it cannot be one of her tickets. Explain why Priya is right.",
        marks: 3,
        modelAnswer:
          "The ticket numbers go up by 4 each time, starting at 3, so the nth ticket is number 4n − 1 (check: n = 1 gives 3 ✓).\n\nIf 2026 were a ticket, then 4n − 1 = 2026, so 4n = 2027 and n = 506.75. That is not a whole number, so no visitor gets ticket 2026: the 506th ticket is 2023 and the 507th is 2027.\n\nAnother way: every ticket number is odd (start at an odd number and keep adding 4, which is even), but 2026 is even.",
        markScheme: [
          {
            point: "Finds the nth term 4n − 1 (or says the numbers go up in 4s from 3)",
            keywords: ["4n - 1", "4n−1", "4n-1", "add 4", "up in 4", "4 each"],
          },
          {
            point: "Solves 4n − 1 = 2026 to get n = 506.75, or shows the neighbouring tickets are 2023 and 2027, or notes every ticket is odd",
            keywords: ["506.75", "2027", "2023", "odd"],
          },
          {
            point: "Concludes 2026 is not a ticket because n is not a whole number (or because 2026 is even)",
            keywords: ["not a whole number", "not whole", "not an integer", "decimal", "even", "cannot"],
          },
        ],
        commonError: "Saying '2026 is too big'. The tickets go on for ever, so size alone proves nothing.",
        difficulty: "core",
        guideRef: "is-it-a-term",
        hints: [
          "Find the nth-term rule for 3, 7, 11, …",
          "Set your rule equal to 2026 and solve for n.",
          "Is your value of n a whole number? Or: are the ticket numbers odd or even?",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q09",
        question:
          "This function machine changes a temperature in °C into °F:\n\n    °C  →  [× {{9/5}}]  →  [+ 32]  →  °F\n\nOne afternoon in Singapore the temperature is 91.4 °F. What is it in °C?",
        answer: { type: "number", value: 33, display: "33 °C" },
        traps: [
          {
            spec: { type: "number", value: 18.78, tolerance: 0.01 },
            feedback: "You undid the steps in the wrong order. The machine adds 32 **last**, so undo that **first**: 91.4 − 32 = 59.4.",
          },
          {
            spec: { type: "number", value: 106.92, tolerance: 0.001 },
            feedback: "You multiplied by {{9/5}} again. To undo × {{9/5}}, divide by {{9/5}} (or multiply by {{5/9}}).",
          },
        ],
        solution: [
          "Work backwards, undoing the **last** step first.",
          "Undo + 32: 91.4 − 32 = 59.4.",
          "Undo × {{9/5}} by multiplying by {{5/9}}: 59.4 ÷ 9 = 6.6, and 6.6 × 5 = 33.",
          "Check: 33 × {{9/5}} = 59.4 and 59.4 + 32 = 91.4 ✓.",
        ],
        commonError: "Undoing the × {{9/5}} first. The last step done is the first one undone.",
        difficulty: "core",
        guideRef: "functions",
        hints: [
          "Which step of the machine must you undo first?",
          "Undo + 32, then undo × {{9/5}}.",
          "Dividing by {{9/5}} is the same as multiplying by {{5/9}}.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q10",
        question:
          "Jun climbs stairs taking either 1 step or 2 steps at a time. The table shows how many different ways he can climb some small staircases.\n\n| Number of steps | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| Number of ways | 1 | 2 | 3 | 5 |\n\nFor example, for 3 steps the ways are 1 + 1 + 1, 1 + 2 and 2 + 1. His last move is either a 1-step or a 2-step, so each number of ways is the sum of the two numbers before it.\n\nHow many ways can Jun climb a staircase of 10 steps?",
        answer: { type: "number", value: 89, display: "89 ways" },
        traps: [
          {
            spec: { type: "number", value: 55 },
            feedback: "55 is the number of ways for 9 steps. Make sure your list starts 1, 2, 3, 5 for 1, 2, 3, 4 steps.",
          },
        ],
        solution: [
          "Each number of ways is the sum of the two before it: a Fibonacci-type sequence.",
          "Why? To finish on step 10, Jun's last move came from step 9 (a 1-step) or from step 8 (a 2-step), so ways(10) = ways(9) + ways(8).",
          "Steps 1 to 10: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89.",
          "So there are 89 ways to climb 10 steps.",
        ],
        commonError: "Writing out the famous Fibonacci sequence 1, 1, 2, 3, 5, … instead. That shifts every term by one place and gives 55.",
        difficulty: "core",
        guideRef: "special-sequences",
        hints: [
          "Keep adding the last two numbers in the table.",
          "5 steps: 3 + 5 = 8 ways. 6 steps: 5 + 8 = 13 ways.",
          "Line each number up carefully with its number of steps.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q11",
        question:
          "A candle burns down steadily. Siti measures its height every hour.\n\n| Hours burning, n | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| Height (cm) | 22.5 | 21 | 19.5 | 18 |\n\nWrite an expression for the height of the candle, in cm, after n hours.",
        answer: { type: "expression", expr: "24-1.5n", display: "24 − 1.5n" },
        traps: [
          {
            spec: { type: "expression", expr: "22.5-1.5n" },
            feedback: "Check n = 1: 22.5 − 1.5 = 21, not 22.5. The number on its own is the height at n = 0, when the candle was lit: 22.5 + 1.5 = 24.",
          },
          {
            spec: { type: "expression", expr: "1.5n+24" },
            feedback: "The candle is getting shorter, so the height goes **down** by 1.5 cm each hour: the term in n is −1.5n.",
          },
        ],
        solution: [
          "The height falls by 1.5 cm each hour, so the coefficient of n is −1.5.",
          "Zero term (the height when the candle was lit, n = 0): 22.5 + 1.5 = 24.",
          "Height = 24 − 1.5n. Check: n = 4 gives 24 − 6 = 18 ✓.",
          "In context, the 24 is the height of the new candle and the 1.5 is how much burns away each hour.",
        ],
        commonError: "Writing + 1.5n for a sequence that is going down.",
        difficulty: "core",
        guideRef: "finding-nth-term",
        hints: [
          "Is the height going up or down each hour, and by how much?",
          "What was the height at n = 0? Go back one step from 22.5.",
          "Put it together: (zero term) − 1.5n.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "written",
        id: "sequences-graphs-p3-q12",
        question:
          "For a reading challenge, Zara reads 20 pages on day 1, and each day after that she reads 10 more pages than the day before. Mei reads 2 pages on day 1, and each day after that she reads double the number of pages she read the day before.\n\nMei says: 'On day 7 I will read more pages than Zara.'\n\nIs Mei right? Show your working, and say which type of sequence each girl's daily pages make.",
        marks: 4,
        modelAnswer:
          "Zara's pages go 20, 30, 40, 50, 60, 70, 80. She adds 10 each day, so this is an **arithmetic** sequence. On day 7 she reads 20 + 6 × 10 = 80 pages.\n\nMei's pages go 2, 4, 8, 16, 32, 64, 128. She multiplies by 2 each day, so this is a **geometric** sequence. On day 7 she reads 128 pages.\n\n128 > 80, so Mei is right. (On day 6 Zara still reads more, 70 pages against 64, so day 7 is the first day Mei reads more.)",
        markScheme: [
          { point: "Zara reads 80 pages on day 7", keywords: ["80"] },
          { point: "Mei reads 128 pages on day 7", keywords: ["128"] },
          { point: "Concludes that Mei is right because 128 > 80", keywords: ["right", "correct", "yes", "more than"] },
          { point: "Names Zara's sequence as arithmetic and Mei's as geometric", keywords: ["arithmetic", "geometric"] },
        ],
        commonError: "Working out day 6 or day 8 by miscounting. Day 7 is 6 steps after day 1.",
        difficulty: "core",
        guideRef: "special-sequences",
        hints: [
          "List each girl's pages for days 1 to 7.",
          "Zara adds 10 each time; Mei multiplies by 2 each time.",
          "Compare the two numbers for day 7.",
        ],
        strategy: "Make a table",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q13",
        question:
          "Lamp posts stand along a straight path at East Coast Park. The first is 30 m from the entrance, and after that there is one every 45 m.\n\nHow far from the entrance is the first lamp post **beyond** the 1 km mark? Give your answer in metres.",
        answer: { type: "number", value: 1020, display: "1020 m" },
        traps: [
          { spec: { type: "number", value: 975 }, feedback: "975 m is the last lamp post **before** the 1 km mark. The next one is 45 m further on." },
          {
            spec: { type: "number", value: 1000 },
            feedback: "Is there a post exactly at 1000 m? 45n − 15 = 1000 gives n = 22.55…, which is not a whole number, so no.",
          },
        ],
        solution: [
          "The positions go 30, 75, 120, … (add 45), so lamp post n is 45n − 15 metres from the entrance.",
          "1 km = 1000 m. Solve 45n − 15 = 1000: 45n = 1015, so n = 22.55…",
          "That is not a whole number, so no lamp post stands exactly at 1000 m.",
          "Lamp post 22 is at 45 × 22 − 15 = 975 m; lamp post 23 is at 45 × 23 − 15 = 1020 m.",
          "The first one beyond 1 km is 1020 m from the entrance.",
        ],
        difficulty: "core",
        guideRef: "is-it-a-term",
        hints: [
          "Find an expression for the distance of lamp post n from the entrance.",
          "Change 1 km into metres and set your expression equal to it.",
          "n comes out between 22 and 23. Which lamp post is beyond 1000 m?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q14",
        question:
          "A bakery prices cupcake orders with a rule: a fixed price for each cupcake, plus a $5 box fee for the whole order. An order of 4 cupcakes costs $19.\n\nHow much does an order of 10 cupcakes cost?",
        answer: { type: "number", value: 40, display: "$40" },
        traps: [
          {
            spec: { type: "number", value: 47.5 },
            feedback: "That treats the cost as proportional (19 ÷ 4 × 10). But the $5 box fee is paid once per order, not once per cupcake.",
          },
          { spec: { type: "number", value: 35 }, feedback: "That's the cost of the 10 cupcakes without the box. Add the $5 box fee." },
        ],
        solution: [
          "The rule is a function machine: number of cupcakes → × price → + 5 → cost.",
          "Work backwards from the 4-cupcake order: 19 − 5 = 14, and 14 ÷ 4 = 3.5. Each cupcake costs $3.50.",
          "Forwards for 10 cupcakes: 10 × 3.5 = 35, then 35 + 5 = $40.",
        ],
        commonError: "Scaling up $19 as if 10 cupcakes cost 2.5 times as much as 4. The fixed box fee breaks direct proportion.",
        difficulty: "core",
        guideRef: "functions",
        hints: [
          "Take the box fee off first. What do the 4 cupcakes themselves cost?",
          "Find the price of one cupcake.",
          "Now run the rule forwards for 10 cupcakes.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q15",
        question:
          "Wei Ling has $3 and saves $7 every week. Marcus has $113 and spends $4 of it every week.\n\nAfter how many weeks will they have the same amount of money, and what is that amount? Give the number of weeks first, then the amount in dollars.",
        answer: { type: "list", values: [10, 73], ordered: true, display: "10 weeks, $73" },
        traps: [
          {
            spec: { type: "list", values: [10, 70], ordered: true },
            feedback: "Right number of weeks. But Wei Ling started with $3, so after 10 weeks she has 3 + 70 = $73.",
          },
        ],
        solution: [
          "After n weeks, Wei Ling has 3 + 7n dollars and Marcus has 113 − 4n dollars.",
          "Set them equal: 3 + 7n = 113 − 4n.",
          "Add 4n to both sides: 3 + 11n = 113, so 11n = 110 and n = 10.",
          "Amount: 3 + 7 × 10 = 73. Check Marcus: 113 − 4 × 10 = 73 ✓.",
        ],
        solutions: [
          {
            label: "Close the gap",
            steps: [
              "At the start the gap between them is 113 − 3 = $110.",
              "Each week Wei Ling gains $7 and Marcus loses $4, so the gap shrinks by $11 a week.",
              "110 ÷ 11 = 10 weeks, and then each has 3 + 70 = $73. This is quicker: no equation needed.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "using-nth-term",
        hints: [
          "Write an expression for each person's money after n weeks.",
          "When are the two expressions equal?",
          "Or: the gap starts at $110. By how much does it close each week?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "sequences-graphs-p3-q16",
        question:
          "Here are two rules about the students in a Year 8 class.\n\n- **Rule A:** input a student → output the month that student was born in.\n- **Rule B:** input a month → output a student in the class who was born in that month.\n\nArjun says both rules are functions. Is he right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "No, only Rule A is a function. A function must give each input **exactly one** output.\n\nRule A is a function: every student was born in exactly one month, so each input gives one output. (It doesn't matter that several students share a month: two inputs are allowed to share an output.)\n\nRule B is not a function: a month such as March might have three students born in it, so that input has more than one possible output. A month with no birthdays in the class would have no output at all.",
        markScheme: [
          {
            point: "States the test: a function gives each input exactly one output",
            keywords: ["exactly one", "one output", "only one", "each input"],
          },
          { point: "Rule A is a function because each student has one birth month", keywords: ["rule a", "one month", "is a function"] },
          {
            point: "Rule B is not a function because a month can give several students (or none)",
            keywords: ["rule b", "not a function", "more than one", "several", "two students", "no output", "none"],
          },
        ],
        commonError: "Thinking Rule A fails because several students share a month. Two inputs may share an output; what is not allowed is one input with two outputs.",
        difficulty: "core",
        guideRef: "functions",
        hints: [
          "What must be true of every input in a function?",
          "Pick a student. How many birth months can Rule A give?",
          "Pick a month, say March. How many students could Rule B give?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q17",
        question:
          "Hana makes square grids from matchsticks. A 1 × 1 grid is a single square and uses 4 matches. A 2 × 2 grid is a big square split into 4 small squares and uses 12 matches. A 3 × 3 grid has 9 small squares and uses 24 matches.\n\nHow many matches does Hana need for a 10 × 10 grid?",
        answer: { type: "number", value: 220, display: "220 matches" },
        traps: [
          { spec: { type: "number", value: 400 }, feedback: "4 matches per small square counts every shared side twice. Neighbouring squares share matches." },
          {
            spec: { type: "number", value: 200 },
            feedback: "Close. A 10 × 10 grid has 11 horizontal lines of matches (one more than the number of rows), and 11 vertical lines too.",
          },
        ],
        solution: [
          "Count the horizontal and vertical matches separately.",
          "A 10 × 10 grid has 11 horizontal lines (the top edge plus one under each row), each made of 10 matches: 11 × 10 = 110.",
          "By symmetry there are also 11 vertical lines of 10 matches: another 110.",
          "Total: 110 + 110 = 220 matches.",
          "In general an n × n grid needs 2n(n + 1) matches. Check: n = 3 gives 2 × 3 × 4 = 24 ✓.",
        ],
        solutions: [
          {
            label: "Differences",
            steps: [
              "4, 12, 24, … has first differences 8, 12, … which go up by 4 each time: a constant second difference, so the sequence is quadratic.",
              "Continue the differences 8, 12, 16, 20, …: the terms are 4, 12, 24, 40, 60, 84, 112, 144, 180, 220.",
              "The 10th term is 220. Same answer, but counting lines is much quicker and explains *why*.",
            ],
          },
        ],
        commonError: "Assuming the sequence is linear. The differences 8, 12, … are not constant.",
        difficulty: "challenge",
        guideRef: "quadratic-sequences",
        hints: [
          "Counting square by square is messy because of shared sides. Count the horizontal matches and the vertical matches separately.",
          "In a 3 × 3 grid, how many horizontal lines of matches are there, and how many matches are in each line?",
          "A 3 × 3 grid has 4 horizontal lines of 3 matches. What does a 10 × 10 grid have?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q18",
        question:
          "A corridor has 100 lockers. Their numbers, in order, are 3, 8, 13, 18, … Every locker whose number is a multiple of 3 is painted blue.\n\nHow many of the 100 lockers are blue?",
        answer: { type: "number", value: 34, display: "34 lockers" },
        traps: [
          {
            spec: { type: "number", value: 33 },
            feedback: "Close! The blue lockers are in positions 1, 4, 7, …, 100. Count carefully: that list includes both the 1st and the 100th locker.",
          },
        ],
        solution: [
          "Locker n has number 5n − 2. The first few are 3 (blue), 8, 13, 18 (blue), 23, 28, 33 (blue), …",
          "The blue lockers are the 1st, 4th, 7th, …: every 3rd locker, starting with the 1st. (Moving 3 lockers along adds 3 × 5 = 15 to the number, and 15 is a multiple of 3, so the pattern repeats for ever.)",
          "The blue positions 1, 4, 7, … have nth term 3n − 2. Solve 3n − 2 = 100: 3n = 102, so n = 34.",
          "Check the 100th locker: 5 × 100 − 2 = 498 = 3 × 166, so it is blue ✓. There are 34 blue lockers.",
        ],
        commonError: "Working out 100 ÷ 3 ≈ 33 and stopping. Here the pattern starts with a blue locker, so the count rounds up.",
        difficulty: "challenge",
        guideRef: "is-it-a-term",
        hints: [
          "Write out the first eight or so locker numbers and mark the multiples of 3.",
          "Look for a pattern in the **positions** of the blue lockers, not their numbers.",
          "The blue positions go 1, 4, 7, … Is position 100 one of them? How many terms are in that list?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "written",
        id: "sequences-graphs-p3-q19",
        question:
          "Mei's magic trick: 'Pick any two numbers. Write them down, then keep writing the sum of the last two numbers until you have **6** numbers. I can tell you the total of all six instantly: I just multiply the 5th number by 4!'\n\nFor example, 2, 5, 7, 12, 19, 31 has a total of 76, and 4 × 19 = 76.\n\nExplain why Mei's trick always works.",
        marks: 3,
        modelAnswer:
          "Call the two starting numbers a and b. The six numbers are\n\n    a,  b,  a + b,  a + 2b,  2a + 3b,  3a + 5b\n\nAdding them, the a's give 1 + 0 + 1 + 1 + 2 + 3 = 8 lots of a, and the b's give 0 + 1 + 1 + 2 + 3 + 5 = 12 lots of b. So the total is 8a + 12b.\n\nThe 5th number is 2a + 3b, and 4(2a + 3b) = 8a + 12b. So the total is always 4 times the 5th number, whatever a and b are, and the trick always works. (Trying examples can't prove this, because there are infinitely many starting pairs. The algebra covers them all at once.)",
        markScheme: [
          {
            point: "Uses letters for the first two numbers and writes all six terms (a, b, a + b, a + 2b, 2a + 3b, 3a + 5b)",
            keywords: ["a + b", "a+b", "a + 2b", "a+2b", "2a + 3b", "2a+3b", "3a + 5b", "3a+5b"],
          },
          { point: "Finds the total 8a + 12b", keywords: ["8a + 12b", "8a+12b"] },
          {
            point: "Shows 4(2a + 3b) = 8a + 12b, so the trick works for every a and b",
            keywords: ["4(2a + 3b)", "4(2a+3b)", "always", "any", "every"],
          },
        ],
        commonError: "Checking a few examples and stopping. Examples show the trick works for those numbers; algebra shows it works for all of them.",
        difficulty: "challenge",
        guideRef: "special-sequences",
        hints: [
          "Examples won't prove it for every pair. Call the two starting numbers a and b.",
          "Write the 3rd, 4th, 5th and 6th numbers in terms of a and b.",
          "Add all six expressions, then compare the total with 4 × (5th number).",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "sequences-graphs-p3-q20",
        question:
          "At a CCA welcome meeting, every student shakes hands once with every other student. With 2 students there is 1 handshake, with 3 students there are 3 handshakes, and with 4 students there are 6.\n\nAt the meeting there are 300 handshakes altogether. How many students are there?",
        answer: { type: "number", value: 25, display: "25 students" },
        traps: [
          {
            spec: { type: "number", value: 24 },
            feedback: "300 is the 24th triangular number, but with n students the handshakes are 1 + 2 + … + (n − 1). With 24 students there would be only 276 handshakes.",
          },
        ],
        solution: [
          "Let the students arrive one at a time. The 2nd student shakes 1 hand, the 3rd shakes 2 new hands, the 4th shakes 3, …, and the nth shakes n − 1.",
          "So with n students there are 1 + 2 + 3 + … + (n − 1) handshakes. The totals 1, 3, 6, 10, … are the triangular numbers.",
          "With n students there are {{(n(n - 1))/2}} handshakes. Check: 4 students give {{(4 * 3)/2}} = 6 ✓.",
          "Solve {{(n(n - 1))/2 = 300}}: n(n − 1) = 600. Look for two consecutive whole numbers that multiply to 600: 25 × 24 = 600.",
          "So there are 25 students. Check: {{(25 * 24)/2}} = 300 ✓.",
        ],
        solutions: [
          {
            label: "Count from each student",
            steps: [
              "Each of the n students shakes n − 1 hands, which gives n(n − 1).",
              "But every handshake involves two students, so each one has been counted twice: handshakes = {{(n(n - 1))/2}}.",
              "n(n − 1) = 600, and 25 × 24 = 600, so n = 25. This is quicker once you see the double counting.",
            ],
          },
        ],
        commonError: "Answering 24 because 300 is the 24th triangular number. With n students the last student adds only n − 1 handshakes.",
        difficulty: "challenge",
        guideRef: "special-sequences",
        hints: [
          "Build it up: when a new student arrives, how many new handshakes happen?",
          "The handshake totals 1, 3, 6, 10, … form a special sequence. Which one?",
          "With n students there are {{(n(n - 1))/2}} handshakes. Find two consecutive whole numbers that multiply to 600.",
        ],
        strategy: "Try small cases",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "sequences-graphs-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "sequences-graphs-p4-q01",
        question:
          "The table shows part of a sequence. The same number is added each time.\n\n| Position | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Term | 1.75 | 2.4 | ? | 3.7 | ? | 5 |\n\nFind the 3rd term and the 5th term. Give the 3rd term first.",
        answer: { type: "list", values: [3.05, 4.35], ordered: true, display: "3.05, 4.35" },
        traps: [
          {
            spec: { type: "list", values: [3.15, 4.45], ordered: true },
            feedback: "Check the gap: 2.40 − 1.75 = 0.65, not 0.75. Line up the decimal points. (Also, 2.4 + 2 × 0.75 = 3.9, which doesn't match the 4th term.)",
          },
        ],
        solution: [
          "The rule is 'add 0.65', because 2.4 − 1.75 = 0.65.",
          "Check with the known terms: from 2.4 (2nd) to 3.7 (4th) is 1.3, which is two steps of 0.65 ✓.",
          "3rd term: 2.4 + 0.65 = 3.05. 5th term: 3.7 + 0.65 = 4.35.",
          "Check: 4.35 + 0.65 = 5, the 6th term ✓.",
        ],
        commonError: "Adding 1.3 between the 2nd and 3rd terms. The jump of 1.3 from 2.4 to 3.7 covers two steps, not one.",
        difficulty: "warmup",
        guideRef: "term-to-term",
        hints: ["Find the gap between the 1st and 2nd terms.", "Check your rule also works from the 2nd term to the 4th term."],
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q02",
        question:
          "The nth term of a sequence is {{n/4 + 2}}. The table shows some of its terms.\n\n| Position n | 1 | 2 | 8 | 20 |\n|---|---|---|---|---|\n| Term | {{2 1/4}} | {{2 1/2}} | ? | ? |\n\nFind the 8th term and the 20th term. Give the 8th term first.",
        answer: { type: "list", values: [4, 7], ordered: true, display: "4, 7" },
        traps: [
          {
            spec: { type: "list", values: [2.5, 5.5], ordered: true },
            feedback: "Those come from (n + 2) ÷ 4. The rule {{n/4 + 2}} means divide n by 4 **first**, then add 2.",
          },
        ],
        solution: [
          "n = 8: {{8/4 + 2}} = 2 + 2 = 4.",
          "n = 20: {{20/4 + 2}} = 5 + 2 = 7.",
          "Check the pattern: the coefficient of n is {{1/4}}, so the terms go up by {{1/4}} each time, as the table shows.",
        ],
        difficulty: "warmup",
        guideRef: "using-nth-term",
        hints: ["Substitute n = 8: divide by 4 first, then add 2.", "Check your method with n = 1: {{1/4 + 2 = 2 1/4}} ✓."],
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q03",
        question:
          "All four of these sequences start 4, 12, … but exactly one of them is geometric.\n\n| Sequence | 1st | 2nd | 3rd | 4th |\n|---|---|---|---|---|\n| A | 4 | 12 | 20 | 28 |\n| B | 4 | 12 | 36 | 108 |\n| C | 4 | 12 | 16 | 28 |\n| D | 4 | 12 | 24 | 40 |\n\nWhat is the next term of the geometric sequence?",
        answer: { type: "number", value: 324 },
        traps: [
          { spec: { type: "number", value: 36 }, feedback: "36 is the next term of A, which adds 8 each time. That is arithmetic, not geometric." },
          { spec: { type: "number", value: 44 }, feedback: "44 is the next term of C, which adds the two previous terms. That is Fibonacci-type, not geometric." },
        ],
        solution: [
          "Geometric means you multiply by the same number each time. Test the ratios.",
          "B: 12 ÷ 4 = 3, 36 ÷ 12 = 3, 108 ÷ 36 = 3. The common ratio is 3.",
          "(A adds 8: arithmetic. C adds the two previous terms: Fibonacci-type. D has differences 8, 12, 16, which are not constant.)",
          "Next term of B: 108 × 3 = 324.",
        ],
        commonError: "Deciding from the first two terms only. Every sequence here starts 4, 12, so you must test the later terms too.",
        difficulty: "warmup",
        guideRef: "special-sequences",
        hints: [
          "In a geometric sequence you **multiply** by the same number each time.",
          "Divide each term by the one before it. Which sequence gives the same answer every time?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q04",
        question: "Look at the function machine. What is the output when the input is 18?",
        diagram: `<svg viewBox="0 0 440 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Function machine: input 18, then divide by 4, then add 2.5, then output unknown"><rect x="0" y="0" width="440" height="90" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="40" y="30" font-size="12">Input</text><text x="40" y="58" font-size="16" font-weight="bold">18</text><text x="400" y="30" font-size="12">Output</text><text x="400" y="58" font-size="16" font-weight="bold">?</text></g><g stroke="#334155" stroke-width="1.5"><rect x="110" y="34" width="80" height="36" rx="6" fill="#c7d2fe"/><rect x="250" y="34" width="80" height="36" rx="6" fill="#fde68a"/><line x1="62" y1="52" x2="102" y2="52"/><line x1="190" y1="52" x2="242" y2="52"/><line x1="330" y1="52" x2="372" y2="52"/></g><g fill="#334155"><polygon points="110,52 102,48 102,56"/><polygon points="250,52 242,48 242,56"/><polygon points="380,52 372,48 372,56"/></g><g font-family="sans-serif" font-size="15" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="150" y="57">÷ 4</text><text x="290" y="57">+ 2.5</text></g></svg>`,
        answer: { type: "number", value: 7 },
        traps: [
          { spec: { type: "number", value: 5.125 }, feedback: "You added 2.5 first. The machine divides by 4 **first**, then adds 2.5." },
        ],
        solution: ["Divide first: 18 ÷ 4 = 4.5.", "Then add: 4.5 + 2.5 = 7."],
        difficulty: "warmup",
        guideRef: "functions",
        hints: ["Follow the arrows in order: ÷ 4 comes before + 2.5."],
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q05",
        question: "Find the nth term of the sequence 21, 15, 9, 3, … Write your answer as an expression in n.",
        answer: { type: "expression", expr: "27-6n", form: "simplified", display: "27 − 6n" },
        traps: [
          { spec: { type: "expression", expr: "6n+15" }, feedback: "The terms go **down** by 6, so the coefficient of n is −6, not 6." },
          {
            spec: { type: "expression", expr: "21-6n" },
            feedback: "Check n = 1: 21 − 6 = 15, not 21. Use the zero term: one step before 21 is 21 + 6 = 27.",
          },
        ],
        solution: [
          "The terms go down by 6 each time, so the rule contains −6n.",
          "Zero term: one step before 21 is 21 + 6 = 27.",
          "nth term = 27 − 6n. Check: n = 4 gives 27 − 24 = 3 ✓.",
        ],
        commonError: "Writing + 6n for a decreasing sequence. The sign of the difference becomes the sign of the n-term.",
        difficulty: "warmup",
        guideRef: "finding-nth-term",
        hints: ["What is the difference between the terms, including its sign?", "Find the zero term by going back one step from 21."],
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q06",
        question:
          "Here is a sequence: 9, 14, 19, 24, …\n\n(a) Find an expression for the nth term.\n(b) Find the 50th term.\n(c) Which term of the sequence is equal to 404?\n\nGive your answers to (b) and (c) only, in that order.",
        answer: { type: "list", values: [254, 80], ordered: true, display: "(b) 254   (c) the 80th term" },
        traps: [
          {
            spec: { type: "list", values: [259, 79], ordered: true },
            feedback: "You used 'first term + n × 5'. From the 1st term to the nth term there are only n − 1 steps, so the nth term is 5n + 4.",
          },
        ],
        solution: [
          "(a) The difference is 5 and the zero term is 9 − 5 = 4, so the nth term is 5n + 4.",
          "(b) 50th term: 5 × 50 + 4 = 254.",
          "(c) Solve 5n + 4 = 404: 5n = 400, so n = 80. 404 is the 80th term.",
          "Check: 5 × 80 + 4 = 404 ✓.",
        ],
        difficulty: "core",
        guideRef: "is-it-a-term",
        hints: [
          "Start with part (a): find the difference and the zero term.",
          "For (b), substitute n = 50 into your rule.",
          "For (c), set your rule equal to 404 and solve for n.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q07",
        question:
          "Tiles are arranged in T-shapes that grow as shown.\n\nEthan makes the T-shape in this sequence that uses exactly 100 tiles. How many tiles are in its top row?",
        diagram: `<svg viewBox="0 0 330 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="T-shaped tile patterns. Pattern 1 has a top row of 3 tiles and a stem of 1 tile. Pattern 2 has a top row of 5 tiles and a stem of 2 tiles. Pattern 3 has a top row of 7 tiles and a stem of 3 tiles."><rect x="0" y="0" width="330" height="112" fill="#ffffff"/><g stroke="#334155" stroke-width="1"><rect x="15" y="12" width="16" height="16" fill="#bae6fd"/><rect x="31" y="12" width="16" height="16" fill="#bae6fd"/><rect x="47" y="12" width="16" height="16" fill="#bae6fd"/><rect x="31" y="28" width="16" height="16" fill="#bae6fd"/><rect x="88" y="12" width="16" height="16" fill="#bae6fd"/><rect x="104" y="12" width="16" height="16" fill="#bae6fd"/><rect x="120" y="12" width="16" height="16" fill="#bae6fd"/><rect x="136" y="12" width="16" height="16" fill="#bae6fd"/><rect x="152" y="12" width="16" height="16" fill="#bae6fd"/><rect x="120" y="28" width="16" height="16" fill="#bae6fd"/><rect x="120" y="44" width="16" height="16" fill="#bae6fd"/><rect x="200" y="12" width="16" height="16" fill="#bae6fd"/><rect x="216" y="12" width="16" height="16" fill="#bae6fd"/><rect x="232" y="12" width="16" height="16" fill="#bae6fd"/><rect x="248" y="12" width="16" height="16" fill="#bae6fd"/><rect x="264" y="12" width="16" height="16" fill="#bae6fd"/><rect x="280" y="12" width="16" height="16" fill="#bae6fd"/><rect x="296" y="12" width="16" height="16" fill="#bae6fd"/><rect x="248" y="28" width="16" height="16" fill="#bae6fd"/><rect x="248" y="44" width="16" height="16" fill="#bae6fd"/><rect x="248" y="60" width="16" height="16" fill="#bae6fd"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="39" y="100">Pattern 1</text><text x="128" y="100">Pattern 2</text><text x="256" y="100">Pattern 3</text></g></svg>`,
        answer: { type: "number", value: 67, display: "67 tiles" },
        traps: [
          {
            spec: { type: "number", value: 33 },
            feedback: "33 is the pattern number, which is also the number of tiles in the stem. The top row of pattern n has 2n + 1 tiles.",
          },
          { spec: { type: "number", value: 66 }, feedback: "Check pattern 1: its top row has 3 tiles, which is 2n + 1, not 2n." },
        ],
        solution: [
          "Count all the tiles: patterns 1, 2, 3 use 4, 7, 10 tiles. They go up by 3 and the zero term is 4 − 3 = 1, so pattern n uses 3n + 1 tiles.",
          "You can see it in the picture: each new pattern adds 1 tile to each end of the top row and 1 tile to the stem. The top row has 2n + 1 tiles and the stem has n, so the total is 3n + 1.",
          "Solve 3n + 1 = 100: 3n = 99, so n = 33.",
          "The top row of pattern 33 has 2 × 33 + 1 = 67 tiles. Check: 67 + 33 = 100 ✓.",
        ],
        commonError: "Stopping at the pattern number. The question asks for the top row, not n.",
        difficulty: "core",
        guideRef: "finding-nth-term",
        hints: [
          "Count all the tiles in patterns 1, 2 and 3. How many are added each time?",
          "Find an expression for the total in pattern n, and use it to find which pattern uses 100 tiles.",
          "Now count the top rows: 3, 5, 7, … for patterns 1, 2, 3. What is it for your pattern?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "sequences-graphs-p4-q08",
        question:
          "Marcus says: 'The nth term of 5, 8, 11, 14, … is n + 3, because the sequence goes up by 3 each time.'\n\n(a) Show that Marcus is wrong.\n(b) Find the correct nth term, and explain where the 'goes up by 3' appears in it.",
        marks: 3,
        modelAnswer:
          "(a) Substituting n = 1 into n + 3 gives 4, not 5, and n = 2 gives 5, not 8. In fact n + 3 gives 4, 5, 6, 7, …, which goes up by **1** each time.\n\n(b) The sequence goes up by 3, so the rule starts with 3n (the 3 times table: 3, 6, 9, 12, …). Each term is 2 more than the 3 times table, so the nth term is **3n + 2**. Check: n = 4 gives 14 ✓.\n\nThe 'goes up by 3' is the **coefficient of n**: 3n increases by 3 every time n increases by 1. The + 2 is the zero term, 5 − 3.",
        markScheme: [
          {
            point: "Shows n + 3 fails, e.g. it gives 4 when n = 1, or it only goes up in 1s",
            keywords: ["4", "up by 1", "up in 1", "not 5", "n = 1"],
          },
          { point: "Correct nth term 3n + 2", keywords: ["3n + 2", "3n+2"] },
          {
            point: "Explains that the 3 multiplies n (the coefficient of n), and the 2 is the zero term",
            keywords: ["coefficient", "3n", "times n", "multiplies", "3 times table", "zero term"],
          },
        ],
        commonError: "Adding the difference on, as in n + 3, instead of multiplying n by it.",
        difficulty: "core",
        guideRef: "finding-nth-term",
        hints: [
          "Test Marcus's rule: what does n + 3 give when n = 1, 2 and 3?",
          "Which simple sequence goes up by 3 each time? Compare 5, 8, 11, 14 with 3, 6, 9, 12.",
          "How far is each term above the 3 times table?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q09",
        question:
          "A function machine does this:\n\n    input  →  [− 4]  →  [× {{3/5}}]  →  output\n\nThe output is 9. What was the input?",
        answer: { type: "number", value: 19 },
        traps: [
          {
            spec: { type: "number", value: 9.4 },
            feedback: "You multiplied by {{3/5}} again. To undo × {{3/5}}, **divide** by {{3/5}}, which is the same as multiplying by {{5/3}}.",
          },
          {
            spec: { type: "number", value: 21.67, tolerance: 0.01 },
            feedback: "You undid the steps in the wrong order. The machine multiplies **last**, so undo the × {{3/5}} first, then the − 4.",
          },
        ],
        solution: [
          "Undo the **last** step first: undo × {{3/5}} by dividing by {{3/5}}.",
          "9 ÷ {{3/5}} = 9 × {{5/3}} = 15.",
          "Undo − 4 by adding 4: 15 + 4 = 19.",
          "Check: 19 − 4 = 15 and 15 × {{3/5}} = 9 ✓.",
        ],
        difficulty: "core",
        guideRef: "functions",
        hints: [
          "Which operation must you undo first?",
          "What is the inverse of × {{3/5}}?",
          "Dividing by {{3/5}} is the same as multiplying by {{5/3}}.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q10",
        question:
          "A ball is dropped from a height of 81 cm. After each bounce it rises to {{2/3}} of the height it fell from.\n\nAfter which bounce does the ball first rise to a height of less than 10 cm?",
        answer: { type: "number", value: 6, display: "the 6th bounce" },
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "After the 5th bounce it rises to {{10 2/3}} cm, which is just over 10 cm. One more bounce." },
        ],
        solution: [
          "The heights form a geometric sequence with common ratio {{2/3}}.",
          "Bounce 1: 81 × {{2/3}} = 54 cm. Bounce 2: 36 cm. Bounce 3: 24 cm. Bounce 4: 16 cm.",
          "Bounce 5: 16 × {{2/3}} = {{32/3}} = {{10 2/3}} cm, still more than 10 cm.",
          "Bounce 6: {{32/3}} × {{2/3}} = {{64/9}} = {{7 1/9}} cm, less than 10 cm.",
          "So the 6th bounce is the first one below 10 cm.",
        ],
        difficulty: "core",
        guideRef: "special-sequences",
        hints: [
          "Each height is {{2/3}} of the one before, so multiply by {{2/3}} each time.",
          "{{2/3}} of 81 is 54. Keep going, and keep track of which bounce you are on.",
          "Be careful near the end: is {{10 2/3}} less than 10?",
        ],
        strategy: "Make a table",
      },
      {
        kind: "written",
        id: "sequences-graphs-p4-q11",
        question:
          "Matchstick houses are joined in a row, as shown. Neighbouring houses share a wall.\n\n(a) Explain, using the diagram, why Pattern n needs 5n + 1 matches.\n(b) How many matches are needed for Pattern 30?",
        diagram: `<svg viewBox="0 0 310 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Matchstick houses. Pattern 1 is one house: a square with a triangular roof, 6 matches. Pattern 2 is two houses in a row sharing a wall, 11 matches. Pattern 3 is three houses in a row, 16 matches."><rect x="0" y="0" width="310" height="100" fill="#ffffff"/><g stroke="#334155" stroke-width="3" stroke-linecap="round"><line x1="30" y1="30" x2="30" y2="54"/><line x1="54" y1="30" x2="54" y2="54"/><line x1="30" y1="30" x2="54" y2="30"/><line x1="30" y1="54" x2="54" y2="54"/><line x1="30" y1="30" x2="42" y2="16"/><line x1="42" y1="16" x2="54" y2="30"/><line x1="105" y1="30" x2="105" y2="54"/><line x1="129" y1="30" x2="129" y2="54"/><line x1="153" y1="30" x2="153" y2="54"/><line x1="105" y1="30" x2="129" y2="30"/><line x1="105" y1="54" x2="129" y2="54"/><line x1="105" y1="30" x2="117" y2="16"/><line x1="117" y1="16" x2="129" y2="30"/><line x1="129" y1="30" x2="153" y2="30"/><line x1="129" y1="54" x2="153" y2="54"/><line x1="129" y1="30" x2="141" y2="16"/><line x1="141" y1="16" x2="153" y2="30"/><line x1="215" y1="30" x2="215" y2="54"/><line x1="239" y1="30" x2="239" y2="54"/><line x1="263" y1="30" x2="263" y2="54"/><line x1="287" y1="30" x2="287" y2="54"/><line x1="215" y1="30" x2="239" y2="30"/><line x1="215" y1="54" x2="239" y2="54"/><line x1="215" y1="30" x2="227" y2="16"/><line x1="227" y1="16" x2="239" y2="30"/><line x1="239" y1="30" x2="263" y2="30"/><line x1="239" y1="54" x2="263" y2="54"/><line x1="239" y1="30" x2="251" y2="16"/><line x1="251" y1="16" x2="263" y2="30"/><line x1="263" y1="30" x2="287" y2="30"/><line x1="263" y1="54" x2="287" y2="54"/><line x1="263" y1="30" x2="275" y2="16"/><line x1="275" y1="16" x2="287" y2="30"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="42" y="76">Pattern 1</text><text x="42" y="92" font-weight="bold">6 matches</text><text x="129" y="76">Pattern 2</text><text x="129" y="92" font-weight="bold">11 matches</text><text x="251" y="76">Pattern 3</text><text x="251" y="92" font-weight="bold">16 matches</text></g></svg>`,
        marks: 3,
        modelAnswer:
          "(a) Start with the left-hand wall of the first house: 1 match. Then every house adds 5 more matches: its floor, its ceiling, its right-hand wall and its 2 roof matches. Its left-hand wall is already there (it is the starting wall, or the previous house's right-hand wall). So n houses need 1 + 5n = 5n + 1 matches. Check: Pattern 3 has 5 × 3 + 1 = 16 ✓.\n\n(b) Pattern 30 needs 5 × 30 + 1 = **151** matches.",
        markScheme: [
          {
            point: "Explains that each house adds 5 matches (floor, ceiling, right wall and 2 roof matches)",
            keywords: ["5", "five", "floor", "roof", "ceiling"],
          },
          {
            point: "Explains the + 1 as the extra starting (left-hand) wall, because walls are shared",
            keywords: ["first wall", "left wall", "left-hand", "shared", "share", "starting", "extra"],
          },
          { point: "151 matches for Pattern 30", keywords: ["151"] },
        ],
        commonError: "Saying each house uses 6 matches, so 6n. That counts every shared wall twice.",
        difficulty: "core",
        guideRef: "term-to-term",
        hints: [
          "How many matches does each new house add? Look at the shared wall.",
          "Which single match is not part of a repeating block of 5?",
          "For part (b), substitute n = 30.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q12",
        question: "A sequence starts 61, 57.5, 54, 50.5, … and continues in the same way. How many of its terms are positive?",
        answer: { type: "number", value: 18, display: "18 terms" },
        traps: [
          {
            spec: { type: "number", value: 17 },
            feedback: "61 ÷ 3.5 ≈ 17.4 counts the **steps** of 3.5 you can take while staying positive. But the 1st term needs no step, so there are 17 + 1 terms.",
          },
          { spec: { type: "number", value: 19 }, feedback: "The 19th term is 64.5 − 66.5 = −2, which is negative." },
        ],
        solution: [
          "The terms go down by 3.5, and the zero term is 61 + 3.5 = 64.5, so the nth term is 64.5 − 3.5n.",
          "Positive means 64.5 − 3.5n > 0, so 3.5n < 64.5 and n < 18.43…",
          "n is a whole number, so n = 1, 2, …, 18.",
          "Check: the 18th term is 64.5 − 63 = 1.5 (positive) and the 19th term is −2 (negative). There are 18 positive terms.",
        ],
        difficulty: "core",
        guideRef: "is-it-a-term",
        hints: [
          "Find the nth term first. The terms go down by 3.5.",
          "Solve: nth term > 0.",
          "Check the terms on either side of your answer.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q13",
        question:
          "The mapping diagram shows some inputs and outputs of a function f. The function is a two-step machine: 'multiply by a number, then add a number'.\n\nFind f(−4).",
        diagram: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapping diagram for function f: 1 maps to 7, 2 maps to 10, 3 maps to 13 and 5 maps to 19"><rect x="0" y="0" width="300" height="200" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><ellipse cx="70" cy="105" rx="36" ry="82" fill="#c7d2fe"/><ellipse cx="230" cy="105" rx="36" ry="82" fill="#fde68a"/><line x1="84" y1="46" x2="194" y2="46"/><line x1="84" y1="83" x2="194" y2="83"/><line x1="84" y1="120" x2="194" y2="120"/><line x1="84" y1="157" x2="194" y2="157"/></g><g fill="#334155"><polygon points="202,46 194,42 194,50"/><polygon points="202,83 194,79 194,87"/><polygon points="202,120 194,116 194,124"/><polygon points="202,157 194,153 194,161"/></g><g font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle"><text x="70" y="16" font-size="12" font-weight="bold">Input x</text><text x="230" y="16" font-size="12" font-weight="bold">Output f(x)</text><text x="70" y="50">1</text><text x="230" y="50">7</text><text x="70" y="87">2</text><text x="230" y="87">10</text><text x="70" y="124">3</text><text x="230" y="124">13</text><text x="70" y="161">5</text><text x="230" y="161">19</text></g></svg>`,
        answer: { type: "number", value: -8 },
        traps: [
          {
            spec: { type: "number", value: 2 },
            feedback: "x + 6 only works for x = 1. When the input goes up by 1, the output goes up by 3, so the rule starts with '× 3'.",
          },
        ],
        solution: [
          "When the input goes up by 1 (1 → 2 → 3), the output goes up by 3 (7 → 10 → 13). So the machine multiplies by 3.",
          "1 × 3 = 3, and 3 + 4 = 7, so it then adds 4: f(x) = 3x + 4.",
          "Check with the last pair: 5 × 3 + 4 = 19 ✓.",
          "f(−4) = 3 × (−4) + 4 = −12 + 4 = −8.",
        ],
        difficulty: "core",
        guideRef: "functions",
        hints: [
          "When the input goes up by 1, how much does the output go up by?",
          "Once you know the multiplier, what must be added to turn 1 into 7?",
          "Check your rule with 5 → 19, then substitute −4.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "written",
        id: "sequences-graphs-p4-q14",
        question:
          "A function machine does '× 2, then + 6'.\n\nSiti says: 'To run it backwards, you do ÷ 2, then − 6.'\n\n(a) Use an example to show that Siti is wrong.\n(b) Write down the correct inverse machine and explain why the order matters.",
        marks: 3,
        modelAnswer:
          "(a) Put in 5: 5 × 2 = 10, then 10 + 6 = 16. Siti's machine turns 16 into 16 ÷ 2 = 8, then 8 − 6 = 2. That is not 5, so Siti's machine does not get back to the input.\n\n(b) The inverse is '− 6, then ÷ 2'. Check: 16 − 6 = 10 and 10 ÷ 2 = 5 ✓. As a rule, the inverse of 2x + 6 is {{(x - 6)/2}}.\n\nThe order matters because you must undo the **last** step first, like taking off your shoes before your socks. The + 6 was done last, so it has to be undone first.",
        markScheme: [
          {
            point: "A worked example showing that Siti's machine does not return the original input",
            keywords: ["not the same", "doesn't", "does not", "different", "not equal", "not 5"],
          },
          {
            point: "Correct inverse: − 6, then ÷ 2 (or {{(x - 6)/2}})",
            keywords: ["subtract 6", "minus 6", "take away 6", "- 6 then", "(x - 6)/2", "(x-6)/2"],
          },
          { point: "Explains that the last operation must be undone first (reverse order)", keywords: ["last", "reverse", "backwards", "opposite order"] },
        ],
        commonError: "Swapping each operation for its inverse but keeping the same order.",
        difficulty: "core",
        guideRef: "functions",
        hints: [
          "Choose an easy input, run it forwards, then put the output through Siti's machine.",
          "Which step was done last? That is the one to undo first.",
          "Undo + 6 first, then undo × 2.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q15",
        question:
          "In this Fibonacci-type sequence, each term is the sum of the two terms before it. The first three terms are missing.\n\n| Term | 1st | 2nd | 3rd | 4th | 5th |\n|---|---|---|---|---|---|\n| Value | ? | ? | ? | 7 | 4 |\n\nFind the 1st term.",
        answer: { type: "number", value: -13 },
        traps: [
          { spec: { type: "number", value: -3 }, feedback: "−3 is the 3rd term. Keep working backwards to the 1st term." },
          {
            spec: { type: "number", value: 11 },
            feedback: "7 + 4 = 11 would be the 6th term. Here you need to go backwards: 3rd term = 5th term − 4th term.",
          },
        ],
        solution: [
          "Work backwards. The 3rd and 4th terms add up to the 5th, so the 3rd term is 4 − 7 = −3.",
          "The 2nd and 3rd terms add up to the 4th, so the 2nd term is 7 − (−3) = 10.",
          "The 1st and 2nd terms add up to the 3rd, so the 1st term is −3 − 10 = −13.",
          "Check forwards: −13 + 10 = −3, then 10 + (−3) = 7, then −3 + 7 = 4 ✓.",
        ],
        commonError: "Sign slips when subtracting a negative: 7 − (−3) is 7 + 3 = 10, not 4.",
        difficulty: "core",
        guideRef: "special-sequences",
        hints: [
          "The 3rd and 4th terms add up to the 5th. So what must the 3rd term be?",
          "Don't be put off by a negative answer: 4 − 7 = −3.",
          "Keep going backwards: 2nd = 4th − 3rd, then 1st = 3rd − 2nd.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q16",
        question:
          "A sequence begins {{1/3}}, 1, {{5/3}}, {{7/3}}, …\n\nFind the nth term, then use it to find the 40th term. Give the 40th term as a fraction or a mixed number.",
        answer: { type: "fraction", n: 79, d: 3, display: "{{79/3}} = {{26 1/3}}" },
        traps: [
          {
            spec: { type: "number", value: 27 },
            feedback: "That's {{1/3}} + 40 × {{2/3}}: one step too many. From the 1st term to the 40th term there are 39 steps.",
          },
        ],
        solution: [
          "Write 1 as {{3/3}}: the sequence is {{1/3}}, {{3/3}}, {{5/3}}, {{7/3}}, … so the difference is {{2/3}}.",
          "Zero term: {{1/3 - 2/3 = -1/3}}. So the nth term is {{2/3 n - 1/3}}, which is {{(2n - 1)/3}}.",
          "Check: n = 4 gives {{7/3}} ✓.",
          "40th term: {{(2 * 40 - 1)/3 = 79/3 = 26 1/3}}.",
        ],
        commonError: "Missing the pattern because 1 is not written as a fraction. Writing every term in thirds makes the numerators 1, 3, 5, 7 jump out.",
        difficulty: "core",
        guideRef: "finding-nth-term",
        hints: [
          "Write every term as a number of thirds. What are the numerators?",
          "The numerators 1, 3, 5, 7 are the odd numbers, 2n − 1.",
          "So the nth term is {{(2n - 1)/3}}. Substitute n = 40.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q17",
        question:
          "Machine A does '+ 3, then × 2, then − 1'.\n\nMachine B does '× 4, then + k, then ÷ 2', where k is a number.\n\nFor one value of k, the two machines give the same output for **every** input. Find that value of k.",
        answer: { type: "number", value: 10 },
        traps: [
          {
            spec: { type: "number", value: 5 },
            feedback: "In Machine B, k is added **before** the ÷ 2, so it gets halved. You need k ÷ 2 = 5, not k = 5.",
          },
        ],
        solution: [
          "Put x into each machine and simplify.",
          "Machine A: x + 3, then 2(x + 3) = 2x + 6, then 2x + 6 − 1 = 2x + 5.",
          "Machine B: 4x, then 4x + k, then {{(4x + k)/2}} = 2x + {{k/2}}.",
          "For these to match for every x, {{k/2}} must equal 5, so k = 10.",
          "Check with x = 1: A gives (1 + 3) × 2 − 1 = 7; B gives (4 + 10) ÷ 2 = 7 ✓.",
        ],
        solutions: [
          {
            label: "Try a special input",
            steps: [
              "Input 0 is the easiest. Machine A: 0 + 3 = 3, × 2 = 6, − 1 = 5.",
              "Machine B: 0 × 4 = 0, + k = k, ÷ 2 = {{k/2}}. So {{k/2}} = 5 and k = 10.",
              "This is quicker, but one input only tells you k = 10 is the **only** possibility. The algebra (both machines are 2x + 5) proves it works for every input.",
            ],
          },
        ],
        commonError: "Testing a single input and stopping. 'Every input' needs the algebra, or at least a check with a second input.",
        difficulty: "challenge",
        guideRef: "functions",
        hints: [
          "Call the input x and write each machine's output as an expression.",
          "Machine A simplifies to 2x + 5. What does Machine B simplify to?",
          "Machine B gives 2x + {{k/2}}. What must {{k/2}} be?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "sequences-graphs-p4-q18",
        question:
          "Mei says: 'If you add any three consecutive terms of the sequence 5n + 2 (7, 12, 17, 22, 27, …), the total is always a multiple of 5, because the terms go up in 5s.'\n\n(a) Show that Mei is wrong.\n(b) Use algebra to prove that the total of any three consecutive terms of 5n + 2 is always a multiple of 3.",
        marks: 4,
        modelAnswer:
          "(a) 7 + 12 + 17 = 36, which is not a multiple of 5. So Mei is wrong.\n\n(b) Three consecutive terms are the nth, (n + 1)th and (n + 2)th terms:\n\n    5n + 2,   5(n + 1) + 2 = 5n + 7,   5(n + 2) + 2 = 5n + 12\n\nTheir total is 5n + 2 + 5n + 7 + 5n + 12 = 15n + 21 = 3(5n + 7). That is 3 times a whole number, so it is always a multiple of 3. In fact 5n + 7 is the middle term, so the total is always **3 × the middle term** (for example 7 + 12 + 17 = 36 = 3 × 12).\n\nWhy Mei's idea fails: 15n is a multiple of 5, but 21 is not, so 15n + 21 always leaves remainder 1 when divided by 5. The total is **never** a multiple of 5.",
        markScheme: [
          {
            point: "A counter-example, e.g. 7 + 12 + 17 = 36, which is not a multiple of 5",
            keywords: ["36", "51", "66", "81", "not a multiple of 5", "counter"],
          },
          {
            point: "Writes three consecutive terms in terms of n: 5n + 2, 5n + 7, 5n + 12",
            keywords: ["5n + 7", "5n+7", "5n + 12", "5n+12", "n + 1", "n+1"],
          },
          { point: "Adds them to get 15n + 21", keywords: ["15n + 21", "15n+21"] },
          {
            point: "Writes the total as 3(5n + 7), or 3 × the middle term, so it is always a multiple of 3",
            keywords: ["3(5n + 7)", "3(5n+7)", "middle term", "divisible by 3", "multiple of 3", "3 ×"],
          },
        ],
        commonError: "Checking a few totals (36, 51, 66) and saying 'they are all multiples of 3'. Examples can disprove a claim, but only algebra proves it for every case.",
        difficulty: "challenge",
        guideRef: "using-nth-term",
        hints: [
          "Try some examples first: 7 + 12 + 17, then 12 + 17 + 22.",
          "Write three consecutive terms using n. The nth term is 5n + 2; what are the next two?",
          "Add your three expressions and look for a common factor.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q19",
        question:
          "Hana notices a pattern:\n\n    1 = 1\n    1 + 3 = 4\n    1 + 3 + 5 = 9\n    1 + 3 + 5 + 7 = 16\n\nUse her pattern to work out 1 + 3 + 5 + 7 + … + 99, the total of all the odd numbers from 1 to 99.",
        answer: { type: "number", value: 2500 },
        traps: [
          {
            spec: { type: "number", value: 9801 },
            feedback: "99 is the last number added, not how many numbers you added. How many odd numbers are there from 1 to 99?",
          },
          { spec: { type: "number", value: 2401 }, feedback: "The nth odd number is 2n − 1, and 2n − 1 = 99 gives n = 50, not 49." },
        ],
        solution: [
          "The totals 1, 4, 9, 16 are the square numbers: adding the first n odd numbers gives {{n^2}}.",
          "Why? Each odd number is an L-shaped border that grows a square by one: 1 dot, add 3 to make a 2 × 2 square, add 5 to make 3 × 3, add 7 to make 4 × 4, …",
          "How many odd numbers are there from 1 to 99? The nth odd number is 2n − 1, and 2n − 1 = 99 gives n = 50.",
          "So the total is {{50^2}} = 2500.",
        ],
        solutions: [
          {
            label: "Pair them up",
            steps: [
              "Pair the first number with the last: 1 + 99 = 100, then 3 + 97 = 100, 5 + 95 = 100, …",
              "There are 50 numbers, so 25 pairs, each making 100.",
              "25 × 100 = 2500. The same answer from a different idea; the square pattern is quicker once you know how many terms there are.",
            ],
          },
        ],
        commonError: "Squaring the last number (99) instead of the number of terms (50).",
        difficulty: "challenge",
        guideRef: "special-sequences",
        hints: [
          "What kind of numbers are the totals 1, 4, 9, 16?",
          "Adding the first n odd numbers gives {{n^2}}. So you need to know how many odd numbers there are from 1 to 99.",
          "The nth odd number is 2n − 1. Which n gives 99?",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "sequences-graphs-p4-q20",
        question: "Here is a sequence: 7, 10, 15, 22, 31, …\n\nWhich term of the sequence is equal to 2031?",
        answer: { type: "number", value: 45, display: "the 45th term" },
        traps: [
          { spec: { type: "number", value: 2025 }, feedback: "2025 is {{n^2}}, not n. Which whole number squared gives 2025?" },
        ],
        solution: [
          "First differences: 3, 5, 7, 9. Second differences: 2, 2, 2. So the sequence is quadratic, with {{n^2}} in its rule.",
          "Subtract the square numbers 1, 4, 9, 16, 25 from the terms: you get 6 every time, so the nth term is {{n^2 + 6}}.",
          "Solve {{n^2 + 6 = 2031}}: {{n^2 = 2025}}.",
          "Estimate: {{40^2 = 1600}} and {{50^2 = 2500}}, and a square ending in 5 comes from a number ending in 5. Try 45: 45 × 45 = 2025 ✓.",
          "So 2031 is the 45th term. Check: {{45^2 + 6 = 2025 + 6 = 2031}} ✓.",
        ],
        commonError: "Treating the sequence as linear. The gaps 3, 5, 7, 9 are not equal, so there is no 'add the same number' rule.",
        difficulty: "challenge",
        guideRef: "quadratic-sequences",
        hints: [
          "The gaps are not equal. Look at the gaps between the gaps.",
          "Compare each term with the square numbers 1, 4, 9, 16, 25.",
          "Solve {{n^2 + 6 = 2031}}. Which whole number squares to 2025?",
        ],
        strategy: "Find a pattern",
      },
    ],
  },
];
