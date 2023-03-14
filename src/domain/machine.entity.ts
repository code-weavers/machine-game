import { Employee } from "@/types/entities/employee";
import { Machine, MachineTier, MachineType } from "@/types/entities/machine";

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
  public assignedEmployee: Employee[];

  constructor(machine: Machine) {
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
    this.assignedEmployee = machine.assignedEmployee;
  }

  assignEmployee(value: Employee[]) {
    if (value.length > this.employeeSlots) {
      return;
    }

    this.assignedEmployee = value || [];
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
    console.log(this.assignedEmployee.length);
    return this.assignedEmployee.length <= 0 && !this.isBroken;
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
}
