import test from "node:test";
import assert from "node:assert/strict";
import { checkAnswer, specSelfCheck } from "../lib/answerCheck.ts";
import type { AnswerSpec } from "../lib/types.ts";

const st = (spec: AnswerSpec, input: string) => checkAnswer(spec, input).status;

test("numbers: formats", () => {
  const s: AnswerSpec = { type: "number", value: -11 };
  for (const i of ["-11", "−11", " -11 ", "x = -11", "x=−11", "-11.0"]) assert.equal(st(s, i), "correct", i);
  assert.equal(st(s, "11"), "incorrect");
  assert.equal(checkAnswer(s, "11").feedback, "Check the sign (+ or −).");
  assert.equal(st(s, ""), "invalid");
  assert.equal(st(s, "eleven"), "invalid");
});

test("numbers: money, units, thousands", () => {
  assert.equal(st({ type: "number", value: 46 }, "£46"), "correct");
  assert.equal(st({ type: "number", value: 46 }, "S$46"), "correct");
  assert.equal(st({ type: "number", value: 46 }, "$46.00"), "correct");
  assert.equal(st({ type: "number", value: 1200 }, "1,200"), "correct");
  assert.equal(st({ type: "number", value: 12 }, "12 cm"), "correct");
  assert.equal(st({ type: "number", value: 12 }, "12cm²"), "correct");
  assert.equal(st({ type: "number", value: 12 }, "12 cm^2"), "correct");
  assert.equal(st({ type: "number", value: 60 }, "60 km/h"), "correct");
  assert.equal(st({ type: "number", value: 120 }, "120°"), "correct");
  assert.equal(st({ type: "number", value: 35 }, "35%"), "correct");
  assert.equal(st({ type: "number", value: 12 }, "12 5"), "invalid");
});

test("numbers: fractions allowed / disallowed", () => {
  assert.equal(st({ type: "number", value: 0.75 }, "3/4"), "correct");
  assert.equal(st({ type: "number", value: 0.75 }, "¾"), "correct");
  assert.equal(st({ type: "number", value: 0.75, allowFraction: false }, "3/4"), "close");
  assert.equal(st({ type: "number", value: 0.75, allowFraction: false }, "0.75"), "correct");
  assert.equal(st({ type: "number", value: 1.75 }, "1 3/4"), "correct");
  assert.equal(st({ type: "number", value: 0.5 }, ".5"), "correct");
});

test("numbers: rounding near miss & tolerance", () => {
  assert.equal(st({ type: "number", value: 12.57 }, "12.6"), "close");
  assert.equal(st({ type: "number", value: 12.57 }, "12.57"), "correct");
  assert.equal(st({ type: "number", value: 12.57, tolerance: 0.01 }, "12.566"), "correct");
  assert.equal(st({ type: "number", value: 100 }, "99"), "incorrect");
  assert.equal(st({ type: "number", value: 3.14 }, "3"), "incorrect");
});

test("numbers: standard form", () => {
  const s: AnswerSpec = { type: "number", value: 32000, standardForm: true };
  assert.equal(st(s, "3.2 x 10^4"), "correct");
  assert.equal(st(s, "3.2×10⁴"), "correct");
  assert.equal(st(s, "32000"), "close");
  assert.equal(st(s, "32 x 10^3"), "close");
  assert.equal(st({ type: "number", value: 0.0045, standardForm: true }, "4.5 × 10^-3"), "correct");
  assert.equal(st({ type: "number", value: 0.0045, standardForm: true }, "4.5 × 10^(−3)"), "correct");
});

test("fractions", () => {
  const s: AnswerSpec = { type: "fraction", n: 7, d: 12, simplest: true };
  assert.equal(st(s, "7/12"), "correct");
  assert.equal(st(s, "14/24"), "close");
  assert.equal(st(s, "12/7"), "incorrect");
  assert.equal(checkAnswer(s, "12/7").feedback, "That's the reciprocal — is it upside down?");
  assert.equal(st(s, "0.5833"), "incorrect");
  assert.equal(st({ type: "fraction", n: 3, d: 4, allowDecimal: true }, "0.75"), "correct");
  assert.equal(st({ type: "fraction", n: 3, d: 4 }, "0.75"), "close");
  const mixed: AnswerSpec = { type: "fraction", n: 19, d: 12, form: "mixed" };
  assert.equal(st(mixed, "1 7/12"), "correct");
  assert.equal(st(mixed, "19/12"), "close");
  assert.equal(st({ type: "fraction", n: -3, d: 4 }, "−3/4"), "correct");
  assert.equal(st({ type: "fraction", n: -3, d: 4 }, "3/4"), "incorrect");
  assert.equal(st({ type: "fraction", n: 6, d: 3 }, "2"), "correct");
  assert.equal(st({ type: "fraction", n: 9, d: 10 }, "⁹⁄₁₀"), "correct");
});

test("lists and coordinates", () => {
  const share: AnswerSpec = { type: "list", values: [28, 35] };
  for (const i of ["28, 35", "35, 28", "£28 and £35", "28 35", "28;35"]) assert.equal(st(share, i), "correct", i);
  assert.equal(st(share, "28"), "close");
  const pt: AnswerSpec = { type: "list", values: [3, -2], ordered: true };
  assert.equal(st(pt, "(3, -2)"), "correct");
  assert.equal(st(pt, "(3,−2)"), "correct");
  assert.equal(st(pt, "(-2, 3)"), "incorrect");
  const roots: AnswerSpec = { type: "list", values: [2, -3] };
  assert.equal(st(roots, "x = 2 or x = -3"), "correct");
  assert.equal(st(roots, "x=-3, x=2"), "correct");
  const primes: AnswerSpec = { type: "list", values: [2, 2, 2, 3, 5] };
  for (const i of ["2, 2, 2, 3, 5", "2 × 2 × 2 × 3 × 5", "2^3 × 3 × 5", "2³×3×5", "120 = 2^3 * 3 * 5", "5 x 3 x 2^3"]) assert.equal(st(primes, i), "correct", i);
  for (const i of ["2^2 × 3 × 5", "2 × 3 × 5", "120"]) assert.notEqual(st(primes, i), "correct", i);
  // Non-prime lists are not read as products.
  assert.equal(st(share, "28 × 35"), "invalid");
});

test("ratios", () => {
  const s: AnswerSpec = { type: "ratio", parts: [3, 4], simplest: true };
  assert.equal(st(s, "3:4"), "correct");
  assert.equal(st(s, "3 : 4"), "correct");
  assert.equal(st(s, "12:16"), "close");
  assert.equal(st(s, "4:3"), "incorrect");
  assert.equal(st({ type: "ratio", parts: [2, 3, 5] }, "2:3:5"), "correct");
  assert.equal(st({ type: "ratio", parts: [1, 2.5] }, "1 : 2.5"), "correct");
  assert.equal(st(s, "3 to 4"), "correct");
});

test("expressions: equivalence", () => {
  const s: AnswerSpec = { type: "expression", expr: "2x+6" };
  for (const i of ["2x+6", "6+2x", "2(x+3)", "2*x + 6", "x+x+6", "y = 2x + 6", "2x + 6 = y"]) assert.equal(st(s, i), "correct", i);
  assert.equal(st(s, "2x+5"), "incorrect");
  assert.equal(st(s, "2y+6"), "incorrect");
  assert.equal(st({ type: "expression", expr: "x^2+5x+6" }, "(x+2)(x+3)"), "correct");
  assert.equal(st({ type: "expression", expr: "x^2+5x+6" }, "x²+5x+6"), "correct");
  assert.equal(st({ type: "expression", expr: "a^5" }, "a^2 × a^3"), "correct");
  assert.equal(st({ type: "expression", expr: "12pi" }, "12π"), "correct");
  assert.equal(st({ type: "expression", expr: "6ab" }, "6ba"), "correct");
  assert.equal(st({ type: "expression", expr: "(x+1)/2" }, "x/2 + 1/2"), "correct");
  assert.equal(st({ type: "expression", expr: "3n+2" }, "3n + 2"), "correct");
  assert.equal(st({ type: "expression", expr: "-x^2" }, "-x^2"), "correct");
  assert.equal(st({ type: "expression", expr: "x^-1" }, "1/x"), "correct");
  assert.equal(st({ type: "expression", expr: "2x+6" }, "2x+"), "invalid");
});

test("expressions: forms", () => {
  const f: AnswerSpec = { type: "expression", expr: "3(x+2)", form: "factorised" };
  assert.equal(st(f, "3(x+2)"), "correct");
  assert.equal(st(f, "3(2+x)"), "correct");
  assert.equal(st(f, "3x+6"), "close");
  assert.equal(st({ type: "expression", expr: "x(x+5)", form: "factorised" }, "x(x+5)"), "correct");
  assert.equal(st({ type: "expression", expr: "(x+3)^2", form: "factorised" }, "(x+3)^2"), "correct");
  assert.equal(st({ type: "expression", expr: "(x+3)^2", form: "factorised" }, "(x+3)(x+3)"), "correct");
  const e: AnswerSpec = { type: "expression", expr: "x^2+5x+6", form: "expanded" };
  assert.equal(st(e, "x^2+5x+6"), "correct");
  assert.equal(st(e, "(x+2)(x+3)"), "close");
  const s: AnswerSpec = { type: "expression", expr: "4x+3y", form: "simplified" };
  assert.equal(st(s, "4x+3y"), "correct");
  assert.equal(st(s, "3y+4x"), "correct");
  assert.equal(st(s, "3x+x+3y"), "close");
});

test("text", () => {
  const s: AnswerSpec = { type: "text", accept: ["x > 3", "3 < x"] };
  assert.equal(st(s, "x>3"), "correct");
  assert.equal(st(s, "X > 3"), "correct");
  assert.equal(st(s, "3<x"), "correct");
  assert.equal(st(s, "x≥3"), "incorrect");
  assert.equal(st({ type: "text", accept: ["isosceles"] }, "Isosceles."), "correct");
  assert.equal(st({ type: "text", accept: ["x <= 4"] }, "x ≤ 4"), "correct");
});

test("self-check of display answers", () => {
  const specs: AnswerSpec[] = [
    { type: "number", value: -2.5 },
    { type: "number", value: 32000, standardForm: true },
    { type: "number", value: 0.00045, standardForm: true },
    { type: "fraction", n: 19, d: 12, form: "mixed", simplest: true },
    { type: "fraction", n: -3, d: 4, simplest: true },
    { type: "fraction", n: 6, d: 8 },
    { type: "list", values: [3, -2], ordered: true },
    { type: "ratio", parts: [2, 3], simplest: true },
    { type: "expression", expr: "3(x+2)", form: "factorised" },
    { type: "expression", expr: "4x+3y", form: "simplified" },
    { type: "text", accept: ["obtuse"] },
  ];
  for (const s of specs) assert.equal(specSelfCheck(s).status, "correct", JSON.stringify(s));
});
