import React from "react";
import { Box } from "@mui/system";
import TopNavBar from "../MyPageProfile/TopNavBar";
import SideNavBar from "../MyPageProfile/SideNavBar";

function MyPageMain() {
  return (
    <>
      <Box>
        <TopNavBar />
      </Box>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <SideNavBar />
      </Box>
    </>
  );
}

export default MyPageMain;
