import axios from "axios";
import { apiBaseUrl } from "../configs";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.message);
    return Promise.reject((error.response && error.response.data) || "Something went wrong");
  },
);

export default axiosInstance;
