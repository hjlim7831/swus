import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenViduApp from "../OpenVidu/OpenViduApp";
import MyTodo from "../MyPageReport/MyTodo";
import NSRoomCard from "./RoomScroll/NStRoomCard";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { LeftArrow, RightArrow } from "./RoomScroll/Arrows";
import usePreventBodyScroll from "./RoomScroll/usePreventBodyScroll";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RoomInfo from "./RoomScroll/RoomInfo";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./RoomScroll/hideScrollbar.css";

const elemPrefix = "글 번호";
const getId = (index) => `${elemPrefix}${index}`;
const getItems = () =>
  Array(1) //카드의 개수 추정 0부터 10까지 있는 카드
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

function StudyRoomMain() {
  const [items, setItems] = React.useState(getItems);

  const addItem = () => {
    setItems((items) => items.concat({ id: getId(String(Math.random()).slice(2, 5)) }));
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
                backgroundColor: "red",
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
            container
            spacing={2}
            xs={9}
            style={{
              position: "relative",
              displayPrint: "inline-block",
              // backgroundColor: "red",
              marginTop: "0%",
              marginLeft: "0%",
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ fontSize: 20, color: "white" }}>
                STUDY ROOM
              </Typography>
            </Grid>
            {/* StudyRoom */}
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
                // LeftArrow={LeftArrow}
                // RightArrow={RightArrow}
                onWheel={onWheel}
              >
                <RoomInfo />
                {items.map(({ id }) => (
                  <NSRoomCard key={id} />
                ))}
              </ScrollMenu>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                position: "relative",
              }}
            >
              <IconButton onClick={addItem} sx={{ color: "white", top: "43%" }}>
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
                {items.map(({ id }) => (
                  <NSRoomCard key={id} />
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
              <IconButton onClick={addItem} sx={{ color: "white", top: "43%" }}>
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
