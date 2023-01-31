import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenViduApp from "../OpenVidu/OpenViduApp";
import MyTodo from "../MyPageReport/MyTodo";
import NonStopRoom from "./RoomScroll/NonStopRoom";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { LeftArrow, RightArrow } from "./RoomScroll/Arrows";
import usePreventBodyScroll from "./RoomScroll/usePreventBodyScroll";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./RoomScroll/hideScrollbar.css";

const elemPrefix = "글 번호";
const getId = (index) => `${elemPrefix}${index}`;
const getItems = () =>
  Array(10) //카드의 개수 추정 0부터 10까지 있는 카드
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

function StudyRoomMain() {
  const [items, setItems] = React.useState(getItems);

  const addItem = () => {
    setItems((items) =>
      items.concat({ id: getId(String(Math.random()).slice(2, 5)) })
    );
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, color: "text.secondary" }}>
        {/* 하나 xs 값 주면 나머지 알아서*/}
        <Grid container spacing={2}>
          {/* 그리드 컴포넌트 사이 넓이 */}
          <Grid item xs={3}>
            {/* todo& 목표 공부시간 묶는 div */}
            <div style={{ position: "absolute", displayPrint: "inline-block" }}>
              {/* todo div */}
              <MyTodo />
            </div>
            <div style={{ position: "absolute", displayPrint: "inline-block" }}>
              {/* 목표 공부시간 div */}
            </div>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              position: "relative",
              displayPrint: "inline-block",
            }}
          >
            {/* StudyRoom */}

            {/* <ScrollMenu
              // LeftArrow={LeftArrow} //좌우 클릭으로 이동
              // RightArrow={RightArrow}
              onWheel={onWheel}
            >
              {items.map(({ id }) => (
                <Cardd
                  itemId={id} // NOTE: itemId is required for track items
                  title={id}
                  key={id}
                />
              ))}
            </ScrollMenu> */}
            <button onClick={addItem}>Add item</button>
            <ScrollMenu
              // LeftArrow={LeftArrow}
              // RightArrow={RightArrow}
              onWheel={onWheel}
            >
              {items.map(({ id }) => (
                <NonStopRoom key={id} />
              ))}
            </ScrollMenu>
            <button onClick={addItem}>Add item</button>

            {/* <div style={{ position: "relative", displayPrint: "inline-block" }}>
          <Card style={{ minWidth: 100, maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                50 to 10 열람실
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">입장하기</Button>
            </CardActions>
          </Card>
        </div> */}
          </Grid>
          {/* 

      <OpenViduApp /> */}
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
