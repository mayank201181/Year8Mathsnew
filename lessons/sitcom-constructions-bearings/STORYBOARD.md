# TRUE NORTH, Ep 14 "The Great Ubin Race": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Constructions, Scale Drawings
& Bearings. Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number and every
construction exact. Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Mr Tan has organised the school's Family Orienteering Race on **Pulau Ubin** (a bumboat ride from
Changi Point): one map, one compass, eight checkpoints, and the prize is a box of his homemade waffles. Team
Kavya is Kavya, Dad ("I have an EXCELLENT sense of direction") and Ah Boy. Mum has defected to Priya's team
("I want those waffles"). Living in Mr Tan's brass pocket compass is **Captain Needle**: seventy years at sea,
only ever looked one way. North. His rival for the word "compass" is **Madame Compassa**, a prima-ballerina pair
of compasses. Checkpoints: a bike lock opened by a reflex angle (**Inner & Outer**, a married protractor),
triangles at the quarry, a fair lunch spot (perpendicular bisector), the Chek Jawa fork and the race to the
shoreline (angle bisector, perpendicular), a bearing from the old well, the way back (back bearing), Race HQ
with **Dr Shrink** (scale), and the treasure box guarded by **Gertie** the goat (loci, special angles). Stinger:
Ah Boy's fridge magnet shows Captain Needle South for the first time in seventy years.

Guide sections (lib/topics/constructions-bearings/guide.ts) by scene: measuring-angles -> `lock`;
constructing-triangles -> `quarry`; perpendicular-bisector -> `lunch`; angle-bisector -> `shore`; bearings ->
`bearings`; back-bearings -> `back`; scale-drawings -> `treasure`; loci (stretch) -> `goat`. Exam mistakes ->
`traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'needle'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, needle, compassa, inner, outer, shrink, gertie.
  Inner & Outer are ONE character (`cast(.., 'proto')`): `p.set({ t, talk: scTalk(S, t, 'outer'), mood,
  talkB: scTalk(S, t, 'inner'), moodB, lookB })`. Outer is the viewer's left face, Inner the right.
- **Humans are the heart.** They speak 59% of the lines (78 of 131) and are on screen in every scene. The cartoon maths cast
  are guests on their island. Busts stand BEHIND something (the boat's gunwale, a hedge, the boardwalk rail,
  the HQ table: the set's `g.front`), with the bust at about y 440 so the shirt hem is hidden.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Captain Needle is `smug`, `annoyed` on every OFF COURSE, `happy` only in the stinger. Madame Compassa is
  `smug` and dramatic (`arms: 1` on her big moments, `twirl` when she draws an arc). Outer is `deadpan`, Inner
  `smug`; they look at each other (`look: 1` / `lookB: -1`) when they bicker. Dr Shrink is `happy`, then
  `shock` at Dad's 225 000 km. Gertie is `deadpan` always, except one `smug` after "What waffles?".
  Dad is `smug` right before every mistake, then `sad`. Ah Boy is `happy` even when wrong. Priya is `smug`,
  `annoyed` when corrected. Mum is brisk and competitive (`smug`). Mr Tan is `happy` at his own puns; everyone
  else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill
  a pause with new information.
- **Running gags:**
  1. **"Trust me."** Dad's excellent sense of direction: cold.dad (points at Changi Airport), lock.dad (050),
     lunch.half (the swamp), shore.diag (the sea), bearings.dad (anticlockwise), back.knew, traps.agrees. Each
     time Dad lifts his hand to point (`lift: 1`), smug; a small compass rose chip shows where he is really
     pointing.
  2. **Captain Needle's stamp** `cbStamp(parent, false)` "OFF COURSE" (red) thumps on every wrong way:
     cold.still (Dad, south-west), bearings.anti (72° anticlockwise), back.off (295°). `cbStamp(parent, true)`
     "ON COURSE" (green) on correct results: lock.code (310), bearings.list, back.half (245°), treasure.short.
     Scale it ~0.5.
  3. **Captain Needle only faces North.** His needle always points up the screen, whatever happens: when the
     whole character turns (`tr(c, x, y, s, r)`), pass `needle: -r`. Only the magnet in the stinger moves it.
  4. **Two compasses.** Whenever anyone says "compass", the wrong one turns up (quarry.clue: Captain Needle
     salutes, Compassa barges in). They glare at each other (Needle `annoyed`, Compassa `smug`).
  5. **Inner & Outer always add up to 180** (lock, traps.t1): a small chip "**+ = 180°**" pops between them.
  6. **Mr Tan's puns** land to silence: a tiny "*cricket*" chip and deadpan faces (lock.pun, bearings.pun).
  7. **Never Eat Soggy Waffles.** Ah Boy cannot get over soggy waffles (bearings.why); Gertie eats the prize
     (goat.munch); "What waffles? ...Bit soggy, anyway." and Ah Boy's cry (goat.soggy).
- **Talking heads** (TH below) use `cbConf(root, who)` full stage, the character big (s about 1.4) at about
  (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere in a scene, show
  `cbLowerThird(root, who)` for about 3 s. Cut instantly (fades at most 0.25 s).
- **Maths on screen:** whenever a number, angle, bearing or step is said, it appears big and clear in the
  caption's exact words: `mkMath` / `mkText` for every expression (`360° − 50° = 310°`, `3 + 4 = 7 < 8`),
  `mkWorking` for aligned working. Bearings are ALWAYS three figures with a degree sign (`cbFmt(60)` =
  `060°`) and drawn with `cbBearing` (North line, clockwise arc, label). Constructions are drawn as they are
  described: real compass arcs (`cbArc`) at real radii, lines with `cbSeg`, points with `cbDot`, and right
  angles with `mkAngleMark` (`right: true`). Leave construction arcs visible (that is the lesson). Lengths
  in cm on paper use a consistent drawing scale (suggest 1 cm = 40 px). The jokes can be silly; the maths must
  be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. At most ~1,000 elements per scene: build each human once and move or hide it.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`cbLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right; Team Kavya's navigator | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Team Kavya. Navigator. |
| dad | Dad: confident, wrong, lovable. "Trust me." | glasses, moustache, green polo; an empty hand, `lift: 1` points | DAD / Excellent sense of direction. Allegedly. |
| boy | Ah Boy, 8: the obvious question; soggy waffles | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Team Kavya. |
| mum | Mum: brisk, competitive, on Priya's team | magenta kurta, bun, bindi; a yellow walkie-talkie | MUM / On Priya's team. For the waffles. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; pencil | PRIYA / Best friend. Rival captain. |
| tan | Mr Tan: race marshal, dry, puns, bakes waffles | shirt and tie, glasses, MARSHAL lanyard, megaphone | MR TAN / Maths teacher. Race marshal. Baker. |
| needle | Captain Needle, the MAGNETIC COMPASS: old sea captain, only faces North | brass compass body with dial and needle, brass lid head, white captain's cap, white beard; `needle` deg, `point` | CAPTAIN NEEDLE / Magnetic compass. Only faces North. |
| compassa | Madame Compassa, a PAIR OF COMPASSES: prima ballerina, "same width!" | silver knob head, ballet-bun handle, tiara, pink tutu, needle leg (left) and pencil leg (right); `open`, `arms`, `twirl`, `g.tip(open)` | MADAME COMPASSA / A pair of compasses. Prima ballerina. |
| proto | Inner & Outer, a PROTRACTOR: married, bicker, always add up to 180 | blue half-disc with ticks; Outer left (bow tie, moustache), Inner right (flower clip, lashes); `talkB`, `moodB`, `lookB` | INNER & OUTER / A protractor. Married. Add up to 180°. |
| shrink | Dr Shrink, the SCALE DRAWING: manic scientist ray gun | teal ray gun, white hair, goggles, dial "÷ 25 000", beam `zap` | DR SHRINK / Scale drawings. Never touches angles. |
| gertie | Gertie, a GOAT on a rope: a locus | white goat bust, horns, daisy, red collar and bell, rope to the left (`g.rope`) | GERTIE / A goat. On a rope. Bored. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `cbBoat(parent, { dusk })` (the bumboat on the sea: Changi control tower left, Pulau Ubin and its jetty
right, a plane `g.plane`; `g.rock` rocks `g.mid` and `g.front`; gunwale y 540), `cbIsland(parent, place)` with
place `'shop'` (UBIN BICYCLE RENTAL, bikes; hedge), `'quarry'` (cliffs, green lake; wooden rail), `'boardwalk'`
(Chek Jawa: mangroves, sea, lookout tower; boardwalk rail), `'kampong'` (house on stilts, palms, fence;
bushes), `'hq'` (RACE HQ tent, FINISH arch; table). All have `g.mid`, `g.front`, `g.upd(t)`. `cbPaper(parent,
x, y, w, h, { grid })` is the working card / map card. `cbConf(parent, who)` talking heads.
Maths props: `cbFmt`, `cbNorth`, `cbBearing`, `cbArc`, `cbSeg`, `cbDot`, `cbStamp`.
Props: `cbSignpost(parent, deg)`, `cbLock`, `cbBike`, `cbFlag` (orienteering control flag: put one at every
checkpoint), `cbWaffles`, `cbMagnet`, `cbPlane`, `cbMegaphone`, `cbWalkie`, `cbWell`.
Math kit: `mkMath`, `mkText`, `mkWorking`, `mkChip`, `mkProtractor`, `mkRuler`, `mkCompass`, `mkAngleMark`,
`mkTriangle`, `mkGrid`, `mkSpeechBubble`, `mkTable`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `cbBoat` wide, slow push-in; the whole group in the bumboat (Mr Tan at the bow on the right with the
  megaphone, Kavya, Ah Boy, Dad in the middle, Mum and Priya at the left end); chips "Kavya, age 12",
  "Saturday, 8 a.m.", "bumboat to Pulau Ubin"; lower third KAVYA, 12.
- race: Mr Tan at the bow with the megaphone (lower third MR TAN); banner chip "THE GREAT UBIN ORIENTEERING
  RACE"; then the waffle box (`cbWaffles`, lid open) pops with "PRIZE: waffles". Ah Boy happy.
- dad: closer two-shot of Dad (lower third DAD) and Kavya; on "that way" Dad lifts his hand and points LEFT, a
  big arrow follows his finger.
- airport: whip-pan left to the Changi control tower and a plane taking off (chip "CHANGI AIRPORT"); Kavya
  deadpan; Dad smug.
- mum: Mum (lower third MUM) and Priya at the other end of the boat, a "TEAM PRIYA" chip; Mum holds up the
  walkie.
- priya: Priya smug (lower third PRIYA), "Bring tissues" chip; Kavya annoyed.
- tiny: documentary zoom on Mr Tan's hand: the brass compass (viewfinder corners, "ZOOM ×" readout).
- hi (TH): Captain Needle's confessional; lower third CAPTAIN NEEDLE; plaque "MAGNETIC COMPASS" with "70
  years at sea".
- north: he points straight up; giant "NORTH." pops; a North arrow on the plaque.
- spin: back to the boat: Ah Boy (lift) holds Captain Needle (small, over the gunwale) and spins him round:
  the whole character turns two full turns while the needle stays pointing up.
- still: the spin stops; chip "still North"; on "south-west" cut to Dad still pointing, a small compass rose
  chip "SW" under his arm; stamp OFF COURSE. Everyone deadpan.
- title: title card (deep sea blue, compass-rose rays); logo "TRUE NORTH" with a compass rose for the O;
  "Episode 14: The Great Ubin Race"; the cast pops in: Mr Tan, Kavya, Captain Needle (pointing up), Dad
  (pointing the wrong way), Ah Boy. Hold.

## 1 lock: Inner and Outer (Measuring & drawing angles)
Layout: `cbIsland('shop')`; the signpost (`cbSignpost(parent, 50, { names: ['JETTY', 'CHEK JAWA'] })`) stands
centre-right, its two arms making an acute 50° angle; a control flag. Humans behind the hedge: Mr Tan (right),
Priya and Kavya, Dad and Ah Boy at a bike with `cbLock`. Inner & Outer (the protractor) hop onto the signpost
vertex. Close-up board (`cbPaper`, right half) for the measuring with `mkProtractor` (r about 200).
Showpiece: the protractor on the angle, the arm crossing at 50 (inner, blue) and 130 (outer, red), and the
two numbers adding to 180.
- clue: chip "Checkpoint 1: bicycle shop"; Mr Tan with megaphone; clue card "lock code = **reflex angle**
  between the arms"; the lock (`cbLock`, '000').
- priya: Priya smug; close-up: protractor on the angle, she reads the red outer scale: `130°`.
- kavya: Kavya reads the blue inner scale: `50°`. Both numbers glow on the protractor.
- outer: Inner & Outer pop up (lower third INNER & OUTER); Outer talks, `130` in red beside him.
- inner: Inner talks, `50` in blue; chip `50° + 130° = 180°` between them; on "thirty years married" Outer deadpan, Inner smug, the chip pulses.
- est: Kavya; the angle is compared with a right-angle corner (`mkAngleMark` right) drawn over it: clearly
  smaller; chips "acute: less than 90°", `50°` ✓, `130°` ✗. The type table (acute / right / obtuse / straight /
  reflex) as a strip of five small chips.
- how: three numbered steps on the card: "1 centre cross on the vertex", "2 baseline along one arm", "3 count
  up from the **0** on that arm"; the protractor moves to show each step.
- dad: Dad (smug) spins the lock to `050`; it rattles but stays shut; Dad's smile melts.
- reflex: Kavya; the reflex angle round the outside of the signpost is shaded with a big arc; "reflex: more than
  180°"; working `reflex = 360° − 50°`.
- code: Ah Boy (lift): `360° − 50° = 310°`; the lock rolls to `310` and springs open (green); stamp ON COURSE.
- partner: Inner, "and to draw `295°`?": `360° − 295° = 65°`: rule an arm, protractor, dot at 65, rule; then the big outside arc
  labelled `295°`, the inside labelled `65°`.
- pun: Mr Tan happy; everyone deadpan; *cricket*. Hold.

## 2 quarry: Madame Compassa (Constructing triangles)
Layout: `cbIsland('quarry')`; humans behind the rail; a big `cbPaper` card (right, x 600-1160) where the SSS
triangle is constructed at 1 cm = 40 px (AB 280 px). Showpiece: Compassa pirouettes on A and B, the two arcs
crossing at C, then triangle ABC with its arcs left showing.
- clue: chip "Checkpoint 2: the quarry"; Mr Tan; card title `AB = 7 cm, AC = 5 cm, BC = 6 cm` and a quick
  labelled sketch (the guide's "sketch first").
- duty: Captain Needle pops up saluting (`point`), happy.
- me: Madame Compassa barges in (lower third), arms up; she shoves Needle aside; Needle annoyed. Chip "a pair
  of compasses".
- sss: "SSS"; rule AB = 7 cm with a ruler (`mkRuler`); Compassa opens to 5 cm (the open angle grows), point on
  A, twirls: arc radius 200 px drawn above AB (`cbArc`).
- sss2: 6 cm, point on B, twirl, arc radius 240 px; the arcs cross.
- c: C appears at the crossing (2.71 cm along, 4.20 cm up from A: px 108.6, 168); AC and BC ruled; labels
  `5 cm`, `6 cm`, `7 cm`; arcs stay visible.
- rub: Dad with a giant eraser, smug, moving towards the arcs.
- never: Compassa `shock` then `annoyed`, blocks him; chip "arcs = your **working**"; Dad sad.
- sticks: Ah Boy (happy) holds up three sticks 3, 4, 8 on the rail: they lie as a base of 8 with two short
  sticks that cannot meet (gap).
- ineq: `3 + 4 = 7 < 8`: two arcs (radius 3 and 4 from each end of 8) that do not reach each other.
- boy2: sticks `3, 5, 8`: flat on the base (`3 + 5 = 8`), then `3, 6, 8`: a real triangle.
- rule: Compassa: rule card "two shorter sides must add to **more than** the longest"; `3 + 6 = 9 > 8` ✓.
- priya: Priya (smug) and Mum with their card: `XY = 8 cm`, `X = 50°`, `Y = 65°`.
- asa: Mum: a table of the three: SSS (three sides, compasses), SAS (two sides + angle **between**: e.g.
  PQ = 6 cm, 40°, PR = 4.5 cm), ASA (two angles + side **between**); ASA highlighted.
- iso: ASA construction: XY 320 px, 50° line at X, 65° line at Y, crossing at Z; working
  `Z = 180° − 50° − 65° = 65°`; the two 65° angles marked equal; `XZ = XY = 8 cm` (tick marks on XZ and XY).
  Hold.

## 3 lunch: Lunch in the middle (Perpendicular bisector & midpoint)
Layout: split screen: Mum and Priya on a walkie in `cbIsland('kampong')` (left inset) vs Team Kavya at the
`'shop'`; then a map card (`cbPaper`, most of the screen) with A (Team Kavya) and B (Team Priya) 9.6 cm apart
(1 cm = 50 px), a mangrove swamp blob in the middle. Showpiece: the arcs above and below from A and B, the line
PQ through M at 90°, and equidistance shown by pairs of equal dashed lines from points on the line.
- noon: chip "12 noon"; the island map with two team flags far apart; tummies rumble.
- fair: Mum on the walkie (lower third MUM if first time): "the same distance from both".
- half: Dad smug, points at the midpoint M.
- swamp: zoom: M is in the MANGROVE SWAMP (a crocodile-free but very muddy blob, a frog); Kavya deadpan.
- arcs: Compassa opens wider than half AB (chip "radius > ½ AB"), point on A: an arc above and an arc below.
- same: point on B, SAME WIDTH (a ruler shows the same radius), arcs cross at P (above) and Q (below).
- pq: rule PQ; right-angle mark at M; tick marks on AM and MB; label "perpendicular bisector".
- equi: three points on the line, each with two equal dashed lines to A and B (equal-length ticks); chip
  "equidistant from A and B".
- am: `AB = 9.6 cm`, `AM = 9.6 ÷ 2 = 4.8 cm`.
- cafe: a café icon on the line (not in the swamp), dashed line to A labelled `5.2 cm`.
- pay: dashed line to B labelled `5.2 cm` (same ticks); Mum smug; Dad sad.
- boy: Ah Boy's own small card: a 7 cm line, compasses at 3 cm: two arcs that stop short of each other with a
  gap; chip "½ of 7 = 3.5".
- wider: `3 cm < 3.5 cm` ✗; then radius 4 cm: arcs cross ✓. Hold.

## 4 shore: The shortest way to the sea (Angle bisector & perpendicular from a point)
Layout: `cbIsland('boardwalk')`; first a top-down card of the 136° fork in the boardwalk; then a top-down card of
the shoreline (a straight line l) with Team Kavya at P. Showpiece: Dad's slanting route vs Kavya's
perpendicular, as a race (two little runner dots), with the right angle at N.
- clue: chip "2 p.m. Chek Jawa"; the boardwalk forks; Mr Tan: the fork as an angle `136°` at vertex O (card); "compasses only" chip.
- bis: Compassa: arc from O cutting both arms at D and E.
- f: equal arcs from D and E crossing at F; ray OF.
- half: Priya: two marks `68°` and `68°`; `136 ÷ 2 = 68`; from a point on OF, two equal perpendicular dashes to
  the arms (equidistant).
- again: Ah Boy: bisect one half: `68 ÷ 2 = 34°`.
- diag: Dad (smug) points diagonally and runs (a dot on a slanting dashed path to X).
- perp: Kavya: chip "shortest = **perpendicular** (90°)".
- gh: arc from P cutting the shore line at G and H; equal arcs from G and H crossing at K below the line.
- pn: rule PK, meeting the shore at N with a right-angle mark; triangle PNX shaded: "PX = hypotenuse > PN";
  Kavya's dot reaches N first; Dad's dot arrives late.
- found: Dad: the lookout tower T, "35 m" chip.
- tower: T is 40 m from the shore along the perpendicular (right angle mark, `40 m`).
- imp: a circle of radius 40 m round T touches the shore at one point only: every point on the shore is at
  least 40 m away; `35 < 40` ✗.
- sea: Dad, sweating, standing in the water up to his chest (bust in the sea). Hold.

## 5 bearings: North, clockwise, three figures (Three-figure bearings)
Layout: `cbIsland('kampong')` with `cbWell` and a control flag; a big card for `cbBearing` diagrams. Captain
Needle stands on the well. Showpiece: the 8-point compass rose building clockwise from North with
`000°, 045°, 090°, ...` and NEVER EAT SOGGY WAFFLES spelled round it.
- card: chip "3 p.m. Checkpoint 5: no map"; Priya holds the clue card "`060°` from the old well"; she scribbles out the first 0 to make `60°`, smug.
- rules: Captain Needle (lower third if first in the scene): three chips "from **North**", "**clockwise**",
  "**three figures**"; `cbBearing` at the well: North line, clockwise arc, arm at 060°, label `060°`; a ship icon
  "Singapore Strait: 060°".
- nc3: Ah Boy: "N-C-3" big.
- feet: Kavya: chip "FROM = FEET": footprints at the well, North line there, the arm to the checkpoint.
- dad: Dad points; an ANTICLOCKWISE arc of `72°` from North (red, `anti: true`).
- anti: stamp OFF COURSE; the clockwise arc sweeps the long way: `360° − 72° = 288°` (`cbBearing` at 288).
- nesw: the compass rose: N, E, S, W pop clockwise with "**N**ever **E**at **S**oggy **W**affles".
- why: Ah Boy disgusted; a soggy waffle chip; hold.
- list: `000°, 090°, 180°, 270°` on the rose; stamp ON COURSE.
- halves: `045°, 135°, 225°, 315°` (NE, SE, SW, NW).
- draw: Mr Tan: "draw `230°`".
- south: `cbBearing` at 230: first the arc to South (180°) then 50° more (two-colour arc); then the alternative:
  `360° − 230° = 130°` anticlockwise (dashed arc). Same line.
- pun: Mr Tan happy, deadpan faces, *cricket*. Hold.

## 6 back: The way back (Back bearings)
Layout: `cbIsland('kampong')` with a drinks stall; a card with the well W and the stall S joined, a North line
at EACH point (parallel). Showpiece: the Z of alternate angles between the two North lines, and the 180° + 65°
turn at the stall.
- four: chip "4 p.m."; Dad and Ah Boy at the stall with ice drinks; `cbBearing` at W: `065°` to S.
- which: Dad on the walkie.
- priya: Priya: `360° − 65° = 295°`; a dashed arm at 295 from S (pointing into the mangroves).
- off: stamp OFF COURSE; the 295° arm is shown as the MIRROR image of 065° in the North line (a mirror flash).
- half: `065° + 180° = 245°`: from S, the arm turns a half turn and points back at W; stamp ON COURSE.
- rule: rule card "Under 180, add it on. 180 or more, take it off." with a mini table 065° → 245°, 120° → 300°,
  200° → 020°, 310° → 130°.
- mum: Mum: `298° − 180° = 118°`.
- why: Ah Boy, hand up.
- par: the two North lines glow, chip "parallel".
- z: the 65° at W and the 65° between South and SW at S (alternate angles) in the same colour, a Z traced.
- sum: at S: arc 180° (North to South) + 65° = `245°`.
- plane: Mr Tan points up: a plane overhead; a runway strip "02" at one end and "20" at the other; arrows
  `020°` and `200°`; `020° + 180° = 200°`; on "the back bearing" Ah Boy happy, hand up.
- knew: Dad smug, Kavya and Ah Boy deadpan. Hold.

## 7 treasure: Dr Shrink's final clue (Scale drawings & maps)
Layout: `cbIsland('hq')`; humans behind the HQ table; the race map (`cbPaper` with scale bar `1 : 25 000`);
then a scale drawing on squared paper (1 cm = 40 px). Showpiece: the two-leg scale drawing with a fresh North
line at the turn, the dashed 7.5 cm shortcut, and Priya's team running the long way.
- five: chip "5 p.m. Race HQ".
- shrink: Dr Shrink pops up on the table (lower third), zaps a real tree: it shrinks onto the map.
- angles: zap a triangle: it shrinks, its angle marks unchanged (`60°` stays `60°`); chip "lengths ÷, angles
  stay".
- scale: map chip `1 : 25 000`: "1 cm (map) → 25 000 cm (real)", "same unit both sides".
- dad: Dad: `9 × 25 000 = 225 000` then "km" in red; Dr Shrink shock.
- moon: a tiny Moon with a dotted line "more than halfway!"; working: `225 000 cm ÷ 100 = 2250 m`,
  `2250 m ÷ 1000 = 2.25 km`.
- rule: two arrows "map → real: × (multiply)", "real → map: ÷ (divide)"; chip `1 km = 100 000 cm`.
- road: Mum: "1.5 km on the map?".
- six: Priya: `1.5 km = 150 000 cm`, `150 000 ÷ 25 000 = 6 cm`; a 6 cm line on the map.
- clue: Mr Tan with the final clue card: `12 m on 040°`, then `9 m on 130°`, scale `1 cm : 2 m`.
- cm: `12 ÷ 2 = 6 cm`, `9 ÷ 2 = 4.5 cm`.
- legs: on squared paper: North line at the tree T, `cbBearing` 040°, leg 6 cm; at the turn U a NEW North line
  (chip "new North line, parallel"), `cbBearing` 130°, leg 4.5 cm to the treasure X.
- short: Priya and Mum run both legs (dots); Kavya rules TX dashed: `7.5 cm`, `7.5 × 2 = 15 m`, bearing about
  `077°` (arc at T); a small check chip "turn = 220° − 130° = 90°"; stamp ON COURSE. In the pause Ah Boy
  reaches the treasure box (`cbWaffles`, lid closed), hands up. Hold.

## 8 goat: Gertie's circle (Loci & special angles: stretch)
Layout: `cbIsland('kampong')`, the garden: Gertie (bust) on the left with her rope to a post; a top-down card
(`cbPaper`) with the post, the 5 m circle (1 m = 30 px), the 10 m rail and the box. Showpiece: the circle
growing into the running-track shape as the rope slides along the rail, reaching the box.
- garden: chip "5:30 p.m."; the treasure box on the grass; Gertie chewing (lower third GERTIE).
- rope: top-down: post, rope `5 m`.
- reach: Ah Boy worried.
- locus: Compassa: the circle radius 5 m sweeps round; label "locus: every point 5 m from the post".
- safe: the box 6 m away, outside; chip `6 m > 5 m` ✓.
- think: dashed circle "less than 5 m: inside"; solid circle "at least 5 m: outside (and on it)".
- rail: the post becomes a 10 m rail; Gertie smug for once.
- track: the region within 5 m of the rail: two straight sides + two semicircles; the box is inside it.
- munch: Gertie at the box: waffles disappearing (`cbWaffles` k 4 → 0). Everyone shock.
- tie: Mr Tan: "Construct `60°`, compasses only".
- sixty: Compassa: arc from A cutting the line at B; same radius from B; crossing C; chip "Euclid, *Elements*,
  Book 1, Proposition 1 (about 300 BC)".
- equi: AB = AC = BC (tick marks): equilateral, `60°`; bisect it: `30°`; a perpendicular: `90°`; bisect it:
  `45°` (four small diagrams in a row).
- share: Mr Tan happy, opens the box: empty.
- what: Gertie, crumbs on her beard, smug. Hold.
- soggy: Ah Boy, both hands on his head: "NEVER EAT SOGGY WAFFLES!" in big letters. Hold.

## 9 traps: The island saves you some marks
- intro: "6 EXAM TRAPS" over the jetty at sunset (`cbBoat` dusk or `cbIsland('hq')`).
- t1 (TH, Inner & Outer): card "acute? then not `130°`: estimate first"; Inner nods.
- t2 (TH, Captain Needle): card "`45°` ✗ `045°` ✓".
- t3 (TH, Kavya): card "FROM = FEET: stand at the point after *from*; turn clockwise".
- t4 (TH, Compassa): card "same width from both ends; keep your arcs"; she hugs her arcs.
- t5 (TH, Dad): card "`225 000 cm = 2.25 km` (not 225 000 km)"; a tiny Moon crossed out.
- t6 (TH, Priya): card: a two-leg journey with a fresh North line at the turn.
- return: logo "TRUE NORTH will return".
- magnet: `cbBoat({ dusk: true })`; chip "6 p.m. The bumboat home"; everybody tired in the bumboat; Ah Boy holds up his fridge magnet (`cbMagnet`) beside Captain Needle.
- southward: Captain Needle's needle swings round 180° to point at the magnet (DOWN the screen: South);
  his eyes go wide (`shock`, then `happy`).
- lovely: Captain Needle `happy`, a tear; sunset glow.
- agrees: Dad points the same way as the needle (at the magnet), smug: "Finally..."; stamp OFF COURSE thumps
  in the pause. Final frame holds.

## Suggested split for the animators
- Writer: cold (done).
- A: lock, quarry, lunch (about 3.6 min).
- B: shore, bearings, back (about 3.6 min).
- C: treasure, goat, traps (about 3.7 min).
