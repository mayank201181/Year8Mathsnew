"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

const AVATARS = ["🦊", "🐼", "🐧", "🦁", "🐙", "🦄", "🐢", "🦉", "🐸", "🐝"];

export default function ProfilePicker() {
  const { account, selectProfile, refresh, logout } = useStore();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [busy, setBusy] = useState(false);

  async function addProfile() {
    setBusy(true);
    try {
      await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatar }),
      });
      setName("");
      setAdding(false);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-1">Who&apos;s studying? 🧮</h1>
        <p className="text-slate-400 mb-6">Choose a learner profile to track progress.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {account?.profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProfile(p.id)}
              className="bg-slate-800/70 hover:bg-slate-700 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-2"
            >
              <span className="text-4xl">{p.avatar}</span>
              <span className="font-semibold">{p.name}</span>
            </button>
          ))}

          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-2xl p-4 flex flex-col items-center gap-2 text-slate-400"
            >
              <span className="text-4xl">＋</span>
              <span>Add learner</span>
            </button>
          )}
        </div>

        {adding && (
          <div className="mt-5 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-left">
            <label className="block text-sm mb-2">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
                placeholder="Learner's name"
              />
            </label>
            <div className="flex flex-wrap gap-2 my-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`text-2xl w-10 h-10 rounded-lg ${
                    avatar === a ? "bg-indigo-500/30 ring-2 ring-indigo-400" : "bg-slate-800"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={addProfile}
                disabled={!name || busy}
                className="flex-1 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 rounded-lg py-2 font-semibold"
              >
                {busy ? "Adding…" : "Create"}
              </button>
              <button onClick={() => setAdding(false)} className="px-4 rounded-lg bg-slate-800">
                Cancel
              </button>
            </div>
          </div>
        )}

        <button onClick={logout} className="mt-6 text-sm text-slate-500 hover:text-slate-300">
          Log out
        </button>
      </div>
    </div>
  );
}
