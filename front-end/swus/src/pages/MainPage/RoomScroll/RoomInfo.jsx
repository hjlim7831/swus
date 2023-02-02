import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { bgcolor } from "@mui/system";

function roomInfo() {
  return (
    <>
      <Card style={{ marginRight: 10, background: "#352E2B", height: 306 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: "white" }}>
            열람실 이용 안내
          </Typography>
          <div style={{ width: 200 }}>
            <Typography variant="body2" color="text.secondary" sx={{ color: "white" }}>
              1. 매너
              <br />
              2.~~~~~
              <br /> 3.~~~
              <br /> 4.~~
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default roomInfo;
