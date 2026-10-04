# Year 8 Maths Lab — UI architecture & page specs (for page-building agents)

Next.js **16.3** App Router, React **19**, TypeScript strict, Tailwind v4. Read
`node_modules/next/dist/docs/` for anything framework-specific (params are a Promise:
`export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; … }`).
Never run `npm install`, `npm run build`, `next build` or `next dev` (other agents share the
repo). Check your files with `node scripts/typecheck-file.mjs <files…>` until "Type check OK".
Edit ONLY the files your task names; if you need a change elsewhere, say so in your report.

## Audience & tone
A 12–13-year-old in Singapore (UK-style Year 8) and their parent. Clean, modern, calm and
competent — **not babyish**: no confetti on every answer, celebrate milestones only. Warm,
direct copy in British English. Mobile-first (works at 360 px; the app has a fixed bottom
tab bar on mobile, so pages already get bottom padding). Touch targets ≥ 40 px. Accessible:
semantic headings, labelled controls, `aria-live` for feedback, keyboard friendly.

## Design system (app/globals.css)
Tokens via Tailwind utilities: `bg-bg bg-surface bg-surface-2 text-ink text-ink-2 border-line
bg-brand text-brand bg-brand-soft bg-brand-2 text-good bg-good-soft text-bad bg-bad-soft
text-warn bg-warn-soft text-info bg-info-soft text-accent bg-accent-soft`, strand colours
`text-s-number text-s-ratio text-s-algebra text-s-geometry text-s-stats` (and `bg-…`, `border-…`).
Component classes: `card`, `btn btn-primary|btn-secondary|btn-ghost|btn-good`, `btn-sm`, `chip`,
`input`, `kbd`, `section-title`, `muted`. Light + dark mode work automatically through tokens —
never hard-code colours (except inside content SVGs). Use `no-print` for chrome on printable pages.
Strand → colour: Number=s-number, Ratio & Proportion=s-ratio, Algebra=s-algebra,
Geometry & Measure=s-geometry, Statistics & Probability=s-stats.

## Data & state
- **Server content** (`lib/server/content.ts`, server components only — it's large):
  `TOPICS`, `getTopic(id)`, `getExtras(id)`, `getExamPapers()`, `QUESTION_INDEX`,
  `topicSummaries(): TopicSummary[]` (small, pass to client components as props).
  `TopicSummary = { id, title, strand, icon, summary, ready, sections: {id, heading, stretch}[], counts: {quiz, mcq, practice, challenge, questions}, paperIds, challengeIds }`.
  Pattern: a server `page.tsx` reads content and renders a `"use client"` view component with props.
  Mark data-only pages `export const dynamic = "force-static"` where possible.
- **Topic metadata** (`lib/topics/meta.ts`, client-safe): `TOPIC_META`, `STRANDS`, `metaById`.
- **Drills** (`lib/drills/index.ts`, client-safe): `ALL_DRILLS`, `drillById`, `drillsForTopic`,
  `freshSeed()` (call only in effects/handlers). Drill: `{ id, topicId, title, level, guideRef, generate(rng, tier) }`.
  Generate with `drill.generate(makeRng(seed), tier)` (`lib/drills/rng.ts`).
- **Questions by id from the client**: `GET /api/questions?ids=a,b,c` →
  `{ questions: { [qid]: { qid, topicId, source, paperId?, question } } }` (≤ 60 ids).
- **Store** (`lib/store.tsx`, `useStore()`): `status, mode ("cloud"|"guest"), cloudAvailable,
  account, activeProfile, data (ProgressDoc), focusTopics` and actions `recordAnswer(r)`,
  `recordSkill(r)`, `award(key, n)`, `saveAttempt/clearAttempt`, `markSectionRead(topicId, sectionId)`,
  `finishDaily(correct, total)`, `setBest(key, v)`, `setGoalMinutes`, `setWeeklyDays`,
  `setFocusTopics`, `setLast(href, label, topicId?)`, `resetAll()`, `refreshAccount()`.
  ProgressDoc fields: see `lib/profileTypes.ts` (stars, solved, srs, skills, bests, streak,
  goalMinutes, weeklyDays, focusTopics, daily, slips, last, analytics {days, topics, log, …}).
  Pages render only when the store is ready (AppGate) — safe to read `data` directly.
- **Learning rules** (`lib/learning.ts`): `skillLevel`, `LEVEL_NAMES`, `isRusty`, `skillDue`,
  `rankFor(stars)`, `RANKS`, `SRS_STEPS`, `topicOfQid`. **Topic mastery** (`lib/mastery.ts`):
  `topicMastery(summary, data, drillIdsForTopic)` → `{ pct, sectionsRead, sectionsTotal, skills, solved, challengeSolved, accuracy, started }`.
- **Dates** (`lib/dates.ts`): `todayISO()`, `addDaysISO(n)`, `lastNDays(n)`, `weekStartISO()`,
  `dayDiff(a,b)` — local dates (never `toISOString().slice(0,10)`).

## Reusable components (already built — use them, don't rebuild)
- `Rich` / `RichInline` / `Diagram` (`components/Rich.tsx`) — render content text (markdown-lite + `{{maths}}`) and SVGs. ALL content strings must go through these.
- `QuestionCard` (`components/QuestionCard.tsx`) — one question of any kind with hints, checking, feedback, solutions; props `{ q, topicId?, mode?: "practice"|"exam"|"review", restored?, onDone?(outcome), onAnswer?, number?, total?, onNext?, nextLabel? }`. Also exports `guideHref(topicId, guideRef)`.
  Remember to call `store.recordAnswer({...})` in your `onDone` unless you use PaperRunner (which does it).
- `PaperRunner` (`components/PaperRunner.tsx`) — a whole paper with navigator, autosave
  (`attemptKey`), resume, results, retry-missed; `mode="exam"` with `minutes` + `topicTitles`.
- `DrillRunner`, `LevelBadge`, `RecentDots` (`components/DrillRunner.tsx`) — adaptive unlimited
  practice for one or several drills. `DrillItemCard` (`components/DrillItemCard.tsx`) — one
  generated item (prompt → check → solution) with `onDone({correct, tries, hinted, solutionShown, slip})`.
- `AnswerInput` (`components/AnswerInput.tsx`), `AskAI` (`components/AskAI.tsx`, props `{context, compact?}`).
- Widgets: `components/widgets/registry.ts` exports `WIDGET_LOADERS[topicId]: () => Promise<WidgetDef[]>`
  (lazy); `WidgetDef = { id, title, blurb, Component }` from `components/widgets/kit.tsx`.

## URL map
`/` home · `/topics` all topics · `/topic/[id]?tab=learn|practise|challenge|explore|revise` ·
`/daily` Daily 5 · `/review` spaced review · `/skills` mastery map · `/drill/[skillId]` ·
`/sprint` fluency sprint · `/exam` the Big Exam · `/progress` · `/parent` · `/certificate/[id]` ·
`/formulas`. Deep link to a lesson section: `/topic/<id>?tab=learn#sec-<sectionId>`.
Call `setLast(href, label, topicId)` when a learner opens a topic tab / paper / drill so Home can offer "Continue".
