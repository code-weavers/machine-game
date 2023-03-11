import { randomUtils } from "./../utils/random/index";
import { Land } from "@/types/entities/land";

export const lands: Land[] = [
  {
    id: randomUtils.generateUniqueId(),
    fee: 100,
    name: "Land 1",
    machineLimit: 10,
  },
];
