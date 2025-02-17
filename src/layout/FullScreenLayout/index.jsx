import Box from "@mui/material/Box";

const FullscreenLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FullscreenLayout;
