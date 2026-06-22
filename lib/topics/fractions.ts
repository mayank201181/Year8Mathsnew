import type { Topic } from "../types";

export const fractions: Topic = {
  id: "fractions",
  title: "Fractions",
  subject: "Maths",
  icon: "½",
  strand: "Number",
  intro:
    "A fraction is a single number that measures a part of a whole. Master equivalence, a common denominator and the 'flip-and-multiply' rule, and the four operations become one connected toolkit.",
  guide: [
    {
      heading: "Equivalent fractions and simplifying",
      discovery: {
        problem:
          "Fold a strip of paper in half, then in half again, then again. Shade one of the eight pieces. Without unfolding the last fold, how many of the four 'quarters' are shaded — and what does that tell you about ²⁄₈?",
        idea: "²⁄₈ shades the same length as ¼: multiplying or dividing top and bottom by the same number never changes a fraction's value. ²⁄₈ = ¼ in simplest form (divide both by 2).",
      },
      body:
        "Two fractions are **equivalent** when they mark the same point on the number line. You get an equivalent fraction by multiplying *or* dividing the numerator and denominator by the **same** non-zero number.\n\nTo **simplify** (write in lowest terms), divide top and bottom by their **HCF**.\n\n    18⁄24 → divide by HCF 6 → 3⁄4\n\nA fraction is *fully* simplified when the numerator and denominator are coprime (share no common factor but 1).",
      keyPoints: [
        "Multiply/divide top AND bottom by the same number → equivalent fraction.",
        "Simplest form: divide both by their HCF.",
        "Fully simplified ⇔ numerator and denominator are coprime.",
        "The value (the point on the number line) never changes.",
      ],
      strategies: ["Draw a diagram (fraction bar)", "Use the HCF", "Cancel in stages"],
      whyItWorks:
        "Multiplying top and bottom by k means a⁄b = (a×k)⁄(b×k): you have cut every piece into k smaller pieces AND taken k times as many, so the shaded amount is identical.",
    },
    {
      heading: "Comparing, ordering and a common denominator",
      discovery: {
        problem:
          "Which is bigger, ⅝ or ⅔? Eyeballing is risky. Rewrite both with the SAME denominator and the answer becomes obvious.",
        idea: "Use a common denominator of 24: ⅝ = 15⁄24 and ⅔ = 16⁄24. Now compare numerators: 16 > 15, so ⅔ is bigger. A common denominator turns 'compare fractions' into 'compare whole numbers'.",
      },
      body:
        "To compare or order fractions, rewrite them over a **common denominator** — the LCM of the denominators is tidiest — then just compare numerators.\n\nA quick check for two fractions is **cross-multiplication**: a⁄b vs c⁄d → compare a×d with b×c.\n\nThe same common-denominator idea is exactly what you need for adding and subtracting.",
      keyPoints: [
        "Common denominator → compare numerators.",
        "LCM of denominators gives the neatest common denominator.",
        "Cross-multiply to compare just two fractions quickly.",
        "Bigger numerator over the same denominator = bigger fraction.",
      ],
      strategies: ["Find a common denominator", "Cross-multiply", "Use the LCM"],
      whyItWorks:
        "Cross-multiplication works because a⁄b = ad⁄bd and c⁄d = bc⁄bd. With the same denominator bd, the fractions rank exactly as ad ranks against bc.",
    },
    {
      heading: "Adding and subtracting (incl. mixed numbers)",
      discovery: {
        problem:
          "Try ⅓ + ¼ by 'adding tops and bottoms' to get 2⁄7. Now shade ⅓ and ¼ of the same bar. Is the total really 2⁄7 (which is less than ⅓)? What went wrong?",
        idea: "You cannot add fractions until the pieces are the same size. Over a common denominator of 12: ⅓ + ¼ = 4⁄12 + 3⁄12 = 7⁄12. Never add the denominators.",
      },
      body:
        "**Add/subtract:** put both fractions over a common denominator, then add or subtract the numerators — keep the denominator the same — and simplify.\n\n    ⅚ − ¼ = 10⁄12 − 3⁄12 = 7⁄12\n\nFor **mixed numbers**, either add the whole parts and fraction parts separately, or convert each to an improper fraction first. Subtraction sometimes needs *borrowing*: 3¼ − 1⅔ = 13⁄4 − 5⁄3 = 39⁄12 − 20⁄12 = 19⁄12 = 1⁷⁄₁₂.",
      keyPoints: [
        "Common denominator first; then add/subtract numerators only.",
        "Never add denominators.",
        "Mixed numbers: convert to improper or handle parts separately.",
        "Simplify the final answer and convert back to a mixed number if asked.",
      ],
      strategies: ["Find a common denominator", "Convert to improper fractions", "Draw a diagram"],
      whyItWorks:
        "Once the denominator is shared, every piece is the same size, so the total number of pieces is simply the sum (or difference) of the numerators — like adding apples to apples.",
    },
    {
      heading: "Multiplying, dividing and reciprocals",
      discovery: {
        problem:
          "How many ¼-cups of flour are in ¾ of a cup? Don't reach for a rule — picture three quarter-cups making up ¾. Now what is ¾ ÷ ¼?",
        idea: "There are exactly 3, so ¾ ÷ ¼ = 3. Dividing by ¼ is the same as multiplying by 4 (its reciprocal). To divide by a fraction, flip it and multiply.",
      },
      body:
        "**Multiply:** multiply the numerators and multiply the denominators — cancel common factors first to keep numbers small. ⅔ × ⁹⁄₁₀ = (cancel 3 and 9, 2 and 10) = ³⁄₅.\n\nThe **reciprocal** of a⁄b is b⁄a (swap top and bottom); the reciprocal of 5 is ⅕. A number times its reciprocal is 1.\n\n**Divide:** multiply by the reciprocal of the second fraction — *Keep, Change, Flip*. ⅗ ÷ ⅔ = ⅗ × ³⁄₂ = ⁹⁄₁₀.\n\nA **fraction of an amount** is just multiplication: ⅜ of 240 = 240 ÷ 8 × 3 = 90.",
      keyPoints: [
        "Multiply: tops × tops, bottoms × bottoms (cancel first).",
        "Reciprocal: swap numerator and denominator; n × its reciprocal = 1.",
        "Divide: Keep, Change, Flip — multiply by the reciprocal.",
        "'Fraction of' an amount = multiply by the fraction.",
      ],
      strategies: ["Cancel before multiplying", "Keep–Change–Flip", "Use a unit fraction first"],
      whyItWorks:
        "Dividing by ⅔ asks 'how many ⅔s fit in?'. Scaling up by 3 then sharing by 2 (×3 then ÷2, i.e. ×3⁄2) answers exactly that — which is why dividing by a fraction is multiplying by its reciprocal.",
      thinkDeeper:
        "Multiplying a positive number by a fraction less than 1 makes it *smaller*, and dividing by a fraction less than 1 makes it *bigger* — the opposite of what whole-number intuition expects.",
    },
  ],
  learn: {
    cards: [
      { front: "How do you simplify a fraction?", back: "Divide the numerator and denominator by their HCF." },
      { front: "Simplify 18⁄24", back: "Divide both by HCF 6 → 3⁄4." },
      { front: "How do you add fractions?", back: "Rewrite over a common denominator, add the numerators, keep the denominator, simplify." },
      { front: "⅓ + ¼ = ?", back: "4⁄12 + 3⁄12 = 7⁄12." },
      { front: "Rule for multiplying fractions", back: "Multiply tops, multiply bottoms (cancel common factors first)." },
      { front: "Reciprocal of a⁄b", back: "b⁄a — swap numerator and denominator. (Reciprocal of 5 is ⅕.)" },
      { front: "How do you divide by a fraction?", back: "Keep, Change, Flip — multiply by the reciprocal of the second fraction." },
      { front: "⅗ ÷ ⅔ = ?", back: "⅗ × ³⁄₂ = ⁹⁄₁₀." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "fractions-mcq-q01",
        question: "Simplify 16⁄40 to its lowest terms.",
        options: ["2⁄5", "4⁄10", "8⁄20", "1⁄3"],
        answerIndex: 0,
        explanation: "HCF(16, 40) = 8; 16÷8 = 2 and 40÷8 = 5, giving 2⁄5.",
        difficulty: "warmup",
        guideRef: "Equivalent fractions and simplifying",
        strategy: "Use the HCF",
      },
      {
        id: "fractions-mcq-q02",
        question: "Work out ⅖ + ¼.",
        options: ["13⁄20", "3⁄9", "6⁄20", "3⁄20"],
        answerIndex: 0,
        explanation: "Common denominator 20: 8⁄20 + 5⁄20 = 13⁄20.",
        difficulty: "core",
        guideRef: "Adding and subtracting (incl. mixed numbers)",
        hints: ["Find the LCM of 5 and 4.", "Rewrite both over 20.", "8⁄20 + 5⁄20."],
        strategy: "Find a common denominator",
      },
      {
        id: "fractions-mcq-q03",
        question: "Work out ⅔ × ⁹⁄₁₀, giving your answer in simplest form.",
        options: ["3⁄5", "11⁄13", "18⁄30", "6⁄5"],
        answerIndex: 0,
        explanation: "Cancel: 3 into 9 and 2 into 10 → (1×3)⁄(1×5) = 3⁄5.",
        difficulty: "core",
        guideRef: "Multiplying, dividing and reciprocals",
        hints: ["Cancel common factors before multiplying.", "3 divides into 9; 2 divides into 10.", "Left with 1⁄1 × 3⁄5."],
        strategy: "Cancel before multiplying",
      },
      {
        id: "fractions-mcq-q04",
        question: "Work out ⅗ ÷ ⅔.",
        options: ["9⁄10", "2⁄5", "6⁄15", "5⁄6"],
        answerIndex: 0,
        explanation: "Keep, Change, Flip: ⅗ × ³⁄₂ = 9⁄10.",
        difficulty: "core",
        guideRef: "Multiplying, dividing and reciprocals",
        hints: ["Dividing by a fraction = multiply by its reciprocal.", "Flip ⅔ to ³⁄₂.", "⅗ × ³⁄₂."],
        strategy: "Keep–Change–Flip",
      },
      {
        id: "fractions-mcq-q05",
        question: "Which is the largest fraction: ⅔, ¾ or ⅘?",
        options: ["⅔", "¾", "⅘", "They are equal"],
        answerIndex: 2,
        explanation: "Over denominator 60: ⅔ = 40⁄60, ¾ = 45⁄60, ⅘ = 48⁄60. Largest is 48⁄60 = ⅘.",
        difficulty: "core",
        guideRef: "Comparing, ordering and a common denominator",
        hints: ["Use a common denominator (LCM of 3, 4, 5 = 60).", "Convert each and compare numerators."],
        strategy: "Find a common denominator",
      },
      {
        id: "fractions-mcq-q06",
        question:
          "A jug is ⅗ full. After pouring out ¼ of a litre it is ½ full. What is the jug's full capacity?",
        options: ["2½ litres", "1¼ litres", "5 litres", "1¾ litres"],
        answerIndex: 0,
        explanation: "The amount poured equals ⅗ − ½ = 6⁄10 − 5⁄10 = 1⁄10 of the jug. So 1⁄10 of capacity = ¼ L, giving capacity = ¼ × 10 = 2½ L.",
        difficulty: "challenge",
        guideRef: "Multiplying, dividing and reciprocals",
        hints: ["The ¼ litre is the DROP in fullness, ⅗ down to ½.", "Find ⅗ − ½ as a fraction of the jug.", "That fraction equals ¼ L; scale up to the whole."],
        strategy: "Work backwards",
      },
    ],
    qa: [
      {
        id: "fractions-qa-q01",
        question: "Work out 3¼ − 1⅔, giving your answer as a mixed number in simplest form. Show your working.",
        modelAnswer:
          "Convert: 3¼ = 13⁄4, 1⅔ = 5⁄3. Common denominator 12: 39⁄12 − 20⁄12 = 19⁄12 = 1⁷⁄₁₂.",
        markScheme: [
          "Convert to improper fractions 13⁄4 and 5⁄3 [1]",
          "Common denominator: 39⁄12 − 20⁄12 [1]",
          "= 19⁄12 [1]",
          "= 1⁷⁄₁₂ [1]",
        ],
        commonError: "Subtracting whole parts and fraction parts separately and getting stuck because ¼ < ⅔ (needs borrowing).",
        difficulty: "core",
        guideRef: "Adding and subtracting (incl. mixed numbers)",
        hints: ["Turn both mixed numbers into improper fractions.", "Use a common denominator of 12.", "Convert 19⁄12 back to a mixed number."],
        strategy: "Convert to improper fractions",
      },
      {
        id: "fractions-qa-q02",
        question: "Find ⅜ of 240 grams.",
        modelAnswer: "240 ÷ 8 = 30, then 30 × 3 = 90. So ⅜ of 240 g = 90 g.",
        markScheme: ["240 ÷ 8 = 30 (one eighth) [1]", "30 × 3 = 90 g [1]"],
        difficulty: "warmup",
        guideRef: "Multiplying, dividing and reciprocals",
        hints: ["Find one eighth first.", "Then multiply by 3."],
        strategy: "Use a unit fraction first",
      },
      {
        id: "fractions-qa-q03",
        question:
          "A recipe needs ⅔ cup of sugar. You only have a ¼-cup scoop. How many full scoops, and how much extra, make ⅔ cup? Show your reasoning.",
        modelAnswer:
          "⅔ ÷ ¼ = ⅔ × 4 = 8⁄3 = 2⅔. So 2 full scoops give 2 × ¼ = ½ cup, and you still need ⅔ − ½ = 4⁄6 − 3⁄6 = 1⁄6 cup more (which is ⅔ of a scoop).",
        markScheme: [
          "⅔ ÷ ¼ = 8⁄3 = 2⅔ scoops [1]",
          "2 full scoops = ½ cup [1]",
          "Remaining = ⅔ − ½ = 1⁄6 cup [1]",
        ],
        difficulty: "core",
        guideRef: "Multiplying, dividing and reciprocals",
        hints: ["'How many ¼s in ⅔' is a division.", "Keep–Change–Flip: ⅔ × 4.", "The whole-number part is the full scoops."],
        strategy: "Keep–Change–Flip",
        solutions: [
          {
            label: "Division method",
            steps: [
              "⅔ ÷ ¼ = ⅔ × 4 = 8⁄3 = 2⅔",
              "Whole part 2 = full scoops; 2 × ¼ = ½ cup used",
              "Extra needed = ⅔ − ½ = 1⁄6 cup",
            ],
          },
          {
            label: "Common-denominator (counting) method",
            steps: [
              "Write both over 12: ⅔ = 8⁄12 and ¼ = 3⁄12",
              "8⁄12 ÷ 3⁄12 = 8 ÷ 3 = 2 remainder 2",
              "2 full scoops, with 2⁄12 = 1⁄6 cup left to add",
            ],
          },
        ],
      },
      {
        id: "fractions-qa-q04",
        question:
          "Challenge: Of the children in a club, ⅓ play chess and ¼ play chess AND draughts. What fraction of the chess players also play draughts? Give your answer in simplest form.",
        modelAnswer:
          "The fraction of chess players who also play draughts = (those doing both) ÷ (chess players) = ¼ ÷ ⅓ = ¼ × 3 = 3⁄4. So ¾ of the chess players also play draughts.",
        markScheme: [
          "Recognises this is (both) ÷ (chess) [1]",
          "¼ ÷ ⅓ = ¼ × 3 [1]",
          "= 3⁄4 [1]",
        ],
        commonError: "Subtracting ¼ from ⅓ instead of dividing — the question asks for a fraction OF the chess players.",
        difficulty: "challenge",
        guideRef: "Multiplying, dividing and reciprocals",
        hints: ["'What fraction of A is B' means B ÷ A.", "Here A = ⅓ (chess), B = ¼ (both).", "¼ ÷ ⅓ = ¼ × 3."],
        strategy: "Translate the words (a fraction OF)",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "fractions-mcq-paper-1",
        title: "Fractions — MCQ Set A",
        questions: [
          {
            id: "fractions-mcq-b1-q01",
            question: "Which fraction is equivalent to ¾?",
            options: ["6⁄8", "9⁄16", "7⁄8", "6⁄9"],
            answerIndex: 0,
            explanation: "Multiply top and bottom of ¾ by 2 → 6⁄8.",
            difficulty: "warmup",
          },
          {
            id: "fractions-mcq-b1-q02",
            question: "Write 4⅖ as an improper fraction.",
            options: ["22⁄5", "8⁄5", "20⁄5", "6⁄5"],
            answerIndex: 0,
            explanation: "4 × 5 + 2 = 22, over 5 → 22⁄5.",
            difficulty: "warmup",
          },
          {
            id: "fractions-mcq-b1-q03",
            question: "Work out ⅚ − ½.",
            options: ["1⁄3", "4⁄4", "3⁄4", "1⁄6"],
            answerIndex: 0,
            explanation: "Common denominator 6: 5⁄6 − 3⁄6 = 2⁄6 = 1⁄3.",
            difficulty: "core",
            hints: ["Common denominator is 6.", "Rewrite ½ as 3⁄6, then subtract and simplify."],
            strategy: "Find a common denominator",
          },
          {
            id: "fractions-mcq-b1-q04",
            question: "What is the reciprocal of 2⅓?",
            options: ["3⁄7", "7⁄3", "1⁄7", "3⁄2"],
            answerIndex: 0,
            explanation: "2⅓ = 7⁄3; the reciprocal swaps it to 3⁄7.",
            difficulty: "core",
            hints: ["Convert the mixed number to an improper fraction first.", "Then swap numerator and denominator."],
            strategy: "Convert to improper fractions",
          },
          {
            id: "fractions-mcq-b1-q05",
            question: "Work out ⅘ of 35.",
            options: ["28", "20", "7", "31"],
            answerIndex: 0,
            explanation: "35 ÷ 5 = 7, then 7 × 4 = 28.",
            difficulty: "core",
            hints: ["Find ⅕ of 35 first.", "Then multiply by 4."],
            strategy: "Use a unit fraction first",
          },
          {
            id: "fractions-mcq-b1-q06",
            question:
              "After spending ⅓ of her money and then ¼ of what remained, Anya has £36 left. How much did she start with?",
            options: ["£72", "£60", "£48", "£54"],
            answerIndex: 0,
            explanation: "After ⅓ spent, ⅔ remains. Spending ¼ of that leaves ¾ × ⅔ = ½ of the original. So ½ = £36 → start = £72.",
            difficulty: "challenge",
            hints: ["After spending ⅓, what fraction remains?", "She then keeps ¾ of that remainder.", "¾ × ⅔ = ½ of the start = £36."],
            strategy: "Work backwards",
          },
        ],
      },
      {
        id: "fractions-mcq-paper-2",
        title: "Fractions — MCQ Set B",
        questions: [
          {
            id: "fractions-mcq-b2-q01",
            question: "Simplify 24⁄36.",
            options: ["2⁄3", "3⁄4", "4⁄6", "6⁄9"],
            answerIndex: 0,
            explanation: "HCF(24, 36) = 12; 24÷12 = 2, 36÷12 = 3 → 2⁄3.",
            difficulty: "warmup",
          },
          {
            id: "fractions-mcq-b2-q02",
            question: "Which symbol makes this true: ⅗ ☐ ⅖?",
            options: [">", "<", "=", "≤"],
            answerIndex: 0,
            explanation: "Same denominator: 3⁄5 vs 2⁄5, and 3 > 2, so ⅗ > ⅖.",
            difficulty: "warmup",
          },
          {
            id: "fractions-mcq-b2-q03",
            question: "Work out 1½ × ⅔.",
            options: ["1", "2⁄6", "5⁄6", "3⁄2"],
            answerIndex: 0,
            explanation: "1½ = 3⁄2; 3⁄2 × 2⁄3 = 6⁄6 = 1 (the numbers are reciprocals).",
            difficulty: "core",
            hints: ["Convert 1½ to 3⁄2.", "Multiply and cancel — notice 3⁄2 and ⅔ are reciprocals."],
            strategy: "Cancel before multiplying",
          },
          {
            id: "fractions-mcq-b2-q04",
            question: "Work out 2¼ ÷ 1½.",
            options: ["1½", "3⁄8", "3⅜", "2⁄3"],
            answerIndex: 0,
            explanation: "2¼ = 9⁄4, 1½ = 3⁄2. 9⁄4 ÷ 3⁄2 = 9⁄4 × 2⁄3 = 18⁄12 = 3⁄2 = 1½.",
            difficulty: "core",
            hints: ["Convert both to improper fractions.", "Keep–Change–Flip with ³⁄₂ → ²⁄₃.", "Simplify 18⁄12."],
            strategy: "Keep–Change–Flip",
          },
          {
            id: "fractions-mcq-b2-q05",
            question: "Put in ascending order: ½, ⅗, ⁷⁄₁₀.",
            options: ["½, ⅗, ⁷⁄₁₀", "⅗, ½, ⁷⁄₁₀", "⁷⁄₁₀, ⅗, ½", "½, ⁷⁄₁₀, ⅗"],
            answerIndex: 0,
            explanation: "Over 10: ½ = 5⁄10, ⅗ = 6⁄10, ⁷⁄₁₀ = 7⁄10. So ½ < ⅗ < ⁷⁄₁₀.",
            difficulty: "core",
            hints: ["Use a common denominator of 10.", "Compare the numerators 5, 6, 7."],
            strategy: "Find a common denominator",
          },
          {
            id: "fractions-mcq-b2-q06",
            question:
              "Find a fraction exactly halfway between ⅓ and ½.",
            options: ["5⁄12", "2⁄5", "1⁄4", "3⁄8"],
            answerIndex: 0,
            explanation: "The midpoint is the mean: (⅓ + ½) ÷ 2 = (4⁄12 + 6⁄12) ÷ 2 = 10⁄12 ÷ 2 = 5⁄12.",
            difficulty: "challenge",
            hints: ["Halfway = the average of the two.", "Add them over a common denominator, then halve.", "(4⁄12 + 6⁄12) ÷ 2."],
            strategy: "Use the mean (average)",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "fractions-qa-paper-1",
        title: "Fractions — Written Set A",
        questions: [
          {
            id: "fractions-qa-b1-q01",
            question: "Work out ⅔ + ⅙, giving your answer in simplest form.",
            modelAnswer: "Common denominator 6: 4⁄6 + 1⁄6 = 5⁄6.",
            markScheme: ["Rewrite ⅔ as 4⁄6 [1]", "4⁄6 + 1⁄6 = 5⁄6 [1]"],
            difficulty: "warmup",
          },
          {
            id: "fractions-qa-b1-q02",
            question:
              "A bag holds 60 sweets: ⅓ are red, ¼ are green and the rest are yellow. How many sweets are yellow?",
            modelAnswer:
              "Red = ⅓ × 60 = 20; green = ¼ × 60 = 15. Yellow = 60 − 20 − 15 = 25. (Or: red+green = ⅓+¼ = 7⁄12, so yellow = 5⁄12 × 60 = 25.)",
            markScheme: [
              "Red = 20 and green = 15 [1]",
              "Yellow = 60 − 35 [1]",
              "= 25 sweets [1]",
            ],
            difficulty: "core",
            hints: ["Find the red and green amounts separately.", "Subtract both from 60 — or find the yellow fraction first."],
            strategy: "Fraction of an amount",
          },
          {
            id: "fractions-qa-b1-q03",
            question:
              "Challenge: ⅗ of a number is 24. What is ⅞ of the same number? Show your method.",
            modelAnswer:
              "If ⅗ of n = 24 then ⅕ of n = 24 ÷ 3 = 8, so n = 8 × 5 = 40. Then ⅞ of 40 = 40 ÷ 8 × 7 = 35.",
            markScheme: [
              "⅕ of n = 8, so n = 40 [1]",
              "⅞ of 40 = 40 ÷ 8 × 7 [1]",
              "= 35 [1]",
            ],
            commonError: "Taking ⅞ of 24 instead of first finding the whole number n.",
            difficulty: "challenge",
            hints: ["Work back to the whole number first.", "If ⅗ = 24, then ⅕ = 8.", "Then take ⅞ of that whole."],
            strategy: "Work backwards",
          },
          {
            id: "fractions-qa-b1-q04",
            question:
              "Challenge: Show that ⅓ + ¹⁄₁₂ + ¹⁄₃₆ can be written as a single fraction, and explain whether the running total ever reaches ½.",
            modelAnswer:
              "Common denominator 36: ¹²⁄₃₆ + ³⁄₃₆ + ¹⁄₃₆ = ¹⁶⁄₃₆ = ⁴⁄₉. Since ⁴⁄₉ = ⁸⁄₁₈ and ½ = ⁹⁄₁₈, the total ⁴⁄₉ is just under ½. Each new term is a third of the one before (⅓, then ÷3 each time), so the total creeps toward but never reaches ½.",
            markScheme: [
              "Uses common denominator 36 [1]",
              "Sum = 16⁄36 = 4⁄9 [1]",
              "Compares 4⁄9 with ½ correctly (4⁄9 < ½) [1]",
              "Notes the terms shrink by a factor of 3 so the total stays below ½ [1]",
            ],
            difficulty: "challenge",
            hints: ["Put everything over 36.", "Simplify the total, then compare with ½ using a common denominator.", "Look at how each term relates to the one before."],
            strategy: "Find a pattern (geometric terms)",
          },
        ],
      },
    ],
  },
};
