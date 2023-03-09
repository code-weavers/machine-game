import { GameMachine, useGameStore } from "@/store/game";
import { Button, Card, createStyles, Image, Text } from "@mantine/core";

interface Props {
  machine: GameMachine;
}

const useStyles = createStyles(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: 200,
    },
  };
});

export const MachineCard = ({ machine }: Props) => {
  const repairMachine = useGameStore((selector) => selector.repairMachine);
  const { classes } = useStyles();

  console.log(machine);

  return (
    <Card shadow="sm" padding="sm">
      {machine.currentDurability <= 0 && (
        <>
          <div>BROKEEEEEE</div>
          <Button onClick={() => repairMachine(machine.id)}>Repair</Button>
        </>
      )}

      <Image src={machine.image} alt={machine.name} height={150} />
      <Text size="lg" weight={500} style={{ marginTop: "0.5rem" }}>
        {machine.name}
      </Text>

      <div style={{ marginTop: "1rem" }}>
        <Text size="sm" weight={500}>
          Durability:
        </Text>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Text size="sm" weight={500}>
          Energy Cost:
        </Text>
        <Text size="sm">{machine.energyCost}</Text>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Text size="sm" weight={500}>
          Pollution Production:
        </Text>
        <Text size="sm">{machine.pollutionProduction}</Text>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Text size="sm" weight={500}>
          Resource Production:
        </Text>
        <Text size="sm">{machine.resourceProduction}</Text>
      </div>
      <progress
        value={machine.currentDurability}
        max={machine.durability}
        color="#eee"
        style={{ marginTop: "0.5rem" }}
      />
    </Card>
  );
};
