# SHOW ME THE DATA, Ep 18 "The Great Canteen Vote": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Collecting & Representing Data.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Kavya's secondary school canteen will get ONE new stall: bubble tea, or Auntie Rose's ice kachang.
The principal decides on Friday, and her exact words are "Show me the data." Kavya reports the vote for the
Media Club's student news show **8B NEWS**, filmed in Room 2-14 (also the mop cupboard) and produced by Mr Tan.
Priya, campaign manager for bubble tea, has already "surveyed" her own bubble tea group chat: 100%! Inside the
studio's old beige computer lives the **8B News Fact-Check Desk** and its only detective, **Inspector Axis**: a pair
of axes in a trench coat who has "seen a thousand graphs, kid" and stamps BIASED and MISLEADING on whatever deserves
it. Monday: the survey is planned over dinner. Tuesday: Tally counts the votes; Auntie Rose's queue times get
grouped; a two-way table. Wednesday: Dame Pie presents the results; Stemmy sorts serving times (and loses his
key). Thursday: the Venn twins in the staff room; Ah Boy's Carroll diagram; Lofty the line of best fit at Auntie's
own stall. Friday, live: Priya's posters are busted, the queue times get a frequency diagram and polygons, and the
verdict is ice kachang WITH bubble tea pearls: the overlap. Stinger: Ah Boy's survey ("Who did you ask?" "Me.").

Guide sections (lib/topics/statistics/guide.ts) by scene: data-and-sampling → `survey`; tables → `tally`;
charts → `pie`; stem-and-leaf → `stem`; venn-carroll → `venn`; scatter-graphs → `scatter`;
choosing-and-misleading and continuous-data (stretch) → `spin`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'axis'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, axis, pie, tally, stemmy, vera, nina, lofty.
  The Venn twins are ONE character with two faces: `venn.set({ t, talk: scTalk(S, t, 'vera'), talkB: scTalk(S, t, 'nina'), mood, moodB, look, lookB })`.
- **Humans are the heart.** They speak 58% of the lines and are on screen in every scene. The cartoon maths cast
  are guests in their world: Axis appears on the old PC, Kavya's laptop or phone (`sdDevice`) and the studio wall
  screen, or full stage in his own office (`sdDesk`). Busts always stand BEHIND a desk, counter or table
  (characters in `g.mid` of the set, or in your own layer below `g.front`), so the shirt hem is hidden.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Inspector Axis is `deadpan` always; he raises the magnifying glass (`glass: 1`) when he inspects anything, and
  only once looks `smug` (spin.area). Dame Pie is `smug`, `shock` at "slice" (with `slice: 1`), `happy` with
  `arms: 1` on "the weather". Stemmy is `happy`, `shock` + `key: 0` + `droop: 1` when the key is lost. Vera and
  Nina are `happy`, and `annoyed` with each other over the middle. Lofty is `happy`, `deadpan` at "join the dots".
  Tally is `happy`, `shock` on PANIC. Priya is `smug` before every mistake and `annoyed` after. Kavya is calm and
  fair, `deadpan` at Priya. Mr Tan is `happy` at his own joke; everyone else `deadpan`. Ah Boy is `happy` even
  when wrong. Auntie Rose is loud and `happy`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **The Fact-Check stamp.** `sdStamp(parent, 'biased')` "BIASED" (red) thumps on every unfair sample or
     question: cold.biased (Priya's 100% pie), survey.digest (Ah Boy's 1000 outside the shop), tally.leading,
     traps.closed (Ah Boy). `sdStamp(parent, 'misleading')` "MISLEADING" (orange-red) on scatter.third (BAN ICE
     KACHANG), spin.heights (the 95-axis poster), spin.area (the giant cup). `sdStamp(parent, 'checked')`
     "FACT-CHECKED" (green) on results that check out: tally.fill3, pie.mult, venn.neither, scatter.ninetysix,
     spin.mid. Scale 0.45-0.6. When Axis is in shot, he brings the stamp down with his free hand.
  2. **"Who did you ask?"** Kavya asks it in cold.who (Priya: "my group chat") and traps.who (Ah Boy: "Me.").
     Same framing both times: Kavya on the left, `deadpan`, slow push-in.
  3. **"Check. The. Axes."** Axis says it in cold.charge and spin.axes; each time his own tick marks light up
     yellow one by one (draw a yellow copy of his y-axis ticks over him, or a glow chip "check the axes").
  4. **Stemmy's key.** He loses it in stem.key/lost (`key: 0`, leaves droop) and finds it in stem.found
     (`key: 1`), and the key is the first thing he mentions in traps.t1.
  5. **Dame Pie and the word "slice".** Any "slice" said near her: `shock`, `slice: 1`. pie.slice/dare is the
     payoff; in spin she is seen in the background, guarding her gold slice.
  6. **Priya's loyalty.** Every Priya chart is pro bubble tea and wrong in a new way; she learns by traps.t6.
  7. **Kopi.** Mr Tan always has kopi (`prop: 'kopi'`); the staff room's KOPI machine pays it off (venn.kopi2).
- **Talking heads** (TH below) use `sdConf(root, who)` full stage, the character big (s ≈ 1.3) at about
  (330, 420), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `sdLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, step or word is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`1200 ÷ 60 = 20`, `40 <= t < 50`, `(15+1)/2 = 8`), `mkWorking` for aligned
  working, `mkTable`/`mkTwoWayTable` for tables, `mkTally` for tallies, `mkPie` for pie charts, `mkBarChart` for
  bar charts (build dual and compound bars yourself from rects when mkBarChart does not fit), `mkStemLeaf` for
  stem-and-leaf (the back-to-back diagram is hand-built: left leaves right-aligned and reading outwards),
  `mkVenn` for Venn diagrams, `mkTable` for the Carroll grid, `mkAxes` with `g.point`, `g.line`, `g.seg` for
  scatter graphs, frequency diagrams, polygons and time series. Fractions stacked; inequalities as `≤`/`<`.
  The jokes can be silly; the maths must be exact.
- **Cheap dots:** a crowd of 1200 pupils or 60 sampled dots is ONE path element (`M x,y h6 v6 h-6 Z ...`), not
  1200 circles. Highlights are a second path.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. Aim for ≤ ~1,000 elements per scene (Auntie Rose is ~150 on her own: one instance per scene).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`sdLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: the 8B News reporter; calm, fair, exasperated | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / 8B News reporter. Fair. |
| mum | Mum: brisk, writes the survey questions | magenta kurta, bun, bindi; default prop pencil | MUM / Writes the survey questions. |
| dad | Dad: confident, simple solutions | glasses, moustache, green polo; no default prop | DAD / Votes ice kachang. |
| boy | Ah Boy, 8: pollster; the obvious question that is secretly the hard one | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Pollster. |
| priya | Priya, 12: bubble tea campaign manager; confidently wrong | uniform, bob, yellow clip; default prop phone | PRIYA / Campaign manager. Bubble tea. |
| tan | Mr Tan: Media Club producer; dry, kind, kopi | shirt and tie, glasses; default prop kopi | MR TAN / Maths teacher. Producer. |
| rose | Auntie Rose: trial ice kachang stall; loud, warm, 40 years of shaving ice | curly perm, floral blouse, ROSE'S apron; no default prop | AUNTIE ROSE / Trial stall: ice kachang. |
| axis | Inspector Axis, the Fact-Check Desk: hard-boiled noir detective, deadpan | a pair of axes in a trench coat: y-axis up his back (arrowhead over the fedora), x-axis his long foot, gold "0" badge at the origin; `glass` raises the magnifying glass, `tip` tips the hat | INSPECTOR AXIS / Fact-Check Desk. Checks the axes. |
| pie | Dame Pie, a PIE CHART: theatrical diva, "darling" | four slices, lashes, tiara, pearls, opera gloves; `slice` pulls the gold slice out, `arms` | DAME PIE / Pie chart. 360° of talent. |
| tally | Tally, TALLY MARKS: hyper, counts in fives, panics | four sticks and a red fifth stroke, round face, sneakers; `n` 0..5 strokes, `arms` | TALLY / Counts in fives. Panics in tens. |
| stemmy | Stemmy, a STEM-AND-LEAF potted plant: gentle, forgetful | terracotta pot (face), marker "3 \|", leaves 1 4 4 8, a brass key on a string; `key`, `droop` | STEMMY / Stem-and-leaf. Keeps losing his key. |
| venn | Vera and Nina, the VENN TWINS: two overlapping circles who share the middle | sky-blue Vera (pink bow), amber Nina (green star); two faces (talk / talkB); `mid` glows the overlap | THE VENN TWINS / Vera and Nina. Share the middle. |
| lofty | Lofty, the LINE OF BEST FIT: laid-back, "dude", no dot-to-dot | a long straight orange line, face in the middle, sunglasses on his forehead, balanced dots; `dots`, `tilt` | LOFTY / Line of best fit. No dot-to-dot. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `sdStudio` (Room 2-14: wall screen `g.screen` / `g.scr`, `g.logo`, old PC on the store shelf `g.pc` /
`g.pcScreen`, mop `g.mop`, ON AIR light `g.onAir(p)`, news desk; layers `g.mid` / `g.front` / `g.top`, desk top
530), `sdDesk` (the Fact-Check Desk inside the computer: blinds, door sign, evidence board `g.board` /
`g.boardRect`, lamp; desk top 540), `sdFlat` (dining room at night, table top 540), `sdCanteen` (wide canteen,
banner THE GREAT CANTEEN VOTE, four stalls `g.stalls`, fans), `sdTrial` (the two trial stalls close up, menus
`g.menuL` / `g.menuR`, counter 530, plant corner at x ≈ 1140), `sdStaff` (staff room, KOPI machine, table 540),
`sdHawker` (Rose's Kitchen at night, menu `g.menu`, counter 530), `sdRoseCall` (video call, Rose inside),
`sdDevice(parent, 'laptop' | 'phone' | 'tablet')` (a screen showing Axis at his desk; `g.axis`).
Props: `sdStamp`, `sdCup` (bubble tea), `sdBowl` (ice kachang), `sdStopwatch`, `sdPoster`, `sdNotebook`, `sdPC`.
Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkTwoWayTable`, `mkTally`, `mkPie`, `mkBarChart`,
`mkStemLeaf`, `mkVenn`, `mkAxes`, `mkBrace`, `mkChip`, `mkSpeechBubble`, `mkWhiteboard`, `mkCalculator`,
`mkHawkerMenu`. Lib: `arrow`, `chip`, `tick`, `cross`.

Data used (all checked with node):
- Sample of 60 from 1200: systematic every 20th from 7 (7, 27, 47, …, 1187). Stratified: Sec 1 320, Sec 2 300,
  Sec 3 300, Sec 4 280 → 16, 15, 15, 14 (lower sec 31, upper sec 29).
- Votes: bubble tea 26, ice kachang 22, don't mind 12 (total 60). Pie: 6° each → 156°, 132°, 72°.
- Two-way table: Lower sec 17 / 9 / 5 (31); Upper sec 9 / 13 / 7 (29); totals 26 / 22 / 12 (60).
  Given at the start: Lower BT 17, Lower DM 5, Lower total 31, the column totals and 60.
- Auntie's trial queue waits (s): 34, 47, 52, 28, 41, 39, 60, 45, 33, 50, 38, 44, 29, 55, 40, 48 → classes
  20 ≤ t < 30 … 60 ≤ t < 70: 2, 4, 6, 3, 1 (16). Bubble tea queue (for the second polygon only): 0, 2, 4, 6, 4 (16).
- Auntie's hawker pie: 90° of 200 customers = 50.
- Time series (hundreds of bowls per quarter, Jan–Mar, Apr–Jun, Jul–Sep, Oct–Dec): Year 1 42, 58, 47, 35;
  Year 2 46, 63, 52, 39 (each up 4 or 5).
- Bubble tea serving times (s): 34, 27, 45, 31, 38, 22, 41, 36, 29, 33, 48, 35, 26, 39, 31 →
  2 | 2 6 7 9, 3 | 1 1 3 4 5 6 8 9, 4 | 1 5 8. Median 34 (8th), mode 31, range 26.
  Auntie's (11): 21, 23, 24, 26, 26, 28, 30, 32, 35, 41, 44 → left leaves 2 | 8 6 6 4 3 1, 3 | 5 2 0, 4 | 4 1
  (reading outwards). Median 28 (6th), range 23.
- Teachers: 30; bubble tea 18, ice kachang 12, both 5 → 13 / 5 / 7, neither 5.
- Carroll, 1–20: multiple of 3 and even 6, 12, 18; multiple of 3 not even 3, 9, 15; even not multiple of 3
  2, 4, 8, 10, 14, 16, 20; neither 1, 5, 7, 11, 13, 17, 19 (3 + 3 + 7 + 7 = 20).
- Scatter (°C, bowls): (26, 7), (27, 30), (28, 33), (29, 52), (30, 54), (31, 77), (32, 80), (34, 111). Line of best
  fit through (26, 12) and (34, 108): 12 bowls per degree; 33 °C → 96 bowls; (45 °C would give 240: extrapolation).
- Poster: 102 vs 98 on an axis from 95 → bars 7 and 3 (looks 2.3 times as tall; really 102 ÷ 98 ≈ 1.04).

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `sdStudio`, slow push towards the news desk; Kavya behind the desk rehearsing;
  chips "Kavya, age 12", "Monday morning", "Room 2-14: Media Club studio"; on "Also the mop cupboard" the mop
  topples slowly into frame from the shelves (rotate `g.mop` 0 → 60°). Lower third KAVYA, 12.
- tan: Mr Tan rises in from the left behind the desk, kopi in hand (lower third MR TAN); the wall screen cuts from
  the logo to "BREAKING: ONE NEW STALL" with an `sdCup` and an `sdBowl` and a big "VS".
- words: chip in quotes "Show me the data." pops under the screen; Kavya nods.
- report: Kavya determined; chip **FAIRLY** (green).
- priya: Priya bursts in from the right (lower third PRIYA), phone up; the wall screen shows her chart: a full
  `mkPie([1])` circle, all purple, labelled "100% want bubble tea!".
- who: Kavya `deadpan`, looking at Priya; slow push-in (gag 2).
- chat: Priya's phone grows big: a group chat "BUBBLE TEA FAN CLUB · 43 members" with three chat bubbles
  ("bubble tea!!", "BUBBLE TEA", "obviously"); Tan and Kavya deadpan; hold.
- tiny: documentary push into the old PC on the middle shelf, through the CRT glass, viewfinder corners and a
  "ZOOM ×" readout, into the Fact-Check Desk.
- hi: `sdDesk`, Inspector Axis behind his desk, lamp flickering (lower third INSPECTOR AXIS); he raises the glass on
  "Fact-checker" and tips his hat on "Most of them were lying".
- biased: the evidence board: Priya's 100% pie pinned up; beside it the "population" as a dot grid of 1200 pupils
  (one path), with only a small cluster of 43 purple dots ringed "sample: her group chat"; Axis brings the
  stamp BIASED down on the pie.
- loyal: cut back to the studio: Priya `smug`, hand on heart; Kavya and Tan deadpan; hold the pause.
- charge: Axis fills the studio wall screen, glass to the camera; chips "5 days", "1 canteen", "1200 pupils" on
  the beats; on "check the axes" his y-axis ticks light up yellow one by one (gag 3).
- title: title card: navy with rays; a bar chart in the background whose bars grow FROM ZERO; logo "SHOW ME /
  THE DATA" with a magnifying glass; "Episode 18: The Great Canteen Vote"; the cast pops in: Priya, Kavya,
  Inspector Axis (tipping his hat), Mr Tan, Auntie Rose. Hold.

## 1 survey: Who do we ask? (Data, enquiries & sampling)
Layout: `sdFlat`, dinner; Dad, Mum, Ah Boy and Kavya behind the table (busts at y ≈ 440, x ≈ 170, 400, 640, 870 when
nobody shares the frame with a board; squeeze them to the left half x 120-560 when the right-hand board is up).
Kavya's laptop (`sdDevice 'laptop'`, s ≈ 0.8) on the table shows Axis. Axis's long explanations cut to `sdDesk`
full stage with his evidence board as the board. A "SURVEY PLAN" card (white, x 620-1150, y 110-470) carries the
working in the flat. Showpiece: the 1200-pupil dot grid (40 × 30, one path) lighting every 20th dot from 7.
- cycle: open on the flat with a chip "Monday night: dinner" and Axis on the laptop (Ah Boy waves at it), then cut to `sdDesk`; the board shows a four-box cycle with arrows round it: 1 **Plan**, 2 **Collect**, 3 **Process and
  represent**, 4 **Interpret**, each box lighting on its word; a curved arrow "round again".
- all: Dad `smug` (lower third DAD); card "ask all `1200` pupils".
- census: `sdDesk` board: the 1200-dot grid labelled **population**, then "everyone = **census**"; a dashed box
  around a scattered 60 of them: **sample**, chip "representative: behaves like the population".
- thousand: the flat; Ah Boy, hand up (lower third AH BOY, 8); thought bubble: Ah Boy outside a bubble tea shop
  with "1000 people" queueing (a row of purple cups).
- digest: Axis on the laptop: chip "convenience sample: big, easy, **biased**"; every one of the 1000 is
  holding a bubble tea; stamp BIASED; then chip "**how** you choose > **how many**".
- system: Kavya; the dot grid again: first random dots light up one at a time (seeded `rng`), chip "simple random:
  a computer picks"; then `mkMath` `1200 ÷ 60 = 20`; chip "systematic: every 20th name, from a random start".
- seven: Ah Boy shouts the numbers; the dots 7, 27, 47, 67 light up in the grid (numbered in row order), then the
  rest race along.
- last: `mkMath` `7 + 59 × 20 = 1187`; the last lit dot near the end of the grid; tick "≤ 1200".
- strat: Mum (lower third MUM); a table: Sec 1 320 → 16, Sec 2 300 → 15, Sec 3 300 → 15, Sec 4 280 → 14, total
  1200 → 60; `320 ÷ 20 = 16` highlighted.
- question: Mum's question card with three response boxes: ☐ `$0–$2` ☐ `$2–$4` ☐ `$5 or more`.
- three: Axis (laptop) with the glass; on the card: "per day? per week?" (no time frame), a red ring where the
  `$2` overlaps, and a red "$4.50 → ?" falling into the gap on a number line 0 to 6.
- fixed: the new card: "In the **last 5 school days**, how much did you spend on drinks?" ☐ under `$5` ☐ `$5` to
  `$9.99` ☐ `$10` or more; a number line 0 to 12 split into three touching coloured pieces; green tick.
- types: three chips under three icons, each popping on its beat: "**Name it**: categorical" (a stall sign),
  "**Count it**: discrete" (cups counted 1 2 3), "**Measure it**: continuous" (a stopwatch).
- shoe: Ah Boy `happy`, lifting a foot... (a small sneaker icon), chip "continuous?".
- shoe2: Mum: a shoe-size scale 2, 2½, 3 with jumps (dots, nothing in between) labelled **discrete**; a ruler
  "foot length" with a smooth bar labelled **continuous**; Ah Boy's sneaker with a hole in the toe. Hold.

## 2 tally: Recess with Tally (Frequency, grouped & two-way tables)
Layout: `sdCanteen` wide for the voting; then `sdTrial` close-up with Auntie Rose behind her counter (left) and
Kavya and Priya with clipboards; Tally hops on the counter (`g.top`). Tables on a white card on the right (x
600-1160). Showpiece: Tally physically turning into gates of five as the 60 votes are tallied.
- lead: `sdCanteen`, chip "Tuesday, recess"; a queue of pupils (one path of simple figures) at a VOTE box; Priya at the box, `smug` (lower third PRIYA if not yet in this scene), speech bubble "don't you agree
  bubble tea is the best?".
- leading: Axis on Kavya's phone (`sdDevice 'phone'`); chip "leading question"; stamp BIASED on the bubble.
- tally: Tally bursts in (lower third TALLY), counting: his `n` goes 1, 2, 3, 4, then the red fifth stroke slams
  across on "GATE!"; chip "count in fives".
- votes: a frequency table: Bubble tea `mkTally(26)` 26, Ice kachang `mkTally(22)` 22, Don't mind `mkTally(12)`
  12; the tallies draw themselves; total row `26 + 22 + 12 = 60` ✓.
- rose: `sdTrial`; Auntie Rose (lower third AUNTIE ROSE) waving a notebook of 16 waiting times (listed small, with a chip "groups of ten" and the empty class table beside it:
  34, 47, 52, 28, 41, 39, 60, 45, 33, 50, 38, 44, 29, 55, 40, 48).
- forty: Tally `shock`, sweating, holding a "40" card between two rows.
- ineq: Mr Tan (lower third MR TAN if not yet in this scene); a number line 20-70 with filled dots at the lower
  ends and open circles at the upper ends; the "40" card drops into `40 ≤ t < 50`; "50" slides next door.
- freq: the frequency column fills 2, 4, 6, 3, 1 (each time crossed off the list as it goes in); "Total 16 ✓";
  the 6 row highlighted: **modal class**.
- two: `mkTwoWayTable`-style table (build with `mkTable` so cells can be blank): rows Lower sec / Upper sec / Total,
  columns Bubble tea / Ice kachang / Don't mind / Total; known cells: 17, 5, 31 (lower), 26, 22, 12, 60 (totals).
- fill1: the Lower-sec row highlighted; `31 − 17 − 5 = 9` fills the gap.
- fill2: the Bubble tea column: `26 − 17 = 9`; Ice kachang column: `22 − 9 = 13`.
- fill3: `12 − 5 = 7`; Upper total `60 − 31 = 29`; check `9 + 13 + 7 = 29` ✓; stamp FACT-CHECKED.
- taste: Priya `annoyed`, arms crossed; Rose `happy`; Tally asleep on the counter (n = 5, `still`). Hold.

## 3 pie: Dame Pie presents (Bar charts, pie charts & line graphs)
Layout: `sdStudio`; Kavya and Mr Tan behind the news desk, Priya at the side; Dame Pie appears big on the wall
screen or steps out onto the desk (`g.top`) for her lines. The results are built on the wall screen (or a full
graphic card over the screen area). Rose by `sdRoseCall`. Showpiece: the pie sweeping to 156°, 132°, 72° with the
angles in the slices, then the dual bars sliding together into compound bars.
- pie: chip "Wednesday: rehearsal", ON AIR off; Dame Pie sweeps onto the screen (lower third DAME PIE), arms up; a small sepia "rose diagram" (12 wedges)
  in a gilt frame beside her: "Florence Nightingale, 1858".
- one: `mkMath` `360 ÷ 60 = 6°`; chip "one pupil = 6°".
- mult: aligned working `26 × 6 = 156°`, `22 × 6 = 132°`, `12 × 6 = 72°`; `mkPie([26, 22, 12])` sweeps in with
  labels "Bubble tea 156°", "Ice kachang 132°", "Don't mind 72°" (purple, red, grey); on "Total" the check
  `156 + 132 + 72 = 360°` ✓ and stamp FACT-CHECKED; Priya `smug`, pointing at the purple slice.
- rose: `sdRoseCall` (Rose shouting "Kavya!"); her own pie: ice kachang 90° (a right angle mark) of 200 customers.
- back: `mkMath` `90/360 × 200 = 50`; "50 customers".
- more: the two pies side by side (school pie and Auntie's pie) with the ice kachang slices highlighted, 132° vs 90°.
- totals: Dame Pie: under each pie its total "60 pupils" and "200 customers"; `132/360 × 60 = 22` and
  `90/360 × 200 = 50`; chip "pies show **proportions**, not amounts".
- dual: a dual bar chart: categories Bubble tea / Ice kachang / Don't mind, Lower sec bars 17, 9, 5 and Upper sec
  bars 9, 13, 7 side by side, with a key; axis from 0.
- compound: the upper-sec bars slide on top of the lower-sec bars: compound bars of 26, 22, 12 with the totals on
  top.
- weather: Dame Pie `happy`, arms up; a weather-map swoosh; `sdRoseCall` small in the corner; the time-series graph builds: 8 quarters along the x-axis (Jan–Mar …
  Oct–Dec, Year 1 then Year 2), bowls (hundreds) 0-70 up the y-axis; points 42, 58, 47, 35, 46, 63, 52, 39 joined.
- season: the two Apr–Jun peaks glow (sun icons) and the two Oct–Dec dips get rain clouds; chips "**seasonal**
  pattern", "time along the bottom".
- trend: same-quarter pairs joined by arrows: 42 → 46, 58 → 63, 47 → 52, 35 → 39 (each "+4" or "+5"); a dashed
  rising trend line; chip "trend: **upwards**".
- slice: Priya reaches towards Dame Pie with a fork.
- dare: Dame Pie `shock`, `slice: 1` pulled back then snapped shut, then `annoyed`. Hold.

## 4 stem: Stemmy loses his key (Stem-and-leaf diagrams)
Layout: `sdTrial`, trial afternoon; Priya at the bubble tea side with a stopwatch, Kavya between, Auntie Rose at
her side; Stemmy in the plant corner (x ≈ 1080, on `g.top`), then on the counter. The diagram is built big on a
white card centre-right. Showpiece: the messy list flying into stems as leaves, then sorting themselves.
- times: chip "Wednesday afternoon: trial day"; two `sdStopwatch`es ticking above the stalls; Priya `smug`; the 15 times appear as a messy cloud of numbers; "What's the
  middle one?" with a question mark.
- stemmy: the plant in the corner opens its eyes (lower third STEMMY); a big "34" splits into a "3" (stem) and
  a "4" (leaf).
- leaf: each number flies into an UNORDERED diagram 2 | 7 2 9 6, 3 | 4 1 8 6 3 5 9 1, 4 | 5 1 8, then each row
  shuffles into order: 2 | 2 6 7 9, 3 | 1 1 3 4 5 6 8 9, 4 | 1 5 8 (`mkStemLeaf`).
- key: the key line "Key: 3 | 4 means 34 seconds" writes in; then Stemmy pats his leaves: `key: 0`.
- lost: Stemmy `shock`, leaves droop; three thought bubbles "34?", "3.4?", "340?". Hold.
- median: Kavya; "n = 15", `(15+1)/2 = 8`; the leaves light up one by one in order to the 8th, which is ringed:
  34; chip "median 34 s".
- mmr: chips "mode 31 s" (the two 1s on stem 3 ringed), "range `48 − 22 = 26` s" (the first and last leaves ringed).
- rose: Rose waves her stopwatch; her 11 times.
- btb: the diagram becomes back-to-back: Auntie's leaves on the LEFT, written outwards (2 | 8 6 6 4 3 1, 3 | 5 2 0,
  4 | 4 1), an arrow "reads ←" on the left; new key "1 | 2 | 6 means 21 s for Auntie and 26 s for bubble tea";
  then Auntie's 6th value ringed: "median 28 s"; `44 − 21 = 23`.
- compare: a two-row comparison table: median 28 vs 34 (lower = **faster**), range 23 vs 26 (smaller = more
  **consistent**).
- found: Stemmy finds the key hanging round his own stem (`key: 1`), leaves spring up; `happy`. Hold.

## 5 venn: The Venn twins (Venn & Carroll diagrams)
Layout: `sdStaff`; Mr Tan and Kavya behind the table, Priya beside them; the Venn twins stand on the table (the
twins ARE the diagram: their counts appear on their bodies, then a proper `mkVenn` on the notice-board side).
Then `sdFlat`: Ah Boy and Dad at the dining table with homework; the Carroll grid (`mkTable`) on a card.
Showpiece: the counts landing on the twins' bodies (5 in the shared middle first), then the twins sliding into a
universal-set rectangle with 5 outside.
- staff: chip "Thursday: staff room"; Tan with kopi; card: "30 teachers", "bubble tea 18", "ice kachang 12".
- thirty: Priya `smug`; `18 + 12 = 30`.
- twins: the twins pop onto the table (lower third THE VENN TWINS); Vera talks, Nina waves; the middle glows (`mid`).
- both: `5` lands in the middle; chip "both".
- middle: Nina; chip "Middle first, then outwards!".
- only: Vera `annoyed` at Nina; `18 − 5 = 13` lands in Vera's only-part.
- only2: Nina `annoyed` back; `12 − 5 = 7` lands in Nina's only-part.
- neither: the twins hop into a rectangle labelled "30 teachers" (ξ); `13 + 5 + 7 = 25`, `30 − 25 = 5` written
  outside the circles; stamp FACT-CHECKED.
- twice: `18 + 12 − 5 = 25`; chip "in A or B = in A + in B − in both"; Priya's "30" crossed.
- kopi: Priya puzzled.
- kopi2: all eyes go to the KOPI machine; five tiny teacher heads queue at it; Tan `happy`; deadpan faces. Hold.
- homework: `sdFlat`: Ah Boy (lift) with a worksheet "Sort 1 to 20"; Dad beside him (lower third DAD if not shown).
- carroll: Dad; the Carroll grid (yes / no for each question): columns Even / Not even, rows Multiple of 3 / Not a multiple of 3; numbers drop
  in: 6, 12, 18 | 3, 9, 15 | 2, 4, 8, 10, 14, 16, 20 | 1, 5, 7, 11, 13, 17, 19.
- same: the Venn twins pop up on the worksheet; each grid cell flies to its Venn region (both → middle, neither →
  outside); counts `3 + 3 + 7 + 7 = 20`. Hold.

## 6 scatter: Lofty doesn't do dot-to-dot (Scatter graphs & correlation)
Layout: `sdHawker` at night; Auntie Rose behind her counter with `sdNotebook`; Kavya, Ah Boy and Dad stand behind
the counter with her (Rose let them in to help), so their busts hide their hems.
The graph is an `mkAxes` (x 25-35 °C, unit 40; y 0-120 bowls, unitY ≈ 2.6) on a white card on the right.
Lofty lies ALONG the line of best fit on the graph for his lines. Showpiece: the 8 points dropping in, Lofty
settling onto the trend with 4 points above and 4 below.
- book: chip "Thursday night: Rose's Kitchen"; Rose with the notebook: a table Temp °C 26 27 28 29 30 31 32 34 /
  Bowls 7 30 33 52 54 77 80 111.
- plot: the axes appear ("Max temp (°C)", "Bowls sold"); each pair flies from the notebook to its point.
- uphill: Ah Boy `happy`, finger walking up the points.
- lofty: Lofty slides in (lower third LOFTY); chips "uphill: **positive**", "downhill: **negative**" with two
  tiny example scatters.
- context: chip with the sentence "as the temperature **increases**, sales **tend to increase**".
- dots: Dad `smug`; a red zig-zag joining the dots is drawn...
- nodot: ...and Lofty kicks it away (`deadpan`); he lies along the line through the middle; the points above glow
  blue, below glow orange: "4 above, 4 below"; a crossed-out line through (0, 0) labelled "no need for the origin".
- rate: the points (26, 12) and (34, 108) ringed on the line; a rise/run triangle: "8 °C" along, "96 bowls" up;
  `96 ÷ 8 = 12` bowls per degree.
- forecast: Rose (`sdNotebook` page "Tomorrow: 33 °C"); a dashed line up from 33.
- ninetysix: dashed up from 33 to the line and across to 96; `12 + 7 × 12 = 96`; stamp FACT-CHECKED.
- inter: the data range 26-34 shaded green: "**interpolation**: fairly reliable".
- extra: the x-axis stretches to 45 with a dotted extension of the line off the card; the region beyond 34 shaded red: "**extrapolation**: risky" ("240 bowls?!"); Kavya sweating; the cast
  melting a little (a heat shimmer). Hold.
- neg: two mini scatter graphs: "hot soup" points going downhill (**negative**), "shoe size vs spelling" a random
  cloud (**no correlation**); Ah Boy proud.
- cause: Priya on `sdDevice`-style phone call; her slide "ICE KACHANG CAUSES SUNBURN" with two rising lines.
- third: Axis on the phone; a diagram: "hot sun" at the top with arrows to "ice kachang sales" and "sunburn", a
  dashed line between them "✗ not a cause"; stamp MISLEADING on Priya's slide. Hold.

## 7 spin: Friday, live (Choosing representations & misleading graphs; frequency diagrams, stretch)
Layout: `sdStudio` LIVE (`onAir(1)`); Kavya and Mr Tan behind the desk, Priya at the side with her posters
(`sdPoster`) held up on the left; graphics on the wall screen. Axis on the old PC / wall screen. Showpiece: the
95-axis bars dropping to a 0-axis and becoming nearly equal; the cup doubling into 4 cups' area.
- fri: chip "Friday: LIVE"; ON AIR blinking; a tiny inset of the school hall watching.
- poster: Priya's poster: bar chart with y-axis 95, 96, … 103: bubble tea bar to 102, ice kachang bar to 98
  (looks more than twice as tall).
- axes: Axis on the wall screen, glass up; his ticks light up (gag 3); the poster's "95" at the bottom of the axis
  ringed red.
- heights: braces on the bars "102 − 95 = 7" and "98 − 95 = 3"; chip "looks `7 ÷ 3 ≈ 2.3` times as tall"; chip
  "really `102 ÷ 98 ≈ 1.04`: about 4% more"; stamp MISLEADING.
- zero: the same bars redrawn on an axis from 0: almost equal; green tick.
- cup: Priya's second poster "2 × the likes!": a small ice kachang cup and a bubble tea cup twice as tall and twice as wide.
- area: the big cup's box splits into a 2 × 2 grid of small-cup boxes: `2 × 2 = 4`; chip "4 × the area"; stamp
  MISLEADING; Axis `smug` (his only smile).
- choose2: Kavya to camera; three story cards pop on their beats, "votes per stall", "sales over time",
  "temperature and bowls", each with its chart icon: bar/pie, line graph, scatter graph.
- gaps: Priya's queue-time bar chart with gaps between the bars.
- touch: the x-axis turns into a number line 20, 30, 40, 50, 60, 70 and the bars slide together to touch:
  heights 2, 4, 6, 3, 1; title "frequency diagram".
- mid: "Stretch"; `(20 + 30)/2 = 25`; class midpoints 25, 35, 45, 55, 65 marked; points (25, 2), (35, 4), (45, 6),
  (55, 3), (65, 1) appear on the bar tops, listed beside the graph; stamp FACT-CHECKED.
- poly: the points join with straight lines (Auntie's polygon, red); the bars fade; a second polygon for bubble
  tea (0, 2, 4, 6, 4 at the same midpoints, purple) draws: further right = longer waits.
- verdict: drum-roll; Kavya and Priya hold hands nervously; Mr Tan opens an envelope.
- pearls: `sdRoseCall` / Rose bursts in: an `sdBowl` with a ring of black pearls on top; confetti.
- overlap: the Venn twins pop up on the wall screen hugging, the middle glowing (`mid: 1`) with an ice kachang
  bowl with pearls inside it. Hold.

## 8 traps: The Fact-Check Desk saves you some marks
- intro: "6 EXAM TRAPS" card over the Fact-Check Desk.
- t1 (TH, Stemmy): card "Key: 3 | 4 means 34", leaves in order, "3 | 12 ✗"; Stemmy clutching his key.
- t2 (TH, Rose): card: number line with `40 ≤ t < 50`, "40 → this class"; Rose with a stopwatch.
- t3 (TH, Dame Pie): card "angles: 156° + 132° + 72° = 360° ✓", "frequencies: 26 + 22 + 12 = 60 ✓".
- t4 (TH, Lofty): card with the sentence in quotes and a scatter with a crossed-out dot-to-dot zig-zag.
- t5 (TH, Axis): card: the frequency diagram with touching bars ✓, the same with gaps ✗.
- t6 (TH, Priya): card "biased: WHO is left out? WHY?" with her group chat "43 members" and the rest of the 1200
  greyed out; Priya sheepish.
- return: logo "SHOW ME THE DATA will return".
- monday: chip "Monday"; `sdFlat`.
- survey: Ah Boy, hand up, `happy`, holding a clipboard with a pie chart that is one whole circle "ME 100%".
- who: Kavya `deadpan`, slow push-in (gag 2: same framing as cold.who).
- me: Ah Boy, beaming.
- closed: Axis on Kavya's laptop: chip "sample size: 1"; stamp BIASED on Ah Boy's clipboard; Axis tips his hat.
  Final frame holds: Ah Boy still beaming under the stamp.

## Suggested split for the animators
- Writer: cold (done).
- A: survey, pie (about 3.1 min).
- B: tally, stem, venn (about 3.7 min).
- C: scatter, spin, traps (about 3.8 min).
