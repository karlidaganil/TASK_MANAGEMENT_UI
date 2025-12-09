import { Button, Card, Tag } from "antd";
import "./style.scss";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({
  title,
  description,
  status,
  dueDate,
}: {
  title: string;
  description: string;
  status: number;
  dueDate: Date;
}) => {
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
        <Button type="primary" icon={<FaEdit />} />
        <Button type="primary" icon={<FaTrash />} />
      </div>
    </Card>
  );
};

export default TaskCard;
