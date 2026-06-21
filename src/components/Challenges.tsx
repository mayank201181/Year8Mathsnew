import { useState } from "react";
import { challenges } from "../data/challenges";
import { units } from "../data/units";
import type { Challenge } from "../types";

function unitTitle(id: string) {
  return units.find((u) => u.id === id)?.title ?? id;
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="card challenge-card">
      <span className="strand-tag">{unitTitle(challenge.unitId)}</span>
      <p className="problem">{challenge.problem}</p>

      {hintsShown > 0 && (
        <div className="hint-list">
          {challenge.hints.slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="hint">
              <strong>Hint {i + 1}: </strong>
              {hint}
            </div>
          ))}
        </div>
      )}

      <div className="reveal-actions">
        {hintsShown < challenge.hints.length && (
          <button className="btn secondary" onClick={() => setHintsShown((n) => n + 1)}>
            💡 {hintsShown === 0 ? "Show a hint" : "Next hint"} ({hintsShown}/
            {challenge.hints.length})
          </button>
        )}
        {!showSolution && (
          <button className="btn" onClick={() => setShowSolution(true)}>
            Reveal full solution
          </button>
        )}
      </div>

      {showSolution && (
        <div className="solution">
          <h4>Solution</h4>
          <ol>
            {challenge.solution.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {challenge.insight && (
            <div className="insight">
              <strong>🧠 Problem-solving insight: </strong>
              {challenge.insight}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Challenges() {
  const [unitId, setUnitId] = useState<string>("all");
  const list =
    unitId === "all" ? challenges : challenges.filter((c) => c.unitId === unitId);

  return (
    <div>
      <div className="section-intro">
        <h2>Challenge Zone 🧠</h2>
        <p>
          The Art of Problem Solving way: attempt each problem yourself first. Stuck? Reveal{" "}
          <em>one hint at a time</em> — just enough to get moving — and only check the full
          solution once you have genuinely wrestled with it.
        </p>
      </div>

      <div className="flash-controls">
        <select value={unitId} onChange={(e) => setUnitId(e.target.value)}>
          <option value="all">All topics ({challenges.length})</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.title}
            </option>
          ))}
        </select>
      </div>

      {list.map((c, i) => (
        <ChallengeCard key={`${c.unitId}-${i}`} challenge={c} />
      ))}
    </div>
  );
}
