import React from "react";
import { useLocation } from "react-router-dom";

import OpenViduApp from "../OpenVidu/OpenViduApp";

function NSRoom() {
  const location = useLocation(); //화면 이동할때 방 세션이름 받아오는 useLocation

  const roomName = location.state.roomName;
  const roomId = location.state.roomId;
  const enterTime = location.state.enterTime;
  console.log("roomId");
  //여기까지 잘 온다.
  return (
    <>
      <OpenViduApp sessionId={roomName} roomId={roomId} enterTim={enterTime} />
    </>
  );
}

export default NSRoom;
