import React from "react";
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TodoJandi from "../MyPageReport/TodoJandi";

import NavBar from "../../components/NavBar/NavBar";
import Lounge from "./Lounge"
import Sidebar from "./SideBar"
import { Outlet } from "react-router";

export default function LoungeMain() {
  return (
    <>
      <NavBar />
      <Sidebar />
      <Box>
        <Outlet></Outlet>
      </Box>
    </>
  );
}
