import React from "react";
import { Box } from "@mui/system";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "./SideBar"
import Lounge from "./Lounge"


function Main() {
	return (
		<>
			<NavBar />
			{/* <SideBar /> */}
			<Box style={{ display: "flex" }}>
				<SideBar />
				<div style={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
					<Lounge />
				</div>
      </Box>
			{/* <div style={{ margin: 30}}>
				<h1>
					ccccccccccccccccc 
					cccccccccccccccccccccc
					cccccccccccccccccccccccccccccccccccc
					ccccccccccccccccccccccccccccccccccccccccccccc
					ccccccccccccccccccccccccccccccccccccccccccccccc
					cccccccccccccccccccccccccccccccccccccccccccccccccc
					cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
				</h1>
			</div> */}
		</>	
	)
}

export default Main;