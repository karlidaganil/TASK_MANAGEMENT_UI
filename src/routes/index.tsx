import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Tasks from "./Tasks";
import TaskDetail from "./TaskDetail";

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
    path: "*",
    Component: () => <Navigate to="/" />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
