import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Drivers from "../views/Drivers";
import Dashboard from "../views/Dashboard";
import Trips from "../views/Trips";

const routes = [
  {
    index: true,
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/drivers",
    element: <Drivers />,
  },
  {
    path: "/trips",
    element: <Trips />,
  },
];

const LayoutRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          index={route.index || false}
          element={<MainLayout>{route.element}</MainLayout>}
        />
      ))}
    </Routes>
  );
};

export default LayoutRoutes;
