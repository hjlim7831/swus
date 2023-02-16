import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
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
    </Box>
  );
}
