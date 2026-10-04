import type { Metadata } from "next";
import Link from "next/link";
import type { FormulaFact, Topic } from "@/lib/types";
import { TOPICS } from "@/lib/server/content";
import { STRANDS } from "@/lib/topics/meta";
import { Rich, RichInline } from "@/components/Rich";
import { PrintButton, PrintStyles } from "@/components/Certificate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Formula & facts sheet",
  description: "Every key Year 8 maths formula and fact in one place, grouped by strand and topic — print it for revision.",
};

const STRAND_STYLE: Record<string, { text: string; border: string; dot: string }> = {
  Number: { text: "text-s-number", border: "border-s-number", dot: "bg-s-number" },
  "Ratio & Proportion": { text: "text-s-ratio", border: "border-s-ratio", dot: "bg-s-ratio" },
  Algebra: { text: "text-s-algebra", border: "border-s-algebra", dot: "bg-s-algebra" },
  "Geometry & Measure": { text: "text-s-geometry", border: "border-s-geometry", dot: "bg-s-geometry" },
  "Statistics & Probability": { text: "text-s-stats", border: "border-s-stats", dot: "bg-s-stats" },
};

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** A topic's formula list (tolerates a guide still being written without one). */
const formulasOf = (t: Topic): FormulaFact[] => t.learn?.formulas ?? [];

export default function FormulasPage() {
  const groups = STRANDS.map((strand) => ({
    strand,
    topics: TOPICS.filter((t) => t.strand === strand && formulasOf(t).length > 0),
  })).filter((g) => g.topics.length > 0);
  const formulaCount = groups.reduce((n, g) => n + g.topics.reduce((m, t) => m + formulasOf(t).length, 0), 0);
  const topicCount = groups.reduce((n, g) => n + g.topics.length, 0);

  return (
    <div className="space-y-6 print:space-y-3">
      <PrintStyles orientation="portrait" margin="12mm" />
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl print:text-xl">Formula &amp; facts sheet</h1>
          <p className="mt-1 max-w-2xl text-ink-2 print:hidden">Every key formula and fact from the lessons in one place. Keep it open while you practise, or print it for revision.</p>
          {formulaCount ? (
            <p className="mt-1 text-sm font-bold text-ink-2 print:text-xs print:font-normal">
              {formulaCount} formulas &amp; facts · {topicCount} topic{topicCount === 1 ? "" : "s"}
              <span className="hidden print:inline"> · Year 8 Maths Lab</span>
            </p>
          ) : null}
        </div>
        {formulaCount ? <PrintButton label="Print sheet" /> : null}
      </header>

      {groups.length > 1 ? (
        <nav className="no-print flex flex-wrap gap-2" aria-label="Jump to a strand">
          {groups.map((g) => (
            <a key={g.strand} href={`#strand-${slug(g.strand)}`} className="btn btn-secondary btn-sm min-h-10">
              <span aria-hidden className={`h-2 w-2 rounded-full ${STRAND_STYLE[g.strand]?.dot ?? "bg-brand"}`} />
              {g.strand}
            </a>
          ))}
        </nav>
      ) : null}

      {!groups.length ? (
        <section className="card p-6 text-center sm:p-8">
          <div className="text-4xl" aria-hidden>
            📋
          </div>
          <h2 className="mt-2 text-xl font-extrabold">The formula sheet is on its way</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-2">It fills up automatically as topic lessons are published. In the meantime, every lesson has its own key points.</p>
          <Link href="/topics" className="btn btn-primary mt-5">
            Browse topics
          </Link>
        </section>
      ) : (
        groups.map((g) => {
          const st = STRAND_STYLE[g.strand] ?? { text: "text-brand", border: "border-brand", dot: "bg-brand" };
          return (
            <section key={g.strand} id={`strand-${slug(g.strand)}`} className="scroll-mt-20" aria-labelledby={`strand-${slug(g.strand)}-h`}>
              <h2 id={`strand-${slug(g.strand)}-h`} className={`mb-3 flex items-center gap-2 text-lg font-black break-after-avoid print:mb-2 print:text-base ${st.text}`}>
                <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${st.dot}`} />
                {g.strand}
              </h2>
              <div className="gap-4 md:columns-2 print:columns-2 print:gap-5">
                {g.topics.map((t) => (
                  <article
                    key={t.id}
                    className={`card mb-4 break-inside-avoid border-l-4 p-4 print:mb-3 print:rounded-lg print:p-2.5 print:text-[10pt] print:shadow-none ${st.border}`}
                    aria-labelledby={`f-${t.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 id={`f-${t.id}`} className="font-extrabold leading-snug">
                        <span aria-hidden>{t.icon} </span>
                        {t.title}
                      </h3>
                      <Link href={`/topic/${t.id}?tab=learn`} className="no-print -my-2 inline-flex min-h-10 shrink-0 items-center rounded-lg px-2 text-sm font-bold text-brand hover:bg-brand-soft" aria-label={`${t.title} lessons`}>
                        Lessons →
                      </Link>
                    </div>
                    <dl className="mt-2 divide-y divide-line">
                      {formulasOf(t).map((f, i) => (
                        <div key={`${t.id}-${i}`} className="py-2 first:pt-0 last:pb-0 print:py-1.5">
                          <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2 print:text-[8pt]">
                            <RichInline text={f.name} />
                          </dt>
                          <dd className="mt-0.5">
                            <Rich text={f.formula} className="text-[1.05rem] font-semibold text-ink print:text-[10.5pt]" />
                            {f.note ? <Rich text={f.note} className="mt-0.5 text-sm text-ink-2 print:text-[8.5pt]" /> : null}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
