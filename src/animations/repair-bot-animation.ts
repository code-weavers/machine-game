export const repairBotAnimation = (machineId: string) => {
  const machine = document.getElementById(machineId);

  if (!machine) return;

  const repairBot = document.createElement("div");

  repairBot.classList.add("repair-bot");

  machine.appendChild(repairBot);

  setTimeout(() => {
    repairBot.remove();
  }, 500);
};
