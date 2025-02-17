const styleAvatar = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiAvatar-img": {
        objectFit: "contain",
      },

      "& svg": {
        color: theme.palette.common.white,
      },
    }),
  },
};

export default styleAvatar;
