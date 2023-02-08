import React from "react";
import { Box } from "@mui/system";
import NavBar from "../../components/NavBar/NavBar";
// import SideBar from "./SideBar";
// import SideNavBar from "../MyPageProfile/SideNavBar";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Main() {
  return (
    <>
      <NavBar />
      {/* <SideNavBar /> */}
      <SideBar></SideBar>
      <Outlet></Outlet>
    </>
  );
}

export default Main;
