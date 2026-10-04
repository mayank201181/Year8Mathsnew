// Stable per-question option order. Authored answers cluster on the first
// options, so every MCQ is shown in a deterministic shuffled order (same on
// every device). Purely numeric option sets are sorted ascending instead,
// which is how printed papers present them. Returns AUTHORED indices.
import { makeRng, seedFrom } from "./drills/rng.ts";
import { parseNumberAnswer } from "./mathParse.ts";

function numericValue(option: string): number | null {
  const plain = option.replace(/\{\{|\}\}/g, "").trim();
  if (/[a-z]{2,}/i.test(plain.replace(/\b(?:cm|mm|km|kg|ml|m|g|l|s|h)\b/gi, ""))) return null;
  const p = parseNumberAnswer(plain);
  return p ? p.value : null;
}

export function optionOrder(qid: string, options: string[]): number[] {
  const idx = options.map((_, i) => i);
  const values = options.map(numericValue);
  if (values.every((v) => v !== null) && new Set(values).size === values.length) {
    return idx.sort((a, b) => (values[a] as number) - (values[b] as number));
  }
  return makeRng(seedFrom(`opt:${qid}`)).shuffle(idx);
}
