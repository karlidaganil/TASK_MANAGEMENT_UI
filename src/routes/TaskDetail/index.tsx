import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { Button, Card, DatePicker, Flex, Form, Input, Select } from "antd";
import { useState } from "react";
import type { UpdateTask } from "../../types";

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState<UpdateTask>({
    id: Number(id),
    title: "",
    description: "",
    status: 0,
    dueDate: "",
  });

  const handleDelete = () => {
    console.log("delete");
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
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Due Date" name="dueDate">
            <DatePicker
              placeholder="Select Due Date"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={[
                { label: "To Do", value: 0 },
                { label: "In Progress", value: 1 },
                { label: "Done", value: 2 },
              ]}
            />
          </Form.Item>
        </Form>
        <Flex justify="end" gap={10}>
          <Button type="primary" icon={<FaSave />}>
            Save
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default TaskDetail;
