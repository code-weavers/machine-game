import { MachineEntity } from "@/domain/machine.domain";
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
  setSelectedLand: (land: Land) => void;
}

const DURABILITY_DRAIN = 5;

const MACHINE_MIN_COST = 300;

const EMPLOYEE_MIN_COST = 100;

export const useGameStore = create(
  persist<Store>(
    (set, get) => ({
      repairBots: [],
      money: 50000,
      machines: [],
      pollution: 0,
      selectedLand: null,
      gameSpeedMs: 1000,
      employees: [],

      setGameSpeedMs: (gameSpeed) => {
        set({ gameSpeedMs: gameSpeed });
      },

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

          const updatedMachines = state.machines.map((machine) => {
            const machineDomain = new MachineEntity(machine);

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

                machine.currentDurability += repairValue;

                foundRepairBot.availableAt = dateUtils
                  .addSeconds(new Date(), foundRepairBot.secondsInterval)
                  .getTime();

                return machine;
              }
            }

            if (machineDomain.isWorking) {
              machine.currentDurability -= DURABILITY_DRAIN;
              state.pollution += machineDomain.virtualPollutionProduction;
              state.money += machineDomain.virtualResourceProduction;
            }

            return machine;
          }, 0);

          return {
            money: state.money,
            pollution: state.pollution,
            machines: updatedMachines,
          };
        });
      },

      mintMachine: () => {
        const { machines, selectedLand, money } = get();

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

          const machineEntity = new MachineEntity(machinesClone[machineIndex]);

          const { money } = machineEntity.repair(state.money);

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
          const randomName = randomUtils.generateRandomName();

          const employeesClone = structuredClone(state.employees);

          const employee: Employee = {
            id: randomUtils.generateUniqueId(),
            name: randomName,
            resourceMultiplier: 1.1,
            energyMultiplier: 1.1,
            health: 100,
            pollutionMultiplier: 1.1,
            salary: 100,
          };

          employeesClone.push(employee);

          return {
            employees: employeesClone,
            money: state.money - EMPLOYEE_MIN_COST,
          };
        });
      },

      assignEmployees: (machineId: string, employeeId: string | string[]) => {
        set((state) => {
          const employeeIds = Array.isArray(employeeId)
            ? employeeId
            : [employeeId];

          const machineIndex = state.machines.findIndex(
            (m) => m.id === machineId
          );

          if (machineIndex < 0) return state;

          const employees = state.employees.filter((e) =>
            employeeIds.includes(e.id)
          );

          const machinesClone = structuredClone(state.machines);

          machinesClone[machineIndex].assignedEmployee = employees;

          return {
            machines: machinesClone,
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
