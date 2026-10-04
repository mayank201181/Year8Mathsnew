"use client";
// Status machine: loading → (welcome | who's studying? | load error) → app.
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { AuthGate } from "./AuthGate";
import { ProfilePicker } from "./ProfilePicker";
import { SiteHeader, MobileNav } from "./SiteHeader";
import { ErrorBoundary } from "./ErrorBoundary";

function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-ink-2" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-soft border-t-brand" aria-hidden />
      <span>Opening your Maths Lab…</span>
    </div>
  );
}

function LoadError() {
  const { retryLoad, logout, switchProfile, account } = useStore();
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="text-5xl" aria-hidden>
        📡
      </div>
      <h1 className="mt-2 text-xl font-extrabold">Couldn&apos;t load your progress</h1>
      <p className="mt-2 text-ink-2">We couldn&apos;t reach the server, so nothing has been changed. Check the internet connection and try again.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button type="button" className="btn btn-primary" onClick={() => void retryLoad()}>
          Try again
        </button>
        {account && account.profiles.length > 1 ? (
          <button type="button" className="btn btn-secondary" onClick={switchProfile}>
            Switch learner
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost" onClick={() => void logout()}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export function AppGate({ children }: { children: ReactNode }) {
  const { status } = useStore();
  const path = usePathname();
  // The parent dashboard works without choosing a learner (it has its own PIN gate).
  const parentRoute = path?.startsWith("/parent");
  let body: ReactNode;
  if (status === "loading") body = <Loading />;
  else if (status === "anon") body = <AuthGate />;
  else if (status === "load-error") body = <LoadError />;
  else if (status === "no-profile" && !parentRoute) body = <ProfilePicker />;
  else body = children;
  const showChrome = status === "ready" || (status === "no-profile" && parentRoute);
  return (
    <>
      {showChrome ? (
        <ErrorBoundary silent>
          <SiteHeader />
        </ErrorBoundary>
      ) : null}
      <main className={`mx-auto w-full max-w-5xl px-4 pt-4 ${showChrome ? "pb-28 md:pb-12" : "pb-12"}`}>{body}</main>
      {showChrome ? (
        <ErrorBoundary silent>
          <MobileNav />
        </ErrorBoundary>
      ) : null}
    </>
  );
}
