import React from "react";
import { useCRUDUser, useFetchUsers } from "./hooks";
import { getRandomUser } from "./users";

function UsersView() {
  const { data, refetch } = useFetchUsers();
  const mutation = useCRUDUser();

  console.log(data);

  const createUser = async () => {
    try {
      const newUser = getRandomUser();
      const params = {
        methodName: "createUser",
        args: [newUser],
      };
      await mutation.mutateAsync(params);
      await refetch();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const deleteUser = (id: string) => async () => {
    try {
      const params = {
        methodName: "deleteUser",
        args: [id],
      };
      await mutation.mutateAsync(params);
      await refetch();
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      <p className="font-bold">Users management</p>
      <hr className="my-2" />
      <div className="flex flex-col gap-2">
        {data?.map((user) => (
          <div key={user.id} className="">
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Company: {user.company}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
              onClick={deleteUser(user.id)}
            >
              Delete
            </button>
            <hr className="my-2" />
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={createUser}
      >
        Add user
      </button>
    </div>
  );
}

export default UsersView;
