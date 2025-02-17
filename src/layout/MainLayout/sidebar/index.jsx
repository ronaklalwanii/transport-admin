import { useState } from "react";
import { Link } from "react-router";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { BiX } from "react-icons/bi";

import SidebarList from "./SidebarList";

import templateConfigurations from "@/configurations/template";

const { foldedSidebarWidth, sidebarWidth } = templateConfigurations;

const LayoutSidebar = (props) => {
  const { isBelowLg, sidebarFolded, sidebarHidden, setSidebarHidden } = props;

  const [activeGroup, setActiveGroup] = useState([]);

  return (
    <Drawer
      anchor="left"
      onClose={() => setSidebarHidden(!sidebarHidden)}
      open={isBelowLg ? !sidebarHidden : true}
      variant={isBelowLg ? "temporary" : "permanent"}
      sx={{
        width: sidebarFolded ? foldedSidebarWidth : sidebarWidth,
        "& .MuiDrawer-paper": {
          overflowX: "hidden",
          transition: "width .25s ease-in-out",
          width: sidebarFolded ? foldedSidebarWidth : sidebarWidth,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 1,
            "&:hover": {
              background: (theme) => theme.palette.secondary.light,
            },
          },
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          gap: 1,
          minHeight: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
          <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
            <Box sx={{ mt: 1, ml: -1 }}>{templateConfigurations.logo}</Box>
            {!sidebarFolded ? (
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                {templateConfigurations.companyName}
              </Typography>
            ) : null}
          </Box>
        </Link>
        {isBelowLg ? (
          <IconButton
            disableRipple
            color="inherit"
            onClick={() => setSidebarHidden(!sidebarHidden)}
          >
            <BiX />
          </IconButton>
        ) : null}
      </Box>

      <SidebarList
        isBelowLg={isBelowLg}
        activeGroup={activeGroup}
        sidebarFolded={sidebarFolded}
        setActiveGroup={setActiveGroup}
        setSidebarHidden={setSidebarHidden}
      />
    </Drawer>
  );
};

export default LayoutSidebar;
