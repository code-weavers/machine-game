import { MoneyCounter } from "@/components/core/money-counter/MoneyCounter";
import { PayLand } from "@/components/core/pay-land/PayLand";
import { MachineEntity } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { Button } from "@mantine/core";

interface Props {
  resetGame: () => void;
}

export const GameHeader = ({ resetGame }: Props) => {
  const { machines, money, pollution } = useGameStore();

  return (
    <header style={{ display: "flex" }}>
      <MoneyCounter money={money} />
      <div>
        Money per second:
        {machines.reduce((acc, machine) => {
          const domain = new MachineEntity(machine);

          if (!domain.isWorking) return acc;

          return acc + domain.virtualResourceProduction;
        }, 0)}
      </div>
      <div>
        Polution:
        {pollution}
      </div>

      <PayLand />
      <Button onClick={resetGame}>Reset Game</Button>
    </header>
  );
};
