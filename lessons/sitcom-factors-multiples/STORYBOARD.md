# PRIME TIME, Ep 2 "Paati Turns Sixty-Four": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Factors, Multiples & Primes.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Kavya's grandmother, **Paati**, turns 64, and the family throws her a party at the void deck of
Block 208. Mum has a plan in which everything is shared out equally. Dad has one rule for every number
problem: "just multiply them". Behind the third pillar of the void deck is the most exclusive club in
Singapore, **the Prime Club** (est. 300 BC), and its bouncer, **Big Two** (the only even prime), lets in
numbers with exactly two factors. **One**, small and keen, keeps trying to get in. Over one evening: 36 chairs
make rectangles (factor pairs; Priya's 23 relatives make one long line: prime); Priya's "all odd numbers are
prime" meets the door (91 = 7 × 13); Mr Tan's 7452-piece jigsaw gets the divisibility tests; **Banyan**, the
old tree, splits 120 fairy lights three ways and Mum's 180 laddoos down the ladder; the Venn twins **Hattie and
Lottie** share out Mum's 60 cups and Dad's 72 plates (HCF 12, LCM 360) and Dad is right exactly once (4 and 9);
Paati's sisters catch the 7:36 bus (LCM), the fairy lights flash together every 24 s, Dad's packs, Ah Boy's 12
goodie bags (HCF); **Cubert** the cube stacks 64 cupcakes as an 8 × 8 square and a 4 × 4 × 4 cube and finds
roots by halving powers (Ah Boy halves the number: 882); Mr Tan's party quiz counts the factors of 72, and One
finally has a job: the "+ 1". Stinger: One gets into the Prime Club as Paati's plus one. Still not prime.

Guide sections (lib/topics/factors-multiples/guide.ts) by scene: factors-multiples-primes → `chairs` and
`club`; prime-factorisation → `tree`; hcf-lcm → `venn`; hcf-lcm-problems → `party`;
squares-cubes-from-primes → `cake`; counting-factors (stretch) → `count`. Exam mistakes → `traps`.
Misconceptions on screen: 1 is prime (cold, chairs), all odd numbers are prime (club), digit-sum test for 4
(club), LCM = product (venn, party), HCF bigger than the numbers (party), 2² × 3 × 15 (tree). Mnemonics:
"Factors fit in; multiples make more" (chairs), "2, 4, 8: check the last 1, 2, 3" (club), "HCF is the Heart;
LCM is the Lot" and "HCF takes the lows, LCM takes the highs" (venn). Extras: est. 300 BC (Euclid), perfect
numbers (cake).

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'two'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, paati, two, one, banyan, hattie, lottie, cubert.
  Hattie and Lottie are ONE character (`cast(root, 'venn')`): `talk: scTalk(S,t,'hattie'), talkB: scTalk(S,t,'lottie')`.
- **Humans are the heart.** They speak over half the lines (54%) and are on screen in every scene. The
  cartoon maths cast are guests at their party. Busts stand BEHIND the party table (`fmVoid`: characters in
  `g.mid`, or a layer of your own below `g.front`), so the shirt hem is hidden.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Big Two is `deadpan` (a bouncer: arms folded), `smug` only while stamping; he raises THE LIST (`list: 1`) when
  checking and the stamp (`stamp: 1`) before a thump. One is `happy` always: `shock` for one beat when refused,
  then `happy` again. Banyan is slow: `neutral`, long blinks, `smug` when he says "slowly". Hattie is `happy`,
  Lottie `deadpan`/`annoyed` ("Don't touch my side"). Cubert is `happy` and bouncy (`arms: 1`). Dad is `smug`
  right before every "just multiply them", then `shock`. Paati is `smug` or `deadpan`: unimpressed by
  everything except her own age. Mum is brisk (`neutral`), `annoyed` at Dad. Priya is `smug`, then `annoyed`
  when wrong. Mr Tan is `happy` at his own jokes; everybody else goes `deadpan`. Ah Boy is `happy` even when wrong.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never
  fill a pause with new information.
- **Running gags:**
  1. **Big Two's stamp** (`fmStamp(parent, kind)`, scale about 0.45-0.6, thumped with `g.set(p)`, Big Two
     `stamp: 1` just before): **NOT ON THE LIST** (red) on wrong answers and on One: cold.no (on One),
     venn.listm (on Dad's 48), party.lcm24 (on 96), party.down (on "48 bags"), cake.halve (on 882), traps.still.
     **COMPOSITE** (red) on composite numbers at the door: chairs.comp (36), club.nine (9, 15, 21), club.seven
     (91). **PRIME** (green): chairs.prime (23), count.lucky (7). **PLUS ONE** (purple): traps.fine.
  2. **One wants in.** cold.one → no → later; chairs.left (he pops up on the leftover chair); count.me (his
     triumph, confetti); traps.now → in (finally inside, as a plus one).
  3. **Dad: "just multiply them."** cold.dad, venn.dad, party.lights, party.packs: Dad `smug`, calculator up
     (`lift: 1`), a big "×" chip; then the stamp. venn.nine is the one time he is right: confetti, a green tick,
     Dad `shock`; venn.hands: his calculator hand bobs about helplessly (`lift` oscillating).
  4. **Paati collects nice numbers.** A square (chairs.square), "perfect" (cake), lucky prime 7 (count.lucky).
     Each time a small gold star pops next to her "64" rosette.
  5. **Mr Tan's pun** lands to silence: a tiny chip "*cricket*", deadpan faces (club.pun); Paati's comeback
     club.veg gets the laugh (Mr Tan `shock`).
  6. **Mum's plan** (her `paper` prop): she ticks items off it whenever something shares out equally
     (chairs.list, venn.twelve, party.fewest): a green tick chip "✓ equal".
- **Talking heads** (marked TH below) use `fmConf(root, who)` full stage, the character big (s about 1.3-1.4)
  at about (330, 420), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `fmLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, factor pair or step is said, it appears big and clear in the
  caption's exact words: `mkMath` for every expression (`36 ÷ 5 = 7 r 1`, `2^2 * 3^2 * 5`, `sqrt(1764) = 42`),
  `mkWorking` for aligned working (equals signs lined up), `mkTable` for factor-pair tables and the
  divisibility table, `mkNumberLine` for the bus and light timelines, a factor tree drawn with lines and circled
  primes, the ladder as a real ladder (primes down the left of a vertical line). Index form always with real
  superscripts. Primes in circles are green (`#56D69B`). The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. At most ~1,000 elements per scene: humans are about 60-150 elements each (Paati's
  rosette adds 12): build each once per scene and move or hide it with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`fmLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Party planner (unpaid). |
| mum | Mum: has a plan, shares equally | magenta kurta, bun, bindi; prop `paper` (the plan) | MUM / Has a plan. Shares equally. |
| dad | Dad: "just multiply them" | glasses, moustache, green polo; prop calculator (`lift: 1` raises it) | DAD / "Just multiply them." |
| boy | Ah Boy, 8: confident, hungry, asks the hard obvious question | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. A cube (2³). |
| priya | Priya, 12: fast, competitive, often wrong first | uniform, bob, yellow clip; prop pencil | PRIYA / Best friend. Fast. Not always right. |
| tan | Mr Tan: dry, kind, puns, brought a quiz | shirt and tie, glasses; prop book | MR TAN / Maths teacher. Lives on floor 7. Prime. |
| paati | Paati, 64 today: sharp, unimpressed, loves being a square | senior, silver bun, round gold glasses, green kurta with gold trim, bindi, gold "64" rosette (`cast(root, 'paati')`) | PAATI / Kavya's grandmother. 64 today. |
| two | Big Two, bouncer of the Prime Club, the only even prime | huge purple numeral 2, sunglasses up, earpiece, bow tie, SECURITY; `list`, `stamp` | BIG TWO / Security, the Prime Club. The only even prime. |
| one | One: keen, small, never prime | cream numeral 1, party hat, stick arms; `wave` | ONE / Not prime. Not composite. Very keen. |
| banyan | Banyan, the factor tree: slow, wise | huge banyan: trunk face, moss moustache, canopy, aerial roots, fairy lights (`lights`) | BANYAN / Factor tree. Here since 1975. |
| venn | Hattie (left, blue, red bow) and Lottie (right, yellow, cat-eye glasses): a Venn diagram | two overlapping circles, two faces (face, faceB); `g.slot.left/mid/right`, `g.hl('mid' / 'all', p)` | HATTIE & LOTTIE / A Venn diagram. They share a middle. |
| cubert | Cubert, a cube: jolly, everything in threes | orange 3-D cube, "³" sticker, arms and legs (`arms`) | CUBERT / A cube. 4 × 4 × 4 of fun. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `fmVoid` (the void deck: pillars, letterboxes, lift, bunting, banner HAPPY 64th BIRTHDAY, PAATI!, "6"
and "4" balloons, ceiling fairy lights; the long party table: layers `g.mid` / `g.front` / `g.top`,
`g.tableY` 530; `g.club` = the Prime Club's tiny door at the foot of the third pillar), `fmClub` (the club
door close-up: neon THE PRIME CLUB est. 300 BC, purple door with MEMBERS plate, red carpet, velvet rope
`g.rope`, `g.floorY` 640), `fmConf` (talking heads).
Props: `fmStamp(parent, 'prime' | 'not' | 'comp' | 'plus')`, `fmNum(parent, '91', { col })` (number guests),
`fmChair`, `fmCupcake`, `fmLaddoo`, `fmLights(parent, pts, { n })` (`g.set(t, 'twinkle' | 'off' | colour)`),
`fmBalloon`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkNumberLine`, `mkBrace`, `mkChip`,
`mkSpeechBubble`, `mkWhiteboard`, `mkCalculator`, `mkGrid`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `fmVoid` wide, slow push towards the banner; Kavya bust foreground left behind the table; chips
  "Kavya, age 12", "Saturday, 5 p.m.", "void deck, Blk 208"; lower third KAVYA, 12.
- mum: Mum rises behind the table with her plan (paper), brisk; lower third MUM; chips "Paati: 64 today",
  "everything shared **equally**".
- paati: Paati pops up beside her (lower third PAATI), smug; chip "the **biggest** slice"; Mum annoyed.
- dad: Dad, smug, calculator raised (`lift: 1`); chip "×  just multiply them"; lower third DAD.
- hobby: Kavya deadpan at Dad; Dad's smile fades. Hold.
- tiny: documentary zoom on the third pillar, into the tiny glowing door at its foot (viewfinder corners,
  "ZOOM ×" readout).
- hi (TH-ish, at the door): `fmClub`; Big Two at the rope, arms folded; lower third BIG TWO; chip "exactly
  **2** factors: **1** and itself".
- even: Big Two holds up THE LIST; a big "2" with "only **even** prime" beside it; chips 4, 6, 8, 10 bounce off
  the rope ("÷ 2").
- one: One hops onto the carpet waving (lower third ONE); his card "factors of 1: **1**".
- no: Big Two raises the stamp; NOT ON THE LIST thumps onto One; One shock.
- later: One happy again, waves, bounces off right; in the pause Big Two lifts THE LIST, slow push-in, chips
  "Tonight: **a party**", "**every number** gets checked". Hold.
- title: purple title card with rays; logo "PRIME / TIME" between a "2" and a "3"; "Episode 2: Paati Turns
  Sixty-Four"; the cast pops in: Paati, Kavya, Big Two, One, Dad. Hold.

## 1 chairs: Thirty-six chairs (Factors, multiples and primes)
Layout: `fmVoid`, humans behind the table; the right half (x 600-1150, y 120-500) is a grid of floor space
where 36 `fmChair`s are arranged (cell about 40 px). Big Two stands on the left end of the table. Showpiece:
the 36 chairs sliding from rectangle to rectangle (1 × 36 as a long row that runs off the edge, 2 × 18,
3 × 12, 4 × 9, 6 × 6) while the factor-pair table fills.
- five: chip "5:15 p.m."; 36 chairs stacked in a pile; Mum's plan "chairs: rectangle".
- rows: Ah Boy, hand up; chairs slide into 5 rows of 7 + 1 extra chair.
- rem: `36 ÷ 5 = 7 r 1`; the single leftover chair glows red; chip "5 is **not** a factor of 36".
- left: One pops up sitting on the leftover chair, waving. Kavya deadpan. Hold.
- factor: Big Two (lower third if first in scene): chip "a **factor** divides **exactly**"; header of a
  two-column table "small factor | partner".
- pairs: rows fill on the beats: `1 × 36`, `2 × 18`, `3 × 12`, `4 × 9`, `5`: ✗, `6 × 6`; the chairs re-arrange
  to each rectangle as it is said (1 × 36 shown as a long line running off screen).
- met: arrows from 6 × 6 to "9 × 4, 12 × 3 ... (swap round)" crossed out; "STOP" chip.
- list: the factors `1, 2, 3, 4, 6, 9, 12, 18, 36` in a row, "9 factors"; Mum ticks her plan.
- square: the 6 × 6 square of chairs, gold outline; Paati smug, a gold star by her rosette. Hold.
- make: Ah Boy's hand up ("multiples?"); a number line from 0; multiples hop along: `36, 72, 108, ...` arrow off to the right "forever"; chips "**Factors fit in**"
  (chairs inside 36) and "**Multiples make more**".
- priya: Priya rises (lower third PRIYA), smug; 23 blue chairs.
- line: the 23 chairs try 2 rows (one left over), 3 rows (two left over)... then settle in one long line
  `1 × 23`.
- prime: Big Two: PRIME stamp on the 23; chip "factors: **1** and **23**"; Dad behind the line, deadpan: a bubble-tea queue sign.
- comp: two cards: "36: 9 factors → **composite**" (COMPOSITE stamp small), "1: 1 factor → **neither**"; One on
  the card, happy anyway.

## 2 club: At the door of the Prime Club (Primes, testing for primes, divisibility tests)
Layout: alternates between `fmClub` (the queue of `fmNum` guests on the carpet, Big Two at the rope) and
`fmVoid` (humans arriving). Priya appears at the club in a small inset "phone call" (`scVideoCall`) or leaning
in at the left edge. Showpiece: the divisibility table on Mr Tan's jigsaw box.
- six: chip "6 p.m."; guests at the table; cut to the club: a queue of numbers 9, 15, 21, 91.
- odd: Priya (smug) inset: "all odd numbers are prime"; the numbers cheer.
- nine: each number steps up; Big Two splits it: `9 = 3 × 3`, `15 = 3 × 5`, `21 = 3 × 7`; COMPOSITE stamp on each.
- ninety: 91 steps up, proud; Priya: "look at it!".
- test: Big Two lifts THE LIST: primes 2, 3, 5, 7, 11 with a "stop when p² > n" rule.
- seven: working: `2: ✗ (odd)`, `3: ✗ (9 + 1 = 10)`, `5: ✗`, `7² = 49 < 91`, `91 ÷ 7 = 13` ✓, `11² = 121 > 91: stop`;
  `91 = 7 × 13`; COMPOSITE stamp. Hold.
- tan: back at the void deck; Mr Tan (lower third MR TAN) with a wrapped present.
- gift: the jigsaw box "MERLION 7452 PIECES"; chip "share equally?".
- four: the box's number with the last two digits boxed: `52 = 4 × 13` ✓ "4 tables".
- wrong: Priya: `7 + 4 + 5 + 2 = 18`, "18 ÷ 4 ✗" in red.
- digit: the divisibility table (`mkTable`): 2 last digit even; 3 digit sum; 4 last two digits; 5 ends 0 or 5;
  6 tests for 2 and 3; 8 last three digits; 9 digit sum; 10 ends 0. Chip "**2, 4, 8: check the last 1, 2, 3**".
  "digit sum: only 3 and 9" highlighted.
- rest: ticks and crosses appear on the table for 7452: 3 ✓, 9 ✓ (18), 6 ✓ (even and 3), 8 ✗ (`452 = 8 × 56 + 4`),
  plus 2 ✓, 4 ✓, 5 ✗, 10 ✗ for completeness.
- pun: Mr Tan happy; chips 6, 7, 8, 9 in a row, 7 chasing 9; "*cricket*". Everyone deadpan.
- veg: Paati; a "VEGETARIAN PARTY" sign; Mr Tan shock; laugh beat. Hold.

## 3 tree: The banyan tree (Prime factorisation)
Layout: outside the void deck, evening sky; Banyan big on the left (s about 1.0, trunk at x 260); Kavya,
Priya and Ah Boy busts along the bottom edge, holding light strings; a white board area on the right (x 560-1160)
for three factor trees side by side, then the ladder. Showpiece: three different trees growing from 120 and
all ending in the same five green circles 2, 2, 2, 3, 5.
- lights: chip "6:30 p.m."; 120 fairy lights (a coil); Banyan asleep (deadpan, eyes shut).
- banyan: Banyan wakes slowly (lower third BANYAN); his lights switch on.
- split: chip "split into **any** factor pair → keep splitting → **primes**".
- kav: tree 1: 120 → 12, 10 → 2, 2, 3 | 2, 5 (primes circled green).
- pri: tree 2: 120 → 8, 15 → 2, 2, 2 | 3, 5; Priya smug "done first!".
- boy: tree 3: 120 → 2, 60 → 6, 10 → 2, 3, 2, 5.
- same: the circled primes slide down into three identical rows `2 2 2 3 5`; ticks.
- unique: chip "exactly **one** prime factorisation"; a DNA helix made of the five primes.
- index: `120 = 2 × 2 × 2 × 3 × 5` → `120 = 2^3 * 3 * 5`; chip "**index form**: smallest prime first".
- laddoo: Mum with a tray of laddoos, chip "180 laddoos".
- ladder: a real ladder: primes down the left, numbers down the right.
- steps: rungs fill on the beats: 2 | 180, 2 | 90, 3 | 45, 3 | 15, 5 | 5, | 1.
- dad: Dad's card `180 = 2^2 * 3 * 15` (smug).
- notdone: the 15 flashes red, "not prime"; it splits to 3 × 5: `180 = 2^2 * 3^2 * 5`.
- check: `4 × 9 × 5 = 180` ✓; Mum ticks her plan; Paati looks up at Banyan, deadpan. Hold.

## 4 venn: Hattie and Lottie (HCF and LCM)
Layout: `fmVoid`, the table with stacks of cups (Mum's side, left) and plates (Dad's side, right); Mum and Dad
at opposite ends glaring. The Venn twins float big over the right half (s about 1.0, centre (820, 340)). Mum's
two factor lists on a card at the left. Showpiece: the primes 2, 2, 3 sliding into the heart, 5 left, 2 and 3
right; the heart glows (HCF 12); then everything glows (LCM 360).
- cups: chip "6:45 p.m."; 60 cups, 72 plates; Mum and Dad back to back.
- tables: card: factors of 60: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60; factors of 72: 1, 2, 3, 4, 6, 8, 9, 12, 18,
  24, 36, 72; common ones circled; "highest: **12**"; at "ten minutes" Mum exhausted, clock chip "10 min". Hold.
- hattie: the Venn twins appear (lower third HATTIE & LOTTIE); chip "Venn diagram of **prime factors**".
- lottie: Lottie annoyed, edging away; Hattie hurt. Hold.
- sixty: `60 = 2^2 * 3 * 5` above the left circle; prime chips 2, 2, 3, 5.
- seventy: `72 = 2^3 * 3^2` above the right; chips 2, 2, 2, 3, 3.
- share: pairs match off one at a time (2 with 2, 2 with 2, 3 with 3) and slide into the middle; leftovers: 5
  left; 2, 3 right.
- hcf: heart glows (`hl('mid')`); `HCF = 2 × 2 × 3 = 12`; chip "**HCF is the Heart**".
- twelve: 12 little tables, each `5` cups and `6` plates (`60 ÷ 12 = 5`, `72 ÷ 12 = 6`); Mum ticks her plan.
- lcm: everything glows (`hl('all')`); `LCM = 5 × 2 × 2 × 3 × 2 × 3 = 360`; chip "**LCM is the Lot**".
- lows: `mkWorking`: `HCF = 2^2 * 3 = 12` (lower powers), `LCM = 2^3 * 3^2 * 5 = 360` (higher powers); chip
  "HCF takes the **lows**, LCM takes the **highs**".
- product: `12 × 360 = 4320`, `60 × 72 = 4320`; boxed `HCF(a, b) * LCM(a, b) = a * b`.
- dad: Dad smug, calculator up: `6 × 8 = 48`.
- listm: Priya: multiples of 8: 8, 16, **24** on a number line; 6's multiples 6, 12, 18, **24**; `LCM = 24`;
  NOT ON THE LIST on 48; on "they share a 2", a mini Venn of 6 (2, 3) and 8 (2, 2, 2) with one 2 in the middle:
  "6 × 8 counts it twice".
- nine: Dad: `4 × 9 = 36`; Venn of 4 (2, 2) and 9 (3, 3): empty middle.
- right: green tick, confetti; chip "no shared primes ⇒ LCM = product"; Dad shock. Hold.
- hands: Dad's calculator hand bobs; Mum's eyebrows up. Hold.

## 5 party: Building up or breaking down? (HCF and LCM problems)
Layout: `fmVoid`, guests' chatter; Big Two at the end of the table checking problems "at the door" with THE
LIST; a two-column card "BUILDING UP → LCM" | "BREAKING DOWN → HCF" stays top right all scene, each problem
dropping into its column. Showpiece: the bus timeline (`mkNumberLine` 0-72 min, Bus A hops of 12 above,
Bus B hops of 18 below, meeting at 36).
- bus: chip "7 p.m."; two bus icons "every 12 min", "every 18 min".
- both: Paati with a clock "7:00"; "next **together**?".
- ask: Big Two; the two-column card appears; clue chips "next time together", "fewest packs" (LCM) and
  "largest equal groups", "biggest square tile" (HCF).
- up: timeline: A at 12, 24, 36; B at 18, 36; the 36 rings; "LCM(12, 18) = 36".
- answer: Ah Boy proud: "36!".
- when: NOT the number: the clock moves `7:00 + 36 min = 7:36 p.m.`; chip "answer the question asked".
- lights: Dad's fairy lights (red and green strings) flash at 8 and 12 s; Dad: `8 × 12 = 96` (smug).
- lcm24: a timer counts; both strings flash together at 24 s; `8 = 2^3`, `12 = 2^2 * 3`, `LCM = 2^3 * 3 = 24`; NOT ON THE LIST on 96 (chip "a common multiple, not the
  **lowest**").
- packs: Dad with 8 packs of burgers and 6 packs of buns (piled high), smug.
- fewest: `LCM(6, 8) = 24`; `24 ÷ 6 = 4` packs, `24 ÷ 8 = 3` packs (chip "the answer is **packs**, not 24"); Dad's extra packs slide off to a freezer; Mum ticks her plan.
- bags: Ah Boy: 36 chocolate coins and 48 lollipops; "48 bags!"; 48 empty bags pop up.
- down: Big Two: NOT ON THE LIST on "48 bags"; the problem drops into the BREAKING DOWN column.
- hcf: `36 = 2^2 * 3^2`, `48 = 2^4 * 3`, `HCF = 2^2 * 3 = 12`; 12 bags, each 3 coins and 4 lollipops.
- sense: two chips: "HCF ≤ smaller number", "LCM ≥ bigger number".
- sisters: two aunties arrive together at 7:36, not looking at each other; Paati smug. Hold.

## 6 cake: Sixty-four cupcakes (Squares, cubes and roots from prime factors)
Layout: `fmVoid`, the table with 64 cupcakes (`fmCupcake`, 2-3 elements each); Cubert hops onto the table;
a board on the right for the working. Showpiece: the 8 × 8 tray of cupcakes rising into a 4 × 4 × 4 tower.
- cake: chip "7:45 p.m."; 64 cupcakes in a heap; Paati smug.
- cubert: Cubert bounces in (lower third CUBERT), arms up.
- tray: cupcakes snap into an 8 × 8 square; `8^2 = 64`; "square".
- tower: they stack into a 4 × 4 × 4 cube (isometric); `4^3 = 64`; "cube".
- perfect: Paati smug; gold star by her rosette.
- tech: Mr Tan: `6 = 1 + 2 + 3` "perfect number"; Paati deadpan.
- bday: Paati; Mr Tan backs away. Hold.
- powers: `64 = 2^6`; table: "square: every power **even**", "cube: every power a **multiple of 3**";
  `8^2 = (2^3)^2 = 2^6` and `4^3 = (2^2)^3 = 2^6`.
- roots: `sqrt(64) = sqrt(2^6) = 2^3 = 8` ("halve the powers"); `cbrt(64) = cbrt(2^6) = 2^2 = 4` ("÷ the
  powers by 3").
- quiz: Mr Tan's quiz card `sqrt(1764)`.
- half: Ah Boy: `1764 ÷ 2 = 882`; NOT ON THE LIST stamp.
- halve: `1764 = 2^2 * 3^2 * 7^2`; chip "halve the **powers**".
- fortytwo: `sqrt(1764) = 2 * 3 * 7 = 42`; two identical groups (2, 3, 7) and (2, 3, 7); `42 × 42 = 1764` ✓.
- ladd: Mum's 180 laddoos; `180 = 2^2 * 3^2 * 5` with the 5's power 1 flashing "odd".
- times: `180 × 5 = 900 = 30^2`; laddoos fill a 30 × 30... (shown as a square outline with "30 × 30").
- eat: Ah Boy: `180 ÷ 5 = 36 = 6^2`: a 6 × 6 tray; "the other 144" slide towards Ah Boy.
- cubeit: Cubert: `2^2 * 3^2 * 5` needs `2 * 3 * 5^2 = 150` more → `180 × 150 = 27 000 = 30^3`; a mountain of laddoos.
- more: Mum, firm: "square tray"; `900 − 180 = 720` more. Ah Boy sad. Hold.

## 7 count: The plus one (Counting factors, stretch)
Layout: `fmVoid` at 8 p.m. (fairy lights brighter), Mr Tan at the end of the table with his quiz book; a board
on the right with the factor grid of 72. Showpiece: the 4 × 3 grid filling: rows 1, 2, 4, 8 (powers of 2),
columns 1, 3, 9 (powers of 3), cells the 12 factors.
- eight: chip "8 p.m."; Mr Tan's quiz card "PARTY QUIZ"; groans.
- q: card "How many factors does **72** have?"; "no listing" chip.
- twos: `72 = 2^3 * 3^2`; the grid's rows `2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8`: "4 choices".
- threes: columns `3^0 = 1, 3^1 = 3, 3^2 = 9`: "3 choices"; the 12 cells fill: 1, 3, 9 / 2, 6, 18 / 4, 12, 36 /
  8, 24, 72; `4 × 3 = 12`.
- none: the top row `2^0 = 1` glows; rule `(3 + 1)(2 + 1) = 12`; "the **+ 1** = choosing none".
- me: One bursts in, confetti, standing on the "+ 1"; everybody happy.
- mine: Paati: `64 = 2^6`.
- seven: `6 + 1 = 7` factors: 1, 2, 4, 8, 16, 32, 64 in pairs: 1 × 64, 2 × 32, 4 × 16, and 8 alone.
- pairs: the pairs drawn as arcs; 8 × 8 loops to itself; chip "only **squares** have an **odd** number of
  factors".
- primes: cards "prime: 2 factors (7: 1, 7)", "prime squared: 3 factors (49: 1, 7, 49)".
- lucky: PRIME stamp on a big 7; Paati smug, a gold star. Hold.

## 8 traps: The party saves you some marks
- intro: "6 EXAM TRAPS" over the void deck.
- t1 (TH, Banyan): card `2^2 * 9 * 5` with the 9 crossed → `2^2 * 3^2 * 5`; "multiply back ✓".
- t2 (TH, Hattie and Lottie): card "**product** of primes: `2^2 * 3^2 * 5`" with "2, 2, 3, 3, 5 ✗" and
  "2² + 3² + 5 ✗".
- t3 (TH, Big Two): card "building up → **LCM**", "breaking down → **HCF**"; stamp raised.
- t4 (TH, Paati): card "**7:36 p.m.** ✓ not 36 ✗"; her sisters' bus.
- t5 (TH, Mr Tan): card "`HCF * LCM = a * b`: **two** numbers only"; `12, 18, 30`: `6 × 180 ≠ 12 × 18 × 30`.
- t6 (TH, Ah Boy): card "`sqrt(1764)`: halve the **powers**: 42 ✓, not 882 ✗".
- return: the logo "PRIME TIME will return".
- now: chip "10 p.m."; the club door, Big Two at the rope; One, hopeful.
- still: Big Two lifts THE LIST: "factors of 1: 1"; NOT ON THE LIST (small).
- plus: Paati walks up beside One (bust at the right edge) with her rosette; "+1" badge on One.
- fine: Big Two sighs, unhooks the rope; PLUS ONE stamp on One's hand.
- in: One runs through the door; music notes, the door glows.
- notprime: Big Two, to camera, deadpan. Final frame holds: the door ajar, PLUS ONE stamp, Big Two deadpan.

## Suggested split for the animators
Timings from timeline.json (total 11.95 min).
- Writer: cold (done, 62 s).
- A: chairs, club, traps (about 3.8 min; Big Two's stamps and the club door in all three).
- B: tree, venn, count (about 3.9 min; factor trees, the Venn twins, the factor grid).
- C: party, cake (about 3.2 min; the busiest scenes).
