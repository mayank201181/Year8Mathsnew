// Engagement extras for "Straight-Line & Real-Life Graphs" (not part of the audited question bank).
import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Infinitely many different straight lines can be drawn on a grid, yet every one that isn't vertical is pinned down by just two numbers: how steep it is and where it crosses the y-axis. Can you find the two numbers for the line through (0, 1) and (2, 5)?",
  didYouKnow: [
    "Different countries use different letters for the same idea. In the UK and Singapore a straight line is {{y = mx + c}}, in the USA it is usually written {{y = mx + b}}, and in Russia {{y = kx + b}}. Nobody knows for sure why *m* was chosen for the gradient.",
    "Guinness World Records lists Baldwin Street, a residential street in Dunedin, New Zealand, as the world's steepest street. At its steepest it rises about 35 m for every 100 m across — a gradient of about 0.35. Road gradients are usually given as percentages, and Guinness measured it at 34.8%.",
    "Many building codes, including the US accessibility standards, say a wheelchair ramp must be no steeper than 1 in 12: at most 1 cm up for every 12 cm across. That is a gradient of {{1/12}}, about 0.083 — far gentler than most staircases.",
    "Around 1350 the French scholar Nicole Oresme drew speed against time as a row of upright lines — a kind of graph, nearly 300 years before Descartes. He used the area of the shape to work out how far a steadily speeding-up object travels.",
    "In 1878 the French scientist Étienne-Jules Marey printed a famous graphical timetable of the trains between Paris and Lyon in his book on the graphical method, crediting the design to the railway engineer Charles Ibry. Each train is a sloping line, steeper lines are faster trains, and wherever two lines cross, two trains pass each other. Railway planners still use these time–distance diagrams.",
    "The Scottish engineer William Playfair is usually credited with inventing the line graph and the bar chart, in his *Commercial and Political Atlas* of 1786. Before that, numbers like trade figures were almost always shown in tables.",
  ],
  activities: [
    {
      title: "Walk a distance–time graph",
      emoji: "🚶",
      materials: [
        "A long corridor, void deck or garden path (at least 10 m)",
        "Chalk or masking tape",
        "A tape measure (or count your steps)",
        "A phone stopwatch",
        "Graph paper and a pencil",
        "A partner",
      ],
      steps: [
        "Mark a start line, then a mark every 2 m up to 10 m.",
        "Your partner calls out the time every 5 seconds while you act out this story: walk slowly away from the start for 15 s, stand still for 10 s, then walk quickly back to the start.",
        "At each call your partner writes down your distance from the start line (estimate between the marks).",
        "Plot distance from the start (m, up the side) against time (s, along the bottom) and join the points.",
        "Work out the gradient of each part: distance ÷ time. Which part is steepest? Does that match how fast you felt you were walking?",
        "Swap roles. Draw a new three-part graph — include one flat part — and see if your partner can act it out from the graph alone.",
      ],
      maths:
        "On a distance–time graph the gradient is the speed. If you walked 6 m in 15 s, the gradient is 6 ÷ 15 = 0.4, so your speed was 0.4 m/s. A flat part means standing still (your distance isn't changing), a part going down means walking back towards the start, and a steeper part means faster. Walking at a steady speed gives a straight line; speeding up or slowing down bends it into a curve.",
    },
    {
      title: "The stacking-cups line",
      emoji: "🥤",
      materials: [
        "6–10 identical plastic or paper cups",
        "A ruler marked in cm",
        "Graph paper and a pencil",
        "Optional: a stack of identical coins",
      ],
      steps: [
        "Measure the height of 1 cup, then of stacks of 2, 3, 4, 5 and 6 cups nested inside each other. Record them in a table.",
        "How much taller does the stack get with each extra cup? Is it the same every time?",
        "Plot height (cm) against number of cups. The points should lie on a straight line — draw it and extend it back to 0 cups.",
        "Write your rule as height = m × (number of cups) + c. Why is c *not* the height of one cup?",
        "Use your rule to predict how many cups would make a stack as tall as you are. Check a smaller prediction, such as 10 cups, by building it.",
        "Extension: stack coins instead. Why does the coin graph go through (0, 0) when the cup graph doesn't?",
      ],
      maths:
        "Every extra cup adds the same height (its rim), so the points lie on a straight line {{y = mx + c}}. The gradient m is the height of one rim, and c is the height of one cup minus one rim — the bit of the stack that isn't made of rims. For example, if 1 cup is 11 cm tall and each extra cup adds 1.5 cm, then height = 1.5 × cups + 9.5. Coins don't overlap, so the height of n coins is n × (thickness of one coin): a direct proportion graph {{y = kx}} that passes through the origin.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Every gradient triangle gives the same fraction",
      svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The line y = half x plus 1 drawn on a grid from x = minus 2 to 8. A small yellow gradient triangle from (0, 1) goes 2 across and 1 up to (2, 2). A larger green triangle from (2, 2) goes 4 across and 2 up to (6, 4). A key says 1 divided by 2 is 0.5 and 2 divided by 4 is 0.5."><rect x="0" y="0" width="400" height="300" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="20" y1="20" x2="20" y2="272"/><line x1="56" y1="20" x2="56" y2="272"/><line x1="92" y1="20" x2="92" y2="272"/><line x1="128" y1="20" x2="128" y2="272"/><line x1="164" y1="20" x2="164" y2="272"/><line x1="200" y1="20" x2="200" y2="272"/><line x1="236" y1="20" x2="236" y2="272"/><line x1="272" y1="20" x2="272" y2="272"/><line x1="308" y1="20" x2="308" y2="272"/><line x1="344" y1="20" x2="344" y2="272"/><line x1="380" y1="20" x2="380" y2="272"/><line x1="20" y1="20" x2="380" y2="20"/><line x1="20" y1="56" x2="380" y2="56"/><line x1="20" y1="92" x2="380" y2="92"/><line x1="20" y1="128" x2="380" y2="128"/><line x1="20" y1="164" x2="380" y2="164"/><line x1="20" y1="200" x2="380" y2="200"/><line x1="20" y1="236" x2="380" y2="236"/><line x1="20" y1="272" x2="380" y2="272"/></g><line x1="20" y1="236" x2="386" y2="236" stroke="#334155" stroke-width="1.5"/><line x1="92" y1="276" x2="92" y2="14" stroke="#334155" stroke-width="1.5"/><text x="392" y="232" font-size="13" font-family="sans-serif" font-style="italic" text-anchor="end" fill="#1f2937">x</text><text x="98" y="18" font-size="13" font-family="sans-serif" font-style="italic" fill="#1f2937">y</text><g font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="20" y="251">−2</text><text x="164" y="251">2</text><text x="236" y="251">4</text><text x="308" y="251">6</text><text x="380" y="251">8</text></g><g font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end"><text x="86" y="168">2</text><text x="86" y="96">4</text><text x="86" y="24">6</text></g><polygon points="92,200 164,200 164,164" fill="#fde68a" stroke="#334155" stroke-width="2"/><polygon points="164,164 308,164 308,92" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><line x1="20" y1="236" x2="380" y2="56" stroke="#1f2937" stroke-width="2.5"/><circle cx="92" cy="200" r="4" fill="#1f2937"/><circle cx="164" cy="164" r="4" fill="#1f2937"/><circle cx="308" cy="92" r="4" fill="#1f2937"/><g font-size="12" font-family="sans-serif" font-weight="700" fill="#1f2937"><text x="128" y="216" text-anchor="middle">run 2</text><text x="170" y="186">rise 1</text><text x="236" y="180" text-anchor="middle">run 4</text><text x="314" y="132">rise 2</text><text x="86" y="194" text-anchor="end">(0, 1)</text></g><text x="372" y="44" font-size="13" font-family="sans-serif" font-weight="700" text-anchor="end" fill="#1f2937">y = ½x + 1</text><rect x="216" y="188" width="160" height="36" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="225" y="203" font-size="12" font-family="sans-serif" fill="#1f2937">small: 1 ÷ 2 = 0.5</text><text x="225" y="218" font-size="12" font-family="sans-serif" fill="#1f2937">big: 2 ÷ 4 = 0.5</text></svg>`,
      caption:
        "Wherever you draw a gradient triangle on a straight line, and however big you make it, rise ÷ run comes out the same: {{1/2 = 2/4}}. The two triangles are similar — same angles, one an enlargement of the other. That is why one number, the gradient, describes the steepness of the whole line.",
    },
    {
      title: "The midpoint is halfway across and halfway up",
      svg: `<svg viewBox="0 0 420 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Points A at (minus 4, 1) and B at (6, 5) joined by a line segment. A dashed path goes 10 across from A to (6, 1), then 4 up to B. Halfway across is x = 1 and halfway up is y = 3, which meet at the midpoint M at (1, 3) on the segment."><rect x="0" y="0" width="420" height="290" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="30" y1="30" x2="30" y2="240"/><line x1="60" y1="30" x2="60" y2="240"/><line x1="90" y1="30" x2="90" y2="240"/><line x1="120" y1="30" x2="120" y2="240"/><line x1="150" y1="30" x2="150" y2="240"/><line x1="180" y1="30" x2="180" y2="240"/><line x1="210" y1="30" x2="210" y2="240"/><line x1="240" y1="30" x2="240" y2="240"/><line x1="270" y1="30" x2="270" y2="240"/><line x1="300" y1="30" x2="300" y2="240"/><line x1="330" y1="30" x2="330" y2="240"/><line x1="360" y1="30" x2="360" y2="240"/><line x1="390" y1="30" x2="390" y2="240"/><line x1="30" y1="30" x2="390" y2="30"/><line x1="30" y1="60" x2="390" y2="60"/><line x1="30" y1="90" x2="390" y2="90"/><line x1="30" y1="120" x2="390" y2="120"/><line x1="30" y1="150" x2="390" y2="150"/><line x1="30" y1="180" x2="390" y2="180"/><line x1="30" y1="210" x2="390" y2="210"/><line x1="30" y1="240" x2="390" y2="240"/></g><line x1="30" y1="210" x2="396" y2="210" stroke="#334155" stroke-width="1.5"/><line x1="180" y1="244" x2="180" y2="24" stroke="#334155" stroke-width="1.5"/><text x="404" y="214" font-size="13" font-family="sans-serif" font-style="italic" fill="#1f2937">x</text><text x="186" y="24" font-size="13" font-family="sans-serif" font-style="italic" fill="#1f2937">y</text><g font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="60" y="226">−4</text><text x="120" y="226">−2</text><text x="240" y="226">2</text><text x="300" y="226">4</text><text x="360" y="226">6</text></g><g font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end"><text x="174" y="154">2</text><text x="174" y="94">4</text><text x="174" y="34">6</text></g><line x1="60" y1="180" x2="360" y2="180" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/><line x1="360" y1="180" x2="360" y2="60" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/><line x1="210" y1="180" x2="210" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="2 3"/><line x1="360" y1="120" x2="210" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="2 3"/><line x1="60" y1="180" x2="360" y2="60" stroke="#1f2937" stroke-width="2.5"/><circle cx="210" cy="180" r="3.5" fill="#1f2937"/><circle cx="360" cy="120" r="3.5" fill="#1f2937"/><circle cx="60" cy="180" r="5.5" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="360" cy="60" r="5.5" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="210" cy="120" r="6.5" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><g font-size="12" font-family="sans-serif" font-weight="700" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="60" y="198" text-anchor="middle">A(−4, 1)</text><text x="350" y="50" text-anchor="end">B(6, 5)</text><text x="204" y="108" text-anchor="end">M(1, 3)</text><text x="230" y="198" text-anchor="middle">10 across, half is 5</text><text x="352" y="152" text-anchor="end">4 up,</text><text x="352" y="168" text-anchor="end">half is 2</text></g><text x="210" y="270" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">M = ((−4 + 6) ÷ 2, (1 + 5) ÷ 2) = (1, 3)</text></svg>`,
      caption:
        "To get from A(−4, 1) to B(6, 5) you go 10 across and 4 up. The midpoint M is half of each: 5 across and 2 up from A, which lands on (1, 3). That is the same as taking the mean of the coordinates: {{((-4 + 6)/2, (1 + 5)/2) = (1, 3)}}.",
    },
  ],
  history: {
    title: "Descartes, Fermat and the plane with a name",
    story:
      "In 1637 the French philosopher René Descartes published *La Géométrie*, an appendix to his famous *Discourse on Method*. In it he showed how a curve can be described by an equation linking two quantities — the idea behind every graph in this topic. At almost the same time, the lawyer and mathematician Pierre de Fermat worked out very similar ideas, but he shared them only in letters and handwritten papers, so Descartes got the fame and the name: *Cartesian* comes from Cartesius, the Latin form of Descartes. A popular story says he dreamed up coordinates while lying in bed watching a fly crawl across the ceiling. It is probably a legend, though he really did like to lie in bed thinking until late in the morning. Oddly, his book never drew the neat pair of perpendicular x- and y-axes we use today — later mathematicians added those.",
  },
};
