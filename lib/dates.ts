// Local-calendar date helpers. Streaks, goals and review schedules follow the
// learner's own day (Singapore midnight, not UTC midnight).

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** YYYY-MM-DD in the device's local time zone. */
export function localISO(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayISO(): string {
  return localISO(new Date());
}

export function addDaysISO(days: number, from: Date = new Date()): string {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  d.setDate(d.getDate() + days);
  return localISO(d);
}

/** Whole days from a to b (b − a), both YYYY-MM-DD. */
export function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

/** The last n local dates ending today, oldest first. */
export function lastNDays(n: number): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(addDaysISO(-i));
  return out;
}

/** Monday-start week key (the Monday's date) for a local date. */
export function weekStartISO(iso: string = todayISO()): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const dow = (dt.getDay() + 6) % 7; // Mon=0
  dt.setDate(dt.getDate() - dow);
  return localISO(dt);
}
