import { GameMachine } from "@/store/game";
import { Employee } from "@/types/entities/employee";

export class EmployeeEntity {
  constructor(private employee: Employee) {}

  takePollutionDamage(pollution: number) {
    this.employee.currentHealth -= pollution;
  }

  isWorking(machines: GameMachine[]) {
    return machines.some((machine) =>
      machine.assignedEmployee.find(
        (employee) => employee.id === this.employee.id
      )
    );
  }

  getEmployee() {
    return this.employee;
  }
}
