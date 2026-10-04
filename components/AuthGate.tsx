"use client";
// Welcome screen: sign in, create a family account, or practise as a guest.
import { useState } from "react";
import { useStore } from "@/lib/store";

type Tab = "welcome" | "login" | "signup";

export function AuthGate() {
  const { login, signup, startGuest, cloudAvailable } = useStore();
  const [tab, setTab] = useState<Tab>("welcome");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = tab === "login" ? await login(name, password) : await signup(name, password, pin);
    setBusy(false);
    if (!r.ok) setError(r.error ?? "Something went wrong.");
  }

  return (
    <div className="mx-auto max-w-lg py-8">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-brand-2 text-4xl text-white shadow-lg" aria-hidden>
          π
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight">Year 8 Maths Lab</h1>
        <p className="mt-2 text-ink-2">Problem-first lessons, auto-marked practice, skill drills and a Daily 5 — built to make you a confident problem solver.</p>
      </div>

      {tab === "welcome" ? (
        <div className="mt-8 space-y-3">
          {cloudAvailable ? (
            <>
              <button type="button" className="btn btn-primary w-full text-lg" onClick={() => setTab("login")}>
                Sign in
              </button>
              <button type="button" className="btn btn-secondary w-full" onClick={() => setTab("signup")}>
                Create a family account
              </button>
            </>
          ) : null}
          <button type="button" className="btn btn-ghost w-full" onClick={startGuest}>
            {cloudAvailable ? "Just practise on this device (guest)" : "Start practising"}
          </button>
          {cloudAvailable ? <p className="text-center text-xs text-ink-2">A family account syncs progress across devices and unlocks the parent dashboard and Professor Pi.</p> : null}
        </div>
      ) : (
        <form className="card mt-8 space-y-4 p-5" onSubmit={submit}>
          <h2 className="text-xl font-extrabold">{tab === "login" ? "Sign in" : "Create a family account"}</h2>
          <label className="block space-y-1">
            <span className="text-sm font-bold text-ink-2">Family name</span>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="username" required maxLength={40} autoFocus />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-bold text-ink-2">Password</span>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={tab === "login" ? "current-password" : "new-password"} required minLength={tab === "signup" ? 6 : 1} />
          </label>
          {tab === "signup" ? (
            <label className="block space-y-1">
              <span className="text-sm font-bold text-ink-2">Parent PIN (4–8 digits)</span>
              <input className="input tracking-[0.3em]" inputMode="numeric" pattern="\d{4,8}" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))} required />
              <span className="block text-xs text-ink-2">Grown-ups use this to open the parent dashboard and manage learners.</span>
            </label>
          ) : null}
          {error ? (
            <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? "Please wait…" : tab === "login" ? "Sign in" : "Create account"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => { setTab("welcome"); setError(null); }}>
              Back
            </button>
          </div>
          <p className="text-sm text-ink-2">
            {tab === "login" ? "New here? " : "Already have an account? "}
            <button type="button" className="font-bold text-brand underline" onClick={() => { setTab(tab === "login" ? "signup" : "login"); setError(null); }}>
              {tab === "login" ? "Create a family account" : "Sign in"}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
