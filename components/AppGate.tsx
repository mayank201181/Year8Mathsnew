"use client";

import { useStore } from "@/lib/store";
import Header from "./Header";
import Mascot from "./Mascot";
import ProfilePicker from "./ProfilePicker";

export default function AppGate({ children }: { children: React.ReactNode }) {
  const { status, activeProfile, selectProfile, logout } = useStore();

  if (status === "load-error") {
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold">We couldn&apos;t safely load your progress</h1>
          <p>Your cloud progress has not been replaced. Try again before continuing.</p>
          <div className="flex justify-center gap-3">
            {activeProfile && <button onClick={() => selectProfile(activeProfile.id)}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Try again</button>}
            <button onClick={() => { void logout(); }}
              className="rounded-xl border px-5 py-3 font-semibold">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <div className="text-5xl animate-floaty">🧮</div>
          <p className="mt-3 text-slate-400">Loading your Maths Lab…</p>
        </div>
      </div>
    );
  }

  if (status === "no-profile") {
    return <ProfilePicker />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">{children}</main>
      <Mascot />
      <footer className="text-center text-xs text-slate-500 py-6 border-t border-slate-800/60">
        Year 8 Maths Lab · Cambridge Lower Secondary Stage 8 · Built for curious problem-solvers.
      </footer>
    </div>
  );
}

