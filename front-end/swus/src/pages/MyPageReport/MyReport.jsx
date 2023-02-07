import React from "react";
import { Box } from "@mui/system";
import StudyGraph from "./StudyGraph";
import TodoJandi from "./TodoJandi";
import { Grid } from "@mui/material";
import MyTodoBlock from "./MyTodoBlock";

function MyReport() {
  return (
    <>
      <Grid container sx={{ marginLeft: "5%" }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box sx={{ position: "relative" }}>
              <MyTodoBlock />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ position: "relative" }}>
              <StudyGraph />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TodoJandi />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MyReport;
