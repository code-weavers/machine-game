import { Game } from "@/domain/game.entity";
import { LandEntity } from "@/domain/land.entity";
import { EmployeeFactory } from "@/factory/employee-factory";
import { MachineFactory } from "@/factory/machine-factory";
import { MachineTier } from "@/types/entities/machine";
import { describe, it } from "vitest";

describe("Game", () => {
  it("Game Tick with a working machine", () => {
    const employee = new EmployeeFactory().mint();
    const machine = new MachineFactory(MachineTier.Tier1).mintMachine();

    machine.assignEmployee([employee]);

    const land = new LandEntity({
      fee: 0,
      id: "land",
      machineLimit: 0,
      name: "land",
      nextPaymentDate: 100,
      pollution: 0,
    });

    const game = new Game([], land, [machine], 0);
  });
});
