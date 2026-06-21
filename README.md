# Year 8 Maths — Study & Revision App

A full-fledged study guide and question set for **Year 8 Maths**, built as a fast
single-page web app. Aligned broadly to **Cambridge Lower Secondary Stage 8 / UK Key Stage 3**,
and modelled on the Year 8 Science revision app — with **Art of Problem Solving (AoPS)** style
pedagogy woven throughout.

## Features

Five study modes:

| Mode | What it does |
| --- | --- |
| 📘 **Study Guide** | Topic-by-topic notes, key formulas and fully worked examples. |
| 🃏 **Flashcards** | Flip-cards for fast recall of facts and formulas, filterable by topic and shuffleable. |
| ✅ **Practice Quiz** | Multiple-choice questions with instant feedback, explanations and scoring. |
| 🧠 **Challenge Zone** | AoPS-style problems: attempt first, reveal progressive hints, then the full solution. |
| 📝 **Mock Papers** | Exam-style papers with reveal-on-demand mark schemes. |

## The AoPS approach

Maths is learned by *doing*, not just reading. The app applies the Art of Problem Solving
teaching philosophy:

- **Explore-first prompts** in the Study Guide — grapple with an idea *before* the explanation,
  so you discover the rule rather than simply memorise it.
- **Progressive hints** in the Challenge Zone — reveal one nudge at a time so your own thinking
  stays in the driving seat (productive struggle, not surrender).
- **Problem-solving insights** — every challenge names a transferable strategy (pattern-spotting,
  working backwards, modelling with algebra, using symmetry, etc.).
- **Reasoning questions** in the mock papers that go beyond routine drill.

## Topics covered

- **Number** — Integers, Powers & Roots · Factors, Multiples & Primes · Fractions · Decimals,
  Rounding & Estimation · Percentages
- **Algebra** — Algebraic Expressions · Linear Equations & Inequalities · Sequences & Linear Graphs
- **Ratio & Proportion** — Sharing, direct proportion, rates (speed/distance/time)
- **Geometry & Measure** — Angles & Polygons · Perimeter, Area & Volume · Transformations & Pythagoras
- **Statistics & Probability** — Averages & data representation · Probability

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- No backend — all content is bundled, so it deploys as a static site (e.g. Vercel).

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

## Project structure

```
src/
  data/          # all content lives here (edit these to add/adjust questions)
    units.ts       # study guide notes, key facts, worked examples, explore prompts
    flashcards.ts  # flashcard deck
    quiz.ts        # multiple-choice practice questions
    challenges.ts  # AoPS-style problems with hints, solutions and insights
    mockPapers.ts  # exam papers with mark schemes
  components/     # one component per mode
  types.ts        # shared TypeScript types
  App.tsx         # navigation shell
```

Adding content is intentionally easy: every mode is data-driven, so you can extend any topic by
editing the relevant file in `src/data/`.
