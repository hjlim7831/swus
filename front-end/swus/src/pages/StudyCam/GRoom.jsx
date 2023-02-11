import React from "react";
import { useLocation } from "react-router-dom";

import OpenViduApp from "../OpenVidu/GroupStudyRoom/OpenViduGroup";

function GRoom() {
  const location = useLocation(); //화면 이동할때 방 세션이름 받아오는 useLocation

  const roomName = location.state.roomName;
  const round = location.state.round;
  const teamId = location.state.teamId;
  const category = location.state.category;
  const teamName = location.state.teamName;

  //여기까지 잘 온다.
  return (
    <>
      <OpenViduApp
        sessionId={roomName}
        round={round}
        teamId={teamId}
        category={category}
        teamName={teamName}
      />
    </>
  );
}

export default GRoom;
