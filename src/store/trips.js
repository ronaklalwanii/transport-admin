import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: [],
};

const TripsSlice = createSlice({
  name: "Trips",
  initialState,
  reducers: {
    createTrip: (state, action) => {
      state.trips.push({ id: state.trips.length + 1, ...action.payload });
    },
  },
});

export const { createTrip } = TripsSlice.actions;

export default TripsSlice.reducer;
