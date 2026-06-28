import type { TopicExtras } from "../types";

export const integersPowersExtras: TopicExtras = {
  topicId: "integers-powers",
  hook: "Fold a piece of paper in half just 42 times and — in theory — it would reach the Moon; that is the explosive power of doubling.",
  didYouKnow: [
    "Powers of 2 double each step: 2, 4, 8, 16, 32… By 2¹⁰ you already pass 1000, which is why 1 kilobyte is really 1024 bytes.",
    "In the legend of the chessboard, a king promises one grain of rice on the first square, doubling each square. The 64th square alone needs 2⁶³ grains — more rice than the world has ever grown.",
    "Negative numbers were once distrusted and called 'absurd' or 'fictitious', yet today they track everything from −20 °C temperatures to bank overdrafts and depths below sea level.",
    "Square roots can be irrational: √2 = 1.41421356… never ends and never repeats. The ancient Greeks found this so unsettling that it sparked a crisis in their mathematics.",
  ],
  experiments: [
    {
      title: "The doubling rice challenge",
      materials: ["A chessboard or a grid of 64 squares", "Dried rice, beans or counters", "A calculator"],
      steps: [
        "Place 1 grain on square 1, 2 on square 2, 4 on square 3, doubling each time.",
        "Keep going by hand until the grains no longer fit on a square.",
        "Switch to your calculator and work out the powers: square n holds 2^(n−1) grains.",
        "Work out 2⁶³ for the last square and compare it to the world's yearly rice harvest (about 5 × 10¹⁴ grains).",
      ],
      whatToNotice:
        "The pile becomes uncountable astonishingly fast. Doubling (repeated ×2) grows far quicker than adding — this is exponential growth.",
    },
    {
      title: "Walking the number line",
      materials: ["Chalk or masking tape", "Floor space for a number line from −10 to 10"],
      steps: [
        "Mark a number line on the floor from −10 to 10 with 0 in the middle.",
        "Stand on a start number, e.g. 3. To add a negative, face the negative direction and step that many places.",
        "Test 'subtracting a negative': 3 − (−4). Notice you turn around and move the positive way, landing on 7.",
        "Try multiplying by −1 by reflecting across 0, then reflect again to see why (−1) × (−1) = +1.",
      ],
      whatToNotice:
        "Adding a negative moves left, subtracting a negative moves right, and two reflections across zero return you to the positive side — a physical proof that two negatives make a positive.",
    },
  ],
  interactive: "number-line",
};
