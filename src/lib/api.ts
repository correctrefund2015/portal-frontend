import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
  // statusCode: number;
  // timestamp: string;
  // path: string;
  // message: {
  //   message: string;
  //   error: string;
  //   statusCode: number;
  // };
}

export function geApiErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function apiCall<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await api[method]<T>(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse: ErrorResponse = error.response?.data || {
        message: error.message,
      };
      throw errorResponse;
    }
    throw error;
  }
}
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Update this to your NestJS API URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the cookie in the headers
api.interceptors.request.use(
  (config) => {
    // Assuming you have access to the cookie value
    const authToken = cookies().toString();

    // console.log({ authToken });

    // Set the cookie in the header
    config.headers["Cookie"] = authToken;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
