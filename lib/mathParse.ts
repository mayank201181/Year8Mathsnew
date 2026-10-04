// ---------------------------------------------------------------------------
// Parsing helpers for learner-typed maths answers.
// Pure functions, no imports — shared by the answer checker, the drills and
// the unit tests (run directly by `node --test`).
// ---------------------------------------------------------------------------

const UNICODE_FRACTIONS: Record<string, string> = {
  "½": "1/2", "⅓": "1/3", "⅔": "2/3", "¼": "1/4", "¾": "3/4", "⅕": "1/5",
  "⅖": "2/5", "⅗": "3/5", "⅘": "4/5", "⅙": "1/6", "⅚": "5/6", "⅐": "1/7",
  "⅛": "1/8", "⅜": "3/8", "⅝": "5/8", "⅞": "7/8", "⅑": "1/9", "⅒": "1/10",
};

const SUPERSCRIPTS: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6",
  "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-",
};

const SUBSCRIPTS: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6",
  "₇": "7", "₈": "8", "₉": "9",
};

/**
 * Normalise typed input: unicode minus/times/divide, superscript powers,
 * unicode fractions, fraction slash, non-breaking spaces, √ and π.
 */
export function normalizeInput(raw: string): string {
  // NFKC turns "½" into "1⁄2" (fraction slash) and "²" into "2" — so handle
  // superscripts and unicode fractions BEFORE normalising.
  let s = (raw ?? "")
    // ⁹⁄₁₀ style vulgar fractions → 9/10
    .replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)\s*[⁄∕/]\s*([₀₁₂₃₄₅₆₇₈₉]+)/g, (_m, a: string, b: string) =>
      " " + a.split("").map((c) => SUPERSCRIPTS[c]).join("") + "/" + b.split("").map((c) => SUBSCRIPTS[c]).join(""))
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => "^" + m.split("").map((c) => SUPERSCRIPTS[c]).join(""))
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => SUBSCRIPTS[c])
    .replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅐⅛⅜⅝⅞⅑⅒]/g, (c) => " " + UNICODE_FRACTIONS[c]);
  s = s.normalize("NFKC");
  s = s
    .replace(/[−–—‒﹣－]/g, "-") // minus & dashes
    .replace(/[×✕⋅·∙]/g, "*")
    .replace(/÷/g, "/")
    .replace(/[⁄∕]/g, "/") // fraction slash, division slash
    .replace(/[∶]/g, ":")
    .replace(/√/g, "sqrt")
    .replace(/π/g, "pi")
    .replace(/[     ​]/g, " ")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/\s+/g, " ")
    .trim();
  return s;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

// ---------------------------------------------------------------------------
// Numbers
// ---------------------------------------------------------------------------

export interface ParsedNumber {
  value: number;
  /** Present when the learner typed a fraction or mixed number. */
  frac?: { whole: number; n: number; d: number; negative: boolean };
  /** Typed as a×10^n. */
  standardForm?: { mantissa: number; exponent: number };
  kind: "integer" | "decimal" | "fraction" | "mixed" | "standard";
}

/** A trailing unit such as cm, cm^2, cm², m/s, km/h, %, °, degrees, litres. */
const UNIT_TAIL =
  /^\s*(?:%|°\s*[a-z]?|[a-z]{1,12}(?:\s*\^?\s*[23])?(?:\s*\/\s*[a-z]{1,5})?)?\s*$/i;

/**
 * Parse a single number answer such as "-2.5", "3/4", "1 3/4", "1,200",
 * "£46", "12 cm", "x = 5", "3.2 × 10^4". Returns null if it is not one number.
 */
export function parseNumberAnswer(raw: string): ParsedNumber | null {
  let s = normalizeInput(raw);
  if (!s) return null;
  // Strip a leading label like "x =", "a=", "angle x =", "answer:".
  s = s.replace(/^(?:[a-z][a-z ]{0,14}?\s*=|answer\s*[:=])\s*/i, "");
  // Strip currency symbols / codes at either end.
  s = s.replace(/^(?:s\$|sgd|us\$|[£$€¥₹])\s*/i, "").replace(/\s*(?:sgd|dollars?|pounds?)$/i, "");
  s = s.trim();
  let negative = false;
  s = s.replace(/^\+\s*/, "");
  if (/^-/.test(s)) {
    negative = true;
    s = s.replace(/^-\s*/, "");
  }
  s = s.replace(/^(?:s\$|[£$€¥₹])\s*/i, ""); // "-£5"
  const sign = negative ? -1 : 1;

  // Standard form: 3.2 * 10^4, 3.2x10^4, 3.2 × 10^(-3)
  let m = s.match(/^(\d+(?:\.\d+)?)\s*(?:\*|x)\s*10\s*\^\s*\(?\s*(-?\d+)\s*\)?(.*)$/i);
  if (m && UNIT_TAIL.test(m[3])) {
    const mant = parseFloat(m[1]);
    const exp = parseInt(m[2], 10);
    return { value: sign * mant * Math.pow(10, exp), standardForm: { mantissa: sign * mant, exponent: exp }, kind: "standard" };
  }
  // Mixed number: 1 3/4
  m = s.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)(.*)$/);
  if (m && UNIT_TAIL.test(m[4])) {
    const whole = parseInt(m[1], 10), n = parseInt(m[2], 10), d = parseInt(m[3], 10);
    if (d === 0) return null;
    return { value: sign * (whole + n / d), frac: { whole, n, d, negative }, kind: "mixed" };
  }
  // Fraction: 3/4
  m = s.match(/^(\d+)\s*\/\s*(\d+)(.*)$/);
  if (m && UNIT_TAIL.test(m[3])) {
    const n = parseInt(m[1], 10), d = parseInt(m[2], 10);
    if (d === 0) return null;
    return { value: (sign * n) / d, frac: { whole: 0, n, d, negative }, kind: "fraction" };
  }
  // Thousands separators: 1,200 or 12,345.6
  m = s.match(/^(\d{1,3}(?:,\d{3})+(?:\.\d+)?)(.*)$/);
  if (m && UNIT_TAIL.test(m[2])) {
    return { value: sign * parseFloat(m[1].replace(/,/g, "")), kind: m[1].includes(".") ? "decimal" : "integer" };
  }
  // Plain integer / decimal (".5" and "5." allowed)
  m = s.match(/^(\d+(?:\.\d*)?|\.\d+)(.*)$/);
  if (m && UNIT_TAIL.test(m[2])) {
    const v = parseFloat(m[1]);
    if (!Number.isFinite(v)) return null;
    return { value: sign * v, kind: /\.\d/.test(m[1]) ? "decimal" : "integer" };
  }
  return null;
}

/**
 * Parse a list of numbers: "28, 35", "(3, −2)", "x = 2 or x = −3", "£28 and £35",
 * "3/4; 1/2". Returns null if any piece is not a number.
 */
export function extractNumbers(raw: string): number[] | null {
  const s = normalizeInput(raw)
    .replace(/\b[a-z]\s*=/gi, " ") // "x =" labels
    .replace(/\b(?:or|and)\b/gi, ",")
    .replace(/[()\[\]{}]/g, " ")
    .replace(/(?:s\$|[£$€¥₹])/gi, "");
  const pieces = s.split(/[,;]|\s+/).map((p) => p.trim()).filter(Boolean);
  const out: number[] = [];
  for (const p of pieces) {
    if (/^[a-z°%²³]+$/i.test(p)) continue; // stray unit words
    const n = parseNumberAnswer(p);
    if (!n) return null;
    out.push(n.value);
  }
  return out.length ? out : null;
}

// ---------------------------------------------------------------------------
// Expressions
// ---------------------------------------------------------------------------

export type Expr =
  | { t: "num"; v: number }
  | { t: "var"; name: string }
  | { t: "add"; a: Expr; b: Expr }
  | { t: "sub"; a: Expr; b: Expr }
  | { t: "mul"; a: Expr; b: Expr }
  | { t: "div"; a: Expr; b: Expr }
  | { t: "pow"; a: Expr; b: Expr }
  | { t: "neg"; a: Expr }
  | { t: "fn"; name: "sqrt" | "cbrt"; a: Expr }
  | { t: "group"; a: Expr };

type Tok =
  | { k: "num"; v: number }
  | { k: "var"; name: string }
  | { k: "const"; name: "pi" }
  | { k: "fn"; name: "sqrt" | "cbrt" }
  | { k: "op"; v: "+" | "-" | "*" | "/" | "^" }
  | { k: "lp" }
  | { k: "rp" };

function tokenizeExpr(input: string): Tok[] | null {
  const s = normalizeInput(input).toLowerCase().replace(/\[/g, "(").replace(/\]/g, ")");
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    if (/[0-9.]/.test(c)) {
      const m = s.slice(i).match(/^(\d+(?:\.\d*)?|\.\d+)/);
      if (!m) return null;
      toks.push({ k: "num", v: parseFloat(m[1]) });
      i += m[1].length;
      continue;
    }
    if (/[a-z]/.test(c)) {
      const m = s.slice(i).match(/^[a-z]+/)!;
      let word = m[0];
      i += word.length;
      // Split words into known functions/constants and single-letter variables.
      while (word.length) {
        if (word.startsWith("sqrt")) { toks.push({ k: "fn", name: "sqrt" }); word = word.slice(4); continue; }
        if (word.startsWith("cbrt")) { toks.push({ k: "fn", name: "cbrt" }); word = word.slice(4); continue; }
        if (word.startsWith("pi")) { toks.push({ k: "const", name: "pi" }); word = word.slice(2); continue; }
        toks.push({ k: "var", name: word[0] });
        word = word.slice(1);
      }
      continue;
    }
    if ("+-*/^".includes(c)) { toks.push({ k: "op", v: c as "+" }); i++; continue; }
    if (c === "(") { toks.push({ k: "lp" }); i++; continue; }
    if (c === ")") { toks.push({ k: "rp" }); i++; continue; }
    return null; // unknown character
  }
  return toks;
}

/** Parse an algebraic expression (implicit multiplication allowed). Null on failure. */
export function parseExpr(input: string): Expr | null {
  const toks = tokenizeExpr(input);
  if (!toks || toks.length === 0) return null;
  let pos = 0;
  const peek = () => toks[pos];
  const startsAtom = (t: Tok | undefined) =>
    !!t && (t.k === "num" || t.k === "var" || t.k === "const" || t.k === "fn" || t.k === "lp");

  function parseSum(): Expr | null {
    let left = parseTerm();
    if (!left) return null;
    for (;;) {
      const t = peek();
      if (t && t.k === "op" && (t.v === "+" || t.v === "-")) {
        pos++;
        const right = parseTerm();
        if (!right) return null;
        left = t.v === "+" ? { t: "add", a: left, b: right } : { t: "sub", a: left, b: right };
      } else return left;
    }
  }
  function parseTerm(): Expr | null {
    let left = parseUnary();
    if (!left) return null;
    for (;;) {
      const t = peek();
      if (t && t.k === "op" && (t.v === "*" || t.v === "/")) {
        pos++;
        const right = parseUnary();
        if (!right) return null;
        left = t.v === "*" ? { t: "mul", a: left, b: right } : { t: "div", a: left, b: right };
      } else if (startsAtom(t)) {
        // implicit multiplication: 2x, x(x+1), (x+1)(x+2)
        const right = parsePower();
        if (!right) return null;
        left = { t: "mul", a: left, b: right };
      } else return left;
    }
  }
  function parseUnary(): Expr | null {
    const t = peek();
    if (t && t.k === "op" && t.v === "-") { pos++; const a = parseUnary(); return a ? { t: "neg", a } : null; }
    if (t && t.k === "op" && t.v === "+") { pos++; return parseUnary(); }
    return parsePower();
  }
  function parsePower(): Expr | null {
    const base = parseAtom();
    if (!base) return null;
    const t = peek();
    if (t && t.k === "op" && t.v === "^") {
      pos++;
      const exp = parseUnary(); // right-assoc, allows x^-1
      if (!exp) return null;
      return { t: "pow", a: base, b: exp };
    }
    return base;
  }
  function parseAtom(): Expr | null {
    const t = peek();
    if (!t) return null;
    if (t.k === "num") { pos++; return { t: "num", v: t.v }; }
    if (t.k === "var") { pos++; return { t: "var", name: t.name }; }
    if (t.k === "const") { pos++; return { t: "num", v: Math.PI }; }
    if (t.k === "fn") {
      pos++;
      const arg = parseAtomOrGroup();
      return arg ? { t: "fn", name: t.name, a: arg } : null;
    }
    if (t.k === "lp") {
      pos++;
      const inner = parseSum();
      if (!inner) return null;
      if (!peek() || peek()!.k !== "rp") return null;
      pos++;
      return { t: "group", a: inner };
    }
    return null;
  }
  function parseAtomOrGroup(): Expr | null {
    // sqrt 49 or sqrt(49)
    return parsePower();
  }

  const e = parseSum();
  if (!e || pos !== toks.length) return null;
  return e;
}

export function evalExpr(e: Expr, env: Record<string, number>): number {
  switch (e.t) {
    case "num": return e.v;
    case "var": return e.name in env ? env[e.name] : NaN;
    case "add": return evalExpr(e.a, env) + evalExpr(e.b, env);
    case "sub": return evalExpr(e.a, env) - evalExpr(e.b, env);
    case "mul": return evalExpr(e.a, env) * evalExpr(e.b, env);
    case "div": return evalExpr(e.a, env) / evalExpr(e.b, env);
    case "pow": return Math.pow(evalExpr(e.a, env), evalExpr(e.b, env));
    case "neg": return -evalExpr(e.a, env);
    case "fn": {
      const v = evalExpr(e.a, env);
      return e.name === "sqrt" ? Math.sqrt(v) : Math.cbrt(v);
    }
    case "group": return evalExpr(e.a, env);
  }
}

export function exprVars(e: Expr, acc: Set<string> = new Set()): Set<string> {
  switch (e.t) {
    case "var": acc.add(e.name); break;
    case "num": break;
    case "neg": case "group": case "fn": exprVars(e.a, acc); break;
    default: exprVars(e.a, acc); exprVars(e.b, acc);
  }
  return acc;
}

/** Top-level additive terms (flattening + and −). */
export function countTerms(e: Expr): number {
  if (e.t === "add" || e.t === "sub") return countTerms(e.a) + countTerms(e.b);
  return 1;
}

export function hasGroup(e: Expr): boolean {
  switch (e.t) {
    case "group": return true;
    case "num": case "var": return false;
    case "neg": case "fn": return hasGroup(e.a);
    default: return hasGroup(e.a) || hasGroup(e.b);
  }
}

function isSumLike(e: Expr): boolean {
  if (e.t === "group") return isSumLike(e.a);
  return e.t === "add" || e.t === "sub";
}

/** A product with at least one bracketed sum factor, e.g. 3(x+2), (x+1)(x−4), (x+3)^2. */
export function isFactorised(e: Expr): boolean {
  let x = e;
  while (x.t === "neg" || (x.t === "group" && !isSumLike(x.a))) x = x.a;
  if (x.t === "pow") return isSumLike(x.a);
  if (x.t !== "mul") return false;
  const factors: Expr[] = [];
  const collect = (f: Expr) => {
    if (f.t === "mul") { collect(f.a); collect(f.b); } else factors.push(f);
  };
  collect(x);
  return factors.some((f) => (f.t === "group" && isSumLike(f.a)) || (f.t === "pow" && isSumLike(f.a)));
}

const SAMPLE_POINTS = [1.37, -0.73, 2.21, 0.46, -1.93, 3.17, 0.89, -2.41];

/** Numeric equivalence by evaluation at several pseudo-random points. */
export function exprEquivalent(a: Expr, b: Expr): boolean {
  const vars = Array.from(new Set([...exprVars(a), ...exprVars(b)])).sort();
  let valid = 0;
  for (let k = 0; k < SAMPLE_POINTS.length; k++) {
    const env: Record<string, number> = {};
    vars.forEach((v, j) => {
      env[v] = SAMPLE_POINTS[(k + 3 * j) % SAMPLE_POINTS.length] + 0.11 * j;
    });
    const va = evalExpr(a, env);
    const vb = evalExpr(b, env);
    if (!Number.isFinite(va) || !Number.isFinite(vb)) {
      if (Number.isFinite(va) !== Number.isFinite(vb)) return false;
      continue;
    }
    const scale = Math.max(1, Math.abs(va), Math.abs(vb));
    if (Math.abs(va - vb) > 1e-7 * scale) return false;
    valid++;
  }
  return valid >= 4;
}
