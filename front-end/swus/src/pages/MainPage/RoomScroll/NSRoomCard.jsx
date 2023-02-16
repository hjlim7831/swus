import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import logo from "../../../image/nonStop.png";
import { Grid } from "@mui/material";
import "../../../App.css";
import axios from "./../../../Utils/index";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

function NSRoomCard(props) {
  const [open, setOpen] = React.useState(false);
  const [sessionName, setsessionName] = useState(props.sessionName);
  const [count, setCount] = useState(props.partici);
  const [roomId, setRoomId] = useState(props.id);
  const handleToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleToEnter = () => {
    const config = {
      method: "POST",
      url: `/studyrooms/${roomId}`,
    };

    axios(config).then((response) => {
      if ("success_enter_studyroom") {
        navigate(`/studyroom/${sessionName}`, {
          state: { roomName: sessionName, roomId: roomId },
        }); // nsroom 으로 이동하면서 roomNum에 sessionName 담아 보내줌
      } else {
        alert("잠시 후 다시 입장해주세요");
      }
    });
  };

  return (
    <>
      <Card
        style={{
          marginRight: 20,
          height: 350,
          width: 295,
          borderRadius: 10,
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
          }}
        ></div>
        <CardContent>
          <div
            style={{
              background: "gray",
              opacity: "35%",
              position: "absolute",
              width: "270px",
              height: "120px",
              borderRadius: "10px",
            }}
          ></div>
          <div style={{ width: 200 }}>
            <Typography sx={{ fontSize: 20 }} color="white">
              NonStop 열람실
              <br />#{roomId}
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
              paddingLeft: 1,
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
                "&:hover": { background: "#475467" },
              }}
              startIcon={<LoginRoundedIcon></LoginRoundedIcon>}
            >
              입장하기
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Dialog
        open={open}
        onClose={handleToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "Cafe24", fontWeight: "bold", fontSize: "30px" }}
        >
          Non-Stop 열람실 #{roomId} 입장하기
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ fontFamily: "Cafe24", textAlign: "center", fontSize: "20px" }}
        >
          오늘도 열심히 달려볼까요?
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleToEnter}
            sx={{
              fontFamily: "Cafe24",
              color: "white",
              background: "#1560BD",
              "&:hover": { backgroundColor: "#1560BD" },
            }}
          >
            입장
          </Button>
          <Button
            onClick={handleToClose}
            variant="contained"
            sx={{
              background: "#CA3433",
              "&:hover": { backgroundColor: "#CA3433" },
            }}
          >
            x
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NSRoomCard;
