import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import trips from "./trips";
import theme from "./theme";
import trucks from "./trucks";
import drivers from "./drivers";
import reports from "./reports";
import dashboard from "./dashboard";

const store = configureStore({
  reducer: {
    auth,
    theme,
    trips,
    trucks,
    drivers,
    reports,
    dashboard,
  },
});

export const storeState = store.getState();

export default store;
