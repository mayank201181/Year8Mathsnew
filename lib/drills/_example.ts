// REFERENCE EXAMPLE for drill authors — NOT imported by the app.
// Real files: lib/drills/<topicId>.ts exporting `drills: Drill[]`.
import type { Drill } from "./types.ts";
import { frac, gcd, lcm, num, br, poly } from "./helpers.ts";

export const drills: Drill[] = [
  {
    id: "fractions.add-unlike",
    topicId: "fractions",
    title: "Add fractions with different denominators",
    level: 2,
    guideRef: "adding-subtracting",
    generate(rng, tier) {
      // Tier widens the denominators; retry until the answer is not a whole number.
      const dens = tier === 1 ? [2, 3, 4, 5, 6] : tier === 2 ? [3, 4, 5, 6, 8, 9, 10, 12] : [6, 7, 8, 9, 12, 14, 15];
      let a = 1, b = 2, c = 1, d = 3;
      for (let i = 0; i < 50; i++) {
        b = rng.pick(dens);
        d = rng.pick(dens.filter((x) => x !== b));
        a = rng.int(1, b - 1);
        c = rng.int(1, d - 1);
        // Prompt fractions must already be in simplest form, and the sum must not be whole.
        if (gcd(a, b) === 1 && gcd(c, d) === 1 && (a * d + c * b) % (b * d) !== 0) break;
      }
      const L = lcm(b, d);
      const n = a * (L / b) + c * (L / d);
      const g = gcd(n, L);
      return {
        prompt: `Work out ${frac(a, b, { simplify: false })} + ${frac(c, d, { simplify: false })}. Give your answer in its simplest form.`,
        answer: { type: "fraction", n: n / g, d: L / g, simplest: true },
        solution: [
          `The LCM of ${b} and ${d} is ${L}.`,
          `${frac(a, b, { simplify: false })} = ${frac(a * (L / b), L, { simplify: false })} and ${frac(c, d, { simplify: false })} = ${frac(c * (L / d), L, { simplify: false })}.`,
          `Add the numerators: ${frac(n, L, { simplify: false })}${g > 1 ? ` = ${frac(n / g, L / g)}` : ""}.`,
        ],
        hint: "Rewrite both fractions with the same denominator first.",
        traps: [{ spec: { type: "fraction", n: a + c, d: b + d }, feedback: "You added the denominators — make the pieces the same size first." }],
      };
    },
  },
  {
    id: "fractions.expand-example",
    topicId: "fractions",
    title: "Expand a bracket (example of an expression answer)",
    level: 1,
    guideRef: "algebraic-fractions",
    generate(rng, tier) {
      // Never use k = 1 or −1: the question becomes trivial and the trap equals the answer.
      const k = rng.pick(tier === 1 ? [2, 3, 4, 5, 6] : [-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]);
      const p = rng.nonZero(-9, 9);
      return {
        prompt: `Expand {{${k}(x ${p < 0 ? "-" : "+"} ${Math.abs(p)})}}.`,
        answer: { type: "expression", expr: poly([[k, "x"], [k * p, ""]]), form: "expanded" },
        solution: [`Multiply each term inside by ${num(k)}: ${num(k)} × x and ${num(k)} × ${br(p)}.`, `= {{${poly([[k, "x"], [k * p, ""]])}}}`],
        traps: [{ spec: { type: "expression", expr: poly([[k, "x"], [p, ""]]) }, feedback: "Multiply BOTH terms in the bracket." }],
      };
    },
  },
];
