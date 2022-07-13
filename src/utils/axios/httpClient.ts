import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "./instance";

const handleResponse = <T>(response: AxiosResponse<T>) => {
  if (!response.data) {
    return Promise.reject(new Error("Something went wrong"));
  } else {
    return Promise.resolve(response.data);
  }
};

async function get<T, P extends {}>(
  url: string,
  params?: P,
  config?: Omit<AxiosRequestConfig, "params">,
): Promise<T> {
  return axios({
    method: "GET",
    url,
    params,
    ...config,
  }).then(handleResponse);
}

async function post<T>(
  url: string,
  data?: T,
  config?: Omit<AxiosRequestConfig, "data">,
): Promise<T> {
  return axios({
    method: "POST",
    url,
    data,
    ...config,
  }).then(handleResponse);
}
async function put<T>(
  url: string,
  data?: T,
  config?: Omit<AxiosRequestConfig, "data">,
): Promise<T> {
  return axios({
    method: "PUT",
    url,
    data,
    ...config,
  }).then(handleResponse);
}

async function deletes<T>(url: string, config?: Omit<AxiosRequestConfig, "data">): Promise<T> {
  return axios({
    method: "DELETE",
    url,
    ...config,
  }).then(handleResponse);
}

const httpClient = {
  get,
  post,
  deletes,
  put,
};
export { get, post, deletes, put };
export default httpClient;
