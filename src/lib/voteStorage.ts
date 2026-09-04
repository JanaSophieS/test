import { VOTE_STORAGE_KEY, VoteOption } from "./poll";

type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): VoteOption | null {
  return window.localStorage.getItem(VOTE_STORAGE_KEY) as VoteOption | null;
}

// The server never has access to the visitor's localStorage, so it always
// renders as if no vote has been cast yet; useSyncExternalStore reconciles
// this with the real client value right after hydration.
export function getServerSnapshot(): VoteOption | null {
  return null;
}

export function setVote(option: VoteOption) {
  window.localStorage.setItem(VOTE_STORAGE_KEY, option);
  listeners.forEach((listener) => listener());
}
