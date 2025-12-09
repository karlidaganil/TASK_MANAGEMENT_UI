export type Status = 0 | 1 | 2;

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
}

export interface Filters {
  status: Status | null;
  dueDateFrom: string | null;
  dueDateTo: string | null;
}

export interface CreateTask {
  title: string;
  description: string;
  status: number;
  dueDate: string;
}
