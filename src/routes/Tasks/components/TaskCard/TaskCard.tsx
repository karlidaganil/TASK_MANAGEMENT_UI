import { Button, Card, Tag } from "antd";
import "./style.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  id,
  title,
  description,
  status,
  dueDate,
}: {
  id: number;
  title: string;
  description: string;
  status: number;
  dueDate: Date;
}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/task/${id}`);
  };

  const handleDelete = () => {
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
    >
      {description}
      <div className="task-card-due-date">
        <span>Due Date: {dueDate.toLocaleDateString()}</span>
      </div>
      <div className="task-card-edit-delete-buttons">
        <Button type="primary" icon={<FaEdit />} onClick={handleEdit} />
        <Button type="primary" icon={<FaTrash />} onClick={handleDelete} />
      </div>
    </Card>
  );
};

export default TaskCard;
