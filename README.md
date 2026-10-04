# Year 8 Maths Lab

A complete Year 8 maths learning app — problem-first lessons, auto-marked practice, unlimited
skill drills, a daily mixed set, spaced review, a cross-topic exam and a PIN-protected parent
dashboard. Built for a Year 8 learner in Singapore on a UK-style curriculum (Cambridge Lower
Secondary Stage 8 + England KS3 / White Rose Year 8), with **Art of Problem Solving** pedagogy
throughout.

**Live:** https://year8-maths.vercel.app

## What's inside

- **20 topics** across Number, Ratio & Proportion, Algebra, Geometry & Measure and Statistics &
  Probability — mapped to Cambridge Stage 8 objectives (see `docs/CURRICULUM.md`), with Stage 9
  look-ahead "stretch" sections.
- **Lessons** — every section opens with a *try-this-first* discovery problem, then the idea is
  derived (not decreed), with diagrams, step-by-step worked examples, a "your turn" check,
  "why does this work?", named strategies and think-deeper prompts. Proper maths typesetting
  (fractions, powers, roots) and read-aloud.
- **Practice** — per topic: a quick check, 4 multiple-choice papers, 4 practice papers (mostly
  auto-marked typed answers, plus explain/convince questions that are self-marked against a mark
  scheme) and a 10-problem **AoPS-style challenge set**. ~3,600 audited questions.
- **Auto-marking that understands maths** — accepts equivalent fractions, mixed numbers,
  decimals, units, coordinates, ratios and algebraic expressions (checked by equivalence, with
  factorised/expanded/simplified form checks), and gives targeted feedback on classic slips.
- **Skill drills** — procedurally generated, unlimited fresh questions per fine-grained skill with
  adaptive difficulty and mastery levels (New → Practising → Secure → Mastered, with "rusty"
  decay).
- **Daily 5** — five interleaved questions a day (focus topic, spaced reviews, an older skill and a
  stretch problem): the honest measure of what has stuck.
- **Review** — missed questions come back after 1, 3, 7, 16 and 35 days.
- **Fluency sprints**, **the Big Exam** (calculator and non-calculator papers with results by
  topic), **certificates**, a **formula sheet**, and **interactive explorables** for every topic.
- **Professor Pi** — an AI tutor that gives hints, not answers (needs `ANTHROPIC_API_KEY`).
- **Family accounts** with learner profiles and cloud sync, or **guest mode** on one device.
- **Parent dashboard** (PIN) — time, Daily 5 vs practice accuracy, hint use, skills, topic mastery,
  "where to help" (weak topics, rusty skills, repeated slips), reported questions, and focus-topic
  / goal settings.
- Installable **PWA**, light/dark themes, mobile-first.

## Tech

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Vercel Blob
(JSON storage) · Anthropic SDK. Content is typed TypeScript data validated by scripts and tests;
topic content stays on the server and questions are fetched by id.

```
app/                 pages + API routes
components/          UI (QuestionCard, PaperRunner, DrillRunner, GuideView, …) and widgets/
lib/
  types.ts           content model (questions, answer specs, guides)
  answerCheck.ts     auto-marking; mathParse.ts (parser); mathml.ts ({{ }} → MathML)
  learning.ts        stars, spaced repetition, mastery; mastery.ts topic progress
  store.tsx          client state + safe cloud sync; profileTypes.ts (+ v1 migration)
  topics/<id>/       guide.ts, mcq.ts, practice.ts, practice2.ts (audited content)
  drills/<id>.ts     skill generators     extras/<id>.ts   engagement extras
  exam/              Big Exam papers      server/          blob, auth, rate limits, content
docs/                authoring + audit specs, curriculum map, UI architecture
scripts/             validators, registry generator, per-file type check
tests/               node --test suites (answer checking, learning rules, all content)
```

## Develop

```bash
npm install
npm run dev            # http://localhost:3000 (guest mode without env vars)
npm test               # unit + content tests
npm run validate       # every topic, drill set and exam paper
npm run build
```

Local accounts without Vercel Blob: `LOCAL_BLOB_DIR=/tmp/y8m-blob npm run dev`.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob — accounts and cloud progress |
| `AUTH_SECRET` | Signs session cookies (recommended; otherwise derived from the Blob token) |
| `ANTHROPIC_API_KEY` | Professor Pi (optional) |
| `AI_MODEL` | Override the tutor model (default `claude-opus-5-5`; e.g. `claude-sonnet-5-5` or `claude-haiku-4-5` to cut cost) |

Existing v1 accounts, sessions and progress keep working: progress documents are migrated on
load (stars, streak, time and topic totals carry over).
