import { Box, Container } from "@mui/material";
import React from "react";
import MyGroupList from "./MyGroupList";
import MyInfo from "./MyInfo";
import { Grid } from "@mui/material";

function MyProfileMain() {
  return (
    <>
      <Grid container>
        <Grid item xs={4} sx={{}}>
          <MyInfo />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            marginTop: "-20px",
          }}
        >
          <MyGroupList />
        </Grid>
      </Grid>
    </>
  );
}

export default MyProfileMain;
