// Formatting helpers for drill authors. Everything returns markdown-lite /
// {{maths}} strings so prompts and solutions render as real maths.

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/** Remove floating-point noise: 0.1 + 0.2 → 0.3. */
export function clean(n: number, sig = 12): number {
  return parseFloat(n.toPrecision(sig));
}

/** Round to dp decimal places (half away from zero). */
export function roundTo(n: number, dp: number): number {
  const f = Math.pow(10, dp);
  return clean((Math.sign(n) * Math.round(Math.abs(n) * f + 1e-9)) / f);
}

/** Number → display string with a proper minus sign: −3, 2.5. */
export function num(n: number): string {
  const s = String(clean(n));
  return s.startsWith("-") ? "−" + s.slice(1) : s;
}

/** Number with thousands separators: 12 345 → "12,345". */
export function big(n: number): string {
  const s = clean(n).toLocaleString("en-GB", { maximumFractionDigits: 10 });
  return s.startsWith("-") ? "−" + s.slice(1) : s;
}

/** Wrap negatives in brackets for use inside a calculation: (−3). */
export function br(n: number): string {
  return n < 0 ? `(${num(n)})` : num(n);
}

/** Money with 2 dp: 4.5 → "£4.50" (currency symbol configurable). */
export function money(n: number, symbol = "$"): string {
  const s = Math.abs(n).toFixed(2);
  return (n < 0 ? "−" : "") + symbol + s;
}

/** Simplify a fraction; returns [n, d] with d > 0. */
export function simplify(n: number, d: number): [number, number] {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}

/** Maths-markup fraction: frac(3,4) → "{{3/4}}"; whole numbers stay whole. */
export function frac(n: number, d: number, opts: { simplify?: boolean; mixed?: boolean } = {}): string {
  let [a, b] = opts.simplify === false ? [n, d] : simplify(n, d);
  if (b < 0) { a = -a; b = -b; }
  if (b === 1) return `{{${a < 0 ? "-" : ""}${Math.abs(a)}}}`;
  const neg = a < 0 ? "-" : "";
  a = Math.abs(a);
  if (opts.mixed && a > b) {
    const w = Math.floor(a / b), r = a % b;
    return r ? `{{${neg}${w} ${r}/${b}}}` : `{{${neg}${w}}}`;
  }
  return `{{${neg}${a}/${b}}}`;
}

/** Coefficient × variable as typed maths: term(1,"x")="x", term(-1,"x")="-x", term(3,"x")="3x", term(0,"x")="". */
export function term(c: number, v: string): string {
  if (c === 0) return "";
  if (v === "") return String(clean(c));
  if (c === 1) return v;
  if (c === -1) return "-" + v;
  return String(clean(c)) + v;
}

/**
 * Build a tidy linear/polynomial expression string from [coef, var] pairs,
 * e.g. poly([[3,"x"],[-2,""]]) → "3x - 2". Zero terms are dropped.
 * Returns plain ASCII suitable for both {{ }} display and AnswerSpec.expr.
 */
export function poly(terms: Array<[number, string]>): string {
  let out = "";
  for (const [c, v] of terms) {
    if (c === 0) continue;
    const t = term(Math.abs(c), v);
    if (!out) out = c < 0 ? "-" + t : t;
    else out += c < 0 ? ` - ${t}` : ` + ${t}`;
  }
  return out || "0";
}

/** Signed constant for appending: signed(3) → "+ 3", signed(-3) → "− 3". */
export function signed(n: number): string {
  return n < 0 ? `− ${num(-n)}` : `+ ${num(n)}`;
}

/** Ordinal: 1 → "1st". */
export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** Prime factorisation as a sorted array: 60 → [2,2,3,5]. */
export function primeFactors(n: number): number[] {
  const out: number[] = [];
  let m = Math.abs(n);
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
  if (m > 1) out.push(m);
  return out;
}

/** Index-form string of a prime factorisation: 60 → "{{2^2 * 3 * 5}}". */
export function indexForm(n: number): string {
  const f = primeFactors(n);
  const counts = new Map<number, number>();
  for (const p of f) counts.set(p, (counts.get(p) ?? 0) + 1);
  return "{{" + Array.from(counts.entries()).map(([p, c]) => (c > 1 ? `${p}^${c}` : `${p}`)).join(" * ") + "}}";
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
}

/** Pick k distinct values from an array. */
export function sample<T>(items: readonly T[], k: number, rnd: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}
