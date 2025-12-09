import API, { type Response } from "../api";
import type { CreateTask } from "../types";

const useCreateTask = () => {
  const createTask = async (task: CreateTask) => {
    const response = await API.post<Response<boolean>>("/create", task);
    return response.data;
  };
  return { createTask };
};

export default useCreateTask;
