import { GameLand } from "@/store/game";
import { dateUtils } from "@/utils/date";

export class LandEntity {
  constructor(private land: GameLand) {}

  get id() {
    return this.land.id;
  }

  get name() {
    return this.land.name;
  }

  get pollution() {
    return this.land.pollution;
  }

  set pollution(value: number) {
    this.land.pollution = value;
  }

  get isPolluted() {
    return this.land.pollution >= 1000;
  }

  get pollutionDamage() {
    return this.land.pollution / 1000;
  }

  isPayable(userMoney: number) {
    if (!this.id) return false;

    return userMoney >= this.land.fee;
  }

  payFee(userMoney: number) {
    const nextDate = dateUtils.addMinutes(new Date(), 10);

    const numberNextDate = nextDate.getTime();

    this.land.nextPaymentDate = numberNextDate;

    return {
      money: userMoney - this.land.fee,
    };
  }

  isPaid() {
    const remainingTime = this.land.nextPaymentDate - new Date().getTime();

    return remainingTime > 0;
  }

  getLand() {
    return this.land;
  }
}
