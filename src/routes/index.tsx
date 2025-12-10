import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Tasks from "./Tasks";
import TaskDetail from "./TaskDetail";
import CreateNewTask from "./CreateNewTask";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Tasks />,
  },
  {
    path: "/task/:id",
    Component: () => <TaskDetail />,
  },
  {
    path: "/create-task",
    Component: () => <CreateNewTask />,
  },
  {
    path: "*",
    Component: () => <Navigate to="/" />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
