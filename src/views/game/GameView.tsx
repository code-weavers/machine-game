import { Box, createStyles, Flex } from "@mantine/core";
import { ActiveMachines } from "./components/active-machines/Machines";
import { AvailableMachines } from "./components/available-machines/AvailableMachines";
import { Employees } from "./components/employees/Employees";
import { GameHeader } from "./components/header/GameHeader";
import { Items } from "./components/items/Items";
import { GameSideMenu } from "./components/side-menu/GameSideMenu";
import { useGameTick } from "./hooks/use-game-tick";

const useStyles = createStyles(() => ({
  layout: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "3fr 2fr",
  },
}));

export const GameView = () => {
  const { classes } = useStyles();
  const { resetGame } = useGameTick();

  return (
    <Flex direction={"column"} p="xl">
      <GameHeader resetGame={resetGame} />
      <Box className={classes.layout}>
        <ActiveMachines />
        <Flex direction={`column`} gap="1rem">
          <Employees />
          <AvailableMachines />
          <Items />
          <GameSideMenu />
        </Flex>
      </Box>
    </Flex>
  );
};
