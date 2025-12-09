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

const CreateTask = () => {
  const [form, setForm] = useState<CreateTask>({
    title: "",
    description: "",
    status: 0,
    dueDate: "",
  });

  const { createTask } = useCreateTask();
  const navigate = useNavigate();

  const handleSave = async () => {
    const response = await createTask(form);
    if (response.success) {
      message.success("Task created successfully");
      navigate("/");
    } else {
      message.error(response.message);
    }
  };

  console.log(form);

  return (
    <div>
      <Card style={{ width: "100%" }} title="Create Task">
        <Form layout="vertical">
          <Form.Item label="Title" name="title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={[
                { label: "To Do", value: 0 },
                { label: "In Progress", value: 1 },
                { label: "Done", value: 2 },
              ]}
              value={form.status}
              onChange={(value) => setForm({ ...form, status: value })}
            />
          </Form.Item>
          <Form.Item label="Due Date" name="dueDate">
            <DatePicker
              placeholder="Select Due Date"
              style={{ width: "100%" }}
              value={form.dueDate ? new Date(form.dueDate) : null}
              onChange={(value: Date | null) =>
                setForm({
                  ...form,
                  dueDate: value
                    ? new Date(value).toISOString()
                    : new Date().toISOString(),
                })
              }
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

export default CreateTask;
