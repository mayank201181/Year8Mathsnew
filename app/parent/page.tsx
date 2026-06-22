"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { topics } from "@/lib/topics";
import type { Profile, ProgressDoc } from "@/lib/profileTypes";

interface Learner {
  profile: Profile;
  progress: ProgressDoc | null;
}

export default function ParentPage() {
  const { account } = useStore();
  const [pin, setPin] = useState("");
  const [learners, setLearners] = useState<Learner[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function unlock() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/parent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Incorrect PIN");
      setLearners(data.learners);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  if (!account) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400">The parent dashboard needs a family account.</p>
        <Link href="/" className="text-indigo-300 hover:underline">
          ← Back home
        </Link>
      </div>
    );
  }

  if (!learners) {
    return (
      <div className="max-w-sm mx-auto py-16 text-center">
        <div className="text-5xl mb-3">👪</div>
        <h1 className="text-2xl font-extrabold">Parent dashboard</h1>
        <p className="text-slate-400 text-sm mt-1 mb-4">Enter your 4-digit PIN to view progress.</p>
        <input
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          onKeyDown={(e) => e.key === "Enter" && unlock()}
          className="text-center text-2xl tracking-[0.5em] bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 w-44"
          placeholder="••••"
        />
        {error && <p className="text-rose-400 text-sm mt-2">{error}</p>}
        <button
          onClick={unlock}
          disabled={busy || pin.length !== 4}
          className="mt-4 block mx-auto bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 rounded-lg px-6 py-2.5 font-semibold"
        >
          {busy ? "Checking…" : "Unlock"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">👪 Parent dashboard</h1>

      {learners.length === 0 && <p className="text-slate-400">No learner profiles yet.</p>}

      {learners.map(({ profile, progress }) => {
        const p = progress;
        const attempts = p ? Object.values(p.attempts) : [];
        const tries = attempts.reduce((s, a) => s + a.attempts, 0);
        const correct = attempts.reduce((s, a) => s + a.correct, 0);
        const acc = tries ? Math.round((correct / tries) * 100) : 0;
        const mins = p ? Math.round(p.analytics.secondsOnTask / 60) : 0;
        const weekActivity = p?.analytics.activity.slice(0, 8) ?? [];

        return (
          <section key={profile.id} className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{profile.avatar}</span>
              <div>
                <h2 className="font-bold text-lg">{profile.name}</h2>
                <p className="text-xs text-slate-400">
                  ⭐ {p?.stars ?? 0} · 🔥 {p?.streak ?? 0}-day streak
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { label: "Time on task", value: `${mins} min` },
                { label: "Questions", value: tries },
                { label: "Accuracy", value: `${acc}%` },
                { label: "Guides read", value: p?.guidesRead.length ?? 0 },
              ].map((s) => (
                <div key={s.label} className="bg-slate-800/60 rounded-xl p-3">
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-[11px] text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Per-topic accuracy</h3>
              <div className="space-y-1">
                {topics.map((t) => {
                  const a = p?.analytics.perTopic[t.id];
                  if (!a || a.attempts === 0) return null;
                  const tacc = Math.round((a.correct / a.attempts) * 100);
                  return (
                    <div key={t.id} className="flex items-center gap-2 text-xs">
                      <span className="w-40 shrink-0 truncate">{t.title}</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${tacc >= 70 ? "bg-emerald-400" : tacc >= 40 ? "bg-amber-400" : "bg-rose-400"}`}
                          style={{ width: `${tacc}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-slate-400">{tacc}%</span>
                    </div>
                  );
                })}
                {topics.every((t) => !p?.analytics.perTopic[t.id]?.attempts) && (
                  <p className="text-xs text-slate-500">No practice yet.</p>
                )}
              </div>
            </div>

            {weekActivity.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-1">Recent activity</h3>
                <ul className="text-xs text-slate-400 space-y-0.5">
                  {weekActivity.map((e, i) => (
                    <li key={i}>
                      {new Date(e.t).toLocaleDateString()} · {e.kind}
                      {e.topicId ? ` · ${topics.find((t) => t.id === e.topicId)?.title ?? e.topicId}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
