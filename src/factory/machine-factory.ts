import { MachineEntity } from "@/domain/machine.entity";
import { MachineTier, MachineType } from "@/types/entities/machine";
import { randomUtils } from "@/utils/random";

export class MachineFactory {
  constructor(private machineTier: MachineTier) {}

  private getDurability() {
    const min = this.machineTier * 100;
    const max = this.machineTier * 150;

    return randomUtils.getRandomNumber(min, max);
  }

  private getEnergyCost() {
    const min = this.machineTier * 10;
    const max = this.machineTier * 15;

    return randomUtils.getRandomNumber(min, max);
  }

  private getPollutionProduction() {
    const min = this.machineTier * 10;
    const max = this.machineTier * 15;

    return randomUtils.getRandomNumber(min, max);
  }

  private getResourceProduction() {
    const min = this.machineTier * 10;
    const max = this.machineTier * 15;

    return randomUtils.getRandomNumber(min, max);
  }

  public mintMachine(): MachineEntity {
    const durability = this.getDurability();
    return new MachineEntity(
      {
        id: randomUtils.generateUniqueId(),
        durability: durability,
        energyCost: this.getEnergyCost(),
        pollutionProduction: this.getPollutionProduction(),
        resourceProduction: this.getResourceProduction(),
        image: "https://picsum.photos/200",
        name: "Machine 1",
        employeeSlots: this.machineTier * 2,
        tier: this.machineTier,
        currentDurability: durability,
        assignedEmployeesId: [],
        type: MachineType.Press,
      },
      []
    );
  }
}
