# WHAT COMES NEXT?, Ep 11 "Festival of Lights": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Sequences & Functions.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** It is Deepavali. Mum is hosting the family's first open house in their HDB flat, Block 208, #08-14:
seven o'clock SHARP, forty guests, everything perfect. Dad has bought $9.90 fairy lights with PATTERN MODE
("I have a system"). Living in the little controller box (NEXTA-LITE) is **Madame Nexta**, a fortune teller who
IS a term-to-term rule: she always sees the NEXT term, and only the next term. Ah Boy asks her for the hundredth
term of 2, 4, 6; she starts counting, one step at a time, and is still counting at 11 p.m. Over one afternoon
in the corridor and the living room: Priya tests Nexta with fractions and decimals (and 1, 2, 4 fits two rules);
Ah Boy's ice-cream-stick door border needs 31 sticks, not 40; **Enn** (little n, the position, a cinema usher)
jumps straight to the 50th gold bulb with 3n − 2 and refuses to seat a two-and-a-halfth guest; **Zed**, the zero
term (one step before every sequence; nobody invites him), teaches "step back, then build"; bulb 200 is not gold
(n = 67.33…) and the 22nd family gets minus four murukku; Mum's Deepavali greeting goes geometric while Paati's
murukku tin shrinks geometrically; Auntie Rose's sunflowers are Fibonacci and Mr Tan's laddoo triangle holds 55;
**Mac** the function machine teaches "shoes off before socks"; Paati's kolam is quadratic. At seven the lights
work, and Mum invites the zero term in. Stinger: at 11 p.m. Nexta reaches TWO HUNDRED; Ah Boy asks for the
thousandth; she says "two hundred and two".

Guide sections (lib/topics/sequences-graphs/guide.ts) by scene: term-to-term → `sticks`; using-nth-term → `enn`;
finding-nth-term → `zero`; is-it-a-term → `bulb`; special-sequences → `family`; functions → `machine`;
quadratic-sequences (stretch) → `kolam`. Exam mistakes → `traps`.
Misconceptions on screen: n + 3 for 5, 8, 11 (zero.dad); 4n at n = 2 read as 42 (enn.priya); 4n + 16 for 20, 16,
12 (zero.easy); "goes on forever so it hits every number" (bulb.forever); reversing a machine in forward order
(machine.priya); "geometric always gets bigger" (family.bigger). Mnemonics: "Step back, then build", "Shoes off
before socks", "Arithmetic Adds, Geometric Gets multiplied", "Halve the second". Real world: taxi fare 0.6n + 4,
a triangular stack (55), sunflower spirals 34 / 55, doubling forwards. Extras: 3n + 1 sticks, the odd numbers
build the squares (kolam.L), sunflower Fibonacci.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'nexta'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, paati, rose, nexta, enn, zed, mac.
- **Humans are the heart.** They speak over half the lines (71 of 135) and are on screen in every scene. The
  cartoon maths cast are guests in their flat. Busts stand BEHIND the corridor railing (`nxCorridor`, top at
  `g.railY` 545) or the sweets table (`nxLiving`, `g.tableY` 540): characters in `g.mid` (or your own layer below
  `g.front`), so the shirt hem is hidden. A bust at y ≈ 440-460 (s ≈ 1) sits right.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Madame Nexta is `smug` and theatrical (`hands: 1` while she "sees"), `happy` when right, `shock` at a hard
  question, `annoyed` when she has to count. Enn is brisk `neutral`, `annoyed` at decimals in positions, points
  his torch (`point: 1, torch: 1`) at whatever he is checking. Zed is `sad` until he is invited (`invited` 0 → 1:
  colour floods in, hat perks up, sparkler lights). Mac is `deadpan`; on ERROR his window lights go red-yellow.
  Dad is `smug` right before every mistake. Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed`.
  Paati is calm `happy` and always right. Mum gets more `shock`ed as seven o'clock approaches. Mr Tan is `happy`
  at his own pun; everyone else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **Nexta counts to the hundredth term.** She can only step. Her ball shows the VALUE, her purple progress
     bar shows the POSITION: cold.count (values 8 … 16, "term 8 of 100"), enn.done (a cutaway: "term 9 of 100"),
     bulb.still (values 98, 100, 102: "term 51 of 100", half way), traps.reach (200: "term 100 of 100").
     A tiny corner widget can show her progress in other scenes (her box window in a corner), optional.
  2. **"I have a system."** Dad says it before each mistake (cold.system, zero.dad); after cold.system everyone
     turns to camera with a "famous last words" chip. At kolam.works he finally gets to say "I TOLD you".
  3. **The pattern check** (the stamp-style gag): `nxStamp(parent, false)` "PATTERN BROKEN" (red) thumps on every
     wrong pattern AND the fairy lights go `bzzt` (flicker, then dark): sticks.sticks (40), enn.priya (43),
     enn.rich (48), zero.dad (n + 3), zero.easy (4n + 16), machine.priya (7.25), kolam.broken (Priya's false
     alarm: here the stamp is crossed out by Paati's line, "look between the gaps"). `nxStamp(parent, true)`
     "PATTERN FOUND" (green) + lights `ripple` on correct rules: sticks.rule, enn.fiftieth, zero.build,
     zero.minus, kolam.n2, kolam.lights. Scale about 0.5.
  4. **Nobody invites the zero term.** Zed is waiting outside the door from the end of enn (enn.whole) onwards (a pale figure by
     the door in corridor shots). kolam.come: Mum invites him; he turns gold.
  5. **Mr Tan's pun** (family.pun) lands to silence: a tiny green "*cricket*" chip and deadpan faces.
  6. **Mum's countdown clock**: each scene opens with a time chip ("2:15 p.m.", "3 p.m.", … "7 p.m.") and the
     living-room clock (`g.clock(h, m)`) shows the time.
  7. **Paati calls everyone "kanna"** (dear) and is never wrong.
- **Talking heads** (TH below) use `nxConf(root, who)` full stage, the character big (s ≈ 1.4) at about (330, 410),
  REC blinking (`conf.set(1, t)`). The first time a character appears anywhere in a scene's story, show
  `nxLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, rule or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`3n − 2`, `n/2 + 1` stacked, `2²³`, `f⁻¹(x) = (x + 3)/4` stacked),
  `mkWorking` for aligned working (equals signs lined up), `mkTable` for position/term tables, `mkNumberLine`
  for the 199 / 200 / 202 skip, `mkAxes` for the zero-term graph, hops (`arrow` with `bend`) for "+3" between
  terms. Sequences are written with commas and spaces (`5, 8, 11, 14`). Money as `$4.60`. Fractions stacked.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. Aim for at most ~1,000 elements per scene (the corridor set is about 330 with its 30 bulbs:
  build it once per scene and reuse).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`nxLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Five hours to the open house. |
| mum | Mum: host, stressed, competitive about greetings | magenta kurta, bun, bindi; default prop phone | MUM / Host. Seven o'clock sharp. |
| dad | Dad: confident, wrong, lovable; "I have a system" | glasses, moustache, BLUE festive kurta; empty hand (`nxHandProp(dad.hand, 'coil')` lights) | DAD / "I have a system." |
| boy | Ah Boy, 8: asks the obvious question that is secretly the hard one | ORANGE kurta; `lift: 1` raises his hand (`nxHandProp(boy.hand, 'sticks')`) | AH BOY, 8 / Kavya's brother. Asks the big ones. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; pencil | PRIYA / Best friend. Does not believe in fortune tellers. |
| tan | Mr Tan: upstairs neighbour, dry, puns | shirt and tie, glasses; `nxHandProp(tan.hand, 'laddoos')` | MR TAN / Maths teacher. Lives upstairs. |
| paati | Paati: Kavya's grandmother, calm, kolam expert, "kanna" | silver bun with jasmine, round gold glasses, green kurta, bindi; `nxHandProp(paati.hand, 'tin')` | PAATI / Kavya's grandmother. Kolam expert. |
| rose | Auntie Rose: loud, warm, a guest | curly perm, floral blouse; `nxHandProp(rose.hand, 'sunflowers')` | AUNTIE ROSE / Rose's Kitchen, Blk 208 |
| nexta | Madame NEXTA, the TERM-TO-TERM RULE: theatrical fortune teller, sees only the next term | purple turban, feather, gold jewel, lavender face, hoops, teal starry shawl, crystal ball (`ball: '8'` shows a number), `hands`, `glow` | MADAME NEXTA / Term-to-term rule. Sees the next term. |
| enn | ENN, little n, the POSITION: brisk cinema usher; "positions, please"; whole numbers only | royal-blue lowercase n on two legs, red pillbox cap, gold bow tie, torch (`torch`, `point`) | ENN / Little n. The position. Usher. |
| zed | ZED, the ZERO TERM: lonely, polite, one step before the first term | pale see-through grey "0" in a drooping party hat, unlit sparkler; `invited` 0..1 | ZED / The zero term. Not invited. |
| mac | MAC, the FUNCTION MACHINE: deadpan robot; one input, one output | teal cabinet, INPUT hopper, two operation windows (`ops`, `hl`, `rev`), OUTPUT tray (`out`), striped socks and red shoes (`socks`, `shoes`) | MAC / Function machine. One input, one output. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `nxCorridor` (8th-floor common corridor outside #08-14: door with a mango-leaf toran, brass number plate,
window with grilles, shoe rack, plants, fairy lights along the wall `g.lights`, the NEXTA-LITE box `g.box` at
`g.boxXY`, the railing in front; layers `g.mid` / `g.front` / `g.top`; `g.upd(t, night)`), `nxLiving` (living
room: window, marigold garland, family photo, wall clock `g.clock(h, m)`, brass lamp, purple sofa, lights
`g.lights`, the sweets table in front with `g.tableY` 540; `g.upd(t, night)`), `nxFloor` (top-down corridor
floor for the kolam), `nxBoxStage` (inside the box: a tiny theatre, curtains `g.curtain(p)`, `g.curt`),
`nxConf` (talking heads).
Props: `nxLights` (modes on / off / ripple / bzzt / gold / chase; `g.mark(i, text)` number tags), `nxBox`,
`nxSticks(n)` (ice-cream-stick squares, `g.set(k, hl)`), `nxDiya`, `nxKolam(n)` (n × n dots + a lamp, `g.L(p)`),
`nxMurukku`, `nxTin`, `nxLaddoo`, `nxLaddooStack(rows)`, `nxSunflower`, `nxPhone`, `nxTaxiMeter`, `nxStamp`,
`nxSparkle`, `nxHandProp(hand, kind)`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkNumberLine`,
`mkAxes`, `mkChip`, `mkSpeechBubble`, `mkThoughtBubble`, `mkWhiteboard`, `mkCalculator`. Lib: `arrow`, `chip`,
`tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `nxCorridor`, slow push towards the door; Kavya behind the railing; chips "Kavya, age 12",
  "Deepavali, 2 p.m.", "Blk 208, 8th floor"; lights off; lower third KAVYA, 12.
- mum: Mum bursts out of the door (shock, phone raised); chips "open house: **7 p.m. SHARP**", "**40** guests";
  a TO DO card: lights / kolam / murukku (empty boxes); lower third MUM.
- system: Dad rises at the right with a coil of fairy lights, smug; chip "**PATTERN MODE** · $9.90"; the lights
  start to ripple; lower third DAD. Pause: Mum and Kavya turn to camera, deadpan; chip "famous last words".
- box: close-up of the NEXTA-LITE box on the wall (scale 2.6); Kavya in the corner pointing; speech bubble
  "Madame **Nexta** predicts your next light."
- tiny: documentary zoom (viewfinder corners, REC dot, "ZOOM ×") into the crystal-ball logo.
- hi: inside the box: the red curtains open on Madame Nexta behind a star-cloth table; hands wave over the ball;
  plaque "TERM-TO-TERM RULE / sees the next term"; lower third MADAME NEXTA.
- test: corridor, Kavya at the wall, smug; a card `2,  4,  6,  ...`.
- eight: Nexta (left) and a scroll (right): `2  4  6  ?`, three purple hops "+2" in turn, "rule: **add 2**";
  her ball shows **8** and the "?" becomes a green **8**.
- boy: corridor: Ah Boy pops up, hand raised; chip "term number **100**?"; Kavya shock; lower third AH BOY, 8.
- count: Nexta, shocked, then counting: the ball and the scroll tick 8, 10, 12, 14, 16 with "term 4 … 8 of 100"
  and a purple progress bar barely moving; she ends `annoyed`.
- hours: corridor: Mum to camera, deadpan; Kavya deadpan; Dad smug with the coil; chip "**5 hours** to go".
- title: purple title card, rays, fairy lights chasing along the top, two diyas; logo "WHAT COMES / NEXT ?" with
  three blinking gold dots; "Episode 11: Festival of Lights"; the cast pops in: Mum, Kavya, Nexta (ball "?"),
  Dad, Ah Boy. Hold.

## 1 sticks: Forty ice-cream sticks (Term-to-term rules & pattern sequences)
Layout: `nxCorridor`, 2:15 p.m. Nexta appears in the open NEXTA-LITE box, enlarged (a "box window": draw `nxBox`
big at the upper right, about (900, 230), and Nexta at s ≈ 0.55 inside it), or cut to `nxBoxStage` for her
answers. Priya behind the railing (left), Paati (centre, with her kolam powder later), Ah Boy (right) with
a fan of ice-cream sticks. A white card on the wall (x 560-1150, y 180-520) holds the working. Showpiece: the
three stick patterns side by side, with the 3 NEW sticks of each square glowing orange and "+3" hops.
- priya: chip "2:15 p.m."; Priya arrives (lower third PRIYA), arms folded, smug; thought bubble "fortune teller?".
- fracs: card: `1/2,  3/4,  1,  1 1/4,  ...` (stacked fractions, mixed number).
- quarter: three hops "+1/4"; Nexta's ball shows `1 1/2`; the next slot fills: `1 1/2`.
- decs: card: `2.3,  2.75,  3.2,  3.65,  ...`.
- point: gaps written under each pair `0.45` (three times); next `4.1`.
- two: two big chips: "**first term**" + "**rule**" = a sequence (a plus sign between them).
- back: card: `?,  80,  20,  5`; arrow pointing back at the "?".
- inverse: forward hops "÷ 4" (purple) along 80 → 20 → 5 → `5/4`; a red backward hop "× 4" from 80 to `320`
  (the "?" becomes 320); chip "backwards: use the **inverse**".
- trick: card `1,  2,  4,  ...`.
- double: Nexta's version: hops "× 2", ball `8`.
- paati: Paati (lower third PAATI, if first seen): a second row under it: hops "+1, +2, +3" → `7`.
- divided: the two rows side by side: `1, 2, 4, 8` and `1, 2, 4, 7`; Nexta's ball cracks into two halves
  showing 8 and 7; Nexta shock. Hold.
- every: Kavya: chip "check the rule on **every** gap"; tick marks under each gap of a longer sequence.
- sticks: Ah Boy proudly holds up his border; three patterns on the card (`nxSticks` 1, 2, 3 squares) labelled
  4, 7, 10; then a "10 squares → **40**?" bubble; PATTERN BROKEN stamp; lights bzzt.
- share: `hl` on: each square's 3 new sticks glow orange, the first upright stick gold; "+3" hops between the
  counts 4 → 7 → 10.
- rule: `mkWorking`: `pattern n = 4 + (n − 1) × 3`, then `pattern 10 = 4 + 9 × 3 = 31`; PATTERN FOUND; lights
  ripple; a 10-square row of sticks slides along the card (31 sticks).
- glued: Ah Boy holds up a sheet with 40 sticks glued in a sad, wobbly row; everyone deadpan. Hold.

## 2 enn: Positions, please (Using an nth-term rule)
Layout: `nxCorridor` (3 p.m.), Dad up a stepladder hanging lights (bust behind the railing, raised a bit);
the lights' gold bulbs (every 3rd bulb, `gold: i % 3 === 0`, i.e. bulbs 1, 4, 7, 10 …) carry number tags
(`g.mark`). Enn pops out of the box with his torch. A position/term table (`mkTable`) on a card on the right.
Showpiece: Enn's table "n | 1 2 3 4 … 50" → "3n − 2 | 1 4 7 10 … 148" with arrows dropping from n to the term,
while Nexta at the other end is still counting.
- three: chip "3 p.m."; gold bulbs tagged 1, 4, 7, 10 (the others small and plain).
- fifty: Mum (shock) points at the door: an empty socket above it with a tag "50th gold bulb?".
- nexta: Nexta (in her box window) counts on: ball `13`, then `16`; chip "give me an hour". Hold.
- enn: Enn pops out of the box (lower third ENN), touches his cap; chip "**n** = the **position**: 1st, 2nd, 3rd".
- jump: big `nth term = 3n − 2`; chip "position-to-term rule".
- check: table rows: n 1 → 1, 2 → 4 (aligned working under it `3 × 1 − 2 = 1`, `3 × 2 − 2 = 4`); a gold
  brace "+3 each time" with the 3 in `3n` circled ("the **gap**").
- fiftieth: `3 × 50 − 2 = 148`; the torch beam lands on bulb 148 over the door (a tag "148"); PATTERN FOUND.
- hundred: Ah Boy (hand up): `2, 4, 6`: "100th?".
- done: Enn: `2n`, `2 × 100 = 200`; tiny cut to Nexta: progress bar "term 9 of 100". Hold.
- priya: Priya: `4n + 1` with `n = 2`: writes `42 + 1 = 43`; PATTERN BROKEN.
- times: Enn: "4n means **4 × n**": `4 × 2 + 1 = 9`; the "42" splits into "4 × 2".
- laddoo: Mum at the table with a plate of 20 laddoos: `20 − 4n`, "n = families".
- rich: Priya: `(20 − 4) × 3 = 48`; 48 laddoos pile up absurdly; PATTERN BROKEN; Mum shock.
- first: Enn: `20 − 4 × 3 = 20 − 12 = 8` (multiply first, highlighted); table `16, 12, 8, 4, 0` with "−4" hops;
  chip "coefficient **−4**: down in 4s".
- half: Ah Boy, hand up: "2½th guest?" bubble.
- whole: Enn (annoyed, torch on the table): "n: 1, 2, 3, … whole numbers only"; table for `n/2 + 1`:
  `1 1/2, 2, 2 1/2`; a red cross over "n = 2.5". In the pause, cut: outside the door, a pale grey 0 in a party hat,
  sighing (Zed's first glimpse). Hold.

## 3 zero: Nobody invites the zero term (Finding the nth term)
Layout: `nxCorridor` (4 p.m.), Zed by the door on the left, outside the "queue" of terms; Dad (with his lights
remote) and Kavya behind the railing; Mum at the right. A card on the right shows each sequence as a row of
terms with Zed's empty slot one step to the LEFT of the first term (dotted box). Later Paati arrives by the lift
with a taxi receipt; `nxTaxiMeter` big. Showpiece: "step back, then build": the hop "−3" BACKWARDS from 5 into
Zed's slot (2), then the rule building itself `3n + 2` from the two parts; and the graph where Zed sits on the
vertical axis.
- four: chip "4 p.m."; Zed by the door, small, sad, hat drooping.
- zed: TH (`nxConf`, zed): lower third ZED; plaque "THE ZERO TERM: one step **before** the first term".
- sad: TH: Zed alone; a party invitation flutters past him to someone else. Hold.
- dad: corridor: Dad smug with the remote; row `5, 8, 11, 14`; hops "+3"; Dad writes `n + 3`.
- four2: Kavya: `n = 1: 1 + 3 = 4 ≠ 5`; PATTERN BROKEN; lights bzzt.
- step: Zed steps up to the card: a backward hop "−3" from 5 into the dotted slot: `5 − 3 = 2`; the "+3" becomes
  `3n` (chip "difference → the number in front of n").
- build: `nth term = 3n + 2` built from `3n` and `+ 2` (Zed's value); PATTERN FOUND.
- check: `n = 3: 3 × 3 + 2 = 11` ✓ (tick) under the third term.
- tray: Mum with the laddoo tray: row `20, 16, 12, 8`.
- easy: Dad: `4n + 16`; PATTERN BROKEN.
- minus: hops "−4"; `d = −4`; backward hop to the slot: `20 − (−4) = 24`; `24 − 4n`; PATTERN FOUND.
- taxi: chip "4:30 p.m."; Paati arrives (lower third PAATI) with a taxi receipt; `nxTaxiMeter` shows $4.60, $5.20,
  $5.80 in turn.
- paati: row `4.60, 5.20, 5.80` with hops "+0.60"; Paati taps the dotted slot: "$4 just for sitting down".
- taxirule: `mkWorking`: `d = 0.6`, `zero term = 4.60 − 0.60 = 4`, `fare = 0.6n + 4`.
- graph: `mkAxes` (n 0-5, term 0-20): the points of `3n + 2` at n = 1..4, a straight line through them, and a
  hollow point at (0, 2) where the line meets the axis: Zed's face pops into that hollow point.
- finally: Zed, on the axis, small smile. Hold.

## 4 bulb: Is bulb 200 gold? (Is it in the sequence?)
Layout: `nxCorridor` (5 p.m.); the lights with one dark bulb tagged "200"; Dad holding a gold spare bulb and a
plain one; Enn on the railing with his torch; a number line (`mkNumberLine` 196 to 205) on a card. Then the
living room (`nxLiving`, 5:30 p.m.): Mum at the sweets table with the murukku tin. Showpiece: the number line
where the gold terms 199 and 202 light up and 200 falls into the gap.
- five: chip "5 p.m."; the dark bulb with tag "200"; Dad with two spare bulbs (gold and plain).
- forever: Ah Boy, arms wide: "forever!"; chip "so 200 must be in it?".
- solve: Enn: `mkWorking`: `3n − 2 = 200`, `3n = 202`, `n = 67.33...`.
- not: a velvet rope closes in front of "n = 67.33" with a sign "NOT A POSITION"; chip "**200 is not a term**".
- skip: number line 196-205: gold dots at 199 (n = 67) and 202 (n = 68); 200 marked with a red cross in the gap.
- hundred: Dad: "bulb 100?".
- yes: working `3n − 2 = 100`, `3n = 102`, `n = 34` ✓; the rope opens; tag on bulb 100: "34th gold".
- still: tiny cut to Nexta in her box: ball `102`, bar "term 51 of 100". Hold.
- murukku: cut to `nxLiving`, chip "5:30 p.m."; Mum with the murukku tin: "150"; chip "each family takes 7".
- left: `150 − 7n` big; Mum's thought bubble "first family to find none?".
- below: Enn: working `150 − 7n < 0`, `7n > 150`, `n > 21.4...`; an arrow "round **up**" → `n = 22`.
- minus4: `150 − 7 × 22 = 150 − 154 = −4`; a plate with "−4 murukku" (four murukku outlines, dashed, red).
- before: `n = 21: 150 − 147 = 3` ✓ "not negative yet"; a two-row mini table n = 21 → 3, n = 22 → −4.
- taste: Ah Boy, curious, holding the empty "−4" plate.
- dad: Paati (deadpan, chewing a murukku); Dad offended (shock) in the background. Hold.

## 5 family: The family reading (Arithmetic, geometric & special sequences)
Layout: `nxLiving` (6 p.m., the window dusky); Nexta set up as a fortune teller at one end of the sweets table
(s ≈ 0.8, her ball glowing), reading each sequence like a palm. A card or `nxPhone` on the right. Showpiece:
the family-tree board with three branches ARITHMETIC (+), GEOMETRIC (×), FIBONACCI (sum of two) and the
special-numbers table (squares, cubes, triangular) beside the laddoo triangle.
- six: chip "6 p.m."; clock 6:00; Mum with her phone.
- send: `nxPhone` big: the "Happy Deepavali!" bubble; counter "round 1: 2, round 2: 4, round 3: 8" with branching arrows (a little
  tree of phone icons doubling).
- ratio: Nexta: differences `1, 2, 4` (crossed: not the same); ratios `2 ÷ 1 = 2`, `4 ÷ 2 = 2`, `8 ÷ 4 = 2` ✓;
  label "**geometric**: common ratio 2".
- aa: two big chips: "**A**rithmetic **A**dds (+)", "**G**eometric **G**ets multiplied (×)"; mnemonic letters gold.
- million: round 1 = 2 aunties, round 2 = 4 …: round 23 = `2²³ = 8,388,608`; a Singapore outline filling with dots; chip "> everyone in Singapore".
- bigger: Mum smug with the phone.
- tin: Paati with the murukku tin: row `96, 48, 24, 12` with hops "× 1/2".
- shrink: Nexta: `ratio = 1/2`; next `6, 3, 1.5` appear; chip "ratio between 0 and 1 ⇒ **shrinks**".
- who: Ah Boy looks around.
- qc: Dad, mouth full, crumbs on his kurta, holding a murukku; everyone deadpan. Hold.
- rose: Auntie Rose arrives (lower third AUNTIE ROSE) with sunflowers; `nxSunflower` big with two spiral
  counts `34` and `55` (curved arrows).
- fib: Nexta: `1, 1, 2, 3, 5, 8, 13, 21, 34, 55` with "+" brackets joining each pair to the next term.
- tan: Mr Tan (lower third MR TAN) with a laddoo box; `nxLaddooStack(10)` builds row by row.
- tri: `1, 3, 6, 10, 15 …`; small dot staircases 1, 3, 6, 10; `10 × 11 ÷ 2 = 55` with the two-staircase rectangle
  (10 by 11) idea as a ghosted second triangle.
- know: table (`mkTable`): n 1-5; squares 1, 4, 9, 16, 25; cubes 1, 8, 27, 64, 125; triangular 1, 3, 6, 10, 15.
- pun: Mr Tan happy; deadpan faces; "*cricket*" chip. Hold.

## 6 machine: Shoes off before socks (Function machines)
Layout: `nxLiving` (6:30 p.m., night outside, lamp lit); guests at the table; Mac stands at the end of the table
(s ≈ 0.9) with his INPUT and OUTPUT. A function-machine strip (`input → [× 4] → [− 3] → output`) on a card above
the table, drawn as boxes and arrows; numbers ride along it. Showpiece: 5 riding forwards through the windows
(20, 17), then 17 riding BACKWARDS through inverse boxes (+ 3, ÷ 4) while Mac's shoes come off before his socks.
- half6: chip "6:30 p.m."; clock 6:30; doorbell; Rose and Mr Tan at the table.
- think: Mr Tan (happy) to Auntie Rose: a thought bubble over Rose "?"; the strip appears: `× 4`, `− 3`.
- seventeen: Rose: output box `17`.
- five: Mr Tan: input box `5`.
- mac: Mac stomps in (lower third MAC); chip "one input → exactly **one output**".
- fwd: a ball "5" drops in Mac's hopper; window 1 lights (`hl: 0`) `× 4` → `20`; window 2 (`hl: 1`) `− 3` → `17`;
  a ticket "17" in his OUT tray (`out: '17'`); the strip shows `5 → 20 → 17`.
- priya: Priya's version: strip backwards in the WRONG order `÷ 4` then `+ 3`: `17 ÷ 4 = 4.25`, `4.25 + 3 = 7.25`;
  PATTERN BROKEN; Mac's windows flash.
- error: Mac (annoyed): "ERROR"; his SHOES fly off first (`shoes` 1 → 0), then his socks (`socks` 1 → 0); chip
  "**shoes off before socks**: undo the **last** step first".
- undo: the reversed strip (`rev: 1`, ops `+ 3`, `÷ 4`): `17 + 3 = 20`, `20 ÷ 4 = 5` ✓; PATTERN FOUND.
- paati: Paati's machine: ops `× 3/4`, `+ 4`; output `10`.
- frac: reversed: `10 − 4 = 6`; `6 ÷ 3/4 = 6 × 4/3 = 8` (stacked fractions); check chip "`8 × 3/4 + 4 = 10` ✓".
- square: mapping diagram: inputs 3 and −3 both arrow to 9 (fine, green tick); then "√ machine": input 9 with two
  arrows to 3 and −3, red cross: "**not** a function".
- fx: Mr Tan's card: `f(x) = 4x − 3`, `f(5) = 17`, `f⁻¹(x) = (x + 3)/4` (stacked); chip "stretch".
- again: Rose: "my **age**" bubble; Mac's hopper.
- privacy: Mac closes his hopper lid; screen shows "INPUT DECLINED"; Rose huffy, everyone grins. Hold.

## 7 kolam: Paati's kolam (Quadratic sequences, stretch)
Layout: `nxFloor` (top-down): Paati's kolams on the corridor floor, each an n × n square of dots with one lamp
(`nxKolam(n)` for n = 1..5) in a row; at the bottom a difference table. Paati and Priya appear as busts at the
bottom edge (frame edge hides the hem) or in quick corridor cutaways. Then `nxCorridor` at night for 7 p.m.
Showpiece: the difference table (terms → 1st differences → 2nd differences 2, 2, 2) and the newest L ringed in
gold on each kolam (3, 5, 7, 9 more dots).
- kolam: chip "6:45 p.m."; the five kolams appear left to right, lamps lit.
- count: counts under them: `2, 5, 10, 17, 26`.
- broken: Priya: first differences `3, 5, 7, 9` with hops; PATTERN BROKEN starts to thump but is held mid-air.
- between: Paati: "look between the gaps"; the stamp slides away.
- second: second differences `2, 2, 2` in a green band; chip "constant 2nd differences ⇒ **quadratic** (n²)".
- n2: each kolam splits into "n² dots + 1 lamp"; big `n² + 1`; PATTERN FOUND; lights ripple.
- L: the newest L of each kolam rings gold (`g.L(1)`): 3, 5, 7, 9 more dots: "the odd numbers build the squares".
- mine: Priya's kolams (doubled squares): `2, 8, 18, 32`; differences `6, 10, 14`; second `4, 4`.
- halve: Paati: "**halve the second**": `4 ÷ 2 = 2` → `2n²`; `n = 3: 2 × 9 = 18` ✓.
- seven: cut to `nxCorridor` at night (`upd(t, 1)`); chip "7 p.m."; the box LED blinking.
- lights: Mum (shock, hands up): "Lights!"; Dad presses the button.
- works: the fairy lights ripple perfectly, gold bulbs bright; PATTERN FOUND; Dad smug at last.
- door: a crowd of guests in the corridor (Rose, Mr Tan, Priya, …); Mum counting "40"; then she spots Zed.
- zed: Zed, small and grey: "Nobody invites the—".
- come: Mum smiles; Zed `invited` 0 → 1: he turns gold, his hat perks up, his sparkler lights; everyone cheers.
  Hold.

## 8 traps: The open house saves you some marks
- intro: "6 EXAM TRAPS" over the corridor at night, lights on.
- t1 (TH, Dad): card "nth term ≠ term-to-term rule": "add 3" crossed; `3n + 2` ✓. Dad sheepish.
- t2 (TH, Zed, gold now): card `20, 16, 12, …` → `d = −4`, `24 − 4n` ✓, `4n + 16` ✗.
- t3 (TH, Priya): card "check on a **second** term": `n = 2` tick tick.
- t4 (TH, Enn): card `3n − 2 = 200 ⇒ n = 67.33... ⇒ NOT a term`; torch.
- t5 (TH, Mac): card "reverse order: `+ 3` then `÷ 4`"; his shoes off before socks again.
- t6 (TH, Ah Boy): card "shared sticks count once: `3n + 1`, not `4n`"; he holds up 9 spare sticks (40 − 31).
- return: the logo "WHAT COMES NEXT? will return".
- eleven: chip "11 p.m."; the corridor at night, empty plates on the railing, the lights still on.
- reach: Nexta, exhausted, in her box: ball `200`, progress bar FULL "term 100 of 100"; confetti from the box.
- knew: Enn, leaning on the railing with a cup, deadpan; chip "`2n = 2 × 100 = 200`".
- thousand: Ah Boy in pyjamas, sleepy, hand up: "term number **1000**?".
- next: Nexta's face (slow push-in): ball `202`, progress bar resets to "term 101 of 1000". She stares at camera.
  Final frame holds.

## Suggested split for the animators
- Writer: cold (done).
- A: sticks, zero, traps (about 4.0 min; Nexta and Zed, the corridor).
- B: enn, bulb, kolam (about 3.9 min; Enn, the lights, the kolam floor).
- C: family, machine (about 3.1 min; the living room, Mac).
(Total 11.97 min: cold 0:59, sticks 1:21, enn 1:21, zero 1:33, bulb 1:27, family 1:36, machine 1:30, kolam 1:07, traps 1:04.)
