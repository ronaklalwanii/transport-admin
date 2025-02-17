import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import LayoutRoutes from "./routes/LayoutRoutes.jsx";
import FullScreenRoutes from "./routes/FullScreenRoutes.jsx";

import store from "./store/index.js";
import ThemeWrapper from "./mui/theme";
import "./main.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <BrowserRouter>
          <LayoutRoutes />
          <FullScreenRoutes />
        </BrowserRouter>
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
