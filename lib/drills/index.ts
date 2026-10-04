// Client-safe registry of procedural skill drills.
import type { Drill } from "./types";
import { ALL_DRILLS } from "../generated/drills";

export { ALL_DRILLS };
const BY_ID = new Map<string, Drill>(ALL_DRILLS.map((d) => [d.id, d]));

export function drillById(id: string): Drill | undefined {
  return BY_ID.get(id);
}

export function drillsForTopic(topicId: string): Drill[] {
  return ALL_DRILLS.filter((d) => d.topicId === topicId).sort((a, b) => a.level - b.level);
}

/** A fresh random seed (call from event handlers/effects, never during render). */
export function freshSeed(): number {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) return crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor(Math.random() * 2 ** 32);
}
