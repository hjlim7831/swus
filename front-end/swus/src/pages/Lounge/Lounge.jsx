import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

export default function Lounge() {
  const vedio_id = "p8300mqnSI0"
  const url = `https://www.youtube.com/embed/${vedio_id}?autoplay=1&mutes=1`
  
  return (
    <>
      <Grid>
        <h1>동기부여영상</h1>
        {/* width="560" height="315"  */}
        <iframe width="900" height="500" 
          src={url} 
          title="YouTube video player" 
          allowFullScreen />
      </Grid>
    </>
  );
}
