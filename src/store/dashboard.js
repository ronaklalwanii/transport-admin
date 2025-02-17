import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDrivers: [
    {
      id: 1,
      name: "Manish Bachani",
      status: "On Duty",
      truckNumber: "MH12AB1234",
      destination: "Mumbai",
    },
    {
      id: 2,
      name: "Nilesh Sukhwani",
      status: "Available",
      truckNumber: "DL10CD5678",
      destination: "Delhi",
    },
  ],
  activeTrucks: [
    {
      id: 1,
      model: "Tata Prima",
      status: "In Transit",
      truckNumber: "MH12AB1234",
      capacity: "20 tons",
      location: "Pune",
    },
    {
      id: 2,
      model: "Ashok Leyland",
      status: "Idle",
      truckNumber: "DL10CD5678",
      capacity: "18 tons",
      location: "Jaipur",
    },
  ],
  reports: [],
  tripsHistory: [
    { id: 1, startingPoint: "Pune", destination: "Mumbai", date: "2024-02-01" },
    {
      id: 2,
      startingPoint: "Jaipur",
      destination: "Delhi",
      date: "2024-02-05",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
