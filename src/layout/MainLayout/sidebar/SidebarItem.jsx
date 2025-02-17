import { Link } from "react-router";
import { useLocation } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import * as Icon from "react-icons/bi";

const external = /^(https?:\/\/|\/\/)/i;

export const isExternalLink = (link) => external.test(link);

const SidebarItem = (props) => {
  const {
    url,
    icon,
    title,
    isSubMenu,
    isBelowLg,
    setActiveGroup,
    setSidebarHidden,
  } = props;

  const MenuIcon = Icon[icon];

  const location = useLocation();

  const isActive = () => {
    const hasSquareBrackets =
      location.pathname.includes("[") && location.pathname.includes("]");

    if (location.pathname === url) {
      return true;
    } else if (location.pathname !== url && hasSquareBrackets) {
      const splitPath = location.pathname.split("/");
      splitPath.splice(splitPath.length - 1, 1);
      const splitItemUrl = url?.split("/");
      splitItemUrl?.splice(splitItemUrl.length - 1, 1);
      return splitPath?.every((i) => splitItemUrl?.includes(i));
    } else {
      false;
    }
  };

  const handleMenuItemClick = () => {
    if (isBelowLg) {
      setSidebarHidden(true);
    }
    if (!isSubMenu) {
      setActiveGroup([]);
    }
  };

  return (
    <ListItem disablePadding sx={{ pl: isSubMenu ? 2 : 0 }}>
      <ListItemButton
        href={url}
        disableRipple
        LinkComponent={Link}
        onClick={handleMenuItemClick}
        target={isExternalLink(url) ? "_blank" : undefined}
        sx={{
          ...(isSubMenu ? { pl: 0 } : {}),
          "&:hover": {
            bgcolor: "transparent",
            "& .MuiTypography-root, & .MuiListItemIcon-root ": {
              color: "primary.main",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 42,
            ...(isActive()
              ? {
                  color: "primary.main",
                }
              : {}),
          }}
        >
          {icon ? <MenuIcon size={20} /> : null}
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            sx: isActive() ? { color: "primary.main", fontWeight: 600 } : {},
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
