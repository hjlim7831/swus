import { Box } from "@mui/material";
import React from "react";
import MyGroupList from "./MyGroupList";
import MyInfo from "./MyInfo";
import SideNavBar from "./SideNavBar";
import TopNavBar from "./TopNavBar";

function MyProfileMain() {
  return (
    <>
      <Box
        sx={{
          top: -200, //이거 하.. 왜 이렇게 해줘야되는지 몰겠다.. ㅜ
          position: "relative",
          display: "inline-block",
        }}
      >
        <MyInfo />
      </Box>
      <Box sx={{ position: "relative", display: "inline-block", top: 69, left: 10 }}>
        <MyGroupList />
      </Box>
    </>
  );
}

export default MyProfileMain;
