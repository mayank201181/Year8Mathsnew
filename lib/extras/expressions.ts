import type { TopicExtras } from "../types";

export const expressionsExtras: TopicExtras = {
  topicId: "expressions",
  hook:
    "A single letter can stand for any number at once. That is the superpower of algebra: write a rule with x and it works for every value forever — which is exactly how spreadsheets, games and calculators do their magic.",
  didYouKnow: [
    "The word 'algebra' comes from the Arabic 'al-jabr' in a 9th-century book by al-Khwarizmi — it means 'reuniting broken parts', which is exactly what collecting like terms does.",
    "We use x for the unknown partly thanks to René Descartes, who in 1637 chose letters near the end of the alphabet (x, y, z) for unknowns and letters near the start (a, b, c) for known values.",
    "Every formula in a spreadsheet is algebra in disguise: =5+3*B2 is just the expression 5 + 3b being evaluated for whatever number sits in cell B2.",
    "The distributive law a(b + c) = ab + ac that powers expanding brackets is also how your brain does mental maths: 6 × 23 = 6 × (20 + 3) = 120 + 18 = 138.",
  ],
  experiments: [
    {
      title: "The think-of-a-number trick",
      materials: ["A friend", "Paper and pen"],
      steps: [
        "Ask a friend to think of a number (call it n) but keep it secret.",
        "Tell them: add 5, double the result, subtract 4, then halve it, and finally subtract the number they first thought of.",
        "Announce that their answer is 3 — every single time.",
        "Show why with algebra: ((n + 5) × 2 − 4) ÷ 2 − n = (2n + 6) ÷ 2 − n = (n + 3) − n = 3.",
      ],
      whatToNotice:
        "The n cancels out completely, so the starting number never matters. Algebra explains why the trick can never fail.",
    },
    {
      title: "Build an area model for expanding brackets",
      materials: ["Squared paper", "A ruler", "Coloured pencils"],
      steps: [
        "Draw a rectangle and label its width 3 and its length as two pieces: x and 5.",
        "Split it into a 3-by-x rectangle and a 3-by-5 rectangle.",
        "Write the area of each piece: 3x and 15.",
        "Add them: the whole area is 3(x + 5) = 3x + 15 — you have just expanded a bracket by drawing it.",
      ],
      whatToNotice:
        "The picture shows why you must multiply the outside number by BOTH parts inside: each piece of the rectangle needs its own area.",
    },
  ],
  interactive: "function-grapher",
};
