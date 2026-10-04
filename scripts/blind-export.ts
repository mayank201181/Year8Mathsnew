// Usage: node scripts/blind-export.ts <topicId|exam> <outDir>
// Writes <outDir>/<topic>.questions.json: every MCQ + short question WITHOUT answer keys,
// for independent "blind" solving. Form requirements are included (not values).
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { AnswerSpec, ExamPaper, Paper, Question, TopicPractice } from "../lib/types.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [id, outDir] = process.argv.slice(2);
const load = async <T>(rel: string, name: string): Promise<T | undefined> => {
  const p = path.join(root, rel);
  return existsSync(p) ? ((await import(pathToFileURL(p).href))[name] as T) : undefined;
};

let qs: Question[] = [];
if (id === "exam") {
  for (const e of ["exam-n1", "exam-c1", "exam-n2", "exam-c2"]) qs.push(...(((await load<ExamPaper>(`lib/exam/${e}.ts`, "paper"))?.questions) ?? []));
} else {
  const practice = await load<TopicPractice>(`lib/topics/${id}/practice.ts`, "practice");
  qs = [
    ...(practice?.quiz ?? []),
    ...((await load<Paper[]>(`lib/topics/${id}/mcq.ts`, "mcqPapers")) ?? []).flatMap((p) => p.questions),
    ...(practice?.papers ?? []).flatMap((p) => p.questions),
    ...((await load<Paper[]>(`lib/topics/${id}/practice2.ts`, "morePapers")) ?? []).flatMap((p) => p.questions),
    ...(practice?.challenge ?? []),
  ];
}

function form(a: AnswerSpec): string {
  switch (a.type) {
    case "number": return `a single number${a.allowFraction === false ? " (as a decimal, not a fraction)" : ""}${a.standardForm ? " in standard form like 3.2 x 10^4" : ""}`;
    case "fraction": return `a fraction${a.simplest ? " in simplest form" : ""}${a.form === "mixed" ? " written as a mixed number like 2 1/3" : a.form === "improper" ? " written as an improper fraction" : ""}`;
    case "list": return `${a.values.length} numbers separated by commas${a.ordered ? " IN THE ORDER THE QUESTION ASKS (e.g. coordinates (x, y))" : " (any order)"}`;
    case "ratio": return `a ratio with ${a.parts.length} parts like 3:4${a.simplest ? " in simplest form" : ""}`;
    case "expression": return `an algebraic expression in plain text like 3x+2 or 2(x-1)${a.form && a.form !== "any" ? ` (${a.form})` : ""}`;
    case "text": return "a short word/phrase/inequality";
  }
}

const out = qs
  .filter((q) => q.kind !== "written")
  .map((q) =>
    q.kind === "mcq"
      ? { id: q.id, kind: "mcq", question: q.question, hasDiagram: !!q.diagram, diagram: q.diagram, options: q.options.map((o, i) => ({ i, text: o })) }
      : { id: q.id, kind: "short", question: q.question, hasDiagram: !!q.diagram, diagram: q.diagram, answerFormat: form(q.answer) },
  );
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, `${id}.questions.json`), JSON.stringify(out, null, 1));
console.log(`${out.length} questions → ${path.join(outDir, `${id}.questions.json`)}`);
