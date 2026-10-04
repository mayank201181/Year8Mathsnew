// ---------------------------------------------------------------------------
// Content data model for the Year 8 Maths Lab (v2).
//
// Audited exam content lives in lib/topics/<id>/{guide,mcq,practice}.ts.
// Engagement extras live in lib/extras/<id>.ts and never touch audited files.
// Procedural skill drills live in lib/drills/<id>.ts.
//
// TEXT FORMAT ("markdown-lite + maths markup") — used by every string field
// that is rendered as text (bodies, questions, options, steps, hints …):
//   **bold**   *italic*   `code`
//   blank line = new paragraph;  "- " bullet lines;  "1. " numbered lines
//   | a | b |  pipe tables (first row = header, second row may be |---|---|)
//   {{ … }}    inline maths, rendered as real maths (MathML):
//              {{3/4}} stacked fraction · {{2 1/3}} mixed number
//              {{x^2}} {{10^(-3)}} powers · {{sqrt(49)}} {{cbrt(27)}} roots
//              {{(2x+1)/3}} brackets group a numerator/denominator/exponent
//              * → ×   - → −   pi → π   <= → ≤   >= → ≥   != → ≠
//   Plain unicode (×, ÷, −, ², ³, π, °, ≤, ≥) is fine outside {{ }} too.
// ---------------------------------------------------------------------------

export type Strand =
  | "Number"
  | "Algebra"
  | "Ratio & Proportion"
  | "Geometry & Measure"
  | "Statistics & Probability";

export type Difficulty = "warmup" | "core" | "challenge";

/** AoPS discovery opener: a problem to attempt BEFORE the idea is explained. */
export interface Discovery {
  problem: string;
  /** Revealed after the learner has had a go. */
  idea: string;
}

/** One illuminating method for a worked solution (AoPS: multiple paths). */
export interface SolutionMethod {
  label: string;
  steps: string[];
}

// ---------------------------------------------------------------------------
// Auto-marked answers
// ---------------------------------------------------------------------------

/**
 * How a typed answer is checked. The checker (lib/answerCheck.ts) is
 * forgiving about format (spaces, unicode minus, "x =" prefixes, units,
 * currency symbols) but strict about value and, where asked, form.
 */
export type AnswerSpec =
  /** A single number. Accepts 0.75, 3/4, 1 3/4, −2, 1,200, £46, 12 cm … */
  | {
      type: "number";
      value: number;
      /** Absolute tolerance (default ~1e-9). Use for "to 1 d.p." etc. only if you want leniency. */
      tolerance?: number;
      /** Set false when the question asks for a decimal (so "3/4" is NOT accepted). Default true. */
      allowFraction?: boolean;
      /** Require standard form a × 10^n with 1 ≤ a < 10 (input like "3.2 x 10^4"). */
      standardForm?: boolean;
      /** How to show the answer, e.g. "£46" or "{{3/4}}". Defaults to the number. */
      display?: string;
    }
  /** A fraction n/d. Accepts equivalent fractions and mixed numbers unless restricted. */
  | {
      type: "fraction";
      n: number;
      d: number;
      /** Require lowest terms (6/8 is then "equivalent, simplify fully"). */
      simplest?: boolean;
      /** "mixed" requires a mixed number (e.g. 2 1/3), "improper" requires a/b. Default any. */
      form?: "any" | "mixed" | "improper";
      /** Also accept the equal decimal (e.g. 0.75 for 3/4). Default false. */
      allowDecimal?: boolean;
      display?: string;
    }
  /** Several numbers: "28, 35", "(3, −2)", "x = 2 or x = −3". */
  | {
      type: "list";
      values: number[];
      /** true for coordinates / ordered answers. Default false (any order). */
      ordered?: boolean;
      tolerance?: number;
      display?: string;
    }
  /** A ratio a : b (: c). */
  | {
      type: "ratio";
      parts: number[];
      /** Require simplest form (12:16 → "equivalent, simplify fully"). */
      simplest?: boolean;
      display?: string;
    }
  /**
   * An algebraic expression, checked by evaluating at random values
   * (so 2(x+3), 2x+6 and 6+2x are all equal). Use plain ASCII like
   * "2x+6", "x^2-9", "3(a+2b)", "(x+2)(x+3)". "y = …" is accepted.
   */
  | {
      type: "expression";
      expr: string;
      /**
       * factorised: answer must be a product (e.g. 3(x+2)), not expanded.
       * expanded:   answer must have no brackets.
       * simplified: answer must have no more terms than `expr`.
       */
      form?: "any" | "factorised" | "expanded" | "simplified";
      display?: string;
    }
  /** Free text matched against accepted alternatives (case/space-insensitive). */
  | {
      type: "text";
      accept: string[];
      display?: string;
    };

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

interface QuestionBase {
  /** Globally unique, e.g. "fractions-m2-q07". */
  id: string;
  question: string;
  /** Optional inline SVG (viewBox, xmlns, role="img", aria-label; no backticks, no "${"). */
  diagram?: string;
  difficulty: Difficulty;
  /** id of the GuideSection this practises (for "back to the guide"). */
  guideRef?: string;
  /** AoPS hint ladder, revealed one at a time: nudge → bigger hint → key step. */
  hints: string[];
  /** Named problem-solving strategy, e.g. "Work backwards". */
  strategy?: string;
  /** Exam questions only: the topic id this question tests. */
  topicId?: string;
}

export interface MCQ extends QuestionBase {
  kind: "mcq";
  /** Exactly 4 options. Never refer to options by letter/position in text. */
  options: string[];
  answerIndex: number;
  /** Why the answer is right AND why a tempting distractor is wrong. */
  explanation: string;
}

/**
 * A predictable wrong answer with targeted feedback, e.g. the sign error or
 * forgetting to simplify. Checked only after the real answer fails.
 */
export interface Trap {
  spec: AnswerSpec;
  feedback: string;
}

export interface ShortQ extends QuestionBase {
  kind: "short";
  answer: AnswerSpec;
  /** Optional common wrong answers with targeted feedback. */
  traps?: Trap[];
  /** Worked solution steps (shown after an attempt). */
  solution: string[];
  /** Optional extra methods (AoPS multiple paths). */
  solutions?: SolutionMethod[];
  commonError?: string;
}

/** One credit-worthy point in a written (explain / show / prove) answer. */
export interface MarkPoint {
  point: string;
  /** Lower-case words/numbers a learner would write for this point (used to suggest ticks). */
  keywords: string[];
}

export interface WrittenQ extends QuestionBase {
  kind: "written";
  /** = markScheme.length */
  marks: number;
  modelAnswer: string;
  markScheme: MarkPoint[];
  commonError?: string;
  solutions?: SolutionMethod[];
}

export type Question = MCQ | ShortQ | WrittenQ;

export interface Paper {
  /** Globally unique, e.g. "fractions-m1" / "fractions-p3". */
  id: string;
  title: string;
  questions: Question[];
}

// ---------------------------------------------------------------------------
// Guide & learn-smart
// ---------------------------------------------------------------------------

export interface WorkedExample {
  title?: string;
  problem: string;
  steps: string[];
  answer: string;
  /** Faded follow-up: a near-identical problem the learner solves (auto-marked). */
  yourTurn?: {
    question: string;
    answer: AnswerSpec;
    /** Short worked solution shown after they try. */
    solution: string;
  };
}

export interface GuideSection {
  /** Stable kebab-case slug (deep-link target for guideRef). */
  id: string;
  heading: string;
  discovery?: Discovery;
  body: string;
  /** Inline SVG diagram. */
  diagram?: string;
  diagramCaption?: string;
  workedExamples?: WorkedExample[];
  keyPoints?: string[];
  /** "Why does this work?" — a short derivation / visual reason. */
  whyItWorks?: string;
  /** Named strategies relevant to this section. */
  strategies?: string[];
  /** AoPS-style extension prompt that makes them reason. */
  thinkDeeper?: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface Misconception {
  wrong: string;
  right: string;
}

export interface Mnemonic {
  topic: string;
  device: string;
  explanation: string;
}

export interface RealWorld {
  title: string;
  detail: string;
  emoji?: string;
}

export interface VideoLink {
  title: string;
  channel: string;
  /** Prefer YouTube search URLs so links never die. */
  url: string;
}

export interface FormulaFact {
  name: string;
  /** May use {{ }} maths markup. */
  formula: string;
  note?: string;
}

export interface LearnSmart {
  flashcards: Flashcard[];
  /** "Can you…?" checklist. */
  mustKnow: string[];
  misconceptions: Misconception[];
  examMistakes: string[];
  mnemonics: Mnemonic[];
  realWorld: RealWorld[];
  videos: VideoLink[];
  /** Key formulas / facts for this topic (feeds the formula sheet). */
  formulas: FormulaFact[];
}

/** Written by the guide author: lib/topics/<id>/guide.ts */
export interface TopicGuide {
  id: string;
  title: string;
  strand: Strand;
  /** Short emoji or 1-3 character label. */
  icon: string;
  /** One-line hook for the topic card. */
  summary: string;
  intro: string;
  guide: GuideSection[];
  learn: LearnSmart;
}

/** Written by the practice author: lib/topics/<id>/practice.ts */
export interface TopicPractice {
  /** Quick-check quiz (mixed kinds, ~10 questions). */
  quiz: Question[];
  /** Practice papers: mostly short (auto-marked) with some written. */
  papers: Paper[];
  /** AoPS-hard challenge problems with full hint ladders. */
  challenge: Question[];
}

export interface Topic extends TopicGuide {
  quiz: Question[];
  /** MCQ papers then practice papers. */
  mcqPapers: Paper[];
  practicePapers: Paper[];
  challenge: Question[];
  /** Stage 9 / Year 9 look-ahead topic. */
  stretch?: boolean;
}

// ---------------------------------------------------------------------------
// Comprehensive cross-topic exam
// ---------------------------------------------------------------------------

export interface ExamPaper extends Paper {
  calculator: boolean;
  /** Suggested minutes. */
  minutes: number;
}

// ---------------------------------------------------------------------------
// Engagement extras (separate from audited content)
// ---------------------------------------------------------------------------

export interface Activity {
  title: string;
  emoji: string;
  materials: string[];
  steps: string[];
  /** The maths behind it. */
  maths: string;
}

export interface BonusDiagram {
  title: string;
  svg: string;
  caption?: string;
}

export interface TopicExtras {
  /** 1-2 sentence curiosity hook shown at the top of the guide. */
  hook?: string;
  didYouKnow?: string[];
  activities?: Activity[];
  bonusDiagrams?: BonusDiagram[];
  /** A short story from maths history. */
  history?: { title: string; story: string };
}

// ---------------------------------------------------------------------------
// Global question index entry
// ---------------------------------------------------------------------------

export type QuestionSource = "quiz" | "mcq" | "practice" | "challenge" | "exam";

export interface IndexedQuestion {
  qid: string;
  topicId: string;
  source: QuestionSource;
  paperId?: string;
  question: Question;
}
