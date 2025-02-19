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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DataTable from "react-data-table-component";
import { BiPlus } from "react-icons/bi";
import { createDriver } from "../../store/drivers";

const columns = [
  {
    name: "First Name",
    minWidth: "150px",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    minWidth: "150px",
    selector: (row) => row.lastName,
  },
  {
    name: "Email",
    minWidth: "200px",
    selector: (row) => row.email,
  },
  {
    name: "Contact",
    minWidth: "150px",
    selector: (row) => row.contact,
  },
  {
    minWidth: "120px",
    name: "Allotted Hub",
    selector: (row) => row.allottedHub,
  },
  {
    name: "License No",
    minWidth: "120px",
    selector: (row) => row.licenseNo,
  },
  {
    name: "Date of Joining",
    minWidth: "120px",
    selector: (row) => row.dateOfJoining,
  },
  {
    minWidth: "120px",
    name: "License Photo",
    cell: (row) => <img width={30} src={row.licensePhoto} alt="License" />,
  },
  {
    minWidth: "120px",
    name: "Driver Photo",
    cell: (row) => <img width={30} src={row.driverPhoto} alt="Driver" />,
  },
];

const Drivers = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { drivers } = useSelector((state) => state.drivers);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createDriver(data));
    setOpen(false);
    reset();
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
          Create Driver
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={drivers}
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
        <DialogTitle>Create New Driver</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ pt: 1 }}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <TextField
                    label="First Name"
                    fullWidth
                    {...field}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <TextField
                    label="Last Name"
                    fullWidth
                    {...field}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                rules={{ required: "Contact is required" }}
                render={({ field }) => (
                  <TextField
                    label="Contact"
                    fullWidth
                    {...field}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name="allottedHub"
                control={control}
                defaultValue=""
                rules={{ required: "Allotted Hub is required" }}
                render={({ field }) => (
                  <TextField
                    label="Allotted Hub"
                    fullWidth
                    {...field}
                    error={!!errors.allottedHub}
                    helperText={errors.allottedHub?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name="licenseNo"
                control={control}
                defaultValue=""
                rules={{ required: "License No is required" }}
                render={({ field }) => (
                  <TextField
                    label="License No"
                    fullWidth
                    {...field}
                    error={!!errors.licenseNo}
                    helperText={errors.licenseNo?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name="dateOfJoining"
                control={control}
                defaultValue=""
                rules={{ required: "Date of Joining is required" }}
                render={({ field }) => (
                  <TextField
                    label="Date of Joining"
                    type="date"
                    fullWidth
                    {...field}
                    error={!!errors.dateOfJoining}
                    helperText={errors.dateOfJoining?.message}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <InputLabel>License Photo</InputLabel>
              <Controller
                name="licensePhoto"
                control={control}
                defaultValue=""
                rules={{
                  required: "License Photo is required",
                  validate: (value) =>
                    value.startsWith("data:image/") ||
                    "Please upload a valid image.",
                }}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(field, e)}
                  />
                )}
              />
              {errors.licensePhoto && (
                <Typography
                  sx={{ mt: 1, ml: 2, fontSize: 12, color: "error.main" }}
                >
                  {errors.licensePhoto.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: 3 }}>
              <InputLabel>Driver Photo</InputLabel>
              <Controller
                name="driverPhoto"
                control={control}
                defaultValue=""
                rules={{
                  required: "Driver Photo is required",
                  validate: (value) =>
                    value.startsWith("data:image/") ||
                    "Please upload a valid image.",
                }}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(field, e)}
                  />
                )}
              />
              {errors.driverPhoto && (
                <Typography
                  sx={{ mt: 1, ml: 2, fontSize: 12, color: "error.main" }}
                >
                  {errors.driverPhoto.message}
                </Typography>
              )}
            </Box>
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

export default Drivers;
