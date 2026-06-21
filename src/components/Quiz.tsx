import { useMemo, useState } from "react";
import { quizQuestions } from "../data/quiz";
import { units } from "../data/units";

export default function Quiz() {
  const [unitId, setUnitId] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const pool = useMemo(
    () => (unitId === "all" ? quizQuestions : quizQuestions.filter((q) => q.unitId === unitId)),
    [unitId]
  );

  function reset(id: string) {
    setUnitId(id);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  }

  function restart() {
    reset(unitId);
  }

  const question = pool[index];

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    setAnswered((a) => a + 1);
    if (optionIndex === question.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= pool.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  const percent = pool.length ? Math.round((answered / pool.length) * 100) : 0;

  if (finished) {
    const pct = Math.round((score / pool.length) * 100);
    const verdict =
      pct >= 80 ? "Excellent work! 🎉" : pct >= 50 ? "Good effort — keep practising! 💪" : "Review the topics and try again. 📚";
    return (
      <div>
        <div className="card result-card">
          <div className="score">
            {score}/{pool.length}
          </div>
          <p className="verdict">
            {pct}% · {verdict}
          </p>
          <div className="center-row">
            <button className="btn" onClick={restart}>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-intro">
        <h2>Practice Quiz</h2>
        <p>Pick an answer to see instant feedback and an explanation.</p>
      </div>

      <div className="flash-controls">
        <select value={unitId} onChange={(e) => reset(e.target.value)}>
          <option value="all">All topics ({quizQuestions.length})</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.title}
            </option>
          ))}
        </select>
      </div>

      <div className="quiz-meta">
        <span>
          Question {index + 1} of {pool.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
      </div>

      {question && (
        <div className="card question-card">
          <h3>{question.question}</h3>
          <div className="options">
            {question.options.map((opt, i) => {
              let cls = "option";
              if (selected !== null) {
                if (i === question.answer) cls += " correct";
                else if (i === selected) cls += " wrong";
              }
              return (
                <button
                  key={i}
                  className={cls}
                  disabled={selected !== null}
                  onClick={() => choose(i)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className={`explanation ${selected === question.answer ? "ok" : "no"}`}>
              <strong>{selected === question.answer ? "Correct! " : "Not quite. "}</strong>
              {question.explanation}
            </div>
          )}

          {selected !== null && (
            <div className="quiz-footer">
              <button className="btn" onClick={next}>
                {index + 1 >= pool.length ? "See results" : "Next question →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
