export type Employee = {
  id: string;
  name: string;
  salary: number;
  health: number;
  currentHealth: number;
  resourceMultiplier: number;
  pollutionMultiplier: number;
  energyMultiplier: number;
  assignedMachineId: string | null;
};
