import type { TopicExtras } from "../types";

export const transformationsPythagorasExtras: TopicExtras = {
  topicId: "transformations-pythagoras",
  hook:
    "Builders check a corner is a perfect right angle without a single protractor — they measure 3 units along one wall, 4 along the other, and make sure the diagonal is exactly 5. That's Pythagoras working on a building site.",
  didYouKnow: [
    "The 3-4-5 triangle was used by the ancient Egyptians to lay out right angles for building, using a loop of rope knotted into 12 equal sections.",
    "There are over 350 different known proofs of Pythagoras' theorem — one was even devised by a future US president, James A. Garfield.",
    "A reflection secretly swaps a shape's 'handedness': your left hand reflected in a mirror looks exactly like a right hand.",
    "Enlarging a shape by scale factor k multiplies its area by k² and its volume by k³ — which is why a giant the same shape as a human would be impossibly heavy for its bones.",
  ],
  experiments: [
    {
      title: "Rope-and-pegs right angle (the Egyptian method)",
      materials: ["A length of string or rope", "3 pegs or pencils", "A marker"],
      steps: [
        "Tie or mark the rope into 12 equal sections, then join the ends to make a loop.",
        "Peg one corner, then stretch the rope to make sides of 3 sections and 4 sections, with the 5-section side as the long edge.",
        "Pull the loop tight into a triangle and peg all three corners.",
        "Check the angle between the 3-side and 4-side with the corner of a book or set square.",
      ],
      whatToNotice: "The angle between the 3 and 4 sides is always a perfect 90°, because 3² + 4² = 5².",
    },
    {
      title: "Mirror-line treasure hunt",
      materials: ["Squared paper", "A small mirror", "A pencil"],
      steps: [
        "Draw a simple shape (like an L) on a coordinate grid.",
        "Stand the mirror upright along the y-axis and look at the reflection.",
        "Plot where each corner of the reflection appears to be.",
        "Compare the coordinates of the object and image.",
      ],
      whatToNotice: "Every x-coordinate flips its sign while the y-coordinate stays the same — exactly (x, y) → (−x, y).",
    },
  ],
  interactive: "area-visualiser",
};
