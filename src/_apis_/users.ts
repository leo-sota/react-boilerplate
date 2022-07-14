import httpClient from "utils/axios/httpClient";

const getAllUsers = async <T>(query?: any): Promise<T[]> => {
    return httpClient.get("/users", query); 
};

const getUsersById = async (id?: string): Promise<any> => {
    if (!id) {
        throw new Error("Missing id");
    }
    const currentData = localStorage.getItem("users");
    if (currentData) {
        const listData: any[] = JSON.parse(currentData);
        const data = listData.find((item) => item.id === id);
        if (!data) {
            throw new Error("Not found");
        }
        return Promise.resolve(data);
    }
    return httpClient.get(`/users/${id}`);
};

const createUsers = async (data: any): Promise<any> => {
    const currentData = localStorage.getItem("users");
    if (currentData) {
        const currentDataJson = JSON.parse(currentData);
        currentDataJson.push(data);
        localStorage.setItem("users", JSON.stringify(currentDataJson));
        return Promise.resolve(data);
    }
    return httpClient.post("/users", data);
};

const updateUsers = async (data: any): Promise<any> => {
    const currentData = localStorage.getItem("users");
    if (currentData) {
        const listData: any[] = JSON.parse(currentData);
        const index = listData.findIndex((item) => item.id === data.id);
        if (index !== -1) {
            listData[index] = data;
            localStorage.setItem("users", JSON.stringify(listData));
        }
        return Promise.resolve(data);
    }
    return httpClient.put(`/users/${data.id}`, data);
};

const deleteUsers = async (id: string): Promise<any> => {
    const currentData = localStorage.getItem("users");
    if (currentData) {
        const listData: any[] = JSON.parse(currentData);
        const newlistData = listData.filter((item) => item.id !== id);
        
        localStorage.setItem("users", JSON.stringify(newlistData));
        return Promise.resolve(id);
    }
    return httpClient.deletes(`/users/${id}`);
};

const usersAPI = { getAllUsers, createUsers, updateUsers, deleteUsers, getUsersById };
export { getAllUsers, createUsers, updateUsers, deleteUsers, getUsersById };
export default usersAPI;