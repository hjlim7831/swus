import React from "react";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { indigo } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import logo from "./../../logo.png";

const drawerWidth = 240;
// const mainItems = ["Login"];
const token = sessionStorage.getItem("token");
const navItems = token
  ? [
      { name: "Study Room", path: "/studyroom" },
      { name: "Group", path: "/group/mystudy/:userId" },
      { name: "Lounge", path: "/lounge" },
      { name: "Mypage", path: "/mypage/profile/:userId" },
      { name: "Logout", path: "/" },
    ]
  : [{ name: "Login", path: "/account/login" }];

function DrawerAppBar(props) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logout = () => {
    sessionStorage.clear();
  };

  const drawer = (
    // 햄거버 -> side 바
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#1A1E33", height: "100vh" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <img
          src={logo}
          width="65px"
          heigth="58px"
          alt="react"
          onClick={() => navigate("/")}
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center", color: "white" }}
              onClick={() => {
                if (item.name === "Logout") {
                  logout();
                }
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: "#1A1E33" }}>
        <Toolbar>
          {/* 햄버거 버튼 */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
            <img
              src={logo}
              width="65px"
              heigth="58px"
              alt="react"
              onClick={() => navigate("/")}
            />
          </IconButton>

          {/* 메인페이지 */}
          <Typography
            // variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src={logo}
              width="65px"
              heigth="58px"
              alt="react"
              onClick={() => navigate("/")}
            />
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => {
                  if (item.name === "Logout") {
                    logout();
                  }
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
