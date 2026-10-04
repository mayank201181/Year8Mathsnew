// ---------------------------------------------------------------------------
// Topic registry: order, strand, icon and the fixed guide-section outline.
// Section ids here are the contract shared by guide authors (who must use
// them) and question / drill authors (whose guideRef must point at them).
// Pure data — safe to import from Node scripts.
// ---------------------------------------------------------------------------
import type { Strand } from "../types.ts";

export interface SectionPlan {
  id: string;
  heading: string;
  /** What this section must teach. */
  covers: string;
  /** Stage 9 / Year 9 look-ahead. */
  stretch?: boolean;
}

export interface TopicMeta {
  id: string;
  title: string;
  strand: Strand;
  icon: string;
  /** Cambridge Stage 8 objective codes / White Rose blocks this topic covers. */
  curriculum: string;
  sections: SectionPlan[];
}

export const STRANDS: Strand[] = [
  "Number",
  "Ratio & Proportion",
  "Algebra",
  "Geometry & Measure",
  "Statistics & Probability",
];

export const TOPIC_META: TopicMeta[] = [
  // ------------------------------- NUMBER ---------------------------------
  {
    id: "integers-powers",
    title: "Integers, Powers & Roots",
    strand: "Number",
    icon: "🌡️",
    curriculum: "Cambridge 8Ni.01, 8Ni.02, 8Ni.04–07; WR8 Indices",
    sections: [
      { id: "adding-subtracting-negatives", heading: "Adding & subtracting negative numbers", covers: "Number line model, 'subtracting a negative', temperature/bank contexts, generalisations." },
      { id: "multiplying-dividing-negatives", heading: "Multiplying & dividing negative numbers", covers: "Sign rules derived from patterns, products of several negatives, estimating integer calculations." },
      { id: "order-of-operations", heading: "Order of operations", covers: "Brackets, indices/roots, ×÷, +− with negatives; e.g. √4 + 16 × 2; common calculator slips." },
      { id: "squares-cubes-roots", heading: "Squares, cubes and roots", covers: "Squares of negatives, ± square roots, negative cubes and cube roots, estimating √50 between integers." },
      { id: "index-laws", heading: "Powers and the index laws", covers: "Index notation, zero index, a^m × a^n and a^m ÷ a^n with numbers and letters, power of a power." },
      { id: "types-of-number", heading: "Types of number", covers: "Natural numbers ⊂ integers ⊂ rational numbers; classifying numbers; irrational teaser (√2, π)." },
      { id: "negative-indices", heading: "Negative indices", covers: "Extending the pattern below zero: a^−n = 1/a^n; powers of 10.", stretch: true },
    ],
  },
  {
    id: "factors-multiples",
    title: "Factors, Multiples & Primes",
    strand: "Number",
    icon: "🧩",
    curriculum: "Cambridge 8Ni.03; SG Sec 1 primes",
    sections: [
      { id: "factors-multiples-primes", heading: "Factors, multiples and primes", covers: "Vocabulary, factor pairs, primes vs composites, 1 is not prime, divisibility tests for 2,3,4,5,6,8,9,10." },
      { id: "prime-factorisation", heading: "Prime factorisation", covers: "Factor trees and the ladder method, index form, uniqueness of prime factorisation." },
      { id: "hcf-lcm", heading: "HCF and LCM", covers: "Listing method and the prime-factor Venn diagram method; HCF × LCM = product for two numbers." },
      { id: "hcf-lcm-problems", heading: "HCF and LCM problems", covers: "Recognising HCF vs LCM in context: buses, tiles, packs, flashing lights, cutting ribbons." },
      { id: "squares-cubes-from-primes", heading: "Squares, cubes and roots from prime factors", covers: "Square numbers have even powers; finding √ and ∛ via prime factors; smallest multiplier to make a square." },
      { id: "counting-factors", heading: "Counting factors", covers: "Number of factors from index form (a+1)(b+1)…; why squares have an odd number of factors.", stretch: true },
    ],
  },
  {
    id: "standard-form",
    title: "Powers of 10 & Standard Form",
    strand: "Number",
    icon: "🔭",
    curriculum: "Cambridge 8Np.01, 9Ni.03; WR8 Standard index form",
    sections: [
      { id: "multiplying-dividing-by-powers-of-ten", heading: "Multiplying & dividing by 10, 100, 0.1 and 0.01", covers: "Place-value shifts; ×0.1 = ÷10 and ÷0.01 = ×100; common misconceptions about 'adding zeros'." },
      { id: "powers-of-ten", heading: "Positive and negative powers of 10", covers: "10^3, 10^0 = 1, 10^−2 = 0.01; place value headings as powers of 10." },
      { id: "large-numbers", heading: "Standard form for large numbers", covers: "A × 10^n with 1 ≤ A < 10; converting both ways; planets, populations, data sizes." },
      { id: "small-numbers", heading: "Standard form for small numbers", covers: "Negative powers; converting both ways; cells, atoms, seconds." },
      { id: "comparing-standard-form", heading: "Comparing and ordering in standard form", covers: "Compare powers first then A; reading calculator displays (E notation)." },
      { id: "calculating-standard-form", heading: "Calculating in standard form", covers: "Multiply/divide using index laws then re-normalise; add/subtract by converting.", stretch: true },
    ],
  },
  {
    id: "fractions",
    title: "Fractions",
    strand: "Number",
    icon: "🍕",
    curriculum: "Cambridge 8Nf.02–04, 8Nf.06; WR8 Multiplying & dividing fractions",
    sections: [
      { id: "equivalence-ordering", heading: "Equivalent fractions, comparing & ordering", covers: "Simplifying with the HCF, common denominators, ordering positive and negative fractions with <, >, ≤, ≥, ≠." },
      { id: "adding-subtracting", heading: "Adding & subtracting fractions and mixed numbers", covers: "Common denominators, mixed numbers incl. borrowing, answers as simplest mixed numbers, estimating first." },
      { id: "multiplying", heading: "Multiplying fractions", covers: "Area model, cancelling first, integer × mixed number, fraction of a fraction." },
      { id: "dividing", heading: "Dividing fractions and reciprocals", covers: "'How many fit?' model, reciprocals, integer ÷ proper fraction, fraction ÷ fraction, mixed numbers." },
      { id: "fractions-of-amounts", heading: "Fractions of amounts", covers: "Fraction of a quantity, one quantity as a fraction of another (incl. > 1), finding the whole from a part." },
      { id: "calculating-with-fractions", heading: "Calculating with fractions", covers: "Order of operations and laws of arithmetic with fractions; estimating; multi-step word problems." },
      { id: "algebraic-fractions", heading: "Algebraic fractions", covers: "Multiplying and dividing simple algebraic fractions like x/3 × 6/x.", stretch: true },
    ],
  },
  {
    id: "decimals-rounding",
    title: "Decimals, Rounding & Estimation",
    strand: "Number",
    icon: "🎯",
    curriculum: "Cambridge 8Np.02, 8Nf.01, 8Nf.04, 8Nf.06–08; WR8 Number sense",
    sections: [
      { id: "multiplying-decimals", heading: "Multiplying decimals", covers: "Integer method then place the point, estimating first, decimal × decimal." },
      { id: "dividing-decimals", heading: "Dividing decimals", covers: "Scale both numbers so the divisor is an integer (÷0.4 → ÷4), short division with decimals." },
      { id: "decimal-places", heading: "Rounding to decimal places", covers: "Rounding rules, the 'look at the next digit' method, rounding 9s (2.996 → 3.00)." },
      { id: "significant-figures", heading: "Rounding to significant figures", covers: "First significant figure, zeros as place holders, 0.004 56 → 0.0046 (2 s.f.), large numbers keep their size." },
      { id: "estimation", heading: "Estimation", covers: "Round to 1 s.f. to estimate, over/under-estimates, checking calculator answers." },
      { id: "recurring-decimals", heading: "Fractions, decimals & recurring decimals", covers: "Terminating vs recurring, dot notation, which denominators terminate (2s and 5s), converting terminating decimals to fractions." },
      { id: "ordering-and-shortcuts", heading: "Ordering decimals & clever calculation", covers: "Ordering positive and negative decimals; laws of arithmetic shortcuts like 4.7 × 9.9 = 4.7 × 10 − 4.7 × 0.1." },
      { id: "error-intervals", heading: "Error intervals", covers: "a ≤ x < b after rounding/truncation.", stretch: true },
    ],
  },
  {
    id: "percentages",
    title: "Percentages",
    strand: "Number",
    icon: "💯",
    curriculum: "Cambridge 8Nf.05; WR8 Fractions & percentages; SG Sec 1",
    sections: [
      { id: "fdp-conversions", heading: "Fractions, decimals & percentages", covers: "Converting all ways, percentages over 100%, ordering mixed forms." },
      { id: "percentage-of-amount", heading: "Percentages of amounts", covers: "Mental methods via 10%/1%/5%, calculator multipliers, non-calculator build-ups." },
      { id: "one-as-percentage-of-another", heading: "One quantity as a percentage of another", covers: "Fraction → percentage, same units first, test scores and comparisons." },
      { id: "multipliers", heading: "Percentage increase & decrease with multipliers", covers: "×1.15 for +15%, ×0.8 for −20%; why a single multiplier works." },
      { id: "percentage-change", heading: "Percentage change vs absolute change", covers: "Change ÷ original × 100; absolute vs relative change; misleading claims." },
      { id: "reverse-percentages", heading: "Reverse percentages", covers: "Finding the original amount by dividing by the multiplier; the classic 'take 20% off the sale price' error." },
      { id: "money-percentages", heading: "Interest, GST, discounts, profit & loss", covers: "Simple interest, GST/VAT, discounts, profit and loss percentages in money contexts." },
      { id: "repeated-change", heading: "Compound interest & repeated change", covers: "Repeated multipliers, compound vs simple interest, why +10% then −10% isn't 0.", stretch: true },
    ],
  },
  // -------------------------- RATIO & PROPORTION ---------------------------
  {
    id: "ratio-proportion",
    title: "Ratio & Proportion",
    strand: "Ratio & Proportion",
    icon: "⚖️",
    curriculum: "Cambridge 8Nf.09–11; WR8 Ratio & scale, Multiplicative change",
    sections: [
      { id: "ratio-basics", heading: "Ratio notation & simplifying", covers: "Simplest form, ratios with mixed units (50 cm : 2 m), decimals/fractions in ratios, the form 1 : n." },
      { id: "sharing-in-a-ratio", heading: "Sharing in a ratio", covers: "Bar models, 2 and 3 part ratios, problems given one share or the difference between shares." },
      { id: "ratios-and-fractions", heading: "Ratios and fractions", covers: "a : b means a/(a+b) of the total; converting between ratio and fraction statements." },
      { id: "direct-proportion", heading: "Direct proportion & best buys", covers: "Unitary method, scaling, best-value comparisons, recognising proportional relationships." },
      { id: "recipes-and-currency", heading: "Recipes & currency conversion", covers: "Scaling recipes (vegetarian), exchange rates both ways." },
      { id: "scale-and-maps", heading: "Scale factors, scale drawings & maps", covers: "Similar shapes and scale factor as multiplier, map scales 1 : n, converting map ↔ real distances." },
      { id: "inverse-proportion", heading: "Inverse proportion", covers: "Workers and days, speed and time; product stays constant.", stretch: true },
    ],
  },
  {
    id: "rates-units",
    title: "Measures, Units & Rates",
    strand: "Ratio & Proportion",
    icon: "🚀",
    curriculum: "Cambridge 8Gg.03; KS3 NC compound units; SG Sec 1 rate & speed",
    sections: [
      { id: "metric-units", heading: "Metric conversions", covers: "Length, mass and capacity; the kilo/centi/milli prefixes; choosing sensible units." },
      { id: "area-volume-units", heading: "Area & volume units", covers: "1 m² = 10 000 cm² (not 100), 1 cm³ = 1 ml, 1000 cm³ = 1 litre, derived with diagrams." },
      { id: "imperial-units", heading: "Miles & kilometres", covers: "1 mile ≈ 1.6 km, 5 miles ≈ 8 km; other common approximate conversions." },
      { id: "time", heading: "Time calculations", covers: "24-hour clock, durations across hours/midnight, hours ↔ minutes as decimals (1.25 h = 1 h 15 min)." },
      { id: "speed", heading: "Speed, distance & time", covers: "S = D/T and rearrangements, km/h ↔ m/s, average speed over multi-part journeys." },
      { id: "density-and-rates", heading: "Density & unit pricing", covers: "Density = mass ÷ volume, rates such as $ per kg and litres per minute, comparing rates." },
      { id: "conversion-graphs", heading: "Conversion graphs", covers: "Reading and drawing conversion graphs; straight line through origin means proportional." },
      { id: "pressure", heading: "Pressure", covers: "Pressure = force ÷ area as another compound measure.", stretch: true },
    ],
  },
  // ------------------------------- ALGEBRA --------------------------------
  {
    id: "expressions",
    title: "Expressions & Formulae",
    strand: "Algebra",
    icon: "🔤",
    curriculum: "Cambridge 8Ae.01–05; WR8 Brackets, Indices",
    sections: [
      { id: "language-of-algebra", heading: "Expressions, equations, formulae & identities", covers: "What letters mean in each, terms, coefficients, ≡ for identities." },
      { id: "simplifying", heading: "Simplifying expressions", covers: "Collecting like terms incl. x² and x³, multiplying/dividing terms, algebraic index laws." },
      { id: "substitution", heading: "Substitution", covers: "Substituting positive, negative and fractional values incl. squares (−3)² vs −3²." },
      { id: "expanding", heading: "Expanding single brackets", covers: "Area model, negatives outside brackets, x(x + 3), expand and simplify sums of brackets." },
      { id: "factorising", heading: "Factorising", covers: "Taking out the HCF incl. letters, 6x² + 9x, checking by expanding." },
      { id: "writing-expressions", heading: "Writing expressions & formulae", covers: "Words → expressions incl. fractional coefficients; forming formulae from contexts." },
      { id: "changing-the-subject", heading: "Changing the subject", covers: "Inverse operations, function-machine view, rearranging formulae with two steps." },
      { id: "double-brackets", heading: "Expanding double brackets", covers: "(x + a)(x + b) with the grid method.", stretch: true },
    ],
  },
  {
    id: "equations",
    title: "Equations & Inequalities",
    strand: "Algebra",
    icon: "🔐",
    curriculum: "Cambridge 8Ae.06–07; WR8 Brackets, equations & inequalities",
    sections: [
      { id: "solving-equations", heading: "Solving one- and two-step equations", covers: "Balance method, inverse operations, negative and fractional solutions, checking by substitution." },
      { id: "equations-with-brackets", heading: "Equations with brackets", covers: "Expand first or divide first — compare methods." },
      { id: "unknowns-both-sides", heading: "Unknowns on both sides", covers: "Collect the unknown on the side with the larger coefficient; negatives." },
      { id: "fractional-equations", heading: "Equations with fractions", covers: "x/3 + 2 = 7, (2x − 1)/5 = 3, clearing denominators." },
      { id: "forming-equations", heading: "Forming and solving equations", covers: "From words, perimeters, angles, ages and consecutive numbers." },
      { id: "inequalities", heading: "Inequalities & number lines", covers: "Symbols, open/closed circles, two-sided intervals like −2 < x ≤ 3, listing integer solutions." },
      { id: "solving-inequalities", heading: "Solving inequalities", covers: "Balance method for inequalities; forming inequalities from contexts." },
      { id: "simultaneous-equations", heading: "Simultaneous equations", covers: "Elimination for simple pairs; the meaning of a solution pair.", stretch: true },
    ],
  },
  {
    id: "sequences-graphs",
    title: "Sequences & Functions",
    strand: "Algebra",
    icon: "🪜",
    curriculum: "Cambridge 8As.01–03; WR8 Sequences",
    sections: [
      { id: "term-to-term", heading: "Term-to-term rules & pattern sequences", covers: "Rules with integers, fractions and decimals; sequences from spatial (matchstick/dot) patterns." },
      { id: "using-nth-term", heading: "Using an nth-term rule", covers: "Generating terms from rules like 3n − 2, n/2 + 1, 20 − 4n." },
      { id: "finding-nth-term", heading: "Finding the nth term", covers: "Linear sequences an ± b with negative/fractional a, b; the 'zero term' trick." },
      { id: "is-it-a-term", heading: "Is it in the sequence?", covers: "Solving an + b = k; first term above/below a value." },
      { id: "special-sequences", heading: "Arithmetic, geometric & special sequences", covers: "Arithmetic vs geometric, square/cube/triangular numbers, Fibonacci-type." },
      { id: "functions", heading: "Functions & function machines", covers: "One input → one output, mappings, finding inputs by inverse operations incl. fractions, function notation f(x)." },
      { id: "quadratic-sequences", heading: "Quadratic sequences", covers: "Second differences; sequences like n² + 1.", stretch: true },
    ],
  },
  {
    id: "linear-graphs",
    title: "Straight-Line & Real-Life Graphs",
    strand: "Algebra",
    icon: "📈",
    curriculum: "Cambridge 8As.04–07, 8Gp.02; WR8 Cartesian plane",
    sections: [
      { id: "coordinates-midpoints", heading: "Coordinates & midpoints", covers: "Four quadrants, midpoint of a segment as the mean of coordinates." },
      { id: "special-lines", heading: "Lines x = a, y = b, y = x and y = −x", covers: "Recognising and drawing horizontal, vertical and diagonal lines." },
      { id: "plotting-lines", heading: "Plotting straight lines", covers: "Tables of values for y = mx + c, plotting, spotting errors in tables." },
      { id: "gradient-intercept", heading: "Gradient & y-intercept", covers: "Gradient as rise/run, positive/negative gradients, y = mx + c meaning of m and c." },
      { id: "equations-of-lines", heading: "Matching & writing line equations", covers: "Match equations to graphs, parallel lines share m, words ↔ y = mx + c." },
      { id: "direct-proportion-graphs", heading: "Direct proportion graphs", covers: "y = kx passes through the origin; k as the gradient/rate." },
      { id: "real-life-graphs", heading: "Real-life & distance–time graphs", covers: "Distance–time graphs (speed = gradient), multi-part graphs, meaning of intersections and shape." },
      { id: "line-through-two-points", heading: "The line through two points", covers: "Find m from two points, then c.", stretch: true },
    ],
  },
  // ------------------------- GEOMETRY & MEASURE ----------------------------
  {
    id: "angles-polygons",
    title: "Angles, Parallel Lines & Polygons",
    strand: "Geometry & Measure",
    icon: "📐",
    curriculum: "Cambridge 8Gg.01, 8Gg.09–11; WR8 Angles in parallel lines & polygons",
    sections: [
      { id: "angle-facts", heading: "Angle facts", covers: "Angles at a point, on a straight line, vertically opposite; giving reasons." },
      { id: "parallel-lines", heading: "Angles in parallel lines", covers: "Alternate, corresponding and co-interior angles; multi-step chains with reasons." },
      { id: "triangles", heading: "Angles in triangles", covers: "Angle sum (with proof), isosceles/equilateral, exterior angle = sum of interior opposite angles." },
      { id: "quadrilaterals", heading: "Quadrilaterals", covers: "Properties incl. diagonals, the hierarchy of quadrilaterals, angle sum 360°." },
      { id: "polygon-angles", heading: "Angles in polygons", covers: "Exterior angles sum to 360°, interior sum (n − 2) × 180°, regular polygons, finding n from an angle." },
      { id: "regular-polygon-symmetry", heading: "Symmetry of regular polygons", covers: "Sides = lines of symmetry = order of rotational symmetry; tessellation." },
      { id: "angle-proofs", heading: "Geometric reasoning & proof", covers: "Short proofs using angle facts, e.g. why the exterior angle fact holds.", stretch: true },
    ],
  },
  {
    id: "constructions-bearings",
    title: "Constructions, Scale Drawings & Bearings",
    strand: "Geometry & Measure",
    icon: "🧭",
    curriculum: "Cambridge 8Gg.12, 8Gp.01; KS3 NC constructions",
    sections: [
      { id: "measuring-angles", heading: "Measuring & drawing angles", covers: "Using a protractor (inner vs outer scale), estimating angles, reflex angles." },
      { id: "constructing-triangles", heading: "Constructing triangles", covers: "SSS, SAS and ASA with ruler, protractor and compasses; when a triangle is impossible (triangle inequality)." },
      { id: "perpendicular-bisector", heading: "Perpendicular bisector & midpoint", covers: "Compass construction and why it works (equidistant points)." },
      { id: "angle-bisector", heading: "Angle bisector & perpendicular from a point", covers: "Constructions and why they work; shortest distance to a line." },
      { id: "bearings", heading: "Three-figure bearings", covers: "Measured clockwise from North, three figures, measuring and drawing bearings." },
      { id: "back-bearings", heading: "Back bearings", covers: "±180° and why (co-interior/alternate angles with parallel North lines)." },
      { id: "scale-drawings", heading: "Scale drawings & maps", covers: "Using scales with bearings to solve journey problems." },
      { id: "loci", heading: "Loci & special angles", covers: "Equidistant from a point/line/two points; constructing 60°, 30°, 90°, 45°.", stretch: true },
    ],
  },
  {
    id: "perimeter-area-volume",
    title: "Area, Surface Area & Volume",
    strand: "Geometry & Measure",
    icon: "📦",
    curriculum: "Cambridge 8Gg.04–08; WR8 Area of trapezia",
    sections: [
      { id: "rectangles-triangles", heading: "Perimeter & area of rectangles and triangles", covers: "Area of a triangle as half a rectangle, perpendicular height, missing lengths." },
      { id: "parallelograms-trapezia", heading: "Parallelograms & trapezia", covers: "Deriving A = bh and A = ½(a + b)h by cutting and rearranging." },
      { id: "compound-shapes", heading: "Compound shapes", covers: "Splitting or subtracting rectilinear shapes; missing side lengths for perimeter." },
      { id: "nets-and-euler", heading: "3D shapes, nets & Euler's formula", covers: "Faces, edges, vertices; nets of prisms/pyramids; V + F − E = 2." },
      { id: "plans-elevations", heading: "Plans & elevations", covers: "Front, side and top views; isometric drawings." },
      { id: "surface-area", heading: "Surface area", covers: "Cubes, cuboids, triangular prisms and square-based pyramids via nets." },
      { id: "volume", heading: "Volume of cuboids & prisms", covers: "Volume = area of cross-section × length; triangular prisms; capacity 1 cm³ = 1 ml." },
      { id: "cylinders", heading: "Cylinders", covers: "Volume and surface area of a cylinder.", stretch: true },
    ],
  },
  {
    id: "circles",
    title: "Circles",
    strand: "Geometry & Measure",
    icon: "⭕",
    curriculum: "Cambridge 8Gg.02, 9Gg.01; WR8 Area of trapezia & circles",
    sections: [
      { id: "parts-of-a-circle", heading: "Parts of a circle", covers: "Radius, diameter, circumference, chord, arc, sector, segment, tangent." },
      { id: "discovering-pi", heading: "Discovering π", covers: "π = circumference ÷ diameter from measurement; π is irrational; approximations 3.14, 22/7." },
      { id: "circumference", heading: "Circumference", covers: "C = πd = 2πr, answers in terms of π or rounded, finding r or d from C." },
      { id: "area-of-a-circle", heading: "Area of a circle", covers: "A = πr² derived by rearranging sectors into a 'parallelogram'; radius vs diameter slips." },
      { id: "semicircles-quarter-circles", heading: "Semicircles & quarter circles", covers: "Area and perimeter (remember the straight edges)." },
      { id: "compound-circle-shapes", heading: "Compound shapes with circles", covers: "Shapes made from rectangles, triangles and circle parts; shaded regions." },
      { id: "arcs-sectors", heading: "Arc length & sector area", covers: "Fractions of a circle: θ/360 × 2πr and θ/360 × πr².", stretch: true },
    ],
  },
  {
    id: "transformations-pythagoras",
    title: "Transformations & Symmetry",
    strand: "Geometry & Measure",
    icon: "🔄",
    curriculum: "Cambridge 8Gp.03–06, 8Gg.09; WR8 Line symmetry & reflection; 9Gg.10 Pythagoras (stretch)",
    sections: [
      { id: "symmetry", heading: "Line & rotational symmetry", covers: "Lines of symmetry, order of rotational symmetry, symmetry of letters/shapes." },
      { id: "translation", heading: "Translations & vectors", covers: "Column vectors, translating shapes, describing a translation; image is congruent." },
      { id: "reflection", heading: "Reflections", covers: "Reflect in x = a, y = b, y = x, y = −x; finding the mirror line." },
      { id: "rotation", heading: "Rotations", covers: "Centre, angle, direction; 90°/180° about a point; finding the centre." },
      { id: "enlargement", heading: "Enlargements", covers: "Positive integer scale factors, centre on/outside the shape, finding scale factor and centre with ray lines." },
      { id: "describing-transformations", heading: "Describing transformations, congruence & similarity", covers: "Fully describing a single transformation; which transformations preserve size/shape." },
      { id: "pythagoras", heading: "Pythagoras' theorem", covers: "a² + b² = c², finding the hypotenuse and a shorter side, a proof by rearrangement.", stretch: true },
    ],
  },
  // ----------------------- STATISTICS & PROBABILITY ------------------------
  {
    id: "statistics",
    title: "Collecting & Representing Data",
    strand: "Statistics & Probability",
    icon: "📊",
    curriculum: "Cambridge 8Ss.01–03, 8Ss.05; WR8 Representing data, Data handling cycle",
    sections: [
      { id: "data-and-sampling", heading: "Data, enquiries & sampling", covers: "Statistical enquiry cycle, categorical/discrete/continuous data, sampling methods with pros/cons, bias, questionnaire design." },
      { id: "tables", heading: "Frequency, grouped & two-way tables", covers: "Tallies, grouped data with inequality classes, two-way tables with missing values." },
      { id: "charts", heading: "Bar charts, pie charts & line graphs", covers: "Dual and compound bar charts, pie chart angles both ways, line and time-series graphs." },
      { id: "stem-and-leaf", heading: "Stem-and-leaf diagrams", covers: "Ordered stem-and-leaf with a key; back-to-back for comparing." },
      { id: "venn-carroll", heading: "Venn & Carroll diagrams", covers: "Sorting data by properties, reading counts from regions." },
      { id: "scatter-graphs", heading: "Scatter graphs & correlation", covers: "Positive/negative/no correlation, line of best fit, predictions and their reliability, correlation ≠ causation." },
      { id: "choosing-and-misleading", heading: "Choosing representations & misleading graphs", covers: "Which chart for which data; truncated axes, uneven scales, 3D pie charts, infographics." },
      { id: "continuous-data", heading: "Frequency diagrams & polygons", covers: "Frequency diagrams for continuous grouped data; frequency polygons plotted at midpoints.", stretch: true },
    ],
  },
  {
    id: "averages-spread",
    title: "Averages, Range & Comparing Data",
    strand: "Statistics & Probability",
    icon: "🧮",
    curriculum: "Cambridge 8Ss.04–05; WR8 Measures of location",
    sections: [
      { id: "mean-median-mode-range", heading: "Mean, median, mode & range", covers: "Calculating each from lists incl. negatives and decimals; median of an even count." },
      { id: "choosing-an-average", heading: "Choosing an average & outliers", covers: "When mean/median/mode is best; effect of outliers; what range tells you." },
      { id: "working-backwards", heading: "Working backwards with the mean", covers: "Total = mean × count; missing values; changing one value." },
      { id: "frequency-tables", heading: "Averages from frequency tables", covers: "Mean from an ungrouped frequency table (fx column), median position, mode." },
      { id: "stem-and-leaf-averages", heading: "Averages from stem-and-leaf diagrams", covers: "Reading median, mode and range straight from the diagram." },
      { id: "comparing-distributions", heading: "Comparing distributions", covers: "Compare an average AND the range, in context, with full sentences; sample size and variation." },
      { id: "grouped-data", heading: "Estimated mean from grouped data", covers: "Midpoints, modal class, why it's an estimate.", stretch: true },
    ],
  },
  {
    id: "probability",
    title: "Probability",
    strand: "Statistics & Probability",
    icon: "🎲",
    curriculum: "Cambridge 8Sp.01–04; WR8 Tables & probability",
    sections: [
      { id: "probability-scale", heading: "The probability scale", covers: "0 to 1, language (impossible…certain), equally likely outcomes, P(event) = favourable/total." },
      { id: "complementary-events", heading: "Complementary & mutually exclusive events", covers: "P(not A) = 1 − P(A); mutually exclusive outcomes sum to 1; missing probabilities in tables." },
      { id: "sample-spaces", heading: "Listing outcomes & sample spaces", covers: "Systematic listing, sample space diagrams for two dice/spinners, the product rule for counting." },
      { id: "combined-events", heading: "Probability of combined events", covers: "Theoretical probabilities from sample spaces for equally likely combined outcomes." },
      { id: "two-way-tables-venn", heading: "Two-way tables & Venn diagrams", covers: "Finding probabilities from two-way tables and Venn diagrams." },
      { id: "relative-frequency", heading: "Experiments & relative frequency", covers: "Relative frequency as an estimate, why more trials help, comparing with theory, fairness of dice." },
      { id: "expected-outcomes", heading: "Expected outcomes", covers: "Expected number = probability × number of trials." },
      { id: "tree-diagrams", heading: "Tree diagrams & independence", covers: "Two-stage tree diagrams for independent events; multiply along branches.", stretch: true },
    ],
  },
];

export function metaById(id: string): TopicMeta | undefined {
  return TOPIC_META.find((t) => t.id === id);
}
