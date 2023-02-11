import { React, useEffect, useState } from "react";
import { Box } from "@mui/system";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Main() {
  const [condition, setCondition] = useState({
    type: window.location.pathname.slice(7, 12),
    userId: 3,
  });

  useEffect(() => {
    setCondition({
      ...condition,
      ["type"]: window.location.pathname.slice(7, 12),
    });
  }, []);

  return (
    <>
      <Box sx={{  background: 'linear-gradient(to left, #DEDCEE 35.15%, #BCEAF3 99.94%)' }}>
        <NavBar />
        <Box style={{ display: "flex" }}>
          <SideBar props={condition} />
          <div style={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
            <Outlet></Outlet>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Main;
