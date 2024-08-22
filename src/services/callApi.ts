import axios from "axios";
import { IAPI } from "../interfaces/api";
import { getLocalStorage } from "./utils";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

request.interceptors.request.use(
  request => {
    if(localStorage) {

      const token = localStorage.getItem('token')
      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

const callApi = async (
  url: string,
  method: "get" | "post" | "patch" | "delete" | "put" = "get",
  body: {} | null = null
) => {
  console.log(22, process.env.NEXT_PUBLIC_BASE_URL)
  try {
    const res = await request<IAPI>({
      url,
      method: method,
      data: body,
    });
    return res.data;
  } catch (error: any) {
    throw error?.response;
  }
};
export default callApi;
