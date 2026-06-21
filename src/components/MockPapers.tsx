import { useState } from "react";
import { mockPapers } from "../data/mockPapers";
import type { MockPaper, MockQuestion } from "../types";

function QuestionBlock({ q }: { q: MockQuestion }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card mock-question">
      <div className="qhead">
        <span className="qnum">Question {q.number}</span>
        <span className="marks">[{q.marks} mark{q.marks === 1 ? "" : "s"}]</span>
      </div>
      <p className="qtext">{q.question}</p>
      <button className="btn secondary" onClick={() => setShow((s) => !s)}>
        {show ? "Hide mark scheme" : "Show mark scheme"}
      </button>
      {show && (
        <div className="markscheme">
          <strong>Mark scheme</strong>
          {q.answer.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MockPapers() {
  const [paper, setPaper] = useState<MockPaper | null>(null);

  if (!paper) {
    return (
      <div>
        <div className="section-intro">
          <h2>Mock Papers</h2>
          <p>
            Work through a full paper on paper first, timing yourself, then reveal each mark
            scheme to check your answers and method.
          </p>
        </div>
        <div className="grid">
          {mockPapers.map((p) => (
            <div key={p.id} className="card unit-card" onClick={() => setPaper(p)}>
              <span className="strand-tag">{p.totalMarks} marks</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={() => setPaper(null)}>
        ← All papers
      </button>
      <div className="section-intro">
        <h2>{paper.title}</h2>
        <p>
          {paper.description} <strong>Total: {paper.totalMarks} marks.</strong>
        </p>
      </div>
      {paper.questions.map((q) => (
        <QuestionBlock key={q.number} q={q} />
      ))}
    </div>
  );
}
