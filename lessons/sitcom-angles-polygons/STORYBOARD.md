# ALL THE RIGHT ANGLES, Ep 13 "The Great Kitchen Reno": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Angles, Parallel Lines &
Polygons. Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every angle exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Mum's new kitchen floor tiles (octagons and squares) arrive at the family's HDB flat in Block
208. The contractor wants $2000, so Dad announces that the family will retile the kitchen themselves this
weekend: "I watched a video." (Half a video, at double speed.) Living in the corner of the kitchen, where the
two walls meet, is **Rex**: a right angle, exactly 90° since 1987, the flat's self-appointed inspector, who
approves nothing without a reason (his stamps: APPROVED / REJECTED). Over one weekend Ah Boy opens the tile
boxes with the scissors (angle facts), Dad's chalk lines turn out to be **Para and Lel**, parallel lines
married for forty years who have never met, until **Trevor** the transversal barges across them; Mr Tan comes
down from upstairs about the drilling and proves the triangle angle sum on Dad's shelf brackets; Ah Boy's
cardboard kite **Kitty** explains the quadrilateral family; **Roomby** the robot vacuum turns through exterior
angles; **Bea** the bee from the honey jar tessellates the new tiles; and on Sunday Priya's twenty measured
triangles meet a proof. Stinger: the last corner of the kitchen is 91°. Rex has to lie down (180°).

Guide sections (lib/topics/angles-polygons/guide.ts) by scene: angle-facts → `facts`; parallel-lines →
`parallel`; triangles → `shelf`; quadrilaterals → `kite`; polygon-angles → `roomby`;
regular-polygon-symmetry (with tessellation) → `tiles`; angle-proofs (stretch) → `proof` (plus the triangle
proof in `shelf`). Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'rex'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rex, para, lel, trev, kitty, roomby, bea.
  Para and Lel are ONE character (`cast(root, 'parlel')`) with two faces: Para talks with
  `talk: scTalk(S, t, 'para')`, Lel with `talkB: scTalk(S, t, 'lel')` (and `mood`/`moodB`, `look`/`lookB`).
- **Humans are the heart.** They speak 63% of the lines and are on screen in every scene. The cartoon
  cast are guests in the family's kitchen. In front views the humans stand BEHIND the kitchen island
  (`agKitchen`: characters in your own layer under `g.front`, or in `g.mid`), so their shirt hems are hidden;
  cartoons stand ON the island (in a layer after `g.front`). In floor-plan shots (`agFloor`) the humans
  appear as busts along the bottom edge or the right edge of the frame, looking down at the floor.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Rex is `deadpan`, `annoyed` at every reason-less answer, `smug` when he approves, and twitches
  (`twitch: 1`) whenever anyone says "about ninety" or reaches for a protractor. Dad is `smug` right before
  every "I watched a video" mistake, then `sad`. Priya is `smug`, then `annoyed`. Ah Boy is `happy` even
  when wrong and is the only one who laughs at Mr Tan's puns. Para and Lel are calm, sweet, old (`neutral`,
  `happy`), `shock` at any suggestion that they might meet. Trevor is `happy`, hyper. Kitty is `smug`.
  Roomby is `deadpan` (beeps: `beep: 1`). Bea is `happy`, buzzing.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never
  fill a pause with new information.
- **Running gags:**
  1. **Rex's stamps** `agStamp(parent, ok)`: "REJECTED" (red) thumps on every wrong or reason-less answer:
     cold.inspect (the demonstration), facts.put (Dad's protractor on a not-to-scale diagram), parallel.c180 (Dad's
     "co-interior are equal"), kite.rect (Priya's "squares aren't rectangles"), roomby.rej (Dad's
     6 × 180). "APPROVED" (green) on answer-plus-reason: facts.ok,
     parallel.128, shelf.every, proof.approved. Scale ~0.45-0.55.
  2. **"I watched a video."** Dad, before every mistake (cold.video, parallel.co, shelf.bracket, roomby.hex,
     proof.claim, traps.ninety1). Each time a tiny phone (`agPhone`) flashes by him with the "2×" badge.
  3. **Dad's protractor** (his hand prop): he raises it at every angle; Rex twitches; "Put. The
     protractor. Down."; traps.t2 "Ask me how I know."
  4. **Para and Lel never meet.** Whenever anything suggests they might (Trevor joining them, Mr Tan's pun),
     they `shock`, and lean APART. "Little Lel" (shelf.baby): a third, small parallel line appears between
     them, with a dummy.
  5. **Mr Tan's puns** land to silence; only Ah Boy laughs (shelf.cute, tiles.laugh). Roomby drives
     silently across the bottom of the frame in the pause.
  6. **Ah Boy's scissors** (cold) become a broom; the broom stays in his hand all weekend.
- **Talking heads** (TH below) use `agConf(root, who)`, the character big (s ≈ 1.3) at about (330, 400),
  REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show `agLowerThird(root, who)`
  for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever an angle, equation or step is said, it appears big and clear in the caption's
  exact words: `mkMath` for every expression (`x = 180° − 52° − 73° = 55°`, `(n − 2) × 180°`), `mkWorking`
  for multi-step working (equals signs lined up), angle diagrams drawn with real lines and `mkAngleMark` /
  `mkCorner` (arcs, labels, the little square for 90°), parallel lines with arrow marks, `mkPolygon` for regular
  polygons (`interior`, `exterior` options), `mkTriangle`, equal-side ticks. Reasons are written in words
  under the working, in a contrasting colour ("angles on a straight line add to 180°"). Diagrams are geometrically
  TRUE (draw 115° as 115°), but the working never relies on measuring. The jokes can be silly; the maths exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. About 1,000 elements per scene at most; build every human once per scene and hide
  with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`agLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Reluctant tiler. |
| mum | Mum: chose the tiles; brisk, quietly brilliant at geometry | magenta kurta, bun, bindi; prop tablet (tile catalogue) | MUM / Chose the tiles. |
| dad | Dad: DIY confidence, "I watched a video" | glasses, moustache, green polo; prop protractor (`g.tools.protractor`) | DAD / "I watched a video." |
| boy | Ah Boy, 8: asks the obvious question; laughs at puns | orange star tee; scissors, then a broom (`g.tools.scissors`, `g.tools.broom`, `g.tools.scissorsX.set(deg)`) | AH BOY, 8 / Kavya's brother. Has scissors. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; prop pencil | PRIYA / Best friend. Watched two videos. |
| tan | Mr Tan: upstairs neighbour, maths teacher, puns | shirt and tie, glasses; prop marker | MR TAN / Maths teacher. Lives upstairs. |
| rex | Rex, the RIGHT ANGLE: stiff, exacting inspector | chunky grey-blue "L", his head the yellow right-angle square, yellow hard hat; `open` (deg), `twitch`; `g.vertex` | REX / Right angle. Exactly 90°. Inspector. |
| parlel | Para (top) and Lel (bottom), PARALLEL LINES, married 40 years, never met | two long chalk-white lines with red ">" marks, heads at the left ends; Para cap + moustache, Lel bun + pearls; `g.gap` 120, `g.len` 420 | PARA & LEL / Parallel lines. Married 40 years. |
| trev | Trevor, the TRANSVERSAL: hyper, crosses lines | long orange line, spiky-haired head at the top end; `o.ang` (default 65), `g.ends` | TREVOR / Transversal. Crosses lines. |
| kitty | Kitty, Ah Boy's cardboard KITE: glamorous, "darling" | red/yellow kite, spars (diagonals) crossing at 90° with a little square, lashes, swaying tail with bows | KITTY / A kite. A quadrilateral, darling. |
| roomby | Roomby, ROBOT VACUUM: deadpan, beeps | grey disc, dark face panel with blue eyes, spinning side brush; `spin`, `beep`. Top view prop `agRoombyTop` | ROOMBY / Robot vacuum. Turns at corners. |
| bea | Bea, a BEE from the honey jar: bubbly | round yellow and black bee, flapping wings, hexagon badge; `buzz` | BEA / A bee. Lives on the honey jar. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `agKitchen` (front view: wall tiles, window grille of parallel bars, cabinets, kettle, clock
`g.clock(h)`, honey jar shelf `g.honey`, fridge; the island `g.front`, `g.top`, `g.counterY` 530),
`agFloor(parent, { pattern: 'old' | 'bare' | 'new' })` (the floor from above, walls on the left and bottom
meeting at Rex's corner `g.corner`; `g.lay(p)` lays the new octagon-and-square tiles), `agTitleBg`,
`agConf` (talking heads).
Props: `agStamp`, `agScissors` (`set(deg)`: the X), `agProtractorProp`, `agBroom`, `agTileBox`,
`agTileSample`, `agHoney`, `agFootball`, `agRoombyTop`, `agPhone` (`set(p)`, `.speed`). Math kit: `mkMath`,
`mkText`, `mkWorking`, `mkAngleMark`, `mkCorner`, `mkPolygon`, `mkTriangle`, `mkChip`, `mkSpeechBubble`,
`mkWhiteboard`, `mkProtractor`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `agKitchen`, slow push; Kavya alone behind the island, left; chips "Kavya, age 12", "Saturday,
  8 a.m.", "the kitchen, Blk 208"; lower third KAVYA, 12. The clock reads 8:00.
- tiles: Mum rises behind the island (tablet raised), two tile boxes on the island; a big octagon-and-square
  sample tile pops; chip "contractor: $2000"; lower third MUM.
- video: Dad rises, smug, protractor raised; chip "I watched a video."; lower third DAD. Mum shock.
- half: a phone pops between Kavya and Mum: "DIY TILING, Part 1 of 2", progress bar at half, a pulsing "2×"
  badge; chip "half a video, at 2×".
- important: slow push on Dad, smug; everyone else deadpan. Hold.
- boy: Ah Boy pops up on the right, scissors snipping; lower third AH BOY, 8. Everyone shock.
- sweep: the scissors become a broom; Ah Boy sad; Mum smug. Hold.
- corner: cut to the floor plan from above (worn old tiles, walls on the left and bottom), viewfinder
  corners, "VIEW: FROM ABOVE", "ZOOM ×1" rising to ×4.2 as the camera dives into the bottom-left corner where
  the walls meet; a little yellow square blinks in the corner.
- hi (TH): Rex's confessional; lower third REX; plaque "RIGHT ANGLE / 90° / in this corner since 1987".
- ninety: three rows pop: a slightly-closed angle "89°" ✗, a slightly-open "91°" ✗, a right angle with its
  little square "90°" ✓ (pulsing). Rex twitches on "eighty-nine", smug on "thank you".
- about: the kitchen; Rex standing on the island; Dad holds his protractor up to him, smug; Kavya deadpan; chip
  "about 90°?".
- down: Rex shock, twitching; a giant shaking "ABOUT?!"; Dad shock, lowers the protractor.
- inspect: Rex hops up centre stage; Kavya, Mum, Dad and Ah Boy (with broom) behind; chips "INSPECTION: all
  weekend", "no reason = no approval"; the REJECTED stamp thumps on "no approval".
- title: teal title card with rays and faint octagon tiles; logo "ALL THE / RIGHT ANGLES" framed by two
  right-angle brackets with little squares; "Episode 13: The Great Kitchen Reno"; the cast pops in: Mum,
  Kavya, Rex, Dad, Ah Boy. Hold.

## 1 facts: Ah Boy finds the scissors (Angle facts)
Layout: `agKitchen` (clock 8:15); tile boxes on the island; humans behind the island; Rex stands on the island
at the left. The right half (x 600-1150) holds a whiteboard-like card (`mkWhiteboard` or a white card) where
the diagrams and working build. Showpiece: the giant scissors (`agScissors`, about 2.5× scale) open into an X
with all four angles labelled 38°, 142°, 38°, 142° and the "360°" ring around the pivot.
- time: chip "8:15"; Ah Boy (broom left by the fridge) proudly holding the scissors up; Mum deadpan.
- snip: the giant scissors on the card snip: a small opening labelled **acute** ("< 90°"), exactly 90° **right**
  (with the little square; Rex smug), a wider one **obtuse** ("between 90° and 180°"), then an angle drawn round the back, **reflex** ("> 180°", the reflex
  arc drawn the long way round). Ah Boy happy, snipping.
- cuts: Dad holds a square tile; two cut lines from one point on its straight bottom edge; the card shows the
  diagram: a straight line with three adjacent angles 52°, x, 73° (true sizes). Dad raises the protractor.
- put: Rex twitch → annoyed; the protractor gets a red cross; chip "not drawn to scale". Dad lowers it.
- x: working `x = 180° − 52° − 73° = 55°`; reason in words below: "angles on a straight line add to 180°".
  The x on the diagram becomes 55°.
- ok: stamp APPROVED (small, green) on the working. Rex smug. Hold.
- open: back to the giant scissors on the card: an X; the right-hand angle marked 38°.
- next: the top angle fills: `180° − 38° = 142°`, reason "angles on a straight line".
- vop: the left angle lights 38° (same colour as the first: matching pair); the bottom 142°; label
  **vertically opposite angles are equal**; the two 38° wedges flash, touching only at the pivot.
- tips: cut to the island: Ah Boy and Kavya side by side, leaning apart; Ah Boy happy, Kavya deadpan. Hold.
- point: the four wedges spin into a full circle: `38° + 142° + 38° + 142° = 360°`; label **angles around a
  point add to 360°**.
- alg: Dad (smug) holds the scissors; the card: an X with opposite angles labelled `(3x + 10)°` and
  `(5x − 30)°`; chip "Unsolvable!" with Dad's sweat.
- eq: `mkWorking`: `3x + 10 = 5x − 30`, `40 = 2x`, `x = 20`; reason "vertically opposite angles are equal".
- ans: Rex rings the line: `3 × 20 + 10 = 70°`, and the other pair `180° − 70° = 110°`; the X relabels
  70°, 110°, 70°, 110°. Chip "find the ANGLE, not just x". Rex smug; hold.

## 2 parallel: Para and Lel never meet (Angles in parallel lines)
Layout: first the floor plan (`agFloor`, pattern 'bare') with two chalk lines across it, which ARE Para and Lel
(`cast(..., 'parlel')`, big, s ≈ 1.6, across the middle); Kavya, Priya and Dad as busts at the bottom edge
looking down; Rex on the right. Trevor slides in diagonally across both. Then the angle diagram builds big
over the floor. Showpiece: the crossing at Para "slides" down Trevor and lands exactly on the crossing at
Lel: copy, paste (all eight angles in two colours: four 115°, four 65°).
- ten: chip "10 a.m."; the bare floor; Dad snaps two chalk lines (a quick dust puff along each).
- hi: the chalk lines open their eyes: Para and Lel (lower third PARA & LEL); red ">" arrow marks pulse on both.
- never: Lel; chips "40 years", "never met"; Para and Lel smile at each other across the gap. Hold.
- trev: Trevor zooms in diagonally across both lines (lower third TREVOR); Para and Lel `shock`, lean apart.
  Priya appears (lower third PRIYA) at the bottom edge, smug.
- 115: at Trevor-Para, four angle marks; one labelled 115°. Then the four marks slide down Trevor ("copy,
  paste!" chip) and land at Trevor-Lel with the same labels: "same angle".
- two: all eight labelled: four 115° (orange), four 65° (blue): `180° − 115° = 65°`.
- corr: highlight a matching pair in the same position; a big **F** traced over the lines (yellow);
  label "corresponding angles are equal".
- alt: highlight an alternate pair (between the lines, opposite sides); a big **Z** traced; "alternate angles
  are equal".
- co: Dad (smug) highlights the co-interior pair: 115° and 65° "equal?".
- c180: stamp REJECTED; the **C** traced; `115° + 65° = 180°`; "co-interior angles add to 180°".
- mnem: Ah Boy; chip with the mnemonic: "**F** and **Z** are equal; **C** Completes 180".
- 128: Priya: a new diagram: co-interior pair 128° and p; Priya's working `p = 180° − 128° = 52°`, reason in words
  "co-interior angles add to 180°"; stamp APPROVED (Rex grudging).
## 3 shelf: Mr Tan hears the drill (Angles in triangles)
Layout: `agKitchen`, noon (clock 12:00), a drilled wall; Dad behind the island with a shelf and two
triangular brackets (`mkTriangle`, wooden). Mr Tan comes in at the right (marker). The triangle diagrams build
big on a white card at the right. Para and Lel float in for the proof. Showpiece: the proof: a triangle
with a, b, c; Lel lies along the base and Para along the parallel through the top corner; the base angles a
and b slide up into the top corner as alternate angles and fill a straight line with c.
- noon: chip "12 noon"; the drill buzzes (shake lines); a ceiling "thud thud" from upstairs.
- tan: Mr Tan at the door (lower third MR TAN), deadpan.
- bracket: Dad holds a triangular bracket, smug; the phone with "2×" flashes past; chip "angles add to 180°".
- why: Ah Boy; three triangles appear: equilateral, a long thin one, an obtuse one, each with "?".
- draw: Mr Tan draws a triangle a, b, c on the card; "parallel to the base" dashed line appears through the top.
- honour: Para and Lel slide in to BE the base and the dashed line, with arrow marks.
- baby: Lel: a tiny third parallel line with a dummy pops up between them ("Little Lel"); everyone deadpan. Hold.
- proof: the a and b wedges glide up to the top corner (alternate angles), sitting either side of c; the three
  wedges form a straight angle: arc "180°".
- every: `a + b + c = 180°`, for EVERY triangle (the three triangles from `why` tick ✓ ✓ ✓); stamp APPROVED;
  an equilateral triangle "60°, 60°, 60°" pops beside it.
- forty: Mum holds a bracket: isosceles triangle with two tick marks on the equal sides, apex 40°, the two
  "base angles" labelled with equal arcs.
- 70: working `(180° − 40°) ÷ 2 = 70°`; check `40 + 70 + 70 = 180 ✓`.
- 50: Priya: an isosceles triangle with 50° as a base angle: 50°, 50°, 80° (her version).
- cases: a second triangle, 50° at the apex: `(180° − 50°) ÷ 2 = 65°` each; both triangles side by side,
  "Case 1", "Case 2"; chip "check BOTH cases".
- ext: the shelf extends past the bracket: a triangle with one side extended; exterior angle 117°; interior
  opposite angles x and 2x highlighted; the third angle plain.
- 39: `mkWorking`: `x + 2x = 117`, `3x = 117`, `x = 39`; angles 39°, 78°; `180° − 117° = 63°`; check
  `39 + 78 + 63 = 180 ✓`. Rule chip: "exterior angle = sum of the two interior opposite angles".
- pun: Mr Tan happy; everybody deadpan; Roomby drives silently across the bottom of the frame. Hold.
- cute: Ah Boy laughing, pointing at himself: chip "a cute → acute". Hold.

## 4 kite: Kitty the kite (Quadrilaterals)
Layout: `agKitchen`, 2 p.m.; Ah Boy's cardboard kite Kitty floats over the island, tail swaying; the humans
behind. The right card shows quadrilateral diagrams. Showpiece: the family tree of quadrilaterals building
(quadrilateral → trapezium, parallelogram, kite → rectangle, rhombus → square), each a small drawn shape, the
square at the bottom wearing a crown ("show-off").
- two: chip "2 p.m."; Ah Boy tapes the kite; chip "kite day: Marina Barrage".
- kitty: Kitty opens her eyes (lower third KITTY); two pairs of equal adjacent sides get tick marks (single,
  double); the spars glow with the little right-angle square.
- diag: a diagonal splits a quadrilateral into two triangles: `2 × 180° = 360°`.
- x: Kitty's angles labelled `2x`, `3x`, `3x`, `80°` on her own corners (3x's are the equal pair, at the sides).
- 35: `mkWorking`: `2x + 3x + 3x + 80 = 360`, `8x = 280`, `x = 35`; angles 70°, 105°, 105°, 80°; check 360 ✓.
- sq: Priya holds a square tile next to a long rectangle; chip "square ≠ rectangle?".
- rect: stamp REJECTED; rectangle definition: "four right angles" (four little squares); the square gets the
  four little squares too: "every square is a rectangle".
- tree: the family tree builds; Kitty smug, pointing her tail at the square: "show-off".
- para: Mum: a parallelogram with p and 180° − p marked; opposite angles equal; neighbours co-interior (C
  traced); chip "neighbours add to 180°".
- cut: Dad holds a wonky tile: quadrilateral with 85°, 110°, 72° and "?".
- 93: `85 + 110 + 72 = 267`, `360 − 267 = 93°`; the "?" becomes 93°.
- puzzle: Mr Tan: two diagonals crossing at 90°, each cut in half (ticks), different lengths.
- square: Priya smug; a square drawn round them... the diagonals don't fit (they would need to be equal): red
  cross.
- rhombus: a rhombus drawn round the diagonals: ✓; label "rhombus". Hold.

## 5 roomby: Roomby turns the corner (Angles in polygons)
Layout: the floor plan (`agFloor`, 'bare', tile dust) seen from above, with Roomby the top-view puck
(`agRoombyTop`) driving polygon paths and leaving a clean track; the character Roomby (front view) in a
corner inset for close-ups; the humans as busts along the bottom edge. Showpiece: the pentagon drive: at each
corner the heading arrow turns 72° (an exterior-angle wedge appears outside the corner), and the five wedges
then slide together round one point into a full 360° circle.
- four: chip "4 p.m."; dust clouds; Mum presses the button.
- hi: Roomby (front view, lower third ROOMBY) beeps (`beep`).
- pent: Ah Boy; a regular pentagon path appears dashed on the floor.
- full: Roomby drives the pentagon, turning at each corner; exterior wedges 72° appear; it finishes facing the
  start direction; the five wedges slide together: "360°, one full turn"; chip "any polygon".
- 72: `360° ÷ 5 = 72°` "exterior angle".
- 108: the interior angle at a corner `180° − 72° = 108°`; the straight line through interior + exterior.
- hex: Dad: a hexagon with six triangles drawn from the centre (wrong): `6 × 180°`; the phone with "2×".
- rej: stamp REJECTED; from ONE corner: 3 diagonals, 4 triangles numbered 1-4; `4 × 180° = 720°`.
- mnem: chip "Minus two, times one-eighty".
- rule: `(n − 2) × 180°`; a decagon from one corner: 8 triangles; `8 × 180° = 1440°`.
- 60: Priya: regular hexagon with "60°" written INSIDE a corner.
- ext: the 60° moves OUTSIDE (exterior wedge); inside: `180° − 60° = 120°`; chip "**EX**terior **EX**its first".
- back: Mr Tan: "interior 160°, n = ?".
- 18: `180° − 160° = 20°`, `n = 360 ÷ 20 = 18`; Roomby starts an 18-gon (tiny 20° turns).
- dizzy: Roomby spinning slowly, spiral eyes (`look` wobble), "Boop". Hold.

## 6 tiles: Bee-autiful (Symmetry of regular polygons and tessellation)
Layout: the floor plan, 'new': `g.lay(p)` lays the octagon-and-square tiles from Rex's corner as the scene
goes on; Mum, Kavya, Priya, Ah Boy as busts at the bottom/right edges; Bea flies over the floor. Showpiece:
the vertex check: one point where two octagons and a square meet, three angle wedges 135°, 135°, 90° spinning
into a full circle "360° ✓", then the pentagon fail (three 108° wedges and a red 36° gap).
- six: chip "6 p.m."; the first tiles go down at the corner.
- bea: Mum points at a meeting point of tiles; Bea buzzes out of the honey jar (lower third BEA); chips "no gaps", "no overlaps", "360° at every point".
- oct: zoom on a meeting point: exterior 45° → interior 135°; `135° + 135° + 90° = 360°` ✓.
- three: three mini tilings pop: hexagons `3 × 120°`, triangles `6 × 60°`, squares `4 × 90°`, each "= 360° ✓".
- ball: Ah Boy holds up his football (`agFootball`).
- 324: three pentagons round a point: `3 × 108° = 324°` with a red "36° gap"; a ghost fourth pentagon
  overlapping in red: `4 × 108° = 432°`.
- 348: the football's pentagon and two hexagons meet: `108° + 120° + 120° = 348°`; the flat pieces fold up
  into a curve.
- order: a regular hexagon with its 6 mirror lines (dashed: 3 corner-to-corner, 3 side-to-side), then it
  rotates through 60° steps, six clicks: "order 6".
- n: Rex: chip "**n sides, n lines, n turns**".
- oct8: an octagon tile with 8 mirror lines; rotates 45°: `360° ÷ 8 = 45°` = its exterior angle.
- pun: Mr Tan at the door; deadpan faces; Roomby drives across silently. Hold.
- laugh: Ah Boy laughing alone. Hold.

## 7 proof: Priya measures twenty triangles (Geometric reasoning & proof, stretch)
Layout: `agKitchen`, Sunday (clock 9:00), grout buckets; Priya behind the island with a stack of 20 triangle
drawings and a protractor; Mr Tan with a whiteboard (`mkWhiteboard`) on the right. Showpiece: the two-column
proof (Statement | Reason) building line by line, with the triangle a, b, c and exterior angle d beside it.
- sunday: chip "Sunday"; Priya surrounded by triangle sketches.
- twenty: tally "20 triangles ✓"; each sketch gets a quick tick; chip "Proved!".
- inf: Mr Tan; a stream of triangles shrinking into the distance: "∞".
- measure: Priya picks up triangle number 21; Rex twitches at the protractor. Hold.
- letters: whiteboard: a triangle with a, b, c inside and d outside (one side extended).
- s1: table row 1: `c + d = 180°` | "angles on a straight line add to 180°".
- s2 (Priya): row 2: `a + b + c = 180°` | "angles in a triangle add to 180°".
- qed: row 3: `d = 180° − c` and `a + b = 180° − c`; row 4: `d = a + b` boxed; "for every triangle".
- approved: stamp APPROVED. Rex smug. Hold.
- counter: chip "disprove: ONE counterexample".
- claim: Dad: "4 equal sides ⇒ square" on the board, phone with "2×".
- rhombus: Ah Boy draws a rhombus (four tick marks, no right angles): the claim gets a red cross.
- pun: Mr Tan; Para and Lel in the corner of the board, `shock`. Hold.
- rude: Lel, offended; Para nods. Hold.

## 8 traps: The kitchen saves you some marks
- intro: "6 EXAM TRAPS" over the finished kitchen.
- t1 (TH, Rex): card "Reasons need names: ~~Z angles~~ → alternate angles are equal".
- t2 (TH, Dad): card "NOT DRAWN TO SCALE: don't measure"; Dad hides the protractor behind his back.
- t3 (TH, Priya): card "`360° ÷ n` = EXTERIOR; interior = `180° −` exterior"; hexagon 60° → 120°.
- t4 (TH, Kavya): card "x = 20 → the angle is `3x + 10 = 70°`".
- t5 (TH, Para & Lel): card "no arrows, no parallel"; two lines that look parallel with a "?".
- t6 (TH, Ah Boy, broom): card "isosceles: 50° could be the apex OR a base angle: check both".
- return: the logo "ALL THE RIGHT ANGLES will return".
- monday: chip "Monday, 7 a.m."; the finished floor from above, gleaming.
- perfect: Mum kneels; the camera glides to the bottom-left corner: the last tile doesn't fit, a thin
  wedge-shaped gap.
- ninety1: Dad with his protractor at the corner: it reads 91°; chip "91°"; the phone with "2×".
- one: Rex in the corner, shock; twitches; "Ninety... one?" Hold.
- lie: Rex slowly lies down: `open` 90 → 180 (his upright arm swings down flat); a label "180°: straight
  angle" fades in. Final frame holds: Rex flat on the floor, eyes closed, the hard hat rolling away.

## Suggested split for the animators
Balanced by duration (final timeline 11.9 min). Lower thirds go on each character's FIRST appearance in the
episode: Priya and Para & Lel and Trevor in `parallel`, Mr Tan in `shelf`, Kitty in `kite`, Roomby in
`roomby`, Bea in `tiles` (Mum, Dad, Ah Boy, Kavya and Rex were introduced in `cold`).
- Writer: cold (done, 67 s).
- A: facts, tiles, traps (about 3.9 min).
- B: parallel, kite, proof (about 3.8 min).
- C: shelf, roomby (about 3.1 min).
