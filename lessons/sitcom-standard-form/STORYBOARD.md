# MIND THE ZEROS, Ep 3 "Stuck on Ten": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Powers of 10 & Standard Form.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** A bottle episode. Saturday, 10 a.m.: the lift in Block 208 gets stuck at floor 10 with six humans
inside: Kavya, Mum (with a 1 kg bag of rice), Dad (phone full), Ah Boy (piggy bank, and Spotty the ladybird in a
jar), Priya (calculator, Space Trumps cards) and Kavya's maths teacher Mr Tan, who lives one floor down and has a
whiteboard marker (the lift's stainless-steel wall wipes clean). The display is stuck on "10". Living in it are
**Big Ten**, the base (huge, amber, only ever says "Ten."), and riding on his shoulder in the superscript
position, **the Index** (tiny, pompous, in charge; "also called the power, also called the exponent"). While Dad
waits for the technician ("How long can it take?"), the lift's residents teach the whole topic: **Dot** the
decimal point (the point stays still, the digits move) and **Nought**, a little zero who wants a job and becomes
a place-holder; the lift's floors as powers of 10 (ground floor 10⁰ = 1, basements are small, not negative);
**Norm**, the doorman of Club Standard Form (1 ≤ A < 10, "Not on the list"); Space Trumps and the HDB rule
(floor first, then the flat); **E** on Priya's calculator; counting rice, sunlight and Auntie Rose's viral video
views. Stinger: Monday, the lift is fixed. It stops on 10 again. Big Ten says his first full sentence.

Guide sections (lib/topics/standard-form/guide.ts) by scene: multiplying-dividing-by-powers-of-ten → `moves`;
powers-of-ten → `floors`; large-numbers → `big`; small-numbers → `small`; comparing-standard-form → `compare`;
calculating-standard-form (stretch) → `calc`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'index'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, index, ten, nought, dot, norm, e.
- **Humans are the heart.** They speak just over half the lines and are on screen in every scene (Auntie Rose by
  video call from her stall downstairs). The cartoons are guests in the stuck lift. Humans are busts standing
  behind the lift's handrail: build `sfLift`, move `lift.front` and `lift.top` into your own layer above the
  characters (as `00_cold.js` does), and put the busts at y ≈ 500, s ≈ 0.84 (Ah Boy 22 px lower). Default
  standing order, left to right: Kavya 165, Mum 325, Dad 485, Ah Boy 640, Priya 790, Mr Tan 945
  (`XS` in `00_cold.js`). Build each human once per scene and move or hide it with `op`.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  The Index is `smug`, `annoyed` when anyone forgets he is in charge, `happy` only when someone says "exponent".
  Big Ten is `deadpan`, always. Nought is `happy` and eager, `sad` when told he is nothing, and wears his
  PLACE-HOLDER badge (`badge: 1`) from `moves.job` onwards. Dot is serene (`neutral`), `annoyed` only when she has to
  hop. Norm is `deadpan`, holds up his palm (`stop: 1`) for "Not on the list", reads the clipboard (`list: 1`).
  E is `happy`. Dad is `smug` right before every mistake. Ah Boy is `happy` even when wrong. Priya is `smug`, then
  `annoyed` when she loses. Mr Tan is `happy` at his own puns; everyone else goes `deadpan`. Mum is brisk (`neutral`)
  and sneezes from `small` onwards. Kavya is `deadpan` at Dad, `happy` when she gets it.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **WRONG FLOOR.** Every time the Index says "Wrong floor", the lift buzzer goes: `sfStamp(parent, 'wrong')`
     (red WRONG FLOOR) thumps on (scale ~0.5) and the in-lift display flashes (alternate `lift.disp.set('10')` /
     `lift.disp.set('  ')` for 0.6 s). Lines: floors.one, floors.small, big.places, compare.powers, calc.never.
     `sfStamp(parent, 'ding')` (green DING!) on a correct answer: floors.one's "10⁰ = 1" result, big.n8,
     small.hopr, compare.floor, calc.views.
  2. **Norm's door.** Each time Norm speaks we cut to `sfClub`: a guest number (a `mkChip` with the maths) queues
     at the velvet rope; NOT ON THE LIST (`sfStamp(.., 'list')`) when A is outside 1 to 10; the repaired number
     gets YOU'RE IN (`sfStamp(.., 'in')`) and `club.rope(1)`. Lines: big.norm/fix/toobig, small.small, calc.renorm,
     calc.club, traps.t2.
  3. **"How long can it take?"** Dad (cold.hard, big.long, traps.ground). Each time everyone turns to camera,
     deadpan. A red chip in the lift's top right counts the wait: "STUCK: 0 min" (cold), "10 min" (moves.ten),
     "30 min" (floors.buttons), "40 min" (big.long), "50 min" (compare.card), "1 hour" (calc.hour).
  4. **The Index's three names.** index / power / exponent pop as chips whenever he lists them (cold.hi); in
     compare.name he is `happy` for the only time in the episode, crown wobbling.
  5. **Nought wants a job.** Little cream "0" who keeps volunteering. `sfPVGrid` draws every place-holder zero in
     his cream colour (`SF.holder`), so his "job" is visible every time: moves.holder, big.back, small.right5,
     traps.t6.
  6. **Mr Tan's puns** land to silence and lift music: a small green chip "♪ lift music ♪" and deadpan faces
     (cold.pun, floors.mads).
  7. **Ah Boy presses buttons**: from floors.buttons on, all twelve floor buttons stay lit (`lift.lights(12)`).
- **Talking heads** (TH below) use `sfConf(root, who)` full stage, the character big (s ≈ 1.3-1.5) at about
  (330, 420), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `sfLowerThird(root, who)` for about 3 s. Lower thirds already shown in `cold`: Kavya, Mr Tan, Ah Boy, Dad,
  the Index, Big Ten. First lower thirds still to show: Nought (moves.nought), Dot (moves.dot), Priya (moves.gap),
  Mum (moves.how), Norm (big.norm), E (compare.e), Auntie Rose (calc.call). Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, power or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`10^(-3)`, `4.5 * 10^4`, `1 <= A < 10`), `mkWorking` for aligned
  working, `mkText` for sentences that mix words and maths. On the lift's steel wall write in `SF.marker`
  (blue marker); on dark backgrounds use `C.ink`. Long ordinary numbers are written with thin spaces as in the
  captions: in `mkMath` quote them, `'"150 000 000"'`, or put them outside `{{ }}` in `mkText`. Negative powers
  as `10^(-4)`; the minus in A as `-3 * 10^(-2)`. Never write "E" notation as maths except on E's display
  (`sfSeg`/`sfCalc`). The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds and the busts' own shirts behind the rail. At most ~1,000 elements per scene: six busts in the
  lift are about 450 elements with the set, so hide what a shot does not need.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`sfLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right; lives at #12-05 | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / #12-05. Stuck. |
| mum | Mum: brisk, practical, hay fever | magenta kurta, bun, bindi; empty hand: draw `sfRice(mum.hand, 0.62)` in it | MUM / Brought the rice. |
| dad | Dad: confident, wrong, lovable | glasses, moustache, green polo; prop phone (full) | DAD / "How long can it take?" |
| boy | Ah Boy, 8: presses buttons, asks the obvious question | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Presses buttons. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; prop calculator | PRIYA / Best friend. Competitive. |
| tan | Mr Tan: dry, kind, puns; cannot stop teaching | shirt and tie, glasses; prop blue whiteboard marker (`lift: 1` writes) | MR TAN / Maths teacher. Lives downstairs. |
| rose | Auntie Rose (video call only, from her stall downstairs) | `sfRoseCall` (phone far too close: the series gag) | AUNTIE ROSE / Rose's Kitchen, downstairs |
| index | THE INDEX: tiny, pompous, in charge | gold numeral tile with a face, crown, red collar; `val` shows his number ('n', '3', '−2'), `point` | THE INDEX / Also the power. Also the exponent. |
| ten | BIG TEN, the base: huge, deadpan, says "Ten." | dark display body with a glowing amber seven-segment "10", big arms, small head; `glow`, `flex` | BIG TEN / The base. Does the lifting. |
| nought | NOUGHT: a little zero who wants a job | plump cream "0" ring with legs; `badge` (PLACE-HOLDER), `wave` | NOUGHT / A zero. Looking for work. |
| dot | DOT, the decimal point: serene, "I do not move" | small plum ball, cross-legged on a yoga mat; `hop` tucks the legs | DOT / Decimal point. Does not move. |
| norm | NORM, doorman of Club Standard Form (the normaliser) | huge bouncer, black suit, sunglasses up, earpiece, clipboard "THE LIST 1 ≤ A < 10"; `stop`, `list` | NORM / Doorman, Club Standard Form |
| e | E, the calculator's exponent letter: bubbly | pale-green LCD tile with a seven-segment "E", little legs | E / Priya's calculator. E for exponent. |

The Index rides on Big Ten's right shoulder: `tr(index, ...sfPerch(tenX, tenY, tenS))` (the superscript
position). When he talks alone, he can also stand on the handrail at s ≈ 1. Narrator: never drawn.

## Sets and props (lib.js)

Sets: `sfLobby` (ground-floor lift lobby, Blk 208; `open(p)`, `disp[0]`), `sfLift` (MAIN: inside the lift; board
area `g.board` above the heads; `disp` (the in-lift floor display), `press`, `lights`, `alarm`, `dim`, `upd`;
layers `mid` / `front` / `top`), `sfDisplay` (close-up of the floor display, `seg`, `arrow`), `sfClub` (Club
Standard Form: neon sign, door, velvet rope `rope(p)`, THE LIST poster), `sfRoseCall` (Auntie Rose's video call
from the stall), `sfSpace` (Sun, Earth, Moon, Neptune), `sfScope` (microscope view: `show('ladybird' | 'pollen' |
'cell', p)`), `sfConf` (talking heads).
Props: `sfPVGrid` (place-value grid, fixed red decimal point, `num(str, row)` rows of digit tiles that `shift(k)`
slide; place-holder zeros in Nought's cream), `sfFloors` (the floor chart 10³ … 10⁻³: `row`, `val`, `hl`, `car`,
`steps`), `sfSeg` (seven-segment text), `sfStamp` (WRONG FLOOR / DING! / NOT ON THE LIST / YOU'RE IN), `sfRice`,
`sfPiggy` (`coins(k)`), `sfJar` (Spotty inside), `sfLadybird`, `sfPhone` (`screen: 'storage' | 'video'`),
`sfCard` (Space Trumps card: `title`, `art`, `src`; `hl`, `bent`), `sfCalc` (seven-segment display: `set('2.4E-08')`).
Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkChip`, `mkSpeechBubble`, `mkBrace`, `mkCoin('10c')`,
`mkNumberLine`. Lib: `arrow`, `chip`, `tick`, `cross`, `strike`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `sfLobby`, slow push towards the left lift; Kavya bust foreground left looking at it; the lift display
  counts 3, 2, 1; the doors slide open at the end of the line; chips "Kavya, age 12", "Saturday, 10 a.m.",
  "Blk 208, lift lobby"; lower third KAVYA, 12.
- crowd: cut inside the lift (`sfLift`); Kavya at the left; Mum (holding up the rice), Dad, Ah Boy, Priya, Mr Tan pop
  up behind the rail as each is named, with a small name chip over each head; the display counts the floors up.
- upstairs: Kavya deadpan to camera; chip "lives on floor 11" over Mr Tan; lower third MR TAN.
- morning: Mr Tan happy, waving his marker (`lift: 1`); Kavya deadpan, looking at him.
- clunk: CLUNK! (big orange word, the whole lift shakes) as the display reaches 10; the lights dim; everyone
  shock; Ah Boy, hand up, talks; lower third AH BOY, 8.
- hard: Dad smug, presses the alarm (the bell flashes); lower third DAD; in the pause everyone turns to camera,
  deadpan; red chip "STUCK: 0 min".
- pun: Mr Tan happy, everyone deadpan looking at him; in the pause, chip "♪ lift music ♪". Hold.
- tiny: cut to `sfDisplay`; documentary viewfinder (corners, REC, "ZOOM ×"); slow push-in on the amber "10".
- hi: the Index pops up at the superscript position of the "10" (top right): the display reads 10ⁿ; chips
  index, power, exponent pop on the beat; lower third THE INDEX.
- lost: the Index annoyed, arms out (he is right here).
- ten: the "10" on the display goes dark and Big Ten steps out of it, big, fists up (`flex`); the Index slides onto
  his shoulder; labels "the base" (arrow to Big Ten) and "the index" (arrow to the Index); lower third BIG TEN.
- bigten: Big Ten, deadpan: "Ten."; a card `10^n` appears; hold.
- stuck: back in the lift: Big Ten squeezed in behind the six humans, the Index on his shoulder pointing at the
  camera; chips "6 humans", "stuck on 10", then "mind the zeros".
- title: dark title card with amber rays and a ghost seven-segment "10"; logo "MIND THE / ZEROS"; "Episode 3:
  Stuck on Ten"; the cast pops in: Kavya, Ah Boy, Big Ten (the Index on his shoulder), Dad, Mr Tan. Hold.

## 1 moves: Ah Boy's piggy bank (× and ÷ by 10, 100, 0.1 and 0.01)
Layout: `sfLift`, lights dim, display "10", chip "STUCK: 10 min". Mr Tan writes on the steel wall (`g.board`) in
blue marker. Dot sits on the handrail at the right (layer above the rail, s ≈ 0.7, about (900, 560)); Nought pops
up on the rail at the left (s ≈ 0.65). The showpiece is `sfPVGrid({ from: 2, to: -4, cell: 84 })` on the wall
(x ≈ 170, y ≈ 110): digit tiles slide across the columns while the red decimal point stays still. For the coins,
cut to a close shot of the handrail with Ah Boy big (s ≈ 1.2) and his `sfPiggy`, coins `mkCoin('10c')`.
- ten: chip "Ten minutes in"; Mr Tan uncaps the marker (`lift: 1`); the STUCK chip ticks to 10 min.
- steel: Mr Tan writes `3.5 × 10 = ?` on the wall; everyone else deadpan.
- zero: Ah Boy (hand up, happy) shouts; the wall gets `3.50` in Ah Boy's handwriting colour (orange).
- nought: Nought pops up on the rail, waving (`wave: 1`); lower third NOUGHT; a little "0" sparkles on the end
  of `3.50`.
- dot: Dot rolls in to the right (lower third DOT), serene; `3.50 = 3.5` with the 0 crossed out (`strike`);
  chip "a zero on the end changes nothing".
- nothing: Nought sad; hold.
- move: the place-value grid: row `3.5` (3 in ones, 5 in tenths), the tiles slide ONE column left to make `35`
  (`row.shift(1)` animated), the red point line stays put; arrow "× 10: one place left"; `3.5 × 10 = 35`.
- column: Kavya; the grid headers glow left to right with "× 10" hops between neighbouring headers
  (1 → 10 → 100); chip "each column = 10 × the column on its right".
- slide: grid rows: `3.47` → shift 1 left → `34.7` (`3.47 × 10 = 34.7`); then `3.47` → shift 2 right → `0.0347`
  (`3.47 ÷ 100 = 0.0347`), the new zeros in Nought's cream. Side card lists all four: `3.47 × 10 = 34.7`,
  `3.47 × 100 = 347`, `3.47 ÷ 10 = 0.347`, `3.47 ÷ 100 = 0.0347`.
- gap: Priya (lower third PRIYA) points: row `6.2` slides 2 left; an empty dashed tile in the ones column with a
  "?" bubble.
- holder: a cream place-holder 0 drops into the gap: `6.2 × 100 = 620`; small note `6.2 ÷ 100 = 0.062`.
- job: Nought gets his PLACE-HOLDER badge (`badge: 1`), shock → happy; DING! stamp (small). Hold.
- coins: close shot: Ah Boy (big) shaking his piggy bank; 40 ten-cent coins pile up (4 stacks of 10, `mkCoin('10c')`);
  `10c = $0.10`; `40 × 0.1 = ?`; thought bubble "multiplying makes it bigger!" with a $$$ sparkle.
- tenth: Dot: `0.1 = 1/10`; the 40 coins split into 10 equal stacks, one stack highlighted:
  `1/10 of 40 = 4`, so `40 × 0.1 = 4` ($4); chip "× 0.1 is the same as ÷ 10".
- less: Ah Boy sad-happy; the sparkle pops. Hold.
- how: Mum (lower third MUM): `$40 = ? ten-cent coins`; `40 ÷ 0.1`: how many tenths fit into 40?
- four: Kavya: ten coins per dollar ($1 = 10 coins), so `40 ÷ 0.1 = 400`; chip "÷ 0.1 is the same as × 10".
- hundredth: Dot: the swap table (`mkTable`, 4 rows): `× 0.1` = `÷ 10`; `× 0.01` = `÷ 100`; `÷ 0.1` = `× 10`;
  `÷ 0.01` = `× 100`, with a column "digits move": 1 place right / 2 places right / 1 place left / 2 places left.
- pig: Ah Boy deadpan to camera, holding the tiny piggy bank; 400 coins tower beside it. Hold.

## 2 floors: Every floor is a power of 10 (positive and negative powers of 10)
Layout: `sfLift`, all twelve buttons lit, chip "STUCK: 30 min". Big Ten stands at the right of the wall (behind
the humans, s ≈ 0.8, about (930, 300)) with the Index on his shoulder. Showpiece: `sfFloors({ top: 3, bottom: -3 })`
on a board shot (zoom on the steel wall, humans hidden, the speaker's bust popping in small at the lower left
for their own lines, as the pilot's `share` scene does with Kavya): the lift car rides down the floors 10³ →
10⁰ → 10⁻³ while each value appears.
- buttons: chip "Half an hour in"; Ah Boy presses every button: they light one by one (`lift.lights(k)`); the
  others deadpan.
- lesson: the Index (val '3') points at Big Ten.
- three: Big Ten says "Ten" three times: three small Big Tens (or three amber "10" tiles) pop in a row, one per
  "Ten", with "×" between them.
- cube: `10^3 = 10 × 10 × 10 = 1000`; labels "base" under the 10 and "index" over the 3; floor 10³ lights on the
  chart: 1000 thousands.
- million: Kavya: `10^6 = 1 000 000`: a "1" followed by six cream zeros counted 1-6 (Nought's cousins).
- down: board shot: the floor chart, the car at 10³; the car moves down a floor per value: 1000, 100, 10, the
  "÷ 10" arrows drawing between rows; a "?" at the ground floor.
- zero: Ah Boy (pops in, hand up): `10^0 = 0`? in orange, with "no tens!".
- one: the Index: WRONG FLOOR stamp; `10 ÷ 10 = 1`, so `10^0 = 1`; the G floor glows gold: "ground floor";
  DING! (small) on the 1.
- basement: Priya (smug): `10^(-1)`, `10^(-2)` = "negative?" `−100` in red.
- small: WRONG FLOOR; the car rides into the basements: `10^(-1) = 1/10 = 0.1`, `10^(-2) = 1/100 = 0.01`,
  `10^(-3) = 0.001`; chip "small, not negative" (green).
- columns: Kavya: the floor names light up: thousands … ones … tenths, hundredths, thousandths (the third column
  of the chart); chip "place-value columns are powers of 10".
- rule: back in the lift: the Index: `10^a × 10^b = 10^(a+b)` and `10^a ÷ 10^b = 10^(a−b)` on the wall;
  "multiply → add", "divide → subtract".
- updown: Dad: `10^5 × 10^(-2) = 10^(5 + (−2)) = 10^3`; the car goes up 5 floors and down 2 on a little shaft
  diagram (or on `sfFloors({ top: 5, bottom: -1 })`).
- divide: Kavya: `10^3 ÷ 10^4 = 10^(3 − 4) = 10^(-1) = 0.1` under it (`mkWorking`, equals signs aligned); check
  chip `100 000 × 0.01 ÷ 10 000 = 0.1`.
- mads: Mr Tan: `MADS` big, with **M**ultiply → **A**dd, **D**ivide → **S**ubtract; then the pun, Mr Tan happy,
  everyone deadpan; chip "♪ lift music ♪" in the pause. Hold.
- laugh: Big Ten, deadpan: "Ten." The Index slowly turns to look at him. Hold.

## 3 big: Club Standard Form (standard form for large numbers)
Layout: `sfLift`; then a cutaway to `sfSpace` for the Sun; the digit-hop showpiece on the steel wall; Norm's
cutaways at `sfClub`. Showpiece: the digits of 150 000 000 in a row of tiles, Dot hopping from the end, eight
numbered hops, to sit after the 1.
- project: Kavya holds up her project (or `sfSpace` cutaway): a dashed line from the Sun to the Earth labelled
  `150 000 000 km`; nine digits with the zeros pulsing ("too many zeros").
- sf: the Index: `A × 10^n` big, with braces: "A: 1 ≤ A < 10" and "n: an integer" (`1 <= A < 10`).
- hop: the digit tiles `1 5 0 0 0 0 0 0 0` on the wall; Dot (annoyed) hops from the right end, leftwards, landing
  just after the 1: `1.5`; chip "A = 1.5".
- count: Kavya: the hops are numbered 1 … 8 above the tiles; "9 digits → 8 hops".
- n8: the Index: `150 000 000 = 1.5 × 10^8 km`; DING!; small check under it: `1.5 × 100 000 000 = 150 000 000`.
- zeros: Dad (smug): `45 000`: he circles the three zeros: `4.5 × 10^3` in orange.
- places: WRONG FLOOR; `45 000` has 5 digits, 4 hops: `45 000 = 4.5 × 10^4`; chip "count places, not zeros".
- moon: Mr Tan writes `3.84 × 10^5 km` (the Moon, `sfSpace` inset with the Earth and Moon).
- back: Kavya: the digits of 3.84 slide 5 places left on a mini place-value grid (`sfPVGrid({ from: 5, to: -2 })`):
  `384 000`, the three new zeros in Nought's cream; `3.84 × 10^5 = 384 000 km`.
- family: Nought, delighted, points at the cream zeros ("my whole family"). Hold.
- phone: Dad holds up `sfPhone({ screen: 'storage' })`: 256 GB FULL; `1 GB = 10^9 bytes`; `256 × 10^9 bytes`.
- norm: cut to `sfClub`: the guest chip `256 × 10^9` at the rope; Norm (lower third NORM) reads the list
  (`list: 1`), then `stop: 1`: NOT ON THE LIST; `256` circled: "A = 256 is not < 10".
- fix: on the club wall: `256 = 2.56 × 10^2`, so `256 × 10^9 = 2.56 × 10^2 × 10^9 = 2.56 × 10^11`
  (`mkWorking`); the guest chip changes to `2.56 × 10^11`; YOU'RE IN; `club.rope(1)`.
- toobig: Norm, rule card: "A too big? ÷ 10, power + 1"; example `34 × 10^2 = 3.4 × 10^3` (both = 3400).
- long: back in the lift, Dad, chip "STUCK: 40 min"; everyone turns to camera.
- sofar: the Index: `2.4 × 10^3 seconds`.
- said: Kavya: `2.4 × 10^3 = 2400 s = 40 min`; Dad sheepish. Hold.

## 4 small: Spotty, pollen and Nought's big day (standard form for small numbers)
Layout: `sfLift`; Ah Boy's `sfJar` on the handrail (layer above the rail); microscope cutaways (`sfScope`); the
place-value grid on the wall for the small numbers; one `sfClub` cutaway. Showpiece: `0.000 030 8` on the
place-value grid with Nought's cream place-holder just before the 3, and the same number with him removed, ten times
too big.
- spotty: Ah Boy lifts the jar (Spotty wiggles); microscope inset `show('ladybird')`; ruler label `0.005 m`.
- neg: the Index: `0.005 = 5 × 10^(-3)`; chip "big → plus, tiny → minus" with an up arrow (+) and a down arrow (−).
- watch: Priya: `0.000 52` on the grid (`sfPVGrid({ from: 0, to: -5 })`); the 5 glows: "first non-zero digit";
  `A = 5.2`.
- hopr: Dot hops RIGHT four places, numbered 1-4, to sit after the 5; `0.000 52 = 5.2 × 10^(-4)`; DING!.
- short: Kavya: the four zeros in front (0.000 52) are counted 1-4, including the one before the point; chip
  "4 zeros in front → n = −4".
- counted: Nought, overjoyed, with four little zeros cheering. Hold.
- achoo: Mum sneezes (a puff cloud; the camera shakes a little); pollen specks float.
- pollen: Mr Tan writes `3.08 × 10^(-5) m`; microscope inset `show('pollen')`.
- right5: Kavya: on the grid (`sfPVGrid({ from: 0, to: -7 })`), `3.08` slides 5 places right: `0.000 030 8 m`,
  the zeros in cream; `3.08 × 10^(-5) = 0.000 030 8`.
- me: Nought jumps onto the cream 0 between the 3 and the 8 (his tile glows); a second row without him,
  `0.000 308`, in red: "× 10 too big!" (`0.000 308 = 10 × 0.000 030 8`).
- thanks: Mum, sniffing, pats Nought ("little zero"); Nought happy. Hold.
- cell: Priya; microscope inset `show('cell')`: `8 × 10^(-6) m` across (= 0.000 008 m).
- mine: Dad (smug): `0.45 × 10^(-3)`.
- small: cut to `sfClub`: guest chip `0.45 × 10^(-3)`, NOT ON THE LIST; chip "one digit, then the point";
  `0.45 × 10^(-3) = 4.5 × 10^(-1) × 10^(-3) = 4.5 × 10^(-4)` with the rule "A too small? A × 10, power − 1";
  YOU'RE IN; check `0.45 ÷ 1000 = 0.000 45`.
- sign: Kavya: a 2 × 2 card: "sign of the power → big or small", "sign of A → positive or negative", with
  `3 × 10^(-2) = 0.03` (small, positive) and `-3 × 10^(-2) = −0.03` (small, negative).
- like: Ah Boy holds up Spotty: chip `5 × 10^(-3)`: "small, but positive". Hold on Ah Boy's grin.

## 5 compare: Space Trumps (comparing and ordering; calculator displays)
Layout: `sfLift`, chip "STUCK: 50 min"; Priya and Ah Boy play cards on the handrail: `sfCard` big in the board
area. A cutaway of Block 208's front (a simple HDB block drawing with numbered floors) for the HDB rule. Then E
climbs out of Priya's `sfCalc`. Showpiece: the four cards sorting themselves into order.
- card: chip "Fifty minutes in"; title chip "SPACE TRUMPS: bigger number wins"; Priya slaps down her card:
  `9.9 × 10^4` (smug).
- mine: Ah Boy's card `1.1 × 10^5`; he hands Priya the win; Priya's card glows (`hl`).
- powers: WRONG FLOOR; the glow jumps to Ah Boy's card; under them: `1.1 × 10^5 = 110 000` > `9.9 × 10^4 = 99 000`.
- hdb: Kavya: the Block 208 cutaway; `#12-05`: the floor (12) brace "how high", the unit (05) brace "which flat";
  a #09-99 flat lower down, smaller.
- floor: the Index: "floor first, then the flat"; the power `10^5` is circled as the floor, A as the flat; DING!.
- win: Ah Boy dances; his card on floor 5, Priya's on floor 4 of the block.
- bent: Priya (annoyed) holds up her card with a bent corner (`bent(1)`). Hold.
- order: Mr Tan deals four cards: `4.2 × 10^5`, `3.9 × 10^6`, `8.1 × 10^5`, `2.7 × 10^4`.
- sort: Kavya: the cards group by power (10⁴ | 10⁵ 10⁵ | 10⁶), then the two 10⁵ cards swap by A (4.2 < 8.1):
  final row `2.7 × 10^4 < 4.2 × 10^5 < 8.1 × 10^5 < 3.9 × 10^6`; check chip
  `27 000 < 420 000 < 810 000 < 3 900 000`.
- tiny: Ah Boy, "smallest wins!": card `2 × 10^(-3)` (Spotty's card art).
- beat: Priya: card `9 × 10^(-5)`; number line of powers −5 < −3; `9 × 10^(-5) = 0.000 09` < `2 × 10^(-3) = 0.002`;
  her card glows. Priya smug.
- calc: Priya types `0.0006 × 0.000 04 =` on `sfCalc`.
- e: the display shows `2.4E-08`; E climbs out of the calculator (lower third E).
- power: Ah Boy: `2.4^(-8)` in orange with a "?".
- means: E: `2.4E-08` → `2.4 × 10^(-8)` (= 0.000 000 024); the E letter morphs into "× 10" with the power;
  `2.4^(-8)` crossed out; chip "E = exponent".
- name: the Index happy for once, crown wobbling; chips index, power, **EXPONENT** (the last one huge). Hold.

## 6 calc: Rice, sunlight and a viral video (calculating in standard form: stretch)
Layout: `sfLift`, chip "STUCK: 1 hour", a "STRETCH" badge; working on the steel wall in `mkWorking`; Norm
cutaways at `sfClub`; `sfSpace` for sunlight; `sfRoseCall` large (about 640 × 420) over the lift for Auntie Rose,
with `sfPhone({ screen: 'video' })`. Showpiece: the rice division `(1 × 10^3) ÷ (2 × 10^(-2))` collapsing step by
step into `5 × 10^4` grains.
- hour: chip "One hour in"; stomachs rumble (little "grr" chips); "STRETCH" badge.
- rice: Mum lifts `sfRice` (1 kg); a single grain magnified: `0.02 g`; "how many grains?"; Ah Boy starts counting,
  a counter "1, 2, 3…".
- split: the Index: `1 kg = 1000 g = 1 × 10^3 g`, `0.02 g = 2 × 10^(-2) g`; number of grains
  `= (1 × 10^3) ÷ (2 × 10^(-2))`; chip "**D**ivide the numbers, **S**ubtract the powers".
- work: Kavya: `= (1 ÷ 2) × 10^(3 − (−2))` `= 0.5 × 10^5` (`mkWorking`).
- renorm: `sfClub`: guest `0.5 × 10^5`, NOT ON THE LIST; `0.5 × 10^5 = 5 × 10^4` with "A × 10, power − 1"; YOU'RE
  IN; note "not `5 × 10^6`" crossed; check chip `1000 ÷ 0.02 = 50 000`.
- fifty: Ah Boy, counter at "4", looks at `50 000`; sad. Hold.
- light: `sfSpace`: a light beam from the Sun to the Earth; `speed = 3 × 10^8 m/s`, `time = 5 × 10^2 s`.
- mult: Priya: `(3 × 10^8) × (5 × 10^2) = (3 × 5) × 10^(8 + 2) = 15 × 10^10`; chip "**M**ultiply, **A**dd".
- club: `sfClub`: guest `15 × 10^10` NOT ON THE LIST → `1.5 × 10^11 m` YOU'RE IN; small note
  `1.5 × 10^11 m = 1.5 × 10^8 km` ✓ (Kavya's Sun, from `big`).
- call: `sfRoseCall` (lower third AUNTIE ROSE): Auntie Rose far too close to the camera; her phone shows her stall
  video: `6.2 × 10^5 views` and `+ 4.5 × 10^4 today`.
- add: Dad (smug): `6.2 + 4.5 = 10.7`, `5 + 4 = 9`: `10.7 × 10^9` in orange.
- world: Auntie Rose shock: `10.7 × 10^9` next to the world's population `8.2 × 10^9` (a globe icon).
- never: WRONG FLOOR; "when you ADD, never add the powers"; `6.2 × 10^5 = 620 000`, `4.5 × 10^4 = 45 000`, written
  as a column sum (digits aligned by place value): `620 000 + 45 000`.
- views: Kavya: the sum completes `= 665 000`, then `665 000 = 6.65 × 10^5` views; DING!.
- ondeh: Auntie Rose happy; a plate of ondeh-ondeh (green balls) appears in the call window.
- stuck: Kavya deadpan to camera; the display "10"; Rose's smile freezes. Hold.

## 7 traps: The lift saves you some marks
- intro: "6 EXAM TRAPS" over the dimmed lift, six numbered badges.
- t1 (TH, Dad): card "Count **places**, not zeros": `45 000 = 4.5 × 10^4`, with `4.5 × 10^3` crossed out; Dad
  sheepish.
- t2 (TH, Norm at the club): card `24 × 10^8` NOT ON THE LIST → `2.4 × 10^9`; "A must be 1 ≤ A < 10".
- t3 (TH, Ah Boy, Spotty's jar): card "tiny → minus": `0.003 = 3 × 10^(-3)`, `3 × 10^3` crossed out.
- t4 (TH, E): card: calculator `2.4E-08` → write `2.4 × 10^(-8)`; `2.4E-08` and `2.4^(-8)` crossed out.
- t5 (TH, Auntie Rose on video call): card `2 × 10^3 + 3 × 10^3 = 5 × 10^3` (2000 + 3000 = 5000), `5 × 10^6`
  crossed out.
- t6 (TH, Nought, badge on): card `3.08 × 10^(-5) = 0.000 030 8` with his cream zero glowing; `0.000 308` crossed
  out. Nought proud.
- return: logo "MIND THE ZEROS will return" (the cold open's title card style).
- monday: chip "Monday, 8 a.m."; the lift, lights bright, display 12; Dad alone with his briefcase.
- ground: Dad presses G; display 12 → 11; the doors open (a quick slide) and Mr Tan steps in; Dad smug.
- again: Mr Tan happy, marker in hand; display 11 → 10 → CLUNK (shake, lights dim). Dad's smile freezes.
- welcome: the Index pops up on the display ("10ⁿ"): smug.
- comfy: Big Ten steps out, deadpan, and says his first sentence; Dad and Mr Tan stare at the camera. Final frame
  holds: Big Ten, the Index, Dad and Mr Tan, display "10".

## Suggested split for the animators
- Writer: cold (done).
- A: moves, big (about 3 min 10 s; both use `sfPVGrid`, Dot and Nought).
- B: floors, calc (about 3 min 10 s; both use Big Ten, the Index and the board working).
- C: small, compare, traps (about 3 min 50 s; traps reuses the other scenes' art).
