import React from "react";
import { Box } from "@mui/system";
import NavBar from "../../components/NavBar/NavBar";
// import SideBar from "./SideBar";
import SideNavBar from "../MyPageProfile/SideNavBar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <NavBar />
      <SideNavBar />
      <Outlet></Outlet>
    </>
  );
}

export default Main;
