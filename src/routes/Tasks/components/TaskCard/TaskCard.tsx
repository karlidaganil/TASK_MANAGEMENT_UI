import { Button, Card, message, Tag } from "antd";
import "./style.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDeleteTask from "../../../../hooks/useDeleteTask";

const TaskCard = ({
  id,
  title,
  description,
  status,
  dueDate,
  fetchTasks,
}: {
  id: number;
  title: string;
  description: string;
  status: number;
  dueDate: string;
  fetchTasks: () => void;
}) => {
  const navigate = useNavigate();
  const { deleteTask } = useDeleteTask();

  const handleEdit = () => {
    navigate(`/task/${id}`);
  };

  const handleDelete = async () => {
    const response = await deleteTask(id);
    if (response.success) {
      message.success("Task deleted successfully");
      fetchTasks();
    } else {
      message.error(response.message);
    }
    console.log("delete");
  };

  return (
    <Card
      title={title}
      extra={
        <Tag color={status === 0 ? "blue" : status === 1 ? "green" : "red"}>
          {status === 0 ? "To Do" : status === 1 ? "In Progress" : "Done"}
        </Tag>
      }
      style={{ height: "250px" }}
    >
      <span>
        {description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </span>
      <div className="task-card-due-date">
        <span>Due Date: {new Date(dueDate).toLocaleDateString()}</span>
      </div>
      <div className="task-card-edit-delete-buttons">
        <Button type="primary" icon={<FaEdit />} onClick={handleEdit} />
        <Button type="primary" icon={<FaTrash />} onClick={handleDelete} />
      </div>
    </Card>
  );
};

export default TaskCard;
