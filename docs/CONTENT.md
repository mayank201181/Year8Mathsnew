# Year 8 Maths Lab — content authoring spec

You are writing content for a maths study app used by a **12–13-year-old (Year 8)** at an
international school in **Singapore** (UK-style "Year 8"; Cambridge Lower Secondary Stage 8 +
England KS3 / White Rose Year 8). A parent will hand this to their child, so it must be
**correct, clear, encouraging and genuinely good maths teaching**.

Read first: `lib/types.ts` (the contract), `lib/topics/_example.ts` (exact shape) and, for your
topic, its entry in `lib/topics/meta.ts` (title, strand, the **fixed section ids** and what each
section covers). The previous version of the app's content for many topics is in
`/tmp/claude-0/old-content/topics/<id>.ts` — mine it for good ideas, but **re-verify everything**
and rewrite into the new shape; never copy its question ids.

## Pedagogy: Art of Problem Solving (AoPS) style — non-negotiable

- **Problem first.** Every guide section opens with a `discovery` problem the learner tries
  BEFORE the method is shown; `idea` reveals the insight afterwards.
- **Derive, don't decree.** Show *why* (a short derivation, picture or pattern) — `whyItWorks`.
- **Productive struggle.** Every core/challenge question has a **hint ladder** (`hints`, 2–4
  rungs): rung 1 = a strategic question/nudge ("What do you want to get on its own?"),
  middle rungs = a bigger hint, last rung = the key step. Hints never just state the answer.
- **Multiple paths.** Where a second method is illuminating, add it (`solutions` /
  "Two ways"). Say which is quicker and why.
- **Name strategies.** Use `strategy` / `strategies` with names like: Work backwards ·
  Try small cases · Find a pattern · Draw a diagram · Use a bar model · Introduce a variable ·
  Use symmetry · Consider extremes · Estimate first · Check by substituting · Make it simpler ·
  Split into cases · Look for an invariant · Eliminate options · Use the inverse.
- **Mistakes are data.** Write `commonError` notes and `traps` (predictable wrong answers
  with targeted feedback — e.g. the sign slip, adding denominators, the reciprocal).
- **Genuine challenge.** `challenge` difficulty means *AoPS-hard for a strong 13-year-old*:
  needs insight, not just more steps (clever counting, invariants, working backwards,
  extremal cases, "always/sometimes/never", spot-the-error, prove-it). UKMT Junior/Intermediate
  Challenge flavour is right.

## Voice and context

- Warm, direct, second person, short sentences. Treat the learner as capable — **never
  babyish**, no "Great job!!!" filler. British spelling (colour, metre, factorise).
- Singapore-flavoured contexts where natural: **$ (Singapore dollars)** for money, MRT, hawker
  centres, Sentosa, HDB flats, GST (9%), school CCA, monsoon rain, durian. Mix in global ones.
- Diverse names (Aisha, Wei Ling, Arjun, Priya, Marcus, Siti, Ethan, Mei, Ravi, Hana, Jun, Zara).
- **Food examples are vegetarian** (no meat or fish in recipes/contexts).
- Metric units. Use real-world numbers that are plausible.

## Text format (every rendered string)

Markdown-lite + maths markup — see the header of `lib/types.ts`:
- `**bold**`, `*italic*`, blank line = new paragraph, `- ` bullets, `1. ` numbered lines,
  `| a | b |` tables (great for frequency tables, two-way tables, sequences), `> ` callout,
  lines indented 4 spaces = a worked calculation block.
- **Maths goes in `{{ … }}`**: `{{3/4}}` (stacked fraction), `{{2 1/3}}` (mixed number),
  `{{x^2}}`, `{{10^(-3)}}`, `{{sqrt(49)}}`, `{{cbrt(27)}}`, `{{(2x+1)/3}}`, `{{3 * 4}}` (×),
  `{{a <= b}}` (≤), `{{pi r^2}}`. A run like `2x` is one term, so `{{2x/3}}` is (2x)/3; use
  brackets or spaces to be explicit (`{{1/2 x}}` = ½·x). Use `{{ }}` for anything with a
  fraction, power or root. Simple arithmetic can be plain unicode: `3 × 4 = 12`, `−5`, `÷`.
- **Never write a fraction as a/b in plain text** — always `{{a/b}}`.
- Use the real minus sign − in plain text (or `-` inside `{{ }}`, which renders as −).
- Degrees: `°`. Inequalities in plain text: ≤ ≥ ≠.
- Inside TypeScript: use double-quoted strings; use a backtick template literal only for SVG.
  The **only** escapes allowed are `\n` (newline: `\n` between bullet lines, `\n\n` between
  paragraphs) and `\"`. Never `\t`, `\f`, `\b`, never LaTeX (`\frac` would silently break).

## Diagrams (inline SVG)

- A backtick string starting `<svg viewBox="…" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="…">`
  and ending `</svg>`. No `${`, no backticks inside, no scripts, no external images, no `<style>`.
- Draw on a white background with dark strokes (#1f2937 / #334155) and soft fills
  (#c7d2fe, #fde68a, #bbf7d0, #fecaca, #bae6fd). font-size 11–14, font-family sans-serif.
- Geometry must be **geometrically honest** (angles that look like 120° are about 120°;
  parallel lines are parallel; right-angle marks only on right angles). Label with the same
  letters/values the text uses. Keep viewBox ≤ 480×320-ish and everything inside it.
- Graphs: draw axes, ticks and labels; plot points exactly from the stated equation.

## Question rules (MCQ / short / written)

- **Ids**: exactly as specified in your task (e.g. `fractions-m2-q07`, `fractions-p3-q14`,
  `fractions-quiz-q03`, `fractions-ch-q10`), zero-padded, in order.
- Every question: `difficulty` (`warmup` | `core` | `challenge`), `guideRef` (one of your topic's
  section ids — **every section must be practised**, stretch sections lightly), `hints`
  (≥1 for warmup, 2–4 for core/challenge), `strategy` where natural.
- Spread across the section list, and across skill types: fluency, reasoning
  ("explain/convince/always-sometimes-never"), problem solving in context, spot-the-error,
  multi-step, interpreting tables/diagrams. **No near-duplicates.**
- **MCQ**: exactly 4 options, exactly one correct, distractors built from *real*
  misconceptions (each wrong option = a specific error). Options are **shuffled at display
  time**, so never write "option A", "the first answer", "all/none of the above". The
  `explanation` says why the right answer is right and names the error behind a tempting
  distractor (by its value, e.g. "{{3/9}} comes from adding tops and bottoms").
  Spread `answerIndex` evenly across 0–3.
- **Short (auto-marked)** — the main maths format. Choose the `answer` spec carefully:
  - `number` — one numeric answer. Units/currency are ignored by the checker, so put the unit
    in the question ("Give your answer in cm."). If the question says "as a decimal", set
    `allowFraction: false`. If rounding is asked, `value` is the rounded value. For standard
    form answers set `standardForm: true`.
  - `fraction` — `n`, `d` (integers). Set `simplest: true` when the question says "simplest
    form"; `form: "mixed"` when it asks for a mixed number.
  - `list` — several numbers (shares of a ratio, coordinates → `ordered: true`, solutions).
    The question must say what order to give them in when `ordered: true`.
  - `ratio` — `parts`, with `simplest: true` for "simplify the ratio".
  - `expression` — algebra answers in plain ASCII (`"6x+15"`, `"3(x+2)"`, `"x^2-4x"`). Set
    `form: "factorised"` for factorise questions, `"expanded"` for expand, `"simplified"` for
    simplify. Answers like `y = 2x + 3` are accepted automatically.
  - `text` — only when nothing else fits (a word like "isosceles", an inequality like
    `x > 3` with variants `["x>3","3<x"]`). List every reasonable variant.
  - Optional `display` controls how the answer is shown ("$28 and $35", "{{7/12}}").
  - Make the question **unambiguous about the required form** (simplest form? decimal places?
    which value first?). The checker is strict about value and form, forgiving about spacing.
  - `solution`: clear worked steps (each step a string). `commonError` for the classic slip.
  - Add 1–2 `traps` for the most common wrong answers with targeted feedback.
- **Written** (explain / show / prove / compare — for reasoning): `marks` = number of
  `markScheme` points (2–4). Each point has lower-case `keywords` (words/numbers a learner
  would actually write). `modelAnswer` is a complete answer a teacher would give full marks.
- Calculations must be **exactly right** — compute every number twice. Prefer numbers that
  work out nicely unless the skill is rounding.
- Answers must be **checkable**: never ask "show that…" as a `short` question; that's `written`.

## Validation (mandatory before you finish)

Run, from the repo root:

    node scripts/validate-topic.ts <topicId>
    node scripts/typecheck-file.mjs lib/topics/<topicId>/<yourfile>.ts

Fix **every** reported issue (other authors' files may be missing — that's fine; only your
file's issues matter). Do NOT run `npm run build`, `next build` or `npm install`. Do not edit
any file other than the one(s) your task names.
