"use client";
// One skill: breadcrumbs, a link back to the lesson, unlimited adaptive
// practice (DrillRunner) and the other skills in the same topic.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { drillById, drillsForTopic } from "@/lib/drills";
import { metaById } from "@/lib/topics/meta";
import { isRusty, skillLevel } from "@/lib/learning";
import { useStore } from "@/lib/store";
import { DrillRunner, LevelBadge } from "./DrillRunner";

const DRILL_STAGE: Record<1 | 2 | 3, string> = { 1: "Basics", 2: "Core", 3: "Multi-step" };

/**
 * @param topicReady false when the skill's topic has no page yet (guide still
 *   being written): the topic and lesson links are then left out.
 */
export function DrillPage({ skillId, topicReady = true }: { skillId: string; topicReady?: boolean }) {
  const router = useRouter();
  const { data, setLast } = useStore();
  const drill = drillById(skillId);
  const meta = drill ? metaById(drill.topicId) : undefined;
  const drills = drill ? [drill] : [];
  const siblings = drill ? drillsForTopic(drill.topicId).filter((d) => d.id !== drill.id) : [];
  const recorded = useRef<string | null>(null);

  useEffect(() => {
    if (!drill || recorded.current === drill.id) return;
    recorded.current = drill.id;
    setLast(`/drill/${drill.id}`, drill.title, drill.topicId);
  }, [drill, setLast]);

  if (!drill) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="text-5xl" aria-hidden>
          🧭
        </div>
        <h1 className="mt-2 text-2xl font-extrabold">We couldn&apos;t find that skill</h1>
        <p className="mt-2 text-ink-2">It may have been renamed in the new version of the Maths Lab.</p>
        <Link href="/skills" className="btn btn-primary mt-6">
          Open the skills map
        </Link>
      </div>
    );
  }

  const topicHref = topicReady ? `/topic/${drill.topicId}?tab=practise` : null;
  const section = drill.guideRef ? meta?.sections.find((s) => s.id === drill.guideRef) : undefined;
  const lessonHref = drill.guideRef ? `/topic/${drill.topicId}?tab=learn#sec-${drill.guideRef}` : `/topic/${drill.topicId}?tab=learn`;
  const skill = data.skills[drill.id];
  const rusty = isRusty(skill);

  function exit() {
    if (window.history.length > 1) router.back();
    else router.push(topicHref ?? "/skills");
  }

  const topicLabel = meta ? (
    <>
      <span aria-hidden>{meta.icon}</span> {meta.title}
    </>
  ) : (
    "Topic"
  );

  return (
    <div className="space-y-5">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-ink-2">
          <li>
            <Link href="/topics" className="hover:text-ink hover:underline">
              Topics
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            {topicHref ? (
              <Link href={topicHref} className="hover:text-ink hover:underline">
                {topicLabel}
              </Link>
            ) : (
              <span>{topicLabel}</span>
            )}
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="font-bold text-ink">
            {drill.title}
          </li>
        </ol>
      </nav>

      <h1 className="sr-only">{drill.title} — skill practice</h1>

      <div className="flex flex-wrap items-center gap-2">
        {topicReady ? (
          <Link href={lessonHref} className="btn btn-secondary text-sm">
            <span aria-hidden>📖</span> {section ? `Lesson: ${section.heading}` : "Revise the lesson"}
          </Link>
        ) : null}
        <Link href="/skills" className="btn btn-ghost text-sm">
          <span aria-hidden>🗺️</span> Skills map
        </Link>
        <span className="chip">{DRILL_STAGE[drill.level]}</span>
        {rusty ? <span className="chip border-0 bg-warn-soft text-warn">⟳ Rusty — a few right answers will refresh it</span> : null}
      </div>

      {/* key: a fresh session (tier, score) when moving to another skill. */}
      <DrillRunner key={drill.id} drills={drills} title={meta ? `${meta.icon} ${meta.title}` : "Skill practice"} onExit={exit} />

      {siblings.length ? (
        <section className="card p-4 sm:p-5" aria-labelledby="more-skills">
          <h2 id="more-skills" className="section-title">
            More skills in {meta?.title ?? "this topic"}
          </h2>
          <ul className="mt-3 divide-y divide-line">
            {siblings.map((d) => (
              <li key={d.id}>
                <Link href={`/drill/${encodeURIComponent(d.id)}`} className="-mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
                  <span className="min-w-0 flex-1 font-semibold">{d.title}</span>
                  <LevelBadge level={skillLevel(data.skills[d.id])} />
                  <span className="text-ink-2" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
