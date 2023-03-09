export enum MachineType {
  Drill,
  Saw,
  Press,
}

export enum MachineTier {
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3,
}

export type Machine = {
  id: number;
  name: string;
  image: string;
  durability: number;

  energyCost: number;
  pollutionProduction: number;

  resourceProduction: number;
  type: MachineType;

  tier: MachineTier;
};
