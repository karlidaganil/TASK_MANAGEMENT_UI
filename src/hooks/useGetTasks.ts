import { useCallback, useEffect, useState } from "react";
import type { Filters, Task } from "../types";
import API, { type PaginatedResponse } from "../api";

const useGetTasks = (filters: Filters) => {
  const [data, setData] = useState<PaginatedResponse<Task[] | []>>({
    success: true,
    payload: [],
    message: "",
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const fetchTasks = useCallback(async () => {
    const response = await API.get<PaginatedResponse<Task[] | []>>("/all", {
      params: filters,
    });
    setData(response.data);
  }, [filters]);

  useEffect(() => {
    (async () => {
      await fetchTasks();
    })();
  }, [fetchTasks]);

  return { data, fetchTasks };
};

export default useGetTasks;
