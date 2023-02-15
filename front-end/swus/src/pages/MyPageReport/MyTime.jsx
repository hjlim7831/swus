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
import PieChart from "./PieChart";

import axios from "./../../Utils/index";

function MyTime() {
  // 입력 시간
  const [inputHour, setInputHour] = useState();
  // 입력 분
  const [inputMin, setInputMin] = useState();

  // 모달 열기?
  const [open, setOpen] = React.useState(false);
  // 목표시간
  const [targetTime, setTargetTime] = useState();
  // 공부시간
  const [studyTime, setStudyTime] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      url: "/my-studies/target-time",
    };
    // 목표시간 가져오기 (분)
    axios(config)
      .then((res) => {
        const Time = res.data.target_time;
        setTargetTime(Time);
        console.log("여기 데이터");
        console.log(res.data);
        setInputHour(Math.floor(Time / 60));
        setInputMin(Time % 60);
      })
      .then((res) => {
        const config2 = {
          method: "get",
          url: "/my-studies/now-total-time",
        };
        // 총 공부시간 가져오기 (분)
        axios(config2).then((res) => {
          console.log("여기는 공부시간");
          console.log(res.data.now_total_time);
          setStudyTime(res.data.now_total_time);
        });
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
    const value = event.target.value;
    setInputHour(value);
  };
  const changeM = (event) => {
    const value = event.target.value;
    setInputMin(value);
  };

  const target_time = parseInt(inputHour) * 60 + parseInt(inputMin);

  const save = (event) => {
    const Swal = require("sweetalert2");
    if (target_time > 24 * 60) {
      setOpen(false);
      Swal.fire({
        title: "하루는 24시간이에요!",
        text: "너무 무리는 하지 말아요 :)",
        icon: "warning",
      }).then((res) => {
        if (res.isConfirmed) {
          return;
        }
      });
    } else {
      const config = {
        method: "PUT",
        url: "/my-studies/target-time",
        data: { target_time },
      };
      axios(config).then((res) => {
        // console.log(res);
        setTargetTime(target_time);
      });
      setOpen(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 500,
          backgroundColor: "white",
          borderRadius: 2,
          padding: "10px",
          boxShadow: "2px 2px 7px 1px grey",
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <h3 style={{ marginLeft: "40px" }}>공부 목표 시간</h3>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              color="#3A3A3A"
              aria-label="modify"
              onClick={handleClickOpen}
              sx={{ paddingTop: "20px" }}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              color="black"
              aria-label="change view"
              sx={{ marginLeft: "50%", marginTop: "10px" }}
            >
              <AutorenewIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Grid
              item
              xs={10}
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
                  height: "23rem",
                  // backgroundColor: "F4EFE6",
                }}
              >
                <Grid item xs={10} sx={{ marginX: "auto" }}>
                  <Grid container sx={{ marginTop: "10%" }}>
                    <Grid item xs={6}>
                      나의 목표 시간
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ marginLeft: "30%" }}>
                        {parseInt(targetTime / 60)}시간{" "}
                        {("0" + parseInt(targetTime % 60)).slice(-2)}분
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ marginTop: "8%" }}>
                    <Grid item xs={6}>
                      현재 달성 시간
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ marginLeft: "30%" }}>
                        {parseInt(studyTime / 60)}시간{" "}
                        {("0" + parseInt(studyTime % 60)).slice(-2)}분
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    sx={{ marginTop: "8%", marginBottom: "1rem" }}
                  >
                    <Grid item xs={6}>
                      남은 목표 시간
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ marginLeft: "30%" }}>
                        {parseInt(restTime / 60)}시간{" "}
                        {("0" + parseInt(restTime % 60)).slice(-2)}분
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {targetTime && studyTime ? (
                  <PieChart targetTime={targetTime} studyTime={studyTime} />
                ) : null}
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
                  defaultValue={Math.floor(targetTime / 60)}
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
                  defaultValue={inputMin}
                  onChange={changeM}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                save();
              }}
            >
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default MyTime;
