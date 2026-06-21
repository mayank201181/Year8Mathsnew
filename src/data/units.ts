import type { Unit } from "../types";

/**
 * Year 8 Maths study guide.
 * Aligned broadly to Cambridge Lower Secondary Stage 8 / UK Key Stage 3 Year 8.
 * Strands: Number, Algebra, Ratio & Proportion, Geometry & Measure, Statistics & Probability.
 */
export const units: Unit[] = [
  {
    id: "integers-powers",
    title: "Integers, Powers & Roots",
    strand: "Number",
    summary: "Negative numbers, indices, square & cube roots, and order of operations.",
    sections: [
      {
        heading: "Calculating with integers",
        notes: [
          "Integers are whole numbers, positive or negative, including zero.",
          "Adding a negative is the same as subtracting; subtracting a negative is the same as adding. For example 5 + (−3) = 2 and 5 − (−3) = 8.",
          "When multiplying or dividing, two like signs give a positive answer and two unlike signs give a negative answer.",
        ],
        keyFacts: [
          "(+) × (+) = (+), (−) × (−) = (+)",
          "(+) × (−) = (−), (−) × (+) = (−)",
          "The same sign rules apply to division.",
        ],
        examples: [
          {
            problem: "Work out −6 × −4.",
            solution: [
              "Two negative signs multiply to give a positive.",
              "6 × 4 = 24, so −6 × −4 = 24.",
            ],
          },
          {
            problem: "Work out −20 ÷ 5.",
            solution: ["Unlike signs give a negative answer.", "20 ÷ 5 = 4, so −20 ÷ 5 = −4."],
          },
        ],
      },
      {
        heading: "Powers (indices)",
        explore:
          "Before reading on: 2³ × 2⁴ means (2×2×2) × (2×2×2×2). Without a calculator, can you write the answer as a single power of 2? What did you do to the indices 3 and 4 — and why does that always work?",
        notes: [
          "A power, or index, tells you how many times to multiply a number by itself. In 2⁵ the 2 is the base and 5 is the index.",
          "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
          "Any non-zero number to the power 0 equals 1.",
        ],
        keyFacts: [
          "Index laws: aᵐ × aⁿ = aᵐ⁺ⁿ",
          "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
          "(aᵐ)ⁿ = aᵐⁿ",
          "a⁰ = 1",
        ],
        examples: [
          {
            problem: "Simplify 3⁴ × 3².",
            solution: ["Add the indices when multiplying powers of the same base.", "3⁴ × 3² = 3⁴⁺² = 3⁶ = 729."],
          },
          {
            problem: "Simplify 5⁷ ÷ 5⁵.",
            solution: ["Subtract the indices when dividing.", "5⁷ ÷ 5⁵ = 5⁷⁻⁵ = 5² = 25."],
          },
        ],
      },
      {
        heading: "Square and cube roots",
        notes: [
          "A square root reverses squaring: √49 = 7 because 7² = 49.",
          "A cube root reverses cubing: ∛27 = 3 because 3³ = 27.",
          "You should know the square numbers up to 15² = 225 and the cubes of 1–5 and 10.",
        ],
        keyFacts: [
          "Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144…",
          "Cube numbers: 1, 8, 27, 64, 125, 1000",
          "√(a²) = a for positive a",
        ],
        examples: [
          {
            problem: "Find √144 + ∛64.",
            solution: ["√144 = 12 and ∛64 = 4.", "12 + 4 = 16."],
          },
        ],
      },
      {
        heading: "Order of operations (BIDMAS)",
        notes: [
          "Operations are carried out in a fixed order: Brackets, Indices, Division and Multiplication (left to right), then Addition and Subtraction (left to right).",
          "Multiplication and division have equal priority, as do addition and subtraction — work left to right within each pair.",
        ],
        keyFacts: ["Brackets → Indices → Division/Multiplication → Addition/Subtraction"],
        examples: [
          {
            problem: "Work out 4 + 3 × 2².",
            solution: [
              "Indices first: 2² = 4.",
              "Then multiply: 3 × 4 = 12.",
              "Finally add: 4 + 12 = 16.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "factors-multiples",
    title: "Factors, Multiples & Primes",
    strand: "Number",
    summary: "Prime factorisation, HCF and LCM using factor trees and Venn diagrams.",
    sections: [
      {
        heading: "Prime factorisation",
        notes: [
          "A prime number has exactly two factors: 1 and itself. The first primes are 2, 3, 5, 7, 11, 13…",
          "Every whole number greater than 1 can be written as a product of primes in exactly one way. A factor tree helps you find them.",
          "Write the answer using index notation, e.g. 360 = 2³ × 3² × 5.",
        ],
        keyFacts: ["1 is not a prime number.", "2 is the only even prime."],
        examples: [
          {
            problem: "Write 84 as a product of its prime factors.",
            solution: [
              "84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7.",
              "So 84 = 2² × 3 × 7.",
            ],
          },
        ],
      },
      {
        heading: "Highest Common Factor (HCF)",
        notes: [
          "The HCF is the largest number that divides into two or more numbers exactly.",
          "Find it by listing the prime factors and multiplying the factors common to both numbers.",
        ],
        examples: [
          {
            problem: "Find the HCF of 24 and 36.",
            solution: [
              "24 = 2³ × 3 and 36 = 2² × 3².",
              "Common factors: 2² and 3.",
              "HCF = 2² × 3 = 12.",
            ],
          },
        ],
      },
      {
        heading: "Lowest Common Multiple (LCM)",
        explore:
          "Try this first: multiply the HCF of 6 and 8 by their LCM. Now multiply 6 × 8. What do you notice? Test it on another pair. Can you explain why HCF × LCM = the product of the two numbers?",
        notes: [
          "The LCM is the smallest number that is a multiple of two or more numbers.",
          "Using prime factors, take the highest power of every prime that appears in either number and multiply them.",
        ],
        examples: [
          {
            problem: "Find the LCM of 6 and 8.",
            solution: [
              "6 = 2 × 3 and 8 = 2³.",
              "Highest powers: 2³ and 3.",
              "LCM = 2³ × 3 = 24.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "fractions",
    title: "Fractions",
    strand: "Number",
    summary: "The four operations with fractions and mixed numbers.",
    sections: [
      {
        heading: "Equivalent fractions and simplifying",
        notes: [
          "Multiplying or dividing the top and bottom of a fraction by the same number gives an equivalent fraction.",
          "To simplify (cancel) a fraction, divide the numerator and denominator by their HCF.",
        ],
        examples: [
          {
            problem: "Simplify 18/24.",
            solution: ["The HCF of 18 and 24 is 6.", "18 ÷ 6 = 3 and 24 ÷ 6 = 4, so 18/24 = 3/4."],
          },
        ],
      },
      {
        heading: "Adding and subtracting fractions",
        notes: [
          "Write both fractions with a common denominator (use the LCM of the denominators), then add or subtract the numerators.",
          "Convert mixed numbers to improper fractions first, or deal with whole numbers and fractions separately.",
        ],
        keyFacts: ["a/b + c/d = (ad + cb)/(bd)"],
        examples: [
          {
            problem: "Work out 2/3 + 1/4.",
            solution: [
              "The LCM of 3 and 4 is 12.",
              "2/3 = 8/12 and 1/4 = 3/12.",
              "8/12 + 3/12 = 11/12.",
            ],
          },
        ],
      },
      {
        heading: "Multiplying and dividing fractions",
        explore:
          "Think it through: how many quarters fit into 3? Now how many halves fit into 3? Notice you are getting 3 ÷ ¼ and 3 ÷ ½. Why does dividing by a fraction make the answer bigger, and where does 'flip and multiply' come from?",
        notes: [
          "To multiply, multiply the numerators together and the denominators together, then simplify.",
          "To divide, multiply by the reciprocal of the second fraction (turn it upside down and multiply). 'Keep, change, flip.'",
        ],
        keyFacts: ["a/b ÷ c/d = a/b × d/c"],
        examples: [
          {
            problem: "Work out 3/5 ÷ 2/7.",
            solution: ["Keep 3/5, change ÷ to ×, flip 2/7 to 7/2.", "3/5 × 7/2 = 21/10 = 2 1/10."],
          },
        ],
      },
    ],
  },
  {
    id: "decimals-rounding",
    title: "Decimals, Rounding & Estimation",
    strand: "Number",
    summary: "Decimal calculations, significant figures, decimal places and estimating.",
    sections: [
      {
        heading: "Calculating with decimals",
        notes: [
          "To add or subtract decimals, line up the decimal points.",
          "To multiply, ignore the points, multiply as whole numbers, then put the point back so the answer has as many decimal places as the question.",
          "To divide by a decimal, multiply both numbers by a power of 10 until you are dividing by a whole number.",
        ],
        examples: [
          {
            problem: "Work out 0.6 × 0.4.",
            solution: ["6 × 4 = 24. There are two decimal places in total in the question.", "So 0.6 × 0.4 = 0.24."],
          },
        ],
      },
      {
        heading: "Rounding",
        notes: [
          "To round, look at the digit immediately after the place you are rounding to. If it is 5 or more, round up; otherwise round down.",
          "Significant figures count from the first non-zero digit. In 0.00408 the first significant figure is 4.",
        ],
        keyFacts: ["Decimal places (d.p.) count digits after the point.", "Significant figures (s.f.) start at the first non-zero digit."],
        examples: [
          {
            problem: "Round 3.7268 to 2 decimal places.",
            solution: ["The third decimal is 6, which is 5 or more, so round up.", "3.7268 ≈ 3.73."],
          },
          {
            problem: "Round 4087 to 2 significant figures.",
            solution: ["The first two significant figures are 4 and 0. The next digit is 8, so round up.", "4087 ≈ 4100."],
          },
        ],
      },
      {
        heading: "Estimation",
        notes: [
          "To estimate, round each number to 1 significant figure, then carry out the calculation.",
          "Estimating is a quick check that an answer is sensible.",
        ],
        examples: [
          {
            problem: "Estimate 31.6 × 4.9.",
            solution: ["Round to 1 s.f.: 30 × 5.", "30 × 5 = 150, so the answer is about 150."],
          },
        ],
      },
    ],
  },
  {
    id: "percentages",
    title: "Percentages",
    strand: "Number",
    summary: "Percentage of amounts, increase/decrease, and reverse percentages.",
    sections: [
      {
        heading: "Percentage of an amount",
        notes: [
          "Per cent means 'out of 100'. To find a percentage of an amount, write the percentage as a fraction or decimal and multiply.",
          "A multiplier is a quick method: 25% = 0.25, so 25% of 80 = 0.25 × 80.",
        ],
        keyFacts: ["10% = ÷10", "1% = ÷100", "Multiplier for n% = n ÷ 100"],
        examples: [
          {
            problem: "Find 15% of 240.",
            solution: ["10% of 240 = 24 and 5% = 12.", "15% = 24 + 12 = 36."],
          },
        ],
      },
      {
        heading: "Percentage increase and decrease",
        notes: [
          "To increase by a percentage, multiply by (1 + the percentage as a decimal). To decrease, multiply by (1 − the percentage as a decimal).",
          "Increasing by 20% means multiplying by 1.20; decreasing by 20% means multiplying by 0.80.",
        ],
        keyFacts: ["Increase by 12% → × 1.12", "Decrease by 12% → × 0.88"],
        examples: [
          {
            problem: "A £60 coat is reduced by 30%. Find the new price.",
            solution: ["Decrease multiplier = 1 − 0.30 = 0.70.", "60 × 0.70 = £42."],
          },
        ],
      },
      {
        heading: "Reverse percentages",
        explore:
          "A common trap: a price rises 25% to £75. A classmate finds 25% of £75 and subtracts it. Try their method, then check by increasing your 'original' by 25%. Does it return to £75? Why does subtracting 25% NOT undo a 25% increase?",
        notes: [
          "Sometimes you know the amount after a change and must find the original.",
          "Work out what multiplier was used, then divide by it to undo the change.",
        ],
        examples: [
          {
            problem: "After a 25% increase, a price is £75. Find the original price.",
            solution: ["The multiplier was 1.25.", "Original = 75 ÷ 1.25 = £60."],
          },
        ],
      },
    ],
  },
  {
    id: "ratio-proportion",
    title: "Ratio & Proportion",
    strand: "Ratio & Proportion",
    summary: "Simplifying and sharing in a ratio, direct proportion and rates.",
    sections: [
      {
        heading: "Simplifying and sharing ratios",
        notes: [
          "A ratio compares quantities. Simplify it by dividing every part by their HCF, just like a fraction.",
          "To share an amount in a ratio, add the parts to find the total number of shares, divide the amount by that total to find one share, then multiply.",
        ],
        examples: [
          {
            problem: "Share £40 in the ratio 3 : 5.",
            solution: [
              "Total shares = 3 + 5 = 8.",
              "One share = 40 ÷ 8 = £5.",
              "3 shares = £15 and 5 shares = £25.",
            ],
          },
        ],
      },
      {
        heading: "Direct proportion",
        notes: [
          "Two quantities are in direct proportion if they increase in the same ratio: double one and the other doubles.",
          "The unitary method finds the value of one item first, then scales up.",
        ],
        examples: [
          {
            problem: "5 pens cost £2.00. Find the cost of 8 pens.",
            solution: ["One pen costs 2.00 ÷ 5 = £0.40.", "8 pens cost 8 × 0.40 = £3.20."],
          },
        ],
      },
      {
        heading: "Rates: speed, distance and time",
        notes: [
          "A rate compares two quantities with different units, such as kilometres per hour.",
          "Speed = distance ÷ time. Rearrange to get distance = speed × time and time = distance ÷ speed.",
        ],
        keyFacts: ["Speed = Distance ÷ Time", "Use the formula triangle D over S × T."],
        examples: [
          {
            problem: "A car travels 150 km in 2 hours. Find its average speed.",
            solution: ["Speed = distance ÷ time = 150 ÷ 2.", "Average speed = 75 km/h."],
          },
        ],
      },
    ],
  },
  {
    id: "expressions",
    title: "Algebraic Expressions",
    strand: "Algebra",
    summary: "Simplifying, expanding brackets, factorising and substitution.",
    sections: [
      {
        heading: "Simplifying expressions",
        notes: [
          "Collect like terms — terms with exactly the same letters and powers. 3a + 5a = 8a, but 3a and 3a² are not like terms.",
          "In a term, write the number (coefficient) first, e.g. 4 × y = 4y and y × y = y².",
        ],
        examples: [
          {
            problem: "Simplify 5x + 3y − 2x + 4y.",
            solution: ["Collect x terms: 5x − 2x = 3x.", "Collect y terms: 3y + 4y = 7y.", "Answer: 3x + 7y."],
          },
        ],
      },
      {
        heading: "Expanding brackets",
        notes: [
          "Multiply every term inside the bracket by the term outside.",
          "Watch the signs carefully, especially with a negative outside the bracket.",
        ],
        keyFacts: ["a(b + c) = ab + ac"],
        examples: [
          {
            problem: "Expand 3(2x − 5).",
            solution: ["3 × 2x = 6x and 3 × (−5) = −15.", "Answer: 6x − 15."],
          },
        ],
      },
      {
        heading: "Factorising",
        explore:
          "You already know how to expand 4(2x + 3). Cover up the answer 8x + 12 and ask: starting from 8x + 12, how could you work backwards to the bracket? What number did every term share?",
        notes: [
          "Factorising is the reverse of expanding: take out the highest common factor and place it outside a bracket.",
          "Check by expanding your answer — it should return the original expression.",
        ],
        examples: [
          {
            problem: "Factorise 8x + 12.",
            solution: ["The HCF of 8 and 12 is 4.", "8x + 12 = 4(2x + 3)."],
          },
        ],
      },
      {
        heading: "Substitution",
        notes: [
          "Substitution means replacing letters with given numbers and then calculating, using BIDMAS.",
          "Use brackets when you substitute negative numbers to avoid sign errors.",
        ],
        examples: [
          {
            problem: "Find the value of 3a² − 2b when a = 4 and b = 5.",
            solution: ["a² = 16, so 3a² = 48.", "2b = 10.", "48 − 10 = 38."],
          },
        ],
      },
    ],
  },
  {
    id: "equations",
    title: "Linear Equations & Inequalities",
    strand: "Algebra",
    summary: "Solving equations with the balance method and representing inequalities.",
    sections: [
      {
        heading: "Solving linear equations",
        notes: [
          "An equation is solved by doing the same operation to both sides until the letter is alone.",
          "Use inverse operations: undo addition with subtraction, and multiplication with division.",
        ],
        keyFacts: ["Always do the same to both sides to keep the equation balanced."],
        examples: [
          {
            problem: "Solve 4x + 3 = 19.",
            solution: ["Subtract 3 from both sides: 4x = 16.", "Divide both sides by 4: x = 4."],
          },
          {
            problem: "Solve 5x − 2 = 3x + 8.",
            solution: [
              "Subtract 3x from both sides: 2x − 2 = 8.",
              "Add 2: 2x = 10.",
              "Divide by 2: x = 5.",
            ],
          },
        ],
      },
      {
        heading: "Equations with brackets",
        notes: ["Expand the brackets first, then solve as usual."],
        examples: [
          {
            problem: "Solve 2(x + 4) = 18.",
            solution: ["Expand: 2x + 8 = 18.", "Subtract 8: 2x = 10.", "Divide by 2: x = 5."],
          },
        ],
      },
      {
        heading: "Inequalities",
        notes: [
          "Inequalities use < (less than), > (greater than), ≤ and ≥. Solve them just like equations.",
          "Important: if you multiply or divide both sides by a negative number, reverse the inequality sign.",
          "Solutions can be shown on a number line: an open circle for < or >, a filled circle for ≤ or ≥.",
        ],
        examples: [
          {
            problem: "Solve 3x − 1 > 11.",
            solution: ["Add 1: 3x > 12.", "Divide by 3: x > 4."],
          },
        ],
      },
    ],
  },
  {
    id: "sequences-graphs",
    title: "Sequences & Linear Graphs",
    strand: "Algebra",
    summary: "The nth term of a sequence and plotting straight-line graphs y = mx + c.",
    sections: [
      {
        heading: "Sequences and the nth term",
        explore:
          "Look at 5, 8, 11, 14, … It goes up by 3 each time, and so does the sequence 3, 6, 9, 12 (the 3 times table). Line them up term by term. How far apart are they, and how does that gap turn the rule 3n into the rule for this sequence?",
        notes: [
          "In a linear (arithmetic) sequence the terms go up or down by a constant amount, called the common difference.",
          "The nth term rule has the form (common difference)n + (zero term). The zero term is the value before the first term.",
        ],
        keyFacts: ["nth term = dn + (first term − d), where d is the common difference."],
        examples: [
          {
            problem: "Find the nth term of 5, 8, 11, 14, …",
            solution: [
              "The common difference is 3, so start with 3n.",
              "3 × 1 = 3, but the first term is 5, so add 2.",
              "nth term = 3n + 2.",
            ],
          },
        ],
      },
      {
        heading: "Coordinates and straight lines",
        notes: [
          "Coordinates are written (x, y): the x-value gives horizontal position, the y-value vertical position.",
          "A straight-line graph has equation y = mx + c, where m is the gradient (steepness) and c is the y-intercept (where it crosses the y-axis).",
        ],
        keyFacts: [
          "y = mx + c",
          "Gradient m = (change in y) ÷ (change in x)",
          "c is the y-value where x = 0.",
        ],
        examples: [
          {
            problem: "State the gradient and y-intercept of y = 2x − 3.",
            solution: ["Comparing with y = mx + c: m = 2 and c = −3.", "Gradient 2, y-intercept (0, −3)."],
          },
          {
            problem: "Find the gradient of the line through (1, 2) and (4, 11).",
            solution: [
              "Change in y = 11 − 2 = 9.",
              "Change in x = 4 − 1 = 3.",
              "Gradient = 9 ÷ 3 = 3.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "angles-polygons",
    title: "Angles & Polygons",
    strand: "Geometry & Measure",
    summary: "Angle rules, parallel lines and the angles in polygons.",
    sections: [
      {
        heading: "Basic angle facts",
        notes: [
          "Angles on a straight line add to 180°. Angles around a point add to 360°. Vertically opposite angles are equal.",
          "Angles in a triangle add to 180°; angles in a quadrilateral add to 360°.",
        ],
        keyFacts: ["Straight line = 180°", "Around a point = 360°", "Triangle = 180°", "Quadrilateral = 360°"],
        examples: [
          {
            problem: "Two angles on a straight line are 125° and x. Find x.",
            solution: ["Angles on a line add to 180°.", "x = 180 − 125 = 55°."],
          },
        ],
      },
      {
        heading: "Angles in parallel lines",
        notes: [
          "When a straight line crosses two parallel lines, special angle pairs appear.",
          "Corresponding angles (F-shape) are equal. Alternate angles (Z-shape) are equal. Co-interior angles (C-shape) add to 180°.",
        ],
        keyFacts: ["Corresponding = equal", "Alternate = equal", "Co-interior = add to 180°"],
        examples: [
          {
            problem: "Two co-interior angles are 110° and y. Find y.",
            solution: ["Co-interior angles add to 180°.", "y = 180 − 110 = 70°."],
          },
        ],
      },
      {
        heading: "Angles in polygons",
        explore:
          "Discover the rule yourself: from one corner of a pentagon, draw all the diagonals. How many triangles is it split into? Try a hexagon. Since each triangle holds 180°, can you predict the angle sum of any polygon before being given the formula?",
        notes: [
          "The interior angles of a polygon with n sides add to (n − 2) × 180°.",
          "The exterior angles of any polygon always add to 360°. For a regular polygon, each exterior angle = 360° ÷ n.",
        ],
        keyFacts: [
          "Sum of interior angles = (n − 2) × 180°",
          "Sum of exterior angles = 360°",
          "Interior + exterior angle = 180°",
        ],
        examples: [
          {
            problem: "Find each interior angle of a regular hexagon.",
            solution: [
              "Each exterior angle = 360 ÷ 6 = 60°.",
              "Interior angle = 180 − 60 = 120°.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "perimeter-area-volume",
    title: "Perimeter, Area & Volume",
    strand: "Geometry & Measure",
    summary: "Area of 2D shapes, circumference and area of circles, and volume of prisms.",
    sections: [
      {
        heading: "Area of 2D shapes",
        notes: [
          "Perimeter is the total distance around a shape; area is the space inside it, measured in square units.",
          "Learn the standard area formulas and split compound shapes into rectangles and triangles.",
        ],
        keyFacts: [
          "Rectangle: A = length × width",
          "Triangle: A = ½ × base × height",
          "Parallelogram: A = base × height",
          "Trapezium: A = ½(a + b) × height",
        ],
        examples: [
          {
            problem: "Find the area of a triangle with base 10 cm and height 6 cm.",
            solution: ["A = ½ × base × height = ½ × 10 × 6.", "Area = 30 cm²."],
          },
        ],
      },
      {
        heading: "Circles",
        notes: [
          "The circumference is the distance around a circle; the area is the space inside.",
          "The diameter is twice the radius. Use π ≈ 3.14 (or the π button on a calculator).",
        ],
        keyFacts: ["Circumference = π × d = 2 × π × r", "Area = π × r²"],
        examples: [
          {
            problem: "Find the area of a circle with radius 5 cm (use π = 3.14).",
            solution: ["A = π × r² = 3.14 × 5² = 3.14 × 25.", "Area = 78.5 cm²."],
          },
        ],
      },
      {
        heading: "Volume of prisms",
        notes: [
          "A prism has the same cross-section all the way through. Its volume is the area of the cross-section multiplied by its length.",
          "Volume is measured in cubic units (cm³, m³).",
        ],
        keyFacts: ["Volume of a prism = cross-sectional area × length", "Volume of a cuboid = length × width × height"],
        examples: [
          {
            problem: "Find the volume of a cuboid 4 cm by 3 cm by 5 cm.",
            solution: ["V = length × width × height = 4 × 3 × 5.", "Volume = 60 cm³."],
          },
        ],
      },
    ],
  },
  {
    id: "transformations-pythagoras",
    title: "Transformations & Pythagoras",
    strand: "Geometry & Measure",
    summary: "Reflections, rotations, translations, enlargements and Pythagoras' theorem.",
    sections: [
      {
        heading: "Transformations",
        notes: [
          "A reflection flips a shape over a mirror line. A rotation turns it about a centre by an angle and direction. A translation slides it, described by a column vector.",
          "An enlargement changes size by a scale factor from a centre of enlargement. A scale factor greater than 1 makes the shape bigger.",
          "Reflections, rotations and translations are congruent (same size and shape); enlargements are similar.",
        ],
        keyFacts: [
          "Translation vector: top number = right/left, bottom number = up/down.",
          "Enlargement scale factor = new length ÷ original length.",
        ],
        examples: [
          {
            problem: "A point (2, 3) is translated by the vector (4, −1). Find its image.",
            solution: ["Add the vector: x: 2 + 4 = 6, y: 3 + (−1) = 2.", "Image is (6, 2)."],
          },
        ],
      },
      {
        heading: "Pythagoras' theorem",
        explore:
          "On squared paper draw a right-angled triangle with sides 3 and 4. Build a square on each of the three sides and count the small squares inside each one. What is the relationship between the three areas? Does it still hold for sides 6 and 8?",
        notes: [
          "In a right-angled triangle, the longest side (opposite the right angle) is the hypotenuse.",
          "Pythagoras' theorem says the square of the hypotenuse equals the sum of the squares of the other two sides.",
          "To find a shorter side, rearrange by subtracting instead of adding.",
        ],
        keyFacts: ["a² + b² = c², where c is the hypotenuse."],
        examples: [
          {
            problem: "Find the hypotenuse of a right-angled triangle with sides 6 cm and 8 cm.",
            solution: [
              "c² = 6² + 8² = 36 + 64 = 100.",
              "c = √100 = 10 cm.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "statistics",
    title: "Statistics",
    strand: "Statistics & Probability",
    summary: "Averages, range, and interpreting data in tables and charts.",
    sections: [
      {
        heading: "Averages and range",
        notes: [
          "The mean is the total of the values divided by how many there are. The median is the middle value when the data is in order. The mode is the most common value.",
          "The range is the largest value minus the smallest — a measure of spread, not an average.",
        ],
        keyFacts: [
          "Mean = sum of values ÷ number of values",
          "Median = middle value (in order)",
          "Mode = most frequent value",
          "Range = highest − lowest",
        ],
        examples: [
          {
            problem: "Find the mean of 4, 7, 7, 10, 12.",
            solution: ["Sum = 4 + 7 + 7 + 10 + 12 = 40.", "There are 5 values, so mean = 40 ÷ 5 = 8."],
          },
          {
            problem: "Find the median of 3, 8, 5, 9, 4.",
            solution: ["Put in order: 3, 4, 5, 8, 9.", "The middle value is 5."],
          },
        ],
      },
      {
        heading: "Representing data",
        notes: [
          "Bar charts compare categories; line graphs show change over time; pie charts show proportions of a whole.",
          "In a pie chart, the whole circle (360°) represents the total frequency. Each slice angle = (frequency ÷ total) × 360°.",
        ],
        keyFacts: ["Pie chart angle = (frequency ÷ total) × 360°"],
        examples: [
          {
            problem: "In a survey of 40 people, 10 chose football. Find the pie-chart angle.",
            solution: ["Angle = (10 ÷ 40) × 360°.", "= 0.25 × 360° = 90°."],
          },
        ],
      },
    ],
  },
  {
    id: "probability",
    title: "Probability",
    strand: "Statistics & Probability",
    summary: "Probability scale, calculating probabilities and listing outcomes.",
    sections: [
      {
        heading: "The probability scale",
        notes: [
          "Probability measures how likely an event is, on a scale from 0 (impossible) to 1 (certain). It can be written as a fraction, decimal or percentage.",
          "For equally likely outcomes, probability = number of favourable outcomes ÷ total number of outcomes.",
        ],
        keyFacts: [
          "P(event) = favourable outcomes ÷ total outcomes",
          "All probabilities of an experiment add up to 1.",
          "P(not A) = 1 − P(A)",
        ],
        examples: [
          {
            problem: "A bag has 3 red and 5 blue counters. Find P(red).",
            solution: ["There are 3 + 5 = 8 counters.", "P(red) = 3/8."],
          },
          {
            problem: "If P(rain) = 0.3, find P(no rain).",
            solution: ["P(no rain) = 1 − 0.3 = 0.7."],
          },
        ],
      },
      {
        heading: "Listing outcomes",
        notes: [
          "A sample space lists all possible outcomes. For two events, a sample-space diagram (grid) is useful.",
          "When two fair dice are rolled there are 6 × 6 = 36 equally likely outcomes.",
        ],
        examples: [
          {
            problem: "Two coins are flipped. Find P(two heads).",
            solution: [
              "Outcomes: HH, HT, TH, TT — four in total.",
              "Only HH has two heads, so P(two heads) = 1/4.",
            ],
          },
        ],
      },
    ],
  },
];
