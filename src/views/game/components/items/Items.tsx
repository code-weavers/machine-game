import { ContentCard } from "@/components/cards/content-card/ContentCard";
import { useGameStore } from "@/store/game";
import { Flex, Image, Title } from "@mantine/core";

export const Items = () => {
  const repairBots = useGameStore((s) => s.repairBots);

  return (
    <ContentCard>
      <Title color={"white"}>Items</Title>

      <Flex gap="md">
        {repairBots.map((repairBot) => (
          <Image
            width={50}
            key={repairBot.id}
            alt={repairBot.name}
            height={50}
            src={
              "https://media.istockphoto.com/vectors/little-robot-hold-industrial-hammer-vector-id970867632"
            }
          />
        ))}
      </Flex>
    </ContentCard>
  );
};
