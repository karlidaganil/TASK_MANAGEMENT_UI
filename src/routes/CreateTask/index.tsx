import { Button, Card, DatePicker, Flex, Form, Input, Select } from "antd";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/");
  };

  return (
    <div>
      <Card style={{ width: "100%" }} title="Create Task">
        <Form layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
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
          <Form.Item label="Due Date" name="dueDate">
            <DatePicker
              placeholder="Select Due Date"
              style={{ width: "100%" }}
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
