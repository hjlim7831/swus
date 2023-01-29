import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Box } from "@mui/material";

function createData(num, stydyType, studyName, time) {
  return { num, stydyType, studyName, time };
}

const rows = [
  createData(5, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(4, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(3, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(2, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(1, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyGroupList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: 800,
          height: 300,
          backgroundColor: "primary.light",
        }}
      >
        <h3>그룹 목록</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            {/* <TableHead>
              <TableRow>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead> */}
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      centered
                      aria-label="basic tabs example"
                    >
                      <Tab label="진행중인 스터디" {...a11yProps(0)} />
                      <Tab label="완료된 스터디" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.num}
                  </TableCell>
                  <TableCell align="right">
                    {row.stydyType}
                    {row.studyName}
                  </TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell>
                    <button>입장하기</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default MyGroupList;
