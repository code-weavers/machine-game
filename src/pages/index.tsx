import { MachineCard } from "@/components/core/machine-card/MachineCard";
import { MoneyCounter } from "@/components/core/money-counter/MoneyCounter";
import { useGameStore } from "@/store/game";
import { Button, createStyles } from "@mantine/core";
import { useEffect } from "react";
import type { NextPage } from "next";

const useStyles = createStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gap: 20,
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();
  const { machines, money, gameTick, mintMachine } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      gameTick();
    }, 1000);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <MoneyCounter money={money} />
        <Button onClick={mintMachine}>Mint machine</Button>
      </div>

      <div className={classes.container}>
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </>
  );
};

export default Home;
