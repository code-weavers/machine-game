const addSeconds = (date: Date, seconds: number): Date => {
  const newDate = new Date(date.getTime());
  newDate.setSeconds(newDate.getSeconds() + seconds);
  return newDate;
};

const addMinutes = (date: Date, minutes: number): Date => {
  const newDate = new Date(date.getTime());
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

export const dateUtils = {
  addSeconds,
  addMinutes,
};
