import { Land } from "@/types/entities/land";
import { dateUtils } from "@/utils/date";

export class LandEntity {
  public id: string;
  public name: string;
  public fee: number;
  public machineLimit: number;
  public nextPaymentDate: number;
  public pollution: number;

  constructor(land: Land) {
    this.id = land.id;
    this.name = land.name;
    this.fee = land.fee;
    this.machineLimit = land.machineLimit;
    this.nextPaymentDate = land.nextPaymentDate;
    this.pollution = land.pollution;
  }

  get isPolluted() {
    return this.pollution >= 1000;
  }

  get pollutionDamage() {
    return this.pollution / 1000;
  }

  addPollution(pollution: number) {
    this.pollution += pollution;
  }

  isPayable(userMoney: number) {
    if (!this.id) return false;

    return userMoney >= this.fee;
  }

  payFee(userMoney: number) {
    const nextDate = dateUtils.addMinutes(new Date(), 10);

    const numberNextDate = nextDate.getTime();

    this.nextPaymentDate = numberNextDate;

    return {
      money: userMoney - this.fee,
    };
  }

  isPaid() {
    const remainingTime = this.nextPaymentDate - new Date().getTime();

    return remainingTime > 0;
  }
}
