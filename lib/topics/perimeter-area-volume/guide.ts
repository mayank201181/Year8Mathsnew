import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "perimeter-area-volume",
  title: "Area, Surface Area & Volume",
  strand: "Geometry & Measure",
  icon: "📦",
  summary: "Cut, rearrange, unfold, fill — every area and volume formula, built from scratch.",
  intro:
    "How much floor, how much fencing, how much cardboard, how much water? Almost every formula in this chapter comes from one trick: cut a shape up and rearrange it into one you already understand. You'll start with flat shapes, then move into 3D — counting faces and edges, reading plans, unfolding nets and filling prisms.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "rectangles-triangles",
      heading: "Perimeter & area of rectangles and triangles",
      discovery: {
        problem:
          "Draw a rectangle 8 cm wide and 5 cm tall. Mark *any* point P on the top edge and join it to the two bottom corners to make a triangle. What fraction of the rectangle does the triangle cover? Now slide P along the top edge. Does the answer change?",
        idea:
          "It is **always exactly half**, wherever P is. Drop a vertical line from P to the base: it splits the rectangle into two smaller rectangles, and each sloping side of the triangle is a diagonal that cuts one of them exactly in half. Half of 8 × 5 = 40 cm² is 20 cm². That is the reason a triangle's area is {{1/2}} × base × height.",
      },
      body:
        "**Perimeter** is the total distance around the edge of a shape. It is a length, so it is measured in mm, cm, m or km. **Area** is the amount of flat surface a shape covers, counted in unit squares — so it is measured in **square units**: mm², cm², m², km².\n\n**Rectangles.** A rectangle *l* long and *w* wide holds *w* rows of *l* unit squares:\n\n    {{A = l * w}}        {{P = 2(l + w)}}\n\n**Triangles.** Any side can be the **base**, *b*. The **perpendicular height**, *h*, is the distance from the base to the opposite corner (the **vertex**), measured at **right angles** to the base. Never use a sloping side as the height.\n\n    {{A = 1/2 b h}}\n\n- In a right-angled triangle, the two sides that meet at the right angle are a base and its perpendicular height.\n- In an obtuse-angled triangle, the height can fall **outside** the triangle: extend the base with a dashed line and measure up to the vertex. The formula still works.\n- Every triangle has three base–height pairs, and all three give the same area.\n\n**Missing lengths.** Substitute what you know, then use inverse operations:\n\n| You know | You want | Use |\n|---|---|---|\n| area and width of a rectangle | length | {{l = A/w}} |\n| area and base of a triangle | height | {{h = (2A)/b}} |\n| area and height of a triangle | base | {{b = (2A)/h}} |\n\n**Perimeter and area measure different things.** A 1 cm × 9 cm rectangle has perimeter 20 cm but area only 9 cm². A 4 cm × 4 cm square has a *smaller* perimeter (16 cm) but a *bigger* area (16 cm²).",
      diagram: `<svg viewBox="0 0 340 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An 8 cm by 5 cm rectangle with a triangle joining point P on the top edge to both bottom corners. A dashed perpendicular height from P splits the rectangle into two parts, each cut exactly in half by a side of the triangle."><rect x="0" y="0" width="340" height="215" fill="#ffffff"/><rect x="50" y="30" width="240" height="150" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polygon points="50,180 290,180 140,30" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="140" y1="30" x2="140" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><polyline points="140,170 150,170 150,180" fill="none" stroke="#334155" stroke-width="1.2"/><circle cx="140" cy="30" r="3" fill="#1f2937"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="140" y="22">P</text><text x="80" y="84">a</text><text x="112" y="140">a</text><text x="242" y="84">b</text><text x="186" y="140">b</text><text x="170" y="200">8 cm</text></g><text x="146" y="112" font-family="sans-serif" font-size="13" fill="#1f2937">h = 5 cm</text></svg>`,
      diagramCaption:
        "Wherever P sits on the top edge, the blue triangle is exactly half of the 8 cm × 5 cm rectangle: the two pieces marked a are equal, and so are the two marked b.",
      workedExamples: [
        {
          title: "Using the perpendicular height",
          problem:
            "An isosceles triangle has a base of 16 cm and two sloping sides of 10 cm. Its perpendicular height is 6 cm. Find its area and its perimeter.",
          steps: [
            "Area uses the base and the **perpendicular** height. The 10 cm sides slope, so they are not heights.",
            "{{A = 1/2 * 16 * 6 = 48}} cm².",
            "Perimeter adds all three sides: 16 + 10 + 10 = 36 cm.",
          ],
          answer: "Area 48 cm², perimeter 36 cm.",
          yourTurn: {
            question:
              "Your turn: an isosceles triangle has a base of 10 cm, two sloping sides of 13 cm and a perpendicular height of 12 cm. Find its area in cm².",
            answer: { type: "number", value: 60 },
            solution:
              "{{A = 1/2 * 10 * 12 = 60}} cm². The 13 cm sides are not used for area — they are not perpendicular to the base.",
          },
        },
        {
          title: "Finding a missing height",
          problem: "A triangle has area 42 cm² and base 12 cm. Find its perpendicular height.",
          steps: [
            "Substitute into {{A = 1/2 b h}}: {{42 = 1/2 * 12 * h}}.",
            "{{1/2}} × 12 = 6, so 42 = 6h.",
            "Divide both sides by 6: h = 7 cm.",
            "Check: {{1/2}} × 12 × 7 = 42 ✓",
          ],
          answer: "h = 7 cm",
        },
        {
          title: "From perimeter to area",
          problem:
            "A rectangular vegetable bed in a community garden has a perimeter of 30 m and a length of 9 m. Find its area.",
          steps: [
            "Length + width is half the perimeter: 30 ÷ 2 = 15 m.",
            "Width = 15 − 9 = 6 m.",
            "Area = 9 × 6 = 54 m².",
          ],
          answer: "54 m²",
        },
      ],
      keyPoints: [
        "Area is measured in square units (cm²); perimeter is a length (cm).",
        "Triangle: {{A = 1/2 b h}}, where h is perpendicular to the base b.",
        "The height can lie outside an obtuse triangle — the formula still works.",
        "For a missing length, substitute what you know and use inverse operations.",
      ],
      whyItWorks:
        "Draw the rectangle that just encloses the triangle (same base, same height). The perpendicular height splits it into two rectangles, and each sloping side of the triangle cuts its rectangle exactly in half. So the triangle is half of {{b * h}}. For an obtuse triangle whose height falls outside, draw the big right-angled triangle that includes the overhang x and subtract the small one: {{1/2 (b + x) h - 1/2 x h = 1/2 b h}}. The overhang cancels out.",
      strategies: ["Draw a diagram", "Use the inverse", "Check units"],
      thinkDeeper:
        "(Stretch) A photo is 6 cm by 4 cm. It is enlarged so that every length is 3 times as long. Is the new area 3 times as big? Work it out. Then predict what happens to the area when every length is multiplied by k — and explain why using unit squares.",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "parallelograms-trapezia",
      heading: "Parallelograms & trapezia",
      discovery: {
        problem:
          "Two identical trapezia each have parallel sides of 3 cm and 7 cm, which are 4 cm apart. Turn one of them upside down (a half turn) and fit it against the other. What shape do you make? Find its area — and then the area of one trapezium.",
        idea:
          "They make a **parallelogram**. Its base is 3 + 7 = 10 cm and its height is still 4 cm, so its area is 10 × 4 = 40 cm². One trapezium is exactly half of that: 20 cm². In symbols: {{A = 1/2 (a + b) h}}.",
      },
      body:
        "A **parallelogram** is a quadrilateral with two pairs of parallel sides. A **trapezium** is a quadrilateral with one pair of parallel sides, usually called *a* and *b*. In both shapes the **height** *h* is the perpendicular distance between the parallel sides.\n\n**Parallelogram: cut and slide.** Cut a right-angled triangle off one end, along a perpendicular height, and slide it to the other end. Nothing is lost or added, and the result is a rectangle with the same base and the same height:\n\n    {{A = b h}}\n\nThe sloping side is *not* the height. A parallelogram with sides 9 cm and 5 cm could have a height of 4 cm, 2 cm, or almost 0 cm if you squash it flat — the area changes even though the sides don't.\n\n**Trapezium: double it.** Two copies, one turned upside down, make a parallelogram with base {{a + b}} and height h. One trapezium is half of it:\n\n    {{A = 1/2 (a + b) h}}\n\nRead it as **the average of the parallel sides, times the height**: {{(a + b)/2}} is the width of the trapezium halfway up.\n\n| Shape | Area |\n|---|---|\n| Rectangle | {{l * w}} |\n| Parallelogram | {{b h}} |\n| Triangle | {{1/2 b h}} |\n| Trapezium | {{1/2 (a + b) h}} |\n\n**Missing lengths** work as before: substitute, simplify, then use the inverse operation.",
      diagram: `<svg viewBox="0 0 480 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: a parallelogram with a right-angled triangle cut from its left end and slid to the right end, making a rectangle of base b and height h. Right: two identical trapezia, one turned upside down, fitting together to make a parallelogram with base a plus b."><rect x="0" y="0" width="480" height="215" fill="#ffffff"/><polygon points="15,160 165,160 215,60 65,60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="15,160 65,160 65,60" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><polygon points="165,160 215,160 215,60" fill="none" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="5 4"/><polyline points="65,150 75,150 75,160" fill="none" stroke="#334155" stroke-width="1.2"/><line x1="42" y1="135" x2="188" y2="135" stroke="#b91c1c" stroke-width="1.5"/><polygon points="188,130 198,135 188,140" fill="#b91c1c"/><polygon points="250,160 376,160 334,88 280,88" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="376,160 430,160 460,88 334,88" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="88" x2="300" y2="160" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><polyline points="300,150 310,150 310,160" fill="none" stroke="#334155" stroke-width="1.2"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="115" y="24">Parallelogram → rectangle</text><text x="360" y="24">Two trapezia → parallelogram</text><text x="90" y="178">b</text><text x="80" y="105">h</text><text x="307" y="82">a</text><text x="313" y="177">b</text><text x="397" y="82">b</text><text x="403" y="177">a</text><text x="290" y="130">h</text><text x="115" y="202">area = b × h</text><text x="355" y="202">2 trapezia = (a + b) × h</text></g></svg>`,
      diagramCaption:
        "Left: slide the red triangle across and the parallelogram becomes a b × h rectangle. Right: two copies of a trapezium make a parallelogram with base a + b, so one trapezium is {{1/2 (a + b) h}}.",
      workedExamples: [
        {
          title: "Area of a trapezium",
          problem:
            "A trapezium has parallel sides of 6 cm and 10 cm. The perpendicular distance between them is 5 cm. Find its area.",
          steps: [
            "Add the parallel sides: 6 + 10 = 16 cm.",
            "Multiply by the height: 16 × 5 = 80.",
            "Halve: 80 ÷ 2 = 40 cm². (Or: average width 8 cm × height 5 cm = 40 cm².)",
          ],
          answer: "40 cm²",
          yourTurn: {
            question:
              "Your turn: a trapezium has parallel sides of 8 cm and 13 cm, which are 6 cm apart. Find its area in cm².",
            answer: { type: "number", value: 63 },
            solution: "{{1/2 * (8 + 13) * 6 = 1/2 * 21 * 6 = 63}} cm².",
          },
        },
        {
          title: "Ignore the slant",
          problem:
            "A parallelogram has a base of 9 cm, sloping sides of 5 cm and a perpendicular height of 4 cm. Find its area.",
          steps: [
            "The height must be perpendicular to the base: that is 4 cm, not 5 cm.",
            "{{A = b h = 9 * 4 = 36}} cm².",
            "Using 5 cm would give 45 cm² — too big, because a slanting side is always longer than the gap between the parallel sides.",
          ],
          answer: "36 cm²",
        },
        {
          title: "Working backwards",
          problem:
            "A flower bed in the shape of a trapezium has area 52 m². Its parallel sides are 5 m and 8 m long. How far apart are they?",
          steps: [
            "Substitute: {{52 = 1/2 (5 + 8) h}}.",
            "Simplify: {{52 = 1/2 * 13 * h = 6.5h}}.",
            "Divide by 6.5: h = 52 ÷ 6.5 = 8 m.",
            "Check: {{1/2 * 13 * 8 = 52}} ✓",
          ],
          answer: "8 m",
        },
      ],
      keyPoints: [
        "Parallelogram: {{A = b h}}. Trapezium: {{A = 1/2 (a + b) h}}.",
        "a and b are the **parallel** sides; h is the perpendicular distance between them.",
        "Sloping sides are needed for perimeter, never for area.",
        "Both formulas come from cutting and rearranging, so you can rebuild them if you forget.",
      ],
      whyItWorks:
        "Area doesn't change when you cut a shape up and move the pieces. Slicing a triangle off a parallelogram and sliding it across makes a b × h rectangle. For a trapezium there's a second proof: draw a diagonal to split it into two triangles, both with height h, one with base a and one with base b. Total area: {{1/2 a h + 1/2 b h = 1/2 (a + b) h}}.",
      strategies: ["Cut and rearrange", "Make it simpler", "Use the inverse"],
      thinkDeeper:
        "Shrink the top side of a trapezium until a = 0. What shape is left, and what does {{1/2 (a + b) h}} become? Now stretch the top until a = b. What shape is it now, and does the formula still give the right area? Why is it neat that one formula covers three shapes?",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "compound-shapes",
      heading: "Compound shapes",
      discovery: {
        problem:
          "A room is L-shaped: a 10 m by 8 m rectangle with a 4 m by 3 m rectangle missing from one corner. Arjun says: 'The L-shape has a smaller area than the full rectangle, so it must have a smaller perimeter too.' Is he right? Find both perimeters.",
        idea:
          "Arjun is wrong: both perimeters are **36 m**. Push the two inner edges of the cut-out outwards — the 4 m edge slides up to fill the gap in the top, and the 3 m edge slides across to fill the gap in the side. The boundary becomes the full 10 m by 8 m rectangle, with perimeter 2 × (10 + 8) = 36 m. The area *does* drop: 80 − 12 = 68 m².",
      },
      body:
        "A **compound shape** (or composite shape) is made by joining or cutting simpler shapes. A **rectilinear** shape has only straight sides that meet at right angles — L-shapes, T-shapes and U-shapes are typical.\n\n**Area: two methods.**\n- **Split and add:** cut the shape into rectangles (or triangles), find each area, then add.\n- **Big minus missing:** find the area of the surrounding rectangle and subtract the piece that isn't there.\n\nBoth must give the same answer, so one method checks the other. Choose the split that uses lengths you already know.\n\n**Missing lengths.** In a rectilinear shape, the horizontal edges you travel to the right add up to the horizontal edges you travel to the left; the same goes for up and down. So if the bottom is 12 cm and the top is made of a 5 cm step and an unknown step, the unknown one is 12 − 5 = 7 cm.\n\n**Perimeter.** Go round the edge adding *every* side, including the ones without labels. Tick each side as you use it so none is missed or counted twice. Never add a dashed line you drew to split the shape — it is inside, not on the boundary.\n\n- Cut a rectangular corner off a rectangle and the perimeter is **unchanged** (push the edges out, as in the discovery).\n- Cut a notch into the *middle* of a side and the perimeter goes **up** by twice the notch's depth — its two inside walls are extra.",
      diagram: `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An L-shape inside a 10 m by 8 m rectangle with a 4 m by 3 m corner missing. Sides: top 6 m, inner vertical 3 m, inner horizontal 4 m, right 5 m, bottom 10 m, left 8 m. A dashed line splits it into an 18 square metre rectangle and a 50 square metre rectangle."><rect x="0" y="0" width="300" height="230" fill="#ffffff"/><rect x="160" y="40" width="80" height="60" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/><polygon points="40,40 160,40 160,100 240,100 240,200 40,200" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="100" x2="160" y2="100" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="100" y="32">6 m</text><text x="200" y="94">4 m</text><text x="140" y="218">10 m</text><text x="100" y="76">18 m²</text><text x="140" y="156">50 m²</text></g><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="166" y="76">3 m</text><text x="246" y="154">5 m</text><text x="34" y="124" text-anchor="end">8 m</text><text x="196" y="58" font-size="11" fill="#64748b">cut out</text></g></svg>`,
      diagramCaption:
        "Split along the dashed line: 18 m² + 50 m² = 68 m². Or subtract: 10 × 8 − 4 × 3 = 80 − 12 = 68 m². Pushing the 3 m and 4 m edges outwards shows the perimeter is the same as the full rectangle's: 36 m.",
      workedExamples: [
        {
          title: "Big minus missing",
          problem:
            "An L-shaped HDB living room fits exactly inside a 9 m by 7 m rectangle, with a 4 m by 2 m rectangle missing from one corner. Find its floor area and its perimeter.",
          steps: [
            "Area of the surrounding rectangle: 9 × 7 = 63 m².",
            "Subtract the missing corner: 63 − 4 × 2 = 63 − 8 = 55 m².",
            "A corner cut-out doesn't change the perimeter: 2 × (9 + 7) = 32 m.",
          ],
          answer: "Area 55 m², perimeter 32 m.",
          yourTurn: {
            question:
              "Your turn: an L-shaped floor fits exactly inside a 12 m by 8 m rectangle, with a 5 m by 3 m rectangle missing from one corner. Find its area in m².",
            answer: { type: "number", value: 81 },
            solution: "12 × 8 − 5 × 3 = 96 − 15 = 81 m².",
          },
        },
        {
          title: "Missing sides, then perimeter",
          problem:
            "An L-shape is a 12 cm by 10 cm rectangle with its top-right corner removed. The left side is 10 cm, the bottom is 12 cm, the top edge is 5 cm and the right-hand side is 4 cm. Find the two unlabelled sides, the perimeter and the area.",
          steps: [
            "Horizontal: the bottom (12 cm) equals the top edge plus the inner horizontal edge, so the inner edge is 12 − 5 = 7 cm.",
            "Vertical: the left side (10 cm) equals the right side plus the inner vertical edge, so the inner edge is 10 − 4 = 6 cm.",
            "Perimeter: 10 + 12 + 4 + 7 + 6 + 5 = 44 cm. Check: 2 × (12 + 10) = 44 ✓",
            "Area: split into a 5 × 10 strip and a 7 × 4 block: 50 + 28 = 78 cm². Check: 120 − 7 × 6 = 120 − 42 = 78 ✓",
          ],
          answer: "Missing sides 7 cm and 6 cm; perimeter 44 cm; area 78 cm².",
        },
        {
          title: "A notch adds perimeter",
          problem:
            "A 10 cm by 6 cm rectangle has a notch 4 cm wide and 3 cm deep cut from the middle of its top edge, making a U-shape. Find its area and its perimeter.",
          steps: [
            "Area: 10 × 6 − 4 × 3 = 60 − 12 = 48 cm².",
            "The top is now two 3 cm pieces plus the 4 cm floor of the notch: 3 + 3 + 4 = 10 cm, the same as before.",
            "But the notch adds two inside walls, each 3 cm deep.",
            "Perimeter = 2 × (10 + 6) + 2 × 3 = 32 + 6 = 38 cm.",
          ],
          answer: "Area 48 cm², perimeter 38 cm.",
        },
      ],
      keyPoints: [
        "Split and add, or big rectangle minus missing piece — use one to check the other.",
        "Find missing sides first: edges going one way add up to the edges going the opposite way.",
        "Perimeter includes every boundary edge, labelled or not, but never an internal split line.",
        "Cutting off a corner keeps the perimeter the same; cutting a notch increases it.",
      ],
      whyItWorks:
        "Walk once round a rectilinear shape and you finish where you started. So the distance you walk right must equal the distance you walk left, and the distance up must equal the distance down. That is why missing sides can always be found — and why pushing a corner's inner edges outwards turns the boundary into the surrounding rectangle without changing its length.",
      strategies: ["Split into cases", "Big minus missing", "Look for an invariant"],
      thinkDeeper:
        "Twelve 1 cm squares are joined edge to edge (whole edges touching) to make one shape. What is the largest possible perimeter? The smallest? Hint: twelve separate squares have a total perimeter of 48 cm, and every shared edge removes 2 cm from that.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "nets-and-euler",
      heading: "3D shapes, nets & Euler's formula",
      discovery: {
        problem:
          "Count the **vertices** (corners) V, **faces** F and **edges** E of a cube, a triangular prism and a square-based pyramid. For each shape, work out V + F − E. What do you notice? Test your idea on a shape of your own.",
        idea:
          "Cube: 8 + 6 − 12 = 2. Triangular prism: 6 + 5 − 9 = 2. Square-based pyramid: 5 + 5 − 8 = 2. It is **always 2**. This is **Euler's formula**, first written down by Leonhard Euler in 1750: for any solid with flat faces and no holes through it, {{V + F - E = 2}}.",
      },
      body:
        "A **polyhedron** is a 3D solid whose surfaces are all flat polygons.\n\n- A **face** is a flat surface.\n- An **edge** is a line segment where two faces meet.\n- A **vertex** (plural **vertices**) is a corner where edges meet.\n\nA **prism** has two identical, parallel end faces joined by rectangles, so it has the same **cross-section** all the way through. A **pyramid** has one polygon base and triangular faces that meet at a single point, the **apex**. Both are named after their end or base: triangular prism, hexagonal prism, square-based pyramid.\n\n| Solid | Faces F | Vertices V | Edges E |\n|---|---|---|---|\n| Cube or cuboid | 6 | 8 | 12 |\n| Triangular prism | 5 | 6 | 9 |\n| Square-based pyramid | 5 | 5 | 8 |\n| Tetrahedron (triangular pyramid) | 4 | 4 | 6 |\n| Pentagonal prism | 7 | 10 | 15 |\n\n**Patterns for an n-sided base.** A prism has {{F = n + 2}}, {{V = 2n}} and {{E = 3n}}. A pyramid has {{F = n + 1}}, {{V = n + 1}} and {{E = 2n}}. Euler's formula lets you find any one of V, F and E from the other two.\n\n**Nets.** A **net** is a flat 2D pattern that folds up to make a 3D solid, showing each face exactly once. A cube has 11 different nets. To test a possible net:\n- Count the faces (a cube needs 6 squares).\n- Imagine folding: no two faces may land in the same place.\n- In a straight row of squares, two faces with exactly one square between them end up **opposite** each other.\n\nA triangular prism's net has 3 rectangles and 2 triangles. A square-based pyramid's net is a square with a triangle on each side.",
      diagram: `<svg viewBox="0 0 340 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cross-shaped net of a cube with faces A, B, C, D in a vertical column and E and F on either side of B. Opposite faces share a colour: A and C, B and D, E and F."><rect x="0" y="0" width="340" height="225" fill="#ffffff"/><g stroke="#1f2937" stroke-width="2"><rect x="155" y="10" width="50" height="50" fill="#c7d2fe"/><rect x="155" y="60" width="50" height="50" fill="#fde68a"/><rect x="155" y="110" width="50" height="50" fill="#c7d2fe"/><rect x="155" y="160" width="50" height="50" fill="#fde68a"/><rect x="105" y="60" width="50" height="50" fill="#bbf7d0"/><rect x="205" y="60" width="50" height="50" fill="#bbf7d0"/></g><g font-family="sans-serif" font-size="15" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="180" y="40">A</text><text x="180" y="90">B</text><text x="180" y="140">C</text><text x="180" y="190">D</text><text x="130" y="90">E</text><text x="230" y="90">F</text></g><g stroke="#334155" stroke-width="1"><rect x="232" y="160" width="12" height="12" fill="#c7d2fe"/><rect x="232" y="178" width="12" height="12" fill="#fde68a"/><rect x="232" y="196" width="12" height="12" fill="#bbf7d0"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="232" y="150">Opposite pairs</text><text x="250" y="170">A and C</text><text x="250" y="188">B and D</text><text x="250" y="206">E and F</text></g></svg>`,
      diagramCaption:
        "A net of a cube. Fold B down as the floor: E and F become the side walls, A and C the back and front, and D folds over as the lid. Same colour = opposite faces.",
      workedExamples: [
        {
          title: "The prism pattern",
          problem:
            "A hexagonal prism has a hexagon at each end. Find its number of faces, vertices and edges, and check Euler's formula.",
          steps: [
            "Faces: 2 hexagons + 6 rectangles (one on each side of the hexagon) = 8.",
            "Vertices: 6 on each hexagon, so 2 × 6 = 12.",
            "Edges: 6 round each hexagon plus 6 joining the two ends: 6 + 6 + 6 = 18.",
            "Check: V + F − E = 12 + 8 − 18 = 2 ✓",
          ],
          answer: "F = 8, V = 12, E = 18",
          yourTurn: {
            question: "Your turn: how many edges does an octagonal prism (8-sided ends) have?",
            answer: { type: "number", value: 24 },
            solution: "8 edges round each end plus 8 joining the ends: 8 + 8 + 8 = 24. (That's 3n with n = 8.)",
          },
        },
        {
          title: "Using Euler's formula",
          problem: "A polyhedron called an **icosahedron** has 12 vertices and 30 edges. How many faces does it have?",
          steps: [
            "{{V + F - E = 2}}, so 12 + F − 30 = 2.",
            "F − 18 = 2.",
            "F = 20. (It is the shape of a 20-sided dice.)",
          ],
          answer: "20 faces",
        },
        {
          title: "Which face is opposite?",
          problem:
            "A cube net is a row of four squares labelled 1, 2, 3, 4 from left to right. Square 5 is attached to the top edge of square 2, and square 6 is attached to the bottom edge of square 3. Which face is opposite face 5?",
          steps: [
            "Fold with square 2 as the floor.",
            "Squares 1 and 3 fold up as the left and right walls, and 4 folds over from 3 to make the lid. So 1 is opposite 3, and 2 is opposite 4.",
            "Square 5 folds up from the back edge of the floor to make the back wall. Square 6 swings round from the right wall to make the front wall.",
            "The back and front walls are opposite, so face 6 is opposite face 5.",
          ],
          answer: "Face 6",
        },
      ],
      keyPoints: [
        "Faces are flat surfaces, edges are where two faces meet, vertices are corners.",
        "Euler's formula: {{V + F - E = 2}} for any polyhedron without holes.",
        "An n-sided prism has n + 2 faces, 2n vertices and 3n edges.",
        "A net shows every face exactly once; in a straight row, alternate squares are opposite faces.",
      ],
      whyItWorks:
        "Here is why the total is so stubborn. Draw a new edge across a face, joining two of its corners: one face becomes two, so F and E both go up by 1 and V + F − E stays the same. Slice a corner off a cube: you lose 1 vertex but gain 3 (V goes up by 2), and you gain 1 triangular face and 3 edges — the change is 2 + 1 − 3 = 0. Changes like these never alter the total, which is why polyhedra without holes all give the same answer as a cube: 2. (A full proof is a lovely piece of university maths.)",
      strategies: ["Try small cases", "Find a pattern", "Look for an invariant"],
      thinkDeeper:
        "Can a polyhedron have exactly 7 edges? Every face has at least 3 edges and every edge is shared by exactly 2 faces, so {{2E >= 3F}}. At least 3 edges meet at every vertex, and every edge has 2 ends, so {{2E >= 3V}}. Use these with Euler's formula to decide — and to prove your answer.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "plans-elevations",
      heading: "Plans & elevations",
      discovery: {
        problem:
          "A woodworker wants one solid block that slides snugly through a **square** hole when pushed in from the front, through the **same square** hole when pushed in from the side, and through a **circular** hole when dropped in from above. Can one solid do all three? Describe it.",
        idea:
          "Yes — an upright **cylinder** whose height equals its diameter. From the front or the side it looks like a square; from above it looks like a circle. Views from different directions can look completely different, and each one tells you something new. Architects and engineers describe solids using exactly these flat views.",
      },
      body:
        "A 3D solid can be shown on flat paper in two main ways.\n\n**1. Plans and elevations** are flat 2D views, looking straight at the solid from one direction:\n- The **plan** is the view from directly **above** (a bird's-eye view).\n- The **front elevation** is the view from the **front**.\n- The **side elevation** is the view from the **side** (say which side).\n\nIn each view, draw the outline you would see, plus a line wherever there is an edge — where the surface changes height or depth. There is no perspective: every length is shown **true size**, or scaled by the same amount. On squared paper one square might stand for 1 cm, or you might use a scale such as 1 cm to 50 cm.\n\n**2. Isometric drawings** are 3D pictures drawn on **isometric paper** (dots in a triangular pattern). Vertical edges stay vertical, and the other two directions run at 30° to the horizontal. Lengths along all three directions are true, so a 1 cm cube has every edge one dot-gap long. Hold the paper so that the dots form vertical columns.\n\n**Stacks of cubes.** A neat way to record a solid made of cubes is a plan with the **height of each stack** written in its square. From it you can:\n- count the cubes (add the numbers);\n- draw the front elevation (the tallest stack in each column, seen from the front);\n- draw the side elevation (the tallest stack in each row, seen from the side).\n\nBe careful: cubes can hide behind others in a single isometric drawing, so one picture may not tell you exactly how many cubes there are.",
      diagram: `<svg viewBox="0 80 470 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An isometric drawing of four cubes: an L-shaped base of three cubes with one extra cube on top of the corner cube. Beside it: the plan, an L of three squares with stack heights 2, 1 and 1; the front elevation, an L-shape two squares wide with the tall column on the left; the side elevation, an L-shape with the tall column on the right."><rect x="0" y="0" width="470" height="230" fill="#ffffff"/><polygon points="121,155 147,140 121,125 95,140" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><polygon points="121,185 95,170 95,140 121,155" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><polygon points="121,185 147,170 147,140 121,155" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><polygon points="69,155 95,140 69,125 43,140" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><polygon points="69,185 43,170 43,140 69,155" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><polygon points="69,185 95,170 95,140 69,155" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><polygon points="95,170 121,155 95,140 69,155" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><polygon points="95,200 69,185 69,155 95,170" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><polygon points="95,200 121,185 121,155 95,170" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><polygon points="95,140 121,125 95,110 69,125" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><polygon points="95,170 69,155 69,125 95,140" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><polygon points="95,170 121,155 121,125 95,140" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><line x1="180" y1="203" x2="155" y2="189" stroke="#334155" stroke-width="1.5"/><polygon points="150,186 158.9,186.5 154.9,193.5" fill="#334155"/><line x1="19" y1="206" x2="44" y2="191.4" stroke="#334155" stroke-width="1.5"/><polygon points="50,188 45.1,195.5 41.1,188.5" fill="#334155"/><polygon points="190,200 250,200 250,170 220,170 220,140 190,140" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polyline points="190,170 220,170 220,200" fill="none" stroke="#1f2937" stroke-width="1.5"/><polygon points="285,200 345,200 345,170 315,170 315,140 285,140" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="380,200 440,200 440,140 410,140 410,170 380,170" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="95" y="96">Isometric</text><text x="220" y="128">Plan</text><text x="315" y="128">Front (F)</text><text x="410" y="128">Side (S)</text><text x="205" y="190">2</text><text x="235" y="190">1</text><text x="205" y="160">1</text><text x="187" y="215" font-weight="bold">F</text><text x="12" y="220" font-weight="bold">S</text></g></svg>`,
      diagramCaption:
        "Four cubes drawn on isometric paper, with the plan (numbers = stack heights), the front elevation seen from F and the side elevation seen from S. Faces that line up flat show no line between them.",
      workedExamples: [
        {
          title: "Views of a cuboid",
          problem:
            "A cuboid 4 cm long, 2 cm wide and 3 cm tall stands on a table with its long side facing you. Describe its plan, front elevation and side elevation.",
          steps: [
            "Plan (from above): you see the top face, a 4 cm by 2 cm rectangle.",
            "Front elevation: you see the long side, a 4 cm by 3 cm rectangle.",
            "Side elevation: you see the end, a 2 cm by 3 cm rectangle.",
          ],
          answer: "Plan 4 cm × 2 cm; front elevation 4 cm × 3 cm; side elevation 2 cm × 3 cm.",
          yourTurn: {
            question:
              "Your turn: a cuboid 5 cm long, 3 cm wide and 2 cm tall stands on a table with its long side facing you. What is the area of its side elevation, in cm²?",
            answer: { type: "number", value: 6 },
            solution: "The side elevation shows the width and the height: 3 cm × 2 cm = 6 cm².",
          },
        },
        {
          title: "Reading a plan with stack heights",
          problem:
            "The plan of a solid made of 1 cm cubes is a grid 3 squares wide and 2 squares deep. The front row (nearest you) has stack heights 2, 1, 1 from left to right; the back row has 3, 1, 2. How many cubes are there, and what does the front elevation look like?",
          steps: [
            "Count: 2 + 1 + 1 + 3 + 1 + 2 = 10 cubes.",
            "From the front you see the **tallest** stack in each column.",
            "Left column: the taller of 2 and 3 is 3. Middle column: 1. Right column: the taller of 1 and 2 is 2.",
            "So the front elevation is three columns side by side, 3 cm, 1 cm and 2 cm tall.",
            "Add a line across the left column 2 cm up and across the right column 1 cm up. That is where the shorter front stack stops and the taller stack behind it shows above — the depth changes there.",
          ],
          answer: "10 cubes; front elevation columns of heights 3, 1, 2 cm, with lines 2 cm up on the left and 1 cm up on the right.",
        },
        {
          title: "Drawing to scale",
          problem:
            "A garden shed is 3 m long and 2 m wide. Its walls are 2 m tall, and its roof slopes up to a ridge 2.5 m above the ground, running along the length. Using a scale of 1 cm to 50 cm, give the measurements you would draw for the plan, the front elevation (long side) and the side elevation (end).",
          steps: [
            "Scale: 50 cm becomes 1 cm, so 1 m becomes 2 cm. Then 3 m → 6 cm, 2 m → 4 cm and 2.5 m → 5 cm.",
            "Plan: a 6 cm by 4 cm rectangle, with a line along the middle for the ridge.",
            "Front elevation: a rectangle 6 cm wide and 5 cm tall, with a horizontal line 4 cm up where the roof meets the wall.",
            "Side elevation: a pentagon 4 cm wide, with vertical sides 4 cm tall, rising to a point 5 cm high in the middle.",
          ],
          answer: "Plan 6 cm × 4 cm; front 6 cm × 5 cm with a line at 4 cm; side a pentagon 4 cm wide and 5 cm tall at its peak.",
        },
      ],
      keyPoints: [
        "Plan = view from above; front elevation = from the front; side elevation = from the side.",
        "Elevations are flat and true to size (or to scale) — no perspective.",
        "Draw a line wherever the surface changes height or depth.",
        "In isometric drawings, vertical edges stay vertical and the other edges slope at 30°.",
      ],
      whyItWorks:
        "Each view squashes the solid flat along one direction, so it keeps two of the three dimensions and loses the third. The plan keeps length and width, the front elevation keeps length and height, and the side elevation keeps width and height. Together the three views hold all three dimensions, which is why a builder can make a real object from them.",
      strategies: ["Draw a diagram", "Consider extremes", "Work systematically"],
      thinkDeeper:
        "A solid made of 1 cm cubes has a front elevation whose outline is a 2 by 2 square and a side elevation whose outline is also a 2 by 2 square. Every cube rests on the table or on another cube. What is the greatest number of cubes it could contain? What is the fewest? Sketch a plan with stack heights for each.",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "surface-area",
      heading: "Surface area",
      discovery: {
        problem:
          "Eight 1 cm cubes are stuck together to make a 2 cm × 2 cm × 2 cm cube. Its **surface area** — the total area of all its outside faces — is 24 cm². Now rearrange the same eight cubes into a 1 cm × 1 cm × 8 cm tower. The volume hasn't changed. Has the surface area?",
        idea:
          "The tower has surface area **34 cm²**: four long faces of 8 cm² each, plus two 1 cm² ends. Same volume, much more surface. A compact shape hides more faces inside it — which is why a cat curls up to keep warm, and why boxes close to a cube use less cardboard.",
      },
      body:
        "The **surface area** of a 3D solid is the total area of all its faces. It is an area, so it is measured in square units (cm², m²).\n\nThe safest method: **sketch the net**, find the area of every face, and add. The net shows each face exactly once, so nothing is missed or doubled.\n\n**Cube** with edge s: six identical squares.\n\n    {{SA = 6 s^2}}\n\n**Cuboid** with length l, width w and height h: three pairs of identical rectangles (top and bottom, front and back, the two ends).\n\n    {{SA = 2(lw + lh + wh)}}\n\n**Triangular prism:** 2 identical triangles + 3 rectangles. Each rectangle is one side of the triangle × the length of the prism.\n\n**Square-based pyramid** with base edge b: one square base + 4 identical triangles. Each triangle has base b and height l, the **slant height** — the height of the triangular face, measured up the middle of the face. It is *not* the vertical height of the pyramid, which is hidden inside it.\n\n    {{SA = b^2 + 4 * 1/2 b l = b^2 + 2 b l}}\n\n**Shortcut for any prism:** the side rectangles all share the prism's length, so laid side by side they make one long rectangle as wide as the **perimeter** of the cross-section:\n\n    SA = 2 × (area of cross-section) + (perimeter of cross-section) × length",
      diagram: `<svg viewBox="0 0 420 265" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Net of a triangular prism: three rectangles 3 cm, 4 cm and 5 cm wide and 10 cm long, side by side, with a right-angled triangle of sides 3, 4 and 5 cm attached above and below the 4 cm rectangle. Rectangle areas 30, 40 and 50 square centimetres, triangle areas 6 square centimetres each, total 132 square centimetres."><rect x="0" y="0" width="420" height="265" fill="#ffffff"/><g stroke="#1f2937" stroke-width="2"><rect x="30" y="60" width="45" height="150" fill="#c7d2fe"/><rect x="75" y="60" width="60" height="150" fill="#c7d2fe"/><rect x="135" y="60" width="75" height="150" fill="#c7d2fe"/><polygon points="75,60 135,60 75,15" fill="#fde68a"/><polygon points="75,210 135,210 75,255" fill="#fde68a"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="52" y="54">3 cm</text><text x="105" y="78">4 cm</text><text x="172" y="54">5 cm</text><text x="52" y="140" font-size="11">30 cm²</text><text x="105" y="140">40 cm²</text><text x="172" y="140">50 cm²</text><text x="93" y="49">6</text><text x="93" y="230">6</text></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="216" y="140">10 cm</text><text x="262" y="100">Triangles: 2 × 6 = 12 cm²</text><text x="262" y="122">Rectangles: 30 + 40 + 50</text><text x="262" y="140">= 120 cm²</text><text x="262" y="168" font-weight="bold">Total = 132 cm²</text></g></svg>`,
      diagramCaption:
        "Net of a triangular prism with a 3-4-5 right-angled cross-section, 10 cm long. The three rectangles join into one strip 12 cm wide — and 12 cm is the perimeter of the triangle.",
      workedExamples: [
        {
          title: "Cuboid",
          problem: "Find the surface area of a cuboid 6 cm long, 4 cm wide and 3 cm high.",
          steps: [
            "Top and bottom: 6 × 4 = 24 cm² each.",
            "Front and back: 6 × 3 = 18 cm² each.",
            "Two ends: 4 × 3 = 12 cm² each.",
            "Total: 2 × (24 + 18 + 12) = 2 × 54 = 108 cm².",
          ],
          answer: "108 cm²",
          yourTurn: {
            question: "Your turn: find the surface area of a cuboid 5 cm long, 4 cm wide and 2 cm high, in cm².",
            answer: { type: "number", value: 76 },
            solution: "Pairs of faces: 5 × 4 = 20, 5 × 2 = 10, 4 × 2 = 8. SA = 2 × (20 + 10 + 8) = 2 × 38 = 76 cm².",
          },
        },
        {
          title: "Triangular prism",
          problem:
            "A triangular prism is 10 cm long. Its cross-section is a right-angled triangle with sides 3 cm, 4 cm and 5 cm; the right angle is between the 3 cm and 4 cm sides. Find its surface area.",
          steps: [
            "Each triangle: {{1/2 * 3 * 4 = 6}} cm², so the two ends make 12 cm².",
            "Rectangles: 3 × 10 = 30, 4 × 10 = 40 and 5 × 10 = 50, total 120 cm². (Shortcut: perimeter 12 cm × length 10 cm = 120 cm².)",
            "Total: 12 + 120 = 132 cm².",
          ],
          answer: "132 cm²",
        },
        {
          title: "Square-based pyramid",
          problem:
            "A square-based pyramid has base edges of 6 cm. Each triangular face has a slant height of 5 cm, and the pyramid's vertical height is 4 cm. Find its surface area.",
          steps: [
            "Base: 6 × 6 = 36 cm².",
            "One triangular face: {{1/2 * 6 * 5 = 15}} cm². Use the slant height — it is the height *of the triangle*.",
            "Four faces: 4 × 15 = 60 cm².",
            "Total: 36 + 60 = 96 cm². The vertical height (4 cm) isn't needed at all.",
          ],
          answer: "96 cm²",
        },
      ],
      keyPoints: [
        "Surface area = the total area of all the faces, in square units.",
        "Cuboid: {{SA = 2(lw + lh + wh)}} — three pairs of identical faces.",
        "Pyramid faces use the slant height, not the vertical height.",
        "Any prism: 2 × cross-section + perimeter of cross-section × length.",
      ],
      whyItWorks:
        "Unfolding a solid into its net doesn't stretch or shrink any face, so the area of the net equals the surface area. For a prism, every side face is a rectangle with the same length as the prism. Laid side by side they form one rectangle whose width is the total distance round the cross-section — its perimeter.",
      strategies: ["Sketch the net", "Work systematically", "Use a shortcut, then check"],
      thinkDeeper:
        "Eight 1 cm cubes are glued together face to face to make one solid. Each glued joint hides 2 cm² of surface. What is the smallest possible surface area, and the largest? (What is the fewest number of joints needed to hold 8 cubes together?)",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "volume",
      heading: "Volume of cuboids & prisms",
      discovery: {
        problem:
          "A box is 5 cm long, 4 cm wide and 3 cm tall. How many 1 cm cubes fill it? Now slice the box straight down through a diagonal of its top face, making two identical wedges. What is the volume of one wedge? Find one rule that works for both the box and the wedge.",
        idea:
          "The box holds 3 layers of 5 × 4 = 20 cubes: 60 cm³. Each wedge is half of that: 30 cm³. Both answers are **(area of the end face) × (how far it runs)**: 20 × 3 = 60 and {{1/2}} × 5 × 4 × 3 = 10 × 3 = 30. Every prism works like this: volume = area of cross-section × length.",
      },
      body:
        "**Volume** is the amount of space a 3D object takes up, measured in **cubic units**. One **cubic centimetre** (1 cm³) is the space inside a cube with 1 cm edges. **Capacity** is how much a container can hold, usually measured in millilitres (ml) and litres.\n\n**Cuboid.** A layer of l × w unit cubes, stacked h layers high:\n\n    {{V = l * w * h}}\n\n**Any prism.** A prism has the same **cross-section** all the way through, so it is a stack of identical slices. Its volume is\n\n    {{V = A * L}}    (area of cross-section × length)\n\nFor a **triangular prism**, {{A = 1/2 b h}}, so {{V = 1/2 b h L}}. Watch the two different lengths: *h* is the height of the triangle, *L* is how long the prism is. The cross-section can be any shape — a trapezium, an L-shape, a hexagon — and the rule is the same.\n\n**Units and capacity.**\n\n| Volume | Capacity |\n|---|---|\n| 1 cm³ | 1 ml |\n| 1000 cm³ (a 10 cm cube) | 1 litre |\n| 1 m³ = 1 000 000 cm³ | 1000 litres |\n\nPut every length in the **same unit** before multiplying. 1 m³ is 100 × 100 × 100 cm³, not 100 cm³ — all three lengths get converted.\n\n> **Stretch — scaling up.** If every length of a solid is multiplied by k, every area is multiplied by {{k^2}} and the volume by {{k^3}}. Double the edges of a box and it needs 4 times the cardboard but holds 8 times as much.",
      diagram: `<svg viewBox="0 50 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A triangular prism drawn in 3D. The front triangular cross-section is shaded, with base 6 cm and perpendicular height 4 cm; the prism is 10 cm long. Hidden edges are dashed."><rect x="0" y="0" width="360" height="290" fill="#ffffff"/><polygon points="160,260 100,180 186.6,130 246.6,210" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><polygon points="40,260 160,260 100,180" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><g stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4" fill="none"><line x1="40" y1="260" x2="126.6" y2="210"/><line x1="126.6" y1="210" x2="246.6" y2="210"/><line x1="126.6" y1="210" x2="186.6" y2="130"/><line x1="100" y1="180" x2="100" y2="260"/></g><polyline points="100,250 110,250 110,260" fill="none" stroke="#334155" stroke-width="1.2"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="100" y="279" text-anchor="middle">6 cm</text><text x="104" y="241" font-size="12">4 cm</text><text x="214" y="250">10 cm</text><text x="20" y="80">Cross-section: ½ × 6 × 4 = 12 cm²</text><text x="20" y="102">Volume: 12 × 10 = 120 cm³</text></g></svg>`,
      diagramCaption:
        "A triangular prism. Cross-section {{1/2}} × 6 × 4 = 12 cm², length 10 cm, so the volume is 12 × 10 = 120 cm³.",
      workedExamples: [
        {
          title: "Triangular prism",
          problem:
            "A triangular prism is 10 cm long. Its cross-section is a triangle with base 6 cm and perpendicular height 4 cm. Find its volume.",
          steps: [
            "Area of cross-section: {{1/2 * 6 * 4 = 12}} cm².",
            "Volume = area of cross-section × length = 12 × 10 = 120 cm³.",
          ],
          answer: "120 cm³",
          yourTurn: {
            question:
              "Your turn: a triangular prism is 12 cm long. Its cross-section is a triangle with base 8 cm and perpendicular height 5 cm. Find its volume in cm³.",
            answer: { type: "number", value: 240 },
            solution: "Cross-section: {{1/2 * 8 * 5 = 20}} cm². Volume: 20 × 12 = 240 cm³.",
          },
        },
        {
          title: "Capacity in litres",
          problem:
            "A fish tank is a cuboid 50 cm long, 30 cm wide and 40 cm tall. Siti fills it with water to a depth of 32 cm. How many litres of water are in the tank?",
          steps: [
            "The water itself is a cuboid 50 cm × 30 cm × 32 cm.",
            "Base area: 50 × 30 = 1500 cm². Volume: 1500 × 32 = 48 000 cm³.",
            "1000 cm³ = 1 litre, so 48 000 ÷ 1000 = 48 litres.",
          ],
          answer: "48 litres",
        },
        {
          title: "Any prism, mixed units",
          problem:
            "A water trough is a prism 2 m long. Its cross-section is a trapezium with parallel sides of 40 cm (bottom) and 60 cm (top), and it is 30 cm deep. How many litres does it hold when full?",
          steps: [
            "Same units first: 2 m = 200 cm.",
            "Cross-section: {{1/2 (40 + 60) * 30 = 1/2 * 100 * 30 = 1500}} cm².",
            "Volume: 1500 × 200 = 300 000 cm³.",
            "In litres: 300 000 ÷ 1000 = 300 litres.",
          ],
          answer: "300 litres",
        },
      ],
      keyPoints: [
        "Volume is measured in cubic units: cm³, m³.",
        "Prism: volume = area of cross-section × length. Cuboid: {{V = l w h}}.",
        "1 cm³ = 1 ml and 1000 cm³ = 1 litre.",
        "Convert every length to the same unit before you multiply.",
      ],
      whyItWorks:
        "Slice a prism into layers 1 cm thick. Each layer is a copy of the cross-section, 1 cm deep, so it holds A cubic centimetres (counting part-cubes). A prism L cm long has L layers, giving {{A * L}} cm³. For a triangular prism, two copies fit together to make a prism with a parallelogram cross-section of area {{b * h}} — just as two triangles make a parallelogram — so two prisms have volume {{b * h * L}} and one has {{1/2 b h L}}.",
      strategies: ["Find the cross-section first", "Check units", "Estimate first"],
      thinkDeeper:
        "A cuboid has volume 24 cm³ and every edge is a whole number of centimetres. How many different cuboids are possible? Which one has the smallest surface area, and what do you notice about its shape?",
    },
    // ------------------------------------------------------------------ 8
    {
      id: "cylinders",
      heading: "Cylinders",
      discovery: {
        problem:
          "Take a sheet of A4 paper (21 cm by 29.7 cm). Roll it into a tube two ways: tall and thin (29.7 cm high) or short and fat (21 cm high). Both tubes use exactly the same paper. Do they hold the same amount? Guess first — then test by filling them with rice or dried beans.",
        idea:
          "They don't! The short, fat tube holds about 1474 cm³, the tall, thin one only about 1042 cm³. Volume depends on the **radius squared**, so widening the circle matters more than adding height. To see why, you need the cylinder formulas below.",
      },
      body:
        "**Stretch:** A **cylinder** is like a prism whose cross-section is a **circle**. If the circle has radius r, its area is {{pi r^2}} and its circumference (the distance round it) is {{2 pi r}} — the Circles topic shows where these come from.\n\n**Volume** = area of cross-section × height:\n\n    {{V = pi r^2 h}}\n\n**Surface area.** A closed cylinder has two circular ends and one curved surface. Cut the curved surface straight down and unroll it: it becomes a **rectangle**, h tall and as wide as the circumference, {{2 pi r}}.\n\n    curved surface area = {{2 pi r h}}\n    total surface area = {{2 pi r^2 + 2 pi r h}}\n\n- An open tube has no ends: just {{2 pi r h}}.\n- A can with an open top has one end: {{pi r^2 + 2 pi r h}}.\n\n**Exact or rounded?** An answer in terms of π (like 90π cm³) is exact. For a decimal, use the π button on your calculator and round only at the end.\n\n**Radius, not diameter.** If you're given the diameter, halve it first. Using the diameter in {{pi r^2}} makes the answer 4 times too big.",
      diagram: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cylinder with radius r and height h, and its net: a rectangle of width 2 pi r and height h with a circle of radius r attached to the top and bottom."><rect x="0" y="0" width="400" height="230" fill="#ffffff"/><path d="M30 45 L30 195 A50 18 0 0 0 130 195 L130 45 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><path d="M30 195 A50 18 0 0 1 130 195" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><ellipse cx="80" cy="45" rx="50" ry="18" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="80" y1="45" x2="130" y2="45" stroke="#1f2937" stroke-width="1.5"/><circle cx="80" cy="45" r="2.5" fill="#1f2937"/><line x1="160" y1="120" x2="200" y2="120" stroke="#334155" stroke-width="1.5"/><polygon points="200,115 210,120 200,125" fill="#334155"/><rect x="225" y="90" width="125.7" height="60" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><circle cx="287.8" cy="70" r="20" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="287.8" cy="170" r="20" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="287.8" y1="70" x2="307.8" y2="70" stroke="#1f2937" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="104" y="41">r</text><text x="185" y="110" font-size="12">unroll</text><text x="297" y="66">r</text><text x="287.8" y="125">2πr</text><text x="287.8" y="214" font-size="12">curved surface = 2πr × h</text></g><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="138" y="124">h</text><text x="357" y="124">h</text></g></svg>`,
      diagramCaption:
        "Unroll the curved surface of a cylinder and it becomes a rectangle h tall and 2πr wide — exactly one circumference.",
      workedExamples: [
        {
          title: "Volume of a cylinder",
          problem:
            "A tin is a cylinder with radius 3 cm and height 10 cm. Find its volume exactly, in terms of π, and to 1 decimal place.",
          steps: [
            "Area of the circular end: {{pi * 3^2 = 9 pi}} cm².",
            "Volume = 9π × 10 = 90π cm³.",
            "With the π button: 90π = 282.743… ≈ 282.7 cm³.",
          ],
          answer: "90π cm³ ≈ 282.7 cm³",
          yourTurn: {
            question:
              "Your turn: a cylinder has radius 4 cm and height 5 cm. Find its volume in cm³, using the π button on your calculator. Give your answer to 1 decimal place.",
            answer: { type: "number", value: 251.3, tolerance: 0.05 },
            solution: "{{pi * 4^2 * 5 = 80 pi}} = 251.327… ≈ 251.3 cm³.",
          },
        },
        {
          title: "Surface area of a cylinder",
          problem:
            "Find the total surface area of a closed cylinder with radius 3 cm and height 10 cm. Give your answer to 1 decimal place.",
          steps: [
            "Two ends: {{2 * pi * 3^2 = 18 pi}} cm².",
            "Curved surface: {{2 * pi * 3 * 10 = 60 pi}} cm².",
            "Total: 18π + 60π = 78π = 245.044… ≈ 245.0 cm².",
          ],
          answer: "78π cm² ≈ 245.0 cm²",
        },
        {
          title: "The diameter trap",
          problem:
            "A drinks can is 12 cm tall and has a diameter of 7 cm. How many millilitres does it hold? Give your answer to the nearest millilitre.",
          steps: [
            "Radius = 7 ÷ 2 = 3.5 cm.",
            "Area of the end: {{pi * 3.5^2 = 12.25 pi}} cm².",
            "Volume: 12.25π × 12 = 147π = 461.81… cm³.",
            "1 cm³ = 1 ml, so the can holds about 462 ml.",
          ],
          answer: "About 462 ml",
        },
      ],
      keyPoints: [
        "A cylinder is a prism with a circular cross-section: {{V = pi r^2 h}}.",
        "The curved surface unrolls to a rectangle {{2 pi r}} wide and h tall.",
        "Closed cylinder: {{SA = 2 pi r^2 + 2 pi r h}}.",
        "Halve a diameter before using it as r.",
      ],
      whyItWorks:
        "Volume: exactly as for any prism — stack circular slices of area {{pi r^2}} up to a height h. Surface: peel the label off a can and lay it flat; it is a rectangle. Its height is the can's height, and its width wraps exactly once round the circle, so it equals the circumference {{2 pi r}}.",
      strategies: ["Make it simpler", "Draw the net", "Estimate first"],
      thinkDeeper:
        "A cylinder's radius is doubled and its height is halved. Does the volume go up, go down or stay the same — and by what factor? Then explain the A4 tubes from the start of this section: why does the fat one win, and by what factor? (Hint: write r in terms of the circumference C.)",
    },
  ],
  learn: {
    flashcards: [
      { front: "Area of a rectangle", back: "{{A = l * w}}, in square units such as cm²." },
      { front: "Area of a triangle", back: "{{A = 1/2 b h}}, with h the perpendicular height." },
      { front: "What is the perpendicular height of a triangle?", back: "The distance from the base to the opposite vertex, measured at right angles to the base. It can lie outside the triangle." },
      { front: "Area of a parallelogram", back: "{{A = b h}} — base × perpendicular height, never the sloping side." },
      { front: "Area of a trapezium", back: "{{A = 1/2 (a + b) h}}, where a and b are the parallel sides." },
      { front: "Perimeter vs area: units?", back: "Perimeter is a length (cm). Area is in square units (cm²)." },
      { front: "Two ways to find the area of a compound shape", back: "Split and add, or big rectangle minus the missing piece." },
      { front: "Euler's formula", back: "{{V + F - E = 2}} for any polyhedron without holes." },
      { front: "Faces, vertices, edges of a triangular prism", back: "F = 5, V = 6, E = 9." },
      { front: "Faces, vertices, edges of a square-based pyramid", back: "F = 5, V = 5, E = 8." },
      { front: "Plan vs elevation", back: "Plan: the view from above. Elevation: the view from the front or the side." },
      { front: "Surface area of a cuboid", back: "{{2(lw + lh + wh)}} — three pairs of identical faces." },
      { front: "Square-based pyramid: which height for surface area?", back: "The slant height of each triangular face, not the vertical height." },
      { front: "Volume of any prism", back: "Area of cross-section × length." },
      { front: "1 cm³ = ? and 1 litre = ?", back: "1 cm³ = 1 ml; 1 litre = 1000 cm³ (a 10 cm cube)." },
      { front: "(Stretch) Every length × k: what happens to area and volume?", back: "Area × {{k^2}}, volume × {{k^3}}." },
    ],
    mustKnow: [
      "I can find the area and perimeter of rectangles and triangles, using the perpendicular height.",
      "I can find a missing length when I know the area.",
      "I can explain why a parallelogram has area {{b h}} and a trapezium has area {{1/2 (a + b) h}}.",
      "I can find the area of a compound rectilinear shape by splitting or by subtracting.",
      "I can work out missing sides and the perimeter of a compound shape.",
      "I can count faces, edges and vertices and use {{V + F - E = 2}}.",
      "I can recognise and draw nets of cubes, cuboids, prisms and pyramids.",
      "I can draw plans and elevations to scale and read isometric drawings.",
      "I can find the surface area of cubes, cuboids, triangular prisms and square-based pyramids.",
      "I can find the volume of cuboids and prisms using area of cross-section × length.",
      "I can convert between cm³, ml and litres.",
      "(Stretch) I can find the volume and surface area of a cylinder.",
    ],
    misconceptions: [
      {
        wrong: "Use the sloping side as the height of a triangle or parallelogram.",
        right: "Use the perpendicular height, measured at right angles to the base. The sloping side is longer, so it gives an area that is too big.",
      },
      {
        wrong: "A shape with a bigger area must have a bigger perimeter.",
        right: "Not always: a 1 cm × 9 cm rectangle has area 9 cm² and perimeter 20 cm, but a 4 cm × 4 cm square has area 16 cm² and perimeter only 16 cm.",
      },
      {
        wrong: "Cutting a corner out of a rectangle makes its perimeter smaller.",
        right: "A rectangular corner cut-out leaves the perimeter unchanged: the two new inner edges are exactly as long as the outer pieces removed. Only the area drops.",
      },
      {
        wrong: "1 m² = 100 cm², because 1 m = 100 cm.",
        right: "1 m² is a 100 cm by 100 cm square, so 1 m² = 100 × 100 = 10 000 cm². Both dimensions are converted.",
      },
      {
        wrong: "The surface area of a square-based pyramid uses its vertical height.",
        right: "Each triangular face needs its own height — the slant height, measured up the middle of the face.",
      },
      {
        wrong: "Two solids with the same volume have the same surface area.",
        right: "A 2 × 2 × 2 cube and a 1 × 1 × 8 cuboid both have volume 8 cm³, but surface areas of 24 cm² and 34 cm².",
      },
    ],
    examMistakes: [
      "Giving an area in cm instead of cm², or a volume in cm² instead of cm³.",
      "Forgetting the {{1/2}} in the triangle or trapezium formula.",
      "Missing unlabelled sides (or adding an internal split line) when finding the perimeter of a compound shape.",
      "Adding only three faces of a cuboid for surface area and forgetting to double.",
      "Mixing units — a length in metres and others in centimetres in the same calculation.",
      "In a triangular prism, mixing up the height of the triangle with the length of the prism.",
      "Drawing an elevation in 3D perspective instead of as a flat, true-size view.",
      "(Stretch) Using the diameter instead of the radius in {{pi r^2 h}}.",
    ],
    mnemonics: [
      {
        topic: "Area of a trapezium",
        device: "Add the parallel pair, halve it, times the height",
        explanation: "That is {{1/2 (a + b) h}} in words. Halving a + b gives the average width of the trapezium.",
      },
      {
        topic: "Euler's formula",
        device: "Faces and Vertices beat Edges by two",
        explanation: "F + V = E + 2, which is the same as {{V + F - E = 2}}. Check it on a cube: 6 + 8 = 12 + 2.",
      },
      {
        topic: "Converting area and volume units",
        device: "Square it for area, cube it for volume",
        explanation: "1 m = 100 cm, so 1 m² = 100² = 10 000 cm² and 1 m³ = 100³ = 1 000 000 cm³.",
      },
      {
        topic: "Litres",
        device: "A 10 cm cube holds a litre",
        explanation: "10 × 10 × 10 = 1000 cm³ = 1 litre, so each 1 cm³ holds exactly 1 ml.",
      },
    ],
    realWorld: [
      {
        title: "Renovating an HDB flat",
        detail: "Flooring is priced per m², so an L-shaped living room is split into rectangles to work out how many tiles or planks to buy — plus a little extra for cutting.",
        emoji: "🏠",
      },
      {
        title: "Packaging design",
        detail: "Box makers design nets that fold up neatly and try to use as little cardboard (surface area) as possible for the volume they need to hold.",
        emoji: "📦",
      },
      {
        title: "Architects' drawings",
        detail: "Every new building starts as plans and elevations drawn to scale, so builders can read off true lengths before anything is built.",
        emoji: "📐",
      },
      {
        title: "Water tanks",
        detail: "Rooftop water tanks are cuboids or cylinders. Their capacity comes straight from the volume: 1 m³ holds 1000 litres.",
        emoji: "💧",
      },
      {
        title: "Drink cans",
        detail: "A can is a cylinder. Designers choose its radius and height to hold 330 ml while using little metal and staying easy to grip.",
        emoji: "🥫",
      },
      {
        title: "Board-game dice",
        detail: "Dice with 4, 6, 8, 12 and 20 faces are all polyhedra — and every one of them obeys V + F − E = 2.",
        emoji: "🎲",
      },
    ],
    videos: [
      {
        title: "Area of a trapezium",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+area+of+a+trapezium",
      },
      {
        title: "Plans and elevations",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+plans+and+elevations",
      },
      {
        title: "Surface area and volume of prisms",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+surface+area+volume+prisms",
      },
      {
        title: "Euler's formula for polyhedra",
        channel: "Numberphile",
        url: "https://www.youtube.com/results?search_query=numberphile+euler+formula+polyhedra",
      },
    ],
    formulas: [
      { name: "Rectangle", formula: "{{A = l * w}}, {{P = 2(l + w)}}" },
      { name: "Triangle", formula: "{{A = 1/2 b h}}", note: "h is the perpendicular height." },
      { name: "Parallelogram", formula: "{{A = b h}}", note: "Perpendicular height, not the sloping side." },
      { name: "Trapezium", formula: "{{A = 1/2 (a + b) h}}", note: "a and b are the parallel sides." },
      { name: "Euler's formula", formula: "{{V + F - E = 2}}", note: "For polyhedra without holes." },
      { name: "Surface area of a cuboid", formula: "{{SA = 2(lw + lh + wh)}}" },
      { name: "Volume of a prism", formula: "{{V = A * L}}", note: "A = area of cross-section, L = length. Cuboid: {{V = l w h}}. 1 cm³ = 1 ml." },
      { name: "Cylinder (stretch)", formula: "{{V = pi r^2 h}}, {{SA = 2 pi r^2 + 2 pi r h}}" },
    ],
  },
};
