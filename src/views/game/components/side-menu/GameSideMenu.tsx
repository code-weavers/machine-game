import { ContentCard } from "@/components/cards/content-card/ContentCard";
import { useGameStore } from "@/store/game";
import { randomUtils } from "@/utils/random";
import { Button, List, Tabs } from "@mantine/core";

export const GameSideMenu = () => {
  const buyRepairBot = useGameStore((s) => s.buyRepairBot);
  const mintEmployee = useGameStore((s) => s.mintEmployee);
  const mintMachine = useGameStore((s) => s.mintMachine);

  return (
    <ContentCard>
      <aside
        style={{
          minWidth: 300,
        }}
      >
        <Tabs defaultValue="gallery" sx={{ color: "white" }}>
          <Tabs.List>
            <Tabs.Tab value="gallery" icon={"🤣"}>
              Market
            </Tabs.Tab>
            <Tabs.Tab value="messages">Upgrades</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <List spacing={"md"}>
              <List.Item>
                <Button onClick={mintMachine}>Mint machine</Button>
              </List.Item>

              <List.Item>
                <Button onClick={mintEmployee}>Mint Employee</Button>
              </List.Item>

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
        </Tabs>
      </aside>
    </ContentCard>
  );
};
