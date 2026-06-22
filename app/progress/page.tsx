"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { topics } from "@/lib/topics";
import { RANKS, rankForStars, nextRank } from "@/lib/ranks";

export default function ProgressPage() {
  const { progress, activeProfile, setGoalMinutes } = useStore();
  const rank = rankForStars(progress.stars);
  const nr = nextRank(progress.stars);

  const totals = useMemo(() => {
    const attempts = Object.values(progress.attempts);
    const tries = attempts.reduce((s, a) => s + a.attempts, 0);
    const correct = attempts.reduce((s, a) => s + a.correct, 0);
    return { tries, correct, acc: tries ? Math.round((correct / tries) * 100) : 0 };
  }, [progress.attempts]);

  const last7 = useMemo(() => {
    const days: { d: string; mins: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      days.push({ d: date.slice(5), mins: Math.round((progress.analytics.perDay[date] ?? 0) / 60) });
    }
    return days;
  }, [progress.analytics.perDay]);
  const maxMins = Math.max(1, ...last7.map((d) => d.mins));

  const mastered = topics.filter((t) => {
    const a = progress.analytics.perTopic[t.id];
    return a && a.attempts >= 4 && a.correct / a.attempts >= 0.8;
  }).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">📊 Your progress</h1>

      <section className="grid sm:grid-cols-4 gap-3">
        {[
          { label: "Stars", value: progress.stars, emoji: "⭐" },
          { label: "Day streak", value: progress.streak, emoji: "🔥" },
          { label: "Accuracy", value: `${totals.acc}%`, emoji: "🎯" },
          { label: "Topics mastered", value: `${mastered}/${topics.length}`, emoji: "🏅" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
            <div className="text-2xl">{s.emoji}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">
            {rank.emoji} {rank.name}
          </h2>
          {nr && <span className="text-sm text-slate-400">Next: {nr.name} {nr.emoji}</span>}
        </div>
        {nr && (
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-teal-400"
              style={{ width: `${Math.min(100, (progress.stars / nr.minStars) * 100)}%` }}
            />
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {RANKS.map((r) => (
            <span
              key={r.name}
              className={`text-xs rounded-full px-2 py-0.5 ${
                progress.stars >= r.minStars ? "bg-indigo-500/30 text-indigo-200" : "bg-slate-800 text-slate-500"
              }`}
            >
              {r.emoji} {r.name}
            </span>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-bold mb-3">Last 7 days (minutes)</h2>
          <div className="flex items-end gap-2 h-28">
            {last7.map((d) => (
              <div key={d.d} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-teal-400 rounded-t"
                  style={{ height: `${(d.mins / maxMins) * 100}%`, minHeight: d.mins ? 4 : 0 }}
                  title={`${d.mins} min`}
                />
                <span className="text-[10px] text-slate-500">{d.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-bold mb-2">Daily goal</h2>
          <p className="text-sm text-slate-400 mb-2">{progress.goalMinutes} minutes a day</p>
          <input
            type="range"
            min={5}
            max={45}
            step={5}
            value={progress.goalMinutes}
            onChange={(e) => setGoalMinutes(Number(e.target.value))}
            className="w-full accent-indigo-400"
          />
          {mastered >= 3 && (
            <button
              onClick={() => window.print()}
              className="mt-4 w-full bg-indigo-500 hover:bg-indigo-400 rounded-lg py-2 text-sm font-semibold"
            >
              🖨 Print a certificate
            </button>
          )}
        </div>
      </section>

      {/* Certificate (shown for print) */}
      <section className="hidden print:block text-center border-4 border-indigo-500 rounded-2xl p-10">
        <h2 className="text-3xl font-extrabold">Certificate of Achievement</h2>
        <p className="mt-4 text-lg">This certifies that</p>
        <p className="text-2xl font-bold my-2">{activeProfile?.name ?? "Learner"}</p>
        <p>has earned {progress.stars} stars and mastered {mastered} Year 8 Maths topics.</p>
        <p className="mt-3 text-sm">{rank.emoji} {rank.name}</p>
      </section>

      <section className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
        <h2 className="font-bold mb-2">Topic accuracy</h2>
        <div className="space-y-1.5">
          {topics.map((t) => {
            const a = progress.analytics.perTopic[t.id];
            const acc = a && a.attempts ? Math.round((a.correct / a.attempts) * 100) : 0;
            return (
              <div key={t.id} className="flex items-center gap-2 text-sm">
                <span className="w-44 shrink-0 truncate">
                  {t.icon} {t.title}
                </span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${acc}%` }} />
                </div>
                <span className="w-16 text-right text-slate-400">
                  {a ? `${a.correct}/${a.attempts}` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
