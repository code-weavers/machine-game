import { MachineEntity } from "@/domain/machine.domain";
import { useGameStore } from "@/store/game";
import { Button, Card, Image, MultiSelect, Text } from "@mantine/core";
import { useMemo } from "react";

interface Props {
  machine: MachineEntity;
}

export const MachineCard = ({ machine }: Props) => {
  const repairMachine = useGameStore((selector) => selector.repairMachine);
  const employees = useGameStore((selector) => selector.employees);
  const machines = useGameStore((selector) => selector.machines);
  const assignEmployees = useGameStore((selector) => selector.assignEmployees);

  const availableEmployees = useMemo(() => {
    return employees.filter((employee) => {
      return !machines.some((machine) => {
        return machine.assignedEmployee.some((e) => e.id === employee.id);
      });
    });
  }, [employees, machines]);

  const header = (() => {
    if (machine.isBroken)
      return (
        <Button
          onClick={() => {
            repairMachine(machine.id);
          }}
        >
          Repair
        </Button>
      );

    if (machine.isIdle) {
      return <div>Need to assign employee</div>;
    }

    return null;
  })();

  const items = availableEmployees.map((employee) => ({
    label: employee.name,
    value: employee.id,
  }));

  const borderColor = machine.isBroken
    ? "red"
    : machine.isIdle
    ? "orange"
    : "green";

  const borderWidth = machine.isWorking
    ? machine.employeeSlots === machine.assignedEmployee.length
      ? "8"
      : "3"
    : "5";

  return (
    <Card
      shadow="sm"
      padding="sm"
      sx={() => ({
        borderRadius: 16,
        border: `${borderWidth}px solid ${borderColor}}`,
      })}
    >
      {header}

      <Image src={machine.image} alt={machine.name} height={150} />
      <Text size="lg" weight={500} style={{ marginTop: "0.5rem" }}>
        {machine.name}
      </Text>

      <div style={{ marginTop: "0.5rem" }}>
        <Text size="sm" weight={500}>
          Energy Cost:
        </Text>
        <Text size="sm">
          {machine.energyCost}
          <span>({machine.virtualEnergyCost})</span>
        </Text>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Text size="sm" weight={500}>
          Pollution Production:
        </Text>
        <Text size="sm">
          {machine.pollutionProduction}
          <span>({machine.virtualPollutionProduction})</span>
        </Text>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Text size="sm" weight={500}>
          Resource Production:{" "}
        </Text>
        <Text size="sm">
          {machine.resourceProduction}{" "}
          <span style={{ color: "green" }}>
            ({machine.virtualResourceProduction})
          </span>
        </Text>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Text size="sm" weight={500}>
          Durability:
        </Text>
        <progress
          value={machine.currentDurability}
          max={machine.durability}
          color="#eee"
          style={{ marginTop: "0.5rem" }}
        />
      </div>

      <MultiSelect
        label={`Assign Employees (${machine.assignedEmployee.length}/${machine.employeeSlots})`}
        onChange={(value) => {
          assignEmployees(machine.id, value);
        }}
        multiple
        maxSelectedValues={machine.employeeSlots}
        defaultValue={machine.assignedEmployee.map((e) => String(e.id))}
        data={[
          ...items,
          ...machine.assignedEmployee.map((e) => ({
            label: e.name,
            value: e.id,
          })),
        ]}
      />
    </Card>
  );
};
