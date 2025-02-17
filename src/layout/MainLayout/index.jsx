import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

import templateConfigurations from "@/configurations/template";

const { sidebarWidth, foldedSidebarWidth } = templateConfigurations;

const Main = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    minHeight: "100vh",
    padding: theme.spacing(6),
    background: theme.palette.background.default,
    transition: "all .25s ease-in-out",
    paddingTop: theme.spacing(14),
    marginLeft: foldedSidebarWidth,
    width: `calc(100% - ${foldedSidebarWidth}px)`,
    ...(!open && {
      width: `calc(100% - ${sidebarWidth}px)`,
      marginLeft: `${sidebarWidth}px`,
    }),

    [theme.breakpoints.down("lg")]: {
      width: "100%",
      marginLeft: 0,
      padding: theme.spacing(14, 3),
    },
  })
);

const MainLayout = ({ children }) => {
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [sidebarFolded, setSidebarFolded] = useState(false);

  const { breakpoints } = useTheme();
  const isBelowLg = useMediaQuery(breakpoints.down("lg"));

  useEffect(() => {
    if (isBelowLg) {
      setSidebarFolded(false);
      setSidebarHidden(true);
    } else {
      setSidebarFolded(false);
      setSidebarHidden(false);
    }
  }, [isBelowLg]); // eslint-disable-line

  return (
    <div>
      <Navbar
        isBelowLg={isBelowLg}
        sidebarHidden={sidebarHidden}
        sidebarFolded={sidebarFolded}
        setSidebarFolded={setSidebarFolded}
        setSidebarHidden={setSidebarHidden}
      />
      <Sidebar
        isBelowLg={isBelowLg}
        sidebarHidden={sidebarHidden}
        sidebarFolded={sidebarFolded}
        setSidebarHidden={setSidebarHidden}
      />
      <Main open={sidebarFolded}>{children}</Main>
    </div>
  );
};

export default MainLayout;
