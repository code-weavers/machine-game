import { lands } from "@/data/lands";
import { useGameStore } from "@/store/game";
import { Card, Center, Title } from "@mantine/core";
import { GameView } from "../game/GameView";

export const InitialView = () => {
  const land = useGameStore((select) => select.land);
  // todo create game page
  const selectLand = useGameStore((select) => select.setLand);

  if (land.id) return <GameView />;

  return (
    <Center h={"100vh"}>
      {lands.map((item) => (
        <Card
          key={item.id}
          onClick={() => selectLand(item)}
          sx={{
            border: "1px solid #000",
            padding: 40,
            cursor: "pointer",
            background: "#eee",
          }}
        >
          <Title>{item.name}</Title>

          <Title size="md" mt={"md"}>
            Fee: ${item.fee}
          </Title>
        </Card>
      ))}
    </Center>
  );
};
