import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  "Trip Info",
  "Loading Station",
  "Destination",
  "Return",
  "Expenses",
  "Trip End",
];

const defaultValues = {
  truck: "",
  odometerStart: "",
  loadingDate: null,
  weightLoaded: "",
  destinationDate: null,
  weightOffloaded: "",
  returnDate: null,
  fuelLitres: "",
  fuelAmount: "",
  repairCost: "",
  tollTax: "",
  miscellaneous: "",
  totalExpenses: "",
  odometerEnd: "",
};

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { control, handleSubmit, watch, setValue } = useForm({ defaultValues });
  const fuelLitres = watch("fuelLitres");
  const repairCost = watch("repairCost") || 0;
  const tollTax = watch("tollTax") || 0;
  const miscellaneous = watch("miscellaneous") || 0;

  React.useEffect(() => {
    if (fuelLitres) {
      setValue("fuelAmount", fuelLitres * 100);
    }
    const total =
      (fuelLitres * 100 || 0) +
      parseFloat(repairCost) +
      parseFloat(tollTax) +
      parseFloat(miscellaneous);
    setValue("totalExpenses", total);
  }, [fuelLitres, repairCost, tollTax, miscellaneous, setValue]);

  const onSubmit = (data) => console.log(data);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 2,
        "& .MuiStepLabel-root": {
          cursor: "pointer",
        },
        "& .react-datepicker-wrapper": {
          width: "100%",
        },
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 4,
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} onClick={() => setActiveStep(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <>
            <Controller
              name="truck"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Select Truck"
                  fullWidth
                  margin="normal"
                  {...field}
                >
                  <MenuItem value="Truck 1">Truck 1</MenuItem>
                  <MenuItem value="Truck 2">Truck 2</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="odometerStart"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Odometer Reading"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
          </>
        )}

        {activeStep === 1 && (
          <>
            <Controller
              name="loadingDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={
                    <TextField fullWidth margin="normal" label="Loading Date" />
                  }
                />
              )}
            />
            <Controller
              name="weightLoaded"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Weight Loaded (kgs)"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
          </>
        )}

        {activeStep === 2 && (
          <>
            <Controller
              name="destinationDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Destination Date"
                    />
                  }
                />
              )}
            />
            <Controller
              name="weightOffloaded"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Weight Offloaded (kgs)"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
          </>
        )}

        {activeStep === 3 && (
          <>
            <Controller
              name="returnDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={
                    <TextField fullWidth margin="normal" label="Return Date" />
                  }
                />
              )}
            />
          </>
        )}

        {activeStep === 4 && (
          <>
            <Controller
              name="fuelLitres"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Fuel Litres"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
            <TextField
              label="Fuel Amount"
              type="number"
              fullWidth
              margin="normal"
              value={watch("fuelAmount")}
              disabled
            />
            <Controller
              name="repairCost"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Repair Cost"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
            <Controller
              name="tollTax"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Toll Tax"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
            <Controller
              name="miscellaneous"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Miscellaneous"
                  type="text"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
            <TextField
              label="Total Expenses"
              type="number"
              fullWidth
              margin="normal"
              value={watch("totalExpenses")}
              disabled
            />
          </>
        )}

        {activeStep === 5 && (
          <>
            <Controller
              name="odometerEnd"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Odometer Reading"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                />
              )}
            />
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StepForm;
