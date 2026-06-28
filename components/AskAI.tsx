"use client";

import { useState } from "react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const PRESETS = [
  { label: "Explain simply", text: "Explain this topic simply with an example." },
  { label: "Give a hint", text: "I'm stuck — give me just one hint, not the answer." },
  { label: "Why does it work?", text: "Why does this method work?" },
];

export default function AskAI({ context }: { context?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Tutor unavailable");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-30 bg-gradient-to-br from-indigo-500 to-teal-400 text-white rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg hover:scale-105 transition"
      >
        🦉 Ask Professor Pi
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 w-[min(92vw,360px)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[70vh]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <span className="font-bold">🦉 Professor Pi</span>
        <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-200">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm">
        {messages.length === 0 && (
          <p className="text-slate-400">
            Hi! I&apos;m your maths tutor. I&apos;ll nudge you with hints rather than just give answers.
            What are you working on?
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl px-3 py-2 ${
              m.role === "user" ? "bg-indigo-500/20 ml-6" : "bg-slate-800 mr-6"
            }`}
          >
            {m.content}
          </div>
        ))}
        {busy && <p className="text-slate-500">Professor Pi is thinking…</p>}
        {error && <p className="text-rose-400">{error}</p>}
      </div>

      <div className="px-3 pb-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => send(p.text)}
              className="text-xs bg-slate-800 hover:bg-slate-700 rounded-full px-2.5 py-1"
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask a question…"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={() => send(input)}
            disabled={busy}
            className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 rounded-lg px-3 text-sm font-semibold"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
