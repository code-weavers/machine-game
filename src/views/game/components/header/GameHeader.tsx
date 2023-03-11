import { MoneyCounter } from "@/components/core/money-counter/MoneyCounter";
import { PayLand } from "@/components/core/pay-land/PayLand";
import { MachineEntity } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { Box, Button } from "@mantine/core";

interface Props {
  resetGame: () => void;
}

export const GameHeader = ({ resetGame }: Props) => {
  const { machines, money, mintMachine, mintEmployee, pollution } =
    useGameStore();

  return (
    <Box component="div">
      <div style={{ display: "flex" }}>
        <div>
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
        </div>
        <Button onClick={mintMachine}>Mint machine</Button>
        <Button onClick={mintEmployee}>Mint Employee</Button>
        <Button onClick={resetGame}>Reset Game</Button>
      </div>
    </Box>
  );
};
