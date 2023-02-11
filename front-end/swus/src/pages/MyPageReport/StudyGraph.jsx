import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { ResponsiveBar } from "@nivo/bar";
import { Grid } from "@mui/material";
import axios from "./../../Utils/index";

// const Token = sessionStorage.getItem("token");

function StudyGraph() {
  const [timeData, setTimeData] = useState(
    [
      {
        type: "Mon",
        목표시간: 0,
        공부시간: 0,
      },
      {
        type: "Tue",
        목표시간: 0,
        공부시간: 0,
      },
      {
        type: "Wed",
        목표시간: 0,
        공부시간: 0,
      },
      {
        type: "Thu",
        목표시간: 0,
        공부시간: 0,
      },
      {
        type: "Fri",
        목표시간: 0,
        공부시간: 0,
      },
      {
        type: "Sat",
        목표시간: 0,
        공부시간: 0,
      },
      {
        type: "Sun",
        목표시간: 0,
        공부시간: 0,
      },
    ]
  );

  const check = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thur',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun',
  }

  useEffect(() => {
    const config = {
      method: "get",
      url: "/my-studies/one-week",
    };

    axios(config).then((response) => {
      // console.log(response.data);
      response.data.weekly_records.map((data) => {
        const date = check[data.weekday];

        timeData[data.weekday - 1] = {
          type: date,
          목표시간: (data.target_time / 60).toFixed(2),
          공부시간: (data.total_time / 60).toFixed(2),
        }
        
        setTimeData(timeData)
      });
      console.log(timeData)
    });
  }, []);

  // const monday = list.monday;
  // console.log(monday);
  // const today = new Date(list.monday);
  // console.log(today);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 500,
          backgroundColor: "white",
          borderRadius: 2,
          padding: "10px",
          boxShadow: "2px 2px 7px 1px grey",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <h3 style={{ marginLeft: "50px" }}>주간 공부 기록</h3>
          </Grid>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 420,
              textColor: "white",
            }}
          >
            <ResponsiveBar
              data={timeData}
              keys={["공부시간", "목표시간"]}
              indexBy="type"
              margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
              padding={0.6}       // 막대 폭
              innerPadding={3}
              maxValue={24}
              groupMode="grouped"
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "pastel1" }}
              borderRadius={2}
              enableGridX={true}
              enableLabel={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
              legends={[
                //위에 목표시간 공부시간 어떤색인지 알려주는 지표
                {
                  dataFrom: "keys",
                  anchor: "top-right",
                  direction: "row",
                  justify: false,
                  translateX: 12, //지표 위치 좌표x
                  translateY: -20,
                  itemsSpacing: 0,
                  itemWidth: 82,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 13,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default StudyGraph;
