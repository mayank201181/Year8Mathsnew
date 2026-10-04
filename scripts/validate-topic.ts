// Usage: node scripts/validate-topic.ts <topicId> [--quiet]
// Validates whichever of lib/topics/<id>/{guide,mcq,practice,practice2}.ts exist.
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import type { Paper, Topic, TopicGuide, TopicPractice } from "../lib/types.ts";
import { metaById } from "../lib/topics/meta.ts";
import { validateTopic, type Issue } from "../lib/validate.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const id = process.argv[2];
const quiet = process.argv.includes("--quiet");
const meta = id ? metaById(id) : undefined;
if (!meta) {
  console.error(`Unknown topic id "${id}"`);
  process.exit(2);
}
const dir = path.join(root, "lib", "topics", id);
async function load<T>(file: string, name: string): Promise<T | undefined> {
  const p = path.join(dir, file);
  if (!existsSync(p)) return undefined;
  const mod = await import(pathToFileURL(p).href);
  if (!(name in mod)) throw new Error(`${file} must export "${name}"`);
  return mod[name] as T;
}

const issues: Issue[] = [];
const guide = await load<TopicGuide>("guide.ts", "guide");
const mcqPapers = (await load<Paper[]>("mcq.ts", "mcqPapers")) ?? [];
const practice = await load<TopicPractice>("practice.ts", "practice");
const practice2 = (await load<Paper[]>("practice2.ts", "morePapers")) ?? [];

const stubGuide: TopicGuide = {
  id,
  title: meta.title,
  strand: meta.strand,
  icon: meta.icon,
  summary: "stub",
  intro: "stub",
  guide: meta.sections.map((s) => ({ id: s.id, heading: s.heading, body: "stub" })),
  learn: { flashcards: [], mustKnow: [], misconceptions: [], examMistakes: [], mnemonics: [], realWorld: [], videos: [], formulas: [] },
};
const g = guide ?? stubGuide;
const topic: Topic = {
  ...g,
  quiz: practice?.quiz ?? [],
  mcqPapers,
  practicePapers: [...(practice?.papers ?? []), ...practice2],
  challenge: practice?.challenge ?? [],
};

// Guide must use exactly the planned section ids, in order.
if (guide) {
  const want = meta.sections.map((s) => s.id).join(",");
  const got = guide.guide.map((s) => s.id).join(",");
  if (want !== got) issues.push({ where: `${id}.guide`, problem: `section ids must be exactly [${want}] in that order; got [${got}]` });
  if (guide.id !== id) issues.push({ where: `${id}.guide`, problem: `guide.id must be "${id}"` });
  const L = guide.learn;
  const need: Array<[string, number, number]> = [
    ["flashcards", L.flashcards.length, 12], ["mustKnow", L.mustKnow.length, 8], ["misconceptions", L.misconceptions.length, 5],
    ["examMistakes", L.examMistakes.length, 6], ["mnemonics", L.mnemonics.length, 2], ["realWorld", L.realWorld.length, 4],
    ["videos", L.videos.length, 3], ["formulas", L.formulas.length, 3],
  ];
  for (const [k, n, min] of need) if (n < min) issues.push({ where: `${id}.learn.${k}`, problem: `has ${n}, needs at least ${min}` });
  guide.guide.forEach((s) => {
    if (!s.discovery) issues.push({ where: `${id}.guide[${s.id}]`, problem: "missing discovery opener" });
    if (!s.whyItWorks) issues.push({ where: `${id}.guide[${s.id}]`, problem: "missing whyItWorks" });
    if (!s.workedExamples?.length) issues.push({ where: `${id}.guide[${s.id}]`, problem: "needs at least one worked example" });
    else if (!s.workedExamples.some((w) => w.yourTurn)) issues.push({ where: `${id}.guide[${s.id}]`, problem: "at least one worked example needs a yourTurn" });
    if (!s.keyPoints?.length) issues.push({ where: `${id}.guide[${s.id}]`, problem: "missing keyPoints" });
    if (!s.strategies?.length) issues.push({ where: `${id}.guide[${s.id}]`, problem: "missing strategies" });
  });
  const diagrams = guide.guide.filter((s) => s.diagram).length;
  if (diagrams < Math.min(4, guide.guide.length)) issues.push({ where: `${id}.guide`, problem: `only ${diagrams} sections have a diagram; need at least 4` });
}

// Expected shapes.
const expectPapers = (papers: Paper[], prefix: string, nums: number[], per: number, label: string) => {
  const ids = papers.map((p) => p.id);
  const want = nums.map((n) => `${id}-${prefix}${n}`);
  if (ids.join(",") !== want.join(",")) issues.push({ where: label, problem: `paper ids must be [${want.join(", ")}]; got [${ids.join(", ")}]` });
  for (const p of papers) {
    if (p.questions.length !== per) issues.push({ where: p.id, problem: `has ${p.questions.length} questions, needs ${per}` });
    p.questions.forEach((q, i) => {
      const wantId = `${p.id}-q${String(i + 1).padStart(2, "0")}`;
      if (q.id !== wantId) issues.push({ where: `${p.id}[${i}]`, problem: `id should be ${wantId} (got ${q.id})` });
    });
  }
};
if (mcqPapers.length) expectPapers(mcqPapers, "m", [1, 2, 3, 4], 20, "mcq.ts");
if (practice) {
  expectPapers(practice.papers, "p", [1, 2], 20, "practice.ts");
  if (practice.quiz.length !== 10) issues.push({ where: "practice.quiz", problem: `has ${practice.quiz.length}, needs 10` });
  practice.quiz.forEach((q, i) => { const w = `${id}-quiz-q${String(i + 1).padStart(2, "0")}`; if (q.id !== w) issues.push({ where: `quiz[${i}]`, problem: `id should be ${w}` }); });
  if (practice.challenge.length !== 10) issues.push({ where: "practice.challenge", problem: `has ${practice.challenge.length}, needs 10` });
  practice.challenge.forEach((q, i) => { const w = `${id}-ch-q${String(i + 1).padStart(2, "0")}`; if (q.id !== w) issues.push({ where: `challenge[${i}]`, problem: `id should be ${w}` }); });
}
if (practice2.length) expectPapers(practice2, "p", [3, 4], 20, "practice2.ts");

const { issues: vIssues, counts } = validateTopic(topic);
issues.push(...vIssues);

// Every guide section should be practised somewhere.
const refs = new Set([...topic.quiz, ...topic.mcqPapers.flatMap((p) => p.questions), ...topic.practicePapers.flatMap((p) => p.questions), ...topic.challenge].map((q) => q.guideRef).filter(Boolean));
const unreferenced = meta.sections.filter((s) => !refs.has(s.id)).map((s) => s.id);

const summary = {
  topic: id,
  files: { guide: !!guide, mcq: mcqPapers.length > 0, practice: !!practice, practice2: practice2.length > 0 },
  counts,
  sectionsNeverReferenced: unreferenced,
  issueCount: issues.length,
};
console.log(JSON.stringify(summary, null, 1));
if (issues.length) {
  console.log(`\n${issues.length} issue(s):`);
  for (const i of quiet ? issues.slice(0, 40) : issues) console.log(`- ${i.where}: ${i.problem}`);
  process.exit(1);
}
console.log("\nOK — no issues.");
