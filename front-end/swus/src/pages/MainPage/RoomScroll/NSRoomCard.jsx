import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import logo from "../../../image/sampleImage.jpg";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import { Grid } from "@mui/material";
import axios from "axios";

function NSRoomCard(props) {
  const [open, setOpen] = React.useState(false);
  const [sessionName, setsessionName] = useState(props.sessionName);
  const [count, setCount] = useState(props.partici);
  const [roomId, setRoomId] = useState(props.id);

  console.log();

  const handleToOpen = () => {
    setOpen(true);
  };

  const hadleToClose = () => {
    setOpen(false);
  };

  const Token =
    "eyJyZWdEYXRlIjoxNjc1NzQ0NzMwMTU0LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmdAZ21haWwuY29tIiwiZXhwIjoxNjc1ODMxMTMwLCJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJtZW1iZXJJZCI6ODN9.QCvJ0J6OvsmxkiqrYQSWhUjOpdrbVzrWSZNO4q0Bahs";

  const navigate = useNavigate();
  const handleToEnter = () => {
    // axios
    //   .post(`http://i8a302.p.ssafy.io:8081/studyrooms/${sessionName}`, {})
    //   .then((response) => {
    //     console.log(response);
    //     console.log("enter room");
    //   });

    //입장시 api
    axios({
      method: "post",
      url: `http://i8a302.p.ssafy.io:8081/studyrooms/${roomId}`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }).then((response) => {
      if ("success_enter_studyroom") {
        console.log(response);
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
  };

  return (
    <>
      <Card
        style={{ marginRight: 20, height: 350, width: 295, borderRadius: 10 }}
      >
        <div
          style={{
            width: 200,
            height: 200,
          }}
        >
          <img
            style={{
              width: 300,
              height: 380,
              objectFit: "cover",
              /*filter: "brightness(40%)" */ opacity: 1,
            }}
            src={logo}
          />
        </div>
        <CardContent>
          <div style={{ width: 200 }}>
            <Typography sx={{ fontSize: 20 }} color="white">
              NonStop 열람실 #{sessionName}
            </Typography>
          </div>
        </CardContent>
        <Grid container sx={{ marginX: "auto" }}>
          <Grid
            item
            xs={2}
            sx={{
              color: "white",
              display: "inline-block",
              fontSize: "25px",
              marginLeft: "7%",
            }}
          >
            {count}/9
          </Grid>
          <Grid item xs={6} sx={{ marginLeft: "20%" }}>
            <Button
              variant="contained"
              onClick={handleToOpen}
              sx={{
                marginLeft: "22%",
                height: "100%",
                backgroundColor: "#475467",
              }}
              startIcon={<AdjustOutlinedIcon></AdjustOutlinedIcon>}
            >
              입장하기
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Dialog
        open={open}
        onClose={hadleToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Non-Stop 열람실 #{sessionName} 입장하기
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleToEnter}>입장</Button>
          <Button onClick={hadleToClose}>x</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NSRoomCard;
