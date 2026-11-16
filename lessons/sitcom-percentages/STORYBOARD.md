# OUT OF A HUNDRED, Ep 6 "The Great Singapore Sale": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Percentages.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** It is the Great Singapore Sale. Kavya's family spends Saturday at Plaza Seratus, the mall by the
MRT ("seratus" is Malay for a hundred). Mum has a **$200** budget and one rule: never pay full price. Dad
promises to give it "a hundred and ten per cent"; Kavya says that's impossible (half right: it's possible,
it's just 1.1). Living on every sale banner is **Percy**, the per cent sign (a slash and two zeros, "basically a
100 that fell over"), a game-show host who rates everything out of a hundred on a judge's scorecard. Through
the afternoon: three rival shoe shops with signs in three forms (Priya picks the biggest-looking number);
Ah Boy's shoes worked out in their heads with **Tenner** the 10% block and his brothers Fiver (5%) and Uno (1%);
Mr Tan hands back tests in the bookshop (more marks is not a better score); **the Great Multiplini**, a magician
shaped like a times sign, does every percentage change in ONE step; a dollar on the kaya toast and **Olive**,
the original price (crossed out on every tag, and she's the whole); the real original price of Mum's jacket
(going back? divide); Ah Boy's ang bao money at the bank, where **Snowy** the compound-interest snowball keeps
growing on his own interest. Stinger: the family spent $220 of a $200 budget. Dad did give it 110%.

Guide sections (lib/topics/percentages/guide.ts) by scene: fdp-conversions → `signs`; percentage-of-amount →
`chunks`; one-as-percentage-of-another → `tests`; multipliers (with GST and discount as multipliers) → `magic`;
percentage-change (absolute vs relative, misleading headlines, percentage points) → `toast`;
reverse-percentages (discount and GST) → `jacket`; money-percentages (profit and loss, simple interest) and
repeated-change (stretch: compound interest, +10% then −10%, chained discounts) → `bank`. Exam mistakes → `traps`.

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'percy'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, priya, tan, percy, tenner, multi, olive, snowy. The narrator is
  never drawn.
- **Humans are the heart.** They speak half the lines and are on screen in every scene. The cartoon maths
  cast are guests in their world: they stand on counters and tables (`g.top` of the sets), or appear in a
  board shot with a human leaning in from a corner (the pilot's `kavB` trick). Busts stand BEHIND a counter or
  table (`pcShop`/`pcFoodCourt`: characters in `g.mid`), or low in the frame so the hem is below y 750.
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Percy is `happy` (a host), `deadpan` when he rates something badly. Tenner is `happy`, pumping (`arms`).
  The Great Multiplini is `smug`; `shock` at Ah Boy's × 1.5. Olive is `annoyed` (prim), `smug` when finally
  respected. Snowy is `happy`. Mum is brisk and `smug` about bargains. Dad is `happy`/`smug` right before every
  mistake. Ah Boy is `happy` even when wrong. Priya is `smug`, then `annoyed` ("I demand a recount"). Mr Tan is
  `happy` at his own pun; everyone else goes `deadpan`.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never
  fill a pause with new information.
- **Running gags:**
  1. **Percy's scorecard.** He rates things out of a hundred: `g.set({ card: 1, score: '12' })` raises a judge's
     card. cold.rate "12" (70% off?), tests.score "4" (Mr Tan's joke), magic.score "90" then "100" (the cape),
     title "100", traps.final "110". Raise the card on the number, hold it through the pause.
  2. **Olive's stamp** `pcStamp(parent, false)` "WRONG WHOLE!" (red) thumps in every time somebody takes a
     percentage of the wrong amount: toast.wrong (÷ the new price), jacket.wrong ($48 + 20%), jacket.again
     (9% off the GST price), bank.wrong (+10% then −10%). `pcStamp(parent, true)` "100% CORRECT" (green, Percy's)
     on the right answers: signs.order, chunks.pay, tests.calc, magic.trick, toast.mult, jacket.undo, bank.chain.
     Scale it about 0.45-0.55.
  3. **Dad's 110%.** cold.ten, signs.still/dad ("one point one dads"), and the stinger (traps.told/spent): each
     time a gold "110%" chip pops over his head.
  4. **"I demand a recount."** Priya, whenever she loses: tests.recount, jacket.recount (annoyed, pointing, a
     small "RECOUNT" chip); a silent "RECOUNT?" from her in signs.rules.
  5. **Mr Tan's red pens and pun.** He holds a red pen in every shot; his pun (tests.joke) lands to silence: a
     tiny green chip "*cricket*" and deadpan faces. He comes back in traps.t4 ("Red pens with red pens").
  6. **Ah Boy's banner** (cold.boy: 50% off then another 20% off = 70% off?) is paid off in bank.banner (× 0.4:
     60% off). Keep a small copy of the banner in a corner of the bank shot from bank.updown on.
- **Talking heads** use `pcConf(root, who)` full stage, the character big (s about 1.4) at about (330, 400), REC
  blinking (`conf.set(1, t)`), and a card or board on the right (x 620-1160). The first time a character
  appears anywhere, show `pcLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, percentage or step is said, it appears big and clear, in the
  caption's exact words: `mkMath` for every expression (`18/24 = 0.75 = 75%`, `40 × 1.15 = 46`), `mkWorking`
  for aligned multi-step working, `mkBarModel` (or hand-built rows of boxes) for every bar model, `mkTable`
  for tables, `mkNumberLine` for the double number line, `mkAxes` for the interest graph, `mkReceipt` for
  receipts. Fractions stacked (`5/8`). Money with 2 decimal places (`$9.60`, `$54.40`, `$96.20`). Percentages
  written `62.5%`. The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690
  except lower thirds. Aim for at most ~1,000 elements per scene: build each human once per scene and move or
  hide it with `op`.
- Do not bold a unit straight after a number in on-screen text ("3.5 **km**" renders with a double space).

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`pcLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Half right. Wholly annoyed. |
| mum | Mum: brisk bargain hunter, $200 budget | magenta kurta, bun, bindi; default prop her shopping list ('paper') | MUM / Never pays full price. |
| dad | Dad: confident, wrong, lovable; "110%" | glasses, moustache, green polo; default prop calculator; `lift: 1` pumps his fist | DAD / Gives it 110%. |
| boy | Ah Boy, 8: the obvious question; ang bao money | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / Kavya's brother. Has ang bao money. |
| priya | Priya, 12: bargain expert, confidently wrong | uniform, bob, yellow clip; default prop phone | PRIYA / Best friend. Bargain expert. |
| tan | Mr Tan: dry, kind, puns | shirt and tie, glasses; default prop a red pen | MR TAN / Maths teacher. Buys red pens in bulk. |
| percy | Percy, the PER CENT SIGN: game-show host, rates everything out of 100 | red slash, two red rings (head top-left, face inside; he bounces on the bottom one), gold bow tie, gold mic, judge's scorecard; `card`, `score`, `mic` | PERCY / The per cent sign. Out of a hundred. |
| tenner | Tenner, the 10% BLOCK: gym bro, "divide by ten!" | orange cube "10%", blue sweatband, flexing arms (`arms`); `fiver` pops in Fiver ("5%", half height), `uno` pops in Uno ("1%", tiny) | TENNER / 10%. Divide by ten. Every morning. |
| multi | The Great Multiplini, the MULTIPLIER: stage magician, ONE step, "Ta-da!" (backwards: "Ad-at!") | a purple "×" (arms and legs), white head, top hat, curly moustache, red cape, wand (`wand` 0..1 sparkles) | THE GREAT MULTIPLINI / The multiplier. One step. Ta-da. |
| olive | Olive, the ORIGINAL PRICE: prim, offended, the whole | cream price tag with string, red cat-eye glasses, pearls, "WAS" crossed out, "100%"; `huff` tilts her | OLIVE / The original price. The whole. |
| snowy | Snowy, COMPOUND INTEREST: jolly, grows on his own interest | snowball with gold coins rolled in, red scarf, blue woolly hat with a "%" bobble, carrot nose; scale him up as he grows | SNOWY / Compound interest. Still growing. |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `pcMall` (the atrium: glass roof, upper shops, GREAT SINGAPORE SALE banner, hanging SALE % and UP TO 70%
banners, ground-floor fronts SHOES/BOOKS/TECH/FASHION, escalator; `g.upd(t)`, `g.fronts`, `g.pct`),
`pcShopfronts` (three rival shoe shops close up, huge posters in the windows; `g.hl(i, p)`, `g.cx`),
`pcShop({ name, col, kind, poster })` (shop interior with a counter: kinds shoes, books, tech, clothes, bank;
layers `g.mid` / `g.front` / `g.top`; `g.counterY` 530; `g.poster`; bank: `g.board` rates board),
`pcFoodCourt` (VEG RICE, KAYA TOAST, DRINKS stalls; `g.menu` with `hl(i, p)`: 0 Kaya toast set $5.00; a table
in front, top at `g.tableY` 560; layers as pcShop), `pcCarPark` (B2, the family car, boot open and full of
bags), `pcConf` (talking heads).
Props: `pcStamp`, `pcBanner(parent, markup)`, `pcBag`, `pcShoes({ price })`, `pcRiceCooker({ price })`,
`pcKettle({ price })`, `pcJacket({ price, old })`, `pcToast`, `pcAngBao`, `pcCoins(parent, n)` (`g.set(k)`),
`pcPhone(parent, headline)`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkBarModel`, `mkBrace`, `mkTable`,
`mkNumberLine`, `mkAxes`, `mkHundredSquare`, `mkPriceTag`, `mkReceipt`, `mkCalculator`, `mkChip`,
`mkSpeechBubble`, `mkWhiteboard`, `mkStamp`. Lib: `arrow`, `chip`, `tick`, `cross`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
- kavya: `pcMall` wide, a slow push; Kavya bust in the foreground left, looking up at the banners; chips
  "**Kavya**, age 12", "Saturday, **10 a.m.**", "Plaza Seratus mall"; lower third KAVYA, 12.
- budget: cut closer on the mall (zoomed); the family in a row, hems below the frame: Mum, Dad, Kavya, Ah Boy.
  Mum raises her shopping list; chips "Budget: **$200**", "Rule 1: **never pay full price**"; lower third MUM.
- ten: Dad pumps his calculator hand (lift); gold chip "**110%**!"; Mum deadpan, Kavya annoyed; lower third DAD.
- whole: Kavya (annoyed): chip "100% = **everything**" (she is half right: paid off in `signs`).
- boy: Ah Boy, hand up, points at two banners popping in at the top right: "**50%** OFF", "+ another **20%**
  OFF"; chip "50% + 20% = 70% off!"; lower third AH BOY, 8. In the pause Mum and Dad light up, Kavya deadpan,
  a red "?" pops beside Kavya.
- tiny: documentary zoom (viewfinder corners, "ZOOM ×n") into a huge red banner reading "50% OFF", through
  the "%" into its top ring.
- hi (TH): Percy's confessional (the ring becomes his head); lower third PERCY; plaque "THE PER CENT SIGN",
  a big "%", "per cent = **out of a hundred**".
- lazy: a cream board: a red "100" (a bar and two zeros) tips over, the zeros shrink to the corners, and it lands
  as "%" ("thud."); label "**100**: a hundred" → "a slash and two zeros: **%**".
- nonno: a parchment card "'for each hundred'": "per cento" (1400s) → "per" + a tiny ring-slash-ring
  ("squashed") → "%" ("today"), arrows between; "Italian merchants, scribbling faster".
- rate: a board "**50%** off, then **20%** off = **70%** off?" with a red cross; Percy raises his scorecard
  "12"; chip "**12** out of 100". Percy deadpan.
- play: game-show bulbs light up round the frame (chasing); Percy lifts his mic; chips "**$200**", "**1**
  family"; "LET'S PLAY..." pops in gold.
- title: red game-show title card with gold rays and the bulbs; logo "OUT OF A / HUNDRED" flanked by two
  wobbling "%"; "Episode 6: The Great Singapore Sale"; the cast pops in: Mum, Kavya, Percy (scorecard "100"),
  Dad (fist up), Ah Boy. Hold.

## 1 signs: Three signs, one winner (Fractions, decimals & percentages)
Layout: `pcShopfronts` with posters `{{5/8}} OFF`, `0.6 OFF`, `62% OFF`; the humans as busts low in the
foreground (Priya, Kavya, Dad, Ah Boy enter as they speak). Board shots: a `mkWhiteboard` on the right
(x 620-1160) with Percy at the left (about (300, 420), s 1.1), a human leaning in from the bottom-left corner for
their own lines. Showpiece: the three posters fly onto a percentage number line (55% to 65%) and sort
themselves 60%, 62%, 62.5%; later a double number line 0 to 1.5 / 0% to 150% with "more than one whole" shaded.
- rival: chip "10:15 a.m."; the three shop fronts; each poster wobbles as it is noticed.
- priya: Priya pops up front left (lower third PRIYA), smug, phone raised; the "62% OFF" window glows (`hl(2)`);
  bubble "biggest number!".
- same: Percy bounces into the board shot; header "**same form** first"; three cards `5/8`, `0.6`, `62%`.
- frac: Kavya leans in: `5/8 = 5 ÷ 8 = 0.625 = 62.5%` (mkWorking), then `0.6 = 60%` on the line below.
- order: the number line 55%-65%: 60% (0.6), 62% (62%), 62.5% (5/8) land in order; `0.6 < 62% < 5/8` big;
  the fraction window glows; stamp 100% CORRECT (small).
- rules: a table: "decimal → %: × 100 | `0.6 = 60%`", "% → decimal: ÷ 100 | `35% = 0.35`" and "% → fraction:
  over 100, simplify | `35/100 = 7/20`" (stacked fractions). Priya, at the side, annoyed: chip "RECOUNT?".
- quick: `7/25 = 28/100 = 28%` with "× 4" arrows on top and bottom; chip "25 × 4 = 100".
- cash: Ah Boy pops up (hand up) beside a small sign "**0.5%** cashback"; bubble "half my money back!".
- half: `0.5% = 0.005 = 1/200`; "half of **one** per cent"; a $10 note → a 5-cent coin (`mkNote`, `mkCoin`):
  `0.005 × $10 = $0.05`. In the pause Ah Boy holds up the 5-cent coin, delighted; everyone deadpan.
- still: Dad pops up, fist up; gold chip "**110%**".
- cant: Kavya, annoyed: chip "impossible?".
- whole: the double number line (fraction / decimal / percentage) from 0 to 1.5; "100% = 1 whole" bracket; 110%
  marked at 1.1, "a whole + a tenth".
- over: 125% marked: `125% = 125/100 = 5/4 = 1.25`; the part past 100% shaded yellow, "more than one whole".
- dad: Dad smug; chip "**1.1** dads". Kavya side-eye.
- plenty: Kavya deadpan; Dad's 110% chip deflates. Hold.

## 2 chunks: Ten, five, one (Percentages of amounts)
Layout: `pcShop({ name: 'SHOES', kind: 'shoes', col: '#C0392B', poster: '**15%** OFF' })`; Ah Boy, Mum, Kavya
behind the counter; the shoes (`pcShoes({ price: '$64' })`) on the counter; Tenner on the counter at the right
(s about 0.7), Fiver and Uno popping in beside him. A board shot for the bar: a $64 bar of ten equal 10% blocks
($6.40 each) on a white card. Showpiece: Tenner IS one block of the bar; Fiver is half a block; the 15% brace.
- shoes: chip "11 a.m."; the shoe shop; Ah Boy looks at the shoes.
- boy: Ah Boy (hand up), the price tag swings: `$64`, poster `15% OFF` glows; Mum beside him puts a hand over
  Dad's calculator: chip "in your head!".
- tenner: Tenner bursts onto the counter (lower third TENNER), flexing (`arms: 1`); chip "**10%** = ÷ 10".
- ten: the bar: `$64` = 10 blocks; one block lit: `64 ÷ 10 = $6.40`.
- fiver: Fiver pops in (`fiver: 1`); half a block lit: `6.40 ÷ 2 = $3.20` "5% = half of 10%".
- fifteen: Kavya: brace over 1½ blocks: `15% = 10% + 5%`, `6.40 + 3.20 = $9.60`.
- pay: Mum: `64 − 9.60 = $54.40`; stamp 100% CORRECT; Mum smug.
- swap: Percy pops in at the right: `x% of y = y% of x`; `4% of 25 = 25% of 4 = 1` (the two sides swap places
  with a little arc).
- blender: Dad behind the counter with a boxed blender tag `$260`, `37% off`; holds up his calculator.
- of: chip "'of' means **×**"; `37% = 0.37`; calculator display `96.2` (`mkCalculator`, `set('96.2')`).
- cents: Dad confused; bubble "$96.02?" with a red "?". Hold.
- dp: Kavya: `$96.20` big, the 0 popping in gold; chip "money: **2 decimal places**".
- est: a bar of $260 split in thirds: "a third ≈ $87"; `37% ≈ 1/3`; tick next to `$96.20`.
- gym: Uno pops in too (`uno: 1`): chip "**1%** = ÷ 100"; Tenner, Fiver and Uno do push-ups on the counter;
  chip "**10 – 5 – 1**". Hold.

## 3 tests: Mr Tan buys red pens (One quantity as a percentage of another)
Layout: `pcShop({ name: 'BOOKS', kind: 'books', col: '#2E7D4F', poster: '**SALE**' })`; Kavya and Priya behind
the counter (a display table of books), Mr Tan in front at the left (bust low, hem below the frame) with a fat
bundle of red pens; two marked test papers. Percy on the counter. Showpiece: the guide's two-row diagram: raw
marks on bars of different lengths (18 of 24, 21 of 30), then both rescaled to equal 100% bars (75% vs 70%).
- noon: chip "Noon"; Mr Tan enters (lower third MR TAN), red pens in bulk (a box "RED PENS × 50").
- marks: two test papers slide onto the counter: "Kavya **18/24**", "Priya **21/30**" (stacked fractions).
- win: Priya smug, holding her paper up: `21 > 18`.
- rescale: Percy pops in; the raw bars: 24 units and 30 units long, 18 and 21 shaded; chip "different
  totals!".
- formula: `percentage = part/whole × 100`; "whole = after 'out of'" with an arrow to the denominator.
- calc: mkWorking: `18/24 = 0.75 = 75%`, `21/30 = 0.7 = 70%`; the bars stretch to the same length (100%);
  75% beats 70%; stamp 100% CORRECT; Kavya smug.
- recount: Priya annoyed, pointing; chip "RECOUNT". Hold.
- joke: Mr Tan happy; everyone deadpan; "*cricket*" chip. Hold.
- sweets: Ah Boy pops up from the bottom right with a sweets packet: `45 ÷ 2 × 100 = 2250%` in red, huge.
- units: Percy: chip "**same units** first"; `$2 = 200 cents`; `45/200 × 100 = 22.5%`; a red cross on 2250%;
  Ah Boy relieved, patting his tummy.
- score: Percy raises his scorecard "4"; Mr Tan's smile fades. Hold.

## 4 magic: The Great Multiplini (Percentage increase & decrease with multipliers)
Layout: `pcShop({ name: 'TECH', kind: 'tech', col: '#2E5AAC', poster: 'Tomorrow: **+15%**' })`; Dad, Mum, Ah
Boy, Kavya behind the counter; the rice cooker (`pcRiceCooker({ price: '$40' })`) and later the kettle
(`pcKettle({ price: '$50' })`) on the counter; the Great Multiplini appears on the counter in a puff of sparkles.
Showpiece: the guide's three bars (100% = $40, 115% = $46, 80% = $32), and the × 1.5 disaster: the kettle
balloons to a huge size with "+50%".
- sign: chip "1 p.m."; the poster "Tomorrow: **+15%**" glows.
- dad: Dad: two steps: `15% of 40 = $6`, `40 + 6 = $46` (two arrows, "step 1", "step 2").
- ordinary: the Great Multiplini appears (lower third THE GREAT MULTIPLINI), smug, wand sparkling; Dad's two
  arrows crumple.
- trick: `100% + 15% = 115% = 1.15`; wand tap: `40 × 1.15 = $46` (one fat arrow "× 1.15"); "Ta-da!" stars;
  stamp 100% CORRECT.
- why: Kavya: `40 + 0.15 × 40 = 40 × (1 + 0.15) = 40 × 1.15`.
- off: Mum: the bars: `100% = $40`; `80%` bar with a dashed 20% piece cut off; `40 × 0.8 = $32`.
- rule: a card: increase by r%: `× (1 + r/100)`; decrease by r%: `× (1 − r/100)`; a table: +15% → × 1.15,
  +5% → × 1.05, −20% → × 0.8, −3% → × 0.97.
- boy: Ah Boy, hand up: `+5%: × 1.5?`; the kettle starts to swell.
- fifty: the kettle balloons huge "+50%!"; Multiplini shock; `5% = 0.05`, `× 1.05` circled; the kettle shrinks
  back.
- read: a dial: above 1 = increase (green arrow up), below 1 = decrease (red arrow down); `× 0.93` → "7% off".
- till: Dad holds up a receipt "GST 9%"; `× 1.09`; `$50 × 1.09 = $54.50` on the kettle's tag.
- score: Percy pops in with his scorecard "90", then flips it to "100" (the cape). Hold.

## 5 toast: A dollar on the kaya toast (Percentage change vs absolute change)
Layout: `pcFoodCourt`; Mum, Dad, Ah Boy, Kavya behind the table; `pcToast` on the table; Olive stands on the
table at the right (s about 0.75). Board shots: two equal 100% bars on a white card. Showpiece: the guide's
diagram: toast $4 → $5 (+25% extension) vs bike $250 → $251 (+0.4% sliver), drawn to scale.
- two: chip "2 p.m."; menu highlight row 0 "Kaya toast set $5.00".
- toast: Mum shock: a price tag `$5.00` with the old price `$4.00` crossed out (`mkPriceTag(..., { old })`);
  chip "+$1".
- bike: Dad, relaxed: a bike icon with `$250 → $251`, "+$1"; "same same" bubble.
- olive: Olive rises on the table (lower third OLIVE), annoyed; chip "the **original** = the **whole**".
- abs: `absolute change = new − original`; both "+$1".
- pct: the two 100% bars: `1/4 × 100 = 25%`, `1/250 × 100 = 0.4%`.
- rule: `percentage change = change/original × 100`; chip "**New minus Old, over Old**".
- boy: Ah Boy, hand up: `1/5 × 100 = 20%`.
- wrong: stamp WRONG WHOLE! over the 20%; `1/4 × 100 = 25%` circled; Olive huffs.
- mult: `5 ÷ 4 = 1.25` → "up 25%"; stamp 100% CORRECT.
- otter: Dad's phone (`pcPhone`, headline "Otter sightings **up 300%**!"); his thought: `5 → 15`.
- four: `up 300% = 400% = × 4`; `5 × 4 = 20`; five otters, then twenty (two rows of small otter heads);
  "+15".
- points: a GST card: `8% → 9%`: "+1 **percentage point**"; `1/8 = 12.5%` "more tax".
- five: Mum, deadpan, eats the toast. Hold.

## 6 jacket: The jacket was $48 (Reverse percentages)
Layout: `pcShop({ name: 'FASHION', kind: 'clothes', col: '#8E44AD', poster: '**20%** OFF' })`; Mum, Priya,
Kavya behind the counter; the jacket (`pcJacket({ price: '$48' })`) hanging at the right; Olive and the Great
Multiplini on the counter. Showpiece: the bar model: 10 blocks of 10%, 8 shaded = $48, each $6, all 10 = $60.
- three: chip "3 p.m."; Mum holds up the jacket, tag `$48`, "20% off".
- brag: Mum smug; chip "for bragging".
- priya: Priya: `48 × 1.2 = $57.60`; Priya smug.
- check: Kavya: `57.60 × 0.8 = $46.08 ≠ $48` (red).
- wrong: stamp WRONG WHOLE!; Olive annoyed: "20% of the **original**".
- bar: the bar model: 10 empty blocks; 8 shade green, brace "80% = $48"; `48 ÷ 8 = $6` in each; brace "100% =
  10 × $6 = $60".
- undo: Multiplini, wand backwards (a rewind arrow): `48 ÷ 0.8 = $60`; "Ad-aT!" (TA-DA mirrored); stamp 100%
  CORRECT.
- formula: card: `original = new amount ÷ multiplier`; chip "Going back? **Divide**, don't subtract."
- saved: `$60 − $48 = $12` saved; Mum smug, Priya annoyed.
- gst: a receipt (`mkReceipt`): "TOTAL (incl. 9% GST) $43.60".
- take: Priya: `43.60 − 9% ≈ $39.68`.
- again: stamp WRONG WHOLE! again (a second thump); "9% of the price **before** GST".
- divide: `109% = × 1.09`; `43.60 ÷ 1.09 = $40`; check `40 × 1.09 = 43.60` ✓.
- recount: Priya annoyed; chip "RECOUNT". Hold.

## 7 bank: Snowy at the bank (Profit & loss, simple interest; compound interest and repeated change: stretch)
Layout: `pcShop({ name: 'BANK', kind: 'bank', col: '#1E3A5A', poster: null })` (the rates board on the back
wall); Ah Boy with his ang bao (`pcAngBao`), Priya, Kavya, Dad behind the counter; Percy, Olive and Snowy as
guests on the counter. A board shot for the graph. Showpiece: `mkAxes` (years 0-10, $1000-$2600): the simple
line (+$100 a year, straight) and the compound curve (× 1.1 a year) pulling away; Snowy rolls along the curve,
growing.
- four: chip "4 p.m."; Ah Boy holds up his ang bao: `$500`.
- profit: Priya pops up, smug (phone showing a bike): "bought $150, sold $186".
- pct: Percy: `profit = 186 − 150 = $36`; `36/150 × 100 = 24%` with "cost price" under the 150; Olive peeks
  in from the side, smug for once: chip "cost price = the **original**".
- save: Ah Boy, hand up: `$500, 3% a year, 4 years?`.
- si: Dad: `I = PRT/100 = (500 × 3 × 4)/100 = $60`.
- same: coins stack up one coin per year: `$15` each year; `500 + 60 = $560`.
- snowy: Snowy rolls in (lower third SNOWY), small (s 0.6).
- roll: a table: year 0, 1, 2, 3: compound $1000, $1100, $1210, $1331 (Snowy grows at each row).
- simple: the simple column fills: $1000, $1100, $1200, $1300; chips "simple: same **amount**", "compound: same
  **percentage**".
- power: the graph: `1000 × 1.1^10 ≈ $2593.74` vs `$2000`; the curve ends far above the line.
- updown: Ah Boy: `+10% then −10% = back to start?`; his old banner appears small in the corner.
- wrong: stamp WRONG WHOLE!; bars to scale: $100 → $110 (+$10) → $99 (−$11), short of the dashed $100 line.
- chain: `× 1.1 × 0.9 = × 0.99`: "1% loss"; stamp 100% CORRECT.
- banner: Kavya: the banner: `× 0.5 × 0.8 = × 0.4`: "pay 40% = **60% off**"; "70%" crossed out.
- million: Ah Boy: `$10 at 2%` compound; a thought bubble of a mountain of money.
- years: Snowy: chip "about **582 years**"; Ah Boy ages instantly into a tiny old man silhouette in the bubble.
- wait: Ah Boy happy, arms folded; everyone deadpan. Hold.

## 8 traps: The mall saves you some marks
- intro: "6 EXAM TRAPS" over the mall atrium.
- t1 (TH, Olive): card "percentage change = change ÷ **original** × 100" with `40 → 50: 10/40 = 25%` ✓ and
  `10/50 = 20%` ✗.
- t2 (TH, Multiplini): card "Going back? **÷ multiplier**": `48 ÷ 0.8 = $60` ✓, `48 + 20%` ✗.
- t3 (TH, Ah Boy): card `7% = 0.07` (not 0.7), `0.5% = 0.005` (not 0.5).
- t4 (TH, Mr Tan): card "same units": `45c of $2 = 45/200`; a red pen beside a red pen.
- t5 (TH, Mum): card "the question asks for...": "the discount ($9.60)" or "the price you pay ($54.40)?",
  with the shoes from `chunks`.
- t6 (TH, Dad): card "25% off, then 9% GST": `× 0.75 × 1.09 = × 0.8175` ✓ (an 18.25% saving), "16% off" ✗.
- return: the title logo "OUT OF A HUNDRED will return" with the bulbs.
- six: `pcCarPark`; chip "6 p.m."; the family by the car, boot full of bags.
- total: Mum with a long receipt: "TOTAL $220.00"; "budget $200".
- told: Dad, fist up, smug; gold chip "110%".
- spent: Kavya: `220 ÷ 200 × 100 = 110%`; Dad's smile melts.
- final: Percy pops up on the car roof and raises his scorecard "110"; hold the final frame: the family deadpan,
  the boot full of bags, Percy beaming.

## Suggested split for the animators
- Writer: cold (done).
- See the structured result for the three balanced groups (by timeline duration).
