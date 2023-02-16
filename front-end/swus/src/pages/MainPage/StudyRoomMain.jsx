import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MyTimeBlock from "../MyPageReport/MyTimeBlock";
import NSRoomCard from "./RoomScroll/NSRoomCard";
import FTRoomCard from "./RoomScroll/FTRoomCard";
import { useNavigate } from "react-router-dom";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "./../../Utils/index";
import RoomInfo from "./RoomScroll/RoomInfo";
import NavBar from "../../components/NavBar/NavBar";
import "./RoomScroll/hideScrollbar.css";
import MyTodoBlock from "../OpenVidu/TodoList/MyTodoPublicMain";
import "../../App.css";


function StudyRoomMain() {
  const [rooms, setrooms] = useState([]);
  const [noRooms, setnoRooms] = useState([]); //nonstop방만 저장할 배열
  const [yesRooms, setyesRooms] = useState([]); //쉬는시간방만 저장할 배열
  const [open, setOpen] = useState(false);
  const [roomCategory, setRoomCategory] = useState("N");

  const handleToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const Token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      method: "GET",
      url: "/studyrooms",
    };
    axios(config).then((res) => {

      if ("success_get_studyrooms") {
        setrooms(res.data.publics);
      } else {
      }
    });
  }, []);
  useEffect(() => {
    const NR = rooms.filter((room) => room.type === "N");
    setnoRooms(NR);
    const YR = rooms.filter((room) => room.type === "Y");
    setyesRooms(YR);
  }, [rooms]);

  //방 추가하는 함수, 추가하고 바로 이동
  const addItem = (typeOfRoom) => {

    
    if (typeOfRoom === "Y") {
      const config = {
        method: "Post",
        url: "/studyrooms",
        data: { type: "Y" },
      };
      axios(config)
        .then((res) => {
          const sessionName = res.data.public.session_name;
          const roomId = res.data.public.id;

          const config = {
            method: "Post",
            url: `/studyrooms/${roomId}`,
          };
          axios(config).then((response) => {
            if ("success_enter_studyroom") {
              navigate(`/studyroom/${sessionName}`, {
                state: { roomName: sessionName },
              }); // nsroom 으로 이동하면서 roomNum에 sessionName 담아 보내줌
            } else {
              alert("잠시 후 다시 입장해주세요");
            }
          });

          navigate(`/studyroom/${sessionName}`, {
            state: { roomName: sessionName, roomId: roomId },
          }); // nsroom 으로 이동하면서 roomNum에 sessionName 담아 보내줌
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (typeOfRoom === "N") {
      const config = {
        method: "post",
        url: "studyrooms",
        data: { type: "N" },
      };
      axios(config).then((res) => {
        const sessionName = res.data.public.session_name;
        const roomId = res.data.public.id;

        const config = {
          method: "post",
          url: `studyrooms/${roomId}`,
        };
        axios(config).then((response) => {
          if ("success_enter_studyroom") {
            navigate(`/studyroom/${sessionName}`, {
              state: { roomName: sessionName },
            }); // nsroom 으로 이동하면서 roomNum에 sessionName 담아 보내줌
          } else {
            alert("잠시 후 다시 입장해주세요");
          }
        });

        navigate(`/studyroom/${sessionName}`, {
          state: { roomName: sessionName, roomId: roomId },
        }); // nsroom 으로 이동하면서 roomNum에 sessionName 담아 보내줌
      });
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          flexGrow: 1,
          color: "text.secondary",
          marginTop: 8,
          height: "100vh",
          bgcolor: "#1A1E33F2",
          position: "static",
        }}
      >
        {/* 하나 xs 값 주면 나머지 알아서*/}
        <Grid container>
          {/* 그리드 컴포넌트 사이 넓이 */}
          <Grid item xs={3}>
            {/* todo& 목표 공부시간 묶는 div */}
            <Grid
              item
              xs={12}
              sx={{ marginTop: 3, marginX: "auto", paddingLeft: "30px" }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: 25, color: "white", marginTop: 2, fontFamily: "Cafe24" }}
              >
                Todo List
              </Typography>
              <Grid
                item
                xs={10}
                sx={{
                  backgroundColor: "#F4EFE6",
                  borderRadius: 2,
                  paddingX: "10px",
                }}
              >
                <MyTodoBlock />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginX: "auto", paddingLeft: "30px" }}>
              {/* 목표 공부시간 div */}
              <MyTimeBlock />
            </Grid>
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
              <Typography
                variant="h1"
                sx={{
                  fontSize: 30,
                  color: "white",
                  my: "1.5rem",
                  fontFamily: "Cafe24",
                }}
              >
                STUDY ROOM
              </Typography>
            </Grid>
            <Grid container sx={{ mb: "2rem" }}>
              <Grid
                item
                xs={11.2}
                style={{
                  position: "relative",
                }}
              >
                <ScrollMenu
                  onWheel={onWheel}
                >
                  <RoomInfo />
                  {noRooms.map((room, i) => (
                    <>
                      <NSRoomCard
                        key={i}
                        id={room.id}
                        sessionName={room.session_name}
                        partici={room.count}
                      />
                    </>
                  ))}
                </ScrollMenu>
              </Grid>
              <Grid
                item
                xs={0.8}
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <IconButton
                  onClick={() => {
                    handleToOpen();
                    setRoomCategory("N");
                  }}
                  sx={{ color: "white", top: "45%", width: "80px" }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "2%" }}>
              <Grid
                item
                xs={11.2}
                style={{
                  position: "relative",
                  displayPrint: "inline-block",
                  height: "100%",
                }}
              >
                <ScrollMenu
                  onWheel={onWheel}
                >
                  {yesRooms.map((room, i) => (
                    <>
                      <FTRoomCard
                        key={i}
                        id={room.id}
                        sessionName={room.session_name}
                        partici={room.count}
                      />
                    </>
                  ))}
                </ScrollMenu>
              </Grid>
              <Grid
                item
                xs={0.8}
                style={{
                  position: "relative",
                  displayPrint: "inline-block",
                }}
              >
                <IconButton
                  onClick={() => {
                    handleToOpen()
                    setRoomCategory("Y")
                  }}
                  sx={{ color: "white", top: "45%", width: "80px" }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={open}
        onClose={handleToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Cafe24", fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
          열람실 생성하기
        </DialogTitle>
        <DialogContent id="alert-dialog-description" sx={{ fontFamily: "Cafe24", textAlign: "center", fontSize: "20px" }}>
          오늘도 열심히 달려볼까요?
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => {addItem(roomCategory)}}  sx={{ fontFamily: "Cafe24", color: "white", background: "#1560BD", "&:hover" : { backgroundColor: "#1560BD" } }}>입장</Button>
          <Button onClick={handleToClose} variant="contained" sx={{ background: "#CA3433", "&:hover" : { backgroundColor: "#CA3433" } }}>x</Button>
        </DialogActions>
      </Dialog>
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

  if (ev.deltaY > 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY < 0) {
    apiObj.scrollPrev();
  }
}
