import { useState } from "react";
import type { Mode } from "./types";
import Home from "./components/Home";
import StudyGuide from "./components/StudyGuide";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Challenges from "./components/Challenges";
import MockPapers from "./components/MockPapers";

const NAV: { mode: Mode; label: string }[] = [
  { mode: "home", label: "Home" },
  { mode: "guide", label: "Study Guide" },
  { mode: "flashcards", label: "Flashcards" },
  { mode: "quiz", label: "Practice Quiz" },
  { mode: "challenge", label: "Challenge Zone" },
  { mode: "mock", label: "Mock Papers" },
];

export default function App() {
  const [mode, setMode] = useState<Mode>("home");

  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-header__title">
            <span className="app-header__badge">8</span>
            Year 8 Maths
          </h1>
          <p className="app-header__subtitle">
            Study guide, flashcards, quizzes &amp; mock papers — with AoPS-style problem solving.
          </p>
          <nav className="nav">
            {NAV.map((item) => (
              <button
                key={item.mode}
                className={mode === item.mode ? "active" : ""}
                onClick={() => setMode(item.mode)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {mode === "home" && <Home onNavigate={setMode} />}
        {mode === "guide" && <StudyGuide />}
        {mode === "flashcards" && <Flashcards />}
        {mode === "quiz" && <Quiz />}
        {mode === "challenge" && <Challenges />}
        {mode === "mock" && <MockPapers />}
      </main>

      <footer className="app-footer">
        Year 8 Maths · Cambridge Lower Secondary Stage 8 / KS3 · Built for revision and
        problem-solving practice.
      </footer>
    </>
  );
}
