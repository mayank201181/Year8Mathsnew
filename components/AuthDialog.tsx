"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export default function AuthDialog({ onClose }: { onClose: () => void }) {
  const { refresh } = useStore();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, pin }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      await refresh();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-1">
          {mode === "signup" ? "Create your family account" : "Welcome back"}
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          {mode === "signup"
            ? "One account, multiple learners, synced across devices."
            : "Sign in to sync your progress."}
        </p>

        <label className="block text-sm mb-2">
          Family name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
            placeholder="e.g. The Sharmas"
          />
        </label>
        <label className="block text-sm mb-2">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
          />
        </label>
        {mode === "signup" && (
          <label className="block text-sm mb-2">
            Parent PIN (4 digits)
            <input
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
              placeholder="Protects the parent dashboard"
            />
          </label>
        )}

        {error && <p className="text-rose-400 text-sm mt-2">{error}</p>}

        <button
          onClick={submit}
          disabled={busy || !name || !password || (mode === "signup" && pin.length !== 4)}
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 rounded-lg py-2.5 font-semibold"
        >
          {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>

        <button
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="mt-3 w-full text-sm text-slate-400 hover:text-slate-200"
        >
          {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
