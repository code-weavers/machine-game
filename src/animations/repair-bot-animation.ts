export const repairBotAnimation = (machineId: string) => {
  const machine = document.getElementById(machineId);

  if (!machine) return;

  console.log(machine);

  const repairBot = document.createElement("div");

  repairBot.classList.add("repair-bot");

  machine.appendChild(repairBot);

  setTimeout(() => {
    repairBot.remove();
  }, 500);
};
