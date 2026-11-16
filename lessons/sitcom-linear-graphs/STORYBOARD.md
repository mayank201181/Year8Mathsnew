# RISE OVER RUN, Ep 12 "Operation Beach Day": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Straight-Line & Real-Life Graphs.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Dad has planned a family Saturday at East Coast Park down to the minute: OPERATION BEACH DAY, with a
flipchart graph of "fun" against "time" (ice cream at 3 p.m., not before). Living on that graph is **Lionel**, a
straight line: a vain old actor who goes on forever in both directions, never bends, and whose gradient IS his mood
(uphill happy, downhill sad, flat bored; ask him to go vertical and he faints). At the park the family meets **Ex
and Why** (the coordinate twins: Ex goes across and goes first; Why goes up and keeps asking why), finds the picnic
spot and Priya's drone on the park-map grid, ropes off the picnic area with x = a and y = b, programs the drone
along y = 3x + 2 (a slip in the table bends it into a coconut tree), rates skate-park ramps with **Mo** the mountain
goat (m for mountain, rise over run) and **Cece** the crossing guard (c for crossing), writes Kavya's dying phone as
B = 80 − 5t, attends Lionel's parallel family reunion, converts Dad's London smartwatch miles at **Ori** the
Origin's Direct Proportion Club, and reads Priya's bike ride as a distance–time graph (the flat part is Lionel
having a nap). Mr Tan is jogging laps of the park all day and teaches every time he passes. Stinger: Ah Boy's
ice-cream graph: six ice creams, all at 3 p.m., a vertical line. Lionel faints.

Guide sections (lib/topics/linear-graphs/guide.ts) by scene: coordinates-midpoints → `grid`; special-lines → `rope`;
plotting-lines → `plot`; gradient-intercept → `ramp`; equations-of-lines and line-through-two-points (stretch) →
`lunch`; direct-proportion-graphs → `club`; real-life-graphs → `ride`. Exam mistakes → `traps`.
Misconceptions on screen: (5, 2) for (2, 5) (grid.found), x = −1 drawn across (rope.dad), y = 5 − 2x has gradient 5
(ramp.five), run ÷ rise (ramp.priya), any straight line is direct proportion (club.straight), flat means steady speed
(ride.steady). Mnemonics: along the corridor then up the stairs (grid.stairs), parallel to the OTHER axis
(rope.other), rise over run: rise from your seat before you run (ramp.seat), m for mountain, c for crossing (ramp.mo,
ramp.cece). Real world: park map grid (GPS), ramps, money/phone plans, the conversion graph, bike-hire break-even.
Extras: "in America it's y = mx + b" (ramp.name, from lib/extras didYouKnow: y = mx + c / y = mx + b / y = kx + b).

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'lionel'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, lionel, ex, why, mo, cece, ori.
- **Humans are the heart.** They speak about 60% of the lines and are on screen in every scene. The cartoon maths
  cast are guests in their day out. Busts stand BEHIND something (a set's `g.front`: the sofa back, the hedge, the
  near edge of the mat, the kerb) or low in the frame, so the shirt hem is never seen.
- **Reactions sell the joke.** Listeners look at the speaker (`look` −1..1) and change mood on the beat.
  Lionel is `smug`; `happy` = tilt uphill, `sad` = tilt downhill, `deadpan` = flat, `shock` = swinging towards
  vertical. Ex is `neutral`/`smug`, unbothered; Why is `happy`, then `sad` at "why am I always second?", arms up
  (`arms: 1`) on "Wheee!". Mo is hearty (`happy`), `annoyed` at run ÷ rise. Cece is brisk (`neutral`), blows her
  whistle (`tweet: 1`) every time a line crosses the y-axis. Ori is `deadpan`, arms folded; he only unfolds them
  (`arms: 1`, "this way") for lines through the origin. Dad is `smug` right before every mistake, then `sad`.
  Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed` when the drone crashes. Mum is calm and precise
  (`neutral`), `deadpan` at Dad. Mr Tan is `happy`, always jogging (bob him up and down); everyone else goes `deadpan`
  at his pun.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **Lionel's gradient is his mood** (`tilt`: +30 happy uphill, −30 sad downhill, 0 bored). Use it whenever he is
     on screen, and whenever a line's direction is taught. Vertical (tilt 90) only when someone says "straight up":
     he panics (cold.faint, ramp.zero, traps.faint).
  2. **The stamp** `lgStamp(parent, ok)`: **ON THE LINE** (green) on correct answers and points that satisfy the
     equation; **OFF THE LINE** (red) on mistakes and points that don't. grid.halve (Ah Boy's (2, 2)), plot.bent
     (the drone's table), plot.check (ON), plot.off (OFF), ramp.priya (run ÷ rise), ramp.minus (ON on m = −2),
     lunch.c (ON on y = 3x + 2), club.list (OFF on Plan Q), club.vip (ON on Plan P), ride.nap (OFF on "steady speed").
     Scale about 0.5.
  3. **Mr Tan's laps.** He jogs past in every outdoor scene from `rope` on, a little sweatier each time (`sweat`),
     announcing the lap ("Mr Tan, lap two"). Each time a chip counts his laps ("LAP 1", "LAP 2", "LAP 3").
  4. **"It's not three p.m."** Ah Boy asks about ice cream; the answer is always "not three p.m. yet" (cold.three,
     grid.mum) until ride.three ("It's three p.m.! ICE CREAM!"), then the stinger.
  5. **Kavya's phone battery** (`lgPhone`, a small corner icon from `grid` on): 80% at 9 a.m., −5% an hour (75% at
     10, 70% at 11, 65% at noon, 60% at 1 p.m., 55% at 2, 50% at 3). It pays off in lunch.phone (B = 80 − 5t).
  6. **Cece's whistle**: `tweet: 1` and the TWEET! burst every time a y-intercept is read (ramp.cece, ramp.drone if
     shown, lunch.words, lunch.write).
- **Talking heads** (marked TH below) use `lgConf(root, who)` full stage, the character big at about (330, 410),
  REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show `lgLowerThird(root, who)` for
  about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, point, equation or step is said, it appears big and clear in the
  caption's exact words: `mkMath` for every expression (`(2, 5)`, `y = 3x + 2`, `3 × (−2) + 2 = −4`,
  `m = (14 − 5)/(4 − 1)` stacked), `mkWorking` for aligned multi-step working (equals signs lined up), `mkAxes` for
  every graph (graph paper, labelled axes, `g.line(m, c)` draws lines exactly, `g.point` points, `g.seg` segments),
  `mkTable` for tables of values. Coordinates are written `(−3, −2)` with a true minus sign. Speeds `12 km/h`, money
  `$26`. The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. About 1,000 elements per scene at most: build each human once per scene and move it.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`lgLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Has read the plan. |
| dad | Dad: the planner; confident, wrong, lovable | glasses, moustache, green polo; default prop the OPERATION BEACH DAY clipboard (`lgPlanBoard`); `{ prop: null, hand: true, watch: true }` gives him the London smartwatch (`g.watch.set('5.0 mi')`) | DAD / Planned every minute. |
| mum | Mum: calm, precise, deadly | magenta kurta, bun, bindi; any `prop` ('mug', 'phone') | MUM / Kavya's mum. Precise. |
| boy | Ah Boy, 8: wants ice cream; asks the obvious question | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Waiting for ice cream. |
| priya | Priya, 12: competitive, quick, owns a drone | purple weekend tee, bob, yellow clip; default prop the drone remote (`lgRemote`) | PRIYA / Best friend. Has a drone. |
| tan | Mr Tan: jogging, teaching, punning | sky-blue "RUN" tee, red sweatband, glasses, water bottle | MR TAN / Maths teacher. Jogging. Teaching. |
| lionel | Lionel, A STRAIGHT LINE: vain old actor, never bends | amber rod with an arrowhead at each end, round head bead, quiff, thin moustache, red cravat; `tilt` (degrees), `sleep` | LIONEL / A straight line. Never bends. |
| ex | Ex, the x-COORDINATE: relaxed, goes first | a fat red arrow lying down, pointing right, "x" badge | EX / The x-coordinate. Goes first. |
| why | Why, the y-COORDINATE: small, keeps asking why | a blue arrow standing up, "?" curl, "y" badge; `arms` | WHY / The y-coordinate. Goes second. |
| mo | Mo, the GRADIENT: hearty mountain goat | goat bust, horns, beard, alpine hat; `flag` raises a "rise / run" triangle flag | MO / The gradient. m for mountain. |
| cece | Cece, the y-INTERCEPT: brisk crossing guard | lollipop sign with a face, hi-vis vest, cap with "c"; `tweet` | CECE / The y-intercept. c for crossing. |
| ori | Ori, the ORIGIN (0, 0): nightclub bouncer | dark plum dot, shades on his head, earpiece, "(0, 0)" pendant; `arms` | ORI / The origin, (0, 0). Bouncer. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `lgFlat` (living room; `g.mid`/`g.front` sofa/`g.top`; `g.chart` the flipchart; `g.clock(h, m)`),
`lgPark` (East Coast Park side view: sea, sand, coconut trees, cycle path; `g.mid`/`g.front` hedge; `g.upd(t)`;
`{ sky: 'evening' }`), `lgMapBoard` (park map: an `mkAxes` x −4..8, y −7..6 on a wooden sign; `g.at(x, y)`,
`g.icon(kind, x, y, { label })`), `lgPicnic` (picnic lawn with the striped mat, cooler, basket; `g.front` the near
grass), `lgSkate` (skate park with ramps A, B, C to scale, 1 m = 60 px; `g.ramps`, `g.tri(i)`), `lgShops` (bike hire
SHOP X and SHOP Y; `g.signs`), `lgClub` (DIRECT PROPORTION CLUB doorway, neon, red carpet, `g.rope` velvet rope,
`g.list` guest-list board), `lgConf` (talking heads).
Props: `lgFlipchart`, `lgPlanBoard`, `lgDrone` (`g.set(t, on)`), `lgRemote`, `lgPhone` (`g.set(pct)`), `lgWatch`,
`lgIceCream`, `lgBike`, `lgSandwich`, `lgTree`, `lgCooler`, `lgVelvetRope` (`g.set(open)`), `lgStamp`, `lgTweet`.
Math kit: `mkMath`, `mkText`, `mkWorking`, `mkAxes`, `mkTable`, `mkChip`, `mkSpeechBubble`, `mkThoughtBubble`,
`mkWhiteboard`, `mkGrid`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `lgFlat`, clock at 8:00; Kavya bust left behind the sofa, neutral → deadpan; chips "Kavya, age 12",
  "Saturday, 8 a.m.", "family meeting"; lower third KAVYA, 12. Dad's covered flipchart on the right.
- plan: Dad rises beside the flipchart, clipboard up (lower third DAD); the plan's straight line draws itself on
  "graph"; chip "every minute planned".
- beach: slow push on Kavya, annoyed then deadpan; Dad smug.
- five: Mum rises with her coffee mug (lower third MUM), calm.
- ice: Ah Boy pops up between them, hand raised (lower third AH BOY).
- three: Dad points at the ice-cream icon on the chart at 3 p.m. (a red ring pulses); chip "ice cream: **3 p.m.**
  Not before."; Ah Boy shock → sad.
- tiny: documentary zoom into the line on the flipchart (viewfinder corners, "ZOOM ×" readout, REC dot).
- hi (TH): Lionel slides into his confessional, smug; lower third LIONEL; plaque "A STRAIGHT LINE" with a double
  arrow, "goes on forever, both ways", "never bends".
- mood: board "the gradient = the mood" with three mini graphs; on each beat Lionel tilts: uphill (happy) "uphill:
  **positive**", downhill (sad) "downhill: **negative**", flat (deadpan) "flat: **zero**".
- up: back in the room: Ah Boy, hand up, speech bubble "straight **up**?"; family looks at him.
- faint: Lionel's confessional: the rod swings to vertical and trembles, shock, sweat; card "VERTICAL",
  `gradient = rise/0` with a red cross, "run = 0: **no gradient**"; on "Never. Ask me. That." he snaps back flat,
  annoyed. Slow push-in in the pause.
- charge: the room: Lionel hops out in front of the flipchart (small); chips "1 family", "1 beach", "1 straight
  plan"; on "I'll keep it straight" he tilts proudly uphill; Kavya deadpan.
- title: sea-blue card, sand strip, a huge rise/run triangle; logo "RISE / OVER RUN" with a fraction bar between
  (rise over run!); "Episode 12: Operation Beach Day"; the cast pops in: Kavya, Lionel, Dad, Mum, Ah Boy. Hold.

## 1 grid: The park map (Coordinates & midpoints)
Layout: `lgPark` (day); the park map `lgMapBoard(…, { unit: 33 })` at `tr(board, 690, 108)` fills the right half
(icons: kiosk at the origin, picnic (2, 5), toilet (5, 2), beach (−3, −2), jetty (5, 4)). Humans left, behind
the hedge (`g.front`): Dad, Ah Boy, Kavya, Priya, Mum (later). Ex lies along the bottom of the map; Why stands up
beside it. Showpiece: Priya's drone flying from A to B on the map and stopping at (1, 1), with the 8 across / 6 up
staircase halved.
- nine: chip "9 a.m."; the map; the kiosk icon pops at the origin with a glow; label "origin (0, 0)". Kavya's phone
  icon (top right of the left half) shows 80%.
- spot: Dad (clipboard up, smug) — the picnic icon pops at (2, 5) with a pin.
- found: Ah Boy runs (his map pin hops 5 across, then 2 up) to (5, 2): the toilet icon. Ah Boy happy; Dad deadpan.
- ex: Ex slides in along the map's x-axis (lower third EX); arrow "across →".
- why: Why pops up beside the y-axis (lower third WHY); arrow "up ↑ / down ↓"; on "always second" Why sad.
- order: two pins: (2, 5) green "2 across, then 5 up" (dashed path across then up), (5, 2) red "toilets"; the
  stamp OFF THE LINE on (5, 2) is NOT used here (save it); Ah Boy happy anyway.
- stairs: chip "**Along the corridor, then up the stairs**"; a corridor arrow along x, stairs icon up y; "x first,
  then y".
- neg: the beach icon at (−3, −2): path 3 left, 2 down (red dashed).
- quad: the four quadrants shade one by one (pale tints), labels "First (+, +)", "Second (−, +)", "Third (−, −)",
  "Fourth (+, −)" anticlockwise from top right; the beach sits in the third, which glows.
- drone: Priya pops up with the remote (lower third PRIYA); the drone icon at A(−3, −2), the jetty at B(5, 4);
  labels A and B.
- half: the drone flies from A along the segment; the staircase "8 across" and "6 up" draws; halfway "4 across",
  "3 up"; the drone stops at (1, 1) and hovers; label `M(1, 1)`.
- mean: working: `x: (−3 + 5)/2 = 1`, `y: (−2 + 4)/2 = 1` (stacked fractions), `(1, 1)` boxed.
- boy: Ah Boy proudly: `−3 + 5 = 2`, `−2 + 4 = 2`, so `(2, 2)`; a pin at (2, 2), off the segment.
- halve: Why (curious) — stamp OFF THE LINE on Ah Boy's (2, 2). Hold.
- cart: Dad's icon at (−3, 4), the ice-cream cart at (2, −1), "Mum = ?" with a question mark.
- step: arrows from Dad to the cart "+5, −5" and the same arrow again to (7, −6): Mum's icon pops; check chip
  `((−3 + 7)/2, (4 + (−6))/2) = (2, −1)` ✓.
- mum: Mum (lower third MUM) at the side, phone in hand, deadpan; chip "NOT 3 p.m."; Ah Boy sad. Hold.

## 2 rope: Mum's rope (Lines x = a, y = b, y = x and y = −x)
Layout: `lgPicnic`; Mum, Dad, Kavya, Ah Boy, Priya behind the mat; on the right a plan card (white, about 520 × 520)
with `mkAxes` x −4..7, y −5..5 (unit about 44): the rope lines are drawn on it as thick red rope strokes. Ex lies
along the plan's x-axis, Why stands on the y-axis. Mr Tan jogs in from the right (bobbing). Showpiece: the rope
rectangle with x = −1, x = 5 (vertical), y = −3, y = 2 (horizontal), area 30, then y = x and y = −x crossing it.
- ten: chip "10 a.m."; phone icon 75%. Mum with a coil of rope.
- area: four labels appear in order: `x = −1`, `x = 5`, `y = −3`, `y = 2` (not yet drawn).
- dad: Dad smug lays `x = −1` ACROSS (a horizontal rope at y = −1 on the plan, labelled `x = −1 ?`).
- stuck: the wrong rope flips to vertical at x = −1; points (−1, −3), (−1, 0), (−1, 4) dot along it; Ex points
  "x stuck at −1"; Dad sad. Stamp OFF THE LINE on the old horizontal rope as it fades.
- free: Why bounces up and down the vertical rope, arms up (`arms: 1`), "y = anything!". Hold.
- other: chip "The line runs parallel to the **OTHER** axis"; `x = a` → vertical, `y = b` → horizontal; all four
  ropes drawn.
- axes: the y-axis glows, labelled `x = 0`; the x-axis glows, labelled `y = 0`.
- size: the rectangle shades; working `5 − (−1) = 6`, `2 − (−3) = 5`, `6 × 5 = 30` square units (aligned).
- tan: Mr Tan jogs in (lower third MR TAN, chip "LAP 1"), points at the plan; the line `y = x` draws.
- yx: points (−2, −2), (0, 0), (4, 4) on y = x; a 45° angle mark at the origin.
- ynx: `y = −x` draws (other colour); point (2, −2) labelled "opposite"; 45° mark.
- mirror: point (5, 2) and its reflection (2, 5) across y = x (dashed perpendicular); "swap!".
- boy: Ah Boy proud, chip "reflected". Hold.
- pun: Mr Tan happy; everyone deadpan; a seagull flies across (or a tiny "…" chip).
- copy: Ah Boy copies Mr Tan's exact pose and voice (look and lift the same). Mr Tan deadpan for once. Hold.

## 3 plot: The drone that bent (Plotting straight lines)
Layout: `lgPark` (late morning) with a coconut tree on the right (`g.trees`); Priya with the remote; a table
(`mkTable`, x −2..2) top right on a white card; graph paper `mkAxes` x −4..5, y −8..16 (`unitY` about 22) on a card
in the centre-right. Showpiece: the drone following the wrong points, kinking into the coconut tree, then the
fixed straight line.
- eleven: chip "11 a.m."; phone 70%; `y = 3x + 2` big on the card.
- table: Priya (smug) fills the table: y = −4, −1, 2, **6**, 8; on "Launch!" the drone lifts off.
- bent: the drone flies through the five plotted points; at (1, 6) the path kinks and the drone crashes into the
  coconut tree (a coconut drops). Lionel pops up (appalled, `shock`): "never bends!"; stamp OFF THE LINE on the
  table. Hold.
- diff: under the table, arrows between entries: `+3`, `+3`, `+4` (red), `+2` (red).
- fix: `3 × 1 + 2 = 5` replaces the 6 (green); differences all `+3`.
- brackets: Ex: `y = 3 × (−2) + 2 = −6 + 2 = −4` with the brackets highlighted.
- method: four steps pop in a row: "Table → Substitute → Plot → **one ruled line**"; a ruler slides along and the
  line `y = 3x + 2` draws across the whole range.
- sand: Ah Boy proudly shows his sand drawing: a wobbly dot-to-dot zigzag.
- zigzag: Lionel (annoyed) beside the zigzag; a ruler next to him. Hold.
- check: Mr Tan jogs past ("LAP 2", a bit sweaty): point (−3, −7) on the extended line; `3 × (−3) + 2 = −7` ✓;
  stamp ON THE LINE.
- off: point (4, 15) just above the line at (4, 14); `3 × 4 + 2 = 14 ≠ 15`; stamp OFF THE LINE.
- again: the fixed table (−4, −1, 2, 5, 8); the drone flies the straight line perfectly…
- sandwich: …and lands on Dad's sandwich. Dad sad, holding the squashed sandwich. Hold.

## 4 ramp: Mo and the skate park (Gradient & y-intercept)
Layout: `lgSkate` (ramps A, B, C to scale); Ah Boy and Priya on the left behind the kerb, Dad and Kavya; Mo
stands centre-left; a board on the right for `y = mx + c` later. Showpiece: the three rise/run triangles with
`2/4 = 0.5`, `3/5 = 0.6`, `1/2 = 0.5`, and A and C shown to be the same shape (C slides onto A's slope).
- noon: chip "12 noon"; phone 65%.
- big: Ah Boy points at ramp A, happy.
- mo: Mo bounds onto ramp B (lower third MO); chip "**m** for **mountain**".
- rr: Mo raises his flag (`flag: 1`): `gradient = rise/run` (stacked) with "up ÷ across".
- priya: Priya smug: `4 ÷ 2 = 2` ("across over up"); stamp OFF THE LINE; Mo annoyed.
- seat: chip "**Rise** from your seat **before** you **run**"; `rise/run` with "rise" on top glowing.
- ramps: `g.tri(0..2)` overlays one by one with `2 ÷ 4 = 0.5`, `3 ÷ 5 = 0.6`, `1 ÷ 2 = 0.5` under each ramp.
- steep: B gets a crown "steepest"; C's triangle slides onto A's slope and fits: "same gradient".
- dad: Dad sits at the top of ramp C, smug, with his clipboard. Hold.
- sign: three small graphs: uphill `+`, downhill `−`, flat `0`; Lionel pops into a corner and tilts with each;
  then a staircase: "1 across, 3 up" for gradient 3.
- cece: Cece marches in and plants herself on the y-axis of a small `mkAxes` board (lower third CECE); TWEET!; chip
  "**c** for **crossing**: (0, c)".
- name: `y = mx + c` big, with "m: how steep" under m and "c: where it crosses" under c; a small "USA: y = mx + b".
- five: Dad smug: `y = 5 − 2x`, "gradient 5?" with the 5 circled.
- minus: Mo: rewrite `y = −2x + 5`: `m = −2` (with its sign) and `c = 5`; the line draws downhill crossing at
  (0, 5) (Cece TWEET!); stamp ON THE LINE.
- vert: Ah Boy points at a sheer wall.
- zero: Lionel swings vertical and panics; `rise/0` crossed out, "run = 0: **no gradient**"; then flat, glaring.
  Hold.

## 5 lunch: Lionel's family reunion (Matching & writing equations; the line through two points)
Layout: `lgPicnic` at lunch; the family on the mat (busts behind the near edge); Kavya's phone `lgPhone` big on the
left at first; a whiteboard (`mkWhiteboard`) on the right for graphs and working. Showpiece: the three parallel
Lionels on one set of axes, never meeting.
- one: chip "1 p.m."; phone 60%, flashing.
- phone: `lgPhone` big: 80% → 60%; a little table: 9 a.m. 80%, 10 a.m. 75%, 11 a.m. 70%.
- words: Cece (TWEET!): `B = 80 − 5t`, with "start 80 = c" and "−5 per hour = m" labelled; a small graph from
  (0, 80) going down.
- gym: Dad: `C = 25n + 30`, "$30 to join", "$25 a month".
- never: Mum deadpan; the 30 glows "even if you never go". Dad sad. Hold.
- quiz: Mr Tan jogs in ("LAP 3", sweatier) holding a card: three small graphs (steep up crossing at 1; shallow down
  crossing at 4; 45° crossing at −3) and three equation chips `y = 3x + 1`, `y = −½x + 4`, `y = x − 3`; then chips
  "sign of m", "size of m", "c" as he says them.
- match: each chip flies to its graph on its beat; ticks.
- family: three Lionels slide onto one `mkAxes`: `y = 2x + 3`, `y = 2x`, `y = 2x − 2`, labelled, all tilted the
  same (smug).
- meet: the gap between them stays the same (arrows); the brothers try to wave and can't reach. Hold.
- para: Priya: chip "**parallel** ⇒ **equal gradients**".
- stretch: Mr Tan: points (1, 5) and (4, 14) on a fresh board, no line; "STRETCH" badge.
- grad: `m = (14 − 5)/(4 − 1) = 9/3 = 3` (stacked; colour-matched: 14 and 4 one colour, 5 and 1 another: "same
  order").
- c: working `5 = 3 × 1 + c`, `c = 2`; check `3 × 4 + 2 = 14` ✓; the line `y = 3x + 2` draws through both points;
  stamp ON THE LINE.
- mine: Priya delighted, the drone icon flies along the line. Hold.

## 6 club: The Direct Proportion Club (Direct proportion graphs)
Layout: `lgClub` (an evening-lit doorway set up in the park, neon "DIRECT PROPORTION CLUB"); Ori at the velvet rope;
a big screen/board on the right for graphs (`mkAxes`); Dad, Mum, Kavya, Priya, Ah Boy in the queue on the left.
Showpiece: the conversion graph y = 1.6x through the origin, and Plan Q's line bouncing off the velvet rope.
- two: chip "2 p.m."; phone 55%. Dad jogs in, sweaty, with his watch (`watch: true`).
- five: watch close-up: "5.0 mi"; "LONDON".
- km: Mum, deadpan.
- ori: Ori (lower third ORI) folds his arms; "(0, 0)" pendant glints; the neon flickers.
- conv: graph: miles 0..30 across, km 0..50 up; `y = 1.6x` draws from the origin; Ori unfolds his arms, "this way".
- read: from 5 on the miles axis up to the line, across to 8; then 10 → 16, 25 → 40 (dashed reading lines); a
  table: miles 5, 10, 25; km 8, 16, 40.
- k: a third table row "km ÷ miles = 1.6" each; chip "k = 1.6 = **gradient**"; Dad smug: "8 km!".
- plans: Priya with two phone-plan cards: P "$3 per GB", Q "$6 + $2 per GB".
- p: a new graph GB 0..5, $ 0..20: P's points (0, 0), (2, 6), (4, 12) and the line `y = 3x`.
- q: Q's points (2, 10), (4, 14) and line `y = 2x + 6` starting at (0, 6); "`2 × 10 = 20 ≠ 14`".
- list: Plan Q's line slides towards the club and bounces off the velvet rope (it misses the origin: a red gap
  between (0, 6) and (0, 0)); stamp OFF THE LINE; "Not on the list".
- straight: Ah Boy, outraged.
- both: two chips with ticks: "straight line ✓" + "through the origin ✓" = direct proportion; "no input, no
  output".
- vip: Ori opens the rope (`g.rope.set(1)`) for Plan P (y = 3x); stamp ON THE LINE; Priya smug, walks in. Hold.

## 7 ride: Lionel takes a nap (Real-life & distance–time graphs)
Layout: first `lgShops` (two bike-hire shops) with a break-even graph; then `lgPark` (afternoon) with Priya's
distance–time graph on a big card (`mkAxes`: time 0..70 min across, distance 0..7 km up). Showpiece: the three
Lionel pieces making Priya's graph, the middle one asleep.
- three: Ah Boy explodes with joy; chip "3 p.m. ICE CREAM!"; phone 50%; ice creams appear.
- shops: `lgShops`; Dad points at the signs.
- eqs: `C = 3h + 8` (X, blue) and `C = 5h` (Y, orange) on an `mkAxes` h 0..7, C 0..40.
- cross: the lines cross at (4, 20): working `3h + 8 = 5h`, `8 = 2h`, `h = 4`; "both $20".
- six: Dad smug: clipboard "RIDE: 6 HOURS".
- x: Mum: `3 × 6 + 8 = 26`, `5 × 6 = 30` at h = 6 on the graph; X ticked; then deadpan "And we ride for one."
- priya: cut to the park; Priya cycling past (bust over the hedge, moving right); the graph card appears.
- parts: three Lionels slide in as the three pieces: up (0, 0) → (30, 6), flat (30, 6) → (50, 6), down (50, 6) →
  (70, 0); labels "6 km in 30 min", "20 min", "home in 20 min".
- steady: Dad smug pointing at the flat piece: "steady speed?".
- nap: the flat Lionel is asleep (`sleep: 1`, deadpan); "distance not changing ⇒ **stopped**"; stamp OFF THE LINE
  on "steady speed". Hold.
- speed: Mo: chips "gradient = speed", "steeper ⇒ faster", "down ⇒ coming back".
- units: working: `30 min = ½ h`, `6 ÷ ½ = 12 km/h`; `20 min = ⅓ h`, `6 ÷ ⅓ = 18 km/h`; the steeper return piece
  glows "faster"; Priya smug.
- curve: Ah Boy's line: a curve getting steeper (speeding up).
- curvy: Lionel side-eyes the curve (Curvy, a little face on the curve, waving); chip "curve ⇒ **speed
  changing**". Hold.
- meet: two distance–time lines crossing on a small graph; the crossing point glows "meet: same place, same time".

## 8 traps: The beach saves you some marks
- intro: "6 EXAM TRAPS" over the beach (`lgPark`).
- t1 (TH, Ex): card "`(x, y)`: across first", `(2, 5)` ✓ vs `(5, 2)` ✗.
- t2 (TH, Ah Boy): card `y = 4 − 3 × (−2) = 4 + 6 = 10` ✓, "−2" ✗.
- t3 (TH, Lionel): card: zigzag ✗ vs one ruled line ✓.
- t4 (TH, Mo): card: downhill line, `m = −2` ✓, `m = 2` ✗; on "Goats fall for it" a cartoon goat tumbles down the line.
- t5 (TH, Priya): card `20 min = ⅓ h`; `6 ÷ ⅓ = 18 km/h` ✓, `6 ÷ 20` ✗.
- t6 (TH, Dad): card `((−3 + 5)/2, (−2 + 4)/2) = (1, 1)` ✓, `(2, 2)` ✗.
- return: the logo "RISE OVER RUN will return".
- eight: `lgFlat`, evening, clock at 8:00; the family on the sofa, sunburnt (`blush`), tired.
- plan: Dad smug with the flipchart.
- graph: Ah Boy flips the flipchart page: his own graph "ICE CREAMS against TIME": a vertical line at 3 p.m. from
  0 to 6 ice creams.
- six: Mum shock.
- faint: Lionel, on the flipchart, swings vertical along Ah Boy's line, trembles, and slowly topples over
  backwards until he lies flat (tilt 0, `sleep: 1`). Final frame holds: Lionel flat on the flipchart ledge, Ah Boy
  happy, Mum shock.

## Suggested split for the animators
- Writer: cold (done).
Durations from timeline.json: grid 83 s, rope 89 s, plot 77 s, ramp 89 s, lunch 90 s, club 75 s, ride 86 s,
traps 62 s (total 11.9 min). Grouped by set and balanced by duration:
- A: grid, plot, club (about 3.9 min; `lgPark`, `lgMapBoard`, `lgClub`).
- B: rope, lunch (about 3.0 min; both on `lgPicnic`: share the mat layout and the plan/whiteboard card).
- C: ramp, ride, traps (about 3.9 min; `lgSkate`, `lgShops` + `lgPark`, confessionals + `lgFlat`; the stinger reuses
  the cold open's flipchart and Lionel's vertical panic from `scenes/00_cold.js`).
