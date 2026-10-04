import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "A 2 × 3 × 4 box and a long 1 × 1 × 24 stick each hold exactly 24 one-centimetre cubes — yet wrapping the stick takes almost twice as much card (98 cm² against 52 cm²). Same volume, very different surface: this topic shows you why, and how to measure both.",

  didYouKnow: [
    "A classic football is stitched from 32 panels — 12 pentagons and 20 hexagons — with 60 corners and 90 seams. Euler's formula checks out: {{60 + 32 - 90 = 2}}.",
    "Since 1964 the litre has been defined as exactly one cubic decimetre: a cube 10 cm along each edge. So 1 litre = 1000 cm³, and 1 ml is exactly 1 cm³.",
    "Double every length of a solid and its surface area becomes 4 times as big, but its volume 8 times as big. That is why a mouse loses heat much faster for its size than an elephant: it has far more skin for every cm³ of body.",
    "In 1999 the mathematician Thomas Hales proved the *honeycomb conjecture*: to split a flat surface into cells of equal area using the least total wall length, regular hexagons are the best possible shape — the same shape as the cells of a bees' honeycomb.",
    "In 1635 Bonaventura Cavalieri published the idea that two solids whose cross-sections have equal areas at every height must have equal volumes. Push a pile of coins into a leaning tower and its volume doesn't change — the same reason a parallelogram has the same area as a rectangle with the same base and height.",
    "Archimedes was so proud of proving that a sphere fills exactly {{2/3}} of the cylinder that fits snugly around it that he asked for a sphere inside a cylinder to be carved on his tomb. Over 130 years later, the Roman writer Cicero found the overgrown tomb by spotting that carving.",
  ],

  activities: [
    {
      title: "The biggest box from one square",
      emoji: "📦",
      materials: ["6 sheets of A4 paper or thin card (one per box)", "Ruler and pencil", "Scissors", "Sticky tape", "Dry rice and a measuring jug (optional)"],
      steps: [
        "Cut a 20 cm × 20 cm square from a sheet of A4.",
        "Cut a 2 cm × 2 cm square from each corner. Fold up the four flaps and tape the corners to make an open box.",
        "Work out its volume. The base is 20 − 2 × 2 = 16 cm on each side and the box is 2 cm high, so V = 16 × 16 × 2 = 512 cm³.",
        "Make more boxes with corner squares of 1 cm, 3 cm, 4 cm and 5 cm. Before you calculate, predict which one holds the most.",
        "Record the cut size and the volume in a table. Optional: fill each box with rice, pour it into a measuring jug and compare the millilitres with your cm³.",
        "Challenge: can a cut that is *not* a whole number of centimetres, such as 3.5 cm, beat your best box?",
      ],
      maths:
        "With corner squares of side x cm, the box is {{20 - 2x}} cm long, {{20 - 2x}} cm wide and x cm high, so {{V = x(20 - 2x)^2}}.\n\n| Cut x (cm) | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Volume (cm³) | 324 | 512 | 588 | 576 | 500 |\n\n*Consider extremes*: a 0 cm cut leaves a flat sheet and a 10 cm cut leaves no base, so both hold nothing — the best box must be somewhere in between. The best whole-centimetre cut is 3 cm (588 cm³, which is 588 ml). A 3.5 cm cut gives 3.5 × 13 × 13 = 591.5 cm³, and the very best cut is {{3 1/3}} cm, holding about 593 cm³.",
    },
    {
      title: "Hunt the 11 cube nets",
      emoji: "✂️",
      materials: ["Squared paper (squares of 1 cm or bigger)", "Pencil", "Scissors", "A dice or a cube-shaped box to compare (optional)"],
      steps: [
        "On squared paper, draw a shape made of 6 squares joined edge to edge. A cross shape is a good start.",
        "Before cutting, predict: will it fold into a cube? Shade one square as the bottom, then mark the square you think will end up opposite it.",
        "Cut it out and fold it to test. Keep the ones that work in one pile and the failures in another.",
        "Find as many *different* nets as you can. A net that is just a rotated or flipped copy of one you already have doesn't count as new.",
        "Study your piles. Can a working net contain a 2 × 2 block of squares? If a net has four squares in a row, where must the other two go?",
        "Fold one net up and count its vertices, faces and edges. Check that {{V + F - E = 2}}.",
      ],
      maths:
        "A **net** is a flat pattern that folds into a 3D solid. Every cube net has 6 squares, and there are exactly **11** different ones.\n\n- A 2 × 2 block can never work: four squares would meet at one corner, but only three faces meet at each corner of a cube, so two of them would overlap.\n- With four squares in a row (they wrap around to make the sides), the other two squares must go on **opposite** sides of the row — one becomes the top, the other the bottom.\n\nOnce folded, every net makes the same cube with 8 vertices, 6 faces and 12 edges: {{8 + 6 - 12 = 2}}.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Push the stack sideways: the area stays the same",
      svg: `<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: a neat stack of 8 equal cards forming a rectangle with base b and height h. Right: the same 8 cards, each pushed a little further right, forming a slanted stack with the same base b and the same height h, close to a parallelogram drawn with a dashed outline."><rect x="0" y="0" width="440" height="220" fill="#ffffff"/><g fill="#c7d2fe" stroke="#334155" stroke-width="1.2"><rect x="30" y="152" width="120" height="16"/><rect x="30" y="136" width="120" height="16"/><rect x="30" y="120" width="120" height="16"/><rect x="30" y="104" width="120" height="16"/><rect x="30" y="88" width="120" height="16"/><rect x="30" y="72" width="120" height="16"/><rect x="30" y="56" width="120" height="16"/><rect x="30" y="40" width="120" height="16"/><rect x="250" y="152" width="120" height="16"/><rect x="258" y="136" width="120" height="16"/><rect x="266" y="120" width="120" height="16"/><rect x="274" y="104" width="120" height="16"/><rect x="282" y="88" width="120" height="16"/><rect x="290" y="72" width="120" height="16"/><rect x="298" y="56" width="120" height="16"/><rect x="306" y="40" width="120" height="16"/></g><polygon points="250,168 370,168 434,40 314,40" fill="none" stroke="#1f2937" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="150" y1="40" x2="306" y2="40" stroke="#334155" stroke-width="1" stroke-dasharray="2 3"/><line x1="150" y1="168" x2="250" y2="168" stroke="#334155" stroke-width="1" stroke-dasharray="2 3"/><line x1="200" y1="46" x2="200" y2="162" stroke="#1f2937" stroke-width="1.5"/><polygon points="200,40 195,50 205,50" fill="#1f2937"/><polygon points="200,168 195,158 205,158" fill="#1f2937"/><text x="208" y="108" font-size="14" font-family="sans-serif" font-style="italic" fill="#1f2937">h</text><text x="90" y="186" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">b</text><text x="310" y="186" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">b</text><text x="90" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Neat stack: 8 cards</text><text x="330" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Pushed sideways: still 8 cards</text></svg>`,
      caption:
        "Each card keeps its own area when you slide it, so the slanted stack covers exactly as much as the neat one. Make the cards thinner and thinner and the slanted stack becomes a parallelogram: same base, same perpendicular height, same area as the rectangle. Stack coins instead of cards and the same idea works for volume.",
    },
    {
      title: "Double every length: area × 4, volume × 8",
      svg: `<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 1 cm cube next to a 2 cm cube built from 8 small cubes. The small cube has surface area 6 square centimetres and volume 1 cubic centimetre; the large cube has surface area 24 square centimetres and volume 8 cubic centimetres."><rect x="0" y="0" width="440" height="250" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"><polygon points="90,80 124.6,100 90,120 55.4,100" fill="#c7d2fe"/><polygon points="124.6,100 124.6,140 90,160 90,120" fill="#bae6fd"/><polygon points="55.4,100 90,120 90,160 55.4,140" fill="#fde68a"/><polygon points="300,10 369.3,50 300,90 230.7,50" fill="#c7d2fe"/><polygon points="369.3,50 369.3,130 300,170 300,90" fill="#bae6fd"/><polygon points="230.7,50 300,90 300,170 230.7,130" fill="#fde68a"/></g><g stroke="#334155" stroke-width="1"><line x1="334.6" y1="30" x2="265.4" y2="70"/><line x1="265.4" y1="30" x2="334.6" y2="70"/><line x1="334.6" y1="150" x2="334.6" y2="70"/><line x1="369.3" y1="90" x2="300" y2="130"/><line x1="265.4" y1="150" x2="265.4" y2="70"/><line x1="230.7" y1="90" x2="300" y2="130"/></g><text x="118" y="164" font-size="11" font-family="sans-serif" fill="#1f2937">1 cm</text><text x="348" y="172" font-size="11" font-family="sans-serif" fill="#1f2937">2 cm</text><line x1="142" y1="118" x2="212" y2="118" stroke="#1f2937" stroke-width="1.5"/><polygon points="222,118 211,112 211,124" fill="#1f2937"/><text x="180" y="96" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">double every</text><text x="180" y="108" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">length</text><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="90" y="196">Edge 1 cm</text><text x="90" y="214">Surface area 6 cm²</text><text x="90" y="232">Volume 1 cm³</text><text x="300" y="196">Edge 2 cm</text><text x="300" y="214">Surface area 24 cm² (× 4)</text><text x="300" y="232">Volume 8 cm³ (× 8)</text></g></svg>`,
      caption:
        "Each face of the big cube is made of 2 × 2 = 4 small squares, so the surface area is 4 times as big. The big cube is made of 2 × 2 × 2 = 8 small cubes, so the volume is 8 times as big. Scale every length by 3 and the area is multiplied by 9 and the volume by 27.",
    },
  ],

  history: {
    title: "Liu Hui and the out-in principle",
    story:
      "About 2000 years ago, a Chinese book called *The Nine Chapters on the Mathematical Art* collected rules for everyday problems. Its very first chapter is about measuring fields: rectangular fields, triangular 'pointed' fields and trapezium-shaped 'dustpan' fields. For a dustpan field the rule was: add the two parallel sides, halve the total and multiply by the height — our {{1/2 (a + b)h}}.\n\nThe book gave rules but no reasons. In AD 263 the mathematician Liu Hui wrote a commentary explaining *why* they work. A key tool in his explanations was the **out-in complementary principle**: cut a shape into pieces, move the pieces somewhere else, and the total area stays the same. Cutting a triangle off a parallelogram and sliding it across to make a rectangle is exactly his idea.",
  },
};
