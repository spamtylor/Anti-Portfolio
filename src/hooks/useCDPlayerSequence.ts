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
    const { state, timer, lidRotation, cdRotation } = get();

    if (state === "IDLE") return;

    const newTimer = timer + delta;
    set({ timer: newTimer });

    // Continuous CD Rotation (Simulating playback/read)
    if (state === "READING" || state === "PLAYING") {
      set({ cdRotation: cdRotation + delta * 20 });
    }

    // --- MILESTONE LOGIC (Section V) ---
    // 0ms -> Lid starts opening (handled by loadRepo/setState)
    // 500ms -> CD moves into player
    // 1500ms -> Lid starts closing
    // 2100ms -> Reading begins (LCD flicker)
    // 5000ms -> Launch

    if (state === "OPENING") {
      // Smooth open animation until 500ms
      if (lidRotation < Math.PI / 3) {
        set({ lidRotation: lidRotation + delta * 3 });
      }
      if (newTimer >= 0.5) {
        set({ state: "LOADING", lcdText: "LOADING..." });
      }
    }

    if (state === "LOADING" && newTimer >= 1.5) {
      set({ state: "CLOSING", lcdText: "CLOSING..." });
    }

    if (state === "CLOSING") {
      // Smooth close animation
      if (lidRotation > 0) {
        set({ lidRotation: lidRotation - delta * 4 });
      }
      if (newTimer >= 2.1) {
        set({ state: "READING", lcdText: "READING..." });
      }
    }

    if (state === "READING" && newTimer >= 5.0) {
      set({ state: "PLAYING", lcdText: "PLAYING" });
    }
  },
}));
