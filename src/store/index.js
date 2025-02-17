import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import theme from "./theme";
import drivers from "./drivers";
import dashboard from "./dashboard";

const store = configureStore({
  reducer: {
    auth,
    theme,
    drivers,
    dashboard,
  },
});

export const storeState = store.getState();

export default store;
