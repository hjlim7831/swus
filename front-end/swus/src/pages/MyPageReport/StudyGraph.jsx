import React from "react";
import { Box } from "@mui/system";
import { ResponsiveBar } from "@nivo/bar";
import { Grid } from "@mui/material";

function StudyGraph() {
  const data = [
    {
      type: "Mon",
      순공시간: 8,
      순공시간Color: "hsl(119, 70%, 50%)",
      총공시간: 12,
      총공시간Color: "hsl(203, 70%, 50%)",
    },
    {
      type: "Tue",
      순공시간: 4,
      순공시간Color: "hsl(257, 70%, 50%)",
      총공시간: 2,
      총공시간Color: "hsl(203, 70%, 50%)",
    },
    {
      type: "Wed",
      순공시간: 12,
      순공시간Color: "hsl(265, 70%, 50%)",
      총공시간: 8,
      총공시간Color: "hsl(203, 70%, 50%)",
    },
    {
      type: "Thu",
      순공시간: 17,
      순공시간Color: "hsl(291, 70%, 50%)",
      총공시간: 12,
      총공시간Color: "hsl(203, 70%, 50%)",
    },
    {
      type: "Fri",
      순공시간: 2,
      순공시간Color: "hsl(251, 70%, 50%)",
      총공시간: 21,
      총공시간Color: "hsl(203, 70%, 50%)",
    },
    {
      type: "Sat",
      순공시간: 6,
      순공시간Color: "hsl(51, 70%, 50%)",
      총공시간: 5,
      총공시간Color: "hsl(203, 70%, 50%)",
    },
    {
      type: "Sun",
      순공시간: 1,
      순공시간Color: "hsl(77, 70%, 50%)",
      총공시간: 3,
      총공시간Color: "hsl(203, 70%, 50%)",
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
              keys={["순공시간", "총공시간"]}
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
                //위에 순공시간 총공시간 어떤색인지 알려주는 지표
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
