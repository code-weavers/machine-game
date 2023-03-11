import { RepairBot } from "@/store/game";

export const AutoRepairBot = ({ name, id }: RepairBot) => {
  return (
    <div>
      <h1>
        {name} - {id}{" "}
      </h1>
    </div>
  );
};
