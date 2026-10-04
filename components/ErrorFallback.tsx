"use client";
// Friendly, recoverable error screen. Inline styles so it renders even if CSS fails.
export function ErrorFallback({ error, onRetry }: { error?: Error & { digest?: string }; onRetry?: () => void }) {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  return (
    <div style={{ maxWidth: 520, margin: "48px auto", padding: 24, fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
      <div style={{ fontSize: 48 }} aria-hidden>
        🧮
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 800, margin: "8px 0" }}>Oops — that sum didn&apos;t add up</h1>
      <p style={{ color: "#555b78" }}>Something went wrong on this page. Your saved progress is safe.</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        {onRetry ? (
          <button type="button" onClick={onRetry} style={{ padding: "10px 16px", borderRadius: 12, background: "#4f46e5", color: "#fff", fontWeight: 700, border: 0, cursor: "pointer" }}>
            Try again
          </button>
        ) : null}
        {/* A full page load on purpose: after a crash the client router may be in a bad state. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" style={{ padding: "10px 16px", borderRadius: 12, border: "1px solid #e0e3ef", fontWeight: 700, color: "inherit", textDecoration: "none" }}>
          Go home
        </a>
      </div>
      <details style={{ marginTop: 24, fontSize: 12, color: "#555b78", textAlign: "left" }}>
        <summary style={{ cursor: "pointer" }}>Details for grown-ups</summary>
        <p>{error?.message || "Unknown error"}</p>
        {error?.digest ? <p>Digest: {error.digest}</p> : null}
        {sha ? <p>Build: {sha}</p> : null}
      </details>
    </div>
  );
}
