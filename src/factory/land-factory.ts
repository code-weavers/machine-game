import { GameLand } from "@/store/game";
import { Land } from "@/types/entities/land";
import { dateUtils } from "@/utils/date";

export class LandFactory {
  private static getInitialPaymentDate() {
    const nextDate = dateUtils.addMinutes(new Date(), 10);

    const numberNextDate = nextDate.getTime();

    return numberNextDate;
  }

  static createLand(land: Land): GameLand {
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
