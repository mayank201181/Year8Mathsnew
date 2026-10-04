// Validate every topic, drill set and exam paper. Exit 1 on any issue.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOPIC_META } from "../lib/topics/meta.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let failed = 0;
function run(script: string, arg: string) {
  try {
    execFileSync(process.execPath, [path.join(root, "scripts", script), arg, "--quiet"], { stdio: "pipe" });
    console.log(`✓ ${script} ${arg}`);
  } catch (e) {
    failed++;
    const out = String((e as { stdout?: Buffer }).stdout ?? "");
    console.log(`✗ ${script} ${arg}\n${out.split("\n").filter((l) => l.startsWith("- ")).slice(0, 15).join("\n")}`);
  }
}
for (const t of TOPIC_META) {
  run("validate-topic.ts", t.id);
  if (existsSync(path.join(root, "lib", "drills", `${t.id}.ts`))) run("validate-drills.ts", t.id);
  else console.log(`· no drills yet for ${t.id}`);
}
for (const e of ["exam-n1", "exam-c1", "exam-n2", "exam-c2"]) {
  if (existsSync(path.join(root, "lib", "exam", `${e}.ts`))) run("validate-exam.ts", e);
  else console.log(`· no ${e} yet`);
}
console.log(failed ? `\n${failed} check(s) failed` : "\nAll content checks passed");
process.exit(failed ? 1 : 0);
