import { randomUtils } from "./../utils/random/index";
import { Land } from "@/types/entities/land";
import { dateUtils } from "@/utils/date";

export class LandFactory {
  private static getInitialPaymentDate() {
    const nextDate = dateUtils.addMinutes(new Date(), 10);

    const numberNextDate = nextDate.getTime();

    return numberNextDate;
  }

  static mint(): Land {
    return {
      fee: 0,
      id: randomUtils.generateUniqueId(),
      machineLimit: 10,
      name: "land",
      nextPaymentDate: this.getInitialPaymentDate(),
      pollution: 0,
    };
  }

  static createLand(land: Land): Land {
    return {
      id: land.id,
      fee: land.fee,
      machineLimit: land.machineLimit,
      name: land.name,
      nextPaymentDate: this.getInitialPaymentDate(),
      pollution: 0,
    };
  }
}
