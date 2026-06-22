import type { TopicExtras } from "../types";

export const anglesPolygonsExtras: TopicExtras = {
  topicId: "angles-polygons",
  hook:
    "Bees build honeycomb out of perfect hexagons — and it is no accident. The hexagon's 120° angles let cells tile a flat surface with no gaps using the least possible wax. Angle rules are nature's engineering.",
  didYouKnow: [
    "Only three regular shapes tile the plane on their own — equilateral triangles (60°), squares (90°) and hexagons (120°). It works precisely because those angles divide exactly into 360°.",
    "The exterior angles of ANY polygon always add to 360°, no matter how many sides — a triangle, a 20-gon, even a wonky one. You make exactly one full turn walking around it.",
    "A regular polygon with very many sides looks almost like a circle: a 360-sided regular polygon has interior angles of 179°, nearly straight.",
    "The word 'polygon' comes from Greek — 'poly' (many) and 'gon' (angle). So a polygon is literally a 'many-angled' shape.",
  ],
  experiments: [
    {
      title: "Tear-and-fit triangle angle sum",
      materials: ["Paper", "Scissors or a ruler", "Pencil"],
      steps: [
        "Draw any triangle and colour its three corners differently.",
        "Tear (or cut) off the three corners.",
        "Place the three corners together so their points meet at one spot, edges touching.",
      ],
      whatToNotice:
        "The three corners always line up to make a straight line — showing the angles add to 180°, whatever triangle you started with.",
    },
    {
      title: "Walk the exterior angles",
      materials: ["Chalk or tape", "An open floor"],
      steps: [
        "Mark out a large triangle (or any polygon) on the floor.",
        "Walk along each side, and at every corner turn through the exterior angle to face along the next side.",
        "Keep going until you return to your start, facing your original direction.",
      ],
      whatToNotice:
        "By the time you get back you have turned through exactly one full circle — 360° — which is why the exterior angles of any polygon add to 360°.",
    },
  ],
  interactive: "angle-explorer",
};
