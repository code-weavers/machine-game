import { ValueCard } from "@/components/cards/value-card/ValueCard";
import { useGameStore } from "@/store/game";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export const PayLand = () => {
  const selectedLand = useGameStore((select) => select.selectedLand);
  const payLandFee = useGameStore((select) => select.payLandFee);
  const [timer, setTimer] = useState(getSeconds());

  function getSeconds() {
    if (!selectedLand) return 0;

    const time = selectedLand.nextPaymentDate - new Date().getTime();
    const seconds = Math.floor(time / 1000);

    return seconds;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getSeconds());
    }, 1000);

    return () => clearInterval(interval);

    // ok lele, tu ganhou
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLand]);

  if (!selectedLand) return null;

  return (
    <ValueCard
      label={`${selectedLand.name}`}
      value={timer <= 0 ? 0 : timer}
      prefix="Next pay in "
      suffix={
        timer <= 0 ? (
          <Button ml={"md"} onClick={() => payLandFee()}>
            Pay fee ${selectedLand.fee}
          </Button>
        ) : (
          " seconds"
        )
      }
    />
  );
};
