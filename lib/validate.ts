// ---------------------------------------------------------------------------
// Structural validation of topic content. Used by tests/content.test.ts and by
// content/audit agents (`node scripts/validate.ts <topicId>`).
// Pure — no React, no Next.
// ---------------------------------------------------------------------------
import type { AnswerSpec, Question, Topic, Trap, WorkedExample } from "./types.ts";
import { checkAnswer, specSelfCheck, specSample } from "./answerCheck.ts";
import { toMathML } from "./mathml.ts";

export interface Issue {
  where: string;
  problem: string;
}

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/; // allows \n and \t? no: \t is \u0009 — flagged separately below

export function checkText(where: string, s: unknown, issues: Issue[]) {
  if (typeof s !== "string") {
    issues.push({ where, problem: `expected string, got ${typeof s}` });
    return;
  }
  if (CONTROL.test(s) || s.includes("\t")) issues.push({ where, problem: "contains a control character (bad escape like \\t, \\f, \\b?)" });
  if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(s)) issues.push({ where, problem: "contains undefined/NaN/[object Object]" });
  const opens = (s.match(/\{\{/g) || []).length;
  const closes = (s.match(/\}\}/g) || []).length;
  if (opens !== closes) issues.push({ where, problem: `unbalanced {{ }} (${opens} vs ${closes})` });
  for (const m of s.matchAll(/\{\{([\s\S]+?)\}\}/g)) {
    if (toMathML(m[1]).includes("math-raw")) issues.push({ where, problem: `maths markup failed to parse: {{${m[1]}}}` });
  }
}

export function checkSvg(where: string, svg: unknown, issues: Issue[]) {
  if (typeof svg !== "string") return issues.push({ where, problem: "diagram is not a string" }) as unknown as void;
  if (!/^\s*<svg[\s>]/.test(svg)) issues.push({ where, problem: "diagram must start with <svg" });
  if (!/viewBox=/.test(svg)) issues.push({ where, problem: "svg missing viewBox" });
  if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(svg)) issues.push({ where, problem: "svg missing xmlns" });
  if (!/role="img"/.test(svg) || !/aria-label="/.test(svg)) issues.push({ where, problem: "svg missing role=img / aria-label" });
  if (!/<\/svg>\s*$/.test(svg)) issues.push({ where, problem: "svg must end with </svg>" });
  if (/<script|on[a-z]+=/i.test(svg)) issues.push({ where, problem: "svg contains script/event handler" });
  if (svg.includes("`") || svg.includes("${")) issues.push({ where, problem: "svg contains a backtick or ${" });
}

export function checkSpec(where: string, spec: AnswerSpec, issues: Issue[]) {
  if (!spec || typeof spec !== "object" || !("type" in spec)) {
    issues.push({ where, problem: "missing answer spec" });
    return;
  }
  const r = specSelfCheck(spec);
  if (r.status !== "correct") issues.push({ where, problem: `answer spec fails its own check (${r.status}: ${r.feedback ?? ""}) ${JSON.stringify(spec)}` });
  if (spec.type === "number" && !Number.isFinite(spec.value)) issues.push({ where, problem: "number answer is not finite" });
  if (spec.type === "fraction" && (!Number.isInteger(spec.n) || !Number.isInteger(spec.d) || spec.d === 0)) issues.push({ where, problem: "fraction n/d must be integers, d≠0" });
  if (spec.type === "text" && (!spec.accept || spec.accept.length === 0)) issues.push({ where, problem: "text answer has no accepted strings" });
  if (spec.display) checkText(`${where}.display`, spec.display, issues);
}

export function checkTraps(where: string, spec: AnswerSpec, traps: Trap[] | undefined, issues: Issue[]) {
  traps?.forEach((t, i) => {
    checkText(`${where}.traps[${i}].feedback`, t.feedback, issues);
    const r = specSelfCheck(t.spec);
    if (r.status !== "correct") issues.push({ where: `${where}.traps[${i}]`, problem: `trap spec fails its own check ${JSON.stringify(t.spec)}` });
    try {
      if (checkAnswer(spec, specSample(t.spec)).status === "correct") {
        issues.push({ where: `${where}.traps[${i}]`, problem: "trap answer is accepted as CORRECT by the real answer spec" });
      }
    } catch {
      /* ignore */
    }
  });
}

export function checkQuestion(where: string, q: Question, sectionIds: Set<string>, issues: Issue[]) {
  checkText(`${where}.question`, q.question, issues);
  if (!["warmup", "core", "challenge"].includes(q.difficulty)) issues.push({ where, problem: `bad difficulty ${q.difficulty}` });
  if (!Array.isArray(q.hints) || q.hints.length === 0) issues.push({ where, problem: "needs at least one hint" });
  else {
    if (q.difficulty !== "warmup" && q.hints.length < 2) issues.push({ where, problem: "core/challenge questions need a hint ladder of 2-4 hints" });
    q.hints.forEach((h, i) => checkText(`${where}.hints[${i}]`, h, issues));
  }
  if (q.guideRef && !sectionIds.has(q.guideRef)) issues.push({ where, problem: `guideRef "${q.guideRef}" is not a guide section id` });
  if (q.diagram) checkSvg(`${where}.diagram`, q.diagram, issues);
  if (q.kind === "mcq") {
    if (!Array.isArray(q.options) || q.options.length !== 4) issues.push({ where, problem: "MCQ must have exactly 4 options" });
    else {
      q.options.forEach((o, i) => checkText(`${where}.options[${i}]`, o, issues));
      const norm = q.options.map((o) => o.replace(/\s+/g, "").toLowerCase());
      if (new Set(norm).size !== norm.length) issues.push({ where, problem: "duplicate options" });
    }
    if (!Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex > 3) issues.push({ where, problem: "answerIndex out of range" });
    checkText(`${where}.explanation`, q.explanation, issues);
    if (/\b(?:option|answer|choice)\s*\(?[A-D]\)?(?![a-z])|\b[A-D]\)\s|\bthe (?:first|second|third|fourth|last) (?:option|answer|choice)/.test(q.explanation)) {
      issues.push({ where, problem: "explanation refers to an option by letter/position (options are shuffled)" });
    }
    if (/\b(?:all|none) of the above\b/i.test(q.options.join(" "))) issues.push({ where, problem: "'all/none of the above' breaks when options are shuffled" });
  } else if (q.kind === "short") {
    checkSpec(`${where}.answer`, q.answer, issues);
    if (!Array.isArray(q.solution) || q.solution.length === 0) issues.push({ where, problem: "short question needs solution steps" });
    else q.solution.forEach((s, i) => checkText(`${where}.solution[${i}]`, s, issues));
    q.solutions?.forEach((m, i) => m.steps.forEach((s, j) => checkText(`${where}.solutions[${i}].steps[${j}]`, s, issues)));
    if (q.commonError) checkText(`${where}.commonError`, q.commonError, issues);
    checkTraps(where, q.answer, q.traps, issues);
  } else if (q.kind === "written") {
    if (q.marks !== q.markScheme?.length) issues.push({ where, problem: `marks (${q.marks}) must equal markScheme length (${q.markScheme?.length})` });
    checkText(`${where}.modelAnswer`, q.modelAnswer, issues);
    q.markScheme?.forEach((p, i) => {
      checkText(`${where}.markScheme[${i}].point`, p.point, issues);
      if (!p.keywords?.length) issues.push({ where, problem: `markScheme[${i}] has no keywords` });
      else if (p.keywords.some((k) => k !== k.toLowerCase())) issues.push({ where, problem: `markScheme[${i}] keywords must be lower-case` });
    });
  } else {
    issues.push({ where, problem: `unknown question kind ${(q as { kind?: string }).kind}` });
  }
}

function checkWorked(where: string, w: WorkedExample, issues: Issue[]) {
  checkText(`${where}.problem`, w.problem, issues);
  w.steps.forEach((s, i) => checkText(`${where}.steps[${i}]`, s, issues));
  checkText(`${where}.answer`, w.answer, issues);
  if (w.yourTurn) {
    checkText(`${where}.yourTurn.question`, w.yourTurn.question, issues);
    checkSpec(`${where}.yourTurn.answer`, w.yourTurn.answer, issues);
    checkText(`${where}.yourTurn.solution`, w.yourTurn.solution, issues);
  }
}

export interface TopicCounts {
  sections: number;
  quiz: number;
  mcq: number;
  practice: number;
  challenge: number;
  byDifficulty: Record<string, number>;
  byKind: Record<string, number>;
  answerIndexSpread: number[];
}

export function allQuestions(t: Topic): Question[] {
  return [
    ...t.quiz,
    ...t.mcqPapers.flatMap((p) => p.questions),
    ...t.practicePapers.flatMap((p) => p.questions),
    ...t.challenge,
  ];
}

export function validateTopic(t: Topic, seenIds: Set<string> = new Set()): { issues: Issue[]; counts: TopicCounts } {
  const issues: Issue[] = [];
  const sectionIds = new Set<string>();
  checkText(`${t.id}.intro`, t.intro, issues);
  checkText(`${t.id}.summary`, t.summary, issues);
  for (const s of t.guide) {
    const w = `${t.id}.guide[${s.id}]`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.id)) issues.push({ where: w, problem: "section id must be kebab-case" });
    if (sectionIds.has(s.id)) issues.push({ where: w, problem: "duplicate section id" });
    sectionIds.add(s.id);
    checkText(`${w}.heading`, s.heading, issues);
    checkText(`${w}.body`, s.body, issues);
    if (s.discovery) {
      checkText(`${w}.discovery.problem`, s.discovery.problem, issues);
      checkText(`${w}.discovery.idea`, s.discovery.idea, issues);
    }
    if (s.diagram) checkSvg(`${w}.diagram`, s.diagram, issues);
    if (s.diagramCaption) checkText(`${w}.diagramCaption`, s.diagramCaption, issues);
    s.keyPoints?.forEach((k, i) => checkText(`${w}.keyPoints[${i}]`, k, issues));
    if (s.whyItWorks) checkText(`${w}.whyItWorks`, s.whyItWorks, issues);
    if (s.thinkDeeper) checkText(`${w}.thinkDeeper`, s.thinkDeeper, issues);
    s.workedExamples?.forEach((we, i) => checkWorked(`${w}.workedExamples[${i}]`, we, issues));
  }
  const L = t.learn;
  L.flashcards.forEach((c, i) => { checkText(`${t.id}.flashcards[${i}].front`, c.front, issues); checkText(`${t.id}.flashcards[${i}].back`, c.back, issues); });
  L.mustKnow.forEach((m, i) => checkText(`${t.id}.mustKnow[${i}]`, m, issues));
  L.misconceptions.forEach((m, i) => { checkText(`${t.id}.misconceptions[${i}].wrong`, m.wrong, issues); checkText(`${t.id}.misconceptions[${i}].right`, m.right, issues); });
  L.examMistakes.forEach((m, i) => checkText(`${t.id}.examMistakes[${i}]`, m, issues));
  L.formulas.forEach((f, i) => checkText(`${t.id}.formulas[${i}].formula`, f.formula, issues));
  L.videos.forEach((v, i) => { if (!/^https:\/\/(www\.)?youtube\.com\//.test(v.url)) issues.push({ where: `${t.id}.videos[${i}]`, problem: "video url must be a youtube.com URL" }); });

  const byDifficulty: Record<string, number> = {};
  const byKind: Record<string, number> = {};
  const spread = [0, 0, 0, 0];
  const visit = (q: Question, where: string) => {
    if (!q || typeof q !== "object") return issues.push({ where, problem: "not a question object" });
    if (seenIds.has(q.id)) issues.push({ where, problem: `duplicate question id ${q.id}` });
    seenIds.add(q.id);
    if (!q.id.startsWith(`${t.id}-`)) issues.push({ where, problem: `id ${q.id} must start with "${t.id}-"` });
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] ?? 0) + 1;
    byKind[q.kind] = (byKind[q.kind] ?? 0) + 1;
    if (q.kind === "mcq" && q.answerIndex >= 0 && q.answerIndex < 4) spread[q.answerIndex]++;
    checkQuestion(where, q, sectionIds, issues);
  };
  t.quiz.forEach((q, i) => visit(q, `${t.id}.quiz[${i}]`));
  const paperIds = new Set<string>();
  for (const p of [...t.mcqPapers, ...t.practicePapers]) {
    if (paperIds.has(p.id)) issues.push({ where: p.id, problem: "duplicate paper id" });
    paperIds.add(p.id);
    p.questions.forEach((q, i) => visit(q, `${p.id}[${i}]`));
  }
  for (const p of t.mcqPapers) p.questions.forEach((q, i) => { if (q.kind !== "mcq") issues.push({ where: `${p.id}[${i}]`, problem: "MCQ papers may only contain mcq questions" }); });
  t.challenge.forEach((q, i) => {
    visit(q, `${t.id}.challenge[${i}]`);
    if (q.difficulty !== "challenge") issues.push({ where: `${t.id}.challenge[${i}]`, problem: "challenge set questions must have difficulty 'challenge'" });
  });

  return {
    issues,
    counts: {
      sections: t.guide.length,
      quiz: t.quiz.length,
      mcq: t.mcqPapers.reduce((a, p) => a + p.questions.length, 0),
      practice: t.practicePapers.reduce((a, p) => a + p.questions.length, 0),
      challenge: t.challenge.length,
      byDifficulty,
      byKind,
      answerIndexSpread: spread,
    },
  };
}

/** Validate a Big Exam paper (cross-topic): every question needs a valid topicId + guideRef. */
export function validateExamPaper(
  paper: { id: string; title: string; calculator: boolean; minutes: number; questions: Question[] },
  sectionsByTopic: Record<string, string[]>,
  expectedCount: number,
): { issues: Issue[]; counts: Record<string, Record<string, number>> } {
  const issues: Issue[] = [];
  const byTopic: Record<string, number> = {};
  const byKind: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  const seen = new Set<string>();
  if (typeof paper.calculator !== "boolean") issues.push({ where: paper.id, problem: "calculator must be true/false" });
  if (!(paper.minutes > 0)) issues.push({ where: paper.id, problem: "minutes must be > 0" });
  if (paper.questions.length !== expectedCount) issues.push({ where: paper.id, problem: `has ${paper.questions.length} questions, needs ${expectedCount}` });
  paper.questions.forEach((q, i) => {
    const where = `${paper.id}[${i}]`;
    const want = `${paper.id}-q${String(i + 1).padStart(2, "0")}`;
    if (q.id !== want) issues.push({ where, problem: `id should be ${want}` });
    if (seen.has(q.id)) issues.push({ where, problem: "duplicate id" });
    seen.add(q.id);
    const sections = q.topicId ? sectionsByTopic[q.topicId] : undefined;
    if (!sections) issues.push({ where, problem: `topicId "${q.topicId}" is not a topic id` });
    byTopic[q.topicId ?? "?"] = (byTopic[q.topicId ?? "?"] ?? 0) + 1;
    byKind[q.kind] = (byKind[q.kind] ?? 0) + 1;
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] ?? 0) + 1;
    checkQuestion(where, q, new Set(sections ?? []), issues);
  });
  return { issues, counts: { byTopic, byKind, byDifficulty } };
}
