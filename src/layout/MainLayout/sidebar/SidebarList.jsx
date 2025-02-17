import { useSelector } from "react-redux";

import List from "@mui/material/List";

import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";
import SidebarSection from "./SidebarSection";

import { navigation } from "@/configurations/navigation";

const SidebarList = (props) => {
  const { userData } = useSelector((state) => state.auth);
  const recursiveSidebarItems = (arr) => {
    return arr.map((item, index) => {
      return item.section ? (
        <SidebarSection {...props} {...item} key={index} />
      ) : item.children ? (
        <SidebarGroup {...props} menuItem={item} key={index} />
      ) : (
        <SidebarItem {...props} {...item} key={index} />
      );
    });
  };
  return (
    <List component="nav" disablePadding sx={{ py: 3 }}>
      {recursiveSidebarItems(navigation[userData.email])}
    </List>
  );
};

export default SidebarList;
