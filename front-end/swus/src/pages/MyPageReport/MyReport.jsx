import React, { useState } from "react";
import { Box } from "@mui/system";
import StudyGraph from "./StudyGraph";
import { Grid } from "@mui/material";
import MyTodoBlock from "./MyTodoBlock";
import MyTime from "./MyTime";
import TimeJandi from "./TimeJandi";
import TodoJandi from "./TodoJandi";

function MyReport() {
  const [type, setType] = useState("todo");

  return (
    <>
      <Grid container sx={{ marginLeft: "1%" }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box sx={{ position: "relative" }}>
              {type === "todo" ? (
                <MyTodoBlock setType={setType} />
              ) : (
                <MyTime setType={setType} />
              )}
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
            {type === "todo" ? (
              <TodoJandi setType={setType} />
            ) : (
              <TimeJandi setType={setType} />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MyReport;
