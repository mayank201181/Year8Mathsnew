export interface GuideExample {
  problem: string;
  solution: string[];
}

export interface GuideSection {
  heading: string;
  /**
   * AoPS-style Socratic prompt: a question to grapple with BEFORE reading the
   * explanation, so the idea is discovered rather than simply told.
   */
  explore?: string;
  /** Plain paragraphs of explanation. */
  notes: string[];
  /** Key facts / formulas worth memorising. */
  keyFacts?: string[];
  /** Fully worked examples. */
  examples?: GuideExample[];
}

/**
 * AoPS-style challenge problem. The student tries it first, then reveals
 * progressive hints one at a time, and only then the full solution. The
 * optional insight names the transferable problem-solving idea.
 */
export interface Challenge {
  unitId: string;
  problem: string;
  hints: string[];
  solution: string[];
  insight?: string;
}

export interface Unit {
  id: string;
  title: string;
  /** Short strand label e.g. "Number", "Algebra". */
  strand: string;
  /** One-line summary used on cards. */
  summary: string;
  sections: GuideSection[];
}

export interface Flashcard {
  unitId: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  unitId: string;
  question: string;
  options: string[];
  /** Index into options of the correct answer. */
  answer: number;
  explanation: string;
}

export interface MockQuestion {
  number: string;
  marks: number;
  question: string;
  /** Mark-scheme style worked answer. */
  answer: string[];
}

export interface MockPaper {
  id: string;
  title: string;
  description: string;
  totalMarks: number;
  questions: MockQuestion[];
}

export type Mode = "home" | "guide" | "flashcards" | "quiz" | "challenge" | "mock";
