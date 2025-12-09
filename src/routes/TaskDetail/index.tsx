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
  Select,
} from "antd";
import { useEffect, useState } from "react";
import type { UpdateTask } from "../../types";
import useGetTaskDetail from "../../hooks/useGetTaskDetail";
import dayjs, { Dayjs } from "dayjs";
import useUpdateTask from "../../hooks/useUpdateTask";
import useDeleteTask from "../../hooks/useDeleteTask";

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

  useEffect(() => {
    (async () => {
      const response = await fetchTaskDetail();
      if (response.success) {
        setForm((prev) => ({ ...prev, ...response.payload }));
      }
    })();
  }, [id, fetchTaskDetail]);

  console.log("form", form);

  const handleSave = async () => {
    const response = await updateTask(form);
    if (response.success) {
      message.success("Task updated successfully");
      navigate("/");
    } else {
      message.error(response.message);
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
          <Button type="primary" icon={<FaTrash />} onClick={handleDelete}>
            Delete
          </Button>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker
              placeholder="Select Due Date"
              style={{ width: "100%" }}
              value={dayjs(form.dueDate, "YYYY-MM-DD")}
              onChange={(value: Dayjs | null) =>
                setForm({
                  ...form,
                  dueDate: value ? value.format("YYYY-MM-DD") : "",
                })
              }
            />
          </Form.Item>
          <Form.Item label="Status">
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
