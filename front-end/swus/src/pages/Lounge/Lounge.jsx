import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

export default function Lounge() {

  // https://www.youtube.com/watch?v=G32r7kx-MTw
  // const url = `https://www.youtube.com/embed/${}`
  // const url = `https://www.youtube.com/embed/G32r7kx-MTw`
  // https://www.youtube.com/embed/FMOISIlhLEY?autoplay=1&mutes=1

  return (
    <>
      <Grid sx={{ marginTop: "10rem", marginLeft: "20rem" }}>
        <h1>동기부여영상</h1>
        <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/p8300mqnSI0?autoplay=1&mutes=1" 
          title="YouTube video player" 
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen />
      </Grid>
    </>
  );
}
