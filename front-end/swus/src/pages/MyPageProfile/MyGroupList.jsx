import { React, useEffect, useState } from "react";
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
import axios from "../../Utils/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import myGroupListSlice from "../../store/MyGroupListSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function MyGroupList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const [ingGroups, setIngGroups] = useState([]);
  const [finishedGroups, setFinishedGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [teamId, setTeamId] = useState();
  const [teamName, setTeamName] = useState();
  const [teamCategory, setTeamCategory] = useState();

  useEffect(() => {
    const config = {
      url: "/users/my-groups",
      method: "GET",
    };

    axios(config)
      .then((response) => {
        const ingGroupList = response.data.filter(function (group) {
          return group.team_done === "N";
        });

        const finishedGroupList = response.data.filter(function (group) {
          return group.team_done === "Y";
        });

        setIngGroups(ingGroupList);
        setFinishedGroups(finishedGroupList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function goGroupDetail(teamId) {
    const config = {
      url: `/users/my-groups/${teamId}`,
      method: "GET",
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        dispatch(myGroupListSlice.actions.saveGroupId(teamId));
        dispatch(myGroupListSlice.actions.getGroupDetails(response.data));
      })
      .then((response) => {
        navigate(`group/${teamId}`);
      });
  }

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const sendTeamId = (team_id) => {
    setTeamId(team_id);
  };
  const sendTeamName = (team_name) => {
    setTeamName(team_name);
  };
  const sendTeamCategory = (category) => {
    setTeamCategory(category);
  };

  const handleToEnter = () => {
    console.log(teamName);
    const config = {
      url: `/grouprooms/${teamId}`,
      method: "GET",
    };

    axios(config).then((response) => {
      console.log(response.data);
      const sessionName = response.data.sessionName;
      navigate(`/studyroom/group/${sessionName}`, {
        state: {
          roomName: sessionName,
          round: response.data.round,
          teamId: response.data.teamId,
          category: teamCategory,
          teamName: teamName,
        },
      });
    });
  };

  function getIngGroups() {
    return ingGroups.slice(page * 8, (page + 1) * 8).map((group) => {
      return (
        <TableRow key={uuidv4()} style={{ justifyContent: "center" }}>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.team_id}</TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px" }}>
            {group.category === "S" ? (
              <span style={{ color: "red" }}>[스터디]</span>
            ) : (
              <span style={{ color: "blue" }}>[메이트]</span>
            )}
          </TableCell>
          <TableCell
            style={{ textAlign: "center", fontSize: "15px" }}
            onClick={() => {
              goGroupDetail(group.team_id);
            }}
          >
            <span style={{ cursor: "pointer" }}>{group.team_name}</span>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>
            {group.start_time.slice(0, 5)} ~ {group.finish_time.slice(0, 5)}
          </TableCell>
          <TableCell style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ width: "130px" }}
              onClick={() => {
                sendTeamId(group.team_id);
                sendTeamName(group.team_name);
                sendTeamCategory(group.category);
                openModal();
              }}
            >
              스터디룸 입장
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }

  function getFinishedGroups() {
    return finishedGroups.slice(page * 8, (page + 1) * 8).map((group) => {
      return (
        <TableRow key={uuidv4()} style={{ justifyContent: "center" }}>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.team_id}</TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px" }}>
            {group.category === "S" ? (
              <span style={{ color: "red" }}>[스터디]</span>
            ) : (
              <span style={{ color: "blue" }}>[메이트]</span>
            )}
          </TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>{group.team_name}</TableCell>
          <TableCell style={{ textAlign: "center", fontSize: "15px" }}>
            {group.start_time.slice(0, 5)} ~ {group.finish_time.slice(0, 5)}
          </TableCell>
          <TableCell style={{ textAlign: "center" }}>
            <Button variant="contained" style={{ width: "130px" }}>
              리포트 보기
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container
        style={{
          border: "1px gray solid",
          borderRadius: "10px",
          height: "85vh",
          marginTop: "20px",
          backgroundColor: "white",
        }}
      >
        <Grid
          container
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
            marginTop: 8,
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
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
                      style={{ marginInline: "10px" }}
                    >
                      <Tab
                        disableRipple
                        label="진행중인 스터디"
                        style={
                          value === 0
                            ? { color: "black", width: "100%", fontWeight: "bold", marginRight: 10 }
                            : {
                                backgroundColor: "white",
                                width: "100%",
                                fontWeight: "bold",
                                marginRight: 10,
                              }
                        }
                      />
                      <Tab
                        disableRipple
                        label="완료된 스터디"
                        style={
                          value === 1
                            ? { color: "black", width: "100%", fontWeight: "bold", marginRight: 10 }
                            : {
                                backgroundColor: "white",
                                width: "100%",
                                fontWeight: "bold",
                                marginRight: 10,
                              }
                        }
                      />
                    </Tabs>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center" }}
                ></TableCell>
                <TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center" }}>
                  그룹 종류
                </TableCell>
                <TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center" }}>
                  그룹 이름
                </TableCell>
                <TableCell style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center" }}>
                  스터디 시간
                </TableCell>
                <TableCell
                  style={{ fontSize: "15px", fontWeight: "bold", textAlign: "center" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ textAlign: "center" }}>
              {value === 0 ? getIngGroups() : getFinishedGroups()}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={value === 0 ? ingGroups.length : finishedGroups.length}
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
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{teamName} 입장하기</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleToEnter}>입장</Button>
          <Button onClick={closeModal}>x</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyGroupList;
