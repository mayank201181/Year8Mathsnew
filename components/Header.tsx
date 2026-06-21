"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { rankForStars } from "@/lib/ranks";
import AuthDialog from "./AuthDialog";

export default function Header() {
  const { account, activeProfile, progress, logout, status } = useStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rank = rankForStars(progress.stars);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-lg">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 text-white">
            8
          </span>
          <span className="hidden sm:inline">Maths Lab</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-2 text-sm">
          <Link href="/" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/70">Topics</Link>
          <Link href="/exam" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/70">Big Exam</Link>
          <Link href="/review" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/70">Review</Link>
          <Link href="/progress" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/70">Progress</Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm bg-slate-800/60 rounded-full px-3 py-1.5">
            <span title="Stars">⭐ {progress.stars}</span>
            <span className="text-slate-500">·</span>
            <span title="Day streak">🔥 {progress.streak}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 bg-slate-800/60 hover:bg-slate-700 rounded-full pl-1 pr-3 py-1"
            >
              <span className="grid place-items-center w-7 h-7 rounded-full bg-slate-700 text-base">
                {activeProfile?.avatar ?? "🦊"}
              </span>
              <span className="text-sm hidden sm:inline">{activeProfile?.name ?? "Guest"}</span>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-2 text-sm"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="px-3 py-2 text-slate-400">
                  {rank.emoji} {rank.name}
                </div>
                <div className="border-t border-slate-800 my-1" />
                {account ? (
                  <>
                    <Link href="/parent" className="block px-3 py-2 rounded-lg hover:bg-slate-800">
                      👪 Parent dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setAuthOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                  >
                    ☁️ Save progress / sign in
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {status === "anon" && (
        <div className="bg-indigo-500/10 border-t border-indigo-500/20 text-center text-xs py-1.5 text-indigo-200">
          Playing as Guest — progress saves on this device.{" "}
          <button onClick={() => setAuthOpen(true)} className="underline font-semibold">
            Create a free account
          </button>{" "}
          to sync across devices.
        </div>
      )}

      {authOpen && <AuthDialog onClose={() => setAuthOpen(false)} />}
    </header>
  );
}
