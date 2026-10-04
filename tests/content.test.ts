// Every topic, drill set and exam paper passes structural + answer-key self-checks,
// and question ids are unique across the whole app.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { TOPIC_META } from "../lib/topics/meta.ts";
import { validateExamPaper, validateTopic } from "../lib/validate.ts";
import type { Paper, Topic, TopicGuide, TopicPractice, ExamPaper } from "../lib/types.ts";
import type { Drill } from "../lib/drills/types.ts";
import { makeRng } from "../lib/drills/rng.ts";
import { specSelfCheck } from "../lib/answerCheck.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = async <T>(rel: string, name: string): Promise<T | undefined> => {
  const p = path.join(root, rel);
  return existsSync(p) ? ((await import(pathToFileURL(p).href))[name] as T) : undefined;
};

test("all topics validate and ids are globally unique", async () => {
  const seen = new Set<string>();
  const problems: string[] = [];
  for (const m of TOPIC_META) {
    const guide = await load<TopicGuide>(`lib/topics/${m.id}/guide.ts`, "guide");
    if (!guide) continue;
    const practice = await load<TopicPractice>(`lib/topics/${m.id}/practice.ts`, "practice");
    const topic: Topic = {
      ...guide,
      quiz: practice?.quiz ?? [],
      mcqPapers: (await load<Paper[]>(`lib/topics/${m.id}/mcq.ts`, "mcqPapers")) ?? [],
      practicePapers: [...(practice?.papers ?? []), ...((await load<Paper[]>(`lib/topics/${m.id}/practice2.ts`, "morePapers")) ?? [])],
      challenge: practice?.challenge ?? [],
    };
    const { issues } = validateTopic(topic, seen);
    for (const i of issues) problems.push(`${i.where}: ${i.problem}`);
  }
  const sections = Object.fromEntries(TOPIC_META.map((t) => [t.id, t.sections.map((s) => s.id)]));
  for (const e of ["exam-n1", "exam-c1", "exam-n2", "exam-c2"]) {
    const paper = await load<ExamPaper>(`lib/exam/${e}.ts`, "paper");
    if (!paper) continue;
    const { issues } = validateExamPaper(paper, sections, 30);
    for (const i of issues) problems.push(`${i.where}: ${i.problem}`);
    for (const q of paper.questions) {
      if (seen.has(q.id)) problems.push(`${q.id}: duplicate id`);
      seen.add(q.id);
    }
  }
  assert.deepEqual(problems.slice(0, 30), []);
});

test("all drills generate valid, self-consistent items", async () => {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const m of TOPIC_META) {
    const drills = await load<Drill[]>(`lib/drills/${m.id}.ts`, "drills");
    if (!drills) continue;
    for (const d of drills) {
      if (ids.has(d.id)) problems.push(`${d.id}: duplicate drill id`);
      ids.add(d.id);
      for (const tier of [1, 2, 3] as const) {
        for (let seed = 1; seed <= 40; seed++) {
          try {
            const item = d.generate(makeRng(seed * 104729 + tier), tier);
            const r = specSelfCheck(item.answer);
            if (r.status !== "correct") problems.push(`${d.id} t${tier} s${seed}: answer fails self-check`);
            if (!item.prompt || !item.solution?.length) problems.push(`${d.id} t${tier} s${seed}: empty prompt/solution`);
          } catch (e) {
            problems.push(`${d.id} t${tier} s${seed}: threw ${(e as Error).message}`);
          }
        }
      }
    }
  }
  assert.deepEqual(problems.slice(0, 30), []);
});
