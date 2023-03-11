import { lands } from "@/data/lands";
import { useGameStore } from "@/store/game";
import { Button, Card, SimpleGrid } from "@mantine/core";
import { GameView } from "../game/GameView";

export const InitialView = () => {
  const land = useGameStore((select) => select.selectedLand);
  const selectLand = useGameStore((select) => select.setSelectedLand);

  if (land) return <GameView />;

  return (
    <div>
      <SimpleGrid cols={3}>
        {lands.map((item) => (
          <Button key={item.id} onClick={() => selectLand(item)}>
            <Card
              sx={{
                border: "1px solid #000",
              }}
            >
              <Card.Section>{item.name}</Card.Section>
              <Card.Section>Fee: {item.fee}</Card.Section>
            </Card>
          </Button>
        ))}
      </SimpleGrid>
    </div>
  );
};
