import type { Flashcard } from "../types";

export const flashcards: Flashcard[] = [
  // Integers, Powers & Roots
  { unitId: "integers-powers", front: "What is (−) × (−)?", back: "Positive. Two like signs multiply to give a positive answer." },
  { unitId: "integers-powers", front: "Rule for aᵐ × aⁿ", back: "Add the indices: aᵐ × aⁿ = aᵐ⁺ⁿ." },
  { unitId: "integers-powers", front: "Rule for aᵐ ÷ aⁿ", back: "Subtract the indices: aᵐ ÷ aⁿ = aᵐ⁻ⁿ." },
  { unitId: "integers-powers", front: "What is a⁰ (a ≠ 0)?", back: "1. Any non-zero number to the power 0 equals 1." },
  { unitId: "integers-powers", front: "What does BIDMAS stand for?", back: "Brackets, Indices, Division/Multiplication, Addition/Subtraction." },
  { unitId: "integers-powers", front: "√144 = ?", back: "12, because 12² = 144." },

  // Factors, Multiples & Primes
  { unitId: "factors-multiples", front: "Define a prime number", back: "A number with exactly two factors: 1 and itself." },
  { unitId: "factors-multiples", front: "Is 1 prime?", back: "No. 1 has only one factor, so it is not prime." },
  { unitId: "factors-multiples", front: "What is the HCF?", back: "Highest Common Factor — the largest number that divides into all the given numbers." },
  { unitId: "factors-multiples", front: "What is the LCM?", back: "Lowest Common Multiple — the smallest number that is a multiple of all the given numbers." },
  { unitId: "factors-multiples", front: "84 as a product of primes", back: "2² × 3 × 7." },

  // Fractions
  { unitId: "fractions", front: "How do you simplify a fraction?", back: "Divide the numerator and denominator by their HCF." },
  { unitId: "fractions", front: "How do you add fractions?", back: "Use a common denominator, then add the numerators." },
  { unitId: "fractions", front: "How do you divide by a fraction?", back: "Multiply by its reciprocal — 'keep, change, flip'." },
  { unitId: "fractions", front: "3/5 ÷ 2/7 = ?", back: "3/5 × 7/2 = 21/10 = 2 1/10." },

  // Decimals, Rounding & Estimation
  { unitId: "decimals-rounding", front: "Where is the 1st significant figure?", back: "The first non-zero digit, counting from the left." },
  { unitId: "decimals-rounding", front: "How do you estimate a calculation?", back: "Round each number to 1 significant figure, then calculate." },
  { unitId: "decimals-rounding", front: "Round 3.7268 to 2 d.p.", back: "3.73 (the next digit is 6, so round up)." },

  // Percentages
  { unitId: "percentages", front: "Multiplier to increase by 12%", back: "× 1.12 (that is 1 + 0.12)." },
  { unitId: "percentages", front: "Multiplier to decrease by 30%", back: "× 0.70 (that is 1 − 0.30)." },
  { unitId: "percentages", front: "How to find the original after a % change", back: "Divide the new amount by the multiplier that was used." },
  { unitId: "percentages", front: "Find 10% then 5% of an amount", back: "10% = divide by 10; 5% = half of that." },

  // Ratio & Proportion
  { unitId: "ratio-proportion", front: "How do you share in a ratio?", back: "Add the parts, divide the amount by the total to find one share, then multiply." },
  { unitId: "ratio-proportion", front: "Formula linking speed, distance, time", back: "Speed = Distance ÷ Time." },
  { unitId: "ratio-proportion", front: "What is the unitary method?", back: "Find the value of one item first, then scale up to the amount you need." },

  // Algebraic Expressions
  { unitId: "expressions", front: "What are 'like terms'?", back: "Terms with exactly the same letters and powers, e.g. 3a and 5a." },
  { unitId: "expressions", front: "Expand a(b + c)", back: "ab + ac — multiply every term inside by the term outside." },
  { unitId: "expressions", front: "What is factorising?", back: "The reverse of expanding: take out the HCF into a bracket." },
  { unitId: "expressions", front: "Factorise 8x + 12", back: "4(2x + 3)." },

  // Equations & Inequalities
  { unitId: "equations", front: "Golden rule for solving equations", back: "Do the same operation to both sides to keep it balanced." },
  { unitId: "equations", front: "When do you reverse an inequality sign?", back: "When you multiply or divide both sides by a negative number." },
  { unitId: "equations", front: "Open vs filled circle on a number line", back: "Open circle for < or >; filled circle for ≤ or ≥." },

  // Sequences & Linear Graphs
  { unitId: "sequences-graphs", front: "What does m mean in y = mx + c?", back: "The gradient (steepness) of the line." },
  { unitId: "sequences-graphs", front: "What does c mean in y = mx + c?", back: "The y-intercept — where the line crosses the y-axis (x = 0)." },
  { unitId: "sequences-graphs", front: "How do you find a gradient?", back: "Change in y ÷ change in x between two points." },
  { unitId: "sequences-graphs", front: "nth term of 5, 8, 11, 14, …", back: "3n + 2 (common difference 3, zero term 2)." },

  // Angles & Polygons
  { unitId: "angles-polygons", front: "Angles in a triangle add to…", back: "180°." },
  { unitId: "angles-polygons", front: "Angles around a point add to…", back: "360°." },
  { unitId: "angles-polygons", front: "Co-interior angles…", back: "Add up to 180° (C-shape)." },
  { unitId: "angles-polygons", front: "Sum of exterior angles of any polygon", back: "Always 360°." },
  { unitId: "angles-polygons", front: "Sum of interior angles of an n-sided polygon", back: "(n − 2) × 180°." },

  // Perimeter, Area & Volume
  { unitId: "perimeter-area-volume", front: "Area of a triangle", back: "½ × base × height." },
  { unitId: "perimeter-area-volume", front: "Area of a trapezium", back: "½ (a + b) × height." },
  { unitId: "perimeter-area-volume", front: "Circumference of a circle", back: "π × d (or 2 × π × r)." },
  { unitId: "perimeter-area-volume", front: "Area of a circle", back: "π × r²." },
  { unitId: "perimeter-area-volume", front: "Volume of a prism", back: "Cross-sectional area × length." },

  // Transformations & Pythagoras
  { unitId: "transformations-pythagoras", front: "Which transformations keep a shape congruent?", back: "Reflection, rotation and translation (same size and shape)." },
  { unitId: "transformations-pythagoras", front: "Pythagoras' theorem", back: "a² + b² = c², where c is the hypotenuse." },
  { unitId: "transformations-pythagoras", front: "Which side is the hypotenuse?", back: "The longest side, opposite the right angle." },
  { unitId: "transformations-pythagoras", front: "How do you find a shorter side with Pythagoras?", back: "Subtract: shorter² = hypotenuse² − other side²." },

  // Statistics
  { unitId: "statistics", front: "How do you find the mean?", back: "Add all the values and divide by how many there are." },
  { unitId: "statistics", front: "What is the median?", back: "The middle value when the data is placed in order." },
  { unitId: "statistics", front: "What is the range?", back: "Highest value − lowest value (a measure of spread)." },
  { unitId: "statistics", front: "Pie chart angle for a category", back: "(frequency ÷ total) × 360°." },

  // Probability
  { unitId: "probability", front: "Probability scale runs from…", back: "0 (impossible) to 1 (certain)." },
  { unitId: "probability", front: "P(event) formula", back: "Favourable outcomes ÷ total number of outcomes." },
  { unitId: "probability", front: "P(not A) = ?", back: "1 − P(A)." },
  { unitId: "probability", front: "Outcomes when two dice are rolled", back: "6 × 6 = 36 equally likely outcomes." },
];
