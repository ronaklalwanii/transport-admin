import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { BiMenu, BiChevronsLeft } from "react-icons/bi";

import templateConfigurations from "@/configurations/template";
import { logoutUser } from "@/store/auth";

const { foldedSidebarWidth, sidebarWidth } = templateConfigurations;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: foldedSidebarWidth,
  width: `calc(100% - ${foldedSidebarWidth}px)`,
  ...(!open && {
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: `${sidebarWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    marginLeft: 0,
  },
}));

const LayoutNavbar = (props) => {
  const {
    isBelowLg,
    sidebarHidden,
    sidebarFolded,
    setSidebarFolded,
    setSidebarHidden,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderToggleIcon = () => {
    if (isBelowLg) {
      return <BiMenu />;
    } else {
      return (
        <Box
          size={32}
          component={BiChevronsLeft}
          sx={{
            transition: "all .25s ease-in-out",
            transform: `rotate(${sidebarFolded ? 180 : 0}deg)`,
          }}
        />
      );
    }
  };

  const handleToggleButtonClick = () => {
    if (isBelowLg) {
      setSidebarHidden(!sidebarHidden);
    } else {
      setSidebarFolded(!sidebarFolded);
    }
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <StyledAppBar
      elevation={0}
      color="inherit"
      position="fixed"
      open={sidebarFolded}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
          <IconButton disableRipple onClick={handleToggleButtonClick}>
            {renderToggleIcon()}
          </IconButton>
        </Box>
        <Box sx={{ gap: 1, display: "flex", alignItems: "center" }}>
          <Avatar
            onClick={handleClick}
            sx={{ ml: 1, cursor: "pointer", height: 32, width: 32 }}
            alt={"user-avatar"}
            src={"/images/avatars/avatar-1.png"}
          />
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                mt: 2,
                ml: 2,
                minWidth: 150,
              },
            }}
          >
            <MenuItem disabled sx={{ py: 0 }}>
              <Typography>Admin</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default LayoutNavbar;
