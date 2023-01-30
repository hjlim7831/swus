import React from "react";
import { Box } from "@mui/system";
import MyTodo from "./MyTodo";
import StudyGraph from "./StudyGraph";
import TodoJandi from "./TodoJandi";

function MyReport() {
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          display: "inline-block",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <MyTodo />
        </Box>
        <Box sx={{ position: "relative" }}>
          <StudyGraph />
        </Box>
      </Box>
      <Box>
        <TodoJandi />
      </Box>
      {/* <Box
        sx={{
          position: "relative",
          display: "inline-block",
          left: 500,
        }}
      >
        <h1>제발 되게 해주세요 왜 이러는지 모르겠어요</h1>
        <h1>오 된다 ㅋㅋ ㄱㅇㄷ</h1>
      </Box> */}
    </>
  );
}

export default MyReport;
