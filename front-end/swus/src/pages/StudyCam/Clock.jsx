import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function Clock() {
  const [time, setTime] = useState(new Date());

  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2); //getMonth는 0-11 반환하므로 +1, 05월처럼 두자리 맞추기(뒤에서 두자리 자름)
  const day = ("0" + today.getDate()).slice(-2);

  const hoursTen = ("0" + today.getHours()).slice(-2, -1); //시간 10의자리
  const hoursOne = ("0" + today.getHours()).slice(-1); //시간 1의자리
  const minutesTen = ("0" + today.getMinutes()).slice(-2, -1);
  const minutesOne = ("0" + today.getMinutes()).slice(-1);
  const secondsTen = ("0" + today.getSeconds()).slice(-2, -1);
  const secondsOne = ("0" + today.getSeconds()).slice(-1);

  const getTodayLabel = () => {
    const dayLabel = today.getDay();
    const week = new Array("일", "월", "화", "수", "목", "금", "토");
    const todayLabel = week[dayLabel];
    return todayLabel;
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div style={{ height: "50%" }}>
        <p style={{ color: "white" }}>
          {year}. {month}. {day} {getTodayLabel()}요일
        </p>
        <Box sx={{ height: "100%", mt: "5px" }}>
          <Box
            sx={{
              display: "inline-block",
              width: "15%",
              height: "100%",
              mr: "1%",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
              {hoursTen}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "inline-block",
              width: "15%",
              height: "100%",
              mr: "0.3%",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
              {hoursOne}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "inline-block",
              color: "white",
              mr: "0.3%",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              :
            </Typography>
          </Box>
          <Box
            sx={{
              display: "inline-block",
              width: "15%",
              mr: "1%",
              height: "100%",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
              {minutesTen}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-block",
              width: "15%",
              height: "100%",
              mr: "0.3%",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
              {minutesOne}
            </Typography>
          </Box>
          <Box sx={{ display: "inline-block", color: "white", mr: "0.3%" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              :
            </Typography>
          </Box>
          <Box
            sx={{
              display: "inline-block",
              width: "15%",
              height: "100%",
              mr: "1%",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
              {secondsTen}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-block",
              width: "15%",
              height: "100%",
              borderRadius: 2,
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: "5px" }}>
              {secondsOne}
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Clock;
