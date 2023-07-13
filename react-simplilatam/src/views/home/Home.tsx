import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BadgeIcon from "@mui/icons-material/Badge";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Companies } from "../companies/Companies";
import { Employees } from "../employees/Employees";
import { useState } from "react";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const SideBarMenu = styled(
  MuiDrawer,
  {}
)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 240,
    },
  },
}));

export const Home = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Tu Empleado Perfecto
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBarMenu variant="permanent">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        />
        <Divider />
        <List component="nav">
          <ListItemButton onClick={() => setActiveScreen(0)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={() => setActiveScreen(1)}>
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Mis empresas" />
          </ListItemButton>
          <ListItemButton onClick={() => setActiveScreen(2)}>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Mis empleados" />
          </ListItemButton>
        </List>
      </SideBarMenu>
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Stack sx={{ mt: 10, ml: 40}}>
          {activeScreen === 0 && <Typography fontSize={30} align='center'> ¡Bienvenido! </Typography>}
          {activeScreen === 1 && <Companies />}
          {activeScreen === 2 && <Employees />}
        </Stack>
      </Box>
    </Box>
  );
};
