import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trucks: [],
};

const TrucksSlice = createSlice({
  name: "Trucks",
  initialState,
  reducers: {
    createTruck: (state, action) => {
      state.trucks.push({ id: state.trucks.length + 1, ...action.payload });
    },
  },
});

export const { createTruck } = TrucksSlice.actions;

export default TrucksSlice.reducer;
