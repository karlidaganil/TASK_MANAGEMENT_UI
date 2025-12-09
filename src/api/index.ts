import axios from "axios";

export interface PaginatedResponse<T> {
  success: boolean;
  payload: T;
  message: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Response<T> {
  success: boolean;
  sayload: T;
  message: string;
}

const API = axios.create({
  baseURL: " http://localhost:5222/api/task",
});

API.interceptors.response.use((response) => {
  return response;
});

export default API;
