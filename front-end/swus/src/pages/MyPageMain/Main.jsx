import React from "react";
import { Box } from "@mui/system";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Outlet></Outlet>
    </>
  );
}

export default Main;
