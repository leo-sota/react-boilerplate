import { useMutation, useQuery } from "react-query";
import usersAPI from "_apis_/users";

export interface UsersQueries {
  page: number;
  limit: number;
}

export const useFetchUsers = (query?: UsersQueries) => {
  return useQuery<any[]>(
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

export const useFetchUsersInfo = (id?: string) => {
  return useQuery<any>(["users", id], () => usersAPI.getUsersById(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!id,
  });
};

export const useUpdateUsers = () => {
  return useMutation((params: { methodName: string; readonly args: (string | any)[] }) => {
    const { methodName, args } = params;
    // @ts-ignore
    return usersAPI[methodName](...args);
  });
};
