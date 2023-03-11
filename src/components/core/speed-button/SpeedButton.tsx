import { GameSpeed, useGameSettings } from "@/store/settings";
import { Button } from "@mantine/core";

export const SpeedButton = () => {
  const { gameSpeedMs, setGameSpeedMs } = useGameSettings();

  const value = GameSpeed.Normal / gameSpeedMs;

  const onClick = () => {
    if (gameSpeedMs === GameSpeed.Normal) {
      return setGameSpeedMs(GameSpeed.Fast);
    }
    if (gameSpeedMs === GameSpeed.Fast) {
      return setGameSpeedMs(GameSpeed.UltraFast);
    }

    setGameSpeedMs(GameSpeed.Normal);
  };

  return (
    <Button color={"pink"} onClick={onClick}>
      ⏩ {value}x
    </Button>
  );
};
