"use client";
// "Who's studying?" — choose, add, edit or remove (PIN) a learner.
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

const AVATARS = ["🦊", "🐼", "🦉", "🐯", "🐬", "🦄", "🐙", "🦁", "🐧", "🐢", "🦋", "🐝", "🌟", "🚀", "🎧", "🎨"];

export function ProfilePicker() {
  const { account, selectProfile, createProfile, importGuest: importGuestInto, updateProfile, deleteProfile, guestHasProgress, logout } = useStore();
  const [adding, setAdding] = useState(account?.profiles.length === 0);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [importGuest, setImportGuest] = useState(true);
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!account) return null;
  // Progress made in guest mode on this device (kept until it has been copied to a learner).
  const guestProgress = guestHasProgress();
  const hasGuest = account.profiles.length === 0 && guestProgress;

  async function run<R extends { ok: boolean; error?: string }>(f: () => Promise<R>, after?: (r: R) => void) {
    setBusy(true);
    setError(null);
    const r = await f();
    setBusy(false);
    if (!r.ok) setError(r.error ?? "Something went wrong.");
    else after?.(r);
  }

  const form = (mode: "add" | "edit", id?: string) => (
    <form
      className="card mt-4 space-y-4 p-5 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        if (mode === "add") {
          void run(
            () => createProfile(name, avatar, hasGuest && importGuest),
            (r) => {
              // Added, but the guest progress didn't come across: say so and offer it again below.
              if (r.importError) {
                setAdding(false);
                setError(r.importError);
              }
            },
          );
        }
        else if (id) void run(() => updateProfile(id, name, avatar), () => setEditing(null));
      }}
    >
      <h2 className="text-lg font-extrabold">{mode === "add" ? "Add a learner" : "Edit learner"}</h2>
      <label className="block space-y-1">
        <span className="text-sm font-bold text-ink-2">Name</span>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} required autoFocus />
      </label>
      <fieldset>
        <legend className="text-sm font-bold text-ink-2">Avatar</legend>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {AVATARS.map((a) => (
            <button key={a} type="button" onClick={() => setAvatar(a)} aria-pressed={avatar === a} className={`h-11 w-11 rounded-xl text-2xl ${avatar === a ? "bg-brand-soft ring-2 ring-brand" : "bg-surface-2"}`}>
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      {mode === "add" && hasGuest ? (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-5 w-5" checked={importGuest} onChange={(e) => setImportGuest(e.target.checked)} />
          Bring across the progress made as a guest on this device
        </label>
      ) : null}
      {mode === "edit" && id ? (
        <details className="rounded-xl border border-line p-3">
          <summary className="cursor-pointer text-sm font-bold text-bad">Remove this learner…</summary>
          <p className="mt-2 text-sm text-ink-2">This deletes their progress for good. Enter the parent PIN to confirm.</p>
          <div className="mt-2 flex gap-2">
            <input className="input max-w-[10rem] tracking-[0.3em]" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="PIN" aria-label="Parent PIN" />
            <button type="button" className="btn btn-secondary text-bad" disabled={busy || pin.length < 4} onClick={() => void run(() => deleteProfile(id, pin), () => setEditing(null))}>
              Remove
            </button>
          </div>
        </details>
      ) : null}
      {error ? <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm" role="alert">{error}</p> : null}
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={busy || !name.trim()}>
          {busy ? "Saving…" : mode === "add" ? "Add learner" : "Save"}
        </button>
        {account.profiles.length > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => { setAdding(false); setEditing(null); setError(null); }}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );

  return (
    <div className="mx-auto max-w-xl py-8 text-center">
      <h1 className="text-3xl font-black">Who&apos;s studying?</h1>
      <p className="mt-1 text-ink-2">{account.name} family</p>
      {adding ? (
        form("add")
      ) : editing ? (
        form("edit", editing)
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {account.profiles.map((p) => (
              <div key={p.id} className="card relative p-4">
                <button type="button" className="flex w-full flex-col items-center gap-2" onClick={() => void selectProfile(p.id)}>
                  <span className="text-5xl" aria-hidden>
                    {p.avatar}
                  </span>
                  <span className="text-lg font-extrabold">{p.name}</span>
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-lg px-2 py-1 text-xs text-ink-2 hover:bg-surface-2"
                  onClick={() => { setEditing(p.id); setName(p.name); setAvatar(p.avatar); setPin(""); }}
                  aria-label={`Edit ${p.name}`}
                >
                  ✏️
                </button>
              </div>
            ))}
            {account.profiles.length < 8 ? (
              <button type="button" className="card flex flex-col items-center justify-center gap-2 border-dashed p-4 text-ink-2" onClick={() => { setAdding(true); setName(""); setAvatar(AVATARS[account.profiles.length % AVATARS.length]); }}>
                <span className="text-4xl" aria-hidden>
                  ＋
                </span>
                <span className="font-bold">Add learner</span>
              </button>
            ) : null}
          </div>
          {guestProgress && account.profiles.length > 0 ? (
            <div className="card mt-6 p-4 text-left">
              <h2 className="font-extrabold">Progress from guest mode</h2>
              <p className="mt-1 text-sm text-ink-2">This device has stars and answers saved as a guest. Bring them across to:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {account.profiles.map((p) => (
                  <button key={p.id} type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => void run(() => importGuestInto(p.id))}>
                    <span aria-hidden>{p.avatar}</span> {p.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {error ? (
            <p className="mt-4 rounded-xl bg-bad-soft px-3 py-2 text-sm" role="alert">
              {error}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/parent" className="btn btn-ghost btn-sm">
              👪 Parent dashboard
            </Link>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => void logout()}>
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
