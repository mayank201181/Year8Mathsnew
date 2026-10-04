// Equations & Inequalities — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // ===========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // ===========================================================================
  {
    id: "equations-p3",
    title: "Practice Paper 3",
    questions: [
      // ---------------------------------------------------------------- q01
      {
        kind: "short",
        id: "equations-p3-q01",
        question:
          "A karaoke room costs $15 to book plus $12.50 for every hour. Wei Ling's group paid $65 altogether. Write an equation for the number of hours, h, and solve it. For how many hours did they book the room?",
        answer: { type: "number", value: 4, display: "4 hours" },
        traps: [
          { spec: { type: "number", value: 50 }, feedback: "$50 is the cost of the hours on their own. Now share it out: how many lots of $12.50 make $50?" },
          { spec: { type: "number", value: 6.4 }, feedback: "You added the $15 booking fee. It is already part of the $65, so subtract it: 65 − 15 = 50." },
        ],
        solution: [
          "Cost = booking fee + hourly rate × hours, so {{15 + 12.5h = 65}}.",
          "Subtract 15 from both sides: {{12.5h = 50}}.",
          "Divide both sides by 12.5: h = 4.",
          "Check: 15 + 12.50 × 4 = 15 + 50 = $65 ✓",
        ],
        commonError: "Dividing 65 by 12.50 straight away and forgetting the fixed $15 booking fee.",
        difficulty: "warmup",
        guideRef: "solving-equations",
        hints: [
          "Which part of the $65 does not depend on the number of hours?",
          "Take the $15 off first, then work out how many hours the rest pays for.",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q02
      {
        kind: "short",
        id: "equations-p3-q02",
        question:
          "An ice-cream freezer at a Sentosa kiosk is switched on when it is at 26 °C. Its temperature drops by 4 °C every hour. Write an equation for the number of hours, h, it takes to reach −18 °C, and solve it.",
        answer: { type: "number", value: 11, display: "11 hours" },
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "The freezer has to go *below* zero. From 26 °C down to −18 °C is a drop of 26 + 18 = 44 degrees, not 8." },
        ],
        solution: [
          "Temperature after h hours: {{26 - 4h}}.",
          "Equation: {{26 - 4h = -18}}.",
          "Subtract 26 from both sides: {{-4h = -44}}.",
          "Divide both sides by −4: h = 11.",
          "Check: 26 − 4 × 11 = 26 − 44 = −18 ✓",
        ],
        commonError: "Treating −18 as +18, which gives a drop of only 8 degrees.",
        difficulty: "warmup",
        guideRef: "solving-equations",
        hints: [
          "Write the temperature after h hours as an expression.",
          "Set {{26 - 4h}} equal to −18, then undo one step at a time.",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q03
      {
        kind: "short",
        id: "equations-p3-q03",
        question:
          "A ride at Sentosa has this sign: \"Riders must be at least 110 cm tall and shorter than 140 cm.\" Let h be a rider's height in cm. Write the rule as an inequality. Then work out how many different whole-number heights (in cm) are allowed.",
        answer: { type: "number", value: 30 },
        traps: [
          { spec: { type: "number", value: 29 }, feedback: "'At least 110' includes 110 itself, so the allowed heights run from 110 to 139 with *both* ends counted. That is 139 − 110 + 1, not 139 − 110." },
          { spec: { type: "number", value: 31 }, feedback: "'Shorter than 140' leaves 140 out: someone exactly 140 cm tall cannot ride." },
        ],
        solution: [
          "'At least 110' means {{h >= 110}}; 'shorter than 140' means {{h < 140}}.",
          "Together: {{110 <= h < 140}}.",
          "The allowed whole numbers are 110, 111, 112, …, 139.",
          "How many? 139 − 110 + 1 = 30.",
        ],
        commonError: "Getting the endpoints wrong: 'at least' includes the end value (≥) but 'shorter than' does not (<).",
        difficulty: "warmup",
        guideRef: "inequalities",
        hints: [
          "Is a rider who is exactly 110 cm allowed? Exactly 140 cm?",
          "Write down the smallest and largest allowed whole numbers, then count from one to the other (including both).",
        ],
        strategy: "Consider extremes",
      },
      // ---------------------------------------------------------------- q04
      {
        kind: "short",
        id: "equations-p3-q04",
        question:
          "Last term a notebook cost $n. This term the price has gone up by $1.50. Arjun buys 4 notebooks at the new price and pays $22 altogether. Write an equation with a bracket and solve it to find n, last term's price in dollars.",
        answer: { type: "number", value: 4, display: "$4" },
        traps: [
          { spec: { type: "number", value: 5.125 }, feedback: "The 4 multiplies everything in the bracket: {{4(n + 1.5) = 4n + 6}}, not {{4n + 1.5}}." },
          { spec: { type: "number", value: 5.5 }, feedback: "$5.50 is this term's price. Last term it was $1.50 less." },
        ],
        solution: [
          "New price = {{(n + 1.5)}} dollars, so {{4(n + 1.5) = 22}}.",
          "Divide both sides by 4: {{n + 1.5 = 5.5}}.",
          "Subtract 1.5: n = 4.",
          "Check: new price $5.50, and 4 × 5.50 = $22 ✓",
        ],
        solutions: [
          { label: "Expand first", steps: ["{{4n + 6 = 22}}", "{{4n = 16}}", "n = 4"] },
          { label: "Divide first (quicker here)", steps: ["22 ÷ 4 = 5.5, so {{n + 1.5 = 5.5}}", "n = 4"] },
        ],
        difficulty: "warmup",
        guideRef: "equations-with-brackets",
        hints: [
          "What does one notebook cost this term, in terms of n?",
          "4 lots of {{(n + 1.5)}} make 22. Dividing both sides by 4 first keeps the numbers small.",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q05
      {
        kind: "short",
        id: "equations-p3-q05",
        question:
          "Siti and three friends share the cost of a durian equally. Each of them also pays $2 for their own drink. Each person spends $9.50 altogether. Write an equation for the price of the durian, $d, and solve it. How much did the durian cost?",
        answer: { type: "number", value: 30, display: "$30" },
        traps: [
          { spec: { type: "number", value: 22.5 }, feedback: "Siti *and* three friends makes 4 people, so each person pays {{d/4}} for the durian." },
          { spec: { type: "number", value: 36 }, feedback: "You multiplied by 4 before removing the $2 drink. Undo in reverse order: subtract 2 first, then multiply by 4." },
        ],
        solution: [
          "4 people share, so each pays {{d/4}} for the durian.",
          "Equation: {{d/4 + 2 = 9.5}}.",
          "Subtract 2: {{d/4 = 7.5}}.",
          "Multiply by 4: d = 30.",
          "Check: 30 ÷ 4 = 7.50, plus 2 = $9.50 ✓",
        ],
        difficulty: "warmup",
        guideRef: "fractional-equations",
        hints: [
          "How many people share the durian?",
          "Undo the + 2 first, then undo the ÷ 4.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q06
      {
        kind: "short",
        id: "equations-p3-q06",
        question:
          "Two candles are lit at the same time. Candle A is 30 cm tall and burns down 2 cm every hour. Candle B is 22 cm tall and burns down 1 cm every hour. Form and solve an equation to find when they are the same height. How tall is each candle at that moment, in cm?",
        answer: { type: "number", value: 14, display: "14 cm" },
        traps: [
          { spec: { type: "number", value: 8 }, feedback: "8 is the number of hours. The question asks for the height: substitute t = 8 back into either expression." },
        ],
        solution: [
          "After t hours: candle A is {{30 - 2t}} cm and candle B is {{22 - t}} cm.",
          "Same height: {{30 - 2t = 22 - t}}.",
          "Add 2t to both sides: {{30 = 22 + t}}, so t = 8.",
          "Height: 30 − 2 × 8 = 14 cm (and 22 − 8 = 14 cm ✓).",
        ],
        solutions: [
          {
            label: "Think about the gap",
            steps: [
              "Candle A starts 8 cm taller.",
              "A burns 1 cm per hour faster than B, so the gap shrinks by 1 cm every hour.",
              "The gap has gone after 8 hours, when both candles are 14 cm tall.",
            ],
          },
        ],
        commonError: "Stopping at t = 8. That answers 'when?', but the question asks 'how tall?'.",
        difficulty: "core",
        guideRef: "unknowns-both-sides",
        hints: [
          "Write each candle's height after t hours.",
          "Set the two expressions equal. Adding 2t to both sides keeps the t-term positive.",
          "Once you have t, substitute it back into either expression.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q07
      {
        kind: "short",
        id: "equations-p3-q07",
        question:
          "Jun opens a library book. The two page numbers in front of him add up to 157. In this book, left-hand pages have even numbers and right-hand pages have odd numbers. What is the number on the right-hand page?",
        answer: { type: "number", value: 79 },
        traps: [
          { spec: { type: "number", value: 78 }, feedback: "78 is the left-hand page (the even one). The right-hand page is the next number." },
        ],
        solution: [
          "Facing pages are consecutive: call them n and n + 1.",
          "{{n + (n + 1) = 157}}, so {{2n + 1 = 157}}.",
          "{{2n = 156}}, so n = 78.",
          "The pages are 78 (left, even) and 79 (right, odd). Check: 78 + 79 = 157 ✓",
        ],
        commonError: "Halving 157 to get 78.5. Page numbers are consecutive whole numbers, so use n and n + 1.",
        difficulty: "core",
        guideRef: "forming-equations",
        hints: [
          "How are the two page numbers related to each other?",
          "Call the left-hand page n. What is the right-hand page?",
          "Solve {{2n + 1 = 157}}.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q08
      {
        kind: "short",
        id: "equations-p3-q08",
        question:
          "The school Green Club needs to raise **at least** $500 for a charity run. Sponsors have already given $120. The rest will come from selling wristbands at $4.50 each. Write an inequality for the number of wristbands, w, and solve it. What is the least number of wristbands they must sell?",
        answer: { type: "number", value: 85 },
        traps: [
          { spec: { type: "number", value: 84 }, feedback: "84 wristbands raise 120 + 378 = $498, just short of $500. Here you must round *up*." },
          { spec: { type: "number", value: 112 }, feedback: "That ignores the $120 the sponsors gave. Take it off first: 500 − 120 = 380." },
        ],
        solution: [
          "Money raised: {{120 + 4.5w}}, which must be at least 500.",
          "{{120 + 4.5w >= 500}}.",
          "Subtract 120: {{4.5w >= 380}}.",
          "Divide by 4.5: w ≥ 84.4 (to 1 d.p.).",
          "w is a whole number, so the least is 85. Check: 120 + 4.50 × 85 = $502.50 ✓, but 84 gives only $498 ✗.",
        ],
        commonError: "Rounding 84.4 to the nearest whole number (84). To reach a target you must round up.",
        difficulty: "core",
        guideRef: "solving-inequalities",
        hints: [
          "Which symbol means 'at least'?",
          "Solve {{120 + 4.5w >= 500}} like an equation: subtract 120, then divide by 4.5.",
          "w must be a whole number that reaches the target. Should you round up or down?",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q09
      {
        kind: "written",
        id: "equations-p3-q09",
        question:
          "Zara has a 50 cm piece of wire. She bends all of it into a rectangle whose length is 1 cm more than twice its width.\n\n**(a)** Form and solve an equation to find the width and the length of Zara's rectangle.\n\n**(b)** Jun says: \"With the same 50 cm of wire, I can make a rectangle whose length is 30 cm more than twice its width.\" Use an equation to show that Jun is wrong, and explain why.",
        marks: 4,
        modelAnswer:
          "(a) Let the width be w cm, so the length is {{(2w + 1)}} cm. Perimeter: {{2(w + 2w + 1) = 50}}, so {{2(3w + 1) = 50}}. Divide by 2: {{3w + 1 = 25}}, so {{3w = 24}} and w = 8. The rectangle is **8 cm wide and 17 cm long**. Check: 2 × (8 + 17) = 50 ✓\n\n(b) Jun's length would be {{(2w + 30)}} cm, so {{2(w + 2w + 30) = 50}}. Divide by 2: {{3w + 30 = 25}}, so {{3w = -5}} and {{w = -5/3}}. A width cannot be negative, so the rectangle is **impossible**. Another way to see it: length + width must be 25 cm (half the wire), but Jun's length alone would already be more than 30 cm.",
        markScheme: [
          { point: "Forms a correct perimeter equation, e.g. {{2(w + 2w + 1) = 50}}", keywords: ["2(3w + 1)", "6w + 2", "3w + 1 = 25", "2w + 1"] },
          { point: "Width 8 cm and length 17 cm", keywords: ["8", "17", "w = 8"] },
          { point: "Jun's equation gives a negative width ({{w = -5/3}})", keywords: ["-5/3", "−5/3", "negative", "-1.67", "−1.67", "3w = -5", "3w = −5"] },
          { point: "Concludes Jun's rectangle is impossible because a width cannot be negative (or the length alone exceeds 25 cm)", keywords: ["impossible", "not possible", "cannot", "can't", "25"] },
        ],
        commonError: "Using 50 as length + width instead of the whole perimeter (2 × length + 2 × width).",
        difficulty: "core",
        guideRef: "equations-with-brackets",
        hints: [
          "Call the width w. Write the length in terms of w.",
          "Perimeter = 2 × (length + width). Set it equal to 50 and divide by 2 first.",
          "Do the same for Jun's rectangle. What kind of number do you get for w — and can a width be that?",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "equations-p3-q10",
        question:
          "Zara's journey to school has three parts. She walks to the MRT station, then rides the train for three times as long as that walk, then takes a bus for 4 minutes longer than the walk. The whole journey takes 54 minutes. How many minutes is she on the train?",
        answer: { type: "number", value: 30, display: "30 minutes" },
        traps: [
          { spec: { type: "number", value: 10 }, feedback: "10 minutes is the walk. The train takes three times as long." },
          { spec: { type: "number", value: 14 }, feedback: "14 minutes is the bus ride. The question asks about the train." },
        ],
        solution: [
          "Let the walk take w minutes. Train: 3w. Bus: {{w + 4}}.",
          "{{w + 3w + (w + 4) = 54}}, so {{5w + 4 = 54}}.",
          "{{5w = 50}}, so w = 10.",
          "Train: 3 × 10 = 30 minutes. Check: 10 + 30 + 14 = 54 ✓",
        ],
        difficulty: "core",
        guideRef: "forming-equations",
        hints: [
          "Every part of the journey is described using the walk. Call the walk w minutes.",
          "Write each part in terms of w and add them up.",
          "Solve {{5w + 4 = 54}}, then remember the question asks for the train time.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "short",
        id: "equations-p3-q11",
        question:
          "A rectangular community-garden plot is x m wide and {{(3x - 4)}} m long, where x is a whole number. The perimeter must be **less than** 80 m, and the length must be **more than** 20 m. Find all the possible values of x. Separate them with commas.",
        answer: { type: "list", values: [9, 10], display: "9, 10" },
        traps: [
          { spec: { type: "list", values: [9, 10, 11] }, feedback: "Try x = 11: the perimeter is 8 × 11 − 8 = 80 m, which is not *less than* 80." },
          { spec: { type: "list", values: [8, 9, 10] }, feedback: "Try x = 8: the length is 3 × 8 − 4 = 20 m, which is not *more than* 20." },
        ],
        solution: [
          "Perimeter: {{2(x + 3x - 4) = 8x - 8}}.",
          "{{8x - 8 < 80}} gives {{8x < 88}}, so x < 11.",
          "Length: {{3x - 4 > 20}} gives {{3x > 24}}, so x > 8.",
          "So {{8 < x < 11}}: the whole numbers are 9 and 10.",
          "Check x = 10: 10 m by 26 m, perimeter 72 m < 80 ✓ and length 26 m > 20 ✓.",
        ],
        difficulty: "core",
        guideRef: "solving-inequalities",
        hints: [
          "Write two inequalities: one for the perimeter and one for the length.",
          "The perimeter is {{2(x + (3x - 4))}}. Simplify it first.",
          "x must satisfy both at once. Then test the boundary values.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "written",
        id: "equations-p3-q12",
        question:
          "Ethan is 11 and his father is 44, so right now his father is exactly four times his age.\n\nEthan says: \"As we get older, one day Dad will be exactly twice my age. And if we wait long enough, one day we will be the same age.\"\n\nUse equations to decide whether each part of Ethan's claim is true.",
        marks: 3,
        modelAnswer:
          "Let t be the number of years from now. Ethan will be {{11 + t}} and his father {{44 + t}}.\n\n**Twice his age:** {{44 + t = 2(11 + t)}}, so {{44 + t = 22 + 2t}}, which gives t = 22. In 22 years Ethan will be 33 and his father 66, and 66 = 2 × 33. This part is **true**.\n\n**The same age:** {{44 + t = 11 + t}} would mean 44 = 11, which is impossible, so the equation has no solution. Both ages go up by 1 each year, so the difference is always 44 − 11 = 33 years. They will **never** be the same age, so this part is false.",
        markScheme: [
          { point: "Forms {{44 + t = 2(11 + t)}} or equivalent", keywords: ["44 + t", "2(11 + t)", "22 + 2t", "2(11+t)"] },
          { point: "Solves t = 22: ages 33 and 66, so the first part is true", keywords: ["22", "33", "66"] },
          { point: "Explains they are never the same age: the equation has no solution because the difference always stays 33", keywords: ["never", "33", "difference", "no solution", "impossible"] },
        ],
        commonError: "Putting the 2 on the wrong side: {{2(44 + t) = 11 + t}}. Dad's age is twice Ethan's, so the 2 multiplies Ethan's age.",
        difficulty: "core",
        guideRef: "forming-equations",
        hints: [
          "Let t be the number of years from now. Write both ages in terms of t.",
          "'Twice my age' gives {{44 + t = 2(11 + t)}}. Solve it.",
          "For 'the same age', write {{44 + t = 11 + t}}. What happens when you subtract t from both sides?",
        ],
        strategy: "Look for an invariant",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "short",
        id: "equations-p3-q13",
        question:
          "Four friends plan to share a taxi fare equally. At the last minute Ravi drops out, so the other three share the same fare equally, and each of them pays $2.50 more than planned. Form and solve an equation to find the total taxi fare.",
        answer: { type: "number", value: 30, display: "$30" },
        traps: [
          { spec: { type: "number", value: 10 }, feedback: "$10 is what each of the three ends up paying. The whole fare is 3 × 10." },
          { spec: { type: "number", value: 7.5 }, feedback: "$7.50 was each person's planned share. Multiply by 4 for the whole fare." },
        ],
        solution: [
          "Let the fare be $F. Planned share: {{F/4}}. New share: {{F/3}}.",
          "The new share is $2.50 more: {{F/3 - F/4 = 2.5}}.",
          "Over 12: {{4F/12 - 3F/12 = F/12}}, so {{F/12 = 2.5}}.",
          "F = 30. Check: 30 ÷ 4 = $7.50 and 30 ÷ 3 = $10; the difference is $2.50 ✓",
        ],
        solutions: [
          {
            label: "Follow Ravi's share",
            steps: [
              "Ravi's planned share is split between the other three.",
              "Each of them pays $2.50 extra, so Ravi's share was 3 × 2.50 = $7.50.",
              "All four shares were equal, so the fare is 4 × 7.50 = $30.",
            ],
          },
        ],
        commonError: "Writing {{F/4 - F/3 = 2.5}}. Sharing between fewer people makes each share *bigger*, so {{F/3}} is the larger share.",
        difficulty: "core",
        guideRef: "fractional-equations",
        hints: [
          "Call the fare F. What would each of four people pay? Each of three?",
          "The difference between the two shares is 2.5: {{F/3 - F/4 = 2.5}}.",
          "Multiply every term by 12 to clear the fractions.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q14
      {
        kind: "short",
        id: "equations-p3-q14",
        question:
          "A bike-rental kiosk at Pasir Ris Park has only bicycles and tricycles: 25 cycles with 61 wheels altogether. Write a pair of simultaneous equations and solve them to find how many bicycles and how many tricycles there are. Give the number of bicycles first.",
        answer: { type: "list", values: [14, 11], ordered: true, display: "14 bicycles, 11 tricycles" },
        traps: [
          { spec: { type: "list", values: [11, 14], ordered: true }, feedback: "Bicycles first: 14 bicycles (28 wheels) and 11 tricycles (33 wheels)." },
        ],
        solution: [
          "Let b = number of bicycles and t = number of tricycles.",
          "Cycles: {{b + t = 25}}. Wheels: {{2b + 3t = 61}}.",
          "Double the first equation: {{2b + 2t = 50}}.",
          "Subtract this from the wheels equation: t = 11.",
          "Then b = 25 − 11 = 14.",
          "Check: 14 × 2 + 11 × 3 = 28 + 33 = 61 ✓",
        ],
        solutions: [
          {
            label: "Start from an extreme",
            steps: [
              "If all 25 were bicycles there would be 50 wheels.",
              "There are 11 more wheels than that, and swapping a bicycle for a tricycle adds 1 wheel.",
              "So there are 11 tricycles and 14 bicycles.",
            ],
          },
        ],
        commonError: "Subtracting the equations without first making the b-terms match.",
        difficulty: "core",
        guideRef: "simultaneous-equations",
        hints: [
          "Write one equation for the number of cycles and one for the number of wheels.",
          "Make the b-terms match by doubling the first equation.",
          "Subtract to find t, then substitute back to find b.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "equations-p3-q15",
        question:
          "A rectangular pond is x m long and 4 m wide. A path 1 m wide runs all the way round it, as shown. The outside edge of the path has a perimeter of 30 m. Write an equation and solve it to find x.",
        diagram: `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular pond x metres long and 4 metres wide, with a path 1 metre wide all the way round it"><rect width="360" height="250" fill="#ffffff"/><rect x="45" y="35" width="270" height="180" fill="#fde68a" stroke="#334155" stroke-width="2"/><rect x="75" y="65" width="210" height="120" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="180" y="55" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">path</text><text x="180" y="86" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x m</text><text x="180" y="132" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#334155">pond</text><text x="266" y="130" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 m</text><line x1="45" y1="140" x2="75" y2="140" stroke="#1f2937" stroke-width="1.5"/><line x1="45" y1="134" x2="45" y2="146" stroke="#1f2937" stroke-width="1.5"/><line x1="75" y1="134" x2="75" y2="146" stroke="#1f2937" stroke-width="1.5"/><text x="60" y="130" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 m</text></svg>`,
        answer: { type: "number", value: 7, display: "x = 7" },
        traps: [
          { spec: { type: "number", value: 9 }, feedback: "The path adds 1 m at *both* ends, so the outer length is {{x + 2}} and the outer width is 4 + 2 = 6 m." },
          { spec: { type: "number", value: 11 }, feedback: "That makes the *pond's* perimeter 30 m. The 30 m goes round the outside of the path." },
        ],
        solution: [
          "Outer rectangle: length {{x + 2}} m (1 m added at each end) and width 4 + 2 = 6 m.",
          "Perimeter: {{2(x + 2 + 6) = 30}}.",
          "Divide by 2: {{x + 8 = 15}}.",
          "So x = 7.",
          "Check: the outer rectangle is 9 m by 6 m, and 2 × (9 + 6) = 30 m ✓",
        ],
        difficulty: "core",
        guideRef: "equations-with-brackets",
        hints: [
          "What are the length and width of the *outer* rectangle?",
          "The path is on both sides, so it adds 2 m to each dimension.",
          "Perimeter = 2 × (length + width). Divide both sides by 2 first.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "written",
        id: "equations-p3-q16",
        question:
          "A CCA trip: the coach costs $360 in total. Each student who goes pays $15, and out of this the school pays $7 per student for entry tickets. The trip must not make a loss, and the coach has 52 seats for students.\n\n**(a)** Form and solve an inequality to show that at least 45 students must go.\n\n**(b)** The teacher says: \"So any number from 45 to 52 students works. That's 52 − 45 = 7 possible group sizes.\" Is the teacher right? Explain.",
        marks: 4,
        modelAnswer:
          "(a) With n students, the money collected is 15n and the costs are {{360 + 7n}}. No loss means {{15n >= 360 + 7n}}. Subtract 7n: {{8n >= 360}}, so **n ≥ 45**. (Check: 45 students bring in $675 and the costs are 360 + 315 = $675, so no loss.)\n\n(b) The coach limits the group to 52, so {{45 <= n <= 52}}. Both 45 and 52 are allowed, so the group sizes are 45, 46, 47, 48, 49, 50, 51, 52: that is 52 − 45 + 1 = **8** sizes, not 7. The teacher is **wrong** — subtracting the ends forgets to count one of them.",
        markScheme: [
          { point: "Forms {{15n >= 360 + 7n}} or {{8n >= 360}}", keywords: ["15n", "360 + 7n", "8n", "8n >= 360", "8n ≥ 360"] },
          { point: "Solves to n ≥ 45", keywords: ["n >= 45", "n ≥ 45", "45"] },
          { point: "Uses the seat limit to get {{45 <= n <= 52}}, with both ends included", keywords: ["52", "45 <= n <= 52", "45 ≤ n ≤ 52", "included"] },
          { point: "Counts 8 possible sizes, so the teacher is wrong", keywords: ["8", "eight", "wrong", "52 - 45 + 1", "52 − 45 + 1"] },
        ],
        commonError: "Counting the whole numbers from a to b as b − a. When both ends are included there are b − a + 1.",
        difficulty: "core",
        guideRef: "solving-inequalities",
        hints: [
          "Write the money coming in and the money going out, both in terms of n.",
          "'Not a loss' means money in ≥ money out. Collect the n-terms on one side.",
          "For (b), list the possible group sizes and count them.",
        ],
        strategy: "Consider extremes",
      },
      // ---------------------------------------------------------------- q17
      {
        kind: "short",
        id: "equations-p3-q17",
        question:
          "For a group activity, a class sits at identical tables. If 3 students sit at each table, 4 students have nowhere to sit. If instead 4 students sit at each table, 2 tables are left completely empty and every other table is full. How many students are in the class?",
        answer: { type: "number", value: 40 },
        traps: [
          { spec: { type: "number", value: 12 }, feedback: "12 is the number of tables. Now find the number of students: 3 × 12 + 4." },
          { spec: { type: "number", value: 22 }, feedback: "Check the bracket: 4 students at each of {{(t - 2)}} tables is {{4(t - 2) = 4t - 8}}, not {{4t - 2}}." },
        ],
        solution: [
          "Let t be the number of tables.",
          "With 3 per table: students = {{3t + 4}}.",
          "With 4 per table on {{t - 2}} tables: students = {{4(t - 2)}}.",
          "{{3t + 4 = 4(t - 2)}}, so {{3t + 4 = 4t - 8}}.",
          "Subtract 3t and add 8: t = 12.",
          "Students: 3 × 12 + 4 = 40. Check: 4 × (12 − 2) = 40 ✓",
        ],
        solutions: [
          {
            label: "Think about the change",
            steps: [
              "Switching from 3 per table to 4 per table, these students need new seats: the 4 who were standing and the 2 × 3 = 6 from the two tables that become empty. That is 10 students.",
              "Each table still in use takes exactly 1 extra student, so 10 tables are in use.",
              "So there are 12 tables and 3 × 12 + 4 = 40 students.",
            ],
          },
        ],
        commonError: "Writing 4t − 2 for 4 students on each of t − 2 tables. The 4 multiplies both terms.",
        difficulty: "challenge",
        guideRef: "unknowns-both-sides",
        hints: [
          "Choose what your letter stands for. The number of tables is a good choice.",
          "Write the number of students in two ways, one for each seating plan.",
          "With 2 tables empty, only {{t - 2}} tables are used. Solve {{3t + 4 = 4(t - 2)}}.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q18
      {
        kind: "short",
        id: "equations-p3-q18",
        question:
          "A jug holds 600 ml of orange drink, and 20% of it is pure orange juice. How many ml of pure orange juice must be added to make the drink 40% juice?",
        answer: { type: "number", value: 200, display: "200 ml" },
        traps: [
          { spec: { type: "number", value: 120 }, feedback: "Adding 120 ml doubles the juice to 240 ml, but the jug then holds 720 ml, and 240 ml is only {{1/3}} of 720 ml. The total grows as well!" },
        ],
        solution: [
          "Juice now: 20% of 600 = 120 ml. Add j ml of juice.",
          "New juice: {{120 + j}} ml. New total: {{600 + j}} ml.",
          "40% = {{2/5}}, so {{(120 + j)/(600 + j) = 2/5}}.",
          "Multiply both sides by {{5(600 + j)}}: {{5(120 + j) = 2(600 + j)}}, so {{600 + 5j = 1200 + 2j}}.",
          "{{3j = 600}}, so j = 200.",
          "Check: 320 ml of juice in 800 ml of drink, and {{320/800 = 2/5}} = 40% ✓",
        ],
        solutions: [
          {
            label: "Look for what doesn't change",
            steps: [
              "The non-juice part is 80% of 600 = 480 ml, and adding juice does not change it.",
              "In the new drink, the non-juice part must be 60% of the total.",
              "60% of the new total is 480 ml, so the new total is 480 ÷ 0.6 = 800 ml.",
              "So add 800 − 600 = 200 ml of juice.",
            ],
          },
        ],
        commonError: "Forgetting that adding juice also increases the total amount of drink.",
        difficulty: "challenge",
        guideRef: "fractional-equations",
        hints: [
          "How many ml of juice, and how many ml of everything else, are in the jug now?",
          "Adding juice changes both the juice and the total. Which amount stays the same?",
          "The 480 ml that isn't juice must become 60% of the new drink. What is the new total?",
        ],
        strategy: "Look for an invariant",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "written",
        id: "equations-p3-q19",
        question:
          "Priya's first three maths test scores (each out of 100) are 72, 85 and 64. She needs a mean of **at least** 75 over four tests for an A grade.\n\n**(a)** Form and solve an inequality to find the lowest score she needs in the fourth test.\n\n**(b)** Her friend says: \"If you score high enough in the fourth test, you could even get a mean of 85.\" Is the friend right? Explain.",
        marks: 3,
        modelAnswer:
          "(a) Let s be the fourth score. {{(72 + 85 + 64 + s)/4 >= 75}}, so {{(221 + s)/4 >= 75}}. Multiply by 4: {{221 + s >= 300}}, so {{s >= 79}}. She needs at least **79**.\n\n(b) A mean of 85 needs {{221 + s >= 340}}, so {{s >= 119}}. The test is out of 100, so this is impossible. Even a perfect 100 gives a mean of 321 ÷ 4 = 80.25. The friend is **wrong**.",
        markScheme: [
          { point: "Forms {{(221 + s)/4 >= 75}} or {{221 + s >= 300}}", keywords: ["221", "300", ">= 75", "≥ 75"] },
          { point: "Lowest score is 79", keywords: ["79", "s >= 79", "s ≥ 79", "at least 79"] },
          { point: "Shows a mean of 85 needs s ≥ 119 (or that the best possible mean is 80.25), so the friend is wrong", keywords: ["119", "80.25", "impossible", "wrong", "not possible"] },
        ],
        commonError: "Setting the total equal to 75 instead of the mean: the four scores must add up to at least 4 × 75 = 300.",
        difficulty: "core",
        guideRef: "solving-inequalities",
        hints: [
          "Mean = total ÷ 4. What total do the four scores need?",
          "Mean ≥ 75 means total ≥ 300. Subtract the 221 she already has.",
          "For (b), find the score needed for a mean of 85, then compare it with the highest possible score.",
        ],
        strategy: "Consider extremes",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "equations-p3-q20",
        question:
          "Aisha's route around Bishan Park is 7 km long. She jogs the first part at 8 km/h and walks the rest at 4 km/h. The whole route takes her 1 hour 15 minutes. How far does she jog, in km?",
        answer: { type: "number", value: 4, display: "4 km" },
        traps: [
          { spec: { type: "number", value: 3 }, feedback: "3 km is the distance she walks. The question asks how far she jogs." },
          { spec: { type: "number", value: 4.8 }, feedback: "1 hour 15 minutes is 1.25 hours, not 1.15 hours: 15 minutes is a quarter of an hour." },
        ],
        solution: [
          "Let her jog j km; then she walks {{(7 - j)}} km.",
          "Time = distance ÷ speed, and 1 hour 15 minutes = 1.25 hours: {{j/8 + (7 - j)/4 = 1.25}}.",
          "Multiply every term by 8: {{j + 2(7 - j) = 10}}.",
          "Expand: {{j + 14 - 2j = 10}}, so {{14 - j = 10}} and j = 4.",
          "Check: 4 ÷ 8 = 0.5 h jogging and 3 ÷ 4 = 0.75 h walking; total 1.25 h ✓",
        ],
        commonError: "Writing 1 hour 15 minutes as 1.15 hours.",
        difficulty: "challenge",
        guideRef: "fractional-equations",
        hints: [
          "If she jogs j km, how far does she walk?",
          "Write the time for each part using time = distance ÷ speed, then add the two times.",
          "Convert 1 hour 15 minutes to hours, then multiply every term by 8 to clear the fractions.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },

  // ===========================================================================
  // PRACTICE PAPER 4 — exam style
  // ===========================================================================
  {
    id: "equations-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      // ---------------------------------------------------------------- q01
      {
        kind: "short",
        id: "equations-p4-q01",
        question:
          "Solve each equation.\n\n**(a)** {{7x = -42}}\n\n**(b)** {{x/5 = -3}}\n\n**(c)** {{9 - x = 13}}\n\nGive your three answers in order (a), (b), (c), separated by commas.",
        answer: { type: "list", values: [-6, -15, -4], ordered: true, display: "−6, −15, −4" },
        traps: [
          { spec: { type: "list", values: [-6, -0.6, -4], ordered: true }, feedback: "For (b), undo ÷ 5 by *multiplying* by 5: x = −3 × 5 = −15." },
          { spec: { type: "list", values: [-6, -15, 4], ordered: true }, feedback: "For (c), 9 − x = 13 means x = 9 − 13 = −4. Check: 9 − (−4) = 13 ✓" },
        ],
        solution: [
          "(a) Divide both sides by 7: x = −42 ÷ 7 = −6.",
          "(b) Multiply both sides by 5: x = −3 × 5 = −15.",
          "(c) Add x to both sides: {{9 = 13 + x}}. Subtract 13: x = −4.",
          "Check (c): 9 − (−4) = 9 + 4 = 13 ✓",
        ],
        commonError: "In (c), thinking 9 − x = 13 gives x = 4. Subtracting a positive number from 9 can never give 13.",
        difficulty: "warmup",
        guideRef: "solving-equations",
        hints: [
          "Each one needs the inverse operation of what is being done to x.",
          "In (c), add x to both sides first so the x-term is positive.",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q02
      {
        kind: "short",
        id: "equations-p4-q02",
        question:
          "Number lines A and B each show an inequality. List all the integers that satisfy **both** inequalities. Separate them with commas.",
        diagram: `<svg viewBox="0 0 440 165" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number lines from negative 5 to 5. Line A has an open circle at negative 3 with an arrow going to the right. Line B has a filled circle at 2 with an arrow going to the left."><rect width="440" height="165" fill="#ffffff"/><text x="12" y="50" font-size="15" font-weight="bold" font-family="sans-serif" fill="#1f2937">A</text><line x1="32" y1="45" x2="418" y2="45" stroke="#1f2937" stroke-width="2"/><polygon points="26,45 38,39 38,51" fill="#1f2937"/><polygon points="424,45 412,39 412,51" fill="#1f2937"/><g stroke="#1f2937" stroke-width="1.5"><line x1="50" y1="39" x2="50" y2="51"/><line x1="85" y1="39" x2="85" y2="51"/><line x1="120" y1="39" x2="120" y2="51"/><line x1="155" y1="39" x2="155" y2="51"/><line x1="190" y1="39" x2="190" y2="51"/><line x1="225" y1="39" x2="225" y2="51"/><line x1="260" y1="39" x2="260" y2="51"/><line x1="295" y1="39" x2="295" y2="51"/><line x1="330" y1="39" x2="330" y2="51"/><line x1="365" y1="39" x2="365" y2="51"/><line x1="400" y1="39" x2="400" y2="51"/></g><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="50" y="70">−5</text><text x="85" y="70">−4</text><text x="120" y="70">−3</text><text x="155" y="70">−2</text><text x="190" y="70">−1</text><text x="225" y="70">0</text><text x="260" y="70">1</text><text x="295" y="70">2</text><text x="330" y="70">3</text><text x="365" y="70">4</text><text x="400" y="70">5</text></g><line x1="127" y1="45" x2="404" y2="45" stroke="#4338ca" stroke-width="5"/><polygon points="420,45 404,37 404,53" fill="#4338ca"/><circle cx="120" cy="45" r="7" fill="#ffffff" stroke="#4338ca" stroke-width="2.5"/><text x="12" y="130" font-size="15" font-weight="bold" font-family="sans-serif" fill="#1f2937">B</text><line x1="32" y1="125" x2="418" y2="125" stroke="#1f2937" stroke-width="2"/><polygon points="26,125 38,119 38,131" fill="#1f2937"/><polygon points="424,125 412,119 412,131" fill="#1f2937"/><g stroke="#1f2937" stroke-width="1.5"><line x1="50" y1="119" x2="50" y2="131"/><line x1="85" y1="119" x2="85" y2="131"/><line x1="120" y1="119" x2="120" y2="131"/><line x1="155" y1="119" x2="155" y2="131"/><line x1="190" y1="119" x2="190" y2="131"/><line x1="225" y1="119" x2="225" y2="131"/><line x1="260" y1="119" x2="260" y2="131"/><line x1="295" y1="119" x2="295" y2="131"/><line x1="330" y1="119" x2="330" y2="131"/><line x1="365" y1="119" x2="365" y2="131"/><line x1="400" y1="119" x2="400" y2="131"/></g><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="50" y="150">−5</text><text x="85" y="150">−4</text><text x="120" y="150">−3</text><text x="155" y="150">−2</text><text x="190" y="150">−1</text><text x="225" y="150">0</text><text x="260" y="150">1</text><text x="295" y="150">2</text><text x="330" y="150">3</text><text x="365" y="150">4</text><text x="400" y="150">5</text></g><line x1="295" y1="125" x2="46" y2="125" stroke="#4338ca" stroke-width="5"/><polygon points="30,125 46,117 46,133" fill="#4338ca"/><circle cx="295" cy="125" r="7" fill="#4338ca"/></svg>`,
        answer: { type: "list", values: [-2, -1, 0, 1, 2], display: "−2, −1, 0, 1, 2" },
        traps: [
          { spec: { type: "list", values: [-3, -2, -1, 0, 1, 2] }, feedback: "The circle at −3 on line A is open, so −3 is *not* included." },
          { spec: { type: "list", values: [-3, -2, -1, 0, 1] }, feedback: "Check both circles: the open circle at −3 leaves −3 out, but the filled circle at 2 means 2 *is* included." },
        ],
        solution: [
          "Line A: open circle at −3, arrow to the right, so {{x > -3}}.",
          "Line B: filled circle at 2, arrow to the left, so {{x <= 2}}.",
          "Both together: {{-3 < x <= 2}}.",
          "The integers are −2, −1, 0, 1, 2.",
        ],
        difficulty: "warmup",
        guideRef: "inequalities",
        hints: [
          "Write each number line as an inequality. Which circle is open and which is filled?",
          "An integer must lie on *both* shaded parts. Where do they overlap?",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q03
      {
        kind: "short",
        id: "equations-p4-q03",
        question: "Solve {{4(3 - x) = 20}}.",
        answer: { type: "number", value: -2 },
        traps: [
          { spec: { type: "number", value: -8 }, feedback: "Multiply *both* terms in the bracket by 4: {{4(3 - x) = 12 - 4x}}, not {{12 - x}}." },
          { spec: { type: "number", value: 2 }, feedback: "Check the sign: from {{3 - x = 5}}, x must be 3 − 5 = −2. Check: 4(3 − (−2)) = 4 × 5 = 20 ✓" },
        ],
        solution: [
          "Divide both sides by 4: {{3 - x = 5}}.",
          "Subtract 3 from both sides: {{-x = 2}}, so x = −2.",
          "Check: 4(3 − (−2)) = 4 × 5 = 20 ✓",
        ],
        solutions: [{ label: "Expand first", steps: ["{{12 - 4x = 20}}", "{{-4x = 8}}", "x = −2"] }],
        difficulty: "warmup",
        guideRef: "equations-with-brackets",
        hints: [
          "20 is a multiple of 4, so you can divide both sides by 4 first.",
          "From {{3 - x = 5}}: 3 take away what gives 5?",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q04
      {
        kind: "short",
        id: "equations-p4-q04",
        question: "Solve {{(5 - x)/2 = 6}}.",
        answer: { type: "number", value: -7 },
        traps: [
          { spec: { type: "number", value: 7 }, feedback: "Check the sign: {{5 - x = 12}} means x = 5 − 12 = −7. Check: (5 − (−7)) ÷ 2 = 6 ✓" },
          { spec: { type: "number", value: 2 }, feedback: "Undo ÷ 2 by *multiplying* both sides by 2: {{5 - x = 12}}, not 3." },
        ],
        solution: [
          "Multiply both sides by 2: {{5 - x = 12}}.",
          "Subtract 5 from both sides: {{-x = 7}}, so x = −7.",
          "Check: (5 − (−7)) ÷ 2 = 12 ÷ 2 = 6 ✓",
        ],
        difficulty: "warmup",
        guideRef: "fractional-equations",
        hints: [
          "What is the last thing done to {{5 - x}}? Undo that first.",
          "Multiply both sides by 2, then deal with the −x.",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q05
      {
        kind: "short",
        id: "equations-p4-q05",
        question:
          "A bus route only runs if **more than** 12 passengers book. The bus has 40 seats, so **at most** 40 passengers can travel. Write a two-sided inequality for the number of passengers, p, on a bus that runs. (You can type ≤ as <=.)",
        answer: {
          type: "text",
          accept: ["12<p<=40", "40>=p>12", "p>12andp<=40", "p<=40andp>12", "p>12,p<=40", "p<=40,p>12", "13<=p<=40", "40>=p>=13", "p>=13andp<=40", "p<=40andp>=13", "p>=13,p<=40", "p<=40,p>=13"],
          display: "{{12 < p <= 40}}",
        },
        traps: [
          { spec: { type: "text", accept: ["12<=p<=40"] }, feedback: "'More than 12' means exactly 12 passengers is not enough, so use < at the 12 end." },
          { spec: { type: "text", accept: ["12<p<40"] }, feedback: "'At most 40' includes 40 itself, so use ≤ at the 40 end." },
        ],
        solution: [
          "'More than 12': {{p > 12}}, so 12 is not included.",
          "'At most 40': {{p <= 40}}, so 40 is included.",
          "Together: {{12 < p <= 40}}.",
          "Because p is a whole number, {{13 <= p <= 40}} says the same thing.",
        ],
        difficulty: "warmup",
        guideRef: "inequalities",
        hints: [
          "Is exactly 12 passengers enough for the bus to run? Is exactly 40 allowed?",
          "Write each condition separately, then join them into one two-sided inequality with p in the middle.",
        ],
        strategy: "Consider extremes",
      },
      // ---------------------------------------------------------------- q06
      {
        kind: "short",
        id: "equations-p4-q06",
        question:
          "In triangle ABC, the side BC is extended to D. The angles are marked in the diagram. Find x, then use it to find the size of the exterior angle ACD. Give the size of angle ACD, in degrees, as your answer.",
        diagram: `<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with side BC extended to D. Angle A is (2x + 15) degrees, angle B is (x + 25) degrees, and the exterior angle ACD is (5x − 10) degrees."><rect width="420" height="250" fill="#ffffff"/><polygon points="50,220 290,220 204.27,36.15" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="290" y1="220" x2="400" y2="220" stroke="#1f2937" stroke-width="2"/><path d="M 76 220 A 26 26 0 0 0 66.71 200.08" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M 188.84 54.54 A 24 24 0 0 0 214.41 57.9" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M 314 220 A 24 24 0 0 0 279.86 198.25" fill="none" stroke="#1f2937" stroke-width="1.5"/><g font-size="14" font-family="sans-serif" fill="#1f2937"><text x="204" y="28" text-anchor="middle" font-weight="bold">A</text><text x="40" y="238" text-anchor="middle" font-weight="bold">B</text><text x="290" y="240" text-anchor="middle" font-weight="bold">C</text><text x="406" y="225" font-weight="bold">D</text></g><g font-size="13" font-family="sans-serif" fill="#1f2937"><text x="192" y="106" text-anchor="middle">(2x + 15)°</text><text x="118" y="212" text-anchor="middle">(x + 25)°</text><text x="318" y="200">(5x − 10)°</text></g></svg>`,
        answer: { type: "number", value: 115, display: "115°" },
        traps: [
          { spec: { type: "number", value: 25 }, feedback: "25 is x. Substitute it into {{5x - 10}} to find the exterior angle." },
          { spec: { type: "number", value: 83.75 }, feedback: "The exterior angle is not one of the three angles inside the triangle. It equals the sum of the two opposite interior angles: {{5x - 10 = (2x + 15) + (x + 25)}}." },
        ],
        solution: [
          "The exterior angle of a triangle equals the sum of the two interior angles opposite it.",
          "{{5x - 10 = (2x + 15) + (x + 25)}}, so {{5x - 10 = 3x + 40}}.",
          "Subtract 3x and add 10: {{2x = 50}}, so x = 25.",
          "Exterior angle ACD = 5 × 25 − 10 = 115°.",
          "Check: angle A = 65° and angle B = 50°, and 65 + 50 = 115 ✓",
        ],
        solutions: [
          {
            label: "Use angles on a straight line",
            steps: [
              "Angle ACB = {{180 - (5x - 10) = 190 - 5x}} (angles on a straight line).",
              "Angles in triangle ABC: {{(2x + 15) + (x + 25) + (190 - 5x) = 180}}.",
              "{{230 - 2x = 180}}, so x = 25 and ACD = 115°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "forming-equations",
        hints: [
          "What angle fact links an exterior angle of a triangle to the angles inside it?",
          "The exterior angle equals the sum of the two interior opposite angles. Write that as an equation.",
          "Solve {{5x - 10 = 3x + 40}}, then substitute x into {{5x - 10}}.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q07
      {
        kind: "short",
        id: "equations-p4-q07",
        question:
          "The square and the equilateral triangle below have the same perimeter. Each side of the square is {{(x + 3)}} cm and each side of the triangle is {{(2x - 1)}} cm. Find this shared perimeter, in cm.",
        diagram: `<svg viewBox="0 0 400 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square with each side (x + 3) cm and an equilateral triangle with each side (2x − 1) cm. Single tick marks show the four equal sides of the square; double tick marks show the three equal sides of the triangle."><rect width="400" height="215" fill="#ffffff"/><rect x="40" y="60" width="105" height="105" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><g fill="none" stroke="#1f2937" stroke-width="1.2"><polyline points="40,70 50,70 50,60"/><polyline points="135,60 135,70 145,70"/><polyline points="40,155 50,155 50,165"/><polyline points="135,165 135,155 145,155"/></g><g stroke="#1f2937" stroke-width="1.5"><line x1="92.5" y1="54" x2="92.5" y2="66"/><line x1="92.5" y1="159" x2="92.5" y2="171"/><line x1="34" y1="112.5" x2="46" y2="112.5"/><line x1="139" y1="112.5" x2="151" y2="112.5"/></g><polygon points="200,170 340,170 270,48.76" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><g stroke="#1f2937" stroke-width="1.5"><line x1="266" y1="164" x2="266" y2="176"/><line x1="274" y1="164" x2="274" y2="176"/><line x1="228.67" y1="110.34" x2="237.33" y2="115.34"/><line x1="232.67" y1="103.42" x2="241.33" y2="108.42"/><line x1="302.67" y1="115.34" x2="311.33" y2="110.34"/><line x1="298.67" y1="108.42" x2="307.33" y2="103.42"/></g><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="92.5" y="192">(x + 3) cm</text><text x="270" y="195">(2x − 1) cm</text></g></svg>`,
        answer: { type: "number", value: 42, display: "42 cm" },
        traps: [
          { spec: { type: "number", value: 7.5 }, feedback: "7.5 is x. Now find a side length and multiply by the number of sides." },
          { spec: { type: "number", value: 28 }, feedback: "The *perimeters* are equal, not the sides. The square has 4 sides and the triangle has 3: {{4(x + 3) = 3(2x - 1)}}." },
        ],
        solution: [
          "Square perimeter: {{4(x + 3) = 4x + 12}}.",
          "Triangle perimeter: {{3(2x - 1) = 6x - 3}}.",
          "Equal perimeters: {{4x + 12 = 6x - 3}}.",
          "Subtract 4x and add 3: {{15 = 2x}}, so x = 7.5.",
          "Square side 7.5 + 3 = 10.5 cm, perimeter 4 × 10.5 = 42 cm. Triangle side 2 × 7.5 − 1 = 14 cm, perimeter 3 × 14 = 42 cm ✓",
        ],
        commonError: "Setting the side lengths equal ({{x + 3 = 2x - 1}}) instead of the perimeters.",
        difficulty: "core",
        guideRef: "unknowns-both-sides",
        hints: [
          "Write each perimeter as an expression with a bracket.",
          "Set {{4(x + 3)}} equal to {{3(2x - 1)}} and expand both sides.",
          "Collect the x-terms on the side with 6x, then substitute x back to find a perimeter.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q08
      {
        kind: "written",
        id: "equations-p4-q08",
        question:
          "Hana writes these two statements.\n\n**Statement 1:** \"x > 2 and x < 5\" can be written as {{2 < x < 5}}.\n\n**Statement 2:** \"x < 2 or x > 5\" can be written as {{5 < x < 2}}.\n\nIs each statement correct? Explain your answers. You may sketch number lines to help.",
        marks: 3,
        modelAnswer:
          "**Statement 1 is correct.** x must be bigger than 2 *and* smaller than 5 at the same time, so x lies between 2 and 5. On a number line this is one piece, with open circles at 2 and 5.\n\n**Statement 2 is wrong.** {{5 < x < 2}} means x is greater than 5 *and* less than 2 at the same time. No number can do both (it would also say 5 < 2, which is false). The values x < 2 or x > 5 form **two separate pieces** on the number line, pointing away from each other, so they cannot be written as one two-sided inequality. They must stay as \"x < 2 or x > 5\".",
        markScheme: [
          { point: "Statement 1 is correct: x lies between 2 and 5 (both conditions at once)", keywords: ["correct", "right", "between", "2 < x < 5", "true"] },
          { point: "Statement 2 is wrong: {{5 < x < 2}} needs x > 5 and x < 2 at the same time, which is impossible", keywords: ["impossible", "5 < 2", "no number", "same time", "wrong", "false"] },
          { point: "The 'or' solution is two separate pieces, so it must stay as two inequalities", keywords: ["two", "separate", "or", "two parts", "two pieces"] },
        ],
        commonError: "Thinking any two inequalities can be squashed into one 'a < x < b' statement. That only works for 'and' (one piece between two numbers).",
        difficulty: "core",
        guideRef: "inequalities",
        hints: [
          "Test some numbers. Does x = 3 fit Statement 1? Can you find *any* number that fits {{5 < x < 2}}?",
          "{{a < x < b}} means x > a **and** x < b, both at the same time.",
          "Sketch x < 2 or x > 5 on a number line. Is it one piece or two?",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q09
      {
        kind: "short",
        id: "equations-p4-q09",
        question:
          "The table shows some values of y for two equations, {{x + y = 7}} and {{2x - y = 5}}.\n\n| x | 0 | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|---|\n| y from {{x + y = 7}} | 7 | 6 | 5 | 4 | 3 | 2 |\n| y from {{2x - y = 5}} | −5 | −3 | −1 | 1 | 3 | 5 |\n\nFind the pair of values (x, y) that satisfies **both** equations at the same time. Give x first, then y.",
        answer: { type: "list", values: [4, 3], ordered: true, display: "x = 4, y = 3" },
        traps: [
          { spec: { type: "list", values: [3, 4], ordered: true }, feedback: "x first, then y: x = 4 and y = 3." },
          { spec: { type: "list", values: [3, 1], ordered: true }, feedback: "(3, 1) fits {{2x - y = 5}}, but 3 + 1 = 4, not 7. Look for a column where *both* rows give the same y." },
        ],
        solution: [
          "A solution pair must make *both* equations true, so look for a column where the two rows give the same y.",
          "When x = 4, both rows give y = 3.",
          "Check: 4 + 3 = 7 ✓ and 2 × 4 − 3 = 5 ✓",
          "Algebra agrees: adding the two equations gives {{3x = 12}}, so x = 4, and then y = 7 − 4 = 3.",
        ],
        difficulty: "core",
        guideRef: "simultaneous-equations",
        hints: [
          "What does it mean for (x, y) to satisfy both equations?",
          "Run along the table and look for a column where the two y-values match.",
          "Check your pair in both equations.",
        ],
        strategy: "Eliminate options",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "equations-p4-q10",
        question:
          "One-third of Mr Tan's age 5 years ago is equal to one-quarter of his age in 9 years' time. Form and solve an equation to find Mr Tan's age now.",
        answer: { type: "number", value: 47, display: "47 years old" },
        traps: [
          { spec: { type: "number", value: 14 }, feedback: "14 is the value of *each side* (a third of 42). It also comes from not multiplying out the brackets: {{4(a - 5) = 4a - 20}} and {{3(a + 9) = 3a + 27}}, not 4a − 5 and 3a + 9. Find a, his age now." },
          { spec: { type: "number", value: -51 }, feedback: "Multiplying both sides by 12 gives {{4(a - 5) = 3(a + 9)}}: the 4 goes on the left because 12 ÷ 3 = 4." },
        ],
        solution: [
          "Let Mr Tan be a years old now.",
          "{{(a - 5)/3 = (a + 9)/4}}.",
          "Multiply both sides by 12: {{4(a - 5) = 3(a + 9)}}.",
          "Expand: {{4a - 20 = 3a + 27}}.",
          "Subtract 3a and add 20: a = 47.",
          "Check: 5 years ago he was 42, and {{1/3}} of 42 is 14. In 9 years he will be 56, and {{1/4}} of 56 is 14 ✓",
        ],
        difficulty: "core",
        guideRef: "fractional-equations",
        hints: [
          "Use a for his age now. Write his age 5 years ago and his age in 9 years' time.",
          "'One-third of' means divide by 3: {{(a - 5)/3}}. Do the same for the other side.",
          "Multiply both sides by 12 to clear both fractions, then expand the brackets.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "written",
        id: "equations-p4-q11",
        question:
          "Arjun looks at the equation {{x/3 + x/4 = x/2}} and says:\n\n\"{{1/3 + 1/4}} is not equal to {{1/2}}, so this equation has no solution.\"\n\nIs Arjun right? Solve the equation to decide, and explain.",
        marks: 3,
        modelAnswer:
          "Multiply every term by 12 (the LCM of 3, 4 and 2): {{4x + 3x = 6x}}, so {{7x = 6x}}. Subtract 6x from both sides: **x = 0**.\n\nCheck: {{0/3 + 0/4 = 0}} and {{0/2 = 0}} ✓\n\nSo Arjun is **wrong**: the equation has exactly one solution, x = 0. He is right that {{1/3 + 1/4 = 7/12}}, which is not {{1/2}}, so no *other* value works. But when x = 0 both sides are 0, whatever the fractions are.",
        markScheme: [
          { point: "Clears the fractions correctly to get {{7x = 6x}} (or {{7/12 x = 1/2 x}})", keywords: ["12", "7x = 6x", "4x + 3x", "7x/12", "7/12"] },
          { point: "Solves to x = 0", keywords: ["x = 0", "x=0", "0"] },
          { point: "Concludes Arjun is wrong: x = 0 is a solution (the only one), with a check", keywords: ["wrong", "not right", "one solution", "zero", "both sides are 0", "both sides 0"] },
        ],
        commonError: "Dividing both sides of {{7x = 6x}} by x to get 7 = 6. Dividing by x throws away the solution x = 0.",
        difficulty: "core",
        guideRef: "fractional-equations",
        hints: [
          "Multiply every term by 12 to clear the fractions.",
          "You should get {{7x = 6x}}. Don't divide by x; subtract 6x from both sides instead.",
          "Is there a number that makes 7x and 6x equal?",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "short",
        id: "equations-p4-q12",
        question:
          "Solve {{-5 < 2x + 3 <= 11}}. Then list every integer value of x that satisfies it, separated by commas.",
        answer: { type: "list", values: [-3, -2, -1, 0, 1, 2, 3, 4], display: "−3, −2, −1, 0, 1, 2, 3, 4" },
        traps: [
          { spec: { type: "list", values: [-4, -3, -2, -1, 0, 1, 2, 3, 4] }, feedback: "x = −4 gives 2x + 3 = −5, and −5 is *not* greater than −5. Leave −4 out." },
          { spec: { type: "list", values: [-4, -3, -2, -1, 0, 1, 2, 3] }, feedback: "Check both ends: x = −4 gives −5 (not allowed, the sign is strict <), but x = 4 gives 11 (allowed, the sign is ≤)." },
        ],
        solution: [
          "Do the same thing to all three parts. Subtract 3: {{-8 < 2x <= 8}}.",
          "Divide all three parts by 2: {{-4 < x <= 4}}.",
          "−4 is not included (strict <); 4 is included (≤).",
          "Integers: −3, −2, −1, 0, 1, 2, 3, 4 (eight values).",
        ],
        commonError: "Subtracting 3 from the middle part only. Every step must be done to all three parts.",
        difficulty: "core",
        guideRef: "solving-inequalities",
        hints: [
          "Treat it like solving an equation, but do each step to all three parts.",
          "Subtract 3 from all three parts, then divide all three by 2.",
          "Check the ends: which of −4 and 4 is allowed?",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "written",
        id: "equations-p4-q13",
        question:
          "Jun and Marcus both try to solve {{10 - 2(x - 3) = 4}}.\n\nJun writes:\n\n    10 − 2x − 6 = 4\n    4 − 2x = 4\n    x = 0\n\nMarcus starts with:\n\n    8(x − 3) = 4\n\n**(a)** Explain the mistake in Jun's first line.\n\n**(b)** Explain why Marcus's first line is wrong.\n\n**(c)** Solve the equation correctly.",
        marks: 3,
        modelAnswer:
          "(a) Jun worked out (−2) × (−3) as −6, but a negative times a negative is positive: (−2) × (−3) = +6. His first line should be {{10 - 2x + 6 = 4}}.\n\n(b) Marcus did 10 − 2 first, but the 2 is multiplying the bracket. Multiplication comes before subtraction, so the 2 cannot be taken away from the 10 first. (His version gives x = 3.5, and 10 − 2(3.5 − 3) = 9, not 4.)\n\n(c) {{10 - 2x + 6 = 4}}, so {{16 - 2x = 4}}. Subtract 16: {{-2x = -12}}, so **x = 6**. Check: 10 − 2(6 − 3) = 10 − 6 = 4 ✓",
        markScheme: [
          { point: "Jun: (−2) × (−3) should be +6, not −6", keywords: ["+6", "+ 6", "positive", "negative times a negative", "minus times minus", "sign"] },
          { point: "Marcus: the 2 multiplies the bracket, so 10 − 2 cannot be done first (order of operations)", keywords: ["order of operations", "bidmas", "bodmas", "multiply first", "multiplication", "multiplying the bracket", "cannot subtract", "can't subtract"] },
          { point: "Correct solution x = 6", keywords: ["x = 6", "x=6", "16 - 2x", "16 − 2x", "6"] },
        ],
        difficulty: "core",
        guideRef: "equations-with-brackets",
        hints: [
          "In Jun's first line, what is (−2) × (−3)?",
          "In Marcus's line, which comes first: the subtraction 10 − 2, or the 2 multiplying the bracket?",
          "Expand carefully: {{-2(x - 3) = -2x + 6}}. Then collect the numbers.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q14
      {
        kind: "short",
        id: "equations-p4-q14",
        question:
          "The mean of the three numbers {{2x + 1}}, {{x + 7}} and {{3x - 2}} is 12. Find x. For your answer, give just the three numbers, in the order listed, separated by commas.",
        answer: { type: "list", values: [11, 12, 13], ordered: true, display: "11, 12, 13" },
        traps: [
          { spec: { type: "list", values: [3, 8, 1], ordered: true }, feedback: "The *mean* is 12, so the *total* is 3 × 12 = 36. You set the total equal to 12." },
        ],
        solution: [
          "Total: {{(2x + 1) + (x + 7) + (3x - 2) = 6x + 6}}.",
          "Mean = total ÷ 3, so {{(6x + 6)/3 = 12}}, which gives {{6x + 6 = 36}}.",
          "{{6x = 30}}, so x = 5.",
          "The numbers: 2 × 5 + 1 = 11, 5 + 7 = 12 and 3 × 5 − 2 = 13.",
          "Check: (11 + 12 + 13) ÷ 3 = 36 ÷ 3 = 12 ✓",
        ],
        difficulty: "core",
        guideRef: "forming-equations",
        hints: [
          "Mean = total ÷ how many. What must the total of the three numbers be?",
          "Add the three expressions and simplify.",
          "Solve {{6x + 6 = 36}}, then substitute x into each expression.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "equations-p4-q15",
        question:
          "For which value of x are the expressions {{5 - 3x}} and {{2(x + 10)}} equal? Give the value of x first, then the value that both expressions take, separated by a comma.",
        answer: { type: "list", values: [-3, 14], ordered: true, display: "x = −3; both expressions equal 14" },
        traps: [
          { spec: { type: "list", values: [3, -4], ordered: true }, feedback: "From {{-15 = 5x}}, x = −15 ÷ 5 = −3, not 3." },
          { spec: { type: "list", values: [-1, 8], ordered: true }, feedback: "Expand fully: {{2(x + 10) = 2x + 20}}, not 2x + 10. Then check that both expressions really give the same value." },
          { spec: { type: "list", values: [14, -3], ordered: true }, feedback: "Right numbers, wrong order: give x first (−3), then the value both expressions take (14)." },
        ],
        solution: [
          "Set them equal: {{5 - 3x = 2(x + 10)}}.",
          "Expand: {{5 - 3x = 2x + 20}}.",
          "Add 3x to both sides: {{5 = 5x + 20}}.",
          "Subtract 20: {{-15 = 5x}}, so x = −3.",
          "Values: 5 − 3 × (−3) = 5 + 9 = 14 and 2(−3 + 10) = 2 × 7 = 14 ✓",
        ],
        difficulty: "core",
        guideRef: "unknowns-both-sides",
        hints: [
          "'Equal' means you can write an equation with one expression on each side.",
          "Expand the bracket, then add 3x to both sides so the x-term is positive.",
          "Once you have x, substitute it into *both* expressions to check they match.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "short",
        id: "equations-p4-q16",
        question:
          "The trapezium has parallel sides of {{(x + 3)}} cm and {{(2x + 3)}} cm, and a height of 8 cm. Its area is 96 cm². Using area = {{1/2 (a + b) h}}, find the length of the longer parallel side, in cm.",
        diagram: `<svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A trapezium with a top side of (x + 3) cm, a bottom side of (2x + 3) cm, and a perpendicular height of 8 cm"><rect width="380" height="220" fill="#ffffff"/><polygon points="70,185 310,185 262,57 118,57" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="118" y1="57" x2="118" y2="185" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><polyline points="118,173 130,173 130,185" fill="none" stroke="#334155" stroke-width="1.2"/><g fill="none" stroke="#1f2937" stroke-width="1.5"><polyline points="186,52 192,57 186,62"/><polyline points="186,180 192,185 186,190"/></g><g font-size="13" font-family="sans-serif" fill="#1f2937"><text x="190" y="47" text-anchor="middle">(x + 3) cm</text><text x="190" y="207" text-anchor="middle">(2x + 3) cm</text><text x="126" y="125">8 cm</text></g></svg>`,
        answer: { type: "number", value: 15, display: "15 cm" },
        traps: [
          { spec: { type: "number", value: 6 }, feedback: "6 is x. Substitute it into {{2x + 3}} to find the longer side." },
          { spec: { type: "number", value: 7 }, feedback: "Did you leave out the {{1/2}} in the area formula? The area is half of (sum of parallel sides) × height." },
          { spec: { type: "number", value: 9 }, feedback: "9 cm is the shorter parallel side, {{x + 3}}. The longer one is {{2x + 3}}." },
        ],
        solution: [
          "Sum of the parallel sides: {{(x + 3) + (2x + 3) = 3x + 6}}.",
          "Area: {{1/2 (3x + 6) * 8 = 96}}, so {{4(3x + 6) = 96}}.",
          "Divide by 4: {{3x + 6 = 24}}, so {{3x = 18}} and x = 6.",
          "Parallel sides: 6 + 3 = 9 cm and 2 × 6 + 3 = 15 cm. The longer is 15 cm.",
          "Check: {{1/2}} × (9 + 15) × 8 = 12 × 8 = 96 cm² ✓",
        ],
        commonError: "Forgetting the {{1/2}} in the trapezium area formula.",
        difficulty: "core",
        guideRef: "equations-with-brackets",
        hints: [
          "Add the two parallel sides first and simplify.",
          "Half of 8 is 4, so the equation becomes {{4(3x + 6) = 96}}.",
          "Divide both sides by 4, solve for x, then work out both parallel sides.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q17
      {
        kind: "short",
        id: "equations-p4-q17",
        question:
          "Priya and Marcus each have some stickers. If Priya gives Marcus 10 stickers, they will have the same number. If instead Marcus gives Priya 10 stickers, Priya will have three times as many as Marcus. How many stickers does Priya have?",
        answer: { type: "number", value: 50 },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "30 is how many Marcus has. Priya has 20 more than him." },
          { spec: { type: "number", value: 35 }, feedback: "If giving away 10 makes them equal, Priya has 20 more than Marcus, not 10 more: she loses 10 *and* he gains 10." },
        ],
        solution: [
          "Let Marcus have m stickers.",
          "After Priya gives him 10 they are equal, so Priya has 20 more than Marcus: {{m + 20}}.",
          "If Marcus gives Priya 10: Priya has {{m + 30}} and Marcus has {{m - 10}}.",
          "{{m + 30 = 3(m - 10)}}, so {{m + 30 = 3m - 30}}.",
          "{{60 = 2m}}, so m = 30 and Priya has 30 + 20 = 50.",
          "Check: 40 and 40 ✓; then 60 and 20, and 60 = 3 × 20 ✓",
        ],
        commonError: "Thinking Priya has 10 more than Marcus. Moving 10 stickers from one person to the other changes the gap by 20.",
        difficulty: "challenge",
        guideRef: "forming-equations",
        hints: [
          "The first fact tells you the *difference* between their numbers. Is the gap 10 or 20?",
          "Use one letter: if Marcus has m, Priya has {{m + 20}}.",
          "After Marcus gives 10: Priya has {{m + 30}} and Marcus has {{m - 10}}. Now form the equation.",
        ],
        strategy: "Look for an invariant",
      },
      // ---------------------------------------------------------------- q18
      {
        kind: "written",
        id: "equations-p4-q18",
        question:
          "Ravi is solving this pair of inequalities:\n\n{{2x + 3 < 11}} and {{3x - 1 > 2}}\n\nHe says: \"The only numbers that work are x = 2 and x = 3.\"\n\n**(a)** Solve each inequality and combine the results into one statement.\n\n**(b)** Is Ravi right? Explain carefully.",
        marks: 3,
        modelAnswer:
          "(a) {{2x + 3 < 11}} gives {{2x < 8}}, so x < 4. {{3x - 1 > 2}} gives {{3x > 3}}, so x > 1. Together: {{1 < x < 4}}.\n\n(b) Ravi is only partly right. If x has to be an **integer**, the solutions are 2 and 3 (1 and 4 are not included, because both signs are strict). But nothing says x must be an integer, so *every* number between 1 and 4 works. For example, x = 2.5: 2 × 2.5 + 3 = 8 < 11 ✓ and 3 × 2.5 − 1 = 6.5 > 2 ✓. There are infinitely many solutions.",
        markScheme: [
          { point: "Solves both inequalities: x < 4 and x > 1", keywords: ["x < 4", "x > 1", "2x < 8", "3x > 3"] },
          { point: "Combines them to {{1 < x < 4}}", keywords: ["1 < x < 4", "between 1 and 4"] },
          { point: "Explains Ravi is only right if x is an integer; non-integers such as 2.5 also work, so there are infinitely many solutions", keywords: ["integer", "whole number", "2.5", "1.5", "decimal", "infinitely many", "fraction"] },
        ],
        commonError: "Assuming the solutions of an inequality must be whole numbers.",
        difficulty: "core",
        guideRef: "solving-inequalities",
        hints: [
          "Solve each inequality on its own first.",
          "x must satisfy both at once. Write that as one two-sided inequality.",
          "Does the question say x must be a whole number? Try x = 2.5 in both inequalities.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "short",
        id: "equations-p4-q19",
        question:
          "A two-digit number has digits that add up to 11. When its digits are swapped, the new number is 27 more than the original number. What is the original number?",
        answer: { type: "number", value: 47 },
        traps: [
          { spec: { type: "number", value: 74 }, feedback: "74 is the new number after the digits are swapped. The original is 27 less." },
        ],
        solution: [
          "Let the tens digit be a and the units digit be b. The number is {{10a + b}}; swapped, it is {{10b + a}}.",
          "Digit sum: {{a + b = 11}}.",
          "Swapping: {{(10b + a) - (10a + b) = 27}}, so {{9b - 9a = 27}} and {{b - a = 3}}.",
          "Add {{a + b = 11}} and {{b - a = 3}}: {{2b = 14}}, so b = 7 and a = 4.",
          "The number is 47. Check: 4 + 7 = 11 and 74 − 47 = 27 ✓",
        ],
        solutions: [
          {
            label: "Try small cases",
            steps: [
              "Two-digit numbers with digit sum 11: 29, 38, 47, 56, 65, 74, 83, 92.",
              "Swapping the digits changes the number by 9 × (the difference between the digits), so the units digit must be 3 more than the tens digit.",
              "Only 47 works: 74 − 47 = 27.",
            ],
          },
        ],
        commonError: "Writing the number as a + b or ab. A number with tens digit a and units digit b is worth {{10a + b}}.",
        difficulty: "challenge",
        guideRef: "simultaneous-equations",
        hints: [
          "A two-digit number with tens digit a and units digit b is worth {{10a + b}}, not a + b.",
          "Write the swapped number the same way, then subtract the original.",
          "You should reach {{b - a = 3}}. Combine it with {{a + b = 11}}.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "equations-p4-q20",
        question:
          "Siti thinks of a whole number. She doubles it, subtracts 7, then halves the result. Her final answer is more than 10 but at most 15. How many different whole numbers could she have started with?",
        answer: { type: "number", value: 5 },
        traps: [
          { spec: { type: "number", value: 3 }, feedback: "Multiply *all three* parts by 2: {{20 < 2n - 7 <= 30}}, not {{10 < 2n - 7 <= 15}}." },
          { spec: { type: "number", value: 6 }, feedback: "Check the ends: starting with 13 gives 9.5 (too small) and 19 gives 15.5 (too big). Only 14 to 18 work." },
        ],
        solution: [
          "Let the starting number be n. Her final answer is {{(2n - 7)/2}}.",
          "{{10 < (2n - 7)/2 <= 15}}.",
          "Multiply all three parts by 2: {{20 < 2n - 7 <= 30}}.",
          "Add 7: {{27 < 2n <= 37}}.",
          "Divide by 2: {{13.5 < n <= 18.5}}.",
          "Whole numbers: 14, 15, 16, 17, 18, so there are 5. Check: 14 gives 10.5 ✓ and 18 gives 14.5 ✓, but 13 gives 9.5 ✗ and 19 gives 15.5 ✗.",
        ],
        commonError: "Doing an operation to the middle part of a two-sided inequality but not to both ends.",
        difficulty: "challenge",
        guideRef: "solving-inequalities",
        hints: [
          "Write Siti's final answer as an expression in n.",
          "Form a two-sided inequality, then undo each step, doing the same to all three parts.",
          "You should reach {{13.5 < n <= 18.5}}. Which whole numbers fit?",
        ],
        strategy: "Work backwards",
      },
    ],
  },
];
