import { create } from "zustand";
import type { Task } from "../types";

interface TaskStore {
  task: Task[];
  getTaskById: (id: number) => Task | undefined;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  task: [] as Task[],
  getTaskById: (id: number) => {
    const tasks = get().task;
    if (Array.isArray(tasks)) {
      return tasks.find((task: Task) => task.id === id);
    }
    return undefined;
  },
  setTasks: (tasks: Task[]) => {
    set({ task: tasks });
  },
}));