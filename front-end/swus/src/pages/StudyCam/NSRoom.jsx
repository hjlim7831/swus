import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import OpenViduApp from "../OpenVidu/OpenViduApp";

function NSRoom() {
  const [totalTime, setTotalTime] = useState();
  const location = useLocation(); //화면 이동할때 방 세션이름 받아오는 useLocation

  const Token = sessionStorage.getItem("token");
  useEffect(() => {
    //총 공부시간 가져오기 (분)
    axios({
      method: "get",
      url: "http://i8a302.p.ssafy.io:8081/my-studies/now-total-time",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
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
      {console.log("totalTime")}
      {console.log(totalTime)}
      {console.log("NSROOM")}
      {totalTime ? (
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
