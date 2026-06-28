import type { TopicExtras } from "../types";

export const perimeterAreaVolumeExtras: TopicExtras = {
  topicId: "perimeter-area-volume",
  hook:
    "Of all shapes with the same perimeter, the circle holds the most area — which is why bubbles are round and why animals curl into a ball to keep warm. Maximising area while minimising the edge is one of nature's favourite tricks.",
  didYouKnow: [
    "π (pi) has been calculated to over 100 trillion digits, yet for school maths just 3.14 (or 22/7) is plenty accurate.",
    "For a fixed perimeter, a square beats every other rectangle for area — and a circle beats the square. Squeeze a shape long and thin and its area shrinks toward zero.",
    "Double every length of a solid and its surface area becomes 4 times bigger while its volume becomes 8 times bigger. That square-cube law is why giant insects could not really exist.",
    "Ancient Egyptians estimated a circle's area as if it were a square of side 8/9 of the diameter — giving a 'π' of about 3.16, impressively close for 4000 years ago.",
  ],
  experiments: [
    {
      title: "Find π with string and a tin",
      materials: ["A round tin or cup", "String", "A ruler"],
      steps: [
        "Wrap string once around the tin and mark the length, then measure it — this is the circumference.",
        "Measure straight across the widest point — this is the diameter.",
        "Divide the circumference by the diameter.",
      ],
      whatToNotice:
        "Your answer comes out close to 3.14 every time, for any size of tin — you have measured π, the fixed ratio of circumference to diameter.",
    },
    {
      title: "Fixed-perimeter rectangles, changing area",
      materials: ["A 24 cm loop of string or 24 matchsticks", "Squared paper"],
      steps: [
        "Make rectangles whose length + width = 12 (so the perimeter is 24): try 1×11, 3×9, 5×7, 6×6.",
        "Work out the area of each rectangle.",
        "Record the areas and look for the biggest.",
      ],
      whatToNotice:
        "The area grows as the rectangle gets closer to a square and peaks at 6×6 = 36 cm² — the square gives the maximum area for a fixed perimeter.",
    },
  ],
  interactive: "area-visualiser",
};
