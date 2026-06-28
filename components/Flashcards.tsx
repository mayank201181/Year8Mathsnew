"use client";

import { useState } from "react";
import type { LearnCard } from "@/lib/types";

export default function Flashcards({ cards }: { cards: LearnCard[] }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return <p className="text-slate-400">No flashcards yet.</p>;

  const card = cards[order[pos]];

  function go(delta: number) {
    setFlipped(false);
    setPos((p) => (p + delta + cards.length) % cards.length);
  }
  function shuffle() {
    setFlipped(false);
    setOrder((o) => [...o].sort(() => Math.random() - 0.5));
    setPos(0);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-400">
          Card {pos + 1} of {cards.length}
        </span>
        <button onClick={shuffle} className="text-sm bg-slate-800 rounded-lg px-3 py-1.5">
          🔀 Shuffle
        </button>
      </div>

      <div className="flip max-w-lg mx-auto cursor-pointer" onClick={() => setFlipped((f) => !f)}>
        <div className={`flip-inner relative ${flipped ? "flipped" : ""}`} style={{ minHeight: 200 }}>
          <div className="flip-face absolute inset-0 grid place-items-center text-center bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Question</p>
              <p className="text-xl font-semibold">{card.front}</p>
            </div>
          </div>
          <div className="flip-face flip-back absolute inset-0 grid place-items-center text-center bg-gradient-to-br from-indigo-600 to-teal-500 rounded-2xl p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-indigo-100 mb-2">Answer</p>
              <p className="text-lg font-semibold text-white">{card.back}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button onClick={() => go(-1)} className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
          ← Prev
        </button>
        <button onClick={() => setFlipped((f) => !f)} className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
          Flip
        </button>
        <button onClick={() => go(1)} className="bg-indigo-500 hover:bg-indigo-400 rounded-lg px-4 py-2 text-sm">
          Next →
        </button>
      </div>
    </div>
  );
}
