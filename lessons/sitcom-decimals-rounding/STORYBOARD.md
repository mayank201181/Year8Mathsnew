# WHAT'S THE POINT?, Ep 5 "Sports Day": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Decimals, Rounding &
Estimation. Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Sports Day at the stadium. Dad is the volunteer OFFICIAL TIMEKEEPER ("Trust the stopwatch"), Mum
paints the Blue House banner and buys the drinks, Ah Boy (8) is the Blue House tiger mascot (blue tiger ears),
Priya is the fastest girl in Year 8 and Mr Tan is on the microphone. Living in the giant LED scoreboard is
**Dot**, the decimal point: a tiny amber LED ball, dramatic, "ten times more important than you think". He
pops to the toilet for four seconds, jumps back into the wrong gap, and Priya's 14.72 s shows as 1.472 s
("World record!"). Through the day: the banner's area (multiplying), fifteen medal ribbons (dividing), the
Decider, a one-eyed rounding referee (decimal places), Sig the significant-figures bouncer (a crowd of 4 871
is not 49 people), Wavy the approximately-equal sign (estimating the drinks bill), Rita the recurring-decimal
parrot ("three three three..."), the wind readings and a mental-maths quiz (ordering and clever calculation),
and Kavya's high jump (error intervals, stretch). Stinger: Mum's parents' race shows 172.5 s; Dot moves for
Mum at once: "Yes, auntie." Point taken.

Guide sections (lib/topics/decimals-rounding/guide.ts) by scene: multiplying-decimals → `banner`;
dividing-decimals → `ribbon`; decimal-places → `photo`; significant-figures → `crowd`; estimation → `drinks`;
recurring-decimals → `prize`; ordering-and-shortcuts → `wind`; error-intervals (stretch) → end of `wind`.
Exam mistakes → `traps`. Misconceptions on screen: 0.3 × 0.2 = 0.6 (banner.boy), "dividing makes smaller /
multiplying makes bigger" (ribbon.smaller, ribbon.rule), 54 718-style "49 people" (crowd.boy), "zeros are never
significant" (crowd.never), 0.609 > 0.7 (wind.frog), −0.4 > −0.35 (wind.priya). Mnemonics: "Places in = places
out", "Shift both, then divide", "Five or more? Raise the score. Four or less? Let it rest.", "Only 2s and 5s
make it stop". Real world: race timing (photo), shopping estimate (drinks), money to the nearest cent (prize).
Extras fact: 142857 × 7 = 999 999 (prize.fact).

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'dot'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, dot, ref, sig, wavy, rita. Narrator: never drawn.
- **Humans are the heart.** They speak over half the lines (55%) and are on screen in every scene. The cartoon
  maths cast are guests in their Sports Day. Busts stand BEHIND a table or desk (`drTent`, `drBooth`: characters
  in `g.mid` or your own layer below `g.front`), or low in the frame so the shirt hem is off-stage (y + 140·s > 750).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Dot is `smug`, `shock` whenever he is in the wrong place, `annoyed` at every point mistake, and flaps his arms
  (`arms: 1`) in panic. The Decider is `deadpan`, raises his UP flag (`flag: 1`) on every round-up and puts the
  whistle in (`whistle: 1`) with a `drTweet` burst on every foul. Sig is `deadpan`, sunglasses on; he slides them
  down (`glasses: 0` → 1) when someone is wrong. Wavy is `smug` and slow; his waves ripple. Rita is `happy` and
  never stops; she flaps (`flap: 1`) when she talks. Dad is `smug` right before every mistake. Priya is `smug`, then
  `annoyed`/`sad` when corrected. Ah Boy is `happy` even when wrong. Mr Tan is `happy` at his own puns; everyone
  else goes `deadpan`. Mum is brisk and `smug` when right.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill
  a pause with new information.
- **Running gags:**
  1. **Dot's stamp** `drStamp(parent, false)` "MISSING THE POINT" (red) thumps on every misplaced point or wrong
     method: cold.photo (Priya's photo), banner.ship (322 m²), ribbon.short (6 ÷ 4), crowd.welcome (49 people),
     drinks.dot (233.70), prize.twelve (9/12 "recurring"). `drStamp(parent, true)` "POINT TAKEN" (green) on correct
     results: banner.rule, ribbon.both, photo.roll, drinks.enough, traps.taken (the last line). Scale ~0.42-0.55.
  2. **"Trust the stopwatch."** Dad says it (cold.stop, ribbon.smaller "Trust me", drinks.calc "Official
     calculation!", traps.t6 "Especially the stopwatch"). Each time: Dad smug, his `OFFICIAL` lanyard, everyone
     else turns to camera.
  3. **The Decider's whistle** `drTweet`: every foul (photo.chop, photo.short, photo.foul, traps.t4) gets TWEET!.
  4. **Mr Tan's puns** land to silence: a tiny "*cricket*" chip and deadpan faces (ribbon.pun, crowd.pun).
  5. **Rita never stops**: "three three three..." in a trail of 3s floating off her; only Dot sitting on her head
     (dot notation!) quiets her (prize.shush/quiet). She comes back in traps.t5.
  6. **The scoreboard** (`drScoreboard`): Dot keeps having to hop between its gaps (cold, drinks.dot, stinger).
  7. **Ah Boy's one-cent coin** (prize.boy) stays in his raised hand in later scenes.
- **Talking heads** (TH below) use `drConf(root, who)` full stage, the character big (s ≈ 1.4) at about
  (300-330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `drLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`2.3 × 1.4`, `6 ÷ 0.4 = 60 ÷ 4 = 15`, `1.15 <= h < 1.25`, `9/12 = 3/4`),
  `mkWorking` for aligned multi-step working, `mkNumberLine` for halfway points and the wind readings, `mkTable`
  for the s.f. and ÷-by-a-decimal tables, `mkReceipt` for the drinks. Rounding cuts are drawn as a red vertical
  bar between digits with the decider digit circled. Recurring dots are drawn as real dots above the digits (do
  not rely on the combining character). Thousands are written with a space: `4 871`, `48 650`.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. At most ~1,000 elements per scene (busts ≈ 100-150 each: build each human once per scene).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`drLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Blue House. Half right. |
| mum | Mum: brisk, competitive, in charge of banner and drinks | magenta kurta, bun, bindi; a paintbrush with blue paint (`lift: 1`) | MUM / Banner, drinks, budget. |
| dad | Dad: official timekeeper, confident, wrong, lovable | glasses, moustache, green polo, blue OFFICIAL lanyard; stopwatch in hand (`g.watch.set('14.72')`) | DAD / Official timekeeper. Allegedly. |
| boy | Ah Boy, 8: the Blue House tiger mascot; asks the obvious | orange star tee, blue tiger ears; `lift: 1` raises his hand | AH BOY, 8 / Blue House tiger. Mascot. |
| priya | Priya, 12: fastest girl in Year 8, competitive, confidently wrong | blue PE tee "8", white headband, bob, yellow clip; empty hand or `prop: 'phone'` | PRIYA / Fastest girl in Year 8. |
| tan | Mr Tan: dry, kind, puns, on the microphone | shirt and tie, glasses, white-and-blue Sports Day cap, a microphone | MR TAN / Maths teacher. On the microphone. |
| dot | Dot, the DECIMAL POINT: tiny, dramatic, "ten times more important" | glowing amber LED ball, red sweatband, stick arms and legs, sneakers; `arms`, `point` (-1/+1) | DOT / The decimal point. Small. Important. |
| ref | The Decider, ROUNDING REFEREE: looks at ONE digit only | one big eye, black REF cap, striped shirt, whistle; `flag` (UP flag), `whistle` | THE DECIDER / Rounding referee. One digit only. |
| sig | Sig, SIGNIFICANT FIGURES: the bouncer | broad purple head, black suit, sunglasses, earpiece, clipboard THE LIST; `glasses` | SIG / Significant figures. Works the door. |
| wavy | Wavy, the ≈ SIGN: laid-back surfer | two teal waves, yellow bucket hat; `wob` | WAVY / Approximately equal to. Approximately. |
| rita | Rita, a RECURRING-DECIMAL PARROT | green parrot, red crest, orange beak, on a perch (`drPerch`); `flap` | RITA / Recurring decimal. Recurring decimal. |

Full bodies: `cast(root, 'priya', { body: true, bottoms: 'shorts' })` etc. (scHumanBody; `runPose(t)`).

## Sets and props (lib.js)

Sets: `drStadium` (wide shot: stands, bunting, track, Blue House tent, scoreboard `g.board`), `drTent` (Blue
House tent close-up, folding table: layers `g.mid` / `g.front` / `g.top`, `g.tableY` 530), `drBooth` (announcer's
box: desk with SPORTS DAY sign, PA horn, ON AIR light; `g.deskY` 540), `drConf` (talking heads), `scTrack`
(the kit's Sports Day track, `g.upd(t, speed)`).
Props: `drScoreboard` (LED board; `g.row(i, digits, pt, label)`, `g.ptXY(i, k)`, `g.pt[i]`), `drStopwatch`,
`drStamp`, `drBannerCloth` (2.3 m × 1.4 m banner), `drMedal`, `drTweet`, `drRope` (Sig's velvet rope),
`drPerch` (Rita's perch), `DR_LED`, `DR_BLUE`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkNumberLine`, `mkTable`,
`mkReceipt`, `mkCalculator`, `mkCoin`, `mkNote`, `mkChip`, `mkSpeechBubble`, `mkThoughtBubble`, `mkWhiteboard`,
`mkBrace`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `drStadium`, slow push towards the scoreboard; Kavya bust foreground left; chips "Kavya, age 12",
  "Friday, 8 a.m.", "SPORTS DAY"; lower third KAVYA, 12.
- pa: cut to `drBooth`; Mr Tan behind the desk, microphone raised (lower third MR TAN); ON AIR pulses; chip
  "GIRLS' 100 m · HEAT 1".
- priya: `scTrack`; Priya bust low right, smug, then deadpan to the left (lower third PRIYA). In the 1.6 s pause:
  "BANG!" burst, then Priya (full body, `runPose`) sprints across the track with speed lines.
- record: scoreboard close-up "GIRLS' 100 m / PRIYA 1.472 s"; Priya bust right, phone raised, happy; chip
  "WORLD RECORD?!".
- cheetah: Ah Boy pops up bottom left in his tiger ears (lower third AH BOY), hand up; thought bubble "faster
  than a **cheetah**?".
- stop: `drTent`; Dad behind the table, stopwatch raised, smug (lower third DAD); a big stopwatch reads 14.72;
  chip "Trust the stopwatch.".
- digits: Kavya joins (left), deadpan → smug; a dark LED panel: "scoreboard 1.472" and "stopwatch 14.72", same
  four amber digits, the scoreboard's point ringed red, the stopwatch's ringed green; "same digits, different point".
- tiny: back to the scoreboard; viewfinder corners and "ZOOM ×"; the camera zooms into the point between the 1
  and the 4. It is Dot (s 0.155). At the end of the zoom he notices the camera (shock).
- hi (TH): Dot's confessional; lower third DOT; plaque "THE DECIMAL POINT", an amber dot, "small · round",
  "× 10 more important".
- slide: a paper board: `14.72` with column names (tens, ones, tenths, hundredths) and an amber point; the
  point hops one place left: `1.472` (red); curved arrow; "one place left: **÷ 10**". Dot points at it.
- break: the scoreboard, chip "FOUR SECONDS EARLIER": the board reads 1472 with no point; Dot (s 0.5, arms
  flapping, shock) runs in from the right along the bottom of the board and hops into the gap after the 1;
  red arrow "the wrong gap!".
- photo: Priya pops up right with her phone raised, happy. In the pause Dot hops to the gap after the 4
  (14.72), annoyed; MISSING THE POINT thumps over Priya; Priya sad.
- title: deep blue title card with rays; logo "WHAT'S THE / POINT?" with a bouncing amber LED dot; "Episode 5:
  Sports Day"; the cast pops in: Kavya, Priya, Dot, Dad, Ah Boy. Hold.

## 1 banner: The Blue House banner (Multiplying decimals)
Layout: `drTent`; the banner (`drBannerCloth`, 2.3 m × 1.4 m) on poles on the left half; humans behind the
table (Mum with her brush, Priya, Kavya; Ah Boy pops up; Dad at the end). Dot stands on the table (`g.top`, s
≈ 0.6). A white board on the right (x 640-1150) holds the working. Showpiece: the banner splits into the
four-piece area model 2 × 1, 2 × 0.4, 0.3 × 1, 0.3 × 0.4 (the corner made of 12 tiny hundredth squares).
- nine: chip "9 a.m."; Mum (lower third MUM) paints the tiger.
- size: dimension arrows on the banner "2.3 m" (width) and "1.4 m" (height); board title `2.3 × 1.4 = ?` "area".
- calc: Priya (smug, pencil) writes `23 × 14 = 322` and "322 m²" in red.
- ship: Dot unimpressed; a cartoon cruise ship with the banner as its sail slides past behind the 322; stamp
  MISSING THE POINT. Hold.
- est: board: "Estimate first:" `2.3 × 1.4 ≈ 2 × 1.5 = 3`; chip "about 3".
- int: `mkWorking`: `23 × 14 = 322` (note "ignore the points"), `1 + 1 = 2` (note "decimal places"),
  `2.3 × 1.4 = 3.22` with the answer ringed; "m²" after it; a tick next to "≈ 3".
- rule: chip "**Places in = places out**"; stamp POINT TAKEN (small).
- split: the banner divides: a vertical cut at 2 m and a horizontal cut at 1 m; the four pieces fill with colour
  and labels `2 × 1 = 2`, `2 × 0.4 = 0.8`, `0.3 × 1 = 0.3`, `0.3 × 0.4 = 0.12`; sum line
  `2 + 0.8 + 0.3 + 0.12 = 3.22`.
- (split, second half): zoom into the corner: a 3 × 4 grid of tiny squares, chip "tenths × tenths = hundredths".
- boy: Ah Boy pops up (lower third AH BOY), hand up: `0.3 × 0.2 = 0.6 ?`.
- tenths: Dot: `3 × 2 = 6`, "2 d.p." → `0.06`; the 0.6 crossed out.
- paint: Dad (lower third DAD) holds a paint tin price tag `$13.50 / litre` and "need 2.4 litres"; smug; he pats
  his pockets for his calculator.
- money: Kavya: `2.5 × 13 = 32.5` labelled "estimate", then `24 × 135 = 3240`, "2 d.p." → `$32.40`; tick. Dad,
  still patting his pockets, finally pulls out a calculator as she finishes; everyone deadpan.
- zeros: Priya: `1.25 × 0.8`, `125 × 8 = 1000`, "drop the zeros: 1", "3 d.p.: 0.001" in red.
- first: Dot: `1.000` (point placed first, digits counted 1-2-3 under the zeros), then the zeros fade: `1`; the
  0.001 crossed out; chip "place the point FIRST".
- basic: Priya shrugs, smug; chip "× 1000 out"; Kavya and Dot deadpan. Hold.

## 2 ribbon: Fifteen medals (Dividing decimals)
Layout: `drTent`, the medal table: a roll of blue ribbon, scissors, gold medals (`drMedal`). Mr Tan behind
the table (with his cap; no microphone here, `prop: 'paper'` or `hand`), Dad, Kavya, Priya; Ah Boy for one line.
A 6 m ribbon strip runs across the top (x 120-1080, y 230) marked in metres. Showpiece: the ribbon chopped into
15 pieces of 0.4 m, each turning into a medal ribbon, counted 1 to 15.
- ten: chip "10 a.m."; Mr Tan rolls out the ribbon.
- q: ribbon labelled 0 m … 6 m; a 0.4 m piece bracketed; `6 ÷ 0.4 = ?` "medals".
- smaller: Dad smug: thought bubble "÷ makes smaller: fewer than 6"; everyone turns to camera.
- fit: Kavya; the 0.4 m pieces tick off along the ribbon: 1, 2, 3 … 15 (fast); chip "how many 0.4s fit into 6?".
- shift: Dot on the table: `6 ÷ 0.4` → arrows "× 10" under BOTH numbers → `60 ÷ 4 = 15`; chip "make the divisor
  whole"; the ribbon now reads 0-60 (in 10 cm units) — same 15 pieces.
- lie: Dad shock, then sad; 15 medals in a row. Hold.
- rule: Mr Tan: two rows: `8 ÷ 0.5 = 16` with "÷ (between 0 and 1) → bigger ↑", `8 × 0.5 = 4` with "× (between 0
  and 1) → smaller ↓".
- short: Priya: `6 ÷ 4 = 1.5` "medals"; the arrow under the 6 is missing ("only the 0.4 moved"); stamp MISSING
  THE POINT. Hold.
- both: Dot: mnemonic chip "**Shift both, then divide.**"; both points jump one place right in step; stamp POINT
  TAKEN.
- harder: `2.73 ÷ 0.3` → "× 10" both → `27.3 ÷ 3 = 9.1`; small check chip `0.3 × 9.1 = 2.73` ✓ "multiply back".
- bus: price tag `$7.36`, four house flags (Blue, Red, Green, Yellow); a bus-stop (short division) frame
  `4 ) 7.36` with the point in the answer drawn directly above the point.
- steps: the bus stop fills: `1` (carry 3 → 33), `8` (carry 1 → 16), `4`; answer `1.84`; "$1.84 each".
- zeros: Ah Boy pops up worried (chip "doesn't finish?"); `5.3 = 5.300` (two grey zeros slide in), `4 ) 5.300` → `1.325`.
- pun: Mr Tan happy, holding the ribbon roll; everyone deadpan; "*cricket*". Hold.

## 3 photo: Photo finish (Rounding to decimal places)
Layout: trackside: `scTrack` with hurdles; the scoreboard (`drScoreboard`) top right reading 2 d.p.; Dad (stopwatch)
and Priya at the bottom left/right, Kavya for her lines; the Decider stands centre on a little referee's
platform. A big number line (`mkNumberLine` from 10.49 to 10.50 in thousandths) for the halfway point.
Showpiece: the cut bar slamming down between 10.49 and 73, the decider 7 circled, the UP flag going up and the
last digit rolling 9 → 0 with a carry (the odometer roll in `roll`).
- eleven: chip "11 a.m. · HURDLES"; the stopwatch display shows `10.4973` (four decimal places, "ten-thousandths").
- time: the scoreboard shows `10.__` with only two decimal places; Dad's stopwatch 10.4973.
- chop: Priya: `10.49|73` → she chops off the 73 with a karate hand: `10.49`; TWEET! (whistle). Hold.
- ref: the Decider (lower third THE DECIDER), one big eye, deadpan; chip "one digit only".
- cut: red cut bar between `10.49` and `73`; the 7 circled: "decider".
- rule: mnemonic card: "**Five or more? Raise the score.** **Four or less? Let it rest.**"; UP flag up; `10.49` →
  `10.50`.
- line: number line 10.49 … 10.50, halfway tick `10.495`, Priya's `10.4973` dot past halfway; arrow to 10.50.
- short: Priya: `10.5`; TWEET!
- zero: `10.50` with the 0 ringed "2 d.p. = two digits after the point"; chip "That zero is evidence."
- drill: a 4-row table for `7.0649`: nearest whole `7` (decider 0), 1 d.p. `7.1` (decider 6), 2 d.p. `7.06`
  (decider 4), 3 d.p. `7.065` (decider 9); each row's cut bar and decider circle.
- jump: Dad: long-jump sign "KAVYA 2.996 m"; `2.99|6`; "9 + 1 = 10 ?!" in red.
- roll: odometer: `199 + 1 = 200`, then `2.99 + 0.01 = 3.00`, the 9s rolling to 0s one after another; UP flag;
  stamp POINT TAKEN.
  Kavya (happy) holds up a framed certificate "3.00 m".
- stages: Priya: `1.2349 → 1.235 → 1.24` (two arrows labelled "3 d.p.", "2 d.p.").
- foul: TWEET!, red card "DOUBLE ROUNDING"; `1.23|49`, decider 4 circled → `1.23`; the staged chain crossed out.
- stole: Priya: `10.50 − 10.4973 = 0.0027` "twenty-seven ten-thousandths"; Priya annoyed. Hold.

## 4 crowd: Sig works the door (Rounding to significant figures)
Layout: `drBooth` for Mr Tan's announcements (Ah Boy beside him); then the VIP stand entrance: Sig at a velvet
rope (`drRope`), digits queueing as little cards; a board for the s.f. table. Showpiece: the digits of `0.0052`
and `3.07` queueing at Sig's rope: leading zeros turned away ("WAIT OUTSIDE"), the 0 between 3 and 7 let in.
- noon: chip "12 noon"; booth; Mr Tan with the gate tally sheet.
- gate: tally card `4 871 spectators`.
- boy: Ah Boy: `48|71` → `49` ; "49 people!" bubble.
- welcome: Mr Tan into the mic: "Welcome, all 49 of you!"; the stands outside the window BOO (chips "BOOO");
  stamp MISSING THE POINT. Hold.
- sig: cut to the rope: Sig (lower third SIG), sunglasses on; chip "first non-zero digit".
- cut: `4 871`: arrow at the 4 "1st s.f.", `48|71`, decider 7 → `49`, then zeros fill: `4 900`.
- size: Kavya: `4 900 ≠ 49`; a crowd icon shrinking to 49 people and back.
- table: `mkTable`: `4 871` | 1 s.f. `5 000` | 2 s.f. `4 900` | 3 s.f. `4 870`.
- never: Priya smug; chip "zeros never count?".
- inside: Sig slides the glasses down: `3.07` with the 0 highlighted green "between: counts", "3 s.f.";
  `3.00` "end zeros of a rounded decimal: count", "3 s.f.".
- lead: `0.0052`: the three leading zeros stopped at the rope (grey, "WAIT OUTSIDE"), 5 and 2 let in: "2 s.f.".
- photo: Dad with a photo-finish print: two noses at the line; `0.00456 s`.
- draw: Priya: `0.00456 → 0.00` (2 d.p.) "draw?".
- small: Sig: arrow at the 4 "1st s.f.", `0.0045|6`, decider 6 → `0.0046`; leading zeros "stay, to keep the
  size".
- rule: Kavya: two arrows on `0.00456`: "d.p. count from the point →", "s.f. count from the first non-zero digit →".
- pun: Mr Tan happy; "*cricket*"; Sig deadpan, Priya pointing at Kavya: chip "REMATCH". Hold.

## 5 drinks: Wavy does the shopping (Estimation)
Layout: a drinks kiosk at the stadium (re-use `drTent` with a cooler box and shelves, or the booth window), Mum
with a shopping list, a receipt (`mkReceipt`), Wavy floating beside the board; then Dad with `mkCalculator`;
Priya with a calculator. Showpiece: the over/under table and the calculator answer bouncing between ×10 and ÷10
while Dot runs between the digits.
- one: chip "1 p.m."; Mum's purse, a chip "budget **$32**".
- list: shopping list: `6 × $3.85` isotonic, `4 × $1.79` oranges; "is $32 enough?".
- wavy: Wavy rides in on a wave (lower third WAVY); a giant ≈ glyph; chip "not =".
- round: `$3.85 ≈ $4`, `$1.79 ≈ $2` (1 s.f.); "6 and 4 are exact".
- sum: `6 × 4 + 4 × 2 = 24 + 8 = 32` (≈ $32).
- over: both prices with "↑ rounded up" → "overestimate: real total < $32".
- enough: the receipt prints: `6 × 3.85 = 23.10`, `4 × 1.79 = 7.16`, TOTAL `$30.26`; Mum smug; stamp POINT TAKEN.
  Under the receipt, small `mkTable` (from the guide): "you round… / in a × b / in a ÷ b": a up over/over, b up
  over/under, a down under/under, b down under/over; the b-up ÷ cell highlighted ("divisor up ⇒ under").
- calc: Dad's calculator shows `233.7`; "61.5 litres × $0.38" ; Dad smug, OFFICIAL lanyard.
- ten: Wavy: `0.4 × 60 = 24` vs `233.7`: "≈ 10 × too big".
- dot: Dot runs onto the calculator display and moves one place: `233.7` → `23.37`; "you typed 3.8"; stamp
  MISSING THE POINT (on Dad's 233.7).
- stats: Priya: `(48.7 × 3.1)/0.52` stacked, calculator `29.03`.
- three: Wavy: `(50 × 3)/0.5 = 150/0.5 = 300`; "÷ 0.5 = × 2"; `29.03` vs `≈ 300`: "10 × too small".
- typed: Priya whispers; chip "typed 5.2"; true value `290.3` (to 1 d.p.) small.
- table: `mkTable`: ÷ 0.5 | × 2; ÷ 0.2 | × 5; ÷ 0.1 | × 10.
- homework: Ah Boy, hopeful, holding a worksheet.
- no: Wavy smug; ≈ "no". Hold.

## 6 prize: Rita repeats herself (Fractions, decimals & recurring decimals)
Layout: `drTent`, prize table: a $10 note (`mkNote`) and coins; Kavya, Priya, Ah Boy behind the table, Mr Tan on
the right; Rita on her perch (`drPerch`) at the right edge; a board for short divisions. Showpiece: Rita's
endless 3s streaming out of her beak until Dot sits on her head, and the three short divisions side by side
(1/8 stops, 1/6 one dot, 1/7 dots on the first and last digits).
- two: chip "2 p.m."; a rosette "BEST BANNER"; `$10` note; three painters.
- split: `10 ÷ 3 = 3.333…` with 3s still appearing.
- rita: Rita bursts in (lower third RITA), flapping; a trail of floating "3"s.
- cent: `3.33|33…` decider 3 → `$3.33`; three piles; `3 × 3.33 = 9.99`; "1¢ left".
- boy: Ah Boy grabs a 1-cent coin, hand up, happy (keeps it for the rest of the episode).
- shush: Dot hops onto Rita's head; the 3s stop; `0.3` with a dot above the 3 (`0.3̇`), chip "dot = recurs for ever".
- quiet: Rita, tiny voice; a single small "3". Hold.
- which: Mr Tan; `1/8`, `1/6`, `1/7` with question marks.
- eighth: bus stop `8 ) 1.000` → `0.125`, chip "terminating: it stops".
- sixth: `1/6 = 0.1666…` → `0.16̇` (dot over the 6 only).
- seventh: `1/7 = 0.142857 142857…` → dots over the 1 and the 7 of the block `0.1̇42857̇`; the block bracketed.
- test: card "simplest form → prime factors of the denominator: **only 2s and 5s ⇒ stops**".
- why: `8 = 2 × 2 × 2` ✓ stops; `6 = 2 × 3` ✗ recurs; `7` prime ✗ recurs.
- twelve: Priya: `9/12`, `12 = 2 × 2 × 3` "recurring!"; stamp MISSING THE POINT.
- simplify: `9/12 = 3/4`, `4 = 2 × 2` → `0.75` "terminates"; Priya annoyed.
- back: `0.375 = 375/1000 = 3/8` (÷ 125), "last digit in the thousandths".
- fact: Rita, flapping: the 142857 digits run round a circle (the remainder wheel from the extras: 1 → 4 → 2 → 8 →
  5 → 7), then `142857 × 7 = 999 999`; Mr Tan and Ah Boy (coin in hand) deadpan. Hold.

## 7 wind: Headwind (Ordering decimals & clever calculation; error intervals, stretch)
Layout: the long-jump pit beside the track: a wind gauge with a digital display, sandpit; Dad with the clipboard,
Kavya, Priya, Ah Boy; a `mkNumberLine` from −0.5 to 0.5. Then `drBooth` for Mr Tan's quiz. Then the high-jump bar
(1.2 m) with the Decider. Showpiece: the five wind readings flying onto the number line in order.
- three: chip "3 p.m. · LONG JUMP"; wind gauge display; Dad with the clipboard; five cards: `−0.35`, `0.305`,
  `−0.4`, `−0.355`, `0.3`; chip "smallest first".
- priya: Priya: `−0.4 > −0.35 ?` "because 0.4 > 0.35".
- left: Dot on the number line: −0.4 further left; `−0.4 < −0.35`; arrow "smaller ←".
- order: the cards land on the line and then line up: `−0.4 < −0.355 < −0.35 < 0.3 < 0.305`; sizes padded
  `0.400, 0.355, 0.350`.
- frog: Ah Boy: frog-jump results `0.609 m` (Ah Boy) vs `0.7 m` (Dad); "more digits!".
- pad: the numbers lined up by the point: `0.700` / `0.609`; tenths column highlighted 7 vs 6.
- quiz: `drBooth`; Mr Tan (mic): `4.7 × 9.9` and a 15-second timer.
- dist: Kavya: `9.9 = 10 − 0.1`; `4.7 × 10 − 4.7 × 0.1 = 47 − 0.47 = 46.53` (`mkWorking`); chip "distributive law".
- law: `a(b − c) = ab − ac`; then `0.25 × 7.3 × 4`.
- pair: Priya: arrows swap: `0.25 × 4 × 7.3`, `0.25 × 4 = 1`, `= 7.3`; chip "0.25 × 4 = 1, 0.5 × 2 = 1".
- bar: chip "4 p.m. · HIGH JUMP · STRETCH"; the bar; the Decider by the bar: "1.2 m (1 d.p.)"; "real height h?".
- bounds: number line 1.1 … 1.3 with 1.15 (filled dot) and 1.25 (open dot), shaded between; `1.15 <= h < 1.25`.
- interval: "lower bound: ≤ (in)", "upper bound: < (out): 1.25 → 1.3"; flag UP at 1.25.
- chops: Dad's stopwatch `12.3`; chip "truncation: chops, doesn't round"; number line 12.3 … 12.4:
  `12.3 <= t < 12.4`, "a whole unit wide"; the Decider deadpan at Dad. Hold.

## 8 traps: Sports Day saves you some marks
- intro: "6 EXAM TRAPS" over the stadium.
- t1 (TH, the Decider): card `3.00`, not `3` ✗; flag UP.
- t2 (TH, Sig): card `48 650 → 49 000 (2 s.f.)`, `49` ✗.
- t3 (TH, Priya): card `6 ÷ 0.4 = 60 ÷ 4 = 15`, `6 ÷ 4` ✗; Priya sheepish.
- t4 (TH, the Decider): TWEET!; card "round the original once", `1.2349 → 1.23`.
- t5 (TH, Rita): card `9/12 = 3/4 = 0.75` "simplify first"; "Terminates" ×3 in a trail.
- t6 (TH, Dad): card "estimate first"; the stopwatch with a question mark.
- return: the logo "WHAT'S THE POINT? will return".
- relay: chip "4.30 p.m. · PARENTS' RACE"; Mum crosses the line (full body).
- mum: the scoreboard: `MUM 172.5 s`; Mum bust, hands on hips (annoyed), staring at the board.
- yes: Dot (small, on the board) salutes, shock, and hops one place left: `17.25 s`.
- never: Kavya annoyed; Priya beside her nods.
- taken: Dot, to camera: stamp POINT TAKEN; the board holds `17.25`. Final frame: Mum smug, Dot tiny and
  terrified in his gap.

## Suggested split for the animators
Timeline total 11.9 min (cold 59 s).
- Writer: cold (done).
- A: banner, ribbon, photo (about 4.1 min).
- B: crowd, drinks (about 3.0 min).
- C: prize, wind, traps (about 3.9 min).
