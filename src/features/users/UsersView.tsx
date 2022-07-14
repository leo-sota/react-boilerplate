import React from "react";
import { useUpdateUser, useFetchUsers } from "./hooks";
import { Link } from "react-router-dom";

function UsersView() {
  const { data, refetch } = useFetchUsers();
  const mutation = useUpdateUser();

  const deleteUser = (id: string) => async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const params = {
          methodName: "deleteUser",
          args: [id],
        };
        await mutation.mutateAsync(params);
        await refetch();
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
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
            <div className="flex gap-2">
              <Link to={`${user.id}/edit`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                  Update user
                </button>
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                onClick={deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
            <hr className="my-2" />
          </div>
        ))}
      </div>
      <Link to="create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add user
        </button>
      </Link>
    </div>
  );
}

export default UsersView;
