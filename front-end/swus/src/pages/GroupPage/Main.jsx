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

	// const MusicPlayer = () => {
	// 	const audioRef = useRef(null);

	// 	useEffect(() => {
	// 		audioRef.current.play();
	// 	}, []);

	// 	return (
	// 		<audio playsinline controls ref={audioRef} src="./SideBar/music.mp3" />
	// 	);
	// };

  return (
		<>
			<NavBar />
			<Box style={{ display: "flex" }}>
				<SideBar props={condition} />
				<div style={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
					<Outlet></Outlet>
					{/* {MusicPlayer()} */}
				</div>
			</Box>
		</>
  )
}

export default Main;