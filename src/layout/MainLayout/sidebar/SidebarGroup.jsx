import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import SidebarItem from "./SidebarItem";

import * as Icon from "react-icons/bi";

const checkForActiveURL = (currentURL, obj) => {
  const activeIds = [];
  const hasSquareBrackets =
    currentURL.includes("[") && currentURL.includes("]");
  obj.children.map((child) => {
    if (child.children) {
      return checkForActiveURL(currentURL, child);
    } else {
      if (child.url === currentURL) {
        activeIds.push(obj.id, child.id);
      } else if (currentURL !== child.url && hasSquareBrackets) {
        const splitPath = currentURL.split("/");
        splitPath.splice(splitPath.length - 1, 1);
        const splitItemUrl = child.url?.split("/");
        splitItemUrl?.splice(splitItemUrl.length - 1, 1);
        splitPath?.every((i) => splitItemUrl?.includes(i))
          ? activeIds.push(obj.id, child.id)
          : null;
      } else {
        return false;
      }
    }
  });

  return activeIds;
};

const SidebarGroup = (props) => {
  const {
    isSubMenu,
    menuItem,
    activeGroup,
    setActiveGroup,
    sidebarFolded,
    isBelowLg,
    setSidebarHidden,
  } = props;
  const location = useLocation();

  const MenuIcon = Icon[menuItem.icon] || null;

  const handleGroupChange = (id) => {
    // setExpand(!expanded);
    const arr = activeGroup || [];

    if (arr?.includes(id)) {
      arr?.splice(arr.indexOf(id), 1);
    } else {
      arr?.push(id);
    }

    setActiveGroup([...arr]);
  };

  useEffect(() => {
    if (sidebarFolded) {
      if (checkForActiveURL(location, menuItem).length) {
        setActiveGroup([menuItem.id]);
      }
    }
  }, [sidebarFolded]); // eslint-disable-line

  // router.events.on("routeChangeCompleted", () => {
  //   setActiveGroup([...checkForActiveURL(location, menuItem)]);
  // });
  useEffect(() => {
    if (checkForActiveURL(location, menuItem).length) {
      setActiveGroup([...checkForActiveURL(location, menuItem)]);
    }
  }, [location.pathname]); // eslint-disable-line

  return (
    <>
      <ListItemButton
        disableRipple
        // selected={
        //   activeGroup?.includes(menuItem.id) ||
        //   checkForActiveURL(location, menuItem).length
        // }
        onClick={() => handleGroupChange(menuItem.id)}
        sx={{
          pl: isSubMenu ? 7.25 : 2,
          // "&:not(:last-child)": {
          //   marginTop: isSubMenu ? -1 : 1.5,
          // },
          "& .toggle-icon": {
            transition: "transform .2s ease",
            transform: activeGroup?.includes(menuItem.id)
              ? "rotate(90deg)"
              : undefined,
          },
          "&:hover": {
            backgroundColor: "transparent",
            "& svg, & .MuiTypography-root": {
              color: "primary.main",
            },
          },
          ...(activeGroup?.includes(menuItem.id) ||
          checkForActiveURL(location, menuItem).length
            ? {
                "& svg": {
                  color: "primary.main",
                },
              }
            : {}),
        }}
      >
        {MenuIcon ? (
          <ListItemIcon
            sx={{
              minWidth: 42,
            }}
          >
            <MenuIcon size={20} />
          </ListItemIcon>
        ) : null}
        <ListItemText
          primary={menuItem.title}
          primaryTypographyProps={{
            sx: {
              ...(activeGroup?.includes(menuItem.id) ||
              checkForActiveURL(location, menuItem).length
                ? { color: "primary.main" }
                : {}),
            },
          }}
        />
        <Icon.BiChevronRight size={20} className="toggle-icon" />
      </ListItemButton>
      <Collapse
        in={activeGroup?.includes(menuItem.id) && !sidebarFolded}
        timeout="auto"
      >
        <List sx={{ pt: 0 }}>
          {menuItem.children.map((child) => {
            if (child.children) {
              return (
                <SidebarGroup
                  key={child.id}
                  menuItem={child}
                  isSubMenu={true}
                  activeGroup={activeGroup}
                  setActiveGroup={setActiveGroup}
                />
              );
            } else {
              return (
                <SidebarItem
                  {...child}
                  key={child.id}
                  isSubMenu={true}
                  isBelowLg={isBelowLg}
                  setSidebarHidden={setSidebarHidden}
                />
              );
            }
          })}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarGroup;
