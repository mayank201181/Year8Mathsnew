"use client";

import Link from "next/link";
import { useMemo } from "react";
import { topics, STRANDS } from "@/lib/topics";
import { useStore } from "@/lib/store";
import { rankForStars, nextRank } from "@/lib/ranks";

export default function HomePage() {
  const { progress, activeProfile } = useStore();
  const rank = rankForStars(progress.stars);
  const nr = nextRank(progress.stars);
  const dueCount = useMemo(
    () => progress.srs.filter((s) => s.due <= Date.now()).length,
    [progress.srs]
  );
  const goalSecs = progress.goalMinutes * 60;
  const todaySecs = progress.analytics.perDay[new Date().toISOString().slice(0, 10)] ?? 0;
  const goalPct = Math.min(100, Math.round((todaySecs / goalSecs) * 100));

  return (
    <div className="space-y-8">
      {/* Dashboard */}
      <section className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 bg-gradient-to-br from-indigo-600/30 to-teal-500/20 border border-indigo-500/30 rounded-2xl p-5">
          <p className="text-sm text-indigo-200">
            Hello {activeProfile?.name ?? "there"} 👋
          </p>
          <h1 className="text-2xl font-extrabold mt-1">
            {rank.emoji} {rank.name}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span>⭐ {progress.stars} stars</span>
            <span>🔥 {progress.streak}-day streak</span>
          </div>
          {nr && (
            <div className="mt-3">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-teal-400"
                  style={{ width: `${Math.min(100, (progress.stars / nr.minStars) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {nr.minStars - progress.stars} stars to {nr.name} {nr.emoji}
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 flex flex-col">
          <p className="text-sm text-slate-400">Today&apos;s goal</p>
          <p className="text-3xl font-bold mt-1">
            {Math.round(todaySecs / 60)}
            <span className="text-base text-slate-500"> / {progress.goalMinutes} min</span>
          </p>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-400" style={{ width: `${goalPct}%` }} />
          </div>
          {dueCount > 0 ? (
            <Link
              href="/review"
              className="mt-auto pt-3 text-sm font-semibold text-amber-300 hover:underline"
            >
              🔁 {dueCount} review{dueCount > 1 ? "s" : ""} due →
            </Link>
          ) : (
            <p className="mt-auto pt-3 text-xs text-slate-500">No reviews due — nice and clear!</p>
          )}
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/exam", emoji: "📝", label: "Big Exam" },
          { href: "/review", emoji: "🔁", label: "Review" },
          { href: "/progress", emoji: "📊", label: "Progress" },
          { href: `/topic/${topics[0].id}`, emoji: "🎲", label: "Surprise me" },
        ].map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="bg-slate-900/70 border border-slate-700 rounded-xl p-3 text-center hover:border-indigo-500"
          >
            <div className="text-2xl">{a.emoji}</div>
            <div className="text-sm mt-1">{a.label}</div>
          </Link>
        ))}
      </section>

      {/* Topics by strand */}
      {STRANDS.map((strand) => {
        const strandTopics = topics.filter((t) => t.strand === strand);
        if (strandTopics.length === 0) return null;
        return (
          <section key={strand}>
            <h2 className="text-lg font-bold mb-3 text-slate-200">{strand}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {strandTopics.map((t) => {
                const tAttempts = progress.analytics.perTopic[t.id];
                return (
                  <Link
                    key={t.id}
                    href={`/topic/${t.id}`}
                    className="group bg-slate-900/70 border border-slate-700 rounded-2xl p-4 hover:border-indigo-500 hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{t.icon}</span>
                      <div>
                        <h3 className="font-bold group-hover:text-indigo-300">{t.title}</h3>
                        <p className="text-xs text-slate-400">
                          {t.guide.length} sections · {t.quiz.mcq.length + t.quiz.qa.length} practice Qs
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">{t.intro}</p>
                    {tAttempts && (
                      <p className="text-xs text-emerald-400 mt-2">
                        {tAttempts.correct}/{tAttempts.attempts} correct so far
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
