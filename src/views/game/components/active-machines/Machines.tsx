import { ContentCard } from "@/components/cards/content-card/ContentCard";
import { MachineCard } from "@/components/core/machine-card/MachineCard";
import { MachineEntity } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { SimpleGrid, Title } from "@mantine/core";

export const ActiveMachines = () => {
  const machines = useGameStore((s) => s.machines);
  const selectedLand = useGameStore((s) => s.selectedLand);

  return (
    <ContentCard>
      <Title mb={"md"} color="white">
        Machines: {machines.length} / {selectedLand?.machineLimit}
      </Title>

      <SimpleGrid spacing={"md"} cols={4}>
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={new MachineEntity(machine)} />
        ))}
      </SimpleGrid>
    </ContentCard>
  );
};
