# Skill drills spec (procedural question generators)

Drills give a learner **unlimited fresh practice** on one fine-grained skill, auto-marked, with a
worked solution — like DrFrost "Key Skills" / Sparx. You write `lib/drills/<topicId>.ts`:

    import type { Drill } from "./types.ts";
    import { frac, gcd, lcm, num, br, poly, money, roundTo, clean, signed, term, big, primeFactors, indexForm, isPrime, sample } from "./helpers.ts";
    export const drills: Drill[] = [ … ];

Read `lib/drills/types.ts`, `lib/drills/helpers.ts`, `lib/drills/_example.ts`, `lib/types.ts`
(AnswerSpec), `lib/answerCheck.ts` (how answers are checked) and `docs/CONTENT.md` (text format,
`{{maths}}` markup, house style).

## Requirements
- **8–12 drills per topic**, one per fine-grained skill, covering every non-stretch section of
  the topic (set `guideRef` to the section id) plus 1–2 for stretch sections. Order them from
  basic (`level: 1`) to harder (`level: 3`).
- `id`: `"<topicId>.<kebab-skill>"`; `topicId` set; a clear `title` a 12-year-old understands
  ("Subtract a negative number").
- `generate(rng, tier)` must be **pure and deterministic** given the rng (use only `rng.*` for
  randomness — never Math.random or Date). `tier` 1 = friendly numbers, 2 = typical Year 8
  (negatives, decimals, bigger numbers), 3 = stretch (multi-step, unfamiliar context).
- Use rejection loops (bounded, e.g. `for (let i = 0; i < 100; i++)`) to keep numbers nice:
  integer answers where intended, no trivial cases (×1, +0, k = ±1 in algebra, answer 0 unless
  deliberate), fractions in prompts already simplified, no duplicate options, no division by 0.
- **Compute answers exactly.** Avoid float noise: build decimals from integers
  (`clean`, `roundTo`), e.g. pick cents as integers then divide by 100.
- Prompts use `{{ }}` maths markup for fractions/powers/roots and state the required form
  ("Give your answer in its simplest form.", "Give your answer to 1 decimal place.").
- `answer` is an `AnswerSpec` with the right form flags. `solution` = 2–4 short worked steps
  with the real numbers. `hint` = one strategic nudge. Add `traps` for the 1–2 most common
  wrong answers with targeted feedback (a trap must never equal the correct answer — guard it).
- Vary the *wording/context* too where natural (2–4 templates), not just the numbers.
- Money in `$`. Vegetarian food contexts.

## Validation (mandatory)

    node scripts/validate-drills.ts <topicId>
    node scripts/typecheck-file.mjs lib/drills/<topicId>.ts

The validator runs every drill 200× per tier and checks text, markup, answer self-consistency,
traps, float noise and variety. It also prints a sample of each drill — **read the samples and
solve a few yourself** to confirm the maths is right. Fix everything before finishing.
Do NOT run `npm run build`, `next build` or `npm install`. Edit only your drill file.
