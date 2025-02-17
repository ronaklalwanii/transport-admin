const styleTextField = {
  styleOverrides: {
    root: ({ theme }) => ({
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      },
    }),
  },
};

export default styleTextField;
