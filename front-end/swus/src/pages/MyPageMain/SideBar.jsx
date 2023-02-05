import React, { useState } from "react";
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

import MyProfileMain from "../MyPageProfile/MyProfileMain";
import MyReport from "../MyPageReport/MyReport";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export default function MiniDrawer() {
  const [content, setContent] = useState("Profile");
  console.log(content);

  const moveHere = [
    {
      id: 1,
      name: "Profile",
    },
    {
      id: 2,
      name: "MyReport",
    },
  ];
  const selectComponent = {
    Profile: <MyProfileMain />,
    MyReport: <MyReport />,
  };

  return (
    <>
      <Box
        sx={{ display: "inline-block", backgroundColor: "#1A1E33", height: "881px" }}
        boxSizing={openedMixin}
      >
        <Divider />

        <Box fullWidth sx={{ mt: 11, mx: 2, justifyContent: "center" }}>
          {moveHere.map((data) => (
            <ListItem key={data.id} disablePadding>
              <ListItemButton
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#DEDCEE",
                  width: "200px",
                  height: "50px",
                  color: "black",
                  fontSize: "20px",
                  borderRadius: 2,
                }}
                onClick={() => setContent(data.name)}
                name={data.name}
              >
                <ListItemText primary={data.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: "1500px",
          height: "881px",
          display: "inline-block",
          backgroundColor: "pink",
          position: "relative",
          marginLeft: "20px",
        }}
      >
        {content && (
          <Grid container sx={{ backgroundColor: "skyblue" }}>
            {selectComponent[content]}
          </Grid>
        )}
      </Box>
    </>
  );
}
