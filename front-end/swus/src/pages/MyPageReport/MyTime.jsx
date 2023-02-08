import React, { useState } from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Grid } from "@mui/material";

function MyTime() {
  const [targetTime, setTargetTime] = useState(5);
  const [studyTime, setStudyTime] = useState(2);
  const [restTime, setRestTime] = useState(targetTime - studyTime);

  // setTargetTime(targetTime + 1);
  // setStudyTime(studyTime + 2);

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
          <Grid item xs={4}>
            <h3 style={{ marginLeft: "40px" }}>공부 목표 시간</h3>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              color="black"
              aria-label="change view"
              sx={{ paddingTop: "20px" }}
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
                  height: 320,
                  backgroundColor: "F4EFE6",
                }}
              >
                <Grid item xs={10} sx={{ marginX: "auto" }}>
                  <Grid
                    container
                    sx={{ backgroundColor: "red", marginTop: "10%" }}
                  >
                    <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
                      나의 목표 시간
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "pink" }}>
                      {targetTime}시간
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{ backgroundColor: "red", marginTop: "8%" }}
                  >
                    <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
                      현재 달성 시간
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "pink" }}>
                      {studyTime}시간
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{ backgroundColor: "red", marginTop: "8%" }}
                  >
                    <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
                      남은 목표 시간
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "pink" }}>
                      {restTime}시간
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyTime;
