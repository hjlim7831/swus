import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import axios from "./../../Utils/index";

const ApexChart = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const config = {
      method: "get",
      url: "/my-studies/one-week",
    };

    axios(config).then((response) => {
      // console.log(response.data);

      let updatedSeries = [
        {
          name: "공부시간",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "목표시간",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ];

      if (response.data) {
        response.data.weekly_records.map((data) => {
          // 1: Mon ~ 7: Sun
          // data.weekday - 1
          updatedSeries[0].data[data.weekday - 1] = (
            data.total_time / 60
          ).toFixed(2);
          updatedSeries[1].data[data.weekday - 1] = (
            data.target_time / 60
          ).toFixed(2);
        });
        setSeries(updatedSeries);
      }
      // console.log(series);
    });
  }, []);

  const [options] = useState({
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Web", "Thur", "Fri", "Sat", "Sun"],
    },
    // yaxis: {
    //   min: 0,
    //   max: 24,
    //   tickAmount: 6,
    // },
    fill: {
      opacity: 1,
    },
    colors: ["#FBB4AE", "#B3CDE3"],
    legend: {
      position: "top",
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return val + "시간";
        },
      },
    },
  });

  return (
    <>
      {/* {console.log("check", series)} */}
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
            <h3 style={{ marginLeft: "50px" }}>📊 주간 공부 기록</h3>
            {/* <p>{ series[0].data }</p> */}
          </Grid>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              textColor: "white",
            }}
          >
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={400}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default ApexChart;
