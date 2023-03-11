import { MachineDomain } from "@/domain/machine.domain";
import { MachineFactory } from "@/factory/machine-factory";
import { Employee } from "@/types/entities/employee";
import { Land } from "@/types/entities/land";
import { Machine, MachineTier } from "@/types/entities/machine";
import { dateUtils } from "@/utils/date";
import { randomUtils } from "@/utils/random";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GameLand = Land & {
  nextPaymentDate: number;
};

export interface GameMachine extends Machine {
  currentDurability: number;
  assignedEmployee: Employee[];
}

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
  selectedLand: GameLand | null;
  money: number;
  machines: GameMachine[];
  gameSpeedMs: number;
  pollution: number;

  repairBots: GameRepairBot[];

  employees: Employee[];

  setGameSpeedMs: (gameSpeed: number) => void;

  buyRepairBot: (repairBot: RepairBot) => void;
  payLandFee: () => void;
  gameTick: () => void;
  mintMachine: () => void;
  mintEmployee: () => void;
  repairMachine: (machineId: string) => void;
  assignEmployees: (machineId: string, employeeId: string | string[]) => void;
  availableEmployees: () => Employee[];
  setSelectedLand: (land: Land) => void;
}

const DURABILITY_DRAIN = 5;

const MACHINE_MIN_COST = 300;

const EMPLOYEE_MIN_COST = 100;

export const useGameStore = create(
  persist<Store>(
    (set, get) => ({
      repairBots: [],
      money: 500,
      machines: [],
      pollution: 0,
      selectedLand: null,
      gameSpeedMs: 1000,
      setGameSpeedMs: (gameSpeed) => {
        set({ gameSpeedMs: gameSpeed });
      },

      buyRepairBot: (repairBot) => {
        set((state) => {
          state.repairBots.push({
            ...repairBot,
            availableAt: new Date().getTime(),
          });

          return state;
        });
      },

      payLandFee: () => {
        set((state) => {
          if (!state.selectedLand || state.money < state.selectedLand.fee) {
            return state;
          }

          state.money -= state.selectedLand.fee;

          const nextDate = dateUtils.addSeconds(new Date(), 30);

          const numberNextDate = nextDate.getTime();

          state.selectedLand.nextPaymentDate = numberNextDate;

          return state;
        });
      },

      setSelectedLand(land: Land) {
        const nextDate = dateUtils.addMinutes(new Date(), 10);

        const numberNextDate = nextDate.getTime();

        set({
          selectedLand: {
            ...land,

            nextPaymentDate: numberNextDate,
          },
        });
      },

      gameTick: () => {
        set((state) => {
          if (!state.selectedLand) return state;

          if (state.selectedLand.nextPaymentDate - new Date().getTime() <= 0) {
            return state;
          }

          state.money += state.machines.reduce((acc, machine) => {
            const machineDomain = new MachineDomain(machine);

            if (machineDomain.isBroken) {
              const foundRepairBot = state.repairBots.find((repairBot) => {
                return (
                  repairBot.availableAt - new Date().getTime() <= 0 &&
                  machineDomain.isBroken
                );
              });

              if (foundRepairBot) {
                const repairValue =
                  foundRepairBot.repairPercentage * machine.durability;

                console.log(repairValue);

                machine.currentDurability += repairValue;

                foundRepairBot.availableAt = dateUtils
                  .addSeconds(new Date(), foundRepairBot.secondsInterval)
                  .getTime();
              }
            }

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
        if (get().machines.length + 1 > (get().selectedLand?.machineLimit || 0))
          return;

        if (get().money < MACHINE_MIN_COST) {
          return;
        }
        set((state) => {
          const machineFactory = new MachineFactory(MachineTier.Tier1);

          const machine = machineFactory.mintMachine();

          state.machines.push(machine);

          return {
            machines: state.machines,
            money: state.money - MACHINE_MIN_COST,
          };
        });
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
