import type { TopicExtras } from "../types";

export const factorsMultiplesExtras: TopicExtras = {
  topicId: "factors-multiples",
  hook:
    "Every whole number is built from primes the way every molecule is built from atoms — and that single idea unlocks HCFs, LCMs, codes and even the security of the internet.",
  didYouKnow: [
    "The largest known prime (as of recent years) has over 24 million digits — printed out at normal size it would stretch for tens of kilometres.",
    "Internet banking relies on the fact that multiplying two huge primes is easy, but un-multiplying the answer back into those primes is fiendishly hard.",
    "A 'perfect number' equals the sum of its factors (excluding itself): 6 = 1+2+3 and 28 = 1+2+4+7+14. No one knows whether any odd perfect number exists.",
    "Primes seem to thin out but never stop — Euclid proved over 2000 years ago that there are infinitely many.",
  ],
  experiments: [
    {
      title: "Sieve of Eratosthenes",
      materials: ["A printed 10×10 grid of the numbers 1–100", "Coloured pens"],
      steps: [
        "Cross out 1 (it is not prime).",
        "Circle 2, then cross out every other multiple of 2 (4, 6, 8 …).",
        "Circle the next uncrossed number (3) and cross out all its multiples.",
        "Repeat with 5 and 7 — once you pass √100 = 10 you can stop crossing.",
        "Every number still circled is prime.",
      ],
      whatToNotice:
        "You never needed to test beyond 7, because any composite below 100 has a prime factor at or below √100 = 10. The leftover circled numbers are the 25 primes under 100.",
    },
    {
      title: "Tile the rectangle (HCF by hand)",
      materials: ["Squared paper", "Scissors or a ruler"],
      steps: [
        "Draw a rectangle that is, say, 24 squares by 36 squares.",
        "Find the biggest square tile that fits both side lengths exactly with no gaps.",
        "Test 2×2, 3×3, 6×6, 12×12 — record which ones tile perfectly.",
        "The largest tile that works is the HCF of 24 and 36.",
      ],
      whatToNotice:
        "The biggest perfect tile is 12×12 — exactly HCF(24, 36) = 12. The HCF is literally the largest square that paves both sides.",
    },
  ],
  interactive: "number-line",
};
