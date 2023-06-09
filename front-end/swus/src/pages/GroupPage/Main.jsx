import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import { Outlet } from 'react-router';
import { Box } from "@mui/material"

function Main() {

	const [condition, setCondition] = useState({ type: window.location.pathname.slice(7, 12), userId: 3 })

	useEffect(() => {
		setCondition({...condition, ["type"] : window.location.pathname.slice(7, 12)})
		console.log(condition)
	}, [])

  return (
		<>
			<NavBar />
			<Box style={{ display: "flex", background: 'linear-gradient(to left, #DEDCEE 35.15%, #BCEAF3 99.94%)' }}>
				<SideBar props={condition} />
				<div style={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
					<Outlet></Outlet>
				</div>
			</Box>
		</>
  )
}

export default Main;