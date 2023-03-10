"use client";

import { MachineCard } from "@/components/core/machine-card/MachineCard";
import { MoneyCounter } from "@/components/core/money-counter/MoneyCounter";
import { MachineDomain } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { Button, createStyles } from "@mantine/core";
import { useEffect, useRef } from "react";

const useStyles = createStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 20,
  },
}));
export const GameView = () => {
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const { classes } = useStyles();
  const { machines, money, gameTick, mintMachine, mintEmployee, pollution } =
    useGameStore();

  function resetGame() {
    intervalRef.current && clearInterval(intervalRef.current);
    useGameStore.persist.clearStorage();
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      gameTick();
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <MoneyCounter money={money} />
          <div>
            {" "}
            Money per second:{" "}
            {machines.reduce((acc, machine) => {
              const domain = new MachineDomain(machine);

              if (!domain.isWorking) return acc;

              return acc + domain.virtualResourceProduction;
            }, 0)}
          </div>
          <div>
            Polution:
            {pollution}
          </div>
        </div>
        <Button onClick={mintMachine}>Mint machine</Button>
        <Button onClick={mintEmployee}>Mint Employee</Button>
        <Button onClick={resetGame}>Reset Game</Button>
      </div>

      <div className={classes.container}>
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={new MachineDomain(machine)} />
        ))}
      </div>
    </>
  );
};
