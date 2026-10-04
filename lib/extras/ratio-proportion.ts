import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Why can a giant “family size” pack cost *more* per gram than the small one — and how does a map fit 50 km of road onto 25 cm of paper? Both are ratio and proportion: the maths of changing the size of things while keeping everything in step.",
  didYouKnow: [
    "Singapore’s MRT system map is a *diagram*, not a scale map: lines are straightened and stations spaced out so it is easy to read. The idea was made famous by Harry Beck’s London Underground map, first published in 1933 — it keeps the order of stations and the connections right but deliberately ignores scale.",
    "A4 is exactly half of A3, yet both sheets are the same shape. That only works because every A-size sheet has its sides in the ratio 1 : {{sqrt(2)}} (about 1 : 1.414), so folding one in half makes a smaller sheet that is similar to it. A0 has an area of 1 m², which makes A4 exactly {{1/16}} of a square metre.",
    "Online maps show a *scale bar* instead of a ratio like 1 : 50 000. If you zoom in or print the map at a different size, the scale bar stretches with the map and stays correct — a printed ratio would suddenly be wrong.",
    "On a bicycle with 48 teeth on the front chainring and 16 on the back sprocket, the gear ratio is 48 : 16 = 3 : 1, so the back wheel turns 3 times for every turn of the pedals. Shift to a 24-tooth sprocket and the ratio is 2 : 1 — easier to pedal uphill, but slower.",
    "Many supermarket shelf labels show a *unit price*, such as the price per 100 g or per litre, beside the actual price. It is there so shoppers can compare packs of different sizes fairly — the unitary method, done for you.",
    "Money changers buy and sell each currency at two different rates. That gap is how they earn a living, so if you change $100 into ringgit and immediately change it back, you get back less than $100.",
  ],
  activities: [
    {
      title: "Scale drawing of your bedroom",
      emoji: "📐",
      materials: ["Tape measure", "Squared or plain paper", "Ruler and pencil", "Scissors (for the bonus)"],
      steps: [
        "Measure the length and width of your room in centimetres, to the nearest 10 cm. Measure your bed, desk and wardrobe too.",
        "Use the scale 1 : 50 — every 1 cm on paper stands for 50 cm in real life.",
        "Divide every real measurement by 50 to get its length on paper. A 350 cm wall becomes 350 ÷ 50 = 7 cm.",
        "Draw the outline of the room, then add the furniture to the same scale. Keep the corners square.",
        "Check your work: measure one thing on the drawing, multiply by 50 and compare with the real object.",
        "Bonus: cut out a dream desk measuring 160 cm by 80 cm in real life (3.2 cm by 1.6 cm on paper). Where in the room would it fit?",
      ],
      maths:
        "A scale of 1 : 50 means real length = 50 × drawing length, so every length is divided by the same number. That keeps the drawing the same *shape* as the room — the two are similar, and every angle stays the same. Areas shrink far more than lengths: each 1 cm² square on your paper stands for 50 × 50 = 2500 cm² of real floor.",
    },
    {
      title: "The syrup taste test",
      emoji: "🥤",
      materials: ["Rose syrup or any fruit cordial", "Water", "Three identical clear glasses", "A teaspoon", "A sheet of white paper"],
      steps: [
        "Glass 1: mix 1 spoon of syrup with 4 spoons of water (ratio 1 : 4).",
        "Glass 2: mix 2 spoons of syrup with 8 spoons of water (ratio 2 : 8).",
        "Glass 3: mix 2 spoons of syrup with 5 spoons of water (ratio 2 : 5).",
        "Before tasting, predict: which two glasses will look and taste the same? Which will be strongest?",
        "Hold the glasses in front of the white paper to compare colours, then taste.",
        "For each glass, work out what fraction of the drink is syrup.",
      ],
      maths:
        "2 : 8 simplifies to 1 : 4, so glasses 1 and 2 are equivalent: syrup is {{1/5}} of each drink and they taste the same, even though glass 2 has more of everything. In glass 3, syrup is {{2/7}} of the drink. Since {{2/7 = 10/35}} and {{1/5 = 7/35}}, glass 3 is stronger. In general, the ratio a : b means the first part is {{a/(a+b)}} of the whole.",
    },
  ],
  bonusDiagrams: [
    {
      title: "One bar model, three questions",
      svg: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model for the ratio 3 to 5. Aisha's bar has 3 boxes and Wei Ling's bar has 5 boxes, each box worth 15 dollars. The total is 120 dollars and the 2 extra boxes in Wei Ling's bar show a difference of 30 dollars."><rect x="0" y="0" width="420" height="200" fill="#ffffff"/><text x="80" y="52" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">Aisha</text><text x="80" y="102" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">Wei Ling</text><rect x="90" y="30" width="40" height="34" fill="#c7d2fe" stroke="#334155"/><rect x="130" y="30" width="40" height="34" fill="#c7d2fe" stroke="#334155"/><rect x="170" y="30" width="40" height="34" fill="#c7d2fe" stroke="#334155"/><rect x="90" y="80" width="40" height="34" fill="#c7d2fe" stroke="#334155"/><rect x="130" y="80" width="40" height="34" fill="#c7d2fe" stroke="#334155"/><rect x="170" y="80" width="40" height="34" fill="#c7d2fe" stroke="#334155"/><rect x="210" y="80" width="40" height="34" fill="#fde68a" stroke="#334155"/><rect x="250" y="80" width="40" height="34" fill="#fde68a" stroke="#334155"/><text x="110" y="52" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="150" y="52" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="190" y="52" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="110" y="102" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="150" y="102" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="190" y="102" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="230" y="102" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="270" y="102" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="218" y="52" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">= $45</text><text x="298" y="102" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">= $75</text><line x1="210" y1="24" x2="210" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M210 122 v6 h80 v-6" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="250" y="144" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">difference: 2 parts = $30</text><path d="M350 30 h8 v84 h-8 M358 72 h6" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="368" y="64" font-size="12" font-family="sans-serif" fill="#1f2937">total</text><text x="368" y="80" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1f2937">$120</text><text x="368" y="96" font-size="12" font-family="sans-serif" fill="#1f2937">8 parts</text><text x="210" y="182" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">one part = $120 ÷ 8 = $15</text></svg>`,
      caption:
        "Aisha and Wei Ling share money in the ratio 3 : 5. Whatever you are told — the total ($120 = 8 parts), one share (Aisha’s $45 = 3 parts) or the difference ($30 = 2 parts, shaded yellow) — divide by the number of parts it covers to find one part, here $15. Then build every other amount from that.",
    },
    {
      title: "Scale factor 2: lengths double, area quadruples",
      svg: `<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 3 cm by 2 cm rectangle enlarged by scale factor 2 into a 6 cm by 4 cm rectangle. Dashed lines split the large rectangle into 4 copies of the small one."><rect x="0" y="0" width="420" height="210" fill="#ffffff"/><text x="210" y="28" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Lengths × 2, angles unchanged, area × 4</text><rect x="40" y="100" width="60" height="40" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><path d="M40 132 h8 v8" fill="none" stroke="#334155" stroke-width="1.2"/><text x="70" y="157" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3 cm</text><text x="34" y="124" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">2 cm</text><line x1="118" y1="112" x2="174" y2="112" stroke="#1f2937" stroke-width="2"/><polygon points="174,107 184,112 174,117" fill="#1f2937"/><text x="150" y="102" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">× 2</text><rect x="200" y="60" width="120" height="80" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="260" y1="60" x2="260" y2="140" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="200" y1="100" x2="320" y2="100" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M200 132 h8 v8" fill="none" stroke="#334155" stroke-width="1.2"/><text x="260" y="157" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="326" y="104" font-size="12" font-family="sans-serif" fill="#1f2937">4 cm</text><text x="70" y="186" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Area = 6 cm²</text><text x="260" y="186" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Area = 24 cm² = 4 × 6 cm²</text></svg>`,
      caption:
        "Enlarging by scale factor 2 multiplies every length by 2 but keeps every angle the same, so the two rectangles are similar. Four copies of the small rectangle fit inside the big one, so the area is multiplied by 2 × 2 = 4, not by 2.",
    },
  ],
  history: {
    title: "Eratosthenes measures the Earth with a shadow",
    story:
      "Around 240 BC, Eratosthenes ran the great library of Alexandria in Egypt. He learned that at noon on midsummer’s day in Syene (modern Aswan), the Sun shone straight down a deep well — it was directly overhead. At the same moment in Alexandria, an upright stick still cast a short shadow: the Sun was about 7.2° away from overhead.\n\nEratosthenes spotted a proportion. 7.2° is {{1/50}} of a full turn of 360°, so if the Earth is round, the distance from Syene to Alexandria must be {{1/50}} of the way around it. The cities were about 5000 stadia apart, so the whole Earth measured about 50 × 5000 = 250 000 stadia. Historians still debate how long a stadion was, but by most estimates he came remarkably close to the true distance of about 40 000 km — using only a shadow and a ratio.",
  },
};
