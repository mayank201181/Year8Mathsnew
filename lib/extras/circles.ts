import type { TopicExtras } from "../types.ts";

// ---------------------------------------------------------------------------
// Circles — engagement extras.
// ---------------------------------------------------------------------------

export const extras: TopicExtras = {
  hook:
    "Wrap a piece of string once around a 5-cent coin, a kopi cup or a bicycle wheel, and it always comes out just over 3 times as long as the distance straight across. Why is it the same number for every circle — and why can nobody ever write that number down exactly?",

  didYouKnow: [
    "π is **irrational**: its decimals go on forever and never settle into a repeating pattern. Johann Heinrich Lambert proved this in the 1760s. So 3.14 and {{22/7}} are only approximations — and {{22/7}} = 3.142 857… is slightly *bigger* than π = 3.141 592…",
    "NASA's Jet Propulsion Laboratory uses π to just 15 decimal places (3.141 592 653 589 793) for its most accurate spacecraft navigation. Fewer than 40 decimal places would be enough to work out the circumference of the whole observable universe to within the width of a single hydrogen atom.",
    "The symbol π was first used for this number by the Welsh mathematician William Jones in 1706. It became standard after Leonhard Euler took it up in the 1730s. π is the first letter of the Greek words for *periphery* and *perimeter*.",
    "14 March is **Pi Day**, because in month–day order it reads 3.14. It is also Albert Einstein's birthday, and in 2019 UNESCO declared 14 March the *International Day of Mathematics*.",
    "The Singapore Flyer's wheel is 150 m across, so a point on its rim travels about π × 150 ≈ 471 m in one rotation, which takes roughly 30 minutes. (The capsules are mounted just outside the rim, so they travel a little further.)",
    "Of all shapes with the same perimeter, a circle encloses the most area. A 40 cm loop of string makes a square of area 100 cm², but shaped into a circle it encloses about 127 cm².",
  ],

  activities: [
    {
      title: "Hunt for π around the house",
      emoji: "🧵",
      materials: [
        "4 or 5 round objects of different sizes (a coin, a mug, a tin, a plate, a roll of tape)",
        "String or a thin strip of paper",
        "A ruler or tape measure",
        "A calculator",
        "Graph paper (optional)",
      ],
      steps: [
        "Wrap the string once, tightly, around the first object. Mark where it meets itself, straighten it out and measure that length: this is the circumference {{C}}.",
        "Measure the diameter {{d}} straight across the widest part, through the centre. Tip: stand two books upright touching opposite sides of the object and measure the gap between them.",
        "Record {{C}} and {{d}} for every object in a table, and work out {{C ÷ d}} for each one to 2 decimal places.",
        "Find the mean of your {{C ÷ d}} values. How close is it to 3.14?",
        "Challenge: plot {{C}} (up the side) against {{d}} (along the bottom). What shape is the graph, and what is its gradient?",
      ],
      maths:
        "Every circle is an enlargement of every other circle, so the ratio {{C ÷ d}} is the same for all of them: that ratio is π ≈ 3.14. Your values will wobble a little (perhaps between 3.0 and 3.3) because string stretches and every measurement is rounded. Taking the mean of several objects cancels out some of that error. The graph is a straight line through the origin with gradient π: circumference is directly proportional to diameter, which is exactly what {{C = pi d}} says.",
    },
    {
      title: "Toothpick π (Buffon's needle)",
      emoji: "🪵",
      materials: [
        "20 identical toothpicks or used matchsticks",
        "A large sheet of paper and a ruler",
        "A pencil",
        "A calculator",
      ],
      steps: [
        "Draw straight parallel lines across the paper, exactly one toothpick-length apart.",
        "Hold all 20 toothpicks about 30 cm above the paper and drop them so they scatter. Any that land off the paper get dropped again.",
        "Count how many toothpicks cross or touch a line. Write down the number dropped (20) and the number of crossings.",
        "Repeat until you have dropped at least 200 toothpicks altogether.",
        "Work out 2 × (total dropped) ÷ (total crossings). What number do you get?",
      ],
      maths:
        "The French scientist Georges-Louis Leclerc, Comte de Buffon, posed this puzzle in 1733. When the gap between the lines equals the length of the toothpick, the probability that a toothpick crosses a line is exactly {{2/pi}} ≈ 0.64. π sneaks in because a toothpick can land pointing in any direction, all the way round a circle. So {{\"crossings\" ÷ \"drops\" ~= 2/pi}}, which rearranges to {{pi ~= (2 * \"drops\")/\"crossings\"}}. With 200 drops you will usually get somewhere between about 2.8 and 3.5. The more you drop, the closer you tend to get, but slowly: this is a fun way to meet π, not a fast one.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Squeezing π between a hexagon and a square",
      svg: `<svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle of radius r with a regular hexagon drawn inside it and a square drawn around it. The hexagon is split into six equilateral triangles with sides r, so its perimeter is 6r, which is 3d. The square has sides 2r, so its perimeter is 8r, which is 4d. The circumference lies between them, so pi is between 3 and 4."><rect x="0" y="0" width="480" height="270" fill="#ffffff"/><rect x="40" y="50" width="180" height="180" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><circle cx="130" cy="140" r="90" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polygon points="220,140 175,62.06 85,62.06 40,140 85,217.94 175,217.94" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="1" stroke-dasharray="4 3"><line x1="130" y1="140" x2="220" y2="140"/><line x1="130" y1="140" x2="175" y2="62.06"/><line x1="130" y1="140" x2="85" y2="62.06"/><line x1="130" y1="140" x2="40" y2="140"/><line x1="130" y1="140" x2="85" y2="217.94"/><line x1="130" y1="140" x2="175" y2="217.94"/></g><circle cx="130" cy="140" r="3" fill="#1f2937"/><g font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="175" y="134">r</text><text x="188" y="110">r</text><text x="130" y="250">2r</text></g><text x="250" y="34" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">Squeezing the circumference</text><rect x="250" y="64" width="12" height="12" fill="#bbf7d0" stroke="#334155"/><text x="270" y="75" font-size="12" font-family="sans-serif" fill="#1f2937">Hexagon inside: 6 sides of r</text><text x="270" y="93" font-size="12" font-family="sans-serif" fill="#1f2937">perimeter = 6r = 3d</text><rect x="250" y="114" width="12" height="12" fill="#fde68a" stroke="#334155"/><text x="270" y="125" font-size="12" font-family="sans-serif" fill="#1f2937">Circle: circumference C</text><rect x="250" y="146" width="12" height="12" fill="#c7d2fe" stroke="#334155"/><text x="270" y="157" font-size="12" font-family="sans-serif" fill="#1f2937">Square outside: 4 sides of 2r</text><text x="270" y="175" font-size="12" font-family="sans-serif" fill="#1f2937">perimeter = 8r = 4d</text><text x="250" y="212" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937">3d &lt; C &lt; 4d</text><text x="250" y="234" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937">so 3 &lt; π &lt; 4</text></svg>`,
      caption:
        "The hexagon is made of six equilateral triangles, so each of its sides is a radius and its perimeter is 6r = 3d. The square's sides are diameters, so its perimeter is 4d. The circle's circumference is trapped in between: 3d < C < 4d, so π = {{C ÷ d}} lies between 3 and 4. Use polygons with more and more sides and the trap closes in on 3.14159…",
    },
    {
      title: "A bit more than three radius squares",
      svg: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle of radius r inside a square of side 2r. Dashed lines split the square into four smaller squares, each r by r. A green diamond with its corners on the circle fills exactly half of the big square. The circle is bigger than the diamond, 2 r squared, and smaller than the big square, 4 r squared; its area is pi r squared, about 3.14 r squared."><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><rect x="35" y="40" width="190" height="190" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><circle cx="130" cy="135" r="95" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polygon points="130,40 225,135 130,230 35,135" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"><line x1="130" y1="40" x2="130" y2="230"/><line x1="35" y1="135" x2="225" y2="135"/></g><circle cx="130" cy="135" r="3" fill="#1f2937"/><g font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="82.5" y="33">r</text><text x="177.5" y="33">r</text><text x="24" y="92">r</text><text x="24" y="187">r</text></g><text x="250" y="34" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">Counting radius squares</text><text x="250" y="54" font-size="11" font-family="sans-serif" fill="#334155">each dashed square is r × r = r²</text><rect x="250" y="78" width="12" height="12" fill="#c7d2fe" stroke="#334155"/><text x="270" y="89" font-size="12" font-family="sans-serif" fill="#1f2937">Big square = 4r²</text><rect x="250" y="108" width="12" height="12" fill="#fde68a" stroke="#334155"/><text x="270" y="119" font-size="12" font-family="sans-serif" fill="#1f2937">Circle = πr² ≈ 3.14r²</text><rect x="250" y="138" width="12" height="12" fill="#bbf7d0" stroke="#334155"/><text x="270" y="149" font-size="12" font-family="sans-serif" fill="#1f2937">Diamond = 2r²</text><text x="270" y="165" font-size="11" font-family="sans-serif" fill="#334155">(half the big square)</text><text x="250" y="200" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937">2r² &lt; πr² &lt; 4r²</text><text x="250" y="224" font-size="12" font-family="sans-serif" fill="#1f2937">The circle fills π ÷ 4 ≈ 78.5%</text><text x="250" y="242" font-size="12" font-family="sans-serif" fill="#1f2937">of the big square.</text></svg>`,
      caption:
        "Split the square around a circle into four 'radius squares', each r × r. The circle covers less than all 4 of them, but more than the green diamond, which is exactly half the big square: 2 radius squares. The true area, {{pi r^2}}, is just over 3 radius squares. That is why a quick estimate of a circle's area is 'three times the radius squared, plus a bit'.",
    },
  ],

  history: {
    title: "Liu Hui's endless cutting",
    story:
      "Around the year 263, the Chinese mathematician Liu Hui wanted to pin down the size of a circle. He drew a regular hexagon inside it, then kept doubling the number of sides — 12, 24, 48, 96, 192 — using Pythagoras' theorem to work out each new side. \"The finer you cut,\" he wrote, \"the less is lost\": cut forever and the polygon becomes the circle itself. His 192-sided polygon gave π ≈ 3.14. Two centuries later, Zu Chongzhi pushed the same idea much further, probably to polygons with more than 12 000 sides, and showed that π lies between 3.141 592 6 and 3.141 592 7. He also gave the fraction {{355/113}}, which is correct to six decimal places. For about 900 years, nobody anywhere in the world found a more accurate value.",
  },
};
