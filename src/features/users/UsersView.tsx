import React from "react";
import { useUpdateUsers, useFetchUsers } from "./hooks";
import { Link } from "react-router-dom";

function UsersView() {
    const { data, refetch } = useFetchUsers();
    const mutation = useUpdateUsers();

    const deleteUsers = (id: string) => async () => {
        if (window.confirm("Are you sure?")) {
        try {
            const params = {
                methodName: "deleteUsers",
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
            <p className="font-bold">Users</p>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
                {data?.map((item) => (
                <div key={item.id} className="">
                    <p>Name: {item.name}</p>
                    <p>Age: {item.age}</p>
                    <p>Company: {item.company}</p>
                    <div className="flex gap-2">
                        <Link to={`${item.id}/edit`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                            Update
                        </button>
                        </Link>
                        <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                                onClick={deleteUsers(item.id)}
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
                Create
            </button>
            </Link>
        </div>
    );
}

export default UsersView;
