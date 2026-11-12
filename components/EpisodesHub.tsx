"use client";
// /episodes — every "Totally Raotional" episode in one place: a player plus a playlist,
// with an optional binge mode that rolls straight into the next episode.
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SITCOM_EPISODES } from "@/lib/sitcom";
import { EpisodePlayer, formatDuration, useWatchedEpisodes } from "./EpisodePlayer";

export function EpisodesHub() {
  const router = useRouter();
  const params = useSearchParams();
  const watched = useWatchedEpisodes();
  const [binge, setBinge] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const eps = SITCOM_EPISODES;
  const requested = Number(params.get("ep"));
  const current = eps.find((e) => e.num === requested) ?? eps.find((e) => !watched[e.topicId]) ?? eps[0];
  const watchedCount = eps.filter((e) => watched[e.topicId]).length;
  const totalMin = Math.round(eps.reduce((s, e) => s + e.durationSec, 0) / 60);

  if (!current) {
    return <p className="card p-6 text-ink-2">Episodes are on their way — check back soon.</p>;
  }

  const pick = (num: number, play: boolean) => {
    setAutoPlay(play);
    router.replace(`/episodes?ep=${num}`, { scroll: false });
    if (play) window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = eps[eps.indexOf(current) + 1];

  return (
    <div className="space-y-5 pb-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="chip border-0 bg-brand-soft text-brand">📺 Season 1 · {eps.length} episodes · {totalMin} min</span>
            <span className="chip">⭐ {watchedCount}/{eps.length} watched</span>
          </div>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Totally Raotional</h1>
          <p className="text-sm text-ink-2">
            One sarcastic family, one 100-eyed calculator monster, every Year 8 topic. Each episode ends with three pause challenges.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-bold">
          <input type="checkbox" checked={binge} onChange={(e) => setBinge(e.target.checked)} className="h-5 w-5" />
          Binge mode (auto-play next)
        </label>
      </header>

      <section className="card overflow-hidden p-1 sm:p-2">
        <EpisodePlayer episode={current} autoPlay={autoPlay} onEnded={() => (binge && next ? pick(next.num, true) : undefined)} />
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-3 pb-1">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wide text-brand">
              Episode {current.num} · {current.topicShort}
            </div>
            <h2 className="text-lg font-extrabold">&ldquo;{current.title}&rdquo;</h2>
            {current.logline ? <p className="text-sm text-ink-2">{current.logline}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/topic/${current.topicId}?tab=practise`} className="btn btn-secondary btn-sm">
              ✏️ Practise this topic
            </Link>
            {next ? (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => pick(next.num, true)}>
                Next: Ep {next.num} →
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-extrabold">All episodes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {eps.map((e) => (
            <button
              key={e.num}
              type="button"
              onClick={() => pick(e.num, true)}
              className={`card overflow-hidden p-0 text-left transition-colors hover:border-brand ${
                e.num === current.num ? "border-2 border-brand" : ""
              }`}
            >
              <div className="relative">
                <Image src={e.poster} alt="" width={640} height={360} className="aspect-video w-full object-cover" />
                <span className="absolute right-2 bottom-2 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-bold text-white">
                  {formatDuration(e.durationSec)}
                </span>
                {watched[e.topicId] ? (
                  <span className="absolute top-2 left-2 rounded-md bg-good px-1.5 py-0.5 text-xs font-bold text-white">Watched ✓</span>
                ) : null}
              </div>
              <div className="p-3">
                <div className="text-xs font-bold text-brand">
                  Ep {e.num} · {e.topicShort}
                </div>
                <div className="font-extrabold leading-snug">{e.title}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
