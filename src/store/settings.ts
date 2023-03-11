import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum GameSpeed {
  Normal = 1000,
  Fast = 500,
  UltraFast = 100,
}
interface Store {
  gameSpeedMs: GameSpeed;
  setGameSpeedMs: (gameSpeed: GameSpeed) => void;
}

export const useGameSettings = create(
  persist<Store>(
    (set) => ({
      gameSpeedMs: GameSpeed.Normal,
      setGameSpeedMs: (gameSpeed) => {
        set({ gameSpeedMs: gameSpeed });
      },
    }),
    {
      name: "game-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
