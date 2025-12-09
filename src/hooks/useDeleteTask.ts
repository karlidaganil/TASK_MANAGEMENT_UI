import API, { type Response } from "../api";

const useDeleteTask = () => {
  const deleteTask = async (id: number) => {
    const response = await API.delete<Response<boolean>>(`/${id}`);
    return response.data;
  };
  return { deleteTask };
};

export default useDeleteTask;
