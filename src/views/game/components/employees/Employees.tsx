import { ContentCard } from "@/components/cards/content-card/ContentCard";
import { useGameStore } from "@/store/game";
import {
  Avatar,
  Flex,
  List,
  SimpleGrid,
  Switch,
  Title,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";

export const Employees = () => {
  const [working, setWorking] = useState(false);

  const employees = useGameStore((s) => s.employees);

  const items = working
    ? employees.filter((employee) => employee.assignedMachineId !== null)
    : employees;

  return (
    <ContentCard>
      <Flex justify={"space-between"}>
        <Title color={"white"}>Employees ({employees.length})</Title>
        <Switch
          onChange={(e) => setWorking(e.currentTarget.checked)}
          label="Working"
        />
      </Flex>

      <SimpleGrid
        sx={{
          maxHeight: 150,
          overflowY: "scroll",
        }}
        cols={5}
        mt="md"
        spacing={"md"}
      >
        {items.map((employee) => (
          <Tooltip
            key={employee.id}
            label={
              <List
                style={{
                  color: "white",
                }}
              >
                <List.Item>{employee.name}</List.Item>
                <List.Item>
                  {employee.currentHealth}/{employee.health}💗
                </List.Item>
                <List.Item>{employee.pollutionMultiplier} ☠</List.Item>
                <List.Item>{employee.resourceMultiplier} 💰</List.Item>
                <List.Item>{employee.energyMultiplier}☀</List.Item>
              </List>
            }
          >
            <div
              draggable
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <Avatar src={`https://i.pravatar.cc/300?u=${employee.name}`} />
              <span>{employee.name}</span>
              <progress
                style={{
                  width: 50,
                }}
                value={employee.currentHealth}
                max={employee.health}
              />
            </div>
          </Tooltip>
        ))}
      </SimpleGrid>
    </ContentCard>
  );
};
