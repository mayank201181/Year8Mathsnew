import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Why do many ambulances have AMBULANCE painted back to front on the bonnet, with every letter flipped? So that a driver in front sees it the right way round in the rear-view mirror, because a reflection is a precise rule that flips it back — and every transformation in this topic is a rule like that, telling you exactly where each point goes.",

  didYouKnow: [
    "A Babylonian clay tablet called **Plimpton 322**, written around 1800 BCE — more than 1000 years before Pythagoras was born — lists pairs of numbers that are sides of right-angled triangles. One row gives 119 and 169, which fit a right-angled triangle with third side 120: {{119^2 + 120^2 = 14161 + 14400 = 28561 = 169^2}}.",
    "In 1927 the American teacher Elisha Loomis published *The Pythagorean Proposition*, a whole book of proofs of Pythagoras' theorem. Its second edition (1940) collects **367** different proofs — some using algebra, some using cut-and-rearrange pictures.",
    "Every repeating pattern that covers a flat surface — wallpaper, floor tiles, wrapping paper — has one of exactly **17** possible types of symmetry, built from translations, reflections, rotations and glide reflections. The Russian crystallographer Evgraf Fedorov proved this in 1891.",
    "A-size paper is designed so that folding a sheet in half gives a smaller sheet of exactly the same shape. That only works if the sides are in the ratio {{1 : sqrt(2)}} (A4 is 210 mm by 297 mm). So A3 is an enlargement of A4 with scale factor {{sqrt(2)}} ≈ 1.41: every length × 1.41, but the area exactly × 2.",
    "The 28 capsules of the Singapore Flyer are spaced evenly round its wheel. Turn the wheel through {{360/28}} ≈ 12.9° and every capsule lands where the next one was, so the ring of capsules has rotational symmetry of order 28.",
    "In 1638 Galileo explained why a giant can't just be a scaled-up person. Enlarge an animal by scale factor 2 and its weight (which depends on volume) is multiplied by {{2^3 = 8}}, but the strength of its bones (which depends on their cross-section area) only by {{2^2 = 4}}. Big animals need much thicker bones for their size.",
  ],

  activities: [
    {
      title: "The builders' 3-4-5 corner check",
      emoji: "📐",
      materials: [
        "A tape measure or a long ruler",
        "Masking tape or sticky notes",
        "A pencil",
        "Some corners that are meant to be right angles: a table, a door frame, a floor tile, a book",
      ],
      steps: [
        "Pick a corner that is meant to be a right angle, such as the corner of a table.",
        "From the corner, measure 30 cm along one edge and mark it with tape. Measure 40 cm along the other edge and mark that too. (For a book, use 6 cm and 8 cm instead.)",
        "Before you measure straight across between the two marks, predict: if the corner is exactly 90°, how long should that diagonal be?",
        "Measure it. If you get 50 cm (or 10 cm for the book), the corner is square. Shorter means the angle is less than 90°; longer means it is more than 90°.",
        "Test three or four different corners and record your results in a table. Which corners in your home are truly square?",
        "For a really big corner, such as a courtyard, builders use 3 m, 4 m and 5 m. Explain why scaling all three lengths up by the same factor still works.",
      ],
      maths:
        "{{30^2 + 40^2 = 900 + 1600 = 2500 = 50^2}}, so sides of 30, 40 and 50 fit Pythagoras' theorem — and only a right-angled triangle can do that (this is the **converse** of the theorem). Builders really do use this 3-4-5 check to set out square corners. Scaling by any factor k keeps it working: {{(3k)^2 + (4k)^2 = 9k^2 + 16k^2 = 25k^2 = (5k)^2}}.",
    },
    {
      title: "Torch-shadow enlargements",
      emoji: "🔦",
      materials: [
        "A phone torch or a small torch",
        "A cardboard triangle with a 4 cm base, taped to a pencil as a handle",
        "A plain wall, or a sheet of paper taped to a wall",
        "A tape measure or metre ruler",
        "A dark room",
      ],
      steps: [
        "Put the torch on a table, about 1 m from the wall and pointing straight at it (never shine it into anyone's eyes). The bulb is your **centre of enlargement**.",
        "Hold the triangle upright, parallel to the wall, halfway between the torch and the wall (about 50 cm from each).",
        "Predict the width of the shadow's base, then measure it on the wall.",
        "Move the triangle so it is about 25 cm from the torch. Predict the new width of the shadow's base, then measure it.",
        "Where must you hold the triangle to make a shadow exactly 3 times as wide as the triangle? Work it out first, then test it.",
      ],
      maths:
        "Light travels in straight lines from the bulb, exactly like the ray lines you draw from a centre of enlargement. Scale factor = (distance from bulb to wall) ÷ (distance from bulb to triangle): halfway gives scale factor 2 (an 8 cm base), a quarter of the way gives 4 (16 cm), and a third of the way gives 3. The shadow is **similar** to the triangle — same angles, every length multiplied by the same factor. A real torch is not a perfect point of light, so expect slightly fuzzy edges.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Garfield's trapezium proof",
      svg: `<svg viewBox="0 0 480 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A right-angled trapezium split into three right-angled triangles. Along the bottom edge: a triangle with legs a and b, then a second copy of it turned round, with legs b and a. Between them sits a third triangle with two sides of length c meeting at a right angle. The two vertical sides of the trapezium are b and a, and they are a plus b apart."><rect x="0" y="0" width="480" height="262" fill="#ffffff"/><text x="240" y="26" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Garfield's trapezium (a = 3, b = 4, c = 5)</text><polygon points="100,230 220,230 100,70" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="220,230 380,230 380,110" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="220,230 380,110 100,70" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polyline points="100,216 114,216 114,230" fill="none" stroke="#1f2937" stroke-width="1.2"/><polyline points="366,230 366,216 380,216" fill="none" stroke="#1f2937" stroke-width="1.2"/><polyline points="211.6,218.8 222.8,210.4 231.2,221.6" fill="none" stroke="#1f2937" stroke-width="1.2"/><text x="140" y="186" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">½ab</text><text x="335" y="208" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">½ab</text><text x="236" y="144" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">½c²</text><text x="160" y="250" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">a</text><text x="300" y="250" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">b</text><text x="86" y="155" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">b</text><text x="394" y="175" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">a</text><text x="172" y="146" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">c</text><text x="292" y="164" font-size="14" font-family="sans-serif" font-style="italic" text-anchor="middle" fill="#1f2937">c</text></svg>`,
      caption:
        "Work out the trapezium's area in two ways. As a trapezium: the parallel sides are a and b and they are a + b apart, so the area is {{1/2 (a + b)(a + b)}}. As three triangles: {{1/2 ab + 1/2 ab + 1/2 c^2}}. These are equal, so doubling both gives {{(a + b)^2 = 2ab + c^2}}. Expand the bracket: {{a^2 + 2ab + b^2 = 2ab + c^2}}, and taking 2ab from both sides leaves {{a^2 + b^2 = c^2}}.",
    },
    {
      title: "Lengths × k, area × k²",
      svg: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A small right-angled triangle, its enlargement by scale factor 2 and its enlargement by scale factor 3, drawn to scale. The scale factor 2 triangle is split into 4 copies of the small triangle and the scale factor 3 triangle into 9 copies. In each, one copy is shaded yellow."><rect x="0" y="0" width="480" height="250" fill="#ffffff"/><text x="240" y="26" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">How many copies of the small triangle fit inside?</text><polygon points="30,190 90,190 30,150" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="120,190 240,190 120,110" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="120,190 180,190 120,150" fill="#fde68a" stroke="none"/><line x1="120" y1="150" x2="180" y2="150" stroke="#334155" stroke-width="1"/><line x1="180" y1="190" x2="180" y2="150" stroke="#334155" stroke-width="1"/><line x1="180" y1="190" x2="120" y2="150" stroke="#334155" stroke-width="1"/><polygon points="120,190 240,190 120,110" fill="none" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="280,190 460,190 280,70" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="280,190 340,190 280,150" fill="#fde68a" stroke="none"/><line x1="280" y1="150" x2="400" y2="150" stroke="#334155" stroke-width="1"/><line x1="280" y1="110" x2="340" y2="110" stroke="#334155" stroke-width="1"/><line x1="340" y1="190" x2="340" y2="110" stroke="#334155" stroke-width="1"/><line x1="400" y1="190" x2="400" y2="150" stroke="#334155" stroke-width="1"/><line x1="340" y1="190" x2="280" y2="150" stroke="#334155" stroke-width="1"/><line x1="400" y1="190" x2="280" y2="110" stroke="#334155" stroke-width="1"/><polygon points="280,190 460,190 280,70" fill="none" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="60" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">base 3</text><text x="180" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">base 6</text><text x="370" y="208" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">base 9</text><text x="60" y="230" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">SF 1: 1 copy</text><text x="180" y="230" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">SF 2: 4 copies</text><text x="370" y="230" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">SF 3: 9 copies</text></svg>`,
      caption:
        "Drawn to scale. Enlarge a triangle by scale factor 2 and exactly 4 copies of the original fit inside it; by scale factor 3, exactly 9 copies (look for the copies that are upside down). Lengths are multiplied by k, but area is multiplied by {{k^2}} — so an enlargement by scale factor 3 needs 9 times as much paint.",
    },
  ],

  history: {
    title: "The President's proof",
    story:
      "In 1876 James A. Garfield, a former teacher, was a member of the United States Congress from Ohio. During some mathematical discussions with fellow members of Congress, he found a new proof of Pythagoras' theorem. Instead of drawing squares on the sides, he built a trapezium from three right-angled triangles: two copies of a triangle with sides a, b and c, and one half-square with two sides of length c. Working out the trapezium's area in two different ways forces {{a^2 + b^2 = c^2}} (see the bonus diagram).\n\nThe proof was printed in the *New England Journal of Education* that year, with the editors joking that it was something politicians of every party could agree on. Five years later, in 1881, Garfield became the 20th President of the United States.",
  },
};
