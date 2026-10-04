"use client";
// Unlimited practice on one or more skills, with adaptive difficulty tiers and
// visible mastery (New → Practising → Secure → Mastered).
import { useState } from "react";
import type { Drill, DrillItem } from "@/lib/drills/types";
import { makeRng } from "@/lib/drills/rng";
import { freshSeed } from "@/lib/drills";
import { adaptTier, LEVEL_NAMES, skillLevel } from "@/lib/learning";
import { useStore } from "@/lib/store";
import { DrillItemCard, type DrillOutcome } from "./DrillItemCard";

interface Current {
  drill: Drill;
  tier: 1 | 2 | 3;
  seed: number;
  item: DrillItem;
}

const LEVEL_STYLE = ["bg-surface-2 text-ink-2", "bg-info-soft text-info", "bg-good-soft text-good", "bg-accent-soft text-warn"];

export function LevelBadge({ level }: { level: number }) {
  return <span className={`chip border-0 ${LEVEL_STYLE[level] ?? LEVEL_STYLE[0]}`}>{["○", "◔", "◑", "★"][level]} {LEVEL_NAMES[level]}</span>;
}

export function RecentDots({ recent }: { recent: string }) {
  const cells = recent.padStart(10, "-").slice(-10).split("");
  return (
    <span className="inline-flex gap-0.5" aria-label={`last ${recent.length} answers: ${recent.split("").filter((c) => c === "1").length} right`}>
      {cells.map((c, i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-full ${c === "1" ? "bg-good" : c === "0" ? "bg-bad" : "bg-line"}`} />
      ))}
    </span>
  );
}

function build(drill: Drill, tier: 1 | 2 | 3, seed: number): Current {
  return { drill, tier, seed, item: drill.generate(makeRng(seed), tier) };
}

export function DrillRunner({ drills, title, onExit }: { drills: Drill[]; title?: string; onExit?: () => void }) {
  const store = useStore();
  const [cur, setCur] = useState<Current | null>(null);
  const [history, setHistory] = useState<Record<string, boolean[]>>({});
  const [count, setCount] = useState({ done: 0, right: 0, stars: 0 });
  const [toast, setToast] = useState<string | null>(null);
  const [n, setN] = useState(0);

  function pick(prevId?: string): Drill {
    if (drills.length === 1) return drills[0];
    // Interleave: prefer a different skill, weighted towards lower mastery.
    const pool = drills.filter((d) => d.id !== prevId);
    const weights = pool.map((d) => 4 - skillLevel(store.data.skills[d.id]));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = (freshSeed() / 2 ** 32) * total;
    for (let i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  // A new set of drills starts a fresh question (render-time reset, not an effect).
  // Only ever rendered on the client (behind AppGate), so random seeds can't cause a hydration mismatch.
  const drillKey = drills.map((d) => d.id).join(",");
  const [curKey, setCurKey] = useState<string | null>(null);
  if (curKey !== drillKey) {
    setCurKey(drillKey);
    if (drills.length) {
      const d = pick();
      setCur(build(d, store.data.skills[d.id]?.tier ?? 1, freshSeed()));
    } else setCur(null);
  }

  if (!drills.length) return <p className="text-ink-2">No skill drills here yet.</p>;
  if (!cur) return <div className="card p-6 text-ink-2">Getting a question ready…</div>;

  const skill = store.data.skills[cur.drill.id];
  const level = skillLevel(skill);

  function onDone(o: DrillOutcome) {
    if (!cur) return;
    const res = store.recordSkill({
      skillId: cur.drill.id,
      topicId: cur.drill.topicId,
      correct: o.correct,
      tier: cur.tier,
      hinted: o.hinted,
      solutionShown: o.solutionShown,
      mixed: false,
      slip: o.slip,
    });
    const clean = o.correct && !o.solutionShown && !o.hinted && o.tries === 1;
    setHistory((h) => ({ ...h, [cur.drill.id]: [...(h[cur.drill.id] ?? []), clean] }));
    setCount((c) => ({ done: c.done + 1, right: c.right + (o.correct ? 1 : 0), stars: c.stars + res.stars }));
    if (res.levelUp) setToast(res.levelUp === 3 ? `★ Mastered: ${cur.drill.title}!` : `◑ Secure: ${cur.drill.title} — nice work!`);
  }

  function next() {
    if (!cur) return;
    const d = pick(cur.drill.id);
    // Adapt the picked skill on its own answers this session. Its stored tier is the tier it was
    // last played at (recordSkill keeps it), so mixed sessions adapt too, not just single drills.
    const base = d.id === cur.drill.id ? cur.tier : (store.data.skills[d.id]?.tier ?? 1);
    const t = adaptTier(base, history[d.id] ?? []);
    // A new tier starts a new streak: each tier needs its own 3 clean answers (or 2 misses) to move on.
    if (t !== base) setHistory((h) => ({ ...h, [d.id]: [] }));
    setCur(build(d, t, freshSeed()));
    setToast(null);
    setN((x) => x + 1);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{title ?? "Skill practice"}</div>
          <div className="text-lg font-extrabold">{cur.drill.title}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            <LevelBadge level={level} />
            <span className="chip" title="Difficulty adapts as you go">
              Level {cur.tier} {"●".repeat(cur.tier)}
              {"○".repeat(3 - cur.tier)}
            </span>
            {skill ? <RecentDots recent={skill.recent} /> : null}
          </div>
        </div>
        <div className="text-right text-sm text-ink-2">
          <div>
            This session: <strong className="text-ink">{count.right}</strong>/{count.done}
          </div>
          {count.stars ? <div>+{count.stars} ⭐</div> : null}
          {onExit ? (
            <button type="button" className="btn btn-ghost btn-sm mt-1" onClick={onExit}>
              Finish
            </button>
          ) : null}
        </div>
      </div>
      {toast ? <div className="animate-pop rounded-xl bg-accent-soft px-4 py-2 font-bold">{toast}</div> : null}
      <DrillItemCard key={`${cur.drill.id}:${cur.seed}:${n}`} item={cur.item} onDone={onDone} onNext={next} />
      <p className="text-xs text-ink-2">
        Secure = 8 of your last 10 right on level 2+. Mastered = secure, plus right again in your Daily 5 on two days at least 3 days apart.
      </p>
    </div>
  );
}
