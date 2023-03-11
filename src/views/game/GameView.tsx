import { Box, Flex } from "@mantine/core";
import { ActiveMachines } from "./components/active-machines/Machines";
import { AvailableMachines } from "./components/available-machines/AvailableMachines";
import { Employees } from "./components/employees/Employees";
import { GameHeader } from "./components/header/GameHeader";
import { Items } from "./components/items/Items";
import { GameSideMenu } from "./components/side-menu/GameSideMenu";
import { useGameTick } from "./hooks/use-game-tick";

export const GameView = () => {
  const { resetGame } = useGameTick();

  return (
    <Flex direction={"column"}>
      <GameHeader resetGame={resetGame} />
      <Box>
        <ActiveMachines />
        <Flex direction={`column`}>
          <Employees />
          <AvailableMachines />
          <Items />
        </Flex>
        <GameSideMenu />
      </Box>
    </Flex>
  );
};
