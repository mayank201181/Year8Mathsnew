# THINK INSIDE THE BOX, Ep 15 "The Great Renovation": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Area, Surface Area & Volume.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Kavya's family is renovating their whole HDB flat (Blk 417, #05-17) at once: three weeks, then a
housewarming party for forty people. The contractor is **Uncle Bala** ("Can, can! Everything can!"), whose tape
measure bites him whenever he says it. **Dad** is "helping": his rule is always to use the **biggest number**.
Living in Uncle Bala's toolbox is **Madam Perpendicular**, a set square (one right angle, forty years in
renovation, the manner of a ballet mistress) who insists that a height stands at 90° to its base. Two tiny
superscripts, **Squared** (²) and **Cubed** (³), drop onto any unit that leaves them off. **Mr Tan** from next
door keeps knocking about the drilling and stays to teach (and to make a pun nobody laughs at).
Day by day: Kavya and Ah Boy fight over a room (perimeter is not area), Dad's triangular door sign (the slope is
not the height), Mum's parallelogram tiles and dustpan-shaped flower bed, Uncle Bala's quote for the L-shaped
floor and the skirting board, Ah Boy counting the corners of every moving box (Carton the box, Polly the
twenty-sided dice, Euler), the shoe-cabinet drawings, wrapping forty lucky-draw prizes, and a 48-litre tank for
Mr Bubbles the goldfish (Cubert, one cubic centimetre; Cylinda the drinks can). Stinger: Dad ordered the floor
tiles in **cubic** metres ("It was the bigger one"). A mountain of tiles. Uncle Bala: "Can... cannot."

Guide sections (lib/topics/perimeter-area-volume/guide.ts) by scene: rectangles-triangles → `rooms`;
parallelograms-trapezia → `balcony`; compound-shapes → `living`; nets-and-euler → `boxes`; plans-elevations →
`views`; surface-area → `wrap`; volume → `tank` (first part); cylinders (stretch) → `tank` (last part).
Exam mistakes → `traps`. Misconceptions on screen: sloping side as height (rooms, balcony), bigger area means
bigger perimeter (rooms), corner cut-out shrinks the perimeter (living), 1 m² = 100 cm² (tank), pyramid with
the vertical height (wrap), same volume means same surface area (wrap). Mnemonics: "Add the parallel pair, halve
it, times the height" (balcony), "Faces and Vertices beat Edges by two" (boxes), "Square it for area, cube it for
volume" (tank), "A 10 cm cube holds a litre" (tank). Extras: the dustpan field (Nine Chapters, balcony).

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'perp'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, bala, perp, sq, cu, carton, polly, cubert, cyl.
- **Humans are the heart.** They speak over 60% of the lines and are on screen in every scene. Busts stand
  BEHIND something: the plywood workbench (`avFlat`: characters in `g.mid`, or a layer below `g.front`), the
  balcony parapet (`avBalcony`), or the doorway gate (`avFlat` `g.hall` + `g.gate`: Mr Tan's spot).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Madam Perpendicular is `deadpan`, `annoyed` at every sloping-side idea, `smug` when right, and does her
  **right-angle check** (`check: 1`, a red ∟ and "90°" at her corner) whenever she says "perpendicular" or "90°".
  She points with her stick (`point: 1`) at the working. Dad is `smug` right before every mistake, then
  `sad`/`deadpan`. Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed`. Mr Tan is `happy` at
  his own puns; everyone else goes `deadpan`. Uncle Bala is `happy` ("can, can"), `shock` when the tape bites.
  Carton is anxious (`sweat`), Polly is `happy` and bouncing, Cubert is `deadpan` (deep voice), Cylinda is `smug`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **The twins drop in** (the stamp-style gag of this episode): when someone says an area or a volume without
     its square or cube, `avUnitDrop(parent, '9 m', '²')` shows the bare unit on screen and the superscript
     falls from the sky onto it with a squash and impact lines (`g.set(p)`), followed by the twin herself
     (`cast 'sq'` or `'cu'`, s ≈ 0.45) bouncing beside it. rooms.sq (`9 m` → `9 m²`), tank.cu (`48 000 cm²` →
     the ² is knocked off and the ³ lands: `48 000 cm³`), tank.sq (`1 m² = 100 cm²` → `10 000`), traps.t1/t1b,
     and both twins hide behind each other at traps.deliver.
  2. **"Biggest number."** Dad picks the biggest number every time: cold.dad, cold.diag (corner to corner),
     rooms.dad (10 not 6), balcony.dad (5 not 4), living.phone ("whichever's bigger"), views.dad (3D beats 2D),
     tank.seven (diameter 7 not radius 3.5), traps.bigger. Each time a tiny "BIGGEST NUMBER" chip with a gold
     star pops by his head; on the correction the star falls off.
  3. **"Can, can!"** Uncle Bala says it and his tape measure snaps back and bites his finger (`g.tape.set(1, snap)`,
     `shock`): cold.bala ("Ow"), traps.t3. In the stinger it becomes "Can... cannot."
  4. **Mr Tan and the drilling.** He appears at the gate (`avFlat` `g.hall`, `g.open`) or over the balcony divider
     with his mug, says "About the drilling..." and instantly teaches instead. His pun lands to silence: a tiny
     chip "*cricket*" and deadpan faces (balcony.pun, boxes.pun, views.pun).
  5. **Carton unfolds when stressed** (`flat: 1`) and is embarrassed about it (boxes.unfold, wrap.sa, wrap.bottom).
  6. **Mr Bubbles the goldfish** in a plastic bag on the workbench in early scenes; he gets his tank in `tank`.
- **Talking heads** (TH below) use `avConf(root, who)` full stage, the character big (s ≈ 1.3) at about
  (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `avLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, length or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`A = 1/2 b h`, `9 * 4 = 36`), `mkWorking` for aligned multi-step working,
  `mkText` for words with maths, `mkAxes`/`mkGrid` for squared paper, `mkTable` for the V, F, E table,
  `mkAngleMark` (right: true) for every right angle, dashed lines for heights and split lines. Shapes are drawn
  TO SCALE (choose px per unit and stick to it). Write `cm²`, `m²`, `cm³` with the real superscripts. Working
  goes on `avBlueprint` (white ink on blue) or on a white card (`MK.paper`, `MK.ink`).
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. At most ~1,000 elements per scene (a human bust is ~60-90; build each once and hide with `op`).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`avLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Living in a building site. |
| mum | Mum: brisk, party planner, gardener | magenta kurta, bun, bindi; no prop | MUM / Party planner. Forty guests. |
| dad | Dad: confident, wrong, lovable; "biggest number" | glasses, moustache, green polo; his own tape measure (`g.tape`) | DAD / "Biggest number wins." |
| boy | Ah Boy, 8: wants the corridor; owner of Mr Bubbles | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Wants the corridor. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; pencil | PRIYA / Best friend. Competitive. |
| tan | Mr Tan: next-door neighbour, maths teacher, puns | shirt and tie, glasses; mug | MR TAN / Maths teacher. Next door. The drilling. |
| bala | Uncle Bala: contractor, "Can, can!" | rich brown skin, salt-and-pepper buzz cut, stubble, moustache, yellow hard hat, orange tee "B"; tape measure (`g.tape.set(ext, snap)`) | UNCLE BALA / Contractor. "Can, can!" |
| perp | Madam Perpendicular, a SET SQUARE: strict, deadpan, "Ninety degrees" | mint acrylic right triangle, cm ticks, silver bun with a hairpin, cat-eye glasses, pearls, ballet flats; `check`, `point` | MADAM PERPENDICULAR / Set square. One right angle. |
| sq | Squared: the superscript ² | small cyan "2" with a face, arms, sneakers; `wave` | SQUARED / Rides on every area. |
| cu | Cubed: her twin, the superscript ³ | small orange "3"; `wave` | CUBED / Rides on every volume. |
| carton | Carton, a moving box (6 × 4 × 3 cuboid): anxious | cardboard box, flaps, FRAGILE, THIS WAY UP, sneakers; `flat` unfolds into his net (`g.net` face centres), `flap` | CARTON / Moving box. Nervous. |
| polly | Polly, a twenty-sided dice: counts everything | purple icosahedron, "20" on top, little arms and feet; `spin` | POLLY / Twenty-sided dice. Counts. |
| cubert | Cubert, one cubic centimetre: tiny, very deep voice | gold isometric cube, "1 cm³" on top, huge eyebrows, bow tie | CUBERT / One cubic centimetre. Deep. |
| cyl | Cylinda, a drinks can: diva | silver can, lime FIZZ label, ring pull as a hair bow, lashes; `peel` lays the label flat (2πr wide) | CYLINDA / Drinks can. Diva. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `avBlock` (the HDB block, RENOVATION banner on #05-17, skip of rubble; `g.unit` zoom target), `avFlat`
(the living room mid-renovation: doorway with gate on the left, window right, hanging bulb, stepladder, Dad's
swatches "FEATURE WALL?", plywood workbench across the front; layers `g.hall` / `g.gate` / `g.mid` / `g.front` /
`g.top`; `g.counterY` 530; `g.door` [150, 430]; `g.open(p)`), `avBalcony` (laundry pole, blocks opposite, parapet
`g.wallY` 520, divider with `g.tanSpot` [1100, 440] for Mr Tan), `avConf` (talking heads).
Props: `avBlueprint(w, h)` (working sheet, white ink), `avToolbox` (`set(open)`, `g.inside`), `avTape`,
`avUnitDrop(base, sup)` (the twins' gag), `avIso(heights)` (isometric cube stacks), `avNet(cells)`,
`avFishTank` (`set(level)`, `upd(t)`, Mr Bubbles), `avTiles` (a pallet of tiles), `AV_COL` (area cyan, volume
orange, height red). Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkGrid`, `mkAngleMark`, `mkBrace`,
`mkCuboid`, `mkPrism`, `mkCylinder`, `mkChip`, `mkSpeechBubble`, `mkStamp`, `mkDash`/`mkDraw`. Lib: `arrow`,
`chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `avBlock`, slow push towards the renovating window on the fifth floor (dust puffing out); Kavya bust in the
  foreground left looking up at it; chips "Kavya, age 12", "Blk 417", "renovation: day 0"; lower third KAVYA, 12.
- mum: cut to `avFlat`; Mum behind the workbench waving a party invitation card "HOUSEWARMING! 40 guests"; chip
  "3 weeks". Kavya (front left, customer-side) happy then deadpan.
- floor: Kavya deadpan to camera; the cement floor; chip "no floor".
- bala: Uncle Bala rises behind the bench (lower third UNCLE BALA), happy, tape measure out; on "Ow" the tape snaps
  back onto his finger (`snap`), `shock`.
- dad: Dad pops up beside him with his own tape (lower third DAD), smug; chip "biggest number ★".
- tiny: documentary zoom into Uncle Bala's toolbox: the lid opens, past the hammer, to a set square tucked inside
  (viewfinder corners, "ZOOM ×" readout).
- hi (TH): Madam Perpendicular's confessional; lower third MADAM PERPENDICULAR; plaque "SET SQUARE: one right angle
  · 90°" with a right-angle mark; she does her `check` on "90°".
- height: board: a triangle with its base, the dashed perpendicular height with a right-angle mark labelled
  "height ✓"; then a sloping side highlighted red with "not a height ✗". She points the stick at it.
- diag: back to the flat: Dad stretches his tape corner to corner across the wall (a long diagonal), smug; a
  "longer!" chip.
- charge: Madam Perpendicular on the workbench, Dad, Kavya, Uncle Bala behind; chips "3 weeks", "1 flat",
  "1 man who measures diagonally" on the beats.
- title: title card (a big cardboard-box logo); "THINK INSIDE THE BOX" and "Episode 15: The Great Renovation";
  the cast pops in: Uncle Bala, Kavya, Madam Perpendicular (`check`), Dad, Mum. Hold.

## 1 rooms: Who gets the room? (Perimeter & area of rectangles and triangles)
Layout: `avFlat`. A blueprint (`avBlueprint`, about 640 × 420, right half) shows the two rooms as plans TO SCALE
(1 m = 40 px): the corridor 9 m × 1 m and the store room 4 m × 4 m, with unit squares. Ah Boy and Kavya behind
the bench at left; Madam Perpendicular on the bench. Second half: Dad's triangular door sign on the blueprint,
drawn to scale (1 cm = 22 px: base 16, slopes 10, height 6). Showpiece: the triangle boxed in its 16 × 6
rectangle; the dashed height splits it into two rectangles, each halved by a sloping side, the halves shaded
in matching colours.
- day: chip "Day 1"; the two plans fade in, labelled "corridor" and "store room".
- boy: Ah Boy (lower third AH BOY) traces round the corridor: a dot runs round its edge, counter "20 m"; the store
  room's edge "16 m".
- perim: Kavya: "perimeter = distance round the edge (a length, m)"; then the store room fills with unit squares,
  label "area = floor covered".
- rect: Madam P (lower third MADAM PERPENDICULAR): `A = l * w`; corridor fills with 9 unit squares: `9 * 1 = 9`.
- nine: Ah Boy happy: "9 m" written under the corridor (bare unit).
- sq: `avUnitDrop('9 m', '²')`: the ² slams onto the m; Squared (lower third SQUARED) bounces beside it, waving.
- mine: the store room's 16 squares: `4 * 4 = 16 m²`; comparison table: corridor P 20 m, A 9 m²; store room P 16 m,
  A 16 m² (bigger area highlighted).
- posters: Ah Boy happy, posters appear on the corridor's long walls; Kavya deadpan. Hold.
- sign: chip "10 a.m."; the triangle sign "AH BOY'S ROOM" drawn: base `16 cm`, sloping sides `10 cm`.
- dad: Dad smug: `A = 1/2 * b * h` with `h = 10?` (a sloping side highlighted); "biggest number ★" chip.
- no: Madam P annoyed, `check`: the dashed height from the apex to the base with a right-angle mark, `6 cm`; the
  10 cm side crossed in red as a height; star falls off Dad's chip.
- half: the 16 × 6 rectangle appears around the triangle; the height splits it; the four halves shade in pairs.
- calc: `A = 1/2 * 16 * 6 = 48 cm²`; "half of `16 * 6 = 96`".
- ribbon: Ah Boy: the edge traces in ribbon colour: `16 + 10 + 10 = 36 cm`.
- rule: chips "sloping sides: perimeter ✓ area ✗"; a small obtuse triangle with the base extended (dashed) and the
  height standing OUTSIDE, with a right-angle mark.
- priya: Priya (lower third PRIYA) holds up her sign: `A = 42 cm²`, base `12 cm`, `h = ?`.
- h: `mkWorking`: `42 = 1/2 * 12 * h`, `42 = 6h`, `h = 42 ÷ 6 = 7 cm` (ring the answer).

## 2 balcony: Cut, slide, double (Parallelograms & trapezia)
Layout: `avBalcony`. Mum and Dad behind the parapet left; a big white card (`MK.paper`) on the right for the
shapes, to scale (1 cm = 34 px for the tile). Mr Tan appears over the divider at `g.tanSpot`. Second half: the
community-garden flower bed (1 m = 50 px). Showpiece: the triangle cut off the parallelogram slides across to make
the 9 × 4 rectangle; then two trapezia (one rotated 180°) fit together into a parallelogram.
- day: chip "Day 3"; a stack of parallelogram tiles on the parapet.
- tile: the tile drawn big: base `9 cm`, sloping side `5 cm`, dashed height `4 cm` with a right-angle mark.
- dad: Dad smug: `9 * 5 = 45 cm²?` with the 5 cm side highlighted; "biggest number ★".
- cut: Madam P (`check`): a red cut line along the height; the triangle lifts off.
- rect: the triangle slides to the right end; the rectangle 9 × 4 outlined: `A = b * h = 9 * 4 = 36 cm²`.
- longer: the 5 cm slope and the 4 cm height side by side as bars: slope longer; "45 too big" crossed.
- big: Dad deadpan; star falls off. Hold.
- bed: the trapezium bed: parallel sides `3 m` (top) and `7 m` (bottom), height `4 m` dashed; flowers in it.
- para: a copy of the bed appears, rotates 180° and slides to fit against it; the combined parallelogram: base `3 + 7 = 10 m`, height `4 m`: `10 * 4 = 40 m²`; one half shaded:
  `40 ÷ 2 = 20 m²`.
- formula: `A = 1/2 (a + b) h` big, a and b coloured on the shape.
- pair: Ah Boy's mnemonic as three chips: "**Add** the parallel pair" → "**halve** it" → "**times** the height".
- tan: Mr Tan pops up over the divider (lower third MR TAN) with his mug; a scroll "九章算术 · dustpan field"
  (or just "The Nine Chapters, China, about 2000 years ago") with a dustpan-shaped trapezium.
- lim: Mum: `A = 52 m²`, parallel sides `5 m` and `8 m`, `h = ?`.
- back: `mkWorking`: `52 = 1/2 * 13 * h`, `52 = 6.5h`, `h = 52 ÷ 6.5 = 8 m` (ring).
- pun: Mr Tan happy; two parallel lines drawn, never meeting; *cricket*. Hold.

## 3 living: Uncle Bala's quote (Compound shapes)
Layout: `avFlat`; a big blueprint of the L-shaped living room (1 m = 50 px: 450 × 350), the 4 × 2 cupboard
corner at the top right hatched "cupboard". Uncle Bala and Dad behind the bench; Priya and Kavya at the right.
Showpiece: the two inner edges of the cut-out slide outwards and the boundary becomes the full 9 × 7 rectangle.
- day: chip "Day 5"; Uncle Bala measuring with his tape.
- room: the L-shape draws: `9 m` bottom, `7 m` left, the missing corner `4 m` by `2 m` (dashed outline); chip
  "flooring: $ per m²".
- big: Kavya: the full rectangle `9 * 7 = 63`, the corner `4 * 2 = 8` lifts out: `63 - 8 = 55 m²`.
- split: Priya: two "?" labels on the top edge and the right side.
- sides: arrows along the edges: top `9 - 4 = 5 m`, right `7 - 2 = 5 m`.
- add: a dashed split line across at 5 m up: top strip `5 * 2 = 10`, bottom `9 * 5 = 45`, `10 + 45 = 55 m²` ✓.
- skirt: a skirting-board strip appears along the walls.
- less: Dad smug: "< 32 m?" bubble; star chip.
- walk: a dot walks round the edge (never along the dashed split line, which flashes red: "inside"), each side lighting up: `7 + 9 + 5 + 4 + 2 + 5 = 32 m`.
- push: the inner 4 m edge slides up to the top, the 2 m edge slides right: the full rectangle; `2 * (9 + 7) = 32 m`.
- notch: Ah Boy (lift) with a 10 × 6 card (to scale) with a 4 × 3 notch cut from the middle of the top.
- more: `60 - 12 = 48 cm²`; the two inner walls glow: `32 + 3 + 3 = 38 cm`; "more edge!".
- phone: Dad on the phone, smug; Squared appears on his shoulder, `shock`; chip "55 ... m² or m³?". Hold.

## 4 boxes: Counting corners (3D shapes, nets & Euler's formula)
Layout: `avFlat` full of moving boxes; Carton stands on the bench; Ah Boy and Kavya behind it; a blueprint on the
right with a V, F, E table (`mkTable`: shape, V, F, E, V + F − E). Polly bounces in from the left. Mr Tan at the
gate. Showpiece: the table filling row by row, the last column all 2s; Carton unfolding into his net.
- day: chip "Day 8"; boxes stacked; Ah Boy counting on his fingers.
- count: Carton's corners dot red one by one (8), faces tint (6), edges glow (12).
- carton: Carton (lower third CARTON) sweats.
- words: labels with arrows on Carton: "vertex", "face", "edge".
- more: a triangular prism (`mkPrism`, the tent box, cross-section shaded) and a square-based pyramid (the lantern, "apex") appear; table rows: cube 8, 6, 12; triangular prism 6, 5, 9; square-based pyramid 5, 5, 8.
- polly: Polly bursts in (lower third POLLY): row "icosahedron 12, ?, 30".
- tan: Mr Tan at the gate (lower third if not yet shown), mug: column header `V + F - E`.
- two: the column fills: `8 + 6 - 12 = 2`, `6 + 5 - 9 = 2`, `5 + 5 - 8 = 2`.
- euler: `V + F - E = 2` big, "flat faces, no holes".
- faces: `12 + F - 30 = 2`, `F - 18 = 2`, `F = 20` (ring); Polly's row completes.
- twenty: Polly spins happily.
- beat: Ah Boy's mnemonic, F V E big letters: "Faces and Vertices beat Edges by two".
- pencil: a hexagonal pencil (prism) with `n = 6`: `F = n + 2 = 8`, `V = 2n = 12`, `E = 3n = 18`; `12 + 8 - 18 = 2`.
- pun: Mr Tan happy, *cricket*, deadpan faces. Hold.
- unfold: Carton sweats and unfolds (`flat: 1`) into his net.
- net: labels "net: every face once"; a straight row of 4 squares with alternate pairs linked "opposite".
- block: Ah Boy's net with a 2 × 2 block (`avNet`), shown folding: two faces collide (red flash).
- ow: Carton, flat, deadpan; red cross on Ah Boy's net; chip "a cube has 11 nets". Hold.

## 5 views: Three ways to see a cabinet (Plans & elevations)
Layout: `avFlat`; Uncle Bala holds a blueprint with the shoe cabinet; three views drawn on squared paper
(1 cm on paper = 30 px) beside a small 3D cabinet. Then Ah Boy's cube model (`avIso`) with its plan (stack
heights) and front elevation. Showpiece: the three views appearing beside the 3D cabinet with arrows
"from above", "from the front", "from the side".
- day: chip "Day 10"; the cabinet in 3D on the blueprint.
- three: arrows and eye icons: plan ↓ (above), front →, side →.
- size: dimensions on the 3D cabinet: `100 cm`, `50 cm`, `75 cm`; chip "scale 1 cm : 25 cm".
- draw: three rectangles drawn true to scale: plan 4 × 2, front 4 × 3, side 2 × 3 (labelled in cm).
- dad: Dad's "front elevation" in 3D perspective with shading; star chip.
- flat: Madam P annoyed: red cross on Dad's; the flat front elevation beside it with a tick.
- cubes: Ah Boy's model built from 10 cubes (`avIso([[3,1,2],[2,1,1]])`, back row first).
- count: the plan grid with stack heights (back row 3, 1, 2; front row 2, 1, 1); `3 + 1 + 2 + 2 + 1 + 1 = 10`.
- front: the front elevation: columns of heights 3, 1, 2.
- line: lines across the left column 2 up and the right column 1 up, where the depth changes.
- tan: Mr Tan at the gate; isometric dot paper with a cube: vertical edges vertical, the others at `30°`
  (`mkAngleMark`).
- pun: Mr Tan turns sideways, happy; *cricket*. Hold.
- fridge: Uncle Bala sticks Dad's 3D drawing on the fridge with a magnet; Dad smug. Hold.

## 6 wrap: Forty prizes (Surface area)
Layout: `avFlat`, party prizes piled on the bench; Kavya, Priya, Mum, Ah Boy behind it; Carton on the bench, who
unfolds into his net (6 × 4 × 3, `g.net` to label each face). A blueprint on the right for working. Showpiece:
Carton's net with each face's area written on it, pairs colour-matched, then the prism's three rectangles
sliding into one strip as wide as the triangle's perimeter.
- day: chip "Day 14"; a "LUCKY DRAW" banner, a pile of boxes.
- go: Mum claps; a timer chip starts.
- sa: Carton unfolds (`flat: 1`), label "surface area = total area of all faces".
- faces: on the net: top `6 * 4 = 24`, front `6 * 3 = 18`, end `4 * 3 = 12`.
- boy: Ah Boy proudly holds a box wrapped on only three faces: "54 cm²".
- bottom: Carton blushes; the unwrapped bottom shows. Hold.
- pairs: the matching faces of the net glow in pairs; `SA = 2(lw + lh + wh) = 2 * 54 = 108 cm²`.
- choc: Priya's chocolate box, a triangular prism `10 cm` long with a 3-4-5 right triangle end (`mkPrism`).
- prism: its net: two triangles `2 * 1/2 * 3 * 4 = 12`, rectangles `30 + 40 + 50 = 120`, `12 + 120 = 132 cm²`.
- strip: the three rectangles slide into one strip: width `3 + 4 + 5 = 12`, `12 * 10 = 120`.
- pyr: Mum's pyramid box: base `6 cm`, slant height `5 cm` (up the middle of a face), vertical height `4 cm`
  (dashed, inside).
- easy: Priya smug: "h = 4!".
- slant: Madam P: the 4 cm height flashes "inside"; the slant height on the face glows.
- total: net of the pyramid: square `6 * 6 = 36`, four triangles `1/2 * 6 * 5 = 15` each, `36 + 60 = 96 cm²`.
- sugar: 8 sugar cubes: a 2 × 2 × 2 cube (`avIso`) `24 cm²` and a 1 × 1 × 8 tower `34 cm²`; both "V = 8 cm³".
- score: Priya smug, tally "Priya 21, Kavya 19". Hold.

## 7 tank: Mr Bubbles moves house (Volume of cuboids & prisms; cylinders, stretch)
Layout: `avFlat`; the fish tank (`avFishTank`, 50 × 40 cm drawn at 6 px per cm) on the bench, Mr Bubbles in a bag;
Cubert hops on the bench. Then the party: Cylinda on the bench.
Showpiece: the tank filling layer by layer of cubes to 32 cm, then ÷ 1000 into 48 one-litre cubes.
- day: chip "Day 18"; the empty tank.
- cubert: Cubert (lower third CUBERT): "1 cm³ = 1 ml".
- tank: tank dimensions: `50 cm`, `30 cm`, water depth `32 cm` (dashed line at 32 of 40).
- calc: the water fills; `V = l * w * h = 50 * 30 * 32 = 48,000`.
- boy: "48,000 cm²" written (bare) by Ah Boy.
- cu: `avUnitDrop`: the ² is knocked off by Cubed (lower third CUBED), who lands as ³: `48,000 cm³`.
- litre: a 10 cm cube labelled "1 litre = 1000 cm³"; `48,000 ÷ 1000 = 48 litres`; Mr Bubbles is released into the tank, Ah Boy happy.
- wedge: a 5 × 4 × 3 box of cubes (`avIso`, 60 cubes) sliced corner to corner; each wedge "30".
- prism: `V = area of cross-section * length`; `1/2 * 5 * 4 = 10`, `10 * 3 = 30 cm³`.
- dad: Dad smug: `1 m² = 100 cm²?` with a 1 m square.
- sq: Squared: the 1 m square fills with a 100 × 100 grid: `100 * 100 = 10,000 cm²`; chip "square it for area".
- cu2: Cubed: a 1 m cube: `100 * 100 * 100 = 1,000,000 cm³`; chip "cube it for volume".
- cyl: chip "Day 20: party"; Cylinda (lower third CYLINDA) on the bench: `V = pi r^2 h`, height `12 cm`.
- seven: Dad: the diameter `7 cm` across the top, "r = 7 ★".
- radius: the radius `3.5 cm` (half); chip "diameter → 4 times too big".
- ml: `V = pi * 3.5^2 * 12 = 147pi ~= 462 cm³` → `462 ml`.
- label: Cylinda peels her label (`peel: 1`): a rectangle `2 pi r` wide and `h` tall; "curved surface = 2πrh";
  Cylinda shock. Hold.

## 8 traps: The crew saves you some marks
- intro: "6 EXAM TRAPS" over the flat.
- t1 (TH, Squared): card "area: `cm²`"; t1b (TH, Cubed): card "volume: `cm³`".
- t2 (TH, Madam P): card "`A = 1/2 b h`, `A = 1/2 (a + b) h`: the ½!", `check`.
- t3 (TH, Uncle Bala): card "perimeter: every edge, never the dashed line"; his tape bites him.
- t4 (TH, Carton): card "cuboid: 6 faces: `2(lw + lh + wh)`".
- t5 (TH, Cubert): card "`2 m = 200 cm` first, then multiply".
- t6 (TH, Dad): card "elevation: flat, true size", his 3D drawing as a fridge magnet.
- return: the logo "THINK INSIDE THE BOX will return".
- lorry: the void deck of Blk 417, morning; a big truck backs in; chip "Day 21".
- deliver: Uncle Bala with the delivery note "55 m³ FLOOR TILES"; the truck tips: a mountain of tile pallets
  (`avTiles`) fills the void deck.
- who: Mum, arms up, shock.
- bigger: Dad smug-sad, "biggest number ★". Hold.
- cannot: chip "`55 m³` of 1 cm tiles = floors for 100 living rooms"; Uncle Bala, deadpan, tape snaps; Squared and Cubed hiding behind each other on the tile mountain.
  Final frame holds.

## Suggested split for the animators
- Writer: cold (done).
- A: rooms, balcony, traps (about 3.9 min).
- B: living, boxes, views (about 3.8 min).
- C: wrap, tank (about 3.0 min; both dense with props).
