import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function roomInfo() {
  return (
    <>
      <Card
        style={{
          marginRight: 20,
          background: "#352E2B",
          height: 370,
          width: 295,
          borderRadius: 10,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            열람실 이용 안내
          </Typography>
          <div style={{ width: 270, marginTop: 20, marginLeft: 5 }}>
            <Grid
              cotainer
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "flex-start",
                marginBlock: 3,
              }}
            >
              <Grid item xs={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  1.
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  열람실 매너를 지켜주세요.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              cotainer
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBlock: 3,
              }}
            >
              <Grid item xs={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  2.
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  Non-Stop 열람실은 쉬는 시간 없는 방 입니다.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              cotainer
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBlock: 3,
              }}
            >
              <Grid item xs={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  3.
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  50 to 10 열람실은 50분 공부하고 10분 쉬어가는 방 입니다.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              cotainer
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBlock: 3,
              }}
            >
              <Grid item xs={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  4.
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  마음에 드는 방이 없는 경우, 새로 방을 만들어 보세요.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              cotainer
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Grid item xs={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  5.
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  스터디 멤버가 필요하면 그룹 기능을 이용해 보세요.
                </Typography>
              </Grid>
            </Grid>
            {/* <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
            >
              1. 열람실 매너를 지켜주세요
              <br />
              <br />
              2. Non-Stop 열람실은 쉬는 시간 없는 방 입니다.
              <br />
              <br /> 3. 50 to 10 열람실은 50분 공부하고 10분 쉬어가는 방 입니다.
              <br />
              <br /> 4. 마음에 드는 방이 없는 경우, 새로 방을 만들어 보세요.
              <br />
              <br /> 5. 스터디 멤버가 필요하면 그룹 기능을 이용해 보세요.
              <br />
            </Typography> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default roomInfo;
