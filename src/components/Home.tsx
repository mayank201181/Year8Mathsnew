import type { Mode } from "../types";
import { units } from "../data/units";
import { quizQuestions } from "../data/quiz";
import { flashcards } from "../data/flashcards";
import { challenges } from "../data/challenges";

const MODES: { mode: Mode; emoji: string; title: string; desc: string }[] = [
  {
    mode: "guide",
    emoji: "📘",
    title: "Study Guide",
    desc: "Clear notes, key formulas and worked examples for every topic.",
  },
  {
    mode: "flashcards",
    emoji: "🃏",
    title: "Flashcards",
    desc: "Flip-cards to drill the facts and formulas you need to recall fast.",
  },
  {
    mode: "quiz",
    emoji: "✅",
    title: "Practice Quiz",
    desc: "Multiple-choice questions with instant feedback and explanations.",
  },
  {
    mode: "challenge",
    emoji: "🧠",
    title: "Challenge Zone",
    desc: "AoPS-style problems: try first, reveal hints one by one, then the solution.",
  },
  {
    mode: "mock",
    emoji: "📝",
    title: "Mock Papers",
    desc: "Full exam-style papers with mark schemes to test yourself under pressure.",
  },
];

export default function Home({ onNavigate }: { onNavigate: (m: Mode) => void }) {
  return (
    <div>
      <div className="hero">
        <h2>Master Year 8 Maths 🚀</h2>
        <p>
          A complete revision companion covering Number, Algebra, Ratio &amp; Proportion, Geometry
          &amp; Measure, and Statistics &amp; Probability — aligned to Cambridge Lower Secondary
          Stage 8.
        </p>
        <p>
          {units.length} topics · {flashcards.length} flashcards · {quizQuestions.length} quiz
          questions · {challenges.length} challenge problems.
        </p>
      </div>

      <div className="mode-grid">
        {MODES.map((m) => (
          <button key={m.mode} className="mode-card" onClick={() => onNavigate(m.mode)}>
            <div className="emoji">{m.emoji}</div>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="aops-banner">
        <h3>🧩 The Art of Problem Solving way</h3>
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.92rem" }}>
          This app borrows the AoPS teaching philosophy. Maths is learned by{" "}
          <em>doing</em>, not just reading. Throughout you will find:
        </p>
        <ul>
          <li>
            <strong>Explore-first prompts</strong> — wrestle with an idea before the explanation,
            so you discover the rule rather than memorise it.
          </li>
          <li>
            <strong>Progressive hints</strong> — in the Challenge Zone, reveal one nudge at a time
            and keep your own thinking in the driving seat.
          </li>
          <li>
            <strong>Problem-solving insights</strong> — every challenge names a transferable idea
            you can reuse on harder problems.
          </li>
          <li>
            <strong>Productive struggle</strong> — getting stuck, then unstuck, is where real
            learning happens.
          </li>
        </ul>
      </div>
    </div>
  );
}
