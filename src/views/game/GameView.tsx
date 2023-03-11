"use client";

import { AutoRepairBot } from "@/components/core/autorepair-bot/AutoRepairBot";
import { MachineCard } from "@/components/core/machine-card/MachineCard";
import { MoneyCounter } from "@/components/core/money-counter/MoneyCounter";
import { PayLand } from "@/components/core/pay-land/PayLand";
import { MachineDomain } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { randomUtils } from "@/utils/random";
import { Button, createStyles, Flex, List, Tabs } from "@mantine/core";
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
  const {
    machines,
    money,
    gameTick,
    gameSpeedMs,
    mintMachine,
    mintEmployee,
    pollution,
    selectedLand,
    repairBots,
    buyRepairBot,
    setGameSpeedMs,
  } = useGameStore();

  function resetGame() {
    intervalRef.current && clearInterval(intervalRef.current);
    useGameStore.persist.clearStorage();
  }

  console.log(gameSpeedMs);

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
  return (
    <Flex>
      <main>
        {repairBots.map((repairBot) => (
          <AutoRepairBot {...repairBot} key={repairBot.id} />
        ))}
        <div style={{ display: "flex" }}>
          <div>
            <MoneyCounter money={money} />
            <div>
              Money per second:
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

            <PayLand />
          </div>
          <Button onClick={mintMachine}>Mint machine</Button>
          <Button onClick={mintEmployee}>Mint Employee</Button>
          <Button onClick={resetGame}>Reset Game</Button>
        </div>
        <section
          style={{
            marginBlock: 16,
          }}
        >
          <h2>
            Machines: {machines.length} / {selectedLand?.machineLimit}
          </h2>
        </section>
        <div className={classes.container}>
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={new MachineDomain(machine)}
            />
          ))}
        </div>
      </main>
      <aside
        style={{
          minWidth: 300,
        }}
      >
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="gallery" icon={"🤣"}>
              Market
            </Tabs.Tab>
            <Tabs.Tab value="messages">Upgrades</Tabs.Tab>
            <Tabs.Tab value="messages">Setting</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <List>
              <List.Item>
                <Button
                  onClick={() =>
                    buyRepairBot({
                      id: randomUtils.generateUniqueId(),
                      name: "RepairBot 2000",
                      secondsInterval: 5,
                      repairPercentage: 0.5,
                    })
                  }
                >
                  Buy AutoRepairBot
                </Button>
              </List.Item>
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            Messages tab content
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <Button onClick={() => setGameSpeedMs(1000)}>Normal</Button>
            <Button onClick={() => setGameSpeedMs(500)}>2x</Button>
            <Button onClick={() => setGameSpeedMs(100)}>10x</Button>
          </Tabs.Panel>
        </Tabs>
      </aside>
    </Flex>
  );
};
