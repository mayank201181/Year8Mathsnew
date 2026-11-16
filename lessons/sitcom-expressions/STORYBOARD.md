# ON GOOD TERMS, Ep 9 "The Open House": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Expressions & Formulae.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every expression exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Deepavali. Kavya's family holds an open house in their HDB flat, #08-208 in Block 208: fifty guests at
four o'clock. Kavya's class test has just come back: Q1 "Factorise 12x + 18", her answer 12(x + 18), a red
**REVISE!** and "Retest: Monday". Hiding inside the x on that test is **Agent X**, the unknown himself: a secret
agent in a trench coat, fedora and dark glasses whose whole body is a letter x. His value is classified ("I could be
anyone"). His method: go **undercover as a number** to test a claim. A claim that fails gets his red **COVER BLOWN**
stamp; a claim true for every value gets the green **IDENTITY CONFIRMED** stamp. Over one day the family hangs the
fairy lights (formula), Ah Boy counts sweets (expression, equation, identity), Priya brings rangoli tiles (Square,
x², and Stick, x: like terms and index laws), Uncle Ravi calls from Miami about kulfi (substitution, F = 9/5 C + 32),
Handy greets the guests (expanding: everyone inside gets a handshake), Kavya packs goodie bags and pulls **the Great
Factor Heist** with Agent X (factorising: the set piece), Ah Boy's magic trick and the taxi fares become algebra
(writing expressions and formulae), and Phil the function machine runs backwards (changing the subject: socks and
shoes); then the kolam at the door is expanded (double brackets, stretch). Stinger: on Monday Kavya gets 10/10;
Ah Boy does his magic trick on Agent X, who is stunned that it knows his answer. Cover blown.

Guide sections (lib/topics/expressions/guide.ts) by scene: language-of-algebra → `labels`; simplifying → `tiles`;
substitution → `sub`; expanding → `hands`; factorising → `heist` (and the cold open's 12x + 18); writing-expressions →
`words`; changing-the-subject → `night` (first half); double-brackets (stretch) → `night` (second half). Exam mistakes
→ `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'x'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, ravi, x, square, stick, handy, phil.
- **Humans are the heart.** They speak more than half the lines and are on screen in every scene (Uncle Ravi by
  video call from Miami). Agent X and friends are guests in the family's flat. In `xpFlat` the busts stand BEHIND the
  dining table (characters in `g.mid`, or your own layer below `g.front`), so the shirt hem is hidden. In `xpDoor`
  they stand behind the low parapet band (`g.front`, top at y 556).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Agent X is `deadpan` with his shades on; on every "Cover blown" he slowly lowers his shades (`shades` 1 → 0) and
  goes `smug`; he goes `sad` when forced to be one particular number ("I hate equations"). Square is `smug`, says
  "darling", and turns `annoyed` when anyone lumps her in with sticks. Stick is `neutral`, unbothered. Handy is
  `happy`, gloves pumping (`shake`), `shock` when someone misses a handshake. Phil is `neutral`, monotone; his gear
  spins when he works. Dad is `smug` right before every "Same thing", then `sad`/`shock` when the stamp lands.
  Ah Boy is `happy` even when wrong (crumbs of ladoo). Kavya is exasperated (`annoyed`) at Dad, then `happy` when she
  gets it. Priya is quick and `smug`, `shock` when Square corrects her. Mr Tan is `happy` at his own pun; everyone
  else goes `deadpan`. Mum is brisk (`neutral` → `annoyed` at the ladoo news).
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **Agent X's stamps** `xpStamp(parent, false)` "COVER BLOWN" (red) on every claim a number disproves: cold.blown
     (12(x + 18)), labels.counter, tiles.ten, hands.blown, words.blown, night.blown, night.sq, traps.how (on Agent X
     himself). `xpStamp(parent, true)` "IDENTITY CONFIRMED" (green) on: labels.ident, heist.six, heist.check,
     words.ident. Scale about 0.5.
  2. **Dad's "Same thing."** cold.same, labels.dadid, tiles.dad, hands.dad, words.dad, night.dad, night.dadsq. Each
     time: Dad smug, a beat, Agent X goes undercover as a number (his value tag `badge` shows `x = 0`, `x = 10` ...),
     the two sides come out different, the stamp lands, Dad deflates. In traps.t1 he finally says "Not the same thing."
  3. **The ladoos.** A steel tray of ladoos (`xpTray`, 18) sits on the table all episode and gets one fewer each scene
     (18 → 17 in the cold open's "I haven't touched any ladoos"). Ah Boy always has crumbs. Pays off in heist.confess.
  4. **The wall clock** (`g.clock(h, m)` in `xpFlat`) shows each scene's time: 10:00, 1:00, 2:00, 2:30, 5:00, 6:00, 9:00.
  5. **"I could be anyone."** Agent X's line (cold.anyone, sub.anyone). His undercover value tag (`badge`) holds an
     `mkMath` like `x = −3`; for negatives he also puts on his giant bracket disguise (`brackets: 1`).
  6. **Mr Tan's pun** lands to silence (hands.pun): a tiny "*cricket*" chip and deadpan faces.
- **Talking heads** (TH below) use `xpConf(root, who)` full stage, the character big (s ≈ 1.3) at about (330, 410),
  REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show `xpLowerThird(root, who)` for
  about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a term, expression or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (`12x + 18`, `6(2x + 3)`, `x^2`, `3xy(2x + 3y)`), `mkWorking` for aligned
  multi-step working (equals signs lined up), `mkTable` for the expand grids, `mkAlgebraTile` for tiles, `mkBrace` for
  labels such as "term" and "coefficient". Use the maths markup: powers `x^2`, `y^6 ÷ y^2 = y^4`, stacked fractions
  `9/5 C + 32`, `(y - 6)/3`, `3/4 p - 3`, the identity sign `≡` typed as is. The jokes can be silly; the maths must be
  exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except lower
  thirds. At most about 1,000 elements per scene (a human bust is 60-150 elements: build each once per scene and
  reuse it with `op`).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`xpLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right; retest on Monday | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Retest on Monday. |
| mum | Mum: brisk party general | magenta kurta, bun, bindi; no prop by default (`prop: 'ladle'` in the kitchen) | MUM / Fifty guests at four. |
| dad | Dad: confident, wrong, lovable; "Same thing." | glasses, moustache, green polo | DAD / "Same thing." |
| boy | Ah Boy, 8: the ladoo thief, magician; asks the obvious question | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Has not touched the ladoos. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; prop pencil | PRIYA / Best friend. Competitive. |
| tan | Mr Tan: dry, kind, puns; a guest who cannot stop teaching | shirt and tie, glasses; prop marker | MR TAN / Maths teacher. Guest. Brought a pun. |
| ravi | Uncle Ravi: Mum's brother in Miami, loud, always on a call | bald, salt-and-pepper beard, round glasses, orange shirt (`xpRaviCall`) | UNCLE RAVI / Mum's brother. Miami. |
| x | Agent X, the UNKNOWN: deadpan spy, "I could be anyone" | body shaped like an x: navy legs, trench-coat sleeves, belted coat, cream head, fedora with a red band, shades; `shades`, `arms`, `brackets`, `badge` (`g.badge` holds his value tag maths) | AGENT X / The unknown. Value: classified. |
| square | Square, the x² TILE: posh, "darling", an area | blue x-by-x tile, tiara, pearls, "x²" in the corner | SQUARE / x squared. An area. Posh. |
| stick | Stick, the x TILE: relaxed, a length | long green x-by-1 tile, backwards red cap, "x" at the bottom | STICK / x. A length. Chill. |
| handy | Handy, the TERM OUTSIDE THE BRACKET: over-friendly greeter | yellow badge body, two huge white gloves; `val` (tag text: '3', '−2', 'x'), `neg` (purple, grumpy), `shake` | HANDY / The term outside the bracket. |
| phil | Phil, the FUNCTION MACHINE: monotone, has a reverse gear | steel-blue machine, funnel in, chute out, gear, two operation windows (`g.slotA`, `g.slotB`), lever; `rev`, `run` | PHIL / Function machine. Has a reverse gear. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `xpFlat` (living room on Deepavali: torana garland, square window with grilles and Block 210 outside and fairy
lights `g.lights` (`g.upd(t, lightsP)`), wall clock `g.clock(h, m)`, a shelf of diyas `g.shelf` at y 360, dining table
with red-and-gold cloth; layers `g.mid` / `g.front` / `g.top`; `g.tableY` 530; free board space x 560-1150, y 110-500),
`xpDoor` (HDB corridor: open door #08-208, folded gate, torana, two diyas, shoe rack, parapet and blocks on the right;
layers as `xpFlat`, the low parapet band top at y 556; `g.doorAt`), `xpRaviCall(parent, w, h, label, night)` (video
call, Miami beach behind Uncle Ravi; `night` gives a dark sky with stars), `xpConf` (talking heads).
Props: `xpStamp`, `xpTest` (Kavya's test: `g.ans`, `g.cross`, `g.revise`, `g.retest`, `g.xAt`), `xpTray` (ladoos,
`g.set(k)`), `xpLadoo`, `xpMurukku`, `xpGoodieBag` (`g.set(p)` contents), `xpSweetBag` (a "?"/x sticker), `xpDiya`,
`xpLights`, `xpClock`, `xpKolam` (top-down rice-flour kolam on red tiles), `xpFactor` (a line-up tile for one factor,
`g.hl(p)` gold ring), `xpLineup` (the police line-up wall), `xpTaxi`, `xpSocks` (`g.set(shoe, sock)`). Math kit:
`mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkBrace`, `mkAlgebraTile`, `mkWhiteboard`, `mkChip`, `mkSpeechBubble`,
`mkThoughtBubble`, `mkCalculator`, `mkThermometer`, `mkGrid`. Lib: `arrow`, `chip`, `tick`, `cross`, `spark`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `xpFlat`, morning (clock 10:00), slow push-in; Kavya bust at the table, sad, test paper in front of her; chips
  "Kavya, age 12", "Deepavali morning", "Blk 208"; lower third KAVYA, 12.
- test: insert close-up of `xpTest`: Q1 "Factorise 12x + 18", her answer `12(x + 18)` (blue) pops in.
- same: back to the table: Dad leans in behind her, smug; chip "Same thing." (lower third DAD).
- revise: the test close-up again: red **REVISE!** slaps on (underlined twice), then "Retest: Monday".
- guests: Mum sweeps in with a clipboard of jobs (lower third MUM); chips "50 guests", "4 p.m.", list "Kavya: goodie
  bags", "Ah Boy: don't touch the ladoos". The ladoo tray (18) on the table.
- ladoo: Ah Boy pops up (lower third AH BOY, 8), cheeks full, crumbs, happy; the tray now shows 17. Mum deadpan. Hold.
- tiny: documentary zoom into the x on the test paper (viewfinder corners, "ZOOM ×" readout).
- name (TH): Agent X's confessional (lower third AGENT X), shades on; a dossier card "AGENT X / VALUE: CLASSIFIED"
  with a CLASSIFIED bar.
- anyone: three value tags flick across his badge: `x = 5`, `x = −3` (brackets disguise on), then "?".
- blown: board: `12(x + 18)` → `= 12x + 216` (expanding arrows), next to `12x + 18` with "≠"; X lowers his shades;
  stamp COVER BLOWN.
- mission: back to the table: Agent X standing on the table by the test paper (`g.top`), arms in the full X pose;
  chips "Mission: Monday's retest", "Do not alert 50 guests".
- spy: Ah Boy points at him, shock; Kavya startled; X freezes mid-pose.
- bags: Mum, without looking up, hands Agent X a goodie bag. X holds it, deadpan. Hold.
- title: night-blue title card with diyas and a starburst; logo "ON GOOD / TERMS" with a big italic x; "Episode 9: The
  Open House"; the cast pops in: Mum, Kavya, Agent X (X pose), Dad, Ah Boy. Hold.

## 1 labels: Four jobs for one letter (Expressions, equations, formulae & identities)
Layout: `xpFlat`, clock 1:00. Dad on the left by the window with the lights (on a stool, a bust is fine: he stands
in front of the window, the table hides his hem), Ah Boy at the table with four `xpSweetBag`s and 3 loose sweets;
Kavya at the table; Agent X stands on the table (`g.top`). A white card on the right (x 600-1150, y 110-500) titled
"Four jobs for one letter" with four rows that fill in as the scene goes: FORMULA, EXPRESSION, EQUATION, IDENTITY
(each with its example). Showpiece: the four-row card complete, with X's badge changing for each job.
- one: chip "1 p.m."; Dad holds the lights (`g.lights.set(p)` at 0).
- window: a square drawn over the window with side `s` on each edge; `P = 4s` big.
- formula: card row 1: "FORMULA: `P = 4s`: real quantities linked by a rule"; labels "P: perimeter", "s: side". X wears
  an "s" on his badge.
- metres: `s = 1.2 m`; working `P = 4 × 1.2 = 4.8 m`; Dad hangs the lights (lights 0 → 1); chip "5 m of lights". Hold:
  Dad smug.
- sweets: four sweet bags each with a yellow "x" sticker, three loose sweets; `4x + 3` builds term by term under them.
- expr: card row 2: "EXPRESSION: `4x + 3`: no equals sign: x can be any number"; X happy-smug, badge "?".
- count: Ah Boy holds up a scrap: "23"; `4x + 3 = 23`.
- eq: card row 3: "EQUATION: `4x + 3 = 23`: true for ONE value"; check `4 × 5 + 3 = 23`; X's badge snaps to `x = 5`;
  X `sad`. Hold.
- more: three more sweets drop into every bag; `4(x + 3)` → `4x + 12` with handshake arrows.
- ident: card row 4: "IDENTITY: `4(x + 3) ≡ 4x + 12`: true for EVERY value"; quick checks `x = 1: 16 = 16`,
  `x = 2: 20 = 20`; chip "≡ means identically equal"; stamp IDENTITY CONFIRMED.
- dadid: Dad smug: `4(x + 2) = 4x + 2`?
- counter: X's badge `x = 0`: `4(0 + 2) = 8`, `4(0) + 2 = 2`, `8 ≠ 2`; chip "one counter-example is enough"; shades
  down; stamp COVER BLOWN. Dad deflates. Hold.
- anatomy: the card clears to `5x^2 - 3x + 7` big; braces under the three terms "term" × 3; the "−" glows with its term.
- coeff: arrows label "coefficient 5", "coefficient −3", "constant 7", and "power" on the small 2.
- invisible: Ah Boy, hand up: a lone `x` big with a "?".
- one1: a faint grey `1` fades in in front of the x: `1x = x`. X: "Like me." Shades down for a moment, then back up.
  Hold.

## 2 tiles: Square and Stick (Simplifying expressions, index laws)
Layout: `xpFlat`, clock 2:00. Priya arrives (lower third PRIYA) and lays rangoli tiles on the table (`mkAlgebraTile`,
unit about 40: x² blue, x green). Square and Stick stand on the table (`g.top`) as the living versions. Right card for
working. Showpiece: the 3x by 2x rectangle filling with six x² squares.
- two: chip "2 p.m."; Priya with a box marked RANGOLI TILES.
- priya: a big x² tile with sides labelled x and x; an x tile with sides x and 1.
- square: Square rises from the box (lower third SQUARE), tiara glinting; chip "x² = an area".
- stick: Stick leans on the box (lower third STICK); chip "x = a length".
- dad: Dad slides 3 squares, 2 sticks, removes 1 square: `3x^2 + 2x - x^2`; then writes `= 4x^3`? in red.
- ten: X's badge `x = 10`: working `300 + 20 − 100 = 220` vs `4 × 1000 = 4000`; `220 ≠ 4000`; stamp COVER BLOWN.
  Dad sad. Hold.
- like: chip "like terms: same letters, same powers"; Square shoves the sticks to one side; Square annoyed.
- collect: tiles regroup: squares `3x^2 - x^2 = 2x^2`, sticks `2x`; answer `2x^2 + 2x`; check `200 + 20 = 220 ✓`.
- times: first two sticks end to end: `x + x = 2x` (a length bar 2x long, "a length"); then a stick and a stick at right
  angles span a square: `x × x = x^2` ("an area"). Square smug.
- rect: a 3x by 2x rectangle; six x² tiles fill it one by one; `3x × 2x = 6x^2`; small `3 × 2 = 6`, `x × x = x^2`.
- laws: X: `x^4 × x^3 = x^7`, with `(x·x·x·x)(x·x·x)` written out and counted 1-7; chip "multiply: ADD the powers".
- wrong: Priya smug: `x^3 × x^4 = x^12`.
- add: Square annoyed: Priya's crossed out; `x^3 × x^4 = x^7`; and `(x^3)^4 = x^12` labelled "power of a power:
  multiply".
- divide: `y^6 ÷ y^2 = y^4` (two y's cancel top and bottom on a stacked fraction); `x^0 = 1` with
  `x^3 ÷ x^3 = 1`. A three-row index-law table builds: multiply → add, divide → subtract, power of a power → multiply.
- rangoli: Ah Boy proudly shows a rangoli made of ladoos; cut back: the rangoli is gone; crumbs; tray count drops.
  Hold.

## 3 sub: Brackets are a disguise (Substitution)
Layout: `xpFlat`, clock 2:30. Kavya and Ah Boy at the table with `mkCalculator`; Agent X on the table. Then
`xpRaviCall(..., night true)` big (about 640 × 420) on the right for Uncle Ravi: it is 1:30 a.m. in Miami (chip
"Miami: 1:30 a.m."), he is in pyjamas making kulfi in the dark. Showpiece: X putting on his bracket
disguise, and the two calculator flows side by side: `(−3)^2 = 9` vs `−3^2 = −9`.
- half: chip "2:30 p.m."; Kavya writes; Ah Boy holds the calculator.
- q: card: "Find `x^2` when `x = −3`".
- calc: calculator display "−3²" → "−9"; Ah Boy happy.
- brackets: X's badge `x = −3`; he puts on the giant brackets (`brackets` 0 → 1); without them, a "−" visibly drops off
  his badge (gag).
- nine: two rows: `(−3)^2 = (−3) × (−3) = 9` ✓ and `−3^2 = −(3 × 3) = −9` ✗ with "only the 3 is squared".
- bidmas: chip "bracket every value"; BIDMAS letters pop: Brackets, Indices, Division and Multiplication, Addition
  and Subtraction.
- five: Ah Boy: `x = 5`, `3x = 35`? (the 3 and 5 side by side).
- fifteen: `3x = 3 × x = 3 × 5 = 15`; the "35" crossed out.
- sq: `2x^2` at `x = 3`: `2 × 3^2 = 2 × 9 = 18` ✓; `(2 × 3)^2 = 36` ✗ "not this".
- ravi: video call pops up (lower third UNCLE RAVI): Ravi at 1:30 a.m., holding a kulfi mould; chip "kulfi freezes at
  −15 °C"; a fridge display reading "°F only".
- f: working: `F = 9/5 C + 32`, `= 9/5 × (−15) + 32`, `= −27 + 32`, `= 5`; answer "5 °F".
- warm: Ravi shock, fanning himself with the mould. Hold.
- frac: X's badge `x = 1/2`: `8x^2 = 8 × (1/2)^2 = 8 × 1/4 = 2`.
- ladoo: Ah Boy, mouth full: a ladoo held up next to X.
- anyone: X turns his badge: it shows a ladoo drawing. Deadpan. Hold.

## 4 hands: Everyone gets a handshake (Expanding single brackets)
Layout: `xpDoor`, 4 p.m. Mum and Ah Boy at the door (in `g.mid`); guest families arrive from the right as brackets
around their members (a big pair of `( )` around two cartoon guest "terms", e.g. x and 4). Handy stands at the door and
shakes hands. Then the living room (`xpFlat`) for Mr Tan's party game. Showpiece: Handy's handshake arrows from the
outside term to every term inside (an arrow per handshake, each one ringing a little bell when it lands).
- four: chip "4 p.m."; the first guests in brackets at the door.
- rule: Mum, brisk; chip "greet EVERYONE in the family".
- handy: Handy bounds in (lower third HANDY), gloves pumping, tag "3".
- boy: `3(x + 4)`: Ah Boy shakes x's hand only: `3x + 4` written in red; the 4 stands alone, sad.
- missed: Handy shock, then shakes the 4: arrows 3→x and 3→4; `3(x + 4) = 3x + 12`; the 4 cheers.
- area: a rectangle 4 by (x + 3) split into `4x` and `12`; `4(x + 3) = 4x + 12`; chip "our identity!".
- neg: Handy's tag "−2", body purple (`neg: 1`), grumpy: `−2(3x − 5)`; arrows `−2 × 3x = −6x`, `−2 × (−5) = +10`;
  answer `−6x + 10`; the signs visibly flip.
- dad: Dad smug: `−2(x − 4) = −2x − 8`?
- blown: X's badge `x = 0`: left `−2 × (−4) = 8`, right `−8`; COVER BLOWN; correct `−2x + 8`. Dad sad. Hold.
- tan: Mr Tan arrives (lower third MR TAN) with a box of sweets; Handy's tag becomes "x": `x(x + 3) = x^2 + 3x` (an
  x by x + 3 rectangle: `x^2` and `3x`).
- game: cut to `xpFlat` with a whiteboard (`mkWhiteboard`) on the right: `3(2x + 1) − 2(x − 4)`.
- answer: `mkWorking`: `= 6x + 3 − 2x + 8`, `= 4x + 11`; the `+8` circled with "−2 × −4 = +8".
- pun: Mr Tan happy; everyone deadpan; "*cricket*" chip; in the pause Handy shakes Mr Tan's hand anyway, very
  enthusiastically. Hold.

## 5 heist: The Great Factor Heist (Factorising) — THE SET PIECE
Layout: first `xpFlat`, clock 5:00: twelve `xpMurukku` packets and the ladoo tray on the table, a row of empty
`xpGoodieBag`s; Mum, Kavya, Priya, Ah Boy behind the table. Then the heist: the lights dim, spy music feel, the
right half becomes `xpLineup` ("THE LINE-UP", x 560-1150, y 110-520) with the factors as `xpFactor` tiles; Agent X in
full X pose. Showpiece (the most memorable moment of the episode): every factor of each term steps into the line-up;
the factors that EVERY term has get a gold ring, are "lifted" out of both rows together and walk OUT to the left of a
big bracket to form `3xy`; what is left in each row slides INTO the bracket as `2x` and `3y`. Then the reverse
("put it all back"): `3xy` shakes hands with `2x` and `3y` (Handy's arrows) and the original terms reappear.
IDENTITY CONFIRMED.
- five: chip "5 p.m."; goodie bags in a row, empty.
- bags: Mum's job card: "12 packets of murukku", "18 ladoos", "identical bags, as many as possible".
- x: a packet with a "?" sticker → `x` pieces; `12x + 18` written big under the table spread.
- two: Priya splits everything into 2 bags: `2(6x + 9)`; each bag shows 6 packets + 9 ladoos.
- three: Ah Boy: 3 bags: `3(4x + 6)`.
- fully: X: both expand to `12x + 18` ✓ (small ticks); but `6x + 9 = 3(2x + 3)` (still splits), chip "not fully
  factorised".
- hcf: the factor lists `12: 1, 2, 3, 4, 6, 12` and `18: 1, 2, 3, 6, 9, 18` with 6 ringed: "HCF = 6"; six bags fill,
  each with 2 packets and 3 ladoos (`xpGoodieBag.set(1)`).
- six: `12x + 18 = 6(2x + 3)`; check arrows `6 × 2x = 12x`, `6 × 3 = 18`; stamp IDENTITY CONFIRMED.
- hard: Mr Tan with the retest preview card: `6x^2y + 9xy^2`; Kavya `shock`.
- heist: lights dim (dark overlay on the flat), X's shades glint; title chip "THE GREAT FACTOR HEIST"; chip "take out
  everything EVERY term has".
- lineup: `xpLineup`: row 1 label `6x^2y`: tiles `2`, `3`, `x`, `x`, `y`; row 2 label `9xy^2`: tiles `3`, `3`, `x`,
  `y`, `y`. Multiplication signs between tiles small.
- num: the 3 in each row rings gold.
- lowx: one x in each row rings gold; the second x in row 1 gets a grey "only one in row 2" note; chip "lowest power".
- lowy: one y in each row rings gold; chip "HCF = 3xy".
- left: the ringed tiles lift out of BOTH rows and march left, merging into one `3xy` outside a big bracket; the
  leftovers (row 1: `2`, `x` → `2x`; row 2: `3`, `y` → `3y`) slide into the bracket: `3xy(2x + 3y)`.
- answer: the full line `6x^2y + 9xy^2 = 3xy(2x + 3y)` big, gold underline; Kavya `happy`.
- check: "put it all back": arrows `3xy × 2x = 6x^2y`, `3xy × 3y = 9xy^2`; stamp IDENTITY CONFIRMED; lights back up.
- gap: Ah Boy: `5x + 5 = 5(x)` with an empty space in the bracket.
- one: `5 ÷ 5 = 1` drops a `1` into the gap: `5(x + 1)`; check `5x + 5` ✓; chip "never leave anyone behind".
- like: Kavya hugs the test paper; Priya smug-proud. Hold.
- confess: Ah Boy, crumbs; the tray shows 17. Mum `annoyed`, everyone turns to him.
- prime: `12x + 17`: chip "HCF of 12 and 17 = 1"; all six goodie bags collapse into ONE giant bag labelled "AH BOY".
  Hold.

## 6 words: Think of a number (Writing expressions & formulae)
Layout: `xpFlat`, clock 6:00, party in full swing (two or three background guest silhouettes). Ah Boy stands on a
chair behind the table as a magician (a paper hat, a tea towel cape); Mr Tan and Dad are the audience; Priya; Kavya.
The trick is modelled with cups and coins on the table (as in lib/extras: a cup = n). Then the taxi stand: a corner
inset with `xpTaxi` and a fare meter. Showpiece: the cups-and-coins trick, the cup vanishing to leave exactly 5 coins.
- six: chip "6 p.m."; Ah Boy in his cape; lower third not needed (already seen).
- trick: four steps pop as numbered chips: "double it", "add 10", "cut it in half", "take away your number".
- five: big "5!" with sparkles; Mr Tan and Dad shock.
- how: Mr Tan deadpan "Five. Remarkable." Hold.
- n: cups and coins: 1 cup (n) → 2 cups (`2n`) → + 10 coins (`2n + 10`) → halve: 1 cup + 5 coins (`n + 5`) → take away
  the cup: 5 coins (`5`); the algebra line builds under each step.
- ident: `(2n + 10)/2 - n = 5` big; chip "every n"; stamp IDENTITY CONFIRMED.
- less: Priya: "n less than 10" → `n − 10`?
- order: a number line from 0 to 10: start at 10, step back n: `10 − n` ✓; "10 less than n": `n − 10` ✓; Priya's crossed
  out.
- dad: Dad smug: "add 3, then double" → `2n + 3`?
- blown: X's badge `n = 4`: `4 + 3 = 7`, `7 × 2 = 14`; `2 × 4 + 3 = 11`; `14 ≠ 11`; COVER BLOWN; correct `2(n + 3)` with
  "brackets keep the order". Dad sad.
- money: Priya: a bar for `p` split into quarters: one quarter "gift", then `$3` "bubble tea"; `p − 1/4 p − 3 =
  3/4 p − 3`.
- taxi: corner inset: `xpTaxi`, a fare card "$4 flag-down + $0.70 per km"; working `4 + 0.7 × 5 = $7.50`; Mum.
- formula: `4 + 0.7 × 12 = $12.40`; the changing number (5, 12) highlighted; then `C = 4 + 0.7d` with "C: cost in $",
  "d: distance in km".
- subject: a gold ring round the C: chip "subject: the letter on its own"; chip "numbers first, then letters". Hold.

## 7 night: Socks and shoes (Changing the subject; double brackets, stretch)
Layout: `xpFlat` at night (clock 9:00, a dark overlay on the window, the fairy lights glowing), the party over,
paper plates. `xpRaviCall(...)` (day) big for Uncle Ravi: it is 8 a.m. in Miami (chip "Miami: 8 a.m."). Phil the function machine
stands on the right; his two windows show `× 9/5` and `+ 32`. Ah Boy is in socks and trainers (`xpSocks`). Then the
kolam: cut to a top-down view of `xpKolam` with the area model drawn on it. Showpiece: Phil's lever thrown to REVERSE,
the numbers running back through the windows (`− 32`, then `× 5/9`), and Ah Boy pulling at a sock with his shoe still
on.
- nine: chip "9 p.m."; the empty flat; Uncle Ravi's call rings.
- ravi: call window; Ravi in sunshine: "77 °F" on a thermometer (`mkThermometer`, °F).
- phil: Phil appears (lower third PHIL); input C → `× 9/5` → `+ 32` → F, with a number running through: 25 → 45 → 77.
- back: lever to REVERSE (`rev: 1`); 77 goes in at the chute: `77 − 32 = 45`, `45 × 5/9 = 25`; answer "25 °C".
- socks: Ah Boy: two-step diagram: on: socks then shoes; off: shoes then socks.
- shoes: Ah Boy tugging at a sock with the shoe still on (`xpSocks.set(1, 1)`, comic stretch). Hold.
- letters: title chip "Changing the subject"; `mkWorking`: `F = 9/5 C + 32`, `F − 32 = 9/5 C` (note "− 32 both sides"), `5/9 (F − 32) = C` (note "× 5/9
  both sides").
- subj: ring round C: "C is now the subject: on its own"; X deadpan "Lucky C".
- dad: Dad: `y = 3x + 6` → `x = y/3 - 6`?
- blown: X's badge `x = 2`: `y = 3 × 2 + 6 = 12`; Dad's formula `12/3 − 6 = −2`; `−2 ≠ 2`; COVER BLOWN.
- order: Phil reverse: `y − 6 = 3x`, then `x = (y - 6)/3`; check `(12 − 6)/3 = 2` ✓.
- kolam: top-down `xpKolam`, a rectangle `x + 3` wide and `x + 2` tall chalked on it; Mum with a bowl of rice flour.
- double: Handy with a twin (a second Handy, or Handy pointing both gloves); four handshake arrows across a 2 × 2 grid.
- grid: the grid (`mkTable`): `x^2`, `2x`, `3x`, `6` in the four cells of the kolam; `x^2 + 2x + 3x + 6 = x^2 + 5x + 6`;
  chip "4 products".
- dadsq: Dad: `(x + 4)^2 = x^2 + 16`?
- sq: square kolam `(x + 4)(x + 4)`: four cells `x^2`, `4x`, `4x`, `16`; the two `4x` cells flash; `x^2 + 8x + 16`;
  COVER BLOWN. Dad sad; the fairy lights twinkle. Hold.

## 8 traps: The open house saves you some marks
- intro: "6 EXAM TRAPS" over the flat ("six ways to save marks").
- t1 (TH, Dad): card "`2a + 3b` ≠ `5ab`: unlike terms don't combine"; Dad sheepish, "Not the same thing."
- t2 (TH, Handy): card "`3(x + 4) = 3x + 12`" with both handshake arrows (`3x + 4` crossed).
- t3 (TH, Mum): card "`−3(x − 2) = −3x + 6`" (`−3x − 6` crossed).
- t4 (TH, Ah Boy): card "x = −5: `x^2 = (−5)^2 = 25`" (−25 crossed); Ah Boy hands back the calculator.
- t5 (TH, Square): card "`2x^2` at x = 3: `2 × 9 = 18`" (36 crossed).
- t6 (TH, Kavya): card "`5x + 5 = 5(x + 1)`" (`5(x)` crossed) and "take out the HIGHEST common factor".
- return: logo "ON GOOD TERMS will return".
- ten: chip "Monday"; a classroom corner (whiteboard, desks) or the flat's table with Mr Tan; he hands back the retest:
  "10/10" circled in red, "Factorising ✓"; Kavya happy (she is on screen for the whole beat).
- trick: Ah Boy faces Agent X (on the table): the four magic steps as chips.
- five: Ah Boy: "5!"; X's badge shows "5"?!
- how: Agent X lowers his shades, shock; stamp COVER BLOWN on him; the final frame holds on X's shocked face and Ah Boy
  taking a bow (crumbs).

## Suggested split for the animators
Durations from `timeline.json` (total 718.7 s = 11.98 min; cold 64.6 s).
- Writer: cold (done).
- A: labels, tiles, sub (84.3 + 82.0 + 74.4 = 240.7 s).
- B: hands, heist (75.1 + 118.4 = 193.5 s; heist is the set piece, so this group is shorter).
- C: words, night, traps (65.7 + 90.1 + 64.1 = 219.9 s).
