import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexChart({ studyTime, targetTime }) {
  console.log("study", studyTime);
  console.log("target", targetTime);

  const percent = targetTime ? Math.floor((studyTime / targetTime) * 100) : 0;

  const [series, setSeries] = useState();

  const [options, setOptions] = useState({
    chart: {
      type: "radialBar",
      // offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },

    // 그래프 색상 지정하는 곳
    // 첫번째 색상만 사용
    colors: ["#F78F8E", "#AD99F3"],
    labels: ["Average Results"],
  });

  useEffect(() => {
    setSeries([percent]);
  }, [targetTime]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" />
    </div>
  );
}
