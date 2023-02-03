import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenViduApp from "../OpenVidu/OpenViduApp";
import MyTodo from "../MyPageReport/MyTodo";
import NSRoomCard from "./RoomScroll/NSRoomCard";
import FTRoomCard from "./RoomScroll/FTRoomCard";

import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { LeftArrow, RightArrow } from "./RoomScroll/Arrows";
import usePreventBodyScroll from "./RoomScroll/usePreventBodyScroll";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import axios from "axios";
import RoomInfo from "./RoomScroll/RoomInfo";

import "./RoomScroll/hideScrollbar.css";
import { resolveComponentProps } from "@mui/base";

// const getrooms = () =>
//   Array(1) //카드의 개수 추정 0부터 10까지 있는 카드
//     .fill(0)
//     .map((_, ind) => ({ id: `element-${ind}` }));

function StudyRoomMain() {
  const [rooms, setrooms] = useState([]);
  const [noRooms, setnoRooms] = useState([]); //nonstop방만 저장할 배열
  const [yesRooms, setyesRooms] = useState([]); //쉬는시간방만 저장할 배열

  useEffect(() => {
    axios.get("http://i8a302.p.ssafy.io:8081/studyrooms").then((res) => {
      // console.log(res.data.publics);

      if ("success_get_studyrooms") {
        setrooms(res.data.publics);
        // console.log(res.data.publics);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    const NR = rooms.filter((room) => room.type === "N");
    setnoRooms(NR);
    console.log(noRooms);
    const YR = rooms.filter((room) => room.type === "Y");
    setyesRooms(YR);
  }, [rooms]);

  //방 추가하는 함수
  const addItem = (typeOfRoom) => {
    console.log(typeOfRoom);

    if (typeOfRoom === "Y") {
      axios
        .post("http://i8a302.p.ssafy.io:8081/studyrooms", {
          type: "Y",
        })
        .then((response) => {
          console.log(response);
          console.log(rooms);
        });

      //방 입장하는 axios 이어서 작성 필요 (일단 랜덤입장으로 )
    } else if (typeOfRoom === "N") {
      axios
        .post("http://i8a302.p.ssafy.io:8081/studyrooms", {
          type: "N",
        })
        .then((response) => {
          console.log(response);
          console.log(rooms);
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          color: "text.secondary",
          marginTop: "3%",
          height: "100%",
          bgcolor: "#1A1E33F2",
        }}
      >
        {/* 하나 xs 값 주면 나머지 알아서*/}
        <Grid container>
          {/* 그리드 컴포넌트 사이 넓이 */}
          <Grid
            item
            xs={3}
            style={
              {
                /*backgroundColor: "skyblue"*/
              }
            }
          >
            {/* todo& 목표 공부시간 묶는 div */}
            <div
              style={{
                position: "absolute",
                displayPrint: "inline-block",
                marginLeft: "5%",
                backgroundColor: "skyblue",
                paddingLeft: "20px",
              }}
            >
              {/* todo div */}
              <MyTodo />
            </div>
            <div style={{ position: "absolute", displayPrint: "inline-block" }}>
              {/* 목표 공부시간 div */}
            </div>
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              position: "relative",
              displayPrint: "inline-block",
              marginTop: "0%",
              marginLeft: "0%",
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ fontSize: 20, color: "white" }}>
                STUDY ROOM
              </Typography>
            </Grid>
            <Grid
              item
              xs={11}
              style={{
                position: "relative",
                displayPrint: "inline-block",
                // backgroundColor: "red",
              }}
            >
              <ScrollMenu
                // LeftArrow={LeftArrow} //좌우 클릭으로 이동
                // RightArrow={RightArrow}
                onWheel={onWheel}
              >
                <RoomInfo />
                {noRooms.map((room) => (
                  <>
                    <NSRoomCard key={room.id} sessionName={room.session_name} />
                  </>
                ))}
              </ScrollMenu>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                position: "relative",
                backgroundColor: "red",
              }}
            >
              <IconButton
                onClick={() => {
                  addItem("N");
                }}
                sx={{ color: "white", top: "43%" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={11}
              style={{
                position: "relative",
                displayPrint: "inline-block",
                // backgroundColor: "red",
                marginTop: "3%",
                marginBottom: "3%",
              }}
            >
              <ScrollMenu
                // LeftArrow={LeftArrow}
                // RightArrow={RightArrow}
                onWheel={onWheel}
              >
                {yesRooms.map((room) => (
                  <>
                    <FTRoomCard key={room.id} sessionName={room.session_name} />
                  </>
                ))}
              </ScrollMenu>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                position: "relative",
                displayPrint: "inline-block",
              }}
            >
              <IconButton
                onClick={() => {
                  addItem("Y");
                }}
                sx={{ color: "white", top: "43%" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StudyRoomMain;

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
