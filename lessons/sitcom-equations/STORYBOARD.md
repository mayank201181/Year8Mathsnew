# BALANCING ACT, Ep 10 "The Vault of X": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Equations & Inequalities.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Priya's birthday treat: a Saturday afternoon at THE VAULT OF X, an escape room in Bugis. Seven
locked rooms, sixty minutes, and every door opens with one number. The Game Master on the CCTV screen is Kavya's
maths teacher, Mr Tan ("On weekends, I am the Game Master"). Dad's strategy: type seven into everything. Hiding
inside every lock is **Ex, the unknown**: a masked, caped, theatrical mystery ("You'll never find me") who is
unmasked every time a lock is solved ("Curses!") and who keeps turning out to be 5. **Judge Even**, a brass balance
scale in a judge's wig, keeps every move fair ("Whatever you do to one side, do to the other") and bangs her gavel on
unfair ones. Room by room: a giant balance (3x + 4 = 19) and negative, fractional answers; Dee the delivery rider
(the number outside a bracket delivers to every term); two bike stalls that cost the same after 4 hours (Dad chose
the wrong one); Wiper the window cleaner (clear fractions: "You missed a spot!"); the Library of words (Let n be ...;
Mr Tan's clue about Dad's age); Snappy the inequality crocodile, who will not let Ah Boy (exactly 120 cm) into the
laser corridor; the Vending Room, where Dad's seven finally opens a lock (because 7 > 5); and the Vault, guarded by
Ex's partner Madame Y (simultaneous equations). Stinger: they escape with seven seconds to spare. "Seven." "Curses."

Guide sections (lib/topics/equations/guide.ts) by scene: solving-equations → `scales`; equations-with-brackets →
`brackets`; unknowns-both-sides → `both`; fractional-equations → `fractions`; forming-equations → `forming`;
inequalities → `lasers`; solving-inequalities (incl. the stretch flip) → `solve`; simultaneous-equations (stretch)
→ `vault`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'judge'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, ex, judge, dee, wiper, croc, ymad.
- **Humans are the heart.** They speak about 60% of the lines and do almost all of the solving; at least three humans
  are on screen in every scene (Mr Tan on the CCTV screen `eqMonitor` in rooms 2, 4, 5 and 7). The cartoon cast are
  guests. Busts stand BEHIND the room's long table (`eqRoom`: characters in `g.mid`, or your own layer below
  `g.front`), so the shirt hem is hidden. Kavya, Mum, Dad, Ah Boy and Priya are in every room.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Judge Even is `deadpan`; `annoyed` with `tilt` ±1 on every unfair move; she bangs the gavel (`bang` 0 → 1 with
  P(), on the beat) on "ORDER!", "Tipped!" and "Overruled!". Ex is `smug` while hidden, `shock` when unmasked
  (then `annoyed`); his cape swishes (`cape`) on dramatic lines. Dee is `happy`, fast, waving (`wave`). Wiper is
  `happy`, wiping (`wipe`), `annoyed` on "You missed a spot!". Snappy is `happy`, snaps (`snap`) on "Snap!" and
  "Zap.", `smug` when he flips. Madame Y is `smug`. Dad is `smug` right before every mistake and `shock` after.
  Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed` when she loses to Kavya. Kavya is
  `deadpan`/exasperated with Dad and `smug` when right. Mum is brisk and `neutral`/`happy`; she checks things.
  Mr Tan is `happy` at his own puns; everyone else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **Ex is unmasked.** Every solved lock: Ex (`cast(.., 'ex')`) `unmask` 0 → 1 over ~0.5 s and his badge shows
     the value (`val`): scales.curses `5`, scales.didnt `−1.5`, brackets.again `5`, both.mask `5`, both.new `1`,
     forming.four `5`, lasers.range `−1…3` (use `val: '5×'`, see below), vault.unmask `4` (and Madame Y `3`). Each
     time he is masked again in the next room ("new room, new number"). "Five" keeps coming back: his rage grows.
  2. **The judge's stamp** `eqStamp(parent, false)` "TIPPED!" (red) thumps onto every unfair move:
     scales.tipped (move the 3 across), brackets.tipped (4x + 3), fractions.spot (x + 3 = 20), lasers.zap,
     solve.buzz (code 5) and solve.flip over Priya's x < −3. `eqStamp(parent, true)` "BALANCED" (green) on correct
     checks: scales.subst, brackets.collect, both.cost, fractions.dad, vault.sub. Scale it ~0.5.
  3. **Dad's seven.** cold.seven (keypad WRONG, red), scales.seven (the bags would weigh 25 kg), solve.dadseven/works
     (the keypad turns green OPEN, because 7 > 5), traps.time (seven seconds to spare). Each time: Dad `smug`,
     Kavya turns to camera `deadpan`.
  4. **Mr Tan's puns** on the CCTV screen land to silence: a tiny chip "*cricket*", deadpan faces (brackets.pun,
     solve.pun). Dad is the only one who smiles (brackets.mine).
  5. **The countdown clock** (`g.clock` of `eqRoom`, `eqClock`) on the wall above the exit, every room: scales
     58:xx, brackets 49:xx, both 41:xx, fractions 34:xx, forming 27:xx, lasers 19:xx, solve 12:xx, vault 5:00 → 0:07.
     It counts down in real time inside each scene (`clock.set(base - t)`).
  6. **The keypad** (`g.keypad`) shows the code being typed (`press`) and flashes OPEN (green) on every solved lock.
- **Talking heads** (a TH mark below) use `eqConf(root, who)` full stage, the character big (s ≈ 1.3–1.45) at about
  (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `eqLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, equation or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`3x + 4 = 19`, `x/3 + 2 = 7` stacked, `-2 < x <= 3`), `mkWorking` for aligned
  multi-step working (equals signs lined up, notes like "− 4 both sides" on the right), `mkBalance` for the scales,
  `mkBarModel` for bar models, `mkNumberLine` for every number line (open circles: draw a white-filled circle with a
  dark ring over the end; closed: filled), `mkAxes` for the graph, `mkTable` for tables. Fractions stacked. Money as
  `$23`. Negative numbers with a real minus (−). The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. Aim for at most ~1,000 elements per scene (busts ≈ 80–120 each; Ex ≈ 40; build each human once).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`eqLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Escaping. Probably. |
| mum | Mum: brisk, practical, checks everything | magenta kurta, bun, bindi; prop clue card (`paper`) | MUM / Kavya's mum. Checks everything. |
| dad | Dad: confident, wrong, lovable; "the code is seven" | glasses, moustache, green polo; empty hand (`lift: 1` to type) | DAD / "The code is seven." |
| boy | Ah Boy, 8: asks the obvious question that is secretly the hard one; exactly 120 cm | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Exactly 120 cm. |
| priya | Priya, 12, birthday girl: competitive, quick, confidently wrong | purple star tee, bob, yellow clip, striped party hat (`c.hat`); pencil | PRIYA / Best friend. Birthday girl. |
| tan | Mr Tan: dry, kind, puns; weekend Game Master | shirt and tie, glasses, headset mic; on the CCTV screen `eqMonitor(..).tan` | MR TAN / Maths teacher. Weekend Game Master. |
| ex | Ex, THE UNKNOWN: theatrical masked mystery; "You'll never find me", "Curses!" | navy bean body, fedora, purple cape, black domino mask, gold badge "x"; `unmask`, `val`, `cape` | EX / The unknown. You'll never find him. |
| judge | Judge Even, THE BALANCE METHOD: strict, fair, dramatic | brass balance scale in a white judge's wig and black robe; `tilt`, `bang`; pans `c.panL`, `c.panR` | JUDGE EVEN / The balance method. Strictly fair. |
| dee | Dee, the DISTRIBUTIVE LAW: a delivery rider who delivers to every term | cardboard parcel, orange helmet, "× ALL" label, letter in hand; `wave` | DEE / Delivers to every term in the bracket. |
| wiper | Wiper, CLEARS FRACTIONS: cheerful window cleaner, "You missed a spot!" | blue squeegee head with a face, black blade, yellow handle, cloth, "× LCM" sticker; `wipe` | WIPER / Clears fractions. Every term. |
| croc | Snappy, THE INEQUALITY SIGN: a crocodile whose jaws make "<"; bites the bigger number | green croc head side-on, jaws open to the right, hinge (pointy end) at the left; `snap`, `belt` (the line under ≤); flip with `tr(g, x, y, s, 180)` | SNAPPY / The inequality sign. Bites the bigger one. |
| ymad | Madame Y, the second unknown, Ex's partner | Ex's build in teal and pink, beret, feather boa, beauty spot, badge "y"; `unmask`, `val` | MADAME Y / The second unknown. Ex's partner. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `eqLobby` (cold and the traps stinger: neon THE VAULT OF X, leaderboard, clock above the door, keypad, desk
"ESCAPE IN 60 MINUTES"; layers `g.mid` / `g.front` / `g.top`), `eqRoom(parent, kind)` for the seven rooms and the
vault (kinds `scales`, `post`, `bike`, `glass`, `library`, `laser`, `vending`, `vault`): brick walls in the room's
colour, the room plaque top centre-right, the countdown `g.clock` above the EXIT door, `g.keypad` on the door, a
pendant lamp, decor on the back-left wall (`g.decor`, op() it off to make room for a board), and the long table
(top at `g.counterY` 530); `eqConf` (talking heads), `eqMonitor` (Mr Tan on the CCTV screen, `g.tan`).
Props: `eqKeypad`, `eqClock`, `eqCard` (clue card / board), `eqStamp`, `eqBag` (mystery sack "x"), `eqWeight`
('4 kg'), `eqPadlock`, `eqGavel`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkBalance`, `mkBarModel`, `mkBrace`,
`mkNumberLine`, `mkAxes`, `mkTable`, `mkAngleMark`, `mkChip`, `mkSpeechBubble`, `mkWhiteboard`, `mkPriceTag`,
`mkNote`, `mkCoin`. Lib: `arrow`, `chip`, `tick`, `cross`.

Board convention for every room: the working goes on an `eqCard` or `mkWhiteboard` on the right half of the wall
(about x 570-990, y 110-500, in front of the wall and behind the cast's heads), or full stage in a TH shot. Humans
stand behind the table at x 150-900, y ≈ 440-460, s ≈ 0.85-0.95.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `eqLobby`, slow push; Kavya behind the desk; chips "Kavya, age 12", "Saturday, 2 p.m.", "an escape room
  in Bugis"; lower third KAVYA, 12.
- priya: Priya pops up beside her in her party hat (lower third PRIYA); chips "**7** locked rooms", "**60** minutes".
- gm: cut to the CCTV close-up: `eqMonitor` (660 × 420) full stage; Mr Tan in a headset (lower third MR TAN);
  chip "every door: **one number**".
- sir: the lobby: the whole family (Ah Boy, Mum, Kavya, Priya, Dad) goes `shock`; Kavya's bubble "Mr Tan?!".
- weekend: back to the screen, slow push-in on Mr Tan, deadpan → smug in the pause.
- seven: the lobby, push towards the door: Dad (lower third DAD), smug, lifts his hand to the keypad; it shows 7,
  then flashes WRONG (red) in the pause; Dad `shock`, everybody deadpan; chip "the code is **7**. always.".
- tiny: documentary zoom into the keypad's display (viewfinder corners, "ZOOM ×" readout), where an italic x blinks.
- ex (TH): Ex's confessional (lower third EX): plaque "THE UNKNOWN / x = ? / you'll never find him", then three
  doors with different numbers (2, −1.5, 31), then a giant "NEVER." as his cape swishes.
- baddie: the lobby, close on Ah Boy (hand up), Mum and Kavya.
- mystery (TH): Ex, push-in; chip "a **mystery**. completely different."; smug in the pause.
- plan: the lobby, all five; Kavya smug; banners "every lock = an **equation**", "find x → the door opens".
- games: Ex hops onto the desk; chips "**60** minutes", "**7** doors", "**1** unknown" on the beats; on "Let the
  games begin!" the wall clock starts counting down from 60:00; the family `shock`.
- title: purple title card with rays; logo "BALANCING / ACT" over a brass balance beam that wobbles and settles
  level; "Episode 10: The Vault of X"; the cast pops in: Ah Boy, Priya, Ex, Kavya, Dad. Hold.

## 1 scales: The Scales Room (Solving one- and two-step equations)
Layout: `eqRoom(.., 'scales')`, clock 58:20 counting down. A big `mkBalance` (arm ~210) stands on the table at the
right (x ≈ 760): left pan three `eqBag`s and an `eqWeight('4 kg')`, right pan `eqWeight('19 kg', { w: 130 })`.
Humans behind the table on the left half (Dad, Kavya, Mum, Ah Boy, Priya). Judge Even appears on the table at the
left-centre. Working on an `eqCard` (title "LOCK 1") that replaces the room decor. Showpiece: the balance stays level
while the same thing comes off both pans: 4 kg off each side, then each pan shared into three.
- room: chip "Room 1 · 58:20"; the balance level; under it `3x + 4 = 19` appears (pans labelled `3x + 4` and `19`).
- seven: Dad (smug) points at a bag: speech bubble "x = 7?".
- check: Kavya deadpan: `3 × 7 + 4 = 25` with `25 ≠ 19` in red; the balance tips hard to the left (tilt −1) as the
  bags swell to "7 kg"; then snaps back.
- order: Judge Even pops onto the table (lower third JUDGE EVEN), gavel BANG on "ORDER!"; chip "do the same to
  **both** sides".
- level: working line `3x + 4 = 19`; a 4 kg weight lifts off the left pan AND 4 kg (a chunk) off the right pan
  (the 19 kg block becomes "15 kg"); the beam stays level; note "− 4 both sides".
- share: next line `3x = 15`, note "÷ 3 both sides"; the right pan's 15 kg splits into three 5 kg blocks, each
  bag gets one; `x = 5` ringed.
- subst: Mum: check line `3 × 5 + 4 = 19 ✓`; stamp BALANCED.
- curses: Ex peeks out of a bag on the left pan; mask flies off; badge `5`; shock → annoyed. Hold.
- socks: Ah Boy puzzled (hand up); Mum: a two-step "build" chain: x → `× 3` → `3x` → `+ 4` → `3x + 4` (socks then shoes icons), then the undo
  chain backwards in reverse order `− 4`, `÷ 3`; chip "**inverse operations**, reverse order".
- move: the card clears: Priya (lower third PRIYA if not shown) smug: `3x = 12`, then her `x = 12 − 3 = 9` written
  in red.
- tipped: the judge tilts (+1), gavel BANG, stamp TIPPED!; the red line crossed out; correct working `3x = 12`,
  `x = 12 ÷ 3 = 4` (note "3x means 3 × x: ÷ 3 both sides").
- neg: Priya: `6x + 11 = 2`, `6x = −9`; chip "impossible?!".
- overruled: gavel BANG; chip "answers can be **negative** or **fractions**".
- frac: Kavya: working `x = −9/6 = −3/2 = −1.5` (stacked fractions), then the check `6 × (−1.5) + 11 = 2 ✓`; the
  keypad shows −1.5 and flashes OPEN.
- didnt: Ex unmasked again, badge `−1.5`, looking at it amazed (shock → happy). Hold.

## 2 brackets: The Post Room (Equations with brackets)
Layout: `eqRoom(.., 'post')` (pigeonhole lockers on the back wall), clock 49:xx. Locker number labels are the
locks. Dee rides in on the table. The CCTV screen (`eqMonitor`, ~300 × 200) hangs on the wall right of the plaque
for Mr Tan's pun. Working on an `eqCard` "LOCKER 1" at the right. Showpiece: Dee's parcels: an arrow from the 4 to
EACH term inside the bracket (`arrow`), the "4 × x" and "4 × 3" parcels landing, making `4x + 12`.
- room: chip "Room 2 · 49:xx"; lockers glow.
- read: Ah Boy (happy): `4(x + 3) = 20` then his wrong `4x + 3 = 20` in red.
- dee: Judge Even pops up at the edge of the frame, gavel BANG, stamp TIPPED! over Ah Boy's line; then Dee zooms in on the table (lower third DEE), waving; chip "delivers to **every** term".
- both: two delivery arrows from the 4 to x and to 3: `4 × x = 4x`, `4 × 3 = 12`; `4(x + 3) = 4x + 12`.
- expand: Kavya: working `4x + 12 = 20`, `4x = 8` (note "− 12"), `x = 2` (note "÷ 4"). Label "EXPAND FIRST".
- divide: Priya (smug, racing): a second column "DIVIDE FIRST": `20 ÷ 4 = 5`, `x + 3 = 5`, `x = 2`; both columns
  end in `x = 2`.
- fair: the judge level, both columns ticked; chip "divide first when it **divides exactly**; otherwise **expand**".
- big: Mum: the big locker `5(x + 1) − 2(x − 3) = 26`.
- negdel: Dee delivers twice from the −2: `−2 × x = −2x`, `−2 × (−3) = +6` (the +6 glows); arrows from the 5 too.
- collect: Mum: working `5x + 5 − 2x + 6 = 26`, `3x + 11 = 26`, `3x = 15`, `x = 5`; check chip
  "`5 × 6 − 2 × 2 = 26` ✓"; stamp BALANCED; locker opens.
- again: Ex pops out of the locker, unmasked: badge `5`, annoyed. Hold.
- pun: the CCTV screen: Mr Tan happy; everyone deadpan; "*cricket*" chip; a pair of socks icon. Hold.
- mine: Dad, sad-proud: chip "odd socks". Hold.

## 3 both: The Bike Shed (Unknowns on both sides)
Layout: `eqRoom(.., 'bike')` (pegboard, hanging wheel), clock 41:xx. Two price signs (`mkPriceTag` or two small
`eqCard`s) "STALL A: $3 + $5/h" and "STALL B: $15 + $2/h". A bar model (`mkBarModel`, the guide's diagram):
`5h + 3` above `2h + 15`, the same length. Showpiece: crossing out 2h from BOTH bars, leaving `3h + 3 = 15`.
- clue: Kavya with the clue card; the two stall signs; chip "same cost?".
- fee: Dad smug, pointing at STALL A; chip "smallest fee!".
- eq: Judge Even: `5h + 3 = 2h + 15` (both sides highlighted), then the bar model; the two "2h" boxes in each bar
  shade grey and are crossed out on "Take the smaller, 2h, from both".
- solve: Kavya: working `3h + 3 = 15`, `3h = 12`, `h = 4` ("hours").
- cost: Mum: table A `5 × 4 + 3 = $23`, B `2 × 4 + 15 = $23`; stamp BALANCED.
- six: Mum: the table grows a 6-hour row: A `$33`, B `$27` (B glows cheaper).
- small: Dad's smile melts (smug → sad); everyone deadpan. Hold.
- right: Kavya: the shed door `2x + 9 = 5x − 6`; "5x is bigger" (5x circled); working `9 = 3x − 6` (note
  "− 2x"), `15 = 3x` (note "+ 6").
- ways: Ah Boy puzzled at the "backwards" `15 = 3x`; the judge: `15 = 3x` ⟷ `3x = 15` (a two-way arrow), `x = 5`.
- mask: Ex unmasked on the shed door, badge `5`, raging (annoyed, cape whipping); chip "3rd time". Hold.
- padlock: Kavya: padlock `7 − 4x = x + 2`, the −4x circled, note "+ 4x both sides", `7 = 5x + 2`, `5 = 5x`, `x = 1`.
- new: Ex unmasked: badge `1`, happy for once. Hold.

## 4 fractions: The Glass Room (Equations with fractions)
Layout: `eqRoom(.., 'glass')` (big windows), clock 34:xx. Each lock is written on a window pane (an `eqCard`
looking like glass: pale blue fill) on the right. Wiper squeegees across the pane: a white wipe-band sweeps across
and the fraction disappears. The CCTV screen for Mr Tan's fact. Showpiece: x/2 + x/3 = 10 with "× 6" written beside
EVERY term, then the clean `3x + 2x = 60`.
- room: chip "Room 4 · 34:xx"; window glints.
- wiper: Wiper slides in (lower third WIPER), wiping; chip "fraction bar = **divide** → so **multiply**".
- undo: Kavya: `x/3 + 2 = 7`, `x/3 = 5` (note "− 2"), `x = 15` (note "× 3"); a small bar model of x in three parts.
- trap: Priya: `x/4 + 3 = 5` → her `x + 3 = 20`, `x = 17` in red.
- spot: Wiper annoyed, points at the un-multiplied 3 (a smudge); stamp TIPPED!; correct: `x + 12 = 20`, `x = 8`
  (each term with "× 4").
- sky: the skylight pane `(2x − 1)/5 = 3`; brackets appear around the numerator `(2x − 1)`; "× 5 first".
- dad: Dad works it: `2x − 1 = 15`, `2x = 16`, `x = 8`; stamp BALANCED; Dad amazed (shock → happy). Hold.
- lcm: Wiper, at the big window `x/2 + x/3 = 10` (chip "two denominators"): "LCM of 2 and 3 = **6**"; "× 6" beside every term: `6 × x/2`, `6 × x/3`, `6 × 10`.
- six: Kavya: `3x + 2x = 60`, `5x = 60`, `x = 12`.
- coef: Priya: `2/3 x = 8`, `2x = 24` (note "× 3"), `x = 12` (note "÷ 2").
- papyrus: the CCTV screen: Mr Tan holds up a papyrus drawing with `x + x/7 = 19` and "about 1550 BCE".
- escape: Ah Boy, earnest; everybody looks at him. Hold.

## 5 forming: The Library (Forming and solving equations)
Layout: `eqRoom(.., 'library')` (bookshelves), clock 27:xx. Clues are parchment scrolls (`eqCard` with a cream
fill) on the right; the translation from words to algebra is shown as word → arrow → algebra. The CCTV screen for
Mr Tan's clue. Showpiece: the angles on a straight line drawn properly (`mkAngleMark`), with the "100°" and "80°"
filling in after Kavya's correction.
- room: chip "Room 5 · 27:xx"; books.
- clue: Priya reads the scroll "three consecutive whole numbers add up to 96".
- let: Kavya: "**Let n be the smallest number.**" written on the scroll; `n`, `n + 1`, `n + 2` as three book
  spines; Ex, hiding behind the books, bows (he likes being introduced properly).
- form: Mum: working `n + (n + 1) + (n + 2) = 96`, `3n + 3 = 96`, `3n = 93`, `n = 31`; the keypad types 313233 and
  flashes OPEN.
- angles: Priya: a straight line with two angles `(3x + 10)°` and `(2x + 20)°` (`mkAngleMark`), `180°` across;
  working `5x + 30 = 180`, `x = 30`; chip "Done!".
- asked: Kavya: "the lock wants the **angles**": `3 × 30 + 10 = 100°`, `2 × 30 + 20 = 80°` fill into the diagram;
  `100 + 80 = 180 ✓`.
- frame: Ah Boy holds a picture frame: a rectangle labelled `(2x + 3) cm` and `x cm`; "perimeter = 36 cm".
- perim: Mum: `2(2x + 3) + 2x = 36`, `6x + 6 = 36`, `x = 5`; "length = 2 × 5 + 3 = **13 cm**".
- four: Ex unmasked, badge `5`, furious; chip "4th time". Hold.
- ages: the CCTV screen: Mr Tan with the clue: "Dad = 3 × Kavya", "in 12 years: Dad = 2 × Kavya".
- letk: Kavya: "Let k be my age in years"; a two-row table: now `k`, `3k`; in 12 years `k + 12`, `3k + 12`;
  `3k + 12 = 2(k + 12)`.
- agesolve: Mum: `3k + 12 = 2k + 24`, `k = 12`; "Kavya **12**, Dad **36**".
- how: Dad, suspicious, looking at the screen.
- pte: Mr Tan, deadpan: chip "PARENTS' EVENING"; Dad sinks. Hold.

## 6 lasers: The Laser Corridor (Inequalities & number lines)
Layout: `eqRoom(.., 'laser')` (red beams pulse), clock 19:xx. A height-sign (a ride-style "YOU MUST BE TALLER THAN
120 cm" board with a measuring stick) near the door; a big `mkNumberLine` on a dark glass panel for the rest.
Snappy sits on the table. Showpiece: the number line `−2 < x ≤ 3` with an open circle at −2, a closed circle at 3,
the shaded bar between, and the five integers lighting up one by one.
- sign: Ah Boy against the measuring stick: exactly at the 120 cm mark; "taller than 120 cm"; happy.
- gt: Snappy snaps in (lower third SNAPPY): `h > 120`; on a number line 100–140 an OPEN circle at 120 and the arrow
  to the right; "120 not included".
- toes: Ah Boy on tiptoe (bust rises 10 px), hopeful. Hold.
- point: `2 < 5` and `5 > 2` big, the pointy end of each sign labelled "small", the open side "big"; Snappy turns
  to show his hinge (pointy end) at the 2.
- max: Mum: sign "MAX 4 PEOPLE": `p ≤ 4`; number line 0–8 with a CLOSED circle at 4 and the line to the left.
- circles: two rows: `<`, `>`: ○ "not included"; `≤`, `≥`: ● "included".
- belt: Snappy's `belt` → 1: the line under him; "≤ = < plus half an =": the line fills the circle in (a ring
  fills).
- tile: Priya on floor tiles numbered 1–5, "x > 3"; she stands on 3.
- zap: a laser zaps her tile (red flash); stamp TIPPED!; "3 is **not** included" with an open circle. Priya annoyed.
- lock: the lock panel: "list the integers: `−2 < x ≤ 3`"; number line −4 … 5.
- ints: Ah Boy: 1, 2, 3 highlighted in amber (wrong: incomplete).
- zero: Kavya: open circle at −2, closed at 3, the bar drawn, then −1, 0, 1, 2, 3 light up in turn; "5 integers";
  the keypad flashes OPEN.
- range: Ex appears as five little Exes on the five integers (or one Ex with badge `−1…3`), smug. Hold.

## 7 solve: The Vending Room (Solving inequalities; stretch: the flip)
Layout: `eqRoom(.., 'vending')` (vending machine at the left), clock 12:xx. Working on an `eqCard` on the right; a
number line under it for tests. The CCTV screen for Mr Tan's pun. Showpiece: Snappy's backflip: the croc rotates
180° over `x < −3` and lands as `x > −3`.
- five: Priya: working `3x − 5 > 10`, `3x > 15` (note "+ 5"), `x > 5` (note "÷ 3"); she types 5: WRONG.
- buzz: Snappy, stamp TIPPED!; "x > 5 is a **range**"; number line with an open circle at 5, arrow right.
- test: Kavya: test points on the number line: 6 → `18 − 5 = 13 > 10 ✓` (green), 5 → `15 − 5 = 10` "not > 10" ✗.
- dadseven: Dad (smug) types 7.
- works: the keypad turns green OPEN; Dad leaps (lift, happy); everyone shock.
- because: Kavya deadpan to camera: `7 > 5` with the 7 sitting on the shaded part of the number line. Hold.
- budget: Mum at the vending machine: price tags "drink $2", "sandwich $4", a $20 note; `4p + 2 ≤ 20` with "at most
  → ≤" highlighted.
- half: Kavya: `4p ≤ 18`, `p ≤ 4.5`, then "→ **4** sandwiches" (four sandwiches drop in the tray).
- wrongflip: Priya: stretch lock `−2x < 6` → her `x < −3`.
- flip: Snappy does a backflip (rotate 0 → 180°); the "<" becomes ">": `x > −3`; stamp TIPPED! over Priya's line.
- zero: Kavya: test 0: `−2 × 0 = 0 < 6 ✓`, and 0 is to the right of −3 on the number line: `x > −3` ✓.
- pun: the CCTV screen: Mr Tan happy, an `=` sign with a little halo; "*cricket*"; deadpan faces. Hold.
  Dad alone smiles.

## 8 vault: The Vault (Simultaneous equations: stretch)
Layout: `eqRoom(.., 'vault')` (the round vault door with its wheel behind), clock from 5:00 running fast to 0:07 at
`go`. Two big dials x and y on the vault door. Madame Y and Ex stand on the table, arm in arm. Working on an
`eqCard`; then `mkAxes` (0–8) with the two lines. Showpiece: the two lines `x + y = 7` and `x − y = 1` crossing at
(4, 3), and both villains unmasked at once.
- room: chip "THE VAULT · 5:00"; the wheel turns slightly; dials "x ?" "y ?".
- y: Madame Y appears beside Ex (lower third MADAME Y), smug; chip "2 unknowns → 2 clues".
- clues: Kavya: `x + y = 7` and `x − y = 1` stacked.
- many: Ah Boy: a little table of pairs for `x + y = 7`: (3, 4), (2, 5), (10, −3), "…".
- same: Madame Y: "true **at the same time**"; the pair (4, 3) hinted with a "?".
- tea: Mum: two bubble-tea orders drawn as cups and waffles: `2t + w = 11` over `t + w = 7`; subtract (same signs):
  `t = 4`; chip "one tea = **$4**".
- add: Kavya: the two clues stacked with a "+" bar: `+y` and `−y` cancel (struck out), `2x = 8`, `x = 4`.
- sub: Priya: `4 + y = 7`, `y = 3`; check `4 − 3 = 1 ✓`; stamp BALANCED.
- sss: Judge Even, gavel: "**elimination**"; chip "**S**ame **S**igns **S**ubtract · opposite signs **add**" (SSS big).
- graph: `mkAxes` 0–8: draw `x + y = 7` and `x − y = 1`; the crossing point (4, 3) glows.
- unmask: Ex and Madame Y unmasked together: badges `4` and `3`, shock; the dials spin to 4 and 3.
- go: Kavya; the vault door swings open, light floods in; the clock freezes at 0:07. Hold.

## 9 traps: The Vault saves you some marks
- intro: "6 EXAM TRAPS" over the vault door.
- t1 (TH, Judge Even): card "`3x + 4 = 19`: undo the `+ 4` first" with the wrong `x + 4 = 19/3` crossed; gavel.
- t2 (TH, Dee): card "`−3(x − 4) = −3x + 12`" with the two delivery arrows; ✗ "`−3x − 12`".
- t3 (TH, Kavya): card "`5x − 2 = 2x + 13` → `3x = 15` ✓ (not `3x = 11` ✗)".
- t4 (TH, Wiper): card "× **every** term"; three wipes on "Every. Single. Window."
- t5 (TH, Priya): card "answer the question: **100°**, not x = 30"; Priya sheepish.
- t6 (TH, Snappy): card "`x > 5`: open circle, a range ✓ / `x = 5` ✗" and "check: substitute back".
- return: the logo "BALANCING ACT will return".
- time: cut to `eqLobby`: the family bursts out of the door; Mr Tan in person behind the desk: the stopwatch shows "0:07"; chip "**7** seconds to spare".
- dad: Dad, slow push-in, smug: "Seven." A tiny "7" sparkles over his head. Hold.
- curses: Ex on the leaderboard (the team's row "BALANCING ACT 59:53" added at the top), mask back on: "Curses."
  Final frame holds.

## Suggested split for the animators
- Writer: cold (done).
- A: scales, brackets, traps (about 3.5 min).
- B: both, fractions, vault (about 3.7 min).
- C: forming, lasers, solve (about 3.8 min).
