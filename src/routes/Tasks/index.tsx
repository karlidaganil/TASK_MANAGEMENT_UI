import { Button, DatePicker, List } from "antd";
import TaskCard from "./components/TaskCard/TaskCard";
import "./style.scss";
import { FaPlus } from "react-icons/fa";

const { RangePicker } = DatePicker;

const data = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title: `Card Title ${i + 1}`,
  description: "This is a sample card description",
  status: 0,
  dueDate: new Date(),
}));

const Tasks = () => {
  return (
    <div>
      <div className="tasks-filters">
        <div className="tasks-filters-buttons">
          <Button type="primary" size="large">
            All
          </Button>
          <Button type="default" size="large">
            To Do
          </Button>
          <Button type="default" size="large">
            In Progress
          </Button>
          <Button type="default" size="large">
            Done
          </Button>
        </div>
        <RangePicker
          placeholder={["Due Date From", "Due Date To"]}
          style={{ width: "500px" }}
        />
        <Button type="primary" size="large">
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
