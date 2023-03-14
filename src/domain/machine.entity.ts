import { Machine, MachineTier, MachineType } from "@/types/entities/machine";
import { EmployeeEntity } from "./employee.entity";
const DURABILITY_DRAIN = 5;
export class MachineEntity {
  public id: string;
  public name: string;
  public image: string;
  public durability: number;
  public energyCost: number;
  public pollutionProduction: number;
  public employeeSlots: number;
  public resourceProduction: number;
  public type: MachineType;
  public tier: MachineTier;
  public currentDurability: number;
  public assignedEmployeesId: string[] = [];
  private employees: EmployeeEntity[];

  constructor(machine: Machine, employees: EmployeeEntity[]) {
    this.id = machine.id;
    this.name = machine.name;
    this.image = machine.image;
    this.durability = machine.durability;
    this.energyCost = machine.energyCost;
    this.pollutionProduction = machine.pollutionProduction;
    this.employeeSlots = machine.employeeSlots;
    this.resourceProduction = machine.resourceProduction;
    this.type = machine.type;
    this.tier = machine.tier;
    this.currentDurability = machine.currentDurability;
    this.assignedEmployeesId = machine.assignedEmployeesId || [];
    this.employees = employees || [];
  }

  get assignedEmployee() {
    return this.assignedEmployeesId
      .map((id) => this.employees.find((employee) => employee.id === id))
      .filter(Boolean) as EmployeeEntity[];
  }

  get virtualResourceProduction() {
    let production = this.resourceProduction;
    this.assignedEmployee.forEach((employee) => {
      production *= employee.resourceMultiplier;
    });
    return production;
  }

  get virtualPollutionProduction() {
    let pollution = this.resourceProduction;

    this.assignedEmployee.forEach((employee) => {
      pollution *= employee.resourceMultiplier;
    });
    return pollution;
  }

  get virtualEnergyCost() {
    let cost = this.energyCost;
    this.assignedEmployee.forEach((employee) => {
      cost *= employee.energyMultiplier;
    });
    return cost;
  }

  get isBroken() {
    return this.currentDurability <= 0;
  }

  get isIdle() {
    return this.assignedEmployeesId.length <= 0 && !this.isBroken;
  }

  get isWorking() {
    return !this.isIdle && !this.isBroken;
  }

  get isRepairable() {
    return this.currentDurability < this.durability;
  }

  repair(userMoney: number) {
    const repairCost = (this.durability - this.currentDurability) * 1;

    if (userMoney < repairCost) {
      return {
        money: userMoney,
      };
    }

    this.currentDurability = this.durability;

    return {
      money: userMoney - repairCost,
    };
  }

  work() {
    this.currentDurability -= DURABILITY_DRAIN;

    return {
      generatedResource: this.virtualResourceProduction,
      generatedPollution: this.virtualPollutionProduction,
    };
  }

  toMachine(): Machine {
    return {
      ...this,
    };
  }
}
