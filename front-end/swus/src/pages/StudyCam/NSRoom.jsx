import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyTodo from "../MyPageReport/MyTodo";
import Clock from "./Clock";
import { Button } from "@mui/material";
import RoomButton from "./RoomButton";

function NSRoom() {
  return (
    <>
      <RoomButton />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2.2} sx={{ border: 1 }}>
            <h2>Non-Stop열람실</h2>
            <Clock />
            <div
              style={{
                backgroundColor: "skyblue",
                height: "100%",
                top: -1,
                left: -1,
              }}
            >
              <MyTodo />
            </div>
            <div>
              <Button variant="outlined" sx={{ width: "100%" }}>
                휴게실 바로가기
              </Button>
            </div>
          </Grid>
          <Grid item xs={9.8} sx={{ border: 1 }}>
            {/* <div
              style={{
                backgroundColor: "green",
                position: "fixed",
                height: "100%",
                top: -1,
                left: -1,
              }}
            >
              cam
            </div> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NSRoom;
