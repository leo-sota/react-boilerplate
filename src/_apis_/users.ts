import httpClient from "../utils/axios/httpClient";
import { User, UserQueries } from "../features/users/hooks";

const getAllUsers = async <T>(query?: UserQueries): Promise<T[]> => {
  return httpClient.get("/users", query);
};

const createUser = async (data: User): Promise<any> => {
  console.log(data);
  const currentData = localStorage.getItem("users");
  if (currentData) {
    const currentDataJson = JSON.parse(currentData);
    currentDataJson.push(data);
    localStorage.setItem("users", JSON.stringify(currentDataJson));
    return Promise.resolve(data);
  }
  console.log(111);
  return httpClient.post("/users", data);
};

const updateUser = async (data: User): Promise<any> => {
  const currentData = localStorage.getItem("users");
  if (currentData) {
    const listUsers: User[] = JSON.parse(currentData);
    const index = listUsers.findIndex((user) => user.id === data.id);
    if (index !== -1) {
      listUsers[index] = data;
      localStorage.setItem("users", JSON.stringify(listUsers));
    }
  }
  return httpClient.put(`/users/${data.id}`, data);
};

const deleteUser = async (id: string): Promise<any> => {
  console.log(id);
  const currentData = localStorage.getItem("users");
  if (currentData) {
    const listUsers: User[] = JSON.parse(currentData);
    const newListUsers = listUsers.filter((user) => user.id !== id);

    localStorage.setItem("users", JSON.stringify(newListUsers));
    return Promise.resolve(id);
  }
  return httpClient.deletes(`/users/${id}`);
};

const usersAPI = { getAllUsers, createUser, updateUser, deleteUser };
export { getAllUsers, createUser, updateUser, deleteUser, usersAPI };
