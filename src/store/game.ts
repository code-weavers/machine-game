import { randomUtils } from "@/utils/random";
import { MachineFactory } from "@/factory/machine-factory";
import { Employee } from "@/types/entities/employee";
import { Machine, MachineTier } from "@/types/entities/machine";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MachineDomain } from "@/domain/machine.domain";

export interface GameMachine extends Machine {
  currentDurability: number;
  assignedEmployee: Employee[];
}

interface Store {
  money: number;
  machines: GameMachine[];
  pollution: number;
  employees: Employee[];
  gameTick: () => void;
  mintMachine: () => void;
  mintEmployee: () => void;
  repairMachine: (machineId: string) => void;
  assignEmployees: (machineId: string, employeeId: string | string[]) => void;
  availableEmployees: () => Employee[];
}

const DURABILITY_DRAIN = 5;

const MACHINE_MIN_COST = 300;

const EMPLOYEE_MIN_COST = 100;

export const useGameStore = create(
  persist<Store>(
    (set, get) => ({
      money: 500,
      machines: [],
      pollution: 0,

      gameTick: () => {
        set((state) => {
          state.money += state.machines.reduce((acc, machine) => {
            const machineDomain = new MachineDomain(machine);

            if (!machineDomain.isWorking) {
              return acc;
            }

            machine.currentDurability -= DURABILITY_DRAIN;

            state.pollution += machine.pollutionProduction;

            return acc + machineDomain.virtualResourceProduction;
          }, 0);

          return {
            money: state.money,
            pollution: state.pollution,
          };
        });
      },

      mintMachine: () => {
        if (get().money < MACHINE_MIN_COST) {
          return;
        } else {
          set((state) => {
            const machineFactory = new MachineFactory(MachineTier.Tier1);

            const machine = machineFactory.mintMachine();

            state.machines.push(machine);

            return {
              machines: state.machines,
              money: state.money - MACHINE_MIN_COST,
            };
          });
        }
      },

      repairMachine: (machineId: string) => {
        set((state) => {
          const machine = state.machines.find((m) => m.id === machineId);

          if (!machine) {
            return state;
          }

          const repairCost =
            (machine.durability - machine.currentDurability) * 1;

          if (state.money < repairCost) {
            return state;
          }

          machine.currentDurability = machine.durability;

          return {
            money: state.money - repairCost,
          };
        });
      },

      employees: [],

      mintEmployee: () => {
        if (get().money < EMPLOYEE_MIN_COST) {
          return;
        }

        set((state) => {
          const randomName = randomUtils.generateRandomName();

          const employee: Employee = {
            id: randomUtils.generateUniqueId(),
            name: randomName,
            resourceMultiplier: 1.1,
            energyMultiplier: 1.1,
            health: 100,
            pollutionMultiplier: 1.1,
            salary: 100,
          };

          state.employees.push(employee);

          return {
            employees: state.employees,
            money: state.money - EMPLOYEE_MIN_COST,
          };
        });
      },

      assignEmployees: (machineId: string, employeeId: string | string[]) => {
        const employeeIds = Array.isArray(employeeId)
          ? employeeId
          : [employeeId];

        set((state) => {
          const machine = state.machines.find((m) => m.id === machineId);

          if (!machine) {
            return state;
          }

          const employees = state.employees.filter((e) =>
            employeeIds.includes(e.id)
          );

          machine.assignedEmployee = employees;

          return {
            machines: state.machines,
          };
        });
      },

      availableEmployees: () => {
        const store = get();

        return store.employees.filter((employee) => {
          return !store.machines.some((machine) => {
            return machine.assignedEmployee.some((e) => e.id === employee.id);
          });
        });
      },
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: "game",
    }
  )
);
