import type { TopicExtras } from "../types";

export const ratioProportionExtras: TopicExtras = {
  topicId: "ratio-proportion",
  hook:
    "Every recipe, map, currency exchange and 'buy one get one free' deal is ratio in disguise. Get fluent with one part, and you can scale anything up or down without ever being fooled by a 'bargain'.",
  didYouKnow: [
    "The golden ratio (about 1 : 1.618) appears in sunflower seed spirals, nautilus shells and the proportions of famous paintings — designers still use it to lay out pages.",
    "Map scales like 1 : 50 000 are dimensionless: because both sides are in the same unit, 1 cm to 50 000 cm is the same statement as 1 inch to 50 000 inches.",
    "Mixing concrete uses a classic ratio, often 1 : 2 : 3 (cement : sand : gravel). Get the ratio wrong and the concrete is either too weak or too expensive.",
    "Speed cameras work on average speed: they time how long you take between two points and divide the fixed distance by that time — exactly distance ÷ time.",
  ],
  experiments: [
    {
      title: "Find the best buy in your kitchen",
      materials: ["Three different-sized packets of the same food (e.g. cereal, pasta)", "Their prices and weights", "A calculator"],
      steps: [
        "Write down the price and the weight (in grams) of each packet.",
        "For each packet, work out the price per 100 g: (price ÷ weight) × 100.",
        "Line up the three 'price per 100 g' figures and find the smallest.",
        "Check whether the biggest packet really is the best value — it often is, but not always.",
      ],
      whatToNotice:
        "Supermarkets print the unit price on the shelf label for exactly this reason. The 'multi-buy' is not always cheapest per 100 g.",
    },
    {
      title: "Measure your walking speed",
      materials: ["A tape measure or known distance (e.g. a 50 m stretch)", "A stopwatch or phone timer"],
      steps: [
        "Mark out a known distance and time how long it takes you to walk it.",
        "Calculate speed = distance ÷ time in metres per second.",
        "Convert to km/h by multiplying by 3.6 (since 1 m/s = 3.6 km/h).",
        "Repeat walking, then jogging, and compare the two speeds as a ratio.",
      ],
      whatToNotice:
        "A comfortable walking pace is usually around 1.4 m/s (about 5 km/h). Your jogging-to-walking speed ratio is a real-life proportion.",
    },
  ],
  interactive: "fraction-bar",
};
