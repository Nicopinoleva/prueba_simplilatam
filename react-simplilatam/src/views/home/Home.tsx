import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
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
)(() => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    width: 240,
  },
}));

const defaultTheme = createTheme();

export const Home = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  return (
    <ThemeProvider theme={defaultTheme}>
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
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Empresas" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveScreen(1)}>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Empleados" />
            </ListItemButton>
          </List>
        </SideBarMenu>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Stack sx={{ mt: 4, mb: 4 }}>
            {activeScreen === 0 && <Companies />}
            {activeScreen === 1 && <Employees />}
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
