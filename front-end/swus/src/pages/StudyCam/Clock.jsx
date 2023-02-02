import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    :
  </Box>
);

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
      <div>
        <p>
          {year}.{month}.{day} {getTodayLabel()}요일
        </p>
        <Box
          sx={{
            display: "inline-block",
            width: 17,
            height: 30,
            border: 1,
            borderRadius: 1,
          }}
        >
          <Typography>{hoursTen}</Typography>
        </Box>
        <Box
          sx={{
            display: "inline-block",
            width: 17,
            height: 30,
            border: 1,
            borderRadius: 1,
          }}
        >
          <Typography>{hoursOne}</Typography>
        </Box>
        {bull}
        <Box
          sx={{
            display: "inline-block",
            width: 17,
            height: 30,
            border: 1,
            borderRadius: 1,
          }}
        >
          <Typography>{minutesTen}</Typography>
        </Box>

        <Box
          sx={{
            display: "inline-block",
            width: 17,
            height: 30,
            border: 1,
            borderRadius: 1,
          }}
        >
          <Typography>{minutesOne}</Typography>
        </Box>
        {bull}
        <Box
          sx={{
            display: "inline-block",
            width: 17,
            height: 30,
            border: 1,
            borderRadius: 1,
          }}
        >
          <Typography>{secondsTen}</Typography>
        </Box>

        <Box
          sx={{
            display: "inline-block",
            width: 17,
            height: 30,
            border: 1,
            borderRadius: 1,
          }}
        >
          <Typography>{secondsOne}</Typography>
        </Box>
      </div>
    </>
  );
}

export default Clock;
