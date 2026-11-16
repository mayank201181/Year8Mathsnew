# KEEP IT IN PROPORTION, Ep 7 "Auntie Rose Goes to Melaka": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Ratio & Proportion.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** Auntie Rose runs ROSE'S KITCHEN (drinks and vegetarian snacks) at the hawker centre under
Block 208. She goes to Melaka for her niece's wedding and leaves the stall to Kavya's family for the weekend:
"Just keep it in proportion!" Living on her recipe card, between the 1 and the 4, is **the Colonel**: the
ratio sign itself (two dots, one moustache), head of quality control. Over two days the family mixes
bandung four ways (all 1 : 4), splits the tips jar 2 : 5 : 7 with Barry the bar model, gets quizzed by
Mr Tan, who cannot stop teaching even while buying kopi, learns the unitary method from Uni the unicorn,
scales a lassi recipe, stops Auntie paying $289 for a kebaya, enlarges a menu and reads a 1 : 50 000 map
with Monty, and washes the cups with Ivy (inverse proportion). Stinger: Ah Boy's wrong-way-round 4 : 1
bandung goes on the menu. The Colonel faints.

Guide sections (lib/topics/ratio-proportion/guide.ts) by scene: ratio-basics → `mix`; sharing-in-a-ratio →
`share`; ratios-and-fractions → `fraction`; direct-proportion → `bestbuy`; recipes-and-currency → `lassi`;
scale-and-maps → `map`; inverse-proportion (stretch) → `wash`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'colonel'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, rose, colonel, chop, barry, uni, monty, ivy.
- **Humans are the heart.** They speak over half the lines and are on screen in every scene (Rose by
  video call from Melaka). The cartoon maths cast are guests in their world. Busts stand BEHIND the stall
  counter (`rpStall`: characters in `g.mid`, or in your own layer below `g.front`), so the shirt hem is hidden.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  The Colonel is `deadpan`, `annoyed` at every out-of-proportion idea, and salutes (`salute: 1`) on "Order
  matters". Chopper is `happy` (`sad` when there is nothing to chop). Barry is calm, `neutral`/`smug`.
  Uni is `happy`, bouncing. Monty is `smug`. Ivy is `smug` and unbothered. Dad is `smug` right before
  every mistake. Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed` when she loses.
  Mr Tan is `happy` at his own puns; everyone else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never
  fill a pause with new information.
- **Running gags:**
  1. **The Colonel's stamp** `rpStamp(parent, false)` "OUT OF PROPORTION" (red) thumps on every
     add-instead-of-multiply or wrong-order mistake: cold (Ah Boy's 4 : 1 jug), mix.no (2 : 5),
     fraction.out (⅔), lassi.result (502 g), map.squash (13 by 15). `rpStamp(parent, true)` "IN PROPORTION"
     (green) on correct results: mix.equiv, share.check, lassi.scaled, map.short. Scale it ~0.4-0.6.
  2. **"How hard can it be?"** Dad says it (cold.hard, bestbuy.hard); each time a tiny "famous last words"
     beat: Dad smug, everyone else turns to camera.
  3. **Chopper wants to chop.** CHOP! is a big blade swing (tilt the whole character -40° → 0 with
     `tr(g, x, y, s, angle)`), and the ratio's numbers visibly split. When there is nothing to chop he droops.
  4. **Auntie Rose on video call, phone far too close to her face** (`rpRoseCall`): her face fills the
     window, slightly cropped. She calls Kavya "Kavya!" at the start of every call.
  5. **Mr Tan's puns** land to silence: a cricket (a tiny green chip "*cricket*") and deadpan faces.
  6. **Ah Boy's pink 4 : 1 jug** (`rpJug` with `rpMix(4, 1)`) sits somewhere on the counter all episode.
- **Talking heads** (a TH mark below) use `rpConf(root, who)` full stage, the character big (s ≈ 1.4) at
  about (330, 410), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `rpLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, ratio or step is said, it appears big and clear in the caption's
  exact words: `mkMath` for every expression (`1 : 4`, `84 ÷ 14 = 6`, `2/5`, `y = 3.5x`), `mkWorking` for
  aligned multi-step working (equals signs lined up), `mkBarModel` for every bar model, `mkAxes` for graphs,
  `mkTable` for tables. Ratios are written with spaced colons (`2 : 5 : 7`). Money as `$24.50`, ringgit as
  `RM 85`. Fractions stacked. The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. At most ~650 elements per scene (Auntie Rose is ~150 on her own: reuse instances).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`rpLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Minding the stall. |
| mum | Mum: brisk, competitive about "less sweet" | magenta kurta, bun, bindi; default prop ladle | MUM / Kavya's mum. Less sweet. |
| dad | Dad: confident, wrong, lovable | glasses, moustache, green polo; default prop calculator; in the cold open he wears Rose's apron (`style: 'apron', under: 'tee', apronText: "ROSE'S"`) | DAD / "How hard can it be?" |
| boy | Ah Boy, 8: inventor of the 4 : 1 bandung; asks the obvious question | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Inventor. |
| priya | Priya, 12: competitive, quick, confidently wrong | uniform, bob, yellow clip; prop pencil | PRIYA / Best friend. Competitive. |
| tan | Mr Tan: dry, kind, puns | shirt and tie, glasses; prop kopi | MR TAN / Maths teacher. Off duty. Allegedly. |
| rose | Auntie Rose: warm, loud, in Melaka | curly perm, floral blouse, ROSE'S apron; prop phone | AUNTIE ROSE / Rose's Kitchen, Blk 208 |
| colonel | The Colonel, the RATIO SIGN: strict, deadpan, "Order. Matters." | two stacked navy dots, officer's cap with ":" badge, white handlebar moustache, medals, swagger stick; `salute`, `point` | THE COLONEL / The ratio sign. Quality control. |
| chop | Chopper, the HCF cleaver: hyper, loves chopping | steel cleaver with a face, "÷ HCF" etched, wooden handle; `arms` | CHOPPER / Divides by the HCF. Loves it. |
| barry | Barry, the BAR MODEL: calm, proud, equal boxes only | bar of 5 equal boxes with a face, cap, legs; `lit: k` lights boxes | BARRY / Bar model. Equal boxes only. |
| uni | Uni, the UNITARY METHOD: bubbly unicorn, "find ONE, then find ANY" | white unicorn bust, rainbow mane, horn shaped like a golden "1" | UNI / The unitary method. Find ONE. |
| monty | Monty (Montgomery), a MAP: pompous, "in real life I'm enormous" | folded paper map, river, dotted route, "1 : 50 000" strip, monocle, bow tie | MONTY / A map. 1 : 50 000. Enormous. |
| ivy | Ivy, INVERSE PROPORTION: cool, contrary, never touches the axes | purple head on a curved tail (y = k/x) inside grey axes, gaps marked; `gap` | IVY / Inverse proportion. Never touches. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `rpHawker` (wide hawker centre under Block 208, fans; `g.rose`), `rpStall` (ROSE'S KITCHEN close-up:
sign, tiled wall, drinks menu `g.menu` with `hl(i, p)`, BANDUNG/LIME dispensers, fan, counter; layers
`g.mid` / `g.front` / `g.top`; `g.counterY` 530), `rpMart` (chiller aisle, shelves `g.shelves`), `rpMelaka`
and `rpRoseCall` (Auntie's video calls), `rpConf` (talking heads).
Props: `rpRecipeCard`, `rpJug`, `rpCup`, `rpMix(syrup, milk)` (same ratio ⇒ same pink), `RP_DRINK`,
`rpTipsJar`, `rpYoghurt('S'|'M'|'L', { price })`, `rpMango`, `rpStamp`. Math kit: `mkMath`, `mkText`,
`mkWorking`, `mkBarModel`, `mkBrace`, `mkAxes`, `mkTable`, `mkPriceTag`, `mkCoin`, `mkNote`, `mkChip`,
`mkSpeechBubble`, `mkWhiteboard`, `mkCalculator`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `rpHawker`, slow push towards ROSE'S KITCHEN; Kavya bust foreground left, looking at the stall;
  chips "Kavya, age 12", "Saturday, 7 a.m.", "hawker centre, Blk 208"; lower third KAVYA, 12.
- rose: cut to `rpStall`; Auntie Rose behind the counter, a pink MELAKA suitcase on the counter; chip
  "off to Melaka: niece's wedding"; lower third AUNTIE ROSE. Kavya (customer side) happy.
- know: Kavya sad/worried; Rose neutral.
- card: the recipe card slaps onto the counter ("BANDUNG / rose syrup : milk / 1 : 4"); chip "keep it in
  proportion!"; on "Bye!" Rose and the suitcase whoosh off to the right. Kavya annoyed.
- hard: Dad rises behind the counter wearing Rose's apron, smug; lower third DAD. Pause: Kavya side-eyes him.
- boy: Ah Boy pops up, hand raised, beside a jug of deep pink 4 : 1 bandung; chip "4 cups syrup + 1 cup
  milk"; lower third AH BOY, 8. Dad and Kavya shock.
- tiny: documentary zoom into the recipe card, through the "1 : 4", into the colon's two dots (viewfinder
  corners, "ZOOM ×" readout).
- hi (TH): the Colonel's confessional; lower third THE COLONEL; plaque "THE RATIO SIGN" with two dots,
  "two dots, one job".
- order: board: `syrup : milk = 1 : 4`, then a bar model: syrup 1 pink box, milk 4 boxes counted 1-2-3-4;
  "not 4 : 1" with a red cross. The Colonel points his stick at it.
- matters: salute; giant "ORDER." then "MATTERS." pop.
- nice: the stall: Ah Boy happily holding up his 4 : 1 jug; Dad and Kavya deadpan; in the pause, the stamp
  OUT OF PROPORTION thumps onto the jug; Ah Boy shock.
- charge: the Colonel hops onto the counter; Kavya, Dad, Ah Boy behind; chips "2 days", "1 stall",
  "3 amateurs" on the beats; he points the stick at the camera on "Nobody touches my ratios".
- title: magenta title card with rays; logo "KEEP IT IN / PROPORTION" flanked by two colon-dot pairs;
  "Episode 7: Auntie Rose Goes to Melaka"; the cast pops in: Rose, Kavya, the Colonel (saluting), Dad,
  Ah Boy. Hold.

## 1 mix: Four jugs of bandung (Ratio notation & simplifying)
Layout: `rpStall`, humans behind the counter (Dad, Ah Boy, Mum enter as they speak; Kavya at the side).
The Colonel and Chopper stand on the counter (`g.top`). A white card/board on the right half (x 620-1150)
holds the working; each jug's ratio becomes a row on it. Showpiece: four different-looking jugs, the same
pink (`rpMix(1, 4)`), lining up under "= 1 : 4" — and Ah Boy's 2 : 5 visibly darker.
- ratio: the Colonel on the counter, deadpan; board title "syrup : milk"; chip "same kind of quantity";
  big `1 : 4`.
- dad: Dad (smug) lifts a jug labelled "250 ml syrup" + a carton "1 litre milk"; board row writes
  `250 ml : 1 litre`, then Dad's wrong `250 : 1` in red with a "?".
- units: the Colonel annoyed; the row rewrites: `1 litre = 1000 ml`, then `250 : 1000` (units struck out).
- chop: Chopper bursts in (lower third CHOPPER) and CHOPs: `250 : 1000` → arrows "÷ 250" under each
  part → `1 : 4`. Chip "HCF = 250". Jug turns the standard pink.
- boy: Ah Boy (lift) with "1.5 cups" and "6 cups"; row `1.5 : 6`; his old 4 : 1 jug stays at the back.
- dec: "× 10" arrows: `1.5 : 6` → `15 : 60`.
- chop2: CHOP: "÷ 15" → `1 : 4`; second jug, same pink.
- mum: Mum appears (lower third MUM), ladle; row `1/2 : 2` (½ stacked).
- frac: "× 2" arrows → `1 : 4`; third jug, same pink.
- sad: Chopper raises his blade over `1 : 4`, finds no common factor, droops (sad); chip "simplest form:
  no common factor but 1". Hold.
- equiv: the three rows stack with their `= 1 : 4`; header "**Equivalent ratios**"; chip "× or ÷ EVERY
  part by the SAME number"; stamp IN PROPORTION (green, small).
- add: Ah Boy, curious: `1 : 4` → "+1, +1" → `2 : 5`, "same drink?" bubble.
- no: the Colonel annoyed; a jug of 2 : 5 (`rpMix(2, 5)`) next to a 1 : 4 jug, visibly darker; chip
  "`2 : 5` = `1 : 2.5`: more syrup per milk"; stamp OUT OF PROPORTION. Hold.
- less: chip "Ten a.m." and a customer's speech bubble "Less sweet, please"; Mum and Dad glare at each other.
- mine: Mum's jug label `3 : 20`.
- mine2: Dad's jug label `5 : 32`; Dad smug.
- n: board: "form **1 : n**: divide both parts by the first part"; chip "n can be a decimal".
- calc: aligned working: `3 : 20 = 1 : 20 ÷ 3 = 1 : 6.67` (note "2 d.p."), `5 : 32 = 1 : 32 ÷ 5 = 1 : 6.4`;
  two bars underneath: 1 syrup box and 6.67 / 6.4 milk boxes (Dad's bar visibly shorter).
- sweeter: Kavya points to the shorter milk bar: "less milk per 1 part syrup ⇒ sweeter"; Dad's jug
  glows pinker.
- trying: Dad's smile melts (smug → sad); Mum smug. Hold.

## 2 share: The tips jar (Sharing in a ratio)
Layout: `rpStall` after lunch; the tips jar (`rpTipsJar`) on the counter; Priya arrives in uniform with an
apron. Barry the bar model stands on the counter; the bar model itself is built big with `mkBarModel`
(unit about 50 px) on the right. Showpiece: the three rows of boxes, each box $6, dropping notes in.
- two: chip "2 p.m."; the jar fills; label `$84`.
- priya: Priya (lower third PRIYA), smug; a time sheet: Priya 5 h, Kavya 7 h, Ah Boy 2 h.
- ratio: Kavya: `Ah Boy : Priya : Kavya = 2 : 5 : 7` written big, names over the numbers.
- boy: Ah Boy grabs a calculator: `84 ÷ 2 = 42`; a pile of $42 slides towards him.
- lawyer: Priya annoyed, phone to ear; chip "least work, most money?"; hold.
- barry: Barry walks on (lower third BARRY): "never ÷ by one number in the ratio"; `84 ÷ 2` gets a red cross.
- boxes: rows build: Ah Boy 2 boxes, Priya 5, Kavya 7; brace on the right "`2 + 5 + 7 = 14` boxes"; Barry
  lights his own boxes. Pause: Barry smug.
- one: brace "14 boxes = $84"; `84 ÷ 14 = 6`; "$6" appears in every box.
- shares: braces per row: `2 × 6 = $12`, `5 × 6 = $30`, `7 × 6 = $42`.
- check: `12 + 30 + 42 = 84 ✓`; stamp IN PROPORTION; notes drop into three piles.
- adm: Ah Boy proudly: "**A**dd, **D**ivide, **M**ultiply" with A, D, M big, then "**A**h boy **D**eserves
  **M**ore". Barry deadpan; hold.
- contest: chip "4 p.m."; a scoreboard: KAVYA vs PRIYA, cups ticking.
- score: `Kavya : Priya = 7 : 4`; "Kavya sold 45 more".
- diff: bar model: Kavya 7 boxes, Priya 4; the 3 extra boxes shaded yellow with a brace "difference: `7 − 4 = 3` parts = 45 cups".
- total: `45 ÷ 3 = 15` in each box; total brace "11 parts: `11 × 15 = 165` cups"; small check chips
  "Kavya 105, Priya 60, `105 − 60 = 45` ✓".
- given: Priya's 4 boxes brace "60 cups"; `60 ÷ 4 = 15` "same one part"; a 3-row table: total → all parts;
  one share → that share's parts; difference → difference in parts.
- rematch: Priya annoyed, pointing at Kavya; chip "BEST OF 7"; hold.

## 3 fraction: Mr Tan orders a kopi (Ratios and fractions)
Layout: `rpStall`, 5 p.m.; Mr Tan on the customer side (bust, kopi in hand, in front of the counter, left),
Kavya and Priya behind the counter; Barry on the counter. Showpiece: one bar of 5 boxes read two ways
(part of whole ⅖ vs part to part ⅔).
- five: chip "5 p.m."; Mr Tan enters (lower third MR TAN), happy.
- kopi: menu highlight "Kopi / teh" (`g.menu.hl(3, 1)`); speech bubble "what fraction was bandung?".
- ratio: `bandung : lime = 2 : 3` with two pink and three green cups.
- priya: Priya smug: `2/3` big.
- out: stamp OUT OF PROPORTION over Priya's `2/3`. Hold.
- boxes: Barry's bar: 2 pink boxes + 3 green boxes; brace "`2 + 3 = 5` boxes".
- fifths: `bandung = 2/5` (brace under the 2 pink of 5), `lime = 3/5`; chip "add the parts → denominator";
  small `2/5 + 3/5 = 1` check.
- part: two bars compared row by row: bandung 2 vs lime 3: `2/3` "as many bandung **as** lime"; label
  "part to part"; the earlier `2/5` labelled "part of whole".
- bonus: Mr Tan: "Backwards now"; Kavya and Dad silhouettes; `Kavya = 4/5 of Dad`, "together 324 cm".
- parts: `Kavya : Dad = 4 : 5`; bar model 4 + 5 boxes; brace "9 parts = 324 cm"; `324 ÷ 9 = 36`.
- heights: `4 × 36 = 144 cm`, `5 × 36 = 180 cm`; Dad pops up behind the counter, standing tall; a height
  chart; check chip "`4/5` of 180 = 144 ✓".
- joke: Mr Tan happy; everybody deadpan; a tiny "*cricket*" chip. Hold.
- none: Ah Boy, cheerful: chip "0/5". Hold.

## 4 bestbuy: Find ONE, then find ANY (Direct proportion & best buys)
Layout: first half `rpStall` (Sunday, the menu row "Mango lassi 3 for $10.50" highlighted); second half
`rpMart` with three yoghurt pots on a shelf. Uni the unicorn pops in with sparkles. Showpiece: the graph
of y = 3.5x through the origin and the delivery line lifted to y = 3.5x + 4.
- sunday: chip "Sunday"; menu highlight row 2; a customer bubble "7 lassis, please".
- hard: Dad smug, calculator held upside down; everyone turns to camera. Hold.
- uni: Uni bursts in (lower third UNI), horn sparkling; chip "find **ONE**, then find **ANY**".
- divide: unitary ladder (`mkWorking`): `3 cups → $10.50`, `1 cup → 10.50 ÷ 3 = $3.50`.
- times: `7 cups → 7 × 3.50 = $24.50`; seven cups slide onto the counter.
- direct: Kavya; chip "direct proportion: double one, double the other"; 2 cups `$7.00`, 4 cups `$14.00`.
- table: `mkTable`: cups 1, 2, 3, 7; cost 3.50, 7.00, 10.50, 24.50; a row "cost ÷ cups" = 3.50 each; then
  `y = 3.5x`, "k = 3.5".
- graph: `mkAxes` (cups 0-7, cost 0-30): the points and the line `y = 3.5x` through (0, 0); the origin
  glows.
- deliver: Dad with a delivery bag: "+ $4 fee".
- broken: points (1, 7.50) and (2, 11) on the same axes; "`2 × 7.50 = 15 ≠ 11`".
- fixed: the dashed line `y = 3.5x + 4` starts at (0, 4), missing the origin; Uni's horn droops; chip
  "fixed fee ⇒ NOT direct proportion".
- sizes: cut to `rpMart`; three pots with price tags: S 150 g $1.20, M 500 g $3.75, L 1 kg $7.90; Dad
  (customer side) hugs the 1 kg pot, smug.
- unit: chip "unit price: price per **100 g**"; "1 kg = 1000 g".
- prices: `mkWorking`: `1.20 ÷ 1.5 = $0.80`, `3.75 ÷ 5 = $0.75`, `7.90 ÷ 10 = $0.79` (notes "150 g =
  1.5 × 100 g" etc.); bars per 100 g.
- medium: the M pot glows, a "BEST BUY" ribbon; stamp IN PROPORTION.
- idea: Dad with three M pots, smug; Kavya deadpan. Hold.

## 5 lassi: Lassi for six, and a kebaya (Recipes & currency conversion)
Layout: `rpStall` with the lassi recipe card (serves 4: 2 mangoes, 500 g yoghurt, 200 ml milk, 40 g
sugar) as a `mkTable` with columns "serves 4", "+2 (Priya)", "× 1.5". Then `rpRoseCall` big (about
640 × 420) over the stall for Auntie Rose's call; a double number line for $ ↔ RM. Showpiece: the
recipe table with Priya's absurd "+2" column being stamped, then the × 1.5 column.
- ten: chip "10 a.m."; the recipe card "MANGO LASSI, serves 4"; a family of six waving at the counter.
- add: Priya smug: "+ 2" in her column.
- result: the "+2" column fills: 4 mangoes, 502 g, 202 ml, 42 g; the Colonel reads it out, one word per
  beat; stamp OUT OF PROPORTION on "Proportion". Hold.
- multiply: Uni: `multiplier = new ÷ old = 6/4 = 1.5`.
- scaled: the "× 1.5" column: 3, 750 g, 300 ml, 60 g; stamp IN PROPORTION.
- big: chip "11 a.m.: as many as possible".
- fridge: Mum at an open fridge: 7 mangoes, 1500 g yoghurt (three 500 g pots), 1 litre milk.
- batches: working: `7 ÷ 2 = 3.5`, `1500 ÷ 500 = 3`, `1000 ÷ 200 = 5` batches; three bars.
- limit: the yoghurt bar is shortest: "limiting ingredient"; `3 × 4 = 12` lassis; 12 cups.
- pot: Dad sad, holding a pot; hold.
- rate: video call (lower third AUNTIE ROSE if not shown yet in this scene): Rose too close to the camera;
  `$1 = RM 3.40`; double number line: $0, $1, $25, $50 ↔ RM 0, RM 3.40, RM 85, RM 170.
- mult: arrow "$ → RM: × 3.40"; `50 × 3.40 = 170`.
- kebaya: Rose holds up a kebaya with a tag `RM 85`.
- boy: Ah Boy on the calculator: `85 × 3.40 = 289`, "$289" in red.
- what: Rose shock, phone shaking. Hold.
- divide: arrow "RM → $: ÷ 3.40"; `85 ÷ 3.40 = $25`; chip "ringgit number is the bigger one" ($25 < RM 85 ✓).
- two: Rose happy, two kebayas. Hold.

## 6 map: Monty the map (Scale factors, scale drawings & maps)
Layout: first the photocopier in the hawker centre's corner (a simple grey copier, menu sheets coming
out); then `rpRoseCall` with a map of Melaka (`mkGrid` paper, a hotel, a ruler `mkRuler` measuring 7 cm).
Monty stands beside the board. Showpiece: the squashed 13 × 15 menu next to the correct 10 × 15 menu,
both on squared paper.
- one: chip "1 p.m."; the copier hums.
- menu: the menu as a rectangle `4 cm` by `6 cm` on squared paper; target "long side 15 cm".
- boy: Ah Boy: `6 + 9 = 15`, so "+ 9" both sides: a 13 × 15 rectangle comes out, nearly square, the menu
  text squashed.
- squash: stamp OUT OF PROPORTION. Hold.
- monty: Monty unfolds (lower third MONTY), smug.
- similar: the two shapes side by side with equal angle marks; chip "every length × the same **scale
  factor k**".
- k: highlight the long sides 6 and 15: `k = new ÷ original = 15 ÷ 6 = 2.5`.
- short: `4 × 2.5 = 10 cm`; a 10 × 15 rectangle; `4 : 6 = 2 : 3` and `10 : 15 = 2 : 3`; stamp IN PROPORTION.
- lost: chip "2 p.m."; video call: Rose lost, holding the map upside down.
- hotel: the map "1 : 50 000"; a ruler shows 7 cm from Rose to the hotel.
- scale: `1 cm (map) → 50 000 cm (real)`; chip "same units both sides".
- real: working: `7 × 50 000 = 350 000 cm`.
- km: `350 000 ÷ 100 = 3500 m`, `3500 ÷ 1000 = 3.5 km`; chip `1 km = 100 000 cm`; a trishaw icon.
- route: Rose: trishaw route "6 km".
- tomap: `6 km = 6000 m = 600 000 cm`; `600 000 ÷ 50 000 = 12 cm`; a 12 cm line drawn on the map.
- rule: two arrows: "map → real: × (huge)" and "real → map: ÷ (tiny)"; Monty grows huge, then tiny.
- uncle: Rose sad-funny; the trishaw uncle in the window, sweating. Hold.

## 7 wash: Ivy never touches the axes (Inverse proportion: stretch)
Layout: `rpStall` at night (darker tint), a mountain of cups; six humans behind the counter washing (Mum,
Dad, Kavya, Priya, Ah Boy, Mr Tan with his third kopi), then Mum and Dad leave. Ivy floats on the right
beside an `mkAxes` graph. Showpiece: the curve `y = 60/x` with rectangles of area 60 (6 × 10, 4 × 15).
- nine: chip "9 p.m."; cups piled high.
- six: six washers; chip "6 people → 10 minutes"; Mr Tan waves his kopi.
- four: Dad and Mum leave (they slide off); chip "4 people → ? minutes".
- ivy: Ivy appears (lower third IVY); chip "one ↑, the other ↓".
- expect: arrows "people ↓ ⇒ time ↑"; chip "expect > 10 min".
- product: `6 × 10 = 60` "person-minutes"; a 6 × 10 rectangle on the graph.
- fifteen: `60 ÷ 4 = 15` minutes; a 4 × 15 rectangle with the same area.
- graph: `x × y = 60`, `y = 60/x`; the curve draws; Ivy shows the gaps near both axes.
- space: Ivy smug; the gap marks pulse. Hold.
- pun: Mr Tan happy; deadpan faces; "*cricket*". Hold.
- sing: Priya sings (music notes); chip "2 × singers ⇒ ½ time?".
- not: Ivy: a cross over it; chip "not proportional at all"; the song length stays 3:00.
- speed: video call: Rose on the coach; chips `80 km/h, 3 h` and `60 km/h, ? h`.
- time: `speed × time = 80 × 3 = 240 km`; `240 ÷ 60 = 4 hours`; chip "slower ⇒ longer". Hold the final
  frame on Ivy smug and the coach crawling.

## 8 traps: The stall saves you some marks
- intro: "6 EXAM TRAPS" over the stall.
- t1 (TH, Colonel): card "Order matters: `boys : girls` ≠ `girls : boys`"; salute.
- t2 (TH, Dad): card "`50 cm : 2 m` = `50 : 200` = `1 : 4`" with "`25 : 1` ✗"; Dad sheepish.
- t3 (TH, Ah Boy): card "÷ by the TOTAL number of parts", `84 ÷ 2` crossed; Ah Boy hands back $42.
- t4 (TH, Barry): card "difference ⇒ difference in parts" with the 7 : 4 bar and its 3 yellow boxes.
- t5 (TH, Monty): card "`1 km = 100 000 cm`", stamped three times on "Every. Single. Time."
- t6 (TH, Rose on video call): card "RM 85 → $: ÷ 3.40 = $25 (not $289)"; "which should be bigger?".
- return: the logo "KEEP IT IN PROPORTION will return".
- monday: chip "Monday, 6 a.m."; Rose back at the stall, suitcase down.
- pink: Rose picks up Ah Boy's deep pink jug.
- me: Ah Boy, hand up, proud: `4 : 1` chip.
- menu: Rose sips; happy; the menu board gets a new row "Ah Boy Special `4 : 1` $6.00" (`g.menu`-style
  row added). Hold.
- faint: the Colonel, on the counter, says "Order... matters..." and slowly tips over backwards (rotate
  0 → -90 around his base), cap rolling away. Final frame holds: the Colonel flat, the Ah Boy Special on
  the menu.

## Suggested split for the animators
- Writer: cold (done).
- A: mix, share, fraction (about 4 min).
- B: bestbuy, lassi (about 3 min).
- C: map, wash, traps (about 3.7 min).
