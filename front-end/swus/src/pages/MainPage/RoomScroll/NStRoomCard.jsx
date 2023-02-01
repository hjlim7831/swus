import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import EnterM from "../EnterModal/EnterM.jsx";

import logo from "../../../image/sampleImage.jpg";

function NSRoomCard() {
  const [open, setOpen] = React.useState(false);

  const handleToEnter = () => {
    setOpen(true);
  };

  const hadleToClose = () => {
    setOpen(false);
  };
  // const navigate = useNavigate();
  // const handleToEnter = () => {
  //   navigate("/openvidu");
  // };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          width="200"
          height="400"
          image={logo}
          alt="studystudy"
          // objectfit="cover"  objectFit 하면 안됨
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            아래가 아니라 중간에 이름이..
          </Typography>
        </CardContent>
        <Button onClick={handleToEnter}>입장하기</Button>
      </Card>

      <Dialog
        open={open}
        onClose={hadleToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"열람실 입장 위한 모달"}
        </DialogTitle>
        <DialogContent>
          <EnterM />
        </DialogContent>
        <DialogActions>
          <Button onClick={hadleToClose}>x</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NSRoomCard;
