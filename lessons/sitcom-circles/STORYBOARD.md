# EASY AS PI, Ep 16 "The Pi Day Fair": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Circles.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Saturday 14 March 2026 (3.14) is Pi Day, and Mr Tan has spent eleven months planning his school's
PI DAY FAIR in the school hall and on the field. Kavya has been volunteered. Every visitor gets a Pi Passport, and
Mr Tan stamps every answer EASY AS PI or HALF-BAKED. Dad runs DAD'S PI-ZZA and rounds everything ("Close
enough!"); Mum runs MUM'S CAKES; Priya wants every prize; Ah Boy asks the obvious question that is secretly the
hard one. The guest of honour is **Uncle Pi** (he crashed the family photo in Ep 1), who has not stopped talking
since seven a.m.: his digits run in order through the whole episode. In the fair's circles live Rad the radius,
his big brother Dee the diameter, Perry the perimeter ant, Tan Gent the tangent and Sal the sector (a pizza
slice). Stinger: nine p.m., the empty hall, Mr Tan's last pun ("Pies are round!"), and the only person who ever
laughs at his puns, Uncle Pi, is still talking.

Guide sections (lib/topics/circles/guide.ts) by scene: parts-of-a-circle → `parts`; discovering-pi → `pi`;
circumference → `wheel`; area-of-a-circle → `pizza`; semicircles-quarter-circles → `cake`;
compound-circle-shapes → `track`; arcs-sectors (stretch) → `slice`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'pi'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, pi, rad, dee, perry, gent, sal. The narrator is never drawn.
- **Humans are the heart.** They speak about 60% of the lines and are on screen in every scene. The cartoon
  cast are guests at the humans' fair. Busts stand BEHIND a stall table (`ciStall`: characters in `g.mid`), or
  are cut off by the frame edge or a hedge (`ciField`), so the shirt hem is never seen.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Mr Tan is `happy` (Pi Day is his Christmas), `deadpan` at wrong answers, `happy` at his own puns. Dad is `smug`
  before every "Close enough!", then `sad` when stamped. Priya is `smug`, then `annoyed` when she loses. Ah Boy is
  `happy` even when wrong. Mum is brisk (`neutral`, `smug` when right). Kavya is `deadpan` at Dad, `happy` when
  she gets it. Uncle Pi is `happy` and mid-word in every shot. Rad is laid back (`happy`), Dee is `smug` (`shock`
  when told off). Perry is `annoyed` and tired (`sweat`). Tan Gent is `smug` and stiff. Sal is `happy`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill
  a pause with new information.
- **Running gags:**
  1. **Uncle Pi never stops talking.** His ticker (`pi.set({ digits: n })`) scrolls in every shot he is in, and
     the digits he SAYS are the real next digits of π, in order (see the comment above `CHAPTERS`). Keep the
     ticker in step: cold.pi ends at n = 16 (`3.14159265358979`), cold.every 24, pi.divide 32, pi.laugh 40,
     slice.laugh 48, traps.still 60, traps.laugh 68. Between his lines it creeps on slowly (he is muttering).
  2. **Mr Tan's stamp** `ciStamp(parent, ok)`: EASY AS PI (green) on correct answers, HALF-BAKED (red) on wrong
     ones. Mr Tan lifts his rubber stamp (`lift: 1`) and it thumps on the beat. Marked below as [EASY] / [HALF].
     Scale it about 0.45-0.6. Kavya's `ciPassport` can collect the same marks (`g.mark(i, ok, p)`).
  3. **"Close enough!"** Dad, smug, every time he rounds or uses π = 3 (cold.dad, pi.dad, wheel.dad,
     wheel.dadback, track.easy). Each time: a small chip `≈` on his calculator, then [HALF] and Dad goes `sad`.
     Paid off in slice.left (he offers Uncle Pi a 0° slice) and traps.t5 ("Close enough is not close enough").
  4. **Dee barges in** ("Did somebody say twenty? / across?") whenever someone uses the diameter by mistake: he
     slides in from the right, `smug`, arms wide; Rad (`deadpan`) says "D is for Double". In pizza.dee the pizza
     on the board balloons to 4 times the area (scale × 2), then deflates on pizza.small.
  5. **Perry has to walk it.** Whenever a perimeter needs a straight edge, Perry (small, s 0.3-0.4) walks along
     it (`walk: t * 6`), panting (`sweat: 1`), and stops at the edge people forgot.
  6. **Mr Tan's puns** (pi.pun, slice.pun, traps.pun): everyone else goes `deadpan`; Uncle Pi alone laughs
     (`happy`, bounce), then carries on with his digits.
  7. **"No relation."** Mr Tan and Tan Gent side by side (parts.rel), both `deadpan`.
- **Talking heads** (TH below) use `ciConf(root, who)` full stage, the character big (s about 1.3-1.5) at about
  (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `ciLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, formula or step is said, it appears big and clear in the caption's
  exact words: `mkMath` for every expression (`C = πd`, `A = πr^2`, `100 - 25pi`), `mkWorking` for aligned
  working, `mkText` for word + maths lines, `mkCircleParts` for named parts, `mkTable` for the measuring table,
  `mkAngleMark` for 45°, 90°, 120°. Exact answers keep π (`9π`, `50π`), rounded ones use ≈ and say the accuracy.
  Units: lengths in cm or m, areas in cm² or m². Every circle on a diagram is drawn as a real circle with its radius
  or diameter marked. The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. At most ~1,000 elements per scene: build each human once per scene and move or hide it with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`ciLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Volunteered. Not by herself. |
| mum | Mum: brisk, measures twice | magenta kurta, bun, bindi; prop cake server | MUM / Kavya's mum. Cake stall. |
| dad | Dad: confident, rounds everything | glasses, moustache, green tee under a cream PI-ZZA apron; prop calculator | DAD / "Close enough!" |
| boy | Ah Boy, 8: the obvious question that is secretly hard | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Asks things. |
| priya | Priya, 12: competitive, confidently wrong | uniform, bob, yellow clip; prop pencil | PRIYA / Best friend. Wants every prize. |
| tan | Mr Tan: dry, kind, puns; organiser | shirt and tie, glasses, π lanyard; prop rubber stamp (`lift` to stamp) | MR TAN / Maths teacher. Pi Day is his Christmas. |
| pi | Uncle Pi: irrational, never stops talking | brown π body, uncle head, round glasses, moustache, π rosette; digits ticker (`digits`) | UNCLE PI / Irrational. Still talking. |
| rad | Rad, the radius: laid back | orange rod, backwards cap, "r" badge; navy centre dot at his bottom end; `g.len` 160 | RAD / The radius. Centre to edge. |
| dee | Dee, the diameter: show-off big brother | blue rod exactly twice Rad's length, centre dot on his belly, sunglasses up, "d" sweatband; `g.len` 320 | DEE / The diameter. Twice the man. |
| perry | Perry, the perimeter ant: tired, precise | upright red-brown ant, hi-vis vest, trundle wheel; `walk`, `wheel` | PERRY / Perimeter ant. Walks the edge. |
| gent | Tan Gent, the tangent: posh, stiff | dead-straight green rod, top hat, monocle, moustache, bow tie, "90°" badge; touches at his foot point | TAN GENT / A tangent. Touches once. |
| sal | Sal, the sector: cheerful pizza slice | 45° slice, crust arc on top, θ mark at the tip; `ang` opens the wedge | SAL / A sector. Pizza slice. |

## Sets and props (lib.js)

Sets: `ciHall` (wide school hall: stage, banner PI DAY FAIR · 3.14, π bunting, arched windows, clock, four
stalls; `g.door`, `g.stage`, `g.stalls`), `ciStall(parent, { title, col, sub })` (one stall close-up; layers
`g.mid` / `g.front` / `g.top`; `g.tableY` 530; `g.board` pin board; `g.title(str)`), `ciField` (school field,
track band, school block; `g.ground` 560, `g.front`), `ciConf` (talking heads).
Props: `CI_PI` (the digits), `ciStamp`, `ciPassport`, `ciPizza(r, { cuts })` with `g.cut(p)`, `ciSlice(r, deg, { flip })`,
`ciCake(r, 'full' | 'half' | 'quarter')` with `g.ribbon(curve, edge)`, `ciWheel(r)` with `g.set(deg)` / `g.dot()`,
`ciBadge`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkCircleParts`, `mkTable`, `mkAngleMark`, `mkPolygon`,
`mkBrace`, `mkChip`, `mkSpeechBubble`, `mkWhiteboard`, `mkCalculator`, `mkRuler`, `mkHawkerMenu`, `mkDash`/`mkDraw`.
Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `ciHall` wide, slow push towards the stage; Kavya bust foreground left; chips "Kavya, age 12",
  "Saturday, 14 March", "school hall, 8 a.m."; lower third KAVYA, 12.
- tan: cut to `ciStall` "WELCOME · PI PASSPORTS"; Mr Tan behind the table, `happy`, arms up; a calendar page
  "14 MAR" flips to "3.14"; lower third MR TAN. Kavya customer side, foreground left.
- why: Kavya `deadpan`, looking to camera; chip "Saturday."
- passport: the Pi Passport pops onto the table; a big green EASY AS PI stamp demo [EASY] into box 1.
- dad: Dad pops up at the right in his PI-ZZA apron, two pizza boxes, `smug`; chip "π = 3?" by his calculator;
  lower third DAD.
- baked: Mr Tan lifts the stamp; HALF-BAKED thumps onto Dad's pizza boxes [HALF]; Dad `sad`. Hold.
- boy: Ah Boy pops up between them, pointing off right; lower third AH BOY, 8.
- guest: documentary shot of the hall's side door: viewfinder corners, "ZOOM ×" readout; Uncle Pi in the doorway,
  talking to a pot plant, his ticker scrolling.
- pi (TH): Uncle Pi's confessional (lower third UNCLE PI); `3.14159265358979…` written huge on a card, digit by
  digit as he says them; ticker.
- hi: a framed "family photo" (from Ep 1) with Uncle Pi squeezed in at the edge.
- stop: the welcome stall; Ah Boy `shock`, looking at the door.
- never: Mr Tan, `deadpan`; card "irrational: never ends, never repeats".
- every: Uncle Pi on the hall stage, arms wide (ticker hidden in this wide shot); circles everywhere light up (the
  clock, the court circle, the stall roundels, the hoop); chip "every **circle** is mine".
- title: deep-blue title card with rays; logo "EASY AS / PI" with a pie whose slice is missing; "Episode 16:
  The Pi Day Fair"; the cast pops in: Mr Tan, Kavya, Uncle Pi, Dad, Ah Boy. Hold.

## 1 parts: The giant circle (Parts of a circle)
Layout: `ciField`, 9 a.m. A peg on the grass; Priya runs round it holding a rope (the rope IS Rad, lying flat:
rotate Rad about his centre-dot end), drawing a big chalk circle (a flattened ellipse in perspective on the
grass). Then a whiteboard on an easel (right half, x 620-1150) with a big flat circle (`mkCircleParts`, r ≈ 170)
where each part lights up as it is named. Humans: Mr Tan, Priya, Kavya, Mum, Ah Boy (busts behind the hedge
strip `g.front`). Showpiece: Rad and Dee standing side by side (same s): Dee is exactly two Rads; then Rad
rotates about the centre sweeping the circle.
- field: chip "9 a.m."; the field; sign "DRAW A GIANT CIRCLE".
- rope: Mr Tan `happy` with peg and rope; Priya (lower third PRIYA) at the rope's end.
- run: Priya runs the full circle (a chalk line follows her); chip "Fastest circle in Year 8"; Priya `smug`.
- rad: the rope stands up: it is Rad (lower third RAD), centre dot on the peg.
- same: board: circle with centre O; Rad sweeps round, leaving 8 equal radii (all labelled r); chip "same
  distance from the **centre**".
- dee: Dee slides in (lower third DEE) and lies across through the centre; board `diameter` lit; then Rad and
  Dee upright side by side, two Rads stacked against Dee: `d = 2r` big; Rad `deadpan` on "Twice the man".
- chord: Priya `smug`: a circle `r = 6 cm` with her "13 cm" line poking out over the edge.
- nope: Dee: board `chord` lit; `longest chord = diameter = 2 × 6 = 12 cm`; `13 > 12` ✗; [HALF]; Priya `annoyed`.
- perry: Perry (lower third PERRY) walks the circle with his trundle wheel: `circumference` lit, then stops: the
  bit he walked glows as an `arc`.
- gent: Tan Gent (lower third TAN GENT) leans in and touches the circle at one point; the radius to that point
  and a right-angle mark `90°`; `tangent` lit.
- rel: Mr Tan and Tan Gent side by side, both `deadpan`; chip "No relation." Hold.
- sector: Mum (lower third MUM) with a pizza: one slice lifts out; `sector` lit: "two radii + an arc".
- segment: Mum's cake with one straight cut; the cut-off piece slides away: `segment` lit; "chord + an arc".
- mnem: "seCtor reaches the Centre" with the two C's big; the sector's corner at O glows; the segment's doesn't.
- major: the cake's two pieces labelled **minor** / **major**; Ah Boy (lower third AH BOY if not yet) grabs the
  major one, `happy`. Hold.

## 2 pi: Measure a circle, win a prize (Discovering π)
Layout: `ciStall` "MEASURE A CIRCLE · WIN A PRIZE" (blue); Uncle Pi behind the table (he is tall: scale ~0.8 so his
head clears the sign), Kavya and Priya at the side; four objects on the table (coin, mug, plate, bike wheel) and a
`mkTable` board on the right (Object | C (cm) | d (cm) | C ÷ d). Showpiece: the C ÷ d column filling with
3.12, 3.15, 3.14, 3.14 and every row lighting "just over 3" (a small `3 < π < 4` chip under the column).
- ten: chip "10 a.m."; the stall; prize: a giant π plush.
- string: Kavya wraps string round the coin and straightens it against a ruler: row "Coin 7.8 2.5".
- more: Priya fills rows: Mug 25.2 8, Plate 81.6 26, Bike wheel 207.5 66.
- divide: Uncle Pi `happy`, ticker to 32; column header `C ÷ d` glows.
- results: the column fills: 3.12, 3.15, 3.14, 3.14 (2 d.p.); a bracket "just over 3".
- me: `π = C ÷ d` huge; chip "the **same** for every circle"; a coin and a Ferris wheel side by side.
- error: Priya `annoyed` with her string; Mr Tan; chips "stretchy string", "rounded readings" ; the 3.12 and 3.15 wobble towards 3.14.
- dad: Dad pops in, `smug`: `π = 22/7` (stacked) "Close enough!".
- repeat: `22/7 = 3.142857 142857…` with the repeating block underlined twice; `π = 3.14159265…` under it, the
  third decimal place circled; chip "**irrational**: never ends, never repeats"; [HALF] on Dad.
- which: three chips: "calculator: **π button**", "no calculator: **3.14** or **22/7**", "exact: leave **π** in".
- close: Ah Boy, hand up, `neutral`, looking at the circle on the board.
- nobody: Uncle Pi frozen, mid-digit; ticker stops; push in. Hold.
- fine: Kavya points: the circle's line joins up neatly; the digits stream off to the right forever.
- pun: Mr Tan `happy`; everyone else `deadpan`.
- laugh: Uncle Pi alone laughs (bounce), ticker to 40. Hold.

## 3 wheel: Guess the roll (Circumference)
Layout: `ciStall` "GUESS THE ROLL" (green) with Mr Tan's bicycle wheel (`ciWheel`, r ≈ 90) on a stand, then a
floor strip below the table where the wheel rolls one turn, leaving a chalk line with a measuring tape (marks
every 70 cm: d, d, d + a bit). Board on the right for working. Showpiece: the wheel rolling exactly one
circumference: the red valve dot touches the floor again at 219.9 cm, past the 2 m flag.
- eleven: chip "11 a.m."; a sign "GUESS THE ROLL".
- wheel: Mr Tan; the wheel `d = 70 cm`; a flag at **2 m** on the floor strip; "more or less?".
- less: Priya `smug`: chip "LESS".
- dad: Dad: `3 × 70 = 210 cm` "Close enough!".
- roll: the wheel rolls one turn; the valve dot leaves a mark at `π × 70 = 219.9 cm` (past the 2 m flag);
  `C = πd` big; Uncle Pi pops up beside the board.
- short: `219.9 − 210 ≈ 10 cm short`; chip "round **once**, at the **end**"; [HALF] on Dad; Priya `annoyed`
  (she said less).
- cherry: Ah Boy: **C**herry **P**ie **D**elicious → `C = πd` with C, P, D big.
- rad: Rad: `C = 2πr` (because `d = 2r`).
- exact: `C = 2 × π × 4.5 = 9π cm` (r = 4.5 cm circle); chip "**exact**: in terms of π".
- round: `9π = 28.27… ≈ 28.3 cm (1 d.p.)`; sense check `3 × 9 = 27` ✓.
- flyer: Uncle Pi in a Singapore Flyer capsule cut-out; `C = π × 150 ≈ 471 m`.
- pond: Mum with a tape: the school pond, "40 m round".
- dadback: Dad: `40 ÷ π = 12.7 m` "Close enough!".
- dee: Dee barges in, `smug`, lying across the pond: chip "`C ÷ π` = the **diameter**"; [HALF] on Dad.
- back: Kavya: `r = C ÷ 2π = 40 ÷ 2π ≈ 6.4 m`; Rad lies along the pond's radius; [EASY]. Hold.

## 4 pizza: Dad's Pi-zza (Area of a circle)
Layout: `ciStall` "DAD'S PI-ZZA" (red), a menu board (`mkHawkerMenu`: Small 20 cm $12, Large 30 cm $24), Dad and
Ah Boy behind the table, Kavya and Priya at the side, Mr Tan visiting. A big board (right) for the derivation.
Showpiece: the 8 slices (`ciSlice`) flying from the pizza into a point-up / point-down row, then morphing to 16
thinner slices and a clean rectangle `πr` by `r`.
- noon: chip "Noon"; menu highlights both rows.
- same: Priya `smug`: chip "2 × price = 2 × pizza?".
- cut: the pizza shaded "**area**: the space inside"; Dad cuts 8 slices (`ciPizza.cut`); Mr Tan directs.
- wobbly: the slices fly into a row, alternating; Ah Boy `happy`.
- crust: top edge brace "half the crust: `πr`", bottom edge brace `πr`, side "`r`".
- formula: 16 slices, flatter; rectangle; `A = πr × r = πr^2`.
- apple: Ah Boy: **A**pple **P**ies **are too** → `A = πr^2`.
- boy2: Ah Boy on Dad's calculator: `π × 20^2 = 1257`.
- dee: Dee barges in (lower third DEE if not yet), `smug`; the pizza on the board balloons ×2 across (×4 area).
- four: Rad `deadpan`: chip "**D is for Double**: cut him in half first"; `1257 = 4 × 314` small.
- small: `r = 10`, `A = π × 10^2 = 100π ≈ 314 cm²`; the pizza deflates to normal; [EASY].
- calc: Dad: `(π × 10)^2 = 987` on the calculator, `smug`.
- only: `(πr)^2 ≠ πr^2`; chip "square **r** first, then × π"; [HALF]; Dad `sad`.
- large: `r = 15`, `A = 225π ≈ 707 cm²`; `707 ÷ 314 = 2.25`; the large pizza next to 2.25 smalls.
- double: Rad: `π(2r)^2 = 4πr^2`: a circle and its double-radius twin with 4 copies inside.
- back: `r = sqrt(A ÷ π) = sqrt(450 ÷ π) ≈ 12 cm`, so `d ≈ 24 cm`.
- priced: Dad `smug`, then everyone `deadpan`. Hold.

## 5 cake: Half a cake (Semicircles & quarter circles)
Layout: `ciStall` "MUM'S CAKES" (berry); Mum behind the table with cake server; cakes `ciCake(r, 'half')` and
`'quarter'` big on a board at the right with the ribbon (`g.ribbon`); Perry walks the ribbon (s ≈ 0.35).
Showpiece: Perry walking the curved ribbon, reaching the bare straight edge, and sitting down.
- one: chip "1 p.m."; whole cakes `d = 20 cm`; a half and a quarter on plates.
- ribbon: Mum `neutral`; ribbon reel.
- half: Priya: the curved ribbon only: `1/2 × π × 20 ≈ 31.4 cm`; Priya `smug`.
- stuck: Perry (lower third PERRY if not yet) walks the curve and stops at the cut: the straight edge flashes red.
- trace: Kavya: the straight edge ribbon draws: `31.4 + 20 = 51.4 cm`; chip "trace it with your finger".
- exact: `10π + 20` cm; beside it `10x + 20` "can't combine".
- area: the half-cake top shaded: `1/2 × π × 10^2 = 50π ≈ 157 cm²`.
- quarter: Ah Boy `happy`, hand up; the quarter cake; a quarter of a ribbon (too short) dangling.
- legs: Perry on the quarter: two radii flash; Perry `sweat`.
- qcalc: `1/4 × 2π × 10 = 5π ≈ 15.7`, `15.7 + 10 + 10 = 35.7 cm`.
- qarea: `1/4 × π × 10^2 = 25π ≈ 78.5 cm²`; [EASY]; two chips: "**Area**: take the fraction",
  "**Perimeter**: curve + straight edges".
- eat: Ah Boy with a fork.
- wait: Perry still walking round the quarter, slowly. Hold.

## 6 track: One lap (Compound shapes with circles)
Layout: `ciField` with the track; a plan diagram of the track on a whiteboard (two 100 m straights, two
semicircular ends, 60 m across); later the pond plan (two concentric circles). Humans: Dad and Priya on the start
line (busts behind the hedge), Mr Tan with a whistle, Kavya, Mum, Ah Boy. Showpiece: the two semicircular ends
sliding together into one whole circle of diameter 60 m.
- two: chip "2 p.m."; Priya and Dad on the start line.
- track: plan: straights `100 m`, semicircles, `60 m` across.
- easy: Dad `smug`: chip "200 m + a bit".
- push: the two ends slide off the plan and join into one circle, `d = 60 m`.
- lap: `2 × 100 + π × 60 = 200 + 188.5 ≈ 388.5 m`.
- walk: Dad `deadpan`, walking; Priya sprints off. Hold.
- perry: Perry walks the outside of the plan; the dashed join lines inside the track flash and cross out.
- field: the field inside: rectangle `100 × 60` + circle `π × 30^2`; `≈ 8827 m²`; chip "**add** the pieces".
- pond: Mum: plan: pond `r = 3 m`, path `1 m` wide (outer `R = 4 m`).
- wrong: Priya: `π × (4 − 3)^2 = π ≈ 3.1 m²`; a ridiculously thin ring.
- ants: Ah Boy `happy`.
- thanks: Perry walking on the thin ring, `happy`. Hold.
- ring: `π × 4^2 − π × 3^2 = 16π − 9π = 7π ≈ 22.0 m²`; the ring shaded correctly; [HALF] on Priya's, [EASY].
- rule: `π(R^2 − r^2)`; `π(R − r)^2` crossed out. Hold.

## 7 slice: Sal the sector (Arc length & sector area: stretch)
Layout: `ciStall` "DAD'S PI-ZZA" again (the last pizza, `r = 15 cm`, 8 slices); Sal hops out of the pizza and stands
on the table; a board at the right with the sector formulas and angle marks. Showpiece: Sal opening her wedge
from 45° to 120° (`ang`) as Ah Boy asks for a bigger slice.
- three: chip "3 p.m. · STRETCH"; the pizza, `r = 15 cm`, cut into 8.
- sal: Sal (lower third SAL) pops out of the pizza.
- angle: `360° ÷ 8 = 45°`, `45/360 = 1/8`; angle mark at the centre.
- crust: Sal's crust glows: `θ/360 × 2πr = 1/8 × 30π ≈ 11.8 cm`.
- area: Sal shaded: `θ/360 × πr^2 = 1/8 × 225π ≈ 88.4 cm²`.
- pun: Mr Tan `happy`; everyone else `deadpan`.
- laugh: Uncle Pi alone laughs; ticker 48.
- big: Ah Boy `happy`: Sal opens to 120° (`ang`), wobbling.
- third: `120/360 = 1/3`; `1/3 × 225π = 75π ≈ 235.6 cm²`.
- crust2: Priya: `1/3 × 30π = 10π ≈ 31.4 cm`.
- perim: Perry walks crust then both radii: `31.4 + 15 + 15 = 61.4 cm`; Perry `sweat`.
- left: Dad holds up an empty pizza box: a 0° "slice" (a single line); Uncle Pi `shock`, ticker pauses. Hold.

## 8 traps: The fair saves you some marks
- intro: "6 EXAM TRAPS" over the hall.
- t1 (TH, Dee): card "`A = πr^2`: **radius**, not diameter" with `π × 20^2` ✗ and `π × 10^2` ✓.
- t2 (TH, Ah Boy): card "`πr^2` ≠ `(πr)^2`: square **r** first"; Dad's calculator says SORRY.
- t3 (TH, Perry): card: a semicircle, a quarter and a sector with their straight edges in red: "+ straight edges".
- t4 (TH, Rad): card "`C ÷ π = d`, `r = C ÷ 2π`".
- t5 (TH, Dad): card "round **once**, at the **end**"; `π ≠ 3`; Dad sheepish.
- t6 (TH, Mr Tan): card "area: **cm²** · length: **cm**", "**in terms of π**: `9π cm`".
- return: the logo "EASY AS PI will return".
- night: the empty hall at night (darker tint), chairs stacked; chip "9 p.m.".
- still: Uncle Pi alone on the stage, ticker to 60.
- pun: Mr Tan at the door with keys, `happy`: chip "Pies are **round**!".
- laugh: Uncle Pi laughs, ticker to 68, still talking as the lights go down to a single spotlight. Final frame holds.

## Suggested split for the animators
Timeline 11.9 min (cold 71 s, parts 75, pi 90, wheel 85, pizza 96, cake 75, track 75, slice 79, traps 67).
- Writer: cold (done).
- A: parts, track, slice (about 3.8 min; Perry, Rad and Dee on the field and Sal at the pizza stall).
- B: pi, pizza (about 3.1 min; Uncle Pi's stall and Dad's Pi-zza, the two biggest scenes).
- C: wheel, cake, traps (about 3.8 min).
