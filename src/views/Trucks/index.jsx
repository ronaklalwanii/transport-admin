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
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DataTable from "react-data-table-component";
import { BiPlus } from "react-icons/bi";

import { createTruck } from "../../store/trucks";
import { useEffect } from "react";

const columns = [
  {
    name: "Truck ID",
    minWidth: "150px",
    selector: (row) => row.truckId || "-",
  },
  {
    name: "Truck Model",
    minWidth: "150px",
    selector: (row) => row.truckModel || "-",
  },
  {
    name: "License Plate",
    minWidth: "150px",
    selector: (row) => row.licensePlate || "-",
  },
  {
    name: "Driver Assigned",
    minWidth: "150px",
    selector: (row) => row.driverAssigned || "-",
  },
  {
    name: "Odometer Reading",
    minWidth: "150px",
    selector: (row) => row.odometerReading || "-",
  },
];

const Trucks = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { trucks } = useSelector((state) => state.trucks);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    const truckData = {
      ...data,
    };

    dispatch(createTruck(truckData));
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
          Add Truck
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={trucks}
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
        <DialogTitle>Add New Truck</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ pt: 2 }}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="truckId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Truck ID is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Truck ID"
                      fullWidth
                      {...field}
                      error={!!errors.truckId}
                      helperText={errors.truckId?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="truckModel"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Truck Model is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Truck Model"
                      fullWidth
                      {...field}
                      error={!!errors.truckModel}
                      helperText={errors.truckModel?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="licensePlate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "License Plate is required" }}
                  render={({ field }) => (
                    <TextField
                      label="License Plate"
                      fullWidth
                      {...field}
                      error={!!errors.licensePlate}
                      helperText={errors.licensePlate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="driverAssigned"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Driver Assigned is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Driver Assigned"
                      fullWidth
                      {...field}
                      error={!!errors.driverAssigned}
                      helperText={errors.driverAssigned?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="odometerReading"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Odometer Reading is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Odometer Reading"
                      fullWidth
                      type="number"
                      {...field}
                      error={!!errors.odometerReading}
                      helperText={errors.odometerReading?.message}
                    />
                  )}
                />
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

export default Trucks;
