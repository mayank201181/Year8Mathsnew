// ---------------------------------------------------------------------------
// Core content data model for the Year 8 Maths Lab.
// Audited exam content (topics) is kept separate from engagement extras.
// ---------------------------------------------------------------------------

export type Difficulty = "warmup" | "core" | "challenge";

/** One illuminating method for a worked solution. */
export interface SolutionMethod {
  label: string;
  steps: string[];
}

/** AoPS discovery opener: a problem to attempt before the idea is explained. */
export interface Discovery {
  problem: string;
  idea: string;
}

export interface GuideSection {
  heading: string;
  /** markdown-lite body (paragraphs separated by blank lines; **bold**, *italic*, `code`). */
  body: string;
  /** Inline SVG diagram strings (authored with viewBox, xmlns, role, aria-label). */
  diagrams?: string[];
  keyPoints?: string[];
  thinkDeeper?: string;
  /** AoPS: problem-first opener. */
  discovery?: Discovery;
  /** AoPS: named problem-solving strategies relevant to this section. */
  strategies?: string[];
  /** AoPS: short "why does this work?" derivation. */
  whyItWorks?: string;
}

export interface LearnCard {
  front: string;
  back: string;
}

export interface LearnSmart {
  /** Flashcards for fast recall. */
  cards: LearnCard[];
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  guideRef?: string;
  difficulty: Difficulty;
  /** AoPS hint ladder (gentle nudge -> bigger hint -> key step). */
  hints?: string[];
  strategy?: string;
}

export interface QA {
  id: string;
  question: string;
  modelAnswer: string;
  markScheme: string[];
  commonError?: string;
  guideRef?: string;
  difficulty: Difficulty;
  hints?: string[];
  strategy?: string;
  /** One or more worked methods (AoPS multiple solution paths). */
  solutions?: SolutionMethod[];
}

export interface Paper<T> {
  id: string;
  title: string;
  questions: T[];
}

export interface QuestionBank {
  mcqPapers: Paper<MCQ>[];
  qaPapers: Paper<QA>[];
}

export interface Topic {
  id: string;
  title: string;
  subject: string;
  /** Emoji or short label used as an icon. */
  icon: string;
  strand: string;
  intro: string;
  guide: GuideSection[];
  learn: LearnSmart;
  quiz: { mcq: MCQ[]; qa: QA[] };
  questionBank: QuestionBank;
}

// --- Engagement extras (kept separate so they never touch audited content) ---

export interface Experiment {
  title: string;
  materials?: string[];
  steps: string[];
  whatToNotice?: string;
}

export interface TopicExtras {
  topicId: string;
  hook?: string;
  didYouKnow?: string[];
  experiments?: Experiment[];
  bonusDiagrams?: string[];
  /** Key into the Explorables registry. */
  interactive?: string;
  /** Optional: several interactive widget keys for the Interactive tab. */
  interactives?: string[];
}

// --- Comprehensive cross-topic exam ---

export interface ComprehensiveExam {
  mcqPapers: Paper<MCQ>[];
  qaPapers: Paper<QA>[];
}

// --- Global question index entry (built from all topics + exam) ---

export interface IndexedQuestion {
  qid: string;
  topicId: string;
  kind: "mcq" | "qa";
  difficulty: Difficulty;
  question: MCQ | QA;
}
