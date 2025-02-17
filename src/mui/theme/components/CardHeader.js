const styleCardHeader = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3),
      "& .MuiCardHeader-title": {
        fontSize: "1.25rem",
      },
    }),
  },
};

export default styleCardHeader;
