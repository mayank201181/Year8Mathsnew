import type { TopicExtras } from "../types";

export const percentagesExtras: TopicExtras = {
  topicId: "percentages",
  hook:
    "Sales, tips, tax, interest, exam marks and battery levels are all percentages. The single most useful idea here — the multiplier — turns 'increase by 20%' into '× 1.2', and lets you chain discounts, taxes and interest in one fluent calculation.",
  didYouKnow: [
    "A '50% off, then an extra 20% off' deal is NOT 70% off — it is × 0.5 × 0.8 = × 0.4, so 60% off. Shops rely on shoppers adding the percentages by mistake.",
    "The percent sign % evolved from the Italian 'per cento'. Over centuries the 'cento' was abbreviated until it collapsed into the two little circles and a slash we use today.",
    "VAT in the UK is 20%, so the price you see already includes a × 1.2 multiplier. Working backwards (÷ 1.2) recovers the price before tax — a real reverse-percentage problem.",
    "Compound interest, where each year's interest earns interest too, is why £100 at 5% for 30 years grows to about £432 — far more than the £250 simple interest would give.",
  ],
  experiments: [
    {
      title: "Build your own sale",
      materials: ["A shop catalogue or website prices", "Paper and pen", "A calculator to check"],
      steps: [
        "Pick five items and note their prices.",
        "Apply a 30% discount to each using the multiplier × 0.7, writing down the sale price.",
        "Now pick one item and apply '20% off, then a further 10% off' as × 0.8 × 0.9.",
        "Check: is the double discount the same as a single 30% off? Work out the single equivalent percentage.",
      ],
      whatToNotice:
        "× 0.8 × 0.9 = × 0.72, which is only 28% off — not 30%. Successive discounts always come out a little less than adding them suggests.",
    },
    {
      title: "Watch interest grow",
      materials: ["Paper and pen", "A calculator"],
      steps: [
        "Imagine saving £200 at 5% per year.",
        "For simple interest, add the same £10 (5% of £200) every year for 5 years and record the running total.",
        "For compound interest, instead multiply the balance by 1.05 each year and record it.",
        "Compare the two totals after 5 years.",
      ],
      whatToNotice:
        "Simple interest gives £200 + 5 × £10 = £250. Compound gives 200 × 1.05⁵ ≈ £255.26. The gap widens fast the longer you save, because compound interest earns interest on interest.",
    },
  ],
  interactive: "fraction-bar",
};
