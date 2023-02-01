import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import logo from "../../../image/sampleImage.jpg";

function NSRoomCard() {
  const navigate = useNavigate();
  const handleToEnter = () => {
    navigate("/openvidu");
  };

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
    </>
  );
}

export default NSRoomCard;
