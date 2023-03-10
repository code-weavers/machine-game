import { GameMachine } from "@/store/game";
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

  public mintMachine(): GameMachine {
    const durability = this.getDurability();

    return {
      id: randomUtils.generateUniqueId(),
      currentDurability: durability,
      durability: durability,
      energyCost: this.getEnergyCost(),
      pollutionProduction: this.getPollutionProduction(),
      resourceProduction: this.getResourceProduction(),
      image: "https://picsum.photos/200",
      name: "Machine 1",
      assignedEmployee: [],
      employeeSlots: this.machineTier * 2,
      tier: this.machineTier,
      type: MachineType.Press,
    };
  }
}