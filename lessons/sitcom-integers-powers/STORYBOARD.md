# NEGATIVE VIBES, Ep 1 "Two Wrongs Make a Right": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Integers, Powers & Roots.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Friday evening, Block 208: Kavya's maths test comes back, 12 out of 20, and every lost mark was a
minus sign. "I hate minus signs." Living on her test paper is **Dash**, the minus sign himself: an emo
teenager with a black fringe who writes poems that don't rhyme and lives on the cold left side of the number
line. On Saturday the family goes to the RC Family Day at the void deck of Block 210 next door, and Dash
follows to prove minus signs are useful. Booth by booth: Auntie Rose's ice-cream freezer warms from −18 °C to
−5 °C (adding and subtracting negatives); Priya's red-and-black card battle, where Dash's twin sister Dasha
crosses him into a plus (× and ÷); the family maths quiz, where **Queenie** the queue-number machine makes the
operations queue (BIDMAS) and Dad wins a calculator; Priya's robot **Pip the Power-inator** (squares, cubes,
roots, and the special set piece GROW, SHRINK or FLIP: what powers and roots do to numbers bigger than 1,
between 0 and 1, and negative); the paper-folding challenge with **Tiny** the index and **Basil** the base
(index laws, 42 folds to the Moon); the number-family photo crashed by **Uncle Pi**, who never stops talking
(types of number); and back home Ah Boy halves the last kueh into negative indices (stretch). Stinger: 20 out
of 20; Dash is so proud he turns positive; and at the empty void deck Uncle Pi is still talking.

Guide sections (lib/topics/integers-powers/guide.ts) by scene: adding-subtracting-negatives → `freezer`;
multiplying-dividing-negatives → `cards`; order-of-operations → `queue` (+ traps t5, fraction bar);
squares-cubes-roots → `inator` + `zones` (the set piece); index-laws → `fold`; types-of-number → `family`;
negative-indices (stretch) → `kueh`. Exam mistakes → `traps`. Misconceptions on screen: 5 − (−3) = 2 (cold test
paper, freezer), −4 + (−6) = 10 (freezer.two), −4² vs (−4)² (queue.calc/touch), x² = 49 ⇒ only 7 (inator.rev/me),
2³ × 2⁴ = 4⁷ (fold.dad), 5⁰ = 0 → 2⁰ = 1 (fold.zero), 2⁻³ = −8 (kueh.us/flip). Mnemonics: friend/enemy (cards),
BIDMAS with D-M and A-S sharing a ticket (queue), MAD SPM (fold), flip not minus (kueh). Real world: freezer
and a Singapore afternoon (33 − (−18) = 51), debt/"take away a negative", computer memory 2¹⁰ = 1024 (kueh), the
paper-folding Moon hook (lib/extras), red-and-black cards (extras activity).

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'dash'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, dash, dasha, queenie, pip, tiny, basil, pi.
- **Humans are the heart.** They speak 55% of the lines and are on screen in every scene. The cartoon maths cast
  are guests at the humans' Family Day. Busts stand BEHIND a booth table (`ipBooth`: characters in `g.mid`, or
  in your own layer below `g.front`) or the dining table (`ipFlat`), so the shirt hem is hidden.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Dash is `sad` by default, `deadpan` at jokes, `shock` whenever he turns positive, and `smug` exactly once
  (family.integers, when he belongs). Dasha is `happy`, always. Queenie is `smug` and prim, `annoyed` at queue
  cutters. Pip is `happy`, `shock` at ERROR. Tiny is `happy`, bouncing. Basil is `deadpan`, never anything else
  (one `annoyed` on fold.change). Uncle Pi is `happy`, mid-word in every shot. Dad is `smug` right before every
  mistake, `happy` with his calculator. Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed`
  when she loses. Mum is brisk (`neutral`/`smug`). Mr Tan is `happy`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never
  fill a pause with new information.
- **Running gags:**
  1. **The quiz buzzer stamp** `ipStamp(parent, false)` "BZZT!" (red) thumps on every wrong answer: freezer.two
     (−4 + (−6) = 10), queue.cut (36 and 6), queue.mum2 (12 ÷ 6 = 2), fold.dad (4⁷), zones.broken (on Priya's
     "squaring always makes it bigger" chip), kueh.us (Dash's −8). `ipStamp(parent, true)` "CORRECT!" (green) on right answers: freezer.rule (13), cards.up (12),
     queue.work (34), queue.ticket (8), inator.x2 (±7), fold.add (2⁷), traps.twenty. Scale it ~0.5-0.7.
  2. **Dash turns positive.** Whenever two negatives multiply onto him, a golden vertical bar grows through him
     (`dash.set({ plus: p })`) and he becomes a "+": cards.ugh (Dasha crosses him), zones.nine/off (squared in
     Pip), traps.proud/ugh (from pride, no maths at all: the stinger). He goes `shock`, then `deadpan`.
  3. **Dad and the rice cooker / the calculator.** cold.dad wants the rice cooker (`ipRiceCooker` on the quiz
     table all through `queue`); he wins a calculator instead (queue.prize) and holds it proudly ever after
     (fold, traps.t4: "Ask my calculator").
  4. **Uncle Pi never stops talking.** His digits ticker (`pi.set({ digits })`) scrolls in every shot he is in,
     even when someone else speaks; the photo flash (family.pi3) catches him mid-word; the stinger finds him alone
     at the void deck at night, still going. The digits he says run on correctly from line to line:
     3.1415926535 | 8979323846 | 2643383279.
  5. **Queenie's "Ding-dong!"** (`ding: 1`) and her LED display (`disp`) change on every "Now serving"; a paper
     ticket pops out (`ticket`) for each operation served.
  6. **Basil: "I do not change."** He never moves; only his belly number changes (`base`).
  7. **Dash's poems** that don't rhyme (cold.poem), and his twin, who is happier than him in every way.
- **Talking heads** (TH below) use `ipConf(root, who)` full stage, the character big (s ≈ 1.3-1.5) at about
  (330, 420), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `ipLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`−5 − (−18) = 13`, `(−3)^2 = 9`, `cbrt(-8) = -2`, `2^3 * 2^4 = 2^7`),
  `mkWorking` for aligned multi-step working (equals signs lined up), `mkNumberLine` (with `hops`) for every
  journey along the number line, `mkThermometer` (min −20, max 40) for temperatures, `mkTable` for patterns.
  Negative signs are true minus signs (mkMath turns `-` into −). Powers are real superscripts (`2^3`), roots are
  real radicals (`sqrt(50)`), fractions stacked (`1/8`). The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. Aim for at most ~1,000 elements per scene; build each human once per scene.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`ipLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Lost 8 marks to minus signs. |
| mum | Mum: brisk, organised, runs the folding booth | magenta kurta, bun, bindi; no prop | MUM / Corrections first. |
| dad | Dad: competitive, wrong, lovable | glasses, moustache, green polo; prop calculator | DAD / Wants that rice cooker. |
| boy | Ah Boy, 8: confident, often wrong, sometimes brilliant | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Very confident. |
| priya | Priya, 12: competitive, quick, built a robot | purple robotics tee "R", bob, yellow clip; prop tablet | PRIYA / Best friend. Undefeated. |
| tan | Mr Tan: quizmaster and photographer; tie on Saturday | shirt and tie, glasses; prop quiz card | MR TAN / Maths teacher. Quizmaster. |
| rose | Auntie Rose: loud, loving, owns a freezer | curly perm, floral blouse, ROSE'S apron | AUNTIE ROSE / Rose's Kitchen. Brought a freezer. |
| dash | Dash, the MINUS SIGN: gloomy emo poet; `plus` turns him into "+" | slate-blue capsule, black fringe over one eye, thin arms, black sneakers | DASH / The minus sign. Less than zero. |
| dasha | Dasha, Dash's twin, also a minus sign: sunny | pink capsule, big yellow bow, freckles | DASHA / Dash's twin. Also a minus sign. |
| queenie | Queenie, the QUEUE-NUMBER MACHINE: prim, strict, "Nobody cuts my queue" | teal ticket dispenser on a pole, amber LED (`disp`), ticket (`ticket`, `tkt`), `ding` | QUEENIE / Queue machine. Order of operations. |
| pip | Pip, the POWER-INATOR, Priya's robot: eager, literal, dramatic about errors | purple machine on wheels, screen face, IN hopper, OUT chute, buttons x² x³ √x ∛x (`btn`), LED `read`, `err`, `smoke`, `shake` | PIP / The Power-inator. Built by Priya. |
| tiny | Tiny, the INDEX: tiny, loud, counts factors | small gold pill, crown, waving arms, index on his belly (`idx`) | TINY / The index. Counts the factors. |
| basil | Basil, the BASE: slow, deadpan, "I do not change" | stone block, bowler hat, base on his belly (`base`) | BASIL / The base. Does not change. |
| pi | Uncle Pi: irrational, never stops talking | brown π body, uncle head, round glasses, moustache; digits ticker (`digits`, `g.ticker`) | UNCLE PI / Irrational. Never stops talking. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `ipFlat` (Kavya's HDB dining area, window to the next block, `night` for evening; layers `g.mid` /
`g.front` (the dining table) / `g.top`; `g.tableY` 530), `ipVoidDeck` (wide shot of the Family Day under Block
210: banner, bunting, five booths at `g.booths[i]`), `ipBooth` (one booth from the visitors' side: canopy banner
`o.title`, table cloth `o.cloth`; same layers as ipFlat), `ipConf` (talking heads).
Props: `ipTest` (Kavya's test: scores 12/20 and 20/20, three wrong answers with crosses, "Watch your signs!
Mr T"), `ipFreezer` (lid, temp display, frost), `ipCard` (red/black playing cards, flip), `ipRiceCooker`,
`ipPaper` (folded stack, `set(layers)`), `ipKueh` (16 rainbow kueh, `set(v)` down to fractions), `ipZones` (the
GROW, SHRINK or FLIP board), `ipStamp`, `ipFlash`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkNumberLine`,
`mkThermometer`, `mkTable`, `mkChip`, `mkSpeechBubble`, `mkWhiteboard`, `mkCalculator`, `mkFractionBar`.
Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
Layout: `ipFlat` at night; the family behind the dining table (Mum, Dad, Ah Boy pop up as they speak); Kavya at
the front left. Showpiece: the documentary zoom into the "−" of a wrong answer, which opens one eye: Dash.
- kavya: slow push on the flat; Kavya behind the table, the test face down; chips "Kavya, age 12", "Friday
  evening", "Block 208"; lower third KAVYA, 12.
- score: the test flips up (`ipTest`, score 12/20 circled red, three red crosses); Kavya `sad`; chip "8 marks
  lost: all minus signs".
- mum: Mum rises behind the table (lower third MUM), pointing; chip "corrections tonight"; poster chip
  "RC FAMILY DAY · Saturday · void deck".
- boy: Ah Boy pops up (lift), three chips pop on the beats: "free ice cream", "lucky draw", "Priya's robot".
- dad: Dad rises (lower third DAD), smug, holding up a flyer with the rice cooker (`ipRiceCooker` small) and
  "1st PRIZE".
- hate: Kavya `annoyed`, pushes the test away. Hold on her face.
- tiny: documentary zoom into the test paper, onto the "−" of "5 − (−3) = 2" (viewfinder corners, "ZOOM ×"
  readout); the minus grows to fill the frame.
- hi (TH): Dash's confessional (lower third DASH): `sad`; plaque "THE MINUS SIGN" with a big "−", "less than
  zero"; a number line −5 to 5 underneath with Dash's home (the negative side) shaded blue-grey and "cold" on it.
- poem (TH): Dash reads from a notebook; the poem appears line by line on a page (Roses are red / Violets are
  blue / I am less than zero), then "(doesn't rhyme)" crossed in red. Hold.
- talk: the flat: Ah Boy points at the test on the table, where tiny Dash sits up on the paper; Kavya `shock`.
- plan: Dash on the test paper, looking up at Kavya, `deadpan`; chip "Tomorrow: prove minus signs are useful".
- title: navy-to-magenta title card with rays; logo "NEGATIVE / VIBES" flanked by minus signs; "Episode 1: Two
  Wrongs Make a Right"; the cast pops in: Kavya, Dash, Dad, Ah Boy, Mum. Hold.

## 1 freezer: Auntie Rose's freezer (Adding & subtracting negative numbers)
Layout: `ipBooth` "AUNTIE ROSE'S ICE CREAM" (blue); Auntie Rose behind the table with `ipFreezer` on it at the
left; Kavya and Ah Boy; Dash on the table top (s ≈ 0.55). A big `mkThermometer` (−20..40) at the left and a
board on the right (x 620-1150) for working and a horizontal `mkNumberLine`. Showpiece: the thermometer rising
from −18 to −5 with "+13" bracketed, then the number-line journey −7 → −3 → 2.
- nine: `ipVoidDeck` wide, chip "Saturday, 9 a.m."; push into booth 0; cut to the booth.
- rose: Rose (lower third AUNTIE ROSE), lid open, vapour; the display reads `−18 °C` then `−5 °C`; the
  thermometer shows both marks.
- warmer: Dash points up the thermometer: arrow "warmer ↑"; `−5 > −18`; chip "change = final − start"; board:
  `−5 − (−18) = ?`; Kavya `sad` (her worst kind of sum).
- pattern: `mkTable`/working column: `5 − 3 = 2`, `5 − 2 = 3`, `5 − 1 = 4`, `5 − 0 = 5`, each on the beat; the
  subtracted number shrinks, the answer grows (arrows down the left: "−1 each", right: "+1 each").
- up: two more rows `5 − (−1) = 6`, `5 − (−2) = 7` in green; Kavya `happy`.
- rule: banner `a − (−b) = a + b`; then `−5 − (−18) = −5 + 18 = 13`; the thermometer gets a brace "+13";
  stamp CORRECT!.
- two: Ah Boy, hand up: `−4 + (−6) = 10` with "two negatives = positive?"; stamp BZZT!. Hold.
- left: number line −12..2: hop from −4, 6 to the left, landing on −10; chip "× ÷ only!"; Dash `annoyed`.
- chain: number line −8..4: −7 → (+4) → −3 → (−(−5) = +5) → 2; Kavya points.
- diff: the thermometer with 33 °C (a sun icon, "Singapore, 3 p.m.") and −18 °C (freezer); brace
  "difference = higher − lower = 33 − (−18) = 51 °C"; Rose shuts the lid on Ah Boy's fingers (gently). Hold.

## 2 cards: Red and black (Multiplying & dividing negative numbers)
Layout: `ipBooth` "CARD GAMES" (green); Priya and Kavya behind the table facing the camera, cards on the table
(`ipCard`, black = positive, red = negative, value chips under each card). Dash and Dasha on the table. A
board on the right for the pattern. Showpiece: the pattern table running past zero, and Dasha crossing Dash
into a "+".
- priya: Priya (lower third PRIYA), smug, shuffling; chips "black = +", "red = −", "biggest product wins".
- mine: her black 3 and red 4 flip; `3 × (−4) = −12`; three hops of −4 on a small number line.
- reds: Kavya's red 3 and red 4 flip; `(−3) × (−4) = ?` with "−12?" in grey.
- pattern: board column: `3 × (−4) = −12`, `2 × (−4) = −8`, `1 × (−4) = −4`, `0 × (−4) = 0` (aligned with
  `mkWorking`), building on the beats.
- up: arrows "+4" between the rows; then `−1 × (−4) = 4`, `−2 × (−4) = 8`, `−3 × (−4) = 12` in green; stamp
  CORRECT!.
- dasha: Dasha bounces in (lower third DASHA), `happy`.
- ugh: Dasha rotates 90° and slides onto Dash: a "+" (or `dash.set({ plus: 1 })` with Dasha beside him);
  chip "(−) × (−) = +"; Dash `shock` then `deadpan`. Hold.
- rule: a 2 × 2 sign table (`mkTable`): × or ÷ | + | − ; + | + | − ; − | − | +; "same signs → +, different → −";
  then `−12 ÷ (−3) = 4`.
- friend: Ah Boy pops up; chips "friend × friend = friend", "enemy × enemy = friend", "friend × enemy = enemy";
  Dasha `happy`.
- sister: Dash `deadpan`, Dasha hugs him. Hold.
- five: five red cards fan out: −1, −2, −3, −4, −5.
- count: `1 × 2 × 3 × 4 × 5 = 120`; the five minus signs counted 1-5, "odd → −"; result `−120`; chip "even
  number of negatives → +".
- est: Mr Tan walks past with a clipboard (lower third MR TAN): `−38 × 21 ≈ −40 × 20 = −800`, then
  `−38 × 21 = −798` ✓ "close".
- let: Priya `annoyed` → `smug`; chip `12 > −12`; Kavya `deadpan`. Hold.

## 3 queue: Now serving: Brackets (Order of operations)
Layout: `ipBooth` "MATHS QUIZ" (amber); Mr Tan at a lectern at the right with a quiz card; the family team
(Dad, Mum, Kavya) behind the table at the left with a sign "DAD AND THE CALCULATORS"; the rice cooker on a
prize stool; Queenie on her pole in the middle. Showpiece: the operations as queue tickets B, I, DM, AS being
served in order, with the expression evaluating under them.
- team: Dad (lower third if not shown), smug; chip "11 a.m."; team sign; the rice cooker glows.
- q1: Mr Tan reads; the question big: `sqrt(4) + 16 * 2`.
- dad / mum / kav: three answer cards slap down: `36`, `6`, `34` (one per beat).
- queenie: Queenie (lower third QUEENIE), `ding`; LED "NOW SERVING".
- bidmas: four tickets pop out and line up: **B**rackets, **I**ndices (powers & roots), **D** **M** (one ticket),
  **A** **S** (one ticket); the LED shows B, I, DM, AS in turn.
- work: under the question: `sqrt(4) = 2` (I), `16 * 2 = 32` (DM), `2 + 32 = 34` (AS); stamp CORRECT! on 34.
- cut: Dad's route `(2 + 16) * 2 = 36` and Mum's `sqrt(4 + 16 * 2) = sqrt(36) = 6` in red; stamp BZZT!;
  Queenie `annoyed`.
- q2: `12 ÷ 3 * 2`.
- mum2: Mum: `12 ÷ (3 × 2) = 12 ÷ 6 = 2` in red; stamp BZZT!.
- ticket: one ticket "D M" with both letters; arrow left → right: `12 ÷ 3 = 4`, `4 × 2 = 8`; a second
  ticket "A S".
- q3: `20 - 3 * (5 - 7)^2`.
- work3: `mkWorking`: `= 20 − 3 × (−2)²` (B), `= 20 − 3 × 4` (I), `= 20 − 12` (M), `= 8` (S), each labelled.
- calc: Dad's calculator (big `mkCalculator`) displays `-3²` then `−9`; Dad `shock`.
- touch: `-3^2 = -(3^2) = -9` vs `(-3)^2 = 9`, the bracket glowing; chip "the power touches only the 3".
- prize: Mr Tan hands Dad a calculator (a second `mkCalculator`, ribbon "3rd").
- are: Dad holds both calculators, `happy`; Mum and Kavya `deadpan`. Hold.

## 4 inator: The Power-inator (Squares, cubes, ± roots, estimating roots)
Layout: `ipBooth` "ROBOTICS CLUB" (purple); Pip on the table in the middle (s ≈ 0.9); Priya at the right, Ah
Boy and Kavya at the left. A side board for lists. Numbers go IN the hopper as chips and come OUT of the chute.
Showpiece: the ±7 moment: √49 comes out as one 7, Dash climbs in, and a second ball "−7" rolls out.
- priya: Priya (lower third PRIYA if needed), proud; Pip's buttons light one by one on "square, cube, square
  root, cube root".
- seven: Ah Boy drops a "7" ball in the hopper.
- sq: Pip (lower third PIP) `btn: 0`; readout `49`; `7^2 = 7 * 7 = 49`; side board "square numbers": 1, 4, 9,
  16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225 (49 lit).
- cube: `btn: 1`; `4^3 = 4 * 4 * 4 = 64`; cubes list 1, 8, 27, 64, 125 … `10^3 = 1000`.
- rev: `btn: 2`; `sqrt(49) = 7`; one ball "7" out.
- me: Dash, on the table, `annoyed`: `(-7) * (-7) = 49`; he climbs into the hopper; a second ball "−7" rolls out.
- pm: two balls side by side "7" and "−7"; `+-7`; chip "√ alone = the positive root: `sqrt(49) = 7`".
- x2: Kavya: `x^2 = 49 ⇒ x = +-7`; her test (inset) question 6 gets a green tick; stamp CORRECT!.
- trap: Ah Boy drops "50"; Pip whirs (`shake`); a number line 6..9 with 36, 49, 64, 81 under 6, 7, 8, 9; `49 < 50 < 64 ⇒ 7 < sqrt(50) < 8`; the dot just
  right of 7.
- check: `7.1^2 = 50.41` (too big, red), readout `7.07`; `sqrt(50) ~= 7.07`.
- bigger: Priya smug; chip "squaring always makes it bigger?" with a "?".
- half: Ah Boy holds up a "½" ball, innocent. Hold.

## 5 zones: Grow, shrink or flip (THE SET PIECE: powers and roots of decimals and negatives)
Layout: as `inator`; the hopper/chute action continues; after `error`, cut to `ipZones` full width on the
board. Each result appears big with its input → output arrow and a GROW / SHRINK / FLIP label in the zone
colour (green, amber, red). Showpiece: Dash squared comes out as a "+", and the three-zone board building row by
row as Mr Tan speaks.
- half: "0.5" in; `0.5^2 = 0.5 * 0.5 = 0.25`; a square of side 0.5 shaded inside a 1 × 1 square (a quarter of it).
- broken: Priya `shock`; stamp BZZT! on her earlier "always bigger" chip; chip `0.25 < 0.5` "SHRINK".
- quarter: "half of a half = a quarter"; chip "between 0 and 1: squaring makes it smaller".
- tenth: Ah Boy drops "0.1".
- milli: `btn: 1`; `0.1^3 = 0.1 * 0.1 * 0.1 = 0.001`; SHRINK again (an arrow shrinking to a dot).
- root: Priya: `btn: 2`; `sqrt(0.25)`.
- grow: `sqrt(0.25) = 0.5` because `0.5^2 = 0.25`; chip "the root is bigger" GROW. Priya `annoyed`.
- me: Dash climbs into the hopper; chip "−3".
- nine: `btn: 0`; `(-3)^2 = (-3) * (-3) = 9`; Dash slides out of the chute as a "+" (`plus: 1`), `shock`.
- off: Dash shaking the plus bar, `annoyed`; chip "FLIP: negative² → positive". Hold.
- flip: Kavya; chip "same signs → +"; Dash (plus fading) climbs back in, "−2".
- cube: `btn: 1`; `(-2)^3 = (-2) * (-2) * (-2) = 4 * (-2) = -8`; Dash comes out still a minus; chip "odd number of
  negatives → still negative".
- one: Ah Boy drops the "−8" ball; `btn: 3`; `cbrt(-8) = -2` because `(-2)^3 = -8`; chip "exactly one cube root".
- big: Dash, determined, holds a "−9" ball.
- error: `btn: 2`; `3^2 = 9`, `(-3)^2 = 9`, "nothing squares to −9"; Pip `err: 1`, `smoke: 1`, `shake: 1`,
  `shock`; chip `sqrt(-9)`: "no real answer (Year 8)". Hold.
- zones: cut to `ipZones`: title "GROW, SHRINK or FLIP"; zone "above 1" (green) lights with its card rows
  (x² bigger 3² = 9, √ smaller √9 = 3), then "0 to 1" (amber) with its rows.
- neg: "below 0" (red) lights with its four rows; then the pins at 0 and 1 "never move: 0² = 0, 1² = 1". Mr Tan
  inset bottom-right, `happy`.
- label: back at the booth: Pip lying on his side, smoking gently; Priya slaps on a sticker "WARNING: NOT ALL
  INPUTS GROW". Hold.

## 6 fold: Fold to the Moon (Powers and the index laws)
Layout: `ipBooth` "FOLD TO THE MOON" (pink); Mum runs the booth (right), Dad (with his new calculator), Kavya
and Ah Boy (left); a paper stack (`ipPaper`) on the table that grows with each fold; Tiny and Basil on the table.
A board on the right for the laws, written as boxes of 2s (like the guide diagram). Showpiece: three boxes of
"2" and four more boxes of "2" sliding together into seven: `2³ × 2⁴ = 2⁷`.
- fold: chip "2 p.m."; Mum folds: layers 1 → 2 → 4 → 8; `2 * 2 * 2 = 8`.
- tiny: Tiny (lower third TINY) bounces onto the stack; `2^3` with the 3 glowing: "index = how many 2s".
- basil: Basil (lower third BASIL), `deadpan`, belly "2"; chip "base".
- dad: Dad, smug with his calculator: `2^3 * 2^4 = 4^7` in red; stamp BZZT!. Hold.
- change: Basil, `annoyed` for the only time: "THE BASE. DOES NOT. CHANGE." one word per beat.
- add: three boxes of 2 and four boxes of 2 slide together: seven 2s; `2^3 * 2^4 = 2^(3+4) = 2^7`; chip
  "multiply → add the indices"; stamp CORRECT!.
- unfold: the stack halves three times: `2^7 ÷ 2^3 = 2^(7-3) = 2^4`; three 2s on the bottom cancel three on top
  (as a stacked fraction, crossed out).
- power: `(2^3)^4 = 2^3 * 2^3 * 2^3 * 2^3 = 2^12`; "power of a power → multiply: 3 × 4 = 12".
- zero: `2^3 ÷ 2^3 = 1` and `2^3 ÷ 2^3 = 2^0` side by side ⇒ `2^0 = 1`; a single sheet. Kavya `happy`.
- mad: chip column "**M**ultiply → **A**dd · **D**ivide → **S**ubtract · **P**ower → **M**ultiply".
- letters: `3x^2 * 4x^5 = 12x^7` (numbers × , letters add).
- same: `2^3 * 5^2 = 8 * 25 = 200`; chip "different bases: just work it out"; Basil belly "2", then "5".
- moon: an inset: Earth, Moon, a paper tower; `0.1 * 2^42 mm ~= 440 000 km`; chip "Moon ≈ 384 000 km away".
- seventh: Dad straining over a fat folded wad (6 folds = 64 layers); Mum `deadpan`. Hold.

## 7 family: The family photo (Types of number)
Layout: the void deck, a photo backdrop "RC FAMILY DAY 2026"; Mr Tan with a phone-camera at the right; the
family lined up behind a bench (busts); in front of them a big nested-ovals diagram (natural ⊂ integers ⊂
rational, inside a "real numbers" rectangle) where the numbers take their places like a family photo.
Showpiece: Uncle Pi pushing into the photo and landing outside the rational oval, still talking.
- tan: Mr Tan (lower third if needed); chip "4 p.m."; the empty nested ovals appear.
- natural: the innermost oval "Natural" fills with 1, 2, 3, 4, …; Ah Boy `happy`.
- integers: Dash steps into the "Integers" oval next to −3 and 0; `smug` (his only one), a tiny heart.
- rational: the "Rational" oval: `2/5`, `0.75 = 3/4`, `0.333… = 1/3`; chip "a/b, integers, b ≠ 0".
- dolls: `−6 = −6/1`; `natural ⊂ integers ⊂ rational`; the ovals pulse in turn like nesting dolls.
- simplify: Ah Boy holds up the cards; `sqrt(16) = 4` → natural; `-sqrt(9) = -3` → integer; `12/4 = 3` → natural; each card flies into its oval.
- pi: Uncle Pi (lower third UNCLE PI) squeezes in, ticker scrolling `3.1415926535…`.
- irr: π and `sqrt(2) = 1.41421356…` placed OUTSIDE the rational oval in an "Irrational" zone; chips "never
  ends", "never repeats", "not a fraction".
- real: the outer rectangle labels itself "Real numbers"; Mr Tan raises the camera: "cheese".
- pi3: FLASH (`ipFlash`); freeze frame of the photo, Uncle Pi mid-word, everyone else smiling. Hold.

## 8 kueh: The last piece of kueh (Negative indices, STRETCH)
Layout: `ipFlat` (evening); the plate of kueh (`ipKueh`) on the table; Kavya, Ah Boy, Mum behind the table;
Dash and Tiny on the table. A ladder on the right: powers of 2 from 2⁴ down to 2⁻³ with their values, built one
rung per beat (like the guide diagram), each rung "÷ 2". Chip "STRETCH: Year 9 look-ahead".
- six: chip "6 p.m."; the full plate of 16.
- halve: pieces vanish in halves: 16, 8, 4, 2, 1; rungs `2^4 = 16`, `2^3 = 8`, `2^2 = 4`, `2^1 = 2`, `2^0 = 1`.
- more: the last piece is cut: ½, ¼, ⅛ (it shrinks); Ah Boy `happy`.
- down: rungs `2^(-1) = 1/2`, `2^(-2) = 1/4`, `2^(-3) = 1/8`.
- us: Dash hopeful (`happy`!): chip `2^(-3) = -8?`; stamp BZZT!.
- flip: Tiny: `a^(-n) = 1/a^n`; `2^(-3) = 1/2^3 = 1/8`; chip "flip, not minus".
- never: Dash `sad`, slumps. Hold.
- ten: a strip `10^(-1) = 0.1`, `10^(-2) = 0.01`, `10^(-3) = 0.001`; then `2^3 * 2^(-5) = 2^(3 + (-5)) = 2^(-2)`
  ("= 1/4").
- crumb: Ah Boy holds up a crumb: `2^(-10) = 1/1024`; chip "2¹⁰ = 1024: computer memory"; Mum `deadpan`. Hold.

## 9 traps: The void deck saves you some marks
- intro: "6 EXAM TRAPS" over the void deck wide shot.
- t1 (TH, Queenie): card `12 ÷ 3 × 2 = 4 × 2 = 8` (✓) vs `12 ÷ 6 = 2` (✗); ticket "D M".
- t2 (TH, Tiny): card `3^4 = 3 * 3 * 3 * 3 = 81` (✓), `3 × 4 = 12` (✗).
- t3 (TH, Kavya): card `x^2 = 25 ⇒ x = 5` or `x = -5`; the test's question 6 ticked.
- t4 (TH, Dad): his calculator: `(-3)^2 = 9` (✓), `-3^2 = -9`.
- t5 (TH, Mum): card `(8 + 4)/(2 * 3) = 12/6 = 2` with the top and bottom boxed; "whole top, whole bottom".
- t6 (TH, Rose): thermometer `−7 °C` → `5 °C`: `5 - (-7) = 12` (✓), "2" (✗).
- return: logo "NEGATIVE VIBES will return".
- twenty: `ipFlat` evening, chip "Monday evening"; Kavya holds the test: score 20/20 (green), all three ticks; the family claps.
- proud: Dash on the paper, `happy`, the plus bar starting to grow…
- ugh: …full "+"; Dash `deadpan`. Hold.
- meanwhile: the void deck at night, chairs stacked, one tube light on.
- still: Uncle Pi alone, ticker still scrolling, `happy`. Final frame holds.

## Suggested split for the animators
Timeline total 11.82 min (cold 60 s).
- Writer: cold (done).
- A: freezer, cards, traps (about 3.6 min).
- B: queue, inator, family (about 3.7 min).
- C: zones, fold, kueh (about 3.6 min).
