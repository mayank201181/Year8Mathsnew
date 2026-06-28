# Year 8 Maths Lab

A full-fledged, deployable **Year 8 Maths** study & revision app — built with the
`studyguideskill` playbook and modelled on the Year 8 Science Lab. Aligned to
**Cambridge Lower Secondary Stage 8 / UK KS3**, with **Art of Problem Solving (AoPS)**
pedagogy baked in throughout.

**Live:** https://year8-maths.vercel.app

## What's inside

- **14 topics** across Number, Algebra, Ratio & Proportion, Geometry & Measure, and
  Statistics & Probability — ~340 verified questions.
- **Study guides** — discovery-first sections (try a puzzle before the method), key
  facts, worked examples, "why does this work?" derivations, inline SVG diagrams, and
  read-aloud.
- **Flashcards** per topic (flip + shuffle).
- **Practice & Challenge** — a learning engine (`PaperRunner`) with a "try first" state,
  one-at-a-time **hint ladders**, multi-method solutions, self-assessed written answers,
  difficulty tiers (warmup / core / challenge) and star rewards.
- **The Big Exam** — a cross-topic comprehensive paper.
- **Interactive explorables** — number line, fraction bar, straight-line grapher,
  probability spinner, area grid, angle explorer.
- **AI tutor (Professor Pi)** — an AoPS-style Socratic tutor that nudges with hints
  rather than handing over answers. *Needs an `ANTHROPIC_API_KEY` (degrades gracefully
  without one).*
- **Gamification** — stars, ranks, daily streak, daily goal, printable certificate.
- **Spaced repetition** — missed questions resurface on a 1/3/7/16/35-day ladder in the
  Review page.
- **Accounts & cloud sync** — one family account, multiple learner profiles, synced
  across devices via Vercel Blob (scrypt-hashed password + HMAC session cookie).
- **PIN-protected parent dashboard** — time on task, accuracy, per-topic mastery,
  recent activity.
- **PWA** — installable, with generated maskable icons.

## The AoPS approach

Maths is learned by *doing*. Following the Art of Problem Solving philosophy:
problem-first discovery, derive-don't-decree, productive struggle with laddered hints,
multiple solution paths, genuine challenge problems, and explicitly-named problem-solving
strategies (work backwards, find a pattern, try small cases, use symmetry, modular
thinking, …).

## Tech stack

- **Next.js 14 (App Router)** + **TypeScript** + **Tailwind v4**
- React context store (`lib/store.tsx`) for progress, gamification, SRS and sync
- Server route handlers for auth, profiles, progress, parent dashboard and AI
- **Vercel Blob** as a JSON key-value store; deployed on **Vercel**

## Project structure

```
app/                 routes: home, topic/[id], exam, review, progress, parent, api/*
components/          AppGate, Header, Mascot, GuideView, PaperRunner, Flashcards,
                    Explorables, AskAI, AuthDialog, ProfilePicker
lib/
  types.ts           content model (AoPS fields: discovery, hints, solutions, …)
  profileTypes.ts    account / progress / SRS / analytics types
  store.tsx          global state + cloud-sync
  topics/<id>.ts     audited exam content per topic (+ index, question index)
  extras/<id>.ts     engagement extras (kept separate from audited content)
  exam.ts            comprehensive cross-topic exam
  ranks.ts grade.ts md.tsx
  server/            blob KV + auth (scrypt + HMAC)
```

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000  (use dev for auth — secure cookies)
npm run build        # production build (type-checks all content)
```

### Environment variables (production)

| Variable | Purpose | Required |
| --- | --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (accounts/progress) | for cloud sync |
| `AUTH_SECRET` | signs session cookies | for accounts |
| `ANTHROPIC_API_KEY` | AI tutor | optional |
| `AI_MODEL` | override tutor model (default `claude-opus-4-8`) | optional |

Without accounts configured the app still works fully in **guest mode** (progress saved
on the device).
