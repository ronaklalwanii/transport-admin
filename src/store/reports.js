import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: [],
};

const ReportsSlice = createSlice({
  name: "Reports",
  initialState,
  reducers: {
    createReport: (state, action) => {
      state.reports.push({ id: state.reports.length + 1, ...action.payload });
    },
  },
});

export const { createReport } = ReportsSlice.actions;

export default ReportsSlice.reducer;
