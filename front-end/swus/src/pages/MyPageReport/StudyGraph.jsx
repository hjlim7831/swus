import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { ResponsiveBar } from "@nivo/bar";
import { Grid } from "@mui/material";
import axios from "./../../Utils/index";

const Token = sessionStorage.getItem("token");

function StudyGraph() {
  const [list, setList] = useState();

  useEffect(() => {
    const config = {
      method: "get",
      url: "/my-studies/one-week",
    };

    axios(config).then((response) => {
      console.log(response.data);
      const mon = response.data.monday;
      const newData = response.data.weekly_records.map((data) => {
        console.log(data.id_study_at);
      });
    });
  }, []);

  // const monday = list.monday;
  // console.log(monday);
  // const today = new Date(list.monday);
  // console.log(today);

  const data = [
    {
      type: "Mon",
      목표시간: 8,
      공부시간: 12,
    },
    {
      type: "Tue",
      목표시간: 4,
      공부시간: 2,
    },
    {
      type: "Wed",
      목표시간: 12,
      공부시간: 8,
    },
    {
      type: "Thu",
      목표시간: 17,
      공부시간: 12,
    },
    {
      type: "Fri",
      목표시간: 2,
      공부시간: 21,
    },
    {
      type: "Sat",
      목표시간: 6,
      공부시간: 5,
    },
    {
      type: "Sun",
      목표시간: 1,
      공부시간: 3,
    },
  ];

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
              height: 350,
              textColor: "white",
            }}
          >
            <ResponsiveBar
              data={data}
              keys={["목표시간", "공부시간"]}
              indexBy="type"
              margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
              padding={0.5}
              innerPadding={2}
              maxValue={24}
              groupMode="grouped"
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "fries",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "sandwich",
                  },
                  id: "lines",
                },
              ]}
              borderRadius={2}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              enableGridX={true}
              enableLabel={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
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
