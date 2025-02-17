import { Route, Routes } from "react-router-dom";
import App from "../App";
import MainLayout from "../layout/MainLayout";

const routes = [
  {
    index: true,
    path: "/",
    element: <App />,
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
