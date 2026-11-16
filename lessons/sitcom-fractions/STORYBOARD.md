# PIECE OF CAKE, Ep 4 "Ah Boy Turns Eight": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Fractions.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** It is Ah Boy's eighth birthday. The party is at 4 p.m. at the void deck under Kavya's block
(Block 208), and Dad has volunteered to bake the cake: "Piece of cake." Ah Boy wants the biggest piece, which he
is sure is an eighth, because eight is the biggest number. Living on the line of Mum's measuring jug is **Vinny**,
the fraction bar himself: a bouncer who works the door between the numerator (upstairs) and the denominator
(downstairs), insists on same-size pieces and stamps NOT ON MY BAR! on every illegal move. Over one day Priya races
Kavya at balloons and goodie bags (simplest form, common denominators), **Mira** the car-park mirror at zero
flips Priya's negative hopscotch line, Dad adds the bottoms of his sugar and meets **Topsy**, an improper fraction
too top-heavy to stand, the cake (**Victoria**, a dramatic Victoria sponge) is iced as an area model, **Flip** the
reciprocal does gymnastics over three pizzas and a jug of lime juice, Ah Boy forgets how much birthday money
Grandma gave him (bar model), Mr Tan from the 8th floor runs a pass-the-parcel where every layer is a calculation,
and the last layer releases **Mister X**, the unknown, who cancels himself out. Stinger: Ah Boy finally asks for
"one-oneth" of the cake, and gets it. Vinny cries.

Guide sections (lib/topics/fractions/guide.ts) by scene: equivalence-ordering → `balloons`; adding-subtracting →
`cake`; multiplying → `icing`; dividing → `pizza`; fractions-of-amounts → `money` (+ "of the remainder");
calculating-with-fractions → `parcel`; algebraic-fractions (stretch) → `mystery`. Exam mistakes → `traps`.
Misconceptions on screen: add tops and bottoms (cake.sugar), multiplying always makes bigger (icing.bigger),
dividing always makes smaller (pizza.smaller), −¾ > −⅔ (balloons.neg), flip both (pizza.both), mixed × mixed by
parts (icing.mat). Mnemonics: Keep, Change, Flip (pizza.kcf); MAD (cake.mad); Mirror at zero (Mira); 'Of' means ×
(icing.smaller). Extras: *frangere*, "to break" (parcel.pun).

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'vinny'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, vinny, vic, topsy, mira, flip, ex. Narrator never drawn.
- **Humans are the heart.** They speak about two thirds of the lines and are on screen in every scene. The
  cartoon cast are guests at the party. Busts stand BEHIND the party table (`fcVoid`: characters in `g.mid`, table
  top at y 560: a bust at y about 460 hides its shirt hem) or behind the kitchen counter (`fcKitchen`, y about 452).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Vinny is `deadpan`, `annoyed` at every illegal move, and throws up his STOP palm (`stop: 1`) on "Not on my bar!".
  Victoria is `smug`, `shock` at any talk of knives, `swoon` when flattered. Topsy is `happy` and wobbling, `shock`
  as he tips. Mira is `smug` and vain (glint `shine` when she admires herself). Flip is `happy`, arms up
  (`arms: 1`) after every answer, and spins (rotate 360) on "Flip!". Mister X is `smug`, unbothered.
  Dad is `smug` before every mistake and `sad` after. Ah Boy is `happy` even when wrong. Priya is `smug`,
  `annoyed` when she loses. Mr Tan is `happy` at his own puns; everyone else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information.
- **Running gags:**
  1. **NOT ON MY BAR!** `fcStamp(parent, false)` (red) thumps down whenever Vinny says it, on every illegal move:
     cold.rules, cake.bar, icing.nobar, parcel.nobar; also a small one on balloons.neg and pizza.both.
     `fcStamp(parent, true)` "SIMPLEST FORM" (green) on balloons.hcf, cake.mixed, icing.first and traps.tear.
     Scale it about 0.5.
  2. **"Piece of cake."** Dad says it before every mistake (cold.dad, cake.sugar, icing.mat, parcel.left); each
     time a chip counts up "famous last words #1, #2, #3, #4" and everyone turns to camera.
  3. **Ah Boy wants the biggest piece.** He thinks the bigger the bottom, the bigger the piece (cold.boy), wins an
     eighth of pizza (pizza.eighth, he is delighted), and in the stinger asks for one-oneth.
  4. **Topsy topples.** Whenever he is improper he tips over (rotate about his feet); as a mixed number he sits on
     his golden "1" (`whole: 1`) and is steady.
  5. **Mr Tan's puns** land to silence: Ah Boy's party blower (`fcHorn`) unrolls and slowly droops back
     (`set(1)` then down to 0.2), deadpan faces.
  6. **Ah Boy's party hat** (`hat: '#4CC9F0'`) is on all day; everyone else gets one from 4 p.m.
- **Talking heads** (TH below) use `fcConf(root, who)` full stage, the character big (s ≈ 1.1-1.4) at about
  (300, 420), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `fcLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for every expression (stacked fractions: `42/56`, `2 15/12`, `2x/3 * 9/(4x)`), `mkWorking` for
  aligned multi-step working, `mkBarModel` for bar models, `mkNumberLine` for number lines and hops,
  `mkFractionBar` / `fcSlab` / `fcPizza` for parts of a whole. Never type "3/4" as plain text: always mkMath.
  The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. At most ~1,000 elements per scene: build each human once per scene and move or hide it with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, hat, ... })`)

| kind | who | look | lower third (`fcLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Big sister. Half right. |
| mum | Mum: party manager, brisk | magenta kurta, bun, bindi; pass `prop: 'paper'` (the party list) | MUM / Party manager. |
| dad | Dad: confident, wrong, lovable | glasses, moustache; default prop spatula; in the kitchen an apron (`style: 'apron', under: 'tee', apron: '#FFFFFF', apronText: 'CHEF'`) | DAD / "Piece of cake." |
| boy | Ah Boy, 8: the birthday boy | orange star tee, blue party hat (`hat: '#4CC9F0'`), `lift: 1` raises his hand | AH BOY, 8 / Birthday boy. Wants the biggest piece. |
| priya | Priya, 12: competitive, quick, confidently wrong | purple Saturday tee, bob, yellow clip | PRIYA / Best friend. Competitive. |
| tan | Mr Tan: dry, kind, puns; lives on the 8th floor | shirt and tie, glasses | MR TAN / Maths teacher. 8th floor. Party games. |
| vinny | Vinny, the FRACTION BAR: bouncer, deadpan, secretly soft | long charcoal bar, flat-top, collar and tie, earpiece wire, SECURITY pin, crossed arms; `stop` palm, `tear` | VINNY / The fraction bar. Works the door. |
| vic | Victoria, a Victoria sponge: posh, dramatic, fears knives | rectangular two-layer sponge, jam and cream, icing drips, a strawberry, pearls; `swoon` | VICTORIA / Sponge cake. Equal pieces only. |
| topsy | Topsy, an IMPROPER FRACTION: cheerful, top-heavy, always falling over | huge orange numerator head "19", thin bar waist, tiny blue denominator "15", tiny feet; `whole` shows his golden "1"; `g.nums(a, b)` | TOPSY / Improper fraction. Top-heavy. |
| mira | Mira, the MIRROR AT ZERO: vain diva | orange-rimmed convex car-park mirror, lashes, striped pole with a "0" plate; `shine` | MIRA / The mirror at zero. Vain. |
| flip | Flip, the RECIPROCAL: hyper gymnast | red-and-yellow leotard, "⇅" badge, headband; `arms` V; rotate him to flip | FLIP / The reciprocal. Gymnast. |
| ex | Mister X, THE UNKNOWN: smooth, mysterious | fat purple italic x, fedora, domino mask, grey cape; `guard` shows his "+ 5" bodyguard tile | MISTER X / The unknown. Any number but 0. |

## Sets and props (lib.js)

Sets: `fcVoid` (the void deck set for the party: letterboxes, pillars, bunting, the banner "HAPPY 8TH BIRTHDAY,
AH BOY!", balloons, a stone chess table; layers `g.mid` / `g.front` (pink party table, top at `g.tableY` 560) /
`g.top`; `{ table: false }` for the hopscotch floor), `fcKitchen` (the HDB kitchen: window with the next block,
cabinets, `g.clock(h, m)`, `g.oven(p)` glow; layers `g.mid` / `g.front` (counter at `g.counterY` 548) / `g.top`),
`fcConf` (talking heads).
Props: `fcMeasuringJug` (¼ ½ ¾ 1 marks), `fcSlab` (top view of the tray cake: `choc(k)` columns, `spr(k)` rows,
`grid(p)`, `hl(p)`), `fcPizza` (`set(k)` slices, `lift(i, p)`), `fcBalloon`, `fcGoodieBag`, `fcJug` (lime),
`fcCup`, `fcHorn` (party blower), `fcParcel` (`set(k)` layers), `fcStamp`. Math kit: `mkMath`, `mkText`,
`mkWorking`, `mkBarModel`, `mkBrace`, `mkNumberLine`, `mkFractionBar`, `mkPie`, `mkNote`, `mkCoin`, `mkChip`,
`mkSpeechBubble`, `mkThoughtBubble`, `mkWhiteboard`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`, done)
- kavya: `fcKitchen`, clock at 9:00; Kavya behind the counter (left), the measuring jug on the counter; chips
  "Kavya, age 12", "Saturday, 9 a.m.", "party at 4 p.m."; lower third KAVYA, 12.
- mum: Mum slides in holding a paper; PARTY LIST card: "20 kids / void deck / 4 p.m."; lower third MUM. Kavya shock.
- dad: Dad rises behind the counter in a CHEF apron, spatula up, smug; lower third DAD; chip "famous last words #1".
- boy: Ah Boy pops up in his party hat, hand up; bubble "I want 1/8!"; lower third AH BOY, 8.
- quarter: card with two cakes (mkPie) cut in 4 and in 8, one piece pink in each, labelled ¼ and ⅛, with ">".
- maths: Ah Boy smug; chip "8 > 4, so 1/8 > 1/4?"; Kavya deadpan.
- tiny: documentary zoom (viewfinder corners, "ZOOM ×" readout, "Mum's measuring jug") into the jug's marks
  1, ¾, ½, ¼, then into the fraction bar of the big ¾.
- hi (TH): Vinny's confessional; lower third VINNY; door sign "THE FRACTION BAR / TOPS: upstairs ↑ / (bar) /
  BOTTOMS: downstairs ↓ / members only. same-size pieces."
- num: board: big stacked ¾; "numerator: pieces you've got" (blue); "denominator: equal pieces in one whole"
  (red); a fraction bar of 4 equal quarters filling 3.
- size: board: "same whole, cut more ways": a bar of 4 (¼ pink) above a bar of 8 (⅛ pink), boxes round the two
  pink parts; `1/8 < 1/4`.
- oneth: kitchen; Vinny has hopped onto the counter; Ah Boy, bubble "I want 1/1!".
- whole: card: a whole pink cake, "1/1 = 1 whole cake"; Kavya deadpan. Hold.
- rules: Vinny annoyed, STOP palm; chips "same-size pieces", "nobody adds the bottoms"; NOT ON MY BAR! stamp.
- title: purple title card with rays and confetti; the logo is a fraction: "PIECE OF" over a gold bar over
  "CAKE"; "Episode 4: Ah Boy Turns Eight"; Mum, Kavya, Vinny, Ah Boy, Dad pop in. Hold.

## 1 balloons: Balloons and hopscotch (Equivalent fractions, comparing & ordering)
Layout: `fcVoid` with the table, 10 a.m.; Priya (lower third PRIYA) and Kavya behind the table, Ah Boy at the end;
Vinny stands on the table (`g.top`, s ≈ 0.55). A white board on the right half (x 640-1150, y 200-540) holds
the working. Shot B (11 a.m.): `fcVoid({ table: false })`, a chalk number line on the floor (`mkNumberLine` from
−1 to 1 in tenths, chalk-white on grey, drawn in perspective or flat along y ≈ 600), Mira on her pole at 0.
Showpiece: Mira's mirror: the positive half of the line reflects into the negative half and the order flips.
- ten: chip "10 a.m."; a heap of balloons on the table; Priya blowing up a balloon, smug.
- priya: Priya (lower third), a tally of balloons: 42 inflated out of 56 (a 7 × 8 grid of balloon icons,
  42 coloured); `42/56` big.
- crowd: Vinny on the table, annoyed; `42/56` with the numerator bouncing (too crowded); chip "÷ top **and**
  bottom by the **HCF**".
- hcf: Kavya; working `42 = 2 × 3 × 7`, `56 = 2 × 2 × 2 × 7`, "HCF = 14" (2 and 7 circled in both), then
  `42/56 = (42 ÷ 14)/(56 ÷ 14) = 3/4`; green SIMPLEST FORM stamp (small).
- equiv: Vinny; `3/4 = 6/8 = 42/56` with "× 2" and "× 14" arrows above and below; three fraction bars of equal
  length (4, 8 and 56 parts) shaded to the same point; chip "× or ÷ top and bottom by the **same** number".
- seven: Priya: `49/56 = 7/8` (÷ 7); a row of 8 balloons, 7 inflated.
- eight: Kavya: goodie bags `8/9` (9 bags, 8 full, `fcGoodieBag`); both bars: 7 of 8 and 8 of 9 shaded, each
  with one empty piece; chip "both **one piece short**".
- gap: the two empty pieces highlighted: the ninth is smaller than the eighth; arrow "smaller gap ⇒ closer to 1".
- lcm: Vinny: `7/8 = 63/72`, `8/9 = 64/72` (mkWorking), `63 < 64`, so `8/9 > 7/8`; chip "common denominator =
  LCM(8, 9) = 72".
- recount: Priya annoyed, arms folded; Kavya smug. Hold.
- hop: cut to the floor: chip "11 a.m."; the chalk number line −1 … 0 … 1, Priya with chalk.
- neg: Ah Boy standing on −¾; chip "−3/4 > −2/3?" (because 3/4 > 2/3); small NOT ON MY BAR stamp from Vinny.
- mira: Mira (lower third MIRA) on her pole at 0, glint across the glass; the right half of the line
  appears mirrored in her glass.
- flips: `3/4 > 2/3` on the right; dashed reflection arcs carry ¾ and ⅔ across zero to −¾ and −⅔, now in the
  opposite order; `−3/4 < −2/3`; arrow "← smaller".
- five: Priya's five cards: −½, ¼, −⅗, 0, −⅖ (each `mkMath` on a card).
- tenths: working ("Use tenths"): `−1/2 = −5/10`, `−3/5 = −6/10`, `−2/5 = −4/10`; the cards jump onto the line in order:
  `−3/5 < −1/2 < −2/5 < 0 < 1/4`.
- mirror: Ah Boy faces Mira, hands clasped, dramatic.
- darling: Mira smug, glint; −⅗ glows on the line; chip "every negative < every positive".
- geq: Priya: `−1/2 >= −2/5 ?` with a key "≥ greater than **or equal to**".
- false: Kavya: −½ is left of −⅖ on the line; `−1/2 < −2/5`; big red "FALSE". Hold.

## 2 cake: Dad bakes a cake (Adding & subtracting, mixed numbers)
Layout: `fcKitchen`, clock at 12:00; Dad (apron, spatula) centre behind the counter, Kavya left, Ah Boy right;
measuring jug, a sugar bag and a flour bag on the counter; Vinny on the counter (s ≈ 0.55). Recipe card / working
on a whiteboard stuck to the cabinets (x 620-1150, y 120-460). Topsy appears on the counter. Showpiece: Topsy
toppling over and sitting up on his golden 1.
- noon: chip "12 p.m."; Dad reading a recipe book upside down; oven glow off.
- sugar: Dad smug; `2/3 + 3/5 = (2 + 3)/(3 + 5) = 5/8` written in red; chip "famous last words #2".
- bar: Vinny STOP palm; NOT ON MY BAR! stamp over Dad's working. Hold.
- less: Kavya: two fraction bars: ⅔ and ⅝: the ⅝ bar is shorter: "`5/8 < 2/3`".
- size: Vinny: thirds bar and fifths bar (pieces of different sizes) → both re-cut into fifteenths;
  chip "LCM(3, 5) = 15".
- add: Kavya: `2/3 = 10/15`, `3/5 = 9/15`, `10/15 + 9/15 = 19/15` (mkWorking); "add the tops, keep the bottom".
- topsy: Topsy (lower third TOPSY) pops out of the measuring jug as 19 over 15, wobbles, and tips over (rotate
  0 → 70°). Hold on his feet in the air.
- mixed: Kavya: `19 ÷ 15 = 1 r 4`, `19/15 = 1 4/15`; Topsy's numbers change to 4 / 15 (`nums`); green
  SIMPLEST FORM stamp (small).
- seat: Topsy's golden "1" appears (`whole: 1`) and he sits on it, steady, happy. Hold.
- back: Ah Boy: `2 3/5 → ?`
- mad: big letters M, A, D: "**M**ultiply `2 × 5 = 10`", "**A**dd `10 + 3 = 13`", "**D**enominator stays";
  `2 3/5 = 13/5`. Topsy wobbles nervously again.
- flour: Dad (flour on his face): `3 1/4 − 1 2/3`; Dad's working in red: wholes `3 − 1 = 2`, fractions
  `2/3 − 1/4 = 5/12`, `= 2 5/12`.
- est: Kavya: `3 1/4 ≈ 3`, `1 2/3 ≈ 2`; answer between 1 and 2; Dad's 2 5/12 gets a red cross.
- borrow: Vinny: "¼ < ⅔" highlighted; chip "**borrow a whole**: 1 = 12/12".
- twelfths: mkWorking: `3 1/4 = 3 3/12 = 2 15/12`, `2 15/12 − 1 8/12 = 1 7/12`.
- count: Ah Boy: `mkNumberLine` from 1 to 4 with hops 1⅔ → 2 (`1/3`), 2 → 3 (`1`), 3 → 3¼ (`1/4`);
  `1/3 + 1 + 1/4 = 1 7/12` (`4/12 + 3/12 = 7/12`).
- oven: oven glows (`g.oven(1)`), Dad sad; the sugar line "5/8 cup" circled in red. Hold.

## 3 icing: Victoria gets iced (Multiplying)
Layout: `fcVoid`, 2 p.m.; Mum, Ah Boy, Kavya, Priya, Dad behind the party table; Victoria on a cake board on the
table (left), the top view of her (`fcSlab`, cols 4, rows 3, about 480 × 300) big on the right. Vinny on the table.
Showpiece: the area model: chocolate sweeps across 3 of 4 columns, sprinkles down 2 of 3 rows, the overlap of 6
glows inside the 12.
- two: chip "2 p.m."; Victoria on the table, smug.
- vic: Victoria (lower third VICTORIA), eyes on the knife in Dad's hand: shock. Hold.
- icing: `fcSlab.choc(3)` sweeps in with a brace "¾ of the width"; `spr(2)` with a brace "⅔ of the length".
- both: Ah Boy points at the overlap (`hl`).
- grid: `grid(1)`: "4 columns × 3 rows = 12 pieces"; the 6 overlap pieces numbered 1-6.
- times: `3/4 × 2/3 = (3 × 2)/(4 × 3) = 6/12 = 1/2`.
- seen: Victoria swoons (`swoon: 1`), happy. Hold.
- bigger: Ah Boy: 20 sweets in a row; chip "× makes bigger?".
- smaller: Mum: "'of' means ×": `20 × 3/4 = 15`; 15 of the 20 sweets lift out; chip "× a proper fraction ⇒
  smaller".
- refund: Ah Boy holding up a receipt "REFUND: MATHS". Hold.
- speed: Priya: `5/6 × 9/10`.
- first: Vinny: diagonal cancel lines: 5 and 10 → 1 and 2, 9 and 6 → 3 and 2; `(1 × 3)/(2 × 2) = 3/4`;
  green SIMPLEST FORM stamp. (Small note: "without cancelling: 45/60 = 3/4".)
- mat: Dad, smug: picnic mat rectangle `2 1/2` m by `3 1/3` m; Dad's working `2 × 3 = 6`, `1/2 × 1/3 = 1/6`,
  `6 1/6` m²; chip "famous last words #3".
- nobar: NOT ON MY BAR! stamp; the mat's area model shows the 6 whole squares, Dad's tiny ⅙ corner, and the two
  missing strips shaded (`2 × 1/3 = 2/3` and `3 × 1/2 = 3/2`).
- improper: Kavya: `2 1/2 × 3 1/3 = 5/2 × 10/3 = 50/6 = 8 1/3` m²; check: `6 + 2/3 + 3/2 + 1/6 = 8 1/3`.
- tables: Mum: three party tables of `2 3/4` m; `3 × 2 3/4 = 3 × 2 + 3 × 3/4 = 6 + 2 1/4 = 8 1/4` m. Hold.

## 4 pizza: Flip and the pizzas (Dividing & reciprocals)
Layout: `fcVoid`, 3 p.m.; three pizzas (`fcPizza`, n 4) on the table; Mum with a pizza cutter, Ah Boy, Kavya,
Priya. Flip bounces on the table (s ≈ 0.6) and does a full flip (rotate 360) whenever he flips a fraction.
Showpiece: each fraction card physically somersaults into its reciprocal.
- three: chip "3 p.m."; three pizzas cut into quarters.
- smaller: Ah Boy: `3 ÷ 1/4`; chip "÷ makes smaller?".
- fit: Kavya: the quarters lift out and are counted 1-12; "how many ¼ fit into 3?"; `3 ÷ 1/4 = 12`.
- witch: Ah Boy shock, hands on head. Hold.
- flip: Flip (lower third FLIP) springs onto the table and does a flip.
- recip: cards flip over one by one: `2/5 → 5/2` (`2/5 × 5/2 = 1`), `7 → 1/7`, `1 3/4 = 7/4 → 4/7`;
  a 0 card tries to flip and just lies there: "0: no reciprocal".
- kcf: three words pop: KEEP, CHANGE, FLIP; `a/b ÷ c/d = a/b × d/c`.
- both: Priya: `2/3 ÷ 4/5`, both cards flipping; small NOT ON MY BAR stamp.
- second: Flip: the first card is pushed back upright; only `4/5` flips; `2/3 × 5/4 = 10/12 = 5/6`.
- jug: Mum lifts the lime jug (`fcJug`) "`2 1/4` litres" and a cup (`fcCup`) "`3/8` litre".
- improper: Kavya: `2 1/4 ÷ 3/8 = 9/4 ÷ 3/8 = 9/4 × 8/3`.
- six: Flip: cancel lines (9 with 3 → 3 and 1, 8 with 4 → 2 and 1); `= 6` cups; six cups fill in a row; Flip arms up.
- last: Mum: the last ¾ pizza cut into 6 equal pieces; `3/4 ÷ 6 = 3/4 × 1/6 = 3/24 = 1/8` each.
- eighth: Ah Boy takes his slice, overjoyed; Kavya deadpan to camera. Hold.

## 5 money: Grandma's birthday money (Fractions of amounts)
Layout: `fcVoid`, 4 p.m., the party has started (paper cups, goodie bags, kids' silhouettes at the back);
everyone in party hats; working board on the right. Mr Tan arrives (lower third MR TAN) with a parcel under his
arm. Showpiece: the bar model of Ah Boy's birthday money: 8 boxes, 3 for the robot, 5 holding $15.
- four: chip "4 p.m."; a bowl "240 sweets".
- choc: Mum: `3/5` of 240.
- divmul: Kavya: a bar of 5 equal boxes, each `240 ÷ 5 = 48`, 3 boxes shaded brown: `48 × 3 = 144`.
- robot: Ah Boy holding a small toy robot; chip "spent `3/8`, `$15` left".
- bars: `mkBarModel`: 8 boxes; 3 labelled "robot", 5 braced "`$15`".
- onebox: `15 ÷ 5 = 3`: "$3" in every box; total brace `8 × 3 = $24`.
- step: Vinny: `15 ÷ 5/8 = 15 × 8/5 = 24` (whole = part ÷ fraction).
- cost: Ah Boy: the 3 robot boxes `3 × $3 = $9`; he hides the robot behind his back. Hold.
- tan: Mr Tan (lower third), clipboard "PARTY GAMES 45 min"; a clock face.
- halves: Ah Boy: `45/2` in red, with a "?!".
- units: Kavya: `2 h = 120 min`; `45/120 = 3/8` (÷ 15); a clock face with 3/8 of 2 hours shaded.
- more: Mum: two rows of kid icons, 18 and 12; `18/12 = 3/2 = 1 1/2`; chip "a fraction can be > 1".
- noise: Dad with his fingers in his ears. Hold.
- rem: Priya: her wallet; chip "`1/3` present, `1/4` of the **remainder** on bubble tea, `$18` left".
- rem2: bar of 6 boxes: present 2, then the remaining 4 split in quarters: tea 1; `1/4 × 2/3 = 1/6`;
  `1/3 + 1/6 = 1/2`.
- rem3: the 3 left boxes braced "`$18`", one box $6, `6 × $6 = $36`.
- present: Ah Boy: the 2 present boxes `= $12`.
- thought: Priya smug, then avoids his eyes. Hold.

## 6 parcel: Pass the parcel (Calculating with fractions)
Layout: `fcVoid` without the table, kids in a ring; the parcel (`fcParcel`, 5 layers) passed hand to hand; Mr
Tan with a whistle; each torn layer reveals a card with a calculation. Board right. Showpiece: tearing a layer
off on each "Layer …!" (`set(k)` drops a layer, scraps fly).
- five: chip "5 p.m."; the parcel goes round.
- layer1: layer torn: `7/9 × 13 + 7/9 × 5`; a 10-second countdown.
- dist: `7/9 × (13 + 5) = 7/9 × 18 = 14`; two rectangles of height 7/9 slide together into one of width 18.
- layer2: second layer: `1/2 + 1/3 × 3/4`.
- left: Dad: `(1/2 + 1/3) × 3/4 = 5/6 × 3/4 = 5/8`; chip "famous last words #4".
- nobar: NOT ON MY BAR! stamp.
- bidmas: order list "Brackets, Indices, ÷ ×, + −"; `1/3 × 3/4 = 1/4`, `1/2 + 1/4 = 3/4`; Dad's version gets
  brackets drawn round `1/2 + 1/3`.
- layer3: third layer: `3/7 × 15 × 7/3`; the cards swap places: `(3/7 × 7/3) × 15 = 1 × 15 = 15`.
- power: Kavya: `(2/3)^2 = 2/3 × 2/3 = 4/9`.
- est: `2 7/8 × 3 9/10 ≈ 3 × 4 = 12`, "both rounded up ⇒ a bit less than 12" (exact: `11 17/80`, small).
- pun: Mr Tan happy; card "fraction ← Latin *frangere*: to break"; faces deadpan; Ah Boy's blower droops. Hold.
- prize: Ah Boy holding the last, smallest layer.

## 7 mystery: Mister X cancels (Algebraic fractions, stretch)
Layout: continues from parcel: the last layer bursts and Mister X rises out of the gift box in a puff of
confetti. Board right with Vanshika's worked example big and clear. Showpiece: x's on the top and bottom of the
working fly out together ("cancel") with a little puff, leaving the numbers.
- final: Mr Tan: `x/3 × 6/x` on the board; chip "any x except 0".
- seven: Priya: `7/3 × 6/7 = 42/21 = 2`.
- million: Ah Boy: `1 000 000/3 × 6/1 000 000 = 2` "?!".
- ex: Mister X rises (lower third MISTER X), smug.
- cancel: `x/3 × 6/x = (6x)/(3x) = 2`: both x's cross out and fly away; chip "x/x = 1".
- harder: Mr Tan: big `2x/3 × 9/(4x)`, "cancel first".
- halves: step by step with coloured cancel strokes: x with x; 2 with 4 → 1 and 2; 9 with 3 → 3 and 1;
  `(1 × 3)/(1 × 2) = 3/2 = 1 1/2`. Check chip: "x = 2: `4/3 × 9/8 = 3/2` ✓".
- divide: `4x/9 ÷ 2x/3 = 4x/9 × 3/(2x) = 2/3` (cancel x, 4 with 2, 3 with 9).
- plus: Ah Boy: `(x + 5)/(x + 7)` with the x's crossed out → `5/7`.
- guard: Mister X with his "+ 5" bodyguard (`guard: 1`); the crossings bounce off; NOT ON MY BAR stamp (small);
  chip "only **factors** cancel (× the whole top and bottom)".
- try: Kavya: `x = 1`: `(1 + 5)/(1 + 7) = 6/8 = 3/4 ≠ 5/7`.
- pun: Mr Tan happy; Mister X tips his hat and vanishes; deadpan faces; the blower droops. Hold.

## 8 traps: The party saves you some marks
- intro: "6 EXAM TRAPS" over the party.
- t1 (TH, Dad): card "`2/3 + 3/5 ≠ 5/8`; `= 10/15 + 9/15 = 1 4/15`"; Dad holds a flat, sad cake.
- t2 (TH, Kavya): card "`3 1/4 − 1 2/3 = 2 15/12 − 1 8/12 = 1 7/12`", "`2 5/12` ✗".
- t3 (TH, Flip): card "`a/b ÷ c/d = a/b × d/c`": only the second flips; Flip on his feet, arms up.
- t4 (TH, Priya): card: bar of 6, "¼ of the **remainder**"; her empty wallet.
- t5 (TH, Ah Boy): card "`2 h = 120 min`: `45/120 = 3/8` (not `45/2`)".
- t6 (TH, Mr Tan): card "`(x + 6)/(x + 3) ≠ 2`: try x = 1: `7/4`"; Mister X waves from the corner.
- return: the logo "PIECE OF / CAKE will return".
- six: chip "6 p.m."; the party table, Victoria with a candle "8"; everyone in hats.
- which: Mum with the cake knife; Victoria shock.
- learnt: Ah Boy, finger raised, wise; chips `1/4`, `1/8` drift past.
- oneth: Ah Boy: `1/1`. Hold.
- birthday: Mum sighs, slides the whole cake to him.
- whole: Victoria happy, swooning in his arms.
- tear: Vinny on the table, a tear rolls (`tear: 1`); green SIMPLEST FORM stamp. Final frame holds.

## Suggested split for the animators
- Writer: cold (done).
- A: balloons, cake (about 3.2 min).
- B: icing, pizza, traps (about 3.7 min).
- C: money, parcel, mystery (about 3.7 min; parcel flows straight into mystery).
