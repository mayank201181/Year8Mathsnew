import type { Challenge } from "../types";

/**
 * AoPS-style challenge problems.
 *
 * The Art of Problem Solving method: students wrestle with a rich, non-routine
 * problem first, then reveal HINTS one at a time (productive struggle, not
 * surrender), and only afterwards study a full solution. Each problem names a
 * transferable "insight" — the problem-solving idea worth carrying forward.
 */
export const challenges: Challenge[] = [
  {
    unitId: "integers-powers",
    problem:
      "Without a calculator, what is the units (last) digit of 7²⁰²⁵?",
    hints: [
      "You cannot work out the whole number, so look for a pattern in the last digit instead.",
      "Find the units digit of 7¹, 7², 7³, 7⁴, 7⁵ … List just the last digits.",
      "The last digits repeat in a cycle: 7, 9, 3, 1, 7, 9, 3, 1, … of length 4. Where does the 2025th term land in the cycle?",
    ],
    solution: [
      "The units digits go 7, 9, 3, 1 and then repeat every 4 powers.",
      "Divide the exponent by the cycle length: 2025 ÷ 4 = 506 remainder 1.",
      "A remainder of 1 means we are at the 1st position in the cycle, which is 7.",
      "So 7²⁰²⁵ ends in the digit 7.",
    ],
    insight:
      "When a number is too big to compute, hunt for a repeating pattern and use the remainder (modular thinking) to jump straight to the answer.",
  },
  {
    unitId: "factors-multiples",
    problem:
      "A lighthouse flashes every 12 seconds, a buoy every 18 seconds, and a bell rings every 30 seconds. They all signal together at 8:00:00. When is the next time all three signal together?",
    hints: [
      "They coincide on a time that is a multiple of all three intervals. What kind of number is that?",
      "You need the LCM of 12, 18 and 30. Try prime factorisation of each.",
      "12 = 2² × 3, 18 = 2 × 3², 30 = 2 × 3 × 5. Take the highest power of every prime that appears.",
    ],
    solution: [
      "LCM = 2² × 3² × 5 = 4 × 9 × 5 = 180.",
      "So all three signal together every 180 seconds = 3 minutes.",
      "Next simultaneous signal is at 8:03:00.",
    ],
    insight:
      "'Events happening together again' is almost always an LCM problem; prime factorisation makes the LCM reliable.",
  },
  {
    unitId: "fractions",
    problem:
      "Maya spends ⅓ of her money on a book and ¼ of what is left on a snack. She has £9 remaining. How much did she start with?",
    hints: [
      "'¼ of what is LEFT' is the key — the snack is a fraction of the remainder, not of the original.",
      "After the book she has ⅔ of her money left. The snack takes ¼ of that ⅔. What fraction of the original is left after both?",
      "Working backwards is cleaner: £9 is ¾ of the money left after the book. Find that amount first, then undo the book.",
    ],
    solution: [
      "After buying the snack she keeps ¾ of the post-book money, and that equals £9.",
      "Post-book money = 9 ÷ ¾ = £12. This is the ⅔ that remained after the book.",
      "Original = 12 ÷ ⅔ = £18.",
      "Check: book ⅓ of 18 = £6 (leaves £12); snack ¼ of 12 = £3 (leaves £9). ✓",
    ],
    insight:
      "Read fractions carefully — 'of what is left' resets the whole. Working backwards from the known final amount often beats working forwards.",
  },
  {
    unitId: "percentages",
    problem:
      "A jacket's price is increased by 20%, then in a sale the new price is reduced by 20%. Is the final price more than, less than, or equal to the original? By what percentage does it change overall?",
    hints: [
      "Don't trust your gut that +20% then −20% cancels. Pick a friendly starting number like £100 and follow it through.",
      "Use multipliers: increase is × 1.2 and decrease is × 0.8. What is 1.2 × 0.8?",
      "Compare the combined multiplier with 1. If it is below 1, the price fell.",
    ],
    solution: [
      "Combined multiplier = 1.2 × 0.8 = 0.96.",
      "Starting from £100 → £120 → £96.",
      "0.96 is a 4% decrease, so the final price is 4% LESS than the original.",
      "The percentages do not cancel because the 20% reduction is taken from the larger amount.",
    ],
    insight:
      "Successive percentage changes multiply, not add. A multiplier under 1 means an overall fall.",
  },
  {
    unitId: "ratio-proportion",
    problem:
      "The ratio of boys to girls in a class is 4 : 5. After 3 more boys join, the ratio becomes 1 : 1. How many girls are in the class?",
    hints: [
      "Let each 'part' be the same unknown size. Write the numbers of boys and girls in terms of that part.",
      "Say there are 4n boys and 5n girls. Adding 3 boys makes them equal to the girls.",
      "Form an equation: 4n + 3 = 5n. Solve for n, then find the number of girls.",
    ],
    solution: [
      "Let boys = 4n and girls = 5n.",
      "After 3 boys join: 4n + 3 = 5n.",
      "So 3 = n, giving n = 3.",
      "Girls = 5n = 5 × 3 = 15.",
    ],
    insight:
      "Turn a ratio into algebra by giving every part a shared variable; a change in one quantity becomes a solvable equation.",
  },
  {
    unitId: "expressions",
    problem:
      "Find a quick way to add the whole numbers from 1 to 100. (Gauss famously did this in seconds as a child.)",
    hints: [
      "Adding them one at a time is slow. Could pairing the numbers cleverly help?",
      "Pair the first with the last: 1 + 100. Then 2 + 99, then 3 + 98. What is each pair's total?",
      "Every pair makes 101. How many such pairs are there in the numbers 1 to 100?",
    ],
    solution: [
      "Pairing 1+100, 2+99, 3+98, … each pair sums to 101.",
      "There are 100 numbers, so 50 pairs.",
      "Total = 50 × 101 = 5050.",
      "In general, 1 + 2 + … + n = n(n + 1) ÷ 2.",
    ],
    insight:
      "Look for symmetry and structure before grinding. A smart pairing can replace 100 additions with a single multiplication.",
  },
  {
    unitId: "equations",
    problem:
      "I think of a number, double it, add 7, and the result is the same as subtracting the number from 25. What is my number?",
    hints: [
      "Choose a letter for the unknown number and translate each phrase into algebra, in order.",
      "'Double it, add 7' gives 2x + 7. 'Subtract the number from 25' gives 25 − x.",
      "These two expressions are equal. Solve 2x + 7 = 25 − x.",
    ],
    solution: [
      "2x + 7 = 25 − x.",
      "Add x to both sides: 3x + 7 = 25.",
      "Subtract 7: 3x = 18, so x = 6.",
      "Check: double 6 add 7 = 19; and 25 − 6 = 19. ✓",
    ],
    insight:
      "'Subtract the number FROM 25' means 25 − x, not x − 25. Precise translation of words into symbols is half the battle.",
  },
  {
    unitId: "sequences-graphs",
    problem:
      "A pattern of squares uses 4 matchsticks for 1 square, 7 for 2 squares in a row, 10 for 3 squares. How many matchsticks are needed for 50 squares, and could a pattern ever use exactly 100 matchsticks?",
    hints: [
      "Find the nth-term rule for the number of matchsticks. What is the common difference?",
      "The sequence 4, 7, 10, … goes up by 3, so the rule starts with 3n. Adjust to fit.",
      "For the second part, set your rule equal to 100 and see whether n comes out as a whole number.",
    ],
    solution: [
      "Rule: 3n + 1 matchsticks for n squares.",
      "For 50 squares: 3 × 50 + 1 = 151 matchsticks.",
      "Set 3n + 1 = 100 → 3n = 99 → n = 33, a whole number, so YES — 33 squares use exactly 100.",
    ],
    insight:
      "A linear rule lets you both predict far-off terms and test, by solving an equation, whether a target value can ever occur.",
  },
  {
    unitId: "angles-polygons",
    problem:
      "Each interior angle of a regular polygon is 156°. How many sides does it have?",
    hints: [
      "Interior and exterior angles at each corner sit on a straight line. What does that tell you about the exterior angle?",
      "Exterior angle = 180 − 156 = 24°.",
      "The exterior angles of any polygon add to 360°. How many 24° angles fit into 360°?",
    ],
    solution: [
      "Exterior angle = 180 − 156 = 24°.",
      "Number of sides = 360 ÷ 24 = 15.",
      "The polygon has 15 sides (a regular pentadecagon).",
    ],
    insight:
      "For regular polygons, going via the exterior angle (which always totals 360°) is far quicker than the interior-angle-sum formula.",
  },
  {
    unitId: "perimeter-area-volume",
    problem:
      "Two rectangles have the same perimeter of 24 cm. One is 2 cm by 10 cm; the other is 6 cm by 6 cm. Which has the larger area, and what does this suggest about rectangles with a fixed perimeter?",
    hints: [
      "Work out both areas first before drawing any conclusion.",
      "Area of the 2 × 10 rectangle, then area of the 6 × 6 square.",
      "Try a third rectangle with perimeter 24, say 4 × 8. Where does the area peak?",
    ],
    solution: [
      "2 × 10 = 20 cm²; 6 × 6 = 36 cm²; 4 × 8 = 32 cm².",
      "The square (6 × 6) has the largest area.",
      "For a fixed perimeter, the closer a rectangle is to a square, the greater its area.",
    ],
    insight:
      "Equal perimeter does NOT mean equal area. Testing several cases reveals the underlying principle: squares maximise area for a given perimeter.",
  },
  {
    unitId: "transformations-pythagoras",
    problem:
      "A ladder 13 m long leans against a vertical wall with its foot 5 m from the base of the wall. If the foot is pulled out to 12 m from the wall, how far down the wall does the top of the ladder slide?",
    hints: [
      "The wall, ground and ladder form a right-angled triangle. The ladder is always the hypotenuse (13 m).",
      "First find the original height up the wall using a² + b² = c².",
      "Repeat for the new position with the foot 12 m out, then compare the two heights.",
    ],
    solution: [
      "Original height: h² = 13² − 5² = 169 − 25 = 144, so h = 12 m.",
      "New height: h² = 13² − 12² = 169 − 144 = 25, so h = 5 m.",
      "The top slides 12 − 5 = 7 m down the wall.",
    ],
    insight:
      "Model a real situation as a right-angled triangle, keep track of which side is the (unchanging) hypotenuse, and apply Pythagoras twice to compare states.",
  },
  {
    unitId: "statistics",
    problem:
      "The mean of five numbers is 12. When a sixth number is added, the mean becomes 13. What is the sixth number?",
    hints: [
      "The mean hides a total. What is the total of the first five numbers?",
      "Five numbers with mean 12 have a total of 60. Six numbers with mean 13 have what total?",
      "The sixth number is the difference between the two totals.",
    ],
    solution: [
      "Total of five numbers = 5 × 12 = 60.",
      "Total of six numbers = 6 × 13 = 78.",
      "Sixth number = 78 − 60 = 18.",
    ],
    insight:
      "Convert a mean back into a total (mean × count). Most 'mean changes when…' problems are really about comparing totals.",
  },
  {
    unitId: "probability",
    problem:
      "Two fair six-sided dice are rolled and their scores added. Which total is the most likely, and what is its probability?",
    hints: [
      "List all the outcomes systematically. How many equally likely outcomes are there in total?",
      "There are 6 × 6 = 36 outcomes. Count the ways of making each total from 2 to 12.",
      "Count the number of (die1, die2) pairs that add to 7 versus, say, to 2 or to 12.",
    ],
    solution: [
      "There are 36 equally likely outcomes.",
      "A total of 7 occurs for 1+6, 2+5, 3+4, 4+3, 5+2, 6+1 — that is 6 ways, more than any other total.",
      "P(total = 7) = 6/36 = 1/6.",
    ],
    insight:
      "For combined events, a complete sample space (grid) turns probability into careful counting. The middle total is most likely because it can be made the most ways.",
  },
];
