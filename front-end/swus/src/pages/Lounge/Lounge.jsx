import React, { useEffect, useState } from "react";
import { Box, height } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
// import motivationImg from "../../image/Lounge/motivation.jpg";
import stretchingNeck from "../../image/Lounge/stretching-neck.png";
import stretchingMain from "../../image/Lounge/stretching-main.png";
import stretchingBack from "../../image/Lounge/stretching-back.png";
import stretchingWaist from "../../image/Lounge/stretching-waist.png";
import stretchingLeg from "../../image/Lounge/stretching-leg.png";
import stretchingShoulder from "../../image/Lounge/stretching-shoulder.png";

export default function Lounge() {
  const loungeurl = useSelector((state) => state.loungeurl);

  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 6));
  const [url, setUrl] = useState();
  const [category, setCategory] = useState("동기부여");

  const necks = loungeurl.neck;
  const backs = loungeurl.back;
  const waists = loungeurl.waist;
  const legs = loungeurl.leg;
  const shoulders = loungeurl.shoulder;
  const motivations = loungeurl.motivation;

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 7));
    setUrl(
      `https://www.youtube.com/embed/${motivations[randomNum]}?autoplay=1&mutes=1`
    );
  }, []);

  const ChooseUrl = (name) => {
    setRandomNum(Math.floor(Math.random() * 6));

    if (name === "neck") {
      setUrl(
        `https://www.youtube.com/embed/${necks[randomNum]}?autoplay=1&mutes=1`
      );
      setCategory("목 스트레칭");
    } else if (name === "back") {
      setUrl(
        `https://www.youtube.com/embed/${backs[randomNum]}?autoplay=1&mutes=1`
      );
      setCategory("등 스트레칭");
    } else if (name === "waist") {
      setUrl(
        `https://www.youtube.com/embed/${waists[randomNum]}?autoplay=1&mutes=1`
      );
      setCategory("허리 스트레칭");
    } else if (name === "leg") {
      setUrl(
        `https://www.youtube.com/embed/${legs[randomNum]}?autoplay=1&mutes=1`
      );
      setCategory("다리 스트레칭");
    } else if (name === "shoulder") {
      setUrl(
        `https://www.youtube.com/embed/${shoulders[randomNum]}?autoplay=1&mutes=1`
      );
      setCategory("어깨 스트레칭");
    } else if (name === "motivation") {
      setUrl(
        `https://www.youtube.com/embed/${motivations[randomNum]}?autoplay=1&mutes=1`
      );
      setCategory("동기부여");
    }
  };

  const stretching = [
    {
      id: "neck",
      name: "목",
      color: "#FFE0E0",
      imageUrl: stretchingNeck,
    },
    {
      id: "back",
      name: "등",
      color: "#EBEBEB",
      imageUrl: stretchingBack,
    },
    {
      id: "shoulder",
      name: "어깨",
      color: "#FFECDA",
      imageUrl: stretchingShoulder,
    },
    {
      id: "waist",
      name: "허리",
      color: "#EBEBEB",
      imageUrl: stretchingWaist,
    },
    {
      id: "leg",
      name: "다리",
      color: "#FFFBED",
      imageUrl: stretchingLeg,
    },
  ];

  return (
    <>
      {url ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Grid
              item
              xs={8}
              sx={{
                backgroundColor: "white",
                width: "61rem",
                height: "40rem",
                boxShadow: "2px 2px 7px 1px grey",
                borderRadius: 2,
                mt: "1rem",
              }}
            >
              <Typography
                sx={{
                  mx: "3rem",
                  my: "2rem",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                {category} 영상
              </Typography>
              <iframe
                width="850"
                height="500"
                src={url}
                title="YouTube video player"
                allowFullScreen
                style={{ marginLeft: "40px" }}
              />
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "column",
                  backgroundColor: "#373A4E",
                  width: "35rem",
                  height: "35rem",
                  boxShadow: "2px 2px 7px 1px grey",
                  borderRadius: 2,
                  mt: "1rem",
                  marginLeft: "3rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      mx: "3rem",
                      mt: "2rem",
                      mb: "1rem",
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    근육도 쉬어야 한다...
                  </Typography>
                  {stretching.map((data) => {
                    return (
                      <Button
                        variant="contained"
                        sx={{
                          my: "1rem",
                          marginLeft: "2rem",
                          backgroundColor: data.color,
                          width: "20rem",
                          height: "20rem",
                          color: "#1A1E33",
                          "&:hover": {
                            backgroundColor: data.color,
                          },
                          fontWeight: "bold",
                          fontSize: "25px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          ChooseUrl(data.id);
                        }}
                      >
                        <span>{data.name} 운동하기</span>
                        <img
                          src={data.imageUrl}
                          alt="title"
                          style={{ width: "3rem", height: "3rem" }}
                        />
                      </Button>
                    );
                  })}
                </Box>
                <Box sx={{ mt: 25 }}>
                  <img
                    src={stretchingMain}
                    alt="title"
                    style={{ width: "9rem", height: "9rem" }}
                  />
                  <Typography sx={{ color: "white", mt: 5, fontSize: "18px" }}>
                    랜덤으로 재생되는 <br />
                    스트레칭 영상으로 <br />
                    긴장한 근육을 <br />
                    풀어주세요!
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#373A4E",
                  width: "35rem",
                  height: "15rem",
                  boxShadow: "2px 2px 7px 1px grey",
                  borderRadius: 2,
                  mt: "1rem",
                  marginLeft: "3rem",
                  // backgroundImage: `url(${motivationImg})`,
                  // backgroundRepeat: "no-repeat",
                  // backgroundSize: "cover",
                }}
              >
                <Typography
                  sx={{
                    mx: "3rem",
                    mt: "2rem",
                    mb: "1rem",
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  동기부여 영상 보기
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      mx: "3rem",
                      my: "1rem",
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    공부 동기가 필요한 당신... <br />
                    시간 낭비 NO! 랜덤으로 제공되는 <br />
                    동기 부여 영상을 만나보세요! <br />
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      my: "1rem",
                      mt: "4rem",
                      marginLeft: "2rem",
                      backgroundColor: "#F4EFE6",
                      width: "6rem",
                      height: "3rem",
                      color: "#1A1E33",
                      fontSize: "20px",
                      "&:hover": {
                        backgroundColor: "#F4EFE6",
                      },
                    }}
                    onClick={() => {
                      ChooseUrl("motivation");
                    }}
                  >
                    GO!
                  </Button>
                  {/* <div
                    style={{
                      backgroundColor: "white",
                      opacity: "30%",
                      position: "absolute",
                      width: "35rem",
                      height: "15rem",
                      borderRadius: 2,
                    }}
                  ></div> */}
                </Box>
              </Box>
            </Grid>
          </Box>
        </>
      ) : null}
    </>
  );
}
