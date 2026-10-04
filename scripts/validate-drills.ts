// Usage: node scripts/validate-drills.ts <topicId>
// Generates 200 items per drill per tier and checks every one.
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import type { Drill } from "../lib/drills/types.ts";
import { makeRng } from "../lib/drills/rng.ts";
import { metaById } from "../lib/topics/meta.ts";
import { checkSpec, checkSvg, checkText, checkTraps, type Issue } from "../lib/validate.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const id = process.argv[2];
const meta = id ? metaById(id) : undefined;
if (!meta) {
  console.error(`Unknown topic id "${id}"`);
  process.exit(2);
}
const mod = await import(pathToFileURL(path.join(root, "lib", "drills", `${id}.ts`)).href);
const drills: Drill[] = mod.drills;
const issues: Issue[] = [];
if (!Array.isArray(drills) || drills.length === 0) {
  console.error("lib/drills/<id>.ts must export `drills: Drill[]`");
  process.exit(1);
}
const sectionIds = new Set(meta.sections.map((s) => s.id));
const seen = new Set<string>();
const report: Record<string, unknown> = {};
for (const d of drills) {
  if (seen.has(d.id)) issues.push({ where: d.id, problem: "duplicate drill id" });
  seen.add(d.id);
  if (!d.id.startsWith(`${id}.`)) issues.push({ where: d.id, problem: `id must start with "${id}."` });
  if (d.topicId !== id) issues.push({ where: d.id, problem: `topicId must be "${id}"` });
  if (d.guideRef && !sectionIds.has(d.guideRef)) issues.push({ where: d.id, problem: `guideRef "${d.guideRef}" is not a section id` });
  if (![1, 2, 3].includes(d.level)) issues.push({ where: d.id, problem: "level must be 1, 2 or 3" });
  const perTier: Record<number, number> = {};
  for (const tier of [1, 2, 3] as const) {
    const prompts = new Set<string>();
    let errors = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const where = `${d.id}[tier ${tier}, seed ${seed}]`;
      let item;
      try {
        item = d.generate(makeRng(seed * 7919 + tier), tier);
      } catch (e) {
        if (errors++ < 3) issues.push({ where, problem: `generate threw: ${(e as Error).message}` });
        continue;
      }
      const before = issues.length;
      checkText(`${where}.prompt`, item.prompt, issues);
      if (!item.prompt || item.prompt.length > 700) issues.push({ where, problem: "prompt empty or too long" });
      checkSpec(`${where}.answer`, item.answer, issues);
      if (!Array.isArray(item.solution) || item.solution.length === 0) issues.push({ where, problem: "no solution steps" });
      else item.solution.forEach((s, i) => checkText(`${where}.solution[${i}]`, s, issues));
      if (item.hint) checkText(`${where}.hint`, item.hint, issues);
      if (item.diagram) checkSvg(`${where}.diagram`, item.diagram, issues);
      checkTraps(where, item.answer, item.traps, issues);
      if (/(?:^|[^0-9])-?\d+\.\d{9,}/.test(item.prompt + JSON.stringify(item.answer) + item.solution.join(" "))) {
        issues.push({ where, problem: "floating-point noise (e.g. 0.30000000000000004) — use clean()/roundTo()" });
      }
      if (issues.length - before > 0) errors++;
      if (errors > 5) break;
      prompts.add(item.prompt);
    }
    perTier[tier] = prompts.size;
    if (prompts.size < 25) issues.push({ where: `${d.id}[tier ${tier}]`, problem: `only ${prompts.size} distinct prompts in 200 seeds — needs more variety` });
  }
  report[d.id] = { title: d.title, level: d.level, distinctPrompts: perTier };
}
const coveredSections = new Set(drills.map((d) => d.guideRef));
console.log(JSON.stringify({ topic: id, drills: drills.length, report, sectionsWithoutDrill: meta.sections.filter((s) => !s.stretch && !coveredSections.has(s.id)).map((s) => s.id) }, null, 1));
// Print a few samples so authors can eyeball them.
for (const d of drills.slice(0, 50)) {
  const item = d.generate(makeRng(42), 2);
  console.log(`\n[${d.id}] ${item.prompt}\n  answer: ${JSON.stringify(item.answer)}\n  solution: ${item.solution.join(" | ")}`);
}
if (issues.length) {
  console.log(`\n${issues.length} issue(s):`);
  for (const i of issues.slice(0, 60)) console.log(`- ${i.where}: ${i.problem}`);
  process.exit(1);
}
console.log("\nOK — no issues.");
