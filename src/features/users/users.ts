import { User } from "./hooks";

const generateUniqueId = (length = 10) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const getRandomUser = (): User => {
  return {
    id: generateUniqueId(),
    name: getRandomString(),
    age: Math.floor(Math.random() * 100),
    company: getRandomString(),
  };
};
