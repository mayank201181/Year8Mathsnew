# SLIDE, FLIP, TURN, Ep 17 "Three Right, Two Down": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Transformations & Symmetry,
with Pythagoras' theorem as a stretch. Audience: a 12-year-old in Singapore watching while eating. FUNNY first;
every coordinate exact. Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Saturday, the day of the Block 208 Residents' Year-End Concert ("SHINE ON") at the community club.
A dancer in Priya's item (item seven) has sprained her ankle, so Mr Tan (teacher in charge, emcee, puns) puts
Kavya in. "I don't dance. I do maths." "Same thing! Every dance is three moves: slide, flip and turn." Priya has
taped a coordinate grid on the stage floor. Dad is on lights, projector and the banner ladder and says "Nailed
it" right before every mistake. Mum paints a backdrop of Peranakan tiles and sews costumes. Ah Boy is doing a
shadow-puppet dinosaur and spins on the spot whenever anyone says "turn". Living in the rehearsal room is
**Madame Miroir**, a tall gilded cheval mirror on castors and a strict old ballet mistress ("Same distance. Other
side. At right angles.") whose name plate reads backwards and whose cane brings down the stamp **WRONG MOVE**.
Over ten hours: symmetry of the tiles with Twirla (rotational symmetry), blocking the dance with Vic the stage
manager (a column vector), the mirror section, the big turn (Twirla needs CAD), Ah Boy's dinosaur enlarged by
Mr Zoom the overhead projector, Mr Tan's quiz Name That Move (guest judge Auntie Rose, with kueh) and the banner
ladder, Hypo, who is the hypotenuse. Stinger: Dad finally nails it (green NAILED IT), Madame Miroir says they
were all perfect... "No. I reverse everything."

Guide sections (lib/topics/transformations-pythagoras/guide.ts) by scene: symmetry → `tiles`; translation →
`blocking`; reflection → `mirror`; rotation → `spin`; enlargement → `shadow`; describing-transformations
(congruence & similarity) → `judge`; pythagoras (stretch) → `ladder`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'miroir'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, miroir, vic, twirla, zoom, hypo.
- **Humans are the heart.** They speak about 63% of the lines and are on screen in every scene. The cartoon maths
  cast are guests in their world. Busts stand BEHIND the stage lip (`tfStage`) or the costume table
  (`tfStudio`): characters in `g.mid` or your own layer below `g.front`, at y about 430-450 (Ah Boy, a child,
  about 425-435 so his face clears the lip). Move `g.front` / `g.top` into a layer above the cast (see `00_cold.js`).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Madame Miroir is `smug`, `annoyed` at every wrong move, taps her cane (`tap`) for the stamp. Vic is brisk,
  `neutral`/`annoyed`, `point: 1` when he calls a move, and his numbers change with `{ top, bot }`. Twirla is
  `happy` and theatrical (`arrow: 1` when she talks rotation, `spin` when she demonstrates, `dizzy` after).
  Mr Zoom is an old showman, `smug`, `beam: 1` whenever he projects. Hypo is vain, `smug`, `annoyed` when Dad adds.
  Dad is `smug` right before every mistake, then `shock`/`sad`. Ah Boy is `happy` even when wrong. Priya is
  `smug`, quick, sometimes wrong. Mr Tan is `happy` at his own puns; everyone else goes `deadpan`. Mum is calm
  and practical; Auntie Rose is loud and warm.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **The stamp** `tfStamp(parent, false)` "WRONG MOVE" (red) thumps, with Madame Miroir's cane tap if she is in
     shot, on every mistake: cold (on "wrong move"), tiles.zero, blocking.spot, mirror.tape, mirror.across,
     spin.encore, shadow.edge, judge.moved, judge.ad, ladder.added. `tfStamp(parent, true)` "NAILED IT" (green)
     appears exactly once: traps.nailed. Scale it ~0.5-0.65.
  2. **"Nailed it."** Dad says it before every mistake (cold, tiles.zero, blocking.spot, mirror.tape, spin.encore,
     shadow.edge, judge.ad, ladder.added). Beat: Dad smug, the stamp, everyone turns to camera. In the stinger he
     says it and is finally right: green stamp, Dad near tears.
  3. **Ah Boy spins on the spot.** Whenever someone says "turn" or "rotate" he spins (shake him left-right with a
     small rotation and `tfDizzy` over his head): cold title, spin.whee, spin.floor (dizziest).
  4. **The banner.** It falls in the cold open (left rope only, hanging diagonally) and stays crooked in the
     background (`stage.banner`, rotate about its left end, ~24°) until ladder; ladder.short / traps it hangs straight.
  5. **Mr Tan's puns** land to silence: a tiny green chip "*cricket*" and deadpan faces (tiles.hubcap).
  6. **Madame Miroir's backwards name plate** (MIROIR written in reverse) is always visible on her base.
  7. **Countdown chip** top right in every scene: "**10 h** to showtime" (tiles), 9 h (blocking), 8 h (mirror),
     7 h (spin), 5 h (shadow), 2 h (judge), 1 h (ladder), "SHOWTIME" (traps stinger).
- **Talking heads** (TH below) use `tfConf(root, who)` full stage, the character big (s ≈ 1.2-1.4) at about
  (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `tfLowerThird(root, who)` for about 3 s (first appearances after the cold open: Mum and Twirla in tiles, Vic
  in blocking, Mr Zoom in shadow, Auntie Rose in judge, Hypo in ladder). Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, coordinate, vector or step is said, it appears big and clear in the
  caption's exact words: `mkMath` for every expression (`(1, 3)`, `360/6 = 60`, `a^2 + b^2 = c^2`), `mkWorking`
  for aligned multi-step working, `tfVec(parent, top, bot)` for EVERY column vector (never "5 over −2" as text on
  screen: always stacked in brackets), `tfFloor` for the stage grid (OVERHEAD CAM) with `tfDot` tokens for the
  dancers, `mkAxes` for other grids, `tfTile` for the tile, `mkAngleMark` for angles, `mkTriangle` for Pythagoras.
  Colour every "across" part in `TF_ACROSS` (blue) and every "up/down" part in `TF_UP` (orange), in vectors,
  steps and arrows, all episode. Object shapes pale, image shapes strong; label image vertices with a prime if
  you label them (A′). Coordinates as `(−2, 3)` with a true minus sign.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. Aim for ≤ ~1,000 elements per scene: build each human once per scene, hide with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`tfLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right; can't dance (yet) | `scKavya` bust (blue PE shirt "8"); raised hand: `tfArm` at her shoulder (local −80, 66) | KAVYA, 12 / Dancer. Since 9 a.m. |
| priya | Priya, 12: choreographer, quick, competitive, sometimes wrong | uniform, bob, yellow clip; prop: notes (`paper`) | PRIYA / Choreographer. Item seven. |
| dad | Dad: confident, wrong, lovable. "Nailed it." | glasses, moustache, green polo; prop: gaffer tape roll (`tape`) | DAD / Lights, projector, ladder. "Nailed it." |
| mum | Mum: calm, practical; backdrop and costumes | magenta kurta, bun, bindi; prop: paintbrush (`brush`) | MUM / Backdrop and costumes. |
| boy | Ah Boy, 8: shadow puppets; spins on the spot | orange star tee; `lift: 1` raises his hand; `{ prop: 'dino' }` his puppet | AH BOY, 8 / Shadow puppets. Spins. |
| tan | Mr Tan: teacher in charge, emcee, puns | shirt and tie, glasses; prop: microphone (`mic`) | MR TAN / Teacher in charge. Emcee. Puns. |
| rose | Auntie Rose (cameo): guest judge, loud, warm | curly perm, floral blouse; prop: plate of kueh (`kueh`) | AUNTIE ROSE / Guest judge. Brought kueh. |
| miroir | Madame Miroir, the MIRROR: strict, vain, French-ish ballet mistress | gilded oval cheval mirror on castors, face on the glass, grey bun with pins on top, gloves, cane (`tap`), name plate MIROIR backwards; ~330 tall | MADAME MIROIR / The mirror. Thirty years in this room. |
| vic | Vic, the COLUMN VECTOR: brisk stage manager | tall brackets with two numbers (`{ top, bot }`, blue over orange), grey head, beanie, headset, clipboard; `point` | VIC / Stage manager. Column vector. |
| twirla | Twirla, ROTATION: bubbly, dramatic, "darling"; needs CAD | pink ballerina en pointe on a red drawing pin (centre of rotation at (0, 132)); `spin` (degrees about the pin), `arrow`, `dizzy` | TWIRLA / Rotation. Needs CAD. |
| zoom | Mr Zoom, ENLARGEMENT: old showman projector | beige overhead projector (1987), walrus moustache, bow tie; lens = centre of enlargement at `TF_LENS`; `beam` | MR ZOOM / Overhead projector, 1987. Enlarges. |
| hypo | Hypo, the HYPOTENUSE: vain ladder, always the longest | aluminium ladder 360 tall, face plate, sunglasses up, "c" medal; `lean` (about his feet) | HYPO / The hypotenuse. Always the longest. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `tfHall` (wide CC hall, stage at the back, chairs; `g.stage`, `g.banner`, `g.upd`), `tfStage` (stage
close-up: Peranakan tile backdrop, curtains, pelmet + SHINE ON banner `g.banner`, a pull-down projector screen
`g.screen` / `g.screenBox`, stage lip with footlights; layers `g.mid` / `g.front` / `g.top`; `g.counterY` 530),
`tfStudio` (rehearsal room: barre, SHINE ON poster, wall clock `g.clock`, costume table front; `g.miroirAt`),
`tfConf` (talking heads), `tfCurtain(parent, x, w, side)`, `tfTileWall(parent, x0, y0, cols, rows, size)`.
Props: `tfVec`, `tfFloor` (OVERHEAD CAM stage grid, `g.px/g.py`, `g.ax`), `tfDot` (dancer tokens), `tfTile`
(`lines(p)`, `dot(p)`), `tfBanner` (`letters[i]`), `tfDino` (puppet; `col: '#111'` is its shadow), `tfSpot`
(spotlight with `beam`), `tfClock` (`set(t)`, `arrow(p)`), `tfArm`, `tfDizzy`, `tfStamp`, `tfHandProp`.
Colours `TF_ACROSS`, `TF_UP`, `TF_COL`. The cold open also draws a wall mirror pane in the studio (copy it).
Math kit: `mkMath`, `mkText`, `mkWorking`, `mkAxes`, `mkGrid`, `mkTriangle`, `mkAngleMark`, `mkPolygon`,
`mkBrace`, `mkTable`, `mkChip`, `mkSpeechBubble`, `mkWhiteboard`, `mkRuler`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`, done)
- kavya: `tfHall` wide, slow push towards the stage; Kavya bust bottom right looking at the stage; chips "Kavya,
  age 12", "Saturday, 9 a.m.", "Blk 208 Community Club", "Year-End Concert: tonight, 7 p.m."; lower third KAVYA.
- tan: cut to `tfStage`; Mr Tan (mic raised) right, Kavya left; chip "Item 7: one dancer short"; Kavya happy →
  shock; lower third MR TAN.
- dance: Kavya deadpan; a stat card: DANCE (tiny red bar), MATHS (full green bar).
- same: Priya pops up centre (lower third PRIYA); three move cards pop: SLIDE (a triangle and its translated
  copy), FLIP (a triangle, a dashed mirror line, its mirror image), TURN (a triangle turned a quarter-turn about a
  red dot).
- dad: Dad rises centre with his tape roll (lower third DAD), chips LIGHTS, PROJECTOR, BANNER LADDER on the beats;
  in the pause the banner's right rope gives way: it swings down and hangs diagonally; Dad shock, Kavya deadpan.
- boy: Ah Boy pops up with his puppet dinosaur (lower third AH BOY), chip "puppet: 5 cm"; on "ENORMOUS" its
  black shadow grows huge across the tile backdrop; Dad and Kavya shock.
- tiny: documentary zoom into the rehearsal room (`tfStudio`), viewfinder corners and "ZOOM ×" readout, onto the
  tall mirror in the corner, who opens one eye.
- hi (TH): Madame Miroir's confessional; lower third MADAME MIROIR; plaque "THE MIRROR" (a triangle, a dashed
  mirror line, its image, equal distances; "same distance · other side · at right angles"); on "wrong move" she
  lifts and drops her cane and WRONG MOVE thumps below the plaque.
- hand: studio with a wall mirror pane (its left edge x 460 is the mirror line); Kavya at x 262 raises her right
  hand (`tfArm`); her reflection in the pane at x 656 (a mirrored copy, `scale(-1 1)`) raises the hand on the
  other side; chip "her RIGHT hand"; Madame Miroir at the right.
- left: chip "in the mirror: her LEFT"; two arrows "same distance" either side of the mirror line; chip "a
  reflection reverses"; Kavya shock.
- tag: Ah Boy (hand up) points at the name plate; a gold ring round it and a magnified plate "MIROIR" written
  backwards on the table.
- you: Madame Miroir annoyed, cane tap; punch-in on Ah Boy: shock → sad. Hold.
- title: curtain title card with two spotlights; logo "SLIDE, FLIP, TURN" where SLIDE slides in, FLIP flips
  (scale-x through zero) and TURN turns half a turn; "Episode 17: Three Right, Two Down" with the column vector
  (3 over −2) beside it; cast pops in: Priya, Kavya, Madame Miroir, Dad, Ah Boy. Hold.

## 1 tiles: Mum's Peranakan tiles (Line & rotational symmetry)
Layout: `tfStage` at 9 a.m., backdrop half painted (cover the right half of the tile wall with a plain cream
rect that shrinks as Mum paints). Mum (brush) and Kavya behind the lip; Dad and Ah Boy enter as they speak.
Twirla stands on the lip (`g.top`) on her pin. A big `tfTile` (size ~260) on an easel/board at the right
(x 700-1100) for the analysis; other shapes swap in on the same board. Countdown chip "10 h to showtime".
Showpiece: the tile turning about its centre with a ghost outline, a counter "fits: 1, 2, 3, 4" ticking at
90°, 180°, 270°, 360°.
- nine: chip "9 a.m." and countdown; Mum painting tiles (the cream cover shrinks); lower third MUM.
- mum: Mum points her brush at the big tile; bubble "how symmetrical?".
- four: `tile.lines(p)` draws the 4 dashed lines one by one as Kavya says "up, across, both diagonals"; chip
  "**4** lines of symmetry"; a fold animation (the left half flips over the vertical line onto the right).
- twirla: Twirla appears (lower third TWIRLA, `arrow: 1`); the tile rotates about its centre dot (`dot(1)`) with a
  dashed ghost outline; counter "fits: 1 (90°), 2 (180°), 3 (270°), 4 (360°)"; chip "**order 4**".
- rect: Ah Boy holds up a paper rectangle (the banner shape) with "4 lines?"; he folds it along a diagonal: the
  corners do not meet (draw the folded triangle overhanging); chip "sad envelope". Hold.
- two: board: rectangle with its 2 dashed lines (vertical, horizontal) and a red cross over a diagonal; square
  beside it with 4; rectangle rotates 180° and fits: "order 2".
- zero: Dad holds a parallelogram tile, smug; chip "0 lines → order 0?"; stamp WRONG MOVE.
- one: Twirla: chip "every shape fits **once** per full turn: **no** rotational symmetry = **order 1**"; the
  parallelogram turns 180° about its centre and fits: "**order 2**" (0 lines, order 2).
- hex: Mum unrolls the centrepiece: a regular hexagon (`mkPolygon(6)`) with a snowflake doodle inside.
- n: hexagon: 3 lines through opposite vertices, then 3 through midpoints of opposite sides, `3 + 3 = 6`; table
  row "regular n-gon: n lines, order n"; "hexagon: **6** and **6**".
- turn: `mkMath` `"smallest turn" = 360/n` then `360/6 = 60°`; the hexagon turns 60° and fits (`mkAngleMark`).
- hubcap: Mr Tan (mic) enters: a hubcap with 9 spokes; `360 ÷ 40 = 9`, check `9 × 40 = 360`;
  "That's how I roll" → the hubcap rolls off; "*cricket*" chip; everyone deadpan. Hold.

## 2 blocking: Vic calls the moves (Translations & vectors)
Layout: `tfStage`, 10 a.m.; Priya, Kavya, Ah Boy behind the lip at the left; Vic on the lip. The maths lives on
an OVERHEAD CAM panel: `tfFloor` (xmin −8 … xmax 10, ymin −3 … ymax 7, unit ~38) on the right ~640 px wide, with
`tfDot` tokens P, K, B on their marks. Dad and Mr Tan appear for the spotlight gag. Countdown "9 h".
Showpiece: the three tokens sliding together along identical blue-then-orange arrows (5 right, 2 down), the
triangle staying the same way round.
- ten: chip "10 a.m."; Priya taping the grid (white tape lines drawing on the overhead panel).
- start: tokens pop: P (1, 3), K (3, 3), B (1, 5), each with its coordinate label; the triangle drawn pale between them.
- vic: Vic appears (lower third VIC: his first appearance), points; his numbers read 5 / −2; a big `tfVec('5', '-2')` beside the panel.
- up: Ah Boy (hand up) with a thought bubble: an arrow 5 up (crossed out later); his token wobbles upwards.
- rule: `tfVec` with labels: top "across: + right, − left" (blue), bottom "up/down: + up, − down" (orange);
  chip "along the corridor, then up the stairs" with a tiny corridor + staircase icon.
- means: on the panel, Kavya's token: blue arrow 5 right, then orange arrow 2 down; working `x + 5`, `y − 2`.
- moves: all three tokens slide; labels `(1, 3) → (6, 1)`, `(3, 3) → (8, 1)`, `(1, 5) → (6, 3)`; the image
  triangle strong, the object pale.
- trans: chip "**translation**: same size, same shape, same way round = **congruent**"; matching sides tick-marked.
- spot: Dad with `tfSpot`; on the panel a spotlight dot at (4, −1) and a target K at (−2, 3);
  Dad's move "6 right, 4 up" drawn: lands at (10, 3), off the stage, onto Mr Tan; stamp WRONG MOVE.
- minus: `mkWorking`: `"across" = −2 − 4 = −6` (6 left), `"up" = 3 − (−1) = 4`; `tfVec('-6', '4')`; correct arrow.
- back: Mr Tan, squinting in the spotlight beam, mic up. Hold.
- undo: `tfVec('-6', '4')` → both signs flip → `tfVec('6', '-4')`; the arrow reverses.
- finish: Ah Boy's token: `tfVec('2', '5')` then `tfVec('-7', '-1')`, two arrows head to tail.
- add: `tfVec('2', '5') + tfVec('-7', '-1') = tfVec('-5', '4')` with `2 + (−7) = −5`, `5 + (−1) = 4`; the single
  arrow from start to finish; Vic smug; Ah Boy disappointed (one move is less dancing). Hold.

## 3 mirror: The mirror section (Reflections)
Layout: `tfStudio`, 11 a.m.; Priya and Kavya behind the costume table, Ah Boy and Dad in and out; Madame Miroir
at `g.miroirAt`; Mr Tan for the puzzle. Maths on a whiteboard/grid on the left (`mkAxes` −4..8 by −2..6,
unit ~44, on a light card) — keep it above y 690 and clear of the scene tag. Countdown "8 h".
Showpiece: Ah Boy's straight-across mistake vs the right-angles path to y = x, side by side on one grid.
- eleven: chip "11 a.m."; Madame Miroir rolls in on her castors.
- half: grid with the dashed vertical mirror line `x = 4` (labelled); "x = 4" chip.
- rule: Madame Miroir: "same distance · other side · at right angles" as three chips.
- boy: point (1, 1) (B), arrow 3 squares to the line (count 1-2-3), 3 more, image (7, 1).
- rest: (3, 1) → (5, 1), (1, 4) → (7, 4); the whole triangle and its image; "same y"; the image is reversed
  (a little flag on the triangle points the other way).
- tape: Dad with tape (no lower third needed), smug: he tapes a VERTICAL line through 3 on the y-axis labelled
  "y = 3?"; stamp WRONG MOVE.
- flat: points (0, 3), (5, 3), (−1, 3) light up; the correct horizontal line `y = 3`; chip "**y = b** lies down;
  **x = a** stands up" with a lying-down and a standing-up stick figure.
- diag: new grid: the diagonal `y = x` dashed; Ah Boy's point (3, 1).
- across: his path: straight across 2 squares to the line, 2 more → (−1, 1) in red; stamp WRONG MOVE.
- swap: the correct path at right angles to the mirror (diagonal through square corners, right-angle mark) →
  (1, 3); chip "y = x: swap: (x, y) → (y, x)".
- neg: line `y = −x`; (1, 2) → (−2, −1); chip "swap, then change both signs".
- puzzle: Mr Tan: (2, 5) and (2, −1), (6, 4) and (6, 0) with dotted joins.
- mid: midpoints (2, 2) and (6, 2) marked; `((2 + 2)/2, (5 + (−1))/2) = (2, 2)`; the mirror `y = 2` drawn through
  both; chip "mirror passes through every midpoint, at right angles".
- ambo: Ah Boy holds a toy ambulance with AMBULANCE written backwards (mirrored text).
- me: in Madame Miroir's glass the word reads AMBULANCE the right way; she is moved. Hold.

## 4 spin: Twirla needs CAD (Rotations)
Layout: `tfStage`, noon; the dancers behind the lip; Twirla on the lip. OVERHEAD CAM `tfFloor` (−5..7 by −3..6)
for the turns, origin marked as the "centre spot". Countdown "7 h". Showpiece: tracing paper (a translucent
copy of the triangle) pinned at the origin turning a quarter-turn, the arm OP sweeping 90° with its length kept.
- noon: chip "Noon"; drum on the stage.
- beat: Priya with a drum stick; chip "rotate 90°!".
- whee: Ah Boy spins on the spot (wobble + `tfDizzy`); on the panel his token spins in place: red cross.
- cad: Twirla (`arrow`): chips **C**entre, **A**ngle, **D**irection pop letter by letter.
- dist: panel: a point turns about a centre on a circle (dashed), radius kept; it ends somewhere else.
- origin: the triangle (1, 1), (4, 1), (1, 3); tracing paper turns 90° anticlockwise about the origin (pin).
- rule: `(x, y) → (−y, x)`; three rows `(1, 1) → (−1, 1)`, `(4, 1) → (−1, 4)`, `(1, 3) → (−3, 1)`; image drawn;
  the side that pointed right now points up (arrows).
- encore: Dad turns his hand anticlockwise saying clockwise; stamp WRONG MOVE.
- clock: a big `tfClock` with `arrow(1)` (clockwise); chip "90° clockwise = 270° anticlockwise" with both arcs.
- rules: table: 90° anticlockwise `(−y, x)`, 90° clockwise `(y, −x)`, 180° `(−x, −y)`; "half-turn: no direction".
- about: Priya at (5, 2) (P), Kavya at (2, 1) (K) as the centre.
- step: step from C: blue 3 across, orange 1 up; turned clockwise: blue 1 across, orange 3 down; `(2 + 1, 1 − 3) =
  (3, −2)`; equal-length check.
- half: Mr Tan: (1, 2) and (5, 4) with a dotted join.
- midpt: midpoint `((1 + 5)/2, (2 + 4)/2) = (3, 3)`; the half-turn shown about (3, 3).
- floor: Ah Boy, still spinning, now upside down (rotate 180°), dizzy stars; everyone deadpan. Hold.

## 5 shadow: Mr Zoom and the dinosaur (Enlargements)
Layout: `tfStage` with `g.screen` down; Mr Zoom on the lip at the left, his `beam` aimed at the screen; Ah Boy
with his puppet in the beam; Dad operating. Then a grid on the screen for the poster (`mkAxes` 0..10 by 0..8 on a
white card). Mum for the sequins, Mr Tan for the detective question. Countdown "5 h". Showpiece: the ray lines
from the centre through each vertex of the small dinosaur triangle to the big one.
- two: chip "2 p.m."; Ah Boy's puppet in front of the beam.
- dino: chip "puppet: **5 cm**".
- zoom: Mr Zoom (lower third MR ZOOM), beam on; label "centre of enlargement" at his lens.
- light: side diagram: lens, puppet at 20 cm, screen at 60 cm, two straight rays; `60 ÷ 20 = 3`.
- fifteen: `3 × 5 = 15 cm` on the screen shadow; angles marked equal on puppet and shadow; chip "**similar**".
- poster: grid with triangle (3, 2), (5, 2), (3, 4) and centre C (1, 1); "scale factor 2".
- edge: Dad doubles from the triangle's edge: a wrong, overlapping triangle in red; stamp WRONG MOVE.
- centre: from C: blue 2 across, orange 1 up to (3, 2); doubled 4 across, 2 up → (5, 3).
- others: (5, 2): 4, 1 → 8, 2 → (9, 3); (3, 4): 2, 3 → 4, 6 → (5, 7); image drawn; base 2 → base 4 ✓.
- patch: Mum with a 2 cm × 3 cm sequin patch; "× 4"; four packets of sequins.
- area: rectangle 2 × 3 → 8 × 12 drawn to scale with 16 copies of the small one tiled inside; `P: 10 → 40 (× 4)`,
  `A: 6 → 96 cm² (× 16)`.
- sixteen: chip "lengths × k, area × k²"; a 1 × 1 square → 2 × 2 holds 4 copies.
- sequins: Mum deadpan with 4 packets; 12 more packets drop in. Hold.
- rays: Mr Tan's two triangles: small (1, 2), (2, 2), (1, 3) and big (3, 4), (6, 4), (3, 7); `3 ÷ 1 = 3`.
- meet: ray lines from each big vertex through the matching small vertex extend and meet at (0, 1); check chips
  "(0, 1) → (1, 2): 1, 1; → (3, 4): 3, 3 ✓".

## 6 judge: Name That Move (Describing transformations, congruence & similarity)
Layout: `tfStage`, 5 p.m. dress rehearsal (costumes on). Game-show set dressing: a "NAME THAT MOVE" sign, Mr
Tan with mic as host, Auntie Rose at a judge's desk (she can sit behind the lip at the right with her kueh).
A big grid (`mkAxes` −6..5 by −4..4) with shape A (1, 1), (4, 1), (1, 3) and images B (−5, 3), (−2, 3), (−5, 5),
C (reflection in y = 0) and D (180° about the origin). Countdown "2 h". Showpiece: the "describe fully" table
filling in row by row: translation → vector, reflection → mirror line, rotation → CAD, enlargement → SC.
- five: chip "5 p.m.: dress rehearsal"; NAME THAT MOVE sign lights up.
- rose: Auntie Rose (lower third AUNTIE ROSE), kueh plate up; chip "describe **fully** the **single** transformation".
- ab: A and B highlighted.
- moved: Priya: "It moved."; Auntie's scorecard "0"; stamp WRONG MOVE.
- vic: Vic (pointing): chip "same size, same way round → translation"; table row 1 "translation → vector".
- vec: (1, 1) → (−5, 3); `−5 − 1 = −6`, `3 − 1 = 2`; `"translation by" tfVec('-6', '2')`; check with (4, 1) → (−2, 3).
- ac: A and C; mirror line `y = 0` (x-axis) dashed; matching pairs; table row "reflection → mirror line equation".
- ad: Dad: "rotation, 180°"; stamp WRONG MOVE (not wrong maths, incomplete: chip "about WHERE?").
- where: Twirla: (1, 1) → (−1, −1) joined; midpoint (0, 0); final answer "rotation 180° about (0, 0)"; table row
  "rotation → centre, angle, direction".
- cad: table row "enlargement → scale factor, centre"; mnemonic chips "Rotations need **CAD**; enlargements need **SC**".
- congr: Auntie Rose, curious.
- same: two columns: CONGRUENT (translate, reflect, rotate: B, C, D the same size as A) | SIMILAR (enlarge: a big
  A, same angles marked, sides in the same ratio).
- twins: Ah Boy next to Dad, same pose: Ah Boy small, Dad big: label "similar". Dad confused. Hold.
- kueh: Auntie Rose's scorecards "10"; Priya gets two kueh. Hold.

## 7 ladder: Hypo is the longest (Pythagoras' theorem, stretch)
Layout: `tfStage`, 6 p.m.; the crooked banner; Hypo leaning against the side wall (`lean`), forming a right
triangle with the wall and floor drawn as a diagram on the right (`mkTriangle` with the right angle marked).
Then an OVERHEAD stage rectangle for the leap. Countdown "1 h". Showpiece: squares drawn on the three sides of
the 3-4-5 triangle, 9 + 16 = 25 unit squares.
- six: chip "6 p.m."; the banner still crooked.
- ladder: Dad: diagram: ladder 6.5 m, foot 2.5 m from the wall, height h = ?
- hypo: Hypo (lower third HYPO) leans; "hypotenuse c: opposite the right angle" with the right-angle mark.
- pyth: `a^2 + b^2 = c^2` big, with c on the ladder side.
- added: Dad's working `6.5^2 + 2.5^2 = 42.25 + 6.25 = 48.5` → "48.5 m?!"; stamp WRONG MOVE.
- sub: Hypo annoyed; chips "Longest side? **Add.**" / "Shorter side? **Subtract.**".
- six2: `mkWorking`: `h^2 = 6.5^2 − 2.5^2`, `= 42.25 − 6.25`, `= 36`, `h = sqrt(36) = 6 m`; check "6 < 6.5 ✓".
- leap: overhead stage 15 m × 7 m with Priya's diagonal dashed.
- d2: `d^2 = 7^2 + 15^2 = 49 + 225 = 274`.
- metres: Priya shocked: "274 m?!" leap arrow shooting off the stage.
- root: `d = sqrt(274) = 16.55… ≈ 16.6 m (1 d.p.)`; a number line 16 … 17 with `sqrt(256) = 16`, `sqrt(289) = 17`.
- builders: Mum with a tape measure: the 3-4-5 triangle with squares on its sides (9, 16 and 25 unit squares).
- triple: chips "3, 4, 5", "5, 12, 13", "6, 8, 10"; "right-angled triangles only".
- short: Ah Boy beside Hypo: tiny vs tall; the banner finally hangs straight. Hold.

## 8 traps: The cast saves you some marks
- intro: "6 EXAM TRAPS" over the stage; the curtain is closed.
- t1 (TH, Twirla): card "rotation **90° clockwise about (1, −2)**" with "rotation ✗" crossed; Twirla spins.
- t2 (TH, Mr Tan): card "SINGLE = ONE" with "reflect, then translate ✗".
- t3 (TH, Dad): card: a standing line "x = a" and a lying line "y = b"; Dad sheepish with his tape.
- t4 (TH, Vic): card `tfVec('5', '-2')` = "5 right, 2 down" vs `tfVec('-2', '5')` ✗, minus signs circled.
- t5 (TH, Mr Zoom): card: ray line from the centre, not from the edge.
- t6 (TH, Hypo): card `c^2 = 25` → `c = sqrt(25) = 5`.
- return: the logo "SLIDE, FLIP, TURN will return".
- seven: 7 p.m.: curtain opens; full house in `tfHall`; Priya, Kavya, Ah Boy dancing behind the lip (slide: all
  shift right; flip: mirror; turn: Ah Boy spins on the spot anyway).
- nailed: Dad at the light desk: lights on, projector on, banner straight; stamp NAILED IT (green) for the first
  time; Dad tearful.
- perfect: Madame Miroir in the wings, smug: "Bravo".
- really: Kavya, hopeful.
- reverse: Madame Miroir smug, a tiny cane tap; Kavya deadpan; Dad's NAILED IT stamp stays. Final frame holds on
  Kavya's deadpan face and Madame Miroir's smile. Clean frame.

## Suggested split for the animators
- Writer: cold (done).
- A: blocking, mirror, traps (about 3.9 min).
- B: spin, shadow (about 3.0 min; shadow is the heaviest scene).
- C: tiles, judge, ladder (about 4.0 min).
