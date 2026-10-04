// Usage: node scripts/validate-exam.ts <paperId>   (e.g. exam-n1)
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { TOPIC_META } from "../lib/topics/meta.ts";
import { validateExamPaper } from "../lib/validate.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const id = process.argv[2];
const file = path.join(root, "lib", "exam", `${id}.ts`);
if (!id || !existsSync(file)) {
  console.error(`No file lib/exam/${id}.ts`);
  process.exit(2);
}
const { paper } = await import(pathToFileURL(file).href);
if (paper?.id !== id) {
  console.error(`lib/exam/${id}.ts must export \`paper\` with id "${id}"`);
  process.exit(1);
}
const sections = Object.fromEntries(TOPIC_META.map((t) => [t.id, t.sections.map((s) => s.id)]));
const { issues, counts } = validateExamPaper(paper, sections, 30);
const missingTopics = TOPIC_META.map((t) => t.id).filter((t) => !counts.byTopic[t]);
console.log(JSON.stringify({ paper: id, calculator: paper.calculator, minutes: paper.minutes, counts, topicsNotCovered: missingTopics }, null, 1));
if (issues.length) {
  console.log(`\n${issues.length} issue(s):`);
  for (const i of issues) console.log(`- ${i.where}: ${i.problem}`);
  process.exit(1);
}
console.log("\nOK — no issues.");
