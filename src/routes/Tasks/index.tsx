import { Button, DatePicker, List } from "antd";
import TaskCard from "./components/TaskCard/TaskCard";
import "./style.scss";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const data = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title: `Card Title ${i + 1}`,
  description: "This is a sample card description",
  status: 0,
  dueDate: new Date(),
}));

const Tasks = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<{
    status: number | null;
    dueDateFrom: string | null;
    dueDateTo: string | null;
  }>({
    status: 0,
    dueDateFrom: null,
    dueDateTo: null,
  });
  return (
    <div>
      <div className="tasks-filters">
        <div className="tasks-filters-buttons">
          <Button
            type={filters.status === null ? "primary" : "default"}
            size="large"
            onClick={() => setFilters({ ...filters, status: null })}
          >
            All
          </Button>
          <Button
            type={filters.status === 0 ? "primary" : "default"}
            size="large"
            onClick={() => setFilters({ ...filters, status: 0 })}
          >
            To Do
          </Button>
          <Button
            type={filters.status === 1 ? "primary" : "default"}
            size="large"
            onClick={() => setFilters({ ...filters, status: 1 })}
          >
            In Progress
          </Button>
          <Button
            type={filters.status === 2 ? "primary" : "default"}
            size="large"
            onClick={() => setFilters({ ...filters, status: 2 })}
          >
            Done
          </Button>
        </div>
        <RangePicker
          placeholder={["Due Date From", "Due Date To"]}
          style={{ width: "500px" }}
          onChange={(dates) => {
            setFilters({
              ...filters,
              dueDateFrom: dates?.[0]?.toISOString() || null,
              dueDateTo: dates?.[1]?.toISOString() || null,
            });
          }}
        />
        <Button type="primary" size="large" onClick={() => navigate("/create-task")}>
          <FaPlus /> Add Task
        </Button>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
        renderItem={(item) => (
          <List.Item>
            <TaskCard
              id={item.id}
              title={item.title}
              description={item.description}
              status={item.status}
              dueDate={item.dueDate}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Tasks;
