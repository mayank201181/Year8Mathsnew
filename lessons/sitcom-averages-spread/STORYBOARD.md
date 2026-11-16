# PERFECTLY AVERAGE, Ep 19 "The Most Average Family in Singapore": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Averages, Range & Comparing Data.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Saturday, 9 a.m., Studio 5: the TV game show SINGAPORE'S MOST AVERAGE FAMILY, prize $1000. Dad is
outraged ("We are not average. We are ABOVE average.") until Mum says "one thousand dollars". Three teams sit at the
contestants' desk: Team Kavya (Kavya, Mum, Dad, Ah Boy), Team Priya (Priya, captain; her parents are "still
parking" all episode) and Team Tan (Mr Tan, a family of one, and his cat Pythagoras in a carrier, who is NOT data).
The host is Benny Lim (sequinned jacket, microphone, teeth that sparkle). Living inside the studio's giant
scoreboard are the four measures: **Mean**, a spirit level who levels everything out and is NOT mean ("I am THE
Mean. There is a difference."), **Medi** the median (a road median strip with a whistle: "Line up! In ORDER!"),
**Mo** the mode (an influencer phone: "trending!") and **Ranger** the range (a tape measure in a ranger's hat: one
number, never negative). **Otto the Outlier**, huge and cheerful, just wants to join in and drags Mean over
whenever he is near. **Sigma** (Σ, "add them all up") makes dramatic entrances. Stinger: the most average family is
Team Tan, a family of one (mean: me; median: me; range: zero), Dad is "still above average", and Otto's group hug
drags Mean off the edge of the frame.

Guide sections (lib/topics/averages-spread/guide.ts) by scene: mean-median-mode-range → `measures` (plus the decimals
example in `outlier`); choosing-an-average → `outlier`; working-backwards → `backwards`; frequency-tables → `table`;
stem-and-leaf-averages → `stem`; comparing-distributions → `compare`; grouped-data (stretch) → `grouped`. Exam
mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'mean'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, benny, mean, medi, mo, ranger, otto, sigma.
- **Humans are the heart.** They speak 54% of the lines and are on screen in every scene. The cartoon measures are
  guests in the humans' game show: they pop out of the scoreboard (`asBoardShot`) or stand on the contestants' desk
  (in `g.top` of `asStudio`, at s about 0.5). Busts stand BEHIND the desk (`g.mid`, y about 440, s about 0.92), so the
  shirt hem is hidden. Benny stands in the foreground (bottom left or right, cut off by the frame bottom: y about 600).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Mean is `deadpan`, `annoyed` whenever anyone calls him mean or an outlier comes near, `shock` while being dragged.
  Medi is `annoyed` at any unordered list and blows her whistle (`whistle: 1`) on "Line up!" and "In ORDER!".
  Mo is `happy`, hearts floating (`hearts: 1`) when she says "trending" or "popular". Ranger is calm (`neutral`/`smug`),
  stretches his tape (`reach`) whenever a range is said. Otto is `happy` (`sad` when "delete Otto"), waving.
  Sigma is `smug`, arms flung up (`arms: 1`) on every SIGMA! and WRONG!. Dad is `smug` right before every mistake;
  Mum is brisk; Ah Boy is `happy` even when wrong; Priya is `smug`, then `annoyed` when wrong; Mr Tan is `happy`
  at his own puns while everyone else goes `deadpan`; Benny is `happy`, `ting: 1` on his big announcements.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink, Pythagoras
  blinking). Never fill a pause with new information.
- **Running gags:**
  1. **"I am not mean. I am THE Mean."** (cold) and **the outlier drag**: whenever Otto is on screen, Mean tilts
     towards him (rotate Mean with `tr(g, x, y, s, angle)` and pass the same angle as `tilt`, so the bubble slides
     to the higher end), sweating (`sweat: 1`). Cold (teaser), outlier.drag (dragged up the pay chart), traps.drag
     (the stinger: the group hug drags him out of frame).
  2. **Dad is "above average".** cold.above, outlier.times ("my average is 12.8": he picks the mode), backwards.dad
     (he gets one right: "Above average."), compare.dad ("Clearly above average" → "I prefer exciting."), traps.lost.
     Each time: Dad smug, Kavya side-eye to camera.
  3. **The verdict stamp** `asStamp(parent, ok)`: red "WAY OFF!" thumps (with a buzzer flash) on every wrong
     answer: measures.middle (6.5), measures.minus (−1), backwards.halfway (67), table.dad, table.boy, table.six,
     stem.rich (14 kg), grouped.short (40). Green "SPOT ON!" on the corrected answers: measures.half, measures.never,
     backwards.need, backwards.sizes, table.mean, stem.key, compare.story. Scale it about 0.5-0.7.
  4. **Pythagoras the cat** (`asCarrier`) sits on Team Tan's desk all episode and blinks in every pause; "cat camera"
     (measures.cat), "Cats are not data" (table.data, traps.notdata).
  5. **Priya's parents are still parking** (backwards.round, compare.three: "They voted from the car park."): a tiny
     "P" car-park sign chip on Team Priya's empty seats.
  6. **Mr Tan's puns** land to silence: a tiny "*cricket*" chip and deadpan faces (measures.pun, table.disagree).
- **Talking heads** (marked TH below) use `asConf(root, who)` full stage, the character big (s ≈ 1.3) at about
  (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `asLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, list or step is said, it appears big and clear in the caption's exact words:
  `mkMath` for every expression (`36 ÷ 6 = 6`, `(6 + 1)/2`, `4 − (−5) = 9`), `mkWorking` for aligned multi-step
  working (equals signs lined up), `mkTable` for frequency and grouped tables (with the **fx** column), `mkStemLeaf`
  for stem-and-leaf diagrams (key underneath), `mkBarChart` for the pay chart, `mkNumberLine` for dot plots.
  Data lists as rows of number tiles that re-sort into order on Medi's whistle. Negative numbers with a true minus
  (−3). Money as `$2600`, `$12 200`. Times `13.3 s`. Write maths on `asScreen` (paper, `MK.ink`) or on dark chips.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. Aim for at most ~1,000 elements per scene: build each human once per scene and hide it with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`asLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Team Kavya. Half right. |
| mum | Mum: brisk, wants the $1000, reliable | magenta kurta, bun, bindi | MUM / Team Kavya. Wants the $1000. |
| dad | Dad: "above average", variable | glasses, moustache, green polo | DAD / "We are ABOVE average." |
| boy | Ah Boy, 8: knows the jingle, asks the obvious | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Team Kavya. Knows the jingle. |
| priya | Priya, 12: Team Priya captain, confidently wrong | uniform, bob, yellow clip, gold "C" armband; pencil | PRIYA / Team Priya, captain. Parents parking. |
| tan | Mr Tan: Team Tan (a family of one), dry puns | shirt and tie, glasses; `asCarrier` beside him | MR TAN / Team Tan. A family of one. |
| rose | Auntie Rose (backwards only): came to cheer, age secret | curly perm, floral blouse, ROSE'S apron; phone | AUNTIE ROSE / Rose's Kitchen, Blk 208. Age: secret. |
| benny | Benny Lim, the host: all teeth | sequinned purple jacket, gold tie, microphone (`lift: 1` to the mouth), `ting` sparkle | BENNY LIM / Game-show host. Very shiny teeth. |
| mean | MEAN, a spirit level: fair, grumpy, NOT mean | yellow level, bubble vial on top, bow tie; `tilt`, `arms` | MEAN / Total ÷ how many. Not mean. Fair. |
| medi | MEDI, the median: bossy road marshal | kerb block with black-and-white stripes, bougainvillea hair, hi-vis sash, white gloves; `whistle`, `point` | MEDI / The median. In order, please. |
| mo | MO, the mode: influencer | pink smartphone, sunglasses on top, "#1" sticker, like counter; `hearts`, `likes` | MO / The mode. Most popular. Obviously. |
| ranger | RANGER, the range: laconic | tape measure in a ranger's hat; `reach` (tape length) | RANGER / The range. One number. Never negative. |
| otto | OTTO the Outlier: huge, cheerful, wants to join in | giant purple data point in a crosshair ring, party hat; `wave` | OTTO / An outlier. Just wants to join in. |
| sigma | SIGMA, Σ: dramatic Greek letter | head with gold laurel wreath on a navy-and-gold Σ body; `arms` | SIGMA / Σ: add them all up. Greek. Dramatic. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `asStudio` (Studio 5: neon logo, mini scoreboard `g.board` with `set(i, text)` / `lit(i, p)`, APPLAUSE sign
`g.applause.set(p)`, contestants' desk with team plates `g.plates.kavya/priya/tan`; layers `g.mid` / `g.front` /
`g.top`; `g.deskY` 530; `g.upd(t)`), `asBoardShot` (the giant four-panel scoreboard: `g.slots[i]`, `g.set(i, text)`,
`g.lit(i, p)`; panels 0 MEAN, 1 MEDIAN, 2 MODE, 3 RANGE), `asScreen(parent, w, h, { title })` (the studio's big
question screen, paper inside: `g.area`, `g.content`, `g.upd(t)`), `asConf` (talking heads).
Props: `asStamp` (SPOT ON! / WAY OFF!), `asCarrier` (Pythagoras; `set({ t, look })`), `asDurian`, `asBeanbag`,
`asBucket`, `asHearts`, `asMiniBoard`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkStemLeaf`,
`mkBarChart`, `mkNumberLine`, `mkBrace`, `mkChip`, `mkSpeechBubble`, `mkThermometer`. Lib: `arrow`, `chip`, `tick`,
`cross`, `spark`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `asStudio` wide, the crew's viewfinder corners and REC; slow push-in; Kavya behind the TEAM KAVYA plate,
  looking round; chips "Kavya, age 12", "Saturday, 9 a.m.", "Studio 5"; lower third KAVYA, 12.
- benny: Benny springs up from the bottom right with the mic, teeth `ting`; the logo flashes; chip "prize: **$1000**";
  APPLAUSE lights; lower third BENNY LIM. Kavya looks at him.
- above: Dad rises beside Kavya, arms folded, smug; lower third DAD; a chip "ABOVE average" with an up arrow.
- money: Mum rises on Kavya's other side (lower third MUM), deadpan; "$1000" chip pulses gold.
- extreme: Dad's "ABOVE" chip flips to "EXTREMELY average"; Dad smug; in the pause Kavya and Mum deadpan to camera.
- point: Kavya annoyed, palm out; Dad still smug.
- tiny: documentary zoom into the mini scoreboard (viewfinder corners, "ZOOM ×" readout) until it fills the frame.
- hi: `asBoardShot`: the four panels; Mean pops out of panel 0 (lower third MEAN), arms out sharing; under him a
  row of five cube towers (2, 7, 3, 5, 8) levels out to five towers of 5 (cubes slide from tall to short); chip
  "share it out **fairly**".
- look: Ah Boy, popped up in the corner of the board shot (bottom right, peering in), happy; Mean's panel readout
  "MEAN". Pause: Mean slowly turns annoyed.
- not (TH): Mean's confessional, big; plaque "NOT mean. THE Mean." with a crossed-out "mean (unkind)" and "mean =
  total ÷ how many"; he is deadpan.
- otto: a giant shadow, then Otto bursts in from the right edge, waving (lower third OTTO); Mean, still in the
  confessional, tilts towards him, bubble sliding, sweating.
- no: Mean shock → annoyed, holding himself level with both arms; a red "OUTLIER" chip with an arrow at Otto; Otto
  still waves happily. Hold.
- title: purple title card with rays and a row of tiny bars levelling out; logo "PERFECTLY / AVERAGE" with a spirit-level
  bubble in the "A"; "Episode 19: The Most Average Family in Singapore"; the cast pops in: Benny, Kavya, Mean, Dad, Mum.

## 1 measures: Round one: phone checks (Mean, median, mode & range)
Layout: `asStudio` wide; Team Kavya (Kavya, Mum, Dad, Ah Boy) behind the desk on the left, Priya and Mr Tan (with
Pythagoras) on the right; Benny bottom right. The data appear as six number tiles (one above each head, then a row on
`asScreen` 900 × 420 centred at (600, 360)) in the order said. Cuts to `asBoardShot` for each measure character.
Showpiece: Medi's whistle: the six tiles fly from their heads into ORDER on the screen.
- round: Benny, mic up; chip "Round 1: phone checks this morning".
- board: tiles pop above each head as named: Kavya 7, Mum 3, Dad 9, Ah Boy 4, Priya 3, Mr Tan 10 (the "10?" tile
  wobbles).
- cat (Mr Tan): the carrier on his desk; a phone screen bubble "CAT CAM: Pythagoras, napping"; Pythagoras blinks.
- total (board shot, Mean): the tiles slide into a sum: `7 + 3 + 9 + 4 + 3 + 10 = 36`, then `36 ÷ 6 = 6`; the formula
  "mean = total ÷ number of values" (`mkMath` with stacked fraction); readout MEAN 6; six bars of heights 7, 3, 9, 4,
  3, 10 level out to six bars of 6.
- middle: Dad smug: the unordered tiles `7 3 9 4 3 10` with the middle pair 9, 4 boxed; `(9 + 4) ÷ 2 = 6.5`; stamp
  WAY OFF! on "6.5".
- whistle (board shot, Medi, lower third MEDI): whistle; tiles shuffle into order `3, 3, 4, 7, 9, 10`.
- half: position arrow: `(6 + 1)/2 = 3.5th` value; the 3rd and 4th tiles (4 and 7) ringed; brace "halfway"; median
  `5.5`; note "the value, not the position" (a crossed "3.5th"); readout MEDIAN 5.5; stamp SPOT ON!.
- mo (board shot, lower third MO): the two 3 tiles glow and jump; "3 appears twice"; hearts; readout MODE 3.
- ranger (board shot, lower third RANGER): the tape stretches from the 3 tile to the 10 tile; `10 − 3 = 7`; chip "ONE
  number (not '3 to 10')"; readout RANGE 7.
- jingle: Benny sings; the studio audience-sign "SING!"; the words "median's the middle" and "add and divide" pop
  on the screen in time; Medi and Mean wave in the mini scoreboard.
- jingle2: Ah Boy sings (lift), the last half: "mode … most", "range … difference between"; a mnemonic card with
  all four lines; small strip "**MED**ian = **MED**ium · **MO**de = **MO**st".
- seoul: Mr Tan with a holiday photo card "SEOUL, MARCH" and a thermometer (`mkThermometer`, −10 to 10); the seven
  temperatures as tiles `−3, 2, −5, 0, −3, 4, −2` (°C).
- minus: Priya smug: `4 − 5 = −1`; stamp WAY OFF!.
- never: Ranger: a number line from −5 to 4 with his tape across it: 9 units; `4 − (−5) = 4 + 5 = 9`; stamp SPOT ON!.
- mean2: aligned working: positives `2 + 4 = 6`, negatives `−3 − 5 − 3 − 2 = −13`, total `6 + (−13) = −7`,
  `−7 ÷ 7 = −1`; ordered tiles `−5, −3, −3, −2, 0, 2, 4` with the 4th ringed: median `−2`; mode `−3`.
- pun: Mr Tan happy; everyone deadpan; "*cricket*"; Pythagoras blinks. Hold.

## 2 outlier: A word from our sponsor (Choosing an average & outliers)
Layout: an advert insert (the screen fills with a pink "BOBA BOSS" ad: cup, "NOW HIRING", "Mean monthly pay $4000!"),
then a bar chart of the seven pays (`mkBarChart`, $0-$12 000) with a dashed mean line and a median line; Otto stands
beside the owner's bar; Mean hangs from the mean line. Then `asStudio` for round two with the screen showing three
question cards. Showpiece: Otto steps up and the mean line (with Mean on it) is dragged up above every worker's bar.
- ad: the advert (with ad "jingle" sparkles); Benny reading it, mic up, `ting`.
- apply: Mum, determined, filling in a form (`prop: 'paper'`); Dad shock.
- pay: the six workers' bars grow ($2400, $2500, $2500, $2600, $2800, $3000) on the chart; chip "workers: $2400 to
  $3000".
- otto: the seventh bar shoots up to $12 200 with Otto riding it (lower third OTTO if not seen yet in this scene:
  it was in cold, so no); chip "outlier: far from the rest".
- drag: the dashed mean line rises from $2600-ish to $4000 with Mean clinging to it, tilted, sweating; working
  `2400 + 2500 + 2500 + 2600 + 2800 + 3000 + 12 200 = 28 000`, `28 000 ÷ 7 = 4000`; a red bracket "above every
  worker".
- medi: the median line stays at $2600 (green); Medi stands calmly on it; the mode $2500 bars glow pink.
- ranger: Ranger's tape stretches from $2400 to $12 200: `12 200 − 2400 = 9800`; a little chip "without Otto: 600".
- delete: Ah Boy holds up a giant eraser; Otto `sad`.
- why: Kavya with a checklist card: "mistake? → fix it" / "real? → keep it, use the **median**"; Otto perks up.
- thanks: Otto happy, hugs his bar; Mean still tilted. Hold.
- best: Mean straightens himself, smug: "I use EVERY value".
- notalways: Medi points at Otto; Mean tilts again (he slides). Chip "outliers drag the mean".
- which: back to `asStudio`; the screen title "ROUND 2: WHICH AVERAGE?"; card 1: a shoe shelf.
- shoe: Priya: "MODE" on card 1; a shoe-size chip "5.37?" crossed out.
- flats: Mum: card 2, HDB blocks with a few gold flats: "MEDIAN" (small strip "Singapore reports the MEDIAN household
  income"), then card 3, a test paper: "MEAN (no outliers)".
- times: Dad smug with a stopwatch: tiles `13.2 12.8 14.1 12.8 13.6` s; "average 12.8!".
- mode: Mo pops onto the desk: the two 12.8s glow; "mode = fastest time"; hearts.
- real: aligned working: `13.2 + 12.8 + 14.1 + 12.8 + 13.6 = 66.5`, `66.5 ÷ 5 = 13.3 s`; ordered tiles with 13.2
  ringed; `14.1 − 12.8 = 1.3 s`; a small table mean 13.3 / median 13.2 / mode 12.8 / range 1.3.
- choose: Dad points at "mode 12.8", smug; Kavya side-eye.
- fair: Mean on the desk, deadpan push-in. Hold.

## 3 backwards: Priya needs a twenty (Working backwards with the mean)
Layout: `asStudio`, quiz round; Team Priya's desk with empty seats and a "P" car-park sign chip; the screen shows a
bar model (`mkBarModel` style, hand-built bars): target 5 × 16, so far 4 × 15 and a "?" box. Showpiece: the "?" box
fills to 20, then Auntie Rose's age appears on the bar model as 61 while she covers her face.
- round: chip "Round 3: quiz, 5 rounds, each out of 20"; Priya alone at her desk; "P" sign.
- priya: Priya smug: four score tiles "mean 15", "want mean 16", her guess "17?" in a thought bubble.
- rule: Mean on the desk; mnemonic card "Means can't be added; **totals** can." and `total = mean × number of
  values`.
- need: bar model: top bar 5 boxes of 16 (`5 × 16 = 80`), bottom 4 boxes of 15 (`4 × 15 = 60`) + "?" box;
  `80 − 60 = 20` drops into the "?" box; stamp SPOT ON!.
- full: Priya shock; chip "20/20"; in the pause the "?" box splits as 16 + 4, four little "+1" arrows to each 15
  box (`16 + 4 = 20`).
- missing: screen: "mean of 5 numbers = 8: 3, 7, 9, 12, ?"
- dad: Dad (smug, then correct!): aligned working `5 × 8 = 40`, `3 + 7 + 9 + 12 = 31`, `40 − 31 = 9`; a check
  chip `(3 + 7 + 9 + 12 + 9) ÷ 5 = 8 ✓`; stamp SPOT ON!; Dad: "Above average." Kavya side-eye.
- rose: Auntie Rose arrives behind the desk (lower third AUNTIE ROSE), waving her phone, then hands over Ah Boy's ears.
- new: Benny, `ting`: Team Kavya's four age tiles (Kavya 12, Ah Boy 8, Mum 41, Dad 43) → "4 members: mean age 26";
  a fifth tile "?" over Rose → "5 members: mean age **33**".
- work: working: `4 × 26 = 104`, `5 × 33 = 165`, `165 − 104 = 61`; the "?" tile above Rose turns into 61; Rose shock.
- rude: Rose `annoyed`; small chip "sense check: the mean went UP, so she is older than 26 ✓". Hold.
- halves: the studio audience as two blocks of seats: left 20 people (mean 62), right 30 people (mean 72).
- halfway: Ah Boy: `(62 + 72) ÷ 2 = 67`; stamp WAY OFF!.
- sizes: Mean: `20 × 62 = 1240`, `30 × 72 = 2160`, `(1240 + 2160) ÷ 50 = 3400 ÷ 50 = 68`; a see-saw pulled
  towards 72 by the bigger group; stamp SPOT ON!.
- slide: Ranger: five dots on a number line all slide right by 2: arrows "+2" on mean, median and mode; Ranger's tape
  slides along at the same length: "range: same". Hold.

## 4 table: Twenty flats on Floor 8 (Averages from frequency tables)
Layout: `asStudio`; the screen shows a corridor of 20 flat doors (Floor 8, Block 208) and the frequency table
(`mkTable`, columns People in flat **x** | Flats **f** | **fx**), totals row. Sigma descends from the top with a
gong. Showpiece: the fx column filling row by row and the table "unfolding" into a list of 20 numbers.
- round: chip "Round 4: Floor 8, Block 208"; 20 little doors with numbers of people on them.
- table: the table rows appear as Benny reads them: 1 | 3, 2 | 6, 3 | 5, 4 | 4, 5 | 2.
- dad: Dad smug: `(1 + 2 + 3 + 4 + 5) ÷ 5 = 3` beside the x column; stamp WAY OFF!.
- boy: Ah Boy: `(3 + 6 + 5 + 4 + 2) ÷ 5 = 4` beside the f column; stamp WAY OFF!.
- sigma: Sigma swoops in (lower third SIGMA), arms up; a huge Σ = "add them all up".
- list: the table unrolls into a list strip `1 1 1 2 2 2 2 2 2 3 3 3 3 3 4 4 4 4 5 5`; the **fx** column header appears.
- fx: fx cells fill: 3, 12, 15, 16, 10; totals Σf = 20, Σfx = 56.
- mean: `mean = Σfx/Σf = 56/20 = 2.8` (stacked); chip "÷ the flats (20), not the rows (5)"; stamp SPOT ON!.
- median: running totals column 3, 9, 14, 18, 20; `(20 + 1)/2 = 10.5th`; on the list strip, values 10-14 highlighted.
- threes: the 10th and 11th values ringed: both 3; "median = 3 people".
- six: Priya smug: the "6" in the f column circled; stamp WAY OFF!.
- bestie: Mo on the desk: arrow from "6" (frequency) to "2" (value): "mode = 2 people"; hearts.
- range: Ranger: tape from x = 1 to x = 5: `5 − 1 = 4` (a crossed-out `6 − 2` from the f column).
- mine: Mr Tan with the carrier; the door "1 person + 🐱".
- data: Sigma, deadpan: chip "cats ≠ data".
- disagree: Pythagoras narrows his eyes at Sigma; Mr Tan happy; "*cricket*". Hold.

## 5 stem: The durian round (Averages from stem-and-leaf diagrams)
Layout: `asStudio`; the screen holds `mkStemLeaf` with a running-total column; then a durian box on the desk
(`asDurian` × 12) with a stem-and-leaf label. Showpiece: Medi walks along the leaves counting 1-8 and stops on the
first leaf of stem 2.
- round: chip "Round 5: minutes to get to the studio (15 people)".
- plant: the diagram builds: 0 | 8 9; 1 | 2 5 5 5 7; 2 | 0 3 6 8 8; 3 | 1 4; 4 | 5; "Key: 1 | 5 means 15 minutes".
- boy: Ah Boy happy; a little potted plant doodle sprouts from the stems.
- order: Medi pops up on the desk (no whistle needed), smug; chip "already in order".
- count: n = 15 counted leaf by leaf; `(15 + 1)/2 = 8th`; running totals 2, 7, 12, 14, 15 beside the rows.
- twenty: Medi's glove on the first leaf of stem 2: "8th value = **20** minutes"; readout MEDIAN 20.
- mode: the three 5s on stem 1 glow: "15 minutes"; a "5" on stem 2 shown as "25 ≠ 15".
- range: Ranger's tape from 8 (first leaf) to 45 (last leaf): `45 − 8 = 37`.
- prize: a durian box on the desk; label: 1 | 4 6 6 6; 2 | 0 2 5 9; 3 | 1 3 6 8; "Key: 2 | 5 means 2.5 kg".
- rich: Ah Boy lifts a giant imaginary durian: "14 kg?!"; stamp WAY OFF!.
- key: Kavya: the key enlarged and ringed; `1 | 4 = 1.4 kg`; stamp SPOT ON!; the giant durian shrinks to normal.
- dmedian: 12 leaves; 6th and 7th leaves (2 and 5 on stem 2) ringed; `(2.2 + 2.5)/2 = 2.35 kg`.
- dmode: three 6s on stem 1 glow (Mo hearts): mode 1.6 kg; Ranger: `3.8 − 1.4 = 2.4 kg`.
- smell: Dad holding his nose; green stink lines drift over the desk.
- outlier: Mum, deadpan; Otto peeks in from the side, sniffs, leaves. Hold.

## 6 compare: The beanbag final (Comparing distributions)
Layout: `asStudio` final: a bucket (`asBucket`) at stage right, beanbags; the screen shows two dot plots on the same
scale 0-10 (`mkNumberLine` + dots), Mum above, Dad below, with ranges braced, then a "weak vs strong" sentence card.
Showpiece: the two dot plots: Mum's huddled round 6, Dad's scattered 2 to 10, both with a dashed "mean 6" line.
- final: chip "FINAL: beanbag toss, 5 sessions × 10 throws"; beanbags fly into the bucket.
- mum: Mum's dots drop onto her line at 6, 6, 7, 6, 5.
- dad: Dad's dots drop at 10, 2, 9, 3, 6; Dad smug, arms up on "ten".
- means: `30 ÷ 5 = 6` for both; a dashed line at 6 through both plots: "same mean".
- spread: Ranger's tape: Mum `7 − 5 = 2`, Dad `10 − 2 = 8`; braces under each plot.
- consistent: labels "consistent" (Mum, green) and "variable" (Dad, orange).
- exciting: Dad smug; Kavya side-eye. Hold.
- two (Mr Tan as the judge): card "compare an **average** AND the **spread**, in **context**".
- css: mnemonic chips **Centre** · **Spread** · **Story**; first sentence written out: "On average, Mum and Dad
  scored the same (mean 6 each)."
- story: second sentence: "Mum's scores were more consistent (range 2 compared with 8)."; a weak/strong card:
  "weak: Mum's range is smaller." vs the strong sentence; stamp SPOT ON!.
- poll: Benny, `ting`: poll bars Team Priya 9 vs Team Kavya 7.
- how: Kavya, suspicious.
- three: Priya: "3 votes"; three icons: Mum, Dad (in a car), Priya; "P" sign. Hold.
- sample: Mr Tan: "sample of 3: too small", "the data **suggest**, not **prove**". Hold.

## 7 grouped: The fun run, in groups (Estimated mean from grouped data: stretch)
Layout: `asStudio`, the screen shows the grouped table (`mkTable`: Time t (min) | f | midpoint x | fx) and a small
histogram with midpoint lines. Showpiece: the runners in each bar slide to the bar's midpoint line.
- run: chip "STRETCH round: 40 fun-run times"; little runner icons.
- groups: rows `20 ≤ t < 30` 6, `30 ≤ t < 40` 15, `40 ≤ t < 50` 11, `50 ≤ t < 60` 8; histogram bars grow.
- mids: midpoint lines drawn at 25, 35, 45, 55 (`midpoint = (lower + upper)/2`); midpoint column 25, 35, 45, 55; fx
  column 150, 525, 495, 440; Σfx = 1610, Σf = 40. Mean watches from the desk.
- est: Mean: `estimated mean = 1610/40 = 40.25` minutes; chip "an ESTIMATE: everyone at the midpoint"; the runners slide.
- short: Priya: `(25 + 35 + 45 + 55) ÷ 4 = 40`; stamp WAY OFF!.
- weight: Sigma, arms up: the 15-runner bar glows next to the 6-runner bar: "weight each midpoint by f".
- modal: Mo: the tallest bar `30 ≤ t < 40` glows: "modal class".
- nobody: Ranger: an arrow from 20 to 60 with "range < 40" and a question mark; Ranger lies back, relaxed. Hold.

## 8 traps: The scoreboard saves you some marks
- intro: "6 EXAM TRAPS" over the scoreboard (`asBoardShot`).
- t1 (TH, Medi): card "ORDER the data first" with `7 2 9 4 5` → `2 4 5 7 9`; whistle.
- t2 (TH, Sigma): card "mean = Σfx ÷ Σf (the TOTAL frequency)" with "÷ number of rows" crossed.
- t3 (TH, Mo): card "mode = the VALUE": "2 people ✓, 6 flats ✗".
- t4 (TH, Ranger): card "range = one number: `10 − 2 = 8` ✓, '2 to 10' ✗".
- t5 (TH, Kavya): card "Centre + Spread + Story: two sentences, in context".
- t6 (TH, Ah Boy): card "Read the KEY: `1 | 4` = 1.4 kg ✓, 14 kg ✗"; Ah Boy hugs a small durian, sad.
- return: logo "PERFECTLY AVERAGE will return".
- results: `asStudio`; drum roll; spotlight sweeps and lands on Team Tan; Benny `ting`; APPLAUSE lit.
- one: Mr Tan's card: "mean: me · median: me · range: **0**".
- cat: Ah Boy points at the carrier.
- notdata: Mr Tan deadpan; Pythagoras narrows his eyes.
- lost: Dad, smug even in defeat; Kavya and Mum deadpan.
- hug: Otto rolls in from the right, arms wide, scoops everyone.
- drag: Mean, tilted further and further (bubble at the end of the vial), sliding out of frame after Otto. Final frame
  holds: the trophy with Mr Tan and Pythagoras, Mean's bow tie on the floor.

## Suggested split for the animators
Timeline total 11.95 min (cold 64 s, measures 96 s, outlier 109 s, backwards 93 s, table 87 s, stem 75 s,
compare 70 s, grouped 57 s, traps 67 s).
- Writer: cold (done).
- A: measures, outlier (about 3.4 min).
- B: backwards, compare, grouped (about 3.7 min).
- C: table, stem, traps (about 3.8 min).
