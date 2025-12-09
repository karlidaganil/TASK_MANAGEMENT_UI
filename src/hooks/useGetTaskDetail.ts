import { useCallback, useEffect, useState } from "react";
import type { Response } from "../api";
import API from "../api";
import type { Task } from "../types";

const useGetTaskDetail = (id: string) => {
  const [data, setData] = useState<Response<Task> | null>(null);

  const fetchTaskDetail = useCallback(async () => {
    const response = await API.get<Response<Task>>(`/${id}`);
    setData(response.data);
  }, [id]);

  useEffect(() => {
    (async () => {
      await fetchTaskDetail();
    })();
  }, [fetchTaskDetail]);

  return { data, fetchTaskDetail };
};

export default useGetTaskDetail;
