import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Select,
} from "antd";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { CreateTask } from "../../types";
import useCreateTask from "../../hooks/useCreateTask";
import * as yup from "yup";
import dayjs from "dayjs";
import { createTaskSchema } from "../../validations";



const CreateNewTask = () => {
  const [form, setForm] = useState<CreateTask>({
    title: "",
    description: "",
    status: null,
    dueDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createTask } = useCreateTask();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // Validate with Yup
      await createTaskSchema.validate(form, { abortEarly: false });
      setErrors({});

      const response = await createTask(form);
      if (response.success) {
        message.success("Task created successfully");
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

  console.log("errors", errors);

  return (
    <div>
      <Card style={{ width: "100%" }} title="Create Task">
        <Form layout="vertical">
          <Form.Item
            label="Title"
            name="title"
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
            name="description"
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
            name="status"
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
            name="dueDate"
            validateStatus={errors.dueDate ? "error" : ""}
            help={errors.dueDate}
          >
            <DatePicker
              placeholder="Select Due Date"
              style={{ width: "100%" }}
              value={form.dueDate ? dayjs(form.dueDate) : null}
              onChange={(value) => {
                setForm({
                  ...form,
                  dueDate: value ? value.toISOString() : "",
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

export default CreateNewTask;
