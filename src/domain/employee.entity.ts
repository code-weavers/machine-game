import { Employee } from "@/types/entities/employee";

export class EmployeeEntity {
  public id: string;
  public name: string;
  public salary: number;
  public health: number;
  public currentHealth: number;
  public resourceMultiplier: number;
  public pollutionMultiplier: number;
  public energyMultiplier: number;
  public assignedMachineId: string | null;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.name = employee.name;
    this.salary = employee.salary;
    this.health = employee.health;
    this.currentHealth = employee.currentHealth;
    this.resourceMultiplier = employee.resourceMultiplier;
    this.pollutionMultiplier = employee.pollutionMultiplier;
    this.energyMultiplier = employee.energyMultiplier;
    this.assignedMachineId = employee.assignedMachineId;
  }

  takePollutionDamage(pollution: number) {
    this.currentHealth -= pollution;
  }

  get isWorking() {
    return !!this.assignedMachineId;
  }

  get isAvailable() {
    return !this.isWorking;
  }
}
