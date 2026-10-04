// Usage: node scripts/blind-compare.ts <topicId|exam> <outDir>
// Reads <outDir>/<id>.answers*.json ([{id, answer}] — answer is the option index for MCQ or the
// typed answer string) and reports every disagreement with the answer key.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { ExamPaper, Paper, Question, TopicPractice } from "../lib/types.ts";
import { checkAnswer, displayAnswer } from "../lib/answerCheck.ts";

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
const byId = new Map(qs.map((q) => [q.id, q]));
const answers: { id: string; answer: unknown; note?: string }[] = [];
for (const f of readdirSync(outDir).filter((f) => f.startsWith(`${id}.answers`) && f.endsWith(".json"))) {
  answers.push(...JSON.parse(readFileSync(path.join(outDir, f), "utf8")));
}
const answered = new Set(answers.map((a) => a.id));
const mismatches: unknown[] = [];
let agree = 0;
for (const a of answers) {
  const q = byId.get(a.id);
  if (!q) continue;
  if (q.kind === "mcq") {
    if (Number(a.answer) === q.answerIndex) agree++;
    else mismatches.push({ id: q.id, kind: "mcq", solver: { index: a.answer, text: q.options[Number(a.answer)] }, key: { index: q.answerIndex, text: q.options[q.answerIndex] }, solverNote: a.note });
  } else if (q.kind === "short") {
    const r = checkAnswer(q.answer, String(a.answer ?? ""));
    if (r.status === "correct") agree++;
    else mismatches.push({ id: q.id, kind: "short", solver: a.answer, checker: r, key: displayAnswer(q.answer), spec: q.answer, solverNote: a.note });
  }
}
const unanswered = qs.filter((q) => q.kind !== "written" && !answered.has(q.id)).map((q) => q.id);
const report = { topic: id, compared: answers.length, agree, mismatches: mismatches.length, unanswered: unanswered.length };
writeFileSync(path.join(outDir, `${id}.mismatches.json`), JSON.stringify({ report, mismatches, unanswered }, null, 1));
console.log(JSON.stringify(report));
