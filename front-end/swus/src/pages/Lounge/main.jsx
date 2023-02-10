import React from "react";
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

import NavBar from "../../components/NavBar/NavBar";
import Lounge from "./Lounge"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export default function MiniDrawer() {
  return (
    <>
      <NavBar />
      <Box
        sx={{ display: "flex", backgroundColor: "#1A1E33", height: "100vh" }}
        boxSizing={openedMixin}
      >
        <CssBaseline />
        <Divider />

        <Box fullWidth sx={{ mt: 11, mx: 4, justifyContent: "center" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#DEDCEE",
              width: "170px",
              height: "50px",
              color: "#1A1E33",
              fontSize: "20px",
            }}
          >
            LOUNGE
          </Button>

          <Typography sx={{ mt: 3, color: "white", fontSize: "14px" }}>
            열람실 이동까지 남은 시간
          </Typography>

          <Typography sx={{ mt: 3, color: "white" }}>휴게실 이용 방법</Typography>

          <Box
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              padding: 2,
              backgroundColor: "#F4EFE6",
              height: "400px",
              borderRadius: "7px",
            }}
          >
            <Typography style={{ wordBreak: "break-all", fontSize: "14px" }}>
              1. 휴게실은 최대 30분 이용 가능합니다. {<br />}
              2. 이용시간 30분이 지나면 열람실로 이동합니다. {<br />}
              3. 휴게실 재입장은 한시간 이후에 가능합니다. {<br />}
              4. 스트레칭은 부위별로 맞춤 동영상이 제공됩니다.{<br />}
              5. 동기부여 영상은 다양한 영상이 랜덤으로 제공됩니다. {<br />}
              6. 실시간 채팅에서는 매너를 지켜주세요.
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#DEDCEE",
              width: "170px",
              height: "50px",
              color: "#1A1E33",
              fontSize: "20px",
            }}
          >
            휴게실 나가기
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginLeft: 50, width: "80vw", marginTop: 80 }}>
        <Lounge />
      </Box>
    </>
    
  );
}
