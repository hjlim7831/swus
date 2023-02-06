import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "./SideBar";
import { Outlet } from 'react-router';
import { Box } from "@mui/material"

function Main() {
  return (
		<>
			<NavBar />
			<Box style={{ display: "flex",  }}>
				<SideBar />
				<div style={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
					<Outlet></Outlet>
				</div>
			</Box>
		</>
  )
}

export default Main