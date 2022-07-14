import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchUserInfo, useUpdateUser } from "./hooks";
import { generateUniqueId, getRandomString } from "utils/string";
import { PATH_DASHBOARD } from "routes/path";

const initialUserValue = {
  name: getRandomString(),
  age: 0,
  company: getRandomString(),
};

function UserForm() {
  const { id } = useParams();
  const { data } = useFetchUserInfo(id);
  const mutation = useUpdateUser();
  const navigate = useNavigate();

  const [formState, setFormState] = React.useState(initialUserValue);

  React.useEffect(() => {
    if (data) {
      setFormState(data);
    }
  }, [data]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    try {
      const newUser = { ...formState, id: generateUniqueId() };
      const params = {
        methodName: "createUser",
        args: [newUser],
      };
      await mutation.mutateAsync(params);
      navigate(PATH_DASHBOARD.users);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="w-full">
      <h4 className="mb-5">{id ? "Edit user" : "Create user"}</h4>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={formState.name}
          onChange={onChangeValue}
          placeholder="Name"
          name="name"
          className="border"
        />
        <input
          type="number"
          value={formState.age}
          onChange={onChangeValue}
          placeholder="Age"
          name="age"
          className="border"
        />
        <input
          type="text"
          value={formState.company}
          onChange={onChangeValue}
          placeholder="Company"
          name="company"
          className="border"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
        onClick={createUser}
      >
        Add user
      </button>
    </div>
  );
}

export default UserForm;
