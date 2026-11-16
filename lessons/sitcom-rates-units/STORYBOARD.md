# LOST IN CONVERSION, Ep 8 "Are We There Yet?": storyboard

A mockumentary sitcom (documentary crew, characters talk to camera) that teaches Measures, Units & Rates.
Audience: a 12-year-old in Singapore watching while eating. FUNNY first; every number exact.
Read `script.py`: every line has a speaker (`who`), and its caption shows the speaker's name.

**Premise.** June holidays. Kavya's family flies from Singapore to London for Uncle Raj's wedding (Uncle Raj is
Mum's cousin; he lives in England and thinks in feet, stone and miles). Dad packs shorts because his phone says
"50 degrees" (it's °F: 10 °C). Riding along on the luggage tags is **Monsieur Mètre**, the metre himself (Paris,
1791), who believes a number without a unit is just gossip. Every time somebody mixes units, a spacecraft crashes
on Mars (it really happened to NASA in 1999). Over one long weekend: Changi security bins Dad's 0.25 l shampoo
(250 ml), Ah Boy's 4250 g bag and the 79 500 mm route; Lita the litre cube shows that 1 m² = 10 000 cm²; Flip the
departures board teaches the 24-hour clock and counting on; Trish the DST triangle times the flight (900 km/h =
250 m/s); Sir Miles meets them at Heathrow (5 miles ≈ 8 km); the tea stop wrecks Dad's "average"; the London
supermarket teaches unit pricing and density; a souvenir shop needs a £ → $ conversion graph (and °C → °F is not
proportional); and at the wedding Mum in stilettos presses 60 times harder than an elephant. Stinger: Dad's suitcase,
tagged "20" with no unit, lands on Mars, where a Martian holds up his shorts.

Guide sections (lib/topics/rates-units/guide.ts) by scene: metric-units → `metric`; area-volume-units → `litre`;
time → `clock`; speed → `speed` (and average speed in `miles`); imperial-units → `miles`; density-and-rates → `shop`;
conversion-graphs → `graph`; pressure (stretch) → `lawn`. Exam mistakes → `traps`. (Time comes before miles because
the family flies before it lands.)

## Comedy rules (the most important part)

- **Mouths:** only the speaker's mouth moves. Every frame: `c.set({ t, talk: scTalk(S, t, 'metre'), mood, look })`.
  The `who` keys: narr, kavya, mum, dad, boy, raj, siti, metre, miles, lita, flip, trish, martian.
- **Humans are the heart.** They speak 56% of the lines and are on screen in every scene. The family is together
  all weekend; Uncle Raj joins from `miles` on. Busts stand BEHIND the set's front layer (table, counter, seat
  row, dashboard, hedge): put characters in `g.mid` (or your own layer below `g.front`) at y ≈ 440 (s 1), so the
  shirt hem (y + 140) is hidden. Move `g.front` and `g.top` into a layer above your cast layer if you build the
  cast in your own layer (see `scenes/00_cold.js`).
- **Reactions sell the joke.** Listeners look at the speaker (`look` -1..1) and change mood on the beat.
  Monsieur Mètre is `smug`, then `annoyed`/`shock` at every unit crime, and `point`s at the correct answer.
  Sir Miles is `happy` and vague; Mètre is `annoyed` whenever Sir Miles says "give or take". Lita is `happy`,
  bouncy. Flip is `happy` and fast (`flap` shuffles his tiles on every new time). Trish is `smug` and changes her
  letters. Dad is `smug` right before every mistake, then `shock`/`sad`. Ah Boy is `happy` even when wrong. Kavya
  is `annoyed` → `deadpan`. Mum is brisk (`neutral`, `annoyed`), `smug` when she is right. Uncle Raj is `happy`
  and very British.
- **Pauses are punchlines.** Hold the reaction in a pause (slow push-in on a deadpan face, a blink). Never fill a
  pause with new information, except the Mars cutaway, which IS the punchline.
- **Running gags:**
  1. **MEANWHILE, ON MARS** (the episode's stamp-style gag). `lcMars(parent)` is a full-stage cutaway:
     `g.set(p, n)` drops a little spacecraft that crashes with a POUF; the counter reads "SPACECRAFT LOST: n".
     Cut to it for about 1.2-1.6 s, in the pause after each unit crime, then cut back: cold.nasa (n = 1, the real
     1999 one), metric.dad → after metric.dad (n = 2), litre.dad (n = 3), speed.dad (n = 4), shop.juice (n = 5).
     Stinger (traps.mars): no spacecraft this time; Dad's suitcase lies in the crater instead (see traps).
  2. **"Trust me, I did the maths."** Dad says it before every mistake (cold.dad, metric.dad, litre.dad,
     miles.mean, lawn.sandals). Each time `lcRosette` (a gold rosette with a green tick) pops onto his chest; when
     he is wrong it falls off (`g.set(1, fall)`) as the Mars cut happens. In lawn.sandals he is RIGHT: the rosette
     stays, and the narrator's "For once, he did." gets a slow push-in on Dad, glowing.
  3. **Ah Boy: "Are we there yet?"** cold.boy (they haven't left the flat), clock.there, clock.again (Flip
     answers "2 h 23 min" a minute later), miles.there, answered "Actually... yes." by Uncle Raj.
  4. **Dad's shorts.** Orange shorts with yellow dots. He packs them in cold, is cold in the cabin (litre.cold:
     hugging himself under the blanket; in `clock` keep him shivering in the background), wears them to the wedding (graph.shorts, lawn), and
     the Martian holds them up in the stinger.
  5. **Uncle Raj is imperial.** Feet, stone, miles, cups of tea. Every time he talks numbers, Monsieur Mètre
     twitches (`annoyed`), and Sir Miles beams.
  6. **Trish's new letters.** D/S/T in `speed` and `miles`; she swaps to M/D/V in `shop` and F/P/A in `lawn`
     ("New letters!"): the letters flip like a slot machine, then settle (`letters`).
- **Talking heads** (TH below) use `lcConf(root, who)` full stage, the character big (s ≈ 1.2-1.4) at about
  (300-330, 400), REC blinking (`conf.set(1, t)`). The first time a character appears anywhere, show
  `lcLowerThird(root, who)` for about 3 s. Cut instantly (fades ≤ 0.25 s).
- **Maths on screen:** whenever a number, unit or step is said, it appears big and clear in the caption's exact
  words: `mkMath` for expressions (`0.25 × 1000 = 250`, `T = D/S`, `1 m^2 = 10,000 cm^2`), `mkWorking` for
  multi-step working (equals signs lined up), `mkTable` for tables, `mkAxes` for graphs, `mkNumberLine` for the
  counting-on jumps. Units in upright text (mkMath treats cm, km, kg, ml as units; write `"l"` for litres and
  `km\/h` for km/h). Money as `$68`, `£3.40`. Times as `23:35` (always four digits). Use `≈` for every imperial
  conversion. The jokes can be silly; the maths must be exact.
- Keep the engine's chapter tag area clear (x < 560, y < 100). Labels at least 26 px. Nothing below y 690 except
  lower thirds. At most ~1,000 elements per scene; build every human once per scene and move or hide it with `op`.

## Cast (lib.js `cast(root, kind, { s, mood, ... })`)

| kind | who | look | lower third (`lcLowerThird`) |
| --- | --- | --- | --- |
| kavya | Kavya, 12: smart, exasperated, half right | `scKavya` bust (blue PE shirt "8") | KAVYA, 12 / Packed. Units checked. |
| mum | Mum: brisk, organised, has the list | magenta kurta, bun, bindi; default prop paper (the list, the boarding passes) | MUM / Kavya's mum. Has the list. |
| dad | Dad: confident, wrong, lovable; in shorts all weekend | glasses, moustache, green polo; default prop phone (the weather app); `lcRosette` on his chest | DAD / "Trust me, I did the maths." |
| boy | Ah Boy, 8: "Are we there yet?" | orange star tee; `lift: 1` raises his hand | AH BOY, 8 / "Are we there yet?" |
| raj | Uncle Raj: Mum's cousin in England; imperial everything; very kind | NEW human: grey full beard, round glasses, green collared shirt, mug of tea; at the wedding `{ style: 'kurta', shirt: '#F3E3C3', trim: '#E2B33C', prop: null }` | UNCLE RAJ / Mum's cousin. London. Imperial. |
| siti | Officer Siti: Changi security, calm, firm | NEW human: navy tudung, navy uniform shirt | OFFICER SITI / Changi Airport security |
| metre | Monsieur Mètre, the METRE: pompous, Parisian, horrified by imperial units | yellow folding metre rule with cm ticks and hinges, "1 m" at the foot, black beret with a tricolour cockade, thin curled moustache; `point`, `faint` | MONSIEUR MÈTRE / The metre. Paris, 1791. |
| miles | Sir Miles, the MILE: old, slow, vague, "give or take" | grey roadside milestone engraved "1 MILE ≈ 1.6 km", bowler hat, white walrus moustache, umbrella | SIR MILES / One mile. About 1.6 km. Give or take. |
| lita | Lita, the LITRE CUBE: bubbly, "a thousand of me!" | see-through blue 10 cm cube, 10 × 10 grid on the front, water inside, pink bow; `level`, `grid` | LITA / One litre. 10 cm each way. |
| flip | Flip, the DEPARTURES BOARD: fast, clacky, 24-hour clock only | black split-flap board with eyes, DEPARTURES strip, 8-tile yellow display; `text`, `flap` | FLIP / Departures board. 24-hour clock. |
| trish | Trish, the DST TRIANGLE: smug, a triangle of many talents | coral triangle in three compartments, big letters, yellow bow; `letters`, `cover`/`coverP` (a yellow mitten covers the letter you want) | TRISH / The DST triangle. Many letters. |
| martian | A Martian (stinger only): deadpan | small green Martian with antennae | (none) |

Narrator: never drawn.

## Sets and props (lib.js)

Sets: `lcFlat` (HDB living room at night, packing on the dining table), `lcAirport({ front: 'belt' | 'counter' |
'rail', day, title, sign })` (Changi: security belt, check-in counter with `g.scale.set('4250 g')`, gate rail;
Heathrow with `{ day: true, title: 'HEATHROW · ARRIVALS', sign: 'Exit  →' }`), `lcCabin({ day })` (the family's
seat row; `g.seats` x positions), `lcCar` (Uncle Raj's car from the bonnet: steering wheel on the viewer's left,
`g.frontX`, `g.backX`, back-seat layer `g.backKids`, `g.upd(t, speed)` scrolls the hedge), `lcShop({ kind:
'grocer' | 'souvenir' })`, `lcHouse` (Uncle Raj's kitchen), `lcGarden` (the wedding lawn, marquee, marigold arch,
hedge; `g.lawnY`), `lcMars` (the cutaway), `lcConf` (talking heads).
Props: `lcSuitcase({ col, w, h, tag })`, `lcTag(text)`, `lcBottle({ label: '0.25 l' })`, `lcWaySign(rows)` (yellow on
black, `g.hl(i, p)`), `lcFlightMap({ p, rows })`, `lcRoadSign(rows, { title })` (blue UK motorway sign), `lcPhone({ temp,
unit, city })`, `lcRosette()`. Math kit: `mkMath`, `mkText`, `mkWorking`, `mkTable`, `mkAxes`, `mkNumberLine`,
`mkCuboid`, `mkGrid`, `mkPriceTag`, `mkReceipt`, `mkChip`, `mkSpeechBubble`, `mkWhiteboard`, `mkCalculator`,
`mkRuler`, `mkThermometer`. Lib: `arrow`, `chip`, `tick`, `cross`, `strike`.

## 0 cold: Cold open (card: none) — animated by the writer (`scenes/00_cold.js`)
Layout: `lcFlat`, the family behind the dining table; suitcases on it. Showpiece: the zoom into the "kg" on the tag,
then the first Mars crash.
- kavya: slow push on Kavya behind the table, a big blue suitcase with a "20 kg" tag at right; chips "Kavya, age
  12", "Friday, 10 p.m.", "Block 512"; lower third KAVYA, 12.
- mum: camera eases wide; Mum rises in at the left with her list (lift), happy; chip "every bag under **20 kg**";
  lower third MUM.
- dad: Dad rises in, lifts his phone; the phone pops up big at right: "London 50°" with a small "°F" under it; on
  "Trust me, I did the maths" the gold rosette pops onto his chest; on "shorts" orange dotted shorts arc onto the
  table. Lower third DAD.
- f: the phone's "°F" glows and pulses; chip "**°F** = degrees **Fahrenheit**"; Kavya annoyed, looking at Dad.
- fifty: Dad smug; in the pause Kavya turns deadpan to camera.
- boy: the blue suitcase is replaced by Ah Boy's open red suitcase: Ah Boy pops up out of it (lid behind him, the
  shorts spilling over the front), hand up, happy. Lower third AH BOY, 8. Everyone shock.
- left: Mum deadpan, looking at him. Hold.
- tiny: documentary zoom into the luggage tag "20 kg", through to the red "kg" (viewfinder corners, "ZOOM ×"
  readout).
- hi (TH): Monsieur Mètre's confessional; lower third MONSIEUR MÈTRE; plaque "THE METRE / Paris, 1791", a
  little ruler, "every number gets a **unit**".
- gossip: board "**20** what?", then "20 g ?", "20 kg ?", "20 elephants ?" (with a tiny elephant), then "no unit
  = just **gossip**"; Mètre points, annoyed.
- nasa: cut to `lcMars`: the spacecraft falls through the line and crashes in its pause (POUF), counter
  "SPACECRAFT LOST: 1"; chips "1999: Mars Climate Orbiter", "**imperial** units vs **metric** units".
- pouf: Mars holds; chip "**US$125 million**"; Mètre peeks up from the bottom left, annoyed.
- coming: back at the table: the family behind it, Ah Boy still in his suitcase; Mètre hops onto the table, points;
  chip "Singapore → London: **11 000 km**"; on "I am coming too" he hops into Ah Boy's suitcase.
- title: blue title card with rays; a plane crosses on a dotted line; logo "LOST IN / CONVERSION" over a ruler
  strip; "Episode 8: Are We There Yet?"; the cast pops in: Mum, Kavya, Mètre, Dad, Ah Boy. Hold.

## 1 metric: Security, kilos and Gate C (Metric conversions)
Layout: `lcAirport({ front: 'belt' })` for security (Siti behind the X-ray belt at right, the family at left),
then `lcAirport({ front: 'counter' })` for check-in (`g.scale`), then `lcAirport({ front: 'rail', sign: 'Gate C →' })`
with `lcWaySign` for the four routes. Mètre stands on the belt / counter (`g.top`). Showpiece: the four route signs
re-written in metres, and the longest-looking one (79 500 mm) turning out to be the shortest.
- siti: wide security hall, belt moving; chip "Changi Airport · Saturday night" for the first 2 s; Officer Siti behind the belt (lower third OFFICER SITI); a sign on the belt "Liquids: **100 ml** max per
  bottle".
- dad: Dad lifts `lcBottle({ label: '0.25 l' })`; rosette pops on; a board shows `0.25 < 100` with a "?" (Dad's
  logic, in red). In the pause: cut to Mars (n = 2) for ~1.4 s; back, the rosette falls off.
- units: Mètre pops up on the belt, annoyed (lower third already shown in cold, so none here); chip "**same unit
  first!**"; the red `0.25 < 100` gets crossed out.
- family: a prefix ladder builds on a board: `kilo- (k) = × 1000`, `centi- (c) = 1/100`, `milli- (m) = 1/1000`, each
  with a little Mètre-family face (big brother kilo in a bigger beret, baby milli).
- conv: working: `1 "l" = 1000 ml`, `0.25 "l" = 0.25 × 1000 = 250 ml`; then `250 ml > 100 ml` in red.
- bin: Siti drops the bottle into the bin ("Goodbye, shampoo"), deadpan. Dad sad. Hold.
- mum: Mum's tiny bottle "8 cl"; working `1 cl = 10 ml`, `8 × 10 = 80 ml`, `80 ml ≤ 100 ml` with a green tick; Mum
  smug.
- rule: the golden-rule panel: "to a **smaller** unit → **× multiply**" (arrow right, numbers grow), "to a **bigger**
  unit → **÷ divide**" (arrow left); a mini ladder km ×1000 m ×100 cm ×10 mm.
- boy: cut to check-in; the scale display reads "4250 g"; Ah Boy, hand up, happy.
- limit: Dad shock; chip "limit: **20 kg**".
- grams: working `g → kg: bigger unit, so ÷`, `4250 ÷ 1000 = 4.25 kg`; the scale display flips to "4.25 kg"; Dad
  relieved.
- avoid: cut to the gate hall; a `lcWaySign` with four rows: "Route A  0.8 km", "Route B  750 m", "Route C  81 000 cm",
  "Route D  79 500 mm"; Dad points at route D, smug; a red cross on it.
- metres: each row gets its metre value as Kavya says it: 800 m, 750 m, 810 m, 79.5 m (each with its working in a
  side column: `0.8 × 1000`, `81 000 ÷ 100`, `79 500 ÷ 1000`); route D highlights green (`g.hl(3, p)`), the cross
  turns into a tick; "shortest!".
- sense: Ah Boy; two chips: a phone "≈ 8 mm thick" and the flight "≈ 11 000 km"; plus "a durian in **kg**", "a coin
  in **g**".
- fav: Mètre hugs Ah Boy (well, leans on him), happy; Dad sulks. Hold.

## 2 litre: Twenty-five litres of boy (Area & volume units)
Layout: gate C (`lcAirport({ front: 'rail' })`) with a cabin-bag sizer (a metal frame drawn with `mkCuboid`,
labels 55 cm, 40 cm, 20 cm), then `lcCabin` (night) with the blanket. Showpiece: the 1 m² square splitting into
100 × 100 little squares (`mkGrid`), and 1 m³ filling with Litas.
- gate: the sizer frame on the floor, labelled; chip "cabin bags must fit".
- lita: Lita bounces out of the sizer (lower third LITA): her edges labelled 10 cm × 3; working `10 × 10 × 10 =
  1000 cm³ = 1 litre`.
- ml: Lita's front grid lights up (`grid: 1`); one tiny cube zooms out: "1 cm³ = 1 ml".
- sizer: working `55 × 40 × 20 = 44,000 cm^3`, `44,000 ÷ 1000 = 44 litres`; 44 small Lita icons tile the sizer.
- fit: Ah Boy climbs into the sizer, happy; chip "Ah Boy ≈ 25 litres"; (it is a fact: an 8-year-old of about 25 kg
  is about 25 litres).
- not: Mum lifts him out, deadpan. Hold.
- seat: cut to the cabin; seat 47A; Dad unfolds a big blanket (a tartan rectangle) labelled "2 m" and "1.5 m".
- dad: working `2 × 1.5 = 3 m^2`; then Dad's wrong `3 × 100 = 300 cm^2` in red; rosette on. Pause: Mars (n = 3);
  rosette falls.
- area: Lita on the tray table; a big square "1 m" with 100 marks along the top and 100 rows down (a `mkGrid` that
  fills row by row; the counter "100 along", "100 rows").
- square: `1 m^2 = 100 × 100 = 10,000 cm^2`; chip "**square it** for area".
- safe: working `2 m = 200 cm`, `1.5 m = 150 cm`, `200 × 150 = 30,000 cm^2`, and the check `3 × 10,000 = 30,000` (green
  tick).
- cube: a big cube "1 m" fills with little Litas (10 × 10 × 10 layers, just a few drawn and "× 1000"): `1 m^3 =
  100 × 100 × 100 = 1,000,000 cm^3 = 1000 litres`; chip "**cube it** for volume".
- cold: Dad under the blanket in his shorts, shivering (sweat drops as shivers), sad. Hold.

## 3 clock: Twenty-three thirty-five (Time calculations)
Layout: the gate (Flip hangs above the rail), then `lcCabin` (night, then day) with Flip on the seat-back screen
(Flip small at the top right, or a TH). Showpiece: the counting-on number line, with the midnight stepping stone.
- flip: Flip (lower third FLIP) shuffles (`flap`) and settles on "23:35"; "LONDON" on his next row (or as a chip).
- rule: Ah Boy puzzled at "23"; a two-column table, 12-hour | 24-hour: "11:35 pm | 23:35", "3:15 pm | 15:15", "7:30 am | 07:30", "12:05 am |
  00:05"; chip "from **1 pm**: **add 12**"; a clock face showing 11:35.
- dad: Dad, smug, rosette; on screen `2310 − 2245 = 65` in red; a potato curry puff appears in his hand.
- sixty: Flip `annoyed`; chip "1 hour = **60** min, not 100"; the 65 is crossed out.
- count: `mkNumberLine` from 22:45 to 23:10 with hops "+15 min" to 23:00 and "+10 min" to 23:10; total "**25 min**".
- run: the family sprints (busts zip off to the right in a blur, the curry puff left hanging in the air). Hold.
- board: the cabin, night; chips "flight: **13 h 50 min**", "London: **7 h behind** (in June)".
- add: working `23:35 + 13 h = 12:35`, `12:35 + 50 min = 13:25 (Singapore time)` with a little "next day" tag.
- back: `13:25 − 7 h = 06:25 (London time)`; Flip shows "06:25"; a sunrise icon.
- sleep: Mum under an eye mask (pushed up); number line 23:50 → 00:00 (+10 min, a moon "midnight") → 07:00 (+7 h) →
  07:20 (+20 min); total "**7 h 30 min**".
- there: Ah Boy, hopeful.
- left: Flip shows "2.4 h" (`text: '2.4 H'`).
- forty: Ah Boy confident; "2 h 40 min" written in red, then crossed out on Flip's "No!".
- dec: working `0.4 h = 0.4 × 60 = 24 min`, `2.4 h = 2 h 24 min`; chip "decimal part × **60**"; a small table
  "15 min = 0.25 h", "30 min = 0.5 h", "45 min = 0.75 h" (the other way: ÷ 60).
- again: Ah Boy, a minute later (a "1 min later" card).
- now: Flip, deadpan, "2 h 23 min". Hold.

## 4 speed: Nine hundred kilometres an hour (Speed, distance & time)
Layout: `lcCabin` (day), the family in their row; `lcFlightMap` big on the right half (the seat-back screen),
then Trish on the tray table / in a TH. Showpiece: Trish's "cover what you want" with the mitten sliding over a
letter, and the formula falling out of the unit "km/h".
- map: the flight map with rows "Ground speed 900 km/h", "Distance to go 2160 km", "Time to go 2.4 h"; Kavya
  points.
- trish: Trish pops up on the tray table (lower third TRISH), letters D / S / T.
- time: the mitten covers T (`cover: 2`): `T = D/S`, `2160 ÷ 900 = 2.4 h`.
- speed: cover S → `S = D/T`; cover D → `D = S × T` (each written as Trish speaks); a small chip: "km/h = km **per** hour:
  **per** means ÷" (the formula hides in the unit).
- dad: Dad, rosette, `150 ÷ 20 = 7.5 km/h` in red, a bicycle icon beside it. Pause: Mars (n = 4); rosette falls.
- match: Trish annoyed: "units must match"; `20 min = 20/60 h = 1/3 h`.
- fix: `150 ÷ 1/3 = 150 × 3 = 450 km/h` (green); a bicycle with a jet engine.
- ms: Ah Boy, hand up.
- conv: working `1 km = 1000 m`, `1 h = 3600 s`, `km/h → m/s: × 1000 ÷ 3600 = ÷ 3.6`; the chain
  1000/3600 = 1/3.6.
- 250: `900 ÷ 3.6 = 250 m/s`; a 250 m bar (2½ football pitches) flashes past per second.
- run: Ah Boy, `5 m/s × 3.6 = 18 km/h`; chip "m/s → km/h: **× 3.6**".
- aisle: Mum, hand on his head, pushes him back into his seat. Hold.

## 5 miles: Give or take (Miles & kilometres, average speed)
Layout: `lcAirport({ day: true, title: 'HEATHROW · ARRIVALS', front: 'rail' })`, then `lcCar` on the motorway with an
`lcRoadSign` drifting past, Sir Miles on the hard shoulder (or riding on the dashboard). Showpiece: the double
number line miles / km (`mkNumberLine` ×2 lined up: 0, 5, 10 ... and 0, 8, 16 ...), and the distance–time graph of
the drive with its flat tea stop.
- raj: Heathrow arrivals, morning; chip "06:25 London time"; the family with a trolley, Dad in shorts; Uncle Raj (lower third UNCLE RAJ) waves a sign "WELCOME!"; chips pop: "6 ft 1", "12 stone", "90 miles".
- what: Mètre, `shock`, on the trolley; a little table appears beside him: "1 foot ≈ 30 cm", "1 pound ≈ 0.45 kg",
  "1 pint ≈ 0.57 litres", "1 mile ≈ 1.6 km" (the imperial cousins).
- miles: Sir Miles rises at the side (lower third SIR MILES); "1 mile ≈ 1.6 km"; a Roman soldier's footprints
  ×1000.
- approx: the double number line builds: miles 0, 5, 10, 15, 20 over km 0, 8, 16, 24, 32; the 5 ↔ 8 band shaded;
  "≈ means approximately equal". Mètre annoyed at "give or take".
- ninety: cut to the car (lower third none); working `90 ÷ 5 = 18`, `18 × 8 ≈ 144 km`, check `90 × 1.6 = 144`.
- rule: chips "miles → km: **× 1.6**", "km → miles: **÷ 1.6**", "km number is **bigger**".
- limit: an `lcRoadSign`-style speed-limit circle "70" with "mph"; Dad, smug; "90 km/h" Singapore sign beside it.
- faster: `70 × 1.6 ≈ 112 km/h > 90 km/h`; Dad deflates. Sir Miles holds up his mnemonic card "Fibonacci
  friends: 5 → 8, 8 → 13, 13 → 21 (miles → km)"; Mètre faints a little (`faint` 0.3).
- trip: a strip of the journey: "60 miles at 60 mph" | "tea stop 30 min" (a teacup) | "30 miles at 20 mph" (traffic
  cones); `g.upd(t, speed)` — fast, stopped, slow.
- mean: Dad, rosette: `(60 + 20) ÷ 2 = 40 mph` in red (no Mars: this is not a unit mix; the rosette just falls).
- avg: Trish pops up on the dashboard (no lower third), annoyed; "average speed = total distance ÷ total time".
- total: a `mkTable`: leg | distance | speed | time = (60, 60, 1 h), (stop, 0, —, 0.5 h), (30, 20, 1.5 h), total 90
  miles, 3 h; `90 ÷ 3 = 30 mph` (green); "not 40".
- graph: `mkAxes` time (h) 0-3, distance (miles) 0-90: steep line to (1, 60), flat to (1.5, 60), shallower to (3,
  90); labels "fast", "tea", "slow"; a dashed line from (0, 0) to (3, 90): "average 30 mph".
- there: Ah Boy, in the back seat.
- yes: the car stops; Uncle Raj's house appears through the windscreen; Ah Boy shock. Hold.

## 6 shop: Best buy, best density (Unit pricing & density)
Layout: `lcShop({ kind: 'grocer' })`, the family behind the checkout counter; bags of rice and juice cartons on the
counter with `mkPriceTag`s; then `lcHouse` (Uncle Raj's kitchen) for density. Showpiece: the two rice bags
re-priced per kg, and the ice cube floating while the gold cufflink sinks.
- shop: the supermarket; chip "vegetable biryani for the wedding".
- rice: a 2 kg bag ("£6.80") and a 5 kg bag ("£17.50") on the counter; Mum points at the big one, smug; Mètre on the
  counter twitches at "pounds" (a tiny chip: "£ = money, lb = mass").
- unit: working `6.80 ÷ 2 = £3.40 per kg`, `17.50 ÷ 5 = £3.50 per kg`; the small bag gets a red "BEST BUY" ribbon;
  chip "rate: so much **per one** unit (£/kg, km/h, l/min)".
- juice: a 750 ml carton "£2.10" and a 2 l bottle "£5.40"; Dad compares "750 > 2" (red). Pause: Mars (n = 5).
- same: working `750 ml = 0.75 l`, `2.10 ÷ 0.75 = £2.80 per litre`, `5.40 ÷ 2 = £2.70 per litre`; the 2 l gets the
  ribbon.
- big: Mum, smug; chip "lowest price **per unit** wins".
- boy: cut to Uncle Raj's kitchen; Ah Boy's enormous suitcase opens: one giant feather pillow. Ah Boy holds the pillow (1 kg) next to Mum's 1 kg bag of rice: a balance (`mkBalance`) stays level.
- dens: Trish on the kitchen table, letters flip D/S/T → M/D/V; "density = mass ÷ volume"; mitten covers D: `D =
  M/V`; units "g/cm³".
- feather: 1 cm³ of feathers (a tiny cube with a few feathers) vs 1 cm³ of rice (packed); "less mass in each cm³".
- ice: Uncle Raj's mug of tea with ice cubes; mitten covers V: `V = M/D`, `460 ÷ 0.92 = 500 cm³`.
- water: `460 ÷ 1 = 460 cm³`; a density bar "water 1 g/cm³" with ice (0.92) left of it "floats" and gold (19.3)
  far right "sinks"; the ice cubes bob in the tea.
- gold: Raj's gold cufflink plops into the tea and sinks to the bottom; Raj shock, then deadpan. Hold.

## 7 graph: Fifty degrees of separation (Conversion graphs)
Layout: `lcShop({ kind: 'souvenir' })`, the family behind the counter; a big graph-paper board (right half) with
`mkAxes`: pounds 0-60 across (small square = £5), dollars 0-100 up. Showpiece: Ah Boy's dashed "up to the line,
across" path, and the °C/°F line that misses the origin.
- rate: the souvenir shop, snow globes, price tags in £; Mum: chip "say **£1 = $1.70**".
- table: a `mkTable` "£ | 0 | 10 | 50" / "$ | 0 | 17 | 85".
- plot: the three points drop onto the axes; a ruler sweeps and draws the line; the middle point lights "check".
- scale: Mètre points at the x-axis: one small square highlighted "**£5**".
- globe: Ah Boy, a snow globe "£40"; a dashed path up from 40 to the line, then across to "$68".
- snow: Mum deadpan. Hold.
- suit: Dad with a suit rental leaflet "£350"; the axis ends at £60: an arrow off the edge.
- scaleup: working `£350 = 7 × £50`, `7 × $85 = $595`.
- shorts: Dad puts the leaflet down, looks at his shorts, smug. Hold.
- prop: the line glows through the origin; chip "straight line **through the origin** = **direct proportion**".
- grad: Mètre: a staircase on the line "£1 across, $1.70 up"; "gradient = rate"; a steeper dashed line labelled
  "a bigger rate".
- temp: Dad's phone "50 °F" (= 10 °C); Dad's red working `20 °C = 2 × 50 = 100 °F?`.
- formula: Uncle Raj; a second small axes, °C across (0-30), °F up (0-100): the line from (0, 32) through (10, 50)
  and (20, 68); working `F = 1.8C + 32`, `1.8 × 20 + 32 = 68 °F`.
- origin: the point (0, 32) circles; "misses the origin" → "**not** direct proportion"; "68 is not double 50".

## 8 lawn: Heels versus elephant (Pressure, stretch)
Layout: `lcGarden`, the wedding: Mum (full body `scHumanBody` for the heels, or a close-up of a stiletto in the
lawn), Dad in shorts and sandals, Uncle Raj in his wedding kurta, Kavya and Ah Boy behind the hedge. Showpiece: the
heel vs the elephant foot, side by side, with the pressure numbers.
- wed: the lawn and marquee; a plan inset of the lawn: a square "100 m × 100 m", `1 ha = 10,000 m^2` (with a tiny
  football pitch inside it for size; call back to Lita: "square it"); Mum's heel sinks into the grass (close-up inset).
- sink: Mum annoyed, looking at Dad's sandals.
- pres: Trish (letters flip to F/P/A); "pressure = force ÷ area"; mitten covers P: `P = F/A`.
- newton: chip "force in **newtons** (N)"; "1 kg weighs about 10 N".
- heel: a heel tip "1 cm²" with "600 N" pressing down; `600 ÷ 1 = 600 N/cm²`.
- elephant: an elephant appears on the lawn (wedding guest, garland); its feet "5000 cm²", "50 000 N";
  `50,000 ÷ 5000 = 10 N/cm²`.
- sixty: `600 ÷ 10 = 60`; "60 × the elephant!"; Ah Boy delighted.
- comp: Mum, smug, adjusts her earrings. Hold.
- area: two panels: a sharp knife (tiny area → big pressure) and a snowshoe (big area → small pressure).
- pa: chips "N/m² = pascals (Pa)", `1 N/cm² = 10,000 N/m²` (because `1 m² = 10,000 cm²`, a call-back to Lita).
- sandals: Dad lifts a foot: a big flat sandal; rosette pops on, and stays.
- once: slow push-in on Dad, beaming; the rosette sparkles. Hold.

## 9 traps: The family saves you some marks (Exam traps)
Six quick talking heads (`lcConf`), each with its trap on a card in big maths, then the stinger.
- intro: a title card "The family saves you some marks".
- t1 (TH dad): `30 km in 20 min`: red "1.5 km/h" crossed out, green `30 ÷ 1/3 = 90 km/h`; a tiny Mars spacecraft in
  the corner.
- t2 (TH boy): red "1 h 30 min" crossed, green `0.3 × 60 = 18` → "1 h 18 min".
- t3 (TH lita): red "500 cm²" crossed, green `5 × 10,000 = 50,000 cm^2`.
- t4 (TH flip): a mini number line 13:45 → 14:00 (+15) → 14:10 (+10) = 25 min; "65" crossed.
- t5 (TH raj): `average speed = total distance ÷ total time`, a teacup; "(60 + 20) ÷ 2" crossed.
- t6 (TH mum): "g with g, ml with ml": 750 ml → 0.75 l.
- return: "Lost in Conversion will return."
- home: Changi baggage reclaim; a carousel brings suitcases (blue, red, pink); the family waits; one gap.
- tag: Dad, sad; a flashback inset of his tag: just "20".
- what: Mètre on the carousel, deadpan, then annoyed.
- mars: cut to `lcMars` (no new spacecraft: the counter still says 5): Dad's suitcase lies in the crater, open.
- martian: the Martian stands up holding Dad's orange dotted shorts; chip "Mars: about **−60 °C**". Hold on the
  deadpan Martian. End.

## Suggested split for animators
Writer: `cold` (done). Then three groups balanced by duration (timeline: about 3 min 35 s each):
- Group A: `metric`, `shop`, `lawn` (Changi security and check-in, the London supermarket and kitchen, the wedding)
- Group B: `litre`, `speed`, `graph` (the gate and cabin with Lita, the cabin with Trish, the souvenir shop)
- Group C: `clock`, `miles`, `traps` (Flip at the gate and on board, Heathrow and the car, the traps and the Mars stinger)
