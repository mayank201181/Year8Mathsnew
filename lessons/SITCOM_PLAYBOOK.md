# Claude Sitcom (Year 8 Maths): playbook

One ten-to-twelve-minute mockumentary comedy per topic, voiced and animated, that teaches the whole topic.
The format and engine come from the Year 8 Science Lab's Claude Sitcom (14 episodes). Before writing, read
these Science episodes, which live on disk at `/home/user/mayank201181/year8science/lessons/`. Start with the
reference, `sitcom-energy/`: `script.py`, `STORYBOARD.md`, `lib.js` and `scenes/`. Skim `sitcom-forces/` and
`sitcom-respiration/` for range. Copy their craft, not their jokes.

Audience: a 12-year-old in Singapore, watching while eating. **Funny first; every piece of maths exact.**

## 1. Shape of an episode

| Scene | Length | What |
| --- | --- | --- |
| `cold` (`card: False`) | ~1 min, 10–13 lines | The narrator meets Kavya and her everyday problem. The maths world inside it, the main character's entrance, the premise, then the title card: "<SHOW>. Episode <n>: <title>." |
| 5–7 teaching scenes | 1–2 min each, 12–22 lines | Each scene is a set piece with a comic situation. Between them they teach **every guide section** of the topic (`lib/topics/<id>/guide.ts`, ids in `lib/topics/meta.ts`), in roughly that order. Stretch sections get one light scene or part of one. |
| `traps` | ~1 min, 11–14 lines | "The cast saves you some marks": six quick talking-head cuts, one exam trap each from `learn.examMistakes`. Then "<SHOW> will return" and a stinger joke (a call-back that lands). |

Targets: 8–9 scenes, 100–135 lines, 1,400–1,800 spoken words, **10–12 minutes**. Every guide section, every
`keyPoints` idea and the important `mustKnow` items must be taught with a correct worked example on screen.
Weave in the topic's `learn.misconceptions` (a character holds the misconception, and it gets corrected
on screen), the `mnemonics`, some `realWorld` uses, and a fact or two from `lib/extras/<id>.ts`.

Episode numbers follow `TOPIC_META` order: Ep 1 integers-powers … Ep 20 probability.

## 2. The world and the humans

- **Kavya, 12**, is the recurring human (`scKavya` bust, `scKavyaBody` full body), the same girl as in the
  Science episodes. She is smart, exasperated and half right. She lives in an HDB flat in Singapore with Mum
  and Dad and goes to secondary school.
- **Humans are the heart of every episode, not decoration.** The user (a parent) explicitly wants real people in the
  story, not only cartoon characters. Rules: at least three humans on screen per episode (Kavya plus two or more
  others); humans appear in **every scene** (on screen or on a video call), speak **at least 40% of the lines**, and
  each teaching scene is driven by a human situation (Dad splitting a bill, Priya's sports-day times, Mr Tan's
  lesson, Auntie Rose's stall). The cartoon maths characters are guests in the humans' world.
- **Every episode puts at least three humans on screen**, Kavya plus two or more others, drawn with the kit's
  `scHuman(parent, o)` (see `engine/sitcom.js`). Pick from the recurring humans below or invent one per
  episode. Humans react, get things wrong and drive the plot. They are not just narrators.
  - **Mum** (`mum`) and **Dad** (`dad`): on screen now, not only off-screen voices.
  - **Ah Boy**, Kavya's 8-year-old brother (`boy`): asks the obvious question that is secretly the hard one.
  - **Priya**, her best friend (`priya`): competitive and quick, often confidently wrong.
  - **Mr Tan**, the maths teacher (`tan`): dry, kind, loves a pun nobody laughs at.
  - **Auntie Rose**, the hawker-stall owner downstairs (`rose`): every price, ratio and percentage in Singapore
    passes through her stall.
- The **cartoon cast** is the maths itself, personified, new for each episode: numbers, fractions, shapes,
  angles, graphs, dice and so on. Each gets a strong personality that *is* its maths. For example, Zero is
  terrified of division, a Negative is always gloomy, Pi never stops talking, and an Obtuse Angle is
  relaxed.
- **Props** carry the maths: price tags, hawker menus, MRT maps, sports-day results, recipe cards, receipts,
  a whiteboard, graph paper, a protractor, dice and spinners. Use real Singapore contexts, money in $, and
  vegetarian food only (the family is vegetarian).

## 3. Script: `lessons/sitcom-<id>/script.py`

Copy the structure of `sitcom-energy/script.py` exactly: docstring (premise), `META`, `CAST`, `L()`,
`CHAPTERS`.

- `META`: `name` (the show's name), `kicker` "Claude Sitcom · Ep N · <Topic title>", `dek` (with
  `{chapters}`), `gap` 0.32, `unit` "Scene", `lab` "<topic id>", `kit` "sitcom", `title` "Claude Sitcom Ep N:
  <Show> (<Topic title>)", `h1` <Show>.
- `CAST`: `who` key → `{voice, speed, name}`. Kokoro voices (54 available). Use `bm_george` 0.96 for
  "Narrator" and `af_sky` ~1.02 for Kavya in every episode, so the series sounds consistent. Give Mum `af_kore`,
  Dad `am_michael`, Ah Boy `am_puck` ~1.12, Priya `af_nova`, Mr Tan `bm_lewis`, Auntie Rose `af_jessica` (or
  `bf_isabella`). Pick distinct voices for the cartoon cast from: af_alloy, af_aoede, af_bella, af_heart,
  af_nicole, af_river, af_sarah, am_adam, am_echo, am_eric, am_fenrir, am_liam, am_onyx, am_santa, bf_alice,
  bf_emma, bf_lily, bm_daniel, bm_fable. Speeds 0.86–1.15 for character.
- Line: `L(id, who, text, pause=0.0, say=None)`. Ids are lowercase, unique within the scene and stable (scenes
  key on them). One idea per line, 6–30 words. Captions use `**bold**` for key words and Unicode maths
  (½, ¾, x², 3⁴, −5, ×, ÷, √, π, °, ≤). `say` must spell maths the way a teacher reads it aloud, e.g.
  "three quarters", "x squared", "negative five", "two point five times ten to the power six", "one hundred
  and twenty degrees", "forty-two dollars fifty". **Any line containing digits, symbols, units or algebra
  needs a `say`.**
- Comic timing: `pause` 0.3–1.4 s after punchlines and before stingers; 2–3 s where an animation must finish
  (a sum working itself out). Comedy comes from character, situation, call-backs and running gags, not puns
  alone. Keep it kind: no mocking anyone for being bad at maths.
- Maths correctness: compute every number with `node -e` before you write it. Use the guide's methods and
  words (exam wording matters). Fix any error you find in `lib/topics/<id>/*.ts` or `lib/extras/<id>.ts` with a
  minimal edit, never change ids, and report it.

## 4. Storyboard: `lessons/sitcom-<id>/STORYBOARD.md`

Follow the `sitcom-energy/STORYBOARD.md` format:
- Title and premise.
- Comedy rules: who reacts how, running gags, the stamp-style gag, pauses as punchlines.
- A cast table with each character's look, kit or lib call and lower third.
- Sets and props, with their `lib.js` names.
- Per scene, a `## N id: Title` heading with layout and art, then **one bullet per line id** saying exactly what
  the screen shows during that line. Every maths step said aloud must be on screen, written properly: stacked
  fractions, powers and aligned working via the math kit.
- The showpiece moment of each scene.
- A suggested split of scenes for animators: groups of about three, balanced, with the writer animating
  `cold`.

## 5. lib.js: `lessons/sitcom-<id>/lib.js` (scriptwriter only)

Following `sitcom-energy/lib.js`: a `cast(root, kind, opts)` factory for every cartoon character and human
(humans via `scHuman`/`scKavya`, cartoons via `scMake`), and the sets and props used in more than one scene.
Prefix every top-level name with a short episode prefix (e.g. `rpCast`, `rpStall`) to avoid clashing with the
shared kits: lib.js, kit.js, mathkit.js, sitcom.js and the topic lib.js share one global scope. Use
`engine/mathkit.js` for all maths notation and maths props (`mathkit.js` header lists them).

## 6. Scenes: `lessons/sitcom-<id>/scenes/NN_<scene id>.js`

Rules from `PLAYBOOK.md` §5 apply. In short:
- `scene(id, S => { ...build once...; return t => {...pure function of t...} })`.
- No `Math.random` (use `rng`), no timers, no per-frame element creation.
- At most ~650 elements per scene. No SVG filters.
- Stage 1200 × 750. Keep x < 560, y < 100 clear for the scene tag, and nothing below y 690 except lower thirds.
- Labels ≥ 26 px, no overlaps.

Sitcom rules from `sitcom-energy/STORYBOARD.md`:
- Only the speaker's mouth moves: `c.set({ t, talk: scTalk(S, t, who), mood, look })`.
- Listeners look at the speaker and react on the beat.
- Talking-head confessionals use `scConfessional`.
- Lower thirds show for about 3 s on a character's first appearance.
- Cuts are snappy (fades ≤ 0.25 s).
- Every key word, number or step said appears on screen when said, in the caption's exact words.
- Hold a clean final frame.

## 7. Audio and checks

```bash
S=/tmp/claude-0/-home-user/2b59df72-9cb8-5f3d-b474-f72719eb9774/scratchpad; T=sitcom-<id>
PY=/usr/local/bin/python3.13
KOKORO_DIR=$S/tts $PY lessons/engine/make_audio.py --topic $T $S/audio/$T
WHISPER_DIR=$S/asr/sherpa-onnx-whisper-base.en $PY lessons/engine/check_audio.py --topic $T $S/audio/$T
```

Act on real mishearings, the ones a listener would also mis-hear, by rewording or respelling `say`. Then
re-run both. Never edit `timeline.json` by hand.

```bash
python3 lessons/engine/build.py --topic $T --variant local --out $S/w/$T --fonts $S/fonts [--only id1,id2]
CHROMIUM_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome NODE_PATH=$S/shottools/node_modules \
  node lessons/engine/shot.js $S/w/$T/index.html $S/shots/$T/<id> <id> --cols 4 --name <id>
```

The shot spec `<id>` shows each line 70% through; `<id>@3` gives a frame every 3 s. Read every contact sheet
and fix what is wrong. CORS and missing-narration errors are expected; any other console message is a bug.
Done means:
- every line's frame clearly shows what is being said;
- every maths expression on screen is correct and properly typeset;
- nothing overlaps or is cut off;
- each scene ends on a clean frame.

## 8. Delivery

Work only in `lessons/sitcom-<id>/` (and minimal fact fixes in that topic's content). Never edit `lessons/engine/`
or app code, and do not commit; the orchestrator builds `public/lessons/sitcom-<id>.html` and its MP3, then
commits.
