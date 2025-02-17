import { Route, Routes } from "react-router-dom";

import Login from "../views/Auth/Login";
import FullScreenLayout from "../layout/FullScreenLayout";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
];

const FullScreenRoutes = () => {
  return (
    <Routes element={<FullScreenLayout />}>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          index={route.index || false}
          element={route.element}
        />
      ))}
    </Routes>
  );
};

export default FullScreenRoutes;
