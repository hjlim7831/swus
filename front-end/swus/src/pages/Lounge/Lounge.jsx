import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

// import { ResponsiveCalendar } from "@nivo/calendar";

import axios from "../../Utils/index";

export default function TodoJandi() {
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const data = [
    {
      value: 250,
      day: "2017-11-08",
    },
    {
      value: 155,
      day: "2016-06-25",
    },
    {
      value: 172,
      day: "2018-01-23",
    },
    {
      value: 356,
      day: "2017-06-04",
    },
    {
      value: 298,
      day: "2015-04-01",
    },
    {
      value: 5,
      day: "2018-05-19",
    },
    {
      value: 202,
      day: "2016-11-19",
    },
    {
      value: 268,
      day: "2015-12-30",
    },
    {
      value: 78,
      day: "2017-05-26",
    },
    {
      value: 244,
      day: "2017-06-15",
    },
    {
      value: 394,
      day: "2016-03-21",
    },
    {
      value: 17,
      day: "2016-05-04",
    },
    {
      value: 166,
      day: "2018-05-18",
    },
  ];

  // useEffect(() => {
  //   const config = {
  //     url: "/my-todos/jandi",
  //     method: "get",
  //   };

  //   axios(config)
  //     .then((response) => {
  //       // console.log(response.data.year);
  //       console.log(response.data.todo_records);

  //       // {id_study_at: '2023-02-01', todo_done_count: 3}
  //       // 1 <= , 3 <=, 5<= , 7 <=
  //       const newData = response.data.todo_records.map((data) => {
  //         return {
  //           day: data.id_study_at,
  //           value: data.todo_done_count,
  //         };
  //       });
  //       console.log(newData);
  //       setValues(newData);
  //       setStartDate(`${response.data.year}-01-01`);
  //       setEndDate(`${response.data.year}-12-31`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <Box>
        <Grid container></Grid>
      </Box>
      {/* <ResponsiveCalendar
        data={data}
        from="2015-03-01"
        to="2016-07-12"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      /> */}
    </>
  );
}

// const todoJandi = () => (

//   return (
//     <>
//       <ResponsiveCalendar
//       data={data}
//       from="2015-03-01"
//       to="2016-07-12"
//       emptyColor="#eeeeee"
//       colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
//       margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
//       yearSpacing={40}
//       monthBorderColor="#ffffff"
//       dayBorderWidth={2}
//       dayBorderColor="#ffffff"
//       legends={[
//         {
//           anchor: "bottom-right",
//           direction: "row",
//           translateY: 36,
//           itemCount: 4,
//           itemWidth: 42,
//           itemHeight: 36,
//           itemsSpacing: 14,
//           itemDirection: "right-to-left",
//         },
//       ]}
//     />
//     </>
//   )
// );
