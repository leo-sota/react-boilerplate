import { useMutation, useQuery } from "react-query";
import usersAPI from "_apis_/users";

export interface UserQueries {
  page: number;
  limit: number;
}

export interface User {
  id: string;
  name: string;
  age: number;
  company: string;
}

export const useFetchUsers = (query?: UserQueries) => {
  return useQuery<User[]>(
    [
      "users",
      {
        ...query,
      },
    ],
    () => usersAPI.getAllUsers(query),
    { refetchOnWindowFocus: false, keepPreviousData: true },
  );
};

export const useFetchUserInfo = (id?: string) => {
  return useQuery<User>(["user", id], () => usersAPI.getUserById(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useUpdateUser = () => {
  return useMutation((params: { methodName: string; readonly args: (string | User)[] }) => {
    const { methodName, args } = params;
    // @ts-ignore
    return usersAPI[methodName](...args);
  });
};
