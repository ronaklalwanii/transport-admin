import { createTheme } from "@mui/material/styles";

import Tab from "./components/Tab";
import Menu from "./components/Menu";
import Avatar from "./components/Avatar";
import Button from "./components/Button";
import Divider from "./components/Divider";
import Progress from "./components/Progress";
import Textfield from "./components/Textfield";
import Accordion from "./components/Accordion";
import CardHeader from "./components/CardHeader";
import CardContent from "./components/CardContent";

import themeDark from "./themes/theme-dark";
import themeLight from "./themes/theme-light";

import shadowsLight from "./shadows/shadows-light";
import shadowsDark from "./shadows/shadows-dark";

const values = {
  dark: themeDark,
  light: themeLight,
};

const theme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      ...values[mode]().palette,
    },
    typography: {
      ...values[mode]().typography,
    },
    shadows: mode === "light" ? shadowsLight : shadowsDark,
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiTab: Tab,
      MuiMenu: Menu,
      MuiAvatar: Avatar,
      MuiButton: Button,
      MuiDivider: Divider,
      MuiInputBase: Textfield,
      MuiAccordion: Accordion,
      MuiCardHeader: CardHeader,
      MuiLinearProgress: Progress,
      MuiCardContent: CardContent,
    },
  });
};

export default theme;
