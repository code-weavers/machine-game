import { ContentCard } from "@/components/cards/content-card/ContentCard";
import { MachineCard } from "@/components/core/machine-card/MachineCard";
import { EmployeeEntity } from "@/domain/employee.entity";
import { MachineEntity } from "@/domain/machine.entity";
import { useGameStore } from "@/store/game";
import { SimpleGrid, Title } from "@mantine/core";

export const ActiveMachines = () => {
  const machines = useGameStore((s) => s.machines);
  const employees = useGameStore((s) => s.employees);
  const selectedLand = useGameStore((s) => s.land);

  return (
    <ContentCard>
      <Title mb={"md"} color="white">
        Machines: {machines.length} / {selectedLand?.machineLimit}
      </Title>

      <SimpleGrid spacing={"md"} cols={4}>
        {machines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={
              new MachineEntity(
                machine,
                employees.map((e) => new EmployeeEntity(e))
              )
            }
          />
        ))}
      </SimpleGrid>
    </ContentCard>
  );
};
