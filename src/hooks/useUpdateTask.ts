import type { Response } from "../api";
import API from "../api";
import type { Task, UpdateTask } from "../types";

const useUpdateTask = () => {
  const updateTask = async (task: UpdateTask) => {
    const response = await API.put<Response<Task>>("/update", task);
    return response.data;
  };
  return { updateTask };
};

export default useUpdateTask;
