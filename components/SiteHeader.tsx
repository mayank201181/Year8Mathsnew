"use client";
// Top bar (logo, desktop nav, stars, profile menu) and a mobile bottom tab bar.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { rankFor } from "@/lib/learning";
import { addDaysISO, todayISO } from "@/lib/dates";

const NAV = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/topics", label: "Topics", icon: "📚" },
  { href: "/daily", label: "Daily 5", icon: "🎯" },
  { href: "/review", label: "Review", icon: "🔁" },
  { href: "/progress", label: "Progress", icon: "📈" },
];

function active(path: string, href: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

export function SiteHeader() {
  const { data, activeProfile, mode, account, switchProfile, logout, leaveGuest } = useStore();
  const path = usePathname() ?? "/";
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  const menuRef = useRef<HTMLDivElement>(null);
  const { rank } = rankFor(data.stars);
  // streak.count only resets on the next activity, so show it only while it is still alive.
  const streak = data.streak;
  const streakLive = streak.count > 1 && (streak.last === todayISO() || streak.last === addDaysISO(-1));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenAt(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-lg text-white" aria-hidden>
            π
          </span>
          <span className="hidden sm:inline">Maths Lab</span>
        </Link>
        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.slice(1).map((n) => (
            <Link key={n.href} href={n.href} className={`rounded-lg px-3 py-1.5 text-sm font-bold ${active(path, n.href) ? "bg-brand-soft text-brand" : "text-ink-2 hover:bg-surface-2"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/progress" className="chip text-sm" title={`${rank.name} · ${data.stars} stars`}>
            ⭐ {data.stars}
          </Link>
          {streakLive ? (
            <span className="chip hidden text-sm sm:inline-flex" title="Days in a row">
              🔥 {streak.count}
            </span>
          ) : null}
          <div className="relative" ref={menuRef}>
            <button type="button" onClick={() => setOpenAt(open ? null : path)} aria-expanded={open} aria-haspopup="menu" className="flex h-10 items-center gap-1 rounded-xl px-2 hover:bg-surface-2">
              <span className="text-2xl" aria-hidden>
                {activeProfile?.avatar ?? "🙂"}
              </span>
              <span className="hidden max-w-[8rem] truncate text-sm font-bold sm:inline">{activeProfile?.name ?? "Menu"}</span>
            </button>
            {open ? (
              <div role="menu" className="card absolute right-0 top-12 z-40 w-60 p-2 text-sm">
                <div className="px-3 py-2 text-xs text-ink-2">{mode === "guest" ? "Guest — saved on this device only" : `${account?.name ?? ""} family`}</div>
                <Link role="menuitem" href="/skills" className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                  🧩 Skills & mastery
                </Link>
                <Link role="menuitem" href="/sprint" className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                  ⚡ Fluency sprint
                </Link>
                <Link role="menuitem" href="/exam" className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                  📝 The Big Exam
                </Link>
                <Link role="menuitem" href="/formulas" className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                  📋 Formula sheet
                </Link>
                <hr className="my-1 border-line" />
                {mode === "cloud" ? (
                  <>
                    <Link role="menuitem" href="/parent" className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                      👪 Parent dashboard
                    </Link>
                    {account && account.profiles.length > 1 ? (
                      <button role="menuitem" type="button" className="block w-full rounded-lg px-3 py-2 text-left hover:bg-surface-2" onClick={switchProfile}>
                        🔄 Switch learner
                      </button>
                    ) : null}
                    <button role="menuitem" type="button" className="block w-full rounded-lg px-3 py-2 text-left hover:bg-surface-2" onClick={() => void logout()}>
                      🚪 Sign out
                    </button>
                  </>
                ) : (
                  <button role="menuitem" type="button" className="block w-full rounded-lg px-3 py-2 text-left hover:bg-surface-2" onClick={leaveGuest}>
                    ☁️ Sign in / create account
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const path = usePathname() ?? "/";
  return (
    <nav className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" aria-label="Main">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={`flex flex-col items-center gap-0.5 py-2 text-[0.7rem] font-bold ${active(path, n.href) ? "text-brand" : "text-ink-2"}`} aria-current={active(path, n.href) ? "page" : undefined}>
            <span className="text-xl" aria-hidden>
              {n.icon}
            </span>
            {n.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
