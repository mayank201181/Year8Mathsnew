import { useState } from "react";
import { units } from "../data/units";

export default function StudyGuide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const unit = units.find((u) => u.id === selectedId) ?? null;

  if (!unit) {
    return (
      <div>
        <div className="section-intro">
          <h2>Study Guide</h2>
          <p>Choose a topic to read the notes, key formulas and worked examples.</p>
        </div>
        <div className="grid">
          {units.map((u) => (
            <div key={u.id} className="card unit-card" onClick={() => setSelectedId(u.id)}>
              <span className="strand-tag">{u.strand}</span>
              <h3>{u.title}</h3>
              <p>{u.summary}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={() => setSelectedId(null)}>
        ← All topics
      </button>
      <div className="section-intro">
        <span className="strand-tag">{unit.strand}</span>
        <h2 style={{ marginTop: "0.5rem" }}>{unit.title}</h2>
        <p>{unit.summary}</p>
      </div>

      {unit.sections.map((section, i) => (
        <div key={i} className="card guide-section">
          <h3>{section.heading}</h3>

          {section.explore && (
            <div className="explore-box">
              <strong>🔎 Explore first</strong>
              {section.explore}
            </div>
          )}

          {section.notes.map((note, j) => (
            <p key={j}>{note}</p>
          ))}

          {section.keyFacts && section.keyFacts.length > 0 && (
            <div className="keyfacts">
              <strong>Key facts</strong>
              <ul>
                {section.keyFacts.map((fact, k) => (
                  <li key={k}>{fact}</li>
                ))}
              </ul>
            </div>
          )}

          {section.examples?.map((ex, m) => (
            <div key={m} className="example">
              <p className="q">Worked example: {ex.problem}</p>
              <ol>
                {ex.solution.map((step, n) => (
                  <li key={n}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
