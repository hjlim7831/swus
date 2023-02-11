import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

export default function Utube() {

  // https://www.youtube.com/watch?v=G32r7kx-MTw

  return (
    <>
      <Box>
        <Grid sx={{ marginTop: "10rem", marginLeft: "30rem" }}>
          <iframe id="inlineFrameExample"
            title="Inline Frame Example"
            width="300rem"
            height="200rem"
            src="https://www.youtube.com/watch?v=G32r7kx-MTw">
          </iframe>
        </Grid>
      </Box>
    </>
  );
}
