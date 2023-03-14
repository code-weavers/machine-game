import { Employee } from "@/types/entities/employee";
import { randomUtils } from "@/utils/random";

export class EmployeeFactory {
  mint(): Employee {
    const randomName = randomUtils.generateRandomName();

    return {
      id: randomUtils.generateUniqueId(),
      name: randomName,
      resourceMultiplier: 1.1,
      energyMultiplier: 1.1,
      health: 100,
      pollutionMultiplier: 1.1,
      currentHealth: 100,
      salary: 100,
      assignedMachineId: null,
    };
  }
}
