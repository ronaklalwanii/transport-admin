import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DataTable from "react-data-table-component";
import { BiPlus } from "react-icons/bi";

import { createTrip } from "../../../store/trips";
import { useEffect } from "react";

const columns = [
  {
    name: "Trip Number",
    minWidth: "150px",
    selector: (row) => row.tripNumber || "-",
  },
  {
    name: "Truck Number",
    minWidth: "150px",
    selector: (row) => row.truckNumber || "-",
  },
  {
    name: "Driver Name",
    minWidth: "150px",
    selector: (row) => row.assignedDriver || "-",
  },
  {
    name: "Trip Start",
    minWidth: "150px",
    selector: (row) => row.tripStart || "-",
  },
  {
    name: "Trip End",
    minWidth: "150px",
    selector: (row) => row.tripEnd || "-",
  },
  {
    name: "Weight Loaded (kgs)",
    minWidth: "150px",
    selector: (row) => row.weightLoaded || "-",
  },
  {
    name: "Weight Offloaded (kgs)",
    minWidth: "160px",
    selector: (row) => row.weightOffloaded || "-",
  },
  {
    name: "Driver Advance",
    minWidth: "150px",
    selector: (row) => row.driverAdvance || "-",
  },
  {
    name: "Driver Allowance",
    minWidth: "150px",
    selector: (row) => row.driverAllowance || "-",
  },
  {
    name: "Trip Expense",
    minWidth: "150px",
    selector: (row) => row.tripExpense || "-",
  },
];

const AdminTrips = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { trips } = useSelector((state) => state.trips);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    const tripData = {
      ...data,
      truckNumber: "-",
      tripStart: "-",
      tripEnd: "-",
      weightLoaded: "-",
      weightOffloaded: "-",
      tripExpense: "-",
    };

    dispatch(createTrip(tripData));
    setOpen(false);
    reset();
  };

  useEffect(() => {
    if (open === false) {
      reset();
    }
  }, [open, reset]);

  return (
    <div>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<BiPlus />}
        >
          Create Trip
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={trips}
        pagination
        highlightOnHover
        striped
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create New Trip</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ pt: 2 }}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="tripNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Trip Number is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Trip Number"
                      fullWidth
                      {...field}
                      error={!!errors.tripNumber}
                      helperText={errors.tripNumber?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="driverAdvance"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Driver Advance is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Driver Advance"
                      fullWidth
                      type="number"
                      {...field}
                      error={!!errors.driverAdvance}
                      helperText={errors.driverAdvance?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="driverAllowance"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Driver Allowance is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Driver Allowance"
                      fullWidth
                      type="number"
                      {...field}
                      error={!!errors.driverAllowance}
                      helperText={errors.driverAllowance?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="dieselRate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Diesel Rate is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Diesel Rate"
                      fullWidth
                      type="number"
                      {...field}
                      error={!!errors.dieselRate}
                      helperText={errors.dieselRate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="adbluRate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "ADBLU Rate is required" }}
                  render={({ field }) => (
                    <TextField
                      label="ADBLU Rate"
                      fullWidth
                      type="number"
                      {...field}
                      error={!!errors.adbluRate}
                      helperText={errors.adbluRate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.assignedDriver}>
                  <InputLabel>Assign Driver</InputLabel>
                  <Controller
                    name="assignedDriver"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Assign Driver is required" }}
                    render={({ field }) => (
                      <Select label="Assign Driver" {...field}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Manish Bachani">
                          Manish Bachani
                        </MenuItem>
                        <MenuItem value="Nilesh Sukhwani">
                          Nilesh Sukhwani
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.assignedDriver && (
                  <Typography
                    sx={{ mt: 1, ml: 2, fontSize: 12, color: "error.main" }}
                  >
                    {errors.assignedDriver.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminTrips;
