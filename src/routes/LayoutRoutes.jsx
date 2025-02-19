import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Trucks from "../views/Trucks";
import Drivers from "../views/Drivers";
import Reports from "../views/Reports";
import Dashboard from "../views/Dashboard";
import Trips from "../views/Trips/DriverTrip";
import AdminTrips from "../views/Trips/AdminTrip";

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
  {
    path: "/admin-trips",
    element: <AdminTrips />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/trucks",
    element: <Trucks />,
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
