import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../Utils/index.jsx";

import OpenViduApp from "../OpenVidu/OpenViduApp";

function NSRoom() {
  const [totalTime, setTotalTime] = useState();
  const location = useLocation(); //화면 이동할때 방 세션이름 받아오는 useLocation

  useEffect(() => {
    //총 공부시간 가져오기 (분)

    const config = {
      method: "GET",
      url: "/my-studies/now-total-time",
    };
    axios(config).then((res) => {
      setTotalTime(res.data.now_total_time);
    });
  }, []);

  const roomName = location.state.roomName;
  const roomId = location.state.roomId;

  const enterHour = new Date().getHours();
  const enterMin = new Date().getMinutes();

  //여기까지 잘 온다.
  return (
    <>
      {totalTime !== undefined ? (
        <OpenViduApp
          sessionId={roomName}
          roomId={roomId}
          totalTime={totalTime}
          enterHour={enterHour}
          enterMin={enterMin}
        />
      ) : null}
    </>
  );
}

export default NSRoom;
