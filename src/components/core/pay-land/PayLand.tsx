import { useGameStore } from "@/store/game";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export const PayLand = () => {
  const selectedLand = useGameStore((select) => select.selectedLand);
  const payLandFee = useGameStore((select) => select.payLandFee);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!selectedLand) return;

    const interval = setInterval(() => {
      const time = selectedLand.nextPaymentDate - new Date().getTime();
      const seconds = Math.floor(time / 1000);
      setTimer(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedLand]);

  if (!selectedLand) return null;

  return (
    <div>
      <span>
        {selectedLand.name} - {selectedLand.fee}
      </span>

      {timer <= 0 ? (
        <Button onClick={() => payLandFee()}>Pay fee</Button>
      ) : (
        <span>Payed until: {timer} seconds</span>
      )}
    </div>
  );
};
