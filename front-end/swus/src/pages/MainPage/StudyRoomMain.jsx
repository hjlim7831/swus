import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenViduApp from "../OpenVidu/OpenViduApp";

function StudyRoomMain() {
  return (
    <>
      <Card sx={{ minWidth: 100, maxWidth: 300 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Non-Stop 열람실
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">입장하기</Button>
        </CardActions>
      </Card>

      <OpenViduApp />
    </>
  );
}

export default StudyRoomMain;
