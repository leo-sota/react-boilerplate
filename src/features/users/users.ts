import { User } from "./hooks";
import { generateUniqueId, getRandomString } from "utils/string";

export const getRandomUser = (): User => {
  return {
    id: generateUniqueId(),
    name: getRandomString(),
    age: Math.floor(Math.random() * 100),
    company: getRandomString(),
  };
};
