import { createSlice } from "@reduxjs/toolkit";

import templateConfigurations from "@/configurations/template";

const initialState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : templateConfigurations.mode,
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const { updateMode } = themeSlice.actions;

export default themeSlice.reducer;
