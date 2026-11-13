"use client";
import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITCOM_EPISODES, sitcomEpisodeFor } from "@/lib/sitcom";
import { useWatchedEpisodes } from "./EpisodePlayer";

export interface WatchTopicItem {
  id: string;
  num: number;
  title: string;
  icon: string;
  strand: string;
  summary: string;
}

function subscribeStorage(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getStorageSnapshot(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("y8m2:watch-v1") ?? "";
  } catch {
    return "";
  }
}

function getServerStorageSnapshot(): string {
  return "";
}

export function WatchHub({ topics }: { topics: WatchTopicItem[] }) {
  const [strand, setStrand] = useState<string>("All");
  const raw = useSyncExternalStore(subscribeStorage, getStorageSnapshot, getServerStorageSnapshot);
  const epDone = useWatchedEpisodes();

  let mcDone: Record<string, boolean> = {};
  let scDone: Record<string, boolean> = {};
  if (raw) {
    try {
      const p = JSON.parse(raw) as {
        completedMc?: Record<string, boolean>;
        completedSitcom?: Record<string, boolean>;
      };
      mcDone = p.completedMc ?? {};
      scDone = p.completedSitcom ?? {};
    } catch {
      // Ignore malformed storage JSON
    }
  }

  const strands = ["All", "Number", "Ratio & Proportion", "Algebra", "Geometry & Measure", "Statistics & Probability"];
  const visible = strand === "All" ? topics : topics.filter((t) => t.strand === strand);
  const totalCompleted = Object.keys(mcDone).length + Object.keys(scDone).length;

  return (
    <div className="space-y-6 pb-8">
      {SITCOM_EPISODES.length ? (
        <Link href="/episodes" className="card flex items-center gap-4 border-2 border-brand p-4 transition-colors hover:bg-brand-soft/40 sm:p-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7c3aed] text-3xl" aria-hidden>📺</span>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-black">Sitcom Episodes: &ldquo;Totally Raotional&rdquo;</div>
            <p className="text-sm text-ink-2">
              {SITCOM_EPISODES.length} animated episodes, one per topic. Sarcasm, a 100-eyed calculator monster and pause challenges. Binge mode included.
            </p>
          </div>
          <span className="chip shrink-0">⭐ {Object.keys(epDone).length}/{SITCOM_EPISODES.length}</span>
        </Link>
      ) : null}
      <section className="card overflow-hidden p-5 sm:p-6">
        <div className="grid items-center gap-5 md:grid-cols-12">
          <div className="space-y-3 md:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip border-0 bg-brand-soft text-brand">20 Studio Whiteboards</span>
              <span className="chip border-0 bg-accent-soft text-warn">20 Beast-Mode Sitcoms</span>
              <span className="chip">⭐ {totalCompleted}/40 Watched</span>
            </div>
            <h1 className="text-2xl font-black leading-tight sm:text-3xl">
              Maths Coaching Studio &amp; Beast-Mode Sitcom TV
            </h1>
            <p className="text-sm text-ink-2 sm:text-base">
              Learn every Year 8 concept visually with <strong>Professor Pi&apos;s Interactive Whiteboards</strong>, then binge-watch <strong>Zara, Groggle &amp; Pippa</strong> roasting classic exam traps in Season 1!
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href="/season1/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                👾 Full-Screen Beast TV (/season1)
              </a>
              <a href="/masterclass/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                🎓 Full-Screen Studio (/masterclass)
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <Image
              src="/coaching/assets/hero.jpg"
              alt="Beast Mode Maths Academy cast around a glowing geometry table"
              width={960}
              height={540}
              className="h-auto w-full rounded-2xl border border-line object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {strands.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStrand(s)}
            className={`btn btn-sm ${strand === s ? "btn-primary" : "btn-secondary"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((t) => {
          const ep = sitcomEpisodeFor(t.id);
          return (
          <article key={t.id} className="card flex flex-col justify-between gap-3 p-4">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="chip">
                  {t.icon} Ep {String(t.num).padStart(2, "0")} · {t.strand}
                </span>
                <div className="flex gap-1">
                  {mcDone[t.id] ? <span className="chip border-0 bg-good-soft text-good">🎓✓</span> : null}
                  {scDone[t.id] ? <span className="chip border-0 bg-good-soft text-good">👾✓</span> : null}
                  {epDone[t.id] ? <span className="chip border-0 bg-good-soft text-good">📺✓</span> : null}
                </div>
              </div>
              <h2 className="mt-2 text-lg font-extrabold">{t.title}</h2>
            </div>
            <div className={`grid gap-2 pt-1 ${ep ? "grid-cols-3" : "grid-cols-2"}`}>
              {ep ? (
                <Link href={`/topic/${t.id}?tab=watch&mode=episode`} className="btn btn-primary btn-sm">
                  📺 Episode
                </Link>
              ) : null}
              <Link href={`/topic/${t.id}?tab=watch&mode=masterclass`} className="btn btn-secondary btn-sm">
                🎓 Whiteboard
              </Link>
              <Link href={`/topic/${t.id}?tab=watch&mode=sitcom`} className={`btn btn-sm ${ep ? "btn-secondary" : "btn-primary"}`}>
                👾 Beast Sitcom
              </Link>
            </div>
          </article>
          );
        })}
      </div>
    </div>
  );
}
