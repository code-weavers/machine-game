import { LandEntity } from "@/domain/land.entity";
import { Employee } from "@/types/entities/employee";
import { Land } from "@/types/entities/land";
import { Machine } from "@/types/entities/machine";
import { EmployeeEntity } from "./employee.entity";
import { MachineEntity } from "./machine.entity";

type TickReturn = {
  money: number;
  land: Land;
  employees: Employee[];
  machines: Machine[];
};

export class GameEntity {
  constructor(
    private employees: Employee[],
    private land: Land,
    private machines: Machine[],
    private money: number
  ) {}

  assignEmployees(machineId: string, employeeId: string | string[]) {
    const employeeIds = Array.isArray(employeeId) ? employeeId : [employeeId];

    const updatedMachines = this.machines.map((machine) =>
      machine.id === machineId
        ? {
            ...machine,
            assignedEmployeesId: employeeIds,
          }
        : machine
    );

    const updatedEmployees = this.employees.map((employee) => {
      if (employeeIds.includes(employee.id)) {
        return {
          ...employee,
          assignedMachineId: machineId,
        };
      }

      return employee;
    });

    this.employees = updatedEmployees;
    this.machines = updatedMachines;

    return {
      employees: updatedEmployees,
      machines: updatedMachines,
    };
  }

  tick(): TickReturn {
    const landEntity = new LandEntity(this.land);

    if (!landEntity.isPaid()) {
      throw new Error("Land fee not paid");
    }

    const updatedMachines = this.machines.map((machine) => {
      const machineEntity = new MachineEntity(
        machine,
        this.employees.map((employee) => new EmployeeEntity(employee))
      );

      if (machineEntity.isBroken) {
        return machineEntity;
      }

      if (machineEntity.isIdle) {
        return machineEntity;
      }

      if (machineEntity.isWorking) {
        const { generatedPollution, generatedResource } = machineEntity.work();

        landEntity.addPollution(generatedPollution);
        this.money += generatedResource;

        return machineEntity;
      }

      return machineEntity;
    });

    const updatedEmployees = this.employees.map((employee) => {
      const employeeEntity = new EmployeeEntity(employee);

      if (landEntity.isPolluted && employeeEntity.isWorking) {
        employeeEntity.takePollutionDamage(landEntity.pollution);
      }

      return employeeEntity;
    });

    return {
      employees: updatedEmployees,
      land: { ...landEntity },
      machines: updatedMachines,
      money: this.money,
    };
  }

  // const foundRepairBot = state.repairBots.find((repairBot) => {
  //   return (
  //     repairBot.availableAt - new Date().getTime() <= 0 &&
  //     machineDomain.isBroken
  //   );
  // });

  // if (foundRepairBot) {
  //   const repairValue =
  //     foundRepairBot.repairPercentage * machine.durability;

  //   machine.currentDurability += repairValue;

  //   foundRepairBot.availableAt = dateUtils
  //     .addSeconds(new Date(), foundRepairBot.secondsInterval)
  //     .getTime();

  //   repairBotAnimation(machine.id);

  //   return machine;
  // }
}
