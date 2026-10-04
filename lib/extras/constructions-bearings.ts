import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "With just a pair of compasses and a straight edge you can cut **any** angle into two exactly equal halves. Cutting every angle into three equal parts the same way? People tried for over 2000 years, until in 1837 Pierre Wantzel proved it is impossible (although some angles, like 90°, can be done).",

  didYouKnow: [
    "The very first result in Euclid's *Elements*, written around 300 BC, is a construction: draw an equilateral triangle on a line segment using two circles. It is the SSS method with all three sides equal, and it is still how you construct a 60° angle today.",
    "In 1796, 18-year-old Carl Friedrich Gauss discovered how to construct a regular 17-sided polygon with only a straight edge and compasses. It was the first new constructible regular polygon found since the ancient Greeks. A monument to Gauss in his home town of Braunschweig, Germany, is decorated with a 17-pointed star.",
    "Every point you can construct with a ruler and compasses can also be found with **compasses alone**, no ruler at all. Georg Mohr proved this in 1672, and Lorenzo Mascheroni proved it again, independently, in 1797.",
    "A runway's number is its compass bearing rounded to the nearest 10°, divided by 10. At Singapore Changi Airport the runways are numbered 02 at one end and 20 at the other (plus a letter, such as L or R, because they run side by side): a plane taking off from the 02 end heads roughly 020°, and from the other end roughly 200°. The two ends of a runway are a bearing and its back bearing, 180° apart.",
    "A magnetic compass points to magnetic north, not to the true North Pole, and the magnetic north pole wanders. In the early 2000s it was drifting from northern Canada towards Siberia at about 50 km a year, so maps and navigators have to correct compass bearings for the difference.",
    "On a 1 : 50 000 map, 1 cm stands for 50 000 cm, which is 500 m, so 2 cm on the map is 1 km on the ground. Many hiking maps use this scale or 1 : 25 000, where 4 cm is 1 km.",
  ],

  activities: [
    {
      title: "Bearing treasure hunt",
      emoji: "🧭",
      materials: [
        "A magnetic compass, or a compass app on a phone",
        "A tape measure (or count your paces)",
        "A small \"treasure\", such as a coin or an eraser",
        "Squared paper, a ruler and a protractor",
        "A partner",
      ],
      steps: [
        "In a park, playground or void deck, choose a start point S and hide the treasure 10 to 20 m away.",
        "Plan a two-leg route to it. Hold the compass flat, face along each leg and read its bearing, then measure its length. For example: 12 m on 040°, then 9 m on 130°. Write every bearing with three figures.",
        "Give your partner only the written route. Can they find the treasure?",
        "At home, make a scale drawing using 1 cm : 2 m. Draw a North line at S and at the turning point, measure each bearing with a protractor and rule each leg to scale (6 cm and 4.5 cm for the example).",
        "Measure the straight line from S to the treasure on your drawing and turn it back into metres with the scale. Measure its bearing too. For the example you should get 7.5 cm, which is 15 m, on a bearing of about 077°.",
        "Go back outside and test the shortcut: walk the direct bearing and distance from S. Then use the back bearing to walk home.",
      ],
      maths:
        "Each leg is a bearing plus a distance, and a scale drawing turns \"measure it in the real world\" into \"measure it on paper\": every ruler length × 2 gives metres. In the example the legs turn through exactly 90° (130° − 40°), so the shortcut is the hypotenuse of a 9-12-15 right-angled triangle. Walking home uses the back bearing (± 180°) because the North lines at the start and at the treasure are parallel.",
    },
    {
      title: "Fold it to check it",
      emoji: "📄",
      materials: ["Thin plain paper (printer paper folds well)", "A sharp pencil and a ruler", "A pair of compasses", "A protractor"],
      steps: [
        "Draw a line segment AB about 10 cm long. Construct its perpendicular bisector: arcs above and below the line from A and from B, with a radius of more than 5 cm.",
        "Now fold the paper so that A lands exactly on top of B, and crease firmly. Unfold. Does the crease lie right on your constructed line?",
        "Draw an angle of about 70° and construct its bisector with compasses. Then fold so that one arm lies exactly along the other. Compare the crease with your bisector and measure both halves with a protractor.",
        "Mark a point P about 4 cm away from a long straight line. Construct the perpendicular from P to the line. Then fold the line back onto itself so that the crease passes through P. Is it the same line?",
        "Score yourself: if each crease and construction are within about 1 mm of each other, your constructions are accurate.",
      ],
      maths:
        "Folding A onto B is a **reflection**: every point on the crease ends up the same distance from A as from B, which is exactly what the perpendicular bisector is. Folding one arm onto the other reflects the angle onto itself, so the crease splits it into two equal halves. Folding a line onto itself makes a crease at 90° to it. The folds and the compass arcs agree because both of them find points that are **equidistant**.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Euclid's first construction: an equilateral triangle",
      svg: `<svg viewBox="0 0 440 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two circles of equal radius. One has centre A and the other has centre B, and each passes through the other centre, so the radius equals AB. They cross at C. Triangle ABC has three equal sides, marked with tick marks, and each of its angles is 60 degrees."><rect x="0" y="0" width="440" height="320" fill="#ffffff"/><circle cx="165" cy="170" r="110" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="275" cy="170" r="110" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 4"/><polygon points="165,170 275,170 220,74.74" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="220" y1="163" x2="220" y2="177" stroke="#1f2937" stroke-width="1.5"/><line x1="198.56" y1="125.87" x2="186.44" y2="118.87" stroke="#1f2937" stroke-width="1.5"/><line x1="253.56" y1="118.87" x2="241.44" y2="125.87" stroke="#1f2937" stroke-width="1.5"/><path d="M 193 170 A 28 28 0 0 0 179 145.75" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M 247 170 A 28 28 0 0 1 261 145.75" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M 207 97.26 A 26 26 0 0 0 233 97.26" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="201" y="155" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">60°</text><text x="239" y="155" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">60°</text><text x="220" y="120" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">60°</text><circle cx="165" cy="170" r="3.5" fill="#1f2937"/><circle cx="275" cy="170" r="3.5" fill="#1f2937"/><circle cx="220" cy="74.74" r="3.5" fill="#1f2937"/><text x="149" y="190" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="291" y="190" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text><text x="220" y="62" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">C</text><text x="20" y="34" font-size="12" font-family="sans-serif" fill="#2563eb">centre A, radius AB</text><text x="300" y="34" font-size="12" font-family="sans-serif" fill="#b45309">centre B, radius BA</text><text x="220" y="306" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">AC = AB = BC, so every angle is 60°</text></svg>`,
      caption:
        "C is on the blue circle, so AC = AB. C is also on the orange circle, so BC = BA. All three sides are equal, so the triangle is equilateral and each angle is 180° ÷ 3 = 60°. This is how you construct a 60° angle with compasses, and bisecting it gives 30°.",
    },
    {
      title: "Why a back bearing is 180° different",
      svg: `<svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Points A and B with parallel North lines. B is on a bearing of 060 degrees from A. At A the angle from North clockwise to the line AB is 60 degrees. At B the angle from South clockwise to the line BA is also 60 degrees, because they are alternate angles. So the bearing of A from B is 180 degrees plus 60 degrees, which is 240 degrees."><rect x="0" y="0" width="440" height="300" fill="#ffffff"/><line x1="130" y1="210" x2="130" y2="74" stroke="#1f2937" stroke-width="1.5"/><polygon points="130,62 125,75 135,75" fill="#1f2937"/><text x="118" y="73" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">N</text><line x1="130" y1="210" x2="130" y2="245" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M 124 116 L 130 108 L 136 116" fill="none" stroke="#1f2937" stroke-width="1.5"/><line x1="294.54" y1="115" x2="294.54" y2="34" stroke="#1f2937" stroke-width="1.5"/><polygon points="294.54,22 289.54,35 299.54,35" fill="#1f2937"/><text x="282.5" y="33" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">N</text><line x1="294.54" y1="115" x2="294.54" y2="165" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M 288.54 72 L 294.54 64 L 300.54 72" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M 130 210 L 130 176 A 34 34 0 0 1 159.44 193 Z" fill="#bbf7d0" stroke="#15803d" stroke-width="1.2"/><path d="M 294.54 115 L 294.54 149 A 34 34 0 0 1 265.1 132 Z" fill="#bbf7d0" stroke="#15803d" stroke-width="1.2"/><path d="M 294.54 93 A 22 22 0 1 1 275.49 126" fill="none" stroke="#b45309" stroke-width="2"/><line x1="130" y1="210" x2="294.54" y2="115" stroke="#1f2937" stroke-width="2.5"/><polygon points="218.33,159 210.19,168.9 205.69,161.1" fill="#1f2937"/><text x="154" y="172" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#15803d">60°</text><text x="270.5" y="161" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#15803d">60°</text><text x="330" y="138" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#b45309">240°</text><circle cx="130" cy="210" r="3.5" fill="#1f2937"/><circle cx="294.54" cy="115" r="3.5" fill="#1f2937"/><text x="116" y="224" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="279" y="110" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text><text x="16" y="28" font-size="12" font-family="sans-serif" fill="#1f2937">Bearing of B from A = 060°</text><text x="220" y="266" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Parallel North lines: the green alternate angles are equal.</text><text x="220" y="288" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Bearing of A from B = 180° + 60° = 240°</text></svg>`,
      caption:
        "The North lines at A and B are parallel, and AB crosses both, making a Z shape. The green angles are alternate angles, so they are equal. At B you turn 180° to face South, then the same 60° more, so the back bearing is 060° + 180° = 240°. If the first bearing is more than 180°, subtract 180° instead.",
    },
  ],

  history: {
    title: "Zheng He's needle routes",
    story:
      "Between 1405 and 1433 the Chinese admiral Zheng He led seven enormous voyages across the South China Sea and the Indian Ocean, with fleets of huge wooden \"treasure ships\". How do you steer a fleet across open sea with no land in sight? His navigators used the magnetic compass, divided into 24 directions 15° apart, and recorded each route as a list of legs: steer on this compass direction for so many watches of sailing time, then switch to the next direction.\n\nThese \"needle routes\" are bearing-and-distance journeys, exactly what you draw in a scale drawing. A long chart now called the Mao Kun map is believed to come from these voyages. It is dotted with sailing directions and place names, including Danmaxi: Temasek, the old name for Singapore.",
  },
};
