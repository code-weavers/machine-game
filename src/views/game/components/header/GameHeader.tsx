import { ValueCard } from "@/components/cards/value-card/ValueCard";
import { PayLand } from "@/components/core/pay-land/PayLand";
import { SpeedButton } from "@/components/core/speed-button/SpeedButton";
import { LandEntity } from "@/domain/land.entity";
import { MachineEntity } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { Button, Flex } from "@mantine/core";

interface Props {
  resetGame: () => void;
}

export const GameHeader = ({ resetGame }: Props) => {
  const { machines, money, land } = useGameStore();

  const moneyPerSecond = machines.reduce((acc, machine) => {
    const domain = new MachineEntity(machine);

    const landEntity = new LandEntity(land);

    if (!landEntity.isPaid()) return acc;

    if (!domain.isWorking) return acc;

    return acc + domain.virtualResourceProduction;
  }, 0);

  return (
    <header style={{ display: "flex", marginBottom: "1rem" }}>
      <Flex gap={"md"}>
        <ValueCard prefix="$ " label="Money 💰" value={money}></ValueCard>

        <ValueCard
          prefix="$ "
          label="Money per second 💰"
          suffix="/s"
          value={moneyPerSecond}
        />

        <ValueCard label="Pollution ☠" value={land.pollution} />

        <PayLand />
      </Flex>

      <Flex ml={"auto"} gap="sm">
        <Button onClick={resetGame}>Reset Game</Button>
        <SpeedButton />
      </Flex>
    </header>
  );
};
