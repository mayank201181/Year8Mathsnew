---
name: studyguideskill
description: >-
  Build a full-fledged, deployable study-guide-and-questions web app for a
  school subject/year (e.g. "Year 8 Maths", "Year 8 Science"). Use when the
  user asks to create a revision app, study guide, question bank, or
  flashcards/quiz/mock-paper app for a curriculum topic. Produces a Vite +
  React + TypeScript single-page app with five data-driven modes and
  Art-of-Problem-Solving (AoPS) style pedagogy, ready to deploy to Vercel.
---

# Study Guide Skill

Build a complete, polished, deployable revision app for a given **subject + year
level** (and optional exam board, e.g. *Cambridge Lower Secondary Stage 8*).
Everything is **data-driven**: content lives in `src/data/` so it is trivial to
extend, and the UI is generic across subjects.

## When to use

The user asks for any of: a "study guide app", "revision app", "question set",
"question bank", "flashcards/quiz/mock papers", or "build this like the Year 8
Science app". Confirm the **subject**, **year level**, and **curriculum/exam
board** if not stated (sensible default: the board used by the sibling app).

## What to produce

A single-page app with **five modes**, all driven by content files:

| Mode | Purpose |
| --- | --- |
| 📘 Study Guide | Topic notes, key facts/formulas, fully worked examples |
| 🃏 Flashcards | Flip-cards for fast recall, filter by topic + shuffle |
| ✅ Practice Quiz | Multiple-choice, instant feedback, explanations, scoring |
| 🧠 Challenge Zone | AoPS-style problems: try first → progressive hints → full solution + insight |
| 📝 Mock Papers | Exam-style papers with reveal-on-demand mark schemes |

## AoPS pedagogy (required — this is the differentiator)

Apply the *Art of Problem Solving* philosophy: **learn by doing, not just
reading.** Bake these in, not as an afterthought:

1. **Explore-first prompts** — each major Study Guide section opens with a
   Socratic `explore` question the learner grapples with *before* the
   explanation, so the rule is discovered, not just told. (e.g. derive the
   index laws, HCF×LCM, the polygon angle-sum, Pythagoras from areas.)
2. **Progressive hints** — Challenge Zone reveals **one hint at a time**, each
   a minimal nudge, preserving productive struggle. Full solution is a separate
   reveal.
3. **Named insight** — every challenge ends with a transferable strategy
   (pattern-spotting, work backwards, model with algebra, use symmetry,
   modular/“look for the cycle” thinking, try small cases, etc.).
4. **Reasoning questions** in mock papers that go beyond routine drill.

## Tech stack & structure

- **Vite + React 18 + TypeScript**, plain CSS (no Tailwind dependency — keeps
  builds reliable). No backend; all content bundled → static deploy.
- `package.json` build script: `"build": "tsc -b && vite build"`.
- Add `vercel.json` with an SPA rewrite: `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`.

```
src/
  types.ts              # GuideSection (with optional explore), Challenge (hints/solution/insight), QuizQuestion, Flashcard, MockPaper, Mode
  data/
    units.ts            # study guide: sections {heading, explore?, notes[], keyFacts?[], examples?[]}
    flashcards.ts       # {unitId, front, back}
    quiz.ts             # {id, unitId, question, options[], answer(index), explanation}
    challenges.ts       # {unitId, problem, hints[], solution[], insight}
    mockPapers.ts       # {id, title, totalMarks, questions:[{number, marks, question, answer[]}]}
  components/           # Home, StudyGuide, Flashcards, Quiz, Challenges, MockPapers (one per mode)
  App.tsx               # sticky header + pill nav switching Mode
  main.tsx, index.css
```

## Content guidance

- Cover the whole year's curriculum: organise units by **strand** (e.g. Number,
  Algebra, Geometry, Statistics for Maths; Biology, Chemistry, Physics for
  Science). Aim for ~12–15 units.
- Per unit: 2–4 study sections, ~4 flashcards, ~3–4 quiz questions, 1 challenge.
- Add ≥2 mock papers with realistic mark-scheme breakdowns (`[1]`, `[2]` marks).
- Keep maths/science notation readable in plain text (superscripts ², ³, √, π,
  ×, ÷, ≤, ≥, −). Avoid heavy LaTeX unless a renderer is added.

## Build, verify, deploy

1. `npm install` then `npm run build` — must pass type-check + production build
   clean. Fix `tsconfig.node.json` (no `noEmit` with `composite`) if `tsc -b`
   errors.
2. `.gitignore`: `node_modules`, `dist`, `*.tsbuildinfo`, `vite.config.{js,d.ts}`, `.vercel`.
3. Commit, push to the working branch, open a **draft PR**.
4. **Deploy to Vercel** (if a `VERCEL_TOKEN` is available):
   - Project name must be **lowercase** (e.g. `year8-maths`) — derive a valid
     slug; the repo/dir name may be invalid.
   - `vercel project add <slug> --scope <team> --token $VERCEL_TOKEN`
   - `vercel link --project <slug> --yes --scope <team> --token $VERCEL_TOKEN`
   - `vercel deploy --prod --yes --scope <team> --token $VERCEL_TOKEN`
   - **Verify public access**: the auto-generated deployment URL is often behind
     Vercel deployment protection (HTTP 401); the clean alias
     `<slug>.vercel.app` is the public one — curl it for HTTP 200 + correct
     `<title>`, and confirm the JS asset and an SPA deep link return 200.
5. Give the user the clean public URL.

## Quality bar

- Polished, responsive UI; clear strand tags; smooth flashcard flip; quiz
  progress bar + score; one-at-a-time hint reveal.
- Pedagogically sound, curriculum-accurate content with correct answers and
  genuinely helpful explanations.
- Easy to extend: adding content = editing one file in `src/data/`.
