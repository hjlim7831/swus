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

const getItems = () =>
  Array(20) //카드의 개수 추정 0부터 19까지 있는 카드
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

function StudyRoomMain() {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <>
      <Box sx={{ flexGrow: 1, color: "text.secondary" }}>
        {/* 하나 xs 값 주면 나머지 알아서*/}
        <Grid container spacing={2}>
          {/* 그리드 컴포넌트 사이 넓이 */}
          <Grid item xs={4}>
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

            <ScrollMenu
              // LeftArrow={LeftArrow} //좌우 클릭으로 이동
              // RightArrow={RightArrow}
              onWheel={onWheel}
            >
              {items.map(({ id }) => (
                <Cardd
                  itemId={id} // NOTE: itemId is required for track items
                  title={id}
                  key={id}
                  onClick={handleClick(id)}
                  selected={isItemSelected(id)}
                />
              ))}
            </ScrollMenu>
            <ScrollMenu
              // LeftArrow={LeftArrow}
              // RightArrow={RightArrow}
              onWheel={onWheel}
            >
              {items.map(({ id }) => (
                <Cardd
                  itemId={id} // NOTE: itemId is required for track items
                  title={id}
                  key={id}
                  onClick={handleClick(id)}
                  selected={isItemSelected(id)}
                />
              ))}
            </ScrollMenu>

            {/* <div
          style={{
            position: "absolute",
            displayPrint: "flex",
            width: "auto",
            height: "auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              displayPrint: "inline-block",
              width: 400,
              height: 200,
            }}
          >
            <NonStopRoom />
          </div>
          <div
            style={{
              position: "absolute",
              displayPrint: "inline-block",
              width: 400,
              height: 200,
            }}
          >
            <NonStopRoom />
          </div>

          <div
            style={{
              position: "absolute",
              displayPrint: "inline-block",
              float: "right",
            }}
          >
            <IconButton
              aria-label="AddCircleOutlineIcon"
              style={{ position: "absolute", displayPrint: "inline-block" }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div> */}
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

function Cardd({ onClick, selected, title, itemId }) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "160px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
      </div>
      <div
        style={{
          height: "200px",
        }}
      />
    </div>
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
