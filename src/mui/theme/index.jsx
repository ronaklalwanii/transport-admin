import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { useSelector } from "react-redux";

import theme from "./theme";

const ThemeWrapper = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
