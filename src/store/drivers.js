import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drivers: [
    {
      id: 1,
      firstName: "Ravi",
      lastName: "Sharma",
      email: "ravi.sharma@example.com",
      contact: "+91 9876543210",
      allottedHub: "Mumbai",
      licenseNo: "MH12AB1234",
      dateOfJoining: "2021-06-15",
      licensePhoto: "/images/avatars/avatar-1.png",
      driverPhoto: "/images/avatars/avatar-1.png",
    },
    {
      id: 2,
      firstName: "Amit",
      lastName: "Singh",
      email: "amit.singh@example.com",
      contact: "+91 9876543222",
      allottedHub: "Delhi",
      licenseNo: "DL08CD5678",
      dateOfJoining: "2022-02-20",
      licensePhoto: "/images/avatars/avatar-2.png",
      driverPhoto: "/images/avatars/avatar-2.png",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    createDriver: (state, action) => {
      state.drivers.push({ id: state.drivers.length + 1, ...action.payload });
    },
  },
});

export const { createDriver } = dashboardSlice.actions;

export default dashboardSlice.reducer;
