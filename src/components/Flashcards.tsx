import { useMemo, useState } from "react";
import { flashcards } from "../data/flashcards";
import { units } from "../data/units";

export default function Flashcards() {
  const [unitId, setUnitId] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(
    () => (unitId === "all" ? flashcards : flashcards.filter((c) => c.unitId === unitId)),
    [unitId]
  );

  const card = deck[index];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + deck.length) % deck.length);
  }

  function changeUnit(id: string) {
    setUnitId(id);
    setIndex(0);
    setFlipped(false);
  }

  function shuffle() {
    setFlipped(false);
    setIndex(Math.floor(Math.random() * deck.length));
  }

  return (
    <div>
      <div className="section-intro">
        <h2>Flashcards</h2>
        <p>Click a card to flip it. Recall the answer before you check.</p>
      </div>

      <div className="flash-controls">
        <select value={unitId} onChange={(e) => changeUnit(e.target.value)}>
          <option value="all">All topics ({flashcards.length})</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.title}
            </option>
          ))}
        </select>
        <button className="btn secondary" onClick={shuffle}>
          🔀 Shuffle
        </button>
      </div>

      {card ? (
        <>
          <div className="flash-progress">
            Card {index + 1} of {deck.length}
          </div>
          <div className="flashcard">
            <div
              className={`flashcard__inner ${flipped ? "flipped" : ""}`}
              onClick={() => setFlipped((f) => !f)}
            >
              <div className="flashcard__face flashcard__front">
                <span className="label">Question</span>
                <span className="content">{card.front}</span>
              </div>
              <div className="flashcard__face flashcard__back">
                <span className="label">Answer</span>
                <span className="content">{card.back}</span>
              </div>
            </div>
          </div>
          <div className="center-row">
            <button className="btn secondary" onClick={() => go(-1)}>
              ← Previous
            </button>
            <button className="btn secondary" onClick={() => setFlipped((f) => !f)}>
              Flip
            </button>
            <button className="btn" onClick={() => go(1)}>
              Next →
            </button>
          </div>
        </>
      ) : (
        <p>No cards for this topic yet.</p>
      )}
    </div>
  );
}
