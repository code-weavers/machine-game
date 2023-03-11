import { useGameStore } from "@/store/game";
import { randomUtils } from "@/utils/random";
import { Button, List, Tabs } from "@mantine/core";

export const GameSideMenu = () => {
  const buyRepairBot = useGameStore((selector) => selector.buyRepairBot);
  const setGameSpeedMs = useGameStore((selector) => selector.setGameSpeedMs);

  return (
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
  );
};
