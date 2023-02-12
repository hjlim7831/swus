import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function Lounge() {
  const vedio_id = "p8300mqnSI0"
  const url = `https://www.youtube.com/embed/${vedio_id}?autoplay=1&mutes=1`

  const stretching = [
    {
      name: "목",
      color: "#FFE0E0"
    },
    {
      name: "등",
      color: "#EBEBEB"
    },
    {
      name: "어깨",
      color: "#FFECDA"
    },
    {
      name: "허리",
      color: "#EBEBEB"
    },
    {
      name: "다리",
      color: "#FFFBED"
    },
  ]
  
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Grid item xs={8} 
          sx={{ backgroundColor: "white", 
            width: "61rem", height: "40rem", 
            boxShadow: "2px 2px 7px 1px grey", 
            borderRadius: 2, 
            mt: "1rem",
          }}
        >
          <Typography sx={{mx: "3rem", my: "2rem", fontSize: "30px", fontWeight: "bold"}}>
            동기부여영상
          </Typography>
          {/* width="560" height="315"  */}
          <iframe width="850" height="500" 
            src={url} 
            title="YouTube video player" 
            allowFullScreen
            style={{ marginLeft: "40px" }} />
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{ display: "flex", flexDirection: "column",
              backgroundColor: "#373A4E", 
              width: "35rem", height: "35rem", 
              boxShadow: "2px 2px 7px 1px grey", 
              borderRadius: 2, 
              mt: "1rem",
              marginLeft: "3rem"
            }}
          >
            <Typography  sx={{mx: "3rem", mt: "2rem", mb:"1rem", fontSize: "30px", fontWeight: "bold", color: "white" }}>
              근육도 쉬어야 한다...
            </Typography>

            { stretching.map((data) => {
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
                    '&:hover': {
                      backgroundColor: data.color
                    },
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "25px",
                  }}
                >
                  {data.name} 운동하기
                </Button>
              )
            })  
            }
          </Box>
          
          <Box
            sx={{ display: "flex", flexDirection: "column",
              backgroundColor: "#373A4E", 
              width: "35rem", height: "15rem", 
              boxShadow: "2px 2px 7px 1px grey", 
              borderRadius: 2, 
              mt: "1rem",
              marginLeft: "3rem"
            }}
          >
            <Typography  sx={{mx: "3rem", mt: "2rem", mb:"1rem", fontSize: "30px", fontWeight: "bold", color: "white" }}>
              동기부여 영상 보기
            </Typography>
            <Box sx = {{ display: "flex"}}>
              <Typography sx={{mx: "3rem", my: "1rem", fontSize: "20px", color: "white" }}>
                공부 동기가 필요한 당신... <br />
                시간 낭비 NO!  랜덤으로 제공되는 <br />
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
                  '&:hover': {
                    backgroundColor: '#F4EFE6'
                  }
                }}
              > 
                GO! 
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
