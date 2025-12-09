import { List } from "antd";
import TaskCard from "./components/TaskCard/TaskCard";

const data = Array.from({ length: 30 }).map((_, i) => ({
  title: `Card Title ${i + 1}`,
  description: "This is a sample card description",
  status: 0,
  dueDate: new Date(),
}));

const Tasks = () => {
  return (
    <>
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
          pageSize: 2,
        }}
        renderItem={(item) => (
          <List.Item>
            <TaskCard
              title={item.title}
              description={item.description}
              status={item.status}
              dueDate={item.dueDate}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Tasks;
