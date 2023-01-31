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
        <CardMedia
          component="img"
          width="200"
          height="400"
          image={logo}
          alt="studystudy"
          objectFit="cover"
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

export default NonStopRoom;
