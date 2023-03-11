import { v4 as uuidv4 } from "uuid";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomName = () => {
  const maxLength = getRandomNumber(5, 10);

  let name = "";

  for (let i = 0; i < maxLength; i++) {
    name += String.fromCharCode(getRandomNumber(97, 122));
  }

  return name;
};

const generateUniqueId = () => {
  return uuidv4();
};

export const randomUtils = {
  getRandomNumber,
  generateUniqueId,
  generateRandomName,
};
