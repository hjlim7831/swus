import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyTodo from "../MyPageReport/MyTodo";
import { useLocation } from "react-router-dom";

import Clock from "./Clock";
import { Button } from "@mui/material";
import RoomButton from "./RoomButton";
import OpenVidu from "../OpenVidu/OpenViduApp";

function NSRoom() {
  const location = useLocation(); //화면 이동할때 방 번호 받아오는 useLocation

  const roomid = "NS" + location.state.roomNum;
  //여기까지 잘 온다.
  return (
    <>
      <Box sx={{ flexGrow: 1, maxHeight: "500px" }}>
        <Grid container spacing={2}>
          <Grid item xs={2.2} sx={{ border: 1 }}>
            <RoomButton />
            <h2>Non-Stop열람실</h2>
            <Clock />
            <div
              style={{
                backgroundColor: "skyblue",
                height: "100%",
              }}
            >
              <MyTodo />
            </div>
            <div>
              <Button variant="outlined" sx={{ width: "auto", position: "fixed", bottom: 0 }}>
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
            <OpenVidu SessionId={roomid} />
            {/*오픈비두에 방 아이디 전달해준다. */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NSRoom;
