import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import type { UpdateTask } from "../../types";
import useGetTaskDetail from "../../hooks/useGetTaskDetail";
import dayjs, { Dayjs } from "dayjs";
import useUpdateTask from "../../hooks/useUpdateTask";
import useDeleteTask from "../../hooks/useDeleteTask";
import * as yup from "yup";
import { updateTaskSchema } from "../../validations";



const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchTaskDetail } = useGetTaskDetail(id as string);
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();

  const [form, setForm] = useState<UpdateTask>({
    id: Number(id),
    title: "",
    description: "",
    status: 0,
    dueDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const response = await fetchTaskDetail();
      if (response.success) {
        setForm((prev) => ({ ...prev, ...response.payload }));
      }
    })();
  }, [id, fetchTaskDetail]);

  const handleSave = async () => {
    try {
      // Validate with Yup
      await updateTaskSchema.validate(form, { abortEarly: false });
      setErrors({});

      const response = await updateTask(form);
      if (response.success) {
        message.success("Task updated successfully");
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
        message.error("Please fix the validation errors");
      }
    }
  };

  const handleDelete = async () => {
    const response = await deleteTask(form.id);
    if (response.success) {
      message.success("Task deleted successfully");
      navigate("/");
    } else {
      message.error(response.message);
    }
  };
  return (
    <div className="task-detail-container">
      <Link to="/" className="back-to-task-list">
        <FaArrowLeft /> Back to Task List
      </Link>
      <Card
        style={{ width: "100%" }}
        title={`Task Detail ${id}`}
        extra={
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={handleDelete}
          >
            <Button type="primary" icon={<FaTrash />}>
              Delete
            </Button>
          </Popconfirm>
        }
      >
        <Form layout="vertical">
          <Form.Item
            label="Title"
            validateStatus={errors.title ? "error" : ""}
            help={errors.title}
          >
            <Input
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                if (errors.title) {
                  setErrors({ ...errors, title: "" });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description}
          >
            <Input.TextArea
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                if (errors.description) {
                  setErrors({ ...errors, description: "" });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            validateStatus={errors.status ? "error" : ""}
            help={errors.status}
          >
            <Select
              options={[
                { label: "To Do", value: 0 },
                { label: "In Progress", value: 1 },
                { label: "Done", value: 2 },
              ]}
              value={form.status}
              onChange={(value) => {
                setForm({ ...form, status: value });
                if (errors.status) {
                  setErrors({ ...errors, status: "" });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Due Date"
            validateStatus={errors.dueDate ? "error" : ""}
            help={errors.dueDate}
          >
            <DatePicker
              placeholder="Select Due Date"
              style={{ width: "100%" }}
              value={dayjs(form.dueDate, "YYYY-MM-DD")}
              onChange={(value: Dayjs | null) => {
                setForm({
                  ...form,
                  dueDate: value ? value.format("YYYY-MM-DD") : "",
                });
                if (errors.dueDate) {
                  setErrors({ ...errors, dueDate: "" });
                }
              }}
            />
          </Form.Item>
        </Form>
        <Flex justify="end" gap={10}>
          <Button type="primary" icon={<FaSave />} onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default TaskDetail;
