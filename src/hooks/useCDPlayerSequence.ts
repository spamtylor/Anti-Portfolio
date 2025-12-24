import { create } from "zustand";

export type CDPlayerState =
  | "IDLE"
  | "OPENING"
  | "WAITING_FOR_CD"
  | "LOADING"
  | "CLOSING"
  | "READING"
  | "PLAYING"
  | "ERROR";

interface CDPlayerStore {
  state: CDPlayerState;
  activeRepoId: number | null;
  lidRotation: number;
  cdRotation: number;
  lcdText: string;
  timer: number;

  // Actions
  setState: (state: CDPlayerState) => void;
  loadRepo: (repoId: number) => void;
  reset: () => void;
  tick: (delta: number) => void;
}

export const useCDPlayerSequence = create<CDPlayerStore>((set, get) => ({
  state: "IDLE",
  activeRepoId: null,
  lidRotation: 0,
  cdRotation: 0,
  lcdText: "READY",
  timer: 0,

  setState: (state) => set({ state, timer: 0 }),

  loadRepo: (repoId) => {
    const currentState = get().state;
    if (currentState === "IDLE") {
      set({ state: "OPENING", activeRepoId: repoId, lcdText: "OPENING..." });
    }
  },

  reset: () =>
    set({
      state: "IDLE",
      activeRepoId: null,
      lidRotation: 0,
      cdRotation: 0,
      lcdText: "READY",
      timer: 0,
    }),

  tick: (delta) => {
    const { state, lidRotation, cdRotation, timer } = get();

    switch (state) {
      case "OPENING":
        if (lidRotation < Math.PI / 2.5) {
          set({ lidRotation: lidRotation + delta * 2 });
        } else {
          set({ state: "WAITING_FOR_CD", lcdText: "INSERT DISC" });
        }
        break;

      case "LOADING":
        // This state is triggered by BurntCD click
        // BurntCD handles its own movement animation for now
        // But we transition to CLOSING after a delay
        if (timer > 1) {
          set({ state: "CLOSING", lcdText: "CLOSING..." });
        } else {
          set({ timer: timer + delta });
        }
        break;

      case "CLOSING":
        if (lidRotation > 0) {
          set({ lidRotation: lidRotation - delta * 2 });
        } else {
          set({ state: "READING", lcdText: "READING...", timer: 0 });
        }
        break;

      case "READING":
        set({ cdRotation: cdRotation + delta * 15 });
        if (timer > 2) {
          set({ state: "PLAYING", lcdText: "TRACK 01" });
        } else {
          set({ timer: timer + delta });
        }
        break;

      case "PLAYING":
        set({ cdRotation: cdRotation + delta * 20 });
        break;
    }
  },
}));
