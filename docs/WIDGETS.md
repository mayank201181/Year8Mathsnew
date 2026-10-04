# Interactive widgets ("explorables") + engagement extras spec

## 1. Widgets — `components/widgets/<topicId>.tsx`

Each topic gets **2 genuinely useful interactive explorables** in its Interactive tab: the
learner changes inputs (sliders, steppers, drag, toggles) and watches a mathematical object
respond live, with a caption that explains what they see — plus "Try this" challenges that
make them predict and test (AoPS discovery). Think Mathigon / Desmos-lite, not a toy.

    "use client";
    import { useState, useMemo } from "react";
    import { WidgetFrame, Slider, Stepper, Segmented, Readout, M, makePlane, PlaneGrid, type WidgetDef } from "./kit";
    function FractionWall() { … }
    function Another() { … }
    export const widgets: WidgetDef[] = [
      { id: "fraction-wall", title: "Fraction wall", blurb: "See which fractions are equal.", Component: FractionWall },
      …
    ];

Rules:
- Read `components/widgets/kit.tsx` (WidgetFrame, Slider, Stepper, Segmented, Readout, `M` for
  inline maths, `makePlane`/`PlaneGrid` for coordinate SVGs) and `app/globals.css` (tokens).
- Client component, React 19, TypeScript strict, **no new dependencies**, no network, no
  `Math.random` during render (use useState initialisers or event handlers for randomness).
- Style with Tailwind utilities and the theme tokens: `bg-surface`, `bg-surface-2`, `text-ink`,
  `text-ink-2`, `border-line`, `text-brand`, `bg-brand`, `bg-brand-soft`, `text-good`,
  `bg-good-soft`, `text-bad`, `bg-bad-soft`, `text-accent`. In SVG use `className="fill-brand
  stroke-ink"` etc. (works in light and dark mode). Avoid hard-coded colours except inside small
  accents.
- Responsive: works at 360 px wide (SVG with viewBox and `className="w-full h-auto"`), touch
  friendly (no hover-only interactions; buttons ≥ 40 px).
- Mathematically **exact and honest**: compute with care (fractions via gcd, rounding shown),
  label units, keep diagrams to scale.
- Each widget's `WidgetFrame` gets 2–4 `tryThis` prompts (e.g. "Find two different fractions
  equal to {{3/4}}", "Can you make the gradient negative?") and a live `caption` explaining the
  maths in plain words, using `<M>` or `{{ }}` for notation.
- Accessible: label every control; SVGs get `role="img"` and an `aria-label` describing the
  current state.

Check: `node scripts/typecheck-file.mjs components/widgets/<topicId>.tsx` must pass.

## 2. Extras — `lib/extras/<topicId>.ts`

    import type { TopicExtras } from "../types.ts";
    export const extras: TopicExtras = { hook, didYouKnow, activities, bonusDiagrams, history };

- `hook`: 1–2 sentence curiosity hook (a surprising question or fact) for the top of the guide.
- `didYouKnow`: 4–6 surprising, TRUE facts connected to the topic (no myths; no invented stats).
- `activities`: 2 hands-on activities/puzzles to do at home with everyday items
  (`title, emoji, materials, steps, maths` — `maths` explains what it shows).
- `bonusDiagrams`: 1–2 extra SVG diagrams (same SVG rules as docs/CONTENT.md) that illuminate a
  key idea (e.g. a visual proof).
- `history`: a short (80–150 words) true story from maths history related to the topic.
Use the text format from docs/CONTENT.md (`{{ }}` maths). Check with
`node scripts/typecheck-file.mjs lib/extras/<topicId>.ts`.

Do NOT run `npm run build`, `next build` or `npm install`. Edit only your two files.
