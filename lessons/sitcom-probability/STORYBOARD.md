# WHAT ARE THE CHANCES?, Ep 20 "Seventy Per Cent Chance of Game Night": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Probability.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Saturday in Kavya's flat in Block 208. The forecast says a 70% chance of thunderstorms. Dad
says that is a 30% chance of a picnic, and he "has a feeling". It pours all day. Mr Tan, Kavya's maths
teacher, lives one floor up and comes down with his battered game box ("MR TAN'S GAMES, est. 1987"); Priya
comes over to win; Mum runs Family Game Night (Game Morning, then Game Afternoon). Living in the game box is
**Cubert**, a perfectly FAIR dice: theatrical, wounded whenever anyone says "die" ("It sounds so...
final"), and his verdict on every wrong idea is "No. Chance." (a red stamp). Over one rainy day the family
picks the better lucky-dip bag, meets Spinella the biased spinner, orders 24 meal deals from Auntie Rose and
meets Penny, the coin with no memory, runs the two-dice horse race (Ah Boy's horse 1 never moves), lets Venna
the Venn diagram seat Priya's class and Mum's drinks survey, catches Priya's "lucky" dice with Dr Freq, plans
Ah Boy's Spin to Win stall and climbs Uncle Banyan, the tree diagram, for Sunday's weather. Stinger: Sunday,
six a.m., Ah Boy is still rolling for horse 1; Dad sits down beside him with his TOTO ticket; Cubert faints.

Guide sections (lib/topics/probability/guide.ts) by scene: probability-scale → `dip` (and the unequal
spinner at the start of `rain`); complementary-events → `rain`; sample-spaces → `lunch`; combined-events →
`race`; two-way-tables-venn → `venn`; relative-frequency → `trials`; expected-outcomes and tree-diagrams
(stretch) → `night`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'cube'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, cube, penny, spin, venna, freq, banyan.
- **Humans are the heart.** They speak about 64% of the lines and are on screen in every scene (Auntie Rose by
  video call). The cartoon cast are guests in the family's living room. Busts stand BEHIND the coffee table
  (`pbFlat`: characters in your own layer above the set and below `g.front`; bust y about 440, the table top is
  at y 548), so the shirt hem is hidden. Cartoons usually stand ON the table (in a layer above `g.front`, feet
  at about y 548: Cubert's feet are 138 px below his centre at s = 1).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Cubert is `smug` about being fair, `shock` at a wrong idea, `annoyed` when he says "No. Chance.", `sad`
  with arms up (`arms: 1`) whenever someone says "die". Penny is `happy` and blank. Spinella is `smug`
  ("darling"). Venna is `neutral`, brisk. Dr Freq is `neutral`, eager. Uncle Banyan is slow and `neutral`.
  Dad is `smug` right before every wrong prediction, `shock` after. Ah Boy is `happy` even when wrong. Priya
  is `smug`, then `annoyed` when caught. Mum is brisk, `smug` when she wins. Mr Tan is `happy` at his own
  puns; everyone else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never
  fill a pause with new information.
- **Running gags:**
  1. **"No. Chance."** `pbStamp(parent, false)` NO CHANCE (red) thumps on every misconception Cubert rejects:
     cold.no (roll a 7), dip.nochance (TOTO is fifty-fifty), race.pairs (1/11 each). `pbStamp(parent, true)`
     SURE THING (green) on a few clean results: dip.calc (Bag A), rain.green (0.2), venn.only (the check),
     night.check (the ends add to 1). Scale it about 0.6.
  2. **"I have a feeling."** Dad says it (cold.dad, dip.dad, race.dad, night.due; traps.horse is Ah Boy, who
     has caught it). Each time: a distant **lightning flash** in the window (`flat.flash(p)`) and a small
     `pbBolt`; everyone else turns to camera.
  3. **"Die."** Mr Tan (cold.die, race.rules) says "die"; Cubert goes `sad`, arms up, and wobbles (rotate
     ±8°).
  4. **Penny has no memory.** Every entrance is "Hi! I'm Penny! Have we met?" (lunch.penny, night.penny), and
     Cubert answers flatly. She spins (`flip`) when excited.
  5. **The leak.** The ceiling drips into a red pail at the right (`flat.upd` animates it). Mr Tan's puns land to
     silence: a small chip "*drip*" next to the pail and deadpan faces (rain.mnem). It is Mr Tan's bathroom
     upstairs, but nobody says so.
  6. **Horse 1.** From `race` on, Ah Boy's horse 1 sits at the start of lane 1 (`pbTrack`), never moving,
     until the stinger.
- **Talking heads** (a TH mark below) use `pbConf(root, who)` full stage, the character big (s ≈ 1.3) at
  about (330, 400), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `pbLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, probability or step is said, it appears big and clear in the
  caption's exact words: `mkMath` for every expression (`P(red) = 3/8 = 0.375`), `mkWorking` for aligned
  working (equals signs lined up), stacked fractions always (`{{3/8}}`), `mkTable` / `mkTwoWayTable` for
  tables, `mkVenn` for Venn diagrams, `mkTreeDiagram` for the tree, `mkDice` and `mkSpinner` for dice and
  spinners, `mkNumberLine` (0 to 1) for the probability scale. Probabilities are written as fractions,
  decimals or percentages, never as ratios (except Priya's wrong 3 : 8, crossed out). Money as `$80`.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. At most ~1,000 elements per scene: build each human once and move or hide it with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`pbLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Stuck indoors. Half right. |
| mum | Mum: Game Night commissioner, brisk, runs surveys | magenta kurta, bun, bindi; default prop a score sheet (`paper`) | MUM / Game Night commissioner. |
| dad | Dad: confident, wrong, lovable; "I have a feeling" | glasses, moustache, green polo; default prop his phone | DAD / "I have a feeling." |
| boy | Ah Boy, 8: optimist; horse 1; the bottle cap | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Optimist. |
| priya | Priya, 12: competitive, quick, confidently wrong; owns a "lucky" dice | uniform, bob, yellow clip; prop pencil | PRIYA / Best friend. Doesn't play. Wins. |
| tan | Mr Tan: dry, kind, puns; lives upstairs; pedant about "die" | shirt and tie, glasses; prop mug | MR TAN / Maths teacher. Lives upstairs. |
| rose | Auntie Rose: video call from her stall, phone too close | curly perm, floral blouse, ROSE'S apron | AUNTIE ROSE / Rose's Kitchen, Blk 208 |
| cube | Cubert, a FAIR DICE: theatrical, "No. Chance.", never "die" | white cube in three-quarter view, face on the front, pips on top (3) and side (2), gloves, thin legs, gold FAIR rosette; `arms` 0..1 | CUBERT / A dice. Perfectly fair. Never "die". |
| penny | Penny, a COIN with no memory: bubbly, blank | gold disc with milled rim, curl and pink bow, little legs; `flip` 0..1 | PENNY / A coin. No memory. |
| spin | Spinella, a BIASED SPINNER: diva, "darling" | red 150°, blue 90°, green 120° disc, white hub face with lashes, pearls, stand; `arrow` degrees | SPINELLA / A spinner. Biased, darling. |
| venna | Venna, a VENN DIAGRAM: wedding usher, "exactly one region" | universal-set card (ξ) with blue and pink circles, face in the overlap, earpiece, clipboard; `lit` 0..1 | VENNA / Venn diagram. Seats everyone once. |
| freq | Dr Freq, RELATIVE FREQUENCY: eager scientist, "Need. More. Trials." | clipboard with tally marks, goggles on top, lab-coat collar, tally counter; `count` n | DR FREQ / Relative frequency. Needs more trials. |
| banyan | Uncle Banyan, a TREE DIAGRAM: old, slow, wise | banyan tree, branches 2 then 2 (four leafy ends), face on the trunk, aerial-root beard; `glow` path 0..3 | UNCLE BANYAN / Tree diagram. Branches out. Slowly. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `pbFlat` (the living room: rainy window `g.win`, lightning `g.flash(p)`, wall clock `g.clock(h, m)`,
games shelf, fan, sofa, ceiling leak and red pail; layers `g.mid` / `g.front` (coffee table, top y 548) /
`g.top`; `g.tableY` 556; `g.upd(t, rain)`), `pbTableTop` (top-down coffee table with a green felt mat
`g.mat`), `pbBox` (Mr Tan's game box, `g.open(p)`), `pbRoseCall` (Rose's video call from her stall in the
rain), `pbTrack` (the two-dice horse race board: `g.set(i, pos)`, `g.hl(i, p)`, `g.y(i)`), `pbConf` (talking
heads).
Props: `pbBag({ red, blue, label })` (`g.hl(p)` rings the reds), `pbSweet`, `pbStamp(ok)`, `pbForecast`,
`pbToto`, `pbCap` (`g.set(up)`), `pbCup` (`g.set(side)`), `pbBolt`, `PB` palette, `PB_SPIN` (Spinella's
sectors). Math kit: `mkMath`, `mkText`, `mkWorking`, `mkChip`, `mkSpeechBubble`, `mkNumberLine`, `mkDice`,
`mkSpinner`, `mkTable`, `mkTwoWayTable`, `mkVenn`, `mkTreeDiagram`, `mkTally`, `mkBarChart`, `mkBrace`,
`mkWhiteboard`, `mkCoin`, `mkNote`. Lib: `arrow`, `chip`, `tick`, `cross`, `spark`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`, done)
- kavya: `pbFlat`, 8 a.m. on the clock, no rain yet, grey clouds; Kavya behind the coffee table (left); chips
  "Kavya, age 12", "Saturday, 8 a.m.", "Block 208"; lower third KAVYA, 12.
- mum: Mum (centre) lifts her phone; the forecast phone pops large: SATURDAY, storm cloud, **70%**,
  Thunderstorms; chip `P("rain") = 70%`; lower third MUM.
- dad: Dad rises (right) beside a picnic basket on the table, smug; chip `P("no rain") = 30%` and "I have a
  feeling."; lower third DAD.
- likely: Kavya deadpan; a mini probability scale 0 — ½ — 1 (red half, green half) slides in; the marker
  runs to 0.7, label "likely: 0.7". In the pause: LIGHTNING (window and room flash, a bolt), the rain
  starts; Dad shock; Kavya and Mum smug.
- nine: 9 a.m.; heavy rain; chip "9 a.m. picnic: OFF"; a red cross over the basket; Dad sad at the right.
- tan: Mr Tan slides in from the right with his game box (it lands on the table), happy; lower third MR TAN.
- priya: Priya pops up, smug; lower third PRIYA. Kavya deadpan.
- box: documentary zoom into the game box (viewfinder corners, "ZOOM ×" readout); the lid lifts and gold
  light pours out.
- hi (TH): Cubert's confessional; lower third CUBERT; card "ONE DICE, SIX FACES": six mini dice 1-6, each
  labelled `1/6`; chip "each face equally likely".
- die: cut to Mr Tan close-up in the flat; card "one **die**, two **dice** (technically)".
- final: back to Cubert, `sad`, arms flung up, slow push-in; chip "...so final."
- seven: the flat; Ah Boy (hand up), happy; Cubert bouncing on the table mid-roll; lower third AH BOY, 8.
- no: Cubert lands, annoyed; the scale returns with the marker at 0, "impossible: 0"; chip `P(7) = 0`;
  stamp NO CHANCE; Ah Boy shock.
- title: night-blue title card with rain and rays; logo "WHAT ARE THE / CHANCES?" between two dice;
  "Episode 20: Seventy Per Cent Chance of Game Night"; the cast pops in: Mum, Kavya, Cubert (arms up), Dad,
  Ah Boy. Hold.

## 1 dip: The lucky dip (The probability scale)
Layout: `pbFlat`, 10 a.m., rain; Mum (centre) with her score sheet, Ah Boy, Dad, Kavya and Priya behind the
table; the two sweet bags on the table (`pbBag({ red: 3, blue: 5, label: 'A' })` left,
`pbBag({ red: 5, blue: 9, label: 'B' })` right). Cubert stands on the table between them. A board area at the
right half (a `mkWhiteboard` 560 × 400 at about (850, 320)) for the working; the probability scale as a
`mkNumberLine` 0..1 across the top. Showpiece: the two bags as fractions, `3/8 = 0.375` beating
`5/14 ≈ 0.357`, the bags' red sweets ringed in gold.
- lucky: chip "10 a.m."; Mum, brisk; title chip "GAME 1: LUCKY DIP"; chip "**red** wins"; lower third none
  (Mum already introduced).
- bags: the two bags pop onto the table; under each, a count chip: "A: 3 red, 5 blue", "B: 5 red, 9 blue".
- boy: Ah Boy, happy, points at Bag B; Bag B's 5 red sweets ringed (`g.hl`); chip "5 red > 3 red".
- dad: Dad smug, "I have a feeling about Bag B"; lightning in the window; everyone else to camera. Hold.
- frac: Cubert (lower third already shown in cold; none). Board: `P("event") = "favourable outcomes"/"total
  outcomes"` (stacked), then the chip "**Wanted** over **All**".
- calc: `mkWorking`: `P("red from A") = 3/8 = 0.375`, `P("red from B") = 5/14 ~= 0.357`; Bag A glows, a
  small "Bag A ✓" chip; stamp SURE THING (small) on Bag A.
- scale: a number line 0 to 1 across the top (about 860 px): 0 "impossible", ½ "even chance", 1 "certain",
  red to green shading.
- roll: three markers drop onto the scale with mini dice: "roll a 7" at 0, "roll under 7" at 1, "even" at
  ½ with `3/6 = 1/2` (dice 2, 4, 6 highlighted: the outcomes that make the **event** "even").
- priya: Priya smug: `P("red") = 3 : 8` in big red.
- ratio: a cross over `3 : 8`; three green cards: `3/8`, `0.375`, `37.5%`; chip "never a ratio".
- toto: Dad holds up his TOTO ticket (`pbToto`), smug; a split bar "WIN | LOSE" labelled ½ ½.
- nochance: Cubert annoyed; stamp NO CHANCE over the ½ ½ bar. Hold.
- equal: chip "win and lose aren't equally likely"; `13 983 816` combinations (small text "choose 6 of
  1-49"); then big "1 in 14 million"; the WIN slice shrinks to a hair.
- still: Dad, hopeful, kisses the ticket; Kavya deadpan; lightning. Hold.

## 2 rain: Spinella (unequal sectors; complements & mutually exclusive events)
Layout: `pbFlat` then `pbTableTop` close-ups. Spinella stands on the table (s ≈ 0.9) at the right; a large
`mkSpinner(PB_SPIN.map(...))` diagram (r 170) at the left for the slicing; Mum and Kavya behind the table.
Showpiece: Spinella's disc sliced into 12 equal 30° slices, blue's 3 slices lit; then the probability table
with the green gap filling to 0.2 on a bar of length 1 (red 0.25 | blue 0.4 | green ? | yellow 0.15).
- game: Mr Tan with a pineapple tart on a plate, happy; chip "GAME 2: SPIN" and "blue wins a tart".
- spin: Spinella twirls in (pointer spins), lower third SPINELLA; her three sectors labelled red, blue,
  green.
- priya: Priya smug: `P("blue") = 1/3`; "3 colours".
- angles: big spinner diagram: sector labels `150°`, `90°`, `120°`; dashed lines cut it into 12 equal 30°
  slices, one by one.
- slices: blue's 3 slices light up; `mkWorking`: `P("blue") = 3/12 = 1/4`, then `= 90/360 = 1/4`; Priya's
  ⅓ crossed out.
- dad: Dad (smug) points at the window: chip `P("no rain") = 30%`; rain hammers.
- comp: a bar of length 1 split 0.7 (rain, blue) | 0.3 (no rain, gold); `P("no rain") = 1 − P("rain")`
  `= 1 − 0.7 = 0.3`; underneath, small and general: `P("not A") = 1 − P(A)`. On "Wrong picnic": the window flashes; Dad sheepish.
- table: Spinella's cousin, a 4-colour spinner (`mkSpinner` with red, blue, green, yellow); the table (`mkTable`):
  Colour | Red | Blue | Green | Yellow / Probability | 0.25 | 0.4 | ? | 0.15.
- me: Mum: chip "**mutually exclusive**: one colour per spin"; the bar of length 1 builds: red 0.25, blue
  0.4, yellow 0.15, a gap.
- green: `mkWorking`: `"green" = 1 − (0.25 + 0.4 + 0.15)`, `= 1 − 0.8`, `= 0.2`; the gap fills green with
  "0.2"; stamp SURE THING.
- or: red and blue segments glow: `P("red or blue") = 0.25 + 0.4 = 0.65`; chip "can't happen together ⇒
  add".
- mnem: Mr Tan, happy, holds up a T-shirt reading "NOT = 1 −"; deadpan faces; chip "*drip*" by the pail.
  Hold.

## 3 lunch: Twenty-four meal deals (Listing outcomes & sample spaces)
Layout: `pbFlat` with Auntie Rose on a video call (`pbRoseCall`, about 600 × 380, at the right); then
`pbTableTop` for the grids. Penny bounces on the table. Showpiece: the 4 × 3 grid of mains × drinks
(12 cells), each cell splitting into two dessert halves: 24; then the 2 × 6 coin-and-dice grid H1 … T6.
- noon: chip "12 noon"; rain; Dad at the door with an umbrella waiting.
- rose: video call (lower third AUNTIE ROSE): Rose far too close to the camera; a menu card: mains (veg
  fried rice, veg mee goreng, veg laksa, roti prata), drinks (teh, kopi, lime juice), desserts (chendol,
  ice kacang).
- dad: Dad smug: `4 + 3 + 2 = 9` in red.
- kavya: a grid: 4 mains down, 3 drinks across: `4 × 3 = 12`; then every cell splits in two (chendol / ice
  kacang): `12 × 2 = 24`; Dad's 9 crossed out.
- rule: board: "**product rule**: `m` ways then `n` ways → `m × n` ways"; example `4 × 3 × 2 = 24`.
- boxes: Rose shock, then laughs; behind her, six takeaway boxes. Hold.
- penny: Penny bounces onto the table, spinning (flip); lower third PENNY.
- met: Cubert deadpan; a tally chip "met today: 4". Hold.
- grid: Penny flips beside a rolling dice; `pbTableTop`: sample space grid, coin (H, T) down the side, dice 1-6 across: cells H1 … T6 fill
  row by row; chip "2 × 6 = 12 outcomes".
- boy: Ah Boy, happy: three cards "HH", "TT", "one of each" each labelled `1/3`.
- list: a systematic list: first coin H → HH, HT; first coin T → TH, TT (a 2 × 2 grid); chip "4 outcomes".
- order: Penny flips: "HT" and "TH" cards side by side with arrows "heads then tails" / "tails then heads";
  Penny blank, `happy`.
- half: HT and TH highlighted: `P("one of each") = 2/4 = 1/2`; Ah Boy's ⅓ crossed out; a small 6 × 6 grid
  ghosted in: `6 × 6 = 36`.
- bored: Ah Boy deadpan holding his fork; Penny and Cubert look at him. Hold.

## 4 race: The two-dice horse race (Probability of combined events)
Layout: `pbTableTop` with the race board (`pbTrack`, len 8) on the left (x 140-660) and the 6 × 6 grid of
totals (`mkTable`, cells 56 px) on the right; cut back to `pbFlat` for the picks and reactions. Showpiece:
the 6 × 6 grid, the long diagonal of 7s lighting up one cell at a time, and horse 7 surging while horse 1
never moves.
- two: chip "2 p.m."; the board appears; title chip "TWO-DICE HORSE RACE".
- rules: Mr Tan (happy) explains; two dice roll on the felt; on "die", Cubert (on the table) wobbles, arms
  up, sad.
- boy: Ah Boy, hand up: lane 1 highlighted; chip "horse 1".
- dad: Dad smug: lane 12 highlighted; lightning in the window; others to camera.
- priya: Priya smug: lane 7 highlighted. Hold.
- eleven: Dad: a row of 11 totals 2 … 12, each labelled `1/11`.
- pairs: Cubert annoyed; stamp NO CHANCE over the `1/11` row; the 6 × 6 grid of totals builds (red dice down
  the side, blue across the top); chip "36 ordered pairs, equally likely".
- seven: the six 7-cells light up along the diagonal as Kavya counts them; `P(7) = 6/36 = 1/6`.
- twelve: the single 12-cell (6, 6) lights in the corner: `P(12) = 1/36`; Dad's face falls.
- one: Ah Boy, curious; lane 1 glows; "total 1?" thought bubble.
- never: no cell in the grid says 1; `P(1) = 0`, "impossible"; Ah Boy still happy. Hold.
- bonus: Mum with a whistle: chip "house rule: a **6** on either dice = bonus move"; question
  `P("at least one 6")`.
- count: the 6-row (6 cells) and the 6-column (6 cells) light; (6, 6) flashes as counted twice;
  `6 + 6 − 1 = 11`.
- comp: the 5 × 5 block with no six is outlined: `5 × 5 = 25`; `mkWorking`: `P = 1 − 25/36 = 11/36`.
- end: chip "4 p.m."; the race board: horse 7 crosses the line, horse 12 one square along, horse 1 still at
  the start; Ah Boy cheering anyway. Hold.

## 5 venn: Venna seats everyone (Two-way tables & Venn diagrams)
Layout: `pbFlat`, late afternoon; Venna on the table beside a big `mkVenn` (w 620, h 400) on the right; later
Mum's two-way table (`mkTwoWayTable`) in the same spot. Showpiece: the Venn diagram filling from the overlap
outwards (10, then 8 and 5, then 7 outside), and the two-way table where the denominator changes from 80
(whole table glows) to 40 (only the Child row glows).
- puzzle: Priya smug: chip "class of **30**: 18 badminton, 15 chess, 7 neither".
- boy: Ah Boy: `18 + 15 + 7 = 40`; thirty chairs, forty cartoon kids squeezing. Hold.
- venna: Venna walks on with her clipboard (lower third VENNA); an empty Venn: ξ, "badminton", "chess".
- fill: "neither" region gets 7; `30 − 7 = 23` "play at least one".
- both: `18 + 15 = 33`; `33 − 23 = 10`; 10 drops into the overlap (Venna `lit: 1`); chip "counted twice".
- only: `18 − 10 = 8` (badminton only), `15 − 10 = 5` (chess only); check `8 + 10 + 5 + 7 = 30` ✓; stamp
  SURE THING.
- or: both circles glow (overlap once): `P("badminton or chess") = (8 + 10 + 5)/30 = 23/30`.
- formula: board: `P("badminton") + P("chess") − P("both")`, `= 18/30 + 15/30 − 10/30 = 23/30`; underneath,
  small and general: `P("A or B") = P(A) + P(B) − P("A and B")`.
- survey: Mum with her clipboard: the two-way table builds: rows Adult, Child; columns Hot, Cold, Total;
  22, 18, 40 / 6, 34, 40 / 28, 52, 80.
- q1: chip "pick **anyone**"; the whole table outlined.
- a1: cell 34 and grand total 80 glow: `34/80 = 17/40`.
- q2: chip "pick a **child**"; only the Child row stays bright.
- dad: Dad smug: `34/80` in red.
- a2: cross over Dad's; the Child total 40 glows: `34/40 = 17/20`; chip "÷ the group you choose from".
- hot: Mum smug, hands Dad a kettle; Dad deadpan. Hold.

## 6 trials: Need. More. Trials. (Experiments & relative frequency)
Layout: `pbFlat`, evening; Ah Boy dropping a bottle cap (`pbCap`) at the left end of the table all scene
(a running background action, a tally behind him growing); Dr Freq on the table, his counter counting. A
board on the right for the dice test (`mkBarChart` of the 300 rolls with a dashed line at 50). Showpiece: the
relative-frequency graph of the cap settling (0.7 → 0.41 → 0.384) and the dice bar chart with the 95 tower.
- cap: chip "5 p.m."; Ah Boy with the cap.
- boy: Ah Boy: two cap pictures "top up" / "top down", each `1/2`.
- freq: Dr Freq pops up (lower third DR FREQ), counter clicking; chip "Need. More. Trials."
- formula: board: `"relative frequency" = "times it happened"/"number of trials"`.
- ten: the cap drops 10 times (counter 10); tally 7 top up: `7/10 = 0.7`.
- accuse: Dad points at Priya's red dice; chip "Priya: won every game".
- test: board: "300 rolls"; `1/6 × 300 = 50` expected each; a dashed line at 50 on an empty bar chart.
- results: bars grow: 41, 44, 39, 42, 39, then 95 shoots up past the line; Priya smug, then shock.
- bias: `95/300 ~= 0.32` vs `1/6 ~= 0.17`; chip "big gap, 300 rolls ⇒ **biased**".
- lucky: Priya annoyed, clutching the dice; Dad smug. Hold.
- cup: a paper cup (`pbCup`) tips on its side; a table: Kavya 9/20, Ah Boy 18/50, Priya 47/130.
- pool: Dr Freq: "average" crossed out (0.45, 0.36, 0.36 → 0.39); pooled: `9 + 18 + 47 = 74`,
  `20 + 50 + 130 = 200`, `74/200 = 0.37`.
- eight: chip "8 p.m."; Ah Boy surrounded by tally marks; counter 1000.
- settle: a line graph of relative frequency against trials (10, 100, 1000): 0.7, 0.41, 0.384 settling;
  labels at each point.
- law: chip "**more trials, better estimate**"; `P("top up") ~= 0.38`, `1/2` crossed out. Hold.

## 7 night: Spin to Win, and Uncle Banyan (Expected outcomes; tree diagrams, stretch)
Layout: `pbFlat` at night (darker window); Ah Boy's stall sign "SPIN TO WIN $1" on the table with his
5-sector spinner (`mkSpinner` 5 sectors, one gold). Then Uncle Banyan grows behind the table on the right,
beside a `mkTreeDiagram` (w 620, h 420). Showpiece: the money sum ($200 in, $120 out, $80 left) and the tree
diagram with its four leaves multiplying out to 0.49, 0.21, 0.21, 0.09.
- nine: chip "9 p.m."; Ah Boy with a cardboard sign.
- stall: the 5-sector spinner, one gold sector "WIN $3"; chip "$1 a go".
- rule: Mum's question chip "how many winners?"; Cubert (arms up, proud): board "expected number = probability × number of trials"; chip "**P
  times the tries**".
- forty: chip "200 players"; `P("win") = 1/5`; `1/5 × 200 = 40` winners; 40 little trophies.
- money: `mkWorking`: `200 × $1 = $200`, `40 × $3 = $120`, `$200 − $120 = $80`; notes slide in.
- promise: Mr Tan: chip "a **prediction**, not a **promise**"; "about $80" with a wobbling "?" (35 winners,
  47 winners flicker as possible results).
- back: Mum: "expect 80 reds in 200 picks"; `P("red") = ?`.
- backa: `P("red") = 80/200 = 0.4`.
- fore: Mum's phone forecast: SUNDAY 70%, MONDAY 70%.
- due: Dad points at Penny: five H coins in a row, then "T?" glowing; lightning; Dad smug.
- penny: Penny flips in, blank, happy. Hold.
- memory: Cubert: `P("tails") = 1/2` on every flip; chip "**independent**: no memory".
- banyan: Uncle Banyan rises slowly (lower third UNCLE BANYAN); the tree's first stage: Rain 0.7, Dry 0.3;
  chip "branches add to 1".
- and: second stage branches draw; the Rain-Rain path glows (`g.hl(0)`, Banyan `glow: 0`):
  `0.7 × 0.7 = 0.49`; chip "**AND**: multiply".
- one: the Rain-Dry and Dry-Rain paths glow: `0.7 × 0.3 = 0.21`, `0.3 × 0.7 = 0.21`, `0.21 + 0.21 = 0.42`;
  chip "**OR**: add".
- check: all four products at the leaves: `0.49 + 0.21 + 0.21 + 0.09 = 1` ✓; stamp SURE THING.
- sweets: a bag: 3 strawberry (pink), 2 lemon (yellow); Ah Boy eats one strawberry; the bag now 2 + 2;
  chip "**without replacement**: the second branch changes".
- dep: a mini tree: `3/5` then `2/4`; `3/5 × 2/4 = 3/10`.
- all: Ah Boy eats the rest, happy; `P = 1`. Hold.

## 8 traps: Game Night saves you some marks
- intro: "6 EXAM TRAPS" over the rainy window.
- t1 (TH, Priya): card "`3/10`, `0.3` or `30%`", "`3 : 10` ✗".
- t2 (TH, Dad): card "P > 1? ✗ Check your working." with the scale 0 to 1 and a marker flying off the end.
- t3 (TH, Penny): card "HH, **HT**, **TH**, TT: 4 outcomes"; Penny blank.
- t4 (TH, Mum): the two-way table with the Child row: "a child is chosen: `34/40`, not `34/80`".
- t5 (TH, Venna): the Venn with the overlap lit once: "this or that: `8 + 10 + 5`, not `18 + 15`".
- t6 (TH, Dr Freq): card "pool: `74/200 = 0.37`; don't average".
- return: the logo "WHAT ARE THE CHANCES? will return".
- sunday: chip "Sunday, 6 a.m."; sunshine in the window; the pail overflowing.
- night: Mum in her dressing gown, shock.
- horse: Ah Boy at the table, red-eyed, rolling two dice; the race board: horse 1 still at the start.
- son: Dad sits beside him with his TOTO ticket; both hopeful.
- zero: Cubert on the table: "Total of one. Probability... zero." and slowly tips over backwards (rotate
  0 → −90 about his feet); thunder from a clear sky (one last flash). Final frame holds: Cubert flat,
  horse 1 at the start.

## Suggested split for the animators
- Writer: cold (done).
- A: dip, rain, lunch (about 3.7 min).
- B: race, venn, traps (about 3.9 min; traps reuses the race board, the Venn and the two-way table).
- C: trials, night (about 3.3 min; night is the longest scene).
