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
import logo from "../../../image/lib.jpg";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";

function FtoTRoom(props) {
  const [open, setOpen] = React.useState(false);
  const [sessionName, setsessionName] = useState(props.sessionName);
  const [count, setCount] = useState(props.partici);
  console.log();

  const handleToOpen = () => {
    setOpen(true);
  };

  const hadleToClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleToEnter = () => {
    navigate("/nsroom", { state: { roomName: sessionName } }); // nsroom 으로 이동하면서 roomNum에 sessionName 담아 보내줌
  };

  return (
    <>
      <Card style={{ marginRight: 20, height: 350, width: 295, borderRadius: 10 }}>
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
              50 to 10 열람실 #{sessionName}
            </Typography>
          </div>
        </CardContent>
        {/* <Button onClick={handleToOpen}>입장하기</Button> */}
        <div>
          <p
            style={{
              color: "white",
              display: "inline-block",
              fontSize: "25px",
              marginLeft: "10%",
            }}
          >
            {count}/9
          </p>
          <Button
            variant="contained"
            onClick={handleToOpen}
            sx={{ marginRight: "10%", alignItems: "right", backgroundColor: "#475467" }}
            startIcon={<AdjustOutlinedIcon></AdjustOutlinedIcon>}
          >
            입장하기
          </Button>
        </div>
      </Card>

      <Dialog
        open={open}
        onClose={hadleToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">50 to 10 열람실 #{sessionName} 입장하기</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleToEnter}>입장</Button>
          <Button onClick={hadleToClose}>x</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FtoTRoom;
