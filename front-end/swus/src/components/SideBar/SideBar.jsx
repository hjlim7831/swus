import * as React from "react";
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export default function MiniDrawer() {
  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#1A1E33", height: "100vh" }}
      boxSizing={openedMixin}
    >
      <CssBaseline />
      <Divider />

      <Box fullWidth sx={{ mt: 11, mx: 4, justifyContent: "center" }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#DEDCEE",
            width: "170px",
            height: "50px",
            color: "#1A1E33",
            fontSize: "20px",
          }}
        >
          LOUNGE
        </Button>
      </Box>

      {/* <List sx={{ mt:8 }}>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                  color: 'white',
                }}
              >
                { text }
                <ListItemText primary={text} sx={{ opacity: 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
    </Box>
  );
}
