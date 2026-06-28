// Lightweight self-assessment of written answers against a mark scheme.
// Extracts keywords/numbers from the mark scheme and checks coverage.

export type GradeVerdict = "correct" | "partial" | "needs-work";

const STOP = new Set([
  "the","a","an","and","or","of","to","is","are","in","on","for","with","by","at",
  "it","its","be","as","that","this","mark","marks","then","so","into","from","each",
  "your","you","both","every","all","any","add","sum","total",
]);

function tokens(s: string): string[] {
  return (s.toLowerCase().match(/[a-z]+|\d+(?:\.\d+)?/g) || []).filter(
    (t) => t.length > 1 && !STOP.has(t)
  );
}

/** Compare a learner's free-text answer to the mark scheme lines. */
export function gradeWritten(answer: string, markScheme: string[]): GradeVerdict {
  const ansTokens = new Set(tokens(answer));
  if (ansTokens.size === 0) return "needs-work";

  // Numbers in the scheme are the strongest signal.
  const schemeText = markScheme.join(" ");
  const schemeNumbers = (schemeText.match(/\d+(?:\.\d+)?/g) || []);
  const keyTokens = Array.from(new Set(tokens(schemeText)));

  if (keyTokens.length === 0) return "partial";

  const matched = keyTokens.filter((t) => ansTokens.has(t)).length;
  const ratio = matched / keyTokens.length;

  const numbersMatched =
    schemeNumbers.length === 0 ||
    schemeNumbers.some((n) => ansTokens.has(n.toLowerCase()));

  if (ratio >= 0.5 && numbersMatched) return "correct";
  if (ratio >= 0.25 || numbersMatched) return "partial";
  return "needs-work";
}
