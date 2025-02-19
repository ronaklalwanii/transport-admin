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

import { createReport } from "../../store/reports"; // Assume you have a reports slice
import { useEffect } from "react";

const columns = [
  {
    name: "Report ID",
    minWidth: "150px",
    selector: (row) => row.reportId || "-",
  },
  {
    name: "Report Date",
    minWidth: "150px",
    selector: (row) => row.reportDate || "-",
  },
  {
    name: "Reporter Name",
    minWidth: "150px",
    selector: (row) => row.reporterName || "-",
  },
  {
    name: "Description",
    minWidth: "250px",
    selector: (row) => row.description || "-",
  },
];

const AdminReports = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.reports);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    const reportData = {
      ...data,
    };

    dispatch(createReport(reportData));
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
          Create Report
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={reports}
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
        <DialogTitle>Create New Report</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ pt: 2 }}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="reportId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Report ID is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Report ID"
                      fullWidth
                      {...field}
                      error={!!errors.reportId}
                      helperText={errors.reportId?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="reportDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Report Date is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Report Date"
                      fullWidth
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.reportDate}
                      helperText={errors.reportDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="reporterName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Reporter Name is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Reporter Name"
                      fullWidth
                      {...field}
                      error={!!errors.reporterName}
                      helperText={errors.reporterName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      {...field}
                      error={!!errors.description}
                      helperText={errors.description?.message}
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

export default AdminReports;
