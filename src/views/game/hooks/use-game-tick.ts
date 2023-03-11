import { useGameStore } from "@/store/game";
import { useGameSettings } from "@/store/settings";
import { useEffect, useRef } from "react";
export const useGameTick = () => {
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const gameSpeedMs = useGameSettings((s) => s.gameSpeedMs);

  const gameTick = useGameStore((s) => s.gameTick);

  function resetGame() {
    intervalRef.current && clearInterval(intervalRef.current);
    useGameStore.persist.clearStorage();
    window.location.reload();
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      gameTick();
    }, gameSpeedMs);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSpeedMs]);

  return {
    resetGame,
  };
};
