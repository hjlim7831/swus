// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import MyProfileMain from "./MyProfileMain";
// import MyReport from "../MyPageReport/MyReport";

// const drawerWidth = 200;

// function SideNavBar() {
//   const [content, setContent] = useState("Profile");
//   console.log(content);
//   // const handleClickButton = (e) => {
//   //   const { name } = e.target;
//   //   console.log(name);
//   //   setContent(name);
//   //   console.log(content);
//   // };

//   const moveHere = [
//     {
//       id: 1,
//       name: "Profile",
//     },
//     {
//       id: 2,
//       name: "MyReport",
//     },
//   ];

//   const selectComponent = {
//     Profile: <MyProfileMain />,
//     MyReport: <MyReport />,
//   };

//   return (
//     <>
//       <Box sx={{ position: "relative", display: "inline-block", top: 100 }}>
//         <Drawer
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               boxSizing: "border-box",
//               top: 69,
//             },
//           }}
//           variant="permanent"
//           anchor="left"
//         >
//           <Divider />
//           <List>
//             {moveHere.map((data) => (
//               <ListItem key={data.id} disablePadding>
//                 {/* <ListItemButton onClick={handleClickButton} name={data.name}> */}
//                 <ListItemButton
//                   onClick={() => setContent(data.name)}
//                   name={data.name}
//                 >
//                   <ListItemText primary={data.name} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//       </Box>
//       {content && (
//         <Box sx={{ position: "relative", display: "inline-block" }}>
//           {selectComponent[content]}
//         </Box>
//       )}
//     </>
//   );
// }

// export default SideNavBar;
