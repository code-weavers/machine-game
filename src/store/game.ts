import { MachineFactory } from "@/factory/machine-factory";
import { Machine, MachineTier } from "@/types/entities/machine";
import { create } from "zustand";

export interface GameMachine extends Machine {
  currentDurability: number;
}

interface Store {
  money: number;
  machines: GameMachine[];
  pollution: number;
  gameTick: () => void;
  mintMachine: () => void;
  repairMachine: (machineId: number) => void;
}

const DURABILITY_DRAIN = 10;

const MACHINE_MIN_COST = 500;

export const useGameStore = create<Store>((set, get) => ({
  money: 500,
  machines: [],
  pollution: 0,

  gameTick: () => {
    set((state) => {
      const newMoney =
        state.money +
        state.machines.reduce((acc, machine) => {
          if (machine.currentDurability <= 0) {
            return acc;
          }

          return acc + machine.resourceProduction;
        }, 0);

      const newPollution =
        state.pollution +
        state.machines.reduce((acc, machine) => {
          return acc + machine.pollutionProduction;
        }, 0);

      state.machines.forEach((machine) => {
        console.log(machine.currentDurability);
        machine.currentDurability -= DURABILITY_DRAIN;
        if (machine.currentDurability < 0) {
          machine.currentDurability = 0;
        }
      });

      return {
        money: newMoney,
        pollution: newPollution,
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
  repairMachine: (machineId: number) => {
    set((state) => {
      const machine = state.machines.find((m) => m.id === machineId);

      if (!machine) {
        return state;
      }

      const repairCost = (machine.durability - machine.currentDurability) * 1;

      if (state.money < repairCost) {
        return state;
      }

      machine.currentDurability = machine.durability;

      return {
        money: state.money - repairCost,
      };
    });
  },
}));
