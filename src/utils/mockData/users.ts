import mock from "../axios/mock";
import { User } from "../../features/users/hooks";

const userList: User[] = [
  {
    id: "abcxyz",
    name: "User 1",
    age: 12,
    company: "FPT",
  },
];

mock.onGet("/api/v1/users").reply(() => {
  console.log(111);
  const users = localStorage.getItem("users");

  if (users) {
    return [200, JSON.parse(users)];
  } else {
    localStorage.setItem("users", JSON.stringify(userList));
    return [200, userList];
  }
});
