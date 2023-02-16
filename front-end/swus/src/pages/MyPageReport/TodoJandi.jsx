import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styled from "styled-components";
import CalendarHeatmap from "react-calendar-heatmap";
import { Grid } from "@mui/material";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import axios from "./../../Utils/index";

function TodoJandi() {
  //  Heatmap Data
  const checkColor = localStorage.getItem("jandi")
    ? localStorage.getItem("jandi")
    : "basic";

  const nickname = localStorage.getItem("nickname");

  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState();
  const [color, setColor] = useState(checkColor);

  //  기간 설정 (1년 전 ~ today)
  // Lazy Initialization (state 정의될 때 한 번만 실행)
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");

    setStartDate(`${year - 1}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  });

  useEffect(() => {
    const config = {
      url: "/my-todos/jandi",
      method: "get",
    };

    axios(config)
      .then((response) => {
        // {id_study_at: '2023-02-01', todo_done_count: 3}
        // 1 <= , 3 <=, 5<= , 7 <=
        const newData = response.data.todo_records.map((data) => {
          let value = 0;

          if (data.todo_done_count >= 7) {
            value = 4;
          } else if (data.todo_done_count >= 5) {
            value = 3;
          } else if (data.todo_done_count >= 3) {
            value = 2;
          } else if (data.todo_done_count >= 1) {
            value = 1;
          }

          return {
            date: data.id_study_at,
            classValue: value,
          };
        });
        setValues(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [color]);

  const colorChange = (name) => {
    localStorage.setItem("jandi", name);
    setColor(name);
  };

  // const color = ["grey", "#BDACFB", "#7A5DDF", "#4926C1", "#2A117D"];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          backgroundColor: "white",
          borderRadius: 2,
          padding: "10px",
          boxShadow: "2px 2px 7px 1px grey",
          marginTop: "2%",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3 style={{ marginLeft: "40px" }}>{nickname}의 Todo 달성 기록</h3>
            <div>
              {/* 색변경 아이콘들 */}
              <FormatColorFillIcon
                name="git"
                sx={{
                  color: "#1e6823",
                  mt: "17px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  colorChange("git");
                }}
              />
              <FormatColorFillIcon
                name="basic"
                sx={{
                  color: "#4926c1",
                  mt: "17px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  colorChange("basic");
                }}
              />
              <FormatColorFillIcon
                name="first"
                sx={{
                  color: "#41AE76",
                  mt: "17px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  colorChange("first");
                }}
              />
              <FormatColorFillIcon
                name="second"
                sx={{
                  color: "#49729B",
                  mt: "17px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  colorChange("second");
                }}
              />
              <FormatColorFillIcon
                name="third"
                sx={{
                  color: "#EA1A87",
                  mt: "17px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  colorChange("third");
                }}
              />
              <FormatColorFillIcon
                name="fourth"
                sx={{
                  color: "#FC4E2A",
                  mt: "17px",
                  marginLeft: "1rem",
                  marginRight: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  colorChange("fourth");
                }}
              />
            </div>
          </Grid>
          <StyledContainer
            style={{ width: 1400, marginLeft: "3.5rem", fontSize: "8px" }}
          >
            <CalendarHeatmap
              endDate={endDate}
              startDate={startDate}
              values={values}
              showWeekdayLabels={true}
              //classForValue로 색깔이 될 클래스 지정
              classForValue={(value) => {
                if (!value) {
                  return `color-${color}-0`;
                }
                return `color-${color}-${value.classValue}`;
              }}
            />
          </StyledContainer>
        </Grid>
      </Box>
    </>
  );
}

export default TodoJandi;

const StyledContainer = styled.div`
  /*
 * https://ourcodeworld.com/articles/read/563/creating-a-calendar-heatmap-chart-github-contributions-like-in-reactjs
 * react-calendar-heatmap styles
 *
 * All of the styles in this file are optional and configurable!
 * The github and gitlab color scales are provided for reference.
 */

  /*
 * Github color scale
 */

  .react-calendar-heatmap .color-git-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-git-1 {
    fill: #d6e685;
  }
  .react-calendar-heatmap .color-git-2 {
    fill: #8cc665;
  }
  .react-calendar-heatmap .color-git-3 {
    fill: #44a340;
  }
  .react-calendar-heatmap .color-git-4 {
    fill: #1e6823;
  }

  .react-calendar-heatmap .color-basic-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-basic-1 {
    fill: #bdacfb;
  }
  .react-calendar-heatmap .color-basic-2 {
    fill: #7a5ddf;
  }
  .react-calendar-heatmap .color-basic-3 {
    fill: #4926c1;
  }
  .react-calendar-heatmap .color-basic-4 {
    fill: #2a117d;
  }

  .react-calendar-heatmap .color-first-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-first-1 {
    fill: #ccece6;
  }
  .react-calendar-heatmap .color-first-2 {
    fill: #66c2a4;
  }
  .react-calendar-heatmap .color-first-3 {
    fill: #41ae76;
  }
  .react-calendar-heatmap .color-first-4 {
    fill: 006D2C;
  }

  .react-calendar-heatmap .color-second-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-second-1 {
    fill: #acd5f2;
  }
  .react-calendar-heatmap .color-second-2 {
    fill: #7fa8d1;
  }
  .react-calendar-heatmap .color-second-3 {
    fill: #49729b;
  }
  .react-calendar-heatmap .color-second-4 {
    fill: #254e77;
  }

  .react-calendar-heatmap .color-third-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-third-1 {
    fill: #f9acd6;
  }
  .react-calendar-heatmap .color-third-2 {
    fill: #f66cb6;
  }
  .react-calendar-heatmap .color-third-3 {
    fill: #ea1a87;
  }
  .react-calendar-heatmap .color-third-4 {
    fill: #c20064;
  }

  .react-calendar-heatmap .color-fourth-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-fourth-1 {
    fill: #ffdd00;
  }
  .react-calendar-heatmap .color-fourth-2 {
    fill: #ffb700;
  }
  .react-calendar-heatmap .color-fourth-3 {
    fill: #ff7b00;
  }
  .react-calendar-heatmap .color-fourth-4 {
    fill: #fc4e2a;
  }
`;
