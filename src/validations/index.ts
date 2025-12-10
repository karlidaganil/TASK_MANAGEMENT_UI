import dayjs from "dayjs";
import * as yup from "yup";

export const createTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  status: yup
    .number()
    .required("Status is required")
    .oneOf([0, 1, 2], "Status must be To Do, In Progress, or Done"),
  dueDate: yup
    .string()
    .required("Due date is required")
    .test("is-future", "Due date must be in the future", function (value) {
      if (!value) return false;
      const dueDate = dayjs(value);
      return dueDate.isAfter(dayjs(), "day");
    }),
});

export const updateTaskSchema = yup.object().shape({
  id: yup.number().required(),
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  status: yup
    .number()
    .required("Status is required")
    .oneOf([0, 1, 2], "Status must be To Do, In Progress, or Done"),
  dueDate: yup
    .string()
    .required("Due date is required")
    .test("is-future", "Due date must be in the future", function (value) {
      if (!value) return false;
      const dueDate = dayjs(value);
      return dueDate.isAfter(dayjs(), "day");
    }),
});
