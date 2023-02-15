import React from "react";
import { Box } from "@mui/system";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "./SideBar"
import Lounge from "./Lounge"


function Main() {
	return (
		<>
			<NavBar />
			<Box style={{ display: "flex", background: 'linear-gradient(to left, #DEDCEE 35.15%, #BCEAF3 99.94%)'}}>
				<SideBar />
				<div style={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
					<Lounge />
				</div>
      </Box>
		</>	
	)
}

export default Main;