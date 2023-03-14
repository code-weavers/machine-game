import { GameEntity } from "@/domain/game.entity";
import { EmployeeFactory } from "@/factory/employee-factory";
import { LandFactory } from "@/factory/land-factory";
import { MachineFactory } from "@/factory/machine-factory";
import { MachineTier } from "@/types/entities/machine";
import { describe, expect, it } from "vitest";

describe("Game", () => {
  it("When land fee is not paid the game should not tick", () => {
    const land = LandFactory.mint();

    land.nextPaymentDate = -9999999;

    const game = new GameEntity([], land, [], 0);

    expect(() => game.tick()).toThrowError("Land fee not paid");
  });

  it("When machine is broken, not update the money, pollution, and employee health", () => {
    const employee = new EmployeeFactory().mint();
    const machine = new MachineFactory(MachineTier.Tier1).mintMachine();

    const land = LandFactory.mint();

    machine.currentDurability = 0;

    land.nextPaymentDate = new Date().getTime() + 9999;

    const game = new GameEntity([employee], land, [machine], 0);

    game.assignEmployees(machine.id, employee.id);

    const { employees, land: updatedLand, money } = game.tick();

    expect(money).toBe(0);
    expect(employees[0].currentHealth).toBe(employee.health);
    expect(updatedLand.pollution).toBe(0);
  });

  it("When is polluted, and machines is working, employee health is decreased", () => {
    const employee = new EmployeeFactory().mint();
    const machine = new MachineFactory(MachineTier.Tier1).mintMachine();
    const land = LandFactory.mint();
    const money = 0;

    const pollution = 999999;

    land.pollution = pollution;

    const game = new GameEntity([employee], land, [machine], money);

    game.assignEmployees(machine.id, employee.id);

    const { employees, land: updatedLand } = game.tick();

    expect(updatedLand.pollution).toBeGreaterThan(pollution);

    expect(employees[0].currentHealth).not.toBe(employee.health);
  });

  it("When is polluted, and machines is not working, employee health is not decreased", () => {
    const employee = new EmployeeFactory().mint();
    const machine = new MachineFactory(MachineTier.Tier1).mintMachine();
    const land = LandFactory.mint();
    const money = 0;

    const pollution = 999999;

    land.pollution = pollution;

    const game = new GameEntity([employee], land, [machine], money);

    const { employees, land: updatedLand } = game.tick();

    expect(updatedLand.pollution).toBe(pollution);

    expect(employees[0].currentHealth).toBe(employee.health);
  });

  it("Game tick", () => {
    const employee = new EmployeeFactory().mint();
    const machine = new MachineFactory(MachineTier.Tier1).mintMachine();

    const land = LandFactory.mint();

    const game = new GameEntity([employee], land, [machine], 0);

    game.assignEmployees(machine.id, employee.id);

    const { employees, land: updatedLand, machines, money } = game.tick();

    expect(machines[0].durability).toBe(machine.durability);

    expect(machines[0].currentDurability).not.toBe(machine.currentDurability);

    expect(employees[0].currentHealth).toBe(employee.health);

    expect(updatedLand.pollution).not.toBe(0);

    expect(money).not.toBe(0);
  });
});
