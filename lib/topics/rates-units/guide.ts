import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "rates-units",
  title: "Measures, Units & Rates",
  strand: "Ratio & Proportion",
  icon: "🚀",
  summary: "Switch units with confidence, then master the rates behind journeys, prices and materials.",
  intro:
    "Every measurement is a number *and* a unit, and changing the unit changes the number. In this chapter you will convert lengths, areas, volumes, times and even miles with confidence, then combine units into **rates** such as km/h, $ per kg and g/cm³. Rates let you compare things fairly: which train is faster, which bag of rice is better value, which metal is denser.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "metric-units",
      heading: "Metric conversions",
      discovery: {
        problem:
          "A 1 kg bag of rice holds roughly 50 000 grains. Estimate the mass of one grain in **milligrams**. Before you calculate: will the answer be a big number or a small one?",
        idea:
          "Change 1 kg into milligrams first: 1 kg = 1000 g = 1 000 000 mg. Then share it out: 1 000 000 ÷ 50 000 = 20 mg per grain. A milligram is a tiny unit, so even a light grain is a fair *number* of them. Every metric conversion is just × or ÷ by a power of 10 (10, 100, 1000, …), and the prefixes tell you which.",
      },
      body:
        "The metric system has a **base unit** for each kind of measurement: the **metre** (m) for length, the **gram** (g) for mass and the **litre** (l) for **capacity**, which is how much liquid a container holds. A **prefix** in front of the base unit scales it by a power of 10.\n\n| Prefix | Meaning | Example |\n|---|---|---|\n| kilo- (k) | 1000 times | 1 km = 1000 m |\n| centi- (c) | one hundredth, {{1/100}} | 1 cm = {{1/100}} m |\n| milli- (m) | one thousandth, {{1/1000}} | 1 mg = {{1/1000}} g |\n\nThe facts to know by heart:\n\n- **Length:** 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km\n- **Mass:** 1000 mg = 1 g, 1000 g = 1 kg, 1000 kg = 1 tonne (t)\n- **Capacity:** 1000 ml = 1 l, 100 cl = 1 l, 10 ml = 1 cl\n\n**The golden rule.** Changing to a **smaller** unit, you need **more** of them, so **multiply**. Changing to a **bigger** unit, you need **fewer** of them, so **divide**.\n\n    3.6 km = 3.6 × 1000 = 3600 m\n    450 g = 450 ÷ 1000 = 0.45 kg\n    75 cl = 75 × 10 = 750 ml\n\nFor a two-step change, go one rung at a time (km → m → cm) or combine the factors: 1 km = 1000 × 100 = 100 000 cm.\n\n**Choosing sensible units.** Pick the unit that gives a manageable number: a phone's thickness in mm, a classroom in m, the drive from Jurong to Changi in km; a 5-cent coin in g, a durian in kg; a spoonful of syrup in ml, a water bottle in litres. Before you add, subtract or compare quantities, put them all in the **same unit**.",
      diagram: `<svg viewBox="0 0 480 318" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion ladders. Length: km, m, cm, mm with times 1000, times 100, times 10 going right and divide going left. Mass: t, kg, g, mg with times 1000 at each step. Capacity: l, cl, ml with times 100 then times 10."><rect width="480" height="318" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937"><text x="16" y="26" font-size="13" font-weight="bold">Length</text><text x="16" y="121" font-size="13" font-weight="bold">Mass</text><text x="16" y="216" font-size="13" font-weight="bold">Capacity</text></g><g stroke="#334155" stroke-width="1.5"><rect x="16" y="34" width="60" height="34" fill="#c7d2fe"/><rect x="145" y="34" width="60" height="34" fill="#c7d2fe"/><rect x="274" y="34" width="60" height="34" fill="#c7d2fe"/><rect x="403" y="34" width="60" height="34" fill="#c7d2fe"/><rect x="16" y="129" width="60" height="34" fill="#fde68a"/><rect x="145" y="129" width="60" height="34" fill="#fde68a"/><rect x="274" y="129" width="60" height="34" fill="#fde68a"/><rect x="403" y="129" width="60" height="34" fill="#fde68a"/><rect x="16" y="224" width="60" height="34" fill="#bae6fd"/><rect x="145" y="224" width="60" height="34" fill="#bae6fd"/><rect x="274" y="224" width="60" height="34" fill="#bae6fd"/></g><g font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><text x="46" y="56">km</text><text x="175" y="56">m</text><text x="304" y="56">cm</text><text x="433" y="56">mm</text><text x="46" y="151">t</text><text x="175" y="151">kg</text><text x="304" y="151">g</text><text x="433" y="151">mg</text><text x="46" y="246">l</text><text x="175" y="246">cl</text><text x="304" y="246">ml</text><text x="433" y="246" font-size="12">(1 l = 1000 ml)</text></g><g stroke="#334155" stroke-width="1.5"><line x1="80" y1="43" x2="135" y2="43"/><line x1="141" y1="59" x2="86" y2="59"/><line x1="209" y1="43" x2="264" y2="43"/><line x1="270" y1="59" x2="215" y2="59"/><line x1="338" y1="43" x2="393" y2="43"/><line x1="399" y1="59" x2="344" y2="59"/><line x1="80" y1="138" x2="135" y2="138"/><line x1="141" y1="154" x2="86" y2="154"/><line x1="209" y1="138" x2="264" y2="138"/><line x1="270" y1="154" x2="215" y2="154"/><line x1="338" y1="138" x2="393" y2="138"/><line x1="399" y1="154" x2="344" y2="154"/><line x1="80" y1="233" x2="135" y2="233"/><line x1="141" y1="249" x2="86" y2="249"/><line x1="209" y1="233" x2="264" y2="233"/><line x1="270" y1="249" x2="215" y2="249"/></g><g fill="#334155"><polygon points="141,43 134,39 134,47"/><polygon points="80,59 87,55 87,63"/><polygon points="270,43 263,39 263,47"/><polygon points="209,59 216,55 216,63"/><polygon points="399,43 392,39 392,47"/><polygon points="338,59 345,55 345,63"/><polygon points="141,138 134,134 134,142"/><polygon points="80,154 87,150 87,158"/><polygon points="270,138 263,134 263,142"/><polygon points="209,154 216,150 216,158"/><polygon points="399,138 392,134 392,142"/><polygon points="338,154 345,150 345,158"/><polygon points="141,233 134,229 134,237"/><polygon points="80,249 87,245 87,253"/><polygon points="270,233 263,229 263,237"/><polygon points="209,249 216,245 216,253"/></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937"><text x="110.5" y="37">× 1000</text><text x="110.5" y="80">÷ 1000</text><text x="239.5" y="37">× 100</text><text x="239.5" y="80">÷ 100</text><text x="368.5" y="37">× 10</text><text x="368.5" y="80">÷ 10</text><text x="110.5" y="132">× 1000</text><text x="110.5" y="175">÷ 1000</text><text x="239.5" y="132">× 1000</text><text x="239.5" y="175">÷ 1000</text><text x="368.5" y="132">× 1000</text><text x="368.5" y="175">÷ 1000</text><text x="110.5" y="227">× 100</text><text x="110.5" y="270">÷ 100</text><text x="239.5" y="227">× 10</text><text x="239.5" y="270">÷ 10</text></g><g font-family="sans-serif" font-size="12" fill="#334155"><text x="16" y="292">→ to a smaller unit: multiply (the number gets bigger)</text><text x="16" y="310">← to a bigger unit: divide (the number gets smaller)</text></g></svg>`,
      diagramCaption:
        "Conversion ladders. Moving right goes to a smaller unit, so you multiply; moving left goes to a bigger unit, so you divide.",
      workedExamples: [
        {
          title: "Single-step conversions",
          problem: "Write 4.25 kg in grams, and 680 ml in litres.",
          steps: [
            "kg → g goes to a **smaller** unit, so multiply by 1000.",
            "4.25 × 1000 = 4250 g (each digit moves three places to the left).",
            "ml → l goes to a **bigger** unit, so divide by 1000: 680 ÷ 1000 = 0.68 l.",
          ],
          answer: "4250 g and 0.68 l",
          yourTurn: {
            question: "Your turn: write 2.35 kg in grams.",
            answer: { type: "number", value: 2350 },
            solution: "Grams are smaller, so multiply: 2.35 × 1000 = 2350 g.",
          },
        },
        {
          title: "Two units in one problem",
          problem: "Siti has a ribbon 2.4 m long. She cuts it into bookmarks, each 15 cm long. How many bookmarks does she get?",
          steps: [
            "The units don't match, so convert first. Metres → centimetres goes to a smaller unit: × 100.",
            "2.4 m = 2.4 × 100 = 240 cm.",
            "240 ÷ 15 = 16.",
          ],
          answer: "16 bookmarks",
        },
        {
          title: "Ordering mixed units",
          problem: "Put these lengths in order, smallest first: 0.8 km, 750 m, 81 000 cm, 79 500 mm.",
          steps: [
            "Convert everything to one unit. Metres is a good middle choice.",
            "0.8 km = 0.8 × 1000 = 800 m",
            "81 000 cm = 81 000 ÷ 100 = 810 m",
            "79 500 mm = 79 500 ÷ 1000 = 79.5 m",
            "In order: 79.5 m, 750 m, 800 m, 810 m.",
          ],
          answer: "79 500 mm, 750 m, 0.8 km, 81 000 cm. Notice that 79 500 mm looks huge but is the shortest length, because millimetres are tiny.",
        },
      ],
      keyPoints: [
        "kilo- means × 1000, centi- means {{1/100}}, milli- means {{1/1000}}.",
        "To a smaller unit → multiply. To a bigger unit → divide.",
        "Convert to the **same unit** before adding, subtracting or comparing.",
        "Ask 'should the number get bigger or smaller?' before you calculate.",
      ],
      whyItWorks:
        "A unit is a measuring stick. If the stick is 1000 times shorter (mm instead of m), you need 1000 times as many of them to cover the same length, so the number is multiplied by 1000. The length itself never changes; only the size of the stick does. Because every metric factor is a power of 10, converting just slides the digits along the place-value columns.",
      strategies: ["Estimate first", "Convert to the same unit", "Go one step at a time"],
      thinkDeeper:
        "A **micrometre** (µm) is a thousandth of a millimetre. A human hair is about 0.08 mm thick. How many micrometres is that? How many hairs, laid side by side, would make 1 cm?",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "area-volume-units",
      heading: "Area & volume units",
      discovery: {
        problem:
          "Arjun wants to cover a floor exactly 1 m by 1 m with tiny square tiles, each 1 cm by 1 cm. He says: '1 m = 100 cm, so I need 100 tiles.' Picture the floor. How many tiles fit along one edge? How many rows are there? How many tiles does he really need?",
        idea:
          "There are 100 tiles along each edge **and** 100 rows, so he needs 100 × 100 = 10 000 tiles. So 1 m² = 10 000 cm², not 100. Area is two lengths multiplied, so the length factor is used twice (squared). Volume is three lengths multiplied, so the factor is used three times (cubed).",
      },
      body:
        "A **square centimetre** (cm²) is the area of a square 1 cm by 1 cm. A **cubic centimetre** (cm³) is the volume of a cube 1 cm by 1 cm by 1 cm. Area is length × length and volume is length × length × length, so the length conversion factor is **squared for area** and **cubed for volume**.\n\n| Length | Area: square it | Volume: cube it |\n|---|---|---|\n| 1 cm = 10 mm | 1 cm² = 10 × 10 = 100 mm² | 1 cm³ = 10 × 10 × 10 = 1000 mm³ |\n| 1 m = 100 cm | 1 m² = 100 × 100 = 10 000 cm² | 1 m³ = 100 × 100 × 100 = 1 000 000 cm³ |\n| 1 km = 1000 m | 1 km² = 1000 × 1000 = 1 000 000 m² | (rarely needed) |\n\n**Capacity meets volume.** Liquid volume links to solid volume through three facts:\n\n- **1 cm³ = 1 ml**: a 1 cm cube holds one millilitre\n- **1000 cm³ = 1 litre**: a 10 cm × 10 cm × 10 cm cube holds exactly one litre\n- **1 m³ = 1000 litres**: because 1 000 000 ÷ 1000 = 1000\n\n**Land** is often measured in **hectares**. One hectare (ha) is a square 100 m by 100 m, so 1 ha = 10 000 m².\n\n**The safest method:** convert the *lengths* first, then calculate. A rug 2 m by 1.5 m is 200 cm by 150 cm, so its area is 200 × 150 = 30 000 cm². Check: 2 × 1.5 = 3 m², and 3 × 10 000 = 30 000 cm².",
      diagram: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: a 1 metre square, 100 cm on each side, divided into a 10 by 10 grid of 10 cm squares, totalling 10 000 square centimetres. Right: a cube with 10 cm edges holding 1000 cubic centimetres, which is 1 litre, with a tiny 1 cm cube marked as 1 ml."><rect width="480" height="290" fill="#ffffff"/><text x="30" y="20" font-family="sans-serif" font-size="11" fill="#1f2937">each small square: 10 cm × 10 cm = 100 cm²</text><rect x="30" y="30" width="200" height="200" fill="#c7d2fe"/><rect x="30" y="30" width="20" height="20" fill="#fde68a"/><path d="M50 30V230M70 30V230M90 30V230M110 30V230M130 30V230M150 30V230M170 30V230M190 30V230M210 30V230M30 50H230M30 70H230M30 90H230M30 110H230M30 130H230M30 150H230M30 170H230M30 190H230M30 210H230" stroke="#334155" stroke-width="0.6"/><rect x="30" y="30" width="200" height="200" fill="none" stroke="#334155" stroke-width="2"/><text x="130" y="248" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">100 cm = 1 m</text><text x="18" y="130" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" transform="rotate(-90 18 130)">100 cm = 1 m</text><text x="130" y="272" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">1 m² = 10 000 cm²</text><polygon points="300,110 340,70 440,70 400,110" fill="#e0f2fe" stroke="#334155" stroke-width="1.5"/><polygon points="400,110 440,70 440,170 400,210" fill="#7dd3fc" stroke="#334155" stroke-width="1.5"/><rect x="300" y="110" width="100" height="100" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><rect x="300" y="200" width="10" height="10" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="350" y="226" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">10 cm</text><text x="294" y="164" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">10 cm</text><text x="428" y="202" font-family="sans-serif" font-size="12" fill="#1f2937">10 cm</text><text x="370" y="252" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">1000 cm³ = 1 litre</text><rect x="318" y="263" width="10" height="10" fill="#fde68a" stroke="#334155" stroke-width="1"/><text x="334" y="272" font-family="sans-serif" font-size="12" fill="#1f2937">1 cm³ = 1 ml</text></svg>`,
      diagramCaption:
        "Left: 1 m² is 100 cm by 100 cm, so it holds 10 000 cm². Right: a 10 cm cube holds 10 × 10 × 10 = 1000 cm³, exactly 1 litre; each little 1 cm cube (yellow) is 1 ml.",
      workedExamples: [
        {
          title: "Square metres to square centimetres",
          problem: "Convert 3.5 m² to cm².",
          steps: ["1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm².", "3.5 × 10 000 = 35 000 cm²."],
          answer: "35 000 cm²",
          yourTurn: {
            question: "Your turn: convert 2.4 m² to cm².",
            answer: { type: "number", value: 24000 },
            solution: "1 m² = 10 000 cm², so 2.4 × 10 000 = 24 000 cm².",
          },
        },
        {
          title: "Volume to litres",
          problem: "A rectangular water tank measures 80 cm by 50 cm by 40 cm. How many litres does it hold when full?",
          steps: [
            "Volume = 80 × 50 × 40 = 160 000 cm³.",
            "1000 cm³ = 1 litre, so divide by 1000.",
            "160 000 ÷ 1000 = 160 litres.",
          ],
          answer: "160 litres",
        },
        {
          title: "Cubic metres to bottles",
          problem: "A cuboid tank measures 1.5 m by 1 m by 0.8 m. How many 1.5-litre bottles could its water fill?",
          steps: [
            "Volume = 1.5 × 1 × 0.8 = 1.2 m³.",
            "1 m³ = 1000 litres (a 1 m cube holds 1000 of the 10 cm litre-cubes).",
            "1.2 × 1000 = 1200 litres.",
            "1200 ÷ 1.5 = 800 bottles.",
          ],
          answer: "800 bottles",
        },
      ],
      keyPoints: [
        "Area: **square** the length factor. 1 m² = 10 000 cm² and 1 cm² = 100 mm².",
        "Volume: **cube** it. 1 m³ = 1 000 000 cm³ and 1 cm³ = 1000 mm³.",
        "1 cm³ = 1 ml, 1000 cm³ = 1 litre, 1 m³ = 1000 litres.",
        "Safest: convert the lengths first, then work out the area or volume.",
      ],
      whyItWorks:
        "Draw 1 m² as a 100 cm by 100 cm square: it splits into 100 rows of 100 little 1 cm squares, which is 100 × 100 = 10 000 of them. A 1 m cube splits into 100 layers, each holding 100 × 100 little cubes, so {{100^3}} = 1 000 000. The litre was defined as the volume of a 10 cm cube, which holds {{10^3}} = 1000 cubic centimetres, so 1 ml (a thousandth of a litre) is exactly 1 cm³.",
      strategies: ["Draw a diagram", "Convert lengths first", "Check with a known fact"],
      thinkDeeper:
        "A cube with 1 m edges is cut into 1 cm cubes, and all the little cubes are lined up in a single row. How long is the row, in kilometres? Predict first, then calculate.",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "imperial-units",
      heading: "Miles & kilometres",
      discovery: {
        problem:
          "A road sign in England says *London 50 miles*. A sign on Malaysia's North–South Expressway says *Kuala Lumpur 80 km*. Which city is further away? A useful fact: 5 miles is about the same distance as 8 km.",
        idea:
          "50 miles is 10 lots of 5 miles, so it is about 10 × 8 = 80 km. The two distances are about the same! A fact like 5 miles ≈ 8 km is a ratio, so you can scale it up or down like any other ratio.",
      },
      body:
        "Most of the world measures distance in kilometres, but the UK and the USA still use **imperial units** such as miles, feet, inches, pounds and pints. Conversions between imperial and metric units are **approximate**, so we use the symbol ≈, which means 'is approximately equal to'.\n\n**Miles and kilometres.** A mile is longer than a kilometre:\n\n- **1 mile ≈ 1.6 km**\n- **5 miles ≈ 8 km** (the same rate, using whole numbers)\n\nTo change **miles → km**, multiply by 1.6 (or divide by 5, then multiply by 8). To change **km → miles**, divide by 1.6 (or divide by 8, then multiply by 5). The kilometre is the shorter unit, so for the same distance the **km number is always the bigger one**.\n\n**Other common approximations**\n\n| Imperial | Metric |\n|---|---|\n| 1 inch | ≈ 2.5 cm |\n| 1 foot (12 inches) | ≈ 30 cm |\n| 1 pound (lb) | ≈ 0.45 kg (so 1 kg ≈ 2.2 lb) |\n| 1 pint (UK) | ≈ 0.57 litres |\n| 1 gallon (UK, 8 pints) | ≈ 4.5 litres |\n\nKnow **5 miles ≈ 8 km** by heart. For the others, a question will usually give you the fact. Your job is to use it in the right direction: multiply or divide?",
      diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Double number line. Top line in miles marked 0, 5, 10, 15, 20, 25. Bottom line in kilometres marked 0, 8, 16, 24, 32, 40, lined up underneath. A shaded band shows 5 miles matches 8 km, and a small mark shows 1 mile matches 1.6 km."><rect width="480" height="250" fill="#ffffff"/><text x="225" y="30" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">5 miles ≈ 8 km</text><rect x="30" y="90" width="78" height="80" fill="#fde68a" opacity="0.6"/><g stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"><line x1="30" y1="96" x2="30" y2="164"/><line x1="108" y1="96" x2="108" y2="164"/><line x1="186" y1="96" x2="186" y2="164"/><line x1="264" y1="96" x2="264" y2="164"/><line x1="342" y1="96" x2="342" y2="164"/><line x1="420" y1="96" x2="420" y2="164"/></g><g stroke="#334155" stroke-width="2"><line x1="30" y1="90" x2="420" y2="90"/><line x1="30" y1="170" x2="420" y2="170"/><line x1="30" y1="84" x2="30" y2="96"/><line x1="108" y1="84" x2="108" y2="96"/><line x1="186" y1="84" x2="186" y2="96"/><line x1="264" y1="84" x2="264" y2="96"/><line x1="342" y1="84" x2="342" y2="96"/><line x1="420" y1="84" x2="420" y2="96"/><line x1="30" y1="164" x2="30" y2="176"/><line x1="108" y1="164" x2="108" y2="176"/><line x1="186" y1="164" x2="186" y2="176"/><line x1="264" y1="164" x2="264" y2="176"/><line x1="342" y1="164" x2="342" y2="176"/><line x1="420" y1="164" x2="420" y2="176"/></g><g stroke="#b45309" stroke-width="2"><line x1="45.6" y1="86" x2="45.6" y2="94"/><line x1="45.6" y1="166" x2="45.6" y2="174"/></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937"><text x="30" y="78">0</text><text x="108" y="78">5</text><text x="186" y="78">10</text><text x="264" y="78">15</text><text x="342" y="78">20</text><text x="420" y="78">25</text><text x="30" y="192">0</text><text x="108" y="192">8</text><text x="186" y="192">16</text><text x="264" y="192">24</text><text x="342" y="192">32</text><text x="420" y="192">40</text></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#b45309"><text x="47" y="78">1</text><text x="50" y="192">1.6</text></g><g font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937"><text x="430" y="94">miles</text><text x="430" y="174">km</text></g><text x="225" y="228" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">miles → km: × 1.6  ·  km → miles: ÷ 1.6</text></svg>`,
      diagramCaption:
        "A double number line: every 5 miles lines up with about 8 km, so the two scales stay in step. The orange marks show 1 mile ≈ 1.6 km.",
      workedExamples: [
        {
          title: "Miles to kilometres",
          problem: "Convert 30 miles to kilometres.",
          steps: [
            "Use 5 miles ≈ 8 km. How many lots of 5 miles are in 30 miles? 30 ÷ 5 = 6.",
            "So 30 miles ≈ 6 × 8 = 48 km.",
            "Check with 1 mile ≈ 1.6 km: 30 × 1.6 = 48 km. The km number is bigger, as it should be.",
          ],
          answer: "≈ 48 km",
          yourTurn: {
            question: "Your turn: using 5 miles ≈ 8 km, convert 45 miles to kilometres.",
            answer: { type: "number", value: 72 },
            solution: "45 ÷ 5 = 9 lots of 5 miles, so 9 × 8 = 72 km (or 45 × 1.6 = 72 km).",
          },
        },
        {
          title: "Kilometres to miles",
          problem: "The road distance from Singapore to Kuala Lumpur is about 350 km. Roughly how many miles is that?",
          steps: [
            "Going km → miles, the answer must be **smaller**.",
            "Using 8 km ≈ 5 miles: 350 ÷ 8 = 43.75 lots of 8 km.",
            "43.75 × 5 = 218.75 miles.",
            "Or directly: 350 ÷ 1.6 = 218.75 miles.",
          ],
          answer: "About 220 miles. The conversion is only approximate, so round sensibly.",
        },
        {
          title: "Comparing speed limits",
          problem:
            "The speed limit on a UK motorway is 70 mph (miles per hour). Mei says this is slower than the 90 km/h limit on some Singapore expressways. Is she right?",
          steps: [
            "70 mph means 70 miles in one hour.",
            "70 × 1.6 = 112 km, so 70 mph ≈ 112 km/h.",
            "112 km/h is more than 90 km/h.",
          ],
          answer: "No. 70 mph ≈ 112 km/h, which is faster than 90 km/h.",
        },
      ],
      keyPoints: [
        "1 mile ≈ 1.6 km, and 5 miles ≈ 8 km.",
        "Miles → km: × 1.6. Km → miles: ÷ 1.6.",
        "For the same distance, the km number is always bigger than the miles number.",
        "Imperial ↔ metric conversions are approximate: use ≈ and round sensibly.",
      ],
      whyItWorks:
        "Distances in miles and in km are in **direct proportion**: double the miles and you double the km. So the ratio miles : km is always about 5 : 8, and the multiplier from miles to km is always {{8/5}} = 1.6. The exact value is 1 mile = 1.609 344 km, so 1.6 is very close.",
      strategies: ["Use a ratio table", "Estimate first", "Use the unitary method"],
      thinkDeeper:
        "The Fibonacci numbers go 2, 3, 5, 8, 13, 21, 34, … Check with × 1.6 that 8 miles ≈ 13 km and 13 miles ≈ 21 km. Why might each Fibonacci number of miles be roughly the *next* Fibonacci number of km? (Divide each Fibonacci number by the one before it. What do you notice?)",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "time",
      heading: "Time calculations",
      discovery: {
        problem:
          "An overnight bus leaves Singapore at 22:45 and reaches Penang at 07:20 the next morning. How long is the journey? Why doesn't simply working out 07:20 − 22:45 help?",
        idea:
          "Count on in friendly chunks, using midnight as a stepping stone: 22:45 → 23:00 is 15 min, 23:00 → 00:00 is 1 h, and 00:00 → 07:20 is 7 h 20 min. Total: **8 h 35 min**. Clock times are not ordinary numbers: an hour has 60 minutes, not 100, and the day restarts at midnight, so plain subtraction goes wrong.",
      },
      body:
        "The **24-hour clock** numbers the hours of the day from 00 to 23, so you never need am or pm. Times are always written with four digits.\n\n| 12-hour clock | 24-hour clock |\n|---|---|\n| 12:05 am (just after midnight) | 00:05 |\n| 7:30 am | 07:30 |\n| 12 noon | 12:00 |\n| 3:15 pm | 15:15 |\n| 11:50 pm | 23:50 |\n\nFrom 1 pm onwards, **add 12 to the hour** (3:15 pm → 15:15). Between midnight and 1 am, the hour is 00.\n\n**Finding a duration** (a length of time). Count on from the start time in friendly jumps: up to the next whole hour, then whole hours, then the leftover minutes. Drawing the jumps on a number line, as in the diagram, makes crossing midnight easy.\n\n**Hours as decimals.** Formulas such as speed = distance ÷ time need the time as a single number of hours. Since 1 hour = 60 minutes:\n\n- minutes → hours: **divide by 60** (45 min = {{45/60}} h = 0.75 h)\n- decimal part of an hour → minutes: **multiply by 60** (0.4 h = 0.4 × 60 = 24 min)\n\n| Minutes | Fraction of an hour | Decimal |\n|---|---|---|\n| 6 min | {{1/10}} | 0.1 h |\n| 15 min | {{1/4}} | 0.25 h |\n| 20 min | {{1/3}} | 0.333… h |\n| 30 min | {{1/2}} | 0.5 h |\n| 45 min | {{3/4}} | 0.75 h |\n\n> **Trap:** 1.25 hours is **not** 1 h 25 min. The 0.25 is a quarter of an hour: 0.25 × 60 = 15 min, so 1.25 h = 1 h 15 min.",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from 22:45 to 07:20 with jumps: plus 15 minutes to 23:00, plus 1 hour to midnight 00:00, plus 7 hours to 07:00, plus 20 minutes to 07:20. Total 8 hours 35 minutes."><rect width="480" height="200" fill="#ffffff"/><text x="460" y="20" font-family="sans-serif" font-size="11" text-anchor="end" fill="#64748b">(not to scale)</text><line x1="20" y1="120" x2="460" y2="120" stroke="#334155" stroke-width="2"/><g stroke="#4f46e5" stroke-width="2" fill="none"><path d="M30 120 Q55 70 80 120"/><path d="M80 120 Q115 60 150 120"/><path d="M150 120 Q270 10 390 120"/><path d="M390 120 Q415 70 440 120"/></g><g fill="#1f2937"><circle cx="30" cy="120" r="4"/><circle cx="80" cy="120" r="4"/><circle cx="150" cy="120" r="4"/><circle cx="390" cy="120" r="4"/><circle cx="440" cy="120" r="4"/></g><g font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1f2937"><text x="55" y="88">+15 min</text><text x="115" y="83">+1 h</text><text x="270" y="58">+7 h</text><text x="415" y="88">+20 min</text></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937"><text x="30" y="142">22:45</text><text x="80" y="142">23:00</text><text x="150" y="142">00:00</text><text x="390" y="142">07:00</text><text x="440" y="142">07:20</text></g><text x="150" y="158" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#475569">midnight</text><text x="240" y="186" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Total: 15 min + 1 h + 7 h + 20 min = 8 h 35 min</text></svg>`,
      diagramCaption:
        "Counting on across midnight in friendly jumps: to the next hour, to midnight, whole hours, then the leftover minutes. (The number line is not to scale.)",
      workedExamples: [
        {
          title: "A duration within one day",
          problem: "A school CCA session runs from 14:35 to 16:20. How long is it?",
          steps: [
            "14:35 → 15:00 is 25 min (up to the next whole hour).",
            "15:00 → 16:00 is 1 h.",
            "16:00 → 16:20 is 20 min.",
            "Total: 25 min + 1 h + 20 min = 1 h 45 min.",
          ],
          answer: "1 h 45 min (105 minutes)",
          yourTurn: {
            question: "Your turn: Ravi's swimming lesson runs from 15:45 to 17:20. How long is it, in minutes?",
            answer: { type: "number", value: 95 },
            solution: "15:45 → 16:00 is 15 min, 16:00 → 17:00 is 60 min, 17:00 → 17:20 is 20 min. 15 + 60 + 20 = 95 minutes.",
          },
        },
        {
          title: "Decimal hours",
          problem: "(a) Write 2.4 hours in hours and minutes. (b) Write 3 h 48 min in hours, as a decimal.",
          steps: [
            "(a) The whole part is 2 hours. The decimal part is 0.4 h = 0.4 × 60 = 24 min.",
            "So 2.4 h = 2 h 24 min.",
            "(b) 48 min = {{48/60}} h = 0.8 h.",
            "So 3 h 48 min = 3.8 h.",
          ],
          answer: "(a) 2 h 24 min (b) 3.8 h",
        },
        {
          title: "Overnight flight across time zones",
          problem:
            "A flight leaves Singapore at 23:35 and takes 13 h 50 min to reach London. In the UK summer, London time is 7 hours behind Singapore time. What is the local time in London when the plane lands?",
          steps: [
            "Add the 13 hours first: 23:35 + 13 h = 12:35 the next day (Singapore time).",
            "Add the 50 min in two jumps: 12:35 + 25 min = 13:00, then 13:00 + 25 min = 13:25 (Singapore time).",
            "London is 7 hours behind, so go back 7 hours: 13:25 − 7 h = 06:25.",
          ],
          answer: "06:25 London time, the morning after it left.",
        },
      ],
      keyPoints: [
        "From 1 pm, add 12 to the hour (3:15 pm = 15:15). Midnight is 00:00.",
        "Count on: to the next hour, then whole hours, then the leftover minutes.",
        "Minutes → hours: ÷ 60. Decimal part of an hour → minutes: × 60.",
        "1.25 h = 1 h 15 min, **not** 1 h 25 min.",
      ],
      whyItWorks:
        "Time is counted in **sixties**: 60 seconds make a minute and 60 minutes make an hour. Ordinary column subtraction borrows 100 instead of 60, so 14:10 − 13:45 looks like 65 when the true gap is 25 minutes. Counting on never splits an hour the wrong way. Dividing by 60 turns minutes into the **fraction** of an hour they really are: 45 minutes is {{45/60}} = {{3/4}} of an hour.",
      strategies: ["Draw a number line", "Use a stepping stone (the next hour, or midnight)", "Convert to one unit first"],
      thinkDeeper:
        "The rule 'add 12 for pm times' breaks for one particular hour of the pm times, and a similar problem affects one hour of the am times. Which hours are they, and what is the correct rule for each? Explain why the 12-hour clock causes this.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "speed",
      heading: "Speed, distance & time",
      discovery: {
        problem:
          "Train A covers 12 km in 15 minutes. Train B covers 20 km in 24 minutes. Which train is faster? Can you decide without using any formula?",
        idea:
          "Scale each journey to the **same time**: one hour. Train A: 15 min × 4 = 1 hour, so it covers 12 × 4 = 48 km in an hour. Train B: 24 min × 2.5 = 1 hour, so it covers 20 × 2.5 = 50 km in an hour. Train B is faster. 'Distance covered in one unit of time' is exactly what **speed** is: speed = distance ÷ time.",
      },
      body:
        "**Speed** tells you how much distance is covered in each unit of time. For a journey at a steady speed:\n\n    speed = distance ÷ time        {{S = D/T}}\n\nRearranging gives the other two versions:\n\n- **distance = speed × time** ({{D = S * T}})\n- **time = distance ÷ speed** ({{T = D/S}})\n\nSpeed has a **compound unit**: one that combines two units, such as km/h (kilometres per hour) or m/s (metres per second).\n\n**Units must match.** A speed in km/h needs distances in km and times in **hours**. If a time is given in minutes, change it to hours first: 40 min = {{40/60}} h = {{2/3}} h.\n\n**Converting km/h ↔ m/s.** 1 km = 1000 m and 1 h = 3600 s, so\n\n    1 km/h = 1000 m ÷ 3600 s = {{1000/3600}} m/s = {{5/18}} m/s\n\n- km/h → m/s: × 1000, then ÷ 3600, which is the same as **÷ 3.6**. So 72 km/h = 20 m/s.\n- m/s → km/h: **× 3.6**. So 10 m/s = 36 km/h.\n\n**Average speed** for a journey made of several parts:\n\n    average speed = total distance ÷ total time\n\nInclude any stops in the total time. Never just find the mean of the speeds: you usually spend longer at the slower speed, so it counts for more.\n\n**On a distance–time graph**, the steepness (gradient) of the line is the speed. A steeper line means faster, and a flat line means stopped. The straight line from the start to the finish has the average speed as its gradient.",
      diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance-time graph. A cyclist rides from 0 to 9 km in the first half hour, rests until 0.75 hours, then rides to 21 km at 1.5 hours. A dashed line from the origin to the end point shows the average speed of 14 km per hour."><rect width="480" height="320" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="110" y1="30" x2="110" y2="270"/><line x1="170" y1="30" x2="170" y2="270"/><line x1="230" y1="30" x2="230" y2="270"/><line x1="290" y1="30" x2="290" y2="270"/><line x1="350" y1="30" x2="350" y2="270"/><line x1="410" y1="30" x2="410" y2="270"/><line x1="50" y1="210" x2="410" y2="210"/><line x1="50" y1="150" x2="410" y2="150"/><line x1="50" y1="90" x2="410" y2="90"/><line x1="50" y1="30" x2="410" y2="30"/></g><g stroke="#334155" stroke-width="1.5"><line x1="50" y1="270" x2="420" y2="270"/><line x1="50" y1="270" x2="50" y2="22"/></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937"><text x="50" y="286">0</text><text x="110" y="286">0.25</text><text x="170" y="286">0.5</text><text x="230" y="286">0.75</text><text x="290" y="286">1</text><text x="350" y="286">1.25</text><text x="410" y="286">1.5</text></g><g font-family="sans-serif" font-size="11" text-anchor="end" fill="#1f2937"><text x="44" y="274">0</text><text x="44" y="214">6</text><text x="44" y="154">12</text><text x="44" y="94">18</text><text x="44" y="34">24</text></g><text x="230" y="308" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Time (hours)</text><text x="16" y="150" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" transform="rotate(-90 16 150)">Distance (km)</text><line x1="50" y1="270" x2="410" y2="60" stroke="#64748b" stroke-width="2" stroke-dasharray="6 4"/><polyline points="50,270 170,180 230,180 410,60" fill="none" stroke="#1f2937" stroke-width="2.5"/><g fill="#1f2937"><circle cx="170" cy="180" r="3.5"/><circle cx="230" cy="180" r="3.5"/><circle cx="410" cy="60" r="3.5"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="100" y="205" text-anchor="end">18 km/h</text><text x="200" y="170" text-anchor="middle">rest</text><text x="338" y="135">16 km/h</text><text x="404" y="50" text-anchor="end">(1.5 h, 21 km)</text></g><text x="250" y="232" font-family="sans-serif" font-size="12" fill="#475569">dashed line: average 14 km/h</text></svg>`,
      diagramCaption:
        "Wei Ling cycles 9 km in half an hour, rests for 15 minutes, then rides 12 km in 45 minutes. Steeper means faster; flat means resting. The dashed line from start to finish has the average speed, 21 ÷ 1.5 = 14 km/h, as its gradient.",
      workedExamples: [
        {
          title: "Finding a speed",
          problem: "A cyclist rides 27 km in 1 h 30 min. Find her average speed in km/h.",
          steps: [
            "The speed is wanted in km/h, so the time must be in hours: 1 h 30 min = 1.5 h.",
            "Speed = distance ÷ time = 27 ÷ 1.5.",
            "27 ÷ 1.5 = 18 km/h.",
          ],
          answer: "18 km/h",
          yourTurn: {
            question: "Your turn: a bus travels 42 km in 1 h 45 min. Find its average speed in km/h.",
            answer: { type: "number", value: 24 },
            solution: "1 h 45 min = 1.75 h, because 45 min = {{3/4}} h. Speed = 42 ÷ 1.75 = 24 km/h.",
          },
        },
        {
          title: "Mixing units",
          problem: "A car travels at 54 km/h. How far, in metres, does it travel in 8 seconds?",
          steps: [
            "The answer is wanted in metres and the time is in seconds, so convert the speed to m/s.",
            "54 ÷ 3.6 = 15 m/s (check: 54 × 1000 ÷ 3600 = 15).",
            "Distance = speed × time = 15 × 8 = 120 m.",
          ],
          answer: "120 m",
        },
        {
          title: "Average speed with a stop",
          problem:
            "Aisha's family drives 150 km at 75 km/h, stops for 30 minutes at a rest area, then drives another 90 km at 60 km/h. Find the average speed for the whole trip.",
          steps: [
            "Time for part 1 = 150 ÷ 75 = 2 h.",
            "Time for the stop = 30 min = 0.5 h.",
            "Time for part 2 = 90 ÷ 60 = 1.5 h.",
            "Total distance = 150 + 90 = 240 km. Total time = 2 + 0.5 + 1.5 = 4 h.",
            "Average speed = 240 ÷ 4 = 60 km/h.",
          ],
          answer: "60 km/h (not 67.5 km/h, which is the mean of 75 and 60 and ignores the stop and the time spent at each speed).",
        },
      ],
      keyPoints: [
        "{{S = D/T}}, {{D = S * T}}, {{T = D/S}}.",
        "Match the units: km with hours, m with seconds. Minutes → hours: ÷ 60.",
        "km/h ÷ 3.6 = m/s, and m/s × 3.6 = km/h.",
        "Average speed = total distance ÷ total time, with stops included.",
      ],
      whyItWorks:
        "'Kilometres per hour' literally means kilometres **÷** hours, so speed = distance ÷ time is built into the unit. If you travel 18 km in every hour, then in 2.5 hours you travel 18 × 2.5 km. That is D = S × T, and dividing both sides by S or by T gives the other two forms. For average speed, imagine a second car driving at one steady speed that arrives at exactly the same moment: it covers the total distance in the total time, so its speed is total ÷ total. And ÷ 3.6 comes from {{1000/3600}} = {{1/3.6}}.",
      strategies: ["Write the units on every line", "Convert units before substituting", "Make a table of distance, speed and time"],
      thinkDeeper:
        "You cycle up a hill path at 4 m/s and freewheel straight back down at 6 m/s. Is your average speed 5 m/s? Try a path 120 m long, then 300 m long. What do you notice, and why doesn't the length of the path matter?",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "density-and-rates",
      heading: "Density & unit pricing",
      discovery: {
        problem:
          "At a supermarket, basmati rice comes in a 2 kg bag for $6.80 or a 5 kg bag for $16.50. Which is better value? Then a puzzle: a 1 kg bag of feathers and a 1 kg bag of rice have the same mass, so why is the feather bag so much bigger?",
        idea:
          "Compare the price of **one** kilogram: 6.80 ÷ 2 = $3.40 per kg and 16.50 ÷ 5 = $3.30 per kg, so the 5 kg bag is better value. Feathers and rice: the same mass, but each cm³ of feathers has far less mass in it. Feathers have a lower **density**, so you need much more volume to make 1 kg.",
      },
      body:
        "A **rate** compares two *different* kinds of quantity as 'so much of one **per** one unit of the other': dollars per kilogram ($/kg), litres per minute (l/min), kilometres per litre (km/l), grams per cubic centimetre (g/cm³). *Per* means 'for each', and it tells you to divide.\n\n**Unit pricing (best buys).** To compare value, find the cost of **one unit** (per kg, per 100 g, per litre…) for each option. The **lowest price per unit** is the best value. Or turn it round and find how much you get **per dollar**: then the **highest** amount wins.\n\n**Other everyday rates**\n\n- Flow: a tap fills 24 litres in 4 minutes → 24 ÷ 4 = 6 litres per minute\n- Fuel: 450 km on 30 litres → 450 ÷ 30 = 15 km per litre\n- Pay: $72 for 6 hours → 72 ÷ 6 = $12 per hour\n\nLike speed, every rate can be rearranged: amount = rate × time. At 6 litres per minute, a tap delivers 6 × 7.5 = 45 litres in 7.5 minutes.\n\n**Density** is the mass of each unit of volume, which tells you how tightly packed a material is:\n\n    density = mass ÷ volume\n\nDensity is usually measured in g/cm³ (or kg/m³). Water has a density of 1 g/cm³: each cm³ of water has a mass of 1 g. Objects denser than water sink in it; less dense ones float. Rearranging:\n\n- **mass = density × volume**\n- **volume = mass ÷ density**\n\n| Material | Density (g/cm³) |\n|---|---|\n| Cork | 0.24 |\n| Ice | 0.92 |\n| Water | 1 |\n| Aluminium | 2.7 |\n| Iron | 7.9 |\n| Gold | 19.3 |",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the mass of 1 cubic centimetre of each material: cork 0.24 g, ice 0.92 g, water 1 g, aluminium 2.7 g, iron 7.9 g, gold 19.3 g. A dashed line marks water at 1 gram per cubic centimetre."><rect width="480" height="300" fill="#ffffff"/><text x="240" y="24" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Mass of 1 cm³ of each material</text><g stroke="#334155" stroke-width="1"><rect x="100" y="40" width="3.84" height="26" fill="#fde68a"/><rect x="100" y="76" width="14.72" height="26" fill="#bae6fd"/><rect x="100" y="112" width="16" height="26" fill="#bae6fd"/><rect x="100" y="148" width="43.2" height="26" fill="#c7d2fe"/><rect x="100" y="184" width="126.4" height="26" fill="#fecaca"/><rect x="100" y="220" width="308.8" height="26" fill="#fde68a"/></g><line x1="116" y1="34" x2="116" y2="254" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="4 3"/><g font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937"><text x="92" y="58">Cork</text><text x="92" y="94">Ice</text><text x="92" y="130">Water</text><text x="92" y="166">Aluminium</text><text x="92" y="202">Iron</text><text x="92" y="238">Gold</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="128" y="58">0.24 g</text><text x="128" y="94">0.92 g</text><text x="128" y="130">1 g</text><text x="149.2" y="166">2.7 g</text><text x="232.4" y="202">7.9 g</text><text x="414.8" y="238">19.3 g</text></g><text x="116" y="272" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#0369a1">water: 1 g/cm³</text><text x="240" y="292" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">left of the dashed line: floats in water · right of it: sinks</text></svg>`,
      diagramCaption:
        "Each bar is the mass of the same volume, 1 cm³, so each bar shows that material's density. Cork and ice are less dense than water, so they float; aluminium, iron and gold sink.",
      workedExamples: [
        {
          title: "Best buy",
          problem: "Mango juice comes in a 1.5-litre carton for $3.90 or a 2-litre carton for $5.40. Which is better value?",
          steps: [
            "Find the price of one litre for each carton.",
            "1.5-litre carton: 3.90 ÷ 1.5 = $2.60 per litre.",
            "2-litre carton: 5.40 ÷ 2 = $2.70 per litre.",
            "$2.60 is less than $2.70, so the 1.5-litre carton is cheaper per litre.",
          ],
          answer: "The 1.5-litre carton ($2.60 per litre). The bigger carton is *not* always the better buy.",
          yourTurn: {
            question:
              "Your turn: soy milk costs $2.85 for a 1-litre carton or $4.05 for a 1.5-litre carton. Find the price per litre of the 1.5-litre carton, in dollars.",
            answer: { type: "number", value: 2.7, display: "$2.70" },
            solution: "4.05 ÷ 1.5 = $2.70 per litre. That is less than $2.85, so the 1.5-litre carton is the better buy.",
          },
        },
        {
          title: "Finding a density",
          problem: "A block of aluminium measures 5 cm by 4 cm by 2 cm and has a mass of 108 g. Find its density.",
          steps: ["Volume = 5 × 4 × 2 = 40 cm³.", "Density = mass ÷ volume = 108 ÷ 40.", "108 ÷ 40 = 2.7 g/cm³."],
          answer: "2.7 g/cm³, which matches the table value for aluminium.",
        },
        {
          title: "Rearranging the formula",
          problem:
            "Ice has a density of 0.92 g/cm³. What volume does 460 g of ice take up? What volume does the same 460 g take up as liquid water (density 1 g/cm³)? What does this tell you?",
          steps: [
            "Volume = mass ÷ density.",
            "Ice: 460 ÷ 0.92 = 500 cm³.",
            "Water: 460 ÷ 1 = 460 cm³.",
            "The same mass takes up 40 cm³ more space as ice than as water.",
          ],
          answer: "500 cm³ of ice but only 460 cm³ of water. Water expands when it freezes, which is why ice floats and frozen pipes can burst.",
        },
      ],
      keyPoints: [
        "A rate is an amount 'per one unit' of something else; *per* means ÷.",
        "Best buy: the lowest price per unit wins (or the highest amount per dollar).",
        "{{density = mass/volume}}, so mass = density × volume and volume = mass ÷ density.",
        "Water is 1 g/cm³: denser objects sink in it, less dense ones float.",
      ],
      whyItWorks:
        "Comparing a 2 kg bag directly with a 5 kg bag is unfair, because they are different sizes. Dividing each price by its mass rescales both to **one** kilogram, so you compare like with like. Density does the same for materials: dividing mass by volume gives the mass of **one** cm³. That number belongs to the material, not the object. A gold ring and a gold bar have the same density, even though the bar is far heavier.",
      strategies: ["Use the unitary method (find one)", "Compare like with like", "Rearrange the formula"],
      thinkDeeper:
        "Shop A sells 3 bottles of water for $5. Shop B sells 5 bottles for $8. Which is cheaper per bottle? Find a way to decide **without** any decimals, and then find a second, different way.",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "conversion-graphs",
      heading: "Conversion graphs",
      discovery: {
        problem:
          "Priya is going to Johor Bahru. At the money changer, $10 gets RM 32 and $25 gets RM 80. Plot these as points, with dollars across and ringgit up, and add the point for $0. What do you notice? How could your picture convert $40 without any calculating?",
        idea:
          "The points lie on a **straight line through the origin**, because every dollar buys the same RM 3.20. Rule the line and you can read off any conversion: go up from $40 to the line, then across to the ringgit axis, and you reach RM 128.",
      },
      body:
        "A **conversion graph** is a straight-line graph that changes one unit into another: currencies, miles and km, litres and gallons, °C and °F. (Exchange rates change every day; this section uses $1 = RM 3.20.)\n\n**Reading a conversion graph**\n\n1. Find the value you know on its axis.\n2. Go straight up (or across) to the line.\n3. Turn and go straight to the other axis, then read the value.\n\nCheck the **scale** first. Work out what one small square is worth, because it is not always 1.\n\n**Drawing a conversion graph**\n\n1. Use the conversion fact to make a table of 2–3 points with friendly values. For $1 = RM 3.20: $0 → RM 0, $10 → RM 32, $50 → RM 160.\n2. Choose scales so the graph fills the grid, and label both axes with their units.\n3. Plot the points and join them with a ruler. If all three points line up, your table is right.\n\n**Proportional or not?** If the graph is a straight line **through the origin**, the two quantities are in **direct proportion**: double one and you double the other. Miles–km and currency graphs (with no fees) are like this. A °C → °F graph is a straight line that **misses** the origin (0 °C = 32 °F), so °C and °F are *not* in direct proportion.\n\n**Off the edge of the graph?** Read a smaller value, then scale up. If $50 = RM 160, then $350 = 7 × 160 = RM 1120.\n\n**The gradient is the rate.** The steepness of the line is the conversion rate, here RM 3.20 per dollar. When two lines share the same axes, the **steeper** line has the **bigger** rate: more ringgit per dollar, or more km per hour on a distance–time graph.",
      diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph with Singapore dollars from 0 to 50 across and Malaysian ringgit from 0 to 160 up. A straight line through the origin passes through 25 dollars at 80 ringgit and 40 dollars at 128 ringgit, shown with dashed reading lines."><rect width="480" height="310" fill="#ffffff"/><g stroke="#e5e7eb" stroke-width="1"><line x1="120" y1="60" x2="120" y2="260"/><line x1="190" y1="60" x2="190" y2="260"/><line x1="260" y1="60" x2="260" y2="260"/><line x1="330" y1="60" x2="330" y2="260"/><line x1="400" y1="60" x2="400" y2="260"/><line x1="50" y1="235" x2="400" y2="235"/><line x1="50" y1="210" x2="400" y2="210"/><line x1="50" y1="185" x2="400" y2="185"/><line x1="50" y1="160" x2="400" y2="160"/><line x1="50" y1="135" x2="400" y2="135"/><line x1="50" y1="110" x2="400" y2="110"/><line x1="50" y1="85" x2="400" y2="85"/><line x1="50" y1="60" x2="400" y2="60"/></g><g stroke="#334155" stroke-width="1.5"><line x1="50" y1="260" x2="410" y2="260"/><line x1="50" y1="260" x2="50" y2="52"/></g><g font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937"><text x="50" y="276">0</text><text x="120" y="276">10</text><text x="190" y="276">20</text><text x="260" y="276">30</text><text x="330" y="276">40</text><text x="400" y="276">50</text></g><g font-family="sans-serif" font-size="11" text-anchor="end" fill="#1f2937"><text x="44" y="264">0</text><text x="44" y="239">20</text><text x="44" y="214">40</text><text x="44" y="189">60</text><text x="44" y="164">80</text><text x="44" y="139">100</text><text x="44" y="114">120</text><text x="44" y="89">140</text><text x="44" y="64">160</text></g><text x="225" y="298" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Singapore dollars ($)</text><text x="14" y="160" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 160)">Malaysian ringgit (RM)</text><path d="M225 260V160H50" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M330 260V100H50" fill="none" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="50" y1="260" x2="400" y2="60" stroke="#1f2937" stroke-width="2.5"/><circle cx="225" cy="160" r="4" fill="#b45309"/><circle cx="330" cy="100" r="4" fill="#0369a1"/><text x="232" y="176" font-family="sans-serif" font-size="12" fill="#b45309">RM 80 → $25</text><text x="338" y="120" font-family="sans-serif" font-size="12" fill="#0369a1">$40 → RM 128</text><text x="70" y="80" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937">$1 = RM 3.20</text></svg>`,
      diagramCaption:
        "A conversion graph for $1 = RM 3.20. Follow a dashed path up then across, or across then down, to convert. The line passes through the origin, so dollars and ringgit are in direct proportion.",
      workedExamples: [
        {
          title: "Reading a graph",
          problem: "Use the conversion graph ($1 = RM 3.20) to change RM 80 into Singapore dollars.",
          steps: [
            "Find RM 80 on the vertical (ringgit) axis.",
            "Go straight across to the line.",
            "Go straight down to the dollar axis and read the value: $25.",
            "Check: 25 × 3.2 = 80.",
          ],
          answer: "$25",
          yourTurn: {
            question: "Your turn: use the graph, or the rate $1 = RM 3.20, to change $40 into ringgit.",
            answer: { type: "number", value: 128, display: "RM 128" },
            solution: "Go up from $40 to the line, then across: RM 128. Check: 40 × 3.2 = 128.",
          },
        },
        {
          title: "Drawing a graph",
          problem: "1 UK gallon ≈ 4.5 litres. Draw a conversion graph from 0 to 10 gallons, then use it to change 30 litres into gallons.",
          steps: [
            "Make a table: 0 gallons → 0 litres, 2 gallons → 9 litres, 10 gallons → 45 litres.",
            "Put gallons across (0 to 10) and litres up (0 to 50). Plot the three points and rule a line through them.",
            "From 30 on the litres axis, go across to the line, then down: just under 7 gallons.",
            "Check: 30 ÷ 4.5 = 6.67 (to 2 d.p.).",
          ],
          answer: "About 6.7 gallons",
        },
        {
          title: "Proportional or not?",
          problem:
            "A temperature conversion graph passes through (0 °C, 32 °F) and (100 °C, 212 °F), and its equation is F = 1.8C + 32. If you double a temperature in °C, does its value in °F double too? Test with 10 °C and 20 °C.",
          steps: [
            "10 °C: F = 1.8 × 10 + 32 = 50 °F.",
            "20 °C: F = 1.8 × 20 + 32 = 68 °F.",
            "68 is not double 50, so doubling the °C value does not double the °F value.",
            "The graph is a straight line, but it does not pass through the origin, so °C and °F are not in direct proportion.",
          ],
          answer: "No. 10 °C = 50 °F but 20 °C = 68 °F. A straight line that misses the origin does not show direct proportion.",
        },
      ],
      keyPoints: [
        "Check the scale, then go up (or across) to the line and across (or down) to the other axis.",
        "Plot at least 3 points from a table; the third point is your check.",
        "A straight line **through the origin** means direct proportion.",
        "The gradient is the rate: the steeper line has the bigger rate.",
      ],
      whyItWorks:
        "If $1 always buys RM 3.20, then $x buys 3.2x ringgit. Every point (x, 3.2x) lies on one straight line, and since $0 buys RM 0, the line passes through the origin. Each extra $1 across always adds the same RM 3.20 up; that constant step is the gradient, which is the rate itself. For temperature, F = 1.8C + 32: equal steps across still give equal steps up (a straight line), but the + 32 lifts the line off the origin, so doubling doesn't work.",
      strategies: ["Draw a graph", "Use a ratio table to find points", "Check with a calculation"],
      thinkDeeper:
        "Is there a temperature at which the Celsius and Fahrenheit readings are the same number? Use F = 1.8C + 32, or imagine where the line y = x would cross the °C → °F graph.",
    },
    // ------------------------------------------------------------------ 8
    {
      id: "pressure",
      heading: "Pressure",
      discovery: {
        problem:
          "Force is measured in newtons (N). Which presses harder on a wooden floor: an elephant weighing 50 000 N, standing on four feet with 5000 cm² of foot touching the floor altogether, or a person weighing 600 N balanced on one stiletto heel of area 1 cm²? Guess first, then work out the force on each square centimetre.",
        idea:
          "Elephant: 50 000 ÷ 5000 = 10 N on each cm². Heel: 600 ÷ 1 = 600 N on each cm², which is **60 times as much**! The force on each unit of area is called **pressure**. A small force on a tiny area can beat a huge force that is spread out.",
      },
      body:
        "**Stretch:** **Pressure** measures how concentrated a force is: it is the force acting on each unit of area.\n\n    pressure = force ÷ area        {{P = F/A}}\n\n- **Force** is measured in **newtons** (N). On Earth, a mass of 1 kg has a weight (a downward force) of about 10 N.\n- With area in m², pressure is in **N/m²**, also called **pascals** (Pa). With area in cm², pressure is in N/cm².\n- Rearranged: **force = pressure × area** and **area = force ÷ pressure**.\n\nThe same force makes a **bigger pressure on a smaller area**. That is why knives are sharpened and drawing pins have points (tiny area, huge pressure), and why tractors have wide tyres and snowshoes are broad (big area, small pressure).\n\n**Watch the units.** Because 1 m² = 10 000 cm², a pressure of 1 N/cm² is the same as 10 000 N/m². Change the area into the unit you need *before* dividing.",
      diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The same 30 newton brick, 20 cm by 10 cm by 5 cm, shown twice. Lying flat it rests on 200 square centimetres, giving 0.15 newtons per square centimetre. Standing on its end it rests on 50 square centimetres, giving 0.6 newtons per square centimetre."><rect width="480" height="310" fill="#ffffff"/><polygon points="10,268 430,268 470,228 50,228" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/><polygon points="30,220 58,192 218,192 190,220" fill="#fee2e2" stroke="#334155" stroke-width="1.5"/><polygon points="190,220 218,192 218,232 190,260" fill="#fca5a5" stroke="#334155" stroke-width="1.5"/><rect x="30" y="220" width="160" height="40" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><polygon points="300,100 328,72 368,72 340,100" fill="#e0e7ff" stroke="#334155" stroke-width="1.5"/><polygon points="340,100 368,72 368,232 340,260" fill="#a5b4fc" stroke="#334155" stroke-width="1.5"/><rect x="300" y="100" width="40" height="160" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><line x1="124" y1="140" x2="124" y2="196" stroke="#1f2937" stroke-width="2.5"/><polygon points="124,206 118,194 130,194" fill="#1f2937"/><line x1="334" y1="14" x2="334" y2="76" stroke="#1f2937" stroke-width="2.5"/><polygon points="334,86 328,74 340,74" fill="#1f2937"/><g font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937"><text x="132" y="160">30 N</text><text x="342" y="36">30 N</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="110" y="245" text-anchor="middle">20 cm</text><text x="24" y="245" text-anchor="end" font-size="11">5 cm</text><text x="224" y="206">10 cm</text><text x="320" y="252" text-anchor="middle" font-size="11">5 cm</text><text x="294" y="185" text-anchor="end">20 cm</text><text x="374" y="92">10 cm</text></g><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937"><text x="120" y="284">base 20 cm × 10 cm = 200 cm²</text><text x="120" y="302" font-weight="bold">pressure = 30 ÷ 200 = 0.15 N/cm²</text><text x="356" y="284">base 5 cm × 10 cm = 50 cm²</text><text x="356" y="302" font-weight="bold">pressure = 30 ÷ 50 = 0.6 N/cm²</text></g></svg>`,
      diagramCaption:
        "The same 30 N brick on two different faces. Standing on its end, it rests on a quarter of the area, so it presses with four times the pressure.",
      workedExamples: [
        {
          title: "Finding a pressure",
          problem: "A crate of weight 1200 N rests on the floor. Its base is 0.8 m by 0.5 m. Find the pressure on the floor in N/m².",
          steps: ["Area of the base = 0.8 × 0.5 = 0.4 m².", "Pressure = force ÷ area = 1200 ÷ 0.4.", "1200 ÷ 0.4 = 3000 N/m² (3000 Pa)."],
          answer: "3000 N/m²",
          yourTurn: {
            question: "Your turn: a box of weight 360 N has a base 0.6 m by 0.5 m. Find the pressure on the floor in N/m².",
            answer: { type: "number", value: 1200 },
            solution: "Area = 0.6 × 0.5 = 0.3 m². Pressure = 360 ÷ 0.3 = 1200 N/m².",
          },
        },
        {
          title: "Rearranging: how big a snowshoe?",
          problem:
            "Ethan weighs 540 N. The snow will hold him up only if the pressure on it is at most 0.3 N/cm². What total area of snowshoe does he need? How much is that for each of his two snowshoes?",
          steps: [
            "Area = force ÷ pressure.",
            "540 ÷ 0.3 = 1800 cm² in total.",
            "Two snowshoes share the area: 1800 ÷ 2 = 900 cm² each, for example 45 cm by 20 cm.",
          ],
          answer: "At least 1800 cm² in total, so at least 900 cm² per snowshoe.",
        },
      ],
      keyPoints: [
        "{{P = F/A}}: pressure = force ÷ area.",
        "Units: N/m² (= pascals, Pa) or N/cm².",
        "Same force, smaller area → bigger pressure.",
        "1 N/cm² = 10 000 N/m², because 1 m² = 10 000 cm².",
      ],
      whyItWorks:
        "Picture the force shared out equally among the square centimetres of the contact area. The brick's 30 N shared among 200 squares puts 0.15 N on each. Stood on its end, the same 30 N is shared among only 50 squares, so each carries 0.6 N: four times as much, because the area is a quarter. Dividing is exactly 'sharing out per unit', just like speed (distance per hour) and density (mass per cm³).",
      strategies: ["Convert units first", "Rearrange the formula", "Compare like with like"],
      thinkDeeper:
        "Two solid cubes are made of the same metal: one has 2 cm edges and the other has 4 cm edges. The big cube is 8 times as heavy. Does it press on the table with 8 times the pressure? Work out the ratio of the pressures and explain where the 8 goes.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What do kilo-, centi- and milli- mean?", back: "kilo- = × 1000, centi- = {{1/100}}, milli- = {{1/1000}}. So 1 km = 1000 m and 1 m = 100 cm = 1000 mm." },
      { front: "Converting to a smaller unit: multiply or divide?", back: "Multiply. You need more of the smaller units: 2.5 m = 250 cm." },
      { front: "1 m² = ? cm²", back: "10 000 cm² (100 × 100), not 100." },
      { front: "1 m³ = ? cm³", back: "1 000 000 cm³ ({{100^3}})." },
      { front: "1 litre = ? cm³", back: "1000 cm³. Also 1 ml = 1 cm³ and 1 m³ = 1000 litres." },
      { front: "1 mile ≈ ? km", back: "1.6 km. Equivalently, 5 miles ≈ 8 km." },
      { front: "3:45 pm on the 24-hour clock", back: "15:45 (add 12 to the hour)." },
      { front: "1.25 hours in hours and minutes", back: "1 h 15 min, because 0.25 × 60 = 15." },
      { front: "Speed formula and its rearrangements", back: "{{S = D/T}}, D = S × T, {{T = D/S}}." },
      { front: "km/h → m/s", back: "÷ 3.6 (that is × 1000 ÷ 3600). So 36 km/h = 10 m/s." },
      { front: "How do you find average speed?", back: "Total distance ÷ total time, including stops. Never the mean of the speeds." },
      { front: "Density formula", back: "{{density = mass/volume}}, often in g/cm³. Water is 1 g/cm³." },
      { front: "How do you find the best buy?", back: "Work out the price per unit: the lowest wins. Or the amount per dollar: the highest wins." },
      { front: "A conversion graph is a straight line through the origin. What does that tell you?", back: "The two quantities are in direct proportion." },
      { front: "Pressure formula (stretch)", back: "{{pressure = force/area}}, in N/m² (pascals) or N/cm²." },
      { front: "1 hectare = ? m²", back: "10 000 m² (a square 100 m by 100 m)." },
    ],
    mustKnow: [
      "I can convert between metric units of length, mass and capacity.",
      "I can choose a sensible unit for a measurement.",
      "I can convert area units (cm² ↔ m²) and volume units (cm³ ↔ m³ ↔ litres) and explain why the factor is squared or cubed.",
      "I can convert between miles and kilometres using 5 miles ≈ 8 km.",
      "I can use the 24-hour clock and find durations, including across midnight.",
      "I can switch between minutes and decimal hours, e.g. 0.75 h = 45 min.",
      "I can use speed = distance ÷ time and its rearrangements with consistent units.",
      "I can convert between km/h and m/s.",
      "I can find the average speed of a journey with several parts.",
      "I can compare value using unit prices, and calculate density, mass or volume.",
      "I can read, draw and interpret conversion graphs, and say when one shows direct proportion.",
      "I can calculate pressure = force ÷ area (stretch).",
    ],
    misconceptions: [
      {
        wrong: "1 m² = 100 cm², because 1 m = 100 cm.",
        right: "Area uses the length factor twice: 1 m² = 100 cm × 100 cm = 10 000 cm².",
      },
      {
        wrong: "2.5 hours = 2 hours 50 minutes.",
        right: "0.5 h = 0.5 × 60 = 30 min, so 2.5 h = 2 h 30 min.",
      },
      {
        wrong: "Driving at 60 km/h there and 40 km/h back gives an average speed of 50 km/h.",
        right: "Average speed = total distance ÷ total time. For 120 km each way: 240 km in 2 h + 3 h = 5 h, so 48 km/h.",
      },
      {
        wrong: "To change km to m, divide by 1000, because metres are 'less'.",
        right: "Metres are a smaller unit, so you need more of them: multiply. 3 km = 3000 m.",
      },
      {
        wrong: "The bigger pack is always the better buy.",
        right: "Compare the price per unit. 2 kg for $6.80 ($3.40 per kg) beats 5 kg for $17.50 ($3.50 per kg).",
      },
      {
        wrong: "Any straight-line graph shows direct proportion.",
        right: "Only a straight line through the origin does. °C → °F is straight but starts at 32 °F, so it is not proportional.",
      },
    ],
    examMistakes: [
      "Using minutes in a formula that needs hours: 30 km in 20 min is not 1.5 km/h, it is 90 km/h.",
      "Writing 1.3 hours as 1 h 30 min. It is 1 h 18 min, because 0.3 × 60 = 18.",
      "Converting area with the length factor: 5 m² is 50 000 cm², not 500 cm².",
      "Subtracting clock times like ordinary numbers: from 13:45 to 14:10 is 25 minutes, not 65.",
      "Averaging two speeds instead of using total distance ÷ total time.",
      "Mixing km/h with metres or seconds without converting the speed first.",
      "Reading a conversion graph without checking the scale: one small square might be worth 2, 5 or 20.",
      "Comparing best buys without first putting the sizes in the same unit (g with kg, ml with litres).",
    ],
    mnemonics: [
      {
        topic: "Speed, distance & time",
        device: "The DST triangle: D on top, S and T side by side underneath",
        explanation:
          "Cover the quantity you want. Cover D: S × T. Cover S: D over T. Cover T: D over S. The same triangle works for mass–density–volume (mass on top) and force–pressure–area (force on top).",
      },
      {
        topic: "Metric prefixes",
        device: "King Henry Died By Drinking Chocolate Milk",
        explanation:
          "Kilo, Hecto, Deca, Base unit, Deci, Centi, Milli. Each step to the right is × 10, so km → m is three steps right: × 1000.",
      },
      {
        topic: "Area & volume units",
        device: "Square it for area, cube it for volume",
        explanation: "1 m = 100 cm, so 1 m² = {{100^2}} = 10 000 cm² and 1 m³ = {{100^3}} = 1 000 000 cm³.",
      },
      {
        topic: "Miles to km",
        device: "Fibonacci friends: 5 → 8, 8 → 13, 13 → 21",
        explanation:
          "Each Fibonacci number of miles is roughly the next Fibonacci number of km, because consecutive Fibonacci numbers have a ratio close to 1.6.",
      },
    ],
    realWorld: [
      {
        title: "MRT timetables",
        detail: "Train timetables use the 24-hour clock, and planners use speed = distance ÷ time to space trains safely along the line.",
        emoji: "🚇",
      },
      {
        title: "Shelf labels",
        detail: "Supermarket shelf labels often show a unit price, such as per 100 g or per litre, so shoppers can compare packs of different sizes.",
        emoji: "🛒",
      },
      {
        title: "Flying to London",
        detail: "A 14-hour flight from Changi crosses several time zones, so passengers juggle durations and local times, just like the worked example.",
        emoji: "✈️",
      },
      {
        title: "Money changers",
        detail: "An exchange rate is a conversion rate. A quick scaling fact like $10 = RM 32 lets you check you are not being short-changed.",
        emoji: "💱",
      },
      {
        title: "Why steel ships float",
        detail: "A steel ship is hollow, so its average density (total mass ÷ total volume) is less than that of sea water, and it floats.",
        emoji: "🚢",
      },
      {
        title: "Monsoon rainfall",
        detail: "Rain gauges measure rainfall in mm. 1 mm of rain falling on 1 m² is exactly 1 litre of water, because 1 m × 1 m × 0.001 m = 0.001 m³.",
        emoji: "🌧️",
      },
    ],
    videos: [
      {
        title: "Speed, distance and time",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+speed+distance+time",
      },
      {
        title: "Converting area and volume units",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+converting+area+and+volume+units",
      },
      {
        title: "Density, mass and volume",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+density+mass+volume",
      },
      {
        title: "Unit rates",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+unit+rates",
      },
    ],
    formulas: [
      { name: "Speed", formula: "{{speed = distance/time}}", note: "Also distance = speed × time and time = distance ÷ speed." },
      { name: "Average speed", formula: "{{\"average speed\" = (\"total distance\")/(\"total time\")}}", note: "Include stops in the total time." },
      { name: "km/h and m/s", formula: "1 km/h = {{1000/3600}} m/s = {{5/18}} m/s", note: "km/h ÷ 3.6 = m/s; m/s × 3.6 = km/h." },
      { name: "Density", formula: "{{density = mass/volume}}", note: "Water: 1 g/cm³." },
      { name: "Area and volume units", formula: "1 m² = 10 000 cm²; 1 m³ = 1 000 000 cm³", note: "Square the length factor for area, cube it for volume." },
      { name: "Capacity", formula: "1 cm³ = 1 ml; 1000 cm³ = 1 litre; 1 m³ = 1000 litres" },
      { name: "Miles and kilometres", formula: "5 miles ≈ 8 km (1 mile ≈ 1.6 km)" },
      { name: "Pressure (stretch)", formula: "{{pressure = force/area}}", note: "1 N/m² = 1 pascal (Pa)." },
    ],
  },
};
