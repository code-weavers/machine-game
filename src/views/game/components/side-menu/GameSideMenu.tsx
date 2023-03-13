import { ContentCard } from "@/components/cards/content-card/ContentCard";
import { useGameStore } from "@/store/game";
import { randomUtils } from "@/utils/random";
import { Button, List } from "@mantine/core";

export const GameSideMenu = () => {
  const buyRepairBot = useGameStore((s) => s.buyRepairBot);
  const mintEmployee = useGameStore((s) => s.mintEmployee);
  const mintMachine = useGameStore((s) => s.mintMachine);

  return (
    <ContentCard>
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
    </ContentCard>
  );
};
