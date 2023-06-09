import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import hourGlass from "../../image/Lounge/hourglass.png";
import "../../App.css";

export default function MiniDrawer() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          navigate("/studyroom");
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  let minutesTen = Math.floor(minutes / 10);
  let minutesOne = minutes % 10;
  let secondsTen = Math.floor(seconds / 10);
  let secondsOne = seconds % 10;

  return (
    <Box
      sx={{
        width: "17rem",
        display: "flex",
        backgroundColor: "#1A1E33",
        height: "100vh",
      }}
    >
      <Box sx={{ mt: "6rem", mx: 4, justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#DEDCEE",
            width: "210px",
            height: "50px",
            color: "#1A1E33",
            fontSize: "25px",
            fontFamily: "Cafe24_e",
            "&:hover": {
              backgroundColor: "#DEDCEE",
            },
          }}
        >
          LOUNGE
        </Button>

        <Typography
          sx={{
            mt: "2rem",
            color: "white",
            fontSize: "18px",
            fontFamily: "Cafe24",
          }}
        >
          열람실 이동까지 남은 시간
        </Typography>

        {/* 박스 시계 구현 */}
        <Box>
          <Box
            sx={{
              mt: 2,
              mx: 2,
              display: "inline-block",
              width: "2rem",
              mr: "0.5rem",
              height: "3rem",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: "5px", fontFamily: "Cafe24" }}
            >
              {minutesTen}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-block",
              width: "2rem",
              height: "3rem",
              mr: "0.5rem",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: "5px", fontFamily: "Cafe24" }}
            >
              {minutesOne}
            </Typography>
          </Box>
          <Box sx={{ display: "inline-block", color: "white", mr: "0.5rem" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              :
            </Typography>
          </Box>
          <Box
            sx={{
              display: "inline-block",
              width: "2rem",
              height: "3rem",
              mr: "0.5rem",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: "5px", fontFamily: "Cafe24" }}
            >
              {secondsTen}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-block",
              width: "2rem",
              height: "3rem",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: "5px", fontFamily: "Cafe24" }}
            >
              {secondsOne}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            mt: "3rem",
            color: "white",
            fontSize: "18px",
            fontFamily: "Cafe24",
          }}
        >
          휴게실 이용 방법
        </Typography>

        <Box
          variant="contained"
          sx={{
            mt: 2,
            padding: 2,
            backgroundColor: "#F4EFE6",
            height: "30rem",
            borderRadius: "7px",
          }}
        >
          <Typography
            style={{
              wordBreak: "break-all",
              fontSize: "16px",
              marginBottom: 10,
            }}
          >
            1. 휴게실은 최대 30분 이용 가능합니다.
          </Typography>
          <Typography
            style={{
              wordBreak: "break-all",
              fontSize: "16px",
              marginBottom: 10,
            }}
          >
            2. 이용시간 30분이 지나면 열람실로 이동합니다.
          </Typography>
          <Typography
            style={{
              wordBreak: "break-all",
              fontSize: "16px",
              marginBottom: 10,
            }}
          >
            3. 휴게실 재입장은 한시간 이후에 가능합니다.
          </Typography>
          <Typography
            style={{
              wordBreak: "break-all",
              fontSize: "16px",
              marginBottom: 10,
            }}
          >
            4. 스트레칭은 부위별로 맞춤 동영상이 제공됩니다.
          </Typography>
          <Typography
            style={{
              wordBreak: "break-all",
              fontSize: "16px",
              marginBottom: 10,
            }}
          >
            5. 동기부여 영상은 다양한 영상이 랜덤으로 제공됩니다.
          </Typography>
          <Box sx={{ mt: 5, ml: 13 }}>
            <img
              src={hourGlass}
              alt="title"
              style={{ width: "5rem", height: "5rem" }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: "2rem",
            backgroundColor: "#DEDCEE",
            width: "210px",
            height: "50px",
            color: "#1A1E33",
            fontSize: "25px",
            "&:hover": {
              backgroundColor: "#DEDCEE",
            },
            fontFamily: "Cafe24",
          }}
          onClick={() => {
            navigate("/studyroom");
          }}
        >
          나가기
        </Button>
      </Box>
    </Box>
  );
}
