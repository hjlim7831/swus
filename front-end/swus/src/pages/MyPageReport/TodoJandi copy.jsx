import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styled from "styled-components";
import CalendarHeatmap from "react-calendar-heatmap";
import { Grid } from "@mui/material";

import axios from "./../../Utils/index";

function TodoJandi() {
  //  Heatmap Data
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState();

  //  기간 설정 (1년 전 ~ today)
  // Lazy Initialization (state 정의될 때 한 번만 실행)
  const [endDate] = useState(() => {
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
        console.log(response.data);
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
        console.log(newData);
        setValues(newData);
        // setStartDate(`${response.data.year}-01-01`);
        // setEndDate(`${response.data.year}-12-31`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  마운트 됐을 때 데이터 가져옴
  //  배열에 날짜, 퍼센트, 클래스(색) 저장
  // useEffect(() => {
  //   fetch(`/testData/heatMapData.json`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const jsonData = res.result;
  //       const newArray = [];
  //       for (let element of jsonData) {
  //         const { date, percentage } = element;
  //         let classValue = 0;
  //         if (percentage >= 80) classValue = 4;
  //         else if (percentage >= 60) classValue = 3;
  //         else if (percentage >= 40) classValue = 2;
  //         else if (percentage >= 20) classValue = 1;
  //         newArray.push({ date, percentage, classValue });
  //       }
  //       setValues(newArray);
  //     });
  // }, []);

  // const color = ["grey", "#BDACFB", "#7A5DDF", "#4926C1", "#2A117D"];
  console.log("new", values);
  console.log(startDate);
  console.log(endDate);
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
          <Grid item xs={12}>
            <h3 style={{ marginLeft: "40px" }}>000일의 Todo 달성 기록</h3>
          </Grid>
          <StyledContainer style={{ width: 1200, marginLeft: "8%" }}>
            <CalendarHeatmap
              endDate={endDate}
              startDate={startDate}
              values={values}
              showWeekdayLabels={true}
              //classForValue로 색깔이 될 클래스 지정
              classForValue={(value) => {
                if (!value) {
                  return `color-github-0`;
                }
                return `color-github-${value.classValue}`;
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

  // .react-calendar-heatmap .color-github-0 {
  //   fill: #eeeeee;
  // }
  // .react-calendar-heatmap .color-github-1 {
  //   fill: #d6e685;
  // }
  // .react-calendar-heatmap .color-github-2 {
  //   fill: #8cc665;
  // }
  // .react-calendar-heatmap .color-github-3 {
  //   fill: #44a340;
  // }
  // .react-calendar-heatmap .color-github-4 {
  //   fill: #1e6823;
  // }

  .react-calendar-heatmap .color-github-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-github-1 {
    fill: #bdacfb;
  }
  .react-calendar-heatmap .color-github-2 {
    fill: #7a5ddf;
  }
  .react-calendar-heatmap .color-github-3 {
    fill: #4926c1;
  }
  .react-calendar-heatmap .color-github-4 {
    fill: #2a117d;
  }
`;
// "#BDACFB", "#7A5DDF", "#4926C1", "#2A117D"
