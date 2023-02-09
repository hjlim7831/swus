import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import { ResponsivePie } from "@nivo/pie";

import axios from "axios";

function MyTime() {
  const [inputHour, setInputHour] = useState();
  const [inputMin, setInputMin] = useState();

  const [open, setOpen] = React.useState(false);
  const [targetTime, setTargetTime] = useState();
  const [studyTime, setStudyTime] = useState();
  const Token = sessionStorage.getItem("token");

  useEffect(() => {
    //목표시간 가져오기 (분)
    axios({
      method: "get",
      url: "http://i8a302.p.ssafy.io:8081/my-studies/target-time",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      setTargetTime(res.data.target_time);
    });

    //총 공부시간 가져오기 (분)
    axios({
      method: "get",
      url: "http://i8a302.p.ssafy.io:8081/my-studies/now-total-time",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      setStudyTime(res.data.now_total_time);
    });
  }, []);

  let restTime = targetTime - studyTime;
  if (restTime <= 0) {
    restTime = 0;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeH = (event) => {
    let value = event.target.value;
    setInputHour(value);
  };
  const changeM = (event) => {
    let value = event.target.value;
    setInputMin(value);
  };

  const target_time = parseInt(inputHour) * 60 + parseInt(inputMin);
  const save = (event) => {
    axios({
      method: "put",
      url: "http://i8a302.p.ssafy.io:8081/my-studies/target-time",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: {
        target_time: target_time,
      },
    }).then((res) => {
      console.log(res);
    });
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#F4EFE6",
                marginX: "auto",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "auto",
                  overflowX: "hidden",
                  width: "100%",
                  height: "180px",
                  backgroundColor: "F4EFE6",
                }}
              >
                <Grid item xs={12}>
                  <Grid container sx={{ marginTop: "3%" }}>
                    <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
                      나의 목표 시간
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "pink" }}>
                      <Box sx={{ marginLeft: "30%" }}>
                        {parseInt(targetTime / 60)}시간{" "}
                        {("0" + parseInt(targetTime % 60)).slice(-2)}분
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{ backgroundColor: "red", marginTop: "2%" }}
                  >
                    <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
                      현재 달성 시간
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "pink" }}>
                      <Box sx={{ marginLeft: "30%" }}>
                        {parseInt(studyTime / 60)}시간{" "}
                        {("0" + parseInt(studyTime % 60)).slice(-2)}분
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{ backgroundColor: "red", marginTop: "2%" }}
                  >
                    <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
                      남은 목표 시간
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "pink" }}>
                      <Box sx={{ marginLeft: "30%" }}>
                        {parseInt(restTime / 60)}시간{" "}
                        {("0" + parseInt(restTime % 60)).slice(-2)}분
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>목표시간 설정하기</DialogTitle>
          <DialogContent>
            <DialogContentText>
              오늘 공부할 목표 시간을 설정해 주세요 <br /> ex) 오늘 10시간 반
              공부 => 10, 30 입력
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="hour"
                  label="시"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={changeH}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="min"
                  label="분"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={changeM}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={save}>저장</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default MyTime;
