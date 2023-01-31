import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import logo from "../../../image/sampleImage.jpg";

function NonStopRoom() {
  const [expanded, setExpanded] = React.useState(false);

  const handleToEnter = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card>
        <CardMedia component="img" height="400" image={logo} alt="studystudy" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            아래가 아니라 중간에 박고싶다 방 이름..
          </Typography>
        </CardContent>
        <Button onClick={handleToEnter}>입장하기</Button>
      </Card>
    </>
  );
}

export default NonStopRoom;
