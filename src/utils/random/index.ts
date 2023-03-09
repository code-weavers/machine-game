const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateUniqueId = () => {
  return new Date().getTime() + Math.random();
};

export const randomUtils = {
  getRandomNumber,
  generateUniqueId,
};
