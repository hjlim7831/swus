import { React, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Grid, TablePagination } from "@mui/material";
import { Container } from "@mui/system";

function createData(num, studyType, studyName, time) {
  return { num, studyType, studyName, time };
}

const ingGroups = [
  createData(13, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(12, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(11, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(10, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(9, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(8, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(7, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(6, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(5, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(4, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(3, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(2, "[스터디]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(1, "[스터디]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
];

const finishedGroups = [
  createData(5, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(4, "[스터디]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(3, "[스터디]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(2, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
  createData(1, "[메이트]", "자바의 정석 완독 스터디", "월수금 12:00~15:00"),
]

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


function MyGroupList() {
  const [value, setValue] = useState(0);

  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

  function getIngGroups() {
    return ingGroups.slice(page * 8, (page + 1) * 8).map((group) => {
      return (
        <TableRow key={uuidv4()} style={{ justifyContent: "center" }}>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.num}</TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px" }}><span style={(group.studyType === "[스터디]") ? { color: "red"} : {color: "blue"}}>{group.studyType}</span></TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.studyName}</TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.time}</TableCell>
          <TableCell style={{ textAlign: "center" }}>
            <Button variant="contained" style={{ width: "130px" }}>
              스터디룸 입장
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  }
  
  function getFinishedGroups() {
    return finishedGroups.slice(page * 8, (page + 1) * 8).map((group) => {
      return (
        <TableRow key={uuidv4()} style={{ justifyContent: "center" }}>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.num}</TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px" }}><span style={(group.studyType === "[스터디]") ? { color: "red"} : {color: "blue"}}>{group.studyType}</span></TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.studyName}</TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.time}</TableCell>
          <TableCell style={{ textAlign: "center" }}>
            <Button variant="contained" style={{ width: "130px" }}>
              리포트 보기
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container style={{ border: "1px gray solid", borderRadius: "10px", height: "85vh", marginTop: 3 }}>
        <Grid container style={{ justifyContent: "center", display: "flex", alignContent: "center", marginTop: 8 }}>
          <p style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
            <span>내 스터디룸</span>
          </p>
        </Grid>
        <TableContainer style={{ textAlign: "center" }}>
          <Table style={{ textAlign: "center" }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={8}>
                  <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      centered
                      aria-label="basic tabs example"
                    >
                      <Tab
                       disableRipple
                       label="진행중인 스터디" 
                       style={ (value === 0) ? {  color: "black", width: "100%", fontWeight: "bold" } : { backgroundColor: "white", width: "100%", fontWeight: "bold" } }
                      />
                      <Tab 
                        disableRipple
                        label="완료된 스터디" 
                        style={ (value === 1) ? {  color: "black", width: "100%", fontWeight: "bold" } : { backgroundColor: "white", width: "100%", fontWeight: "bold" } }
                      />
                    </Tabs>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ textAlign: "center" }}>
              {(value === 0) ? getIngGroups() : getFinishedGroups()}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={(value === 0) ? ingGroups.length : finishedGroups.length}
                  page={page}
                  rowsPerPage={8}
                  rowsPerPageOptions={[]}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default MyGroupList;
