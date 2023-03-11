import { MachineCard } from "@/components/core/machine-card/MachineCard";
import { MachineEntity } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { Box, Flex } from "@mantine/core";

export const ActiveMachines = () => {
  const machines = useGameStore((s) => s.machines);
  const selectedLand = useGameStore((s) => s.selectedLand);

  return (
    <Box>
      <section
        style={{
          marginBlock: 16,
        }}
      >
        <h2>
          Machines: {machines.length} / {selectedLand?.machineLimit}
        </h2>
      </section>
      <Flex gap={"md"} wrap="wrap">
        {machines.map((machine) => (
          <div key={machine.id} style={{ width: 200 }}>
            <MachineCard machine={new MachineEntity(machine)} />
          </div>
        ))}
      </Flex>
    </Box>
  );
};
