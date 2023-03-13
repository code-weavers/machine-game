import { GameMachine } from "@/store/game";
import { Employee } from "@/types/entities/employee";

export class EmployeeEntity {
  constructor(private employee: Employee) {}

  get currentHealth() {
    return this.employee.currentHealth;
  }

  set currentHealth(value: number) {
    this.employee.currentHealth = value;
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
