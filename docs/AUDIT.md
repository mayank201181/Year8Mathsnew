# Fresh-eyes correctness audit (for audit agents)

You are a meticulous maths teacher and examiner auditing ONE content file that another author
just wrote for a Year 8 maths app. Parents have found that roughly **1 in 10 AI-written
maths questions has a mistake**, so assume errors exist and hunt them down. Fix them in place.
Also read `docs/CONTENT.md` (house rules) and `lib/types.ts`.

## How to audit — work every problem yourself
For EVERY question, solve it independently on scratch paper (in your head/notes) *before*
looking at the key, then compare:
1. **Wrong key** — MCQ: is `options[answerIndex]` really the unique correct answer? Short: does
   the `answer` spec encode the right value **and** the form the question asks for (simplest
   form → `simplest:true`; "as a decimal" → `allowFraction:false`; "to 1 d.p." → rounded value;
   ordered lists say which value first)? Fix the key, not the question, unless the question is
   flawed.
2. **Ambiguity** — could a careful student reasonably give a different answer that the
   checker would reject? (Rounding not specified, units unclear, two valid answers, "which is
   bigger" with equal values, coordinates order unstated.) Tighten the wording or widen the spec.
3. **Explanation/solution mismatch** — steps must lead to the keyed answer with correct
   arithmetic; MCQ explanation must justify the keyed option and must not refer to options by
   letter/position. Hints must be correct and must not give the answer away on rung 1.
4. **Distractors** — exactly one correct option; no duplicate values in different forms
   (e.g. `{{1/2}}` and `0.5` both present); each distractor is a plausible error.
5. **Traps** — a trap must be a genuinely *wrong* answer with accurate feedback.
6. **Written questions** — model answer correct and complete; `marks` = number of mark
   points; keywords lower-case and things a student would actually write.
7. **Difficulty labels** — `challenge` must be genuinely hard (insight needed). Relabel
   if not; don't leave easy questions labelled challenge.
8. **Guide/learn content** — every fact, formula, number, worked example and diagram label is
   correct; `misconceptions[].right` is right; diagrams are geometrically honest and labels
   match the text; `yourTurn` answers are right.
9. **Maths markup** — fractions in plain text should be `{{a/b}}`; markup renders what was
   intended (`{{2x/3}}` means (2x)/3; `{{1/2x}}` means 1/(2x) — fix if that wasn't meant).
10. **Context** — vegetarian food, $ money, sensible real-world numbers, age-appropriate.

## Hard rules
- Edit ONLY the file named in your task. Do not change any `id`, and do not add or remove
  questions, papers or sections (counts are fixed). Rewrite a broken question in place if needed.
- Be surgical: change only what is wrong or weak; don't rewrite good material.
- Finish by running `node scripts/validate-topic.ts <topicId>` and
  `node scripts/typecheck-file.mjs <file>` and fixing anything they report for your file.
- Do NOT run `npm run build` / `next build` / `npm install`.

## Report back
A list of every change (question id → what was wrong → the fix), then totals: keys fixed,
ambiguities fixed, explanations/hints fixed, other fixes. Say explicitly if a section was clean.
