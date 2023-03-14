import { EmployeeEntity } from "@/domain/employee.entity";
import { LandEntity } from "@/domain/land.entity";
import { MachineEntity } from "@/domain/machine.entity";
import { EmployeeFactory } from "@/factory/employee-factory";
import { LandFactory } from "@/factory/land-factory";
import { MachineFactory } from "@/factory/machine-factory";
import { Employee } from "@/types/entities/employee";
import { Land } from "@/types/entities/land";
import { Machine, MachineTier } from "@/types/entities/machine";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GameEntity } from "./../domain/game.entity";

export type RepairBot = {
  id: string;
  name: string;
  repairPercentage: number;
  secondsInterval: number;
};

export type GameRepairBot = RepairBot & {
  availableAt: number;
};

interface Store {
  land: Land;
  money: number;
  machines: Machine[];
  repairBots: GameRepairBot[];
  employees: Employee[];
  buyRepairBot: (repairBot: RepairBot) => void;
  payLandFee: () => void;
  gameTick: () => void;
  mintMachine: () => void;
  mintEmployee: () => void;
  repairMachine: (machineId: string) => void;
  assignEmployees: (machineId: string, employeeId: string | string[]) => void;
  setLand: (land: Land) => void;
}

const MACHINE_MIN_COST = 300;

const EMPLOYEE_MIN_COST = 100;

export const useGameStore = create(
  persist<Store>(
    (set, get) => ({
      repairBots: [],
      money: 50000,
      machines: [],
      land: {
        id: "",
        fee: 0,
        machineLimit: 0,
        name: "",
        pollution: 0,
        nextPaymentDate: 0,
      },
      employees: [],
      buyRepairBot: (repairBot) => {
        set((state) => {
          return {
            repairBots: [
              ...state.repairBots,
              {
                ...repairBot,
                availableAt: new Date().getTime(),
              },
            ],
          };
        });
      },

      payLandFee: () => {
        set((state) => {
          const landEntity = new LandEntity(state.land);

          const userMoney = state.money;

          if (!landEntity.isPayable(userMoney)) return state;

          const { money } = landEntity.payFee(userMoney);

          return {
            money: money,
            land: landEntity,
          };
        });
      },

      setLand(land: Land) {
        const createdLand = LandFactory.createLand(land);

        set({
          land: createdLand,
        });
      },

      gameTick: () => {
        set((state) => {
          const gameEntity = new GameEntity(
            state.employees,
            state.land,
            state.machines,
            state.money
          );

          const { machines, money, land, employees } = gameEntity.tick();

          return {
            money,
            land,
            machines,
            employees,
          };
        });
      },

      mintMachine: () => {
        const { machines, land: selectedLand, money } = get();

        if (
          machines.length + 1 > (selectedLand?.machineLimit || 0) ||
          money < MACHINE_MIN_COST
        )
          return;

        set((state) => {
          const machinesClone = structuredClone(state.machines);

          const machineFactory = new MachineFactory(MachineTier.Tier1);

          const machine = machineFactory.mintMachine();

          machinesClone.push(machine);

          const newMoney = state.money - MACHINE_MIN_COST;

          return {
            machines: machinesClone,
            money: newMoney,
          };
        });
      },

      repairMachine: (machineId) => {
        set((state) => {
          const machinesClone = structuredClone(state.machines);

          const machineIndex = machinesClone.findIndex(
            (m) => m.id === machineId
          );

          if (machineIndex < 0) return state;

          const machineEntity = new MachineEntity(
            machinesClone[machineIndex],
            state.employees.map((e) => new EmployeeEntity(e))
          );

          const { money } = machineEntity.repair(state.money);

          machinesClone[machineIndex] = machineEntity;

          return {
            money,
            machines: machinesClone,
          };
        });
      },

      mintEmployee: () => {
        set((state) => {
          if (get().money < EMPLOYEE_MIN_COST) {
            return state;
          }

          const employee = new EmployeeFactory().mint();

          const employeesClone = structuredClone(state.employees);

          employeesClone.push(employee);

          return {
            employees: employeesClone,
            money: state.money - EMPLOYEE_MIN_COST,
          };
        });
      },

      assignEmployees: (machineId: string, employeeId: string | string[]) => {
        set((state) => {
          const game = new GameEntity(
            state.employees,
            state.land,
            state.machines,
            state.money
          );

          const { employees, machines } = game.assignEmployees(
            machineId,
            employeeId
          );

          return {
            employees,
            machines,
          };
        });
      },
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: "game",
    }
  )
);
