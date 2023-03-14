import { Employee } from "@/types/entities/employee";
import { Land } from "@/types/entities/land";
import { Machine } from "@/types/entities/machine";
import { EmployeeEntity } from "./employee.entity";
import { LandEntity } from "./land.entity";
import { MachineEntity } from "./machine.entity";

type TickReturn = {
  money: number;
  land: Land;
  employees: Employee[];
  machines: Machine[];
};

export class Game {
  constructor(
    private employees: EmployeeEntity[],
    private land: LandEntity,
    private machines: MachineEntity[],
    private money: number
  ) {}

  tick(): TickReturn {
    return {
      employees: [],
      land: {
        fee: 0,
        id: "",
        machineLimit: 0,
        name: "",
      },
      machines: [],
      money: 0,
    };
  }
}
