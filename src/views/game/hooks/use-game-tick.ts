import { useGameStore } from "@/store/game";
import { useEffect, useRef } from "react";
export const useGameTick = () => {
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const gameSpeedMs = useGameStore((s) => s.gameSpeedMs);
  const gameTick = useGameStore((s) => s.gameTick);

  //   const { gameTick, gameSpeedMs } = useGameStore();

  function resetGame() {
    intervalRef.current && clearInterval(intervalRef.current);
    useGameStore.persist.clearStorage();
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
