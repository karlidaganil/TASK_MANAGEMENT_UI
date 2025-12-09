import { Button, DatePicker, List } from "antd";
import TaskCard from "./components/TaskCard/TaskCard";
import "./style.scss";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetTasks from "../../hooks/useGetTasks";
import type { Filters } from "../../types";

const { RangePicker } = DatePicker;

const Tasks = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    status: null,
    dueDateFrom: null,
    dueDateTo: null,
  });

  const { data } = useGetTasks(filters);

  const tasks = data?.payload;
  console.log(data);

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
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/create-task")}
        >
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
        dataSource={tasks}
        pagination={{
          pageSize: data?.pageSize,
          total: data?.totalCount,
          current: data?.pageNumber,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            setFilters((prev) => ({
              ...prev,
              pageNumber: page,
              pageSize: pageSize,
            }));
          },
          onShowSizeChange: (_, size) => {
            setFilters((prev) => ({
              ...prev,
              pageNumber: 1,
              pageSize: size,
            }));
          },
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
      <span></span>
      <div>Page: {data?.pageNumber}</div>
      <div>Page Size: {data?.pageSize}</div>
      <div>Total Pages: {data?.totalPages}</div>
      <div>Total Count: {data?.totalCount}</div>
      <div>Has Previous Page: {data?.hasPreviousPage ? "Yes" : "No"}</div>
      <div>Has Next Page: {data?.hasNextPage ? "Yes" : "No"}</div>
    </div>
  );
};

export default Tasks;
