import type { MockPaper } from "../types";

export const mockPapers: MockPaper[] = [
  {
    id: "paper-1",
    title: "Mock Paper 1 — Number & Algebra",
    description:
      "A non-calculator style paper covering integers, fractions, percentages, ratio and algebra. Try every question on paper first, then reveal the mark scheme.",
    totalMarks: 30,
    questions: [
      {
        number: "1",
        marks: 2,
        question: "Work out −8 + 5 × (−2).",
        answer: [
          "Multiplication first (BIDMAS): 5 × (−2) = −10. [1]",
          "−8 + (−10) = −18. [1]",
        ],
      },
      {
        number: "2",
        marks: 3,
        question: "Write 180 as a product of its prime factors, using index notation.",
        answer: [
          "180 = 2 × 90 = 2 × 2 × 45 = 2 × 2 × 3 × 15 = 2 × 2 × 3 × 3 × 5. [2]",
          "180 = 2² × 3² × 5. [1]",
        ],
      },
      {
        number: "3",
        marks: 3,
        question: "Work out 3/4 − 1/6, giving your answer in simplest form.",
        answer: [
          "Common denominator 12: 3/4 = 9/12 and 1/6 = 2/12. [2]",
          "9/12 − 2/12 = 7/12 (already simplest). [1]",
        ],
      },
      {
        number: "4",
        marks: 3,
        question: "A coat costs £80. In a sale it is reduced by 15%. Work out the sale price.",
        answer: [
          "Decrease multiplier = 1 − 0.15 = 0.85. [1]",
          "80 × 0.85 = 68. [1]",
          "Sale price = £68. [1]",
        ],
      },
      {
        number: "5",
        marks: 3,
        question: "Share £72 in the ratio 5 : 4.",
        answer: [
          "Total shares = 5 + 4 = 9; one share = 72 ÷ 9 = £8. [2]",
          "5 shares = £40 and 4 shares = £32. [1]",
        ],
      },
      {
        number: "6",
        marks: 2,
        question: "Simplify 7a + 4b − 3a − b.",
        answer: ["7a − 3a = 4a; 4b − b = 3b. [1]", "Answer: 4a + 3b. [1]"],
      },
      {
        number: "7",
        marks: 2,
        question: "Expand and simplify 4(2x + 1) + 3x.",
        answer: ["Expand: 8x + 4. [1]", "Add 3x: 11x + 4. [1]"],
      },
      {
        number: "8",
        marks: 3,
        question: "Solve 5x − 4 = 2x + 11.",
        answer: [
          "Subtract 2x: 3x − 4 = 11. [1]",
          "Add 4: 3x = 15. [1]",
          "Divide by 3: x = 5. [1]",
        ],
      },
      {
        number: "9",
        marks: 3,
        question: "The nth term of a sequence is 4n − 1. (a) Write the first three terms. (b) Is 50 a term in the sequence? Explain.",
        answer: [
          "(a) n = 1, 2, 3 give 3, 7, 11. [1]",
          "(b) Set 4n − 1 = 50 → 4n = 51 → n = 12.75. [1]",
          "n is not a whole number, so 50 is NOT a term. [1]",
        ],
      },
      {
        number: "10",
        marks: 3,
        question: "After a 20% increase, a phone bill is £36. Work out the original bill.",
        answer: [
          "Multiplier used = 1.20. [1]",
          "Original = 36 ÷ 1.20. [1]",
          "= £30. [1]",
        ],
      },
    ],
  },
  {
    id: "paper-2",
    title: "Mock Paper 2 — Geometry, Statistics & Problem Solving",
    description:
      "Covers angles, area and volume, Pythagoras, averages and probability, finishing with two AoPS-style reasoning questions. A calculator is allowed.",
    totalMarks: 32,
    questions: [
      {
        number: "1",
        marks: 2,
        question: "Three angles meet at a point and are 140°, 95° and x°. Find x.",
        answer: ["Angles around a point sum to 360°. [1]", "x = 360 − 140 − 95 = 125°. [1]"],
      },
      {
        number: "2",
        marks: 3,
        question: "A regular polygon has an exterior angle of 30°. (a) How many sides has it? (b) State the size of each interior angle.",
        answer: [
          "(a) Sides = 360 ÷ 30 = 12. [2]",
          "(b) Interior angle = 180 − 30 = 150°. [1]",
        ],
      },
      {
        number: "3",
        marks: 3,
        question: "Find the area of a trapezium with parallel sides 6 cm and 10 cm and height 4 cm.",
        answer: [
          "Area = ½(a + b) × h = ½(6 + 10) × 4. [2]",
          "= ½ × 16 × 4 = 32 cm². [1]",
        ],
      },
      {
        number: "4",
        marks: 3,
        question: "A circle has radius 7 cm. Find its circumference. Use π = 3.14, to 1 d.p.",
        answer: [
          "Circumference = 2πr = 2 × 3.14 × 7. [2]",
          "= 43.96 ≈ 44.0 cm. [1]",
        ],
      },
      {
        number: "5",
        marks: 3,
        question: "A right-angled triangle has legs 9 cm and 12 cm. Find the hypotenuse.",
        answer: [
          "c² = 9² + 12² = 81 + 144 = 225. [2]",
          "c = √225 = 15 cm. [1]",
        ],
      },
      {
        number: "6",
        marks: 3,
        question: "Find the volume of a triangular prism whose cross-section has area 15 cm² and whose length is 9 cm.",
        answer: [
          "Volume of a prism = cross-sectional area × length. [1]",
          "= 15 × 9. [1]",
          "= 135 cm³. [1]",
        ],
      },
      {
        number: "7",
        marks: 3,
        question: "The numbers 6, 9, 9, 11, x have a mean of 9. Find x.",
        answer: [
          "Total must be 5 × 9 = 45. [1]",
          "6 + 9 + 9 + 11 = 35, so x = 45 − 35. [1]",
          "x = 10. [1]",
        ],
      },
      {
        number: "8",
        marks: 2,
        question: "A spinner has 8 equal sections: 3 red, 2 blue, 3 green. Find P(not green).",
        answer: ["P(green) = 3/8, so P(not green) = 1 − 3/8. [1]", "= 5/8. [1]"],
      },
      {
        number: "9",
        marks: 4,
        question:
          "Problem solving: A square and an equilateral triangle have the same perimeter. The triangle has sides of 12 cm. Find the area of the square.",
        answer: [
          "Triangle perimeter = 3 × 12 = 36 cm, so the square's perimeter is also 36 cm. [1]",
          "Each side of the square = 36 ÷ 4 = 9 cm. [1]",
          "Area = 9 × 9. [1]",
          "= 81 cm². [1]",
        ],
      },
      {
        number: "10",
        marks: 4,
        question:
          "Problem solving: A 20% increase followed by a 20% decrease leaves a price at £96. Find the original price, and state the overall percentage change.",
        answer: [
          "Combined multiplier = 1.2 × 0.8 = 0.96. [1]",
          "Original = 96 ÷ 0.96 = £100. [2]",
          "0.96 means an overall 4% decrease. [1]",
        ],
      },
    ],
  },
];
