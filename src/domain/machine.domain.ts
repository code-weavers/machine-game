import { GameMachine } from "@/store/game";
import { Employee } from "@/types/entities/employee";

export class MachineDomain {
  constructor(private machine: GameMachine) {}

  get id() {
    return this.machine.id;
  }

  get name() {
    return this.machine.name;
  }

  get durability() {
    return this.machine.durability;
  }

  get image() {
    return this.machine.image;
  }

  get currentDurability() {
    return this.machine.currentDurability;
  }

  set currentDurability(value: number) {
    this.machine.currentDurability = value;
  }

  get assignedEmployee() {
    return this.machine.assignedEmployee || [];
  }

  set assignedEmployee(value: Employee[]) {
    if (value.length > this.machine.employeeSlots) {
      return;
    }

    this.machine.assignedEmployee = value || [];
  }

  get resourceProduction() {
    return this.machine.resourceProduction;
  }

  get pollutionProduction() {
    return this.machine.pollutionProduction;
  }

  get energyCost() {
    return this.machine.energyCost;
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
    return this.assignedEmployee.length <= 0 && !this.isBroken;
  }

  get isWorking() {
    return !this.isIdle && !this.isBroken;
  }

  get isRepairable() {
    return this.currentDurability < this.machine.durability;
  }

  get employeeSlots() {
    return this.machine.employeeSlots;
  }
}
