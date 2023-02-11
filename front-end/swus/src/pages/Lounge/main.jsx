import React from "react";
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";

import NavBar from "../../components/NavBar/NavBar";
import Lounge from "./Lounge"
import Sidebar from "./SideBar"

export default function MiniDrawer() {
  return (
    <>
      <NavBar />
      <Sidebar />
      <Box sx={{ marginLeft: "10rem", width: "80vw", marginTop: "10rem" }}>
        <Lounge />
      </Box>
    </>
  );
}
